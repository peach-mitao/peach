import { expect, it, vi } from 'vitest';

import { DownloadSettings } from '../../src/react/settings/download-settings';
import type { DownloadSettingsState } from '../../src/react/bundle';
import { buttonNamed, click, fetchMock, mount, section, sentBody, settle, submit, type } from './render';

const state = (patch: Partial<DownloadSettingsState> = {}): DownloadSettingsState => ({
  available: true,
  config: { clouddrive_address: 'http://127.0.0.1:19798', targets: { '115': '/115/云下载' },
    pikpak_root: '', wait_hours: 168 },
  token_set: false,
  pikpak: { logged_in: false, username: '', remember: false },
  pikpak_roots: ['P:\\'],
  providers: [{ key: '115', label: '115' }, { key: 'pikpak', label: 'PikPak' }],
  max_wait_hours: 1440,
  ...patch,
});

const field = (host: HTMLElement, label: string) =>
  [...host.querySelectorAll('label')].find((node) => node.textContent?.trim() === label)
    ?.closest('[data-input-size]')?.querySelector('input') ?? null;

it('保存时令牌随表单交给服务端，回来后清空，提示改成已保存', async () => {
  const fetcher = fetchMock(200, state({ token_set: true }));
  vi.stubGlobal('fetch', fetcher);
  const receipt = vi.fn();
  const host = await mount(<DownloadSettings initial={state()} receipt={receipt} />);
  const token = field(host, 'CloudDrive2 API 令牌');
  expect(token?.type).toBe('password');
  await type(token, 'cd2-token');
  await submit(section(host, '云下载'));
  await settle();
  expect(fetcher.mock.calls[0]?.[0]).toBe('/api/configuration/downloads');
  expect(sentBody(fetcher)).toMatchObject({
    clouddrive_address: 'http://127.0.0.1:19798', token: 'cd2-token', targets: { '115': '/115/云下载' },
  });
  expect(receipt).toHaveBeenCalledWith('已保存配置');
  expect(field(host, 'CloudDrive2 API 令牌')?.value).toBe('');
  expect(field(host, 'CloudDrive2 API 令牌')?.placeholder).toBe('已保存，留空不改');
});

it('检查报出缺的权限、目标目录与剩余配额，操作键都是主按钮', async () => {
  vi.stubGlobal('fetch', fetchMock(200, {
    ok: true, address: 'http://127.0.0.1:19798', permissions: [{ name: 'a', label: '提交离线任务', granted: true },
      { name: 'b', label: '取消离线任务', granted: false }],
    missing: ['取消离线任务'], root: '/', folder: { path: '/115/云下载', can_offline: true, cloud: '115open' },
    quota: { total: 1500, used: 3, left: 1497 }, problems: [],
  }));
  const host = await mount(<DownloadSettings initial={state()} receipt={vi.fn()} />);
  for (const name of ['检查', '保存配置', '登录']) {
    expect(buttonNamed(name, host)?.className, name).toContain('bg-button-primary');
  }
  await click(buttonNamed('检查', host));
  await settle();
  expect(host.textContent).toContain('缺少：取消离线任务');
  expect(host.textContent).toContain('/115/云下载 可以离线下载');
  expect(host.textContent).toContain('本月还剩 1497 条，共 1500 条');
  expect(host.textContent).not.toContain('探测到');
});

it('地址留空时检查把探测到的本机地址填回表单，保存配置才带上它', async () => {
  const blank = state({ config: { clouddrive_address: '', targets: { '115': '/115/云下载' },
    pikpak_root: '', wait_hours: 168 } });
  const fetcher = fetchMock(200, {
    ok: true, address: 'http://127.0.0.1:29798', permissions: [], missing: [], root: '/',
    folder: null, quota: null, problems: [],
  });
  vi.stubGlobal('fetch', fetcher);
  const host = await mount(<DownloadSettings initial={blank} receipt={vi.fn()} />);
  expect(field(host, 'CloudDrive2 地址')?.placeholder).toBe('留空自动探测本机 19798 / 29798');
  await click(buttonNamed('检查', host));
  await settle();
  expect(sentBody(fetcher)).toMatchObject({ clouddrive_address: '' });
  expect(field(host, 'CloudDrive2 地址')?.value).toBe('http://127.0.0.1:29798');
  expect(host.textContent).toContain('探测到 http://127.0.0.1:29798，保存配置后生效');
  expect(fetcher).toHaveBeenCalledTimes(1);
  fetcher.mockImplementation(async () => ({ ok: true, status: 200, json: async () => blank }));
  await submit(section(host, '云下载'));
  await settle();
  expect(fetcher.mock.calls[1]?.[0]).toBe('/api/configuration/downloads');
  expect(sentBody(fetcher, 1)).toMatchObject({ clouddrive_address: 'http://127.0.0.1:29798' });
});

it('两个本机端口都不应答时原样报出服务端列的地址，表单仍留空', async () => {
  const blank = state({ config: { clouddrive_address: '', targets: {}, pikpak_root: '', wait_hours: 168 } });
  const problem = '没有填 CloudDrive2 地址，本机 http://127.0.0.1:19798、http://127.0.0.1:29798 都没有应答。';
  vi.stubGlobal('fetch', fetchMock(200, {
    ok: false, address: '', permissions: [], missing: [], root: '', folder: null, quota: null,
    problems: [problem],
  }));
  const host = await mount(<DownloadSettings initial={blank} receipt={vi.fn()} />);
  await click(buttonNamed('检查', host));
  await settle();
  expect(host.textContent).toContain(problem);
  expect(field(host, 'CloudDrive2 地址')?.value).toBe('');
});

it('PikPak 要人机验证时给出验证页，完成后再登录', async () => {
  vi.stubGlobal('fetch', fetchMock(200, {
    ok: false, captcha_url: 'https://user.mypikpak.com/captcha?x=1', settings: state(),
  }));
  const host = await mount(<DownloadSettings initial={state()} receipt={vi.fn()} />);
  await type(field(host, '账号'), 'me@example.com');
  await type(field(host, '密码'), 'pw');
  await submit(section(host, 'PikPak 账号'));
  await settle();
  const link = host.querySelector<HTMLAnchorElement>('a[href^="https://user.mypikpak.com/captcha"]');
  expect(link?.target).toBe('_blank');
  expect(host.textContent).toContain('回到这里再点一次「登录」');
});

it('登录之后只显示账号与密码保存与否，可以登出', async () => {
  const fetcher = fetchMock(200, state());
  vi.stubGlobal('fetch', fetcher);
  const receipt = vi.fn();
  const host = await mount(<DownloadSettings receipt={receipt}
    initial={state({ pikpak: { logged_in: true, username: 'me@example.com', remember: false } })} />);
  expect(host.textContent).toContain('me@example.com');
  expect(field(host, '密码')).toBeNull();
  await click(buttonNamed('登出', host));
  await settle();
  expect(fetcher.mock.calls[0]?.[0]).toBe('/api/configuration/downloads/pikpak/logout');
  expect(receipt).toHaveBeenCalledWith('已登出 PikPak');
  expect(buttonNamed('登录', host)).not.toBeNull();
});

it('只读端整块不可操作，并说明原因', async () => {
  const host = await mount(<DownloadSettings initial={state({ available: false })} receipt={vi.fn()} />);
  expect(buttonNamed('保存配置', host)?.disabled).toBe(true);
  expect(host.textContent).toContain('云下载只在账本写入端可用');
});
