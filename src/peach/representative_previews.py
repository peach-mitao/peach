"""本机影片的离线代表帧：清晰正脸优先，完整人物候选其次。"""
from __future__ import annotations

from dataclasses import dataclass
from functools import lru_cache
import hashlib
import json
import math
from pathlib import Path
import tempfile
import time

from PIL import Image

from . import artifact_rules, upgrade_rules
from .fsutil import atomic_path, atomic_write_bytes, atomic_write_text

FILENAME = 'representative-previews.json'
VERSION = 'person-preview-v1'


@dataclass
class Candidate:
    image: Image.Image
    timestamp: float
    cell: int | None = None


def selection_path(target: Path) -> Path:
    return Path(str(target) + '.selection.json')


def extra_timestamps(duration: float) -> list[float]:
    """补采二十七点，与九宫格原九点错开，避开片头片尾。"""
    return [duration * (.03 + .94 * (index + .25) / 27) for index in range(27)]


def enabled(state_root: Path) -> bool:
    try:
        value = json.loads((state_root / FILENAME).read_text(encoding='utf-8'))
    except FileNotFoundError:
        return False
    except (OSError, ValueError) as error:
        raise ValueError('人物预览配置无法读取') from error
    return isinstance(value, dict) and value.get('enabled') is True


def _sha(path: Path) -> str | None:
    return hashlib.sha256(path.read_bytes()).hexdigest() if path.is_file() else None


def _record(target: Path) -> dict:
    try:
        value = json.loads(selection_path(target).read_text(encoding='utf-8'))
        return value if isinstance(value, dict) else {}
    except (OSError, ValueError):
        return {}


def _protected(target: Path, snapshot: Path, record: dict) -> bool:
    if not target.exists() and not Path(str(target) + '.rule').exists():
        return False
    if artifact_rules.current(target, source=snapshot):
        return False
    return not (record.get('version') == VERSION and record.get('poster_sha256') == _sha(target)
                and artifact_rules.current(target, upgrade_rules.LOCAL_POSTERS,
                                           source_required=True, check_source=False))


@lru_cache(maxsize=4)
def _detectors(tools: Path):
    import cv2
    from .body_pose import FullBodyDetector
    from .face_detect import FaceDetector, MODEL_PATH, MODEL_SHA256
    model = tools / 'yunet' / MODEL_PATH.name
    if not model.is_file() or _sha(model) != MODEL_SHA256:
        raise ValueError('人物选图缺少有效人脸模型，请先准备模型')
    try:
        return FaceDetector(model, allow_download=False), FullBodyDetector(tools)
    except cv2.error as error:
        raise ValueError('人脸模型加载未取得') from error


def face_quality(face, image) -> float | None:
    """五点几何仅估计朝向；脸部区域衡量清晰度和曝光，不匹配身份。"""
    import cv2
    import numpy as np
    height, width = image.shape[:2]
    fw, fh = face.width * width, face.height * height
    if face.score < .85 or fw < 28 or fh < 32 or len(face.landmarks) != 10:
        return None
    edges = (face.cx - face.width / 2, face.cy - face.height / 2,
             face.cx + face.width / 2, face.cy + face.height / 2)
    if min(edges[:2]) <= .005 or max(edges[2:]) >= .995:
        return None
    points = np.array(face.landmarks).reshape(5, 2) * np.array([width, height])
    eye0, eye1, nose, mouth0, mouth1 = points
    eyes = eye1 - eye0
    span = float(np.linalg.norm(eyes))
    if span < 10 or span / fw < .25:
        return None
    axis = eyes / span
    mid = (eye0 + eye1) / 2
    vertical = np.array([-axis[1], axis[0]])
    nose_down = float(np.dot(nose - mid, vertical)) / span
    mouth_down = float(np.dot((mouth0 + mouth1) / 2 - mid, vertical)) / span
    if not .10 < nose_down < 1.2 or not nose_down + .10 < mouth_down < 2.:
        return None
    facing = max(0., 1. - abs(float(np.dot(nose - mid, axis))) / (.48 * span))
    upright = max(0., 1. - abs(math.atan2(float(eyes[1]), float(eyes[0]))) / (math.pi / 2))
    left, top, right, bottom = (int(edges[0] * width), int(edges[1] * height),
                               math.ceil(edges[2] * width), math.ceil(edges[3] * height))
    grey = cv2.cvtColor(image[top:bottom, left:right], cv2.COLOR_BGR2GRAY)
    sharp = float(cv2.Laplacian(grey, cv2.CV_64F).var())
    light = float(grey.mean())
    clipped = float(((grey < 12) | (grey > 245)).mean())
    if facing < .62 or upright < .55 or not 28 < light < 228 or sharp < 18 or clipped > .42:
        return None
    return (.35 * min(1., fw / 100.) + .25 * facing
            + .18 * min(1., math.log1p(sharp) / math.log1p(450.)) + .12 * upright + .10 * face.score)


def _bgr(candidate):
    import cv2
    import numpy as np
    return cv2.cvtColor(np.asarray(candidate.image), cv2.COLOR_RGB2BGR)


def _face_score(candidate, detector):
    import cv2
    image = _bgr(candidate)
    try:
        scores = [score for face in detector.detect(image) if (score := face_quality(face, image)) is not None]
    except cv2.error as error:
        raise ValueError('人脸检出未取得') from error
    return max(scores) if scores else None


def _grid_frames(snapshot: Path, duration: float) -> list[Candidate]:
    with Image.open(snapshot) as grid:
        grid = grid.convert('RGB')
        if grid.width % 3 or grid.height % 3:
            raise ValueError('九宫格尺寸不完整')
        width, height = grid.width // 3, grid.height // 3
        frames = []
        for cell in range(9):
            left, top = (cell % 3) * width, (cell // 3) * height
            frames.append(Candidate(grid.crop((left, top, left + width, top + height)),
                                    duration * (.03 + .94 * (cell + .5) / 9), cell))
        return frames


def _extra_frames(video, duration, resolver, *, progress, deadline, attempts):
    from .frame_capture import capture_with_retry
    from .hardware_transcode import frame_decode_options
    choice = resolver.ffmpeg()
    if choice is None:
        raise ValueError('未找到 FFmpeg，人物补采样未取得')
    options = frame_decode_options(str(choice.path), str(video))
    with tempfile.TemporaryDirectory(prefix='peach-representative-') as directory:
        for index, timestamp in enumerate(extra_timestamps(duration)):
            remaining = deadline - time.monotonic()
            if remaining <= .2:
                attempts.append({'status': 'time-budget-exhausted'})
                break
            progress()
            path = Path(directory) / f'{index}.jpg'
            diagnostic = {}
            ok = capture_with_retry(str(choice.path), str(video), timestamp, path, width=640,
                                    timeout=min(15, remaining), diagnostics=diagnostic, decode_options=options)
            attempts.append({'timestamp': timestamp, 'status': 'captured' if ok else 'failed',
                             'reason': diagnostic.get('reason')})
            if ok:
                with Image.open(path) as image:
                    yield Candidate(image.convert('RGB'), timestamp)


def _choose(frames, extra, face, body, progress, deadline):
    ranked = []
    for candidate in frames:
        progress()
        if time.monotonic() >= deadline:
            raise TimeoutError('人物选图时间预算已用完，可重试')
        if (score := _face_score(candidate, face)) is not None:
            ranked.append((score, candidate))
    if not ranked:
        for candidate in extra:
            frames.append(candidate)
            score = _face_score(candidate, face)
            if score is not None:
                ranked.append((score, candidate))
    if ranked:
        score, candidate = max(ranked, key=lambda pair: (pair[0], pair[1].cell == 4))
        return candidate, 'face', score
    ranked = []
    for candidate in frames:
        progress()
        if time.monotonic() >= deadline:
            break
        if (score := body.score(_bgr(candidate))) is not None:
            ranked.append((score, candidate))
    if ranked:
        score, candidate = max(ranked, key=lambda pair: (pair[0], pair[1].cell == 4))
        return candidate, 'full-body', score
    return None, 'not-found', None


def _publish(target, candidate, record, video, stamp, snapshot, cover, deadline):
    from .previews import poster_write_lock
    paths = (target, Path(str(target) + '.rule'), selection_path(target))
    target.parent.mkdir(parents=True, exist_ok=True)
    remaining = deadline - time.monotonic()
    if remaining <= 0:
        raise TimeoutError('人物选图时间预算已用完，可重试')
    with poster_write_lock(target, timeout=min(45, remaining)):
        if time.monotonic() >= deadline:
            raise TimeoutError('人物预览发布超时，可重试')
        # 推理不持写锁；正式封面或人工图可能在这段时间由其他操作安装。
        if (cover is not None and cover.is_file()) or _protected(target, snapshot, _record(target)):
            return None
        if artifact_rules.fingerprint(snapshot) != record['grid']:
            raise ValueError('选图期间九宫格发生变化，请重试')
        old = {path: path.read_bytes() if path.is_file() else None for path in paths}
        if artifact_rules.fingerprint(video) != stamp:
            raise ValueError('选图期间原片发生变化，请重试')
        try:
            if candidate is not None:
                with atomic_path(target) as temporary:
                    candidate.image.save(temporary, format='JPEG', quality=95)
                    with Image.open(temporary) as check:
                        check.load()
                source = snapshot if candidate.cell is not None else video
                source_stamp = record['grid'] if candidate.cell is not None else stamp
                if not artifact_rules.remember(target, upgrade_rules.LOCAL_POSTERS,
                                                source=source, source_fingerprint=source_stamp):
                    raise ValueError('选图来源发生变化，人物预览未登记')
            record['poster_sha256'] = _sha(target)
            atomic_write_text(selection_path(target), json.dumps(record, ensure_ascii=False))
        except BaseException:
            for path, content in old.items():
                if content is None:
                    path.unlink(missing_ok=True)
                else:
                    atomic_write_bytes(path, content)
            if old[paths[1]] is not None and old[target] is not None:
                previous = json.loads(old[paths[1]])
                if isinstance(previous, dict) and previous.get('source'):
                    source = Path(previous['source']['path'])
                    restored = artifact_rules.remember(target, previous['rule'], source=source,
                                                       source_fingerprint=previous['source'])
                    if previous['source'] == artifact_rules.fingerprint(source) and not restored:
                        raise ValueError('旧海报已恢复，来源签名恢复未取得')
            raise
    return candidate is not None


def select_preview(config, row, resolver, snapshot, *, progress, deadline) -> bool:
    """只处理已启用实例；正式封面、配套图片及未知人工海报不参与自动替换。"""
    if not enabled(config.directory('state')):
        return False
    from .catalog_rules import normalise_code_key
    from .platform import translate_ledger_path
    code = normalise_code_key(row.get('code'))
    cover = config.directory('generated') / 'covers' / f'{code}.jpg' if code else None
    if cover is not None and cover.is_file():
        return False
    target = config.directory('generated') / 'posters' / f"{row['id']}_4.jpg"
    record = _record(target)
    if _protected(target, snapshot, record):
        return False
    video = translate_ledger_path(row['path'])
    stamp = artifact_rules.fingerprint(video)
    grid_stamp = artifact_rules.fingerprint(snapshot)
    cached_none = record.get('kind') == 'not-found' and record.get('sampling_complete') is True
    cached_image = (record.get('kind') in ('face', 'full-body') and record.get('poster_sha256') == _sha(target)
                    and (record.get('kind') == 'face' or record.get('sampling_complete') is True))
    if (record.get('version') == VERSION and record.get('media') == stamp and record.get('grid') == grid_stamp
            and (cached_none or cached_image)):
        return False
    duration = float(row.get('duration') or 0)
    if duration <= 0:
        raise ValueError('视频时长未取得，人物预览未采样')
    face, body = _detectors(config.directory('tools'))
    frames = _grid_frames(snapshot, duration)
    attempts = []
    # 给全身回退留出推理时间，避免慢速抽帧消耗全部单片预算。
    extra = _extra_frames(video, duration, resolver, progress=progress, deadline=deadline - 5, attempts=attempts)
    candidate, kind, score = _choose(frames, extra, face, body, progress, deadline)
    if grid_stamp != artifact_rules.fingerprint(snapshot):
        raise ValueError('选图期间九宫格发生变化，请重试')
    record = dict(version=VERSION, media=stamp, grid=grid_stamp, kind=kind, score=score,
                  timestamp=candidate.timestamp if candidate else None, cell=candidate.cell if candidate else None,
                  examined_frames=len(frames), extra_attempts=attempts,
                  sampling_complete=all(attempt['status'] == 'captured' for attempt in attempts)
                      and time.monotonic() < deadline,
                  completed=time.time())
    installed = _publish(target, candidate, record, video, stamp, snapshot, cover, deadline)
    if installed is None:
        return False
    if kind != 'face' and not record['sampling_complete']:
        raise ValueError('九宫格与可用候选已保留，人物补采样未完成，可重试')
    return installed


def main(argv=None):
    import argparse
    from .settings_file import active
    parser = argparse.ArgumentParser(description='准备离线人物选图模型并设置本机偏好')
    parser.add_argument('--prepare-models', action='store_true')
    choices = parser.add_mutually_exclusive_group()
    choices.add_argument('--enable', action='store_true')
    choices.add_argument('--disable', action='store_true')
    args = parser.parse_args(argv)
    config = active()
    if args.prepare_models:
        from .body_pose import prepare_models
        from .face_detect import ensure_model, MODEL_PATH
        prepare_models(config.directory('tools'))
        ensure_model(config.directory('tools') / 'yunet' / MODEL_PATH.name)
    if args.enable:
        _detectors(config.directory('tools'))
    if args.enable or args.disable:
        atomic_write_text(config.directory('state') / FILENAME,
                          json.dumps({'enabled': args.enable}) + '\n')
        print('人物代表帧已启用' if args.enable else '人物代表帧已关闭')
    if not (args.prepare_models or args.enable or args.disable):
        parser.print_help()


if __name__ == '__main__':
    main()
