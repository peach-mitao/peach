import { afterEach, expect, it, vi } from 'vitest';
import { registerDiagnosticsRoute } from '../src/diagnostics-route';
import { routeMetaOf } from '../src/history';

afterEach(() => vi.unstubAllGlobals());
it('诊断入口在前端登记并交给壳打开宿主', async () => {
  const register = vi.fn();
  vi.stubGlobal('window', { peachRegisterRoute: register });
  const open = vi.fn(async () => {});
  registerDiagnosticsRoute(open);
  const spec = register.mock.calls[0]![0] as { match: string; open(params: object, push: boolean): Promise<void> };
  expect(spec.match).toBe('/diagnostics');
  await spec.open({}, false);
  expect(open).toHaveBeenCalledWith(false);
});

it('诊断页的标题、管理区身份与换一批由路由元数据登记', () => {
  expect(routeMetaOf('/diagnostics')).toEqual({ section: 'configuration', title: '系统诊断', refresh: 'reopen' });
});
