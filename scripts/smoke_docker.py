"""使用独立容器与临时卷验收镜像的初始化、鉴权、配置重载和持久化。"""
from __future__ import annotations

import argparse
import json
import subprocess
import time
import uuid


def docker(*arguments: str, check: bool = True) -> str:
    result = subprocess.run(["docker", *arguments], capture_output=True, text=True,
                            encoding="utf-8", check=check, timeout=180)
    return (result.stdout + (result.stderr if arguments[0] == "logs" else "")).strip()


def process_identity(name: str) -> str:
    """读取主进程，而不是 docker exec 新建进程的身份。"""
    return docker("exec", name, "python", "-c",
                  "from pathlib import Path; "
                  "fields={line.split(':',1)[0]:line.split(':',1)[1].strip() "
                  "for line in Path('/proc/1/status').read_text().splitlines() if ':' in line}; "
                  "print(fields['Uid'].split()[0]+':'+fields['Gid'].split()[0])")


def exec_as(name: str, identity: str, *arguments: str) -> str:
    """docker exec 不会经过镜像入口；测试进程显式使用 Peach 的运行身份。"""
    return docker("exec", "--user", identity, name, *arguments)


def process_groups(name: str) -> set[int]:
    raw = docker("exec", name, "python", "-c",
                 "from pathlib import Path; "
                 "line=next(line for line in Path('/proc/1/status').read_text().splitlines() "
                 "if line.startswith('Groups:')); print(line.split(':',1)[1].strip())")
    return {int(value) for value in raw.split()}


def run_failure(arguments: list[str]) -> tuple[int, str]:
    result = subprocess.run(["docker", "run", "--rm", "--network", "none", *arguments],
                            capture_output=True, text=True, encoding="utf-8", timeout=180)
    return result.returncode, (result.stdout + result.stderr).strip()


def request(name: str, path: str, *, authenticated: bool = True, body: dict | None = None,
            headers: dict | None = None):
    script = (
        "import json,urllib.request,urllib.error; from pathlib import Path; "
        "token=Path('/data/secrets/auth-token').read_text().strip(); "
        "body=json.loads(__import__('sys').argv[1]); "
        "headers={'X-Token':token} if body['auth'] else {}; "
        "headers=headers | (body['headers'] or {}); "
        "headers['Content-Type']='application/json'; "
        "req=urllib.request.Request('http://127.0.0.1:8900'+body['path'],"
        "data=json.dumps(body['body']).encode() if body['body'] is not None else None,headers=headers); "
        "\ntry:\n"
        " response=urllib.request.urlopen(req,timeout=15)\n"
        " data=response.read()\n"
        " print(data.decode() if 'application/json' in response.headers.get('Content-Type','') "
        "else json.dumps({'status':response.status,'size':len(data)}))\n"
        "except urllib.error.HTTPError as error:\n"
        " print(json.dumps({'status':error.code}))\n"
    )
    return docker("exec", name, "python", "-c", script,
                  json.dumps({"auth": authenticated, "path": path, "body": body, "headers": headers}))


def ready(name: str) -> None:
    deadline = time.monotonic() + 90
    while time.monotonic() < deadline:
        try:
            response = json.loads(request(name, "/healthz?ready=1", authenticated=False))
            if "status" not in response:
                return
        except subprocess.CalledProcessError:
            if docker("inspect", "-f", "{{.State.Running}}", name) != "true":
                raise RuntimeError(docker("logs", name)) from None
            time.sleep(1)
    raise RuntimeError("容器未就绪：" + docker("logs", name))


def transcode_checks(name: str, identity: str = "1000:1000") -> None:
    """无 GPU 的容器核对 VAAPI 软件栈与应用的整片、分片软件回退。"""
    assert "vaapi" in exec_as(name, identity, "ffmpeg", "-hide_banner", "-hwaccels")
    assert "h264_vaapi" in exec_as(name, identity, "ffmpeg", "-hide_banner", "-encoders")
    assert "scale_vaapi" in exec_as(name, identity, "ffmpeg", "-hide_banner", "-filters")
    assert "vaapi" in exec_as(name, identity, "ffmpeg", "-hide_banner", "-h", "decoder=h264")
    exec_as(name, identity, "python", "-c",
            "import ctypes; from pathlib import Path; "
            "drivers=list(Path('/usr/lib').glob('*/dri/radeonsi_drv_video.so')); "
            "assert drivers, '缺少 AMD VAAPI 驱动'; ctypes.CDLL(str(drivers[0]))")
    exec_as(name, identity, "ffmpeg", "-v", "error", "-i", "/data/smoke-media/fixture.mp4",
            "-c:v", "mpeg4", "/data/smoke-media/transcode.mkv")
    exec_as(name, identity, "python", "-c",
            "import asyncio; from pathlib import Path; from peach.ffmpeg import FFmpegResolver; "
            "from peach.transcodes import TranscodeService; from peach.segments import HlsSegmentService; "
            "from peach.streaming import StreamSessionRegistry; "
            "root=Path('/data/smoke-media'); resolver=FFmpegResolver(root/'tools'); "
            "whole=TranscodeService(resolver,root/'mp4-cache'); "
            "assert not whole.hardware.encoders(resolver.ffmpeg().path), '验收容器应未透传 GPU'; "
            "source=root/'transcode.mkv'; target,converted=whole.browser_path(95,source); "
            "assert converted and target.stat().st_size; target.rename(root/'converted.mp4'); "
            "hls=HlsSegmentService(resolver,root/'hls-cache',hardware=whole.hardware); "
            "segment=asyncio.run(hls.generate(source,0,1,asset_id=95,index=0,session='smoke',"
            "registry=StreamSessionRegistry(),transcode=True)); "
            "assert segment.stat().st_size; segment.rename(root/'converted.ts')")
    for filename in ("converted.mp4", "converted.ts"):
        report = json.loads(exec_as(name, identity, "ffprobe", "-v", "error",
                                    "-select_streams", "v:0",
                                    "-show_entries", "stream=codec_name,pix_fmt", "-of", "json",
                                    "/data/smoke-media/" + filename))
        assert report["streams"][0] == {"codec_name": "h264", "pix_fmt": "yuv420p"}, report


def amane_checks(name: str, identity: str = "1000:1000") -> None:
    """断网容器直接载入随镜像分发的独立环境与全部站点类。"""
    runtime = "/app/amane-runtime"
    manifest = json.loads(exec_as(name, identity, "python", "-c",
        f"from pathlib import Path; print(Path('{runtime}/manifest.json').read_text())"))
    executable = runtime + "/" + manifest["executable"]
    report = json.loads(exec_as(name, identity, executable, "-X", "utf8",
                               "/app/tools/amane-bridge/bridge.py", "--self-check"))
    assert report["ok"] and report["amane"]["version"] == manifest["version"], report
    assert len(report["sites"]) == 20, report
    bridge = json.loads(request(name, "/api/scraping/amane-bridge"))
    assert bridge["python"] == executable, bridge
    assert bridge["installed"] is True and bridge["revision"] == manifest["revision"], bridge


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("image")
    args = parser.parse_args()
    name = "peach-smoke-" + uuid.uuid4().hex[:12]
    volume = name + "-data"
    extra_containers: list[str] = []
    try:
        docker("volume", "create", volume)
        docker("run", "-d", "--name", name, "--network", "none",
               "--mount", f"type=volume,source={volume},target=/data", args.image)
        ready(name)
        assert process_identity(name) == "1000:1000"
        assert 0 not in process_groups(name)
        assert json.loads(request(name, "/api/items")) is not None
        assert json.loads(request(name, "/api/items", authenticated=False)) == {"status": 401}
        exec_as(name, "1000:1000", "mkdir", "/data/smoke-media")
        exec_as(name, "1000:1000", "ffmpeg", "-v", "error", "-f", "lavfi",
                "-i", "color=c=black:s=64x64:r=1",
                "-t", "2", "-c:v", "libx264", "/data/smoke-media/fixture.mp4")
        configuration = json.loads(request(name, "/api/configuration"))
        assert configuration['media_sources'] == [], configuration['media_sources']
        saved = json.loads(request(name, "/api/configuration", body={
            "revision": configuration["revision"], "port": configuration["port"], "scan_now": True,
            "media_sources": [{"location": "local", "path": "/data/smoke-media"}],
        }))
        assert saved.get("saved"), saved
        time.sleep(2)
        ready(name)
        deadline = time.monotonic() + 60
        asset = None
        while time.monotonic() < deadline:
            raw = exec_as(name, "1000:1000", "python", "-c",
                          "import sqlite3; print(sqlite3.connect('/data/database/ledger.db').execute("
                          "\"SELECT id FROM asset WHERE path LIKE '%fixture.mp4'\").fetchone())")
            if raw != "None":
                asset = int(raw.strip("(), "))
                break
            time.sleep(1)
        assert asset is not None, "资料处理请求未登记测试视频"
        media = json.loads(request(name, f"/stream?id={asset}", headers={"Range": "bytes=0-63"}))
        assert media == {"status": 206, "size": 64}, media
        transcode_checks(name)
        amane_checks(name)
        config_path = "/data/config.toml"
        original = docker("exec", name, "cat", config_path)
        exec_as(name, "1000:1000", "python", "-c",
                "from pathlib import Path; Path('/data/state/configuration-reload.request').write_text('reload')")
        deadline = time.monotonic() + 15
        while time.monotonic() < deadline:
            marker = exec_as(name, "1000:1000", "python", "-c",
                             "from pathlib import Path; print(Path('/data/state/configuration-reload.request').exists())")
            if marker == "False":
                break
            time.sleep(0.5)
        assert marker == "False", "配置重载请求未消费"
        ready(name)
        docker("restart", "--time", "75", name)
        ready(name)
        assert docker("exec", name, "cat", config_path) == original
        assert process_identity(name) == "1000:1000"
        assert docker("exec", name, "stat", "-c", "%u:%g", "/data") == "1000:1000"

        # 同一个已有卷从 1000 迁移到 NAS 常用非 1000 身份。
        docker("rm", "--force", name)
        migrated = name + "-migrated"
        extra_containers.append(migrated)
        docker("run", "-d", "--name", migrated, "--network", "none",
               "--mount", f"type=volume,source={volume},target=/data",
               "-e", "PEACH_UID=1026", "-e", "PEACH_GID=1027", args.image)
        ready(migrated)
        assert process_identity(migrated) == "1026:1027"
        assert docker("exec", migrated, "stat", "-c", "%u:%g", "/data") == "1026:1027"
        assert docker("exec", migrated, "stat", "-c", "%u:%g",
                      "/data/database/ledger.db") == "1026:1027"
        docker("restart", "--time", "75", migrated)
        ready(migrated)
        assert process_identity(migrated) == "1026:1027"

        # group_add 必须在降权后继续存在于主进程。
        docker("rm", "--force", migrated)
        grouped = name + "-grouped"
        extra_containers.append(grouped)
        docker("run", "-d", "--name", grouped, "--network", "none",
               "--mount", f"type=volume,source={volume},target=/data",
               "--group-add", "2468",
               "-e", "PEACH_UID=1026", "-e", "PEACH_GID=1027", args.image)
        ready(grouped)
        groups = process_groups(grouped)
        assert 2468 in groups and 0 not in groups, groups
        docker("rm", "--force", grouped)

        # 只读数据卷必须在应用启动前失败，不能先以 root 拉起服务。
        code, output = run_failure([
            "--mount", f"type=volume,source={volume},target=/data,readonly",
            "-e", "PEACH_UID=1026", "-e", "PEACH_GID=1027", args.image,
        ])
        assert code != 0 and "不可写" in output, output

        for values in (
            ["-e", "PEACH_UID="],
            ["-e", "PEACH_GID="],
            ["-e", "PEACH_UID=0"],
            ["-e", "PEACH_GID=-1"],
            ["-e", "PEACH_UID=abc"],
            ["-e", "PEACH_UID=4294967296"],
            ["-e", "PEACH_UID=1026", "-e", "UID=1027"],
        ):
            code, output = run_failure([*values, args.image])
            assert code != 0 and "PEACH_" in output, output

        print(json.dumps({"image": args.image, "checks": ["non-root", "ready", "auth", "configuration",
                                                         "scan", "range", "vaapi-stack", "transcode-fallback",
                                                         "amane-prerequisites", "reload", "restart", "persistence",
                                                         "uid-gid-migration", "group-add", "readonly-data",
                                                         "invalid-identity"]}))
    finally:
        for container in reversed(extra_containers):
            docker("rm", "--force", container, check=False)
        docker("rm", "--force", name, check=False)
        docker("volume", "rm", volume, check=False)


if __name__ == "__main__":
    main()
