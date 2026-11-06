/* The management header's (resident component `manage-header`, `manage-header-island.tsx`) contract with the shell.
 *
 * It renders the block above the management body: the manage bar (a row of underlined tabs), the data management subpage's
 * breadcrumbs, the page title, and the trash explainer row (readout and "Empty trash"). Which management section is current,
 * what the menu lists, and the trash readout are pushed in by the shell (`ManageHeaderProps`, definition and criteria in
 * `src/manage-header.ts`, also used by the shell's startup skeleton).
 *
 * Page changes, confirmation dialogs and write endpoints stay with the shell: clicks return to `openManage`, `openDataCleanup`
 * and the empty-trash flow. The page title's line-by-line reveal is also done by the shell after each push (played once per
 * page change), and the skeleton phase and the route tree handover are the same spot. */
import type { ManageHeaderProps } from '../../manage-header';

export type { ManageEntry, ManageHeaderProps, TrashCount } from '../../manage-header';

export interface ManageHeaderHost {
  /** The layer the island renders into (`[data-manage-header]`, itself `display: contents`). */
  root: HTMLElement;
  /** One item on the management bar. */
  openManage(section: string): void;
  /** The breadcrumb's parent level. Clicks with modifier keys or the middle button do not pass through here and follow the link's own href (new tab, context menu). */
  openDataCleanup(): void;
  /** The key at the right end of the trash description row: confirm popover, write endpoint and receipt all live in the shell, and the page's readouts refetch after confirmation. */
  emptyTrash(): void;
}

export interface ManageHeaderApi {
  render(props: ManageHeaderProps): void;
}
