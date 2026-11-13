# Security notes

Threat model and boundaries for dsh-agy-link.

## What the plugin executes

- Only the agy binary resolved from config (`agyBin`) or `PATH` /
  `~/.local/bin`. No shell interpolation: argv is passed as an array.
- Prompt text is passed as a single `-p` argument, never through a shell.
- Every spawn is its own detached process group; watchdog + abort signal
  kill the whole tree (no orphaned agy processes).

## What it can do to your machine

Whatever agy itself may do under the configured permission mode. **skip**
(`--dangerously-skip-permissions`) auto-approves ordinary AGY permission
prompts for unattended file writes and shell execution inside agy's workspace
— treat it like giving any other agent skip-permissions. It does **not** bypass
AGY hardcoded system protections. The GUI marks this mode red for a reason.

## Headless permission behavior

The bridge forwards the configured `plan` or `accept-edits` mode to the
official `agy` process; it does not answer permission prompts or bypass them.
In a headless/print invocation, agy may automatically deny a tool request.
The bridge preserves that raw tool error in run status. Such an automatic
denial is **not** evidence that a person approved or denied a prompt.
Missing-file failures are reported as `missing_file`, not as approval outcomes;
hardcoded-system-protection failures remain distinct. Raw AGY tool error text
and its error result are preserved for replay.

Do not rely on undocumented wildcard behavior for `plan` or `accept-edits`.
Use a deliberately scoped workspace and test the exact commands and agy
version you intend to operate. `skip` remains an explicit unattended-execution
choice, not a fallback applied by this plugin.

## Where credentials live

Signing in means writing the token in `agy`'s own on-disk format, so that the
official binary can use it. The plugin does write that file — for the account
being signed in, and nothing else:

- **POSIX.** Each pool account gets its own HOME under
  `~/.dsh/agy-accounts/<id>` (mode `0700`), and its token file
  `.gemini/antigravity-cli/antigravity-oauth-token` is written with mode `0600`.
  Pool records (`pool.json`, plus a `pool.json.last-good` snapshot) sit in the
  same directory and also carry `0600`.
- **The primary slot** represents whatever account is logged into the real
  system HOME. Signing in there updates that account in place; the plugin never
  stages, commits or deletes the real home directory.
- **Windows.** `agy.exe` resolves its Google credential from one process-global
  Credential Manager target, `gemini:antigravity`, and ignores `HOME` there — so
  directory isolation does not isolate credentials. Multi-account work therefore
  hands that single slot back and forth: slot ownership is serialised, the
  credential's identity is verified before it is adopted, and the previous
  owner's credential is restored. A durable primary record makes a later handoff
  restore the login that actually started it rather than "whatever the slot
  happened to hold". `dispatchTimeoutMinutes`, `dispatchRetries` and
  `parallelSameAccount` govern how long a run waits for the slot.
- **Direct transport.** Separate store (`~/.dsh/agy-link/direct/`), separate
  client identity, separate login. It never imports an AGY-mode account and is
  never used as an automatic fallback.

## What it never touches

- DSH-side secrets, API keys, or other providers' configuration.
- An existing `agy` login is never imported implicitly; sign-in is an explicit
  action, and its tokens are written only into the account directory that owns
  the flow.
- Log and diagnostic output: `/agy doctor` redacts before writing (see below),
  and proxy credentials are never echoed back into errors or `/agy pool`.

## Report hygiene

`/agy doctor` writes its report with redaction: Google auth URLs,
`4/...` authorization codes, `ya29.*` access tokens, `1//0…` refresh tokens,
OIDC/JWT `id_token`s, `AIza…`/`sk-…`/`GOCSPX-…` API keys, credentialed proxy
URLs, and `Bearer` headers are stripped before the file hits disk. Still read it
before attaching.

## HTTP surfaces and request-body caps

- The plugin's web routes (`/plugins/agy-link/*`) and the experimental loopback
  MCP bridge (`/call`) share one bounded JSON body reader
  (`src/host/read-json-body.ts`): bodies are capped (1 MiB for plugin routes,
  8 MiB for `/call`) and oversized bodies are discarded rather than buffered, so
  a local client — including a prompt-injected agy child holding the bridge token
  — cannot exhaust host memory by streaming a huge POST body.
- The MCP bridge binds to `127.0.0.1` only, requires a per-process random bearer
  token compared in constant time, enforces `mcpToolAllowlist` at execution time,
  and never exposes the internal `run_code`/`agy_ask`/`agy_tool` tools.
