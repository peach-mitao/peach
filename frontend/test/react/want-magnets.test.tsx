import { QueryClientProvider, notifyManager } from '@tanstack/react-query';
import { afterEach, expect, it, vi } from 'vitest';
import { queryClient } from '../../src/react/query';
import { WantMagnets, type MagnetCandidate } from '../../src/react/wants/want-magnets';
import type { Want } from '../../src/react/wants/wants';
import { buttonNamed, click, mount, pending, settle } from './render';

notifyManager.setScheduler((notify) => notify());
afterEach(() => queryClient.clear());
const candidate: MagnetCandidate = {
  id: 'magnet:abc', protocol: 'magnet', info_hash: 'abc', uri: 'magnet:?xt=urn:btih:abc',
  name: 'DEMO-001 HD', size: '4 GB', files: '2 個文件', date: '2026-10-01', attributes: ['字幕', '高清'],
  source: 'JavDB', source_url: 'https://javdb.com/v/demo', origins: ['https://javdb.com/v/demo'],
};
async function open(items = [candidate], readOnly = false, ok = true) {
  vi.stubGlobal('IntersectionObserver', undefined);
  const toast = vi.fn();
  const fetcher = vi.fn(async (_url: string, init?: RequestInit) => ({ ok: true, status: 200,
    json: async () => init?.method === 'POST'
      ? { ok, outcome: ok ? 'submitted' : 'failed', task: { failure_detail: '远端拒绝' } }
      : { state: 'ready', items, error: '', checked_at: null },
  }));
  vi.stubGlobal('fetch', fetcher);
  const host = await mount(<QueryClientProvider client={queryClient}>
    <WantMagnets want={{ id: 1, code: 'DEMO-001', title: '演示作品' } as Want} readOnly={readOnly}
      downloads={{ available: true, providers: [{ key: '115', label: '115', configured: true, target: '/下载' }], tasks: [] }}
      provider="115" toast={toast} />
  </QueryClientProvider>);
  await settle();
  return { host, fetcher, toast };
}
it('自动查询，展示来源、大小、日期与属性，直接添加到选定的云下载目录', async () => {
  const { host, fetcher, toast } = await open();
  expect(fetcher.mock.calls[0]?.[0]).toBe('/api/wants/magnets?id=1');
  for (const text of ['4 GB', '2 個文件', '2026-10-01', '字幕', '高清', 'JavDB']) expect(host.textContent).toContain(text);
  await click(buttonNamed('添加下载', host));
  await settle();
  const writes = fetcher.mock.calls.filter(([, init]) => init?.method === 'POST');
  expect(JSON.parse(String(writes[0]?.[1]?.body))).toEqual({ magnet: candidate.uri, provider: '115', target: '/下载',
    code: 'DEMO-001', title: '演示作品', origin: 'wishlist:1' });
  expect(buttonNamed('已添加', host)?.disabled).toBe(true);
  expect(toast).toHaveBeenCalledWith('已添加下载：DEMO-001 HD');
});
it('ed2k 与网页链接可复制，不能作为磁链提交', async () => {
  const writeText = vi.fn(async () => {});
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
  const ed2k = { ...candidate, id: 'ed2k:abc:12', protocol: 'ed2k' as const, uri: 'ed2k://|file|demo|12|abc|/' };
  const { host } = await open([ed2k]);
  expect(buttonNamed('添加下载', host)).toBeNull();
  await click(buttonNamed('复制链接', host));
  expect(writeText).toHaveBeenCalledWith(ed2k.uri);
});
it('提交等待期保持按钮可聚焦并拦截重复点击', async () => {
  const { host, fetcher, toast } = await open();
  const held = pending<{ ok: boolean; outcome: string; task: { failure_detail: string } }>();
  fetcher.mockImplementationOnce(async () => ({ ok: true, status: 200, json: () => held.answer }));
  const add = buttonNamed('添加下载', host)!;
  await click(add);
  await click(add);
  expect(add.getAttribute('aria-busy')).toBe('true');
  expect(add.disabled).toBe(false);
  expect(fetcher.mock.calls.filter(([, init]) => init?.method === 'POST')).toHaveLength(1);
  expect(toast).not.toHaveBeenCalled();
  await held.release({ ok: true, outcome: 'submitted', task: { failure_detail: '' } });
  await settle();
  expect(buttonNamed('已添加', host)?.disabled).toBe(true);
});
it('只读时禁止提交，远端失败留在卡片并保留重试', async () => {
  const reader = await open([candidate], true);
  expect(buttonNamed('添加下载', reader.host)?.disabled).toBe(true);
  const writer = await open([candidate], false, false);
  await click(buttonNamed('添加下载', writer.host));
  await settle();
  expect(writer.host.textContent).toContain('远端拒绝');
  expect(buttonNamed('已添加', writer.host)).toBeNull();
  expect(writer.toast).not.toHaveBeenCalled();
});
