/* 索引页与资料页的路由元素（`src/react/router/pages/index-entity.tsx`）：页面组匹配到这两组时挂上，从地址读出
 * 这一页，按开次代次、壳的重开次数（`@peach/shell` 的 `pageOpens`）与覆盖层决定什么时候整页打开；资料页同一位
 * 领了新代次时只就地推新筛选。打开先报换面、再收舞台。
 *
 * 页面自己怎么取数、怎么画由 `managed-routes.test.tsx`、`entity-routes.test.tsx` 与各页的用例管；这里看的是
 * 元素什么时候开、开几次、交给壳什么。历史对象、派发状态与壳状态都是模块级的，每条用例重新装载。 */
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, beforeAll, expect, it, vi } from 'vitest';

import type { ShellActions } from '../../../src/react/router/shell-actions';

const REACT_IMPORT_TIMEOUT_MS = 30_000;

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

beforeAll(async () => { await import('../../../src/react/router/router') }, REACT_IMPORT_TIMEOUT_MS);

async function load(path = '/') {
  vi.resetModules();
  window.history.replaceState(null, '', path);
  const [history, router, routes, shell, pages] = await Promise.all([
    import('../../../src/history'), import('../../../src/react/router/router'),
    import('../../../src/react/router/managed-routes'), import('../../../src/shell'),
    import('../../../src/react/router/pages/index-entity'),
  ]);
  return { ...history, ...router, ...routes, shell, entityTarget: pages.entityTarget };
}
type Loaded = Awaited<ReturnType<typeof load>>;

const unmounts: Array<() => void> = [];
afterEach(async () => {
  for (const unmount of unmounts.splice(0)) await act(async () => { unmount() });
  document.body.innerHTML = '';
  vi.unstubAllGlobals();
});

/** 壳交进来的那一组，外加一份按先后记下的打开过程。`refresh` 回什么由用例定。 */
function shellActions(refreshed = { ok: true }) {
  const log: string[] = [];
  const actions: ShellActions = {
    openItem: vi.fn(), openEntity: vi.fn(), openTag: vi.fn(), openTasteSignal: vi.fn(), navigate: vi.fn(),
    openManage: vi.fn(), managePath: vi.fn(() => ''), openFollow: vi.fn(), receipt: vi.fn(), toast: vi.fn(),
    failure: vi.fn(), revealSource: vi.fn(async () => ''), reopenTutorial: vi.fn(async () => {}),
    requestConfigurationSection: vi.fn(), routeReview: vi.fn(),
    routeFollowManage: vi.fn(), saveFollowPreference: vi.fn(), srcBadge: () => '', routeIndex: vi.fn(),
    savePeopleLayout: vi.fn(), exitSelectMode: vi.fn(), personAvatar: vi.fn(() => ({ html: '', face: '' })),
    authorAvatar: vi.fn(() => ''), showIndexTags: vi.fn(), openFollowAuthor: vi.fn(), openFollowTag: vi.fn(),
    openPlaylist: vi.fn(), canFlip: () => true,
    surfaceChanged: vi.fn((kind: string, path: string) => { log.push(`surface ${kind} ${path}`) }),
    clearSearch: vi.fn(), openImmerse: vi.fn(),
    closeStage: vi.fn(() => { log.push('closeStage') }),
    grid: { helpers: {}, actions: {} } as ShellActions['grid'],
    configurable: () => true,
    surfaceShown: vi.fn((kind: string) => { log.push(`shown ${kind}`) }),
    entity: {
      loading: vi.fn(async (kind: string, name: string) => { log.push(`loading ${kind} ${name}`) }),
      props: vi.fn((kind: string, name: string, search: string) => {
        log.push(`props ${kind} ${name} ${search}`);
        return { kind, name, actions: {} } as never;
      }),
      refresh: vi.fn((kind: string, name: string, search: string) => {
        log.push(`refresh ${kind} ${name} ${search}`);
        return refreshed.ok;
      }),
    },
  };
  return { actions, log };
}

function indexSurface() {
  const index = document.createElement('section');
  index.id = 'index';
  document.body.append(index);
  return index;
}

async function settle() {
  for (let step = 0; step < 3; step += 1) {
    await act(async () => { await new Promise((resolve) => { setTimeout(resolve, 0) }) });
  }
}

/** 挂上路由根，再像壳那样开始路由：启动那一次把 `pageOpens` 写成 1。 */
async function boot(r: Loaded, actions: ShellActions) {
  const root = createRoot(document.createElement('div'));
  await act(async () => { root.render(<r.RouterRoot actions={actions} />) });
  unmounts.push(() => root.unmount());
  await settle();
  const before = vi.mocked(actions.surfaceChanged).mock.calls.length;
  await act(async () => {
    await r.startRouting((origin) => { if (origin === 'boot') r.shell.writeShell({ pageOpens: 1 }) });
  });
  await settle();
  return before;
}

const reopen = (r: Loaded) => r.shell.writeShell({ pageOpens: r.shell.pageOpens + 1 });
const opens = (actions: ShellActions) => vi.mocked(actions.surfaceChanged).mock.calls.length;

it('地址上的这一位：先整段解码再按段切，名字吃掉剩下全部段，认不出的种类与空名字不算', async () => {
  const r = await load();
  expect(r.entityTarget('/performers/A%2FB')).toEqual({ segment: 'performers', kind: 'performer', name: 'A/B' });
  expect(r.entityTarget('/series/x/y')).toEqual({ segment: 'series', kind: 'series', name: 'x/y' });
  expect(r.entityTarget('/agencies/%E6%9F%90%20Co')).toEqual({ segment: 'agencies', kind: 'agency', name: '某 Co' });
  expect(r.entityTarget('/performers/')).toBeNull();
  expect(r.entityTarget('/tags/x')).toBeNull();
  expect(r.entityTarget('/performers/%E0')).toBeNull();
});

it('索引元素：壳开始路由之前只挂着；启动那一下按地址打开一次，先报换面、再收舞台、铺骨架', async () => {
  const r = await load('/performers?q=ab');
  const index = indexSurface();
  const { actions, log } = shellActions();
  const before = await boot(r, actions);
  expect(before, '壳开始路由之前不打开').toBe(0);
  expect(log).toEqual(['surface index /performers', 'closeStage']);
  expect(index.querySelector('[data-skeleton]'), '打开时铺这一页的骨架').not.toBeNull();
  expect(index.querySelector<HTMLInputElement>('input[type="search"]')?.value, '骨架里的过滤框带着地址上的过滤词').toBe('ab');
});

it('索引元素：认领的写地址不重开；不认领的跳转、后退前进与壳要求重开各开一次', async () => {
  const r = await load('/performers');
  indexSurface();
  const { actions } = shellActions();
  await boot(r, actions);
  expect(opens(actions)).toBe(1);
  await act(async () => { r.shellNavigate('/performers?q=abc', { replace: true }) });
  await settle();
  expect(opens(actions), '页内写过滤词由壳认领').toBe(1);
  await act(async () => { r.shellNavigate('/performers?scope=online', { claim: false }) });
  await settle();
  expect(opens(actions), '不认领的跳转领新代次').toBe(2);
  await act(async () => {
    window.history.replaceState(window.history.state, '', '/performers?q=x');
    window.dispatchEvent(new PopStateEvent('popstate', { state: window.history.state }));
  });
  await settle();
  expect(opens(actions), '后退前进领新代次').toBe(3);
  await act(async () => { reopen(r) });
  await settle();
  expect(opens(actions), '壳要求重开').toBe(4);
});

it('索引元素：壳认领写地址换到另一页、紧接着要求重开，两件事合成一次打开', async () => {
  const r = await load('/performers');
  indexSurface();
  const { actions, log } = shellActions();
  await boot(r, actions);
  await act(async () => {
    r.shellNavigate('/tags');
    reopen(r);
  });
  await settle();
  expect(log.filter((line) => line.startsWith('surface'))).toEqual(['surface index /performers', 'surface index /tags']);
});

it('索引元素：被详情压着时领了新代次也不重开，下面那一页早就画着', async () => {
  const r = await load('/performers');
  indexSurface();
  const { actions } = shellActions();
  await boot(r, actions);
  await act(async () => {
    r.shellNavigate('/item/7', { claim: false, state: { backgroundLocation: { pathname: '/performers', search: '' }, overlay: 'item' } });
  });
  await settle();
  expect(opens(actions)).toBe(1);
});

it('资料元素：同一位领了新代次只就地推，推不进才整页开；换一位与壳要求重开都整页开', async () => {
  const refreshed = { ok: true };
  const r = await load('/performers/A');
  indexSurface();
  const { actions, log } = shellActions(refreshed);
  await boot(r, actions);
  expect(log).toEqual(['surface entity /performers/A', 'closeStage', 'loading performer A', 'props performer A ']);
  log.length = 0;
  await act(async () => { r.shellNavigate('/performers/A?tag=x', { claim: false }) });
  await settle();
  expect(log, '推进画着的那一页就够了').toEqual(['refresh performer A ?tag=x']);
  log.length = 0;
  refreshed.ok = false;
  await act(async () => { r.shellNavigate('/performers/A?tag=y', { claim: false }) });
  await settle();
  expect(log, '那一页没画着就整页开').toEqual(['refresh performer A ?tag=y', 'surface entity /performers/A', 'closeStage',
    'loading performer A', 'props performer A ?tag=y']);
  log.length = 0;
  refreshed.ok = true;
  await act(async () => { r.shellNavigate('/performers/B', { replace: true }) });
  await settle();
  expect(log, '换一位按新名字重挂').toEqual(['surface entity /performers/B', 'closeStage', 'loading performer B',
    'props performer B ']);
  log.length = 0;
  await act(async () => { reopen(r) });
  await settle();
  expect(log, '壳要求重开时不就地推').toEqual(['surface entity /performers/B', 'closeStage', 'loading performer B',
    'props performer B ']);
  expect(r.shell.entityJavLayout, '每次整页打开都从非 JAV 语境起').toBe(false);
});

it('资料元素：认领的就地写地址不重开', async () => {
  const r = await load('/studios/S1');
  indexSurface();
  const { actions, log } = shellActions();
  await boot(r, actions);
  log.length = 0;
  await act(async () => { r.shellNavigate('/studios/S1?tag=x') });
  await settle();
  expect(log).toEqual([]);
});

const TAGS = { items: [{ k: '痴女', n: 1, cat: 'role' }], has_more: false };

it('标签页：打开时带上选择键、版式与配置权限，画上后报给壳；选择键一变就推给画着的那一页', async () => {
  const r = await load('/tags');
  const index = indexSurface();
  const { actions, log } = shellActions();
  vi.stubGlobal('fetch', vi.fn(async (input: string) => ({
    ok: true, status: 200, json: async () => (String(input).startsWith('/api/index') ? TAGS : { items: [], has_more: false }),
  })));
  r.connectManagedRoutes(Promise.resolve(r.prefetchManagedRoute));
  await boot(r, actions);
  for (let step = 0; step < 50 && !r.managedEntry(index); step += 1) await settle();
  expect(r.managedEntry(index)?.props).toMatchObject({ kind: 'tags', selectMode: false, layout: 'big', configurable: true });
  expect(log.at(-1)).toBe('shown index');
  await act(async () => { r.shell.writeShell({ selectMode: true }) });
  await settle();
  expect(r.managedEntry(index)?.props).toMatchObject({ selectMode: true });
  expect(opens(actions), '推选择键不重开').toBe(1);
});
