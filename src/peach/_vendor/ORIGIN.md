---
kind: reference
---

# MediaPipe 姿态适配器来源

这两个适配器来自 OpenCV Zoo 固定提交 `48b10fa505aeb51fbd127fc60a5c660040e823b7`，使用 OpenCV DNN 和 NumPy，许可为 Apache-2.0。

| 本地文件 | 上游源码 | 原文 SHA-256 | 许可正文 |
| --- | --- | --- | --- |
| `mediapipe_person.py` | [mp_persondet.py](https://github.com/opencv/opencv_zoo/blob/48b10fa505aeb51fbd127fc60a5c660040e823b7/models/person_detection_mediapipe/mp_persondet.py) | `e530a8ebc3c218376d5dd1c13aa8ed39a850fac4dbcd6928144746b33477b9c7` | [LICENSE.person](LICENSE.person) |
| `mediapipe_pose.py` | [mp_pose.py](https://github.com/opencv/opencv_zoo/blob/48b10fa505aeb51fbd127fc60a5c660040e823b7/models/pose_estimation_mediapipe/mp_pose.py) | `7e1953d1fb848c64fd3b44277e615e273e7fb2f325f7633eb9c1e32948d45e67` | [LICENSE.pose](LICENSE.pose) |

适配器接收已验证的模型字节，通过 `readNetFromONNX` 加载，文件路径由 Python 读取。两模型都显式指定 ONNX 输出名称，解码顺序不依赖 OpenCV 的默认返回顺序。

人体适配器的 2,254 个 anchors 按 `((28, 2), (14, 2), (7, 6))` 的网格大小和重复次数生成，展开次序为网格、纵坐标、横坐标、重复项，中心为 `(坐标 + 0.5) / 网格大小`。结果与上游表在 float64 和 float32 下均逐元素相同。NMS 输入使用 `x,y,width,height`，对外输出仍为 `x1,y1,x2,y2`。

上游姿态预处理会修改人物定位点，调用方传入副本。返回的屏幕关键点已映射回原图像素坐标，列为 `x,y,z,visibility,presence`；前 33 点为人体关键点，后六点为辅助点。全身候选的可信度、边界和排序策略由 `peach.body_pose` 维护。

模型二进制不进入 Git，下载地址与 SHA-256 固定在 `peach.body_pose.MODELS`。显式准备入口下载并验证，检测器只读取本地已验证模型。
