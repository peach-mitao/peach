/* React 子树的构建入口（`web/dist/peach-react.js`），按 `bundle.d.ts` 的签名导出命令式入口。页面与页面里的
 * 附属面都由路由树画（`router/`），常驻层各有自己的 `configureXxx`：已收进常驻表的批量条与配色卡交出句柄或
 * 宿主、由路由树画，其余几座各建一棵根。共享缓存、减弱动效与弹出层容器见
 * `providers.tsx`。 */
import './styles.css';

export { configureBatchDock } from './batch-dock/batch-dock-island';
export { configureGlowPicker } from './glow-picker/glow-picker-island';
export { configureImmerse } from './immerse/immerse-island';
export { configureManageHeader } from './manage-header/manage-header-island';
export { prefetchManagedRoute } from './router/managed-routes';
export { configureRouter } from './router/router';
export { configureSettingsPanel } from './settings-panel/settings-panel';
export { configureSidebar } from './sidebar/sidebar-island';
export { configureStage } from './stage/stage';
export { mountToaster, showToast } from './toaster';
