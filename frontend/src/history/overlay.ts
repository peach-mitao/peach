/* 详情类历史条目的背景（ADR-0031「覆盖式路由」）：作品详情、四种队列与关注详情压在一页上面，
 * 它们的历史条目在 `usr` 里记下压在哪一页上（`backgroundLocation`），条目自己说得清背景。
 *
 * 壳在决定打开详情的那一刻调 `holdOverlayBackground` 记下背景，push 详情地址时用 `overlayState` 带上；
 * 队列地址要等取完数才 push，背景仍是决定那一刻的，不是 push 那一刻的地址。详情之间换条沿用上一条的
 * 背景、不嵌套；只存路径与查询串，不存 DOM、对象或条目 `key`（刷新后对不上任何活条目）。
 *
 * 这里只管写：壳关掉详情回到哪里仍按自己记的来处走，不读这份状态。 */
import { matchPath } from 'react-router';

/** 覆盖在页面上的那几种地址。不进 `isRoutedPath`：页面宿主不画它们。 */
export const OVERLAY_PATHS = [
  '/item/:id', '/mix/:seed/:item', '/parts/:seed/:item', '/editions/:seed/:item', '/playlists/:playlist/:item',
  '/follow/item/:id',
] as const;

export type OverlayKind = 'item' | 'follow';

export interface BackgroundLocation {
  pathname: string;
  search: string;
}

/** 详情条目的 `usr`：压在哪一页上，压着的是哪一种详情。 */
export interface OverlayState {
  backgroundLocation: BackgroundLocation;
  overlay: OverlayKind;
}

export const isOverlayPath = (pathname: string): boolean => (
  OVERLAY_PATHS.some((pattern) => matchPath(pattern, pathname) !== null)
);

let held: BackgroundLocation | null = null;

/** 决定打开详情的那一刻：当前在页面上就记下这一页；已经在详情地址上（同队列换条、关注组内换条、
 * 从详情点开另一条）沿用已记的背景，没有就不记，不把详情地址当背景。 */
export function holdOverlayBackground(): void {
  const { pathname, search } = window.location;
  if (!isOverlayPath(pathname)) held = { pathname, search };
}

/** 真正离开详情时清掉：关掉详情、删掉当前条目、后退前进与启动。 */
export function clearOverlayBackground(): void {
  held = null;
}

/** push 详情地址时带的 `usr`；没有背景就不带，和页面条目一样。 */
export function overlayState(overlay: OverlayKind): OverlayState | undefined {
  return held ? { backgroundLocation: { ...held }, overlay } : undefined;
}
