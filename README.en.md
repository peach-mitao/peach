<p align="center">
  <img src="resources/peach-logo.png" alt="Peach" width="96">
</p>

<h1 align="center">Peach</h1>

<p align="center">A private video library for yourself: local drives, cloud drives and the creators you follow, all in one place.</p>

<p align="center">
  <a href="https://github.com/peach-mitao/peach/releases">Download for Windows</a> ·
  <a href="https://demo.peach.video">Live demo</a> ·
  <a href="https://github.com/peach-mitao/peach/releases/tag/intro-video">Intro video</a> ·
  <a href="https://github.com/peach-mitao/peach/issues">Report a problem</a> ·
  <a href="#documentation">Documentation</a> ·
  <a href="README.md">中文</a>
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

> **18+** For adults managing their own adult-content collections. The repository contains no media or site data. When Peach connects to outside sites it uses your own accounts and access rights.

- **Already-organized videos just work**: scanning reads the NFO files and posters that already sit next to your videos, so nothing needs to be scraped again.
- **Your files stay put**: scanning is read-only and files stay where they are. Renaming or moving only happens when you start it, with a preview first and an undo afterwards.
- **Cloud and local together**: once 115 or PikPak is mounted as a local drive with CloudDrive2, its videos join the same library as your hard drives.
- **Mount status**: media directories are checked periodically. A failed read is checked again before the tray and video page show the affected source and reason. Scans skip NAS recycle bins and system folders.
- **Your data stays on your computer**: watch history, favorites and settings are stored locally. When filling in details, Peach only sends the video code or performer name to source sites. With cloud download, a magnet link goes only to the cloud drive you pick.
- **Company profiles**: studio and agency pages can show company names, foundation dates, brand launch dates, locations and operating relationships when sourced information is available.

## Screenshots

Want to look around before installing? The [live demo](https://demo.peach.video) is a ready-made library where you can try search, performer pages, filters and stats. The demo is read-only, so nothing you do is saved.

<table>
  <tr>
    <td><img src="https://github.com/peach-mitao/peach/releases/download/intro-video/peach-home.jpg" alt="Home"></td>
    <td><img src="https://github.com/peach-mitao/peach/releases/download/intro-video/peach-performer.jpg" alt="Performer page"></td>
  </tr>
  <tr>
    <td align="center">Home: filter by source, length and tags</td>
    <td align="center">Performer page: profile, aliases, links and every video</td>
  </tr>
  <tr>
    <td><img src="https://github.com/peach-mitao/peach/releases/download/intro-video/peach-follow.jpg" alt="Following"></td>
    <td><img src="https://github.com/peach-mitao/peach/releases/download/intro-video/peach-stats.jpg" alt="Statistics"></td>
  </tr>
  <tr>
    <td align="center">Following: one creator's updates from several sites in one feed</td>
    <td align="center">Statistics: where your videos live and how much you have watched</td>
  </tr>
</table>

## What it does

- **Search**: type a few characters and performers, codes and videos show up together.
- **身份分类**：艺人按身份与发行范围分为女优、素人、西方、网黄博主和动画作者；素人须有明确的非职业出演证据，职业女优不归为素人。FC2 与作品题材仅用于作品筛选。名册使用「艺人、卖家、在线」三个并列入口，卖家按来源账号与作品对应。筛选条只显示有内容的分类，资料页在视频数量左侧显示分类与图标。
- **作品计数**：明确分段的同一 FC2 合集计为一个视频，分段文件和出演归属完整保留。已确认合并的身份共用资料与作品，旧资料页地址通往规范身份。
- **西方图片来源**：出演者与网黄博主可选 Babepedia 主图库人像；Tushy 等 Vixen 网络作品以出演者和发行日匹配官方封面，卡片、详情和头像框选共用原图，无法唯一匹配时留待核验。
- **Performer pages**: aliases, birthday and measurements, social accounts and JavDB and MISSAV links on one page, above every video of hers in your library and her photos. You can pick an avatar by drawing a box on any cover.
- **Filling in details**: by video code, Peach fills in titles, performers, studios and high-resolution covers from studio sites, DMM, JavBus, JavDB and others. It only fills empty fields and never overwrites your edits.
- **Playback**: play in the browser and pick up where you left off. Like, rate, save for later, add to a playlist, or "log a climax".
- **New releases**: subscribe on a performer page or by name in follow management, including performers not yet in your library. Peach checks for new titles regularly. Follow creators across sites such as FANBOX, Patreon and Kemono; the same work on different sites appears as one card.
- **JAV intake**: mark a new-release card or followed post as wanted, or enter a video code. Work cards find and deduplicate links from JavDB's resource list and comments, showing attributes, size and date. Add magnets directly to 115 or PikPak, or copy other links. Files scanned into your library are marked as acquired; titles set aside can be searched again.
- **Cloud download**: paste a magnet link in Activity and hand it to 115 or PikPak for offline download; the finished file joins your library on its own. Followed items and your wishlist also have an entry.
- **Find a release**: add your own Prowlarr or Jackett indexer under Media in local configuration, then search by release code in Activity's Cloud download section. Filter by size and prioritize resolution, Chinese subtitles, or uncensored editions; select a candidate and confirm submission.
- **Statistics**: which drive holds what, how much you have watched and which tags dominate, on one page.
- **Appearance**: light or dark, accent color and sidebar order are all yours to set.
- **Any screen**: works in the browser on desktop, tablet and phone.

## Download and use

### Windows

1. Download one of the two packages from [Releases](https://github.com/peach-mitao/peach/releases):
   - Installer `Peach-<version>-windows-x64-setup.exe`: double-click to install. No administrator rights needed; Peach appears in the Start menu and can be uninstalled from Windows Settings.
   - Portable `Peach-<version>-windows-x64.zip`: right-click it, choose "Extract All", then double-click `Peach.exe` inside.
2. Your browser opens the first-run setup page.
3. Pick your media folders and who may access Peach, then start the scan.

The test package is not code-signed yet. If Windows says "Windows protected your PC", make sure the file came from this project's Releases, then choose "More info → Run anyway". Transcoding and thumbnails need FFmpeg; without it you can still browse and play MP4 and WebM. See [Windows test build](docs/TESTING_DESKTOP.md) for how to install it.

On Windows, the tray runs independently. Closing the Codex, Claude, or terminal session that started it keeps Peach running. Peach attempts to recover after an unexpected tray exit, up to three times within five minutes. Choosing “Quit Peach” keeps it closed. Exit reasons and recovery results are recorded in `tray-lifecycle.log` in the logs folder.

### Run from source (Windows, macOS)

You need Git, [uv](https://docs.astral.sh/uv/getting-started/installation/) and Python 3.12 or newer (uv downloads a missing interpreter for you):

```powershell
git clone https://github.com/peach-mitao/peach.git peach-app
cd peach-app
uv sync --locked --python 3.14
& .\.venv\Scripts\peach-tray.exe
```

On macOS, replace the last two lines with `uv sync --locked --python 3.14 --extra macos` and `./.venv/bin/peach-tray`.

LAN access, access passwords, updates and uninstalling are covered in [Operations](docs/OPERATIONS.md).

Open System diagnostics under Configuration → Updates and maintenance to view library health lists, source parsing and cooldowns. `peach doctor` provides the same report; `--json` returns redacted JSON. See [Local diagnostics](docs/OPERATIONS.md#本机诊断) for status and actions.

## FAQ

- **Will it change my files?**
  - Scanning and filling in details never touch the original files.
  - Only three things do:
    - Running an organize job you started: rename or move, with a preview first and an undo for the last batch.
    - Emptying the trash: this really deletes.
    - Confirming a cleanup in resource sync: folders that are already empty on disk are deleted; each source's root folder stays.
- **I already organized my videos with another scraper. Can Peach use that?**
  - Peach reads the Kodi and Jellyfin layout:
    - an `.nfo` named after the video;
    - posters such as `<title>-poster.jpg`.
  - Existing titles, performers, studios and posters show up right away.
- **Which cloud drives are supported?**
  - 115 and PikPak, mounted as local drives with CloudDrive2.
  - For playback, Peach reads them like ordinary folders and does not store your cloud account.
  - For cloud download, the CloudDrive2 API token and the PikPak sign-in token are kept in this computer's credential file.
  - For PikPak, "Sign in with browser" is the recommended way: you sign in inside the window it opens, and Peach never sees your password. Signing in with your account and password also works; the password is saved only if you tick "Save password".
- **How do I watch on my phone?**
  - Choose "devices on the same network" during first-run setup.
  - Connect your phone to the same network and open the address shown on the setup page.
  - Setting an access password is a good idea.
- **Where is my data?**
  - In the `peach-data` folder on your computer.
  - The Windows build keeps it in `%LOCALAPPDATA%\Peach\peach-data` by default.

## Reporting problems

Open an [issue](https://github.com/peach-mitao/peach/issues) with the version, what you did, what you expected and what actually happened, ideally with a screenshot. Before taking screenshots, hide passwords, cookies, LAN addresses and full file paths, and do not upload database files or media. Report security issues privately as described in the [security policy](SECURITY.md).

## Documentation

Using Peach: [Windows test build](docs/TESTING_DESKTOP.md) · [Operations](docs/OPERATIONS.md) · [Sourcing](docs/SOURCING.md) · [Cloud drive mounts](docs/CLOUDDRIVE.md) · [Changelog](CHANGELOG.md)

Contributing: [Development guide](AGENTS.md) · [Architecture](docs/ARCHITECTURE.md) · [Testing and dependencies](docs/TESTING.md) · [Frontend](docs/FRONTEND.md) · [Reuse inventory](docs/REUSE.md) · [README maintenance](docs/README_MAINTENANCE.md) · [Documentation and UI copy](docs/WRITING.md). Verify changes with Windows `& .\scripts\test.ps1` or macOS/Linux `./scripts/test.sh`.

## Related projects

- [amane](https://github.com/sqzw-x/amane): Peach reaches studio sites and other sources through it.
- [Gfriends](https://github.com/gfriends/gfriends): performer avatar collection.
- [CloudDrive2](https://www.clouddrive2.com/): mounts cloud drives as local disks.
- [OpenAver](https://github.com/slive777/OpenAver), [Javinizer-Go](https://github.com/javinizer/javinizer-go), [MetaTube](https://github.com/metatube-community/metatube-sdk-go), [MDCx](https://github.com/sqzw-x/mdcx): Peach learned from their source parsing and recommendation approaches.

The full reuse and credits list is in the [reuse inventory](docs/REUSE.md).

## License

[AGPL-3.0-or-later](LICENSE) · Copyright (C) 2026 longmeidao. Third-party frontend files keep their own licenses. The [dependency manifest](package.json) records versions, and the [vendor script](scripts/vendor_web_dependencies.mjs) records file and license locations in `web/vendor/`.
