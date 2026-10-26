"""在可终止的子进程中读取配套图片，主任务只消费本机临时产物。"""
from __future__ import annotations

import argparse
import hashlib
import io
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile

from PIL import Image

TIMEOUT_SECONDS = 20.0
MAX_BYTES = 32 * 1024 * 1024


def read_jpeg(source: Path, *, isolated=True, expected_sha256='') -> tuple[bytes, tuple[int, int]]:
    if not isolated:
        return _decode(source, expected_sha256)
    from .images import measure_image_size
    options = ['--sha256', expected_sha256] if expected_sha256 else []
    data = _worker_bytes(source, '.jpg', options)
    size = measure_image_size(data)
    if size is None:
        raise ValueError('配套图片无法读取')
    return data, size


def read_fingerprint(source: Path, *, isolated=True) -> tuple[str, str]:
    """完整解码的像素哈希与原文件哈希；挂载图片沿用可终止的读取进程。"""
    if not isolated:
        return _fingerprint(source)
    return tuple(json.loads(_worker_bytes(source, '.json', ['--fingerprint'])))


def _worker_bytes(source, suffix, options):
    command = ([sys.executable, 'local-image'] if getattr(sys, 'frozen', False)
               else [sys.executable, '-m', 'peach.local_poster'])
    with tempfile.TemporaryDirectory(prefix='peach-local-poster-') as temporary:
        output = Path(temporary).resolve() / ('poster' + suffix)
        result = subprocess.run([*command, str(source), str(output), *options], stdin=subprocess.DEVNULL,
                                stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=TIMEOUT_SECONDS,
                                creationflags=subprocess.CREATE_NO_WINDOW if os.name == 'nt' else 0)
        if result.returncode:
            raise ValueError('配套图片无法读取')
        data = output.read_bytes()
    return data


def _source_bytes(source):
    with source.open('rb') as handle:
        data = handle.read(MAX_BYTES + 1)
    if len(data) > MAX_BYTES:
        raise ValueError('配套图片体积超出范围')
    return data


def _fingerprint(source):
    data = _source_bytes(source)
    with Image.open(io.BytesIO(data)) as image:
        if getattr(image, 'n_frames', 1) != 1:
            raise ValueError('配套图片必须是静态图片')
        image.load()
        digest = hashlib.sha256(str(image.size).encode())
        digest.update(image.convert('RGBA').tobytes())
    return digest.hexdigest(), hashlib.sha256(data).hexdigest()


def _decode(source, expected_sha256=''):
    try:
        data = _source_bytes(source)
        if expected_sha256 and hashlib.sha256(data).hexdigest() != expected_sha256:
            raise ValueError('配套图片内容已变化')
        with Image.open(io.BytesIO(data)) as image:
            if getattr(image, 'n_frames', 1) != 1:
                raise ValueError('配套图片必须是静态图片')
            image.load()
            output = io.BytesIO()
            image.convert('RGB').save(output, format='JPEG', quality=95)
            return output.getvalue(), image.size
    except (OSError, ValueError, Image.DecompressionBombError) as error:
        raise ValueError('配套图片无法读取') from error


def main(argv=None):
    parser = argparse.ArgumentParser(description='读取单张配套图片')
    parser.add_argument('source', type=Path)
    parser.add_argument('output', type=Path)
    parser.add_argument('--fingerprint', action='store_true')
    parser.add_argument('--sha256', default='')
    args = parser.parse_args(argv)
    try:
        if args.fingerprint:
            data = json.dumps(_fingerprint(args.source)).encode('utf-8')
        else:
            data, _ = _decode(args.source, args.sha256)
        args.output.write_bytes(data)
        return 0
    except (OSError, ValueError, Image.DecompressionBombError):
        return 1


if __name__ == '__main__':
    raise SystemExit(main())
