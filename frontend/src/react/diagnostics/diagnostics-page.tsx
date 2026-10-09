import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { RiFileListLine } from '@remixicon/react';
import { Button } from '@/components/base/buttons/button';
import { errorMessage } from '../../api';
import { ErrorExcerpt } from '../activity/error-excerpt';
import { EmptyState } from '../components/empty-state';
import { useOverlayScrollbar } from '../components/overlay-scrollbar';
import { Note } from '../components/note';
import { Disclosure, Fact, FactList, Section, Stack } from '../settings/section';
import { busyProps, useAction } from '../settings/use-action';
import { DIAGNOSTICS_KEY, fetchDiagnostics, type DiagnosticCheck, type LibraryGroup } from './diagnostics';

const STATUS: Record<string, string> = { ok: '正常', warning: '需检查', failed: '需处理', unknown: '未取得', disabled: '未配置' };
const SECTIONS = [
  ['媒体库与挂载', ['media_mounts', 'data_root']],
  ['数据库与迁移', ['database', 'schema']],
  ['工具', ['ffmpeg']],
  ['配置与访问', ['configured', 'security', 'port', 'version']],
  ['后台任务', ['tasks']],
] as const;
const moment = (value: string) => new Date(value).toLocaleString();

export interface DiagnosticsProps {
  navigate(path: string): void; configure(section: string): void; openItem(id: number): void;
  receipt(message: string): void;
}

function Check({ name, check, navigate, configure }: Pick<DiagnosticsProps, 'navigate' | 'configure'> & {
  name: string; check: DiagnosticCheck;
}) {
  const section = name === 'security' ? '网络与访问' : name === 'configured' ? '通用' : '媒体';
  return <div className="flex flex-col gap-2 border-b border-separator-border py-4 pr-3 last:border-b-0">
    <div className="flex flex-wrap items-center justify-between gap-2">
      <h3 className="text-body-medium text-text-primary">{check.label}</h3>
      <span className="text-body-2-regular text-text-secondary">{STATUS[check.status] ?? '未取得'}</span>
    </div>
    <p className="text-body-regular text-text-primary break-words">{check.reason}</p>
    {check.action ? <p className="text-body-2-regular text-text-secondary">{check.action}</p> : null}
    {check.target ? <div><Button size="small" variant="secondary" onClick={() => check.target === '/configuration'
      ? configure(section) : navigate(check.target!)}>{check.target === '/configuration' ? `打开${section}配置` : '查看任务'}</Button></div> : null}
  </div>;
}

function HealthList({ group, openItem, receipt }: Pick<DiagnosticsProps, 'openItem' | 'receipt'> & { group: LibraryGroup }) {
  const action = useAction();
  const scroll = useOverlayScrollbar<HTMLUListElement>();
  const list = group.items.map(row => row.code || `作品 #${row.id}`).join('\n');
  return <Disclosure summary={`${group.label} · ${group.count === null ? '未取得' : `${group.count.toLocaleString()} 项`}`}>
    {group.count === null ? <Note tone="neutral">清单未取得，请重新检查。</Note> : !group.items.length
      ? <EmptyState icon={RiFileListLine} title="清单为空" shell="plain">没有需要处理的作品。</EmptyState>
      : <Stack>
          <div className="flex flex-wrap items-center justify-between gap-2">
            {group.truncated ? <span className="text-body-2-regular text-text-secondary">当前显示 {group.items.length.toLocaleString()} 项</span> : null}
            <Button size="small" variant="secondary" {...busyProps(action.busy === 'copy')} onClick={() => void action.run('copy',
              () => navigator.clipboard.writeText(list), () => receipt('已复制清单'))}>复制当前清单</Button>
          </div>
          {action.error ? <Note tone="error">{action.error}</Note> : null}
          <div className="relative"><ul ref={scroll} className="flex max-h-80 flex-col gap-2 overflow-y-auto">
            {group.items.map(row => <li key={row.id}><Button size="small" variant="ghost" onClick={() => openItem(row.id)}>{row.code || `作品 #${row.id}`}</Button></li>)}
          </ul></div>
        </Stack>}
  </Disclosure>;
}

export function DiagnosticsPage(props: DiagnosticsProps) {
  const query = useQuery({ queryKey: DIAGNOSTICS_KEY, queryFn: ({ signal }) => fetchDiagnostics(signal), staleTime: 10_000 });
  const action = useAction();
  const [refreshError, setRefreshError] = useState('');
  const refresh = () => void action.run('refresh', async () => {
    const response = await query.refetch();
    if (response.error) throw response.error;
    return response.data;
  }, () => setRefreshError(''), cause => setRefreshError(errorMessage(cause)));
  const data = query.data;
  if (!data) return <div className="ui-configpage"><Note tone="error" title="诊断读取失败"
    action={<Button variant="secondary" onClick={refresh} {...busyProps(action.busy === 'refresh')}>重新检查</Button>}>
    {query.error ? errorMessage(query.error) : '诊断报告未取得。'}
  </Note></div>;
  return <div className="ui-configpage flex flex-col gap-6">
    <div className="flex justify-end"><Button variant="secondary" onClick={refresh} {...busyProps(action.busy === 'refresh')}>重新检查</Button></div>
    {refreshError ? <Note tone="error">{refreshError}</Note> : null}
    <Section title="库健康"><Stack>
      {data.library.issue_at ? <p className="text-body-2-regular text-text-secondary">处理记录 · {moment(data.library.issue_at)}</p> : null}
      {Object.entries(data.library.groups).map(([key, group]) => <HealthList key={key} group={group} {...props} />)}
    </Stack></Section>
    {SECTIONS.map(([title, keys]) => <Section key={title} title={title}>
      {keys.map(key => data.checks[key] ? <Check key={key} name={key} check={data.checks[key]!} {...props} /> : null)}
    </Section>)}
    <Section title="来源会话"><Stack>
      {data.sources.map(source => <div key={source.source} className="flex flex-col gap-2">
        <h3 className="text-body-medium text-text-primary">{source.label} · {STATUS[source.status] ?? '未取得'}</h3>
        {/* 原因常是整段堆栈：平时只露异常那一行，全文收在「查看详情」后面。 */}
        <ErrorExcerpt text={source.reason} className="text-body-regular text-text-primary" />
        <FactList>
          <Fact term="上次解析成功">{source.last_success_at ? moment(source.last_success_at) : '未取得'}</Fact>
          <Fact term="冷却截止">{source.cooldown_until ? moment(source.cooldown_until) : '未在冷却'}</Fact>
        </FactList>
      </div>)}
      <div><Button size="small" variant="secondary" onClick={() => props.navigate('/scraping')}>打开来源和凭证</Button></div>
    </Stack></Section>
  </div>;
}
