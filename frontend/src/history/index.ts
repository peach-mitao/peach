/* 全站唯一的浏览器历史（`@peach/history`）。
 *
 * 壳（`web/app.js`）从 `peach-ui.js` 取，React 包按 `@peach/history` 写，构建时改写成 `/dist/peach-ui.js`，
 * 实例全站只有一个。壳在启动路径上就要写地址（清理启动地址、垃圾页重定向），那时 `peach-react.js`
 * 可能还没到，所以它跟 `QueryClient` 一样建在这一份产物里，不等 React 包。
 *
 * 实现是 React Router 自己的 `createBrowserHistory`（`v5Compat` 档：push / replace 也通知监听者），
 * 和它的 `<Router>` 读写的是同一种 `{usr, key, idx}` 历史条目，不另引一份 history 库。它只收一个
 * 监听者，而且要有监听者才挂 `popstate`：这里一建好就由本模块接上，再分发给各个订阅者，所以页面
 * 一加载就在数后退与前进，不等谁来订阅。
 *
 * 每一次历史变化（壳写的、React 子树写的、后退前进）都领一个递增的序号 `seq`。壳写地址走
 * `shellNavigate`，那一次的序号当场认领：壳写完地址自己打开那一屏，不再派发。后退前进与 React 子树
 * 写的那几次留给 `<Router>`，由它在渲染到那个序号时报给 `routeSeen`，再派发给壳（`startRouting` 交进来的
 * `restoreRoute`）。判据用序号不用地址：同一条目重放的 `popstate` 地址不变，壳照样要重开那一屏。
 * 派发带上来由（`RouteOrigin`）：启动那一次是 `'boot'`，之后都是 `'history'`。 */
import { UNSAFE_createBrowserHistory, type Location, type NavigationType, type Navigator, type To } from 'react-router';

import { isOverlayPath, overlayState, type OverlayKind } from './overlay';

/** 一次历史变化：动作、变化之后的地址，和它领到的序号。 */
export interface Navigation {
  action: NavigationType;
  location: Location;
  seq: number;
}

export type NavigationListener = (navigation: Navigation) => void;

/** 给 `<Router navigator>` 用的那一份，外加当前这一次变化与订阅。 */
export interface PeachHistory extends Navigator {
  readonly navigation: Navigation;
  listen(listener: NavigationListener): () => void;
}

const browser = UNSAFE_createBrowserHistory({ v5Compat: true });
let seq = 0;
let current: Navigation = { action: browser.action, location: browser.location, seq };
const listeners = new Set<NavigationListener>();
/* 已经派发过、或不该派发的最大序号。`claiming` 只在 `shellNavigate` 写地址那一下为真。 */
let claimed = 0;
let claiming = false;
let dispatcher: RouteDispatcher | null = null;

/** 派发的来由：`'boot'` 是页面加载后的第一次（刷新、新标签页、深链都算），`'history'` 是之后的后退前进与
 * React 子树写的地址。`usr` 跨刷新存活，壳要靠它分清条目里记的背景能不能读。 */
export type RouteOrigin = 'boot' | 'history';
export type RouteDispatcher = (origin: RouteOrigin) => Promise<void> | void;

browser.listen(({ action, location }) => {
  seq += 1;
  if (claiming) claimed = seq;
  current = { action, location, seq };
  for (const listener of [...listeners]) listener(current);
});

export const peachHistory: PeachHistory = {
  get navigation() { return current },
  listen(listener) {
    listeners.add(listener);
    return () => { listeners.delete(listener) };
  },
  createHref: (to) => browser.createHref(to),
  createURL: (to) => browser.createURL(to),
  encodeLocation: (to) => browser.encodeLocation(to),
  go: (delta) => browser.go(delta),
  push: (to, state) => browser.push(to, state),
  replace: (to, state) => browser.replace(to, state),
};

export interface ShellNavigateOptions {
  replace?: boolean;
  /** 新条目的 `usr` 状态。清理地址时传 `peachHistory.navigation.location.state`，原样保住当前那一份。 */
  state?: unknown;
}

/** 壳写地址：push 或 replace 一条。
 *
 * 路径先按当前地址解析成绝对的：壳传进来的有相对路径、有只带查询串的，也有整条 href，
 * `history.pushState` 本来就是这样解析的；React Router 的 `To` 只认路径，`#x` 这种会丢掉查询串。 */
export function shellNavigate(path: string | URL, { replace = false, state }: ShellNavigateOptions = {}): void {
  const url = new URL(path, window.location.href);
  const to: To = `${url.pathname}${url.search}${url.hash}`;
  claiming = true;
  try {
    if (replace) browser.replace(to, state);
    else browser.push(to, state);
  } finally {
    claiming = false;
  }
}

/** 壳启动时派发第一次，此后的派发交给 `routeSeen`。
 *
 * 到这一刻为止的历史变化都算启动这一次的：`<Router>` 先挂上的话，它挂上时报的那个序号已经过去，
 * 不会再派发；后挂上的话，它读到的初值就是这里认领的序号。只调一次，这一次的来由是 `'boot'`。 */
export function startRouting(dispatch: RouteDispatcher): Promise<void> {
  dispatcher = dispatch;
  claimed = seq;
  return Promise.resolve(dispatch('boot'));
}

/** `<Router>` 渲染到第 `seen` 次历史变化时报到这里：壳还没开始路由、或这一次已经认领过，就不派发。
 * 派发出去的来由是 `'history'`。 */
export function routeSeen(seen: number): void {
  if (!dispatcher || seen <= claimed) return;
  claimed = seen;
  void dispatcher('history');
}

/** 原地改写当前详情条目压着的详情种类：作品详情取数后转成关注详情时地址照旧是 `/item/:id`，内容换了。
 * 背景不变，条目数不变；当前不在详情地址上、或没有记下背景时什么都不做。 */
export function retagOverlay(overlay: OverlayKind): void {
  const state = overlayState(overlay);
  if (!state || !isOverlayPath(window.location.pathname)) return;
  shellNavigate(window.location.href, { replace: true, state });
}

export {
  adoptOverlayState, backgroundOf, clearOverlayBackground, holdOverlayBackground, isOverlayPath, OVERLAY_PATHS,
  overlayState, takeOverlayReturn,
  type BackgroundLocation, type OverlayKind, type OverlayState,
} from './overlay';
export {
  connectManagedRoutes, failManagedRoute, listenManagedEntry, managedEntries, managedEntry, managedTaken, openManagedRoute,
  preloadManagedRoutes, releaseManagedRoute, updateManagedRoute,
  type ManagedEntry, type ManagedOpenOptions, type ManagedPrefetch,
} from './managed';
