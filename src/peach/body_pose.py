"""离线姿态取景：按可见头部与双脚关键点筛选完整人物候选。"""
from __future__ import annotations

import hashlib
import math
import tempfile
from dataclasses import dataclass
from pathlib import Path


ZOO_COMMIT = "48b10fa505aeb51fbd127fc60a5c660040e823b7"
ZOO_MEDIA = f"https://media.githubusercontent.com/media/opencv/opencv_zoo/{ZOO_COMMIT}/models/"


@dataclass(frozen=True)
class ModelSpec:
    filename: str
    url: str
    sha256: str


MODELS = (
    ModelSpec(
        "person_detection_mediapipe_2023mar.onnx",
        ZOO_MEDIA + "person_detection_mediapipe/person_detection_mediapipe_2023mar.onnx",
        "47fd5599d6fa17608f03e0eb0ae230baa6e597d7e8a2c8199fe00abea55a701f",
    ),
    ModelSpec(
        "pose_estimation_mediapipe_2023mar.onnx",
        ZOO_MEDIA + "pose_estimation_mediapipe/pose_estimation_mediapipe_2023mar.onnx",
        "9d89c599319a18fb7d2e28451a883476164543182bafca5f09eb2cf767ed2f3f",
    ),
)


class BodyModelUnavailable(RuntimeError):
    """姿态模型缺失、校验失败或推理依赖不可用。"""


def _verified_bytes(path: Path, model: ModelSpec) -> bytes:
    try:
        payload = path.read_bytes()
    except FileNotFoundError as error:
        raise BodyModelUnavailable(f"缺少姿态取景模型：{path}；请先显式准备模型") from error
    except InterruptedError:
        raise
    except OSError as error:
        raise BodyModelUnavailable(f"无法读取姿态取景模型：{path}：{error}") from error
    actual = hashlib.sha256(payload).hexdigest()
    if actual != model.sha256:
        raise BodyModelUnavailable(
            f"姿态取景模型校验不符：{path}；期望 {model.sha256}，实际 {actual}"
        )
    return payload


def prepare_models(tools_root: Path) -> tuple[Path, ...]:
    """显式联网准备固定模型；下载验证通过后原子替换目标文件。"""
    import httpx
    from .peach_proxy import read_url

    folder = Path(tools_root) / "person-preview"
    paths = tuple(folder / model.filename for model in MODELS)
    for model, path in zip(MODELS, paths):
        if path.is_file():
            try:
                _verified_bytes(path, model)
            except BodyModelUnavailable:
                pass
            else:
                continue
        try:
            payload = read_url(model.url, timeout=60)
        except InterruptedError:
            raise
        except (OSError, httpx.HTTPError) as error:
            raise BodyModelUnavailable(f"下载姿态取景模型失败：{model.filename}：{error}") from error
        actual = hashlib.sha256(payload).hexdigest()
        if actual != model.sha256:
            raise BodyModelUnavailable(
                f"姿态取景模型下载校验不符：{model.filename}；期望 {model.sha256}，实际 {actual}"
            )
        temporary = None
        try:
            folder.mkdir(parents=True, exist_ok=True)
            with tempfile.NamedTemporaryFile(dir=folder, prefix=f".{path.name}.", suffix=".part",
                                             delete=False) as output:
                temporary = Path(output.name)
                output.write(payload)
            temporary.replace(path)
        except InterruptedError:
            raise
        except OSError as error:
            raise BodyModelUnavailable(f"保存姿态取景模型失败：{path}：{error}") from error
        finally:
            if temporary is not None:
                temporary.unlink(missing_ok=True)
    return paths


def full_body_quality(landmarks, confidence: float,
                      image_size: tuple[int, int]) -> float | None:
    """按原帧像素坐标筛选全身候选；质量结合关键点可信度和人物相对跨度。

    前 33 点遵循 MediaPipe：0–10 为头部，27–32 为双踝、足跟、足尖。
    visibility 和 presence 必须同时达标；总姿态分数无法证明脚部可见。
    这些点不包含头顶，因此结果是完整人物候选，仍保留模型估计的局限。
    """
    try:
        width, height = image_size
        confidence = float(confidence)
        if (width <= 0 or height <= 0 or not math.isfinite(width) or not math.isfinite(height)
                or not math.isfinite(confidence) or not 0.8 <= confidence <= 1
                or len(landmarks) < 33):
            return None
        margin = min(width, height) * 0.02

        def visible_point(index):
            x, y, _, visibility, presence = map(float, landmarks[index])
            if (not all(map(math.isfinite, (x, y, visibility, presence)))
                    or not 0.8 <= visibility <= 1 or not 0.8 <= presence <= 1
                    or not margin <= x < width - margin or not margin <= y < height - margin):
                return None
            return x, y, min(visibility, presence)

        feet = [visible_point(index) for index in range(27, 33)]
        if any(point is None for point in feet):
            return None
        heads = [point for index in range(11) if (point := visible_point(index)) is not None]
        if not heads:
            return None
        confidence = min(confidence, *(point[2] for point in feet))
        diagonal = math.hypot(width, height)
        return max(
            min(confidence, head[2]) * max(math.hypot(head[0] - foot[0], head[1] - foot[1])
                                         for foot in feet) / diagonal
            for head in heads
        )
    except (TypeError, ValueError, IndexError, OverflowError):
        return None


class FullBodyDetector:
    """构造时只校验本地模型；首次取景时加载 OpenCV 与官方适配器。"""

    def __init__(self, tools_root: Path) -> None:
        folder = Path(tools_root) / "person-preview"
        self._model_bytes = tuple(_verified_bytes(folder / model.filename, model) for model in MODELS)
        self._person = None
        self._pose = None

    def _load(self) -> None:
        if self._person is not None:
            return
        try:
            from cv2 import error as OpenCVError
            from ._vendor.mediapipe_person import MPPersonDet
            from ._vendor.mediapipe_pose import MPPose
        except ImportError as error:
            raise BodyModelUnavailable(f"姿态取景依赖不可用：{error}") from error
        try:
            person = MPPersonDet(self._model_bytes[0])
            pose = MPPose(self._model_bytes[1], confThreshold=0.8)
        except InterruptedError:
            raise
        except (OpenCVError, OSError, ValueError) as error:
            raise BodyModelUnavailable(f"无法加载已校验的姿态取景模型：{error}") from error
        self._person, self._pose = person, pose

    def score(self, bgr) -> float | None:
        """返回画面中最佳完整人物候选质量；没有合格候选时返回 None。"""
        self._load()
        from cv2 import error as OpenCVError

        height, width = bgr.shape[:2]
        best = None
        try:
            people = sorted(self._person.infer(bgr), key=lambda person: float(person[-1]), reverse=True)
            for person in people[:3]:
                # 官方姿态预处理会修改传入定位点，不能污染检测结果。
                pose = self._pose.infer(bgr, person.copy())
                if pose is not None:
                    quality = full_body_quality(pose[1], pose[-1], (width, height))
                    if quality is not None:
                        best = quality if best is None else max(best, quality)
        except OpenCVError as error:
            raise ValueError(f"姿态取景推理失败：{error}") from error
        return best
