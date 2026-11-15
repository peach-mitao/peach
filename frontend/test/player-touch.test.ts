import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { mountVideoTouchGestures } from '../src/player/touch-gestures';

let controller: AbortController;
let now = 0;

beforeEach(() => {
  vi.useFakeTimers();
  now = 0;
  vi.spyOn(performance, 'now').mockImplementation(() => now);
  controller = new AbortController();
});
afterEach(() => {
  controller.abort();
  document.body.replaceChildren();
  vi.useRealTimers(); vi.restoreAllMocks();
});

function advance(ms: number) { now += ms; vi.advanceTimersByTime(ms) }

function mounted(playing = true) {
  const root = document.createElement('div'), video = document.createElement('video');
  root.append(video); document.body.append(root);
  let paused = !playing, time = 100;
  const seeks: number[] = [];
  Object.defineProperties(video, {
    duration: { configurable: true, get: () => 3600 },
    paused: { configurable: true, get: () => paused },
    currentTime: { configurable: true, get: () => time, set: (next: number) => { seeks.push(next); time = next } },
  });
  vi.spyOn(root, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 0, 400, 225));
  const play = vi.spyOn(video, 'play').mockImplementation(async () => { paused = false; video.dispatchEvent(new Event('play')) });
  const pause = vi.spyOn(video, 'pause').mockImplementation(() => { paused = true; video.dispatchEvent(new Event('pause')) });
  const click = vi.fn(); video.addEventListener('click', click);
  const gestures = mountVideoTouchGestures(root, video, controller.signal);
  const feedback = root.querySelector<HTMLElement>('[data-player-gesture-feedback]')!;
  return { root, video, seeks, play, pause, click, gestures, feedback };
}

function pointer(target: EventTarget, type: string, x = 300, y = 100, id = 1, pointerType = 'touch') {
  const event = new PointerEvent(type, { bubbles: true, cancelable: true, pointerId: id, pointerType, clientX: x, clientY: y });
  target.dispatchEvent(event);
  return event;
}

describe('画面触屏手势', () => {
  it('长视频划过四分之一画面定位五分钟，拖动期间不请求跳转，松手消费合成点击', () => {
    const { video, seeks, feedback, click } = mounted();
    pointer(video, 'pointerdown', 100);
    expect(pointer(video, 'pointermove', 200).defaultPrevented).toBe(true);
    expect(seeks).toEqual([]);
    expect(feedback.hidden).toBe(false);
    pointer(video, 'pointerup', 200);
    expect(seeks).toEqual([400]);
    expect(feedback.hidden).toBe(true);
    video.click(); expect(click).not.toHaveBeenCalled();
    pointer(video, 'pointerdown'); pointer(video, 'pointerup');
    video.click(); expect(click).toHaveBeenCalledOnce();
  });

  it('向左拖动夹在可定位范围内，短片按整片时长换算', () => {
    const { video, seeks } = mounted();
    Object.defineProperty(video, 'seekable', { get: () => ({ length: 1, start: () => 20, end: () => 600 }) });
    pointer(video, 'pointerdown', 300); pointer(video, 'pointermove', 100); pointer(video, 'pointerup', 100);
    expect(seeks).toEqual([20]);
    Object.defineProperty(video, 'duration', { get: () => 100 });
    pointer(video, 'pointerdown', 100); pointer(video, 'pointermove', 200); pointer(video, 'pointerup', 200);
    expect(seeks.at(-1)).toBe(45);
  });

  it.each([1.5, 3])('右侧按住临时至少二倍速，松开恢复 %s 倍且不改默认倍速', rate => {
    const { video, pause, feedback } = mounted();
    video.playbackRate = rate; video.defaultPlaybackRate = rate;
    pointer(video, 'pointerdown'); advance(499);
    expect(video.playbackRate).toBe(rate);
    advance(1); expect(video.playbackRate).toBe(Math.max(2, rate));
    expect(feedback.hidden).toBe(false);
    pointer(video, 'pointerup');
    expect(video.playbackRate).toBe(rate);
    expect(video.defaultPlaybackRate).toBe(rate);
    expect(pause).not.toHaveBeenCalled();
  });

  it.each([true, false])('左侧按住预览回退位置，松手定位并恢复原播放状态：播放中=%s', playing => {
    const { video, seeks, play, pause, feedback } = mounted(playing);
    pointer(video, 'pointerdown', 100); advance(500); advance(2000);
    expect(video.paused).toBe(true);
    expect(seeks).toEqual([]);
    expect(feedback.hidden).toBe(false);
    pointer(video, 'pointerup', 100);
    expect(seeks).toEqual([96]);
    expect(pause).toHaveBeenCalledTimes(playing ? 1 : 0);
    expect(play).toHaveBeenCalledTimes(playing ? 1 : 0);
    expect(video.paused).toBe(!playing);
  });

  it.each(['pointercancel', 'blur', 'resize', 'fullscreenchange', 'loadstart', 'pause', 'abort'])('%s 结束临时倍速，后续松手不跳转或切播放', event => {
    const { video, seeks, feedback, click } = mounted();
    video.playbackRate = 1.5;
    pointer(video, 'pointerdown'); advance(500);
    if (event === 'pointercancel') pointer(video, event);
    else if (event === 'abort') controller.abort();
    else (event === 'fullscreenchange' ? document : ['loadstart', 'pause'].includes(event) ? video : window).dispatchEvent(new Event(event));
    expect(video.playbackRate).toBe(1.5);
    expect(feedback.hidden).toBe(true);
    pointer(video, 'pointerup'); advance(1000);
    expect(seeks).toEqual([]);
    expect(click).not.toHaveBeenCalled();
  });

  it('回退预览取消不跳转，切源取消也不发起旧片的播放请求', () => {
    const { video, seeks, play, gestures } = mounted();
    pointer(video, 'pointerdown', 100); advance(500); advance(2000);
    gestures.cancel(); pointer(video, 'pointerup', 100);
    expect(seeks).toEqual([]);
    expect(play).not.toHaveBeenCalled();
  });

  it('多指触摸取消手势，所有手指抬起前不能重新长按', () => {
    const { video, seeks } = mounted();
    pointer(video, 'pointerdown'); advance(500);
    pointer(video, 'pointerdown', 100, 100, 2);
    expect(video.playbackRate).toBe(1);
    pointer(video, 'pointerdown', 300, 100, 3); advance(1000);
    expect(video.playbackRate).toBe(1);
    for (const id of [1, 2, 3]) pointer(video, 'pointerup', 300, 100, id);
    expect(seeks).toEqual([]);
    pointer(video, 'pointerdown'); advance(500);
    expect(video.playbackRate).toBe(2);
  });

  it('纵向滚动、控件和鼠标操作不触发画面定位或长按', () => {
    const { root, video, seeks, feedback } = mounted();
    pointer(video, 'pointerdown');
    expect(pointer(video, 'pointermove', 302, 140).defaultPrevented).toBe(false);
    advance(1000); pointer(video, 'pointerup', 302, 140);
    const button = document.createElement('button'); root.append(button);
    pointer(button, 'pointerdown'); advance(1000); pointer(button, 'pointerup');
    pointer(video, 'pointerdown', 300, 100, 2, 'mouse'); advance(1000);
    expect(video.playbackRate).toBe(1);
    expect(seeks).toEqual([]); expect(feedback.hidden).toBe(true);
  });

  it('暂停时右侧长按不会变成播放点击，未知时长不写入无效定位', () => {
    const { video, click, seeks } = mounted(false);
    pointer(video, 'pointerdown'); advance(500); pointer(video, 'pointerup'); video.click();
    expect(click).not.toHaveBeenCalled();
    Object.defineProperty(video, 'duration', { get: () => Infinity });
    pointer(video, 'pointerdown', 100); advance(500); pointer(video, 'pointerup', 100);
    pointer(video, 'pointerdown', 100); pointer(video, 'pointermove', 200); pointer(video, 'pointerup', 200);
    expect(seeks).toEqual([]);
  });
});
