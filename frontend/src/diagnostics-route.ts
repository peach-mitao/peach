/** 系统诊断的路由登记；打开宿主的能力由壳提供。 */
export function registerDiagnosticsRoute(open: (push: boolean) => Promise<void>): void {
  const host = window as unknown as { peachRegisterRoute(spec: object): void };
  host.peachRegisterRoute({ match: '/diagnostics', section: 'configuration', title: '系统诊断', refresh: 'reopen',
    open: (_params: object, push: boolean) => open(push) });
}
