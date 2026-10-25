"""用合成画面探测 FFmpeg 硬件编码，共享整片与分片的尝试链。"""
from __future__ import annotations

import logging
import os
import subprocess
import sys
import threading
from dataclasses import dataclass
from pathlib import Path

logger = logging.getLogger(__name__)
CUDA_DECODE_CODECS = frozenset({"h264", "hevc", "vp9", "av1"})
QSV_DECODE_CODECS = frozenset({"h264", "hevc", "vp9", "av1", "mpeg2video"})
PROBE_TIMEOUT_SECONDS = 10


@dataclass(frozen=True)
class HardwareAttempt:
    name: str
    before_input: tuple[str, ...]
    output: tuple[str, ...]


@dataclass(frozen=True)
class HardwareEncoder:
    backend: str
    device: str = ""

    def attempts(self, codec: str) -> tuple[HardwareAttempt, ...]:
        if self.backend == "nvenc":
            output = ("-c:v", "h264_nvenc", "-preset", "p1", "-tune", "hq",
                      "-rc", "vbr", "-cq", "21", "-b:v", "0")
            software_decode = HardwareAttempt("nvenc", (), output + ("-pix_fmt", "yuv420p"))
            if codec not in CUDA_DECODE_CODECS:
                return (software_decode,)
            return (HardwareAttempt(
                "cuda-nvenc", ("-hwaccel", "cuda", "-hwaccel_output_format", "cuda"),
                ("-vf", "scale_cuda=format=nv12") + output,
            ), software_decode)
        if self.backend == "qsv":
            output = ("-c:v", "h264_qsv", "-global_quality", "21")
            device = ("-qsv_device", self.device) if self.device else ()
            software_decode = HardwareAttempt(
                "qsv-encode", device,
                ("-vf", "format=nv12,hwupload=extra_hw_frames=64") + output,
            )
            if codec not in QSV_DECODE_CODECS:
                return (software_decode,)
            return (HardwareAttempt(
                "qsv", device + ("-hwaccel", "qsv", "-hwaccel_output_format", "qsv"),
                ("-vf", "scale_qsv=format=nv12") + output,
            ), software_decode)
        device = ("-vaapi_device", self.device)
        output = ("-c:v", "h264_vaapi", "-qp", "21")
        return (
            HardwareAttempt(
                "vaapi", device + ("-hwaccel", "vaapi", "-hwaccel_device", self.device,
                                    "-hwaccel_output_format", "vaapi"),
                ("-vf", "scale_vaapi=format=nv12") + output,
            ),
            HardwareAttempt("vaapi-encode", device,
                            ("-vf", "format=nv12,hwupload") + output),
        )


class HardwareTranscoder:
    """首次重编码时探测，结果按 FFmpeg 路径缓存；不读取媒体或写入缓存文件。"""

    def __init__(self, *, enabled: bool = True):
        self.enabled = enabled
        self.backend = os.environ.get("PEACH_TRANSCODE_BACKEND", "auto").strip().lower()
        if self.backend not in {"auto", "software", "nvenc", "qsv", "vaapi"}:
            raise ValueError("PEACH_TRANSCODE_BACKEND 必须为 auto、software、nvenc、qsv 或 vaapi")
        self.device = os.environ.get("PEACH_VAAPI_DEVICE", "").strip()
        self.qsv_device = os.environ.get("PEACH_QSV_DEVICE", "").strip() or self.device
        self._encoders: dict[Path, tuple[HardwareEncoder, ...]] = {}
        self._lock = threading.Lock()

    def _candidates(self) -> tuple[HardwareEncoder, ...]:
        candidates = []
        if self.backend == "nvenc" or (self.backend == "auto" and (
            sys.platform == "win32" or Path("/dev/nvidia0").exists()
            or Path("/proc/driver/nvidia/version").exists()
        )):
            candidates.append(HardwareEncoder("nvenc"))
        render_nodes = [self.device] if self.device else sorted(
            path.as_posix() for path in Path("/dev/dri").glob("renderD*"))
        qsv_nodes = [self.qsv_device] if self.qsv_device else render_nodes
        if self.backend == "qsv" or (self.backend == "auto" and sys.platform.startswith("linux") and qsv_nodes):
            candidates.extend(HardwareEncoder("qsv", device) for device in (qsv_nodes or [""]))
        if self.backend == "vaapi" or (self.backend == "auto" and sys.platform.startswith("linux")):
            candidates.extend(HardwareEncoder("vaapi", device) for device in render_nodes)
        return tuple(candidates)

    def encoders(self, ffmpeg: Path) -> tuple[HardwareEncoder, ...]:
        if not self.enabled or self.backend == "software":
            return ()
        with self._lock:
            if ffmpeg not in self._encoders:
                available = []
                seen = set()
                for encoder in self._candidates():
                    if encoder.backend in seen:
                        continue
                    if self._probe(ffmpeg, encoder):
                        available.append(encoder)
                        # 同一类设备成功一次即可，换节点不再重复探测。
                        seen.add(encoder.backend)
                self._encoders[ffmpeg] = tuple(available)
                logger.info("转码硬件后端：%s", ", ".join(
                    item.backend + (f" ({item.device})" if item.device else "")
                    for item in available) or "software")
            return self._encoders[ffmpeg]

    @staticmethod
    def _probe(ffmpeg: Path, encoder: HardwareEncoder) -> bool:
        # 用软件生成一帧，再验证设备初始化、上传与 H.264 硬件编码。
        attempt = encoder.attempts("")[-1]
        command = (str(ffmpeg), "-hide_banner", "-loglevel", "error", "-nostdin",
                   *attempt.before_input, "-f", "lavfi", "-i", "color=size=640x360:rate=1",
                   "-frames:v", "1", *attempt.output, "-f", "null", "-")
        try:
            result = subprocess.run(
                command, stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL,
                stderr=subprocess.PIPE, timeout=PROBE_TIMEOUT_SECONDS,
                creationflags=subprocess.CREATE_NO_WINDOW if os.name == "nt" else 0,
            )
        except (OSError, subprocess.SubprocessError) as exc:
            logger.warning("转码硬件探测失败 %s %s：%s", encoder.backend, encoder.device, exc)
            return False
        if result.returncode:
            logger.warning("转码硬件探测失败 %s %s：%s", encoder.backend, encoder.device,
                           result.stderr.decode("utf-8", "replace")[-1000:])
        return result.returncode == 0
