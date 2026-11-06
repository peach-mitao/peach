import { describe, expect, it, vi } from 'vitest';
import { boardPageSkeleton, detailSkeletonBody } from '../src/board-skeleton';
import { wireBoardSegments } from '../src/board-controls';

vi.mock('@peach/legacy/core', async importOriginal => ({
  ...await importOriginal<object>(),
  icon: (name: string) => `<svg aria-hidden="true" data-icon="${name}"></svg>`,
}));

describe('Board page skeleton', () => {
  it.each([
    ['subscriptions', 'Sources and subscriptions'], ['downloads', 'Download channels'], ['network', 'Network & access'], ['maintenance', 'App and maintenance'],
  ])('Configuration deep link %s opens its matching section', (key, label) => {
    const root = document.createElement('div');
    root.innerHTML = boardPageSkeleton(`/settings/${key}`);
    expect(root.querySelector('.ui-board-local-nav [aria-selected="true"]')?.textContent).toBe(label);
    expect(root.querySelector('[aria-label="Media library and catalog"]')).toBeNull();
  });
  it.each(['/stats', '/taste', '/subscriptions', '/settings/library', '/settings/diagnostics', '/tasks', '/duplicates', '/quality-goals', '/playlists'])('Provide a single wait semantic for %s', path => {
    const root = document.createElement('div');
    root.innerHTML = boardPageSkeleton(path);
    expect(root.querySelectorAll('[role="status"]')).toHaveLength(1);
    expect(root.querySelector('[aria-hidden="true"]')).not.toBeNull();
    expect(root.querySelector('[aria-hidden="true"][inert]')).not.toBeNull();
    for (const control of root.querySelectorAll('button, input, a, summary')) {
      expect(control.closest('[inert]')).not.toBeNull();
    }
  });
  it('JAV 新作分区在列表模式下画新作自己的表格骨架，下排有卡片／列表开关、没有文件夹开关', () => {
    const before = location.pathname + location.search;
    history.replaceState(null, '', '/jav?tab=releases');
    localStorage.setItem('peach.catalog-view.v1', 'list');
    const root = document.createElement('div');
    root.innerHTML = boardPageSkeleton('/jav');
    localStorage.removeItem('peach.catalog-view.v1');
    history.replaceState(null, '', before);
    expect([...root.querySelectorAll('[data-catalog-table] th')].map(node => node.textContent).filter(Boolean))
      .toEqual(['作品', '艺人', '厂牌', '标签', '发行时间', '时长', '来源评分', '操作']);
    expect(root.querySelector('[data-skeleton="jav-discover"]')).toBeNull();
    expect(root.querySelector('[aria-label="馆藏显示方式"] [aria-checked="true"]')?.getAttribute('aria-label')).toBe('列表');
    expect(root.querySelector('[data-folder-mode-toggle]')).toBeNull();
  });
  it('JAV 新作分区骨架按下新作，页头是名册页那种筛选框，下面是两排头像占位与新作自己的排序键', () => {
    const before = location.pathname + location.search;
    history.replaceState(null, '', '/jav?tab=releases&sort=duration&dir=asc');
    const root = document.createElement('div');
    root.innerHTML = boardPageSkeleton('/jav');
    history.replaceState(null, '', before);
    expect([...root.querySelectorAll('span.whitespace-nowrap.rounded-md')].find(node => node.classList.contains('text-text-primary'))?.textContent).toBe('新作');
    expect(root.querySelector('[data-index-search] input')?.getAttribute('aria-label')).toBe('筛选新作');
    expect(root.querySelector('form')).toBeNull();
    expect(root.querySelectorAll('[data-catalog-tier] [data-catalog-placeholder]').length).toBeGreaterThan(0);
    expect(root.querySelector('[data-entity-tag="external"]')).toBeNull();
    expect([...root.querySelectorAll('[data-entity-sort]')].map(node => node.textContent)).toEqual(['发行时间', '来源评分', '时长', '番号', '口味']);
    expect(root.querySelector('[data-entity-sort][aria-pressed="true"]')?.getAttribute('data-entity-sort')).toBe('duration');
    expect(root.querySelector('[data-entity-batch]')?.getAttribute('aria-label')).toBe('换一批');
  });
  it('统计预留四张指标卡，未知页面交给自身骨架', () => {
    const root = document.createElement('div');
    root.innerHTML = boardPageSkeleton('/stats');
    expect(root.querySelectorAll('[data-stats-metrics] > div')).toHaveLength(4);
    expect(boardPageSkeleton('/assets/5')).toBe('');
  });
  it.each([
    ['/stats', '[data-stats-chart]', 2],
    ['/tasks', '.activitysection', 3],
    ['/duplicates', '[data-duplicate-group] .duplicate-row', 4],
    ['/quality-goals', '.peach-react .card-grid-cover > li', 6],
    ['/subscriptions', '.peach-react .ui-follow-skeleton-surface .follow-skeleton-author', 3],
    ['/settings/library', '.peach-react .ui-configpage section[aria-label="Library and catalog"]', 1],
    ['/playlists', '.ui-playlistcards > .playlistcard', 6],
  ] as const)('%s reuses the final content container', (path, selector, count) => {
    const root = document.createElement('div');
    root.innerHTML = boardPageSkeleton(path);
    expect(root.querySelectorAll(selector)).toHaveLength(count);
    expect(root.querySelector('.skeleton-cards')).toBeNull();
  });
  it('Details keep the media area and details sidebar without creating a player', () => {
    const root = document.createElement('div');
    root.innerHTML = detailSkeletonBody();
    expect(root.querySelector('[data-stage-grid] > [data-stage-media]')).not.toBeNull();
    expect(root.querySelector('[data-stage-grid] > [data-stage-side] > [data-stage-side-content]')).not.toBeNull();
    expect(root.querySelectorAll('video, audio, iframe')).toHaveLength(0);
  });
  const follow = (options: Parameters<typeof boardPageSkeleton>[1] = {}) => {
    const root = document.createElement('div');
    root.innerHTML = boardPageSkeleton('/subscriptions', options);
    return root;
  };
  it('The follow skeleton\'s categories use Pills, with the follows list selected', () => {
    const root = follow();
    wireBoardSegments(root);
    expect(root.querySelector('.board-segment-thumb')).toBeNull();
    expect(root.querySelector('[data-section-items] [aria-selected=true]')?.textContent).toBe('Follows list');
    const track = root.querySelector('[data-section-items]')!;
    expect([...track.children].map((span) => span.textContent)).toEqual(['Follows list', 'Add follow', 'Manage tags']);
  });
  it('The follows skeleton highlights the `?tab=` tab from the URL; tabs other than the list do not render the follows list toolbar', () => {
    const tags = follow({ followTab: 'tags' });
    expect(tags.querySelector('[data-section-items] [aria-selected=true]')?.textContent).toBe('Manage tags');
    expect(tags.querySelector('.ui-follow-skeleton-toolbar')).toBeNull();
    expect(tags.querySelector('.ui-follow-skeleton-surface')).not.toBeNull();
    expect(follow({ followTab: 'feeds' }).querySelector('[data-section-items] [aria-selected=true]')?.textContent).toBe('Follows list');
    expect(follow({ followTab: 'wants' }).querySelector('[data-section-items] [aria-selected=true]')?.textContent).toBe('Follows list');
    expect(follow({ followTab: 'nope' }).querySelector('[data-section-items] [aria-selected=true]')?.textContent).toBe('Follows list');
  });
  it('The follows skeleton toolbar paints the final Board UI variant: Check all is the primary button and the view switch is a button group selected by layout', () => {
    const toolbar = follow().querySelector('.ui-follow-skeleton-toolbar')!;
    const check = toolbar.querySelector('[data-follow-toolbar-actions] > button')!;
    expect(check.textContent).toBe('Check all');
    expect(check.classList.contains('bg-button-primary')).toBe(true);
    const group = [...toolbar.querySelectorAll('[data-button-group][role="group"] > button')];
    expect(group.map((button) => button.querySelector('use')?.getAttribute('href'))).toEqual(['#i-layout-grid', '#i-table']);
    expect(group.map((button) => button.getAttribute('aria-pressed'))).toEqual(['true', 'false']);
    expect(group.every((button) => button.classList.contains('bg-button-ghost-background'))).toBe(true);
    expect(toolbar.querySelector('button[aria-haspopup="listbox"]')?.textContent).toBe('SortCheck time');
    expect([...toolbar.querySelectorAll('button')].at(-1)?.textContent).toBe('Collapse all');
    const tableGroup = follow({ followLayout: 'table' }).querySelectorAll('[data-button-group] > button');
    expect([...tableGroup].map((button) => button.getAttribute('aria-pressed'))).toEqual(['false', 'true']);
  });
  it('The sort box and direction key follow the address bar\'s sort', () => {
    const toolbar = (options: Parameters<typeof boardPageSkeleton>[1]) =>
      follow(options).querySelector('.ui-follow-skeleton-toolbar')!;
    const arrow = (root: Element) => root.querySelector('button[aria-haspopup]')!.parentElement!
      .nextElementSibling!.querySelector('use')?.getAttribute('href');
    expect(arrow(toolbar({}))).toBe('#i-arrow-down');
    const byName = toolbar({ followSort: 'name' });
    expect(byName.querySelector('button[aria-haspopup]')?.textContent).toBe('SortCreator name');
    expect(arrow(byName)).toBe('#i-arrow-up');
    expect(arrow(toolbar({ followSort: 'name', followDir: 'desc' }))).toBe('#i-arrow-down');
  });
  it('Action buttons on creator cards and source rows are small secondary buttons matching the final in-row actions', () => {
    const root = follow();
    expect(root.querySelectorAll('.follow-skeleton-source')).toHaveLength(10);
    for (const row of root.querySelectorAll('.follow-skeleton-source')) {
      const actions = [...row.lastElementChild!.lastElementChild!.children];
      expect(actions.map((button) => button.querySelector('use')?.getAttribute('href'))).toEqual(['#i-refresh-cw', '#i-trash']);
      for (const button of actions) expect(button.className).toContain('size-8 rounded-lg p-0');
    }
    const head = root.querySelector('.follow-skeleton-author [data-follow-author-header]')!;
    expect([...head.querySelectorAll('button')].map((button) => button.textContent)).toEqual(['', 'Select all', 'Collapse']);
    expect(root.querySelector('.ui-follow-skeleton-surface > .group')?.textContent).toBe('Select this page');
    expect(root.querySelector('[data-selection-dock]')).toBeNull();
  });
  it('The taste skeleton paints inside the React island, laid out per the browser history page', () => {
    const root = document.createElement('div');
    root.innerHTML = boardPageSkeleton('/taste');
    expect(root.querySelector('.peach-react')).not.toBeNull();
    expect(root.querySelector('[data-taste-segments] [data-selected]')?.textContent).toBe('Browser data');
    expect([...root.querySelectorAll('[data-taste-metrics] > div > span')].map((span) => span.textContent))
      .toEqual(['Browsing data', 'Taste dimensions', 'Browsing leads', 'Private export']);
    expect(root.querySelector('[data-taste-portrait]')?.textContent).toContain('Browser profile');
    expect([...root.querySelectorAll('h3')].map((h3) => h3.textContent))
      .toEqual(['Browsing activity time', 'Daily activity', 'Creator signal sources']);
  });
  it('The follow table view is the Board UI table frame, and the sorted column carries a direction', () => {
    const root = follow({ followLayout: 'table' });
    const table = root.querySelector('.follow-skeleton-table[data-board-data-table] table.bui-table')!;
    expect([...table.querySelectorAll('thead th')].map((th) => th.textContent)).toEqual(['', 'Creators', 'Source', 'Site', 'State', 'Last check', '']);
    expect(table.querySelectorAll('tbody tr')).toHaveLength(20);
    expect([...table.querySelectorAll('[data-sort-indicator][data-direction]')].map((mark) => [mark.parentElement!.textContent, mark.getAttribute('data-direction')]))
      .toEqual([['Last check', 'descending']]);
    expect(root.querySelector('.follow-skeleton-author')).toBeNull();
    expect(root.querySelector('.ui-follow-skeleton-toolbar')?.textContent).not.toContain('Collapse all');
  });
  it('The table skeleton\'s row count follows the page size', () => {
    localStorage.setItem('peach.settings.v1', JSON.stringify({ followPageSize: 40 }));
    try {
      const root = follow({ followLayout: 'table' });
      expect(root.querySelectorAll('.follow-skeleton-table tbody tr')).toHaveLength(40);
      expect(root.querySelector('.ui-follow-skeleton-surface > :last-child button[aria-haspopup]')?.textContent).toBe('40 items per page');
    } finally { localStorage.removeItem('peach.settings.v1') }
  });
});
