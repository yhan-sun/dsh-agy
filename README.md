# dsh-agy

**Google Antigravity (`agy`) models for DeepSeek Harness (DSH).** This is a community fork of [amlyczz/dsh-agy-link](https://github.com/amlyczz/dsh-agy-link), adapted for DSH with manual account selection as the default, proxy validation, and DSH-native settings UI.

> **Account policy:** Google’s [Antigravity FAQ](https://antigravity.google/docs/faq/) says personal plans do not support wrapping `agy` in third-party coding agents. Using this plugin may put an account at risk of restriction. This project cannot guarantee that an account will not be restricted. Review Google’s current terms before connecting an account.

## Install

Install the public GitHub package into DSH Desktop:

```bash
dsh plugin --profile desktop add github:yhan-sun/dsh-agy
```

The package keeps the upstream plugin ID `dsh-agy-link`; update or remove an existing copy of that plugin in the same DSH profile before installing this fork.

Restart DSH. Open **Settings → Plugins → Antigravity** to sign in and configure the plugin. You can also select an Antigravity model from DSH’s model picker.

Requirements: DSH, Node.js 24 or newer, Google’s `agy` CLI available on `PATH`, and your own Google OAuth client credentials. The plugin intentionally does not bundle OAuth credentials. Configure a Google OAuth client suitable for a native app, then start DSH with these variables set in its environment:

```bash
export AGY_CLIENT_ID="<your-client-id>.apps.googleusercontent.com"
export AGY_CLIENT_SECRET="<your-client-secret>"
# Launch DSH from this same environment.
```

Review Google’s consent-screen requirements. The plugin uses the installed `agy` executable for model requests and tool execution; it does not include or modify that CLI.

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
```

The source fork and behavior changes are described in [LOCAL-FORK.md](LOCAL-FORK.md). Security notes are in [docs/SECURITY-NOTES.md](docs/SECURITY-NOTES.md), and configuration details are in [docs/CONFIGURATION.md](docs/CONFIGURATION.md).

This project is MIT licensed; see [LICENSE](LICENSE). It is an independent community fork and is not endorsed by Google or DeepSeek.
