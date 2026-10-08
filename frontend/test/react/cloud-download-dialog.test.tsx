/* 云下载弹层的行为：提交带什么、成功后回执并关上、失败留在原处、没配置与只读端说什么。 */
import { QueryClientProvider } from '@tanstack/react-query';
import { afterEach, expect, it, vi } from 'vitest';

import { CloudDownloadDialog, type DownloadPrefill } from '../../src/react/activity/cloud-download-dialog';
import type { DownloadsSnapshot, DownloadSubmitResult, DownloadTask } from '../../src/react/bundle';
import { queryClient } from '../../src/react/query';
import { buttonNamed, choose, mount, section, settle, submit, type } from './render';

afterEach(() => queryClient.clear());

const task = (patch: Partial<DownloadTask> = {}): DownloadTask => ({
  id: 1, info_hash: 'a'.repeat(40), provider: '115', provider_label: '115', source_uri: 'magnet:?xt=urn:btih:' + 'a'.repeat(40),
  display_name: 'ABC-123.mp4', target: '/115/云下载', code: 'ABC-123', title: null, origin: 'paste',
  state: 'submitted', state_label: '已提交', failure: null, failure_label: null, failure_detail: null,
  progress: null, remote_name: null, ledger_path: null, asset_id: null, submitted_at: '2026-10-01T08:00:00Z',
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

/** 读接口回 `shown`；写接口回 `answer`。 */
function serve(shown: DownloadsSnapshot, answer?: DownloadSubmitResult) {
  const posts: unknown[] = [];
  vi.stubGlobal('fetch', vi.fn(async (_input: string, init?: RequestInit) => {
    if (init?.method === 'POST') posts.push(JSON.parse(String(init.body)));
    return { ok: true, status: 200, json: async () => (init?.method === 'POST' ? answer : shown) };
  }));
  return posts;
}

/** 弹层画在 `body` 上的浮层容器里，不在挂载点里，所以从整页找。 */
const open = async (prefill: DownloadPrefill, provider?: string) => {
  const close = vi.fn();
  const receipt = vi.fn();
  await mount(
    <QueryClientProvider client={queryClient}>
      <CloudDownloadDialog prefill={prefill} close={close} receipt={receipt} provider={provider} />
    </QueryClientProvider>,
  );
  // 取到下载配置之后才画表单或那句说明；Query 的通知走定时器，只等微任务不够。
  await vi.waitFor(async () => {
    await settle();
    if (!document.querySelector('[role=dialog] form, [role=dialog] [role=note], [role=dialog] .p-5 > *')) {
      throw new Error('弹层还没取到下载配置');
    }
  });
  return { close, receipt, page: document.body };
};

const field = (root: HTMLElement, label: string) =>
  [...root.querySelectorAll('label')].find((node) => node.textContent?.trim() === label)
    ?.closest('[data-input-size]')?.querySelector('input') ?? null;

const MAGNET = 'magnet:?xt=urn:btih:' + 'b'.repeat(40);

it('带着番号与标题打开：标题行写番号与片名，搜索框与番号框已填，提交带上渠道、目录与来处', async () => {
  const posts = serve(snapshot(), { ok: true, outcome: 'submitted', task: task() });
  const { close, receipt, page } = await open({ code: 'ABC-123', title: '一部作品', origin: 'asset:12', searchReason: '中字' });
  expect(page.querySelector('[role=dialog]')?.textContent).toContain('ABC-123 一部作品');
  expect(page.textContent).toContain('版本目标：中字');
  expect(field(page, '搜索资源')?.value).toBe('ABC-123');
  expect(field(page, '番号')).toBeNull();
  expect(field(page, '目标目录')?.value).toBe('/115/云下载');
  await type(field(page, '磁力链接'), MAGNET);
  await submit(section(page, '提交磁力'));
  await settle();
  expect(posts).toEqual([{
    magnet: MAGNET, provider: '115', target: '/115/云下载', code: 'ABC-123', title: '一部作品', origin: 'asset:12',
  }]);
  expect(receipt).toHaveBeenCalledWith('已提交离线下载，进度在活动页');
  expect(close).toHaveBeenCalled();
});

it('提交没成功时弹层不关，原因留在表单里', async () => {
  serve(snapshot(), { ok: false, outcome: 'failed',
    task: task({ state: 'failed', failure_label: '没有可用的资源', failure_detail: '远端拒收' }) });
  const { close, receipt, page } = await open({});
  await type(field(page, '磁力链接'), MAGNET);
  await submit(section(page, '提交磁力'));
  await settle();
  expect(page.textContent).toContain('提交没有成功：没有可用的资源：远端拒收');
  expect([close.mock.calls.length, receipt.mock.calls.length]).toEqual([0, 0]);
});

it('入库页交进来的下载方式先选中；换渠道时目标目录跟着换，115 才提配额', async () => {
  serve(snapshot());
  const { page } = await open({}, 'pikpak');
  expect(field(page, '目标目录')?.value).toBe('/云下载');
  expect(page.textContent).not.toContain('扣一条离线配额');
  expect(buttonNamed('提交离线下载', page)?.className).toContain('bg-button-primary');
  await choose(page.querySelector('[role=dialog] [aria-label="下载到"]'), '115');
  expect(field(page, '目标目录')?.value).toBe('/115/云下载');
  expect(page.textContent).toContain('每提交一次扣一条离线配额');
});

it('一个渠道都没配时说去哪里配，不画表单', async () => {
  serve(snapshot({ providers: [
    { key: '115', label: '115', configured: false, target: '' },
    { key: 'pikpak', label: 'PikPak', configured: false, target: '' },
  ] }));
  const { page } = await open({});
  expect(section(page, '提交磁力')).toBeNull();
  expect(page.textContent).toContain('先在配置页「下载」分组');
});

it('只读端说明原因，不画表单', async () => {
  serve(snapshot({ available: false }));
  const { page } = await open({});
  expect(page.textContent).toContain('云下载只在账本写入端可用');
  expect(section(page, '提交磁力')).toBeNull();
});
