# Peach 运行核验记录

最后核验：2026-10-06

状态查 `/healthz`；[待办](PRODUCT_BACKLOG.md)、[复用清单](REUSE.md)、[长期约定](HANDOFF.md)。

## 运行态

- 身份：1,017 条归属、6 条出演已修复；10 项有来源、240 项待核验。
- 女优头像 816 张（中位脸宽 258px，38 张带水印待复核）；替下的在 `avatars-superseded/`。
- 数据管理页「整理」（ADR-0039）可预览、执行、回滚上一批，真实库未跑过。
- 产地是独立维度、JAV 是其投影：`region` 空时按厂牌、创作者、番号逐层推断，不落库；韩国 MIB 不算 JAV。
- Windows：ledger writer；源码托盘异常退出恢复，主动退出不恢复。`restart_windows_tray.py --source` 重启；代码数据在内置盘，外置盘只供 `R:\media`。详情按帧滚动
- 托盘须普通权限启动：提权令牌看不到 CloudDrive 的 `A:`/`B:`，误报脱盘。
- Windows：`0.0.0.0:80` 跳转 HTTPS，LAN IPv4:443 提供 HTTPS；mDNS `peach-win`、`0.37.0`、ledger writer。2026-10-06 重启；严格 CA 就绪与前端摘要通过。
- 正式域名下 `/healthz` 报 `configurable=true`；配置读写与选文件夹共用本机连接判据，托盘管配置重载与正式 HTTPS 地址、端口。
- 首启与配置页按系统列缺失依赖（CloudDrive、挂载驱动、FFmpeg/ffprobe、OpenSSL）；Windows 已认出 CloudDrive 与 WinFsp。
- 文件检查覆盖本地与网盘，来源等分、共用确认弹层；CloudDrive 分档建议首启与配置页共用。
- 访问密码未开，局域网匿名可读；可选密码首启可跳过，配置页可改可关，登录可记住设备。
- macOS 是 reader，代码与 `peach-data` 在内置盘；`peach.local` 经 8900/8443 和 pf 提供 80/443，GET 正常、写入回 409。
- 两端各用本机 CA，私钥与凭据不跨机；代码走 Git、账本单写者复制、图片走 Syncthing；本机坐标见 `<数据根>/config.toml`。
- Windows ledger `peach-data/database/ledger.db`，2026-10-06 `0044`；`asset_subtitle` 195 行（孤立 19），175 部带字幕轨，`asset` 80,356 行。
- Mac ledger 经授权从共享副本拉取，恢复 `in-sync`；`sources` 在内置盘，`archive`、`tools` 可指向外置盘。
- doctor、系统诊断页已在 Windows 上线，严格 CA 核验通过；本地目录不存在，115/PikPak 可读取；密码未开、历史失败任务为警告。
- 本机 Python 3.14；`requires-python` 下限 3.12，CI 同测 3.12 与 3.14；Windows FFmpeg/ffprobe 在 `peach-data/tools/ffmpeg`，macOS 走 PATH。
- amane 桥（ADR-0048）代码在 `tools/amane-bridge/`，venv 在 `peach-data/tools/amane-bridge/.venv`，四类番号链都经它问。
- 发行名 `peach`、目录名 `peach-app`。macOS 先按序做完待办「待执行的操作」第 26 条再重启菜单栏：无口令的 `peach serve --host 0.0.0.0` 会拒绝启动。
- 扫描与采集显示项目与等待时长；无进展 120 秒预警，单项外部动作（资料 90 秒、封面 240 秒）超时跳过可重试；问题在 `state/library-processing-<job_id>.issues.jsonl`。
- 口味、复核、关注等聚合按账本版本号与文件版本缓存；补女优资料后继每轮存量至多 16 条。
- 实体种子（ADR-0075）由扫描结算的 `seed-import` 后继导入，只填空、换旧种子行；不一致与重复身份在 `generated/seed-landing.csv`。
- 推送发现开：本地 watch 加 CloudDrive 云端前缀 `/115open→B:`、`/Pikpak→A:`；关注每 60 分钟轮询；自动更新关闭。
- Cloudflare 公网入口默认关，配置页启停，须先设访问密码；临时链接只写状态文件，命名隧道限源码环境、令牌只存设置文件；整站 `noindex` 加 `/robots.txt`。
- FC2PPV-DB、JAVten 与被拦时的 minnano-av 经本机 Chrome 取页（ADR-0065），profile 在 `secrets/browser/`，免贴 Cookie。

## 批处理进度

账本与产物的现算数字由 hook 写进 `peach-data/state/job-status.md`（不进 Git），手动重算 `python scripts/job_status.py`。
