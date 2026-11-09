ALTER TABLE asset ADD COLUMN description TEXT;

-- asset 的内容列变化都要刷新聚合缓存；观看进度列除外，规则与 0054 保持一致。
DROP TRIGGER rev_asset_update;
CREATE TRIGGER rev_asset_update AFTER UPDATE OF
  id, location, path, name, medium, size, mtime, hash_kind, hash, creator, studio, series, code,
  duration, width, height, vcodec, fps, has_audio, ctx_length, ctx_orient, ctx_quality, ctx_pace,
  ctx_people, play_count, rating, o_count, watch_ratio, source_id, stash_scene_id, snapshot_path,
  first_seen, last_seen, feedback, disposal, feedback_at, release_date, catalog_title,
  original_title, description, field_owners, mutation_revision, region, disposal_reason
ON asset BEGIN
  UPDATE ledger_revision SET n=n+1 WHERE tbl='asset';
END;
