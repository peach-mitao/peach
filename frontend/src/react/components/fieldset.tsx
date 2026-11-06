/* 管理区那张「一件要在这一页上做的事」的卡：填充底、16px 圆角、一层接触阴影，不描边，
 * 卡里分成正文和一条放按钮的页脚。页面上的卡一律靠填充底和页面分开，深色下再加一圈描边
 * 就成了同一页里一半卡有框、一半没有。
 *
 * In the legacy stylesheet the data management page's blocks (`.cleanupfieldset`, `[data-cleanup-processing]`,
 * `.resourcesyncbox`) were already the same card face (`web/board.css` merges them into one rule), differing only in layout:
 * - `split`: description left, buttons right, two vertically centered columns, body and footer each 24px padding; below
 *   1000px the buttons drop under the description, the footer goes left and loses its top padding. Media repair, empty
 *   folders and resource sync.
 * - `stack`: body on top, footer below, body `20px 20px 16px`, minimum 120px; the footer is a band slightly darker than the
 *   card (`--board-card-foot`), one line on top, `12px 20px`, minimum 56px. Scan and collect, organize and link management.
 *
 * 它和 `../settings/section.tsx` 的 `Section` 不是同一张：那一张是设置弹层的分组，标题在卡外；
 * 这一张的标题是卡内的 Title 2。 */
import type { ReactNode } from 'react';

import { cardClass } from './card';
import { FIELDSET_BODY, FIELDSET_FOOT, fieldsetClass, type FieldsetLayout } from './fieldset-layout';

/** 卡下面那块结果面板：同一副填充底、14px 圆角、不浮起。
 *  链接检查与资源同步把一趟后台任务的结论摆在这里，一段一段往下叠，段间一条发丝线。 */
export const RESULT_PANEL = cardClass({
  padding: 'none', radius: 'surface', className: 'overflow-hidden',
});

/** A section in the result panel: 16px padding, with a top border on every section except the first. */
export const RESULT_SECTION = 'border-t border-border-button-default p-4 first:border-t-0';

/** The section title row outside the cards (link management, resource sync), Title 2, 16px from the card below.
 *
 *  This page hangs in `#stats`, and the legacy sheet's `.stats h2` gives all second-level headings 24px and a 4px bottom margin.
 *  It is not in a layer, so utilities cannot win; hence the `!` on both the type and margin groups. */
export function SectionHeading({ id, children }: { id: string; children: ReactNode }) {
  return <h2 id={id} className="text-title-2-medium! m-0! text-text-primary">{children}</h2>;
}

/** The card's title. `gap` is the distance to the paragraph below: 12px for Organize and Empty folders, 8px for Links and Resource sync;
 *  the scan-and-collect pair's body is itself a column with 8px spacing, so the title reserves nothing extra. */
export function FieldsetTitle(
  { id, gap = 'none', children }: { id?: string; gap?: 'none' | 'small' | 'medium'; children: ReactNode },
) {
  const margin = gap === 'medium' ? 'mb-3' : gap === 'small' ? 'mb-2' : '';
  return <h3 id={id} className={`text-title-2-medium text-text-primary ${margin}`}>{children}</h3>;
}

export function Fieldset(
  { layout, label, labelledBy, id, footer, children, attributes }:
  {
    layout: FieldsetLayout;
    /** Use it when there is no visible heading to point at (the scan-and-collect cards keep their titles in the body column). */
    label?: string;
    labelledBy?: string;
    id?: string;
    footer?: ReactNode;
    children: ReactNode;
    /** The `data-*` attributes smoke and appearance tests use to find cards. Class names cannot do it: generated names would collide with the legacy stylesheet. */
    attributes?: Record<`data-${string}`, string>;
  },
) {
  return (
    <section id={id} aria-label={label} aria-labelledby={labelledBy} {...attributes}
      className={fieldsetClass(layout)}>
      <div className={FIELDSET_BODY[layout]}>{children}</div>
      {footer ? <footer className={FIELDSET_FOOT[layout]}>{footer}</footer> : null}
    </section>
  );
}
