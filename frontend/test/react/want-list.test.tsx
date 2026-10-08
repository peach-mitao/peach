/* 关注管理的「想要」页签：四段怎么分、按番号添加、移除与重新查找发什么、只读时禁用。
 *
 * 对账、查找计数与发售日的判定在服务端（`tests/test_wants.py`、`tests/test_wants_web.py`）；这里只看
 * 页签照回话怎么画、写操作怎么发。 */
import { notifyManager, QueryClientProvider } from '@tanstack/react-query';
import { afterEach, expect, it, vi } from 'vitest';

import { queryClient } from '../../src/react/query';
import { WantList } from '../../src/react/wants/want-list';
import type { Want, WantsData } from '../../src/react/wants/wants';
import { buttonNamed, click, mount, settle, type } from './render';

afterEach(() => { queryClient.clear() });
notifyManager.setScheduler((notify) => notify());

const want = (id: number, extra: Partial<Want> = {}): Want => ({
  id, code: `ABC-${id}`, origin: 'code', title: null, link: null, release_date: '2025-01-01', studio: null,
  performers: null, phase: 'searching', fresh: false, search_count: 0, last_search_at: null,
  last_search_outcome: null, given_up_at: null, acquired_asset_id: null, acquired_at: null, follow_item_id: null,
  follow_provider: null, cover: null, remote_cover: false, scraped: true, scrape_error: null,
  created_at: '2026-09-30 10:00:00', ...extra,
});

const listed = (items: Want[]): WantsData => ({
  items, scraping: false,
  counts: { searching: 0, unreleased: 0, given_up: 0, acquired: 0 },
});

/** 假服务端：清单按轮次回给定的那几份，写接口一律成功。 */
function serve(...rounds: WantsData[]) {
  let round = 0;
  const fetcher = vi.fn(async (url: string, init?: RequestInit) => {
    if (url.startsWith('/api/downloads')) return { ok: true, status: 200,
      json: async () => ({ available: true, providers: [], tasks: [] }) };
    if (url.startsWith('/api/wants/magnets')) return { ok: true, status: 200,
      json: async () => ({ state: 'ready', items: [], error: '', checked_at: null }) };
    if (init?.method === 'POST') {
      return { ok: true, status: 200, json: async () => ({ created: true, want: want(99, { code: 'SSIS-950' }) }) };
    }
    const body = rounds[Math.min(round, rounds.length - 1)];
    round += 1;
    return { ok: true, status: 200, json: async () => structuredClone(body) };
  });
  vi.stubGlobal('fetch', fetcher);
  return fetcher;
}
const posts = (fetcher: ReturnType<typeof serve>) => fetcher.mock.calls
  .filter(([, init]) => init?.method === 'POST').map(([url, init]) => [url, JSON.parse(String(init!.body))]);
const reads = (fetcher: ReturnType<typeof serve>) => fetcher.mock.calls.filter(([url, init]) => url === '/api/wants' && init?.method !== 'POST');

async function open(readOnly = false) {
  const toast = vi.fn();
  const host = await mount(
    <QueryClientProvider client={queryClient}>
      <WantList readOnly={readOnly} toast={toast} />
    </QueryClientProvider>);
  await settle();
  return { host, toast };
}

it('按待找、未发售、暂时放弃、已入库分段，段名带条数；只有暂时放弃的那条能重新查找', async () => {
  serve(listed([
    want(1, { phase: 'acquired', acquired_at: '2026-09-30 12:00:00' }),
    want(2), want(3, { phase: 'given_up', search_count: 3 }),
    want(4, { phase: 'unreleased', release_date: '2026-12-01' }), want(5, { fresh: true }),
  ]));
  const { host } = await open();
  const sections = [...host.querySelectorAll<HTMLElement>('section[data-want-phase]')];
  expect(sections.map((one) => [one.dataset.wantPhase, one.querySelector('h3')?.textContent]))
    .toEqual([['searching', '待找2'], ['unreleased', '未发售1'], ['given_up', '暂时放弃1'], ['acquired', '已入库1']]);
  const note = (id: number) => host.querySelector(`[data-want-id="${id}"] [data-want-note]`)?.textContent;
  expect([note(2), note(5), note(4), note(3), note(1)]).toEqual([
    undefined, undefined, '2026-12-01 发售', undefined, '入库于 2026-09-30',
  ]);
  expect(buttonNamed('重新查找', host.querySelector('[data-want-id="3"]')!)).not.toBeNull();
  expect(buttonNamed('重新查找', host.querySelector('[data-want-id="2"]')!)).toBeNull();
});

it('待找与暂时放弃两段每行有搜索资源，原地打开带番号与标题的云下载弹层；未发售与已入库没有', async () => {
  serve(listed([
    want(2, { title: '雨の日' }), want(3, { phase: 'given_up', search_count: 3 }),
    want(4, { phase: 'unreleased', release_date: '2026-12-01' }), want(1, { phase: 'acquired' }),
    want(6, { code: null, origin: 'follow', title: '关注里的一条', follow_item_id: 9 }),
  ]));
  const { host } = await open();
  const key = (id: number) => buttonNamed('搜索资源', host.querySelector(`[data-want-id="${id}"]`)!);
  expect([2, 3, 4, 1, 6].map((id) => !!key(id))).toEqual([true, true, false, false, true]);
  expect(key(2)!.className).toContain('bg-background-primary-default');
  await click(key(2));
  await settle();
  expect(document.querySelector('[role=dialog]')?.textContent).toContain('ABC-2 雨の日');
});

it('一条都没有就是空态，不画空的分段', async () => {
  serve(listed([]));
  const { host } = await open();
  expect(host.textContent).toContain('还没有想要的作品');
  expect(host.querySelector('section[data-want-phase]')).toBeNull();
});

it('添加键是蓝色主按钮：输入框空着时是主按钮的禁用形态，填了番号就能点', async () => {
  serve(listed([]));
  const { host } = await open();
  const addKey = () => buttonNamed('添加', host)!;
  expect([addKey().classList.contains('bg-button-primary'), addKey().disabled]).toEqual([true, true]);
  await type(host.querySelector<HTMLInputElement>('input[aria-label="番号"]'), 'SSIS-950');
  await settle();
  expect([addKey().classList.contains('bg-button-primary'), addKey().disabled]).toEqual([true, false]);
});

it('按番号添加：回车就发，回执报番号，输入框清空、清单重取', async () => {
  const fetcher = serve(listed([]), listed([want(99, { code: 'SSIS-950' })]));
  const { host, toast } = await open();
  const input = host.querySelector<HTMLInputElement>('input[aria-label="番号"]')!;
  await type(input, ' ssis-950 ');
  await settle();
  input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
  await vi.waitFor(async () => {
    await settle();
    expect(host.querySelector('[data-want-id="99"]')).not.toBeNull();
  });
  expect(posts(fetcher)).toEqual([['/api/wants', { action: 'add', code: 'ssis-950' }]]);
  expect(toast).toHaveBeenCalledWith('已加入想要：SSIS-950');
  expect(input.value).toBe('');
  expect(reads(fetcher)).toHaveLength(2);
});

it('移除与重新查找按这一条的 id 发', async () => {
  const fetcher = serve(listed([want(3, { phase: 'given_up', search_count: 3 })]));
  const { host, toast } = await open();
  const row = () => host.querySelector('[data-want-id="3"]')!;
  await click(buttonNamed('重新查找', row()));
  await settle();
  await click(buttonNamed('移除', row()));
  await settle();
  expect(posts(fetcher)).toEqual([
    ['/api/wants', { action: 'reset', ids: [3] }], ['/api/wants', { action: 'remove', ids: [3] }],
  ]);
  expect(toast.mock.calls.map(([message]) => message)).toEqual(['ABC-3 回到待找', '已移除：ABC-3']);
});

it('只读的机器：输入框、添加与每行的键都禁用', async () => {
  serve(listed([want(2)]));
  const { host } = await open(true);
  expect(host.querySelector<HTMLInputElement>('input[aria-label="番号"]')!.disabled).toBe(true);
  expect(buttonNamed('添加', host)!.disabled).toBe(true);
  expect(buttonNamed('移除', host)!.disabled).toBe(true);
  expect(buttonNamed('搜索资源', host)!.disabled).toBe(true);
});
