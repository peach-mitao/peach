/* 管理区正文由路由画的那几页（ADR-0031「路由段」）：壳决定什么时候开、什么时候收，React 路由树画。
 *
 * 页面画进 `#stats`。那个容器归壳：壳的骨架、播放列表与关注页也画在里面，换页时壳在 `claimSurface`
 * 里收走上一页。所以页面跟着这里登记的那一条走，不跟着地址匹配走：详情舞台压在页面上时地址是
 * `/item/:id`，页面要留着，等壳下一次认领表面才收。
 *
 * 一次打开：壳铺好骨架后调 `openManagedRoute`，这里取首屏，取齐、壳也还停在这一页时，在同一个任务里
 * 清掉骨架、放进宿主，再让路由树同步画出整页。每次打开都领一个新代次，页面按代次重挂、重取，
 * 和此前每次打开都重挂一棵根一样。 */

/** 此刻画在管理区正文里的那一页。`host` 是放进 `#stats` 的那个 `.peach-react` 容器。 */
export interface ManagedEntry {
  path: string;
  props: object;
  revision: number;
  host: HTMLElement;
}

/** 路由树交给这里的首屏取数：按页面路径取，中止后抛 `AbortError`。 */
export type ManagedPrefetch = (path: string, props: object, signal: AbortSignal) => Promise<void>;

export interface ManagedOpenOptions {
  /** 页面画进的容器（`#stats`）。 */
  container: Element;
  /** 壳的换页判据：取数期间用户走开了，就不画。 */
  isCurrent: () => boolean;
}

type ManagedListener = (entry: ManagedEntry | null) => void;

let prefetcher: Promise<ManagedPrefetch> | null = null;
let entry: ManagedEntry | null = null;
let pending: { revision: number; controller: AbortController } | null = null;
let revision = 0;
const listeners = new Set<ManagedListener>();

/** 路由树装载时接上取数。装载失败时，等着它的打开跟着失败。 */
export function connectManagedRoutes(ready: Promise<ManagedPrefetch>): void {
  prefetcher = ready;
  ready.catch(() => {});
}

export const managedEntry = (): ManagedEntry | null => entry;

/** 路由树订阅：每次换页或收起都同步通知，路由树当场画完。 */
export function listenManagedEntry(listener: ManagedListener): () => void {
  listeners.add(listener);
  return () => { listeners.delete(listener) };
}

function present(next: ManagedEntry | null): void {
  entry = next;
  for (const listener of [...listeners]) listener(next);
}

/** 打开一页并等首屏落地。画上了回 true；期间被收起、被重开或壳已换页回 false。 */
export async function openManagedRoute(path: string, props: object, options: ManagedOpenOptions): Promise<boolean> {
  releaseManagedRoute();
  if (!options.isCurrent()) return false;
  if (!prefetcher) throw new Error('客户端导航还没装载，管理区页面无从画起');
  revision += 1;
  const mine = { revision, controller: new AbortController() };
  pending = mine;
  const prefetch = await prefetcher;
  try {
    await prefetch(path, props, mine.controller.signal);
  } catch {
    // 中止就是用户已经走开。其余失败照画：原因和重试的节律都在页面自己手里。
    if (mine.controller.signal.aborted) return false;
  }
  if (pending !== mine) return false;
  pending = null;
  if (!options.isCurrent()) return false;
  // token、Preflight 与焦点规则都作用在 `.peach-react` 上；容器归壳，所以另建一个，收起时连它一起撤掉。
  const host = options.container.ownerDocument.createElement('div');
  host.className = 'peach-react';
  options.container.textContent = '';
  options.container.append(host);
  present({ path, props, revision: mine.revision, host });
  return true;
}

/** 收起管理区正文里的那一页：中止在途的首屏取数，卸掉页面并撤掉宿主。没有页面时是空操作。 */
export function releaseManagedRoute(): void {
  if (pending) {
    pending.controller.abort();
    pending = null;
  }
  const shown = entry;
  if (!shown) return;
  present(null);
  shown.host.remove();
}
