/* Top-bar search (`search` island, ADR-0031 step 11b): data shape and menu model.
 *
 * The input `#q` is the shell's static node; the island does not render it and only attaches events: it must accept typing
 * before the React bundle arrives, and the shell's routing, narrow-screen open/close and the afterimage on clear
 * (`clearSearchField`) read and write it directly. The dropdown `#searchMenu`'s contents, search history, suggestions,
 * per-character completion, keyboard selection and submit all belong to the island; after submit, navigation returns to the
 * shell (`actions.search`), going through the shell's route functions like opening a video or profile page.
 *
 * The dropdown's open/close motion is the site-wide menu pair (legacy `presentMenu`/`dismissMenu`, passed in via `helpers`):
 * `hidden` always means "not visible", and the shell's global Escape and outside-click dismiss still read it. */

/** A small cover in the suggestions: the video itself, or a recent work to the right of a name row. */
export interface SuggestCard {
  id: number;
  code?: string | null;
  [key: string]: unknown;
}

export interface SuggestItem {
  value: string;
  /** When the hit is an alias, that alias; it trails the general name as a footnote. */
  matched?: string | null;
  n?: number;
  /** The video category: clicking opens details, not a search term. */
  id?: number;
  who?: string | null;
  code?: string | null;
  title?: string | null;
  card?: SuggestCard | null;
  /** The person category: fit as many recent videos in the row as it allows. */
  works?: SuggestCard[];
  agency?: string | null;
  href?: string;
  avatarHtml?: string;
  /** 作品那一类：署名人的头像，画在署名前面。 */
  whoAvatarHtml?: string;
  subtitle?: string;
  followMedia?: 'videos' | 'images';
  mediaIndex?: number | null;
  [key: string]: unknown;
}

export interface SuggestGroup {
  kind: string;
  label: string;
  total?: number;
  items: SuggestItem[];
  href?: string;
  action?: string;
  /** 推荐栏里这一组还没取到：照最终版式先占位。 */
  pending?: boolean;
  /** 推荐栏一组取到的整池；`items` 是从 `offset` 起的一页，一页 `size` 条。「换一批」在池里翻页。 */
  pool?: SuggestItem[];
  offset?: number;
  size?: number;
}

/** 一栏推荐：各组，以及还没聚焦时占位里轮换的推荐词（聚焦时另按当前筛选取 `pool`）。 */
export interface Recommendations {
  groups: SuggestGroup[];
  words: string[];
}

export interface SuggestTab {
  kind: string;
  label: string;
  total?: number;
}

export interface SuggestResponse {
  q?: string;
  groups?: SuggestGroup[];
}

/** Page jump and open: both go back to the shell, through its routing functions. */
export interface SearchActions {
  /** Search by this word: the shell closes details, writes `?q=` and refetches the catalog. */
  search(query: string): void;
  openItem(id: number): void;
  openEntity(kind: string, name: string): void;
  openPath?(path: string): void;
  openFollow?(id: number, media: 'videos' | 'images', mediaIndex: number | null): void;
}

/** The pieces still handed over by the legacy layer. */
export interface SearchHelpers {
  /** The suggestion pool for empty input: the same filters as the current catalog, keeping only terms that actually return results (`catalogSuggestions`). */
  pool(): Promise<string[]>;
  /** 空输入时的推荐栏，一次取齐（`/api/search/recommendations`）。 */
  recommendations?(): Promise<Recommendations>;
  /** 推荐栏一组都还没取到时的占位，版式与取齐之后相同。 */
  pendingRecommendations?(): SuggestGroup[];
  /** 输入框的占位字换一句，带动效（`rollPlaceholder`）；返回撤销函数。缺省时直接改。 */
  rollPlaceholder?(input: HTMLInputElement, next: string): () => void;
  /** 小封面那一格（卡片的 `.pic`）连同里面那张图（`coverImage` 与 JAV 默认封面那套取景）；两样都没有是「无预览」。 */
  coverHtml(card: SuggestCard | null | undefined): string;
  present(menu: HTMLElement): void;
  dismiss(menu: HTMLElement): void;
  /** On narrow screens the tab row's right edge fades when it overflows (`wireHorizontalScroller`). */
  wireScroller(row: Element | null): void;
  /** The input's text changed: which phrase the leftover value records when leaving search results is kept by the shell (`rememberSearchValue`). */
  typed(input: HTMLInputElement): void;
  /** Composition starts: dispersing afterimages collapse on the spot. */
  composing(): void;
  /** Escape with text present: clears and leaves a ghost trace (`clearSearchField`). */
  clearField(input: HTMLInputElement): void;
}

/** The shell's imperative entry point, handed out by `expose` on mount and returned as null on unmount. */
export interface SearchApi {
  /** Collapse the dropdown and clear keyboard selection. Global Escape, outside clicks, and blur all go through here. */
  close(): void;
}

export interface SearchProps {
  /** The top bar's static `#q`. */
  input: HTMLInputElement;
  /** How many search history entries to keep (the settings page item); 0 means neither recording nor display. */
  historyLimit: number;
  actions: SearchActions;
  helpers: SearchHelpers;
  expose(api: SearchApi | null): void;
}

/** Completion queried per keystroke: typing again within 150 ms replaces the previous schedule, so only one request goes out. */
export const SUGGEST_DEBOUNCE = 150;
/** Multi-category previews take five per category; single-category previews and category tabs show twenty each. */
export const SUGGEST_EACH = 5;
export const SUGGEST_ONE_KIND = 20;
/** The categories with faces open the profile page; tags have no profile page, so clicking one still searches by that term. */
export const SUGGEST_PROFILE_KINDS = new Set(['performer', 'creator', 'studio', 'agency', 'series']);
/** The dropdown splits into two columns by width: identity and terms on the left, video cover cells on the right. */
export const SUGGEST_RIGHT_KINDS = new Set(['asset', 'jav', 'post', 'photo', 'release']);
/** 推荐栏一组翻到下一页；翻到头接着从池首取，一页总是摆满。 */
export function nextPage(group: SuggestGroup): SuggestGroup {
  const pool = group.pool ?? [];
  const size = Math.min(group.size ?? group.items.length, pool.length);
  if (pool.length <= size) return group;
  const offset = ((group.offset ?? 0) + size) % pool.length;
  return { ...group, offset, items: Array.from({ length: size }, (_, index) => pool[(offset + index) % pool.length]!) };
}

/** 推荐栏人物那几组取到之前占几行。 */
export const PENDING_PEOPLE = 3;
/** 空输入时推荐几条。 */
export const PICKS = 5;

/** Name comparison always folds full/half width and case, same as the legacy layer's `foldName`. */
export const fold = (value: unknown): string => String(value ?? '').normalize('NFKC').trim().toLocaleLowerCase();

/** A dropdown row the keyboard can select. `index` is its order across the whole column; the arrow keys follow it. */
export type SearchOption =
  | { index: number; type: 'history' | 'pick'; value: string }
  | { index: number; type: 'more'; value: string; total: number }
  | { index: number; type: 'suggest'; value: string; kind: string; item: SuggestItem };

export interface MenuSection {
  kind?: string;
  label: string;
  options: SearchOption[];
  more?: SearchOption;
  href?: string;
  action?: string;
  /** 推荐栏里还没取到的一组：画几格占位。 */
  pending?: number;
  /** 标题上带「换一批」。 */
  shuffle?: boolean;
}

export interface MenuModel {
  /** Tabs for when more than one category hits; with a single category, "All" and that category are the same screen. */
  tabs: SuggestTab[] | null;
  /** The search history listed at the top when there is input and no tab is selected. */
  recent: MenuSection | null;
  /** Two columns: identity and terms on the left, videos on the right. With empty input, two groups of short terms from history and recommendations. */
  left: MenuSection[];
  right: MenuSection[];
  /** This word's completions came back with nothing: the field shows a "nothing found" line, so an empty result is distinguishable from not having searched yet. */
  empty: boolean;
  options: SearchOption[];
}

export interface MenuInput {
  query: string;
  history: readonly string[];
  /** The recommendations shuffled at the moment of drawing (`shufflePicks`). */
  picks: readonly string[];
  /** Only completions for the current word count; a slower response for the previous word is not drawn. */
  suggestFor: string;
  groups: readonly SuggestGroup[];
  tabs: readonly SuggestTab[];
  kind: string;
  recommendations?: readonly SuggestGroup[];
}

/** Computes what the dropdown holds from a moment's state, plus the keyboard up and down order. Tabs govern the whole column, so they sort first; once a category is chosen,
 *  search history yields. */
export function menuModel({ query, history, picks, suggestFor, groups, tabs, kind, recommendations = [] }: MenuInput): MenuModel {
  let index = 0;
  const options: SearchOption[] = [];
  const add = <T extends Omit<SearchOption, 'index'>>(option: T): SearchOption => {
    const next = { ...option, index: index++ } as SearchOption;
    options.push(next);
    return next;
  };
  // With input present, history filters along: the user is hunting for a term right now, not reviewing what they searched.
  const matching = history.filter((value) => !query || fold(value).includes(fold(query)));
  if (!query) {
    if (recommendations.length) {
      // 还没取到的那组按最终条数占位：人三行、作品一排五格，取到时原地填上，栏不跳。
      // 池里比一页多才有「换一批」：翻不出别的就不摆这枚图标。
      const section = ({ pending, pool, offset: _offset, size: _size, ...group }: SuggestGroup): MenuSection => ({ ...group,
        options: group.items.map(item => add({ type: 'suggest', value: item.value, kind: group.kind, item })),
        pending: pending ? (SUGGEST_RIGHT_KINDS.has(group.kind) ? SUGGEST_EACH : PENDING_PEOPLE) : undefined,
        shuffle: (pool?.length ?? 0) > group.items.length || undefined,
      });
      // 搜索记录排在左栏最下面：它比推荐晚到，排在末尾到了也不把上面的往下推。键盘上下按画出来的
      // 次序走，左栏走完再到右栏，所以编号也按这个次序给。
      const left = recommendations.filter(group => !SUGGEST_RIGHT_KINDS.has(group.kind)).map(section);
      if (matching.length) left.push({ label: '搜索记录', options: matching.map(value => add({ type: 'history', value })) });
      const right = recommendations.filter(group => SUGGEST_RIGHT_KINDS.has(group.kind)).map(section);
      return { tabs: null, recent: null, left, right, empty: false, options };
    }
    const recent = matching.length ? { label: 'Search history', options: matching.map((value) => add({ type: 'history', value })) } : null;
    const suggested = picks.length ? { label: 'Recommended', options: picks.map((value) => add({ type: 'pick', value })) } : null;
    return { tabs: null, recent: null, left: recent ? [recent] : [], right: suggested ? [suggested] : [], empty: false, options };
  }
  const fresh = suggestFor === query;
  const recent = !kind && matching.length
    ? { label: 'Search history', options: matching.map((value) => add({ type: 'history', value })) } : null;
  // Once a category is chosen, render only that category; while the full fetch for it is still in flight, fill in with the entries from 'All'.
  const shown = (fresh ? groups : []).filter((group) => !kind || group.kind === kind);
  const section = (group: SuggestGroup): MenuSection => {
    const rows = group.items.map((item) => add({ type: 'suggest', value: item.value, kind: group.kind, item }));
    const more = group.kind === 'asset' && (group.total ?? 0) > rows.length
      ? add({ type: 'more', value: query, total: group.total! }) : undefined;
    return { kind: group.kind, label: group.label, options: rows, more };
  };
  const left = shown.filter((group) => !SUGGEST_RIGHT_KINDS.has(group.kind)).map(section);
  const right = shown.filter((group) => SUGGEST_RIGHT_KINDS.has(group.kind)).map(section);
  const empty = fresh && !shown.some((group) => group.items.length);
  return { tabs: fresh && tabs.length > 1 ? [...tabs] : null, recent, left, right, empty, options };
}

/** With empty input, a few recommendations are shuffled out of the word pool; searched terms are not recommended again. The shuffle happens once per dropdown render;
 *  deleting a record is not a render, so the batch is fixed at the moment of drawing, and a deleted record stays out of the recommendations even if it is still in the pool. */
export function shufflePicks(pool: readonly string[], history: readonly string[],
  random: () => number = Math.random): string[] {
  const out = [...pool];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j]!, out[i]!];
  }
  return out.filter((value) => !history.some((h) => fold(h) === fold(value))).slice(0, PICKS);
}
