/* 共用控件与安装后教程的状态只有一份实现，在 `frontend/src/ui-kit/` 与 `frontend/src/onboarding/`，
   随 `/dist/peach-entry.js` 发出；这里原名转出，名单与 `frontend/src/ui-kit/index.ts` 一致。 */
export {
  attachOverlayScrollbar, growCollapse, setCollapseOpen, wireCollapse,
  closeAnchoredMenu, dismissMenu, presentMenu, scrollMovesAnchor, wireAnchoredMenu,
  selectFieldHtml, selectOptionIconHtml, wireSelectField, MEDIA_SOURCE_ICONS,
  badgeHtml, boardTabsHtml, checkboxHtml, collectionHeaderHtml, emptyStateHtml, gaugeHtml, loadingDotsHtml, noteHtml,
  progressHtml, projectBannerHtml, searchInputHtml, spinnerHtml,
  dissolveValue, iconSwapHtml, popBadges, popCount, revealTexts, setIconSwap, swapText,
  configurationSkeletonHtml, fillSkeletonTier, fitSkeleton, indexSkeletonHtml, revealSkeleton, SKELETON_REVEAL_DELAY,
  skeletonHtml,
  glideEase, moveGlidePane, rubberBand, scrollerHtml, stopAutoScroll, wireAutoScroll, wireHorizontalScroller,
  wireOverlayScrollbars, wireScrollers,
  dialSliderHtml, iconSwitchHtml, setActionBusy, wireBusyActions, wireContextCard, wireDialSlider, wireDragReorder,
  wireIconSwitch,
  confirmModal, formModal,
  isCurrentPostSetupTutorialRequest, nextPostSetupTutorialRequest, POST_SETUP_TUTORIAL_COLLAPSED_KEY,
  POST_SETUP_TUTORIAL_KEY, POST_SETUP_TUTORIAL_SKIPPED_KEY, postSetupTutorialCollapsed, postSetupTutorialMarker,
  postSetupTutorialSignature, postSetupTutorialSkipped, resetPostSetupTutorialState, setPostSetupTutorialCollapsed,
  setPostSetupTutorialMarker, setPostSetupTutorialSkipped,
} from '/dist/peach-entry.js';
