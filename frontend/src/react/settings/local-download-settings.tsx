/* 「本地下载」：把磁力交给 qBittorrent Web API，文件落在下载器那台机器上。
 *
 * Peach 与 qBittorrent 可以不同机：这里只填下载器地址、账号和「下载器保存目录 →
 * Peach 媒体库目录」的映射。下载完成后由服务端按这张映射登记，Peach 通过本地挂载或
 * SMB 或 WebDAV 盘符读取同一个目录。密码只往本机凭据文件写，读接口只回「存没存过」。 */
import { useEffect, useState, type FormEvent } from 'react';

import { Button } from '@/components/base/buttons/button';
import { Checkbox } from '@/components/base/checkbox/checkbox';
import { Input } from '@/components/base/input/input';
import { Select, SelectItem } from '@/components/base/select/select';

import { apiSend, errorMessage } from '../../api';
import type {
  DownloadSaveResult, DownloadSettingsState, QbittorrentCheckReport,
} from '../bundle';
import { Note } from '../components/note';
import {
  ErrorText, Fact, FactList, FieldLabel, Footer, Help, Section, Stack,
} from './section';
import { busyProps, useAction } from './use-action';

const CHECK_URL = '/api/configuration/downloads/qbittorrent/check';

export function LocalDownloadSettings({ state, settle, receipt }: {
  state: DownloadSettingsState;
  settle(next: DownloadSettingsState): void;
  receipt(message: string): void;
}) {
  const saved = state.qbittorrent ?? {
    address: '', save_path: '', media_root: '', username: '', password_set: false,
  };
  const localRoots = state.local_roots ?? [];
  const [address, setAddress] = useState(saved.address);
  const [savePath, setSavePath] = useState(saved.save_path);
  const [mediaRoot, setMediaRoot] = useState(saved.media_root);
  const [username, setUsername] = useState(saved.username);
  const [password, setPassword] = useState('');
  const [clearPassword, setClearPassword] = useState(false);
  const [report, setReport] = useState<QbittorrentCheckReport | null>(null);
  const [failure, setFailure] = useState('');
  const action = useAction();

  useEffect(() => {
    setAddress(saved.address);
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

  const check = () => {
    void action.run('check', (signal) => apiSend<QbittorrentCheckReport>(
      CHECK_URL, body, 'POST', signal), (next) => {
      setReport(next);
      if (!savePath.trim() && next.save_path) setSavePath(next.save_path);
      setFailure('');
    }, (cause) => setFailure(errorMessage(cause)));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void action.run('save', (signal) => apiSend<DownloadSaveResult>(
      '/api/configuration/downloads', body, 'POST', signal), (next) => {
      const { report: _cloud, qbittorrent_report: checked, ...settings } = next;
      settle(settings);
      setPassword('');
      setClearPassword(false);
      setReport(checked || null);
      setFailure('');
      receipt('已保存本地下载配置');
    }, (cause) => setFailure(errorMessage(cause)));
  };

  return (
    <Section title="本地下载" onSubmit={submit}>
      {state.problems?.filter((problem) => problem.includes('qBittorrent')).map((problem) => (
        <Stack key={problem}><Note tone="error" title="本地下载需要检查">{problem}</Note></Stack>
      ))}
      <Stack>
        <Help>用应用中心的 qBittorrent。下载完成后文件留在下载器那台机器上，Peach 通过下面的映射读取。</Help>
        <Input label="qBittorrent 地址" placeholder="http://192.0.2.10:8085" autoComplete="off"
          maxLength={200} value={address} isDisabled={!state.available}
          onChange={setAddress} />
        <Input label="qBittorrent 用户名" autoComplete="username" maxLength={200} value={username}
          isDisabled={!state.available} onChange={setUsername} />
        <Input label="qBittorrent 密码" type="password" autoComplete="current-password" maxLength={400}
          placeholder={saved.password_set ? '已保存，留空不改' : 'qBittorrent 登录密码'}
          value={password} isDisabled={!state.available} onChange={setPassword} />
        {saved.password_set ? <Checkbox isSelected={clearPassword} isDisabled={!state.available}
          onChange={setClearPassword}>移除已保存的密码</Checkbox> : null}
        <Input label="下载器保存目录" placeholder="/vol1/media/Peach"
          autoComplete="off" maxLength={500} value={savePath} isDisabled={!state.available}
          hint="qBittorrent 那台机器上的绝对路径。" onChange={setSavePath} />
        <div className="flex flex-col gap-1">
          <FieldLabel>对应媒体库目录</FieldLabel>
          {localRoots.length ? (
            <Select aria-label="对应媒体库目录" selectedKey={mediaRoot || null}
              isDisabled={!state.available} placeholder="选择 Peach 里对应的本地、SMB 或 WebDAV 目录"
              onSelectionChange={(key) => setMediaRoot(key === null ? '' : String(key))}>
              {localRoots.map((row) => (
                <SelectItem key={row.root} id={row.root} textValue={`${row.label}（${row.root}）`}>
                  {row.label} · {row.root}
                </SelectItem>
              ))}
            </Select>
          ) : (
            <Help>先在「媒体库与入库」添加一个本地、SMB 或 WebDAV 映射目录，再回来选择。</Help>
          )}
          <Help>Peach 通过这个媒体库目录读取下载完成的文件；跨机时可挂 SMB 或 WebDAV 到本机盘符。</Help>
        </div>
        {failure ? <ErrorText>{failure}</ErrorText> : null}
      </Stack>
      {report ? (
        <Stack divided>
          <FactList>
            <Fact term="版本">{report.version || '未取得'}</Fact>
            <Fact term="WebAPI">{report.webapi_version || '未取得'}</Fact>
            <Fact term="下载器保存目录">{report.save_path || '未填写'}</Fact>
            <Fact term="对应媒体库目录">{report.media_root || '未选择'}</Fact>
          </FactList>
          {report.problems.length ? (
            <Note tone="error" title="检查未通过">{report.problems.join('\n')}</Note>
          ) : null}
        </Stack>
      ) : null}
      <Footer status={state.available ? undefined : '下载只在允许修改数据库的设备上可用。'}>
        <Button type="button" variant="secondary" disabled={!state.available || Boolean(action.busy)}
          {...busyProps(action.busy === 'check')} onClick={check}>检查</Button>
        <Button type="submit" disabled={!state.available || Boolean(action.busy)}
          {...busyProps(action.busy === 'save')}>保存配置</Button>
      </Footer>
    </Section>
  );
}
