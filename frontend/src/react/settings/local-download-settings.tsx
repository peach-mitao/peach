/* 「本地下载」：把磁力交给 qBittorrent Web API，文件落在下载器那台机器上。
 *
 * Peach 与 qBittorrent 可以不同机：这里只填下载器地址、账号和「下载器保存目录 →
 * Peach 媒体库目录」的映射。下载完成后由服务端按这张映射登记，Peach 通过本地挂载或
 * SMB 或 WebDAV 盘符读取同一个目录。密码只往本机凭据文件写，读接口只回「存没存过」。 */
import { useEffect, useId, useRef, useState, type FormEvent, type MouseEvent } from 'react';
import { spinnerHtml } from '@peach/legacy/ui';

import { Button } from '@/components/base/buttons/button';
import { Checkbox } from '@/components/base/checkbox/checkbox';
import { Input } from '@/components/base/input/input';
import { Select, SelectItem } from '../components/select';

import { apiSend, errorMessage } from '../../api';
import type {
  DownloadSaveResult, DownloadSettingsState, QbittorrentCheckReport,
} from '../bundle';
import { serverLabel } from '../../core/server-text';
import { t } from '../../i18n';
import { Note } from '../components/note';
import {
  ErrorText, Fact, FactList, FieldLabel, Footer, Help, Section, Stack,
} from './section';
import { busyProps, useAction } from './use-action';
import { useCheckReceipt } from './use-check-receipt';
import { downloadAddressError, invalidDownloadPath, trimDownloadAddress, useFieldValidation } from './field-validation';

const CHECK_URL = '/api/configuration/downloads/qbittorrent/check';
const addressError = (value: string) => {
  const code = downloadAddressError(value);
  return code ? serverLabel(code, '', { label: 'qBittorrent' }) : '';
};
const pathError = (value: string) => invalidDownloadPath(value)
  ? serverLabel('errors.downloads.localTargetInvalid', '') : '';

/** 只挑 qBittorrent 自己的问题：品牌名在两种语言里都不变，按它认。 */
const qbProblems = (state: DownloadSettingsState): string[] =>
  (state.problems ?? []).map((problem, index) => {
    const coded = state.problem_codes?.[index];
    return coded?.code ? serverLabel(coded.code, problem, coded.params) : problem;
  }).filter(problem => problem.includes('qBittorrent'));

const reportProblems = (report: QbittorrentCheckReport): string[] =>
  report.problems.map((problem, index) => {
    const coded = report.problem_codes?.[index];
    return coded?.code ? serverLabel(coded.code, problem, coded.params) : problem;
  });

export function LocalDownloadSettings({ state, settle, receipt }: {
  state: DownloadSettingsState;
  settle(next: DownloadSettingsState): void;
  receipt(message: string): void;
}) {
  const { checked, checkFailed } = useCheckReceipt();
  const connection = t('settings:connectionCheck.action', { service: 'qBittorrent' });
  const saved = state.qbittorrent ?? {
    address: '', save_path: '', media_root: '', username: '', password_set: false,
  };
  const localRoots = state.local_roots ?? [];
  const [address, setAddress] = useState(saved.address);
  const [savePath, setSavePath] = useState(saved.save_path);
  const savePathRevision = useRef(0);
  const [mediaRoot, setMediaRoot] = useState(saved.media_root);
  const [username, setUsername] = useState(saved.username);
  const [password, setPassword] = useState('');
  const [clearPassword, setClearPassword] = useState(false);
  const [report, setReport] = useState<QbittorrentCheckReport | null>(null);
  const [failure, setFailure] = useState('');
  const action = useAction();
  const validation = useFieldValidation<'address' | 'savePath' | 'mediaRoot'>();
  const { errors } = validation;
  const mediaRootErrorId = useId();

  useEffect(() => {
    setAddress(saved.address);
    savePathRevision.current++;
    setSavePath(saved.save_path);
    setMediaRoot(saved.media_root);
    setUsername(saved.username);
  }, [saved.address, saved.save_path, saved.media_root, saved.username]);

  const body = {
    ...state.config,
    qbittorrent_address: address,
    qbittorrent_save_path: savePath,
    qbittorrent_media_root: mediaRoot,
    qbittorrent_username: username,
    qbittorrent_password: password,
    clear_qbittorrent_password: clearPassword,
  };

  const validate = (form: HTMLFormElement | null, checking: boolean) => {
    const hasAddress = Boolean(trimDownloadAddress(address));
    const keepDisconnected = !checking && !hasAddress && (Boolean(saved.address) || clearPassword);
    const next = {
      address: !keepDisconnected && !hasAddress ? serverLabel('labels.downloadsQbittorrent.addressMissing', '') : addressError(address),
      savePath: pathError(savePath),
      mediaRoot: !keepDisconnected && !mediaRoot ? serverLabel('labels.downloadsQbittorrent.mediaRootMissing', '')
        : mediaRoot && !localRoots.some(item => item.root.toLowerCase() === mediaRoot.toLowerCase())
          ? serverLabel('errors.downloads.notLocalRoot', '', { root: mediaRoot, known: localRoots.map(item => item.root) }) : '',
    };
    setFailure('');
    if (validation.check(form, next)) return true;
    setReport(null);
    return false;
  };

  const check = (event: MouseEvent<HTMLButtonElement>) => {
    const form = event.currentTarget.form;
    if (!validate(form, true)) return;
    const revision = savePathRevision.current;
    void action.run('check', (signal) => apiSend<QbittorrentCheckReport>(
      CHECK_URL, body, 'POST', signal), (next) => {
      setReport(next);
      if (revision === savePathRevision.current && !savePath.trim() && next.save_path) setSavePath(next.save_path);
      setFailure('');
      if (next.ok) checked(t('settings:connectionCheck.passed', { service: 'qBittorrent' }));
      else checkFailed(connection, reportProblems(next)[0] || t('settings:connectionCheck.details'));
    }, (cause) => {
      const message = errorMessage(cause);
      setFailure(message);
      checkFailed(connection, message);
    });
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate(event.currentTarget, false)) return;
    void action.run('save', (signal) => apiSend<DownloadSaveResult>(
      '/api/configuration/downloads', body, 'POST', signal), (next) => {
      const { report: _cloud, qbittorrent_report: checked, ...settings } = next;
      settle(settings);
      setPassword('');
      setClearPassword(false);
      setReport(checked || null);
      setFailure('');
      receipt(t('settings:localDownload.saved'));
    }, (cause) => setFailure(errorMessage(cause)));
  };

  const problems = qbProblems(state);
  return (
    <Section title={t('settings:localDownload.title')} onSubmit={submit}>
      {problems.length ? (
        <Stack><Note tone="error" title={t('settings:localDownload.needsAttention')}>{problems.join('\n')}</Note></Stack>
      ) : null}
      <Stack>
        <Help>{t('settings:localDownload.help')}</Help>
        <Input label={t('settings:localDownload.address')} placeholder={t('settings:localDownload.addressPlaceholder')}
          autoComplete="off" maxLength={200} value={address} isDisabled={!state.available}
          data-settings-field="address" validationBehavior="aria" isInvalid={Boolean(errors.address)} hint={errors.address}
          onBlur={() => { if (address.trim()) validation.update('address', addressError(address)); }}
          onChange={value => { setAddress(value); validation.update('address'); }} />
        <Input label={t('settings:localDownload.username')} autoComplete="username" maxLength={200} value={username}
          isDisabled={!state.available} onChange={setUsername} />
        <Input label={t('settings:localDownload.password')} type="password" autoComplete="current-password" maxLength={400}
          placeholder={saved.password_set ? t('settings:shared.savedLeaveBlank') : t('settings:localDownload.passwordPlaceholder')}
          value={password} isDisabled={!state.available} onChange={setPassword} />
        {saved.password_set ? <Checkbox isSelected={clearPassword} isDisabled={!state.available}
          onChange={setClearPassword}>{t('settings:localDownload.clearPassword')}</Checkbox> : null}
        <Input label={t('settings:localDownload.savePath')} placeholder={t('settings:localDownload.savePathPlaceholder')}
          autoComplete="off" maxLength={500} value={savePath} isDisabled={!state.available}
          data-settings-field="savePath" validationBehavior="aria" isInvalid={Boolean(errors.savePath)}
          hint={errors.savePath || t('settings:localDownload.savePathHint')}
          onBlur={() => validation.update('savePath', pathError(savePath))}
          onChange={value => { savePathRevision.current++; setSavePath(value); validation.update('savePath'); }} />
        <div className="flex flex-col gap-1">
          <FieldLabel>{t('settings:localDownload.mediaRoot')}</FieldLabel>
          {localRoots.length ? (
            <Select aria-label={t('settings:localDownload.mediaRoot')} selectedKey={mediaRoot || null}
              aria-describedby={errors.mediaRoot ? mediaRootErrorId : undefined}
              data-settings-field="mediaRoot" validationBehavior="aria" isInvalid={Boolean(errors.mediaRoot)}
              isDisabled={!state.available} placeholder={t('settings:localDownload.mediaRootPlaceholder')}
              onSelectionChange={(key) => { setMediaRoot(key === null ? '' : String(key)); validation.update('mediaRoot'); }}>
              {localRoots.map((row) => (
                <SelectItem key={row.root} id={row.root} glyph="folder-open" textValue={t('shell:format.withNote', { text: row.label, note: row.root })}>
                  {row.label} · {row.root}
                </SelectItem>
              ))}
            </Select>
          ) : (
            errors.mediaRoot
              ? <ErrorText>{t('settings:localDownload.noLocalRoots', { section: t('navigation:configurationSections.library') })}</ErrorText>
              : <Help>{t('settings:localDownload.noLocalRoots', { section: t('navigation:configurationSections.library') })}</Help>
          )}
          {errors.mediaRoot && localRoots.length ? <ErrorText id={mediaRootErrorId}>{errors.mediaRoot}</ErrorText> : null}
          <Help>{t('settings:localDownload.mediaRootHelp')}</Help>
        </div>
        {failure ? <ErrorText>{failure}</ErrorText> : null}
      </Stack>
      {report ? (
        <Stack divided>
          <h4 className="text-body-medium text-text-primary" data-copy-key="settings.connectionCheck.results">{t('settings:connectionCheck.results')}</h4>
          <FactList>
            <Fact term={t('settings:localDownload.version')}>{report.version || t('settings:shared.notFound')}</Fact>
            <Fact term="WebAPI">{report.webapi_version || t('settings:shared.notFound')}</Fact>
            <Fact term={t('settings:localDownload.savePath')}>{report.save_path || t('settings:shared.notSet')}</Fact>
            <Fact term={t('settings:localDownload.mediaRoot')}>{report.media_root || t('settings:shared.notSet')}</Fact>
          </FactList>
          {report.problems.length ? (
            <Note tone="error" title={t('settings:localDownload.checkFailed')}>{reportProblems(report).join('\n')}</Note>
          ) : null}
        </Stack>
      ) : null}
      <Footer status={state.available ? undefined : t('settings:cloudDownload.primaryOnly')}>
        <Button type="button" variant="secondary" disabled={!state.available || action.busy === 'save'}
          {...busyProps(action.busy === 'check')} onClick={check}>
          {action.busy === 'check' ? <span aria-hidden dangerouslySetInnerHTML={{ __html: spinnerHtml() }} /> : null}
          {t('settings:cloudDownload.testConnection')}
        </Button>
        <Button type="submit" disabled={!state.available || action.busy === 'check'} {...busyProps(action.busy === 'save')}>
          {action.busy === 'save' ? <span aria-hidden dangerouslySetInnerHTML={{ __html: spinnerHtml() }} /> : null}
          {t('settings:shared.saveSettings')}
        </Button>
      </Footer>
    </Section>
  );
}
