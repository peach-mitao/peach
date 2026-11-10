/* 画面区手势（`src/player/gestures.ts`）：长按三倍速与水平滑动调进度。
 *
 * 这里只看手势自身的判定与倍速恢复：两处接入（舞台的 `attachPlayerChrome`、沉浸的
 * `immerse-island.tsx`）与真 Video.js 由 `react/immerse.test.tsx` 和 e2e 在浏览器里走。 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import {
  HOLD_RATE, LONG_PRESS_MS,
  mountBarScrub, mountHoldSpeed, mountSwipeSeek, holdSpeedOf, scrubRatio,
} from '../src/player/gestures';
import { lockScreenLandscape } from '../src/player/orientation';

function fakeRate(initial = 1) {
  let rate = initial;
  return {
    media: { rate: () => rate, setRate: (next: number) => { rate = next } },
    current: () => rate,
  };
}

const press = (el: Element, init: PointerEventInit = {}) => el.dispatchEvent(new PointerEvent('pointerdown', {
  bubbles: true, cancelable: true, button: 0, isPrimary: true, pointerType: 'mouse', clientX: 10, clientY: 10, ...init,
}));
const move = (el: Element, x: number, y: number) => el.dispatchEvent(new PointerEvent('pointermove', {
  bubbles: true, cancelable: true, button: 0, isPrimary: true, clientX: x, clientY: y,
}));
const release = (el: Element) => el.dispatchEvent(new PointerEvent('pointerup', {
  bubbles: true, cancelable: true, button: 0, isPrimary: true,
}));
const contextmenu = (el: Element) => {
  const event = new MouseEvent('contextmenu', { bubbles: true, cancelable: true });
  el.dispatchEvent(event);
  return event;
};
const click = (el: Element) => el.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));

let surface: HTMLElement;
beforeEach(() => {
  vi.useFakeTimers();
  surface = document.createElement('div');
  Object.defineProperty(surface, 'clientWidth', { configurable: true, value: 1000 });
  // 挂进文档：手势的移动与松手听在 window 上，游离节点的事件冒泡不到那里。
  document.body.append(surface);
});
afterEach(() => {
  vi.useRealTimers();
  document.body.innerHTML = '';
});

describe('长按三倍速', () => {
  it('按住满 500ms 进 3 倍速，松手恢复按下前的速度', () => {
    const rate = fakeRate(1.5);
    const hint = vi.fn();
    mountHoldSpeed(surface, () => rate.media, { hint });
    press(surface);
    vi.advanceTimersByTime(LONG_PRESS_MS - 1);
    expect(rate.current()).toBe(1.5);
    vi.advanceTimersByTime(1);
    expect(rate.current()).toBe(HOLD_RATE);
    expect(hint).toHaveBeenCalledWith(true);
    release(surface);
    expect(rate.current()).toBe(1.5);
    expect(hint).toHaveBeenCalledWith(false);
  });

  it('提前松手或位移超限都不触发；触发后位移超限也恢复原速', () => {
    const early = fakeRate(2);
    const earlyStop = mountHoldSpeed(surface, () => early.media);
    press(surface);
    vi.advanceTimersByTime(LONG_PRESS_MS - 10);
    release(surface);
    vi.advanceTimersByTime(20);
    expect(early.current()).toBe(2);
    earlyStop.dispose();

    const drifted = fakeRate(2);
    const driftedStop = mountHoldSpeed(surface, () => drifted.media);
    press(surface);
    move(surface, 40, 10);
    vi.advanceTimersByTime(LONG_PRESS_MS + 10);
    expect(drifted.current()).toBe(2);
    driftedStop.dispose();

    const shaken = fakeRate(2);
    const shakenStop = mountHoldSpeed(surface, () => shaken.media);
    press(surface);
    vi.advanceTimersByTime(LONG_PRESS_MS);
    expect(shaken.current()).toBe(HOLD_RATE);
    move(surface, 40, 10);
    expect(shaken.current()).toBe(2);
    shakenStop.dispose();
  });

  it('手势收尾只吞紧随其后的一次合成 click，下一次点击立刻恢复', () => {
    const rate = fakeRate();
    mountHoldSpeed(surface, () => rate.media);
    const parent = document.createElement('div');
    document.body.append(parent);
    parent.append(surface);
    let bubbled = 0;
    parent.addEventListener('click', () => { bubbled += 1 });
    press(surface);
    vi.advanceTimersByTime(LONG_PRESS_MS);
    release(surface);
    click(surface);
    expect(bubbled).toBe(0);
    // 不靠时间窗：新的一次按一下抬一下就是一次完整点击，照常冒泡。
    press(surface);
    release(surface);
    click(surface);
    expect(bubbled).toBe(1);
  });

  it('按住后拖出画面在 window 上松手也照常收尾，下一次按住不受影响', () => {
    const rate = fakeRate(1);
    const hint = vi.fn();
    mountHoldSpeed(surface, () => rate.media, { hint });
    press(surface);
    vi.advanceTimersByTime(LONG_PRESS_MS);
    expect(rate.current()).toBe(HOLD_RATE);
    window.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
    expect(rate.current()).toBe(1);
    expect(hint).toHaveBeenCalledWith(false);
    press(surface);
    vi.advanceTimersByTime(LONG_PRESS_MS);
    expect(rate.current()).toBe(HOLD_RATE);
    release(surface);
  });

  it('触摸按住引发的原生菜单只吞不开，鼠标右键的不吞', () => {
    const rate = fakeRate();
    mountHoldSpeed(surface, () => rate.media);
    press(surface, { pointerType: 'touch' });
    expect(contextmenu(surface).defaultPrevented).toBe(true);
    release(surface);
    expect(contextmenu(surface).defaultPrevented).toBe(false);
  });

  it('按块认领控制器，拆掉即不再有', () => {
    const rate = fakeRate();
    const speed = mountHoldSpeed(surface, () => rate.media);
    expect(holdSpeedOf(surface)).toBe(speed);
    speed.dispose();
    expect(holdSpeedOf(surface)).toBeUndefined();
  });

  it('鼠标右键不触发长按，触摸与左键走同一条通道', () => {
    const rate = fakeRate(1);
    const speed = mountHoldSpeed(surface, () => rate.media);
    press(surface, { button: 2 });
    vi.advanceTimersByTime(LONG_PRESS_MS + 10);
    expect(rate.current()).toBe(1);
    expect(speed.consuming()).toBe(false);
    press(surface, { pointerType: 'touch' });
    vi.advanceTimersByTime(LONG_PRESS_MS);
    expect(rate.current()).toBe(HOLD_RATE);
    release(surface);
  });

  it('没有媒体（还没起播）就不起长按', () => {
    const rate = fakeRate();
    const speed = mountHoldSpeed(surface, () => null);
    press(surface);
    vi.advanceTimersByTime(LONG_PRESS_MS + 10);
    expect(rate.current()).toBe(1);
    expect(speed.consuming()).toBe(false);
  });
});

describe('滑动调进度', () => {
  const seeked = () => seeks;
  let seeks: number[];
  let previews: (number | null)[];
  let time: number;
  const at = () => ({
    media: {
      time: () => time,
      duration: () => 100,
      seek: (next: number) => { seeks.push(next); time = next },
    },
    preview: (to: number | null) => { previews.push(to) },
  });
  beforeEach(() => {
    seeks = [];
    previews = [];
    time = 20;
  });

  it('水平拖动按画面宽换算全程，拖动中只预览，松手才 seek', () => {
    const fixture = at();
    mountSwipeSeek(surface, () => fixture.media, { scrub: fixture.preview });
    press(surface, { clientX: 100, clientY: 100 });
    move(surface, 200, 105);
    expect(previews).toEqual([30]);
    expect(seeked()).toEqual([]);
    move(surface, 300, 105);
    expect(previews).toEqual([30, 40]);
    release(surface);
    expect(seeked()).toEqual([40]);
    expect(previews.at(-1)).toBeNull();
  });

  it('竖向位移放弃手势，短位移不算拖动；拖动后吞掉合成 click', () => {
    const fixture = at();
    mountSwipeSeek(surface, () => fixture.media, { scrub: fixture.preview });
    press(surface, { clientX: 100, clientY: 100 });
    move(surface, 104, 220);
    move(surface, 104, 320);
    release(surface);
    expect(previews).toEqual([]);
    expect(seeked()).toEqual([]);

    press(surface, { clientX: 100, clientY: 100 });
    move(surface, 105, 103);
    release(surface);
    expect(seeked()).toEqual([]);

    const parent = document.createElement('div');
    document.body.append(parent);
    parent.append(surface);
    let bubbled = 0;
    parent.addEventListener('click', () => { bubbled += 1 });
    press(surface, { clientX: 100, clientY: 100 });
    move(surface, 200, 100);
    release(surface);
    click(surface);
    expect(bubbled).toBe(0);
  });

  it('目标时间截断在 0 与时长之间', () => {
    const fixture = at();
    mountSwipeSeek(surface, () => fixture.media, { scrub: fixture.preview });
    press(surface, { clientX: 500, clientY: 100 });
    move(surface, 100, 100);
    expect(previews.at(-1)).toBe(0);
    move(surface, 2000, 100);
    expect(previews.at(-1)).toBe(100);
    release(surface);
    expect(seeked()).toEqual([100]);
  });

  it('点按容差内的抖动当点击放行；拖出画面在 window 上松手照样落地', () => {
    const fixture = at();
    mountSwipeSeek(surface, () => fixture.media, { scrub: fixture.preview });
    const parent = document.createElement('div');
    document.body.append(parent);
    parent.append(surface);
    let bubbled = 0;
    parent.addEventListener('click', () => { bubbled += 1 });

    press(surface, { clientX: 100, clientY: 100 });
    move(surface, 108, 103);
    release(surface);
    click(surface);
    expect(seeked()).toEqual([]);
    expect(bubbled).toBe(1);

    press(surface, { clientX: 100, clientY: 100 });
    move(surface, 200, 100);
    window.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, clientX: 200, clientY: 100 }));
    expect(seeked()).toEqual([30]);
  });

  it('横置后位移按内容坐标系换算，跨度取内容宽（布局高）', () => {
    Object.defineProperty(surface, 'clientHeight', { configurable: true, value: 1000 });
    const fixture = at();
    mountSwipeSeek(surface, () => fixture.media, { scrub: fixture.preview, rotated: () => true });
    // 用户向右横划＝屏幕向上（−ΔclientY）：ΔclientY=-100 → 内容位移 +100 → 20 + 10 = 30。
    press(surface, { clientX: 400, clientY: 400 });
    move(surface, 405, 300);
    expect(previews.at(-1)).toBe(30);
    release(surface);
    expect(seeked()).toEqual([30]);
    // 屏幕上横着走＝用户眼里上下划：放弃手势，不预览也不 seek。
    previews.length = 0;
    press(surface, { clientX: 400, clientY: 400 });
    move(surface, 520, 405);
    release(surface);
    expect(previews).toEqual([]);
    expect(seeked()).toEqual([30]);
  });
});

describe('进度条拖动（横置接管）', () => {
  let seeks: number[];
  let previews: (number | null)[];
  let time: number;
  const media = {
    time: () => time,
    duration: () => 100,
    seek: (next: number) => { seeks.push(next); time = next },
  };
  const preview = (to: number | null) => { previews.push(to) };
  beforeEach(() => {
    seeks = [];
    previews = [];
    time = 20;
  });

  it('横置时按住进度条拖动按内容坐标算落点，松手才 seek；未横置不打扰组件', () => {
    const bar = document.createElement('div');
    bar.className = 'vjs-progress-holder';
    surface.append(bar);
    const rect = { left: 490, top: 0, width: 20, height: 2000, right: 510, bottom: 2000, x: 490, y: 0, toJSON() {} };
    bar.getBoundingClientRect = () => rect;
    expect(scrubRatio(500, 500, rect, true)).toBe(0.75);
    let rotated = true;
    const drag = mountBarScrub(surface, () => bar, () => media, { rotated: () => rotated, scrub: preview });

    // 按在内容 0.75 处（屏幕偏下）：预览 75，不落地。
    const down = new PointerEvent('pointerdown', { bubbles: true, cancelable: true, button: 0, isPrimary: true, clientX: 500, clientY: 500 });
    bar.dispatchEvent(down);
    expect(down.defaultPrevented).toBe(true);
    expect(previews.at(-1)).toBe(75);
    expect(seeks).toEqual([]);
    window.dispatchEvent(new PointerEvent('pointermove', { bubbles: true, clientX: 500, clientY: 1000 }));
    expect(previews.at(-1)).toBe(50);
    window.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, clientX: 500, clientY: 1000 }));
    expect(seeks).toEqual([50]);
    expect(previews.at(-1)).toBeNull();

    // 未横置：不接管，交给组件自己。
    rotated = false;
    const pass = new PointerEvent('pointerdown', { bubbles: true, cancelable: true, button: 0, isPrimary: true, clientX: 500, clientY: 500 });
    bar.dispatchEvent(pass);
    expect(pass.defaultPrevented).toBe(false);
    expect(previews).toEqual([75, 50, null]);
    drag.dispose();
  });
});

describe('手机旋转式全屏', () => {
  it('进全屏只锁一次横屏，退出解锁；锁被拒不留状态', async () => {
    const lock = vi.fn(async () => {});
    const unlock = vi.fn();
    Object.defineProperty(globalThis.screen, 'orientation', { configurable: true, value: { lock, unlock } });
    lockScreenLandscape(true);
    lockScreenLandscape(true);
    expect(lock).toHaveBeenCalledTimes(1);
    lockScreenLandscape(false);
    expect(unlock).toHaveBeenCalledTimes(1);

    lock.mockRejectedValueOnce(new Error('unsupported'));
    lockScreenLandscape(true);
    await Promise.resolve();
    await Promise.resolve();
    expect(lock).toHaveBeenCalledTimes(2);
    // 被拒后不留锁状态：下一次能重新锁。
    lockScreenLandscape(true);
    expect(lock).toHaveBeenCalledTimes(3);
    lockScreenLandscape(false);
    expect(unlock).toHaveBeenCalledTimes(2);
  });
});
