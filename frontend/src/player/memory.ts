/* 每部视频共用一次读取、按身份串行提交；所有设置保存在字幕清单文件中。 */
import { api } from '@peach/legacy/core';
import type { CaptionStyle } from './subtitle-style';
import type { VjsPlayer } from './types';

export interface PlayerMemoryValue {
  selected: string | null;
  tracks: { key: string; name: string; src: string }[];
  rotation?: number;
  rate?: number;
  volume?: number;
  caption_style?: Partial<CaptionStyle>;
}
export type PlayerMemoryPatch = Partial<Omit<PlayerMemoryValue, 'tracks'>> & {
  track?: { key: string; name: string; text: string };
};
const pending = new Map<string, Promise<unknown>>();
const sessions = new WeakMap<VjsPlayer, PlayerMemory>();

class PlayerMemory {
  private cleanup = new AbortController();
  private disposed = false;
  private reading: Promise<PlayerMemoryValue> | undefined;
  private listeners = new Set<() => void>();
  private restorers = new Set<(value: PlayerMemoryValue) => void>();
  private restored: PlayerMemoryValue | undefined;
  private unsaved: PlayerMemoryPatch = {};
  private url: string;
  error = '';

  constructor(identity: string) {
    this.url = identity ? `/api/player/memory?video=${encodeURIComponent(identity)}` : '';
  }
  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    this.cleanup.abort();
    this.listeners.clear();
    this.restorers.clear();
  }
  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => { this.listeners.delete(listener) };
  }
  private changed() { if (!this.cleanup.signal.aborted) this.listeners.forEach(listener => listener()) }
  restore(apply: (value: PlayerMemoryValue) => void) {
    this.restorers.add(apply);
    if (this.restored) apply(this.restored);
    else void this.load().catch(() => {});
  }
  load() {
    if (!this.url) return Promise.resolve({ selected: null, tracks: [] } as PlayerMemoryValue);
    return this.reading ||= (async () => {
      await pending.get(this.url)?.catch(() => {});
      const value = await api(this.url, { signal: this.cleanup.signal }) as PlayerMemoryValue;
      if (!this.cleanup.signal.aborted) {
        this.restored = value; this.restorers.forEach(apply => apply(value)); this.changed();
      }
      return value;
    })().catch(error => {
      this.reading = undefined;
      if (!this.cleanup.signal.aborted) { this.error = '播放记忆未读取，请重试'; this.changed() }
      throw error;
    });
  }
  save(value: PlayerMemoryPatch) {
    if (!this.url) return Promise.resolve();
    const task = (pending.get(this.url) || Promise.resolve()).catch(() => {}).then(async () => {
      const patch = { ...this.unsaved, ...value,
        ...(value.caption_style ? { caption_style: { ...this.unsaved.caption_style, ...value.caption_style } } : {}) };
      try {
        const response = await fetch(this.url, { method: 'PUT', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(patch), keepalive: !patch.track });
        if (!response.ok) {
          const body = await response.json().catch(() => null);
          throw new Error(body?.error || body?.detail || '播放记忆未保存，请重试');
        }
        this.unsaved = {}; this.error = '';
      } catch (error) {
        this.unsaved = patch;
        this.error = error instanceof Error ? error.message : '播放记忆未保存，请重试';
        throw error;
      } finally { this.changed() }
    });
    pending.set(this.url, task);
    void task.finally(() => { if (pending.get(this.url) === task) pending.delete(this.url) }).catch(() => {});
    return task;
  }
  async retry() {
    try {
      if (Object.keys(this.unsaved).length) await this.save({ ...this.unsaved });
      else { this.reading = undefined; await this.load(); this.error = ''; this.changed() }
    } catch { /* 原位保留原因与重试入口 */ }
  }
}

export function playerMemory(player: VjsPlayer) {
  let memory = sessions.get(player);
  if (!memory) {
    const identity = player.peachPlaybackKey || (player.peachItem?.id ? `item:${player.peachItem.id}` : '');
    memory = new PlayerMemory(identity);
    sessions.set(player, memory);
    player.on('dispose', () => memory!.dispose());
  }
  return memory;
}

const validVolume = (value: unknown): value is number =>
  typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= 1;

export interface VolumeState {
  ready: Promise<void>;
  current(): number;
  set(next: number): void;
  dispose(): void;
}

export interface PlaybackIntent {
  userActed: boolean;
}

export const createPlaybackIntent = (): PlaybackIntent => ({ userActed: false });

function bindVolume(
  video: HTMLVideoElement, memory: PlayerMemory | null, defaultVolume: number, disposed: () => boolean,
): VolumeState {
  let touched = false, restoring: number | undefined, programmatic: number | undefined, stopped = false;
  const apply = (value: number) => {
    if (stopped || disposed() || !validVolume(value)) return;
    programmatic = value;
    if (video.volume === value) return;
    restoring = value; video.volume = value;
  };
  const save = () => {
    if (!memory || stopped || disposed() || !validVolume(video.volume)) return;
    void memory.save({ volume: video.volume }).catch(() => {});
  };
  const onVolumeChange = () => {
    if (restoring !== undefined) {
      const target = restoring; restoring = undefined;
      if (video.volume === target) return;
    }
    touched = true; save();
  };
  apply(validVolume(defaultVolume) ? defaultVolume : 1);
  video.addEventListener('volumechange', onVolumeChange);
  let finishReady = () => {};
  const ready = new Promise<void>(resolve => {
    let settled = false, timedOut = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve();
    };
    finishReady = finish;
    /* 本地记忆接口异常时不能让播放器无限等下去；超时后保留默认音量，迟到的记录也不再覆盖。 */
    const timer = setTimeout(() => { timedOut = true; finish() }, 4_000);
    void (memory?.load() ?? Promise.resolve({ selected: null, tracks: [] } as PlayerMemoryValue)).then(saved => {
      if (!timedOut && !stopped && !disposed()) {
        const changedBeforeLoad = programmatic !== undefined && video.volume !== programmatic;
        if (!touched && !changedBeforeLoad && validVolume(saved.volume)) apply(saved.volume);
      }
      finish();
    }, finish);
  });
  return {
    ready,
    current: () => video.volume,
    set(next: number) {
      touched = true; apply(next);
      if (video.volume === next) save();
    },
    dispose() {
      if (stopped) return;
      stopped = true;
      finishReady();
      video.removeEventListener('volumechange', onVolumeChange);
    },
  };
}

/** 等音量确定后再启动自动播放；用户已经抢先播放或暂停时，以用户操作为准。 */
export function playWhenVolumeReady(
  video: HTMLVideoElement,
  ready: Promise<void>,
  play: () => unknown,
  live: () => boolean = () => true,
  intent: PlaybackIntent = createPlaybackIntent(),
): Promise<void> {
  const onPlay = () => { intent.userActed = true };
  const stopListening = () => video.removeEventListener('play', onPlay);
  video.addEventListener('play', onPlay);
  return ready.then(async () => {
    // 移除监听后再启动自动播放，不能把自己的 play 事件记成用户操作。
    stopListening();
    if (intent.userActed || !live() || !video.paused || video.ended) return;
    await play();
  }).finally(stopListening);
}

/** 音量只在用户调整时写入；恢复同一部视频的音量时不回写。
 *
 *  恢复写入 `video.volume` 会触发一次 `volumechange`，用目标值标记这一次事件并跳过保存；
 *  事件到达前用户又改了音量时当前值与目标值不同，仍按用户调整保存。静音只改 `muted`，
 *  这里读的是 `volume`，不会把静音写成 0。
 *
 *  返回的 `ready` 在默认音量与同片记录之间确定最终值后才解决。自动播放必须等它，
 *  否则记录里是 0 或较低音量时，会先以默认音量出声。 */
export function mountVolumeMemory(player: VjsPlayer, video: HTMLVideoElement, defaultVolume = 1) {
  const memory = playerMemory(player);
  const state = bindVolume(video, memory, defaultVolume, () => player.isDisposed());
  player.on('dispose', state.dispose);
  return state;
}

/** 导览预览没有片源，不读也不写这部片子的播放记忆；音量控件仍可独立工作。 */
export function mountPreviewVolume(video: HTMLVideoElement, defaultVolume = 1) {
  return bindVolume(video, null, defaultVolume, () => false);
}

/** 原生 `<video>` 兜底没有 Video.js 实例，也用同一个身份读写音量记录。
 *  `ready` 在默认值与同片记录之间确定最终值后才解决。 */
export function mountDetachedVolumeMemory(video: HTMLVideoElement, identity: string, defaultVolume = 1) {
  const memory = new PlayerMemory(identity);
  const state = bindVolume(video, memory, defaultVolume, () => false);
  return {
    ...state,
    dispose() {
      state.dispose();
      memory.dispose();
    },
  };
}

/** 倍速只在用户选择时写入；媒体换源后恢复同一部视频的设置。 */
export function mountPlaybackRate(player: VjsPlayer, video: HTMLVideoElement) {
  const memory = playerMemory(player);
  let rate = Number(player.playbackRate()) || 1, touched = false;
  const apply = () => {
    video.defaultPlaybackRate = rate;
    if (Number(player.playbackRate()) !== rate) player.playbackRate(rate);
  };
  memory.restore(saved => {
    if (!touched && !player.isDisposed() && saved.rate !== undefined) { rate = saved.rate; apply() }
  });
  video.addEventListener('loadedmetadata', apply);
  player.on('dispose', () => video.removeEventListener('loadedmetadata', apply));
  return {
    current: () => rate,
    set(next: number) {
      touched = true; rate = next; apply();
      void memory.save({ rate }).catch(() => {});
    },
  };
}
