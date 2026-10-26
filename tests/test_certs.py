import subprocess
import tempfile
import unittest
from datetime import datetime, timedelta, timezone
from pathlib import Path
from unittest import mock

from peach.certs import (
    CERT_DAYS,
    CertificateFiles,
    create_local_ca,
    ensure_certificate,
    has_authority_key_identifier,
    not_after,
    reissue,
    reissue_reason,
    subject_alt_names,
)


def make_ca(tls_dir: Path) -> CertificateFiles:
    files = CertificateFiles.under(tls_dir)
    tls_dir.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        ["openssl", "req", "-x509", "-newkey", "rsa:2048", "-nodes", "-sha256",
         "-days", "3650", "-subj", "/CN=Test Local CA/O=Peach",
         "-keyout", str(files.ca_key), "-out", str(files.ca_cert)],
        check=True, capture_output=True)
    return files


class CertificateTests(unittest.TestCase):
    def test_openssl_hides_its_windows_console_and_preserves_output(self):
        from peach import certs
        result = subprocess.CompletedProcess(['openssl'], 0, 'certificate output', '')
        with mock.patch.object(certs.subprocess, 'run', return_value=result) as run:
            self.assertEqual(certs._openssl('version'), 'certificate output')
        expected = subprocess.CREATE_NO_WINDOW if certs.os.name == 'nt' else 0
        self.assertEqual(run.call_args.kwargs['creationflags'], expected)
        result.returncode, result.stderr = 1, 'test failure'
        with mock.patch.object(certs.subprocess, 'run', return_value=result):
            with self.assertRaisesRegex(RuntimeError, 'test failure'):
                certs._openssl('version')

    def setUp(self):
        self._tmp = tempfile.TemporaryDirectory()
        self.tls = Path(self._tmp.name) / "tls"
        self.files = make_ca(self.tls)
        self.addCleanup(self._tmp.cleanup)

    def test_missing_certificate_needs_reissue(self):
        self.assertEqual(
            reissue_reason(self.files, {"peach.local"}, {"127.0.0.1"}),
            "服务器证书不存在")

    def test_reissue_writes_every_requested_name(self):
        reissue(self.files, "peach.local", {"peach.local", "localhost"},
                {"127.0.0.1", "192.0.2.10"})
        names, addresses = subject_alt_names(self.files.cert)
        self.assertEqual(names, {"peach.local", "localhost"})
        self.assertEqual(addresses, {"127.0.0.1", "192.0.2.10"})
        self.assertIsNone(
            reissue_reason(self.files, {"peach.local"}, {"127.0.0.1", "192.0.2.10"}))

    def test_reissue_stays_under_apples_398_day_ceiling(self):
        """Apple 从 2020-09 起拒绝有效期超过 398 天的 TLS 服务器证书。

        iOS 上即使根证书已被完全信任也照样报「不受信任」，而且错误信息看不出是有效期
        的问题——所以这条必须由测试守住，不能靠记忆。
        """
        reissue(self.files, "peach.local", {"peach.local"}, {"127.0.0.1"})
        expiry = not_after(self.files.cert)
        self.assertIsNotNone(expiry)
        span = (expiry - datetime.now(timezone.utc)).days
        self.assertLessEqual(span, 398)
        self.assertGreater(span, 360)
        self.assertEqual(CERT_DAYS, 397)

    def test_a_new_address_triggers_reissue(self):
        """局域网地址随 DHCP 变化，证书的 SAN 是签死的——这正是要自动化的那一步。"""
        reissue(self.files, "peach.local", {"peach.local"}, {"127.0.0.1", "192.0.2.10"})
        self.assertIsNone(
            reissue_reason(self.files, {"peach.local"}, {"127.0.0.1", "192.0.2.10"}))
        reason = reissue_reason(self.files, {"peach.local"}, {"127.0.0.1", "198.51.100.7"})
        self.assertIn("198.51.100.7", reason or "")

    def test_reissue_writes_key_identifiers_for_strict_verification(self):
        """Python 3.13+ 默认严格校验，缺颁发者密钥标识的叶子证书会被拒绝。

        LibreSSL 不会自动加这两项，所以签发配置里必须显式写出。
        """
        files = CertificateFiles.under(Path(self._tmp.name) / "strict")
        create_local_ca(files)
        reissue(files, "peach.local", {"peach.local"}, {"127.0.0.1"})
        text = subprocess.run(["openssl", "x509", "-in", str(files.cert), "-noout", "-text"],
                              check=True, capture_output=True, text=True, encoding="utf-8").stdout
        self.assertIn("Authority Key Identifier", text)
        self.assertIn("Subject Key Identifier", text)
        self.assertTrue(has_authority_key_identifier(files.cert))
        verified = subprocess.run(["openssl", "verify", "-x509_strict", "-CAfile",
                                   str(files.ca_cert), str(files.cert)],
                                  capture_output=True, text=True, encoding="utf-8")
        self.assertEqual(verified.returncode, 0, verified.stdout + verified.stderr)

    def test_a_certificate_without_key_identifier_triggers_reissue(self):
        """早先用 LibreSSL 签出的证书没有颁发者密钥标识，托盘要能自己把它换掉。"""
        work = Path(self._tmp.name)
        (work / "leaf.cnf").write_text(
            "[req]\ndistinguished_name = dn\nprompt = no\n[dn]\nCN = peach.local\n"
            "[ext]\nsubjectAltName = DNS:peach.local,DNS:localhost,IP:127.0.0.1\n"
            "basicConstraints = critical, CA:FALSE\n"
            "subjectKeyIdentifier = none\nauthorityKeyIdentifier = none\n", encoding="utf-8")
        subprocess.run(["openssl", "req", "-new", "-newkey", "rsa:2048", "-nodes",
                        "-keyout", str(self.files.key), "-out", str(work / "leaf.csr"),
                        "-config", str(work / "leaf.cnf")], check=True, capture_output=True)
        signed = subprocess.run(
            ["openssl", "x509", "-req", "-in", str(work / "leaf.csr"), "-CA", str(self.files.ca_cert),
             "-CAkey", str(self.files.ca_key), "-CAcreateserial", "-out", str(self.files.cert),
             "-days", "30", "-extfile", str(work / "leaf.cnf"), "-extensions", "ext"],
            capture_output=True)
        if signed.returncode != 0 or has_authority_key_identifier(self.files.cert):
            self.skipTest("本机 openssl 无法签出不带密钥标识的证书")
        self.assertEqual(
            reissue_reason(self.files, {"peach.local", "localhost"}, {"127.0.0.1"},
                           now=datetime.now(timezone.utc)),
            "证书缺少颁发者密钥标识")
        ensure_certificate(self.tls, "peach.local", set())
        self.assertTrue(has_authority_key_identifier(self.files.cert))

    def test_near_expiry_triggers_reissue(self):
        reissue(self.files, "peach.local", {"peach.local"}, {"127.0.0.1"})
        soon = datetime.now(timezone.utc) + timedelta(days=CERT_DAYS - 5)
        reason = reissue_reason(self.files, {"peach.local"}, {"127.0.0.1"}, now=soon)
        self.assertIn("到期", reason or "")

    def test_ensure_keeps_the_ca_untouched(self):
        """只重签叶子证书。连 CA 一起换的话，每台设备都要重新装一遍信任。"""
        before = self.files.ca_cert.read_bytes()
        ensure_certificate(self.tls, "peach.local", {"192.0.2.10"})
        self.assertEqual(self.files.ca_cert.read_bytes(), before)
        names, addresses = subject_alt_names(self.files.cert)
        self.assertIn("peach.local", names)
        # 回环永远带上：健康检查走它，换网络也不受影响。
        self.assertIn("127.0.0.1", addresses)
        self.assertIn("192.0.2.10", addresses)

    def test_ensure_is_a_no_op_when_the_certificate_already_covers_everything(self):
        ensure_certificate(self.tls, "peach.local", {"192.0.2.10"})
        first = self.files.cert.read_bytes()
        self.assertIsNone(ensure_certificate(self.tls, "peach.local", {"192.0.2.10"}))
        self.assertEqual(self.files.cert.read_bytes(), first)

    def test_ensure_does_nothing_without_a_local_ca(self):
        """没有 CA 就没法签。这不是错误——macOS 那份可以只跑 HTTP。"""
        empty = Path(self._tmp.name) / "empty"
        empty.mkdir()
        self.assertIsNone(ensure_certificate(empty, "peach.local", {"192.0.2.10"}))


if __name__ == "__main__":
    unittest.main()
