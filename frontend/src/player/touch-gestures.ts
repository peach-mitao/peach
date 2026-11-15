/* 详情与小窗的画面手势。控件条和沉浸模式各有自己的输入入口，不在这里抢事件。 */
import { fmtClock } from '@peach/legacy/core';

import { t } from '../i18n';
import { TOUCH_AXIS_LOCK_PX, TOUCH_HOLD_MS, touchRewindTarget, touchSeekTarget } from './touch-gesture-policy';

type Mode = 'pending' | 'vertical' | 'seek' | 'held' | 'speed' | 'rewind';
interface Gesture {
  id: number;
  x: number;
  y: number;
  width: number;
  from: number;
  side: number;
  mode: Mode;
  target?: number | undefined;
  rate?: number;
  started?: number;
  wasPlaying?: boolean;
}

export function mountVideoTouchGestures(root: HTMLElement, video: HTMLVideoElement, signal: AbortSignal): { cancel(): void } {
  root.dataset.playerTouchGestures = '';
  const feedback = document.createElement('div');
  feedback.dataset.playerGestureFeedback = '';
  feedback.setAttribute('aria-hidden', 'true');
  feedback.hidden = true;
  (root.querySelector('media-container') || root).append(feedback);
  let gesture: Gesture | null = null;
  const pointers = new Set<number>();
  let holdTimer = 0, rewindTimer = 0, ignoreClickUntil = 0;
  const show = (message: string) => { feedback.textContent = message; feedback.hidden = false };
  const hide = () => { feedback.hidden = true; feedback.textContent = '' };
  const clearTimers = () => { clearTimeout(holdTimer); clearInterval(rewindTimer); holdTimer = rewindTimer = 0 };
  const rewind = (current: Gesture) => {
    current.target = touchRewindTarget(video, current.from, performance.now() - current.started!) ?? undefined;
    if (current.target !== undefined) show(t('catalog:playerControls.touchRewind', { time: fmtClock(current.target) }));
  };
  const finish = (commit: boolean, resume = true) => {
    const current = gesture;
    gesture = null;
    clearTimers(); hide();
    if (!current) return;
    if (!commit || current.mode !== 'pending') ignoreClickUntil = Date.now() + 750;
    if (current.mode === 'speed' && current.rate !== undefined) video.playbackRate = current.rate;
    if (current.mode === 'rewind') {
      if (commit) {
        rewind(current);
        if (current.target !== undefined) video.currentTime = current.target;
      }
      if (resume && current.wasPlaying) void video.play().catch(() => {});
    } else if (commit && current.mode === 'seek' && current.target !== undefined) video.currentTime = current.target;
    hide();
  };
  const cancel = () => finish(false);

  window.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'touch' && event.pointerType !== 'pen') return;
    pointers.add(event.pointerId);
    if (pointers.size > 1) cancel();
  }, { signal, capture: true });
  video.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'touch' && event.pointerType !== 'pen') return;
    if (pointers.size !== 1) return;
    ignoreClickUntil = 0;
    const box = root.getBoundingClientRect();
    const current: Gesture = { id: event.pointerId, x: event.clientX, y: event.clientY,
      width: box.width || video.clientWidth || 1, from: video.currentTime || 0,
      side: event.clientX < box.left + box.width / 2 ? -1 : 1, mode: 'pending' };
    gesture = current;
    holdTimer = window.setTimeout(() => {
      if (gesture !== current || current.mode !== 'pending') return;
      current.mode = 'held';
      if (current.side > 0) {
        if (video.paused) return;
        current.mode = 'speed'; current.rate = video.playbackRate;
        video.playbackRate = Math.max(2, current.rate);
        show(t('catalog:playerControls.touchSpeed', { rate: video.playbackRate }));
      } else {
        if (touchRewindTarget(video, current.from, 0) === null) return;
        current.from = video.currentTime || 0;
        current.mode = 'rewind'; current.started = performance.now(); current.wasPlaying = !video.paused;
        if (current.wasPlaying) video.pause();
        rewind(current);
        rewindTimer = window.setInterval(() => { if (gesture === current) rewind(current) }, 200);
      }
    }, TOUCH_HOLD_MS);
  }, { signal });
  window.addEventListener('pointermove', (event) => {
    const current = gesture;
    if (!current || event.pointerId !== current.id || current.mode === 'speed' || current.mode === 'rewind') return;
    const dx = event.clientX - current.x, dy = event.clientY - current.y;
    if (current.mode === 'pending') {
      if (Math.abs(dx) < TOUCH_AXIS_LOCK_PX && Math.abs(dy) < TOUCH_AXIS_LOCK_PX) return;
      clearTimeout(holdTimer);
      current.mode = Math.abs(dx) > Math.abs(dy) * 1.2 ? 'seek' : 'vertical';
    }
    if (current.mode !== 'seek') return;
    event.preventDefault();
    current.target = touchSeekTarget(video, current.from, dx, current.width) ?? undefined;
    if (current.target !== undefined) show(t(dx >= 0 ? 'catalog:playerControls.touchForward' : 'catalog:playerControls.touchRewind',
      { time: fmtClock(current.target) }));
  }, { signal, passive: false });
  window.addEventListener('pointerup', (event) => {
    pointers.delete(event.pointerId);
    if (!gesture || event.pointerId !== gesture.id) return;
    const consumed = gesture.mode !== 'pending';
    if (consumed) { event.preventDefault(); ignoreClickUntil = Date.now() + 750 }
    finish(true);
  }, { signal });
  window.addEventListener('pointercancel', (event) => {
    pointers.delete(event.pointerId);
    if (gesture?.id !== event.pointerId) return;
    ignoreClickUntil = Date.now() + 750;
    cancel();
  }, { signal });
  video.addEventListener('lostpointercapture', (event) => { if (gesture?.id === event.pointerId) cancel() }, { signal });
  const suppressClick = (event: Event) => {
    if (event.target !== video || Date.now() >= ignoreClickUntil) return;
    event.preventDefault(); event.stopImmediatePropagation();
  };
  root.addEventListener('click', suppressClick, { signal, capture: true });
  root.addEventListener('dblclick', suppressClick, { signal, capture: true });
  video.addEventListener('contextmenu', (event) => {
    if (gesture) { event.preventDefault(); event.stopPropagation() }
  }, { signal });
  video.addEventListener('pause', () => { if (gesture?.mode === 'speed') cancel() }, { signal });
  video.addEventListener('loadstart', () => finish(false, false), { signal });
  window.addEventListener('blur', () => { pointers.clear(); finish(false, false) }, { signal });
  window.addEventListener('resize', cancel, { signal });
  document.addEventListener('fullscreenchange', cancel, { signal });
  video.addEventListener('webkitendfullscreen', cancel, { signal });
  document.addEventListener('visibilitychange', () => { if (document.hidden) { pointers.clear(); finish(false, false) } }, { signal });
  signal.addEventListener('abort', () => { finish(false, false); feedback.remove(); delete root.dataset.playerTouchGestures }, { once: true });
  return { cancel: () => finish(false, false) };
}
