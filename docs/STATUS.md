# Peach 运行核验记录

最后核验：2026-10-10

查 `/healthz`；[待办](PRODUCT_BACKLOG.md)、[复用清单](REUSE.md)、[长期约定](HANDOFF.md)。

## 运行态

- 名册：艺人（含动画作者）｜卖家｜在线；素人须有非职业出演证据，FC2 仅筛作品。
- 公司资料按公开来源填空；FC2 卖家按作品来源快照补入。回执见 `peach-data/review/`。
- 核查：`peach-data/review/creator-boundary-delivery.md`；StraplessDildo 归厂牌。
- 关注作者 25 位、来源 111 条、身份关联 71 条、别名 30 条（ADR-0096）。
- 身份合并 18 组，旧址跳转；FC2 分段按作品计数，文件保留。
- JAV 头像 816 张，38 张水印待复核；17 位档案、253 张头像候选、2 张官方封面。
- 「整理」（ADR-0039）支持预览、执行、回滚；英文视频名分词 169 条。
- 产地是独立维度、JAV 是其投影：`region` 空时按厂牌、创作者、番号逐层推断，不落库；韩国 MIB 不算 JAV。
- Windows 托盘自动恢复，重启用 `restart_windows_tray.py --source`；代码与数据在内置盘，媒体在外置盘。
- 托盘须普通权限启动：提权令牌看不到 CloudDrive 的 `A:`/`B:`，误报脱盘。
- Windows：80 跳 HTTPS，LAN:443；`peach-win`、`0.37.0`。10-10 重启，CA、健康、前端产物通过。
- 主界面 `peach-app.js/css`，登录、配置页 `peach-pages.js/css`；Application 管理路由与资源，域控制器适配原生宿主。
- `/healthz` 报 `configurable=true`；配置与选目录共用连接判据，托盘管理 HTTPS 地址、端口及重载。
- 首启、配置页列缺失依赖（CloudDrive、挂载驱动、FFmpeg/ffprobe、OpenSSL）；Windows 识别 CloudDrive、WinFsp。
- 文件检查含本地与网盘，来源等分、共用确认弹层；CloudDrive 分档建议首启与配置页共用。
- 访问密码未开，局域网匿名可读；首启可跳过密码，配置页可改可关，登录可记住设备。
- macOS 是 reader，代码与 `peach-data` 在内置盘；`peach.local` 经 8900/8443 和 pf 提供 80/443，GET 正常、写入回 409。
- 两端各用本机 CA，私钥与凭据不跨机；代码用 Git、账本单写者复制、图片用 Syncthing；坐标见 `<数据根>/config.toml`。
- Windows ledger `0045`，资源 80,209 行；字幕 195 行（孤立 19），175 部带字幕轨；R 盘暂缓。
- Mac ledger 使用已授权共享副本，`in-sync`；`sources` 在内置盘，`archive`、`tools` 可在外置盘。
- Windows doctor、诊断页通过 CA；本地目录缺失，115/PikPak 可读；密码未开、历史失败为警告。
- Python 3.14（下限 3.12，CI 测两版）；Windows FFmpeg/ffprobe 在 `peach-data/tools/ffmpeg`，macOS 走 PATH。
- amane 桥（ADR-0048）供番号查询；代码 `tools/amane-bridge/`，venv `peach-data/tools/amane-bridge/.venv`。
- 发行名 `peach`、目录名 `peach-app`。macOS 按待办第 26 条处理后重启菜单栏；无口令的 `peach serve --host 0.0.0.0` 拒绝启动。
- 扫描、采集 120 秒无进展预警；资料 90 秒、封面 240 秒超时可重试；见 `state/library-processing-<job_id>.issues.jsonl`。
- 口味、复核、关注等聚合按账本与文件版本缓存；女优资料后继每轮存量至多 16 条。
- 实体种子（ADR-0075）由扫描结算后继 `seed-import` 导入，只填空、换旧种子行；冲突与重复身份在 `generated/seed-landing.csv`。
- 推送发现开：本地 watch 加 CloudDrive 云端前缀 `/115open→B:`、`/Pikpak→A:`；关注每 60 分钟轮询；自动更新关闭。
- Cloudflare 公网入口默认关，配置页启停前须设密码；临时链接写状态文件，命名隧道限源码部署、令牌存设置文件；整站 `noindex` 与 `/robots.txt`。
- FC2PPV-DB、JAVten 与被拦时的 minnano-av 经本机 Chrome 取页（ADR-0065），profile 在 `secrets/browser/`，免贴 Cookie。

## 批处理进度

批处理见 `peach-data/state/job-status.md`；目录与垃圾回执见 `generated/library-organize/`，未知归属不填身份。
