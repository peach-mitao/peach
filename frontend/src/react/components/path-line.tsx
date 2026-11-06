/* The row on the page that prints a full path: the path itself, plus a key to open it in the file explorer.
 *
 * Credential files, problem logs and the data directory uninstall would delete all print full paths, and the next step after
 * reading one is to go look; copying it out and pasting back into the explorer is wasted copying. Only this string is sent to
 * the server, which re-judges openability against its own Peach data directory (`/api/reveal`'s `path` branch).
 *
 * 窗口弹在**服务端那台机器**上：本机浏览时它自己就是回执，从别的设备浏览时这边屏幕
 * 什么都不会发生，所以成功仍要报一句。失败留在路径旁边，等人重试。 */
import { useEffect, useRef, useState, type ReactNode } from 'react';

import { IconButton } from '@/components/base/buttons/icon-button';
import { cx } from '@/utils/cx';

import { ApiError, apiSend } from '../../api';
import { busyProps } from '../settings/use-action';

/** The site-wide "Open location" icon. It is `folder-open` from the sprite; Remix Icon has no matching one. */
function FolderOpenIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" className={className}>
      <use href="#i-folder-open" />
    </svg>
  );
}

/** The wording when the request never went out (offline, or the page rotated its secret). A reason the server can answer for is written by the server itself. */
const UNREACHED = 'Couldn\'t open File Explorer. Try again.';

export function PathLine(
  { path, prefix, className, action, onRevealed }:
  {
    path: string;
    /** The label before the path ('Full log:'). It sits on the path's line and never breaks away from it when wrapping. */
    prefix?: string;
    /** The font size and color of this line are decided at the place that uses it: the path is secondary information, and the muted color is not the same everywhere. */
    className?: string;
    /** 同样针对这份文件的动作（导出），排在打开位置那颗键旁边。 */
    action?: ReactNode;
    /** 定位成功后的回执。窗口不在这台机器上时，这句话是唯一的动静。 */
    onRevealed?(message: string): void;
    /** The reveal key's accessible name; pages that open the record's own location shorten it. */
    revealLabel?: string;
  }
) {
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState('');
  /* The server performs the popup step, and the response may land after the page has already moved on; by then this row is long gone. */
  const alive = useRef(true);
  useEffect(() => () => { alive.current = false }, []);
  const reveal = async () => {
    if (busy) return;
    setBusy(true);
    setProblem('');
    try {
      await apiSend('/api/reveal', { path });
      onRevealed?.('Revealed in File Explorer');
    } catch (error) {
      if (alive.current) setProblem(error instanceof ApiError ? error.message : UNREACHED);
    } finally {
      if (alive.current) setBusy(false);
    }
  };
  return (
    <div className="flex flex-col gap-1">
      {/* The path and the button sit on the same center line: the button is a step taller than this small text, so top alignment makes it look like it drifts upward on its own. */}
      <div className="flex items-center justify-between gap-2">
        <p className={cx('min-w-0 break-all', className)}>
          {prefix}{path}
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <IconButton icon={FolderOpenIcon} size="small" aria-label="在资源管理器中显示"
            onClick={() => void reveal()} {...busyProps(busy)} />
          {action}
        </div>
      </div>
      {problem ? <p className="text-caption-1-regular text-text-error-primary">{problem}</p> : null}
    </div>
  );
}
