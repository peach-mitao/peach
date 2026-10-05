# 复用清单

## 分级诊断

`src/peach/diagnostics.py` 统一生成 CLI 与本机 API 报告；复用 `settings_file`、`health` 的只读迁移校验、`FFmpegResolver`、访问策略和挂载快照。数据库用 SQLite `mode=ro`；写入与端口检查用标准库短暂探针，不新增运行依赖。

已核对 sakuramedia `a10fcef8`（GPL-3.0）的诊断字段与提示组织，仅作产品参考，不复制源码。OpenAver `8cc17e50`（MIT）的 HTTP 健康探针不足以表达分项状态。[fastapi-health 0.4.0](https://pypi.org/project/fastapi-health/)（MIT）在本机 Python 3.14.7 的离线试验中将状态字典视为真值；CLI、分级规则和脱敏仍需本项目处理，因此未引入。

诊断页复用同一报告、TanStack Query、BoardUI 设置组合件及覆盖式滚动条。库健康参照 javm `dd0e6b62`（MIT）的计数→清单入口，采用 Peach 的资产、封面键与处理日志。来源证据复用 `performer_profile_followup` 成功落库来源与 `scraping_access.cooldown_state`，不复用 HTTP 200 作为内容健康。无新增依赖；本机只读试验已核对现有日志与成功记录。

## 资源索引器

来源性质由 `follow_providers.ProviderSpec.nature`、`scraping_access.describe` 与索引器配置投影给页面，分别标账号、公开页面、归档站与自配索引器，不参与身份可信度、优先级或启用状态判定。新增客户端仿真来源须在自己的登记处声明性质。

`resource_search.py` 使用 Torznab 0.2.1（MIT，Python ≥3.10，支持项目 Python 3.12–3.14）的 `parse_capabilities` 与 `parse_torznab`。源码固定标签 v0.2.1，项目仍标为 Alpha；离线 XML POC 已覆盖 caps、GUID 磁力、体积、做种、连接数和重复标签。PyPI 包新增一项直接依赖，requests 为已有传递依赖；实际索引器验收需要用户配置端点。

请求复用 HTTPX 0.28.1。SDK 自带 requests 请求层没有响应大小上限，异常可能带完整 URL，故只使用其解析器。Peach 负责每源 caps 和 search 两次请求、响应上限 2 MiB、每轮最多四源、45 秒预算、禁用重定向、脱敏错误、XML 实体声明拒收，以及体积、做种、黑名单、质量排序和最多五个候选。标题番号复用 `feeds.scan_code`，身份与中字、无码版次复用 `catalog_rules`。凭据复用 `CredentialStore`，不登记跨机同步字段；换端点不会沿用已保存的 API key。

已对照 [Torznab 1.3 规范](https://torznab.github.io/spec-1.3-draft/torznab/Specification-v1.3.html) 与 SakuraMedia `torznab.py`（GPL-3.0，revision `9c6a31915c9a364c9d6717798575daf9445916bd`）的 FC2 查询、磁力字段回退与部分失败边界。SakuraMedia 耦合其 ORM，不作为运行时依赖。候选由活动页填入现有云下载表单，经用户确认后走 `submit_offline_download`。

这是实现查找表：每项能力由哪个现成实现承担、Peach 自己只负责哪一段。新增、恢复或重写代码前，按 `.claude/skills/peach-reuse-first/SKILL.md` 先查本文件、当前树、Git 历史和成熟外部实现；旧文件名不存在不等于能力缺失，继任关系见「已删除旧实现与当前继任者」。

安装依赖的精确版本由 [Python 清单](../pyproject.toml)、[Python 锁文件](../uv.lock)、[前端清单](../frontend/package.json) 和 [静态依赖清单](../package.json) 维护。本页记录用途、许可证与取舍；取证版本和提交号只代表对应证据。

## 挂载可达性

`mount_reachability.py` 参考 OpenAver 的 `core/source_reachability.py`（MIT，Copyright 2026 peace；固定 revision `8cc17e50453d9f69a81f5fee1a072df80f7aab73`，2026-10-01）采用正常 600 秒、异常 60 秒的节律、两次失败确认和超时在途去重。Peach 独立实现此算法，未复制上游源码；使用 Python 标准库线程、事件与 Future，兼容项目的 Python 3.12–3.14，不新增依赖。Peach 的路径映射与首条目录读取归 `platform`，来源接口、健康摘要和托盘共用纯内存快照；最多四个目录探测在途，后台线程不阻塞服务退出。

未采用参考实现的 UNC TCP 445 探测：端口连通不能证明共享目录可读。普通文件也不能作为媒体根，`NotADirectoryError` 单列；权限拒绝、目录不存在与其他读取失败分别报告。APScheduler 已用于定时任务，但其线程执行器不能取消阻塞的文件系统调用；本功能用停止事件驱动调度，保留尚未返回的目录探测。任务中心写入 ledger，不用于此只读探测。

## Board 界面与数值设置

页面控件与交互由哪些共用件承担；组件映射、Board 上游证据与许可证见 [BoardUI 适配](BOARD_UI.md)。

- 外链按钮复用 BoardUI `ButtonLink`，调用处加 `data-button-link`，全站文字外链规则用 `:where` 排除它，保持实体页控件的样式优先级。浏览器验收使用一个渲染进程、进程内音频服务和合成音频输出，给演示服务与媒体进程保留资源预算；入口仍为 `scripts/test.ps1` / `scripts/test.sh`。

- 功能性动效由 `frontend/src/react/components/use-moving-surface.ts`、`modal-frame.tsx`、`selection-dock.tsx` 承担，用现有 Motion 12.43.0（MIT）与 React Aria Components 1.21.1（Apache-2.0）。Fluid Functionalism 只作行为与短程参数参考（[取证](reference-snapshots/fluid-functionalism.md)），不装其 Registry（额外的 Radix、字体与上下文不合 BoardUI 组合）；Peach 保留单一选中底板、键盘即时反馈与原有主题。
- 首页新作与实体资料页共用 `/api/entity/shapes` 和 `feedNewSkeletonHtml`；`home.feed` 按新作列表同一套未入库、未忽略与合集条件判定，有内容才留位；同步设置先于最终横条和网格，同形骨架复用节点。
- 作者别名管理用逐字复制进 `frontend/src/react/boardui/` 的 BoardUI `Table`、关注列表共用的 `DataTableFrame`、`AuthorAvatar` 与既有别名 API。两张表只有几行，不接 `@tanstack/react-table`；合并范围是这一屏自己的勾选，勾写 `slot={null}`，不走 React Aria Table 的行选择。扫描与采集三种方式收在一颗 BoardUI `Button` 加 React Aria `Popover` 下拉里，行外观取注册表 `select` 条目带来的 `menu-styles.ts`（见 `frontend/src/react/boardui/ORIGIN.md`）。
- 关注列表分页用 `pagination.ts` 的页码范围与边界裁剪（React 与遗留层共用这份纯函数）；默认视图按创作者组，表格按来源。表格视图用 `@tanstack/react-table`（MIT，https://github.com/TanStack/table ，按 ADR-0031「前端基础库」引入）：列定义、排序、行选择与分页交给它，行身份是来源 ID（`getRowId`），排序与分页跑在全集上。两种视图共用同一个来源 ID 集合，批量操作发整个集合。`frontend/test/react/follow-manage.test.tsx` 验了 25 位创作者、跨页跨视图勾选与批量写。
- 窄屏筛选框共用 `filterScrollState()`、现有滚动帧调度和原生 sticky；同一方向累计 8px 再切换吸顶，保留文档占位与键盘可达性。
- 搜索玻璃用 `glideEase()` 的采样弹簧，`web/js/search-morph.js` 只管视口边界与轮廓关键帧。
- 横排滚到头的回弹是 `wireHorizontalScroller` 内的 `edgeBounce`，头像排、厂牌排、新作排、筛选条共用；transitions.dev 的 43 条配方里没有（2026-09-23 核对）。越界位移借 UIScrollView 的橡皮筋公式 `(1 - 1/(x·c/d + 1))·d`，c = 0.55，与 use-gesture（MIT）的 `rubberband` 同一条，回弹走 `--spring-pane`。只抄公式不引依赖：拖动与滚轮归属已由 `wireHorizontalScroller` 判定。新作排自动滚动是同文件的 `wireAutoScroll`。
- 浮层筛选首页是附属面 `catalog-filter`，资料页是 `entity-filter`，共用 `FilterGlassRows` 两排、交集条与排序键，滑动玻璃走 `use-view-glide.ts`。外框管玻璃与吸顶，壳管查询状态和取数，岛只画、动作回壳，按下态在发请求前由壳经 `updateManagedRoute` 推到；身份与观看状态的组合沿用 `/api/items`。
- `web/board.css` 共用正式页面结构。首启、登录与错误三页是独立页面包 `/dist/peach-pages.js` 里的 React 页，服务端只吐 `web_entry.page_shell()` 那一张薄壳，外框是 `frontend/src/react/pages/auth-card.tsx`，SPA 外壳之外的新页面挂进同一个包。
- `frontend/src/number-setting.ts` 共用带单位输入、可选 Switch、整数边界和锚定错误提示；关闭保留上次合法值，异步读取后切换也恢复实际值，保存归调用方。
- 筛选内层的标签胶囊是 `FilterPill`，换一批、排序键与交集条是 `entity-filter-page.tsx` 导出的同一组组件，页面各自提供查询键与读数；`collectionHeaderHtml` 只剩资料页骨架那一排读数。横向行的拖动、滚轮、渐隐与卸载清理归 `wireHorizontalScroller` 同一个生命周期。
- 选择范围与工具条用 `frontend/src/selection.ts`；馆藏、关注与复核保持各自身份、可见顺序、默认选择与写入权限，批量失败项的保留归业务。
- React 设置分区用 `frontend/src/react/settings/section.tsx`：`Section` 给标题、卡片与表单外壳，`Footer`、`Note`、`ErrorText`、`FactList`、`Progress`、`Disclosure` 补齐 BoardUI 注册表没有的部分。`use-action.ts` 的 `useAction` 管提交互斥、卸载取消与原位错误，`busy-props.ts` 的 `busyProps` 写忙态；媒体文件夹行（`folder-rows.tsx`）与密码加确认两格（`password-pair.tsx`）由配置页与首启页共用；密码校验与服务端回执归各分区，不自动重试写入。口味读取、封面采集、amane 桥重建、关注检查与查找共用 `frontend/src/react/background-job.ts` 的 `useBackgroundJob`。
- 增量列表用 `catalog-grid/catalog-grid-page.tsx` 的 `LoadMore`：请求互斥、失败留原位重试、卸载即停；目录、资料页照片墙与关注页注入读取和可用条件。首页页码在读取成功后推进，照片沿用随机种子，关注合并分组；显式页码用 `pagination.ts`。
- 在图上框一块由 `frontend/src/crop-geometry.ts`（纯算术）加 `react/crop/crop-frame.tsx`（四块压暗、一个可拖可缩的框）承担，换头像与裁封面共用；坐标一律是源图像素、右下开区间。不引 `react-image-crop`：换到的只有把手样式，代价是一条依赖和它自己的坐标约定。裁封面做成 island 从遗留详情壳 `web/app.js` 挂（ADR-0031）。
- 后台任务用 `watchJob`、`followJobProgress` 默认面板与 `jobActivityHtml` 的真实计数／未知总量显示，关注、来源扫描、链接检查和扫描采集共用；业务保留启动、终态回执和结果面板，不新增轮询循环。任务本体是 `jobs.BackgroundJob`，不加队列或调度依赖；状态在服务进程，浏览器由 `frontend/src/jobs.ts` 跟进、刷新后经读接口恢复，服务重启不重放；`BackgroundJob.update(job_id)` 报阶段与计数，查询不重新执行任务。
- 遗留层反馈控件 `noteHtml`、`progressHtml`、`gaugeHtml`、`projectBannerHtml` 与 `wireContextCard` 集中在共享 UI 模块；信息卡片用原生 Popover 与现有锚定菜单定位，不加浮层依赖。证据见 `reference-snapshots/vercel-geist-note-progress-switch-analytics.md`。
- 资源核对复用 `web_resource_sync` 的目录枚举、离线跳过、写前逐条复验与 BackgroundJob，覆盖 local、115、PikPak；失效记录的永久删除复用 `web_batch.purge_assets`，文件仍在盘上的行进 `blocked`。确认弹层复用 Fieldset、Note、Toast 与 confirmModal：失败留在弹层，危险动作初始聚焦取消，忙态阻止重入与关闭；不引入另一套对话框库。
- 新界面走 BoardUI／React（ADR-0031），遗留层共用的 Geist 控件随页面迁走，不引入 Geist React 运行时。覆盖式滚动条 `attachOverlayScrollbar`（滑块不占宽度）、Collapse 的 `wireCollapse`／`setCollapseOpen`、Geist Select 的 `selectFieldHtml`／`wireSelectField`、来源站标 `MEDIA_SOURCE_ICONS`，以及模板、骨架、确认框等其余共用控件的唯一实现在 `frontend/src/ui-kit/`，随入口包 `/dist/peach-entry.js` 发出，`ui-components.js` 原名转出，独立页面包把用到的几样直接打进自己；覆盖式滚动条与 `.geist-scroller`（只给两端渐隐）可叠加；整页异步重绘复用导航代际隔离。
- 图标按钮统一清除浏览器内边距并居中 SVG，不覆盖业务显隐。Remix Icon 由 `vendor_web_dependencies.mjs` 生成设置导航 symbol；随机按钮保留原有双路径动画。
- 统计页与口味页的柱状、径向、雷达图复用 EvilCharts Recharts 分支（MIT，源码逐字复制进 `frontend/src/react/evilcharts/`，依赖 `recharts`、`motion`、`clsx`），单系列柱状图统一走 `frontend/src/react/charts/bar-card.tsx` 的 `BarCard`，悬停浮层统一走 `charts/chart-tip.tsx` 的 `ChartTip`。星期 × 小时与每日热力图是 `charts/heat-card.tsx` 的 `ActivityHeat`，统计页播放时间与口味页浏览活跃共用；EvilCharts 没有这类图（ADR-0076）。
- `frontend/src/react/taste/taste.ts` 使用 d3-sankey（BSD-3-Clause）及其类型包计算来源网站到创作者线索的流向。布局依赖不读取浏览历史；Peach 提供去重聚合值并负责隐私边界。分发许可随 `web/vendor/d3-LICENSE.txt` 保留。

复核用 Checkbox、Button、Badge、Select 与 `/api/review/decision`，默认勾选、沿用馆藏页 Shift 连选；支持跨组通过／拒绝与无歧义的共同来源选择。按候选数量、来源组合或字段分组，每项只出现一次，切组保留选择；成功移出、失败保留，离开页面即停。整页在 `frontend/src/react/review/`，一条队列一个 `queryKey`，判定后改缓存不重取。身份候选用创作者页、作品详情与 revealSource 核对样本；来源图与缺图占位共用 220px 预览区，样本支持无缩略图作品，回收站不参与。

## 本机设置与卸载

- Peach 代理复用 HTTPX 的 `trust_env`、`proxy` 与本机 CredentialStore；来源只选择公共策略或直接连接，地址不回传。单一旧代理可继承，多个地址需明确选择。
- 自启用 Windows WScript.Shell 快捷方式（[微软文档](https://learn.microsoft.com/en-us/troubleshoot/windows-client/admin-development/create-desktop-shortcut-with-wsh)，TargetPath、Arguments 与 Save，自带 COM，不引 pylnk3）和 macOS LaunchAgent；临时中文路径的真实快捷方式读、写、移除通过。
- 独立包卸载用正常托盘退出和 Windows PowerShell 助手；计划限于程序标记、数据直属目录、媒体不重叠，助手拒绝目录链接，会退出仍从程序目录运行的进程并重试删除。完全卸载只把 `config.toml.<说明>-<日期>-<时刻>` 当 Peach 写的设置备份，手工的 `config.toml.bak` 保留；混入被占用文件、数据、媒体与无关文件的真实输入验证只删计划内容与整个解压目录。源码树只给手动卸载说明。
- 扫描与采集统一挂在数据管理；首页进度 Banner 跳转同一入口。默认排序与方向使用浏览偏好，显式 URL 优先。

目录页进度横幅与数据管理卡片共读 `LIBRARY_PROCESSING_KEY`（[共享状态](FRONTEND.md#共享状态怎么写)）；启动只提交一次，状态查询接续托盘首次处理。首页在完成后收起，失败跳转数据管理；数据管理持续读取阶段与真实计数。Geist Banner 取证与 Peach 差异见 [docs/reference-snapshots/vercel-geist-library-banner.md](reference-snapshots/vercel-geist-library-banner.md)。

## 独立测试包在线更新

- 自动更新设置用 APScheduler（见「必须复用」表的定时轮询）、共享 HTTPX 发行查询、filelock 与原子 JSON 写入，安装走 `standalone_update`。按 [interval trigger](https://apscheduler.readthedocs.io/en/3.x/modules/triggers/interval.html) 每分钟查是否到期，本机持久时间与文件锁协调多个服务；关闭、6/24/168 小时间隔与源码下载限制归 Peach。默认关闭，下载只准备安装，重启仍需确认；设置存 state 目录的 `automatic-updates.json`。
- 版本与资产信息用 GitHub Releases REST API（测试通道含预发布），查询与流式下载用项目 HTTPX，ZIP 解压用标准库，互斥用 FileLock。真实 Release 只读验过：只有已上传完整独立包的发布才进更新，查询不下载也不安装。
- 安装策略与进度归 Peach：下载校验后在程序同卷暂存，用户确认重启，复制出来的包内助手等原托盘退出再切换完整目录；失败保留或恢复旧目录。配置、数据库与媒体不进更新包。
- 不用 [Velopack](https://docs.velopack.io/packaging/operating-systems/windows)（要求其安装目录与包格式）与 [WinSparkle](https://winsparkle.org/)（要求 appcast 与原生更新界面）：产物是 PyInstaller ZIP、进度在 Web 显示，沿用托盘进程与目录替换协议。
- Web 复用 Fieldset、Progress、confirmModal；状态由 `standalone-update.json` 保存。下载按字节计量，解压按文件数计量，替换使用阶段进度；服务重启期间保留等待状态，恢复连接后核对版本。
- 新版有待应用迁移时，重启安装复用 `migrate upgrade --yes`，先保存 SQLite 备份；迁移或启动失败时恢复数据库与程序。数据库备份位于用户数据根的 `state/update-backups/`。

JAV 默认封面（官方封面／预览图）与视频默认大小（大图／小图）独立保存，用 localStorage、共享 Switch 与既有 `/cover`、`/poster`。设置弹窗同步首页与 JAV 的版式，筛选条可单独调当前视图。`frontend/src/jav-artwork.ts` 管作品身份、偏好恢复与缺图回退，首页、接着看、实体作品、详情推荐、Mix 静止与翻图、播放队列共用封面选择。小图展示完整封套，竖版正封完整放入大图卡片；新作封面完成取景才显示，缓存图插入时重算取景。

## 复用决策门槛

每次决定「用现成的还是自己写」都按这四条走，本节其余各条是按这四条做出的具体决定：

- 先用真实输入做无写入 POC，再决定「直接依赖、固定来源实现、保留自研」三者之一。
- 采用项要记录固定版本、许可证、首个消费者和 Peach 保留的领域边界；候选依赖不得空转。
- 保留自研要记录被拒绝的候选和不可替代约束，不能只写「特殊需求」。
- 外部项目不适合作为运行时依赖，但其公开数据模型或算法明显更成熟时，固定 revision 后作为参考
  实现；许可证不允许派生或来源不稳定时只作行为证据，不复制代码。

- Python 安装与构建用 [uv](https://github.com/astral-sh/uv)（MIT/Apache-2.0，`pyproject.toml` 只设下限 `>=0.12.13`，不进依赖图）与官方 setup-uv（MIT，版本见 [测试工作流](../.github/workflows/test.yml)）：uv 项目接口、`uv.lock`、`uv sync --locked`，Dependabot 走官方 `uv` 生态。开发与构建在隔离工作树建环境，生产 venv 不参与精确同步；直接依赖精确固定，传递依赖由锁文件复现。
  测试库复用 `tests/support/ledger.py`：迁移生成模板后复制独立临时库（[耗时](SOURCING.md#依赖与工具实测)），真实迁移测试仍执行迁移；重试测试用已有 sleeper 注入点。CI 用 GitHub Actions 独立 runner 分片与现有 unittest 入口，Peach 只维护影响域策略，不引并发测试框架（见 `TESTING.md`）。
- 访问密码复用 Python 3.14 的 [hashlib.scrypt](https://docs.python.org/3.14/library/hashlib.html) 与 OpenSSL，浏览器会话复用 [ItsDangerous](https://itsdangerous.palletsprojects.com/en/stable/)（Pallets、BSD-3-Clause、纯 Python、wheel 16 KB、无传递依赖），本机原子配置写入用 tempfile/os.replace 与 filelock；认证入口的内部口令、三种拒绝响应与本机配置守卫照旧复用。Starlette SessionMiddleware 统一时长、随响应续期，满足不了每台设备自选截止时间，所以直接用同源签名库，Peach 管可选密码、截止时间与撤销，不带账户体系与迁移。
- Cloudflare Quick Tunnel 用官方 `cloudflared`（Apache-2.0），不自写隧道协议。源码环境只管 PATH／环境变量里的进程；Windows 独立包旁路固定 `2026.9.0`，资产、地址与 SHA-256 在 `scripts/cloudflared-windows.json`，`fetch_cloudflared.ps1` 与构建脚本双重校验。就绪判据是官方 `--pidfile`（首次连上边缘才写），未连上不宣称可用。源码 HTTPS origin 用项目 CA，独立包用回环 HTTP，写请求来源校验带当前进程持有的随机 URL。

- README 交付检查用系统 Git 的 `diff --no-renames -z` 与 [`interpret-trailers --parse`](https://git-scm.com/docs/git-interpret-trailers)，挂在 `agent_worktree.py ready/integrate`；Peach 只定义影响文件与双语声明 policy。原生 hook 不随 clone 安装、判断不了文案语义，所以挂在共有的交付入口上（[README 维护](README_MAINTENANCE.md)）。
- 配置访问判定用 ASGI 连接的 `client` / `server` 地址与标准库 `ipaddress`：本机连接匹配回环地址或服务端 IP，Host 只校验托盘配置的域名或绑定地址、不证明调用方在本机。配置保存用修订号校验、原子替换与 `SetupGate` 重载标记，托盘子服务以 `PEACH_TRAY_MANAGED` 声明重载能力。安装检测用 `winreg`、`shutil.which` 与安装目录，媒体工具用 `FFmpegResolver`，脱盘不判为未安装。下载入口 2026-09-06 核验：[CloudDrive](https://www.clouddrive2.com/download.html)、[WinFsp](https://winfsp.dev/rel/)、[macFUSE](https://macfuse.github.io/)、[FFmpeg](https://ffmpeg.org/download.html)、[OpenSSL](https://openssl-library.org/source/)。
- 发行身份用各来源解析器与 Seesaa 的原始 DTO，数字前缀等价是 Peach 的领域 policy。查询回退不能承担身份确认（[`390JAC-040` 实例](SOURCING.md#依赖与工具实测)），响应按原始查询检查，MGStage 官方详情路径可佐证展示编号别名；外部适配器只取值，首条搜索命中不作 ledger 身份断言。
- Seesaa 作品表用 HTTPX、Beautiful Soup 4.15.0（MIT）与现有 `HostLimiter`、番号规范化、字段候选和快照协议。Javinizer-Go `d9724f239d7e127afcb747fa8ce4358685912f50`（MIT）与 MetaTube `6a5e6128c725187aeaf921d48ed7d9cd9f30671b`（Apache-2.0）都没有 Seesaa 适配器（2026-09-06 核对），所以 `peach.sources.seesaa` 承担 EUC-JP、列映射、精确行身份与未知名单保护，消费者是 `scrape_codes --profile seesaa`（[站点细节](SOURCING.md#seesaa-wiki-作品证据)）。

- 补女优别名后继（ADR-0055、0061、0064）复用 `minnano_av` 检索与资料表解析、`sources.seesaa.WikiPages`、
  `sources.fc2cmadb` 女优栏、`HostLimiter`、`scraping_access` 冷却、`metadata_alias_resolve.is_planning_alias` 与
  `apply_alias_candidates.py` 的四种不写口径，撤回用 `revert_auto_landing.py`。minnano-av 不用 `page_cache.Site`
  （丢跳转后的最终地址、限速器按实例各起、会把 200 的验证页当正文缓存），由 `MinnanoPages` 记最终地址、共用一个
  `HostLimiter`、认出验证页不缓存并记冷却；传输是 `SourceTransport`，被拦时按 `browser_fallback` 走
  `browser_transport.shared`（见 [来源采集](SOURCING.md#minnano-av-的间歇拦截)）。
- 补女优资料后继（`performer_profile_followup`，ADR-0067）复用 `minnano_profile_pages`、名字核对与 `MinnanoPages`
  （加 `source` 冷却键与 `max_age`，avwikidb 与 javdb 也用），排单用 ADR-0053 的 `Attempts`（写成的记号保 30 天）。
  解析在 `minnano_av.profile`（资料表）与 `avwikidb`（JSON-LD），读写在 `performer_profiles`。`kanojo-db/scrapers`
  与 `stashapp/CommunityScrapers` 的 Minnano-AV 规则都不是可装的库（后者是 Stash XPath 配置，ADR-0021）。
  女优页头（ADR-0069）由 `performer_header` 出五项与别名分组，別名栏注记由 `minnano_av.name_entries` 拆，
  拆名字用 `sources.seesaa.split_names`。

文档检查用 seiso（MIT，开发依赖），[文案门槛](../tests/test_copy_final_state.py) 调用其稳定规则；文件分类与第三方原文边界见 [seiso 配置](../seiso.toml)，表达与人工复核见 [文档与界面文案](WRITING.md)。不自建 Markdown 文档职责解析器。

测试与集成用 `test_runner.py`、`agent_worktree.py`，进程互斥用开发依赖 `filelock` 的 [`FileLock`](https://py-filelock.readthedocs.io/en/stable/tutorials.html)。全量验证与集成共用一把锁、最多等待 30 分钟；验证持锁至记录写入完成。临时 Git 仓库回归覆盖互斥、等待和释放；代码、环境和范围记录属于 Peach 的集成约束。记录失效返回 `4`，Windows 托盘据此最多重试三轮，用例失败返回 `1`。两端测试入口通过 `test_environment.py` 复用现有 `find_uv` 与主检出 `Dependencies.check`；隔离工作树使用 uv 官方锁文件同步，不新增包管理实现或运行依赖。同步失败停止测试，主检出只读检查；策略与行为回归见 `test_test_environment.py`。

提交消息复用 Git 的 [`interpret-trailers --parse`](https://git-scm.com/docs/git-interpret-trailers)，署名与 README 声明判据由 `co_author.py`、`check_readme_impact.py` 共用；`check_commit_message.py` 接到仓库 `commit-msg` 钩子。Git 自身处理注释与多行 trailer，Peach 只检查字段形态和分段。Windows Git 2.55.0.windows.3 的临时仓库回归覆盖拒绝提交、保留暂存、多署名、amend 和合并消息；不新增解析依赖。具体触发范围见 [README 维护](README_MAINTENANCE.md)。

### 播放、采集、发布与打包

各条的实测与取证见 [复用取证记录](SOURCING.md#播放与控件实证)。

- 页面、框体、操作条与选中项共用一套灰阶，操作条用 `--overlay-5`。
- javdb 属有码与素人链的社区档，候选保留 community 来源性质，不自动写真相字段。
- 编码边界依据 [MDN 视频编码说明](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Video_codecs) 与 [ffprobe 文档](https://ffmpeg.org/ffprobe.html)，用当前 FFmpeg；Peach 只持有兼容格式判定与缓存策略。
- CloudDrive 引导用现有 `settings_file`、`platform.root_online`、`scan_location` 与 React 配置页，来源为 `local`、`115`、`pikpak`。挂载由用户安装的 CloudDrive 负责（[官方帮助](https://www.clouddrive2.com/help.html)：Windows 用盘符、macOS 用目录挂载点），Peach 不捆绑其二进制，挂载引导不依赖管理 API，路径处理用 `pathlib`、`os.scandir`、`tomllib`；表单、来源归属与扫描选择归 Peach。云下载经官方 proto 子集（`downloads_clouddrive.proto`，version 1.1.0）走 gRPC，令牌存 CredentialStore，不用非官方 SDK（ADR-0089）。
- JAV 入库资源查询复用 `sources.javdb` 的身份核对、`SourceTransport` 的 Cookie 与冷却、`HostLimitedTransport` 的 3 秒间隔、`beautifulsoup4==4.15.0` 和 `downloads.parse_magnet`。JavPack 的 `JavDB.magnet.user.js` 0.0.2（GPL-3.0，仓库 revision `b546e1881147e15796c697e8e086db9d3ac0c5be`）只作页面字段参考；它依赖浏览器用户脚本 API，不能直接作为 Python 服务端依赖。Peach 负责评论链接、协议分流、去重、60 秒缓存和最多三页评论的预算，不新增依赖。2026-10-02 单作品只读实测取得 4 条磁链和含 ed2k 的评论页；评论入口从 `.review-tab[data-url]` 读取，受限评论保留来源限制提示。磁链可交现有云下载服务，ed2k 与其他网页链接提供复制。
- 抓取入口的复用缺口见 [抓取复用审计](SCRAPING_AUDIT.md) 与 [逐脚本 CSV](scraping-audit.csv)；跨用户安装、来源网络、Cookie GUI、最高可得画质与图像清单按 [ADR-0024](adr/0024-mark-manifest-not-bundled-bytes.md)。私有后缀判断用 tldextract 5.3.2（BSD-3-Clause），随包 PSL、`suffix_list_urls=()`、`cache_dir=None`、`include_psl_private_domains=True`；Instaloader 4.15.3 与 browser_cookie3 不进正式依赖。HTTPX（BSD-3-Clause）、curl_cffi（MIT）、Pillow、amane 桥与现有候选缓存是正式基础，请求节拍用 `scripting.RateLimiter`／`HostLimiter`。
- 采集 GUI 用 React island、CredentialStore、HTTPX、Pillow 与 BackgroundJob，`jav_cover_fetch` 同时服务界面与 CLI；Peach 保留域内凭据、来源路由、预算、冷却、番号身份与高清替换策略。Cookie 文本用标准库 SimpleCookie／MozillaCookieJar 解析，不导入 pickle。
- 删除失效链接与资源同步的执行阶段用 `BackgroundJob.start_result` 存终态回执；刷新只查状态，写入不自动重放，确认与检查结果过期门槛照旧有效。
- 关注进度用 Fieldset 与 Progress；完成时保留内容取数，按作者检查用 `sources` 范围参数，报错作者用现有身份解析。
- GET 重试归现有连接器：[HTTPX 原生重试](https://www.python-httpx.org/advanced/transports/)只覆盖连接失败，统一不了 HTTPX 与 curl_cffi 的读超时、临时 HTTP 状态与页面进度。POST 不重放，403 单次终止。
- 标签发布用系统 Git、GitHub CLI（MIT）与 [Actions runs REST API](https://docs.github.com/en/rest/actions/workflow-runs)；[release_tag.py](../scripts/release_tag.py) 管版本、主线归属、同提交成功 CI 与不可覆盖策略，工作流用 Release 制品验收。
- 独立 Windows 测试包用 PyInstaller（GPL-2.0-or-later，带 bootloader 分发例外）的 [onedir 与自启动子进程](https://pyinstaller.org/en/stable/common-issues-and-pitfalls.html)：完整目录共享资源、避免重复解包，onefile 托盘入口只用于源码部署；Peach 保留进程所有权、数据目录、配置和扫描策略。
- Windows 安装包用 Inno Setup 6.7.3（Inno Setup License，允许免费分发）与官方 `Files/Languages/Unofficial/ChineseSimplified.isl` 译文（在 `scripts/installer/`）。`.iss` 只管文件、开始菜单项和卸载登记；停托盘、补迁移、撤快捷方式经 `desktop_installer` 调已有入口，自更新与应用内卸载是唯一实现。
- 运行一致性：用 `LedgerDatabase.write_transaction` 的提交边界与 `OrderedDict`；HTTP 导航用 FastAPI/Starlette，图片复验用 `StaticFiles.is_not_modified` 与 `FileResponse` 的 ETag；列表用 SQLite 的 IN/UNION 保留隐藏标签与多标签组合，不引查询框架。
- 馆藏侧栏用 `catalog_filter` 的列表条件，已保存在线卡片用关注来源的标签与封面投影，详情用 `openFollowDetail`、Video.js 与媒体队列；导航范围与标签计数在 `frontend/src/sidebar.ts`。
- wheel 资源用 setuptools 的 `build_py.copy_tree`（[官方包内数据建议](https://setuptools.pypa.io/en/stable/userguide/datafiles.html)），钩子只复制三个既有资源目录，因为源码、桌面构建和前端产物共用其维护位置。

## Peach 必须自研的领域逻辑

以下属于产品行为，继续由 Peach 实现：

- 女优、厂牌、创作者、标签的规范身份、别名和来源；被并实体的旧 id 经 `entity_redirect` 墓碑与 `entities.resolve_entity_id` 找到新实体（ADR-0088）；
- profile 行为、稍后看、播放列表、口味和推荐排序；
- 本地、115、PikPak、在线来源的绑定和回退策略；
- 计费来源授权、隐私分类和候选复核导入；
- 物理资源垃圾候选的跨类型证据、人工复核和回收站语义；空目录清理复用 Python 标准库自底向上的 `os.walk` 与只删空目录的 `Path.rmdir`，Peach 只负责在线来源、根目录保护和 CloudDrive 并发消失边界；
- 私有获取来源、出处引用和发现关键词；
- 创作者级视觉采样语义；
- 推理 Provider 与 Agent Provider 的能力契约；
- 任务归属、进度、取消、成本和证据规则。

下面这些是基础设施而不是产品行为，所以单独记下被拒绝的候选和不可替代约束，避免再从「这看起来该有现成库」开始。

| 自研实现 | 被拒绝的候选 | 不可替代约束 |
|---|---|---|
| `mp4index.py` 有界 MP4 关键帧索引 | PyAV、`pymp4`、Bento4 | PyAV 需要 demux，`pymp4` 依赖旧 Construct，Bento4 是额外二进制；都不能证明在云盘文件上保留「只读 moov/stss/stts、避免整片流量」的约束。 |
| `mp4repair.py` 重建缺失的 `ctts`，新头存成边车 | `ffmpeg -c copy` 重封装、`untrunc`、Bento4 `mp4edit` | ffmpeg 的 h264 解复用器拿不回显示顺序（实测重封装后仍有 986/2015 帧倒着走），`untrunc` 修的是截断不是缺表，`mp4edit` 只会原地重写整个文件，而网盘上的片子改一个字节就是几 GB 重传。约束是「原文件一个字节不动、播放时拼出合规 MP4」。 |
| `certs.py` 固定项目 CA 与短期叶证书（编码继续调用 OpenSSL） | mkcert、cryptography | mkcert 会接管本机 CA 安装/私钥，不能保持跨设备固定项目 CA；cryptography 只替换证书编码且增加原生依赖，不能删除 Peach 的 Apple 398 天与 CA 生命周期策略。 |
| `migrations.py` SQLite 迁移 | Alembic | Alembic 会引入 SQLAlchemy/Mako/greenlet；现有范围只需顺序 SQL、校验和、备份与 PyInstaller 资源定位，没有 ORM 消费者。 |
| Gofile API 直接 HTTP | 社区 wrapper | 官方没有维护中的 Python SDK；社区 wrapper 只是薄封装，不能绕过 Premium `contents` 权限，也不能减少 Peach 的 Bearer 隔离与媒体规范化。 |
| `netwatch.py`、streaming/segments、sync、versioning/Windows update | 通用替代实现 | 分别是无 PyObjC 的系统通知、FFmpeg/Starlette 上的会话策略、单 writer ledger 规则和 Git/PyInstaller 更新契约；通用替代会保留同量 policy 或扩大依赖。 |
| `downloads_pikpak.py` PikPak 云下载 | PikPakAPI；云下载直连 115 用的 `p115client` | PikPakAPI 是 GPL-3.0-only、只有 async 接口且吞掉验证页地址，只借协议常量；`p115client` 要另走一套 115 授权，和 CloudDrive2 挂载争授权名额（ADR-0089）。浏览器登录（`downloads_pikpak_browser.py`）照 PikPak Assistant 用户脚本（MIT）读 localStorage 的 `credentials_*`，拉窗口复用 `browser_transport` 的 `attended` 档；用户脚本借网页续期，Peach 取走后自己续期（ADR-0093）。 |
| `browser_transport.py` 本机浏览器取页 | WebSocket 客户端库 | venv 里没有 WebSocket 库，自写约 80 行 RFC 6455 客户端驱动本机 Chrome／Edge 的 CDP，做法参照 OpenAver 的隐藏 WebView2（ADR-0065）；哪些站走浏览器由 `scraping_access` 的 `browser_fallback`／`fixed_to_browser` 定，见「补女优别名后继」一条。 |
| `organize.py`／`organize_templates.py` 目录收纳 | amane 的整理模板 | 只借占位符与可选分组语义；amane 把文件当可删的派生物，Peach 的媒体原地不动，收纳要用户发起（ADR-0039）。 |
| `wants.py` 想要清单 | SakuraMedia 的想要与订阅 | SakuraMedia 只作行为证据；入库按番号自动对账，按 ADR-0052 直接落库（ADR-0090）。 |
| `jobs.PidFileLock` 批处理进程锁 | `portalocker==4.3.0` | 候选覆盖 PID 写入、持有者、原子替换与陈旧文件清理，但一直没有消费者落地；按「候选依赖不得空转」不引入。 |
| `record_rehome.py` 个人记录接回新文件 | 按文件指纹接回；六张表改 `ON DELETE SET NULL` | 消失的文件读不到、算不出指纹；记录脱离 `asset` 就丢了番号与标题。番号是唯一跨版本稳定的键，无番号的按创作者、文件名主干与时长接回（ADR-0087）。 |

保留自研不是永久豁免：约束改变或候选实现更新时重新跑 POC，不因本表结论跳过外部检索。

## 已定型的产品行为

每条是一次验收留下的判据，一条一句。改这些行为是产品决定，照着再实现一遍是
重复劳动，动手前先确认这里没有写过。README、[docs/HANDOFF.md](HANDOFF.md)、[docs/OPERATIONS.md](OPERATIONS.md)
和 ADR 已经写下的不在这里重复，出处用 `git log -S` 查。

- 本地浏览器直放 MP4/WebM/Ogg，其余容器由 `TranscodeService` 按六秒片段缓存成 H.264/AAC MP4，不改写原媒体；ffprobe 判定可复制的流不重编码，其余在 Windows 走 CUDA/NVDEC。
- 远端 MP4 默认走标准 Range，显式开启的 HLS 使用关键帧对齐片段并在失败时回退 Range。
- 页面共用 SPA、JSON 与 gzip/ETag；侧栏随当前视频集合，已保存在线作品复用关注详情。
- Logo、侧栏「首页」和沉浸模式关闭统一清除分类、搜索与 JAV 筛选，首页默认稳定随机、换批才换种子，再点当前排序回到随机。
- 高亮、竖屏密度、索引骨架已验桌面/390×844，HTTPS 生效；手机命中区 44 px。
- 主题三选一（跟随系统／浅色／深色），只存本机，首帧前由内联脚本写进 `<html>` 的 `data-theme`。
- 同番号的分卷派生（A/B、1/2、CD/Disc/DVD/Part/Vol、「首卷裸名 + 后续卷 `-2`/`-3`」）折叠成一张卡并按时长排除完整版，首页、搜索、资料页网格、版次队列与角标计数共用这套判定。卷号后挂着尾缀时先剥掉组内每个文件名都带、且从分隔符起头的那一段，不按版次词表拆（`1080p` 会被拆成 `10` 加 `80p`）。
- 分卷卡与版次卡（有码／中字／无码）不翻卡（各卷共用同一封套，翻了像卡住），悬浮走分段视频预览；封面只有一个计数（「N 卷」或「N 个版本」），叠层封面格垫 `--page` 挡住模糊衬底的半透明边。分卷详情标题带卷号，因为各卷标题、女优、厂牌逐字相同。
- 合集翻图复用 `use-stack-flip`（`frontend/src/react/components/`）：逐张解码后才显示，失败帧不入队，悬停代际隔离异步结果，退出清理计时器。馆藏与关注详情共用原生 `dialog#stage`，浮窗不参与列表排版，关闭保留关注列表岛；图片灯箱沿用现有实现。
- 关注卡翻卡去重：`follow_faces` 复用 `community_catalog.fingerprint` 的 dHash，另加 8×8 RGB 色块（dHash 分不开同姿势的穿衣版与 nude 版）。阈值的实测依据见 [复用取证记录](SOURCING.md#媒体与关注实测)。
  - 地址相同即同一张；时长都已知且差 ≤1 秒时 dHash ≤6、最大格差 ≤4；时长未知时 dHash ≤2、格差 ≤3。
  - 翻卡按画面去重、不分站，封面计数把跨站同一画面并成一个媒体，并完只剩一个时写「N 个来源」；同站不按画面合并，4K／8K 两个文件和局部差分会混进来。
  - 文件内容哈希相同即同一个媒体，不论同站跨站、不看 alt／WIP 标签：连接器的 `content_hash` 从已存原始地址解析、不发请求（kemono／coomer／pawchive `/data/<h0h1>/<h2h3>/<sha256>`，rule34.xxx `/images/<目录>/<md5>`，paheal `r34i.paheal-cdn.net/<h0h1>/<h2h3>/<md5>`）；fanbox、rule34video、f95zone 的文件名是随机 id 或签名令牌，不参与。
  - 同站相同 `external_id` 与媒体序号标识一份媒体，归档站同时核对服务与作者范围；多个关注来源重复收录只增加收录份数。已知文件哈希不同、不同帖子或不同媒体序号各自计数。
  - 签名由后台线程补进 `generated/posters/follow-faces/`，不进 ledger。
- 关注视频规格复用 `follow_variants`：`4K60fps`、`1080p60fps` 与带空格的规格拆成清晰度、帧率两个版本标记；存量作品键在读取时投影，无需重抓或改写 ledger。
- Rule34Video 封面复用 `FollowCoverService`、HTTPX 与 Pillow，经 `/follow-cover` 缓存静态 poster。自身图片失效时只在当前作品组内寻找其他版本的封面，沿用来源白名单、请求字节上限、并发与缓存锁。该路径不解析正片、不抽帧；首页、作者筛选、详情队列与已保存在线卡片共用缩略图投影。复核记录见 `attic/evidence/20261005-follow-video-groups/`（仓库外）。
- F95 讨论图片依据已确认的附件身份在采集与读取投影中排除。网盘资源保留，未取得作品预览时显示资源服务图标；不能仅凭 GIF 扩展名过滤作品。
- 普通多女优卡片叠放前 3 个头像、只显示第一位姓名和真实总人数；JAV 小图是整页版式，混入的非番号作品统一为标题、身份、标签三行固定高度。
- JAV 详情持有 `asset.catalog_title`／`original_title` 与官方 Tag 身份，官方标记用常规字重，身份区收齐到同一内容起点。
- JAV 官方封面重探只在面积更大时替换，失败保留原图。
- 播放器按 YouTube 锁定源码对齐控件、状态、图标形变、设置面板动画与悬停提示，倍速五格到 3.0，窄屏按播放器宽度折叠留黑边，沉浸模式按 Shorts 版式，竖屏用居中 9:16 舞台，播放统计两页共用、按传输方式分口径。参考快照在 `docs/reference-snapshots/youtube-*.md`，索引见 `HANDOFF.md`「参考产品证据登记」；只复用可测量的层级、尺寸和状态语义。
- 图片灯箱在本地照片、番号样张和关注在线图片间复用同一套 Swiper，样张与在线图片只显示来源、合集序号和浏览器实际解析结果；照片标签进入分页图片墙，点开才按原图比例呈现。番号集卡复用播放列表卡的叠层纸边、`mixbadge` 张数与 `mixcopy` 两行字，封面走视频卡同一份 `coverImage`（ADR-0068）。
- 资料页照片与关注在线图片两处图片墙共用大小（顶部按钮）与固定比例／瀑布流（筛选浮层）设置；关注图片的「仅显示图片」独立保存，隐藏卡片文字与角标。瀑布流用 CSS 多栏、`break-inside:avoid` 与图片 `aspect-ratio:auto 1`，懒加载前留非零高度（[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/aspect-ratio)）；`alt` 留给读屏，字色透明。
- 缓存型资产路由先问缓存，不先解析源文件：`media_engine.file_for()` 的存在性检查落在 CloudDrive 网盘上一次 137–402 毫秒。`/photo-thumb` 先问 `photo_service.cached()`，`/sample-thumb` 先问 `SampleCache.cached()`，缓存根从 `photo_root` 推出。
- 账本路径在 Windows 只做 `abspath`，不 `resolve()`：PikPak 的 A: 是 WinFsp 网络驱动器，`resolve()` 得到 UNC 形态，之后每个经 `file_for()` 的播放请求都慢几个数量级；115 的 B: 不受影响。
- 不兼容片源（HEVC、mp3 以外的音轨、非 MP4 容器）按 6 秒片重编码给 HLS，账本没记时长或为负时用 ffprobe 的时长切，探测也拿不到才回 Range。分片重编码链与整片转码相同（CUDA 解码加 NVENC、软件解码加 NVENC、libx264），同一分片只起一个 FFmpeg。Range 响应按 1 MiB 读文件，`BufferedFileResponse` 自己盯 `http.disconnect`（uvicorn 断开后 `send()` 静默返回，Starlette `FileResponse` 不监听），否则拖一次进度条就留下一个把整部片拉完的幽灵读者。
- 有 B 帧却没有 `ctts` 的 MP4 是时间戳错乱，浏览器丢掉倒着走的帧。这类片源不重编码：`mp4repair.py` 重建一份 `moov`（游程编码的 `ctts`、编辑列表补整体平移、`stco`/`co64` 按头长差平移）存成 `transcode_root` 里的 `.mp4hdr` 边车，`/stream` 用「边车的头 + 原文件那段 mdat」按 Range 发。显示顺序取自 `ffprobe -ignore_editlist 1 -show_entries frame=pts`，`pkt_dts` 不能用。边车算出来前走 HLS 转码，同一部片后台只算一次，算不出就跳过。
- 「只采集」对齐全的行（番号已落库、字段有着落或已在候选表、封面在位）不碰磁盘；文件在不在看目录列表、同目录只列一次，扫描用目录列表自带的大小与时间、不逐个 stat；候选 CSV 每 5 秒写盘一次，被打断也在收尾写全。
- 一个控件在两页出现时，选中态也归它：首页、资料页与关注页的「全部／没看过／稍后看／已标记」共用 `use-view-glide.ts` 那块滑动玻璃与 `[data-view-glide]`，填充只由玻璃给，各排自己不铺底。
- 统计与口味两页按登录态 Vercel Analytics／Speed Insights 的当前页面重做，排行与数据源共用父网格的引导线。
- 口味页顶部给出结论与可点入口：浏览与 Peach 两侧的共同信号、可探索标签、待补证据的下一步动作。
- 操作回执复用 Toast（Sonner 的栈，`frontend/src/react/toaster.tsx`；壳里只调 `toast()`／`actionReceipt()`）；按钮以 Spinner 和 `aria-busy` 标明忙态。后台任务显示可恢复进度，断线自动重连。
- 实体的统称由用户在资料页自选：菜单只列这条实体名下已有的写法，选中的提为规范名、换下的留成别名，扁平投影跟着改；先过确认弹层并点名两个写法，成功后发可撤销回执；不收自由文本，撞上另一条实体的规范名只报冲突。
- 名字里的括号都走 `split_composite_aliases.py`：自动那拨只认罗马字复合人名，`--from-review` 那拨按人工判定清掉不承载名字的尾巴，旧写法留作别名；读音、厂牌消歧和角色出处不拆。`peach-data/review/composite-names-20260904.csv` 中的 28 条 creator 注音、575 条 tag 角色出处和 10 条 series 厂牌或载体消歧均保留，不属于待执行批次。
- 实体链接可安装：`entity_link` 表、`q_entity` 的 `links` 契约、资料页 favicon 与管理页链接管理成套；死链区分「搬走了」和「没了」，`rediscover_entity_links.py` 从站点索引页上溯找新锚，确证没了的由 `link_status.settle_gone` 处置（已隐退女优留成不可点的失效标记，其余删除）。
- 厂牌社媒核查：`find_studio_socials.py` 用 Beautiful Soup 4.15.0 解析锚点，传输与字符集用 `peach.http`，账号键用 `social_links.handle`，不加浏览器运行时；Peach 负责同站年龄门、已有账号差集与证据表。整页正则会混进帖子与脚本里的地址，不用于账号提取。
- 事务所是实体：57 家各有 `/agencies/<名字>` 页，成员、官网、标签与作品都按 `entity_membership` 算，女优页点得进去，搜名字出这家人的片；原文留在 `metadata.agency`。
- 外链圆标与厂牌标识取站点自己声明的资产，宽扁字标不参加小圆标竞选；`/logo` 的 `variant` 分 `icon`、`logo` 与最清晰的 `large`，大图版式和资料页取 `large`，紧凑版式取 `icon`。头像与标识共用 `nativeImageFit`：按像素密度折算的源尺寸不足框四成时等比居中、不放大、同图模糊补底，框短边小于 64 px 不补底；加载、回落和版式切换都重新度量。
- 关注的作者头像与来源图标是元数据：`follow_assets` 取回落在 `generated/follow-assets/`，经 `/follow-avatar`、`/source-icon` 给页面；地址只从固定表或固定主机拼，字节先认成图再写盘，到期重取失败继续用旧的并退避一小时，保鲜期与 `/link-mark` 共用 `web_settings.metadata_refresh_seconds`。视频与图片不存本机。官方头像先认 FANBOX，没有时 `follow_avatar.profile_avatar_tiers` 取名片上的 X 与 Patreon，`follow_assets.largest_image` 留像素最大的那张。
- 厂牌标识由契约位 `has_logo` 决定出不出图：没装标识的厂牌一个 `<img>` 都不发，改用首字母底板，不靠 404 摘。标识 198 张随仓库分发（ADR-0026）。
- 关注检查分两阶段：列表阶段落 partial 行，详情补全按 provider 额度只补新行和未补齐行。「补齐过」由连接器的 `ENRICHED_MARK` 声明、判据登记在 `follow_store._ENRICHED_PREDICATES`。
- 存量行重抓（连接器新学到图片宽高、封面这类字段时，旧行不会自己补上）分两步：把 `ENRICHED_MARK` 换成新字段落库后才有的键并登记判据；再 `POST /api/follow/check` 发 `{"older":true,"backfill_all":true,"rewind":true,"background":true}`（可加 `"sources":[id,…]`），从第 1 页走到站点说没有更多，进度读 `GET /api/follow/check`。`backfill_all`、`rewind` 离开 `older` 被拒收、不进界面，ledger 的回填游标只进不退；长跑任务，重启前按 `peach-batch-jobs` 先查。
- 图片的固有宽高只问文件头：`follow_image_dims.probe_image_dims` 发 `Range: bytes=0-65535`，`dims_from_header` 认 PNG／GIF／WebP（VP8、VP8L、VP8X）／JPEG（跳过 EXIF 到 SOF）；连接器、`backfill_follow_image_dims.py` 与 `/api/follow/image-dims` 落库前都经 `positive_dims` 归一，`FollowStore.set_image_dims` 只补空缺。宽高只为图片视图的卡面预留比例，回填每个条目只问卡面那张；原文件主机拦脚本（pawchive 的 `file.` 子域挂 ddos-guard）时按缩略图量，详情原图取不到也退回缩略图。
- 归档站（kemono、coomer、pawchive）多图或视频的帖子由 `KemonoConnector._media_items` 列进 `media_items`（交付文件排第一、按路径去重），详情轮播与 `/follow-stream?media=N` 按条目自己站点的主机白名单取。
- `/api/related` 用 Tag IDF 加 MMR 排序并缓存；搜索使用 FTS5 trigram，短查询回退 LIKE 并覆盖规范名、别名和检索词，搜索历史在 reader 写入被拒时降级到页面内存。
- 复核页覆盖元数据、创作者标签、Logo、头像、身份、番号目录、FC2 证据和片尾出处；抓取与 AI 结果仍是候选，批准后才写真相字段，元数据候选保留 MetaTube 目录证据且不下载 URL。
- 元数据旧决定是否过期只由 `metadata_auto_apply.metadata_decision_is_stale` 判，复核页与自动落库共用；过期后的重判、人批准标签只增不删、FC2 描述性称呼自动否决与两类撤回见 ADR-0079，`pending_genres` 收录后按并集补标签与 `genres_still_pending` 见 ADR-0082。
- 资料页头像圆框角上的换头像入口有五条路：图库同名的其他图与这个人取过的每一张图、本机文件、https 地址、本人作品画面、输入番号取封面。
  - 取到的图按内容哈希进候选缓存，换回去不重新下载。页面只回递服务端列出的 `ref`，地址由服务端按索引拼；手填地址过 `http.public_https_url`。
  - 作品画面一部一格，底图在封面和九宫格九格之间换，框出方形再装（`avatar_picker.asset_artwork` 与 `crop`，走 `/avatar-choice`）；服务端每次先核对作品挂在这个人名下（`asset:<id>:cover` 谁都拼得出），裁出新字节，原图不动。
  - 番号取封面（`POST /api/avatar-code-cover` → `avatar_picker.code_cover`）不要求番号在馆藏：本机封面目录优先，没有才走 `jav_cover_fetch.best_cover`，按番号只存对象、不写证据，之后的 `cover:<番号>` 只读本机。
  - 默认框围着 `avatar_picker.cover_focus` 取景：有脸取 `avatar_cover_face.face_square`（要边车里有脸宽与 `px`，缺的 `detect_cover_faces.py --redo`），没脸取 `jav_poster_crop` 的正封，前端不另抄判据。
- 整张作品封面不装成头像：单人作品关联不证明画面里是谁，`cover_fallback` 标身份未核实，采集脚本的安装闸门拒收。图库给不出唯一人像时，补头像后继（`peach.avatar_followup`）从单人作品封面截脸周围一块方图（`peach.avatar_cover_face`，YuNet 脸框放大 2.4 倍），按脸宽像素挑封面、最差是缩略图，其余检得出脸的封面各截一张进候选缓存（至多 8 张）。面具、眼罩照样算脸，检不出的不降门槛去捞（低分框多落在手和身体上）。来源记 `cover-face` 与 `identity_verified: false`。
  - 图库同名多张时先按脸认人（`peach.face_match`，互证与小图作证见 ADR-0056、0057、0062、0066），认不出才截封面；封面也截不出时装认得准的那张小图，标 `gallery_small`，之后可换。
  - 整张封面装的头像和截过的脸遇到更宽的脸自动替换，图库装的与人挑的不碰；头像选择器的作品组按封面像素面积排序。
- 外部来源 genre 只在 `peach.genre_taxonomy` 投影：日英来源词共用一套词表，非内容分类排除，未收录原文回传登记；查表只有 `resolve_genre` 一处，抓取与复核折叠共用。r18dev 取 `categories[].name_ja`（DMM 那套词），日文取不到才用英文（英文是再译的一层，`企画` 在非内容表里而 `Variety` 不在）。
- 一件事只留一个标签名：`catalog_rules.RETIRED_TAGS` 存「不该再用的写法 → 规范名」，唯一写入口是 `scripts/rename_retired_tags.py --apply --backup`，实体按 `entities.merge_entity` 并、旧名留作别名；`pixiv_tag` 是作者原话，不参与。规范名取馆藏通行写法（`合集` 来自文件名，`混合集` 全来自已关停的 Stash 导入，ADR-0021）。
- 没有接替者的标签登记在 `catalog_rules.DROPPED_TAGS`（`乳系`、`足系` 这类粗桶）：落库时经 `current_tags` 丢掉，`rename_retired_tags.py` 连实体删掉。映射改了原词去向后，`scripts/reproject_snapshot_tags.py --since <改动前的提交>` 按 `raw_snapshot` 新旧各算一遍、只加减差值；不给 `--since` 是按现映射补缺、一个不删。加的走并集（`auto:metadata-tags@<时间>`，可整批撤回），删的只删那组来源下的行。
- 抓取口径改了，旧候选不会自己跟上：`peach.stale_candidates` 认出未收录 genre 里有整串 ASCII 且带字母的词的候选（字母挡住 `69` 这类两边同形的词），`scripts/drop_stale_genre_candidates.py --apply` 摘掉并留备份，下一趟「只采集」按 `_missing_fields` 重抓。只有 r18dev 重抓有用；`k-mib`、`aventertainment`、`javdb` 来源页上就是英文，只能在表里直接收录英文写法。
- 未收录 genre 在复核卡上就地收录：`genre_decision`（迁移 0026）存「规范化来源词 → 中文标签」，留空即判非内容词；`peach.genre_decisions` 只管读写，映射仍在 `genre_taxonomy.map_genres`。收录后 `extract_peach_fields`、`scrape_codes.py`、`harvest_kmib.py`、`fetch_fc2_metadata.py` 都当它已知，排队中的候选由 `web_review._fold_genre_decisions` 当场折进值里；收录只改词表，落库仍要按「通过」。候选词表只给静态表已投影到的中文标签。只在 `warnings` 里有中文提示的旧候选由 `genres_in_warning` 反解出原文，不必重抓。
- 补抓按番号发行面分流来源，要求来源认得出所查番号、冷却按连败触发且会过期；无码发行站的片与粘连的版次标记也给得出徽章。
- 「只采集」的「说过没有」记忆与 `_answered_sources` 见 [来源采集](SOURCING.md#按内容类型的来源链)；只有明确答复「没有」（HTTP 404、所有渠道无候选，即 `jav_cover_fetch.NotFound`）才记，超时与网络故障不记。没有番号的视频（创作者作品、裸文件）只登记本地海报，不列为问题项。相机文件名派生的旧伪番号（`VIDEO-2022`、`IMG-1734`）由 `scripts/clear_camera_filename_codes.py` 清掉，用户或复核写下的番号不碰。
- reader 的 `/review` 通过严格 Peach CA HTTPS 读取 writer 的归一化 JSON 并原子缓存；决定按钮和所有关注写操作仍锁定。
- macOS Ledger 同步在共享根判为 `offline` 时先经 NetFS 挂载 `peach-sync` 再重判，挂载失败才保留离线结果，不弹阻塞认证框。
- 浏览历史增量采集使用 SQLite backup API 与 `browserexport`，也接受 Google Takeout ZIP；原始 URL 与标题只留本机私有目录，聚合候选不写 ledger。
- 首次设置的可选历史引导转到 `/taste?onboarding=1`，用现有读取与导入入口；指南链接按 [Google 导出说明](https://support.google.com/accounts/answer/3024190?hl=zh-Hans) 与 [browserexport](https://github.com/purarue/browserexport) 核验（2026-09-06）。
- 实体的公开事实随仓库分发：`scripts/seed_pack.py export` 只读账本生成 `resources/seed/entities.json`，导入由扫描结算声明的 `seed-import:<版本>` 后继（`seed_followup`）跑；包含与不含的内容、填空不造实体、`conflicts`／`duplicates` 与撤回见 ADR-0073、ADR-0075。
- 数据管理首屏直接复用实际 `cleanupfieldset` 正文和操作条，只有计数等待取数；资源同步与重复文件网盘操作根据 `/api/sources` 已配置来源显示，离线来源保留入口。资源同步的检查与执行覆盖已配置的 local、115、PikPak，一次检查同时报失效记录、空文件夹与孤儿缓存；按目录清理也支持本地磁盘。

## 必须复用的成熟实现

下表每行是一项能力：中列是必须复用的实现（带固定版本与许可证），右列是 Peach 自己负责的部分和不能越过的约束。

| 能力 | 复用实现 | Peach 负责 |
|---|---|---|
| 本机文件夹对话框 | Windows 自带 `powershell.exe` 经 `Add-Type` 调 Shell 的 `IFileOpenDialog`（带地址栏），STA 线程里 `SetThreadDpiAwarenessContext` 设 Per-Monitor V2；macOS `osascript` 的 `choose folder` | `src/peach/folder_picker.py` 只拼命令、区分取消与失败、一次只开一个，用完恢复原 DPI 上下文（托盘的进程 DPI 不传给子进程）；不引 tkinter 或 GUI 框架。证书子进程用 `CREATE_NO_WINDOW`，保留 OpenSSL 退出码与错误输出 |
| HTTP | 全项目共用的 `httpx.Client`/transport；FANBOX 公开 `post.info` 用 `curl_cffi`；对外 UA 统一取 `peach.user_agent.USER_AGENT`（与本机 Chrome 同大版本，ADR-0060），HTTPX、来源连接器、FFmpeg 抽帧与脚本共用 | 来源策略、DTO、脱敏、站点限定、大小上限；不求解机器人质询，标准 UA 不保证放行 |
| 追更来源接口 | FANBOX 公开帖子 API（详情只用用户的可选 Cookie 与 curl_cffi `chrome150`）、kemono 系公开 JSON API（`Accept: text/css`，站点自述的抓取路径）、rule34.xxx 官方 dapi（需 API key）与公开 tag 补全、Paheal 标签/详情页、Gofile contents API（需 Premium token）、f95zone `latest_data.php`、站内搜索（需登录 cookie）、线程页与 masked XHR、simpcity 线程页与站内搜索（需登录 cookie；只请求规范地址，不解 DDoS-Guard 质询） | 连接器边界、凭据隔离、多媒体顺序、文件站目标校验、变体与跨站重复判定、候选复核与批准后的 online asset 投影 |
| XenForo 论坛解析 | gallery-dl `v1.32.11` / `2adf2a8e`（GPL-2.0）的 `extractor/xenforo.py` 只作协议证据（cookie 优先的登录、`article[data-content]` 楼层、`.pageNav` 分页、`data-s9e-mediaembed` 嵌入）；cyberdrop-dl `5.6.21`（GPL-3.0，2024-09 起按站方要求下线 SimpCity）只作历史参照；两者都是完整下载器，不进运行时 | f95zone 与 simpcity 共用 `_xenforo_posts`／`_xenforo_thread_title`／`_xenforo_search_threads`（先取会话绑定的 `_xfToken` 再 POST `/search/search`，带回版块标签）；cookie 只发回来源站，末页由分页导航自算（HTTPX 跟随重定向会丢显式 Cookie），过滤纯讨论楼层。站点 cookie 前缀会轮换（gallery-dl 写死的 `ogaddgmetaprof_user` 已换成 `yMziCv8BrCZz1o7_`），所以不认 cookie 名、只透传整条 Cookie 头 |
| 文件系统事件 | `watchdog`（Apache-2.0）加定期对账，只订阅 `local` 来源的根；网盘挂载不订阅，递归 watcher 在网络挂载上就是轮询。CloudDrive2 的 webhook 请求形态与「云端路径不进 pathlib」取自 `sqzw-x/amane`（GPL，只借设计，见 [docs/reference-snapshots/amane-watcher.md](reference-snapshots/amane-watcher.md)） | `src/peach/push_discovery.py` 负责去抖、大小稳定的写完判定、前缀表映射、共享密钥与来源校验；登记本身调 `scan.ingest_path`，与全量扫描同一条 upsert（ADR-0041） |
| HTML 适配器 | Beautiful Soup 4.15.0（MIT） | 来源专用选择器和来源记录 |
| 位图 | Pillow | 头像/Logo 质量和来源策略 |
| SVG 光栅化 | `resvg-py`（resvg，MPL-2.0 绑定） | 只把站点自己的矢量图标转成位图交给 Pillow（threads 的 app 图标只有 SVG，2026-09-02 核对）。不选 cairosvg：它在 Windows 要另装 cairo 原生库，resvg-py 是 abi3 轮子，win_amd64 / macosx_11_0_arm64 / macosx_10_12_x86_64 都有官方预编译。候选发现、比例判定、缓存与回退在 Peach。`images.bake_square_vector` 用标准库 ElementTree 包一层外层 SVG 做方形归一，产物仍是矢量，栅格化只用来判配白底还是深底 |
| 搜索 | SQLite FTS5 | 索引字段、排序、profile 感知筛选 |
| 相关推荐 | OpenAver `8cc17e50453d9f69a81f5fee1a072df80f7aab73` 的 Tag IDF + 系列／片商／出演者规则只作固定算法参考（MIT） | 独立实现规范实体评分、MMR 多样性、稳定 seed、解释原因与负反馈边界；不复制上游 UI／源码 |
| 女优姓名对照 | `li-peifeng/Jav-Actors-Mapping` 的固定 revision，仅作私有输入（仓库未声明许可证，不随 Peach 分发） | 精确匹配、冲突复核、别名、来源与真实 ledger 写入 |
| 女优头像候选 | Gfriends 的 GitHub raw 索引与单张媒体（只作外部 Provider，不克隆图库）；r18.dev 人物对象给出的 DMM 官方 `actjpgs` 缩略图只作精确身份绑定的首次头像 | 名字链、质量档位、格式/尺寸/SHA-256 门槛、候选缓存、provenance、健康统计和人工复核；首次头像只在人物主名精确一致、实体已连到同一资产且没有在位头像时安装，不进入高清候选排序 |
| Gfriends 索引读法 | `src/peach/gfriends.py` | 页面与批处理共用：`Filetree.json` 解析、名字链匹配、`quality_key` 排序、raw 地址与本地缓存保鲜期。**目录前缀是来源优先级，不是清晰度**（上游 README 写的「质量升序」不准）：`0-` 网友投稿、`1-`～`8-` 写真机构与片商官方、往后是原图两三百像素的大型数据库，排第一的是最该先试的一张；`AI-Fix-` 是上游放大去水印版，去掉前缀取原件 |
| 「这个地址能不能让 Peach 替人去取」 | `src/peach/http.py` 的 `public_https_url` + `resolves_publicly` | 追更图片代理与手填头像地址共用：必须 https 与公网域名，不收 IP 字面量与用户信息，解析出的每个地址都要 `is_global`；否则 Peach 就是能访问路由器、NAS 与本机端口的跳板 |
| 头像写入 | `src/peach/avatar_provider.install_entity_avatar` | 采集脚本、复核页与换头像共用：`.img` 经临时文件原子替换，`.ct`、`.provenance.json`、`.face.json` 一起换；检不出脸要删掉旧 `.face.json`，否则页面按上一张的脸框取景且看不出错 |
| 厂牌 Logo 候选 | 厂牌官网确认的社交 handle → unavatar URL 解析 → 平台 CDN 单图 | handle 归属、内容缓存、方形归一、精确/感知哈希、provenance、健康统计与变化复核 |
| 厂牌字标名录 | 发行商与平台自己的厂牌名录，入口在 `harvest_maker_directories.DIRECTORIES`：MGStage `/ppv/makers.php`、Prestige `/api/maker`、KMP `/label`（大半是 SVG）与 jae.tokyo 展会名录 | slug↔账本对账（四路判据，空罗马字形不可比）、按形状分三张指定表（方标装大位、字标烤方两位共用、方标只管小位）、改地址后靠 provenance 边车重新收人、复核 CSV 与安装闸门。存入口不存图片地址（KMP 文件名带时间戳），不推导 URL、不猜名字 |
| JAV 元数据查询 | 每个站只有一个归属（ADR-0048）：自写解析器持有 r18.dev、DMM／FANZA、一本道、FC2、fc2cmadb、FC2PPV-DB、JAVten、JavArchive、AVBase、JavBus、javdb，片商官网与转载站经 amane 桥（ADR-0043、ADR-0044）；MetaTube SDK `6a5e6128c725187aeaf921d48ed7d9cd9f30671b`（Apache-2.0）只作来源身份与丰富字段模型参考；DMM 的 GraphQL 接口地址、`ppvContent` 与 `legacySearchPPV` 两条查询的取法参照 OpenAver（MIT）`core/scrapers/dmm.py`，cid 匹配与身份核对是 Peach 自己的（ADR-0059） | 只发规范番号；Peach 管来源链（`metadata_routes`）、`provider_id`／`content_id`、逐字段优先级、原始与目录证据、健康统计、候选复核与 ledger 投影。amane 的 POC 判据与字段缺口见 [取证](reference-snapshots/amane-crawlers-poc.md) |
| Javinizer-Go 历史快照 | `sources/metadata/javinizer-go/<番号>/<来源>.json`，由 Javinizer-Go v1.5.x（MIT，`dd56998328d078c9baf68ff4fde2e6fcaa2a691a`）在 2026-09 之前取回；二进制与快照留在磁盘，没有调用路径（ADR-0044） | 只作离线证据：封面层读它的 `cover_url` 与 `content_id`，别名解析读企划名义，账本里 `javinizer:<站>:<字段>` 的 provenance 按 `metadata_policy.HISTORICAL_SOURCES` 认级别。`scrape_codes` 写进同一目录的新快照 `provider` 记解析器名、`provider_version` 记 Peach 版本 |
| amane 刮削站点（官方档 makers、prestige、faleno、dahlia、mgstage；转载站 fc2club、freejavbt、airav、avsox） | amane `3c416618a9617be1c377694b1a150bf9821a7e6d`（v0.17.0，GPL-3.0），经 `tools/amane-bridge/` 薄桥子进程接入（ADR-0043、ADR-0048；`makers` 是 amane 的 `official` 模块）：独立 `pyproject.toml`／`uv.lock` 钉 sha，venv 建在 `<数据根>/tools/amane-bridge/.venv`，桥只用 `amane.crawlers.sites.<站>` 与 `amane.net.*`，不碰 `aggregate` | GPL-3.0 与 Peach 的 AGPL-3.0-or-later 以进程边界相接，仓库与分发件只含清单、锁与桥脚本，amane 源码由 uv 按锁下载。升级核对清单、锁、字段语义与失败分档（`api_error` 归服务端失败；Prestige 横向封套投影到封面、竖版正封到海报；发行日按 MGS 配信规则结算）；设置页显示实际安装版本。上游 `WebClient` 以 `verify=False` 发公开请求、不带凭据，每次子进程 import 约 0.6～1 秒。Peach 管来源链位置、身份核对、冷却、候选与结算 |
| 已确认厂牌的目录归位 | Javinizer-Go v1.5.2 organizer（MIT）只作冲突预检、模板化目录和回滚边界的协议参考，不调用它，不让它持有 Peach ledger | `rehome_unknown_jav.py` 只消费人工确认映射；先出逐文件 CSV，拒绝扁平化重名与厂牌冲突，SQLite 备份后移动文件并同步 Peach 路径／实体 provenance |
| FC2 目录元数据与跨号证据 | 已缓存的 fc2cmadb Inertia `article`／评论；Javinizer-Go v1.5.2 的 FC2 解析器（MIT）只作商品页字段边界参考 | 旧文章仍有标题、原始标签、日期、时长、卖家、FC2 CDN 封面与 `comments`（2026-08-31 登录态实测）；无歧义标签译成现有词表，标题／标签进 `/review`，`w1200` 封面过尺寸与解码门槛落生成产物；pair、合集/分片保护、hash/时长/尺寸佐证、库外 evidence、健康统计与复核归 Peach，不依赖 FC2-Leak-Detector/JavSP，镜像候选不直写 ledger |
| 缺索引 MP4 重建 | untrunc（anthwlock，GPL-2.0，用户自行解压到 `<数据根>/tools/untrunc/`，也认 `PEACH_UNTRUNC` 与 PATH），`-n -s -dst` 借一部同编码器的完整片子当参照切 `mdat`；不随 Peach 分发，「运行信息」给下载入口 | `src/peach/mp4recover.py` 挑参照（同目录文件名最近的先试，最多 4 部）、验收（解码错误 ≤3 行、音视频时长差 ≤5%）、换回原路径并把坏原件改名成同目录的 `.文件名.peach-original`；缺整个 `moov` 的片子哪里都打不开，所以结果替换原文件，不像缺 `ctts` 那样另存头。实测见 [取证](SOURCING.md#媒体与关注实测) |
| 媒体探测/转码 | Peach 管理的 FFmpeg/ffprobe（Windows 实测 9.0.1 full build 的 CUDA/NVDEC、`scale_cuda` 与 NVENC，二进制启用 GPL/version3）；CI 用 `FedericoCarboni/setup-ffmpeg@v3`（MIT）固定 9.0.1，从 GyanD/codexffmpeg 的精确 release 资产下载，不走访问 Gyan 易失端点的默认 `release`（[取证](SOURCING.md#依赖与工具实测)） | 容器与编码分别检查：MP4/M4V 的 H.264 8-bit 加兼容音轨直出，其余容器里的 H.264 8-bit 只换 MP4 封装；其余 Windows 输入依次 CUDA→NVENC、软件解码→NVENC、`libx264`，macOS 封装复制或软件转码 |
| HTML5/HLS/DASH 播放 | Video.js 8.24.1 + 内置 VHS（Apache-2.0，本地固定版本） | 流方案、授权、稳定时长、回退顺序和统计面板；详情不兼容片源复用 HlsSegmentService 与 FFmpeg 按六秒编码 H.264/AAC，独立缓存、绝对时间轴及会话取消，无整片预转码 |
| 播放器设置与影院布局 | Video.js 8.24.1 的 `playbackRate`、既有 QualityLevel、原生 tooltip 与控制栏插槽；YouTube `e937390a` 实际 DOM／CSS／JS 给几何、状态、动画和图形证据 | 在现有 DOM 上组合氛围模式、倍速、真实清晰度和影院模式：59 px 两排控制栏、40→111 px 横向音量、4→6 px 进度、右侧共享胶囊、整行悬停的 274 px 设置菜单、视口级全屏；普通视图 `contain`，全屏 `cover`（接受非等比片源的边缘裁切）。全屏判定同时看 Video.js／原生类、`isFullscreen()` 同步的 `data-peach-fullscreen` 与 `body.vjs-full-window`；浏览器专用伪类放进 forgiving `:is(...)` 或拆开写，免得未知伪类废掉整组。设置项、选中勾、菜单箭头、中央 bezel 与 loading 只 vendoring 锁定版本的 SVG path／spinner，音量 hover 与滑轨中心沿用上游外层伪元素与 50% 几何，tooltip 只补层级与越界可见；不复制控制逻辑、不迁 Video.js 10 Menu、不引重复质量选择的插件 |
| 播放器时刻预览 | Video.js 原生进度控件 + Peach 的 `/timeline?id=&s=`（10×10 接触印相），取不到时退到 `/poster?id=&c=0…8` 九宫格切片 | `peach.timeline_sheets` 按每 10 或 30 秒一帧预铺，只覆盖 `location='local'`（网盘每抽一帧都回源，[流量实测](SOURCING.md#媒体与关注实测)）；其余退回只给近似时刻的九宫格。抽帧与拼图共用 `peach.frame_capture`。`videojs-vtt-thumbnails`／`videojs-sprite-thumbnails` 要另建 sprite/VTT 契约与运行时依赖，格子换算在 Peach 是一行整除，不引入 |
| 外挂字幕 sidecar | 浏览器原生 `TextTrack` 与 [WebVTT 规范](https://www.w3.org/TR/webvtt1/)；配对复用 `catalog_rules` 的 `VERSION_TAIL_TOKENS` 与 `release_code_from_filename`。行为证据：sakuramediabe `import_service.py`／`movie_numbers.py` 的 `subtitle_matches_movie_number`（同目录、纯番号、不回退同名），NeoAVDC `organizeMedia.ts`／`parseNumber.ts` 的 `isSubtitleFile`（`.srt .ass .sub .vtt .ssa`，按视频主名前缀）；Peach 的判据是两者的并集加顺序 | `subtitles.py` 只做同目录配对（exact／suffix／code／orphan）、`asset_subtitle` 幂等登记、srt/ass/ssa → WebVTT。不用 `pysubs2`（为几十行加运行时依赖）和 FFmpeg（每次起子进程、报不出「编码认不出来」），编码要认 GBK／Big5／Shift_JIS，不用几乎吞下任何字节的 `gb18030`。内封字幕轨不在此列，`media_probe.py` 只取 `v:0`，流信息不落库 |
| 分卷文件命名 | [Plex 官方命名](https://support.plex.tv/articles/naming-and-organizing-your-movie-media-files/)的 `cd/disc/disk/dvd/part/pt + 数字` 与 [Kodi 官方 File Stacking](https://kodi.wiki/view/File_stacking)只作行为证据；运行时复用当前树的 `part_marker`，不新增扫描器依赖 | 兼容裸数字、紧接番号的 A–H 与 cd 序号、fhd 序号及圈号标题，共有版次尾缀先剥离再取卷标。FC2 的明确数字合集允许缺集和零起始；本篇与唯一 SP、gift、特典可合卡，完整版与数字分卷混合、重复标签不自动合并。每个 asset 与播放会话保留，不拼接或改写媒体 |
| 照片灯箱轮播 | Swiper 14.2.0（MIT，本地固定版本，按需加载 CSS／JS）的 Thumbs / Keyboard / Zoom 模块，由 React 灯箱（`frontend/src/react/photo-lightbox/`）只经核心 API 驱动，不用 Swiper 的 React 封装 | 样式与脚本都就绪才构造轮播，保留 scoped 单 slide 结构样式防首载重叠；Swiper 管轮播、键盘、缩放与缩略图，Peach 管图集来源与顺序、缩略图居中、相对原图百分比、适应窗口／原大小、缩略图缓存与计费口径；图片墙是 CSS 网格，不经 Swiper |
| 浏览器历史 | `react-router` 8.4.0（MIT）的 `createBrowserHistory`（`v5Compat`），随 `peach-ui.js` 发出（`frontend/src/history/`）；不用 `history` 5.3.0（2022 年后不再发版、另带 `@babel/runtime`，条目格式与 React Router 内置的那份并存） | 壳写地址的入口 `shellNavigate`：路径按当前地址解析，清理地址时透传当前条目的状态；一建好就接上唯一的监听位再分发，每次变化领一个序号，按序号认领决定派不派发（`startRouting`、`routeSeen`） |
| 客户端导航 | `react-router` 8.4.0 的 `<Router>`（Declarative 模式）与 `<Routes>`，`navigator` 是上面那一份历史（`frontend/src/react/router/`）；不用 `unstable_HistoryRouter`：它把更新包进 `startTransition`，接连两次变化并成一次渲染 | 派发点 `RouteDispatch` 每次历史变化报给 `routeSeen`，由壳的 `restoreRoute` 打开那一屏；管理区十页由常驻宿主按壳登记的那一条画（`managed-routes.tsx`） |
| 导航排序 | 浏览器原生 HTML Drag and Drop，侧栏岛 `sidebar/sidebar-island.tsx` 与设置面板 `settings-panel/sidebar-order.tsx` 各接一份 | 桌面鼠标直接拖动、落点提示、上下移动按钮作为键盘与触屏回退、`localStorage` 持久化；不为单列排序引入额外运行时依赖 |
| 播放列表队列拖动排序 | `frontend/src/ui-kit/controls.ts` 的 `wireDragReorder()`，详情页岛经 `helpers.wireDragReorder` 调用 | `dragstart` 标记被拖行，`dragover` 按指针在行的上半或下半给落点线，`drop` 把整份新顺序交给调用方落库；落点线、抓手与焦点样式在共用件里 |
| 图标 | 固定版本的本地 Lucide 子集；Health Icons 24 px outline（CC0）用于领域图标；Phosphor regular 填充字形（MIT）只用在描边说不清的地方（字母表 Aa、播放列表） | 标签、状态和交互设计 |
| 资源文本中间省略 | Vercel Geist `MiddleTruncate` 行为契约 + 浏览器原生 `ResizeObserver`、`Intl.Segmenter`、Canvas 测量 | 文件名、路径、URL、ID 等资源标识用 `data-middle-truncate`；标题、说明、人名、标签等语义文本保留末尾省略；页面源测试登记全部末尾省略选择器，新增截断未先分类会失败 |
| 定时轮询 | APScheduler（MIT，固定稳定版；3.x `BackgroundScheduler` / interval trigger） | 只在 ledger writer 启动、持久频率、首次延迟、单实例、手动/自动互斥、运行状态与来源错误汇总 |
| 局域网发现 | Python zeroconf | 服务生命周期和真实客户端验收 |
| 生成产物跨机同步 | Syncthing 2.1.x，Windows send-only → Mac receive-only | 目录划分、忽略规则、方向固定与「Mac 不发布正式产物」的边界 |
| Windows 托盘 | pystray 0.19.5（LGPLv3）、Pillow、Win32 Per-Monitor V2 DPI | Peach 服务归属、后台更新检查、菜单动作、品牌图标 |
| Windows 托盘恢复 | Windows 自带 `OpenProcess`、`GetProcessTimes`、[`WaitForSingleObject`](https://learn.microsoft.com/en-us/windows/win32/api/synchapi/nf-synchapi-waitforsingleobject)、`GetExitCodeProcess`；Python 3.12+ 标准库 `ctypes` / `subprocess`，无新增依赖或分发体积 | `tray_lifecycle` 保留明确退出意图、创建时间校验、3 次 / 5 分钟预算与重启交接。pystray 0.19.5 的 `_message_handlers` 接收 `WM_STOP` / `WM_ENDSESSION`，已核对安装包源码；Windows 临时进程实验证明强制退出能恢复，明确退出不会恢复。原生 API 随受支持的 Windows 维护；pystray 使用项目固定版本。不采用 Task Scheduler `RestartOnFailure`：它只管理任务启动的实例，桌面快捷方式与现有重启脚本不归其管理；不新增 psutil 运行时依赖，进程句柄已覆盖等待与退出码。已知边界是监视器随整棵进程树被终止时不能恢复。 |
| macOS 菜单栏 | `pyobjc-framework-Cocoa==12.2.2`（MIT）提供 AppKit / PyObjCTools / objc | 附件应用策略、18 pt template 图、服务归属与菜单动作 |
| 人脸取景 | `opencv-python-headless==5.0.0.93`（Apache-2.0）的 `cv2.FaceDetectorYN` + opencv_zoo 定版模型 `face_detection_yunet_2023mar.onnx`（sha256 `8f2383e4…52fa4`，232 KB，放 `peach-data/tools/yunet/`，不进 Git）；MetaTube SDK `6a5e6128c725187aeaf921d48ed7d9cd9f30671b` 的主脸聚类只作算法参考 | 头像／封面离线脚本共用 `peach.face_detect`（主脸、归一化焦点与 sidecar）。`detect` 按长边 320/640/1280 各检一次、分数取中位数；`main_face` 先筛掉分数落后最好那张 0.1 以上的框，再取最大。不用 Haar 级联（OpenCV 5 wheel 里没有、检出率低）与 Pigo v1.4.6（有无脸误报）。[实测](SOURCING.md#人脸与水印实测) |
| 人脸比对 | 同一 OpenCV 的 `cv2.FaceRecognizerSF` + opencv_zoo 定版模型 `face_recognition_sface_2021dec.onnx`（sha256 `0ba9fbfa…34e79`，与 LFS 指针的 oid 一致，37 MB，放 `peach-data/tools/sface/`，不进 Git） | `peach.face_match` 提特征、算余弦，阈值用 SFace 官方的 0.363；补头像后继拿图库候选与单人封面截到的脸比（ADR-0056），小脸先放大再检（ADR-0070）。检脸用 `peach.face_detect`，取模型走同一条 `fetch_model`。不引 `face_recognition`／dlib（要编译、体积大）与 InsightFace（模型限非商用、需 onnxruntime）。[实测](SOURCING.md#人脸与水印实测) |
| 头像水印检出 | 同一 OpenCV 的 `cv2.dnn.TextDetectionModel_DB` + opencv_zoo 定版模型 `text_detection_en_ppocrv3_2023may.onnx`（sha256 `03f550c6…66587`，2.4 MB，放 `peach-data/tools/ppocr/`，不进 Git） | `peach.avatar_watermark` 检出，`scripts/scrub_avatar_watermarks.py` 复核与移除。不用 MSER 自写启发式（抓不到半透明水印）。`MIN_SCORE` 0.9、框宽占图宽 ≥ 4%、框整体落在距边 15% 带内；半透明水印给不出框，所以检出只是候选，人看标注图确认、漏的自己补框。移除优先裁边、不 inpaint。[实测](SOURCING.md#人脸与水印实测) |
| 正封取景 | 同一 OpenCV 的 `cv2.Sobel` 求列向梯度；NeoAVDC `c7a430c64013c97a0213cd8a57e2ff5696793a86`（MIT）与 sakuramediabe `9c6a31915c9a364c9d6717798575daf9445916bd`（GPL-3.0，只作算法边界参考）的封套几何实测值 | `peach.jav_poster_crop` 给出正封取景框（折痕列到右下角、满高），`scripts/poster_crop_boxes.py` 批量写边车，产物是坐标不是图片。折痕判据见 `peach-jav-cover-workflow`，外部参照、实测与手工框规则见 [取证](SOURCING.md#正封取景实测) |
| 115 文件清单 | `p115client==0.0.9.6.5.1`（MIT） | 只在显式 SHA-1 对账脚本中安装，Peach 负责 ledger 事务、备份与写入门槛 |
| 视频出处/片尾证据 | 现有 FFmpeg 抽帧 + Windows.Media.Ocr WinRT Provider（Windows PowerShell 5.1 固定适配器） | 有界首尾采样、缓存、来源/Full version 分类、健康统计与人工复核 |
| 参考产品行为 | 当前线上交互 + 有版本的公开 DOM/CSS/JS；取不到源码时用精确截图测量 | 证据登记、无障碍、Peach 差异、回归检查 |
| 浏览器历史解析 | `browserexport`（Chrome/Firefox/Zen/Safari 的 SQLite 解析，`taste_history.py` 不自写解析） | 消费者是 `/taste` 的本机读取与导出导入；Peach 保留 SQLite backup、Takeout、私有原始存储、域名分析和 candidate 生成，在 Windows 自己关只读连接以避开句柄滞留。跨主机同步须显式导出、传输并按来源去重合并 |
| Rule34.xxx / Paheal 高清封面 | 固定参考 gallery-dl `86047cf67a12bdb6ff1085774f8ad9fc347e8da9`（GPL-2.0，只作协议行为证据，不引入运行时）；运行时复用现有 FFmpeg | booru 按 `sample_url`/`preview_url`/`file_url` 回退，Paheal 只取原始 `file_url` 再抽帧：FFmpeg `blackframe` 的 `lavfi.blackframe.pblack` 在开头 30 秒选第一张黑色像素低于 98% 的帧，版本化缓存键淘汰旧黑帧（不用 GPL、默认取 10% 位置的 ffmpegthumbnailer）。Peach 管 URL 白名单、同源代理、双并发抽帧、缓存与低清回退 |
| FANBOX 正文解析 | PixivUtil2 `v20251112` / `e537e96` 的公开正文模型（BSD-2-Clause，只复用数据模型，不引入整套下载器） | Peach 的独立规范化 DTO 覆盖 image/text/file/article/video/entry、`fileMap`、`embedMap`、`urlEmbedMap` 和旧 HTML 正文，保留正文顺序、稳定去重、可播放媒体与文件页边界；许可证依据写在实现头部，传输固定 `curl_cffi` |
| 云下载传输 | `grpcio==1.84.0` 与 `protobuf==7.36.2`（消息代码由 grpcio-tools 1.84.0 生成后提交），首个消费者 `downloads_clouddrive` | CloudDrive2 官方 proto 的七个方法子集、令牌存 CredentialStore、任务表与失败分类（`downloads.py`，ADR-0089） |
| 本地 NFO 导入 | Kodi／Jellyfin NFO 协议（2026-09-06 核对 [Kodi](https://kodi.wiki/view/NFO_files/Movies)、[Jellyfin](https://jellyfin.org/docs/general/server/metadata/nfo/)），标准库 ElementTree，图片走项目固定版 Pillow；实现在 `library_nfo.py` | 只适配影片、单集与音乐视频（整剧、专辑、播放记录与远端图片引用不套用），拒绝 DTD、超大输入与越目录图片引用。同名边车优先，`movie.nfo` 与通用海报只用于单影片目录；正片和图片同属一组连号（`(1).mp4` 配 `(1).jpg`…）时同名图是图集的一张。已知内容词投影为中文标签，画质、促销、发行属性与演员编成丢弃，未收录的自定义标签保留；远端补厂牌、导演、发行商、时长与图片出处，人物主名精确一致时补 DMM id、假名、罗马字与首次头像，不替换演员真值。网络复用 R18 JSON 入口、SourceTransport、头像缓存与封面解析器。候选按资产 ID 与路径定位，批准时复核目标，时长证据不覆盖探测时长（ADR-0029） |
| JAV 高清封面 | Javinizer-Go `dd56998328d078c9baf68ff4fde2e6fcaa2a691a`（MIT）的 DMM modern `awsimgsrc.dmm.com/dig/...` 映射与尺寸门槛；Prestige 公开 API 的查询模型参考 MDCX `58e3f930f2e864fceb8a53ceef818716e2a6413d`（GPL-3.0，只作协议证据） | 候选、Range 量尺寸、面积最大者胜出与仅更大才原子升级见 `peach-jav-cover-workflow`。批量流程不请求社区来源，历史快照里的社区站只借厂牌；既有库采集在官方落空时经 `peach.community_catalog` 查 AVBase（取商品号认得出这个番号的店铺条目，名寄せ的标题可能来自合集）、JavBus 与 javdb，两个图源先按 dHash 求一致，取景不同时用 OpenCV ORB（相似变换内点 ≥60 算同一张），单一图源照用并留空 `verified_by`，遇验证页不绕过（ADR-0030、0032）。MDC-NG 只证明 Amazon 日本渠道存在，只留 POC 候选。不写 ledger |

依赖的第一个消费者及其隔离测试必须在同一改动落地，否则不引入依赖。
表里没有单列的 Python 依赖及首个消费者：`numpy`（vision 组，`face_detect.decode` 直接 import）、`socksio`（PikPak 的 SOCKS 代理）、
`opencc==1.4.2`（naming 组，`harvest_javdb_cn_names` 繁转简与字形表复核）、`psutil`（开发依赖，`agent_worktree.py processes`）。前端每个包的用途见 [前端岛层](FRONTEND.md#依赖清单)，引入时机按 ADR-0031「前端基础库」。
Python、npm 与 GitHub Actions 的版本由 `.github/dependabot.yml` 每周检查；固定前端文件由
`package-lock.json` 和 `scripts/vendor_web_dependencies.mjs` 重建并核对来源、许可证与 SHA-256。

## 静态检查

Python 复用 MIT 许可的 [Ruff](https://docs.astral.sh/ruff/) 0.16.10，版本由开发依赖和 `uv.lock` 固定。规则配置在 `pyproject.toml`；正式入口通过 `tests/test_python_lint.py` 扫描全仓自有 Python 文件，检查 Pyflakes、Ruff 支持的 Pylint 错误规则与四项常见行为隐患。Ruff 的 Pylint 规则覆盖是部分覆盖；需要跨模块推断的问题仍由对应行为回归验证。

复用现有 Oxlint 1.85.0 的 correctness、`eqeqeq` 与 `oxc/no-accumulating-spread`，不新增依赖。源码和测试共用基础规则；shadcn 设计规则仅作用于自有 React 源码。

评估过 MIT 许可的 [anti-slop](https://github.com/dmmulroy/anti-slop/tree/c44ef22ca116d0ba62a3ff663a0bd13a3f3fa40b)。固定提交的试跑中，8,243 条诊断里 7,274 条要求空行；其禁止 `unknown`、运行时 `typeof` 和模块 mock 的规则不适合本项目的输入校验与测试替身，因此不引入整套插件。类型安全由 TypeScript、基础 lint 与对应行为回归共同检查。

## 已删除旧实现与当前继任者

找不到某个旧脚本时先查这张表：它的能力通常已经并进右边的实现，不要照旧名重写一份。

| 已删除/旧名称 | 当前实现 | 规则 |
|---|---|---|
| `rm-web.py` / `rm-web.html` | `src/peach/api.py`、`src/peach/web_contract.py`、`web/index.html` | 不得恢复旧 HTTP server |
| `rm-javlookup.py` | `scripts/scrape_codes.py` | 扩展来源适配器，不分叉刮削器 |
| `rm-probe.py` | `src/peach/media_probe.py`（入库时探本机与 115）、`scripts/probe.py`（历史、重探与计流量来源） | 探测与失败记 -1 只有 `media_probe` 一份，保留续跑语义 |
| `rm-sheets.py` | `scripts/sheets.py` | 共用 FFmpeg/任务原语，不新建抽帧管线 |
| `rm-ledger.py`、`scripts/ledger.py` | `peach init`／`peach scan`（`src/peach/cli.py`、`src/peach/scan.py`）+ repository/migrations | 摄取与建库只有 `peach` 一个入口，不放回旧 CLI；Stash 回灌随 ADR-0021 退役 |
| `rm-status.py`、`scripts/status.py` | `peach status`（`src/peach/cli.py`） | 状态命令只读，并且只有一个入口：打包入口转发全部子命令，不单独发脚本 |
| `rm-suggest.py`、`scripts/suggest.py` + `moods.json` | `scripts/taste_history.py` + 馆藏页筛选 | 排序与心情筛选留在应用端口，不放回旧 CLI |
| 各写库脚本私有的 `--database`／`--backup-dir`、自写 backup 与只读连接 | `src/peach/scripting.py`（`open_readonly`、`add_ledger_write_args`、`open_for_write`、`counts_of`、`verify_after_write`、`USER_AGENT`、`RateLimiter`） | 真实写入的参数只有 `--db`／`--apply`／`--backup` 一套；`--apply` 必须同时给 `--backup`，备份走 `peach.migrations.sqlite_backup`，脚本不各写一份 |
| `rm-trafficwatch.py` | `scripts/traffic_watch.py` | 只停止任务拥有的进程树 |
| `rm-sha1.py` | `scripts/sync_sha1_115.py` | 复用 Provider 哈希，不盲目重算网盘媒体 |
| `import_performer_portraits.py`（原 `agent/claude/performer-portraits`） | `scripts/audit_performer_portraits.py` + `scripts/localize_performer_names.py` | 一次性导入已执行完；后继只产 CSV，不写头像文件 |
| `normalize_code_suffix.py`（原 `agent/claude/code-suffix`） | `catalog_rules.jav_display_metadata` + `scripts/audit_jav_display.py` + `scripts/audit_code_creators.py` | 紧凑番号只随发行证据恢复；版本后缀投影为徽章，原始文件身份不丢失；全库审计只读 |
| `dedupe_performer_creator.py`（原 `agent/claude/dedupe-identity`） | `scripts/merge_duplicate_identities.py` | 后继的判据已扩到跨 kind、同 kind 与真子集三轮，旧脚本判据更窄 |
| RSS 适配层（feedparser） | `src/peach/feeds.py`（JavDB 演员页当伪 Feed，ADR-0042、ADR-0047、ADR-0083） | feedparser 不在依赖里；新增发现源先看番号样本，按 `peach.feeds` 的契约接入 |

## 当前替换队列

下面是还开着的替换项，以及每一项已经定下的做法。

1. 详情播放由 Video.js 承担；`MediaEngine.stream_plan` 在显式开启时给 115/PikPak 原生 MP4 生成 HLS 临时短片段，默认仍走标准 Range（ADR-0016）。待补自适应码率、多路清单和生产验收。CloudDrive 的虚拟盘固定块预取仍属于来源层成本。
2. `sync_sha1_115.py` 还没有备份闸门（`tests/test_script_policy.py` 的例外表已记账）；其余旧脚本的继任见上表。

## 原位改字

`scripts/dev/copy-editor.js` 复用官网本地预览的 `edit-client.js` 交互：文字范围提示、原位编辑、按钮文字就近输入、回车和失焦保存、Esc 取消。
应用的 React 与动态页面使用现有静态文案定位、摘要校验和备份入口；演示站使用浏览器草稿。两者只在 `?edit` 启用，无新增依赖。
