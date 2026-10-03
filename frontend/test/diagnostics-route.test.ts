import { afterEach, expect, it, vi } from 'vitest';
import { registerDiagnosticsRoute } from '../src/diagnostics-route';

afterEach(() => vi.unstubAllGlobals());
it('诊断入口在前端登记并交给壳打开宿主', async () => {
  const register = vi.fn();
  vi.stubGlobal('window', { peachRegisterRoute: register });
  const open = vi.fn(async () => {});
  registerDiagnosticsRoute(open);
  const spec = register.mock.calls[0]![0] as { match: string; title: string; open(params: object, push: boolean): Promise<void> };
  expect([spec.match, spec.title]).toEqual(['/diagnostics', '系统诊断']);
  await spec.open({}, false);
  expect(open).toHaveBeenCalledWith(false);
});
