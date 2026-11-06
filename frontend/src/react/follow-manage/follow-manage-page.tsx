/* Follow management page: add sources, check updates, remove sources, and manage JAV subscription feeds.
 *
 * Source credentials are managed by Peach configuration; the wanted list lives in the JAV section.
 *
 * Address bar and personal preferences each mind their own (ADR-0031, "migration bridging"):
 * - `tab`, `page`, `sort`, `dir` live in the address bar. The criterion is "can this be linked from outside": sending a follow
 *   list's address to yourself on another machine should show the same batch in the same order; sorting decides which sources
 *   land on page two, so it and the page number are two halves of one thing and cannot live one in the address and one not.
 * - `pageSize`, `layout` are this browser's personal preferences, following `appSettings`, read and written by the shell;
 *   changing them does not change which batch this page is, and putting them in the address would make every shared link
 *   carry the sender's habits along.
 * Both sides have a single source of truth: React holds the live state, and the two callbacks on props decide where writes go.
 *
 * Layout criteria come from docs/reference-sources.json's vercel-report-design: avoid cards inside cards, patching hierarchy
 * with borders, rows of full-width empty bars, and tiny gray text at arbitrary sizes. So grouping relies on headings and one
 * hairline divider, rows are separated only by dividers with no frames of their own, and font sizes only take BoardUI's
 * established token tiers. */
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tab, TabPanel, Tabs } from 'react-aria-components';

import { resolveFollowSort } from '../../follow-sort';
import type { FollowManageProps } from '../bundle';
import { cardClass } from '../components/card';
import { Note } from '../components/note';
import { Page } from '../components/page';
import { TagManager } from '../index/tag-manager';
import { PillAriaTabList } from '../components/pill-aria-tab-list';
import { STAT_STRIP_SIX } from '../components/stat-card';
import { ExternalLink } from '../settings/section';
import { AddSource } from './add-source';
import { AddFeed } from './add-feed';
import { AliasManager } from './alias-manager';
import { ButtonLink } from '@/components/base/buttons/button';
import { FeedSources } from './feed-sources';
import {
  credentialDone, DEFAULT_SORT, FEEDS_KEY, fetchCredentials, fetchFeeds, fetchFollow, FOLLOW_CREDENTIALS_KEY,
  FOLLOW_MANAGE_KEY, groupByAuthor, isBroken, isLayout, keepSelected, pageSizeOf,
  SORT_DEFAULT_DIR, type CredentialData, type FollowData, type Layout, type SortDir, type SortKey,
} from './follow-manage';
import { SourceList } from './source-list';
import { FOLLOW_MANAGE_NAV as TABS } from './manage-route';

type TabKey = (typeof TABS)[number][0];

const isTab = (value: unknown): value is TabKey => TABS.some(([key]) => key === value);

/** One count cell: a name, a big number, and a line for its unit. The filler card of the legacy `.fmanageoverview>div`. */
function Reading({ term, figure, unit }: { term: string; figure: number; unit: string }) {
  return (
    <div className={cardClass({ padding: 'none', className: 'flex flex-col gap-3 px-6 py-5 max-sm:gap-2 max-sm:p-4' })}>
      <span className="text-body-medium text-text-secondary">{`${term} `}</span>
      {/* The font steps down one size from six digits and again from seven, so with six cards side by side the number and unit stay on one line; longer numbers drop the unit to the next line instead of pushing out of the card. */}
      <b data-follow-reading="" className={`flex min-w-0 flex-wrap items-baseline gap-x-1 tabular-nums text-text-primary ${
        figure >= 1000000 ? 'text-headline-medium' : figure >= 100000 ? 'text-title-3-medium' : 'text-title-1-medium'}`}>
        <span className="min-w-0 wrap-anywhere">{figure.toLocaleString()}</span>
        <small className="whitespace-nowrap text-body-2-regular text-text-secondary">{` ${unit}`}</small>
      </b>
    </div>
  );
}

export function FollowManagePage(props: FollowManageProps) {
  const {
    route, savePreference, toast, openFollow, readOnly, readOnlyMessage, writerUrl,
  } = props;
  const [tab, setTab] = useState<TabKey>(isTab(props.tab) ? props.tab : 'list');
  const [page, setPage] = useState(Math.max(1, Math.floor(props.page) || 1));
  const [sort, setSort] = useState<SortKey>(() => resolveFollowSort(props.sort, props.dir).sort);
  const [dir, setDir] = useState<SortDir>(() => resolveFollowSort(props.sort, props.dir).dir);
  const [layout, setLayout] = useState<Layout>(isLayout(props.layout) ? props.layout : 'default');
  const [pageSize, setPageSize] = useState(pageSizeOf(props.pageSize));
  /* Selection spans pages and views, keyed by source ID: after paging, re-sorting, or switching from cards to table, the same sources stay selected.
     It stays out of the URL; that is this moment's batch, not this page's identity. */
  const [selected, setSelected] = useState<ReadonlySet<number>>(new Set<number>());
  const [feedSelected, setFeedSelected] = useState<ReadonlySet<number>>(new Set<number>());

  const follow = useQuery({ queryKey: FOLLOW_MANAGE_KEY, queryFn: ({ signal }) => fetchFollow(signal) });
  const credentials = useQuery({
    queryKey: FOLLOW_CREDENTIALS_KEY, queryFn: ({ signal }) => fetchCredentials(signal),
  });
  /* The counts and the JAV subscription table share one read. */
  const feeds = useQuery({ queryKey: FEEDS_KEY, queryFn: ({ signal }) => fetchFeeds(signal) });
  const data: FollowData = follow.data || { sources: [] };
  const creds: CredentialData = credentials.data || { root: '', providers: [] };
  const sources = data.sources;

  /* Deleted sources should not keep holding counts: whenever the list is replaced, drop the IDs no longer in it. */
  useEffect(() => {
    setSelected((now) => {
      const next = keepSelected(now, sources);
      return next.size === now.size ? now : next;
    });
  }, [sources]);

  /* Pass an empty string for defaults: only this side knows what counts as default (`DEFAULT_SORT` and every tier's default direction live in
     the data layer), and the shell uses that to decide whether to write the URL, without keeping a second copy of the defaults table. */
  const go = (next: Partial<{ tab: TabKey; page: number; sort: SortKey; dir: SortDir }>) => {
    const nextSort = next.sort ?? sort;
    const nextDir = next.dir ?? dir;
    route({
      tab: next.tab ?? tab,
      page: next.page ?? page,
      sort: nextSort === DEFAULT_SORT ? '' : nextSort,
      dir: nextDir === SORT_DEFAULT_DIR[nextSort] ? '' : nextDir,
    });
  };

  const groups = groupByAuthor(sources);
  const broken = sources.filter(isBroken).length;
  const enabled = sources.filter((source) => source.enabled).length;
  const pending = (creds.providers || []).filter(
    (row) => row.requirement === 'required' && !credentialDone(row)).length;
  /* Counting by person: a performer often has two sources, a real-name page and a former stage-name page, both about the same person. Sources without a linked person each count as one. */
  const subscribed = new Set((feeds.data?.sources || []).map(
    (source) => source.entity_id ?? `source-${source.id}`)).size;

  return (
    <Page>
      {readOnly ? (
        <Note tone="warning" title="This machine is browse-only"
          extra={writerUrl
            ? <p className="text-body-2-regular">
                <ExternalLink href={writerUrl}>Go to the writer instance to manage follows</ExternalLink>
              </p>
            : undefined}>
          {readOnlyMessage}
        </Note>
      ) : null}

      {/* The first four cards are follows, the last two are JAV subscription sources: how many are subscribed, and how many fetched new releases are still unwatched. */}
      <div className={STAT_STRIP_SIX} aria-label="Follow overview">
        <Reading term="Follow creator" figure={groups.length} unit="people" />
        <Reading term="Enable the source" figure={enabled} unit={`/ ${sources.length}`} />
        <Reading term="Check failed" figure={broken} unit="sources" />
        <Reading term="Unwatched updates" figure={data.counts?.new || 0} unit="items" />
        <Reading term="JAV subscriptions" figure={subscribed} unit="people" />
        <Reading term="Unwatched new releases" figure={feeds.data?.unread || 0} unit="items" />
      </div>

      <Tabs selectedKey={tab} onSelectionChange={(key) => {
        const next = String(key);
        if (!isTab(next)) return;
        setSelected(new Set());
        setFeedSelected(new Set());
        setTab(next);
        go({ tab: next });
      }} className="flex flex-col gap-6">
        <PillAriaTabList aria-label="Follow management area" data-section-nav data-section-items
          className="flex max-w-full flex-nowrap overflow-x-auto">
          {TABS.map(([key, name]) => (
            <Tab key={key} id={key} data-pill-selected={tab === key ? '' : undefined} data-pill-variant="gray"
              className="cursor-pointer whitespace-nowrap">{name}</Tab>
          ))}
        </PillAriaTabList>

        <TabPanel id="list" className="flex flex-col gap-4">
          <FeedSources readOnly={readOnly} toast={toast}
            onAdd={() => { setTab('add'); go({ tab: 'add' }) }}
            selection={{ ids: feedSelected, onChange: setFeedSelected, onActivate: () => setSelected(new Set()) }} />
          <SourceList data={data} sort={sort} dir={dir} page={page} layout={layout}
            pageSize={pageSize} selected={selected} readOnly={readOnly} toast={toast}
            openFollow={openFollow}
            onAdd={() => { setTab('add'); go({ tab: 'add' }) }}
            onSort={(nextSort, nextDir) => {
              setSort(nextSort);
              setDir(nextDir);
              setPage(1);
              go({ sort: nextSort, dir: nextDir, page: 1 });
            }}
            onPage={(next) => { setPage(next); go({ page: next }) }}
            onSelected={(next) => { setSelected(next); setFeedSelected(new Set()) }}
            onLayout={(next) => {
              setLayout(next);
              setPage(1);
              savePreference({ layout: next });
              go({ page: 1 });
            }}
            onPageSize={(next) => {
              setPageSize(next);
              setPage(1);
              savePreference({ pageSize: next });
              go({ page: 1 });
            }} />
        </TabPanel>

        <TabPanel id="add" className="flex flex-col gap-8">
          <AddSource data={data} credentials={creds} readOnly={readOnly} toast={toast} />
          <AddFeed readOnly={readOnly} toast={toast}
            onAdded={() => { void feeds.refetch(); setTab('list'); go({ tab: 'list' }) }} />
          <AliasManager groups={data.author_aliases || []} readOnly={readOnly} toast={toast}
            suggestions={data.alias_suggestions || []} sources={data.sources} />
        </TabPanel>

        <TabPanel id="tags" className="flex flex-col gap-4">
          <TagManager scope="online" />
        </TabPanel>

      </Tabs>
      <div><ButtonLink variant="secondary" href="/settings/subscriptions">Sources and subscription settings{pending ? ` (${pending})` : ''}</ButtonLink></div>
    </Page>
  );
}
