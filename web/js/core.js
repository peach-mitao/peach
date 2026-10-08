/* DOM 取元素、请求、转义、格式化与路由常量只有一份实现，在 `frontend/src/core/index.ts`，
   随 `/dist/peach-entry.js` 发出；这里原名转出。 */
export {
  $, seededRank, newSeed, DURATION_TAGS, cleanTagFilter, realDuration, icon, api, isAbort, mapLimit, STATE_ROUTES, ROUTE_STATES, STATE_LABELS, isCatalogPath,
  ENTITY_ROUTES, ROUTE_ENTITIES, entityPath, esc, brandIcon, siteName, linkMarkUrl, siteMarkUrl, foldName,
  officialLinkText, fmtDur, fmtClock, fmtSize, firstGrapheme, leadingGraphemes, clipGraphemes, LOC, requestErrorMessage,
} from '/dist/peach-entry.js';
