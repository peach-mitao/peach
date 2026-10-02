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
 * `shellNavigate`。 */
import { UNSAFE_createBrowserHistory, type Location, type NavigationType, type Navigator, type To } from 'react-router';

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

browser.listen(({ action, location }) => {
  seq += 1;
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
  if (replace) browser.replace(to, state);
  else browser.push(to, state);
}
