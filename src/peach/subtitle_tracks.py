"""资产字幕清单、授权目录读取与默认中文轨道。"""
from __future__ import annotations

from pathlib import Path

from . import subtitles
from .media import normalized_path
from .platform import within_root
from .scan import VIDEO

SUBTITLE_BYTE_LIMIT = 4 * 1024 * 1024


def rows(state, asset_id: int):
    """合并已登记字幕和正片同目录的即时发现结果。"""
    asset = state.media_engine.asset(asset_id)
    with state.database.read_connection() as connection:
        found = [dict(row) for row in subtitles.subtitles_for(connection, asset_id)]
    if asset.path:
        video = normalized_path(asset.path)
        if any(within_root(video, root) for root in state.media_engine.filesystem.allowed_roots):
            known = {str(normalized_path(row["path"])).casefold() for row in found}
            found.extend(row for row in subtitles.discover_sidecars(video, VIDEO)
                         if row["path"].casefold() not in known)
    return asset, found


def path(state, asset, row) -> Path | None:
    """字幕必须同时位于正片目录与授权媒体根。"""
    if not asset.path:
        return None
    directory = normalized_path(asset.path).parent
    target = normalized_path(row["path"])
    if str(target.parent).casefold() != str(directory).casefold():
        return None
    if not any(within_root(target, root) for root in state.media_engine.filesystem.allowed_roots):
        return None
    return target


def read(state, asset, row) -> tuple[bytes | None, str]:
    """读取字幕内容，失败原因供清单与播放接口共用。"""
    target = path(state, asset, row)
    if target is None:
        return None, "不在正片所在目录"
    try:
        if target.stat().st_size > SUBTITLE_BYTE_LIMIT:
            return None, "文件过大"
        return target.read_bytes(), ""
    except OSError:
        return None, "文件未找到"


def _note(state, asset, row) -> str:
    if not subtitles.is_playable_format(row["format"]):
        return "图形字幕，播放器里不显示"
    data, note = read(state, asset, row)
    if data is None:
        return note
    try:
        subtitles.decode(data)
    except subtitles.SubtitleUndecodable:
        return "编码未识别"
    return ""


def tracks(state, asset_id: int) -> list[dict]:
    """返回播放器可用的稳定轨道身份、地址与不可播放原因。"""
    asset, found = rows(state, asset_id)
    result = []
    for index, row in enumerate(found):
        note = _note(state, asset, row)
        result.append({
            "id": f"sidecar:{subtitles.file_key(row['name'])}",
            "legacy_id": f"sidecar:{row['id']}" if isinstance(row["id"], int) else None,
            "index": index, "name": row["name"], "format": row["format"],
            "language": row["language"],
            "label": subtitles.track_label(row["name"], row["language"], asset.name),
            "pairing": row["pairing"], "note": note, "playable": not note,
            "src": f"/api/assets/{asset_id}/subtitles/{index}?track={subtitles.file_key(row['name'])}",
        })
    return result


def preferred_chinese(state, asset_id: int) -> str | None:
    """仅在未选择过字幕时，按简体、通用中文、繁体顺序选择可播放轨道。"""
    candidates = [track for track in tracks(state, asset_id)
                  if track["playable"] and track["language"].lower().split("-")[0] == "zh"]
    order = {"zh-hans": 0, "zh-cn": 0, "zh-sg": 0, "zh": 1}
    chosen = min(candidates, key=lambda track: order.get(track["language"].lower(), 2), default=None)
    return chosen["id"] if chosen else None
