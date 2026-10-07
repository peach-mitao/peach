/* 配置页整页：五个分区怎么排，取不到配置时说什么，以及「一份数据一个读者」。
 *
 * 分区的小标题是遗留壳拆左栏页签的依据（`web/app.js` 的 `configTabItems` 按 `.configgroup`
 * 切后面的兄弟节点），所以这里量的是结构，不是外观。各分区内部的行为在
 * `general-network-settings`、`media-settings`、`maintenance-settings` 几份用例里。 */
import { notifyManager, QueryClientProvider } from '@tanstack/react-query';
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
async function open(config: ConfigurationData, receipt = vi.fn()) {
  serve(config);
  await prefetchConfiguration(new AbortController().signal);
  const host = await mount(
    <QueryClientProvider client={queryClient}>
      <ConfigurationPage receipt={receipt} reopenTutorial={vi.fn()} />
    </QueryClientProvider>,
  );
  return host;
}

const groups = (host: ParentNode) => [...host.querySelectorAll('.configgroup')].map((title) => title.textContent);

it('五个分区各有小标题，标题和分区交替排在 `.configpage` 的第一层', async () => {
  const host = await open(data({
    startup, peach_proxy: { mode: 'environment', proxy_saved: false, needs_selection: false },
    downloads: downloadState,
  }));
  expect(groups(host)).toEqual(['通用', '媒体', '下载', '网络与访问', '维护']);
  const page = host.querySelector('.configpage')!;
  expect([...page.children].map((node) => node.classList.contains('configgroup')))
    .toEqual([true, false, true, false, true, false, true, false, true, false]);
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
  expect(host.querySelector('.configgroup')).toBeNull();
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
