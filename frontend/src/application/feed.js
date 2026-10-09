/* feed 域控制器：本域状态与动作，启动由 Application 的生命周期统一安装。 */
import { coverImage } from './../card-art/markup';
import { $, api, esc, foldName, icon, isCatalogPath } from '../core';
import { javTitleHtml } from '../core/jav-title';
import { COVER_FRONT_RATIO } from './../appearance/layout';
import { catalogState } from './catalog.js';
import { managedTaken, openManagedRoute, releaseManagedRoute, updateManagedRoute } from './../history/managed';
import { noteHtml, stopAutoScroll, wireAutoScroll } from '../ui-kit';
import { preferencesState, wireDrag } from './preferences.js';
import { pushEntityPage } from './entity.js';
import { applicationEffects } from './effects';
export const feedState = { FEED_SKELETON_CARDS: undefined, feedNewSkeletonHtml: undefined, entityShapes: undefined, hasEntityPart: undefined, feedNewSkeletonSection: undefined, COSTAR_SKELETON_PEOPLE: undefined, costarSkeletonFoot: undefined, factsSkeleton: undefined, feedRevision: undefined, feedNewHelpers: undefined, feedNewActions: undefined, HERO_WIDE_PX: undefined };

export function feedNewCoverHtml(item){
  if(item.has_cover)return coverImage(item,'big');
  if(!item.cover_url)return '<span class="nopic">无封面</span>';
  return coverImage({code:item.code},'big').replace(/ src="[^"]*"/,
    ` src="${esc(item.cover_url)}" referrerpolicy="no-referrer" data-panel-prior="1"`);
}

export function feedNewCardHtml(item){
  // 女优名与发行日各占一段：订阅按人订，底行说是谁的新片；放不下时只收女优名，日期整段留着。
  const label=[item.performers&&`<span class="feednewperformers">${esc(item.performers)}</span>`,
    item.release_date&&`<span>${esc(item.release_date)}</span>`].filter(Boolean)
    .join('<span aria-hidden="true">·</span>');
  const cover=feedNewCoverHtml(item);
  // 番号与标题排在同一个两行的标题块里，和资产卡一样：番号加粗打头，标题接在后面截断。
  const name=item.code||String(item.title||'').trim()||'未命名新作';
  const heading=item.code
    ?javTitleHtml({is_jav:true,code:item.code,name:item.code,display_title:item.title||''})
    :esc(name);
  /* 点击区用自己的类 `.feednewopen`：这一条通向别人的站，不是站内跳转。 */
  const open=item.link
    ?`<a class="feednewopen" href="${esc(item.link)}" target="_blank" rel="noreferrer" aria-label="打开 ${esc(name)} 的作品页"></a>`:'';
  return `<article class="card feednewcard${item.read?' isread':''}" data-feed-id="${item.id}">
    ${open}<div class="pic" style="--card-ratio:${COVER_FRONT_RATIO}">${cover}
      <div class="hovertools feednewtools">
        <button type="button" data-feed-action="${item.wanted?'unwant':'want'}" aria-pressed="${!!item.wanted}" title="${item.wanted?'取消想要':'想要'}" aria-label="想要 ${esc(name)}">${icon('star')}</button>
        <button type="button" data-feed-action="ignore" title="不想看" aria-label="不想看 ${esc(name)}">${icon('x')}</button>
        <button type="button" data-feed-action="read" title="标为已看过" aria-label="标为已看过 ${esc(name)}">${icon('check')}</button></div></div>
    <div class="meta"><div class="mtext"><span class="t">${heading}</span>
      <div class="s mono">${label||(item.title?'':'资料还没取到')}</div></div></div></article>`;
}

export async function loadEntityShapes(){
  const effects=applicationEffects;
  const data=await api('/api/entity/shapes',{signal:effects.signal}).catch(()=>null);
  if(!effects.isActive)return feedState.entityShapes;
  if(data&&!data.error){
    feedState.entityShapes=new Map((data.entities||[])
      .flatMap(entity=>entity.names.map(name=>[`${entity.kind}/${foldName(name)}`,entity.parts])));
    if(typeof data.home?.feed==='boolean')catalogState.homeHasFeed=data.home.feed;
    if(isFeedNewPath(location.pathname))prepareHomeFeed($('#feedNew'));
  }
  return feedState.entityShapes;
}

export function prepareHomeFeed(host){
  // 一打开，宿主就归路由树：骨架只在打开之前铺，之后由画出来的那一行或空着说话。
  if(!host||managedTaken(host)||host.querySelector('[data-feed-id]'))return;
  host.hidden=catalogState.homeHasFeed!==true;
  if(catalogState.homeHasFeed!==true)return;
  host.setAttribute('aria-busy','true');
  if(!host.querySelector('.feednewskeleton'))host.innerHTML=feedState.feedNewSkeletonHtml();
}

export function feedNetworkNote(unreachable,items){
  if(!(unreachable>0)||!items.some(item=>!item.has_cover))return '';
  return noteHtml(`${unreachable} 部新作的封面连不上 DMM 图片主机，中国移动宽带常见。把 DMM / FANZA 的连接方式设成 Peach 代理，下一轮会自动重取。`,
    {variant:'warning',className:'feednetwork',actionLabel:'配置连接方式',actionHref:'/scraping'});
}

export function feedRowHtml(data){
  const items=data&&!data.error?(data.items||[]):[];
  return feedNetworkNote(data?.cover_network,items)
    +`<div class="feednewrow srow">${items.map(feedNewCardHtml).join('')}</div>`;
}

export function wireFeedNewRow(row){
  if(!row)return;
  wireDrag(row);
  if(preferencesState.appSettings.feedAutoScroll)wireAutoScroll(row);
}

export function isFeedNewPath(path){return isCatalogPath(path)&&path!=='/junk-files'}

export function isProcessingNoticePath(path){return isCatalogPath(path)&&path!=='/junk-files'}

export function renderHomeFeed(){
  const host=$('#feedNew');
  if(managedTaken(host)){updateManagedRoute(host,{revision:++feedState.feedRevision});return}
  prepareHomeFeed(host);
  /* 这一行不随筛选变，判在不在场只看路径：换筛选换掉的是目录的代次，不该把它这一趟作废。 */
  void openManagedRoute('feed-new',{host,revision:feedState.feedRevision,helpers:feedState.feedNewHelpers,actions:feedState.feedNewActions},
    {container:host,isCurrent:()=>isFeedNewPath(location.pathname)});
}

export function clearHomeFeed(){
  const host=$('#feedNew');
  host.querySelectorAll('.feednewrow').forEach(stopAutoScroll);
  releaseManagedRoute(host);
  host.hidden=true;host.innerHTML='';host.removeAttribute('aria-busy');
}

export function refreshFeedRows(){
  feedState.feedRevision+=1;
  // 首页那一行只在目录页画着，人不在那儿时 `updateManagedRoute` 是空操作，不会在别的页面上冒出来。
  updateManagedRoute($('#feedNew'),{revision:feedState.feedRevision});
  pushEntityPage({feedRevision: feedState.feedRevision});
}

export function syncFeedAutoScroll(){
  document.querySelectorAll('.feednewrow').forEach(row=>
    preferencesState.appSettings.feedAutoScroll?wireAutoScroll(row):stopAutoScroll(row));
}

export function syncHeroWide([entry]){
  $('#index').toggleAttribute('data-hero-wide',entry.contentRect.width>=feedState.HERO_WIDE_PX);
}

export function installFeed13() {
feedState.FEED_SKELETON_CARDS = 8;
feedState.feedNewSkeletonHtml = ()=>`<div class="feednewrow srow" aria-hidden="true">${
  `<article class="card feednewcard feednewskeleton"><div class="pic imgwait" style="--card-ratio:${COVER_FRONT_RATIO}"></div>
    <div class="meta"><div class="mtext"><span class="t"><span class="skeleton"></span></span>
      <div class="s mono"><span class="skeleton">&#8203;</span></div></div></div></article>`
    .repeat(feedState.FEED_SKELETON_CARDS)}</div>`;
feedState.entityShapes = null;
feedState.hasEntityPart = (kind,name,part)=>!!name&&!!feedState.entityShapes?.get(`${kind}/${foldName(name)}`)?.includes(part);
feedState.feedNewSkeletonSection = ()=>`<section class="feednew">${feedState.feedNewSkeletonHtml()}</section>`;
feedState.COSTAR_SKELETON_PEOPLE = 12;
feedState.costarSkeletonFoot = ()=>`<div class="entityfoot"><div class="relatedpeople">${
  '<span class="av avskeleton"><span class="ring"></span><span class="nm">&#8203;</span></span>'
    .repeat(feedState.COSTAR_SKELETON_PEOPLE)}</div></div>`;
feedState.factsSkeleton = ()=>`<dl class="entityfacts">${
  '<dt><span class="skeleton"></span></dt><dd><span class="skeleton"></span></dd>'.repeat(5)}</dl>`;
feedState.feedRevision = 0;
feedState.feedNewHelpers = {feedRowHtml,wireFeedRow:row=>wireFeedNewRow(row)};
feedState.feedNewActions = {settled:hasItems=>{catalogState.homeHasFeed=hasItems}};
feedState.HERO_WIDE_PX = 900;
applicationEffects.resize(syncHeroWide).observe($('#index'));
}
