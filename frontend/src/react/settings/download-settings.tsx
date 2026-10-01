/* 「云下载」：把磁力交给 115 或 PikPak 离线下载，文件落在已挂载的网盘目录，由推送发现入库。
 *
 * 两张卡。第一张是地址、令牌、目标目录与等待上限：115 走 CloudDrive2 的 gRPC，令牌在
 * CloudDrive2「设置 → API 令牌」里生成；「检查」按此刻填的值去问 CloudDrive2 有没有离线权限、
 * 目标目录能不能离线、115 还剩几条配额，只读，不提交。地址、115 目标目录与 PikPak 根留空时，
 * 「检查」把探测到的、按推送发现推出的值填回表单，点「保存配置」才落盘；推出的目录不存在时
 * 给一颗「新建这个目录」，只有点了才在 CloudDrive2 里建。第二张是 PikPak 账号的登录与登出。
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
const FOLDER_URL = '/api/configuration/downloads/folder';
const LOGIN_URL = '/api/configuration/downloads/pikpak/login';
const LOGOUT_URL = '/api/configuration/downloads/pikpak/logout';

export function DownloadSettings({ initial, receipt }: {
  initial: DownloadSettingsState;
  receipt(message: string): void;
}) {
  const [state, setState] = useState(initial);
  // 账号框放在上面这一层：云下载卡要知道用户有没有在用 PikPak，没在用就不报 PikPak 根的提示。
  const [username, setUsername] = useState('');
  const pikpakAccount = state.pikpak.logged_in || Boolean(username.trim());
  return (
    <>
      <DownloadForm state={state} settle={setState} receipt={receipt} pikpakAccount={pikpakAccount} />
      <PikPakAccount state={state} settle={setState} receipt={receipt} username={username} setUsername={setUsername} />
    </>
  );
}

interface CardProps {
  state: DownloadSettingsState;
  settle(next: DownloadSettingsState): void;
  receipt(message: string): void;
}

function DownloadForm({ state, settle, receipt, pikpakAccount }: CardProps & { pikpakAccount: boolean }) {
  const [config, setConfig] = useState<DownloadConfig>(state.config);
  const [token, setToken] = useState('');
  const [hours, setHours] = useState(String(state.config.wait_hours));
  const [report, setReport] = useState<DownloadCheckReport | null>(null);
  const [detected, setDetected] = useState('');
  const [suggested, setSuggested] = useState<Suggestions>({ target: null, root: '' });
  const [failure, setFailure] = useState('');
  const [saveBlocked, setSaveBlocked] = useState(false);
  const action = useAction();
  const target = (key: '115' | 'pikpak') => config.targets[key] ?? '';
  const setTarget = (key: '115' | 'pikpak', value: string) =>
    setConfig({ ...config, targets: { ...config.targets, [key]: value } });
  // 检查标为不存在、用户也没改过的那个目录，存下来提交时只会报「没有这个文件夹」。
  const missing = Boolean(suggested.target && !suggested.target.exists && target('115') === suggested.target.path);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (missing) {
      setSaveBlocked(true);
      return;
    }
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

  // 地址、115 目标目录与 PikPak 根留空时，服务端探测本机端口、按推送发现推建议值，这里填回表单；
  // 用户点「保存配置」才落盘。用户自己填过的字段不覆盖。
  const check = () => {
    const blank = !config.clouddrive_address.trim();
    const blankTarget = !target('115').trim();
    const blankRoot = !config.pikpak_root;
    const body = { clouddrive_address: config.clouddrive_address, token, target: target('115'),
      pikpak_root: config.pikpak_root, pikpak_account: pikpakAccount };
    void action.run('check', (signal) => apiSend<DownloadCheckReport>(CHECK_URL, body, 'POST', signal),
      (next) => {
        const folder = blankTarget ? next.suggested_target : null;
        const root = blankRoot ? next.suggested_pikpak_root : '';
        setConfig((current) => ({
          ...current,
          clouddrive_address: blank && next.address ? next.address : current.clouddrive_address,
          targets: folder ? { ...current.targets, '115': folder.path } : current.targets,
          pikpak_root: root || current.pikpak_root,
        }));
        setReport(next);
        setDetected(blank ? next.address : '');
        setSuggested({ target: folder, root });
        setSaveBlocked(false);
        setFailure('');
      }, (cause) => setFailure(errorMessage(cause)));
  };

  // 只在用户点了「新建这个目录」时调 CloudDrive2 建目录，建好后服务端按这个目录再检查一遍。
  const create = (path: string) => {
    const body = { clouddrive_address: config.clouddrive_address, token, path, pikpak_root: config.pikpak_root,
      pikpak_account: pikpakAccount };
    void action.run('folder', (signal) => apiSend<DownloadCheckReport>(FOLDER_URL, body, 'POST', signal),
      (next) => {
        setReport(next);
        setSuggested((current) => ({ ...current, target: { path, exists: true } }));
        setSaveBlocked(false);
        setFailure('');
        receipt('已新建目录');
      }, (cause) => setFailure(errorMessage(cause)));
  };

  return (
    <Section title="云下载" onSubmit={submit}>
      <Stack>
        <Help>把磁力交给 115 或 PikPak 离线下载，文件落在已挂载的网盘目录，再由推送发现登记入库，不经过这台电脑。
          115 每个任务扣一条离线配额（年费会员每月 1500 条、月费 200 条），被判违规的资源不重试。</Help>
        <Input label="CloudDrive2 地址" placeholder="留空自动探测本机 19798 / 29798" autoComplete="off" maxLength={200}
          value={config.clouddrive_address} isDisabled={!state.available}
          onChange={(value) => setConfig({ ...config, clouddrive_address: value })} />
        <Input label="CloudDrive2 API 令牌" type="password" autoComplete="off" maxLength={400}
          placeholder={state.token_set ? '已保存，留空不改' : '在 CloudDrive2「设置 → API 令牌」中生成'}
          hint="令牌需要「提交离线任务」「查看离线任务与配额」两项权限；要在 Peach 里取消任务，再勾上「取消离线任务」；要在 Peach 里新建目标目录，再勾上新建文件夹权限（allow_create_folder）。"
          value={token} isDisabled={!state.available} onChange={setToken} />
        <Input label="115 目标目录" placeholder="检查时按推送发现自动填写" autoComplete="off" maxLength={300}
          validationBehavior="aria" isInvalid={missing}
          hint={missing ? (saveBlocked ? '这个目录还不存在，保存前先在下方新建它，或改成 CloudDrive2 里已有的目录。' : 'CloudDrive2 里还没有这个目录。') :'CloudDrive2 挂载树里的路径，要落在「推送发现」的某个云端路径前缀下面，下载完才找得到。留空时点「检查」，按推送发现里 115 那条前缀填上「前缀/云下载」。'}
          value={target('115')} isDisabled={!state.available} onChange={(value) => setTarget('115', value)} />
        <Input label="PikPak 目标目录" placeholder="以 / 开头的网盘路径" autoComplete="off" maxLength={300}
          hint="PikPak 网盘里的路径，目录要已经存在。"
          value={target('pikpak')} isDisabled={!state.available} onChange={(value) => setTarget('pikpak', value)} />
        <div className="flex flex-col gap-1">
          <FieldLabel>PikPak 根目录对应的媒体文件夹</FieldLabel>
          {state.pikpak_roots.length ? (
            <Select aria-label="PikPak 根目录对应的媒体文件夹" selectedKey={config.pikpak_root || null}
              isDisabled={!state.available} placeholder="点检查按推送发现选"
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
      {report ? (
        <CheckReport report={report} detected={detected} suggested={suggested}
          create={state.available ? create : undefined} creating={action.busy === 'folder'} />
      ) : null}
      {failure || action.error ? <Stack divided><ErrorText>{failure || action.error}</ErrorText></Stack> : null}
      <Footer status={state.available ? undefined : '云下载只在账本写入端可用。'}>
        <Button onClick={check} disabled={!state.available} {...busyProps(action.busy === 'check')}>检查</Button>
        <Button type="submit" disabled={!state.available} {...busyProps(action.busy === 'save')}>保存配置</Button>
      </Footer>
    </Section>
  );
}

/** 这一次「检查」填回表单的建议值。目标目录不存在时也填回去，表单把它标成无效。 */
interface Suggestions {
  target: DownloadCheckReport['suggested_target'];
  root: string;
}

function CheckReport({ report, detected, suggested, create, creating }: {
  report: DownloadCheckReport;
  detected: string;
  suggested: Suggestions;
  create?: (path: string) => void;
  creating: boolean;
}) {
  const folder = suggested.target;
  return (
    <Stack divided>
      <FactList>
        {detected ? <Fact term="CloudDrive2 地址">{`探测到 ${detected}，保存配置后生效`}</Fact> : null}
        {folder?.exists ? <Fact term="115 目标目录">{`按推送发现填入 ${folder.path}，保存配置后生效`}</Fact> : null}
        {folder && !folder.exists ? (
          <Fact term="115 目标目录">
            {`${folder.path} 不存在`}
            {create ? <Button size="small" onClick={() => create(folder.path)} {...busyProps(creating)}>新建这个目录</Button> : null}
          </Fact>
        ) : null}
        {suggested.root ? <Fact term="PikPak 根目录">{`按推送发现填入 ${suggested.root}，保存配置后生效`}</Fact> : null}
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

function PikPakAccount({ state, settle, receipt, username, setUsername }: CardProps & {
  username: string;
  setUsername(value: string): void;
}) {
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
