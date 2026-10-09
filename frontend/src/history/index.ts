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
 * 每一次历史变化（壳写的、React 子树写的、后退前进）都领一个递增的序号 `seq`。壳写地址走 `shellNavigate`，
 * 那一次当场认领（`claimed`）：页面元素保持代次，覆盖元素接走这一次的打开请求。后退前进、React
 * 子树写的与壳经 `peachHistory` 直接写的那几次没人认领，另领一个开次代次（`openEpoch`）：每一次都要把那一页
 * 按地址重开一遍。代次在通知订阅者之前就定了，路由根同步提交那一次渲染里读到的已经是新代次，页面按它挂 key，
 * 一次打开只挂一次。判据用序号与代次不用地址：同一条目重放的 `popstate` 地址不变，那一页照样要重开。 */
import { UNSAFE_createBrowserHistory, type Location, type NavigationType, type Navigator, type To } from 'react-router';

import { backgroundOf, isOverlayPath, overlayState, type BackgroundLocation, type OverlayKind } from './overlay';

/** 一次历史变化：动作、变化之后的地址、它领到的序号、到这一次为止的开次代次，和这一次是不是壳认领写的。 */
export interface Navigation {
  action: NavigationType;
  location: Location;
  seq: number;
  openEpoch: number;
  claimed: boolean;
}

export type NavigationListener = (navigation: Navigation) => void;

/** 给 `<Router navigator>` 用的那一份，外加当前这一次变化与订阅。 */
export interface PeachHistory extends Navigator {
  readonly navigation: Navigation;
  listen(listener: NavigationListener): () => void;
}

const browser = UNSAFE_createBrowserHistory({ v5Compat: true });
let seq = 0;
let openEpoch = 0;
let current: Navigation = { action: browser.action, location: browser.location, seq, openEpoch, claimed: true };
const listeners = new Set<NavigationListener>();
/* `claiming` 只在 `shellNavigate` 写地址那一下为真。 */
let claiming = false;
/* 还停在页面加载时的那一条上：之后只经 replace 改写过（清理启动地址、页内写参数），没 push、没后退前进。 */
let onBootEntry = true;

browser.listen(({ action, location }) => {
  seq += 1;
  if (!claiming) openEpoch += 1;
  if (action !== 'REPLACE') onBootEntry = false;
  current = { action, location, seq, openEpoch, claimed: claiming };
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

/** 壳写地址：push 或 replace 一条，当场认领。
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

/** 当前条目是不是页面加载时的那一条（刷新、新标签页、深链）。 */
export const bootEntry = (): boolean => onBootEntry;

/** 页面组按它匹配的背景：当前条目在 `usr` 里记的那一页。启动那一条不读（ADR-0031「详情条目记下压在哪一页
 *  上」）：`usr` 跨刷新仍在，下面那一页却从没画过，刷新、新标签页与深链落在详情上一律当作没有背景。 */
export function navigationBackground(): BackgroundLocation | null {
  return onBootEntry ? null : backgroundOf(current.location.state);
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
  overlayState, overlayTarget, takeOverlayReturn,
  type BackgroundLocation, type OverlayKind, type OverlayPath, type OverlayState, type OverlayTarget,
} from './overlay';
export { ROUTE_META, routeMetaOf, type RouteMeta } from './route-meta';
export {
  connectManagedRoutes, failManagedRoute, listenManagedEntry, managedEntries, managedEntry, managedTaken, openManagedRoute,
  openResidentSurface, preloadManagedRoutes, releaseManagedRoute, updateManagedRoute,
  type ManagedEntry, type ManagedOpenOptions, type ManagedPrefetch,
} from './managed';
