/* 配置页整页：五个分区怎么排、顶上那排页签怎么走，取不到配置时说什么，以及「一份数据一个读者」。
 *
 * 页签条、小标题与各组的面板都是 `.ui-configpage` 的第一层，`configuration-page.css` 按这层结构排版、只显示选中的
 * 那一组，所以这里量的是结构与无障碍属性，不是外观。各分区内部的行为在
 * `general-network-settings`、`media-settings`、`maintenance-settings` 几份用例里。 */
import { notifyManager, QueryClientProvider } from '@tanstack/react-query';
import { act } from 'react';
import { afterEach, expect, it, vi } from 'vitest';

import { CONFIGURATION_URL } from '../../src/configuration-endpoints';
import type { ConfigurationData, DownloadSettingsState } from '../../src/react/bundle';
import { queryClient } from '../../src/react/query';
import { CONFIGURATION_KEY, prefetchConfiguration } from '../../src/react/settings/configuration';
import { ConfigurationPage } from '../../src/react/settings/configuration-page';

import { buttonNamed, click, mount, section, settle, type } from './render';

// 客户端是模块级的单例（所有 React 根共用一个），用例之间不清就互相喂数据。
afterEach(() => { queryClient.clear() });

/* Query 派发更新用的是它自己抓住的那个真 `setTimeout(0)`，用例里的等待推不动它：
   断言到的还是上一帧的 DOM。改成当场派发。 */
notifyManager.setScheduler((notify) => notify());

const data = (over: Partial<ConfigurationData> = {}): ConfigurationData => ({
  editable: true, notice: '', revision: 'rev-1', media_dirs: ['D:\\Media'], library_count: 1, port: 9123, facts: [], ...over,
});

const startup = {
  available: true, enabled: false, silent: true, message: '', desktop: false, desktop_message: '',
};

const downloadState: DownloadSettingsState = {
  available: true,
  config: { clouddrive_address: '', targets: {}, pikpak_root: '', wait_hours: 168 },
  token_set: false,
  pikpak: { logged_in: false, username: '', remember: false, method: 'password' },
  pikpak_browser: { available: true, state: 'idle', message: '' },
  pikpak_roots: [],
  providers: [{ key: '115', label: '115' }, { key: 'pikpak', label: 'PikPak' }],
  max_wait_hours: 1440,
};

/** 按路径应答：配置快照照给，别的路径回一份空闲状态，不让哪一块的自取拖住断言。 */
function serve(config: ConfigurationData) {
  const calls: string[] = [];
  const fetcher = vi.fn(async (path: string) => {
    calls.push(path);
    if (path === CONFIGURATION_URL) return { ok: true, status: 200, json: async () => config };
    if (path === '/api/configuration/indexers') {
      return { ok: true, status: 200, json: async () => ({ indexers: [], max_indexers: 4 }) };
    }
    return { ok: true, status: 200, json: async () => ({ status: 'idle' }) };
  });
  vi.stubGlobal('fetch', fetcher);
  return calls;
}

/** 走完真实的首屏路径：先 `prefetch` 把配置落进缓存，再挂页面。 */
async function open(config: ConfigurationData, { receipt = vi.fn(), section }: { receipt?: () => void; section?: string } = {}) {
  serve(config);
  await prefetchConfiguration(new AbortController().signal);
  const host = await mount(
    <QueryClientProvider client={queryClient}>
      <ConfigurationPage receipt={receipt} reopenTutorial={vi.fn()} {...(section ? { section } : {})} />
    </QueryClientProvider>,
  );
  return host;
}

const groups = (host: ParentNode) => [...host.querySelectorAll('.ui-configgroup')].map((title) => title.textContent);
const tabs = (host: ParentNode) => [...host.querySelectorAll<HTMLButtonElement>('.ui-board-local-nav [role="tab"]')];
const selected = (host: ParentNode) => tabs(host).filter((tab) => tab.getAttribute('aria-selected') === 'true')
  .map((tab) => tab.textContent);
/** 此刻显示的那一组：带 `ui-board-group-active` 的面板，按它的 `aria-labelledby` 找回页签名。 */
const shown = (host: ParentNode) => [...host.querySelectorAll('[role="tabpanel"].ui-board-group-active')]
  .map((panel) => host.querySelector(`#${panel.getAttribute('aria-labelledby')}`)?.textContent);
const press = (target: Element, key: string) => act(async () => {
  target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
});

const full = () => data({
  startup, peach_proxy: { mode: 'environment', proxy_saved: false, needs_selection: false }, downloads: downloadState,
});

it('五个分区各一格页签：页签条在最前，后面小标题和它的面板交替排在 `.ui-configpage` 的第一层', async () => {
  const host = await open(full());
  expect(groups(host)).toEqual(['通用', '媒体', '下载', '网络与访问', '维护']);
  const page = host.querySelector('.ui-configpage')!;
  const [nav, ...rest] = [...page.children];
  expect([nav.className, nav.getAttribute('role'), nav.getAttribute('aria-label'), nav.getAttribute('aria-orientation')])
    .toEqual(['ui-board-local-nav', 'tablist', '配置分区', 'horizontal']);
  expect([nav.hasAttribute('data-section-nav'), nav.hasAttribute('data-section-items')]).toEqual([true, true]);
  expect(rest.map((node) => node.classList.contains('ui-configgroup')))
    .toEqual([true, false, true, false, true, false, true, false, true, false]);
  expect(tabs(host).map((tab) => tab.textContent)).toEqual(['通用', '媒体', '下载', '网络与访问', '维护']);
  const panels = rest.filter((node) => !node.classList.contains('ui-configgroup'));
  tabs(host).forEach((tab, i) => {
    expect([tab.type, tab.getAttribute('aria-controls')]).toEqual(['button', panels[i].id]);
    expect([panels[i].getAttribute('role'), panels[i].getAttribute('aria-labelledby'), panels[i].getAttribute('data-board-group')])
      .toEqual(['tabpanel', tab.id, String(i)]);
  });
  expect([selected(host), shown(host)]).toEqual([['通用'], ['通用']]);
  expect(tabs(host).map((tab) => tab.tabIndex)).toEqual([0, -1, -1, -1, -1]);
});

/* 页签条和整页同一次插入文档：不是先画整页、再往里补一排页签。 */
it('页签条随整页一起画出，不单独插入', async () => {
  serve(full());
  await prefetchConfiguration(new AbortController().signal);
  const inserted: Element[] = [];
  const watch = new MutationObserver((records) => {
    for (const record of records) for (const node of record.addedNodes) if (node instanceof Element) inserted.push(node);
  });
  watch.observe(document.body, { childList: true, subtree: true });
  const host = await mount(
    <QueryClientProvider client={queryClient}>
      <ConfigurationPage receipt={vi.fn()} reopenTutorial={vi.fn()} />
    </QueryClientProvider>,
  );
  inserted.push(...watch.takeRecords().flatMap((record) => [...record.addedNodes]).filter((node) => node instanceof Element));
  watch.disconnect();
  expect(host.querySelector('.ui-configpage > .ui-board-local-nav')).not.toBeNull();
  expect(inserted.some((node) => node.matches('.ui-board-local-nav'))).toBe(false);
  expect(inserted.some((node) => node.matches('.ui-configpage') && node.firstElementChild?.matches('.ui-board-local-nav'))).toBe(true);
});

it('方向键在整排里走、首尾相接，Home 与 End 到两头，焦点跟着选中的那一格', async () => {
  const host = await open(full());
  const at = (name: string) => tabs(host).find((tab) => tab.textContent === name)!;
  at('通用').focus();
  await press(at('通用'), 'ArrowLeft');
  expect([selected(host), shown(host), document.activeElement]).toEqual([['维护'], ['维护'], at('维护')]);
  await press(at('维护'), 'ArrowRight');
  expect([selected(host), document.activeElement]).toEqual([['通用'], at('通用')]);
  await press(at('通用'), 'ArrowDown');
  expect([selected(host), document.activeElement]).toEqual([['媒体'], at('媒体')]);
  await press(at('媒体'), 'ArrowUp');
  expect([selected(host), document.activeElement]).toEqual([['通用'], at('通用')]);
  await press(at('通用'), 'End');
  expect([selected(host), shown(host), document.activeElement]).toEqual([['维护'], ['维护'], at('维护')]);
  await press(at('维护'), 'Home');
  expect([selected(host), document.activeElement]).toEqual([['通用'], at('通用')]);
  expect(tabs(host).map((tab) => tab.tabIndex)).toEqual([0, -1, -1, -1, -1]);
  // 别的键不归页签条：不选、不拦默认动作。
  const other = new KeyboardEvent('keydown', { key: 'a', bubbles: true, cancelable: true });
  await act(async () => { at('通用').dispatchEvent(other) });
  expect([selected(host), other.defaultPrevented]).toEqual([['通用'], false]);
  await click(at('网络与访问'));
  expect([selected(host), shown(host)]).toEqual([['网络与访问'], ['网络与访问']]);
});

/* 别处点进来要落到某一组时，组名跟着这一次打开交进来，只定第一帧选中哪一格。 */
it('带着组名打开就落到那一组，之后重画不再跳回去', async () => {
  const host = await open(full(), { section: '网络与访问' });
  expect([selected(host), shown(host)]).toEqual([['网络与访问'], ['网络与访问']]);
  await click(tabs(host).find((tab) => tab.textContent === '维护'));
  await act(async () => { queryClient.setQueryData(CONFIGURATION_KEY, { ...full(), revision: 'rev-2' }) });
  expect([selected(host), shown(host)]).toEqual([['维护'], ['维护']]);
});

it('交进来的组名这一页没有时落在第一组', async () => {
  const host = await open(data(), { section: '下载' });
  expect([groups(host), selected(host), shown(host)]).toEqual([['媒体', '维护'], ['媒体'], ['媒体']]);
});

it('没有内容的组连标题一起省略', async () => {
  const host = await open(data());
  expect(groups(host)).toEqual(['媒体', '维护']);
  expect(host.textContent).not.toContain('开机自启');
  expect(host.textContent).not.toContain('订阅源');
  expect(host.textContent).not.toContain('媒体修复');
  expect(host.textContent).not.toContain('Peach 代理');
});

it('取不到配置就说打不开，连同服务端给的那句原因', async () => {
  vi.stubGlobal('fetch', vi.fn(async () => ({
    ok: false, status: 503, json: async () => ({ message: '账本正在迁移' }),
  })));
  const host = await mount(
    <QueryClientProvider client={queryClient}>
      <ConfigurationPage receipt={vi.fn()} reopenTutorial={vi.fn()} />
    </QueryClientProvider>,
  );
  await settle();
  const note = host.querySelector('[role="alert"]');
  expect(note?.textContent).toContain('配置读取失败');
  expect(note?.textContent).toContain('账本正在迁移');
  expect(host.querySelector('.ui-configgroup')).toBeNull();
  expect(host.querySelector('[role="tablist"]')).toBeNull();
});

/* 能编辑时挂载状态标在每个文件夹行上，路径改过的行不标：那是上一次保存的读数。 */
it('挂载状态标在文件夹行上，改过路径的行不再标', async () => {
  const offline = { location: '115', path: 'B:/', root: 'B:/', online: false };
  const host = await open(data({ windows: true, media_sources: [offline] }));
  const row = host.querySelector('[data-folder-row]')!;

  expect(row.querySelector('[data-mount="offline"]')?.textContent).toBe('离线');
  expect(section(host, '挂载状态')).toBeNull();
  await type(row.querySelector<HTMLInputElement>('input[aria-label^="媒体文件夹 "]'), 'B:/Movies');
  expect(row.querySelector('[data-mount]')).toBeNull();
});

/* 只读时没有文件夹表单，挂载状态单列一块；刷新重取的是整份配置，换进整页那一个 `queryKey`。 */
it('只读时挂载状态单列一块，刷新换掉整页那一份配置', async () => {
  const offline = { location: '115', path: 'B:/', root: 'B:/', online: false };
  const host = await open(data({ editable: false, notice: '只在本机可改', media_sources: [offline] }));
  serve(data({ editable: false, notice: '只在本机可改', media_sources: [{ ...offline, online: true }], revision: 'rev-2' }));

  await click(buttonNamed('刷新挂载状态', host));
  await settle();

  expect(section(host, '挂载状态')?.textContent).toContain('在线');
  expect(queryClient.getQueryData<ConfigurationData>(CONFIGURATION_KEY)?.revision).toBe('rev-2');
});
