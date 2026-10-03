import { esc, icon, requestErrorMessage } from './core.js';
import { playUiSound } from './ui-sounds.js';
/* 整页与局部的覆盖式滚动条、Collapse、锚定菜单、Geist Select 与来源站标只有一份实现，在
   `frontend/src/ui-kit/`，随 `/dist/peach-entry.js` 发出；错误页直接读那份产物，这里原名转出。 */
import {
  attachOverlayScrollbar, closeAnchoredMenu, dismissMenu, growCollapse, MEDIA_SOURCE_ICONS, presentMenu,
  scrollMovesAnchor, selectFieldHtml, selectOptionIconHtml, setCollapseOpen, wireAnchoredMenu, wireCollapse,
  wireSelectField,
} from '/dist/peach-entry.js';
export {
  attachOverlayScrollbar, closeAnchoredMenu, dismissMenu, growCollapse, MEDIA_SOURCE_ICONS, presentMenu,
  scrollMovesAnchor, selectFieldHtml, selectOptionIconHtml, setCollapseOpen, wireAnchoredMenu, wireCollapse,
  wireSelectField,
};

const NOTE_VARIANTS=new Set(['secondary','warning','error','success']);

/* `filterRow` 给骨架里那块两排浮层用：槽位标记跟着 HTML 一起生成，否则这一条会自己画成
   第二块浮层。 */
export function collectionHeaderHtml({readout='',controls='',before='',className='',loading=false,filterRow=''}={}){
  return `<div class="entitycollectionhead${className?' '+esc(className):''}"${filterRow?` data-filter-row="${esc(filterRow)}"`:''}>${before}<h3${loading?' class="skeleton"':''}>${readout}</h3>${controls}</div>`;
}

/* ── 原地换态的一组辅助 ──
   形状和 CSS 在 `web/css/25-motion.css`，那里也写着每一条的来源与取值。这一层只负责
   「什么时候换」：动画本身一律交给 CSS，JS 不读也不写具体的毫秒数。 */

/**
 * 两枚字形叠在一格里，换态只改容器上的 `data-icon-state`。
 *
 * 直接 `innerHTML=icon(...)` 的地方都可以换成它：重写 innerHTML 会把旧字形连同它正在
 * 走的动画一起丢掉，新字形也没有起点可走，读出来是一次硬切。
 */
export function iconSwapHtml(a,b,state='a',{className='',iconClass='',label=''}={}){
  return `<span class="iconswap${className?' '+esc(className):''}" data-icon-swap data-icon-state="${state==='b'?'b':'a'}"${
    label?` aria-label="${esc(label)}"`:''}><span data-icon="a">${icon(a,iconClass)}</span><span data-icon="b">${icon(b,iconClass)}</span></span>`;
}
/** 把 `iconSwapHtml` 画出来的那一枚切到 a 或 b；`root` 可以是它本身或它的祖先。 */
export function setIconSwap(root,state){
  const el=root&&(root.matches?.('[data-icon-swap]')?root:root.querySelector?.('[data-icon-swap]'));
  if(el)el.dataset.iconState=state==='b'||state===true?'b':'a';
  return el;
}

/**
 * 一行字换成另一行字：旧字往上糊掉，新字从下方回到原位。
 *
 * 值没变就什么也不做——同一次重绘里把同样的字再写一遍是常态，跟着抖一下会让页面看起来
 * 一直在变。首次写入（这一格还空着）也不放动画：那是内容第一次出现，归骨架那一段。
 */
export function swapText(el,text,{html=false}={}){
  if(!el)return;
  const next=String(text??''),write=()=>{if(html)el.innerHTML=next;else el.textContent=next};
  const previous=el.dataset.swapText;
  if(previous===next&&(el.textContent||'').length)return;
  el.dataset.swapText=next;
  el.classList.add('textswap');
  if(previous===undefined||previous===next){write();return}
  el.classList.remove('entering');
  el.classList.add('leaving');
  const enter=()=>{
    el.classList.remove('leaving');
    write();
    el.classList.add('entering');
    el.getBoundingClientRect();
    el.classList.remove('entering');
  };
  const done=event=>{if(event.target!==el)return;el.removeEventListener('transitionend',done);enter()};
  el.addEventListener('transitionend',done);
  /* 兜底：`--motion-swap` 归零或元素此刻不可见时 `transitionend` 不会来，
     不兜的话这一行就永远停在透明。 */
  setTimeout(()=>{if(el.classList.contains('leaving')){el.removeEventListener('transitionend',done);enter()}},400);
}

/**
 * 读数按位错峰长出来。把 `text` 拆成一个个字符，数字各占一档延迟，分隔符跟着前一档。
 *
 * 和 `swapText` 一样只在值真变时触发，首次写入不放动画。
 */
export function popCount(el,text){
  if(!el)return;
  const next=String(text??''),previous=el.dataset.popCount;
  if(previous===next&&el.firstElementChild)return;
  el.dataset.popCount=next;
  let at=-1;
  el.innerHTML=`<span class="digits">${[...next].map(ch=>{
    if(/\d/.test(ch))at+=1;
    return `<span style="--digit-at:${Math.max(at,0)}">${esc(ch)}</span>`;
  }).join('')}</span>`;
  /* 上一个值没登记过（这一格第一次出现）或压根没变，就只把字写上去。调用点整块重绘时
     把上一次的读数写回 `dataset.popCount` 再调，这一格才知道自己是换了值还是刚建出来。 */
  if(previous===undefined||previous===next)return;
  const group=el.firstElementChild;
  group.getBoundingClientRect();
  group.classList.add('popping');
}

/**
 * 占位换成真内容：旧的那一屏抬成盖在容器上的一层淡出，新内容同时从模糊里清晰起来。
 *
 * `write()` 负责把新内容写进 `container`。容器里没有骨架时直接写，不套这一层——
 * 翻页、筛选这类「内容换内容」不属于这条动效，套上去每换一次筛选整页都糊一下。
 */
export function revealSkeleton(container,write){
  if(!container)return;
  /* 还没到显示门槛就已经取完：直接落内容。隐藏中的占位从未被人看见，不该为了它再
     播一段「骨架退场」；这也让很快的本地请求完全没有骨架闪烁。 */
  if(container.querySelector('.skeleton-awaiting')){write();return}
  const hasSkeleton=container.querySelector('.skeleton,[data-skeleton],.skeletoncard,.countskeleton');
  if(!hasSkeleton||!container.firstChild){write();return}
  const fade=document.createElement('div');
  fade.className='skelfade';
  fade.setAttribute('aria-hidden','true');
  while(container.firstChild)fade.append(container.firstChild);
  write();
  container.classList.add('skelreveal');
  container.prepend(fade);
  container.getBoundingClientRect();
  container.classList.add('revealing');
  const drop=()=>{fade.remove();container.classList.remove('skelreveal','revealing')};
  const done=event=>{if(event.target!==fade)return;fade.removeEventListener('transitionend',done);drop()};
  fade.addEventListener('transitionend',done);
  setTimeout(()=>{if(fade.isConnected){fade.removeEventListener('transitionend',done);drop()}},1000);
}

/**
 * 清空输入框，框里那段字往上飘着糊掉。
 *
 * 输入框的 value 是一瞬间没的，动画只能挂在别处：这里照着它此刻的位置和字体摆一份同样
 * 的字，让那一份去飘，真正的输入框当场就空了，光标和输入法一刻也不等。`host` 缺省取
 * 输入框的父元素，它必须是定位祖先，否则这一层会飘到页面左上角去。
 */
export function dissolveValue(input,host=input&&input.parentElement,
  {text=input&&input.value,scrollLeft=input&&input.scrollLeft||0}={}){
  if(!input||!host)return ()=>{};
  host.querySelectorAll(':scope > .cleardissolve').forEach(node=>node.remove());
  input.classList.remove('dissolving');
  input.value='';
  if(!text||!input.isConnected)return ()=>{};
  const box=input.getBoundingClientRect(),frame=host.getBoundingClientRect();
  if(!box.width)return ()=>{};
  const ghost=document.createElement('span');
  ghost.className='cleardissolve';
  ghost.setAttribute('aria-hidden','true');
  const value=document.createElement('span');
  value.dataset.dissolveValue='';
  value.textContent=text;
  value.style.transform=`translateX(-${Math.max(0,scrollLeft)}px)`;
  ghost.append(value);
  const style=getComputedStyle(input);
  Object.assign(ghost.style,{left:`${box.left-frame.left-host.clientLeft}px`,
    top:`${box.top-frame.top-host.clientTop}px`,width:`${box.width}px`,height:`${box.height}px`,
    boxSizing:'border-box',padding:style.padding,font:style.font,lineHeight:style.lineHeight,
    letterSpacing:style.letterSpacing,textAlign:style.textAlign,direction:style.direction});
  input.classList.add('dissolving');
  host.append(ghost);
  let active=true,timer=null;
  const drop=()=>{
    if(!active)return;
    active=false;
    if(timer!==null)clearTimeout(timer);
    ghost.removeEventListener('animationend',drop);
    ghost.remove();
    if(!host.querySelector(':scope > .cleardissolve'))input.classList.remove('dissolving');
  };
  ghost.addEventListener('animationend',drop);
  /* 兜底：`--motion-reveal` 归零或这一刻元素不可见时 `animationend` 不会来，
     不兜的话这份复制品就永远盖在输入框上。 */
  timer=setTimeout(drop,1000);
  return drop;
}

/* 计数徽标上一次是多少。徽标所在的那一排每次筛选都整块重画，节点本身留不住上一个值，
   所以记在这里，键由调用方给的范围加徽标自己的键拼成。 */
const badgeCounts=new Map();
/**
 * 一排计数徽标里值真变了的那几枚弹一下，其余的不动。
 *
 * 首次见到某一枚不弹：那是它第一次出现在这个范围里，整排一起弹是一屏烟花，而它要说的
 * 是「这一枚刚变了」。`scope` 区分同一个键在不同排里的计数（顶部筛选条和抽屉各有一份）。
 */
export function popBadges(root,scope=''){
  if(!root)return;
  root.querySelectorAll('[data-count-badge]').forEach(el=>{
    const key=`${scope} ${el.dataset.countBadge}`,next=el.textContent||'';
    const previous=badgeCounts.get(key);
    badgeCounts.set(key,next);
    el.classList.add('countbadge');
    if(previous===undefined||previous===next)return;
    el.classList.add('popped');
    el.getBoundingClientRect();
    el.classList.remove('popped');
  });
}

/**
 * 一段标题从模糊里逐行揭示出来。
 *
 * 按行不按词：逐词要把整句拆成一串 `<span>`，复制出来的文字会跟着散架，而这几处标题
 * 正是最常被复制走的那几段字。走完把类名和行序一起摘掉，终点帧不留下 `filter`。
 */
export function revealTexts(root,selector='[data-reveal-line]'){
  if(!root)return;
  const lines=[...root.querySelectorAll(selector)];
  if(!lines.length)return;
  /* 起止两个状态都挂在行自己身上，不挂在外面那一层：这几处标题里有一对是 `<body>` 的
     直接子元素（页面标题和它的说明行），要共同的祖先就只剩 body 本身。 */
  lines.forEach((el,i)=>{el.classList.remove('revealing');el.classList.add('revealline');
    el.style.setProperty('--reveal-at',String(i))});
  lines[0].getBoundingClientRect();
  lines.forEach(el=>el.classList.add('revealing'));
  const drop=()=>lines.forEach(el=>{el.classList.remove('revealline','revealing');
    el.style.removeProperty('--reveal-at')});
  const last=lines[lines.length-1];
  const done=event=>{if(event.target!==last)return;last.removeEventListener('transitionend',done);drop()};
  last.addEventListener('transitionend',done);
  setTimeout(()=>{if(last.classList.contains('revealline')){last.removeEventListener('transitionend',done);drop()}},1200);
}

const horizontalControls=new Map();
let horizontalCleanup;
/* 两次滚轮事件隔多久算下一次手势。触控板的惯性尾巴一格一格地来，间隔在几十毫秒；
   人停下来再滚一次，中间隔的比这长得多。 */
const WHEEL_GESTURE_GAP=240;
/* 一格滚轮至少这么大才平滑着走。鼠标滚轮一格是整整一段（Windows 上 100px 起），直接
   改 `scrollLeft` 会一格一格地跳，而页面自己滚的时候每一格都是一段动画；触控板一次只
   给几个像素、一秒几十次，本来就是连续的，再套动画只会拖慢跟手。 */
const WHEEL_SMOOTH_STEP=50;
/* 平滑那一段由这一排自己逐帧走，不用 `scrollTo({behavior:'smooth'})`：那条动画每接一格
   都从零速重新起步，连续转滚轮时一格一顿，实测每两格之间有两三帧完全停住。这里每帧
   朝终点走剩下距离的一截（时间常数 70ms），新的一格只把终点往前挪，速度连着走，不断档。 */
const WHEEL_GLIDE_MS=70;
/* 横排滚到头还往前推，内容多走一小段再弹回来。transitions.dev 没有这一条配方，越界位移
   借 UIScrollView 那条橡皮筋公式 `(1 - 1/(x·c/d + 1))·d`（c = 0.55，use-gesture 的
   `rubberband` 是同一条）：推得越远越推不动，怎么推也到不了容器那么宽。弹回走站内那条
   采样弹簧 `--spring-pane`，冲过原位再荡回来，和筛选条那块底板一个手感。 */
const RUBBER_BAND=.55;
/* 滚轮没有「手还按着」那一段，推到头的那一下按这一格的力度弹一次：一格滚轮当作手拖了它
   的三成半，放在最多 480px 宽的橡皮筋上算。宽屏上一整排一千多像素，按整排算，一格
   推出去的量会大到像是整排滑脱了。 */
const WHEEL_PULL=.35;
const WHEEL_PULL_SPAN=480;
export function rubberBand(distance,dimension){
  if(!distance||!(dimension>0))return 0;
  return Math.sign(distance)*(1-1/(Math.abs(distance)*RUBBER_BAND/dimension+1))*dimension;
}
/* 位移挂在这一排的子元素上（`.edgepull>*`，读 `--edge-pull`），不挂在容器自己身上：容器
   一挪，贴着它的渐隐遮罩和外面那一层的边界跟着一起走，右移时还会把整页撑出横向滚动条。
   动画只在越界那一下挂类名，平时子元素上什么都不多。 */
function edgeBounce(el){
  let spring=null,pulled=0;
  const idle=()=>typeof el.animate!=='function'||matchMedia('(prefers-reduced-motion:reduce)').matches;
  const settle=()=>{spring=null;if(!pulled)el.classList.remove('edgepull')};
  const play=(frames,duration)=>{
    spring?.cancel();el.classList.add('edgepull');
    spring=el.animate(frames,{duration});
    spring.onfinish=settle;
  };
  return {
    /* 拖动跟手：越界多少就按橡皮筋收成多少，松手 `release` 弹回。 */
    drag(excess){
      if(idle())return;
      spring?.cancel();spring=null;
      pulled=-rubberBand(excess,el.clientWidth);
      el.classList.toggle('edgepull',!!pulled);
      if(pulled)el.style.setProperty('--edge-pull',`${pulled}px`);else el.style.removeProperty('--edge-pull');
    },
    release(){
      if(!pulled)return;
      const from=pulled,ease=glideEase();pulled=0;el.style.removeProperty('--edge-pull');
      play([{'--edge-pull':`${from}px`,easing:ease.easing},{'--edge-pull':'0px'}],ease.duration);
    },
    /* 滚轮顶到头：冲出去那一段减速，荡回来那段走弹簧。一次手势只弹一下，调用方判。 */
    kick(delta){
      if(idle()||pulled)return;
      const peak=-rubberBand(delta*WHEEL_PULL,Math.min(el.clientWidth,WHEEL_PULL_SPAN));
      if(!peak)return;
      const ease=glideEase();
      play([{'--edge-pull':'0px',easing:'cubic-bezier(.2,.8,.4,1)'},
        {'--edge-pull':`${peak}px`,offset:.3,easing:ease.easing},{'--edge-pull':'0px'}],ease.duration*1.6);
    },
  };
}
/** 同一容器只绑定一次。指针在这一排上时滚轮只滚这一排，滚到头弹一下，不带着整页走。 */
export function wireHorizontalScroller(el,{drag=false,fade=true}={}){
  if(!el)return;
  const existing=horizontalControls.get(el);
  if(existing){existing.options.drag ||= drag;existing.options.fade ||= fade;existing.update();return existing}
  const options={drag,fade},abort=new AbortController(),bounce=edgeBounce(el);
  let start=null,moved=0,heldUntil=0,target=0,kicked=false,glide=0,glideAt=0,pos=0,pending=0;
  /* 值没变就不写：自动滚动每一帧都触发一次 `scroll`，同值重写属性照样让样式重算一遍。 */
  const mark=(key,value)=>{if(el.dataset[key]!==value)el.dataset[key]=value};
  const update=()=>{if(options.fade){mark('overflowLeft',String(el.scrollLeft>1));mark('overflowRight',String(el.scrollLeft+el.clientWidth<el.scrollWidth-1))}};
  const listen=(target,event,handler,extra={})=>target.addEventListener(event,handler,{...extra,signal:abort.signal});
  listen(el,'scroll',update,{passive:true});
  const kick=delta=>{if(!kicked){kicked=true;bounce.kick(delta)}};
  const stopGlide=()=>{cancelAnimationFrame(glide);glide=0;pending=0};
  /* 位置自己记一份小数：一帧只走零点几个像素时，`scrollLeft` 读回来是取整后的值。
     推过头的那一下等走到头再弹，半路就弹看起来是没到头先弹了。 */
  const frame=now=>{
    const dt=Math.min(Math.max(now-glideAt,0),64);glideAt=now;
    pos+=(target-pos)*(1-Math.exp(-dt/WHEEL_GLIDE_MS));
    if(Math.abs(target-pos)<.5)pos=target;
    el.scrollLeft=pos;
    if(pos!==target){glide=requestAnimationFrame(frame);return}
    glide=0;
    if(pending){const delta=pending;pending=0;kick(delta)}
  };
  /* 页面那边开了头的手势拦不住：Chrome 把一串滚轮事件认作同一次手势，第一下没被拦下，
     后面那些就再也拦不住。页面滚着滚着让这一排经过指针底下时，这些原样留给页面。
     在这一排上开头的手势整段都归这一排：还没滚完、滚到头以后，都不把剩下的交给页面；
     要滚整页，指针挪到这一排外面去。推过头就弹一下，一次手势只弹一次：触控板的惯性
     尾巴一格一格地撞在边上，每格都弹就是一串抖动。 */
  listen(el,'wheel',event=>{
    const max=el.scrollWidth-el.clientWidth;
    if(event.defaultPrevented||!event.cancelable||Math.abs(event.deltaY)<=Math.abs(event.deltaX)||max<=0)return;
    event.preventDefault();
    const now=performance.now(),step=Math.abs(event.deltaY);
    if(now>heldUntil)kicked=false;
    heldUntil=now+WHEEL_GESTURE_GAP;
    // 平滑那一段还在半路时，下一格从上一格的终点接着算。
    const from=glide?target:el.scrollLeft,want=from+event.deltaY;
    target=Math.min(max,Math.max(0,want));
    const over=want===target?0:event.deltaY;
    if(step<WHEEL_SMOOTH_STEP||target===from){
      if(target!==from){stopGlide();el.scrollLeft=target}
      if(over&&!glide)kick(over);else if(over)pending=over;
      return;
    }
    if(over)pending=over;
    if(!glide){pos=el.scrollLeft;glideAt=performance.now();glide=requestAnimationFrame(frame)}
  },{passive:false});
  listen(el,'mousedown',event=>{if(!options.drag||event.button!==0||el.scrollWidth-el.clientWidth<=1)return;event.stopPropagation();stopGlide();start={x:event.pageX,left:el.scrollLeft};moved=0;el.style.cursor='grabbing'});
  listen(window,'mousemove',event=>{
    if(!start)return;
    const dx=event.pageX-start.x,want=start.left-dx,max=el.scrollWidth-el.clientWidth;
    moved=Math.max(moved,Math.abs(dx));el.scrollLeft=want;
    bounce.drag(want<0?want:want>max?want-max:0);
    event.preventDefault();
  });
  listen(window,'mouseup',()=>{if(start)bounce.release();start=null;el.style.cursor=''});
  listen(el,'click',event=>{if(moved>6){event.stopPropagation();event.preventDefault();moved=0}},{capture:true});
  const resize=new ResizeObserver(update);resize.observe(el);
  const control={options,update,destroy(){abort.abort();stopGlide();resize.disconnect();horizontalControls.delete(el);el.style.cursor='';if(!horizontalControls.size){horizontalCleanup?.disconnect();horizontalCleanup=null}}};
  horizontalControls.set(el,control);
  if(!horizontalCleanup){horizontalCleanup=new MutationObserver(()=>{for(const [node,item] of horizontalControls)if(!node.isConnected)item.destroy()});horizontalCleanup.observe(document.body,{childList:true,subtree:true})}
  update();return control;
}

/* 一排横卡自己缓缓往前走，走到头停一下再往回走。一秒 24px 是看得出在动、又不催人读的
   速度：一张 168px 的卡七秒走过去。两端各停两秒，最后一张和第一张都看得清。 */
const AUTO_SCROLL_SPEED=24;
const AUTO_SCROLL_DWELL=2000;
/* 人手动过之后隔多久再接着走：刚滚到想看的那张，这一排马上又自己挪走，等于跟人抢。 */
const AUTO_SCROLL_RESUME=3000;
const autoScrollers=new Map();
/**
 * 横排自动滚动。指针停在上面、焦点在里面、这一排不在屏幕上、页面切到后台时都停；
 * 人滚过或拖过之后从人停下的位置接着走。系统要求减少动态效果时不动。
 */
export function wireAutoScroll(el){
  if(!el||autoScrollers.has(el))return;
  if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  const abort=new AbortController();
  let pos=el.scrollLeft,dir=1,last=0,frame=0,hovered=false,holdUntil=0;
  const listen=(target,type,fn)=>target.addEventListener(type,fn,{passive:true,signal:abort.signal});
  /* 在不在屏幕上每帧量一次，不另挂观察器：页面观察器只留给「载入更多」那一份。
     滚出屏幕后循环停下，页面再滚动时由下面的捕获监听叫醒。 */
  const onscreen=()=>{const r=el.getBoundingClientRect();return r.width>0&&r.bottom>0&&r.top<innerHeight};
  const running=()=>el.isConnected&&!hovered&&!document.hidden&&!el.matches(':focus-within')&&onscreen();
  const tick=now=>{
    frame=0;
    if(!el.isConnected){stop();return}
    if(!running())return;
    frame=requestAnimationFrame(tick);
    const dt=last?Math.min(now-last,64):0;last=now;
    const max=el.scrollWidth-el.clientWidth;
    if(now<holdUntil||max<=1)return;
    /* 位置自己记一份小数：一帧只走零点几个像素，`scrollLeft` 读回来是取整后的值，
       拿它接着加会一直原地不动。 */
    pos=Math.min(max,Math.max(0,pos+dir*AUTO_SCROLL_SPEED*dt/1000));
    el.scrollLeft=pos;
    if(pos>=max||pos<=0){dir=pos>=max?-1:1;holdUntil=now+AUTO_SCROLL_DWELL}
  };
  // 重画换掉了这一排时，挂在 document 上的监听要在下一次叫醒时跟着撤掉。
  const wake=()=>{if(!el.isConnected)stop();else if(!frame&&running()){last=0;frame=requestAnimationFrame(tick)}};
  const hold=()=>{holdUntil=performance.now()+AUTO_SCROLL_RESUME};
  // 读回来和自己记的差不到一个像素就是自己那一帧；差得多是人滚的，从人停下的地方接着走。
  listen(el,'scroll',()=>{if(Math.abs(el.scrollLeft-pos)>1){pos=el.scrollLeft;hold()}});
  listen(el,'pointerenter',()=>{hovered=true});
  listen(el,'pointerleave',()=>{hovered=false;hold();wake()});
  listen(el,'focusout',()=>setTimeout(wake,0));
  listen(document,'visibilitychange',wake);
  document.addEventListener('scroll',wake,{capture:true,passive:true,signal:abort.signal});
  wake();
  function stop(){cancelAnimationFrame(frame);frame=0;abort.abort();autoScrollers.delete(el)}
  autoScrollers.set(el,stop);
}
export function stopAutoScroll(el){autoScrollers.get(el)?.()}

/* 一排里标出「当前是哪一个」的那块底板，全站只有这一种动法：滑过去、冲过落点、荡回来。
   筛选条上那块玻璃、抽屉那一列、分段控件里那块白底，在人眼里是同一件事，各写一段就会
   各自漂移成三种手感。
   弹簧曲线和它的时长都写在 `board.css` 的 `--spring-pane` 上，这里只读一次：那串数是一次
   弹簧模拟的采样结果，抄第二份就没人再改得动它。 */
let paneSpring=null;
export function glideEase(){
  if(!paneSpring){
    const css=getComputedStyle(document.documentElement);
    paneSpring={easing:css.getPropertyValue('--spring-pane').trim()||'ease',
      duration:parseFloat(css.getPropertyValue('--spring-pane-ms'))||300};
  }
  return paneSpring;
}
/* 位移走 `translate`、形变走 `scale`，两个独立属性各挂一段动画，不挤进同一条
   `transform`：一条属性上只放得下一段，而这两下的时间形状不是同一条曲线——位移冲过
   落点再荡回来，抻开是中途最大、两头归一。分开写，两段仍然都在合成线程上。
   都不碰 `width`：宽度是布局属性，逐帧改它等于让整份文档重新排版一遍，合成线程碰不
   到它，主线程一忙这块底板就跟着卡住。
   `from` 给 null 就只落位不动画：第一次出现的那块不该从别处飞进来。 */
export function moveGlidePane(pane,from,box,axis='x'){
  pane.style.width=`${box.w}px`;pane.style.height=`${box.h}px`;
  const span=axis==='y'?'h':'w',head=axis==='y'?'y':'x';
  const settled=`${box.x}px ${box.y}px`;
  if(from&&from[head]!==box[head]&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
    const ease=glideEase();
    /* 先撤掉还在跑的那两段：一块上叠着两段位移，晚建的那段从头起跑，先建的还在往它
       自己的终点走，合出来的位置两边都不是。 */
    pane.getAnimations().forEach(a=>a.cancel());
    pane.animate([{translate:axis==='y'?`${box.x}px ${from.y}px`:`${from.x}px ${box.y}px`},
      {translate:settled}],{duration:ease.duration,easing:ease.easing,fill:'none'});
    /* 一块被拽着走的软东西，跑起来在跑的方向上抻开，停下来收回去。抻多少按这一跳跨了
       自己几个身位算，封在一个半身位：再远也不该更长，那时候读起来不是被拉长的同一
       块，是换上来的另一块。峰值压在前三成——加速那一段才拉得动它。
       形变只在这一排排布的方向上：另一根轴的尺寸是这一排给定的，在那儿拉扯会让它看
       起来不是这一排里的东西。 */
    const reach=Math.min(Math.abs(box[head]-from[head])/box[span],1.5),grow=1+reach*.12;
    pane.animate([{scale:'1 1',offset:0},
      {scale:axis==='y'?`1 ${grow}`:`${grow} 1`,offset:.3},{scale:'1 1',offset:1}],
      {duration:ease.duration,easing:'ease-in-out',fill:'none'});
  }
  pane.style.translate=settled;
}

/* 逐条明细收在 Note 自己的 <details> 里，默认折叠：一句话的结论后面跟着上千行清单时，
   下面的内容全被推走，而那句结论本身才是要先读到的东西。每条给标题、说明和路径三段：
   只给一个「查看视频」链接的话，是哪个文件得逐个点开才知道。 */
function noteDetailsHtml({label='',items=[],footnote=''}={}){
  const line=item=>`<li>${item.href?`<a href="${esc(item.href)}">${esc(item.label||'')}</a>`
    :`<b>${esc(item.label||'')}</b>`}<span>${esc(item.note||'')}</span>${
    item.hint?`<code>${esc(item.hint)}</code>`:''}</li>`;
  return `<details class="geist-note-details"><summary>${esc(label)}</summary>
    <ul>${items.map(line).join('')}</ul>${footnote?`<p>${esc(footnote)}</p>`:''}</details>`;
}

/* Inline, persistent context beside the field/card/section it describes.
   恢复动作有两种形态：留在本页执行的走按钮，要离开本页才做得成的走链接。
   两者占同一个格子、同一枚 `data-note-action`，Note 的版式不因为它是 <a> 改变。 */
export function noteHtml(message,{variant='secondary',label='',className='',size='medium',filled=false,actionLabel='',actionHref='',details=null}={}){
  const kind=NOTE_VARIANTS.has(variant)?variant:'secondary';
  const symbol=kind==='secondary'?'info':kind==='success'?'check':'alert';
  const role=kind==='error'?' role="alert"':' role="note"';
  const action=!actionLabel?''
    :actionHref?`<a class="geist-button" href="${esc(actionHref)}" data-note-action>${esc(actionLabel)}</a>`
    :`<button type="button" class="geist-button primary" data-note-action>${esc(actionLabel)}</button>`;
  return `<div class="geist-note geist-note-${kind}${className?` ${esc(className)}`:''}${size==='small'?' geist-note-small':''}${filled?' geist-note-filled':''}"${role}>
    ${icon(symbol)}<p>${label?`<b>${esc(label)}</b>`:''}<span>${esc(kind==='error'?requestErrorMessage(message):message)}</span></p>${action}${details?noteDetailsHtml(details):''}</div>`;
}

const PROJECT_BANNER_CLASSES={gray:'project-banner-gray',success:'project-banner-success',warning:'project-banner-warning',error:'project-banner-error'};
export function projectBannerHtml(message,{variant='gray',href,label,value,max}={}){
  const kind=['gray','success','warning','error'].includes(variant)?variant:'gray';
  return `<aside class="project-banner ${PROJECT_BANNER_CLASSES[kind]}" role="${kind==='error'?'alert':'status'}"><div>${Number(max)>0?gaugeHtml('任务完成率',value,max):icon(kind==='error'||kind==='warning'?'alert':'info')}<p>${esc(message)}</p></div><a href="${esc(href)}">${esc(label)}</a></aside>`;
}

export function gaugeHtml(label,value,max=100,{usage=false,compact=false}={}){
  const ceiling=Number(max), current=Number(value);
  if(!Number.isFinite(ceiling)||ceiling<=0||!Number.isFinite(current))return `<span>${esc(label)}：未取得</span>`;
  const percent=Math.max(0,Math.min(100,current/ceiling*100));
  const level=usage?(percent>=95?'error':percent>=80?'warning':'normal'):'normal';
  const status=usage?(level==='error'?'空间即将用满':level==='warning'?'空间使用偏高':'空间充足'):'';
  return `<span class="geist-gauge" data-level="${level}" role="progressbar" aria-label="${esc(label+(status?'：'+status:''))}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percent}"><svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="13"/><circle cx="16" cy="16" r="13" pathLength="100" stroke-dasharray="${percent} 100"/></svg></span>${status&&!compact?`<span class="gauge-status">${status}</span>`:''}`;
}

export function configurationSkeletonHtml(){
  const groups=[['通用',1],['媒体',2],['网络与访问',2],['更新与维护',3]];
  return `<div class="configpage" data-skeleton="configuration" role="status" aria-label="正在读取配置">${groups.map(([label,count])=>`<h2 class="configgroup" aria-hidden="true">${label}</h2>${Array.from({length:count},()=>`<div class="configfieldset config-skeleton-card" aria-hidden="true"><div class="geist-fieldset-content"><span class="skeleton"></span><span class="skeleton"></span><span class="skeleton"></span></div><footer class="geist-fieldset-footer"><span class="skeleton"></span></footer></div>`).join('')}`).join('')}</div>`;
}

/** Determinate progress only. Callers supply real units instead of a decorative width. */
export function progressHtml(label,value,max=100,{variant='active',stops=[]}={}){
  const ceiling=Math.max(0,Number(max)||0);
  const current=Math.max(0,Math.min(Number(value)||0,ceiling));
  const percent=ceiling?current/ceiling*100:0;
  return `<div class="geist-progress" role="progressbar" aria-label="${esc(label)}"
    aria-valuemin="0" aria-valuemax="${ceiling}" aria-valuenow="${current}"
    style="--progress-value:${percent}%;--progress-color:var(${variant==='error'?'--drop':variant==='warning'?'--meter':'--feedback-success'})"><i></i>${stops.filter(stop=>Number(stop.value)>0&&Number(stop.value)<ceiling&&stop.label).map(stop=>`<span class="geist-progress-stop" style="left:${Number(stop.value)/ceiling*100}%" role="img" aria-label="${esc(stop.label)}"></span>`).join('')}</div>`;
}

/**
 * Geist Spinner: immediate feedback for a user-triggered action. Geist names
 * "inline icon refresh" as one of its three cases, so an icon-only key that
 * swaps its glyph for these ten bars is the prescribed shape, not a fallback.
 *
 * `label` names the work in flight (`正在换一批`), never the action the button
 * already carries. This span is a `role=status` region sitting inside a button
 * that has its own accessible name: repeating that name announces the same
 * words twice and tells the reader nothing changed.
 */
export function spinnerHtml(label='加载中'){
  const bars=Array.from({length:10},(_,index)=>
    `<i aria-hidden="true" style="--spinner-angle:${index*36}deg;--spinner-delay:${index*100-900}ms"></i>`).join('');
  return `<span class="geist-spinner" role="status" aria-label="${esc(label)}">${bars}</span>`;
}

/**
 * Geist Search Input: search icon as a prefix, swapped in place for a Spinner
 * while the query runs, and the input geometry never changes. Read-only queries
 * carry no submit button, so the accessible name lives in `aria-label` — a
 * placeholder is not a label, it disappears the moment there is text to read.
 */
export function searchInputHtml({label,id='',name='',value='',placeholder='',attrs=''}={}){
  const parts=[
    'type="search"',
    id?`id="${esc(id)}"`:'',
    name?`name="${esc(name)}"`:'',
    placeholder?`placeholder="${esc(placeholder)}"`:'',
    `value="${esc(value)}"`,
    `aria-label="${esc(label)}"`,
    'spellcheck="false" autocomplete="off"',
    attrs,
  ].filter(Boolean).join(' ');
  return `<div class="geist-search" data-search-input>
    <span class="geist-search-prefix" data-search-prefix>${icon('search')}</span>
    <input ${parts}></div>`;
}

/**
 * Geist loading action: visually unavailable and inert without using native
 * `disabled`, so the trigger keeps keyboard focus while its request is running.
 */
export function setActionBusy(control,busy=true){
  if(!control)return;
  if(busy){
    control.setAttribute('aria-busy','true');
    control.setAttribute('aria-disabled','true');
  }else{
    control.removeAttribute('aria-busy');
    control.removeAttribute('aria-disabled');
  }
}

const busyActionRoots=new WeakSet();

/** Block repeat pointer and keyboard activation for every shared busy action. */
export function wireBusyActions(root=document){
  if(busyActionRoots.has(root))return;
  busyActionRoots.add(root);
  root.addEventListener('click',event=>{
    const control=event.target.closest?.('button[aria-busy="true"],[role="button"][aria-busy="true"]');
    if(!control||!root.contains(control))return;
    event.preventDefault();
    event.stopImmediatePropagation();
  },true);
}

/** Geist Loading Dots: indeterminate work continuing in the background. */
export function loadingDotsHtml(label='正在处理', {className=''}={}){
  return `<span class="geist-loading${className?` ${esc(className)}`:''}" role="status">
    <span class="geist-loading-dots" aria-hidden="true"><i></i><i></i><i></i></span>
    <span>${esc(label)}</span></span>`;
}

/** Geist Skeleton: reserve a large content region while its structure is loading. */
/* `count` 只对 cards 生效：块数是骨架说出口的结构预告，六块对上的是海报网格，
   而行政界面往往只有两三个大区。多画的块加载完就消失，那不是占位是误报。
   `cardRatio` 是卡片封面的宽高比，交给调用方按真卡的版式给：大图版式的正封是竖的，
   骨架照 16:9 铺的话，内容一到整屏卡片都要被拉高一截。 */
export function skeletonHtml(label='正在读取内容',{className='',variant='panel',count=6,fill=true,gridClass='',gridSize='',cardRatio=0}={}){
  const kind=new Set(['panel','cards','dashboard']).has(variant)?variant:'panel';
  const body=kind==='cards'
    ?Array.from({length:Math.max(1,count)},
      ()=>`<span class="skeletoncard"><i></i><s></s><b></b><em></em><u></u></span>`).join('')
    :kind==='dashboard'
      /* 指标带是统计与口味两页真正的第一屏内容，四格的位置和高度都是定死的。
         骨架从大区开始画，等数据到货再从上面挤进一条 96px 的带子，整页往下跳一次。 */
      ?`<span class="skeletondashstrip">${Array.from({length:4},
          ()=>`<span><i></i><b></b><em></em></span>`).join('')}</span>
        <span class="skeletondashhero"><i></i><b></b></span>
        <span class="skeletondashpanel"><i></i><b></b><em></em></span>
        <span class="skeletondashpanel"><i></i><b></b><em></em></span>`
    :`<span class="skeleton" style="width:38%"></span>
      <span class="skeleton" style="width:100%"></span>
      <span class="skeleton" style="width:100%"></span>
      <span class="skeleton" style="width:72%"></span>`;
  /* data-skeleton 是这张骨架的身份。深链启动先画一张、路由到位后各页再画一张，
     整页刷新就会连闪两段动画；调用方拿这个键判断「已经是同一张了」，跳过重画。 */
  return `<div class="skeletonpanel skeleton-${kind}${className?` ${esc(className)}`:''}"
    data-skeleton="${esc(kind)}${className?`/${esc(className)}`:''}"${kind==='cards'&&fill?' data-fill=""':''}
    role="status" aria-label="${esc(label)}"><span class="sr-only">${esc(label)}</span>
    <div${gridClass?` class="${esc(gridClass)}"`:''}${gridSize?` data-size="${esc(gridSize)}"`:''}${
      kind==='cards'&&Number(cardRatio)>0?` style="--skeleton-card-ratio:${Number(cardRatio)}"`:''} aria-hidden="true">${body}</div></div>`;
}

/** 索引占位复用最终网格、头像和词表的尺寸。 */
export function indexSkeletonHtml({kind,layout='big',mode='alphabet'}={}){
  const people=kind!=='tags',company=kind==='studios'||kind==='agencies';
  const cell=people
    ?'<span class="icell"><span class="ring skeleton"></span><span class="nm skeleton">&nbsp;</span><span class="n skeleton">&nbsp;</span></span>'
    :'<span class="alphatag"><span class="skeleton"></span><span class="n skeleton"></span></span>';
  const grid=people?`igrid" data-cells="${company?'company':'people'}" data-layout="${esc(layout)}`:'alphalist';
  /* 字母表是一组一张卡：每组两行占位，铺三组，形状同页面落地后开头那几组；
     它不走 `data-fill`——那条补的是单张网格，一组补到视口下沿反而不像。 */
  const body=!people&&mode==='cloud'
    ?`<div class="tagwall index-tags">${Array.from({length:60},(_,i)=>
      `<span class="tg skeleton" style="width:${[92,128,76,108,144][i%5]}px">&nbsp;</span>`).join('')}</div>`
    :people?`<div class="${grid}">${cell.repeat(12)}</div>`
    :`<section class="alphagroup"><span class="indexletterskeleton skeleton"></span><div class="${grid}">${cell.repeat(10)}</div></section>`.repeat(3);
  const label='正在读取索引';
  return `<div class="skeletonpanel index-skeleton" data-skeleton="index/${esc(kind)}/${esc(layout)}/${esc(mode)}"${people?' data-fill=""':''}
    role="status" aria-label="${label}"><span class="sr-only">${label}</span><section aria-hidden="true">${body}</section></div>`;
}

/* 骨架的枚数由容器当下的宽度决定，不写死一个数：横向一行铺到右缘为止，网格补满
   整行。写死的话宽屏最后一行留一截豁口，窄屏和手机端又多出一堆要横滑才看得见的
   占位；算出来就不必再为断点各写一套。宽度序列只是让胶囊长短不一，像真词。 */
const SKELETON_SLOT={
  av:()=>`<span class="av avskeleton"><span class="ring"></span><span class="nm">&nbsp;</span></span>`,
  brandpill:width=>`<span class="brandpill brandskeleton" style="width:${width}px"><span class="mk"></span></span>`,
  pill:width=>`<span class="pill tagskeleton" style="width:${width}px"></span>`,
};
const SKELETON_SLOT_WIDTHS={
  av:[0],
  brandpill:[132,158,118,146,124,164,138],
  pill:[92,68,104,76,88,64,96,72,100,80,68,92,76,84],
};

/* 低于这一段的请求直接显示内容。Peach 的数据多在本机，立即把占位画出来会让几十毫秒的
   正常读取看成一次闪烁；超过门槛才说明页面确实需要等待。只藏最外层占位，内部结构仍先
   参与布局和 fit 计算，因此真正出现时不会再重排。 */
export const SKELETON_REVEAL_DELAY=180;
const SKELETON_REVEAL_SELECTOR='[data-skeleton],[data-skeleton-tier],.countskeleton';
function armSkeletonReveal(root){
  if(!root)return;
  const all=[...(root.matches?.(SKELETON_REVEAL_SELECTOR)?[root]:[]),
    ...root.querySelectorAll(SKELETON_REVEAL_SELECTOR)];
  const targets=all.filter(node=>!all.some(parent=>parent!==node&&parent.contains(node)));
  for(const target of targets){
    /* 已经武装过的跳过这一枚就好。写 `return` 会让同一批里排在它后面的占位
       一个都拿不到延迟标记，补进来的那半屏骨架直接闪出来。 */
    if(target.dataset.skeletonReveal)continue;
    target.dataset.skeletonReveal='pending';
    target.classList.add('skeleton-awaiting');
    setTimeout(()=>{
      if(!target.isConnected||target.dataset.skeletonReveal!=='pending')return;
      target.dataset.skeletonReveal='shown';
      target.classList.remove('skeleton-awaiting');
    },SKELETON_REVEAL_DELAY);
  }
}

const SKELETON_TIER_LIMIT=64;
/* 横向骨架铺到溢出容器右缘为止。每量一次宽度就是一次整页布局，逐枚追加、逐枚量的话一排
   要布局十几二十次，冷启动实测一排一百多毫秒。所以按轮来：先铺一轮宽度序列，量一次，按
   量到的平均宽度把缺的那截一次补齐，再量一次确认。几排走同一轮，先全量再全写，合起来也
   只布局这几次。上限只是死循环的护栏。 */
function fillSkeletonTiers(jobs){
  /* 同一排会再补一次（名单到了、容器改宽）：已经越过右缘的那排不再追加。空排不必先量。 */
  jobs=jobs.filter(job=>job.row&&SKELETON_SLOT[job.kind]&&(!job.row.children.length||job.row.scrollWidth<=job.row.clientWidth))
    .map(job=>({...job,start:job.row.children.length,added:0}));
  const add=(job,count)=>{
    const slot=SKELETON_SLOT[job.kind],widths=SKELETON_SLOT_WIDTHS[job.kind];
    let html='';
    for(const end=Math.min(SKELETON_TIER_LIMIT,job.added+count);job.added<end;job.added++)html+=slot(widths[job.added%widths.length]);
    job.row.insertAdjacentHTML('beforeend',html);
  };
  for(const job of jobs)add(job,SKELETON_SLOT_WIDTHS[job.kind].length);
  for(let round=0;round<4;round++){
    const short=jobs.filter(job=>job.added<SKELETON_TIER_LIMIT&&job.row.scrollWidth<=job.row.clientWidth).map(job=>{
      const first=job.row.children[job.start].getBoundingClientRect(),last=job.row.lastElementChild.getBoundingClientRect();
      const each=Math.max(1,(last.right-first.left)/job.added);
      return [job,Math.ceil((job.row.getBoundingClientRect().right-last.right)/each)+1];
    });
    if(!short.length)break;
    for(const [job,count] of short)add(job,Math.max(1,count));
  }
  for(const job of jobs)armSkeletonReveal(job.row);
}
export function fillSkeletonTier(row,kind){fillSkeletonTiers([{row,kind}])}

/** 骨架落进 DOM 之后按实际尺寸补齐：横向一行铺满，卡片网格补到整行且盖住视口余量。 */
export function fitSkeleton(root){
  if(!root)return;
  const scoped=selector=>[...(root.matches?.(selector)?[root]:[]),...root.querySelectorAll(selector)];
  fillSkeletonTiers(scoped('[data-skeleton-tier]').map(row=>({row,kind:row.dataset.skeletonTier})));
  for(const grid of scoped('.skeletonpanel[data-fill]>div,.index-skeleton[data-fill]>section>div')){
    const first=grid.firstElementChild,style=getComputedStyle(grid);
    /* 横排的推荐行不是网格，列数无从谈起，按整行补会把它裁成一张。 */
    if(!first||style.display!=='grid')continue;
    const columns=style.gridTemplateColumns.split(' ').filter(Boolean).length;
    const rowGap=parseFloat(style.rowGap)||0,cardHeight=first.getBoundingClientRect().height;
    if(!columns||!cardHeight)continue;
    /* 骨架说的是「这块地方等下会被填满」，所以铺到视口下沿；四行是护栏，
       再多也是一屏之外看不见的占位，白占动画。 */
    const room=window.innerHeight-grid.getBoundingClientRect().top;
    const rows=Math.max(1,Math.min(4,Math.ceil((room+rowGap)/(cardHeight+rowGap))));
    const want=columns*rows;
    while(grid.children.length>want)grid.lastElementChild.remove();
    while(grid.children.length<want)grid.appendChild(first.cloneNode(true));
  }
  armSkeletonReveal(root);
}

/**
 * Board 下划线 Tabs（boardui tabs.tsx）：一排互斥的「这一页现在摆的是哪一组东西」。
 *
 * 索引页用它切厂牌／事务所与本地／在线两套词表：两档各是一条地址。它回答的是页面层级的
 * 「在哪一页」，不是给当前这批加一条筛选——筛选归玻璃条上的药丸。
 * 每一枚都是 `role=tab`，当前项写 `aria-selected`；滑动的 2px 蓝线由 `board-local-nav`
 * 那条共用规则和 `wireBoardTabs` 提供，这里只出 DOM。计数是可选的尾随徽标，口径由调用方
 * 给：Tabs 自己不算数。前置字形也是可选的，只在它指向对象（厂牌、事务所、本地、订阅源）
 * 时出现。
 */
export function boardTabsHtml(items,{active='',attr='data-tab',label='页面视图',className='',panel=''}={}){
  const tabs=items.map(({value,label:text,count,symbol})=>{
    const selected=String(value)===String(active);
    const badge=count==null?'':`<span class="board-tab-count">${esc(Number(count).toLocaleString())}</span>`;
    return `<button type="button" role="tab" ${attr}="${esc(value)}" aria-selected="${selected}"${
      panel?` aria-controls="${esc(panel)}"`:''}>${symbol?icon(symbol):''}${esc(text)}${badge}</button>`;
  }).join('');
  return `<div class="board-local-nav board-tabs${className?` ${esc(className)}`:''}" role="tablist" aria-label="${esc(label)}">${tabs}</div>`;
}

/** Geist Empty State: icon tile, title and explanatory copy stay one semantic unit. */
export function emptyStateHtml(iconName,title,description,{className='',actions=''}={}){
  return `<div class="emptystate${className?` ${esc(className)}`:''}" data-geist-empty-state role="status">
    <div class="es-icon" aria-hidden="true">${icon(iconName)}</div>
    <div class="es-copy"><h3>${esc(title)}</h3><p>${esc(description)}</p></div>
    ${actions?`<div class="es-actions">${actions}</div>`:''}
  </div>`;
}

/** Geist Scroller: one-axis overflow with edge fades as the scroll affordance. */
export function scrollerHtml(content,{className='',label='可滚动内容',overflow='y'}={}){
  const axis=new Set(['x','y','both']).has(overflow)?overflow:'y';
  return `<div class="geist-scroller${className?` ${esc(className)}`:''}" data-geist-scroller>
    <div class="geist-scroller-overlay" aria-hidden="true"></div>
    <div class="geist-scroller-container" data-overflow="${axis}" tabindex="0" aria-label="${esc(label)}">${content}</div>
  </div>`;
}

function updateScroller(wrapper){
  const container=wrapper.querySelector(':scope > .geist-scroller-container');
  const overlay=wrapper.querySelector(':scope > .geist-scroller-overlay');
  if(!container||!overlay)return;
  overlay.classList.toggle('can-scroll-top',container.scrollTop>1);
  overlay.classList.toggle('can-scroll-bottom',container.scrollTop+container.clientHeight<container.scrollHeight-1);
  overlay.classList.toggle('can-scroll-left',container.scrollLeft>1);
  overlay.classList.toggle('can-scroll-right',container.scrollLeft+container.clientWidth<container.scrollWidth-1);
}

/** Wire newly rendered scrollers without duplicating listeners after a rerender. */
export function wireScrollers(root=document){
  root.querySelectorAll('[data-geist-scroller]').forEach(wrapper=>{
    const container=wrapper.querySelector(':scope > .geist-scroller-container');
    if(!container)return;
    if(!container.dataset.scrollerWired){
      container.dataset.scrollerWired='true';
      container.addEventListener('scroll',()=>updateScroller(wrapper),{passive:true});
      container.addEventListener('load',()=>updateScroller(wrapper),true);
    }
    requestAnimationFrame(()=>updateScroller(wrapper));
  });
}

/** 挂覆盖式滚动条的滚动容器。列表只写在这一处，样式那边认的是挂上之后的属性。
 *
 * `[data-stage-scroll]` 是详情浮窗里所有内容的外层。窄屏下整块内容自己纵向滚，滚的得是它而不是
 * `<dialog data-stage>` 本身：轨道必须是滚动容器的兄弟，而 dialog 在顶层，挂在它
 * 父级上的轨道会落到遮罩底下。宽屏下它不溢出，组件自己量得出来，轨道不显示。 */
const OVERLAY_SCROLLERS=[
  '[data-stage-side-content]','[data-stage-scroll]','.tagpickbody','[data-mix-list]','.playlistpicklist',
  '[data-player-stats]',
  '.vjs-peach-settings-menu','.geist-scroller-container','.metricstrip','.tastesummaries',
  '.skeletondashstrip','.followpagination',
  '.reviewtabs','.ftablewrap','.board-local-nav','[data-manage-menu]',
  '.follow-workspace-switch','.fmanagenav','[role="listbox"]',
].join(',');
/* Board 层里会超宽的横向滚动层：两端按滚动位置渐隐说明「那边还有」，鼠标停在上面时竖向
   滚轮转成横向。边线留给外层框，渐隐只落在这一层。
   这里登记的都是 `frontend/` 或 board.css 画出来的层，它们不经过 `wireAllDrag` 那份按 id
   点名的清单，漏登记就是「看得见、够不着」：一排分区在 390px 下溢出两百多像素，
   却既没有渐隐也不接滚轮。组件自己量溢出，不溢出的宽度上登记等于空转，所以按可能
   溢出的层登记，不按某一个断点登记。React 档的页面自己用 `overflow-x-auto`，不进这份清单。 */
const BOARD_EDGE_SCROLLERS='.reviewtabs,.ftablewrap,.board-local-nav,[data-manage-menu],'
  +'.follow-workspace-switch,.fmanagenav';

/** 把这一批 DOM 里所有该有覆盖式滚动条的容器接上；重复调用只接新出现的那些。 */
export function wireOverlayScrollbars(root=document){
  root.querySelectorAll(OVERLAY_SCROLLERS).forEach(el=>{
    if(el.matches(BOARD_EDGE_SCROLLERS)){
      wireHorizontalScroller(el);return;
    }
    attachOverlayScrollbar(el);
  });
}

/**
 * Geist Switch：2–3 个互斥视图用共享 name 的一组 radio，不用 Toggle。
 *
 * JAV 卡片版式和关注列表版式是同一个控件——只有 name、选项和当前值不同，所以模板
 * 与 `.iconswitch` 样式共用一份；调用方各自的摆放位置仍由自己的类负责。
 */
export function iconSwitchHtml(name,legend,options,current,{attr='',className='',text=false}={}){
  const items=options.map(([value,label,symbol])=>
    `<label title="${esc(label)}"><input type="radio" name="${esc(name)}" value="${esc(value)}" ${attr}
      ${value===current?'checked':''}><span aria-hidden="true">${text?(symbol?icon(symbol):'')+esc(label):icon(symbol)}</span><span class="sr-only">${esc(label)}</span></label>`).join('');
  return `<fieldset class="iconswitch${className?` ${esc(className)}`:''}"><legend class="sr-only">${esc(legend)}</legend>${items}</fieldset>`;
}

/** 把一组 iconSwitchHtml 画出来的 radio 接到 apply(value) 上。 */
export function wireIconSwitch(root,attr,apply){
  root?.querySelectorAll(`[${attr}]`).forEach(input=>{
    input.onchange=()=>{if(input.checked)apply(input.value)};
  });
}

/* 自绘单值拉条。原生 `input[type=range]` 的轨道、抓手和刻度分散在三套带厂商前缀的伪
   元素里，拿不到当前值也接不上悬停才显形的刻度；换成一个 `role="slider"` 的容器之后，
   几何、状态和键盘全在一处。形状取自 feralui.dev/gradients 的 `.dial-slider`，实测记在
   `docs/reference-snapshots/feralui-studio-boardui-accent-measured.md`：30px 高、20px 轨道、
   每 10% 一根刻度、3×20px 的圆头抓手，刻度与抓手默认透明，悬停或拖动时才出现。
   颜色一律由 `--ink` 经 color-mix 得到，焦点环仍走站内的 `--tungsten`。
   当前位置写成 `--dial-at` 交给 CSS：填充宽度和抓手位置是同一个数，分两处写就会错开。 */
const DIAL_TICKS=9;
export function dialSliderHtml({value=0,min=0,max=100,step=1,label='',suffix='%',attr='',className=''}={}){
  const at=max>min?(value-min)/(max-min)*100:0;
  const text=`${value}${suffix}`;
  return `<div class="dial${className?` ${esc(className)}`:''}" ${attr}>
    <div class="dial-slider" data-dial-slider role="slider" tabindex="0" aria-label="${esc(label)}"
      aria-valuemin="${min}" aria-valuemax="${max}" aria-valuenow="${value}" aria-valuetext="${esc(text)}"
      data-dial-step="${step}" style="--dial-at:${at}%">
      <span class="dial-track" aria-hidden="true"><span class="dial-fill"></span></span>
      <span class="dial-ticks" aria-hidden="true">${'<span></span>'.repeat(DIAL_TICKS)}</span>
      <span class="dial-handle" aria-hidden="true"></span>
    </div><b class="dial-value mono" data-dial-value>${esc(text)}</b></div>`;
}

/**
 * 接上 dialSliderHtml 画出来的一条拉条。
 *
 * `onInput` 在拖动和键盘的每一步都发，调用方自己合并到一帧里；`onChange` 只在松手、
 * 键盘落键和触摸取消时发一次，落盘归它。两者分开是这条拉条唯一的性能约定：拖动中
 * 每一步都写 localStorage 的话，一次 60 步的拖动就是 60 次同步序列化。
 */
export function wireDialSlider(root,{onInput=()=>{},onChange=()=>{},suffix='%'}={}){
  const slider=root.querySelector('[data-dial-slider]'),readout=root.querySelector('[data-dial-value]');
  const track=root.querySelector('.dial-track');
  const min=+slider.getAttribute('aria-valuemin'),max=+slider.getAttribute('aria-valuemax');
  const step=+slider.dataset.dialStep||1;
  let value=+slider.getAttribute('aria-valuenow');
  const clamp=raw=>Math.min(max,Math.max(min,Math.round(raw/step)*step));
  const paint=()=>{
    const text=`${value}${suffix}`;
    slider.style.setProperty('--dial-at',`${max>min?(value-min)/(max-min)*100:0}%`);
    slider.setAttribute('aria-valuenow',String(value));
    slider.setAttribute('aria-valuetext',text);
    if(readout)readout.textContent=text;
  };
  const set=(raw,notify)=>{
    const next=clamp(raw);
    if(next===value)return false;
    value=next;paint();if(notify)onInput(value);return true;
  };
  /* 轨道几何在按下那一刻量一次就够，之后每次 pointermove 都读缓存。指针捕获期间这条
     轨道不会跑，而 `getBoundingClientRect()` 会强制同步一次样式与布局——放在每一个
     pointermove 里，一次拖动就是上百次强制布局，实测占掉这条链路一大半时间。 */
  let trackBox=null;
  const fromPointer=event=>{
    const rect=trackBox||track.getBoundingClientRect();
    const ratio=rect.width?(event.clientX-rect.left)/rect.width:0;
    set(min+(max-min)*Math.min(1,Math.max(0,ratio)),true);
  };
  slider.addEventListener('pointerdown',event=>{
    if(event.pointerType==='mouse'&&event.button!==0)return;
    event.preventDefault();slider.focus();
    trackBox=track.getBoundingClientRect();
    slider.dataset.dragging='true';
    /* 指针捕获拿不到就算了：一次合成出来的 pointerdown（自动化、辅助技术）带的 id
       不对应任何活动指针，`setPointerCapture` 会抛，抛出去整条拖动就断在第一步。 */
    try{slider.setPointerCapture(event.pointerId)}catch(_e){}
    fromPointer(event);
  });
  slider.addEventListener('pointermove',event=>{if(slider.dataset.dragging==='true')fromPointer(event)});
  const release=event=>{
    if(slider.dataset.dragging!=='true')return;
    delete slider.dataset.dragging;trackBox=null;
    try{if(slider.hasPointerCapture(event.pointerId))slider.releasePointerCapture(event.pointerId)}catch(_e){}
    onChange(value);
  };
  slider.addEventListener('pointerup',release);
  slider.addEventListener('pointercancel',release);
  /* 键盘一档就是一个 step，按住 Shift 走 10。Home／End 直接到两端：一条 0–100 的拉条
     用方向键从一头走到另一头要按一百下，那不叫可用。 */
  slider.addEventListener('keydown',event=>{
    const span=event.shiftKey?10:step;
    const moves={ArrowLeft:-span,ArrowDown:-span,ArrowRight:span,ArrowUp:span};
    let next=null;
    if(event.key in moves)next=value+moves[event.key];
    else if(event.key==='Home')next=min;
    else if(event.key==='End')next=max;
    if(next===null)return;
    event.preventDefault();
    if(set(next,true))onChange(value);
  });
  return {get value(){return value},set(next){set(next,false)}};
}

/**
 * 共用勾选框。原生 checkbox 在暗色下由浏览器自绘，跟站内别的控件不是同一套语言；
 * `accent-color` 也只能改选中色，未选中态连悬停反馈都给不了。所以自绘一份，关注
 * 列表、来源筛选、候选清单、标签匹配和设置项共用它。
 */
export function badgeHtml(text){return `<span class="geist-badge">${esc(text)}</span>`}

export function checkboxHtml(inputAttrs=''){
  return `<span class="pcheck"><input type="checkbox" ${inputAttrs}><span aria-hidden="true">${icon('check')}</span></span>`;
}

/** 复杂补充信息复用顶层浮层和视口避让，正文可聚焦并独立滚动。 */
export function wireContextCard(mount,trigger,panel){
  panel.classList.add('context-card');panel.setAttribute('popover','manual');
  panel.setAttribute('role','dialog');panel.tabIndex=-1;
  trigger.setAttribute('aria-haspopup','dialog');trigger.setAttribute('aria-controls',panel.id);
  const floating=wireAnchoredMenu(mount,trigger,panel);
  let timer;
  const hide=()=>{clearTimeout(timer);floating.setOpen(false)};
  const enter=()=>{clearTimeout(timer);timer=setTimeout(()=>{if(trigger.isConnected)floating.setOpen(true)},150)};
  const leave=()=>{clearTimeout(timer);timer=setTimeout(()=>{if(!panel.matches(':hover')&&!trigger.matches(':hover')&&!panel.contains(document.activeElement)&&document.activeElement!==trigger)hide()},150)};
  trigger.addEventListener('pointerenter',enter);trigger.addEventListener('pointerleave',leave);
  panel.addEventListener('pointerenter',()=>clearTimeout(timer));panel.addEventListener('pointerleave',leave);
  trigger.addEventListener('focus',enter);trigger.addEventListener('blur',leave);
  trigger.addEventListener('click',()=>clearTimeout(timer));
  mount.addEventListener('keydown',event=>{if(event.key==='Escape')hide()});
  panel.addEventListener('focusout',leave);
  trigger.addEventListener('keydown',event=>{if(event.key==='ArrowDown'&&floating.isOpen()){event.preventDefault();(panel.querySelector('a,button,[tabindex="0"]')||panel).focus()}});
  return {...floating,hide};
}

/* 拖动排序：一列带 key 的行，拖到哪一行的上半截或下半截就插到那里。

   站内此前有两份几乎一样的实现（侧栏顺序、导航按钮），第三处再抄一遍，落点判据、
   拖动中的减淡和那条插入线就会各演化一份。这里只收「一列行」这一种：拖动中的行加
   `dragging`，落点行加 `drop-before` / `drop-after`，样式由调用方那一侧的类名给。

   `onMove(key,target,after)` 拿到的是两个 key 和一个方位，重排由调用方自己做——
   顺序存在哪、存完刷什么，各处本来就不一样。 */
export function wireDragReorder(root,{selector,attribute,onMove}={}){
  const rows=()=>[...root.querySelectorAll(selector)];
  const clear=()=>rows().forEach(row=>row.classList.remove('dragging','drop-before','drop-after'));
  let dragging=null;
  rows().forEach(row=>{
    const key=row.getAttribute(attribute);
    row.draggable=true;
    row.addEventListener('dragstart',event=>{
      dragging=key;row.classList.add('dragging');
      event.dataTransfer.effectAllowed='move';
      // 不写 dataTransfer 的话 Firefox 根本不认这是一次拖动；首页那一项的 key 是空串，
      // 空串等于没写，所以给它一个占位。落点判据只看 key 本身，不看这里写的字。
      event.dataTransfer.setData('text/plain',key||'peach-row');
    });
    row.addEventListener('dragover',event=>{
      if(dragging===null||dragging===key)return;
      event.preventDefault();event.dataTransfer.dropEffect='move';
      const after=event.clientY>row.getBoundingClientRect().top+row.offsetHeight/2;
      rows().forEach(item=>item.classList.remove('drop-before','drop-after'));
      row.classList.add(after?'drop-after':'drop-before');
    });
    row.addEventListener('drop',event=>{
      event.preventDefault();
      const after=row.classList.contains('drop-after'),from=dragging;
      dragging=null;clear();
      if(from!==null&&from!==key)onMove(from,key,after);
    });
    row.addEventListener('dragend',()=>{dragging=null;clear()});
  });
}

/* Geist Modal 的另一种正文：要填的一份表单，而不是一句待确认的话。

   壳、遮罩、焦点陷阱、Escape 和关掉后把焦点还给触发钮全部来自 confirmModal 用的那身
   `.geist-modal`，两者的差别只有正文和主按钮做什么。所以弹层的几何只有一处：标题
   20px/26px 的 h3、正文 20px 内边距、操作条粘在底两端对齐、主按钮在右下角。

   返回值里的 `dialog` 交给调用方接自己的行事件，`done` 在弹层关掉时兑现。 */
let formModalSeq=0;
export function formModal({title,description='',body='',confirmLabel,cancelLabel='取消',
                           onConfirm=null,confirmDisabled=false}={}){
  const trigger=document.activeElement;
  const dialog=document.createElement('dialog');
  dialog.className='geist-modal';
  const titleId=`geist-form-title-${++formModalSeq}`;
  dialog.setAttribute('aria-labelledby',titleId);
  dialog.innerHTML=`<form class="geist-modal-form" novalidate>
      <div class="geist-modal-body"><h3 id="${titleId}"></h3>${description?'<p></p>':''}
        <div class="geist-modal-fields">${body}</div><div data-modal-error></div></div>
      <footer class="geist-modal-footer">
        <div><button type="button" class="geist-button" data-modal-cancel></button></div>
        <div><button type="submit" class="geist-button primary" data-modal-confirm></button></div>
      </footer></form>`;
  dialog.querySelector('h3').textContent=title;
  if(description)dialog.querySelector('.geist-modal-body p').textContent=description;
  const cancel=dialog.querySelector('[data-modal-cancel]');
  const accept=dialog.querySelector('[data-modal-confirm]');
  const failure=dialog.querySelector('[data-modal-error]');
  cancel.textContent=cancelLabel;
  accept.textContent=confirmLabel;
  accept.disabled=!!confirmDisabled;
  document.body.append(dialog);
  let settled=null,busy=false;
  const done=new Promise(resolve=>dialog.addEventListener('close',()=>{
    dialog.remove();
    if(trigger instanceof HTMLElement&&trigger.isConnected)trigger.focus();
    resolve(settled||{confirmed:false});
  },{once:true}));
  cancel.onclick=()=>{if(!busy)dialog.close()};
  dialog.addEventListener('cancel',event=>{if(busy)event.preventDefault()});
  // 遮罩上的点击落在 <dialog> 自己身上；这里没有不可逆的动作，允许点外面关掉。
  dialog.addEventListener('click',event=>{if(event.target===dialog&&!busy)dialog.close()});
  dialog.querySelector('form').onsubmit=async event=>{
    event.preventDefault();
    if(busy||accept.disabled)return;
    if(!onConfirm){settled={confirmed:true};dialog.close();return}
    failure.innerHTML='';busy=true;setActionBusy(accept);
    try{
      settled={confirmed:true,result:await onConfirm()};
      dialog.close();
    }catch(error){
      failure.innerHTML=noteHtml(error.message||'操作未完成',{variant:'error'});
      setActionBusy(accept,false);
    }finally{busy=false}
  };
  dialog.showModal();
  playUiSound('pop');
  (dialog.querySelector('.geist-modal-fields input:not([type="checkbox"])')||accept).focus();
  return {dialog,confirmButton:accept,done,close:()=>dialog.close()};
}

/* Geist Modal：一次写操作落库前的确认。

   实测 https://vercel.com/geist/modal（2026-09-04）：卡片 540px 宽、12px 圆角、窄屏两侧
   各留 10px，正文 20px 内边距、14px/20px，标题是 20px/26px 的 600 字重 h3，底部操作条
   12px 内边距、粘在底、两端对齐，按钮 32px 高、6px 圆角、14px/500，遮罩纯黑不带模糊。
   标题写成陈述句而不是问句；主按钮是与标题同一个动词的「动词+名词」，取消键就写「取消」；
   成功后的 Toast 与主按钮共用那个动词。

   用原生 <dialog> 承载：焦点陷阱、Escape、背景 inert 和关掉后把焦点还给触发钮都由它给，
   自己搭一遍只会少掉其中一两样。onConfirm 失败时弹层不关，原因留在原位等重试。 */
let modalSeq=0;
export function confirmModal({title,body,confirmLabel,cancelLabel='取消',onConfirm=null,danger=false}={}){
  const trigger=document.activeElement;
  const dialog=document.createElement('dialog');
  dialog.className='geist-modal';
  const titleId=`geist-modal-title-${++modalSeq}`;
  dialog.setAttribute('aria-labelledby',titleId);
  dialog.innerHTML=`<div class="geist-modal-body">
      <h3 id="${titleId}"></h3><p></p><div data-modal-error></div></div>
    <footer class="geist-modal-footer">
      <div><button type="button" class="geist-button" data-modal-cancel></button></div>
      <div><button type="button" class="geist-button primary" data-modal-confirm></button></div>
    </footer>`;
  dialog.querySelector('h3').textContent=title;
  dialog.querySelector('.geist-modal-body p').textContent=body;
  const cancel=dialog.querySelector('[data-modal-cancel]');
  const accept=dialog.querySelector('[data-modal-confirm]');
  if(danger){accept.classList.remove('primary');accept.classList.add('danger')}
  const failure=dialog.querySelector('[data-modal-error]');
  cancel.textContent=cancelLabel;
  accept.textContent=confirmLabel;
  document.body.append(dialog);
  return new Promise(resolve=>{
    let settled=null;
    let busy=false;
    dialog.addEventListener('close',()=>{
      dialog.remove();
      if(trigger instanceof HTMLElement&&trigger.isConnected)trigger.focus();
      resolve(settled||{confirmed:false});
    },{once:true});
    cancel.onclick=()=>{if(!busy)dialog.close()};
    dialog.addEventListener('cancel',event=>{if(busy)event.preventDefault()});
    /* 遮罩上的点击落在 <dialog> 自己身上，卡片里的落在子元素上。这个动作可撤销，
       按 Geist 的判据允许点外面关掉。 */
    dialog.addEventListener('click',event=>{if(event.target===dialog&&!busy&&!danger)dialog.close()});
    accept.onclick=async()=>{
      if(busy)return;
      if(!onConfirm){settled={confirmed:true};dialog.close();return}
      failure.innerHTML='';
      busy=true;
      setActionBusy(accept);
      try{
        settled={confirmed:true,result:await onConfirm()};
        dialog.close();
      }catch(error){
        failure.innerHTML=noteHtml(error.message||'操作未完成',{variant:'error'});
        setActionBusy(accept,false);
      }finally{busy=false}
    };
    dialog.showModal();
    playUiSound('pop');
    (danger?cancel:accept).focus();
  });
}

/* ── 安装后教程的状态 ──
   教程本身还画在遗留层（迁往 React 的待办在 `docs/PRODUCT_BACKLOG.md`），但「做到哪了」
   不属于渲染：清单做完这件事跟着账本走（`/api/settings` 的 `postSetupTutorialDone`），
   换台设备打开不会又被教一遍；折叠和逐项跳过是当下这块屏幕的摆法，留在本地。
   三个键、签名和请求代际都收在这里，装配那一侧只管把它们接到 DOM 上。 */
export const POST_SETUP_TUTORIAL_KEY='peach.post-setup-tutorial.v1';
export const POST_SETUP_TUTORIAL_COLLAPSED_KEY='peach.post-setup-tutorial-collapsed.v1';
export const POST_SETUP_TUTORIAL_SKIPPED_KEY='peach.post-setup-tutorial-skipped.v1';

const readStored=key=>{try{return localStorage.getItem(key)}catch(_error){return null}};
const writeStored=(key,value)=>{try{localStorage.setItem(key,value)}catch(_error){}};

export const postSetupTutorialMarker=()=>readStored(POST_SETUP_TUTORIAL_KEY)||'';
export const setPostSetupTutorialMarker=value=>writeStored(POST_SETUP_TUTORIAL_KEY,value);
export const postSetupTutorialCollapsed=()=>readStored(POST_SETUP_TUTORIAL_COLLAPSED_KEY)==='1';
export const setPostSetupTutorialCollapsed=value=>
  writeStored(POST_SETUP_TUTORIAL_COLLAPSED_KEY,value?'1':'0');
export const postSetupTutorialSkipped=()=>{
  try{
    const parsed=JSON.parse(readStored(POST_SETUP_TUTORIAL_SKIPPED_KEY)||'[]');
    return new Set(Array.isArray(parsed)?parsed.filter(key=>typeof key==='string'):[]);
  }catch(_error){return new Set()}
};
export const setPostSetupTutorialSkipped=values=>
  writeStored(POST_SETUP_TUTORIAL_SKIPPED_KEY,JSON.stringify([...values]));

/* 重绘的判据：清单里每一项的文字、目标和完成与否。只要这一串没变，页面上那张卡就
   还是对的，重画一次只会打断正在读它的人和刚点开的折叠。 */
export const postSetupTutorialSignature=tasks=>JSON.stringify(
  tasks.map(task=>[task.key,task.done,task.label,task.description,task.href]));

/* 请求代际：教程跟着每次路由切换重新取数，慢的那一发回来时页面可能已经换了。 */
let postSetupTutorialRequest=0;
export const nextPostSetupTutorialRequest=()=>++postSetupTutorialRequest;
export const isCurrentPostSetupTutorialRequest=request=>request===postSetupTutorialRequest;

/** 重新打开教程：清掉跳过与折叠，本地标记回到未完成，由调用方负责服务端那一半。 */
export function resetPostSetupTutorialState(){
  setPostSetupTutorialSkipped(new Set());
  setPostSetupTutorialCollapsed(false);
  setPostSetupTutorialMarker('pending');
}
