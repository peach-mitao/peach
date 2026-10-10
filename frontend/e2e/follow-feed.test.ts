/* 关注页岛（`follow-feed`）在真浏览器里的行为：取样、筛选进地址栏、只有列表铺骨架、照片墙、
 * 续页、写操作、检查与往回抓的忙态、Shift 连选，以及进详情再回来。
 *
 * 桩数据与定种子见 `follow-fixture.ts`；关注来源的真实抓取一次都不发。 */
import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';

import type { Browser, Page } from 'playwright-core';

import { FIRST, MORE, openFollowFeed } from './follow-fixture.ts';
import { launch, layout, VIEWPORTS } from './harness.ts';

const DESKTOP = VIEWPORTS.find((viewport) => !viewport.mobile)!;
const MOBILE = VIEWPORTS.find((viewport) => viewport.mobile)!;
const CARDS = '[data-follow-list] > [data-follow-item]';

const authorOrder = (page: Page) => page.locator('button[data-follow-author]').evaluateAll((buttons) =>
  buttons.map((button) => (button as HTMLElement).dataset.followAuthor));
const cardIds = (page: Page) => page.locator(CARDS).evaluateAll((cards) =>
  cards.map((card) => Number((card as HTMLElement).dataset.followItem)));
/** 桩里的条目没有正片，详情的播放器拿到空响应会报一条 VIDEOJS 错误；这一条量的是列表，不算它。 */
const withoutPlayer = (problems: string[]) => problems.filter((line) => !line.includes('VIDEOJS'));
/** 等地址栏换到给定的查询串；岛只交 view，地址由壳写。 */
const searchIs = (page: Page, search: string) => page.waitForFunction(
  (wanted) => location.pathname === '/follow' && location.search === wanted, search, { timeout: 10_000 });

describe('关注页岛', () => {
  let browser: Browser;

  before(async () => {
    browser = await launch();
  });

  after(async () => {
    await browser.close();
  });

  for (const viewport of [DESKTOP, MOBILE]) {
    it(`${viewport.name} 已建档作者的头像与署名进入作者页，多位作者保持一排`, { timeout: 60_000 }, async () => {
      const opened = await openFollowFeed(browser, '/follow', viewport);
      try {
        const page = opened.page;
        const payload = await page.evaluate(async () => {
          const data = await (await fetch('/api/follow')).json();
          data.sources[0].entity_id = 90101;
          data.sources[0].entity_name = 'Kou';
          for (let at = 7; at <= 30; at++) {
            const name = `Creator ${at}`;
            data.sources.push({ ...data.sources[1], id: at, author_name: name, author_key: `name:creator-${at}` });
            data.facets.authors.push(`name:creator-${at}`);
          }
          return data;
        });
        await page.route((url) => url.pathname === '/api/follow' && !url.searchParams.has('item'),
          (route) => route.fulfill({ json: payload }));
        await page.route(/\/api\/entity\?/, (route) => route.fulfill({ json: {
          id: 90101, kind: 'creator', canonical_name: 'Kou', asset_count: 0, tags: [], links: [], metadata: {},
          aliases: [], related_performers: [], has_image: false, has_avatar: false, feed: null,
        } }));
        await page.route((url) => url.pathname === '/api/items', (route) =>
          route.fulfill({ json: { items: [], total: 0, has_more: false } }));
        await page.reload({ waitUntil: 'networkidle' });
        assert.equal(await page.getByRole('searchbox', { name: '搜索创作者' }).count(), 0);
        const author = page.locator('[data-follow-authors] a[data-follow-author="name:kou"]');
        assert.equal(await author.count(), 1);
        assert.equal(await author.getAttribute('href'), '/creators/Kou');
        assert.equal(await author.getAttribute('aria-pressed'), null);
        const card = page.locator('[data-follow-item="1000"]');
        assert.equal(await card.locator('a[data-follow-author]').getAttribute('href'), '/creators/Kou');
        assert.equal(await card.locator('a[data-follow-avatar]').getAttribute('href'), '/creators/Kou');
        await card.locator('a[data-follow-author]').click();
        await page.waitForURL('**/creators/Kou');
        assert.equal(await page.locator('#stage[open]').count(), 0);
        assert.deepEqual(opened.problems, []);
      } finally { await opened.close(); }
    });

    it(`${viewport.name} 筛选条件与卡片悬停面保持间距`, { timeout: 60_000 }, async () => {
      const opened = await openFollowFeed(browser, '/follow?tag=loop', viewport);
      try {
        const gap = await opened.page.evaluate(() => {
          const chip = document.querySelector('[data-follow-combo]')!.getBoundingClientRect();
          const card = document.querySelector('[data-follow-list] [data-media-card]')!.getBoundingClientRect();
          return card.top - chip.bottom - 8;
        });
        assert.ok(gap >= 16, `筛选条件距卡片悬停面只有 ${gap}px`);
        assert.deepEqual(opened.problems, []);
      } finally { await opened.close(); }
    });

    it(`${viewport.name} 筛选浮层恢复可见时两块玻璃自动落位`, { timeout: 60_000 }, async () => {
      const opened = await openFollowFeed(browser, '/follow', viewport);
      try {
        const page = opened.page;
        await page.locator('[data-follow-feed]').evaluate((node) => { (node as HTMLElement).style.display = 'none' });
        await page.waitForTimeout(100);
        await page.locator('[data-follow-feed]').evaluate((node) => {
          const media = node.querySelector<HTMLElement>('[data-entity-media]')!;
          media.style.gap = '24px';
          (node as HTMLElement).style.display = '';
        });
        await page.waitForTimeout(100);
        const pairs = await page.evaluate(() => [
          ['[data-view-glide=""]', '[data-follow-filter][aria-pressed="true"]'],
          ['[data-view-glide="round"]', '[data-media-view][aria-pressed="true"]'],
        ].map(([glass, key]) => {
          const host = document.querySelector('[data-follow-filter-glass]')!;
          const rect = (selector: string) => {
            const node = host.querySelector<HTMLElement>(selector)!;
            const box = node.getBoundingClientRect();
            return { hidden: node.hidden, left: box.left, top: box.top, width: box.width, height: box.height };
          };
          return { glass: rect(glass!), key: rect(key!) };
        }));
        for (const pair of pairs) {
          assert.equal(pair.glass.hidden, false);
          for (const side of ['left', 'top', 'width', 'height'] as const) {
            assert.ok(Math.abs(pair.glass[side] - pair.key[side]) <= 1, JSON.stringify(pair));
          }
        }
        const animations = await page.locator('[data-follow-filter-glass] [data-view-glide=""]').evaluate(async (node) => {
          node.animate([{ translate: '0px 0px' }, { translate: '100px 0px' }], { duration: 10_000 });
          window.dispatchEvent(new Event('resize'));
          await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
          return node.getAnimations().length;
        });
        assert.equal(animations, 0, '重新落位后仍有动画覆盖玻璃位置');
        assert.deepEqual(opened.problems, []);
      } finally { await opened.close(); }
    });
  }

  for (const viewport of [DESKTOP, MOBILE]) {
    it(`${viewport.name} 图片卡的键盘焦点环在封面裁切层之外`, { timeout: 60_000 }, async () => {
      const opened = await openFollowFeed(browser, '/follow?media=images', viewport,
        { settings: { followImagesOnly: true } });
      try {
        const page = opened.page;
        await page.keyboard.press('Tab');
        const card = page.locator(CARDS).first();
        await card.locator('[data-follow-open]').focus();
        const ring = await card.locator('[data-follow-open]').evaluate((element) => {
          const style = getComputedStyle(element);
          const parent = getComputedStyle(element.parentElement!);
          return { width: style.outlineWidth, offset: style.outlineOffset,
            radius: style.borderRadius, clip: parent.clipPath, overflow: parent.overflow };
        });
        assert.equal(ring.width, '2px');
        assert.equal(ring.offset, '2px');
        assert.notEqual(ring.radius, '0px');
        assert.equal(ring.clip, 'none');
        assert.equal(ring.overflow, 'visible');
        assert.deepEqual(opened.problems, []);
      } finally {
        await opened.close();
      }
    });

  }

  /** 图片视图里只留 5001 那一组，并把它报成三张图的合集：卡片右上角出合并计数。 */
  const openMixCard = async (viewport: typeof DESKTOP) => {
    const opened = await openFollowFeed(browser, '/follow?media=images', viewport, { settings: { followImagesOnly: false } });
    const page = opened.page;
    const payload = await page.evaluate(async () => {
      const list = await (await fetch('/api/follow?media=images')).json();
      const detail = await (await fetch('/api/follow?item=5001')).json();
      list.groups = detail.groups.map((group: Record<string, unknown>) => ({
        ...group, stack: { media: 3, kind: 'image', faces: [] },
      }));
      list.has_more = false;
      return list;
    });
    await page.route((url) => url.pathname === '/api/follow' && !url.searchParams.has('item'),
      (route) => route.fulfill({ json: payload }));
    await page.reload({ waitUntil: 'networkidle' });
    return opened;
  };

  it(`${MOBILE.name} 多图数量按钮可以打开详情`, { timeout: 60_000 }, async () => {
    const opened = await openMixCard(MOBILE);
    try {
      const page = opened.page;
      await page.locator('[data-follow-list] [data-follow-collection="5001"]').click();
      await page.waitForURL('**/follow/item/5001');
      await page.locator('#stage[open]').waitFor();
      assert.deepEqual(withoutPlayer(opened.problems), []);
    } finally {
      await opened.close();
    }
  });

  it(`${DESKTOP.name} 悬停与键盘聚焦时合并计数淡出，操作键占右上角`, { timeout: 60_000 }, async () => {
    const opened = await openMixCard(DESKTOP);
    try {
      const page = opened.page;
      const card = page.locator('[data-follow-list] [data-follow-item]').filter({
        has: page.locator('[data-follow-collection="5001"]') }).first();
      const read = () => card.evaluate(async (element) => {
        await new Promise((resolve) => setTimeout(resolve, 300));
        const collection = element.querySelector<HTMLElement>('[data-follow-collection]')!;
        const actions = element.querySelector<HTMLElement>('[data-follow-actions]')!;
        const pic = element.querySelector<HTMLElement>('[data-media-pic]')!.getBoundingClientRect();
        const box = collection.getBoundingClientRect();
        const keys = actions.getBoundingClientRect();
        const hit = document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2);
        return {
          collection: [getComputedStyle(collection).opacity, getComputedStyle(collection).visibility],
          actions: getComputedStyle(actions).opacity,
          hitCollection: hit?.closest('[data-follow-collection]') === collection,
          /* 计数与操作键都贴封面右上角那一格，上沿与右沿相对封面格的偏移。 */
          collectionCorner: [Math.round(box.top - pic.top), Math.round(pic.right - box.right)],
          actionsCorner: [Math.round(keys.top - pic.top), Math.round(pic.right - keys.right)],
        };
      });
      await page.mouse.move(0, 0);
      const rest = await read();
      assert.deepEqual(rest.collection, ['1', 'visible'], '不悬停时合并计数没有显示');
      assert.equal(rest.actions, '0', '不悬停时操作键已经露出来');
      assert.equal(rest.hitCollection, true, '不悬停时合并计数接不到指针');

      await card.locator('[data-follow-open]').hover();
      const hovered = await read();
      assert.deepEqual(hovered.collection, ['0', 'hidden'], '悬停时合并计数没有淡出');
      assert.equal(hovered.actions, '1', '悬停时操作键没有出现');
      assert.equal(hovered.hitCollection, false, '悬停时合并计数仍挡在操作键上面');
      assert.deepEqual(hovered.actionsCorner, rest.collectionCorner,
        `操作键没有落在合并计数的位置：${JSON.stringify(hovered)}`);

      await page.mouse.move(0, 0);
      await card.locator('[data-follow-open]').focus();
      assert.equal(await card.locator('[data-follow-open]').evaluate((element) => element.matches(':focus-visible')), true);
      const focused = await read();
      assert.deepEqual(focused.collection, ['0', 'hidden'], '键盘聚焦时合并计数没有淡出');
      assert.equal(focused.actions, '1', '键盘聚焦时操作键没有出现');
      assert.deepEqual(withoutPlayer(opened.problems), []);
    } finally {
      await opened.close();
    }
  });

  it('首屏：「全部」按下，页头、两排、筛选浮层、列表自上而下', { timeout: 60_000 }, async () => {
    const opened = await openFollowFeed(browser, '/follow', DESKTOP);
    try {
      const page = opened.page;
      assert.equal(await page.locator('[data-follow-filter=""]').getAttribute('aria-pressed'), 'true');
      assert.equal(await page.locator('[data-follow-filter="new"]').getAttribute('aria-pressed'), 'false');
      const tops = await page.evaluate(() => ['[data-follow-head]', '[data-follow-authors]', '[data-follow-works]',
        '[data-follow-filter-glass]', '[data-follow-list]']
        .map((selector) => document.querySelector(selector)?.getBoundingClientRect().top ?? null));
      assert.ok(tops.every((top) => top !== null), `有一块没画出来：${JSON.stringify(tops)}`);
      assert.deepEqual([...tops].sort((a, b) => a! - b!), tops, `上下次序不对：${JSON.stringify(tops)}`);
      assert.deepEqual(await cardIds(page), FIRST.filter((row) => row.primary.media_kind === 'video')
        .map((row) => row.primary.id));
      assert.deepEqual(opened.problems, []);
    } finally {
      await opened.close();
    }
  });

  it('来源角标接得住指针，悬停能读到来源名；点它照样进详情', { timeout: 60_000 }, async () => {
    const opened = await openFollowFeed(browser, '/follow', DESKTOP);
    try {
      const page = opened.page;
      const card = page.locator(CARDS).first();
      const id = await card.getAttribute('data-follow-item');
      const hit = await card.locator('[data-media-badge]').evaluate((badge) => {
        const box = badge.getBoundingClientRect();
        const target = document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2);
        return { badge: target?.closest('[data-media-badge]') === badge, title: badge.getAttribute('title') };
      });
      assert.equal(hit.badge, true, '角标中心命中的不是角标本身');
      assert.ok(hit.title, '角标没有来源名');
      await card.locator('[data-media-badge]').hover();
      const tip = page.locator('#board-control-tooltip');
      await tip.waitFor({ state: 'visible', timeout: 5_000 });
      assert.equal(await tip.textContent(), hit.title);
      await card.locator('[data-media-badge]').click();
      await page.waitForURL(`**/follow/item/${id}`);
      assert.deepEqual(withoutPlayer(opened.problems), []);
    } finally {
      await opened.close();
    }
  });

  it('两排按种子取样：换状态推回新 view 不洗牌，换一批才换', { timeout: 60_000 }, async () => {
    const opened = await openFollowFeed(browser, '/follow', DESKTOP);
    try {
      const page = opened.page;
      const first = await authorOrder(page);
      assert.equal(first.length, 6);
      await page.locator('[data-follow-filter="new"]').click();
      await searchIs(page, '?status=new');
      await page.locator('[data-follow-filter="new"][aria-pressed="true"]').waitFor();
      assert.deepEqual(await authorOrder(page), first, '换状态之后创作者那一排重新洗了');
      await page.getByRole('button', { name: '换一批', exact: true }).click();
      await page.waitForFunction(() => new URLSearchParams(location.search).get('sort') === 'rand');
      await page.waitForFunction((before) => JSON.stringify([...document.querySelectorAll<HTMLElement>(
        'button[data-follow-author]')].map((button) => button.dataset.followAuthor)) !== before, JSON.stringify(first));
      assert.deepEqual(opened.problems, []);
    } finally {
      await opened.close();
    }
  });

  it('点创作者、题材、标签进组合条并写进地址栏；组合条在读数之后、列表之前', { timeout: 60_000 }, async () => {
    const opened = await openFollowFeed(browser, '/follow', DESKTOP);
    try {
      const page = opened.page;
      await page.locator('button[data-follow-author="name:mira"]').click();
      await searchIs(page, '?author=name%3Amira');
      await page.locator('button[data-follow-work="zelda"]').click();
      await searchIs(page, '?author=name%3Amira&work=zelda');
      await page.locator('button[data-follow-tag="loop"]').click();
      await searchIs(page, '?author=name%3Amira&tag=loop&work=zelda');
      const drops = await page.locator('[data-follow-drop]').evaluateAll((buttons) =>
        buttons.map((button) => (button as HTMLElement).dataset.followDropKind));
      assert.deepEqual(drops, ['创作者', '题材', '标签'], `组合条的条件不对：${JSON.stringify(drops)}`);
      const [readout, combo, list] = await page.evaluate(() => ['[data-follow-readout]', '[data-follow-combo]',
        '[data-follow-list-body]'].map((selector) => document.querySelector(selector)!.getBoundingClientRect()));
      assert.ok(readout!.bottom <= combo!.top + 1 && combo!.bottom <= list!.top + 1,
        `组合条不在读数与列表之间：${JSON.stringify([readout, combo, list])}`);
      // 撤掉一条，交回去的是撤掉之后的地址。
      await page.locator('[data-follow-drop="loop"]').click();
      await searchIs(page, '?author=name%3Amira&work=zelda');
      // 再点按下的那位创作者就撤掉它。
      await page.locator('button[data-follow-author="name:mira"]').click();
      await searchIs(page, '?work=zelda');
      assert.deepEqual(opened.problems, []);
    } finally {
      await opened.close();
    }
  });

  it('换状态药丸时只有列表铺骨架，页头与两排原样留着', { timeout: 60_000 }, async () => {
    const opened = await openFollowFeed(browser, '/follow', DESKTOP);
    try {
      const page = opened.page;
      opened.stub.hold = (url) => url.searchParams.get('status') === 'saved';
      await page.locator('[data-follow-filter="saved"]').click();
      await page.locator('[data-follow-list-body] [data-skeleton]').waitFor({ timeout: 10_000 });
      const during = await page.evaluate(() => ({
        head: !!document.querySelector('[data-follow-feed] [data-follow-head]'),
        authors: document.querySelectorAll('button[data-follow-author]').length,
        glass: !!document.querySelector('[data-follow-filter-glass]'),
        wholePage: !!document.querySelector('#stats .followauthors'),
        skeletons: document.querySelectorAll('[data-skeleton]').length,
      }));
      assert.deepEqual(during, { head: true, authors: 6, glass: true, wholePage: false, skeletons: 1 });
      await opened.stub.release();
      await page.locator('[data-follow-list-body] [data-skeleton]').waitFor({ state: 'detached', timeout: 10_000 });
      await page.locator(CARDS).first().waitFor();
      assert.deepEqual(opened.problems, []);
    } finally {
      await opened.close();
    }
  });

  it('视频卡与照片墙互换；照片墙的尺寸档换列数，手机上不横向溢出', { timeout: 90_000 }, async () => {
    const opened = await openFollowFeed(browser, '/follow', DESKTOP);
    try {
      const page = opened.page;
      await page.locator('[data-media-view="images"]').click();
      await searchIs(page, '?media=images');
      await page.locator('[data-follow-list][data-follow-wall] > [data-follow-item]').first().waitFor();
      assert.deepEqual(await cardIds(page), FIRST.filter((row) => row.primary.media_kind === 'image')
        .map((row) => row.primary.id));
      const columns = () => page.locator('[data-follow-wall]').evaluate((wall) => ({
        size: (wall as HTMLElement).dataset.size, count: getComputedStyle(wall).columnCount,
      }));
      const small = await columns();
      await page.locator('#density').click();
      await page.locator('[data-follow-wall][data-size="big"]').waitFor();
      const big = await columns();
      assert.equal(small.size, 'small');
      assert.ok(Number(big.count) < Number(small.count), `大图档没有少几列：${JSON.stringify([small, big])}`);
      await page.locator('[data-media-view="videos"]').click();
      await searchIs(page, '');
      await page.locator('[data-follow-list]:not([data-follow-wall]) > [data-follow-item]').first().waitFor();
      assert.deepEqual(opened.problems, []);
    } finally {
      await opened.close();
    }
    const mobile = await openFollowFeed(browser, '/follow?media=images', MOBILE);
    try {
      const geometry = await layout(mobile.page);
      assert.ok(geometry.scrollWidth <= geometry.viewportWidth,
        `手机照片墙横向溢出 ${geometry.scrollWidth}>${geometry.viewportWidth}：${geometry.offenders.join('、')}`);
      assert.deepEqual(mobile.problems, []);
    } finally {
      await mobile.close();
    }
  });

  it('瀑布流里带尺寸的图在落地前就按自己的比例占位', { timeout: 60_000 }, async () => {
    const opened = await openFollowFeed(browser, '/follow?media=images', DESKTOP, { settings: { photoLayout: 'masonry' } });
    const held: import('playwright-core').Route[] = [];
    try {
      const page = opened.page;
      await page.route((url) => url.pathname.startsWith('/stub-thumb/'), (route) => { held.push(route) });
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.locator('[data-follow-wall][data-layout="masonry"] > [data-follow-item]').first().waitFor();
      await page.locator('[data-follow-wall] [data-media-pic] > img[width][height]').first().waitFor();
      const boxes = await page.locator('[data-follow-wall] [data-media-pic] > img[width][height]').evaluateAll((images) =>
        (images as HTMLImageElement[]).map((image) => {
          const box = image.getBoundingClientRect();
          return { pending: !image.complete || !image.naturalWidth, width: box.width, height: box.height,
            ratio: Number(image.getAttribute('height')) / Number(image.getAttribute('width')) };
        }));
      const pending = boxes.filter((box) => box.pending);
      assert.ok(pending.length, '缩略图请求挂住了，却没有一张图停在未落地');
      const off = pending.filter((box) => Math.abs(box.height - box.width * box.ratio) > 1.5);
      assert.deepEqual(off, [], '未落地的图没有按 width/height 属性的比例占位');
    } finally {
      for (const route of held.splice(0)) await route.abort().catch(() => {});
      await opened.close();
    }
  });

  it('加载更多接在原来那些卡后面', { timeout: 60_000 }, async () => {
    const opened = await openFollowFeed(browser, '/follow', DESKTOP);
    try {
      const page = opened.page;
      const before = await cardIds(page);
      const more = page.getByRole('button', { name: '加载更多' });
      await more.scrollIntoViewIfNeeded();
      // 滚到底续页会自己接上；没接上再按一下。
      await page.waitForTimeout(800);
      if (!(await page.locator(`[data-follow-item="${MORE[0]!.primary.id}"]`).count())) await more.click().catch(() => {});
      await page.locator(`[data-follow-item="${MORE.at(-1)!.primary.id}"]`).waitFor({ timeout: 10_000 });
      assert.deepEqual(await cardIds(page), [...before, ...MORE.map((row) => row.primary.id)]);
      assert.deepEqual(opened.problems, []);
    } finally {
      await opened.close();
    }
  });

  it('标记已看与稍后看：请求体只带条目与目标，卡上立刻换状态', { timeout: 60_000 }, async () => {
    const opened = await openFollowFeed(browser, '/follow', DESKTOP);
    try {
      const page = opened.page;
      const card = page.locator('[data-follow-item="1001"]');
      await card.hover();
      await card.locator('[data-follow-status="1001"][data-to="seen"]').click();
      await page.locator('[data-follow-item="1001"][data-status="seen"]').waitFor();
      // 已看的那张多出「恢复未看」。
      assert.equal(await card.locator('[data-to="new"]').count(), 1);
      await card.hover();
      await card.locator('[data-follow-save="1001"]').click();
      await card.locator('[data-follow-save="1001"][aria-label="已保存"]').waitFor();
      assert.deepEqual(opened.stub.writes, [
        { url: '/api/follow/status', body: { item: 1001, to: 'seen' } },
        { url: '/api/follow/save', body: { item: 1001 } },
      ]);
      assert.deepEqual(opened.problems, []);
    } finally {
      await opened.close();
    }
  });

  it('检查更新与往回抓起同一趟任务，任务在跑时两枚键一起忙', { timeout: 60_000 }, async () => {
    const opened = await openFollowFeed(browser, '/follow', DESKTOP);
    try {
      const page = opened.page;
      await page.locator('[data-follow-older]').click();
      await page.locator('[data-follow-older][aria-busy="true"]').waitFor();
      await page.locator('[data-follow-older]').filter({ hasText: '抓取中' }).waitFor();
      assert.match(await page.locator('[data-follow-older]').innerText(), /抓取中/);
      await page.locator('[data-follow-recheck][aria-busy="true"]').waitFor();
      assert.deepEqual(opened.stub.writes, [{ url: '/api/follow/check', body: { older: true, background: true } }]);
      assert.equal(await page.evaluate(() => sessionStorage.getItem('peach-follow-job')), 'job-1');
      assert.deepEqual(opened.problems, []);
    } finally {
      await opened.close();
    }
    const again = await openFollowFeed(browser, '/follow', DESKTOP);
    try {
      const page = again.page;
      await page.locator('[data-follow-recheck]').click();
      await page.locator('[data-follow-recheck][aria-busy="true"]').waitFor();
      await page.locator('[data-follow-older][aria-busy="true"]').waitFor();
      // 检查那一趟只让往回抓那枚忙、不换字。
      assert.equal(await page.locator('[data-follow-older]').innerText(), '抓更早的一页');
      assert.deepEqual(again.stub.writes, [{ url: '/api/follow/check', body: { background: true } }]);
      assert.deepEqual(again.problems, []);
    } finally {
      await again.close();
    }
  });

  it('多选里 Shift 连选按屏幕上的次序框进一段', { timeout: 60_000 }, async () => {
    const opened = await openFollowFeed(browser, '/follow', DESKTOP);
    try {
      const page = opened.page;
      const ids = await cardIds(page);
      await page.locator('#selectMode').click();
      await page.locator('[data-follow-feed][data-select-mode]').waitFor();
      await page.locator(`[data-follow-item="${ids[1]}"]`).click();
      await page.locator(`[data-follow-item="${ids[4]}"]`).click({ modifiers: ['Shift'] });
      await page.locator(`[data-follow-item="${ids[4]}"][data-selected]`).waitFor();
      const picked = await page.locator(`${CARDS}[data-selected]`).evaluateAll((cards) =>
        cards.map((card) => Number((card as HTMLElement).dataset.followItem)));
      assert.deepEqual(picked, ids.slice(1, 5));
      assert.equal(new URL(page.url()).pathname, '/follow', '多选里点卡不该进详情');
      assert.deepEqual(opened.problems, []);
    } finally {
      await opened.close();
    }
  });

  it('点卡进详情，关掉回到同一个岛、同一批卡；深链进详情关掉时才挂岛', { timeout: 90_000 }, async () => {
    const opened = await openFollowFeed(browser, '/follow?status=new', DESKTOP);
    try {
      const page = opened.page;
      const before = await cardIds(page);
      await page.evaluate(() => { (document.querySelector('[data-follow-feed]') as HTMLElement & { mark?: number }).mark = 7 });
      await page.locator('[data-follow-item="1002"] [data-follow-open]').click();
      await page.waitForFunction(() => location.pathname === '/follow/item/1002');
      await page.locator('#stage[open]').waitFor();
      await page.locator('#closeStage').click();
      await searchIs(page, '?status=new');
      await page.locator(CARDS).first().waitFor();
      assert.equal(await page.evaluate(() => (document.querySelector('[data-follow-feed]') as HTMLElement & { mark?: number }).mark),
        7, '回到列表时岛重挂了');
      assert.deepEqual(await cardIds(page), before);
      assert.deepEqual(withoutPlayer(opened.problems), []);
    } finally {
      await opened.close();
    }
    const deep = await openFollowFeed(browser, '/follow/item/1003', DESKTOP, { ready: '#stage[open]' });
    try {
      const page = deep.page;
      assert.equal(await page.locator('[data-follow-feed]').count(), 0, '深链进详情时不该挂岛');
      await page.locator('#closeStage').click();
      await page.locator(CARDS).first().waitFor({ timeout: 15_000 });
      assert.equal(new URL(page.url()).pathname, '/follow');
      assert.deepEqual(withoutPlayer(deep.problems), []);
    } finally {
      await deep.close();
    }
  });
});
