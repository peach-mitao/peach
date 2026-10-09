/** 系统诊断的路由登记；打开宿主的能力由壳提供。标题、管理区身份与换一批的行为登记在 `ROUTE_META`。 */
export function registerDiagnosticsRoute(open: (push: boolean) => Promise<void>): void {
  const host = window as unknown as { peachRegisterRoute(spec: object): void };
  host.peachRegisterRoute({ match: '/diagnostics', open: (_params: object, push: boolean) => open(push) });
}
