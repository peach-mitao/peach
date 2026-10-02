"""资源搜索的只读 Web 契约；下载仍由云下载写入口接收。"""
from .resource_search import Filters, Indexers, Search

_SEARCH = Search()


def q_resource_search(contract, args) -> dict:
    service = getattr(contract, "downloads", None)
    if service is None:
        raise ValueError("云下载服务没有启用")
    try:
        filters = Filters(min_size=int(args.get("min_size") or 0),
                          max_size=int(args.get("max_size") or 1024 ** 4),
                          goal=str(args.get("goal") or "quality"))
    except (TypeError, OverflowError):
        raise ValueError("体积区间必须是字节数") from None
    with contract.database.read_connection() as connection:
        blocked = [row[0] for row in connection.execute(
            "SELECT info_hash FROM download_task WHERE blocked_at IS NOT NULL")]
    return _SEARCH.run(Indexers(service.credentials).load(),
                       str(args.get("code") or ""), filters, blocked)
