/* 由路由画的那几页（ADR-0031「路由段」）：壳决定什么时候开、什么时候收，React 路由树画。
 *
 * 页面画进壳的两个容器：管理区正文 `#stats`，和索引页与资料页共用的 `#index`。一个容器同时只有一页，
 * 两个容器各记各的：资料页画进 `#index` 时，管理区那一页只是被壳藏起来、照旧活着（有轮询的页面照着原
 * 节律取数），等壳下一次认领表面（`claimSurface`）才两个一起收。页面跟着这里登记的那一条走，不跟着地址
 * 匹配走：详情舞台压在页面上时地址是 `/item/:id`，页面要留着。
 *
 * 一次打开：壳铺好骨架后调 `openManagedRoute`，这里先收起同一容器里的上一页，再取首屏；取齐、壳也还停在
 * 这一页时，在同一个任务里换掉骨架、放进宿主，再让路由树同步画出整页。每次打开都领一个新代次，页面按
 * 代次重挂、重取。打开之后壳的开关（选择模式、换筛选、换版式）经 `updateManagedRoute` 合进同一页的
 * props：代次不变，页面就地重渲染，不重挂也不重取。 */

/** 画在某个容器里的那一页。`host` 是页面 portal 进去的那个 `.peach-react` 宿主。 */
export interface ManagedEntry {
  path: string;
  props: object;
  revision: number;
  /** 壳的容器（`#stats` 或 `#index`）。 */
  container: Element;
  host: HTMLElement;
}

/** 路由树交给这里的首屏取数：按页面路径取，中止后抛 `AbortError`。 */
export type ManagedPrefetch = (path: string, props: object, signal: AbortSignal) => Promise<void>;

export interface ManagedOpenOptions {
  /** 页面画进的容器（`#stats` 或 `#index`）。 */
  container: Element;
  /** 壳的换页判据：取数期间用户走开了，就不画。 */
  isCurrent: () => boolean;
  /** 壳自己排好的框架：取齐首屏的那一刻由它把框架换进容器，返回页面画进去的宿主。不给就清空容器、
   *  放进一个新的 `.peach-react`。资料页要这个：浮层吸顶要它的父盒就是 `#index`，新作那一行是遗留层
   *  卡片、不进 `.peach-react`，所以框架的四块由壳排，页面只占其中一块，再经 portal 画进另外三块。 */
  place?: (container: Element) => HTMLElement;
}

/** 订阅者收到的是此刻各个容器里的页面。`sync` 为真时要当场画完：壳在同一个任务里刚换上或撤掉宿主，
 *  晚一拍就是一帧空白。为假是就地更新，照常排进下一次渲染，同岛时代 `updateIsland` 的节律。 */
type ManagedListener = (entries: readonly ManagedEntry[], sync: boolean) => void;

interface Pending { revision: number; controller: AbortController }

let prefetcher: Promise<ManagedPrefetch> | null = null;
const entries = new Map<Element, ManagedEntry>();
const pending = new Map<Element, Pending>();
let revision = 0;
const listeners = new Set<ManagedListener>();

/** 路由树装载时接上取数。装载失败时，等着它的打开跟着失败。 */
export function connectManagedRoutes(ready: Promise<ManagedPrefetch>): void {
  prefetcher = ready;
  ready.catch(() => {});
}

/** 此刻画在这个容器里的那一页；还在取首屏或已经收起时是 null。 */
export function managedEntry(container: Element): ManagedEntry | null {
  return entries.get(container) ?? null;
}
/** 此刻画着的全部页面，路由树按它画 portal。 */
export const managedEntries = (): readonly ManagedEntry[] => [...entries.values()];

/** 路由树订阅：每次换页、收起或就地更新都同步通知。 */
export function listenManagedEntry(listener: ManagedListener): () => void {
  listeners.add(listener);
  return () => { listeners.delete(listener) };
}

function notify(sync: boolean): void {
  const shown = managedEntries();
  for (const listener of [...listeners]) listener(shown, sync);
}

/** 打开一页并等首屏落地。画上了回 true；期间被收起、被重开或壳已换页回 false。 */
export async function openManagedRoute(path: string, props: object, options: ManagedOpenOptions): Promise<boolean> {
  const { container } = options;
  releaseManagedRoute(container);
  if (!options.isCurrent()) return false;
  if (!prefetcher) throw new Error('客户端导航还没装载，路由树的页面无从画起');
  revision += 1;
  const mine: Pending = { revision, controller: new AbortController() };
  pending.set(container, mine);
  const prefetch = await prefetcher;
  try {
    await prefetch(path, props, mine.controller.signal);
  } catch {
    // 中止就是用户已经走开。其余失败照画：原因和重试的节律都在页面自己手里。
    if (mine.controller.signal.aborted) return false;
  }
  if (pending.get(container) !== mine) return false;
  pending.delete(container);
  if (!options.isCurrent()) return false;
  const host = options.place ? options.place(container) : defaultHost(container);
  entries.set(container, { path, props, revision: mine.revision, container, host });
  notify(true);
  return true;
}

/* token、Preflight 与焦点规则都作用在 `.peach-react` 上；容器归壳，所以另建一个，收起时连它一起撤掉。 */
function defaultHost(container: Element): HTMLElement {
  const host = container.ownerDocument.createElement('div');
  host.className = 'peach-react';
  container.textContent = '';
  container.append(host);
  return host;
}

/** 把壳的开关合进此刻画着的那一页：代次不变，页面就地重渲染，不重挂、不重取。那个容器里还没画上
 *  （还在取首屏或已经收起）时是空操作，打开时交进去的那一份照旧。 */
export function updateManagedRoute(container: Element, patch: object): void {
  const shown = entries.get(container);
  if (!shown) return;
  entries.set(container, { ...shown, props: { ...shown.props, ...patch } });
  notify(false);
}

/** 收起容器里的那一页：中止在途的首屏取数，卸掉页面并撤掉宿主。不给容器就全部收起，壳换页认领表面
 *  时用。没有页面时是空操作。 */
export function releaseManagedRoute(container?: Element): void {
  const targets = container ? [container] : [...new Set([...pending.keys(), ...entries.keys()])];
  const removed: ManagedEntry[] = [];
  for (const target of targets) {
    const inflight = pending.get(target);
    if (inflight) {
      inflight.controller.abort();
      pending.delete(target);
    }
    const shown = entries.get(target);
    if (shown) {
      entries.delete(target);
      removed.push(shown);
    }
  }
  if (!removed.length) return;
  notify(true);
  for (const shown of removed) shown.host.remove();
}
