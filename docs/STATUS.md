# Peach 运行核验记录

最后核验：2026-10-07

状态查 `/healthz`；[待办](PRODUCT_BACKLOG.md)、[复用清单](REUSE.md)、[长期约定](HANDOFF.md)。

## 运行态

- 分类：女优、素人、西方可交叉；账号分网黄博主、卖家、动画作者。
- 目录归属修复 652 条；StraplessDildo 归厂牌并接官网标识，4 项来源未取得。回执见 `peach-data/review/`。
- 身份：8 组同人共用资料，旧址跳转；FC2 分段按作品计数，文件保留。
- JAV 头像 816 张（中位脸宽 258px，38 张水印待复核）；公开档案 16 位、14 位头像候选 250 张、2 张官方封面。
- 「整理」（ADR-0039）可预览、执行、回滚，真实库未跑过。
- 产地是独立维度、JAV 是其投影：`region` 空时按厂牌、创作者、番号逐层推断，不落库；韩国 MIB 不算 JAV。
- Windows writer 支持异常恢复；`restart_windows_tray.py --source` 重启。内置盘存代码数据，外置盘供媒体。
- 托盘须普通权限启动：提权令牌看不到 CloudDrive 的 `A:`/`B:`，误报脱盘。
- Windows：80 跳转 HTTPS，LAN:443；`peach-win`、`0.37.0`。10-07 重启，CA、计数、跳转及桌面/手机通过。
- `/healthz` 报 `configurable=true`；配置与选目录共用本机连接判据，托盘管理 HTTPS 地址、端口及配置重载。
- 首启与配置页按系统列缺失依赖（CloudDrive、挂载驱动、FFmpeg/ffprobe、OpenSSL）；Windows 已认出 CloudDrive 与 WinFsp。
- 文件检查覆盖本地与网盘，来源等分、共用确认弹层；CloudDrive 分档建议首启与配置页共用。
- 访问密码未开，局域网匿名可读；可选密码首启可跳过，配置页可改可关，登录可记住设备。
- macOS 是 reader，代码与 `peach-data` 在内置盘；`peach.local` 经 8900/8443 和 pf 提供 80/443，GET 正常、写入回 409。
- 两端各用本机 CA，私钥与凭据不跨机；代码走 Git、账本单写者复制、图片走 Syncthing；本机坐标见 `<数据根>/config.toml`。
- Windows ledger `0045`；字幕 195 行（孤立 19），175 部带字幕轨；10-07 删除确认垃圾 14 个，资产 80,188 行。
- Mac ledger 经授权从共享副本拉取，恢复 `in-sync`；`sources` 在内置盘，`archive`、`tools` 可指向外置盘。
- Windows doctor、诊断页通过 CA 核验；本地目录缺失，115/PikPak 可读取；密码未开、历史失败为警告。
- 本机 Python 3.14；`requires-python` 下限 3.12，CI 同测 3.12 与 3.14；Windows FFmpeg/ffprobe 在 `peach-data/tools/ffmpeg`，macOS 走 PATH。
- amane 桥（ADR-0048）代码在 `tools/amane-bridge/`，venv 在 `peach-data/tools/amane-bridge/.venv`，四类番号链都经它问。
- 发行名 `peach`、目录名 `peach-app`。macOS 先按序做完待办「待执行的操作」第 26 条再重启菜单栏：无口令的 `peach serve --host 0.0.0.0` 会拒绝启动。
- 扫描与采集 120 秒无进展预警；资料 90 秒、封面 240 秒超时可重试；问题见 `state/library-processing-<job_id>.issues.jsonl`。
- 口味、复核、关注等聚合按账本版本号与文件版本缓存；补女优资料后继每轮存量至多 16 条。
- 实体种子（ADR-0075）由扫描结算的 `seed-import` 后继导入，只填空、换旧种子行；不一致与重复身份在 `generated/seed-landing.csv`。
- 推送发现开：本地 watch 加 CloudDrive 云端前缀 `/115open→B:`、`/Pikpak→A:`；关注每 60 分钟轮询；自动更新关闭。
- Cloudflare 公网入口默认关，配置页启停，须先设访问密码；临时链接只写状态文件，命名隧道限源码环境、令牌只存设置文件；整站 `noindex` 加 `/robots.txt`。
- FC2PPV-DB、JAVten 与被拦时的 minnano-av 经本机 Chrome 取页（ADR-0065），profile 在 `secrets/browser/`，免贴 Cookie。

## 批处理进度

批处理现状见 `peach-data/state/job-status.md`；目录与垃圾复核见 `generated/library-organize/`，未确认归属保留原位。
