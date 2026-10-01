"""115 云下载经 CloudDrive2 gRPC：起一个进程内的假服务端，走真实的序列化与元数据。

假服务端只实现那七个方法，状态放在内存里。断言落在「Peach 发出去的是什么」上：令牌只在
`authorization` 元数据里，提交前先查目录与配额，已有同一 infohash 的任务就不再提交，
地址留空时只用不带令牌的 `GetSystemInfo` 探测。
"""
from __future__ import annotations

import socket
import unittest
from concurrent import futures

import grpc

from peach import downloads as dl
from peach import downloads_clouddrive as cd
from peach import downloads_clouddrive_pb2 as pb

HASH = "c9e15763f722f23e98a29decdfae341b98d53056"
MAGNET = dl.parse_magnet(f"magnet:?xt=urn:btih:{HASH}&dn=ABC-123")
TOKEN = "token-for-tests"
TARGET = "/115/云下载"


class FakeCloudDrive:
    def __init__(self):
        self.calls: list[tuple[str, object, str]] = []
        self.folders = {TARGET: True}
        self.offline: list[pb.OfflineFile] = []
        self.quota = pb.OfflineQuotaInfo(total=1500, used=3, left=1497)
        self.add_error = ""
        self.files: set[str] = set()

    def _auth(self, name, request, context):
        header = dict(context.invocation_metadata()).get("authorization", "")
        self.calls.append((name, request, header))
        if header != f"Bearer {TOKEN}":
            context.abort(grpc.StatusCode.UNAUTHENTICATED, "bad token")

    def GetSystemInfo(self, request, context):
        header = dict(context.invocation_metadata()).get("authorization", "")
        self.calls.append(("GetSystemInfo", request, header))
        return pb.CloudDriveSystemInfo(IsLogin=True, UserName="u1", SystemReady=True)

    def GetApiTokenInfo(self, request, context):
        self._auth("GetApiTokenInfo", request, context)
        return pb.TokenInfo(token=request.value, rootDir="/", permissions=pb.TokenPermissions(
            allow_add_offline_download=True, allow_list_offline_downloads=True))

    def FindFileByPath(self, request, context):
        self._auth("FindFileByPath", request, context)
        full = f"{request.parentPath.rstrip('/')}/{request.path}"
        if full in self.folders:
            return pb.CloudDriveFile(name=request.path, fullPathName=full, isDirectory=True,
                                     canOfflineDownload=self.folders[full],
                                     CloudAPI=pb.CloudAPI(name="115open", userName="u1"))
        if full in self.files:
            return pb.CloudDriveFile(name=request.path, fullPathName=full)
        context.abort(grpc.StatusCode.NOT_FOUND, "no such file")

    def AddOfflineFiles(self, request, context):
        self._auth("AddOfflineFiles", request, context)
        if self.add_error:
            return pb.FileOperationResult(success=False, errorMessage=self.add_error)
        self.offline.append(pb.OfflineFile(name="ABC-123", url=request.urls, infoHash=HASH,
                                           status=pb.OFFLINE_DOWNLOADING, percendDone=12.5))
        return pb.FileOperationResult(success=True)

    def RemoveOfflineFiles(self, request, context):
        self._auth("RemoveOfflineFiles", request, context)
        self.offline = [item for item in self.offline if item.infoHash not in request.infoHashes]
        return pb.FileOperationResult(success=True)

    def ListOfflineFilesByPath(self, request, context):
        self._auth("ListOfflineFilesByPath", request, context)
        return pb.OfflineFileListResult(offlineFiles=self.offline)

    def GetOfflineQuotaInfo(self, request, context):
        self._auth("GetOfflineQuotaInfo", request, context)
        return self.quota


def closed_address() -> str:
    """本机一个刚放开、没人在听的端口。"""
    with socket.socket() as probe:
        probe.bind(("127.0.0.1", 0))
        port = probe.getsockname()[1]
    return f"http://127.0.0.1:{port}"


class _Server(unittest.TestCase):
    def setUp(self):
        self.fake = FakeCloudDrive()
        self.server, self.address = self.serve(self.fake)
        self.provider = cd.CloudDriveProvider(self.address, TOKEN)

    def serve(self, fake: FakeCloudDrive) -> tuple[grpc.Server, str]:
        handlers = {
            name: grpc.unary_unary_rpc_method_handler(
                getattr(fake, name), request_deserializer=request.FromString,
                response_serializer=response.SerializeToString)
            for name, (request, response) in cd._METHODS.items()}
        server = grpc.server(futures.ThreadPoolExecutor(max_workers=2))
        server.add_generic_rpc_handlers(
            (grpc.method_handlers_generic_handler("clouddrive.CloudDriveFileSrv", handlers),))
        port = server.add_insecure_port("127.0.0.1:0")
        server.start()
        self.addCleanup(server.stop, None)
        return server, f"http://127.0.0.1:{port}"

    def methods(self) -> list[str]:
        return [name for name, _request, _header in self.fake.calls]


class SubmitTests(_Server):
    def test_a_submission_checks_the_folder_and_quota_then_adds(self):
        status = self.provider.submit(MAGNET, TARGET)
        self.assertEqual((status.state, status.adopted), (dl.RUNNING, False))
        self.assertEqual(self.methods(), ["FindFileByPath", "ListOfflineFilesByPath",
                                          "GetOfflineQuotaInfo", "AddOfflineFiles"])
        add = self.fake.calls[-1][1]
        self.assertEqual((add.urls, add.toFolder, add.checkFolderAfterSecs),
                         (MAGNET.uri, TARGET, cd.CHECK_FOLDER_AFTER_SECS))
        quota = self.fake.calls[2][1]
        self.assertEqual((quota.cloudName, quota.cloudAccountId, quota.path), ("115open", "u1", TARGET))

    def test_the_token_travels_only_in_the_metadata(self):
        self.provider.submit(MAGNET, TARGET)
        for name, request, header in self.fake.calls:
            with self.subTest(name=name):
                self.assertEqual(header, f"Bearer {TOKEN}")
                if name != "GetApiTokenInfo":
                    self.assertNotIn(TOKEN.encode(), request.SerializeToString())

    def test_a_task_already_in_the_folder_is_adopted_without_adding(self):
        self.provider.submit(MAGNET, TARGET)
        self.fake.calls.clear()
        status = self.provider.submit(MAGNET, TARGET)
        self.assertTrue(status.adopted)
        self.assertNotIn("AddOfflineFiles", self.methods())
        self.assertNotIn("GetOfflineQuotaInfo", self.methods())

    def test_an_exhausted_quota_stops_before_adding(self):
        self.fake.quota = pb.OfflineQuotaInfo(total=200, used=200, left=0)
        with self.assertRaises(dl.DownloadError) as caught:
            self.provider.submit(MAGNET, TARGET)
        self.assertEqual(caught.exception.failure, "quota")
        self.assertNotIn("AddOfflineFiles", self.methods())

    def test_the_50038_block_is_flagged(self):
        self.fake.add_error = "errno: 50038, 该资源涉嫌违规"
        with self.assertRaises(dl.DownloadError) as caught:
            self.provider.submit(MAGNET, TARGET)
        self.assertEqual((caught.exception.failure, caught.exception.block), ("rejected", True))

    def test_a_folder_that_cannot_take_offline_tasks_is_a_configuration_problem(self):
        self.fake.folders[TARGET] = False
        with self.assertRaises(dl.DownloadError) as caught:
            self.provider.submit(MAGNET, TARGET)
        self.assertEqual(caught.exception.failure, "config")
        with self.assertRaises(dl.DownloadError) as caught:
            self.provider.submit(MAGNET, "/115/没有这个目录")
        self.assertIn("没有", caught.exception.detail)

    def test_a_wrong_token_and_an_unreachable_server_are_told_apart(self):
        with self.assertRaises(dl.DownloadError) as caught:
            cd.CloudDriveProvider(self.address, "wrong").submit(MAGNET, TARGET)
        self.assertEqual(caught.exception.failure, "config")
        self.server.stop(None)
        with self.assertRaises(dl.DownloadError) as caught:
            self.provider.status(dl.DownloadTask(1, HASH, "115", MAGNET.uri, "", TARGET, dl.SUBMITTED))
        self.assertEqual(caught.exception.failure, "network")


class TrackingTests(_Server):
    def task(self) -> dl.DownloadTask:
        return dl.DownloadTask(1, HASH, "115", MAGNET.uri, "ABC-123", TARGET, dl.SUBMITTED)

    def test_status_is_matched_by_infohash_or_the_original_link(self):
        self.provider.submit(MAGNET, TARGET)
        status = self.provider.status(self.task())
        self.assertEqual((status.state, status.progress), (dl.RUNNING, 0.125))
        self.fake.offline = [pb.OfflineFile(name="ABC-123", url=MAGNET.uri, status=pb.OFFLINE_FINISHED)]
        self.assertEqual(self.provider.status(self.task()).state, dl.DONE)
        self.fake.offline = []
        self.assertEqual(self.provider.status(self.task()).state, dl.MISSING)

    def test_landed_looks_for_the_name_in_the_target_folder(self):
        self.assertFalse(self.provider.landed(self.task()))
        self.fake.files.add(f"{TARGET}/ABC-123")
        self.assertTrue(self.provider.landed(self.task()))

    def test_cancelling_keeps_the_downloaded_files(self):
        self.provider.submit(MAGNET, TARGET)
        self.provider.cancel(self.task())
        remove = [request for name, request, _ in self.fake.calls if name == "RemoveOfflineFiles"][0]
        self.assertEqual((list(remove.infoHashes), remove.deleteFiles, remove.cloudName),
                         ([HASH], False, "115open"))
        self.assertEqual(self.fake.offline, [])


class CheckTests(_Server):
    def test_the_check_reports_permissions_folder_and_quota(self):
        report = cd.check(self.address, TOKEN, TARGET)
        self.assertEqual(report["missing"], ["取消离线任务"])
        self.assertEqual(report["folder"], {"path": TARGET, "can_offline": True, "cloud": "115open"})
        self.assertEqual(report["quota"], {"total": 1500, "used": 3, "left": 1497})
        self.assertEqual(report["problems"], [])
        self.assertEqual(report["address"], self.address)
        self.assertNotIn("AddOfflineFiles", self.methods())
        self.assertNotIn("GetSystemInfo", self.methods())

    def test_without_a_token_nothing_is_called(self):
        report = cd.check(self.address, "", TARGET)
        self.assertFalse(report["ok"])
        self.assertIn("API 令牌", report["problems"][0])
        self.assertEqual(self.fake.calls, [])

    def test_a_blank_address_takes_the_first_local_address_that_answers(self):
        second = FakeCloudDrive()
        _server, second_address = self.serve(second)
        report = cd.check("", TOKEN, TARGET, local_addresses=(self.address, second_address))
        self.assertEqual((report["ok"], report["address"]), (True, self.address))
        self.assertEqual(self.methods()[0], "GetSystemInfo")
        self.assertEqual(self.fake.calls[0][2], "")
        self.assertEqual(second.calls, [])

    def test_a_blank_address_falls_through_to_the_second_local_address(self):
        report = cd.check("", TOKEN, TARGET, local_addresses=(closed_address(), self.address))
        self.assertEqual(report["address"], self.address)
        self.assertEqual(report["quota"], {"total": 1500, "used": 3, "left": 1497})

    def test_a_blank_address_without_a_token_still_finds_the_address(self):
        report = cd.check("", "", TARGET, local_addresses=(self.address,))
        self.assertEqual((report["ok"], report["address"]), (False, self.address))
        self.assertEqual(self.methods(), ["GetSystemInfo"])

    def test_no_local_address_answering_lists_every_address_tried(self):
        tried = (closed_address(), closed_address())
        with self.assertRaises(dl.DownloadError) as caught:
            cd.check("", TOKEN, TARGET, local_addresses=tried)
        self.assertEqual(caught.exception.failure, "network")
        for address in tried:
            self.assertIn(address, caught.exception.detail)

    def test_addresses_turn_into_grpc_targets(self):
        self.assertEqual(cd.channel_target("http://127.0.0.1"), ("127.0.0.1:19798", False))
        self.assertEqual(cd.channel_target("https://192.0.2.10:8443"), ("192.0.2.10:8443", True))
        self.assertEqual(cd.split_remote("/115/云下载/"), ("/115", "云下载"))


if __name__ == "__main__":
    unittest.main()
