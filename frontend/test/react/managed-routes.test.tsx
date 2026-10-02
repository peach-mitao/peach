/* 管理区由路由画的那几页（`src/history/managed.ts` 与 `src/react/router/`）：壳的骨架留到首屏取齐，
 * 换成整页落在同一个任务里；冷启动不论 Router 先挂还是壳先开始路由都只派发一次；每次打开都重取；
 * 详情舞台压在上面时页面留着，壳下一次认领表面才收；这几页之间的跳转走 React Router，别的交壳。
 *
 * 历史对象、派发状态与那一条登记都是模块级的，和页面上只有一份一致，所以每条用例重新装载
 * `src/history` 与 `src/react/router`。 */
import { act, type ReactElement } from 'react';
import { createRoot } from 'react-dom/client';
import type { NavigateFunction } from 'react-router';
import { afterEach, expect, it, vi } from 'vitest';

import type {
  ConfigurationProps, DataCleanupProps, DuplicatesProps, FollowManageProps, QualityGoalsProps, ReviewProps,
  ScrapingProps, StatsProps, TasteProps,
} from '../../src/react/bundle';
import type { ShellActions } from '../../src/react/router/shell-actions';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

async function load(path = '/') {
  vi.resetModules();
  window.history.replaceState(null, '', path);
  const [history, router, routes] = await Promise.all([
    import('../../src/history'), import('../../src/react/router/router'), import('../../src/react/router/managed-routes'),
  ]);
  return { ...history, ...router, ...routes };
}
type Loaded = Awaited<ReturnType<typeof load>>;

const unmounts: Array<() => void> = [];
afterEach(async () => {
  for (const unmount of unmounts.splice(0)) await act(async () => { unmount() });
  document.body.innerHTML = '';
  vi.unstubAllGlobals();
});

function shellActions(): ShellActions {
  const sections: Record<string, string> = { review: '/review', quality: '/quality-goals', trash: '/trash' };
  return {
    openItem: vi.fn(), openEntity: vi.fn(), openTag: vi.fn(), openTasteSignal: vi.fn(), navigate: vi.fn(),
    openManage: vi.fn(), managePath: vi.fn((section: string) => sections[section] ?? ''), openFollow: vi.fn(),
    receipt: vi.fn(), toast: vi.fn(), failure: vi.fn(), revealSource: vi.fn(async () => ''),
    reopenTutorial: vi.fn(async () => {}), requestConfigurationSection: vi.fn(), requestCloudDownload: vi.fn(),
    routeReview: vi.fn(), routeFollowManage: vi.fn(), saveFollowPreference: vi.fn(), srcBadge: () => '',
  };
}

async function mount(r: Loaded, actions = shellActions()) {
  const root = createRoot(document.createElement('div'));
  await act(async () => { root.render(<r.RouterRoot actions={actions} />) });
  unmounts.push(() => root.unmount());
  return actions;
}

/** 管理区正文的容器，里面是壳铺好的骨架。 */
function surface() {
  const stats = document.createElement('section');
  stats.id = 'stats';
  stats.innerHTML = '<div class="geist-skeleton" data-skeleton="activity">正在读取</div>';
  document.body.append(stats);
  return { stats, skeleton: stats.firstElementChild! };
}

/** 活动页首屏那一份 `/api/tasks`：只有一轮刚跑完的，名字用来认出画的是哪一次取回来的。 */
const tasks = (label = '追更检查') => ({
  available: true, running: [], skipped: [],
  finished: [{
    id: 1, task_key: 'follow-check', task_label: label, trigger: 'manual', status: 'succeeded', host: 'desk',
    started_at: '2026-09-11T10:00:00Z', finished_at: '2026-09-11T10:00:05Z', elapsed_seconds: 5,
    progress_current: null, progress_total: null, progress_label: '', result_summary: {}, error: '',
    parent_run_id: null, root_run_id: null, followup_key: '', followup_depth: 0,
  }],
});
const DOWNLOADS = { available: true, providers: [], tasks: [] };
type Reply = { ok: boolean; status: number; json(): Promise<unknown> };
const reply = (body: unknown): Reply => ({ ok: true, status: 200, json: async () => body });

/** 活动页的取数：`/api/tasks` 手动兑现（首屏等的就是它），云下载段另取的 `/api/downloads` 当场回空表。 */
function tasksFetch(body: unknown = tasks(), { deferred = true } = {}) {
  const pending: Array<() => void> = [];
  let signal: AbortSignal | undefined;
  const fetched = vi.fn((input: string, init?: RequestInit) => {
    if (input.startsWith('/api/downloads')) return Promise.resolve(reply(DOWNLOADS));
    signal = init?.signal ?? undefined;
    if (!deferred) return Promise.resolve(reply(body));
    return new Promise<Reply>((resolve, reject) => {
      pending.push(() => resolve(reply(body)));
      signal?.addEventListener('abort', () => { reject(new DOMException('已中止', 'AbortError')) });
    });
  });
  const taskCalls = () => fetched.mock.calls.filter(([input]) => input.startsWith('/api/tasks')).length;
  return {
    fetched, taskCalls,
    resolve: () => { for (const settle of pending.splice(0)) settle() },
    signal: () => signal,
    install: () => vi.stubGlobal('fetch', fetched),
  };
}

/** 每一批 DOM 变化交付时容器里的样子：骨架还在不在、整页画出来没有。 */
function watch(stats: Element, skeleton: Element, label = '追更检查') {
  const batches: Array<{ skeleton: boolean; painted: boolean }> = [];
  const observer = new MutationObserver(() => {
    batches.push({ skeleton: stats.contains(skeleton), painted: Boolean(stats.textContent?.includes(label)) });
  });
  observer.observe(stats, { childList: true, subtree: true });
  unmounts.push(() => observer.disconnect());
  return batches;
}

async function until(ok: () => boolean, what: string): Promise<void> {
  for (let step = 0; step < 200; step += 1) {
    if (ok()) return;
    await act(async () => { await new Promise((resolve) => { setTimeout(resolve, 0) }) });
  }
  throw new Error(`一直没等到：${what}`);
}

const open = (r: Loaded, stats: Element, isCurrent = () => true) =>
  r.openManagedRoute('/activity', {}, { container: stats, isCurrent });
/** 页面画出来的那一块（宿主里的第一个元素）：重挂之后就换成另一个。 */
const painted = (stats: Element) => stats.querySelector(':scope > .peach-react > *');

it('冷启动深链，Router 先挂上：壳画的骨架留到首屏取齐，换成整页在同一批变化里', async () => {
  const r = await load('/activity');
  const { stats, skeleton } = surface();
  await mount(r);
  r.connectManagedRoutes(Promise.resolve(r.prefetchManagedRoute));
  const fetch = tasksFetch();
  fetch.install();
  let opened: Promise<boolean> | undefined;
  const dispatch = vi.fn(() => { opened = open(r, stats) });
  await act(async () => { await r.startRouting(dispatch) });
  await until(() => fetch.taskCalls() > 0, '首屏取数发出去');
  expect(stats.firstElementChild, '取齐之前骨架原样留着').toBe(skeleton);
  const batches = watch(stats, skeleton);
  fetch.resolve();
  await act(async () => { expect(await opened).toBe(true) });
  expect(dispatch).toHaveBeenCalledTimes(1);
  expect(batches[0], '骨架撤下的那一批变化里整页已经画好，中间没有空白的一帧').toEqual({ skeleton: false, painted: true });
  expect(stats.querySelector(':scope > .peach-react')?.textContent).toContain('追更检查');
});

it('冷启动深链，壳先开始路由、Router 后挂上：包到了才取数，挂上时不再派发，骨架同样留到换成整页', async () => {
  const r = await load('/activity');
  const { stats, skeleton } = surface();
  let arrive: (prefetch: typeof r.prefetchManagedRoute) => void = () => {};
  r.connectManagedRoutes(new Promise((resolve) => { arrive = resolve }));
  const fetch = tasksFetch();
  fetch.install();
  let opened: Promise<boolean> | undefined;
  const dispatch = vi.fn(() => { opened = open(r, stats) });
  await act(async () => { await r.startRouting(dispatch) });
  await mount(r);
  expect(dispatch).toHaveBeenCalledTimes(1);
  expect(fetch.fetched).not.toHaveBeenCalled();
  expect(stats.firstElementChild).toBe(skeleton);
  await act(async () => { arrive(r.prefetchManagedRoute) });
  await until(() => fetch.taskCalls() > 0, '首屏取数发出去');
  expect(stats.firstElementChild).toBe(skeleton);
  const batches = watch(stats, skeleton);
  fetch.resolve();
  await act(async () => { expect(await opened).toBe(true) });
  expect(dispatch).toHaveBeenCalledTimes(1);
  expect(batches[0]).toEqual({ skeleton: false, painted: true });
});

it('应用内切页：在途那一次被收起时不动容器，壳留着的同一张骨架等到下一次打开才换掉', async () => {
  const r = await load('/activity');
  const { stats, skeleton } = surface();
  await mount(r);
  r.connectManagedRoutes(Promise.resolve(r.prefetchManagedRoute));
  const first = tasksFetch(tasks('第一次'));
  first.install();
  const firstOpen = open(r, stats);
  await until(() => first.taskCalls() > 0, '第一次取数发出去');
  // 壳认领表面（`claimSurface`）：在途的首屏取数中止，这一次不画。
  act(() => { r.releaseManagedRoute() });
  expect(first.signal()?.aborted).toBe(true);
  await act(async () => { expect(await firstOpen).toBe(false) });
  expect(stats.firstElementChild, '收起在途那一次不碰壳的骨架').toBe(skeleton);
  const second = tasksFetch(tasks('第二次'));
  second.install();
  const secondOpen = open(r, stats);
  await until(() => second.taskCalls() > 0, '第二次取数发出去');
  expect(stats.firstElementChild).toBe(skeleton);
  const batches = watch(stats, skeleton, '第二次');
  second.resolve();
  await act(async () => { expect(await secondOpen).toBe(true) });
  expect(batches[0]).toEqual({ skeleton: false, painted: true });
  expect(stats.textContent).not.toContain('第一次');
});

it('取数期间壳换了页就不画，骨架留给下一页', async () => {
  const r = await load('/activity');
  const { stats, skeleton } = surface();
  await mount(r);
  r.connectManagedRoutes(Promise.resolve(r.prefetchManagedRoute));
  const fetch = tasksFetch();
  fetch.install();
  let current = true;
  const opening = open(r, stats, () => current);
  await until(() => fetch.taskCalls() > 0, '取数发出去');
  current = false;
  fetch.resolve();
  await act(async () => { expect(await opening).toBe(false) });
  expect(stats.firstElementChild).toBe(skeleton);
  expect(r.managedEntry()).toBeNull();
});

it('同一路径再打开一次就重取：每次打开领一个新代次，页面重挂', async () => {
  const r = await load('/activity');
  const { stats } = surface();
  await mount(r);
  r.connectManagedRoutes(Promise.resolve(r.prefetchManagedRoute));
  const fetch = tasksFetch(tasks(), { deferred: false });
  fetch.install();
  await act(async () => { await open(r, stats) });
  const page = painted(stats);
  const revision = r.managedEntry()?.revision;
  act(() => { r.releaseManagedRoute() });
  expect(stats.querySelector('.peach-react'), '收起时宿主跟着撤掉').toBeNull();
  await act(async () => { await open(r, stats) });
  expect(fetch.taskCalls()).toBe(2);
  expect(r.managedEntry()?.revision).not.toBe(revision);
  expect(painted(stats)).not.toBeNull();
  expect(painted(stats)).not.toBe(page);
});

it('详情舞台压在上面时页面留着，地址回来也不重挂；壳下一次认领表面才收', async () => {
  const r = await load('/activity');
  const { stats } = surface();
  await mount(r);
  r.connectManagedRoutes(Promise.resolve(r.prefetchManagedRoute));
  tasksFetch(tasks(), { deferred: false }).install();
  const dispatch = vi.fn();
  await act(async () => { await r.startRouting(dispatch) });
  await act(async () => { await open(r, stats) });
  const page = painted(stats);
  expect(page).not.toBeNull();
  // 详情由壳推 `/item/:id`，不认领表面。
  await act(async () => { r.shellNavigate('/item/7') });
  expect(painted(stats), '舞台下面那一页不许跟着地址卸掉').toBe(page);
  // 关掉详情：壳把地址写回列表那一页。
  await act(async () => { r.shellNavigate('/activity') });
  expect(painted(stats)).toBe(page);
  expect(dispatch).toHaveBeenCalledTimes(1);
  act(() => { r.releaseManagedRoute() });
  expect(stats.children).toHaveLength(0);
});

it('壳直接改写了容器再收起也不报错：页面画在自己的宿主里', async () => {
  const r = await load('/activity');
  const { stats } = surface();
  await mount(r);
  r.connectManagedRoutes(Promise.resolve(r.prefetchManagedRoute));
  tasksFetch(tasks(), { deferred: false }).install();
  const errors = vi.spyOn(console, 'error');
  await act(async () => { await open(r, stats) });
  stats.innerHTML = '<p>别的页面</p>';
  act(() => { r.releaseManagedRoute() });
  expect(errors).not.toHaveBeenCalled();
  expect(stats.innerHTML).toBe('<p>别的页面</p>');
  expect(r.managedEntry()).toBeNull();
});

it('路由树没装载就打开：直接失败，不是静默什么都不画', async () => {
  const r = await load('/activity');
  const { stats } = surface();
  await expect(open(r, stats)).rejects.toThrow('客户端导航还没装载');
});

it('包取不回来时，等着的那一页跟着失败', async () => {
  const r = await load('/activity');
  const { stats, skeleton } = surface();
  r.connectManagedRoutes(Promise.reject(new Error('取不回 peach-react.js')));
  await expect(open(r, stats)).rejects.toThrow('取不回 peach-react.js');
  expect(stats.firstElementChild).toBe(skeleton);
});

const configuration = {
  editable: true, notice: '', revision: 'rev-1', media_dirs: ['D:\\Media'], port: 9123, facts: [],
  startup: { available: true, enabled: false, silent: true, message: '', desktop: false, desktop_message: '' },
  peach_proxy: { mode: 'environment', proxy_saved: false, needs_selection: false },
};

/* 壳按 `.configgroup` 小标题把后面的兄弟节点切进左栏那一列（`configTabItems`），打开返回的那一刻就读它，
   再按 `#peachProxy` 滚过去。分区自己怎么排在 `configuration.test.tsx`。 */
it('配置页打开返回的那一刻，小标题和它的分区已经在容器里', async () => {
  const r = await load('/configuration');
  const { stats } = surface();
  await mount(r);
  r.connectManagedRoutes(Promise.resolve(r.prefetchManagedRoute));
  vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true, status: 200, json: async () => configuration })));
  await act(async () => {
    expect(await r.openManagedRoute('/configuration', {}, { container: stats, isCurrent: () => true })).toBe(true);
    const titles = [...stats.querySelectorAll('.configgroup')].map((title) => title.textContent);
    expect(titles, '标题还没落到 DOM 上，壳那一刻就拆不出分区').toEqual(['通用', '媒体', '网络与访问', '更新与维护']);
    expect(stats.querySelector('.configpage')?.parentElement?.classList.contains('peach-react')).toBe(true);
  });
});

it('这几页之间的跳转交给 React Router，别的路径交壳', async () => {
  const r = await load('/');
  const actions = shellActions();
  const navigate = vi.fn();
  r.managedGo('/activity', actions, navigate);
  r.managedGo('/scraping?from=cleanup#top', actions, navigate);
  r.managedGo('/', actions, navigate);
  r.managedGo('/trash', actions, navigate);
  expect(navigate.mock.calls).toEqual([['/activity'], ['/scraping?from=cleanup#top']]);
  expect(vi.mocked(actions.navigate).mock.calls).toEqual([['/'], ['/trash']]);
});

it('页面里的跳转落到壳上：只派发一次、历史只多一条', async () => {
  const r = await load('/scraping');
  await mount(r);
  const dispatch = vi.fn();
  await act(async () => { await r.startRouting(dispatch) });
  dispatch.mockClear();
  const before = window.history.length;
  const navigate = ((to: string) => { r.peachHistory.push(to) }) as unknown as NavigateFunction;
  await act(async () => { r.managedGo('/activity', shellActions(), navigate) });
  expect([dispatch.mock.calls.length, location.pathname, window.history.length - before]).toEqual([1, '/activity', 1]);
});

/** 一页的元素与它拿到的 props，不画。 */
function element<P>(path: keyof Loaded['MANAGED_ROUTES'], r: Loaded, open: object, actions: ShellActions, go: (path: string) => void) {
  return (r.MANAGED_ROUTES[path].page as (open: object, actions: ShellActions, go: (path: string) => void) => ReactElement<P>)(
    open, actions, go).props;
}

it('统计页：点标签交壳回目录；「添加媒体文件夹」先交页签再换到配置页', async () => {
  const r = await load();
  const actions = shellActions();
  const order: string[] = [];
  const go = vi.fn((path: string) => { order.push(`go ${path}`) });
  vi.mocked(actions.requestConfigurationSection).mockImplementation((section) => { order.push(`section ${section}`) });
  const props = element<StatsProps>('/stats', r, { configurable: false }, actions, go);
  props.onTag('痴女');
  props.openMediaSettings();
  expect(vi.mocked(actions.openTag).mock.calls).toEqual([['痴女']]);
  expect(order).toEqual(['section 媒体', 'go /configuration']);
  expect([props.configurable, props.tagLabel('JK制服')]).toEqual([false, 'JK']);
});

it('口味页：总结里的下一步按路径走 go', async () => {
  const r = await load();
  const go = vi.fn();
  const props = element<TasteProps>('/taste', r, { onboarding: true }, shellActions(), go);
  props.navigate('/follow-manage');
  props.navigate('/');
  expect(go.mock.calls).toEqual([['/follow-manage'], ['/']]);
  expect(props.onboarding).toBe(true);
});

it('数据管理页：复核、高清版与重复文件走 go，垃圾文件与回收站交壳', async () => {
  const r = await load();
  const actions = shellActions();
  const go = vi.fn();
  const props = element<DataCleanupProps>('/data-cleanup', r, {}, actions, go);
  for (const section of ['review', 'quality', 'duplicates', 'ads', 'trash'] as const) props.open(section);
  expect(go.mock.calls).toEqual([['/review'], ['/quality-goals'], ['/duplicates']]);
  expect(vi.mocked(actions.openManage).mock.calls).toEqual([['ads'], ['trash']]);
  props.toast('做完了', { warning: true });
  props.toast('做完了');
  expect(vi.mocked(actions.toast).mock.calls).toEqual([[{ text: '做完了' }, { sound: 'warning' }]]);
  expect(vi.mocked(actions.receipt).mock.calls).toEqual([['做完了']]);
});

it('复核页与关注管理页把地址写回壳，不重开；云下载先交预填再换到活动页', async () => {
  const r = await load();
  const actions = shellActions();
  const order: string[] = [];
  const go = vi.fn((path: string) => { order.push(`go ${path}`) });
  vi.mocked(actions.requestCloudDownload).mockImplementation((prefill) => { order.push(`prefill ${prefill.origin}`) });
  const review = element<ReviewProps>('/review', r,
    { category: 'name', readOnly: true, readOnlyMessage: '只读', writerUrl: '' }, actions, go);
  expect([review.route, review.category, review.readOnly]).toEqual([actions.routeReview, 'name', true]);
  const follow = element<FollowManageProps>('/follow-manage', r, {
    tab: 'list', page: 2, sort: '', dir: '', pageSize: 20, layout: 'default', readOnly: false, readOnlyMessage: '', writerUrl: '',
  }, actions, go);
  expect([follow.route, follow.savePreference, follow.openFollow, follow.page])
    .toEqual([actions.routeFollowManage, actions.saveFollowPreference, actions.openFollow, 2]);
  follow.cloudDownload({ code: 'ABC-123', origin: 'wishlist:5' });
  expect(order).toEqual(['prefill wishlist:5', 'go /activity']);
});

it('回执、打开作品与资料页都交回壳：都走过去时回执', async () => {
  const r = await load();
  const actions = shellActions();
  const undo = async () => {};
  const goals = element<QualityGoalsProps>('/quality-goals', r, {}, actions, vi.fn());
  goals.openItem(3);
  expect(goals.srcBadge).toBe(actions.srcBadge);
  expect(goals.javDisplayName({ name: 'ABC-123 片名.mp4' } as never)).toContain('ABC-123');
  expect(goals.javTitleHtml({ name: '<b>.mp4' } as never)).not.toContain('<b>');
  const duplicates = element<DuplicatesProps>('/duplicates', r, {}, actions, vi.fn());
  duplicates.toast('已删除', { undo });
  duplicates.toast('已保留');
  duplicates.failure('删除', 'boom');
  const configuration = element<ConfigurationProps>('/configuration', r, {}, actions, vi.fn());
  configuration.receipt('已保存配置');
  expect(configuration.reopenTutorial).toBe(actions.reopenTutorial);
  const review = element<ReviewProps>('/review', r,
    { category: '', readOnly: false, readOnlyMessage: '', writerUrl: '' }, actions, vi.fn());
  review.openEntity('performer', '某人');
  review.toast('已判定');
  expect(review.revealSource).toBe(actions.revealSource);
  element<FollowManageProps>('/follow-manage', r, {
    tab: 'list', page: 1, sort: '', dir: '', pageSize: 20, layout: 'default', readOnly: false, readOnlyMessage: '', writerUrl: '',
  }, actions, vi.fn()).toast('已添加 1 个关注来源');
  const taste = element<TasteProps>('/taste', r, { onboarding: false }, actions, vi.fn());
  taste.onSignal('tag', '痴女');
  taste.toast('已导入');
  expect(vi.mocked(actions.openItem).mock.calls).toEqual([[3]]);
  expect(vi.mocked(actions.openEntity).mock.calls).toEqual([['performer', '某人']]);
  expect(vi.mocked(actions.openTasteSignal).mock.calls).toEqual([['tag', '痴女']]);
  expect(vi.mocked(actions.failure).mock.calls).toEqual([['删除', 'boom']]);
  expect(actions.toast).not.toHaveBeenCalled();
  expect(vi.mocked(actions.receipt).mock.calls).toEqual([
    ['已删除', { undo }], ['已保留', {}], ['已保存配置'], ['已判定'], ['已添加 1 个关注来源'], ['已导入'],
  ]);
});

it('采集页的提示走全站 Toast 原样', async () => {
  const r = await load();
  const actions = shellActions();
  element<ScrapingProps>('/scraping', r, {}, actions, vi.fn()).toast('已保存');
  expect(vi.mocked(actions.toast).mock.calls).toEqual([['已保存']]);
  expect(actions.receipt).not.toHaveBeenCalled();
});

it('活动页的预填只跟着那一次打开：不带就是空表单，也不写进地址与历史', async () => {
  const r = await load('/activity');
  const withPrefill = element<{ prefill?: object }>('/activity', r, { prefill: { title: '片名' } }, shellActions(), vi.fn());
  const plain = element<{ prefill?: object }>('/activity', r, {}, shellActions(), vi.fn());
  expect(withPrefill.prefill).toEqual({ title: '片名' });
  expect('prefill' in plain).toBe(false);
  expect([location.href.includes('片名'), JSON.stringify(window.history.state ?? null).includes('片名')]).toEqual([false, false]);
});
