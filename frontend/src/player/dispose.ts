/* 拆一个 Video.js 实例。详情、小窗与沉浸模式的每一格都走这一条。 */
import type { VjsPlayer } from './types';

/** 拆掉一个播放器：先 pause，再同步调一次 `onpause` 让观看上报停表并把最后一段冲出去（`pause`
 *  事件是排队派发的，等它来时句柄已经摘了），然后摘掉上报句柄，销毁时不会再替这条片子记账。 */
export function disposePlayer(player: VjsPlayer | null): void {
  if (!player || player.isDisposed()) return;
  const video = player.el()?.querySelector('video');
  try { player.pause() } catch { /* 已拆 */ }
  if (video) {
    try { video.onpause?.(new Event('pause')) } catch { /* 上报失败不挡拆除 */ }
    video.onplay = null; video.ontimeupdate = null; video.onpause = null; video.onended = null;
  }
  try { player.dispose() } catch { /* 已拆 */ }
}
