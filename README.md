# dsh-agy

**Google Antigravity (`agy`) models for DeepSeek Harness (DSH).** A single DSH plugin with an AGY CLI backend and an optional experimental direct backend. It builds on source from [amlyczz/dsh-agy-link](https://github.com/amlyczz/dsh-agy-link), [suntianc/dsh-antigravity-auth](https://github.com/suntianc/dsh-antigravity-auth), and CortexKit; attribution and licenses for the integrated code are included in [direct/README.md](direct/README.md).

> **Account policy:** Google’s [Antigravity FAQ](https://antigravity.google/docs/faq/) says personal plans do not support wrapping `agy` in third-party coding agents. Using this plugin may put an account at risk of restriction. This project cannot guarantee that an account will not be restricted. Review Google’s current terms before connecting an account.

## Install

Install the public GitHub package into DSH Desktop:

```bash
dsh plugin --profile desktop add 'https://codeload.github.com/yhan-sun/dsh-agy/tar.gz/refs/heads/main'
```

The package keeps the upstream plugin ID `dsh-agy-link`; update or remove an existing copy of that plugin in the same DSH profile before installing this fork.

The repository includes the built files. Use the source archive above (or replace `refs/heads/main` with a commit SHA to pin it): DSH’s strict pnpm policy may still classify a `github:` dependency as an unapproved build even without a prepare script. An archive install avoids that Git-package classification. The archive contains the integrated source; normal runtime libraries such as `qrcode` are installed by pnpm. Maintainers must rebuild and commit `dist` alongside source changes.

Restart DSH. Open **Settings → Antigravity** to sign in and configure the plugin. You can also select an Antigravity model from DSH’s model picker.

Requirements: DSH, Node.js 24 or newer, Google’s `agy` CLI available on `PATH`, and your own Google OAuth client credentials. The plugin intentionally does not bundle OAuth credentials. Configure a Google OAuth client suitable for a native app, then start DSH with these variables set in its environment:

```bash
export AGY_CLIENT_ID="<your-client-id>.apps.googleusercontent.com"
export AGY_CLIENT_SECRET="<your-client-secret>"
# Launch DSH from this same environment.
```

Review Google’s consent-screen requirements. By default, model requests and tools use the installed `agy` executable; this plugin does not bundle or modify the CLI.

### Experimental direct mode

In Antigravity settings, explicitly enable experimental direct mode. Its source is included in this package: it is not a second DSH plugin and does not require installing AGY to make direct requests. Configure the OAuth variables above in the DSH host environment, acknowledge the risk, and log in separately in the direct section. Select an `Antigravity (direct, experimental)` model explicitly. AGY and direct credentials are separate, and neither mode falls back to the other. The direct integration relies on non-public interfaces and availability is not guaranteed; features and models require real-account validation.

The direct HTTP CONNECT proxy is configured separately from the AGY proxy; leave it empty for a direct connection. Browser OAuth uses the browser’s own network settings. Search, image generation and video analysis are individually opt-in experimental features. Account switching is manual. Disable any separately installed `dsh-antigravity-auth` plugin in the same profile to avoid duplicate providers.

## Features

- Google OAuth login and account management in the DSH settings UI.
- Multiple accounts, with **manual account selection by default**. Sequential or round-robin switching can be enabled explicitly.
- Quota display, HTTP(S)/SOCKS proxy settings, streaming responses, reasoning annotations, and DSH-native tool activity cards.
- Permission modes: `plan`, `accept-edits` (default), and `skip`. `skip` allows the agent to run tools without permission prompts; use it only if you understand the consequences.
- Light and dark themes follow DSH’s interface.

## Development

```bash
pnpm install --frozen-lockfile
pnpm run check
pnpm run build
pnpm test
pnpm run test:direct -- --maxWorkers=4
```

The source fork and behavior changes are described in [LOCAL-FORK.md](LOCAL-FORK.md). Security notes are in [docs/SECURITY-NOTES.md](docs/SECURITY-NOTES.md), and configuration details are in [docs/CONFIGURATION.md](docs/CONFIGURATION.md).

This project is MIT licensed; see [LICENSE](LICENSE). It is an independent community fork and is not endorsed by Google or DeepSeek.
