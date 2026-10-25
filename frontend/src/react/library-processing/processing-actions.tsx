import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { RiArrowDownSLine, RiArrowRightLine } from '@remixicon/react';
import { Popover } from 'react-aria-components';
import { Button } from '@/components/base/buttons/button';
import { LinkButton } from '@/components/base/buttons/link-button';
import { MENU_ITEM, MENU_ITEM_INTERACTIVE, MENU_POPOVER_SURFACE } from '@/components/base/dropdown/menu-styles';
import { cx } from '@/utils/cx';
import { formModal } from '@peach/legacy/ui';
import { MenuDialog } from '../components/menu-dialog';
import { busyProps } from '../settings/use-action';
import { errorMessage } from '../../api';
import { fetchProcessingEstimate, type LibraryProcessingCommand, type ProcessingSpeed, type ProcessingTraffic } from './library-processing';
import { ProcessingEffort } from './processing-effort';
import { TrafficProgress } from './processing-traffic';

function ProcessingPrompt({ command, speed, dialog, onSpeed, busy }: {
  command: LibraryProcessingCommand; speed: ProcessingSpeed; dialog: ReturnType<typeof formModal>;
  onSpeed(value: ProcessingSpeed): void; busy: boolean;
}) {
  const [mode, setMode] = useState(speed);
  const [traffic, setTraffic] = useState<ProcessingTraffic>();
  const [failure, setFailure] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout>;
    const load = async (inventory?: string) => {
      try {
        const result = await fetchProcessingEstimate(command, controller.signal, inventory);
        if (!result.traffic) throw new Error('服务端未提供流量预估');
        if (controller.signal.aborted) return;
        setTraffic(result.traffic);
        dialog.confirmButton.disabled = false;
        if (result.traffic.inventory?.token) timer = setTimeout(() => { void load(result.traffic.inventory?.token) }, 250);
      } catch (error) {
        if (!controller.signal.aborted) {
          setFailure(errorMessage(error));
          dialog.confirmButton.disabled = false;
        }
      }
    };
    void load();
    return () => { controller.abort(); clearTimeout(timer) };
  }, [command, dialog]);
  return <div className="flex flex-col gap-4">
    <div className="flex justify-center"><ProcessingEffort value={mode} busy={busy} onChange={value => { setMode(value); onSpeed(value) }} /></div>
    {traffic ? <TrafficProgress traffic={traffic} initial /> : null}
    {failure || !traffic ? <p role="status" className="text-body-2-regular text-text-secondary">{failure ? `流量预估未取得：${failure}` : '正在估算流量…'}</p> : null}
  </div>;
}

/** 扫描和已有作品补全共用资料流水线，视频预览由媒体库设置决定。 */
export function ProcessingActions({ busy, scan = false, metadataOnly = false, speedMode = 'standard', onRun }: {
  busy: boolean; scan?: boolean; metadataOnly?: boolean; speedMode?: ProcessingSpeed;
  onRun(command: LibraryProcessingCommand): void | Promise<unknown>;
}) {
  const trigger = useRef<HTMLButtonElement>(null);
  const prompt = useRef<ReturnType<typeof formModal> | null>(null);
  const [promptView, setPromptView] = useState<{ host: HTMLElement; footer: HTMLElement; dialog: ReturnType<typeof formModal>; command: LibraryProcessingCommand } | null>(null);
  const selectedSpeed = useRef(speedMode);
  useEffect(() => () => prompt.current?.close(), []);
  const [open, setOpen] = useState(false);
  const primary: { label: string; command: LibraryProcessingCommand } = { label: scan ? '同步媒体库' : '同步这些影片',
    command: scan ? {} : { stage: 'collect' as const } };
  const options: { label: string; description: string; command: LibraryProcessingCommand }[] = [
    ...(scan ? [{ label: '仅扫描文件', description: '发现文件，读取视频时长和分辨率', command: { stage: 'scan' as const } }] : []),
    ...(scan ? [{ label: '仅补全已入库影片', description: metadataOnly ? '补已有影片的资料和视频属性' : '补资料和视频属性，生成本地预览图', command: { stage: 'collect' as const } }] : []),
    { label: '仅补全影片资料', description: '补影片资料、封面和人物资料', command: { stage: 'metadata' as const } },
    { label: '仅补全预览图', description: '为已入库的本地视频生成九宫格', command: { stage: 'previews' as const } },
  ];
  const run = (command: LibraryProcessingCommand) => {
    if (busy) return;
    setOpen(false);
    if (!scan) {
      void Promise.resolve(onRun(command)).catch(() => { /* 错误由任务入口留在原位 */ });
      return;
    }
    if (prompt.current) return;
    selectedSpeed.current = speedMode;
    const previews = command.stage === 'previews';
    const title = previews ? '补全预览图' : command.stage === 'scan' ? '扫描文件'
      : command.stage === 'metadata' ? '补全影片资料' : command.stage === 'collect' ? '补全已入库影片' : '同步媒体库';
    const work = previews ? '为本地视频补全九宫格预览图，会读取视频并占用处理器'
      : command.stage === 'scan' ? '扫描目录并登记文件，按目录设置读取视频时长和分辨率'
      : command.stage === 'metadata' ? '读取配套资料，补全影片资料、封面和人物资料'
      : `${command.stage === 'collect' ? '为已入库影片补全资料和视频属性' : '扫描目录发现文件，再补全资料和视频属性'}${metadataOnly ? '' : '，并生成本地预览图'}`;
    const dialog = formModal({
      title,
      description: `${work}，可能让电脑变慢。需要同时使用电脑时，可选择低占用模式。`,
      body: '<div class="peach-react" data-processing-prompt></div>',
      confirmLabel: title,
      confirmDisabled: true,
      onConfirm: async () => {
        await onRun({ ...command, ...(selectedSpeed.current === speedMode ? {} : { speed_mode: selectedSpeed.current }) });
      },
    });
    const footer = document.createElement('span');
    footer.className = 'peach-react flex items-center';
    dialog.confirmButton.before(footer);
    prompt.current = dialog;
    setPromptView({ host: dialog.dialog.querySelector<HTMLElement>('[data-processing-prompt]')!, footer, dialog, command });
    void dialog.done.then(() => { if (prompt.current === dialog) { prompt.current = null; setPromptView(null) } });
  };
  return <>
    {promptView ? createPortal(<ProcessingPrompt command={promptView.command} dialog={promptView.dialog}
      speed={speedMode} busy={busy} onSpeed={value => { selectedSpeed.current = value }} />, promptView.host) : null}
    {promptView ? createPortal(<LinkButton href="/settings/library" size="small" variant="primary" trailingIcon={RiArrowRightLine} disabled={busy}
      onClick={event => {
        if (promptView.dialog.confirmButton.getAttribute('aria-busy') === 'true') { event.preventDefault(); return }
        promptView.dialog.close();
      }}>管理媒体库</LinkButton>, promptView.footer) : null}
    <span data-button-group data-split-button data-variant="primary">
      <Button {...busyProps(busy)} onClick={() => run(primary.command)}>{primary.label}</Button>
      <Button ref={trigger} iconOnly leadingIcon={RiArrowDownSLine} aria-label="更多同步方式"
        aria-haspopup="dialog" aria-expanded={open} {...busyProps(busy)} onClick={() => { if (!busy) setOpen(!open) }} />
    </span>
    <Popover triggerRef={trigger} isOpen={open} onOpenChange={setOpen} placement="bottom end" offset={4}
      className={MENU_POPOVER_SURFACE}>
      <MenuDialog aria-label="同步方式" className="flex w-80 flex-col gap-1 outline-none">
        {options.map(({ label, description, command }) => {
          const blocked = metadataOnly && 'stage' in command && command.stage === 'previews';
          return <button key={label} type="button" disabled={blocked}
            title={blocked ? '请先在媒体库设置中开启视频预览生成' : undefined}
            className={cx(MENU_ITEM, MENU_ITEM_INTERACTIVE, 'text-body-2-medium')}
            onClick={() => run(command)}><span className="flex min-w-0 flex-col gap-1">
              <span>{label}</span><span className="text-caption-1-regular text-text-secondary">{description}</span>
            </span></button>;
        })}
      </MenuDialog>
    </Popover>
  </>;
}
