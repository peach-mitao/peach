import { afterEach, expect, it, vi } from 'vitest';
import { randomId } from '../src/random-id';
import { newStreamSession } from '../src/player/stream';

afterEach(() => vi.unstubAllGlobals());

it('安全上下文保留原生 UUID 调用的接收者', () => {
  const native = { randomUUID() { expect(this).toBe(native); return 'native-uuid' } };
  vi.stubGlobal('crypto', native);
  expect(randomId()).toBe('native-uuid');
});

it.each([
  [0x00, '00000000-0000-4000-8000-000000000000'],
  [0xff, 'ffffffff-ffff-4fff-bfff-ffffffffffff'],
] as const)('普通 HTTP 的随机字节 %i 生成规范 v4 UUID', (value, expected) => {
  vi.stubGlobal('crypto', { getRandomValues(bytes: Uint8Array) { return bytes.fill(value) } });
  expect(randomId()).toBe(expected);
  expect(newStreamSession()).toBe(expected);
});

it('普通 HTTP 的连续播放会话使用独立 UUID', () => {
  vi.stubGlobal('crypto', { getRandomValues: crypto.getRandomValues.bind(crypto) });
  const sessions = Array.from({ length: 100 }, () => newStreamSession());
  expect(new Set(sessions).size).toBe(sessions.length);
  for (const session of sessions) {
    expect(session).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  }
});
