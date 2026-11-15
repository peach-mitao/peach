/* 普通播放器与沉浸模式共用触屏定位尺度。拖动和长按只预览目标，松手才写入媒体时间。 */
export const TOUCH_HOLD_MS = 500;
export const TOUCH_AXIS_LOCK_PX = 12;
export const TOUCH_SEEK_SPAN = 20 * 60;
export const TOUCH_REWIND_RATE = 2;

export function touchSeekTarget(video: HTMLVideoElement, from: number, delta: number, width: number): number | null {
  const duration = video.duration;
  if (!Number.isFinite(duration) || duration <= 0 || width <= 0) return null;
  return clampTouchSeek(video, from + delta / width * Math.min(duration, TOUCH_SEEK_SPAN));
}

export function touchRewindTarget(video: HTMLVideoElement, from: number, elapsedMs: number): number | null {
  return clampTouchSeek(video, from - elapsedMs / 1000 * TOUCH_REWIND_RATE);
}

function clampTouchSeek(video: HTMLVideoElement, target: number): number | null {
  const duration = video.duration;
  if (!Number.isFinite(duration) || duration <= 0) return null;
  const bounded = Math.max(0, Math.min(duration, target));
  const ranges = video.seekable;
  if (!ranges.length) return bounded;
  let closest = ranges.start(0), distance = Infinity;
  for (let index = 0; index < ranges.length; index++) {
    const start = ranges.start(index), end = ranges.end(index);
    if (bounded >= start && bounded <= end) return bounded;
    for (const edge of [start, end]) {
      const away = Math.abs(bounded - edge);
      if (away < distance) { closest = edge; distance = away }
    }
  }
  return closest;
}
