import { useLayoutEffect, useRef, useState } from 'react';
import { RiImageLine } from '@remixicon/react';
import { coverUrl } from '@peach/card-art';
import { Button } from '@/components/base/buttons/button';
import { apiSend } from '../../api';
import { queryClient } from '../query';
import { busyProps, useAction } from '../settings/use-action';
import { EmptyState } from './empty-state';
import type { JavDetail } from '../jav-detail/jav-detail';

/** URLs for source images (samples, source covers, source avatars). The server saves one on first fetch and returns the image itself,
 *  cached by the browser via ETag and a private TTL; `attempt` lets a retry use a different URL instead of reusing the one that just failed. */
export const javImageUrl = (code: string, image: string, attempt = 0): string =>
  `/jav-image?code=${encodeURIComponent(code)}&image=${encodeURIComponent(image)}${attempt ? `&attempt=${attempt}` : ''}`;

interface CoverRetry { has_cover: boolean; cover_version: string; message: string }

/** 图片没取到时占住画廊那一格：空态说明，加一颗「立即重试」。 */
function PictureMissing({ title, detail, busy, onRetry }: { title: string; detail?: string; busy?: boolean; onRetry(): void }) {
  return <div data-jav-picture-wait="">
    <EmptyState size="compact" icon={RiImageLine} title={title}
      actions={<Button size="small" {...busyProps(!!busy)} onClick={onRetry}>立即重试</Button>}>{detail || null}</EmptyState>
  </div>;
}

/** 本机没有封面、来源也没给能代理的地址：服务端按番号重取官方封面，取到后详情换成本机那张。 */
function CoverMissing({ code }: { code: string }) {
  const action = useAction();
  const [reason, setReason] = useState('');
  const retry = () => { void action.run('cover', signal => apiSend<CoverRetry>('/api/jav/cover', { code }, 'POST', signal), result => {
    if (!result.has_cover) { setReason(result.message); return }
    queryClient.setQueriesData<JavDetail>({ queryKey: ['jav-detail'] }, current => current?.code === code
      ? { ...current, has_cover: true, cover_version: result.cover_version } : current);
  }) };
  return <PictureMissing title="封面未取得" detail={action.error || reason} busy={!!action.busy} onRetry={retry} />;
}

/** 来源图片：本地有封面用本地那张，否则经 `/jav-image` 取。 */
export function SourcePicture({ item, image, thumbnail = false }: {
  item: Pick<JavDetail, 'code' | 'has_cover' | 'source_image' | 'cover_url' | 'cover_version'>;
  image: string; thumbnail?: boolean;
}) {
  const [attempt, setAttempt] = useState(0);
  const [loaded, setLoaded] = useState<{ src: string; alt: string } | null>(null);
  const [failed, setFailed] = useState('');
  const picture = useRef<HTMLImageElement>(null);
  const local = image === 'cover' && item.has_cover;
  const remote = !local && (image !== 'cover' || item.source_image);
  const alt = thumbnail ? '' : image === 'cover' ? `${item.code} cover` : `${item.code} preview ${Number(image) + 1}`;
  const src = remote ? javImageUrl(item.code, image, attempt) : local ? coverUrl(item, true) : item.cover_url || '';
  useLayoutEffect(() => {
    const node = picture.current;
    if (node?.complete && node.naturalWidth > 0) setLoaded({ src, alt });
  }, [src, alt]);
  if (!remote) {
    if (src) return <img ref={picture} data-jav-picture={thumbnail ? undefined : ''} src={src} alt={alt} referrerPolicy="no-referrer"
      onLoad={() => setLoaded({ src, alt })} />;
    return thumbnail ? <span>封面未取得</span> : <CoverMissing code={item.code} />;
  }
  if (failed === src) {
    if (thumbnail) return <span>预览未取得</span>;
    return <PictureMissing title="图片未取得" onRetry={() => setAttempt((value) => value + 1)} />;
  }
  const ready = loaded?.src === src;
  const reveal = async (node: HTMLImageElement) => {
    try { await node.decode() } catch { return }
    if (picture.current === node && node.getAttribute('src') === src) setLoaded({ src, alt });
  };
  return <>
    {ready || loaded ? null : thumbnail
      ? <span className="relative block h-full w-full skeleton-sheen" aria-label="Loading preview" />
      : <div data-jav-picture-wait="" data-skeleton="image" role="status" aria-label="Loading image"><span className="relative skeleton-sheen" /></div>}
    {!ready && loaded ? <img data-jav-picture={thumbnail ? undefined : ''} data-source-picture="" src={loaded.src}
      alt={loaded.alt} referrerPolicy="no-referrer" /> : null}
    <img ref={picture} data-jav-picture={thumbnail ? undefined : ''} data-source-picture="" src={src} alt={alt} referrerPolicy="no-referrer"
      hidden={!ready} onLoad={event => { void reveal(event.currentTarget) }} onError={() => setFailed(src)} />
  </>;
}
