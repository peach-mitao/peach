/* 客户端导航（ADR-0031「React Router 外壳阶段接管」）：React Router 的 Declarative 模式接管 history。
 * 管理区那几页（`managed-routes.tsx`）由这棵树画，其余页面仍由壳的 `ROUTES` 表打开。
 *
 * 用底层的 `<Router>`，history 是 `@peach/history` 那一份：壳在 React 包到之前就要写地址，`<BrowserRouter>`
 * 自己建的 history 只听 `popstate`，看不见壳 push 进去的条目。也不用 `unstable_HistoryRouter`：它的更新
 * 默认包在 `startTransition` 里，接连两次变化会并成一次渲染，后退前进就少派发一次。
 *
 * 派发点与管理区宿主是 `<Routes>` 的兄弟，从头活到尾：后退前进照旧派发给壳，由壳的准备动作（收起舞台、
 * 铺骨架、认领表面）打开那一屏；管理区那一页跟着壳登记的那一条走（`@peach/history` 的
 * `openManagedRoute`），详情舞台压在上面、地址换成 `/item/:id` 时它留在原处。`<Routes>` 里那几条具体
 * 路由只声明路径，`path="*"` 不按路径设 key，同一个实例在非管理区地址之间从头活到尾。 */
import {
  createContext, memo, useContext, useLayoutEffect, useMemo, useRef, useState, type ReactNode, type RefObject,
} from 'react';
import { createPortal, flushSync } from 'react-dom';
import { createRoot, type Root } from 'react-dom/client';
import { Route, Router, Routes, useNavigate, type NavigateFunction } from 'react-router';

import {
  listenManagedEntry, managedEntry, peachHistory, routeSeen, type ManagedEntry, type Navigation,
} from '@peach/history';

import { Providers } from '../providers';
import { MANAGED_ROUTES, isManagedPath, managedPage } from './managed-routes';
import type { ShellActions } from './shell-actions';

/* 每次历史变化的序号。地址没变的 `popstate`（同一条目重放）不会让 Router 的 location 变，
 * 但壳一向在每个 `popstate` 上重开那一屏，所以派发跟的是这个序号，不是 location。 */
const NavigationSeq = createContext(0);

/** 壳交进来的能力，管理区那几页经它回到壳。 */
export const ShellActionsContext = createContext<ShellActions | null>(null);

export function PeachRouter({ children }: { children: ReactNode }) {
  const [navigation, setNavigation] = useState<Navigation>(() => peachHistory.navigation);
  useLayoutEffect(() => {
    /* 从读初值到这里订阅之间有过变化的话，补上最新那一次。 */
    setNavigation(peachHistory.navigation);
    return peachHistory.listen(setNavigation);
  }, []);
  return (
    <NavigationSeq.Provider value={navigation.seq}>
      <Router location={navigation.location} navigationType={navigation.action} navigator={peachHistory}>
        {children}
      </Router>
    </NavigationSeq.Provider>
  );
}

/** 派发点：每次历史变化报给 `routeSeen`，由它判断要不要让壳打开那一屏。
 *
 * 报在提交阶段之后的微任务里，不在 layout effect 里当场报：壳打开那一屏时会用 `flushSync` 画侧栏等岛，
 * 顺带把别的根排着的更新同步刷掉；在 React 的提交阶段里调 `flushSync` 不会同步刷新，那些根就晚一拍。
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

/** 管理区页面里的跳转：落在路由树这几页上的交给 React Router（派发照旧回到壳，打开次数与壳自己写地址
 * 再打开相同），别的路径交壳自己写地址、按路由表打开。 */
export function managedGo(path: string, actions: ShellActions, navigate: NavigateFunction): void {
  const target = new URL(path, window.location.href);
  if (!isManagedPath(target.pathname)) { actions.navigate(path); return }
  void navigate(`${target.pathname}${target.search}${target.hash}`);
}

/** 管理区宿主：画壳登记的那一页。
 *
 * 换页与收起都由 `@peach/history` 同步通知，这里用 `flushSync` 当场画完：壳在同一个任务里刚换上宿主
 * （或刚撤掉它），晚一拍画就是一帧空白。每次打开领一个代次，页面按代次重挂，首屏读的是刚取回的缓存。 */
function ManagedSurface() {
  const actions = useContext(ShellActionsContext);
  const [entry, setEntry] = useState<ManagedEntry | null>(managedEntry);
  const navigate = useRef<NavigateFunction | null>(null);
  useLayoutEffect(() => {
    setEntry(managedEntry());
    return listenManagedEntry((next) => { flushSync(() => setEntry(next)) });
  }, []);
  const go = useMemo(() => (path: string) => {
    if (actions && navigate.current) managedGo(path, actions, navigate.current);
  }, [actions]);
  return (
    <>
      <NavigateInto target={navigate} />
      {entry && actions ? <ManagedPortal entry={entry} actions={actions} go={go} /> : null}
    </>
  );
}

const ManagedPortal = memo(function ManagedPortal(
  { entry, actions, go }: { entry: ManagedEntry; actions: ShellActions; go: (path: string) => void },
) {
  if (!isManagedPath(entry.path)) return null;
  return createPortal(managedPage(entry.path, entry.props, actions, go), entry.host, String(entry.revision));
});

/** 整棵路由树。`children` 画在 `path="*"` 的元素里面，只给测试用：跟着它挂一次就说明元素没被重挂。 */
export function RouterRoot({ children, actions = null }: { children?: ReactNode; actions?: ShellActions | null }) {
  return (
    <Providers>
      <ShellActionsContext.Provider value={actions}>
        <PeachRouter>
          <RouteDispatch />
          <ManagedSurface />
          <Routes>
            {Object.keys(MANAGED_ROUTES).map((path) => <Route key={path} path={path} element={null} />)}
            {/* 旧直达地址：壳把它改写成 `/data-cleanup#resource-sync` 再打开数据管理页。 */}
            <Route path="/resource-sync" element={null} />
            <Route path="*" element={children} />
          </Routes>
        </PeachRouter>
      </ShellActionsContext.Provider>
    </Providers>
  );
}

/* 根建在一个不进文档的容器上：管理区页面经 portal 画进壳的 `#stats`，别的地方什么都不画。
 * 第一次渲染同步做完，宿主在 `loadRouter` 落定之前就已经订阅：壳打开的第一页取齐时它一定在听。 */
let root: Root | null = null;
export function configureRouter(actions: ShellActions): void {
  if (root) return;
  root = createRoot(document.createElement('div'));
  const mounted = root;
  flushSync(() => mounted.render(<RouterRoot actions={actions} />));
}
