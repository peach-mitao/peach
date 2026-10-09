/* 客户端导航（ADR-0031「React Router 外壳阶段接管」）：React Router 的 Declarative 模式接管 history。
 * 管理区那几页、播放列表页与关注页、索引页与资料页、目录网格与垃圾队列，以及页面里的附属面（首页筛选条、
 * 首页新作行、目录页处理横幅、顶栏搜索下拉）与常驻面（底部批量条、侧栏配色卡、管理区页头、沉浸模式、设置面板、
 * 侧栏、详情舞台）（`managed-routes.tsx`）由这棵树画。管理区那几页由页面组按匹配打开（`pages/managed.tsx`），
 * 其余页面仍由壳的 `ROUTES` 表打开。
 *
 * 用底层的 `<Router>`，history 是 `@peach/history` 那一份：壳在 React 包到之前就要写地址，`<BrowserRouter>`
 * 自己建的 history 只听 `popstate`，看不见壳 push 进去的条目。也不用 `unstable_HistoryRouter`：它的更新
 * 默认包在 `startTransition` 里，接连两次变化会并成一次渲染，后退前进就少派发一次。
 *
 * 派发点与管理区宿主是两组 `<Routes>` 的兄弟，从头活到尾：后退前进照旧派发给壳，还归壳的那几屏由壳的准备动作
 * （收起舞台、铺骨架、认领表面）打开；画着的页面跟着登记的那几条走（`@peach/history` 的
 * `openManagedRoute`，每个容器一条），详情舞台压在上面、地址换成 `/item/:id` 时它留在原处。
 *
 * 路由分两组：页面组按条目自己记的背景（`usr.backgroundLocation`）匹配，详情压在哪一页上就还匹配那一页；
 * 覆盖组按真实地址匹配详情与队列那几条（`OVERLAY_PATHS`）。页面组里管理区、索引与资料三组挂着按地址打开那一页的
 * 元素（`pages/managed.tsx`、`pages/index-entity.tsx`），其余具体路由只声明路径；`path="*"` 不按路径设 key，
 * 同一个实例在非管理区地址之间从头活到尾。
 *
 * 一处渲染错误只带走抛错的那一面：每一面各套一层错误边界（`SurfaceBoundary`），根上不套，派发点与两组
 * `<Routes>` 不随某一面卸掉。错误经根的 `onCaughtError` 交给 `reportError`，每次一条。 */
import {
  Component, createContext, memo, useContext, useLayoutEffect, useMemo, useRef, useState, type ReactNode,
  type RefObject,
} from 'react';
import { createPortal, flushSync } from 'react-dom';
import { createRoot, type Root, type RootOptions } from 'react-dom/client';
import { Route, Router, Routes, useLocation, useNavigate, type NavigateFunction } from 'react-router';

import {
  backgroundOf, failManagedRoute, listenManagedEntry, managedEntries, OVERLAY_PATHS, peachHistory, routeSeen,
  type ManagedEntry, type Navigation,
} from '@peach/history';

import { Providers } from '../providers';
import {
  BROWSE_ROUTES, CATALOG_PATHS, ENTITY_ROUTES, INDEX_ROUTES, MANAGED_ROUTES, REDIRECT_ROUTES, isManagedPath, isRoutedPath,
  managedPage,
} from './managed-routes';
import type { ShellActions } from './shell-actions';

/* 每次历史变化的序号。地址没变的 `popstate`（同一条目重放）不会让 Router 的 location 变，
 * 但壳一向在每个 `popstate` 上重开那一屏，所以派发跟的是这个序号，不是 location。 */
const NavigationSeq = createContext(0);
/* 开次代次（`@peach/history` 的 `openEpoch`）：没人认领的历史变化各领一个，认领的写地址不领。 */
const OpenEpoch = createContext(0);

/** 当前这一页是第几次打开：页面元素按它挂 key，重开就重挂，认领的写地址（页内 replace 写参数）不重挂。 */
export const useOpenEpoch = (): number => useContext(OpenEpoch);

/** 壳交进来的能力，管理区那几页经它回到壳。 */
export const ShellActionsContext = createContext<ShellActions | null>(null);

/** 路由根在历史变化的同一调用里同步提交（`flushSync`）：`shellNavigate` 与后退前进返回时，两组 `<Routes>`
 *  的匹配已经换成新地址，上一页的元素已经卸掉，壳接着往同一个容器里写骨架不会撕掉 React 还管着的节点。
 *  派发不在这一次提交里跑：`RouteDispatch` 把它排进提交之后的微任务。 */
export function PeachRouter({ children }: { children: ReactNode }) {
  const [navigation, setNavigation] = useState<Navigation>(() => peachHistory.navigation);
  useLayoutEffect(() => {
    /* 从读初值到这里订阅之间有过变化的话，补上最新那一次。 */
    setNavigation(peachHistory.navigation);
    return peachHistory.listen((next) => { flushSync(() => setNavigation(next)) });
  }, []);
  return (
    <NavigationSeq.Provider value={navigation.seq}>
      <OpenEpoch.Provider value={navigation.openEpoch}>
        <Router location={navigation.location} navigationType={navigation.action} navigator={peachHistory}>
          {children}
        </Router>
      </OpenEpoch.Provider>
    </NavigationSeq.Provider>
  );
}

/** 派发点：每次历史变化报给 `routeSeen`，由它判断要不要让壳打开那一屏。
 *
 * 报在提交阶段之后的微任务里，不在 layout effect 里当场报：壳打开那一屏时，侧栏等常驻面的句柄内部用
 * `flushSync` 当场画完；在 React 的提交阶段里调 `flushSync` 不会同步刷新这同一棵根，句柄返回时就还没画上。
 * 微任务仍在这一次导航的同一轮里跑完，早于下一帧绘制。 */
function RouteDispatch() {
  const seq = useContext(NavigationSeq);
  useLayoutEffect(() => { queueMicrotask(() => routeSeen(seq)) }, [seq]);
  return null;
}

/* 跟着地址重渲染的只有这一格：它把当前的 `navigate` 交给管理区宿主，宿主与页面不随导航重渲染。 */
function NavigateInto({ target }: { target: RefObject<NavigateFunction | null> }) {
  const navigate = useNavigate();
  useLayoutEffect(() => { target.current = navigate });
  return null;
}

/** 管理区页面里的跳转：落在管理区那几页上的交给 React Router，别的路径交 `actions.navigate`（壳写好标题与
 * 侧栏）。两条路都不认领，各派发一次、领一个开次代次，打开次数与后退前进相同。 */
export function managedGo(path: string, actions: ShellActions, navigate: NavigateFunction): void {
  const target = new URL(path, window.location.href);
  if (!isManagedPath(target.pathname)) { actions.navigate(path); return }
  void navigate(`${target.pathname}${target.search}${target.hash}`);
}

/** 页面宿主：画壳在各个容器里登记的那一页（`#stats`、`#index`、`#grid` 与各附属面的容器各一页，互不相收）。
 *
 * 换页与收起都由 `@peach/history` 同步通知，这里用 `flushSync` 当场画完：壳在同一个任务里刚换上宿主
 * （或刚撤掉它），晚一拍画就是一帧空白。每次打开领一个代次，页面按代次重挂，首屏读的是刚取回的缓存。
 * 就地更新（`updateManagedRoute`）只换那一页的 props、代次不变，照常排进下一次渲染：壳的开关可能就是从
 * 页面自己的 effect 里推过来的，那里不能 `flushSync`。 */
function ManagedSurface() {
  const actions = useContext(ShellActionsContext);
  const [entries, setEntries] = useState<readonly ManagedEntry[]>(managedEntries);
  const navigate = useRef<NavigateFunction | null>(null);
  useLayoutEffect(() => {
    setEntries(managedEntries());
    return listenManagedEntry((next, sync) => {
      if (sync) flushSync(() => setEntries(next));
      else setEntries(next);
    });
  }, []);
  const go = useMemo(() => (path: string) => {
    if (actions && navigate.current) managedGo(path, actions, navigate.current);
  }, [actions]);
  return (
    <>
      <NavigateInto target={navigate} />
      {actions ? entries.map((entry) => (
        <SurfaceBoundary key={entry.revision} entry={entry}>
          <ManagedPortal entry={entry} actions={actions} go={go} />
        </SurfaceBoundary>)) : null}
    </>
  );
}

/** 一面一层的错误边界。接住之后这一面画成空，并撤掉它的登记与宿主（`failManagedRoute`），壳下次打开时重开；
 *  按代次挂 key，重开就是一个新的边界实例。上报不在这里：根的 `onCaughtError` 已经报过一次。 */
class SurfaceBoundary extends Component<{ entry: ManagedEntry; children: ReactNode }, { failed: boolean }> {
  override state = { failed: false };

  static getDerivedStateFromError(): { failed: boolean } {
    return { failed: true };
  }

  override componentDidCatch(): void {
    failManagedRoute(this.props.entry.container, this.props.entry.revision);
  }

  override render(): ReactNode {
    return this.state.failed ? null : this.props.children;
  }
}

const ManagedPortal = memo(function ManagedPortal(
  { entry, actions, go }: { entry: ManagedEntry; actions: ShellActions; go: (path: string) => void },
) {
  if (!isRoutedPath(entry.path)) return null;
  return createPortal(managedPage(entry.path, entry.props, actions, go), entry.host, String(entry.revision));
});

/* 页面组的 `location` 一直给（没有背景就给当前地址）：给与不给之间 `<Routes>` 会多包一层 `LocationContext`，
 * 来回切换就会把 `path="*"` 的元素拆掉重挂。
 * 两组按页面分段，段与段之间隔开几行：各组迁进来时只改自己那一段。 */
function RouteGroups({ children }: { children?: ReactNode }) {
  const location = useLocation();
  const background = backgroundOf(location.state);
  return (
    <>
      <Routes location={background ?? location}>
        {/* ── 管理区 ── */}
        {Object.entries(MANAGED_ROUTES).map(([path, route]) => <Route key={path} path={path} element={route.element} />)}
        {/* 旧直达地址：元素把它改写成 `/data-cleanup#resource-sync`，由数据管理页的元素打开。 */}
        {Object.entries(REDIRECT_ROUTES).map(([path, route]) => <Route key={path} path={path} element={route.element} />)}



        {/* ── 关注 ── */}
        {Object.keys(BROWSE_ROUTES).map((path) => <Route key={path} path={path} element={null} />)}



        {/* ── 索引 ── */}
        {Object.entries(INDEX_ROUTES).map(([path, route]) => <Route key={path} path={path} element={route.element} />)}



        {/* ── 资料 ── */}
        {Object.entries(ENTITY_ROUTES).map(([path, route]) => <Route key={path} path={path} element={route.element} />)}



        {/* ── 目录 ── */}
        {CATALOG_PATHS.map((path) => <Route key={path} path={path} element={null} />)}



        {/* ── 沉浸 ── `/immerse` 落在下面的 `path="*"`。 */}
        <Route path="*" element={children} />
      </Routes>



      {/* ── 覆盖 ── */}
      <Routes>
        {OVERLAY_PATHS.map((path) => <Route key={path} path={path} element={null} />)}
        <Route path="*" element={null} />
      </Routes>
    </>
  );
}

/** 整棵路由树。`children` 画在页面组 `path="*"` 的元素里面，只给测试用：跟着它挂一次就说明元素没被重挂。 */
export function RouterRoot({ children, actions = null }: { children?: ReactNode; actions?: ShellActions | null }) {
  return (
    <Providers>
      <ShellActionsContext.Provider value={actions}>
        <PeachRouter>
          <RouteDispatch />
          <ManagedSurface />
          <RouteGroups>{children}</RouteGroups>
        </PeachRouter>
      </ShellActionsContext.Provider>
    </Providers>
  );
}

/** 路由树那棵根的选项。错误边界接住的错误交给全局 `reportError`，和没人接住时 React 的上报同一条路，
 *  控制台与 window 的 `error` 事件各见一次。运行时才取 `reportError`：测试环境里可能没有它。 */
export const ROUTER_ROOT_OPTIONS: RootOptions = {
  onCaughtError: (error) => { globalThis.reportError?.(error) },
};

/* 根建在一个不进文档的容器上：页面经 portal 画进壳的 `#stats`、`#index`、`#grid` 与各附属面的容器，别的地方
 * 什么都不画。
 * 第一次渲染同步做完，宿主在 `loadRouter` 落定之前就已经订阅：壳打开的第一页取齐时它一定在听。 */
let root: Root | null = null;
export function configureRouter(actions: ShellActions): void {
  if (root) return;
  root = createRoot(document.createElement('div'), ROUTER_ROOT_OPTIONS);
  const mounted = root;
  flushSync(() => mounted.render(<RouterRoot actions={actions} />));
}
