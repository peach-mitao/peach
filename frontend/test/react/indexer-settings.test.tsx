import { notifyManager, QueryClientProvider } from '@tanstack/react-query';
import { afterEach, expect, it, vi } from 'vitest';
import { queryClient } from '../../src/react/query';
import { IndexerSettings } from '../../src/react/settings/indexer-settings';
import { buttonNamed, click, mount, pending, settle, submit, type } from './render';

notifyManager.setScheduler(notify => notify());
afterEach(() => queryClient.clear());
it('进入资源搜索设置时先读取当前值，再创建表单草稿', async () => {
  const row = { key: 'one', name: '缓存名称', url: 'https://example.com/api', enabled: true, api_key_set: false };
  queryClient.setQueryData(['indexers'], { indexers: [row], max_indexers: 4 });
  const hold = pending<unknown>();
  vi.stubGlobal('fetch', vi.fn(() => hold.answer));
  const host = await mount(<QueryClientProvider client={queryClient}><IndexerSettings receipt={vi.fn()} /></QueryClientProvider>);
  expect(host.querySelector('form')).toBeNull();
  await hold.release({ ok: true, status: 200, json: async () => ({ indexers: [{ ...row, name: '当前名称' }], max_indexers: 4 }) });
  await settle();
  expect(host.querySelector<HTMLInputElement>('input')?.value).toBe('当前名称');
});

it('普通 HTTP 的随机源支持添加、编辑、移除和保存多个索引器', async () => {
  vi.stubGlobal('crypto', { getRandomValues: crypto.getRandomValues.bind(crypto) });
  const fetch = vi.fn(async (_url: string, options?: RequestInit) => ({
    ok: true, status: 200,
    json: async () => options?.body ? JSON.parse(String(options.body)) : { indexers: [], max_indexers: 4 },
  }));
  vi.stubGlobal('fetch', fetch);
  const host = await mount(<QueryClientProvider client={queryClient}><IndexerSettings receipt={vi.fn()} /></QueryClientProvider>);
  await settle();
  await click(buttonNamed('添加索引器', host));
  await click(buttonNamed('添加索引器', host));
  const names = host.querySelectorAll<HTMLInputElement>('input[type="text"]');
  await type(names[0], '第一个');
  await type(names[1], '第二个');
  await click(buttonNamed('移除索引器 1', host));
  await submit(host.querySelector('form'));
  const sent = JSON.parse(String(fetch.mock.calls.at(-1)?.[1]?.body));
  expect(sent.indexers).toHaveLength(1);
  expect(sent.indexers[0]).toMatchObject({ name: '第二个', enabled: true });
  expect(sent.indexers[0].key).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
});
