/* 活动页云下载段的行为：提交表单带什么、任务卡给哪些键、没配置与只读端说什么。 */
import { QueryClientProvider } from '@tanstack/react-query';
import { afterEach, expect, it, vi } from 'vitest';

import { DownloadsPanel, downloadPollInterval, type DownloadPrefill } from '../../src/react/activity/downloads-panel';
import type { DownloadsSnapshot, DownloadSubmitResult, DownloadTask } from '../../src/react/bundle';
import { queryClient } from '../../src/react/query';
import { buttonNamed, choose, click, mount, section, settle, submit, type } from './render';

afterEach(() => queryClient.clear());

const task = (patch: Partial<DownloadTask> = {}): DownloadTask => ({
  id: 1, info_hash: 'a'.repeat(40), provider: '115', provider_label: '115', source_uri: 'magnet:?xt=urn:btih:' + 'a'.repeat(40),
  display_name: 'ABC-123.mp4', target: '/115/云下载', code: 'ABC-123', title: null, origin: 'paste',
  state: 'remote_running', state_label: '远端下载中', failure: null, failure_label: null, failure_detail: null,
  progress: 0.42, remote_name: null, ledger_path: null, asset_id: null, submitted_at: '2026-10-01T08:00:00Z',
  updated_at: '2026-10-01T08:01:00Z', finished_at: null, blocked: false, cancellable: true, resubmittable: false,
  ...patch,
});

const snapshot = (patch: Partial<DownloadsSnapshot> = {}): DownloadsSnapshot => ({
  available: true,
  providers: [
    { key: '115', label: '115', configured: true, target: '/115/云下载' },
    { key: 'pikpak', label: 'PikPak', configured: true, target: '/云下载' },
  ],
  tasks: [],
  ...patch,
});

type Call = [string, RequestInit | undefined];

/** 读接口回 `shown`；写接口按地址回 `answers` 里那一份。 */
function serve(shown: DownloadsSnapshot, answers: Record<string, unknown> = {}) {
  const calls: Call[] = [];
  vi.stubGlobal('fetch', vi.fn(async (input: string, init?: RequestInit) => {
    calls.push([input, init]);
    const body = init?.method === 'POST' ? answers[input] : shown;
    return { ok: true, status: 200, json: async () => body };
  }));
  const posts = () => calls.filter(([, init]) => init?.method === 'POST')
    .map(([url, init]) => [url, JSON.parse(String(init!.body))]);
  return { calls, posts };
}

const show = async (prefill?: DownloadPrefill) => {
  const host = await mount(<QueryClientProvider client={queryClient}><DownloadsPanel prefill={prefill} /></QueryClientProvider>);
  // 首屏取数要走完 fetch、json 与 Query 派发三段，等到这一段画出内容为止。
  await vi.waitFor(async () => {
    await settle();
    if (!host.childElementCount) throw new Error('云下载段还没画出来');
  });
  return host;
};

const field = (host: HTMLElement, label: string) =>
  [...host.querySelectorAll('label')].find((node) => node.textContent?.trim() === label)
    ?.closest('[data-input-size]')?.querySelector('input') ?? null;

it('提交带上渠道、目标目录、番号与来处，成功后清空磁力框并说明下一步', async () => {
  const result: DownloadSubmitResult = { ok: true, outcome: 'submitted', task: task({ state: 'submitted' }) };
  const { posts } = serve(snapshot(), { '/api/downloads': result });
  const host = await show({ code: 'ABC-123', title: '一部作品', origin: 'asset:12', searchReason: '中字' });
  expect(host.textContent).toContain('版本目标：中字');
  expect(field(host, '搜索资源')?.value).toBe('ABC-123');
  expect(field(host, '番号')?.value).toBe('ABC-123');
  expect(field(host, '目标目录')?.value).toBe('/115/云下载');
  expect(document.activeElement).toBe(field(host, '磁力链接'));
  expect(host.textContent).toContain('给「一部作品」找来的资源');
  await type(field(host, '磁力链接'), 'magnet:?xt=urn:btih:' + 'b'.repeat(40));
  await submit(section(host, '提交磁力'));
  await settle();
  expect(posts()).toEqual([['/api/downloads', {
    magnet: 'magnet:?xt=urn:btih:' + 'b'.repeat(40), provider: '115', target: '/115/云下载',
    code: 'ABC-123', title: '一部作品', origin: 'asset:12',
  }]]);
  expect(field(host, '磁力链接')?.value).toBe('');
  expect(host.querySelector('[role=status]')?.textContent).toContain('已提交');
});

it('换渠道时目标目录跟着换成那一路配置的目录，提交键是主按钮', async () => {
  serve(snapshot());
  const host = await show();
  expect(buttonNamed('提交离线下载', host)?.className).toContain('bg-button-primary');
  expect(host.textContent).toContain('115 每提交一次扣一条离线配额');
  await choose(host.querySelector('[aria-label="下载到"]'), 'PikPak');
  expect(field(host, '目标目录')?.value).toBe('/云下载');
  expect(host.textContent).not.toContain('115 每提交一次扣一条离线配额');
});

it('只列配置好的渠道；一个都没配时说去哪里配，不画表单', async () => {
  serve(snapshot({ providers: [
    { key: '115', label: '115', configured: false, target: '' },
    { key: 'pikpak', label: 'PikPak', configured: false, target: '' },
  ] }));
  const host = await show();
  expect(section(host, '提交磁力')).toBeNull();
  expect(host.textContent).toContain('在配置页「媒体」分组');
});

it('远端在跑的任务给进度与取消键，取消发到取消接口', async () => {
  const { posts } = serve(snapshot({ tasks: [task()] }), { '/api/downloads/cancel': { ok: true, task: task() } });
  const host = await show();
  const card = host.querySelector('[data-download-state=remote_running]')!;
  expect(card.querySelector('[role=progressbar]')?.getAttribute('aria-valuenow')).toBe('42');
  expect(card.textContent).toContain('远端下载中');
  expect(buttonNamed('重新提交', card)).toBeNull();
  await click(buttonNamed('取消', card));
  await settle();
  expect(posts()).toEqual([['/api/downloads/cancel', { id: 1 }]]);
});

it('失败的任务写中文原因，可以重新提交；被判违规的只剩复制磁力', async () => {
  const failed = task({ id: 2, state: 'failed', state_label: '失败', failure: 'no_source', cancellable: false,
    resubmittable: true, failure_label: '没有可用的资源', failure_detail: '远端任务列表里找不到它' });
  const blocked = task({ id: 3, state: 'failed', state_label: '失败', failure: 'rejected', cancellable: false,
    blocked: true, failure_label: '被判违规', failure_detail: '50038' });
  const { posts } = serve(snapshot({ tasks: [failed, blocked] }),
    { '/api/downloads': { ok: true, outcome: 'submitted', task: failed } });
  const host = await show();
  const [first, second] = [...host.querySelectorAll('[data-download-state=failed]')];
  expect(first?.textContent).toContain('没有可用的资源：远端任务列表里找不到它');
  expect(second?.textContent).toContain('被判违规');
  expect([buttonNamed('取消', second!), buttonNamed('重新提交', second!)]).toEqual([null, null]);
  expect(buttonNamed('复制磁力', second!)).not.toBeNull();
  await click(buttonNamed('重新提交', first!));
  await settle();
  expect(posts()).toEqual([['/api/downloads', {
    magnet: failed.source_uri, provider: '115', target: '/115/云下载', code: 'ABC-123', title: null, origin: 'paste',
  }]]);
});

it('只读端说明原因，任务照常列出但没有取消键', async () => {
  serve(snapshot({ available: false, tasks: [task()] }));
  const host = await show();
  expect(host.textContent).toContain('云下载只在账本写入端可用');
  expect(section(host, '提交磁力')).toBeNull();
  expect(buttonNamed('取消', host)).toBeNull();
});

it('有任务还在跟进时五秒查一次，全是终态三十秒一次', () => {
  expect(downloadPollInterval(snapshot({ tasks: [task()] }))).toBe(5_000);
  expect(downloadPollInterval(snapshot({ tasks: [task({ cancellable: false, state: 'ingested' })] }))).toBe(30_000);
  expect(downloadPollInterval(undefined)).toBe(30_000);
});
