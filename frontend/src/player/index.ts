/* The Playback module: imperative TypeScript, doesn't enter React rendering.
 * Video.js takes over the video host and controls DOM; the stage and immersive effects call mountPlayer and save the cleanup function.
 * Application and React pages share the source graph; host, player slot, stream session, and right-click menu state each exist in only one copy. */
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
export type { SeekPreview } from './seek-preview';
export { createSeekPreview } from './seek-preview';
export { detailPlayer, resizeSoon, setDetailPlayer } from './registry';
export { fmtSpeed, streamSpeedBits } from './stats';
export {
  cancelDetailStream, cancelStreamSession, directStreamSource, newStreamSession, playableStreamSource,
} from './stream';
export type { TelemetryOptions } from './telemetry';
export { wireFollowTelemetry, wireTelemetry } from './telemetry';
export type { PlayerItem, VjsPlayer } from './types';
export { ensureVideojs } from './videojs';
export { mountPreviewPlayer } from './preview-player';
