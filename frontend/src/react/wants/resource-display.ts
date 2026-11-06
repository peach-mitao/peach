import { fmtSize } from '@peach/legacy/core';

/** 来源的字节数按馆藏容量口径展示，其他来源单位保留；来源没给大小时显示未知。 */
export function resourceSize(value: string | null | undefined): string {
  const text = (value ?? '').trim();
  const bytes = /^([\d,]+)\s*B$/i.exec(text);
  if (/^[\d,.]+$/.test(text)) return '大小未知';
  return bytes ? fmtSize(Number(bytes[1].replaceAll(',', ''))) : value || '大小未知';
}

/** A cached source limit only describes what this fetch covered and never infers account permissions. */
export function resourceNotice(value: string): string {
  return /^More comments.*(?:VIP|官方 App)/.test(value)
    ? 'The source returned only part of the comments; resource links may be incomplete.'
    : value;
}
