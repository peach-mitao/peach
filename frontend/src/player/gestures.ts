/* 画面区手势：长按进 3 倍速、水平拖动调进度。PC 与触屏一视同仁，且只做这两件新增的事——
 * 画面区原有的点击（切播放）、右键菜单、控件条都不归这里管，也绝不能被它弄坏。
 *
 * 三个保命约定：
 * - 指针的移动与松手挂在 window 上（按下的那一刻挂、松手即摘）：只挂在画面上时，拖出画面再
 *   松手就收不到 pointerup，倍速和拖动态永远出不去，之后的点击还会被当成手势收尾吞掉——
 *   PC 上整个播放器就「坏了」。
 * - 拖动的门槛是「位移超过点按容差且横向占优」：鼠标点击自带几个像素的抖动，按轴锁距离
 *   （12px）就把普通点击判成拖动，点击暂停会时灵时不灵。
 * - 手势收尾只吞紧随其后的那一次合成 click（一次一击）：长按松手那一下不能又当点击，但
 *   用户紧接着的下一次点击必须立刻恢复。新一次 pointerdown 顺手清掉没消费的标记。
 *
 * 倍速只改当前播放，不写播放记忆——恢复的是按下那一刻的速度（含记忆恢复过的）。触摸按住
 * 引发的 `contextmenu`（浏览器原生视频菜单）只吞不开，`touchPressing()` 供 `menu.ts` 判
 * 要不要开 Peach 菜单；鼠标右键（含 macOS 的 Ctrl 点按）照旧开。 */

/** 长按前后吞合成 click 的窗口；触屏抬手后浏览器合成的那一下 click 不再当点击。 */
export const SYNTHETIC_CLICK_MS = 700;
/** 位移超过这么多才定手势方向；方向一旦定下就不再改。 */
export const AXIS_LOCK_PX = 12;
/** 位移不超过这么多算一次点击（也是长按允许的抖动、拖动的起手门槛）。 */
export const TAP_SLOP_PX = 14;
/** 按住不动满这么久进 3 倍速。 */
export const LONG_PRESS_MS = 500;
/** 长按时的倍速。 */
export const HOLD_RATE = 3;

/* ── 横置（整体旋转 90°）后的手势坐标 ── */

/** 触摸位移换算回内容坐标系：不转时就是原样；横置（`rotate(-90deg)`）后内容水平 = −ΔclientY、
 *  内容垂直 = ΔclientX。轴锁与方向判定都要先换算，否则用户眼里的横划会被认成竖划。 */
export function swipeDelta(dx: number, dy: number, rotated: boolean): { x: number; y: number } {
  return rotated ? { x: -dy, y: dx } : { x: dx, y: dy };
}

/** 手势按画面宽度换算全程；横置后画面宽是视口高。 */
export const swipeSpan = (rotated: boolean): number => (rotated ? window.innerHeight : window.innerWidth);

/** 点按落在哪半区（−1 左、1 右）：横置后内容 x = 视口高 − clientY，屏幕下半是用户的左半屏。 */
export function tapSide(clientX: number, clientY: number, rotated: boolean): number {
  return rotated
    ? (clientY > window.innerHeight / 2 ? -1 : 1)
    : (clientX < window.innerWidth / 2 ? -1 : 1);
}

/** 进度条落点比例（0..1）：不横置按条自己的矩形量；横置后条在屏幕上是竖条，`getBoundingClientRect`
 *  量到的是整个 AABB（宽只剩条的厚度），比例要按内容坐标算——内容 x 从条的末端往下走。 */
export function scrubRatio(clientX: number, clientY: number,
  box: { left: number; top: number; width: number; height: number }, rotated: boolean): number {
  const at = rotated ? box.top + box.height - clientY : clientX - box.left;
  const span = rotated ? box.height : box.width;
  return span > 0 ? Math.min(1, Math.max(0, at / span)) : 0;
}

export interface HoldMedia {
  rate(): number;
  setRate(rate: number): void;
}

export interface HoldOptions {
  /** 不参与的目标（控件条、设置菜单等）。 */
  filter?: (event: PointerEvent) => boolean;
  /** 3× 角标的显示与隐藏。 */
  hint?: (on: boolean) => void;
}

export interface HoldSpeed {
  /** 正在 3 倍速，或刚松手还有一次合成 click 要吞。 */
  consuming(): boolean;
  /** 触摸／手写笔正按着：此时的 contextmenu 是长按引发的，只吞不开。 */
  touchPressing(): boolean;
  dispose(): void;
}

const controllers = new WeakMap<HTMLElement, HoldSpeed>();

/** 这块画面的长按控制器（`menu.ts` 按播放器外壳查触摸长按）。 */
export const holdSpeedOf = (el: HTMLElement | null): HoldSpeed | undefined => (el ? controllers.get(el) : undefined);

/** 媒体框里手势读数的占位：3× 角标与拖动时间胶囊（`preparePlayerFrame` 插进媒体框）。 */
export function playerGestureOverlayHtml(): string {
  return '<div data-player-hold="" id="playerHold" hidden>3×</div>'
    + '<div data-player-scrub-time="" id="playerScrubTime" role="status" hidden></div>';
}

export function mountHoldSpeed(el: HTMLElement, media: () => HoldMedia | null, options: HoldOptions = {}): HoldSpeed {
  let timer = 0, down = false, active = false, pointerKind = '', startX = 0, startY = 0, saved = 1, swallowClicks = 0;

  const restore = () => {
    if (!active) return;
    active = false;
    options.hint?.(false);
    media()?.setRate(saved);
  };
  const cancel = () => {
    clearTimeout(timer);
    timer = 0;
    restore();
  };
  const onMove = (event: PointerEvent) => {
    if (!down) return;
    /* 触发前后都一样：位移超限就收手（已触发的恢复原速），接下来的拖动归 `mountSwipeSeek`。 */
    if (Math.abs(event.clientX - startX) > TAP_SLOP_PX || Math.abs(event.clientY - startY) > TAP_SLOP_PX) cancel();
  };
  const onUp = () => {
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    window.removeEventListener('pointercancel', onUp);
    if (!down) return;
    down = false;
    if (active) swallowClicks = 1;
    cancel();
  };
  const onDown = (event: PointerEvent) => {
    /* 自愈：状态没出去就先把上一次按住收干净，不能让新一次按不上。 */
    if (down) onUp();
    swallowClicks = 0;
    if (event.button !== 0 || !event.isPrimary) return;
    if (options.filter && !options.filter(event)) return;
    const at = media();
    if (!at) return;
    down = true;
    pointerKind = event.pointerType || 'mouse';
    startX = event.clientX;
    startY = event.clientY;
    saved = at.rate() || 1;
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      timer = 0;
      if (!down) return;
      active = true;
      options.hint?.(true);
      media()?.setRate(HOLD_RATE);
    }, LONG_PRESS_MS);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
  };
  const onMenu = (event: MouseEvent) => {
    if (down && pointerKind !== 'mouse') {
      event.preventDefault();
      return;
    }
    // 鼠标右键（或 macOS 的 Ctrl 点按）开菜单，长按计时作废。
    clearTimeout(timer);
    timer = 0;
  };
  const swallow = (event: Event) => {
    if (active || swallowClicks > 0) {
      swallowClicks = 0;
      event.stopPropagation();
      event.preventDefault();
    }
  };
  el.addEventListener('pointerdown', onDown);
  el.addEventListener('contextmenu', onMenu);
  el.addEventListener('click', swallow, true);
  const speed: HoldSpeed = {
    consuming: () => active || swallowClicks > 0,
    touchPressing: () => down && pointerKind !== 'mouse',
    dispose: () => {
      onUp();
      clearTimeout(timer);
      restore();
      down = false;
      swallowClicks = 0;
      controllers.delete(el);
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('contextmenu', onMenu);
      el.removeEventListener('click', swallow, true);
    },
  };
  controllers.set(el, speed);
  return speed;
}

export interface SwipeMedia {
  time(): number;
  duration(): number;
  seek(time: number): void;
}

export interface SwipeSeekOptions {
  /** 不参与的目标（控件条、设置菜单等）。 */
  filter?: (event: PointerEvent) => boolean;
  /** 拖动预览：给目标秒数与总长；null 是拖动结束。松手的 seek 不走这里。 */
  scrub?: (to: number | null, total: number) => void;
  /** 画面被整体横置（全屏看横版）：位移按内容坐标系换算，否则用户眼里的横划会被认成竖划。 */
  rotated?: () => boolean;
}

export interface SwipeSeek {
  /** 刚拖动过（还有一记合成 click 要吞）：调用方据此吞掉合成 click。 */
  consuming(): boolean;
  dispose(): void;
}

/** 水平拖动调进度：位移按画面宽度换算成时长的相对量（整个画面宽 = 全程），拖动中只预览，松手才 seek。
 *  位移不超过点按容差的当点击放行——普通点击不 seek、不吞 click。 */
export function mountSwipeSeek(el: HTMLElement, media: () => SwipeMedia | null, options: SwipeSeekOptions = {}): SwipeSeek {
  let down = false, scrubbing = false, aborted = false, startX = 0, startY = 0, travel = 0, from = 0, swallowClicks = 0;

  /* 跨度取内容宽：横置后内容宽是这块画面的布局高（外壳按视口铺，旋转的是里面的内容层）。 */
  const span = () => ((options.rotated?.() ? el.clientHeight : el.clientWidth) || 1);
  const ratioTo = (distance: number, total: number): number =>
    Math.min(total, Math.max(0, from + distance / span() * total));
  const finish = (commit: boolean) => {
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    window.removeEventListener('pointercancel', onUp);
    if (!down) return;
    down = false;
    if (scrubbing) {
      scrubbing = false;
      swallowClicks = 1;
      /* 落地只归松手；取消（pointercancel）与自愈收尾都只收手，拖到一半被系统打断的
         那次不算 seek。 */
      if (commit) {
        const at = media();
        const total = at?.duration() || 0;
        if (at && total) at.seek(ratioTo(travel, total));
      }
      options.scrub?.(null, 0);
    }
    aborted = false;
  };
  const onUp = (event: PointerEvent) => finish(event.type !== 'pointercancel');
  const onDown = (event: PointerEvent) => {
    /* 自愈：状态没出去就先收干净。 */
    if (down) finish(false);
    swallowClicks = 0;
    if (event.button !== 0 || !event.isPrimary) return;
    if (options.filter && !options.filter(event)) return;
    const at = media();
    if (!at || !at.duration()) return;
    down = true;
    scrubbing = false;
    aborted = false;
    startX = event.clientX;
    startY = event.clientY;
    travel = 0;
    from = at.time() || 0;
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
  };
  const onMove = (event: PointerEvent) => {
    if (!down || aborted) return;
    /* 位移先换算回内容坐标系：横置后用户眼里的横划在屏幕上是竖着走的。 */
    const delta = swipeDelta(event.clientX - startX, event.clientY - startY, !!options.rotated?.());
    travel = delta.x;
    if (!scrubbing) {
      /* 点按容差之内的位移是点击的抖动；竖向占优的位移交给页面滚动。 */
      if (Math.abs(delta.x) <= TAP_SLOP_PX && Math.abs(delta.y) <= TAP_SLOP_PX) return;
      if (Math.abs(delta.x) <= Math.abs(delta.y)) {
        aborted = true;
        return;
      }
      scrubbing = true;
    }
    const at = media();
    const total = at?.duration() || 0;
    if (!at || !total) return;
    options.scrub?.(ratioTo(travel, total), total);
  };
  const swallow = (event: Event) => {
    if (scrubbing || swallowClicks > 0) {
      swallowClicks = 0;
      event.stopPropagation();
      event.preventDefault();
    }
  };
  el.addEventListener('pointerdown', onDown);
  el.addEventListener('click', swallow, true);
  const seek: SwipeSeek = {
    consuming: () => scrubbing || swallowClicks > 0,
    dispose: () => {
      if (scrubbing) options.scrub?.(null, 0);
      scrubbing = false;
      down = false;
      swallowClicks = 0;
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('click', swallow, true);
    },
  };
  return seek;
}

export interface BarScrubOptions {
  /** 只在横置时接管：正着摆时组件自己的拖动坐标是对的，不打扰它。 */
  rotated: () => boolean;
  /** 拖动预览：给目标秒数与总长；null 是拖动结束。松手的 seek 不走这里。 */
  scrub?: (to: number | null, total: number) => void;
}

/** 进度条本体的拖动：横置时接管。组件（`media-time-slider`）拿屏幕外接矩算落点，条在屏幕上
 *  是竖条时只会抖在两端；更糟的是它在事件链上的监听（含后置的落地）会按错误坐标再 seek 一次。
 *  接管从 `el` 的捕获阶段吃掉整段手势（move/up 也拦，组件全程看不见），按内容坐标算落点，
 *  拖动中只预览，松手才 seek。指针拖出 `el` 时由 window 那份兜底。未横置时不拦，交给组件。 */
export function mountBarScrub(el: HTMLElement, bar: () => HTMLElement | null,
  media: () => SwipeMedia | null, options: BarScrubOptions): { dispose(): void } {
  let dragging = false, swallowClicks = 0;
  const onBar = (target: EventTarget | null): boolean =>
    !!(target instanceof Element && target.closest('.vjs-progress-holder, .vjs-progress-control'));
  const ratioOf = (event: PointerEvent, track: HTMLElement): number =>
    scrubRatio(event.clientX, event.clientY, track.getBoundingClientRect(), true);
  const paint = (ratio: number) => {
    const at = media();
    const total = at?.duration() || 0;
    if (at && total) options.scrub?.(ratio * total, total);
  };
  const finish = (commit: boolean, event?: PointerEvent) => {
    if (!dragging) return;
    dragging = false;
    swallowClicks = 1;
    drop();
    const at = media();
    const total = at?.duration() || 0;
    const track = bar();
    if (commit && at && total && track && event) at.seek(ratioOf(event, track) * total);
    options.scrub?.(null, 0);
  };
  const onMove = (event: PointerEvent) => {
    if (!dragging) return;
    event.stopImmediatePropagation();
    const track = bar();
    if (track) paint(ratioOf(event, track));
  };
  const onUp = (event: PointerEvent) => {
    if (!dragging) return;
    event.stopImmediatePropagation();
    finish(event.type !== 'pointercancel', event);
  };
  const onDown = (event: PointerEvent) => {
    if (!options.rotated() || event.button !== 0 || !event.isPrimary) return;
    const track = bar();
    if (!track || !onBar(event.target)) return;
    const at = media();
    if (!at || !at.duration()) return;
    event.stopImmediatePropagation();
    event.preventDefault();
    dragging = true;
    swallowClicks = 0;
    el.addEventListener('pointermove', onMove, true);
    el.addEventListener('pointerup', onUp, true);
    el.addEventListener('pointercancel', onUp, true);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    paint(ratioOf(event, track));
  };
  const drop = () => {
    el.removeEventListener('pointermove', onMove, true);
    el.removeEventListener('pointerup', onUp, true);
    el.removeEventListener('pointercancel', onUp, true);
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    window.removeEventListener('pointercancel', onUp);
  };
  const swallow = (event: Event) => {
    if (swallowClicks > 0) {
      swallowClicks = 0;
      event.stopPropagation();
      event.preventDefault();
    }
  };
  el.addEventListener('pointerdown', onDown, true);
  el.addEventListener('click', swallow, true);
  return {
    dispose: () => {
      finish(false);
      drop();
      swallowClicks = 0;
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('click', swallow, true);
    },
  };
}
