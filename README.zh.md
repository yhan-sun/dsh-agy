# dsh-agy

**在 DeepSeek Harness（DSH）里使用 Google Antigravity 模型。** 一个 DSH 插件，把 Antigravity 订阅背后的模型（Gemini、Claude、GPT-OSS）作为普通的 DSH provider 路由暴露出来：流式回复、思考过程、原生工具卡片、多账号池、额度大盘、代理设置，以及界面内的 Google 登录。

本项目基于 [amlyczz/dsh-agy-link](https://github.com/amlyczz/dsh-agy-link)、[suntianc/dsh-antigravity-auth](https://github.com/suntianc/dsh-antigravity-auth) 与 CortexKit 的源码构建，集成代码的署名与许可证见 [direct/README.md](direct/README.md)；本副本的改动与差异见 [LOCAL-FORK.md](LOCAL-FORK.md)。

> **账号政策。** Google 的 [Antigravity FAQ](https://antigravity.google/docs/faq/) 明确说明个人订阅不支持把 `agy` 包装进第三方编程 Agent。使用本插件可能带来账号受限风险，本项目无法保证账号不受限。绑定账号前请阅读 Google 当前条款。非官方接口也可能随时变更或失效。

[English](README.md) | 中文

- [两种传输方式](#两种传输方式)
- [环境要求](#环境要求)
- [安装](#安装)
- [快速开始](#快速开始)
- [功能](#功能)
- [命令](#命令)
- [配置](#配置)
- [代理与网络](#代理与网络)
- [安全与数据位置](#安全与数据位置)
- [故障排查](#故障排查)
- [开发](#开发)
- [文档](#文档)
- [许可与署名](#许可与署名)

## 两种传输方式

| 模式 | 说明 | 前置条件 |
| --- | --- | --- |
| **AGY CLI**（默认） | 每轮调用官方未经修改的 `agy` 可执行程序，把它的输出流回 DSH；工具在 `agy` 内按你选择的权限模式执行。 | `PATH` 中有 Google 的 `agy` CLI（或用 `agyBin` 指定），并已登录账号。 |
| **实验性直连** | 默认关闭。在进程内直接访问 Antigravity 私有接口，因此不需要安装 `agy`。凭据独立、provider 条目独立，两种模式之间不会互相回退。 | 你自己配置的 OAuth 客户端（见[快速开始](#快速开始)），并在设置中显式开启。依赖非公开接口，不保证可用性，功能与模型需要真实账号验证。 |

在 **设置 → Antigravity** 中开启「实验性直连」，然后显式选择 `Antigravity (direct, experimental)` 模型。搜索、图像生成、视频分析各自单独开关。若同一 profile 中还装有 `dsh-antigravity-auth`，请停用，避免两个 provider 抢占同一路由。

## 环境要求

- 可用的 DSH 安装（Host + Web/Desktop 客户端）。
- Node.js `>= 24`。
- AGY CLI 模式下需要 `PATH` 中的 Google `agy` CLI —— 本插件不打包、也不修改该 CLI。
- 具备 Antigravity 权限的 Google 账号，以及到 Google 的网络可达性（必要时使用代理/TUN）。
- **AGY 模式不需要自备 OAuth 客户端。** 包内带有从署名核心源码继承的公开桌面客户端标识，它是应用身份，不是任何用户凭据。若要使用自己注册的客户端，请在启动 DSH host 的进程环境中**同时**设置 `AGY_CLIENT_ID` 与 `AGY_CLIENT_SECRET`（只设其中一个会报错）；注册前请确认 Google 的同意页要求。
- **直连模式需要自己的客户端身份。** 同时提供 `AGY_CLIENT_ID` 与 `AGY_CLIENT_SECRET`；或把仅本地使用的配置放在 `~/.dsh/agy-link/direct/oauth-client.json`，权限 `0600`，字段为 `clientId` 与 `clientSecret`。缺少客户端时直连登录报 `client-not-configured`，不会回退。

## 安装

安装到实际使用的 profile：

```sh
dsh plugin --profile desktop add 'https://codeload.github.com/yhan-sun/dsh-agy/tar.gz/refs/heads/main'
dsh plugin --profile desktop list
```

把 `desktop` 换成你的 profile（`web`、`desktop` 等）；把 `refs/heads/main` 换成提交 SHA 可以钉住某个构建。仓库内已包含构建产物 `dist/`，源码归档可直接安装。

随后重启 Host（Web profile 即 `dsh web`）并刷新客户端。

两点需要注意：

- **插件 ID 冲突。** 本包沿用上游 ID `dsh-agy-link`。安装前请在同一 profile 中移除或停用已有的 `dsh-agy-link`（以及 `dsh-antigravity-auth`）；同一 ID 不能同时启用两份。
- **严格的 pnpm 构建策略。** DSH 可能把 git 来源依赖判定为未授权构建，即使本包没有 `prepare` 脚本。出现该错误时，把错误里给出的确切包名写入 profile 的 `pnpm-workspace.yaml` 中 `allowBuilds`，值设为 `false`（即明确禁止运行构建脚本），再重试。`qrcode` 等运行时依赖仍由 pnpm 正常安装。

## 快速开始

1. 打开 **设置 → Antigravity**，选择「添加账号」，在浏览器中完成 Google 登录。终端里可用 `/agy auth` 启动同一流程；若浏览器回调无法到达 Host，用 `/agy auth-code <code>` 手工完成。
2. 用 `/agy status`（可执行文件、版本、登录、模式、目录）和 `/agy pool`（账号、实时额度、冷却）确认结果。
3. 在 DSH 模型选择器中选择 Antigravity 模型（或 `/agy models` 刷新后选择），开始会话。
4. 可选：设置权限模式（`/agy mode plan|accept-edits|skip`）、默认思考强度（`/agy effort …`）、工作目录（`/agy workspace <绝对路径>`），或在设置卡片中开启直连、自动翻译。

登录成功且项目可用，模型目录才是实时的。当 `agy models` 无法运行（未登录或离线）时，选择器回退到内置目录，因此「列表里有」并不等于「后端一定能服务」。

## 功能

- **模型。** provider `Antigravity (agy CLI)`（ID `antigravity`），以及可选的 `Antigravity (direct, experimental)` 路由。在线目录来自 `agy models`；只在 CLI 接受的地方传 effort，被拒绝的 `--effort` 会被学习而不是反复重试。
- **流式与思考。** 文本、推理与工具活动以 DSH 原生 UI 流式呈现。思考块保留英文原文，可在其上方显示中文层（`translateThinking`，默认开启）。
- **原生工具卡片。** `agy` 的工具活动通过 `agy_tool` 回灌为 DSH 工具卡片，diff 依据 `agy` 自身的会话数据库重建，终端与编辑步骤在界面里可读，而不是埋在文本中。
- **多账号池。** 默认手动指定：账号耗尽、停用或登录失效都不会在背后自动切换。顺次耗尽与轮询均衡需要显式开启。支持每个账号的启用/停用、别名、代理、额度与冷却状态；`pool.json` 写入是原子的，损坏时从 last-good 快照恢复。
- **额度。** 每个模型族（Gemini / Claude / GPT-OSS）的 5 小时与周额度窗口，后端上报时另有 Argon 周额度。读不到的窗口在面板里显示 `—`、在 `/agy pool` 里显示 `unknown`，不会被当作零用量。
- **权限模式。** `plan`、`accept-edits`（默认）、`skip`。`skip` 会向 `agy` 传 `--dangerously-skip-permissions`，属于明确的无人值守执行选择——它不会绕过 `agy` 的内置保护，也不能替代 DSH 自身的审批。计划产出与目标完成会以对应工具调用回灌给 DSH。
- **会话连续性。** 每个 DSH 会话绑定一个原生 `agy` 会话（`--conversation`），中断或转向后仍可续跑。
- **多模态输入。** 图片先在本地暂存，再通过 `--add-dir` 授权给 `agy`；大小、数量与存活时间均可配置。
- **可选工具。** `agy_ask` 把一次性任务交给 Antigravity 模型；回环 MCP 桥可把 DSH 侧 MCP server 暴露给 `agy`，并受白名单约束。两者默认关闭。
- **翻译。** `/tsl` 把当前回合改写成大白话，也可对每个完成回合自动翻译，翻译模型与思考强度可单独选择。
- **护栏。** 每轮活动看门狗 + 可选墙钟上限（`maxTurnMinutes`）、工具步未结束时的空闲预算、跨会话并发上限、可选的每分钟准入上限。
- **诊断。** `/agy doctor` 生成脱敏报告（令牌、授权码、含凭据的代理 URL、API key 在落盘前已被剔除）。遥测默认关闭。
- **界面。** 跟随 DSH 明暗主题，提供英文、中文、西班牙语、巴西葡语界面，移动端自适应。

## 命令

`/agy` 按第一个参数分发：

```text
/agy status                     可执行文件、版本、登录、模式、目录、绑定
/agy pool | accounts            账号池、实时额度百分比、冷却
/agy goal [status|complete|clear|pause]
/agy session [info|clear]       查看或清除当前 agy 会话绑定
/agy add-account [别名]         为新账号槽位启动 OAuth 登录
/agy enable-account <id>        /  /agy disable-account <id>
/agy refresh-quota              向 Google 查询最新额度百分比
/agy clear-cooldown             重置冷却计时与低额度暂存
/agy remove-account <id>
/agy auth                       主账号 Google 登录
/agy auth-code <code|url>       粘贴授权码完成登录
/agy models                     刷新并列出发现的模型
/agy mode <skip|plan|accept-edits>
/agy effort <low|medium|high|default>
/agy dispatch [分钟|off]        每次尝试等待凭据槽的上限
/agy dispatch-retries <0-10>
/agy parallel <on|off>          同账号并发 agy 运行（Windows 凭据槽快速路径）
/agy max-concurrent <n|off>     agy 并发请求流上限
/agy workspace [路径]           agy 工作目录（绝对路径）
/agy clear                      清除最近一次会话绑定
/agy doctor                     生成脱敏诊断报告
/agy help
```

`/tsl` 把某个回合改写成大白话：`/tsl [回合] [--full] [--print] [--model id] [--effort x]`、`/tsl auto [on|off|status]`、`/tsl help`。

## 配置

解析顺序（由高到低）：`DSH_AGY_*` 环境变量 → `/agy` 写入的运行时覆盖 → DSH profile 中的插件配置 → 内置默认值。完整键位、环境变量与默认值见 [docs/CONFIGURATION.md](docs/CONFIGURATION.md)；最常改动的项：

| 键 | 环境变量 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `enabled` | `DSH_AGY_ENABLED` | `true` | 总开关 |
| `agyBin` | `DSH_AGY_BIN` | 自动探测 | `agy` 可执行文件路径 |
| `permissionMode` | `DSH_AGY_MODE` | `accept-edits` | `skip` / `plan` / `accept-edits` |
| `defaultModel` / `defaultEffort` | `DSH_AGY_DEFAULT_MODEL` / `DSH_AGY_DEFAULT_EFFORT` | agy 默认 / `high` | 选择器初始值 |
| `timeoutMs` | `DSH_AGY_TIMEOUT_MS` | `600000` | 每轮活动看门狗 |
| `maxTurnMinutes` | `DSH_AGY_MAX_TURN_MINUTES` | `0`（关闭） | 每轮墙钟硬上限 |
| `experimentalDirect` | — | `false` | 直连传输开关 |
| `proxyUrl` | `DSH_AGY_PROXY_URL` | `''` | 全局代理；账号级代理优先 |
| `autoTranslate` / `translateThinking` | `DSH_AGY_AUTO_TRANSLATE` / `DSH_AGY_TRANSLATE_THINKING` | `false` / `true` | 翻译开关 |
| `warmStart` | `DSH_AGY_WARM_START` | `false` | 可选：回合结束后预热下一个 `agy` 进程 |
| `askTool` / `mcpBridge` | `DSH_AGY_MCP_BRIDGE` | `false` | 可选工具，默认均关闭 |

## 代理与网络

账号代理支持 HTTP、HTTPS、SOCKS5 URL；非法地址会被拒绝，代理凭据不会回显到错误信息、日志或 `/agy pool` 输出中。账号级代理优先于全局代理。直连传输有独立的代理设置（`directProxyUrl`，HTTP CONNECT），留空即直连。OAuth 的浏览器环节使用浏览器自身的网络设置，不受上述值影响。

## 安全与数据位置

- 插件只执行你配置的、或在 `PATH` 上找到的 `agy` 可执行文件；argv 以数组传入，绝不经过 shell；每次 spawn 都是独立进程组，看门狗可以整组终止。
- 登录会以 `agy` 自己的磁盘格式写入令牌，好让官方二进制直接使用。账号池里每个账号都有独立 HOME：`~/.dsh/agy-accounts/<id>`（`0700`），其中令牌文件与 `pool.json` 为 `0600`。Windows 上 `agy` 读取的是进程全局的凭据管理器条目，因此插件会串行交接该槽位并恢复上一个属主的凭据——详见 [docs/SECURITY-NOTES.md](docs/SECURITY-NOTES.md)。
- 主账号槽位对应真实系统 HOME 的登录状态；在该槽位登录只会就地更新此账号，不会删除或改写真实主目录。
- 直连模式的客户端凭据只保存在环境变量或 `~/.dsh/agy-link/direct/oauth-client.json`（`0600`）；其令牌留在 `~/.dsh/agy-link/direct/auth.json`，与 AGY 模式互不共享。
- 切勿把 `antigravity-oauth-token`、`pool.json`、`direct/auth.json`、`oauth-client.json`、授权/回调 URL 或原始媒体内容附在问题报告中。`/agy doctor` 会先行脱敏，但发送前请自己再检查一遍。
- 回环 MCP 桥只绑定 `127.0.0.1`，使用每进程随机 bearer token 并以常数时间比较，执行时强制 `mcpToolAllowlist`，并限制请求体大小。
- 完整威胁模型见 [docs/SECURITY-NOTES.md](docs/SECURITY-NOTES.md)；无头权限行为见 [docs/HEADLESS-PERMISSIONS.md](docs/HEADLESS-PERMISSIONS.md)；已知缺口见 [docs/KNOWN-GAPS.md](docs/KNOWN-GAPS.md)。

## 故障排查

| 现象 | 检查 |
| --- | --- |
| 安装后设置里没有该分区 | 确认插件装在*正在运行*的 profile（`dsh plugin --profile <p> list`），重启 Host，刷新客户端。 |
| 找不到 `agy` / 没有模型 | 在启动 DSH 的同一环境中执行 `agy --version`；必要时设置 `DSH_AGY_BIN`；`/agy models` 刷新，`/agy doctor` 出报告。 |
| 登录无法完成 | 浏览器授权发生在 Host 机器上。回调无法到达 Host 时用 `/agy auth-code <code>`；已取消或过期的授权码不能复用。 |
| 安装时报构建授权错误 | 见[安装](#安装)中的 `allowBuilds` 说明。 |
| 回合被意外终止 | 上调 `timeoutMs` / `longToolIdleMinutes`，或确认是否设置了 `maxTurnMinutes`。 |
| provider 重复 | 停用同 profile 中的 `dsh-antigravity-auth` 或上游 `dsh-agy-link` 副本。 |
| 401/403 或额度报错 | 重新登录受影响的账号；限流请等待窗口重置。除非显式开启顺次或轮询调度，账号池不会为了绕过限制而换号。 |

## 开发

```sh
pnpm install --frozen-lockfile
pnpm run check      # 类型检查（host + direct）
pnpm run build      # 产出 dist/，需一并提交
pnpm test           # 离线测试
pnpm run test:direct -- --maxWorkers=4
```

`dist/` 属于仓库的一部分，因为安装直接使用源码归档：改动源码时必须重新构建并提交 `dist/`。日常验证不得执行真实 Google OAuth，也不得使用用户账号发请求——请使用隔离的测试夹具。切勿提交本地 profile、`.gemini` 数据、OAuth 令牌、代理凭据或生成的归档包。

## 文档

- [配置参考](docs/CONFIGURATION.md) · [安全说明](docs/SECURITY-NOTES.md) · [无头权限](docs/HEADLESS-PERMISSIONS.md) · [认证](docs/AUTH.md) · [已知缺口](docs/KNOWN-GAPS.md)
- [副本说明](LOCAL-FORK.md) · [账号池 ADR](docs/adr-012-account-pool.md) 与[规格](docs/spec-account-pool.md)
- [直连来源与署名](direct/README.md)
- [更新日志](CHANGELOG.md) —— `0.6.15` 及之前为上游记录，本副本的改动列在 *Unreleased*。

## 许可与署名

MIT —— 见 [LICENSE](LICENSE)。本项目是独立的社区副本，不受 Google 或 DeepSeek 背书。构建于 [amlyczz/dsh-agy-link](https://github.com/amlyczz/dsh-agy-link)（提交 `2e2c4ee4f2c1e9d24e5602da3548a8ff44dc7a93`，MIT）、[suntianc/dsh-antigravity-auth](https://github.com/suntianc/dsh-antigravity-auth)（提交 `57d1004e8727f17b4745de6f674ad56e93a3f858`，MIT， vendored 于 `direct/legacy`）与 `@cortexkit/antigravity-auth-core` 2.2.0（MIT，vendored 于 `direct/core`）之上；Undici 依其自身 MIT 许可打包（[direct/UNDICI-LICENSE](direct/UNDICI-LICENSE)）。
