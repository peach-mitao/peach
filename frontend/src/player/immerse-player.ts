/* 沉浸模式每一格的播放器：只留媒体本身。进度条、加载提示与动作键都由沉浸岛自己画，所以 Video.js
 * 挂成裸的一层，没有控件条、海报、转圈与错误层。
 *
 * 片源与详情同一个判据（`playableStreamSource`），要转码分片的片子只有 Video.js 播得了；分片出错
 * 退回直读，和详情播放器同一个兜底。每格一个流会话，由调用方建好传进来：拆这一格时按会话取消，
 * 离开页面时调用方也按它取消。 */
import { disposePlayer } from './dispose';
import { cancelStreamSession, directStreamSource, playableStreamSource } from './stream';
import { stopTelemetry, wireTelemetry } from './telemetry';
import type { PlayerItem, VjsPlayer } from './types';
import { ensureVideojs } from './videojs';
import { mountPlayerSubtitles } from './controls';
import { playbackKey } from './progress';
import { SubtitleSession } from './subtitle-memory';
import { mountCaptionStyle } from './subtitle-style';
import { mountDetachedVolumeMemory, mountPlaybackRate, mountVolumeMemory, playerMemory } from './memory';
import { mountPlayerRotation } from './rotation';

export interface ImmersePlayerOptions {
  kind: 'immerse';
  item: PlayerItem;
  /** 这一格的流会话（`newStreamSession()`）。 */
  session: string;
  /** 这台浏览器新开一格时的默认音量，范围 0–1。 */
  defaultVolume?: number;
  /** 放完之后（沉浸模式接着放下一条）。 */
  onEnded?: () => void;
  /** 片源已经交给 video 且音量已经确定：调用方从这一刻起等它可以出画。拆得更快时不回调。 */
  onLoaded?: () => void;
}

const BARE = {
  controls: false, preload: 'auto', posterImage: false, titleBar: false, textTrackDisplay: false, loadingSpinner: false,
  bigPlayButton: false, controlBar: false, errorDisplay: false, textTrackSettings: false,
};

export function mountImmersePlayer(video: HTMLVideoElement, options: ImmersePlayerOptions): () => void {
  const { item, session } = options;
  const defaultVolume = options.defaultVolume ?? 1;
  let player: VjsPlayer | null = null, released = false;
  void Promise.all([playableStreamSource(item, session), ensureVideojs().catch(() => null)]).then(async ([source, vjs]) => {
    if (released) return;
    const direct = directStreamSource(item, session);
    const segmented = String(source.type || '').includes('mpegurl');
    let volumeReady: Promise<void>;
    // 播放器脚本拉不到时退回原生 video；原生元素播不了分片，只能直读。
    if (!vjs) {
      const volume = mountDetachedVolumeMemory(video, playbackKey('item', item), defaultVolume);
      video.src = (segmented ? direct : source).src;
      video.addEventListener('emptied', volume.dispose, { once: true });
      volumeReady = volume.ready;
    }
    else {
      const mounted = vjs(video, BARE);
      player = mounted;
      mounted.peachItem = item;
      mounted.peachPlaybackKey = playbackKey('item', item);
      const captions = new AbortController();
      mountCaptionStyle(mounted.el(), video, captions.signal, playerMemory(mounted));
      mountPlayerRotation(mounted, video);
      mountPlaybackRate(mounted, video);
      const volume = mountVolumeMemory(mounted, video, defaultVolume);
      mounted.on('dispose', () => { captions.abort(); volume.dispose() });
      new SubtitleSession(mounted, video);
      mountPlayerSubtitles(mounted, item.id);
      if (segmented) mounted.one('error', () => { if (!released) mounted.src(direct) });
      mounted.src(source);
      volumeReady = volume.ready;
    }
    wireTelemetry(item, video, options.onEnded ? { onEnded: options.onEnded } : {});
    await volumeReady;
    if (released || player?.isDisposed()) return;
    options.onLoaded?.();
  });
  return () => {
    if (released) return;
    released = true;
    cancelStreamSession(session);
    if (player) disposePlayer(player);
    else { video.pause(); stopTelemetry(video); video.removeAttribute('src'); video.load() }
  };
}
