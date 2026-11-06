/** The cover fragment of the home-page New releases card: a local cover, the official cover fetched via `/cover-image`, or a "Scraping" / "No cover" placeholder. */
export declare function feedNewCoverHtml(item: Record<string, unknown>): string;
/** 首页新作卡：番号与片名，不带版次与画质徽章——新作还没入库，没有文件可判。 */
export declare function feedNewCardHtml(item: Record<string, unknown>): string;
