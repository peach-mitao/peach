import { createFollowController } from '../react/follow-feed/follow-controller';
import { followViewPath as pathForFollow } from '../react/follow-feed/follow-view';
import { createFollowFeedHelpers } from '../react/follow-feed/follow-helpers';
import { createFollowDetailActions } from '../react/follow-detail/follow-detail-actions';
import { followScrollY } from '../shell';
/* follow 域控制器：本域状态与动作，启动由 Application 的生命周期统一安装。 */
import { receiptsState } from './receipts.js';
import { managedEntry, releaseManagedRoute, updateManagedRoute } from './../history/managed';
import { $ } from '../core';
import { navigationState, openRoutedPage, requestOverlay } from './navigation.js';
import { entityState, syncPhotoWalls } from './entity.js';
import { followDetailReturnPath, followDiscoverySeed, followRevision, followSelected, pageOpens, selectMode, writeShell } from './../shell/index';
import { followManageEntry } from './index.js';
import { censorOn, preferencesState, wireDrag } from './preferences.js';
import { revealSkeleton, wireHorizontalScroller } from '../ui-kit';
import { followJobProgress } from './../jobs';
import { enterManagementSurface, renderFollowDrawer, scheduleStickySurfaces, showManagementBody } from './layout.js';
import { toggleFollowSelection } from './selection.js';
import { photoLayout, photoSize, storePhotoLayout } from './../appearance/layout';
import { catalogState } from './catalog.js';
import { releaseHoverPreviews } from './../card-art/hover';
import { loadStage, stageApi } from '../react/application-residents';
import { disposeStage, mediaState, stageExit, urlResume } from './media.js';
import { clearOverlayBackground, holdOverlayBackground, overlayState, takeOverlayReturn } from './../history/overlay';
export const followState = { followFilter: undefined, followAuthors: undefined, followProviders: undefined, followTags: undefined, followWorks: undefined, followMediaView: undefined, FOLLOW_FEED_SORTS: undefined, FOLLOW_RANDOM_SORT: undefined, followSort: undefined, followDir: undefined, followSeed: undefined, followDurMin: undefined, followDurMax: undefined, followContentSkeletonHtml: undefined, followSkeletonHtml: undefined, followFeedHelpers: undefined, followFeedActions: undefined, followFeedProps: undefined, followFeedShell: undefined, followDetailActions: undefined, FOLLOW_MANAGE_TABS: undefined, followSidebarFilters: undefined };

export function followCheckBits(report){
  const rows=report.results||[];
  const added=rows.reduce((n,r)=>n+(r.added||0),0);
  const updated=rows.reduce((n,r)=>n+(r.updated||0),0);
  const quiet=rows.filter(r=>r.ok&&!r.added&&!r.updated).length;
  const skipped=rows.reduce((n,r)=>n+(r.skipped||0),0);
  const compilations=rows.reduce((n,r)=>n+(r.skipped_compilations||0),0);
  const history=rows.reduce((n,r)=>n+(r.history_skipped||0),0);
  const bits=[];
  if(added)bits.push(`新增 <b>${added}</b> 条`);
  if(updated)bits.push(`更新 <b>${updated}</b> 条`);
  // 过滤掉多少也要说：不然用户只看到条目变少，分不清是被过滤了还是根本没抓到。
  if(skipped-compilations)bits.push(`跳过 <b>${skipped-compilations}</b> 条无资源`);
  if(compilations)bits.push(`排除 <b>${compilations}</b> 个超大合集`);
  if(history)bits.push(`跳过 <b>${history}</b> 条超出首次采集范围的历史内容`);
  // 回查是唯一会放大请求数的路径，报出来才看得出某个创作者是不是每帖都要多打一次站点。
  const probed=rows.reduce((n,r)=>n+(r.probed||0),0);
  if(probed)bits.push(`回查 <b>${probed}</b> 条`);
  if(quiet)bits.push(`${quiet} 个来源没有更新`);
  if(!bits.length)bits.push('没有任何更新');
  return {rows,bits};
}

export function followCheckToast(report){
  const {rows,bits}=followCheckBits(report);
  const failed=rows.filter(r=>!r.ok).length;
  const exhausted=rows.filter(r=>r.exhausted).length;
  /* 这一条显式走 `html`：`bits` 由 followCheckBits 用计数拼出来、含 `<b>`，
     里面全是本地算出来的数字和固定中文，没有账本字段能流进来。 */
  receiptsState.toast({html:`检查了 <b>${rows.length}</b> 个来源：${bits.join(' · ')}`+
    (exhausted?` · <b>${exhausted} 个没有更多内容</b>`:'')+
    (failed?` · <b>${failed} 个失败</b>`:'')},
    {warn:!!failed,timeout:failed?8000:6000,sound:failed?'warning':'success',
     action:{label:'去看更新',run:()=>enterFollow(true)}});
}

export function followViewPath(){return pathForFollow(followView())}

export function readFollowView(){return followState.controller.read()}

export function followView(){
  return {status:followState.followFilter,media:followState.followMediaView,author:[...followState.followAuthors][0]||'',
    provider:[...followState.followProviders][0]||'',work:[...followState.followWorks][0]||'',tags:[...followState.followTags],
    durMin:followState.followDurMin,durMax:followState.followDurMax,sort:followState.followSort,dir:followState.followDir,seed:followState.followSeed};
}

export function adoptFollowView(view){
  followState.followFilter=view.status;followState.followMediaView=view.media;
  followState.followAuthors=new Set(view.author?[view.author]:[]);
  followState.followProviders=new Set(view.provider?[view.provider]:[]);
  followState.followWorks=new Set(view.work?[view.work]:[]);
  followState.followTags=new Set(view.tags);
  followState.followDurMin=view.durMin||0;followState.followDurMax=view.durMax||0;
  followState.followSort=view.sort;followState.followDir=view.dir;followState.followSeed=view.seed;
}

export function followFeedEntry(){
  const entry=managedEntry($('#stats'));
  return entry&&entry.path==='/follow'&&entry.host.isConnected?entry:null;
}

export function followFeedLive(){return !!followFeedEntry()}

export function pushFollowFeed(patch){if(followFeedLive())updateManagedRoute($('#stats'),patch)}

export function routeFollowFeed(view,patch={}){return followState.controller.route(view,patch)}

export function shuffleFollowFeed(){followState.controller.shuffle()}

export function enterFollow(fresh=false){followState.controller.enter(fresh)}

export async function openFollowDetail(id,push=true,mediaIndex=null,preserveReturn=false){
  if(push){
    if(!location.pathname.startsWith('/follow/item/')&&!preserveReturn)writeShell({followDetailReturnPath:location.pathname+location.search});
    requestOverlay(`/follow/item/${+id}`,'follow',()=>openFollowDetail(id,false,mediaIndex,preserveReturn));
    return;
  }
  releaseHoverPreviews();
  id=+id;
  const entering=!location.pathname.startsWith('/follow/item/');
  if(push&&entering&&!preserveReturn)writeShell({followDetailReturnPath:location.pathname+location.search});
  /* 后退前进进来按条目记的来处（带筛选的那一份列表）；冷启动与没记背景的条目回 `/follow`。 */
  if(!push&&!preserveReturn)writeShell({followDetailReturnPath:takeOverlayReturn()||'/follow'});
  // 条目的背景另记：从列表进来记列表这一页（带筛选），组内换条沿用上一条的。
  if(push)holdOverlayBackground();
  // 换详情不进小窗；小窗里放着别的条目也让位（舞台岛判），两个播放器不同时出声。关注详情开着时原地换条。
  if(stageApi()?.showing()!=='follow')disposeStage(false,false,{miniplayer:false});
  if(push)navigationState.route(`/follow/item/${id}`,false,overlayState('follow'));
  const stage=await loadStage(mediaState.stageHost);
  await stage.open({kind:'follow',id,mediaIndex,mediaView:followState.followMediaView,
    helpers:followState.followFeedHelpers,actions:followState.followDetailActions,resume:push?null:urlResume()});
  scheduleStickySurfaces();
}

export async function closeFollowDetail(){
  await stageExit();
  disposeStage(false,false,{miniplayer:false});clearOverlayBackground();
  navigationState.route(followDetailReturnPath||'/follow');
  /* 从资料页在线视图点进来的：资料页一直画在下面，筛选、已加载的几页与滚动位置原样接着看，不从头重开。 */
  if(entityState.entityPageView&&entityState.entityPageCurrent()&&!$('#index').hidden)return;
  if(location.pathname!=='/follow'){writeShell({pageOpens:pageOpens+1});return}
  if(!followFeedLive()){writeShell({pageOpens:pageOpens+1});return}
  readFollowView();pushFollowFeed({view:followView()});
}

export function revealRoutedPage(container){
  const host=document.createElement('div');host.className='peach-react';
  revealSkeleton(container,()=>{container.textContent='';container.append(host)});
  return host;
}

export function installFollow15() {
followState.followFeedHelpers = createFollowFeedHelpers({wireDrag:row=>{if(row)wireDrag(row)},
    wireScroller:row=>{if(row)wireHorizontalScroller(row)},listSkeletonHtml:media=>followState.followContentSkeletonHtml(media),jobProgress:followJobProgress});
followState.followFeedActions = {
  loaded:drawer=>renderFollowDrawer(drawer),
  openDetail:id=>openFollowDetail(id),
  openAuthor:name=>navigationState.navigatePath(`/creators/${encodeURIComponent(name)}`),
  openManage:()=>navigationState.navigatePath(followManageEntry()),
  toggleSelection:(id,range)=>toggleFollowSelection(id,range),
  setImagesOnly:on=>{preferencesState.appSettings.followImagesOnly=!!on;preferencesState.saveSettings();syncPhotoWalls()},
  setPhotoLayout:layout=>{storePhotoLayout(layout);syncPhotoWalls()},
  canFlip:()=>!selectMode&&!censorOn()&&!window.__scrolling&&!catalogState.reduceMotion(),
  toast:(message,{undo}={})=>receiptsState.actionReceipt(message,{undo}),
  failure:(action,error)=>receiptsState.actionFailure(action,error),
  checkReport:report=>followCheckToast(report),
};
followState.followFeedShell = {
  skeleton:()=>followState.followSkeletonHtml('正在读取关注内容'),
  /* 关注详情底下没画着列表（深链进来，或后退前进落到压在列表上的详情、中间去过别的页）：让出 `#stats`，
     不画列表，等关掉详情再按地址打开。关注详情已经开着（组内换条）就不动。 */
  ground:()=>{
    if(stageApi()?.showing()==='follow')return;
    releaseHoverPreviews();disposeStage(false);enterManagementSurface();
    if(followFeedLive())return;
    navigationState.claimSurface(navigationState.surfacePath());
    showManagementBody({manage:false});
    // 管理区那一页还挂在 `#stats` 上时先把它卸掉，直接清空会留下一棵管着已不在页面上的节点的根。
    if($('#stats').querySelector('.peach-react'))releaseManagedRoute($('#stats'));
    $('#stats').replaceChildren();
  },
};
followState.followDetailActions = createFollowDetailActions({view:followView,adoptView:adoptFollowView,
    rememberReturn:path=>writeShell({followDetailReturnPath:path}),close:()=>void closeFollowDetail(),
    open:(id,index,preserve)=>void openFollowDetail(id,true,index,preserve),drawer:renderFollowDrawer},
    {toast:(message,{undo}={})=>receiptsState.actionReceipt(message,{undo}),failure:receiptsState.actionFailure});
}

export function connectFollowController(){
    followState.controller=createFollowController({
      location:()=>location,view:followView,adoptView:adoptFollowView,
      session:()=>({discoverySeed:followDiscoverySeed,revision:followRevision,scrollY:followScrollY}),
      writeSession:patch=>writeShell({...(patch.discoverySeed===undefined?{}:{followDiscoverySeed:patch.discoverySeed}),
        ...(patch.revision===undefined?{}:{followRevision:patch.revision}),...(patch.scrollY===undefined?{}:{followScrollY:patch.scrollY})}),
      preferences:()=>({selectMode,selected:followSelected,photoSize:photoSize(),photoLayout:photoLayout(),imagesOnly:!!preferencesState.appSettings.followImagesOnly}),
      live:followFeedLive,push:pushFollowFeed,route:navigationState.route,openPage:openRoutedPage,
      rollSeed:()=>Number(receiptsState.rollSeed()),enterSeed:()=>Math.floor(Math.random()*0xffffffff),
      revealFeed:()=>{releaseHoverPreviews();enterManagementSurface();showManagementBody({manage:false})},
      syncPhotoWalls,scrollTop:()=>window.scrollTo({top:0,behavior:'smooth'}),
    },followState.followFeedHelpers,followState.followFeedActions);
    followState.followFeedActions=followState.controller.actions;
    followState.followFeedProps=followState.controller.props;
    followState.followFeedShell.refresh=followState.controller.refresh;
    followState.followFeedShell.props=followState.controller.props;
  }
