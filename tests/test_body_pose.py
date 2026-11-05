import hashlib
import tempfile
import unittest
from dataclasses import replace
from pathlib import Path
from unittest.mock import Mock, patch

from peach import body_pose


def complete_landmarks():
    points = [[320.0, 240.0, 0.0, 0.95, 0.95] for _ in range(39)]
    points[0] = [320.0, 70.0, 0.0, 0.95, 0.95]
    for index in range(27, 33):
        points[index] = [280.0 + (index % 2) * 80, 410.0, 0.0, 0.95, 0.95]
    return points


class FullBodyQualityTests(unittest.TestCase):
    def test_visible_head_and_both_feet_have_a_bounded_quality(self):
        quality = body_pose.full_body_quality(complete_landmarks(), 0.97, (640, 480))
        self.assertGreater(quality, 0)
        self.assertLessEqual(quality, 1)

    def test_cut_legs_are_rejected_despite_high_presence_and_pose_score(self):
        points = complete_landmarks()
        points[29][3] = 0.061
        self.assertIsNone(body_pose.full_body_quality(points, 0.905, (640, 480)))

    def test_every_ankle_heel_and_toe_must_be_visible_and_present(self):
        for index in range(27, 33):
            for score_column in (3, 4):
                with self.subTest(index=index, score_column=score_column):
                    points = complete_landmarks()
                    points[index][score_column] = 0.79
                    self.assertIsNone(body_pose.full_body_quality(points, 0.97, (640, 480)))

    def test_required_points_need_space_inside_the_original_frame(self):
        for coordinate in (-1.0, 1.0, 639.0, 641.0):
            points = complete_landmarks()
            points[31][0] = coordinate
            self.assertIsNone(body_pose.full_body_quality(points, 0.97, (640, 480)))

    def test_at_least_one_head_point_must_be_reliable_and_inside_the_frame(self):
        points = complete_landmarks()
        for index in range(11):
            points[index][3] = 0.1
        self.assertIsNone(body_pose.full_body_quality(points, 0.97, (640, 480)))

    def test_invalid_coordinates_and_low_pose_confidence_are_rejected(self):
        for confidence in (0.79, float('nan'), float('inf')):
            self.assertIsNone(body_pose.full_body_quality(complete_landmarks(), confidence, (640, 480)))
        for value in (float('nan'), float('inf')):
            points = complete_landmarks()
            points[28][0] = value
            self.assertIsNone(body_pose.full_body_quality(points, 0.97, (640, 480)))
        self.assertIsNone(body_pose.full_body_quality([], 0.97, (640, 480)))

    def test_larger_complete_person_ranks_above_a_smaller_one(self):
        large = complete_landmarks()
        small = [[320 + (x - 320) / 2, 240 + (y - 240) / 2, z, v, p]
                 for x, y, z, v, p in large]
        self.assertGreater(body_pose.full_body_quality(large, 0.97, (640, 480)),
                           body_pose.full_body_quality(small, 0.97, (640, 480)))


class BodyModelTests(unittest.TestCase):
    def setUp(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        self.root = Path(temporary.name).resolve() / '中文工具'
        self.payload = b'verified-body-model'
        self.models = tuple(replace(model, sha256=hashlib.sha256(self.payload).hexdigest())
                            for model in body_pose.MODELS)
        self.enterContext(patch.object(body_pose, 'MODELS', self.models))

    def write_models(self):
        folder = self.root / 'person-preview'
        folder.mkdir(parents=True)
        for model in self.models:
            (folder / model.filename).write_bytes(self.payload)
        return folder

    def test_missing_models_raise_without_creating_files_or_using_the_network(self):
        with patch('peach.peach_proxy.read_url') as reader:
            with self.assertRaises(body_pose.BodyModelUnavailable) as caught:
                body_pose.FullBodyDetector(self.root)
        self.assertIn('缺少', str(caught.exception))
        self.assertFalse(self.root.exists())
        reader.assert_not_called()

    def test_corrupted_offline_model_is_preserved_and_not_downloaded(self):
        folder = self.write_models()
        target = folder / self.models[0].filename
        target.write_bytes(b'corrupted-model')
        with patch('peach.peach_proxy.read_url') as reader:
            with self.assertRaises(body_pose.BodyModelUnavailable) as caught:
                body_pose.FullBodyDetector(self.root)
        self.assertIn('校验不符', str(caught.exception))
        self.assertEqual(target.read_bytes(), b'corrupted-model')
        reader.assert_not_called()

    def test_valid_models_are_prepared_without_network(self):
        folder = self.write_models()
        with patch('peach.peach_proxy.read_url') as reader:
            result = body_pose.prepare_models(self.root)
        self.assertEqual(result, tuple(folder / model.filename for model in self.models))
        reader.assert_not_called()

    def test_preparation_installs_only_verified_downloads(self):
        with patch('peach.peach_proxy.read_url', return_value=self.payload):
            paths = body_pose.prepare_models(self.root)
        self.assertEqual(tuple(path.read_bytes() for path in paths), (self.payload, self.payload))

    def test_failed_preparation_preserves_the_existing_copy(self):
        folder = self.write_models()
        target = folder / self.models[0].filename
        target.write_bytes(b'previous-copy')
        with patch('peach.peach_proxy.read_url', return_value=b'invalid-download'):
            with self.assertRaises(body_pose.BodyModelUnavailable):
                body_pose.prepare_models(self.root)
        self.assertEqual(target.read_bytes(), b'previous-copy')
        self.assertEqual(sorted(path.name for path in folder.iterdir()),
                         sorted(model.filename for model in self.models))

    def test_network_failure_preserves_the_existing_copy(self):
        folder = self.write_models()
        target = folder / self.models[0].filename
        target.write_bytes(b'previous-copy')
        with patch('peach.peach_proxy.read_url', side_effect=OSError('network unavailable')):
            with self.assertRaises(body_pose.BodyModelUnavailable):
                body_pose.prepare_models(self.root)
        self.assertEqual(target.read_bytes(), b'previous-copy')

    def test_model_validation_does_not_import_vision_dependencies(self):
        self.write_models()
        with patch.dict('sys.modules', {'cv2': None, 'numpy': None}):
            body_pose.FullBodyDetector(self.root)

    def test_inference_gives_each_pose_a_copy_and_accepts_complete_people(self):
        import numpy as np
        self.write_models()
        detector = body_pose.FullBodyDetector(self.root)
        people = np.ones((2, 13), dtype=np.float32)
        person_model = Mock()
        person_model.infer.return_value = people
        pose_model = Mock()

        def infer(image, person):
            person[:] = -100
            return [None, complete_landmarks(), None, None, None, 0.97]

        pose_model.infer.side_effect = infer
        with patch('peach._vendor.mediapipe_person.MPPersonDet', return_value=person_model) as create_person, \
                patch('peach._vendor.mediapipe_pose.MPPose', return_value=pose_model) as create_pose:
            quality = detector.score(np.zeros((480, 640, 3), dtype=np.uint8))
        self.assertGreater(quality, 0)
        self.assertTrue(np.all(people == 1))
        self.assertEqual(create_person.call_args.args, (self.payload,))
        self.assertEqual(create_pose.call_args.args, (self.payload,))

    def test_inference_returns_none_when_no_pose_has_complete_feet(self):
        import numpy as np
        self.write_models()
        detector = body_pose.FullBodyDetector(self.root)
        person_model = Mock()
        person_model.infer.return_value = np.ones((2, 13), dtype=np.float32)
        points = complete_landmarks()
        points[32][3] = 0.1
        pose_model = Mock()
        pose_model.infer.side_effect = [None, [None, points, None, None, None, 0.97]]
        with patch('peach._vendor.mediapipe_person.MPPersonDet', return_value=person_model), \
                patch('peach._vendor.mediapipe_pose.MPPose', return_value=pose_model):
            self.assertIsNone(detector.score(np.zeros((480, 640, 3), dtype=np.uint8)))

    def test_invalid_onnx_is_reported_as_a_model_failure(self):
        import cv2
        import numpy as np
        self.write_models()
        detector = body_pose.FullBodyDetector(self.root)
        with patch('peach._vendor.mediapipe_person.MPPersonDet', side_effect=cv2.error('invalid ONNX')):
            with self.assertRaises(body_pose.BodyModelUnavailable):
                detector.score(np.zeros((480, 640, 3), dtype=np.uint8))

    def test_inference_checks_only_the_three_highest_scoring_people(self):
        import numpy as np
        self.write_models()
        detector = body_pose.FullBodyDetector(self.root)
        people = np.ones((5, 13))
        people[:, -1] = [0.7, 0.95, 0.85, 0.99, 0.9]
        person_model, pose_model = Mock(), Mock()
        person_model.infer.return_value = people
        seen = []

        def infer(image, person):
            seen.append(person[-1])
            return None

        pose_model.infer.side_effect = infer
        with patch('peach._vendor.mediapipe_person.MPPersonDet', return_value=person_model), \
                patch('peach._vendor.mediapipe_pose.MPPose', return_value=pose_model):
            self.assertIsNone(detector.score(np.zeros((480, 640, 3), dtype=np.uint8)))
        self.assertEqual(seen, [0.99, 0.95, 0.9])

    def test_native_inference_errors_have_a_catchable_per_frame_failure(self):
        import cv2
        import numpy as np
        self.write_models()
        for operation in ('person', 'pose'):
            detector = body_pose.FullBodyDetector(self.root)
            person_model, pose_model = Mock(), Mock()
            person_model.infer.return_value = np.ones((1, 13))
            failure = cv2.error('native inference failed')
            (person_model if operation == 'person' else pose_model).infer.side_effect = failure
            with patch('peach._vendor.mediapipe_person.MPPersonDet', return_value=person_model), \
                    patch('peach._vendor.mediapipe_pose.MPPose', return_value=pose_model):
                with self.assertRaises(ValueError) as caught:
                    detector.score(np.zeros((480, 640, 3), dtype=np.uint8))
            self.assertIs(caught.exception.__cause__, failure)

    def test_interruption_propagates_without_becoming_a_candidate_failure(self):
        import numpy as np
        self.write_models()
        detector = body_pose.FullBodyDetector(self.root)
        person_model = Mock()
        failure = InterruptedError('cancelled')
        person_model.infer.side_effect = failure
        with patch('peach._vendor.mediapipe_person.MPPersonDet', return_value=person_model), \
                patch('peach._vendor.mediapipe_pose.MPPose', return_value=Mock()):
            with self.assertRaises(InterruptedError) as caught:
                detector.score(np.zeros((480, 640, 3), dtype=np.uint8))
        self.assertIs(caught.exception, failure)


class PersonAdapterTests(unittest.TestCase):
    def test_named_outputs_are_decoded_in_the_model_contract_order(self):
        import cv2
        import numpy as np
        from peach._vendor.mediapipe_person import MPPersonDet

        net = Mock()
        net.getUnconnectedOutLayersNames.return_value = ('Identity_1:0', 'Identity:0')
        values = {'Identity:0': np.zeros((1, 2254, 12), np.float32),
                  'Identity_1:0': np.full((1, 2254, 1), -100.0, np.float32)}
        net.forward.side_effect = lambda names: [values[name] for name in names]
        with patch.object(cv2.dnn, 'readNetFromONNX', return_value=net) as load:
            detector = MPPersonDet(b'person-onnx')
            result = detector.infer(np.zeros((480, 640, 3), np.uint8))
        self.assertEqual(result.shape, (0, 13))
        self.assertEqual(load.call_args.args[0].tobytes(), b'person-onnx')

    def test_non_overlapping_people_are_not_suppressed_by_corner_coordinates(self):
        import cv2
        import numpy as np
        from peach._vendor.mediapipe_person import MPPersonDet

        with patch.object(cv2.dnn, 'readNetFromONNX', return_value=Mock()):
            detector = MPPersonDet(b'person-onnx')
        boxes = np.zeros((1, 2254, 12), np.float32)
        scores = np.full((1, 2254, 1), -100.0, np.float32)
        for index, center_x in enumerate((105, 120)):
            boxes[0, index, :2] = (np.array([center_x, 105]) / 640 - detector.anchors[index]) * 224
            boxes[0, index, 2:4] = 10 / 640 * 224
            scores[0, index, 0] = 10
        people = detector._postprocess([boxes, scores], np.array([640, 640]), np.array([0, 0]))
        self.assertEqual(len(people), 2)
        np.testing.assert_allclose(people[:, 2:4] - people[:, :2], 10, atol=0.001)


if __name__ == '__main__':
    unittest.main()
