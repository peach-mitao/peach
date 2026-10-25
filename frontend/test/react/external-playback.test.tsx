import { expect, it, vi } from 'vitest';
import { ExternalPlayback, playerLink } from '../../src/react/item-detail/external-playback';
import { click, mount, settle } from './render';

it('外部播放器只在用户请求后签发链接，并保留网络地址供 VR 播放器使用', async () => {
  localStorage.removeItem('peach.external-player.v1');
  const fetcher = vi.fn(async () => ({ ok: true, json: async () => ({
    url: '/external-stream/1?ticket=short', playlist: '/external-playlist/1.m3u?ticket=short',
  }) }));
  vi.stubGlobal('fetch', fetcher);
  const host = await mount(<ExternalPlayback id={1} />);
  expect(fetcher).not.toHaveBeenCalled();
  await click(Array.from(host.querySelectorAll('button')).find(button => button.textContent === '生成播放链接')!);
  await settle();
  expect(fetcher.mock.calls).toHaveLength(1);
  expect(host.querySelector('a')?.getAttribute('href')).toContain('/external-playlist/1.m3u?ticket=short');
  expect(host.querySelector('input')?.value).toContain('/external-stream/1?ticket=short');
});

it('本地 mpv 让服务端打开文件，不签发网络地址', async () => {
  localStorage.setItem('peach.external-player.v1', 'mpv');
  const fetcher = vi.fn(async () => ({ ok: true, json: async () => ({ opened: true }) }));
  vi.stubGlobal('fetch', fetcher);
  const host = await mount(<ExternalPlayback id={4} />);
  await click(Array.from(host.querySelectorAll('button')).find(button => button.textContent === '用 mpv 打开')!);
  await settle();
  expect(String(fetcher.mock.calls[0]?.[0])).toContain('/api/external-playback/mpv?id=4');
  expect(host.textContent).toContain('已用本机 mpv 打开。');
  expect(host.querySelector('a')).toBeNull();
});

it('专属协议只编码服务端播放地址', () => {
  const url = 'https://peach.example/external-stream/1?ticket=a.b';
  expect(playerLink('vlc-ios', url, '/list')).toBe(`vlc-x-callback://x-callback-url/stream?url=${encodeURIComponent(url)}`);
  expect(playerLink('iina', url, '/list')).toBe(`iina://weblink?url=${encodeURIComponent(url)}`);
  expect(playerLink('unknown', url, '/list')).toBe('/list');
});
