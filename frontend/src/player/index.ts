/* 播放器模块（ADR-0031 第 11a 步）：命令式 TypeScript，不进 React 渲染。
 *
 * Video.js 会把 `<video>` 包进自己的 div、在里面插控制条，DOM 归它；React 只给它一块宿主。
 * 舞台播放区与沉浸模式的每一格都在 effect 里调 `mountPlayer(video, options)`，拿回拆掉它的函数。
 *
 * 带状态的几块（宿主、详情播放器槽位、详情流会话、右键菜单）只由舞台岛所在的
 * `peach-react.js` 使用：`peach-ui.js` 也打了一份这个模块，两份各有自己的模块状态；壳那一份
 * 只用控件点击与 `playback.ts` 这两样不带状态的。 */
export type { PlayerHost, PlayerSettings } from './host';
export { configurePlayer } from './host';
export type { PlayerMenuHooks } from './menu';
export { closePlayerMenu, configurePlayerMenu } from './menu';
export { applyAmbientMode, applyTheaterMode, clickPlayerControl } from './controls';
export type { DetailPlayerOptions, MountPlayerOptions, PlayerMedia, PlayerResume } from './detail-player';
export {
  attachPlayerChrome, mountDetailPlayer, mountPlayer, preparePlayerFrame, stopPlayerPanels,
} from './detail-player';
export { disposePlayer } from './dispose';
export type { ImmersePlayerOptions } from './immerse-player';
export { seekVideoBy, toggleVideoPlayback } from './playback';
export { detailPlayer, resizeSoon, setDetailPlayer } from './registry';
export { fmtSpeed, streamSpeedBits } from './stats';
export {
  cancelDetailStream, cancelStreamSession, directStreamSource, newStreamSession, playableStreamSource,
} from './stream';
export type { TelemetryOptions } from './telemetry';
export { wireFollowTelemetry, wireTelemetry } from './telemetry';
export type { PlayerItem, VjsPlayer } from './types';
export { ensureVideojs } from './videojs';
