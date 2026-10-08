import assert from 'node:assert/strict';
import {after,before,describe,it} from 'node:test';
import type {Browser,Page} from 'playwright-core';
import {launch,requiredEnv,VIEWPORTS} from './harness.ts';

const FRAMES='#grid [data-media-grid] > [data-media-card] [data-media-pic], #grid [data-mix-cover]';

/** 首页铺 20 张纯白预览图的作品，`size` 是首页版式。 */
async function openHome(page:Page,size:string){
 await page.addInitScript(size=>localStorage.setItem('peach.settings.v1',JSON.stringify({detailAutoplay:false,homeLayout:size})),size);
 await page.route('**/api/items?*',route=>route.fulfill({json:{items:Array.from({length:20},(_,i)=>({
  id:91000+i,name:`示例作品 ${i}`,creator:'示例创作者',is_jav:i%2===0,has_thumb:true,has_cover:false,
  width:1600,height:900,location:'local',duration:120,
 })),total:20,has_more:false}}));
 await page.route('**/poster?*',route=>route.fulfill({contentType:'image/svg+xml',body:'<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900"><rect width="1600" height="900" fill="white"/></svg>'}));
 await page.goto(requiredEnv('PEACH_E2E_ORIGIN')+'/',{waitUntil:'load'});
 await page.locator('#grid [data-mix-card]').waitFor();
}

/** 截图里一块的最暗通道值，用页面自己的 canvas 解码 PNG。 */
async function darkest(page:Page,clip:{x:number,y:number,width:number,height:number}){
 const png=(await page.screenshot({clip})).toString('base64');
 return page.evaluate(async png=>{
  const img=new Image();
  img.src=`data:image/png;base64,${png}`;
  await img.decode();
  const canvas=document.createElement('canvas');
  canvas.width=img.width;canvas.height=img.height;
  const context=canvas.getContext('2d')!;
  context.drawImage(img,0,0);
  const data=context.getImageData(0,0,canvas.width,canvas.height).data;
  let min=255;
  for(let i=0;i<data.length;i+=4)min=Math.min(min,data[i],data[i+1],data[i+2]);
  return min;
 },png);
}

describe('混排作品的画面框',()=>{
 let browser:Browser;
 before(async()=>{browser=await launch()});
 after(async()=>{await browser?.close()});
 for(const viewport of VIEWPORTS)for(const size of ['big','small']){
  it(`${viewport.name} ${size} 作品与 Mix 等高并保留横图`,async()=>{
   const context=await browser.newContext({viewport:{width:viewport.width,height:viewport.height}});
   try{
    const page=await context.newPage();
    await openHome(page,size);
    const frames=await page.locator(FRAMES).evaluateAll(nodes=>nodes.map(node=>{
     const box=node.getBoundingClientRect(),img=node.querySelector('img')!;
     return {ratio:box.width/box.height,fit:getComputedStyle(img).objectFit,background:getComputedStyle(img).backgroundColor};
    }));
    assert.ok(frames.length>=20);
    for(const frame of frames){
     assert.ok(Math.abs(frame.ratio-(size==='big'?3/4:16/9))<.01,JSON.stringify(frame));
     assert.equal(frame.fit,'contain');
     assert.equal(frame.background,'rgb(0, 0, 0)');
    }
   }finally{await context.close()}
  });
 }
 /* 白图铺满 16:9 格子、浅色页面：四角的抗锯齿只该在白图和浅色页面之间过渡。格子里垫的黑若被逐层按圆角
  * 裁，角上会压出 150–190 的灰黑点。每角只量贴角 6px 见方的一块，圆弧中段在里面，角标都离边更远。 */
 for(const scale of [1,2]){
  it(`浅色页面上白封面的四个圆角不透黑（${scale} 倍像素）`,async()=>{
   const context=await browser.newContext({viewport:{width:1280,height:800},deviceScaleFactor:scale,colorScheme:'light'});
   try{
    const page=await context.newPage();
    await openHome(page,'small');
    await page.evaluate(()=>{document.documentElement.dataset.theme='light';document.documentElement.classList.remove('dark')});
    const corners=[];
    for(const frame of ['#grid [data-media-grid] > [data-media-card] [data-media-pic]','#grid [data-mix-cover]']){
     // 这一格滚到吸顶的顶栏与排序条下面，等它的图到货；角内侧那一点打到的得是这张卡自己，没被别的东西压着。
     const box=await page.locator(frame).first().evaluate(async node=>{
      scrollBy(0,node.getBoundingClientRect().top-240);
      const img=node.querySelector('img')!;
      if(!img.complete)await new Promise(done=>img.addEventListener('load',done,{once:true}));
      await new Promise(requestAnimationFrame);
      const box=node.getBoundingClientRect(),card=node.closest('[data-media-card],[data-mix-card]');
      const covers=[[box.left+8,box.top+8],[box.right-8,box.top+8],[box.left+8,box.bottom-8],[box.right-8,box.bottom-8]]
       .map(([x,y])=>document.elementFromPoint(x,y)).filter(hit=>!hit||!card?.contains(hit))
       .map(hit=>hit?`${hit.tagName} ${[...hit.attributes].map(a=>a.name).join(' ')}`:'视口外');
      return {...box.toJSON(),covers};
     });
     assert.ok(!box.covers.length&&box.bottom<=800,`${frame} 的四角没有露出来：${JSON.stringify(box)}`);
     await page.mouse.move(0,0);
     for(const [x,y] of [[box.left,box.top],[box.right-6,box.top],[box.left,box.bottom-6],[box.right-6,box.bottom-6]]){
      corners.push({frame,x:Math.round(x),y:Math.round(y),min:await darkest(page,{x,y,width:6,height:6})});
     }
    }
    // 高分屏的像素对齐和抗锯齿允许浅灰边缘；灰黑渗透的 150–190 区间必须失败。
    const dark=corners.filter(corner=>corner.min<230);
    assert.deepEqual(dark,[],`${corners.length} 个角里有 ${dark.length} 个透出了黑`);
   }finally{await context.close()}
  });
 }
 /* 大图档一格的模块宽 336px，比 320 的手机屏还宽：网格的最小列宽要让给视口，整张卡留在屏内。 */
 for(const size of ['big','small']){
  it(`320 宽 ${size} 版式的卡片网格不越出视口`,async()=>{
   const context=await browser.newContext({viewport:{width:320,height:640}});
   try{
    const page=await context.newPage();
    await openHome(page,size);
    const box=await page.locator('#grid [data-media-grid]').first().evaluate(node=>({
     right:Math.round(node.getBoundingClientRect().right),
     card:Math.round(node.querySelector('[data-media-card]')!.getBoundingClientRect().right),
     page:document.documentElement.scrollWidth,
     view:document.documentElement.clientWidth,
    }));
    assert.ok(box.right<=box.view&&box.card<=box.view&&box.page<=box.view,JSON.stringify(box));
   }finally{await context.close()}
  });
 }
});
