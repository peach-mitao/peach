/* CloudDrive 是代理配置的保存方；页面进入、重新聚焦和手动刷新时读取。 */
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Button } from '@/components/base/buttons/button';
import { Input } from '@/components/base/input/input';
import { Select, SelectItem } from '../components/select';
import { Checkbox } from '@/components/base/checkbox/checkbox';
import { LinkButton } from '@/components/base/buttons/link-button';
import { apiGet, apiSend } from '../../api';
import { serverLabel } from '../../core/server-text';
import { Note } from '../components/note';
import { Disclosure, FieldLabel, Footer, Help, Section, SectionSkeleton, Stack, SourceMark } from './section';
import { sourceMark } from './folder-rows';
import { busyProps, useAction } from './use-action';
import { useCheckReceipt } from './use-check-receipt';
import { CLOUD_PROXY_HELP, cloudProxySkeleton, rememberShape } from '../../configuration-skeleton';
import { joinList, t } from '../../i18n';
import { useFieldValidation } from './field-validation';

export const CLOUD_PROXIES_URL = '/api/configuration/cloud-proxies';
type Mode = 'direct' | 'system' | 'http' | 'socks5' | 'unknown';
interface ProxyValue {
  mode: Mode; host: string; port: number; username: string; password_set: boolean;
  password?: string; clear_password?: boolean;
}
interface Account {
  id: string; name: string; cloud: string; path: string; revision: string; writable: boolean;
  api: ProxyValue; data: ProxyValue;
  libraries?: Library[];
}
interface Library { name: string; root: string; location: string }
interface ProxyList { accounts: Account[]; unlinked?: Library[]; configured?: boolean }
type ProxyKind = 'api' | 'data';
type ProxyField = `${ProxyKind}-${'host' | 'port'}`;
const customProxy = (value: ProxyValue) => value.mode === 'http' || value.mode === 'socks5';
const hostError = (raw: string) => !raw.trim() || raw.trim().length > 253 || /[/@?#\s]/.test(raw.trim())
  ? serverLabel('errors.clouddriveProxy.hostOnly', '') : '';
const portError = (raw: string) => !/^\d+$/.test(raw.trim()) || Number(raw) < 1 || Number(raw) > 65535
  ? serverLabel('errors.clouddriveProxy.portRange', '') : '';
const options = [
  ['direct', t('settings:cloudProxy.direct'), 'globe'], ['system', t('settings:shared.followSystem'), 'monitor'],
  ['http', t('settings:cloudProxy.http'), 'network'], ['socks5', t('settings:cloudProxy.socks5'), 'network'],
] as const;

export function CloudProxySettings({ receipt }: { receipt(message: string): void }) {
  const [state, setState] = useState<ProxyList | null>(null);
  const [loading, setLoading] = useState(true);
  const dirty = useRef(new Set<string>());
  const saving = useRef(new Set<string>());
  const [writing, setWriting] = useState(false);
  const refreshRef = useRef<() => void>(() => undefined);
  const action = useAction();
  const { checked, checkFailed } = useCheckReceipt();
  const refresh = (manual: boolean) => {
    if (saving.current.size) return;
    void action.run('refresh', signal => apiGet<ProxyList>(CLOUD_PROXIES_URL, signal), result => {
      dirty.current.clear();
      setState(result);
      setLoading(false);
      if (manual) checked(t('settings:cloudProxy.refreshed'));
    }, cause => {
      const message = cause instanceof Error ? cause.message : t('settings:cloudProxy.loadFailed');
      setLoading(false);
      action.setError(message);
      if (manual) checkFailed(t('settings:cloudProxy.title'), message);
    });
  };
  refreshRef.current = () => refresh(false);
  useEffect(() => {
    refreshRef.current();
    const focus = () => { if (!dirty.current.size) refreshRef.current(); };
    window.addEventListener('focus', focus);
    return () => window.removeEventListener('focus', focus);
  }, []);
  // 记下账号几个、哪一路走代理（走代理时多出地址、端口与认证），下次骨架照这个结构画。
  useEffect(() => {
    if (!state) return;
    const proxied = (value: ProxyValue) => value.mode === 'http' || value.mode === 'socks5';
    rememberShape('cloudProxy', { configured: state.configured !== false, unlinked: state.unlinked?.length ?? 0,
      accounts: state.accounts.map(account => [proxied(account.data), proxied(account.api)]) });
  }, [state]);
  if (loading) return <SectionSkeleton label={t('settings:cloudProxy.loading')} html={cloudProxySkeleton} />;
  return <Section guide="cloud-proxy" title={t('settings:cloudProxy.title')}>
    <Stack>
      <Help>{CLOUD_PROXY_HELP}</Help>
      <div className="flex min-w-0 flex-col gap-4">
      {action.error ? <Note tone="error" title={t('settings:cloudProxy.readFailedTitle')} action={
        <LinkButton href="/settings/downloads" size="small">{t('settings:cloudProxy.downloadSettingsLink')}</LinkButton>
      }>{action.error}</Note> : null}
      {state?.configured === false ? <Note tone="neutral" action={
        <LinkButton href="/settings/downloads" size="small">{t('settings:cloudProxy.downloadSettingsLink')}</LinkButton>
      }>{t('settings:cloudProxy.notConfigured')}</Note>
        : state?.accounts.length === 0 && !state.unlinked?.length ? <Help>{t('settings:cloudProxy.noLibraries')}</Help> : null}
      {state?.unlinked?.map(library => <div key={library.root} className="flex min-w-0 flex-col gap-1">
        <FieldLabel><span className="inline-flex items-center gap-2"><SourceMark mark={sourceMark(library.location)} />{library.name}</span></FieldLabel>
        <Help>{t('settings:cloudProxy.unmatched')}</Help>
      </div>)}
      {state?.accounts.map(account => <ProxyAccount key={account.id + account.revision} initial={account} receipt={receipt}
        onDirty={() => dirty.current.add(account.id)} onSaving={pending => {
          if (pending) saving.current.add(account.id); else saving.current.delete(account.id);
          setWriting(Boolean(saving.current.size));
        }}
        onSaved={next => { dirty.current.delete(next.id); setState(current => current ? { ...current, accounts: current.accounts.map(row => row.id === next.id ? next : row) } : current); }} />)}
      </div>
    </Stack>
    <Footer><Button variant="secondary" disabled={writing} onClick={() => refresh(true)} {...busyProps(action.busy === 'refresh')}>{t('settings:shared.reload')}</Button></Footer>
  </Section>;
}

function ProxyAccount({ initial, receipt, onDirty, onSaved, onSaving }: {
  initial: Account; receipt(message: string): void; onDirty(): void; onSaved(account: Account): void; onSaving(saving: boolean): void;
}) {
  const [account, setAccount] = useState(initial);
  const [changed, setChanged] = useState<ProxyKind[]>([]);
  const [ports, setPorts] = useState<Partial<Record<ProxyKind, string>>>({});
  const validation = useFieldValidation<ProxyField>();
  const name = joinList(account.libraries?.map(library => library.name) ?? []) || account.name;
  const action = useAction();
  const edit = (key: ProxyKind, value: ProxyValue) => {
    setAccount(current => ({ ...current, [key]: value }));
    setChanged(current => current.includes(key) ? current : [...current, key]);
    onDirty();
  };
  const port = (kind: ProxyKind) => ports[kind] ?? String(account[kind].port || '');
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors: Partial<Record<ProxyField, string>> = {};
    const values: Partial<Record<ProxyKind, ProxyValue>> = {};
    for (const kind of changed) {
      const value = account[kind];
      if (customProxy(value)) {
        errors[`${kind}-host`] = hostError(value.host);
        errors[`${kind}-port`] = portError(port(kind));
      }
      values[kind] = { ...value, port: customProxy(value) ? Number(port(kind)) : value.port };
    }
    if (!validation.check(event.currentTarget, errors)) return;
    onSaving(true);
    void action.run('save', signal => apiSend<Account>(CLOUD_PROXIES_URL, {
      id: account.id, revision: account.revision, ...values,
    }, 'POST', signal), result => {
      setAccount(result); setPorts({}); setChanged([]); onSaved(result); receipt(t('settings:cloudProxy.saved'));
    }).finally(() => onSaving(false));
  };
  return <form aria-label={t('settings:cloudProxy.accountForm', { name })} onSubmit={submit} className="flex min-w-0 flex-col gap-4 border-t border-separator-border pt-4">
    <FieldLabel><span className="inline-flex items-center gap-2"><SourceMark mark={sourceMark(account.libraries?.[0]?.location || (account.cloud === '115open' ? '115' : account.cloud.toLowerCase()))} />{name}</span></FieldLabel>
    <Help>{account.name} · {account.path}</Help>
    {(['data', 'api'] as const).map(kind => <ProxyEditor key={kind} kind={kind}
      label={t(kind === 'data' ? 'settings:cloudProxy.dataProxy' : 'settings:cloudProxy.apiProxy')}
      value={account[kind]} port={port(kind)} validation={validation} disabled={!account.writable || Boolean(action.busy)}
      onChange={value => edit(kind, value)} onPortChange={raw => { setPorts(current => ({ ...current, [kind]: raw })); edit(kind, account[kind]); }} />)}
    {!account.writable ? <Help>{t('settings:cloudProxy.needsWritePermission')}</Help> : null}
    {action.error ? <Note tone="error" title={t('settings:shared.notSaved')}>{action.error}</Note> : null}
    <div className="flex justify-end"><Button type="submit" disabled={!account.writable || !changed.length} {...busyProps(action.busy === 'save')}>{t('settings:shared.saveSettings')}</Button></div>
  </form>;
}

function ProxyEditor({ kind, label, value, port, disabled, validation, onChange, onPortChange }: {
  kind: ProxyKind; port: string; validation: ReturnType<typeof useFieldValidation<ProxyField>>;
  label: string; value: ProxyValue; disabled: boolean; onChange(value: ProxyValue): void;
  onPortChange(raw: string): void;
}) {
  const proxy = customProxy(value);
  const host = `${kind}-host` as const;
  const portField = `${kind}-port` as const;
  return <div className="flex min-w-0 flex-col gap-3">
    <FieldLabel>{label}</FieldLabel>
    <Select aria-label={label} selectedKey={value.mode} isDisabled={disabled}
      onSelectionChange={key => {
        if (!key) return;
        validation.update(host);
        validation.update(portField);
        onChange({ ...value, mode: String(key) as Mode });
      }}>
      {value.mode === 'unknown' ? <SelectItem id="unknown" glyph="info">{t('settings:cloudProxy.unknownType')}</SelectItem> : null}
      {options.map(([id, name, glyph]) => <SelectItem key={id} id={id} glyph={glyph}>{name}</SelectItem>)}
    </Select>
    {proxy ? <>
      <div className="flex flex-wrap gap-3">
        <Input className="min-w-40 flex-1" label={t('settings:cloudProxy.host', { label })} value={value.host} autoComplete="off" isDisabled={disabled}
          data-settings-field={host} validationBehavior="aria" isInvalid={Boolean(validation.errors[host])} hint={validation.errors[host]}
          onBlur={() => validation.update(host, hostError(value.host))}
          onChange={next => { onChange({ ...value, host: next }); validation.update(host); }} />
        <Input className="w-full sm:w-28" label={t('settings:cloudProxy.port', { label })} value={port} inputMode="numeric" isDisabled={disabled}
          data-settings-field={portField} validationBehavior="aria" isInvalid={Boolean(validation.errors[portField])} hint={validation.errors[portField]}
          onBlur={() => validation.update(portField, portError(port))}
          onChange={next => { onPortChange(next); validation.update(portField); }} />
      </div>
      <Disclosure summary={t('settings:cloudProxy.authentication')}>
        <Input label={t('settings:cloudProxy.username', { label })} value={value.username} autoComplete="off" isDisabled={disabled} onChange={username => onChange({ ...value, username })} />
        <Input label={t('settings:cloudProxy.password', { label })} type="password" value={value.password || ''} autoComplete="new-password" isDisabled={disabled}
          placeholder={value.password_set ? t('settings:shared.savedLeaveBlank') : t('settings:shared.optional')} onChange={password => onChange({ ...value, password })} />
        {value.password_set ? <Checkbox isSelected={Boolean(value.clear_password)} isDisabled={disabled}
          onChange={clear_password => onChange({ ...value, clear_password })}>{t('settings:cloudProxy.clearPassword')}</Checkbox> : null}
      </Disclosure>
    </> : null}
  </div>;
}
