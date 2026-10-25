<p align="center">
  <img src="resources/peach-logo.png" alt="Peach" width="96">
</p>

<h1 align="center">Peach</h1>

<p align="center">A private video library: local drives, cloud drives and the creators you follow, all in one place.</p>

<p align="center">
  <a href="https://peach.video">Website</a> ·
  <a href="https://peach.video/#download">Download installers</a> ·
  <a href="https://demo.peach.video">Live demo</a> ·
  <a href="https://github.com/peach-mitao/peach/releases/tag/intro-video">Intro video</a> ·
  <a href="https://github.com/peach-mitao/peach/issues">Report a problem</a> ·
  <a href="https://github.com/orgs/peach-mitao/projects/7/views/1">Requests board</a> ·
  <a href="https://github.com/orgs/peach-mitao/projects/7/views/3">Roadmap</a> ·
  <a href="#documentation">Documentation</a> ·
  <a href="README.md">中文</a>
</p>

<p align="center">
  <a href="https://gitgud.io/peach-mitao/peach/-/releases"><img src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fdownloads.peach.video%2Freleases.json&amp;query=%24%5B0%5D.tag_name&amp;label=release" alt="release"></a>
  <a href="https://gitgud.io/peach-mitao/peach/-/pipelines?ref=master"><img src="https://img.shields.io/badge/CI-GitGud-554488?logo=gitlab&amp;logoColor=white" alt="CI pipelines"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-AGPL--3.0--or--later-blue?logo=gnu&amp;logoColor=white" alt="license"></a>
  <a href="docs/TESTING_DESKTOP.md"><img src="https://img.shields.io/badge/Windows-x64-0078D4" alt="Windows x64"></a>
  <a href="docs/OPERATIONS.md#macos-独立测试包"><img src="https://img.shields.io/badge/macOS-DMG-555555?logo=apple&amp;logoColor=white" alt="Build and install the standalone macOS app"></a>
  <img src="https://img.shields.io/badge/18%2B-adult%20content-critical" alt="18+ adult content">
</p>

https://github.com/user-attachments/assets/a5610874-e611-41bb-be22-7d99f0d64b62

> **18+** For adults managing their own adult-content collections. The repository includes a seed of public textual metadata and brand marks, without collection media or user databases. Access to outside sites requires the appropriate accounts and permissions.

## Features

- **Local and cloud together**: browse hard drives and mounted cloud drives, including 115, PikPak and OneDrive, in one library.
- **Pick from the video wall**: drag through a full-screen cover wall and play in place, with versions and parts of the same title grouped together.
- **Player subtitles**: automatically discover matching subtitles beside the video, load subtitle files manually, search SubtitleCat for simplified and traditional Chinese subtitles by video code, then adjust fonts, size, colors and backgrounds. Each video keeps its loaded subtitles and last selection, including turning subtitles off, and restores them when played again. No API key is required; results may include machine translations.
- **Playback options**: rotate the picture in the web player settings. On Windows and macOS, open media with the system default or a detected installed player; Docker and remote devices can use network playback links and M3U playlists. See [External players](docs/EXTERNAL_PLAYERS.md).
- **Bring your existing collection**: read NFO files and posters, then fill missing titles, performers, studios and covers from multiple sources while keeping your edits.
- **Preview while seeking**: reuse Jellyfin Trickplay, Emby/Plex BIF exports, WebVTT, HLS and DASH image previews beside your videos to avoid extracting the same frames again. See [formats and naming](docs/VIDEO_PREVIEWS.md).
- **Reduce repeated scraping**: public textual metadata ships with each version. After scanning, Peach supplements recognized performers and studios with aliases, source IDs and profiles while keeping your edits. See [seed data and updates](docs/SEED.md).
- **Follow across sites**: combine a creator's updates from FANBOX, Patreon, Kemono and other sites, subscribe to creators' videos on Iwara, and group matching posts into one card.
- **Manage tags**: local and online details share controls for adding, renaming and removing tags. Follow management supports merging tags, hiding tags in batches, and blocking or restoring content by tag. Names are preserved as aliases. See [tag management](docs/TAG_MANAGEMENT.md).
- **Find your next watch**: subscribe to performers' new releases, discover titles based on your taste and save them to your want list.
- **Cloud download**: search by video code or paste a magnet link, send it to a library with cloud download support and organize the downloaded video automatically. Channels follow configured libraries and provider capabilities, through CloudDrive2 or a direct PikPak connection.
- **Add JAV from your browser**: detect or select a video code on DMM, MGS, JavDB, MissAV, Jable and other sites, then send it to Peach for cloud download and library ingestion. The [userscript](https://github.com/peach-mitao/peach-userscript) is maintained independently; see [installation and pairing](docs/JAV_BROWSER.md).
- **Taste preferences**: combine viewing, feedback, your library, browser history, bookmarks and follows to understand your preferences. Read history and bookmarks from supported local browsers in one action, or import HTML bookmarks and Chromium Bookmarks JSON. Stop reading a source or remove it when needed. See [taste data sources](docs/TASTE_SOURCES.md).

Watch history, favorites and settings stay on your computer. Scanning leaves original files untouched; manual organization offers a preview and an undo for the last batch. Release codes are recognized even when the file name carries a title; for other naming schemes, add [recognition rules](docs/OPERATIONS.md#配置页) on the configuration page instead of renaming files.

Scanning, cloud downloads and media processing share junk checks. Attachments with sufficient evidence go to the recoverable trash; uncertain items await review. You can restore an item and mark it as “not junk”. See [junk files](docs/OPERATIONS.md#垃圾文件) for processing order and protections.

Scanning, follow updates and new-release metadata collection save their progress and continue unfinished items after the app restarts. When metadata or cover requests take too long, skip the current work, keep completed results, and retry unfinished items afterward. See [task recovery](docs/OPERATIONS.md#长时任务断点续跑) for recovery boundaries.

Upgrades automatically process existing metadata and caches while preserving manual edits. Normal use requires no migration scripts. The app and independently installed userscript offer update notices; page refreshes remain your choice. See [automatic upgrade processing](docs/OPERATIONS.md#升级后的自动处理) for scope and recovery.

System diagnostics generate reports and selected scraping records in the background, with progress and cancellation. Network settings show local and phone connection addresses; standalone desktop deployments can change access scope and the local network name.

First-time setup lets you choose the Peach proxy for metadata requests and dependency downloads. Windows, macOS and Docker distributions include an isolated amane runtime; source and wheel installations prepare Peach's locked version automatically when first needed. If preparation fails, pending items remain available for retry after fixing the network or runtime.

Scanning and collection show video and recognizable JAV counts, with incremental checks for new folders. Traffic estimates use pending work, local caches, deduplicated release codes, and local samples of similar operations. Before starting, you can also review estimated additional disk usage, temporary frame files, and free space on each output drive. Library settings read and save CloudDrive API and data proxies; traffic totals follow each linked folder's connection setting. Proxy protection limits automatic video reads. See [configuration](docs/OPERATIONS.md#配置页) for measurement coverage and estimation limits.

The combined "Send version statistics and error diagnostics (recommended)" option is checked by default. Clear it during installation, first setup or in settings to disable both. Saved opt-out choices are preserved. While enabled, it sends the listed technical fields to Sentry; full logs, diagnostic ZIPs, media details and watch history are excluded. See [remote diagnostics](docs/DIAGNOSTICS.md#可选远程诊断).

Sharing library and taste details is a separate option in the installer and settings, off by default. Review the complete fields and local preview before explicitly consenting to snapshots of works, tags, ratings, viewing summaries and every preference dimension. Each installation can send at most once per UTC week; snapshots without analyzable content wait for data without consuming that opportunity. Account, device and installation identifiers are excluded. Detailed snapshots can still be linked or re-identified, and the receiving service can see the connection IP. See the [diagnostics reference](docs/DIAGNOSTICS.md#馆藏与口味群体研究).

## Screenshots

Try search, filters and profiles in the [read-only demo](https://demo.peach.video). Click a screenshot for the original image.

<table>
  <tr>
    <td width="50%"><a href="https://peach.video/assets/screenshots/home-20261014.png" target="_blank" rel="noopener"><img src="https://peach.video/assets/screenshots/home-20261014.webp" alt="Library filters and video cards" width="600"></a></td>
    <td width="50%"><a href="https://peach.video/assets/screenshots/profile-20261014.png" target="_blank" rel="noopener"><img src="https://peach.video/assets/screenshots/profile-20261014.webp" alt="Performer portrait, profile and videos" width="600"></a></td>
  </tr>
  <tr>
    <td align="center">Library: browse by performer, source and tag</td>
    <td align="center">Performer profile: details, aliases and all videos</td>
  </tr>
  <tr>
    <td><a href="https://peach.video/assets/screenshots/follow-20261014.png" target="_blank" rel="noopener"><img src="https://peach.video/assets/screenshots/follow-20261014.webp" alt="Creator navigation and image updates" width="600"></a></td>
    <td><a href="https://peach.video/assets/screenshots/stats-20261014.png" target="_blank" rel="noopener"><img src="https://peach.video/assets/screenshots/stats-20261014.webp" alt="Library, storage and content statistics" width="600"></a></td>
  </tr>
  <tr>
    <td align="center">Following: creator updates across sites</td>
    <td align="center">Statistics: storage and watch history</td>
  </tr>
  <tr>
    <td colspan="2"><a href="https://peach.video/assets/screenshots/wall-20261014.png" target="_blank" rel="noopener"><img src="https://peach.video/assets/screenshots/wall-20261014-readme.webp" alt="Full-screen video cover wall" width="1200"></a></td>
  </tr>
  <tr>
    <td colspan="2" align="center">Video wall: drag to browse, play in place</td>
  </tr>
</table>

## Download and use

### Windows

1. Download the full installer, `Peach-<version>-windows-x64-setup.exe`, from the [website download section](https://peach.video/#download) and run it. No administrator rights needed. Alternatively, extract the full portable package and run `Peach.exe`.
2. Choose media directories and access permissions on the setup page that opens in your browser.
3. Start scanning, then browse and play in your browser.

The full installer includes media tools for offline installation. The smaller lite installer downloads tools as needed during setup.

Windows and macOS packages include the scraping runtime; users do not need to install uv, Python, or Git. Reinstall Peach if the scraping tools are missing or their version does not match.

Test builds are unsigned. If Windows says “Windows protected your PC”, confirm the file came from this project's Releases, then choose “More info → Run anyway”. See the [Windows guide](docs/TESTING_DESKTOP.md) for installation, updates and troubleshooting.

### Build on macOS

Build a self-contained `.app` and DMG locally on macOS, including FFmpeg, ffprobe, untrunc, cloudflared and the face detection and recognition models. Running it requires neither Homebrew, Python, a source checkout, nor another computer. Complete corresponding media tool sources accompany each release. See [the macOS build guide](docs/OPERATIONS.md#macos-独立测试包).

The release workflow generates separate Apple Silicon (`macos-arm64.dmg`) and Intel (`macos-x86_64.dmg`) test packages. Check the actual assets in the [website download section](https://peach.video/#download) for availability. Check your chip in About This Mac, open the matching image, and drag Peach into Applications. Test packages are not notarized.

### Run from source (Windows, macOS)

Requires Git, uv and Python 3.14 or newer. See [running from source](docs/OPERATIONS.md#从源码运行windowsmacos).

### Docker (VPS / NAS)

See [Docker deployment](docs/DOCKER.md) for setup and supported configurations.

For LAN access on fnOS or another NAS, set Compose's `PEACH_BIND` to the NAS LAN IP; the default accepts connections only from the host. Run `peach token` in the container terminal to view the initial login token. Enter the actual container media path; no specific drive letters are required. See [NAS first run](docs/DOCKER.md#飞牛其他-nas-与局域网访问).

## FAQ

- **Can I connect a NAS over SMB?** Enter `smb://server/share/folder` as a media folder, set credentials separately, and test the connection. SMB sources support scanning, playback, organization and deletion according to the account permissions; see [SMB media sources](docs/SMB.md). Compatibility with a particular NAS requires device testing.

- **Will it change my files?** Scanning and filling in details leave originals untouched. Manual organization renames or moves files; emptying the trash deletes files, and resource-sync cleanup removes empty folders. Each requires confirmation.
- **Which cloud drives work?** Drives mounted as local folders through tools such as CloudDrive2; see [cloud drive mounts](docs/CLOUDDRIVE.md). Cloud download follows the connected provider's reported capabilities, with direct PikPak connections also supported and sign-in tokens stored locally.
- **How do I watch on my phone?** Allow devices on the same network during setup, connect your phone to that network, open the address shown and set an access password.
- **Where is my data?** In the local `peach-data` folder. The Windows build defaults to `%LOCALAPPDATA%\Peach\peach-data`; first-run setup lets you pick another drive. Later, **App & maintenance → Storage** shows usage, cleans caches and old backups, and moves the folder elsewhere; see [storage and moving the data directory](docs/OPERATIONS.md#存储空间与迁移数据目录).

## Reporting problems

Check [user feedback](https://github.com/peach-mitao/peach/issues), or [open an issue](https://github.com/peach-mitao/peach/issues/new/choose) with the version, steps, expected result and actual result. Hide credentials, LAN addresses and full paths in screenshots; do not upload databases or media. Report security issues privately through the [security policy](SECURITY.md).

## Documentation

[Operations](docs/OPERATIONS.md) · [Sourcing](docs/SOURCING.md) · [External players](docs/EXTERNAL_PLAYERS.md) · [Changelog](CHANGELOG.md)

Contributing: [Development guide](AGENTS.md) · [Testing and dependencies](docs/TESTING.md)

## Related projects

Thanks to [amane](https://github.com/sqzw-x/amane), [Gfriends](https://github.com/gfriends/gfriends), [CloudDrive2](https://www.clouddrive2.com/) and others. See the [reuse inventory](docs/REUSE.md) for full credits and details.

## Star History

<a href="https://www.star-history.com/?repos=peach-mitao%2Fpeach&amp;type=date&amp;logscale=&amp;releases=&amp;legend=top-left">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=peach-mitao/peach&amp;type=date&amp;theme=dark&amp;logscale&amp;legend=top-left">
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=peach-mitao/peach&amp;type=date&amp;logscale&amp;legend=top-left">
    <img alt="Peach Star History" src="https://api.star-history.com/svg?repos=peach-mitao/peach&amp;type=date&amp;logscale&amp;legend=top-left">
  </picture>
</a>

## License

[AGPL-3.0-or-later](LICENSE) · Copyright (C) 2026 longmeidao. Third-party components retain their own licenses.
