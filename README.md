<p align="center">
  <img src="resources/peach-logo.png" alt="Peach" width="96">
</p>

<h1 align="center">Peach</h1>

<p align="center">给自己用的私人影片馆藏：本地硬盘、网盘和关注的创作者，放在一个地方看。</p>

<p align="center">
  <a href="https://github.com/peach-mitao/peach/releases">下载 Windows 版</a> ·
  <a href="https://demo.peach.video">在线演示</a> ·
  <a href="https://github.com/peach-mitao/peach/releases/tag/intro-video">介绍视频</a> ·
  <a href="https://github.com/peach-mitao/peach/issues">问题反馈</a> ·
  <a href="#文档">文档</a> ·
  <a href="README.en.md">English</a>
</p>

<p align="center">
  <a href="https://github.com/peach-mitao/peach/actions/workflows/test.yml"><img src="https://img.shields.io/github/actions/workflow/status/peach-mitao/peach/test.yml?branch=master&amp;label=tests&amp;logo=githubactions&amp;logoColor=white" alt="tests"></a>
  <a href="https://github.com/peach-mitao/peach/releases"><img src="https://img.shields.io/github/v/release/peach-mitao/peach?include_prereleases&amp;label=release&amp;logo=github&amp;logoColor=white" alt="release"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-AGPL--3.0--or--later-blue?logo=gnu&amp;logoColor=white" alt="license"></a>
  <img src="https://img.shields.io/badge/python-3.12%2B-3776AB?logo=python&logoColor=white" alt="Python 3.12+">
  <img src="https://img.shields.io/badge/platform-Windows-0078D4?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0id2hpdGUiPjxwYXRoIGQ9Ik0xIDFoMTB2MTBIMXptMTIgMGgxMHYxMEgxM3pNMSAxM2gxMHYxMEgxem0xMiAwaDEwdjEwSDEzeiIvPjwvc3ZnPg%3D%3D" alt="Windows">
  <img src="https://img.shields.io/badge/platform-macOS-555555?logo=apple&amp;logoColor=white" alt="macOS">
  <img src="https://img.shields.io/badge/18%2B-adult%20content-critical?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIj48cGF0aCBkPSJNMTIgMiAzIDZ2NmMwIDUgOSAxMCA5IDEwczktNSA5LTEwVjZ6TTEyIDd2Nm0wIDN2MSIvPjwvc3ZnPg%3D%3D" alt="18+ adult content">
</p>

https://github.com/user-attachments/assets/a5610874-e611-41bb-be22-7d99f0d64b62

> **18+** 仅供成年人管理自己的成人内容馆藏。仓库不含任何媒体或站点数据；连接外部站点时用的是你自己的账号和访问权。

- **整理过的片子直接用**：扫描时读取片子旁边已有的 NFO 和海报，不用重新刮削。
- **不动你的文件**：扫描只读，文件留在原处；改名、移动由你手动发起，先看预览，做完可以撤回。
- **网盘和本地一起看**：115、PikPak 用 CloudDrive2 挂载成本地磁盘后，和硬盘里的片子进同一个馆藏。
- **挂载状态**：定期检查媒体目录；读取失败会复查，确认后在托盘和作品页说明来源及原因。扫描跳过 NAS 回收站与系统目录。
- **数据留在自己电脑上**：观看记录、收藏和设置都存在本机；补资料时只向来源站点发送番号或女优名；用云下载时，磁力只交给你选的网盘。

## 截图

不想先装？[在线演示](https://demo.peach.video) 里是一份现成的馆藏，搜索、女优页、筛选和统计都能直接点；演示站只读，操作不会保存。

<table>
  <tr>
    <td><img src="https://github.com/peach-mitao/peach/releases/download/intro-video/peach-home.jpg" alt="首页"></td>
    <td><img src="https://github.com/peach-mitao/peach/releases/download/intro-video/peach-performer.jpg" alt="女优页"></td>
  </tr>
  <tr>
    <td align="center">首页：按来源、时长、标签筛选</td>
    <td align="center">女优页：资料、别名、外部链接和全部作品</td>
  </tr>
  <tr>
    <td><img src="https://github.com/peach-mitao/peach/releases/download/intro-video/peach-follow.jpg" alt="关注"></td>
    <td><img src="https://github.com/peach-mitao/peach/releases/download/intro-video/peach-stats.jpg" alt="统计"></td>
  </tr>
  <tr>
    <td align="center">关注：一个创作者在多个站点的更新汇到一起</td>
    <td align="center">统计：片子存在哪、看了多少</td>
  </tr>
</table>

## 能做什么

- **搜索**：输入几个字，女优、番号和影片一起出来。
- **身份分类**：艺人可同属女优、素人、西方；素人分类依据 FC2 出演记录，作品题材标签仅用于作品筛选。真人账号归入艺人的网黄博主分类，卖家与动画作者另列。筛选条只显示有内容的分类，资料页在视频数量左侧显示分类与图标。
- **作品计数**：明确分段的同一 FC2 合集计为一个视频，分段文件和出演归属完整保留。已确认合并的身份共用资料与作品，旧资料页地址通往规范身份。
- **西方图片来源**：出演者与网黄博主可选 Babepedia 主图库人像；Tushy 等 Vixen 网络作品以出演者和发行日匹配官方封面，卡片、详情和头像框选共用原图，无法唯一匹配时留待核验。
- **女优页**：别名、生日身材、社媒和 JavDB、MISSAV 链接汇在一页，下面是她在你馆藏里的全部作品和照片；头像可以直接在作品封面上框一块。
- **补资料**：按番号从片商官网、DMM、JavBus、JavDB 等站点补标题、女优、厂牌和高清封面；只填空着的，不覆盖你改过的。
- **播放**：在浏览器里直接播放，记下看到哪；可以点喜欢、打分、稍后看、加进播放列表，也能「记一次高潮」。
- **追新作**：在女优页打开订阅，或在关注管理里按名字订阅，馆藏中尚未收录的女优也可订阅。Peach 会定期检查新作；创作者可跨 FANBOX、Patreon、Kemono 等站点关注，不同站点的同一作品合成一张卡。
- **JAV 入库**：在新作卡或关注内容上点「想要」，也可以直接输入番号。作品卡自动查找 JavDB 资源区与评论中的链接，合并重复资源，显示属性、大小和日期；磁链可以直接添加到 115 或 PikPak，其他链接可以复制。文件扫进馆藏后自动标为已入库，久找不到的老片可重新查找。
- **云下载**：在活动页贴一条磁力，交给 115 或 PikPak 离线下载，下载完自动入库；关注条目和想要清单也有入口。
- **按番号找资源**：在本机配置页「媒体」里添加自己的 Prowlarr 或 Jackett 索引器，在活动页「云下载」按番号搜索。可按体积筛选，优先找高清、中字或无码；选中候选后确认提交。
- **统计**：片子存在哪块盘、看过多少、标签分布，一页看完。
- **外观**：深色浅色、主题色、侧栏顺序都能自己调。
- **多端**：电脑、平板、手机的浏览器都能用。

## 下载与使用

### Windows

1. 从 [Releases](https://github.com/peach-mitao/peach/releases) 下载其中一种：
   - 安装包 `Peach-<版本>-windows-x64-setup.exe`：双击安装，不需要管理员权限，开始菜单里有 Peach，可以在系统设置里卸载。
   - 免安装包 `Peach-<版本>-windows-x64.zip`：右键「全部解压」，双击里面的 `Peach.exe`。
2. 浏览器会打开首次设置页。
3. 选好媒体文件夹和谁能访问，开始扫描。

测试包还没有代码签名。Windows 提示「已保护你的电脑」时，确认文件来自本项目的 Release，再点「更多信息 → 仍要运行」。转码和缩略图要用到 FFmpeg，没装也能浏览和播放 MP4、WebM，安装方法见 [Windows 测试版](docs/TESTING_DESKTOP.md)。

Windows 托盘异常退出后会自动尝试恢复；5 分钟内最多恢复 3 次。主动选择「退出 Peach」会保持关闭。退出原因和恢复结果可在日志目录的 `tray-lifecycle.log` 中查看。

### 从源码运行（Windows、macOS）

需要 Git、[uv](https://docs.astral.sh/uv/getting-started/installation/) 和 Python 3.12 或更高（uv 会自动下载缺的解释器）：

```powershell
git clone https://github.com/peach-mitao/peach.git peach-app
cd peach-app
uv sync --locked --python 3.14
& .\.venv\Scripts\peach-tray.exe
```

macOS 把后两条换成 `uv sync --locked --python 3.14 --extra macos` 和 `./.venv/bin/peach-tray`。

局域网访问、访问密码、更新和卸载见 [运行与配置](docs/OPERATIONS.md)。

在配置页「更新与维护」打开系统诊断，可查看库健康清单、来源解析与冷却状态。运行 `peach doctor` 可取得同一份报告；`--json` 输出脱敏 JSON。状态与处理方式见 [本机诊断](docs/OPERATIONS.md#本机诊断)。

## 常见问题

- **会改我的文件吗？**
  - 扫描、补资料都不碰原文件。
  - 只有三件事会动文件：
    - 你在整理里点了执行：改名或移动，先给预览，可以撤回上一批。
    - 你清空回收站：真的删除。
    - 你在资源同步里确认清理：删除盘上已经空了的文件夹，来源的根目录保留。
- **之前用别的刮削器整理过，能直接用吗？**
  - 能读的是 Kodi、Jellyfin 那种格式：
    - 和视频同名的 `.nfo`；
    - `<片名>-poster.jpg` 这样的海报。
  - 已有的标题、女优、厂牌和海报会直接显示。
- **支持哪些网盘？**
  - 支持通过 CloudDrive2 挂载的 115 和 PikPak。
  - 看片时 Peach 只把它当普通文件夹读，不保存网盘账号。
  - 用云下载时，CloudDrive2 的 API 令牌和 PikPak 的登录令牌存在这台电脑的凭据文件里。
  - PikPak 推荐点「用浏览器登录」，在弹出的窗口里登录，Peach 不经手密码；也可以用账号密码登录，密码只在你勾选「保存密码」时保存。
- **手机上怎么看？**
  - 首次设置时选「同一局域网的设备」。
  - 手机和电脑连同一个网络，用浏览器打开设置页给出的地址。
  - 建议顺手设一个访问密码。
- **数据存在哪？**
  - 都在本机的 `peach-data` 文件夹里。
  - Windows 版默认在 `%LOCALAPPDATA%\Peach\peach-data`。

## 问题反馈

在 [Issues](https://github.com/peach-mitao/peach/issues) 里写清楚版本号、做了什么、想要的结果和实际看到的结果，最好附截图。截图前遮掉密码、Cookie、局域网地址和文件完整路径，不要上传数据库文件或媒体。安全问题请按 [安全政策](SECURITY.md) 私下报告。

## 文档

使用：[Windows 测试版](docs/TESTING_DESKTOP.md) · [运行与配置](docs/OPERATIONS.md) · [来源采集](docs/SOURCING.md) · [网盘挂载](docs/CLOUDDRIVE.md) · [变更日志](CHANGELOG.md)

参与开发：[开发约定](AGENTS.md) · [总体架构](docs/ARCHITECTURE.md) · [测试与依赖](docs/TESTING.md) · [前端开发](docs/FRONTEND.md) · [复用清单](docs/REUSE.md) · [README 维护](docs/README_MAINTENANCE.md) · [文档与界面文案](docs/WRITING.md)。改完用 Windows `& .\scripts\test.ps1` 或 macOS/Linux `./scripts/test.sh` 验证。

## 相关项目

- [amane](https://github.com/sqzw-x/amane)：Peach 通过它接入片商官网等来源。
- [Gfriends](https://github.com/gfriends/gfriends)：女优头像图库。
- [CloudDrive2](https://www.clouddrive2.com/)：把网盘挂载成本地磁盘。
- [OpenAver](https://github.com/slive777/OpenAver)、[Javinizer-Go](https://github.com/javinizer/javinizer-go)、[MetaTube](https://github.com/metatube-community/metatube-sdk-go)、[MDCx](https://github.com/sqzw-x/mdcx)：Peach 参考过它们的来源解析和推荐做法。

各项目的复用位置与取舍见 [复用清单](docs/REUSE.md)。

## 许可证

[AGPL-3.0-or-later](LICENSE) · Copyright (C) 2026 longmeidao。第三方前端文件保留各自的许可证；[依赖清单](package.json) 登记版本，[生成脚本](scripts/vendor_web_dependencies.mjs) 登记 `web/vendor/` 中的文件与许可证位置。
