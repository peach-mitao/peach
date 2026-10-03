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

/* `path` 是装载时的地址。`path="*"` 那一格只在不归路由树画的地址上（详情、沉浸）才画出来。 */
async function load(path = '/') {
  vi.resetModules();
  window.history.replaceState(null, '', path);
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

it('派发带来由：启动那一次是 boot（落在详情地址上也是），之后的后退前进与 React 子树写的是 history', async () => {
  const r = await load('/item/7');
  let navigate: ReturnType<typeof useNavigate> | null = null;
  function Probe() { navigate = useNavigate(); return null }
  await mount(r, <Probe />);
  const dispatch = vi.fn();
  await act(async () => { await r.startRouting(dispatch) });
  await act(async () => { r.shellNavigate('/trash') });
  await act(async () => { pop('/item/7') });
  await act(async () => { void navigate!('/performers') });
  expect(dispatch.mock.calls).toEqual([['boot'], ['history'], ['history']]);
});

it('React 子树里的 navigate 让壳打开那一屏', async () => {
  const r = await load('/immerse');
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

/* 详情与队列条目的 `usr`：压在哪一页上，和壳写的形状一致。 */
const over = (pathname: string, overlay: 'item' | 'follow' = 'item', search = '') =>
  ({ backgroundLocation: { pathname, search }, overlay });

/** 页面组 `path="*"` 那一格的探针：记挂载、卸载与它看到的地址。 */
function probe() {
  const seen = { mounted: 0, unmounted: 0, paths: [] as string[] };
  function Probe() {
    seen.paths.push(useLocation().pathname);
    useEffect(() => { seen.mounted += 1; return () => { seen.unmounted += 1 } }, []);
    return null;
  }
  return { seen, Probe };
}

it('详情压着下面那一页时，页面组 path="*" 的元素不重挂，看到的是背景那一页', async () => {
  const r = await load('/immerse');
  const { seen, Probe } = probe();
  await mount(r, <Probe />);
  await act(async () => { await r.startRouting(() => {}) });
  const steps: Array<[string, ReturnType<typeof over>]> = [
    ['/follow/item/3', over('/immerse', 'follow')], ['/item/7', over('/immerse')], ['/parts/1/2', over('/immerse')]];
  for (const [path, state] of steps) await act(async () => { r.shellNavigate(path, { state }) });
  await act(async () => { pop('/follow/item/3') });
  await act(async () => { r.peachHistory.push('/mix/4/5') });
  expect([seen.mounted, seen.unmounted]).toEqual([1, 0]);
  expect(seen.paths.at(-1)).toBe('/mix/4/5');
  expect(new Set(seen.paths)).toEqual(new Set(['/immerse', '/mix/4/5']));
});

it('页面组按背景匹配：背景是管理区那一页就匹配那一条，两组都不报没有路由', async () => {
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
  try {
    const r = await load('/immerse');
    const { seen, Probe } = probe();
    await mount(r, <Probe />);
    await act(async () => { await r.startRouting(() => {}) });
    await act(async () => { r.shellNavigate('/item/7', { state: over('/stats', 'item', '?range=30') }) });
    expect([seen.mounted, seen.unmounted]).toEqual([1, 1]);
    await act(async () => { r.shellNavigate('/item/8') });
    await act(async () => { r.shellNavigate('/no/such/page') });
    expect(seen.mounted).toBe(2);
    const unmatched = warn.mock.calls.map((call) => String(call[0])).filter((text) => text.includes('No routes matched'));
    expect(unmatched).toEqual([]);
  } finally {
    warn.mockRestore();
  }
});

it('带背景的条目后退前进照样派发一次，背景随条目回来', async () => {
  const r = await load('/stats');
  await mount(r);
  const dispatch = vi.fn();
  await act(async () => { await r.startRouting(dispatch) });
  dispatch.mockClear();
  await act(async () => { r.shellNavigate('/item/7', { state: over('/stats') }) });
  await act(async () => { r.shellNavigate('/item/8', { state: over('/stats') }) });
  expect(dispatch).not.toHaveBeenCalled();
  await act(async () => { pop('/item/7') });
  expect(dispatch).toHaveBeenCalledTimes(1);
  expect(r.peachHistory.navigation.location.state).toEqual(over('/stats'));
  await act(async () => { pop() });
  expect(dispatch).toHaveBeenCalledTimes(2);
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
