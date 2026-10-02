import { act } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { afterEach, expect, it, vi } from 'vitest';
import { ResourceSearch } from '../../src/react/activity/resource-search';
import { IndexerSettings } from '../../src/react/settings/indexer-settings';
import { SourceLink } from '../../src/react/follow-manage/source-view';
import { queryClient } from '../../src/react/query';
import { buttonNamed, click, mount, section, settle, submit, type } from './render';

afterEach(() => queryClient.clear());

it('来源名称旁显示渠道性质，链接仍指向该来源', async () => {
  const host = await mount(<SourceLink source={{ id: 1, provider: 'kemono', provider_label: 'Kemono',
    ref: 'fanbox/1', label: '演示作者', url: 'https://example.com/author', enabled: true, nature: '归档站' }} />);
  expect(host.textContent).toContain('归档站');
  expect(host.querySelector('a')?.href).toBe('https://example.com/author');
});
const field = (host: HTMLElement, label: string) => [...host.querySelectorAll('label')]
  .find((node) => node.textContent?.trim() === label)?.closest('[data-input-size]')?.querySelector('input');

it('回车按番号查询，选择候选只填表单', async () => {
  const choose = vi.fn();
  const fetch = vi.fn(async (_url: string) => ({ ok: true, json: async () => ({ state: 'ready', warnings: ['一处来源未响应'],
    error: '', items: [{ id: 'a', uri: 'magnet:?xt=urn:btih:' + 'a'.repeat(40), name: 'ABC-123 4K',
      size: 1024 ** 3, seeders: 2, origins: ['测试源'], nature: '用户自配索引器', resolution: 2160, codec: 'HEVC' }] }) }));
  vi.stubGlobal('fetch', fetch);
  const host = await mount(<ResourceSearch initialCode="ABC-123" choose={choose} />);
  await act(async () => field(host, '搜索资源')!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })));
  await settle();
  expect(fetch.mock.calls[0]?.[0]).toContain('/api/resources/search?code=ABC-123&goal=quality');
  expect(host.textContent).toContain('一处来源未响应');
  expect(host.textContent).toContain('用户自配索引器');
  await click(buttonNamed('选用此资源', host));
  expect(choose).toHaveBeenCalledWith('magnet:?xt=urn:btih:' + 'a'.repeat(40), 'ABC-123');
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(host.textContent).toContain('已填入磁力');
});

it('设置保存后清空 API key，移除需再保存才生效', async () => {
  const initial = { max_indexers: 4, indexers: [{ key: 'one', name: '测试源', url: 'http://indexer.test/api',
    enabled: true, api_key_set: true }] };
  const posts: unknown[] = [];
  vi.stubGlobal('fetch', vi.fn(async (_url: string, init?: RequestInit) => {
    if (init?.method === 'POST') posts.push(JSON.parse(String(init.body)));
    return { ok: true, json: async () => initial };
  }));
  const host = await mount(<QueryClientProvider client={queryClient}><IndexerSettings receipt={vi.fn()} /></QueryClientProvider>);
  await vi.waitFor(async () => { await settle(); expect(section(host, '资源索引器')).not.toBeNull() });
  expect(host.textContent).toContain('启用 · 用户自配索引器');
  expect(host.textContent).toContain('清除已保存的 API key');
  await type(field(host, '索引器 1 API key'), 'private-test-key');
  await submit(section(host, '资源索引器'));
  await settle();
  expect(posts).toHaveLength(1);
  expect(field(host, '索引器 1 API key')?.value).toBe('');
  await click(buttonNamed('移除索引器 1', host));
  expect(posts).toHaveLength(1);
  await submit(section(host, '资源索引器'));
  expect(posts[1]).toEqual({ indexers: [] });
});
