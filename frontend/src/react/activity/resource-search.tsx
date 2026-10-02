/* 搜索只选择候选；真正提交由云下载表单确认。 */
import { useState } from 'react';
import { spinnerHtml } from '@peach/legacy/ui';
import { Button } from '@/components/base/buttons/button';
import { Input } from '@/components/base/input/input';
import { Select, SelectItem } from '@/components/base/select/select';
import { apiGet } from '../../api';
import { ErrorText, FieldLabel, Help } from '../settings/section';
import { useAction } from '../settings/use-action';

interface Candidate {
  id: string; uri: string; name: string; size: number; seeders: number; origins: string[];
  nature: string; resolution: number; codec: string; chinese: boolean; uncensored: boolean;
}
interface Result { state: string; items: Candidate[]; warnings: string[]; error: string }

function preferredGoal(reason: string | undefined): string {
  if (['中字', '中文字幕'].includes(reason?.trim() ?? '')) return 'chinese';
  if (['无码', '无码破解'].includes(reason?.trim() ?? '')) return 'uncensored';
  return 'quality';
}

export function ResourceSearch({ initialCode, reason, choose }: {
  initialCode: string; reason?: string; choose(uri: string, code: string): void;
}) {
  const [code, setCode] = useState(initialCode);
  const [goal, setGoal] = useState(() => preferredGoal(reason));
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [result, setResult] = useState<Result | null>(null);
  const [searched, setSearched] = useState('');
  const [selected, setSelected] = useState('');
  const action = useAction();
  const search = () => {
    if (!code.trim() || action.busy) return;
    const query = new URLSearchParams({ code: code.trim(), goal });
    if (min) query.set('min_size', String(Math.round(Number(min) * 1024 ** 3)));
    if (max) query.set('max_size', String(Math.round(Number(max) * 1024 ** 3)));
    setResult(null);
    setSelected('');
    const requested = code.trim();
    void action.run('search', (signal) => apiGet<Result>(`/api/resources/search?${query}`, signal), (next) => {
      setResult(next);
      setSearched(requested);
    });
  };
  return (
    <section aria-label="资源搜索" aria-busy={Boolean(action.busy)} className="flex min-w-0 flex-col gap-4">
      {reason ? <Help>版本目标：{reason}。可在下方调整搜索优先项；完整度与水印需要逐条复核。</Help> : null}
      <Input label="搜索资源" value={code} maxLength={80} placeholder="输入番号，按回车搜索"
        isDisabled={Boolean(action.busy)} onChange={setCode} onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.nativeEvent.isComposing) { event.preventDefault(); search() }
        }} />
      <div className="flex flex-col gap-1">
        <FieldLabel>优先寻找</FieldLabel>
        <Select aria-label="优先寻找" selectedKey={goal} isDisabled={Boolean(action.busy)}
          onSelectionChange={(key) => { if (key !== null) setGoal(String(key)) }}>
          <SelectItem id="quality">高清</SelectItem><SelectItem id="chinese">中字</SelectItem>
          <SelectItem id="uncensored">无码</SelectItem>
        </Select>
      </div>
      <div className="flex gap-3 max-sm:flex-col">
        <Input label="最小体积（GiB）" inputMode="decimal" value={min} onChange={setMin} />
        <Input label="最大体积（GiB）" inputMode="decimal" value={max} onChange={setMax} />
      </div>
      <Help>只查询已启用的自配索引器；最多显示 5 个有做种的候选。清晰度、字幕与无码标记取自来源标题。</Help>
      {action.busy ? <span role="status" dangerouslySetInnerHTML={{ __html: spinnerHtml('正在搜索资源') }} /> : null}
      {action.error ? <ErrorText>{action.error}</ErrorText> : null}
      {result?.error ? <Help role="status">{result.error}</Help> : null}
      {result?.state === 'ready' && !result.items.length ? <Help role="status">没有符合条件的资源。</Help> : null}
      {result?.warnings.map((warning) => <Help key={warning}>{warning}</Help>)}
      {result?.items.length ? <ul className="flex min-w-0 flex-col gap-4">
        {result.items.map((item) => <li key={item.id} className="flex min-w-0 flex-col gap-2 border-t border-separator-border pt-4">
          <p className="break-words text-body-2-medium text-text-primary">{item.name}</p>
          <Help>{[`${(item.size / 1024 ** 3).toFixed(2)} GiB`, `${item.seeders} 个做种`,
            item.resolution ? `${item.resolution}p` : '', item.codec, item.chinese ? '中字' : '',
            item.uncensored ? '无码' : '', item.origins.join('、'), item.nature].filter(Boolean).join(' · ')}</Help>
          <div><Button type="button" variant="secondary" onClick={() => {
            choose(item.uri, searched); setSelected(item.id);
          }}>{selected === item.id ? '已填入磁力' : '选用此资源'}</Button></div>
        </li>)}
      </ul> : null}
    </section>
  );
}
