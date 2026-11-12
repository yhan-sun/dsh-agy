// Chinese display for the model's own thinking trace.
//
// Gemini reasons in English, and DSH renders that trace verbatim: the collapsed
// row shows the first English line and the expanded body is English prose. This
// module adds a Chinese layer on top of the SAME rows (the original stays,
// because the trace is evidence — a translation that silently replaced it would
// make the transcript unauditable):
//
//   collapsed : the Chinese summary replaces the English first line visually
//   expanded  : Chinese paragraph first, a divider, then the English original
//
// Why the client and not the stream: agy thoughts are read from the conversation
// DB *during* the run, and a translation call is itself an agy run. Blocking the
// stream on it would queue behind the run holding the concurrency slot (worst
// case: a turn that waits for its own translation to finish). Translating after
// the block has settled keeps the turn latency untouched.
//
// DOM safety: React owns these nodes (see reasoning.ts — clearing textContent
// blanks the block after a re-render). This module only EVER appends its own
// nodes and hides the host summary with an attribute, never rewrites host text.
// A virtualizer remount drops our nodes; the observer re-attaches them from the
// cache without another request.

import { isInteractionLocked } from './scroll-guard.ts';

type ReactApi = {
	useState: <S>(initial: S | (() => S)) => [S, (next: S | ((prev: S) => S)) => void];
	useEffect: (setup: () => (() => void) | void, deps?: unknown[]) => void;
};
type UnknownRecord = Record<string, unknown>;

const ROW_SELECTOR = 'div[data-variant="think"]';
const SUMMARY_SELECTOR = '[class*="summaryText"]';
const BODY_SELECTOR = '[class*="thinkBody"]';
const ZH_SUMMARY_CLASS = 'agy-think-zh-summary';
const ZH_BODY_CLASS = 'agy-think-zh-body';
const HIDDEN_ATTR = 'data-agy-zh-hidden';
const CACHE_PREFIX = 'agy-think-zh:';
/** Concurrent translate calls; the host runs one agy process per call. */
const MAX_IN_FLIGHT = 2;
/** A failed key is not retried before this window (avoids a request storm). */
const FAILURE_TTL_MS = 60_000;
/** Longest text we will send in one request. */
const MAX_INPUT_CHARS = 6_000;
/** Shorter blocks are noise ("Hmm", "OK"), not worth a translate call. */
const MIN_INPUT_CHARS = 8;

const CSS = `
.agy-think-zh-summary {
	color: var(--dsw-alias-label-secondary, #94a3b8);
}
[${HIDDEN_ATTR}="true"] {
	display: none !important;
}
.agy-think-zh-body {
	display: flex;
	flex-direction: column;
	gap: 0;
	margin: 0 0 8px;
}
.agy-think-zh {
	color: var(--dsw-alias-label-primary, #f8fafc);
	white-space: pre-wrap;
	word-break: break-word;
	font-size: inherit;
	line-height: inherit;
}
.agy-think-zh:empty { display: none; }
.agy-think-zh-sep {
	display: flex;
	align-items: center;
	gap: 8px;
	margin: 10px 0 8px;
	color: var(--dsw-alias-label-tertiary, #64748b);
	font-size: 11px;
	font-weight: 500;
	letter-spacing: 0.02em;
	user-select: none;
}
.agy-think-zh-sep::before,
.agy-think-zh-sep::after {
	content: '';
	height: 1px;
	flex: 1 1 auto;
	background: var(--dsw-alias-border-l1, rgba(255, 255, 255, 0.08));
}
`;

/**
 * Strip the plugin's own token banner (`[agy · 528 tokens]`, `[agy]`) from a
 * thought so the translator sees prose only.
 * @param raw - reasoning text as streamed by the adapter.
 * @returns the prose without the leading banner line.
 */
export function cleanThoughtText(raw: string): string {
	return raw
		.replace(/^\s*\[agy(?:\s*·\s*\d+\s*tokens)?\]\s*/i, '')
		.replace(/\s+$/, '');
}

/** FNV-1a: a stable cache key for a block of text (no crypto dependency). */
export function hashText(text: string): string {
	let hash = 0x811c9dc5;
	for (let i = 0; i < text.length; i++) {
		hash ^= text.charCodeAt(i);
		hash = Math.imul(hash, 0x01000193) >>> 0;
	}
	return hash.toString(16);
}

export const cacheKeyFor = (text: string): string => CACHE_PREFIX + hashText(text);

/** First non-empty line of a translation: the collapsed row shows exactly this. */
export function firstLine(text: string): string {
	for (const line of text.split('\n')) {
		const trimmed = line.trim();
		if (trimmed !== '') return trimmed;
	}
	return text.trim();
}

interface ThinkingTranslationOptions {
	/** Whether the feature is enabled (settings toggle). */
	enabled: () => boolean;
	/** Target language wording; the host defaults to the configured one. */
	lang?: () => string;
	/** Translate one block; resolves to null when the host refused/failed. */
	translate: (text: string, lang?: string) => Promise<string | null>;
}

interface QueueEntry {
	text: string;
	lang: string | undefined;
	/** Everything that wants this translation once it lands. */
	waiters: Array<(value: string | null) => void>;
}

let activeDispose: (() => void) | null = null;

/**
 * Install the thinking-translation enhancer.
 * @param opts - enable gate, target language and the translate transport.
 * @returns disposer that removes listeners, the observer and our nodes.
 */
export function installThinkingTranslation(opts: ThinkingTranslationOptions): () => void {
	if (typeof window === 'undefined' || typeof document === 'undefined') return () => {};
	activeDispose?.();

	const doc = document;
	const host = doc.head ?? doc.documentElement;
	if (!host) return () => {};

	const styleId = 'dsh-agy-link-thinking-zh-css';
	let style = doc.getElementById(styleId) as HTMLStyleElement | null;
	if (style === null) {
		style = doc.createElement('style');
		style.id = styleId;
		style.setAttribute('data-plugin', 'dsh-agy-link');
		host.appendChild(style);
	}
	style.textContent = CSS;

	const memory = new Map<string, string>();
	const failures = new Map<string, number>();
	const queue = new Map<string, QueueEntry>();
	let inFlight = 0;
	let disposed = false;
	let timer: number | null = null;

	const readCache = (key: string): string | null => {
		const hit = memory.get(key);
		if (hit !== undefined) return hit;
		try {
			const stored = window.sessionStorage?.getItem(key);
			if (typeof stored === 'string' && stored !== '') {
				memory.set(key, stored);
				return stored;
			}
		} catch {
			// sessionStorage may be unavailable (privacy mode) — memory is enough.
		}
		return null;
	};

	const writeCache = (key: string, value: string): void => {
		memory.set(key, value);
		try {
			window.sessionStorage?.setItem(key, value);
		} catch {
			// Quota or disabled storage: the in-memory cache still serves this page.
		}
	};

	const pump = (): void => {
		if (disposed) return;
		while (inFlight < MAX_IN_FLIGHT && queue.size > 0) {
			const [key, entry] = queue.entries().next().value as [string, QueueEntry];
			queue.delete(key);
			inFlight++;
			const lang = entry.lang;
			void opts
				.translate(entry.text, lang)
				.then((value) => {
					if (value !== null && value.trim() !== '') {
						writeCache(key, value);
						failures.delete(key);
						entry.waiters.forEach((resolve) => resolve(value));
					} else {
						failures.set(key, Date.now());
						entry.waiters.forEach((resolve) => resolve(null));
					}
				})
				.catch(() => {
					failures.set(key, Date.now());
					entry.waiters.forEach((resolve) => resolve(null));
				})
				.finally(() => {
					inFlight--;
					pump();
				});
		}
	};

	const requestTranslation = (text: string, lang: string | undefined): Promise<string | null> => {
		const key = cacheKeyFor(text);
		const cached = readCache(key);
		if (cached !== null) return Promise.resolve(cached);
		const failedAt = failures.get(key);
		if (failedAt !== undefined && Date.now() - failedAt < FAILURE_TTL_MS) return Promise.resolve(null);
		const existing = queue.get(key);
		if (existing !== undefined) {
			return new Promise((resolve) => existing.waiters.push(resolve));
		}
		const entry: QueueEntry = { text, lang, waiters: [] };
		queue.set(key, entry);
		const promise = new Promise<string | null>((resolve) => entry.waiters.push(resolve));
		pump();
		return promise;
	};

	const markSettledSummary = (row: Element, zh: string): void => {
		const summary = row.querySelector(SUMMARY_SELECTOR);
		if (summary === null) return;
		if (summary.getAttribute(HIDDEN_ATTR) !== 'true') summary.setAttribute(HIDDEN_ATTR, 'true');
		const holder = summary.parentElement;
		if (holder === null) return;
		let node = holder.querySelector(':scope > .' + ZH_SUMMARY_CLASS);
		if (node === null) {
			node = doc.createElement('span');
			node.className = ZH_SUMMARY_CLASS;
			holder.appendChild(node);
		}
		if (node.textContent !== zh) node.textContent = zh;
	};

	const markSettledBody = (row: Element, zh: string): void => {
		const body = row.querySelector(BODY_SELECTOR);
		if (body === null) return;
		let wrapper = body.querySelector(':scope > .' + ZH_BODY_CLASS);
		if (wrapper === null) {
			wrapper = doc.createElement('div');
			wrapper.className = ZH_BODY_CLASS;
			const para = doc.createElement('div');
			para.className = 'agy-think-zh';
			const sep = doc.createElement('div');
			sep.className = 'agy-think-zh-sep';
			sep.textContent = '原文 · English';
			wrapper.appendChild(para);
			wrapper.appendChild(sep);
			body.insertBefore(wrapper, body.firstChild);
		}
		const para = wrapper.querySelector('.agy-think-zh');
		if (para !== null && para.textContent !== zh) para.textContent = zh;
	};

	/**
	 * Text of a node with our own injected blocks removed, so a second scan sees
	 * the same English source instead of our translation.
	 */
	const ownText = (el: Element | null): string => {
		if (el === null) return '';
		let out = '';
		for (const child of Array.from(el.childNodes)) {
			if (child instanceof Element && (child.classList.contains(ZH_BODY_CLASS) || child.classList.contains(ZH_SUMMARY_CLASS))) continue;
			out += child.textContent ?? '';
		}
		return out;
	};

	const enhanceRow = (row: Element): void => {
		// Only settled blocks: a running block's text is still growing, and a
		// translate call during the run competes with the run itself.
		if ((row.getAttribute('data-state') ?? '') !== 'ok') return;
		const summary = row.querySelector(SUMMARY_SELECTOR);
		const body = row.querySelector(BODY_SELECTOR);
		const summaryText = cleanThoughtText(ownText(summary)).trim();
		const bodyText = cleanThoughtText(ownText(body)).trim();

		// Expanded: translate the full prose (it subsumes the summary).
		const fullText = bodyText;
		if (fullText !== '') {
			if (fullText.length < MIN_INPUT_CHARS || fullText.length > MAX_INPUT_CHARS) return;
			const key = cacheKeyFor(fullText);
			const cached = readCache(key);
			if (cached !== null) {
				markSettledBody(row, cached);
				markSettledSummary(row, firstLine(cached));
				return;
			}
			void requestTranslation(fullText, opts.lang?.()).then((zh) => {
				if (disposed || zh === null) return;
				if (!row.isConnected) return;
				markSettledBody(row, zh);
				markSettledSummary(row, firstLine(zh));
			});
			return;
		}

		if (summaryText.length < MIN_INPUT_CHARS || summaryText.length > MAX_INPUT_CHARS) return;
		const key = cacheKeyFor(summaryText);
		const cached = readCache(key);
		if (cached !== null) {
			markSettledSummary(row, cached);
			return;
		}
		void requestTranslation(summaryText, opts.lang?.()).then((zh) => {
			if (disposed || zh === null) return;
			if (!row.isConnected) return;
			markSettledSummary(row, firstLine(zh));
		});
	};

	const scan = (): void => {
		if (disposed) return;
		if (!opts.enabled()) return;
		if (isInteractionLocked()) return;
		for (const row of Array.from(doc.querySelectorAll(ROW_SELECTOR))) {
			try {
				enhanceRow(row);
			} catch {
				// One malformed row must not stop the rest of the transcript.
			}
		}
	};

	const schedule = (): void => {
		if (disposed || timer !== null) return;
		timer = window.setTimeout(() => {
			timer = null;
			scan();
		}, 220);
	};

	const observer = new MutationObserver(schedule);
	try {
		observer.observe(doc.body ?? doc.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-state', 'data-expanded'] });
	} catch {
		// A host without MutationObserver still gets the first pass below.
	}
	const setup = () => scan();
	if (doc.readyState === 'loading') {
		window.addEventListener('DOMContentLoaded', setup, { once: true });
	} else {
		setup();
	}

	const dispose = (): void => {
		disposed = true;
		observer.disconnect();
		if (timer !== null) {
			clearTimeout(timer);
			timer = null;
		}
		window.removeEventListener('DOMContentLoaded', setup);
		for (const node of Array.from(doc.querySelectorAll('.' + ZH_SUMMARY_CLASS))) node.remove();
		for (const node of Array.from(doc.querySelectorAll('.' + ZH_BODY_CLASS))) node.remove();
		for (const node of Array.from(doc.querySelectorAll(`[${HIDDEN_ATTR}]`))) node.removeAttribute(HIDDEN_ATTR);
		style?.remove();
		if (activeDispose === dispose) activeDispose = null;
	};
	activeDispose = dispose;
	return dispose;
}

/** Reset the module-level installation (tests only). */
export function disposeThinkingTranslationForTest(): void {
	activeDispose?.();
	activeDispose = null;
}

export type { ThinkingTranslationOptions, UnknownRecord, ReactApi };
