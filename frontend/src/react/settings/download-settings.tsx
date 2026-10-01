/* 「云下载」：把磁力交给 115 或 PikPak 离线下载，文件落在已挂载的网盘目录，由推送发现入库。
 *
 * 两张卡。第一张是地址、令牌、目标目录与等待上限：115 走 CloudDrive2 的 gRPC，令牌在
 * CloudDrive2「设置 → API 令牌」里生成；「检查」按此刻填的值去问 CloudDrive2 有没有离线权限、
 * 目标目录能不能离线、115 还剩几条配额，只读，不提交。第二张是 PikPak 账号的登录与登出。
 *
 * 令牌与密码只往本机凭据文件写，读接口只回「存没存过」，所以令牌框保存后清空、提示改成
 * 「已保存，留空不改」。PikPak 要人机验证时服务端回一个验证页地址，这里给出链接让用户在浏览器
 * 里完成，Peach 不替他过验证。 */
import { useState, type FormEvent } from 'react';

import { Button } from '@/components/base/buttons/button';
import { Checkbox } from '@/components/base/checkbox/checkbox';
import { Input } from '@/components/base/input/input';
import { Select, SelectItem } from '@/components/base/select/select';

import { apiSend, errorMessage } from '../../api';
import type {
  DownloadCheckReport, DownloadConfig, DownloadSettingsState, PikPakLoginResult,
} from '../bundle';
import { Note } from '../components/note';
import { ErrorText, ExternalLink, Fact, FactList, FieldLabel, Footer, Help, Section, Stack } from './section';
import { busyProps, useAction } from './use-action';

export const DOWNLOADS_URL = '/api/configuration/downloads';
const CHECK_URL = '/api/configuration/downloads/check';
const LOGIN_URL = '/api/configuration/downloads/pikpak/login';
const LOGOUT_URL = '/api/configuration/downloads/pikpak/logout';

export function DownloadSettings({ initial, receipt }: {
  initial: DownloadSettingsState;
  receipt(message: string): void;
}) {
  const [state, setState] = useState(initial);
  return (
    <>
      <DownloadForm state={state} settle={setState} receipt={receipt} />
      <PikPakAccount state={state} settle={setState} receipt={receipt} />
    </>
  );
}

interface CardProps {
  state: DownloadSettingsState;
  settle(next: DownloadSettingsState): void;
  receipt(message: string): void;
}

function DownloadForm({ state, settle, receipt }: CardProps) {
  const [config, setConfig] = useState<DownloadConfig>(state.config);
  const [token, setToken] = useState('');
  const [hours, setHours] = useState(String(state.config.wait_hours));
  const [report, setReport] = useState<DownloadCheckReport | null>(null);
  const [failure, setFailure] = useState('');
  const action = useAction();
  const target = (key: '115' | 'pikpak') => config.targets[key] ?? '';
  const setTarget = (key: '115' | 'pikpak', value: string) =>
    setConfig({ ...config, targets: { ...config.targets, [key]: value } });

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = { ...config, wait_hours: hours, token };
    void action.run('save', (signal) => apiSend<DownloadSettingsState>(DOWNLOADS_URL, body, 'POST', signal),
      (next) => {
        settle(next);
        setConfig(next.config);
        setHours(String(next.config.wait_hours));
        setToken('');
        setFailure('');
        receipt('已保存配置');
      }, (cause) => setFailure(errorMessage(cause)));
  };

  const check = () => {
    const body = { clouddrive_address: config.clouddrive_address, token, target: target('115') };
    void action.run('check', (signal) => apiSend<DownloadCheckReport>(CHECK_URL, body, 'POST', signal),
      (next) => { setReport(next); setFailure(''); }, (cause) => setFailure(errorMessage(cause)));
  };

  return (
    <Section title="云下载" onSubmit={submit}>
      <Stack>
        <Help>把磁力交给 115 或 PikPak 离线下载，文件落在已挂载的网盘目录，再由推送发现登记入库，不经过这台电脑。
          115 每个任务扣一条离线配额（年费会员每月 1500 条、月费 200 条），被判违规的资源不重试。</Help>
        <Input label="CloudDrive2 地址" placeholder="http://127.0.0.1:19798" autoComplete="off" maxLength={200}
          value={config.clouddrive_address} isDisabled={!state.available}
          onChange={(value) => setConfig({ ...config, clouddrive_address: value })} />
        <Input label="CloudDrive2 API 令牌" type="password" autoComplete="off" maxLength={400}
          placeholder={state.token_set ? '已保存，留空不改' : '在 CloudDrive2「设置 → API 令牌」中生成'}
          hint="令牌需要「提交离线任务」「查看离线任务与配额」两项权限；要在 Peach 里取消任务，再勾上「取消离线任务」。"
          value={token} isDisabled={!state.available} onChange={setToken} />
        <Input label="115 目标目录" placeholder="/115/云下载" autoComplete="off" maxLength={300}
          hint="CloudDrive2 挂载树里的路径。这个目录要落在「推送发现」的某个云端路径前缀下面，下载完才找得到。"
          value={target('115')} isDisabled={!state.available} onChange={(value) => setTarget('115', value)} />
        <Input label="PikPak 目标目录" placeholder="/云下载" autoComplete="off" maxLength={300}
          hint="PikPak 网盘里的路径，目录要已经存在。"
          value={target('pikpak')} isDisabled={!state.available} onChange={(value) => setTarget('pikpak', value)} />
        <div className="flex flex-col gap-1">
          <FieldLabel>PikPak 根目录对应的媒体文件夹</FieldLabel>
          {state.pikpak_roots.length ? (
            <Select aria-label="PikPak 根目录对应的媒体文件夹" selectedKey={config.pikpak_root || null}
              isDisabled={!state.available} placeholder="选择媒体文件夹"
              onSelectionChange={(key) => setConfig({ ...config, pikpak_root: key === null ? '' : String(key) })}>
              {state.pikpak_roots.map((root) => <SelectItem key={root} id={root}>{root}</SelectItem>)}
            </Select>
          ) : (
            <Help>媒体文件夹里还没有「CloudDrive · PikPak」来源。在上方添加 PikPak 的挂载目录后，这里才能选。</Help>
          )}
        </div>
        <Input label="等待上限（小时）" type="number" inputMode="numeric" autoComplete="off"
          hint={`远端超过这么久还没下完就标为停滞，多半是没有人做种。1 到 ${state.max_wait_hours} 小时。`}
          value={hours} isDisabled={!state.available} onChange={setHours} />
      </Stack>
      {report ? <CheckReport report={report} /> : null}
      {failure || action.error ? <Stack divided><ErrorText>{failure || action.error}</ErrorText></Stack> : null}
      <Footer status={state.available ? undefined : '云下载只在账本写入端可用。'}>
        <Button onClick={check} disabled={!state.available} {...busyProps(action.busy === 'check')}>检查</Button>
        <Button type="submit" disabled={!state.available} {...busyProps(action.busy === 'save')}>保存配置</Button>
      </Footer>
    </Section>
  );
}

function CheckReport({ report }: { report: DownloadCheckReport }) {
  return (
    <Stack divided>
      <FactList>
        {report.permissions.length ? (
          <Fact term="离线权限">
            {report.missing.length ? `缺少：${report.missing.join('、')}` : '齐全'}
          </Fact>
        ) : null}
        {report.folder ? (
          <Fact term="目标目录">{report.folder.can_offline ? `${report.folder.path} 可以离线下载` : `${report.folder.path} 不支持离线下载`}</Fact>
        ) : null}
        {report.quota ? (
          <Fact term="115 离线配额">{`本月还剩 ${report.quota.left} 条，共 ${report.quota.total} 条`}</Fact>
        ) : null}
      </FactList>
      {report.problems.map((problem) => <ErrorText key={problem}>{problem}</ErrorText>)}
    </Stack>
  );
}

function PikPakAccount({ state, settle, receipt }: CardProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [captcha, setCaptcha] = useState('');
  const [failure, setFailure] = useState('');
  const action = useAction();
  const account = state.pikpak;

  const login = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (account.logged_in) return;
    const body = { username, password, remember };
    void action.run('login', (signal) => apiSend<PikPakLoginResult>(LOGIN_URL, body, 'POST', signal),
      (result) => {
        settle(result.settings);
        setFailure('');
        if (!result.ok) {
          setCaptcha(result.captcha_url ?? '');
          return;
        }
        setCaptcha('');
        setPassword('');
        receipt('已登录 PikPak');
      }, (cause) => setFailure(errorMessage(cause)));
  };

  const logout = () => {
    void action.run('logout', (signal) => apiSend<DownloadSettingsState>(LOGOUT_URL, {}, 'POST', signal),
      (next) => { settle(next); setFailure(''); receipt('已登出 PikPak'); },
      (cause) => setFailure(errorMessage(cause)));
  };

  return (
    <Section title="PikPak 账号" onSubmit={login}>
      {account.logged_in ? (
        <FactList>
          <Fact term="账号">{account.username || '已登录'}</Fact>
          <Fact term="密码">{account.remember ? '已保存，登录过期时自动重新登录' : '未保存，登录过期后需要回到这里重新登录'}</Fact>
        </FactList>
      ) : (
        <Stack>
          <Help>PikPak 没有开放接口，Peach 照 PikPak 网页端的协议直连，接口变了就会报错，那时可以先复制磁力手动添加。
            账号密码只用来换登录令牌，令牌存在这台电脑上。</Help>
          <Input label="账号" placeholder="邮箱或手机号" autoComplete="username" maxLength={200}
            value={username} isDisabled={!state.available} onChange={setUsername} />
          <Input label="密码" type="password" autoComplete="current-password" maxLength={200}
            value={password} isDisabled={!state.available} onChange={setPassword} />
          <Checkbox isSelected={remember} isDisabled={!state.available} onChange={setRemember}>
            保存密码，登录过期时自动重新登录
          </Checkbox>
          {captcha ? (
            <Note tone="warning" title="需要人机验证"
              extra={<div className="pt-2"><ExternalLink href={captcha}>打开 PikPak 验证页</ExternalLink></div>}>
              在浏览器里完成验证后，回到这里再点一次「登录」。
            </Note>
          ) : null}
        </Stack>
      )}
      {failure || action.error ? <Stack divided><ErrorText>{failure || action.error}</ErrorText></Stack> : null}
      <Footer>
        {account.logged_in ? (
          <Button onClick={logout} disabled={!state.available} {...busyProps(action.busy === 'logout')}>登出</Button>
        ) : (
          <Button type="submit" disabled={!state.available} {...busyProps(action.busy === 'login')}>登录</Button>
        )}
      </Footer>
    </Section>
  );
}
