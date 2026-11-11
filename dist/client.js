window.__ModuleLoader__.load({
	id: "dsh-agy-link",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region src/client/brand-icons.ts
		const BRAND_PATHS = {
			gemini: "M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81",
			claude: "m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z",
			openai: "M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z",
			chrome: "M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.73c-.911-3.794-4.321-6.545-8.384-6.545zM1.986 6.368A11.95 11.95 0 0 0 0 12c0 6.096 4.542 11.134 10.428 11.89l3.953-6.848a5.454 5.454 0 0 1-5.836-2.585L1.986 6.368zm14.569 5.632a5.454 5.454 0 0 1-1.127 3.327l-5.365 9.293C10.784 24.873 11.385 25 12 25c6.627 0 12-5.373 12-12 0-.341-.014-.679-.042-1.013H12v.013h4.555z",
			edge: "M23.95 13.91c-.13-1.68-.78-3.23-1.83-4.47-.98-1.16-2.29-1.99-3.76-2.4-.64-.18-1.3-.28-1.97-.29-2.09-.03-4.08.74-5.63 2.16-1.57 1.44-2.48 3.44-2.55 5.56.08 1.47.66 2.87 1.66 3.96.99 1.09 2.37 1.76 3.86 1.88 1.34.1 2.69-.26 3.82-1.02.44-.3.84-.66 1.18-1.07l2.87 2.87c-1.35 1.44-3.04 2.51-4.92 3.12-1.89.6-3.9.7-5.84.28-2.67-.58-5.06-2.06-6.75-4.17-1.68-2.12-2.59-4.78-2.57-7.51.02-2.85 1.04-5.6 2.89-7.77C6.88 4.31 9.53 2.85 12.44 2.38c2.19-.35 4.43-.2 6.55.45 2.13.65 4.04 1.83 5.58 3.44l-2.9 2.9c-1.12-1.19-2.52-2.06-4.07-2.54-1.55-.47-3.19-.57-4.78-.3-2.14.36-4.08 1.45-5.46 3.06-1.38 1.62-2.13 3.69-2.13 5.84 0 2.05.69 4.04 1.98 5.62 1.28 1.58 3.1 2.64 5.12 3.01 1.47.27 2.99.17 4.42-.31 1.43-.48 2.7-1.33 3.69-2.46l-4.13-4.13c-.37.28-.8.48-1.26.58-.46.1-.94.09-1.4-.02-.57-.14-1.08-.47-1.46-.93-.38-.46-.59-1.04-.59-1.64.03-.84.4-1.63 1.03-2.2.63-.57 1.45-.88 2.3-.87.87.01 1.7.35 2.32.95.62.61.98 1.43 1 2.3h4.67z"
		};
		const BRAND_COLORS = {
			gemini: "#8E75B2",
			claude: "#D97757",
			openai: "#10a37f",
			chrome: "#4285F4",
			edge: "#0078D7"
		};
		const UI_PATHS = {
			trash: "M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6",
			plus: "M12 5v14M5 12h14",
			refresh: "M21.5 2v6h-6M2.5 22v-6h6M2.5 11.5a10 10 0 0 1 17.5-4.5l1.5 2M21.5 12.5a10 10 0 0 1-17.5 4.5l-1.5-2",
			star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
			mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
			globe: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
			zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
			chevronDown: "M6 9l6 6 6-6",
			chevronUp: "M18 15l-6-6-6 6",
			check: "M20 6L9 17l-5-5",
			x: "M18 6L6 18M6 6l12 12",
			externalLink: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3",
			alert: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01",
			move: "M9 5h.01M9 12h.01M9 19h.01M15 5h.01M15 12h.01M15 19h.01",
			arrowUp: "M12 19V5M5 12l7-7 7 7",
			arrowDown: "M12 5v14M19 12l-7 7-7-7",
			power: "M18.36 6.64a9 9 0 1 1-12.73 0M12 2v10",
			flame: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"
		};
		//#endregion
		//#region src/client/config-options.ts
		/** Thinking levels the translation call accepts, in ascending order. */
		const EFFORT_LEVELS = [
			"low",
			"medium",
			"high"
		];
		/**
		* Translation-model dropdown: `''` (host fallback chain: gemini-3.8-flash →
		* newest gemini-*-flash → conversation default) plus every catalog model.
		*/
		function translateModelOptions(current, models, autoLabel) {
			const options = [{
				value: "",
				label: autoLabel
			}];
			const seen = /* @__PURE__ */ new Set([""]);
			for (const model of models) {
				const id = typeof model?.id === "string" ? model.id.trim() : "";
				if (id === "" || seen.has(id)) continue;
				seen.add(id);
				const name = typeof model?.name === "string" ? model.name.trim() : "";
				options.push({
					value: id,
					label: name === "" ? id : name
				});
			}
			const wanted = typeof current === "string" ? current.trim() : "";
			if (wanted !== "" && !seen.has(wanted)) options.push({
				value: wanted,
				label: wanted
			});
			return options;
		}
		/**
		* The dropdown offers the Gemini family only: the card is branded "Gemini 译文",
		* so picking e.g. Claude there would make the label a lie. A model configured by
		* hand is still appended by `translateModelOptions`, so the state stays honest.
		*/
		function geminiCatalogModels(models) {
			return models.filter((model) => typeof model?.id === "string" && /gemini/i.test(model.id));
		}
		/**
		* Thinking-effort dropdown: `''` (follow the default effort) plus the levels
		* agy understands; an unrecognised configured level is appended verbatim so the
		* select can display it rather than pretending the value is unset.
		*/
		function translateEffortOptions(current, labels) {
			const options = [{
				value: "",
				label: labels.auto
			}];
			for (const level of EFFORT_LEVELS) options.push({
				value: level,
				label: labels[level]
			});
			const wanted = typeof current === "string" ? current.trim().toLowerCase() : "";
			if (wanted !== "" && !options.some((option) => option.value === wanted)) options.push({
				value: wanted,
				label: wanted
			});
			return options;
		}
		//#endregion
		//#region src/client/locales.ts
		/** Native DSH locale dictionaries for the Antigravity UI. */
		const NS = "agy-link";
		/** Simplified Chinese is preserved as the original UI language and key source. */
		const zh$1 = {
			"section.label": "Antigravity",
			"code.title": "代码",
			"code.inspect": "检查",
			"tv.command": "命令",
			"tv.write": "写入",
			"tv.edit": "编辑",
			"tv.read": "读取",
			"tv.search": "搜索",
			"tv.webSearch": "网页搜索",
			"tv.list": "列表",
			"tv.delete": "删除",
			"tv.tool": "工具",
			"tv.noOutput": "(无输出)",
			"tv.noMatches": "(无匹配)",
			"tv.noChanges": "(无文本变更)",
			"tv.emptyDir": "(空目录)",
			"tv.noDetail": "(无详情)",
			"tv.hint.expandInspect": "点击展开 · 右键检查",
			"tv.hint.collapseInspect": "点击收起 · 右键检查",
			"tv.hint.expand": "点击展开",
			"tv.hint.collapse": "点击收起",
			"tv.diffMore": "… 其余 {count} 行未渲染",
			"code.copy": "复制",
			"code.copied": "已复制",
			"console.title": "Antigravity",
			"status.ready": "已登录",
			"status.needsAuth": "待认证",
			"status.unverified": "登录状态待验证",
			"status.loading": "正在加载 Antigravity 状态...",
			"status.authRequired": "需重新登录",
			"account.setActive": "选择账号",
			"account.settingActive": "切换中",
			"account.activeSet": "已切换当前账号",
			"account.activeSetFailed": "该账号当前不可用（冷却或需重新登录）",
			"status.proxy": "代理",
			"status.inUse": "当前选择",
			"account.add": "添加 Google 账号",
			"header.addAccount": "添加账号",
			"account.aliasDefault": "备用 Google 账号 {number}",
			"account.defaultAlias": "主账号（系统登录）",
			"account.proxyPlaceholder": "专属代理 URL（如 http://127.0.0.1:7890，留空则继承全局）",
			"account.aliasPlaceholder": "账号别名（例如：备用账号 2）",
			"account.removeTitle": "移除此账号",
			"aria.aliasInput": "账号别名",
			"aria.proxyInput": "专属代理 URL",
			"aria.authCodeInput": "授权码或回调 URL",
			"aria.closeToast": "关闭提示",
			"account.details": "明细",
			"account.collapse": "收起",
			"account.expandOthers": "查看额度详情",
			"account.collapseOthers": "收起额度详情",
			"account.otherModels": "Claude / GPT 额度",
			"account.quotaSummary": "Gemini · 5h {fiveHour} · 周 {weekly}",
			"account.quotaPending": "额度待同步",
			"account.sync": "同步",
			"account.syncing": "同步中",
			"account.syncTitle": "刷新此账号（换号后立即同步 email / 额度 / 模型）",
			"account.models": "单模型明细：",
			"account.cooldown": "部分模型限流中，已自动切换账号",
			"account.clearCooldown": "清除冷却",
			"account.localCooldown": " · 本地冷却中",
			"account.removed": "已移除账号：{alias}",
			"quota.fiveHour": "5 小时额度",
			"quota.weekly": "周额度",
			"quota.refreshed": "额度已刷新",
			"quota.windowReset": "已重置 · 可用",
			"proxy.button": "代理",
			"proxy.placeholder": "专属代理 URL（如：http://127.0.0.1:7890；留空则使用全局）",
			"proxy.save": "保存",
			"proxy.saved": "代理已保存",
			"proxy.invalid": "请输入有效的 HTTP、HTTPS 或 SOCKS5 代理地址。",
			"cancel": "取消",
			"auth.openBrowser": "打开浏览器登录",
			"auth.openingBrowser": "正在打开浏览器...",
			"auth.browserOpened": "浏览器已打开 Google 授权页，完成授权后将自动同步",
			"auth.browserManual": "无法自动打开浏览器，请点击下方链接手动完成授权",
			"auth.startFailed": "无法启动 Google 授权。请检查网络或代理配置。",
			"auth.networkHint": "请检查网络或代理配置",
			"auth.activated": "账号已激活入池",
			"auth.failed": "授权失败",
			"auth.added": "成功添加并激活 Google 账号",
			"auth.codeFailed": "授权码验证失败",
			"auth.exchanging": "正在验证授权并激活账号，请稍候...",
			"auth.waiting": "等待浏览器中完成 Google 授权，成功后将自动激活。",
			"auth.openManual": "若浏览器未打开，请点击此处手动打开 Google 登录页",
			"auth.pasteHint": "未完成自动回调时，可粘贴授权码或回调 URL：",
			"auth.codePlaceholder": "授权码或 http://localhost:51121/oauth-callback?code=... 完整链接",
			"auth.activate": "手动激活",
			"auth.activating": "验证激活中...",
			"auth.code.browser_manual": "无法自动打开浏览器，请使用下方链接手动授权。",
			"auth.code.callback_failed": "授权回调失败。请重新开始授权。",
			"auth.code.no_active_flow": "当前没有进行中的授权流程。",
			"auth.code.invalid_code": "无法识别授权码。请粘贴授权码或完整回调 URL。",
			"auth.code.invalid_state": "授权链接不属于当前流程或已过期。请重新开始授权。",
			"auth.code.exchange_failed": "授权验证失败。请重新开始授权。",
			"auth.code.primary_activated": "主账号已登录。",
			"auth.code.account_activated": "账号已添加，可在账号列表中选择使用。",
			"auth.code.missing_code": "请输入授权码。",
			"auth.code.request_failed": "请求未完成。请重试。",
			"api.genericError": "操作未完成。请重试。",
			"duration.day": "天",
			"duration.hour": "小时",
			"duration.minute": "分钟",
			"permission.label": "权限模式：",
			"permission.plan": "plan（只读）",
			"permission.acceptEdits": "accept-edits（改代码）",
			"permission.skip": "skip（自动批准；AGY 内部保护仍生效）",
			"effort.label": "思考强度：",
			"effort.auto": "auto",
			"effort.low": "low",
			"effort.medium": "medium",
			"effort.high": "high",
			"pool.label": "账号切换：",
			"pool.manual": "手动",
			"pool.sequential": "顺次耗尽",
			"pool.roundRobin": "轮询均衡",
			"models.label": "模型显示：",
			"models.empty": "模型目录还没有可用模型，发一次对话或点“刷新额度”后再来管理",
			"models.hint": "点击切换显示/隐藏；关闭的模型不在模型选择器中列出，进行中的会话不受影响。",
			"header.refreshQuota": "刷新额度",
			"header.refreshing": "刷新中",
			"console.close": "关闭（Esc）",
			"header.badgeTitle": "Antigravity：{count} 个账号已就绪 · 点击打开控制台",
			"header.badgeLoading": "Antigravity · 点击打开控制台",
			"account.type.agy": "Google Antigravity (CLI / OAuth)",
			"account.loginType": "登录方式：",
			"account.dragHandle": "拖拽调整优先级",
			"account.moveUp": "上移优先级",
			"account.moveDown": "下移优先级",
			"account.reordered": "账号优先级顺序已更新",
			"account.collapseAll": "全部折叠",
			"account.expandAll": "全部展开",
			"account.cardCollapse": "收起详情",
			"account.cardExpand": "展开详情",
			"account.draggingTarget": "放置至此成为优先级 #{num}",
			"account.dragBanner": "正在调整优先级：将【{alias}】移动至 #{num}",
			"account.dragHint": "拖拽卡片可实时调整调度优先级",
			"account.enable": "启用",
			"account.disable": "停用",
			"account.enableTitle": "启用此账号（加入自动切号与调度）",
			"account.disableTitle": "停用此账号（切号与调度时跳过）",
			"account.enabledToast": "已启用账号：{alias}",
			"account.disabledToast": "已停用账号：{alias}",
			"status.disabled": "已停用",
			"header.warmup": "一键预热",
			"header.warmingUp": "预热中",
			"account.warmup": "预热",
			"account.warmingUp": "预热中",
			"account.warmupTitle": "预热该账号（向 Google 发送极小探活请求，提前激活 7 天周配额计时器）",
			"warmup.success": "账号预热成功",
			"warmup.allSuccess": "一键预热任务已完成",
			"warmup.skipped": "当前账号或模型处于冷却中，无需预热",
			"config.autoWarmup": "7天周配额自动预热",
			"config.autoWarmupDesc": "周配额到达重置时间或冷启动时自动唤醒 1 次启动新周期",
			"config.autoTranslate": "自动翻译",
			"config.autoTranslateDesc": "每个回合结束后，用 Gemini 把最后的回复翻成大白话，显示在该回复下方",
			"config.translateModel": "翻译模型",
			"config.translateModelDesc": "翻译调用使用哪个模型；默认自动从 Gemini Flash 里挑最新的一个",
			"config.translateModelAuto": "默认（自动）",
			"config.translateEffort": "思考强度",
			"config.translateEffortDesc": "翻译调用使用的思考档；默认跟随下面的「默认思考强度」",
			"config.translateEffortAuto": "跟随默认",
			"config.on": "开启",
			"config.off": "关闭",
			"config.runtimeTitle": "运行方式",
			"config.runtimeDesc": "选择账号切换方式和 AGY 工具权限。",
			"direct.title": "实验性直连",
			"direct.description": "使用独立账号，可在模型列表中选择。",
			"direct.loading": "正在加载直连模块…",
			"direct.error": "直连模块加载失败，请查看 DSH 日志。",
			"direct.unavailable": "直连账号管理需要本机 DSH 连接。",
			"direct.proxy": "直连代理",
			"direct.proxyHelp": "仅支持不含账号密码的 HTTP 代理；留空为直接连接。浏览器授权使用浏览器自己的网络设置。",
			"direct.proxyPlaceholder": "例如 http://127.0.0.1:7890",
			"direct.proxySave": "保存代理",
			"direct.proxyInvalid": "直连代理配置无效，请重新保存；请求不会自动切换为直连。",
			"config.permissionMode": "AGY 工具权限",
			"config.permissionPlan": "计划模式",
			"config.permissionEdits": "自动接受文件编辑",
			"config.permissionSkip": "跳过权限检查",
			"config.permissionDesc": "AGY 自己执行工具。无头模式下，未获许可的操作可能被拒绝；DSH 的审批界面不代替 AGY 权限。",
			"config.permissionSkipDesc": "跳过权限检查会自动批准 AGY 的文件修改和命令执行，请仅在信任工作区时使用。",
			"config.defaultEffort": "默认思考强度",
			"config.defaultEffortDesc": "auto = 各模型用自身默认档；选定后作为会话模型下拉框的初始档位，仍可按模型覆盖",
			"tsl.badge": "Gemini 译文",
			"tsl.plain": "人话版",
			"tsl.translate": "译成人话",
			"tsl.actionTip": "用 Gemini 把这条回复译成人话",
			"tsl.translating": "翻译中…",
			"tsl.done": "已生成译文",
			"tsl.pending": "Gemini 正在翻译…",
			"tsl.copy": "复制",
			"tsl.copied": "已复制",
			"tsl.original": "原文",
			"tsl.showOriginal": "查看原文",
			"tsl.hideOriginal": "收起原文",
			"tsl.failed": "翻译失败",
			"tsl.retry": "重试",
			"tsl.empty": "没有可翻译的内容",
			"tsl.collapse": "收起",
			"tsl.expand": "展开"
		};
		const en$1 = {
			"section.label": "Antigravity",
			"console.title": "Antigravity",
			"code.title": "Code",
			"code.inspect": "Inspect",
			"tv.command": "Command",
			"tv.write": "Write",
			"tv.edit": "Edit",
			"tv.read": "Read",
			"tv.search": "Search",
			"tv.webSearch": "Web Search",
			"tv.list": "List",
			"tv.delete": "Delete",
			"tv.tool": "Tool",
			"tv.noOutput": "(no output)",
			"tv.noMatches": "(no matches)",
			"tv.noChanges": "(no textual changes)",
			"tv.emptyDir": "(empty directory)",
			"tv.noDetail": "(no detail)",
			"tv.hint.expandInspect": "Click to expand · right-click to inspect",
			"tv.hint.collapseInspect": "Click to collapse · right-click to inspect",
			"tv.hint.expand": "Click to expand",
			"tv.hint.collapse": "Click to collapse",
			"tv.diffMore": "… {count} more lines not rendered",
			"code.copy": "Copy",
			"code.copied": "Copied",
			"status.ready": "Signed in",
			"status.needsAuth": "Authentication required",
			"status.unverified": "Sign-in status unverified",
			"status.loading": "Loading Antigravity status...",
			"status.authRequired": "Sign in again required",
			"account.setActive": "Select account",
			"account.settingActive": "Switching...",
			"account.activeSet": "Active account switched",
			"account.activeSetFailed": "Account not currently eligible (cooldown or auth required)",
			"status.proxy": "Proxy",
			"status.inUse": "Selected",
			"account.add": "Add Google account",
			"header.addAccount": "Add account",
			"account.aliasDefault": "Backup Google account {number}",
			"account.defaultAlias": "Primary account (system sign-in)",
			"account.proxyPlaceholder": "Dedicated proxy URL (e.g. http://127.0.0.1:7890; leave blank to inherit global)",
			"account.aliasPlaceholder": "Account alias (for example: Backup account 2)",
			"account.removeTitle": "Remove this account",
			"aria.aliasInput": "Account alias",
			"aria.proxyInput": "Dedicated proxy URL",
			"aria.authCodeInput": "Authorization code or callback URL",
			"aria.closeToast": "Dismiss notification",
			"account.details": "Details",
			"account.collapse": "Collapse",
			"account.expandOthers": "View quota details",
			"account.collapseOthers": "Hide quota details",
			"account.otherModels": "Claude / GPT quotas",
			"account.quotaSummary": "Gemini · 5h {fiveHour} · week {weekly}",
			"account.quotaPending": "Quota not synced",
			"account.sync": "Sync",
			"account.syncing": "Syncing...",
			"account.syncTitle": "Refresh this account (sync email, quota, and models after switching accounts)",
			"account.models": "Per-model details:",
			"account.cooldown": "Some models are rate-limited; the account was switched automatically",
			"account.clearCooldown": "Clear cooldown",
			"account.localCooldown": " · local cooldown active",
			"account.removed": "Account removed: {alias}",
			"quota.fiveHour": "5-hour quota",
			"quota.weekly": "Weekly quota",
			"quota.refreshed": "Quota refreshed",
			"quota.windowReset": "Reset · available",
			"proxy.button": "Proxy",
			"proxy.placeholder": "Dedicated proxy URL (for example: http://127.0.0.1:7890; leave blank to use the global proxy)",
			"proxy.save": "Save",
			"proxy.saved": "Proxy saved",
			"proxy.invalid": "Enter a valid HTTP, HTTPS or SOCKS5 proxy URL.",
			"cancel": "Cancel",
			"auth.openBrowser": "Open browser to sign in",
			"auth.openingBrowser": "Opening browser...",
			"auth.browserOpened": "The Google authorization page opened in your browser and will sync automatically after authorization",
			"auth.browserManual": "The browser could not be opened automatically; use the link below to authorize manually",
			"auth.startFailed": "Could not start Google authorization. Check your network or proxy configuration.",
			"auth.networkHint": "Check your network or proxy configuration",
			"auth.activated": "Account activated in the pool",
			"auth.failed": "Authorization failed",
			"auth.added": "Google account added and activated",
			"auth.codeFailed": "Authorization code validation failed",
			"auth.exchanging": "Verifying authorization and activating the account; please wait...",
			"auth.waiting": "Complete Google authorization in the browser. The account will activate automatically.",
			"auth.openManual": "If the browser did not open, click here to open the Google sign-in page manually",
			"auth.pasteHint": "If the automatic callback did not complete, paste the authorization code or callback URL:",
			"auth.codePlaceholder": "Authorization code or full http://localhost:51121/oauth-callback?code=... URL",
			"auth.activate": "Activate manually",
			"auth.activating": "Verifying and activating...",
			"auth.code.browser_manual": "The browser could not be opened automatically; use the link below to authorize manually.",
			"auth.code.callback_failed": "The authorization callback failed. Start authorization again.",
			"auth.code.no_active_flow": "There is no active authorization flow.",
			"auth.code.invalid_code": "The authorization code was not recognized. Paste the code or full callback URL.",
			"auth.code.invalid_state": "The authorization link does not belong to this flow or has expired. Start authorization again.",
			"auth.code.exchange_failed": "Authorization verification failed. Start authorization again.",
			"auth.code.primary_activated": "Primary account signed in.",
			"auth.code.account_activated": "Account added. Select it from the account list to use it.",
			"auth.code.missing_code": "Enter an authorization code.",
			"auth.code.request_failed": "The request did not complete. Try again.",
			"api.genericError": "The operation did not complete. Try again.",
			"duration.day": "d",
			"duration.hour": "h",
			"duration.minute": "m",
			"permission.label": "Permission mode:",
			"permission.plan": "plan (read-only)",
			"permission.acceptEdits": "accept-edits (edit code)",
			"permission.skip": "skip (auto-approve; AGY internal protections remain)",
			"effort.label": "Thinking effort:",
			"effort.auto": "auto",
			"effort.low": "low",
			"effort.medium": "medium",
			"effort.high": "high",
			"pool.label": "Account switching:",
			"pool.manual": "Manual",
			"pool.sequential": "Use sequentially",
			"pool.roundRobin": "Round-robin",
			"models.label": "Model visibility:",
			"models.empty": "No models in the catalog yet — send a message or click \"Refresh quota\", then come back to manage them",
			"models.hint": "Click to show/hide. Hidden models are not listed in the model picker; ongoing sessions are unaffected.",
			"header.refreshQuota": "Refresh quota",
			"header.refreshing": "Refreshing...",
			"console.close": "Close (Esc)",
			"header.badgeTitle": "Antigravity: {count} accounts ready · click to open the console",
			"header.badgeLoading": "Antigravity · click to open the console",
			"account.type.agy": "Google Antigravity (CLI / OAuth)",
			"account.loginType": "Login Method:",
			"account.dragHandle": "Drag to reorder priority",
			"account.moveUp": "Move up priority",
			"account.moveDown": "Move down priority",
			"account.reordered": "Account priorities reordered successfully",
			"account.collapseAll": "Collapse all",
			"account.expandAll": "Expand all",
			"account.cardCollapse": "Collapse",
			"account.cardExpand": "Expand details",
			"account.draggingTarget": "Drop here to set priority #{num}",
			"account.dragBanner": "Reordering: moving [{alias}] to priority #{num}",
			"account.dragHint": "Drag cards to reorder scheduling priority in real time",
			"account.enable": "Enable",
			"account.disable": "Disable",
			"account.enableTitle": "Enable this account (include in rotation)",
			"account.disableTitle": "Disable this account (skip in rotation)",
			"account.enabledToast": "Account enabled: {alias}",
			"account.disabledToast": "Account disabled: {alias}",
			"status.disabled": "Disabled",
			"header.warmup": "Auto Warmup",
			"header.warmingUp": "Warming up...",
			"account.warmup": "Warmup",
			"account.warmingUp": "Warming up...",
			"account.warmupTitle": "Warm up this account (trigger 7-day weekly reset timer)",
			"warmup.success": "Account warmed up successfully",
			"warmup.allSuccess": "Warmup completed for all accounts",
			"warmup.skipped": "Account or model is in cooldown, no warmup needed",
			"config.autoWarmup": "7-Day Quota Auto-Warmup",
			"config.autoWarmupDesc": "Automatically trigger a 1-token probe when weekly reset time is reached",
			"config.autoTranslate": "Auto translate",
			"config.autoTranslateDesc": "After each turn, Gemini rewrites the final answer in plain language and shows it under that reply",
			"config.translateModel": "Translation model",
			"config.translateModelDesc": "Model used for the translation call; the default picks the newest Gemini Flash automatically",
			"config.translateModelAuto": "Default (auto)",
			"config.translateEffort": "Thinking effort",
			"config.translateEffortDesc": "Effort used for the translation call; the default follows “Default thinking effort” below",
			"config.translateEffortAuto": "Follow default",
			"config.on": "On",
			"config.off": "Off",
			"config.runtimeTitle": "Runtime",
			"config.runtimeDesc": "Choose account switching and AGY tool permissions.",
			"direct.title": "Experimental direct transport",
			"direct.description": "Uses a separate account. Select a direct model in the model picker.",
			"direct.loading": "Loading direct transport…",
			"direct.error": "Direct transport failed to load. Check DSH logs.",
			"direct.unavailable": "Direct account management requires a local DSH connection.",
			"direct.proxy": "Direct proxy",
			"direct.proxyHelp": "HTTP proxy without credentials only; empty connects directly. Browser authorization uses the browser’s network settings.",
			"direct.proxyPlaceholder": "For example http://127.0.0.1:7890",
			"direct.proxySave": "Save proxy",
			"direct.proxyInvalid": "The direct proxy is invalid. Save a valid proxy; requests will not fall back to direct access.",
			"config.permissionMode": "AGY tool permissions",
			"config.permissionPlan": "Plan mode",
			"config.permissionEdits": "Accept file edits",
			"config.permissionSkip": "Skip permission checks",
			"config.permissionDesc": "AGY runs tools itself. Headless requests that need permission may be denied; DSH approvals do not replace AGY permissions.",
			"config.permissionSkipDesc": "Skipping permission checks automatically approves AGY file changes and commands. Use only in a trusted workspace.",
			"config.defaultEffort": "Default thinking effort",
			"config.defaultEffortDesc": "auto = each model keeps its own default; a fixed level seeds the session model menu and can still be overridden per model",
			"tsl.badge": "Gemini translation",
			"tsl.plain": "Plain language",
			"tsl.translate": "Translate to plain language",
			"tsl.actionTip": "Rewrite this reply in plain language with Gemini",
			"tsl.translating": "Translating…",
			"tsl.done": "Translation ready",
			"tsl.pending": "Gemini is translating…",
			"tsl.copy": "Copy",
			"tsl.copied": "Copied",
			"tsl.original": "Original",
			"tsl.showOriginal": "Show original",
			"tsl.hideOriginal": "Hide original",
			"tsl.failed": "Translation failed",
			"tsl.retry": "Retry",
			"tsl.empty": "Nothing to translate",
			"tsl.collapse": "Collapse",
			"tsl.expand": "Expand"
		};
		const ptBR = {
			"section.label": "Antigravity",
			"console.title": "Antigravity",
			"code.title": "Código",
			"code.inspect": "Inspecionar",
			"tv.command": "Comando",
			"tv.write": "Escrever",
			"tv.edit": "Editar",
			"tv.read": "Ler",
			"tv.search": "Buscar",
			"tv.webSearch": "Busca na web",
			"tv.list": "Listar",
			"tv.delete": "Excluir",
			"tv.tool": "Ferramenta",
			"tv.noOutput": "(sem saída)",
			"tv.noMatches": "(nenhuma correspondência)",
			"tv.noChanges": "(sem alterações de texto)",
			"tv.emptyDir": "(diretório vazio)",
			"tv.noDetail": "(sem detalhes)",
			"tv.hint.expandInspect": "Clique para expandir · clique direito para inspecionar",
			"tv.hint.collapseInspect": "Clique para recolher · clique direito para inspecionar",
			"tv.hint.expand": "Clique para expandir",
			"tv.hint.collapse": "Clique para recolher",
			"tv.diffMore": "… {count} linhas restantes não renderizadas",
			"code.copy": "Copiar",
			"code.copied": "Copiado",
			"status.ready": "Conectado",
			"status.needsAuth": "Autenticação necessária",
			"status.unverified": "Login não verificado",
			"status.loading": "Carregando o status do Antigravity...",
			"status.authRequired": "É necessário entrar novamente",
			"account.setActive": "Selecionar conta",
			"account.settingActive": "Alternando...",
			"account.activeSet": "Conta selecionada",
			"account.activeSetFailed": "Conta não elegível no momento (cooldown ou login necessário)",
			"status.proxy": "Proxy",
			"status.inUse": "Selecionada",
			"account.add": "Adicionar conta Google",
			"header.addAccount": "Adicionar conta",
			"account.aliasDefault": "Conta Google reserva {number}",
			"account.defaultAlias": "Conta principal (login do sistema)",
			"account.proxyPlaceholder": "URL de proxy dedicada (ex.: http://127.0.0.1:7890; deixe vazio para herdar a global)",
			"account.aliasPlaceholder": "Apelido da conta (por exemplo: Conta reserva 2)",
			"account.removeTitle": "Remover esta conta",
			"aria.aliasInput": "Apelido da conta",
			"aria.proxyInput": "URL do proxy exclusivo",
			"aria.authCodeInput": "Código de autorização ou URL de retorno",
			"aria.closeToast": "Fechar notificação",
			"account.details": "Detalhes",
			"account.collapse": "Recolher",
			"account.expandOthers": "Ver detalhes das cotas",
			"account.collapseOthers": "Ocultar detalhes das cotas",
			"account.otherModels": "Cotas Claude / GPT",
			"account.quotaSummary": "Gemini · 5 h {fiveHour} · semana {weekly}",
			"account.quotaPending": "Cota não sincronizada",
			"account.sync": "Sincronizar",
			"account.syncing": "Sincronizando...",
			"account.syncTitle": "Atualizar esta conta (sincroniza e-mail, cota e modelos depois de trocar de conta)",
			"account.models": "Detalhes por modelo:",
			"account.cooldown": "Alguns modelos estão limitados; a conta foi alternada automaticamente",
			"account.clearCooldown": "Limpar espera",
			"account.localCooldown": " · espera local ativa",
			"account.removed": "Conta removida: {alias}",
			"quota.fiveHour": "Cota de 5 horas",
			"quota.weekly": "Cota semanal",
			"quota.refreshed": "Cota atualizada",
			"quota.windowReset": "Redefinida · disponível",
			"proxy.button": "Proxy",
			"proxy.placeholder": "URL do proxy exclusivo (por exemplo: http://127.0.0.1:7890; deixe vazio para usar o proxy global)",
			"proxy.save": "Salvar",
			"proxy.saved": "Proxy salvo",
			"proxy.invalid": "Insira um endereço HTTP, HTTPS ou SOCKS5 válido.",
			"cancel": "Cancelar",
			"auth.openBrowser": "Abrir navegador para entrar",
			"auth.openingBrowser": "Abrindo navegador...",
			"auth.browserOpened": "A página de autorização do Google foi aberta no navegador e será sincronizada após a autorização",
			"auth.browserManual": "Não foi possível abrir o navegador automaticamente; use o link abaixo para autorizar manualmente",
			"auth.startFailed": "Não foi possível iniciar a autorização do Google. Verifique a configuração de rede ou proxy.",
			"auth.networkHint": "Verifique a configuração de rede ou proxy",
			"auth.activated": "Conta ativada no pool",
			"auth.failed": "Falha na autorização",
			"auth.added": "Conta Google adicionada e ativada",
			"auth.codeFailed": "Falha ao validar o código de autorização",
			"auth.exchanging": "Verificando a autorização e ativando a conta; aguarde...",
			"auth.waiting": "Conclua a autorização do Google no navegador. A conta será ativada automaticamente.",
			"auth.openManual": "Se o navegador não abriu, clique aqui para abrir manualmente a página de login do Google",
			"auth.pasteHint": "Se o retorno automático não foi concluído, cole o código de autorização ou a URL de retorno:",
			"auth.codePlaceholder": "Código de autorização ou URL completa http://localhost:51121/oauth-callback?code=...",
			"auth.activate": "Ativar manualmente",
			"auth.activating": "Verificando e ativando...",
			"auth.code.browser_manual": "Não foi possível abrir o navegador automaticamente; use o link abaixo para autorizar manualmente.",
			"auth.code.callback_failed": "O retorno da autorização falhou. Inicie a autorização novamente.",
			"auth.code.no_active_flow": "Não há um fluxo de autorização em andamento.",
			"auth.code.invalid_code": "O código de autorização não foi reconhecido. Cole o código ou a URL completa de retorno.",
			"auth.code.invalid_state": "O link de autorização não pertence a este fluxo ou expirou. Inicie a autorização novamente.",
			"auth.code.exchange_failed": "A validação da autorização falhou. Inicie a autorização novamente.",
			"auth.code.primary_activated": "Conta principal conectada.",
			"auth.code.account_activated": "Conta adicionada. Selecione-a na lista para usá-la.",
			"auth.code.missing_code": "Informe um código de autorização.",
			"auth.code.request_failed": "A solicitação não foi concluída. Tente novamente.",
			"api.genericError": "A operação não foi concluída. Tente novamente.",
			"duration.day": "d",
			"duration.hour": "h",
			"duration.minute": "min",
			"permission.label": "Modo de permissão:",
			"permission.plan": "plan (somente leitura)",
			"permission.acceptEdits": "accept-edits (editar código)",
			"permission.skip": "skip (aprovação automática; proteções internas do AGY permanecem)",
			"effort.label": "Intensidade de raciocínio:",
			"effort.auto": "auto",
			"effort.low": "low",
			"effort.medium": "medium",
			"effort.high": "high",
			"pool.label": "Troca de conta:",
			"pool.manual": "Manual",
			"pool.sequential": "Usar em sequência",
			"pool.roundRobin": "Rodízio",
			"models.label": "Visibilidade dos modelos:",
			"models.empty": "Ainda não há modelos no catálogo — envie uma mensagem ou clique em \"Atualizar cota\" e volte para gerenciá-los",
			"models.hint": "Clique para mostrar/ocultar. Modelos ocultos não aparecem no seletor de modelos; as sessões em andamento não são afetadas.",
			"header.refreshQuota": "Atualizar cota",
			"header.refreshing": "Atualizando...",
			"console.close": "Fechar (Esc)",
			"header.badgeTitle": "Antigravity: {count} contas prontas · clique para abrir o console",
			"header.badgeLoading": "Antigravity · clique para abrir o console",
			"account.type.agy": "Google Antigravity (CLI / OAuth)",
			"account.loginType": "Tipo de login:",
			"account.dragHandle": "Arrastar para reordenar prioridade",
			"account.moveUp": "Subir prioridade",
			"account.moveDown": "Descer prioridade",
			"account.reordered": "Prioridade das contas reordenada com sucesso",
			"account.collapseAll": "Recolher todos",
			"account.expandAll": "Expandir todos",
			"account.cardCollapse": "Recolher",
			"account.cardExpand": "Expandir detalhes",
			"account.draggingTarget": "Soltar aqui para prioridade #{num}",
			"account.dragBanner": "Reordenando: movendo [{alias}] para #{num}",
			"account.dragHint": "Arraste os cartões para reordenar a prioridade em tempo real",
			"account.enable": "Ativar",
			"account.disable": "Desativar",
			"account.enableTitle": "Ativar esta conta (incluir na rotação)",
			"account.disableTitle": "Desativar esta conta (ignorar na rotação)",
			"account.enabledToast": "Conta ativada: {alias}",
			"account.disabledToast": "Conta desativada: {alias}",
			"status.disabled": "Desativado",
			"header.warmup": "Pré-aquecimento",
			"header.warmingUp": "Aquecendo...",
			"account.warmup": "Aquecer",
			"account.warmingUp": "Aquecendo...",
			"account.warmupTitle": "Aquecer esta conta (ativar cronômetro semanal de 7 dias)",
			"warmup.success": "Conta aquecida com sucesso",
			"warmup.allSuccess": "Pré-aquecimento concluído",
			"warmup.skipped": "Conta em espera, sem necessidade de aquecimento",
			"config.autoWarmup": "Pré-aquecimento automático de 7 dias",
			"config.autoWarmupDesc": "Ativa automaticamente um ciclo quando o tempo de redefinição semanal é atingido",
			"config.autoTranslate": "Tradução automática",
			"config.autoTranslateDesc": "Ao fim de cada turno, o Gemini reescreve a resposta final em linguagem simples e mostra abaixo dela",
			"config.translateModel": "Modelo de tradução",
			"config.translateModelDesc": "Modelo usado na chamada de tradução; o padrão escolhe automaticamente o Gemini Flash mais recente",
			"config.translateModelAuto": "Padrão (auto)",
			"config.translateEffort": "Intensidade de raciocínio",
			"config.translateEffortDesc": "Intensidade usada na chamada de tradução; o padrão segue “Intensidade de raciocínio padrão” abaixo",
			"config.translateEffortAuto": "Seguir padrão",
			"config.on": "Ativado",
			"config.off": "Desativado",
			"config.runtimeTitle": "Execução",
			"config.runtimeDesc": "Escolha a troca de conta e as permissões das ferramentas do AGY.",
			"direct.title": "Conexão direta experimental",
			"direct.description": "Usa uma conta separada. Selecione um modelo direto.",
			"direct.loading": "Carregando conexão direta…",
			"direct.error": "Falha ao carregar a conexão direta. Consulte os registros do DSH.",
			"direct.unavailable": "O gerenciamento de conta direta requer uma conexão local do DSH.",
			"direct.proxy": "Proxy direto",
			"direct.proxyHelp": "Somente proxy HTTP sem credenciais; vazio conecta diretamente. A autorização usa a rede do navegador.",
			"direct.proxyPlaceholder": "Por exemplo http://127.0.0.1:7890",
			"direct.proxySave": "Salvar proxy",
			"direct.proxyInvalid": "O proxy direto é inválido. Salve um proxy válido; não haverá conexão direta automática.",
			"config.permissionMode": "Permissões do AGY",
			"config.permissionPlan": "Modo de planejamento",
			"config.permissionEdits": "Aceitar edições de arquivos",
			"config.permissionSkip": "Ignorar verificações de permissão",
			"config.permissionDesc": "O AGY executa as ferramentas. Solicitações sem permissão podem ser negadas; aprovações do DSH não substituem as do AGY.",
			"config.permissionSkipDesc": "Ignorar as verificações aprova alterações e comandos automaticamente. Use apenas em um espaço de trabalho confiável.",
			"config.defaultEffort": "Intensidade de raciocínio padrão",
			"config.defaultEffortDesc": "auto = cada modelo mantém o próprio padrão; um nível fixo define o valor inicial do menu de modelos da sessão e ainda pode ser substituído por modelo",
			"tsl.badge": "Tradução do Gemini",
			"tsl.plain": "Linguagem simples",
			"tsl.translate": "Traduzir para linguagem simples",
			"tsl.actionTip": "Reescrever esta resposta em linguagem simples com o Gemini",
			"tsl.translating": "Traduzindo…",
			"tsl.done": "Tradução concluída",
			"tsl.pending": "O Gemini está traduzindo…",
			"tsl.copy": "Copiar",
			"tsl.copied": "Copiado",
			"tsl.original": "Original",
			"tsl.showOriginal": "Ver original",
			"tsl.hideOriginal": "Ocultar original",
			"tsl.failed": "Falha na tradução",
			"tsl.retry": "Tentar novamente",
			"tsl.empty": "Nada para traduzir",
			"tsl.collapse": "Recolher",
			"tsl.expand": "Expandir"
		};
		const es = {
			"section.label": "Antigravity",
			"console.title": "Antigravity",
			"code.title": "Código",
			"code.inspect": "Inspeccionar",
			"tv.command": "Comando",
			"tv.write": "Escribir",
			"tv.edit": "Editar",
			"tv.read": "Leer",
			"tv.search": "Buscar",
			"tv.webSearch": "Búsqueda web",
			"tv.list": "Listar",
			"tv.delete": "Eliminar",
			"tv.tool": "Herramienta",
			"tv.noOutput": "(sin salida)",
			"tv.noMatches": "(sin coincidencias)",
			"tv.noChanges": "(sin cambios de texto)",
			"tv.emptyDir": "(directorio vacío)",
			"tv.noDetail": "(sin detalles)",
			"tv.hint.expandInspect": "Clic para expandir · clic derecho para inspeccionar",
			"tv.hint.collapseInspect": "Clic para contraer · clic derecho para inspeccionar",
			"tv.hint.expand": "Clic para expandir",
			"tv.hint.collapse": "Clic para contraer",
			"tv.diffMore": "… {count} líneas restantes no renderizadas",
			"code.copy": "Copiar",
			"code.copied": "Copiado",
			"status.ready": "Conectado",
			"status.needsAuth": "Se requiere autenticación",
			"status.unverified": "Inicio de sesión sin verificar",
			"status.loading": "Cargando el estado de Antigravity...",
			"status.authRequired": "Debe iniciar sesión de nuevo",
			"account.setActive": "Seleccionar cuenta",
			"account.settingActive": "Cambiando...",
			"account.activeSet": "Cuenta seleccionada",
			"account.activeSetFailed": "Cuenta no elegible ahora (enfriamiento o requiere login)",
			"status.proxy": "Proxy",
			"status.inUse": "Seleccionada",
			"account.add": "Añadir cuenta de Google",
			"header.addAccount": "Añadir cuenta",
			"account.aliasDefault": "Cuenta de Google de respaldo {number}",
			"account.defaultAlias": "Cuenta principal (inicio de sesión del sistema)",
			"account.proxyPlaceholder": "URL de proxy dedicada (p. ej., http://127.0.0.1:7890; déjalo vacío para heredar la global)",
			"account.aliasPlaceholder": "Alias de la cuenta (por ejemplo: Cuenta de respaldo 2)",
			"account.removeTitle": "Eliminar esta cuenta",
			"aria.aliasInput": "Alias de la cuenta",
			"aria.proxyInput": "URL de proxy exclusivo",
			"aria.authCodeInput": "Código de autorización o URL de devolución",
			"aria.closeToast": "Cerrar notificación",
			"account.details": "Detalles",
			"account.collapse": "Contraer",
			"account.expandOthers": "Ver detalles de cuotas",
			"account.collapseOthers": "Ocultar detalles de cuotas",
			"account.otherModels": "Cuotas Claude / GPT",
			"account.quotaSummary": "Gemini · 5 h {fiveHour} · semana {weekly}",
			"account.quotaPending": "Cuota sin sincronizar",
			"account.sync": "Sincronizar",
			"account.syncing": "Sincronizando...",
			"account.syncTitle": "Actualizar esta cuenta (sincroniza correo, cuota y modelos tras cambiar de cuenta)",
			"account.models": "Detalles por modelo:",
			"account.cooldown": "Algunos modelos tienen límite de uso; la cuenta se cambió automáticamente",
			"account.clearCooldown": "Borrar espera",
			"account.localCooldown": " · espera local activa",
			"account.removed": "Cuenta eliminada: {alias}",
			"quota.fiveHour": "Cuota de 5 horas",
			"quota.weekly": "Cuota semanal",
			"quota.refreshed": "Cuota actualizada",
			"quota.windowReset": "Reiniciada · disponible",
			"proxy.button": "Proxy",
			"proxy.placeholder": "URL de proxy exclusivo (por ejemplo: http://127.0.0.1:7890; déjelo vacío para usar el proxy global)",
			"proxy.save": "Guardar",
			"proxy.saved": "Proxy guardado",
			"proxy.invalid": "Introduzca una dirección HTTP, HTTPS o SOCKS5 válida.",
			"cancel": "Cancelar",
			"auth.openBrowser": "Abrir navegador para iniciar sesión",
			"auth.openingBrowser": "Abriendo navegador...",
			"auth.browserOpened": "La página de autorización de Google se abrió en el navegador y se sincronizará después de autorizar",
			"auth.browserManual": "No se pudo abrir el navegador automáticamente; use el enlace de abajo para autorizar manualmente",
			"auth.startFailed": "No se pudo iniciar la autorización de Google. Revise la configuración de red o proxy.",
			"auth.networkHint": "Revise la configuración de red o proxy",
			"auth.activated": "Cuenta activada en el pool",
			"auth.failed": "Falló la autorización",
			"auth.added": "Cuenta de Google añadida y activada",
			"auth.codeFailed": "Falló la validación del código de autorización",
			"auth.exchanging": "Verificando la autorización y activando la cuenta; espere...",
			"auth.waiting": "Complete la autorización de Google en el navegador. La cuenta se activará automáticamente.",
			"auth.openManual": "Si el navegador no se abrió, haga clic aquí para abrir manualmente la página de inicio de sesión de Google",
			"auth.pasteHint": "Si la devolución automática no se completó, pegue el código de autorización o la URL de devolución:",
			"auth.codePlaceholder": "Código de autorización o URL completa http://localhost:51121/oauth-callback?code=...",
			"auth.activate": "Activar manualmente",
			"auth.activating": "Verificando y activando...",
			"auth.code.browser_manual": "No se pudo abrir el navegador automáticamente; use el enlace de abajo para autorizar manualmente.",
			"auth.code.callback_failed": "La devolución de la autorización falló. Inicie la autorización de nuevo.",
			"auth.code.no_active_flow": "No hay un flujo de autorización en curso.",
			"auth.code.invalid_code": "No se reconoció el código de autorización. Pegue el código o la URL completa de devolución.",
			"auth.code.invalid_state": "El enlace de autorización no pertenece a este flujo o caducó. Inicie la autorización de nuevo.",
			"auth.code.exchange_failed": "Falló la validación de la autorización. Inicie la autorización de nuevo.",
			"auth.code.primary_activated": "Cuenta principal conectada.",
			"auth.code.account_activated": "Cuenta añadida. Selecciónala en la lista para usarla.",
			"auth.code.missing_code": "Introduzca un código de autorización.",
			"auth.code.request_failed": "La solicitud no se completó. Inténtelo de nuevo.",
			"api.genericError": "La operación no se completó. Inténtelo de nuevo.",
			"duration.day": "d",
			"duration.hour": "h",
			"duration.minute": "min",
			"permission.label": "Modo de permisos:",
			"permission.plan": "plan (solo lectura)",
			"permission.acceptEdits": "accept-edits (editar código)",
			"permission.skip": "skip (aprobación automática; se mantienen las protecciones internas de AGY)",
			"effort.label": "Intensidad de razonamiento:",
			"effort.auto": "auto",
			"effort.low": "low",
			"effort.medium": "medium",
			"effort.high": "high",
			"pool.label": "Cambio de cuenta:",
			"pool.manual": "Manual",
			"pool.sequential": "Usar en secuencia",
			"pool.roundRobin": "Turno rotativo",
			"models.label": "Visibilidad de modelos:",
			"models.empty": "Aún no hay modelos en el catálogo: envía un mensaje o haz clic en \"Actualizar cuota\" y vuelve para gestionarlos",
			"models.hint": "Haz clic para mostrar/ocultar. Los modelos ocultos no aparecen en el selector de modelos; las sesiones en curso no se ven afectadas.",
			"header.refreshQuota": "Actualizar cuota",
			"header.refreshing": "Actualizando...",
			"console.close": "Cerrar (Esc)",
			"header.badgeTitle": "Antigravity: {count} cuentas listas · haga clic para abrir la consola",
			"header.badgeLoading": "Antigravity · haga clic para abrir la consola",
			"account.type.agy": "Google Antigravity (CLI / OAuth)",
			"account.loginType": "Tipo de inicio de sesión:",
			"account.dragHandle": "Arrastrar para reordenar prioridad",
			"account.moveUp": "Subir prioridad",
			"account.moveDown": "Bajar prioridad",
			"account.reordered": "Prioridad de cuentas reordenada con éxito",
			"account.collapseAll": "Contraer todo",
			"account.expandAll": "Expandir todo",
			"account.cardCollapse": "Contraer",
			"account.cardExpand": "Expandir detalles",
			"account.draggingTarget": "Soltar aquí para prioridad #{num}",
			"account.dragBanner": "Reordenando: moviendo [{alias}] a #{num}",
			"account.dragHint": "Arrastre las tarjetas para reordenar la prioridad en tiempo real",
			"account.enable": "Habilitar",
			"account.disable": "Deshabilitar",
			"account.enableTitle": "Habilitar esta cuenta (incluir en rotación)",
			"account.disableTitle": "Deshabilitar esta cuenta (ignorar en rotación)",
			"account.enabledToast": "Cuenta habilitada: {alias}",
			"account.disabledToast": "Cuenta deshabilitada: {alias}",
			"status.disabled": "Deshabilitado",
			"header.warmup": "Precalentamiento",
			"header.warmingUp": "Calentando...",
			"account.warmup": "Calentar",
			"account.warmingUp": "Calentando...",
			"account.warmupTitle": "Calentar esta cuenta (activar temporizador semanal de 7 días)",
			"warmup.success": "Cuenta calentada con éxito",
			"warmup.allSuccess": "Precalentamiento completado",
			"warmup.skipped": "Cuenta en espera, sin necesidad de calentar",
			"config.autoWarmup": "Precalentamiento automático de 7 días",
			"config.autoWarmupDesc": "Activa automáticamente un ciclo cuando se alcanza el tiempo de reinicio semanal",
			"config.autoTranslate": "Traducción automática",
			"config.autoTranslateDesc": "Al terminar cada turno, Gemini reescribe la respuesta final en lenguaje sencillo y la muestra debajo de esa respuesta",
			"config.translateModel": "Modelo de traducción",
			"config.translateModelDesc": "Modelo usado en la llamada de traducción; el valor por defecto elige automáticamente el Gemini Flash más reciente",
			"config.translateModelAuto": "Predeterminado (auto)",
			"config.translateEffort": "Intensidad de razonamiento",
			"config.translateEffortDesc": "Intensidad usada en la llamada de traducción; el valor por defecto sigue “Intensidad de razonamiento predeterminada” abajo",
			"config.translateEffortAuto": "Seguir predeterminado",
			"config.on": "Activado",
			"config.off": "Desactivado",
			"config.runtimeTitle": "Ejecución",
			"config.runtimeDesc": "Elige el cambio de cuenta y los permisos de herramientas de AGY.",
			"direct.title": "Conexión directa experimental",
			"direct.description": "Usa una cuenta independiente. Elige un modelo directo.",
			"direct.loading": "Cargando conexión directa…",
			"direct.error": "No se pudo cargar la conexión directa. Consulta los registros de DSH.",
			"direct.unavailable": "La gestión de cuentas directas requiere una conexión local de DSH.",
			"direct.proxy": "Proxy directo",
			"direct.proxyHelp": "Solo proxy HTTP sin credenciales; vacío conecta directamente. La autorización usa la red del navegador.",
			"direct.proxyPlaceholder": "Por ejemplo http://127.0.0.1:7890",
			"direct.proxySave": "Guardar proxy",
			"direct.proxyInvalid": "El proxy directo no es válido. Guarda uno válido; no se conectará directamente de forma automática.",
			"config.permissionMode": "Permisos de AGY",
			"config.permissionPlan": "Modo de planificación",
			"config.permissionEdits": "Aceptar ediciones de archivos",
			"config.permissionSkip": "Omitir comprobaciones de permisos",
			"config.permissionDesc": "AGY ejecuta las herramientas. Las solicitudes sin permiso pueden denegarse; las aprobaciones de DSH no sustituyen las de AGY.",
			"config.permissionSkipDesc": "Omitir las comprobaciones aprueba cambios y comandos automáticamente. Úsalo solo en un espacio de trabajo de confianza.",
			"config.defaultEffort": "Intensidad de razonamiento predeterminada",
			"config.defaultEffortDesc": "auto = cada modelo usa su propio valor por defecto; un nivel fijo fija el valor inicial del menú de modelos de la sesión y aún puede sobrescribirse por modelo",
			"tsl.badge": "Traducción de Gemini",
			"tsl.plain": "Lenguaje sencillo",
			"tsl.translate": "Traducir a lenguaje sencillo",
			"tsl.actionTip": "Reescribir esta respuesta en lenguaje sencillo con Gemini",
			"tsl.translating": "Traduciendo…",
			"tsl.done": "Traducción completada",
			"tsl.pending": "Gemini está traduciendo…",
			"tsl.copy": "Copiar",
			"tsl.copied": "Copiado",
			"tsl.original": "Original",
			"tsl.showOriginal": "Ver original",
			"tsl.hideOriginal": "Ocultar original",
			"tsl.failed": "Fallo en la traducción",
			"tsl.retry": "Reintentar",
			"tsl.empty": "Nada que traducir",
			"tsl.collapse": "Contraer",
			"tsl.expand": "Expandir"
		};
		//#endregion
		//#region src/client/scroll-guard.ts
		let isScrolling = false;
		let scrollTimer = null;
		let listenerAttached = false;
		const settleListeners = /* @__PURE__ */ new Set();
		let overlaySuspended = false;
		function onScrollActivity() {
			isScrolling = true;
			if (scrollTimer !== null) clearTimeout(scrollTimer);
			scrollTimer = setTimeout(() => {
				isScrolling = false;
				scrollTimer = null;
				for (const fn of settleListeners) try {
					fn();
				} catch {}
			}, 150);
		}
		/**
		* Suspend every overlay scanner while a modal/overlay owns the screen.
		*
		* Opening the Antigravity console must freeze the conversation behind it: any
		* DOM the scanners inject while the panel composites on top becomes visible
		* flashing, and the modal's own periodic re-renders keep waking the global
		* observers. On resume we fire the settle listeners once so scanners catch up
		* on anything that changed while they were held back.
		*/
		function setOverlaySuspended(active) {
			if (overlaySuspended === active) return;
			overlaySuspended = active;
			if (!active) for (const fn of settleListeners) try {
				fn();
			} catch {}
		}
		/**
		* The one predicate every overlay scanner should gate on: may I mutate the DOM
		* right now? False during an active scroll gesture AND while an overlay owns
		* the screen. Scanners must not act while this is true.
		*/
		function isInteractionLocked() {
			return isScrolling || overlaySuspended;
		}
		/** Register a callback to run once scrolling has settled. Returns an unregister function. */
		function onScrollSettle(fn) {
			ensureScrollListener();
			settleListeners.add(fn);
			return () => {
				settleListeners.delete(fn);
			};
		}
		function ensureScrollListener() {
			if (typeof window === "undefined" || typeof window.addEventListener !== "function" || listenerAttached) return;
			listenerAttached = true;
			window.addEventListener("scroll", onScrollActivity, {
				passive: true,
				capture: true
			});
			window.addEventListener("wheel", onScrollActivity, {
				passive: true,
				capture: true
			});
		}
		function disposeScrollListener() {
			if (typeof window === "undefined" || typeof window.removeEventListener !== "function" || !listenerAttached) return;
			window.removeEventListener("scroll", onScrollActivity, true);
			window.removeEventListener("wheel", onScrollActivity, true);
			listenerAttached = false;
			if (scrollTimer !== null) {
				clearTimeout(scrollTimer);
				scrollTimer = null;
			}
			settleListeners.clear();
			isScrolling = false;
			overlaySuspended = false;
		}
		//#endregion
		//#region src/client/decisions.ts
		const DECISION_CSS = `
.agy-decision-container {
  margin: 10px 0 6px 0;
  padding: 10px 12px;
  border-radius: 8px;
  background: var(--dsw-alias-bg-l2, rgba(127, 127, 127, 0.07));
  border: 1px dashed var(--dsw-alias-border-l3, rgba(127, 127, 127, 0.3));
}

.agy-decision-header {
  font-size: 12px;
  font-weight: 600;
  color: var(--dsw-alias-label-secondary, #aaa);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.agy-decision-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.agy-decision-chip {
  background: var(--dsw-alias-bg-l1, rgba(255, 255, 255, 0.05));
  border: 1px solid var(--dsw-alias-border-l2, rgba(127, 127, 127, 0.25));
  color: var(--dsw-alias-label-primary, #eee);
  padding: 5px 12px;
  border-radius: 999px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.15s ease;
  user-select: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  text-align: left;
  max-width: 100%;
}

.agy-decision-chip:hover {
  background: var(--dsw-alias-bg-hover, rgba(127, 127, 127, 0.18));
  border-color: var(--dsw-alias-border-l4, rgba(127, 127, 127, 0.5));
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.18);
}

.agy-decision-chip:active {
  transform: translateY(0);
}

.agy-decision-chip.selected {
  background: rgba(16, 185, 129, 0.15);
  border-color: #10b981;
  color: #10b981;
}

.agy-decision-chip-num {
  font-weight: 700;
  opacity: 0.8;
}

.agy-decision-chip-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
`;
		function injectStyles$5() {
			if (typeof document === "undefined") return;
			const styleId = "dsh-agy-link-decisions-css";
			if (document.getElementById(styleId) === null) {
				const st = document.createElement("style");
				st.id = styleId;
				st.textContent = DECISION_CSS;
				const host = document.head ?? document.documentElement;
				if (host) host.appendChild(st);
			}
		}
		/**
		* Insert text directly into DSH's chat composer
		*/
		function insertTextIntoChatComposer(text) {
			if (typeof document === "undefined" || !text) return false;
			const inputEl = document.querySelector("[data-composer-input]") ?? document.querySelector("[role=\"textbox\"][contenteditable=\"true\"]") ?? document.querySelector("textarea");
			if (!inputEl) return false;
			inputEl.focus();
			if (inputEl instanceof HTMLTextAreaElement || inputEl instanceof HTMLInputElement) {
				const start = inputEl.selectionStart ?? inputEl.value.length;
				const end = inputEl.selectionEnd ?? inputEl.value.length;
				inputEl.setRangeText(text, start, end, "end");
				inputEl.dispatchEvent(new Event("input", { bubbles: true }));
				inputEl.dispatchEvent(new Event("change", { bubbles: true }));
				return true;
			}
			try {
				if (document.execCommand("insertText", false, text)) return true;
			} catch {}
			const existing = inputEl.textContent?.trim() ?? "";
			inputEl.textContent = existing ? `${existing} ${text}` : text;
			inputEl.dispatchEvent(new InputEvent("input", {
				bubbles: true,
				inputType: "insertText",
				data: text
			}));
			return true;
		}
		/** Check if text header suggests an actionable decision or choice prompt */
		const DECISION_HEADER_REGEX = /(?:请(?:您)?(?:拍板|指示|决定|选择|决策)|decision|next\s+step|choose|拍板|选择方案)/i;
		/** Extract numbered options or choice items from a decision list */
		function extractOptionsFromList(container) {
			const options = [];
			const listItems = container.querySelectorAll("li");
			if (listItems.length > 0) for (let i = 0; i < listItems.length; i++) {
				const li = listItems[i];
				if (!li) continue;
				const text = (li.textContent ?? "").trim();
				if (!text) continue;
				const m = text.match(/^([0-9]+[、.．:]\s*)?(.*?)(?:[：:—\-·]|\n|$)/);
				const num = m?.[1]?.trim() ?? `${i + 1}.`;
				let title = m?.[2]?.trim() || text.slice(0, 50);
				if (title.length > 40) title = title.slice(0, 40) + "…";
				options.push({
					num,
					title,
					fullText: text
				});
			}
			return options;
		}
		/**
		* Scan DOM for decision prompts and mount interactive choice chips.
		*
		* IDEMPOTENCE (incident 2026-10-23 — "scroll back and forth = insane flashing"):
		* DSH renders these containers inside a TanStack-Virtual list with dynamic
		* measurement (`measureElement` + `anchorTo:"start"`). Injecting a toolbar
		* changes the measured item height, which makes the virtualizer rewrite
		* scrollTop; the resulting re-render rebuilds the markdown/heading nodes
		* (dropping the per-HEADING guard) and this scanner injected the toolbar
		* again — growth on every scroll pass, i.e. a flashing flywheel.
		*
		* Two independent guards now make injection strictly once-per-container:
		*   1. `data-agy-decisions-scanned` on the container, written on EVERY pass
		*      (it used to be read here but never assigned anywhere in the codebase),
		*   2. "a toolbar already exists in this container" — survives React
		*      rebuilding the heading nodes during a virtualizer remount.
		*/
		function scanAndEnhanceDecisions() {
			if (typeof document === "undefined") return;
			if (isInteractionLocked()) return;
			const markdownContainers = document.querySelectorAll("div[class*=\"_markdown_\"], [data-markdown-variant]");
			for (let i = 0; i < markdownContainers.length; i++) {
				const container = markdownContainers[i];
				if (!container || container.dataset.agyDecisionsScanned === "true") continue;
				if (container.querySelector(".agy-decision-container")) {
					container.dataset.agyDecisionsScanned = "true";
					continue;
				}
				container.dataset.agyDecisionsScanned = "true";
				const headings = container.querySelectorAll("h2, h3, h4, p > strong");
				for (let j = 0; j < headings.length; j++) {
					const heading = headings[j];
					if (!heading || heading.dataset.agyDecisionAttached === "true") continue;
					const headingText = (heading.textContent ?? "").trim();
					if (!DECISION_HEADER_REGEX.test(headingText)) continue;
					let sibling = heading.nextElementSibling;
					let targetList = null;
					while (sibling) {
						if (sibling.tagName === "OL" || sibling.tagName === "UL") {
							targetList = sibling;
							break;
						}
						if (/^H[1-4]$/.test(sibling.tagName)) break;
						sibling = sibling.nextElementSibling;
					}
					if (!targetList) continue;
					const options = extractOptionsFromList(targetList);
					if (options.length === 0) continue;
					heading.dataset.agyDecisionAttached = "true";
					const box = document.createElement("div");
					box.className = "agy-decision-container";
					const header = document.createElement("div");
					header.className = "agy-decision-header";
					header.innerHTML = "<span>💬 点击选项快速填入：</span>";
					box.appendChild(header);
					const chips = document.createElement("div");
					chips.className = "agy-decision-chips";
					for (const opt of options) {
						const chip = document.createElement("button");
						chip.type = "button";
						chip.className = "agy-decision-chip";
						chip.title = `点击填入: ${opt.fullText}`;
						const numSpan = document.createElement("span");
						numSpan.className = "agy-decision-chip-num";
						numSpan.textContent = opt.num ?? "👉";
						const textSpan = document.createElement("span");
						textSpan.className = "agy-decision-chip-text";
						textSpan.textContent = opt.title;
						chip.appendChild(numSpan);
						chip.appendChild(textSpan);
						chip.onclick = (e) => {
							e.stopPropagation();
							const cleanText = opt.fullText.replace(/^[0-9]+[、.．:]\s*/, "").trim();
							insertTextIntoChatComposer(`我选择 ${opt.num ? opt.num + " " : ""}${cleanText}`);
							chip.classList.add("selected");
							setTimeout(() => chip.classList.remove("selected"), 1200);
						};
						chips.appendChild(chip);
					}
					box.appendChild(chips);
					targetList.parentNode?.insertBefore(box, targetList.nextSibling);
				}
			}
		}
		let decisionChipsDispose = null;
		let decisionScanTimer = null;
		let unbindDecisionSettle = null;
		function scheduleDecisionScan() {
			if (isInteractionLocked()) return;
			if (decisionScanTimer !== null) return;
			decisionScanTimer = setTimeout(() => {
				decisionScanTimer = null;
				if (isInteractionLocked()) return;
				scanAndEnhanceDecisions();
			}, 100);
		}
		function installDecisionChips() {
			if (typeof window === "undefined" || typeof document === "undefined") return () => {};
			decisionChipsDispose?.();
			injectStyles$5();
			const observer = new MutationObserver(() => {
				scheduleDecisionScan();
			});
			unbindDecisionSettle = onScrollSettle(() => {
				scheduleDecisionScan();
			});
			const setup = () => {
				if (document.body) {
					observer.observe(document.body, {
						childList: true,
						subtree: true
					});
					scanAndEnhanceDecisions();
				}
			};
			if (document.readyState === "loading") window.addEventListener("DOMContentLoaded", setup, { once: true });
			else setup();
			const dispose = () => {
				observer.disconnect();
				if (unbindDecisionSettle !== null) {
					unbindDecisionSettle();
					unbindDecisionSettle = null;
				}
				if (decisionScanTimer !== null) {
					clearTimeout(decisionScanTimer);
					decisionScanTimer = null;
				}
				window.removeEventListener("DOMContentLoaded", setup);
				if (decisionChipsDispose === dispose) decisionChipsDispose = null;
			};
			decisionChipsDispose = dispose;
			return dispose;
		}
		//#endregion
		//#region src/client/images.ts
		let lightboxOverlay = null;
		let lightboxScale = 1;
		let lightboxTranslateX = 0;
		let lightboxTranslateY = 0;
		let isDraggingLightbox = false;
		let dragStartX = 0;
		let dragStartY = 0;
		const IMAGE_CSS = `
.agy-image-card {
  display: inline-flex;
  flex-direction: column;
  margin: 6px 0;
  max-width: 100%;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--dsw-alias-border-l2, rgba(127, 127, 127, 0.25));
  background: var(--dsw-alias-bg-l1, rgba(255, 255, 255, 0.03));
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  vertical-align: middle;
}

.agy-image-card:hover {
  border-color: var(--dsw-alias-border-l3, rgba(127, 127, 127, 0.45));
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
}

.agy-image-thumb-wrap {
  position: relative;
  overflow: hidden;
  max-height: 480px;
  cursor: zoom-in;
  display: flex;
  align-items: center;
  justify-content: center;
  background: repeating-conic-gradient(rgba(127,127,127,0.08) 0% 25%, transparent 0% 50%) 50% / 16px 16px;
}

.agy-image-thumb {
  display: block;
  max-width: 100%;
  max-height: 480px;
  height: auto;
  object-fit: contain;
  transition: transform 0.2s ease;
}

.agy-image-card:hover .agy-image-thumb {
  transform: scale(1.015);
}

.agy-image-caption {
  padding: 6px 10px;
  font-size: 11.5px;
  color: var(--dsw-alias-label-secondary, #aaa);
  background: var(--dsw-alias-bg-l2, rgba(127, 127, 127, 0.08));
  border-top: 1px solid var(--dsw-alias-border-l2, rgba(127, 127, 127, 0.15));
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.agy-image-link-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 6px;
  margin: 0 2px;
  border-radius: 4px;
  font-size: 12px;
  background: var(--dsw-alias-bg-l2, rgba(127, 127, 127, 0.1));
  border: 1px solid var(--dsw-alias-border-l2, rgba(127, 127, 127, 0.2));
  color: var(--dsw-alias-label-primary, #ddd);
  cursor: pointer;
  text-decoration: none;
  transition: all 0.15s ease;
}

.agy-image-link-chip:hover {
  background: var(--dsw-alias-bg-hover, rgba(127, 127, 127, 0.2));
  border-color: var(--dsw-alias-border-l3, rgba(127, 127, 127, 0.35));
}

/* Lightbox Modal */
.agy-lightbox-backdrop {
  position: fixed;
  inset: 0;
  z-index: 999999;
  background: rgba(0, 0, 0, 0.9);
  /* No full-viewport backdrop blur: same flicker class as the console overlay.
     The image viewer is already near-opaque; a solid alpha is stable. */
  overscroll-behavior: contain;
  display: flex;
  flex-direction: column;
  user-select: none;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.agy-lightbox-backdrop.open {
  opacity: 1;
}

.agy-lightbox-header {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: rgba(20, 20, 20, 0.65);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 13px;
}

.agy-lightbox-title {
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 60%;
}

.agy-lightbox-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.agy-lightbox-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #fff;
  border-radius: 6px;
  padding: 4px 10px;
  cursor: pointer;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: all 0.15s ease;
}

.agy-lightbox-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.agy-lightbox-btn-close {
  background: rgba(239, 68, 68, 0.25);
  border-color: rgba(239, 68, 68, 0.4);
}

.agy-lightbox-btn-close:hover {
  background: rgba(239, 68, 68, 0.45);
}

.agy-lightbox-body {
  flex: 1;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
}

.agy-lightbox-body.grabbing {
  cursor: grabbing;
}

.agy-lightbox-img-wrap {
  transform-origin: center center;
  transition: transform 0.05s ease-out;
  display: inline-block;
}

.agy-lightbox-img {
  max-width: 90vw;
  max-height: 85vh;
  object-fit: contain;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  pointer-events: none;
}
`;
		function injectStyles$4() {
			if (typeof document === "undefined") return;
			const styleId = "dsh-agy-link-images-css";
			if (document.getElementById(styleId) === null) {
				const st = document.createElement("style");
				st.id = styleId;
				st.textContent = IMAGE_CSS;
				const host = document.head ?? document.documentElement;
				if (host) host.appendChild(st);
			}
		}
		function getOrigin() {
			if (typeof window !== "undefined" && window.location?.origin) return window.location.origin;
			return "";
		}
		/** Build media URL from path */
		function buildMediaUrl(rawPath) {
			return `${getOrigin()}/plugins/agy-link/media?path=${encodeURIComponent(rawPath.trim())}`;
		}
		/**
		* Open fullscreen Lightbox modal
		*/
		function openLightbox(src, title = "Image Preview", rawPath) {
			if (typeof document === "undefined") return;
			injectStyles$4();
			if (lightboxOverlay) {
				lightboxOverlay.remove();
				lightboxOverlay = null;
			}
			lightboxScale = 1;
			lightboxTranslateX = 0;
			lightboxTranslateY = 0;
			const overlay = document.createElement("div");
			overlay.className = "agy-lightbox-backdrop";
			const header = document.createElement("div");
			header.className = "agy-lightbox-header";
			const titleEl = document.createElement("div");
			titleEl.className = "agy-lightbox-title";
			titleEl.textContent = title;
			header.appendChild(titleEl);
			const actions = document.createElement("div");
			actions.className = "agy-lightbox-actions";
			const btnZoomIn = document.createElement("button");
			btnZoomIn.className = "agy-lightbox-btn";
			btnZoomIn.textContent = "🔍+";
			btnZoomIn.title = "放大 / Zoom In";
			const btnZoomOut = document.createElement("button");
			btnZoomOut.className = "agy-lightbox-btn";
			btnZoomOut.textContent = "🔍-";
			btnZoomOut.title = "缩小 / Zoom Out";
			const btnReset = document.createElement("button");
			btnReset.className = "agy-lightbox-btn";
			btnReset.textContent = "1:1";
			btnReset.title = "实际大小 / Reset";
			actions.appendChild(btnZoomIn);
			actions.appendChild(btnZoomOut);
			actions.appendChild(btnReset);
			if (rawPath) {
				const btnCopyPath = document.createElement("button");
				btnCopyPath.className = "agy-lightbox-btn";
				btnCopyPath.textContent = "📋 复制路径";
				btnCopyPath.onclick = (e) => {
					e.stopPropagation();
					if (navigator.clipboard) navigator.clipboard.writeText(rawPath).then(() => {
						btnCopyPath.textContent = "✓ 已复制";
						setTimeout(() => {
							btnCopyPath.textContent = "📋 复制路径";
						}, 1500);
					}).catch(() => {});
				};
				actions.appendChild(btnCopyPath);
			}
			const btnClose = document.createElement("button");
			btnClose.className = "agy-lightbox-btn agy-lightbox-btn-close";
			btnClose.textContent = "✕ 关闭";
			actions.appendChild(btnClose);
			header.appendChild(actions);
			overlay.appendChild(header);
			const body = document.createElement("div");
			body.className = "agy-lightbox-body";
			const imgWrap = document.createElement("div");
			imgWrap.className = "agy-lightbox-img-wrap";
			const img = document.createElement("img");
			img.className = "agy-lightbox-img";
			img.src = src;
			img.alt = title;
			imgWrap.appendChild(img);
			body.appendChild(imgWrap);
			overlay.appendChild(body);
			const updateTransform = () => {
				imgWrap.style.transform = `translate(${lightboxTranslateX}px, ${lightboxTranslateY}px) scale(${lightboxScale})`;
			};
			btnZoomIn.onclick = (e) => {
				e.stopPropagation();
				lightboxScale = Math.min(lightboxScale * 1.3, 5);
				updateTransform();
			};
			btnZoomOut.onclick = (e) => {
				e.stopPropagation();
				lightboxScale = Math.max(lightboxScale / 1.3, .2);
				updateTransform();
			};
			btnReset.onclick = (e) => {
				e.stopPropagation();
				lightboxScale = 1;
				lightboxTranslateX = 0;
				lightboxTranslateY = 0;
				updateTransform();
			};
			const closeLightbox = () => {
				window.removeEventListener("keydown", onKeyDown);
				overlay.classList.remove("open");
				setTimeout(() => {
					overlay.remove();
					if (lightboxOverlay === overlay) lightboxOverlay = null;
				}, 200);
			};
			btnClose.onclick = (e) => {
				e.stopPropagation();
				closeLightbox();
			};
			overlay.onclick = (e) => {
				if (e.target === overlay || e.target === body) closeLightbox();
			};
			const onKeyDown = (e) => {
				if (e.key === "Escape") closeLightbox();
			};
			window.addEventListener("keydown", onKeyDown);
			body.onmousedown = (e) => {
				isDraggingLightbox = true;
				dragStartX = e.clientX - lightboxTranslateX;
				dragStartY = e.clientY - lightboxTranslateY;
				body.classList.add("grabbing");
			};
			const onMouseMove = (e) => {
				if (!isDraggingLightbox) return;
				lightboxTranslateX = e.clientX - dragStartX;
				lightboxTranslateY = e.clientY - dragStartY;
				updateTransform();
			};
			const onMouseUp = () => {
				if (isDraggingLightbox) {
					isDraggingLightbox = false;
					body.classList.remove("grabbing");
				}
			};
			window.addEventListener("mousemove", onMouseMove);
			window.addEventListener("mouseup", onMouseUp);
			body.onwheel = (e) => {
				e.preventDefault();
				const factor = e.deltaY < 0 ? 1.15 : .87;
				lightboxScale = Math.max(.2, Math.min(lightboxScale * factor, 5));
				updateTransform();
			};
			document.body.appendChild(overlay);
			lightboxOverlay = overlay;
			requestAnimationFrame(() => overlay.classList.add("open"));
		}
		/** Check if a URL or path is an image */
		function isImageFile(pathOrUrl) {
			if (!pathOrUrl || typeof pathOrUrl !== "string") return false;
			const clean = pathOrUrl.split(/[?#]/)[0] ?? "";
			return /\.(png|jpe?g|webp|gif|svg|bmp|ico|avif)$/i.test(clean);
		}
		/** Get React props of a DOM element */
		function getReactProps(el) {
			const key = Object.keys(el).find((k) => k.startsWith("__reactProps"));
			if (!key) return null;
			return el[key];
		}
		/**
		* Scan DOM for imageAlt spans and enhance them with live rendered images
		*/
		function scanAndEnhanceImages() {
			if (typeof document === "undefined") return;
			if (isInteractionLocked()) return;
			const origin = getOrigin();
			if (origin && !origin.includes("127.0.0.1") && !origin.includes("localhost")) {
				const images = document.querySelectorAll("img[src*=\"/plugins/agy-link/media\"]");
				for (let i = 0; i < images.length; i++) {
					const img = images[i];
					if (img && img.src.includes("127.0.0.1")) {
						const u = new URL(img.src);
						img.src = `${origin}${u.pathname}${u.search}`;
					}
				}
			}
			const markdownContainers = document.querySelectorAll("div[class*=\"_markdown_\"], [data-markdown-variant]");
			for (let i = 0; i < markdownContainers.length; i++) {
				const container = markdownContainers[i];
				if (!container) continue;
				const altSpans = container.querySelectorAll("span[class*=\"imageAlt\"], span[class*=\"_imageAlt_\"]");
				if (altSpans.length === 0) continue;
				const props = getReactProps(container);
				const mdText = typeof props?.text === "string" ? props.text : "";
				if (!mdText) continue;
				const imgMatches = [];
				const re = /!\[(.*?)\]\((file:\/\/\/[^\s)]+|file:\/\/[^\s)]+|[A-Za-z]:[\\/][^\s)]+|\/home\/[^\s)]+|\/mnt\/[a-zA-Z]\/[^\s)]+|\\\\wsl\.localhost\\[^\s)]+)\)/g;
				let m;
				while ((m = re.exec(mdText)) !== null) imgMatches.push({
					alt: m[1] ?? "",
					target: m[2] ?? ""
				});
				if (imgMatches.length === 0) continue;
				for (let j = 0; j < altSpans.length; j++) {
					const span = altSpans[j];
					if (!span || span.dataset.agyEnhanced === "true") continue;
					const altText = (span.textContent ?? "").trim();
					const match = imgMatches.find((im) => im.alt.trim() === altText) ?? imgMatches[j];
					if (!match) continue;
					span.dataset.agyEnhanced = "true";
					const mediaUrl = buildMediaUrl(match.target);
					const card = document.createElement("div");
					card.className = "agy-image-card";
					const thumbWrap = document.createElement("div");
					thumbWrap.className = "agy-image-thumb-wrap";
					thumbWrap.title = `${altText || "Image"} (点击全屏放大)`;
					const img = document.createElement("img");
					img.className = "agy-image-thumb";
					img.src = mediaUrl;
					img.alt = altText || "Preview";
					img.loading = "lazy";
					img.onerror = () => {
						card.style.display = "none";
						span.style.display = "";
					};
					thumbWrap.appendChild(img);
					card.appendChild(thumbWrap);
					if (altText) {
						const caption = document.createElement("div");
						caption.className = "agy-image-caption";
						caption.textContent = altText;
						card.appendChild(caption);
					}
					thumbWrap.onclick = (e) => {
						e.stopPropagation();
						openLightbox(mediaUrl, altText || "Image Preview", match.target);
					};
					span.style.display = "none";
					span.parentNode?.insertBefore(card, span);
				}
			}
			const links = document.querySelectorAll("a[href^=\"file://\"]");
			for (let i = 0; i < links.length; i++) {
				const link = links[i];
				if (!link || link.dataset.agyLinkEnhanced === "true") continue;
				const href = link.href ?? "";
				if (!isImageFile(href)) continue;
				link.dataset.agyLinkEnhanced = "true";
				const mediaUrl = buildMediaUrl(href);
				const linkText = link.textContent ?? "Image";
				link.onclick = (e) => {
					e.preventDefault();
					e.stopPropagation();
					openLightbox(mediaUrl, linkText, href);
				};
				if (!link.querySelector(".agy-image-link-icon")) {
					const badge = document.createElement("span");
					badge.className = "agy-image-link-chip agy-image-link-icon";
					badge.textContent = "🖼️ 预览";
					link.appendChild(badge);
				}
			}
		}
		let imageEnhancerDispose = null;
		let imageScanTimer = null;
		let unbindImageSettle = null;
		function scheduleImageScan() {
			if (isInteractionLocked()) return;
			if (imageScanTimer !== null) return;
			imageScanTimer = setTimeout(() => {
				imageScanTimer = null;
				if (isInteractionLocked()) return;
				scanAndEnhanceImages();
			}, 100);
		}
		function installImageEnhancer() {
			if (typeof window === "undefined" || typeof document === "undefined") return () => {};
			imageEnhancerDispose?.();
			injectStyles$4();
			const observer = new MutationObserver(() => {
				scheduleImageScan();
			});
			unbindImageSettle = onScrollSettle(() => {
				scheduleImageScan();
			});
			const setup = () => {
				if (document.body) {
					observer.observe(document.body, {
						childList: true,
						subtree: true
					});
					scanAndEnhanceImages();
				}
			};
			if (document.readyState === "loading") window.addEventListener("DOMContentLoaded", setup, { once: true });
			else setup();
			const dispose = () => {
				observer.disconnect();
				if (unbindImageSettle !== null) {
					unbindImageSettle();
					unbindImageSettle = null;
				}
				if (imageScanTimer !== null) {
					clearTimeout(imageScanTimer);
					imageScanTimer = null;
				}
				window.removeEventListener("DOMContentLoaded", setup);
				if (imageEnhancerDispose === dispose) imageEnhancerDispose = null;
			};
			imageEnhancerDispose = dispose;
			return dispose;
		}
		//#endregion
		//#region src/client/toolview.ts
		function react$1() {
			const mod = require("react");
			if (mod === void 0 || mod === null) throw new Error("dsh-agy-link toolview requires react at render time (browser host)");
			return mod;
		}
		/** Cache user-expanded tool cards across TanStack Virtualizer remount cycles */
		const expandedToolBlockKeys = /* @__PURE__ */ new Set();
		function useToggle(initial = false, key) {
			const R2 = react$1();
			const init = key ? expandedToolBlockKeys.has(key) : initial;
			const [value, setValue] = R2.useState(init);
			const toggle = () => {
				setValue((prev) => {
					const next = !prev;
					if (key) {
						if (next) expandedToolBlockKeys.add(key);
						else expandedToolBlockKeys.delete(key);
					}
					return next;
				});
			};
			return [value, toggle];
		}
		function hx(type, props, ...children) {
			return react$1().createElement(type, props, ...children);
		}
		function IconChevronDownOutline14(size = 14, className = "") {
			return hx("svg", {
				width: size,
				height: size,
				className: className || void 0,
				viewBox: "0 0 14 14",
				fill: "none",
				style: {
					display: "block",
					flexShrink: 0
				},
				"aria-hidden": true
			}, hx("path", {
				d: "M11.8486 5.5L11.4238 5.92383L8.69727 8.65137C8.44157 8.90706 8.21562 9.13382 8.01172 9.29785C7.79912 9.46883 7.55595 9.61756 7.25 9.66602C7.08435 9.69222 6.91565 9.69222 6.75 9.66602C6.44405 9.61756 6.20088 9.46883 5.98828 9.29785C5.78438 9.13382 5.55843 8.90706 5.30273 8.65137L2.57617 5.92383L2.15137 5.5L3 4.65137L3.42383 5.07617L6.15137 7.80273C6.42595 8.07732 6.59876 8.24849 6.74023 8.3623C6.87291 8.46904 6.92272 8.47813 6.9375 8.48047C6.97895 8.48703 7.02105 8.48703 7.0625 8.48047C7.07728 8.47813 7.12709 8.46904 7.25977 8.3623C7.40124 8.24849 7.57405 8.07732 7.84863 7.80273L10.5762 5.07617L11 4.65137L11.8486 5.5Z",
				fill: "currentColor"
			}));
		}
		function IconApiOutline14(size = 14, className = "") {
			return hx("svg", {
				width: size,
				height: size,
				className: className || void 0,
				viewBox: "0 0 14 14",
				fill: "none",
				style: {
					display: "block",
					flexShrink: 0
				},
				"aria-hidden": true
			}, hx("path", {
				transform: "translate(0.6689 1.073)",
				d: "M11.4818 5.57813C11.4818 4.45301 11.4807 3.66237 11.4075 3.05908C11.3359 2.46953 11.2024 2.13852 10.9939 1.89441C10.9247 1.81341 10.8493 1.73801 10.7683 1.66882C10.5242 1.46033 10.1932 1.32686 9.60364 1.25525C9.00034 1.18198 8.20974 1.18091 7.0846 1.18091L5.57813 1.18091C4.45301 1.18091 3.66238 1.18198 3.05908 1.25525C2.46953 1.32686 2.13852 1.46033 1.89441 1.66882C1.81341 1.73801 1.73801 1.81341 1.66882 1.89441C1.46033 2.13852 1.32686 2.46953 1.25525 3.05908C1.18198 3.66238 1.18091 4.45301 1.18091 5.57813L1.18091 6.2771C1.18091 7.40218 1.18197 8.19288 1.25525 8.79614C1.32687 9.38553 1.46036 9.71674 1.66882 9.96082C1.73797 10.0417 1.81347 10.1173 1.89441 10.1864C2.13851 10.3948 2.46965 10.5275 3.05908 10.5991C3.66238 10.6724 4.45298 10.6735 5.57813 10.6735L7.0846 10.6735C8.20977 10.6735 9.00033 10.6724 9.60364 10.5991C10.1931 10.5275 10.5242 10.3948 10.7683 10.1864C10.8493 10.1173 10.9247 10.0417 10.9939 9.96082C11.2024 9.71674 11.3358 9.38553 11.4075 8.79614C11.4808 8.19288 11.4818 7.40218 11.4818 6.2771L11.4818 5.57813ZM12.6627 6.2771C12.6627 7.37222 12.6637 8.247 12.5798 8.93799C12.4942 9.64284 12.3133 10.2359 11.8928 10.7282C11.7834 10.8562 11.6637 10.9751 11.5356 11.0845C11.0434 11.5049 10.4511 11.6867 9.74634 11.7723C9.05525 11.8563 8.17999 11.8552 7.0846 11.8552L5.57813 11.8552C4.48273 11.8552 3.60747 11.8563 2.91638 11.7723C2.21157 11.6867 1.61933 11.5049 1.12708 11.0845C0.99901 10.9751 0.879281 10.8562 0.769898 10.7282C0.349454 10.2359 0.168506 9.64284 0.0828864 8.93799C-0.00101964 8.247 4.88512e-07 7.37222 6.47206e-07 6.2771L6.47206e-07 5.57813C6.47206e-07 4.48273 -0.00106163 3.60747 0.0828864 2.91638C0.168502 2.21168 0.349594 1.61928 0.769898 1.12708C0.879302 0.998981 0.998981 0.879302 1.12708 0.769898C1.61928 0.349594 2.21168 0.168502 2.91638 0.0828864C3.60747 -0.00106163 4.48273 6.47206e-07 5.57813 6.47206e-07L7.0846 6.47206e-07C8.17999 6.47206e-07 9.05525 -0.00106163 9.74634 0.0828864C10.451 0.168505 11.0434 0.349587 11.5356 0.769898C11.6637 0.879302 11.7834 0.998981 11.8928 1.12708C12.3131 1.61928 12.4942 2.21169 12.5798 2.91638C12.6638 3.60747 12.6627 4.48273 12.6627 5.57813L12.6627 6.2771Z",
				fill: "currentColor"
			}), hx("path", {
				transform: "translate(0.6689 1.073)",
				d: "M6.02607 5.50955L6.44306 5.9274L3.84284 8.52762L3.425 8.11063L3.00715 7.69278L4.77253 5.9274L3.00715 4.16202L3.84284 3.32633L6.02607 5.50955Z",
				fill: "currentColor"
			}), hx("path", {
				transform: "translate(0.6689 1.073)",
				d: "M9.23789 7.35397L9.23789 8.53488L6.96238 8.53488L6.96238 7.35397L9.23789 7.35397Z",
				fill: "currentColor"
			}));
		}
		function IconEditOutline16(size = 14, className = "") {
			return hx("svg", {
				width: size,
				height: size,
				className: className || void 0,
				viewBox: "0 0 16 16",
				fill: "none",
				style: {
					display: "block",
					flexShrink: 0
				},
				"aria-hidden": true
			}, hx("path", {
				d: "M9.94076 1.34942C10.7047 0.90231 11.6503 0.902415 12.4143 1.34942C12.7061 1.52015 12.9688 1.79118 13.3104 2.13284C13.6521 2.47448 13.9231 2.73721 14.0939 3.02894C14.5408 3.79294 14.5409 4.73856 14.0939 5.50251C13.9231 5.79415 13.652 6.05704 13.3104 6.39861L6.65932 13.0497C6.28068 13.4284 6.00695 13.7108 5.66543 13.9097C5.32391 14.1085 4.94315 14.2074 4.42705 14.3498L3.24394 14.6761C2.77527 14.8054 2.34538 14.9262 2.00131 14.9684C1.65196 15.0112 1.17964 15.0013 0.810764 14.6325C0.441921 14.2637 0.432107 13.7913 0.47486 13.442C0.517035 13.0979 0.6379 12.668 0.767181 12.1993L1.09352 11.0162C1.23588 10.5001 1.33481 10.1193 1.5336 9.77784C1.7325 9.43632 2.0149 9.1626 2.39355 8.78395L9.04466 2.13284C9.38625 1.79126 9.64911 1.52016 9.94076 1.34942ZM15.5427 14.8398H7.55223L8.96707 13.425H15.5427V14.8398ZM3.39382 9.78422C2.965 10.213 2.84244 10.3436 2.75709 10.49C2.67183 10.6366 2.61862 10.8079 2.45733 11.3925L2.13099 12.5756C2.00183 13.0439 1.92194 13.3419 1.88863 13.5536C2.10041 13.5204 2.39872 13.4416 2.86764 13.3123L4.05075 12.9859C4.63544 12.8246 4.80669 12.7715 4.95323 12.6862C5.09968 12.6008 5.23022 12.4783 5.65905 12.0494L10.721 6.98644L8.45577 4.72121L3.39382 9.78422ZM11.7 2.57079C11.3774 2.38198 10.9777 2.38198 10.6551 2.57079C10.5602 2.62647 10.4487 2.72931 10.0449 3.13311L9.45604 3.72094L11.7213 5.98617L12.3102 5.39833C12.7139 4.99457 12.8168 4.88307 12.8725 4.78818C13.0613 4.46561 13.0612 4.06585 12.8725 3.74326C12.8169 3.64827 12.7146 3.53752 12.3102 3.13311C11.9057 2.72863 11.795 2.6264 11.7 2.57079Z",
				fill: "currentColor"
			}));
		}
		function IconBrowseOutline16(size = 14, className = "") {
			return hx("svg", {
				width: size,
				height: size,
				className: className || void 0,
				viewBox: "0 0 16 16",
				fill: "none",
				style: {
					display: "block",
					flexShrink: 0
				},
				"aria-hidden": true
			}, hx("path", {
				d: "M11.2426 4.80473V6.10551H4.75819V4.80473H11.2426Z",
				fill: "currentColor"
			}), hx("path", {
				d: "M9.40858 7.84478V9.14557H4.75819V7.84478H9.40858Z",
				fill: "currentColor"
			}), hx("path", {
				d: "M9.23438 0.546389C10.1941 0.546389 10.9683 0.544914 11.5859 0.611819C12.2161 0.680096 12.7634 0.825745 13.2393 1.17139C13.5172 1.3733 13.7619 1.61812 13.9639 1.896C14.3096 2.37183 14.4551 2.91922 14.5234 3.54932C14.5903 4.16686 14.5889 4.94133 14.5889 5.90088V10.0981C14.5889 11.0576 14.5903 11.8321 14.5234 12.4497C14.4552 13.0798 14.3094 13.6272 13.9639 14.103C13.7619 14.381 13.5172 14.6257 13.2393 14.8276C12.7633 15.1734 12.2163 15.3189 11.5859 15.3872C10.9683 15.4541 10.1942 15.4536 9.23438 15.4536H6.76563C5.80591 15.4536 5.03168 15.4541 4.41407 15.3872C3.78385 15.3189 3.23665 15.1734 2.76074 14.8276C2.48291 14.6257 2.23802 14.3809 2.03614 14.103C1.69066 13.6272 1.54483 13.0798 1.47657 12.4497C1.40973 11.8321 1.41114 11.0576 1.41114 10.0981V5.90088C1.41113 4.94132 1.40966 4.16686 1.47657 3.54932C1.54488 2.91921 1.69042 2.37184 2.03614 1.896C2.2381 1.61807 2.4828 1.37333 2.76074 1.17139C3.23665 0.825682 3.78386 0.680109 4.41407 0.611819C5.03168 0.544905 5.80591 0.546389 6.76563 0.546389H9.23438ZM6.76563 1.896C5.77586 1.896 5.0876 1.89738 4.55957 1.95459C4.0443 2.01043 3.76214 2.11349 3.55469 2.26416C3.39135 2.38284 3.24761 2.52662 3.12891 2.68994C2.97821 2.89736 2.8752 3.17967 2.81934 3.69483C2.76214 4.22279 2.76075 4.91131 2.76074 5.90088V10.0981C2.76074 11.0876 2.76221 11.7762 2.81934 12.3042C2.87516 12.8194 2.97829 13.1026 3.12891 13.3101C3.24754 13.4733 3.39147 13.6172 3.55469 13.7358C3.76213 13.8865 4.04438 13.9896 4.55957 14.0454C5.0876 14.1026 5.77586 14.103 6.76563 14.103H9.23438C10.2242 14.103 10.9124 14.1026 11.4404 14.0454C11.9556 13.9896 12.2379 13.8865 12.4453 13.7358C12.6086 13.6172 12.7525 13.4733 12.8711 13.3101C13.0217 13.1026 13.1248 12.8195 13.1807 12.3042C13.2378 11.7762 13.2393 11.0876 13.2393 10.0981V5.90088C13.2393 4.91131 13.2379 4.22279 13.1807 3.69483C13.1248 3.17969 13.0218 2.89736 12.8711 2.68994C12.7524 2.52667 12.6086 2.38281 12.4453 2.26416C12.2379 2.11355 11.9556 2.01041 11.4404 1.95459C10.9124 1.8974 10.2241 1.896 9.23438 1.896H6.76563Z",
				fill: "currentColor"
			}));
		}
		function IconSearchOutline16(size = 14, className = "") {
			return hx("svg", {
				width: size,
				height: size,
				className: className || void 0,
				viewBox: "0 0 16 16",
				fill: "none",
				style: {
					display: "block",
					flexShrink: 0
				},
				"aria-hidden": true
			}, hx("path", {
				d: "M11.894845 6.647401C11.894845 3.725463 9.534486 1.356779 6.623219 1.35657C3.711786 1.35657 1.351635 3.725338 1.351635 6.647401C1.351843 9.569296 3.711911 11.938273 6.623219 11.938273C9.534361 11.938064 11.894637 9.569171 11.894845 6.647401ZM13.245462 6.647401C13.245254 10.317935 10.280401 13.293613 6.623219 13.293821C2.965871 13.293821 0.000204 10.31806 0 6.647401C0 2.976574 2.965746 0 6.623219 0C10.280526 0.000205 13.245462 2.9767 13.245462 6.647401Z",
				fill: "currentColor"
			}), hx("path", {
				d: "M16.000417 15.041079L15.044449 16.000433L11.530434 12.473588L12.486298 11.514234L16.000417 15.041079Z",
				fill: "currentColor"
			}));
		}
		function IconCodeOutline16(size = 14, className = "") {
			return hx("svg", {
				width: size,
				height: size,
				className: className || void 0,
				viewBox: "0 0 16 16",
				fill: "none",
				style: {
					display: "block",
					flexShrink: 0
				},
				"aria-hidden": true
			}, hx("path", {
				fillRule: "evenodd",
				clipRule: "evenodd",
				d: "M12.3368 1.53569L11.931 4.43172H14.8086V5.79673H11.7404L11.1962 9.67859H14.2839V11.0436H11.0056L10.4994 14.6529L9.14873 14.4643L9.62731 11.0436H5.75876L5.25252 14.6529L3.90186 14.4643L4.38043 11.0436H1.69141V9.67859H4.57104L5.11417 5.79673H2.21609V4.43172H5.30581L5.73724 1.34713L7.08995 1.53569L6.68414 4.43172H10.5527L10.9841 1.34713L12.3368 1.53569ZM5.94937 9.67859H9.81791L10.361 5.79673H6.49353L5.94937 9.67859Z",
				fill: "currentColor"
			}));
		}
		function IconInspectOutline12(size = 12, className = "") {
			return hx("svg", {
				width: size,
				height: size,
				className: className || void 0,
				viewBox: "0 0 16 16",
				fill: "none",
				style: {
					display: "inline-block",
					verticalAlign: "-1.5px",
					flexShrink: 0
				},
				"aria-hidden": true
			}, hx("path", {
				d: "M16 8L10.8571 12V10.552L14.1383 8L10.8571 5.448V4L16 8ZM5.14286 10.552L1.86171 8L5.14286 5.448V4L0 8L5.14286 12V10.552ZM9.02514 4L5.59657 12H6.84057L10.2691 4H9.02514Z",
				fill: "currentColor"
			}));
		}
		function IconCopyOutline16(size = 12, className = "") {
			return hx("svg", {
				width: size,
				height: size,
				className: className || void 0,
				viewBox: "0 0 16 16",
				fill: "none",
				style: {
					display: "inline-block",
					verticalAlign: "-1.5px",
					flexShrink: 0
				},
				"aria-hidden": true
			}, hx("path", {
				d: "M6.14929 4.02032C7.11197 4.02032 7.87983 4.02016 8.49597 4.07598C9.12128 4.13269 9.65792 4.25188 10.1415 4.53106C10.7202 4.8653 11.2008 5.3459 11.535 5.92462C11.8142 6.40818 11.9334 6.94481 11.9901 7.57012C12.0459 8.18625 12.0458 8.95419 12.0458 9.9168C12.0458 10.8795 12.0459 11.6473 11.9901 12.2635C11.9334 12.8888 11.8142 13.4254 11.535 13.909C11.2008 14.4877 10.7202 14.9683 10.1415 15.3025C9.65792 15.5817 9.12128 15.7009 8.49597 15.7576C7.87984 15.8134 7.11196 15.8133 6.14929 15.8133C5.18667 15.8133 4.41874 15.8134 3.80261 15.7576C3.1773 15.7009 2.64067 15.5817 2.1571 15.3025C1.5784 14.9683 1.09778 14.4877 0.76355 13.909",
				fill: "currentColor"
			}));
		}
		function IconCheckOutline14(size = 12, className = "") {
			return hx("svg", {
				width: size,
				height: size,
				className: className || void 0,
				viewBox: "0 0 14 14",
				fill: "none",
				style: {
					display: "inline-block",
					verticalAlign: "-1.5px",
					flexShrink: 0
				},
				"aria-hidden": true
			}, hx("path", {
				d: "M11.5635 4.58984L7.61426 9.07715C7.35154 9.37561 7.11346 9.64812 6.89453 9.84668C6.66593 10.054 6.38519 10.2506 6.01465 10.3164C5.82079 10.3508 5.62207 10.3529 5.42773 10.3213C5.0561 10.2609 4.77266 10.0674 4.54102 9.86328C4.31926 9.66791 4.07752 9.39911 3.81055 9.10449L2.44531 7.59863L3.55664 6.59082L4.92188 8.09766C5.21256 8.41844 5.38878 8.61191 5.53223 8.73828C5.61022 8.80699 5.65253 8.83192 5.66895 8.83984C5.69648 8.84429 5.72449 8.84467 5.75195 8.83984C5.72657 8.84451 5.75564 8.85422 5.88672 8.73535C6.02833 8.60692 6.20225 8.41088 6.48828 8.08594L10.4385 3.59961L11.5635 4.58984Z",
				fill: "currentColor"
			}));
		}
		function IconQuestionOutline16(size = 14, className = "") {
			return hx("svg", {
				width: size,
				height: size,
				className: className || void 0,
				viewBox: "0 0 16 16",
				fill: "none",
				style: {
					display: "block",
					flexShrink: 0
				},
				"aria-hidden": true
			}, hx("path", {
				d: "M8 1C4.134 1 1 3.91 1 7.5c0 1.547.575 2.973 1.559 4.093L1.13 14.54a.5.5 0 00.627.63l3.238-1.079C5.875 14.316 6.91 14.5 8 14.5c3.866 0 7-2.91 7-6.5S11.866 1 8 1zm0 10.5a.75.75 0 110-1.5.75.75 0 010 1.5zm1.09-3.41c-.42.34-.59.54-.59.91H7.5v-.5c0-.66.36-1.12.82-1.48.44-.35.68-.61.68-1.02 0-.55-.45-1-1-1s-1 .45-1 1H6c0-1.1.9-2 2-2s2 .9 2 2c0 .73-.39 1.25-.91 1.67z",
				fill: "currentColor"
			}));
		}
		function IconImageOutline16(size = 14, className = "") {
			return hx("svg", {
				width: size,
				height: size,
				className: className || void 0,
				viewBox: "0 0 16 16",
				fill: "none",
				style: {
					display: "block",
					flexShrink: 0
				},
				"aria-hidden": true
			}, hx("path", {
				d: "M14 3H2a1 1 0 00-1 1v8a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1zm-1 8H3l2.5-3.2 1.8 2.3 2.7-3.5L13 11zM5.5 6a1.5 1.5 0 110-3 1.5 1.5 0 010 3z",
				fill: "currentColor"
			}));
		}
		function toolIconFor(kind, size = 14) {
			switch (kind) {
				case "terminal": return IconApiOutline14(size);
				case "diff":
				case "delete": return IconEditOutline16(size);
				case "read": return IconBrowseOutline16(size);
				case "search":
				case "list": return IconSearchOutline16(size);
				case "question": return IconQuestionOutline16(size);
				case "image": return IconImageOutline16(size);
				default: return IconCodeOutline16(size);
			}
		}
		function parsedArgsRaw(block) {
			const settled = block;
			if ("call" in settled && settled.call !== null && typeof settled.call.argsRaw === "string") return settled.call.argsRaw;
			const running = block;
			if (typeof running.argsRaw === "string") return running.argsRaw;
			return "";
		}
		function parseArgs(block) {
			const raw = parsedArgsRaw(block);
			if (raw === "") return null;
			try {
				const v = JSON.parse(raw);
				return typeof v === "object" && v !== null && !Array.isArray(v) ? v : null;
			} catch {
				return null;
			}
		}
		function cleanString(val) {
			if (typeof val !== "string") return "";
			let s = val.trim();
			if (s.startsWith("\"") && s.endsWith("\"") || s.startsWith("'") && s.endsWith("'")) s = s.slice(1, -1).trim();
			return s;
		}
		function parseInnerArgs(raw) {
			if (raw === void 0 || raw === null) return {};
			if (typeof raw === "object" && !Array.isArray(raw)) return raw;
			if (typeof raw === "string") {
				let s = raw.trim();
				if (s.startsWith("\"") && s.endsWith("\"") || s.startsWith("'") && s.endsWith("'")) try {
					const unquoted = JSON.parse(s);
					if (typeof unquoted === "string") s = unquoted.trim();
				} catch {}
				try {
					const parsed = JSON.parse(s);
					if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) return parsed;
					return { value: parsed };
				} catch {
					return { value: raw };
				}
			}
			return { value: raw };
		}
		function cleanResultText(text) {
			const trimmed = text.trim();
			if (trimmed.startsWith("{") && trimmed.endsWith("}")) try {
				const obj = JSON.parse(trimmed);
				if (Array.isArray(obj?.content)) {
					const parts = [];
					for (const item of obj.content) {
						const blk = item;
						if (blk?.type === "text" && typeof blk.text === "string") parts.push(blk.text);
					}
					if (parts.length > 0) return parts.join("\n");
				}
			} catch {}
			return text;
		}
		function mirrorInfo(block) {
			const a = parseArgs(block);
			if (a === null) return null;
			let tool = typeof a.tool === "string" ? a.tool : "";
			if (tool === "") return null;
			let input = {};
			const raw = a.input;
			if (typeof raw === "object" && raw !== null && !Array.isArray(raw)) input = raw;
			else if (typeof raw === "string") try {
				const p = JSON.parse(raw);
				if (typeof p === "object" && p !== null && !Array.isArray(p)) input = p;
				else input = { value: raw };
			} catch {
				input = { value: raw };
			}
			let server = typeof a.server === "string" && a.server !== "" ? cleanString(a.server) : void 0;
			if (/^(call_mcp_tool|callMcpTool|call_mcp|mcp_call)$/i.test(tool)) {
				const s = pick(input, "ServerName", "server_name", "serverName", "server");
				if (s) server = cleanString(s);
				const innerTool = pick(input, "ToolName", "tool_name", "toolName", "name", "tool");
				const rawInner = input.Arguments ?? input.arguments ?? input.args ?? input.parameters ?? input.params ?? input.input;
				if (innerTool) {
					tool = cleanString(innerTool);
					input = parseInnerArgs(rawInner);
				}
			} else if (tool.startsWith("mcp__")) {
				const parts = tool.slice(5).split("__");
				if (parts.length >= 2) {
					server = parts[0];
					tool = parts.slice(1).join("__");
				}
			}
			return {
				tool,
				input,
				...server ? { server } : {}
			};
		}
		function pick(input, ...keys) {
			for (const k of keys) {
				const v = input[k];
				if (typeof v === "string" && v !== "") return v;
			}
		}
		function num(input, ...keys) {
			for (const k of keys) {
				const v = input[k];
				if (typeof v === "number" && Number.isFinite(v)) return v;
			}
		}
		function resultText(block) {
			const settled = block;
			if (!Array.isArray(settled.content)) return "";
			const parts = [];
			for (const b of settled.content) if (b && typeof b === "object" && b.type === "text" && typeof b.text === "string") parts.push(b.text);
			return cleanResultText(parts.join("\n"));
		}
		function isSettled(block) {
			return block.kind === "tool-result" || "content" in block;
		}
		function isError(block) {
			const settled = block;
			return settled.isError === true || settled.error !== void 0 && settled.error !== null;
		}
		const TERMINAL_TOOLS = /* @__PURE__ */ new Set([
			"run_command",
			"bash",
			"execute_command",
			"ops_bash",
			"sh",
			"shell"
		]);
		const DIFF_TOOLS = /* @__PURE__ */ new Set([
			"replace_file_content",
			"edit_file",
			"replace_in_file",
			"edit",
			"write_to_file",
			"write_file",
			"create_file"
		]);
		const READ_TOOLS = /* @__PURE__ */ new Set([
			"read_file",
			"view_file",
			"read",
			"open_file"
		]);
		const SEARCH_TOOLS = /* @__PURE__ */ new Set([
			"find_by_name",
			"glob",
			"ops_glob",
			"search_files",
			"grep_search",
			"search",
			"ops_grep",
			"search_file_content",
			"grep",
			"search_web",
			"web_search"
		]);
		const LIST_TOOLS = /* @__PURE__ */ new Set(["list_dir", "ls"]);
		const DELETE_TOOLS = /* @__PURE__ */ new Set([
			"delete_file",
			"remove_file",
			"rm"
		]);
		const QUESTION_TOOLS = /* @__PURE__ */ new Set([
			"ask_question",
			"ask",
			"question"
		]);
		const IMAGE_TOOLS = /* @__PURE__ */ new Set([
			"generate_image",
			"create_image",
			"render_image"
		]);
		function mirrorCardModel(block, cwd, home) {
			const info = mirrorInfo(block);
			const out = resultText(block);
			if (info === null) return {
				kind: "generic",
				title: "agy_tool",
				output: out,
				raw: parsedArgsRaw(block)
			};
			const { tool, input } = info;
			const desc = pick(input, "Description", "description", "toolAction", "toolSummary", "Instruction", "instruction");
			if (QUESTION_TOOLS.has(tool)) {
				const questionsRaw = input.questions ?? input.Questions;
				const questions = Array.isArray(questionsRaw) ? questionsRaw : [];
				const qTitle = questions[0]?.question ?? desc ?? "Ask Question";
				return {
					kind: "question",
					tool,
					server: info.server,
					title: qTitle,
					output: out,
					questions,
					raw: parsedArgsRaw(block)
				};
			}
			if (IMAGE_TOOLS.has(tool)) {
				const prompt = pick(input, "Prompt", "prompt") ?? "";
				const name = pick(input, "ImageName", "image_name", "name") ?? "image";
				const ratio = pick(input, "AspectRatio", "aspect_ratio") ?? "1:1";
				return {
					kind: "image",
					tool,
					server: info.server,
					title: desc ?? `Generate Image · ${name}`,
					prompt,
					imageName: name,
					aspectRatio: ratio,
					output: out,
					raw: parsedArgsRaw(block)
				};
			}
			if (TERMINAL_TOOLS.has(tool)) {
				const command = pick(input, "CommandLine", "command_line", "command", "cmd", "Cmd") ?? (desc && desc.startsWith("$ ") ? desc.replace(/\s*·\s*.*$/, "").replace(/^\$\s*/, "") : void 0) ?? JSON.stringify(input);
				const cwdVal = pick(input, "Cwd", "cwd", "WorkingDirectory", "working_directory", "workdir", "WorkDir") ?? cwd;
				const rowTitle = desc !== void 0 && !desc.startsWith("$ ") && desc !== command ? desc + " · " + command : command;
				return {
					kind: "terminal",
					tool,
					server: info.server,
					title: rowTitle,
					command,
					...cwdVal !== void 0 ? { cwd: cwdVal } : {},
					output: out
				};
			}
			if (DIFF_TOOLS.has(tool)) {
				const rawPath = pick(input, "TargetFile", "target_file", "path", "file_path", "Path", "FilePath", "AbsolutePath", "targetFile", "filename", "FileName") ?? "file";
				const path = relativize(rawPath, cwd, home);
				const oldText = pick(input, "TargetContent", "target_content", "old_string", "oldText", "OldString", "OldText", "targetContent") ?? null;
				const newText = pick(input, "ReplacementContent", "replacement_content", "new_string", "newText", "content", "NewString", "NewText", "Content", "replacementContent", "CodeContent", "code_content", "contents", "FileContents", "codeContent") ?? "";
				const action = tool === "write_to_file" || tool === "write_file" || tool === "create_file" ? "Write" : "Edit";
				const isGenericDesc = desc !== void 0 && /^(file edit|editing file|write file|writing file|file write|edit file|editing|writing|file create|creating file)$/i.test(desc.trim());
				const title = desc !== void 0 && !isGenericDesc && !desc.includes(path) ? `${action} ${path} · ${desc}` : `${action} ${path}`;
				return {
					kind: "diff",
					tool,
					server: info.server,
					title,
					path: rawPath,
					oldText,
					newText,
					output: out
				};
			}
			if (READ_TOOLS.has(tool)) {
				const path = pick(input, "AbsolutePath", "absolute_path", "TargetFile", "target_file", "path", "file_path", "filename", "Path", "FilePath", "FileName", "targetFile") ?? "";
				const offset = num(input, "offset", "Offset") ?? num(input, "StartLine", "start_line");
				const line = offset !== void 0 ? offset > 0 && (tool === "view_file" || tool === "read_file") ? offset : offset + 1 : void 0;
				const isImg = isImageFile(path);
				return {
					kind: isImg ? "image" : "read",
					tool,
					server: info.server,
					title: desc ? `${desc} · ${path}` : path !== "" ? "Read " + path : "Read",
					path,
					output: out,
					isImage: isImg,
					imagePath: isImg ? path : void 0,
					prompt: desc,
					imageName: path.split(/[/\\]/).pop() || "image",
					...path !== "" ? { location: {
						path,
						...line !== void 0 ? { line } : {}
					} } : {}
				};
			}
			if (SEARCH_TOOLS.has(tool)) {
				const rawPat = input.query ?? input.Query ?? input.pattern ?? input.Pattern ?? input.regex ?? input.Regex ?? input.QueryString;
				const q = Array.isArray(rawPat) ? rawPat.join(", ") : typeof rawPat === "string" ? rawPat : pick(input, "query", "Query", "pattern", "Pattern", "regex", "Regex", "QueryString") ?? "";
				return {
					kind: "search",
					tool,
					server: info.server,
					title: desc ?? (q !== "" ? "Search " + q : "Search"),
					output: out
				};
			}
			if (LIST_TOOLS.has(tool)) {
				const path = pick(input, "DirectoryPath", "directory_path", "path", "directory", "Path", "Directory", "SearchDirectory", "search_directory", "AbsolutePath") ?? "";
				return {
					kind: "list",
					tool,
					server: info.server,
					title: desc ?? (path !== "" ? "List " + path : "List directory"),
					output: out
				};
			}
			if (DELETE_TOOLS.has(tool)) {
				const path = pick(input, "TargetFile", "target_file", "path", "file_path", "Path", "FilePath", "AbsolutePath") ?? "";
				return {
					kind: "delete",
					tool,
					server: info.server,
					title: desc ?? "Delete " + path,
					output: out
				};
			}
			const defaultTitle = info.server ? `${info.server}: ${tool}` : tool !== "" ? tool : "agy_tool";
			const title = desc ?? defaultTitle;
			return {
				kind: "generic",
				tool,
				server: info.server,
				title,
				output: out,
				raw: parsedArgsRaw(block)
			};
		}
		function relativize(p, cwd, home) {
			if (cwd && p.startsWith(cwd)) {
				const rel = p.slice(cwd.length).replace(/^[/\\]+/, "");
				return rel !== "" ? rel : p;
			}
			if (home && p.startsWith(home)) return "~" + p.slice(home.length);
			return p;
		}
		function clip(s, max) {
			return s.length > max ? s.slice(0, max) + "\n… (+" + (s.length - max) + " chars)" : s;
		}
		function trimTrailingBlankLines(s) {
			return s.replace(/[\t ]*\r?\n[\t ]*(\r?\n[\t ]*)*$/, "\n");
		}
		function previewLine(model, cwd, home) {
			if (model.kind === "diff") {
				const rel = relativize(model.path ?? "file", cwd, home);
				const display = rel.length > 40 ? "…" + rel.slice(-40) : rel;
				return model.oldText != null ? `± ${display}` : `+ ${display}`;
			}
			const out = model.output;
			if (out !== void 0 && out !== "") {
				const first = out.split("\n").find((l) => l.trim() !== "");
				if (first !== void 0 && first.trim() !== "") return first.trim().slice(0, 80);
			}
		}
		function cls(...names) {
			return names.filter((n) => typeof n === "string" && n !== "").join(" ");
		}
		/**
		* Locale lookup with an English fallback: the mirror card renders through
		* host-provided `t` when the registration declares the namespace, but tests
		* and hosts without the seat call it bare. The old literals were mixed
		* 中文 and English as BOTH fallback and primary, so non-Chinese users saw
		* Chinese buttons on mirror cards.
		*/
		function tr(t, key, fallback, params) {
			if (typeof t === "function") try {
				const v = t(key, params);
				if (typeof v === "string" && v !== "" && v !== key) return v;
			} catch {}
			if (params !== void 0 && params.count !== void 0 && fallback.includes("{count}")) return fallback.replace("{count}", String(params.count));
			return fallback;
		}
		function displayTitle(model, t) {
			switch (model.kind) {
				case "terminal": return tr(t, "tv.command", "Command");
				case "diff": return model.tool === "write_to_file" || model.tool === "write_file" || model.tool === "create_file" ? tr(t, "tv.write", "Write") : tr(t, "tv.edit", "Edit");
				case "read": return tr(t, "tv.read", "Read");
				case "search": return model.tool === "search_web" || model.tool === "web_search" ? tr(t, "tv.webSearch", "Web Search") : tr(t, "tv.search", "Search");
				case "list": return tr(t, "tv.list", "List");
				case "delete": return tr(t, "tv.delete", "Delete");
				case "question": return tr(t, "tv.question", "Question");
				case "image": return tr(t, "tv.image", "Image");
				default:
					if (model.tool && model.tool !== "agy_tool") return model.server ? `${model.server}: ${model.tool}` : model.tool.replace(/_/g, " ");
					return tr(t, "tv.tool", "Tool");
			}
		}
		function displaySummary(model, cwd, home) {
			if (model.kind === "terminal") return model.command ?? model.title;
			if (model.kind === "diff") return relativize(model.path ?? "file", cwd, home);
			if (model.kind === "read") {
				const rawPath = model.path ?? "";
				return rawPath !== "" ? relativize(rawPath, cwd, home) : model.title;
			}
			if (model.kind === "search") return model.title.replace(/^(Web search|Search)\s*/i, "") || model.title;
			if (model.kind === "list") return model.title.replace(/^List\s*(directory\s*)?/i, "") || model.title;
			if (model.kind === "question") return model.title;
			if (model.kind === "image") return model.prompt || model.title;
			if (model.server && model.title.startsWith(`${model.server}: `)) return model.title.slice(model.server.length + 2);
			return model.title;
		}
		function diffStat(model) {
			if (model.kind !== "diff") return null;
			const oldText = model.oldText ?? "";
			const newText = model.newText ?? "";
			const oldLines = oldText === "" ? 0 : oldText.split("\n").length;
			const newLines = newText === "" ? 0 : newText.split("\n").length;
			if (oldLines === 0 && newLines === 0) return null;
			if (oldLines === 0) return `+${newLines}`;
			return `+${newLines} -${oldLines}`;
		}
		function CopyButton({ text, labels, t }) {
			const [copied, setCopied] = react$1().useState(false);
			const copyLabel = labels?.[0] ?? tr(t, "code.copy", "Copy");
			const copiedLabel = labels?.[1] ?? tr(t, "code.copied", "Copied");
			const onCopy = (e) => {
				e.stopPropagation();
				if (typeof navigator !== "undefined" && navigator.clipboard) navigator.clipboard.writeText(text).then(() => {
					setCopied(true);
					setTimeout(() => setCopied(false), 1500);
				}).catch(() => {
					setCopied(false);
				});
			};
			return hx("button", {
				type: "button",
				className: "agy-tv-copy-btn",
				onClick: onCopy,
				title: copied ? copiedLabel : copyLabel
			}, copied ? IconCheckOutline14(11) : IconCopyOutline16(11), hx("span", null, copied ? copiedLabel : copyLabel));
		}
		/** Per-side render cap: a 5000-line write_to_file used to build 10k DOM rows
		*  inside a max-height:280px pane (99% of them invisible). */
		const DIFF_MAX_LINES = 400;
		function DiffBody({ model, t }) {
			const h = hx;
			const oldText = model.oldText ?? "";
			const newText = model.newText ?? "";
			const rows = [];
			const moreRow = (count, key) => h("div", {
				key,
				className: "agy-tv-diff-line",
				style: { color: "var(--dsw-alias-label-tertiary)" }
			}, tr(t, "tv.diffMore", "… {count} more lines not rendered", { count }));
			if (oldText !== "") {
				const lines = oldText.split("\n");
				const shown = Math.min(lines.length, DIFF_MAX_LINES);
				for (let i = 0; i < shown; i++) {
					const line = lines[i];
					rows.push(h("div", {
						key: "del-" + i,
						className: "agy-tv-diff-line agy-tv-diff-del"
					}, h("span", { className: "agy-tv-diff-marker" }, "-"), h("span", { style: { flex: 1 } }, line === "" ? " " : line)));
				}
				if (lines.length > shown) rows.push(moreRow(lines.length - shown, "del-more"));
			}
			if (newText !== "") {
				const lines = newText.split("\n");
				const shown = Math.min(lines.length, DIFF_MAX_LINES);
				for (let i = 0; i < shown; i++) {
					const line = lines[i];
					rows.push(h("div", {
						key: "add-" + i,
						className: "agy-tv-diff-line agy-tv-diff-add"
					}, h("span", { className: "agy-tv-diff-marker" }, "+"), h("span", { style: { flex: 1 } }, line === "" ? " " : line)));
				}
				if (lines.length > shown) rows.push(moreRow(lines.length - shown, "add-more"));
			}
			if (rows.length === 0) rows.push(h("div", {
				key: "empty",
				className: "agy-tv-diff-line",
				style: { color: "var(--dsw-alias-label-tertiary)" }
			}, tr(t, "tv.noChanges", "(no textual changes)")));
			return h("div", { className: "agy-tv-diff-list" }, ...rows);
		}
		function QuestionCardBody({ model }) {
			const h = hx;
			const questions = model.questions ?? [];
			const [selectedMap, setSelectedMap] = react$1().useState({});
			const [inserted, setInserted] = react$1().useState(false);
			const toggleOption = (qIdx, opt, isMulti) => {
				setSelectedMap((prev) => {
					const next = { ...prev };
					const current = new Set(next[qIdx] ?? []);
					if (isMulti) {
						if (current.has(opt)) current.delete(opt);
						else current.add(opt);
					} else {
						current.clear();
						current.add(opt);
					}
					next[qIdx] = current;
					return next;
				});
			};
			const onInsert = () => {
				const parts = [];
				for (let i = 0; i < questions.length; i++) {
					const sel = Array.from(selectedMap[i] ?? []);
					if (sel.length > 0) parts.push(sel.join("; "));
				}
				if (parts.length > 0) {
					insertTextIntoChatComposer(parts.join("\n"));
					setInserted(true);
					setTimeout(() => setInserted(false), 1500);
				}
			};
			const qNodes = [];
			for (let i = 0; i < questions.length; i++) {
				const q = questions[i];
				if (!q) continue;
				const options = q.options ?? [];
				const isMulti = q.is_multi_select === true;
				const sel = selectedMap[i] ?? /* @__PURE__ */ new Set();
				const optNodes = options.map((opt, oIdx) => {
					const isChecked = sel.has(opt);
					return h("button", {
						key: "opt-" + oIdx,
						type: "button",
						className: cls("agy-tv-q-opt", isChecked && "selected"),
						onClick: (e) => {
							e.stopPropagation();
							toggleOption(i, opt, isMulti);
						}
					}, h("span", { className: cls("agy-tv-q-check", isMulti ? "checkbox" : "radio", isChecked && "checked") }), h("span", { className: "agy-tv-q-opt-text" }, opt));
				});
				qNodes.push(h("div", {
					key: "q-" + i,
					className: "agy-tv-q-item"
				}, h("div", { className: "agy-tv-q-prompt" }, q.question || "Please select:"), h("div", { className: "agy-tv-q-opts" }, ...optNodes)));
			}
			const hasSelection = Object.values(selectedMap).some((s) => s.size > 0);
			return h("div", { className: "agy-tv-question-wrap" }, ...qNodes, h("div", { className: "agy-tv-q-footer" }, h("button", {
				type: "button",
				className: cls("agy-tv-q-insert-btn", hasSelection && "active"),
				disabled: !hasSelection,
				onClick: (e) => {
					e.stopPropagation();
					onInsert();
				}
			}, inserted ? "✓ 已填入对话框" : "💬 填入对话框 / Insert into Chat"), model.output ? h("div", { className: "agy-tv-q-answered" }, `已记录: ${model.output}`) : null));
		}
		function ImageCardBody({ model }) {
			const h = hx;
			const prompt = model.prompt || "";
			const name = model.imageName || "image";
			const ratio = model.aspectRatio || "1:1";
			const path = model.imagePath || model.path || "";
			const mediaUrl = path ? buildMediaUrl(path) : null;
			return h("div", { className: "agy-tv-img-wrap" }, h("div", { className: "agy-tv-img-meta" }, h("div", {
				className: "agy-tv-img-prompt",
				title: prompt || name
			}, prompt ? `"${prompt}"` : name), h("div", { className: "agy-tv-img-badges" }, h("span", { className: "agy-tv-img-badge" }, ratio), ...path ? [h("span", {
				key: "path",
				className: "agy-tv-img-badge",
				title: path
			}, path.split(/[/\\]/).pop())] : [])), mediaUrl ? h("div", {
				className: "agy-tv-img-preview-box",
				onClick: (e) => {
					e.stopPropagation();
					openLightbox(mediaUrl, prompt || name, path);
				},
				title: "点击放大预览 / Click to open lightbox"
			}, h("img", {
				className: "agy-tv-img-thumb",
				src: mediaUrl,
				alt: prompt || name,
				loading: "lazy"
			})) : null);
		}
		function CardBody({ model, openFile, cwd, home, inspect, t }) {
			const h = hx;
			const inspectNode = inspect !== void 0 ? h("div", {
				key: "ins",
				style: { padding: "4px 8px 6px" }
			}, h("button", {
				type: "button",
				className: "agy-tv-inspect-btn",
				onClick: inspect
			}, IconInspectOutline12(12), tr(t, "code.inspect", "Inspect"))) : null;
			switch (model.kind) {
				case "terminal": {
					const rawBody = model.output !== void 0 && model.output !== "" ? trimTrailingBlankLines(model.output) : tr(t, "tv.noOutput", "(no output)");
					const copyText = model.output !== void 0 && model.output !== "" ? model.output : model.command ?? "";
					return h("div", { className: "agy-tv-card" }, h("div", { className: "agy-tv-card-header" }, h("div", { className: "agy-tv-card-header-left" }, h("span", { className: "agy-tv-prompt-glyph" }, "❯"), ...model.cwd ? [h("span", {
						key: "cwd",
						className: "agy-tv-card-cwd"
					}, model.cwd)] : [], h("span", {
						className: "agy-tv-card-cmd",
						title: model.command
					}, model.command ?? "")), h(CopyButton, {
						text: copyText,
						t
					})), h("pre", { className: "agy-tv-card-content" }, clip(rawBody, 16e3)), inspectNode);
				}
				case "diff": {
					const pathLabel = relativize(model.path ?? "file", cwd, home);
					const stat = diffStat(model);
					const copyText = model.newText ?? "";
					return h("div", { className: "agy-tv-card" }, h("div", { className: "agy-tv-card-header" }, h("div", { className: "agy-tv-card-header-left" }, IconEditOutline16(13), h("span", { className: "agy-tv-card-path" }, pathLabel), ...stat ? [h("span", {
						key: "s",
						className: "agy-tv-diff-stat"
					}, stat)] : []), h(CopyButton, { text: copyText })), h(DiffBody, {
						model,
						openFile,
						cwd,
						home,
						t
					}), inspectNode);
				}
				case "read": {
					const pathLabel = relativize(model.path ?? "file", cwd, home);
					const rawBody = model.output !== void 0 && model.output !== "" ? trimTrailingBlankLines(model.output) : tr(t, "tv.noOutput", "(no output)");
					return h("div", { className: "agy-tv-card" }, h("div", { className: "agy-tv-card-header" }, h("div", { className: "agy-tv-card-header-left" }, IconBrowseOutline16(13), h("span", { className: "agy-tv-card-path" }, pathLabel)), h(CopyButton, {
						text: model.output ?? "",
						t
					})), h("pre", { className: "agy-tv-card-content" }, clip(rawBody, 16e3)), inspectNode);
				}
				case "search": {
					const rawBody = model.output !== void 0 && model.output !== "" ? trimTrailingBlankLines(model.output) : tr(t, "tv.noMatches", "(no matches)");
					return h("div", { className: "agy-tv-card" }, h("div", { className: "agy-tv-card-header" }, h("div", { className: "agy-tv-card-header-left" }, IconSearchOutline16(13), h("span", { className: "agy-tv-card-path" }, model.title)), h(CopyButton, {
						text: model.output ?? "",
						t
					})), h("pre", { className: "agy-tv-card-content" }, clip(rawBody, 16e3)), inspectNode);
				}
				case "list": {
					const rawBody = model.output !== void 0 && model.output !== "" ? trimTrailingBlankLines(model.output) : tr(t, "tv.emptyDir", "(empty directory)");
					return h("div", { className: "agy-tv-card" }, h("div", { className: "agy-tv-card-header" }, h("div", { className: "agy-tv-card-header-left" }, IconBrowseOutline16(13), h("span", { className: "agy-tv-card-path" }, model.title)), h(CopyButton, {
						text: model.output ?? "",
						t
					})), h("pre", { className: "agy-tv-card-content" }, clip(rawBody, 16e3)), inspectNode);
				}
				case "question": return h("div", { className: "agy-tv-card" }, h("div", { className: "agy-tv-card-header" }, h("div", { className: "agy-tv-card-header-left" }, IconQuestionOutline16(13), h("span", { className: "agy-tv-card-path" }, model.title)), h(CopyButton, { text: model.output ?? model.raw ?? "" })), h(QuestionCardBody, { model }), inspectNode);
				case "image": return h("div", { className: "agy-tv-card" }, h("div", { className: "agy-tv-card-header" }, h("div", { className: "agy-tv-card-header-left" }, IconImageOutline16(13), h("span", { className: "agy-tv-card-path" }, model.imageName || "Image")), h(CopyButton, { text: model.prompt || (model.raw ?? "") })), h(ImageCardBody, { model }), inspectNode);
				default: {
					const copyText = model.output !== void 0 && model.output !== "" ? model.output : model.raw ?? "";
					const rawBody = model.output !== void 0 && model.output !== "" ? trimTrailingBlankLines(model.output) : model.raw !== void 0 && model.raw !== "" ? clip(model.raw, 4e3) : tr(t, "tv.noDetail", "(no detail)");
					return h("div", { className: "agy-tv-card" }, h("div", { className: "agy-tv-card-header" }, h("div", { className: "agy-tv-card-header-left" }, IconCodeOutline16(13), h("span", { className: "agy-tv-card-path" }, model.server ? `${model.server}: ${model.tool}` : model.title || model.tool || "Tool")), h(CopyButton, {
						text: copyText,
						t
					})), h("pre", { className: "agy-tv-card-content" }, clip(rawBody, 16e3)), inspectNode);
				}
			}
		}
		function AgyMirrorToolView(props) {
			const h = hx;
			const { block, cwd, home, openFile, inspect, t, callId } = props;
			const settle = isSettled(block);
			const err = isError(block);
			const model = mirrorCardModel(block, cwd, home);
			const [open, setOpen] = useToggle(false, callId ? `call:${callId}` : `${model.kind}:${model.tool ?? ""}:${model.title}:${model.path ?? model.command ?? ""}`);
			const state = !settle ? "run" : err ? "err" : "ok";
			const title = displayTitle(model, t);
			const summary = displaySummary(model, cwd, home);
			const stat = diffStat(model);
			const preview = !open && model.kind !== "diff" ? previewLine(model, cwd, home) : void 0;
			const hasFileLink = (model.kind === "diff" || model.kind === "read") && model.path && openFile !== void 0;
			const onFileClick = (e) => {
				e.stopPropagation();
				if (model.path && openFile) {
					if (model.location?.line !== void 0) openFile(model.path, { line: model.location.line });
					else openFile(model.path);
				}
			};
			const leading = open ? h("span", { className: "agy-tv-chevron-open" }, IconChevronDownOutline14(14)) : h("span", { className: "agy-tv-leading" }, h("span", { className: "agy-tv-icon-idle" }, toolIconFor(model.kind, 14)), h("span", { className: "agy-tv-chevron-hover" }, IconChevronDownOutline14(14)));
			const summaryNode = hasFileLink ? h("button", {
				type: "button",
				className: "agy-tv-file-link",
				onClick: onFileClick,
				title: model.path
			}, summary) : h("span", {
				className: cls("agy-tv-summary", err && "agy-tv-summary-err"),
				title: summary
			}, summary);
			const header = h("div", {
				className: "agy-tv-row",
				role: "button",
				tabIndex: 0,
				"aria-expanded": open,
				onClick: (e) => {
					e.stopPropagation();
					setOpen();
				},
				onKeyDown: (e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						setOpen();
					}
				},
				title: inspect !== void 0 ? open ? tr(t, "tv.hint.collapseInspect", "Click to collapse · right-click to inspect") : tr(t, "tv.hint.expandInspect", "Click to expand · right-click to inspect") : open ? tr(t, "tv.hint.collapse", "Click to collapse") : tr(t, "tv.hint.expand", "Click to expand"),
				onContextMenu: inspect !== void 0 ? (e) => {
					e.preventDefault();
					inspect();
				} : void 0
			}, leading, h("span", { className: "agy-tv-title" }, title), h("span", {
				className: "agy-tv-sep",
				"aria-hidden": true
			}), summaryNode, ...stat !== null ? [h("span", {
				key: "stat",
				className: "agy-tv-diff-stat"
			}, stat)] : [], ...preview !== void 0 ? [h("span", {
				key: "prev",
				className: "agy-tv-preview",
				title: preview
			}, preview)] : []);
			return h("div", {
				className: cls("agy-tv-root", open && "agy-tv-open"),
				"data-state": state,
				"data-kind": model.kind
			}, header, ...open ? [h("div", {
				key: "wrap",
				className: "agy-tv-body-wrap"
			}, h(CardBody, {
				model,
				openFile,
				cwd,
				home,
				inspect,
				t
			}))] : []);
		}
		/** Extract the agy mirror cursor (and tool name) from a run_code program. */
		function parseAgyMirrorFromCode(argsRaw) {
			try {
				const parsed = JSON.parse(argsRaw);
				const code = typeof parsed?.code === "string" ? parsed.code : "";
				const m = /tools\['agy_tool'\]\((\{.*?"step":\d+\})\)/.exec(code);
				if (!m) return null;
				const v = JSON.parse(m[1]);
				if (typeof v.run !== "string" || typeof v.step !== "number") return null;
				const tm = /replay recorded agy tool step \d+ \(([^)]+)\)/.exec(code);
				return {
					run: v.run,
					step: v.step,
					tool: tm?.[1]
				};
			} catch {}
			return null;
		}
		/** Project a run_code program into the fields the code card renders. */
		function runCodeModel(block) {
			const raw = block !== void 0 ? parsedArgsRaw(block) : "{}";
			let code = raw;
			let description;
			try {
				const parsed = JSON.parse(raw);
				if (typeof parsed?.code === "string") code = parsed.code;
				if (typeof parsed?.description === "string" && parsed.description !== "") description = parsed.description;
			} catch {}
			const firstLine = code.split("\n").find((line) => line.trim() !== "");
			const title = description ?? (firstLine !== void 0 && firstLine.trim() !== "" ? firstLine.trim().slice(0, 120) : "run_code");
			return {
				code,
				title
			};
		}
		/**
		* Ordinary run_code toolview.
		*
		* The keyed `tool.call.toolview` registration for `run_code` REPLACES the
		* host's built-in code row rather than adding to it, so this branch owns the
		* icon, title, summary and expandable body for every non-mirror program. It
		* reuses the same styled vocabulary as the mirror card (`agy-tv-row` and
		* friends) so an ordinary Code Mode call reads exactly like a native tool row.
		*/
		function AgyCodeToolView(props) {
			const h = hx;
			const { block, inspect, t, callId } = props ?? {};
			const model = runCodeModel(block);
			const [open, setOpen] = useToggle(false, callId ? `call:${callId}` : `code:${model.title}`);
			const settle = block !== void 0 && isSettled(block);
			const err = block !== void 0 && isError(block);
			const state = !settle ? "run" : err ? "err" : "ok";
			const translate = (key) => typeof t === "function" ? t(key) : key;
			const leading = open ? h("span", { className: "agy-tv-chevron-open" }, IconChevronDownOutline14(14)) : h("span", { className: "agy-tv-leading" }, h("span", { className: "agy-tv-icon-idle" }, IconCodeOutline16(14)), h("span", { className: "agy-tv-chevron-hover" }, IconChevronDownOutline14(14)));
			const header = h("div", {
				className: "agy-tv-row",
				role: "button",
				tabIndex: 0,
				"aria-expanded": open,
				onClick: (e) => {
					e.stopPropagation();
					setOpen();
				},
				onKeyDown: (e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						setOpen();
					}
				},
				title: inspect !== void 0 ? open ? tr(t, "tv.hint.collapseInspect", "Click to collapse · right-click to inspect") : tr(t, "tv.hint.expandInspect", "Click to expand · right-click to inspect") : open ? tr(t, "tv.hint.collapse", "Click to collapse") : tr(t, "tv.hint.expand", "Click to expand"),
				onContextMenu: inspect !== void 0 ? (e) => {
					e.preventDefault();
					inspect();
				} : void 0
			}, leading, h("span", { className: "agy-tv-title" }, translate("code.title")), h("span", {
				className: "agy-tv-sep",
				"aria-hidden": true
			}), h("span", {
				className: cls("agy-tv-summary", err && "agy-tv-summary-err"),
				title: model.title
			}, model.title));
			const inspectNode = inspect !== void 0 ? h("div", {
				key: "ins",
				style: { padding: "4px 8px 6px" }
			}, h("button", {
				type: "button",
				className: "agy-tv-inspect-btn",
				onClick: inspect
			}, IconInspectOutline12(12), translate("code.inspect"))) : null;
			const body = h("div", { className: "agy-tv-card" }, h("div", { className: "agy-tv-card-header" }, h("div", { className: "agy-tv-card-header-left" }, IconCodeOutline16(13), h("span", { className: "agy-tv-card-path" }, model.title)), h(CopyButton, {
				text: model.code,
				labels: [translate("code.copy"), translate("code.copied")]
			})), h("pre", { className: "agy-tv-card-content" }, clip(model.code, 16e3)), inspectNode);
			return h("div", {
				className: cls("agy-tv-root", open && "agy-tv-open"),
				"data-state": state,
				"data-kind": "code"
			}, header, ...open ? [h("div", {
				key: "wrap",
				className: "agy-tv-body-wrap"
			}, body)] : []);
		}
		/**
		* run_code toolview: when the program is an agy mirror wrapper, render the
		* native Antigravity card instead of a raw code row; every other run_code
		* program renders through {@link AgyCodeToolView}.
		*/
		function AgyRunCodeToolView(props) {
			const typed = props;
			const block = typed?.block;
			const raw = block !== void 0 ? parsedArgsRaw(block) : "{}";
			const mirror = parseAgyMirrorFromCode(raw);
			if (mirror === null) return AgyCodeToolView(typed);
			let description;
			try {
				const parsed = JSON.parse(raw);
				if (typeof parsed?.description === "string" && parsed.description !== "") description = parsed.description;
			} catch {}
			return AgyMirrorToolView({
				block: {
					...block,
					call: {
						...block?.call ?? {},
						name: "agy_tool",
						argsRaw: JSON.stringify({
							run: mirror.run,
							step: mirror.step,
							...mirror.tool !== void 0 ? { tool: mirror.tool } : {},
							...description !== void 0 ? { input: { description } } : {}
						})
					}
				},
				t: typed?.t
			});
		}
		function installAgyToolView(ctx) {
			try {
				ctx.slots?.inject?.("tool.call.toolview", () => {
					const d1 = ctx.slots.register({
						name: "tool.call.toolview",
						key: "agy_tool",
						id: "agy-tool-view",
						label: "Antigravity tool",
						locale: NS
					}, AgyMirrorToolView);
					const d2 = ctx.slots.register({
						name: "tool.call.toolview",
						key: "run_code",
						id: "agy-run-code-view",
						label: "Antigravity (code mode)",
						locale: NS
					}, AgyRunCodeToolView);
					return () => {
						d2();
						d1();
					};
				});
			} catch (err) {
				console.warn("[dsh-agy-link] agy tool view slot registration failed:", err);
			}
		}
		const ROW_CSS = `
/* Container */
.agy-tv-root {
	display: flex;
	flex-direction: column;
	width: 100%;
	min-width: 0;
	position: relative;
	font-family: var(--dsw-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Microsoft YaHei", sans-serif);
	margin: 2px 0;
}

/* Collapsed Header Row */
.agy-tv-row {
	display: flex;
	align-items: center;
	height: calc(24px + var(--dsh-content-font-delta, 0px));
	min-width: 0;
	position: relative;
	overflow: hidden;
	cursor: pointer;
	user-select: none;
	background: transparent;
	border: none;
	padding: 0;
	width: 100%;
	text-align: left;
	color: var(--dsw-alias-label-primary, #0f172a);
}

/* Running sweep shimmer animation */
.agy-tv-root[data-state="run"] .agy-tv-row:after {
	content: "";
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	width: 300px;
	background: linear-gradient(90deg, transparent 0%, color-mix(in srgb, var(--dsw-alias-bg-base, #ffffff) 60%, transparent) 55%, transparent 100%);
	pointer-events: none;
	animation: 2.6s ease-out infinite agy-tv-sweep;
}
@keyframes agy-tv-sweep {
	0% { left: -300px; }
	90%, 100% { left: 100%; }
}

/* Leading Icon with Hover-to-Arrow transition */
.agy-tv-leading {
	position: relative;
	flex: none;
	width: calc(16px + var(--dsh-content-font-delta, 0px));
	height: calc(16px + var(--dsh-content-font-delta, 0px));
	display: inline-flex;
	align-items: center;
	justify-content: center;
	margin-right: 6px;
	color: var(--dsw-alias-label-tertiary, #64748b);
}
.agy-tv-leading svg {
	width: calc(14px + var(--dsh-content-font-delta, 0px));
	height: calc(14px + var(--dsh-content-font-delta, 0px));
}
.agy-tv-icon-idle {
	display: inline-flex;
	opacity: 1;
	transition: opacity 0.1s ease;
}
.agy-tv-chevron-hover {
	position: absolute;
	inset: 0;
	margin: auto;
	opacity: 0;
	transition: opacity 0.1s ease;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	color: var(--dsw-alias-label-secondary, #334155);
}
.agy-tv-row:hover .agy-tv-icon-idle {
	opacity: 0;
}
.agy-tv-row:hover .agy-tv-chevron-hover {
	opacity: 1;
}
.agy-tv-chevron-open {
	position: relative;
	flex: none;
	width: calc(16px + var(--dsh-content-font-delta, 0px));
	height: calc(16px + var(--dsh-content-font-delta, 0px));
	display: inline-flex;
	align-items: center;
	justify-content: center;
	margin-right: 6px;
	color: var(--dsw-alias-label-secondary, #334155);
}
.agy-tv-chevron-open svg {
	width: calc(14px + var(--dsh-content-font-delta, 0px));
	height: calc(14px + var(--dsh-content-font-delta, 0px));
}

/* Title */
.agy-tv-title {
	flex: none;
	font-size: var(--dsh-content-font-size-secondary, 13px);
	line-height: calc(24px + var(--dsh-content-font-delta, 0px));
	color: var(--dsw-alias-label-secondary, #334155);
	font-weight: 400;
}

/* Dot separator */
.agy-tv-sep {
	background: var(--dsw-alias-label-caption, #94a3b8);
	border-radius: 1px;
	flex: none;
	width: 2px;
	height: 2px;
	margin: 0 8px;
}

/* Summary */
.agy-tv-summary {
	text-overflow: ellipsis;
	white-space: nowrap;
	min-width: 0;
	font-size: var(--dsh-content-font-size-secondary, 13px);
	line-height: calc(24px + var(--dsh-content-font-delta, 0px));
	color: var(--dsw-alias-label-tertiary, #64748b);
	flex: auto;
	overflow: hidden;
}
.agy-tv-summary-err {
	color: var(--dsw-alias-state-error-primary, #dc2626);
}

/* File link button */
.agy-tv-file-link {
	text-overflow: ellipsis;
	white-space: nowrap;
	min-width: 0;
	font: inherit;
	text-align: left;
	font-size: var(--dsh-content-font-size-secondary, 13px);
	line-height: calc(24px + var(--dsh-content-font-delta, 0px));
	color: var(--dsw-alias-label-secondary, #334155);
	text-decoration: underline dotted;
	text-decoration-color: var(--dsw-alias-label-tertiary, #64748b);
	text-underline-offset: 3px;
	cursor: pointer;
	background: none;
	border: none;
	flex: 0 auto;
	margin: 0;
	padding: 0;
	text-decoration-thickness: 1px;
	overflow: hidden;
}
.agy-tv-file-link:hover {
	color: var(--dsw-alias-label-primary, #0f172a);
	text-decoration-color: currentColor;
}

/* Diff stat badge (+10 -2) */
.agy-tv-diff-stat {
	font-family: var(--ds-font-family-code, ui-monospace, monospace);
	font-size: calc(var(--dsh-content-font-size-secondary, 13px) - 2px);
	color: var(--dsw-alias-label-caption, #94a3b8);
	margin-left: 10px;
	flex: none;
}

/* Preview text */
.agy-tv-preview {
	font-family: var(--ds-font-family-code, ui-monospace, monospace);
	font-size: 11px;
	color: var(--dsw-alias-label-caption, #94a3b8);
	margin-left: 8px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	max-width: 35%;
	flex: none;
}

/* Body wrap */
.agy-tv-body-wrap {
	display: flex;
	flex-direction: column;
}

/* Card container */
.agy-tv-card {
	border: 0.5px solid var(--dsw-alias-border-l1, #e2e8f0);
	background: var(--dsw-alias-markdown-code-block, #f8fafc);
	font-family: var(--ds-font-family-code, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
	font-size: 12px;
	line-height: 1.55;
	border-radius: 12px;
	margin: 4px 0 4px 4px;
	display: flex;
	flex-direction: column;
	overflow: hidden;
}

/* Card Header */
.agy-tv-card-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 12px;
	padding: 8px 12px;
	background: var(--dsw-alias-markdown-code-block-banner, rgba(0, 0, 0, 0.02));
	border-bottom: 0.5px solid var(--dsw-alias-border-l2, #e2e8f0);
}
.agy-tv-card-header-left {
	display: flex;
	align-items: baseline;
	gap: 8px;
	min-width: 0;
	flex: 1;
	overflow: hidden;
}
.agy-tv-prompt-glyph {
	color: var(--dsw-alias-label-caption, #94a3b8);
	flex: none;
	font-weight: 700;
}
.agy-tv-card-cwd {
	color: var(--dsw-alias-label-tertiary, #64748b);
	flex: none;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.agy-tv-card-cmd {
	color: var(--dsw-alias-label-primary, #0f172a);
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: pre;
	font-weight: 600;
}
.agy-tv-card-path {
	color: var(--dsw-alias-label-primary, #0f172a);
	font-weight: 600;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

/* Copy button */
.agy-tv-copy-btn {
	display: inline-flex;
	align-items: center;
	gap: 4px;
	background: transparent;
	border: none;
	padding: 2px 6px;
	margin: 0;
	color: var(--dsw-alias-label-secondary, #334155);
	cursor: pointer;
	font-size: 11px;
	line-height: 16px;
	border-radius: 4px;
	transition: background-color 0.1s ease, color 0.1s ease;
	flex: none;
}
.agy-tv-copy-btn:hover {
	background: var(--dsw-alias-interactive-bg-hover, rgba(0, 0, 0, 0.05));
	color: var(--dsw-alias-label-primary, #0f172a);
}

/* Card scrollable content */
.agy-tv-card-content {
	max-height: 260px;
	overflow-y: auto;
	overflow-x: auto;
	padding: 10px 14px;
	white-space: pre-wrap;
	word-break: break-word;
	color: var(--dsw-alias-label-secondary, #334155);
	scrollbar-width: thin;
	scrollbar-color: var(--dsw-alias-border-l3, rgba(0, 0, 0, 0.2)) transparent;
}
.agy-tv-card-content::-webkit-scrollbar {
	width: 6px;
	height: 6px;
}
.agy-tv-card-content::-webkit-scrollbar-thumb {
	background: var(--dsw-alias-border-l3, rgba(0, 0, 0, 0.18));
	border-radius: 6px;
	background-clip: padding-box;
}
.agy-tv-card-content::-webkit-scrollbar-track {
	background: transparent;
	margin: 6px 0;
}

/* Diff lines */
.agy-tv-diff-list {
	display: flex;
	flex-direction: column;
	padding: 6px 0;
	max-height: 280px;
	overflow-y: auto;
	overflow-x: auto;
	scrollbar-width: thin;
	scrollbar-color: var(--dsw-alias-border-l3, rgba(0, 0, 0, 0.2)) transparent;
}
.agy-tv-diff-list::-webkit-scrollbar {
	width: 6px;
	height: 6px;
}
.agy-tv-diff-list::-webkit-scrollbar-thumb {
	background: var(--dsw-alias-border-l3, rgba(0, 0, 0, 0.18));
	border-radius: 6px;
}
.agy-tv-diff-list::-webkit-scrollbar-track {
	background: transparent;
	margin: 4px 0;
}
.agy-tv-diff-line {
	display: flex;
	gap: 8px;
	padding: 0 12px;
	min-height: 20px;
	line-height: 20px;
	white-space: pre-wrap;
	word-break: break-word;
}
.agy-tv-diff-del {
	background: color-mix(in srgb, var(--dsw-alias-state-error-primary, #dc2626) 10%, transparent);
	color: var(--dsw-alias-state-error-primary, #dc2626);
}
.agy-tv-diff-add {
	background: color-mix(in srgb, var(--dsw-alias-state-success-primary, #059669) 10%, transparent);
	color: var(--dsw-alias-state-success-primary, #059669);
}
.agy-tv-diff-marker {
	flex: none;
	width: 14px;
	font-weight: 700;
	user-select: none;
}

/* Inspect button */
.agy-tv-inspect-btn {
	border: 0.5px solid var(--dsw-alias-border-l3, #cbd5e1);
	background: var(--dsw-alias-bg-base, #ffffff);
	color: var(--dsw-alias-label-secondary, #334155);
	cursor: pointer;
	opacity: 0;
	border-radius: 999px;
	align-self: flex-start;
	align-items: center;
	gap: 4px;
	margin: 4px 0 2px 4px;
	padding: 2px 8px;
	font-size: 11px;
	line-height: 16px;
	transition: opacity 0.1s;
	display: inline-flex;
}
.agy-tv-root:hover .agy-tv-inspect-btn,
.agy-tv-inspect-btn:focus-visible {
	opacity: 1;
}
.agy-tv-inspect-btn:hover {
	background: var(--dsw-alias-interactive-bg-hover-solid, #f1f5f9);
	color: var(--dsw-alias-label-primary, #0f172a);
}

/* Question Card Styles */
.agy-tv-question-wrap {
	padding: 10px 14px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	font-family: inherit;
}
.agy-tv-q-item {
	display: flex;
	flex-direction: column;
	gap: 6px;
}
.agy-tv-q-prompt {
	font-size: 13px;
	font-weight: 600;
	color: var(--dsw-alias-label-primary, #0f172a);
}
.agy-tv-q-opts {
	display: flex;
	flex-direction: column;
	gap: 6px;
}
.agy-tv-q-opt {
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 6px 10px;
	border-radius: 6px;
	background: var(--dsw-alias-bg-l2, rgba(127, 127, 127, 0.08));
	border: 1px solid var(--dsw-alias-border-l2, rgba(127, 127, 127, 0.2));
	color: var(--dsw-alias-label-primary, #334155);
	cursor: pointer;
	text-align: left;
	font-size: 12.5px;
	transition: all 0.15s ease;
}
.agy-tv-q-opt:hover {
	background: var(--dsw-alias-bg-hover, rgba(127, 127, 127, 0.15));
	border-color: var(--dsw-alias-border-l3, rgba(127, 127, 127, 0.35));
}
.agy-tv-q-opt.selected {
	background: rgba(16, 185, 129, 0.12);
	border-color: #10b981;
	color: #10b981;
}
.agy-tv-q-check {
	width: 14px;
	height: 14px;
	border: 1.5px solid currentColor;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}
.agy-tv-q-check.radio {
	border-radius: 50%;
}
.agy-tv-q-check.checkbox {
	border-radius: 3px;
}
.agy-tv-q-check.checked:after {
	content: "";
	width: 6px;
	height: 6px;
	background: currentColor;
	border-radius: inherit;
}
.agy-tv-q-footer {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-top: 6px;
	border-top: 1px solid var(--dsw-alias-border-l2, rgba(127, 127, 127, 0.15));
}
.agy-tv-q-insert-btn {
	padding: 5px 12px;
	border-radius: 6px;
	font-size: 12px;
	font-weight: 600;
	background: rgba(16, 185, 129, 0.15);
	border: 1px solid #10b981;
	color: #10b981;
	cursor: pointer;
	transition: all 0.15s ease;
}
.agy-tv-q-insert-btn:disabled {
	opacity: 0.4;
	cursor: not-allowed;
}
.agy-tv-q-insert-btn:not(:disabled):hover {
	background: #10b981;
	color: #fff;
}
.agy-tv-q-answered {
	font-size: 11px;
	color: var(--dsw-alias-label-tertiary, #888);
}

/* Image Card Styles */
.agy-tv-img-wrap {
	padding: 10px 14px;
	display: flex;
	flex-direction: column;
	gap: 8px;
}
.agy-tv-img-meta {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 8px;
}
.agy-tv-img-prompt {
	font-size: 12.5px;
	color: var(--dsw-alias-label-primary, #334155);
	font-style: italic;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.agy-tv-img-badges {
	display: flex;
	gap: 4px;
	flex-shrink: 0;
}
.agy-tv-img-badge {
	font-size: 11px;
	padding: 1px 6px;
	border-radius: 4px;
	background: var(--dsw-alias-bg-l2, rgba(127, 127, 127, 0.1));
	border: 1px solid var(--dsw-alias-border-l2, rgba(127, 127, 127, 0.2));
	color: var(--dsw-alias-label-secondary, #888);
}
.agy-tv-img-preview-box {
	max-height: 320px;
	overflow: hidden;
	border-radius: 6px;
	border: 1px solid var(--dsw-alias-border-l2, rgba(127, 127, 127, 0.2));
	display: flex;
	align-items: center;
	justify-content: center;
	background: repeating-conic-gradient(rgba(127,127,127,0.08) 0% 25%, transparent 0% 50%) 50% / 16px 16px;
	cursor: zoom-in;
}
.agy-tv-img-thumb {
	max-width: 100%;
	max-height: 320px;
	object-fit: contain;
}
`;
		const gDoc = globalThis.document;
		if (gDoc !== void 0 && gDoc !== null) {
			const styleId = "dsh-agy-link-toolview-css";
			if (gDoc.getElementById(styleId) === null) {
				const st = gDoc.createElement("style");
				st.id = styleId;
				st.textContent = ROW_CSS;
				const host = gDoc.head ?? gDoc.documentElement;
				if (host) host.appendChild(st);
			}
		}
		//#endregion
		//#region src/client/mermaid.ts
		const MERMAID_CSS = `
div.md-code-block[data-agy-mermaid="done"]:not([data-agy-mermaid-view="source"]) [data-code-block-content] {
	display: none !important;
}
div.md-code-block[data-agy-mermaid="done"][data-agy-mermaid-view="source"] [data-agy-mermaid-svg] > .agy-mermaid-body {
	display: none !important;
}
div.md-code-block[data-agy-mermaid="render"] {
	border-color: var(--dsw-alias-border-l2, #e2e8f0);
}
div[data-agy-mermaid-svg] {
	position: relative;
	padding: 8px 8px 12px 8px;
	overflow-x: auto;
	text-align: center;
	background: var(--dsw-alias-bg-base, #ffffff);
}
div[data-agy-mermaid-svg] svg {
	max-width: 100%;
	min-width: 280px;
	height: auto;
}
.agy-mermaid-body {
	display: flex;
	justify-content: center;
	width: 100%;
	overflow-x: auto;
}
.agy-mermaid-toolbar {
	display: flex;
	justify-content: flex-end;
	padding: 2px 4px 6px 4px;
	background: transparent;
}
.agy-mermaid-toggle {
	font-size: 11px;
	line-height: 1.4;
	padding: 2px 8px;
	border-radius: 4px;
	border: 1px solid var(--dsw-alias-border-l2, #e2e8f0);
	background: var(--dsw-alias-bg-surface, #f8fafc);
	color: var(--dsw-alias-label-secondary, #475569);
	cursor: pointer;
	user-select: none;
	transition: all 0.15s ease;
}
.agy-mermaid-toggle:hover {
	background: var(--dsw-alias-bg-hover, #f1f5f9);
	color: var(--dsw-alias-label-primary, #0f172a);
}
.agy-mermaid-warn {
	padding: 6px 10px;
	margin-bottom: 6px;
	font-size: 12px;
	color: #92400e;
	background: #fef3c7;
	border-radius: 4px;
	text-align: left;
}
div[data-agy-mermaid-svg][data-agy-mermaid-error] {
	text-align: left;
	color: var(--dsw-alias-label-tertiary, #64748b);
	font-size: 12px;
	white-space: pre-wrap;
	padding: 10px 12px;
}
/* Prevent Mermaid's internal error DOM or leaked temporary nodes from escaping into document.body.
   The generic .error-icon/.error-text classes are scoped to OUR mounts and the
   leaked-body id shapes only — unqualified, they hid host UI using the same
   class names. */
div[data-agy-mermaid-svg] .error-icon,
div[data-agy-mermaid-svg] .error-text,
body > [id^="dagy-mmd"] .error-icon,
body > [id^="iagy-mmd"] .error-icon {
	display: none !important;
}
`;
		/**
		* The bundle ships mermaid.min.js and serves it from the plugin route. There
		* is deliberately NO public-CDN fallback: a floating-version, unsigned
		* script executing inside the DSH web origin (with reach into every local
		* HTTP API) is a supply-chain hazard that outweighs offline convenience.
		* When the local asset is missing the source block simply stays visible.
		*/
		const CDN_URLS = ["/plugins/agy-link/mermaid.min.js"];
		let loadPromise = null;
		let loadFailedAt = 0;
		const LOAD_RETRY_MS = 6e4;
		let renderSeq = 0;
		function injectStyles$3() {
			if (typeof document === "undefined") return;
			if (document.getElementById("agy-mermaid-css")) return;
			const st = document.createElement("style");
			st.id = "agy-mermaid-css";
			st.textContent = MERMAID_CSS;
			document.head.appendChild(st);
		}
		function loadScript(src) {
			return new Promise((resolve) => {
				const s = document.createElement("script");
				s.src = src;
				s.async = true;
				let settled = false;
				const done = (ok) => {
					if (settled) return;
					settled = true;
					s.removeEventListener("load", onLoad);
					s.removeEventListener("error", onError);
					if (!ok) s.remove();
					resolve(ok);
				};
				const onLoad = () => done(true);
				const onError = () => done(false);
				s.addEventListener("load", onLoad);
				s.addEventListener("error", onError);
				document.head.appendChild(s);
				setTimeout(() => done(false), 15e3);
			});
		}
		async function loadMermaid() {
			if (typeof window === "undefined") return null;
			if (window.mermaid !== void 0) return window.mermaid;
			if (loadPromise !== null) return loadPromise;
			if (Date.now() - loadFailedAt < LOAD_RETRY_MS) return null;
			loadPromise = (async () => {
				for (const url of CDN_URLS) if (await loadScript(url) && window.mermaid !== void 0) {
					try {
						const isDark = typeof document !== "undefined" && (document.documentElement.classList.contains("dark") || document.body.classList.contains("dark") || window.matchMedia?.("(prefers-color-scheme: dark)").matches === true);
						window.mermaid.initialize({
							startOnLoad: false,
							securityLevel: "strict",
							theme: isDark ? "dark" : "neutral",
							fontFamily: "inherit",
							suppressErrorRendering: true,
							flowchart: {
								useMaxWidth: true,
								htmlLabels: false
							}
						});
					} catch {}
					return window.mermaid;
				}
				loadFailedAt = Date.now();
				loadPromise = null;
				return null;
			})();
			return loadPromise;
		}
		/** Banner infostring text ("mermaid") identifies the fence language. */
		function fenceLang(block) {
			const code = block.querySelector("[data-code-block-content] code") ?? block.querySelector("[data-code-block-content] pre");
			const m = (code?.getAttribute("class") ?? "").match(/language-([\w-]+)/);
			if (m?.[1]) return m[1].toLowerCase();
			const dataLang = (code?.getAttribute("data-language") ?? block.getAttribute("data-language") ?? "").trim().toLowerCase();
			if (dataLang !== "") return dataLang;
			const text = ((block.querySelector("[data-code-block-banner] [class*=\"infostring\"]") ?? block.querySelector("[data-code-block-banner] [class*=\"language\"]"))?.textContent ?? "").trim().toLowerCase();
			if (text !== "" && text !== "代码块" && text !== "code" && text !== "code block") return text.split(/\s+/)[0] ?? "";
			const bannerText = (block.querySelector("[data-code-block-banner]")?.textContent ?? "").trim().toLowerCase();
			if (bannerText !== "" && bannerText !== "代码块" && bannerText !== "code" && bannerText !== "code block") return bannerText.split(/\s+/)[0] ?? "";
			return "";
		}
		const MERMAID_FIRST_LINE = /^(?:flowchart(?:\s+\w+)?|graph\s+(?:TB|TD|LR|RL|BT)|sequenceDiagram|classDiagram(?:-v2)?|stateDiagram(?:-v2)?|erDiagram|journey|gantt|pie|mindmap|timeline|gitGraph|sankey-beta|xychart-beta|block-beta|quadrantChart|requirementDiagram|radar-beta|C4(?:Context|Container|Component|Dynamic))\b/;
		/** Content sniff: unknown-language fences are the whole reason this module exists. */
		function looksLikeMermaidSource(source) {
			const line = source.split(/\r?\n/).find((l) => l.trim() !== "");
			return line !== void 0 && MERMAID_FIRST_LINE.test(line.trim());
		}
		function isMermaidLang(lang) {
			return lang === "mermaid" || lang === "mermaidjs" || lang.startsWith("mermaid");
		}
		const KNOWN_NON_MERMAID = /* @__PURE__ */ new Set([
			"typescript",
			"ts",
			"javascript",
			"js",
			"jsx",
			"tsx",
			"python",
			"py",
			"java",
			"c",
			"cpp",
			"c++",
			"csharp",
			"cs",
			"go",
			"golang",
			"rust",
			"rs",
			"php",
			"ruby",
			"rb",
			"swift",
			"kotlin",
			"kt",
			"scala",
			"shell",
			"bash",
			"sh",
			"zsh",
			"sql",
			"html",
			"css",
			"scss",
			"less",
			"json",
			"yaml",
			"yml",
			"xml",
			"graphql",
			"toml",
			"ini",
			"dockerfile",
			"makefile"
		]);
		function isMermaidBlock(lang, source) {
			if (isMermaidLang(lang)) return true;
			if (KNOWN_NON_MERMAID.has(lang)) return false;
			return looksLikeMermaidSource(source);
		}
		function readSource(block) {
			return ((block.querySelector("[data-code-block-content] code") ?? block.querySelector("[data-code-block-content] pre") ?? block.querySelector("[data-code-block-content]"))?.textContent ?? "").trim();
		}
		function cleanupTempElements(id) {
			if (typeof document === "undefined") return;
			if (id) {
				const delD = document.getElementById("d" + id);
				if (delD && (typeof delD.closest !== "function" || !delD.closest("[data-agy-mermaid-svg]"))) delD.remove();
				const delI = document.getElementById("i" + id);
				if (delI && (typeof delI.closest !== "function" || !delI.closest("[data-agy-mermaid-svg]"))) delI.remove();
				const el = document.getElementById(id);
				if (el && (typeof el.closest !== "function" || !el.closest("[data-agy-mermaid-svg]"))) el.remove();
			}
			const stray = document.querySelectorAll("body > [id^=\"dagy-mmd\"], body > [id^=\"iagy-mmd\"], body > [id^=\"d_agy-mmd\"], body > [id^=\"i_agy-mmd\"], body > [id^=\"agy-mmd-\"]");
			for (let i = 0; i < stray.length; i++) {
				const s = stray[i];
				if (s && (typeof s.closest !== "function" || !s.closest("[data-agy-mermaid-svg]"))) s.remove();
			}
		}
		function repairMermaidSource(source) {
			if (!/^\s*(?:flowchart|graph)\b/i.test(source)) return source;
			return source.split(/\r?\n/).map((line) => {
				let l = line;
				const subMatch = l.match(/^(\s*subgraph\s+)([^"[\]\n]+)$/i);
				if (subMatch && (subMatch[2].includes(":") || subMatch[2].includes(" ") || subMatch[2].includes("："))) {
					const title = subMatch[2].trim();
					l = `${subMatch[1]}"${title}"`;
				}
				l = l.replace(/(\b[a-zA-Z0-9_\u4e00-\u9fa5]+)\[([^"\]\n]+)\]/g, (m, id, text) => {
					if (text.includes(">") || text.includes("<") || text.includes(":") || text.includes("：") || text.includes("(") || text.includes(")")) return `${id}["${text.trim()}"]`;
					return m;
				});
				l = l.replace(/(\b[a-zA-Z0-9_\u4e00-\u9fa5]+)\(([^")\n]+)\)/g, (m, id, text) => {
					if (text.includes(">") || text.includes("<") || text.includes(":") || text.includes("：") || text.includes("[") || text.includes("]")) return `${id}("${text.trim()}")`;
					return m;
				});
				if (l.includes("-->") || l.includes("---") || l.includes("-.->") || l.includes("==>") || l.includes("<--")) {
					let inQuote = false;
					let inBracket = 0;
					let inPipe = false;
					let out = "";
					for (let i = 0; i < l.length; i++) {
						const ch = l[i];
						if (ch === "\"" && (i === 0 || l[i - 1] !== "\\")) {
							inQuote = !inQuote;
							out += ch;
						} else if (!inQuote && ch === "|") {
							inPipe = !inPipe;
							out += ch;
						} else if (!inQuote && !inPipe && (ch === "[" || ch === "(" || ch === "{")) {
							inBracket++;
							out += ch;
						} else if (!inQuote && !inPipe && (ch === "]" || ch === ")" || ch === "}")) {
							if (inBracket > 0) inBracket--;
							out += ch;
						} else if (!inQuote && !inPipe && inBracket === 0 && ch === "+") out += "&";
						else out += ch;
					}
					l = out;
				}
				return l;
			}).join("\n");
		}
		function isInvalidOrCollapsedSvg(svg) {
			if (!svg || svg.trim() === "") return true;
			if (svg.includes("class=\"error-icon\"") || svg.includes("class=\"error-text\"") || svg.includes("aria-roledescription=\"error\"")) return true;
			if (svg.includes("viewBox=\"0 0 0 0\"") || svg.includes("viewBox=\"-8 -8 16 16\"") || svg.includes("max-width: 16px") || svg.includes("max-width: 0px")) return true;
			return false;
		}
		let renderChain = Promise.resolve();
		/** Queue a render task behind the previous one. Failures never break the chain. */
		function enqueueMermaidRender(task) {
			const run = renderChain.then(task, task);
			renderChain = run.then(() => void 0, () => void 0);
			return run;
		}
		async function renderInto(block, source, lang = "") {
			block.querySelector("[data-agy-mermaid-svg]")?.remove();
			const mount = document.createElement("div");
			mount.setAttribute("data-agy-mermaid-svg", "1");
			block.appendChild(mount);
			await enqueueMermaidRender(async () => {
				const api = await loadMermaid();
				if (api === null) {
					block.setAttribute("data-agy-mermaid", "error");
					mount.setAttribute("data-agy-mermaid-error", "1");
					mount.textContent = "Mermaid renderer unavailable (offline). Diagram source stays below.";
					return;
				}
				renderSeq += 1;
				const id = "agy-mmd-" + renderSeq;
				let targetSource = source;
				try {
					let parseValidated = false;
					if (typeof api.parse === "function") try {
						await api.parse(targetSource);
						parseValidated = true;
					} catch (parseErr) {
						const repaired = repairMermaidSource(targetSource);
						if (repaired !== targetSource) try {
							await api.parse(repaired);
							targetSource = repaired;
							parseValidated = true;
						} catch {
							throw parseErr;
						}
						else throw parseErr;
					}
					if (!parseValidated && typeof api.parse !== "function") targetSource = repairMermaidSource(targetSource);
					const { svg } = await api.render(id, targetSource);
					if (isInvalidOrCollapsedSvg(svg)) throw new Error("Mermaid returned an empty or invalid diagram");
					mount.innerHTML = "";
					const toolbar = document.createElement("div");
					toolbar.className = "agy-mermaid-toolbar";
					const toggleBtn = document.createElement("button");
					toggleBtn.type = "button";
					toggleBtn.className = "agy-mermaid-toggle";
					toggleBtn.textContent = "查看源码";
					toggleBtn.title = "切换图表与原始代码";
					toggleBtn.addEventListener("click", (ev) => {
						ev.preventDefault();
						ev.stopPropagation();
						if (block.getAttribute("data-agy-mermaid-view") === "source") {
							block.removeAttribute("data-agy-mermaid-view");
							toggleBtn.textContent = "查看源码";
						} else {
							block.setAttribute("data-agy-mermaid-view", "source");
							toggleBtn.textContent = "查看图表";
						}
					});
					toolbar.appendChild(toggleBtn);
					mount.appendChild(toolbar);
					const bodyDiv = document.createElement("div");
					bodyDiv.className = "agy-mermaid-body";
					bodyDiv.innerHTML = svg;
					mount.appendChild(bodyDiv);
					block.setAttribute("data-agy-mermaid", "done");
				} catch (e) {
					if (!isMermaidLang(lang)) {
						mount.remove();
						block.setAttribute("data-agy-mermaid", "fallback");
					} else {
						block.setAttribute("data-agy-mermaid", "error");
						mount.innerHTML = "<div class=\"agy-mermaid-warn\">⚠️ Mermaid 图表解析失败，已保留原始代码呈现</div>";
					}
				} finally {
					cleanupTempElements(id);
				}
			});
			scheduleScan$1();
		}
		let scanTimer$1 = null;
		function scheduleScan$1() {
			if (isInteractionLocked()) return;
			if (scanTimer$1 !== null) return;
			scanTimer$1 = setTimeout(() => {
				scanTimer$1 = null;
				if (isInteractionLocked()) return;
				scan();
			}, 150);
		}
		/**
		* Cheap content signature for a block's current source.
		*
		* Streaming rewrites the block in place (React keeps the same element and only
		* replaces the text), so the `data-agy-mermaid` state survives every chunk.
		* Without a signature, a block first scanned mid-stream parsed as incomplete
		* source, fell back to "not a diagram", and was never retried — the finished
		* diagram stayed a plain code block forever. The signature lets the scanner
		* notice that the source changed and try again.
		*/
		function sourceSignature(source) {
			let h = 5381;
			for (let i = 0; i < source.length; i++) h = (h << 5) + h + source.charCodeAt(i) | 0;
			return source.length + ":" + (h >>> 0).toString(36);
		}
		/**
		* Decide what the scanner should do with one block.
		*
		* - `skip`: already rendered this exact source, or a render is in flight.
		* - `wait`: the source changed since the last attempt; require one quiet pass
		*   so a streaming block is not rendered for every intermediate prefix.
		* - `render`: first attempt (no signature yet), or the source settled after a
		*   previous attempt.
		*/
		function mermaidScanAction(state, renderedSig, pendingSig, sig) {
			if (state === "busy") return "skip";
			if (renderedSig === sig) return "skip";
			if (renderedSig === null) return "render";
			return pendingSig === sig ? "render" : "wait";
		}
		function scan() {
			if (typeof document === "undefined") return;
			if (isInteractionLocked()) return;
			cleanupTempElements();
			const blocks = document.querySelectorAll(".md-code-block");
			for (let i = 0; i < blocks.length; i++) {
				const block = blocks[i];
				if (!block) continue;
				const lang = fenceLang(block);
				const source = readSource(block);
				if (source === "") continue;
				if (!isMermaidBlock(lang, source)) continue;
				const state = block.getAttribute("data-agy-mermaid");
				const sig = sourceSignature(source);
				const action = mermaidScanAction(state, block.getAttribute("data-agy-mermaid-sig"), block.getAttribute("data-agy-mermaid-pending"), sig);
				if (action === "skip") continue;
				if (action === "wait") {
					block.setAttribute("data-agy-mermaid-pending", sig);
					scheduleScan$1();
					continue;
				}
				block.removeAttribute("data-agy-mermaid-pending");
				block.setAttribute("data-agy-mermaid-sig", sig);
				block.setAttribute("data-agy-mermaid", "busy");
				renderInto(block, source, lang);
			}
		}
		let activeObserver$1 = null;
		let domContentLoadedHandler$1 = null;
		let unbindMermaidSettle = null;
		/**
		* Install the mermaid overlay. Returns a disposer that disconnects the
		* MutationObserver and cancels pending setup — wrap it in ctx.effect so a
		* plugin reload cannot stack observers over the same document.
		*/
		function installMermaidRendering() {
			if (typeof window === "undefined" || typeof document === "undefined") return () => {};
			disposeMermaidRendering();
			injectStyles$3();
			cleanupTempElements();
			const observer = new MutationObserver(() => {
				scheduleScan$1();
			});
			activeObserver$1 = observer;
			unbindMermaidSettle = onScrollSettle(() => {
				scheduleScan$1();
			});
			const setup = () => {
				if (document.body) {
					cleanupTempElements();
					observer.observe(document.body, {
						childList: true,
						subtree: true
					});
					scan();
				}
			};
			if (document.readyState === "loading") {
				domContentLoadedHandler$1 = setup;
				window.addEventListener("DOMContentLoaded", setup, { once: true });
			} else setup();
			return disposeMermaidRendering;
		}
		/** Disconnect the observer and cancel pending setup work. */
		function disposeMermaidRendering() {
			if (activeObserver$1 !== null) {
				activeObserver$1.disconnect();
				activeObserver$1 = null;
			}
			if (unbindMermaidSettle !== null) {
				unbindMermaidSettle();
				unbindMermaidSettle = null;
			}
			if (domContentLoadedHandler$1 !== null) {
				window.removeEventListener("DOMContentLoaded", domContentLoadedHandler$1);
				domContentLoadedHandler$1 = null;
			}
			if (scanTimer$1 !== null) {
				clearTimeout(scanTimer$1);
				scanTimer$1 = null;
			}
		}
		//#endregion
		//#region src/client/reasoning.ts
		const REASONING_CSS = `
/* Hover affordance on thinking disclosure rows */
div[data-variant="think"] [data-disclosure-row]:hover [class*="iconIdle"],
div[data-variant="think"] [class*="row"]:hover [class*="iconIdle"] {
	opacity: 0 !important;
}
div[data-variant="think"] [data-disclosure-row]:hover [class*="chevronHover"],
div[data-variant="think"] [class*="row"]:hover [class*="chevronHover"] {
	opacity: 1 !important;
}

/* Scrollable thinking body (does not touch DOM structure) */
div[data-variant="think"] [class*="thinkBody"] {
	max-height: 360px;
	overflow-y: auto;
	overflow-x: hidden;
	white-space: pre-wrap;
	word-break: break-word;
	padding-right: 8px;
	scrollbar-width: thin;
	scrollbar-color: var(--dsw-alias-border-l3, rgba(0, 0, 0, 0.2)) transparent;
}
div[data-variant="think"] [class*="thinkBody"]::-webkit-scrollbar {
	width: 6px;
	height: 6px;
}
div[data-variant="think"] [class*="thinkBody"]::-webkit-scrollbar-thumb {
	background: var(--dsw-alias-border-l3, rgba(0, 0, 0, 0.18));
	border-radius: 6px;
	background-clip: padding-box;
}
div[data-variant="think"] [class*="thinkBody"]::-webkit-scrollbar-track {
	background: transparent;
	margin: 4px 0;
}

/* Style leading banner token sequence without rewriting DOM: host text nodes
   keep ownership; this only paints the first line if the host wraps it. */
div[data-variant="think"] [class*="thinkBody"] > span:first-child,
div[data-variant="think"] [class*="thinkBody"] {
	font-family: inherit;
}
`;
		function injectStyles$2() {
			if (typeof document === "undefined") return;
			const styleId = "dsh-agy-link-reasoning-css";
			if (document.getElementById(styleId) === null) {
				const st = document.createElement("style");
				st.id = styleId;
				st.textContent = REASONING_CSS;
				const host = document.head ?? document.documentElement;
				if (host) host.appendChild(st);
			}
		}
		/**
		* Persistent cache of handled thinking turns (keyed by turn fingerprint).
		* Survived across TanStack Virtualizer unmount/remount cycles.
		*/
		const handledTurns = /* @__PURE__ */ new Set();
		function getTurnKey(root, text) {
			const parent = root.closest("[data-message-id], [data-item-index], [data-index], [data-role=\"message-content\"]");
			return `${parent?.getAttribute("data-message-id") ?? parent?.getAttribute("data-index") ?? parent?.getAttribute("data-item-index") ?? ""}:${text.slice(0, 100)}`;
		}
		/**
		* Try to expand a thinking row once when its body contains real prose
		* (not a bare [agy thinking turn · N tokens] chip). Uses the host's own
		* disclosure control when present — never mutates thinkBody children.
		*/
		function tryExpandThinkRow(root) {
			if (root.dataset.agyExpanded === "true") return;
			const body = root.querySelector("[class*=\"thinkBody\"]");
			if (!body) return;
			const text = (body.textContent ?? "").trim();
			if (text === "") return;
			if (/^\[agy(?: thinking turn)?(?: · \d+ (?:thinking )?tokens)?\]\s*$/.test(text)) return;
			const turnKey = getTurnKey(root, text);
			if (handledTurns.has(turnKey)) {
				root.dataset.agyExpanded = "true";
				return;
			}
			const toggle = root.querySelector("[data-disclosure-row]") ?? root.querySelector("[class*=\"disclosure\"]") ?? root.querySelector("button");
			if (!toggle) return;
			if (!toggle.dataset.agyClickBound) {
				toggle.dataset.agyClickBound = "true";
				toggle.addEventListener("click", () => {
					handledTurns.add(turnKey);
				}, {
					capture: true,
					passive: true
				});
			}
			if (isInteractionLocked()) return;
			if (toggle.getAttribute("aria-expanded") === "true" || toggle.dataset.expanded === "true" || root.dataset.expanded === "true" || !body.hidden && body.style.display !== "none" && body.clientHeight > 8) {
				handledTurns.add(turnKey);
				root.dataset.agyExpanded = "true";
				return;
			}
			handledTurns.add(turnKey);
			root.dataset.agyExpanded = "true";
			try {
				toggle.click();
			} catch {}
		}
		function scanThinkingRows() {
			if (typeof document === "undefined") return;
			if (isInteractionLocked()) return;
			const rows = document.querySelectorAll("div[data-variant=\"think\"]:not([data-agy-expanded=\"true\"])");
			for (let i = 0; i < rows.length; i++) {
				const row = rows[i];
				if (row) tryExpandThinkRow(row);
			}
		}
		let scanTimer = null;
		function scheduleScan() {
			if (isInteractionLocked()) return;
			if (scanTimer !== null) return;
			scanTimer = setTimeout(() => {
				scanTimer = null;
				if (isInteractionLocked()) return;
				scanThinkingRows();
			}, 150);
		}
		let activeObserver = null;
		let domContentLoadedHandler = null;
		let unbindSettle = null;
		/**
		* Install the auto-expand reasoning overlay. Returns a disposer that
		* disconnects the MutationObserver — wrap it in ctx.effect so a plugin
		* reload cannot stack observers.
		*/
		function installAutoExpandReasoning() {
			if (typeof window === "undefined" || typeof document === "undefined") return () => {};
			disposeAutoExpandReasoning();
			injectStyles$2();
			const observer = new MutationObserver((records) => {
				if (records.some((record) => record.type === "childList" || record.type === "characterData" && record.target.parentElement?.closest("div[data-variant=\"think\"]"))) scheduleScan();
			});
			activeObserver = observer;
			unbindSettle = onScrollSettle(() => {
				scheduleScan();
			});
			const setupObserver = () => {
				if (document.body) {
					observer.observe(document.body, {
						childList: true,
						characterData: true,
						subtree: true
					});
					scanThinkingRows();
				}
			};
			if (document.readyState === "loading") {
				domContentLoadedHandler = setupObserver;
				window.addEventListener("DOMContentLoaded", setupObserver, { once: true });
			} else setupObserver();
			return disposeAutoExpandReasoning;
		}
		/** Disconnect the observer and cancel pending work. */
		function disposeAutoExpandReasoning() {
			if (activeObserver !== null) {
				activeObserver.disconnect();
				activeObserver = null;
			}
			if (unbindSettle !== null) {
				unbindSettle();
				unbindSettle = null;
			}
			if (domContentLoadedHandler !== null) {
				window.removeEventListener("DOMContentLoaded", domContentLoadedHandler);
				domContentLoadedHandler = null;
			}
			if (scanTimer !== null) {
				clearTimeout(scanTimer);
				scanTimer = null;
			}
		}
		//#endregion
		//#region src/client/translate.ts
		const { createElement: h$1, useState: useState$2, useEffect: useEffect$2 } = require("react");
		const win$1 = globalThis;
		const base$1 = win$1.location?.origin ?? "";
		const STYLE_ID = "dsh-agy-link-tsl-css-v2";
		const TRANSLATION_KIND = "agy-translation";
		const CSS = `
/* Card surface. It has to read as a HOST component, not a plugin banner: the
   recipe is DSH's own tool card (the console's agy-tv-card) — a hairline l1
   stroke, the markdown code-block fill, a 12px radius and a banner header.
   Nothing here is brand-themed. The only Gemini signal is one monochrome spark
   plus the "Gemini 译文" label; every colour is a DSH token, so light and dark
   come from the host theme instead of from this sheet. */
.agy-tsl-card {
  --agy-tsl-hairline: var(--dsw-alias-border-l1, rgba(127,127,127,.2));
  --agy-tsl-surface: var(--dsw-alias-markdown-code-block, rgba(127,127,127,.06));
  --agy-tsl-banner: var(--dsw-alias-markdown-code-block-banner, rgba(127,127,127,.04));
  margin: 12px 0 4px 0;
  border: 0.5px solid var(--agy-tsl-hairline);
  border-radius: var(--dsw-radius-md, 12px);
  background: var(--agy-tsl-surface);
  overflow: hidden;
}
/* Explicit dark-theme fallbacks: DSH already flips every token, these only keep
   the card legible if a token is ever renamed or missing. */
body[data-ds-dark-theme] .agy-tsl-card,
body.dark .agy-tsl-card,
[data-theme="dark"] .agy-tsl-card {
  --agy-tsl-hairline: var(--dsw-alias-border-l1, rgba(255,255,255,.10));
  --agy-tsl-surface: var(--dsw-alias-markdown-code-block, rgba(255,255,255,.04));
  --agy-tsl-banner: var(--dsw-alias-markdown-code-block-banner, rgba(255,255,255,.03));
}
.agy-tsl-head {
  display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
  min-height: 32px; padding: 4px 8px 4px 12px;
  background: var(--agy-tsl-banner);
  border-bottom: 0.5px solid var(--agy-tsl-hairline);
  font-size: 12px; line-height: 20px;
  color: var(--dsw-alias-label-tertiary, #8a8f98);
}
.agy-tsl-badge { display: inline-flex; align-items: center; gap: 6px; min-width: 0; }
/* Monochrome spark: identity by shape, accent by token — no gradient <defs>. */
.agy-tsl-mark { display: block; width: 14px; height: 14px; flex: 0 0 auto; color: inherit; }
.agy-tsl-badge > .agy-tsl-mark { color: var(--dsw-alias-state-business-primary, #4176e6); }
.agy-tsl-label {
  font-size: 12px; font-weight: 500; white-space: nowrap;
  color: var(--dsw-alias-label-secondary, #4a4c55);
}
.agy-tsl-meta {
  flex: 1 1 auto; min-width: 0; font-size: 11.5px; font-variant-numeric: tabular-nums;
  color: var(--dsw-alias-label-caption, #8a8f98);
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
/* Actions wrap as ONE unit, so a narrow panel truncates the meta instead of
   splitting "copy" from "collapse" across two lines. */
.agy-tsl-actions {
  display: inline-flex; align-items: center; gap: 2px;
  flex: 0 0 auto; margin-left: auto;
}
/* Flat text buttons, same treatment as the console/tool-card copy button. */
.agy-tsl-btn {
  display: inline-flex; align-items: center; gap: 4px;
  margin: 0; padding: 2px 6px; border: 0; border-radius: var(--dsw-radius-xs, 4px);
  background: transparent; color: var(--dsw-alias-label-tertiary, #8a8f98);
  font: inherit; font-size: 11.5px; line-height: 16px; cursor: pointer;
  transition: background-color .1s ease, color .1s ease;
}
.agy-tsl-btn:hover {
  background: var(--dsw-alias-interactive-bg-hover, rgba(127,127,127,.12));
  color: var(--dsw-alias-label-primary, #1a1c21);
}
.agy-tsl-btn[data-active="true"] { color: var(--dsw-alias-label-primary, #1a1c21); }
.agy-tsl-body {
  padding: 10px 14px 12px 14px;
  font-size: var(--dsw-font-markdown-base-font-size, 14px);
  line-height: var(--dsw-font-markdown-base-line-height, 24px);
  color: var(--dsw-alias-label-primary, #1a1c21);
  overflow-wrap: break-word;
}
.agy-tsl-body p { margin: 0 0 8px 0; }
.agy-tsl-body p:last-child { margin-bottom: 0; }
.agy-tsl-body ul, .agy-tsl-body ol { margin: 0 0 8px 0; padding-left: 22px; }
.agy-tsl-body li { margin: 2px 0; }
.agy-tsl-body h4, .agy-tsl-body h5 { margin: 12px 0 6px 0; font-size: 14px; line-height: 22px; }
.agy-tsl-body code {
  font-family: var(--ds-font-family-code, ui-monospace, SFMono-Regular, Menlo, Consolas, monospace);
  font-size: .9em; padding: 1px 4px; border-radius: var(--dsw-radius-xs, 4px);
  background: var(--dsw-alias-markdown-inline-code, rgba(127,127,127,.16));
}
.agy-tsl-body pre {
  margin: 0 0 8px 0; padding: 10px 12px; overflow-x: auto;
  border: 0.5px solid var(--agy-tsl-hairline);
  border-radius: var(--dsw-radius-sm, 8px);
  background: var(--agy-tsl-banner);
}
.agy-tsl-body pre code { background: transparent; padding: 0; font-size: 12.5px; }
.agy-tsl-original {
  margin: 0; padding: 10px 14px;
  border-top: 0.5px dashed var(--dsw-alias-border-l2, rgba(127,127,127,.28));
  font-size: 12.5px; line-height: 1.6;
  color: var(--dsw-alias-label-secondary, #4a4c55);
  white-space: pre-wrap; max-height: 260px; overflow: auto;
}
/* Icon-only action that sits in the same strip as copy / thumbs / link, with
   the same neutral tint so it reads as part of that group. */
.agy-tsl-icon {
  display: inline-flex; align-items: center; justify-content: center;
  width: 24px; height: 24px; padding: 0; border: 0; border-radius: 6px;
  background: transparent; color: var(--dsw-alias-label-tertiary, #8a8f98);
  cursor: pointer; transition: background .15s ease, color .15s ease;
}
.agy-tsl-icon:hover:not(:disabled) {
  background: var(--dsw-alias-interactive-bg-hover, rgba(127,127,127,.14));
  color: var(--dsw-alias-label-primary, #1a1c21);
}
.agy-tsl-icon:disabled { cursor: default; }
.agy-tsl-icon[data-state="working"] { color: var(--dsw-alias-state-business-primary, #2563eb); cursor: wait; }
.agy-tsl-icon[data-state="done"] { color: var(--dsw-alias-state-success-primary, #22c55e); }
.agy-tsl-icon[data-state="error"] { color: var(--dsw-alias-state-error-primary, #ef4444); }
.agy-tsl-icon svg { width: 15px; height: 15px; display: block; }
@keyframes agy-tsl-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
/* Own tooltip: the native title bubble never showed inside the desktop shell,
   and DSH's Tooltip primitive is not exposed to plugin bundles. It mirrors that
   primitive: same tokens (--dsw-alias-tooltip-bg / --dsw-static-neutral-bluish-00
   / 13px-20px / 3px 7px / --dsw-radius-sm), no caret, BELOW the anchor, and — like
   the primitive's portal — a body-level fixed node, so the transcript
   scroller can neither clip it nor let the composer cover it. */
.agy-tsl-wrap { position: relative; display: inline-flex; align-items: center; }
.agy-tsl-tip {
  position: fixed; z-index: 1100;
  padding: 3px 7px; border-radius: var(--dsw-radius-sm, 8px);
  background: var(--dsw-alias-tooltip-bg, #1f2229);
  color: var(--dsw-static-neutral-bluish-00, #fff);
  font-size: 13px; line-height: 20px; font-weight: 400; letter-spacing: normal;
  white-space: pre-line; overflow-wrap: break-word; text-align: center;
  box-sizing: border-box; width: max-content;
  max-width: min(50vw, calc(100vw - 24px));
  pointer-events: none;
  animation: agy-tsl-tip-in .15s var(--ds-ease-in-out, ease-in-out);
}
@keyframes agy-tsl-tip-in { 0% { opacity: 0; } 100% { opacity: 1; } }
@media (prefers-reduced-motion: reduce) {
  .agy-tsl-tip { animation: none; }
}
`;
		function injectStyles$1() {
			if (typeof document === "undefined") return;
			const doc = win$1.document;
			if (doc === null || doc === void 0) return;
			const existing = doc.getElementById(STYLE_ID);
			if (existing !== null && existing !== void 0) {
				if (existing.textContent !== CSS) existing.textContent = CSS;
				return;
			}
			const st = doc.createElement("style");
			st.id = STYLE_ID;
			st.textContent = CSS;
			const host = doc.head ?? doc.documentElement;
			if (host) host.appendChild(st);
		}
		function service(ctx, name) {
			try {
				const fromGet = ctx.get?.(name);
				if (fromGet !== void 0 && fromGet !== null) return fromGet;
			} catch {}
			try {
				const direct = ctx[name];
				return direct === void 0 || direct === null ? void 0 : direct;
			} catch {
				return;
			}
		}
		/** The session the visible conversation belongs to. */
		function currentSessionId(ctx) {
			const value = service(ctx, "uiSession")?.current?.value;
			if (value !== void 0 && value !== null) for (const key of [
				"key",
				"sessionId",
				"id"
			]) {
				const id = value[key];
				if (typeof id === "string" && id !== "") return id;
			}
			const byId = service(ctx, "sessions")?.list?.getSnapshot?.()?.byId;
			if (byId !== void 0 && byId !== null) {
				const ids = Object.keys(byId);
				if (ids.length === 1 && ids[0] !== void 0) return ids[0];
			}
			return "";
		}
		async function postTranslate(body) {
			try {
				const res = await win$1.fetch?.(base$1 + "/plugins/agy-link/translate", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(body)
				});
				if (!res) return null;
				return await res.json();
			} catch {
				return null;
			}
		}
		/** Ask the host whether this reply already owns a durable translation. */
		async function getMessageState(sessionId, messageId) {
			try {
				const url = base$1 + "/plugins/agy-link/translate/state?session=" + encodeURIComponent(sessionId) + "&message=" + encodeURIComponent(messageId);
				const res = await win$1.fetch?.(url);
				if (!res) return null;
				return await res.json();
			} catch {
				return null;
			}
		}
		function inline(text) {
			const out = [];
			const re = /(\*\*[^*]+\*\*|`[^`]+`)/g;
			let last = 0;
			let m;
			let i = 0;
			while ((m = re.exec(text)) !== null) {
				if (m.index > last) out.push(text.slice(last, m.index));
				const token = m[1] ?? "";
				if (token.startsWith("**")) out.push(h$1("strong", { key: "b" + i }, token.slice(2, -2)));
				else out.push(h$1("code", { key: "c" + i }, token.slice(1, -1)));
				last = m.index + token.length;
				i++;
			}
			if (last < text.length) out.push(text.slice(last));
			return out;
		}
		function renderMarkdown(text) {
			const lines = text.replace(/\r\n?/g, "\n").split("\n");
			const blocks = [];
			let i = 0;
			let key = 0;
			while (i < lines.length) {
				const line = lines[i] ?? "";
				if (line.trim() === "") {
					i++;
					continue;
				}
				if (/^```/.test(line.trim())) {
					const lang = line.trim().slice(3).trim();
					const body = [];
					i++;
					while (i < lines.length && !/^```/.test((lines[i] ?? "").trim())) {
						body.push(lines[i] ?? "");
						i++;
					}
					i++;
					blocks.push(h$1("pre", { key: "p" + key++ }, h$1("code", lang === "" ? null : { "data-lang": lang }, body.join("\n"))));
					continue;
				}
				if (/^#{1,4}\s+/.test(line)) {
					const label = line.replace(/^#{1,4}\s+/, "");
					blocks.push(h$1("h4", { key: "h" + key++ }, inline(label)));
					i++;
					continue;
				}
				if (/^\s*[-*]\s+/.test(line)) {
					const items = [];
					while (i < lines.length && /^\s*[-*]\s+/.test(lines[i] ?? "")) {
						items.push(h$1("li", { key: "l" + key++ }, inline((lines[i] ?? "").replace(/^\s*[-*]\s+/, ""))));
						i++;
					}
					blocks.push(h$1("ul", { key: "u" + key++ }, items));
					continue;
				}
				if (/^\s*\d+[.)]\s+/.test(line)) {
					const items = [];
					while (i < lines.length && /^\s*\d+[.)]\s+/.test(lines[i] ?? "")) {
						items.push(h$1("li", { key: "n" + key++ }, inline((lines[i] ?? "").replace(/^\s*\d+[.)]\s+/, ""))));
						i++;
					}
					blocks.push(h$1("ol", { key: "o" + key++ }, items));
					continue;
				}
				const para = [];
				while (i < lines.length) {
					const cur = lines[i] ?? "";
					if (cur.trim() === "" || /^```/.test(cur.trim()) || /^#{1,4}\s+/.test(cur) || /^\s*[-*]\s+/.test(cur) || /^\s*\d+[.)]\s+/.test(cur)) break;
					para.push(cur);
					i++;
				}
				blocks.push(h$1("p", { key: "t" + key++ }, inline(para.join("\n"))));
			}
			return h$1("div", null, blocks);
		}
		/**
		* The Gemini four-point spark. Drawn monochrome (`currentColor`) on purpose:
		* the card belongs to DSH's design system, so the brand shows up as one tinted
		* glyph in the header instead of a gradient-filled widget. Without <defs> there
		* is no per-render gradient id either, so several cards can coexist untouched.
		*/
		function geminiMark() {
			return h$1("svg", {
				viewBox: "0 0 24 24",
				className: "agy-tsl-mark",
				"aria-hidden": "true",
				focusable: "false"
			}, h$1("path", {
				d: BRAND_PATHS.gemini,
				fill: "currentColor"
			}));
		}
		/**
		* One native-looking card: banner header (spark + "Gemini 译文", model/effort as
		* caption meta, and the three flat actions) over DSH-markdown body text. Every
		* colour is a DSH token — the host theme decides light or dark.
		*/
		const TranslationCard = (props) => {
			const data = (props?.node ?? {}).data ?? {};
			const t = (key, fallback) => {
				const fn = props?.t;
				if (typeof fn !== "function") return fallback ?? key;
				try {
					const value = fn(key);
					return value === key && fallback !== void 0 ? fallback : value;
				} catch {
					return fallback ?? key;
				}
			};
			const [open, setOpen] = useState$2(true);
			const [showOriginal, setShowOriginal] = useState$2(false);
			const [copied, setCopied] = useState$2(false);
			const text = typeof data.text === "string" ? data.text : "";
			const original = typeof data.original === "string" ? data.original : "";
			if (text.trim() === "") return null;
			const meta = [];
			if (typeof data.model === "string" && data.model !== "") meta.push(data.model);
			if (typeof data.effort === "string" && data.effort !== "") meta.push(data.effort);
			if (typeof data.accountId === "string" && data.accountId !== "") meta.push(data.accountId);
			const copy = () => {
				win$1.navigator?.clipboard?.writeText(text).then(() => {
					setCopied(true);
					setTimeout(() => setCopied(false), 1500);
				}).catch(() => void 0);
			};
			const action = (key, label, onClick, active) => h$1("button", {
				key,
				type: "button",
				className: "agy-tsl-btn",
				...active === void 0 ? null : { "data-active": active ? "true" : "false" },
				onClick
			}, label);
			const badge = t("tsl.badge", "Gemini translation");
			return h$1("div", {
				className: "agy-tsl-card",
				"data-agy-translation": "gemini",
				"aria-label": badge
			}, h$1("div", { className: "agy-tsl-head" }, h$1("span", { className: "agy-tsl-badge" }, geminiMark(), h$1("span", { className: "agy-tsl-label" }, badge)), meta.length === 0 ? null : h$1("span", {
				className: "agy-tsl-meta",
				title: meta.join(" · ")
			}, meta.join(" · ")), h$1("span", { className: "agy-tsl-actions" }, original === "" ? null : action("original", showOriginal ? t("tsl.hideOriginal", "Hide original") : t("tsl.showOriginal", "Show original"), () => setShowOriginal(!showOriginal), showOriginal), action("copy", copied ? t("tsl.copied", "Copied") : t("tsl.copy", "Copy"), copy), action("collapse", open ? t("tsl.collapse", "Collapse") : t("tsl.expand", "Expand"), () => setOpen(!open)))), open ? h$1("div", { className: "agy-tsl-body" }, renderMarkdown(text)) : null, showOriginal && original !== "" ? h$1("pre", { className: "agy-tsl-original" }, original) : null);
		};
		function geminiGlyph() {
			return geminiMark();
		}
		function spinnerGlyph() {
			return h$1("svg", {
				viewBox: "0 0 24 24",
				fill: "none",
				className: "agy-tsl-spinner",
				"aria-hidden": "true",
				style: {
					width: "15px",
					height: "15px",
					display: "block",
					animation: "agy-tsl-spin 0.85s linear infinite",
					transformOrigin: "center center"
				}
			}, h$1("circle", {
				cx: "12",
				cy: "12",
				r: "9",
				stroke: "currentColor",
				strokeWidth: "2.5",
				strokeDasharray: "38 18",
				strokeLinecap: "round",
				opacity: "0.85"
			}));
		}
		function checkGlyph() {
			return h$1("svg", {
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2.5",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				"aria-hidden": "true",
				style: {
					width: "15px",
					height: "15px",
					display: "block"
				}
			}, h$1("polyline", { points: "20 6 9 17 4 12" }));
		}
		function errorGlyph() {
			return h$1("svg", {
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2.2",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				"aria-hidden": "true",
				style: {
					width: "15px",
					height: "15px",
					display: "block"
				}
			}, h$1("circle", {
				cx: "12",
				cy: "12",
				r: "10"
			}), h$1("line", {
				x1: "12",
				y1: "8",
				x2: "12",
				y2: "12"
			}), h$1("line", {
				x1: "12",
				y1: "16",
				x2: "12.01",
				y2: "16"
			}));
		}
		/**
		* The hint lives in one body-level node, like DSH's own tooltip portal.
		*
		* Two reasons it is not a pseudo-element on the row any more:
		*   1. the transcript scroller clips its children, so a bubble anchored below the
		*      LAST reply (the row right above the composer) was cut off, and anchoring
		*      it above instead broke alignment with every other tooltip in the strip;
		*   2. `position: fixed` on the row cannot escape a transformed ancestor, so the
		*      node is appended to <body> where nothing can clip it.
		* Inline styles keep it hidden and positioned even if our stylesheet is missing,
		* so a stale sheet can never leak the label into the action row.
		*/
		const TIP_ID = "dsh-agy-link-tsl-tip";
		const TIP_GAP_PX = 6;
		const TIP_MARGIN_PX = 8;
		const TIP_MAX_WIDTH_VW = .5;
		/** Viewport size, guarded for a headless/test document. */
		function viewport() {
			const w = win$1;
			return {
				width: typeof w.innerWidth === "number" ? w.innerWidth : 0,
				height: typeof w.innerHeight === "number" ? w.innerHeight : 0
			};
		}
		/** Hidden by default through INLINE styles — not through the stylesheet. */
		function tipNode() {
			if (typeof document === "undefined") return null;
			const doc = win$1.document;
			if (doc === null || doc === void 0 || typeof doc.createElement !== "function") return null;
			const found = typeof doc.getElementById === "function" ? doc.getElementById(TIP_ID) : null;
			if (found !== null && found !== void 0 && found.isConnected !== false) return found;
			const created = doc.createElement("div");
			created?.setAttribute?.("id", TIP_ID);
			created?.setAttribute?.("role", "tooltip");
			created?.setAttribute?.("class", "agy-tsl-tip");
			if (created !== void 0 && created !== null) {
				created.style.cssText = "position:fixed;display:none;pointer-events:none;z-index:1100";
				created.isConnected = true;
			}
			doc.body?.appendChild?.(created);
			return created ?? null;
		}
		/**
		* Anchor box of the element the pointer is on (or `null` when it cannot be read).
		*/
		function anchorBox(el) {
			const rect = el?.getBoundingClientRect?.();
			if (rect === void 0 || rect === null || typeof rect.top !== "number" || typeof rect.left !== "number") return null;
			return {
				left: rect.left,
				width: typeof rect.width === "number" ? rect.width : 0,
				top: rect.top,
				bottom: typeof rect.bottom === "number" ? rect.bottom : rect.top
			};
		}
		/** Show the shared bubble under `el`, clamped to the viewport. */
		function showTip(el, text) {
			const node = tipNode();
			const box = anchorBox(el);
			if (node === null || node === void 0 || box === null) return;
			node.textContent = text;
			node.setAttribute?.("class", "agy-tsl-tip");
			node.style.position = "fixed";
			node.style.display = "inline-flex";
			const size = node.getBoundingClientRect?.() ?? {
				width: 0,
				height: 26
			};
			const vp = viewport();
			const maxWidth = vp.width > 0 ? Math.max(80, vp.width * TIP_MAX_WIDTH_VW) : 0;
			const width = maxWidth > 0 ? Math.min(size.width, maxWidth) : size.width;
			let left = box.left + box.width / 2 - width / 2;
			if (vp.width > 0) left = Math.min(Math.max(TIP_MARGIN_PX, left), Math.max(TIP_MARGIN_PX, vp.width - width - TIP_MARGIN_PX));
			const below = box.bottom + TIP_GAP_PX;
			const above = box.top - size.height - TIP_GAP_PX;
			const top = vp.height > 0 && below + size.height > vp.height - TIP_MARGIN_PX ? Math.max(TIP_MARGIN_PX, above) : below;
			node.style.left = Math.round(left) + "px";
			node.style.top = Math.round(top) + "px";
		}
		/** Hide the shared bubble (leave/scroll/click). */
		function hideTip() {
			const node = tipNode();
			if (node !== null && node !== void 0) node.style.display = "none";
		}
		function tooltipText(props, key, fallback) {
			const fn = props?.t;
			if (typeof fn !== "function") return fallback;
			try {
				const value = fn(key);
				return value === key ? fallback : value;
			} catch {
				return fallback;
			}
		}
		/**
		* Per-reply action state, kept outside React so it survives a remount: the chat
		* timeline virtualises nodes, and DSH re-creates the whole panel whenever a new
		* card lands in the transcript. The map is the in-page truth; the host's durable
		* record is the truth across page loads.
		*
		* The bug this shape fixes: a remount that happens *while* a translation is in
		* flight re-initialises to `working`, and the promise that finishes belongs to
		* the unmounted instance — whose `setState` is a no-op. The spinner then never
		* stopped even though the card had rendered. Publishing to every mounted
		* instance is what lets the survivor settle to `done`.
		*/
		const ACTION_STATE = /* @__PURE__ */ new Map();
		const ACTION_INFLIGHT = /* @__PURE__ */ new Set();
		const ACTION_LISTENERS = /* @__PURE__ */ new Map();
		function actionKey(sessionId, messageId) {
			return sessionId + "\0" + messageId;
		}
		/** Current state of one action; `working` whenever a request is in flight. */
		function actionStateOf(key) {
			return ACTION_INFLIGHT.has(key) ? "working" : ACTION_STATE.get(key) ?? "idle";
		}
		/** Publish a state to every mounted instance of this action. */
		function setActionState(key, next) {
			ACTION_STATE.set(key, next);
			if (next === "working") ACTION_INFLIGHT.add(key);
			else ACTION_INFLIGHT.delete(key);
			const listeners = ACTION_LISTENERS.get(key);
			if (listeners === void 0) return;
			for (const listener of [...listeners]) try {
				listener(next);
			} catch {}
		}
		/** Subscribe one mounted action instance; the returned function unsubscribes. */
		function subscribeActionState(key, listener) {
			const listeners = ACTION_LISTENERS.get(key) ?? /* @__PURE__ */ new Set();
			listeners.add(listener);
			ACTION_LISTENERS.set(key, listeners);
			return () => {
				listeners.delete(listener);
				if (listeners.size === 0) ACTION_LISTENERS.delete(key);
			};
		}
		/**
		* Icon-only "translate with Gemini" action rendered into the assistant action
		* strip (`conversation.chat.assistant-actions`), so it lines up with copy,
		* thumbs, link and usage. The label lives in the hover tooltip only.
		*/
		const TranslateAction = (props) => {
			const messageId = typeof props?.messageId === "string" ? props.messageId : "";
			const injectedSession = typeof props?.sessionId === "string" ? props.sessionId : "";
			const ctx = props?.ctx;
			const sessionId = injectedSession !== "" ? injectedSession : ctx === void 0 ? "" : currentSessionId(ctx);
			const key = actionKey(sessionId, messageId);
			const [state, setState] = useState$2(() => actionStateOf(key));
			useEffect$2(() => subscribeActionState(key, (next) => setState(next)), [key]);
			useEffect$2(() => {
				if (messageId === "" || sessionId === "") return;
				let alive = true;
				getMessageState(sessionId, messageId).then((res) => {
					if (!alive || res === null) return;
					const next = res.state === "ready" ? "done" : res.state === "busy" ? "working" : null;
					if (next === null) return;
					setActionState(key, next);
				});
				return () => {
					alive = false;
				};
			}, [
				key,
				messageId,
				sessionId
			]);
			if (messageId === "" || sessionId === "") return null;
			const apply = (next) => {
				setActionState(key, next);
			};
			const run = (e) => {
				e?.stopPropagation?.();
				e?.preventDefault?.();
				hideTip();
				if (state === "working") return;
				apply("working");
				postTranslate({
					sessionId,
					messageId,
					persist: true
				}).then((res) => {
					if (res?.ok === true) {
						apply("done");
						return;
					}
					apply("error");
					setTimeout(() => {
						if (!ACTION_INFLIGHT.has(key)) apply("idle");
					}, 3e3);
				}).catch(() => {
					apply("error");
					setTimeout(() => {
						if (!ACTION_INFLIGHT.has(key)) apply("idle");
					}, 3e3);
				});
			};
			const title = state === "working" ? tooltipText(props, "tsl.translating", "翻译中…") : state === "error" ? tooltipText(props, "tsl.retry", "重试") : state === "done" ? tooltipText(props, "tsl.done", "已生成译文") : tooltipText(props, "tsl.actionTip", "用 Gemini 把这条回复译成人话");
			const glyph = state === "working" ? spinnerGlyph() : state === "done" ? checkGlyph() : state === "error" ? errorGlyph() : geminiGlyph();
			return h$1("span", {
				className: "agy-tsl-wrap",
				onMouseEnter: (e) => showTip(e?.currentTarget, title),
				onFocus: (e) => showTip(e?.currentTarget, title),
				onMouseLeave: () => hideTip(),
				onBlur: () => hideTip()
			}, h$1("button", {
				type: "button",
				className: "agy-tsl-icon",
				"data-state": state,
				disabled: state === "working",
				onClick: run,
				"aria-label": title,
				style: {
					display: "inline-flex",
					alignItems: "center",
					justifyContent: "center",
					width: "24px",
					height: "24px",
					padding: "0",
					border: "none",
					borderRadius: "6px",
					background: "transparent",
					color: state === "working" ? "var(--dsw-alias-state-business-primary, #2563eb)" : state === "done" ? "var(--dsw-alias-state-success-primary, #22c55e)" : state === "error" ? "var(--dsw-alias-state-error-primary, #ef4444)" : "var(--dsw-alias-label-tertiary, #8a8f98)",
					cursor: state === "working" ? "wait" : "pointer"
				}
			}, glyph));
		};
		function translationDefinition() {
			return {
				kind: TRANSLATION_KIND,
				target: "chat",
				match: (event) => event !== null && event.type === "plugin:agy-link/translation" ? {
					id: String(event.seq ?? 0),
					role: "start"
				} : null,
				start: (_context, match) => {
					const ev = match.event ?? {};
					const data = ev.data ?? {};
					return {
						seq: typeof ev.seq === "number" ? ev.seq : 0,
						turn: typeof data.turn === "number" ? data.turn : 0,
						anchorSeq: typeof data.anchorSeq === "number" ? data.anchorSeq : typeof ev.seq === "number" ? ev.seq : 0,
						text: typeof data.text === "string" ? data.text : "",
						model: typeof data.model === "string" ? data.model : "",
						effort: typeof data.effort === "string" ? data.effort : "",
						accountId: typeof data.accountId === "string" ? data.accountId : "",
						createdAt: typeof data.createdAt === "number" ? data.createdAt : 0
					};
				},
				update: (context) => context.state,
				buildViewNode: (context) => {
					const state = context.state;
					if (state === void 0 || typeof state.text !== "string" || state.text.trim() === "") return null;
					const anchorSeq = typeof state.anchorSeq === "number" ? state.anchorSeq : 0;
					return {
						key: context.key,
						kind: TRANSLATION_KIND,
						id: context.id,
						target: "chat",
						anchorSeq: anchorSeq + .1,
						location: context.start?.location ?? { kind: "unresolved" },
						visibility: "visible",
						data: state
					};
				}
			};
		}
		/** Mount the card renderer, the event Definition and both affordances. */
		function installTranslationUi(ctx, localeNs) {
			injectStyles$1();
			const disposers = [];
			const conversation = service(ctx, "uiConversation");
			if (conversation?.events !== void 0 && typeof conversation.events.register === "function") try {
				const dispose = conversation.events.register(translationDefinition());
				if (typeof dispose === "function") disposers.push(dispose);
			} catch (e) {
				console.warn("[dsh-agy-link] translation definition registration failed:", e);
			}
			try {
				ctx.slots.inject("conversation.chat.node", () => ctx.slots.register({
					name: "conversation.chat.node",
					key: TRANSLATION_KIND,
					locale: localeNs
				}, TranslationCard));
				ctx.slots.inject("conversation.chat.assistant-actions", () => ctx.slots.register({
					name: "conversation.chat.assistant-actions",
					id: "agy-tsl-message",
					order: 20,
					locale: localeNs,
					inject: (sessionId) => ({ sessionId })
				}, ((props) => TranslateAction({
					...props ?? {},
					ctx
				}))));
			} catch (e) {
				console.warn("[dsh-agy-link] translation slots unavailable:", e);
			}
			return () => {
				for (const dispose of disposers) try {
					dispose();
				} catch {}
				try {
					const doc = win$1.document;
					doc?.getElementById?.(TIP_ID)?.remove?.();
					doc?.getElementById?.(STYLE_ID)?.remove?.();
				} catch {}
			};
		}
		//#endregion
		//#region src/common/compaction.ts
		/** Format a raw token count into human-friendly string like 128.5k, 14.2k, 1.2M, 500. */
		function formatTokenCount(tokens) {
			if (typeof tokens !== "number" || !Number.isFinite(tokens) || tokens <= 0) return "0";
			if (tokens >= 1e6) return `${(tokens / 1e6).toFixed(1).replace(/\.0$/, "")}M`;
			if (tokens >= 1e3) return `${(tokens / 1e3).toFixed(1).replace(/\.0$/, "")}k`;
			return String(Math.round(tokens));
		}
		/** Calculate percentage reduction, e.g. "-89%". */
		function calcTokenReduction(before, after) {
			if (before <= 0 || after >= before) return "-0%";
			return `-${Math.round((before - after) / before * 100)}%`;
		}
		/** Format the summary string, e.g. "128.5k → 14.2k tokens (-89%)". */
		function formatCompactionSummary(before, after) {
			return `${formatTokenCount(before)} → ${formatTokenCount(after)} tokens (${calcTokenReduction(before, after)})`;
		}
		//#endregion
		//#region src/client/compaction.ts
		const COMPACTION_CSS = `
.agy-compaction-row {
  --dsh-compaction-header-height: calc(24px + var(--dsh-content-font-delta, 0px));
  padding: 2px 0;
  margin: 6px 0;
  font-family: inherit;
}

.agy-compaction-button {
  width: 100%;
  height: var(--dsh-compaction-header-height);
  border-radius: var(--dsw-radius-sm, 4px);
  min-width: 0;
  color: var(--dsw-alias-label-tertiary, #888);
  font: inherit;
  font-size: var(--dsh-content-font-size-secondary, 12px);
  text-align: left;
  background: transparent;
  border: none;
  align-items: center;
  padding: 0 4px;
  transition: color 0.1s ease, background 0.1s ease;
  display: flex;
  cursor: pointer;
  box-sizing: border-box;
}

.agy-compaction-button:hover {
  color: var(--dsw-alias-label-secondary, #ccc);
  background: var(--dsw-alias-interactive-bg-hover, rgba(127, 127, 127, 0.08));
}

.agy-compaction-row[data-state="expanded"] .agy-compaction-button {
  position: sticky;
  top: 0;
  z-index: 7;
  background: var(--dsw-alias-bg-base, #1e1e1e);
  border-radius: 0;
}

.agy-compaction-leading {
  width: calc(16px + var(--dsh-content-font-delta, 0px));
  height: calc(16px + var(--dsh-content-font-delta, 0px));
  color: inherit;
  flex: none;
  place-items: center;
  margin-right: 6px;
  display: inline-grid;
}

.agy-compaction-leading svg {
  width: calc(14px + var(--dsh-content-font-delta, 0px));
  height: calc(14px + var(--dsh-content-font-delta, 0px));
}

.agy-compaction-icon-context,
.agy-compaction-icon-chevron {
  grid-area: 1/1;
  justify-content: center;
  align-items: center;
  display: inline-flex;
  transition: opacity 0.12s ease, transform 0.12s ease;
}

.agy-compaction-icon-chevron {
  opacity: 0;
}

.agy-compaction-button:hover .agy-compaction-icon-context {
  opacity: 0;
}

.agy-compaction-button:hover .agy-compaction-icon-chevron {
  opacity: 1;
}

.agy-compaction-row[data-state="expanded"] .agy-compaction-icon-context {
  opacity: 0;
}

.agy-compaction-row[data-state="expanded"] .agy-compaction-icon-chevron {
  opacity: 1;
  transform: rotate(90deg);
}

.agy-compaction-title {
  font-weight: 500;
  color: var(--dsw-alias-label-secondary, #aaa);
}

.agy-compaction-sep {
  margin: 0 6px;
  color: var(--dsw-alias-label-tertiary, #666);
}

.agy-compaction-summary {
  color: var(--dsw-alias-label-tertiary, #888);
  font-size: var(--dsh-content-font-size-secondary, 12px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.agy-compaction-body {
  padding: 10px 14px;
  margin-top: 4px;
  border-radius: var(--dsw-radius-sm, 6px);
  background: var(--dsw-alias-bg-l1, rgba(127, 127, 127, 0.05));
  border: 1px solid var(--dsw-alias-border-l1, rgba(127, 127, 127, 0.15));
  color: var(--dsw-alias-label-secondary, #ccc);
  font-size: 13px;
  line-height: 1.6;
}

.agy-compaction-metrics-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 8px;
  margin-bottom: 8px;
  border-bottom: 1px solid var(--dsw-alias-border-l2, rgba(127, 127, 127, 0.15));
  font-size: 12px;
}

.agy-metric-item {
  color: var(--dsw-alias-label-secondary, #bbb);
}

.agy-metric-arrow {
  color: var(--dsw-alias-label-tertiary, #666);
  font-weight: 600;
}

.agy-metric-badge {
  background: rgba(16, 185, 129, 0.15);
  color: #10b981;
  font-weight: 600;
  padding: 1px 6px;
  border-radius: 4px;
  font-size: 11px;
}

.agy-compaction-summary-text {
  white-space: pre-wrap;
  word-break: break-word;
}
`;
		function injectStyles() {
			if (typeof document === "undefined") return;
			const styleId = "dsh-agy-link-compaction-css";
			if (document.getElementById(styleId) === null) {
				const st = document.createElement("style");
				st.id = styleId;
				st.textContent = COMPACTION_CSS;
				const host = document.head ?? document.documentElement;
				if (host) host.appendChild(st);
			}
		}
		/** Check if document language is Chinese or English. */
		function getCompactionTitle() {
			if (typeof document !== "undefined") {
				if ((document.documentElement.lang || "").startsWith("en")) return "Context compacted";
			}
			return "上下文已压缩";
		}
		function buildCompactionRow(notice) {
			const { beforeTokens, afterTokens, summary = "" } = notice;
			const summaryLabel = formatCompactionSummary(beforeTokens, afterTokens);
			const reductionLabel = calcTokenReduction(beforeTokens, afterTokens);
			const titleText = getCompactionTitle();
			const row = document.createElement("div");
			row.className = "agy-compaction-row";
			row.setAttribute("data-state", "collapsed");
			const button = document.createElement("button");
			button.type = "button";
			button.className = "agy-compaction-button";
			button.setAttribute("aria-expanded", "false");
			button.innerHTML = `
    <span class="agy-compaction-leading" aria-hidden="true">
      <svg class="agy-compaction-icon-context" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="4" width="18" height="16" rx="2"></rect>
        <line x1="7" y1="8" x2="17" y2="8"></line>
        <line x1="7" y1="12" x2="13" y2="12"></line>
        <line x1="7" y1="16" x2="11" y2="16"></line>
      </svg>
      <svg class="agy-compaction-icon-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M9 5l7 7-7 7"></path>
      </svg>
    </span>
    <span class="agy-compaction-title">${titleText}</span>
    <span class="agy-compaction-sep" aria-hidden="true">·</span>
    <span class="agy-compaction-summary">${summaryLabel}</span>
  `;
			const body = document.createElement("div");
			body.className = "agy-compaction-body";
			body.style.display = "none";
			const metricsBar = document.createElement("div");
			metricsBar.className = "agy-compaction-metrics-bar";
			metricsBar.innerHTML = `
    <span class="agy-metric-item"><strong>压缩前:</strong> ${formatTokenCount(beforeTokens)} tokens</span>
    <span class="agy-metric-arrow">→</span>
    <span class="agy-metric-item"><strong>压缩后:</strong> ${formatTokenCount(afterTokens)} tokens</span>
    <span class="agy-metric-badge">${reductionLabel}</span>
  `;
			body.appendChild(metricsBar);
			if (summary.trim() !== "") {
				const summaryContent = document.createElement("div");
				summaryContent.className = "agy-compaction-summary-text";
				summaryContent.textContent = summary;
				body.appendChild(summaryContent);
			}
			button.addEventListener("click", (e) => {
				e.stopPropagation();
				const isExpanded = row.getAttribute("data-state") === "expanded";
				const nextState = isExpanded ? "collapsed" : "expanded";
				row.setAttribute("data-state", nextState);
				button.setAttribute("aria-expanded", String(!isExpanded));
				body.style.display = isExpanded ? "none" : "block";
			});
			row.appendChild(button);
			row.appendChild(body);
			return row;
		}
		/**
		* Scan DOM for compaction markers and transform them into
		* the interactive DeepSeek-like Compaction Card.
		*/
		function scanAndEnhanceCompactionCards(root = document) {
			if (typeof document === "undefined") return;
			if (isInteractionLocked()) return;
			const anchors = root.querySelectorAll("a[href*=\"#agy-compaction\"]:not([data-agy-compaction-rendered=\"true\"])");
			for (const anchor of Array.from(anchors)) {
				anchor.setAttribute("data-agy-compaction-rendered", "true");
				const href = anchor.getAttribute("href") || "";
				const qIdx = href.indexOf("?");
				const queryStr = qIdx >= 0 ? href.slice(qIdx + 1) : "";
				const params = new URLSearchParams(queryStr);
				const beforeTokens = parseInt(params.get("before") || "0", 10);
				const afterTokens = parseInt(params.get("after") || "0", 10);
				const items = parseInt(params.get("items") || "0", 10);
				let summary = "";
				const rawSummary = params.get("summary");
				if (rawSummary) try {
					summary = decodeURIComponent(rawSummary);
				} catch {
					summary = "";
				}
				const container = document.createElement("div");
				container.className = "agy-compaction-card";
				container.setAttribute("data-agy-compaction-rendered", "true");
				const row = buildCompactionRow({
					beforeTokens,
					afterTokens,
					items,
					summary
				});
				container.appendChild(row);
				let targetNode = anchor;
				if (targetNode.parentElement && targetNode.parentElement.tagName.toLowerCase() === "p") targetNode = targetNode.parentElement;
				if (targetNode.parentElement && targetNode.parentElement.tagName.toLowerCase() === "blockquote") targetNode = targetNode.parentElement;
				if (typeof targetNode.replaceWith === "function") targetNode.replaceWith(container);
				else if (targetNode.parentNode) targetNode.parentNode.replaceChild(container, targetNode);
			}
			const cards = root.querySelectorAll(".agy-compaction-card:not([data-agy-compaction-rendered=\"true\"])");
			for (const card of Array.from(cards)) {
				card.setAttribute("data-agy-compaction-rendered", "true");
				const beforeTokens = parseInt(card.dataset.before || "0", 10);
				const afterTokens = parseInt(card.dataset.after || "0", 10);
				const items = parseInt(card.dataset.items || "0", 10);
				let summary = "";
				if (card.dataset.summary) try {
					summary = decodeURIComponent(card.dataset.summary);
				} catch {
					summary = "";
				}
				const row = buildCompactionRow({
					beforeTokens,
					afterTokens,
					items,
					summary
				});
				card.replaceChildren(row);
			}
			const paragraphs = root.querySelectorAll("p:not([data-agy-compaction-rendered=\"true\"])");
			for (const p of Array.from(paragraphs)) {
				const text = p.textContent || "";
				if (!text.includes("class=\"agy-compaction-card\"") && !text.includes("agy-compaction-card")) continue;
				p.setAttribute("data-agy-compaction-rendered", "true");
				const beforeMatch = /data-before="(\d+)"/.exec(text);
				const afterMatch = /data-after="(\d+)"/.exec(text);
				const itemsMatch = /data-items="(\d+)"/.exec(text);
				const summaryMatch = /data-summary="([^"]*)"/.exec(text);
				const beforeTokens = beforeMatch ? parseInt(beforeMatch[1] || "0", 10) : 0;
				const afterTokens = afterMatch ? parseInt(afterMatch[1] || "0", 10) : 0;
				const items = itemsMatch ? parseInt(itemsMatch[1] || "0", 10) : 0;
				let summary = "";
				if (summaryMatch && summaryMatch[1]) try {
					summary = decodeURIComponent(summaryMatch[1]);
				} catch {
					summary = "";
				}
				const container = document.createElement("div");
				container.className = "agy-compaction-card";
				container.setAttribute("data-agy-compaction-rendered", "true");
				const row = buildCompactionRow({
					beforeTokens,
					afterTokens,
					items,
					summary
				});
				container.appendChild(row);
				let next = p.nextElementSibling;
				while (next) {
					const sib = next;
					const sibTag = sib.tagName ? sib.tagName.toLowerCase() : "";
					const sibText = (sib.textContent || "").trim();
					if (sibTag === "blockquote" || sibTag === "p" && (sibText === "</div>" || sibText === "")) {
						next = sib.nextElementSibling;
						if (typeof sib.remove === "function") sib.remove();
						else if (sib.parentNode) sib.parentNode.removeChild(sib);
					} else break;
				}
				if (typeof p.replaceWith === "function") p.replaceWith(container);
				else if (p.parentNode) p.parentNode.replaceChild(container, p);
			}
		}
		let compactionDispose = null;
		let compactionScanTimer = null;
		let unbindCompactionSettle = null;
		function scheduleCompactionScan() {
			if (isInteractionLocked()) return;
			if (compactionScanTimer !== null) return;
			compactionScanTimer = setTimeout(() => {
				compactionScanTimer = null;
				if (isInteractionLocked()) return;
				scanAndEnhanceCompactionCards();
			}, 100);
		}
		function installCompactionCard() {
			if (typeof window === "undefined" || typeof document === "undefined") return () => {};
			compactionDispose?.();
			injectStyles();
			const observer = new MutationObserver(() => {
				scheduleCompactionScan();
			});
			unbindCompactionSettle = onScrollSettle(() => {
				scheduleCompactionScan();
			});
			const setup = () => {
				if (document.body) {
					observer.observe(document.body, {
						childList: true,
						subtree: true
					});
					scanAndEnhanceCompactionCards();
				}
			};
			if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", setup, { once: true });
			else setup();
			const dispose = () => {
				if (compactionScanTimer !== null) {
					clearTimeout(compactionScanTimer);
					compactionScanTimer = null;
				}
				observer.disconnect();
				unbindCompactionSettle?.();
				unbindCompactionSettle = null;
			};
			compactionDispose = dispose;
			return dispose;
		}
		//#endregion
		//#region direct/legacy/src/client/styles.ts
		/** Embedded CSS stylesheet for value-safe Antigravity settings UI. */
		const SETTINGS_CSS = `
.agy-direct-settings {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 820px;
  margin: 0 auto;
  padding: 4px 0 32px;
  color: var(--dsw-alias-label-primary, #e6edf3);
  font-family: var(--dsw-font-sans, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif);
  font-size: 13px;
  line-height: 1.5;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}

.agy-direct-settings *,
.agy-direct-settings *::before,
.agy-direct-settings *::after {
  box-sizing: border-box;
}

.agy-direct-bundle-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
}

.agy-direct-title-line {
  display: flex;
  align-items: center;
  gap: 8px;
}

.agy-direct-bundle-title {
  margin: 0;
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--dsw-alias-label-primary, #e6edf3);
}

.agy-direct-status-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.4);
  flex: none;
}

.agy-direct-bundle-intro,
.agy-direct-card-intro {
  margin: 4px 0 0;
  color: var(--dsw-alias-label-tertiary, #8b949e);
  font-size: 13px;
  line-height: 20px;
}

.agy-direct-cards {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.agy-direct-card {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 18px 20px;
  border-radius: 16px;
  background: var(--dsw-alias-bg-layer-2, rgba(255, 255, 255, 0.03));
  border: 1px solid var(--dsw-alias-border-l2, rgba(255, 255, 255, 0.08));
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.agy-direct-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.agy-direct-card-identity {
  min-width: 0;
  flex: 1;
}

.agy-direct-card-title-line {
  display: flex;
  align-items: center;
  gap: 8px;
}

.agy-direct-card-title {
  margin: 0;
  font-size: 15px;
  line-height: 22px;
  font-weight: 600;
  color: var(--dsw-alias-label-primary, #e6edf3);
}

.agy-direct-card-action {
  flex: none;
  display: flex;
  align-items: center;
}

.agy-direct-risk-card {
  background: rgba(234, 179, 8, 0.04);
  border: 1px solid rgba(234, 179, 8, 0.2);
  border-radius: 14px;
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.agy-direct-risk-text {
  color: var(--dsw-alias-label-secondary, #9ca3af);
  font-size: 13px;
  line-height: 19px;
  margin: 0;
}

.agy-direct-link-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin: 0;
}

.agy-direct-link {
  color: var(--dsw-alias-interactive-text, #38bdf8);
  font-size: 12px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.agy-direct-link:hover {
  text-decoration: underline;
  color: #7dd3fc;
}

.agy-direct-ack-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  background: var(--dsw-alias-bg-layer-1, rgba(0, 0, 0, 0.2));
  border: 1px solid var(--dsw-alias-border-l1, rgba(255, 255, 255, 0.06));
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  font-size: 13px;
  font-weight: 500;
  color: var(--dsw-alias-label-primary, #e6edf3);
}

.agy-direct-checkbox {
  flex: none;
  width: 16px;
  height: 16px;
  margin: 0;
  accent-color: var(--dsw-alias-button-primary-fill, #3b82f6);
  cursor: pointer;
}

.agy-direct-checkbox:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.agy-direct-facts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px 16px;
  margin: 0;
  padding: 14px 16px;
  border-radius: 12px;
  background: var(--dsw-alias-bg-layer-3, rgba(255, 255, 255, 0.02));
  border: 1px solid var(--dsw-alias-border-l1, rgba(255, 255, 255, 0.05));
}

.agy-direct-fact {
  min-width: 0;
}

.agy-direct-fact dt {
  margin: 0;
  font-size: 12px;
  line-height: 18px;
  color: var(--dsw-alias-label-tertiary, #8b949e);
}

.agy-direct-fact dd {
  margin: 2px 0 0;
  font-size: 13px;
  line-height: 18px;
  font-weight: 500;
  color: var(--dsw-alias-label-primary, #e6edf3);
  overflow-wrap: anywhere;
  font-variant-numeric: tabular-nums;
}

/* Quota Section */
.agy-direct-quota-section {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 4px;
}

.agy-direct-quota-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px 16px;
  border-radius: 12px;
  background: var(--dsw-alias-bg-layer-1, rgba(0, 0, 0, 0.15));
  border: 1px solid var(--dsw-alias-border-l1, rgba(255, 255, 255, 0.05));
  box-shadow: inset 0 0 0 1px var(--dsw-alias-border-l2, rgba(255, 255, 255, 0.03));
}

.agy-direct-quota-group-header {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.agy-direct-quota-group-title {
  margin: 0;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--dsw-alias-label-secondary, #a1a1aa);
}

.agy-direct-quota-group-desc {
  margin: 0;
  font-size: 12px;
  color: var(--dsw-alias-label-tertiary, #71717a);
}

.agy-direct-quota-buckets {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 4px;
}

.agy-direct-quota-bucket {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.agy-direct-quota-bucket-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  line-height: 18px;
}

.agy-direct-quota-bucket-name {
  font-weight: 500;
  color: var(--dsw-alias-label-secondary, #d4d4d8);
}

.agy-direct-quota-bucket-val {
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  font-family: var(--dsw-font-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace);
  color: var(--dsw-alias-label-primary, #ffffff);
  animation: agy-direct-fade-in 250ms ease;
}

.agy-direct-quota-bucket-val[data-tone='normal'] {
  color: var(--dsw-alias-state-success-label, #10b981);
}

.agy-direct-quota-bucket-val[data-tone='warning'] {
  color: var(--dsw-alias-state-warn-label, #f59e0b);
}

.agy-direct-quota-bucket-val[data-tone='error'] {
  color: var(--dsw-alias-state-error-label, #ef4444);
}

.agy-direct-quota-querying {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--dsw-alias-label-tertiary, #71717a);
  font-size: 12px;
  line-height: 18px;
  animation: agy-direct-fade-in 200ms ease;
}

.agy-direct-querying-spinner {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1.5px solid var(--dsw-alias-border-l2, rgba(255, 255, 255, 0.15));
  border-top-color: var(--dsw-alias-brand-primary, #4f6ef7);
  animation: agy-direct-spin 0.8s linear infinite;
  display: inline-block;
  flex: none;
}

.agy-direct-progress-track {
  position: relative;
  height: 6px;
  width: 100%;
  border-radius: 999px;
  background: var(--dsw-alias-bg-layer-1, rgba(0, 0, 0, 0.2));
  box-shadow: inset 0 0 0 1px var(--dsw-alias-border-l2, rgba(255, 255, 255, 0.08));
  overflow: hidden;
}

@keyframes agy-direct-fill-progress {
  from {
    transform: scaleX(0);
    opacity: 0.7;
  }
  to {
    transform: scaleX(1);
    opacity: 1;
  }
}

.agy-direct-progress-bar {
  height: 100%;
  border-radius: 999px;
  transform-origin: left center;
  animation: agy-direct-fill-progress 650ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
  transition: width 400ms cubic-bezier(0.16, 1, 0.3, 1), background 400ms ease;
}

.agy-direct-progress-bar[data-tone='normal'] {
  background: linear-gradient(90deg, #f59e0b 0%, #10b981 35%, #059669 100%);
}

.agy-direct-progress-bar[data-tone='warning'] {
  background: linear-gradient(90deg, #ef4444 0%, #f97316 40%, #f59e0b 100%);
}

.agy-direct-progress-bar[data-tone='error'] {
  background: linear-gradient(90deg, #f87171 0%, #ef4444 50%, #dc2626 100%);
}

.agy-direct-shimmer-track {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--dsw-alias-fill-tertiary, rgba(255, 255, 255, 0.06)) 25%,
    var(--dsw-alias-fill-secondary, rgba(255, 255, 255, 0.14)) 50%,
    var(--dsw-alias-fill-tertiary, rgba(255, 255, 255, 0.06)) 75%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: agy-direct-shimmer-stream 1.6s ease-in-out infinite;
}

@keyframes agy-direct-shimmer-stream {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

@keyframes agy-direct-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.agy-direct-quota-subtext {
  font-size: 11px;
  line-height: 16px;
  color: var(--dsw-alias-label-tertiary, #71717a);
  font-variant-numeric: tabular-nums;
}

/* Actions */
.agy-direct-action-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-top: 4px;
}

.agy-direct-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 32px;
  padding: 0 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
  line-height: 20px;
  cursor: pointer;
  border: 1px solid transparent;
  background: var(--dsw-alias-bg-layer-3, rgba(255, 255, 255, 0.08));
  color: var(--dsw-alias-label-primary, #e6edf3);
  text-decoration: none;
  transition: background-color 0.15s ease, border-color 0.15s ease, opacity 0.15s ease;
}

.agy-direct-btn:hover:not(:disabled) {
  background: var(--dsw-alias-interactive-bg-hover, rgba(255, 255, 255, 0.12));
}

.agy-direct-btn:disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

.agy-direct-btn-primary {
  background: var(--dsw-alias-button-primary-fill, #18181b);
  color: var(--dsw-alias-label-primary-foreground, #ffffff);
  border: 1px solid var(--dsw-alias-border-l2, rgba(255, 255, 255, 0.15));
}

.agy-direct-btn-primary:hover:not(:disabled) {
  background: var(--dsw-alias-button-primary-hover, #27272a);
}

.agy-direct-btn-outline {
  background: transparent;
  border: 1px solid var(--dsw-alias-border-l2, rgba(255, 255, 255, 0.15));
  color: var(--dsw-alias-label-primary, #e6edf3);
}

.agy-direct-btn-outline:hover:not(:disabled) {
  background: var(--dsw-alias-interactive-bg-hover, rgba(255, 255, 255, 0.08));
}

.agy-direct-btn-ghost {
  background: transparent !important;
  border-color: transparent !important;
  color: var(--dsw-alias-label-secondary, #a1a1aa) !important;
  padding: 0 10px !important;
  border-radius: 6px !important;
}

.agy-direct-btn-ghost:hover:not(:disabled) {
  background: var(--dsw-alias-fill-tertiary, rgba(255, 255, 255, 0.06)) !important;
  color: var(--dsw-alias-label-primary, #ffffff) !important;
}

.agy-direct-refresh-btn {
  margin-left: auto;
}

.agy-direct-footer-notice {
  margin: 6px 0 0;
  color: var(--dsw-alias-label-tertiary, #71717a);
  font-size: 11px;
  line-height: 17px;
}

.agy-direct-privacy {
  font-size: 11px;
  line-height: 16px;
  color: var(--dsw-alias-label-tertiary, #6e7681);
  margin: 4px 0 0;
}

.agy-direct-alert {
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 12px;
  line-height: 18px;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.25);
  color: #fca5a5;
}

.agy-direct-item-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.agy-direct-item-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 14px;
  background: var(--dsw-alias-bg-layer-1, rgba(255, 255, 255, 0.02));
  border: 1px solid var(--dsw-alias-border-l1, rgba(255, 255, 255, 0.05));
  border-radius: 8px;
}

.agy-direct-item-title {
  font-size: 13px;
  font-weight: 500;
  color: var(--dsw-alias-label-primary, #e6edf3);
}

.agy-direct-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
  line-height: 16px;
  white-space: nowrap;
  flex: none;
}

.agy-direct-badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex: none;
}

.agy-direct-badge-available {
  background: rgba(34, 197, 94, 0.12);
  color: #4ade80;
  border: 1px solid rgba(34, 197, 94, 0.25);
}

.agy-direct-badge-available .agy-direct-badge-dot {
  background: #22c55e;
}

.agy-direct-badge-disabled {
  background: rgba(148, 163, 184, 0.1);
  color: #94a3b8;
  border: 1px solid rgba(148, 163, 184, 0.2);
}

.agy-direct-badge-disabled .agy-direct-badge-dot {
  background: #64748b;
}

.agy-direct-badge-warning {
  background: rgba(234, 179, 8, 0.12);
  color: #facc15;
  border: 1px solid rgba(234, 179, 8, 0.25);
}

.agy-direct-badge-warning .agy-direct-badge-dot {
  background: #eab308;
}

.agy-direct-badge-error {
  background: rgba(239, 68, 68, 0.12);
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.25);
}

.agy-direct-badge-error .agy-direct-badge-dot {
  background: #ef4444;
}

/* Switch Component */
.agy-direct-switch {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 36px;
  height: 20px;
  cursor: pointer;
  user-select: none;
}

.agy-direct-switch input {
  opacity: 0;
  width: 0;
  height: 0;
  position: absolute;
}

.agy-direct-switch-slider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--dsw-alias-bg-layer-4, rgba(255, 255, 255, 0.15));
  border-radius: 20px;
  transition: 0.2s ease;
}

.agy-direct-switch-slider::before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 3px;
  background-color: #ffffff;
  border-radius: 50%;
  transition: 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.agy-direct-switch input:checked + .agy-direct-switch-slider {
  background-color: var(--dsw-alias-button-primary-fill, #2563eb);
}

.agy-direct-switch input:checked + .agy-direct-switch-slider::before {
  transform: translateX(16px);
}

.agy-direct-switch input:disabled + .agy-direct-switch-slider {
  opacity: 0.4;
  cursor: not-allowed;
}

.agy-direct-spin-icon {
  display: inline-flex;
  animation: agy-direct-spin 1s linear infinite;
}

@keyframes agy-direct-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`;
		const STYLE_ELEMENT_ID = "dsh-antigravity-auth-styles";
		function ensureSettingsStyles() {
			if (typeof document === "undefined") return;
			if (document.getElementById(STYLE_ELEMENT_ID)) return;
			const style = document.createElement("style");
			style.id = STYLE_ELEMENT_ID;
			style.textContent = SETTINGS_CSS;
			document.head.appendChild(style);
		}
		//#endregion
		//#region direct/legacy/src/client/AntigravityAuthSettings.tsx
		/** Settings shell for value-safe Antigravity login status. */
		const EMPTY_SETTINGS_SNAPSHOT = {
			status: "unavailable",
			value: void 0,
			base: void 0,
			user: void 0,
			revision: void 0,
			writable: false
		};
		function useCapabilitySettings(scope) {
			const subscribe = (0, react.useCallback)((listener) => scope?.subscribe(listener) ?? (() => {}), [scope]);
			const getSnapshot = (0, react.useCallback)(() => scope?.getSnapshot() ?? EMPTY_SETTINGS_SNAPSHOT, [scope]);
			return (0, react.useSyncExternalStore)(subscribe, getSnapshot, () => EMPTY_SETTINGS_SNAPSHOT);
		}
		function useUnmountSignal() {
			const controller = (0, react.useRef)(new AbortController());
			(0, react.useEffect)(() => {
				const active = new AbortController();
				controller.current = active;
				return () => active.abort();
			}, []);
			return (0, react.useCallback)(() => controller.current.signal, []);
		}
		/** One navigable settings section; credentials remain Host-only and actions use typed RPC. */
		function AntigravityAuthSettings({ rpc, t, subscribe, searchScope, imageScope, videoScope, capabilityControls }) {
			const [status, setStatus] = (0, react.useState)(null);
			const searchSettings = useCapabilitySettings(searchScope);
			const imageSettings = useCapabilitySettings(imageScope);
			const videoSettings = useCapabilitySettings(videoScope);
			const [quota, setQuota] = (0, react.useState)(null);
			const [quotaBusy, setQuotaBusy] = (0, react.useState)(false);
			const [quotaError, setQuotaError] = (0, react.useState)(null);
			const [loadState, setLoadState] = (0, react.useState)("loading");
			const [statusError, setStatusError] = (0, react.useState)(null);
			const [actionError, setActionError] = (0, react.useState)(null);
			const [loginBusy, setLoginBusy] = (0, react.useState)(false);
			const [actionBusy, setActionBusy] = (0, react.useState)(false);
			const [accounts, setAccounts] = (0, react.useState)([]);
			const [accountsLoaded, setAccountsLoaded] = (0, react.useState)(false);
			const [accountsError, setAccountsError] = (0, react.useState)(false);
			const [riskAccepted, setRiskAccepted] = (0, react.useState)(false);
			const [resetTick, setResetTick] = (0, react.useState)(0);
			const statusGeneration = (0, react.useRef)(0);
			const quotaGeneration = (0, react.useRef)(0);
			const unmountSignal = useUnmountSignal();
			const loadAccounts = (0, react.useCallback)(async (signal) => {
				if (!rpc.accounts) return;
				try {
					const result = await rpc.accounts(signal);
					if (signal?.aborted) return;
					if (result.ok) {
						setAccounts(result.value.accounts);
						setAccountsError(false);
					} else setAccountsError(true);
					setAccountsLoaded(true);
				} catch {
					if (!signal?.aborted) {
						setAccountsError(true);
						setAccountsLoaded(true);
					}
				}
			}, [rpc]);
			(0, react.useEffect)(() => {
				const controller = new AbortController();
				loadAccounts(controller.signal);
				return () => controller.abort();
			}, [
				loadAccounts,
				status?.login.phase,
				resetTick
			]);
			(0, react.useEffect)(() => {
				ensureSettingsStyles();
			}, []);
			(0, react.useEffect)(() => subscribe(() => {
				setResetTick((value) => value + 1);
			}), [subscribe]);
			const load = (0, react.useCallback)(async (signal, silent = false) => {
				const generation = ++statusGeneration.current;
				if (!silent) {
					setLoadState((prev) => prev === "ready" ? "ready" : "loading");
					setStatusError(null);
					setActionError(null);
				}
				try {
					const result = await rpc.status(signal);
					if (signal?.aborted === true || generation !== statusGeneration.current) return;
					if (!result.ok) {
						setLoadState("error");
						setStatusError(result.error.message || t("statusFailed"));
						return;
					}
					setStatus(result.value.status);
					setLoadState("ready");
					setStatusError(null);
				} catch (cause) {
					if (signal?.aborted === true || generation !== statusGeneration.current) return;
					setLoadState("error");
					setStatusError(messageOf(cause, t("statusFailed")));
				}
			}, [rpc, t]);
			const loadQuota = (0, react.useCallback)(async (force = false, signal) => {
				if (rpc.usage === void 0) return;
				const generation = ++quotaGeneration.current;
				setQuotaBusy(true);
				setQuotaError(null);
				try {
					const result = await rpc.usage(signal, force);
					if (signal?.aborted === true || generation !== quotaGeneration.current) return;
					if (!result.ok) {
						setQuotaError(result.error.message || t("quotaFailed"));
						return;
					}
					setQuota(result.value);
				} catch (cause) {
					if (signal?.aborted === true || generation !== quotaGeneration.current) return;
					setQuotaError(messageOf(cause, t("quotaFailed")));
				} finally {
					if (signal?.aborted !== true && generation === quotaGeneration.current) setQuotaBusy(false);
				}
			}, [rpc, t]);
			(0, react.useEffect)(() => {
				if (status?.login.projectAvailable !== true) setQuota(null);
			}, [status?.login.projectAvailable]);
			(0, react.useEffect)(() => {
				const controller = new AbortController();
				load(controller.signal);
				return () => controller.abort();
			}, [load, resetTick]);
			(0, react.useEffect)(() => {
				if (status?.login.phase !== "pending") return;
				const controller = new AbortController();
				const timer = globalThis.setInterval(() => {
					load(controller.signal, true);
				}, 1e3);
				return () => {
					globalThis.clearInterval(timer);
					controller.abort();
				};
			}, [load, status?.login.phase]);
			const startLogin = (0, react.useCallback)(async () => {
				const signal = unmountSignal();
				setLoginBusy(true);
				setStatusError(null);
				setActionError(null);
				try {
					if (status?.riskAcknowledged !== true) {
						if (!riskAccepted) return;
						const acknowledgement = await rpc.acknowledgeRisk(signal);
						if (!acknowledgement.ok) {
							if (!signal.aborted) setActionError(acknowledgement.error.message || t("acknowledgeFailed"));
							return;
						}
					}
					const result = await rpc.login(signal);
					if (signal.aborted) return;
					if (!result.ok) {
						await load(signal);
						if (!signal.aborted) setActionError(result.error.code === "client-not-configured" ? t("clientNotConfigured") : result.error.message || t("loginFailed"));
						return;
					}
					setStatus((previous) => {
						if (previous === null) return previous;
						const { errorCode: _ignoredErrorCode, ...login } = previous.login;
						return {
							...previous,
							riskAcknowledged: true,
							login: {
								...login,
								phase: "pending",
								authorizationUrl: result.value.authorizationUrl,
								expiresAt: result.value.expiresAt
							}
						};
					});
					try {
						if (typeof window !== "undefined" && typeof window.open === "function" && result.value?.authorizationUrl && !window.navigator?.userAgent?.includes("jsdom")) window.open(result.value.authorizationUrl, "_blank");
					} catch {}
				} catch (cause) {
					if (!signal.aborted) setActionError(messageOf(cause, t("loginFailed")));
				} finally {
					if (!signal.aborted) setLoginBusy(false);
				}
			}, [
				load,
				rpc,
				riskAccepted,
				status?.riskAcknowledged,
				t,
				unmountSignal
			]);
			const cancelLogin = (0, react.useCallback)(async () => {
				const signal = unmountSignal();
				setLoginBusy(true);
				setStatusError(null);
				setActionError(null);
				try {
					const result = await rpc.cancelLogin(signal);
					if (signal.aborted) return;
					if (!result.ok) {
						setActionError(result.error.message || t("cancelLoginFailed"));
						return;
					}
					setStatus((previous) => {
						if (previous === null) return previous;
						const { errorCode: _ignoredErrorCode, ...login } = previous.login;
						return {
							...previous,
							login: result.value.errorCode === void 0 ? {
								...login,
								phase: result.value.phase
							} : {
								...login,
								phase: result.value.phase,
								errorCode: result.value.errorCode
							}
						};
					});
				} catch (cause) {
					if (!signal.aborted) setActionError(messageOf(cause, t("cancelLoginFailed")));
				} finally {
					if (!signal.aborted) setLoginBusy(false);
				}
			}, [
				rpc,
				t,
				unmountSignal
			]);
			const logout = (0, react.useCallback)(async () => {
				const signal = unmountSignal();
				setActionBusy(true);
				setStatusError(null);
				setActionError(null);
				try {
					const result = await rpc.logout(signal);
					if (signal.aborted) return;
					if (!result.ok) {
						setActionError(result.error.message || t("logoutFailed"));
						return;
					}
					await load(signal);
				} catch (cause) {
					if (!signal.aborted) setActionError(messageOf(cause, t("logoutFailed")));
				} finally {
					if (!signal.aborted) setActionBusy(false);
				}
			}, [
				load,
				rpc,
				t,
				unmountSignal
			]);
			const projectError = projectErrorText(status?.login.errorCode, t);
			const isConfigured = status?.login.configured === true;
			const accountAction = async (account, action) => {
				const operation = action === "switch" ? rpc.switchAccount : rpc.removeAccount;
				if (!operation) return;
				if (action === "remove" && typeof window !== "undefined" && !window.confirm(t("accountRemoveConfirm"))) return;
				const signal = unmountSignal();
				setActionBusy(true);
				setActionError(null);
				try {
					if (!(await operation(account.id, signal)).ok) {
						if (!signal.aborted) setActionError(t("accountActionFailed"));
						return;
					}
					await Promise.all([load(signal), loadAccounts(signal)]);
				} catch {
					if (!signal.aborted) setActionError(t("accountActionFailed"));
				} finally {
					if (!signal.aborted) setActionBusy(false);
				}
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
				className: "agy-direct-settings",
				"data-plugin": "dsh-antigravity-auth",
				"aria-labelledby": "antigravity-auth-title",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("header", {
					className: "agy-direct-bundle-header",
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: "agy-direct-title-line",
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h1", {
							id: "antigravity-auth-title",
							className: "agy-direct-bundle-title",
							children: t("title")
						}), isConfigured ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: "agy-direct-status-dot",
							role: "status",
							"aria-label": t("ready")
						}) : null]
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: "agy-direct-bundle-intro",
						children: t("intro")
					})] })
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: "agy-direct-cards",
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("article", {
							className: "agy-direct-card",
							"aria-labelledby": "antigravity-auth-card-title",
							children: [
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: "agy-direct-card-header",
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "agy-direct-card-identity",
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
											id: "antigravity-auth-card-title",
											className: "agy-direct-card-title",
											children: t("authCardTitle")
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
											className: "agy-direct-card-intro",
											children: t("authCardIntro")
										})]
									})
								}),
								rpc.accounts ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "agy-direct-card-subtext",
									"aria-label": t("accountsTitle"),
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("strong", { children: [
											t("accountsTitle"),
											" (",
											accounts.length,
											")"
										] }),
										accountsError ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
											role: "alert",
											children: t("accountActionFailed")
										}) : null,
										accountsLoaded && !accountsError && accounts.length === 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: t("accountsEmpty") }) : null,
										accounts.map((account) => /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
											className: "agy-direct-action-row",
											children: [
												/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", { children: [account.maskedEmail ?? account.id, account.isActive ? ` · ${t("accountCurrent")}` : ""] }),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
													className: "agy-direct-btn agy-direct-btn-outline",
													type: "button",
													disabled: actionBusy || account.isActive,
													onClick: () => {
														accountAction(account, "switch");
													},
													children: t("accountSwitch")
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
													className: "agy-direct-btn agy-direct-btn-ghost",
													type: "button",
													disabled: actionBusy,
													onClick: () => {
														accountAction(account, "remove");
													},
													children: t("accountRemove")
												})
											]
										}, account.id)),
										accounts.length > 1 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", { children: t("accountSwitchHelp") }) : null
									]
								}) : null,
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)(QuotaVisualDashboard, {
									quota,
									busy: quotaBusy,
									error: quotaError,
									onRefresh: () => {
										loadQuota(true, unmountSignal());
									},
									t
								}),
								status !== null && !status.riskAcknowledged ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
									className: "agy-direct-card-subtext",
									children: [
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: riskAccepted,
											onChange: (event) => setRiskAccepted(event.target.checked)
										}),
										" ",
										t("riskAcknowledgement"),
										" ",
										t("risk")
									]
								}) : null,
								/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "agy-direct-action-row",
									children: [
										status?.login.phase === "pending" && typeof status.login.authorizationUrl === "string" ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("a", {
											className: "agy-direct-btn agy-direct-btn-primary",
											href: status.login.authorizationUrl,
											target: "_blank",
											rel: "noreferrer",
											children: t("openAuthorization")
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											className: "agy-direct-btn agy-direct-btn-outline",
											type: "button",
											disabled: loginBusy,
											onClick: () => {
												cancelLogin();
											},
											children: t("cancelLogin")
										})] }) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											className: "agy-direct-btn agy-direct-btn-primary",
											type: "button",
											disabled: status === null || loginBusy || !status.riskAcknowledged && !riskAccepted,
											onClick: () => {
												startLogin();
											},
											children: loginBusy ? t("startingLogin") : isConfigured ? t("relogin") : t("login")
										}),
										isConfigured ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											className: "agy-direct-btn agy-direct-btn-outline",
											type: "button",
											disabled: actionBusy,
											onClick: () => {
												logout();
											},
											children: t("logout")
										}) : null,
										/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
											className: "agy-direct-btn agy-direct-btn-ghost agy-direct-refresh-btn",
											type: "button",
											disabled: loadState === "loading" || quotaBusy,
											onClick: () => {
												const minDelay = new Promise((resolve) => setTimeout(resolve, 500));
												Promise.all([
													load(unmountSignal()),
													loadQuota(true, unmountSignal()),
													minDelay
												]);
											},
											children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: quotaBusy || loadState === "loading" ? "agy-direct-spin-icon" : "",
												children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("svg", {
													width: "15",
													height: "15",
													viewBox: "0 0 24 24",
													fill: "none",
													stroke: "currentColor",
													strokeWidth: "2",
													children: [
														/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" }),
														/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M3 3v5h5" }),
														/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" }),
														/* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", { d: "M16 21h5v-5" })
													]
												})
											}), quotaBusy || loadState === "loading" ? t("queryingQuota") : t("refreshStatus")]
										})
									]
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									className: "agy-direct-footer-notice",
									children: t("quotaFooterNotice")
								}),
								statusError === null ? null : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									className: "agy-direct-alert",
									role: "alert",
									children: statusError
								}),
								actionError === null ? null : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									className: "agy-direct-alert",
									role: "alert",
									children: actionError
								}),
								status?.login.phase === "expired" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									className: "agy-direct-alert",
									role: "alert",
									children: t("loginExpired")
								}) : null,
								status?.login.phase === "port-conflict" ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									className: "agy-direct-alert",
									role: "alert",
									children: t("loginPortConflict")
								}) : null,
								status?.login.phase === "failed" ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
									className: "agy-direct-alert",
									role: "alert",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("loginFailed") }), status.login.errorCode ? ` (${status.login.errorCode})` : ""]
								}) : null,
								projectError === void 0 ? null : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									className: "agy-direct-alert",
									role: "alert",
									children: projectError
								}),
								status?.login.phase === "pending" && status.login.expiresAt !== void 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
									className: "agy-direct-card-subtext",
									children: [
										t("expiresAt"),
										": ",
										/* @__PURE__ */ (0, react_jsx_runtime.jsx)("time", {
											dateTime: status.login.expiresAt,
											children: status.login.expiresAt
										})
									]
								}) : null,
								status?.revoke === void 0 || status.revoke.state === "idle" ? null : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
									className: "agy-direct-card-subtext",
									role: "status",
									children: revokeStatusText(status.revoke.state, t)
								})
							]
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("article", {
							className: "agy-direct-card",
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "agy-direct-card-header",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "agy-direct-card-identity",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
										className: "agy-direct-card-title",
										children: t("search")
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
										className: "agy-direct-card-intro",
										children: t("searchCardIntro")
									})]
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: "agy-direct-card-action",
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Switch, {
										label: t("toggleSearch"),
										checked: capabilityControls?.search ?? searchSettings.value?.enabled ?? false,
										disabled: !capabilityAvailable(status, "search") || capabilityControls === void 0 && (searchSettings.status !== "ready" || !searchSettings.writable),
										onChange: (next) => {
											if (capabilityControls) capabilityControls.set("search", next);
											else searchScope?.set("enabled", next);
										}
									})
								})]
							})
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("article", {
							className: "agy-direct-card",
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "agy-direct-card-header",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "agy-direct-card-identity",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
										className: "agy-direct-card-title",
										children: t("image")
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
										className: "agy-direct-card-intro",
										children: t("imageCardIntro")
									})]
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: "agy-direct-card-action",
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Switch, {
										label: t("toggleImage"),
										checked: capabilityControls?.image ?? imageSettings.value?.enabled ?? false,
										disabled: !capabilityAvailable(status, "image") || capabilityControls === void 0 && (imageSettings.status !== "ready" || !imageSettings.writable),
										onChange: (next) => {
											if (capabilityControls) capabilityControls.set("image", next);
											else imageScope?.set("enabled", next);
										}
									})
								})]
							})
						}),
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("article", {
							className: "agy-direct-card",
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "agy-direct-card-header",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: "agy-direct-card-identity",
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h2", {
										className: "agy-direct-card-title",
										children: t("video")
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
										className: "agy-direct-card-intro",
										children: t("videoCardIntro")
									})]
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: "agy-direct-card-action",
									children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(Switch, {
										label: t("toggleVideo"),
										checked: capabilityControls?.video ?? videoSettings.value?.enabled ?? false,
										disabled: !capabilityAvailable(status, "video") || capabilityControls === void 0 && (videoSettings.status !== "ready" || !videoSettings.writable),
										onChange: (next) => {
											if (capabilityControls) capabilityControls.set("video", next);
											else videoScope?.set("enabled", next);
										}
									})
								})]
							})
						})
					]
				})]
			});
		}
		function capabilityAvailable(status, id) {
			return status?.login.projectAvailable === true && status.capabilities.some((capability) => capability.id === id && capability.state === "available");
		}
		function Switch({ label, checked, disabled, onChange }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
				className: "agy-direct-switch",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
					type: "checkbox",
					"aria-label": label,
					checked,
					disabled,
					onChange: (e) => {
						onChange(e.target.checked);
					}
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { className: "agy-direct-switch-slider" })]
			});
		}
		function formatRefreshTime(resetTime, dayUnit, now = Date.now()) {
			const target = new Date(resetTime).getTime();
			if (Number.isNaN(target)) return resetTime;
			const diffMs = target - now;
			if (diffMs <= 0) return "0m";
			const diffMinutes = Math.floor(diffMs / 6e4);
			const hours = Math.floor(diffMinutes / 60);
			const remMinutes = diffMinutes % 60;
			if (hours >= 24) return `${Math.floor(hours / 24)}${dayUnit} ${hours % 24}h ${remMinutes}m`;
			if (hours > 0) return `${hours}h ${remMinutes}m`;
			return `${remMinutes}m`;
		}
		function quotaTone(fraction) {
			if (fraction < .3) return "error";
			if (fraction <= .6) return "warning";
			return "normal";
		}
		function QuotaVisualDashboard({ quota, busy, error, t }) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: "agy-direct-quota-section",
				children: [quota?.state === "available" && quota.groups !== void 0 && quota.groups.length > 0 ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: "agy-direct-quota-groups",
					children: quota.groups.map((group) => {
						const groupTitle = group.group === "gemini" ? t("geminiGroupTitle") : t("claudeGptGroupTitle");
						const groupDesc = group.group === "gemini" ? t("geminiGroupDesc") : t("claudeGptGroupDesc");
						return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: "agy-direct-quota-group",
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: "agy-direct-quota-group-header",
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "agy-direct-quota-group-title",
									children: groupTitle
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: "agy-direct-quota-group-desc",
									children: groupDesc
								})]
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: "agy-direct-quota-buckets",
								children: group.windows.map((window) => {
									const windowName = window.window === "5h" ? t("window5hTitle") : t("windowWeeklyTitle");
									const pctFormatted = (window.remainingFraction * 100).toFixed(2) + "%";
									const pctRounded = Math.round(window.remainingFraction * 100);
									const refreshStr = formatRefreshTime(window.resetTime, t("quotaDayUnit"));
									const subtext = `${pctRounded}% ${t("remaining")} · ${t("refreshesIn").replace("{time}", refreshStr)}`;
									const widthPct = Math.max(0, Math.min(100, window.remainingFraction * 100));
									const tone = quotaTone(window.remainingFraction);
									return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: "agy-direct-quota-bucket",
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: "agy-direct-quota-bucket-head",
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													className: "agy-direct-quota-bucket-name",
													children: windowName
												}), busy ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
													className: "agy-direct-quota-querying",
													children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
														className: "agy-direct-querying-spinner",
														"aria-hidden": "true"
													}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", { children: t("queryingQuota") })]
												}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
													className: "agy-direct-quota-bucket-val",
													"data-tone": tone,
													children: pctFormatted
												})]
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
												className: "agy-direct-progress-track",
												children: busy ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
													className: "agy-direct-shimmer-track",
													"aria-hidden": "true"
												}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
													className: "agy-direct-progress-bar",
													"data-tone": tone,
													style: { width: `${widthPct}%` }
												})
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: "agy-direct-quota-subtext",
												children: subtext
											})
										]
									}, window.window);
								})
							})]
						}, group.group);
					})
				}) : null, error === null ? null : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
					className: "agy-direct-alert",
					role: "alert",
					children: error
				})]
			});
		}
		const PROJECT_ERROR_KEYS = {
			"client-not-configured": "clientNotConfigured",
			"project-unavailable": "projectUnavailable",
			"project-authentication-failed": "projectAuthenticationFailed",
			"project-forbidden": "projectForbidden",
			"project-rate-limited": "projectRateLimited",
			"project-offline": "projectOffline",
			"project-malformed": "projectMalformed",
			"project-protocol-drift": "projectProtocolDrift"
		};
		const REVOKE_STATE_KEYS = {
			idle: "credentialLoggedOut",
			"logged-out": "credentialLoggedOut",
			pending: "revokePending",
			revoked: "revokeSuccess",
			failed: "revokeFailed",
			superseded: "revokeSuperseded",
			"confirmation-required": "revokeConfirmationRequired"
		};
		function projectErrorText(errorCode, t) {
			if (errorCode === void 0) return void 0;
			const key = PROJECT_ERROR_KEYS[errorCode];
			return key === void 0 ? void 0 : t(key);
		}
		function revokeStatusText(state, t) {
			return t(REVOKE_STATE_KEYS[state]);
		}
		function messageOf(_error, fallback) {
			return fallback;
		}
		//#endregion
		//#region direct/legacy/src/status.ts
		const CAPABILITY_ROW_IDS = [
			"auth-llm",
			"search",
			"image",
			"video"
		];
		Object.freeze(CAPABILITY_ROW_IDS.map((id) => Object.freeze({
			id,
			state: "disabled",
			reasonCode: "unauthenticated"
		})));
		//#endregion
		//#region direct/legacy/src/login-types.ts
		/** Browser-safe login state shared by the Host OAuth flow and settings RPC. */
		const LOGIN_PHASES = [
			"idle",
			"pending",
			"success",
			"cancelled",
			"expired",
			"port-conflict",
			"failed"
		];
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
		function isLoginPhase(value) {
			return typeof value === "string" && LOGIN_PHASES.includes(value);
		}
		function isLoginErrorCode(value) {
			return typeof value === "string" && LOGIN_ERROR_CODES.includes(value);
		}
		//#endregion
		//#region direct/legacy/src/model-catalog.ts
		/** Browser-safe advisory model-catalog state shared by Host RPC and settings. */
		const ANTIGRAVITY_MODEL_CATALOG_STATES = [
			"snapshot",
			"live-available",
			"refresh-failed",
			"protocol-drift"
		];
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
		//#endregion
		//#region direct/legacy/src/rpc-contract.ts
		const ANTIGRAVITY_AUTH_RPC_CHANNEL = "/api";
		const ANTIGRAVITY_AUTH_RPC_NAMESPACE = "antigravity-auth";
		/** Build the browser face over the plugin-owned guarded account channel. */
		function createAntigravityAuthRpcClient(rpc) {
			return {
				status: (signal) => callValidated(rpc, "status", {}, signal, (value) => {
					const status = parseStatusResult(value);
					return status === void 0 ? void 0 : { status };
				}),
				acknowledgeRisk: (signal) => callValidated(rpc, "acknowledge-risk", { acknowledge: true }, signal, parseAcknowledgementResult),
				login: (signal) => callValidated(rpc, "login", {}, signal, parseLoginResult),
				cancelLogin: (signal) => callValidated(rpc, "cancel", {}, signal, parseActionResult),
				logout: (signal) => callValidated(rpc, "logout", {}, signal, parseLogoutResult),
				revoke: (signal) => callValidated(rpc, "revoke", { confirmed: true }, signal, parseRevokeResult),
				models: (signal, force = false) => callValidated(rpc, "models", { force }, signal, parseModelCatalogResult),
				usage: (signal, force = false) => callValidated(rpc, "usage", { force }, signal, parseUsageResult),
				accounts: (signal) => callValidated(rpc, "accounts", {}, signal, parseDirectAccounts),
				switchAccount: (id, signal) => callValidated(rpc, "switch-account", { id }, signal, parseAccountAction),
				removeAccount: (id, signal) => callValidated(rpc, "remove-account", { id }, signal, parseAccountAction)
			};
		}
		function parseDirectAccounts(value) {
			if (!isRecord(value) || !hasExactKeys(value, ["accounts"]) || !Array.isArray(value.accounts) || value.accounts.length > 100) return void 0;
			const accounts = [];
			const ids = /* @__PURE__ */ new Set();
			for (const account of value.accounts) {
				if (!isRecord(account) || !Object.keys(account).every((key) => [
					"id",
					"index",
					"isActive",
					"maskedEmail"
				].includes(key)) || typeof account.id !== "string" || !/^acc_[1-9][0-9]{0,11}$/.test(account.id) || ids.has(account.id) || !Number.isSafeInteger(account.index) || account.index < 1 || typeof account.isActive !== "boolean" || account.maskedEmail !== void 0 && (typeof account.maskedEmail !== "string" || !isMaskedEmail(account.maskedEmail))) return void 0;
				ids.add(account.id);
				accounts.push({
					id: account.id,
					index: account.index,
					isActive: account.isActive,
					...typeof account.maskedEmail === "string" ? { maskedEmail: account.maskedEmail } : {}
				});
			}
			if (accounts.filter((account) => account.isActive).length > 1) return void 0;
			return { accounts };
		}
		function parseAccountAction(value) {
			return isRecord(value) && hasExactKeys(value, ["success"]) && value.success === true ? { success: true } : void 0;
		}
		async function callValidated(rpc, endpoint, payload, signal, parse) {
			let result;
			try {
				result = await rpc.call(ANTIGRAVITY_AUTH_RPC_CHANNEL, `${ANTIGRAVITY_AUTH_RPC_NAMESPACE}/${endpoint}`, payload, signal);
			} catch {
				return invalidResponse(endpoint);
			}
			if (!result.ok) return sanitizeFailure(result, endpoint);
			const value = parse(result.value);
			return value === void 0 ? invalidResponse(endpoint) : {
				ok: true,
				value
			};
		}
		function sanitizeFailure(result, endpoint) {
			const error = result.error;
			if (!isRecord(error) || !hasExactKeys(error, [
				"code",
				"message",
				"details"
			]) || !isSafeRpcErrorCode(error.code) || typeof error.message !== "string" || !isBoundedSafeText(error.message, 512) || !isSafeErrorDetails(error.details)) return invalidResponse(endpoint);
			return {
				ok: false,
				error: {
					code: error.code,
					message: safeRpcErrorMessage(error.code),
					details: {}
				}
			};
		}
		function isSafeErrorDetails(value) {
			if (!isRecord(value)) return false;
			if (Object.keys(value).length === 0) return true;
			return hasExactKeys(value, ["issues"]) && Array.isArray(value.issues) && value.issues.length === 0;
		}
		/** Parse a closed, value-safe advisory model catalog received by the browser. */
		function parseModelCatalogResult(value) {
			if (!isRecord(value) || !hasExactKeys(value, [
				"state",
				"models",
				...value.checkedAt === void 0 ? [] : ["checkedAt"]
			]) || !ANTIGRAVITY_MODEL_CATALOG_STATES.includes(value.state) || !Array.isArray(value.models) || value.models.length === 0 || value.models.length > 64 || value.checkedAt !== void 0 && !isIsoTime(value.checkedAt)) return void 0;
			const models = [];
			const ids = /* @__PURE__ */ new Set();
			for (const model of value.models) {
				if (!isRecord(model) || !hasExactKeys(model, [
					"id",
					"name",
					"state"
				]) || !isBoundedSafeText(model.id, 256) || !isBoundedSafeText(model.name, 256) || model.state !== "snapshot" && model.state !== "live-available" && model.state !== "unavailable" || ids.has(model.id)) return void 0;
				if (value.state === "live-available" ? model.state === "snapshot" : model.state !== "snapshot") return void 0;
				ids.add(model.id);
				models.push({
					id: model.id,
					name: model.name,
					state: model.state
				});
			}
			return {
				state: value.state,
				models,
				...typeof value.checkedAt === "string" ? { checkedAt: value.checkedAt } : {}
			};
		}
		/** Parse a value-safe, normalized quota envelope received by the browser. */
		function parseUsageResult(value) {
			if (!isRecord(value) || !hasExactKeys(value, [
				"state",
				...value.checkedAt === void 0 ? [] : ["checkedAt"],
				...value.groups === void 0 ? [] : ["groups"]
			])) return void 0;
			if (!isQuotaState(value.state)) return void 0;
			if (value.checkedAt !== void 0 && !isIsoTime(value.checkedAt)) return void 0;
			if (value.state === "available" && value.groups === void 0) return void 0;
			if (value.groups !== void 0) {
				if (!Array.isArray(value.groups) || value.groups.length === 0 || value.groups.length > 2) return void 0;
				const groups = [];
				const groupNames = /* @__PURE__ */ new Set();
				for (const rawGroup of value.groups) {
					if (!isRecord(rawGroup) || !hasExactKeys(rawGroup, [
						"group",
						"modelCount",
						"windows"
					]) || rawGroup.group !== "gemini" && rawGroup.group !== "non-gemini" || !Number.isSafeInteger(rawGroup.modelCount) || rawGroup.modelCount < 0 || !Array.isArray(rawGroup.windows)) return void 0;
					if (groupNames.has(rawGroup.group)) return void 0;
					groupNames.add(rawGroup.group);
					const modelCount = rawGroup.modelCount;
					if (rawGroup.windows.length === 0 || rawGroup.windows.length > 2) return void 0;
					const windows = [];
					const windowKinds = /* @__PURE__ */ new Set();
					for (const rawWindow of rawGroup.windows) {
						if (!isRecord(rawWindow) || !hasExactKeys(rawWindow, [
							"window",
							"remainingFraction",
							"resetTime"
						]) || rawWindow.window !== "5h" && rawWindow.window !== "weekly" || windowKinds.has(rawWindow.window) || typeof rawWindow.remainingFraction !== "number" || !Number.isFinite(rawWindow.remainingFraction) || rawWindow.remainingFraction < 0 || rawWindow.remainingFraction > 1 || !isIsoTime(rawWindow.resetTime)) return void 0;
						windowKinds.add(rawWindow.window);
						windows.push({
							window: rawWindow.window,
							remainingFraction: rawWindow.remainingFraction,
							resetTime: rawWindow.resetTime
						});
					}
					groups.push({
						group: rawGroup.group,
						modelCount,
						windows
					});
				}
				return {
					state: value.state,
					...typeof value.checkedAt === "string" ? { checkedAt: value.checkedAt } : {},
					groups
				};
			}
			return {
				state: value.state,
				...typeof value.checkedAt === "string" ? { checkedAt: value.checkedAt } : {}
			};
		}
		/** Parse the closed status envelope received by the browser. */
		function parseStatusResult(value) {
			if (!isRecord(value) || !hasExactKeys(value, ["status"])) return void 0;
			return parseStatus(value.status);
		}
		function parseStatus(value) {
			if (!isRecord(value) || !hasAllowedKeys(value, [
				"pluginId",
				"phase",
				"privateSelfUse",
				"singleAccount",
				"riskAcknowledgementRequired",
				"riskAcknowledged",
				"login",
				"credential",
				"revoke",
				"capabilities"
			]) || value.pluginId !== "dsh-antigravity-auth" || value.phase !== "bootstrap" || value.privateSelfUse !== true || value.singleAccount !== true || value.riskAcknowledgementRequired !== true || typeof value.riskAcknowledged !== "boolean" || !Array.isArray(value.capabilities)) return void 0;
			const login = parseLoginStatus(value.login);
			if (login === void 0) return void 0;
			const credential = value.credential === void 0 ? void 0 : parseCredentialStatus(value.credential);
			if (value.credential !== void 0 && credential === void 0) return void 0;
			const revoke = value.revoke === void 0 ? void 0 : parseRevokeStatus(value.revoke);
			if (value.revoke !== void 0 && revoke === void 0) return void 0;
			const seen = /* @__PURE__ */ new Set();
			const capabilities = [];
			for (const capability of value.capabilities) {
				const parsed = parseCapability(capability);
				if (parsed === void 0 || seen.has(parsed.id)) return void 0;
				seen.add(parsed.id);
				capabilities.push(parsed);
			}
			if (seen.size !== CAPABILITY_ROW_IDS.length || CAPABILITY_ROW_IDS.some((id) => !seen.has(id))) return void 0;
			return {
				pluginId: "dsh-antigravity-auth",
				phase: "bootstrap",
				privateSelfUse: true,
				singleAccount: true,
				riskAcknowledgementRequired: true,
				riskAcknowledged: value.riskAcknowledged,
				login,
				...credential === void 0 ? {} : { credential },
				...revoke === void 0 ? {} : { revoke },
				capabilities
			};
		}
		function parseCredentialStatus(value) {
			if (!isRecord(value) || typeof value.state !== "string" || !isCredentialState(value.state) || typeof value.configured !== "boolean" || !hasAllowedKeys(value, [
				"state",
				"configured",
				"expiresAt",
				"lastRefreshAt",
				"errorCode"
			])) return void 0;
			if (value.expiresAt !== void 0 && !isIsoTime(value.expiresAt)) return void 0;
			if (value.lastRefreshAt !== void 0 && !isIsoTime(value.lastRefreshAt)) return void 0;
			if (value.errorCode !== void 0 && (typeof value.errorCode !== "string" || !isCredentialErrorCode(value.errorCode))) return void 0;
			return {
				state: value.state,
				configured: value.configured,
				...typeof value.expiresAt === "string" ? { expiresAt: value.expiresAt } : {},
				...typeof value.lastRefreshAt === "string" ? { lastRefreshAt: value.lastRefreshAt } : {},
				...typeof value.errorCode === "string" ? { errorCode: value.errorCode } : {}
			};
		}
		function parseRevokeStatus(value) {
			if (!isRecord(value) || typeof value.state !== "string" || !isRevokeState(value.state) || !hasAllowedKeys(value, ["state", "errorCode"])) return void 0;
			if (value.errorCode !== void 0 && (typeof value.errorCode !== "string" || !isRevokeErrorCode(value.errorCode))) return void 0;
			return {
				state: value.state,
				...typeof value.errorCode === "string" ? { errorCode: value.errorCode } : {}
			};
		}
		function parseLoginStatus(value) {
			if (!isRecord(value) || typeof value.phase !== "string" || !isLoginPhase(value.phase) || typeof value.configured !== "boolean" || typeof value.projectAvailable !== "boolean") return void 0;
			const allowed = [
				"phase",
				"configured",
				"projectAvailable",
				"authorizationUrl",
				"expiresAt",
				"maskedEmail",
				"errorCode"
			];
			if (Object.keys(value).some((key) => !allowed.includes(key))) return void 0;
			if (value.authorizationUrl !== void 0 && !isSafeAuthorizationUrl(value.authorizationUrl)) return void 0;
			if (value.expiresAt !== void 0 && !isIsoTime(value.expiresAt)) return void 0;
			if (value.maskedEmail !== void 0 && (typeof value.maskedEmail !== "string" || !isMaskedEmail(value.maskedEmail))) return void 0;
			if (value.errorCode !== void 0 && !isLoginErrorCode(value.errorCode)) return void 0;
			if (isErrorPhase(value.phase) ? typeof value.errorCode !== "string" : value.errorCode !== void 0) return void 0;
			if (value.phase === "pending" ? typeof value.authorizationUrl !== "string" || typeof value.expiresAt !== "string" : value.authorizationUrl !== void 0) return void 0;
			return {
				phase: value.phase,
				configured: value.configured,
				projectAvailable: value.projectAvailable,
				...typeof value.authorizationUrl === "string" ? { authorizationUrl: value.authorizationUrl } : {},
				...typeof value.expiresAt === "string" ? { expiresAt: value.expiresAt } : {},
				...typeof value.maskedEmail === "string" ? { maskedEmail: value.maskedEmail } : {},
				...typeof value.errorCode === "string" ? { errorCode: value.errorCode } : {}
			};
		}
		function parseCapability(value) {
			if (!isRecord(value) || !hasExactKeys(value, [
				"id",
				"state",
				"reasonCode"
			])) return void 0;
			if (!isCapabilityRowId(value.id) || !isCapabilityGateState(value.state) || !isCapabilityReasonCode(value.reasonCode)) return;
			return {
				id: value.id,
				state: value.state,
				reasonCode: value.reasonCode
			};
		}
		function parseAcknowledgementResult(value) {
			return isRecord(value) && hasExactKeys(value, ["acknowledged"]) && value.acknowledged === true ? { acknowledged: true } : void 0;
		}
		function parseLoginResult(value) {
			return isRecord(value) && hasExactKeys(value, [
				"started",
				"phase",
				"authorizationUrl",
				"expiresAt"
			]) && value.started === true && value.phase === "pending" && isSafeAuthorizationUrl(value.authorizationUrl) && isIsoTime(value.expiresAt) ? {
				started: true,
				phase: "pending",
				authorizationUrl: value.authorizationUrl,
				expiresAt: value.expiresAt
			} : void 0;
		}
		function parseActionResult(value) {
			if (!isRecord(value) || typeof value.phase !== "string" || !isLoginPhase(value.phase)) return void 0;
			if (Object.keys(value).some((key) => key !== "phase" && key !== "errorCode")) return void 0;
			if (value.errorCode !== void 0 && !isLoginErrorCode(value.errorCode)) return void 0;
			return {
				phase: value.phase,
				...typeof value.errorCode === "string" ? { errorCode: value.errorCode } : {}
			};
		}
		function parseLogoutResult(value) {
			return isRecord(value) && hasExactKeys(value, ["state"]) && value.state === "logged-out" ? { state: "logged-out" } : void 0;
		}
		function parseRevokeResult(value) {
			if (!isRecord(value) || typeof value.state !== "string") return void 0;
			if (value.state === "confirmation-required" || value.state === "revoked" || value.state === "logged-out" || value.state === "superseded") return hasExactKeys(value, ["state"]) ? { state: value.state } : void 0;
			if (value.state === "failed" && hasExactKeys(value, ["state", "errorCode"]) && typeof value.errorCode === "string" && isRevokeErrorCode(value.errorCode)) return {
				state: "failed",
				errorCode: value.errorCode
			};
		}
		function isSafeAuthorizationUrl(value) {
			if (typeof value !== "string" || value.length === 0 || value.length > 8192) return false;
			try {
				const parsed = new URL(value);
				const allowed = /* @__PURE__ */ new Set([
					"client_id",
					"response_type",
					"redirect_uri",
					"scope",
					"code_challenge",
					"code_challenge_method",
					"state",
					"access_type",
					"prompt"
				]);
				for (const [key, parameter] of parsed.searchParams) if (!allowed.has(key) || parsed.searchParams.getAll(key).length !== 1 || !isBoundedSafeText(parameter, 4096)) return false;
				const state = parsed.searchParams.get("state");
				const clientId = parsed.searchParams.get("client_id");
				const challenge = parsed.searchParams.get("code_challenge");
				const prompt = parsed.searchParams.get("prompt");
				return parsed.protocol === "https:" && parsed.hostname === "accounts.google.com" && parsed.port === "" && parsed.username === "" && parsed.password === "" && parsed.pathname === "/o/oauth2/v2/auth" && parsed.hash.length === 0 && typeof state === "string" && /^[A-Za-z0-9_-]{43}$/u.test(state) && (clientId === null || clientId.length <= 256 && clientId.endsWith(".apps.googleusercontent.com")) && (challenge === null || /^[A-Za-z0-9_-]{43}$/u.test(challenge)) && (parsed.searchParams.get("response_type") === null || parsed.searchParams.get("response_type") === "code") && (parsed.searchParams.get("redirect_uri") === null || parsed.searchParams.get("redirect_uri") === "http://localhost:51121/oauth-callback") && (parsed.searchParams.get("code_challenge_method") === null || parsed.searchParams.get("code_challenge_method") === "S256") && (parsed.searchParams.get("access_type") === null || parsed.searchParams.get("access_type") === "offline") && (prompt === null || prompt === "consent" || prompt === "select_account consent");
			} catch {
				return false;
			}
		}
		function isMaskedEmail(value) {
			return isBoundedSafeText(value, 256) && /^.[*]{3}[^@]*@[^@\s]+$/u.test(value);
		}
		function isErrorPhase(value) {
			return value === "cancelled" || value === "expired" || value === "port-conflict" || value === "failed";
		}
		function isQuotaState(value) {
			return value === "available" || value === "unauthenticated" || value === "forbidden" || value === "rate-limited" || value === "offline" || value === "timeout" || value === "protocol-drift";
		}
		function isIsoTime(value) {
			if (typeof value !== "string" || value.length > 64) return false;
			const timestamp = Date.parse(value);
			return Number.isFinite(timestamp) && new Date(timestamp).toISOString() === value;
		}
		function isCapabilityRowId(value) {
			return typeof value === "string" && CAPABILITY_ROW_IDS.includes(value);
		}
		function isCapabilityGateState(value) {
			return value === "available" || value === "disabled" || value === "poc-pending" || value === "protocol-drift";
		}
		function isCapabilityReasonCode(value) {
			return value === "gate-not-run" || value === "project-unavailable" || value === "capability-ready" || value === "unauthenticated" || value === "rate-limited" || value === "cancelled" || value === "gate-0-failed" || value === "gate-failed" || value === "unsupported-video" || value === "protocol-drift";
		}
		function isCredentialState(value) {
			return value === "logged-out" || value === "logged-in" || value === "refreshing" || value === "refresh-failed" || value === "re-login-required";
		}
		function isCredentialErrorCode(value) {
			return value === "client-not-configured" || value === "invalid-grant" || value === "network" || value === "timeout" || value === "rate-limited" || value === "server-error" || value === "http-error" || value === "invalid-response" || value === "conflict" || value === "storage" || value === "cancelled";
		}
		function isRevokeState(value) {
			return value === "idle" || value === "pending" || value === "confirmation-required" || value === "revoked" || value === "logged-out" || value === "failed" || value === "superseded";
		}
		function isRevokeErrorCode(value) {
			return value === "client-not-configured" || value === "network" || value === "timeout" || value === "rate-limited" || value === "server-error" || value === "http-error" || value === "invalid-response" || value === "storage";
		}
		function hasAllowedKeys(value, allowed) {
			return Object.keys(value).every((key) => allowed.includes(key));
		}
		function hasExactKeys(value, expected) {
			const keys = Object.keys(value).sort();
			const sortedExpected = [...expected].sort();
			return keys.length === sortedExpected.length && keys.every((key, index) => key === sortedExpected[index]);
		}
		function invalidResponse(endpoint) {
			return {
				ok: false,
				error: {
					code: "internal",
					message: `antigravity-auth: invalid ${endpoint} response from Host`,
					details: {}
				}
			};
		}
		function isRecord(value) {
			return typeof value === "object" && value !== null && !Array.isArray(value);
		}
		//#endregion
		//#region direct/legacy/src/client/locales.ts
		/** English and Chinese copy for the private bootstrap settings section. */
		const en = {
			nav: "Antigravity",
			title: "Antigravity Auth",
			intro: "Sign in with Antigravity Auth to access language models, image generation, web search, and video understanding.",
			riskTitle: "Before you continue",
			risk: "Google does not support third-party Antigravity login tools. Your account may be suspended or terminated.",
			terms: "Review the Google FAQ before continuing.",
			additionalTerms: "Review the Additional Terms.",
			singleAccount: "One active account at a time. This bundle does not provide an account pool or quota rotation.",
			riskAcknowledgement: "I understand the unofficial third-party login risk and want to continue.",
			acknowledgeBusy: "Saving acknowledgement…",
			acknowledgeFailed: "The risk acknowledgement could not be recorded.",
			login: "Start Antigravity login",
			startingLogin: "Starting login…",
			cancelLogin: "Cancel login",
			cancelLoginFailed: "The login cancellation failed.",
			openAuthorization: "Open the Google authorization page",
			loginReady: "Login is ready to start.",
			loginRequiresAck: "Acknowledge the risk before login can begin.",
			loginPending: "Login is waiting for the browser authorization callback.",
			loginSuccess: "Login completed successfully.",
			loginCancelled: "Login was cancelled.",
			loginExpired: "The login expired. Start again to receive a new authorization link.",
			loginPortConflict: "The fixed callback port is already in use. Close the conflicting process and try again.",
			loginFailed: "The login could not be completed safely.",
			clientNotConfigured: "Direct OAuth client is not configured. Configure both AGY_CLIENT_ID and AGY_CLIENT_SECRET, or the owner-only local client file.",
			credentialLoggedIn: "The Antigravity account is ready.",
			credentialRefreshing: "Refreshing the Antigravity access token…",
			credentialRefreshFailed: "The access token could not be refreshed. No fallback account or endpoint was used.",
			credentialReloginRequired: "The Antigravity grant requires login again.",
			credentialLoggedOut: "The Antigravity account is logged out on this Host.",
			logout: "Log out locally",
			logoutFailed: "The local logout could not be completed.",
			revoke: "Revoke Google grant",
			revokeConfirm: "Revoke this Google grant? This is separate from local logout.",
			revokePending: "Revoking the Google grant…",
			revokeSuccess: "The Google grant was revoked and local state was cleared.",
			revokeFailed: "The Google grant could not be revoked. Local state was retained.",
			revokeSuperseded: "The account changed before revocation completed. No newer account was cleared.",
			revokeConfirmationRequired: "Confirm revocation before contacting Google.",
			account: "Account",
			accountsTitle: "Direct accounts",
			accountsEmpty: "No direct accounts yet.",
			accountCurrent: "Current",
			accountSwitch: "Select",
			accountRemove: "Remove",
			accountRemoveConfirm: "Remove this saved direct account from this device?",
			accountActionFailed: "The account operation failed.",
			accountSwitchHelp: "A request already in progress continues with the account it started with.",
			projectAvailable: "Read-only project validation is available.",
			projectUnavailable: "No usable project is available.",
			projectAuthenticationFailed: "Project discovery requires a fresh authenticated grant.",
			projectForbidden: "This account is not allowed to use the discovered project.",
			projectRateLimited: "Project discovery was rate-limited. No fallback project was used.",
			projectOffline: "Project discovery is temporarily offline. No fallback project was used.",
			projectMalformed: "Project discovery returned a malformed response.",
			projectProtocolDrift: "Project discovery no longer matches the audited protocol.",
			expiresAt: "Authorization link expires",
			statusLoading: "Loading capability status…",
			statusFailed: "Capability status is unavailable.",
			retry: "Retry",
			capabilityTitle: "Capability gates",
			authLlm: "Auth / LLM",
			search: "Web Search",
			image: "Image",
			video: "Video",
			available: "Available",
			ready: "Ready",
			disabled: "Disabled",
			pocPending: "POC pending",
			protocolDrift: "Protocol drift",
			gateNotRun: "This capability gate has not been run.",
			gateUnauthenticated: "This gate requires a fresh authenticated grant.",
			gateRateLimited: "This gate was rate-limited; no fallback was attempted.",
			gateCancelled: "This gate run was cancelled.",
			gate0Failed: "The fixed Wire Identity was rejected by Gate 0.",
			gateFailed: "This capability gate failed safely.",
			unsupportedVideo: "The private endpoint rejected native video input.",
			acknowledged: "Risk acknowledged for this Host session.",
			settingsTitle: "Capability settings",
			toggleSearch: "Enable grounded Web Search",
			toggleImage: "Enable image generation and editing",
			toggleVideo: "Enable video understanding POC",
			settingsUnavailable: "Unavailable until login, project validation, the live gate, and a writable Host settings scope are ready.",
			modelsTitle: "Models",
			modelsSnapshot: "Showing the pinned audited snapshot; live availability has not been refreshed.",
			modelsLiveAvailable: "Live account availability was intersected with the pinned snapshot.",
			modelsRefreshFailed: "Live availability refresh failed safely; the pinned snapshot remains advisory.",
			modelsProtocolDrift: "Live model discovery no longer matches the audited protocol.",
			modelsSnapshotEntry: "Snapshot",
			modelsAvailableEntry: "Live available",
			modelsUnavailableEntry: "Unavailable to this account",
			modelsFailed: "Model availability could not be loaded safely.",
			modelsLoading: "Refreshing models…",
			modelsRefresh: "Refresh model availability",
			quotaTitle: "Usage and quota",
			quotaAvailable: "Quota is available from the current account.",
			quotaUnknown: "Quota has not been queried.",
			quotaUnauthenticated: "Log in to query quota.",
			quotaForbidden: "This account is not allowed to query quota.",
			quotaRateLimited: "Quota is rate-limited; try again later.",
			quotaOffline: "Quota is temporarily unavailable.",
			quotaProtocolDrift: "Quota protocol drift was detected; raw provider data was discarded.",
			quotaFailed: "Quota could not be loaded safely.",
			quotaLoading: "Refreshing quota…",
			quotaRefresh: "Refresh quota",
			quotaFiveHour: "Five-hour window",
			quotaWeekly: "Weekly window",
			searchCardIntro: "Google Antigravity Search Provider used by the stock web_search tool.",
			imageCardIntro: "Durable image generation tools for image-capable models (gemini-3.1-flash-image).",
			videoCardIntro: "Workspace MP4 video understanding tools for multimodal models (gemini-3.7-flash).",
			privacyNotice: "Share Antigravity login state and model routing.",
			relogin: "Log in again with Google",
			authCardTitle: "Login",
			authCardIntro: "Share Antigravity session and Antigravity model routing.",
			queryingQuota: "Querying quota…",
			geminiGroupTitle: "GEMINI MODELS",
			geminiGroupDesc: "Models within this group: Gemini Flash, Gemini Pro",
			claudeGptGroupTitle: "CLAUDE AND GPT MODELS",
			claudeGptGroupDesc: "Models within this group: Claude Opus, Claude Sonnet, GPT-OSS",
			window5hTitle: "Five Hour Limit Remaining",
			windowWeeklyTitle: "Weekly Limit Remaining",
			quotaFooterNotice: "No token value is ever sent to the Web client, settings, logs, events, or tool metadata.",
			refreshStatus: "Refresh status",
			remaining: "remaining",
			refreshesIn: "Refreshes in {time}",
			quotaDayUnit: "d"
		};
		const zh = {
			nav: "Antigravity",
			title: "Antigravity Auth",
			intro: "通过 Antigravity Auth 登录，使用语言模型、图片生成、网页搜索和视频理解能力。",
			riskTitle: "继续前请确认",
			risk: "Google 不支持第三方 Antigravity 登录工具，账号可能被暂停或终止。",
			terms: "继续前请阅读 Google FAQ。",
			additionalTerms: "请阅读 Additional Terms。",
			singleAccount: "同一时刻只有一个活动账号。本能力包不提供账号池或额度轮换。",
			riskAcknowledgement: "我已了解非官方第三方登录风险，并确认继续。",
			acknowledgeBusy: "正在保存确认…",
			acknowledgeFailed: "无法记录风险确认。",
			login: "开始 Antigravity 登录",
			startingLogin: "正在启动登录…",
			cancelLogin: "取消登录",
			cancelLoginFailed: "取消登录失败。",
			openAuthorization: "打开 Google 授权页面",
			loginReady: "可以开始登录。",
			loginRequiresAck: "请先确认风险，才能开始登录。",
			loginPending: "等待浏览器授权回调。",
			loginSuccess: "登录已成功完成。",
			loginCancelled: "登录已取消。",
			loginExpired: "登录已过期，请重新开始以获取新的授权链接。",
			loginPortConflict: "固定回调端口已被占用，请关闭冲突进程后重试。",
			loginFailed: "登录无法安全完成。",
			clientNotConfigured: "直连 OAuth 客户端未配置。请同时设置 AGY_CLIENT_ID 和 AGY_CLIENT_SECRET，或配置本机专用的客户端凭据文件。",
			credentialLoggedIn: "Antigravity 账号已就绪。",
			credentialRefreshing: "正在刷新 Antigravity access token…",
			credentialRefreshFailed: "无法刷新 access token，未使用备用账号或 endpoint。",
			credentialReloginRequired: "该 Antigravity grant 需要重新登录。",
			credentialLoggedOut: "该 Host 上的 Antigravity 账号已登出。",
			logout: "在本地登出",
			logoutFailed: "本地登出未完成。",
			revoke: "撤销 Google grant",
			revokeConfirm: "确定撤销此 Google grant 吗？这与本地登出是分开的操作。",
			revokePending: "正在撤销 Google grant…",
			revokeSuccess: "Google grant 已撤销，本地状态已清除。",
			revokeFailed: "无法撤销 Google grant，本地状态已保留。",
			revokeSuperseded: "账号在撤销完成前发生变化，未清除新账号。",
			revokeConfirmationRequired: "请先确认撤销，再联系 Google。",
			account: "账号",
			accountsTitle: "直连账号",
			accountsEmpty: "还没有直连账号。",
			accountCurrent: "当前",
			accountSwitch: "切换",
			accountRemove: "移除",
			accountRemoveConfirm: "从本机移除这个已保存的直连账号？",
			accountActionFailed: "账号操作失败。",
			accountSwitchHelp: "已在进行中的请求继续使用启动时的账号。",
			projectAvailable: "只读 project 验证可用。",
			projectUnavailable: "没有可用的 project。",
			projectAuthenticationFailed: "project discovery 需要重新认证的 grant。",
			projectForbidden: "该账号没有权限使用已发现的 project。",
			projectRateLimited: "project discovery 被限流，未使用备用 project。",
			projectOffline: "project discovery 暂时离线，未使用备用 project。",
			projectMalformed: "project discovery 返回了格式错误的响应。",
			projectProtocolDrift: "project discovery 已偏离经过审计的协议。",
			expiresAt: "授权链接过期时间",
			statusLoading: "正在加载能力状态…",
			statusFailed: "能力状态不可用。",
			retry: "重试",
			capabilityTitle: "能力门禁",
			authLlm: "认证 / LLM",
			search: "网页搜索",
			image: "图片",
			video: "视频",
			available: "可用",
			ready: "就绪",
			disabled: "已禁用",
			pocPending: "POC 待验证",
			protocolDrift: "协议漂移",
			gateNotRun: "该能力门禁尚未运行。",
			gateUnauthenticated: "该门禁需要新的有效认证 grant。",
			gateRateLimited: "该门禁运行被限流，未尝试任何 fallback。",
			gateCancelled: "该门禁运行已取消。",
			gate0Failed: "固定 Wire Identity 未通过 Gate 0。",
			gateFailed: "该能力门禁已安全失败。",
			unsupportedVideo: "私有 endpoint 拒绝了原生视频输入。",
			acknowledged: "本 Host 会话已确认风险。",
			settingsTitle: "能力设置",
			toggleSearch: "启用有依据的网页搜索",
			toggleImage: "启用图片生成与编辑",
			toggleVideo: "启用视频理解 POC",
			settingsUnavailable: "登录、project 验证、对应 live gate 和可写 Host 设置范围就绪后才能使用。",
			modelsTitle: "模型",
			modelsSnapshot: "当前显示已审计的固定快照；尚未刷新真实账号可用性。",
			modelsLiveAvailable: "已将真实账号可用性与固定快照取交集。",
			modelsRefreshFailed: "真实可用性刷新已安全失败；固定快照仍仅供参考。",
			modelsProtocolDrift: "真实模型发现已不再符合已审计协议。",
			modelsSnapshotEntry: "固定快照",
			modelsAvailableEntry: "真实可用",
			modelsUnavailableEntry: "当前账号不可用",
			modelsFailed: "无法安全加载模型可用性。",
			modelsLoading: "正在刷新模型…",
			modelsRefresh: "刷新模型可用性",
			quotaTitle: "用量与配额",
			quotaAvailable: "当前账号的配额可用。",
			quotaUnknown: "尚未查询配额。",
			quotaUnauthenticated: "登录后才能查询配额。",
			quotaForbidden: "该账号无权查询配额。",
			quotaRateLimited: "配额查询被限流，请稍后重试。",
			quotaOffline: "配额暂时不可用。",
			quotaProtocolDrift: "检测到配额协议漂移，已丢弃原始 provider 数据。",
			quotaFailed: "无法安全加载配额。",
			quotaLoading: "正在刷新配额…",
			quotaRefresh: "刷新配额",
			quotaFiveHour: "五小时窗口",
			quotaWeekly: "每周窗口",
			searchCardIntro: "供内置 web_search 工具使用的 Google Antigravity 全局搜索能力。",
			imageCardIntro: "面向支持图片模型的持久化 generate_image 工具（gemini-3.1-flash-image）。",
			videoCardIntro: "面向本地 MP4 视频文件的多模态 analyze_video 理解工具。",
			privacyNotice: "共享 Antigravity 登录态与模型路由。",
			relogin: "重新登录 Google",
			authCardTitle: "登录",
			authCardIntro: "共享 Antigravity 登录态与 Antigravity 模型路由。",
			queryingQuota: "正在查询额度…",
			geminiGroupTitle: "GEMINI 模型",
			geminiGroupDesc: "包含模型：Gemini Flash, Gemini Pro",
			claudeGptGroupTitle: "CLAUDE 与 GPT 模型",
			claudeGptGroupDesc: "包含模型：Claude Opus, Claude Sonnet, GPT-OSS",
			window5hTitle: "5 小时限额剩余",
			windowWeeklyTitle: "周限额剩余",
			quotaFooterNotice: "任何 Token 值都不会发送到 Web 客户端、设置、日志、事件或工具元数据。",
			refreshStatus: "刷新状态",
			remaining: "剩余",
			refreshesIn: "{time} 后刷新",
			quotaDayUnit: "天"
		};
		//#endregion
		//#region src/client/index.ts
		const { createElement: h, useState, useEffect, useRef } = require("react");
		const reactDom = require("react-dom");
		const win = globalThis;
		const portalToBody = (node) => {
			const body = win.document?.body ?? (typeof document !== "undefined" ? document.body : null);
			if (body && reactDom && typeof reactDom.createPortal === "function") return reactDom.createPortal(node, body);
			return node;
		};
		const name = "dsh-agy-link-client";
		const inject = ["slots", "locale"];
		const base = win.location?.origin ?? "";
		const STATUS_CACHE_KEY = "dsh_agy_status_cache";
		function loadInitialStatusCache() {
			try {
				const raw = win.localStorage?.getItem(STATUS_CACHE_KEY);
				if (raw) {
					const parsed = JSON.parse(raw);
					if (parsed && typeof parsed === "object") return parsed;
				}
			} catch {}
			return null;
		}
		let statusCache = loadInitialStatusCache();
		async function getStatus() {
			try {
				const init = {};
				if (typeof AbortSignal !== "undefined" && typeof AbortSignal.timeout === "function") init.signal = AbortSignal.timeout(5e3);
				const res = await win.fetch?.(base + "/plugins/agy-link/status", init);
				if (!res || !res.ok) return null;
				return await res.json();
			} catch {
				return null;
			}
		}
		async function postJson(path, body) {
			try {
				const res = await win.fetch?.(base + path, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(body)
				});
				if (!res) return null;
				try {
					const payload = await res.json();
					if (!res.ok && payload !== null && typeof payload === "object") return {
						ok: false,
						...payload
					};
					return payload;
				} catch {
					return { ok: res.ok };
				}
			} catch {
				return null;
			}
		}
		const statusListeners = /* @__PURE__ */ new Set();
		let statusPollTimer = null;
		let statusPollInterval = 3e3;
		let statusFetchSeq = 0;
		function isStatusEqual(a, b) {
			if (a === b) return true;
			if (a === null || b === null) return false;
			try {
				return JSON.stringify(a) === JSON.stringify(b);
			} catch {
				return false;
			}
		}
		function notifyStatus(st) {
			statusCache = st;
			try {
				win.localStorage?.setItem(STATUS_CACHE_KEY, JSON.stringify(st));
			} catch {}
			for (const fn of [...statusListeners]) try {
				fn(st);
			} catch {}
		}
		async function statusPollTick() {
			const seq = ++statusFetchSeq;
			const st = await getStatus();
			if (st !== null && seq === statusFetchSeq) {
				if (!isStatusEqual(statusCache, st)) notifyStatus(st);
			}
		}
		function ensureStatusPolling() {
			if (statusPollTimer !== null) {
				if (statusPollInterval !== 3e3) {
					clearInterval(statusPollTimer);
					statusPollTimer = null;
				} else return;
			}
			statusPollInterval = 3e3;
			statusPollTick();
			statusPollTimer = setInterval(() => {
				statusPollTick();
			}, 3e3);
		}
		function stopStatusPollingIfIdle() {
			if (statusListeners.size === 0 && statusPollTimer !== null && statusPollInterval === 3e3) {
				clearInterval(statusPollTimer);
				statusPollInterval = 15e3;
				statusPollTimer = setInterval(() => {
					statusPollTick();
				}, 15e3);
			}
		}
		/**
		* Subscribe a component to the shared status poll. Returns the latest
		* snapshot plus a manual refresh that keeps the last good snapshot on a
		* transient failure (a failed refresh used to flip the whole panel back to
		* its loading state).
		*/
		function useAgyStatus() {
			const [status, setStatus] = useState(statusCache);
			useEffect(() => {
				statusListeners.add(setStatus);
				ensureStatusPolling();
				return () => {
					statusListeners.delete(setStatus);
					stopStatusPollingIfIdle();
				};
			}, []);
			const refresh = async () => {
				const st = await getStatus();
				if (st !== null && !isStatusEqual(statusCache, st)) notifyStatus(st);
			};
			return {
				status,
				refresh
			};
		}
		/** Global modal state for opening Antigravity console dialog from footer shortcut or header status */
		const agyModalStore = {
			open: false,
			listeners: /* @__PURE__ */ new Set(),
			setOpen(v) {
				if (agyModalStore.open === v) return;
				agyModalStore.open = v;
				setOverlaySuspended(v);
				if (typeof document !== "undefined" && document.documentElement) document.documentElement.classList.toggle("agy-modal-open", v);
				agyModalStore.listeners.forEach((fn) => fn());
			},
			subscribe(fn) {
				agyModalStore.listeners.add(fn);
				return () => {
					agyModalStore.listeners.delete(fn);
				};
			}
		};
		/**
		* Global modal host manager: ensures exactly one mounted session header
		* hosts the modal dialog portal reactively. The most recently focused or mounted
		* header is prioritized immediately to prevent host handoff flicker when opened.
		* If the primary header unmounts, the next available header is seamlessly notified.
		*/
		const modalHostManager = {
			listeners: /* @__PURE__ */ new Map(),
			activeId: null,
			register(id, onChange) {
				modalHostManager.listeners.set(id, onChange);
				if (modalHostManager.activeId === null) modalHostManager.activeId = id;
				onChange(modalHostManager.activeId === id);
				return () => {
					modalHostManager.listeners.delete(id);
					if (modalHostManager.activeId === id) {
						const next = modalHostManager.listeners.keys().next().value ?? null;
						modalHostManager.activeId = next;
						if (next) try {
							modalHostManager.listeners.get(next)?.(true);
						} catch {}
					}
				};
			},
			claim(id) {
				if (modalHostManager.activeId !== id) {
					const prev = modalHostManager.activeId;
					modalHostManager.activeId = id;
					if (prev && prev !== id) try {
						modalHostManager.listeners.get(prev)?.(false);
					} catch {}
					try {
						modalHostManager.listeners.get(id)?.(true);
					} catch {}
				}
			}
		};
		/**
		* Format reset timestamp into readable date/time + relative countdown.
		*/
		function formatQuotaWindow(t, resetTimeStr) {
			if (!resetTimeStr) return {
				resetText: "",
				expired: false
			};
			try {
				const d = new Date(resetTimeStr);
				const diffMs = d.getTime() - Date.now();
				if (Number.isNaN(d.getTime()) || diffMs <= 0) return {
					resetText: "",
					expired: true
				};
				const totalMins = Math.ceil(diffMs / 6e4);
				const days = Math.floor(totalMins / 1440);
				const hours = Math.floor(totalMins % 1440 / 60);
				const mins = totalMins % 60;
				const isWeekly = days >= 1;
				const countdown = days > 0 ? `${days}${t("duration.day")} ${hours}${t("duration.hour")}` : hours > 0 ? `${hours}${t("duration.hour")} ${mins}${t("duration.minute")}` : `${mins}${t("duration.minute")}`;
				const hh = d.getHours().toString().padStart(2, "0");
				const mm = d.getMinutes().toString().padStart(2, "0");
				return {
					resetText: isWeekly ? `${d.getMonth() + 1}/${d.getDate()} ${hh}:${mm} (${countdown})` : `${hh}:${mm} (${countdown})`,
					expired: false
				};
			} catch {
				return {
					resetText: "",
					expired: true
				};
			}
		}
		/** Inline brand logo (Gemini / Claude / OpenAI) as a crisp SVG mark. */
		function brandIcon(key, size = 13) {
			return h("svg", {
				viewBox: "0 0 24 24",
				width: size,
				height: size,
				"aria-hidden": true,
				style: {
					display: "inline-block",
					verticalAlign: "-2px",
					flexShrink: 0
				}
			}, h("path", {
				d: BRAND_PATHS[key],
				fill: BRAND_COLORS[key]
			}));
		}
		/** Clean outline/filled SVG icon (Lucide-style), zero emoji dependency. */
		function uiIcon(key, size = 12, color = "currentColor") {
			const p = UI_PATHS[key];
			const isFilled = key === "star";
			return h("svg", {
				viewBox: "0 0 24 24",
				width: size,
				height: size,
				"aria-hidden": true,
				style: {
					display: "inline-block",
					verticalAlign: "-1.5px",
					flexShrink: 0
				}
			}, h("path", {
				d: p,
				fill: isFilled ? color : "none",
				stroke: isFilled ? "none" : color,
				"stroke-width": isFilled ? void 0 : 2,
				"stroke-linecap": isFilled ? void 0 : "round",
				"stroke-linejoin": isFilled ? void 0 : "round"
			}));
		}
		const FAMILY_BRAND = {
			google: "gemini",
			argon: "gemini",
			anthropic: "claude",
			openai: "openai"
		};
		/**
		* Antigravity logo mark: 3D orbit sphere with specular highlight, luminous front/back rings
		* and twin satellite nodes matching the official assets/icon.svg.
		*/
		function agyIcon(size = 16) {
			const uid = "agy-logo";
			return h("svg", {
				viewBox: "0 0 36 36",
				width: size,
				height: size,
				fill: "none",
				"aria-hidden": true,
				style: {
					display: "inline-block",
					verticalAlign: "-2.5px",
					flexShrink: 0
				}
			}, h("defs", null, h("linearGradient", {
				id: `${uid}-orb`,
				x1: "12",
				y1: "11",
				x2: "25",
				y2: "25",
				gradientUnits: "userSpaceOnUse"
			}, h("stop", {
				offset: "0%",
				"stop-color": "#38BDF8"
			}), h("stop", {
				offset: "45%",
				"stop-color": "#6366F1"
			}), h("stop", {
				offset: "85%",
				"stop-color": "#9333EA"
			}), h("stop", {
				offset: "100%",
				"stop-color": "#C026D3"
			})), h("linearGradient", {
				id: `${uid}-rf`,
				x1: "6",
				y1: "24",
				x2: "31",
				y2: "12",
				gradientUnits: "userSpaceOnUse"
			}, h("stop", {
				offset: "0%",
				"stop-color": "#00D2FF"
			}), h("stop", {
				offset: "40%",
				"stop-color": "#38BDF8"
			}), h("stop", {
				offset: "70%",
				"stop-color": "#818CF8"
			}), h("stop", {
				offset: "100%",
				"stop-color": "#F43F5E"
			})), h("linearGradient", {
				id: `${uid}-rb`,
				x1: "7",
				y1: "12",
				x2: "29",
				y2: "24",
				gradientUnits: "userSpaceOnUse"
			}, h("stop", {
				offset: "0%",
				"stop-color": "#38BDF8",
				"stop-opacity": "0.4"
			}), h("stop", {
				offset: "100%",
				"stop-color": "#A855F7",
				"stop-opacity": "0.4"
			})), h("linearGradient", {
				id: `${uid}-hl`,
				x1: "14",
				y1: "12",
				x2: "19",
				y2: "18",
				gradientUnits: "userSpaceOnUse"
			}, h("stop", {
				offset: "0%",
				"stop-color": "#FFFFFF",
				"stop-opacity": "0.65"
			}), h("stop", {
				offset: "100%",
				"stop-color": "#FFFFFF",
				"stop-opacity": "0.05"
			}))), h("path", {
				d: "M 6.8 14.2 C 8.2 9.6 17.8 7.2 26.2 10.8 C 28.0 11.6 29.3 12.6 30.2 13.8",
				stroke: `url(#${uid}-rb)`,
				"stroke-width": "2.4",
				"stroke-linecap": "round"
			}), h("circle", {
				cx: 18,
				cy: 18,
				r: 7.5,
				fill: `url(#${uid}-orb)`
			}), h("path", {
				d: "M 13.2 15.2 A 5.5 5.5 0 0 1 21.0 13.0 A 6.2 6.2 0 0 0 14.0 18.0 Z",
				fill: `url(#${uid}-hl)`
			}), h("path", {
				d: "M 30.2 13.8 C 31.4 18.2 21.8 26.2 12.8 24.2 C 9.4 23.4 7.4 21.8 6.6 19.6",
				stroke: `url(#${uid}-rf)`,
				"stroke-width": "2.6",
				"stroke-linecap": "round"
			}), h("circle", {
				cx: 8.2,
				cy: 18.2,
				r: 2.2,
				fill: "#00D2FF"
			}), h("circle", {
				cx: 8.2,
				cy: 18.2,
				r: 1,
				fill: "#FFFFFF"
			}), h("circle", {
				cx: 28.4,
				cy: 20.4,
				r: 1.8,
				fill: "#F43F5E"
			}), h("circle", {
				cx: 28.4,
				cy: 20.4,
				r: .8,
				fill: "#FFFFFF"
			}));
		}
		/**
		* Settings dialog navigation icon replacement for Antigravity.
		* DSH settings shell projects nav glyphs from a closed list and falls back to a generic gear
		* for third-party sections. We dynamically inject a stylesheet matching Antigravity's section
		* row to display the custom Antigravity brand logo.
		*/
		const NAV_ICON_MARKER = "data-dsh-agy-nav-icon";
		const NAV_ROW_SELECTOR = "[role=\"dialog\"] nav button, [role=\"dialog\"] nav a, [role=\"dialog\"] aside button, .dsh-settings-nav button";
		const AGY_NAV_LOGO_SVG = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 36 36\" fill=\"none\"><defs><linearGradient id=\"an-orb\" x1=\"12\" y1=\"11\" x2=\"25\" y2=\"25\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0%\" stop-color=\"#38BDF8\"/><stop offset=\"45%\" stop-color=\"#6366F1\"/><stop offset=\"85%\" stop-color=\"#9333EA\"/><stop offset=\"100%\" stop-color=\"#C026D3\"/></linearGradient><linearGradient id=\"an-rf\" x1=\"6\" y1=\"24\" x2=\"31\" y2=\"12\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0%\" stop-color=\"#00D2FF\"/><stop offset=\"40%\" stop-color=\"#38BDF8\"/><stop offset=\"70%\" stop-color=\"#818CF8\"/><stop offset=\"100%\" stop-color=\"#F43F5E\"/></linearGradient><linearGradient id=\"an-rb\" x1=\"7\" y1=\"12\" x2=\"29\" y2=\"24\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0%\" stop-color=\"#38BDF8\" stop-opacity=\"0.4\"/><stop offset=\"100%\" stop-color=\"#A855F7\" stop-opacity=\"0.4\"/></linearGradient><linearGradient id=\"an-hl\" x1=\"14\" y1=\"12\" x2=\"19\" y2=\"18\" gradientUnits=\"userSpaceOnUse\"><stop offset=\"0%\" stop-color=\"#FFFFFF\" stop-opacity=\"0.65\"/><stop offset=\"100%\" stop-color=\"#FFFFFF\" stop-opacity=\"0.05\"/></linearGradient></defs><path d=\"M 6.8 14.2 C 8.2 9.6 17.8 7.2 26.2 10.8 C 28.0 11.6 29.3 12.6 30.2 13.8\" stroke=\"url(#an-rb)\" stroke-width=\"2.4\" stroke-linecap=\"round\"/><circle cx=\"18\" cy=\"18\" r=\"7.5\" fill=\"url(#an-orb)\"/><path d=\"M 13.2 15.2 A 5.5 5.5 0 0 1 21.0 13.0 A 6.2 6.2 0 0 0 14.0 18.0 Z\" fill=\"url(#an-hl)\"/><path d=\"M 30.2 13.8 C 31.4 18.2 21.8 26.2 12.8 24.2 C 9.4 23.4 7.4 21.8 6.6 19.6\" stroke=\"url(#an-rf)\" stroke-width=\"2.6\" stroke-linecap=\"round\"/><circle cx=\"8.2\" cy=\"18.2\" r=\"2.2\" fill=\"#00D2FF\"/><circle cx=\"8.2\" cy=\"18.2\" r=\"1.0\" fill=\"#FFFFFF\"/><circle cx=\"28.4\" cy=\"20.4\" r=\"1.8\" fill=\"#F43F5E\"/><circle cx=\"28.4\" cy=\"20.4\" r=\"0.8\" fill=\"#FFFFFF\"/></svg>";
		function agyNavLogoUrl() {
			return `data:image/svg+xml,${encodeURIComponent(AGY_NAV_LOGO_SVG)}`;
		}
		function isOwnNavRow(rowText, wantedLabel) {
			const wanted = String(wantedLabel ?? "").trim().toLowerCase();
			const text = String(rowText ?? "").trim().toLowerCase();
			if (!wanted && !text) return false;
			return text === wanted || text.includes("antigravity");
		}
		function navIconCss(logoUrl) {
			return [
				`[${NAV_ICON_MARKER}] > svg { display: none !important; }`,
				`[${NAV_ICON_MARKER}] > [class*="icon"] > svg { display: none !important; }`,
				`[${NAV_ICON_MARKER}]::before {`,
				`  content: '';`,
				`  flex: none;`,
				`  width: 16px;`,
				`  height: 16px;`,
				`  background-image: url("${logoUrl}");`,
				`  background-repeat: no-repeat;`,
				`  background-position: center;`,
				`  background-size: 16px 16px;`,
				`  opacity: 0.92;`,
				`  transition: opacity 0.15s ease, transform 0.15s ease;`,
				`}`,
				`[${NAV_ICON_MARKER}]:hover::before,`,
				`[${NAV_ICON_MARKER}][aria-selected="true"]::before,`,
				`[${NAV_ICON_MARKER}].active::before,`,
				`[${NAV_ICON_MARKER}][data-state="active"]::before {`,
				`  opacity: 1;`,
				`  transform: scale(1.08);`,
				`}`
			].join("\n");
		}
		function installSettingsNavIcon(ctx, resolveLabel) {
			if (typeof document === "undefined") return () => {};
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-agy-link";
			tag.dataset.pluginCss = "dsh-agy-link/settings-nav-icon";
			tag.textContent = navIconCss(agyNavLogoUrl());
			const head = document.head ?? document.documentElement;
			if (head) head.appendChild(tag);
			let disposed = false;
			let scheduled = false;
			const sync = () => {
				scheduled = false;
				if (disposed) return;
				const wanted = resolveLabel();
				for (const row of Array.from(document.querySelectorAll(NAV_ROW_SELECTOR))) {
					const shouldMark = isOwnNavRow(row.textContent, wanted);
					if (shouldMark === row.hasAttribute(NAV_ICON_MARKER)) continue;
					if (shouldMark) row.setAttribute(NAV_ICON_MARKER, "");
					else row.removeAttribute(NAV_ICON_MARKER);
				}
			};
			const schedule = () => {
				if (scheduled || disposed) return;
				scheduled = true;
				queueMicrotask(sync);
			};
			sync();
			let observer = null;
			const setupObserver = () => {
				if (disposed || !document.body) return;
				try {
					observer = new MutationObserver(schedule);
					observer.observe(document.body, {
						childList: true,
						subtree: true,
						attributeFilter: [NAV_ICON_MARKER]
					});
				} catch (err) {
					console.warn("[dsh-agy-link] nav icon observer setup failed:", err);
				}
			};
			if (document.readyState === "loading") window.addEventListener("DOMContentLoaded", setupObserver, { once: true });
			else setupObserver();
			return () => {
				disposed = true;
				if (observer !== null) {
					observer.disconnect();
					observer = null;
				}
				for (const row of Array.from(document.querySelectorAll(`[${NAV_ICON_MARKER}]`))) row.removeAttribute(NAV_ICON_MARKER);
				tag.remove();
			};
		}
		/**
		* One family's quota block: brand mark + 5h/weekly bars with reset countdowns
		* and cooldown notes. Module-level so the settings section and the Plugins-page
		* dashboard render IDENTICAL quota visuals from one implementation.
		*/
		function renderFamilyQuotaBar(t, label, familyKey, acc, isRefreshing = false) {
			const info = acc.quotas[familyKey];
			const cd = acc.cooldowns[familyKey];
			const inCooldown = cd && cd.cooldownUntil > Date.now();
			const has5h = typeof info?.remainingFraction === "number" && Number.isFinite(info.remainingFraction);
			const pct5h = has5h ? Math.max(0, Math.min(100, Math.round(info.remainingFraction * 100))) : -1;
			const cdNote = inCooldown ? t("account.localCooldown") : "";
			const w5h = formatQuotaWindow(t, info?.resetTime);
			const expiredFull5h = w5h.expired && has5h && pct5h >= 100;
			const hasWeekly = typeof info?.weeklyFraction === "number" && Number.isFinite(info.weeklyFraction);
			const pctWeekly = hasWeekly ? Math.max(0, Math.min(100, Math.round(info.weeklyFraction * 100))) : -1;
			const wWeekly = formatQuotaWindow(t, info?.weeklyResetTime);
			const expiredFullWeekly = wWeekly.expired && hasWeekly && pctWeekly >= 100;
			const getColors = (pct) => {
				if (pct < 0) return {
					bar: "var(--agy-quota-none-border)",
					text: "var(--agy-quota-none-text)",
					bg: "var(--agy-quota-none-bg)",
					border: "var(--agy-quota-none-border)"
				};
				if (pct <= 20) return {
					bar: "var(--agy-quota-low-text)",
					text: "var(--agy-quota-low-text)",
					bg: "var(--agy-quota-low-bg)",
					border: "var(--agy-quota-low-border)"
				};
				if (pct <= 50) return {
					bar: "var(--agy-quota-med-text)",
					text: "var(--agy-quota-med-text)",
					bg: "var(--agy-quota-med-bg)",
					border: "var(--agy-quota-med-border)"
				};
				return {
					bar: "var(--dsw-alias-state-business-primary, #2563eb)",
					text: "var(--agy-quota-high-text)",
					bg: "var(--agy-quota-high-bg)",
					border: "var(--agy-quota-high-border)"
				};
			};
			const c5h = getColors(pct5h);
			const cWeekly = getColors(pctWeekly);
			const renderLine = (windowName, percent, c, resetStr, rawFraction, rawReset) => {
				const isShimmer = percent < 0 || isRefreshing;
				const tooltipText = typeof rawFraction === "number" ? `${(rawFraction * 100).toFixed(1)}% (raw: ${rawFraction})${rawReset ? ` · reset: ${rawReset}` : ""}` : resetStr ? `↻ ${resetStr}` : void 0;
				return h("div", {
					className: "agy-quota-line",
					style: {
						display: "flex",
						alignItems: "center",
						fontSize: "12px",
						margin: "4px 0"
					}
				}, h("span", { style: {
					width: "72px",
					color: "var(--agy-text-secondary)",
					fontSize: "12px",
					fontWeight: 500,
					flexShrink: 0,
					whiteSpace: "nowrap"
				} }, windowName), h("div", {
					className: isShimmer ? "agy-shimmer-track" : "",
					style: S.progressBarBg
				}, h("div", {
					className: "agy-progress-fill",
					style: {
						width: `${percent < 0 ? 100 : percent}%`,
						height: "100%",
						background: c.bar,
						borderRadius: "3px"
					}
				})), h("div", { style: {
					display: "inline-flex",
					alignItems: "center",
					gap: "8px",
					width: "148px",
					minWidth: "148px",
					justifyContent: "flex-end",
					flexShrink: 0
				} }, h("span", {
					title: tooltipText,
					style: {
						padding: "0",
						borderRadius: "0",
						background: "transparent",
						color: c.text,
						border: "0",
						fontWeight: 600,
						fontSize: "12px",
						lineHeight: 1.2,
						cursor: tooltipText ? "help" : "default"
					}
				}, percent < 0 ? "—" : `${percent}%`), resetStr ? h("span", { style: {
					color: "var(--agy-text-tertiary)",
					fontSize: "11.5px",
					fontWeight: 400
				} }, `↻ ${resetStr}`) : null));
			};
			return h("div", {
				className: "agy-family-quota",
				style: {
					margin: "0",
					padding: "8px 0",
					background: "transparent",
					borderRadius: "0",
					border: "0"
				}
			}, h("div", { style: {
				display: "flex",
				alignItems: "center",
				gap: "6px",
				fontWeight: 600,
				fontSize: "12px",
				marginBottom: "4px",
				color: "var(--agy-text-primary)"
			} }, brandIcon(FAMILY_BRAND[familyKey], 13), h("span", null, label)), familyKey !== "argon" || has5h ? renderLine(t("quota.fiveHour"), pct5h, c5h, w5h.resetText ? w5h.resetText + cdNote : expiredFull5h ? t("quota.windowReset") + cdNote : cdNote.replace(/^ · /, ""), info?.remainingFraction, info?.resetTime) : null, renderLine(t("quota.weekly"), pctWeekly, cWeekly, wWeekly.resetText ? wWeekly.resetText : expiredFullWeekly ? t("quota.windowReset") : "", info?.weeklyFraction, info?.weeklyResetTime));
		}
		const GLOBAL_CSS = `
@keyframes agy-spin {
	0% { transform: rotate(0deg); }
	100% { transform: rotate(360deg); }
}

:root, body {
	--agy-font-family: var(--dsw-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Microsoft YaHei", sans-serif);
	--agy-bg-panel: var(--dsw-alias-bg-layer-1, #ffffff);
	--agy-bg-card: var(--dsw-alias-bg-layer-1, #ffffff);
	--agy-bg-card-primary: var(--dsw-alias-bg-layer-1, #ffffff);
	--agy-bg-header: var(--dsw-alias-bg-layer-1, #ffffff);
	--agy-bg-box: transparent;
	--agy-bg-subbox: var(--dsw-alias-bg-layer-2, #f8fafc);
	--agy-bg-input: var(--dsw-alias-bg-layer-1, #ffffff);
	--agy-bg-btn: var(--dsw-alias-bg-layer-2, #f1f5f9);
	--agy-bg-btn-hover: var(--dsw-alias-interactive-bg-hover, #e2e8f0);
	--agy-bg-btn-primary: var(--dsw-alias-state-business-primary, #2563eb);
	--agy-bg-progress-track: var(--dsw-alias-bg-layer-2, #e2e8f0);

	--agy-border-card: var(--dsw-alias-border-l1, #e2e8f0);
	--agy-border-card-primary: var(--dsw-alias-border-l1, #e2e8f0);
	--agy-border-box: transparent;
	--agy-border-subbox: var(--dsw-alias-border-l1, #e2e8f0);
	--agy-border-input: var(--dsw-alias-border-l2, #cbd5e1);
	--agy-border-input-focus: var(--dsw-alias-state-business-primary, #2563eb);
	--agy-border-btn: var(--dsw-alias-border-l2, #cbd5e1);
	--agy-border-btn-primary: var(--dsw-alias-state-business-primary, #2563eb);
	--agy-border-divider: var(--dsw-alias-border-l1, #e2e8f0);

	--agy-text-primary: var(--dsw-alias-label-primary, #0f172a);
	--agy-text-secondary: var(--dsw-alias-label-secondary, #334155);
	--agy-text-tertiary: var(--dsw-alias-label-tertiary, #64748b);
	--agy-text-muted: var(--dsw-alias-label-caption, #94a3b8);
	--agy-text-btn: var(--dsw-alias-label-primary, #0f172a);
	--agy-text-btn-primary: #ffffff;
	--agy-text-window-label: var(--dsw-alias-label-secondary, #475569);

	--agy-shadow-card: none;
	--agy-shadow-card-hover: none;
	--agy-shadow-card-primary: none;
	--agy-shadow-modal: 0 12px 32px rgba(0, 0, 0, 0.16);
	--agy-modal-backdrop: rgba(15, 23, 42, 0.5);

	/* Badges */
	--agy-badge-primary-bg: transparent;
	--agy-badge-primary-text: var(--dsw-alias-state-business-primary, #2563eb);
	--agy-badge-primary-border: transparent;

	--agy-badge-tag-bg: transparent;
	--agy-badge-tag-text: var(--dsw-alias-label-secondary, #475569);
	--agy-badge-tag-border: transparent;

	--agy-badge-email-bg: transparent;
	--agy-badge-email-text: var(--dsw-alias-label-secondary, #475569);
	--agy-badge-email-border: transparent;

	--agy-badge-proxy-bg: transparent;
	--agy-badge-proxy-text: var(--dsw-alias-label-secondary, #475569);
	--agy-badge-proxy-border: transparent;

	--agy-badge-ready-bg: transparent;
	--agy-badge-ready-text: #17835c;
	--agy-badge-ready-border: transparent;

	--agy-badge-unready-bg: transparent;
	--agy-badge-unready-text: var(--dsw-alias-label-secondary, #475569);
	--agy-badge-unready-border: transparent;

	/* Quota status pills */
	--agy-quota-high-bg: transparent;
	--agy-quota-high-text: #047857;
	--agy-quota-high-border: transparent;
	--agy-quota-med-bg: transparent;
	--agy-quota-med-text: #b45309;
	--agy-quota-med-border: transparent;
	--agy-quota-low-bg: transparent;
	--agy-quota-low-text: #b91c1c;
	--agy-quota-low-border: transparent;
	--agy-quota-none-bg: transparent;
	--agy-quota-none-text: #64748b;
	--agy-quota-none-border: transparent;

	/* Danger button */
	--agy-danger-bg: #fef2f2;
	--agy-danger-text: #b91c1c;
	--agy-danger-border: #fecaca;
	--agy-danger-hover-bg: #fee2e2;

	/* Warning banner */
	--agy-warn-bg: #fffbeb;
	--agy-warn-text: #92400e;
	--agy-warn-border: #fcd34d;
	--agy-warn-btn-bg: #fef3c7;
	--agy-warn-btn-text: #92400e;
	--agy-warn-btn-border: #f59e0b;

	/* Toast notices */
	--agy-toast-success-bg: #ecfdf5;
	--agy-toast-success-text: #065f46;
	--agy-toast-success-border: #6ee7b7;
	--agy-toast-info-bg: #eff6ff;
	--agy-toast-info-text: #1e40af;
	--agy-toast-info-border: #93c5fd;
	--agy-toast-warn-bg: #fffbeb;
	--agy-toast-warn-text: #92400e;
	--agy-toast-warn-border: #fcd34d;
	--agy-toast-error-bg: #fef2f2;
	--agy-toast-error-text: #991b1b;
	--agy-toast-error-border: #fca5a5;

	/* Auth Modal / Box */
	--agy-auth-box-bg: var(--dsw-alias-bg-layer-2, #f8fafc);
	--agy-auth-box-border: transparent;

	/* Segment control */
	--agy-seg-group-bg: transparent;
	--agy-seg-group-border: transparent;
	--agy-seg-btn-text: #475569;
	--agy-seg-btn-active-bg: var(--dsw-alias-state-business-primary, #2563eb);
	--agy-seg-btn-active-text: #ffffff;
	--agy-seg-danger-bg: #dc2626;
	--agy-seg-danger-text: #ffffff;
	--agy-seg-danger-border: #b91c1c;
}

body[data-ds-dark-theme],
body.dark,
[data-theme="dark"] {
	--agy-bg-panel: var(--dsw-alias-bg-layer-1, #0f172a);
	--agy-bg-card: var(--dsw-alias-bg-layer-1, #0f172a);
	--agy-bg-card-primary: var(--dsw-alias-bg-layer-1, #0f172a);
	--agy-bg-header: var(--dsw-alias-bg-layer-1, #1e293b);
	--agy-bg-box: transparent;
	--agy-bg-subbox: var(--dsw-alias-bg-layer-2, #1e293b);
	--agy-bg-input: var(--dsw-alias-bg-layer-3, #090d16);
	--agy-bg-btn: var(--dsw-alias-bg-layer-2, #1e293b);
	--agy-bg-btn-hover: var(--dsw-alias-interactive-bg-hover, #475569);
	--agy-bg-btn-primary: var(--dsw-alias-state-business-primary, #2563eb);
	--agy-bg-progress-track: var(--dsw-alias-bg-layer-2, #1e293b);

	--agy-border-card: var(--dsw-alias-border-l1, #334155);
	--agy-border-card-primary: var(--dsw-alias-border-l1, #334155);
	--agy-border-box: transparent;
	--agy-border-subbox: var(--dsw-alias-border-l1, #334155);
	--agy-border-input: var(--dsw-alias-border-l2, #334155);
	--agy-border-input-focus: #3b82f6;
	--agy-border-btn: var(--dsw-alias-border-l2, #475569);
	--agy-border-btn-primary: var(--dsw-alias-state-business-primary, #3b82f6);
	--agy-border-divider: var(--dsw-alias-border-l1, #334155);

	--agy-text-primary: var(--dsw-alias-label-primary, #f8fafc);
	--agy-text-secondary: var(--dsw-alias-label-secondary, #cbd5e1);
	--agy-text-tertiary: var(--dsw-alias-label-tertiary, #94a3b8);
	--agy-text-muted: var(--dsw-alias-label-caption, #64748b);
	--agy-text-btn: var(--dsw-alias-label-primary, #ffffff);
	--agy-text-btn-primary: #0b1220;
	--agy-text-window-label: var(--dsw-alias-label-secondary, #cbd5e1);

	--agy-shadow-card: none;
	--agy-shadow-card-hover: none;
	--agy-shadow-card-primary: none;
	--agy-shadow-modal: 0 12px 32px rgba(0, 0, 0, 0.36);
	--agy-modal-backdrop: rgba(0, 0, 0, 0.48);

	/* Badges */
	--agy-badge-primary-bg: transparent;
	--agy-badge-primary-text: var(--dsw-alias-state-business-primary, #93c5fd);
	--agy-badge-primary-border: transparent;

	--agy-badge-tag-bg: transparent;
	--agy-badge-tag-text: #cbd5e1;
	--agy-badge-tag-border: transparent;

	--agy-badge-email-bg: transparent;
	--agy-badge-email-text: var(--dsw-alias-label-secondary, #cbd5e1);
	--agy-badge-email-border: transparent;

	--agy-badge-proxy-bg: transparent;
	--agy-badge-proxy-text: var(--dsw-alias-label-secondary, #cbd5e1);
	--agy-badge-proxy-border: transparent;

	--agy-badge-ready-bg: transparent;
	--agy-badge-ready-text: #34d399;
	--agy-badge-ready-border: transparent;

	--agy-badge-unready-bg: transparent;
	--agy-badge-unready-text: var(--dsw-alias-label-secondary, #cbd5e1);
	--agy-badge-unready-border: transparent;

	/* Quota status pills */
	--agy-quota-high-bg: transparent;
	--agy-quota-high-text: #6ee7b7;
	--agy-quota-high-border: transparent;
	--agy-quota-med-bg: transparent;
	--agy-quota-med-text: #fde68a;
	--agy-quota-med-border: transparent;
	--agy-quota-low-bg: transparent;
	--agy-quota-low-text: #fca5a5;
	--agy-quota-low-border: transparent;
	--agy-quota-none-bg: transparent;
	--agy-quota-none-text: #94a3b8;
	--agy-quota-none-border: transparent;

	/* Danger button */
	--agy-danger-bg: #450a0a;
	--agy-danger-text: #fca5a5;
	--agy-danger-border: #ef4444;
	--agy-danger-hover-bg: #5f1313;

	/* Warning banner */
	--agy-warn-bg: #451a03;
	--agy-warn-text: #fde68a;
	--agy-warn-border: #d97706;
	--agy-warn-btn-bg: #78350f;
	--agy-warn-btn-text: #fde68a;
	--agy-warn-btn-border: #d97706;

	/* Toast notices */
	--agy-toast-success-bg: #064e3b;
	--agy-toast-success-text: #6ee7b7;
	--agy-toast-success-border: #059669;
	--agy-toast-info-bg: #1e3a8a;
	--agy-toast-info-text: #93c5fd;
	--agy-toast-info-border: #3b82f6;
	--agy-toast-warn-bg: #451a03;
	--agy-toast-warn-text: #fde68a;
	--agy-toast-warn-border: #d97706;
	--agy-toast-error-bg: #450a0a;
	--agy-toast-error-text: #fca5a5;
	--agy-toast-error-border: #dc2626;

	/* Auth Modal / Box */
	--agy-auth-box-bg: var(--dsw-alias-bg-layer-2, #1e293b);
	--agy-auth-box-border: transparent;

	/* Segment control */
	--agy-seg-group-bg: transparent;
	--agy-seg-group-border: transparent;
	--agy-seg-btn-text: #94a3b8;
	--agy-seg-btn-active-bg: var(--dsw-alias-state-business-primary, #38bdf8);
	--agy-seg-btn-active-text: #0b1220;
	--agy-seg-danger-bg: #7f1d1d;
	--agy-seg-danger-text: #fca5a5;
	--agy-seg-danger-border: #ef4444;
}

.agy-spinner {
	display: inline-block;
	width: 12px;
	height: 12px;
	border: 2px solid currentColor;
	border-top-color: transparent;
	border-radius: 50%;
	animation: agy-spin 0.75s linear infinite;
	vertical-align: -2px;
	margin-right: 5px;
}
.agy-pulse-dot {
	display: inline-block;
	width: 8px;
	height: 8px;
	border-radius: 50%;
}
.agy-card-hover {
	transition: background-color 0.15s ease, opacity 0.15s ease;
}
.agy-card-hover:hover {
	background: var(--dsw-alias-interactive-bg-hover, transparent) !important;
}
.agy-console-status {
	display: inline-flex;
	align-items: center;
	gap: 7px;
	color: var(--agy-text-secondary);
	font-size: 12px;
}
.agy-console-status-dot {
	width: 7px;
	height: 7px;
	flex: 0 0 7px;
	border-radius: 50%;
	background: var(--agy-text-tertiary);
}
.agy-console-status-dot[data-state="ready"] { background: var(--agy-badge-ready-text); }
.agy-console-status-dot[data-state="pending"] { background: var(--agy-quota-med-text); }
.agy-console-status-dot[data-state="disabled"] { background: var(--agy-text-muted); }

.agy-btn {
	transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
	user-select: none;
}
.agy-btn:not(.agy-btn-primary):not(.agy-account-action-primary):not(.agy-account-action-danger):hover:not(:disabled) {
	background-color: var(--agy-bg-btn-hover) !important;
}
.agy-btn:focus-visible,
.agy-select:focus-visible,
.agy-console input:focus-visible {
	outline: 2px solid var(--dsw-alias-state-business-primary, #2563eb);
	outline-offset: 2px;
}
.agy-btn:disabled,
.agy-select:disabled {
	opacity: 0.58;
	cursor: not-allowed;
}

/* Standalone enable/disable toggle (rows without a segment group). Class-based
   so both states carry a real border, a hover affordance and a visible
   clickable area — the old inline segBtn left the OFF state invisible. */
.agy-toggle {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	min-width: 58px;
	padding: 4px 12px;
	border-radius: 999px;
	border: 1px solid var(--dsw-alias-border-l3, #94a3b8);
	background: var(--dsw-alias-bg-layer-1, #f8fafc);
	color: var(--dsw-alias-label-primary, #0f172a);
	font-size: 11.5px;
	font-weight: 600;
	line-height: 1.5;
	cursor: pointer;
	transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease, filter 0.15s ease;
}
.agy-toggle:hover:not(:disabled) {
	border-color: var(--dsw-alias-border-l4, #64748b);
	background: var(--dsw-alias-interactive-bg-hover-solid, #e2e8f0);
}
.agy-toggle:disabled {
	opacity: 0.55;
	cursor: default;
}
.agy-toggle[data-on="true"] {
	border-color: var(--dsw-alias-state-business-primary, #2563eb);
	background: var(--dsw-alias-state-business-primary, #2563eb);
	color: #ffffff;
}
.agy-toggle[data-on="true"]:hover:not(:disabled) {
	filter: brightness(1.08);
}
.agy-progress-fill {
	transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes agy-shimmer {
	0% { transform: translateX(-100%); }
	100% { transform: translateX(100%); }
}
.agy-shimmer-track {
	position: relative;
	overflow: hidden;
	contain: paint;
	transform: translateZ(0);
	isolation: isolate;
}
.agy-shimmer-track::after {
	content: '';
	position: absolute;
	top: 0; left: 0; right: 0; bottom: 0;
	background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.22) 50%, transparent 100%);
	transform: translateX(-100%);
	/* No will-change: transform: it pins a compositing layer for a decorative
	   loop even while it is idle, and inside the overlay that layer is another
	   thing the compositor can drop mid-scroll. */
	animation: agy-shimmer 1.8s infinite ease-in-out;
	pointer-events: none;
}
.agy-modal-backdrop {
	position: fixed;
	inset: 0;
	z-index: 9999;
	background: var(--agy-modal-backdrop);
	/* NO full-screen backdrop blur here. Filtering the whole viewport forces
	   Chromium/Electron to re-sample the page every frame while anything behind
	   it moves (scroll, streaming, animations) — the recurring "打开控制台后滚动
	   闪屏" root cause. The rgba dim below is stable and flicker-free. */
	overscroll-behavior: contain;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 16px;
	box-sizing: border-box;
}
/* While the console is open, freeze the conversation scroller behind it so
   nothing moves/reflows under the fixed overlay. scrollbar-gutter:stable on the
   host scroller keeps the width from jumping when overflow flips to hidden. */
html.agy-modal-open [data-conversation-scroll] {
	overflow: hidden !important;
	overscroll-behavior: contain;
}
/* Belt for the shell itself: if the host page (or a shell wrapper) is the thing
   that scrolls, locking only the conversation scroller leaves a scroller free
   behind the overlay. The wheel/touch blocker in the dialog is the primary fix;
   this makes the intent explicit for any element that follows the document. */
html.agy-modal-open,
html.agy-modal-open body {
	overflow: hidden !important;
	overscroll-behavior: none;
}
.agy-modal-panel {
	position: relative;
	width: 100%;
	max-width: 760px;
	max-height: min(760px, calc(100vh - 40px));
	background: var(--agy-bg-panel);
	border: 1px solid var(--agy-border-card);
	border-radius: 10px;
	box-shadow: var(--agy-shadow-modal);
	display: flex;
	flex-direction: column;
	overflow: hidden;
	color: var(--agy-text-primary);
	font-family: var(--agy-font-family);
	/* NO compositing hints here (2026-11-04, "滚动还是频繁闪屏"):
	   contain: content implies PAINT containment, and paint containment on an
	   ancestor of a scrolling subtree is the classic Chromium flicker trap — the
	   backing layer is dropped and rebuilt while the body scrolls, so the panel
	   blinks over the translucent backdrop. A forced translateZ(0) layer makes
	   it worse (big fixed layer + shadow re-composited per frame). A 760px panel
	   needs neither hint; plain overflow: hidden already clips it. */
}
.agy-submodel-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 7px 10px;
	font-size: 11.5px;
	border-radius: 6px;
	background: var(--agy-bg-subbox);
	border: 1px solid var(--agy-border-box);
	margin: 4px 0;
	color: var(--agy-text-primary);
}

.agy-account-header {
	display: grid !important;
	grid-template-columns: minmax(0, 1fr) auto;
	align-items: center !important;
	gap: 8px 12px !important;
	margin-bottom: 4px !important;
}
.agy-account-identity {
	gap: 5px 9px !important;
	min-width: 0;
}
.agy-account-order-button {
	width: 26px !important;
	height: 26px !important;
	min-height: 26px !important;
	padding: 0 !important;
	border-radius: 5px !important;
	color: var(--agy-text-secondary) !important;
}
.agy-account-email {
	color: var(--agy-text-secondary) !important;
	font-size: 12px !important;
}
.agy-account-state {
	background: transparent !important;
	border: 0 !important;
	border-radius: 0 !important;
	padding: 0 !important;
	font-size: 11px !important;
	font-weight: 500 !important;
}
.agy-account-state-error { color: var(--agy-danger-text) !important; }
.agy-account-state-warning { color: var(--agy-quota-med-text) !important; }
.agy-account-state-selected { color: var(--agy-badge-ready-text) !important; }
.agy-account-meta { color: var(--agy-text-tertiary) !important; }
.agy-card-actions {
	gap: 6px !important;
	flex-wrap: wrap;
	justify-content: flex-end;
}
.agy-account-action {
	min-height: 30px !important;
	padding: 4px 8px !important;
	border: 1px solid var(--agy-border-btn) !important;
	border-radius: 6px !important;
	background: var(--agy-bg-btn) !important;
	color: var(--agy-text-btn) !important;
	font-size: 12px !important;
	line-height: 1.25 !important;
	white-space: nowrap;
}
.agy-account-action:hover:not(:disabled) {
	background: var(--agy-bg-btn-hover) !important;
}
.agy-account-action-primary {
	border-color: var(--agy-border-btn-primary) !important;
	background: var(--agy-bg-btn-primary) !important;
	color: var(--agy-text-btn-primary) !important;
	font-weight: 600 !important;
}
.agy-account-action-primary:hover:not(:disabled) {
	filter: brightness(0.94);
}
.agy-account-action-danger {
	border-color: var(--agy-danger-border) !important;
	background: var(--agy-danger-bg) !important;
	color: var(--agy-danger-text) !important;
}
.agy-account-action-danger:hover:not(:disabled) {
	background: var(--agy-danger-hover-bg) !important;
}
.agy-account-quota {
	margin-top: 0 !important;
	padding: 4px 0 0 !important;
	background: transparent !important;
	border: 0 !important;
}
.agy-account-quota-summary {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 12px;
	min-height: 30px;
}
.agy-quota-summary-text {
	color: var(--agy-text-secondary);
	font-size: 12px;
	font-variant-numeric: tabular-nums;
}
.agy-account-expand {
	display: inline-flex !important;
	align-items: center;
	gap: 5px !important;
	padding: 4px 0 !important;
	border: 0 !important;
	background: transparent !important;
	color: var(--dsw-alias-state-business-primary, #2563eb) !important;
	font-size: 12px !important;
	font-weight: 500 !important;
	white-space: nowrap;
}
.agy-family-quota {
	margin: 0 !important;
	padding: 8px 0 !important;
	background: transparent !important;
	border: 0 !important;
	border-bottom: 1px solid var(--agy-border-divider) !important;
	border-radius: 0 !important;
}
.agy-family-quota:last-child { border-bottom: 0 !important; }
.agy-quota-line {
	margin: 5px 0 !important;
	font-size: 12px !important;
}
.agy-quota-line > div:first-of-type {
	height: 5px !important;
	border: 0 !important;
	margin: 0 12px !important;
}
.agy-quota-line > div:last-child {
	width: 148px !important;
	min-width: 148px !important;
}
.agy-account-quota .agy-btn {
	justify-content: flex-start !important;
	width: auto !important;
	margin-top: 4px !important;
	padding: 4px 0 !important;
	background: transparent !important;
	border: 0 !important;
	color: var(--agy-text-secondary) !important;
}
.agy-settings { gap: 0 !important; }
.agy-setting-row {
	display: flex;
	align-items: center;
	min-height: 48px;
	padding: 8px 0;
	border-bottom: 1px solid var(--agy-border-divider);
}
.agy-setting-copy {
	min-width: 0;
	flex: 1 1 auto;
	padding-right: 20px;
}
.agy-setting-label {
	font-size: 13px !important;
	font-weight: 500 !important;
}
.agy-setting-help {
	max-width: 56ch;
	margin-top: 2px;
	line-height: 1.4;
}
/* Keep the transport setting aligned with the rest of the DSH settings. */
.agy-direct-mode-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 16px;
  padding: 14px 0;
}
.agy-direct-mode-copy {
  display: flex;
  flex: 1 1 240px;
  min-width: 0;
  flex-direction: column;
  gap: 3px;
}
.agy-direct-mode-copy .agy-setting-help { display: block; margin: 0; }
.agy-direct-mode-switch {
  position: relative;
  flex: 0 0 auto;
  width: 36px;
  height: 20px;
  padding: 0;
  border: 1px solid var(--agy-border-btn);
  border-radius: 999px;
  background: var(--agy-bg-btn);
  cursor: pointer;
  transition: background-color .15s ease, border-color .15s ease;
}
.agy-direct-mode-switch[aria-checked="true"] {
  background: var(--agy-seg-btn-active-bg);
  border-color: var(--agy-seg-btn-active-bg);
}
.agy-direct-mode-switch-knob {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--agy-text-secondary);
  transition: transform .15s ease, background-color .15s ease;
}
.agy-direct-mode-switch[aria-checked="true"] .agy-direct-mode-switch-knob {
  transform: translateX(16px);
  background: var(--agy-seg-btn-active-text);
}
.agy-direct-mode-switch:focus-visible { outline: 2px solid var(--dsw-alias-state-business-primary, #2563eb); outline-offset: 3px; }
.agy-direct-mode-switch:disabled { opacity: .55; cursor: wait; }
.agy-permission-row {
	display: grid !important;
	grid-template-columns: minmax(0, 1fr) minmax(210px, 260px);
	align-items: center;
	column-gap: 16px;
}
.agy-permission-row .agy-setting-help { grid-column: 1; }
.agy-permission-row .agy-setting-copy { padding-right: 0; }
.agy-permission-row .agy-select {
	grid-column: 2;
	grid-row: 1 / span 2;
	width: 100% !important;
	max-width: 260px !important;
}
.agy-section-heading {
	font-size: 14px !important;
	font-weight: 600 !important;
}
.agy-setting-models { border-bottom: 1px solid var(--agy-border-divider); }
.agy-select { border-radius: 6px !important; }
.agy-console .agy-btn-primary { box-shadow: none !important; white-space: nowrap; flex: 0 0 auto; }
.agy-header-actions { flex-wrap: wrap; justify-content: flex-end; gap: 8px !important; }
.agy-header-actions > button { min-height: 34px; white-space: nowrap; flex: 0 0 auto; }
.agy-card-actions > button { min-width: 58px; }
@media (prefers-reduced-motion: reduce) {
	.agy-card-hover, .agy-btn, .agy-progress-fill { transition: none !important; }
	.agy-spinner, .agy-shimmer-track::after { animation: none !important; }
}

/* Native dropdowns: the closed control carries inline colours, but the popup
   list follows color-scheme, so mirror the shell theme here too. */
select.agy-select { color-scheme: light; }
body[data-ds-dark-theme] select.agy-select { color-scheme: dark; }

/* ------------------------------------------------------------------
   Phone web. Below 680px the console becomes a full-height sheet and
   every inline flex row is allowed to wrap: the layout is written with
   style attributes, and only an !important rule can beat those, so the
   overrides here are deliberately blunt.
   ------------------------------------------------------------------ */
@media (max-width: 680px) {
	.agy-modal-backdrop {
		padding: 0 !important;
		align-items: stretch !important;
		justify-content: stretch !important;
	}
	.agy-modal-panel {
		width: 100% !important;
		max-width: none !important;
		height: 100dvh !important;
		max-height: 100dvh !important;
		border: 0 !important;
		border-radius: 0 !important;
	}
	.agy-modal-head {
		padding: 12px 14px !important;
		padding-top: max(12px, env(safe-area-inset-top)) !important;
	}
	.agy-modal-body {
		padding: 14px 12px calc(18px + env(safe-area-inset-bottom)) !important;
		-webkit-overflow-scrolling: touch;
	}
	.agy-account-header { grid-template-columns: minmax(0, 1fr); }
	.agy-card-actions { justify-content: flex-start; }
	.agy-account-quota-summary { align-items: flex-start; flex-direction: column; gap: 2px; }

	/* A flex row may wrap instead of pushing the panel sideways. */
	.agy-console [style*="display: flex"] { flex-wrap: wrap !important; }
	/* Label on its own line, the control underneath it. */
	.agy-console [style*="justify-content: space-between"] {
		flex-direction: column !important;
		align-items: stretch !important;
		gap: 8px !important;
	}
	/* Segmented controls fill the row; every segment shares the width. */
	.agy-console [style*="agy-seg-group-border"] {
		display: flex !important;
		width: 100% !important;
		box-sizing: border-box !important;
	}
	.agy-console [style*="agy-seg-group-border"] > button {
		flex: 1 1 0 !important;
		min-width: 0 !important;
		padding-left: 6px !important;
		padding-right: 6px !important;
	}
	/* Inputs shrink; buttons keep a comfortable tap area. */
	.agy-console input { min-width: 0 !important; flex: 1 1 140px !important; }
	/* Settings dropdowns share their row and stretch on a phone. */
	.agy-console .agy-select { flex: 1 1 0 !important; min-width: 0 !important; max-width: none !important; height: 34px !important; }
	.agy-console .agy-btn { min-height: 34px; }
	.agy-console .agy-permission-row {
		grid-template-columns: minmax(0, 1fr) !important;
		row-gap: 8px !important;
	}
	.agy-console .agy-permission-row .agy-select {
		grid-column: 1 !important;
		grid-row: auto !important;
		max-width: none !important;
	}
	/* The family label no longer reserves 140px of a 360px screen. */
	.agy-console [style*="min-width: 140px"] { min-width: 0 !important; }
	/* Per-model rows may wrap their value under the name. */
	.agy-console .agy-submodel-row { flex-wrap: wrap; gap: 4px 8px; }

	/* Quota line: window name and badge share the first row, the bar takes
	   the second one — 52px of label plus a 140px badge cluster leaves no
	   room for a bar on a 360px screen. */
	.agy-quota-line {
		display: grid !important;
		grid-template-columns: minmax(0, 1fr) auto;
		grid-template-areas: "label cluster" "bar bar";
		align-items: center;
		gap: 5px 8px;
	}
	.agy-quota-line > span:first-child {
		grid-area: label;
		width: auto !important;
		white-space: nowrap;
	}
	.agy-quota-line > div:nth-child(2) { grid-area: bar; margin: 0 !important; }
	.agy-quota-line > div:nth-child(3) { grid-area: cluster; min-width: 0 !important; }

	/* Header actions: the primary action keeps a full row, the two
	   secondary ones share the next. */
	.agy-header-actions {
		display: grid !important;
		grid-template-columns: 1fr 1fr;
		gap: 6px;
		width: 100%;
	}
	.agy-header-actions > button:first-child { grid-column: 1 / -1; }
	.agy-header-actions > button { width: 100%; justify-content: center; }

	/* Account actions: equal-width buttons instead of one ragged line. */
	.agy-card-actions {
		display: grid !important;
		grid-template-columns: repeat(auto-fit, minmax(84px, 1fr));
		gap: 6px;
		width: 100%;
		align-items: stretch;
	}
	.agy-card-actions > button { width: 100%; justify-content: center; }
	.agy-setting-row { align-items: flex-start !important; }
	.agy-setting-copy { padding-right: 0; }
	.agy-permission-row { grid-template-columns: minmax(0, 1fr) !important; row-gap: 6px; }
	.agy-permission-row .agy-select { grid-column: 1; grid-row: auto; max-width: none !important; }
}

@media (max-width: 420px) {
	.agy-console { font-size: 12.5px; }
	.agy-modal-head {
		padding: 10px 12px !important;
		padding-top: max(10px, env(safe-area-inset-top)) !important;
	}
	.agy-modal-body { padding: 12px 10px calc(16px + env(safe-area-inset-bottom)) !important; }
	.agy-console [style*="justify-content: space-between"] { gap: 6px !important; }
}
`;
		function injectGlobalStyles() {
			if (typeof document === "undefined") return;
			const styleId = "dsh-agy-link-global-css";
			if (document.getElementById(styleId) === null) {
				const st = document.createElement("style");
				st.id = styleId;
				st.textContent = GLOBAL_CSS;
				const host = document.head ?? document.documentElement;
				if (host) host.appendChild(st);
			}
		}
		const S = {
			container: {
				lineHeight: 1.5,
				fontSize: "13px",
				fontFamily: "var(--agy-font-family)",
				color: "var(--agy-text-primary)"
			},
			headerCard: {
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				padding: "4px 0",
				background: "transparent",
				border: "0",
				borderRadius: "0",
				marginBottom: "12px",
				color: "var(--agy-text-primary)",
				boxShadow: "none"
			},
			badgePrimary: {
				display: "inline-flex",
				alignItems: "center",
				gap: "4px",
				background: "var(--agy-badge-primary-bg)",
				color: "var(--agy-badge-primary-text)",
				border: "0",
				padding: "0",
				borderRadius: "0",
				fontSize: "11px",
				fontWeight: 700
			},
			badgeTag: {
				display: "inline-flex",
				alignItems: "center",
				gap: "4px",
				background: "var(--agy-badge-tag-bg)",
				color: "var(--agy-badge-tag-text)",
				border: "0",
				padding: "0",
				borderRadius: "0",
				fontSize: "11px",
				fontWeight: 600
			},
			badgeReady: {
				display: "inline-flex",
				alignItems: "center",
				gap: "4px",
				background: "var(--agy-badge-ready-bg)",
				color: "var(--agy-badge-ready-text)",
				border: "0",
				padding: "0",
				borderRadius: "0",
				fontSize: "11px",
				fontWeight: 700
			},
			badgeUnready: {
				display: "inline-flex",
				alignItems: "center",
				gap: "4px",
				background: "var(--agy-badge-unready-bg)",
				color: "var(--agy-badge-unready-text)",
				border: "0",
				padding: "0",
				borderRadius: "0",
				fontSize: "11px",
				fontWeight: 700
			},
			card: {
				background: "transparent",
				border: "0",
				borderBottom: "1px solid var(--agy-border-divider)",
				borderRadius: "0",
				padding: "12px 4px",
				marginBottom: "0",
				color: "var(--agy-text-primary)",
				boxShadow: "none",
				transition: "background-color 0.15s ease, opacity 0.15s ease"
			},
			cardPrimary: {
				background: "transparent",
				border: "0",
				borderBottom: "1px solid var(--agy-border-divider)",
				borderRadius: "0",
				padding: "12px 4px",
				marginBottom: "0",
				color: "var(--agy-text-primary)",
				boxShadow: "none",
				transition: "background-color 0.15s ease, opacity 0.15s ease"
			},
			quotaBox: {
				background: "transparent",
				border: "0",
				borderRadius: "0",
				padding: "4px 0 0",
				marginTop: "2px"
			},
			progressBarBg: {
				flex: "1",
				height: "5px",
				borderRadius: "3px",
				background: "var(--agy-bg-progress-track)",
				border: "0",
				overflow: "hidden",
				margin: "0 12px"
			},
			btn: {
				display: "inline-flex",
				alignItems: "center",
				justifyContent: "center",
				padding: "5px 9px",
				borderRadius: "6px",
				border: "1px solid var(--agy-border-btn)",
				background: "var(--agy-bg-btn)",
				color: "var(--agy-text-btn)",
				cursor: "pointer",
				fontSize: "12px",
				fontWeight: 600
			},
			btnPrimary: {
				display: "inline-flex",
				alignItems: "center",
				justifyContent: "center",
				padding: "6px 10px",
				borderRadius: "6px",
				border: "1px solid var(--agy-border-btn-primary)",
				background: "var(--agy-bg-btn-primary)",
				color: "var(--agy-text-btn-primary)",
				cursor: "pointer",
				fontSize: "12px",
				fontWeight: 600,
				boxShadow: "none"
			},
			btnDanger: {
				display: "inline-flex",
				alignItems: "center",
				justifyContent: "center",
				padding: "4px 9px",
				borderRadius: "6px",
				border: "1px solid var(--agy-danger-border)",
				background: "var(--agy-danger-bg)",
				color: "var(--agy-danger-text)",
				cursor: "pointer",
				fontSize: "11px",
				fontWeight: 600
			},
			btnSm: {
				display: "inline-flex",
				alignItems: "center",
				justifyContent: "center",
				padding: "4px 9px",
				borderRadius: "5px",
				border: "1px solid var(--agy-border-btn)",
				background: "var(--agy-bg-btn)",
				color: "var(--agy-text-btn)",
				cursor: "pointer",
				fontSize: "11.5px",
				fontWeight: 600
			},
			btnSmPrimary: {
				display: "inline-flex",
				alignItems: "center",
				justifyContent: "center",
				padding: "4px 9px",
				borderRadius: "5px",
				border: "1px solid var(--agy-border-btn-primary)",
				background: "var(--agy-bg-btn-primary)",
				color: "var(--agy-text-btn-primary)",
				cursor: "pointer",
				fontSize: "11.5px",
				fontWeight: 700
			},
			segGroup: {
				display: "inline-flex",
				background: "var(--agy-bg-btn)",
				borderRadius: "7px",
				padding: "2px",
				border: "1px solid var(--agy-border-btn)"
			},
			segBtn: {
				padding: "4px 10px",
				borderRadius: "5px",
				border: "none",
				background: "transparent",
				color: "var(--agy-seg-btn-text)",
				cursor: "pointer",
				fontSize: "11.5px",
				fontWeight: 600
			},
			segBtnActive: {
				padding: "4px 10px",
				borderRadius: "5px",
				border: "none",
				background: "var(--agy-seg-btn-active-bg)",
				color: "var(--agy-seg-btn-active-text)",
				cursor: "pointer",
				fontSize: "11.5px",
				fontWeight: 600,
				boxShadow: "none"
			},
			input: {
				flex: "1",
				padding: "7px 10px",
				borderRadius: "6px",
				border: "1px solid var(--agy-border-input)",
				background: "var(--agy-bg-input)",
				color: "var(--agy-text-primary)",
				fontSize: "12.5px",
				outline: "none"
			},
			muted: {
				color: "var(--agy-text-tertiary)",
				fontSize: "11.5px"
			},
			cfgRowRight: {
				display: "flex",
				alignItems: "center",
				justifyContent: "flex-end",
				flexWrap: "wrap",
				gap: "6px",
				minWidth: 0,
				flex: "0 0 auto"
			},
			select: {
				appearance: "auto",
				WebkitAppearance: "menulist",
				height: "32px",
				padding: "0 8px",
				borderRadius: "6px",
				border: "1px solid var(--agy-border-input)",
				backgroundColor: "var(--agy-bg-input)",
				color: "var(--agy-text-primary)",
				fontFamily: "inherit",
				fontSize: "12px",
				fontWeight: 400,
				cursor: "pointer",
				minWidth: "120px",
				maxWidth: "260px",
				textOverflow: "ellipsis"
			},
			noticeBanner: {
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				padding: "10px 14px",
				borderRadius: "8px",
				marginBottom: "12px",
				fontSize: "12.5px",
				fontWeight: 500
			},
			authModal: {
				background: "var(--agy-auth-box-bg)",
				border: "0",
				borderRadius: "8px",
				padding: "12px",
				marginBottom: "12px",
				color: "var(--agy-text-primary)"
			}
		};
		function apply(ctx) {
			injectGlobalStyles();
			ctx.effect(() => {
				ensureStatusPolling();
				return () => {
					if (statusPollTimer !== null) {
						clearInterval(statusPollTimer);
						statusPollTimer = null;
					}
				};
			}, "agy-link: status polling");
			const locale = ctx.locale;
			ctx.effect(() => {
				const safeAddLanguage = (lang) => {
					try {
						const snapshotLocales = typeof locale?.getSnapshot === "function" ? locale.getSnapshot()?.locales : void 0;
						const list = Array.isArray(snapshotLocales) ? snapshotLocales : typeof locale?.localeList === "function" ? locale.localeList() : [];
						if (Array.isArray(list) && list.some((l) => l?.id?.toLowerCase() === lang.id.toLowerCase())) return () => {};
						return locale.addLanguage(lang);
					} catch (err) {
						const message = String(err?.message || err);
						if (/already registered/i.test(message)) return () => {};
						throw err;
					}
				};
				const safeRegister = (ns, langOrDicts, dict) => {
					try {
						return locale.register(ns, langOrDicts, dict);
					} catch (err) {
						const message = String(err?.message || err);
						if (/already has locale/i.test(message)) return () => {};
						throw err;
					}
				};
				const disposePtBR = safeAddLanguage({
					id: "pt-BR",
					label: "Português (Brasil)",
					fallback: "en"
				});
				const disposeEs = safeAddLanguage({
					id: "es",
					label: "Español",
					fallback: "en"
				});
				const disposeZh = safeRegister(NS, "zh", zh$1);
				const disposeEn = safeRegister(NS, "en", en$1);
				const disposePtBRDictionary = safeRegister(NS, "pt-BR", ptBR);
				const disposeEsDictionary = safeRegister(NS, "es", es);
				const disposeDirectZh = safeRegister("settings.antigravityAuth", "zh", zh);
				const disposeDirectEn = safeRegister("settings.antigravityAuth", "en", en);
				return () => {
					disposeDirectEn();
					disposeDirectZh();
					disposeEsDictionary();
					disposePtBRDictionary();
					disposeEn();
					disposeZh();
					disposeEs();
					disposePtBR();
				};
			}, "agy-link: locale dictionaries");
			const useAgyTranslation = () => {
				const [, rerender] = useState(0);
				useEffect(() => locale.subscribe(() => rerender((revision) => revision + 1)), []);
				return locale.bind(NS);
			};
			const DirectSettingsPane = ({ status, setConfig }) => {
				const t = useAgyTranslation();
				const [proxyDraft, setProxyDraft] = useState(status.directProxyUrl ?? "");
				useEffect(() => {
					setProxyDraft(status.directProxyUrl ?? "");
				}, [status.directProxyUrl]);
				const [client, setClient] = useState(null);
				useEffect(() => {
					let live = true;
					const fiber = ctx.inject(["connection"], (child) => {
						const connection = child.get("connection");
						if (!connection.isLoopback) return;
						const listeners = /* @__PURE__ */ new Set();
						const unbind = child.on("connection/reset", () => {
							for (const listener of listeners) listener();
						});
						if (live) setClient({
							rpc: createAntigravityAuthRpcClient(connection.rpc),
							subscribe: (listener) => {
								listeners.add(listener);
								return () => {
									listeners.delete(listener);
								};
							}
						});
						return () => {
							unbind();
							if (live) setClient(null);
						};
					});
					return () => {
						live = false;
						fiber.dispose();
					};
				}, []);
				if (client === null) return h("p", {
					style: S.muted,
					role: "status"
				}, t("direct.unavailable"));
				return h("div", { className: "agy-direct-panel" }, status.directProxyInvalid ? h("p", { role: "alert" }, t("direct.proxyInvalid")) : null, h("div", { className: "agy-setting-row" }, h("div", { className: "agy-setting-copy" }, h("label", {
					htmlFor: "agy-direct-proxy",
					className: "agy-setting-label"
				}, t("direct.proxy")), h("span", {
					className: "agy-setting-help",
					style: S.muted
				}, t("direct.proxyHelp"))), h("div", { style: {
					display: "flex",
					gap: "6px",
					minWidth: 0,
					flexWrap: "wrap"
				} }, h("input", {
					id: "agy-direct-proxy",
					style: S.input,
					value: proxyDraft,
					placeholder: t("direct.proxyPlaceholder"),
					onChange: (e) => setProxyDraft(e.target?.value ?? "")
				}), h("button", {
					type: "button",
					className: "agy-btn",
					style: S.btn,
					onClick: () => {
						setConfig("directProxyUrl", proxyDraft.trim());
					}
				}, t("direct.proxySave")))), h(AntigravityAuthSettings, {
					...client,
					t: locale.bind("settings.antigravityAuth"),
					capabilityControls: {
						search: status.directSearch === true,
						image: status.directImage === true,
						video: status.directVideo === true,
						set: (capability, enabled) => {
							setConfig({
								search: "directSearch",
								image: "directImage",
								video: "directVideo"
							}[capability], enabled);
						}
					}
				}));
			};
			const AgySettingsSection = (props) => {
				const t = useAgyTranslation();
				const { status, refresh } = useAgyStatus();
				const [aliasInput, setAliasInput] = useState("");
				const [proxyInputs, setProxyInputs] = useState({});
				const [editingProxyId, setEditingProxyId] = useState(null);
				const [addingAccount, setAddingAccount] = useState(false);
				const [authCodeInput, setAuthCodeInput] = useState("");
				const [loadingAction, setLoadingAction] = useState(null);
				const [toast, setToast] = useState(null);
				const [expandedModels, setExpandedModels] = useState({});
				const [addProxyInput, setAddProxyInput] = useState("");
				const [optimisticActiveId, setOptimisticActiveId] = useState(null);
				const [, setTimeTick] = useState(0);
				useEffect(() => {
					const timer = setInterval(() => setTimeTick((n) => n + 1), 3e4);
					return () => clearInterval(timer);
				}, []);
				const flowStartedRef = useRef(false);
				const safeMessage = (code) => {
					const key = `auth.code.${code ?? ""}`;
					return code && key in en$1 ? t(key) : t("api.genericError");
				};
				useEffect(() => {
					if (!addingAccount || !flowStartedRef.current) return;
					const pa = status?.poolAuth;
					if (!pa) return;
					if (pa.phase === "done") {
						flowStartedRef.current = false;
						setAddingAccount(false);
						setAuthCodeInput("");
						setAliasInput("");
						setAddProxyInput("");
						showToast(safeMessage(pa.code), "success");
					} else if (pa.phase === "failed") {
						flowStartedRef.current = false;
						showToast(safeMessage(pa.code), "error");
					}
				}, [
					addingAccount,
					status?.poolAuth?.phase,
					status?.poolAuth?.code
				]);
				const toastTimerRef = useRef(null);
				useEffect(() => () => {
					if (toastTimerRef.current !== null) clearTimeout(toastTimerRef.current);
				}, []);
				const showToast = (text, type = "info") => {
					setToast({
						text,
						type,
						id: Date.now()
					});
					if (toastTimerRef.current !== null) clearTimeout(toastTimerRef.current);
					toastTimerRef.current = setTimeout(() => {
						toastTimerRef.current = null;
						setToast((prev) => prev !== null && prev.text === text ? null : prev);
					}, 6e3);
				};
				const actionFailed = () => {
					showToast(t("api.genericError"), "error");
				};
				const handleBeginAddAccount = async () => {
					setLoadingAction("pool:beginAdd");
					const alias = aliasInput.trim();
					const proxyUrl = addProxyInput.trim();
					const res = await postJson("/plugins/agy-link/pool/begin-add", {
						...alias ? { alias } : {},
						...proxyUrl ? { proxyUrl } : {}
					});
					setLoadingAction(null);
					if (res && res.ok) {
						flowStartedRef.current = true;
						await refresh();
						if (res.browserOpened) showToast(t("auth.browserOpened"), "info");
						else showToast(t("auth.browserManual"), "warn");
					} else showToast(res?.code === "invalid_proxy" ? t("proxy.invalid") : res?.code ? safeMessage(res.code) : t("auth.startFailed"), "error");
				};
				const handleCompleteAddAccount = async () => {
					if (!authCodeInput.trim()) return;
					setLoadingAction("pool:completeAdd");
					const res = await postJson("/plugins/agy-link/pool/complete-add", { code: authCodeInput.trim() });
					setLoadingAction(null);
					if (res && res.ok) {
						flowStartedRef.current = false;
						setAuthCodeInput("");
						setAliasInput("");
						setAddProxyInput("");
						setAddingAccount(false);
						await refresh();
						showToast(safeMessage(res.code), "success");
					} else showToast(safeMessage(res?.code), "error");
				};
				const handleCancelAddAccount = async () => {
					flowStartedRef.current = false;
					await postJson("/plugins/agy-link/pool/cancel-add", {});
					setAuthCodeInput("");
					setAliasInput("");
					setAddProxyInput("");
					setAddingAccount(false);
					await refresh();
				};
				const reorderAccounts = async (newIds) => {
					setLoadingAction("pool:reorder");
					const res = await postJson("/plugins/agy-link/pool/reorder", { ids: newIds });
					setLoadingAction(null);
					if (res && res.ok) {
						await refresh();
						showToast(t("account.reordered"), "success");
					} else actionFailed();
				};
				const moveAccount = async (accId, delta) => {
					const ids = (status?.pool?.accounts ?? []).map((a) => a.id);
					const idx = ids.indexOf(accId);
					if (idx === -1) return;
					const newIdx = idx + delta;
					if (newIdx < 0 || newIdx >= ids.length) return;
					const [moved] = ids.splice(idx, 1);
					if (moved) ids.splice(newIdx, 0, moved);
					await reorderAccounts(ids);
				};
				const setCfg = async (key, value) => {
					setLoadingAction(`config:${key}`);
					const res = await postJson("/plugins/agy-link/config", {
						key,
						value
					});
					if (res === null || res?.ok === false) {
						setLoadingAction(null);
						actionFailed();
						return false;
					}
					await refresh();
					setLoadingAction(null);
					return true;
				};
				const hiddenPendingRef = useRef(null);
				const toggleModelHidden = async (id, hide) => {
					const next = new Set(hiddenPendingRef.current ?? status?.hiddenModels ?? []);
					if (hide) next.add(id);
					else next.delete(id);
					hiddenPendingRef.current = next;
					try {
						await setCfg("hiddenModels", Array.from(next));
					} finally {
						if (hiddenPendingRef.current === next) hiddenPendingRef.current = null;
					}
				};
				const setActiveAccount = async (id) => {
					setOptimisticActiveId(id);
					setLoadingAction(`active:${id}`);
					try {
						const res = await postJson("/plugins/agy-link/pool/set-active", { id });
						if (res && res.ok) {
							await refresh();
							showToast(t("account.activeSet"), "success");
						} else {
							setOptimisticActiveId(null);
							showToast(res?.error || t("account.activeSetFailed"), "error");
						}
					} catch {
						setOptimisticActiveId(null);
						showToast(t("account.activeSetFailed"), "error");
					} finally {
						setOptimisticActiveId(null);
						setLoadingAction(null);
					}
				};
				const removeAccount = async (id, alias) => {
					setLoadingAction(`remove:${id}`);
					const res = await postJson("/plugins/agy-link/pool/remove", { id });
					if (res === null || res?.ok === false) {
						setLoadingAction(null);
						actionFailed();
						return;
					}
					await refresh();
					setLoadingAction(null);
					showToast(t("account.removed", { alias }), "info");
				};
				const toggleAccountEnabled = async (acc) => {
					const nextState = !acc.enabled;
					setLoadingAction(`enable:${acc.id}`);
					const res = await postJson("/plugins/agy-link/pool/enable", {
						id: acc.id,
						enabled: nextState
					});
					if (res === null || res?.ok === false) {
						setLoadingAction(null);
						actionFailed();
						return;
					}
					await refresh();
					setLoadingAction(null);
					const legacyDefault = acc.defaultAlias === void 0 && acc.systemHome && acc.alias === "主账号 (系统登录)";
					const displayAlias = acc.defaultAlias || legacyDefault ? acc.systemHome ? t("account.defaultAlias") : acc.alias : acc.alias;
					showToast(t(nextState ? "account.enabledToast" : "account.disabledToast", { alias: displayAlias }), "success");
				};
				const refreshQuota = async (id) => {
					setLoadingAction(id ? `refresh:${id}` : "refresh:all");
					try {
						const res = await postJson("/plugins/agy-link/pool/refresh-quota", { id });
						if (res === null || res?.ok === false) {
							actionFailed();
							return;
						}
						await refresh();
						showToast(t("quota.refreshed"), "success");
					} finally {
						setLoadingAction(null);
					}
				};
				const warmupAccount = async (id) => {
					setLoadingAction(id ? `warmup:${id}` : "warmup:all");
					try {
						const res = await postJson("/plugins/agy-link/pool/warmup", {
							id,
							force: true,
							...id ? {} : { all: true }
						});
						if (res === null || res?.ok === false) {
							actionFailed();
							return;
						}
						await refresh();
						const results = Array.isArray(res.results) ? res.results : [];
						const skippedCount = results.filter((r) => r.skipped).length;
						const successCount = results.filter((r) => r.success && !r.skipped).length;
						const failedCount = results.length - skippedCount - successCount;
						if (successCount > 0) showToast(id ? t("warmup.success") : t("warmup.allSuccess"), "success");
						else if (skippedCount > 0 && failedCount === 0) showToast(t("warmup.skipped"), "info");
						else actionFailed();
					} finally {
						setLoadingAction(null);
					}
				};
				const saveProxy = async (id) => {
					setLoadingAction(`proxy:${id}`);
					const proxyUrl = proxyInputs[id];
					const res = await postJson("/plugins/agy-link/pool/proxy", {
						id,
						proxyUrl
					});
					if (res === null || res?.ok === false) {
						setLoadingAction(null);
						if (res?.code === "invalid_proxy") showToast(t("proxy.invalid"), "error");
						else actionFailed();
						return;
					}
					setEditingProxyId(null);
					await refresh();
					setLoadingAction(null);
					showToast(t("proxy.saved"), "success");
				};
				const setMode = async (mode) => {
					setLoadingAction(`mode:${mode}`);
					const res = await postJson("/plugins/agy-link/pool/mode", { mode });
					if (res === null || res?.ok === false) {
						setLoadingAction(null);
						actionFailed();
						return;
					}
					await refresh();
					setLoadingAction(null);
				};
				const clearCooldown = async (id) => {
					setLoadingAction(id ? `clearCooldown:${id}` : "clearCooldown:all");
					const res = await postJson("/plugins/agy-link/pool/clear-cooldown", { id });
					if (res === null || res?.ok === false) {
						setLoadingAction(null);
						actionFailed();
						return;
					}
					await refresh();
					setLoadingAction(null);
					showToast(t("account.clearCooldown"), "success");
				};
				const toggleExpand = (accId) => {
					setExpandedModels((prev) => ({
						...prev,
						[accId]: !prev[accId]
					}));
				};
				const authPhase = status?.auth?.phase ?? "unknown";
				const pool = status?.pool;
				const catalogModels = status?.catalogModels ?? [];
				const hiddenModelSet = new Set(status?.hiddenModels ?? []);
				const accounts = pool?.accounts ?? [];
				const isAuthed = authPhase === "ok" || status?.poolAuth?.phase === "done";
				const isBusy = loadingAction !== null;
				/** Busy for a per-account action; also blocks while a global action runs. */
				const accountActionBusy = (acc, action) => loadingAction === `${action}:${acc.id}`;
				isBusy && loadingAction?.includes(":");
				const renderSpinner = () => h("span", { className: "agy-spinner" });
				const renderToastBanner = () => {
					if (!toast) return null;
					const style = {
						success: {
							background: "var(--agy-toast-success-bg)",
							border: "1px solid var(--agy-toast-success-border)",
							color: "var(--agy-toast-success-text)"
						},
						info: {
							background: "var(--agy-toast-info-bg)",
							border: "1px solid var(--agy-toast-info-border)",
							color: "var(--agy-toast-info-text)"
						},
						warn: {
							background: "var(--agy-toast-warn-bg)",
							border: "1px solid var(--agy-toast-warn-border)",
							color: "var(--agy-toast-warn-text)"
						},
						error: {
							background: "var(--agy-toast-error-bg)",
							border: "1px solid var(--agy-toast-error-border)",
							color: "var(--agy-toast-error-text)"
						}
					}[toast.type];
					return h("div", { style: {
						...S.noticeBanner,
						...style
					} }, h("div", { style: {
						display: "flex",
						alignItems: "center",
						gap: "8px",
						fontWeight: 600
					} }, uiIcon(toast.type === "success" ? "check" : toast.type === "error" || toast.type === "warn" ? "alert" : "globe", 14, style.color), h("span", null, toast.text)), h("button", {
						type: "button",
						style: {
							background: "transparent",
							border: "none",
							color: "inherit",
							cursor: "pointer",
							padding: "0 4px",
							opacity: .8,
							display: "inline-flex",
							alignItems: "center"
						},
						onClick: () => setToast(null),
						"aria-label": t("aria.closeToast")
					}, uiIcon("x", 12)));
				};
				const renderQuotaBar = (label, familyKey, acc) => renderFamilyQuotaBar(t, label, familyKey, acc, loadingAction === "refresh:all" || loadingAction === `refresh:${acc.id}`);
				const authoritativeActiveId = pool?.activeAccountId ?? pool?.lastActiveAccountId ?? pool?.activeAccountIds?.google ?? pool?.primaryAccountId;
				const activeAccountId = optimisticActiveId ?? authoritativeActiveId;
				const renderedAccountCards = accounts.map((acc) => {
					const hasCooldown = Object.entries(acc.cooldowns).some(([, cd]) => cd && cd.cooldownUntil > Date.now());
					const isAuthRequired = acc.authRequired;
					const isInUse = acc.enabled && !isAuthRequired && activeAccountId !== void 0 && activeAccountId === acc.id;
					const dotColor = !acc.enabled ? "#64748b" : isAuthRequired ? "#ef4444" : hasCooldown ? "#f59e0b" : "#10b981";
					const isEditingProxy = editingProxyId === acc.id;
					const isExpanded = expandedModels[acc.id] ?? false;
					const accIndex = accounts.indexOf(acc);
					const cardStyle = {
						...S.card,
						cursor: "default",
						padding: "12px 4px",
						marginBottom: "0",
						...!acc.enabled ? { opacity: .72 } : {}
					};
					const legacyDefault = acc.defaultAlias === void 0 && acc.systemHome && acc.alias === "主账号 (系统登录)";
					const displayAlias = acc.defaultAlias || legacyDefault ? acc.systemHome ? t("account.defaultAlias") : t("account.aliasDefault", { number: accIndex + 1 }) : acc.alias;
					const quotaPercent = (fraction) => typeof fraction === "number" && Number.isFinite(fraction) ? `${Math.round(Math.max(0, Math.min(1, fraction)) * 100)}%` : "—";
					const googleQuota = acc.quotas.google;
					const quotaSummary = googleQuota ? t("account.quotaSummary", {
						fiveHour: quotaPercent(googleQuota.remainingFraction),
						weekly: quotaPercent(googleQuota.weeklyFraction)
					}) : t("account.quotaPending");
					const googleModels = acc.quotas.google?.models ?? [];
					const argonModels = acc.quotas.argon?.models ?? [];
					const anthropicModels = acc.quotas.anthropic?.models ?? [];
					const openaiModels = acc.quotas.openai?.models ?? [];
					const allChildModels = [
						...googleModels.map((m) => ({
							family: "Google",
							model: m
						})),
						...argonModels.map((m) => ({
							family: "Argon",
							model: m
						})),
						...anthropicModels.map((m) => ({
							family: "Anthropic",
							model: m
						})),
						...openaiModels.map((m) => ({
							family: "OpenAI",
							model: m
						}))
					];
					return h("div", {
						key: acc.id,
						className: "agy-account-card agy-card-hover",
						style: cardStyle
					}, h("div", {
						className: "agy-account-header",
						style: {
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							userSelect: "none",
							gap: "8px",
							marginBottom: "8px"
						}
					}, h("div", {
						className: "agy-account-identity",
						style: {
							display: "flex",
							alignItems: "center",
							gap: "6px",
							flexWrap: "wrap",
							flex: "1",
							minWidth: 0
						}
					}, accounts.length > 1 ? h("span", {
						className: "agy-account-order",
						style: {
							color: "var(--agy-text-tertiary)",
							fontSize: "11px",
							fontVariantNumeric: "tabular-nums"
						},
						title: `优先级 #${accIndex + 1}`
					}, `${accIndex + 1}.`) : null, accounts.length > 1 ? h("div", { style: {
						display: "inline-flex",
						gap: "2px",
						alignItems: "center"
					} }, accIndex > 0 ? h("button", {
						type: "button",
						className: "agy-btn agy-account-order-button",
						"aria-label": t("account.moveUp"),
						style: {
							...S.btnSm,
							padding: "1px 4px",
							fontSize: "10px",
							lineHeight: 1,
							height: "18px"
						},
						title: t("account.moveUp"),
						onClick: () => void moveAccount(acc.id, -1)
					}, uiIcon("arrowUp", 10)) : null, accIndex < accounts.length - 1 ? h("button", {
						type: "button",
						className: "agy-btn agy-account-order-button",
						"aria-label": t("account.moveDown"),
						style: {
							...S.btnSm,
							padding: "1px 4px",
							fontSize: "10px",
							lineHeight: 1,
							height: "18px"
						},
						title: t("account.moveDown"),
						onClick: () => void moveAccount(acc.id, 1)
					}, uiIcon("arrowDown", 10)) : null) : null, h("span", {
						className: "agy-pulse-dot",
						style: {
							background: dotColor,
							marginLeft: "1px"
						}
					}), h("span", {
						style: {
							fontWeight: 700,
							fontSize: "13px",
							color: "var(--agy-text-primary)",
							whiteSpace: "nowrap"
						},
						title: displayAlias
					}, displayAlias), isAuthRequired ? h("span", {
						className: "agy-account-state agy-account-state-error",
						style: {
							...S.badgeTag,
							background: "var(--agy-badge-email-bg)",
							color: "#ef4444",
							borderColor: "#fca5a5",
							gap: "3px",
							fontSize: "10px",
							padding: "1px 5px",
							fontWeight: 700,
							whiteSpace: "nowrap",
							flexShrink: 0
						}
					}, uiIcon("alert", 10, "#ef4444"), t("status.authRequired")) : null, hasCooldown ? h("span", {
						className: "agy-account-state agy-account-state-warning",
						style: {
							...S.badgeTag,
							background: "rgba(245, 158, 11, 0.15)",
							color: "#f59e0b",
							borderColor: "rgba(245, 158, 11, 0.4)",
							gap: "3px",
							fontSize: "10px",
							padding: "1px 5px",
							fontWeight: 700,
							whiteSpace: "nowrap",
							flexShrink: 0
						}
					}, uiIcon("alert", 10, "#f59e0b"), "冷却中") : null, acc.email ? h("span", {
						className: "agy-account-email",
						style: {
							...S.badgeTag,
							background: "var(--agy-badge-email-bg)",
							color: "var(--agy-badge-email-text)",
							borderColor: "var(--agy-badge-email-border)",
							gap: "4px",
							fontSize: "11px",
							padding: "1px 6px",
							whiteSpace: "nowrap"
						},
						title: acc.email
					}, uiIcon("mail", 10, "var(--agy-badge-email-text)"), acc.email) : null, isInUse ? h("span", {
						className: "agy-account-state agy-account-state-selected",
						style: {
							...S.badgeTag,
							background: "rgba(16, 185, 129, 0.12)",
							color: "#10b981",
							borderColor: "rgba(16, 185, 129, 0.45)",
							gap: "3px",
							fontSize: "10px",
							padding: "1px 5px",
							fontWeight: 700,
							whiteSpace: "nowrap",
							flexShrink: 0
						},
						title: t("status.inUse")
					}, uiIcon("zap", 10, "#10b981"), t("status.inUse")) : null, (() => {
						const effectiveProxy = acc.proxyUrl || pool?.systemProxy;
						return effectiveProxy ? h("span", {
							className: "agy-account-meta",
							style: {
								...S.badgeTag,
								background: "var(--agy-badge-proxy-bg)",
								color: "var(--agy-badge-proxy-text)",
								borderColor: "var(--agy-badge-proxy-border)",
								gap: "4px",
								fontSize: "10px",
								padding: "1px 5px"
							},
							title: effectiveProxy
						}, uiIcon("globe", 10, "var(--agy-badge-proxy-text)"), t("status.proxy")) : null;
					})(), !acc.enabled ? h("span", {
						className: "agy-account-state",
						style: {
							...S.badgeTag,
							background: "var(--agy-bg-subbox)",
							color: "var(--agy-text-secondary)",
							borderColor: "var(--agy-border-subbox)",
							gap: "3px",
							fontSize: "10px",
							padding: "1px 5px",
							fontWeight: 700
						},
						title: t("status.disabled")
					}, uiIcon("power", 10, "#64748b"), t("status.disabled")) : null), h("div", {
						className: "agy-card-actions",
						style: {
							display: "flex",
							gap: "4px",
							alignItems: "center",
							flexShrink: 0
						}
					}, h("button", {
						type: "button",
						className: `agy-btn agy-account-action${acc.enabled ? "" : " agy-account-action-primary"}`,
						style: acc.enabled ? {
							...S.btnSm,
							gap: "3px",
							fontSize: "11px",
							padding: "2px 6px"
						} : {
							...S.btnSmPrimary,
							gap: "3px",
							fontSize: "11px",
							padding: "2px 6px"
						},
						title: acc.enabled ? t("account.disableTitle") : t("account.enableTitle"),
						disabled: accountActionBusy(acc, "enable"),
						onClick: () => void toggleAccountEnabled(acc)
					}, loadingAction === `enable:${acc.id}` ? [renderSpinner(), acc.enabled ? t("account.disable") : t("account.enable")] : [uiIcon("power", 10, "currentColor"), ` ${acc.enabled ? t("account.disable") : t("account.enable")}`]), h("button", {
						type: "button",
						className: "agy-btn agy-account-action",
						style: {
							...S.btnSm,
							gap: "3px",
							fontSize: "11px",
							padding: "2px 6px",
							minWidth: "58px",
							justifyContent: "center"
						},
						title: t("account.syncTitle"),
						disabled: accountActionBusy(acc, "refresh"),
						onClick: () => void refreshQuota(acc.id)
					}, loadingAction === `refresh:${acc.id}` ? [renderSpinner(), t("account.syncing")] : [uiIcon("refresh", 10), ` ${t("account.sync")}`]), acc.enabled && !acc.authRequired ? h("button", {
						type: "button",
						className: "agy-btn agy-account-action",
						style: {
							...S.btnSm,
							gap: "3px",
							fontSize: "11px",
							padding: "2px 6px",
							minWidth: "58px",
							justifyContent: "center"
						},
						title: t("account.warmupTitle"),
						disabled: accountActionBusy(acc, "warmup"),
						onClick: () => void warmupAccount(acc.id)
					}, loadingAction === `warmup:${acc.id}` ? [renderSpinner(), t("account.warmingUp")] : [uiIcon("flame", 10, "var(--agy-text-secondary)"), ` ${t("account.warmup")}`]) : null, acc.enabled && !isInUse ? h("button", {
						type: "button",
						className: "agy-btn agy-account-action agy-account-action-primary",
						style: {
							...S.btnSm,
							gap: "3px",
							fontSize: "11px",
							padding: "2px 6px"
						},
						title: t("account.setActive"),
						disabled: accountActionBusy(acc, "active"),
						onClick: () => void setActiveAccount(acc.id)
					}, loadingAction === `active:${acc.id}` ? [renderSpinner(), t("account.settingActive")] : [uiIcon("zap", 10), ` ${t("account.setActive")}`]) : null, h("button", {
						type: "button",
						className: `agy-btn agy-account-action${isEditingProxy ? " agy-account-action-primary" : ""}`,
						style: isEditingProxy ? {
							...S.btnSmPrimary,
							gap: "3px",
							fontSize: "11px",
							padding: "2px 6px"
						} : {
							...S.btnSm,
							gap: "3px",
							fontSize: "11px",
							padding: "2px 6px"
						},
						disabled: accountActionBusy(acc, "proxy"),
						onClick: () => setEditingProxyId(isEditingProxy ? null : acc.id)
					}, [uiIcon("globe", 10), ` ${t("proxy.button")}`]), accounts.length > 1 ? h("button", {
						type: "button",
						className: "agy-btn agy-account-action agy-account-action-danger",
						style: {
							...S.btnDanger,
							padding: "2px 6px",
							fontSize: "11px"
						},
						title: t("account.removeTitle"),
						"aria-label": t("account.removeTitle"),
						disabled: accountActionBusy(acc, "remove"),
						onClick: () => void removeAccount(acc.id, displayAlias)
					}, loadingAction === `remove:${acc.id}` ? renderSpinner() : uiIcon("trash", 11, "var(--agy-danger-text)")) : null)), h("div", {
						key: "agy-body",
						className: "agy-account-quota",
						style: S.quotaBox
					}, h("div", { className: "agy-account-quota-summary" }, h("span", { className: "agy-quota-summary-text" }, quotaSummary), h("button", {
						type: "button",
						className: "agy-btn agy-account-expand",
						"aria-expanded": isExpanded,
						"aria-controls": `agy-quota-${acc.id}`,
						onClick: () => toggleExpand(acc.id)
					}, uiIcon(isExpanded ? "chevronUp" : "chevronDown", 11), t(isExpanded ? "account.collapseOthers" : "account.expandOthers"))), isExpanded ? h("div", { id: `agy-quota-${acc.id}` }, renderQuotaBar("Gemini", "google", acc), acc.quotas.argon ? renderQuotaBar("Argon", "argon", acc) : null, renderQuotaBar("Claude", "anthropic", acc), renderQuotaBar("GPT-OSS", "openai", acc), allChildModels.length > 0 ? h("div", { style: {
						marginTop: "8px",
						paddingTop: "8px",
						borderTop: "1px solid var(--agy-border-box)"
					} }, h("div", { style: {
						color: "var(--agy-text-secondary)",
						marginBottom: "6px",
						fontWeight: 600,
						fontSize: "11px"
					} }, t("account.models")), allChildModels.map(({ family, model }) => {
						const frac = model.remainingFraction ?? 1;
						const pct = Math.round(frac * 100);
						const w = formatQuotaWindow(t, model.resetTime);
						const pColor = pct <= 20 ? "var(--agy-quota-low-text)" : pct <= 50 ? "var(--agy-quota-med-text)" : "var(--agy-quota-high-text)";
						return h("div", {
							key: `${family}-${model.modelId}`,
							className: "agy-submodel-row"
						}, h("span", { style: {
							fontWeight: 500,
							color: "var(--agy-text-primary)"
						} }, `[${family}] ${model.displayName || model.modelId}`), h("div", { style: {
							display: "flex",
							alignItems: "center",
							gap: "8px"
						} }, h("span", { style: {
							color: pColor,
							fontWeight: 700
						} }, `${pct}%`), w.resetText ? h("span", { style: {
							color: "var(--agy-text-tertiary)",
							fontSize: "10.5px"
						} }, `↻ ${w.resetText}`) : null));
					})) : null) : h("div", {
						id: `agy-quota-${acc.id}`,
						hidden: true
					})), hasCooldown ? h("div", {
						key: "cd-body",
						style: {
							background: "var(--agy-warn-bg)",
							border: "1px solid var(--agy-warn-border)",
							borderRadius: "7px",
							padding: "6px 10px",
							color: "var(--agy-warn-text)",
							fontSize: "11.5px",
							fontWeight: 600,
							marginTop: "8px",
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between"
						}
					}, h("div", { style: {
						display: "flex",
						alignItems: "center",
						gap: "6px"
					} }, uiIcon("alert", 13, "var(--agy-warn-text)"), h("span", null, t("account.cooldown"))), h("button", {
						type: "button",
						className: "agy-btn",
						style: {
							...S.btnSm,
							color: "var(--agy-warn-btn-text)",
							borderColor: "var(--agy-warn-btn-border)",
							background: "var(--agy-warn-btn-bg)",
							gap: "4px"
						},
						disabled: accountActionBusy(acc, "clearCooldown"),
						onClick: () => void clearCooldown(acc.id)
					}, loadingAction === `clearCooldown:${acc.id}` ? [renderSpinner(), ""] : [uiIcon("zap", 11, "var(--agy-warn-btn-text)"), ` ${t("account.clearCooldown")}`])) : null, isEditingProxy ? h("div", {
						key: "proxy-body",
						style: {
							marginTop: "8px",
							padding: "10px 12px",
							background: "var(--agy-bg-subbox)",
							borderRadius: "7px",
							border: "1px solid var(--agy-border-subbox)"
						}
					}, h("div", { style: {
						display: "flex",
						gap: "8px"
					} }, h("input", {
						style: S.input,
						value: proxyInputs[acc.id] !== void 0 ? proxyInputs[acc.id] : acc.proxyUrl ?? "",
						placeholder: pool?.systemProxy ? `${t("proxy.placeholder")} (${pool.systemProxy})` : t("proxy.placeholder"),
						"aria-label": t("aria.proxyInput"),
						onChange: (e) => setProxyInputs({
							...proxyInputs,
							[acc.id]: e.target.value
						})
					}), h("button", {
						type: "button",
						className: "agy-btn agy-btn-primary",
						style: S.btnPrimary,
						disabled: accountActionBusy(acc, "proxy"),
						onClick: () => void saveProxy(acc.id)
					}, loadingAction === `proxy:${acc.id}` ? [renderSpinner(), t("proxy.save")] : t("proxy.save")), h("button", {
						type: "button",
						className: "agy-btn",
						style: S.btn,
						onClick: () => setEditingProxyId(null)
					}, t("cancel")))) : null);
				});
				const poolAuth = status?.poolAuth;
				const flowPhase = poolAuth?.phase ?? "idle";
				const flowActive = flowPhase === "waiting" || flowPhase === "exchanging";
				const addAccountSection = addingAccount ? h("div", {
					style: S.authModal,
					role: "group",
					"aria-label": t("account.add")
				}, h("div", { style: {
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					marginBottom: "12px",
					flexWrap: "wrap",
					gap: "8px"
				} }, h("div", { style: {
					fontWeight: 700,
					fontSize: "13.5px",
					display: "flex",
					alignItems: "center",
					gap: "6px",
					color: "var(--agy-text-primary)"
				} }, uiIcon("plus", 13, "var(--agy-btn-primary-bg)"), t("account.add"))), !flowActive ? h("div", null, h("div", { style: {
					display: "flex",
					flexDirection: "column",
					gap: "8px",
					marginBottom: "12px"
				} }, h("input", {
					style: S.input,
					value: aliasInput,
					placeholder: t("account.aliasPlaceholder"),
					"aria-label": t("aria.aliasInput"),
					onChange: (e) => setAliasInput(e.target.value)
				}), h("input", {
					style: S.input,
					value: addProxyInput,
					placeholder: pool?.systemProxy ? `${t("account.proxyPlaceholder")} (${pool.systemProxy})` : t("account.proxyPlaceholder"),
					"aria-label": t("aria.proxyInput"),
					onChange: (e) => setAddProxyInput(e.target.value)
				})), h("div", { style: {
					display: "flex",
					gap: "8px"
				} }, h("button", {
					type: "button",
					className: "agy-btn agy-btn-primary",
					style: {
						...S.btnPrimary,
						gap: "4px"
					},
					disabled: isBusy,
					onClick: () => void handleBeginAddAccount()
				}, loadingAction === "pool:beginAdd" ? [renderSpinner(), t("auth.openingBrowser")] : [uiIcon("externalLink", 12, "currentColor"), ` ${t("auth.openBrowser")}`]), h("button", {
					type: "button",
					className: "agy-btn",
					style: S.btn,
					onClick: () => handleCancelAddAccount()
				}, t("cancel"))), flowPhase === "failed" ? h("div", { style: {
					...S.muted,
					color: "var(--agy-danger-text)",
					marginTop: "8px",
					display: "flex",
					alignItems: "center",
					gap: "5px",
					fontWeight: 600
				} }, uiIcon("alert", 12, "var(--agy-danger-text)"), safeMessage(poolAuth?.code)) : null) : h("div", null, h("div", { style: {
					display: "flex",
					alignItems: "center",
					color: "var(--agy-text-secondary)",
					marginBottom: "8px",
					lineHeight: 1.5,
					fontSize: "12px"
				} }, renderSpinner(), flowPhase === "exchanging" ? t("auth.exchanging") : t("auth.waiting")), poolAuth?.url ? h("div", { style: { marginBottom: "8px" } }, h("a", {
					href: poolAuth.url,
					target: "_blank",
					style: {
						color: "var(--dsw-alias-state-business-primary, #2563eb)",
						textDecoration: "underline",
						fontSize: "12px",
						fontWeight: 600,
						display: "inline-flex",
						alignItems: "center",
						gap: "4px"
					}
				}, uiIcon("externalLink", 12, "currentColor"), t("auth.openManual"))) : null, h("div", { style: {
					color: "var(--agy-text-tertiary)",
					marginBottom: "6px",
					fontSize: "11px",
					fontWeight: 500
				} }, t("auth.pasteHint")), h("div", { style: {
					display: "flex",
					gap: "8px"
				} }, h("input", {
					style: S.input,
					value: authCodeInput,
					placeholder: t("auth.codePlaceholder"),
					"aria-label": t("aria.authCodeInput"),
					onChange: (e) => setAuthCodeInput(e.target.value)
				}), h("button", {
					type: "button",
					className: "agy-btn agy-btn-primary",
					style: {
						...S.btnPrimary,
						gap: "4px"
					},
					disabled: isBusy || !authCodeInput.trim(),
					onClick: () => void handleCompleteAddAccount()
				}, loadingAction === "pool:completeAdd" ? [renderSpinner(), t("auth.activating")] : [uiIcon("check", 12, "currentColor"), ` ${t("auth.activate")}`]), h("button", {
					type: "button",
					className: "agy-btn",
					style: S.btn,
					onClick: () => handleCancelAddAccount()
				}, t("cancel"))))) : null;
				if (status === null) return h("div", { style: {
					...S.container,
					minHeight: "120px",
					display: "flex",
					alignItems: "center",
					justifyContent: "center"
				} }, h("span", { style: S.muted }, [renderSpinner(), t("status.loading")]));
				return h("div", {
					className: "agy-console",
					style: S.container
				}, h("div", { style: S.headerCard }, h("div", {
					className: "agy-console-status",
					role: "status"
				}, h("span", {
					className: "agy-console-status-dot",
					"data-state": status?.enabled === false ? "disabled" : isAuthed ? "ready" : "pending",
					"aria-hidden": true
				}), h("span", null, status?.enabled === false ? t("status.disabled") : isAuthed ? t("status.ready") : t("status.unverified"))), h("div", {
					className: "agy-header-actions",
					style: {
						display: "flex",
						gap: "6px",
						alignItems: "center"
					}
				}, !addingAccount ? h("button", {
					type: "button",
					className: "agy-btn agy-btn-primary",
					style: {
						...S.btnPrimary,
						gap: "4px"
					},
					onClick: () => setAddingAccount(true)
				}, [uiIcon("plus", 12, "currentColor"), ` ${t("header.addAccount")}`]) : null, h("button", {
					type: "button",
					className: "agy-btn",
					title: t("header.warmup"),
					style: {
						...S.btn,
						gap: "4px"
					},
					disabled: isBusy,
					onClick: () => void warmupAccount()
				}, loadingAction === "warmup:all" ? [renderSpinner(), t("header.warmingUp")] : [uiIcon("flame", 12, "var(--agy-text-secondary)"), ` ${t("header.warmup")}`]), h("button", {
					type: "button",
					className: "agy-btn",
					title: t("header.refreshQuota"),
					style: {
						...S.btn,
						gap: "4px"
					},
					disabled: isBusy,
					onClick: () => void refreshQuota()
				}, loadingAction === "refresh:all" ? [renderSpinner(), t("header.refreshing")] : [uiIcon("refresh", 12, "var(--agy-text-btn)"), ` ${t("header.refreshQuota")}`]))), renderToastBanner(), h("div", { className: "agy-setting-row agy-direct-mode-row" }, h("div", { className: "agy-direct-mode-copy" }, h("span", {
					id: "agy-direct-mode-label",
					className: "agy-setting-label"
				}, t("direct.title")), h("span", {
					className: "agy-setting-help",
					style: S.muted
				}, t("direct.description"))), h("button", {
					type: "button",
					className: "agy-direct-mode-switch",
					role: "switch",
					"aria-labelledby": "agy-direct-mode-label",
					"aria-checked": status.experimentalDirect === true,
					disabled: loadingAction === "config:experimentalDirect",
					onClick: () => {
						setCfg("experimentalDirect", status.experimentalDirect !== true);
					}
				}, h("span", {
					className: "agy-direct-mode-switch-knob",
					"aria-hidden": true
				}))), status.directRuntime === "starting" ? h("p", {
					style: S.muted,
					role: "status"
				}, t("direct.loading")) : null, status.directRuntime === "error" ? h("p", { role: "alert" }, t("direct.error")) : null, status.directRuntime === "loaded" ? h(DirectSettingsPane, {
					status,
					setConfig: setCfg
				}) : null, addAccountSection, h("div", {
					className: "agy-section-heading",
					style: {
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						marginBottom: "4px",
						padding: "0 2px"
					}
				}, h("div", { style: {
					display: "flex",
					alignItems: "center",
					gap: "6px"
				} }, h("span", { style: {
					fontWeight: 600,
					color: "var(--agy-text-primary)"
				} }, `账号池 (${accounts.length})`))), renderedAccountCards, h("div", {
					className: "agy-settings-section",
					style: {
						marginTop: "18px",
						paddingTop: "12px",
						borderTop: "1px solid var(--agy-border-divider)"
					}
				}, h("div", {
					className: "agy-settings",
					style: {
						display: "flex",
						flexDirection: "column",
						gap: "10px"
					}
				}, h("div", {
					className: "agy-settings-heading",
					style: {
						display: "flex",
						flexDirection: "column",
						gap: "2px",
						paddingBottom: "4px"
					}
				}, h("span", {
					className: "agy-section-heading",
					style: { color: "var(--agy-text-primary)" }
				}, t("config.runtimeTitle")), h("span", { style: S.muted }, t("config.runtimeDesc"))), h("div", { className: "agy-setting-row agy-permission-row" }, h("div", {
					className: "agy-setting-copy",
					style: {
						display: "flex",
						flexDirection: "column"
					}
				}, h("label", {
					className: "agy-setting-label",
					htmlFor: "agy-permission-mode",
					style: { color: "var(--agy-text-primary)" }
				}, t("config.permissionMode")), h("span", {
					className: "agy-setting-help",
					style: S.muted,
					role: "status"
				}, status?.permissionMode === "skip" ? t("config.permissionSkipDesc") : t("config.permissionDesc"))), h("select", {
					id: "agy-permission-mode",
					className: "agy-select",
					style: {
						...S.select,
						width: "100%",
						height: "32px"
					},
					value: status?.permissionMode ?? "accept-edits",
					disabled: loadingAction === "config:permissionMode",
					onChange: (e) => void setCfg("permissionMode", e.target?.value)
				}, [
					h("option", { value: "plan" }, t("config.permissionPlan")),
					h("option", { value: "accept-edits" }, t("config.permissionEdits")),
					h("option", { value: "skip" }, t("config.permissionSkip"))
				])), h("div", {
					className: "agy-setting-row",
					style: {
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between"
					}
				}, h("div", {
					className: "agy-setting-copy",
					style: {
						display: "flex",
						flexDirection: "column"
					}
				}, h("span", {
					className: "agy-setting-label",
					style: { color: "var(--agy-text-primary)" }
				}, t("pool.label"))), h("div", { style: S.segGroup }, h("button", {
					type: "button",
					style: pool?.mode === "manual" || !pool?.mode ? S.segBtnActive : S.segBtn,
					"aria-pressed": pool?.mode === "manual" || !pool?.mode,
					onClick: () => void setMode("manual")
				}, t("pool.manual")), h("button", {
					type: "button",
					style: pool?.mode === "sequential" ? S.segBtnActive : S.segBtn,
					"aria-pressed": pool?.mode === "sequential",
					onClick: () => void setMode("sequential")
				}, t("pool.sequential")), h("button", {
					type: "button",
					style: pool?.mode === "round-robin" ? S.segBtnActive : S.segBtn,
					"aria-pressed": pool?.mode === "round-robin",
					onClick: () => void setMode("round-robin")
				}, t("pool.roundRobin")))), h("div", {
					className: "agy-setting-row",
					style: {
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between"
					}
				}, h("div", {
					className: "agy-setting-copy",
					style: {
						display: "flex",
						flexDirection: "column"
					}
				}, h("span", {
					className: "agy-setting-label",
					style: { color: "var(--agy-text-primary)" }
				}, t("config.autoWarmup")), h("span", {
					className: "agy-setting-help",
					style: S.muted
				}, t("config.autoWarmupDesc"))), h("div", { style: S.segGroup }, h("button", {
					type: "button",
					style: status?.autoWarmup === true ? S.segBtnActive : S.segBtn,
					disabled: loadingAction === "config:autoWarmup",
					onClick: () => void setCfg("autoWarmup", true)
				}, t("config.on")), h("button", {
					type: "button",
					style: status?.autoWarmup !== true ? S.segBtnActive : S.segBtn,
					disabled: loadingAction === "config:autoWarmup",
					onClick: () => void setCfg("autoWarmup", false)
				}, t("config.off")))), h("div", {
					className: "agy-setting-row",
					style: {
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						gap: "10px"
					}
				}, h("div", {
					className: "agy-setting-copy",
					style: {
						display: "flex",
						flexDirection: "column",
						minWidth: 0,
						flex: "1 1 0"
					}
				}, h("span", {
					className: "agy-setting-label",
					style: { color: "var(--agy-text-primary)" }
				}, t("config.autoTranslate")), h("span", {
					className: "agy-setting-help",
					style: S.muted
				}, t("config.autoTranslateDesc"))), h("div", { style: S.cfgRowRight }, h("div", { style: S.segGroup }, h("button", {
					type: "button",
					style: status?.autoTranslate === true ? S.segBtnActive : S.segBtn,
					disabled: loadingAction === "config:autoTranslate",
					onClick: () => void setCfg("autoTranslate", true)
				}, t("config.on")), h("button", {
					type: "button",
					style: status?.autoTranslate !== true ? S.segBtnActive : S.segBtn,
					disabled: loadingAction === "config:autoTranslate",
					onClick: () => void setCfg("autoTranslate", false)
				}, t("config.off"))), h("select", {
					className: "agy-select",
					"aria-label": t("config.translateModel"),
					title: t("config.translateModelDesc"),
					style: S.select,
					value: status?.translateModel ?? "",
					disabled: loadingAction === "config:translateModel",
					onChange: (e) => void setCfg("translateModel", e?.target?.value ?? "")
				}, translateModelOptions(status?.translateModel ?? "", geminiCatalogModels(catalogModels), t("config.translateModelAuto")).map((option) => h("option", {
					key: option.value,
					value: option.value
				}, option.label))), h("select", {
					className: "agy-select",
					"aria-label": t("config.translateEffort"),
					title: t("config.translateEffortDesc"),
					style: {
						...S.select,
						minWidth: "78px",
						maxWidth: "110px"
					},
					value: status?.translateEffort ?? "",
					disabled: loadingAction === "config:translateEffort",
					onChange: (e) => void setCfg("translateEffort", e?.target?.value ?? "")
				}, translateEffortOptions(status?.translateEffort ?? "", {
					auto: t("config.translateEffortAuto"),
					low: t("effort.low"),
					medium: t("effort.medium"),
					high: t("effort.high")
				}).map((option) => h("option", {
					key: option.value,
					value: option.value
				}, option.label))))), h("div", {
					className: "agy-setting-row",
					style: {
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between"
					}
				}, h("div", {
					className: "agy-setting-copy",
					style: {
						display: "flex",
						flexDirection: "column"
					}
				}, h("span", {
					className: "agy-setting-label",
					style: { color: "var(--agy-text-primary)" }
				}, t("config.defaultEffort")), h("span", {
					className: "agy-setting-help",
					style: S.muted
				}, t("config.defaultEffortDesc"))), h("div", { style: S.segGroup }, h("button", {
					type: "button",
					style: status?.defaultEffort === "" ? S.segBtnActive : S.segBtn,
					disabled: loadingAction === "config:defaultEffort",
					onClick: () => void setCfg("defaultEffort", "")
				}, t("effort.auto")), h("button", {
					type: "button",
					style: status?.defaultEffort === "low" ? S.segBtnActive : S.segBtn,
					disabled: loadingAction === "config:defaultEffort",
					onClick: () => void setCfg("defaultEffort", "low")
				}, t("effort.low")), h("button", {
					type: "button",
					style: status?.defaultEffort === "medium" ? S.segBtnActive : S.segBtn,
					disabled: loadingAction === "config:defaultEffort",
					onClick: () => void setCfg("defaultEffort", "medium")
				}, t("effort.medium")), h("button", {
					type: "button",
					style: status?.defaultEffort === "high" ? S.segBtnActive : S.segBtn,
					disabled: loadingAction === "config:defaultEffort",
					onClick: () => void setCfg("defaultEffort", "high")
				}, t("effort.high")))), h("div", {
					className: "agy-setting-models",
					style: {
						display: "flex",
						flexDirection: "column",
						gap: "6px",
						padding: "10px 0"
					}
				}, h("span", {
					className: "agy-setting-label",
					style: { color: "var(--agy-text-primary)" }
				}, t("models.label")), catalogModels.length === 0 ? h("span", { style: S.muted }, t("models.empty")) : h("div", { style: {
					display: "flex",
					flexWrap: "wrap",
					gap: "6px"
				} }, catalogModels.map((m) => {
					const isHidden = hiddenModelSet.has(m.id);
					return h("button", {
						type: "button",
						key: m.id,
						title: m.id,
						disabled: loadingAction === "config:hiddenModels",
						style: isHidden ? {
							...S.segBtn,
							opacity: .45,
							textDecoration: "line-through"
						} : S.segBtnActive,
						onClick: () => void toggleModelHidden(m.id, !isHidden)
					}, m.name);
				})), h("span", { style: S.muted }, t("models.hint"))))));
			};
			/** Modal dialog container rendered into document.body */
			const AgyModalDialog = () => {
				const t = useAgyTranslation();
				useEffect(() => {
					const onKey = (e) => {
						if (e.key === "Escape") {
							e.stopPropagation();
							agyModalStore.setOpen(false);
						}
					};
					win.addEventListener?.("keydown", onKey, true);
					return () => win.removeEventListener?.("keydown", onKey, true);
				}, []);
				useEffect(() => {
					if (typeof document === "undefined") return;
					const block = (e) => {
						const target = e?.target;
						if (typeof target?.closest !== "function") return;
						if (target.closest(".agy-modal-backdrop") === null) return;
						if (target.closest(".agy-modal-body") !== null) return;
						e.preventDefault?.();
					};
					document.addEventListener("wheel", block, {
						passive: false,
						capture: true
					});
					document.addEventListener("touchmove", block, {
						passive: false,
						capture: true
					});
					return () => {
						document.removeEventListener("wheel", block, true);
						document.removeEventListener("touchmove", block, true);
					};
				}, []);
				return h("div", {
					className: "agy-modal-backdrop",
					onClick: (e) => {
						if (e.target === e.currentTarget) agyModalStore.setOpen(false);
					}
				}, h("div", {
					className: "agy-modal-panel",
					role: "dialog",
					"aria-modal": true,
					"aria-labelledby": "agy-console-title"
				}, h("div", {
					className: "agy-modal-head",
					style: {
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						padding: "12px 16px",
						borderBottom: "1px solid var(--agy-border-card)",
						background: "transparent",
						color: "var(--agy-text-primary)"
					}
				}, h("div", { style: {
					display: "flex",
					alignItems: "center",
					gap: "8px"
				} }, agyIcon(18), h("strong", {
					id: "agy-console-title",
					style: {
						fontSize: "14.5px",
						fontWeight: 700,
						color: "var(--agy-text-primary)"
					}
				}, t("console.title"))), h("button", {
					type: "button",
					className: "agy-btn",
					title: t("console.close"),
					"aria-label": t("console.close"),
					style: {
						background: "transparent",
						border: "1px solid transparent",
						color: "var(--agy-text-btn)",
						cursor: "pointer",
						padding: "6px",
						borderRadius: "6px",
						display: "inline-flex",
						alignItems: "center"
					},
					onClick: () => agyModalStore.setOpen(false)
				}, uiIcon("x", 14, "var(--agy-text-btn)"))), h("div", {
					className: "agy-modal-body",
					style: {
						overflowY: "auto",
						overscrollBehavior: "contain",
						padding: "14px 16px 16px",
						flex: "1",
						minHeight: 0,
						background: "var(--agy-bg-panel)"
					}
				}, h(AgySettingsSection, {
					isModal: true,
					onClose: () => agyModalStore.setOpen(false)
				}))));
			};
			/** Session Header badge in chat toolbar */
			const AgySessionStatus = () => {
				const hostIdRef = useRef(null);
				if (hostIdRef.current === null) hostIdRef.current = "host_" + Math.random().toString(36).slice(2);
				const hostId = hostIdRef.current;
				const [isPrimaryHost, setIsPrimaryHost] = useState(() => {
					if (modalHostManager.activeId === null) {
						modalHostManager.activeId = hostId;
						return true;
					}
					return modalHostManager.activeId === hostId;
				});
				useEffect(() => {
					return modalHostManager.register(hostId, setIsPrimaryHost);
				}, [hostId]);
				const [isModalOpen, setIsModalOpen] = useState(agyModalStore.open);
				useEffect(() => {
					return agyModalStore.subscribe(() => {
						setIsModalOpen(agyModalStore.open);
					});
				}, []);
				const t = useAgyTranslation();
				const { status } = useAgyStatus();
				const [, setTimeTick] = useState(0);
				useEffect(() => {
					const timer = setInterval(() => setTimeTick((n) => n + 1), 3e4);
					return () => clearInterval(timer);
				}, []);
				const pool = status?.pool;
				const accounts = pool?.accounts ?? [];
				const rawActiveId = pool?.activeAccountId ?? pool?.lastActiveAccountId ?? pool?.activeAccountIds?.google ?? pool?.primaryAccountId;
				const activeAcc = rawActiveId !== void 0 ? accounts.find((a) => a.id === rawActiveId) : void 0;
				const activeAuthRequired = activeAcc?.authRequired === true;
				const activeHasCooldown = activeAcc ? Object.entries(activeAcc.cooldowns ?? {}).some(([, cd]) => cd && cd.cooldownUntil > Date.now()) : false;
				const allInCooldown = accounts.length > 0 && accounts.every((a) => !a.enabled || a.authRequired || Object.entries(a.cooldowns ?? {}).some(([, cd]) => cd && cd.cooldownUntil > Date.now()));
				const isAuthed = status?.auth?.phase === "ok" || status?.poolAuth?.phase === "done";
				const color = status === null ? "#64748b" : status.dormantReason ? "#f59e0b" : allInCooldown ? "#f59e0b" : activeAuthRequired ? "#ef4444" : activeHasCooldown ? "#f59e0b" : isAuthed ? "#10b981" : "#f59e0b";
				const legacyDefault = activeAcc && activeAcc.defaultAlias === void 0 && activeAcc.systemHome && activeAcc.alias === "主账号 (系统登录)";
				const displayAlias = activeAcc ? activeAcc.defaultAlias || legacyDefault ? activeAcc.systemHome ? t("account.defaultAlias") : t("account.aliasDefault", { number: accounts.indexOf(activeAcc) + 1 }) : activeAcc.alias : "";
				const activeEligible = activeAcc !== void 0 && activeAcc.enabled && !activeAcc.authRequired;
				const activeDetail = activeAcc !== void 0 && activeEligible ? ` · ${t("status.inUse")}: ${displayAlias}${activeAcc.email ? ` (${activeAcc.email})` : ""}` : "";
				const badgeTitle = status === null ? t("header.badgeLoading") : `${t("header.badgeTitle", { count: accounts.length })}${activeDetail}`;
				const buttonLabel = status === null ? "AGY" : displayAlias ? `AGY · ${displayAlias}` : `AGY (${accounts.length})`;
				const badge = h("button", {
					type: "button",
					title: badgeTitle,
					className: "agy-btn",
					onClick: () => {
						modalHostManager.claim(hostId);
						agyModalStore.setOpen(true);
					},
					style: {
						background: "var(--agy-bg-header)",
						border: "1px solid var(--agy-border-card)",
						borderRadius: "999px",
						cursor: "pointer",
						padding: "3px 10px",
						fontSize: "11.5px",
						fontWeight: 600,
						lineHeight: 1.5,
						color: "var(--agy-text-primary)",
						display: "inline-flex",
						alignItems: "center",
						gap: "6px",
						boxShadow: "var(--agy-shadow-card)",
						flexShrink: 0,
						whiteSpace: "nowrap"
					}
				}, h("span", { style: {
					display: "inline-block",
					width: "7px",
					height: "7px",
					borderRadius: "50%",
					background: color
				} }), buttonLabel);
				return h("div", { style: { display: "inline-block" } }, badge, isPrimaryHost && isModalOpen ? portalToBody(h(AgyModalDialog, null)) : null);
			};
			ctx.slots.inject("conversation.session.header.actions", () => {
				return ctx.slots.register({
					name: "conversation.session.header.actions",
					id: "agy-link-status",
					order: 10,
					label: () => locale.bind(NS)("section.label"),
					locale: NS
				}, AgySessionStatus);
			});
			ctx.slots.inject("settings.section", () => {
				return ctx.slots.register({
					name: "settings.section",
					id: "agy-link",
					order: 20,
					label: () => locale.bind(NS)("section.label"),
					locale: NS
				}, AgySettingsSection);
			});
			ctx.slots.inject("plugins.bundle.config", () => {
				return ctx.slots.register({
					name: "plugins.bundle.config",
					key: "dsh-agy-link",
					locale: NS
				}, (ownerProps) => {
					if (ownerProps?.view === "summary") return null;
					return h(AgySettingsSection, { isModal: false });
				});
			});
			ctx.slots.inject("plugins.row.config", () => {
				return ctx.slots.register({
					name: "plugins.row.config",
					key: "dsh-agy-link#agy-link",
					locale: NS
				}, (ownerProps) => {
					if (ownerProps?.view === "summary") return null;
					return h(AgySettingsSection, { isModal: false });
				});
			});
			ctx.effect(() => {
				ensureScrollListener();
				return () => {
					disposeScrollListener();
					agyModalStore.open = false;
					setOverlaySuspended(false);
					if (typeof document !== "undefined" && document.documentElement) document.documentElement.classList.remove("agy-modal-open");
				};
			});
			try {
				installAgyToolView(ctx);
			} catch (err) {
				console.warn("[dsh-agy-link] agy tool view registration failed:", err);
			}
			ctx.effect(() => installAutoExpandReasoning());
			ctx.effect(() => installMermaidRendering());
			ctx.effect(() => installImageEnhancer());
			ctx.effect(() => installDecisionChips());
			ctx.effect(() => installCompactionCard());
			ctx.effect(() => {
				try {
					return installTranslationUi(ctx, NS);
				} catch (e) {
					console.warn("[dsh-agy-link] translation UI unavailable:", e);
					return () => {};
				}
			});
			ctx.effect(() => installSettingsNavIcon(ctx, () => locale.bind(NS)("section.label")));
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		exports.name = name;
		return module.exports;
	}
});
