/* 首次设置表单。题目、默认值、显隐与随平台变化的文案来自 `GET /api/setup/questions`；
 * 分组标题、按钮与「完成设置后」那一组是页面骨架，写在这里。
 *
 * 提交走 `POST /api/setup`。400 的 `errors` 按题目 key 写回原位：媒体目录按行对齐，整表不成立
 * 的那一句放在目录区上方；高级设置里任一项出错就展开它；访问密码出错时开关保持打开。已填的
 * 内容都留在原地，焦点落到第一个标错的框。 */
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Radio } from 'react-aria-components';
import { RiAddLine } from '@remixicon/react';

import { Button } from '@/components/base/buttons/button';
import { IconButton } from '@/components/base/buttons/icon-button';
import { Checkbox } from '@/components/base/checkbox/checkbox';
import { Input } from '@/components/base/input/input';
import { Label } from '@/components/base/input/label';
import { Switch } from '@/components/base/switch/switch';
import { Select, SelectItem } from '@/components/base/select/select';

import { randomId } from '../../../core/random-id';
import { Note } from '../../components/note';
import { SEGMENT, SEGMENTED_TRACK, SegmentedRadioGroup } from '../../components/segmented';
import { busyProps } from '../../settings/busy-props';
import {
  FolderField, FolderFieldLine, FolderRow, FolderSearchIcon, isCloudSource, MediaReadPolicy, MediaReadPolicyHelp,
  SourceSelect, useFolderRows,
} from '../../settings/folder-rows';
import { libraryAutoChoice } from '../../settings/library-icon-picker';
import { PasswordPair } from '../../settings/password-pair';
import { isLoopbackProxy, ProxyAddressField, ProxyModeSelect } from '../../settings/peach-proxy-fields';
import { ReportingChoices } from '../../settings/remote-reporting-settings';
import { Disclosure, ErrorText, ExternalLink, Help, SourceMark } from '../../settings/section';
import { CardGroup, GroupTitle } from '../auth-card';
import {
  describeFailure, pickFolder, SetupRequestError, submitSetup,
  type SetupDone, type SetupErrors, type SetupFolder, type SetupQuestion, type SetupQuestions, type SetupSubmission,
} from './setup-api';

/** 这几项出错时「高级设置」自己展开：错在折叠里的框，人看不见。 */
const ADVANCED_KEYS = ['host', 'port', 'mdns_name'];

/** 媒体目录那一项的错误：与行数对得上就按行写回，否则是整表一句。 */
function folderErrors(value: SetupErrors[string], count: number): { rows: string[]; table: string } {
  if (Array.isArray(value)) {
    return value.length === count ? { rows: value, table: '' } : { rows: [], table: value.filter(Boolean).join(' ') };
  }
  return { rows: [], table: value ?? '' };
}

function scanLabel(paths: string[]): string {
  if (!paths.length) return '完成设置后扫描并补全资料';
  if (paths.length === 1) return `完成设置后扫描并补全资料：${paths[0]}`;
  return `完成设置后扫描这 ${paths.length} 个文件夹并补全资料`;
}

const text = (value: SetupErrors[string]) => (Array.isArray(value) ? value.filter(Boolean).join(' ') : value ?? '');

export function SetupForm({ setup, onDone }: { setup: SetupQuestions; onDone: (done: SetupDone) => void }) {
  const media = setup.questions.find((question) => question.input === 'folders');
  const dataRoot = setup.questions.find((question) => question.input === 'folder');
  const fields = setup.questions.filter((question) => question.input !== 'folders');
  const others = fields.filter((question) => question.input !== 'folder');
  const sources = setup.media_sources.map(({ value, label }) => [value, label] as const);
  const blank = (path = ''): SetupFolder => ({ path, location: setup.media_source_default, root: '', library_id: randomId(), library: '', cost: setup.media_source_default === 'local' ? 'free' : '' });
  const folders = useFolderRows<SetupFolder>({
    initial: () => [blank(media?.default ?? '')], blank: () => blank(), pickFolder, describe: describeFailure,
    focusAfterPick: true,
  });
  const [values, setValues] = useState<Record<string, string>>(
    () => Object.fromEntries(fields.map((question) => [question.key, question.default])));
  const [pickingData, setPickingData] = useState(false);
  const [pickError, setPickError] = useState('');
  const [accessOn, setAccessOn] = useState(setup.access_enabled);
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [scanNow, setScanNow] = useState(setup.scan_now);
  const [historyGuide, setHistoryGuide] = useState(setup.history_guide);
  const [reporting, setReporting] = useState(setup.remote_reporting);
  const [proxyMode, setProxyMode] = useState(setup.peach_proxy?.mode ?? 'environment');
  const [proxyAddress, setProxyAddress] = useState('');
  const [errors, setErrors] = useState<SetupErrors>({});
  const [tableError, setTableError] = useState('');
  const [failure, setFailure] = useState('');
  const [busy, setBusy] = useState(false);
  const [requireReadPolicy, setRequireReadPolicy] = useState(false);
  // 每次因为错误要展开就换一个 key：折叠按初始状态展开，已填的值都在这一层的 state 里。
  const [advancedOpenings, setAdvancedOpenings] = useState(0);
  const form = useRef<HTMLFormElement>(null);
  const addButton = useRef<HTMLButtonElement>(null);
  // 写回之后焦点交给第一个标错的框。错误在 await 之后才到，React 不在点击那一刻同步提交，
  // 所以等这一轮落到 DOM 上再找，不赌下一帧之前一定画完。
  const [errorRound, setErrorRound] = useState(0);
  useEffect(() => {
    if (errorRound) form.current?.querySelector<HTMLElement>('input[aria-invalid="true"]')?.focus();
  }, [errorRound]);
  // 写回的错误放进框下的提示：`role="alert"` 让读屏在它出现时播报一次，提示本身仍由
  // `aria-describedby` 挂在框上，文字在页面上只有这一份。`key` 跟着提交轮次换，同一句错误
  // 再提交一次也会重新播报。
  const announce = (message: string | undefined) =>
    message ? <span key={errorRound} role="alert">{message}</span> : undefined;

  const visible = (question: SetupQuestion) =>
    !question.visible_when || Object.entries(question.visible_when).every(([key, value]) => values[key] === value);
  const setValue = (key: string, value: string) => setValues((current) => ({ ...current, [key]: value }));

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy) return;
    const missing = folders.rows.findIndex((row) => !row.cost);
    if (missing >= 0) {
      setRequireReadPolicy(true);
      requestAnimationFrame(() => form.current?.querySelector<HTMLButtonElement>(`[data-media-read-policy="${missing}"] button`)?.focus());
      return;
    }
    setBusy(true);
    setFailure('');
    const submission: SetupSubmission = {
      media_dir: folders.rows, access_enabled: accessOn, scan_now: scanNow, history_guide: historyGuide,
      peach_proxy: { mode: proxyMode, proxy: proxyMode === 'proxy' ? proxyAddress : '' },
      ...(reporting ? { remote_reporting: { usage: reporting.usage, errors: reporting.errors } } : {}),
    };
    // 隐藏的题不提交，服务端按题目默认值补上。
    for (const question of fields) if (visible(question)) submission[question.key] = values[question.key] ?? '';
    if (accessOn) Object.assign(submission, { access_password: password, access_confirm: confirmation });
    try {
      onDone(await submitSetup(submission));
    } catch (cause) {
      if (cause instanceof SetupRequestError && cause.status === 400 && cause.errors) {
        const found = cause.errors;
        const { rows, table } = folderErrors(found.media_dir, folders.rows.length);
        folders.setErrors(rows);
        setTableError(table);
        setErrors(found);
        if (ADVANCED_KEYS.some((key) => found[key])) setAdvancedOpenings((count) => count + 1);
        if (found.access_password) setAccessOn(true);
        setErrorRound((count) => count + 1);
      } else {
        setFailure(describeFailure(cause));
      }
    } finally {
      setBusy(false);
    }
  };

  const field = (question: SetupQuestion) => {
    const error = text(errors[question.key]);
    const help = question.help.join('');
    if (question.input === 'choice') {
      const labelId = `setup-${question.key}-label`;
      return (
        <div key={question.key} className="flex flex-col gap-1.5">
          <Label id={labelId} elementType="span">{question.label}</Label>
          <SegmentedRadioGroup aria-labelledby={labelId} orientation="horizontal" className={SEGMENTED_TRACK}
            value={values[question.key] ?? question.default} onChange={(value) => setValue(question.key, value)}>
            {(question.options ?? []).map((option) => (
              <Radio key={option.value} value={option.value} className={SEGMENT}>{option.label}</Radio>
            ))}
          </SegmentedRadioGroup>
          {help ? <Help>{help}</Help> : null}
          {error ? <ErrorText key={errorRound}>{error}</ErrorText> : null}
        </div>
      );
    }
    const Suffix = () => <span className="shrink-0 pr-1 text-body-regular text-text-secondary">{question.suffix}</span>;
    return (
      <Input key={question.key} id={`f-${question.key}`} label={question.label} isRequired={question.required}
        inputMode={question.input === 'number' ? 'numeric' : undefined} autoComplete="off" spellCheck="false"
        value={values[question.key] ?? ''} onChange={(value) => setValue(question.key, value)}
        leadingAddon={question.prefix
          ? <span className="shrink-0 pl-1 text-body-regular text-text-secondary">{question.prefix}</span>
          : undefined}
        trailingIcon={question.suffix ? Suffix : undefined}
        validationBehavior="aria" isInvalid={Boolean(error)} hint={announce(error) ?? (help || undefined)} />
    );
  };

  const pickDataRoot = async () => {
    if (!dataRoot || pickingData) return;
    setPickingData(true);
    setPickError('');
    try {
      const path = await pickFolder(values[dataRoot.key] ?? '');
      if (path) setValue(dataRoot.key, path);
    } catch (cause) {
      setPickError(describeFailure(cause));
    } finally {
      setPickingData(false);
    }
  };
  const dataRootError = dataRoot ? text(errors[dataRoot.key]) || pickError : '';

  const filled = folders.rows.map((row) => row.path.trim()).filter(Boolean);
  const cloud = folders.rows.some((row) => isCloudSource(row.location));
  return (
    <form ref={form} noValidate onSubmit={(event) => void submit(event)} aria-labelledby="auth-card-title"
      className="flex flex-col gap-6">
      {media ? (
        <CardGroup first labelledBy="setup-media-title">
          <GroupTitle id="setup-media-title">
            {media.label}<span aria-hidden className="ml-0.5 text-text-error-primary">*</span>
          </GroupTitle>
          {tableError ? <ErrorText key={errorRound}>{tableError}</ErrorText> : null}
          <div role="group" aria-labelledby="setup-media-title" className="flex flex-col gap-3">
            {folders.rows.map((row, index) => (
              <FolderRow key={index} label={`${media.label} ${index + 1}`} path={row.path}
                onPath={(path) => folders.edit(index, { path })} error={announce(folders.errors[index])}
                inputRef={folders.inputRef(index)} picking={folders.picking === index}
                onPick={() => void folders.pick(index)}
                onRemove={folders.rows.length > 1 ? () => { folders.remove(index); addButton.current?.focus(); } : undefined}>
                <FolderFieldLine>
                  <SourceSelect index={index} value={row.location} options={sources}
                    onChange={(location) => folders.edit(index, { location, cost: location === 'local' ? 'free' : '' })} />
                  <MediaReadPolicy index={index} cost={row.cost ?? ''}
                    error={requireReadPolicy && !row.cost ? '请选择媒体读取策略' : undefined}
                    onChange={(cost) => folders.edit(index, { cost })} />
                </FolderFieldLine>
                <FolderFieldLine>
                  <FolderField label="所属媒体库" className="w-full @lg:w-60">
                    <Select className="w-full" aria-label={`目录所属媒体库 ${index + 1}`} selectedKey={row.library_id}
                      renderValue={<span className="flex min-w-0 items-center gap-2"><SourceMark mark={libraryAutoChoice(row.location)[0]} /><span className="truncate">{row.library || '未命名媒体库'}</span></span>}
                      onSelectionChange={key => {
                        const other = folders.rows.find(value => value.library_id === key);
                        folders.edit(index, { library_id: other?.library_id || randomId(), library: other?.library || '' });
                      }}>
                      {[...new Map(folders.rows.map(value => [value.library_id, value])).values()].map(value => (
                        <SelectItem key={value.library_id} id={value.library_id}>{value.library || '未命名媒体库'}</SelectItem>
                      ))}
                      <SelectItem id="new">新建媒体库</SelectItem>
                    </Select>
                  </FolderField>
                  <FolderField label="媒体库名称" className="w-full min-w-32 @lg:w-auto @lg:flex-1">
                    <Input className="w-full" aria-label={`媒体库名称 ${index + 1}`} placeholder="媒体库名称" maxLength={80}
                      value={row.library || ''} onChange={library => folders.rows.forEach((other, i) => {
                        if (other.library_id === row.library_id) folders.edit(i, { library });
                      })} />
                  </FolderField>
                </FolderFieldLine>
              </FolderRow>
            ))}
          </div>
          <Button ref={addButton} variant="secondary" leadingIcon={RiAddLine} className="self-start" onClick={folders.add}>
            添加文件夹
          </Button>
          {cloud ? (
            <>
              <MediaReadPolicyHelp />
              <Help>{setup.cloud.help}<ExternalLink href={setup.cloud.link.url}>{setup.cloud.link.label}</ExternalLink></Help>
              {setup.cloud.dependencies.map((dependency) => (
                <Help key={dependency.name}>
                  {dependency.message}<ExternalLink href={dependency.download_url}>{dependency.download_label}</ExternalLink>
                </Help>
              ))}
            </>
          ) : null}
          {media.help.map((line) => <Help key={line}>{line}</Help>)}
        </CardGroup>
      ) : null}

      {dataRoot ? (
        <CardGroup labelledBy="setup-data-title">
          <GroupTitle id="setup-data-title">
            {dataRoot.label}<span aria-hidden className="ml-0.5 text-text-error-primary">*</span>
          </GroupTitle>
          <div className="flex items-start gap-2">
            <Input className="min-w-0 flex-1" id={`f-${dataRoot.key}`} aria-label={dataRoot.label} isRequired
              autoComplete="off" spellCheck="false" value={values[dataRoot.key] ?? ''}
              onChange={(value) => setValue(dataRoot.key, value)}
              validationBehavior="aria" isInvalid={Boolean(dataRootError)} hint={announce(dataRootError)} />
            <IconButton icon={FolderSearchIcon} aria-label="选择数据目录" onClick={() => void pickDataRoot()}
              {...busyProps(pickingData)} />
          </div>
          {dataRoot.help.map((line) => <Help key={line}>{line}</Help>)}
        </CardGroup>
      ) : null}

      <CardGroup labelledBy="setup-access-title">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-0.5">
            <GroupTitle id="setup-access-title">访问密码</GroupTitle>
            <p id="setup-access-description" className="text-body-2-regular text-text-secondary">开启后，访问 Peach 需要先登录。</p>
          </div>
          <Switch aria-labelledby="setup-access-title" aria-describedby="setup-access-description"
            isSelected={accessOn} onChange={setAccessOn} />
        </div>
        <Help>未设置密码时，能连接到 Peach 的设备可直接进入。</Help>
        {accessOn
          ? <PasswordPair label="访问密码" password={password} confirmation={confirmation}
              onPassword={setPassword} onConfirmation={setConfirmation}
              passwordError={announce(text(errors.access_password))} passwordHint="请输入 8–256 个字符。"
              confirmationInvalid={Boolean(errors.access_password)} />
          : null}
      </CardGroup>

      <CardGroup labelledBy="setup-proxy-title">
        <GroupTitle id="setup-proxy-title">Peach 代理</GroupTitle>
        <Help>用于资料采集、封面和工具下载，可在配置页修改。</Help>
        <div className="flex flex-col items-start gap-1.5">
          <Label elementType="span" id="setup-proxy-mode-label">连接方式</Label>
          <ProxyModeSelect mode={proxyMode} onChange={setProxyMode} labelledBy="setup-proxy-mode-label" />
        </div>
        {proxyMode === 'proxy'
          ? <ProxyAddressField id="setupProxyAddress" value={proxyAddress} onChange={setProxyAddress}
              saved={setup.peach_proxy?.proxy_saved} error={announce(text(errors.peach_proxy))} />
          : errors.peach_proxy ? <ErrorText key={errorRound}>{text(errors.peach_proxy)}</ErrorText> : null}
        {setup.docker && proxyMode === 'proxy' && isLoopbackProxy(proxyAddress)
          ? <Note tone="warning" title="请填写容器可访问的代理地址">回环地址指向容器自身；宿主机代理需使用容器可访问的宿主机地址。</Note>
          : null}
        {setup.peach_proxy?.needs_selection
          ? <Note tone="warning" title="需要选择连接方式">已有来源的代理地址不同，请选择公共连接方式。</Note>
          : null}
      </CardGroup>

      <CardGroup>
        <Disclosure key={advancedOpenings} summary="高级设置" defaultOpen={advancedOpenings > 0}>
          <div className="flex flex-col gap-4">{others.filter(visible).map(field)}</div>
        </Disclosure>
      </CardGroup>

      <CardGroup labelledBy="setup-options-title">
        <GroupTitle id="setup-options-title">完成设置后</GroupTitle>
        <div className="flex flex-col gap-1.5">
          <Checkbox isSelected={scanNow} onChange={setScanNow}>{scanLabel(filled)}</Checkbox>
          <Help>读取已有 NFO 和封面，采集缺失资料。符合自动规则的资料会在处理完成后保存到数据库，其余资料留待确认。</Help>
        </div>
        <section aria-labelledby="setup-history-title" className="flex flex-col gap-1.5 border-t border-separator-border pt-4">
          <h3 id="setup-history-title" className="flex items-center gap-2 text-body-medium text-text-primary">
            浏览器历史记录<span className="text-body-2-regular text-text-tertiary">可选</span>
          </h3>
          <Checkbox isSelected={historyGuide} onChange={setHistoryGuide}>接下来导入浏览器历史记录</Checkbox>
          <Help>用于生成口味分析。完成设置后选择读取这台电脑，或导入其他设备的记录；也可稍后从「口味」进入。</Help>
        </section>
      </CardGroup>

      {failure ? <ErrorText>{failure}</ErrorText> : null}
      {reporting ? <CardGroup>
        <GroupTitle>版本统计与错误诊断</GroupTitle>
        <ReportingChoices value={reporting} onChange={setReporting} />
        <Help>馆藏与口味明细上传默认关闭，可在「应用与维护」查看并选择。</Help>
      </CardGroup> : null}
      <Button type="submit" className="self-start" {...busyProps(busy)}>完成设置</Button>
    </form>
  );
}
