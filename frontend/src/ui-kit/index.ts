/* `/js/ui-components.js` 的导出清单：那份垫片从 `/dist/peach-entry.js` 原名转出的就是这里列的名字，不多不少。
 *
 * 壳经垫片读，React 子树与 island 按 `@peach/legacy/ui` 写、构建时改写回 `/js/ui-components.js`，类型检查也落到
 * 这一份；入口包另带的 core、音效、中段截断不在清单里，写错 import 在类型检查时就报出来，不会到浏览器里才变成
 * undefined。 */
export { attachOverlayScrollbar } from './overlay-scrollbar';
export { growCollapse, setCollapseOpen, wireCollapse } from './collapse';
export { closeAnchoredMenu, dismissMenu, presentMenu, scrollMovesAnchor, wireAnchoredMenu } from './anchored-menu';
export { selectFieldHtml, selectOptionIconHtml, wireSelectField } from './select-field';
export { MEDIA_SOURCE_ICONS } from './media-source-icons';
export {
  badgeHtml, boardTabsHtml, checkboxHtml, collectionHeaderHtml, emptyStateHtml, gaugeHtml, loadingDotsHtml, noteHtml,
  progressHtml, projectBannerHtml, searchInputHtml, spinnerHtml,
} from './markup';
export { dissolveValue, iconSwapHtml, popBadges, popCount, revealTexts, setIconSwap, swapText } from './motion';
export {
  configurationSkeletonHtml, fillSkeletonTier, fitSkeleton, indexSkeletonHtml, revealSkeleton, SKELETON_REVEAL_DELAY,
  skeletonHtml,
} from './skeleton';
export {
  glideEase, moveGlidePane, rubberBand, scrollerHtml, stopAutoScroll, wireAutoScroll, wireHorizontalScroller,
  wireOverlayScrollbars, wireScrollers,
} from './scroll';
export {
  dialSliderHtml, iconSwitchHtml, setActionBusy, wireBusyActions, wireContextCard, wireDialSlider, wireDragReorder,
  wireIconSwitch,
} from './controls';
export { confirmModal, formModal } from './modal';
export {
  isCurrentPostSetupTutorialRequest, nextPostSetupTutorialRequest, POST_SETUP_TUTORIAL_COLLAPSED_KEY,
  POST_SETUP_TUTORIAL_KEY, POST_SETUP_TUTORIAL_SKIPPED_KEY, postSetupTutorialCollapsed, postSetupTutorialMarker,
  postSetupTutorialSignature, postSetupTutorialSkipped, resetPostSetupTutorialState, setPostSetupTutorialCollapsed,
  setPostSetupTutorialMarker, setPostSetupTutorialSkipped,
} from '../onboarding/post-setup-tutorial';
