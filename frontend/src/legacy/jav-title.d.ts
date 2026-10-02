/* `/js/jav-title.js` 的类型声明：一条作品的「番号 + 版次徽章 + 标题」怎么显示，壳与路由树读同一份。
 * 只声明 TypeScript 这一侧用得到的那几样。 */

/** 算标题要读的那几个字段。 */
export interface JavTitleSource {
  name?: string | null;
  code?: string | null;
  display_code?: string | null;
  is_jav?: boolean | number | null;
  catalog_title?: string | null;
  original_title?: string | null;
  display_title?: string | null;
  edition_badges?: string[] | null;
}

/** 番号 + 版次徽章 + 标题的 HTML。非 JAV 条目退化成转义后的文件名。 */
export declare function javTitleHtml(item: JavTitleSource, value?: string): string;
/** 同一条目的纯文本形态，用于无障碍名称。 */
export declare function javDisplayName(item: JavTitleSource, value?: string): string;
