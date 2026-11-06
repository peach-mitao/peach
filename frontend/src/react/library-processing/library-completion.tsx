import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { cardArtwork } from '@peach/card-art';

import { LinkButton } from '@/components/base/buttons/link-button';
import { RiArrowRightLine } from '@remixicon/react';
import { cx } from '@/utils/cx';

import { apiSend, errorMessage } from '../../api';
import type { MediaItem } from '../catalog-grid/types';
import { Note } from '../components/note';
import { queryClient } from '../query';
import {
  DISCONNECTED_TEXT, fetchLibraryProcessing, LIBRARY_PROCESSING_KEY, LIBRARY_PROCESSING_URL,
  pollInterval, processingActive, type LibraryProcessingCommand, type LibraryProcessingData,
} from './library-processing';
import { ProcessingActions } from './processing-actions';

/** Missing-image criteria match the card face; local videos can use frame extraction, and mounted videos with a code can backfill the release cover. */
type PreviewItem = Pick<MediaItem, 'id' | 'name' | 'medium' | 'disposal' | 'location' | 'code' | 'is_jav'
  | 'has_cover' | 'cover_key' | 'has_thumb' | 'has_local_poster' | 'follow_thumb_url'>;

export function missingPreviewIds(items: PreviewItem[], javImage: string): number[] {
  return [...new Set(items.filter(item => (!item.medium || item.medium === 'video')
    && (!/\.(strm|iso)$/i.test(item.name || '') || !!item.code)
    && !item.disposal && item.location !== 'online' && (item.location === 'local' || !!item.code)
    && !cardArtwork(item, 'small', false, javImage).html).map(item => item.id))];
}

/** Stands on its own row; `className` is left to the surrounding layout for margins, and list pages rely on parent spacing. */
export function LibraryCompletionPrompt({ assetIds, onComplete, className = 'mb-4' }: { assetIds: number[]; onComplete?(): void; className?: string }) {
  return assetIds.length ? <Completion assetIds={assetIds} onComplete={onComplete} className={className} /> : null;
}

function Completion({ assetIds, onComplete, className }: { assetIds: number[]; onComplete?(): void; className: string }) {
  const job = useQuery({ queryKey: LIBRARY_PROCESSING_KEY,
    queryFn: ({ signal }) => fetchLibraryProcessing(signal),
    refetchInterval: query => pollInterval(query.state.data, true) });
  const [started, setStarted] = useState<string | null>(null);
  const [outcome, setOutcome] = useState('');
  const completed = useRef<string | null>(null);
  const start = useMutation({
    mutationFn: (command: LibraryProcessingCommand) =>
      apiSend<LibraryProcessingData>(LIBRARY_PROCESSING_URL, { ...command, asset_ids: assetIds }),
    onSuccess: next => {
      setStarted(next.job_id || null);
      queryClient.setQueryData(LIBRARY_PROCESSING_KEY, next);
      void queryClient.invalidateQueries({ queryKey: LIBRARY_PROCESSING_KEY });
    },
  });
  const state = job.data;
  useEffect(() => {
    if (!state || !started || state.job_id !== started || processingActive(state)
      || completed.current === started) return;
    completed.current = started;
    if (state.status === 'complete') {
      setOutcome(`Backfill complete: fetched ${state.covers || 0} ${(state.covers || 0) === 1 ? 'cover' : 'covers'} and generated ${state.previews || 0} video previews.`);
    }
    void queryClient.invalidateQueries({ queryKey: ['catalog-grid'] });
    onComplete?.();
  }, [state, started, onComplete]);
  // Keep the missing-image count at runtime; a new scope waits for the current task to end rather than implicitly appending or replacing.
  const busy = start.isPending || processingActive(state);
  const problem = start.error ? errorMessage(start.error) : job.error ? DISCONNECTED_TEXT
    : started && state?.job_id === started && state.status === 'failed' ? state.error || 'Completion unfinished' : '';
  const message = problem || (start.isPending ? 'Starting completion…'
    : outcome || `${assetIds.length.toLocaleString()} of these videos ${assetIds.length === 1 ? 'has' : 'have'} no preview yet. ${processingActive(state) ? 'You can complete them individually after the current task finishes.' : 'You can complete profiles and images.'}`);
  return <section aria-label="Complete previews" aria-live="polite" data-library-completion="" className={cx('@container', className)}>
    <Note tone={problem ? 'warning' : 'neutral'} action={<div className="flex flex-wrap items-center gap-2"><ProcessingActions busy={busy} metadataOnly={state?.metadata_only} onRun={command => {
      if (busy) return;
      setOutcome('');
      start.mutate(command);
    }} /></div>}>
      {message}{' '}<LinkButton href="/data-cleanup#libraryProcessing" size="small" trailingIcon={RiArrowRightLine}>
      {problem ? 'Open scan and capture' : 'View processing details'}
    </LinkButton></Note>
  </section>;
}
