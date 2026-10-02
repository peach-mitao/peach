/* 客户端导航（`src/react/router/`）：只有后退前进、React 子树里的 `navigate` 和启动会让壳打开那一屏；
 * 壳自己写地址不派发；启动不论 Router 先挂还是后挂都只派发一次；`path="*"` 的元素在非管理区地址之间从头到尾
 * 是同一个实例。管理区那几页的宿主见 `managed-routes.test.tsx`。
 *
 * 历史对象与派发状态都是模块级的，和页面上只有一份一致，所以每条用例重新装载 `src/history` 与
 * `src/react/router`。React 与 React Router 在 node_modules 里，不随之重载，组件照常写 JSX。 */
import { act, useEffect, type ReactNode } from 'react';
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { useLocation, useNavigate } from 'react-router';
import { afterEach, beforeAll, expect, it, vi } from 'vitest';

// 首次导入会编译路由表带进来的整棵页面子树，编译等待使用独立的有限窗口；之后每条用例重新装载只重跑模块。
const REACT_IMPORT_TIMEOUT_MS = 30_000;

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

beforeAll(async () => { await import('../../src/react/router/router') }, REACT_IMPORT_TIMEOUT_MS);

async function load() {
  vi.resetModules();
  window.history.replaceState(null, '', '/');
  const [history, router] = await Promise.all([import('../../src/history'), import('../../src/react/router/router')]);
  return { ...history, ...router };
}
type Loaded = Awaited<ReturnType<typeof load>>;

const unmounts: Array<() => void> = [];
afterEach(async () => {
  for (const unmount of unmounts.splice(0)) await act(async () => { unmount() });
});

async function mount(r: Loaded, children?: ReactNode) {
  const root = createRoot(document.createElement('div'));
  await act(async () => { root.render(<r.RouterRoot>{children}</r.RouterRoot>) });
  unmounts.push(() => root.unmount());
}

/** 浏览器自己的后退前进：地址先变，再派发 `popstate`；不给地址就是同一条目重放。 */
function pop(path?: string) {
  if (path) window.history.replaceState(window.history.state, '', path);
  window.dispatchEvent(new PopStateEvent('popstate', { state: window.history.state }));
}

it('Router 先挂上、壳随后开始路由：启动只派发一次', async () => {
  const r = await load();
  await mount(r);
  const dispatch = vi.fn();
  await act(async () => { await r.startRouting(dispatch) });
  expect(dispatch).toHaveBeenCalledTimes(1);
});

it('壳先开始路由、Router 后挂上：挂上时不再派发', async () => {
  const r = await load();
  const dispatch = vi.fn();
  r.shellNavigate('/stats');
  await act(async () => { await r.startRouting(dispatch) });
  await mount(r);
  expect(dispatch).toHaveBeenCalledTimes(1);
});

it('启动后、Router 挂上前有一次后退：挂上时补派这一次', async () => {
  const r = await load();
  const dispatch = vi.fn();
  r.shellNavigate('/stats');
  await act(async () => { await r.startRouting(dispatch) });
  await act(async () => { pop('/') });
  expect(dispatch).toHaveBeenCalledTimes(1);
  await mount(r);
  expect(dispatch).toHaveBeenCalledTimes(2);
});

it('壳写地址不派发；后退前进各派发一次，地址没变的 popstate 也算', async () => {
  const r = await load();
  await mount(r);
  const dispatch = vi.fn();
  await act(async () => { await r.startRouting(dispatch) });
  dispatch.mockClear();
  await act(async () => { r.shellNavigate('/stats') });
  await act(async () => { r.shellNavigate('/taste', { replace: true }) });
  expect(dispatch).not.toHaveBeenCalled();
  await act(async () => { pop('/') });
  expect(dispatch).toHaveBeenCalledTimes(1);
  await act(async () => { pop() });
  expect(dispatch).toHaveBeenCalledTimes(2);
  await act(async () => { r.shellNavigate('/tags') });
  expect(dispatch).toHaveBeenCalledTimes(2);
});

it('React 子树里的 navigate 让壳打开那一屏', async () => {
  const r = await load();
  let navigate: ReturnType<typeof useNavigate> | null = null;
  function Probe() { navigate = useNavigate(); return null }
  await mount(r, <Probe />);
  const dispatch = vi.fn();
  await act(async () => { await r.startRouting(dispatch) });
  dispatch.mockClear();
  await act(async () => { void navigate!('/performers') });
  expect([dispatch.mock.calls.length, location.pathname]).toEqual([1, '/performers']);
  await act(async () => { void navigate!('/tags', { replace: true }) });
  expect([dispatch.mock.calls.length, location.pathname]).toEqual([2, '/tags']);
});

it('path="*" 的元素不随导航重挂，只跟着地址重渲染', async () => {
  const r = await load();
  let mounted = 0;
  let unmounted = 0;
  const seen: string[] = [];
  function Probe() {
    seen.push(useLocation().pathname);
    useEffect(() => { mounted += 1; return () => { unmounted += 1 } }, []);
    return null;
  }
  await mount(r, <Probe />);
  await act(async () => { await r.startRouting(() => {}) });
  for (const path of ['/playlists', '/follow', '/item/7']) await act(async () => { r.shellNavigate(path) });
  await act(async () => { pop('/follow') });
  await act(async () => { r.peachHistory.push('/trash') });
  expect([mounted, unmounted]).toEqual([1, 0]);
  expect(seen.at(-1)).toBe('/trash');
  expect(new Set(seen)).toEqual(new Set(['/', '/playlists', '/follow', '/item/7', '/trash']));
});

it('派发跑在 React 提交阶段之外：壳在里面用 flushSync 画别的岛，当场就画上', async () => {
  const r = await load();
  await mount(r);
  const host = document.createElement('div');
  const other = createRoot(host);
  unmounts.push(() => other.unmount());
  const painted: string[] = [];
  const dispatch = () => {
    flushSync(() => other.render(<i>{location.pathname}</i>));
    painted.push(host.textContent ?? '');
  };
  await act(async () => { await r.startRouting(dispatch) });
  await act(async () => { pop('/stats') });
  expect(painted).toEqual(['/', '/stats']);
});

it('configureRouter 只挂一棵：重复调用后一次后退仍只派发一次', async () => {
  const r = await load();
  const dispatch = vi.fn();
  const actions = {} as Parameters<typeof r.configureRouter>[0];
  await act(async () => { r.configureRouter(actions) });
  await act(async () => { r.configureRouter(actions) });
  await act(async () => { await r.startRouting(dispatch) });
  await act(async () => { pop('/stats') });
  expect(dispatch).toHaveBeenCalledTimes(2);
});
