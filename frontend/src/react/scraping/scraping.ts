/* Data contract and folding for the sources and credentials page. The endpoints are each declared exactly once here in `frontend/src`
 * (`tests/test_frontend_build.py` watches for it).
 *
 * 来源配置、连接检查、封面任务、amane 桥和自定义来源各自缓存；后台任务按自己的节律读取状态，
 * 不重取正在编辑的来源配置。 */
import { apiGet } from '../../api';
import { queryClient } from '../query';
import { CUSTOM_SOURCES_KEY, fetchCustomSources } from './custom-source-data';

export const SCRAPING_URL = '/api/scraping';
export const SCRAPING_SETTINGS_URL = '/api/scraping/settings';
export const SCRAPING_CHECK_URL = '/api/scraping/check';
export const SCRAPING_CHECK_ALL_URL = '/api/scraping/check-all';
export const SCRAPING_COVER_URL = '/api/scraping/cover';
export const AMANE_BRIDGE_URL = '/api/scraping/amane-bridge';
export const AMANE_BRIDGE_CHECK_URL = '/api/scraping/amane-bridge/check';
export const AMANE_BRIDGE_REBUILD_URL = '/api/scraping/amane-bridge/rebuild';

/** The source list shares this one key. */
export const SCRAPING_KEY = ['scraping'] as const;
/** Status of the background task that fetches covers. */
export const COVER_JOB_KEY = ['scraping', 'cover'] as const;
/** 全部来源连接检查那一趟后台任务的状态。 */
export const CHECK_ALL_KEY = ['scraping', 'check-all'] as const;
/** amane 桥的事实与重建任务的状态（`q_scraping_amane_bridge`）。 */
export const AMANE_BRIDGE_KEY = ['scraping', 'amane-bridge'] as const;

/** A scraping source. Fields follow `q_scraping` (`src/peach/web_scraping.py`). */
export interface Source {
  source: string;
  label: string;
  login: string;
  accepts_cookie: boolean;
  network: string;
  cookie_saved: boolean;
  /** On this machine, requests for this source are sent by the local browser and verification is passed by it directly (ADR-0065); when true, no Cookie is needed. */
  browser: boolean;
  cooldown_until?: number | null;
}

export interface ScrapingData {
  sources: Source[];
}

/** One result item from a connection check: the source page, plus the HD image URL some sources also have. */
export interface Check {
  label: string;
  ok: boolean;
  status?: number;
  message?: string;
  width?: number;
  height?: number;
  reason?: string;
  elapsed_s?: number;
  checked_at?: number;
}

/** 全部检查的报告口径，同 `peach check-sources`（`src/peach/source_preflight.py` 的 `OUTCOMES`）。 */
export type CheckOutcome = 'ok' | 'auth' | 'http' | 'cooldown' | 'network' | 'skipped';

/** 全部检查里的一项：比单项检查多了归类与它的中文名。 */
export interface ReportedCheck extends Check {
  outcome: CheckOutcome;
  outcome_label: string;
}

/** 全部检查里的一个来源。 */
export interface SourceReport {
  source: string;
  label: string;
  results: ReportedCheck[];
}

/** 全部检查的后台任务快照（`source_check_job`）。跑的时候 `results` 按完成先后追加，
 *  完成后换成按来源顺序排好的整份。`failed` 不计「未检查」。 */
export interface CheckAllJob {
  status: string;
  checked?: number;
  total?: number;
  results?: SourceReport[];
  failed?: number;
  elapsed_s?: number;
  completed_at?: number;
  error?: string;
}

/** 抓封面的后台任务快照（`scraping_cover_job`）。`status` 是 `idle|running|complete|failed`。 */
export interface CoverJob {
  status: string;
  job_id?: string;
  result?: string;
  error?: string;
  width?: number;
  height?: number;
}

/** The amane bridge's card (ADR-0043). `revision` is the amane sha pinned in the manifest, `version` the version of the
 *  locked entry; `installed` is whether the venv has an interpreter; `sites` are the sites the bridge opens to the source
 *  chain. `job` is the rebuild job's snapshot with `status` like `CoverJob`. When the install package lacks the bridge's
 *  manifest or scripts, `bundled` is false, `problem` says why, and `revision` and `version` are empty. */
export interface AmaneBridge {
  repository: string;
  license: string;
  bundled: boolean;
  problem: string;
  revision: string;
  version: string;
  installed: boolean;
  installed_version: string;
  python: string;
  sites: { source: string; label: string }[];
  job: CoverJob;
}

/** The size cap for Netscape cookie files. Anything larger is probably not a cookie file, so it gets rejected up front. */
export const COOKIE_TEXT_LIMIT = 256 * 1024;

export const fetchSources = (signal?: AbortSignal) => apiGet<ScrapingData>(SCRAPING_URL, signal);
export const fetchCoverJob = (signal?: AbortSignal) => apiGet<CoverJob>(SCRAPING_COVER_URL, signal);
export const fetchCheckAllJob = (signal?: AbortSignal) => apiGet<CheckAllJob>(SCRAPING_CHECK_ALL_URL, signal);
export const fetchAmaneBridge = (signal?: AbortSignal) => apiGet<AmaneBridge>(AMANE_BRIDGE_URL, signal);

/** First-screen sources and task snapshot are fetched concurrently, and the same cache is handed to each page section.
 *
 * Cover-scraping status counts as first screen too; the page must know on arrival whether a run is in progress to keep up with its progress, and the amane bridge
 * card likewise, since a rebuild may be running in the background. On abort `fetchQuery` throws `AbortError` back to the mounter, which
 * gives up on this attempt. */
export async function prefetchScraping(signal: AbortSignal): Promise<void> {
  await Promise.all([
    queryClient.fetchQuery({ queryKey: SCRAPING_KEY, queryFn: () => fetchSources(signal) }),
    queryClient.fetchQuery({ queryKey: COVER_JOB_KEY, queryFn: () => fetchCoverJob(signal) }),
    queryClient.fetchQuery({ queryKey: CHECK_ALL_KEY, queryFn: () => fetchCheckAllJob(signal) }),
    queryClient.fetchQuery({ queryKey: AMANE_BRIDGE_KEY, queryFn: () => fetchAmaneBridge(signal) }),
    queryClient.fetchQuery({ queryKey: CUSTOM_SOURCES_KEY, queryFn: () => fetchCustomSources(signal) }),
  ]);
}

/** One check result stated as one sentence: what it checked, whether it connected, how big the image is, what the server added.
 *
 * `label` in a result is what that hop queried; with a single hop it is the source page itself and the sentence need not repeat it. */
export function checkText(check: Check, sourceLabel: string): string {
  return `${sourceLabel}${check.label === 'source page' ? '' : ' HD images'}`
    + `: ${check.ok ? 'reachable' : 'unreachable'}`
    + (check.width ? ` · ${check.width} × ${check.height}` : '')
    + (check.elapsed_s !== undefined ? ` · ${check.elapsed_s.toFixed(2)} sec` : '')
    + (check.message ? `. ${check.message}` : '');
}
