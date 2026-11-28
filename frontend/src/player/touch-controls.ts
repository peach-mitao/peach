/* 触摸手势使用原生媒体状态；拖动只预览，松手才定位，避免远程片源反复缓冲。
 * 参考 YouTube：左右双击默认跳转十秒，长按画面任意位置临时倍速，松手恢复。
 * 鼠标左键共用长按倍速、横向拖动预览定位；没动过的单击、双击和右键菜单照旧。
 * 倍速、每次滑动秒数、双击区域与跳转秒数读 `gestureSettings()`，每次手势开始时现读。 */
import { t } from '../i18n';
import { gestureSettings } from './gesture-settings';

export function wirePlayerInteractions(root: HTMLElement, video: HTMLVideoElement, signal: AbortSignal,
  duration: () => number = () => video.duration, touchEnabled = true) {
  const feedback = document.createElement('div');
  feedback.className = 'vjs-peach-gesture'; feedback.hidden = true;
  feedback.setAttribute('role', 'status'); feedback.setAttribute('aria-live', 'polite');
  root.querySelector('media-container')?.append(feedback);
  let idle: ReturnType<typeof setTimeout> | undefined;
  let hold: ReturnType<typeof setTimeout> | undefined;
  let tap: ReturnType<typeof setTimeout> | undefined;
  let message: ReturnType<typeof setTimeout> | undefined;
  let lastTap: { at: number; zone: number } | null = null;
  let ignoreClickUntil = 0;
  const pointers = new Set<number>();
  let gesture: { id: number; x: number; y: number; width: number; height: number; from: number;
    volume: number; muted: boolean; axis: '' | 'seek' | 'volume' | 'scroll' | 'hold'; to?: number | undefined; rate?: number;
    menu: boolean; visible: boolean; volumeSupported?: boolean; mouse?: boolean } | null = null;
  const clock = (seconds: number) => {
    const value = Math.max(0, Math.round(seconds));
    return `${Math.floor(value / 3600) ? `${Math.floor(value / 3600)}:` : ''}${String(Math.floor(value / 60) % 60).padStart(2, '0')}:${String(value % 60).padStart(2, '0')}`;
  };
  const menuOpen = () => !!root.querySelector('[aria-expanded="true"]');
  const show = () => { root.classList.add('vjs-user-active'); root.classList.remove('vjs-user-inactive') };
  const hide = () => { root.classList.remove('vjs-user-active'); root.classList.add('vjs-user-inactive') };
  const active = () => {
    show(); clearTimeout(idle);
    if (!video.paused && !video.ended) idle = setTimeout(() => {
      if (gesture || pointers.size || menuOpen()) { active(); return }
      hide();
    }, root.dataset.playerInput === 'touch' ? 3000 : 2500);
  };
  const tell = (text: string, persistent = false) => {
    clearTimeout(message); feedback.textContent = text; feedback.hidden = false;
    if (!persistent) message = setTimeout(() => { feedback.hidden = true }, 1000);
  };
  const surface = (event: Event) => !event.composedPath().some(node => node instanceof Element &&
    node !== root && node.matches('.vjs-control-bar,.vjs-peach-settings,.vjs-peach-panel,[role="menu"],button,a,input,select,textarea,[role="slider"],[role="button"],media-slider-thumb'));
  const clamp = (time: number) => {
    const total = duration();
    if (!Number.isFinite(total) || total <= 0) return null;
    const bounded = Math.min(Math.max(0, time), Math.max(0, total - .1));
    const ranges = video.seekable;
    if (!ranges.length) return bounded;
    let nearest = bounded, distance = Infinity;
    for (let at = 0; at < ranges.length; at++) {
      const point = Math.min(Math.max(ranges.start(at), bounded), Math.max(ranges.start(at), ranges.end(at) - .1));
      if (Math.abs(point - bounded) < distance) { nearest = point; distance = Math.abs(point - bounded) }
    }
    return nearest;
  };
  const seek = (time: number) => {
    const target = clamp(time);
    if (target === null) { tell(t('catalog:playerGestures.durationUnknown')); return }
    try { video.currentTime = target } catch { tell(t('catalog:playerGestures.seekFailed')); return }
    tell(t('catalog:playerGestures.seekTo', { time: clock(target) }));
  };
  /** 一屏横滑约取片长的 10%，至少两档、最多两分半；短滑用缓增曲线保留精度。 */
  const previewSeek = (current: NonNullable<typeof gesture>, dx: number) => {
    if (Math.abs(dx) < 12) { current.to = undefined; feedback.hidden = true; return }
    const total = duration();
    if (!Number.isFinite(total) || total <= 0) {
      current.to = undefined; tell(t('catalog:playerGestures.durationUnknown'), true); return;
    }
    const step = gestureSettings().swipeSeconds;
    const span = Math.min(total, Math.max(step * 2, Math.min(total * .1, 150)));
    const distance = Math.min(Math.abs(dx) / current.width, 1);
    const steps = Math.min(Math.max(1, Math.floor(span / step)),
      Math.max(1, Math.round(span * distance ** 1.5 / step)));
    current.to = clamp(current.from + Math.sign(dx) * steps * step) ?? undefined;
    if (current.to === undefined) { tell(t('catalog:playerGestures.durationUnknown'), true); return }
    const delta = current.to - current.from;
    tell(t(delta >= 0 ? 'catalog:playerGestures.forward' : 'catalog:playerGestures.backward',
      { delta: clock(Math.abs(delta)), to: clock(current.to), total: clock(total) }), true);
  };
  /** 手势取消时恢复临时倍速和音量，不提交定位。 */
  const cancel = () => {
    clearTimeout(hold); clearTimeout(tap); lastTap = null;
    if (gesture?.rate !== undefined) video.playbackRate = gesture.rate;
    if (gesture?.axis === 'volume') { video.volume = gesture.volume; video.muted = gesture.muted }
    gesture = null; pointers.clear(); feedback.hidden = true; clearTimeout(message);
    active();
  };
  root.addEventListener('pointerdown', event => {
    if (!touchEnabled) return;
    if (event.pointerType === 'touch' && !gestureSettings().touchGestures) { root.dataset.playerInput = 'touch'; active(); return }
    const visible = root.classList.contains('vjs-user-active');
    if (event.pointerType !== 'touch') {
      cancel(); root.dataset.playerInput = 'mouse'; ignoreClickUntil = 0; active();
      // 鼠标左键按在画面上也起手势；控件、右键和关掉手势时照旧只是鼠标。
      if (event.pointerType !== 'mouse' || event.button !== 0
        || !gestureSettings().touchGestures || !surface(event) || menuOpen()) return;
      pointers.add(event.pointerId);
    } else {
      root.dataset.playerInput = 'touch'; pointers.add(event.pointerId); active();
      if (pointers.size !== 1) { cancel(); pointers.add(event.pointerId); return }
      if (!surface(event)) return;
      ignoreClickUntil = Date.now() + 1000;
    }
    const mouse = event.pointerType === 'mouse';
    const rect = root.getBoundingClientRect();
    gesture = { id: event.pointerId, x: event.clientX, y: event.clientY, width: Math.max(rect.width, 1),
      height: Math.max(rect.height, 1), from: video.currentTime, volume: video.volume, muted: video.muted,
      axis: '', menu: menuOpen(), visible, mouse };
    // 指针在两次事件之间被系统收回时这里会抛错，手势照样往下走，不能停在半截。
    // 鼠标等到真起了手势才捕获：先捕获的话随后的 click 落在外壳上，画面收不到单击，切不了播放。
    if (!mouse) try { root.setPointerCapture?.(event.pointerId) } catch { /* 没捕获到也能靠 window 上的抬起收尾。 */ }
    if (gesture.menu) return;
    hold = setTimeout(() => {
      if (!gesture || gesture.axis) return;
      if (video.paused || video.ended) return;
      clearTimeout(tap); lastTap = null;
      gesture.axis = 'hold'; gesture.rate = video.playbackRate;
      video.playbackRate = Math.max(gestureSettings().holdRate, gesture.rate);
      tell(t('catalog:playerGestures.holdTouch', { rate: video.playbackRate }), true);
    }, 500);
  }, { signal, capture: true });
  root.addEventListener('pointermove', event => {
    if (!touchEnabled || (event.pointerType !== 'touch' && !gesture?.mouse)) { active(); return }
    if (event.pointerType !== 'touch') active();
    const current = gesture;
    if (!current || current.id !== event.pointerId || current.menu || current.axis === 'hold') return;
    const dx = event.clientX - current.x, dy = event.clientY - current.y;
    if (!current.axis) {
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 12) return;
      clearTimeout(hold); clearTimeout(tap); lastTap = null;
      const full = !!document.fullscreenElement && root.contains(document.fullscreenElement)
        || root.matches('.vjs-fullscreen,.vjs-full-window,[data-peach-fullscreen]') || document.body.classList.contains('vjs-full-window');
      current.axis = Math.abs(dx) > Math.abs(dy) * 1.2 ? 'seek'
        : !current.mouse && full && current.x - root.getBoundingClientRect().left > current.width / 2 ? 'volume' : 'scroll';
      if (current.mouse && current.axis === 'seek') try { root.setPointerCapture?.(event.pointerId) } catch { /* 拖出画面靠 window 上的抬起收尾。 */ }
    }
    if (current.axis === 'seek') {
      event.preventDefault();
      previewSeek(current, dx);
    } else if (current.axis === 'volume') {
      event.preventDefault();
      const volume = Math.max(0, Math.min(1, current.volume - dy / current.height));
      try { video.volume = volume; video.muted = volume === 0 } catch { /* 部分移动浏览器仅支持系统音量键。 */ }
      current.volumeSupported = Math.abs(video.volume - volume) < .01;
      tell(current.volumeSupported ? t('catalog:playerGestures.volume', { percent: Math.round(video.volume * 100) })
        : t('catalog:playerGestures.deviceVolume'), true);
    }
  }, { signal, passive: false });
  window.addEventListener('pointerup', event => {
    if (!pointers.has(event.pointerId)) return;
    pointers.delete(event.pointerId);
    const current = gesture;
    if (event.pointerType !== 'touch' && !current?.mouse) return;
    if (!current || current.id !== event.pointerId) { active(); return }
    if (current.axis === 'seek') previewSeek(current, event.clientX - current.x);
    // 极快的一划可能只收到 down/up；仍按松手位置决定方向和距离。
    else if (!current.axis && Math.abs(event.clientX - current.x) >= 12
      && Math.abs(event.clientX - current.x) > Math.abs(event.clientY - current.y) * 1.2) {
      current.axis = 'seek'; previewSeek(current, event.clientX - current.x);
    }
    clearTimeout(hold); gesture = null;
    // 鼠标没动过的那一下是普通单击，留给画面的点击切换播放；起过手势的吞掉随后的 click。
    if (!current.mouse || current.axis) ignoreClickUntil = Date.now() + 1000;
    try { root.releasePointerCapture?.(event.pointerId) } catch { /* 已经释放过。 */ }
    if (current.rate !== undefined) video.playbackRate = current.rate;
    if (current.axis === 'seek' && current.to !== undefined) seek(current.to);
    else if (current.axis === 'hold' || current.axis === 'volume') {
      message = setTimeout(() => { feedback.hidden = true }, 700);
    } else if (current.mouse) {
      active();
    } else if (!current.axis && Math.hypot(event.clientX - current.x, event.clientY - current.y) < 12) {
      if (current.menu) { active(); return }
      const position = (current.x - root.getBoundingClientRect().left) / current.width;
      const { doubleTapPercent, seekSeconds } = gestureSettings();
      const side = doubleTapPercent / 100;
      const zone = position < side ? -1 : position > 1 - side ? 1 : 0;
      if (lastTap && Date.now() - lastTap.at < 300 && lastTap.zone === zone) {
        clearTimeout(tap); lastTap = null;
        // 两侧快进快退；中间双击切换播放，和鼠标单击是同一个动作。
        if (zone) seek(video.currentTime + zone * seekSeconds);
        else if (video.paused || video.ended) void video.play().catch(() => {}); else video.pause();
      } else {
        clearTimeout(tap); lastTap = { at: Date.now(), zone };
        tap = setTimeout(() => {
          lastTap = null;
          if (!video.paused && !video.ended && current.visible && !menuOpen()) { clearTimeout(idle); hide() } else active();
        }, 300);
      }
    }
    // 单击的显隐由双击窗口结束后决定，其余手势结束重新开始隐藏计时。
    if (!lastTap) active();
  }, { signal });
  root.addEventListener('pointercancel', () => { ignoreClickUntil = Date.now() + 1000; cancel() }, { signal });
  root.addEventListener('lostpointercapture', () => { if (gesture) cancel() }, { signal });
  root.addEventListener('click', event => {
    // 关掉触摸手势时，轻点画面照鼠标单击处理（切换播放），不再吞掉合成点击。
    if (!touchEnabled || !gestureSettings().touchGestures) return;
    if (!surface(event)) { active(); return }
    if ((event as PointerEvent).pointerType === 'touch' || Date.now() < ignoreClickUntil) {
      event.preventDefault(); event.stopImmediatePropagation(); return;
    }
  }, { signal, capture: true });
  // 没有控件条的播放器（沉浸模式每一格）由宿主自己管画面点击：这里再切一次，一下单击就切两次等于没切。
  if (touchEnabled) video.addEventListener('click', () => {
    if (video.paused) void video.play().catch(() => {}); else video.pause();
  }, { signal });
  root.addEventListener('dblclick', event => {
    if (!surface(event)) return;
    if (Date.now() < ignoreClickUntil) { event.preventDefault(); event.stopImmediatePropagation(); return }
    if (event.target === video) root.querySelector<HTMLElement>('media-fullscreen-button')?.click();
  }, { signal, capture: true });
  root.addEventListener('focusin', active, { signal });
  root.addEventListener('peach-touch-cancel', () => cancel(), { signal });
  root.addEventListener('contextmenu', event => {
    if (root.dataset.playerInput === 'touch' && surface(event)) event.preventDefault();
  }, { signal });
  window.addEventListener('blur', () => cancel(), { signal });
  document.addEventListener('visibilitychange', () => { if (document.hidden) cancel() }, { signal });
  for (const name of ['loadstart', 'emptied']) video.addEventListener(name, () => cancel(), { signal });
  const observer = new MutationObserver(() => { if (menuOpen()) active() });
  observer.observe(root, { subtree: true, attributes: true, attributeFilter: ['aria-expanded'] });
  signal.addEventListener('abort', () => {
    cancel(); clearTimeout(idle); observer.disconnect(); feedback.remove();
  }, { once: true });
  return { active, cancel };
}
