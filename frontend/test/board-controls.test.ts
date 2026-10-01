import { describe,it,expect } from 'vitest';
import { syncBoardRange, wireBoardSegments, wireBoardTabs } from '../src/board-controls';

describe('范围控件',()=>{
  it('视图切换保留原生 radio 且重复接线只创建一个滑块',()=>{
    document.body.innerHTML='<div class="iconswitch"><label><input type="radio" name="view" value="large" checked>大图</label><label><input type="radio" name="view" value="small">小图</label></div>';
    wireBoardSegments(document);wireBoardSegments(document);
    expect(document.querySelectorAll('.board-segment-thumb')).toHaveLength(1);
    const inputs=[...document.querySelectorAll<HTMLInputElement>('input')];
    inputs[1]!.click();
    expect(inputs[0]!.checked).toBe(false);expect(inputs[1]!.checked).toBe(true);
    expect(document.querySelector('.board-segment-thumb')?.getAttribute('aria-hidden')).toBe('true');
  });
  it('口味页的证据切换也是分段控件，拿到同一枚滑块',()=>{
    document.body.innerHTML='<div class="insightswitch" role="radiogroup"><label><input type="radio" name="e" value="browser" checked><span>浏览器记录</span></label><label><input type="radio" name="e" value="peach"><span>Peach 内部</span></label></div>';
    wireBoardSegments(document);wireBoardSegments(document);
    expect(document.querySelectorAll('.insightswitch .board-segment-thumb')).toHaveLength(1);
    expect(document.querySelector('.insightswitch')?.getAttribute('data-board-segments')).toBe('true');
  });
  it('管理导航接上会滑的指示条，复核和配置分类用 Pills',()=>{
    document.body.innerHTML='<div class="reviewtabs" role="tablist"><button role="tab" aria-selected="true">元数据字段</button><button role="tab" aria-selected="false">厂牌 Logo</button></div><div class="managebar"><div class="managebar-menu"><button aria-pressed="true">统计</button></div></div>';
    const config=document.createElement('div');config.className='board-local-nav';config.dataset.sectionNav='';
    document.body.append(config);
    wireBoardTabs(document);wireBoardTabs(document);
    expect([...document.querySelectorAll('[data-board-tabs]')].map(group=>group.className)).toEqual(['managebar-menu']);
  });
  it('范围输入把当前值换算成轨道百分比写进样式变量',()=>{
    document.body.innerHTML='<input type="range" min="0" max="180" value="45">';
    const input=document.querySelector('input')!;syncBoardRange(input);
    expect(input.style.getPropertyValue('--board-range-value')).toBe('25%');
    input.value='180';syncBoardRange(input);
    expect(input.style.getPropertyValue('--board-range-value')).toBe('100%');
  });
});
