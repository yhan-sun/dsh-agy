# Authentication notes

The two transports keep their credentials separately. AGY mode hands tokens to the official binary in its own format; the experimental direct transport keeps a store of its own. Neither mode falls back to the other's credentials.

## AGY mode (default)

1. **`/agy auth`**, or **Add account** in **Settings → Antigravity**, starts a standard OAuth 2.0 loop in the plugin: PKCE with `code_challenge_method=S256`, `access_type=offline`, `prompt=consent`, and the fixed loopback callback `http://localhost:51121/oauth-callback`. The consent screen opens in the browser on the machine running the Host.
2. The authorization code is captured automatically by the loopback listener. **`/agy auth-code <code|callback-url>`** is the manual fallback for when the callback cannot reach the Host; an expired or cancelled attempt cannot be reused.
3. The plugin exchanges the code at Google's token endpoint and writes the result in `agy`'s own on-disk format — `<HOME>/.gemini/antigravity-cli/antigravity-oauth-token` as `{"token": {...}, "auth_method": "consumer"}` — so the official binary picks it up unchanged. For pool accounts `HOME` is the per-account directory `~/.dsh/agy-accounts/<id>` (created with mode `0700`), so accounts never read each other's tokens.
4. On cancel or dispose the callback server is closed rather than left listening.

**Scopes requested:** `cloud-platform`, `userinfo.email`, `userinfo.profile`, `cclog`, `experimentsandconfigs`. `openid` is deliberately not requested — with this client it routes Google into a consent flow that hangs.

**Client identity.** The package carries the public desktop OAuth client inherited from the attributed core source. It is an application identity, not a user's access or refresh token, and it is what makes sign-in work out of the box. To use a client you registered yourself, set **both** `AGY_CLIENT_ID` and `AGY_CLIENT_SECRET` in the environment that launches the Host; supplying only one is rejected rather than silently half-overridden. Review Google's consent-screen requirements before registering a client.

**Callback port.** `51121` is fixed because it is the redirect URI registered for that client. If another process holds it, identify the process (`lsof -nP -iTCP:51121 -sTCP:LISTEN`), close it only when safe, and start a fresh login.

## Token refresh and expiry

Refresh uses the same client pair and the same token endpoint, and stays bound to the account that started it, so a delayed refresh cannot overwrite a different active account. Concurrent refreshes for one account share a single in-flight attempt. When a token expires mid-session, calls fail fast with an `AUTH` error pointing at `/agy auth` instead of retrying and burning quota, and the account is marked as needing sign-in and excluded from dispatch until a refresh succeeds.

## Direct transport (experimental)

Direct mode needs its own client identity — it does not reuse AGY mode's built-in one. Provide `AGY_CLIENT_ID` and `AGY_CLIENT_SECRET` together, or a local-only file at `~/.dsh/agy-link/direct/oauth-client.json` with mode `0600` (owner-only; a file that is group- or world-writable is refused) and the fields `clientId` and `clientSecret`. Without either, direct OAuth reports `client-not-configured` rather than falling back. Its tokens live in a store of its own, `~/.dsh/agy-link/direct/auth.json`, written with owner-only permissions (`0600` under a `0700` directory), and are never shared with AGY mode. A third-party client identity is not a Google endorsement and can stop working.

## Report hygiene

`/agy doctor` redacts Google auth URLs, `4/...` authorization codes, `ya29.*` access tokens, `1//0…` refresh tokens, OIDC/JWT `id_token`s, `AIza…`/`sk-…`/`GOCSPX-…` keys, credential-bearing proxy URLs and `Bearer` headers before the report is written to disk. Read it anyway before attaching it to an issue, and never attach `antigravity-oauth-token`, `pool.json`, `direct/auth.json` or `oauth-client.json`.
