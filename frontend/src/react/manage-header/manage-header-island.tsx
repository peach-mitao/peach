/* Management header (ADR-0031 step 11g): the manage bar, breadcrumbs, page title and the trash explainer row.
 *
 * Resident component `manage-header` (the resident table in `router/managed-routes.tsx`): the route tree renders it into the
 * shell's resident `[data-manage-header]` (`display: contents`, the four pieces land directly in `main`'s flow), the host
 * being that node itself. At shell startup it synchronously writes a same-structure skeleton into the host
 * (`manageHeaderSkeletonHtml`); when this surface opens, `place` clears the skeleton and the route tree renders the first frame
 * in the same task. The first frame has no props yet and renders empty; once the shell has the handle it pushes the props it
 * holds. After that the shell only pushes props through the handle `configureManageHeader` provides: the handle writes this
 * module's store and notifies via `flushSync`, so the render is done when it returns and the shell immediately reads
 * `[data-manage-title]` for the title reveal. Page changes and readout changes land on the same component; the nav selection
 * follows the address in sync, and the trash readout swaps its text in place.
 *
 * The host is not wrapped in `.peach-react`: this block has always been outside Preflight, buttons and font sizes inherit the
 * legacy layer's global rules, all styles live in `manage-header.css`, no utility classes. */
import { useLayoutEffect, useRef, useSyncExternalStore, type MouseEvent } from 'react';
import { flushSync } from 'react-dom';

import { swapText } from '@peach/legacy/ui';

import { manageHeaderView, TRASH_LEDE_SKELETON_HTML, type ManageHeaderProps, type ManageHeaderView } from '../../manage-header';
import { Icon } from '../settings-panel/icon';
import { PillTabList } from '../components/pill-tabs';
import type { ManageHeaderApi, ManageHeaderHost } from './manage-header-api';
import './manage-header.css';

let host: ManageHeaderHost | null = null;
let props: ManageHeaderProps | null = null;
const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => { listeners.delete(listener) };
}

function notify(): void {
  for (const listener of [...listeners]) listener();
}

/* After this surface throws and is unmounted by the error boundary nobody subscribes: pushed updates only land in the store, unpainted and unthrown. */
const api: ManageHeaderApi = {
  render(next) { props = next; flushSync(notify) },
};

/** Attach the host the shell provides and get back the manage header's imperative handle. Called once; the shell's `loadManageHeader` then opens this surface in the router tree,
 *  hands over the handle once it is rendered, and the shell immediately pushes in the props it holds. */
export function configureManageHeader(next: ManageHeaderHost): ManageHeaderApi {
  host = next;
  props = null;
  return api;
}

/** The panel registered in the persistent table: it reads this module's store and paints nothing while the host is not yet wired up or the shell has not pushed props. */
export function ManageHeaderSurface() {
  const current = useSyncExternalStore(subscribe, () => props);
  return host && current ? <ManageHeader host={host} props={current} /> : null;
}

function ManageHeader({ host: at, props: current }: { host: ManageHeaderHost; props: ManageHeaderProps }) {
  const view = manageHeaderView(current);
  if (!view) return null;
  return (
    <>
      <ManageBar host={at} pressed={view.pressed} menu={current.menu} />
      {view.crumb ? <Crumb host={at} label={view.crumb} /> : null}
      <h2 data-manage-title="" data-compact={view.compact ? '' : undefined}>{view.title}</h2>
      {view.lede.kind === 'none' ? null : <TrashLede host={at} lede={view.lede} />}
    </>
  );
}

/** Admin navigation uses a neutral filled selected state; after switching, scroll the current item into view. */
function ManageBar({ host: at, pressed: key, menu }: Pick<ManageHeaderProps, 'menu'> & { host: ManageHeaderHost; pressed: string }) {
  const row = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const group = row.current;
    const pressed = group?.querySelector<HTMLElement>('button[aria-pressed="true"]');
    if (!group || !pressed) return;
    const left = pressed.offsetLeft, right = left + pressed.offsetWidth;
    if (left < group.scrollLeft) group.scrollLeft = left;
    else if (right > group.scrollLeft + group.clientWidth) group.scrollLeft = right - group.clientWidth;
  }, [key, menu]);

  return (
    <nav data-manage-bar="" aria-label="Manage">
      <PillTabList ref={row} data-manage-menu="" data-pill-nav="">
        {menu.map(([entry, label, glyph]) => {
          const on = entry === key;
          return (
            <button key={entry} type="button" data-manage={entry} aria-pressed={on} aria-current={on ? 'page' : undefined}
              data-pill-selected={on ? '' : undefined} data-pill-variant="gray"
              onClick={() => at.openManage(entry)}>
              <Icon name={glyph} /><span>{label}</span>
            </button>
          );
        })}
      </PillTabList>
    </nav>
  );
}

/* -- Breadcrumbs --
   Geist Breadcrumbs: the parent is a link and the current page is plain text with `aria-current="true"`. href stays for new tabs and the context
   menu; a normal left click goes through the router, since a full reload would lose the return surface and read position. */
function Crumb({ host: at, label }: { host: ManageHeaderHost; label: string }) {
  const follow = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button) return;
    event.preventDefault();
    at.openDataCleanup();
  };
  return (
    <nav data-manage-crumb="" aria-label="Current location">
      <ol>
        <li><a href="/data-cleanup" onClick={follow}>Data management</a><Icon name="chevron-right" /></li>
        <li aria-current="true"><span>{label}</span></li>
      </ol>
    </nav>
  );
}

/* ── TrashNote row ──
   Before the readout arrives, lay a same-shape placeholder (one readout cell on the left, the size of one key at the right end); the Note row holds its own height from the moment the page opens. The readout cell
   is always the same node: each repaint reports the new reading of the same thing; the text swaps in place via `swapText`, so there's a starting point to animate from.
   "Empty trash" only appears when the Trash has something. */
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
              <button type="button" data-empty-trash="" data-danger="" title="Permanently delete trash contents"
                onClick={() => at.emptyTrash()}>Empty trash</button>
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
