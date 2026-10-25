---
name: peach-worktree
description: 在用户说并行、工作树、暂存、提交、ready、集成、生产重启，或任何要写 Peach 代码的任务开始时使用。
---

# 并行 worktree 与提交边界

最后复核：2026-10-24
证据来源：[开发约定](../../../AGENTS.md)、`README.md`、ADR-0015、ADR-0017、本机工作树与沙箱工具记录、测试域登记失败与交付中断复盘、2026-10-22 多分支集成复盘。

## 是否委派与何时使用
单一功能域、局部改动或预计 30 分钟内完成的任务，由协调者在自己的隔离工作树直接完成；只有任务可独立并行、需要隔离环境，或长跑过程能明确缩短总耗时才委派。
默认最多一个工作者；多个工作者只用于彼此无依赖的任务。委派只传目标、相关文件、边界和验收命令，不转交完整对话。
协调者只在完成、阻塞或至少五分钟的检查点读取状态，不做分钟级轮询，也不重复工作者完成的搜索、浏览器检查和测试。
跨对话消息仅用于对方需要处理的具体依赖；发送前核对状态与职责。授权不等于同步义务，不唤醒已结束对话只为报进度或收确认；交付以 Git 和共享证据为准。
任何会写入当前机器 `peach-app` 的代码任务都使用隔离工作树。主目录只做集成，不做并行编辑；worktree 本机重建，不跨机器复制目录。

## 流程
1. 协调者在主目录创建隔离工作树：`& .\.venv\Scripts\python.exe -X utf8 scripts\agent_worktree.py create --agent claude --task <task>`。它建在 `peach-worktrees/`，Codex 和 Claude 共用这一个目录。**不要用 Claude Code 内置的工作树机制（`.claude/worktrees/`）**：它在分支被集成后会被回收，目录却留在原地。
   Windows Codex 对 `create`／`ready`／`integrate`／`prune --apply`、`git add` 与 `git commit`
   从第一次调用就按 `peach-shell-commands` 的沙箱规则使用受控提权；它们会写主检出的
   Git common directory，工作树目录可写不代表 `.git/worktrees/**` 可写。

2. 工作者只在自己的工作树内编辑。行为修复先列触发条件、成功与失败路径、对应回归及影响域；复现用例与实现同步交付，纯文案按既有检查验收。`create` 自动锁定工作树，成功集成后解锁；不复制 `.venv`；用 `uv sync --locked --all-extras` 创建自己的测试环境。
3. 测试在当前工作树根目录运行：Windows `& .\scripts\test.ps1`，macOS/Linux `./scripts/test.sh`。默认 `auto` 按改动文件取影响域并集；文档及无改动检查 `checks`，未知影响面、共享测试设施和实际依赖选 `full`。域清单唯一真相在 `scripts/test_runner.py`；局部调试可显式选域。
   两者契约相同：优先当前树 venv，缺失时从 Git common directory 定位主项目 venv，强制 `PYTHONPATH=<当前工作树>/src`，
   核对 `peach.__file__` 后运行标准库 `unittest`。禁止手工拼接 venv 路径或调用 pytest。
   测试入口固定 `PYTHONIOENCODING=utf-8`，覆盖标准输出、错误输出及子进程；其他 Python CLI 使用 `-X utf8`。
   安装依赖和构建完成后再验证；测试期间不改变环境。测试期间静默等待，完成或确需用户处理的阻塞时统一汇报。
   新增或改名测试时，用正式入口定向运行 `test_scripts.OperationalScriptTests.test_every_test_file_is_registered_in_a_scope` 检查登记；测试文件存在不代表 `auto` 会选中。
   用 `-Focus` / `--focus` 先验证相关 Python 或浏览器用例，调试不签记录；冻结改动后只运行一次 `auto`，不另写逐域循环。失败先定向修复，再让 `auto` 复用未受影响的记录；记录有效期、补测与 `-Fresh` 的口径见 `docs/TESTING.md`。
4. `ready` 前将当前 `master` 纳入工作树并运行 `auto`。相同内容可复用记录；目标变化重算影响域。`ready` / `integrate` 拒绝缺记录、范围不足或目标分支未纳入的提交。
5. 协调者接到工作者的 `ready` 后继续完成授权范围内的 `integrate`、适用重启与运行核验；分支交接不等于任务验收完成。`integrate` 在锁内复查并合并固定提交；取得成功退出状态并核对主线提交后才重启。锁忙交给入口等待，禁止直接 merge；提示带持锁方的 pid、开始时间与范围，不反复数进程。运行记录写到仓库外的私有上下文；工作者按文件分工，共享文件安排顺序。
   版本号不在这里动：推进与打标签只走 `scripts/release_tag.py`（`--bump auto --apply` 定版待人确认措辞，`--ship --apply` 提交、推送、等 Test 转绿、打标签，ADR-0012 修订；停在半路就重跑同一条）。
   「该发一版了」只由 `release_due.py` 的 Stop 钩子说，`integrate` 输出的 `release` 是同一判据，收尾不重复。
   CI 分片、系统覆盖与发布复用见 `docs/TESTING.md`；合并完成不机械追加全量。
   主检出 master 上的直接提交与手工 merge 由 `scripts/githooks/` 拒收；它统一入口而非权限隔离，`--no-verify` 等仍可绕过。

## 多分支一起合入
两条以上分支同时待合时，由一个协调会话统一测试与合入：先让各会话停掉自己的 `auto`、`ready`、`integrate` 与重试循环并报最终版尖端。
各自跑全量会轮番占住全量测试锁，`integrate` 等满 30 分钟拿不到锁，满载又让时序用例随机超时；每合一条，其余分支还得重新 rebase、重跑全量。
做法：`create --task integration-batch`，按「无冲突、有冲突、自己的」顺序 `merge --no-ff` 各最终版尖端；`web/dist` 冲突取集成侧、末尾统一 `npm run build`。
源码冲突只在两边主人交代了保留项、能逐项全保留时才解，否则 `merge --abort` 排下一轮由主人 rebase。末提交带整批的 README-Impact，跑一轮 `auto`，再 `ready`、`integrate`。
全站性的尺寸、字号或命名改动（控件高度档、行内图标、分区改名）交付前搜 e2e 里写死的旧值与旧名，并跑全部 e2e，不能只跑定向用例。
改按钮文案或把按钮换成链接时，搜旧文案在测试里的每一处，以及该组件 e2e 里按 `button`、`button:nth-of-type` 取元素的写法。
单条 vitest 超 5 秒、e2e 等待超 30 秒先看 `agent_worktree.py processes` 里有几个 `test_runner`，满载时单跑确认，不在满载下反复全量。

## 暂存与提交
- 每个提交主题写成 `type(scope): 中文描述`，类型清单在 `scripts/commit_subject.py` 的 `TYPES`；写歪的后果是变更日志静默漏条，`ready` / `integrate` 拒收。

- 交付分支最后提交加 `README-Impact: updated; 说明` 或 `README-Impact: none; 原因`；只改一份 README 时另加 `README-Reviewed: 未改文件名; 原因`，细节见 `docs/README_MAINTENANCE.md`。
  它与 `Co-Authored-By` 连续写成末尾同一块：块内隔空行、或块与正文之间不空行，都会被当成正文，报「须有唯一 README-Impact」。

- 每个提交署名 `Co-Authored-By: 工具 (模型 版本) <厂商 noreply>`，如 `Claude Code (Opus 5) <noreply@anthropic.com>`、`Codex (GPT-5.5) <noreply@openai.com>`；
  括号里的模型版本用来事后分辨是哪一代写的。名单在 `scripts/co_author.py` 的 `VENDORS`，`ready` / `integrate` 逐个提交判；接力写成时并列署名，人类共同作者写「姓名 <邮箱>」。

- 禁止 `git add .`、`git add -A`、目录路径或 glob。只暂存任务明确拥有的文件。
- 提交前用 `git diff --cached --name-status` 与任务边界逐条对照。干净的 `git status`
  不能证明归属正确。
- 实现与其测试必须原子提交。反例 `bba0b77`：测试被误判为本任务文件而进入提交，对应
  `probe.py` 未暂存，HEAD 出现「测试指向不存在实现」。

## 工作者禁止事项
自行 merge、执行 `--apply`、把候选标为 `approved`、修改迁移或 ADR、重启生产服务。
这些属于协调者。

## 已知陷阱

- **工作树会悄无声息地失效，目录却还在**：分支被集成后注册消失，目录成了主检出里的旧副本，在里面跑的 git 全作用于主检出的 master，
  得出的是假结论而不是报错。判据只看 `git rev-parse --show-toplevel` 与 `git worktree list` 里有没有你那一行。
- 生产重启只用 `scripts/restart_windows_tray.py`；用 Computer Use 点托盘、强杀或另起 `.venv\Scripts\peach.exe` 会让 `_owned` 失真。
- 落后很久的分支 rebase 到本地 `master` 时只移植仍需要的独有改动：共享文件上旧的那一侧解错冲突，会把已上线的修复回退掉。

## 回收与顶层归置

工作树用完要回收：`python scripts/agent_worktree.py prune` 列出分支已并入 master 且工作区
干净的工作树，加 `--apply` 才真的删。
脏的一律拒收并单独列出：分支已合入不等于工作区
里没东西，实测就有工作树的分支早已并入 master、里面却躺着一份成形的未提交改动。
被 Git 忽略的 `build/` 里还有文件、或者还有进程开在里面（会话、终端、服务）的，也进 `kept`：
2026-10-24 一次回收删掉了一个会话正开着的工作树，`build/` 里的日志和复盘报告没有备份。

一个工作树失败不影响其它工作树：`residue` 是连脚本也删不掉的目录，分支照样删，`holders` 列出占着它的进程（`orphan` 为真是父进程已退出的残留），
按 PID 结束自己起的再重跑；`processes` 子命令列出两处落点下的全部活进程。`failed` 是注册还没摘掉，分支保留。未登记的目录归 `swept`：`peach-worktrees/`
与 `.claude/worktrees/` 两处都扫，只删空的，有文件的进 `kept` 等人确认，因为那种目录和真
工作树长得一模一样，在里面跑 git 全作用于主检出的 master，门槛在 `tests/test_repo_hygiene.py`。

`prune` 保留锁定的活动工作树。不要手动解锁正在编辑的工作树；任务中止时先核对任务归属、
改动与提交，再决定是否解锁回收。

`Desktop\peach` 顶层只放 ADR-0017 定义的四个运行时目录加一个 `attic/`：

    peach-app  peach-data  peach-sync  peach-worktrees  attic

`peach-` 前缀专属那四个，不再新增；别的东西按性质进 `attic/` 的 `builds`／`evidence`／
`instances`／`tools`／`reviews`，目录名写成 `YYYYMMDD-主题`，顶层不放散落文件，
由 `test_repo_hygiene` 守住。这条规则只写在仓库外的 `../attic/README.md` 时，在 peach-app 里
干活的人根本看不到它，清完两天又堆回三个违规目录。 <!-- copy-lint-disable-line -->

`attic/` 不等于可以随便删：`instances/` 常带 100 MB 量级的 ledger 副本，`tools/` 的
`runtime.json` 会留 token。账本副本、复核产物和取证归档按 AGENTS.md 的保留清单对待，
删除要单独确认。
