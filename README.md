# dsh-agy

**Google Antigravity models inside DeepSeek Harness.** One DSH plugin that exposes the models behind your Antigravity subscription — Gemini, Claude and GPT-OSS — as a normal DSH provider route: streaming replies, thinking, native tool cards, multi-account pool, quota, proxy settings and in-GUI Google sign-in.

It builds on source from [amlyczz/dsh-agy-link](https://github.com/amlyczz/dsh-agy-link), [suntianc/dsh-antigravity-auth](https://github.com/suntianc/dsh-antigravity-auth) and CortexKit; attribution and licenses for the integrated code are in [direct/README.md](direct/README.md). See [LOCAL-FORK.md](LOCAL-FORK.md) for what this fork changes.

> **Account policy.** Google's [Antigravity FAQ](https://antigravity.google/docs/faq/) states that personal plans do not support wrapping `agy` in third-party coding agents. Using this plugin may put an account at risk of restriction, and this project cannot guarantee that one will not be. Read Google's current terms before connecting an account. Unofficial endpoints can also change or stop working without notice.

English | [中文](README.zh.md)

- [Two transports](#two-transports)
- [Requirements](#requirements)
- [Install](#install)
- [Quick start](#quick-start)
- [Features](#features)
- [Commands](#commands)
- [Configuration](#configuration)
- [Proxy and network](#proxy-and-network)
- [Security and data locations](#security-and-data-locations)
- [Troubleshooting](#troubleshooting)
- [Development](#development)
- [Documentation](#documentation)
- [License and attribution](#license-and-attribution)

## Two transports

| Mode | What it does | Needs |
| --- | --- | --- |
| **AGY CLI** (default) | Spawns the official, unmodified `agy` binary per turn and streams its output back into DSH. Tools run inside `agy` under the permission mode you pick. | Google's `agy` CLI on `PATH` (or `agyBin`), and a signed-in account. |
| **Experimental direct** | Off by default. Talks to the private Antigravity endpoints in-process, so no `agy` install is required. Separate credentials, separate provider entry, no fallback between the two modes. | Your own OAuth client (see [Requirements](#requirements)) and an explicit opt-in in settings. Relies on non-public interfaces; availability is not guaranteed and features are not verified against every account. |

Enable direct mode under **Settings → Antigravity**, then select an `Antigravity (direct, experimental)` model explicitly. Search, image generation and video analysis are individually opt-in there. If you also have `dsh-antigravity-auth` installed in the same profile, disable it to avoid two providers claiming the same route.

## Requirements

- A working DSH installation (Host + Web/Desktop client).
- Node.js `>= 24`.
- Google's `agy` CLI on `PATH` for AGY CLI mode — this plugin does not bundle or modify the CLI.
- A Google account with Antigravity access, and network reachability to Google (proxy/TUN where required).
- **AGY mode needs no OAuth client of your own.** The package carries the public desktop OAuth client identity inherited from the attributed core source, which is an application identity rather than any user credential. To use a client you registered yourself, set **both** `AGY_CLIENT_ID` and `AGY_CLIENT_SECRET` in the environment that launches the DSH host (one without the other is an error); review Google's consent-screen requirements before registering one.
- **Direct mode needs its own client identity.** Provide `AGY_CLIENT_ID` and `AGY_CLIENT_SECRET` together, or keep a local-only file at `~/.dsh/agy-link/direct/oauth-client.json` with owner-only permissions (`0600`) and the fields `clientId` and `clientSecret`. Without one, direct sign-in reports `client-not-configured` instead of falling back.

## Install

Install the published GitHub archive into the profile you use:

```sh
dsh plugin --profile desktop add 'https://codeload.github.com/yhan-sun/dsh-agy/tar.gz/refs/heads/main'
dsh plugin --profile desktop list
```

Replace `desktop` with your actual profile (`web`, `desktop`, …). Replace `refs/heads/main` with a commit SHA to pin a specific build. The repository ships the built `dist/`, so the archive is directly installable.

Then restart the Host (for the Web profile, `dsh web`) and refresh the client.

Two things to know:

- **Plugin id collision.** This package keeps the upstream id `dsh-agy-link`. Remove or disable an existing `dsh-agy-link` (or `dsh-antigravity-auth`) in the same profile before installing; two copies of one id cannot both be active.
- **Strict pnpm build policy.** DSH may flag a git-hosted dependency as an unapproved build even though this package has no `prepare` script. If that happens, add the exact package key from the error to the profile's `pnpm-workspace.yaml` under `allowBuilds` with the value `false` — that explicitly denies running build scripts — and retry. Runtime libraries such as `qrcode` are still installed by pnpm.

## Quick start

1. Open **Settings → Antigravity** and choose **Add account** to sign in through Google in your browser. From the terminal, `/agy auth` starts the same flow, and `/agy auth-code <code>` finishes it by hand if the browser callback is unavailable.
2. Check the result with `/agy status` (binary, version, auth, mode, catalog) and `/agy pool` (accounts, live quota, cooldowns).
3. Pick an Antigravity model in DSH's model picker, or with `/agy models` after a refresh, and start a session.
4. Optional: set the permission mode (`/agy mode plan|accept-edits|skip`), the default reasoning effort (`/agy effort …`), the workspace (`/agy workspace <absolute path>`), or enable direct mode / auto-translation in the settings cards.

Sign-in and a usable project are required for the catalog to be live. When `agy models` cannot run (signed out or offline), the picker falls back to a pinned catalog, so a listed model is not proof that the backend will serve it.

## Features

- **Models.** Provider `Antigravity (agy CLI)` (id `antigravity`) plus the optional `Antigravity (direct, experimental)` route. The live catalog comes from `agy models`; effort levels are passed only where the CLI accepts them, and a rejected `--effort` is learned rather than repeated.
- **Streaming with thinking.** Text, reasoning and tool activity stream into DSH's native UI. Reasoning blocks keep the English original; a Chinese layer can be shown above them (`translateThinking`, on by default).
- **Native tool cards.** `agy` tool activity is mirrored back as DSH tool cards (`agy_tool`), including diffs reconstructed from `agy`'s own session database, so terminal and edit steps are readable in the GUI instead of buried in text.
- **Multi-account pool.** Manual selection by default — an exhausted, disabled or signed-out account never switches behind your back. Sequential and round-robin dispatch are explicit opt-ins. Per-account enable/disable, alias, proxy, quota and cooldown state; `pool.json` writes are atomic and recover from a last-good snapshot.
- **Quota.** Five-hour and weekly windows per family (Gemini / Claude / GPT-OSS), plus the Argon weekly counter where the backend reports it. A quota that cannot be read stays `unknown` in the dashboard and in `/agy pool` rather than being reported as zero.
- **Permission modes.** `plan`, `accept-edits` (default) and `skip`. `skip` passes `--dangerously-skip-permissions` to `agy` and is an explicit unattended-execution choice — it does not bypass `agy`'s hardcoded protections and is not a substitute for DSH's own approvals. Plan output and goal completion are bridged back into DSH as the corresponding tool calls.
- **Session continuity.** Each DSH session is bound to a native `agy` conversation (`--conversation`), with a resumable binding after a stop or steer.
- **Multimodal input.** Images are staged locally and authorized to `agy` through `--add-dir`; size, count and lifetime are configurable.
- **Optional tools.** `agy_ask` delegates a one-off task to an Antigravity model; the loopback MCP bridge can expose DSH-side MCP servers into `agy` behind an allowlist. Both are off by default.
- **Translation.** `/tsl` rewrites the last turn in plain language, with an auto-translate mode for every completed turn and a selectable translate model and effort.
- **Guardrails.** Activity watchdog plus an optional wall-clock cap per turn (`maxTurnMinutes`), an idle budget while a tool step is open, a cross-session concurrency cap, and an optional requests-per-minute admission limit.
- **Diagnostics.** `/agy doctor` writes a redacted report (tokens, authorization codes, credential-bearing proxy URLs and API keys are stripped before the file is written). Telemetry is disabled by default.
- **Interface.** Light and dark themes follow DSH, with English, Chinese, Spanish and Brazilian-Portuguese UI strings and a responsive mobile layout.

## Commands

`/agy` dispatches on its first token:

```text
/agy status                     binary, version, auth, mode, catalog, bindings
/agy pool | accounts            account pool, live quota %, cooldowns
/agy goal [status|complete|clear|pause]
/agy session [info|clear]       view or drop the current agy binding
/agy add-account [alias]        OAuth login for a new account slot
/agy enable-account <id>        /  /agy disable-account <id>
/agy refresh-quota              query Google for fresh quota percentages
/agy clear-cooldown             reset cooldown timers and any low-quota bench
/agy remove-account <id>
/agy auth                       Google login for the primary account
/agy auth-code <code|url>       finish a login by pasting the code
/agy models                     refresh and list discovered models
/agy mode <skip|plan|accept-edits>
/agy effort <low|medium|high|default>
/agy dispatch [minutes|off]     credential-slot wait cap per attempt
/agy dispatch-retries <0-10>
/agy parallel <on|off>          same-account parallel runs (Windows slot fast path)
/agy max-concurrent <n|off>     cap on concurrent agy request streams
/agy workspace [path]           agy working directory (absolute path)
/agy clear                      drop the most recent conversation binding
/agy doctor                     write a redacted diagnostic report
/agy help
```

`/tsl` rewrites a turn in plain language: `/tsl [turn] [--full] [--print] [--model id] [--effort x]`, `/tsl auto [on|off|status]`, `/tsl help`.

## Configuration

Resolution order, highest first: `DSH_AGY_*` environment variable → runtime override written by `/agy` → plugin entry config in the DSH profile → built-in default. The full reference with every key, environment variable and default is [docs/CONFIGURATION.md](docs/CONFIGURATION.md); the values people change most often:

| Key | Environment | Default | Notes |
| --- | --- | --- | --- |
| `enabled` | `DSH_AGY_ENABLED` | `true` | Master switch |
| `agyBin` | `DSH_AGY_BIN` | auto-detect | Path to the `agy` executable |
| `permissionMode` | `DSH_AGY_MODE` | `accept-edits` | `skip` / `plan` / `accept-edits` |
| `defaultModel` / `defaultEffort` | `DSH_AGY_DEFAULT_MODEL` / `DSH_AGY_DEFAULT_EFFORT` | agy default / `high` | Initial picker values |
| `timeoutMs` | `DSH_AGY_TIMEOUT_MS` | `600000` | Activity watchdog per turn |
| `maxTurnMinutes` | `DSH_AGY_MAX_TURN_MINUTES` | `0` (off) | Hard wall-clock cap per turn |
| `experimentalDirect` | — | `false` | Opt-in direct transport |
| `proxyUrl` | `DSH_AGY_PROXY_URL` | `''` | Global proxy; per-account proxy wins |
| `autoTranslate` / `translateThinking` | `DSH_AGY_AUTO_TRANSLATE` / `DSH_AGY_TRANSLATE_THINKING` | `false` / `true` | Translation switches |
| `warmStart` | `DSH_AGY_WARM_START` | `false` | Opt-in pre-warm of the next `agy` process |
| `askTool` / `mcpBridge` | `DSH_AGY_MCP_BRIDGE` | `false` | Optional tools, both off by default |

## Proxy and network

Account proxies accept HTTP, HTTPS and SOCKS5 URLs; malformed addresses are rejected and proxy credentials are never echoed back into errors, logs or `/agy pool` output. A per-account proxy takes precedence over the global one. The direct transport has its own separate proxy setting (`directProxyUrl`, HTTP CONNECT); leave it empty for a direct connection. The browser step of OAuth uses the browser's own network settings, which are not covered by these values.

## Security and data locations

- The plugin only executes the `agy` binary you configured or that was found on `PATH`; argv is passed as an array, never through a shell, and each spawn is its own process group that the watchdog can kill whole.
- Sign-in writes the token in `agy`'s own on-disk format so the official binary can use it. Pool accounts get a private HOME each: `~/.dsh/agy-accounts/<id>` (`0700`) with the token file and `pool.json` at `0600`. On Windows `agy` reads one process-global Credential Manager target instead, so the plugin serialises handoff of that slot and restores the previous owner's credential — see [docs/SECURITY-NOTES.md](docs/SECURITY-NOTES.md).
- The primary account slot mirrors whatever is logged into the real system HOME; signing in there updates that slot in place and never deletes or rewrites the real home directory.
- Direct-mode client credentials stay in the environment or in `~/.dsh/agy-link/direct/oauth-client.json` (`0600`); its tokens stay in `~/.dsh/agy-link/direct/auth.json` and are never shared with AGY mode.
- Never attach `antigravity-oauth-token`, `pool.json`, `direct/auth.json`, `oauth-client.json`, authorization/callback URLs or raw media payloads to a bug report. `/agy doctor` strips them, but read the file before you send it.
- The loopback MCP bridge binds to `127.0.0.1` only, requires a per-process random bearer token compared in constant time, enforces `mcpToolAllowlist` at execution time, and caps request bodies.
- Full threat model: [docs/SECURITY-NOTES.md](docs/SECURITY-NOTES.md). Headless permission behaviour: [docs/HEADLESS-PERMISSIONS.md](docs/HEADLESS-PERMISSIONS.md). Known gaps: [docs/KNOWN-GAPS.md](docs/KNOWN-GAPS.md).

## Troubleshooting

| Symptom | Check |
| --- | --- |
| Settings section missing after install | Confirm the plugin is in the *running* profile (`dsh plugin --profile <p> list`), restart the Host, refresh the client. |
| `agy` not found / no models | `agy --version` in the same environment that launches DSH; set `DSH_AGY_BIN`. Run `/agy models` to refresh, `/agy doctor` for a report. |
| Login never completes | The browser step happens on the Host machine. Use `/agy auth-code <code>` if the callback cannot reach the Host; a cancelled or expired code cannot be reused. |
| Build approval error while installing | See the `allowBuilds` note under [Install](#install). |
| A turn is killed unexpectedly | Raise `timeoutMs` / `longToolIdleMinutes`, or check whether you set `maxTurnMinutes`. |
| Duplicate providers | Disable `dsh-antigravity-auth` or an upstream `dsh-agy-link` copy in the same profile. |
| 401/403 or quota errors | Re-authenticate the affected account; for rate limits wait for the window to reset. The pool does not rotate accounts to bypass limits unless you explicitly enable sequential or round-robin dispatch. |

## Development

```sh
pnpm install --frozen-lockfile
pnpm run check      # type checks (host + direct)
pnpm run build      # emits dist/, which is committed
pnpm test           # offline suite
pnpm run test:direct -- --maxWorkers=4
```

`dist/` is part of the repository because installs use the source archive directly: rebuild and commit it alongside every source change. Routine verification must not perform real Google OAuth or send requests with a user's account — use isolated fixtures. Never commit profiles, `.gemini` data, OAuth tokens, proxy credentials or generated archives.

## Documentation

- [Configuration reference](docs/CONFIGURATION.md) · [Security notes](docs/SECURITY-NOTES.md) · [Headless permissions](docs/HEADLESS-PERMISSIONS.md) · [Authentication](docs/AUTH.md) · [Known gaps](docs/KNOWN-GAPS.md)
- [Fork notes (中文)](LOCAL-FORK.md) · [Account pool ADR](docs/adr-012-account-pool.md) and [spec](docs/spec-account-pool.md)
- [Direct transport sources and attribution](direct/README.md)
- [Changelog](CHANGELOG.md) — entries up to `0.6.15` are upstream's; fork-local changes are listed under *Unreleased*.

## License and attribution

MIT — see [LICENSE](LICENSE). This is an independent community fork, not endorsed by Google or DeepSeek. It builds on [amlyczz/dsh-agy-link](https://github.com/amlyczz/dsh-agy-link) (commit `2e2c4ee4f2c1e9d24e5602da3548a8ff44dc7a93`, MIT), [suntianc/dsh-antigravity-auth](https://github.com/suntianc/dsh-antigravity-auth) (commit `57d1004e8727f17b4745de6f674ad56e93a3f858`, MIT, vendored under `direct/legacy`), and `@cortexkit/antigravity-auth-core` 2.2.0 (MIT, vendored under `direct/core`); Undici is bundled under its own MIT license ([direct/UNDICI-LICENSE](direct/UNDICI-LICENSE)).
