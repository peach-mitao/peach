import { useLayoutEffect, useRef } from 'react';

/** Grid 按列表顺序固定列归属，卡片高度只影响所在列的后续卡片。
 *
 * `--photo-columns` 是照片墙的显式列数；普通作品网格没有这个变量，就从浏览器已经算好的
 * `grid-template-columns` 数出列数。行距也取网格自己的值，随后把原生 `row-gap` 收成 0，
 * 由轨道边界统一留白，避免每一小段轨道再叠一次 gap。
 */
export function useMasonryGrid(enabled: boolean, revision: string) {
  const host = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const wall = host.current;
    if (!wall) return;
    const cards = Array.from(wall.children).filter((node): node is HTMLElement =>
      node instanceof HTMLElement
      && (node.hasAttribute('data-media-card') || node.hasAttribute('data-mix-card')));
    if (!enabled) return;
    let stopped = false;
    let frame = 0;
    const originalRowGap = wall.style.rowGap;
    const initialStyle = getComputedStyle(wall);
    const declaredGap = Number.parseFloat(initialStyle.getPropertyValue('--masonry-row-gap'));
    const renderedGap = Number.parseFloat(initialStyle.rowGap);
    const gap = Number.isFinite(declaredGap)
      ? declaredGap
      : Number.isFinite(renderedGap) ? renderedGap : 14;
    const arrange = () => {
      if (stopped) return;
      /* 视口切换会改变 auto-fill 的列数。先撤掉上一轮的显式落位，否则旧列号会创建
       * 隐式网格，窄屏上把右列卡片挤到视口外。 */
      cards.forEach((card) => {
        card.style.removeProperty('grid-column');
        card.style.removeProperty('grid-row');
      });
      const style = getComputedStyle(wall);
      const declaredColumns = Number(style.getPropertyValue('--photo-columns'));
      const renderedColumns = style.gridTemplateColumns.split(/\s+/).filter(Boolean).length;
      const columns = Math.max(1, declaredColumns || renderedColumns || 1);
      wall.dataset.masonryActive = '';
      wall.style.rowGap = '0px';
      cards.forEach((card, index) => {
        card.style.gridColumn = String(index % columns + 1);
      });
      // 列宽确定后批量读取卡片盒高；轨道只取卡片边界，不按每个像素创建一条轨道。
      const heights = cards.map((card) => Math.ceil(card.getBoundingClientRect().height));
      const ends = Array<number>(columns).fill(0);
      const boxes = heights.map((height, index) => {
        const column = index % columns;
        const top = ends[column]!;
        const bottom = top + height + gap;
        ends[column] = bottom;
        return { top, bottom };
      });
      const lines = [...new Set([0, ...boxes.flatMap(({ top, bottom }) => [top, bottom])])].sort((a, b) => a - b);
      const rows = new Map(lines.map((line, index) => [line, index + 1]));
      wall.style.gridTemplateRows = lines.slice(1).map((line, index) => `${line - lines[index]!}px`).join(' ');
      cards.forEach((card, index) => {
        const box = boxes[index]!;
        card.style.gridRow = `${rows.get(box.top)} / ${rows.get(box.bottom)}`;
      });
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(arrange);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(wall);
    cards.forEach((card) => observer.observe(card));
    /* 有些浏览器在仅调整视口、卡片高度尚未重排时不会先通知 ResizeObserver；显式接住
     * resize，保证列号在 CSS 媒体查询切换后的下一帧重算。 */
    window.addEventListener('resize', schedule);
    arrange();
    return () => {
      stopped = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', schedule);
      wall.style.removeProperty('grid-template-rows');
      wall.style.rowGap = originalRowGap;
      wall.removeAttribute('data-masonry-active');
      cards.forEach((card) => {
        card.style.removeProperty('grid-column');
        card.style.removeProperty('grid-row');
      });
    };
  }, [enabled, revision]);
  return host;
}
