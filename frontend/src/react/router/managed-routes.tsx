/* 管理区由路由画的那几页：路径到首屏取数与整页的对照表。
 *
 * 壳每次打开一页时交进来的 `open` 只带那一次才算得出的值（地址上的分类与页签、只读状态、引导标记、
 * 一次性预填）；回执与换到还归壳的那几屏走 `ShellActions`。这几页之间的跳转走 `go`：路由树里有的
 * 路径交给 React Router 的 `navigate`，其余交壳。 */
import type { ReactElement } from 'react';

import { ActivityPage } from '../activity/activity-page';
import { prefetchTasks } from '../activity/tasks';
import { prefetchScraping } from '../scraping/scraping';
import { ScrapingPage } from '../scraping/scraping-page';
import type { ManagedOpenProps, ManagedPath, ShellActions } from './shell-actions';

interface ManagedRoute<P> {
  prefetch(open: P, signal: AbortSignal): Promise<void>;
  page(open: P, actions: ShellActions, go: (path: string) => void): ReactElement;
}

type ManagedRouteTable = { [Path in ManagedPath]: ManagedRoute<ManagedOpenProps[Path]> };

/* 第一帧在宿主放进 `#stats` 的同一个任务里同步画完（`router.tsx` 的 `ManagedSurface`）：骨架已经撤掉，
 * 晚一拍画就是一帧空白。 */
export const MANAGED_ROUTES: ManagedRouteTable = {
  '/scraping': {
    prefetch: (_open, signal) => prefetchScraping(signal),
    page: (_open, actions) => <ScrapingPage toast={(message) => actions.toast(message)} />,
  },
  '/activity': {
    prefetch: (_open, signal) => prefetchTasks(signal),
    page: (open) => <ActivityPage {...(open.prefill ? { prefill: open.prefill } : {})} />,
  },
};

export const isManagedPath = (path: string): path is ManagedPath => Object.hasOwn(MANAGED_ROUTES, path);

/** 首屏取数（`openManagedRoute` 经 `connectManagedRoutes` 调它）。 */
export function prefetchManagedRoute(path: string, open: object, signal: AbortSignal): Promise<void> {
  if (!isManagedPath(path)) return Promise.reject(new Error(`路由树里没有这一页：${path}`));
  const route = MANAGED_ROUTES[path] as ManagedRoute<object>;
  return route.prefetch(open, signal);
}

/** 画这一页。 */
export function managedPage(path: ManagedPath, open: object, actions: ShellActions, go: (path: string) => void) {
  const route = MANAGED_ROUTES[path] as ManagedRoute<object>;
  return route.page(open, actions, go);
}
