"""从已登记图片中选择本地封面；原媒体只读，索引限于一次任务。"""
from __future__ import annotations

from contextlib import closing
from dataclasses import dataclass, replace
import json
from pathlib import Path, PureWindowsPath
import sqlite3
import subprocess
import time

from PIL import Image

from .catalog_rules import (local_cover_code, normalise_code_key,
                            release_identity, same_release_code)
from .library_nfo import NfoIdentityConflict, SidecarIndex, directory_files, local_art, read_nfo
from .local_poster import read_fingerprint
from .metadata import provider_code
from .platform import translate_ledger_path
from .western_artwork import artwork_key

EXTENSIONS = frozenset({'.jpg', '.jpeg', '.png', '.webp'})
STATUSES = ('matched', 'existing', 'conflict', 'no_candidate', 'unreadable')


@dataclass(frozen=True)
class CoverChoice:
    status: str
    code: str
    target: Path
    source: Path | None = None
    origin: str = ''
    candidates: tuple[Path, ...] = ()
    unreadable: tuple[Path, ...] = ()
    source_sha256: str = ''
    source_location: str = ''

    def evidence(self):
        return {'source': 'local_cover', 'match': self.origin,
                'release_identity': release_identity(self.code),
                'source_path': str(self.source or ''), 'source_sha256': self.source_sha256,
                'source_location': self.source_location}


def readonly_connection(db_path):
    connection = sqlite3.connect(Path(db_path).resolve().as_uri() + '?mode=ro', uri=True, timeout=30)
    connection.execute('PRAGMA query_only=ON')
    connection.row_factory = sqlite3.Row
    return connection


def _optional_nfo(path):
    """格式损坏可降级到配图，身份冲突必须交回匹配器。"""
    if path is None:
        return {}
    try:
        return read_nfo(path)[0]
    except NfoIdentityConflict:
        raise
    except (OSError, ValueError, SyntaxError):
        return {}


class LocalCoverIndex:
    """惰性读取一次 SQLite 图片记录，目录列表与候选解码结果按任务复用。"""

    def __init__(self, config, db_path, cover_root, *, listing=None):
        self.config, self.db_path, self.cover_root = config, Path(db_path), Path(cover_root)
        self.listing = listing
        self._directories, self._decoded = {}, {}
        self._isolated = {}
        self._source_locations = {}
        self._images = None
        self.index_builds = self.indexed_images = self.decoded_images = 0

    def contains(self, location, path):
        candidate = PureWindowsPath(path)
        return any(candidate.is_relative_to(PureWindowsPath(root))
                   for root in self.config.locations.get(location, ()))

    def _image_index(self):
        if self._images is None:
            images = {}
            with closing(readonly_connection(self.db_path)) as connection:
                for row in connection.execute("SELECT location,path,name FROM asset WHERE medium='image'"):
                    if not self.contains(row['location'], row['path']):
                        continue
                    if PureWindowsPath(row['path']).suffix.lower() not in EXTENSIONS:
                        continue
                    code = local_cover_code(row['name'])
                    if code:
                        path = translate_ledger_path(row['path'])
                        self._isolated[path] = row['location'] != 'local'
                        self._source_locations[path] = row['location']
                        images.setdefault(release_identity(code), set()).add(path)
                        self.indexed_images += 1
            self._images = images
            self.index_builds += 1
        return self._images

    def _sidecars(self, video):
        if self.listing is not None:
            return self.listing.sidecars(video)
        if video.parent not in self._directories:
            self._directories[video.parent] = SidecarIndex(directory_files(video.parent))
        return self._directories[video.parent].for_video(video)

    def _decode(self, path):
        if path not in self._decoded:
            self.decoded_images += 1
            try:
                self._decoded[path] = read_fingerprint(path, isolated=self._isolated.get(path, True))
            except (OSError, ValueError, Image.DecompressionBombError, subprocess.TimeoutExpired):
                self._decoded[path] = None
        return self._decoded[path]

    def _choose(self, paths, code, target, origin):
        paths = tuple(sorted(set(paths), key=lambda path: str(path).casefold()))
        good, unreadable = [], []
        for path in paths:
            value = self._decode(path)
            (good if value is not None else unreadable).append((path, value) if value else path)
        if not good:
            return CoverChoice('unreadable', code, target, origin=origin,
                               candidates=paths, unreadable=tuple(unreadable))
        if len({value[0] for _, value in good}) > 1:
            return CoverChoice('conflict', code, target, origin=origin,
                               candidates=paths, unreadable=tuple(unreadable))
        source, (_, source_hash) = good[0]
        return CoverChoice('matched', code, target, source, origin, paths, tuple(unreadable), source_hash,
                           self._source_locations.get(source, ''))

    def _existing_target(self, row, target):
        stored_target = self.cover_root / (artwork_key(row['id'], row.get('code')) + '.jpg')
        asset_target = self.cover_root / (artwork_key(row['id'], None) + '.jpg')
        return next((path for path in (stored_target, asset_target, target) if path.is_file()), None)

    def _target_for(self, row):
        code = provider_code(row.get('code')) or local_cover_code(row['name'])
        target = (self.cover_root / (code + '.jpg') if code else
                  self.config.directory('generated') / 'posters' / f"{row['id']}_4.jpg")
        return code, target

    def match(self, row):
        video = translate_ledger_path(row['path'])
        code, target = self._target_for(row)
        existing = self._existing_target(row, target)
        if existing:
            return CoverChoice('existing', code or '', existing)
        try:
            if not video.is_file():
                raise OSError('媒体文件不可访问')
            nfo, posters = self._sidecars(video)
        except OSError:
            return CoverChoice('unreadable', code or '', target, unreadable=(video.parent,))
        try:
            payload = _optional_nfo(nfo)
        except NfoIdentityConflict:
            return CoverChoice('conflict', code or '', target, origin='nfo', candidates=(nfo,))
        if payload.get('id') and code and not same_release_code(code, payload['id']):
            return CoverChoice('conflict', code, target, origin='nfo', candidates=(nfo,))
        if not code and payload.get('id'):
            code = normalise_code_key(payload['id'])
            target = self.cover_root / (artwork_key(row['id'], None) + '.jpg')
        reference = local_art(video, payload)
        if reference:
            self._isolated[reference] = row['location'] != 'local'
            self._source_locations[reference] = row['location']
            return self._choose([reference], code or '', target, 'nfo')
        if posters:
            stem = posters[0].stem.casefold()
            self._isolated.update({path: row['location'] != 'local' for path in posters})
            self._source_locations.update({path: row['location'] for path in posters})
            return self._choose([path for path in posters if path.stem.casefold() == stem],
                                code or '', target, 'same_directory')
        if code:
            images = [path for path in self._image_index().get(release_identity(code), ())
                      if path.parent != video.parent]
            if images:
                return self._choose(images, code, target, 'cross_directory')
        return CoverChoice('no_candidate', code or '', target)

    def match_all(self, rows, *, progress=lambda row: None, universe=None):
        """同一缓存键的影片共同决策，避免分卷或不同版本按行序抢占封面。"""
        if not rows:
            return []
        if universe is None:
            with closing(readonly_connection(self.db_path)) as connection:
                universe = [dict(row) for row in connection.execute(
                    "SELECT id,location,path,name,code FROM asset WHERE medium='video' AND disposal IS NULL ORDER BY id")
                    if self.contains(row['location'], row['path'])]
        selected = {row['id'] for row in rows}
        targets = {self._target_for(row)[1]: row for row in rows}
        universe = [row for row in universe if row['id'] in selected or self._target_for(row)[1] in targets]
        choices, groups = [], {}
        positions = {}
        for row in universe:
            progress(row if row['id'] in selected else targets[self._target_for(row)[1]])
            choice = self.match(row)
            positions[row['id']] = len(choices)
            choices.append(choice)
            if choice.status in ('matched', 'conflict'):
                groups.setdefault(choice.target, []).append(len(choices) - 1)
        priorities = {'nfo': 0, 'same_directory': 1, 'cross_directory': 2}
        for members in groups.values():
            priority = min(priorities[choices[index].origin] for index in members)
            best = [choices[index] for index in members if priorities[choices[index].origin] == priority]
            if (any(choice.status == 'conflict' for choice in best)
                    or len({self._decode(choice.source)[0] for choice in best}) != 1):
                sources = tuple(dict.fromkeys(path for choice in best for path in choice.candidates))
                for index in members:
                    choices[index] = replace(choices[index], status='conflict', source=None,
                                             candidates=sources, source_sha256='')
                continue
            winner = min(best, key=lambda choice: str(choice.source).casefold())
            for index in members:
                choices[index] = replace(choices[index], status='matched', source=winner.source, origin=winner.origin,
                    candidates=winner.candidates, unreadable=winner.unreadable,
                    source_sha256=winner.source_sha256, source_location=winner.source_location)
        return [choices[positions[row['id']]] for row in rows]

    def metrics(self):
        return {'index_builds': self.index_builds, 'indexed_images': self.indexed_images,
                'decoded_images': self.decoded_images,
                'unreadable_images': sum(value is None for value in self._decoded.values())}


REPORT_FIELDS = ('asset_id', 'video', 'code', 'status', 'origin', 'source', 'target',
                 'source_sha256', 'candidates', 'unreadable')


def _plan_key(row):
    return tuple(str(row.get(field) or '') for field in ('code', 'source', 'target', 'source_sha256'))


def _validate_report_path(config, report, plan):
    """新报告只写到数据与媒体输入之外，CSV 与伴随 JSON 作为同一组检查。"""
    outputs = (report, report.with_suffix('.json'))
    if report.suffix.lower() != '.csv':
        raise ValueError('本地封面报告须使用新的 CSV 路径')
    if any(path.exists() for path in outputs):
        raise FileExistsError('本地封面报告不能覆盖已有文件')
    protected_roots = [translate_ledger_path(root).resolve() for roots in config.locations.values() for root in roots]
    protected_roots.extend([config.directory('database').resolve(), config.directory('generated').resolve()])
    if any(path.is_relative_to(root) for path in outputs for root in protected_roots):
        raise ValueError('本地封面报告不能写入媒体或数据库目录')
    if plan is not None and any(path == Path(plan).resolve() for path in outputs):
        raise ValueError('应用报告不能覆盖只读报告')


def run_local_covers(config, db_path, cover_root, report, *, apply=False, plan=None):
    """只读盘点，或严格重放一份已有盘点中的唯一候选。账本始终只读。"""
    from .review_csv import read_rows, write_rows
    from .fsutil import atomic_write_text
    if apply and plan is None:
        raise ValueError('应用本地封面必须提供已核对的只读报告')
    report = Path(report).resolve()
    _validate_report_path(config, report, plan)
    approved = {row['asset_id']: row for row in read_rows(plan)
                if row['status'] == 'matched'} if apply else {}
    started = time.perf_counter()
    index = LocalCoverIndex(config, db_path, cover_root)
    with closing(readonly_connection(db_path)) as connection:
        videos = [dict(row) for row in connection.execute(
            "SELECT id,location,path,name,code FROM asset WHERE medium='video' AND disposal IS NULL ORDER BY id")
            if index.contains(row['location'], row['path'])]
    counts = dict.fromkeys((*STATUSES, 'installed', 'changed', 'failed'), 0)
    records = []
    for row, choice in zip(videos, index.match_all(videos, universe=videos)):
        record = dict(asset_id=str(row['id']), video=row['path'], code=choice.code,
                      status=choice.status, origin=choice.origin, source=str(choice.source or ''),
                      target=str(choice.target), source_sha256=choice.source_sha256,
                      candidates=json.dumps(list(map(str, choice.candidates)), ensure_ascii=False),
                      unreadable=json.dumps(list(map(str, choice.unreadable)), ensure_ascii=False))
        if apply and choice.status == 'matched':
            saved = approved.get(record['asset_id'])
            if saved is None or _plan_key(saved) != _plan_key(record):
                record['status'] = 'changed'
            else:
                from .cover_artwork import install_cover
                from .local_poster import read_jpeg
                try:
                    data, size = read_jpeg(choice.source, isolated=index._isolated.get(choice.source, True),
                                           expected_sha256=choice.source_sha256)
                    install_cover(choice.target, choice.code or f"{row['id']}_4", data, size,
                                  evidence=choice.evidence(), replace_existing=False)
                    record['status'] = 'installed'
                except FileExistsError:
                    record['status'] = 'existing'
                except (OSError, ValueError, subprocess.TimeoutExpired):
                    record['status'] = 'failed'
        counts[record['status']] += 1
        records.append(record)
        # 每批持久化；中止时已经安装的缓存仍有可核对的来源记录。
        if len(records) % 100 == 0:
            write_rows(report, REPORT_FIELDS, records, atomic=True)
    write_rows(report, REPORT_FIELDS, records, atomic=True)
    summary = dict(mode='apply' if apply else 'read_only', unit='video', total=len(videos),
                   **counts, **index.metrics(), elapsed_seconds=round(time.perf_counter() - started, 3),
                   database_writes=0, report=str(report))
    atomic_write_text(report.with_suffix('.json'), json.dumps(summary, ensure_ascii=False, indent=2))
    return summary
