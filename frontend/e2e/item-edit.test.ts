/* 单片编辑在桌面与手机的显式保存边界；所有写入由桩接住。 */
import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import type { Browser } from 'playwright-core';

import { launch, VIEWPORTS } from './harness.ts';
import { ITEM, openItemPage } from './item-fixture.ts';

interface OpeningObservation {
  frames: number; blank: number; sheenLeak: number; unmounted: number; moved: number; running: boolean;
  initial: { scrollTop: number; sideTop: number };
  last: Record<string, unknown>;
}

describe('单片资料编辑', () => {
  let browser: Browser;
  before(async () => { browser = await launch() });
  after(async () => { await browser.close() });

  for (const viewport of VIEWPORTS.filter(view => view.name === 'desktop' || view.mobile).slice(0, 2)) {
    it(`${viewport.name} 编辑资料取数时保留详情背景与阅读位置`, { timeout: 60_000 }, async () => {
      const opened = await openItemPage(browser, `/assets/${ITEM.part}`, viewport);
      const page = opened.page;
      let release = () => {};
      const pending = new Promise<void>(resolve => { release = resolve });
      try {
        await page.route(url => url.pathname === '/api/item-edit', async route => {
          await pending;
          return route.fulfill({ json: { id: ITEM.part, code: 'PCH-021', filename: 'PCH-021r.mp4',
            title: '演示作品', performers: ['演员甲'], mutation_revision: 3, subtitled: true, uncensored: false } });
        });
        await page.locator('[data-item-edit]').scrollIntoViewIfNeeded();
        const navigations: string[] = [];
        page.on('framenavigated', frame => { if (frame === page.mainFrame()) navigations.push(frame.url()) });
        await page.evaluate(() => {
          const stage = document.querySelector<HTMLDialogElement>('#stage')!;
          const scroll = stage.querySelector<HTMLElement>('[data-stage-scroll]')!;
          const side = stage.querySelector<HTMLElement>('[data-item-side]')!;
          const media = stage.querySelector<HTMLElement>('[data-item-media]')!;
          const page = document.getElementById('main')!;
          scroll.scrollTop = Math.min(24, scroll.scrollHeight - scroll.clientHeight);
          side.scrollTop = Math.min(16, side.scrollHeight - side.clientHeight);
          const scrollTop = scroll.scrollTop;
          const sideTop = side.scrollTop;
          const state: OpeningObservation = { frames: 0, blank: 0, sheenLeak: 0, unmounted: 0, moved: 0, running: true,
            initial: { scrollTop, sideTop }, last: {} };
          (window as unknown as { editOpening: OpeningObservation }).editOpening = state;
          const sample = () => {
            if (!state.running) return;
            state.frames++;
            const rect = media.getBoundingClientRect();
            const hidden = [stage, scroll, side, media].some(node => {
              for (let current: HTMLElement | null = node; current; current = current.parentElement) {
                const style = getComputedStyle(current);
                if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') return true;
              }
              return false;
            });
            const detached = [stage, scroll, side, media, page].some(node => !node.isConnected);
            const skeleton = stage.querySelector<HTMLElement>('[role="status"][aria-label="正在读取编辑资料"]');
            const sheen = skeleton ? getComputedStyle(skeleton, '::after') : null;
            if (skeleton && sheen && parseFloat(sheen.height) > skeleton.getBoundingClientRect().height + 1) state.sheenLeak++;
            if (!stage.open || hidden || rect.width === 0 || rect.height === 0) state.blank++;
            if (detached) state.unmounted++;
            if (scroll.scrollTop !== scrollTop || side.scrollTop !== sideTop) state.moved++;
            state.last = { open: stage.open, hidden, detached, mediaWidth: rect.width, mediaHeight: rect.height,
              scrollTop: scroll.scrollTop, sideTop: side.scrollTop, sheenHeight: sheen?.height,
              skeletonHeight: skeleton?.getBoundingClientRect().height };
            requestAnimationFrame(sample);
          };
          requestAnimationFrame(sample);
        });
        await Promise.all([
          page.waitForRequest(request => new URL(request.url()).pathname === '/api/item-edit'),
          page.locator('[data-item-edit]').click(),
        ]);
        // 响应由屏障扣住；这段时间只测浏览器实际画出的帧。
        const observation = await page.evaluate(async () => {
          await new Promise<void>(resolve => {
            const until = performance.now() + 1200;
            const next = () => { if (performance.now() >= until) resolve(); else requestAnimationFrame(next) };
            requestAnimationFrame(next);
          });
          const state = (window as unknown as { editOpening: OpeningObservation }).editOpening;
          state.running = false;
          return state;
        });
        await page.screenshot({ path: `../build/item-edit-opening-pending-${viewport.name}.png` });
        console.info(`编辑入口观测 ${viewport.name}: ${JSON.stringify(observation)}`);
        assert.ok(observation.frames > 1, JSON.stringify(observation));
        assert.ok(observation.initial.scrollTop > 0 || observation.initial.sideTop > 0, JSON.stringify(observation));
        assert.equal(observation.blank, 0, JSON.stringify(observation));
        assert.equal(observation.sheenLeak, 0, JSON.stringify(observation));
        assert.equal(observation.unmounted, 0, JSON.stringify(observation));
        assert.equal(observation.moved, 0, JSON.stringify(observation));
        assert.deepEqual(navigations, []);
        const modal = page.getByRole('dialog', { name: '编辑视频资料', exact: true });
        assert.equal(await modal.getByRole('status', { name: '正在读取编辑资料', exact: true }).isVisible(), true);
        release();
        await modal.getByRole('textbox', { name: '文件名', exact: true }).waitFor();
        await page.screenshot({ path: `../build/item-edit-opening-ready-${viewport.name}.png` });
        await modal.getByRole('button', { name: '取消', exact: true }).click();
        assert.equal(await page.locator('#stage[open] [data-item-side]').isVisible(), true);
        assert.deepEqual(opened.stub.writes, []);
        assert.deepEqual(opened.problems.filter(problem => !problem.includes('VIDEOJS')), []);
      } finally { release(); await opened.close() }
    });

    it(`${viewport.name} 编辑取消不写入，保存失败保留输入，重试只更新当前条目`, { timeout: 60_000 }, async () => {
      const opened = await openItemPage(browser, `/assets/${ITEM.part}`, viewport);
      try {
        const page = opened.page;
        const original = await page.evaluate(async id => (await fetch(`/api/item?id=${id}`)).json(), ITEM.part);
        const writes: Record<string, unknown>[] = [];
        let form = { id: ITEM.part, code: 'PCH-021', filename: 'PCH-021r.mp4', title: '演示作品', performers: ['演员甲'],
          mutation_revision: 3, subtitled: true, uncensored: false };
        let fail = true;
        await page.route(url => url.pathname === '/api/item-edit', route => {
          if (route.request().method() === 'GET') return route.fulfill({ json: form });
          const body = route.request().postDataJSON();
          writes.push(body);
          if (fail) return route.fulfill({ status: 400, json: { error: '目标文件已经存在' } });
          form = { ...form, code: body.code, filename: 'PCH-099 [中字] [无码破解].mp4', title: body.title, performers: body.performers,
            mutation_revision: 4, uncensored: true };
          return route.fulfill({ json: { ...original, code: form.code, display_code: form.code, name: form.filename,
            catalog_title: form.title, field_owners: { catalog_title: 'user:manual' }, display_title: form.title,
            performers: form.performers, entity_refs: {}, edition_label: '中字 / 无码破解' } });
        });
        await page.locator('[data-item-edit]').click();
        let modal = page.getByRole('dialog', { name: '编辑视频资料', exact: true });
        await page.locator('[data-item-media] video').waitFor({ state: 'detached', timeout: 5000 });
        await modal.getByRole('textbox', { name: '文件名', exact: true }).fill('PCH-021UC.mp4');
        await modal.getByRole('button', { name: '取消', exact: true }).click();
        await page.locator('[data-item-media] video').first().waitFor({ state: 'attached' });
        assert.equal(writes.length, 0);
        await page.locator('[data-item-edit]').click();
        modal = page.getByRole('dialog', { name: '编辑视频资料', exact: true });
        await modal.getByRole('textbox', { name: '文件名', exact: true }).fill('PCH-021UC');
        await modal.getByRole('textbox', { name: '番号', exact: true }).fill('PCH-099');
        await modal.getByRole('textbox', { name: '作品标题', exact: true }).fill('手动确认的作品');
        await modal.getByRole('textbox', { name: '演员', exact: true }).fill('演员甲、演员乙');
        await modal.getByText('无码破解', { exact: true }).click();
        assert.equal(await modal.getByRole('checkbox', { name: '无码破解', exact: true }).isChecked(), true);
        const [chooser] = await Promise.all([
          page.waitForEvent('filechooser', { timeout: 5000 }),
          modal.getByRole('button', { name: '更换封面', exact: true }).click({ timeout: 5000 }),
        ]);
        await chooser.setFiles({ name: 'cover.png', mimeType: 'image/png',
          buffer: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aBaQAAAAASUVORK5CYII=', 'base64') });
        await modal.getByAltText('所选封面预览').waitFor();
        const bounds = await modal.boundingBox();
        assert.ok(bounds && bounds.x >= 0 && bounds.x + bounds.width <= viewport.width + 1, JSON.stringify(bounds));
        await page.screenshot({ path: `../build/item-edit-${viewport.name}.png` });
        await modal.getByRole('button', { name: '保存资料', exact: true }).click();
        await modal.getByText('目标文件已经存在', { exact: true }).waitFor();
        assert.equal(await modal.getByRole('textbox', { name: '作品标题', exact: true }).inputValue(), '手动确认的作品');
        fail = false;
        await modal.getByRole('button', { name: '保存资料', exact: true }).click();
        await modal.waitFor({ state: 'hidden' });
        await page.getByText('手动确认的作品', { exact: true }).first().waitFor();
        assert.equal(writes.length, 2);
        assert.deepEqual(writes[1]?.performers, ['演员甲', '演员乙']);
        assert.deepEqual(writes[1]?.edition, { subtitled: true, uncensored: true });
        assert.equal(writes[1]?.id, ITEM.part);
        assert.equal(writes[1]?.filename, 'PCH-021UC');
        assert.equal(writes[1]?.code, 'PCH-099');
        assert.equal(writes[1]?.expected_revision, 3);
        assert.match(String(writes[1]?.cover), /^data:image\/png;base64,/);
        assert.deepEqual(opened.stub.writes, []);
        assert.deepEqual(opened.problems.filter(problem => !problem.includes('VIDEOJS') && !problem.includes('400')), []);
      } catch (error) {
        await opened.page.screenshot({ path: `../build/item-edit-failure-${viewport.name}.png` });
        console.log(await opened.page.locator('body').ariaSnapshot());
        throw error;
      } finally { await opened.close() }
    });
  }

  it('单片更新只提交当前资产和明确重查参数', { timeout: 60_000 }, async () => {
    const opened = await openItemPage(browser, `/assets/${ITEM.part}`, VIEWPORTS[0]!);
    try {
      const writes: unknown[] = [];
      await opened.page.route(url => url.pathname === '/api/library-processing', route => {
        if (route.request().method() === 'GET') return route.fulfill({ json: { status: 'idle' } });
        writes.push(route.request().postDataJSON());
        return route.fulfill({ json: { job_id: 'only-this', status: 'running', asset_ids: [ITEM.part],
          requested_stage: 'metadata', refresh_metadata: true } });
      });
      await opened.page.locator('[data-item-update]').click();
      await opened.page.getByText('正在更新 PCH-021', { exact: true }).waitFor();
      assert.deepEqual(writes, [{ stage: 'metadata', asset_ids: [ITEM.part], refresh: true }]);
      assert.deepEqual(opened.stub.writes, []);
    } finally { await opened.close() }
  });

  it('本地检查后仍未取得番号时明确提示编辑番号', { timeout: 60_000 }, async () => {
    const opened = await openItemPage(browser, '/assets/17', VIEWPORTS[0]!);
    try {
      let started = false;
      const writes: unknown[] = [];
      await opened.page.route(url => url.pathname === '/api/library-processing', route => {
        if (route.request().method() === 'GET' && !started) return route.fulfill({ json: { status: 'idle' } });
        if (route.request().method() === 'POST') {
          started = true;
          writes.push(route.request().postDataJSON());
        }
        return route.fulfill({ json: { job_id: 'unknown-number', status: 'complete', asset_ids: [17],
          requested_stage: 'metadata', refresh_metadata: true } });
      });
      await opened.page.locator('[data-item-update]').click();
      await opened.page.getByText('未取得番号，请在编辑资料中填写番号后重试', { exact: true }).waitFor();
      assert.deepEqual(writes, [{ stage: 'metadata', asset_ids: [17], refresh: true }]);
      assert.deepEqual(opened.stub.writes, []);
    } finally { await opened.close() }
  });

  it('返回其他条目的任务时保留当前条目并提示任务范围冲突', { timeout: 60_000 }, async () => {
    const opened = await openItemPage(browser, `/assets/${ITEM.part}`, VIEWPORTS[0]!);
    try {
      await opened.page.route(url => url.pathname === '/api/library-processing', route => {
        if (route.request().method() === 'GET') return route.fulfill({ json: { status: 'idle' } });
        return route.fulfill({ json: { job_id: 'foreign-item', status: 'running', asset_ids: [999],
          requested_stage: 'metadata', refresh_metadata: true } });
      });
      await opened.page.locator('[data-item-update]').click();
      await opened.page.getByText('资料任务已由其他操作启动，请查看任务进度', { exact: true }).waitFor();
      assert.equal(new URL(opened.page.url()).pathname, `/assets/${ITEM.part}`);
      assert.deepEqual(opened.stub.writes, []);
    } finally { await opened.close() }
  });
});
