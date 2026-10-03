/* JAV 标题：从一条 item 算出「番号 + 版本徽章 + 标题」怎么显示。

   纯字符串逻辑，只依赖 core 的 `esc`，不碰 DOM、不读 state，能单独读完。
   和六千行渲染代码挤在 app.js 顶部时，想确认「文件名后缀什么时候被剥掉」得先
   在页面源里找那个箭头函数。
   随 `/dist/peach-entry.js` 发出，`/js/jav-title.js` 原名转出，壳与路由树读同一份。

   规则的来处（都是踩过的）：
   - 后缀只对 `is_jav` 剥。普通创作者作品的文件名里 `.mp4` 之外还有意义的点，
     一律剥会把 `xxx.2024.1080p` 削成 `xxx.2024`。
   - 官方标题优先取含日文的那条：catalog_title 有时是英文机翻，original_title
     才是原始日文标题；两条都没日文就按顺序取第一条。
   - `display_title` 只要这个键存在就算数，哪怕是空串——那是「清洗后确认无标题」，
     不是「没查到」，回退到脏文件名等于把清洗结果丢掉。 */

import { esc } from './index';

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
type Item = JavTitleSource | null | undefined;

const JAV_MEDIA_SUFFIX=/\.(?:mp4|mkv|avi|wmv|mov|m4v|webm|ts|m2ts|mts|mpg|mpeg|flv|rm|rmvb|iso)$/i;

export const javFileDisplayName=(it:Item,value=it?.name)=>{
  const name=String(value||'').trim();
  return it?.is_jav?name.replace(JAV_MEDIA_SUFFIX,''):name;
};

export const hasJapaneseText=(value:unknown)=>/[぀-ヿ㐀-鿿]/.test(String(value||''));

export const javPreferredTitle=(it:Item)=>{
  const titles=[it?.catalog_title,it?.original_title].map(value=>String(value||'').trim()).filter(Boolean);
  return titles.find(hasJapaneseText)||titles[0]||'';
};

export function javTitleParts(it:Item,value=it?.name):{code:string;title:string;badges?:string[]}{
  const name=javFileDisplayName(it,value),code=String(it?.code||'').trim().toUpperCase();
  if(!it?.is_jav||!code)return {code:'',title:name};
  const displayCode=String(it?.display_code||code).trim().toUpperCase();
  const upper=name.toUpperCase(),hasPrefix=upper===code||upper===displayCode
    ||(upper.startsWith(code)&&/^[\s._\-[\]]/.test(name.slice(code.length)))
    ||(upper.startsWith(displayCode)&&/^[\s._\-[\]]/.test(name.slice(displayCode.length)));
  const prefixLength=upper.startsWith(displayCode)?displayCode.length:code.length;
  const filenameTitle=(hasPrefix?name.slice(prefixLength):name).replace(/^[\s._-]+/,'').trim();
  const officialTitle=javPreferredTitle(it);
  // API 显式返回空 display_title 也是有意义的“清洁后无标题”，不能再回退到脏文件名。
  const cleanFallback=Object.prototype.hasOwnProperty.call(it||{},'display_title')
    ?String(it.display_title||'').trim():filenameTitle;
  const title=officialTitle||cleanFallback;
  const badges=Array.isArray(it?.edition_badges)?it.edition_badges.filter(
    label=>['中字','无码','无码破解'].includes(label)):[];
  return {code:displayCode,title,badges};
}

/** 同一条目的纯文本形态，用于无障碍名称。 */
export const javDisplayName=(it:Item,value=it?.name)=>{
  const {code,title,badges=[]}=javTitleParts(it,value);
  return code?[code,...badges,title].filter(Boolean).join(' '):title;
};

/** 番号 + 版次徽章 + 标题的 HTML。非 JAV 条目退化成转义后的文件名。 */
export function javTitleHtml(it:Item,value=it?.name){
  const {code,title,badges=[]}=javTitleParts(it,value);
  if(!code)return esc(title);
  const edition=badges.map(label=>`<small class="javedition ${label==='中字'?'subtitle':label==='无码'?'uncensored':'cracked'}">${esc(label)}</small>`).join('');
  return `<span class="javidentity"><strong class="javcode">${esc(code)}</strong>${edition}</span>${title?` <span class="javtitle">${esc(title)}</span>`:''}`;
}
