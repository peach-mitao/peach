/* 详情类历史条目的背景（ADR-0031「覆盖式路由」）：作品详情、四种队列与关注详情压在一页上面，
 * 它们的历史条目在 `usr` 里记下压在哪一页上（`backgroundLocation`），条目自己说得清背景。
 *
 * 写：壳在决定打开详情的那一刻调 `holdOverlayBackground` 记下背景，push 详情地址时用 `overlayState` 带上；
 * 队列地址要等取完数才 push，背景仍是决定那一刻的，不是 push 那一刻的地址。详情之间换条沿用上一条的
 * 背景、不嵌套；只存路径与查询串，不存 DOM、对象或条目 `key`（刷新后对不上任何活条目）。
 *
 * 读：后退前进落到详情条目上时，壳调 `adoptOverlayState` 接上这一条记的背景，打开详情的那一处再用
 * `takeOverlayReturn` 取来处，关掉回到那一页。冷启动（刷新、新标签页、深链）不读：条目跨刷新仍带着
 * `usr`，下面那页却只补画了目录网格，关掉照旧回各自的缺省来处。 */
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

/** 条目里记的背景：详情与队列条目的 `usr` 里有 `{ backgroundLocation, overlay }`，别的条目没有。 */
export function backgroundOf(state: unknown): BackgroundLocation | null {
  const background = (state as { backgroundLocation?: Partial<BackgroundLocation> } | null)?.backgroundLocation;
  if (typeof background?.pathname !== 'string') return null;
  return { pathname: background.pathname, search: typeof background.search === 'string' ? background.search : '' };
}

let held: BackgroundLocation | null = null;
/* 后退前进接上的那一条的来处，打开详情时取一次就清：只给条目自己打开的那一下用，换条、展开小窗、
 * 盘回来重开这些在打开之后才发生的动作照旧按壳记的来处走。 */
let pendingReturn: string | null = null;

/** 决定打开详情的那一刻：当前在页面上就记下这一页；已经在详情地址上（同队列换条、关注组内换条、
 * 从详情点开另一条）沿用已记的背景，没有就不记，不把详情地址当背景。 */
export function holdOverlayBackground(): void {
  const { pathname, search } = window.location;
  if (!isOverlayPath(pathname)) held = { pathname, search };
}

/** 真正离开详情时清掉：关掉详情、删掉当前条目、后退前进与启动。 */
export function clearOverlayBackground(): void {
  held = null;
  pendingReturn = null;
}

/** 后退前进落到一条历史条目上：条目记了背景就接上，之后从这条详情换条、展开小窗照样带同一个背景；
 * 打开详情的那一处由 `takeOverlayReturn` 取它作来处。条目没记背景时什么都不做。 */
export function adoptOverlayState(state: unknown): void {
  const background = backgroundOf(state);
  if (!background) return;
  held = background;
  pendingReturn = background.pathname + background.search;
}

/** 打开详情时取后退前进接上的来处（路径加查询串），取一次就清；没有就是 null，壳用自己的缺省。 */
export function takeOverlayReturn(): string | null {
  const path = pendingReturn;
  pendingReturn = null;
  return path;
}

/** push 详情地址时带的 `usr`；没有背景就不带，和页面条目一样。 */
export function overlayState(overlay: OverlayKind): OverlayState | undefined {
  return held ? { backgroundLocation: { ...held }, overlay } : undefined;
}
