import io
import subprocess
import tempfile
import unittest
from pathlib import Path
from types import SimpleNamespace
from unittest import mock

from PIL import Image

from peach.ffmpeg import BinaryChoice, FFmpegResolver
from peach.follow_covers import (
    FOLLOW_COVER_FILTER,
    FOLLOW_COVER_SCAN_SECONDS,
    FollowCoverService,
    FollowCoverUnavailable,
)
from peach.follow_stream import ResolvedFollowMedia
from peach.http import HttpResponse
import httpx


class _FFmpeg:
    def ffmpeg(self):
        return BinaryChoice(Path("ffmpeg"), "test")


class _Media:
    def __init__(self):
        self.calls = 0

    def resolve(self, item):
        self.calls += 1
        return ResolvedFollowMedia(
            "https://r34i.paheal-cdn.net/ab/cd/video", item.url)


class FollowCoverServiceTests(unittest.TestCase):
    def test_rule34video_uses_a_cached_work_cover_when_its_poster_is_unavailable(self):
        image = io.BytesIO()
        Image.new("RGB", (96, 54), "red").save(image, "PNG")
        requests = []

        def transport(request, timeout, limit):
            requests.append(request)
            return HttpResponse(404 if request.url.endswith("missing.jpg") else 200,
                                {"content-type": "image/png"}, image.getvalue())

        self.media.transport = transport
        item = self._item("rule34video")
        item.url = "https://rule34video.com/video/7/movie/"
        item.thumb_url = "https://rule34video.com/missing.jpg"
        alternative = "https://rule34video.com/available.jpg"
        with mock.patch("peach.follow_covers.subprocess.run") as ffmpeg:
            path = self.service.cover(item, alternatives=(alternative,))
            self.assertEqual(self.service.cover(item, alternatives=(alternative,)), path)
        self.assertEqual([request.url for request in requests], [item.thumb_url, alternative])
        self.assertEqual(requests[0].headers["Referer"], item.url)
        self.assertEqual(self.media.calls, 0)
        ffmpeg.assert_not_called()
        with Image.open(path) as cached:
            self.assertEqual((cached.format, cached.size), ("JPEG", (96, 54)))

    def test_rule34video_rejects_untrusted_posters_and_non_images(self):
        self.media.transport = mock.Mock(return_value=HttpResponse(200, {}, b"<html>denied</html>"))
        item = self._item("rule34video")
        item.url = "https://rule34video.com/video/7/movie/"
        item.thumb_url = "https://127.0.0.1/private.jpg"
        with self.assertRaises(FollowCoverUnavailable):
            self.service.cover(item, alternatives=("https://rule34video.com/blocked.jpg",))
        self.assertEqual(self.media.transport.call_count, 1)
        self.assertEqual(list(self.root.glob("*.jpg")), [])

    def test_rule34video_network_failures_leave_no_cached_file(self):
        self.media.transport = mock.Mock(side_effect=httpx.ReadTimeout("offline"))
        item = self._item("rule34video")
        item.thumb_url = "https://rule34video.com/poster.jpg"
        with self.assertRaises(FollowCoverUnavailable):
            self.service.cover(item)
        self.assertEqual(list(self.root.glob("*.jpg")), [])

    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)
        self.media = _Media()
        self.service = FollowCoverService(_FFmpeg(), self.media, self.root)

    @staticmethod
    def _item(provider="rule34paheal", kind="video"):
        return SimpleNamespace(
            id=7, provider=provider, metadata={"media_kind": kind},
            url="https://rule34.paheal.net/post/view/7")

    def test_first_non_black_frame_is_generated_once_and_cached(self):
        commands = []

        def run(command, **kwargs):
            commands.append(command)
            Path(command[-1]).write_bytes(b"jpeg")
            return subprocess.CompletedProcess(command, 0, b"", b"")

        with mock.patch("peach.follow_covers.subprocess.run", side_effect=run):
            first = self.service.cover(self._item())
            second = self.service.cover(self._item())
        self.assertEqual(first, second)
        self.assertEqual(first.read_bytes(), b"jpeg")
        self.assertEqual(len(commands), 1)
        self.assertIn("-frames:v", commands[0])
        filter_value = commands[0][commands[0].index("-vf") + 1]
        self.assertIn("blackframe=amount=0:threshold=32", filter_value)
        self.assertIn(
            "metadata=select:key=lavfi.blackframe.pblack:value=98:function=less",
            filter_value,
        )
        self.assertIn("scale='min(1280,iw)':-2", filter_value)
        self.assertEqual(
            commands[0][commands[0].index("-t") + 1],
            str(FOLLOW_COVER_SCAN_SECONDS),
        )

    def test_ffmpeg_filter_skips_a_black_intro(self):
        choice = FFmpegResolver(self.root).ffmpeg()
        if choice is None:
            self.skipTest("ffmpeg is unavailable")
        source = self.root / "black-intro.mp4"
        still = self.root / "selected.jpg"
        generated = subprocess.run(
            [
                str(choice.path), "-y", "-v", "error",
                "-f", "lavfi", "-i", "color=c=black:s=320x180:d=1:r=5",
                "-f", "lavfi", "-i", "color=c=red:s=320x180:d=1:r=5",
                "-filter_complex", "[0:v][1:v]concat=n=2:v=1:a=0[v]",
                "-map", "[v]", "-c:v", "libx264", "-pix_fmt", "yuv420p",
                str(source),
            ],
            capture_output=True,
            check=False,
            timeout=20,
        )
        if generated.returncode != 0:
            self.skipTest("test ffmpeg cannot create an H.264 fixture")
        selected = subprocess.run(
            [
                str(choice.path), "-y", "-v", "error", "-i", str(source),
                "-frames:v", "1", "-vf", FOLLOW_COVER_FILTER,
                "-q:v", "4", str(still),
            ],
            capture_output=True,
            check=False,
            timeout=20,
        )
        self.assertEqual(selected.returncode, 0, selected.stderr.decode(errors="replace"))
        with Image.open(still).convert("RGB") as image:
            red, green, blue = image.resize((1, 1)).getpixel((0, 0))
        self.assertGreater(red, 150)
        self.assertLess(green, 80)
        self.assertLess(blue, 80)

    def test_fanbox_uses_first_video_after_images_and_caches_it(self):
        item = self._item("fanbox")
        item.metadata = {"media_items": [
            {"media_kind": "image", "resource_provider": "fanbox"},
            {"media_kind": "video", "resource_provider": "fanbox"},
        ]}
        resolver = mock.Mock()
        resolver.resolve.return_value = ResolvedFollowMedia(
            "https://downloads.fanbox.cc/files/video.mp4", item.url)
        service = FollowCoverService(_FFmpeg(), resolver, self.root)
        def run(command, **kwargs):
            Path(command[-1]).write_bytes(b"jpeg")
            return subprocess.CompletedProcess(command, 0, b"", b"")
        with mock.patch("peach.follow_covers.subprocess.run", side_effect=run) as ffmpeg:
            first = service.cover(item)
            self.assertEqual(service.cover(item), first)
        resolver.resolve.assert_called_with(item, 1)
        self.assertEqual(ffmpeg.call_count, 1)

    def test_each_fanbox_video_in_a_post_gets_its_own_cached_still(self):
        """多媒体清单里每个视频各要一格画面；第一个视频点不点名都落在卡面那份缓存上。"""
        item = self._item("fanbox")
        item.metadata = {"media_items": [
            {"media_kind": "video", "resource_provider": "fanbox"},
            {"media_kind": "image", "resource_provider": "fanbox"},
            {"media_kind": "video", "resource_provider": "fanbox"},
        ]}
        resolver = mock.Mock()
        resolver.resolve.side_effect = lambda _item, index: ResolvedFollowMedia(
            f"https://downloads.fanbox.cc/files/video-{index}.mp4", item.url)
        service = FollowCoverService(_FFmpeg(), resolver, self.root)

        def run(command, **kwargs):
            Path(command[-1]).write_bytes(b"jpeg")
            return subprocess.CompletedProcess(command, 0, b"", b"")

        with mock.patch("peach.follow_covers.subprocess.run", side_effect=run) as ffmpeg:
            card = service.cover(item)
            self.assertEqual(service.cover(item, 0), card)
            second = service.cover(item, 2)
            # 生成第二个视频的画面不能把第一个视频那份当旧帧清掉，反之亦然。
            self.assertEqual(service.cover(item), card)
        self.assertNotEqual(second, card)
        self.assertTrue(card.is_file() and second.is_file())
        self.assertEqual(ffmpeg.call_count, 2)
        for media in (1, 5):
            with self.subTest(media=media), self.assertRaises(FollowCoverUnavailable):
                service.cover(item, media)

    def test_only_fanbox_posts_accept_a_media_index(self):
        with self.assertRaises(FollowCoverUnavailable):
            self.service.cover(self._item(), 0)

    def test_only_supported_videos_enter_the_generator(self):
        for provider, kind in (("rule34xxx", "video"),
                               ("rule34paheal", "image")):
            with self.subTest(provider=provider, kind=kind):
                with self.assertRaises(FollowCoverUnavailable):
                    self.service.cover(self._item(provider, kind))

    def test_the_lock_table_stays_bounded_and_keeps_the_locks_in_use(self):
        """一条一把锁、URL 一变再加一条：只增不减的话，进程活多久它就长多久。"""
        self.service.MAX_TRACKED_LOCKS = 3
        held = self.service._lock_for("held")
        held.acquire()
        self.addCleanup(held.release)
        for index in range(20):
            self.service._lock_for(f"item-{index}")
        self.assertLessEqual(len(self.service._locks),
                             self.service.MAX_TRACKED_LOCKS)
        self.assertIs(self.service._locks.get("held"), held,
                      "还被持有的锁不能被清掉，否则两个线程会各拿一把锁写同一个文件")
