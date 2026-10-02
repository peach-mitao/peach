/* 客户端导航（ADR-0031「React Router 外壳阶段接管」）：React Router 的 Declarative 模式接管 history，
 * 页面仍由壳的 `ROUTES` 表打开。
 *
 * 用底层的 `<Router>`，history 是 `@peach/history` 那一份：壳在 React 包到之前就要写地址，`<BrowserRouter>`
 * 自己建的 history 只听 `popstate`，看不见壳 push 进去的条目。也不用 `unstable_HistoryRouter`：它的更新
 * 默认包在 `startTransition` 里，接连两次变化会并成一次渲染，后退前进就少派发一次。
 *
 * 只有一条 `path="*"`，元素是 `LegacyRoutes`，它不按路径设 key：同一个实例从头活到尾，导航只让它
 * 重渲染、不重挂，壳的遗留面与压在列表上的详情舞台都不受牵连。 */
import { createContext, useContext, useLayoutEffect, useState, type ReactNode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { Route, Router, Routes } from 'react-router';

import { peachHistory, routeSeen, type Navigation } from '@peach/history';

/* 每次历史变化的序号。地址没变的 `popstate`（同一条目重放）不会让 Router 的 location 变，
 * 但壳一向在每个 `popstate` 上重开那一屏，所以派发跟的是这个序号，不是 location。 */
const NavigationSeq = createContext(0);

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

/** 遗留路由的派发点：每次历史变化报给 `routeSeen`，由它判断要不要让壳打开那一屏。
 *
 * 报在提交阶段之后的微任务里，不在 layout effect 里当场报：壳打开那一屏时会用 `flushSync` 画侧栏等岛，
 * 顺带把别的根排着的更新同步刷掉；在 React 的提交阶段里调 `flushSync` 不会同步刷新，那些根就晚一拍。
 * 微任务仍在这一次导航的同一轮里跑完，早于下一帧绘制。 */
function LegacyRoutes({ children }: { children?: ReactNode }) {
  const seq = useContext(NavigationSeq);
  useLayoutEffect(() => { queueMicrotask(() => routeSeen(seq)) }, [seq]);
  return children;
}

/** 整棵路由树。`children` 画在遗留路由的元素里面，只给测试用：跟着它挂一次就说明元素没被重挂。 */
export function RouterRoot({ children }: { children?: ReactNode }) {
  return (
    <PeachRouter>
      <Routes>
        <Route path="*" element={<LegacyRoutes>{children}</LegacyRoutes>} />
      </Routes>
    </PeachRouter>
  );
}

/* 根建在一个不进文档的容器上：这一步路由树什么都不画，页面 DOM 与接管前一致。 */
let root: Root | null = null;
export function configureRouter(): void {
  if (root) return;
  root = createRoot(document.createElement('div'));
  root.render(<RouterRoot />);
}
