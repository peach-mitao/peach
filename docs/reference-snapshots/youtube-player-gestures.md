# 播放器手势参考

取证日期：2026-11-28。来源：[YouTube Help：播放速度与快进快退](https://support.google.com/youtube/answer/7509567?co=GENIE.Platform%3DAndroid&hl=en)。
通过网页读取与 HTTP 下载核对官方帮助；下载响应 SHA-256 为 `a4b3a6388df9b05f9669a0a37443a34d14958204537674cdbdf37839ec9217a5`。
横滑另参照 [mpv-android 手势源码](https://github.com/mpv-android/mpv-android/blob/master/app/src/main/java/is/xyz/mpv/TouchGestures.kt) 与 [VLC Android 设置说明](https://docs.videolan.me/vlc-android-user/more/settings/extra_video.html)。
2026-11-28 下载的上游原文 SHA-256 分别为 `40b4a6984c8c8f73254f358e7796be56a049c6b70f575d9c3ca8a374c76dc989` 与 `031e65560e43bee8c74791f18526c010fbf00becc70b3c307bc3ed9fe47b0356`。
这是人工取证笔记，不登记进 `docs/reference-sources.json`，不作为可覆盖的上游快照；来源为动态 HTML，不是可变 Markdown。

## 证据与范围

- **实测（文档读取）**：官方帮助描述左右双击分别后退、前进十秒，按住画面任意位置临时以两倍速播放，松手结束。
- **实测（源码与文档读取）**：mpv-android 将横滑位移映射为跳转时间，一次整屏横滑对应 150 秒。VLC Android 提供普通与快速拖动，提示更快跳转会降低精度。
- **未取得**：YouTube 原生客户端运行取证、手势实现源码与动画参数。本文不声称复刻其内部实现或完整交互。
- **推导（Peach 实现）**：复用原生 `currentTime`、`playbackRate` 与现有 Pointer Events；左右双击保持默认十秒，任意位置长按共用临时倍速，释放或取消后恢复之前的速度。横滑按屏宽归一化，整屏范围约取片长的 10%，短片至少两档、上限 150 秒且不超过片长；短滑使用 1.5 次方缓增曲线，再量化为可配置步长。比例和曲线是 Peach 的设计决定，不是其他播放器的原样参数。

## Peach 的差异

Peach 保留可配置步长、区域与长按倍速；已有更高倍速不会被长按降低。
用户请求的横滑默认以十五秒为一档属于 Peach 扩展，不是上述 YouTube 文档中的行为。
舞台播放器横滑按距离预览一个或多个步长，松手定位；进度条仍用于任意位置定位。
沉浸模式已有任意位置长按倍速，本次保持其按内容坐标拖动进度的实现。
本次不修改桌面双击全屏、全屏竖滑音量或控件上的原生操作。
