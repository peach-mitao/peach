/* 卡片下方的磁链候选。可见时查询，提交复用云下载的幂等与失败分类。 */
import { useEffect, useRef, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, ButtonLink } from '@/components/base/buttons/button';
import { apiGet, apiSend, errorMessage } from '../../api';
import type { DownloadsSnapshot, DownloadSubmitResult } from '../bundle';
import { DOWNLOADS_KEY, DOWNLOADS_URL } from '../activity/downloads-panel';
import { LoadingDots } from '../components/loading-dots';
import { Note } from '../components/note';
import { busyProps, useAction } from '../settings/use-action';
import type { Want } from './wants';

export interface MagnetCandidate {
  id: string; protocol: 'magnet' | 'ed2k' | 'url'; info_hash: string; uri: string;
  name: string; size: string; files: string; date: string;
  attributes: string[]; source: string; source_url: string; origins: string[];
}
export interface MagnetResult {
  state: 'ready' | 'error' | 'busy' | 'unavailable'; items: MagnetCandidate[];
  error: string; checked_at: string | null; warnings?: string[];
}

export function WantMagnets({ want, readOnly, downloads, provider, toast }: {
  want: Want; readOnly: boolean; downloads?: DownloadsSnapshot; provider: string; toast(message: string): void;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(typeof IntersectionObserver === 'undefined');
  const [submitted, setSubmitted] = useState<string[]>([]);
  const action = useAction();
  const client = useQueryClient();
  useEffect(() => {
    if (!root.current || visible) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) { setVisible(true); observer.disconnect() }
    }, { rootMargin: '100px' });
    observer.observe(root.current);
    return () => observer.disconnect();
  }, [visible]);
  const query = useQuery({
    queryKey: ['want-magnets', want.id, want.code],
    queryFn: ({ signal }) => apiGet<MagnetResult>(`/api/wants/magnets?id=${want.id}`, signal),
    enabled: visible, retry: false, staleTime: 60_000,
    refetchOnWindowFocus: false,
    refetchInterval: (state) => state.state.data?.state === 'busy' ? 3000 : false,
  });
  const configured = downloads?.providers.find((row) => row.key === provider && row.configured);
  const add = (candidate: MagnetCandidate) => {
    if (readOnly || !downloads?.available || !configured || candidate.protocol !== 'magnet') return;
    void action.run(candidate.id, async (signal) => {
      const result = await apiSend<DownloadSubmitResult>(DOWNLOADS_URL, {
        magnet: candidate.uri, provider: configured.key, target: configured.target,
        code: want.code, title: want.title, origin: `wishlist:${want.id}`,
      }, 'POST', signal);
      if (!result.ok) throw new Error(result.task.failure_detail || result.task.failure_label || '添加下载失败');
      return result;
    }, (result) => {
      setSubmitted((current) => [...current, candidate.id]);
      toast(result.outcome === 'submitted' ? `已添加下载：${candidate.name}` : `已关联现有下载：${candidate.name}`);
      void client.invalidateQueries({ queryKey: DOWNLOADS_KEY });
    });
  };
  const copy = (candidate: MagnetCandidate) => {
    void action.run(`copy:${candidate.id}`, () => navigator.clipboard.writeText(candidate.uri),
      () => toast('已复制链接'));
  };
  const waiting = query.isFetching || query.data?.state === 'busy';
  const failure = query.error ? errorMessage(query.error) : query.data?.error;
  return (
    <div ref={root} data-want-magnets="" className="flex min-w-0 flex-col gap-3 border-t border-separator-border pt-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h4 className="text-body-medium text-text-primary">资源链接{query.data?.items.length ? ` · ${query.data.items.length}` : ''}</h4>
        <Button variant="secondary" size="small" {...busyProps(waiting)} onClick={() => {
          if (!waiting) void query.refetch();
        }}>重新查询</Button>
      </div>
      {waiting ? <LoadingDots label="正在查找资源链接…" /> : null}
      {failure ? <Note tone="error" title="资源链接未取得">{failure}</Note> : null}
      {query.data?.warnings?.map((warning) => <Note key={warning} tone="neutral">{warning}</Note>)}
      {query.data?.state === 'ready' && !query.data.items.length && !query.data.warnings?.length
        ? <Note tone="neutral">暂未找到资源链接。</Note> : null}
      {action.error ? <Note tone="error" title="操作未完成">{action.error}</Note> : null}
      {query.data?.items.length ? <ul className="flex min-w-0 flex-col gap-4">
        {query.data.items.map((candidate) => {
          const added = submitted.includes(candidate.id) || downloads?.tasks.some((task) => candidate.protocol === 'magnet' &&
            task.info_hash === candidate.info_hash && (task.cancellable || task.state === 'ingested'));
          return <li key={candidate.id} className="flex min-w-0 items-start justify-between gap-3 max-sm:flex-col">
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <p className="break-all text-body-2-medium text-text-primary">{candidate.name}</p>
              <p className="break-words text-caption-1-regular text-text-secondary">
                {[candidate.protocol === 'magnet' ? '磁链' : candidate.protocol === 'ed2k' ? 'ed2k' : '链接', candidate.source, candidate.size || '大小未知', candidate.files,
                  candidate.date ? `${candidate.source === 'JavDB 评论' ? '评论' : '收录'} ${candidate.date}` : '日期未知',
                  ...candidate.attributes].filter(Boolean).join(' · ')}
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-2">
              <ButtonLink data-button-link="" variant="secondary" size="small" href={candidate.source_url} target="_blank" rel="noopener noreferrer">链接来源</ButtonLink>
              <Button variant="secondary" size="small" {...busyProps(action.busy === `copy:${candidate.id}`)}
                onClick={() => copy(candidate)}>复制链接</Button>
              {candidate.protocol === 'magnet' ?
              <Button variant="secondary" size="small" disabled={readOnly || !downloads?.available || !configured || added}
                {...busyProps(action.busy === candidate.id)} onClick={() => add(candidate)}>
                {added ? '已添加' : '添加下载'}
              </Button> : null}
            </div>
          </li>;
        })}
      </ul> : null}
    </div>
  );
}
