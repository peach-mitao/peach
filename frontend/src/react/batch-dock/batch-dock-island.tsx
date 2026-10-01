/* 批量条岛（ADR-0031 第 11g 步）：目录、回收站、垃圾文件与关注页多选时底部那块浮条。
 *
 * 宿主是壳常驻在 `body` 末尾的 `[data-batch-dock]`，一棵根常驻，壳只拿 `configureBatchDock` 给的
 * 命令式入口：每次重画选中态推一份计数与语境。浮条外壳是共用的 `SelectionDock`（复核、标签页、
 * 关注管理同一块），它要 `.peach-react` 作用域里的 token 与 Preflight，所以根里包一层
 * `display: contents` 的 `.peach-react`，不占盒子。
 *
 * 浮条上的键是透明 `<button>`：尺寸、描边、字号与 17px 字形照 ADR-0031 的迁移前基线，全部写在
 * `batch-dock.css`；BoardUI `Button` 的 medium 档是 20px 字形、8px 内边距，对不上。危险键挂
 * `data-danger`，红色读 `../styles.css` 里全站那一份危险键规则。 */
import { flushSync } from 'react-dom';
import { createRoot, type Root } from 'react-dom/client';

import { SelectionDock } from '../components/selection-dock';
import { Providers } from '../providers';
import { batchActions, type BatchDockApi, type BatchDockHost, type BatchDockProps } from './batch-dock-api';
import './batch-dock.css';

let host: BatchDockHost | null = null;
let root: Root | null = null;
let props: BatchDockProps = { count: 0, context: 'catalog', junkDismissed: false };

function paint(): void {
  const at = host;
  if (!at || !root) return;
  const current = props;
  flushSync(() => root!.render(<Providers><BatchDock host={at} props={current} /></Providers>));
}

const api: BatchDockApi = {
  render(next) { props = next; paint() },
};

/** 接上壳给的宿主，拿回批量条岛的命令式入口。只调一次。 */
export function configureBatchDock(next: BatchDockHost): BatchDockApi {
  host = next;
  root = createRoot(next.root);
  paint();
  return api;
}

function BatchDock({ host: at, props: view }: { host: BatchDockHost; props: BatchDockProps }) {
  return (
    <div className="peach-react" data-batch-scope="" data-context={view.context}>
      <SelectionDock label="所选项目操作" visible={view.count > 0} count={`已选 ${view.count} 项`}>
        {batchActions(view.context, view.junkDismissed).map((action) => (
          <button key={`${action.group}:${action.operation}`} type="button" data-batch-group={action.group}
            data-batch-action={action.operation} data-danger={action.danger ? '' : undefined}
            onClick={(event) => at.run(action.group, action.operation, event.currentTarget)}>
            <svg aria-hidden viewBox="0 0 24 24"><use href={`#i-${action.glyph}`} /></svg>
            {action.label}
          </button>
        ))}
      </SelectionDock>
    </div>
  );
}
