// Hover/focus tooltip layer for the account console.
//
// The per-account row actions are icon-only (28px) to keep the email and its
// badges on one line, so every one of them needs a readable label on hover.
// The native `title` attribute was the wrong answer: it waits ~1s, renders in
// OS chrome and cannot follow the DSH design tokens.
//
// This module owns ONE tooltip node for the whole page and resolves labels
// from a `data-agy-tip` attribute via event delegation, so React re-renders
// never leave stale tooltips attached to detached buttons.

const TIP_ATTR = 'data-agy-tip';
const TIP_CLASS = 'agy-tip';
const SHOW_DELAY_MS = 120;
const GAP_PX = 8;
const EDGE_PX = 8;

let activeDispose: (() => void) | null = null;

/** Tooltip styling; kept next to the layer so the tag can be injected standalone. */
export const TOOLTIP_CSS = `
.agy-tip {
	position: fixed;
	z-index: 100000;
	top: 0;
	left: 0;
	max-width: min(280px, calc(100vw - 16px));
	padding: 5px 9px;
	border-radius: 7px;
	background: var(--dsw-alias-tooltip-bg, rgba(15, 23, 42, 0.96));
	color: var(--dsw-alias-tooltip-label, #f8fafc);
	font-family: var(--agy-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif);
	font-size: 11.5px;
	font-weight: 500;
	line-height: 1.5;
	white-space: normal;
	text-align: left;
	pointer-events: none;
	opacity: 0;
	transform: translateY(2px);
	transition: opacity 0.12s ease, transform 0.12s ease;
	box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
	border: 1px solid rgba(255, 255, 255, 0.08);
	box-sizing: border-box;
}
.agy-tip[data-visible="true"] {
	opacity: 1;
	transform: translateY(0);
}
@media (prefers-reduced-motion: reduce) {
	.agy-tip { transition: none; }
}
`;

/** Compute a viewport-clamped position above the anchor (below when it does not fit). */
export function placeTooltip(
	anchor: { top: number; bottom: number; left: number; width: number },
	size: { width: number; height: number },
	viewport: { width: number; height: number },
): { top: number; left: number } {
	const above = anchor.top - size.height - GAP_PX;
	const fitAbove = above >= EDGE_PX;
	const top = fitAbove ? above : Math.min(anchor.bottom + GAP_PX, viewport.height - size.height - EDGE_PX);
	const centered = anchor.left + anchor.width / 2 - size.width / 2;
	const maxLeft = Math.max(EDGE_PX, viewport.width - size.width - EDGE_PX);
	const left = Math.min(Math.max(centered, EDGE_PX), maxLeft);
	return { top: Math.max(top, EDGE_PX), left };
}

/**
 * Install the delegated tooltip layer.
 * @returns disposer that removes the layer and every listener.
 */
export function installAgyTooltips(): () => void {
	if (typeof window === 'undefined' || typeof document === 'undefined') return () => {};
	activeDispose?.();

	const doc = document;
	const host = doc.head ?? doc.documentElement;
	if (!host) return () => {};

	const styleId = 'dsh-agy-link-tooltip-css';
	let style = doc.getElementById(styleId) as HTMLStyleElement | null;
	if (style === null) {
		style = doc.createElement('style');
		style.id = styleId;
		style.setAttribute('data-plugin', 'dsh-agy-link');
		host.appendChild(style);
	}
	style.textContent = TOOLTIP_CSS;

	let tip = doc.querySelector(`.${TIP_CLASS}`) as HTMLDivElement | null;
	if (tip === null) {
		tip = doc.createElement('div');
		tip.className = TIP_CLASS;
		tip.setAttribute('role', 'tooltip');
		tip.setAttribute('aria-hidden', 'true');
		tip.dataset.visible = 'false';
		(doc.body ?? doc.documentElement).appendChild(tip);
	}
	const node = tip;
	let showTimer: number | null = null;
	let current: Element | null = null;

	const clearTimer = () => {
		if (showTimer !== null) {
			clearTimeout(showTimer);
			showTimer = null;
		}
	};

	const hide = () => {
		clearTimer();
		current = null;
		node.dataset.visible = 'false';
		node.setAttribute('aria-hidden', 'true');
	};

	const show = (anchor: Element, text: string) => {
		node.textContent = text;
		node.dataset.visible = 'true';
		node.setAttribute('aria-hidden', 'false');
		// Measure after the text lands but before positioning, so a long label
		// never flashes at the previous width.
		const rect = anchor.getBoundingClientRect();
		const size = { width: node.offsetWidth, height: node.offsetHeight };
		const pos = placeTooltip(rect, size, { width: window.innerWidth, height: window.innerHeight });
		node.style.top = `${pos.top}px`;
		node.style.left = `${pos.left}px`;
		current = anchor;
	};

	const anchorOf = (target: EventTarget | null): Element | null => {
		if (!(target instanceof Element)) return null;
		const el = target.closest(`[${TIP_ATTR}]`);
		if (!el) return null;
		const text = el.getAttribute(TIP_ATTR)?.trim();
		return text ? el : null;
	};

	const onPointerOver = (event: Event) => {
		const el = anchorOf(event.target);
		if (!el) {
			if (current !== null && !(event.target instanceof Node && current.contains(event.target))) hide();
			// Not an anchor: a tooltip belonging to a sibling stays until its own
			// pointerout fires, which keeps the bubble stable while moving between
			// the icon and its 28px hit area.
			return;
		}
		if (el === current) return;
		clearTimer();
		const text = el.getAttribute(TIP_ATTR) ?? '';
		showTimer = window.setTimeout(() => show(el, text), SHOW_DELAY_MS);
	};

	const onPointerOut = (event: Event) => {
		const el = anchorOf(event.target);
		if (!el) return;
		const to = (event as PointerEvent).relatedTarget;
		if (to instanceof Node && el.contains(to)) return;
		if (current === el || showTimer !== null) {
			clearTimer();
			if (current === el) hide();
		}
	};

	const onFocusIn = (event: Event) => {
		const el = anchorOf(event.target);
		if (!el) return;
		clearTimer();
		show(el, el.getAttribute(TIP_ATTR) ?? '');
	};

	const onFocusOut = () => hide();
	const onDismiss = () => hide();
	const onKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'Escape') hide();
	};

	// Listeners live on the document so the layer keeps working inside the
	// settings modal and its own scroll containers.
	doc.addEventListener('pointerover', onPointerOver, true);
	doc.addEventListener('pointerout', onPointerOut, true);
	doc.addEventListener('focusin', onFocusIn, true);
	doc.addEventListener('focusout', onFocusOut, true);
	doc.addEventListener('pointerdown', onDismiss, true);
	doc.addEventListener('keydown', onKeyDown, true);
	window.addEventListener('scroll', onDismiss, true);
	window.addEventListener('resize', onDismiss);

	const dispose = () => {
		clearTimer();
		doc.removeEventListener('pointerover', onPointerOver, true);
		doc.removeEventListener('pointerout', onPointerOut, true);
		doc.removeEventListener('focusin', onFocusIn, true);
		doc.removeEventListener('focusout', onFocusOut, true);
		doc.removeEventListener('pointerdown', onDismiss, true);
		doc.removeEventListener('keydown', onKeyDown, true);
		window.removeEventListener('scroll', onDismiss, true);
		window.removeEventListener('resize', onDismiss);
		node.remove();
		style?.remove();
		if (activeDispose === dispose) activeDispose = null;
	};
	activeDispose = dispose;
	return dispose;
}
