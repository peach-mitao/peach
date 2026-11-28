import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import type { Browser } from 'playwright-core';
import { CONFIGURATION_ROUTE, launch, layout, settle, VIEWPORTS, visit } from './harness.ts';

/* 每个分区取一块不随本机配置出没的卡：骨架按终态结构画，随配置变的卡（下载渠道的「云下载」
   跟着媒体库里有没有网盘）照本机上次记下的结构画，新开的浏览器里没有记录，按最小结构画。 */
const sections = [
  ['library', '媒体库与入库', '媒体库与目录'], ['subscriptions', '来源与订阅', '作品资料站点'],
  ['downloads', '下载渠道', '浏览器添加 JAV'], ['network', '网络与访问', 'Peach 代理'],
  ['maintenance', '应用与维护', '开机自启'], ['diagnostics', '系统诊断', '库健康'],
] as const;

describe('等待反馈与文件夹模式', () => {
  let browser: Browser;
  before(async () => { browser = await launch() });
  after(async () => { await browser?.close() });
  it('反馈入口分别绘制半透明前景与底色，悬停和键盘聚焦时恢复实色', async () => {
    const viewport = VIEWPORTS.find(row => !row.mobile)!;
    const opened = await visit(browser, '/', viewport);
    try {
      const { page } = opened;
      const launcher = page.locator('[data-feedback-launcher] > button');
      await launcher.waitFor();
      const paint = () => launcher.evaluate(button => {
        const style = getComputedStyle(button);
        const context = document.createElement('canvas').getContext('2d')!;
        const alpha = (color: string) => {
          context.clearRect(0, 0, 1, 1);
          context.fillStyle = color;
          context.fillRect(0, 0, 1, 1);
          return context.getImageData(0, 0, 1, 1).data[3];
        };
        return { opacity: style.opacity, background: alpha(style.backgroundColor),
          text: alpha(getComputedStyle(button.querySelector('span')!).color),
          icon: alpha(getComputedStyle(button.querySelector('svg path')!).fill) };
      });
      const idle = await paint();
      assert.equal(idle.opacity, '1');
      assert.ok(idle.background > 0 && idle.background < idle.text && idle.text < 255);
      assert.equal(idle.text, idle.icon);
      const solid = { opacity: '1', background: 255, text: 255, icon: 255 };
      await launcher.hover();
      await launcher.evaluate(button => Promise.allSettled(button.getAnimations().map(animation => animation.finished)));
      assert.deepEqual(await paint(), solid);
      await page.mouse.move(0, 0);
      await page.keyboard.press('Tab');
      await launcher.focus();
      assert.equal(await launcher.evaluate(button => button.matches(':focus-visible')), true);
      await launcher.evaluate(button => Promise.allSettled(button.getAnimations().map(animation => animation.finished)));
      assert.deepEqual(await paint(), solid);
    } finally { await opened.close(); }
  });

  it('反馈访问受限时在填写前显示一条原因并禁用提交', async () => {
    const viewport = VIEWPORTS.find(row => !row.mobile)!;
    const opened = await visit(browser, '/', viewport, async page => {
      await page.route('**/api/app-feedback/{environment,diagnostics}', route => route.fulfill({
        status: 401, json: { message_code: 'api.feedback.accessRequired' },
      }));
    });
    try {
      const { page } = opened;
      await page.getByRole('button', { name: '反馈', exact: true }).click();
      const form = page.locator('[data-peach-feedback]');
      const reason = form.getByRole('note').getByText(/请在运行 Peach 的电脑上打开「反馈」/);
      await reason.waitFor();
      assert.equal(await reason.count(), 1);
      assert.equal(await form.getByText('未能读取诊断信息，可以手动补充。', { exact: true }).count(), 0);
      assert.equal(await form.locator('button[type=submit]').isDisabled(), true);
    } finally { await opened.close(); }
  });
  for (const viewport of VIEWPORTS) {
    it(`${viewport.name} 反馈表单滚动时标题和关闭按钮保持在顶部`, async () => {
      const opened = await visit(browser, '/settings/library', viewport, page => page.addInitScript(() => {
        navigator.mediaDevices.getDisplayMedia = () => Promise.reject(new DOMException('Cancelled', 'NotAllowedError'));
      }));
      try {
        const { page } = opened;
        await page.getByRole('button', { name: '反馈', exact: true }).click();
        const dialog = page.getByRole('dialog', { name: '发送反馈' });
        const title = dialog.getByRole('heading', { name: '发送反馈' });
        const close = dialog.getByRole('button', { name: '关闭', exact: true });
        const body = dialog.locator('[data-feedback-body]');
        await title.waitFor();
        await settle(page);
        await dialog.evaluate(async node => {
          const surface = node.closest('[data-modal-surface]')!;
          await Promise.allSettled(surface.getAnimations().map(animation => animation.finished));
        });
        const titleTop = (await title.boundingBox())!.y;
        const closeTop = (await close.boundingBox())!.y;
        const track = dialog.locator('form[data-peach-feedback] > [data-overlay-track="y"]:not([hidden])');
        await track.waitFor();
        const trackBox = (await track.boundingBox())!;
        const bodyBox = (await body.boundingBox())!;
        assert.ok(trackBox.y >= bodyBox.y && trackBox.y + trackBox.height <= bodyBox.y + bodyBox.height);
        const outerScroll = await dialog.evaluate(node => {
          node.scrollTop = node.scrollHeight;
          return node.scrollTop;
        });
        assert.equal(outerScroll, 0);
        const field = dialog.getByRole('textbox', { name: '标题' });
        const fieldTop = (await field.boundingBox())!.y;
        const scrolled = await body.evaluate(node => {
          node.scrollTop = node.scrollHeight;
          return node.scrollTop;
        });
        assert.ok(scrolled > 0);
        assert.ok((await field.boundingBox())!.y < fieldTop);
        assert.equal((await title.boundingBox())!.y, titleTop);
        assert.equal((await close.boundingBox())!.y, closeTop);
        await close.click();
        await dialog.waitFor({ state: 'hidden' });
      } finally { await opened.close(); }
    });

    for (const [key, name, title] of sections) it(`${viewport.name} ${name} 的首屏骨架保持分区与边界`, async () => {
      let release = () => {};
      const held = new Promise<void>(resolve => { release = resolve });
      const opened = await visit(browser, `/settings/${key}`, viewport, async page => {
        await page.route(CONFIGURATION_ROUTE, async route => { await held; await route.continue() });
      });
      try {
        const { page } = opened;
        const root = page.locator(`[data-skeleton="board/settings/${key}"]`);
        await root.waitFor();
        assert.equal((await root.locator('.ui-board-local-nav [aria-selected="true"]').innerText()).trim(), name);
        assert.ok(await root.locator(`[aria-label="${title}"]`).count());
        if (key !== 'library') assert.equal(await root.locator('[aria-label="媒体库与目录"]').count(), 0);
        if (key === 'library') assert.equal(await root.locator('[data-folder-row]').count(), 1);
        const geometry = await layout(page);
        assert.ok(geometry.scrollWidth <= geometry.viewportWidth, JSON.stringify(geometry));
        assert.deepEqual(geometry.offenders, []);
        release();
        await root.waitFor({ state: 'detached' });
        await settle(page);
        assert.deepEqual(opened.problems, []);
      } finally { release(); await opened.close() }
    });

    it(`${viewport.name} 文件夹等待态只在各自占位内显示微光`, async () => {
      let release = () => {};
      const held = new Promise<void>(resolve => { release = resolve });
      const opened = await visit(browser, '/?browse=folders', viewport, async page => {
        await page.route('**/api/folders?*', async route => { await held; await route.continue() });
      });
      try {
        const { page } = opened;
        await page.locator('#catalogFolderHeader [data-skeleton]').waitFor();
        if (!viewport.mobile) {
          const tree = page.locator('#catalogFoldersTree [aria-label="正在读取目录树"]');
          await tree.waitFor();
          assert.equal(await tree.locator(':scope > div').count(), 8);
          const bounds = await tree.boundingBox();
          assert.ok(bounds && bounds.width <= 224 && bounds.height < 350);
        }
        const spans = await page.locator('#catalogFolderHeader .skeleton-sheen').evaluateAll(nodes => nodes.map(node => {
          const css = getComputedStyle(node), pseudo = getComputedStyle(node, '::after');
          return { position: css.position, overflow: css.overflow, pseudo: pseudo.position, width: node.getBoundingClientRect().width };
        }));
        assert.equal(spans.length, 6);
        assert.ok(spans.every(row => row.position === 'relative' && row.overflow === 'hidden' && row.pseudo === 'absolute' && row.width > 0));
        release();
        await settle(page);
        assert.deepEqual((await layout(page)).offenders, []);
        assert.deepEqual(opened.problems, []);
      } finally { release(); await opened.close() }
    });

    it(`${viewport.name} 多个子文件夹可以展开和收起`, async () => {
      const opened = await visit(browser, '/?browse=folders', viewport, async page => {
        await page.route('**/api/folders?*', route => route.fulfill({ json: {
          roots: [], selected: null, ancestors: [], matches: [], conflicts: [], rule: null, rules: [], rules_revision: 1,
          children: Array.from({ length: 40 }, (_, i) => ({ id: `folder-${i}`, name: `目录 ${i}`, parent: null,
            path: `R:\\demo\\${i}`, location: 'local', root: 'root', has_children: false, files: 1, videos: 1 })),
        } }));
      });
      try {
        const { page } = opened;
        const group = page.locator('#catalogFolderHeader [aria-label="子文件夹"]');
        await group.waitFor();
        assert.equal(await group.getByRole('button').count(), 12);
        await page.getByRole('button', { name: '展开全部 40 个文件夹' }).click();
        assert.equal(await group.getByRole('button').count(), 40);
        const collapse = page.getByRole('button', { name: '收起文件夹' });
        assert.equal(await collapse.getAttribute('aria-expanded'), 'true');
        await collapse.click();
        assert.equal(await group.getByRole('button').count(), 12);
        await settle(page);
        assert.deepEqual((await layout(page)).offenders, []);
        assert.deepEqual(opened.problems, []);
      } finally { await opened.close() }
    });

    it(`${viewport.name} 文件夹滚动条内缩且各滚动位置均在面板内`, async () => {
      const opened = await visit(browser, '/?browse=folders', viewport, async page => {
        const roots = Array.from({ length: 50 }, (_, i) => ({ id: `root-${i}`, name: `媒体目录 ${i}`,
          parent: null, path: `R:\\demo\\${i}`, location: 'local', root: `root-${i}`,
          has_children: false, files: 1, videos: 1 }));
        await page.route('**/api/folders?*', route => route.fulfill({ json: {
          roots, children: [], selected: null, ancestors: [], matches: [], conflicts: [], rule: null, rules: [], rules_revision: 1,
        } }));
      });
      try {
        const { page } = opened;
        if (viewport.mobile) await page.getByRole('button', { name: '打开文件夹目录' }).click();
        const scroller = page.locator('[aria-label="文件夹导航"]:visible .folder-tree-scroller');
        await scroller.waitFor();
        await scroller.locator('..').locator('.ovtrack.ov-y').waitFor();
        for (const height of [160, 32]) {
          await scroller.evaluate((node, value) => { node.style.maxHeight = `${value}px` }, height);
          for (const fraction of [0, .5, 1]) {
            await scroller.evaluate((node, value) => { node.scrollTop = (node.scrollHeight - node.clientHeight) * value }, fraction);
            await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
            const bounds = await scroller.evaluate(node => {
              const box = node.getBoundingClientRect();
              const thumb = node.parentElement!.querySelector('.ovtrack.ov-y .ovthumb')!.getBoundingClientRect();
              return { right: box.right - thumb.right, top: thumb.top - box.top, bottom: box.bottom - thumb.bottom };
            });
            assert.ok(bounds.right >= 7, `滚动条贴近右框：${JSON.stringify(bounds)}`);
            assert.ok(bounds.top >= 7 && bounds.bottom >= 7, `滚动条越出上下内边距：${JSON.stringify(bounds)}`);
          }
        }
        assert.deepEqual(opened.problems, []);
      } finally { await opened.close() }
    });

    it(`${viewport.name} 资料页文件夹筛选保留人物范围`, async () => {
      let filtered = false;
      const opened = await visit(browser, '/performers/演示艺人?browse=folders', viewport, async page => {
        await page.route('**/api/entity?*', route => route.fulfill({ json: {
          id: 90001, kind: 'performer', canonical_name: '演示艺人', asset_count: 1, tags: [], links: [],
          related_performers: [], aliases: [], metadata: {}, entry_links: [], has_image: false,
        } }));
        await page.route('**/api/folders?*', route => route.fulfill({ json: {
          roots: [], selected: null, ancestors: [], matches: [], conflicts: [], rule: null, rules: [], rules_revision: 1,
          children: [{ id: 'folder-1', name: '示例文件夹', parent: null, path: 'R:\\demo', location: 'local', root: 'root', has_children: false, files: 1, videos: 1 }],
        } }));
        await page.route(/\/api\/items\?/, async route => {
          const query = new URL(route.request().url()).searchParams;
          if (query.has('folder')) filtered = query.get('folder') === 'folder-1' && query.get('performer') === '演示艺人';
          await route.fulfill({ json: { total: 1, items: [{ id: 1, name: '示例作品', medium: 'video', location: 'local', has_thumb: false }], has_more: false } });
        });
      });
      try {
        const { page } = opened;
        const toggle = page.getByRole('button', { name: '文件夹模式', exact: true });
        await toggle.waitFor();
        assert.equal(await toggle.getAttribute('aria-pressed'), 'true');
        await page.locator('[data-folder-header-host]').getByRole('button', { name: '示例文件夹' }).click();
        await page.waitForFunction(() => new URLSearchParams(location.search).get('folder') === 'folder-1');
        await settle(page);
        assert.equal(filtered, true);
        await toggle.click();
        await settle(page);
        assert.equal(await page.locator('[data-folder-workspace]').getAttribute('data-folder-browse'), null);
        assert.deepEqual((await layout(page)).offenders, []);
        assert.deepEqual(opened.problems, []);
      } finally { await opened.close() }
    });
  }
});
