/* 批量条岛：四种语境下列哪几颗键、计数、选空时收起，以及点下去回到壳的哪条流程。
 *
 * 浮条的玻璃、位置与窄屏三列栅格要量布局，由 e2e 在浏览器里走（`e2e/design.test.ts`）。 */
import { act } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { batchActions, type BatchDockApi, type BatchDockHost, type BatchDockProps } from '../../src/react/batch-dock/batch-dock-api';
import { configureBatchDock } from '../../src/react/batch-dock/batch-dock-island';
import { click, settle } from './render';

function setup() {
  const root = document.createElement('div');
  root.setAttribute('data-batch-dock', '');
  document.body.append(root);
  const host: BatchDockHost = { root, run: vi.fn() };
  let api!: BatchDockApi;
  act(() => { api = configureBatchDock(host) });
  const render = async (props: BatchDockProps) => { act(() => api.render(props)); await settle() };
  return { root, host, render };
}

const labels = (root: ParentNode) => [...root.querySelectorAll('[data-selection-dock] button')].map((node) => node.textContent?.trim());

beforeEach(() => { document.body.replaceChildren() });

describe('每种语境的键', () => {
  it('从左到右的顺序，「取消」总在最后，危险操作只有移出与彻底删除', () => {
    const shape = (context: Parameters<typeof batchActions>[0], dismissed = false) =>
      batchActions(context, dismissed).map((action) => `${action.label}${action.danger ? '!' : ''}`);
    expect(shape('catalog')).toEqual(['喜欢', '看过', '稍后看', '判定产地', '移入回收站!', '取消']);
    expect(shape('trash')).toEqual(['还原', '彻底删除!', '取消']);
    expect(shape('junk')).toEqual(['不是垃圾', '移入回收站!', '取消']);
    expect(shape('junk', true)).toEqual(['重新判断', '移入回收站!', '取消']);
    expect(shape('follow')).toEqual(['保存到账本', '标记已看', '忽略', '取消']);
  });

  it('「忽略」用划掉的眼睛，不借「取消」那枚叉', () => {
    const glyph = (operation: string) => batchActions('follow').find((action) => action.operation === operation)!.glyph;
    expect([glyph('ignored'), glyph('clear')]).toEqual(['eye-off', 'x']);
  });
});

describe('浮条', () => {
  it('没选中时不画，选中后显示计数与这一语境的键，换语境当场换键', async () => {
    const { root, render } = setup();
    expect(root.querySelector('[data-selection-dock]')).toBeNull();
    await render({ count: 2, context: 'trash', junkDismissed: false });
    const dock = root.querySelector('[data-selection-dock]')!;
    expect(dock.getAttribute('aria-label')).toBe('所选项目操作');
    expect(dock.querySelector('[role="status"]')!.textContent).toBe('已选 2 项');
    expect(labels(root)).toEqual(['还原', '彻底删除', '取消']);
    await render({ count: 3, context: 'junk', junkDismissed: true });
    expect(root.querySelector('[data-selection-dock] [role="status"]')!.textContent).toBe('已选 3 项');
    expect(labels(root)).toEqual(['重新判断', '移入回收站', '取消']);
    expect(root.querySelector('[data-batch-scope]')!.getAttribute('data-context')).toBe('junk');
  });

  it('危险键挂 data-danger 读全站那份红，每颗键带自己的 sprite 字形', async () => {
    const { root, render } = setup();
    await render({ count: 2, context: 'catalog', junkDismissed: false });
    const keys = [...root.querySelectorAll<HTMLButtonElement>('[data-selection-dock] button')];
    expect(keys.filter((key) => key.hasAttribute('data-danger')).map((key) => key.dataset.batchAction)).toEqual(['dispose']);
    expect(keys.map((key) => key.querySelector('use')?.getAttribute('href')))
      .toEqual(['#i-thumbs-up', '#i-eye', '#i-bookmark-plus', '#i-globe', '#i-trash', '#i-x']);
  });

  it('点一颗键把分组、操作与这颗键交回壳', async () => {
    const { root, host, render } = setup();
    await render({ count: 1, context: 'catalog', junkDismissed: false });
    const region = root.querySelector<HTMLButtonElement>('[data-batch-action="region"]')!;
    await click(region);
    expect(host.run).toHaveBeenCalledWith('region', 'region', region);
    await click(root.querySelector('[data-batch-action="dispose"]'));
    expect(host.run).toHaveBeenLastCalledWith('batch', 'dispose', expect.any(HTMLButtonElement));
    await click(root.querySelector('[data-batch-group="clear"]'));
    expect(host.run).toHaveBeenLastCalledWith('clear', 'clear', expect.any(HTMLButtonElement));
  });
});
