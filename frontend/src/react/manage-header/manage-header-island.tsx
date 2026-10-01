/* 管理区页头岛（ADR-0031 第 11g 步）：管理条、面包屑、页面标题与回收站说明行。
 *
 * 宿主是壳常驻的 `[data-manage-header]`（`display: contents`，四块直接落在 `main` 的流里），一棵根常驻；
 * 壳只拿 `configureManageHeader` 给的命令式入口（同侧栏岛），不走 `mountIsland`：换页、换读数都落在
 * 同一棵根上，管理条下面那条指示线从上一页的位置滑到这一页，回收站读数原地换字。
 *
 * 根不包 `.peach-react`：这一块一直在 Preflight 之外，按钮与字号继承的是遗留层的全局规则，样式全在
 * `manage-header.css`，不用工具类。 */
import { useLayoutEffect, useRef, type MouseEvent } from 'react';
import { flushSync } from 'react-dom';
import { createRoot, type Root } from 'react-dom/client';

import { swapText } from '@peach/legacy/ui';

import { manageHeaderView, TRASH_LEDE_SKELETON_HTML, type ManageHeaderProps, type ManageHeaderView } from '../../manage-header';
import { Icon } from '../settings-panel/icon';
import type { ManageHeaderApi, ManageHeaderHost } from './manage-header-api';
import './manage-header.css';

let host: ManageHeaderHost | null = null;
let root: Root | null = null;
let props: ManageHeaderProps | null = null;

function paint(): void {
  const at = host, current = props;
  if (!at || !root || !current) return;
  flushSync(() => root!.render(<ManageHeader host={at} props={current} />));
}

const api: ManageHeaderApi = {
  render(next) { props = next; paint() },
};

/** 接上壳给的宿主，拿回页头岛的命令式入口。只调一次：宿主里原有的启动骨架在这一刻被换掉，
 *  壳随即把手上那份 props 推进来。 */
export function configureManageHeader(next: ManageHeaderHost): ManageHeaderApi {
  host = next;
  props = null;
  next.root.replaceChildren();
  root = createRoot(next.root);
  return api;
}

function ManageHeader({ host: at, props: current }: { host: ManageHeaderHost; props: ManageHeaderProps }) {
  const view = manageHeaderView(current);
  if (!view) return null;
  return (
    <>
      <ManageBar host={at} section={current.section} menu={current.menu} />
      {view.crumb ? <Crumb host={at} label={view.crumb} /> : null}
      <h2 data-manage-title="" data-compact={view.compact ? '' : undefined}>{view.title}</h2>
      {view.lede.kind === 'none' ? null : <TrashLede host={at} lede={view.lede} />}
    </>
  );
}

/* ── 管理条 ──
   一排下划线页签：按下那一项由一条 2px 的线标出来。线是这一排里的一个绝对定位元素，位置与宽度
   量出来写成 `--tab-x`、`--tab-width`；换页沿弹簧滑过去。离开管理区再回来时这一排是新挂上的，
   线先落在上一次停的那一项下面、下一帧再滑到这一页：上一次停在哪儿按模块记，不按节点记。
   真正头一次出现时没有上一次，直接落位。回收站不在菜单里，那一页没有按下项，线收成 0 宽。 */
let lastTab: { x: number; width: number } | null = null;

function placeLine(mark: HTMLElement, x: number, width: number) {
  mark.style.setProperty('--tab-x', `${x}px`);
  mark.style.setProperty('--tab-width', `${width}px`);
}

function ManageBar({ host: at, section, menu }: Pick<ManageHeaderProps, 'section' | 'menu'> & { host: ManageHeaderHost }) {
  const row = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLSpanElement>(null);

  const measure = () => {
    const group = row.current, mark = line.current;
    if (!group || !mark) return;
    const pressed = group.querySelector<HTMLElement>('button[aria-pressed="true"]');
    if (pressed && !pressed.offsetWidth) return;
    placeLine(mark, pressed?.offsetLeft ?? 0, pressed?.offsetWidth ?? 0);
    if (pressed) lastTab = { x: pressed.offsetLeft, width: pressed.offsetWidth };
  };

  useLayoutEffect(() => {
    const group = row.current!, mark = line.current!;
    if (lastTab) placeLine(mark, lastTab.x, lastTab.width); else measure();
    let second = 0;
    const first = requestAnimationFrame(() => {
      mark.setAttribute('data-ready', '');
      second = requestAnimationFrame(measure);
    });
    const resize = new ResizeObserver(measure);
    resize.observe(group);
    return () => { cancelAnimationFrame(first); cancelAnimationFrame(second); resize.disconnect() };
  }, []);

  useLayoutEffect(() => { if (line.current?.hasAttribute('data-ready')) measure() }, [section, menu]);

  return (
    <nav data-manage-bar="" aria-label="管理">
      <div ref={row} data-manage-menu="">
        {menu.map(([key, label, glyph]) => {
          const on = key === section;
          return (
            <button key={key} type="button" data-manage={key} aria-pressed={on} aria-current={on ? 'page' : undefined}
              onClick={() => at.openManage(key)}>
              <Icon name={glyph} /><span>{label}</span>
            </button>
          );
        })}
        <span ref={line} data-manage-indicator="" aria-hidden="true" />
      </div>
    </nav>
  );
}

/* ── 面包屑 ──
   Geist Breadcrumbs：上一级是链接、当前页是纯文本并带 `aria-current="true"`。href 留给新标签页与右键
   菜单；普通左键走路由，整页重载会丢掉返回表面与已读位置。 */
function Crumb({ host: at, label }: { host: ManageHeaderHost; label: string }) {
  const follow = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button) return;
    event.preventDefault();
    at.openDataCleanup();
  };
  return (
    <nav data-manage-crumb="" aria-label="Breadcrumb">
      <ol>
        <li><a href="/data-cleanup" onClick={follow}>数据管理</a><Icon name="chevron-right" /></li>
        <li aria-current="true"><span>{label}</span></li>
      </ol>
    </nav>
  );
}

/* ── 回收站说明行 ──
   读数到之前铺同形占位（左边一格读数、右端一颗键的尺寸），说明行从进页起就占着自己的高度。读数那一格
   一直是同一个节点：每次重画说的是同一件事的新读数，字由 `swapText` 原地换，有起点可走。
   「清空回收站」只在回收站里有东西时出现。 */
type Lede = Exclude<ManageHeaderView['lede'], { kind: 'none' }>;

function TrashLede({ host: at, lede }: { host: ManageHeaderHost; lede: Lede }) {
  return (
    <p className="mono" data-manage-lede="">
      {lede.kind === 'skeleton'
        ? <span data-trash-lede-skeletons="" dangerouslySetInnerHTML={{ __html: TRASH_LEDE_SKELETON_HTML }} />
        : (
          <>
            <LedeText text={lede.text} />
            {lede.total ? (
              <button type="button" data-empty-trash="" data-danger="" title="永久删除回收站内容"
                onClick={() => at.emptyTrash()}>清空回收站</button>
            ) : null}
          </>
        )}
    </p>
  );
}

function LedeText({ text }: { text: string }) {
  const slot = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => { swapText(slot.current, text) }, [text]);
  return <span ref={slot} data-lede-text="" />;
}
