# 本地 DSH agy 桥接版

本目录基于 [amlyczz/dsh-agy-link](https://github.com/amlyczz/dsh-agy-link) 提交 `2e2c4ee4f2c1e9d24e5602da3548a8ff44dc7a93` 的 MIT 代码，保留上游 [LICENSE](LICENSE)。插件名与上游相同，不能和上游版本同时安装在同一 profile；本地包标记为 private，防止误发布。

- 默认账号模式为手动。可在 DSH 设置中主动切换到顺次或轮询；手动模式下账号耗尽、禁用或登录失效不会自动转到另一账号。
- 默认 agy 权限模式为 `accept-edits`，会自动接受文件编辑，其他需要许可的工具在无头模式可能被拒绝。可在设置中明确切换计划、接受文件编辑或跳过权限检查；也可使用 `DSH_AGY_MODE` 配置。跳过权限检查不是 DSH 审批的替代品。
- 账号代理支持 HTTP、HTTPS、SOCKS5 URL；非法地址会被拒绝，错误不回显代理凭据。浏览器登录使用浏览器自己的网络设置，需独立检查。
- 不在仓库中分发 Google OAuth Client ID/Secret。使用者需在启动 DSH 的进程环境中配置 `AGY_CLIENT_ID` 与 `AGY_CLIENT_SECRET`，否则插件内登录和 token 刷新不可用。
- 保留上游 `agy` 子进程桥接、工具卡片、多账号登录、配额查询与 DSH 原生主题界面。OAuth 和配额部分仍会直接处理令牌并访问 Google 接口。
- 启动时不会自动清理官方 agy 的日志文件。

Google [FAQ](https://antigravity.google/docs/faq/) 明确表示个人订阅下不支持将 `agy` 包装进第三方编程 Agent。此插件不能保证账号不会受限。

开发检查：`pnpm run check`、`pnpm run build`；按变更运行对应离线测试。无用户操作时不发起真实 OAuth 登录或使用真实账号验证。
