import { notifyManager, QueryClientProvider } from '@tanstack/react-query';
import { afterEach, expect, it, vi } from 'vitest';
import { queryClient } from '../../src/react/query';
import { DiagnosticsPage } from '../../src/react/diagnostics/diagnostics-page';
import { DIAGNOSTICS_KEY, type DiagnosticReport } from '../../src/react/diagnostics/diagnostics';
import { buttonNamed, click, fetchMock, mount, settle } from './render';

notifyManager.setScheduler(notify => notify());
afterEach(() => queryClient.clear());
const data = (): DiagnosticReport => ({ version: 'test', status: 'warning', checks: {
  media_mounts: { label: '媒体挂载', status: 'warning', reason: '来源不存在', action: '检查媒体目录', target: '/configuration', details: {} },
  security: { label: '访问安全', status: 'warning', reason: '密码未开启', action: '开启密码', target: '/configuration', details: {} },
  data_root: { label: '数据目录', status: 'failed', reason: '没有权限', action: '调整权限', target: null, details: {} },
}, library: { issue_at: null, groups: {
  duration: { label: '缺时长', count: 2, status: 'ok', truncated: false, items: [{ id: 1, code: 'ABC-123' }, { id: 2, code: null }] },
  cover: { label: '缺封面', count: 0, status: 'ok', truncated: false, items: [] },
} }, sources: [{ source: 'javdb', label: 'javdb', status: 'unknown', reason: '当前解析状态未取得', last_success_at: null, cooldown_until: null }] });
async function open(report = data()) {
  queryClient.setQueryData(DIAGNOSTICS_KEY, report);
  const props = { navigate: vi.fn(), configure: vi.fn(), openItem: vi.fn(), receipt: vi.fn() };
  const host = await mount(<QueryClientProvider client={queryClient}><DiagnosticsPage {...props} /></QueryClientProvider>);
  return { host, props };
}
it('诊断跳到具体配置分栏，系统权限项只显示动作', async () => {
  const { host, props } = await open();
  await click(buttonNamed('打开媒体配置', host));
  await click(buttonNamed('打开网络与访问配置', host));
  expect(props.configure.mock.calls).toEqual([['媒体'], ['网络与访问']]);
  const root = [...host.querySelectorAll('h3')].find(node => node.textContent === '数据目录')!.parentElement!.parentElement!;
  expect(root.textContent).toContain('调整权限');
  expect(root.querySelector('button')).toBeNull();
  expect(host.textContent).toContain('当前解析状态未取得');
});
it('展开清单、复制番号与作品编号；零结果有独立空态', async () => {
  const clipboard = vi.fn(async () => {});
  vi.stubGlobal('navigator', { clipboard: { writeText: clipboard } });
  const { host, props } = await open();
  await click(host.querySelector('summary'));
  await click(buttonNamed('ABC-123', host));
  expect(props.openItem).toHaveBeenCalledWith(1);
  await click(buttonNamed('复制当前清单', host));
  await settle();
  expect(clipboard).toHaveBeenCalledWith('ABC-123\n作品 #2');
  expect(props.receipt).toHaveBeenCalledWith('已复制清单');
  expect(host.querySelector('[data-empty-state]')?.textContent).toContain('清单为空');
});
it('请求失败保留原因和重试入口', async () => {
  vi.stubGlobal('fetch', fetchMock(403, { detail: '请在运行 Peach 的电脑上打开系统诊断' }));
  const props = { navigate: vi.fn(), configure: vi.fn(), openItem: vi.fn(), receipt: vi.fn() };
  const host = await mount(<QueryClientProvider client={queryClient}><DiagnosticsPage {...props} /></QueryClientProvider>);
  await settle();
  expect(host.textContent).toContain('诊断读取失败');
  expect(host.textContent).toContain('请在运行 Peach 的电脑上打开系统诊断');
  expect(buttonNamed('重新检查', host)).not.toBeNull();
});
