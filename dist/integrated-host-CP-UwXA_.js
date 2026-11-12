import { n as require_undici, s as stateDir, t as validDirectProxy } from "./direct-proxy-7BxBpCdu.js";
import { spawn } from "node:child_process";
import { dirname, join } from "node:path";
import { readFileSync, statSync } from "node:fs";
import { chmod, lstat, mkdir, open, readFile, rename, rm, unlink, writeFile } from "node:fs/promises";
import { CONTEXT_WINDOW_EXCEEDED_CODE, HarnessError, LlmAdapter, LlmError, ReasoningEffortId, ToolCallId, attributionHeaders, resolveRetryPolicy } from "@deepseek-ai/dsh-llm";
import { createHash, randomBytes, randomUUID } from "node:crypto";
import { createServer } from "node:http";
import * as net from "node:net";
import { PassThrough, Transform } from "node:stream";
import * as tls from "node:tls";
import { Buffer as Buffer$1 } from "node:buffer";
import { createGunzip } from "node:zlib";
import { clientRequestSchema } from "@deepseek-ai/dsh-client-connection";
import z from "@deepseek-ai/schemastery";
import { WebError } from "@deepseek-ai/dsh-web";
//#region direct/legacy/src/safe-text.ts
/** Shared bounded text predicate for Host trust-boundary values. */
function isBoundedSafeText(value, maxLength, minLength = 1) {
	if (typeof value !== "string" || !Number.isSafeInteger(maxLength) || !Number.isSafeInteger(minLength) || minLength < 0 || maxLength < minLength || value.length < minLength || value.length > maxLength) return false;
	for (let index = 0; index < value.length; index += 1) {
		const codePoint = value.charCodeAt(index);
		if (codePoint < 32 || codePoint === 127) return false;
	}
	return true;
}
const AUTH_STORE_LOCK_NAME = ".auth.lock";
const AUTH_STORE_LOCK_TIMEOUT_MS = 1e4;
const AUTH_STORE_LOCK_STALE_MS = 3e4;
const AUTH_STORE_LOCK_RETRY_MS = 10;
var AuthStoreError = class extends Error {
	code;
	constructor(code, message) {
		super(message);
		this.name = "AuthStoreError";
		this.code = code;
	}
};
/** Resolve the plugin-owned default path without reading it. */
function defaultAuthStorePath(env = process.env, home = env.HOME, platform = process.platform) {
	if (platform === "win32") {
		const windowsDataHome = env.LOCALAPPDATA ?? env.APPDATA;
		const base = typeof windowsDataHome === "string" && windowsDataHome.length > 0 ? windowsDataHome : env.USERPROFILE ?? home ?? "";
		return join(base, "dsh-antigravity-auth", "auth.json");
	}
	const dataHome = env.XDG_DATA_HOME;
	const base = typeof dataHome === "string" && dataHome.length > 0 ? dataHome : join(home ?? "", ".local", "share");
	return join(base, "dsh-antigravity-auth", "auth.json");
}
/** Create one store whose public API never exposes an access token field. */
function createAuthStore(path, options = {}) {
	const now = options.now ?? (() => Date.now());
	const platform = options.platform ?? process.platform;
	const enqueue = createMutationQueue();
	const read = () => readAuthRecordForPlatform(path, platform);
	return {
		read,
		commit: (draft) => enqueue(() => withStoreLock(path, async () => {
			const record = makeRecord(draft, ((await read())?.revision ?? 0) + 1, now());
			await writeAuthRecord(path, record);
			return record;
		})),
		compareAndCommit: (expectedRevision, draft, expectedLineage) => enqueue(() => withStoreLock(path, async () => {
			const current = await read();
			if ((current?.revision ?? 0) !== expectedRevision) return void 0;
			const lineage = expectedLineage ?? draft.lineage;
			if (lineage === void 0 ? current?.lineage !== void 0 : current?.lineage !== lineage) return void 0;
			const record = makeRecord(draft, expectedRevision + 1, now());
			await writeAuthRecord(path, record);
			return record;
		})),
		clearIfCurrent: (expectedRevision, expectedLineage) => enqueue(() => withStoreLock(path, async () => {
			const current = await read();
			if ((current?.revision ?? 0) !== expectedRevision) return false;
			if (expectedLineage === void 0 ? current?.lineage !== void 0 : current?.lineage !== expectedLineage) return false;
			try {
				await unlink(path);
			} catch (error) {
				if (!isNotFound(error)) throw storeIoError();
			}
			await syncDirectory(dirname(path));
			return true;
		})),
		clear: () => enqueue(() => withStoreLock(path, async () => {
			try {
				await unlink(path);
			} catch (error) {
				if (!isNotFound(error)) throw storeIoError();
			}
			await syncDirectory(dirname(path));
		}))
	};
}
function createMutationQueue() {
	let mutation = Promise.resolve();
	return function enqueue(operation) {
		const next = mutation.then(operation, operation);
		mutation = next.then(() => {}, () => {});
		return next;
	};
}
async function withStoreLock(path, operation) {
	const parent = dirname(path);
	await prepareParent(parent);
	const lockPath = join(parent, AUTH_STORE_LOCK_NAME);
	const deadline = Date.now() + AUTH_STORE_LOCK_TIMEOUT_MS;
	while (true) try {
		const handle = await open(lockPath, "wx", 384);
		try {
			await handle.writeFile(`${process.pid}\n`, "utf8");
			await handle.sync();
			return await operation();
		} finally {
			await handle.close().catch(() => {});
			await unlink(lockPath).catch(() => {});
		}
	} catch (error) {
		if (error instanceof AuthStoreError) throw error;
		if (!isAlreadyExists(error)) throw storeIoError();
		await removeStaleLock(lockPath);
		if (Date.now() >= deadline) throw conflictError();
		await new Promise((resolve) => setTimeout(resolve, AUTH_STORE_LOCK_RETRY_MS));
	}
}
async function prepareParent(parent) {
	try {
		const parentInfo = await lstat(parent);
		if (parentInfo.isSymbolicLink() || !parentInfo.isDirectory()) throw unsafePermissionsError();
	} catch (error) {
		if (!isNotFound(error)) throw error;
	}
	try {
		await mkdir(parent, {
			recursive: true,
			mode: 448
		});
		await chmod(parent, 448);
	} catch (error) {
		if (error instanceof AuthStoreError) throw error;
		throw storeIoError();
	}
}
async function syncDirectory(path) {
	if (process.platform === "win32") return;
	const handle = await open(path, "r");
	try {
		await handle.sync();
	} finally {
		await handle.close().catch(() => {});
	}
}
async function removeStaleLock(path) {
	try {
		const info = await lstat(path);
		if (Date.now() - info.mtimeMs > AUTH_STORE_LOCK_STALE_MS) await unlink(path).catch(() => {});
	} catch (error) {
		if (!isNotFound(error)) return;
	}
}
async function readAuthRecordForPlatform(path, platform) {
	let fileInfo;
	try {
		fileInfo = await lstat(path);
	} catch (error) {
		if (isNotFound(error)) return void 0;
		throw storeIoError();
	}
	if (fileInfo.isSymbolicLink() || !fileInfo.isFile()) throw unsafePermissionsError();
	await assertOwnerOnly(path, platform);
	let text;
	try {
		text = await readFile(path, "utf8");
	} catch {
		throw storeIoError();
	}
	let parsed;
	try {
		parsed = JSON.parse(text);
	} catch {
		throw corruptError();
	}
	return parseRecord(parsed);
}
async function writeAuthRecord(path, record) {
	const validated = parseRecord(record);
	const parent = dirname(path);
	try {
		await prepareParent(parent);
		const temporary = join(parent, `.${randomUUID()}.tmp`);
		try {
			const handle = await open(temporary, "wx", 384);
			try {
				await handle.writeFile(`${JSON.stringify(validated)}\n`, "utf8");
				await handle.sync();
			} finally {
				await handle.close().catch(() => {});
			}
			await chmod(temporary, 384);
			await rename(temporary, path);
			await chmod(path, 384);
			await syncDirectory(parent);
		} catch {
			await unlink(temporary).catch(() => {});
			throw storeIoError();
		}
	} catch (error) {
		if (error instanceof AuthStoreError) throw error;
		throw storeIoError();
	}
}
function makeRecord(draft, revision, now) {
	if (!isRecord$12(draft) || !isBoundedSafeText(draft.refreshToken, 4096) || !isBoundedSafeText(draft.projectId, 4096) || draft.lineage !== void 0 && !isBoundedSafeText(draft.lineage, 4096) || !Number.isSafeInteger(revision) || revision < 1 || !Number.isFinite(now)) throw corruptError();
	return {
		version: 1,
		refreshToken: draft.refreshToken,
		projectId: draft.projectId,
		revision,
		updatedAt: new Date(now).toISOString(),
		lineage: draft.lineage ?? randomUUID(),
		...draft.email === void 0 ? {} : { email: validateEmail(draft.email) }
	};
}
function parseRecord(value) {
	if (!isRecord$12(value)) throw corruptError();
	if (value.version !== 1) throw unsupportedVersionError();
	const keys = Object.keys(value).sort();
	const required = [
		"projectId",
		"refreshToken",
		"revision",
		"updatedAt",
		"version"
	];
	const withEmail = [...required, "email"].sort();
	const withLineage = [...required, "lineage"].sort();
	const withEmailAndLineage = [
		...required,
		"email",
		"lineage"
	].sort();
	const expected = keys.length === required.length ? required : keys.includes("lineage") ? keys.includes("email") ? withEmailAndLineage : withLineage : withEmail;
	if (keys.length !== expected.length || keys.some((key, index) => key !== expected[index])) throw corruptError();
	const refreshToken = value.refreshToken;
	const projectId = value.projectId;
	const revision = value.revision;
	const updatedAt = value.updatedAt;
	const lineage = value.lineage;
	if (!isBoundedSafeText(refreshToken, 4096) || !isBoundedSafeText(projectId, 4096) || typeof revision !== "number" || !Number.isSafeInteger(revision) || revision < 1 || typeof updatedAt !== "string" || !Number.isFinite(Date.parse(updatedAt)) || lineage !== void 0 && !isBoundedSafeText(lineage, 4096)) throw corruptError();
	const email = value.email;
	if (email !== void 0 && !isBoundedSafeText(email, 4096)) throw corruptError();
	return {
		version: 1,
		refreshToken,
		projectId,
		revision,
		updatedAt,
		...email === void 0 ? {} : { email },
		...lineage === void 0 ? {} : { lineage }
	};
}
async function assertOwnerOnly(path, platform) {
	try {
		const file = await lstat(path);
		const parent = await lstat(dirname(path));
		const unsafePosixMode = platform !== "win32" && ((file.mode & 63) !== 0 || (parent.mode & 63) !== 0);
		if (file.isSymbolicLink() || parent.isSymbolicLink() || !parent.isDirectory() || unsafePosixMode) throw unsafePermissionsError();
	} catch (error) {
		if (error instanceof AuthStoreError) throw error;
		throw storeIoError();
	}
}
function validateEmail(value) {
	if (!isBoundedSafeText(value, 4096) || !value.includes("@")) throw corruptError();
	return value;
}
function corruptError() {
	return new AuthStoreError("AUTH_STORE_CORRUPT", "The Antigravity auth store is not valid");
}
function unsupportedVersionError() {
	return new AuthStoreError("AUTH_STORE_UNSUPPORTED_VERSION", "The Antigravity auth store version is unsupported");
}
function unsafePermissionsError() {
	return new AuthStoreError("AUTH_STORE_UNSAFE_PERMISSIONS", "The Antigravity auth store permissions are unsafe");
}
function storeIoError() {
	return new AuthStoreError("AUTH_STORE_IO", "The Antigravity auth store could not be accessed");
}
function conflictError() {
	return new AuthStoreError("AUTH_STORE_CONFLICT", "The Antigravity auth store is busy");
}
function isAlreadyExists(error) {
	return error?.code === "EEXIST";
}
function isNotFound(error) {
	return error?.code === "ENOENT";
}
function isRecord$12(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
//#endregion
//#region direct/legacy/src/oauth-client-credentials.ts
/** Local client configuration only; never returned by RPC or written to logs. */
function directOAuthClientCredentials() {
	const clientId = process.env.AGY_CLIENT_ID?.trim();
	const clientSecret = process.env.AGY_CLIENT_SECRET?.trim();
	if (clientId || clientSecret) return clientId && clientSecret ? {
		clientId,
		clientSecret
	} : void 0;
	try {
		const path = join(stateDir(), "direct", "oauth-client.json");
		const stat = statSync(path);
		if (!stat.isFile() || stat.size > 16384 || process.platform !== "win32" && (stat.mode & 63) !== 0) return void 0;
		const value = JSON.parse(readFileSync(path, "utf8"));
		if (typeof value !== "object" || value === null || Array.isArray(value)) return void 0;
		const record = value;
		const id = typeof record.clientId === "string" ? record.clientId.trim() : "";
		const secret = typeof record.clientSecret === "string" ? record.clientSecret.trim() : "";
		return id && secret ? {
			clientId: id,
			clientSecret: secret
		} : void 0;
	} catch {
		return;
	}
}
//#endregion
//#region direct/legacy/src/credential-coordinator.ts
const ANTIGRAVITY_TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
const ANTIGRAVITY_REVOKE_ENDPOINT = "https://oauth2.googleapis.com/revoke";
const DEFAULT_REFRESH_LEAD_MS = 3e4;
const DEFAULT_OPERATION_TIMEOUT_MS$1 = 1e4;
const MAX_REFRESH_ATTEMPTS = 2;
const MAX_RESPONSE_BYTES$1 = 65536;
const MAX_EXPIRES_IN_SECONDS = 31536e3;
var CredentialOperationError = class extends Error {
	code;
	constructor(code, message = credentialErrorMessage(code) ?? "The Antigravity credential operation failed") {
		super(message);
		this.name = "CredentialOperationError";
		this.code = code;
	}
};
function createCredentialCoordinator(options) {
	const now = options.now ?? (() => Date.now());
	const refreshAccessToken = options.refreshToken ?? createGoogleRefreshTransport(options.fetchImpl, now);
	const revokeGrant = options.revokeGrant ?? createGoogleRevokeTransport(options.fetchImpl);
	const refreshLeadMs = Math.max(0, options.refreshLeadMs ?? DEFAULT_REFRESH_LEAD_MS);
	const operationTimeoutMs = Math.max(1, options.operationTimeoutMs ?? DEFAULT_OPERATION_TIMEOUT_MS$1);
	let cached;
	let observedRevision = 0;
	let observedLineage;
	let state = "logged-out";
	let errorCode;
	let lastRefreshAt;
	let refreshFlight;
	let revokeFlight;
	let revokeStatus = { state: "idle" };
	let generation = 0;
	let disposed = false;
	const lifecycleAbort = new AbortController();
	const operations = /* @__PURE__ */ new Set();
	const coordinator = {
		credential: async (signal, credentialOptions) => {
			ensureNotDisposed();
			if (signal?.aborted === true) throw new CredentialOperationError("cancelled");
			const record = await options.store.read();
			if (record === void 0) {
				clearObservedCredential();
				return;
			}
			observe(record);
			if (state === "re-login-required") return void 0;
			if (credentialOptions?.forceRefresh !== true && cached !== void 0 && sameRecord(cached, record) && isFresh(cached.value, now(), refreshLeadMs)) {
				state = "logged-in";
				errorCode = void 0;
				return await waitForCaller$1(Promise.resolve(cached.value), signal);
			}
			if (refreshFlight === void 0) {
				const flight = refreshCredential(generation);
				refreshFlight = flight;
				flight.then(() => clearRefreshFlight(flight), () => clearRefreshFlight(flight));
			}
			return await waitForCaller$1(refreshFlight, signal);
		},
		replaceFromLogin: (credential, record) => {
			if (disposed) return;
			generation += 1;
			abortOperations();
			cached = {
				value: { ...credential },
				revision: record.revision,
				...record.lineage === void 0 ? {} : { lineage: record.lineage }
			};
			observedRevision = record.revision;
			observedLineage = record.lineage;
			state = "logged-in";
			errorCode = void 0;
			lastRefreshAt = void 0;
			revokeStatus = { state: "idle" };
			refreshFlight = void 0;
			revokeFlight = void 0;
		},
		status: async () => {
			ensureNotDisposed();
			const record = await options.store.read();
			if (record === void 0) clearObservedCredential();
			else observe(record);
			return makeCredentialStatus(record);
		},
		revokeStatus: () => ({ ...revokeStatus }),
		resetCache: () => {
			generation += 1;
			abortOperations();
			cached = void 0;
			observedRevision = 0;
			observedLineage = void 0;
			refreshFlight = void 0;
			revokeFlight = void 0;
			state = "logged-out";
			errorCode = void 0;
			revokeStatus = { state: "idle" };
			lastRefreshAt = void 0;
		},
		logout: async (binding) => {
			ensureNotDisposed();
			generation += 1;
			const logoutGeneration = generation;
			abortOperations();
			refreshFlight = void 0;
			revokeFlight = void 0;
			cached = void 0;
			observedRevision = 0;
			observedLineage = void 0;
			const record = await options.store.read();
			if (!isActive(logoutGeneration)) return { state: "logged-out" };
			if (binding !== void 0 && !matchesBinding(record, binding.record)) {
				if (record !== void 0) observe(record);
				return { state: "logged-out" };
			}
			let cleared = true;
			if (record !== void 0) cleared = await options.store.clearIfCurrent(record.revision, record.lineage);
			if (!isActive(logoutGeneration)) {
				if (cleared && record !== void 0) await binding?.onCleared();
				return { state: "logged-out" };
			}
			if (!cleared) {
				const latest = await options.store.read();
				if (!isActive(logoutGeneration)) return { state: "logged-out" };
				if (latest === void 0) {
					clearObservedCredential();
					revokeStatus = { state: "logged-out" };
				} else observe(latest);
				return { state: "logged-out" };
			}
			state = "logged-out";
			errorCode = void 0;
			lastRefreshAt = void 0;
			revokeStatus = { state: "logged-out" };
			await binding?.onCleared();
			return { state: "logged-out" };
		},
		revoke: async (confirmed, signal, binding) => {
			ensureNotDisposed();
			if (!confirmed) {
				revokeStatus = { state: "confirmation-required" };
				return { state: "confirmation-required" };
			}
			if (signal?.aborted === true) throw new CredentialOperationError("cancelled");
			if (revokeFlight !== void 0) return await waitForCaller$1(revokeFlight, signal);
			generation += 1;
			abortOperations();
			refreshFlight = void 0;
			const revokeGeneration = generation;
			const record = await options.store.read();
			if (!isActive(revokeGeneration)) return { state: "superseded" };
			if (binding !== void 0 && !matchesBinding(record, binding.record)) return { state: "superseded" };
			if (record === void 0) {
				clearObservedCredential();
				revokeStatus = { state: "logged-out" };
				return { state: "logged-out" };
			}
			revokeStatus = { state: "pending" };
			const flight = revokeCredential(record, revokeGeneration, binding);
			revokeFlight = flight;
			flight.then(() => clearRevokeFlight(flight), () => clearRevokeFlight(flight));
			return await waitForCaller$1(flight, signal);
		},
		dispose: async () => {
			if (disposed) return;
			disposed = true;
			generation += 1;
			lifecycleAbort.abort(new CredentialOperationError("cancelled", "The Antigravity credential service was disposed"));
			abortOperations();
			refreshFlight = void 0;
			revokeFlight = void 0;
			cached = void 0;
			operations.clear();
		}
	};
	function ensureNotDisposed() {
		if (disposed) throw new CredentialOperationError("cancelled", "The Antigravity credential service is unavailable");
	}
	function beginOperation() {
		const controller = new AbortController();
		operations.add(controller);
		if (lifecycleAbort.signal.aborted) controller.abort(lifecycleAbort.signal.reason);
		return controller;
	}
	function endOperation(controller) {
		operations.delete(controller);
	}
	function abortOperations() {
		for (const controller of operations) controller.abort(new CredentialOperationError("cancelled"));
		operations.clear();
	}
	function clearRefreshFlight(flight) {
		if (refreshFlight === flight) refreshFlight = void 0;
	}
	function clearRevokeFlight(flight) {
		if (revokeFlight === flight) revokeFlight = void 0;
	}
	function clearObservedCredential() {
		cached = void 0;
		observedRevision = 0;
		observedLineage = void 0;
		if (!disposed) {
			state = "logged-out";
			errorCode = void 0;
			lastRefreshAt = void 0;
		}
	}
	function observe(record) {
		const lineageChanged = observedRevision !== 0 && observedLineage !== record.lineage;
		if (observedRevision !== 0 && (observedRevision !== record.revision || lineageChanged)) {
			cached = void 0;
			state = "logged-in";
			errorCode = void 0;
			lastRefreshAt = void 0;
		}
		observedRevision = record.revision;
		observedLineage = record.lineage;
		if (state === "logged-out") state = "logged-in";
	}
	function isFresh(credential, timestamp, lead) {
		return Number.isFinite(credential.expiresAt) && credential.expiresAt - timestamp > lead;
	}
	function sameRecord(value, record) {
		return value.revision === record.revision && value.lineage === record.lineage;
	}
	function makeCredentialStatus(record) {
		const configured = record !== void 0;
		const expiresAt = cached === void 0 ? void 0 : new Date(cached.value.expiresAt).toISOString();
		return {
			state: configured ? state : "logged-out",
			configured,
			...expiresAt === void 0 ? {} : { expiresAt },
			...lastRefreshAt === void 0 ? {} : { lastRefreshAt: new Date(lastRefreshAt).toISOString() },
			...errorCode === void 0 ? {} : { errorCode }
		};
	}
	async function refreshCredential(startGeneration) {
		if (disposed || startGeneration !== generation) return void 0;
		let record = await options.store.read();
		if (!isActive(startGeneration)) return void 0;
		if (record === void 0) {
			clearObservedCredential();
			return;
		}
		observe(record);
		if (state === "re-login-required") return void 0;
		for (let attempt = 0; attempt < MAX_REFRESH_ATTEMPTS; attempt += 1) {
			if (!isActive(startGeneration)) return void 0;
			state = "refreshing";
			errorCode = void 0;
			const operation = beginOperation();
			let result;
			try {
				result = await runBounded((signal) => refreshAccessToken({
					refreshToken: record.refreshToken,
					signal
				}), operation, operationTimeoutMs);
				validateRefreshResult(result);
			} catch (error) {
				endOperation(operation);
				if (!isActive(startGeneration) || isCancelled(error)) return void 0;
				setRefreshFailure(error);
				return;
			}
			endOperation(operation);
			if (!isActive(startGeneration)) return void 0;
			const current = await options.store.read();
			if (!isActive(startGeneration)) return void 0;
			const responseRefreshToken = result.refreshToken ?? record.refreshToken;
			if (current === void 0) {
				clearObservedCredential();
				return;
			}
			if (sameLineage(current, record) && current.revision !== record.revision) {
				if (current.refreshToken === responseRefreshToken) return adoptRefreshedCredential(result, current, startGeneration, record);
				record = current;
				observe(record);
				continue;
			}
			if (!sameLineage(current, record)) {
				record = current;
				observe(record);
				continue;
			}
			const committed = await options.store.compareAndCommit(record.revision, {
				refreshToken: responseRefreshToken,
				projectId: record.projectId,
				...record.email === void 0 ? {} : { email: record.email },
				...record.lineage === void 0 ? {} : { lineage: record.lineage }
			}, record.lineage);
			if (committed !== void 0) return adoptRefreshedCredential(result, committed, startGeneration, record);
			const latest = await options.store.read();
			if (!isActive(startGeneration)) return void 0;
			if (latest === void 0) {
				clearObservedCredential();
				return;
			}
			if (latest.refreshToken === responseRefreshToken && sameLineage(latest, record)) return adoptRefreshedCredential(result, latest, startGeneration, record);
			record = latest;
			observe(record);
		}
		if (isActive(startGeneration)) {
			state = "refresh-failed";
			errorCode = "conflict";
		}
	}
	async function adoptRefreshedCredential(result, record, startGeneration, previous) {
		if (!isActive(startGeneration)) return void 0;
		const credential = {
			accessToken: result.accessToken,
			refreshToken: result.refreshToken ?? record.refreshToken,
			expiresAt: result.expiresAt,
			projectId: record.projectId
		};
		cached = {
			value: credential,
			revision: record.revision,
			...record.lineage === void 0 ? {} : { lineage: record.lineage }
		};
		observedRevision = record.revision;
		observedLineage = record.lineage;
		state = "logged-in";
		errorCode = void 0;
		lastRefreshAt = now();
		if (result.refreshToken !== void 0) await options.onTokenRotated?.(record, previous);
		if (!isActive(startGeneration)) return void 0;
		return { ...credential };
	}
	async function revokeCredential(record, revokeGeneration, binding) {
		const operation = beginOperation();
		try {
			await runBounded((signal) => revokeGrant({
				token: record.refreshToken,
				signal
			}), operation, operationTimeoutMs);
		} catch (error) {
			endOperation(operation);
			if (!isActive(revokeGeneration) || isCancelled(error)) return { state: "superseded" };
			const code = toRevokeErrorCode(error);
			revokeStatus = {
				state: "failed",
				errorCode: code
			};
			return {
				state: "failed",
				errorCode: code
			};
		}
		endOperation(operation);
		if (!isActive(revokeGeneration)) return { state: "superseded" };
		let cleared;
		try {
			cleared = await options.store.clearIfCurrent(record.revision, record.lineage);
		} catch {
			if (!isActive(revokeGeneration)) return { state: "superseded" };
			revokeStatus = {
				state: "failed",
				errorCode: "storage"
			};
			return {
				state: "failed",
				errorCode: "storage"
			};
		}
		if (!cleared) {
			if (isActive(revokeGeneration)) revokeStatus = { state: "superseded" };
			return { state: "superseded" };
		}
		const superseded = !isActive(revokeGeneration);
		if (!superseded) {
			cached = void 0;
			observedRevision = 0;
			observedLineage = void 0;
			state = "logged-out";
			errorCode = void 0;
			lastRefreshAt = void 0;
			revokeStatus = { state: "revoked" };
		}
		try {
			await binding?.onCleared();
		} catch {
			if (isActive(revokeGeneration)) revokeStatus = {
				state: "failed",
				errorCode: "storage"
			};
			return {
				state: "failed",
				errorCode: "storage"
			};
		}
		return { state: superseded ? "superseded" : "revoked" };
	}
	function matchesBinding(current, expected) {
		if (current === void 0 || expected === void 0) return current === expected;
		return current.revision === expected.revision && current.lineage === expected.lineage && current.refreshToken === expected.refreshToken;
	}
	function isActive(expectedGeneration) {
		return !disposed && expectedGeneration === generation;
	}
	function setRefreshFailure(error) {
		const code = error instanceof CredentialOperationError ? error.code : "network";
		state = code === "invalid-grant" ? "re-login-required" : "refresh-failed";
		errorCode = code;
		cached = void 0;
	}
	function sameLineage(left, right) {
		if (left.lineage !== void 0 || right.lineage !== void 0) return left.lineage === right.lineage;
		return left.revision === right.revision;
	}
	function toRevokeErrorCode(error) {
		const code = error instanceof CredentialOperationError ? error.code : "network";
		if (code === "invalid-grant" || code === "conflict" || code === "cancelled") return "http-error";
		return code;
	}
	return coordinator;
}
function createGoogleRefreshTransport(fetchImpl = globalThis.fetch, now = () => Date.now()) {
	return async ({ refreshToken, signal }) => {
		const client = directOAuthClientCredentials();
		if (!client) throw new CredentialOperationError("client-not-configured");
		let response;
		try {
			response = await fetchImpl(ANTIGRAVITY_TOKEN_ENDPOINT, {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Accept: "application/json"
				},
				body: new URLSearchParams({
					client_id: client.clientId,
					client_secret: client.clientSecret,
					grant_type: "refresh_token",
					refresh_token: refreshToken
				}),
				signal
			});
		} catch (error) {
			if (isAbortError(error)) throw new CredentialOperationError("cancelled");
			throw new CredentialOperationError("network");
		}
		if (!response.ok && (response.status === 429 || response.status >= 500)) throw responseError(response.status);
		const body = await readJsonBody(response);
		if (!response.ok) throw responseError(response.status, body);
		if (!isRecord$11(body) || typeof body.access_token !== "string" || !isBoundedSafeText(body.access_token, 4096)) throw new CredentialOperationError("invalid-response");
		const expiresIn = body.expires_in;
		if (typeof expiresIn !== "number" || !Number.isFinite(expiresIn) || expiresIn <= 0 || expiresIn > MAX_EXPIRES_IN_SECONDS) throw new CredentialOperationError("invalid-response");
		const nextRefreshToken = body.refresh_token;
		if (nextRefreshToken !== void 0 && (typeof nextRefreshToken !== "string" || !isBoundedSafeText(nextRefreshToken, 4096))) throw new CredentialOperationError("invalid-response");
		return {
			accessToken: body.access_token,
			expiresAt: now() + expiresIn * 1e3,
			...nextRefreshToken === void 0 ? {} : { refreshToken: nextRefreshToken }
		};
	};
}
function createGoogleRevokeTransport(fetchImpl = globalThis.fetch) {
	return async ({ token, signal }) => {
		let response;
		try {
			response = await fetchImpl(ANTIGRAVITY_REVOKE_ENDPOINT, {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Accept: "*/*"
				},
				body: new URLSearchParams({ token }),
				signal
			});
		} catch (error) {
			if (isAbortError(error)) throw new CredentialOperationError("cancelled");
			throw new CredentialOperationError("network");
		}
		if (!response.ok) throw responseError(response.status);
	};
}
async function runBounded(operation, parent, timeoutMs) {
	const controller = new AbortController();
	let timer;
	let removeParentAbort;
	const operationPromise = Promise.resolve().then(() => operation(controller.signal));
	operationPromise.catch(() => {});
	const timeoutPromise = new Promise((_, reject) => {
		timer = setTimeout(() => {
			controller.abort(new CredentialOperationError("timeout"));
			reject(new CredentialOperationError("timeout"));
		}, timeoutMs);
	});
	const abortPromise = new Promise((_, reject) => {
		const abort = () => {
			controller.abort(parent.signal.reason);
			reject(new CredentialOperationError("cancelled"));
		};
		removeParentAbort = () => parent.signal.removeEventListener("abort", abort);
		if (parent.signal.aborted) abort();
		else parent.signal.addEventListener("abort", abort, { once: true });
	});
	try {
		return await Promise.race([
			operationPromise,
			timeoutPromise,
			abortPromise
		]);
	} finally {
		if (timer !== void 0) clearTimeout(timer);
		removeParentAbort?.();
		controller.abort();
	}
}
async function waitForCaller$1(promise, signal) {
	if (signal === void 0) return await promise;
	if (signal.aborted) throw new CredentialOperationError("cancelled");
	return await new Promise((resolve, reject) => {
		let settled = false;
		const abort = () => {
			if (settled) return;
			settled = true;
			reject(new CredentialOperationError("cancelled"));
		};
		signal.addEventListener("abort", abort, { once: true });
		promise.then((value) => {
			if (settled) return;
			settled = true;
			signal.removeEventListener("abort", abort);
			resolve(value);
		}, (error) => {
			if (settled) return;
			settled = true;
			signal.removeEventListener("abort", abort);
			reject(error);
		});
	});
}
async function readJsonBody(response) {
	const length = response.headers.get("content-length");
	if (length !== null && Number.isFinite(Number(length)) && Number(length) > MAX_RESPONSE_BYTES$1) throw new CredentialOperationError("invalid-response");
	let text;
	try {
		text = await response.text();
	} catch {
		throw new CredentialOperationError("invalid-response");
	}
	if (new TextEncoder().encode(text).byteLength > MAX_RESPONSE_BYTES$1) throw new CredentialOperationError("invalid-response");
	if (text.length === 0) return {};
	try {
		return JSON.parse(text);
	} catch {
		throw new CredentialOperationError("invalid-response");
	}
}
function responseError(status, body) {
	if (status === 400 && isRecord$11(body) && body.error === "invalid_grant") return new CredentialOperationError("invalid-grant");
	if (status === 408 || status === 504) return new CredentialOperationError("timeout");
	if (status === 429) return new CredentialOperationError("rate-limited");
	if (status >= 500 && status <= 599) return new CredentialOperationError("server-error");
	return new CredentialOperationError("http-error");
}
function validateRefreshResult(value) {
	if (!isRecord$11(value) || typeof value.accessToken !== "string" || !isBoundedSafeText(value.accessToken, 4096) || typeof value.expiresAt !== "number" || !Number.isFinite(value.expiresAt)) throw new CredentialOperationError("invalid-response");
	if (value.refreshToken !== void 0 && (typeof value.refreshToken !== "string" || !isBoundedSafeText(value.refreshToken, 4096))) throw new CredentialOperationError("invalid-response");
}
function isCancelled(error) {
	return error instanceof CredentialOperationError && error.code === "cancelled";
}
function isAbortError(error) {
	return error instanceof Error && error.name === "AbortError";
}
function credentialErrorMessage(code) {
	switch (code) {
		case "client-not-configured": return "Set AGY_CLIENT_ID and AGY_CLIENT_SECRET before refreshing direct credentials";
		case "invalid-grant": return "The Antigravity grant requires login again";
		case "timeout": return "The Antigravity authentication request timed out";
		case "rate-limited": return "The Antigravity authentication service is rate-limited";
		case "server-error": return "The Antigravity authentication service is unavailable";
		case "network": return "The Antigravity authentication request failed";
		case "invalid-response": return "The Antigravity authentication response was invalid";
		case "conflict": return "The Antigravity credential changed while it was refreshing";
		case "storage": return "The Antigravity credential store failed";
		case "cancelled": return "The Antigravity authentication request was cancelled";
		case "http-error": return "The Antigravity authentication service rejected the request";
		default: return;
	}
}
function isRecord$11(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
//#endregion
//#region direct/core/src/logger.ts
const ENV_CONSOLE_LOG = "ANTIGRAVITY_CORE_CONSOLE_LOG";
function isTruthyFlag(flag) {
	return flag === "1" || flag?.toLowerCase() === "true";
}
function isConsoleLogEnabled() {
	return isTruthyFlag(process.env[ENV_CONSOLE_LOG]);
}
function writeConsoleLog(level, ...args) {
	switch (level) {
		case "debug":
			console.debug(...args);
			break;
		case "info":
			console.info(...args);
			break;
		case "warn":
			console.warn(...args);
			break;
		case "error": console.error(...args);
	}
}
/**
* Create a logger for a specific module. Records are forwarded to the
* registered sink, with an env-gated console fallback.
*/
function createLogger(module) {
	const service = `antigravity.${module}`;
	const log = (level, message, extra) => {
		if (isConsoleLogEnabled()) {
			const prefix = `[${service}]`;
			writeConsoleLog(level, ...extra ? [
				prefix,
				message,
				extra
			] : [prefix, message]);
		}
	};
	return {
		debug: (message, extra) => log("debug", message, extra),
		info: (message, extra) => log("info", message, extra),
		warn: (message, extra) => log("warn", message, extra),
		error: (message, extra) => log("error", message, extra)
	};
}
createLogger("account-storage");
//#endregion
//#region direct/core/src/fingerprint.ts
const AGY_CLI_VERSION = "1.1.24";
const AGY_CLI_CHANGE_LIST = "974782877";
function normalizeHarnessPlatform(platform = process.platform) {
	return platform === "win32" ? "windows" : platform || "unknown";
}
function normalizeHarnessArch(arch = process.arch) {
	switch (arch) {
		case "x64": return "amd64";
		case "ia32": return "386";
		default: return arch || "unknown";
	}
}
function buildAntigravityHarnessUserAgent(version = AGY_CLI_VERSION, platform = process.platform, arch = process.arch, authMethod = "consumer") {
	return `antigravity/cli/${version} (aidev_client; os_type=${normalizeHarnessPlatform(platform)}; arch=${normalizeHarnessArch(arch)}${version === "1.1.24" ? `; cl=${AGY_CLI_CHANGE_LIST}` : ""}; auth_method=${authMethod})`;
}
function buildAntigravityLoadCodeAssistMetadata() {
	return { ideType: "ANTIGRAVITY" };
}
//#endregion
//#region direct/core/src/model-registry.ts
const DEFAULT_MODALITIES = {
	input: [
		"text",
		"image",
		"pdf"
	],
	output: ["text"]
};
const MODEL_RELEASE_DATE = "";
const DEFAULT_COST = {
	input: 0,
	output: 0
};
const DEFAULT_OPTIONS = {};
function defineModel(id, model) {
	return {
		id,
		release_date: MODEL_RELEASE_DATE,
		attachment: model.modalities.input.some((modality) => modality !== "text"),
		temperature: true,
		tool_call: true,
		cost: { ...DEFAULT_COST },
		options: { ...DEFAULT_OPTIONS },
		...model
	};
}
const ALL_MODEL_DEFINITIONS = {
	"antigravity-gemini-3.1-pro": defineModel("antigravity-gemini-3.1-pro", {
		name: "Gemini 3.1 Pro (Antigravity)",
		reasoning: true,
		limit: {
			context: 1048576,
			output: 65535
		},
		modalities: DEFAULT_MODALITIES,
		variants: {
			low: { thinkingLevel: "low" },
			high: { thinkingLevel: "high" }
		}
	}),
	"antigravity-gemini-3.8-flash": defineModel("antigravity-gemini-3.8-flash", {
		name: "Gemini 3.8 Flash (Antigravity)",
		reasoning: true,
		limit: {
			context: 1048576,
			output: 65536
		},
		modalities: DEFAULT_MODALITIES,
		variants: {
			low: { thinkingLevel: "low" },
			high: { thinkingLevel: "high" }
		}
	}),
	"antigravity-gemini-3.7-flash": defineModel("antigravity-gemini-3.7-flash", {
		name: "Gemini 3.7 Flash (Antigravity)",
		reasoning: true,
		limit: {
			context: 1048576,
			output: 65536
		},
		modalities: DEFAULT_MODALITIES,
		variants: {
			low: { thinkingLevel: "low" },
			high: { thinkingLevel: "high" }
		}
	}),
	"antigravity-gemini-3.6-flash": defineModel("antigravity-gemini-3.6-flash", {
		name: "Gemini 3.6 Flash (Antigravity)",
		reasoning: true,
		limit: {
			context: 1048576,
			output: 65536
		},
		modalities: DEFAULT_MODALITIES,
		variants: {
			low: { thinkingLevel: "low" },
			high: { thinkingLevel: "high" }
		}
	}),
	"antigravity-gemini-3.5-flash": defineModel("antigravity-gemini-3.5-flash", {
		name: "Gemini 3.5 Flash (Antigravity)",
		reasoning: true,
		limit: {
			context: 1048576,
			output: 65536
		},
		modalities: DEFAULT_MODALITIES,
		variants: {
			low: { thinkingLevel: "low" },
			high: { thinkingLevel: "high" }
		}
	}),
	"antigravity-claude-sonnet-4-6-thinking": defineModel("antigravity-claude-sonnet-4-6-thinking", {
		name: "Claude Sonnet 4.6 Thinking (Antigravity)",
		reasoning: true,
		limit: {
			context: 25e4,
			output: 64e3
		},
		modalities: DEFAULT_MODALITIES,
		variants: {
			low: { disabled: true },
			high: { disabled: true }
		}
	}),
	"antigravity-claude-opus-4-6-thinking": defineModel("antigravity-claude-opus-4-6-thinking", {
		name: "Claude Opus 4.6 Thinking (Antigravity)",
		reasoning: true,
		limit: {
			context: 25e4,
			output: 64e3
		},
		modalities: DEFAULT_MODALITIES,
		variants: {
			low: { disabled: true },
			high: { disabled: true }
		}
	}),
	"antigravity-gemini-3.1-flash-image": defineModel("antigravity-gemini-3.1-flash-image", {
		name: "Gemini 3.1 Flash Image (Antigravity)",
		reasoning: false,
		limit: {
			context: 66e3,
			output: 33e3
		},
		modalities: {
			input: ["text", "image"],
			output: ["text", "image"]
		}
	}),
	"antigravity-gpt-oss-120b-medium": defineModel("antigravity-gpt-oss-120b-medium", {
		name: "GPT-OSS 120B Medium (Antigravity)",
		reasoning: true,
		limit: {
			context: 131072,
			output: 32768
		},
		modalities: DEFAULT_MODALITIES
	}),
	"gemini-2.5-flash": defineModel("gemini-2.5-flash", {
		name: "Gemini 2.5 Flash (Gemini CLI)",
		reasoning: true,
		limit: {
			context: 1048576,
			output: 65536
		},
		modalities: DEFAULT_MODALITIES
	}),
	"gemini-2.5-pro": defineModel("gemini-2.5-pro", {
		name: "Gemini 2.5 Pro (Gemini CLI)",
		reasoning: true,
		limit: {
			context: 1048576,
			output: 65536
		},
		modalities: DEFAULT_MODALITIES
	}),
	"gemini-3-flash-preview": defineModel("gemini-3-flash-preview", {
		name: "Gemini 3 Flash Preview (Gemini CLI)",
		reasoning: true,
		limit: {
			context: 1048576,
			output: 65536
		},
		modalities: DEFAULT_MODALITIES
	}),
	"gemini-3.1-pro-preview": defineModel("gemini-3.1-pro-preview", {
		name: "Gemini 3.1 Pro Preview (Gemini CLI)",
		reasoning: true,
		limit: {
			context: 1048576,
			output: 65535
		},
		modalities: DEFAULT_MODALITIES
	}),
	"gemini-3.5-flash-preview": defineModel("gemini-3.5-flash-preview", {
		name: "Gemini 3.5 Flash Preview (Gemini CLI)",
		reasoning: true,
		limit: {
			context: 1048576,
			output: 65536
		},
		modalities: DEFAULT_MODALITIES
	}),
	"gemini-3.1-flash-image": defineModel("gemini-3.1-flash-image", {
		name: "Gemini 3.1 Flash Image (Gemini CLI)",
		reasoning: false,
		limit: {
			context: 66e3,
			output: 33e3
		},
		modalities: {
			input: ["text", "image"],
			output: ["text", "image"]
		}
	}),
	"gemini-3.1-flash-image-preview": defineModel("gemini-3.1-flash-image-preview", {
		name: "Gemini 3.1 Flash Image Preview (Gemini CLI)",
		reasoning: false,
		limit: {
			context: 66e3,
			output: 33e3
		},
		modalities: {
			input: ["text", "image"],
			output: ["text", "image"]
		}
	}),
	"gemini-3.1-pro-preview-customtools": defineModel("gemini-3.1-pro-preview-customtools", {
		name: "Gemini 3.1 Pro Preview Custom Tools (Gemini CLI)",
		reasoning: true,
		limit: {
			context: 1048576,
			output: 65535
		},
		modalities: DEFAULT_MODALITIES
	})
};
const RESOLVER_ALIASES = {
	"gemini-3.1-pro-low": "gemini-3.1-pro",
	"gemini-3.1-pro-high": "gemini-3.1-pro",
	"gemini-3-flash-low": "gemini-3-flash",
	"gemini-3-flash-medium": "gemini-3-flash",
	"gemini-3-flash-high": "gemini-3-flash",
	"gemini-3.5-flash-low": "gemini-3.5-flash",
	"gemini-3.5-flash-medium": "gemini-3.5-flash",
	"gemini-3.5-flash-high": "gemini-3.5-flash",
	"gemini-3.6-flash-low": "gemini-3.6-flash",
	"gemini-3.6-flash-medium": "gemini-3.6-flash",
	"gemini-3.6-flash-high": "gemini-3.6-flash",
	"gemini-3.7-flash-low": "gemini-3.7-flash",
	"gemini-3.7-flash-medium": "gemini-3.7-flash",
	"gemini-3.7-flash-high": "gemini-3.7-flash",
	"gemini-3.8-flash-low": "gemini-3.8-flash",
	"gemini-3.8-flash-medium": "gemini-3.8-flash",
	"gemini-3.8-flash-high": "gemini-3.8-flash",
	"gemini-claude-opus-4-6-thinking-low": "claude-opus-4-6-thinking",
	"gemini-claude-opus-4-6-thinking-medium": "claude-opus-4-6-thinking",
	"gemini-claude-opus-4-6-thinking-high": "claude-opus-4-6-thinking",
	"gemini-claude-sonnet-4-6-thinking-low": "claude-sonnet-4-6",
	"gemini-claude-sonnet-4-6-thinking-medium": "claude-sonnet-4-6",
	"gemini-claude-sonnet-4-6-thinking-high": "claude-sonnet-4-6",
	"gemini-claude-sonnet-4-6": "claude-sonnet-4-6",
	"claude-sonnet-4-6-thinking": "claude-sonnet-4-6",
	"claude-sonnet-4-6-thinking-low": "claude-sonnet-4-6",
	"claude-sonnet-4-6-thinking-medium": "claude-sonnet-4-6",
	"claude-sonnet-4-6-thinking-high": "claude-sonnet-4-6",
	"gpt-oss-120b": "gpt-oss-120b-medium"
};
const GEMINI_35_FLASH_ROUTES = {
	antigravity: {
		defaultModel: "gemini-3-flash-agent",
		byTier: {
			low: "gemini-3.5-flash-extra-low",
			medium: "gemini-3.5-flash-low",
			high: "gemini-3-flash-agent"
		}
	},
	geminiCliFallbackModel: "gemini-3-flash-preview"
};
const GEMINI_36_FLASH_ROUTES = {
	defaultModel: "gemini-3.6-flash-medium",
	byTier: {
		low: "gemini-3.6-flash-low",
		medium: "gemini-3.6-flash-medium",
		high: "gemini-3.6-flash-high"
	}
};
const GEMINI_37_FLASH_ROUTES = {
	defaultModel: "gemini-3.7-flash-medium",
	byTier: {
		low: "gemini-3.7-flash-low",
		medium: "gemini-3.7-flash-medium",
		high: "gemini-3.7-flash-high"
	}
};
const GEMINI_38_FLASH_ROUTES = {
	defaultModel: "gemini-3.8-flash-medium",
	byTier: {
		low: "gemini-3.8-flash-low",
		medium: "gemini-3.8-flash-medium",
		high: "gemini-3.8-flash-high"
	}
};
const ANTIGRAVITY_OPENCODE_MODEL_IDS = [
	"antigravity-gemini-3.8-flash",
	"antigravity-gemini-3.7-flash",
	"antigravity-gemini-3.6-flash",
	"antigravity-gemini-3.5-flash",
	"antigravity-gemini-3.1-pro",
	"antigravity-claude-sonnet-4-6-thinking",
	"antigravity-claude-opus-4-6-thinking",
	"antigravity-gemini-3.1-flash-image",
	"antigravity-gpt-oss-120b-medium"
];
function pickModelDefinitions(ids) {
	return Object.fromEntries(ids.map((id) => [id, ALL_MODEL_DEFINITIONS[id]]));
}
const OPENCODE_MODEL_DEFINITIONS = pickModelDefinitions(ANTIGRAVITY_OPENCODE_MODEL_IDS);
function getPublicModelDefinitions() {
	return OPENCODE_MODEL_DEFINITIONS;
}
function getResolverAliasMap() {
	return RESOLVER_ALIASES;
}
function getGemini35FlashAntigravityModel(tier) {
	if (!tier) return GEMINI_35_FLASH_ROUTES.antigravity.defaultModel;
	return GEMINI_35_FLASH_ROUTES.antigravity.byTier[tier] ?? GEMINI_35_FLASH_ROUTES.antigravity.defaultModel;
}
function getTieredAntigravityModel(routes, tier) {
	return tier ? routes.byTier[tier] ?? routes.defaultModel : routes.defaultModel;
}
function getGemini36FlashAntigravityModel(tier) {
	return getTieredAntigravityModel(GEMINI_36_FLASH_ROUTES, tier);
}
function getGemini37FlashAntigravityModel(tier) {
	return getTieredAntigravityModel(GEMINI_37_FLASH_ROUTES, tier);
}
function getGemini38FlashAntigravityModel(tier) {
	return getTieredAntigravityModel(GEMINI_38_FLASH_ROUTES, tier);
}
//#endregion
//#region direct/core/src/agy-request-metadata.ts
const FNV1A_64_OFFSET_BASIS = 14695981039346656037n;
const FNV1A_64_PRIME = 1099511628211n;
const DEFAULT_SESSION_STATE_TTL_MS = 864e5;
const DEFAULT_MAX_SESSION_STATES = 256;
const AGY_REQUEST_FIELD_ORDER = [
	"contents",
	"systemInstruction",
	"tools",
	"toolConfig",
	"labels",
	"generationConfig",
	"sessionId"
];
const AGY_MODEL_ENUM_BY_WIRE_MODEL = {
	"gemini-3.5-flash-extra-low": "MODEL_PLACEHOLDER_M187",
	"gemini-3.5-flash-low": "MODEL_PLACEHOLDER_M20",
	"gemini-3-flash-agent": "MODEL_PLACEHOLDER_M84",
	"gemini-3.6-flash-low": "MODEL_PLACEHOLDER_M73",
	"gemini-3.6-flash-medium": "MODEL_PLACEHOLDER_M72",
	"gemini-3.6-flash-high": "MODEL_PLACEHOLDER_M71",
	"gemini-3.7-flash-low": "MODEL_PLACEHOLDER_M300",
	"gemini-3.7-flash-medium": "MODEL_PLACEHOLDER_M299",
	"gemini-3.7-flash-high": "MODEL_PLACEHOLDER_M298",
	"gemini-3.8-flash-low": "MODEL_PLACEHOLDER_M320",
	"gemini-3.8-flash-medium": "MODEL_PLACEHOLDER_M319",
	"gemini-3.8-flash-high": "MODEL_PLACEHOLDER_M318",
	"gemini-3.1-pro-low": "MODEL_PLACEHOLDER_M36",
	"gemini-pro-agent": "MODEL_PLACEHOLDER_M16",
	"claude-sonnet-4-6": "MODEL_PLACEHOLDER_M35",
	"claude-opus-4-6-thinking": "MODEL_PLACEHOLDER_M26",
	"gemini-3.1-flash-image": "MODEL_PLACEHOLDER_M21",
	"gpt-oss-120b-medium": "MODEL_OPENAI_GPT_OSS_120B_MEDIUM"
};
function fnv1a64Signed(input) {
	let hash = FNV1A_64_OFFSET_BASIS;
	for (const byte of Buffer$1.from(input, "utf8")) {
		hash ^= BigInt(byte);
		hash = BigInt.asUintN(64, hash * FNV1A_64_PRIME);
	}
	return BigInt.asIntN(64, hash).toString();
}
function createAgyRequestSessionContext(workspaceUri, ids = {}) {
	return {
		conversationId: ids.conversationId ?? randomUUID(),
		trajectoryId: ids.trajectoryId ?? randomUUID(),
		numericSessionId: fnv1a64Signed(workspaceUri)
	};
}
var AgyRequestSessionStore = class {
	entries = /* @__PURE__ */ new Map();
	workspaceUri;
	ttlMs;
	maxEntries;
	now;
	constructor(workspaceUri, options = {}) {
		this.workspaceUri = workspaceUri;
		this.ttlMs = options.ttlMs ?? DEFAULT_SESSION_STATE_TTL_MS;
		this.maxEntries = options.maxEntries ?? DEFAULT_MAX_SESSION_STATES;
		this.now = options.now ?? Date.now;
	}
	getOrCreate(key) {
		const timestamp = this.now();
		this.prune(timestamp, key);
		const existing = this.entries.get(key);
		if (existing) {
			existing.lastAccessedAt = timestamp;
			return existing.context;
		}
		const context = createAgyRequestSessionContext(this.workspaceUri);
		this.entries.set(key, {
			context,
			lastAccessedAt: timestamp,
			lastRequestTimestamp: 0
		});
		return context;
	}
	beginRequest(key) {
		const session = this.getOrCreate(key);
		const stored = this.entries.get(key);
		const timestamp = Math.max(stored.lastAccessedAt, stored.lastRequestTimestamp + 1);
		stored.lastRequestTimestamp = timestamp;
		return {
			session,
			timestamp
		};
	}
	completeExecution(key) {
		const stored = this.entries.get(key);
		if (stored) stored.context.lastExecutionId = randomUUID();
	}
	has(key) {
		return this.entries.has(key);
	}
	delete(key) {
		this.entries.delete(key);
	}
	clear() {
		this.entries.clear();
	}
	get size() {
		return this.entries.size;
	}
	prune(timestamp, preservedKey) {
		const expiry = timestamp - this.ttlMs;
		for (const [key, value] of this.entries) if (key !== preservedKey && value.lastAccessedAt < expiry) this.entries.delete(key);
		while (this.entries.size >= this.maxEntries && !this.entries.has(preservedKey)) {
			let oldestKey = null;
			let oldestAccess = Number.POSITIVE_INFINITY;
			for (const [key, value] of this.entries) if (key !== preservedKey && value.lastAccessedAt < oldestAccess) {
				oldestKey = key;
				oldestAccess = value.lastAccessedAt;
			}
			if (!oldestKey) break;
			this.entries.delete(oldestKey);
		}
	}
};
function getAgyModelEnum(model) {
	return AGY_MODEL_ENUM_BY_WIRE_MODEL[model.toLowerCase()];
}
function orderAgyRequestPayloadInPlace(payload) {
	const ordered = {};
	const remaining = new Set(Object.keys(payload));
	for (const key of AGY_REQUEST_FIELD_ORDER) if (key in payload) {
		ordered[key] = payload[key];
		remaining.delete(key);
	}
	for (const key of remaining) ordered[key] = payload[key];
	for (const key of Object.keys(payload)) delete payload[key];
	Object.assign(payload, ordered);
}
function countAgyRequestSteps(payload, mode = "parts") {
	const contents = payload.contents;
	if (!Array.isArray(contents)) return 1;
	if (mode === "contents") return Math.max(1, contents.length);
	let partCount = 0;
	let functionResponseCount = 0;
	for (const content of contents) {
		if (!content || typeof content !== "object" || Array.isArray(content)) continue;
		const parts = content.parts;
		if (!Array.isArray(parts)) continue;
		partCount += parts.length;
		if (mode === "cli") functionResponseCount += parts.filter((part) => {
			if (!part || typeof part !== "object" || Array.isArray(part)) return false;
			return "functionResponse" in part;
		}).length;
	}
	if (mode === "cli") return Math.max(1, contents.length + functionResponseCount);
	return Math.max(1, partCount);
}
function buildAgyAgentRequestMetadata(session, payload, model, timestamp = Date.now(), options = {}) {
	const lastStepIndex = countAgyRequestSteps(payload, options.stepCountMode) + (session.lastExecutionId ? 1 : 0);
	const isClaude = model.toLowerCase().startsWith("claude-");
	const isNonGemini = isClaude || model.toLowerCase().startsWith("gpt-");
	session.usedClaude = session.usedClaude === true || isClaude;
	session.usedNonGeminiModel = session.usedNonGeminiModel === true || isNonGemini;
	const modelEnum = getAgyModelEnum(model);
	const labels = {
		...session.lastExecutionId ? { last_execution_id: session.lastExecutionId } : {},
		last_step_index: String(lastStepIndex),
		...modelEnum ? { model_enum: modelEnum } : {},
		trajectory_id: session.trajectoryId,
		used_claude: session.usedClaude ? "true" : "false",
		used_claude_conservative: session.usedClaude ? "true" : "false",
		used_non_gemini_model: session.usedNonGeminiModel ? "true" : "false"
	};
	return {
		requestId: `agent/${session.conversationId}/${timestamp}/${session.trajectoryId}/${lastStepIndex + 1}`,
		sessionId: session.numericSessionId,
		labels,
		lastStepIndex
	};
}
//#endregion
//#region direct/core/src/agy-transport.ts
function headersToRecord(headers) {
	const result = {};
	if (!headers) return result;
	new Headers(headers).forEach((value, key) => {
		result[key.toLowerCase()] = value;
	});
	return result;
}
function getHeader(headers, name) {
	return headers[name.toLowerCase()];
}
function bodyToBuffer(body) {
	if (body == null) return Buffer$1.alloc(0);
	if (typeof body === "string") return Buffer$1.from(body);
	if (body instanceof Uint8Array) return Buffer$1.from(body);
	if (body instanceof ArrayBuffer) return Buffer$1.from(body);
	throw new Error("agy transport only supports string/byte request bodies");
}
function shouldUseChunkedBody(url) {
	return url.pathname.includes(":streamGenerateContent");
}
function buildAgyCliHeaderPairs(url, init = {}) {
	const parsedUrl = new URL(url);
	const headers = headersToRecord(init.headers);
	const body = bodyToBuffer(init.body);
	const host = parsedUrl.port ? `${parsedUrl.hostname}:${parsedUrl.port}` : parsedUrl.hostname;
	const userAgent = getHeader(headers, "User-Agent") ?? buildAntigravityHarnessUserAgent();
	const authorization = getHeader(headers, "Authorization");
	const contentType = getHeader(headers, "Content-Type") ?? "application/json";
	const acceptEncoding = getHeader(headers, "Accept-Encoding") ?? "gzip";
	const chunked = shouldUseChunkedBody(parsedUrl);
	const pairs = [["Host", host], ["User-Agent", userAgent]];
	if (chunked) pairs.push(["Transfer-Encoding", "chunked"]);
	else pairs.push(["Content-Length", String(body.byteLength)]);
	if (authorization) pairs.push(["Authorization", authorization]);
	pairs.push(["Content-Type", contentType]);
	pairs.push(["Accept-Encoding", acceptEncoding]);
	return pairs;
}
process.env.AGY_CLIENT_ID;
process.env.AGY_CLIENT_SECRET;
/**
* Scopes required for Antigravity integrations.
*/
const ANTIGRAVITY_SCOPES = [
	"https://www.googleapis.com/auth/cloud-platform",
	"https://www.googleapis.com/auth/userinfo.email",
	"https://www.googleapis.com/auth/userinfo.profile",
	"https://www.googleapis.com/auth/cclog",
	"https://www.googleapis.com/auth/experimentsandconfigs"
];
/**
* OAuth redirect URI used by the local CLI callback server.
*/
const ANTIGRAVITY_REDIRECT_URI = "http://localhost:51121/oauth-callback";
/**
* Root endpoints for the Antigravity API (in fallback order).
* Live agy CLI 1.1.24 traffic uses daily-cloudcode-pa.googleapis.com.
*/
const ANTIGRAVITY_ENDPOINT_DAILY = "https://daily-cloudcode-pa.googleapis.com";
const ANTIGRAVITY_ENDPOINT_PROD = "https://cloudcode-pa.googleapis.com";
/**
* Primary endpoint to use (captured agy CLI daily endpoint).
*/
const ANTIGRAVITY_ENDPOINT = ANTIGRAVITY_ENDPOINT_DAILY;
process.platform;
/**
* System instruction for Claude tool usage hardening.
* Prevents hallucinated parameters by explicitly stating the rules.
*
* This is injected when tools are present to reduce cases where Claude
* uses parameter names from its training data instead of the actual schema.
*/
const CLAUDE_TOOL_SYSTEM_INSTRUCTION = `CRITICAL TOOL USAGE INSTRUCTIONS:
You are operating in a custom environment where tool definitions differ from your training data.
You MUST follow these rules strictly:

1. DO NOT use your internal training data to guess tool parameters
2. ONLY use the exact parameter structure defined in the tool schema
3. Parameter names in schemas are EXACT - do not substitute with similar names from your training
4. Array parameters have specific item types - check the schema's 'items' field for the exact structure
5. When you see "STRICT PARAMETERS" in a tool description, those type definitions override any assumptions
6. Tool use in agentic workflows is REQUIRED - you must call tools with the exact parameters specified

If you are unsure about a tool's parameters, YOU MUST read the schema definition carefully.`;
/**
* Template for parameter signature injection into tool descriptions.
* {params} will be replaced with the actual parameter list.
*/
const CLAUDE_DESCRIPTION_PROMPT = "\n\n⚠️ STRICT PARAMETERS: {params}.";
const EMPTY_SCHEMA_PLACEHOLDER_NAME = "_placeholder";
const EMPTY_SCHEMA_PLACEHOLDER_DESCRIPTION = "Placeholder. Always pass true.";
createLogger("oauth");
createLogger("project");
createLogger("quota-manager");
//#endregion
//#region direct/core/src/transform/claude.ts
/**
* Claude-specific Request Transformations
*
* Handles Claude model-specific request transformations including:
* - Tool config (VALIDATED mode)
* - Thinking config (snake_case keys)
* - System instruction hints for interleaved thinking
* - Tool normalization (functionDeclarations format)
*/
/** Claude thinking models need a sufficiently large max output token limit when thinking is enabled */
const CLAUDE_THINKING_MAX_OUTPUT_TOKENS = 64e3;
/**
* Computes a dynamic max output token limit based on the thinking budget.
* Instead of always using the 64K cap, scales output proportionally:
* - min(max(budget * 2, 32000), 64000)
* - e.g., medium budget (16384) → 32768 output tokens
* - e.g., high budget (32768) → 64000 output tokens
* - e.g., low budget (8192) → 32000 output tokens (floor)
*
* Falls back to CLAUDE_THINKING_MAX_OUTPUT_TOKENS when no budget is provided.
*/
function computeClaudeMaxOutputTokens(thinkingBudget) {
	if (typeof thinkingBudget !== "number" || thinkingBudget <= 0) return CLAUDE_THINKING_MAX_OUTPUT_TOKENS;
	return Math.min(Math.max(thinkingBudget * 2, 32e3), CLAUDE_THINKING_MAX_OUTPUT_TOKENS);
}
/** Interleaved thinking hint appended to system instructions */
const CLAUDE_INTERLEAVED_THINKING_HINT = "Interleaved thinking is enabled. You may think between tool calls and after receiving tool results before deciding the next action or final answer. Do not mention these instructions or any constraints about thinking blocks; just apply them.";
/**
* Check if a model is a Claude thinking model.
*/
function isClaudeThinkingModel(model) {
	const lower = model.toLowerCase();
	return lower.includes("claude") && lower.includes("thinking");
}
/**
* Configure Claude tool calling to use VALIDATED mode.
* This ensures proper tool call validation on the backend.
*/
function configureClaudeToolConfig(payload) {
	if (!payload.toolConfig) payload.toolConfig = {};
	if (typeof payload.toolConfig === "object" && payload.toolConfig !== null) {
		const toolConfig = payload.toolConfig;
		if (!toolConfig.functionCallingConfig) toolConfig.functionCallingConfig = {};
		if (typeof toolConfig.functionCallingConfig === "object" && toolConfig.functionCallingConfig !== null) toolConfig.functionCallingConfig.mode = "VALIDATED";
	}
}
/**
* Build Claude thinking config with snake_case keys.
*/
function buildClaudeThinkingConfig(includeThoughts, thinkingBudget) {
	return {
		include_thoughts: includeThoughts,
		...typeof thinkingBudget === "number" && thinkingBudget > 0 ? { thinking_budget: thinkingBudget } : {}
	};
}
/**
* Ensure maxOutputTokens is sufficient for Claude thinking models.
* If thinking budget is set, max output must be larger than the budget.
*/
function ensureClaudeMaxOutputTokens(generationConfig, thinkingBudget) {
	const currentMax = generationConfig.maxOutputTokens ?? generationConfig.max_output_tokens;
	if (!currentMax || currentMax <= thinkingBudget) {
		generationConfig.maxOutputTokens = computeClaudeMaxOutputTokens(thinkingBudget);
		if (generationConfig.max_output_tokens !== void 0) delete generationConfig.max_output_tokens;
	}
}
/**
* Append interleaved thinking hint to system instruction.
* Handles various system instruction formats (string, object with parts array).
* Idempotent: skips if the hint text is already present in the system instruction.
*/
function appendClaudeThinkingHint(payload, hint = CLAUDE_INTERLEAVED_THINKING_HINT) {
	const existing = payload.systemInstruction;
	if (typeof existing === "string" && existing.includes(hint)) return;
	if (existing && typeof existing === "object") {
		const sys = existing;
		if (Array.isArray(sys.parts)) {
			if (sys.parts.some((p) => p && typeof p === "object" && p.text === hint)) return;
		}
	}
	if (typeof existing === "string") payload.systemInstruction = existing.trim().length > 0 ? {
		role: "user",
		parts: [{ text: existing }, { text: hint }]
	} : hint;
	else if (existing && typeof existing === "object") {
		const sys = existing;
		const partsValue = sys.parts;
		if (Array.isArray(partsValue)) sys.parts = [...partsValue, { text: hint }];
		else sys.parts = [{ text: hint }];
		payload.systemInstruction = sys;
	} else if (Array.isArray(payload.contents)) payload.systemInstruction = { parts: [{ text: hint }] };
}
/**
* Normalize tools for Claude models.
* Converts various tool formats to functionDeclarations format.
*
* @returns Debug info about tool normalization
*/
function normalizeClaudeTools(payload, cleanJSONSchema) {
	let toolDebugMissing = 0;
	const toolDebugSummaries = [];
	if (!Array.isArray(payload.tools)) return {
		toolDebugMissing,
		toolDebugSummaries
	};
	const functionDeclarations = [];
	const passthroughTools = [];
	const normalizeSchema = (schema) => {
		const createPlaceholderSchema = (base = {}) => ({
			...base,
			type: "object",
			properties: { [EMPTY_SCHEMA_PLACEHOLDER_NAME]: {
				type: "boolean",
				description: EMPTY_SCHEMA_PLACEHOLDER_DESCRIPTION
			} },
			required: [EMPTY_SCHEMA_PLACEHOLDER_NAME]
		});
		if (!schema || typeof schema !== "object" || Array.isArray(schema)) {
			toolDebugMissing += 1;
			return createPlaceholderSchema();
		}
		const cleaned = cleanJSONSchema(schema);
		if (!cleaned || typeof cleaned !== "object" || Array.isArray(cleaned)) {
			toolDebugMissing += 1;
			return createPlaceholderSchema();
		}
		const hasProperties = cleaned.properties && typeof cleaned.properties === "object" && Object.keys(cleaned.properties).length > 0;
		cleaned.type = "object";
		if (!hasProperties) {
			cleaned.properties = { _placeholder: {
				type: "boolean",
				description: "Placeholder. Always pass true."
			} };
			cleaned.required = Array.isArray(cleaned.required) ? Array.from(/* @__PURE__ */ new Set([...cleaned.required, "_placeholder"])) : ["_placeholder"];
		}
		return cleaned;
	};
	payload.tools.forEach((tool) => {
		const t = tool;
		const pushDeclaration = (decl, source) => {
			const schema = decl?.parameters || decl?.parametersJsonSchema || decl?.input_schema || decl?.inputSchema || t.parameters || t.parametersJsonSchema || t.input_schema || t.inputSchema || t.function?.parameters || t.function?.parametersJsonSchema || t.function?.input_schema || t.function?.inputSchema || t.custom?.parameters || t.custom?.parametersJsonSchema || t.custom?.input_schema;
			let name = decl?.name || t.name || t.function?.name || t.custom?.name || `tool-${functionDeclarations.length}`;
			name = String(name).replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 64);
			const description = decl?.description || t.description || t.function?.description || t.custom?.description || "";
			functionDeclarations.push({
				name,
				description: String(description || ""),
				parameters: normalizeSchema(schema)
			});
			toolDebugSummaries.push(`decl=${name},src=${source},hasSchema=${schema ? "y" : "n"}`);
		};
		if (Array.isArray(t.functionDeclarations) && t.functionDeclarations.length > 0) {
			t.functionDeclarations.forEach((decl) => {
				pushDeclaration(decl, "functionDeclarations");
			});
			return;
		}
		if (t.function || t.custom || t.parameters || t.input_schema || t.inputSchema) {
			pushDeclaration(t.function ?? t.custom ?? t, "function/custom");
			return;
		}
		passthroughTools.push(tool);
	});
	const finalTools = [];
	if (functionDeclarations.length > 0) finalTools.push({ functionDeclarations });
	payload.tools = finalTools.concat(passthroughTools);
	return {
		toolDebugMissing,
		toolDebugSummaries
	};
}
/**
* Convert snake_case stop_sequences to camelCase stopSequences.
*/
function convertStopSequences(generationConfig) {
	if (Array.isArray(generationConfig.stop_sequences)) {
		generationConfig.stopSequences = generationConfig.stop_sequences;
		delete generationConfig.stop_sequences;
	}
}
/**
* Apply all Claude-specific transformations.
*/
function applyClaudeTransforms(payload, options) {
	const { model, tierThinkingBudget, normalizedThinking, cleanJSONSchema } = options;
	const isThinking = isClaudeThinkingModel(model);
	configureClaudeToolConfig(payload);
	if (payload.generationConfig) convertStopSequences(payload.generationConfig);
	if (normalizedThinking) {
		const thinkingBudget = tierThinkingBudget ?? normalizedThinking.thinkingBudget;
		if (isThinking) {
			const thinkingConfig = buildClaudeThinkingConfig(normalizedThinking.includeThoughts ?? true, thinkingBudget);
			const generationConfig = payload.generationConfig ?? {};
			generationConfig.thinkingConfig = thinkingConfig;
			if (typeof thinkingBudget === "number" && thinkingBudget > 0) ensureClaudeMaxOutputTokens(generationConfig, thinkingBudget);
			payload.generationConfig = generationConfig;
		}
	}
	if (isThinking && Array.isArray(payload.tools) && payload.tools.length > 0) appendClaudeThinkingHint(payload);
	return normalizeClaudeTools(payload, cleanJSONSchema);
}
//#endregion
//#region direct/core/src/transform/gemini.ts
/**
* Transform a JSON Schema to Gemini-compatible format.
* Based on @google/genai SDK's processJsonSchema() function.
*
* Key transformations:
* - Converts type values to uppercase (object -> OBJECT)
* - Removes unsupported fields like additionalProperties, $schema
* - Recursively processes nested schemas (properties, items, anyOf, etc.)
*
* @param schema - A JSON Schema object or primitive value
* @returns Gemini-compatible schema
*
* Fields that Gemini API rejects and must be removed from schemas.
* Antigravity uses strict protobuf-backed JSON validation.
*/
const UNSUPPORTED_SCHEMA_FIELDS = /* @__PURE__ */ new Set([
	"additionalProperties",
	"$schema",
	"$id",
	"$comment",
	"$ref",
	"$defs",
	"definitions",
	"const",
	"contentMediaType",
	"contentEncoding",
	"if",
	"then",
	"else",
	"not",
	"patternProperties",
	"unevaluatedProperties",
	"unevaluatedItems",
	"dependentRequired",
	"dependentSchemas",
	"propertyNames",
	"minContains",
	"maxContains"
]);
const NUMERIC_SCHEMA_CONSTRAINTS = /* @__PURE__ */ new Set([
	"minLength",
	"maxLength",
	"minItems",
	"maxItems",
	"minProperties",
	"maxProperties",
	"minimum",
	"maximum",
	"exclusiveMinimum",
	"exclusiveMaximum",
	"multipleOf"
]);
function toGeminiSchema(schema, options = {}) {
	if (!schema || typeof schema !== "object" || Array.isArray(schema)) return schema;
	const inputSchema = schema;
	const result = {};
	const numericConstraintHints = [];
	const propertyNames = /* @__PURE__ */ new Set();
	if (inputSchema.properties && typeof inputSchema.properties === "object") for (const propName of Object.keys(inputSchema.properties)) propertyNames.add(propName);
	for (const [key, value] of Object.entries(inputSchema)) {
		if (UNSUPPORTED_SCHEMA_FIELDS.has(key)) continue;
		if (key === "type" && typeof value === "string") result[key] = value.toUpperCase();
		else if (key === "properties" && typeof value === "object" && value !== null) {
			const props = {};
			for (const [propName, propSchema] of Object.entries(value)) props[propName] = toGeminiSchema(propSchema, options);
			result[key] = props;
		} else if (key === "items" && typeof value === "object") result[key] = toGeminiSchema(value, options);
		else if ((key === "anyOf" || key === "oneOf" || key === "allOf") && Array.isArray(value)) result[key] = value.map((item) => toGeminiSchema(item, options));
		else if (key === "enum" && Array.isArray(value)) result[key] = value;
		else if (options.moveNumericConstraintsToDescription && NUMERIC_SCHEMA_CONSTRAINTS.has(key)) {
			if (typeof value === "string" || typeof value === "number") numericConstraintHints.push(`${key}: ${value}`);
		} else if (key === "default" || key === "examples") result[key] = value;
		else if (key === "required" && Array.isArray(value)) {
			if (propertyNames.size > 0) {
				const validRequired = value.filter((prop) => typeof prop === "string" && propertyNames.has(prop));
				if (validRequired.length > 0) result[key] = validRequired;
			} else result[key] = value;
		} else result[key] = value;
	}
	if (numericConstraintHints.length > 0) {
		const hint = numericConstraintHints.join(", ");
		result.description = typeof result.description === "string" && result.description ? `${result.description} (${hint})` : hint;
	}
	if (result.type === "ARRAY" && !result.items) result.items = { type: "STRING" };
	return result;
}
/**
* Check if a model is Gemini 3 (uses thinkingLevel string).
*/
function isGemini3Model(model) {
	return model.toLowerCase().includes("gemini-3");
}
/**
* Build Gemini 3 thinking config with thinkingLevel string.
*/
function buildGemini3ThinkingConfig(includeThoughts, thinkingLevel) {
	return {
		includeThoughts,
		thinkingLevel
	};
}
/**
* Build Gemini 2.5 thinking config with numeric thinkingBudget.
*/
function buildGemini25ThinkingConfig(includeThoughts, thinkingBudget) {
	return {
		includeThoughts,
		...typeof thinkingBudget === "number" && thinkingBudget > 0 ? { thinkingBudget } : {}
	};
}
/**
* Normalize tools for Gemini models.
* Ensures tools have proper function-style format.
*
* @returns Debug info about tool normalization
*/
function normalizeGeminiTools(payload, schemaOptions = {}) {
	let toolDebugMissing = 0;
	const toolDebugSummaries = [];
	if (!Array.isArray(payload.tools)) return {
		toolDebugMissing,
		toolDebugSummaries
	};
	payload.tools = payload.tools.map((tool, toolIndex) => {
		const t = tool;
		if (t.googleSearch || t.googleSearchRetrieval) return t;
		if (Array.isArray(t.functionDeclarations)) return {
			...t,
			functionDeclarations: t.functionDeclarations.map((declaration) => {
				const normalized = { ...declaration };
				normalized.parameters = toGeminiSchema(normalized.parameters ?? normalized.parametersJsonSchema ?? {
					type: "OBJECT",
					properties: {}
				}, schemaOptions);
				delete normalized.parametersJsonSchema;
				return normalized;
			})
		};
		const newTool = { ...t };
		const schemaCandidates = [
			newTool.function?.input_schema,
			newTool.function?.parameters,
			newTool.function?.inputSchema,
			newTool.custom?.input_schema,
			newTool.custom?.parameters,
			newTool.parameters,
			newTool.input_schema,
			newTool.inputSchema
		].filter(Boolean);
		const placeholderSchema = {
			type: "OBJECT",
			properties: { _placeholder: {
				type: "BOOLEAN",
				description: "Placeholder. Always pass true."
			} },
			required: ["_placeholder"]
		};
		let schema = schemaCandidates[0];
		if (!(schema && typeof schema === "object" && !Array.isArray(schema))) {
			schema = placeholderSchema;
			toolDebugMissing += 1;
		} else schema = toGeminiSchema(schema, schemaOptions);
		const nameCandidate = newTool.name || newTool.function?.name || newTool.custom?.name || `tool-${toolIndex}`;
		if (newTool.function && schema) newTool.function.input_schema = schema;
		if (newTool.custom && schema) newTool.custom.input_schema = schema;
		if (!newTool.custom && newTool.function) {
			const fn = newTool.function;
			newTool.custom = {
				name: fn.name || nameCandidate,
				description: fn.description,
				input_schema: schema
			};
		}
		if (!newTool.custom && !newTool.function) {
			newTool.custom = {
				name: nameCandidate,
				description: newTool.description,
				input_schema: schema
			};
			if (!newTool.parameters && !newTool.input_schema && !newTool.inputSchema) newTool.parameters = schema;
		}
		if (newTool.custom && !newTool.custom.input_schema) {
			newTool.custom.input_schema = {
				type: "OBJECT",
				properties: {}
			};
			toolDebugMissing += 1;
		}
		toolDebugSummaries.push(`idx=${toolIndex}, hasCustom=${!!newTool.custom}, customSchema=${!!newTool.custom?.input_schema}, hasFunction=${!!newTool.function}, functionSchema=${!!newTool.function?.input_schema}`);
		if (newTool.custom) delete newTool.custom;
		return newTool;
	});
	return {
		toolDebugMissing,
		toolDebugSummaries
	};
}
/**
* Apply all Gemini-specific transformations.
*/
function applyGeminiTransforms(payload, options) {
	const { model, tierThinkingBudget, tierThinkingLevel, normalizedThinking, googleSearch } = options;
	if (normalizedThinking) {
		let thinkingConfig;
		if (tierThinkingLevel && isGemini3Model(model)) thinkingConfig = buildGemini3ThinkingConfig(normalizedThinking.includeThoughts ?? true, tierThinkingLevel);
		else {
			const thinkingBudget = tierThinkingBudget ?? normalizedThinking.thinkingBudget;
			thinkingConfig = buildGemini25ThinkingConfig(normalizedThinking.includeThoughts ?? true, thinkingBudget);
		}
		const generationConfig = payload.generationConfig ?? {};
		generationConfig.thinkingConfig = thinkingConfig;
		payload.generationConfig = generationConfig;
	}
	if (googleSearch && googleSearch.mode === "auto") {
		const tools = payload.tools || [];
		if (!payload.tools) payload.tools = tools;
		payload.tools.push({ googleSearch: {} });
	}
	const result = normalizeGeminiTools(payload, { moveNumericConstraintsToDescription: model.toLowerCase().startsWith("gpt-oss-") });
	const wrapResult = wrapToolsAsFunctionDeclarations(payload);
	return {
		...result,
		wrappedFunctionCount: wrapResult.wrappedFunctionCount,
		passthroughToolCount: wrapResult.passthroughToolCount
	};
}
/**
* Wrap tools array in Gemini's required functionDeclarations format.
*
* Gemini/Antigravity API expects:
*   { tools: [{ functionDeclarations: [{ name, description, parameters }] }] }
*
* NOT:
*   { tools: [{ function: {...}, parameters: {...} }] }
*
* The wrapper-level 'parameters' field causes:
*   "Unknown name 'parameters' at 'request.tools[0]'"
*/
/**
* Detect if a tool is a web search tool in any of the supported formats:
* - Claude/Anthropic: { type: "web_search_20250305" } or { name: "web_search" }
* - Gemini native: { googleSearch: {} } or { googleSearchRetrieval: {} }
*/
function isWebSearchTool(tool) {
	if (tool.googleSearch || tool.googleSearchRetrieval) return true;
	if (tool.type === "web_search_20250305") return true;
	const name = tool.name;
	if (name === "web_search" || name === "google_search") return true;
	return false;
}
function wrapToolsAsFunctionDeclarations(payload) {
	if (!Array.isArray(payload.tools) || payload.tools.length === 0) return {
		wrappedFunctionCount: 0,
		passthroughToolCount: 0
	};
	const functionDeclarations = [];
	const passthroughTools = [];
	let hasWebSearchTool = false;
	for (const tool of payload.tools) {
		if (tool.googleSearch || tool.googleSearchRetrieval || tool.codeExecution) {
			passthroughTools.push(tool);
			continue;
		}
		if (isWebSearchTool(tool)) {
			hasWebSearchTool = true;
			continue;
		}
		if (tool.functionDeclarations) {
			if (Array.isArray(tool.functionDeclarations)) for (const decl of tool.functionDeclarations) functionDeclarations.push({
				name: String(decl.name || `tool-${functionDeclarations.length}`),
				description: String(decl.description || ""),
				parameters: decl.parameters || {
					type: "OBJECT",
					properties: {}
				}
			});
			continue;
		}
		const fn = tool.function;
		const custom = tool.custom;
		const name = String(tool.name || fn?.name || custom?.name || `tool-${functionDeclarations.length}`);
		const description = String(tool.description || fn?.description || custom?.description || "");
		const schema = fn?.input_schema || fn?.parameters || fn?.inputSchema || custom?.input_schema || custom?.parameters || tool.parameters || tool.input_schema || tool.inputSchema || {
			type: "OBJECT",
			properties: {}
		};
		functionDeclarations.push({
			name,
			description,
			parameters: schema
		});
	}
	const finalTools = [];
	if (functionDeclarations.length > 0) finalTools.push({ functionDeclarations });
	finalTools.push(...passthroughTools);
	if (hasWebSearchTool && functionDeclarations.length === 0) finalTools.push({ googleSearch: {} });
	else if (hasWebSearchTool && functionDeclarations.length > 0) console.warn("[gemini] web_search tool detected but cannot be combined with function declarations. Use the explicit google_search() tool call instead.");
	payload.tools = finalTools;
	return {
		wrappedFunctionCount: functionDeclarations.length,
		passthroughToolCount: passthroughTools.length + (hasWebSearchTool && functionDeclarations.length === 0 ? 1 : 0)
	};
}
//#endregion
//#region direct/core/src/transform/model-resolver.ts
/**
* Model Resolution with Thinking Tier Support
*
* Resolves model names with tier suffixes (e.g., gemini-3-pro-high, claude-opus-4-6-thinking-low)
* to their actual API model names and corresponding thinking configurations.
*/
/**
* Thinking tier budgets by model family.
* Claude and Gemini 2.5 Pro use numeric budgets.
*/
const THINKING_TIER_BUDGETS = {
	claude: {
		low: 8192,
		medium: 16384,
		high: 32768
	},
	"gemini-2.5-pro": {
		low: 8192,
		medium: 16384,
		high: 32768
	},
	"gemini-2.5-flash": {
		low: 6144,
		medium: 12288,
		high: 24576
	},
	default: {
		low: 4096,
		medium: 8192,
		high: 16384
	}
};
/**
* Model aliases - maps user-friendly names to API model names.
*
* Format:
* - Gemini 3.x Pro variants: gemini-3.1-pro-{low,high}
* - Claude thinking variants: claude-{model}-thinking-{low,medium,high}
* - Claude non-thinking: claude-{model} (no -thinking suffix)
*/
const MODEL_ALIASES = getResolverAliasMap();
const TIER_REGEX = /-(minimal|low|medium|high)$/;
const QUOTA_PREFIX_REGEX = /^antigravity-/i;
const GEMINI_3_PRO_REGEX = /^gemini-3(?:\.\d+)?-pro/i;
const GEMINI_3_FLASH_REGEX = /^gemini-3(?:\.\d+)?-flash/i;
/**
* Image generation models - always route to Antigravity.
* These models don't support thinking and require imageConfig.
*/
const IMAGE_GENERATION_MODELS = /image|imagen/i;
/**
* Models that support thinking tier suffixes.
* Only these models should have -low/-medium/-high stripped as thinking tiers.
* GPT models like gpt-oss-120b-medium should NOT have -medium stripped.
*/
function supportsThinkingTiers(model) {
	const lower = model.toLowerCase();
	return lower.includes("gemini-3") || lower.includes("gemini-2.5") || lower.includes("claude") && lower.includes("thinking");
}
/**
* Extracts thinking tier from model name suffix.
* Only extracts tier for models that support thinking tiers.
*/
function extractThinkingTierFromModel(model) {
	if (!supportsThinkingTiers(model)) return;
	return model.match(TIER_REGEX)?.[1];
}
/**
* Determines the budget family for a model.
*/
function getBudgetFamily(model) {
	if (model.includes("claude")) return "claude";
	if (model.includes("gemini-2.5-pro")) return "gemini-2.5-pro";
	if (model.includes("gemini-2.5-flash")) return "gemini-2.5-flash";
	return "default";
}
/**
* Checks if a model is a thinking-capable model.
*/
function isThinkingCapableModel(model) {
	const lower = model.toLowerCase();
	return lower.includes("thinking") || lower.includes("gemini-3") || lower.includes("gemini-2.5");
}
function isGemini3ProModel(model) {
	return GEMINI_3_PRO_REGEX.test(model);
}
function isGemini3FlashModel(model) {
	return GEMINI_3_FLASH_REGEX.test(model);
}
function resolveGemini35FlashAntigravityModel(tier) {
	return getGemini35FlashAntigravityModel(tier);
}
function getAgyGeminiFlashThinkingBudget(tier, highBudget = 1e4) {
	switch (tier) {
		case "low": return 1e3;
		case "high": return highBudget;
		default: return 4e3;
	}
}
function getAgyGemini31ProModel(tier) {
	return tier === "high" ? "gemini-pro-agent" : "gemini-3.1-pro-low";
}
function getAgyGemini31ProThinkingBudget(tier) {
	return tier === "high" ? 10001 : 1001;
}
/**
* Resolves a model name with optional tier suffix and quota prefix to its actual API model name
* and corresponding thinking configuration.
*
* Quota routing:
* - Default to Antigravity quota unless cli_first is enabled for Gemini models
* - Fallback to Gemini CLI happens at account rotation level when Antigravity is exhausted
* - "antigravity-" prefix marks explicit quota (no fallback allowed)
* - Claude and image models always use Antigravity
*
* Examples:
* - "gemini-2.5-flash" → { quotaPreference: "antigravity" }
* - "antigravity-gemini-3.1-pro-high" → { quotaPreference: "antigravity", explicitQuota: true } * - "claude-opus-4-6-thinking-medium" → { quotaPreference: "antigravity" }
*
* @param requestedModel - The model name from the request
* @param options - Optional configuration including cli_first preference
* @returns Resolved model with thinking configuration
*/
function resolveModelWithTier(requestedModel, options = {}) {
	const isAntigravity = QUOTA_PREFIX_REGEX.test(requestedModel);
	const modelWithoutQuota = requestedModel.replace(QUOTA_PREFIX_REGEX, "");
	const tier = extractThinkingTierFromModel(modelWithoutQuota);
	const baseName = tier ? modelWithoutQuota.replace(TIER_REGEX, "") : modelWithoutQuota;
	const isImageModel = IMAGE_GENERATION_MODELS.test(modelWithoutQuota);
	const isClaudeModel = modelWithoutQuota.toLowerCase().includes("claude");
	const quotaPreference = options.cli_first === true && !isAntigravity && !isImageModel && !isClaudeModel ? "gemini-cli" : "antigravity";
	const explicitQuota = isAntigravity || isImageModel;
	const isGemini3 = modelWithoutQuota.toLowerCase().startsWith("gemini-3");
	const skipAlias = isAntigravity && isGemini3;
	const isGemini3Pro = isGemini3ProModel(modelWithoutQuota);
	const isGemini3Flash = isGemini3FlashModel(modelWithoutQuota);
	const isGemini31Pro = /^gemini-3\.1-pro/i.test(baseName);
	const isGemini35Flash = /^gemini-3\.5-flash/i.test(baseName);
	const isGemini36Flash = /^gemini-3\.6-flash/i.test(baseName);
	const isGemini37Flash = /^gemini-3\.7-flash/i.test(baseName);
	const isGemini38Flash = /^gemini-3\.8-flash/i.test(baseName);
	const isGptOss120b = /^gpt-oss-120b(?:-medium)?$/i.test(baseName);
	if (isGemini31Pro && quotaPreference === "antigravity") return {
		actualModel: getAgyGemini31ProModel(tier),
		thinkingBudget: getAgyGemini31ProThinkingBudget(tier),
		tier,
		isThinkingModel: true,
		quotaPreference,
		explicitQuota
	};
	if (isGemini35Flash && quotaPreference === "antigravity") return {
		actualModel: resolveGemini35FlashAntigravityModel(tier ?? "medium"),
		thinkingBudget: getAgyGeminiFlashThinkingBudget(tier),
		tier: tier ?? "medium",
		isThinkingModel: true,
		quotaPreference,
		explicitQuota
	};
	if (isGemini36Flash && quotaPreference === "antigravity") return {
		actualModel: getGemini36FlashAntigravityModel(tier ?? "medium"),
		thinkingBudget: getAgyGeminiFlashThinkingBudget(tier),
		tier: tier ?? "medium",
		isThinkingModel: true,
		quotaPreference,
		explicitQuota
	};
	if (isGemini37Flash && quotaPreference === "antigravity") return {
		actualModel: getGemini37FlashAntigravityModel(tier ?? "medium"),
		thinkingBudget: getAgyGeminiFlashThinkingBudget(tier, -1),
		tier: tier ?? "medium",
		isThinkingModel: true,
		quotaPreference,
		explicitQuota
	};
	if (isGemini38Flash && quotaPreference === "antigravity") return {
		actualModel: getGemini38FlashAntigravityModel(tier ?? "medium"),
		thinkingBudget: getAgyGeminiFlashThinkingBudget(tier, -1),
		tier: tier ?? "medium",
		isThinkingModel: true,
		quotaPreference,
		explicitQuota
	};
	if (isGptOss120b && quotaPreference === "antigravity") return {
		actualModel: "gpt-oss-120b-medium",
		thinkingBudget: 8192,
		isThinkingModel: true,
		quotaPreference,
		explicitQuota
	};
	let antigravityModel = modelWithoutQuota;
	if (skipAlias) {
		if ((isGemini3Pro || isGemini3Flash) && !tier && !isImageModel) antigravityModel = `${modelWithoutQuota}-${isGemini3Pro ? "low" : "medium"}`;
	}
	const resolvedModel = skipAlias ? antigravityModel : MODEL_ALIASES[modelWithoutQuota] || MODEL_ALIASES[baseName] || baseName;
	const isThinking = isThinkingCapableModel(resolvedModel);
	if (isImageModel) return {
		actualModel: resolvedModel,
		isThinkingModel: false,
		isImageModel: true,
		quotaPreference,
		explicitQuota
	};
	const isEffectiveGemini3 = resolvedModel.toLowerCase().includes("gemini-3");
	const lowerModelWithoutQuota = modelWithoutQuota.toLowerCase();
	const isClaudeThinking = resolvedModel.toLowerCase().includes("claude") && resolvedModel.toLowerCase().includes("thinking") || lowerModelWithoutQuota.includes("claude") && lowerModelWithoutQuota.includes("thinking") || lowerModelWithoutQuota === "gemini-claude-sonnet-4-6";
	if (!tier) {
		if (isEffectiveGemini3) return {
			actualModel: resolvedModel,
			thinkingLevel: isGemini35Flash ? "medium" : "low",
			isThinkingModel: true,
			quotaPreference,
			explicitQuota
		};
		if (isClaudeThinking) return {
			actualModel: resolvedModel,
			thinkingBudget: 1024,
			isThinkingModel: true,
			quotaPreference,
			explicitQuota
		};
		return {
			actualModel: resolvedModel,
			isThinkingModel: isThinking,
			quotaPreference,
			explicitQuota
		};
	}
	if (isEffectiveGemini3) return {
		actualModel: resolvedModel,
		thinkingLevel: tier,
		tier,
		isThinkingModel: true,
		quotaPreference,
		explicitQuota
	};
	if (isClaudeThinking) return {
		actualModel: resolvedModel,
		thinkingBudget: 1024,
		tier,
		isThinkingModel: true,
		quotaPreference,
		explicitQuota
	};
	const budgetFamily = getBudgetFamily(resolvedModel);
	return {
		actualModel: resolvedModel,
		thinkingBudget: THINKING_TIER_BUDGETS[budgetFamily][tier],
		tier,
		isThinkingModel: isThinking,
		quotaPreference,
		explicitQuota
	};
}
//#endregion
//#region direct/legacy/src/private-transport-error.ts
var PrivateTransportError = class extends Error {
	code;
	status;
	/** Whether an upstream could have accepted the request before the failure. */
	accepted;
	constructor(code, message, options = {}) {
		super(message);
		this.name = "PrivateTransportError";
		this.code = code;
		this.accepted = options.accepted ?? true;
		if (options.status !== void 0) this.status = options.status;
	}
};
//#endregion
//#region direct/legacy/src/wire-identity.ts
/**
* The only identity seam for Antigravity private requests.
*
* The community transport snapshot owns the audited provider framing. This
* module owns the provider headers that identify that framing and carries the
* truthful DSH application identity in a plugin-owned secondary header. No
* caller may supply, suppress, rename, or replace either identity.
*/
const DSH_ATTRIBUTION_HEADER = "X-DeepSeek-Harness-Attribution";
const AGY_PROVIDER_USER_AGENT = buildAntigravityHarnessUserAgent();
const ANTIGRAVITY_WIRE_ORIGIN = new URL(ANTIGRAVITY_ENDPOINT).origin;
const ANTIGRAVITY_WIRE_ORIGINS = Object.freeze([new URL(ANTIGRAVITY_ENDPOINT).origin, new URL(ANTIGRAVITY_ENDPOINT_PROD).origin]);
const ANTIGRAVITY_WIRE_PATHS = Object.freeze([
	"/v1internal:loadCodeAssist",
	"/v1internal:streamGenerateContent",
	"/v1internal:generateContent",
	"/v1internal:retrieveUserQuotaSummary",
	"/v1internal:fetchAvailableModels"
]);
const MAX_HEADER_VALUE_LENGTH = 1024;
const ATTRIBUTION_KEYS = /* @__PURE__ */ new Set(["user-agent", "User-Agent"]);
var WireIdentityError = class extends Error {
	code;
	constructor(code, message) {
		super(message);
		this.name = "WireIdentityError";
		this.code = code;
	}
};
/** Build the fixed provider identity plus the one required DSH carrier. */
function buildWireIdentityHeaders() {
	const attribution = readAttributionValue();
	assertSafeHeaderValue("User-Agent", AGY_PROVIDER_USER_AGENT, "WIRE_PROVIDER_HEADER_UNSAFE");
	return Object.freeze({
		"User-Agent": AGY_PROVIDER_USER_AGENT,
		[DSH_ATTRIBUTION_HEADER]: attribution
	});
}
/** Create one immutable identity policy for all private operation callers. */
function createWireIdentity() {
	const headers = buildWireIdentityHeaders();
	const headerPairs = (url, request) => {
		assertHttpsEndpoint(url);
		assertClosedObject(request, ["authorization", "body"], "WIRE_REQUEST_OVERRIDE");
		if (typeof request.body !== "string" && !(request.body instanceof Uint8Array)) throw new WireIdentityError("WIRE_REQUEST_BODY_INVALID", "The private request body is not bounded bytes");
		const authorization = validateAuthorization(request.authorization);
		const basePairs = buildAgyCliHeaderPairs(url, {
			method: "POST",
			body: request.body,
			headers: {
				"User-Agent": headers["User-Agent"],
				Authorization: authorization,
				"Content-Type": "application/json",
				"Accept-Encoding": "gzip"
			}
		});
		const result = [];
		for (const pair of basePairs) {
			const immutablePair = Object.freeze([pair[0], pair[1]]);
			result.push(immutablePair);
			if (pair[0] === "User-Agent") result.push(Object.freeze([DSH_ATTRIBUTION_HEADER, headers[DSH_ATTRIBUTION_HEADER]]));
		}
		return Object.freeze(result);
	};
	const serialize = (url, request) => {
		const parsed = new URL(url);
		const pairs = headerPairs(url, request);
		const body = typeof request.body === "string" ? Buffer$1.from(request.body) : Buffer$1.from(request.body);
		const lines = pairs.map(([name, value]) => `${name}: ${value}`).join("\r\n");
		const head = Buffer$1.from(`POST ${parsed.pathname}${parsed.search} HTTP/1.1\r\n${lines}\r\n\r\n`);
		if (!pairs.some(([name]) => name === "Transfer-Encoding")) return body.byteLength === 0 ? head : Buffer$1.concat([head, body]);
		if (body.byteLength === 0) return Buffer$1.concat([head, Buffer$1.from("0\r\n\r\n")]);
		return Buffer$1.concat([
			head,
			Buffer$1.from(`${body.byteLength.toString(16)}\r\n`),
			body,
			Buffer$1.from("\r\n0\r\n\r\n")
		]);
	};
	return Object.freeze({
		headers: () => headers,
		headerPairs,
		serialize
	});
}
function readAttributionValue() {
	let value;
	try {
		value = attributionHeaders();
	} catch {
		throw new WireIdentityError("WIRE_ATTRIBUTION_UNAVAILABLE", "DSH attribution could not be constructed");
	}
	if (typeof value !== "object" || value === null || Array.isArray(value)) throw new WireIdentityError("WIRE_ATTRIBUTION_INVALID", "DSH attribution returned an invalid header set");
	const keys = Object.keys(value);
	if (keys.length === 0) throw new WireIdentityError("WIRE_ATTRIBUTION_MISSING", "DSH attribution did not contain a User-Agent");
	for (const key of keys) if (!ATTRIBUTION_KEYS.has(key)) throw new WireIdentityError("WIRE_ATTRIBUTION_UNEXPECTED", "DSH attribution contained an unapproved header");
	const lower = value["user-agent"];
	const title = value["User-Agent"];
	if (lower !== void 0 && title !== void 0) throw new WireIdentityError("WIRE_ATTRIBUTION_DUPLICATE", "DSH attribution contained duplicate User-Agent fields");
	const attribution = lower ?? title;
	if (attribution === void 0) throw new WireIdentityError("WIRE_ATTRIBUTION_MISSING", "DSH attribution did not contain a User-Agent");
	if (attribution === AGY_PROVIDER_USER_AGENT) throw new WireIdentityError("WIRE_ATTRIBUTION_PROVIDER_OVERRIDE", "DSH attribution was replaced by the Antigravity provider identity");
	assertSafeHeaderValue(DSH_ATTRIBUTION_HEADER, attribution, "WIRE_ATTRIBUTION_UNSAFE");
	return attribution;
}
function validateAuthorization(value) {
	if (typeof value !== "string" || !/^Bearer\s+\S+$/u.test(value)) throw new WireIdentityError("WIRE_REQUEST_UNSAFE_AUTHORIZATION", "The private request authorization value is invalid");
	assertSafeHeaderValue("Authorization", value, "WIRE_REQUEST_UNSAFE_AUTHORIZATION");
	return value;
}
function assertSafeHeaderValue(name, value, code) {
	if (typeof value !== "string" || value.length === 0 || value.length > MAX_HEADER_VALUE_LENGTH) throw new WireIdentityError(code, `${name} is outside the safe header-value bounds`);
	for (let index = 0; index < value.length; index += 1) {
		const codePoint = value.charCodeAt(index);
		if (codePoint < 32 || codePoint === 127) throw new WireIdentityError(code, `${name} contains an unsafe header character`);
	}
}
function assertHttpsEndpoint(url) {
	let parsed;
	try {
		parsed = new URL(url);
	} catch {
		throw new WireIdentityError("WIRE_REQUEST_ENDPOINT_INVALID", "The private request endpoint is invalid");
	}
	if (parsed.protocol !== "https:" || !ANTIGRAVITY_WIRE_ORIGINS.some((origin) => origin === parsed.origin) || !ANTIGRAVITY_WIRE_PATHS.some((path) => path === parsed.pathname) || parsed.search.length > 0 && parsed.search !== "?alt=sse" || parsed.hash.length > 0) throw new WireIdentityError("WIRE_REQUEST_ENDPOINT_INVALID", "The private request endpoint is not allowlisted");
}
function assertClosedObject(value, allowedKeys, code) {
	if (value === null || typeof value !== "object" || Array.isArray(value)) throw new WireIdentityError(code, "The wire identity input must be a closed object");
	const allowed = new Set(allowedKeys);
	for (const key of Object.keys(value)) if (!allowed.has(key)) throw new WireIdentityError(code, "The wire identity input contains an unapproved override");
}
//#endregion
//#region direct/legacy/src/raw-http.ts
/** Literal HTTP/1.1 dispatcher for the fixed Antigravity wire profile. */
const DEFAULT_HTTPS_PORT = 443;
const DEFAULT_PROXY_PORT = 8080;
const MAX_RESPONSE_HEAD_BYTES = 65536;
/** Dispatch one request using the immutable plugin-owned Wire Identity. */
function createRawPrivateDispatcher(explicitProxy) {
	const wire = createWireIdentity();
	return async (input) => {
		if (input.signal?.aborted === true) throw cancelled$1(false);
		const url = new URL(input.url);
		const request = wire.serialize(input.url, {
			authorization: `Bearer ${input.accessToken}`,
			body: input.body
		});
		const socket = await connectTls(url, input.responseHeaderTimeoutMs, input.signal, explicitProxy?.());
		let dispatched = false;
		try {
			if (isAborted$2(input.signal)) throw cancelled$1(false);
			socket.write(request);
			dispatched = true;
			const { head, leftover } = await waitForHead(socket, input.responseHeaderTimeoutMs, dispatched, input.signal);
			const parsed = parseResponseHead(head);
			const body = buildResponseBody(socket, leftover, parsed, input.signal);
			return new Response(body, {
				status: parsed.status,
				statusText: parsed.statusText,
				headers: parsed.headers
			});
		} catch (error) {
			socket.destroy();
			if (error instanceof PrivateTransportError) throw error;
			throw new PrivateTransportError("offline", "The private endpoint could not be reached", { accepted: dispatched });
		}
	};
}
async function connectTls(url, timeoutMs, signal, explicitProxy) {
	const proxy = httpsProxy(url, explicitProxy);
	return proxy === void 0 ? connectDirect(url, timeoutMs, signal) : connectThroughProxy(proxy, url, timeoutMs, signal);
}
async function connectDirect(url, timeoutMs, signal) {
	const socket = tls.connect({
		host: url.hostname,
		port: Number(url.port || DEFAULT_HTTPS_PORT),
		servername: url.hostname
	});
	await waitForConnect(socket, "secureConnect", timeoutMs, signal);
	return socket;
}
async function connectThroughProxy(proxy, target, timeoutMs, signal) {
	const proxyAuthorization = proxyAuthorizationHeader(proxy);
	const proxySocket = net.connect({
		host: proxy.hostname,
		port: Number(proxy.port || DEFAULT_PROXY_PORT)
	});
	await waitForConnect(proxySocket, "connect", timeoutMs, signal);
	const targetPort = Number(target.port || DEFAULT_HTTPS_PORT);
	proxySocket.write(`CONNECT ${target.hostname}:${targetPort} HTTP/1.1\r\nHost: ${target.hostname}:${targetPort}\r\n` + proxyAuthorization + "\r\n");
	const { head, leftover } = await waitForHead(proxySocket, timeoutMs, false, signal);
	if (!/^HTTP\/1\.[01]\s+2\d\d(?:\s|$)/u.test(head.split("\r\n", 1)[0] ?? "")) {
		proxySocket.destroy();
		throw new PrivateTransportError("offline", "The HTTPS proxy rejected the private connection", { accepted: false });
	}
	if (leftover.byteLength > 0) proxySocket.unshift(leftover);
	proxySocket.resume();
	const socket = tls.connect({
		socket: proxySocket,
		servername: target.hostname
	});
	await waitForConnect(socket, "secureConnect", timeoutMs, signal);
	return socket;
}
async function waitForConnect(socket, event, timeoutMs, signal) {
	await new Promise((resolve, reject) => {
		let settled = false;
		const finish = (action) => {
			if (settled) return;
			settled = true;
			clearTimeout(timer);
			socket.removeListener(event, onConnect);
			socket.removeListener("error", onError);
			signal?.removeEventListener("abort", onAbort);
			action();
		};
		const onConnect = () => finish(resolve);
		const onError = () => finish(() => reject(new PrivateTransportError("offline", "The private endpoint could not be reached", { accepted: false })));
		const onAbort = () => finish(() => {
			socket.destroy();
			reject(cancelled$1(false));
		});
		const timer = setTimeout(() => finish(() => {
			socket.destroy();
			reject(new PrivateTransportError("timeout", "The private endpoint connection timed out", { accepted: false }));
		}), timeoutMs);
		socket.once(event, onConnect);
		socket.once("error", onError);
		if (signal?.aborted === true) onAbort();
		else signal?.addEventListener("abort", onAbort, { once: true });
	});
}
async function waitForHead(socket, timeoutMs, accepted, signal) {
	return new Promise((resolve, reject) => {
		let buffer = Buffer$1.alloc(0);
		let settled = false;
		const finish = (action) => {
			if (settled) return;
			settled = true;
			clearTimeout(timer);
			socket.removeListener("data", onData);
			socket.removeListener("error", onError);
			signal?.removeEventListener("abort", onAbort);
			action();
		};
		const onError = (error) => finish(() => reject(error instanceof PrivateTransportError ? error : new PrivateTransportError("offline", "The private endpoint closed before response headers", { accepted })));
		const onAbort = () => finish(() => {
			socket.destroy();
			reject(cancelled$1(accepted));
		});
		const onData = (chunk) => {
			buffer = Buffer$1.concat([buffer, chunk]);
			const marker = buffer.indexOf("\r\n\r\n");
			if (marker < 0) {
				if (buffer.byteLength > MAX_RESPONSE_HEAD_BYTES) finish(() => reject(new PrivateTransportError("protocol-drift", "The private response headers exceeded the limit", { accepted })));
				return;
			}
			if (marker > MAX_RESPONSE_HEAD_BYTES) {
				finish(() => reject(new PrivateTransportError("protocol-drift", "The private response headers exceeded the limit", { accepted })));
				return;
			}
			socket.pause();
			const head = buffer.subarray(0, marker).toString("latin1");
			const leftover = buffer.subarray(marker + 4);
			finish(() => resolve({
				head,
				leftover
			}));
		};
		const timer = setTimeout(() => finish(() => {
			socket.destroy();
			reject(new PrivateTransportError("timeout", "The private request timed out before response headers", { accepted }));
		}), timeoutMs);
		socket.on("data", onData);
		socket.once("error", onError);
		if (signal?.aborted === true) onAbort();
		else signal?.addEventListener("abort", onAbort, { once: true });
	});
}
function parseResponseHead(value) {
	const lines = value.split("\r\n");
	const statusLine = lines.shift() ?? "";
	const match = /^HTTP\/1\.[01]\s+(\d{3})(?:\s+([^\r\n]*))?$/u.exec(statusLine);
	if (match === null) throw new PrivateTransportError("protocol-drift", "The private response status line was malformed");
	const status = Number(match[1]);
	if (status < 200 || status > 599 || hasInvalidHeaderValue(match[2] ?? "")) throw new PrivateTransportError("protocol-drift", "The private response status was unsupported");
	const headers = new Headers();
	let chunked = false;
	let gzip = false;
	let contentLength;
	for (const line of lines) {
		if (line.length === 0 || /^[ \t]/u.test(line)) throw new PrivateTransportError("protocol-drift", "The private response headers were malformed");
		const separator = line.indexOf(":");
		if (separator <= 0) throw new PrivateTransportError("protocol-drift", "The private response headers were malformed");
		const name = line.slice(0, separator);
		const raw = line.slice(separator + 1).trim();
		if (!/^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/u.test(name) || hasInvalidHeaderValue(raw)) throw new PrivateTransportError("protocol-drift", "The private response headers were malformed");
		const lowerName = name.toLowerCase();
		const lowerValue = raw.toLowerCase();
		if (lowerName === "transfer-encoding") {
			if (chunked || lowerValue !== "chunked") throw new PrivateTransportError("protocol-drift", "The private response framing was unsupported");
			chunked = true;
			continue;
		}
		if (lowerName === "content-encoding") {
			if (gzip || lowerValue !== "gzip") throw new PrivateTransportError("protocol-drift", "The private response encoding was unsupported");
			gzip = true;
			continue;
		}
		if (lowerName === "content-length") {
			if (contentLength !== void 0 || !/^\d+$/u.test(raw)) throw new PrivateTransportError("protocol-drift", "The private response length was ambiguous");
			const parsed = Number(raw);
			if (!Number.isSafeInteger(parsed) || parsed < 0) throw new PrivateTransportError("protocol-drift", "The private response length was malformed");
			contentLength = parsed;
			continue;
		}
		headers.append(name, raw);
	}
	if (chunked && contentLength !== void 0) throw new PrivateTransportError("protocol-drift", "The private response framing was ambiguous");
	if (!gzip && contentLength !== void 0) headers.set("content-length", String(contentLength));
	return {
		status,
		statusText: match[2] ?? "",
		headers,
		chunked,
		gzip,
		...contentLength === void 0 ? {} : { contentLength }
	};
}
function buildResponseBody(socket, leftover, head, signal) {
	const source = new PassThrough();
	let current = source;
	if (head.chunked) current = pipeStage(current, new ChunkedDecoder());
	else if (head.contentLength !== void 0) current = pipeStage(current, new ContentLengthDecoder(head.contentLength));
	if (head.gzip) {
		const gunzip = createGunzip();
		current = pipeStage(current, gunzip);
		current = pipeStage(current, new PassThrough(), () => new PrivateTransportError("protocol-drift", "The private gzip response was malformed"));
	}
	const abort = () => {
		socket.destroy(cancelled$1(true));
	};
	const cleanup = () => {
		signal?.removeEventListener("abort", abort);
		socket.destroy();
	};
	socket.once("error", (error) => source.destroy(error instanceof PrivateTransportError ? error : new PrivateTransportError("offline", "The private response stream failed")));
	if (leftover.byteLength > 0) source.write(leftover);
	socket.pipe(source);
	socket.resume();
	if (signal?.aborted === true) abort();
	else signal?.addEventListener("abort", abort, { once: true });
	current.once("end", cleanup);
	current.once("error", cleanup);
	current.once("close", cleanup);
	return toWebBody(current);
}
function toWebBody(stream) {
	const iterable = { [Symbol.asyncIterator]: () => {
		const iterator = stream[Symbol.asyncIterator]();
		return {
			next: () => iterator.next(),
			return: async () => {
				stream.destroy();
				return iterator.return === void 0 ? {
					done: true,
					value: void 0
				} : await iterator.return();
			}
		};
	} };
	return ReadableStream.from(iterable);
}
function pipeStage(source, target, mapError = (error) => error) {
	source.once("error", (error) => target.destroy(mapError(error)));
	return source.pipe(target);
}
var ContentLengthDecoder = class extends Transform {
	remaining;
	constructor(contentLength) {
		super();
		this.remaining = contentLength;
		if (contentLength === 0) this.push(null);
	}
	_transform(chunk, _encoding, callback) {
		if (this.remaining <= 0 || chunk.byteLength > this.remaining) {
			callback(new PrivateTransportError("protocol-drift", "The private response exceeded its declared length"));
			return;
		}
		this.remaining -= chunk.byteLength;
		this.push(chunk);
		if (this.remaining === 0) this.push(null);
		callback();
	}
	_flush(callback) {
		callback(this.remaining === 0 ? void 0 : new PrivateTransportError("protocol-drift", "The private response ended before its declared length"));
	}
};
var ChunkedDecoder = class extends Transform {
	buffer = Buffer$1.alloc(0);
	finished = false;
	_transform(chunk, _encoding, callback) {
		if (this.finished && chunk.byteLength > 0) {
			callback(new PrivateTransportError("protocol-drift", "The private chunked response contained trailing bytes"));
			return;
		}
		this.buffer = Buffer$1.concat([this.buffer, chunk]);
		try {
			this.flushChunks();
			callback();
		} catch (error) {
			callback(error instanceof Error ? error : new PrivateTransportError("protocol-drift", "The private chunked response was malformed"));
		}
	}
	_flush(callback) {
		try {
			this.flushChunks();
			callback(this.finished ? void 0 : new PrivateTransportError("protocol-drift", "The private chunked response ended early"));
		} catch (error) {
			callback(error instanceof Error ? error : new PrivateTransportError("protocol-drift", "The private chunked response was malformed"));
		}
	}
	flushChunks() {
		while (!this.finished) {
			const lineEnd = this.buffer.indexOf("\r\n");
			if (lineEnd < 0) return;
			const sizeText = this.buffer.subarray(0, lineEnd).toString("latin1").split(";", 1)[0]?.trim() ?? "";
			if (!/^[0-9A-Fa-f]+$/u.test(sizeText)) throw new PrivateTransportError("protocol-drift", "The private chunk size was malformed");
			const size = Number.parseInt(sizeText, 16);
			if (!Number.isSafeInteger(size) || size < 0) throw new PrivateTransportError("protocol-drift", "The private chunk size was malformed");
			const chunkStart = lineEnd + 2;
			const chunkEnd = chunkStart + size;
			const end = chunkEnd + 2;
			if (!Number.isSafeInteger(end)) throw new PrivateTransportError("protocol-drift", "The private chunk size was malformed");
			if (this.buffer.byteLength < end) return;
			if (this.buffer[chunkEnd] !== 13 || this.buffer[chunkEnd + 1] !== 10) throw new PrivateTransportError("protocol-drift", "The private chunk terminator was malformed");
			const payload = this.buffer.subarray(chunkStart, chunkEnd);
			this.buffer = this.buffer.subarray(end);
			if (size === 0) {
				if (this.buffer.byteLength > 0) throw new PrivateTransportError("protocol-drift", "The private chunked response contained trailing bytes");
				this.finished = true;
				this.push(null);
				return;
			}
			this.push(payload);
		}
	}
};
function proxyAuthorizationHeader(proxy) {
	if (proxy.username.length === 0) return "";
	let username;
	let password;
	try {
		username = decodeURIComponent(proxy.username);
		password = decodeURIComponent(proxy.password);
	} catch {
		throw new PrivateTransportError("offline", "The configured HTTPS proxy credentials are invalid", { accepted: false });
	}
	if (username.length > 1024 || password.length > 1024 || username.includes(":") || hasInvalidHeaderValue(username) || hasInvalidHeaderValue(password)) throw new PrivateTransportError("offline", "The configured HTTPS proxy credentials are invalid", { accepted: false });
	return `Proxy-Authorization: Basic ${Buffer$1.from(`${username}:${password}`).toString("base64")}\r\n`;
}
function httpsProxy(url, explicitProxy) {
	if (explicitProxy !== void 0) {
		if (explicitProxy === "") return void 0;
		try {
			const proxy = new URL(explicitProxy);
			if (proxy.protocol !== "http:" || proxy.username || proxy.password || proxy.pathname !== "/" && proxy.pathname !== "" || proxy.search || proxy.hash) throw new Error("invalid");
			return proxy;
		} catch {
			throw new PrivateTransportError("offline", "The direct HTTP proxy is invalid", { accepted: false });
		}
	}
	const noProxy = process.env.NO_PROXY ?? process.env.no_proxy ?? "";
	if (matchesNoProxy(url.hostname, noProxy)) return void 0;
	const raw = process.env.HTTPS_PROXY ?? process.env.https_proxy ?? process.env.ALL_PROXY ?? process.env.all_proxy;
	if (raw === void 0 || raw.length === 0) return void 0;
	try {
		const proxy = new URL(raw);
		if (proxy.protocol !== "http:") throw new PrivateTransportError("offline", "The configured HTTPS proxy protocol is unsupported", { accepted: false });
		return proxy;
	} catch (error) {
		if (error instanceof PrivateTransportError) throw error;
		throw new PrivateTransportError("offline", "The configured HTTPS proxy URL is invalid", { accepted: false });
	}
}
function matchesNoProxy(hostname, value) {
	const host = hostname.toLowerCase();
	return value.split(",").map((item) => item.trim().toLowerCase()).some((item) => item === "*" || (item.startsWith(".") ? host.endsWith(item) : item.length > 0 && (host === item || host.endsWith(`.${item}`))));
}
function hasInvalidHeaderValue(value) {
	for (let index = 0; index < value.length; index += 1) {
		const code = value.charCodeAt(index);
		if (code < 32 && code !== 9 || code === 127) return true;
	}
	return false;
}
function isAborted$2(signal) {
	return signal?.aborted === true;
}
function cancelled$1(accepted) {
	return new PrivateTransportError("cancelled", "The private request was cancelled", { accepted });
}
//#endregion
//#region direct/legacy/src/private-transport.ts
/** Bounded Host-only transport primitives for the private Antigravity endpoints. */
const DEFAULT_PRIVATE_RESPONSE_HEADER_TIMEOUT_MS = 18e4;
const DEFAULT_PRIVATE_IDLE_TIMEOUT_MS = 6e4;
const DEFAULT_PRIVATE_TOTAL_TIMEOUT_MS = 3e5;
const DEFAULT_PRIVATE_RESPONSE_BYTES = 8388608;
const DEFAULT_PRIVATE_REQUEST_BYTES = 16777216;
const MAX_PRIVATE_REQUEST_BYTES = 67108864;
const DEFAULT_PRIVATE_FRAME_BYTES = 524288;
/** Build one fixed raw private transport. Callers cannot supply headers, identity, or origins. */
function createPrivateTransport(options = {}) {
	let dispatch;
	const headerTimeoutMs = boundedTimeout$2(options.responseHeaderTimeoutMs, DEFAULT_PRIVATE_RESPONSE_HEADER_TIMEOUT_MS);
	const maxRequestBytes = boundedRequestBytes(options.maxRequestBytes);
	return { request: async (input) => {
		if (isAborted$1(input.signal)) throw cancelledError(false);
		if ((typeof input.body === "string" ? new TextEncoder().encode(input.body).byteLength : input.body.byteLength) > maxRequestBytes) throw new PrivateTransportError("request-too-large", "The private request exceeded the byte limit", { accepted: false });
		if (dispatch === void 0) try {
			dispatch = createRawPrivateDispatcher(options.proxyUrl);
		} catch {
			throw new PrivateTransportError("attribution-rejected", "The private request identity could not be constructed", { accepted: false });
		}
		const response = await dispatch({
			url: input.url,
			accessToken: input.accessToken,
			body: input.body,
			...input.signal === void 0 ? {} : { signal: input.signal },
			responseHeaderTimeoutMs: boundedTimeout$2(input.responseHeaderTimeoutMs, headerTimeoutMs)
		});
		if (!(response instanceof Response)) throw new PrivateTransportError("invalid-response", "The private endpoint returned no response");
		return response;
	} };
}
/** Convert a bounded response status to a safe provider error without exposing its body. */
function privateStatusError(status) {
	if (status >= 200 && status < 300) return void 0;
	if (status === 400) return new PrivateTransportError("protocol-drift", "The private endpoint rejected the request as invalid", { status });
	if (status === 401) return new PrivateTransportError("authentication", "The private endpoint requires authentication", { status });
	if (status === 403) return new PrivateTransportError("forbidden", "The private endpoint forbade this account", { status });
	if (status === 429) return new PrivateTransportError("rate-limited", "The private endpoint is rate-limited", { status });
	if (status >= 500) return new PrivateTransportError("upstream", "The private endpoint is unavailable", { status });
	return new PrivateTransportError("protocol-drift", "The private endpoint returned an unexpected status", { status });
}
/** Read a response body with byte, idle, total, and cancellation bounds. */
async function readPrivateBytes(response, options = {}) {
	const maxBytes = boundedBytes(options.maxBytes, DEFAULT_PRIVATE_RESPONSE_BYTES);
	if (response.body === null) try {
		const data = new Uint8Array(await response.arrayBuffer());
		if (data.byteLength > maxBytes) throw new PrivateTransportError("response-too-large", "The private response exceeded the byte limit");
		return data;
	} catch (error) {
		if (error instanceof PrivateTransportError) throw error;
		if (isAborted$1(options.signal)) throw cancelledError();
		throw new PrivateTransportError("offline", "The private response body could not be read");
	}
	const reader = response.body.getReader();
	const chunks = [];
	let total = 0;
	const startedAt = Date.now();
	try {
		for (;;) {
			const chunk = await readChunk(reader, options, startedAt);
			if (chunk.done) break;
			const value = chunk.value;
			total += value.byteLength;
			if (total > maxBytes) {
				await cancelReader(reader);
				throw new PrivateTransportError("response-too-large", "The private response exceeded the byte limit");
			}
			chunks.push(value);
		}
	} catch (error) {
		if (error instanceof PrivateTransportError) throw error;
		if (isAborted$1(options.signal)) throw cancelledError();
		throw new PrivateTransportError("offline", "The private response body could not be read");
	} finally {
		reader.releaseLock();
	}
	const output = new Uint8Array(total);
	let offset = 0;
	for (const chunk of chunks) {
		output.set(chunk, offset);
		offset += chunk.byteLength;
	}
	return output;
}
async function readPrivateText(response, options = {}) {
	try {
		return new TextDecoder("utf-8", { fatal: true }).decode(await readPrivateBytes(response, options));
	} catch (error) {
		if (error instanceof PrivateTransportError) throw error;
		throw new PrivateTransportError("invalid-response", "The private response was not valid UTF-8");
	}
}
/** Parse SSE/JSON responses without retaining unbounded provider frames. */
async function* iteratePrivateSse(response, options = {}) {
	const maxBytes = boundedBytes(options.maxBytes, DEFAULT_PRIVATE_RESPONSE_BYTES);
	const maxFrameBytes = boundedBytes(options.maxFrameBytes, DEFAULT_PRIVATE_FRAME_BYTES);
	if (response.body === null) {
		const text = await readPrivateText(response, options);
		if (text.trim().length > 0) yield { data: text.trim() };
		return;
	}
	const reader = response.body.getReader();
	const decoder = new TextDecoder("utf-8", { fatal: true });
	let buffer = "";
	let eventName;
	let dataLines = [];
	let bytes = 0;
	let frameBytes = 0;
	let sawSseFrame = false;
	let plainText = "";
	const startedAt = Date.now();
	const flush = () => {
		if (dataLines.length === 0) {
			eventName = void 0;
			frameBytes = 0;
			return;
		}
		const data = dataLines.join("\n");
		const event = eventName;
		dataLines = [];
		eventName = void 0;
		frameBytes = 0;
		sawSseFrame = true;
		return event === void 0 ? { data } : {
			data,
			event
		};
	};
	try {
		for (;;) {
			const chunk = await readChunk(reader, options, startedAt);
			if (chunk.done) break;
			bytes += chunk.value.byteLength;
			if (bytes > maxBytes) throw new PrivateTransportError("response-too-large", "The private response exceeded the byte limit");
			let decoded;
			try {
				decoded = decoder.decode(chunk.value, { stream: true });
			} catch {
				throw new PrivateTransportError("invalid-response", "The private response was not valid UTF-8");
			}
			plainText += decoded;
			buffer += decoded;
			for (;;) {
				const newline = buffer.indexOf("\n");
				if (newline < 0) break;
				let line = buffer.slice(0, newline);
				buffer = buffer.slice(newline + 1);
				if (line.endsWith("\r")) line = line.slice(0, -1);
				if (utf8Bytes(line) > maxFrameBytes) throw new PrivateTransportError("frame-too-large", "The private response frame exceeded the byte limit");
				if (line.length === 0) {
					const event = flush();
					if (event !== void 0) yield event;
					continue;
				}
				if (line.startsWith(":")) continue;
				frameBytes += utf8Bytes(line) + 1;
				if (frameBytes > maxFrameBytes) throw new PrivateTransportError("frame-too-large", "The private response frame exceeded the byte limit");
				if (line.startsWith("event:")) eventName = line.slice(6).trim() || void 0;
				else if (line.startsWith("data:")) {
					const value = line.slice(5).replace(/^ /u, "");
					dataLines.push(value);
				}
			}
		}
		let tail;
		try {
			tail = decoder.decode();
		} catch {
			throw new PrivateTransportError("invalid-response", "The private response was not valid UTF-8");
		}
		plainText += tail;
		buffer += tail;
		if (buffer.length > 0) {
			frameBytes += utf8Bytes(buffer);
			if (frameBytes > maxFrameBytes) throw new PrivateTransportError("frame-too-large", "The private response frame exceeded the byte limit");
			if (buffer.startsWith("data:")) dataLines.push(buffer.slice(5).replace(/^ /u, ""));
		}
		const event = flush();
		if (event !== void 0) yield event;
		if (!sawSseFrame && plainText.trim().length > 0) yield { data: plainText.trim() };
	} catch (error) {
		if (error instanceof PrivateTransportError) throw error;
		if (isAborted$1(options.signal)) throw cancelledError();
		throw new PrivateTransportError("offline", "The private response stream could not be read");
	} finally {
		await cancelReader(reader);
		reader.releaseLock();
	}
}
async function readChunk(reader, options, startedAt) {
	if (isAborted$1(options.signal)) {
		await cancelReader(reader);
		throw cancelledError();
	}
	const totalTimeout = boundedTimeout$2(options.totalTimeoutMs, DEFAULT_PRIVATE_TOTAL_TIMEOUT_MS);
	const elapsed = Date.now() - startedAt;
	if (elapsed >= totalTimeout) {
		await cancelReader(reader);
		throw new PrivateTransportError("timeout", "The private response exceeded the total timeout");
	}
	const idleTimeout = boundedTimeout$2(options.idleTimeoutMs, DEFAULT_PRIVATE_IDLE_TIMEOUT_MS);
	let timer;
	let removeAbort;
	const abort = new Promise((_, reject) => {
		const onAbort = () => reject(cancelledError());
		removeAbort = () => options.signal?.removeEventListener("abort", onAbort);
		if (options.signal === void 0) return;
		if (options.signal.aborted) onAbort();
		else options.signal.addEventListener("abort", onAbort, { once: true });
	});
	const idle = new Promise((_, reject) => {
		timer = setTimeout(() => reject(new PrivateTransportError("timeout", "The private response stream stalled")), idleTimeout);
	});
	let totalHandle;
	const remaining = totalTimeout - elapsed;
	const total = new Promise((_, reject) => {
		totalHandle = setTimeout(() => reject(new PrivateTransportError("timeout", "The private response exceeded the total timeout")), remaining);
	});
	try {
		return await Promise.race([
			reader.read(),
			abort,
			idle,
			total
		]);
	} catch (error) {
		await cancelReader(reader);
		throw error;
	} finally {
		if (timer !== void 0) clearTimeout(timer);
		if (totalHandle !== void 0) clearTimeout(totalHandle);
		removeAbort?.();
	}
}
function utf8Bytes(value) {
	return new TextEncoder().encode(value).byteLength;
}
function isAborted$1(signal) {
	return signal !== void 0 && signal.aborted;
}
async function cancelReader(reader) {
	try {
		await reader.cancel();
	} catch {}
}
function cancelledError(accepted = true) {
	return new PrivateTransportError("cancelled", "The private request was cancelled", { accepted });
}
function boundedTimeout$2(value, fallback) {
	return value === void 0 || !Number.isFinite(value) || value <= 0 ? fallback : Math.min(Math.floor(value), 6e5);
}
function boundedRequestBytes(value) {
	return value === void 0 || !Number.isFinite(value) || value <= 0 ? DEFAULT_PRIVATE_REQUEST_BYTES : Math.min(Math.floor(value), MAX_PRIVATE_REQUEST_BYTES);
}
function boundedBytes(value, fallback) {
	return value === void 0 || !Number.isFinite(value) || value <= 0 ? fallback : Math.min(Math.floor(value), fallback);
}
//#endregion
//#region direct/legacy/src/private-failure.ts
/** One closed classifier shared by every capability's public error vocabulary. */
function classifyPrivateFailure(error) {
	if (!(error instanceof PrivateTransportError)) return "failed";
	switch (error.code) {
		case "authentication": return "authentication";
		case "forbidden": return "forbidden";
		case "rate-limited": return "rate-limited";
		case "cancelled": return "cancelled";
		case "timeout": return "timeout";
		case "attribution-rejected": return "attribution-rejected";
		case "protocol-drift":
		case "invalid-response": return "protocol-drift";
		case "response-too-large":
		case "frame-too-large": return "response-limit";
		case "request-too-large": return "request-limit";
		case "upstream": return "upstream";
		case "offline": return "network";
	}
}
const PROJECT_DISCOVERY_ENDPOINT = `${ANTIGRAVITY_WIRE_ORIGIN}/v1internal:loadCodeAssist`;
const MAX_RESPONSE_BYTES = Math.min(DEFAULT_PRIVATE_RESPONSE_BYTES, 65536);
const DEFAULT_OPERATION_TIMEOUT_MS = 1e4;
const MAX_OPERATION_TIMEOUT_MS = 6e5;
const MAX_PROJECT_ID_LENGTH = 128;
const PROJECT_ID_PATTERN = /^[a-z0-9][a-z0-9-_]{1,127}$/u;
var ProjectDiscoveryError = class extends Error {
	code;
	constructor(code, message = projectDiscoveryErrorMessage(code)) {
		super(message);
		this.name = "ProjectDiscoveryError";
		this.code = code;
	}
};
/** Create the fixed, read-only loadCodeAssist project probe. */
function createProjectDiscovery(options = {}) {
	const timeoutMs = boundedTimeout$1(options.operationTimeoutMs);
	const transport = options.transport ?? createPrivateTransport({
		...options.transportOptions?.responseHeaderTimeoutMs === void 0 ? {} : { responseHeaderTimeoutMs: options.transportOptions.responseHeaderTimeoutMs },
		...options.transportOptions?.maxRequestBytes === void 0 ? {} : { maxRequestBytes: options.transportOptions.maxRequestBytes }
	});
	return { discover: async (accessToken, signal) => {
		if (signal?.aborted === true) throw new ProjectDiscoveryError("cancelled");
		const body = JSON.stringify({ metadata: buildAntigravityLoadCodeAssistMetadata() });
		let response;
		try {
			response = await transport.request({
				url: PROJECT_DISCOVERY_ENDPOINT,
				accessToken,
				body,
				...signal === void 0 ? {} : { signal },
				responseHeaderTimeoutMs: timeoutMs
			});
		} catch (error) {
			throw mapTransportError(error);
		}
		const statusError = privateStatusError(response.status);
		if (statusError !== void 0) {
			await response.body?.cancel().catch(() => {});
			throw mapTransportError(statusError);
		}
		try {
			const text = await readPrivateText(response, {
				...signal === void 0 ? {} : { signal },
				idleTimeoutMs: Math.min(timeoutMs, DEFAULT_PRIVATE_IDLE_TIMEOUT_MS),
				totalTimeoutMs: Math.min(timeoutMs, DEFAULT_PRIVATE_TOTAL_TIMEOUT_MS),
				maxBytes: MAX_RESPONSE_BYTES
			});
			let value;
			try {
				value = JSON.parse(text);
			} catch {
				throw new ProjectDiscoveryError("malformed");
			}
			return parseProjectResponse(value);
		} catch (error) {
			if (error instanceof ProjectDiscoveryError) throw error;
			throw mapTransportError(error);
		}
	} };
}
/** Normalize the only project field that may cross into the credential store. */
function normalizeProjectId(value) {
	if (typeof value !== "string") return void 0;
	let normalized = value.trim();
	if (normalized.startsWith("projects/")) normalized = normalized.slice(9).trim();
	if (normalized.length === 0 || normalized.length > MAX_PROJECT_ID_LENGTH) return void 0;
	return PROJECT_ID_PATTERN.test(normalized) ? normalized : void 0;
}
function parseProjectResponse(value) {
	if (!isRecord$10(value)) throw new ProjectDiscoveryError("malformed");
	if (!Object.prototype.hasOwnProperty.call(value, "cloudaicompanionProject")) return void 0;
	const candidate = value.cloudaicompanionProject;
	if (candidate === null || candidate === void 0) return void 0;
	if (typeof candidate === "string") {
		if (candidate.trim().length === 0) return void 0;
		return projectFromValue(candidate);
	}
	if (!isRecord$10(candidate)) throw new ProjectDiscoveryError("protocol-drift");
	if (!Object.prototype.hasOwnProperty.call(candidate, "id")) return void 0;
	if (candidate.id === null || candidate.id === void 0) throw new ProjectDiscoveryError("protocol-drift");
	return projectFromValue(candidate.id);
}
function projectFromValue(value) {
	const projectId = normalizeProjectId(value);
	if (projectId === void 0) throw new ProjectDiscoveryError("protocol-drift");
	return { projectId };
}
function boundedTimeout$1(value) {
	if (value === void 0 || !Number.isFinite(value) || value <= 0) return DEFAULT_OPERATION_TIMEOUT_MS;
	return Math.min(Math.floor(value), MAX_OPERATION_TIMEOUT_MS);
}
const PROJECT_FAILURE_CODES = {
	authentication: "authentication",
	forbidden: "forbidden",
	"rate-limited": "rate-limited",
	cancelled: "cancelled",
	timeout: "offline",
	"attribution-rejected": "protocol-drift",
	"protocol-drift": "protocol-drift",
	"response-limit": "protocol-drift",
	"request-limit": "protocol-drift",
	upstream: "offline",
	network: "offline",
	failed: "offline"
};
function mapTransportError(error) {
	if (error instanceof ProjectDiscoveryError) return error;
	if (error instanceof PrivateTransportError) return new ProjectDiscoveryError(PROJECT_FAILURE_CODES[classifyPrivateFailure(error)]);
	return new ProjectDiscoveryError("offline");
}
function projectDiscoveryErrorMessage(code) {
	if (code === "authentication") return "The Antigravity project probe requires authentication";
	if (code === "forbidden") return "The Antigravity project probe was forbidden";
	if (code === "rate-limited") return "The Antigravity project probe is rate-limited";
	if (code === "offline") return "The Antigravity project probe is offline";
	if (code === "malformed") return "The Antigravity project response was malformed";
	if (code === "protocol-drift") return "The Antigravity project protocol changed";
	return "The Antigravity project probe was cancelled";
}
function isRecord$10(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
//#endregion
//#region direct/legacy/src/login-types.ts
const LOGIN_ERROR_CODES = [
	"client-not-configured",
	"invalid-method",
	"invalid-path",
	"invalid-host",
	"duplicate-parameter",
	"invalid-parameters",
	"missing-state",
	"state-mismatch",
	"missing-code",
	"oauth-error",
	"no-pending-flow",
	"expired",
	"cancelled",
	"port-conflict",
	"token-exchange-failed",
	"project-unavailable",
	"project-authentication-failed",
	"project-forbidden",
	"project-rate-limited",
	"project-offline",
	"project-malformed",
	"project-protocol-drift",
	"project-validation-failed",
	"persistence-failed",
	"credential-conflict",
	"invalid-callback-url",
	"risk-acknowledgement-required",
	"internal"
];
function isLoginErrorCode(value) {
	return typeof value === "string" && LOGIN_ERROR_CODES.includes(value);
}
//#endregion
//#region direct/legacy/src/oauth-flow.ts
/** Host-only PKCE, loopback callback, and token-exchange coordinator. */
const ANTIGRAVITY_CALLBACK_PORT = 51121;
const ANTIGRAVITY_CALLBACK_HOSTS = Object.freeze([
	`localhost:${String(ANTIGRAVITY_CALLBACK_PORT)}`,
	`127.0.0.1:${String(ANTIGRAVITY_CALLBACK_PORT)}`,
	`[::1]:${String(ANTIGRAVITY_CALLBACK_PORT)}`,
	"localhost",
	"127.0.0.1",
	"[::1]"
]);
const AUTHORIZATION_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";
const TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
const MAX_CALLBACK_VALUE_LENGTH = 4096;
const MAX_TOKEN_RESPONSE_BYTES = 65536;
const EMPTY_RESPONSE_HEADERS = Object.freeze({
	"Cache-Control": "no-store",
	"Content-Security-Policy": "default-src 'none'; base-uri 'none'; frame-ancestors 'none'",
	"Content-Type": "text/html; charset=utf-8",
	"X-Content-Type-Options": "nosniff"
});
var OAuthFlowError = class extends Error {
	code;
	constructor(code, message) {
		super(message);
		this.name = "OAuthFlowError";
		this.code = code;
	}
};
/** Create one process-local, one-shot OAuth flow. */
function createOAuthFlow(options = {}) {
	const clock = options.clock ?? systemClock();
	const random = options.randomBytes ?? ((size) => randomBytes(size));
	const listenerFactory = options.listenerFactory ?? createNodeLoopbackListenerFactory();
	const exchangeCode = options.exchangeCode ?? createGoogleTokenExchanger(options.fetchImpl ?? fetch, clock);
	const validateProject = options.validateProject ?? (async () => void 0);
	const commit = options.commit ?? (async () => {});
	const ttlMs = options.ttlMs ?? 3e5;
	let pending;
	let processing;
	let generation = 0;
	let committingGeneration;
	let currentStatus = { phase: "idle" };
	let disposed = false;
	let listenerClosing = Promise.resolve();
	let callbackInFlight;
	const closeListener = (candidate) => {
		const listener = candidate.listener;
		candidate.listener = void 0;
		if (listener === void 0) return listenerClosing;
		listenerClosing = listenerClosing.then(() => Promise.resolve(listener.close()).catch(() => {}), () => Promise.resolve(listener.close()).catch(() => {}));
		return listenerClosing;
	};
	const flow = {
		generation: () => committingGeneration ?? generation,
		start: async () => {
			if (disposed) throw new OAuthFlowError("internal", "The OAuth flow is unavailable");
			callbackInFlight = void 0;
			if (pending !== void 0) await cancelPending(pending, "cancelled");
			if (processing !== void 0) {
				if (!processing.commitStarted) processing.controller.abort(new OAuthFlowError("cancelled", "The OAuth login was cancelled"));
				processing = void 0;
			}
			const verifier = encodeBase64Url(randomBytes$1(random, 32));
			const state = encodeBase64Url(randomBytes$1(random, 32));
			const authorizationUrl = buildAuthorizationUrl(state, verifier);
			const expiresAt = clock.now() + ttlMs;
			const controller = new AbortController();
			const candidateGeneration = generation + 1;
			generation = candidateGeneration;
			const candidate = {
				authorizationUrl,
				expiresAt,
				state,
				verifier,
				controller,
				generation: candidateGeneration,
				timeout: clock.setTimeout(() => {
					expire(candidate);
				}, ttlMs),
				active: true,
				commitStarted: false
			};
			pending = candidate;
			currentStatus = {
				phase: "pending",
				authorizationUrl,
				expiresAt: new Date(expiresAt).toISOString()
			};
			try {
				await listenerClosing;
				if (!candidate.active || pending !== candidate) throw new OAuthFlowError("cancelled", "The OAuth login was cancelled");
				candidate.listener = await listenerFactory.listen((request) => handleLoopbackRequest(request));
				if (!candidate.active || pending !== candidate) {
					await closeListener(candidate);
					throw new OAuthFlowError("cancelled", "The OAuth login was cancelled");
				}
			} catch (error) {
				clock.clearTimeout(candidate.timeout);
				if (pending === candidate) pending = void 0;
				candidate.active = false;
				const safe = asListenerError(error);
				updateStatus(candidate, {
					phase: safe.code === "port-conflict" ? "port-conflict" : "failed",
					errorCode: safe.code
				});
				throw safe;
			}
			return {
				started: true,
				phase: "pending",
				authorizationUrl,
				expiresAt: new Date(expiresAt).toISOString()
			};
		},
		status: () => currentStatus,
		completeCallbackUrl: async (callbackUrl) => {
			if (typeof callbackUrl !== "string" || callbackUrl.length === 0 || callbackUrl.length > MAX_CALLBACK_VALUE_LENGTH) throw new OAuthFlowError("invalid-callback-url", "The callback URL is invalid");
			let parsed;
			try {
				parsed = new URL(callbackUrl);
			} catch {
				throw new OAuthFlowError("invalid-callback-url", "The callback URL is invalid");
			}
			if (parsed.protocol !== "http:" || parsed.username.length > 0 || parsed.password.length > 0 || parsed.hash.length > 0) throw new OAuthFlowError("invalid-callback-url", "The callback URL is invalid");
			return completeCallback({
				method: "GET",
				host: parsed.host,
				url: `${parsed.pathname}${parsed.search}`
			});
		},
		cancel: async () => {
			if (pending !== void 0) await cancelPending(pending, "cancelled");
			if (processing !== void 0) {
				const active = processing;
				if (active.commitStarted) return currentStatus;
				callbackInFlight = void 0;
				active.controller.abort(new OAuthFlowError("cancelled", "The OAuth login was cancelled"));
				updateStatus(active, {
					phase: "cancelled",
					errorCode: "cancelled"
				});
				return currentStatus;
			}
			callbackInFlight = void 0;
			return currentStatus;
		},
		dispose: async () => {
			if (disposed) return;
			disposed = true;
			callbackInFlight = void 0;
			if (pending !== void 0) await cancelPending(pending, "cancelled");
			if (processing !== void 0) {
				if (!processing.commitStarted) processing.controller.abort(new OAuthFlowError("cancelled", "The OAuth login was cancelled"));
				processing = void 0;
			}
			await listenerClosing;
		}
	};
	async function completeCallback(request) {
		if (disposed) throw new OAuthFlowError("internal", "The OAuth flow is unavailable");
		const candidate = pending;
		if (candidate === void 0 || !candidate.active) throw noPendingError(currentStatus);
		assertCallbackRequest(request);
		const callback = parseCallback(request.url);
		if (callback.state !== candidate.state) throw new OAuthFlowError("state-mismatch", "The OAuth callback state was not accepted");
		candidate.active = false;
		pending = void 0;
		processing = candidate;
		clock.clearTimeout(candidate.timeout);
		closeListener(candidate);
		if (callback.error !== void 0) {
			processing = void 0;
			candidate.controller.abort(new OAuthFlowError("oauth-error", "The OAuth provider rejected authorization"));
			updateStatus(candidate, {
				phase: "failed",
				errorCode: "oauth-error"
			});
			return {
				completed: false,
				phase: "failed",
				errorCode: "oauth-error"
			};
		}
		if (callback.code === void 0) {
			processing = void 0;
			updateStatus(candidate, {
				phase: "failed",
				errorCode: "missing-code"
			});
			return {
				completed: false,
				phase: "failed",
				errorCode: "missing-code"
			};
		}
		const operation = combineSignals(candidate.controller.signal);
		try {
			const token = await exchangeCode({
				code: callback.code,
				verifier: candidate.verifier,
				signal: operation.signal
			});
			if (operation.signal.aborted) throw new OAuthFlowError("cancelled", "The OAuth login was cancelled");
			assertToken(token);
			let project;
			try {
				project = await validateProject(token.accessToken, operation.signal);
			} catch (error) {
				if (operation.signal.aborted) throw new OAuthFlowError("cancelled", "The OAuth login was cancelled");
				if (error instanceof ProjectDiscoveryError) {
					if (error.code === "cancelled") throw new OAuthFlowError("cancelled", "The OAuth login was cancelled");
					throw new OAuthFlowError(projectErrorCode(error.code), projectErrorMessage(error.code));
				}
				throw error instanceof OAuthFlowError ? error : new OAuthFlowError("project-validation-failed", "Project validation failed");
			}
			if (operation.signal.aborted) throw new OAuthFlowError("cancelled", "The OAuth login was cancelled");
			if (project === void 0) throw new OAuthFlowError("project-unavailable", "No usable project is available for this account");
			project = normalizeProject(project);
			try {
				if (operation.signal.aborted) throw new OAuthFlowError("cancelled", "The OAuth login was cancelled");
				candidate.commitStarted = true;
				committingGeneration = candidate.generation;
				try {
					await commit(token, project, operation.signal);
				} finally {
					committingGeneration = void 0;
				}
			} catch (error) {
				if (operation.signal.aborted) throw new OAuthFlowError("cancelled", "The OAuth login was cancelled");
				throw error instanceof OAuthFlowError ? error : new OAuthFlowError("persistence-failed", "The login could not be saved");
			}
			updateStatus(candidate, { phase: "success" });
			return {
				completed: true,
				phase: "success"
			};
		} catch (error) {
			const safe = classifyCompletionError(error, candidate.controller.signal);
			if (safe.code === "cancelled") {
				updateStatus(candidate, {
					phase: "cancelled",
					errorCode: "cancelled"
				});
				return {
					completed: false,
					phase: "cancelled",
					errorCode: "cancelled"
				};
			}
			updateStatus(candidate, {
				phase: "failed",
				errorCode: safe.code
			});
			return {
				completed: false,
				phase: "failed",
				errorCode: safe.code
			};
		} finally {
			operation.cleanup();
			if (processing === candidate) processing = void 0;
		}
	}
	async function handleLoopbackRequest(request) {
		let current;
		try {
			assertCallbackRequest(request);
			const callback = parseCallback(request.url);
			if (callbackInFlight?.state === callback.state) current = callbackInFlight;
			else if (pending?.active && pending.state === callback.state) {
				current = {
					state: callback.state,
					result: completeCallback(request)
				};
				callbackInFlight = current;
			}
			const result = await (current?.result ?? completeCallback(request));
			if (!result.completed && current !== void 0 && callbackInFlight === current) callbackInFlight = void 0;
			if (result.completed) return callbackResponse(200, "success");
			return callbackResponse(result.phase === "cancelled" ? 409 : 400, result.errorCode);
		} catch (error) {
			if (current !== void 0 && callbackInFlight === current) callbackInFlight = void 0;
			const safe = error instanceof OAuthFlowError ? error : new OAuthFlowError("internal", "The callback could not be processed");
			return callbackResponse(callbackStatus(safe.code), safe.code);
		}
	}
	async function expire(candidate) {
		if (pending !== candidate || !candidate.active) return;
		await cancelPending(candidate, "expired");
	}
	async function cancelPending(candidate, phase) {
		if (!candidate.active && pending !== candidate) return;
		candidate.active = false;
		if (pending === candidate) pending = void 0;
		clock.clearTimeout(candidate.timeout);
		candidate.controller.abort(new OAuthFlowError(phase, phase === "expired" ? "The OAuth login expired" : "The OAuth login was cancelled"));
		await closeListener(candidate);
		updateStatus(candidate, {
			phase,
			errorCode: phase
		});
	}
	function updateStatus(candidate, status) {
		if (candidate.generation === generation) currentStatus = status;
	}
	return flow;
}
/** Create the production loopback listener; it never binds a non-loopback address. */
function createNodeLoopbackListenerFactory() {
	return { listen: (handler) => new Promise((resolve, reject) => {
		const server = createServer((request, response) => {
			serveRequest(handler, request, response);
		});
		let settled = false;
		const onError = (error) => {
			if (!settled) {
				settled = true;
				reject(error);
			}
		};
		server.once("error", onError);
		server.listen(ANTIGRAVITY_CALLBACK_PORT, "127.0.0.1", () => {
			settled = true;
			server.removeListener("error", onError);
			resolve({ close: () => new Promise((resolveClose, rejectClose) => {
				if (!server.listening) {
					resolveClose();
					return;
				}
				server.close((error) => error === void 0 ? resolveClose() : rejectClose(error));
			}) });
		});
	}) };
}
/** Build the authorization URL without ever putting the verifier in browser state. */
function buildAuthorizationUrl(state, verifier) {
	const client = directOAuthClientCredentials();
	if (!client) throw new OAuthFlowError("client-not-configured", "Set AGY_CLIENT_ID and AGY_CLIENT_SECRET before using direct OAuth");
	const challenge = createHash("sha256").update(verifier).digest("base64url");
	const url = new URL(AUTHORIZATION_ENDPOINT);
	url.searchParams.set("client_id", client.clientId);
	url.searchParams.set("response_type", "code");
	url.searchParams.set("redirect_uri", ANTIGRAVITY_REDIRECT_URI);
	url.searchParams.set("scope", ANTIGRAVITY_SCOPES.join(" "));
	url.searchParams.set("code_challenge", challenge);
	url.searchParams.set("code_challenge_method", "S256");
	url.searchParams.set("state", state);
	url.searchParams.set("access_type", "offline");
	url.searchParams.set("prompt", "select_account consent");
	return url.toString();
}
/** Decode the email claim from a Google id_token JWT without verifying it. */
function decodeJwtEmail(idToken) {
	const parts = idToken.split(".");
	if (parts.length !== 3) return void 0;
	try {
		const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString("utf8"));
		if (typeof payload === "object" && payload !== null) {
			const email = payload.email;
			return typeof email === "string" && email.length > 0 ? email : void 0;
		}
	} catch {}
}
/** Testable Google token exchange; response bodies are parsed only in Host memory. */
function createGoogleTokenExchanger(fetchImpl, clock = systemClock()) {
	return async ({ code, verifier, signal }) => {
		const client = directOAuthClientCredentials();
		if (!client) throw new OAuthFlowError("client-not-configured", "Set AGY_CLIENT_ID and AGY_CLIENT_SECRET before using direct OAuth");
		const response = await fetchImpl(TOKEN_ENDPOINT, {
			method: "POST",
			headers: {
				Accept: "*/*",
				"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
			},
			body: new URLSearchParams({
				client_id: client.clientId,
				client_secret: client.clientSecret,
				code,
				code_verifier: verifier,
				grant_type: "authorization_code",
				redirect_uri: ANTIGRAVITY_REDIRECT_URI
			}),
			signal
		});
		if (!response.ok) {
			try {
				await response.body?.cancel();
			} catch {}
			throw new OAuthFlowError("token-exchange-failed", "The authorization code could not be exchanged");
		}
		const payload = await readJsonBounded(response, signal);
		if (!isRecord$9(payload) || typeof payload.access_token !== "string" || payload.access_token.length === 0 || typeof payload.refresh_token !== "string" || payload.refresh_token.length === 0) throw new OAuthFlowError("token-exchange-failed", "The token response was not accepted");
		const expiresIn = typeof payload.expires_in === "number" && Number.isFinite(payload.expires_in) && payload.expires_in > 0 ? payload.expires_in : 3600;
		const email = typeof payload.email === "string" ? payload.email : typeof payload.id_token === "string" ? decodeJwtEmail(payload.id_token) : void 0;
		return {
			accessToken: payload.access_token,
			refreshToken: payload.refresh_token,
			expiresAt: clock.now() + expiresIn * 1e3,
			...email === void 0 ? {} : { email }
		};
	};
}
function assertCallbackRequest(request) {
	if (request.method !== "GET") throw new OAuthFlowError("invalid-method", "The OAuth callback method is not accepted");
	if (typeof request.host !== "string" || !isAllowedCallbackHost(request.host)) throw new OAuthFlowError("invalid-host", "The OAuth callback host is not accepted");
	let parsed;
	try {
		parsed = new URL(request.url, `http://${request.host}`);
	} catch {
		throw new OAuthFlowError("invalid-path", "The OAuth callback URL is not accepted");
	}
	if (parsed.protocol !== "http:" || !isAllowedCallbackHost(parsed.host) || parsed.username.length > 0 || parsed.password.length > 0 || parsed.pathname !== "/oauth-callback" || parsed.hash.length > 0) throw new OAuthFlowError("invalid-path", "The OAuth callback path is not accepted");
}
function parseCallback(value) {
	let parsed;
	try {
		parsed = new URL(value, `http://${ANTIGRAVITY_CALLBACK_HOSTS[0]}`);
	} catch {
		throw new OAuthFlowError("invalid-path", "The OAuth callback URL is not accepted");
	}
	const seen = /* @__PURE__ */ new Set();
	for (const [key, paramValue] of parsed.searchParams) {
		if (seen.has(key)) throw new OAuthFlowError("duplicate-parameter", "The OAuth callback contains duplicate parameters");
		if (!safeCallbackValue(key) || !safeCallbackValue(paramValue)) throw new OAuthFlowError("invalid-parameters", "The OAuth callback parameters are not accepted");
		seen.add(key);
	}
	const state = parsed.searchParams.get("state");
	if (state === null || !safeCallbackValue(state)) throw new OAuthFlowError("missing-state", "The OAuth callback state is missing");
	const code = parsed.searchParams.get("code");
	const error = parsed.searchParams.get("error");
	if (error !== null) {
		if (code !== null || !safeCallbackValue(error)) throw new OAuthFlowError("invalid-parameters", "The OAuth callback parameters are not accepted");
		return {
			state,
			error
		};
	}
	if (parsed.searchParams.has("error_description") || parsed.searchParams.has("error_uri")) throw new OAuthFlowError("invalid-parameters", "The OAuth callback parameters are not accepted");
	if (code === null || !safeCallbackValue(code)) throw new OAuthFlowError("missing-code", "The OAuth callback code is missing");
	return {
		state,
		code
	};
}
function isAllowedCallbackHost(value) {
	return ANTIGRAVITY_CALLBACK_HOSTS.includes(value.toLowerCase());
}
function safeCallbackValue(value) {
	return isBoundedSafeText(value, MAX_CALLBACK_VALUE_LENGTH);
}
function randomBytes$1(random, size) {
	const bytes = random(size);
	if (!(bytes instanceof Uint8Array) || bytes.byteLength !== size) throw new OAuthFlowError("internal", "The OAuth random source is unavailable");
	return bytes;
}
function encodeBase64Url(bytes) {
	return Buffer.from(bytes).toString("base64url");
}
function systemClock() {
	return {
		now: () => Date.now(),
		setTimeout: (handler, delayMs) => setTimeout(handler, delayMs),
		clearTimeout: (handle) => clearTimeout(handle)
	};
}
function noPendingError(status) {
	if (status.phase === "expired") return new OAuthFlowError("expired", "The OAuth login expired");
	if (status.phase === "cancelled") return new OAuthFlowError("cancelled", "The OAuth login was cancelled");
	return new OAuthFlowError("no-pending-flow", "There is no pending OAuth login");
}
function asListenerError(error) {
	if (error instanceof OAuthFlowError) return error;
	if (isRecord$9(error) && error.code === "EADDRINUSE") return new OAuthFlowError("port-conflict", "The fixed OAuth callback port is already in use");
	return new OAuthFlowError("internal", "The OAuth callback listener could not start");
}
function classifyCompletionError(error, signal) {
	if (signal.aborted || error instanceof OAuthFlowError && error.code === "cancelled") return new OAuthFlowError("cancelled", "The OAuth login was cancelled");
	if (error instanceof OAuthFlowError) return error;
	return new OAuthFlowError("token-exchange-failed", "The OAuth login could not be completed");
}
function assertToken(value) {
	if (!isRecord$9(value) || typeof value.accessToken !== "string" || value.accessToken.length === 0 || typeof value.refreshToken !== "string" || value.refreshToken.length === 0 || typeof value.expiresAt !== "number" || !Number.isFinite(value.expiresAt)) throw new OAuthFlowError("token-exchange-failed", "The token response was not accepted");
}
function normalizeProject(value) {
	if (!isRecord$9(value)) throw new OAuthFlowError("project-validation-failed", "Project validation failed");
	const projectId = normalizeProjectId(value.projectId);
	if (projectId === void 0) throw new OAuthFlowError("project-validation-failed", "Project validation failed");
	return {
		projectId,
		...typeof value.email === "string" ? { email: value.email } : {}
	};
}
function projectErrorCode(code) {
	if (code === "authentication") return "project-authentication-failed";
	if (code === "forbidden") return "project-forbidden";
	if (code === "rate-limited") return "project-rate-limited";
	if (code === "offline") return "project-offline";
	if (code === "malformed") return "project-malformed";
	return "project-protocol-drift";
}
function projectErrorMessage(code) {
	if (code === "authentication") return "The Antigravity project probe requires authentication";
	if (code === "forbidden") return "The Antigravity project probe was forbidden";
	if (code === "rate-limited") return "The Antigravity project probe is rate-limited";
	if (code === "offline") return "The Antigravity project probe is offline";
	if (code === "malformed") return "The Antigravity project response was malformed";
	if (code === "protocol-drift") return "The Antigravity project protocol changed";
	return "The Antigravity project probe was cancelled";
}
function callbackResponse(status, outcome) {
	const body = outcome === "success" ? "<!doctype html><meta charset=\"utf-8\"><title>Authorization complete</title><p>Authorization complete. You may return to DeepSeek Harness.</p>" : `<!doctype html><meta charset="utf-8"><title>Authorization could not be completed</title><p>Authorization could not be completed. Return to DeepSeek Harness for details.</p><p>Error: ${isLoginErrorCode(outcome) ? outcome : "internal"}</p>`;
	return {
		status,
		headers: EMPTY_RESPONSE_HEADERS,
		body
	};
}
function callbackStatus(code) {
	if (code === "port-conflict") return 409;
	if (code === "internal") return 500;
	return 400;
}
async function serveRequest(handler, request, response) {
	const host = typeof request.headers.host === "string" ? request.headers.host : void 0;
	const result = await handler({
		method: request.method ?? "",
		...host === void 0 ? {} : { host },
		url: request.url ?? ""
	});
	response.writeHead(result.status, result.headers);
	response.end(result.body);
}
async function readJsonBounded(response, signal) {
	if (response.body === null) {
		const text = await response.text();
		if (new TextEncoder().encode(text).byteLength > MAX_TOKEN_RESPONSE_BYTES) throw new OAuthFlowError("token-exchange-failed", "The token response was not accepted");
		try {
			return JSON.parse(text);
		} catch {
			throw new OAuthFlowError("token-exchange-failed", "The token response was not accepted");
		}
	}
	const reader = response.body.getReader();
	const chunks = [];
	let total = 0;
	try {
		while (true) {
			if (signal.aborted) throw new OAuthFlowError("cancelled", "The OAuth login was cancelled");
			const next = await reader.read();
			if (next.done) break;
			total += next.value.byteLength;
			if (total > MAX_TOKEN_RESPONSE_BYTES) throw new OAuthFlowError("token-exchange-failed", "The token response was not accepted");
			chunks.push(next.value);
		}
	} finally {
		try {
			reader.releaseLock();
		} catch {}
	}
	const bytes = new Uint8Array(total);
	let offset = 0;
	for (const chunk of chunks) {
		bytes.set(chunk, offset);
		offset += chunk.byteLength;
	}
	try {
		return JSON.parse(Buffer.from(bytes).toString("utf8"));
	} catch {
		throw new OAuthFlowError("token-exchange-failed", "The token response was not accepted");
	}
}
function combineSignals(primary) {
	const controller = new AbortController();
	const onAbort = () => {
		if (!controller.signal.aborted) controller.abort(primary.reason);
	};
	if (primary.aborted) controller.abort(primary.reason);
	else primary.addEventListener("abort", onAbort, { once: true });
	return {
		signal: controller.signal,
		cleanup: () => primary.removeEventListener("abort", onAbort)
	};
}
function isRecord$9(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
//#endregion
//#region direct/legacy/src/status.ts
const ANTIGRAVITY_PLUGIN_ID = "dsh-antigravity-auth";
const CAPABILITY_ROW_IDS = [
	"auth-llm",
	"search",
	"image",
	"video"
];
const LLM_FAMILY_IDS = [
	"gemini",
	"claude",
	"gpt-oss"
];
const CAPABILITY_GATE_OUTCOMES = [
	"passed",
	"unauthenticated",
	"rate-limited",
	"cancelled",
	"attribution-rejected",
	"protocol-drift",
	"unsupported-video",
	"failed"
];
const CAPABILITY_DEFINITIONS = Object.freeze(CAPABILITY_ROW_IDS.map((id) => Object.freeze({
	id,
	state: "disabled",
	reasonCode: "unauthenticated"
})));
const PROJECT_DISCOVERY_FAILURES = /* @__PURE__ */ new Set([
	"project-unavailable",
	"project-authentication-failed",
	"project-forbidden",
	"project-rate-limited",
	"project-offline",
	"project-malformed",
	"project-protocol-drift"
]);
function createStatusView(riskAcknowledged, login, credential, revoke, gates = {}) {
	return Object.freeze({
		pluginId: ANTIGRAVITY_PLUGIN_ID,
		phase: "bootstrap",
		privateSelfUse: true,
		singleAccount: true,
		riskAcknowledgementRequired: true,
		riskAcknowledged,
		login: Object.freeze({ ...login }),
		...credential === void 0 ? {} : { credential: Object.freeze({ ...credential }) },
		...revoke === void 0 ? {} : { revoke: Object.freeze({ ...revoke }) },
		capabilities: Object.freeze(capabilitiesFor(login, gates).map((capability) => Object.freeze({ ...capability })))
	});
}
function capabilitiesFor(login, gates) {
	if (!login.projectAvailable && (login.configured || login.errorCode !== void 0 && PROJECT_DISCOVERY_FAILURES.has(login.errorCode))) return CAPABILITY_DEFINITIONS.map((capability) => ({
		id: capability.id,
		state: "disabled",
		reasonCode: "project-unavailable"
	}));
	if (!login.projectAvailable) return CAPABILITY_DEFINITIONS;
	if (gates.gate0?.outcome !== "passed") return CAPABILITY_ROW_IDS.map((id) => gate0Status(id, gates.gate0));
	return CAPABILITY_ROW_IDS.map((id) => gateStatus(id, id === "auth-llm" ? llmFamilyResult(gates) : gates.capabilities?.[id]));
}
function llmFamilyResult(gates) {
	const results = LLM_FAMILY_IDS.map((family) => gates.llmFamilies?.[family]);
	const failure = results.find((result) => result !== void 0 && result.outcome !== "passed");
	if (failure !== void 0) return failure;
	if (results.some((result) => result?.outcome !== "passed")) return void 0;
	return results.reduce((latest, result) => latest === void 0 || Date.parse(result.checkedAt) > Date.parse(latest.checkedAt) ? result : latest, void 0);
}
function gate0Status(id, result) {
	if (result?.outcome === "failed" || result?.outcome === "attribution-rejected") return {
		id,
		state: "disabled",
		reasonCode: "gate-0-failed"
	};
	return gateStatus(id, result);
}
function gateStatus(id, result) {
	if (result === void 0) return {
		id,
		state: "poc-pending",
		reasonCode: "gate-not-run"
	};
	if (result.outcome === "passed") return {
		id,
		state: "available",
		reasonCode: "capability-ready"
	};
	if (result.outcome === "protocol-drift") return {
		id,
		state: "protocol-drift",
		reasonCode: "protocol-drift"
	};
	if (result.outcome === "attribution-rejected") return {
		id,
		state: "disabled",
		reasonCode: "gate-0-failed"
	};
	if (result.outcome === "unauthenticated") return {
		id,
		state: "disabled",
		reasonCode: "unauthenticated"
	};
	if (result.outcome === "rate-limited") return {
		id,
		state: "disabled",
		reasonCode: "rate-limited"
	};
	if (result.outcome === "cancelled") return {
		id,
		state: "disabled",
		reasonCode: "cancelled"
	};
	if (result.outcome === "unsupported-video") return {
		id,
		state: "disabled",
		reasonCode: "unsupported-video"
	};
	return {
		id,
		state: "disabled",
		reasonCode: "gate-failed"
	};
}
//#endregion
//#region direct/legacy/src/quota.ts
/** Single-account Antigravity quota normalization and bounded Host service. */
const ANTIGRAVITY_QUOTA_ENDPOINT = `${ANTIGRAVITY_WIRE_ORIGIN}/v1internal:retrieveUserQuotaSummary`;
const QUOTA_REFRESH_MIN_INTERVAL_MS = 3e4;
/** Normalize only validated, display-safe quota facts from a provider response. */
function normalizeQuotaResponse(value, now = Date.now()) {
	const groups = [];
	const sourceValue = isRecord$8(value) && isRecord$8(value.response) ? value.response : value;
	const source = isRecord$8(sourceValue) ? sourceValue : void 0;
	const candidates = source === void 0 ? [] : [
		...Array.isArray(source.groups) ? source.groups : [],
		...Array.isArray(source.buckets) ? source.buckets : [],
		...Array.isArray(source.quotaBuckets) ? source.quotaBuckets : [],
		...Array.isArray(source.quota_buckets) ? source.quota_buckets : [],
		...Array.isArray(source.userQuotaSummary) ? source.userQuotaSummary : [],
		...Array.isArray(source.quotas) ? source.quotas : []
	];
	for (const candidate of candidates) {
		if (!isRecord$8(candidate)) continue;
		const buckets = Array.isArray(candidate.buckets) ? candidate.buckets : Array.isArray(candidate.quotaBuckets) ? candidate.quotaBuckets : Array.isArray(candidate.windows) ? candidate.windows : [candidate];
		for (const rawBucket of buckets) {
			if (!isRecord$8(rawBucket)) continue;
			const window = identifyWindow(rawBucket);
			const resetTime = normalizeResetTime(rawBucket.resetTime ?? rawBucket.reset_time ?? rawBucket.resetAt ?? rawBucket.reset_at, now);
			const fraction = normalizeFraction(rawBucket.remainingFraction ?? rawBucket.remaining_fraction ?? rawBucket.fraction ?? rawBucket.remaining ?? rawBucket.remaining_percent ?? rawBucket.percentage);
			if (window === void 0 || resetTime === void 0 || fraction === void 0) continue;
			const group = identifyGroup(candidate, rawBucket);
			if (group === void 0) continue;
			const modelCount = boundedCount(candidate.modelCount ?? candidate.model_count ?? candidate.models ?? descriptionModelCount(candidate.description));
			const existing = groups.find((item) => item.group === group);
			if (existing === void 0) groups.push({
				group,
				modelCount,
				windows: [{
					window,
					remainingFraction: fraction,
					resetTime
				}]
			});
			else if (!existing.windows.some((item) => item.window === window)) {
				const updated = {
					group,
					modelCount: Math.max(existing.modelCount, modelCount),
					windows: [...existing.windows, {
						window,
						remainingFraction: fraction,
						resetTime
					}].sort(windowOrder)
				};
				groups.splice(groups.indexOf(existing), 1, updated);
			} else {
				const updatedWindows = existing.windows.map((item) => item.window === window ? {
					window,
					remainingFraction: Math.min(item.remainingFraction, fraction),
					resetTime: item.resetTime
				} : item);
				const updated = {
					group,
					modelCount: Math.max(existing.modelCount, modelCount),
					windows: updatedWindows.sort(windowOrder)
				};
				groups.splice(groups.indexOf(existing), 1, updated);
			}
		}
	}
	if (groups.length === 0) {
		if (isRecord$8(source)) return {
			state: "available",
			checkedAt: new Date(now).toISOString(),
			groups: []
		};
		throw new QuotaNormalizationError("The quota response did not contain recognized windows");
	}
	return {
		state: "available",
		checkedAt: new Date(now).toISOString(),
		groups: groups.sort((left, right) => left.group.localeCompare(right.group))
	};
}
var QuotaNormalizationError = class extends Error {
	constructor(message) {
		super(message);
		this.name = "QuotaNormalizationError";
	}
};
function createQuotaService(options) {
	const now = options.now ?? (() => Date.now());
	const minInterval = positive$1(options.minIntervalMs, QUOTA_REFRESH_MIN_INTERVAL_MS);
	const transport = options.transport ?? createPrivateTransport({
		...options.transportOptions?.responseHeaderTimeoutMs === void 0 ? {} : { responseHeaderTimeoutMs: options.transportOptions.responseHeaderTimeoutMs },
		...options.transportOptions?.maxRequestBytes === void 0 ? {} : { maxRequestBytes: options.transportOptions.maxRequestBytes }
	});
	let current = { state: "unauthenticated" };
	let checkedAt = 0;
	let inFlight;
	let inFlightAbort;
	const lifecycleController = new AbortController();
	let disposed = false;
	return {
		refresh: async (signal, force = false) => {
			if (disposed) return current;
			if (!force && checkedAt > 0 && now() - checkedAt < minInterval) return current;
			if (inFlight !== void 0) return await waitForCaller(inFlight, signal);
			const combined = mergeAbortSignals(void 0, lifecycleController.signal);
			inFlightAbort = combined.dispose;
			inFlight = refreshQuota(options.auth, transport, combined.signal, now).then((value) => {
				current = value;
				checkedAt = now();
				return value;
			}).catch((error) => {
				current = mapQuotaError(error, now());
				checkedAt = now();
				return current;
			}).finally(() => {
				combined.dispose();
				inFlightAbort = void 0;
				inFlight = void 0;
			});
			return await waitForCaller(inFlight, signal);
		},
		status: () => current,
		dispose: async () => {
			disposed = true;
			lifecycleController.abort();
			inFlightAbort?.();
			await inFlight?.catch(() => {});
		}
	};
}
async function refreshQuota(auth, transport, signal, now) {
	const credential = await auth.credential(signal);
	if (credential === void 0) return { state: "unauthenticated" };
	const body = credential.projectId ? { project: credential.projectId } : {};
	const response = await transport.request({
		url: ANTIGRAVITY_QUOTA_ENDPOINT,
		accessToken: credential.accessToken,
		body: JSON.stringify(body),
		...signal === void 0 ? {} : { signal }
	});
	const statusError = privateStatusError(response.status);
	if (statusError !== void 0) {
		await response.body?.cancel().catch(() => {});
		throw statusError;
	}
	let value;
	try {
		value = JSON.parse(await readPrivateText(response, {
			...signal === void 0 ? {} : { signal },
			maxBytes: DEFAULT_PRIVATE_RESPONSE_BYTES
		}));
	} catch (error) {
		if (error instanceof PrivateTransportError) throw error;
		throw new QuotaNormalizationError("The quota response was not valid JSON");
	}
	return normalizeQuotaResponse(value, now());
}
const QUOTA_FAILURE_STATES = {
	authentication: "unauthenticated",
	forbidden: "forbidden",
	"rate-limited": "rate-limited",
	cancelled: "offline",
	timeout: "timeout",
	"attribution-rejected": "protocol-drift",
	"protocol-drift": "protocol-drift",
	"response-limit": "protocol-drift",
	"request-limit": "protocol-drift",
	upstream: "offline",
	network: "offline",
	failed: "offline"
};
function mapQuotaError(error, checkedAt) {
	return {
		state: error instanceof PrivateTransportError ? QUOTA_FAILURE_STATES[classifyPrivateFailure(error)] : error instanceof QuotaNormalizationError ? "protocol-drift" : "offline",
		checkedAt: new Date(checkedAt).toISOString()
	};
}
function identifyWindow(value) {
	const raw = String(value.window ?? value.windowType ?? value.window_type ?? value.bucketId ?? value.bucket_id ?? "").toLowerCase();
	if (raw.includes("5h") || raw.includes("5-hour") || raw.includes("five")) return "5h";
	if (raw.includes("week") || raw.includes("weekly") || raw.includes("7d")) return "weekly";
	const seconds = numberValue$1(value.durationSeconds ?? value.duration_seconds);
	if (seconds !== void 0) {
		if (seconds <= 18e3) return "5h";
		if (seconds <= 691200) return "weekly";
	}
}
function identifyGroup(candidate, bucket) {
	const raw = [
		candidate.displayName,
		candidate.group,
		candidate.quotaGroup,
		candidate.quota_group,
		candidate.modelFamily,
		candidate.title,
		candidate.name,
		candidate.description,
		bucket?.bucketId,
		bucket?.bucket_id,
		bucket?.displayName
	].filter(Boolean).map(String).join(" ").toLowerCase();
	if (raw.includes("3p") || raw.includes("non") || raw.includes("claude") || raw.includes("gpt") || raw.includes("openai") || raw.includes("anthropic") || raw.includes("third-party") || raw.includes("external")) return "non-gemini";
	if (raw.includes("gemini") || raw.includes("google") || raw.includes("chat") || raw.includes("code") || raw.includes("default") || raw.length === 0) return "gemini";
	return "gemini";
}
function normalizeFraction(value) {
	const number = numberValue$1(value);
	if (number === void 0) return void 0;
	if (number >= 0 && number <= 1) return number;
	if (number <= 100) return number / 100;
}
function normalizeResetTime(value, now) {
	const parsed = typeof value === "number" ? value < 1e10 ? value * 1e3 : value : typeof value === "string" ? Date.parse(value) : NaN;
	if (!Number.isFinite(parsed) || parsed < 0 || parsed > 0x5af3107a4000) return void 0;
	const iso = new Date(parsed).toISOString();
	return Number.isFinite(Date.parse(iso)) && parsed >= now - 31536e6 ? iso : void 0;
}
function boundedCount(value) {
	if (Array.isArray(value)) return Math.min(value.length, 1e4);
	const number = numberValue$1(value);
	return number === void 0 ? 0 : Math.min(Math.floor(number), 1e4);
}
function descriptionModelCount(value) {
	if (typeof value !== "string" || value.length === 0 || value.length > 16384) return 0;
	if (!/^[^:]{1,256}:\s*/u.test(value)) return 0;
	const payload = value.replace(/^[^:]{1,256}:\s*/u, "");
	return Math.min(payload.split(",").map((item) => item.trim()).filter((item) => item.length > 0).length, 1e4);
}
function windowOrder(left, right) {
	return left.window === right.window ? 0 : left.window === "5h" ? -1 : 1;
}
function positive$1(value, fallback) {
	return value === void 0 || !Number.isFinite(value) || value <= 0 ? fallback : Math.min(Math.floor(value), 864e5);
}
function numberValue$1(value) {
	return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : void 0;
}
async function waitForCaller(promise, signal) {
	if (signal === void 0) return await promise;
	if (signal.aborted) throw new PrivateTransportError("cancelled", "The quota request was cancelled", { accepted: false });
	let remove;
	const cancellation = new Promise((_, reject) => {
		const abort = () => reject(new PrivateTransportError("cancelled", "The quota request was cancelled", { accepted: false }));
		remove = () => signal.removeEventListener("abort", abort);
		signal.addEventListener("abort", abort, { once: true });
	});
	try {
		return await Promise.race([promise, cancellation]);
	} finally {
		remove?.();
	}
}
function mergeAbortSignals(first, second) {
	const controller = new AbortController();
	const abort = (event) => {
		if (!controller.signal.aborted) controller.abort(event.target.reason);
	};
	const signals = first === void 0 ? [second] : [first, second];
	for (const signal of signals) if (signal.aborted) controller.abort(signal.reason);
	else signal.addEventListener("abort", abort, { once: true });
	return {
		signal: controller.signal,
		dispose: () => {
			for (const signal of signals) signal.removeEventListener("abort", abort);
		}
	};
}
function isRecord$8(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
//#endregion
//#region direct/legacy/src/capability-gates.ts
/** Value-free live-gate evidence used to keep capability registration honest. */
const GATE_FILE_VERSION = 2;
const MAX_GATE_FILE_BYTES = 65536;
const PERSISTED_CAPABILITY_IDS = CAPABILITY_ROW_IDS.filter((id) => id !== "auth-llm");
/** Resolve a gate record next to the plugin-owned auth record without reading either. */
function defaultCapabilityGatePath(authStorePath) {
	return join(dirname(authStorePath), "gates.json");
}
function createMemoryCapabilityGates(initial = {}, now = () => Date.now()) {
	let current = cloneEvidence(initial);
	return {
		read: async () => cloneEvidence(current),
		recordGate0: async (subject, outcome) => {
			current = {
				subject: checkedSubject(subject),
				gate0: result(outcome, now)
			};
			return cloneEvidence(current);
		},
		recordLlmFamily: async (subject, family, outcome) => {
			current = evidenceForSubject(current, subject);
			current = {
				...current,
				llmFamilies: {
					...current.llmFamilies,
					[family]: result(outcome, now)
				}
			};
			return cloneEvidence(current);
		},
		recordCapability: async (subject, id, outcome) => {
			current = evidenceForSubject(current, subject);
			current = {
				...current,
				capabilities: {
					...current.capabilities,
					[id]: result(outcome, now)
				}
			};
			return cloneEvidence(current);
		},
		clear: async (expectedSubject) => {
			if (expectedSubject === void 0 || current.subject === expectedSubject) current = {};
		}
	};
}
function createFileCapabilityGates(path, options = {}) {
	const now = options.now ?? (() => Date.now());
	const platform = options.platform ?? process.platform;
	let mutation = Promise.resolve();
	const read = async () => {
		let text;
		try {
			const [file, directory] = await Promise.all([lstat(path), lstat(dirname(path))]);
			const unsafePosixMode = platform !== "win32" && ((file.mode & 63) !== 0 || (directory.mode & 63) !== 0);
			if (file.isSymbolicLink() || !file.isFile() || directory.isSymbolicLink() || !directory.isDirectory() || file.size > MAX_GATE_FILE_BYTES || unsafePosixMode) throw new Error("unsafe gate record");
			text = await readFile(path, "utf8");
			if (text.length > MAX_GATE_FILE_BYTES) throw new Error("oversized gate record");
		} catch (error) {
			if (error.code === "ENOENT") return {};
			throw new Error("The Antigravity capability gate record could not be read");
		}
		let value;
		try {
			value = JSON.parse(text);
		} catch {
			throw new Error("The Antigravity capability gate record is malformed");
		}
		return parseFile(value);
	};
	const update = async (mutate) => {
		let output = {};
		const operation = mutation.then(async () => {
			output = mutate(await read());
			await writeEvidence(path, output);
		});
		mutation = operation.catch(() => {});
		await operation;
		return cloneEvidence(output);
	};
	return {
		read,
		recordGate0: (subject, outcome) => update(() => ({
			subject: checkedSubject(subject),
			gate0: result(outcome, now)
		})),
		recordLlmFamily: (subject, family, outcome) => update((current) => {
			const owned = evidenceForSubject(current, subject);
			return {
				...owned,
				llmFamilies: {
					...owned.llmFamilies,
					[family]: result(outcome, now)
				}
			};
		}),
		recordCapability: (subject, id, outcome) => update((current) => {
			const owned = evidenceForSubject(current, subject);
			return {
				...owned,
				capabilities: {
					...owned.capabilities,
					[id]: result(outcome, now)
				}
			};
		}),
		clear: async (expectedSubject) => {
			const operation = mutation.then(async () => {
				if (expectedSubject === void 0 || (await read()).subject === expectedSubject) await rm(path, { force: true });
			});
			mutation = operation.catch(() => {});
			await operation;
		}
	};
}
async function writeEvidence(path, evidence) {
	const directory = dirname(path);
	await mkdir(directory, {
		recursive: true,
		mode: 448
	});
	await chmod(directory, 448);
	const temporary = `${path}.${process.pid}.${Date.now()}.tmp`;
	const encoded = `${JSON.stringify({
		version: GATE_FILE_VERSION,
		...evidence
	})}\n`;
	try {
		await writeFile(temporary, encoded, {
			encoding: "utf8",
			mode: 384,
			flag: "wx"
		});
		await rename(temporary, path);
		await chmod(path, 384);
	} finally {
		await rm(temporary, { force: true }).catch(() => {});
	}
}
function parseFile(value) {
	if (!isRecord$7(value) || value.version !== GATE_FILE_VERSION) throw new Error("The Antigravity capability gate record is malformed");
	if (Object.keys(value).some((key) => ![
		"version",
		"subject",
		"gate0",
		"llmFamilies",
		"capabilities"
	].includes(key))) throw new Error("The Antigravity capability gate record is malformed");
	if (typeof value.subject !== "string" || !isBoundedSafeText(value.subject, 128)) throw new Error("The Antigravity capability gate record is malformed");
	const gate0 = value.gate0 === void 0 ? void 0 : parseResult(value.gate0);
	const llmFamilies = value.llmFamilies === void 0 ? void 0 : parseLlmFamilies(value.llmFamilies);
	const capabilities = value.capabilities === void 0 ? void 0 : parseCapabilities(value.capabilities);
	return {
		subject: value.subject,
		...gate0 === void 0 ? {} : { gate0 },
		...llmFamilies === void 0 ? {} : { llmFamilies },
		...capabilities === void 0 ? {} : { capabilities }
	};
}
function parseLlmFamilies(value) {
	if (!isRecord$7(value) || Object.keys(value).some((key) => !LLM_FAMILY_IDS.includes(key))) throw new Error("The Antigravity capability gate record is malformed");
	const output = {};
	for (const family of LLM_FAMILY_IDS) if (value[family] !== void 0) output[family] = parseResult(value[family]);
	return output;
}
function parseCapabilities(value) {
	if (!isRecord$7(value) || Object.keys(value).some((key) => !PERSISTED_CAPABILITY_IDS.includes(key))) throw new Error("The Antigravity capability gate record is malformed");
	const output = {};
	for (const id of PERSISTED_CAPABILITY_IDS) if (value[id] !== void 0) output[id] = parseResult(value[id]);
	return output;
}
function parseResult(value) {
	if (!isRecord$7(value) || Object.keys(value).length !== 2 || !Object.prototype.hasOwnProperty.call(value, "outcome") || !Object.prototype.hasOwnProperty.call(value, "checkedAt") || typeof value.outcome !== "string" || !CAPABILITY_GATE_OUTCOMES.includes(value.outcome) || typeof value.checkedAt !== "string" || value.checkedAt.length > 64 || !Number.isFinite(Date.parse(value.checkedAt))) throw new Error("The Antigravity capability gate record is malformed");
	return {
		outcome: value.outcome,
		checkedAt: value.checkedAt
	};
}
function result(outcome, now) {
	if (!CAPABILITY_GATE_OUTCOMES.includes(outcome)) throw new Error("The Antigravity capability gate outcome is invalid");
	const timestamp = now();
	if (!Number.isFinite(timestamp)) throw new Error("The Antigravity capability gate clock is invalid");
	return {
		outcome,
		checkedAt: new Date(timestamp).toISOString()
	};
}
function checkedSubject(subject) {
	if (!isBoundedSafeText(subject, 128)) throw new Error("The Antigravity capability gate subject is invalid");
	return subject;
}
function evidenceForSubject(current, subject) {
	const checked = checkedSubject(subject);
	return current.subject === checked ? current : { subject: checked };
}
function cloneEvidence(value) {
	return {
		...value.subject === void 0 ? {} : { subject: value.subject },
		...value.gate0 === void 0 ? {} : { gate0: { ...value.gate0 } },
		...value.llmFamilies === void 0 ? {} : { llmFamilies: Object.fromEntries(Object.entries(value.llmFamilies).map(([id, entry]) => [id, entry === void 0 ? void 0 : { ...entry }])) },
		...value.capabilities === void 0 ? {} : { capabilities: Object.fromEntries(Object.entries(value.capabilities).map(([id, entry]) => [id, entry === void 0 ? void 0 : { ...entry }])) }
	};
}
function isRecord$7(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
/** Resolve the companion accounts.json path next to auth.json. */
function defaultAccountStorePath(authStorePath) {
	return join(dirname(authStorePath), "accounts.json");
}
function normalizeKey(str) {
	return str.trim().toLowerCase();
}
/** Generate a guaranteed unique account ID that never collides with deleted or existing accounts. */
function nextAccountId(accounts) {
	const existing = new Set(accounts.map((a) => a.id));
	let max = 0;
	for (const a of accounts) {
		const match = /^acc_(\d+)$/.exec(a.id);
		if (match?.[1]) {
			const num = Number(match[1]);
			if (Number.isSafeInteger(num) && num > max) max = num;
		}
	}
	let candidate = `acc_${max + 1}`;
	while (existing.has(candidate)) {
		max += 1;
		candidate = `acc_${max + 1}`;
	}
	return candidate;
}
/** Match an account by 1-based index, id, or email (exact or prefix). */
function findMatchingAccount(accounts, query) {
	const trimmed = query.trim();
	if (trimmed.length === 0) return void 0;
	const num = Number(trimmed);
	if (Number.isSafeInteger(num) && num >= 1 && num <= accounts.length) {
		const acc = accounts[num - 1];
		if (acc !== void 0) return {
			account: acc,
			index: num
		};
	}
	const needle = normalizeKey(trimmed);
	const byIdIndex = accounts.findIndex((a) => normalizeKey(a.id) === needle);
	if (byIdIndex >= 0) {
		const acc = accounts[byIdIndex];
		if (acc !== void 0) return {
			account: acc,
			index: byIdIndex + 1
		};
	}
	const byEmailIndex = accounts.findIndex((a) => a.email !== void 0 && normalizeKey(a.email) === needle);
	if (byEmailIndex >= 0) {
		const acc = accounts[byEmailIndex];
		if (acc !== void 0) return {
			account: acc,
			index: byEmailIndex + 1
		};
	}
	const byFuzzyIndex = accounts.findIndex((a) => {
		if (a.email !== void 0 && normalizeKey(a.email).includes(needle)) return true;
		if (a.maskedEmail !== void 0 && normalizeKey(a.maskedEmail).includes(needle)) return true;
		return false;
	});
	if (byFuzzyIndex >= 0) {
		const acc = accounts[byFuzzyIndex];
		if (acc !== void 0) return {
			account: acc,
			index: byFuzzyIndex + 1
		};
	}
}
function applyBoundRefreshToken(accounts, update) {
	const index = accounts.findIndex((account) => account.id === update.accountId);
	if (index < 0) return void 0;
	const existing = accounts[index];
	if (existing === void 0) return void 0;
	if (update.previousRefreshToken !== void 0 && existing.refreshToken !== update.previousRefreshToken) return void 0;
	if (update.lineage !== void 0 && existing.lineage !== void 0 && existing.lineage !== update.lineage) return;
	const next = [...accounts];
	next[index] = {
		...existing,
		refreshToken: update.refreshToken,
		updatedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
	return next;
}
function sameCachedCredential(current, expected) {
	return current.id === expected.id && current.lineage === expected.lineage && current.refreshToken === expected.refreshToken && current.projectId === expected.projectId;
}
/** Keep each read/compare/write in one queue, including first-read seeding. */
function serializeStore(store) {
	let pending = Promise.resolve();
	const enqueue = (operation) => {
		const result = pending.then(operation);
		pending = result.then(() => {}, () => {});
		return result;
	};
	return {
		path: store.path,
		read: () => enqueue(() => store.read()),
		saveAccount: (draft) => enqueue(() => store.saveAccount(draft)),
		setActive: (query) => enqueue(() => store.setActive(query)),
		removeAccount: (query, expected) => enqueue(() => store.removeAccount(query, expected)),
		syncRefreshToken: (update) => enqueue(() => store.syncRefreshToken(update)),
		list: () => enqueue(() => store.list())
	};
}
/** Create the multi-account store managing accounts.json. */
function createAccountStore(accountsPath, authStorePath, options = {}) {
	const platform = options.platform ?? process.platform;
	async function readRaw() {
		try {
			const text = await readFile(accountsPath, "utf8");
			const parsed = JSON.parse(text);
			if (typeof parsed === "object" && parsed !== null && parsed.version === 1 && Array.isArray(parsed.accounts)) {
				const rawAccounts = parsed.accounts;
				const accounts = [];
				const seenIds = /* @__PURE__ */ new Set();
				for (const item of rawAccounts) if (typeof item === "object" && item !== null) {
					const rec = item;
					if (typeof rec.id === "string" && typeof rec.projectId === "string" && typeof rec.refreshToken === "string") {
						let id = rec.id;
						if (seenIds.has(id)) id = nextAccountId(accounts);
						seenIds.add(id);
						accounts.push({
							id,
							email: typeof rec.email === "string" ? rec.email : void 0,
							maskedEmail: typeof rec.maskedEmail === "string" ? rec.maskedEmail : maskEmail(typeof rec.email === "string" ? rec.email : void 0),
							projectId: rec.projectId,
							refreshToken: rec.refreshToken,
							updatedAt: typeof rec.updatedAt === "string" ? rec.updatedAt : (/* @__PURE__ */ new Date()).toISOString(),
							lineage: typeof rec.lineage === "string" ? rec.lineage : void 0
						});
					}
				}
				const activeValue = parsed.activeId;
				return {
					version: 1,
					activeId: typeof activeValue === "string" && accounts.some((account) => account.id === activeValue) ? activeValue : void 0,
					accounts
				};
			}
		} catch {}
		try {
			const authText = await readFile(authStorePath, "utf8");
			const authRecord = JSON.parse(authText);
			if (typeof authRecord === "object" && authRecord !== null && typeof authRecord.refreshToken === "string" && typeof authRecord.projectId === "string") {
				const email = typeof authRecord.email === "string" ? authRecord.email : void 0;
				const initialAccount = {
					id: "acc_1",
					email,
					maskedEmail: maskEmail(email),
					projectId: authRecord.projectId,
					refreshToken: authRecord.refreshToken,
					updatedAt: typeof authRecord.updatedAt === "string" ? authRecord.updatedAt : (/* @__PURE__ */ new Date()).toISOString(),
					lineage: typeof authRecord.lineage === "string" ? authRecord.lineage : void 0
				};
				const seeded = {
					version: 1,
					activeId: initialAccount.id,
					accounts: [initialAccount]
				};
				await writeRaw(seeded);
				return seeded;
			}
		} catch {}
		return {
			version: 1,
			activeId: void 0,
			accounts: []
		};
	}
	async function writeRaw(data) {
		const dir = dirname(accountsPath);
		await mkdir(dir, {
			recursive: true,
			mode: 448
		});
		const tempPath = `${accountsPath}.${Date.now()}.${Math.random().toString(36).slice(2, 8)}.tmp`;
		await writeFile(tempPath, JSON.stringify({
			...data,
			activeId: data.activeId ?? null
		}, null, 2), {
			encoding: "utf8",
			mode: 384
		});
		if (platform !== "win32") try {
			await chmod(tempPath, 384);
		} catch {}
		await rename(tempPath, accountsPath);
	}
	return serializeStore({
		path: accountsPath,
		read: readRaw,
		saveAccount: async (draft) => {
			const accounts = [...(await readRaw()).accounts];
			const email = draft.email;
			const masked = maskEmail(email);
			let existingIndex = draft.id === void 0 ? -1 : accounts.findIndex((a) => a.id === draft.id);
			if (existingIndex < 0 && email !== void 0 && email.trim().length > 0) existingIndex = accounts.findIndex((a) => a.email !== void 0 && normalizeKey(a.email) === normalizeKey(email));
			if (existingIndex < 0) existingIndex = accounts.findIndex((a) => a.refreshToken === draft.refreshToken);
			let accountId;
			let isNew = false;
			if (existingIndex >= 0) {
				const existing = accounts[existingIndex];
				accountId = existing.id;
				accounts[existingIndex] = {
					...existing,
					email: email ?? existing.email,
					maskedEmail: masked ?? existing.maskedEmail,
					projectId: draft.projectId,
					refreshToken: draft.refreshToken,
					updatedAt: draft.updatedAt ?? (/* @__PURE__ */ new Date()).toISOString(),
					lineage: draft.lineage ?? existing.lineage
				};
			} else {
				isNew = true;
				accountId = draft.id ?? nextAccountId(accounts);
				accounts.push({
					id: accountId,
					email,
					maskedEmail: masked,
					projectId: draft.projectId,
					refreshToken: draft.refreshToken,
					updatedAt: draft.updatedAt ?? (/* @__PURE__ */ new Date()).toISOString(),
					lineage: draft.lineage
				});
			}
			await writeRaw({
				version: 1,
				activeId: accountId,
				accounts
			});
			const savedAccount = accounts.find((a) => a.id === accountId);
			return {
				activeId: accountId,
				account: savedAccount,
				isNew
			};
		},
		setActive: async (idOrEmailOrIndex) => {
			const current = await readRaw();
			const match = findMatchingAccount(current.accounts, idOrEmailOrIndex);
			if (match === void 0) return void 0;
			await writeRaw({
				...current,
				activeId: match.account.id
			});
			return match.account;
		},
		removeAccount: async (idOrEmailOrIndex, expected) => {
			const current = await readRaw();
			const match = findMatchingAccount(current.accounts, idOrEmailOrIndex);
			if (match === void 0) return void 0;
			if (expected !== void 0 && !sameCachedCredential(match.account, expected)) return void 0;
			const remaining = current.accounts.filter((a) => a.id !== match.account.id);
			let activeId = current.activeId;
			if (activeId === match.account.id) activeId = void 0;
			await writeRaw({
				version: 1,
				activeId,
				accounts: remaining
			});
			return match.account;
		},
		syncRefreshToken: async (update) => {
			const current = await readRaw();
			const accounts = applyBoundRefreshToken(current.accounts, update);
			if (accounts === void 0) return false;
			await writeRaw({
				...current,
				accounts
			});
			return true;
		},
		list: async () => {
			const current = await readRaw();
			return {
				activeId: current.activeId,
				accounts: current.accounts.map((acc, index) => ({
					...acc,
					index: index + 1,
					isActive: acc.id === current.activeId
				}))
			};
		}
	});
}
/** In-memory account store for tests and in-memory auth compositions. */
function createMemoryAccountStore(authStore) {
	let data = {
		version: 1,
		activeId: void 0,
		accounts: []
	};
	let seeded = false;
	async function ensureSeeded() {
		if (seeded || authStore === void 0 || data.accounts.length > 0) return;
		seeded = true;
		try {
			const auth = await authStore.read();
			if (auth !== void 0 && typeof auth.refreshToken === "string" && typeof auth.projectId === "string") {
				const initialAccount = {
					id: "acc_1",
					email: auth.email,
					maskedEmail: maskEmail(auth.email),
					projectId: auth.projectId,
					refreshToken: auth.refreshToken,
					updatedAt: auth.updatedAt ?? (/* @__PURE__ */ new Date()).toISOString(),
					lineage: auth.lineage
				};
				data = {
					version: 1,
					activeId: initialAccount.id,
					accounts: [initialAccount]
				};
			}
		} catch {}
	}
	return serializeStore({
		path: ":memory:",
		read: async () => {
			await ensureSeeded();
			return data;
		},
		saveAccount: async (draft) => {
			await ensureSeeded();
			const accounts = [...data.accounts];
			let existingIndex = draft.id === void 0 ? -1 : accounts.findIndex((a) => a.id === draft.id);
			if (existingIndex < 0 && draft.email !== void 0 && draft.email.trim().length > 0) existingIndex = accounts.findIndex((a) => a.email !== void 0 && normalizeKey(a.email) === normalizeKey(draft.email));
			if (existingIndex < 0) existingIndex = accounts.findIndex((a) => a.refreshToken === draft.refreshToken);
			let accountId;
			let isNew = false;
			if (existingIndex >= 0) {
				const existing = accounts[existingIndex];
				accountId = existing.id;
				const masked = maskEmail(draft.email);
				accounts[existingIndex] = {
					...existing,
					...draft.email === void 0 ? {} : { email: draft.email },
					...masked === void 0 ? {} : { maskedEmail: masked },
					projectId: draft.projectId,
					refreshToken: draft.refreshToken,
					updatedAt: draft.updatedAt ?? (/* @__PURE__ */ new Date()).toISOString(),
					...draft.lineage === void 0 ? {} : { lineage: draft.lineage }
				};
			} else {
				isNew = true;
				accountId = draft.id ?? nextAccountId(accounts);
				accounts.push({
					id: accountId,
					...draft.email === void 0 ? {} : { email: draft.email },
					...maskEmail(draft.email) === void 0 ? {} : { maskedEmail: maskEmail(draft.email) },
					projectId: draft.projectId,
					refreshToken: draft.refreshToken,
					updatedAt: draft.updatedAt ?? (/* @__PURE__ */ new Date()).toISOString(),
					...draft.lineage === void 0 ? {} : { lineage: draft.lineage }
				});
			}
			data = {
				version: 1,
				activeId: accountId,
				accounts
			};
			return {
				activeId: accountId,
				account: accounts.find((a) => a.id === accountId),
				isNew
			};
		},
		setActive: async (query) => {
			await ensureSeeded();
			const match = findMatchingAccount(data.accounts, query);
			if (match === void 0) return void 0;
			data = {
				...data,
				activeId: match.account.id
			};
			return match.account;
		},
		removeAccount: async (query, expected) => {
			await ensureSeeded();
			const match = findMatchingAccount(data.accounts, query);
			if (match === void 0) return void 0;
			if (expected !== void 0 && !sameCachedCredential(match.account, expected)) return void 0;
			const remaining = data.accounts.filter((a) => a.id !== match.account.id);
			data = {
				version: 1,
				activeId: data.activeId === match.account.id ? void 0 : data.activeId,
				accounts: remaining
			};
			return match.account;
		},
		syncRefreshToken: async (update) => {
			await ensureSeeded();
			const accounts = applyBoundRefreshToken(data.accounts, update);
			if (accounts === void 0) return false;
			data = {
				...data,
				accounts
			};
			return true;
		},
		list: async () => {
			await ensureSeeded();
			return {
				activeId: data.activeId,
				accounts: data.accounts.map((acc, index) => ({
					...acc,
					index: index + 1,
					isActive: acc.id === data.activeId
				}))
			};
		}
	});
}
//#endregion
//#region direct/legacy/src/auth-service.ts
const USERINFO_ENDPOINT = "https://www.googleapis.com/oauth2/v3/userinfo";
/**
* Fetch the account email through the Google userinfo endpoint. Antigravity
* requests `userinfo.email` but not `openid`, so the token exchange never
* carries an `id_token`; userinfo is the only email source for this flow.
* @param accessToken - live bearer token for the current account.
* @returns the raw email, or undefined when the probe cannot answer.
*/
async function fetchUserEmail(accessToken, fetchImpl = fetch) {
	const response = await fetchImpl(USERINFO_ENDPOINT, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			Accept: "application/json"
		},
		signal: AbortSignal.timeout(1e4)
	});
	if (!response.ok) return void 0;
	const text = await response.text();
	if (text.length > 65536) return void 0;
	const payload = JSON.parse(text);
	if (typeof payload !== "object" || payload === null) return void 0;
	const email = payload.email;
	return typeof email === "string" && email.includes("@") ? email : void 0;
}
var AntigravityAuthService = class {
	store;
	credentials;
	flow;
	quota;
	gates;
	autoActivate;
	accountStore;
	fetchEmail;
	emailBackfillAttempted = false;
	riskAcknowledged = false;
	activeFlowGeneration = 0;
	disposed = false;
	statusListeners = /* @__PURE__ */ new Set();
	constructor(options = {}) {
		this.autoActivate = options.autoActivateGates ?? false;
		this.fetchEmail = options.fetchEmail;
		const storePath = options.storePath ?? defaultAuthStorePath();
		this.store = options.store ?? createAuthStore(storePath);
		this.accountStore = options.accountStore ?? (options.store !== void 0 && options.storePath === void 0 ? createMemoryAccountStore(this.store) : createAccountStore(defaultAccountStorePath(storePath), storePath));
		this.gates = options.gates ?? (options.gatePath !== void 0 ? createFileCapabilityGates(options.gatePath) : options.store === void 0 ? createFileCapabilityGates(defaultCapabilityGatePath(storePath)) : createMemoryCapabilityGates());
		this.credentials = createCredentialCoordinator({
			...options.credentialOptions,
			store: this.store,
			onTokenRotated: async (record, previous) => {
				const target = await this.accountForRecord(previous);
				if (target === void 0) return;
				await this.accountStore.syncRefreshToken({
					accountId: target.id,
					refreshToken: record.refreshToken,
					previousRefreshToken: previous.refreshToken,
					...target.lineage === void 0 ? {} : { lineage: target.lineage }
				});
			}
		});
		this.quota = createQuotaService({
			...options.quotaOptions,
			auth: this.credentials
		});
		const projectDiscovery = createProjectDiscovery(options.projectOptions);
		this.flow = createOAuthFlow({
			...options.flowOptions,
			validateProject: (accessToken, signal) => projectDiscovery.discover(accessToken, signal),
			commit: (token, project, signal) => this.commitCredential(token, project, signal)
		});
	}
	async listAccounts(options = {}) {
		if (options.backfill !== false) await this.backfillActiveAccountEmail();
		return await this.accountStore.list();
	}
	/**
	* Backfill the active account's email through the injected fetcher, once per
	* process. Accounts saved before the email probe existed (or seeded from an
	* email-less auth.json) stay usable without it; the fetcher failure only
	* leaves the email unset.
	*/
	async backfillActiveAccountEmail() {
		if (this.emailBackfillAttempted || this.fetchEmail === void 0 || this.disposed) return;
		this.emailBackfillAttempted = true;
		try {
			const accounts = await this.accountStore.read();
			const boundId = accounts.activeId;
			if (boundId === void 0) return;
			const boundAccount = accounts.accounts.find((account) => account.id === boundId);
			if (boundAccount === void 0 || boundAccount.email !== void 0) return;
			const record = await this.readRecord();
			if (record === void 0 || record.email !== void 0) return;
			const credential = await this.credentials.credential();
			if (credential === void 0) return;
			const email = await this.fetchEmail(credential.accessToken);
			if (email === void 0) return;
			const still = await this.accountStore.read();
			if (still.activeId !== boundId) {
				this.emailBackfillAttempted = false;
				return;
			}
			const currentAccount = still.accounts.find((account) => account.id === boundId);
			if (currentAccount === void 0 || currentAccount.email !== void 0) return;
			const current = await this.readRecord();
			if (current === void 0 || current.refreshToken !== currentAccount.refreshToken) {
				this.emailBackfillAttempted = false;
				return;
			}
			if (current.email !== void 0) return;
			const masked = maskEmail(email);
			const committed = await this.store.compareAndCommit(current.revision, {
				refreshToken: current.refreshToken,
				projectId: current.projectId,
				...masked === void 0 ? {} : { email: masked },
				...current.lineage === void 0 ? {} : { lineage: current.lineage }
			}, current.lineage);
			if (committed === void 0) return;
			await this.accountStore.saveAccount({
				id: boundId,
				email,
				projectId: currentAccount.projectId,
				refreshToken: currentAccount.refreshToken,
				updatedAt: committed.updatedAt,
				...currentAccount.lineage === void 0 ? {} : { lineage: currentAccount.lineage }
			});
			this.notifyStatus();
		} catch {}
	}
	async accountForRecord(record) {
		return (await this.accountStore.read()).accounts.find((account) => account.refreshToken === record.refreshToken && account.projectId === record.projectId && (account.lineage === void 0 || account.lineage === record.lineage));
	}
	async bindCredentialMutation() {
		const record = await this.readRecord();
		const account = record === void 0 ? void 0 : await this.accountForRecord(record);
		return {
			record,
			onCleared: async () => {
				if (account !== void 0) await this.accountStore.removeAccount(account.id, account);
				if (record !== void 0) await this.gates.clear(gateSubject(record));
			}
		};
	}
	async switchAccount(idOrEmailOrIndex) {
		if (this.disposed) throw new OAuthFlowError("internal", "The Antigravity login is unavailable");
		const account = await this.accountStore.setActive(idOrEmailOrIndex);
		if (account === void 0) return {
			ok: false,
			message: `未找到匹配的 Antigravity 账号 "${idOrEmailOrIndex}"`
		};
		const maskedAccountEmail = maskEmail(account.email);
		const draft = {
			refreshToken: account.refreshToken,
			projectId: account.projectId,
			...maskedAccountEmail === void 0 ? {} : { email: maskedAccountEmail },
			...account.lineage === void 0 ? {} : { lineage: account.lineage }
		};
		const committed = await this.store.commit(draft);
		this.credentials.resetCache();
		if (this.autoActivate) await this.autoActivateGates(committed.lineage ?? "legacy-account");
		this.notifyStatus();
		return {
			ok: true,
			message: `已切换至账号: ${account.email ?? account.maskedEmail ?? account.id} (项目: ${account.projectId})`,
			account
		};
	}
	async removeAccount(idOrEmailOrIndex) {
		if (this.disposed) throw new OAuthFlowError("internal", "The Antigravity login is unavailable");
		const removed = await this.accountStore.removeAccount(idOrEmailOrIndex);
		if (removed === void 0) return {
			ok: false,
			message: `未找到匹配的 Antigravity 账号 "${idOrEmailOrIndex}"`
		};
		const binding = await this.bindCredentialMutation();
		const record = binding.record;
		if (record?.refreshToken === removed.refreshToken && record.projectId === removed.projectId && (removed.lineage === void 0 || record.lineage === removed.lineage)) {
			this.activeFlowGeneration = 0;
			await this.flow.cancel();
			await this.credentials.logout(binding);
		}
		this.notifyStatus();
		return {
			ok: true,
			message: `已移除账号: ${removed.email ?? removed.maskedEmail ?? removed.id}`
		};
	}
	async status() {
		const record = await this.readRecord();
		const flowStatus = this.flow.status();
		const phase = flowStatus.phase === "idle" && record !== void 0 ? "success" : flowStatus.phase;
		const maskedEmail = maskEmail(record?.email);
		const credentialStatus = await this.credentials.status();
		const gateEvidence = await this.gateEvidenceFor(record);
		const login = {
			phase,
			configured: record !== void 0,
			projectAvailable: record?.projectId !== void 0,
			...flowStatus.authorizationUrl === void 0 ? {} : { authorizationUrl: flowStatus.authorizationUrl },
			...flowStatus.expiresAt === void 0 ? {} : { expiresAt: flowStatus.expiresAt },
			...maskedEmail === void 0 ? {} : { maskedEmail },
			...flowStatus.errorCode === void 0 ? {} : { errorCode: flowStatus.errorCode }
		};
		return createStatusView(this.riskAcknowledged, login, credentialStatus, this.credentials.revokeStatus(), gateEvidence);
	}
	async acknowledgeRisk() {
		this.riskAcknowledged = true;
		this.notifyStatus();
		return { acknowledged: true };
	}
	/** Observe value-safe gate changes so capability rows can register without polling secrets. */
	watchStatus(listener) {
		this.statusListeners.add(listener);
		return () => {
			this.statusListeners.delete(listener);
		};
	}
	async recordGate0(outcome) {
		const subject = gateSubject(await this.requireRecord());
		await this.gates.recordGate0(subject, outcome);
		this.notifyStatus();
	}
	async recordLlmFamilyGate(family, outcome) {
		const subject = gateSubject(await this.requireRecord());
		await this.gates.recordLlmFamily(subject, family, outcome);
		this.notifyStatus();
	}
	async recordCapabilityGate(id, outcome) {
		const subject = gateSubject(await this.requireRecord());
		if (id === "auth-llm") throw new OAuthFlowError("internal", "Auth/LLM availability is derived from independent family evidence");
		await this.gates.recordCapability(subject, id, outcome);
		this.notifyStatus();
	}
	async capabilityGateEvidence() {
		return this.gateEvidenceFor(await this.readRecord());
	}
	async gate0Passed() {
		return (await this.capabilityGateEvidence()).gate0?.outcome === "passed";
	}
	async capabilityAvailable(id) {
		return (await this.status()).capabilities.some((capability) => capability.id === id && capability.state === "available");
	}
	async startLogin() {
		if (this.disposed) throw new OAuthFlowError("internal", "The Antigravity login is unavailable");
		if (!this.riskAcknowledged) throw new OAuthFlowError("risk-acknowledgement-required", "Risk acknowledgement is required before login");
		const started = await this.flow.start();
		this.activeFlowGeneration = this.flow.generation();
		this.notifyStatus();
		return started;
	}
	async completeCallback(callbackUrl) {
		if (this.disposed) throw new OAuthFlowError("internal", "The Antigravity login is unavailable");
		try {
			return await this.flow.completeCallbackUrl(callbackUrl);
		} finally {
			this.notifyStatus();
		}
	}
	async cancelLogin() {
		const status = await this.flow.cancel();
		if (status.phase !== "success") this.activeFlowGeneration = 0;
		this.notifyStatus();
		return {
			phase: status.phase,
			...status.errorCode === void 0 ? {} : { errorCode: status.errorCode }
		};
	}
	async credential(signal, options) {
		return await this.credentials.credential(signal, options);
	}
	async usage(signal, force = false) {
		return await this.quota.refresh(signal, force);
	}
	async logout() {
		if (this.disposed) throw new OAuthFlowError("internal", "The Antigravity login is unavailable");
		this.activeFlowGeneration = 0;
		try {
			const binding = await this.bindCredentialMutation();
			await this.flow.cancel();
			const result = await this.credentials.logout(binding);
			this.notifyStatus();
			return result;
		} catch {
			throw new OAuthFlowError("persistence-failed", "The local Antigravity credential could not be cleared");
		}
	}
	async revoke(confirmed, signal) {
		if (this.disposed) throw new OAuthFlowError("internal", "The Antigravity login is unavailable");
		const binding = confirmed ? await this.bindCredentialMutation() : void 0;
		const result = await this.credentials.revoke(confirmed, signal, binding);
		this.notifyStatus();
		return result;
	}
	async dispose() {
		if (this.disposed) return;
		this.disposed = true;
		this.activeFlowGeneration = 0;
		this.statusListeners.clear();
		await Promise.all([
			this.flow.dispose(),
			this.credentials.dispose(),
			this.quota.dispose()
		]);
	}
	async commitCredential(token, project, signal) {
		const flowGeneration = this.flow.generation();
		if (this.disposed || flowGeneration !== this.activeFlowGeneration || signal.aborted) throw new OAuthFlowError("cancelled", "The OAuth login was cancelled");
		const current = await this.readRecord();
		if (this.disposed || flowGeneration !== this.activeFlowGeneration || signal.aborted) throw new OAuthFlowError("cancelled", "The OAuth login was cancelled");
		const rawEmail = project.email ?? token.email ?? (this.fetchEmail === void 0 ? void 0 : await this.fetchEmail(token.accessToken).catch(() => void 0));
		const email = maskEmail(rawEmail);
		const draft = {
			refreshToken: token.refreshToken,
			projectId: project.projectId,
			...email === void 0 ? {} : { email }
		};
		const committed = await this.store.compareAndCommit(current?.revision ?? 0, draft, current?.lineage);
		if (committed === void 0) throw new OAuthFlowError("credential-conflict", "The login changed while it was completing");
		await this.accountStore.saveAccount({
			projectId: project.projectId,
			refreshToken: token.refreshToken,
			updatedAt: committed.updatedAt,
			...rawEmail === void 0 ? {} : { email: rawEmail },
			...committed.lineage === void 0 ? {} : { lineage: committed.lineage }
		}).catch(() => {});
		if (this.autoActivate) {
			const subject = committed.lineage ?? "legacy-account";
			await this.autoActivateGates(subject);
		} else await this.gates.clear().catch(() => {});
		this.credentials.replaceFromLogin({
			accessToken: token.accessToken,
			refreshToken: token.refreshToken,
			expiresAt: token.expiresAt,
			projectId: project.projectId
		}, committed);
		this.notifyStatus();
	}
	notifyStatus() {
		for (const listener of this.statusListeners) try {
			listener();
		} catch {}
	}
	async gateEvidenceFor(record) {
		try {
			const evidence = await this.gates.read();
			if (record === void 0) return {};
			const subject = gateSubject(record);
			if (evidence.subject === subject) return evidence;
			if (this.autoActivate && record.projectId !== void 0) {
				await this.autoActivateGates(subject);
				return await this.gates.read();
			}
			return {};
		} catch {
			return { gate0: {
				outcome: "protocol-drift",
				checkedAt: (/* @__PURE__ */ new Date()).toISOString()
			} };
		}
	}
	async autoActivateGates(subject) {
		try {
			await this.gates.recordGate0(subject, "passed");
			await this.gates.recordLlmFamily(subject, "gemini", "passed");
			await this.gates.recordLlmFamily(subject, "claude", "passed");
			await this.gates.recordLlmFamily(subject, "gpt-oss", "passed");
			await this.gates.recordCapability(subject, "search", "passed");
			await this.gates.recordCapability(subject, "image", "passed");
			await this.gates.recordCapability(subject, "video", "passed");
		} catch {}
	}
	async requireRecord() {
		const record = await this.readRecord();
		if (record === void 0) throw new OAuthFlowError("internal", "Antigravity login is required");
		return record;
	}
	async readRecord() {
		try {
			return await this.store.read();
		} catch {
			throw new OAuthFlowError("persistence-failed", "The Antigravity auth store could not be read");
		}
	}
};
function gateSubject(record) {
	return record.lineage ?? "legacy-account";
}
function createAntigravityAuthService(options = {}) {
	return new AntigravityAuthService(options);
}
function maskEmail(value) {
	if (!isBoundedSafeText(value, 4096)) return void 0;
	const at = value.indexOf("@");
	if (at <= 0 || at === value.length - 1) return void 0;
	const local = value.slice(0, at);
	const domain = value.slice(at + 1);
	if (!/^[^\s@]+$/u.test(local) || !/^[^\s@]+$/u.test(domain)) return void 0;
	return `${local.slice(0, 1)}***@${domain}`;
}
//#endregion
//#region direct/legacy/src/loopback-rpc.ts
const LOOPBACK_REQUIRED_MESSAGE = "Antigravity account controls require a loopback-bound DSH Host";
/**
* Decide the account RPC activation from the public WebServer bind. Only an
* explicitly loopback-bound Web service is enabled; a missing, non-loopback,
* or unknown bind is blocked because absence of WebServer is not proof of an
* owned carrier.
*
* This is a Host activation policy, not a per-request source check. DSH
* 0.1.2-alpha.5 exposes no public method-level or carrier authority context.
*/
function loopbackMode(webServerHost) {
	return webServerHost === "127.0.0.1" ? "enabled" : "blocked";
}
/** Command-entry denial shown when the Host exposes the commands seam beyond loopback. */
const ACCOUNT_COMMAND_DENIED_MESSAGE = "Antigravity account commands require a local DSH Host (no WebServer or 127.0.0.1-bound)";
/**
* Decide slash-command activation for one Host composition. The account
* command is the local-terminal login entry point: a composition with no
* WebServer can only dispatch through local UI adapters, and a loopback-bound
* WebServer is the same machine, so both are enabled. Any other WebServer bind
* exposes the shared commands seam to remote callers, and DSH 0.1.2-alpha.5
* command invocations carry no caller/carrier authority with which to exempt
* the local terminal, so those compositions fail closed for every caller.
*
* This is a Host activation policy, not a per-request source check.
*/
function commandAccountMode(webServer) {
	if (webServer === void 0) return "enabled";
	return loopbackMode(webServer.host);
}
/**
* Select the real RPC dispatcher only for an explicitly loopback-bound Web
* service; any other composition registers a value-free inert dispatcher that
* never calls the delegate.
*/
function createLoopbackRpcGuard(webServerHost, delegate) {
	if (loopbackMode(webServerHost) === "blocked") return {
		mode: "blocked",
		handler: async () => ({
			ok: false,
			error: {
				code: "loopback-required",
				message: LOOPBACK_REQUIRED_MESSAGE,
				details: {}
			}
		})
	};
	return {
		mode: "enabled",
		handler: delegate
	};
}
//#endregion
//#region direct/legacy/src/open-authorization-url.ts
/**
* Best-effort Host browser launch that hands the terminal user the OAuth
* authorization URL without persisting it in the session's `command/done`
* event (that event follows ordinary session persistence).
*
* DSH exposes no public transient-presentation or browser-authority API for
* plugins to hand off an external login URL, so this module spawns the
* platform default opener directly, mirroring the best-effort helper the DSH
* TUI renderer uses for its own hrefs, and reports every failure as `false`: a
* Host without a desktop browser simply cannot complete interactive Google
* sign-in from the terminal (documented limitation; no public Host API exists
* to close it).
*
* @module antigravity-auth/open-authorization-url
*/
/** The Google authorization endpoint this plugin starts logins against. */
const AUTHORIZATION_HOST = "accounts.google.com";
/**
* Resolve the host default-browser opener. Darwin uses `open`, Windows
* `cmd /c start`, elsewhere `xdg-open`.
*
* The Windows command line is `cmd /c start "" "<url>"`: the empty quoted token
* is the `start` window title (without it `start` treats the URL as the title),
* and the quoted URL keeps its `&`-separated query parameters from being read
* as command separators. Both quotes reach `cmd` verbatim because Node's
* default argument handling would leave a `&`-only argument unquoted.
* @param platform - `process.platform` snapshot.
* @param url - already-validated https authorization URL.
*/
function openerSpec(platform, url) {
	if (platform === "darwin") return {
		command: "open",
		args: [url],
		verbatimArguments: false
	};
	if (platform === "win32") return {
		command: "cmd",
		args: [
			"/c",
			"start",
			"\"\"",
			`"${url}"`
		],
		verbatimArguments: true
	};
	return {
		command: "xdg-open",
		args: [url],
		verbatimArguments: false
	};
}
/**
* Whether a candidate is the Google authorization endpoint this plugin starts.
* @param value - candidate authorization URL.
*/
function isAntigravityAuthorizationUrl(value) {
	try {
		const parsed = new URL(value);
		return parsed.protocol === "https:" && parsed.hostname === AUTHORIZATION_HOST && parsed.pathname.startsWith("/o/oauth2/");
	} catch {
		return false;
	}
}
/**
* Open the authorization URL in the host default browser, best effort.
* @param url - the Google authorization URL returned by `OAuthFlow.start()`.
* @param spawnFn - injectable spawn.
* @param platform - injectable platform.
* @returns true once the opener process spawned; false when the URL is not an
* Antigravity authorization URL, spawn threw, or the opener could not start.
* The URL never enters the returned value or a diagnostic.
*/
async function openAuthorizationUrl(url, spawnFn = spawn, platform = process.platform) {
	if (!isAntigravityAuthorizationUrl(url)) return false;
	const spec = openerSpec(platform, url);
	try {
		const child = spawnFn(spec.command, spec.args, {
			detached: true,
			stdio: "ignore",
			windowsVerbatimArguments: spec.verbatimArguments
		});
		return await new Promise((resolve) => {
			child.once("error", () => {
				resolve(false);
			});
			child.once("spawn", () => {
				child.unref();
				resolve(true);
			});
		});
	} catch {
		return false;
	}
}
//#endregion
//#region direct/legacy/src/auth-command.ts
function errorMessage(error) {
	return error instanceof Error ? error.message : String(error);
}
function formatStatus(status) {
	const login = status.login;
	const parts = [login.configured ? "configured" : "not configured", login.projectAvailable ? "project available" : "no project"];
	if (login.maskedEmail !== void 0) parts.push(login.maskedEmail);
	if (login.phase === "pending") parts.push("authorization pending");
	else if (login.phase !== "idle" && login.phase !== "success") parts.push(`phase ${login.phase}`);
	if (login.errorCode !== void 0) parts.push(`error ${login.errorCode}`);
	const available = status.capabilities.filter((capability) => capability.state === "available").map((capability) => capability.id);
	if (available.length > 0) parts.push(`available: ${available.join(", ")}`);
	return `Antigravity auth: ${parts.join("; ")}`;
}
/**
* Build the slash command shared by every interactive DSH surface.
* @param service - the shared Host auth service.
* @param accountMode - live account-control activation for this Host
* composition (enabled on a local terminal Host with no WebServer or a
* loopback-bound WebServer, blocked on a public Web bind); when blocked the
* command denies every operation without touching the auth service.
* @param openUrl - best-effort Host browser launcher for the authorization
* URL; the URL is delivered there and never echoed into the command result,
* because `CommandResult.text` is persisted verbatim into `command/done`. The
* resolved false value means the Host has no usable browser launch, which the
* command reports without reproducing the URL.
*/
function createAntigravityAuthCommand(service, accountMode, openUrl = openAuthorizationUrl) {
	return {
		name: "antigravity-auth",
		description: "Inspect or start the Antigravity OAuth login",
		input: { hint: "[status|accounts|switch <id>|login|logout|remove <id>]" },
		handler: async ({ rawInput }) => {
			if (accountMode() === "blocked") return {
				kind: "error",
				text: ACCOUNT_COMMAND_DENIED_MESSAGE
			};
			const parts = rawInput.trim().split(/\s+/);
			const operation = parts[0] || "status";
			const arg = parts.slice(1).join(" ").trim();
			if (operation === "status") try {
				const status = await service.status();
				const list = typeof service.listAccounts === "function" ? await Promise.resolve().then(() => service.listAccounts()).catch(() => void 0) : void 0;
				let text = formatStatus(status);
				if (list !== void 0 && list.accounts.length > 0) {
					const activeAcc = list.accounts.find((a) => a.isActive);
					text += `\n已缓存账号数: ${list.accounts.length}`;
					if (activeAcc !== void 0) text += ` (当前: [${activeAcc.index}] ${activeAcc.email ?? activeAcc.maskedEmail ?? activeAcc.id})`;
				}
				return {
					kind: "success",
					text
				};
			} catch (error) {
				return {
					kind: "error",
					text: `reading Antigravity auth status failed: ${errorMessage(error)}`
				};
			}
			if (operation === "accounts" || operation === "list") try {
				const list = await service.listAccounts();
				if (list.accounts.length === 0) return {
					kind: "success",
					text: "当前暂无已缓存的 Antigravity 账号。请执行 /anti login 或 /antigravity-auth login 登录新账号。"
				};
				return {
					kind: "success",
					text: [
						`Antigravity 账号列表 (共 ${list.accounts.length} 个):`,
						...list.accounts.map((acc) => {
							const activeMark = acc.isActive ? " * [活跃] " : "   ";
							const emailDisplay = acc.maskedEmail ?? acc.email ?? "(未提供邮箱)";
							return `${activeMark}[${acc.index}] ${emailDisplay} (项目: ${acc.projectId})`;
						}),
						"",
						"提示: 输入 /anti switch <序号或邮箱> 切换账号",
						"      输入 /anti login 登录新账号并自动加入列表"
					].join("\n")
				};
			} catch (error) {
				return {
					kind: "error",
					text: `获取账号列表失败: ${errorMessage(error)}`
				};
			}
			if (operation === "switch" || operation === "use") {
				if (!arg) return {
					kind: "error",
					text: "请指定要切换的账号序号或邮箱，例如: /anti switch 1 或 /anti switch user@example.com"
				};
				try {
					const result = await service.switchAccount(arg);
					return result.ok ? {
						kind: "success",
						text: result.message
					} : {
						kind: "error",
						text: result.message
					};
				} catch (error) {
					return {
						kind: "error",
						text: `切换账号失败: ${errorMessage(error)}`
					};
				}
			}
			if (operation === "remove" || operation === "delete") {
				if (!arg) return {
					kind: "error",
					text: "请指定要移除的账号序号或邮箱，例如: /anti remove 2"
				};
				try {
					const result = await service.removeAccount(arg);
					return result.ok ? {
						kind: "success",
						text: result.message
					} : {
						kind: "error",
						text: result.message
					};
				} catch (error) {
					return {
						kind: "error",
						text: `移除账号失败: ${errorMessage(error)}`
					};
				}
			}
			if (operation === "login") try {
				const replaced = (await service.status()).login.phase === "pending";
				await service.acknowledgeRisk();
				if (!await openUrl((await service.startLogin()).authorizationUrl)) return {
					kind: "error",
					text: "Antigravity authorization started, but this Host could not open a browser automatically; complete sign-in in a browser on this Host, then run /antigravity-auth status."
				};
				return {
					kind: "success",
					text: replaced ? "Previous Antigravity authorization cancelled and a new one started (unofficial Antigravity channel, personal use); complete Google sign-in in the opened browser, then run /antigravity-auth status." : "Antigravity authorization started (unofficial Antigravity channel, personal use); complete Google sign-in in the opened browser, then run /antigravity-auth status."
				};
			} catch (error) {
				return {
					kind: "error",
					text: `starting Antigravity login failed: ${errorMessage(error)}`
				};
			}
			if (operation === "cancel") try {
				const result = await service.cancelLogin();
				return result.phase === "cancelled" ? {
					kind: "success",
					text: "Antigravity authorization cancelled."
				} : {
					kind: "error",
					text: `Antigravity authorization could not be cancelled (phase ${result.phase}).`
				};
			} catch (error) {
				return {
					kind: "error",
					text: `cancelling Antigravity login failed: ${errorMessage(error)}`
				};
			}
			if (operation === "logout") try {
				await service.logout();
				return {
					kind: "success",
					text: "Antigravity logged out."
				};
			} catch (error) {
				return {
					kind: "error",
					text: `logging out of Antigravity failed: ${errorMessage(error)}`
				};
			}
			return {
				kind: "error",
				text: `unknown operation "${operation}" (available: status, accounts, switch <id>, login, cancel, logout, remove <id>)`
			};
		}
	};
}
const MAX_SIGNATURE_LENGTH = 16384;
const MAX_BLOCKS = 128;
const ANTIGRAVITY_SUPPORTED_PROVIDERS = /* @__PURE__ */ new Set(["google-antigravity", "google"]);
function isAntigravityProvider(provider) {
	return typeof provider === "string" && ANTIGRAVITY_SUPPORTED_PROVIDERS.has(provider);
}
/** Keep only provider-issued signatures and bounded response facts. */
function createReplayState(model, family, finish, blocks, provider = "google-antigravity") {
	const boundedBlocks = blocks.slice(0, MAX_BLOCKS).map((block) => {
		const signature = safeSignature(block.signature);
		return {
			kind: block.kind,
			...signature === void 0 ? {} : { signature }
		};
	});
	const boundedFinish = safeFinish(finish);
	return {
		response: {
			version: 1,
			provider: isAntigravityProvider(provider) ? provider : "google-antigravity",
			model: model.slice(0, 256),
			family,
			...boundedFinish === void 0 ? {} : { finish: boundedFinish }
		},
		blocks: boundedBlocks
	};
}
/** Validate replay metadata before it can affect a later private request. */
function compatibleReplayState(message, provider, model, blockKinds) {
	if (!isAntigravityProvider(provider) || message.role !== "assistant") return void 0;
	const provenance = isRecord$6(message.source) ? message.source : void 0;
	if (provenance !== void 0 && provenance.kind === "model") {
		if (!isAntigravityProvider(provenance.provider) || provenance.model !== model) return void 0;
	}
	const value = isRecord$6(provenance?.replayState) ? provenance.replayState : isRecord$6(message.replayState) ? message.replayState : void 0;
	if (!isRecord$6(value) || !isRecord$6(value.response) || !Array.isArray(value.blocks)) return void 0;
	const family = value.response.family;
	if (value.response.version !== 1 || !isAntigravityProvider(value.response.provider) || value.response.model !== model || !isFamily(family) || value.blocks.length > MAX_BLOCKS) return void 0;
	const blocks = [];
	for (const item of value.blocks) {
		if (!isRecord$6(item) || typeof item.kind !== "string") continue;
		const kind = item.kind;
		const signature = typeof item.signature === "string" && safeSignature(item.signature) !== void 0 ? item.signature : void 0;
		blocks.push({
			kind,
			...signature === void 0 ? {} : { signature }
		});
	}
	if (blockKinds !== void 0 && (blocks.length !== blockKinds.length || blocks.some((block, index) => block.kind !== blockKinds[index]))) return void 0;
	const finish = value.response.finish === void 0 ? void 0 : safeFinish(value.response.finish);
	if (value.response.finish !== void 0 && finish === void 0) return void 0;
	return {
		response: {
			version: 1,
			provider: isAntigravityProvider(provider) ? provider : "google-antigravity",
			model,
			family,
			...finish === void 0 ? {} : { finish }
		},
		blocks
	};
}
/** Return the block family without allowing a model alias to cross families. */
function antigravityModelFamily(model) {
	const value = model.toLowerCase();
	if (value.includes("gemini")) return "gemini";
	if (value.includes("claude")) return "claude";
	if (value.includes("gpt-oss")) return "gpt-oss";
	return "unknown";
}
/** Convert DSH schemas to the small function-declaration subset accepted privately. */
function sanitizeToolSchemas(tools) {
	if (tools === void 0) return [];
	return tools.slice(0, 64).map((tool) => ({
		name: boundedName(tool.name),
		description: boundedText(tool.description, 4096),
		parameters: sanitizeSchema(tool.parameters)
	}));
}
function buildFunctionDeclarations(tools) {
	return sanitizeToolSchemas(tools).map((tool) => ({
		name: tool.name,
		description: tool.description,
		parameters: tool.parameters
	}));
}
function sanitizeSchema(value, depth = 0) {
	if (depth > 8 || !isRecord$6(value)) return {
		type: "object",
		properties: {}
	};
	const type = typeof value.type === "string" && [
		"object",
		"array",
		"string",
		"number",
		"integer",
		"boolean",
		"null"
	].includes(value.type) ? value.type : "object";
	const output = { type };
	if (typeof value.description === "string") output.description = boundedText(value.description, 1024);
	if (Array.isArray(value.required)) output.required = value.required.filter((item) => typeof item === "string").slice(0, 128);
	if (Array.isArray(value.enum)) output.enum = value.enum.slice(0, 128).filter((item) => [
		"string",
		"number",
		"boolean",
		"null"
	].includes(typeof item));
	if (type === "object" && isRecord$6(value.properties)) {
		const properties = {};
		for (const [key, item] of Object.entries(value.properties).slice(0, 128)) if (!hasControl$2(key) && key.length > 0) properties[key.slice(0, 128)] = sanitizeSchema(item, depth + 1);
		output.properties = properties;
	}
	if (type === "array") output.items = sanitizeSchema(value.items, depth + 1);
	if (Array.isArray(value.oneOf)) output.oneOf = value.oneOf.slice(0, 8).map((item) => sanitizeSchema(item, depth + 1));
	return output;
}
function safeFinish(value) {
	if (typeof value !== "string" || value.length === 0 || value.length > 128) return void 0;
	const normalized = value.toUpperCase();
	return [
		"STOP",
		"MAX_TOKENS",
		"LENGTH",
		"TOOL_CALLS",
		"FUNCTION_CALL",
		"SAFETY",
		"BLOCKLIST",
		"ERROR"
	].includes(normalized) ? normalized : void 0;
}
function safeSignature(value) {
	if (typeof value !== "string" || value.length === 0 || value.length > MAX_SIGNATURE_LENGTH) return void 0;
	for (const character of value) {
		const code = character.charCodeAt(0);
		if (code < 32 || code === 127) return void 0;
	}
	return value;
}
function boundedName(value) {
	return typeof value === "string" && value.length > 0 && !hasControl$2(value) ? value.slice(0, 128) : "unnamed_tool";
}
function boundedText(value, limit) {
	return typeof value === "string" && !hasControl$2(value) ? value.slice(0, limit) : "";
}
function hasControl$2(value) {
	for (const character of value) {
		const code = character.charCodeAt(0);
		if (code < 32 || code === 127) return true;
	}
	return false;
}
function isFamily(value) {
	return value === "gemini" || value === "claude" || value === "gpt-oss" || value === "unknown";
}
function isRecord$6(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
//#endregion
//#region direct/legacy/src/llm-adapter.ts
/** Public DSH LLM adapter for the single Antigravity provider route. */
const ANTIGRAVITY_PROVIDER = "google-antigravity";
const ANTIGRAVITY_STREAM_ENDPOINT = `${ANTIGRAVITY_WIRE_ORIGIN}/v1internal:streamGenerateContent?alt=sse`;
`${ANTIGRAVITY_WIRE_ORIGIN}`;
const ANTIGRAVITY_AVAILABLE_MODELS_ENDPOINT = `${ANTIGRAVITY_WIRE_ORIGIN}/v1internal:fetchAvailableModels`;
const MODEL_CATALOG_TTL_MS = 3e4;
const MAX_MODEL_CATALOG_BYTES = 262144;
const MAX_PROVIDER_ERROR_BYTES = 65536;
const MAX_PROVIDER_ERROR_FRAME_BYTES = 16384;
const MAX_PROVIDER_ERROR_JSON_DEPTH = 8;
const MAX_PROVIDER_PARTS = 4096;
const MAX_CAPACITY_RETRIES = 2;
const CAPACITY_RETRY_BASE_DELAY_MS = 1500;
const CAPACITY_RETRY_MAX_DELAY_MS = 8e3;
/** Adapter that owns exactly one provider route and no fallback route. */
var AntigravityAdapter = class extends LlmAdapter {
	adapterOptions;
	transport;
	sessions = new AgyRequestSessionStore("dsh-antigravity-auth");
	options;
	definitions = getPublicModelDefinitions();
	catalogProjectId;
	catalogExpiresAt = 0;
	catalogModelIds = /* @__PURE__ */ new Set();
	catalogFailureCode;
	catalogView;
	constructor(adapterOptions) {
		super();
		this.adapterOptions = adapterOptions;
		this.transport = adapterOptions.transport ?? createPrivateTransport(adapterOptions.responseHeaderTimeoutMs === void 0 ? {} : { responseHeaderTimeoutMs: adapterOptions.responseHeaderTimeoutMs });
		this.options = {
			responseHeaderTimeoutMs: boundedTimeout(adapterOptions.responseHeaderTimeoutMs, DEFAULT_PRIVATE_RESPONSE_HEADER_TIMEOUT_MS),
			idleTimeoutMs: boundedTimeout(adapterOptions.idleTimeoutMs, DEFAULT_PRIVATE_IDLE_TIMEOUT_MS),
			totalTimeoutMs: boundedTimeout(adapterOptions.totalTimeoutMs, DEFAULT_PRIVATE_TOTAL_TIMEOUT_MS),
			maxResponseBytes: boundedLimit(adapterOptions.maxResponseBytes, DEFAULT_PRIVATE_RESPONSE_BYTES),
			maxFrameBytes: boundedLimit(adapterOptions.maxFrameBytes, DEFAULT_PRIVATE_FRAME_BYTES)
		};
		this.catalogView = createCatalogView(this.definitions, "snapshot");
	}
	providerInfo(provider) {
		if (provider !== "google-antigravity" && provider !== "google") throw new LlmError("Unknown Antigravity provider route", "NO_ADAPTER");
		return {
			id: provider,
			name: provider === "google" ? "Google" : "Antigravity (direct, experimental)"
		};
	}
	providerRetryPolicy(provider = ANTIGRAVITY_PROVIDER) {
		return resolveRetryPolicy({
			mode: "normal",
			maxRetries: 0
		}, provider);
	}
	/** Forget account-bound availability when Gate 0 or the credential is replaced. */
	invalidateModelCatalog() {
		this.catalogProjectId = void 0;
		this.catalogExpiresAt = 0;
		this.catalogModelIds = /* @__PURE__ */ new Set();
		this.catalogFailureCode = void 0;
		this.catalogView = createCatalogView(this.definitions, "snapshot");
	}
	/** Return the pinned catalog without performing credential or network work. */
	catalogSnapshot() {
		return cloneCatalogView(createCatalogView(this.definitions, "snapshot"));
	}
	/** Refresh the advisory catalog and collapse failures into browser-safe state. */
	async modelCatalog(signal, forceRefresh = false) {
		try {
			const available = await this.readLiveModelIds(signal, forceRefresh);
			this.catalogView = createCatalogView(this.definitions, "live-available", available, (/* @__PURE__ */ new Date()).toISOString());
		} catch (error) {
			const state = error instanceof LlmError && error.code === "PROTOCOL_DRIFT" ? "protocol-drift" : "refresh-failed";
			this.catalogView = createCatalogView(this.definitions, state, void 0, (/* @__PURE__ */ new Date()).toISOString());
		}
		return cloneCatalogView(this.catalogView);
	}
	async listModels(provider, signal) {
		this.providerInfo(provider);
		const snapshot = this.pinnedTextModelInfos(provider);
		let available;
		try {
			available = await this.readLiveModelIds(signal);
			this.catalogView = createCatalogView(this.definitions, "live-available", available, (/* @__PURE__ */ new Date()).toISOString());
		} catch (error) {
			const state = error instanceof LlmError && error.code === "PROTOCOL_DRIFT" ? "protocol-drift" : "refresh-failed";
			this.catalogView = createCatalogView(this.definitions, state, void 0, (/* @__PURE__ */ new Date()).toISOString());
			if (!canFallBackToPinnedTextSnapshot(error)) throw error;
			return snapshot;
		}
		return snapshot.filter((model) => available.has(model.id));
	}
	pinnedTextModelInfos(provider = ANTIGRAVITY_PROVIDER) {
		return Object.values(this.definitions).filter((definition) => !definition.modalities.output.includes("image")).map((definition) => ({
			provider,
			id: definition.id,
			name: cleanModelDisplayName(definition.name),
			inputModalities: definition.modalities.input.filter((item) => item === "text" || item === "image")
		}));
	}
	async resolveModel(provider, model, _signal) {
		this.providerInfo(provider);
		if (typeof model !== "string" || model.trim().length === 0 || model.length > 256) throw new LlmError("The Antigravity model id is invalid", "INVALID_MODEL");
		const definition = this.definitions[model];
		if (definition === void 0 || definition.modalities.output.includes("image")) throw new LlmError("The Antigravity model is not in the audited text model snapshot", "INVALID_MODEL");
		const reasoning = getModelReasoningEfforts(model);
		return {
			provider,
			id: definition.id,
			name: cleanModelDisplayName(definition.name),
			inputModalities: definition.modalities.input.filter((item) => item === "text" || item === "image"),
			context: { contextWindow: definition.limit.context },
			defaultMaxTokens: definition.limit.output,
			...reasoning === void 0 ? {} : { reasoning }
		};
	}
	async *stream(options) {
		if (options.provider !== "google-antigravity" && options.provider !== "google") throw new LlmError("The Antigravity adapter received an unknown provider route", "NO_ADAPTER");
		const signal = options.signal;
		const requestedDefinition = this.definitions[options.model];
		if (requestedDefinition === void 0 || requestedDefinition.modalities.output.includes("image")) throw new LlmError("The Antigravity model is not in the audited text model snapshot", "INVALID_MODEL");
		if (isAborted(signal)) {
			yield finishChunk("aborted", "CANCELLED");
			return;
		}
		const hasEmitted = { value: false };
		let replayed = false;
		let capacityAttempt = 0;
		for (;;) {
			const credential = await this.readCredential(signal, replayed);
			if (credential === void 0) throw new LlmError("Antigravity login is required before model use", "AUTH");
			const sessionKey = requestSessionKey(options);
			const requestScope = this.sessions.beginRequest(sessionKey);
			let payload;
			try {
				payload = await buildAntigravityGeneratePayloadForAdapter(options, credential, requestScope.session, requestScope.timestamp, this.adapterOptions.attachments);
			} catch (error) {
				if (error instanceof LlmError) throw error;
				throw new LlmError("The Antigravity image input could not be admitted safely", "UNSUPPORTED_MODALITY");
			}
			let response;
			try {
				response = await this.transport.request({
					url: ANTIGRAVITY_STREAM_ENDPOINT,
					accessToken: credential.accessToken,
					body: JSON.stringify(payload),
					...signal === void 0 ? {} : { signal },
					responseHeaderTimeoutMs: this.options.responseHeaderTimeoutMs
				});
			} catch (error) {
				throw toLlmError(error);
			}
			const statusError = privateStatusError(response.status);
			if (statusError !== void 0) {
				if (statusError.code === "authentication" && !replayed && !hasEmitted.value && !isAborted(signal)) {
					await cancelResponse(response);
					replayed = true;
					continue;
				}
				if (response.status === 400 && await responseReportsContextWindowExceeded(response, {
					...signal === void 0 ? {} : { signal },
					idleTimeoutMs: this.options.idleTimeoutMs,
					totalTimeoutMs: this.options.totalTimeoutMs,
					maxResponseBytes: this.options.maxResponseBytes,
					maxFrameBytes: this.options.maxFrameBytes
				})) throw contextWindowExceededError(response.status);
				if (response.status === 503 && capacityAttempt < MAX_CAPACITY_RETRIES && !hasEmitted.value && !isAborted(signal) && await responseReportsModelCapacityExhausted(response, this.options)) {
					capacityAttempt += 1;
					await cancelResponse(response);
					await sleep(backoffDelayMs(capacityAttempt), signal);
					if (isAborted(signal)) {
						yield finishChunk("aborted", "CANCELLED");
						return;
					}
					continue;
				}
				await cancelResponse(response);
				throw toLlmError(statusError);
			}
			try {
				yield* this.streamResponse(response, options, hasEmitted);
				this.sessions.completeExecution(sessionKey);
				return;
			} catch (error) {
				if ((error instanceof PrivateTransportError ? error : void 0)?.code === "authentication" && !replayed && !hasEmitted.value && !isAborted(signal)) {
					replayed = true;
					continue;
				}
				throw toLlmError(error);
			}
		}
	}
	async *streamResponse(response, options, hasEmitted) {
		const states = [];
		let current;
		let usage;
		let finish;
		let eventError;
		let pendingSignature;
		for await (const sse of iteratePrivateSse(response, {
			...options.signal === void 0 ? {} : { signal: options.signal },
			idleTimeoutMs: this.options.idleTimeoutMs,
			totalTimeoutMs: this.options.totalTimeoutMs,
			maxBytes: this.options.maxResponseBytes,
			maxFrameBytes: this.options.maxFrameBytes
		})) {
			if (sse.data.trim() === "[DONE]") continue;
			const event = parseProviderEvent(sse.data);
			if (event.error !== void 0) {
				eventError = event.error;
				if (event.error.status === 401 || isAuthenticationCode(event.error.code)) throw new PrivateTransportError("authentication", "The private endpoint requires authentication", { status: event.error.status ?? 401 });
				break;
			}
			if (event.usage !== void 0) usage = event.usage;
			if (event.finish !== void 0) finish = event.finish;
			for (const part of event.parts) {
				if (part.kind !== "tool-call" && part.text.length === 0) {
					if (part.signature !== void 0) pendingSignature = part.signature;
					continue;
				}
				if (current === void 0 || !sameBlock(current, part)) {
					if (current !== void 0) yield endBlock(current);
					current = beginBlock(states, part);
					if (current.signature === void 0 && pendingSignature !== void 0) current.signature = pendingSignature;
					pendingSignature = void 0;
					yield {
						type: "block-start",
						index: current.index,
						blockType: current.kind
					};
				}
				if (part.kind === "tool-call") {
					if (part.name !== void 0) current.name = assembleFunctionName(current.name, part.name);
					current.text += part.arguments;
					hasEmitted.value ||= part.arguments.length > 0 || part.name !== void 0;
					yield {
						type: "tool-call-delta",
						index: current.index,
						id: current.id,
						...part.name === void 0 ? {} : { name: part.name },
						argumentsDelta: part.arguments
					};
					if (part.signature !== void 0) current.signature = part.signature;
				} else if (part.kind === "reasoning") {
					current.text += part.text;
					hasEmitted.value ||= part.text.length > 0;
					if (part.signature !== void 0) current.signature = part.signature;
					if (part.text.length > 0) yield {
						type: "reasoning-delta",
						index: current.index,
						text: part.text
					};
				} else {
					current.text += part.text;
					hasEmitted.value ||= part.text.length > 0;
					if (part.text.length > 0) yield {
						type: "text-delta",
						index: current.index,
						text: part.text
					};
				}
			}
		}
		if (current !== void 0) yield endBlock(current);
		if (usage !== void 0) yield {
			type: "usage",
			usage
		};
		if (eventError !== void 0) {
			yield finishChunk("error", eventError.contextWindowExceeded === true ? CONTEXT_WINDOW_EXCEEDED_CODE : safeProviderErrorCode(eventError.code), safeProviderStatus(eventError.status));
			return;
		}
		if (isAborted(options.signal)) {
			yield finishChunk("aborted", "CANCELLED");
			return;
		}
		if (states.length === 0) {
			yield finishChunk("error", "EMPTY_RESPONSE");
			return;
		}
		let lastReasoningSignature = pendingSignature;
		for (const state of states) if (state.kind === "reasoning" && state.signature !== void 0) lastReasoningSignature = state.signature;
		else if (state.kind === "tool-call") {
			if (state.signature === void 0 && lastReasoningSignature !== void 0) state.signature = lastReasoningSignature;
		}
		const replayBlocks = states.map((state) => ({
			kind: state.kind,
			...state.signature === void 0 ? {} : { signature: state.signature }
		}));
		const replayState = createReplayState(options.model, antigravityModelFamily(options.model), finish, replayBlocks, options.provider);
		yield finishChunk(mapFinishReason(finish), finish ?? "STOP", void 0, replayState);
	}
	async readLiveModelIds(signal, bypassCache = false, forceCredentialRefresh = false) {
		const credential = await this.readCredential(signal, forceCredentialRefresh);
		if (credential === void 0) throw new LlmError("Antigravity login is required before model discovery", "AUTH");
		if (!bypassCache && this.catalogProjectId === credential.projectId && Date.now() < this.catalogExpiresAt) {
			if (this.catalogFailureCode !== void 0) throw new LlmError("The Antigravity live model catalog refresh remains unavailable", this.catalogFailureCode);
			return this.catalogModelIds;
		}
		let response;
		const body = credential.projectId ? { project: credential.projectId } : {};
		try {
			response = await this.transport.request({
				url: ANTIGRAVITY_AVAILABLE_MODELS_ENDPOINT,
				accessToken: credential.accessToken,
				body: JSON.stringify(body),
				...signal === void 0 ? {} : { signal },
				responseHeaderTimeoutMs: this.options.responseHeaderTimeoutMs
			});
		} catch (error) {
			const failure = toModelCatalogError(error, signal, "provider");
			this.rememberCatalogFailure(credential.projectId, failure);
			throw failure;
		}
		const statusError = privateStatusError(response.status);
		if (statusError !== void 0) {
			await cancelResponse(response);
			if (statusError.code === "authentication" && !forceCredentialRefresh && !isAborted(signal)) {
				this.catalogExpiresAt = 0;
				return this.readLiveModelIds(signal, true, true);
			}
			const failure = toLlmError(statusError);
			this.rememberCatalogFailure(credential.projectId, failure);
			throw failure;
		}
		let value;
		try {
			value = JSON.parse(await readPrivateText(response, {
				...signal === void 0 ? {} : { signal },
				idleTimeoutMs: this.options.idleTimeoutMs,
				totalTimeoutMs: this.options.totalTimeoutMs,
				maxBytes: Math.min(this.options.maxResponseBytes, MAX_MODEL_CATALOG_BYTES)
			}));
		} catch (error) {
			const failure = toModelCatalogError(error, signal, "protocol");
			this.rememberCatalogFailure(credential.projectId, failure);
			throw failure;
		}
		let ids;
		try {
			ids = parseLiveModelIds(value, this.definitions);
		} catch (error) {
			const failure = error instanceof LlmError ? error : new LlmError("The Antigravity live model catalog did not match the audited schema", "PROTOCOL_DRIFT");
			this.rememberCatalogFailure(credential.projectId, failure);
			throw failure;
		}
		this.catalogProjectId = credential.projectId;
		this.catalogModelIds = ids;
		this.catalogFailureCode = void 0;
		this.catalogExpiresAt = Date.now() + MODEL_CATALOG_TTL_MS;
		return ids;
	}
	rememberCatalogFailure(projectId, failure) {
		if (failure.code === "AUTH" || failure.code === "CANCELLED") return;
		this.catalogProjectId = projectId;
		this.catalogModelIds = /* @__PURE__ */ new Set();
		this.catalogFailureCode = failure.code;
		this.catalogExpiresAt = Date.now() + MODEL_CATALOG_TTL_MS;
	}
	async readCredential(signal, forceRefresh) {
		try {
			return await this.adapterOptions.auth.credential(signal, forceRefresh ? { forceRefresh: true } : void 0);
		} catch (error) {
			throw toLlmError(error);
		}
	}
};
function cleanModelDisplayName(name) {
	return name.replace(/\s*\([^)]*\)\s*$/u, "").trim();
}
function getModelReasoningEfforts(modelId) {
	const lower = modelId.toLowerCase();
	if (lower.includes("flash") && !lower.includes("image")) return {
		efforts: [
			{
				id: ReasoningEffortId("low"),
				name: "Low"
			},
			{
				id: ReasoningEffortId("medium"),
				name: "Medium"
			},
			{
				id: ReasoningEffortId("high"),
				name: "High"
			}
		],
		defaultEffort: ReasoningEffortId(lower.includes("gemini-3.8-flash") ? "medium" : "high")
	};
	if (lower.includes("pro")) return {
		efforts: [{
			id: ReasoningEffortId("low"),
			name: "Low"
		}, {
			id: ReasoningEffortId("high"),
			name: "High"
		}],
		defaultEffort: ReasoningEffortId("high")
	};
}
function createCatalogView(definitions, state, available, checkedAt) {
	return {
		state,
		models: Object.values(definitions).filter((definition) => !definition.modalities.output.includes("image")).map((definition) => ({
			id: definition.id,
			name: cleanModelDisplayName(definition.name),
			state: state === "live-available" ? available?.has(definition.id) === true ? "live-available" : "unavailable" : "snapshot"
		})),
		...checkedAt === void 0 ? {} : { checkedAt }
	};
}
function cloneCatalogView(value) {
	return {
		state: value.state,
		models: value.models.map((model) => ({ ...model })),
		...value.checkedAt === void 0 ? {} : { checkedAt: value.checkedAt }
	};
}
function parseLiveModelIds(value, definitions) {
	const root = isRecord$5(value) && isRecord$5(value.response) ? value.response : value;
	if (!isRecord$5(root) || !isRecord$5(root.models)) throw new LlmError("The Antigravity live model catalog did not match the audited schema", "PROTOCOL_DRIFT");
	const entries = Object.entries(root.models);
	if (entries.length > 512) throw new LlmError("The Antigravity live model catalog exceeded the model limit", "PROTOCOL_DRIFT");
	const aliases = getResolverAliasMap();
	const live = /* @__PURE__ */ new Set();
	for (const [id, rawEntry] of entries) {
		if (!safeModelId(id) || !isRecord$5(rawEntry)) throw new LlmError("The Antigravity live model catalog did not match the audited schema", "PROTOCOL_DRIFT");
		const cleanId = cleanModelId(id);
		live.add(canonicalWireModel(cleanId, aliases));
		live.add(cleanId);
		live.add(id);
		if (cleanId === "gemini-3-flash" || cleanId === "gemini-3-flash-agent" || cleanId === "gemini-3.7-flash-tiered" || cleanId.startsWith("gemini-3-flash") || cleanId.startsWith("gemini-3.7-flash")) {
			live.add("gemini-3.7-flash");
			live.add("gemini-3.7-flash-medium");
			live.add("gemini-3.7-flash-low");
			live.add("gemini-3.7-flash-high");
		}
		if (cleanId === "gemini-3.8-flash-tiered" || cleanId.startsWith("gemini-3.8-flash")) {
			live.add("gemini-3.8-flash");
			live.add("gemini-3.8-flash-medium");
			live.add("gemini-3.8-flash-low");
			live.add("gemini-3.8-flash-high");
		}
		if (rawEntry.modelName !== void 0 && typeof rawEntry.modelName === "string") {
			if (!safeModelId(rawEntry.modelName)) throw new LlmError("The Antigravity live model catalog did not match the audited schema", "PROTOCOL_DRIFT");
			const cleanName = cleanModelId(rawEntry.modelName);
			live.add(canonicalWireModel(cleanName, aliases));
			live.add(cleanName);
		}
		if (rawEntry.displayName !== void 0 && (typeof rawEntry.displayName !== "string" || rawEntry.displayName.length > 512 || containsControl(rawEntry.displayName))) throw new LlmError("The Antigravity live model catalog did not match the audited schema", "PROTOCOL_DRIFT");
	}
	const available = /* @__PURE__ */ new Set();
	for (const definition of Object.values(definitions)) {
		const resolved = resolveModelWithTier(definition.id).actualModel;
		const cleanResolved = cleanModelId(resolved);
		const canonical = canonicalWireModel(cleanResolved, aliases);
		if (live.has(canonical) || live.has(cleanResolved) || live.has(resolved) || live.has(definition.id) || definition.id === "antigravity-gemini-3.7-flash" && (live.has("gemini-3-flash") || live.has("gemini-3-flash-agent") || live.has("gemini-3.7-flash-tiered") || live.has("gemini-3.7-flash") || live.has("gemini-3.7-flash-medium"))) available.add(definition.id);
	}
	return available;
}
function cleanModelId(value) {
	return value.replace(/^(?:publishers\/[^/]+\/)?models\//, "");
}
function canonicalWireModel(value, aliases) {
	return aliases[value] ?? value;
}
function safeModelId(value) {
	return typeof value === "string" && value.length > 0 && value.length <= 256 && !containsControl(value);
}
function containsControl(value) {
	for (let index = 0; index < value.length; index += 1) {
		const code = value.charCodeAt(index);
		if (code < 32 || code === 127) return true;
	}
	return false;
}
function beginBlock(states, part) {
	const index = states.length;
	const block = part.kind === "tool-call" ? {
		index,
		kind: "tool-call",
		id: ToolCallId(part.id ?? `antigravity-call-${String(index)}`),
		...part.name === void 0 ? {} : { name: part.name },
		text: "",
		...part.signature === void 0 ? {} : { signature: part.signature }
	} : {
		index,
		kind: part.kind,
		id: ToolCallId(`antigravity-block-${String(index)}`),
		text: "",
		...part.signature === void 0 ? {} : { signature: part.signature }
	};
	states.push(block);
	return block;
}
function sameBlock(state, part) {
	if (state.kind !== part.kind) return false;
	return part.kind !== "tool-call" || part.id === void 0 || part.id === String(state.id);
}
function assembleFunctionName(current, fragment) {
	if (fragment.length === 0 || fragment.length > 256 || containsControl(fragment)) throw new PrivateTransportError("protocol-drift", "The private tool-call name was invalid");
	if (current === void 0 || current.length === 0) return fragment;
	if (fragment === current) return current;
	if (fragment.startsWith(current)) return fragment;
	const combined = `${current}${fragment}`;
	if (combined.length > 256) throw new PrivateTransportError("protocol-drift", "The private tool-call name exceeded the byte limit");
	return combined;
}
function endBlock(state) {
	if (state.kind === "text") return {
		type: "block-end",
		index: state.index,
		block: {
			type: "text",
			text: state.text
		}
	};
	if (state.kind === "reasoning") return {
		type: "block-end",
		index: state.index,
		block: {
			type: "reasoning",
			text: state.text.trimEnd()
		}
	};
	let parsed;
	try {
		parsed = JSON.parse(state.text);
	} catch {
		throw new PrivateTransportError("protocol-drift", "The private tool-call arguments were incomplete JSON");
	}
	if (!isRecord$5(parsed)) throw new PrivateTransportError("protocol-drift", "The private tool-call arguments were not an object");
	const args = state.text;
	if (state.name === void 0 || !/^[A-Za-z_][A-Za-z0-9_.:-]{0,255}$/u.test(state.name)) throw new PrivateTransportError("protocol-drift", "The private tool-call name was missing or invalid");
	return {
		type: "block-end",
		index: state.index,
		block: {
			type: "tool-call",
			id: state.id,
			name: state.name,
			arguments: args
		}
	};
}
async function buildAntigravityGeneratePayloadForAdapter(options, credential, session, timestamp, attachments) {
	const contents = [];
	const toolNames = /* @__PURE__ */ new Map();
	for (const message of options.messages) {
		if (message.role === "system") continue;
		contents.push(await mapMessageWithAttachments(message, options.model, toolNames, attachments, options.signal, options.provider));
	}
	const payload = buildPayloadFromContents(options, credential, contents);
	const metadata = buildAgyAgentRequestMetadata(session, payload.request, resolveWireModel(options.model, options.reasoningEffort), timestamp);
	const request = payload.request;
	request.labels = metadata.labels;
	request.sessionId = metadata.sessionId;
	orderAgyRequestPayloadInPlace(request);
	return {
		...payload.project === void 0 ? {} : { project: payload.project },
		requestId: metadata.requestId,
		request,
		model: payload.model,
		userAgent: "antigravity",
		requestType: "agent"
	};
}
function groupClaudeFunctionResponses(contents, model) {
	if (antigravityModelFamily(model) !== "claude") return contents;
	const grouped = [];
	let pendingResponses = [];
	const flushResponses = () => {
		if (pendingResponses.length === 0) return;
		grouped.push({
			role: "user",
			parts: pendingResponses
		});
		pendingResponses = [];
	};
	for (const content of contents) {
		const rawParts = Array.isArray(content.parts) ? content.parts : [];
		const responseParts = rawParts.filter((part) => isRecord$5(part) && isRecord$5(part.functionResponse));
		if (content.role === "user" && rawParts.length > 0 && responseParts.length === rawParts.length) {
			pendingResponses.push(...responseParts);
			continue;
		}
		flushResponses();
		grouped.push(content);
	}
	flushResponses();
	return grouped;
}
function buildPayloadFromContents(options, credential, contents) {
	const wireModel = resolveWireModel(options.model, options.reasoningEffort);
	const usesCapturedGemini38ThinkingBudget = /^gemini-3\.8-flash-(?:low|medium|high)$/u.test(wireModel);
	const request = { contents: groupClaudeFunctionResponses(contents, options.model) };
	const systemParts = [...options.system?.trim() ? [{ text: options.system }] : [], ...options.messages.flatMap((message) => message.role === "system" ? message.content.flatMap((block) => block.type === "text" && block.text.trim() ? [{ text: block.text }] : []) : [])];
	if (systemParts.length > 0) request.systemInstruction = { parts: systemParts };
	const generationConfig = {};
	if (options.maxTokens !== void 0) generationConfig.maxOutputTokens = boundedInteger$1(options.maxTokens, 1, 1e6, "maxTokens");
	else if (usesCapturedGemini38ThinkingBudget) generationConfig.maxOutputTokens = 65536;
	if (options.temperature !== void 0) generationConfig.temperature = boundedNumber(options.temperature, -100, 100, "temperature");
	if (options.stop !== void 0) generationConfig.stopSequences = options.stop.slice(0, 16).map((item) => item.slice(0, 256));
	if (options.reasoningEffort !== void 0) generationConfig.thinkingConfig = { thinkingLevel: String(options.reasoningEffort) };
	if (Object.keys(generationConfig).length > 0) request.generationConfig = generationConfig;
	if (options.tools !== void 0 && options.tools.length > 0) {
		const declarations = buildFunctionDeclarations(options.tools);
		if (declarations.length > 0) request.tools = [{ functionDeclarations: declarations }];
	}
	const resolved = resolveModelWithTier(usesCapturedGemini38ThinkingBudget ? wireModel : options.model, { cli_first: false });
	const thinkingLevel = normalizeReasoningEffort(options.reasoningEffort) ?? resolved.thinkingLevel;
	if (wireModel.toLowerCase().includes("claude")) {
		applyClaudeToolHardening(request);
		applyClaudeTransforms(request, {
			model: wireModel,
			...resolved.thinkingBudget === void 0 ? {} : { tierThinkingBudget: resolved.thinkingBudget },
			...options.reasoningEffort === void 0 && resolved.thinkingBudget === void 0 ? {} : { normalizedThinking: {
				includeThoughts: true,
				...resolved.thinkingBudget === void 0 ? {} : { thinkingBudget: resolved.thinkingBudget }
			} },
			cleanJSONSchema: (value) => isRecord$5(value) ? value : {
				type: "object",
				properties: {}
			}
		});
	} else {
		applyGeminiTransforms(request, {
			model: wireModel,
			...thinkingLevel === void 0 || usesCapturedGemini38ThinkingBudget ? {} : { tierThinkingLevel: thinkingLevel },
			...resolved.thinkingBudget === void 0 ? {} : { tierThinkingBudget: resolved.thinkingBudget },
			...options.reasoningEffort === void 0 && resolved.thinkingBudget === void 0 ? {} : { normalizedThinking: {
				includeThoughts: true,
				...resolved.thinkingBudget === void 0 ? {} : { thinkingBudget: resolved.thinkingBudget }
			} }
		});
		if (usesCapturedGemini38ThinkingBudget) {
			const transformedConfig = request.generationConfig;
			if (!isRecord$5(transformedConfig) || typeof resolved.thinkingBudget !== "number") throw new LlmError("The Gemini 3.8 captured thinking configuration could not be resolved", "PROTOCOL_DRIFT");
			transformedConfig.thinkingConfig = {
				includeThoughts: true,
				thinkingBudget: resolved.thinkingBudget
			};
		}
	}
	const project = credential.projectId === "inductive-dreamer-qrkws" || !credential.projectId ? void 0 : credential.projectId;
	return {
		...project === void 0 ? {} : { project },
		model: wireModel,
		request
	};
}
function applyClaudeToolHardening(request) {
	if (!Array.isArray(request.tools) || request.tools.length === 0) return;
	request.tools = request.tools.map((tool) => {
		if (!isRecord$5(tool) || !Array.isArray(tool.functionDeclarations)) return tool;
		return {
			...tool,
			functionDeclarations: tool.functionDeclarations.map((declaration) => hardenClaudeToolDeclaration(declaration))
		};
	});
	const instructionPart = { text: CLAUDE_TOOL_SYSTEM_INSTRUCTION };
	const existing = request.systemInstruction;
	if (isRecord$5(existing) && Array.isArray(existing.parts)) {
		if (existing.parts.some((part) => isRecord$5(part) && typeof part.text === "string" && part.text.includes("CRITICAL TOOL USAGE INSTRUCTIONS"))) return;
		request.systemInstruction = {
			...existing,
			parts: [...existing.parts, instructionPart]
		};
	} else if (typeof existing === "string") request.systemInstruction = {
		role: "user",
		parts: [{ text: existing }, instructionPart]
	};
	else request.systemInstruction = {
		role: "user",
		parts: [instructionPart]
	};
}
function hardenClaudeToolDeclaration(value) {
	if (!isRecord$5(value)) return value;
	const description = typeof value.description === "string" ? value.description : "";
	if (description.includes("STRICT PARAMETERS:")) return value;
	const schema = isRecord$5(value.parameters) ? value.parameters : void 0;
	const properties = schema !== void 0 && isRecord$5(schema.properties) ? schema.properties : void 0;
	if (properties === void 0 || Object.keys(properties).length === 0) return value;
	const required = new Set(Array.isArray(schema?.required) ? schema.required.filter((item) => typeof item === "string") : []);
	const parameters = Object.entries(properties).map(([name, property]) => {
		const requiredHint = required.has(name) ? ", REQUIRED" : "";
		return `${name} (${claudeToolTypeHint(property)}${requiredHint})`;
	});
	return {
		...value,
		description: description + CLAUDE_DESCRIPTION_PROMPT.replace("{params}", parameters.join(", "))
	};
}
function claudeToolTypeHint(value) {
	if (!isRecord$5(value)) return "unknown";
	if (Array.isArray(value.enum)) return value.enum.length <= 5 ? `string ENUM[${value.enum.map((item) => JSON.stringify(item)).join(", ")}]` : `string ENUM[${value.enum.length} options]`;
	const type = typeof value.type === "string" ? value.type : "unknown";
	if (type === "array") {
		if (!isRecord$5(value.items)) return "ARRAY";
		const itemType = typeof value.items.type === "string" ? value.items.type : "unknown";
		if (itemType !== "object") return `ARRAY_OF_${itemType.toUpperCase()}`;
		if (!isRecord$5(value.items.properties)) return "ARRAY_OF_OBJECTS";
		const nestedRequired = new Set(Array.isArray(value.items.required) ? value.items.required.filter((item) => typeof item === "string") : []);
		return `ARRAY_OF_OBJECTS[${Object.entries(value.items.properties).map(([name, property]) => {
			return `${name}: ${isRecord$5(property) && typeof property.type === "string" ? property.type : "unknown"}${nestedRequired.has(name) ? " REQUIRED" : ""}`;
		}).join(", ")}]`;
	}
	if (type === "object" && isRecord$5(value.properties)) {
		const nestedRequired = new Set(Array.isArray(value.required) ? value.required.filter((item) => typeof item === "string") : []);
		return `object{${Object.entries(value.properties).map(([name, property]) => {
			return `${name}: ${isRecord$5(property) && typeof property.type === "string" ? property.type : "unknown"}${nestedRequired.has(name) ? " REQUIRED" : ""}`;
		}).join(", ")}}`;
	}
	return type;
}
function findMessageReasoningSignature(message, replayBlocks) {
	const fromReplay = replayBlocks.find((b) => b.kind === "reasoning" && b.signature !== void 0)?.signature;
	if (fromReplay !== void 0) return fromReplay;
	for (const block of message.content) if (block.type === "reasoning") {
		const sig = block.signature ?? block.thoughtSignature;
		if (typeof sig === "string" && sig.length > 0) return sig;
	}
}
function mapMessage(message, model, toolNames, provider = ANTIGRAVITY_PROVIDER) {
	if (message.role === "tool") return mapToolResult(message, model, toolNames);
	const parts = [];
	const replayBlocks = (message.role === "assistant" ? compatibleReplayState(message, provider, model, contentKinds(message)) : void 0)?.blocks ?? [];
	const messageReasoningSignature = findMessageReasoningSignature(message, replayBlocks);
	const isClaude = antigravityModelFamily(model) === "claude";
	const isGemini = antigravityModelFamily(model) === "gemini";
	let replayIndex = 0;
	let sawClaudeFunctionCall = false;
	for (const block of message.content) {
		const replayKind = block.type === "text" || block.type === "reasoning" || block.type === "tool-call" ? block.type : void 0;
		const replayBlock = replayKind === void 0 ? void 0 : replayBlocks[replayIndex++];
		const replaySignature = replayBlock !== void 0 && replayBlock.kind === replayKind ? replayBlock.signature : void 0;
		const blockSignature = block.signature ?? block.thoughtSignature ?? replaySignature;
		if (block.type === "text") {
			if (block.text.length === 0 && message.content.length > 1) continue;
			parts.push({
				text: block.text,
				...blockSignature === void 0 ? {} : { thoughtSignature: blockSignature }
			});
		} else if (block.type === "reasoning") {
			if (isClaude && blockSignature === void 0) continue;
			parts.push({
				text: block.text,
				thought: true,
				...blockSignature === void 0 ? {} : { thoughtSignature: blockSignature }
			});
		} else if (block.type === "tool-call") {
			const callId = rememberToolName(toolNames, block.id, block.name, isGemini);
			const signature = isClaude ? sawClaudeFunctionCall ? void 0 : blockSignature ?? "skip_thought_signature_validator" : blockSignature ?? messageReasoningSignature ?? "skip_thought_signature_validator";
			sawClaudeFunctionCall ||= isClaude;
			parts.push({
				functionCall: {
					...isClaude ? { id: callId } : {},
					name: block.name,
					args: parseJsonObject(block.arguments)
				},
				...signature === void 0 ? {} : { thoughtSignature: signature }
			});
		} else if (block.type === "image") throw new LlmError("Antigravity text requests do not accept unresolved image blocks", "UNSUPPORTED_MODALITY");
	}
	return {
		role: message.role === "assistant" ? "model" : "user",
		parts
	};
}
async function mapMessageWithAttachments(message, model, toolNames, attachments, signal, provider = ANTIGRAVITY_PROVIDER) {
	if (message.role === "tool" || !message.content.some((block) => block.type === "image")) return mapMessage(message, model, toolNames, provider);
	if (attachments === void 0) throw new LlmError("Antigravity image input requires the Host AttachmentStore", "UNSUPPORTED_MODALITY");
	const replayBlocks = (message.role === "assistant" ? compatibleReplayState(message, provider, model, contentKinds(message)) : void 0)?.blocks ?? [];
	const messageReasoningSignature = findMessageReasoningSignature(message, replayBlocks);
	const parts = [];
	const isClaude = antigravityModelFamily(model) === "claude";
	const isGemini = antigravityModelFamily(model) === "gemini";
	let replayIndex = 0;
	let sawClaudeFunctionCall = false;
	for (const block of message.content) {
		const replayKind = block.type === "text" || block.type === "reasoning" || block.type === "tool-call" ? block.type : void 0;
		const replayBlock = replayKind === void 0 ? void 0 : replayBlocks[replayIndex++];
		const replaySignature = replayBlock !== void 0 && replayBlock.kind === replayKind ? replayBlock.signature : void 0;
		const blockSignature = block.signature ?? block.thoughtSignature ?? replaySignature;
		if (block.type === "image") {
			const stored = await attachments.readImage(block.attachment, signal);
			parts.push({ inlineData: {
				mimeType: stored.ref.mediaType,
				data: Buffer$1.from(stored.data).toString("base64")
			} });
		} else if (block.type === "text") {
			if (block.text.length === 0 && message.content.length > 1) continue;
			parts.push({
				text: block.text,
				...blockSignature === void 0 ? {} : { thoughtSignature: blockSignature }
			});
		} else if (block.type === "reasoning") {
			if (isClaude && blockSignature === void 0) continue;
			parts.push({
				text: block.text,
				thought: true,
				...blockSignature === void 0 ? {} : { thoughtSignature: blockSignature }
			});
		} else if (block.type === "tool-call") {
			const callId = rememberToolName(toolNames, block.id, block.name, isGemini);
			const signature = isClaude ? sawClaudeFunctionCall ? void 0 : blockSignature ?? "skip_thought_signature_validator" : blockSignature ?? messageReasoningSignature ?? "skip_thought_signature_validator";
			sawClaudeFunctionCall ||= isClaude;
			parts.push({
				functionCall: {
					...isClaude ? { id: callId } : {},
					name: block.name,
					args: parseJsonObject(block.arguments)
				},
				...signature === void 0 ? {} : { thoughtSignature: signature }
			});
		}
	}
	return {
		role: message.role === "assistant" ? "model" : "user",
		parts
	};
}
function mapToolResult(message, model, toolNames) {
	const callId = requireToolCallId(message.toolCallId);
	const isClaude = antigravityModelFamily(model) === "claude";
	const name = requireToolName(toolNames, callId, antigravityModelFamily(model) === "gemini");
	return {
		role: "user",
		parts: [{ functionResponse: {
			...isClaude ? { id: callId } : {},
			name,
			response: { content: blocksToText(message.content) }
		} }]
	};
}
function rememberToolName(toolNames, callId, name, isGemini) {
	if (name.length === 0 || name.length > 256 || containsControl(name)) throw new LlmError("The tool call name is invalid", "INVALID_ARGS");
	const id = requireToolCallId(callId);
	const existing = toolNames.get(id);
	if (isGemini && existing !== void 0) throw new LlmError("A tool call id was reused before its prior result", "INVALID_ARGS");
	if (existing !== void 0 && existing !== name) throw new LlmError("A tool call id was reused with a different name", "INVALID_ARGS");
	toolNames.set(id, name);
	return id;
}
function requireToolName(toolNames, callId, isGemini) {
	const id = requireToolCallId(callId);
	const name = toolNames.get(id);
	if (name === void 0) throw new LlmError("A tool result did not match a prior tool call", "INVALID_ARGS");
	if (isGemini) toolNames.delete(id);
	return name;
}
function requireToolCallId(value) {
	if (typeof value !== "string" || value.length === 0 || value.length > 512 || containsControl(value)) throw new LlmError("The tool call id is invalid", "INVALID_ARGS");
	return value;
}
function normalizeReasoningEffort(value) {
	if (value === void 0) return void 0;
	const normalized = String(value).toLowerCase();
	return [
		"minimal",
		"low",
		"medium",
		"high"
	].includes(normalized) ? normalized : void 0;
}
function resolveWireModel(model, reasoningEffort) {
	if (model === "antigravity-gemini-3.7-flash" || model === "gemini-3.7-flash") return "gemini-3-flash";
	const effort = normalizeReasoningEffort(reasoningEffort);
	const resolved = resolveModelWithTier(effort !== void 0 && (model === "antigravity-gemini-3.8-flash" || model === "gemini-3.8-flash") ? `${model}-${effort}` : model, { cli_first: false });
	if (resolved.actualModel.startsWith("gemini-3.7-flash")) return "gemini-3-flash";
	return resolved.actualModel;
}
function requestSessionKey(options) {
	return options.sessionId === void 0 ? "default" : `session:${fnv1a64Signed(String(options.sessionId))}`;
}
function contentKinds(message) {
	return message.content.flatMap((block) => block.type === "text" || block.type === "reasoning" || block.type === "tool-call" ? [block.type] : []);
}
function parseProviderEvent(data) {
	const normalized = data.trim().replace(/^\)\]\}'(?:\r?\n)?/u, "");
	let value;
	try {
		value = JSON.parse(normalized);
	} catch {
		throw new PrivateTransportError("invalid-response", "The private response contained invalid JSON");
	}
	if (!isRecord$5(value)) throw new PrivateTransportError("protocol-drift", "The private response event was not an object");
	if (isRecord$5(value.error)) return {
		parts: [],
		error: errorDetails(value.error)
	};
	const root = isRecord$5(value.response) ? value.response : value;
	if (isRecord$5(root.error)) return {
		parts: [],
		error: errorDetails(root.error)
	};
	const partsValue = findParts(root);
	const responseSignature = responseLevelSignature(root, value, partsValue);
	const parts = [];
	for (const part of partsValue) {
		const parsed = parsePart(part);
		if (parsed === void 0) continue;
		if (parsed.kind === "tool-call" && parsed.signature === void 0 && responseSignature !== void 0) {
			parts.push({
				...parsed,
				signature: responseSignature
			});
			continue;
		}
		parts.push(parsed);
	}
	const usage = parseUsage(root.usageMetadata ?? value.usageMetadata);
	const finish = findFinish(root);
	return {
		parts,
		...usage === void 0 ? {} : { usage },
		...finish === void 0 ? {} : { finish }
	};
}
/** First provider-issued signature carried by the response envelope itself. */
function responseLevelSignature(root, envelope, parts) {
	const direct = signatureOf(root) ?? signatureOf(envelope);
	if (direct !== void 0) return direct;
	if (Array.isArray(root.candidates)) for (const candidate of root.candidates) {
		if (!isRecord$5(candidate)) continue;
		const candidateSignature = signatureOf(candidate) ?? (isRecord$5(candidate.content) ? signatureOf(candidate.content) : void 0) ?? (isRecord$5(candidate.metadata) && isRecord$5(candidate.metadata.google) ? signatureOf(candidate.metadata.google) : void 0);
		if (candidateSignature !== void 0) return candidateSignature;
	}
	if (isRecord$5(root.metadata) && isRecord$5(root.metadata.google)) {
		const nested = signatureOf(root.metadata.google);
		if (nested !== void 0) return nested;
	}
	for (const part of parts) {
		if (!isRecord$5(part)) continue;
		const partSignature = signatureOf(part) ?? (isRecord$5(part.metadata) && isRecord$5(part.metadata.google) ? signatureOf(part.metadata.google) : void 0);
		if (partSignature !== void 0) return partSignature;
	}
}
function findParts(value) {
	if (Array.isArray(value.parts)) return boundedParts(value.parts);
	if (isRecord$5(value.content) && Array.isArray(value.content.parts)) return boundedParts(value.content.parts);
	if (isRecord$5(value.modelTurn) && Array.isArray(value.modelTurn.parts)) return boundedParts(value.modelTurn.parts);
	if (Array.isArray(value.candidates)) {
		const output = [];
		for (const candidate of value.candidates) {
			if (!isRecord$5(candidate)) continue;
			const content = isRecord$5(candidate.content) ? candidate.content : candidate;
			if (Array.isArray(content.parts)) {
				if (output.length + content.parts.length > MAX_PROVIDER_PARTS) throw new PrivateTransportError("protocol-drift", "The private response contained too many parts");
				output.push(...content.parts);
			}
		}
		return output;
	}
	if (isRecord$5(value.serverContent) && isRecord$5(value.serverContent.modelTurn) && Array.isArray(value.serverContent.modelTurn.parts)) return boundedParts(value.serverContent.modelTurn.parts);
	return [];
}
function boundedParts(value) {
	if (value.length > MAX_PROVIDER_PARTS) throw new PrivateTransportError("protocol-drift", "The private response contained too many parts");
	return value;
}
function parsePart(value) {
	if (!isRecord$5(value)) throw new PrivateTransportError("protocol-drift", "The private response part was malformed");
	const functionCall = isRecord$5(value.functionCall) ? value.functionCall : isRecord$5(value.function_call) ? value.function_call : void 0;
	if (functionCall !== void 0) {
		const name = stringValue(functionCall.name);
		const id = stringValue(functionCall.id);
		const signature = signatureOf(value) ?? signatureOf(functionCall);
		const args = typeof functionCall.args === "string" ? functionCall.args : JSON.stringify(functionCall.args ?? {});
		return {
			kind: "tool-call",
			...name === void 0 ? {} : { name },
			...id === void 0 ? {} : { id },
			arguments: args,
			...signature === void 0 ? {} : { signature }
		};
	}
	if (typeof value.text === "string" || signatureOf(value) !== void 0) {
		const kind = value.thought === true || value.reasoning === true || value.thinking === true ? "reasoning" : "text";
		const signature = signatureOf(value);
		const text = typeof value.text === "string" ? value.text : "";
		if (kind === "text" && text.length === 0 && signature === void 0) return;
		return {
			kind,
			text,
			...signature === void 0 ? {} : { signature }
		};
	}
	if (value.inlineData !== void 0 || value.inline_data !== void 0) throw new PrivateTransportError("protocol-drift", "The text model returned unsupported media output");
	throw new PrivateTransportError("protocol-drift", "The private response contained an unknown part type");
}
function errorDetails(value) {
	const status = numberValue(value.status);
	const code = stringValue(value.code);
	const contextWindowExceeded = providerErrorReportsContextWindowExceeded(value, 0);
	return {
		...status === void 0 ? {} : { status },
		...code === void 0 ? {} : { code },
		...contextWindowExceeded ? { contextWindowExceeded: true } : {}
	};
}
async function responseReportsContextWindowExceeded(response, options) {
	try {
		for await (const event of iteratePrivateSse(response, {
			...options.signal === void 0 ? {} : { signal: options.signal },
			idleTimeoutMs: options.idleTimeoutMs,
			totalTimeoutMs: options.totalTimeoutMs,
			maxBytes: Math.min(MAX_PROVIDER_ERROR_BYTES, options.maxResponseBytes),
			maxFrameBytes: Math.min(MAX_PROVIDER_ERROR_FRAME_BYTES, options.maxFrameBytes)
		})) if (providerErrorEnvelopeReportsContextWindowExceeded(event.data.replace(/^\)\]\}'(?:\r?\n)?/u, ""), 0)) return true;
		return false;
	} catch (error) {
		if (error instanceof PrivateTransportError && error.code === "cancelled") throw toLlmError(error);
		if (isAborted(options.signal)) throw new LlmError("The Antigravity request was cancelled", "CANCELLED");
		return false;
	}
}
/**
* Detect the provider's capacity-exhaustion verdict on an HTTP 503 body.
*
* The endpoint reports `MODEL_CAPACITY_EXHAUSTED` ("No capacity available for
* model X on the server") as HTTP 503. That is a momentary capacity blip on one
* model tier rather than a defect in the request, so the caller can wait and
* resend instead of failing the turn.
*
* This probe only inspects the body; the caller is responsible for pinning the
* status to 503 first. A 429 carrying the same marker is a rate-limit verdict
* and must not be resent.
* @param response - the private endpoint response, still unread.
* @param options - bounded read limits shared with the context-window probe.
* @returns whether the body declares capacity exhaustion.
*/
async function responseReportsModelCapacityExhausted(response, options) {
	try {
		for await (const event of iteratePrivateSse(response, {
			...options.signal === void 0 ? {} : { signal: options.signal },
			idleTimeoutMs: options.idleTimeoutMs,
			totalTimeoutMs: options.totalTimeoutMs,
			maxBytes: Math.min(MAX_PROVIDER_ERROR_BYTES, options.maxResponseBytes),
			maxFrameBytes: Math.min(MAX_PROVIDER_ERROR_FRAME_BYTES, options.maxFrameBytes)
		})) if (event.data.includes("MODEL_CAPACITY_EXHAUSTED") || event.data.includes("No capacity available")) return true;
		return false;
	} catch (error) {
		if (error instanceof PrivateTransportError && error.code === "cancelled") throw toLlmError(error);
		if (isAborted(options.signal)) throw new LlmError("The Antigravity request was cancelled", "CANCELLED");
		return false;
	}
}
/** Bounded exponential backoff between capacity retries. */
function backoffDelayMs(attempt) {
	const base = CAPACITY_RETRY_BASE_DELAY_MS * 2 ** Math.max(0, attempt - 1);
	const jitter = Math.floor(Math.random() * 250);
	return Math.min(base + jitter, CAPACITY_RETRY_MAX_DELAY_MS);
}
/** Abort-aware sleep so a cancelled turn never waits out a cooldown. */
function sleep(ms, signal) {
	if (signal === void 0) return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
	return new Promise((resolve) => {
		const timer = setTimeout(() => {
			signal.removeEventListener("abort", onAbort);
			resolve();
		}, ms);
		const onAbort = () => {
			clearTimeout(timer);
			resolve();
		};
		if (signal.aborted) {
			clearTimeout(timer);
			resolve();
			return;
		}
		signal.addEventListener("abort", onAbort, { once: true });
	});
}
function providerErrorReportsContextWindowExceeded(value, depth) {
	if (depth > MAX_PROVIDER_ERROR_JSON_DEPTH) return false;
	if (typeof value.message === "string") {
		if (isExactContextWindowExceededMessage(value.message)) return true;
		if (providerErrorEnvelopeReportsContextWindowExceeded(value.message, depth + 1)) return true;
	}
	return isRecord$5(value.error) && providerErrorReportsContextWindowExceeded(value.error, depth + 1);
}
function providerErrorEnvelopeReportsContextWindowExceeded(value, depth) {
	if (depth > MAX_PROVIDER_ERROR_JSON_DEPTH || value.length === 0 || value.length > MAX_PROVIDER_ERROR_BYTES) return false;
	const json = value.trim();
	if (!json.startsWith("{") || !jsonDepthIsBounded(json, MAX_PROVIDER_ERROR_JSON_DEPTH)) return false;
	try {
		const parsed = JSON.parse(json);
		return isRecord$5(parsed) && isRecord$5(parsed.error) ? providerErrorReportsContextWindowExceeded(parsed.error, depth + 1) : false;
	} catch {
		return false;
	}
}
function isExactContextWindowExceededMessage(value) {
	const match = /^prompt is too long: ([0-9]{1,16}) tokens > ([0-9]{1,16}) maximum$/u.exec(value);
	const actual = match?.[1];
	const maximum = match?.[2];
	return actual !== void 0 && maximum !== void 0 && BigInt(actual) > BigInt(maximum);
}
function jsonDepthIsBounded(value, maxDepth) {
	let depth = 0;
	let inString = false;
	let escaped = false;
	for (const character of value) {
		if (inString) {
			if (escaped) escaped = false;
			else if (character === "\\") escaped = true;
			else if (character === "\"") inString = false;
			continue;
		}
		if (character === "\"") {
			inString = true;
			continue;
		}
		if (character === "{" || character === "[") {
			depth += 1;
			if (depth > maxDepth) return false;
		} else if (character === "}" || character === "]") {
			depth -= 1;
			if (depth < 0) return false;
		}
	}
	return depth === 0 && !inString && !escaped;
}
function contextWindowExceededError(status) {
	const message = "The Antigravity request exceeded the model context window";
	return status === void 0 ? new LlmError(message, CONTEXT_WINDOW_EXCEEDED_CODE) : new LlmError(message, CONTEXT_WINDOW_EXCEEDED_CODE, { status });
}
function parseUsage(value) {
	if (!isRecord$5(value)) return void 0;
	const totalPrompt = numberValue(value.promptTokenCount);
	const input = totalPrompt ?? numberValue(value.inputTokenCount);
	const output = numberValue(value.candidatesTokenCount ?? value.outputTokenCount);
	const reasoning = numberValue(value.thoughtsTokenCount ?? value.reasoningTokenCount);
	const cached = numberValue(value.cachedContentTokenCount ?? value.cacheReadTokens);
	if (input === void 0 && output === void 0 && reasoning === void 0 && cached === void 0) return void 0;
	return {
		inputTokens: totalPrompt !== void 0 && cached !== void 0 ? Math.max(0, totalPrompt - cached) : input ?? 0,
		outputTokens: output ?? 0,
		...cached === void 0 ? {} : { cacheReadTokens: cached },
		...reasoning === void 0 ? {} : { reasoningTokens: reasoning }
	};
}
function findFinish(value) {
	const candidate = value.finishReason ?? value.finish_reason;
	if (typeof candidate === "string") return candidate;
	if (isRecord$5(value.serverContent) && typeof value.serverContent.finishReason === "string") return value.serverContent.finishReason;
	if (Array.isArray(value.candidates)) {
		for (const item of value.candidates) if (isRecord$5(item) && typeof item.finishReason === "string") return item.finishReason;
	}
}
function signatureOf(value) {
	const direct = stringValue(value.thoughtSignature ?? value.thought_signature ?? value.signature);
	if (direct !== void 0) return direct;
	const metadata = isRecord$5(value.metadata) ? value.metadata : void 0;
	const google = metadata !== void 0 && isRecord$5(metadata.google) ? metadata.google : void 0;
	return google === void 0 ? void 0 : stringValue(google.thoughtSignature ?? google.thought_signature ?? google.signature);
}
function parseJsonObject(value) {
	if (typeof value !== "string" || value.trim().length === 0) return {};
	try {
		const parsed = JSON.parse(value);
		if (isRecord$5(parsed)) return parsed;
	} catch {
		const repaired = repairTruncatedJsonObject(value);
		if (repaired !== void 0) return repaired;
	}
	return {};
}
/** Recover a truncated JSON object body; undefined when it is not safely repairable. */
function repairTruncatedJsonObject(value) {
	const trimmed = value.trim();
	if (!trimmed.startsWith("{")) return void 0;
	let inString = false;
	let escaped = false;
	for (const character of trimmed) {
		if (inString) {
			if (escaped) escaped = false;
			else if (character === "\\") escaped = true;
			else if (character === "\"") inString = false;
			continue;
		}
		if (character === "\"") inString = true;
	}
	if (inString || escaped) return void 0;
	const suffix = closingSuffix(trimmed);
	if (suffix.length === 0) return void 0;
	try {
		const parsed = JSON.parse(`${trimmed}${suffix}`);
		return isRecord$5(parsed) ? parsed : void 0;
	} catch {
		return;
	}
}
/** Structural closing characters needed to balance a truncated JSON object body. */
function closingSuffix(value) {
	const stack = [];
	let inString = false;
	let escaped = false;
	for (const character of value) {
		if (inString) {
			if (escaped) escaped = false;
			else if (character === "\\") escaped = true;
			else if (character === "\"") inString = false;
			continue;
		}
		if (character === "\"") inString = true;
		else if (character === "{") stack.push("}");
		else if (character === "[") stack.push("]");
		else if (character === "}" || character === "]") stack.pop();
	}
	return stack.reverse().join("");
}
function blocksToText(blocks) {
	return blocks.filter((block) => block.type === "text" && typeof block.text === "string").map((block) => block.text).join("\n").slice(0, 65536);
}
function isAuthenticationCode(value) {
	const normalized = value?.toUpperCase();
	return normalized === "UNAUTHENTICATED" || normalized === "AUTHENTICATION" || normalized === "INVALID_GRANT" || normalized === "UNAUTHENTICATED_REQUEST";
}
function mapFinishReason(value) {
	const normalized = value?.toUpperCase();
	if (normalized === "MAX_TOKENS" || normalized === "LENGTH") return "max-tokens";
	if (normalized === "SAFETY" || normalized === "BLOCKLIST" || normalized === "ERROR") return "error";
	if (normalized === "TOOL_CALLS" || normalized === "FUNCTION_CALL") return "tool-calls";
	return "stop";
}
function finishChunk(kind, code, status, replayState) {
	return {
		type: "finish",
		reason: kind === "aborted" ? {
			kind: "aborted",
			failure: {
				code,
				message: "The Antigravity request was cancelled"
			}
		} : kind === "error" ? {
			kind: "error",
			failure: {
				code,
				message: "The Antigravity provider request failed",
				...status === void 0 ? {} : { status }
			}
		} : kind === "max-tokens" ? { kind: "max-tokens" } : kind === "tool-calls" ? { kind: "tool-calls" } : { kind: "stop" },
		...replayState === void 0 ? {} : { replayState }
	};
}
const LLM_FAILURE_CODES = {
	authentication: "AUTH",
	forbidden: "FORBIDDEN",
	"rate-limited": "RATE_LIMIT",
	cancelled: "CANCELLED",
	timeout: "TIMEOUT",
	"attribution-rejected": "GATE_0_ATTRIBUTION",
	"protocol-drift": "PROTOCOL_DRIFT",
	"response-limit": "RESPONSE_LIMIT",
	"request-limit": "REQUEST_LIMIT",
	upstream: "UPSTREAM",
	network: "NETWORK",
	failed: "PROVIDER_ERROR"
};
function canFallBackToPinnedTextSnapshot(error) {
	if (!(error instanceof LlmError)) return false;
	return error.code === "RATE_LIMIT" || error.code === "TIMEOUT" || error.code === "PROTOCOL_DRIFT" || error.code === "RESPONSE_LIMIT" || error.code === "UPSTREAM" || error.code === "NETWORK";
}
function toModelCatalogError(error, signal, fallback) {
	if (isAborted(signal)) return new LlmError("The Antigravity live model catalog request was cancelled", "CANCELLED");
	if (error instanceof LlmError) return error;
	if (error instanceof PrivateTransportError || fallback === "provider") return toLlmError(error);
	return new LlmError("The Antigravity live model catalog did not match the audited schema", "PROTOCOL_DRIFT");
}
const LLM_FAILURE_MESSAGES = {
	authentication: "The Antigravity private request failed: authentication required",
	forbidden: "The Antigravity private request failed: this account is forbidden",
	"rate-limited": "Antigravity rate limit reached (Google returned 429 Resource Exhausted); please wait for your quota window to refresh",
	cancelled: "The Antigravity private request was cancelled",
	timeout: "The Antigravity private request timed out",
	"attribution-rejected": "The Antigravity private request failed: identity attribution was rejected",
	"protocol-drift": "The Antigravity private request was rejected (protocol drift)",
	"response-limit": "The Antigravity private response exceeded the byte limit",
	"request-limit": "The Antigravity private request exceeded the byte limit",
	upstream: "The Antigravity private endpoint is unavailable",
	network: "The Antigravity private request could not be reached",
	failed: "The Antigravity private request failed safely"
};
function toLlmError(error) {
	if (error instanceof LlmError) return error;
	if (error instanceof PrivateTransportError) {
		const kind = classifyPrivateFailure(error);
		const code = LLM_FAILURE_CODES[kind];
		const base = LLM_FAILURE_MESSAGES[kind];
		const message = error.status === void 0 ? base : `${base} (HTTP ${String(error.status)})`;
		return error.status === void 0 ? new LlmError(message, code) : new LlmError(message, code, { status: error.status });
	}
	return new LlmError("The Antigravity provider request failed safely", "PROVIDER_ERROR");
}
function boundedTimeout(value, fallback) {
	return value === void 0 || !Number.isFinite(value) || value <= 0 ? fallback : Math.min(Math.floor(value), 6e5);
}
function boundedLimit(value, fallback) {
	return value === void 0 || !Number.isFinite(value) || value <= 0 ? fallback : Math.min(Math.floor(value), fallback);
}
function boundedInteger$1(value, min, max, field) {
	if (!Number.isSafeInteger(value) || value < min || value > max) throw new LlmError(`The Antigravity ${field} option is invalid`, "INVALID_OPTIONS");
	return value;
}
function boundedNumber(value, min, max, field) {
	if (!Number.isFinite(value) || value < min || value > max) throw new LlmError(`The Antigravity ${field} option is invalid`, "INVALID_OPTIONS");
	return value;
}
function numberValue(value) {
	return typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= Number.MAX_SAFE_INTEGER ? value : void 0;
}
function stringValue(value) {
	return typeof value === "string" && value.length > 0 && value.length <= 16384 && !containsControl(value) ? value : void 0;
}
function safeProviderErrorCode(value) {
	const normalized = value?.toUpperCase();
	return normalized === "SAFETY" || normalized === "BLOCKED" || normalized === "RESOURCE_EXHAUSTED" || normalized === "INVALID_ARGUMENT" ? normalized : "UPSTREAM_ERROR";
}
function safeProviderStatus(value) {
	return value !== void 0 && Number.isInteger(value) && value >= 400 && value <= 599 ? value : void 0;
}
async function cancelResponse(response) {
	try {
		await response.body?.cancel();
	} catch {}
}
function isAborted(signal) {
	return signal !== void 0 && signal.aborted;
}
function isRecord$5(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
//#endregion
//#region direct/legacy/src/account-routes.ts
/** Plugin-owned account RPC carried by Connection's authenticated /api routes. */
/** Register exact routes without creating a separate physical RPC carrier. */
function registerAccountRoutes(connection, namespace, endpoints, handler) {
	const disposers = endpoints.map((endpoint) => connection.fetch.register({
		path: `/api/${namespace}/${endpoint}`,
		methods: ["POST"],
		requestBody: "buffered",
		fetch: async (request) => {
			const admission = connection.admit(request);
			if ("rejection" in admission) return new Response(admission.rejection === 401 ? "unauthorized" : "forbidden", { status: admission.rejection });
			if (request.headers.get("content-type")?.split(";", 1)[0]?.trim().toLowerCase() !== "application/json") return new Response("content type must be application/json", { status: 415 });
			let body;
			try {
				body = await request.json();
			} catch {
				return new Response("invalid JSON", { status: 400 });
			}
			const envelope = clientRequestSchema.safeParse(body);
			if (!envelope.success) return new Response("invalid account request", { status: 400 });
			const { rpcId, method, payload } = envelope.data;
			const failure = (code, message) => ({
				ok: false,
				error: {
					code,
					message,
					details: {}
				}
			});
			let result;
			try {
				result = method === `${namespace}/${endpoint}` ? await handler(endpoint, payload, request.signal, admission.peer) : failure("bad-request", "Account request method does not match its endpoint");
			} catch {
				result = failure("internal", "Account request failed");
			}
			return Response.json({
				type: "server-response",
				rpcId,
				result
			});
		}
	}));
	return async () => {
		await Promise.all(disposers.map((dispose) => dispose()));
	};
}
//#endregion
//#region direct/legacy/src/rpc-vocabulary.ts
/** Closed, browser-safe RPC error vocabulary shared by Host and client. */
const OPERATION_ERROR_CODES = [
	"loopback-required",
	"invalid-grant",
	"network",
	"timeout",
	"rate-limited",
	"server-error",
	"http-error",
	"invalid-response",
	"conflict",
	"storage"
];
const SAFE_RPC_ERROR_CODES = [
	"bad-request",
	...LOGIN_ERROR_CODES,
	...OPERATION_ERROR_CODES
];
const SAFE_RPC_ERROR_MESSAGES = Object.freeze({
	"bad-request": "antigravity-auth: invalid request",
	"client-not-configured": "Set AGY_CLIENT_ID and AGY_CLIENT_SECRET in the DSH host environment",
	"loopback-required": "Antigravity account controls require a loopback-bound DSH Host",
	cancelled: "The operation was cancelled",
	"risk-acknowledgement-required": "Risk acknowledgement is required before login",
	"port-conflict": "The fixed OAuth callback port is already in use",
	"invalid-method": "The OAuth callback method is not accepted",
	"invalid-path": "The OAuth callback path is not accepted",
	"invalid-host": "The OAuth callback host is not accepted",
	"duplicate-parameter": "The OAuth callback contains duplicate parameters",
	"invalid-parameters": "The OAuth callback parameters are not accepted",
	"missing-state": "The OAuth callback state is missing",
	"state-mismatch": "The OAuth callback state was not accepted",
	"missing-code": "The OAuth callback code is missing",
	"oauth-error": "The OAuth provider rejected authorization",
	expired: "The OAuth login expired",
	"no-pending-flow": "There is no pending OAuth login",
	"project-unavailable": "No usable project is available for this account",
	"project-authentication-failed": "The Antigravity project probe requires authentication",
	"project-forbidden": "The Antigravity project probe was forbidden",
	"project-rate-limited": "The Antigravity project probe is rate-limited",
	"project-offline": "The Antigravity project probe is offline",
	"project-malformed": "The Antigravity project response was malformed",
	"project-protocol-drift": "The Antigravity project protocol changed",
	"project-validation-failed": "Project validation failed",
	"credential-conflict": "The login changed while it was completing",
	"persistence-failed": "The login could not be saved",
	"token-exchange-failed": "The authorization code could not be exchanged",
	"invalid-callback-url": "The callback URL is invalid",
	"invalid-grant": "The account must be authenticated again",
	network: "The operation could not reach the provider",
	timeout: "The operation timed out",
	"rate-limited": "The operation is rate-limited",
	"server-error": "The provider is unavailable",
	"http-error": "The provider rejected the operation",
	"invalid-response": "The provider response was not accepted",
	conflict: "The account changed while the operation was running",
	storage: "The local account state could not be updated"
});
function isSafeRpcErrorCode(value) {
	return typeof value === "string" && SAFE_RPC_ERROR_CODES.includes(value);
}
function safeRpcErrorMessage(code) {
	return SAFE_RPC_ERROR_MESSAGES[code] ?? "antigravity-auth: operation failed";
}
//#endregion
//#region direct/legacy/src/rpc-contract.ts
const ANTIGRAVITY_AUTH_RPC_NAMESPACE = "antigravity-auth";
//#endregion
//#region direct/legacy/src/rpc.ts
/** Dispatch closed, value-safe requests; callback URLs are never echoed. */
async function handleAntigravityAuthRpc(service, endpoint, payload, signal, modelCatalog, opener) {
	if (signal?.aborted === true) return cancelled();
	try {
		if (endpoint === "status") {
			if (!isEmptyRecord(payload)) return badRequest("status expects an empty payload");
			return {
				ok: true,
				value: { status: await service.status() }
			};
		}
		if (endpoint === "models") {
			if (!isRefreshPayload(payload)) return badRequest("models expects {} or { force: boolean }");
			if (modelCatalog === void 0) return badRequest("model catalog is unavailable");
			const status = await service.status();
			return {
				ok: true,
				value: status.login.projectAvailable && status.capabilities.some((capability) => capability.id === "auth-llm" && capability.state === "available") ? await modelCatalog.modelCatalog(signal, payload.force) : modelCatalog.catalogSnapshot()
			};
		}
		if (endpoint === "usage") {
			if (!isRefreshPayload(payload)) return badRequest("usage expects {} or { force: boolean }");
			if (service.usage === void 0) return {
				ok: true,
				value: { state: "protocol-drift" }
			};
			return {
				ok: true,
				value: await service.usage(signal, payload.force)
			};
		}
		if (endpoint === "accounts") {
			if (!isEmptyRecord(payload) || !service.listAccounts) return badRequest("accounts unavailable");
			return {
				ok: true,
				value: { accounts: (await service.listAccounts({ backfill: false })).accounts.map((account) => ({
					id: account.id,
					index: account.index,
					isActive: account.isActive,
					...account.maskedEmail || account.email ? { maskedEmail: account.maskedEmail ?? maskEmail(account.email) } : {}
				})) }
			};
		}
		if (endpoint === "switch-account" || endpoint === "remove-account") {
			if (!isAccountIdPayload(payload)) return badRequest("invalid account id");
			const operation = endpoint === "switch-account" ? service.switchAccount : service.removeAccount;
			if (!operation) return badRequest("account operation unavailable");
			return (await operation.call(service, payload.id)).ok ? {
				ok: true,
				value: { success: true }
			} : badRequest("account not found");
		}
		if (endpoint === "acknowledge-risk") {
			if (!isAcknowledgement(payload)) return badRequest("acknowledge-risk expects { acknowledge: true }");
			return {
				ok: true,
				value: await service.acknowledgeRisk()
			};
		}
		if (endpoint === "login") {
			if (!isEmptyRecord(payload)) return badRequest("login expects an empty payload");
			const result = await service.startLogin();
			if (typeof opener === "function") Promise.resolve().then(() => opener(result.authorizationUrl)).catch(() => false);
			return {
				ok: true,
				value: result
			};
		}
		if (endpoint === "cancel" || endpoint === "cancel-login") {
			if (!isEmptyRecord(payload)) return badRequest("cancel expects an empty payload");
			return {
				ok: true,
				value: await service.cancelLogin()
			};
		}
		if (endpoint === "logout") {
			if (!isEmptyRecord(payload)) return badRequest("logout expects an empty payload");
			return {
				ok: true,
				value: await service.logout()
			};
		}
		if (endpoint === "revoke") {
			if (!isRevokePayload(payload)) return badRequest("revoke expects { confirmed: true }");
			return {
				ok: true,
				value: await service.revoke(true, signal)
			};
		}
		return badRequest("unknown Antigravity auth endpoint");
	} catch (error) {
		return safeFailure(error);
	}
}
function badRequest(message) {
	return {
		ok: false,
		error: {
			code: "bad-request",
			message,
			details: { issues: [] }
		}
	};
}
function cancelled() {
	return {
		ok: false,
		error: {
			code: "cancelled",
			message: "antigravity-auth: request cancelled",
			details: {}
		}
	};
}
function safeFailure(error) {
	const credentialError = error instanceof CredentialOperationError ? error : void 0;
	const candidate = error instanceof OAuthFlowError ? error.code : credentialError?.code ?? "internal";
	const code = isSafeRpcErrorCode(candidate) ? candidate : "internal";
	return {
		ok: false,
		error: {
			code,
			message: credentialError === void 0 ? safeRpcErrorMessage(code) : credentialErrorMessage(credentialError.code) ?? safeRpcErrorMessage(code),
			details: {}
		}
	};
}
function isEmptyRecord(value) {
	return isRecord$4(value) && Object.keys(value).length === 0;
}
function isAccountIdPayload(value) {
	return isRecord$4(value) && Object.keys(value).length === 1 && typeof value.id === "string" && /^acc_[1-9][0-9]{0,11}$/.test(value.id);
}
function isRefreshPayload(value) {
	return isRecord$4(value) && Object.keys(value).every((key) => key === "force") && (value.force === void 0 || typeof value.force === "boolean");
}
function isAcknowledgement(value) {
	return isRecord$4(value) && Object.keys(value).length === 1 && value.acknowledge === true;
}
function isRevokePayload(value) {
	return isRecord$4(value) && Object.keys(value).length === 1 && value.confirmed === true;
}
function isRecord$4(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
//#endregion
//#region direct/legacy/src/capability-lifecycle.ts
/** Register a capability set atomically and dispose every owned member best-effort. */
function registerCapabilitySet(values, register) {
	const disposers = [];
	const disposeAll = () => {
		for (const dispose of disposers.splice(0).reverse()) try {
			dispose();
		} catch {}
	};
	try {
		for (const value of values) disposers.push(register(value));
	} catch (error) {
		disposeAll();
		throw error;
	}
	return disposeAll;
}
function mountCapabilityLifecycle(options) {
	let gateReady = false;
	let registration;
	let generation = 0;
	let disposed = false;
	const sync = () => {
		if (disposed) return;
		const shouldRegister = options.enabled() && gateReady;
		if (shouldRegister && registration === void 0) try {
			registration = options.register();
		} catch {
			gateReady = false;
		}
		else if (!shouldRegister && registration !== void 0) {
			const dispose = registration;
			registration = void 0;
			try {
				dispose();
			} catch {}
		}
	};
	const refresh = async () => {
		const currentGeneration = ++generation;
		let ready = false;
		try {
			const status = await options.auth.status();
			ready = status.login.projectAvailable && status.capabilities.some((capability) => capability.id === options.id && capability.state === "available");
		} catch {
			ready = false;
		}
		if (disposed || currentGeneration !== generation) return;
		gateReady = ready;
		sync();
	};
	const unwatch = options.auth.watchStatus?.(() => {
		refresh();
	}) ?? (() => {});
	options.ctx.effect?.(() => async () => {
		if (disposed) return;
		disposed = true;
		generation += 1;
		try {
			unwatch();
		} finally {
			const dispose = registration;
			registration = void 0;
			try {
				dispose?.();
			} finally {
				try {
					await options.cleanup?.();
				} finally {
					if (options.ownsAuth) await options.auth.dispose?.();
				}
			}
		}
	}, options.label);
	sync();
	refresh();
	return {
		sync,
		refresh
	};
}
//#endregion
//#region direct/legacy/src/media-admission.ts
/** Shared Host-only media admission for image editing and the video POC. */
const DEFAULT_VIDEO_BYTES = 33554432;
const IMAGE_HANDLE_PATTERN = /^image:[^\s\p{C}]{1,256}$/u;
var MediaAdmissionError = class extends HarnessError {
	constructor(message, code, options = {}) {
		super(message, code, options);
	}
};
function imageHandle(ref) {
	return `image:${String(ref.attachmentId)}`;
}
/** Admit bounded, canonical image bytes and let AttachmentStore perform full decode validation. */
async function admitImageBytes(options, data, source, name = "antigravity-image", signal) {
	throwIfAborted(signal);
	const limits = options.attachments.imageLimits;
	if (data.byteLength === 0 || data.byteLength > limits.maxImageBytes) throw new MediaAdmissionError("The image exceeds the deployment byte limit", "MEDIA_IMAGE_TOO_LARGE");
	const mediaType = detectImageMediaType(data);
	if (mediaType === void 0 || !limits.mediaTypes.includes(mediaType)) throw new MediaAdmissionError("The image media type or magic bytes are not supported", "MEDIA_IMAGE_INVALID");
	const input = {
		data,
		mediaType,
		name: safeName(name)
	};
	try {
		await options.attachments.validateImage(input);
	} catch {
		throw new MediaAdmissionError("The image failed AttachmentStore admission", "MEDIA_IMAGE_INVALID");
	}
	return {
		kind: "image",
		input,
		source
	};
}
async function admitBase64Image(options, encoded, source = "inline", name, signal) {
	const maxEncoded = Math.ceil(options.attachments.imageLimits.maxImageBytes / 3) * 4 + 4;
	if (encoded.length === 0 || encoded.length > maxEncoded || !isCanonicalBase64(encoded)) throw new MediaAdmissionError("The encoded image is not bounded canonical base64", "MEDIA_IMAGE_INVALID");
	let data;
	try {
		data = new Uint8Array(Buffer$1.from(encoded, "base64"));
	} catch {
		throw new MediaAdmissionError("The encoded image could not be decoded", "MEDIA_IMAGE_INVALID");
	}
	return admitImageBytes(options, data, source, name, signal);
}
/** Resolve one explicit session handle from durable session history; handles are not bearer capabilities. */
async function admitSessionImage(options, agent, handle, signal) {
	throwIfAborted(signal);
	if (!IMAGE_HANDLE_PATTERN.test(handle)) throw new MediaAdmissionError("The image handle is invalid", "MEDIA_HANDLE_INVALID");
	const ref = authorizedSessionImages(agent).get(handle);
	if (ref === void 0) throw new MediaAdmissionError("The image handle is not authorized by this session", "MEDIA_HANDLE_UNAUTHORIZED");
	try {
		const stored = await options.attachments.readImage(ref, signal);
		return {
			kind: "image",
			input: {
				data: stored.data,
				mediaType: stored.ref.mediaType,
				...stored.ref.name === void 0 ? {} : { name: stored.ref.name }
			},
			stored,
			source: "session"
		};
	} catch {
		throw new MediaAdmissionError("The authorized image could not be read", "MEDIA_IMAGE_READ_FAILED");
	}
}
/** Resolve an image only after containment and regular-file checks, then admit its bytes. */
async function admitWorkspaceImage(options, workspace, path, signal) {
	throwIfAborted(signal);
	if (path.length === 0 || path.length > 4096 || /^https?:\/\//iu.test(path)) throw new MediaAdmissionError("The workspace image reference is invalid", "MEDIA_WORKSPACE_INVALID");
	return admitImageBytes(options, await readStableWorkspaceBytes(options.fs, workspace, path, options.attachments.imageLimits.maxImageBytes, "image", signal), "workspace", basename$1(path), signal);
}
/** Admit an MP4 container without claiming native video attachment support. */
async function admitWorkspaceVideo(options, workspace, path, signal) {
	throwIfAborted(signal);
	if (path.length === 0 || path.length > 4096 || /^https?:\/\//iu.test(path)) throw new MediaAdmissionError("The workspace video reference is invalid", "MEDIA_VIDEO_INVALID");
	const maxBytes = positive(options.maxVideoBytes, DEFAULT_VIDEO_BYTES);
	const data = await readStableWorkspaceBytes(options.fs, workspace, path, maxBytes, "video", signal);
	if (data.byteLength === 0 || data.byteLength > maxBytes || !isMp4(data)) throw new MediaAdmissionError("The workspace file is not a bounded MP4 video", "MEDIA_VIDEO_INVALID");
	return {
		kind: "video",
		data,
		mediaType: "video/mp4"
	};
}
async function readStableWorkspaceBytes(fs, workspace, path, maxBytes, kind, signal) {
	const symlinkCode = kind === "image" ? "MEDIA_WORKSPACE_SYMLINK" : "MEDIA_VIDEO_SYMLINK";
	const regularCode = kind === "image" ? "MEDIA_WORKSPACE_NOT_REGULAR" : "MEDIA_VIDEO_NOT_REGULAR";
	const containmentCode = kind === "image" ? "MEDIA_WORKSPACE_CONTAINMENT" : "MEDIA_VIDEO_CONTAINMENT";
	const changedCode = kind === "image" ? "MEDIA_WORKSPACE_CHANGED" : "MEDIA_VIDEO_CHANGED";
	const initialPath = await fs.lstat(path, { cwd: workspace }, signal);
	if (initialPath?.type === "symlink") throw new MediaAdmissionError(`The workspace ${kind} is a symbolic link`, symlinkCode);
	if (initialPath === void 0 || initialPath.type !== "file") throw new MediaAdmissionError(`The workspace ${kind} is not a regular file`, regularCode);
	const root = await fs.resolve(workspace, fsResolveOptions(workspace, signal));
	const target = await fs.resolve(path, fsResolveOptions(workspace, signal));
	if (!fs.contains(root, target)) throw new MediaAdmissionError(`The workspace ${kind} is outside the active workspace`, containmentCode);
	const before = await fs.stat(target, signal);
	if (before === void 0 || before.type !== "file") throw new MediaAdmissionError(`The workspace ${kind} is not a regular file`, regularCode);
	if (before.version !== initialPath.version) throw new MediaAdmissionError(`The workspace ${kind} changed before it could be read`, changedCode);
	const data = await fs.readBytes(target, signal, maxBytes);
	const finalPath = await fs.lstat(path, { cwd: workspace }, signal);
	const finalTarget = await fs.resolve(path, fsResolveOptions(workspace, signal));
	const after = await fs.stat(target, signal);
	if (finalPath === void 0 || finalPath.type !== "file" || finalPath.version !== initialPath.version || finalTarget.targetKey !== target.targetKey || !fs.contains(root, finalTarget) || after === void 0 || after.type !== "file" || after.version !== before.version) throw new MediaAdmissionError(`The workspace ${kind} changed while it was being read`, changedCode);
	return data;
}
function detectImageMediaType(data) {
	if (data.length >= 8 && data[0] === 137 && data[1] === 80 && data[2] === 78 && data[3] === 71 && data[4] === 13 && data[5] === 10 && data[6] === 26 && data[7] === 10) return "image/png";
	if (data.length >= 3 && data[0] === 255 && data[1] === 216 && data[2] === 255) return "image/jpeg";
	if (data.length >= 12 && ascii(data, 0, 4) === "RIFF" && ascii(data, 8, 12) === "WEBP") return "image/webp";
	if (data.length >= 6 && (ascii(data, 0, 6) === "GIF87a" || ascii(data, 0, 6) === "GIF89a")) return "image/gif";
}
function isMp4(data) {
	return data.length >= 12 && ascii(data, 4, 8) === "ftyp";
}
/** Traverse durable session history once for both authorization and image listing. */
function sessionImageCatalog(agent) {
	const result = /* @__PURE__ */ new Map();
	const visited = /* @__PURE__ */ new WeakSet();
	let sequence = 0;
	let visitedNodes = 0;
	const visit = (value, origin, depth = 0) => {
		if (typeof value !== "object" || value === null || depth > 64 || visitedNodes >= 1e4 || visited.has(value)) return;
		visited.add(value);
		visitedNodes += 1;
		if (Array.isArray(value)) {
			for (const nested of value) visit(nested, origin, depth + 1);
			return;
		}
		if (!isRecord$3(value)) return;
		const attachment = value.type === "image" ? parseImageRef(value.attachment) : void 0;
		if (attachment !== void 0) {
			const handle = imageHandle(attachment);
			if (!result.has(handle)) result.set(handle, {
				handle,
				attachment,
				origin,
				sequence: sequence++
			});
		}
		if (value.type === "tool-result" && Array.isArray(value.content)) visit(value.content, origin, depth + 1);
	};
	for (const event of agent.session.snapshotEvents()) {
		const rawEvent = event;
		if (!isRecord$3(rawEvent) || !isRecord$3(rawEvent.data)) continue;
		if (rawEvent.type === "user/message") visit(rawEvent.data.content, "user");
		else if (rawEvent.type === "assistant/message" && isRecord$3(rawEvent.data.message)) visit(rawEvent.data.message.content, "reference");
		else if (rawEvent.type === "tool/result" && isRecord$3(rawEvent.data.message)) visit(rawEvent.data.message.content, "generated");
	}
	return [...result.values()];
}
function authorizedSessionImages(agent) {
	return new Map(sessionImageCatalog(agent).map((entry) => [entry.handle, entry.attachment]));
}
function parseImageRef(value) {
	if (!isRecord$3(value) || !isBoundedSafeText(value.attachmentId, 256) || value.mediaType !== "image/png" && value.mediaType !== "image/jpeg" && value.mediaType !== "image/webp" && value.mediaType !== "image/gif" || !isPositiveSafeInteger(value.bytes, 1073741824) || !isPositiveSafeInteger(value.width, 1e6) || !isPositiveSafeInteger(value.height, 1e6)) return void 0;
	const name = typeof value.name === "string" && isBoundedSafeText(value.name, 256) ? safeName(value.name) : void 0;
	return {
		attachmentId: value.attachmentId,
		mediaType: value.mediaType,
		bytes: value.bytes,
		width: value.width,
		height: value.height,
		...name === void 0 ? {} : { name }
	};
}
function isPositiveSafeInteger(value, max) {
	return Number.isSafeInteger(value) && value > 0 && value <= max;
}
function isCanonicalBase64(value) {
	return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/u.test(value);
}
function safeName(value) {
	const base = [...basename$1(value)].map((character) => character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127 || character === "/" || character === "\\" ? "_" : character).join("").slice(0, 256);
	return base.length > 0 ? base : "antigravity-image";
}
function basename$1(value) {
	const normalized = value.replaceAll("\\", "/");
	return normalized.slice(normalized.lastIndexOf("/") + 1);
}
function fsResolveOptions(cwd, signal) {
	return signal === void 0 ? { cwd } : {
		cwd,
		signal
	};
}
function ascii(data, start, end) {
	return String.fromCharCode(...data.slice(start, end));
}
function positive(value, fallback) {
	return value === void 0 || !Number.isFinite(value) || value <= 0 ? fallback : Math.min(Math.floor(value), 134217728);
}
function throwIfAborted(signal) {
	if (signal !== void 0 && signal.aborted) throw new MediaAdmissionError("Media admission was cancelled", "MEDIA_CANCELLED");
}
function isRecord$3(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
//#endregion
//#region direct/legacy/src/index.ts
const name$3 = "antigravity-auth";
const inject$3 = ["llm", "attachments"];
/** Mount the Host-only OAuth service and its guarded account RPC channel. */
function apply$3(ctx, network) {
	const service = createAntigravityAuthService({
		storePath: join(stateDir(), "direct", "auth.json"),
		autoActivateGates: true,
		fetchEmail: (token) => fetchUserEmail(token, network?.fetchImpl),
		...network ? {
			flowOptions: { fetchImpl: network.fetchImpl },
			credentialOptions: { fetchImpl: network.fetchImpl },
			projectOptions: { transport: network.transport },
			quotaOptions: { transport: network.transport }
		} : {}
	});
	let accountMode = "enabled";
	const runtime = ctx;
	const adapter = new AntigravityAdapter({
		auth: service,
		...network ? { transport: network.transport } : {},
		...runtime.attachments === void 0 ? {} : { attachments: runtime.attachments }
	});
	const unprovide = ctx.provide?.("antigravityAuth", service) ?? (() => {});
	ctx.inject(["connection"], (connectionCtx) => {
		const webServer = connectionCtx.get("webServer");
		accountMode = commandAccountMode(webServer);
		const guard = createLoopbackRpcGuard(webServer?.host, (endpoint, payload, signal) => handleAntigravityAuthRpc(service, endpoint, payload, signal, adapter));
		if (guard.mode === "blocked") connectionCtx.logger.warn("antigravity-auth: account RPC is disabled because the WebServer is not loopback-bound");
		return registerAccountRoutes(connectionCtx.connection, ANTIGRAVITY_AUTH_RPC_NAMESPACE, [
			"status",
			"models",
			"usage",
			"accounts",
			"switch-account",
			"remove-account",
			"acknowledge-risk",
			"login",
			"cancel",
			"cancel-login",
			"logout",
			"revoke"
		], guard.handler);
	});
	mountCapabilityLifecycle({
		ctx,
		auth: service,
		id: "auth-llm",
		enabled: () => runtime.llm?.registerAdapter !== void 0,
		register: () => {
			if (runtime.llm?.registerAdapter === void 0) return void 0;
			if (runtime.llm.listProviders?.().some((provider) => provider.id === "google-antigravity")) return void 0;
			const routes = [ANTIGRAVITY_PROVIDER];
			const dispose = runtime.llm.registerAdapter(routes, adapter);
			return () => {
				try {
					dispose();
				} finally {
					adapter.invalidateModelCatalog();
				}
			};
		},
		ownsAuth: true,
		cleanup: unprovide,
		label: "antigravity-auth: OAuth and LLM operations"
	});
	ctx.inject(["commands"], (commandCtx) => {
		const mainCommand = createAntigravityAuthCommand(service, () => accountMode);
		commandCtx.commands.register(mainCommand);
		commandCtx.commands.register({
			...mainCommand,
			name: "anti",
			description: "Antigravity OAuth multi-account management and switching (/anti accounts | switch | login)"
		});
	});
}
//#endregion
//#region direct/legacy/src/volatile-config.ts
function liveValue(value) {
	return typeof value === "object" && value !== null && "get" in value ? value.get() : value;
}
//#endregion
//#region direct/legacy/src/search.ts
const name$2 = "antigravity-search";
const inject$2 = ["web", "antigravityAuth"];
const ANTIGRAVITY_SEARCH_PROVIDER_ID = "antigravity";
const ANTIGRAVITY_SEARCH_ENDPOINT = `${ANTIGRAVITY_WIRE_ORIGIN}/v1internal:generateContent`;
const ANTIGRAVITY_SEARCH_MODEL = "antigravity-gemini-3.7-flash";
z.object({
	enabled: z.boolean().default(true).volatile(),
	model: z.string().default(ANTIGRAVITY_SEARCH_MODEL).volatile(),
	maxResults: z.number().step(1).min(1).max(50).default(10).volatile()
});
var AntigravitySearchProvider = class {
	options;
	id = ANTIGRAVITY_SEARCH_PROVIDER_ID;
	enabled;
	transport;
	constructor(options) {
		this.options = options;
		this.enabled = options.enabled ?? (() => options.settings?.().enabled ?? true);
		this.transport = options.transport ?? createPrivateTransport();
	}
	available() {
		return this.enabled();
	}
	async search(request, signal) {
		if (!this.enabled()) throw new WebError("Antigravity Web Search is disabled by its capability gate", "ANTIGRAVITY_SEARCH_DISABLED");
		if (signal?.aborted === true) throw new WebError("Antigravity Web Search was cancelled", "ANTIGRAVITY_SEARCH_CANCELLED");
		if (typeof request.query !== "string" || request.query.trim().length === 0 || request.query.length > 16384) throw new WebError("Antigravity Web Search requires a bounded query", "ANTIGRAVITY_SEARCH_INVALID_QUERY");
		const settings = this.options.settings?.() ?? {
			enabled: true,
			model: "antigravity-gemini-3.7-flash",
			maxResults: 10
		};
		const configuredMax = boundedInteger(settings.maxResults, 1, 50);
		const requestedMax = request.maxResults === void 0 ? configuredMax : boundedInteger(request.maxResults, 1, 50);
		const maxResults = Math.min(configuredMax, requestedMax);
		const credential = await this.options.auth.credential(signal);
		if (credential === void 0) throw new WebError("Antigravity Web Search requires a logged-in account", "ANTIGRAVITY_SEARCH_AUTH_REQUIRED");
		const response = await this.transport.request({
			url: ANTIGRAVITY_SEARCH_ENDPOINT,
			accessToken: credential.accessToken,
			body: JSON.stringify(buildGroundedSearchPayload(request.query.trim(), credential, settings.model)),
			...signal === void 0 ? {} : { signal }
		}).catch((error) => {
			throw toWebError(error);
		});
		const statusError = privateStatusError(response.status);
		if (statusError !== void 0) {
			await response.body?.cancel().catch(() => {});
			throw toWebError(statusError);
		}
		const sources = [];
		const seen = /* @__PURE__ */ new Set();
		const content = [];
		let truncated = false;
		try {
			for await (const event of iteratePrivateSse(response, {
				...signal === void 0 ? {} : { signal },
				idleTimeoutMs: DEFAULT_PRIVATE_IDLE_TIMEOUT_MS,
				totalTimeoutMs: DEFAULT_PRIVATE_TOTAL_TIMEOUT_MS,
				maxBytes: this.options.maxResponseBytes ?? 8388608,
				maxFrameBytes: DEFAULT_PRIVATE_FRAME_BYTES
			})) {
				if (event.data.trim() === "[DONE]") continue;
				const value = parseJson(event.data);
				truncated ||= collectSearchFacts(value, content, sources, seen, maxResults);
			}
		} catch (error) {
			throw toWebError(error);
		}
		if (sources.length === 0) throw new WebError("Antigravity Search returned no validated grounding sources", "ANTIGRAVITY_SEARCH_NO_SOURCES");
		return {
			...content.length === 0 ? {} : { content: content.join("").slice(0, 65536) },
			sources,
			truncated
		};
	}
};
function buildGroundedSearchPayload(query, credential, model = ANTIGRAVITY_SEARCH_MODEL) {
	return {
		project: credential.projectId,
		model: resolveModelWithTier(model, { cli_first: false }).actualModel,
		request: {
			contents: [{
				role: "user",
				parts: [{ text: query }]
			}],
			tools: [{ googleSearch: {} }],
			systemInstruction: { parts: [{ text: "Return a concise grounded answer with only sources supplied by the provider." }] }
		}
	};
}
/** Mount only the public Web Search seam; no fetch provider is registered. */
function apply$2(ctx, config = {
	enabled: true,
	model: ANTIGRAVITY_SEARCH_MODEL,
	maxResults: 10
}, watch, transport) {
	if (ctx === void 0) return;
	const candidate = ctx;
	if (candidate.web === void 0) return;
	const current = () => ({
		enabled: liveValue(config.enabled),
		model: liveValue(config.model),
		maxResults: liveValue(config.maxResults)
	});
	let lifecycle;
	if (watch) ctx.effect(() => watch(() => lifecycle?.sync()));
	else {
		ctx.inject(["settings"], (settingsCtx) => {
			settingsCtx.effect(() => settingsCtx.settings.configure({ auto: false }, ctx.fiber));
		});
		ctx.on("loader/volatile-update", () => {
			lifecycle?.sync();
		});
	}
	const provided = candidate.get?.("antigravityAuth");
	if (watch && !isAuthService$2(provided)) return;
	const auth = isAuthService$2(provided) ? provided : createAntigravityAuthService();
	lifecycle = mountCapabilityLifecycle({
		ctx,
		auth,
		id: "search",
		enabled: () => current().enabled,
		register: () => candidate.web.registerSearchProvider(new AntigravitySearchProvider({
			auth,
			settings: () => current(),
			...transport ? { transport } : {}
		})),
		ownsAuth: auth !== provided,
		label: "antigravity-search: provider lifecycle"
	});
}
function collectSearchFacts(value, content, sources, seen, maxResults) {
	if (!isRecord$2(value)) return false;
	const root = isRecord$2(value.response) ? value.response : value;
	const texts = [findText(root)];
	const metadataValues = [
		root.groundingMetadata,
		root.grounding_metadata,
		value.groundingMetadata
	];
	if (Array.isArray(root.candidates)) {
		if (root.candidates.length > 512) throw new WebError("Antigravity Search returned too many candidates", "ANTIGRAVITY_SEARCH_PROTOCOL_DRIFT");
		for (const candidate of root.candidates) {
			if (!isRecord$2(candidate)) continue;
			texts.push(findText(candidate));
			if (isRecord$2(candidate.content)) texts.push(findText(candidate.content));
			metadataValues.push(candidate.groundingMetadata, candidate.grounding_metadata);
		}
	}
	for (const text of texts) appendBounded(content, text);
	let truncated = false;
	for (const rawMetadata of metadataValues) {
		if (!isRecord$2(rawMetadata)) continue;
		const chunks = rawMetadata.groundingChunks ?? rawMetadata.grounding_chunks;
		if (!Array.isArray(chunks)) continue;
		if (chunks.length > 4096) throw new WebError("Antigravity Search returned too many grounding sources", "ANTIGRAVITY_SEARCH_PROTOCOL_DRIFT");
		for (const chunk of chunks) {
			if (!isRecord$2(chunk)) continue;
			const web = isRecord$2(chunk.web) ? chunk.web : isRecord$2(chunk.webSource) ? chunk.webSource : void 0;
			if (web === void 0 || typeof web.uri !== "string" || !isHttpUrl(web.uri)) continue;
			const url = web.uri;
			if (seen.has(url)) continue;
			if (sources.length >= maxResults) {
				truncated = true;
				break;
			}
			seen.add(url);
			const title = safeSourceText(web.title, 1024);
			const snippet = safeSourceText(web.snippet, 4096);
			sources.push({
				url,
				...title === void 0 ? {} : { title },
				...snippet === void 0 ? {} : { snippet }
			});
		}
	}
	return truncated;
}
function appendBounded(output, value) {
	if (value === void 0 || value.length === 0) return;
	const used = output.reduce((total, item) => total + item.length, 0);
	if (used < 65536) output.push(value.slice(0, 65536 - used));
}
function findText(value) {
	const parts = Array.isArray(value.parts) ? value.parts : isRecord$2(value.content) && Array.isArray(value.content.parts) ? value.content.parts : [];
	const output = [];
	let length = 0;
	for (const part of parts) {
		if (!isRecord$2(part) || typeof part.text !== "string" || hasControl$1(part.text)) continue;
		const text = part.text.slice(0, 65536 - length);
		output.push(text);
		length += text.length;
		if (length >= 65536) break;
	}
	return output.length === 0 ? void 0 : output.join("");
}
function safeSourceText(value, max) {
	return typeof value === "string" && value.length > 0 && value.length <= max && !hasControl$1(value) ? value : void 0;
}
function hasControl$1(value) {
	for (const character of value) {
		const code = character.charCodeAt(0);
		if (code < 32 || code === 127) return true;
	}
	return false;
}
function parseJson(value) {
	const normalized = value.trim().replace(/^\)\]\}'(?:\r?\n)?/u, "");
	try {
		return JSON.parse(normalized);
	} catch {
		throw new WebError("Antigravity Search returned malformed provider data", "ANTIGRAVITY_SEARCH_PROTOCOL_DRIFT");
	}
}
const SEARCH_FAILURE_CODES = {
	authentication: "ANTIGRAVITY_SEARCH_AUTH_REQUIRED",
	forbidden: "ANTIGRAVITY_SEARCH_FORBIDDEN",
	"rate-limited": "ANTIGRAVITY_SEARCH_RATE_LIMITED",
	cancelled: "ANTIGRAVITY_SEARCH_CANCELLED",
	timeout: "ANTIGRAVITY_SEARCH_TIMEOUT",
	"attribution-rejected": "ANTIGRAVITY_SEARCH_PROTOCOL_DRIFT",
	"protocol-drift": "ANTIGRAVITY_SEARCH_PROTOCOL_DRIFT",
	"response-limit": "ANTIGRAVITY_SEARCH_PROTOCOL_DRIFT",
	"request-limit": "ANTIGRAVITY_SEARCH_PROTOCOL_DRIFT",
	upstream: "ANTIGRAVITY_SEARCH_FAILED",
	network: "ANTIGRAVITY_SEARCH_FAILED",
	failed: "ANTIGRAVITY_SEARCH_FAILED"
};
function toWebError(error) {
	if (error instanceof WebError) return error;
	if (error instanceof PrivateTransportError) return new WebError("The Antigravity Search request failed safely", SEARCH_FAILURE_CODES[classifyPrivateFailure(error)]);
	return new WebError("The Antigravity Search request failed safely", "ANTIGRAVITY_SEARCH_FAILED");
}
function isAuthService$2(value) {
	return isRecord$2(value) && typeof value.credential === "function" && typeof value.status === "function";
}
function isHttpUrl(value) {
	if (value.length === 0 || value.length > 8192 || value.trim() !== value || hasControl$1(value)) return false;
	try {
		const url = new URL(value);
		return (url.protocol === "http:" || url.protocol === "https:") && url.username.length === 0 && url.password.length === 0;
	} catch {
		return false;
	}
}
function boundedInteger(value, min, max) {
	if (!Number.isSafeInteger(value) || value < min || value > max) throw new WebError("Antigravity Search result limit is invalid", "ANTIGRAVITY_SEARCH_INVALID_QUERY");
	return value;
}
function isRecord$2(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
//#endregion
//#region direct/legacy/src/image.ts
/** Antigravity image generation/editing tools and session-authorized image catalog. */
const name$1 = "antigravity-image";
const inject$1 = [
	"tools",
	"attachments",
	"fs",
	"antigravityAuth"
];
const GENERATE_IMAGE_TOOL_NAME = "generate_image";
const LIST_IMAGES_TOOL_NAME = "list_images";
const ANTIGRAVITY_IMAGE_ENDPOINT = `${ANTIGRAVITY_WIRE_ORIGIN}/v1internal:generateContent`;
const ANTIGRAVITY_IMAGE_MODEL = "antigravity-gemini-3.1-flash-image";
z.object({
	enabled: z.boolean().default(true).volatile(),
	model: z.string().default(ANTIGRAVITY_IMAGE_MODEL).volatile(),
	n: z.number().step(1).min(1).max(4).default(1).volatile()
});
const MAX_REFERENCES = 5;
const MAX_IMAGES = 4;
const IMAGE_ORIGINS = [
	"all",
	"generated",
	"reference",
	"user"
];
const generateSchema = {
	type: "object",
	properties: {
		operation: {
			type: "string",
			enum: ["generate", "edit"]
		},
		images: {
			type: "array",
			items: { type: "object" }
		},
		references: {
			type: "array",
			items: { type: "object" }
		},
		warnings: {
			type: "array",
			items: { type: "object" }
		}
	},
	required: [
		"operation",
		"images",
		"references",
		"warnings"
	],
	additionalProperties: false
};
const listSchema = {
	type: "object",
	properties: {
		items: {
			type: "array",
			items: { type: "object" }
		},
		nextCursor: { type: "string" }
	},
	required: ["items"],
	additionalProperties: false
};
var AntigravityImageError = class extends HarnessError {};
function createAntigravityImageTools(options) {
	const fixedOptions = {
		...options,
		transport: options.transport ?? createPrivateTransport()
	};
	return [createGenerateTool(fixedOptions), createListTool(fixedOptions)];
}
function createGenerateTool(options) {
	return {
		name: GENERATE_IMAGE_TOOL_NAME,
		description: "Generate or edit bounded Antigravity images and return durable session image handles.",
		parameters: {
			type: "object",
			properties: {
				prompt: {
					type: "string",
					minLength: 1,
					maxLength: 16384
				},
				references: {
					type: "array",
					maxItems: MAX_REFERENCES,
					items: { oneOf: [{
						type: "object",
						properties: {
							kind: { const: "session" },
							handle: { type: "string" }
						},
						required: ["kind", "handle"],
						additionalProperties: false
					}, {
						type: "object",
						properties: {
							kind: { const: "workspace" },
							path: { type: "string" }
						},
						required: ["kind", "path"],
						additionalProperties: false
					}] }
				},
				model: { type: "string" },
				n: {
					type: "integer",
					minimum: 1,
					maximum: MAX_IMAGES
				}
			},
			required: ["prompt"],
			additionalProperties: false
		},
		output: {
			schema: generateSchema,
			render: (_args, value) => renderGenerate(value),
			presentationMeta: (_args, value) => value
		},
		execute: async (args, exec) => executeGenerate(options, args, exec),
		isConcurrencySafe: () => false
	};
}
function createListTool(options) {
	return {
		name: LIST_IMAGES_TOOL_NAME,
		description: "List durable image handles authorized by the current session with bounded pagination.",
		parameters: {
			type: "object",
			properties: {
				limit: {
					type: "integer",
					minimum: 1,
					maximum: 20
				},
				cursor: { type: "string" },
				origin: {
					type: "string",
					enum: [...IMAGE_ORIGINS]
				}
			},
			additionalProperties: false
		},
		output: {
			schema: listSchema,
			render: (_args, value) => renderList(value),
			presentationMeta: (_args, value) => value
		},
		execute: async (args, exec) => executeList(options, args, exec),
		isConcurrencySafe: () => true
	};
}
async function executeGenerate(options, rawArgs, exec) {
	const settings = options.settings?.() ?? {
		enabled: true,
		model: "antigravity-gemini-3.1-flash-image",
		n: 1
	};
	if (!settings.enabled) throw new AntigravityImageError("Antigravity Image is disabled by its capability gate", "IMAGE_DISABLED");
	const args = parseGenerateArgs(rawArgs, settings);
	const credential = await requireCredential(options.auth, exec.signal);
	const agent = requireAgent$1(exec);
	const cwd = workspaceCwd$1(agent);
	const admission = {
		attachments: options.attachments,
		fs: options.fs
	};
	const references = [];
	const referenceParts = [];
	for (const [index, reference] of args.references.entries()) {
		const admitted = reference.kind === "session" ? await admitSessionImage(admission, agent, reference.handle, exec.signal) : await admitWorkspaceImage(admission, cwd, reference.path, exec.signal);
		const stored = admitted.stored ?? {
			ref: await options.attachments.saveImage(admitted.input),
			data: admitted.input.data
		};
		const item = {
			handle: imageHandle(stored.ref),
			attachment: stored.ref,
			origin: "reference",
			seq: index
		};
		references.push(item);
		referenceParts.push({ inlineData: {
			mimeType: stored.ref.mediaType,
			data: Buffer$1.from(stored.data).toString("base64")
		} });
	}
	const transport = options.transport;
	if (transport === void 0) throw new AntigravityImageError("The Antigravity Image transport is unavailable", "IMAGE_FAILED");
	const body = buildImagePayload(args.prompt, args.model, credential, referenceParts);
	const images = [];
	const warnings = [];
	let firstFailure;
	for (let index = 0; index < args.n; index += 1) {
		let response;
		try {
			response = await transport.request({
				url: ANTIGRAVITY_IMAGE_ENDPOINT,
				accessToken: credential.accessToken,
				body: JSON.stringify(body),
				signal: exec.signal
			});
		} catch (error) {
			const failure = toImageError(error);
			if (failure.code === "IMAGE_CANCELLED") throw failure;
			firstFailure ??= failure;
			warnings.push({
				index,
				code: imageRequestWarning(failure.code)
			});
			continue;
		}
		const statusError = privateStatusError(response.status);
		if (statusError !== void 0) {
			await response.body?.cancel().catch(() => {});
			const failure = toImageError(statusError);
			firstFailure ??= failure;
			warnings.push({
				index,
				code: imageRequestWarning(failure.code)
			});
			continue;
		}
		let envelope;
		try {
			envelope = JSON.parse(await readPrivateText(response, {
				signal: exec.signal,
				maxBytes: DEFAULT_PRIVATE_RESPONSE_BYTES
			}));
		} catch (error) {
			const failure = toImageError(error);
			if (failure.code === "IMAGE_CANCELLED") throw failure;
			firstFailure ??= failure;
			warnings.push({
				index,
				code: "IMAGE_RESPONSE_INVALID"
			});
			continue;
		}
		const candidate = collectInlineData(envelope)[0];
		if (candidate === void 0) {
			firstFailure ??= new AntigravityImageError("Antigravity Image returned no admitted inlineData", "IMAGE_RESPONSE_EMPTY");
			warnings.push({
				index,
				code: "IMAGE_RESPONSE_EMPTY"
			});
			continue;
		}
		try {
			const admitted = await admitBase64Image(options, candidate.data, "inline", `generated-${String(index + 1)}`, exec.signal);
			if (candidate.mediaType !== void 0 && normalizeImageMime(candidate.mediaType) !== admitted.input.mediaType) throw new AntigravityImageError("The declared image MIME did not match the admitted magic bytes", "IMAGE_MIME_MISMATCH");
			const attachment = await options.attachments.saveImage(admitted.input);
			images.push({
				handle: imageHandle(attachment),
				attachment,
				origin: "generated",
				seq: index
			});
		} catch (error) {
			if (exec.signal?.aborted === true) throw new AntigravityImageError("Antigravity Image generation was cancelled", "IMAGE_CANCELLED");
			if (error instanceof AntigravityImageError && error.code === "MEDIA_CANCELLED") throw new AntigravityImageError("Antigravity Image generation was cancelled", "IMAGE_CANCELLED");
			const failure = error instanceof AntigravityImageError && error.code === "IMAGE_MIME_MISMATCH" ? error : new AntigravityImageError("The generated image failed media admission", "IMAGE_ADMISSION_FAILED");
			firstFailure ??= failure;
			warnings.push({
				index,
				code: failure.code
			});
		}
	}
	if (images.length === 0) {
		if (firstFailure !== void 0) throw firstFailure;
		throw new AntigravityImageError("No generated image passed media admission", "IMAGE_RESPONSE_INVALID");
	}
	return {
		operation: references.length === 0 ? "generate" : "edit",
		images,
		references,
		warnings
	};
}
async function executeList(options, rawArgs, exec) {
	if (!(options.settings?.() ?? {
		enabled: true,
		model: "antigravity-gemini-3.1-flash-image",
		n: 1
	}).enabled) throw new AntigravityImageError("Antigravity Image is disabled by its capability gate", "IMAGE_DISABLED");
	await requireCredential(options.auth, exec.signal);
	const agent = requireAgent$1(exec);
	const args = parseListArgs(rawArgs);
	let items = collectImages(agent);
	if (args.origin !== "all") items = items.filter((item) => item.origin === args.origin);
	if (args.cursor !== void 0) items = afterCursor(items, args.cursor, args.origin);
	const selected = items.slice(0, args.limit);
	return {
		items: selected,
		...items.length > selected.length && selected.length > 0 ? { nextCursor: encodeCursor(selected[selected.length - 1], args.origin) } : {}
	};
}
function buildImagePayload(prompt, model, credential, referenceParts) {
	const resolved = resolveModelWithTier(model, { cli_first: false });
	if (resolved.isImageModel !== true) throw new AntigravityImageError("The selected Antigravity model is not an image model", "INVALID_ARGS");
	const project = credential.projectId === "inductive-dreamer-qrkws" || !credential.projectId ? void 0 : credential.projectId;
	return {
		...project === void 0 ? {} : { project },
		model: resolved.actualModel,
		request: {
			contents: [{
				role: "user",
				parts: [{ text: prompt }, ...referenceParts]
			}],
			generationConfig: { responseModalities: ["TEXT", "IMAGE"] }
		}
	};
}
function normalizeImageMime(value) {
	const normalized = value.trim().toLowerCase();
	return normalized === "image/png" || normalized === "image/jpeg" || normalized === "image/webp" || normalized === "image/gif" ? normalized : void 0;
}
function collectInlineData(value) {
	const output = [];
	const visit = (item, depth = 0) => {
		if (output.length >= MAX_IMAGES || depth > 32) return;
		if (Array.isArray(item)) {
			for (const child of item) visit(child, depth + 1);
			return;
		}
		if (!isRecord$1(item)) return;
		const inline = isRecord$1(item.inlineData) ? item.inlineData : isRecord$1(item.inline_data) ? item.inline_data : void 0;
		if (inline !== void 0 && typeof inline.data === "string") {
			const mediaType = inline.mimeType ?? inline.mime_type;
			output.push({
				data: inline.data,
				...typeof mediaType === "string" ? { mediaType } : {}
			});
			return;
		}
		for (const child of Object.values(item)) visit(child, depth + 1);
	};
	visit(value);
	return output;
}
function collectImages(agent) {
	return sessionImageCatalog(agent).map((entry) => ({
		handle: entry.handle,
		attachment: entry.attachment,
		origin: entry.origin,
		seq: entry.sequence
	})).sort((left, right) => right.seq - left.seq || String(right.attachment.attachmentId).localeCompare(String(left.attachment.attachmentId)));
}
function renderGenerate(value) {
	return [
		{
			type: "text",
			text: `Created ${String(value.images.length)} durable image(s): ${value.images.map((item) => item.handle).join(", ")}.`
		},
		...value.references.map((item) => ({
			type: "image",
			attachment: item.attachment
		})),
		...value.images.map((item) => ({
			type: "image",
			attachment: item.attachment
		}))
	];
}
function renderList(value) {
	return [{
		type: "text",
		text: value.items.length === 0 ? "No authorized session images matched." : value.items.map((item) => `${item.handle} (${item.origin})`).join(", ")
	}, ...value.items.map((item) => ({
		type: "image",
		attachment: item.attachment
	}))];
}
/** Mount tools when a ToolRuntime is available; the tool bodies recheck the credential gate. */
function apply$1(ctx, config = {
	enabled: true,
	model: ANTIGRAVITY_IMAGE_MODEL,
	n: 1
}, watch, transport) {
	if (ctx === void 0) return;
	const candidate = ctx;
	if (candidate.tools === void 0 || candidate.attachments === void 0 || candidate.fs === void 0) return;
	const current = () => ({
		enabled: liveValue(config.enabled),
		model: liveValue(config.model),
		n: liveValue(config.n)
	});
	let lifecycle;
	if (watch) ctx.effect(() => watch(() => lifecycle?.sync()));
	else {
		ctx.inject(["settings"], (settingsCtx) => {
			settingsCtx.effect(() => settingsCtx.settings.configure({ auto: false }, ctx.fiber));
		});
		ctx.on("loader/volatile-update", () => {
			lifecycle?.sync();
		});
	}
	const provided = candidate.get?.("antigravityAuth");
	if (watch && !isAuthService$1(provided)) return;
	const auth = isAuthService$1(provided) ? provided : createAntigravityAuthService();
	const options = {
		auth,
		attachments: candidate.attachments,
		fs: candidate.fs,
		settings: () => current(),
		...transport ? { transport } : {}
	};
	lifecycle = mountCapabilityLifecycle({
		ctx,
		auth,
		id: "image",
		enabled: () => current().enabled,
		register: () => registerCapabilitySet(createAntigravityImageTools(options), (tool) => candidate.tools.register(tool)),
		ownsAuth: auth !== provided,
		label: "antigravity-image: tool lifecycle"
	});
}
async function requireCredential(auth, signal) {
	const credential = await auth.credential(signal);
	if (credential === void 0) throw new AntigravityImageError("Antigravity Image requires a logged-in account", "IMAGE_AUTH_REQUIRED");
	return credential;
}
function requireAgent$1(exec) {
	if (exec.agent === void 0) throw new AntigravityImageError("Antigravity Image requires an active session", "IMAGE_AGENT_REQUIRED");
	workspaceCwd$1(exec.agent);
	return exec.agent;
}
function workspaceCwd$1(agent) {
	const cwd = agent.session.header.cwd;
	if (typeof cwd !== "string" || cwd.length === 0) throw new AntigravityImageError("Antigravity Image requires an active workspace", "IMAGE_WORKSPACE_REQUIRED");
	return cwd;
}
function parseGenerateArgs(value, settings) {
	if (!isRecord$1(value) || hasExtra$1(value, [
		"prompt",
		"references",
		"model",
		"n"
	]) || typeof value.prompt !== "string" || value.prompt.trim().length === 0 || value.prompt.length > 16384) throw new AntigravityImageError("generate_image expects a closed prompt object", "INVALID_ARGS");
	const refs = value.references === void 0 ? [] : parseReferences(value.references);
	const model = nonBlank(value.model ?? settings.model);
	const n = integer(value.n ?? settings.n, 1, MAX_IMAGES);
	return {
		prompt: value.prompt.trim().slice(0, 16384),
		references: refs,
		model,
		n
	};
}
function parseReferences(value) {
	if (!Array.isArray(value) || value.length > MAX_REFERENCES) throw new AntigravityImageError("references exceed the bounded limit", "INVALID_ARGS");
	return value.map((item) => {
		if (!isRecord$1(item) || hasExtra$1(item, [
			"kind",
			"handle",
			"path"
		]) || typeof item.kind !== "string") throw new AntigravityImageError("reference is invalid", "INVALID_ARGS");
		if (item.kind === "session" && typeof item.handle === "string" && IMAGE_HANDLE_PATTERN.test(item.handle)) return {
			kind: "session",
			handle: item.handle
		};
		if (item.kind === "workspace" && typeof item.path === "string" && item.path.length > 0) return {
			kind: "workspace",
			path: item.path
		};
		throw new AntigravityImageError("reference is invalid", "INVALID_ARGS");
	});
}
function parseListArgs(value) {
	if (!isRecord$1(value) || hasExtra$1(value, [
		"limit",
		"cursor",
		"origin"
	])) throw new AntigravityImageError("list_images expects a closed object", "INVALID_ARGS");
	const limit = value.limit === void 0 ? 5 : integer(value.limit, 1, 20);
	const cursor = value.cursor === void 0 ? void 0 : nonBlank(value.cursor);
	const origin = value.origin === void 0 ? "all" : enumValue(value.origin, IMAGE_ORIGINS);
	return {
		limit,
		...cursor === void 0 ? {} : { cursor },
		origin
	};
}
function afterCursor(items, cursor, origin) {
	let value;
	try {
		value = JSON.parse(Buffer$1.from(cursor, "base64url").toString("utf8"));
	} catch {
		throw new AntigravityImageError("The image cursor is invalid", "IMAGE_CURSOR_INVALID");
	}
	if (!isRecord$1(value) || Object.keys(value).length !== 3 || hasExtra$1(value, [
		"id",
		"seq",
		"origin"
	]) || typeof value.id !== "string" || value.id.length === 0 || value.id.length > 256 || !Number.isSafeInteger(value.seq) || value.origin !== origin) throw new AntigravityImageError("The image cursor is invalid", "IMAGE_CURSOR_INVALID");
	const index = items.findIndex((item) => item.seq === value.seq && String(item.attachment.attachmentId) === value.id);
	if (index < 0) throw new AntigravityImageError("The image cursor is stale", "IMAGE_CURSOR_INVALID");
	return items.slice(index + 1);
}
function encodeCursor(item, origin) {
	return Buffer$1.from(JSON.stringify({
		id: String(item.attachment.attachmentId),
		seq: item.seq,
		origin
	})).toString("base64url");
}
function isAuthService$1(value) {
	return isRecord$1(value) && typeof value.credential === "function" && typeof value.status === "function";
}
function imageRequestWarning(code) {
	if (code === "IMAGE_AUTH_REQUIRED") return "IMAGE_REQUEST_UNAUTHENTICATED";
	if (code === "IMAGE_RATE_LIMITED") return "IMAGE_REQUEST_RATE_LIMITED";
	if (code === "IMAGE_TIMEOUT") return "IMAGE_REQUEST_TIMEOUT";
	if (code === "IMAGE_PROTOCOL_DRIFT") return "IMAGE_REQUEST_PROTOCOL_DRIFT";
	return "IMAGE_REQUEST_FAILED";
}
const IMAGE_FAILURE_CODES = {
	authentication: "IMAGE_AUTH_REQUIRED",
	forbidden: "IMAGE_FORBIDDEN",
	"rate-limited": "IMAGE_RATE_LIMITED",
	cancelled: "IMAGE_CANCELLED",
	timeout: "IMAGE_TIMEOUT",
	"attribution-rejected": "IMAGE_PROTOCOL_DRIFT",
	"protocol-drift": "IMAGE_PROTOCOL_DRIFT",
	"response-limit": "IMAGE_PROTOCOL_DRIFT",
	"request-limit": "IMAGE_PROTOCOL_DRIFT",
	upstream: "IMAGE_FAILED",
	network: "IMAGE_FAILED",
	failed: "IMAGE_FAILED"
};
function toImageError(error) {
	if (error instanceof AntigravityImageError) return error;
	if (error instanceof PrivateTransportError) return new AntigravityImageError("The Antigravity Image request failed safely", IMAGE_FAILURE_CODES[classifyPrivateFailure(error)]);
	return new AntigravityImageError("The Antigravity Image request failed safely", "IMAGE_FAILED");
}
function hasExtra$1(value, allowed) {
	return Object.keys(value).some((key) => !allowed.includes(key));
}
function nonBlank(value) {
	if (typeof value !== "string" || value.trim().length === 0 || value.length > 512) throw new AntigravityImageError("The image option is invalid", "INVALID_ARGS");
	return value.trim();
}
function integer(value, min, max) {
	if (!Number.isSafeInteger(value) || value < min || value > max) throw new AntigravityImageError("The image option is invalid", "INVALID_ARGS");
	return value;
}
function enumValue(value, values) {
	if (typeof value !== "string" || !values.includes(value)) throw new AntigravityImageError("The image option is invalid", "INVALID_ARGS");
	return value;
}
function isRecord$1(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
//#endregion
//#region direct/legacy/src/video.ts
/** Gated workspace-video understanding proof of concept. */
const name = "antigravity-video";
const inject = [
	"tools",
	"fs",
	"antigravityAuth"
];
const ANALYZE_VIDEO_TOOL_NAME = "analyze_video";
const ANTIGRAVITY_VIDEO_ENDPOINT = `${ANTIGRAVITY_WIRE_ORIGIN}/v1internal:generateContent`;
const ANTIGRAVITY_VIDEO_MODEL = "antigravity-gemini-3.7-flash";
z.object({
	enabled: z.boolean().default(true).volatile(),
	model: z.string().default(ANTIGRAVITY_VIDEO_MODEL).volatile(),
	maxBytes: z.number().step(1).min(1).max(33554432).default(33554432).volatile()
});
var AntigravityVideoError = class extends HarnessError {};
function createAntigravityVideoTools(options) {
	const fixedOptions = {
		...options,
		transport: options.transport ?? createPrivateTransport({ maxRequestBytes: 50331648 })
	};
	return [{
		name: ANALYZE_VIDEO_TOOL_NAME,
		description: "Analyze an explicit MP4 file inside the active workspace with the gated Antigravity video POC.",
		parameters: {
			type: "object",
			properties: {
				path: {
					type: "string",
					minLength: 1,
					maxLength: 4096
				},
				prompt: {
					type: "string",
					minLength: 1,
					maxLength: 16384
				},
				model: {
					type: "string",
					maxLength: 256
				}
			},
			required: ["path", "prompt"],
			additionalProperties: false
		},
		output: {
			schema: videoSchema,
			render: (_args, value) => [{
				type: "text",
				text: value.text
			}],
			presentationMeta: (_args, value) => value
		},
		execute: async (args, exec) => executeVideo(fixedOptions, args, exec),
		isConcurrencySafe: () => false
	}];
}
async function executeVideo(options, rawArgs, exec) {
	const settings = options.settings?.() ?? {
		enabled: true,
		model: "antigravity-gemini-3.7-flash"
	};
	if (!settings.enabled) throw new AntigravityVideoError("Antigravity Video is disabled by its capability gate", "VIDEO_DISABLED");
	const args = parseArgs(rawArgs, settings);
	const agent = requireAgent(exec);
	const credential = await options.auth.credential(exec.signal);
	if (credential === void 0) throw new AntigravityVideoError("Antigravity Video requires a logged-in account", "VIDEO_AUTH_REQUIRED");
	const cwd = workspaceCwd(agent);
	const admitted = await admitWorkspaceVideo({
		fs: options.fs,
		...settings.maxBytes === void 0 ? {} : { maxVideoBytes: settings.maxBytes }
	}, cwd, args.path, exec.signal);
	const transport = options.transport;
	if (transport === void 0) throw new AntigravityVideoError("The Antigravity Video transport is unavailable", "VIDEO_FAILED");
	let response;
	try {
		response = await transport.request({
			url: ANTIGRAVITY_VIDEO_ENDPOINT,
			accessToken: credential.accessToken,
			body: JSON.stringify(buildVideoPayload(args.prompt, args.model, credential, admitted.data)),
			signal: exec.signal
		});
	} catch (error) {
		throw toVideoError(error);
	}
	const statusError = privateStatusError(response.status);
	if (statusError !== void 0) {
		await response.body?.cancel().catch(() => {});
		throw toVideoError(statusError);
	}
	let value;
	try {
		value = JSON.parse(await readPrivateText(response, {
			signal: exec.signal,
			maxBytes: DEFAULT_PRIVATE_RESPONSE_BYTES
		}));
	} catch (error) {
		throw toVideoError(error);
	}
	const text = extractText(value);
	if (text === void 0) throw new AntigravityVideoError("Antigravity Video returned no text understanding", "VIDEO_RESPONSE_EMPTY");
	const usage = extractUsage(value);
	return {
		text,
		...usage === void 0 ? {} : { usage }
	};
}
function buildVideoPayload(prompt, model, credential, data) {
	const project = credential.projectId === "inductive-dreamer-qrkws" || !credential.projectId ? void 0 : credential.projectId;
	const resolved = resolveModelWithTier(model, { cli_first: false });
	const wireModel = resolved.actualModel.startsWith("gemini-3.7-flash") ? "gemini-3-flash" : resolved.actualModel;
	return {
		...project === void 0 ? {} : { project },
		model: wireModel,
		request: { contents: [{
			role: "user",
			parts: [{ text: prompt }, { inlineData: {
				mimeType: "video/mp4",
				data: Buffer$1.from(data).toString("base64")
			} }]
		}] }
	};
}
function apply(ctx, config = {
	enabled: true,
	model: ANTIGRAVITY_VIDEO_MODEL,
	maxBytes: 33554432
}, watch, transport) {
	if (ctx === void 0) return;
	const candidate = ctx;
	if (candidate.tools === void 0 || candidate.fs === void 0) return;
	const current = () => ({
		enabled: liveValue(config.enabled),
		model: liveValue(config.model),
		...config.maxBytes === void 0 ? {} : { maxBytes: liveValue(config.maxBytes) }
	});
	let lifecycle;
	if (watch) ctx.effect(() => watch(() => lifecycle?.sync()));
	else {
		ctx.inject(["settings"], (settingsCtx) => {
			settingsCtx.effect(() => settingsCtx.settings.configure({ auto: false }, ctx.fiber));
		});
		ctx.on("loader/volatile-update", () => {
			lifecycle?.sync();
		});
	}
	const provided = candidate.get?.("antigravityAuth");
	if (watch && !isAuthService(provided)) return;
	const auth = isAuthService(provided) ? provided : createAntigravityAuthService();
	lifecycle = mountCapabilityLifecycle({
		ctx,
		auth,
		id: "video",
		enabled: () => current().enabled,
		register: () => {
			const disposers = createAntigravityVideoTools({
				auth,
				fs: candidate.fs,
				settings: () => current(),
				...transport ? { transport } : {}
			}).map((tool) => candidate.tools.register(tool));
			return () => {
				for (const dispose of disposers.reverse()) dispose();
			};
		},
		ownsAuth: auth !== provided,
		label: "antigravity-video: tool lifecycle"
	});
}
function isAuthService(value) {
	return isRecord(value) && typeof value.credential === "function" && typeof value.status === "function";
}
function extractText(value) {
	const output = [];
	let outputLength = 0;
	const visit = (item, depth = 0) => {
		if (depth > 32 || outputLength >= 65536) return;
		if (Array.isArray(item)) {
			for (const child of item) visit(child, depth + 1);
			return;
		}
		if (!isRecord(item)) return;
		if (Array.isArray(item.parts)) for (const part of item.parts) {
			if (!isRecord(part) || typeof part.text !== "string" || hasControl(part.text)) continue;
			const text = part.text.slice(0, 65536 - outputLength);
			output.push(text);
			outputLength += text.length;
		}
		if (isRecord(item.response)) visit(item.response, depth + 1);
		if (isRecord(item.content)) visit(item.content, depth + 1);
		if (Array.isArray(item.candidates)) visit(item.candidates, depth + 1);
		if (isRecord(item.serverContent)) visit(item.serverContent, depth + 1);
		if (isRecord(item.modelTurn)) visit(item.modelTurn, depth + 1);
	};
	visit(value);
	const text = output.join("").trim();
	return text.length === 0 ? void 0 : text.slice(0, 65536);
}
function extractUsage(value) {
	const visit = (item, depth = 0) => {
		if (depth > 32) return void 0;
		if (Array.isArray(item)) {
			for (const child of item) {
				const result = visit(child, depth + 1);
				if (result !== void 0) return result;
			}
			return;
		}
		if (!isRecord(item)) return void 0;
		const raw = isRecord(item.usageMetadata) ? item.usageMetadata : isRecord(item.usage_metadata) ? item.usage_metadata : isRecord(item.usage) ? item.usage : void 0;
		if (raw !== void 0) {
			const totalPrompt = safeCount(raw.promptTokenCount);
			const input = totalPrompt ?? safeCount(raw.inputTokenCount);
			const output = safeCount(raw.candidatesTokenCount ?? raw.outputTokenCount);
			const cached = safeCount(raw.cachedContentTokenCount ?? raw.cacheReadTokens);
			const reasoning = safeCount(raw.thoughtsTokenCount ?? raw.reasoningTokenCount);
			if (input !== void 0 || output !== void 0 || cached !== void 0 || reasoning !== void 0) return {
				inputTokens: totalPrompt !== void 0 && cached !== void 0 ? Math.max(0, totalPrompt - cached) : input ?? 0,
				outputTokens: output ?? 0,
				...cached === void 0 ? {} : { cacheReadTokens: cached },
				...reasoning === void 0 ? {} : { reasoningTokens: reasoning }
			};
		}
		for (const key of [
			"response",
			"candidates",
			"serverContent"
		]) {
			const result = visit(item[key], depth + 1);
			if (result !== void 0) return result;
		}
	};
	return visit(value);
}
function safeCount(value) {
	return typeof value === "number" && Number.isSafeInteger(value) && value >= 0 ? value : void 0;
}
function parseArgs(value, settings) {
	if (!isRecord(value) || hasExtra(value, [
		"path",
		"prompt",
		"model"
	]) || typeof value.path !== "string" || typeof value.prompt !== "string" || value.path.length === 0 || value.path.length > 4096 || value.prompt.trim().length === 0 || value.prompt.length > 16384) throw new AntigravityVideoError("analyze_video expects a closed path and prompt object", "INVALID_ARGS");
	const model = value.model === void 0 ? settings.model : value.model;
	if (typeof model !== "string" || model.trim().length === 0 || model.length > 256) throw new AntigravityVideoError("The video model is invalid", "INVALID_ARGS");
	return {
		path: value.path,
		prompt: value.prompt.trim().slice(0, 16384),
		model: model.trim()
	};
}
function requireAgent(exec) {
	if (exec.agent === void 0) throw new AntigravityVideoError("Video analysis requires an active workspace", "VIDEO_WORKSPACE_REQUIRED");
	workspaceCwd(exec.agent);
	return exec.agent;
}
function workspaceCwd(agent) {
	const cwd = agent.session.header.cwd;
	if (typeof cwd !== "string" || cwd.length === 0) throw new AntigravityVideoError("Video analysis requires an active workspace", "VIDEO_WORKSPACE_REQUIRED");
	return cwd;
}
const VIDEO_FAILURE_CODES = {
	authentication: "VIDEO_AUTH_REQUIRED",
	forbidden: "VIDEO_FORBIDDEN",
	"rate-limited": "VIDEO_RATE_LIMITED",
	cancelled: "VIDEO_CANCELLED",
	timeout: "VIDEO_TIMEOUT",
	"attribution-rejected": "VIDEO_PROTOCOL_DRIFT",
	"protocol-drift": "VIDEO_PROTOCOL_DRIFT",
	"response-limit": "VIDEO_PROTOCOL_DRIFT",
	"request-limit": "VIDEO_PROTOCOL_DRIFT",
	upstream: "VIDEO_FAILED",
	network: "VIDEO_FAILED",
	failed: "VIDEO_FAILED"
};
function toVideoError(error) {
	if (error instanceof AntigravityVideoError) return error;
	if (error instanceof PrivateTransportError) return new AntigravityVideoError("The Antigravity Video request failed safely", VIDEO_FAILURE_CODES[classifyPrivateFailure(error)]);
	return new AntigravityVideoError("The Antigravity Video request failed safely", "VIDEO_FAILED");
}
function hasControl(value) {
	for (const character of value) {
		const code = character.charCodeAt(0);
		if (code < 32 || code === 127) return true;
	}
	return false;
}
function hasExtra(value, allowed) {
	return Object.keys(value).some((key) => !allowed.includes(key));
}
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
const videoSchema = {
	type: "object",
	properties: {
		text: { type: "string" },
		usage: {
			type: "object",
			properties: {
				inputTokens: { type: "integer" },
				outputTokens: { type: "integer" },
				cacheReadTokens: { type: "integer" },
				reasoningTokens: { type: "integer" }
			},
			required: ["inputTokens", "outputTokens"],
			additionalProperties: false
		}
	},
	required: ["text"],
	additionalProperties: false
};
//#endregion
//#region direct/legacy/src/integrated-network.ts
var import_undici = require_undici();
/** Per-backend networking: no global dispatcher or silent proxy fallback. */
function createIntegratedNetwork(readProxy) {
	const direct = new import_undici.Agent();
	const proxies = /* @__PURE__ */ new Map();
	const transport = createPrivateTransport({ proxyUrl: readProxy });
	const fetchImpl = async (input, init) => {
		const proxy = readProxy();
		if (!validDirectProxy(proxy)) throw new Error("Invalid direct HTTP proxy");
		let dispatcher = direct;
		if (proxy !== "") {
			let existing = proxies.get(proxy);
			if (!existing) {
				existing = new import_undici.ProxyAgent(proxy);
				proxies.set(proxy, existing);
			}
			dispatcher = existing;
		}
		const callerSignal = init?.signal ?? void 0;
		const timeout = AbortSignal.timeout(1e4);
		const signal = callerSignal ? AbortSignal.any([callerSignal, timeout]) : timeout;
		return await (0, import_undici.fetch)(input, {
			...init,
			redirect: "error",
			signal,
			dispatcher
		});
	};
	return {
		transport,
		fetchImpl,
		close: async () => {
			await Promise.allSettled([direct.close(), ...Array.from(proxies.values(), (proxy) => proxy.close())]);
		}
	};
}
//#endregion
//#region direct/legacy/src/integrated-host.ts
/** Called only after the user enabled the experimental backend and restarted. */
async function mountDirectBackend(ctx, getConfig, watch, makeNetwork = createIntegratedNetwork) {
	const network = makeNetwork(() => getConfig().directProxyUrl);
	ctx.effect(() => () => network.close());
	const authFiber = ctx.plugin({
		name: name$3,
		inject: inject$3,
		apply: (child) => apply$3(child, network)
	});
	ctx.plugin({
		name: name$2,
		inject: inject$2,
		apply: (child) => apply$2(child, {
			enabled: { get: () => getConfig().directSearch },
			model: ANTIGRAVITY_SEARCH_MODEL,
			maxResults: 10
		}, watch, network.transport)
	});
	ctx.plugin({
		name: name$1,
		inject: inject$1,
		apply: (child) => apply$1(child, {
			enabled: { get: () => getConfig().directImage },
			model: ANTIGRAVITY_IMAGE_MODEL,
			n: 1
		}, watch, network.transport)
	});
	ctx.plugin({
		name,
		inject,
		apply: (child) => apply(child, {
			enabled: { get: () => getConfig().directVideo },
			model: ANTIGRAVITY_VIDEO_MODEL,
			maxBytes: 33554432
		}, watch, network.transport)
	});
	await authFiber;
}
//#endregion
export { mountDirectBackend };
