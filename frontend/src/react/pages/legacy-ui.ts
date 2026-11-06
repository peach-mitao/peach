/* The resolution target of the @peach/legacy/ui alias for standalone page bundles (vite.pages.config.ts).
 * The same-named alias in the main UI points to ui-kit/index.ts; standalone pages only bundle the collapse and source site badges actually used.
 * A missing name in the export list is rejected by the build check. */
export { setCollapseOpen } from '../../ui-kit/collapse';
export { MEDIA_SOURCE_ICONS } from '../../ui-kit/media-source-icons';
