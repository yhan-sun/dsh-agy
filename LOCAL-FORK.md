# 本地 DSH agy 桥接版

本目录基于 [amlyczz/dsh-agy-link](https://github.com/amlyczz/dsh-agy-link) 提交 `2e2c4ee4f2c1e9d24e5602da3548a8ff44dc7a93` 的 MIT 代码，保留上游 [LICENSE](LICENSE)。插件名与上游相同，不能和上游版本同时安装在同一 profile；本地包标记为 private，防止误发布。

- 默认账号模式为手动。可在 DSH 设置中主动切换到顺次或轮询；手动模式下账号耗尽、禁用或登录失效不会自动转到另一账号。
- 默认 agy 权限模式为 `accept-edits`，会自动接受文件编辑，其他需要许可的工具在无头模式可能被拒绝。可在设置中明确切换计划、接受文件编辑或跳过权限检查；也可使用 `DSH_AGY_MODE` 配置。跳过权限检查不是 DSH 审批的替代品。
- 账号代理支持 HTTP、HTTPS、SOCKS5 URL；非法地址会被拒绝，错误不回显代理凭据。浏览器登录使用浏览器自己的网络设置，需独立检查。
- 保留上游 `agy` 子进程桥接、工具卡片、多账号登录、配额查询与 DSH 原生主题界面。OAuth 和配额部分仍会直接处理令牌并访问 Google 接口。
- 实验性直连传输已并入本插件（不是第二个插件）：源码 vendored 在 `direct/`，默认关闭，凭据与 provider 独立，不与 AGY 模式互相回退，代理也独立；搜索、图像、视频分别开关。详见 README 与 [docs/CONFIGURATION.md](docs/CONFIGURATION.md)。
- 思考过程中文层默认开启（`translateThinking`）：英文原文保留，中文摘要显示在其上方；回合仍在流式输出时不翻译。
- 面向用户的文档以 [README.md](README.md)（英文）与 [README.zh.md](README.zh.md)（中文）为准；`docs/README.en.md`、`docs/README.es.md`、`docs/README.pt-BR.md` 与 `docs/market-pr-draft.md` 等本地工作文件在 `.gitignore` 中，不随仓库发布。
- 截图中的账号邮箱已脱敏；提交前请检查任何新增图片、日志与测试夹具都不含真实账号、令牌或代理凭据。
- AGY 模式沿用署名核心源码里的公开桌面 OAuth 客户端标识（应用身份，不是用户凭据），开箱即可登录；如需换成自己注册的客户端，必须同时提供 `AGY_CLIENT_ID` 与 `AGY_CLIENT_SECRET`，只给一个会报错。实验性直连模式不使用这份内置身份：需要同一对环境变量，或 `~/.dsh/agy-link/direct/oauth-client.json`（`0600`，字段 `clientId`、`clientSecret`），否则报 `client-not-configured`。仓库内不包含任何用户令牌或账号记录。
- 启动时不会自动清理官方 agy 的日志文件。

Google [FAQ](https://antigravity.google/docs/faq/) 明确表示个人订阅下不支持将 `agy` 包装进第三方编程 Agent。此插件不能保证账号不会受限。

开发检查：`pnpm run check`、`pnpm run build`；按变更运行对应离线测试。无用户操作时不发起真实 OAuth 登录或使用真实账号验证。
