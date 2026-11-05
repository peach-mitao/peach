"""人物代表帧优先级、补采样和既有图片保护。"""
import json
from pathlib import Path
import tempfile
import time
from types import SimpleNamespace
import unittest
from unittest.mock import Mock, patch

from PIL import Image

from peach import artifact_rules, upgrade_rules
from peach.face_detect import Face
from peach import representative_previews as selection


class RepresentativePreviewTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name).resolve()
        self.config = SimpleNamespace(directory=lambda name: self.root / name)
        (self.root / 'state').mkdir()
        (self.root / 'state' / selection.FILENAME).write_text('{"enabled":true}', encoding='utf-8')
        self.video = self.root / 'video.mp4'
        self.video.write_bytes(b'synthetic media')
        self.grid = self.root / 'generated' / 'snapshots' / 'grid.jpg'
        self.grid.parent.mkdir(parents=True)
        # 固定噪声只用于验证曝光/锐度分支；检出器由测试提供几何点。
        import numpy as np
        texture = np.random.default_rng(19).integers(40, 210, (270, 480, 3), dtype=np.uint8)
        self.image = Image.fromarray(texture)
        grid = Image.new('RGB', (1440, 810))
        for cell in range(9):
            grid.paste(self.image, ((cell % 3) * 480, (cell // 3) * 270))
        grid.save(self.grid)
        self.row = dict(id=1, code='', duration=90, path=str(self.video))
        self.target = self.root / 'generated' / 'posters' / '1_4.jpg'
        self.face = Face(cx=.5, cy=.5, width=.2, height=.4, score=.96,
                         landmarks=(.46,.42,.54,.42,.5,.52,.47,.61,.53,.61))

    def run_selection(self, face, body, extra=()):
        with patch.object(selection, '_detectors', return_value=(face, body)), \
                patch.object(selection, '_extra_frames', return_value=iter(extra)):
            return selection.select_preview(self.config, self.row, Mock(), self.grid,
                                            progress=lambda: None, deadline=time.monotonic() + 60)

    def metadata(self):
        return json.loads(selection.selection_path(self.target).read_text(encoding='utf-8'))

    def test_clear_face_precedes_full_body_and_can_be_read_as_local_poster(self):
        face, body = Mock(), Mock()
        face.detect.return_value = [self.face]
        self.assertTrue(self.run_selection(face, body))
        self.assertEqual(self.metadata()['kind'], 'face')
        body.score.assert_not_called()
        self.assertTrue(artifact_rules.current(self.target, upgrade_rules.LOCAL_POSTERS,
                                               source=self.grid, source_required=True))

    def test_extra_sampling_finds_a_face_before_body_fallback(self):
        face, body = Mock(), Mock()
        face.detect.side_effect = [[] for _ in range(9)] + [[self.face]]
        frame = selection.Candidate(self.image, timestamp=21.25)
        self.assertTrue(self.run_selection(face, body, [frame]))
        self.assertEqual(self.metadata()['kind'], 'face')
        self.assertEqual(self.metadata()['timestamp'], 21.25)
        body.score.assert_not_called()
        self.assertTrue(artifact_rules.current(self.target, upgrade_rules.LOCAL_POSTERS,
                                               source=self.video, source_required=True))

    def test_full_body_is_used_only_after_face_search_is_exhausted(self):
        face, body = Mock(), Mock()
        face.detect.return_value = []
        body.score.return_value = .9
        self.assertTrue(self.run_selection(face, body))
        self.assertEqual(self.metadata()['kind'], 'full-body')

    def test_no_reliable_candidate_preserves_existing_center_image(self):
        self.target.parent.mkdir(parents=True)
        self.image.save(self.target)
        artifact_rules.remember(self.target, source=self.grid)
        before = self.target.read_bytes()
        face, body = Mock(), Mock()
        face.detect.return_value = []
        body.score.return_value = None
        self.assertFalse(self.run_selection(face, body))
        self.assertEqual(self.target.read_bytes(), before)
        self.assertEqual(self.metadata()['kind'], 'not-found')

    def test_unknown_or_local_companion_posters_are_preserved(self):
        self.target.parent.mkdir(parents=True)
        self.target.write_bytes(b'personal poster')
        with patch.object(selection, '_detectors', side_effect=AssertionError('不应推理')):
            self.assertFalse(selection.select_preview(self.config, self.row, Mock(), self.grid,
                progress=lambda: None, deadline=time.monotonic() + 60))
        self.assertEqual(self.target.read_bytes(), b'personal poster')

    def test_official_cover_skips_sampling(self):
        covers = self.root / 'generated' / 'covers'
        covers.mkdir(parents=True)
        self.image.save(covers / 'ABC-123.jpg')
        self.row['code'] = 'ABC-123'
        with patch.object(selection, '_detectors', side_effect=AssertionError('不应推理')):
            self.assertFalse(selection.select_preview(self.config, self.row, Mock(), self.grid,
                progress=lambda: None, deadline=time.monotonic() + 60))

    def test_disabled_feature_does_not_require_vision_dependencies(self):
        (self.root / 'state' / selection.FILENAME).write_text('{"enabled":false}', encoding='utf-8')
        with patch.object(selection, '_detectors', side_effect=AssertionError('不应加载模型')):
            self.assertFalse(selection.select_preview(self.config, self.row, Mock(), self.grid,
                progress=lambda: None, deadline=time.monotonic() + 60))

    def test_finished_selection_is_not_repeated_and_user_replacement_is_preserved(self):
        face, body = Mock(), Mock()
        face.detect.return_value = [self.face]
        self.assertTrue(self.run_selection(face, body))
        self.target.write_bytes(b'manually replaced')
        with patch.object(selection, '_detectors', side_effect=AssertionError('不应覆盖人工图')):
            self.assertFalse(selection.select_preview(self.config, self.row, Mock(), self.grid,
                progress=lambda: None, deadline=time.monotonic() + 60))
        self.assertEqual(self.target.read_bytes(), b'manually replaced')

    def test_extra_timestamps_are_bounded_and_different_from_grid(self):
        extra = selection.extra_timestamps(100)
        grid = [100 * (.03 + .94 * (cell + .5) / 9) for cell in range(9)]
        self.assertEqual(len(extra), 27)
        self.assertTrue(all(3 < value < 97 for value in extra))
        self.assertTrue(all(abs(value - original) > .01 for value in extra for original in grid))

    def test_cached_grid_processing_runs_representative_selection(self):
        from peach import library_processing
        artifact_rules.remember(self.grid)
        self.row['snapshot_path'] = str(self.grid)
        with patch.object(selection, 'select_preview', return_value=True):
            result = library_processing._generate_preview(self.config, self.row, Mock(), Mock(),
                                                          progress=lambda: None)
        self.assertTrue(result)

    def test_manual_poster_installed_during_detection_is_not_overwritten(self):
        face, body = Mock(), Mock()
        def replace_during_detection(_image):
            self.target.parent.mkdir(parents=True, exist_ok=True)
            self.target.write_bytes(b'new personal poster')
            return [self.face]
        face.detect.side_effect = replace_during_detection
        self.assertFalse(self.run_selection(face, body))
        self.assertEqual(self.target.read_bytes(), b'new personal poster')

    def test_expired_budget_stops_before_face_inference(self):
        face, body = Mock(), Mock()
        with patch.object(selection, '_detectors', return_value=(face, body)), self.assertRaises(TimeoutError):
            selection.select_preview(self.config, self.row, Mock(), self.grid,
                                     progress=lambda: None, deadline=time.monotonic() - 1)
        face.detect.assert_not_called()
        self.assertFalse(self.target.exists())

    def test_partial_sampling_is_retryable_even_with_a_full_body_candidate(self):
        face, body = Mock(), Mock()
        face.detect.return_value = []
        body.score.return_value = .9
        def failed_extra(*_args, attempts, **_kwargs):
            attempts.append({'status': 'failed'})
            return iter(())
        with patch.object(selection, '_detectors', return_value=(face, body)), \
                patch.object(selection, '_extra_frames', side_effect=failed_extra):
            for _ in range(2):
                with self.assertRaisesRegex(ValueError, '未完成'):
                    selection.select_preview(self.config, self.row, Mock(), self.grid,
                                             progress=lambda: None, deadline=time.monotonic() + 60)
        self.assertEqual(self.metadata()['kind'], 'full-body')
        self.assertFalse(self.metadata()['sampling_complete'])
        self.assertGreaterEqual(face.detect.call_count, 18)

    def test_cli_disable_and_enable_update_the_local_preference(self):
        with patch('peach.settings_file.active', return_value=self.config), \
                patch.object(selection, '_detectors', return_value=(Mock(), Mock())):
            selection.main(['--disable'])
            self.assertFalse(selection.enabled(self.root / 'state'))
            selection.main(['--enable'])
            self.assertTrue(selection.enabled(self.root / 'state'))

    def test_cli_does_not_enable_when_models_are_unavailable(self):
        (self.root / 'state' / selection.FILENAME).write_text('{"enabled":false}', encoding='utf-8')
        with patch('peach.settings_file.active', return_value=self.config), \
                patch.object(selection, '_detectors', side_effect=ValueError('模型未取得')), \
                self.assertRaisesRegex(ValueError, '模型未取得'):
            selection.main(['--enable'])
        self.assertFalse(selection.enabled(self.root / 'state'))

    def test_pause_and_progress_persistence_failures_keep_their_task_semantics(self):
        from peach import library_processing
        from peach.jobs import JobPaused
        for error in (JobPaused('暂停'), library_processing._ProcessingPersistenceError('进度保存失败')):
            with self.subTest(kind=type(error)), \
                    patch.object(selection, 'select_preview', side_effect=error), self.assertRaises(type(error)):
                library_processing._select_representative_preview(self.config, self.row, Mock(), self.grid,
                                                                  lambda: None, time.monotonic() + 60)
