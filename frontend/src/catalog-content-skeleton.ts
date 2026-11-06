import { skeletonHtml } from './ui-kit/skeleton';
import { catalogView } from './react/catalog-grid/catalog-view';
import { catalogTableSnapshot, type TableSnapshot } from './react/catalog-grid/catalog-table-columns';
import { esc } from './core';
import { COMPLETION_ROW_SKELETON_HTML, completionRowRemembered } from './react/library-processing/completion-row';

/** 列表骨架一格的内容，壳与列表岛共用：名称格是缩略图和两行标题，艺人格是圆头像加一条，媒体库、厂牌格是
 *  小标识加一条，其余列一条短条。 */
export function catalogListSkeletonCellHtml(column: string): string {
  if (column === 'name') return '<span data-list-skeleton-name><i class="skeleton-sheen"></i><span><i class="skeleton-sheen"></i><i class="skeleton-sheen"></i></span></span>';
  if (column === 'people' || column === 'library' || column === 'studio') return `<span data-list-skeleton-mark="${column}"><b class="skeleton-sheen"></b><i class="skeleton-sheen"></i></span>`;
  return '<i data-list-skeleton-bar class="skeleton-sheen"></i>';
}

/* The shell's list skeleton reuses the real table's outer frame and `bui-table` class: one toolbar row, real column names in the header, column widths from local column preferences;
 *  after the list island takes over, the same skeleton rows are drawn inside the real table and the structure does not change before data arrives. */
function catalogListSkeletonHtml(label: string): string {
  return `<div class="peach-react catalog-skeleton" data-skeleton="catalog/list" role="status" aria-busy="true" aria-label="${esc(label)}">`
    + listTableSkeletonHtml(catalogTableSnapshot(), completionRowRemembered() ? COMPLETION_ROW_SKELETON_HTML : '') + '</div>';
}

/** 工具栏一行加按列偏好排好的表格骨架；馆藏列表与 JAV 新作列表共用，`between` 插在工具栏与表格之间。 */
export function listTableSkeletonHtml(columns: TableSnapshot, between = ''): string {
  const flexible = columns.some(column => column.width === null);
  const minimum = columns.reduce((sum, column) => sum + (column.width ?? column.min), 0);
  const cols = columns.map(column => column.width === null ? '<col>' : `<col style="width:${column.width}px">`).join('')
    + (flexible ? '' : '<col>');
  const head = columns.map(column => `<th>${esc(column.label)}</th>`).join('') + (flexible ? '' : '<th></th>');
  const row = `<tr>${columns.map(column => `<td>${catalogListSkeletonCellHtml(column.id)}</td>`).join('')}${flexible ? '' : '<td></td>'}</tr>`;
  return '<div data-list-skeleton aria-hidden="true"><div data-list-skeleton-tools><i class="skeleton-sheen"></i></div>' + between
    + `<div data-board-data-table><div class="w-full overflow-x-auto"><table class="bui-table bui-table-sm" style="table-layout:fixed;min-width:${minimum}px">`
    + `<colgroup>${cols}</colgroup><thead><tr>${head}</tr></thead><tbody>${row.repeat(6)}</tbody></table></div></div></div>`;
}

/** Library and profile pages share one video waiting state according to the current list preference. */
export function catalogContentSkeletonHtml(label: string, cardRatio: number): string {
  if (catalogView() === 'list') return catalogListSkeletonHtml(label);
  return skeletonHtml(label, { variant: 'cards', className: 'catalog-skeleton postercard-skeleton', cardRatio });
}
