/* 字幕恢复与用户新选择的先后关系，不依赖浏览器解码器。 */
import { afterEach, describe, expect, it, vi } from 'vitest';
import { SubtitleSession } from '../src/player/subtitle-memory';
import type { VjsPlayer } from '../src/player/types';
import {
  createPlaybackIntent, mountDetachedVolumeMemory, mountPlaybackRate, mountVolumeMemory, playerMemory,
  playWhenVolumeReady,
} from '../src/player/memory';
import { mountPlayerRotation } from '../src/player/rotation';
import { mountCaptionStyle } from '../src/player/subtitle-style';

function mounted(id = 1) {
  const video = document.createElement('video'), events = new EventTarget();
  let volume = 1;
  Object.defineProperty(video, 'volume', {
    configurable: true,
    get: () => volume,
    set: (next: number) => { volume = next },
  });
  const tracks = Object.assign([] as TextTrack[], {
    addEventListener: events.addEventListener.bind(events),
    removeEventListener: events.removeEventListener.bind(events),
  });
  Object.defineProperty(video, 'textTracks', { value: tracks });
  const disposing: (() => void)[] = [];
  const root = document.createElement('div'); root.innerHTML = '<media-container></media-container>';
  let rate = 1;
  const player = { peachItem: { id }, on: (_event: string, callback: () => void) => disposing.push(callback),
    el: () => root, playbackRate: (next?: number) => next === undefined ? rate : (rate = next),
    isDisposed: () => false } as unknown as VjsPlayer;
  return { video, tracks, player,
    add: (id: string) => {
      const track = Object.assign(new EventTarget(), { id, kind: 'subtitles', label: id, language: 'zh', mode: 'disabled' }) as TextTrack;
      tracks.push(track); events.dispatchEvent(new Event('addtrack')); return track;
    }, dispose: () => disposing.forEach(callback => callback()) };
}
afterEach(() => { vi.unstubAllGlobals(); vi.useRealTimers() });

describe('统一播放文件记忆', () => {
  const observer = () => vi.stubGlobal('ResizeObserver', class { observe() {} disconnect() {} });
  const flush = () => new Promise(resolve => setTimeout(resolve, 0));

  it('字幕、旋转、倍速与外观共用一次读取，关闭播放器后由新会话恢复', async () => {
    observer();
    let saved = { selected: 'sidecar:2', tracks: [], rotation: 270, rate: 1.75, caption_style: { size: '150' } };
    const fetcher = vi.fn(async (_url: string, init?: RequestInit) => {
      if (init?.method === 'PUT') saved = { ...saved, ...JSON.parse(String(init.body)) };
      return new Response(JSON.stringify(saved));
    });
    vi.stubGlobal('fetch', fetcher);
    const view = mounted(), memory = playerMemory(view.player);
    const rotation = mountPlayerRotation(view.player, view.video);
    const setRate = mountPlaybackRate(view.player, view.video);
    const cleanup = new AbortController();
    const style = mountCaptionStyle(view.player.el(), view.video, cleanup.signal, memory);
    const subtitles = new SubtitleSession(view.player, view.video);
    await subtitles.ready;
    expect(fetcher).toHaveBeenCalledOnce();
    expect(rotation.angle()).toBe(270); expect(view.player.playbackRate()).toBe(1.75);
    expect(view.video.defaultPlaybackRate).toBe(1.75);
    expect(style.current().size).toBe('150'); expect(view.add('sidecar:2').mode).toBe('showing');
    rotation.set(90); setRate.set(2); style.set('size', '200'); subtitles.select(null);
    view.video.playbackRate = view.video.defaultPlaybackRate;
    view.video.dispatchEvent(new Event('loadedmetadata'));
    expect(setRate.current()).toBe(2); expect(view.video.defaultPlaybackRate).toBe(2);
    await flush(); view.dispose(); cleanup.abort();
    const reopened = mounted();
    const restored = mountPlayerRotation(reopened.player, reopened.video);
    mountPlaybackRate(reopened.player, reopened.video);
    await playerMemory(reopened.player).load(); await flush();
    expect(restored.angle()).toBe(90); expect(reopened.player.playbackRate()).toBe(2);
    expect(saved.selected).toBeNull(); expect(saved.caption_style.size).toBe('200');
    reopened.dispose();
  });

  it('读取期间修改设置，迟到的记录只恢复尚未操作的字段', async () => {
    observer();
    let loaded!: (response: Response) => void;
    const response = new Promise<Response>(resolve => { loaded = resolve });
    const writes: unknown[] = [];
    vi.stubGlobal('fetch', vi.fn(async (_url: string, init?: RequestInit) => {
      if (init?.method === 'PUT') { writes.push(JSON.parse(String(init.body))); return new Response('{}') }
      return response;
    }));
    const view = mounted(), memory = playerMemory(view.player);
    const rotation = mountPlayerRotation(view.player, view.video), rate = mountPlaybackRate(view.player, view.video);
    const cleanup = new AbortController();
    const style = mountCaptionStyle(view.player.el(), view.video, cleanup.signal, memory);
    await Promise.resolve();
    rotation.set(180); rate.set(1.25); style.set('size', '200');
    loaded(new Response(JSON.stringify({ selected: null, tracks: [], rotation: 90, rate: 2,
      caption_style: { size: '150', color: 'yellow' } })));
    await playerMemory(view.player).load(); await flush();
    expect(rotation.angle()).toBe(180); expect(view.player.playbackRate()).toBe(1.25);
    expect(style.current()).toMatchObject({ size: '200', color: 'yellow' });
    expect(writes).toEqual([{ rotation: 180 }, { rate: 1.25 }, { caption_style: { size: '200' } }]);
    view.dispose(); cleanup.abort();
  });

  it('失败的字段可重试，其他设置不会覆盖未保存的值', async () => {
    const writes: unknown[] = [];
    let fail = true;
    vi.stubGlobal('fetch', vi.fn(async (_url: string, init?: RequestInit) => {
      if (init?.method !== 'PUT') return new Response('{"selected":null,"tracks":[]}');
      writes.push(JSON.parse(String(init.body)));
      return fail ? new Response('{"error":"磁盘不可写"}', { status: 503 }) : new Response('{}');
    }));
    const view = mounted(), memory = playerMemory(view.player);
    await expect(memory.save({ rotation: 90 })).rejects.toThrow('磁盘不可写');
    fail = false;
    await memory.save({ rate: 2 });
    expect(writes).toEqual([{ rotation: 90 }, { rotation: 90, rate: 2 }]);
    expect(memory.error).toBe(''); view.dispose();
  });
});

describe('单片音量记忆', () => {
  const flush = () => new Promise(resolve => setTimeout(resolve, 0));

  it('恢复同一部视频的音量，程序恢复不回写，用户调整才保存', async () => {
    const store = new Map<string, { selected: null; tracks: unknown[]; volume?: number }>([
      ['/api/player/memory?video=item%3A1', { selected: null, tracks: [], volume: .35 }],
    ]);
    const puts: { url: string; body: unknown }[] = [];
    vi.stubGlobal('fetch', vi.fn(async (url: string, init?: RequestInit) => {
      if (init?.method === 'PUT') {
        const body = JSON.parse(String(init.body));
        puts.push({ url: String(url), body });
        store.set(String(url), { ...(store.get(String(url)) || { selected: null, tracks: [] }), ...body });
        return new Response('{}');
      }
      return new Response(JSON.stringify(store.get(String(url)) || { selected: null, tracks: [] }));
    }));
    const view = mounted(), memory = mountVolumeMemory(view.player, view.video, .8);
    expect(view.video.volume).toBe(.8);
    await playerMemory(view.player).load(); await flush();
    expect(view.video.volume).toBe(.35); expect(memory.current()).toBe(.35);
    expect(puts).toEqual([]);
    // 恢复写入 volume 后浏览器补发的 volumechange 不应回写。
    view.video.dispatchEvent(new Event('volumechange'));
    expect(puts).toEqual([]);
    // 用户随后主动调整仍应保存。
    view.video.volume = .6; view.video.dispatchEvent(new Event('volumechange'));
    await flush();
    expect(puts).toEqual([{ url: '/api/player/memory?video=item%3A1', body: { volume: .6 } }]);
    // 静音只改 muted，不把当前音量写成 0。
    view.video.muted = true; view.video.dispatchEvent(new Event('volumechange'));
    await flush();
    expect(puts.at(-1)?.body).toEqual({ volume: .6 });
    view.dispose();

    const reopened = mounted();
    mountVolumeMemory(reopened.player, reopened.video, .9);
    await playerMemory(reopened.player).load(); await flush();
    expect(reopened.video.volume).toBe(.6);
    reopened.dispose();

    // 另一部视频没有记录时保留当前音量，不继承 item:1 的值。
    const other = mounted(2);
    mountVolumeMemory(other.player, other.video, .25);
    await playerMemory(other.player).load(); await flush();
    expect(other.video.volume).toBe(.25);
    other.dispose();
  });

  it('用户读取期间主动调音量，迟到的单片记录不能覆盖', async () => {
    let loaded!: (response: Response) => void;
    const response = new Promise<Response>(resolve => { loaded = resolve });
    const writes: unknown[] = [];
    vi.stubGlobal('fetch', vi.fn(async (_url: string, init?: RequestInit) => {
      if (init?.method === 'PUT') { writes.push(JSON.parse(String(init.body))); return new Response('{}') }
      return response;
    }));
    const view = mounted();
    mountVolumeMemory(view.player, view.video, .4);
    expect(view.video.volume).toBe(.4);
    view.video.volume = .7; view.video.dispatchEvent(new Event('volumechange'));
    await flush();
    loaded(new Response(JSON.stringify({ selected: null, tracks: [], volume: .2 })));
    await playerMemory(view.player).load(); await flush();
    expect(view.video.volume).toBe(.7);
    expect(writes).toEqual([{ volume: .7 }]);
    view.dispose();
  });

  it('越界或非有限的音量既不恢复也不保存', async () => {
    const writes: unknown[] = [];
    vi.stubGlobal('fetch', vi.fn(async (_url: string, init?: RequestInit) => {
      if (init?.method === 'PUT') { writes.push(JSON.parse(String(init.body))); return new Response('{}') }
      return new Response(JSON.stringify({ selected: null, tracks: [], volume: 1.5 }));
    }));
    const view = mounted(), memory = mountVolumeMemory(view.player, view.video, .8);
    await playerMemory(view.player).load(); await flush();
    expect(view.video.volume).toBe(.8);
    memory.set(Number.NaN); memory.set(Number.POSITIVE_INFINITY); memory.set(-.1);
    await flush();
    expect(view.video.volume).toBe(.8); expect(writes).toEqual([]);
    view.dispose();
  });

  it('自动播放等待记忆恢复完成；原生兜底也恢复同片音量', async () => {
    let loaded!: (response: Response) => void;
    const response = new Promise<Response>(resolve => { loaded = resolve });
    const writes: unknown[] = [];
    vi.stubGlobal('fetch', vi.fn(async (_url: string, init?: RequestInit) => {
      if (init?.method === 'PUT') { writes.push(JSON.parse(String(init.body))); return new Response('{}') }
      return response;
    }));
    const view = mounted(), volume = mountVolumeMemory(view.player, view.video, 1);
    const started = vi.fn(() => ({ volume: view.video.volume }));
    const playback = playWhenVolumeReady(view.video, volume.ready, started);
    await flush();
    expect(started).not.toHaveBeenCalled();
    loaded(new Response(JSON.stringify({ selected: null, tracks: [], volume: 0 })));
    await playback;
    expect(started).toHaveBeenCalledOnce();
    expect(started.mock.results[0]!.value).toEqual({ volume: 0 });
    expect(writes).toEqual([]);
    view.dispose();

    let nativeLoaded!: (response: Response) => void;
    vi.stubGlobal('fetch', vi.fn(async (_url: string, _init?: RequestInit) => new Promise<Response>(resolve => { nativeLoaded = resolve })));
    const native = document.createElement('video');
    let nativeVolume = 1;
    Object.defineProperty(native, 'volume', {
      configurable: true,
      get: () => nativeVolume,
      set: (next: number) => { nativeVolume = next },
    });
    const detached = mountDetachedVolumeMemory(native, 'item:3', .7);
    expect(native.volume).toBe(.7);
    await flush();
    nativeLoaded(new Response(JSON.stringify({ selected: null, tracks: [], volume: .1 })));
    await detached.ready;
    expect(native.volume).toBe(.1);
    detached.dispose();
  });

  it('等待音量时用户先播放再暂停，迟到恢复不会重新开播', async () => {
    let loaded!: (response: Response) => void;
    vi.stubGlobal('fetch', vi.fn(async () => new Promise<Response>(resolve => { loaded = resolve })));
    const view = mounted(), volume = mountVolumeMemory(view.player, view.video, 1), play = vi.fn();
    const started = playWhenVolumeReady(view.video, volume.ready, play);
    view.video.dispatchEvent(new Event('play'));
    view.video.dispatchEvent(new Event('pause'));
    await flush();
    loaded(new Response(JSON.stringify({ selected: null, tracks: [], volume: .2 })));
    await started;
    expect(play).not.toHaveBeenCalled();
    expect(view.video.volume).toBe(.2);
    view.dispose();
  });

  it('分片源回退直读时，重建的自动播放等待仍记得用户先播放再暂停', async () => {
    let loaded!: (response: Response) => void;
    vi.stubGlobal('fetch', vi.fn(async () => new Promise<Response>(resolve => { loaded = resolve })));
    const view = mounted(), volume = mountVolumeMemory(view.player, view.video, 1), play = vi.fn();
    const intent = createPlaybackIntent();
    const primary = playWhenVolumeReady(view.video, volume.ready, play, () => true, intent);
    view.video.dispatchEvent(new Event('play'));
    view.video.dispatchEvent(new Event('pause'));
    // HLS 出错时会为直读片源再注册一次等待。
    const fallback = playWhenVolumeReady(view.video, volume.ready, play, () => true, intent);
    await flush();
    loaded(new Response(JSON.stringify({ selected: null, tracks: [], volume: .2 })));
    await Promise.all([primary, fallback]);
    expect(play).not.toHaveBeenCalled();
    view.dispose();
  });

  it('四秒内没取回音量时保留默认值，之后迟到的记录不再改写', async () => {
    vi.useFakeTimers();
    let loaded!: (response: Response) => void;
    vi.stubGlobal('fetch', vi.fn(async () => new Promise<Response>(resolve => { loaded = resolve })));
    const view = mounted(), volume = mountVolumeMemory(view.player, view.video, .8);
    expect(view.video.volume).toBe(.8);
    await vi.advanceTimersByTimeAsync(4_000);
    await volume.ready;
    loaded(new Response(JSON.stringify({ selected: null, tracks: [], volume: .1 })));
    await playerMemory(view.player).load();
    expect(view.video.volume).toBe(.8);
    view.dispose();
  });

  it('detached 音量状态释放后，迟到的记录不再改写音量', async () => {
    let loaded!: (response: Response) => void;
    vi.stubGlobal('fetch', vi.fn(async () => new Promise<Response>(resolve => { loaded = resolve })));
    const native = document.createElement('video'), detached = mountDetachedVolumeMemory(native, 'item:4', .6);
    await flush();
    detached.dispose();
    loaded(new Response(JSON.stringify({ selected: null, tracks: [], volume: .1 })));
    await detached.ready;
    await flush();
    expect(native.volume).toBe(.6);
  });
});

describe('每部视频的字幕选择', () => {
  it('登记轨道的选择可通过字幕别名恢复', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ selected: 'sidecar:2', tracks: [] }))));
    const view = mounted(), session = new SubtitleSession(view.player, view.video);
    await session.ready;
    const track = view.add('sidecar:local:stable');
    const node = document.createElement('track'); node.dataset.subtitleAlias = 'sidecar:2';
    Object.defineProperty(node, 'track', { value: track }); view.video.append(node);
    view.video.dispatchEvent(new Event('loadedmetadata'));
    expect(track.mode).toBe('showing');
    view.dispose();
  });

  it('按身份恢复晚到的旁挂轨道，列表顺序不参与选择', async () => {
    const fetcher = vi.fn(async () => new Response(JSON.stringify({ selected: 'sidecar:2', tracks: [] })));
    vi.stubGlobal('fetch', fetcher);
    const view = mounted(), session = new SubtitleSession(view.player, view.video);
    await session.ready;
    const second = view.add('sidecar:2'), first = view.add('sidecar:1');
    expect(second.mode).toBe('showing'); expect(first.mode).toBe('disabled');
    expect(fetcher).toHaveBeenCalledOnce();
    view.dispose();
  });

  it('读取记忆期间选择关闭，迟到的响应和轨道都不能重新开启字幕', async () => {
    let loaded!: (response: Response) => void;
    const response = new Promise<Response>(resolve => { loaded = resolve });
    const writes: unknown[] = [];
    vi.stubGlobal('fetch', vi.fn(async (_url: string, init?: RequestInit) => {
      if (init?.method === 'PUT') { writes.push(JSON.parse(String(init.body))); return new Response('{}') }
      return response;
    }));
    const view = mounted(), session = new SubtitleSession(view.player, view.video);
    await Promise.resolve();
    session.select(null);
    loaded(new Response(JSON.stringify({ selected: 'sidecar:2', tracks: [] })));
    await session.ready;
    const track = view.add('sidecar:2');
    expect(track.mode).toBe('disabled');
    expect(writes).toEqual([{ selected: null }]);
    view.dispose();
  });
});
