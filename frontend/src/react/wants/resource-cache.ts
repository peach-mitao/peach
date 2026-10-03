/* 资源查询按作品发行日缓存；浏览器重启后也可读取，最多保留 128 部。 */
import type { MagnetResult } from './want-magnets';

const KEY = 'peach.want-resources.v1';
const DAY = 86_400_000;
type Entry = { code: string; saved: number; result: MagnetResult };

export function resourceLifetime(released: string | null | undefined, now = Date.now()) {
  const date = Date.parse(released || '');
  const today = new Date(now);
  const cutoff = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
  const day = cutoff.getUTCDate();
  cutoff.setUTCHours(0, 0, 0, 0);
  cutoff.setUTCDate(1);
  cutoff.setUTCMonth(cutoff.getUTCMonth() - 3);
  const lastDay = new Date(Date.UTC(cutoff.getUTCFullYear(), cutoff.getUTCMonth() + 1, 0)).getUTCDate();
  cutoff.setUTCDate(Math.min(day, lastDay));
  return Number.isFinite(date) && date < cutoff.getTime() ? 365 * DAY : 7 * DAY;
}

function entries(): Entry[] {
  try {
    const value = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(value) ? value.filter((row) => typeof row?.code === 'string' &&
      Number.isFinite(row.saved) && row.result?.state === 'ready' && Array.isArray(row.result.items)) : [];
  } catch { return [] }
}

export function cachedResources(code: string, released: string | null | undefined) {
  const found = entries().find((row) => row.code === code);
  return found && Date.now() - found.saved < resourceLifetime(released) ? found : undefined;
}

export function rememberResources(code: string, result: MagnetResult) {
  if (result.state !== 'ready') return;
  try {
    const rows = entries().filter((row) => row.code !== code);
    const checked = Date.parse(result.checked_at || '');
    localStorage.setItem(KEY, JSON.stringify([{ code, saved: Number.isFinite(checked) ? checked : Date.now(), result }, ...rows].slice(0, 128)));
  } catch { /* 存储不可用时仍保留 TanStack Query 的内存缓存。 */ }
}
