//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, o) => (o = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n)), l = !1;
function u() {
	if (l || typeof window > "u") return;
	l = !0;
	let e = Date.now(), t = 0, n = /* @__PURE__ */ new Set(), r = (r, i, a = "", o) => {
		let s = i instanceof Error || i instanceof DOMException ? i.name : "";
		if (s === "AbortError" || (Date.now() - e >= 6e4 && (e = Date.now(), t = 0, n.clear()), t >= 10)) return;
		let c = (i instanceof Error ? i.message : typeof i == "string" ? i : a).slice(0, 2e3);
		if (!c) return;
		let l = i instanceof Error ? (i.stack ?? "").slice(0, 6e3) : "", u = `${r}:${c}:${l}`;
		n.has(u) || (n.add(u), t += 1, fetch("/api/diagnostics/client-error", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				kind: r,
				message: c,
				stack: l,
				error_name: s,
				page: window.location.pathname,
				source_file: o?.filename?.split("/").pop()?.split("?")[0],
				line: o?.lineno,
				column: o?.colno
			}),
			credentials: "same-origin",
			keepalive: !0
		}).catch(() => {}));
	};
	window.addEventListener("error", (e) => r("error", e.error, e.message, e)), window.addEventListener("unhandledrejection", (e) => r("unhandledrejection", e.reason, "Promise 未处理的异常"));
}
var d = {
	"# 浏览记录口味分析": "# 閲覧履歴の好み分析",
	"'竖屏')": "'竖屏')",
	"(SELECT group_concat(entity.canonical_name) FROM asset_entity JOIN entity ON entity.id=asset_entity.entity_id WHERE asset_entity.asset_id=asset.id AND entity.kind='performer') AS performers, (SELECT group_concat(asset_tag.tag) FROM asset_tag WHERE asset_tag.asset_id=asset.id AND asset_tag.tag NOT LIKE '演员:%') AS tags": "(SELECT group_concat(entity.canonical_name) FROM asset_entity JOIN entity ON entity.id=asset_entity.entity_id WHERE asset_entity.asset_id=asset.id AND entity.kind='performer') AS performers, (SELECT group_concat(asset_tag.tag) FROM asset_tag WHERE asset_tag.asset_id=asset.id AND asset_tag.tag NOT LIKE '演员:%') AS tags",
	"- 数据源：{0}": "- データソース：{0}",
	"- 浏览器书签：{0}": "- ブラウザのブックマーク：{0}",
	"- 生成时间：{0}": "- 生成日時：{0}",
	"- 范围：{0} 至 {1}": "- 期間：{0}～{1}",
	"- 访问记录：{0}": "- 訪問記録：{0}",
	"- 隐私：报告不含完整 URL、页面标题或原始搜索记录；所有结论均为 candidate。": "- プライバシー：レポートには完全な URL、ページタイトル、元の検索履歴は含まれません。すべての結論は candidate です。",
	"--apply 必须同时给 --backup": "--apply には --backup の指定も必要です",
	".local，只在允许局域网访问时发布）": ".local、LAN からのアクセスを許可している場合のみ公開）",
	"/云下载": "/クラウドダウンロード",
	"1 个": "1 個",
	"115 报告离线失败，多半是资源无人做种或被拒": "115 からオフラインダウンロード失敗の報告がありました。シードがいないか、拒否された可能性があります",
	"115 拦截了这个资源（违规内容，50038），不会重试：{0}": "115 がこのリソースをブロックしました（規約違反コンテンツ、50038）。再試行しません：{0}",
	"115 目标目录": "115 保存先フォルダ",
	"115 离线配额": "115 オフラインダウンロード枠",
	"115 离线配额已用完（本月 {0}/{1}）": "115 のオフラインダウンロード枠を使い切りました（今月 {0}/{1}）",
	"115 网盘": "115 クラウドストレージ",
	"115（没有则留最大）": "115（なければ最大のものを残す）",
	"15–40 分钟": "15–40 分",
	"18|はい|入場|同意|以上|Enter|Yes": "18|はい|入場|同意|以上|Enter|Yes",
	"1–2 个": "1–2 個",
	"2 个起步": "2 個から",
	"3D/动画": "3D/アニメ",
	"3D动画": "3Dアニメ",
	"40 分钟": "40 分",
	"5–15 分钟": "5–15 分",
	AI修复: "AI修復",
	AI去码: "AIモザイク除去",
	AI解码: "AI モザイク除去",
	"API key 格式不正确": "API key の形式が正しくありません",
	"ASMR/音声": "ASMR/音声",
	AV出演期間: "AV出演期間",
	AV女優の名前特定wiki: "AV女優の名前特定wiki",
	"Babepedia 未取得：HTTP {0}": "Babepedia 未取得：HTTP {0}",
	"Babepedia 未取得：来源域名不一致": "Babepedia 未取得：ソースのドメインが一致しません",
	"Babepedia 未取得：档案地址不一致": "Babepedia 未取得：プロフィールのアドレスが一致しません",
	"Babepedia 未取得：档案身份不一致": "Babepedia 未取得：プロフィールの身元が一致しません",
	"Buffer Cache 占内存，磁盘缓存和文件夹缓存占硬盘，改一个管不住另外两个。": "Buffer Cache はメモリを、ディスクキャッシュとフォルダキャッシュはディスクを使います。1 つを変えても、ほかの 2 つは制御できません。",
	"COALESCE(av.code,'') LIKE 'FC2-PPV-%' OR EXISTS (SELECT 1 FROM asset_tag t WHERE t.asset_id=av.id AND t.tag='素人' AND t.source NOT LIKE '{0}%') OR EXISTS (SELECT 1 FROM asset_entity ta JOIN entity te ON te.id=ta.entity_id WHERE ta.asset_id=av.id AND te.kind='tag' AND te.canonical_name='素人' AND ta.source NOT LIKE '{1}%')": "COALESCE(av.code,'') LIKE 'FC2-PPV-%' OR EXISTS (SELECT 1 FROM asset_tag t WHERE t.asset_id=av.id AND t.tag='素人' AND t.source NOT LIKE '{0}%') OR EXISTS (SELECT 1 FROM asset_entity ta JOIN entity te ON te.id=ta.entity_id WHERE ta.asset_id=av.id AND te.kind='tag' AND te.canonical_name='素人' AND ta.source NOT LIKE '{1}%')",
	"Chrome：在": "Chrome：",
	"CloudDrive 设置帮助": "CloudDrive 設定ヘルプ",
	"CloudDrive2 API 令牌": "CloudDrive2 API トークン",
	"CloudDrive2 地址": "CloudDrive2 アドレス",
	"CloudDrive2 地址只写协议、主机和端口，例如 http://127.0.0.1:19798": "CloudDrive2 のアドレスにはプロトコル、ホスト、ポートのみを入力してください（例：http://127.0.0.1:19798）",
	"CloudDrive2 地址没填": "CloudDrive2 のアドレスが未入力です",
	"CloudDrive2 拒绝了这个 API 令牌（{0}）：{1}": "CloudDrive2 がこの API トークンを拒否しました（{0}）：{1}",
	"CloudDrive2 没有取消这个任务：{0}": "CloudDrive2 でこのタスクをキャンセルできませんでした：{0}",
	"CloudDrive2 没有新建 {0}：{1}": "CloudDrive2 で {0} を作成できませんでした：{1}",
	"CloudDrive2 配置": "CloudDrive2 構成",
	"CloudDrive2 里没有 {0} 这个文件夹": "CloudDrive2 に {0} というフォルダがありません",
	"Cloudflare Zero Trust 里指向这台电脑的主机名。": "Cloudflare Zero Trust でこのコンピューターを指すホスト名。",
	"Cloudflare 公网入口": "Cloudflare 公開アクセス",
	"Cookie 已保存；登录是否有效要到抓取时才知道。": "Cookie を保存しました。ログインが有効かどうかは、取得時までわかりません。",
	"Cookie 已撤销": "Cookie を取り消しました",
	"Cookie 文件未读取，请重新选择": "Cookie ファイルを読み込めませんでした。もう一度選択してください",
	"Cookie 文件须为 Netscape 文本格式": "Cookie ファイルは Netscape テキスト形式にしてください",
	"Cookie 文本超过 256 KiB": "Cookie テキストが 256 KiB を超えています",
	"Cookie 粘贴与文件导入只选一种": "Cookie の貼り付けとファイル読み込みは、どちらか一方のみ選択してください",
	"Cookie 请求头格式无效": "Cookie リクエストヘッダーの形式が無効です",
	"DMM 作品身份不匹配": "DMM の作品が一致しません",
	"DMM 公开预告地址未识别": "DMM の公開予告編アドレスを認識できません",
	"DMM 公开预告字段未取得": "DMM 公開予告編フィールド未取得",
	"DMM 商品字段未取得": "DMM 商品フィールド未取得",
	"DMM 番号不匹配": "DMM の品番が一致しません",
	"DMM 视频预览未取得，请稍后重试": "DMM の動画プレビューを取得できませんでした。しばらくしてから再試行してください",
	"F95 返回了不受信任的图片地址": "F95 が信頼できない画像アドレスを返しました",
	"F95 附件需要登录会话": "F95 の添付ファイルにはログインセッションが必要です",
	"F95 首楼名片上的手柄 {0}：{1}": "F95 の最初の投稿のプロフィールカードにあるハンドル {0}：{1}",
	"F95zone 站内索引未命中，请核对搜索结果里的真实线程链接": "F95zone のサイト内インデックスに該当がありません。検索結果にある実際のスレッドリンクを確認してください",
	"FANBOX 公开正文缺少 body": "FANBOX の公開本文に body がありません",
	"FANBOX 官方资料与归档身份一致": "FANBOX の公式プロフィールとアーカイブの身元が一致しています",
	"FANBOX 官方资料格式不符": "FANBOX の公式プロフィールの形式が想定と異なります",
	"FANBOX 官方资料没有可信的头像地址": "FANBOX の公式プロフィールに信頼できるアバターアドレスがありません",
	"FANBOX 官方资料返回 HTTP {0}": "FANBOX の公式プロフィールが HTTP {0} を返しました",
	"FANBOX 官方页面没有可用的创作者 id": "FANBOX の公式ページに使用できるクリエイター id がありません",
	"FANBOX 官方页面没有可用的创作者资料": "FANBOX の公式ページに使用できるクリエイター情報がありません",
	"FANBOX 官方页面返回 HTTP {0}": "FANBOX の公式ページが HTTP {0} を返しました",
	"FANBOX 帖子 {0}": "FANBOX 投稿 {0}",
	"FANBOX 正文类型不受支持：{0}": "FANBOX の本文タイプはサポートされていません：{0}",
	"FANBOX 的链接要指向创作者主页，形如 https://creator.fanbox.cc/": "FANBOX のリンクはクリエイターのトップページを指定してください（例：https://creator.fanbox.cc/）",
	"FANBOX 返回了不受信任的图片地址": "FANBOX が信頼できない画像アドレスを返しました",
	"FC2 与几个存档站上都没有这个商品": "FC2 にもいくつかのアーカイブサイトにもこの商品はありません",
	"FC2 评论标记": "FC2 レビューマーク",
	"FC2 跨号相似": "FC2 品番間の類似",
	"FFmpeg 抽帧失败，反馈问题请导出诊断报告": "FFmpeg のフレーム抽出に失敗しました。問題を報告する場合は診断レポートをエクスポートしてください",
	"FFmpeg 缺少 AV1 软件解码器": "FFmpeg に AV1 ソフトウェアデコーダーがありません",
	"GitHub 请求受限，请稍后重试。": "GitHub へのリクエストが制限されています。しばらくしてから再試行してください。",
	"Gofile API token 未配置": "Gofile API token が未設定です",
	"Gofile 响应超出大小上限": "Gofile のレスポンスがサイズ上限を超えました",
	"Gofile 拒绝了 API token": "Gofile が API token を拒否しました",
	"Gofile 文件列表 API 需要 Premium 账户；token 有效，但当前账户套餐不支持此接口": "Gofile のファイル一覧 API には Premium アカウントが必要です。token は有効ですが、現在のアカウントのプランではこの API を利用できません",
	"Gofile 文件列表未取得": "Gofile ファイル一覧未取得",
	"Gofile 请求失败": "Gofile へのリクエストに失敗しました",
	"Gofile 返回 HTTP {0}": "Gofile が HTTP {0} を返しました",
	"Gofile 返回了不受信任的媒体地址": "Gofile が信頼できないメディアアドレスを返しました",
	"Google My Activity 时间格式无法识别": "Google My Activity の日時形式を認識できません",
	"HTTP {0} 不是 JSON": "HTTP {0} のレスポンスが JSON ではありません",
	"HTTPS WebDAV 整理只支持已声明的 A 盘根目录": "HTTPS WebDAV の整理は、宣言済みの A ドライブのルートディレクトリのみ対応しています",
	"HistoryEx 未包含可识别的网页访问记录；115 下载记录不能用于浏览历史，请选择 History 文件": "HistoryEx に認識できるウェブ訪問記録が含まれていません。115 のダウンロード記録は閲覧履歴には使えません。History ファイルを選択してください",
	"INSERT INTO review_decision(category,item_key,status,note,updated_at) VALUES('junk_file',?,'rejected','用户确认不是垃圾',?) ON CONFLICT(category,item_key) DO UPDATE SET status='rejected',note=excluded.note,updated_at=excluded.updated_at": "INSERT INTO review_decision(category,item_key,status,note,updated_at) VALUES('junk_file',?,'rejected','用户确认不是垃圾',?) ON CONFLICT(category,item_key) DO UPDATE SET status='rejected',note=excluded.note,updated_at=excluded.updated_at",
	"ISO 原盘": "ISO ディスクイメージ",
	"ISO 原盘请使用作品详情中的外部播放器打开": "ISO ディスクイメージは作品詳細の外部プレーヤーで開いてください",
	"Instagram 自动头像定位尚待独立登录会话验证": "Instagram のアバター自動特定は、独立したログインセッションでの検証が未完了です",
	"JAV 与新作": "JAV と新作",
	"JAV 作品": "JAV 作品",
	"JAV 分区": "JAV セクション",
	"JAV 卡片版式": "JAV カードレイアウト",
	"JAV 推荐": "JAV おすすめ",
	"JAV 站点清单包含无效域名": "JAV サイト一覧に無効なドメインが含まれています",
	"JAV 站点清单包含无效条目": "JAV サイト一覧に無効な項目が含まれています",
	"JAV 站点清单无法读取": "JAV サイト一覧を読み込めません",
	"JAV 订阅": "JAV 購読",
	"JAV 订阅列表": "JAV 購読リスト",
	"JAV 订阅源": "JAV 購読ソース",
	JK制服: "JK制服",
	"JSON 接口地址": "JSON API アドレス",
	"JavDB 上没有搜到这个名字。": "JavDB でこの名前は見つかりませんでした。",
	"JavDB 上的演员卡": "JavDB の女優カード",
	"JavDB 回了 HTTP {0}": "JavDB が HTTP {0} を返しました",
	"JavDB 回的是登入页，这一趟搜不了；稍后再试": "JavDB がログインページを返したため、今回は検索できません。しばらくしてから再試行してください",
	"JavDB 或 MISSAV 打不开时，填一个能打开的镜像域名。": "JavDB や MISSAV が開けない場合は、開けるミラードメインを入力してください。",
	"JavDB 标签在预算时间内未取得": "JavDB のタグを制限時間内に取得できませんでした",
	"JavDB 标签未取得：": "JavDB タグ未取得：",
	"JavDB 没有搜成：{0}": "JavDB で検索できませんでした：{0}",
	"JavDB 视频预览未取得，请稍后重试": "JavDB の動画プレビューを取得できませんでした。しばらくしてから再試行してください",
	"JavDB 评论": "JavDB レビュー",
	"Javinizer-Go 原始快照目录；先离线复用成功证据，再补联网来源": "Javinizer-Go の元スナップショットディレクトリ。まずオフラインで成功済みの証拠を再利用し、その後オンラインのソースで補完します",
	"KiB。不含账号、设备、文件路径和浏览器历史记录等个人数据。": "KiB。アカウント、デバイス、ファイルパス、ブラウザ履歴などの個人データは含みません。",
	"M3U 播放列表": "M3U プレイリスト",
	"Mix 种子必须在播放列表中": "Mix のシードはプレイリスト内にある必要があります",
	"NFO 不是影片或单集资料": "NFO が動画またはエピソードの情報ではありません",
	"NFO 包含多个不同番号": "NFO に異なる品番が複数含まれています",
	"NFO 文件过大或包含实体声明": "NFO ファイルが大きすぎるか、エンティティ宣言を含んでいます",
	"NVMe SSD，内存 16 GB 以上": "NVMe SSD、メモリ 16 GB 以上",
	"Netscape Cookie 文件（.txt）": "Netscape Cookie ファイル（.txt）",
	"PEACH_TRANSCODE_BACKEND 必须为 auto、software、nvenc 或 vaapi": "PEACH_TRANSCODE_BACKEND は auto、software、nvenc、vaapi のいずれかにしてください",
	"Paheal 帖子 {0}": "Paheal 投稿 {0}",
	"Patreon 官方来源暂不支持向前翻页": "Patreon の公式ソースは過去ページの遡りにまだ対応していません",
	"Patreon 帖子 {0}": "Patreon 投稿 {0}",
	"Patreon 的链接要指向创作者主页，形如 https://patreon.com/cw/creator": "Patreon のリンクはクリエイターのトップページを指定してください（例：https://patreon.com/cw/creator）",
	"Patreon 资料没有可信的头像地址": "Patreon のプロフィールに信頼できるアバターアドレスがありません",
	"Patreon 资料返回 HTTP {0}": "Patreon のプロフィールが HTTP {0} を返しました",
	"Patreon 资料里没有这个创作者": "Patreon のプロフィールにこのクリエイターが見つかりません",
	"Peach {0} 将在重启后安装。": "Peach {0} は再起動後にインストールされます。",
	"Peach {0} 已是当前更新通道的最新版本。": "Peach {0} は現在の更新チャネルの最新バージョンです。",
	"Peach {0}（{1}） 未配置更新源；当前为本地开发版。": "Peach {0}（{1}）は更新元が設定されていません。現在はローカル開発版です。",
	"Peach · 蜜桃": "Peach · 蜜桃",
	"Peach · 设置完成": "Peach · セットアップ完了",
	"Peach · 首次运行": "Peach · 初回起動",
	"Peach 从媒体库读取视频和图片。请选择已存在的文件夹，也可以使用外置硬盘。": "Peach はメディアライブラリから動画と画像を読み込みます。既存のフォルダを選択してください。外付けハードディスクも使用できます。",
	"Peach 代理": "Peach プロキシ",
	"Peach 代理配置未取得": "Peach プロキシ構成未取得",
	"Peach 内部": "Peach 内部",
	"Peach 印证": "Peach による裏付け",
	"Peach 口味维度": "Peach 好みの軸",
	"Peach 启动失败": "Peach の起動に失敗しました",
	"Peach 地址": "Peach アドレス",
	"Peach 安装教程": "Peach インストールガイド",
	"Peach 尚未退出，安装未完成。请稍后重试。": "Peach がまだ終了していないため、インストールが完了していません。しばらくしてから再試行してください。",
	"Peach 数据库、缓存和设置文件都放在这里。": "Peach のデータベース、キャッシュ、設定ファイルはすべてここに保存されます。",
	"Peach 数据库用 Windows 格式保存影片路径，前缀为 {0}；实际媒体目录为 {1}，按相同顺序保存在 [media.mounts] local，读取文件前自动转换。": "Peach のデータベースは動画のパスを Windows 形式で保存しており、プレフィックスは {0} です。実際のメディアディレクトリは {1} で、同じ順序で [media.mounts] local に保存され、ファイル読み込み前に自動変換されます。",
	"Peach 数据目录不能为空": "Peach のデータディレクトリは空にできません",
	"Peach 服务处理失败，请重试；持续失败时查看托盘日志。": "Peach サービスの処理に失敗しました。再試行してください。失敗が続く場合はトレイのログを確認してください。",
	"Peach 服务暂时不可用，请稍后重试。": "Peach サービスは一時的に利用できません。しばらくしてから再試行してください。",
	"Peach 服务没有取回结果，请稍后重试；持续失败时查看托盘日志。": "Peach サービスから結果を取得できませんでした。しばらくしてから再試行してください。失敗が続く場合はトレイのログを確認してください。",
	"Peach 正在重新启动。": "Peach を再起動しています。",
	"Peach 正在重新启动。稍后自动跳转，或点击": "Peach を再起動しています。まもなく自動的に移動します。または次をクリックしてください：",
	"Peach 版本、字段版本与 UTC 自然周": "Peach のバージョン、フィールドのバージョン、UTC の暦週",
	"Peach 版本、操作系统类型；每天最多一次，不含安装标识。": "Peach のバージョン、OS の種類。1 日最大 1 回で、インストール識別子は含みません。",
	"Peach 版本、系统类型、Python 版本、CPU 架构、故障环节、异常链、Peach 代码文件名/函数名/行号、结构化错误码、媒体工具故障类别、HTTP 方法/路由模板/关联错误编号、同类故障次数与统计日期；首次立即上传，重复次数每小时或退出时合并，每天最多 20 批。": "Peach のバージョン、OS の種類、Python のバージョン、CPU アーキテクチャ、障害の発生箇所、例外チェーン、Peach のコードのファイル名/関数名/行番号、構造化エラーコード、メディアツールの障害カテゴリ、HTTP メソッド/ルートテンプレート/関連エラー番号、同種障害の回数と集計日。初回は即時にアップロードし、重複回数は 1 時間ごとまたは終了時にまとめて送信します。1 日最大 20 バッチです。",
	"Peach 看过": "Peach 視聴済み",
	"Peach 观看": "Peach 視聴",
	"Peach 观看行为目前更集中在{0}。": "Peach での視聴は現在{0}に集中しています。",
	"Peach 诊断报告": "Peach 診断レポート",
	"Peach 配置": "Peach 構成",
	"Peach 重启后自动恢复。": "Peach の再起動後に自動で再開します。",
	"Peach 首页": "Peach ホーム",
	"PikPak 不认这个链接：{0}": "PikPak がこのリンクを受け付けません：{0}",
	"PikPak 报告离线失败": "PikPak からオフラインダウンロード失敗の報告がありました",
	"PikPak 拒绝了网页端的请求签名：{0}。网页端的签名常量可能已经更新，可以先复制磁力手动添加": "PikPak がウェブ版のリクエスト署名を拒否しました：{0}。ウェブ版の署名定数が更新された可能性があります。先にマグネットをコピーして手動で追加できます",
	"PikPak 拒绝了这个任务：{0}": "PikPak がこのタスクを拒否しました：{0}",
	"PikPak 拒绝刷新网页登录的令牌：{0}。请在设置页点「用浏览器登录」重新登录": "PikPak がウェブログインのトークン更新を拒否しました：{0}。設定ページで「ブラウザでログイン」をクリックして再ログインしてください",
	"PikPak 接口回包形状不对（{0}），接口可能已经变了。可以先复制磁力手动添加": "PikPak の API レスポンスの形式が想定と異なります（{0}）。API が変更された可能性があります。先にマグネットをコピーして手動で追加できます",
	"PikPak 暂时不可用（HTTP {0}）": "PikPak は一時的に利用できません（HTTP {0}）",
	"PikPak 来源根必须唯一声明为 A 盘": "PikPak のソースルートは A ドライブとして一意に宣言する必要があります",
	"PikPak 根目录": "PikPak ルートフォルダ",
	"PikPak 根目录对应的媒体目录": "PikPak ルートフォルダに対応するメディアフォルダ",
	"PikPak 登录失败：{0}（{1}）": "PikPak へのログインに失敗しました：{0}（{1}）",
	"PikPak 登录已失效，请在设置页重新登录：{0}": "PikPak のログインが無効になりました。設定ページで再ログインしてください：{0}",
	"PikPak 登录已过期，请在设置页重新登录：{0}": "PikPak のログインの有効期限が切れました。設定ページで再ログインしてください：{0}",
	"PikPak 目标目录": "PikPak 保存先フォルダ",
	"PikPak 离线次数或空间不够：{0}": "PikPak のオフラインダウンロード回数または容量が不足しています：{0}",
	"PikPak 网盘": "PikPak クラウドストレージ",
	"PikPak 网页端的客户端标识是 {0}，Peach 没有它的签名常量，提交不了离线任务。可以先复制磁力手动添加": "PikPak ウェブ版のクライアント識別子は {0} ですが、Peach にはその署名定数がないため、オフラインタスクを送信できません。先にマグネットをコピーして手動で追加できます",
	"PikPak 要求人机验证，请在设置页重新登录：{0}": "PikPak から CAPTCHA 認証を求められました。設定ページで再ログインしてください：{0}",
	"PikPak 要求先完成人机验证：打开验证页完成后，回到设置页再点一次登录": "PikPak から先に CAPTCHA 認証を求められています。認証ページを開いて完了したら、設定ページに戻ってもう一度ログインをクリックしてください",
	"PikPak 账号": "PikPak アカウント",
	"PikPak 里没有 {0} 这个文件夹": "PikPak に {0} というフォルダがありません",
	"PikPak（没有则留最大）": "PikPak（なければ最大のものを残す）",
	"Promise 未处理的异常": "Promise の未処理の例外",
	"Rule34.xxx 标签": "Rule34.xxx タグ",
	"Rule34.xxx 的创作者": "Rule34.xxx のクリエイター",
	"Rule34Video 正片地址未取得": "Rule34Video 本編アドレス未取得",
	"Rule34Video 详情地址不可用": "Rule34Video の詳細アドレスを使用できません",
	"Rule34Video 详情页刚刚未取得，稍后再试": "Rule34Video の詳細ページを今回は取得できませんでした。しばらくしてから再試行してください",
	"Rule34Video 详情页未取得": "Rule34Video 詳細ページ未取得",
	"SATA SSD，内存 8–16 GB": "SATA SSD、メモリ 8–16 GB",
	"SFW 模式": "SFW モード",
	"STRM 内容无法解析，请检查播放地址和列表格式": "STRM の内容を解析できません。再生アドレスとリストの形式を確認してください",
	"STRM 和 ISO 不执行视频探测": "STRM と ISO では動画のプローブを実行しません",
	"STRM 媒体未取得，请检查播放地址或在生成工具中更新 STRM": "STRM のメディアを取得できませんでした。再生アドレスを確認するか、生成ツールで STRM を更新してください",
	"STRM 播放列表包含不可访问的媒体地址": "STRM プレイリストにアクセスできないメディアアドレスが含まれています",
	"STRM 播放列表超过 2 MiB": "STRM プレイリストが 2 MiB を超えています",
	"STRM 播放资源已失效，请重新打开作品": "STRM の再生リソースが無効になりました。作品を開き直してください",
	"STRM 文件未取得或不是 UTF-8 文本": "STRM ファイルを取得できないか、UTF-8 テキストではありません",
	"STRM 文件超过 64 KiB": "STRM ファイルが 64 KiB を超えています",
	"STRM 文件需要且只能包含一个播放地址": "STRM ファイルには再生アドレスを 1 つだけ含める必要があります",
	"STRM 需要不含账号密码的 HTTP 或 HTTPS 播放地址": "STRM にはアカウントやパスワードを含まない HTTP または HTTPS の再生アドレスが必要です",
	"SubscribeStar 官方来源暂不支持向前翻页": "SubscribeStar の公式ソースは過去ページの遡りにまだ対応していません",
	"SubscribeStar 帖子 {0}": "SubscribeStar 投稿 {0}",
	"SubscribeStar 的链接要指向创作者主页，形如 https://subscribestar.adult/creator": "SubscribeStar のリンクはクリエイターのトップページを指定してください（例：https://subscribestar.adult/creator）",
	"SubtitleCat 搜索页面未取得，请稍后重试": "SubtitleCat の検索ページを取得できませんでした。しばらくしてから再試行してください",
	"SubtitleCat 暂时无法连接，请稍后重试": "SubtitleCat に一時的に接続できません。しばらくしてから再試行してください",
	"Tag 候选": "Tag 候補",
	"Takeout Chrome History 含无效记录": "Takeout の Chrome History に無効な記録が含まれています",
	"Takeout Chrome History 缺少 Browser History 列表": "Takeout の Chrome History に Browser History リストがありません",
	"Takeout 未包含可识别的浏览或搜索活动": "Takeout に認識できる閲覧・検索アクティビティが含まれていません",
	"Tunnel 启动状态失败：{0}": "Tunnel の起動状態の書き込みに失敗しました：{0}",
	"Tunnel 状态写入失败：{0}": "Tunnel の状態の書き込みに失敗しました：{0}",
	"Tunnel 状态文件不可读": "Tunnel の状態ファイルを読み込めません",
	"Tunnel 状态文件格式错误": "Tunnel の状態ファイルの形式が正しくありません",
	"WebDAV 创建父目录失败：HTTP": "WebDAV で親ディレクトリの作成に失敗しました：HTTP",
	"WebDAV 响应超过预算": "WebDAV のレスポンスが上限を超えました",
	"WebDAV 文件成员超过预算": "WebDAV のファイル数が上限を超えました",
	"WebDAV 来源未取得": "WebDAV ソース未取得",
	"WebDAV 目录遍历超过预算或循环": "WebDAV のディレクトリ走査が上限を超えたか、ループしています",
	"WebDAV 目标已存在": "WebDAV の移動先が既に存在します",
	"WebDAV 网络应答未取得": "WebDAV のネットワーク応答未取得",
	"WebDAV 路径越出已声明来源": "WebDAV のパスが宣言済みのソースの範囲外です",
	"Webhook 配置": "Webhook 構成",
	"Windows 快捷方式操作超时（等待 {0} 秒），请稍后重试。": "Windows ショートカットの操作がタイムアウトしました（{0} 秒待機）。しばらくしてから再試行してください。",
	"Windows 桌面版粘贴后显示「无效」时，把这段存成 .toml 文件，放进 %LOCALAPPDATA%\\CloudDrive.WinUI\\webhooks\\ 目录。": "Windows デスクトップ版で貼り付け後に「無効」と表示される場合は、この内容を .toml ファイルとして保存し、%LOCALAPPDATA%\\CloudDrive.WinUI\\webhooks\\ フォルダに置いてください。",
	"X 资料页没有本人头像": "X のプロフィールページに本人のアバターがありません",
	"X 资料页返回 HTTP {0}": "X のプロフィールページが HTTP {0} を返しました",
	"[぀-ヿ一-鿿々ー・]{2,10}": "[぀-ヿ一-鿿々ー・]{2,10}",
	"`saved` 只能由 save_asset() 设置": "`saved` は save_asset() でのみ設定できます",
	"amane 桥已按 {0} 重建": "amane ブリッジを {0} に従って再構築しました",
	"amane 桥已重建": "amane ブリッジを再構築しました",
	"amane 桥未安装：在「来源和凭证」页重建，或放到 {0}": "amane ブリッジがインストールされていません：「ソースと認証情報」ページで再構築するか、{0} に配置してください",
	"amane 桥查询失败（exit {0}）": "amane ブリッジの問い合わせに失敗しました（exit {0}）",
	"amane 桥查询超时": "amane ブリッジの問い合わせがタイムアウトしました",
	"amane 桥的清单没有钉住 amane 的 revision": "amane ブリッジのマニフェストで amane の revision が固定されていません",
	"amane 桥脚本缺失：{0}": "amane ブリッジのスクリプトがありません：{0}",
	"amane 桥返回了非 JSON 输出：{0}": "amane ブリッジが JSON 以外の出力を返しました：{0}",
	"amane 桥问的几站都没有这个番号": "amane ブリッジが問い合わせたどのサイトにもこの品番はありません",
	"amane 桥：{0}": "amane ブリッジ：{0}",
	"approved 只属于用户复核": "approved はユーザーのレビューでのみ設定できます",
	"avwikidb 上没有她的单人作品": "avwikidb に彼女の単体作品はありません",
	"avwikidb 单人作品{0}：{1}": "avwikidb の単体作品{0}：{1}",
	"before_finished_at 与 before_id 要一起给": "before_finished_at と before_id は同時に指定してください",
	"before_finished_at／before_id 只用于最近完成那一段，不和 status、task_key 同用": "before_finished_at／before_id は直近の完了分にのみ使用し、status や task_key とは併用しません",
	"before_id 必须是正整数": "before_id は正の整数にしてください",
	"cloudflared 启动失败：{0}": "cloudflared の起動に失敗しました：{0}",
	"cloudflared 在取得入口前退出": "cloudflared が公開アドレスを取得する前に終了しました",
	"cloudflared 已退出": "cloudflared が終了しました",
	"cloudflared 未在限定时间内取得入口": "cloudflared が制限時間内に公開アドレスを取得できませんでした",
	"cloudflared 未在限定时间内连接到 Cloudflare 边缘": "cloudflared が制限時間内に Cloudflare エッジへ接続できませんでした",
	"cloudflared 没有输出通道": "cloudflared の出力ストリームがありません",
	"curl 启动失败：{0}: {1}": "curl の起動に失敗しました：{0}: {1}",
	"curl 退出 {0}：{1}": "curl が終了しました（{0}）：{1}",
	"data-* 键名不合法：{0}": "data-* のキー名が不正です：{0}",
	"data-drop=\"initial\" data-initial=\"无封面\" data-drop-class=\"nopic\"": "data-drop=\"initial\" data-initial=\"カバーなし\" data-drop-class=\"nopic\"",
	"dts 有重复，认不出哪一帧是哪一帧": "dts が重複しているため、各フレームを識別できません",
	"enabled 必须是 true 或 false": "enabled は true または false にしてください",
	"entity_id 与 key 都要给": "entity_id と key の両方を指定してください",
	"entries 必须是列表": "entries はリストにしてください",
	"f95zone 的 ref 必须是线程 id，收到：{0}": "f95zone の ref はスレッド id にしてください。受け取った値：{0}",
	"f95zone 的链接要指向一个线程，形如 https://f95zone.to/threads/xxx.50685/": "f95zone のリンクはスレッドを指定してください（例：https://f95zone.to/threads/xxx.50685/）",
	"f95zone 站内搜索需要登录 cookie；请把它写进 peach-data/secrets/follow/f95zone.json": "f95zone のサイト内検索にはログイン cookie が必要です。peach-data/secrets/follow/f95zone.json に書き込んでください",
	"f95zone 线程页没有解析出任何回复：可能需要登录，或页面结构已变": "f95zone のスレッドページから返信を 1 件も解析できませんでした。ログインが必要か、ページ構造が変わった可能性があります",
	"fanbox 历史页清单意外返回 304": "fanbox の過去ページ一覧が予期せず 304 を返しました",
	"fanbox 响应超出大小上限": "fanbox のレスポンスがサイズ上限を超えました",
	"fanbox 帖子详情不是公开免费正文": "fanbox の投稿詳細が無料公開の本文ではありません",
	"fanbox 帖子详情格式不符": "fanbox の投稿詳細の形式が想定と異なります",
	"fanbox 帖子详情返回错误：{0}": "fanbox の投稿詳細がエラーを返しました：{0}",
	"fanbox 的 ref 必须是创作者 id，收到：{0}": "fanbox の ref はクリエイター id にしてください。受け取った値：{0}",
	"fanbox 的历史页清单格式不符": "fanbox の過去ページ一覧の形式が想定と異なります",
	"fanbox 请求失败": "fanbox へのリクエストに失敗しました",
	"fanbox 返回的帖子列表格式不符": "fanbox が返した投稿一覧の形式が想定と異なります",
	"favicon 刷新": "favicon 更新",
	"fc2cmadb 文章封面证据，只对 --fc2-only 生效": "fc2cmadb の記事カバーの証拠。--fc2-only 指定時のみ有効",
	"ffmpeg 不可用": "ffmpeg を使用できません",
	"ffprobe 没跑完：{0}": "ffprobe が完了しませんでした：{0}",
	"ffprobe 退出码 {0}": "ffprobe の終了コード {0}",
	"javdb 登录页": "javdb ログインページ",
	"mdat 后面还有盒子，这个布局还没支持": "mdat の後ろにさらにボックスがあります。この構造にはまだ対応していません",
	"metadata provider 只接受规范化番号，不接受路径、URL 或任意文本": "metadata provider は正規化された品番のみ受け付け、パス、URL、任意のテキストは受け付けません",
	"migrate status 失败：{0}": "migrate status が失敗しました：{0}",
	"migrate status 没有报待迁移数：{0}": "migrate status が未適用のマイグレーション数を報告しませんでした：{0}",
	"migration {0} 关闭外键后留下 {1} 条违约行：{2}": "migration {0} で外部キーを無効にした後、制約違反の行が {1} 件残りました：{2}",
	"migration 版本重复": "migration のバージョンが重複しています",
	"migration 目录不存在：{0}": "migration ディレクトリが存在しません：{0}",
	"minnano-av 编号 {0}": "minnano-av ID {0}",
	"moov 在 mdat 之后，这个布局还没支持": "moov が mdat の後ろにあります。この構造にはまだ対応していません",
	"moov 太大或 mdat 是空的": "moov が大きすぎるか、mdat が空です",
	"observed 只属于代码判据来源": "observed はコード判定のソースにのみ設定できます",
	"openssl {0} 失败：{1}": "openssl {0} に失敗しました：{1}",
	"patreon 的 ref 必须是创作者短名，收到：{0}": "patreon の ref はクリエイターの短縮名にしてください。受け取った値：{0}",
	"patreon 返回的页面不是 UTF-8": "patreon が返したページが UTF-8 ではありません",
	"profile {0} 不存在": "profile {0} が存在しません",
	"provider 名称非法": "provider 名が不正です",
	"replication.enabled = false，按独立写者": "replication.enabled = false のため、独立した書き込み側として動作",
	"rule34.paheal 标签页没有解析出任何作品": "rule34.paheal のタグページから作品を 1 件も解析できませんでした",
	"rule34.paheal 的 ref 必须是单个标签，收到：{0}": "rule34.paheal の ref は単一のタグにしてください。受け取った値：{0}",
	"rule34.paheal 的链接要带搜索标签，形如 https://rule34.paheal.net/post/view/7428820#search=InitialA": "rule34.paheal のリンクには検索タグを含めてください（例：https://rule34.paheal.net/post/view/7428820#search=InitialA）",
	"rule34.xxx 的链接要带标签，形如 https://rule34.xxx/index.php?page=post&s=list&tags=lazyprocrastinator": "rule34.xxx のリンクにはタグを含めてください（例：https://rule34.xxx/index.php?page=post&s=list&tags=lazyprocrastinator）",
	"rule34video 创作者页没有解析出任何作品：页面结构可能已变，或该 slug 不存在": "rule34video のクリエイターページから作品を 1 件も解析できませんでした。ページ構造が変わったか、その slug が存在しない可能性があります",
	"rule34video 的 ref 必须是作者 slug，收到：{0}": "rule34video の ref は作者の slug にしてください。受け取った値：{0}",
	"rule34video 的链接要指向作者页，形如 https://rule34video.com/models/lazyprocrastinator/": "rule34video のリンクは作者ページを指定してください（例：https://rule34video.com/models/lazyprocrastinator/）",
	"rule34xxx 拒绝了 user_id/api_key": "rule34xxx が user_id/api_key を拒否しました",
	"rule34xxx 的 ref 必须是单个标签，收到：{0}": "rule34xxx の ref は単一のタグにしてください。受け取った値：{0}",
	"rule34xxx 的帖子列表格式不符": "rule34xxx の投稿一覧の形式が想定と異なります",
	"rule34xxx 的标签补全格式不符": "rule34xxx のタグ補完の形式が想定と異なります",
	"rule34xxx 需要 user_id 与 api_key；请把它们写进 peach-data/secrets/follow/rule34xxx.json": "rule34xxx には user_id と api_key が必要です。peach-data/secrets/follow/rule34xxx.json に書き込んでください",
	"searchHistoryLimit 只收 0 到 {0} 的整数": "searchHistoryLimit には 0～{0} の整数のみ指定できます",
	"semantics 只能是 work 或 release": "semantics は work または release のみ指定できます",
	"sha1 一致": "sha1 一致",
	"simpcity 拒绝访问（HTTP 403）：站点不让游客读帖，cookie 可能已过期或不完整，请重新登录后更新凭据文件": "simpcity がアクセスを拒否しました（HTTP 403）：サイトがゲストの閲覧を許可していません。cookie の期限切れか不完全の可能性があります。再ログインして認証情報ファイルを更新してください",
	"simpcity 没有认出这份 cookie（页面仍是游客态）：请重新登录后复制整条 Cookie 请求头": "simpcity がこの cookie を認識しませんでした（ページがゲスト状態のままです）：再ログインして Cookie リクエストヘッダー全体をコピーしてください",
	"simpcity 的 ref 必须是线程 id，收到：{0}": "simpcity の ref はスレッド id にしてください。受け取った値：{0}",
	"simpcity 的链接要指向一个线程，形如 https://simpcity.cr/threads/xxx.21229/": "simpcity のリンクはスレッドを指定してください（例：https://simpcity.cr/threads/xxx.21229/）",
	"simpcity 线程页没有解析出任何楼层：页面结构可能已变": "simpcity のスレッドページから投稿を 1 件も解析できませんでした：ページ構造が変わった可能性があります",
	"simpcity 需要登录 cookie：站点不让游客读帖。登录后把浏览器里 simpcity.cr 的整条 Cookie 请求头写进凭据文件的 cookie 字段。": "simpcity にはログイン cookie が必要です：サイトがゲストの閲覧を許可していません。ログイン後、ブラウザの simpcity.cr の Cookie リクエストヘッダー全体を認証情報ファイルの cookie フィールドに書き込んでください。",
	"stts 长度和声明的条目数对不上": "stts の長さが宣言されたエントリ数と一致しません",
	"subscribestar 的 ref 必须形如 subscribestar.adult/creator": "subscribestar の ref は subscribestar.adult/creator の形式にしてください",
	"subscribestar 返回的页面不是 UTF-8": "subscribestar が返したページが UTF-8 ではありません",
	"tunnel.mode 只能是 quick 或 named：{0}": "tunnel.mode は quick または named のみ指定できます：{0}",
	"using System; using System.Runtime.InteropServices; namespace PeachPick { [ComImport, Guid(\"42f85136-db7e-439c-85f1-e4075d135fc8\"), InterfaceType(ComInterfaceType.InterfaceIsIUnknown)] public interface IFileOpenDialog { [PreserveSig] int Show(IntPtr parent); void SetFileTypes(uint count, IntPtr filterSpec); void SetFileTypeIndex(uint index); void GetFileTypeIndex(out uint index); void Advise(IntPtr events, out uint cookie); void Unadvise(uint cookie); void SetOptions(uint options); void GetOptions(out uint options); void SetDefaultFolder(IShellItem item); void SetFolder(IShellItem item); void GetFolder(out IShellItem item); void GetCurrentSelection(out IShellItem item); void SetFileName([MarshalAs(UnmanagedType.LPWStr)] string name); void GetFileName([MarshalAs(UnmanagedType.LPWStr)] out string name); void SetTitle([MarshalAs(UnmanagedType.LPWStr)] string title); void SetOkButtonLabel([MarshalAs(UnmanagedType.LPWStr)] string text); void SetFileNameLabel([MarshalAs(UnmanagedType.LPWStr)] string label); void GetResult(out IShellItem item); void AddPlace(IShellItem item, int placement); void SetDefaultExtension([MarshalAs(UnmanagedType.LPWStr)] string extension); void Close(int hr); void SetClientGuid(ref Guid guid); void ClearClientData(); void SetFilter(IntPtr filter); void GetResults(out IntPtr items); void GetSelectedItems(out IntPtr items); } [ComImport, Guid(\"43826d1e-e718-42ee-bc55-a1e261c37bfe\"), InterfaceType(ComInterfaceType.InterfaceIsIUnknown)] public interface IShellItem { void BindToHandler(IntPtr bindContext, ref Guid handlerId, ref Guid interfaceId, out IntPtr result); void GetParent(out IShellItem parent); void GetDisplayName(uint form, [MarshalAs(UnmanagedType.LPWStr)] out string name); void GetAttributes(uint mask, out uint attributes); void Compare(IShellItem other, uint hint, out int order); } [ComImport, Guid(\"DC1C5A9C-E88A-4dde-A5A1-60F82A20AEF7\")] public class FileOpenDialogRCW { } public static class Picker { [DllImport(\"user32.dll\")] static extern IntPtr SetThreadDpiAwarenessContext(IntPtr context); [DllImport(\"shell32.dll\", CharSet = CharSet.Unicode, PreserveSig = false)] static extern IShellItem SHCreateItemFromParsingName(string path, IntPtr bindContext, ref Guid interfaceId); [DllImport(\"user32.dll\", CharSet = CharSet.Unicode)] static extern IntPtr FindWindow(string className, string title); [DllImport(\"user32.dll\")] static extern bool SetWindowPos(IntPtr window, IntPtr insertAfter, int x, int y, int width, int height, uint flags); [DllImport(\"user32.dll\")] static extern bool SetForegroundWindow(IntPtr window); // 服务进程在后台，Windows 不给它前台权：对话框会开在浏览器后面。等它的窗口 // 出现后置顶（SetWindowPos 到 HWND_TOPMOST 不需要前台权），模态窗关掉即消失。 static void Raise(string title) { for (int attempt = 0; attempt": "using System; using System.Runtime.InteropServices; namespace PeachPick { [ComImport, Guid(\"42f85136-db7e-439c-85f1-e4075d135fc8\"), InterfaceType(ComInterfaceType.InterfaceIsIUnknown)] public interface IFileOpenDialog { [PreserveSig] int Show(IntPtr parent); void SetFileTypes(uint count, IntPtr filterSpec); void SetFileTypeIndex(uint index); void GetFileTypeIndex(out uint index); void Advise(IntPtr events, out uint cookie); void Unadvise(uint cookie); void SetOptions(uint options); void GetOptions(out uint options); void SetDefaultFolder(IShellItem item); void SetFolder(IShellItem item); void GetFolder(out IShellItem item); void GetCurrentSelection(out IShellItem item); void SetFileName([MarshalAs(UnmanagedType.LPWStr)] string name); void GetFileName([MarshalAs(UnmanagedType.LPWStr)] out string name); void SetTitle([MarshalAs(UnmanagedType.LPWStr)] string title); void SetOkButtonLabel([MarshalAs(UnmanagedType.LPWStr)] string text); void SetFileNameLabel([MarshalAs(UnmanagedType.LPWStr)] string label); void GetResult(out IShellItem item); void AddPlace(IShellItem item, int placement); void SetDefaultExtension([MarshalAs(UnmanagedType.LPWStr)] string extension); void Close(int hr); void SetClientGuid(ref Guid guid); void ClearClientData(); void SetFilter(IntPtr filter); void GetResults(out IntPtr items); void GetSelectedItems(out IntPtr items); } [ComImport, Guid(\"43826d1e-e718-42ee-bc55-a1e261c37bfe\"), InterfaceType(ComInterfaceType.InterfaceIsIUnknown)] public interface IShellItem { void BindToHandler(IntPtr bindContext, ref Guid handlerId, ref Guid interfaceId, out IntPtr result); void GetParent(out IShellItem parent); void GetDisplayName(uint form, [MarshalAs(UnmanagedType.LPWStr)] out string name); void GetAttributes(uint mask, out uint attributes); void Compare(IShellItem other, uint hint, out int order); } [ComImport, Guid(\"DC1C5A9C-E88A-4dde-A5A1-60F82A20AEF7\")] public class FileOpenDialogRCW { } public static class Picker { [DllImport(\"user32.dll\")] static extern IntPtr SetThreadDpiAwarenessContext(IntPtr context); [DllImport(\"shell32.dll\", CharSet = CharSet.Unicode, PreserveSig = false)] static extern IShellItem SHCreateItemFromParsingName(string path, IntPtr bindContext, ref Guid interfaceId); [DllImport(\"user32.dll\", CharSet = CharSet.Unicode)] static extern IntPtr FindWindow(string className, string title); [DllImport(\"user32.dll\")] static extern bool SetWindowPos(IntPtr window, IntPtr insertAfter, int x, int y, int width, int height, uint flags); [DllImport(\"user32.dll\")] static extern bool SetForegroundWindow(IntPtr window); // 服务进程在后台，Windows 不给它前台权：对话框会开在浏览器后面。等它的窗口 // 出现后置顶（SetWindowPos 到 HWND_TOPMOST 不需要前台权），模态窗关掉即消失。 static void Raise(string title) { for (int attempt = 0; attempt",
	"uv sync 失败（exit {0}）：{1}": "uv sync に失敗しました（exit {0}）：{1}",
	"uv sync 失败：{0}": "uv sync に失敗しました：{0}",
	"uv 没能运行：{0}": "uv を実行できませんでした：{0}",
	"width/height 必须是正整数": "width/height は正の整数にしてください",
	"{0} aria-label=\"更多同步方式\"": "{0} aria-label=\"その他の同期方法\"",
	"{0} {1} / {2} 条链接": "{0} {1} / {2} 件のリンク",
	"{0} {1} 张": "{0} {1} 枚",
	"{0} {1} 的来源": "{0} {1} のソース",
	"{0} {1} 部": "{0} {1} 本",
	"{0} · {1} 个媒体": "{0} · {1} 件のメディア",
	"{0} · {1} 个视频": "{0} · {1} 本の動画",
	"{0} · {1} 张": "{0} · {1} 枚",
	"{0} · {1} 请求": "{0} · {1} リクエスト",
	"{0} · {1} 项": "{0} · {1} 件",
	"{0} · 托盘构建 {1} 不在本检出历史里": "{0} · トレイのビルド {1} はこのチェックアウトの履歴にありません",
	"{0} · 托盘构建 {1}，落后 {2} 个提交": "{0} · トレイのビルド {1}、{2} コミット遅れ",
	"{0} · 托盘构建身份未取得": "{0} · トレイのビルド識別情報未取得",
	"{0} · 社媒头像": "{0} · SNS アバター",
	"{0} → {1}{2}；词元重合 {3}；{4} 部作品": "{0} → {1}{2}、トークン一致 {3}、作品 {4} 本",
	"{0} ↔ {1}；证据：": "{0} ↔ {1}、証拠：",
	"{0} 。和 {1} 是同一个人吗？": "{0}。{1} と同一人物ですか？",
	"{0} 上没有这个番号（{1}）": "{0} にこの品番はありません（{1}）",
	"{0} 不存在": "{0} は存在しません",
	"{0} 不接受凭据": "{0} は認証情報を受け付けません",
	"{0} 不支持离线下载": "{0} はオフラインダウンロードに対応していません",
	"{0} 不是已声明的 PikPak 媒体根；已知：{1}": "{0} は宣言済みの PikPak メディアルートではありません。既知：{1}",
	"{0} 不是已声明的媒体根；已知：{1}": "{0} は宣言済みのメディアルートではありません。既知：{1}",
	"{0} 不是盘符路径；网络位置先映射成盘符再来": "{0} はドライブレターのパスではありません。ネットワークの場所は先にドライブレターに割り当ててください",
	"{0} 不是终态": "{0} は最終状態ではありません",
	"{0} 不认识这些字段：{1}": "{0} は次のフィールドを認識できません：{1}",
	"{0} 个": "{0} 個",
	"{0} 个 · 可回收 {1}": "{0} 個 · {1} 解放可能",
	"{0} 个不公开来源": "{0} 件の非公開ソース",
	"{0} 个做种": "シード {0}",
	"{0} 个别名": "別名 {0} 件",
	"{0} 个卷": "{0} 個のボリューム",
	"{0} 个同名冲突交回人工": "同名の競合 {0} 件を手動処理に回しました",
	"{0} 个失败": "{0} 件失敗",
	"{0} 个待判断": "{0} 件判定待ち",
	"{0} 个待升级": "{0} 件アップグレード待ち",
	"{0} 个待配置": "{0} 件設定待ち",
	"{0} 个数据源": "{0} 個のデータソース",
	"{0} 个文件 · 可回收 {1}": "{0} 個のファイル · {1} 解放可能",
	"{0} 个文件会改名或移动，{1} 个已经就是目标名字": "{0} 個のファイルが名前変更または移動されます。{1} 個はすでに目的の名前です",
	"{0} 个文件夹没有删除": "{0} 個のフォルダは削除されませんでした",
	"{0} 个来源": "{0} 件のソース",
	"{0} 个来源{1}": "{0} 件のソース{1}",
	"{0} 个来源上次检查失败，去": "{0} 件のソースで前回のチェックに失敗しました。",
	"{0} 个来源检查失败": "{0} 件のソースのチェックに失敗しました",
	"{0} 个来源没有更新": "{0} 件のソースは更新がありません",
	"{0} 个来源需要凭证。": "{0} 件のソースで認証情報が必要です。",
	"{0} 个标签": "{0} 個のタグ",
	"{0} 个没有更多内容": "{0} 件はこれ以上コンテンツがありません",
	"{0} 个版本": "{0} 個のバージョン",
	"{0} 个目录读取失败，已跳过": "{0} 個のフォルダを読み込めなかったため、スキップしました",
	"{0} 个符合 · 显示 {1}": "{0} 件一致 · {1} 件表示",
	"{0} 个缓存没有清理": "{0} 個のキャッシュはクリーンアップされませんでした",
	"{0} 个视频": "{0} 本の動画",
	"{0} 个订阅源 · {1} 条未看": "{0} 件の購読ソース · 未視聴 {1} 件",
	"{0} 人": "{0} 人",
	"{0} 仅剩 {1} GiB（阈值 {2} GiB）": "{0} の残り容量は {1} GiB です（しきい値 {2} GiB）",
	"{0} 份私有导出 · {1}": "{0} 件の非公開エクスポート · {1}",
	"{0} 免复核落库": "{0} によりレビューなしで登録",
	"{0} 关注来源本身": "{0} のフォロー元そのもの",
	"{0} 凭据文件必须是 JSON 对象": "{0} の認証情報ファイルは JSON オブジェクトにしてください",
	"{0} 凭据文件无法解析": "{0} の認証情報ファイルを解析できません",
	"{0} 凭据缺少字段：{1}": "{0} の認証情報にフィールドがありません：{1}",
	"{0} 分 {1} 秒": "{0} 分 {1} 秒",
	"{0} 分类命中": "{0} カテゴリに一致",
	"{0} 分钟": "{0} 分",
	"{0} 分钟内没有完成登录，窗口已关闭。可以再点一次「用浏览器登录」": "{0} 分以内にログインが完了しなかったため、ウィンドウを閉じました。もう一度「ブラウザでログイン」をクリックできます",
	"{0} 卷": "{0} ボリューム",
	"{0} 发售": "{0} 発売",
	"{0} 只收 true 或 false": "{0} には true または false のみ指定できます",
	"{0} 可以离线下载": "{0} はオフラインダウンロードできます",
	"{0} 名字栏把两条实体列成同一个人：{1}（实体 {2}）并入 {3}（实体 {4}），迁 {5} 部作品": "{0} の名前欄で 2 件のエンティティが同一人物として記載されています：{1}（エンティティ {2}）を {3}（エンティティ {4}）に統合し、作品 {5} 本を移行",
	"{0} 名片 {1}/{2}": "{0} プロフィールカード {1}/{2}",
	"{0} 含无法解析的活动记录：{1}": "{0} に解析できないアクティビティ記録が含まれています：{1}",
	"{0} 响应超出大小上限": "{0} のレスポンスがサイズ上限を超えました",
	"{0} 回到待找": "{0} を「探し中」に戻しました",
	"{0} 回的是登入页": "{0} がログインページを返しました",
	"{0} 地址": "{0} アドレス",
	"{0} 天": "{0} 日",
	"{0} 天 {1} 小时": "{0} 日 {1} 時間",
	"{0} 字段需要文本或数值": "{0} フィールドにはテキストまたは数値が必要です",
	"{0} 字段需要文本数组": "{0} フィールドにはテキストの配列が必要です",
	"{0} 官方资料": "{0} 公式情報",
	"{0} 封面": "{0} カバー",
	"{0} 小时": "{0} 時間",
	"{0} 小时 {1} 分": "{0} 時間 {1} 分",
	"{0} 工具包文件校验失败": "{0} のツールキットファイルの検証に失敗しました",
	"{0} 工具复用校验失败": "{0} のツール再利用の検証に失敗しました",
	"{0} 已有一轮在进行": "{0} は既に実行中です",
	"{0} 已登记另一个账号": "{0} には別のアカウントが登録済みです",
	"{0} 已登记另一页": "{0} には別のページが登録済みです",
	"{0} 已经在库里": "{0} は既にライブラリにあります",
	"{0} 已经在想要里": "{0} はすでにほしいものに入っています",
	"{0} 已经是这份档案中的名字": "{0} はすでにこのプロフィールの名前です",
	"{0} 并入 {1}": "{0} を {1} に統合",
	"{0} 张": "{0} 枚",
	"{0} 张可选": "{0} 枚から選択可能",
	"{0} 张头像未取得": "{0} 枚のアバターは未取得",
	"{0} 张资料页都列着她": "{0} 件のプロフィールページすべてに彼女が掲載されています",
	"{0} 归档的原站账号 {1}/{2}": "{0} がアーカイブした元サイトのアカウント {1}/{2}",
	"{0} 必须是整数": "{0} は整数にしてください",
	"{0} 必须是文字": "{0} は文字列にしてください",
	"{0} 所在的网盘不支持离线下载": "{0} があるクラウドストレージはオフラインダウンロードに対応していません",
	"{0} 拒绝访问（HTTP {1}）：需要有效凭据，或站点已加机器人验证": "{0} がアクセスを拒否しました（HTTP {1}）：有効な認証情報が必要か、サイトがボット確認を導入しています",
	"{0} 挂载上的改名无法核验云端结果，界面只出预览，不执行": "{0} のマウント上での名前変更はクラウド側の結果を検証できないため、画面ではプレビューのみ表示し、実行しません",
	"{0} 搜不到她": "{0} で彼女が見つかりません",
	"{0} 搜索表单里没有 _xfToken：cookie 可能已失效": "{0} の検索フォームに _xfToken がありません：cookie が無効になっている可能性があります",
	"{0} 放行任意公网主机时不能再写 hosts 白名单": "{0} で任意のパブリックホストを許可している場合、hosts の許可リストは指定できません",
	"{0} 星": "{0} つ星",
	"{0} 是一个文件，Peach 数据目录要是目录": "{0} はファイルです。Peach のデータディレクトリはフォルダにしてください",
	"{0} 是从共享副本回填的，本机没有单独存。清除会把两边一起删。": "{0} は共有コピーから補完されたもので、このデバイスには個別に保存されていません。消去すると両方とも削除されます。",
	"{0} 是动图": "{0} はアニメーション画像です",
	"{0} 是追更来源，必须登记至少一个 url_hosts": "{0} は更新を追うソースのため、url_hosts を 1 つ以上登録する必要があります",
	"{0} 暂不支持从链接登记": "{0} はリンクからの登録にまだ対応していません",
	"{0} 未取得资料（{1}": "{0} 情報未取得（{1}",
	"{0} 未归属": "{0} 件未割り当て",
	"{0} 条": "{0} 件",
	"{0} 条作品还没有可用预览；批准后仍会按所选资料写入标签。": "{0} 件の作品にはまだ利用できるプレビューがありません。承認後も、選択した情報に従ってタグが書き込まれます。",
	"{0} 条历史 · {1} 枚书签": "履歴 {0} 件 · ブックマーク {1} 件",
	"{0} 条带个人记录的已标为已消失，可在孤儿记录里处理。": "個人記録のある {0} 件を消失済みにしました。孤立レコードで処理できます。",
	"{0} 条带个人记录的标为已消失，记录留着，可在孤儿记录里接到新文件或彻底删除。": "個人記録のある {0} 件を消失済みにしました。記録は残っているので、孤立レコードで新しいファイルに接続するか、完全に削除できます。",
	"{0} 条待复核": "{0} 件レビュー待ち",
	"{0} 条标签": "{0} 件のタグ",
	"{0} 条没有写入：{1}": "{0} 件は書き込まれませんでした：{1}",
	"{0} 条的记录已接到库里的另一个版本。": "{0} 件の記録をライブラリ内の別バージョンに接続しました。",
	"{0} 条订阅源拉取失败": "{0} 件の購読ソースの取得に失敗しました",
	"{0} 条记录没有删除（{1}）": "{0} 件の記録は削除されませんでした（{1}）",
	"{0} 来源离线": "{0} ソースがオフラインです",
	"{0} 样张": "{0} サンプル画像",
	"{0} 样张 {1}": "{0} サンプル画像 {1}",
	"{0} 的 ref 必须形如 `service/user_id`，收到：{1}": "{0} の ref は `service/user_id` の形式にしてください。受け取った値：{1}",
	"{0} 的 semantics 只能是 work 或 release": "{0} の semantics は work または release のみ指定できます",
	"{0} 的 source_url 必须能填入 {ref}": "{0} の source_url は {ref} を埋め込める形式にしてください",
	"{0} 的{1}": "{0} の{1}",
	"{0} 的人机验证在 {1} 秒内没有自动通过；窗口上次弹出后没点过去，这次不再弹": "{0} の CAPTCHA 認証が {1} 秒以内に自動で通過しませんでした。前回表示したウィンドウで操作されなかったため、今回は表示しません",
	"{0} 的人机验证在 {1} 秒内没有通过": "{0} の CAPTCHA 認証が {1} 秒以内に通過しませんでした",
	"{0} 的人机验证需要点一下，浏览器窗口已打开": "{0} の CAPTCHA 認証でクリックが必要です。ブラウザウィンドウを開きました",
	"{0} 的关注来源": "{0} のフォローソース",
	"{0} 的出演表{1}": "{0} の出演者一覧{1}",
	"{0} 的出演表里不止一位对得上：": "{0} の出演者一覧に一致する人が複数います：",
	"{0} 的出演表里对得上她": "{0} の出演者一覧で彼女と一致しました",
	"{0} 的创作者清单格式不符": "{0} のクリエイター一覧の形式が想定と異なります",
	"{0} 的地址必须是文字": "{0} のアドレスは文字列にしてください",
	"{0} 的地址请控制在 {1} 个字符以内": "{0} のアドレスは {1} 文字以内にしてください",
	"{0} 的头像取景框": "{0} のアバター切り抜き枠",
	"{0} 的头像未取得：{1}": "{0} のアバター未取得：{1}",
	"{0} 的女优栏{1}": "{0} の女優欄{1}",
	"{0} 的帖子列表格式不符": "{0} の投稿一覧の形式が想定と異なります",
	"{0} 的文件又回到盘上，没有删除；下一次扫描会把它接回在库": "{0} のファイルがディスクに戻ったため、削除しませんでした。次回のスキャンでライブラリに再接続されます",
	"{0} 的正封取景框": "{0} の表カバー切り抜き枠",
	"{0} 的目录已开启代理流量保护；确认预算后显式加 --allow-metered": "{0} のディレクトリではプロキシ通信量保護が有効です。予算を確認したうえで、明示的に --allow-metered を付けてください",
	"{0} 的链接要指向某个创作者，形如 https://{1}/fanbox/user/30917150": "{0} のリンクはクリエイターを指定してください（例：https://{1}/fanbox/user/30917150）",
	"{0} 的页面在 {1} 秒内没有打开": "{0} のページが {1} 秒以内に開きませんでした",
	"{0} 秒": "{0} 秒",
	"{0} 秒内没取到这个番号的封面，稍后再试": "{0} 秒以内にこの品番のカバーを取得できませんでした。しばらくしてから再試行してください",
	"{0} 第 {1} 行": "{0} の {1} 行目",
	"{0} 组": "{0} グループ",
	"{0} 组 · {1} 个文件": "{0} グループ · {1} 個のファイル",
	"{0} 组 · {1} 个文件 · 可回收 {2}": "{0} グループ · {1} 個のファイル · {2} 解放可能",
	"{0} 给的封面不是同一张图，无法互相印证": "{0} のカバーが同じ画像ではないため、相互に裏付けできません",
	"{0} 缺少官方核验改名通道": "{0} には公式に検証された名前変更の手段がありません",
	"{0} 行未能处理": "{0} 行を処理できませんでした",
	"{0} 覆盖视频": "{0} がカバーする動画",
	"{0} 触发频率限制：每 {1} 秒最多 {2} 次请求，请稍后再试": "{0} がレート制限に達しました：{1} 秒あたり最大 {2} 回のリクエストまでです。しばらくしてから再試行してください",
	"{0} 诊断报告：{1}": "{0} 診断レポート：{1}",
	"{0} 请求失败（已尝试 {1} 次）：{2}": "{0} へのリクエストに失敗しました（{1} 回試行）：{2}",
	"{0} 请求失败：{1}": "{0} へのリクエストに失敗しました：{1}",
	"{0} 返回 HTTP 429：请求过于频繁，稍后再试": "{0} が HTTP 429 を返しました：リクエストが多すぎます。しばらくしてから再試行してください",
	"{0} 返回 HTTP {1}": "{0} が HTTP {1} を返しました",
	"{0} 返回的不是合法 JSON{1}": "{0} が返したデータは正しい JSON ではありません{1}",
	"{0} 返回的商品不是 {1}：content_id={2}": "{0} が返した商品は {1} ではありません：content_id={2}",
	"{0} 这里只写域名本身，像 {1}": "{0} にはドメイン名のみを入力してください（例：{1}）",
	"{0} 部": "{0} 本",
	"{0} 部作品": "{0} 本の作品",
	"{0} 部因来源冷却": "{0} 本はソースのクールダウン中",
	"{0} 部新作的封面连不上 DMM 图片主机，中国移动宽带常见。把 DMM / FANZA 的连接方式设成 Peach 代理，下一轮会自动重取。": "{0} 本の新作のカバーが DMM の画像ホストに接続できません。中国移動のブロードバンドでよく起こります。DMM / FANZA の接続方法を Peach プロキシに設定すると、次回のラウンドで自動的に再取得します。",
	"{0} 部没有可问的官方站": "{0} 本は問い合わせ可能な公式サイトがありません",
	"{0} 部缺索引的片子要装上 untrunc 才修得了，下载入口在配置页的「运行信息」里。": "インデックスが欠けている {0} 本の動画を修復するには untrunc が必要です。ダウンロード先は構成ページの「実行情報」にあります。",
	"{0} 部联网名额用完留到下一轮": "{0} 本はオンライン問い合わせ枠を使い切ったため次回に持ち越し",
	"{0} 部那一站近期说过没有": "{0} 本はそのサイトで最近「該当なし」と返されています",
	"{0} 错误日志未能写入，请保留此弹窗。": "{0} のエラーログを書き込めませんでした。このポップアップは閉じずにそのままにしてください。",
	"{0} 错误日志：{1}": "{0} のエラーログ：{1}",
	"{0} 限流冷却中，{1} 秒后再试": "{0} はレート制限のクールダウン中です。{1} 秒後に再試行してください",
	"{0} 限流冷却中，{1} 秒后再试，本次跳过": "{0} はレート制限のクールダウン中です。{1} 秒後に再試行してください。今回はスキップします",
	"{0} 需要登录或已被拒绝：{1}": "{0} はログインが必要か、拒否されました：{1}",
	"{0} 页面列着数据库里她的名字": "{0} のページにデータベース上の彼女の名前が掲載されています",
	"{0} 项": "{0} 件",
	"{0} 项 · 可应用 {1} 项{2}": "{0} 件 · 適用可能 {1} 件{2}",
	"{0} 项保留现有归属": "{0} 件は既存の割り当てを保持",
	"{0} 项在回收站": "ゴミ箱に {0} 件",
	"{0} 项带个人记录": "{0} 件に個人記録あり",
	"{0} 项带个人记录，已标为已消失": "個人記録のある {0} 件を消失済みにしました",
	"{0} 项待补": "{0} 件補完待ち",
	"{0} 项待补 Tag · {1} 项待补身份": "Tag 未補完 {0} 件 · 身元未補完 {1} 件",
	"{0} 项更新": "{0} 件の更新",
	"{0} 项更新 · 显示 {1}": "{0} 件の更新 · {1} 件表示",
	"{0} 项更新{1}": "{0} 件の更新{1}",
	"{0} 项的记录已接到库里的另一个版本": "{0} 件の記録をライブラリ内の別バージョンに接続しました",
	"{0} 项都卡在来源限流上，等一会儿再跑一次。": "{0} 件すべてがソースのレート制限で止まっています。しばらく待ってからもう一度実行してください。",
	"{0} 项需要处理，其中 {1} 项是来源限流，等一会儿再跑；其余可重试未完成的部分。": "対応が必要な項目が {0} 件あり、そのうち {1} 件はソースのレート制限です。しばらく待ってから再実行してください。それ以外は未完了の部分を再試行できます。",
	"{0} 项需要处理，可重试未完成的部分。": "対応が必要な項目が {0} 件あります。未完了の部分を再試行できます。",
	"{0} 预览 {1}": "{0} プレビュー {1}",
	"{0} 首楼的创作者主页链接指向 {1}/{2}": "{0} の最初の投稿にあるクリエイターページのリンクは {1}/{2} を指しています",
	"{0}/{1} 个来源": "{0}/{1} 件のソース",
	"{0}/{1} 个来源未更新：{2}": "{0}/{1} 件のソースが未更新：{2}",
	"{0}s {1} 文件 {2} TB": "{0}s {1} ファイル {2} TB",
	"{0}{1} 罩杯": "{0}{1} カップ",
	"{0}{1} 项": "{0}{1} 件",
	"{0}{1}，重新检查后可再试。": "{0}{1}。再チェック後にもう一度お試しください。",
	"{0}–{1} / {2} 条": "{0}–{1} / {2} 件",
	"{0}「{1}」页是作品一览：{2} 部、出演者 {3} 位": "{0}「{1}」ページは作品一覧です：{2} 本、出演者 {3} 人",
	"{0}「{1}」（不是作品一览）": "{0}「{1}」（作品一覧ではありません）",
	"{0}「{1}」（写不成站上编码）": "{0}「{1}」（サイトの文字コードで表記できません）",
	"{0}「{1}」（页不存在）": "{0}「{1}」（ページが存在しません）",
	"{0}分页": "{0}のページ送り",
	"{0}及相似作品": "{0}と類似作品",
	"{0}可选图标": "{0}の選択可能なアイコン",
	"{0}失败：{1}": "{0}に失敗しました：{1}",
	"{0}字段路径": "{0}フィールドパス",
	"{0}工具栏": "{0}ツールバー",
	"{0}已有一轮在进行，等它跑完再试": "{0}は既に実行中です。完了してから再試行してください",
	"{0}批量操作": "{0}一括操作",
	"{0}排序": "{0}の並べ替え",
	"{0}改为{1}": "{0}を{1}に変更",
	"{0}方括号里的内容在字段为空时整段省略。": "{0}角括弧内の内容は、フィールドが空のとき丸ごと省略されます。",
	"{0}时连不上 CloudDrive2：{1}": "{0}の際に CloudDrive2 へ接続できません：{1}",
	"{0}校验不符：期望 {1}，实际 {2}": "{0}の検証結果が一致しません：期待値 {1}、実際 {2}",
	"{0}的来源": "{0}のソース",
	"{0}空间使用率": "{0}の容量使用率",
	"{0}站都没对上她": "{0}サイトのいずれでも彼女と一致しませんでした",
	"{0}索引版式": "{0}インデックスのレイアウト",
	"{0}评分 {1} / 5": "{0}評価 {1} / 5",
	"{0}载入更多": "{0}さらに読み込む",
	"{0}颜色": "{0}の色",
	"{0}（实体 {1}）已经用着这个写法": "{0}（エンティティ {1}）が既にこの表記を使用しています",
	"{0}（小图兜底）": "{0}（小さい画像で代替）",
	"{0}（已移除 {1} 个别名，还有 {2} 个未移除）": "{0}（{1} 件の別名を削除、{2} 件は未削除）",
	"{0}（核对 {1} 项{2}）": "{0}（{1} 件を照合{2}）",
	"{0}（还有 {1} 组没有合并）": "{0}（{1} グループは未統合）",
	"{0}，但运行环境没有备齐：{1}": "{0}、ただし実行環境が揃っていません：{1}",
	"{0}，未能完成封面比较；{1}": "{0}、カバーの比較を完了できませんでした。{1}",
	"{0}：CloudDrive2 里没有这个路径": "{0}：CloudDrive2 にこのパスがありません",
	"{0}：minnano-av {1}，avwikidb {2}；资料表不改": "{0}：minnano-av {1}、avwikidb {2}。プロフィール表は変更しません",
	"{0}：{1} 人合演，先找到她自己的脸，再拖动方框选一块。": "{0}：{1} 人共演です。まず本人の顔を見つけてから、枠をドラッグして範囲を選んでください。",
	"{0}：{1} 已属另一条实体": "{0}：{1} は既に別のエンティティに属しています",
	"{0}：{1} 条线索": "{0}：手がかり {1} 件",
	"{0}：{1} 等 {2} 部": "{0}：{1} など {2} 本",
	"{0}：写库前的 SQLite 备份路径": "{0}：データベース書き込み前の SQLite バックアップのパス",
	"{0}：取得 1080p/2160p，已短路": "{0}：1080p/2160p を取得したため、以降をスキップしました",
	"{0}：取得 {1} 条": "{0}：{1} 件取得",
	"{0}：图库里按{1}{2}找到的。": "{0}：画像ライブラリで{1}{2}をもとに見つけました。",
	"{0}：已完成 {1}/{2} 个来源": "{0}：{1}/{2} 件のソースが完了",
	"{0}：拖动方框选一块，滚轮或角上那枚方块改大小。": "{0}：枠をドラッグして範囲を選びます。サイズはホイールか角のハンドルで変更します。",
	"{0}：换上的那张留在本机，随时能换回来。": "{0}：差し替えた画像はこのデバイスに残るので、いつでも元に戻せます。",
	"{0}：数据库里这条实体已经变了": "{0}：データベース上のこのエンティティは既に変更されています",
	"{0}：无结果": "{0}：結果なし",
	"{0}：未取得": "{0}：未取得",
	"{0}：框出正封那一块，封面原图不动。拖动方框移动，滚轮或角上那枚方块改大小。": "{0}：表カバーの部分を枠で囲みます。カバーの元画像は変更されません。枠をドラッグして移動し、ホイールか角のハンドルでサイズを変更します。",
	"{0}：没有能拿去检索的名字": "{0}：検索に使える名前がありません",
	"{0}：请求失败或响应格式不正确，请检查索引器": "{0}：リクエストに失敗したか、レスポンスの形式が正しくありません。インデクサーを確認してください",
	"{0}：还没有备选图片，可输入番号、图片地址或从本机选择。": "{0}：まだ候補画像がありません。品番、画像 URL を入力するか、このデバイスから選択してください。",
	"{0}；只移除创作者投影，番号不改写": "{0}。クリエイターの投影のみ削除し、品番は書き換えません",
	"{0}；回滚失败，生产入口停在新二进制：{1}": "{0}。ロールバックに失敗し、本番の起動先は新しいバイナリのままです：{1}",
	"{0}；已回滚到备份并重开旧托盘": "{0}。バックアップにロールバックし、旧トレイを再起動しました",
	"{0}；已回滚到备份，但旧托盘也没起来": "{0}。バックアップにロールバックしましたが、旧トレイも起動しませんでした",
	"{0}；标题「{1}」": "{0}、タイトル「{1}」",
	"| 候选 | 信号数 |": "| 候補 | シグナル数 |",
	"| 未提取到 | 0 |": "| 抽出なし | 0 |",
	"· {0} 人合演": "· {0} 人共演",
	"· {0} 岁": "· {0} 歳",
	"· {0} 条未看": "· 未視聴 {0} 件",
	"· {0} 秒": "· {0} 秒",
	"· 书签": "· ブックマーク",
	"· 代表作": "· 代表作",
	"· 保留现有归属 {0} 项": "· 既存の割り当てを保持 {0} 件",
	"· 官方优先": "· 公式優先",
	"· 已等待 {0}": "· {0} 待機中",
	"· 已选 {0} 个标签": "· {0} 個のタグを選択中",
	"· 待确认": "· 確認待ち",
	"· 按「{0}」找到": "· 「{0}」で見つかりました",
	"· 晚于现在": "· 現在より後",
	"· 有未提交修改": "· 未コミットの変更あり",
	"· 第 {0}/{1} 次尝试{2}": "· 試行 {0}/{1} 回目{2}",
	"· 计费": "· 従量課金",
	"– 至今": "– 現在",
	"✓ {0}: {1} 文件 / {2} TB / 耗时 {3}s；附属文件未登记 {4} 个；清单中已消失 {5} 个；字幕 {6} 条（孤立 {7} 条）": "✓ {0}: {1} ファイル / {2} TB / 所要時間 {3}s、未登録の付属ファイル {4} 件、一覧から消えたもの {5} 件、字幕 {6} 件（孤立 {7} 件）",
	"✗ {0} 不在任何媒体来源已配置的目录下": "✗ {0} はどのメディアソースの設定済みディレクトリにもありません",
	"✗ {0} 不在任何已配置的前缀下；已知：{1}": "✗ {0} はどの設定済みプレフィックスにも該当しません。既知：{1}",
	"✗ {0} 不在来源 {1} 的挂载点 {2} 之下": "✗ {0} はソース {1} のマウントポイント {2} の配下にありません",
	"✗ 云端路径在前缀之后没有内容": "✗ クラウドのパスにプレフィックス以降の内容がありません",
	"✗ 云端路径就是前缀本身，没有文件": "✗ クラウドのパスがプレフィックスそのもので、ファイルがありません",
	"✗ 云端路径里有不能接受的层级：{0}": "✗ クラウドのパスに受け付けられない階層があります：{0}",
	"✗ 云端通道没有打开": "✗ クラウド接続が開いていません",
	"✗ 媒体来源 {0} 未配置本机目录，无法转换 {1} 的路径；请先在 [media.mounts] 中配置媒体目录": "✗ メディアソース {0} にローカルディレクトリが設定されていないため、{1} のパスを変換できません。先に [media.mounts] でメディアディレクトリを設定してください",
	"✗ 媒体来源 {0} 的第 {1} 个数据库路径前缀没有对应的本机目录；请先在 [media.mounts] 中按相同顺序配置媒体目录": "✗ メディアソース {0} の {1} 番目のデータベースパスプレフィックスに対応するローカルディレクトリがありません。先に [media.mounts] で同じ順序でメディアディレクトリを設定してください",
	"✗ 扫描目录与媒体来源不一致：{0} 的数据库路径前缀是 {1}，但要扫的是 {2}": "✗ スキャン対象のディレクトリとメディアソースが一致しません：{0} のデータベースパスプレフィックスは {1} ですが、スキャン対象は {2} です",
	"✗ 未声明的来源 {0}；[media.locations] 里已知：{1}": "✗ 未宣言のソース {0}。[media.locations] の既知のソース：{1}",
	"✗ 请求里没有云端路径": "✗ リクエストにクラウドのパスがありません",
	"、下载资料并生成视频预览": "、情報のダウンロードと動画プレビューの生成",
	"。可在下方调整搜索优先项；完整度与水印需要逐条复核。": "。下で検索の優先項目を調整できます。完全性と透かしは 1 件ずつ確認が必要です。",
	"。同名命中不构成唯一身份依据。": "。同名の一致だけでは、一意な身元の根拠になりません。",
	"。和": "。と",
	"「{0}+编号+出演者」": "「{0}+番号+出演者」",
	"「{0}」写不成站上的编码": "「{0}」はサイトの文字コードで表記できません",
	"「{0}」将成为这份档案显示的名称，「{1}」留作别名。作品上的署名、搜索和标签都会跟着改写。": "「{0}」がこのプロフィールの表示名になり、「{1}」は別名として残ります。作品のクレジット、検索、タグもあわせて書き換えられます。",
	"「{0}」归入「{1}」": "「{0}」を「{1}」に統合",
	"「{0}」收录成的中文标签": "「{0}」から登録した中国語タグ",
	"「{0}」的目录规则将被移除，并撤回这条规则建立的关联。": "「{0}」のフォルダルールを削除し、このルールで作成された関連付けを元に戻します。",
	"「{0}」连续 {1} 次没有拿到有效值。": "「{0}」で {1} 回連続して有効な値を取得できませんでした。",
	"「准备中」占位图": "「準備中」のプレースホルダー画像",
	"「出演者组合-编号-标题」": "「出演者の組み合わせ-番号-タイトル」",
	お掃除: "お掃除",
	このAV女優の名前教えてwiki: "このAV女優の名前教えてwiki",
	このアカウントは存在しません: "このアカウントは存在しません",
	アカウントは凍結: "アカウントは凍結",
	デビュー作品: "デビュー作品",
	一本道: "一本道",
	一次性称呼: "一回限りの呼び名",
	"一次最多回写 {0} 张": "一度に書き戻せるのは最大 {0} 枚です",
	"一次最多解析 {0} 行，收到 {1} 行": "一度に解析できるのは最大 {0} 行ですが、{1} 行を受け取りました",
	丁香: "ライラック",
	万: "万",
	上一个视频: "前の動画",
	上一张: "前へ",
	上一张图片: "前の画像",
	"上一次 Tunnel 没有正常收尾，运行结果未取得": "前回の Tunnel は正常に終了しなかったため、実行結果未取得",
	上一页: "前のページ",
	上一项媒体: "前のメディア",
	上传数据预览: "アップロードデータのプレビュー",
	"上传服务未配置。": "アップロードサービスが設定されていません。",
	"上传版本、系统信息、故障类型、代码位置与发生次数。": "バージョン、システム情報、障害の種類、コードの位置、発生回数をアップロードします。",
	上传馆藏与口味明细: "コレクションと好みの詳細をアップロード",
	上次拉取: "前回の取得",
	上次新增: "前回の追加",
	上次查询未命中: "前回の検索では該当なし",
	上次检查: "前回のチェック",
	上次解析成功: "前回の解析成功",
	上游把媒体重定向到了不受信任的地址: "アップストリームがメディアを信頼できないアドレスにリダイレクトしました",
	上游最新版本: "アップストリームの最新バージョン",
	"上游返回 HTTP {0}": "アップストリームが HTTP {0} を返しました",
	上游重定向次数过多: "アップストリームのリダイレクト回数が多すぎます",
	上移: "上へ移動",
	"上移 {0}": "{0} を上へ移動",
	上限: "上限",
	下一个视频: "次の動画",
	下一张: "次へ",
	下一张图片: "次の画像",
	下一页: "次のページ",
	下一项媒体: "次のメディア",
	下移: "下へ移動",
	"下移 {0}": "{0} を下へ移動",
	下载: "ダウンロード",
	"下载 FFmpeg": "FFmpeg をダウンロード",
	"下载 M3U 播放列表": "M3U プレイリストをダウンロード",
	"下载 untrunc": "untrunc をダウンロード",
	"下载 {0}": "{0} をダウンロード",
	"下载 → 校验 → 解压 → 准备安装 ·": "ダウンロード → 検証 → 展開 → インストール準備 ·",
	"下载 → 校验 → 解压 → 准备安装 · {0}": "ダウンロード → 検証 → 展開 → インストール準備 · {0}",
	下载任务没有落地路径: "ダウンロードタスクに保存先パスがありません",
	下载体积与发布记录不符: "ダウンロードサイズがリリース記録と一致しません",
	下载内容: "ダウンロード内容",
	下载到: "ダウンロード先",
	"下载到 {0}": "{0} にダウンロード",
	下载到本地: "ローカルにダウンロード",
	"下载完成后在这里确认重启安装。": "ダウンロード完了後、ここで再起動してインストールを確定します。",
	下载完整预览: "完全なプレビューをダウンロード",
	"下载已入库：{0}": "ダウンロードを取り込みました：{0}",
	下载并安装: "ダウンロードしてインストール",
	下载渠道: "ダウンロードチャネル",
	下载渠道设置: "ダウンロードチャネル設定",
	下载诊断报告: "診断レポートをダウンロード",
	下载配置未取得: "ダウンロード構成は未取得",
	"不一致 {0}": "不一致 {0}",
	不可通过: "承認不可",
	不合口味: "好みに合わない",
	"不合口味 · 降低推荐权重": "好みに合わない · おすすめの重みを下げる",
	"不同 FC2 账号使用相同卖家名称": "異なる FC2 アカウントが同じ販売者名を使用しています",
	不喜欢: "好きではない",
	不在来源根内: "ソースルート内にありません",
	不在正片所在目录: "本編と同じディレクトリにありません",
	不想看: "見たくない",
	"不想看 {0}": "{0} を見たくない",
	"不支持的图片格式：{0}": "サポートされていない画像形式：{0}",
	不支持的收藏操作: "サポートされていないお気に入り操作です",
	不支持的目录规则操作: "サポートされていないディレクトリルール操作です",
	不支持这个官方头像来源: "この公式アバターのソースには対応していません",
	不支持这个社交资料: "この SNS プロフィールには対応していません",
	不收: "対象外",
	不是内容: "内容ではない",
	"不是受归属保护的真相字段：{0}": "帰属保護の対象となる真相フィールドではありません：{0}",
	不是垃圾: "スパムではない",
	"不查：JAV 目录站里没有她": "検索しない：JAV データベースサイトに彼女はいません",
	不能修改这个文件: "このファイルは変更できません",
	不能合并到同一份档案: "同じプロフィールには統合できません",
	不能覆盖已复核断言: "レビュー済みの断定は上書きできません",
	不能连接: "接続できません",
	"不认识 {0}。当前支持": "{0} は認識できません。対応サイト：",
	"不认识的云下载渠道：{0}": "不明なクラウドダウンロードの経路：{0}",
	"不认识的占位符 `{{0}}`；可用的是": "不明なプレースホルダー `{{0}}`。使用できるのは",
	"不认识的来源：{0}": "不明なソース：{0}",
	"不足 4 分钟": "4 分未満",
	"不迁移：{0}": "マイグレーションなし：{0}",
	不限: "制限なし",
	不限时间: "期間指定なし",
	不需要: "不要",
	不需要凭据: "認証情報は不要",
	"与 performer-{0} 的头像内容完全相同": "performer-{0} のアバターと内容が完全に同一です",
	与你的馆藏和观看分布接近: "あなたのコレクションと視聴の傾向に近い",
	"与出演者姓名或别名一致，尚无卖主身份或同人确认": "出演者の名前または別名と一致しますが、販売者の身元や同一人物であることの確認はまだありません",
	"与第 {0} 轮（{1}触发）冲突，本次跳过": "第 {0} 回（{1}による実行）と競合するため、今回はスキップします",
	丝带: "リボン",
	两侧一致: "両側が一致",
	两侧都没有数据库: "どちらにもデータベースがありません",
	两次输入的密码不一致: "2 回入力したパスワードが一致しません",
	两站都没有作品一览: "両サイトとも作品一覧がありません",
	个: "個",
	个人: "個人",
	个人分类: "個人カテゴリ",
	个作品: "本の作品",
	个作品有内部行为证据: "本の作品に内部の行動記録あり",
	个作品有播放记录: "本の作品に再生履歴あり",
	个卷已取得容量: "個のボリュームで容量を取得済み",
	个厂牌: "件のメーカー",
	个媒体: "件のメディア",
	个条目: "件の項目",
	个来源: "件のソース",
	个视频: "本の動画",
	个订阅源: "件の購読ソース",
	中: "中",
	"中国移动宽带直连 DMM 图片主机常在握手后被断开，请把 DMM / FANZA 的连接方式设成 Peach 代理。": "中国移動のブロードバンドから DMM の画像ホストへ直接接続すると、ハンドシェイク後に切断されることがよくあります。DMM / FANZA の接続方法を Peach プロキシに設定してください。",
	中字: "中国語字幕",
	中文: "中国語",
	中文字幕: "中国語字幕",
	中文字幕文件不存在: "中国語字幕ファイルが存在しません",
	"中文字幕由 SubtitleCat 提供，可能包含机翻": "中国語字幕は SubtitleCat 提供で、機械翻訳を含む場合があります",
	中文标签: "中国語タグ",
	"中文（简体）": "中文（简体）",
	"中片-10分内": "中編-10分以内",
	临时写入与清理通过: "一時書き込みとクリーンアップのテストに合格",
	"临时远程链接已停止；设置文件未能写入，请在本机检查设置文件。": "一時リモートリンクを停止しました。設定ファイルを書き込めなかったため、このマシンで設定ファイルを確認してください。",
	临时链接: "一時リンク",
	"临时预览用，地址随机，重启后会变。启动前要先设置访问密码。": "一時的なプレビュー用です。アドレスはランダムで、再起動すると変わります。起動前にアクセスパスワードを設定してください。",
	"为什么喜欢？": "好きな理由は？",
	为你推荐: "あなたへのおすすめ",
	"为本地视频生成九宫格与时间轴预览；关闭后仍按入库规则探测时长与分辨率。": "ローカル動画のサムネイルシートとタイムラインプレビューを生成します。オフにしても、取り込みルールに従って再生時間と解像度は検出されます。",
	主界面宿主缺失: "メイン画面のホストがありません",
	主要口味维度: "主な好みの軸",
	主要站点: "主なサイト",
	主题: "テーマ",
	"书签 JSON 含无效文件夹": "ブックマーク JSON に無効なフォルダが含まれています",
	"书签 JSON 含无效节点": "ブックマーク JSON に無効なノードが含まれています",
	"书签 JSON 缺少 Chromium roots": "ブックマーク JSON に Chromium roots がありません",
	"书签 {0}": "ブックマーク {0}",
	"书签文件未取得，请检查文件格式后重新导入": "ブックマークファイルを取得できませんでした。ファイル形式を確認してから再度インポートしてください",
	"书签文件超过 64 MB": "ブックマークファイルが 64 MB を超えています",
	乳: "乳",
	乳系: "乳系",
	事务所: "事務所",
	云下载: "クラウドダウンロード",
	云下载任务尚未入库: "クラウドダウンロードのタスクはまだ取り込まれていません",
	云下载只在允许修改数据库的设备上可用: "クラウドダウンロードは、データベースの変更が許可されたデバイスでのみ利用できます",
	"云下载只在允许修改数据库的设备上可用。": "クラウドダウンロードは、データベースの変更が許可されたデバイスでのみ利用できます。",
	云下载后处理: "クラウドダウンロードの後処理",
	云下载后处理任务编号无效: "クラウドダウンロード後処理のタスク番号が無効です",
	云下载服务没有启用: "クラウドダウンロードサービスが有効になっていません",
	云下载没有启用: "クラウドダウンロードが有効になっていません",
	云下载进行中: "クラウドダウンロード実行中",
	云灰: "クラウドグレー",
	云端路径前缀: "クラウドパスのプレフィックス",
	"云端路径前缀 {0}": "クラウドパスのプレフィックス {0}",
	产地: "地域",
	亲密: "親密",
	人: "人",
	人工复核: "手動レビュー",
	"人机验证由本机浏览器自动完成；需要点击时窗口会弹出。这台机器上不需要 Cookie。": "CAPTCHA 認証はこのデバイスのブラウザで自動的に行われます。クリックが必要な場合はウィンドウが表示されます。このマシンでは Cookie は不要です。",
	人物: "人物",
	人物关系: "人物関係",
	人物名册: "人物名簿",
	人脸模型: "顔認識モデル",
	人脸比对模型: "顔照合モデル",
	亿: "億",
	仁王立ち: "仁王立ち",
	仅同步已入库影片: "取り込み済みの動画のみ同期",
	仅扫描文件: "ファイルのスキャンのみ",
	仅显示图片: "画像のみ表示",
	仅生成视频预览: "動画プレビューの生成のみ",
	仅监听本机: "このマシンのみで待ち受け",
	仅补全资料: "情報の補完のみ",
	仍在学习: "学習中",
	"仍无法读取 · 刷新": "まだ読み込めません · 更新",
	从低到高: "低い順",
	从多到少: "多い順",
	从大到小: "大きい順",
	从小到大: "小さい順",
	从少到多: "少ない順",
	从新到旧: "新しい順",
	从旧到新: "古い順",
	从本机选图片: "このデバイスから画像を選択",
	从此视频隐藏该标签: "この動画でこのタグを非表示",
	从短到长: "短い順",
	从近到远: "近い順",
	"从这台电脑的浏览器导入口味分析记录。": "このコンピューターのブラウザから好み分析用の記録をインポートします。",
	从远到近: "遠い順",
	从长到短: "長い順",
	从高到低: "高い順",
	代理地址: "プロキシアドレス",
	代理地址必须是文字: "プロキシアドレスは文字列にしてください",
	代理流量保护: "プロキシ通信量の保護",
	代理连接失败: "プロキシ接続に失敗しました",
	"代理连接失败，请检查 Peach 代理。": "プロキシ接続に失敗しました。Peach プロキシを確認してください。",
	"代码、完整测试和新托盘检查均已通过；正在安全替换并重启。": "コード、フルテスト、新しいトレイのチェックがすべて通過しました。安全に置き換えて再起動しています。",
	"代码与完整测试已通过。": "コードとフルテストが通過しました。",
	"代码与完整测试已通过；当前不是打包托盘，托盘进程需手动重开。": "コードとフルテストが通過しました。現在はパッケージ版のトレイではないため、トレイプロセスは手動で再起動してください。",
	"代码与测试已通过，但找不到当前托盘 EXE，未执行替换。": "コードとテストは通過しましたが、現在のトレイ EXE が見つからないため、置き換えを実行していません。",
	"代码与测试已通过，但新托盘构建失败；旧托盘和服务保持运行。": "コードとテストは通過しましたが、新しいトレイのビルドに失敗しました。旧トレイとサービスは実行を継続しています。",
	"代码已快进，但完整测试失败；服务与托盘均未重启，请查看日志。": "コードを fast-forward しましたが、フルテストに失敗しました。サービスとトレイはどちらも再起動していません。ログを確認してください。",
	"代码已快进，但找不到 PowerShell，未运行测试或重启服务。": "コードを fast-forward しましたが、PowerShell が見つからないため、テストの実行とサービスの再起動を行っていません。",
	"代表作画面，非本人": "代表作の画像（本人ではありません）",
	"以 / 开头的网盘路径": "/ で始まるクラウドストレージのパス",
	任务中心: "タスクセンター",
	"任务保护状态无效，请检查数据目录后重试。": "タスクの保護状態が無効です。データディレクトリを確認してから再試行してください。",
	"任务保护状态无法读取，请检查数据目录后重试。": "タスクの保護状態を読み込めません。データディレクトリを確認してから再試行してください。",
	任务列表: "タスク一覧",
	任务失败: "タスク失敗",
	任务失败记录未取得: "タスク失敗記録未取得",
	任务完成率: "タスク完了率",
	"任务将在安装完成后自动继续。": "タスクはインストール完了後に自動で再開されます。",
	"任务已变化，请刷新页面后重试": "タスクが変更されました。ページを再読み込みしてから再試行してください",
	"任务已暂停，安装完成后自动继续。": "タスクを一時停止しました。インストール完了後に自動で再開されます。",
	任务恢复标识无效: "タスクの再開 ID が無効です",
	"任务恢复记录无法读取，请重新发起任务。": "タスクの再開記録を読み込めません。タスクをもう一度開始してください。",
	"任务明细 · {0} 项": "タスクの詳細 · {0} 件",
	任务未能启动: "タスクを開始できませんでした",
	"任务未能自动恢复：{0}": "タスクを自動で再開できませんでした：{0}",
	任务状态: "タスクの状態",
	"任务状态 {0}": "タスクの状態 {0}",
	"任务状态已失效，请重新发起任务": "タスクの状態が無効になりました。タスクをもう一度開始してください",
	任务状态未取得: "タスクの状態未取得",
	任务详情: "タスクの詳細",
	任务进度: "タスクの進捗",
	休闲: "カジュアル",
	优先寻找: "優先して探す",
	"会登记到「{0}」名下": "「{0}」の名義で登録されます",
	"会登记到数据库里的「{0}」名下": "データベースの「{0}」の名義で登録されます",
	位: "人",
	位创作者: "人のクリエイター",
	位艺人: "人の出演者",
	低占用: "低負荷",
	低画质: "低画質",
	住在推广目录: "プロモーション用フォルダにある",
	体积: "サイズ",
	体积区间必须是字节数: "サイズの範囲はバイト数で指定してください",
	"体积区间须在 0 到 1 TiB 之间，下限不能大于上限": "サイズの範囲は 0～1 TiB で指定し、下限は上限以下にしてください",
	"体积差 {0}%": "サイズ差 {0}%",
	体积未取得: "サイズ未取得",
	作品: "作品",
	"作品 #{0}": "作品 #{0}",
	"作品 {0}": "作品 {0}",
	"作品 {0} 的販売者：{1}；账号 {2}": "作品 {0} の販売者：{1}、アカウント {2}",
	作品列表: "作品一覧",
	作品列表工具栏: "作品一覧ツールバー",
	作品列表未取得: "作品一覧は未取得",
	作品多的在前: "作品数の多い順",
	"作品存在多个发布者，需复核": "作品に複数の配信者がいるため、確認が必要です",
	作品封面: "作品カバー",
	"作品封面 {0}": "作品カバー {0}",
	作品推荐: "作品のおすすめ",
	作品显示: "作品の表示",
	作品未取得: "作品は未取得",
	作品来源: "作品のソース",
	作品来源给出不同卖家账号: "作品のソースごとに販売者アカウントが異なります",
	作品标识: "作品 ID",
	作品清单: "作品リスト",
	作品画面: "作品の画像",
	"作品画面 {0}（{1} 部互证）": "作品の画面 {0}（{1} 本で相互裏付け）",
	作品画面上没有能截的脸: "作品の画面に切り出せる顔がありません",
	"作品画面截到 {0} 张脸，凑不齐两部互证": "作品の画面から {0} 件の顔を切り出しましたが、2 本での相互裏付けには足りません",
	作品详情: "作品の詳細",
	"作品资料 {0} / {1} 部": "作品情報 {0} / {1} 本",
	作品资料未取得: "作品情報は未取得",
	"作品资料未取得，请稍后重试": "作品情報を取得できませんでした。しばらくしてから再試行してください",
	"作品资料来源暂时不可用，请稍后重试": "作品情報のソースが一時的に利用できません。しばらくしてから再試行してください",
	作品资料来源格式未识别: "作品情報のソースの形式を認識できません",
	作品资料站: "作品情報サイト",
	作品资料站点: "作品情報サイト",
	作品资料读取完成: "作品情報の読み込みが完了しました",
	作者: "作者",
	作者页存在: "作者ページあり",
	"使用你在 Cloudflare 绑定的固定域名。启动前要先设置访问密码。": "Cloudflare で設定した固定ドメインを使います。起動前にアクセスパスワードを設定してください。",
	使用已有数据目录: "既存のデータフォルダを使用",
	使用此目录: "このフォルダを使用",
	使用空间: "使用容量",
	依据: "根拠",
	侧栏光晕: "サイドバーのグロー",
	侧栏光晕参数: "サイドバーのグロー設定",
	保存: "保存",
	"保存 Mix 或新建列表后，会在这里按自己的顺序继续播放。": "Mix を保存するか新しいリストを作成すると、ここで自分の順番で続きを再生できます。",
	"保存 Mix，按自己的顺序继续播放。": "Mix を保存して、自分の順番で続きを再生します。",
	"保存{0}开关": "{0}のスイッチを保存",
	"保存中…": "保存中…",
	保存为播放列表: "プレイリストとして保存",
	保存别名: "別名を保存",
	保存到数据库: "データベースに保存",
	保存名称: "名前を保存",
	"保存后 Peach 会重启，并跳转到新地址。": "保存すると Peach が再起動し、新しいアドレスに移動します。",
	"保存后 Peach 会重新启动。": "保存すると Peach が再起動します。",
	保存后扫描并补全资料: "保存後にスキャンして情報を補完",
	"保存后，能连接到 Peach 的设备将直接访问馆藏。": "保存すると、Peach に接続できるデバイスから直接コレクションにアクセスできるようになります。",
	保存喜欢偏好: "好きな傾向を保存",
	"保存失败 · 请重试": "保存に失敗しました · 再試行してください",
	"保存密码，登录过期时自动重新登录": "パスワードを保存し、ログインの有効期限が切れたら自動で再ログインする",
	保存当前筛选: "現在の絞り込みを保存",
	保存待确认资料: "確認待ちの情報を保存",
	保存所选作品: "選択した作品を保存",
	"保存本机脱敏诊断包，无需启动 Peach 服务": "Peach サービスを起動せずに、このマシンでマスキング済みの診断パッケージを保存します",
	保存来源: "ソースを保存",
	保存的筛选: "保存した絞り込み",
	保存目录用途: "フォルダの用途を保存",
	保存配置: "構成を保存",
	保持登录: "ログイン状態を保持",
	保留: "残す",
	"保留 {0} 条未确认失效的链接。": "失効が未確認のリンク {0} 件を残します。",
	保留来源根目录: "ソースのルートフォルダを残す",
	保留独立来源的创作者关系: "独立したソースによるクリエイターとの関係を保持",
	修复: "修復",
	"修复 {0} · {1}": "修復 {0} · {1}",
	修复媒体库: "メディアライブラリを修復",
	"修复媒体库「{0}」": "メディアライブラリ「{0}」を修復",
	修复进度: "修復の進捗",
	"修好 {0} 部": "{0} 本を修復しました",
	"修好 {0} 部，{1} 部修不了": "{0} 本を修復しました。{1} 本は修復できません",
	修改内容必须是对象: "変更内容はオブジェクトにしてください",
	修改凭据: "認証情報を変更",
	"修缺时间戳表（播放卡顿）和缺索引（打不开）的 MP4。常看的片子先修。": "タイムスタンプ表の欠落（再生がカクつく）やインデックスの欠落（開けない）がある MP4 を修復します。よく見る動画から先に修復します。",
	個: "個",
	倒序: "逆順",
	候选: "候補",
	"候选仍含重复或未规范化的实体名，拒绝写入": "候補に重複または正規化されていないエンティティ名が含まれているため、書き込みを拒否しました",
	"候选封面完整下载或图片校验失败，未取得可保存的图片。": "候補カバーの完全なダウンロードまたは画像の検証に失敗し、保存できる画像を取得できませんでした。",
	"候选封面未通过检查。": "候補カバーがチェックに通りませんでした。",
	"候选封面未通过检查：图片未取得、无法解码或宽度不足 700px。": "候補カバーがチェックに通りませんでした：画像が未取得、デコード不可、または幅が 700px 未満です。",
	"候选没有作品页 URL，无法作为在线作品保存": "候補に作品ページの URL がないため、オンライン作品として保存できません",
	值得看看: "見る価値あり",
	"偏移超出 32 位，这个片源要 co64 才修得了": "オフセットが 32 ビットを超えています。このソースは co64 でないと修復できません",
	做种未取得: "シード数は未取得",
	停止: "停止",
	停止公网入口: "公開アクセスを停止",
	停止读取: "読み込みを停止",
	"停止读取 {0}": "{0} の読み込みを停止",
	停滞: "停滞",
	停用: "無効にする",
	健身: "フィットネス",
	元数据: "メタデータ",
	元数据字段: "メタデータフィールド",
	元数据接口返回: "メタデータ API の応答",
	元数据来源配置: "メタデータソースの構成",
	"先在「媒体库与入库」添加 PikPak 挂载文件夹。": "先に「メディアライブラリと取り込み」で PikPak のマウントフォルダを追加してください。",
	"先将 CloudDrive2 或 OpenList 中的网盘挂载为本机文件夹，再在这里选择。": "先に CloudDrive2 または OpenList でクラウドストレージをローカルフォルダとしてマウントしてから、ここで選択してください。",
	"先新建这个目录，或填写已有目录。": "先にこのフォルダを作成するか、既存のフォルダを入力してください。",
	先给它一个中文标签: "先に中国語タグを付けてください",
	先选一个产地: "先に地域を選択してください",
	先选一个媒体库: "先にメディアライブラリを選択してください",
	光晕: "グロー",
	光晕一: "グロー 1",
	光晕三: "グロー 3",
	光晕二: "グロー 2",
	光晕配色: "グローの配色",
	光鸭云盘: "光鸭云盘",
	兔女郎: "バニーガール",
	兔子先生: "兔子先生",
	"入库于 {0}": "{0} に取り込み",
	入库时间: "取り込み日時",
	全不选: "すべて選択解除",
	全屏: "全画面",
	全选: "すべて選択",
	"全选{0}": "{0}をすべて選択",
	全选已保存别名: "保存済みの別名をすべて選択",
	全选当前分类: "現在のカテゴリをすべて選択",
	全选待合并别名: "統合待ちの別名をすべて選択",
	全选本组: "このグループをすべて選択",
	全选本页: "このページをすべて選択",
	全选本页作品: "このページの作品をすべて選択",
	全选本页来源: "このページのソースをすべて選択",
	全速: "フルスピード",
	全部: "すべて",
	"全部优先 {0}": "すべて {0} を優先",
	全部作品: "すべての作品",
	全部保留最大: "すべて最大のものを残す",
	全部保留最长: "すべて最長のものを残す",
	全部关注作品: "フォロー中のすべての作品",
	全部关注图片: "フォロー中のすべての画像",
	全部分类: "すべてのカテゴリ",
	"全部合并（{0}）": "すべて統合（{0}）",
	全部媒体库: "すべてのメディアライブラリ",
	全部展开: "すべて展開",
	全部待复核: "すべてのレビュー待ち",
	全部忽略: "すべて無視",
	全部收起: "すべて折りたたむ",
	全部文件夹: "すべてのフォルダ",
	全部时间: "全期間",
	全部来源: "すべてのソース",
	全部标签: "すべてのタグ",
	全部标记已看: "すべて視聴済みにする",
	全部清除: "すべてクリア",
	全部照片: "すべての写真",
	"全部重试（{0}）": "すべて再試行（{0}）",
	"全部链接均可访问。": "すべてのリンクにアクセスできます。",
	全部页面都已显示: "すべてのページを表示しました",
	公司名称: "会社名",
	公司成立: "会社設立",
	公司类型: "会社の種類",
	公开主机名: "公開ホスト名",
	"公开主机名不是有效的域名：{0}": "公開ホスト名が有効なドメインではありません：{0}",
	"公开事实需要 HTTPS 来源": "公開情報には HTTPS のソースが必要です",
	"公开列表不需要登录；帖子详情被 FANBOX 验证页拦住时，可用浏览器会话取得正文、多图和外部资源链接。": "公開一覧はログイン不要です。投稿詳細が FANBOX の認証ページでブロックされた場合は、ブラウザセッションを使って本文、複数画像、外部リソースのリンクを取得できます。",
	"公开发行来源确认其为厂牌；作品不归属真人发布账号": "公開配信元のソースでメーカーと確認済み。作品は実在人物の配信アカウントに帰属しません",
	公开资料快照超过读取范围: "公開プロフィールのスナップショットが読み込み範囲を超えています",
	"公开身份来源未取得；已按页名直取": "公開身元ソース未取得。ページ名から直接取得しました",
	公开预告地址未识别: "公開予告編のアドレスを認識できません",
	公开预告字段未取得: "公開予告編フィールド未取得",
	公开预告格式未识别: "公開予告の形式を認識できません",
	公式サイト: "公式サイト",
	公网入口已停止: "公開アクセスを停止しました",
	公网入口已启动: "公開アクセスを開始しました",
	"公网入口的形态（二选一）": "公開アクセスの方式（いずれか一つ）",
	公网地址: "公開アドレス",
	兰粉: "ランピンク",
	兰紫: "ランパープル",
	"共享副本不存在，用本地副本播种": "共有コピーが存在しないため、ローカルコピーから初期化します",
	"共享副本已到第 {0} 代，本地仍是第 {1} 代且有未回写的改动": "共有コピーは第 {0} 世代に進んでいますが、ローカルはまだ第 {1} 世代で、書き戻していない変更があります",
	"共享副本所在的盘不可达，本地照常读写": "共有コピーのあるディスクに到達できません。ローカルでは通常どおり読み書きします",
	共享副本更新: "共有コピーの更新",
	"共享盘不在，只撤掉了本机这份。等盘回来要再撤一次，否则会被同步回来。": "共有ディスクがないため、このマシンの分だけ取り消しました。ディスクが戻ったらもう一度取り消してください。そうしないと同期で元に戻ります。",
	共同信号: "共通シグナル",
	"共同演员 {0}": "共演者 {0}",
	关注: "フォロー",
	"关注 · {0}": "フォロー · {0}",
	关注中的作者: "フォロー中の作者",
	关注作品: "フォロー中の作品",
	关注作者: "作者をフォロー",
	关注作者建档: "フォロー中の作者を登録",
	关注列表: "フォローリスト",
	关注列表分页: "フォローリストのページ送り",
	关注列表排序: "フォローリストの並べ替え",
	关注列表版式: "フォローリストのレイアウト",
	关注创作者: "フォロー中のクリエイター",
	关注图片: "フォロー中の画像",
	"关注条目 {0}": "フォロー項目 {0}",
	关注来源: "フォローソース",
	"关注来源及其检查状态会显示在这里。": "フォローソースとそのチェック状況がここに表示されます。",
	关注来源批量操作: "フォローソースの一括操作",
	关注来源查找: "フォローのソース検索",
	关注来源查找已停止: "フォローのソース検索を停止しました",
	关注标签: "フォロー中のタグ",
	关注检查已停止: "フォローのチェックを停止しました",
	关注概览: "フォローの概要",
	关注筛选: "フォローの絞り込み",
	关注管理: "フォロー管理",
	关注管理区域: "フォロー管理エリア",
	关注采集: "フォロー収集",
	"关注里有同名作者 {0}": "フォロー中に同名の作者 {0} がいます",
	"关注页检查更新之后，这位创作者的新内容会出现在这里。": "フォローページで更新をチェックすると、このクリエイターの新しいコンテンツがここに表示されます。",
	关联名称: "関連名",
	"关联名称最多 200 个字符": "関連名は 200 文字以内にしてください",
	关联账号: "関連アカウント",
	关闭: "閉じる",
	关闭任务提示: "タスク通知を閉じる",
	关闭字幕: "字幕をオフ",
	关闭小窗: "ミニプレーヤーを閉じる",
	关闭我的收藏: "お気に入りを閉じる",
	关闭提示: "通知を閉じる",
	关闭文件夹目录: "フォルダツリーを閉じる",
	关闭浏览器添加: "ブラウザ追加を閉じる",
	关闭目录用途: "フォルダの用途を閉じる",
	关闭设置: "設定を閉じる",
	关闭访问密码: "アクセスパスワードを無効化",
	关闭访问密码前先勾选确认: "アクセスパスワードをオフにする前に確認にチェックを入れてください",
	"关闭访问密码时无需填写。": "アクセスパスワードを無効にする場合は入力不要です。",
	关闭资源面板: "リソースパネルを閉じる",
	"其中一个番号尚不在本地 ledger": "品番のいずれかがまだローカル台帳にありません",
	其他: "その他",
	其他内容: "その他のコンテンツ",
	其他创作者: "その他のクリエイター",
	其他已挂载网盘: "その他のマウント済みクラウドストレージ",
	"其他检查 · {0} 项": "その他のチェック · {0} 件",
	"其他浏览器：用": "その他のブラウザ：",
	其他网站: "その他のサイト",
	"其他设备打开这个地址时要加上上面的端口，例如 http://peach.local:8900。首次连接请允许 Windows 专用网络访问。": "他のデバイスからこのアドレスを開くときは上のポートを付けてください（例：http://peach.local:8900）。初回接続時は Windows のプライベートネットワークへのアクセスを許可してください。",
	"其余 {0}": "残り {0}",
	"其余 {0} 个网站": "ほか {0} サイト",
	"其余 {0} 位创作者": "ほか {0} 人のクリエイター",
	"其余 {0} 项": "ほか {0} 件",
	其它: "その他",
	其它文件: "その他のファイル",
	兼容字段属于用户或复核判断: "互換フィールドはユーザーまたはレビューの判断に属します",
	兽耳: "ケモミミ",
	内容不符: "内容が一致しません",
	内容创作者: "コンテンツクリエイター",
	"内容图片 {0}": "コンテンツ画像 {0}",
	内容显示: "コンテンツ表示",
	内容标签: "コンテンツタグ",
	内容标签覆盖: "コンテンツタグのカバー率",
	内嵌字幕: "内蔵字幕",
	内置站点: "組み込みサイト",
	"再加一个媒体目录（不加就直接回车）": "メディアフォルダをもう 1 つ追加（追加しない場合はそのまま Enter）",
	再点一次取消评分: "もう一度クリックすると評価を取り消します",
	"写 ledger 需要显式 confirm=True": "台帳への書き込みには明示的な confirm=True が必要です",
	写入: "書き込み",
	"写入后 ledger 校验失败：integrity={0} foreign_keys={1}": "書き込み後の台帳検証に失敗しました：integrity={0} foreign_keys={1}",
	"写入端复核响应缺少 {0}": "書き込み側のレビュー応答に {0} がありません",
	"写入端复核响应超过 8 MiB 上限": "書き込み側のレビュー応答が上限の 8 MiB を超えています",
	"写入端是 {0}，本机是只读端": "書き込み側は {0} で、このマシンは読み取り専用です",
	"写入端是 {0}；{1}": "書き込み側は {0}；{1}",
	"写入端暂时不可达，显示 {0} 的缓存": "書き込み側に一時的に接続できないため、{0} のキャッシュを表示しています",
	"写入端返回的不是 JSON 对象": "書き込み側が返したのは JSON オブジェクトではありません",
	"写入端返回的不是有效 JSON": "書き込み側が返したのは有効な JSON ではありません",
	写到原目录的副本大小不对: "元のフォルダに書き込んだコピーのサイズが正しくありません",
	写真: "グラビア",
	冰青: "アイスシアン",
	冲突: "競合",
	冷却截止: "クールダウン終了",
	准备中: "準備中",
	准备处理: "処理準備中",
	准备扫描文件: "ファイルのスキャン準備中",
	"准备浏览器快照：第 {0} / {1} 个资料": "ブラウザスナップショットの準備中：{0} / {1} 件目の資料",
	准备生成预览: "プレビュー生成の準備中",
	准备生成预览图: "プレビュー画像生成の準備中",
	准备读取配套图片: "付属画像の読み込み準備中",
	准备采集外部资料: "外部資料の収集準備中",
	准备采集资料: "資料の収集準備中",
	几组关注作者归一成同一个名字: "フォロー中の作者の複数グループを同じ名前に統合",
	凭据文件: "認証情報ファイル",
	凭据文件权限过宽: "認証情報ファイルの権限が広すぎます",
	凸起: "浮き上がり",
	凹陷: "くぼみ",
	出了点问题: "問題が発生しました",
	"出口 IP 已被站方封禁": "送信元 IP がサイト側でブロックされています",
	出演者: "出演者",
	"出演者、创作者、厂牌、系列、手动标签、年代与时长分组的收藏、喜欢、不喜欢、观看数量和评分分布（有编号作品与无编号条目分开），以及主动收藏的实体名称": "出演者、クリエイター、メーカー、シリーズ、手動タグ、年代・再生時間グループごとのお気に入り・好き・好きじゃない・視聴数と評価分布（品番ありの作品と品番なしの項目は別集計）、およびお気に入りに登録したエンティティ名",
	出演者偏好: "出演者の好み",
	出演者头像不存在: "出演者のアバターが存在しません",
	出演者迁移需要已取得的公开职业来源: "出演者の移行には取得済みの公開経歴ソースが必要です",
	出身地: "出身地",
	出道: "デビュー",
	分卷: "分割ファイル",
	分卷与版本: "分割ファイルとバージョン",
	分卷作品: "分割作品",
	分卷版: "分割版",
	"分布在 {0} 个女优、厂牌与系列": "{0} 件の女優・メーカー・シリーズにまたがっています",
	"分析浏览记录：已处理 {0} / {1} 条": "閲覧履歴を分析中：{0} / {1} 件処理済み",
	分析范围: "分析範囲",
	分片号: "分割番号",
	分钟: "分",
	"切换中…": "切り替え中…",
	切换为大图: "大きい表示に切り替え",
	切换为小图: "小さい表示に切り替え",
	切换分卷或版本: "分割ファイルまたはバージョンを切り替え",
	"切换到{0}": "{0}に切り替え",
	切换卡片密度: "カード密度を切り替え",
	"切换媒体类型、创作者、来源、时长或标签后再试。": "メディアの種類、クリエイター、ソース、再生時間、タグを変えてもう一度お試しください。",
	"切换媒体类型、状态、来源或标签后再试。": "メディアの種類、状態、ソース、タグを変えてもう一度お試しください。",
	"切换状态或来源筛选后再试。": "状態やソースの絞り込みを変えてもう一度お試しください。",
	切换视频: "動画を切り替え",
	"切换页面或重新打开后会再检查一次。": "ページを切り替えるか開き直すと、もう一度チェックします。",
	切片: "切り抜き",
	列表: "リスト",
	创作者: "クリエイター",
	"创作者 · 线索占比": "クリエイター · 手がかりの割合",
	创作者位是推广站域名: "クリエイター欄がプロモーションサイトのドメインです",
	创作者候选: "クリエイター候補",
	创作者偏好: "クリエイターの好み",
	"创作者关系已发生后续改动，拒绝回滚整批": "クリエイターの関係がその後変更されているため、一括ロールバックを拒否しました",
	"创作者关系已存在，拒绝回滚整批": "クリエイターの関係がすでに存在するため、一括ロールバックを拒否しました",
	创作者别名: "クリエイターの別名",
	创作者名以该词开头: "クリエイター名がこの語で始まる",
	创作者名包含该词: "クリエイター名にこの語を含む",
	创作者名称: "クリエイター名",
	创作者名精确匹配: "クリエイター名が完全一致",
	创作者头像: "クリエイターのアバター",
	创作者未取得: "クリエイター未取得",
	创作者标签: "クリエイタータグ",
	创作者线索来源: "クリエイター手がかりのソース",
	"创作者／账号": "クリエイター／アカウント",
	"初始化失败，退出码 {0}": "初期化に失敗しました。終了コード {0}",
	"删 ledger 行需要显式 confirm=True": "台帳の行を削除するには明示的な confirm=True が必要です",
	"删掉的内容会先到这里；确认不再需要后再清空。": "削除したものはまずここに移動します。不要であることを確認してから空にしてください。",
	删除: "削除",
	"删除 {0}": "{0} を削除",
	"删除 {0} 个关注来源": "{0} 件のフォローソースを削除",
	"删除 {0} 条失效链接": "{0} 件の無効なリンクを削除",
	"删除「{0}」后，采集将不再查询这个来源。": "「{0}」を削除すると、収集時にこのソースを照会しなくなります。",
	"删除前会逐条重验一次；此操作不可撤销。": "削除前に 1 件ずつ再検証します。この操作は元に戻せません。",
	"删除历史 {0}": "履歴 {0} を削除",
	删除失效链接: "無効なリンクを削除",
	删除所选来源: "選択したソースを削除",
	"删除所选（{0}）": "選択項目を削除（{0}）",
	删除播放列表: "プレイリストを削除",
	删除来源: "ソースを削除",
	删除标签: "タグを削除",
	"删除标签 {0}": "タグ {0} を削除",
	删除浏览器来源: "ブラウザソースを削除",
	"删除筛选{0}": "絞り込み{0}を削除",
	删除自定义来源: "カスタムソースを削除",
	"删除这个来源的已导入记录，原始文件保留。若浏览器仍启用，下次读取会再次导入。": "このソースから取り込んだ記録を削除します。元のファイルは残ります。ブラウザが有効なままだと、次回の読み取りで再び取り込まれます。",
	判定产地: "制作国を判定",
	別名: "別名",
	别名: "別名",
	别名不能为空: "別名は空にできません",
	"刮削或手动打标之后，这里会显示每个来源覆盖了多少视频。": "スクレイピングや手動タグ付けの後、各ソースがカバーしている動画の数がここに表示されます。",
	制服: "制服",
	"制服/角色扮演": "制服/コスプレ",
	"刷新 token 之后仍未通过认证": "トークンを更新しても認証に通りません",
	刷新挂载状态: "マウント状態を更新",
	刷新状态: "状態を更新",
	刷新评论: "コメントを更新",
	前往写入端复核: "書き込み側でレビュー",
	前往写入端管理关注: "書き込み側でフォローを管理",
	"前缀 {0} 对应的媒体根": "プレフィックス {0} に対応するメディアルート",
	"前缀 {0} 登记了不止一次": "プレフィックス {0} が複数回登録されています",
	"前进 {0} 秒": "{0} 秒進む",
	"剩余 {0}，总时长 {1}；点击显示已播放时间": "残り {0}、総再生時間 {1}。クリックで再生済み時間を表示",
	"加入 Peach": "Peach に追加",
	加入播放列表: "プレイリストに追加",
	加入稍后看: "あとで見るに追加",
	加载中: "読み込み中",
	"加载中…": "読み込み中…",
	"加载内容…": "コンテンツを読み込み中…",
	加载字幕文件: "字幕ファイルを読み込む",
	加载更多: "さらに読み込む",
	加载更早: "以前のものを読み込む",
	加载速度: "読み込み速度",
	动作预算已用尽: "アクション予算を使い切りました",
	动漫同人: "アニメ同人",
	动画: "アニメ",
	动画作者: "アニメ作者",
	"勾选她的演员卡；有碼与無碼两条记录都是她的话，两张都勾。": "彼女の出演者カードにチェックを入れてください。モザイクありと無修正の 2 件とも彼女の記録なら、両方にチェックします。",
	"勾选要加入的列表，或者填个名称新建一份。": "追加先のリストにチェックを入れるか、名前を入力して新しく作成してください。",
	包内版本与发布版本不符: "パッケージ内のバージョンがリリース版と一致しません",
	包含子文件夹: "サブフォルダを含める",
	"包里一条对上本机两位，可能是重复身份；合并不可逆，由人决定": "パッケージ内の 1 件がこのマシンの 2 人に一致します。重複した身元の可能性があります。統合は元に戻せないため、人が判断してください",
	"包里说的与本机不一致；本机这条不是种子写的，种子不动它": "パッケージの内容がこのマシンと一致しません。このマシンの記録はシードが書いたものではないため、シードは変更しません",
	匹配资产: "アセットを照合",
	"匿名处理后上传馆藏与各类偏好明细。": "匿名化したうえで、コレクションと各種好みの明細をアップロードします。",
	匿名用户: "匿名ユーザー",
	匿名评论等价标记只作候选: "匿名コメントの同等マークは候補扱いのみです",
	升序: "昇順",
	升级: "アップグレード",
	"升级模式只重探不超过此宽度的已有封套；0 表示全部": "アップグレードモードでは、この幅以下の既存カバーだけを再探索します。0 はすべて",
	单一来源: "単一ソース",
	"单人作品 {0} {1}": "単体作品 {0} {1}",
	单人合集: "単体総集編",
	卖家: "販売者",
	"卖家 {0}": "販売者 {0}",
	卖家作品计划已过期: "販売者の作品計画が期限切れです",
	卖家批次需要明确来源前缀: "販売者バッチには明確なソースプレフィックスが必要です",
	卖家账号与已合并出演身份冲突: "販売者アカウントが統合済みの出演者身元と競合しています",
	卖家身份计划已过期: "販売者の身元計画が期限切れです",
	"卖家身份计划已过期：摄取认到另一个账号": "販売者の身元計画が期限切れです：取り込みで別のアカウントと判定されました",
	"卖家身份计划已过期：账号已绑定另一个 FC2 账号": "販売者の身元計画が期限切れです：アカウントは別の FC2 アカウントに紐付いています",
	博客: "ブログ",
	"占位符的 `{` 没有配对的 `}`": "プレースホルダの `{` に対応する `}` がありません",
	占用: "使用中",
	"占用 {0}": "使用量 {0}",
	占用多: "使用量が多い順",
	占用少: "使用量が少ない順",
	卡片: "カード",
	卧室: "寝室",
	"卸载 Peach": "Peach をアンインストール",
	"卸载未能启动：{0}": "アンインストールを開始できませんでした：{0}",
	"卸载目录与媒体目录重叠，请手动检查": "アンインストール先のフォルダがメディアフォルダと重なっています。手動で確認してください",
	"卸载移除 Peach 程序本身，原始媒体文件保留。": "アンインストールでは Peach 本体を削除します。元のメディアファイルは残ります。",
	厂牌: "メーカー",
	"厂牌 / 番号目录": "メーカー / 品番フォルダ",
	"厂牌 Logo": "メーカーロゴ",
	厂牌偏好: "メーカーの好み",
	"厂牌关系已发生后续改动，拒绝回滚整批": "メーカーの関係がその後変更されているため、一括ロールバックを拒否しました",
	厂牌分目录: "メーカー別フォルダ",
	厂牌发行文件完整署名: "メーカー配信ファイルの完全なクレジット",
	厂牌名无法生成存盘文件名: "メーカー名から保存用ファイル名を生成できません",
	"历史与书签 · {0} 个资料": "履歴とブックマーク · {0} 件のプロファイル",
	"历史文件正在使用，请退出该浏览器后添加": "履歴ファイルが使用中です。そのブラウザを終了してから追加してください",
	"历史文件正在使用，请退出该浏览器后重新读取": "履歴ファイルが使用中です。そのブラウザを終了してから読み込み直してください",
	压缩包: "アーカイブ",
	"原任务已变化，请刷新页面后重试": "元のタスクが変わりました。ページを更新して再試行してください",
	原因未记录: "理由は記録されていません",
	"原图未取回，先显示缩略图：上游拦下了这一次请求。": "元画像を取得できなかったため、サムネイルを表示しています。上流側が今回のリクエストをブロックしました。",
	原大小: "原寸",
	原标题: "原題",
	原样: "そのまま",
	原画: "オリジナル画質",
	原视频: "元の動画",
	去掉连字符: "ハイフンを除去",
	去看更新: "更新を見る",
	"去重后的作品编号，以及评分、喜欢、不喜欢、已看、稍后看、播放次数、观看比例与手动添加的标签": "重複を除いた作品番号、および評価・好き・好きじゃない・視聴済み・あとで見る・再生回数・視聴率と手動で追加したタグ",
	去馆藏评价作品: "コレクションで作品を評価",
	及本机同类历史耗时粗估: "およびこのマシンの同種の履歴所要時間からの概算",
	双洞齐下: "二穴同時",
	反差: "ギャップ萌え",
	"反差/泄密/探花": "ギャップ萌え/流出/探花",
	发布者: "投稿者",
	"发布者 {0}": "投稿者 {0}",
	发布账号: "投稿アカウント",
	发现: "発見",
	"发现 JAV": "JAV を探す",
	"发现 {0} 个新提交。为保护并行工作树，只检查、不自动安装。": "新しいコミットが {0} 件見つかりました。並行作業中のワークツリーを守るため、チェックのみ行い自動インストールはしません。",
	"发现更新不需要登录；只有取附件和 masked 下载链接才需要会话。": "更新の確認にログインは不要です。セッションが必要なのは添付ファイルと masked ダウンロードリンクの取得だけです。",
	发现筛选与排序: "発見の絞り込みと並べ替え",
	发现范围与标签: "発見の範囲とタグ",
	发行厂牌: "配信メーカー",
	发行商: "販売元",
	发行年: "発売年",
	发行年代偏好: "発売年代の好み",
	发行文件完整署名与公开出演者身份一致: "配信ファイルの完全なクレジットが公開出演者の身元と一致しています",
	发行日期: "発売日",
	"发行日期候选必须是 YYYY-MM-DD": "発売日の候補は YYYY-MM-DD 形式にしてください",
	发行日期候选无效: "発売日の候補が無効です",
	发行时间: "発売時期",
	"发送版本统计与错误诊断（推荐）": "バージョン統計とエラー診断を送信（推奨）",
	"发送至 Sentry。不上报错误原文、完整日志、诊断 ZIP、媒体名称、路径、网址、观看记录或凭据。接收服务会接触连接 IP；关闭后停止新发送，已发送的信息无法撤回。": "Sentry に送信します。エラー原文、完全なログ、診断 ZIP、メディア名、パス、URL、視聴履歴、認証情報は送信しません。受信側のサービスは接続元 IP を受け取ります。オフにすると以後の送信は止まりますが、送信済みの情報は取り消せません。",
	"取{0}失败：{1}": "{0}の取得に失敗しました：{1}",
	"取不到这个番号的封面：{0}": "この品番のカバーを取得できません：{0}",
	"取不到这张图：{0}": "この画像を取得できません：{0}",
	"取不到：{0}": "取得できません：{0}",
	取封面来框: "カバーから切り抜く",
	取得: "取得",
	取想要的资料: "ほしいものの資料を取得",
	"取文字检测模型失败：{0}": "文字検出モデルの取得に失敗しました：{0}",
	取新作资料: "新作の資料を取得",
	取消: "キャンセル",
	取消全选: "すべて選択解除",
	取消关注来源: "ソースのフォローを解除",
	取消喜欢: "いいねを取り消す",
	取消想要: "ほしいものから外す",
	取消收藏: "お気に入りから外す",
	"取消收藏{0}": "{0}をお気に入りから外す",
	取消离线任务: "オフラインタスクをキャンセル",
	取消订阅新作: "新作の購読を解除",
	"取消评分（当前 {0} 星）": "評価を取り消す（現在 {0} つ星）",
	取消选择: "選択を解除",
	取消静音: "ミュート解除",
	取过的图: "取得済みの画像",
	口交: "フェラ",
	口味: "好み",
	"口味 {0}": "好み {0}",
	口味与记录: "好みと記録",
	口味分析: "好み分析",
	口味分析已更新: "好み分析を更新しました",
	口味分析读取失败: "好み分析の読み込みに失敗しました",
	口味总结: "好みのまとめ",
	口味维度: "好みの観点",
	口味维度候选: "好みの観点の候補",
	口味维度排名: "好みの観点ランキング",
	口味网站访问: "好みサイトへのアクセス",
	口味证据来源: "好みの根拠ソース",
	口味读取已停止: "好みの読み込みを停止しました",
	口罩: "マスク",
	古紫: "古代紫",
	另一台机器: "別のマシン",
	"另一种写法，或另一个艺名": "別の表記、または別の芸名",
	"另外 {0} 个别名": "ほか {0} 件の別名",
	"另外 {0} 个标签": "ほか {0} 件のタグ",
	"另有 {0} 部对照作品": "ほかに比較対象の作品が {0} 本あります",
	另见: "関連項目",
	"另见 {0}": "関連項目 {0}",
	"只列出前 8 行，完整计划在计划 CSV 里。": "先頭 8 行のみ表示しています。計画の全体は計画 CSV にあります。",
	"只启动托盘，不打开网页": "トレイのみ起動し、Web ページは開かない",
	"只填域名，留空用默认地址": "ドメインのみ入力。空欄ならデフォルトのアドレスを使用",
	"只处理一个已归一化番号，用于定点重试": "正規化済みの品番 1 件だけを処理します（ピンポイントの再試行用）",
	"只抓指定来源的番号封套，例如 pikpak；封套仍按番号共享": "指定ソースの品番カバーだけを取得します（例：pikpak）。カバーは引き続き品番単位で共有されます",
	"只按成功日志中的原 URL 恢复缺失封套，不重新探测来源": "成功ログにある元の URL から欠けているカバーだけを復元し、ソースは再探索しません",
	"只接受 http(s) 链接": "http(s) リンクのみ受け付けます",
	"只接受指向公网的 https 地址": "インターネット上を指す https アドレスのみ受け付けます",
	"只有 candidate 状态的复核项可以批准": "承認できるのは candidate 状態のレビュー項目だけです",
	"只有 fanbox 帖子能按媒体取视频封面": "メディアから動画カバーを取得できるのは fanbox の投稿だけです",
	"只有历史目录投影；需账号、水印、发行来源或用户确认": "履歴フォルダからの投影しかありません。アカウント、透かし、配信ソース、またはユーザーの確認が必要です",
	只有待确认的资料字段可以批准: "承認できるのは確認待ちの資料フィールドだけです",
	只有这台电脑: "このパソコンのみ",
	只有通过图片质量检查的备选图片可以使用: "使用できるのは画質チェックに通過した候補画像だけです",
	"只用 fc2cmadb 已存证据抓 FC2 官方 CDN 封面": "fc2cmadb の既存の証拠だけを使って FC2 公式 CDN のカバーを取得します",
	"只登记首尾帧证据，不改资产": "最初と最後のフレームの証拠だけを登録し、アセットは変更しません",
	只能保存馆藏筛选: "保存できるのはコレクションの絞り込みだけです",
	只能接到在库的另一行: "接続できるのはライブラリ内の別の行だけです",
	只能接回已消失的行: "接続し直せるのは消えた行だけです",
	"只记录识别依据，不修改影片资料": "判定根拠だけを記録し、動画の資料は変更しません",
	只读: "読み取り専用",
	"只读输出封面数量、缺失、损坏和尺寸分布，不联网不写文件": "カバーの数、欠落、破損、サイズ分布を読み取り専用で出力します。ネット接続やファイル書き込みはしません",
	可不填: "任意",
	"可以回到列表挑选其他作品。": "リストに戻って別の作品を選べます。",
	"可以查找番号，或更新关注来源。": "品番を検索するか、フォローソースを更新できます。",
	可信度中等: "信頼度：中",
	可信度较高: "信頼度：高め",
	"可切换分类查看其他待确认资料。": "カテゴリを切り替えると、ほかの確認待ちの情報を表示できます。",
	"可回收 {0}": "回収可能 {0}",
	可清理的缓存: "クリーンアップできるキャッシュ",
	可滚动内容: "スクロール可能なコンテンツ",
	可用: "使用可能",
	"可用 {0} · 共 {1}": "空き {0} · 全体 {1}",
	可用候选完整下载都失败: "使用可能な候補はすべて完全ダウンロードに失敗しました",
	可访问: "アクセス可能",
	可读取: "読み取り可能",
	可连接: "接続可能",
	可选: "任意",
	"可选分组的 `[` 没有配对的 `]`": "任意グループの `[` に対応する `]` がありません",
	"可选分组的 `]` 没有配对的 `[`": "任意グループの `]` に対応する `[` がありません",
	可选图标: "選択できるアイコン",
	可配置凭据: "設定可能な認証情報",
	叶绿: "リーフグリーン",
	合并: "統合",
	合并全部创作者别名: "クリエイターの別名をすべて統合",
	合并全部别名: "別名をすべて統合",
	合并分卷与版本: "分割ファイルとバージョンを統合",
	"合并实体 {0} 进 {1} 后外键校验有 {2} 条违规": "エンティティ {0} を {1} に統合した後、外部キー検証で {2} 件の違反があります",
	合并所选创作者别名: "選択したクリエイターの別名を統合",
	合并所选别名: "選択した別名を統合",
	"合并所选（{0}）": "選択項目を統合（{0}）",
	"合并目标档案 {0} 不存在": "統合先のプロフィール {0} が存在しません",
	合集目录: "総集編フォルダ",
	"合集，{0} 个分片各自独立；封面不下发，分片回落到自己的缩略图": "総集編。{0} 個の分割はそれぞれ独立しています。カバーは配布されず、分割は各自のサムネイルを使います",
	同一世代的写入端标记不一致: "同じ世代で書き込み側のマークが一致しません",
	同一人: "同一人物",
	同一包同时断言与撤销同一事实: "同じパッケージが同じ事実の主張と取り消しを同時に含んでいます",
	同一名字键的来源分属几个实体: "同じ名前キーのソースが複数のエンティティに分かれています",
	同一名字键的来源已建档: "同じ名前キーのソースはすでに登録済みです",
	同一局域网的设备: "同じ LAN 内のデバイス",
	同一帧被输出了两次: "同じフレームが 2 回出力されました",
	同人: "同人",
	"同作品发行厂牌为 {0}，与创作者名称或其别名一致": "同作品の配信メーカーは {0} で、クリエイター名またはその別名と一致します",
	同出演者: "同じ出演者",
	同创作者: "同じクリエイター",
	同厂牌: "同じメーカー",
	同台艺人: "共演者",
	同名命中多个账号: "同名で複数のアカウントに一致しました",
	"同名对应不同 FC2 账号": "同名が別々の FC2 アカウントに対応しています",
	同意并开启上传: "同意してアップロードを有効化",
	"同时删除设置、本地数据库、观看记录、凭据和缓存": "設定、ローカルデータベース、視聴記録、認証情報、キャッシュも削除する",
	同时处理视频: "同時に処理する動画",
	同步删除: "削除を同期",
	同步媒体库: "メディアライブラリを同期",
	"同步文件与影片资料，按设置生成本地视频预览。下拉菜单可选择只扫描文件、同步已入库影片、生成预览或补全资料。": "ファイルと作品情報を同期し、設定に従ってローカルの動画プレビューを生成します。ドロップダウンから、ファイルのスキャンのみ、取り込み済み作品の同期、プレビュー生成、情報の補完を選べます。",
	同步方式: "同期方法",
	同步这些影片: "これらの作品を同期",
	同版本种子内容与已导入历史不同: "同じバージョンのシード内容がインポート済みの履歴と異なります",
	"同番号有 {0} 分完整版": "同じ品番に完全版が {0} 本あります",
	同番号短版本: "同品番の短縮版",
	同番号资产: "同じ品番のアセット",
	"同番号资产 {0} 条，超过单次批准上限 {1}": "同じ品番のアセットが {0} 件あり、1 回の承認上限 {1} を超えています",
	"同目录另有 {0} 个同类推广名": "同じフォルダに同種のプロモーション名がほかに {0} 個あります",
	"同目录已有一份留档：{0}": "同じフォルダにすでに保管用コピーがあります：{0}",
	同站另有更深的链接挂在它下面: "同じサイトのより深いリンクがこの下にあります",
	同系列: "同じシリーズ",
	名前: "名前",
	名字不是番号形态: "名前が品番の形式ではありません",
	名字与别名: "名前と別名",
	"名字像番号，但目录内没有同番号文件；可能是真实账号名": "名前は品番に見えますが、フォルダ内に同じ品番のファイルがありません。実在のアカウント名の可能性があります",
	"名字只能用字母、数字和连字符，不能以连字符开头或结尾": "名前には英字、数字、ハイフンのみ使用でき、ハイフンで始めたり終えたりできません",
	"名字可能拼错了，或者已经合并到别的名字下；回列表里重新找。": "名前のつづりが間違っているか、別の名前に統合された可能性があります。リストに戻って探し直してください。",
	"名字或 id 最长 {0} 个字符": "名前または id は最長 {0} 文字です",
	"名字是平台、目录或转载站": "名前がプラットフォーム、フォルダ、または転載サイトです",
	名称: "名前",
	名称与同作品的发行标题完全一致: "名前が同作品の配信タイトルと完全一致しています",
	"名称与带厂牌、发行日期的场景标题一致": "名前がメーカー・発売日付きのシーンタイトルと一致しています",
	"名称存在多个身份或不同写法，请使用资料页的规范名称": "名前に複数の身元または異なる表記があります。資料ページの正式名を使ってください",
	"名称是发行平台；实际卖主或账号才是创作者": "名前は配信プラットフォームです。実際の販売者またはアカウントがクリエイターです",
	名称是已核定的结构目录: "名前は確認済みの構造フォルダです",
	名称是转载站水印或站点日期目录: "名前は転載サイトの透かし、またはサイトの日付フォルダです",
	名義: "名義",
	后台任务: "バックグラウンドタスク",
	"后台任务正在运行，请完成后卸载": "バックグラウンドタスクが実行中です。完了してからアンインストールしてください",
	后台扫描失败: "バックグラウンドスキャンに失敗しました",
	后处理中: "後処理中",
	后处理失败: "後処理に失敗しました",
	后处理完成: "後処理が完了しました",
	"后继类型 {0} 已经登记过": "後継タイプ {0} はすでに登録されています",
	"后退 {0} 秒": "{0} 秒戻る",
	否: "いいえ",
	"含 WIP": "WIP を含む",
	启动: "起動",
	"启动公网 Tunnel 前必须先设置访问密码": "公開 Tunnel を起動する前にアクセスパスワードを設定してください",
	启动公网入口: "公開アクセスを開始",
	启动选项必须为开或关: "起動オプションはオンまたはオフにしてください",
	"启动项属于另一份 Peach 安装": "スタートアップ項目は別の Peach インストールのものです",
	"启动项未能保存，请检查当前用户的启动文件夹权限（PowerShell：{0}）": "スタートアップ項目を保存できませんでした。現在のユーザーのスタートアップフォルダの権限を確認してください（PowerShell：{0}）",
	启动项状态未取得: "スタートアップ項目の状態を取得できません",
	启用: "有効化",
	"启用 {0}": "{0} を有効化",
	"启用{0}": "{0}を有効化",
	启用并生成令牌: "有効化してトークンを生成",
	启用来源: "ソースを有効化",
	启用状态必须为布尔值: "有効状態はブール値にしてください",
	周一: "月曜日",
	周三: "水曜日",
	周二: "火曜日",
	周五: "金曜日",
	周六: "土曜日",
	周四: "木曜日",
	周日: "日曜日",
	命中: "一致",
	"命中 {0}": "一致 {0}",
	命令行: "コマンドライン",
	命名隧道: "名前付きトンネル",
	"命名隧道需要填写 Cloudflare 隧道令牌": "名前付きトンネルには Cloudflare トンネルトークンの入力が必要です",
	命名隧道需要填写公开主机名: "名前付きトンネルには公開ホスト名の入力が必要です",
	"和上面的 {0} 重复了": "上の {0} と重複しています",
	品牌启动: "ブランド開始",
	品红: "マゼンタ",
	哪一站都没对上她: "どのサイトでも彼女と一致しませんでした",
	商品资料格式未识别: "商品資料の形式を認識できません",
	商品身份未取得: "商品の身元を取得できません",
	喜欢: "いいね",
	"喜欢 · 记录口味偏好": "いいね · 好みを記録",
	喜欢与理由: "いいねと理由",
	喜欢所选项目: "選択項目にいいね",
	喜爱理由: "好きな理由",
	四〇四: "四〇四",
	回到关注: "フォローに戻る",
	回到起点: "最初に戻る",
	回包不是对象: "応答がオブジェクトではありません",
	回收站: "ゴミ箱",
	"回收站中的全部文件和馆藏记录将永久删除，无法恢复。": "ゴミ箱内のすべてのファイルとコレクションの記録が完全に削除され、復元できません。",
	回收站是空的: "ゴミ箱は空です",
	"回查 {0} 条": "{0} 件を再照会",
	回滚上一批: "直前のバッチを元に戻す",
	回滚上一批整理: "直前の整理バッチを元に戻す",
	回滚整理: "整理を元に戻す",
	回滚需要确认: "ロールバックには確認が必要です",
	固定比例: "比率を固定",
	国产: "中国産",
	"国家／地区": "国／地域",
	图太大了: "画像が大きすぎます",
	图太小: "画像が小さすぎます",
	图库: "ギャラリー",
	"图库 {0} 张彼此认不出同一个人": "ギャラリーの {0} 枚が互いに同一人物と認識できません",
	"图库 {0} 张认不准": "ギャラリーの {0} 枚では判定できません",
	"图库 {0} 张里比不出她": "ギャラリーの {0} 枚では彼女と照合できません",
	"图库 {0} 张，比对模型不可用：{1}": "ギャラリー {0} 枚、照合モデルが使用できません：{1}",
	图库命中: "ギャラリーの一致",
	"图库按名字存图，补充名字写法能找到更多备选图片；这里添加的名字也能设为统称。": "ギャラリーは名前ごとに画像を保存しているため、名前の表記を追加すると候補画像がより多く見つかります。ここで追加した名前は総称にも設定できます。",
	"图库索引 {0}没更新，新收的人像这里还查不到。": "ギャラリーのインデックスが {0}更新されていないため、新しく追加された人物画像はまだここで検索できません。",
	"图库索引还没取过，只能从用过的图里选。": "ギャラリーのインデックスをまだ取得していないため、使用済みの画像からのみ選べます。",
	图库那张太小: "ギャラリーのその画像が小さすぎます",
	图库里没有这个名字: "ギャラリーにこの名前はありません",
	图形字幕不能作为文本轨播放: "画像字幕はテキストトラックとして再生できません",
	"图形字幕，播放器里不显示": "画像字幕のため、プレーヤーには表示されません",
	图片: "画像",
	"图片 {0}": "画像 {0}",
	"图片内容与待确认记录不一致，无法使用": "画像の内容が確認待ちの記録と一致しないため、使用できません",
	图片取不到: "画像を取得できません",
	图片地址: "画像 URL",
	图片头请求失败: "画像のヘッダーリクエストに失敗しました",
	"图片宽度不足 700px": "画像の幅が 700px 未満です",
	"图片宽高必须是正整数：{0}×{1}": "画像の幅と高さは正の整数にしてください：{0}×{1}",
	图片布局: "画像レイアウト",
	图片无法解码: "画像をデコードできません",
	图片未取得: "画像未取得",
	图片来源不可用: "画像ソースを利用できません",
	"图片来源暂时不可用，请稍后重试": "画像ソースが一時的に利用できません。しばらくしてから再試行してください",
	图片浏览: "画像ビューア",
	图片详情: "画像の詳細",
	图集: "画像集",
	國產: "國產",
	"在 CloudDrive2「设置 → API 令牌」中生成": "CloudDrive2 の「設定 → API トークン」で生成",
	"在 Cloudflare Zero Trust 的隧道详情页复制。": "Cloudflare Zero Trust のトンネル詳細ページからコピーしてください。",
	"在 Peach 里播放或评价作品后，这里会列出对应的创作者。": "Peach で作品を再生または評価すると、該当するクリエイターがここに表示されます。",
	"在 Peach 里播放或评价作品后，这里会列出对应的女优。": "Peach で作品を再生または評価すると、該当する女優がここに表示されます。",
	"在 Peach 里播放或评价作品后，这里会列出对应的标签。": "Peach で作品を再生または評価すると、該当するタグがここに表示されます。",
	"在上面按女优名添加，或在人物页点「订阅新作」。": "上で女優名から追加するか、人物ページで「新作を購読」をクリックしてください。",
	"在媒体库设置中添加目录并扫描。": "メディアライブラリの設定でフォルダを追加してスキャンしてください。",
	在文件管理器里打开源文件所在目录: "ファイルマネージャーで元ファイルのフォルダを開く",
	在本机修复配置文件: "このマシンで構成ファイルを修復",
	在本机核对数据库迁移与备份: "このマシンでデータベースの移行とバックアップを確認",
	在本机检查访问密码配置: "このマシンでアクセスパスワードの構成を確認",
	在桌面创建快捷方式: "デスクトップにショートカットを作成",
	在活动页查看失败任务: "アクティビティページで失敗したタスクを確認",
	"在浏览器里完成验证后，回到这里再点一次「登录」。": "ブラウザで認証を完了したら、ここに戻ってもう一度「ログイン」をクリックしてください。",
	在用: "使用中",
	在线: "オンライン",
	"在线 · {0} 项更新": "オンライン · {0} 件の更新",
	在线作品: "オンライン作品",
	在线图片: "オンライン画像",
	在线图片未取得: "オンライン画像を取得できません",
	在线媒体类型: "オンラインのメディアの種類",
	在线搜索字幕: "字幕をオンライン検索",
	在线直接观看: "オンラインで直接視聴",
	"在线账号身份，不参与本地目录判定": "オンラインのアカウント身元のため、ローカルフォルダの判定には使いません",
	"在资料页或标签页收藏常用内容。": "プロフィールページやタグページで、よく使うものをお気に入りに追加しましょう。",
	在资源管理器中显示: "エクスプローラーで表示",
	"在运行 Peach 的电脑上使用浏览器：点上面的「读取浏览器记录」。": "Peach を実行している PC のブラウザを使う場合は、上の「ブラウザの記録を読み取る」をクリックしてください。",
	在配置中开启访问密码: "構成でアクセスパスワードを有効にする",
	"在馆藏页保存当前条件，随时打开。": "コレクションページで現在の条件を保存すると、いつでも開けます。",
	地址: "アドレス",
	地址已失效: "アドレスが無効になりました",
	"坏原件改名成同目录的隐藏文件（.文件名.peach-original）留着。": "壊れた元ファイルは同じフォルダの隠しファイル（.ファイル名.peach-original）に名前を変えて残します。",
	垃圾: "ジャンク",
	垃圾文件: "ジャンクファイル",
	垃圾文件分类: "ジャンクファイルの分類",
	"填 1（只有这台电脑）或 2（同一局域网的设备）": "1（このパソコンのみ）または 2（同じ LAN 内のデバイス）を入力してください",
	"填 y 或 n": "y または n を入力してください",
	"填写 HTTP 或 HTTPS API 地址；API key 单独填写，地址不带查询参数": "HTTP または HTTPS の API アドレスを入力してください。API key は別に入力し、アドレスにはクエリパラメータを付けません",
	"填写 Prowlarr 或 Jackett 提供的 Torznab 地址和 API key。": "Prowlarr または Jackett が提供する Torznab の URL と API key を入力してください。",
	"填写公开 JSON 接口和响应字段路径，例如 data.title。番号字段用于核对作品身份。": "公開 JSON API とレスポンスのフィールドパス（例：data.title）を入力してください。品番フィールドは作品の照合に使います。",
	填写凭据: "認証情報を入力",
	"填写规范创作者名和平台别名以添加。": "正式なクリエイター名とプラットフォーム上の別名を入力して追加してください。",
	"填写这台设备实际读取媒体的文件夹；Docker 部署填写容器内目录，例如 /media。": "このデバイスが実際にメディアを読み込むフォルダを入力してください。Docker で動かす場合はコンテナ内のフォルダを入力します（例：/media）。",
	增加对比度: "コントラストを上げる",
	墨灰: "スミグレー",
	墨紫: "スミパープル",
	墨绿: "ダークグリーン",
	处理任务已停止: "処理タスクを停止しました",
	"处理会读取媒体文件{0}，可能让电脑变慢。需要同时使用电脑时，可选择低占用模式。": "処理ではメディアファイルの読み込み{0}を行うため、PC が重くなることがあります。同時に PC を使う場合は、低負荷モードを選べます。",
	"处理出错（{0}）": "処理エラー（{0}）",
	处理动作无效: "処理アクションが無効です",
	处理完成: "処理完了",
	"处理建议：": "対処の提案：",
	"处理建议：{0}": "対処の提案：{0}",
	处理强度: "処理の強度",
	"处理未完成，请重试": "処理が完了しませんでした。再試行してください",
	处理模式: "処理モード",
	处理步骤: "処理ステップ",
	处理结束: "処理終了",
	"处理被中断。核对媒体目录后重试。": "処理が中断されました。メディアフォルダを確認してから再試行してください。",
	"处理被中断，可重试未完成的部分。": "処理が中断されました。未完了の部分を再試行できます。",
	"处理记录 ·": "処理記録 ·",
	"处理记录 · {0}": "処理記録 · {0}",
	处理较慢: "処理が遅め",
	处理速度: "処理速度",
	"处理速度：{0}": "処理速度：{0}",
	处理阶段无效: "処理段階が無効です",
	处理首次复核: "初回レビューを処理",
	备选头像: "候補アバター",
	复制专用令牌: "専用トークンをコピー",
	复制代码: "コードをコピー",
	"复制失败，请手动复制地址栏": "コピーに失敗しました。アドレスバーから手動でコピーしてください",
	"复制失败，请选中文本复制。": "コピーに失敗しました。テキストを選択してコピーしてください。",
	复制完整内容: "全文をコピー",
	复制当前时间的视频网址: "現在の再生位置付きで動画 URL をコピー",
	复制当前清单: "現在のリストをコピー",
	复制所选: "選択項目をコピー",
	复制磁力: "マグネットをコピー",
	复制视频网址: "動画 URL をコピー",
	复制配置: "構成をコピー",
	复制链接: "リンクをコピー",
	复核分类: "レビューのカテゴリ",
	复核分页: "レビューのページ送り",
	复核所选项目: "選択項目を確認",
	"复核批准 {0}": "レビュー承認 {0}",
	复核筛选: "レビューの絞り込み",
	复核资料: "情報を確認",
	复核队列读取失败: "レビューキューの読み込みに失敗しました",
	"复用 24 小时内核验过的本机封面（{0} × {1}），没有再向来源请求。": "24 時間以内に検証済みのこのマシンのカバー（{0} × {1}）を再利用し、ソースへは再リクエストしませんでした。",
	夕红: "夕焼けレッド",
	外挂字幕: "外部字幕",
	外观与导航: "外観とナビゲーション",
	外貌身材: "容姿・体型",
	"外部播放器 / VR": "外部プレーヤー / VR",
	外部文件页: "外部ファイルページ",
	外部来源: "外部ソース",
	"外部来源{0}，7 天内不再问。": "外部ソース{0}には、7 日間は再照会しません。",
	"外部来源没有这部片的封面，7 天内不再问": "外部ソースにこの作品のカバーがありません。7 日間は再問い合わせしません",
	"外部来源没有这部片的资料，7 天内不再问": "外部ソースにこの作品の資料がありません。7 日間は再問い合わせしません",
	外部资料在预算时间内未取得: "外部資料を予算時間内に取得できませんでした",
	"外部资料在预算时间内未取得，可稍后重试": "外部資料を予算時間内に取得できませんでした。後で再試行できます",
	"外部资料未取得：": "外部資料を取得できません：",
	"外部资料本趟没轮到：": "外部資料は今回の順番に回りませんでした：",
	多媒体: "マルチメディア",
	多版本作品: "複数バージョンの作品",
	多选模式: "複数選択モード",
	"多选（Ctrl 单项，Shift 连续）": "複数選択（Ctrl で個別、Shift で範囲）",
	夜昙: "夜月下美人",
	夜樱: "夜桜",
	夜紫: "ナイトパープル",
	夜色: "夜色",
	夜蓝: "ナイトブルー",
	大合集: "大型総集編",
	大图: "大きい表示",
	"大图 · 完整标识": "大きい表示 · ロゴ全体",
	"大图 · 竖幅头像": "大きい表示 · 縦長アバター",
	大小: "サイズ",
	大小未知: "サイズ不明",
	"大小（字节）": "サイズ（バイト）",
	天: "日",
	天蓝: "スカイブルー",
	失效链接清理: "リンク切れのクリーンアップ",
	失败: "失敗",
	头像刷新: "アバターの更新",
	女仆: "メイド",
	女优: "女優",
	女优名: "女優名",
	女优名不能为空: "女優名は空にできません",
	女优头像: "女優のアバター",
	"女优栏里不止一位列着她：": "女優欄に彼女が複数並んでいます：",
	女性: "女性",
	女王: "女王様",
	妄想族: "妄想族",
	姜黄: "ターメリック",
	媒体: "メディア",
	媒体与关注筛选: "メディアとフォローの絞り込み",
	媒体与标签: "メディアとタグ",
	媒体修复: "メディア修復",
	媒体修复已停止: "メディア修復を停止しました",
	媒体加载中: "メディアを読み込み中",
	媒体响应长度不完整: "メディア応答の長さが不完全です",
	媒体地址不在可代理的主机范围内: "メディアのアドレスがプロキシ可能なホストの範囲外です",
	"媒体工具准备失败：{0}": "メディアツールの準備に失敗しました：{0}",
	"媒体工具可执行，AV1 软件解码器可用": "メディアツールは実行可能で、AV1 ソフトウェアデコーダーが使用できます",
	媒体序号不存在: "メディア番号が存在しません",
	媒体库: "メディアライブラリ",
	媒体库与入库: "メディアライブラリと取り込み",
	媒体库与挂载: "メディアライブラリとマウント",
	媒体库名称: "メディアライブラリ名",
	"媒体库名称 {0}": "メディアライブラリ名 {0}",
	"媒体库名称请使用 1 到 80 个可见字符": "メディアライブラリ名は 1〜80 文字の表示可能な文字にしてください",
	"媒体库图标 {0}": "メディアライブラリのアイコン {0}",
	媒体挂载: "メディアのマウント",
	媒体文件不可访问: "メディアファイルにアクセスできません",
	"媒体时间刻度是 0": "メディアのタイムスケールが 0 です",
	"媒体未取回：上游这一次没有返回内容，多半是站点限流，过一阵再打开。": "メディアを取得できませんでした。上流側が今回は何も返さなかったため、サイトのレート制限の可能性が高いです。しばらくしてから開き直してください。",
	媒体未取得: "メディアを取得できません",
	"媒体未取得：{0}": "メディア未取得：{0}",
	"媒体未取得：需要 F95 登录会话解析": "メディア未取得：解析には F95 のログインセッションが必要です",
	媒体条目格式不符: "メディア項目の形式が一致しません",
	媒体来源: "メディアソース",
	"媒体来源 {0}": "メディアソース {0}",
	媒体来源不受支持: "メディアソースはサポートされていません",
	媒体来源格式不正确: "メディアソースの形式が正しくありません",
	媒体检查已停止: "メディアチェックを停止しました",
	媒体目录: "メディアフォルダ",
	"媒体目录 {0}": "メディアフォルダ {0}",
	媒体目录不能为空: "メディアフォルダは空にできません",
	媒体目录与另一行重复或互相包含: "メディアフォルダが別の行と重複しているか、互いに包含しています",
	媒体目录中的安装附件: "メディアフォルダ内のインストール付属物",
	媒体目录无法访问: "メディアフォルダにアクセスできません",
	"媒体目录无法访问 · {0}": "メディアフォルダにアクセスできません · {0}",
	"媒体目录无法访问，请检查目录、读取权限和网盘挂载状态": "メディアフォルダにアクセスできません。フォルダ、読み取り権限、クラウドストレージのマウント状態を確認してください",
	媒体目录路径: "メディアフォルダのパス",
	"媒体目录路径不能包含上级目录 ..": "メディアフォルダのパスに親フォルダ .. を含めることはできません",
	"媒体目录（必须已经存在，可以在外置硬盘上）": "メディアフォルダ（既存のものに限ります。外付けハードディスク上でもかまいません）",
	媒体类型: "メディアの種類",
	媒体缩略图: "メディアのサムネイル",
	媒体记录: "メディア記録",
	"媒体读取策略 {0}": "メディア読み取りポリシー {0}",
	媒体路径与另一文件夹重复或互相包含: "メディアのパスが別のフォルダと重複しているか、互いに包含しています",
	媒体需要来源登录会话: "メディアにはソースのログインセッションが必要です",
	嫩芽: "若芽",
	子文件夹: "サブフォルダ",
	孔雀: "ピーコック",
	字体: "フォント",
	字号: "文字サイズ",
	字幕: "字幕",
	字幕下载地址不受支持: "字幕のダウンロードアドレスはサポートされていません",
	字幕下载重定向次数过多: "字幕ダウンロードのリダイレクト回数が多すぎます",
	字幕加载失败: "字幕の読み込みに失敗しました",
	字幕加载已取消: "字幕の読み込みをキャンセルしました",
	"字幕加载超时，请重试": "字幕の読み込みがタイムアウトしました。再試行してください",
	"字幕响应超过 4 MiB": "字幕の応答が 4 MiB を超えています",
	字幕搜索失败: "字幕の検索に失敗しました",
	字幕文件中没有可播放的时间轴: "字幕ファイルに再生可能なタイムラインがありません",
	字幕文件未取得: "字幕ファイル未取得",
	"字幕文件超过 4 MiB": "字幕ファイルが 4 MiB を超えています",
	字幕时间轴无法读取: "字幕のタイムラインを読み取れません",
	字幕编号无效: "字幕番号が無効です",
	字幕选项: "字幕オプション",
	字段候选来源无效: "フィールド候補のソースが無効です",
	字段候选置信度无效: "フィールド候補の信頼度が無効です",
	字段候选置信度越界: "フィールド候補の信頼度が範囲外です",
	字段映射只接受对象键或数组下标组成的点路径: "フィールドマッピングにはオブジェクトのキーまたは配列のインデックスからなるドットパスのみ指定できます",
	字段缺失: "フィールドがありません",
	字母表: "アルファベット順",
	字符边缘样式: "文字の縁取りスタイル",
	"存在 URL 身份（如 pixiv 画师），不是发行目录": "URL による身元（pixiv の絵師など）があるため、配信フォルダではありません",
	存在已记录的任务失败: "記録済みのタスク失敗があります",
	存在待执行迁移: "未実行の移行があります",
	存疑: "要確認",
	孤儿记录: "孤立レコード",
	孤儿记录读取失败: "孤立レコードの読み込みに失敗しました",
	学生: "学生",
	安装: "インストール",
	"安装 Peach 用户脚本": "Peach ユーザースクリプトをインストール",
	"安装官方 cloudflared，或用设置文件的 tunnel.binary 与 PEACH_CLOUDFLARED 指定路径。": "公式の cloudflared をインストールするか、設定ファイルの tunnel.binary または PEACH_CLOUDFLARED でパスを指定してください。",
	安装教程: "インストールガイド",
	安装方式: "インストール方法",
	"安装预检未通过，程序与数据库未更改：{0}": "インストールの事前チェックに通りませんでした。プログラムとデータベースは変更していません：{0}",
	完全卸载: "完全にアンインストール",
	完成: "完了",
	"完成 Peach 的安装教程": "Peach のインストールガイドを完了",
	完成设置: "設定を完了",
	完成设置后: "設定完了後",
	完成设置后扫描并补全资料: "設定完了後にスキャンして情報を補完",
	"完成设置后扫描并补全资料：{0}": "設定完了後にスキャンして情報を補完：{0}",
	"完成设置后扫描这 {0} 个文件夹并补全资料": "設定完了後にこの {0} 個のフォルダをスキャンして情報を補完",
	完成首次扫描: "初回スキャンを完了",
	完成首次配置: "初期設定を完了",
	完整下载失败: "完全ダウンロードに失敗しました",
	完整图片尺寸与探测结果不一致: "完全な画像のサイズが探索結果と一致しません",
	完整封面: "完全なカバー",
	完整文件: "完全なファイル",
	"完整记录：": "完全なログ：",
	完整配置与调优说明: "構成とチューニングの詳しい説明",
	官方: "公式",
	官方与社区来源都没有这部片的封面: "公式・コミュニティどちらのソースにもこの作品のカバーがありません",
	官方候选都是动图: "公式の候補はすべてアニメーション画像です",
	官方图片主机都连不上: "公式の画像ホストにどれも接続できません",
	"官方完整目录未取得：": "公式の完全なフォルダを取得できません：",
	官方封面: "公式カバー",
	官方封面只有缩略图或占位图: "公式カバーはサムネイルかプレースホルダ画像しかありません",
	"官方封面地址只回「准备中」占位图，作品多半已从官方下架": "公式カバーのアドレスが「準備中」のプレースホルダ画像しか返しません。作品は公式から削除された可能性が高いです",
	官方封面地址都没有取到图片: "公式カバーのアドレスからどれも画像を取得できませんでした",
	"官方封面未取得：HTTP {0}": "公式カバーを取得できません：HTTP {0}",
	"官方封面未取得：接口没有返回有效资料": "公式カバーを取得できません：API が有効な資料を返しませんでした",
	"官方接口只接受同父改名或保留名称的移动；跨父改名须先拆成两步": "公式 API が受け付けるのは同じ親フォルダ内での名前変更か、名前を保ったままの移動だけです。親をまたぐ名前変更は 2 段階に分けてください",
	"官方接口拒绝或未执行移动，原件已确认留在原处": "公式 API が移動を拒否したか実行しませんでした。元のファイルが元の場所にあることは確認済みです",
	"官方改名只支持 A 盘内的同父目录": "公式の名前変更は A ドライブ内の同じ親フォルダでのみサポートしています",
	官方样张: "公式サンプル画像",
	官方渠道没有这个番号的封面: "公式チャネルにこの品番のカバーがありません",
	官方父目录未列出所需目录: "公式の親フォルダに必要なフォルダがありません",
	官方目录成员来自其他来源: "公式フォルダのメンバーが別のソースから来ています",
	官方目录成员超过预算: "公式フォルダのメンバーが予算を超えています",
	"官方目录成员越界、重名或体积无效": "公式フォルダのメンバーが範囲外、名前重複、またはサイズが無効です",
	"官方目录查询未完成，尚未取得封面候选": "公式フォルダの照会が完了していないため、カバー候補をまだ取得していません",
	"官方目录路径越出 A 盘或超过层级预算": "公式フォルダのパスが A ドライブの外に出ているか、階層の予算を超えています",
	"官方移动来源、父目录或文件名不符": "公式の移動元、親フォルダ、またはファイル名が一致しません",
	官方网站: "公式サイト",
	"官方视频预览未取得，请稍后重试": "公式の動画プレビューを取得できません。しばらくしてから再試行してください",
	官网: "公式サイト",
	"官网/事务所": "公式サイト/事務所",
	"官网{0}": "公式サイト{0}",
	定位源文件: "元ファイルの場所を表示",
	定时: "スケジュール",
	宝蓝: "ロイヤルブルー",
	实体不在或不是女优: "エンティティが存在しないか、女優ではありません",
	实体与身份锚点不一致: "エンティティと身元アンカーが一致しません",
	"实体分类来源冲突，需先复核": "エンティティの分類ソースが競合しています。先にレビューしてください",
	"实体有外部身份引用或用户判断，需逐项复核": "エンティティに外部の身元参照またはユーザー判断があります。1 件ずつレビューしてください",
	"审计计划与当前数据库不一致，请重新预览": "監査計画が現在のデータベースと一致しません。もう一度プレビューしてください",
	客户端导航装载失败: "クライアント側ナビゲーションの読み込みに失敗しました",
	容量未取得: "容量未取得",
	"密度：大图 / 密集": "密度：大きい表示 / 詰めて表示",
	密码: "パスワード",
	密码需要是文字: "パスワードは文字列にしてください",
	密集: "詰めて表示",
	"对照文件：{0}": "比較ファイル：{0}",
	"对账时出现未预期的错误，稍后再试": "照合中に予期しないエラーが発生しました。しばらくしてから再試行してください",
	寻找更好版本: "より良いバージョンを探す",
	"寻找高清、无水印或完整版": "高画質・透かしなし・完全版を探す",
	导入书签文件: "ブックマークファイルをインポート",
	导入初始资料: "初期資料をインポート",
	导入历史文件: "履歴ファイルをインポート",
	"导入失败（{0}）": "インポートに失敗しました（{0}）",
	"导入或读取浏览记录后，这里会列出已采集设备。": "閲覧履歴をインポートまたは読み取ると、収集済みのデバイスがここに表示されます。",
	导入文件: "ファイルをインポート",
	"导入文件 · {0} · {1} {2}": "インポートファイル · {0} · {1} {2}",
	导入浏览器历史记录: "ブラウザの閲覧履歴をインポート",
	"导出历史记录，再导入导出文件。": "履歴をエクスポートし、エクスポートしたファイルをインポートしてください。",
	导出文件为空: "エクスポートファイルが空です",
	"导出文件超过 1 GB": "エクスポートファイルが 1 GB を超えています",
	"导出需要更新的 version 与 revision": "エクスポートには新しい version と revision が必要です",
	导演: "監督",
	导航与筛选: "ナビゲーションと絞り込み",
	导航入口与顺序: "ナビゲーション項目と並び順",
	封面: "カバー",
	封面上没有能截的脸: "カバーに切り出せる顔がありません",
	封面人脸: "カバーの顔",
	"封面在预算时间内未取得，可稍后重试": "カバーを予算時間内に取得できませんでした。後で再試行できます",
	封面地址不可用: "カバーのアドレスを利用できません",
	"封面处理失败（{0}），未能完成比较；请查看服务日志。": "カバーの処理に失敗したため（{0}）、比較を完了できませんでした。サービスログを確認してください。",
	封面处理未完成: "カバーの処理が完了していません",
	"封面已在 /cover 缓存里，复核只是确认取得与否": "カバーはすでに /cover キャッシュにあります。確認は取得できたかどうかの確認だけです",
	封面截不出这一块: "カバーからこの部分を切り出せません",
	封面批量抓取: "カバー一括取得",
	封面未取得: "カバー未取得",
	"封面未取得：": "カバーを取得できません：",
	"封面本趟没轮到：": "カバーは今回の順番に回りませんでした：",
	封面连不上图片主机: "カバー画像のホストに接続できません",
	封面采集: "カバー収集",
	封面采集完成: "カバーの収集が完了しました",
	"将删除 {0} 条失效链接。删除前会再次检查，删除后无法恢复。": "無効なリンク {0} 件を削除します。削除前に再確認し、削除後は元に戻せません。",
	"将删除「{0}」这一条和它带的记录（{1}）。此操作不可撤销。": "「{0}」とその付随記録（{1}）を削除します。この操作は元に戻せません。",
	"将删除以下 {0} 条作品和它们带的全部记录。此操作不可撤销。": "以下の作品 {0} 件とその付随記録をすべて削除します。この操作は元に戻せません。",
	"将合并以下 {0} 组创作者：{1}。": "以下のクリエイター {0} 組を統合します：{1}。",
	"将处理选中的 {0} 个文件。": "選択した {0} 個のファイルを処理します。",
	"将处理选中的 {0} 项。{1}": "選択した {0} 件を処理します。{1}",
	"将处理选中的 {0} 项关注作品。": "選択したフォロー作品 {0} 件を処理します。",
	"将把 {0} 个重复文件的馆藏记录移入回收站，每组保留{1}。": "重複ファイル {0} 個のコレクション記録をゴミ箱に移動し、各グループで{1}を残します。",
	"将把上一批整理动过的文件退回整理前的名字与位置，数据库路径跟着退回。": "直前の整理で変更したファイルを整理前の名前と場所に戻し、データベースのパスも合わせて戻します。",
	"将把当前未看作品标记为已忽略。": "現在の未視聴作品を無視済みにします。",
	"将把当前未看作品标记为已看。": "現在の未視聴作品を視聴済みにします。",
	"将按这两份模板改动「{0}」上的文件名与目录，目标已存在的行会整行跳过。": "この 2 つのテンプレートで「{0}」上のファイル名とフォルダを変更します。移動先が既に存在する行はスキップされます。",
	将标为已消失: "消失扱いにします",
	"将永久删除文件已不在盘上的 {0} 条记录和 {1} 个空文件夹，": "ディスク上にファイルが存在しない記録 {0} 件と空フォルダ {1} 個を完全に削除し、",
	"将永久删除文件已不在盘上的 {0} 条记录（含回收站里的）、{1} 个空文件夹，": "ディスク上にファイルが存在しない記録 {0} 件（ゴミ箱内を含む）と空フォルダ {1} 個を完全に削除し、",
	"将清除这个来源在本机和共享副本中的登录凭据。": "このソースのログイン認証情報を、この端末と共有コピーから消去します。",
	"将移除以下 {0} 个别名，对应来源恢复为独立创作者组。": "以下の別名 {0} 件を削除し、対応するソースを独立したクリエイターグループに戻します。",
	"将移除别名「{0}」，对应来源恢复为独立创作者组。": "別名「{0}」を削除し、対応するソースを独立したクリエイターグループに戻します。",
	"将移除所选关注来源及其已抓取条目，媒体文件保留。": "選択したフォローソースと取得済みの項目を削除します。メディアファイルは残ります。",
	"将移除所选订阅源，之后不再拉取它们的新作；已经拉到的新作保留。": "選択した購読ソースを削除し、以降は新作を取得しません。取得済みの新作は残ります。",
	"将移除订阅源「{0}」，之后不再拉取它的新作；已经拉到的新作保留。": "購読ソース「{0}」を削除し、以降は新作を取得しません。取得済みの新作は残ります。",
	"将移除这个来源及已抓取的条目，媒体文件保留。": "このソースと取得済みの項目を削除します。メディアファイルは残ります。",
	"将退出 Peach 并移除程序、开机自启和桌面图标。设置、本地数据库、观看记录与缓存保留。": "Peach を終了し、プログラム、自動起動、デスクトップアイコンを削除します。設定、ローカルデータベース、視聴記録、キャッシュは残ります。",
	"将退出 Peach，移除程序、开机自启、桌面图标、设置、本地数据库、观看记录、凭据和缓存。原始媒体文件保留。": "Peach を終了し、プログラム、自動起動、デスクトップアイコン、設定、ローカルデータベース、視聴記録、認証情報、キャッシュを削除します。元のメディアファイルは残ります。",
	"小于 120 MB": "120 MB 未満",
	小写: "小文字",
	小图: "小サイズ",
	小型大写字母: "スモールキャピタル",
	小时: "時間",
	小窗播放: "ミニプレーヤー",
	尚无: "まだありません",
	尚无主维度: "主要な軸なし",
	尚无成功记录: "成功記録なし",
	"尚无检查或解析记录，可在来源和凭证中检查连接": "チェックや解析の記録はまだありません。ソースと認証情報で接続を確認できます",
	尚无观看印证: "視聴による裏付けはまだありません",
	尚无记录: "記録なし",
	尚未完成首次配置: "初期設定がまだ完了していません",
	尚未检查: "未確認",
	尚未添加媒体目录: "メディアフォルダが追加されていません",
	"尚未连接到 Peach，请检查托盘后刷新页面。": "Peach に接続できていません。トレイを確認してからページを再読み込みしてください。",
	"尚未配置下载渠道。": "ダウンロード方法が設定されていません。",
	尚未采集浏览记录: "閲覧履歴はまだ収集されていません",
	"尝试次数较多，请一分钟后重试": "試行回数が多すぎます。1 分後に再試行してください",
	尺寸: "サイズ",
	"尺寸变化：日志 {0}x{1}，当前 {2}x{3}": "サイズ変化：ログ {0}x{1}、現在 {2}x{3}",
	尺寸未知: "サイズ不明",
	尿道: "尿道",
	局域网: "LAN",
	局域网或公网入口未开启访问密码: "LAN またはインターネットの入口でアクセスパスワードが有効になっていません",
	局域网访问地址: "LAN のアクセスアドレス",
	"局域网访问地址（": "LAN のアクセスアドレス（",
	展会名录: "展示会の名簿",
	展开: "展開",
	"展开 {0}": "{0} を展開",
	展开任务详情: "タスクの詳細を展開",
	展开侧栏: "サイドバーを展開",
	展开全部: "すべて展開",
	展开到详情: "詳細を展開",
	"展开到详情：{0}": "詳細を展開：{0}",
	展开安装教程: "インストール手順を展開",
	展开完整标题: "タイトル全体を表示",
	展开导航与筛选: "ナビゲーションと絞り込みを展開",
	展开控件: "コントロールを展開",
	展开更多排名: "ランキングをさらに表示",
	展开标题: "タイトルを展開",
	工具: "ツール",
	工具包包含清单外的文件: "ツールキットにマニフェスト外のファイルが含まれています",
	工具清单路径无效: "ツールマニフェストのパスが無効です",
	工具清单路径越界或包含链接: "ツールマニフェストのパスが範囲外か、リンクを含んでいます",
	工具路径已找到: "ツールのパスが見つかりました",
	巨乳: "巨乳",
	"已{0} {1} 个关注来源": "{1} 件のフォローソースを{0}しました",
	"已{0} {1} 项": "{1} 件を{0}しました",
	已下载: "ダウンロード済み",
	"已为 {0} 个采集来源保存凭证。": "{0} 件の収集ソースの認証情報を保存しました。",
	"已于 {0} 年隐退": "{0} 年に引退",
	已保存: "保存しました",
	已保存为播放列表: "プレイリストとして保存しました",
	已保存创作者别名: "クリエイターの別名を保存しました",
	已保存别名: "別名を保存しました",
	已保存别名批量操作: "別名の一括操作を保存しました",
	已保存到数据库: "データベースに保存しました",
	已保存喜欢偏好: "お気に入りの設定を保存しました",
	已保存来源: "ソースを保存しました",
	已保存来源凭据: "ソースの認証情報を保存しました",
	"已保存目录用途{0}": "フォルダの用途を保存しました{0}",
	已保存索引器: "インデクサーを保存しました",
	已保存诊断选项: "診断オプションを保存しました",
	已保存配置: "構成を保存しました",
	已保存馆藏与口味上传选项: "コレクションと好みのアップロード設定を保存しました",
	已保存首次采集范围: "初回収集の範囲を保存しました",
	"已保存，留空不改": "保存済み。空欄のままなら変更しません",
	"已保存，留空不改。": "保存済み。空欄のままなら変更しません。",
	"已保存，留空保留": "保存済み。空欄のままなら現在の値を保持します",
	"已保存，留空表示不改": "保存済み。空欄は変更なしを意味します",
	"已保存，登录过期时自动重新登录": "保存済み。ログインの有効期限が切れると自動で再ログインします",
	"已停止临时远程链接：没有访问密码时不保留公网入口。": "一時リモートリンクを停止しました。アクセスパスワードがない場合、公開入口は残しません。",
	已停止读取: "読み取りを停止しました",
	已停止读取作品资料: "作品資料の読み込みを停止しました",
	已停用: "無効",
	已停用来源: "ソースを無効にしました",
	已入库: "取り込み済み",
	"已入库 {0} 个文件": "{0} 個のファイルを取り込みました",
	已关注: "フォロー中",
	"已关联现有下载：{0}": "既存のダウンロードに関連付けました：{0}",
	已关闭浏览器添加: "ブラウザからの追加をオフにしました",
	已关闭视频预览生成: "動画プレビューの生成をオフにしました",
	已关闭访问密码: "アクセスパスワードをオフにしました",
	已写入: "書き込み済み",
	"已删除 {0} 条；{1}": "{0} 件を削除しました。{1}",
	已删除播放列表: "プレイリストを削除しました",
	已删除来源: "ソースを削除しました",
	"已删除标签「{0}」": "タグ「{0}」を削除しました",
	"已判为{0}：{1} 项": "{0}と判定しました：{1} 件",
	"已判定的产地；打开同产地的作品": "判定済みの制作地。同じ制作地の作品を開きます",
	"已加入 {0} 个播放列表": "{0} 個のプレイリストに追加しました",
	已加入想要: "ほしいものに追加しました",
	"已加入想要：{0}": "ほしいものに追加しました：{0}",
	已加入稍后看: "あとで見るに追加しました",
	"已加载 {0}": "{0} を読み込みました",
	"已发现 {0} 个文件": "{0} 個のファイルを検出しました",
	已取消: "キャンセルしました",
	已取消不合口味: "「好みではない」を解除しました",
	已取消关注来源: "ソースのフォローを解除しました",
	已取消喜欢: "お気に入りを解除しました",
	已取消寻找更好版本: "より良い版の探索を解除しました",
	已取消想要: "ほしいものから外しました",
	已取消浏览器登录: "ブラウザでのログインをキャンセルしました",
	已取消看过: "視聴済みを解除しました",
	已取消订阅新作: "新作の購読を解除しました",
	已取消评分: "評価を取り消しました",
	已变: "変更あり",
	"已合并 {0} 组创作者别名": "{0} 組のクリエイター別名を統合しました",
	"已同步 {0} 个提交：{1} → {2}。": "{0} 件のコミットを同期しました：{1} → {2}。",
	已启用: "有効",
	"已启用 {0} 个来源。": "{0} 件のソースを有効にしました。",
	已启用来源: "ソースを有効にしました",
	"已在「{0}」名下": "「{0}」に登録済み",
	已在排队: "キューに追加済み",
	已在资源管理器中显示: "エクスプローラーで表示しました",
	已填入磁力: "マグネットを入力しました",
	已处理: "処理済み",
	"已处理 {0} / {1}": "{0} / {1} 件処理済み",
	"已处理 {0}/{1} 项。": "{0}/{1} 件を処理しました。",
	已复制: "コピーしました",
	"已复制 CloudDrive2 配置": "CloudDrive2 の構成をコピーしました",
	已复制专用令牌: "専用トークンをコピーしました",
	已复制当前时间的视频网址: "現在の再生位置付きの動画 URL をコピーしました",
	已复制清单: "リストをコピーしました",
	已复制磁力: "マグネットをコピーしました",
	已复制视频网址: "動画 URL をコピーしました",
	已复制链接: "リンクをコピーしました",
	已存在: "既に存在します",
	已安装: "インストール済み",
	已安装版本: "インストール済みバージョン",
	"已安装版本：": "インストール済みバージョン：",
	"已安装版本：{0}。amane（{1}）提供这些内置站点的解析能力。 重新安装会使用 Peach 内置的 {2} 版本，不随上游自动升级。": "インストール済みバージョン：{0}。amane（{1}）がこれらの組み込みサイトの解析機能を提供します。 再インストールすると Peach 同梱の {2} バージョンを使用し、上流に合わせた自動更新は行いません。",
	已完成: "完了",
	"已完成 {0} 项，{1} 项没有处理": "{0} 件完了、{1} 件は未処理です",
	"已完成：": "完了：",
	"已导入 {0} 份浏览器历史。": "{0} 件のブラウザ履歴をインポートしました。",
	已导入口味数据: "好みのデータをインポートしました",
	"已导入的历史与书签仍用于口味分析。": "インポート済みの履歴とブックマークは引き続き好みの分析に使われます。",
	已属另一条实体: "別のエンティティに属しています",
	"已应用 migration {0} 的 checksum 已变化": "適用済みの migration {0} の checksum が変わっています",
	已开启视频预览生成: "動画プレビューの生成をオンにしました",
	已开启访问密码: "アクセスパスワードを有効にしました",
	"已彻底删除 {0}": "{0} を完全に削除しました",
	"已彻底删除 {0} 条记录{1}": "{0} 件の記録を完全に削除しました{1}",
	已忽略: "無視済み",
	"已忽略 {0}": "{0} を無視しました",
	已恢复显示: "表示を再開しました",
	已恢复未看: "未視聴に戻しました",
	"已执行迁移 {0}，迁移前备份 {1}": "移行 {0} を実行しました。移行前のバックアップは {1} です",
	已扫描: "スキャン済み",
	"已扫描 {0} 个文件，识别 {1} 个番号，": "{0} 個のファイルをスキャンし、{1} 件の品番を識別、",
	"已扫描 {0}/{1} 个来源": "{0}/{1} 件のソースをスキャン済み",
	"已扫描但尚未补充发行资料的视频可在全部内容中查看。": "スキャン済みで発売情報が未補完の動画は「すべてのコンテンツ」で確認できます。",
	"已批量{0}：{1} 项": "一括で{0}しました：{1} 件",
	"已批量标记 {0} 项": "{0} 件を一括でマークしました",
	"已把 {0} 项移入回收站": "{0} 件をゴミ箱に移動しました",
	"已把「{0}」判为非内容标签": "「{0}」を内容以外のタグと判定しました",
	"已把「{0}」收录为标签「{1}」": "「{0}」をタグ「{1}」として登録しました",
	"已把关注里的 {0} 记到 {1} 名下": "フォロー中の {0} を {1} に紐付けました",
	"已把统称更改为 {0}": "総称を {0} に変更しました",
	"已抓到第 {0}–{1} 页": "{0}–{1} ページ目まで取得しました",
	已抽帧: "フレーム抽出済み",
	已拒绝资料: "情報を却下しました",
	"已按 uv.lock 同步依赖（{0}，用时 {1} 秒）": "uv.lock に従って依存関係を同期しました（{0}、所要 {1} 秒）",
	已按停: "停止済み",
	"已按推送发现填入 {0}": "プッシュ検出に基づき {0} を入力しました",
	已排队: "キュー登録済み",
	已排除: "除外済み",
	已探测时长: "再生時間を検出済み",
	"已接入的站点及其凭据状态会显示在这里。": "接続済みのサイトとその認証情報の状態がここに表示されます。",
	已提交: "送信済み",
	"已提交离线下载，进度在任务中心": "オフラインダウンロードを送信しました。進捗はタスクセンターで確認できます",
	"已撤回 {0} 项的产地判定": "{0} 件の制作地判定を元に戻しました",
	已撤销: "元に戻しました",
	"已撤销别名 {0}": "別名 {0} を取り消しました",
	"已播放 {0}，总时长 {1}；点击显示剩余时间": "再生済み {0}、全体 {1}。クリックで残り時間を表示",
	已改动: "変更済み",
	"已整理 {0} 个文件{1}。": "{0} 個のファイルを整理しました{1}。",
	"已新建「{0}」并订阅她的新作": "「{0}」を作成し、新作を購読しました",
	已新建播放列表: "プレイリストを作成しました",
	已新建目录: "フォルダを作成しました",
	"已是最新测试版。": "最新のベータ版です。",
	已是最清楚的作品画面人脸: "すでに最も鮮明な作品画面の顔です",
	已是最清楚的封面人脸: "すでに最も鮮明なカバーの顔です",
	已显示: "表示中",
	"已显示 {0} 条评论，其余评论可在 JavDB 查看。": "{0} 件のレビューを表示しています。残りのレビューは JavDB で確認できます。",
	已暂停: "一時停止中",
	"已暂停，等待继续": "一時停止中。再開を待っています",
	"已暂停，继续后更新预估": "一時停止中。再開すると見積もりを更新します",
	已更换共享密钥: "共有キーを変更しました",
	已更新关注状态: "フォロー状態を更新しました",
	已更新口味分析: "好みの分析を更新しました",
	"已更新至 {0}": "{0} に更新しました",
	已有: "既存",
	"已有一轮在进行，本次跳过": "すでに 1 回分が進行中のため、今回はスキップします",
	已有不同的归属: "すでに別の所属があります",
	已有不同的身份关系: "すでに別の身元関係があります",
	"已有图片保留。": "既存の画像は保持しました。",
	已有头像: "アバター登録済み",
	已有官网: "公式サイト登録済み",
	"已有实例在跑（PID {0}）": "すでにインスタンスが実行中です（PID {0}）",
	已有归属否定: "すでに所属の否定があります",
	"已有归属或逐件确认的内容保留，目录规则只应用到其余内容。": "割り当て済みまたは個別に確認済みのコンテンツはそのまま残し、フォルダルールは残りのコンテンツにのみ適用します。",
	已有播放列表: "既存のプレイリスト",
	"已有数据库但缺少配置文件，请恢复 config.toml 后启动": "データベースはありますが構成ファイルがありません。config.toml を復元してから起動してください",
	已有数据目录: "既存のデータフォルダ",
	"已有更新安装正在进行，请等待完成。": "すでに更新のインストールが進行中です。完了までお待ちください。",
	"已有来源的代理地址不同，请选择公共连接方式。": "既存ソースのプロキシアドレスが異なります。共通の接続方法を選択してください。",
	已有标识: "識別子あり",
	"已有检查记录，解析状态待复查": "チェック記録はありますが、解析状態は再確認待ちです",
	已有观看印证: "視聴による裏付けあり",
	已有身份: "身元あり",
	已有逐件确认: "個別確認済み",
	"已查询前 8 页评论资源。": "コメント付きリソースの最初の 8 ページを照会しました。",
	已标记: "マーク済み",
	已标记不合口味: "「好みではない」にしました",
	已标记为不是垃圾: "ジャンクではないとマークしました",
	已标记寻找更好版本: "より良い版を探すようにマークしました",
	已标记已看: "視聴済みにしました",
	已标记看过: "視聴済みにしました",
	已检查: "確認済み",
	"已检查 {0} 个来源：{1}": "{0} 件のソースを確認しました：{1}",
	"已检查可访问的来源，没有待清理的记录、空文件夹或缓存。": "アクセス可能なソースを確認しました。クリーンアップ対象の記録、空フォルダ、キャッシュはありません。",
	"已永久删除 {0} 条失效记录和 {1} 个空文件夹，": "無効な記録 {0} 件と空フォルダ {1} 個を完全に削除し、",
	"已永久删除 {0} 项": "{0} 件を完全に削除しました",
	"已永久删除 {0} 项；{1} 项未能删除，仍在回收站：": "{0} 件を完全に削除しました。{1} 件は削除できず、ゴミ箱に残っています：",
	"已消失 · 文件已不在盘上": "消失 · ファイルがディスク上にありません",
	已添加: "追加しました",
	"已添加 {0} 个关注来源": "{0} 件のフォローソースを追加しました",
	"已添加下载：{0}": "ダウンロードを追加しました：{0}",
	"已添加别名 {0}": "別名 {0} を追加しました",
	"已添加标签「{0}」": "タグ「{0}」を追加しました",
	已清理失效条目: "無効な項目をクリーンアップしました",
	已清除来源凭据: "ソースの認証情報を消去しました",
	"已生成 {0} 部视频预览。": "{0} 本の動画プレビューを生成しました。",
	已生成专用令牌: "専用トークンを生成しました",
	"已用 {0}": "{0} 使用中",
	"已用浏览器登录 PikPak": "ブラウザで PikPak にログインしました",
	"已登出 PikPak": "PikPak からログアウトしました",
	已登录: "ログイン済み",
	"已登录 PikPak": "PikPak にログインしました",
	已登记: "登録済み",
	"已登记厂牌名称与同作品发行文件的厂牌 token 一致": "登録済みのメーカー名が同作品の配信ファイルのメーカー token と一致しています",
	"已登记，另一次检查正在进行，这条稍后再查": "登録しました。別のチェックが進行中のため、この項目は後でチェックします",
	"已登记，等待检查更新": "登録しました。更新チェックを待っています",
	已看: "視聴済み",
	已移入回收站: "ゴミ箱に移動しました",
	已移出回收站: "ゴミ箱から戻しました",
	已移出播放列表: "プレイリストから削除しました",
	已移出稍后看: "あとで見るから削除しました",
	已移除: "削除済み",
	"已移除 {0} 条订阅源": "{0} 件の購読ソースを削除しました",
	已移除创作者别名: "クリエイターの別名を削除しました",
	已移除口味数据源: "好みのデータソースを削除しました",
	已移除目录规则: "フォルダルールを削除しました",
	"已移除订阅源「{0}」": "購読ソース「{0}」を削除しました",
	"已移除：{0}": "削除しました：{0}",
	已经关注: "フォロー中",
	"已经在 {0} 里面，不用再加": "すでに {0} の中にあるため、追加は不要です",
	"已经导入 {0} 项馆藏。": "{0} 件のコレクションをインポートしました。",
	已经有一个选择文件夹的窗口开着: "フォルダ選択ウィンドウがすでに開いています",
	已经有这个写法: "この表記はすでにあります",
	"已缓冲 {0} 秒": "{0} 秒バッファ済み",
	已落地: "反映済み",
	已装上: "適用済み",
	已装着认得准的小图: "判定に使える小さい画像がすでにあります",
	"已订阅「{0}」的新作": "「{0}」の新作を購読しました",
	已订阅新作: "新作を購読中",
	"已订阅新作，点击取消订阅": "新作を購読中。クリックで購読を解除",
	已记录: "記録しました",
	已记录一次高潮: "O カウンターを 1 回記録しました",
	"已设置密码。新设备需要登录，登录时勾选「保持登录」可保持 30 天。": "パスワードを設定しました。新しいデバイスではログインが必要です。ログイン時に「ログインしたままにする」を選ぶと 30 日間維持されます。",
	"已评 {0} 星": "評価 {0} つ星",
	已识别: "識別済み",
	已调整播放顺序: "再生順を変更しました",
	"已跑 {0}": "経過 {0}",
	"已跳过「{0}」": "「{0}」をスキップしました",
	已跳过资料: "情報をスキップしました",
	已载入: "読み込み済み",
	"已载入 {0} / {1} 项": "{0} / {1} 件を読み込み済み",
	已还原: "復元しました",
	"已连接已有数据目录。": "既存のデータフォルダに接続しました。",
	"已退回 {0} 个文件{1}。": "{0} 個のファイルを元に戻しました{1}。",
	已选: "選択中",
	"已选 {0} / {1}": "{0} / {1} 件選択中",
	"已选 {0} {1}": "{0} {1}選択中",
	"已选 {0} 个别名": "{0} 件の別名を選択中",
	"已选 {0} 个来源": "{0} 件のソースを選択中",
	"已选 {0} 个标签": "{0} 件のタグを選択中",
	"已选 {0} 条订阅源": "{0} 件の購読ソースを選択中",
	"已选 {0} 组": "{0} 組選択中",
	"已选 {0} 项": "{0} 件選択中",
	已选定: "選択済み",
	"已选择 {0}，点击通过所选采用。": "{0} を選択しました。「選択項目を承認」をクリックすると採用されます。",
	已通过资料: "情報を承認しました",
	已配置: "設定済み",
	"已配置当前来源需要的凭证。": "現在のソースに必要な認証情報は設定済みです。",
	"已配置更新源 · 未跟踪分支": "更新元は構成済み · ブランチは未追跡",
	已重命名播放列表: "プレイリスト名を変更しました",
	已重新加入垃圾判断: "ジャンク判定の対象に戻しました",
	已重新打开安装教程: "インストール手順を再表示しました",
	已重验: "再確認済み",
	已隐藏: "非表示",
	"已隐藏 {0} 张": "{0} 枚を非表示にしました",
	已隐藏这张图: "この画像を非表示にしました",
	"已隐退女优的 {0} 条留作不可点的记录；": "引退した女優の {0} 件はクリックできない記録として残します。",
	带不确定标记: "不確実マーク付き",
	"带个人记录，记录留着": "個人記録あり。記録は残ります",
	带凭据的媒体不能放行任意公网主机: "認証情報付きのメディアに任意のインターネット上のホストを許可することはできません",
	带的记录: "付随記録",
	常访问网站: "よく見るサイト",
	平台: "プラットフォーム",
	平台别名: "プラットフォーム上の別名",
	并下载资料: "、情報をダウンロード",
	"并清理 {0} 个闲置缓存。{1}{2}": "未使用のキャッシュ {0} 個もクリーンアップします。{1}{2}",
	"并清理 {0} 个闲置缓存。来源根目录保留。{1}{2}": "未使用のキャッシュ {0} 個もクリーンアップします。ソースのルートフォルダは残ります。{1}{2}",
	幻想: "ファンタジー",
	广泛匹配: "あいまい一致",
	库健康: "ライブラリの健全性",
	库外发现: "ライブラリ外で検出",
	"应位于自动入库的云端路径前缀内。": "自動取り込みのクラウドパスのプレフィックス内にある必要があります。",
	应用: "適用",
	应用与工具: "アプリとツール",
	应用与维护: "アプリとメンテナンス",
	应用到子文件夹: "サブフォルダに適用",
	应用启动失败: "アプリの起動に失敗しました",
	应用已卸载: "アプリをアンインストールしました",
	应用更新包: "アプリ更新パッケージ",
	"应用更新包复用已安装工具；工具缺失、损坏或版本变化时会另行下载所需工具包。": "アプリ更新パッケージはインストール済みのツールを再利用します。ツールが欠けている、破損している、またはバージョンが変わった場合は、必要なツールパッケージを別途ダウンロードします。",
	应用资源清理未全部完成: "アプリのリソースのクリーンアップが一部完了していません",
	底图: "元画像",
	"开启后匹配任一所选标签；关闭后必须同时包含全部标签。": "オンにすると選択したタグのいずれかに一致します。オフにするとすべてのタグを含む必要があります。",
	"开启后，访问 Peach 需要先登录。": "オンにすると、Peach へのアクセスにログインが必要になります。",
	开启字幕: "字幕をオン",
	开始修复: "修復を開始",
	"开始播放后，这里会显示播放落在一周的哪些时段。": "再生を始めると、1 週間のどの時間帯に再生したかがここに表示されます。",
	"开始播放后，这里会显示最近的真实观看证据。": "再生を始めると、最近の実際の視聴記録がここに表示されます。",
	"开始播放后，这里会显示每个作品播了几次。": "再生を始めると、作品ごとの再生回数がここに表示されます。",
	"开机后启动 Peach": "起動時に Peach を開始",
	开机自启: "自動起動",
	张: "枚",
	张可选: "枚から選択可",
	张图片: "枚の画像",
	张截图: "枚のスクリーンショット",
	强制: "強制",
	强度: "強さ",
	强烈推荐: "強くおすすめ",
	强调色: "アクセントカラー",
	"归入原因：{0}": "分類理由：{0}",
	归属: "割り当て",
	"归属串的类别不在清单里：{0}": "所属文字列のカテゴリが一覧にありません：{0}",
	"归属标识只能是小写字母、数字、下划线和连字符：{0}": "所属識別子には小文字の英字、数字、アンダースコア、ハイフンのみ使用できます：{0}",
	归档站的创作者: "アーカイブサイトのクリエイター",
	"当前 / 最佳分辨率": "現在 / 最高解像度",
	"当前 OpenCV 没有 FaceDetectorYN；需要 4.5.4 以上": "現在の OpenCV には FaceDetectorYN がありません。4.5.4 以上が必要です",
	"当前 OpenCV 没有 FaceRecognizerSF；需要 4.5.4 以上": "現在の OpenCV には FaceRecognizerSF がありません。4.5.4 以上が必要です",
	"当前 ledger 已没有匹配的可用资产": "現在の台帳には一致する使用可能なアセットがもうありません",
	当前仅显示筛选结果: "絞り込み結果のみ表示中",
	当前作品没有可用于搜索的番号或片名: "この作品には検索に使える品番やタイトルがありません",
	"当前使用系统生成的访问口令。改设自己的密码，或关闭登录要求。": "現在はシステムが生成したアクセスパスコードを使用しています。独自のパスワードを設定するか、ログイン要求をオフにしてください。",
	当前信息: "現在の情報",
	"当前值：{0}": "現在の値：{0}",
	"当前关注来源不需要凭证。": "現在のフォローソースに認証情報は不要です。",
	"当前写入端是 {0}，本机不能推送": "現在の書き込み側は {0} のため、このマシンからはプッシュできません",
	"当前分类没有待检查文件。": "このカテゴリに確認待ちのファイルはありません。",
	"当前可连续播放 {0} 秒": "現在 {0} 秒連続再生できます",
	"当前喜欢 {0} · 不合口味 {1}": "現在 好き {0} · 好みに合わない {1}",
	"当前已比更新通道领先 {0} 个提交。": "現在、更新チャネルより {0} コミット先行しています。",
	"当前数据库 integrity_check 不是 ok：{0}": "現在のデータベースの integrity_check が ok ではありません：{0}",
	"当前数据库不存在，不清退任何备份": "現在のデータベースが存在しないため、バックアップは整理しません",
	当前服务端系统不支持直接定位文件: "現在のサーバー OS はファイルの直接表示に対応していません",
	"当前步骤耗时较长，正在等待进展": "現在のステップに時間がかかっています。進捗を待っています",
	当前没有可暂停或继续的任务: "一時停止または再開できるタスクは現在ありません",
	当前版本: "現在のバージョン",
	"当前版本高于已发布测试版。": "現在のバージョンは公開済みのテスト版より新しいです。",
	"当前版本：{0}。{1}{2}": "現在のバージョン：{0}。{1}{2}",
	"当前状态不允许此操作，请刷新后重试。": "現在の状態ではこの操作を実行できません。再読み込みしてから再試行してください。",
	当前用户设置不存在: "現在のユーザー設定が存在しません",
	当前画质: "現在の画質",
	当前筛选下没有可直接播放的内容: "現在の絞り込みに直接再生できるコンテンツはありません",
	当前筛选下没有更新: "現在の絞り込みに更新はありません",
	当前索引中没有这张备选图片: "この候補画像は現在のインデックスにありません",
	"当前设备没有执行此操作的权限，请在运行 Peach 的电脑上操作。": "このデバイスにはこの操作の権限がありません。Peach を実行しているパソコンで操作してください。",
	当前访问密码: "現在のアクセスパスワード",
	当前访问密码不正确: "現在のアクセスパスワードが正しくありません",
	当前配色: "現在の配色",
	"当前阶段 ·": "現在の段階 ·",
	"当前阶段 · {0}": "現在の段階 · {0}",
	当前阶段完成率: "現在の段階の完了率",
	当前预览包含: "現在のプレビューの内容",
	"当前预览包含 {0} 部有编号作品、{1} 条无编号馆藏的汇总，约 {2} KiB。不含账号、设备、文件路径和浏览器历史记录等个人数据。": "現在のプレビューには、品番ありの作品 {0} 本と品番なしのコレクション {1} 件の集計が含まれます（約 {2} KiB）。アカウント、デバイス、ファイルパス、ブラウザ履歴などの個人データは含まれません。",
	当前馆藏与媒体配置不一致: "現在のコレクションとメディア構成が一致しません",
	"当前馆藏与媒体配置不一致，不能采集下载资料": "現在のコレクションとメディア構成が一致しないため、ダウンロード資料を収集できません",
	"当前：": "現在：",
	"当前：{0} · {1}{2}": "現在：{0} · {1}{2}",
	影片: "動画",
	影片属性: "動画のプロパティ",
	影院模式: "シアターモード",
	彻底删除: "完全に削除",
	彻底删除所选记录: "選択した記録を完全に削除",
	"彻底删除所选（{0}）": "選択項目を完全に削除（{0}）",
	待人确认: "人による確認待ち",
	待判断: "判定待ち",
	待升级: "アップグレード待ち",
	待合并: "統合待ち",
	待合并创作者别名: "統合待ちのクリエイター別名",
	待合并别名批量操作: "統合待ち別名の一括操作",
	待后处理: "後処理待ち",
	"待处理：": "未処理：",
	待复查: "再確認待ち",
	待复核: "レビュー待ち",
	待找: "未入手",
	待找磁链筛选: "未入手マグネットリンクの絞り込み",
	待核番号: "確認待ちの品番",
	待永久删除: "完全削除待ち",
	"待确认人物：{0}": "確認待ちの人物：{0}",
	"待确认资料的 JSON 格式无效": "確認待ち資料の JSON 形式が無効です",
	待验证: "検証待ち",
	循环播放: "ループ再生",
	微醺: "ほろ酔い",
	心动: "ときめき",
	"快进 / 快退": "早送り / 巻き戻し",
	"快进 / 快退步长": "早送り / 巻き戻しの間隔",
	快进扫过: "早送りでスキップ",
	忽略: "無視",
	忽略所选作品: "選択した作品を無視",
	性交体位: "体位",
	性感内衣: "セクシーランジェリー",
	总数: "合計",
	恋足: "脚フェチ",
	"恢复显示 {0}": "{0} を再表示",
	恢复未看: "未視聴に戻す",
	恢复默认: "デフォルトに戻す",
	悬停预览延迟: "ホバープレビューの遅延",
	情侣: "カップル",
	情境场所: "シチュエーション・場所",
	想要: "ほしいもの",
	"想要 {0}": "ほしいもの {0}",
	想要条目不存在: "ほしいもの項目が存在しません",
	想要清单读取失败: "ほしいものリストの読み込みに失敗しました",
	想要资料任务已停止: "ほしいもの資料のタスクを停止しました",
	成人出演者: "成人出演者",
	成本查询列名不正确: "コスト照会の列名が正しくありません",
	"我已查看上传预览，同意上传馆藏与口味明细": "アップロードのプレビューを確認し、コレクションと好みの明細のアップロードに同意します",
	我的收藏: "マイコレクション",
	截图: "スクリーンショット",
	"所勾的卡分属数据库里不同的人：{0}，先去合并再订": "チェックしたカードはデータベース上の別々の人物に属しています：{0}。先に統合してから購読してください",
	所在地: "所在地",
	所属: "所属",
	所属事務所: "所属事務所",
	所属集团: "所属グループ",
	"所有来源之间没有检测到内容相同的文件。扫描新来源后，这里会自动更新。": "すべてのソース間で内容が同じファイルは検出されませんでした。新しいソースをスキャンすると、ここは自動で更新されます。",
	所有渠道都没有候选: "どのチャネルにも候補がありません",
	所有索引器都未能完成搜索: "どのインデクサーも検索を完了できませんでした",
	"所选图片不在本机缓存：{0}": "選択した画像はこのマシンのキャッシュにありません：{0}",
	"所选图片未保存在本机：{0}": "選択した画像はこのマシンに保存されていません：{0}",
	"所选图片缺少有效的 SHA-256 校验值": "選択した画像に有効な SHA-256 チェックサムがありません",
	"所选字段资料不在当前批次，无法批准": "選択したフィールド資料は現在のバッチにないため、承認できません",
	所选来源的资料不在当前待确认列表中: "選択したソースの資料は現在の確認待ちリストにありません",
	所选标签操作: "選択したタグの操作",
	"所选视频已不存在或已移入回收站，请刷新后重试": "選択した動画はすでに存在しないか、ゴミ箱に移動されています。更新して再試行してください",
	所选记录: "選択した記録",
	"所选资料不在当前批次，无法批准": "選択した資料は現在のバッチにないため、承認できません",
	"所选资料中没有可用的本机图片，无法使用": "選択した資料に使用可能なこのマシンの画像がないため、使用できません",
	所选资料缺少足够依据: "選択した資料には十分な根拠がありません",
	所选链接不在本次失效清单中: "選択したリンクは今回のリンク切れ一覧にありません",
	所选项目操作: "選択項目の操作",
	所选项目无共同来源: "選択項目に共通のソースがありません",
	手写: "手書き",
	手动: "手動",
	手动填写: "手動入力",
	手动播放列表: "手動プレイリスト",
	手动添加: "手動で追加",
	手动添加别名: "別名を手動で追加",
	手部: "手",
	打不开订阅源: "購読ソースを開けません",
	"打包进程不加载项目 venv，依赖由重启脚本核对": "パッケージングプロセスはプロジェクトの venv を読み込みません。依存関係は再起動スクリプトが確認します",
	"打开 Mix · {0}": "Mix を開く · {0}",
	"打开 PikPak 验证页": "PikPak の認証ページを開く",
	"打开 {0}": "{0} を開く",
	"打开 {0} 的作品详情": "{0} の作品詳細を開く",
	"打开 {0} 的文件位置": "{0} のファイルの場所を開く",
	"打开 {0} 详情": "{0} の詳細を開く",
	"打开 {0}{1}": "{0}{1} を開く",
	"打开{0}": "{0}を開く",
	"打开{0}页": "{0}ページを開く",
	"打开{0}页：{1}": "{0}ページを開く：{1}",
	打开位置: "場所を開く",
	"打开创作者页：{0}": "クリエイターページを開く：{0}",
	打开原来源: "元のソースを開く",
	打开原视频: "元の動画を開く",
	"打开原视频 {0}": "元の動画を開く {0}",
	打开口味与记录: "好みと記録を開く",
	"打开女优页：{0}": "女優ページを開く：{0}",
	打开已保存关注: "保存済みのフォローを開く",
	"打开播放列表 {0}": "プレイリスト {0} を開く",
	打开文件: "ファイルを開く",
	打开文件夹目录: "フォルダを開く",
	"打开文件管理器失败，请重试": "ファイルマネージャーを開けませんでした。再試行してください",
	"打开未归属：馆藏里没有署名人的作品": "未割り当てを開く：コレクション内で出演者・作者が記載されていない作品",
	打开来源和凭证: "ソースと認証情報を開く",
	打开来源页面: "ソースページを開く",
	打开目录: "フォルダを開く",
	打开相关页面: "関連ページを開く",
	打开维护与更新: "メンテナンスと更新を開く",
	打开网络与访问: "ネットワークとアクセスを開く",
	打开设置: "設定を開く",
	打开详情: "詳細を開く",
	打开详情自动播放: "詳細を開いたら自動再生",
	打开资料: "情報を開く",
	"打开资料页：{0}": "情報ページを開く：{0}",
	打开预览: "プレビューを開く",
	打扫口交: "お掃除フェラ",
	托盘停止消息发送失败: "トレイへの停止メッセージの送信に失敗しました",
	"托盘尚未退出，安装已取消": "トレイがまだ終了していないため、インストールをキャンセルしました",
	"托盘已正常重启并重新拥有 HTTP/HTTPS 子服务": "トレイは正常に再起動し、HTTP/HTTPS 子サービスを再び管理しています",
	"托盘未在期限内正常退出；未强杀、未另启": "トレイが期限内に正常終了しませんでした。強制終了も別途起動もしていません",
	托盘监视器未能就绪: "トレイのモニターを準備できませんでした",
	托盘进程身份不一致: "トレイプロセスの身元が一致しません",
	"执行 {0} 个待迁移时失败，数据库目录里有迁移前备份：{1}": "{0} 件の未実行の移行の実行中に失敗しました。データベースフォルダに移行前のバックアップがあります：{1}",
	执行整理: "整理を実行",
	扫描: "スキャン",
	"扫描、追更检查、批量操作和命令行批处理跑起来之后，这里会显示它们的进度与结果。": "スキャン、更新チェック、一括操作、コマンドラインのバッチ処理を実行すると、その進捗と結果がここに表示されます。",
	"扫描与资料采集已完成：识别 {0} 个番号，": "スキャンと情報の収集が完了しました：品番 {0} 件を識別、",
	扫描与资料采集未完成: "スキャンと情報の収集が完了していません",
	扫描与采集: "スキャンと収集",
	扫描与采集已暂停: "スキャンと収集を一時停止しました",
	扫描中: "スキャン中",
	扫描任务: "スキャンタスク",
	扫描失败: "スキャンに失敗しました",
	扫描媒体文件: "メディアファイルをスキャン",
	"扫描完成后，这里会列出需要复核的资料。": "スキャンが完了すると、レビューが必要な情報がここに一覧表示されます。",
	扫描文件: "ファイルをスキャン",
	"扫描目录与保存的断点不一致，请核对挂载设置": "スキャンフォルダが保存されたチェックポイントと一致しません。マウント設定を確認してください",
	"批准资料字段时，请先选择要采用的来源": "資料フィールドを承認するときは、先に採用するソースを選択してください",
	"批处理进程状态无法确认，安装已取消。": "バッチ処理プロセスの状態を確認できないため、インストールをキャンセルしました。",
	批量保留: "一括で残す",
	批量判定产地: "制作地域を一括判定",
	批量加入稍后看: "あとで見るに一括追加",
	批量操作: "一括操作",
	"批量更新 {0}/{1} 项未完成": "一括更新 {0}/{1} 件が未完了です",
	批量标记喜欢: "一括で好きにする",
	批量标记看过: "一括で視聴済みにする",
	批量永久删除: "一括で完全に削除",
	批量确认不是垃圾: "一括でゴミではないと確認",
	批量移入回收站: "一括でゴミ箱に移動",
	批量还原: "一括で復元",
	批量重新判定垃圾: "一括でゴミを再判定",
	"找不到 cloudflared": "cloudflared が見つかりません",
	"找不到 cloudflared：安装官方 cloudflared，或用设置文件的 tunnel.binary 与 PEACH_CLOUDFLARED 指定路径": "cloudflared が見つかりません。公式の cloudflared をインストールするか、設定ファイルの tunnel.binary または PEACH_CLOUDFLARED でパスを指定してください",
	"找不到文件 · 共 {0} 项": "ファイルが見つかりません · 全 {0} 件",
	"找不到源文件；点击右侧的扫描按钮，重新检查目录并更新数据库记录": "元のファイルが見つかりません。右側のスキャンボタンをクリックして、フォルダを再確認しデータベースの記録を更新してください",
	找不到视频轨的样本表: "動画トラックのサンプルテーブルが見つかりません",
	"找不到这个{0}": "この{0}が見つかりません",
	找不到这位女优: "この女優が見つかりません",
	找不到这条关注条目: "このフォロー項目が見つかりません",
	找不到这条想要: "このほしいものが見つかりません",
	找不到这条新作: "この新作が見つかりません",
	"找到 {0} 条中文字幕": "中国語字幕が {0} 件見つかりました",
	"把 {0} 的记录接到哪个文件": "{0} の記録をどのファイルに紐付けますか",
	"把媒体目录归进媒体库后，这里会按库显示视频数。": "メディアフォルダをメディアライブラリに割り当てると、ライブラリごとの動画数がここに表示されます。",
	抓取中: "取得中",
	"抓取中…": "取得中…",
	抓取历史: "取得履歴",
	抓取封面: "カバーを取得",
	抓更早的一页: "さらに前のページを取得",
	折叠安装教程: "インストール手順を折りたたむ",
	护士: "ナース",
	"拉取 {0}": "{0} を取得",
	拉取失败: "取得に失敗しました",
	拒绝: "却下",
	拒绝所选: "選択項目を却下",
	"拒绝重启：{0}，但这些进程还在用项目 venv：PID {1}；先停掉它们再重启": "再起動を拒否しました：{0}。ただし次のプロセスがまだプロジェクトの venv を使っています：PID {1}。先にそれらを止めてから再起動してください",
	"拒绝重启：入口不存在或不是 Peach.exe：{0}": "再起動を拒否しました：エントリポイントが存在しないか Peach.exe ではありません：{0}",
	"拒绝重启：托盘窗口的命令行里没有 peach.tray，照原样重启会起错东西": "再起動を拒否しました：トレイウィンドウのコマンドラインに peach.tray がありません。そのまま再起動すると別のものが起動します",
	"拒绝重启：旧托盘名下只有 {0} 个子服务，端口由不归它管的 serve 进程占着（PID {1}），重启托盘换不掉它们": "再起動を拒否しました：旧トレイ配下の子サービスは {0} 個だけで、ポートは管理外の serve プロセス（PID {1}）が使用しています。トレイを再起動しても置き換えられません",
	"拒绝重启：服务入口不存在：{0}": "再起動を拒否しました：サービスのエントリポイントが存在しません：{0}",
	"拒绝重启：没有找到唯一且命令行匹配的源码托盘窗口": "再起動を拒否しました：コマンドラインが一致するソース版トレイウィンドウが一意に見つかりません",
	"拒绝重启：没有找到唯一且路径匹配的 Peach 托盘窗口": "再起動を拒否しました：パスが一致する Peach トレイウィンドウが一意に見つかりません",
	"拒绝重启：源码托盘旁没有服务入口 {0}": "再起動を拒否しました：ソース版トレイの隣にサービスのエントリポイント {0} がありません",
	"拒绝重启：读不了任务表（{0}）；确认没有任务在跑后加 --force": "再起動を拒否しました：タスク表を読み込めません（{0}）。実行中のタスクがないことを確認してから --force を付けてください",
	"拒绝重启：这些任务重启后续跑不了：{0}；等它们结束，或加 --force": "再起動を拒否しました：次のタスクは再起動後に続行できません：{0}。終了を待つか、--force を付けてください",
	"拖动浏览 · Shift + 滚轮横移": "ドラッグで移動 · Shift + ホイールで横スクロール",
	挂载帮助: "マウントのヘルプ",
	挂载检测尚未完成: "マウントの検出がまだ完了していません",
	挂载状态: "マウント状態",
	"按{0}{1}排序": "{0}{1}で並べ替え",
	按发行日期排序: "発売日で並べ替え",
	按口味匹配排序: "好みの一致度で並べ替え",
	按图库互证认定: "ギャラリーの相互照合で認定",
	按字段: "フィールド別",
	按封面人脸认定: "カバーの顔で認定",
	"按所选间隔抽帧，仅处理本机磁盘上的视频。": "選択した間隔でフレーム抽出します。この端末のディスク上の動画のみ処理します。",
	"按挂载工具实际配置选择；代理流量保护会限制自动媒体读取。": "マウントツールの実際の構成に合わせて選択してください。プロキシ通信量の保護により、メディアの自動読み取りが制限されます。",
	"按推送发现填入 {0}，保存配置后生效": "プッシュ検出に基づき {0} を入力しました。構成を保存すると反映されます",
	按时长排序: "再生時間で並べ替え",
	按来源: "ソース別",
	按来源数量: "ソース数順",
	按来源评分排序: "ソースの評価で並べ替え",
	按标题命中: "タイトルで一致",
	按标题开头命中: "タイトルの先頭で一致",
	按模板整理: "テンプレートで整理",
	按模板整理文件: "テンプレートでファイルを整理",
	"按模板给文件改名并归入目录。先预览，确认后执行；执行过的一批可以整批退回。": "テンプレートに従ってファイル名を変更し、フォルダに振り分けます。まずプレビューし、確認してから実行します。実行したバッチはまとめて元に戻せます。",
	"按番号或厂牌推断的产地，批量判定后不再变；打开同产地的作品": "品番やメーカーから推定した制作地です。一括判定後は変わりません。同じ制作地の作品を開きます",
	按番号抓最高清的官方封套: "品番で最高画質の公式カバーを取得",
	按番号排序: "品番で並べ替え",
	按番号查找资源: "品番でリソースを検索",
	按番号添加: "品番で追加",
	按种类看补全: "種類別に補完状況を見る",
	按缓存所在硬盘分档: "キャッシュのあるディスク別に分類",
	按题材筛选: "ジャンルで絞り込み",
	"按馆藏记录逐条查找本地磁盘与网盘上的文件，列出文件已不存在的记录、空文件夹，以及不再被引用的缓存。": "コレクションの記録ごとにローカルディスクとクラウドストレージ上のファイルを確認し、ファイルが存在しない記録、空フォルダ、参照されなくなったキャッシュを一覧表示します。",
	按首字跳转: "頭文字でジャンプ",
	换一份凭据后重跑: "別の認証情報で再実行",
	换一批: "別の候補を表示",
	"换个目录名称试试。": "別のフォルダ名を試してください。",
	"换个筛选范围再试。": "絞り込み範囲を変えて再試行してください。",
	"换二进制失败，且旧托盘未能重开：{0}": "バイナリの置き換えに失敗し、旧トレイも再起動できませんでした：{0}",
	"换二进制失败，已按原样重开旧托盘：{0}": "バイナリの置き換えに失敗したため、旧トレイを元どおり再起動しました：{0}",
	换新: "更新",
	掃除: "掃除",
	"排序 {0}": "並べ替え {0}",
	排序必须完整包含当前播放列表的所有视频: "並べ替えには現在の再生リストのすべての動画を含める必要があります",
	排队中: "待機中",
	"排除 {0} 个超大合集": "大型総集編 {0} 本を除外",
	"探测到 {0}，保存配置后生效": "{0} を検出しました。構成を保存すると反映されます",
	"探测时长后，这里会显示时长分布。": "再生時間を検出すると、再生時間の分布がここに表示されます。",
	探测未返回: "探索の応答がありません",
	"探测画质后，这里会显示画质分布。": "画質を検出すると、ここに画質の分布が表示されます。",
	探索: "探索",
	"探索 {0}": "{0} を探索",
	探花: "探花",
	"探针不可用：{0}": "プローブを利用できません：{0}",
	接下来导入浏览器历史记录: "次にブラウザの閲覧履歴を取り込みます",
	接不进来: "接続不可",
	接到与操作: "紐付け先と操作",
	接到这个文件: "このファイルに紐付け",
	"接口地址需要包含一个 {code}": "接口地址需要包含一个 {code}",
	接口番号格式: "API の品番形式",
	"接口需要使用固定公网域名的 HTTPS 地址，端口为 443": "API には固定の公開ドメインの HTTPS アドレス（ポート 443）を使用してください",
	"接收 CloudDrive2 通知": "CloudDrive2 の通知を受信",
	接着排下一轮: "続けて次の回をキューに入れる",
	接着看: "続きを見る",
	"接管前必须两侧一致；当前是 {0}：{1}": "引き継ぐ前に両側が一致している必要があります。現在は {0}：{1}",
	接近正方形: "正方形に近い",
	推广品牌名: "プロモーションのブランド名",
	"推广网页存档的横幅、标志或导航图片": "プロモーションページのアーカイブにあるバナー、ロゴ、ナビゲーション画像",
	推广语占了名字主体: "宣伝文句が名前の大部分を占めています",
	"推广附件命名规则不完整：{0}": "プロモーション付属物の命名規則が不完全です：{0}",
	推荐: "おすすめ",
	"推荐分 {0}，{1}": "おすすめスコア {0}、{1}",
	推荐未取得: "おすすめ未取得",
	推送发现: "プッシュ検出",
	推送发现只在允许修改数据库的设备上可用: "プッシュ検出はデータベースの変更を許可されたデバイスでのみ使用できます",
	描边: "縁取り",
	描述性称呼: "説明的な呼称",
	提交: "送信",
	提交下载: "ダウンロードを送信",
	"提交中…": "送信中…",
	"提交内容与所选资料不一致，未保存": "送信内容が選択した資料と一致しないため、保存しませんでした",
	"提交内容有误，请检查输入后重试。": "送信内容に誤りがあります。入力を確認して再試行してください。",
	"提交内容过大，请减少数量后重试。": "送信内容が大きすぎます。数を減らして再試行してください。",
	提交喜爱理由: "お気に入りの理由を送信",
	"提交回包里没有 task": "送信の応答に task がありません",
	"提交没有成功。": "送信できませんでした。",
	"提交没有成功：{0}": "送信できませんでした：{0}",
	提交离线任务: "オフラインタスクを送信",
	"提供 Cookie 的方式（二选一）": "Cookie の提供方法（いずれか一つ）",
	"提供不同番号之间的对应线索，合并需另行确认": "異なる品番間の対応の手がかりを提供します。統合には別途確認が必要です",
	"提前收工，退出码 {0}": "早めに終了しました。終了コード {0}",
	插画: "イラスト",
	搜索: "検索",
	搜索与推荐: "検索とおすすめ",
	搜索中文字幕: "中国語字幕を検索",
	搜索作品: "作品を検索",
	"搜索作品、女优、厂牌或标签": "作品、女優、メーカー、タグを検索",
	"搜索或云下载提交失败，请在 Peach 检查下载渠道后重试": "検索またはクラウドダウンロードの送信に失敗しました。Peach でダウンロードチャネルを確認してから再試行してください",
	搜索或输入新标签: "検索または新しいタグを入力",
	搜索播放墙: "再生ウォールを検索",
	搜索收藏: "お気に入りを検索",
	搜索结果: "検索結果",
	搜索记录: "検索履歴",
	搜索记录数量: "検索履歴の件数",
	"搜索词需为 3–200 个字符，分页位置无效时请重新搜索": "検索語は 3〜200 文字にしてください。ページ位置が無効な場合は検索し直してください",
	搜索馆藏: "コレクションを検索",
	摄取判定不收这个卖家名: "取り込み判定ではこの販売者名を受け付けません",
	"撞上 Cloudflare 挑战页": "Cloudflare のチャレンジページに当たりました",
	撤回判定: "判定を元に戻す",
	撤回此规则已有的: "このルールの既存の",
	"撤回此规则已有的 {0} 项关联，再按当前范围应用。": "このルールの既存の関連付け {0} 件を元に戻し、現在の範囲で適用し直します。",
	"撤掉 {0}": "{0} を外す",
	撤销: "元に戻す",
	"撤销 Cookie": "Cookie を取り消す",
	"撤销 id 重复": "取り消し id が重複しています",
	撤销别名: "別名を取り消す",
	"撤销别名 {0}": "別名 {0} を取り消す",
	撤销别名需要精确写法: "別名の取り消しには正確な表記が必要です",
	"撤销失败：{0}": "元に戻せませんでした：{0}",
	撤销字段与实体类型不符: "取り消すフィールドがエンティティの種類と一致しません",
	"撤销待复核 {0}": "レビュー待ちを取り消し {0}",
	撤销移入回收站: "ゴミ箱への移動を元に戻す",
	撤销身份锚点在包内指向多个实体: "取り消しの身元アンカーがパッケージ内で複数のエンティティを指しています",
	撤销链接地址必须是字符串: "取り消すリンクのアドレスは文字列にしてください",
	撤销链接需要用途与精确地址: "リンクの取り消しには用途と正確なアドレスが必要です",
	撤销需要有效的独立身份锚点: "取り消しには有効な独立した身元アンカーが必要です",
	播放: "再生",
	"播放 {0} 次": "{0} 回再生",
	播放列表: "プレイリスト",
	播放列表名称不能为空: "プレイリスト名を入力してください",
	"播放列表名称最多 80 个字符": "プレイリスト名は 80 文字以内にしてください",
	"播放列表含不可用视频：{0}": "プレイリストに利用できない動画が含まれています：{0}",
	"播放列表操作：{0}": "プレイリスト操作：{0}",
	"播放列表最多 {0} 个视频": "プレイリストに追加できる動画は最大 {0} 本です",
	播放列表未取得: "プレイリストを取得できませんでした",
	播放列表至少需要一个视频: "プレイリストには動画が 1 本以上必要です",
	播放列表读取失败: "プレイリストを読み込めませんでした",
	播放器菜单: "プレーヤーメニュー",
	播放器视图控制: "プレーヤー表示コントロール",
	播放器设置: "プレーヤー設定",
	"播放器还没有接上宿主（configurePlayer）": "プレーヤーがまだホストに接続されていません（configurePlayer）",
	播放地址无效: "再生 URL が無効です",
	播放墙: "再生ウォール",
	播放墙图片: "再生ウォール画像",
	播放墙工具: "再生ウォールツール",
	"播放墙，拖动或方向键浏览": "再生ウォール。ドラッグまたは矢印キーで閲覧",
	播放时间: "再生日時",
	播放次数: "再生回数",
	播放正片: "本編を再生",
	播放统计: "再生統計",
	播放请求已取消: "再生リクエストはキャンセルされました",
	播放过: "再生済み",
	播放进度: "再生位置",
	播放速度: "再生速度",
	"播放速度减 0.05": "再生速度を 0.05 下げる",
	"播放速度加 0.05": "再生速度を 0.05 上げる",
	"播放链接已失效，请在作品详情重新打开": "再生リンクの有効期限が切れました。作品詳細から開き直してください",
	操作: "操作",
	操作失败: "操作に失敗しました",
	"操作失败，请重试": "操作に失敗しました。再試行してください",
	操作未完成: "操作が完了しませんでした",
	"操作未完成，请重试": "操作が完了しませんでした。再試行してください",
	"操作未完成，请重试；持续失败时查看托盘日志。": "操作が完了しませんでした。再試行してください。失敗が続く場合はトレイのログを確認してください。",
	操作系统: "OS",
	收录: "登録",
	收录日期: "掲載日",
	收藏: "お気に入り",
	收藏作品清单: "お気に入り作品リスト",
	收藏对象不存在或状态不正确: "お気に入りの対象が存在しないか、状態が正しくありません",
	收藏类型: "お気に入りの種類",
	收起: "折りたたむ",
	收起任务详情: "タスクの詳細を折りたたむ",
	收起作品: "作品を折りたたむ",
	收起侧栏: "サイドバーを折りたたむ",
	收起排名: "ランキングを折りたたむ",
	收起控件: "コントロールを折りたたむ",
	收起标题: "タイトルを折りたたむ",
	收起详情: "詳細を折りたたむ",
	改名: "名前を変更",
	"改名失败：{0}": "名前の変更に失敗しました：{0}",
	放大: "拡大",
	放大播放墙: "再生ウォールを拡大",
	故事剧情: "ストーリー",
	数据上传: "データのアップロード",
	"数据使用了外部或嵌套目录，请保留数据卸载后按目录清单手动清理": "データに外部またはネストしたディレクトリが使われています。データを残してアンインストールし、ディレクトリ一覧に沿って手動でクリーンアップしてください",
	数据库: "データベース",
	数据库不存在: "データベースが存在しません",
	"数据库不存在：{0}": "データベースが存在しません：{0}",
	数据库与迁移: "データベースと移行",
	"数据库中的当前统计 · {0}": "データベースの現在の統計 · {0}",
	"数据库中的当前统计 · {0} 个视频 · {1}": "データベースの現在の統計 · 動画 {0} 本 · {1}",
	"数据库写入失败且改不回原名，需要人工处理：{0}": "データベースへの書き込みに失敗し、元の名前にも戻せませんでした。手動での対応が必要です：{0}",
	"数据库写入失败，已改回原名：{0}": "データベースへの書き込みに失敗したため、元の名前に戻しました：{0}",
	数据库可读取: "データベースを読み取れます",
	"数据库处于冲突状态（{0}），本机暂时只读。请在托盘执行「同步数据库」；若提示仍冲突，需按日志人工处理。": "データベースが競合状態（{0}）のため、このマシンは一時的に読み取り専用です。トレイで「データベースを同期」を実行してください。それでも競合と表示される場合は、ログに沿って手動で対応してください。",
	数据库尚未准备好任务记录表: "データベースにタスク記録テーブルがまだ準備されていません",
	数据库尚未初始化: "データベースはまだ初期化されていません",
	数据库恢复检查失败: "データベースの復元チェックに失敗しました",
	数据库无法读取: "データベースを読み取れません",
	数据库更新失败: "データベースの更新に失敗しました",
	"数据库由 {0} 负责写入，本机当前只能浏览。请改在该机器上操作，或在托盘执行「由本机接管数据库写入」（要求两侧数据一致）后再试。": "データベースの書き込みは {0} が担当しているため、このマシンでは現在閲覧のみ可能です。そのマシンで操作するか、トレイで「このマシンでデータベースの書き込みを引き継ぐ」（両側のデータが一致している必要があります）を実行してから再試行してください。",
	数据库结构已是最新: "データベースの構造は最新です",
	数据库结构无法读取: "データベースの構造を読み取れません",
	"数据库缺少任务记录表，请按运行文档检查备份后执行 peach migrate upgrade --yes": "データベースにタスク記録テーブルがありません。運用ドキュメントに沿ってバックアップを確認してから peach migrate upgrade --yes を実行してください",
	数据库迁移: "データベース移行",
	数据库里已有同名创作者: "データベースに同名のクリエイターがすでに存在します",
	"数据库里还没有「{0}」，会新建一位": "データベースに「{0}」がまだないため、新しく作成します",
	"数据库里还没有可判的任务表：{0}": "データベースに判定可能なタスクテーブルがまだありません：{0}",
	数据库里这一行已经变了: "データベースのこの行はすでに変更されています",
	"数据库里这条实体现在叫 {0}": "データベース上のこのエンティティの現在の名前は {0} です",
	数据源: "データソース",
	数据目录: "データディレクトリ",
	"数据目录位于程序目录内，不能自动替换": "データディレクトリがプログラムディレクトリ内にあるため、自動で置き換えられません",
	数据目录无法写入: "データディレクトリに書き込めません",
	"数据目录（Peach 数据库、缓存和设置文件都放在这里）": "データディレクトリ（Peach のデータベース、キャッシュ、設定ファイルはすべてここに保存されます）",
	数据管理: "データ管理",
	整个名字都是推广语: "名前全体が宣伝文句です",
	整张使用: "画像全体を使用",
	整理: "整理",
	"整理 {0} 组资料结果，自动保存 {1} 条": "{0} グループの情報結果を整理し、{1} 件を自動保存",
	"整理 {0} 组资料结果，自动保存 {1} 条。": "{0} グループの情報結果を整理し、{1} 件を自動保存しました。",
	"整理前 ledger 校验失败：integrity={0}": "整理前の台帳チェックに失敗しました：integrity={0}",
	"整理后 ledger 校验失败：integrity={0} new_foreign_keys={1}": "整理後の台帳チェックに失敗しました：integrity={0} new_foreign_keys={1}",
	整理哪个来源: "整理するソース",
	整理回滚已停止: "整理の取り消しを停止しました",
	整理失败: "整理に失敗しました",
	整理已停止: "整理を停止しました",
	整理文件: "ファイルを整理",
	整理结果: "整理結果",
	整理配置读取失败: "整理の構成を読み込めませんでした",
	整理采集结果: "収集結果を整理",
	整理需要确认: "整理には確認が必要です",
	整组回收: "グループごとゴミ箱へ",
	整趟任务: "タスク全体",
	"文件 {0}": "ファイル {0}",
	文件与记录核对: "ファイルと記録の照合",
	文件仍在盘上: "ファイルはまだディスク上にあります",
	文件位置: "ファイルの場所",
	"文件共 {0}，记录可从回收站还原。": "ファイル合計 {0}。記録はゴミ箱から復元できます。",
	文件列表: "ファイル一覧",
	文件名: "ファイル名",
	"文件名与 NFO 番号冲突，请复核": "ファイル名と NFO の品番が一致しません。確認してください",
	文件名推导: "ファイル名から推定",
	"文件名是{0}的发行命名，{1} 部里 {2} 部命中、出演者 {3} 位轮换；疑似厂牌或系列，需查资料站或用户确认": "ファイル名が{0}の配信命名で、{1} 本中 {2} 本が一致し、出演者 {3} 人が入れ替わっています。メーカーまたはシリーズの可能性があるため、情報サイトで調べるかユーザーの確認が必要です",
	文件名模板: "ファイル名テンプレート",
	"文件名模板不能带目录分隔符；分层写在目录模板里": "ファイル名テンプレートにはディレクトリ区切り文字を含められません。階層はディレクトリテンプレートに書いてください",
	"文件和馆藏记录会永久删除，无法恢复。": "ファイルとコレクションの記録は完全に削除され、復元できません。",
	文件在隔离备份期间发生变化: "隔離バックアップ中にファイルが変更されました",
	文件头里没有认出尺寸: "ファイルヘッダーからサイズを判別できませんでした",
	文件夹: "フォルダ",
	文件夹导航: "フォルダナビゲーション",
	文件夹模式: "フォルダモード",
	文件夹目录: "フォルダ一覧",
	文件夹路径: "フォルダのパス",
	"文件已不在盘上，不能播放": "ファイルがディスク上にないため再生できません",
	"文件已不在盘上，含回收站": "ファイルがディスク上にありません（ゴミ箱を含む）",
	文件已消失的作品: "ファイルが消えた作品",
	"文件操作需要挂载工具和网盘账号授予写入权限。光鸭云盘的上传、建文件夹、改名和移动需要 CloudDrive2 v1.1.0 或更高版本，删除和复制暂不支持。": "ファイル操作には、マウントツールとクラウドストレージのアカウントに書き込み権限が必要です。光鸭云盘のアップロード、フォルダ作成、名前変更、移動には CloudDrive2 v1.1.0 以降が必要で、削除とコピーには現在対応していません。",
	文件整理未完成: "ファイル整理が完了しませんでした",
	"文件整理未完成：": "ファイル整理が完了していません：",
	"文件整理未完成：{0}": "ファイル整理が完了していません：{0}",
	文件未找到: "ファイルが見つかりません",
	"文件权限过宽。在运行 Peach 的 POSIX 主机上收紧为 0600。": "ファイルの権限が広すぎます。Peach を実行している POSIX ホストで 0600 に制限してください。",
	"文件监视不可用：{0}": "ファイル監視を利用できません：{0}",
	"文件监视启动失败：{0}": "ファイル監視の起動に失敗しました：{0}",
	文件类型: "ファイルの種類",
	文件缺失: "ファイルなし",
	文件路径: "ファイルパス",
	文件过大: "ファイルが大きすぎます",
	文字不透明度: "文字の不透明度",
	"文字检测模型不在 {0}，且不允许下载": "文字検出モデルが {0} になく、ダウンロードも許可されていません",
	"文字检测模型校验不符：期望 {0}，实际 {1}": "文字検出モデルの検証結果が一致しません：期待値 {0}、実際 {1}",
	文字颜色: "文字の色",
	"断言归其他写入者所有，保留断言": "アサーションは別の書き込み元が所有しているため、アサーションを保持します",
	"断言缺少来源、证据或有效置信度": "アサーションにソース、証拠、または有効な信頼度がありません",
	"新作已列出{0}": "新作を一覧表示しました{0}",
	"新作已收起{0}": "新作を折りたたみました{0}",
	新作显示: "新作の表示",
	新作自动滚动: "新作の自動スクロール",
	"新厂牌出现额外资料，拒绝回滚整批": "新しいメーカーに追加の情報があるため、バッチ全体の取り消しを拒否しました",
	新厂牌资料已发生后续改动: "新しいメーカーの情報はその後変更されています",
	新增: "追加",
	"新增 {0} 条": "{0} 件追加",
	新建: "新規作成",
	"新建“": "新規作成「",
	"新建“{0}”": "「{0}」を新規作成",
	新建失败: "作成に失敗しました",
	新建播放列表: "プレイリストを新規作成",
	新建目录: "新しいフォルダ",
	新建这个目录: "このディレクトリを新規作成",
	"新托盘已构建，但替换助手不完整；旧托盘和服务保持运行。": "新しいトレイはビルドされましたが、置き換えヘルパーが不完全です。旧トレイとサービスは稼働を続けています。",
	"新托盘已构建，但替换助手启动失败；旧托盘和服务保持运行。": "新しいトレイはビルドされましたが、置き換えヘルパーの起動に失敗しました。旧トレイとサービスは稼働を続けています。",
	"新托盘未通过打包迁移资源检查；旧托盘和服务保持运行。": "新しいトレイがパッケージ移行リソースのチェックに通りませんでした。旧トレイとサービスは稼働を続けています。",
	新托盘窗口未在期限内出现: "新しいトレイのウィンドウが期限内に表示されませんでした",
	"新托盘退出，代码 {0}": "新しいトレイが終了しました（コード {0}）",
	"新托盘（PID {0}）已起，但名下只有 {1} 个子服务：端口可能被不归它管的进程占着": "新しいトレイ（PID {0}）は起動しましたが、配下の子サービスは {1} 個だけです。管理外のプロセスがポートを使用している可能性があります",
	新播放列表: "新しいプレイリスト",
	新文件沿用此规则: "新しいファイルにもこのルールを適用",
	新文件落地就入库: "新しいファイルが届いたらすぐに取り込み",
	"新文案不能为空，且不能超过 2000 字": "新しい文言は空にできず、2000 文字以内にしてください",
	"新片：查不到也一直留在待找": "新作：見つからなくても探し中に残す",
	新版本未能就绪: "新しいバージョンの準備ができませんでした",
	新访问密码: "新しいアクセスパスワード",
	新身份出现额外作品关系: "新しい身元に追加の作品関係があります",
	新身份出现额外资料: "新しい身元に追加の情報があります",
	新身份已发生后续改动: "新しい身元はその後変更されています",
	无: "なし",
	无个人记录: "個人記録なし",
	无响应: "応答なし",
	无声版: "無音版",
	无封面: "カバーなし",
	无效: "無効",
	无法使用此数据目录: "このデータディレクトリは使用できません",
	"无法启动 amane 桥：{0}": "amane ブリッジを起動できません：{0}",
	"无法启动 uv：{0}": "uv を起動できません：{0}",
	"无法快进到 {0}；本地检出未改变，需要人工处理。": "{0} へ早送りできません。ローカルのチェックアウトは変更されていません。手動での対応が必要です。",
	"无法打开：{0}": "開けません：{0}",
	"无法执行：": "実行できません：",
	无法确定源码服务的局域网地址: "ソースサービスの LAN アドレスを特定できません",
	"无法自动配置媒体目录，请检查配置文件中的目录对应关系": "メディアディレクトリを自動構成できません。構成ファイルのディレクトリ対応関係を確認してください",
	无法识别这张备选图片: "この候補画像を認識できません",
	"无法读取 115 媒体目录，请检查目录权限及网盘挂载工具是否正常运行。": "115 のメディアディレクトリを読み取れません。ディレクトリの権限と、クラウドストレージのマウントツールが正常に動作しているかを確認してください。",
	"无法读取 PikPak 媒体目录，请检查目录权限及网盘挂载工具是否正常运行。": "PikPak のメディアディレクトリを読み取れません。ディレクトリの権限と、クラウドストレージのマウントツールが正常に動作しているかを確認してください。",
	"无法读取 {0} 的磁盘余量": "{0} のディスク空き容量を読み取れません",
	"无法读取写入端：{0}: {1}": "書き込み元を読み取れません：{0}: {1}",
	"无法读取写入端：{0}: {1}；系统网络通道：{2}": "書き込み元を読み取れません：{0}: {1}。システムのネットワーク経路：{2}",
	"无法读取媒体目录，请检查目录是否存在及读取权限。": "メディアディレクトリを読み取れません。ディレクトリが存在するか、読み取り権限があるかを確認してください。",
	"无法读取这个来源的媒体目录，请检查目录权限及挂载状态。": "このソースのメディアディレクトリを読み取れません。ディレクトリの権限とマウント状態を確認してください。",
	"无法连接 GitHub，请重试。": "GitHub に接続できません。再試行してください。",
	"无法连接到 Peach 服务，请确认网络连接和托盘服务已启动。": "Peach サービスに接続できません。ネットワーク接続とトレイサービスが起動しているかを確認してください。",
	"无法连接更新源；本地版本未改变。": "更新ソースに接続できません。ローカルのバージョンは変更されていません。",
	无源或停滞: "ソースなし、または停滞",
	无码: "無修正",
	无码破解: "モザイク破壊",
	无衬线: "サンセリフ",
	无需整理: "整理は不要です",
	无预览: "プレビューなし",
	"既有 CloudDrive 令牌未取得": "既存の CloudDrive トークンを取得できませんでした",
	"既有 CloudDrive 直链认证未取得": "既存の CloudDrive 直リンク認証を取得できませんでした",
	"既有 CloudDrive 认证样本未取得": "既存の CloudDrive 認証サンプルを取得できませんでした",
	"既有 PikPak WebDAV 来源未取得": "既存の PikPak WebDAV ソースを取得できませんでした",
	"既有 WebDAV 认证未取得": "既存の WebDAV 認証を取得できませんでした",
	既有直链来源或路径不符: "既存の直リンクのソースまたはパスが一致しません",
	日志目录: "ログディレクトリ",
	日文: "日本語",
	日期: "日付",
	日期未知: "日付不明",
	日本: "日本",
	"日本 AV": "日本 AV",
	日本語: "日本語",
	日系同人: "日本系同人",
	日语: "日本語",
	旧: "旧",
	旧名: "旧名",
	旧名义: "旧名義",
	旧名義: "旧名義",
	"旧托盘已退出，但它的子服务未在期限内退出；未另启": "旧トレイは終了しましたが、その子サービスが期限内に終了しなかったため、新たに起動していません",
	旧格式种子版本不得回退: "旧形式のシードバージョンは巻き戻せません",
	旧芸名: "旧芸名",
	"旧行 {0} 的 id 或路径已被占用，不能撤回": "旧行 {0} の id またはパスがすでに使用されているため、元に戻せません",
	时长: "再生時間",
	时长偏好: "再生時間の好み",
	"时长差 {0} 秒": "再生時間の差 {0} 秒",
	时长推断: "再生時間から推定",
	"时长（秒）": "再生時間（秒）",
	时间未取得: "日時未取得",
	时间轴缩略图: "タイムラインのサムネイル",
	时间轴预览: "タイムラインプレビュー",
	明暗主题: "ライト／ダークテーマ",
	明确不喜欢: "はっきり好きではない",
	"星期 × 小时": "曜日 × 時間",
	是: "はい",
	是厂牌或系列: "メーカーまたはシリーズです",
	是同一个人: "同一人物",
	"是同一个人吗？": "同一人物ですか？",
	"显示前 24,000 个字符，下载可查看完整内容。": "先頭 24,000 文字を表示しています。全文はダウンロードして確認できます。",
	"显示前 {0} 条，共 {1} 条；处理掉这些后，其余的会补上来。": "全 {1} 件中、先頭 {0} 件を表示しています。これらを処理すると、残りが表示されます。",
	"显示前 {0} 部，共 {1} 部。": "全 {1} 本中、先頭 {0} 本を表示しています。",
	显示剩余时间: "残り時間を表示",
	"显示可回收最多的前 {0} 组，共 {1} 组；处理掉这些后，其余的会补上来。": "回収できる量が多い順に全 {1} グループ中、先頭 {0} グループを表示しています。これらを処理すると、残りが表示されます。",
	显示已播放时间: "再生済み時間を表示",
	显示结果: "結果を表示",
	"显示顺序本来就等于解码顺序，没有要修的": "表示順はもともとデコード順と同じなので、修正するものはありません",
	暂不支持: "未対応",
	"暂不支持 Content Steering 播放列表": "Content Steering プレイリストにはまだ対応していません",
	暂停: "一時停止",
	"暂存包不存在：{0}": "ステージングパッケージが存在しません：{0}",
	暂存包与生产入口是同一个文件: "ステージングパッケージと本番エントリが同じファイルです",
	暂无匹配口味的作品: "好みに合う作品はまだありません",
	暂无口味维度: "好みの指標はまだありません",
	暂无可用来源: "利用できるソースがありません",
	暂无待确认标签: "確認待ちのタグはありません",
	暂无接着看的内容: "続きを見る作品はありません",
	暂无数据: "データがありません",
	"暂无本地作品样本，打开全部作品核对。": "ローカル作品のサンプルがありません。すべての作品を開いて確認してください。",
	暂无符合条件的作品: "条件に合う作品はありません",
	暂无评论: "コメントはありません",
	暂无足够证据: "十分な根拠がありません",
	暂无预览: "プレビューなし",
	暂时放弃: "いったん保留",
	暂时无法检查安装进度: "現在インストールの進捗を確認できません",
	"暂时无法读取进度，正在重新连接…": "現在進捗を読み取れません。再接続しています…",
	"暂未找到可下载的测试版。": "ダウンロードできるベータ版はまだ見つかりません。",
	"暂未找到资源链接。": "リソースリンクは見つかりませんでした。",
	暗红: "ダークレッド",
	暮紫: "トワイライトパープル",
	更多取得浏览记录的方式: "閲覧履歴を取得するその他の方法",
	更多同步方式: "その他の同期方法",
	更多字幕: "その他の字幕",
	更多操作: "その他の操作",
	更多评论: "その他のコメント",
	"更多资源（{0} 条）": "その他のリソース（{0} 件）",
	"更换{0}的头像": "{0}のアバターを変更",
	更换头像: "アバターを変更",
	更换密钥: "キーを変更",
	更改统称: "総称を変更",
	"更新 {0} 条": "{0} 件更新",
	"更新于 {0}": "{0} に更新",
	"更新任务尚未结束，请完成后卸载": "更新タスクがまだ終わっていません。完了してからアンインストールしてください",
	"更新任务已中断，请重试。": "更新タスクが中断されました。再試行してください。",
	更新关注状态: "フォロー状態を更新",
	更新准备进度: "アップデートの準備状況",
	"更新包不是独立 Windows 版本": "更新パッケージがスタンドアロン Windows 版ではありません",
	更新包含无效路径: "更新パッケージに無効なパスが含まれています",
	更新包大小无效: "更新パッケージのサイズが無効です",
	更新包展开体积超限: "更新パッケージの展開後サイズが上限を超えています",
	更新包工具下载信息无效: "更新パッケージのツールダウンロード情報が無効です",
	更新包工具文件清单无效: "更新パッケージのツールファイル一覧が無効です",
	更新包工具清单无效: "更新パッケージのツールマニフェストが無効です",
	更新包工具清单缺少必需文件: "更新パッケージのツールマニフェストに必須ファイルがありません",
	"更新包校验失败，请重新下载": "更新パッケージの検証に失敗しました。ダウンロードし直してください",
	"更新包缺少 SHA-256 校验信息": "更新パッケージに SHA-256 検証情報がありません",
	更新包路径重复或越界: "更新パッケージのパスが重複しているか、範囲外です",
	更新反馈: "フィードバックを更新",
	"更新失败，回滚未完成：{0}": "更新に失敗し、ロールバックが完了しませんでした：{0}",
	"更新失败，已恢复旧版本：{0}": "更新に失敗したため、旧バージョンに戻しました：{0}",
	"更新失败，数据库恢复未完成：{0}": "更新に失敗し、データベースの復元が完了しませんでした：{0}",
	更新媒体工具: "メディアツールを更新",
	"更新安装预约已失效，请重新准备更新。": "更新インストールの予約が無効になりました。更新を準備し直してください。",
	更新尚未准备完成: "更新の準備がまだ完了していません",
	更新已准备好: "アップデートの準備ができました",
	"更新已准备好，重启后安装。": "更新の準備ができました。再起動後にインストールされます。",
	更新时间: "更新日時",
	"更新未安装：{0}": "更新はインストールされませんでした：{0}",
	更新渠道与令牌: "アップデートチャンネルとトークン",
	"更新源已连接，但当前分支没有对应的跟踪分支。": "更新ソースに接続しましたが、現在のブランチに対応する追跡ブランチがありません。",
	"更新源已连接，但无法比较版本。": "更新ソースに接続しましたが、バージョンを比較できません。",
	更新版本需求: "必要バージョンを更新",
	更新状态文件不匹配: "更新状態ファイルが一致しません",
	更新目录无效: "更新ディレクトリが無効です",
	更新稍后看: "あとで見るを更新",
	更新资料: "情報を更新",
	更新通道: "アップデートチャンネル",
	"更新通道 · GitHub 测试版": "更新チャンネル · GitHub ベータ版",
	"更新通道 · {0}": "更新チャンネル · {0}",
	"更新通道有 {0} 个新提交，但本地检出有未提交修改；先处理掉再同步。": "更新チャンネルに新しいコミットが {0} 件ありますが、ローカルのチェックアウトに未コミットの変更があります。先に片付けてから同期してください。",
	"曾解析成功，近期解析状态待复查": "以前は解析に成功しました。最近の解析状態は再確認待ちです",
	"最多保存 100 个筛选": "保存できる絞り込みは最大 100 件です",
	"最多保存 {0} 个来源": "保存できるソースは最大 {0} 件です",
	"最多收藏 1000 项": "お気に入りは最大 1000 件です",
	"最多配置 {0} 个索引器": "構成できるインデクサーは最大 {0} 件です",
	最大: "最大",
	"最大体积（GiB）": "最大サイズ（GiB）",
	最大的一个: "最大のもの",
	"最小体积（GiB）": "最小サイズ（GiB）",
	最快: "最速",
	最慢: "最遅",
	"最新测试版：{0}。": "最新のベータ版：{0}。",
	最新版本: "最新バージョン",
	"最短时长（分钟）": "最短再生時間（分）",
	"最近 30 天": "過去 30 日",
	"最近 7 天": "過去 7 日",
	"最近 90 天": "過去 90 日",
	最近一年: "過去 1 年",
	"最近一秒下载 {0}": "直近 1 秒のダウンロード {0}",
	"最近一秒下载 {0} 秒": "直近 1 秒のダウンロード {0} 秒",
	"最近一秒网络活动 {0}": "直近 1 秒のネットワーク通信 {0}",
	最近使用: "最近使用",
	最近完成: "最近完了",
	最近看过: "最近視聴済み",
	最长: "最長",
	"最长时长（分钟）": "最長再生時間（分）",
	最长的一个: "最長のもの",
	有几项需要修改: "修正が必要な項目があります",
	有创作者: "クリエイターあり",
	有厂牌: "メーカーあり",
	有可用更新: "アップデートがあります",
	有帧没有时间戳: "タイムスタンプのないフレームがあります",
	"有新版本可下载。": "新しいバージョンをダウンロードできます。",
	有标签: "タグあり",
	有番号: "品番あり",
	有码: "モザイクあり",
	有码无码: "モザイクあり / 無修正",
	有磁链: "マグネットリンクあり",
	有身份: "エンティティあり",
	"服务关停，这一轮没有跑完": "サービスが停止したため、今回の実行は完了しませんでした",
	服务器证书不存在: "サーバー証明書が存在しません",
	"服务处理失败，请导出诊断报告": "サービスの処理に失敗しました。診断レポートをエクスポートしてください",
	服务端口: "サービスポート",
	服务端拒绝了这次判定: "サーバーがこの判定を拒否しました",
	服务端拒绝了这次收录: "サーバーがこの登録を拒否しました",
	服务端未采用该项: "サーバーはこの項目を採用しませんでした",
	"服务重启，这一轮没有跑完": "サービスが再起動したため、今回の実行は完了しませんでした",
	"未保存，登录过期后需要回到这里重新登录": "保存されません。ログインの有効期限が切れたら、ここに戻って再ログインする必要があります",
	未入库的新作: "未取り込みの新作",
	未判定: "未判定",
	未发售: "未発売",
	未取得: "未取得",
	"未取得 uv：PATH 与 winget 安装目录里都没有": "uv を取得できませんでした：PATH にも winget のインストールディレクトリにもありません",
	"未取得各层 Job 句柄与归属；仅记录已知进程和直接 Job": "各階層の Job ハンドルと所属を取得できませんでした。既知のプロセスと直接の Job のみ記録します",
	未取得在线备选头像: "オンラインの候補アバターを取得できませんでした",
	"未取得当前会话的 Windows 桌面进程，请确认已登录 Windows 桌面": "現在のセッションの Windows デスクトッププロセスを取得できませんでした。Windows デスクトップにサインインしているか確認してください",
	"未取得无 JavDB 水印的封面": "JavDB の透かしがないカバーを取得できませんでした",
	未取得来源图片: "ソース画像を取得できませんでした",
	"未取得统计数据，请刷新页面重试。": "統計データを取得できませんでした。ページを再読み込みして再試行してください。",
	未取得这个番号的作品资料: "この品番の作品情報を取得できませんでした",
	"未取得配置，请刷新页面重试。": "構成を取得できませんでした。ページを再読み込みして再試行してください。",
	"未取得重复文件列表，请刷新页面重试。": "重複ファイルの一覧を取得できませんでした。ページを再読み込みして再試行してください。",
	"未取得高清版目标，请刷新页面重试。": "高画質版の対象を取得できませんでした。ページを再読み込みして再試行してください。",
	"未取得：{0}": "取得できませんでした：{0}",
	未启用: "無効",
	未命中: "一致なし",
	"未命中：{0}": "一致なし：{0}",
	"未命中：档案已不存在": "一致なし：プロフィールがすでに存在しません",
	"未命中：没有能拿去检索的名字": "一致なし：検索に使える名前がありません",
	未命名作品: "無題の作品",
	未命名内容: "無題のコンテンツ",
	未命名图片: "無題の画像",
	未命名播放列表: "無題のプレイリスト",
	未命名新作: "無題の新作",
	未命名视频: "無題の動画",
	未命名资源: "無題のリソース",
	未在冷却: "クールダウン中ではありません",
	未填写: "未入力",
	未安装: "未インストール",
	"未安装；MP4 可直接播放，转码和缩略图需要安装 FFmpeg。": "未インストールです。MP4 はそのまま再生できますが、トランスコードとサムネイルには FFmpeg のインストールが必要です。",
	"未安装；缺索引的 MP4 需要它才修得了。": "未インストールです。インデックスのない MP4 を修復するには必要です。",
	未开始: "未開始",
	"未开放的 amane 站点：": "公開されていない amane サイト：",
	未归属: "未割り当て",
	未找到: "見つかりません",
	"未找到 FFmpeg，无法生成预览图，请在诊断页检查工具状态": "FFmpeg が見つからないため、プレビュー画像を生成できません。診断ページでツールの状態を確認してください",
	"未找到 ffmpeg，无法采集缩略图": "ffmpeg が見つからないため、サムネイルを収集できません",
	"未找到 ffprobe，无法读取视频时长": "ffprobe が見つからないため、動画の再生時間を読み取れません",
	"未找到 uv，请先安装 uv 再重建 amane 桥": "uv が見つかりません。uv をインストールしてから amane ブリッジを再構築してください",
	"未找到可自动下载的磁力，可重试": "自動ダウンロードできるマグネットが見つかりません。再試行できます",
	未找到本机托盘入口: "このマシンのトレイのエントリが見つかりません",
	"未找到该来源尚未过期的 Cookie": "このソースの有効期限内の Cookie が見つかりません",
	"未找到：": "見つかりません：",
	未支持的发行方: "未対応の配信元",
	"未收录 genre": "未登録の genre",
	"未收录 genre · {0}": "未登録の genre · {0}",
	未映射: "未マッピング",
	未标注: "未記入",
	未标注字段: "未記入のフィールド",
	未标注来源: "ソース未記入",
	未检查: "未チェック",
	未检测: "未検出",
	未检测到: "検出されませんでした",
	"未检测到 {0}。": "{0} が検出されませんでした。",
	"未登记的补齐判据：{0}": "登録されていない補完判定基準：{0}",
	未看: "未視聴",
	"未看 {0} · 已启用 {1} / {2}": "未視聴 {0} · 有効 {1} / {2}",
	"未看 {0} · 已看 {1} · 已保存 {2} · 已忽略 {3}": "未視聴 {0} · 視聴済み {1} · 保存済み {2} · 無視 {3}",
	未看新作: "未視聴の新作",
	未看更新: "未視聴の更新",
	未知: "不明",
	"未知 Peach 元数据字段：": "不明な Peach メタデータフィールド：",
	"未知内容类型：": "不明なコンテンツタイプ：",
	未知断言状态: "不明なアサーション状態",
	"未知来源：": "不明なソース：",
	"未知的 f95zone 分类：{0}": "不明な f95zone カテゴリ：{0}",
	"未知的 kemono 系来源：{0}": "不明な kemono 系ソース：{0}",
	"未知的冲突处理方式：{0}": "不明な競合処理方法：{0}",
	"未知的失败类别：{0}": "不明な失敗カテゴリ：{0}",
	"未知的状态：{0}": "不明な状態：{0}",
	"未知的触发方式：{0}": "不明なトリガー方式：{0}",
	"未知的追更来源：{0}": "不明な更新追跡ソース：{0}",
	"未知的追更状态：{0}": "不明な更新追跡状態：{0}",
	未知身份分类: "不明な身元カテゴリ",
	未知采集来源: "不明な収集ソース",
	"未能取得版本信息，请重试。": "バージョン情報を取得できませんでした。再試行してください。",
	"未能重启：{0}": "再起動できませんでした：{0}",
	"未设置密码时，能连接到 Peach 的设备可直接进入。": "パスワードが未設定の場合、Peach に接続できるデバイスはそのまま入れます。",
	未设置访问密码: "アクセスパスワード未設定",
	未评分: "未評価",
	未识别: "未識別",
	未说明原因: "理由の説明なし",
	未过期: "期限内",
	未选: "未選択",
	未选择文件: "ファイルが選択されていません",
	未配置: "未構成",
	"未配置可严格校验的写入端 HTTPS": "厳密に検証できる書き込み元の HTTPS が構成されていません",
	未配置挂载点: "マウントポイント未構成",
	未配置整理模板: "整理テンプレートが構成されていません",
	本地: "ローカル",
	"本地 NFO": "ローカル NFO",
	"本地 {0} 分、来源 {1} 分，差 {2} 秒{3}": "ローカル {0} 分、ソース {1} 分、差 {2} 秒{3}",
	本地作品样本: "ローカル作品のサンプル",
	"本地副本不存在，从共享副本拉取": "ローカルコピーが存在しないため、共有コピーから取得します",
	本地副本更新: "ローカルコピーを更新",
	本地图片: "ローカル画像",
	本地封面无法读取: "ローカルのカバーを読み取れません",
	"本地工具包校验失败：{0}。请重新下载或移走此文件后重试。": "ローカルのツールパッケージの検証に失敗しました：{0}。ダウンロードし直すか、このファイルを移動してから再試行してください。",
	"本地开发版 · 未配置更新源": "ローカル開発版 · 更新ソース未構成",
	本地文件分片标记不同: "ローカルファイルの分割マークが異なります",
	本地有待回写的改动: "書き戻し待ちのローカル変更があります",
	本地来源在这台机器上没有可监视的目录: "ローカルソースにこのマシンで監視できるディレクトリがありません",
	本地磁盘: "ローカルディスク",
	本地通道没有打开: "ローカルチャンネルが開いていません",
	"本地领先 {0} 个提交，远端领先 {1} 个提交；需要人工合并。": "ローカルが {0} コミット先行、リモートが {1} コミット先行しています。手動でのマージが必要です。",
	"本月还剩 {0} 条，共 {1} 条": "今月の残り {0} 件（全 {1} 件）",
	本机: "このデバイス",
	"本机凭据文件读不出来，请在设置页重新填写：{0}": "このマシンの認証情報ファイルを読み取れません。設定ページで入力し直してください：{0}",
	本机只能浏览: "このデバイスは閲覧のみ",
	"本机封面 {0} × {1}，来源可用封面 {2} × {3}；保留本机封面。{4}": "このマシンのカバー {0} × {1}、ソースで利用できるカバー {2} × {3}。このマシンのカバーを保持します。{4}",
	"本机封面读取或保存失败，请检查封面目录权限与磁盘空间。": "このマシンのカバーの読み取りまたは保存に失敗しました。カバーディレクトリの権限とディスク容量を確認してください。",
	本机已成为唯一写入端: "このマシンが唯一の書き込み元になりました",
	本机当前只能浏览: "このデバイスは現在閲覧のみです",
	本机是写入端: "このマシンが書き込み元です",
	"本机是写入端；{0}": "このマシンが書き込み元です。{0}",
	"本机没有 device-id，判不出是不是写入端": "このマシンに device-id がないため、書き込み元かどうか判定できません",
	本机没有映射这个来源的盘符: "このデバイスにはこのソースのドライブレターが割り当てられていません",
	"本机直接使用共享副本，不需要复制": "このマシンは共有コピーを直接使うため、コピーは不要です",
	本机访问端口: "このデバイスのアクセスポート",
	"本次更新包含媒体工具。": "今回のアップデートにはメディアツールが含まれます。",
	本次未访问成功: "今回はアクセスに成功しませんでした",
	"本趟下载量已用完，再跑一次接着采；已有图片保留": "今回のダウンロード量を使い切りました。もう一度実行すると続きから収集します。既存の画像は保持されます",
	本趟处理: "今回の処理",
	"本趟处理（已登记文件，未含未知新增）": "今回の処理（登録済みファイル、不明な新規ファイルは含まない）",
	"本趟采集时间已用完，再跑一次接着采；已有图片保留": "今回の収集時間を使い切りました。もう一度実行すると続きから収集します。既存の画像は保持されます",
	"本趟采集次数已用完，再跑一次接着采；已有图片保留": "今回の収集回数を使い切りました。もう一度実行すると続きから収集します。既存の画像は保持されます",
	本轮作品资料预算已用完: "今回の作品情報の予算を使い切りました",
	本轮时间预算已用完: "今回の時間予算を使い切りました",
	本轮流量预算已用完: "今回の通信量予算を使い切りました",
	本轮请求预算已用完: "今回のリクエスト予算を使い切りました",
	朱红: "朱色",
	机构: "事務所",
	"机械硬盘，或内存 8 GB 以内": "HDD、またはメモリ 8 GB 以下",
	杏橙: "アプリコット",
	条: "件",
	条作品: "件の作品",
	条历史: "件の履歴",
	"条历史 ·": "件の履歴 ·",
	"条无编号馆藏的汇总，约": "件の品番なしコレクション項目の集計、約",
	条标签: "件のタグ",
	条目: "項目",
	"条目已保存，但这次未保存来源的原始响应：{0}": "項目は保存しましたが、今回はソースの元のレスポンスを保存できませんでした：{0}",
	条线索: "件の手がかり",
	条记录: "件の記録",
	"条评论，其余评论可在 JavDB 查看。": "件のコメント。その他のコメントは JavDB で確認できます。",
	条链接: "件のリンク",
	来源: "ソース",
	"来源 {0} 已注入核验改名": "ソース {0} に検証済みの名前変更を注入しました",
	"来源 {0} 的挂载改名无法核验云端结果，整批未执行；须经官方核验通道（如 organize_library_dirs.py --pikpak-webdav）": "ソース {0} のマウント上の名前変更はクラウド側の結果を検証できないため、バッチ全体を実行していません。公式の検証経路（organize_library_dirs.py --pikpak-webdav など）を通す必要があります",
	"来源 {0} 的挂载改名无法核验云端结果，须经官方核验通道": "ソース {0} のマウント上の名前変更はクラウド側の結果を検証できません。公式の検証経路を通す必要があります",
	"来源 · {0}": "ソース · {0}",
	"来源不在线，这一次不对账；接上这个来源后重试": "ソースがオフラインのため、今回は照合しません。このソースに接続してから再試行してください",
	"来源不存在，请刷新": "ソースが存在しません。再読み込みしてください",
	来源与订阅: "ソースと購読",
	来源与订阅设置: "ソースと購読の設定",
	"来源与订阅设置{0}": "ソースと購読の設定{0}",
	"来源代理设置不同，请先在配置页选择 Peach 代理": "ソースのプロキシ設定が異なります。先に構成ページで Peach プロキシを選択してください",
	来源会话: "ソースのセッション",
	来源作品身份不匹配: "ソースの作品の身元が一致しません",
	"来源值含重复片段，已规范化：{0} → {1}": "ソースの値に重複部分があったため正規化しました：{0} → {1}",
	"来源写法：{0}": "ソースでの表記：{0}",
	来源凭据: "ソースの認証情報",
	来源凭据未取得: "ソースの認証情報を取得できませんでした",
	"来源发行日期无效，已忽略：{0}": "ソースの発売日が無効なため無視しました：{0}",
	"来源发行时间已规范化为日期：{0} → {1}": "ソースの発売日時を日付に正規化しました：{0} → {1}",
	"来源只返回了部分评论，资源链接可能不完整。": "ソースから一部のコメントしか返されなかったため、リソースリンクが不完全な可能性があります。",
	来源可读取: "ソースを読み取れます",
	来源名称: "ソース名",
	"来源名称需要 1–80 个字符": "ソース名は 1～80 文字にしてください",
	来源和凭证: "ソースと認証情報",
	"来源响应 HTTP {0}": "ソースの応答 HTTP {0}",
	"来源响应不是有效 JSON": "ソースの応答が有効な JSON ではありません",
	"来源响应超过 1 MiB": "ソースの応答が 1 MiB を超えています",
	"来源回了 HTTP {0}": "ソースが HTTP {0} を返しました",
	来源域名必须解析到公网地址: "ソースのドメインはパブリックアドレスに解決される必要があります",
	"来源大小：{0}": "ソースのサイズ：{0}",
	来源媒体地址不可用: "ソースのメディア URL を利用できません",
	来源建议: "ソースの候補",
	来源拒绝访问或要求机器人验证: "ソースがアクセスを拒否したか、ボット認証を要求しています",
	"来源拒绝访问（HTTP {0}），请检查登录或来源验证状态。": "ソースがアクセスを拒否しました（HTTP {0}）。ログインまたはソースの認証状態を確認してください。",
	"来源拒绝访问，暂停向它请求一段时间；已有图片保留": "ソースがアクセスを拒否したため、しばらくリクエストを停止します。既存の画像は保持されます",
	"来源拒绝访问，暂停向它请求一段时间；请在采集设置里更新它的 Cookie；已有图片保留": "ソースがアクセスを拒否したため、しばらくリクエストを停止します。収集設定でこのソースの Cookie を更新してください。既存の画像は保持されます",
	来源拦截当前出口: "ソースが現在の接続元をブロックしています",
	来源提供的备选图片: "ソースが提供する代替画像",
	来源数量: "ソース数",
	来源时长: "ソースの再生時間",
	"来源暂不可用，请稍后重试。": "ソースは一時的に利用できません。しばらくしてから再試行してください。",
	"来源暂时不可用，已停止读取": "ソースが一時的に利用できないため、読み取りを停止しました",
	来源服务异常: "ソースのサービスに異常があります",
	"来源服务异常（HTTP 5xx），请稍后重试。": "ソースのサービスに異常があります（HTTP 5xx）。しばらくしてから再試行してください。",
	来源未取得资料: "ソースから情報を取得できませんでした",
	来源未挂载: "ソースがマウントされていません",
	来源未知: "ソース不明",
	来源查询已超时: "ソースへの問い合わせがタイムアウトしました",
	"来源检查地址不存在，请核对站点地址。": "ソースのチェック先アドレスが存在しません。サイトのアドレスを確認してください。",
	来源正在冷却: "ソースはクールダウン中です",
	"来源正在冷却，截止": "ソースはクールダウン中です。解除予定：",
	"来源正在冷却，截止 {0}": "ソースはクールダウン中です（{0} まで）",
	"来源正在冷却，请稍后重试。": "ソースはクールダウン中です。しばらくしてから再試行してください。",
	"来源正在冷却，请稍后重试；已有图片保留": "ソースはクールダウン中です。しばらくしてから再試行してください。既存の画像は保持されます",
	来源正在限流: "ソースはレート制限中です",
	"来源正在限流，请稍后重试。": "ソースはレート制限中です。しばらくしてから再試行してください。",
	来源没有给片长: "ソースが再生時間を提供していません",
	"来源没有返回这个番号的封面候选，无法判断是否有高清版。": "ソースがこの品番のカバー候補を返さなかったため、高画質版があるか判断できません。",
	"来源演员名含重复片段，已规范化：{0} → {1}": "ソースの出演者名に重複部分があったため正規化しました：{0} → {1}",
	"来源的人机验证没有在限时内通过，暂停向它请求一段时间；浏览器窗口再弹出时点一下验证即可；已有图片保留": "ソースの人間認証が制限時間内に通らなかったため、しばらくリクエストを停止します。ブラウザーウィンドウが再び表示されたら認証をクリックしてください。既存の画像は保持されます",
	来源筛选: "ソースで絞り込み",
	"来源给的封面 {0}×{1} 未提高本机封面质量": "ソースのカバー {0}×{1} はこのマシンのカバーより画質が向上しません",
	"来源给的是「准备中」占位图": "ソースから返されたのは「準備中」のプレースホルダー画像です",
	来源网站: "ソースサイト",
	来源网站与创作者线索: "ソースサイトとクリエイターの手がかり",
	来源要求人机验证: "ソースが人間認証を要求しています",
	来源要求登录或拒绝当前出口: "ソースがログインを要求しているか、現在の接続元を拒否しています",
	"来源要求登录或验证，请在官网完成登录后重试。": "ソースがログインまたは認証を要求しています。公式サイトでログインしてから再試行してください。",
	来源设置已保存: "ソース設定を保存しました",
	来源评分: "ソースの評価",
	"来源评分 {0} / 5": "ソースの評価 {0} / 5",
	来源资料: "ソースの情報",
	"来源返回 {0}": "ソースが {0} を返しました",
	"来源返回 {0} 个链接；候选只保留前 {1} 个，完整值仍在原始快照": "ソースが {0} 件のリンクを返しました。候補には先頭の {1} 件のみ残し、完全な値は元のスナップショットにあります",
	"来源返回 {0}，{1}": "ソースが {0} を返しました。{1}",
	"来源返回 {0}：可能是凭据失效，也可能是出口 IP 被封，先看站点是否要求登录再决定换凭据还是等": "ソースが {0} を返しました。認証情報の失効か、接続元 IP のブロックが考えられます。サイトがログインを要求しているか確認してから、認証情報を変えるか待つかを決めてください",
	"来源返回人机验证页，请检查来源验证状态或更换出口。": "ソースが人間認証ページを返しました。ソースの認証状態を確認するか、接続元を変更してください。",
	"来源返回的不是 {0}：id={1} content_id={2}": "ソースから返されたのは {0} ではありません：id={1} content_id={2}",
	来源返回的番号与查询番号不一致: "ソースが返した品番が検索した品番と一致しません",
	来源连接失败: "ソースへの接続に失敗しました",
	"来源连接失败，未能完成封面比较；请检查来源连接设置。": "ソースへの接続に失敗したため、カバーの比較を完了できませんでした。ソースの接続設定を確認してください。",
	"来源连接失败，请检查来源连接设置": "ソースへの接続に失敗しました。ソースの接続設定を確認してください",
	"来源连接失败，请检查来源连接设置；已有图片保留。": "ソースへの接続に失敗しました。ソースの接続設定を確認してください。既存の画像は保持されます。",
	来源连接方式: "ソースの接続方法",
	来源连接未取得: "ソースへの接続を取得できませんでした",
	"来源连接未取得，请检查该来源的网络设置": "ソースへの接続を取得できませんでした。このソースのネットワーク設定を確認してください",
	来源连接超时: "ソースへの接続がタイムアウトしました",
	"来源连接超时，请稍后重试或检查连接方式。": "ソースへの接続がタイムアウトしました。しばらくしてから再試行するか、接続方法を確認してください。",
	来源配置必须是对象: "ソースの構成はオブジェクトである必要があります",
	"来源链 {0} 上都没有这个番号的资料": "ソースチェーン {0} のどこにもこの品番の情報がありません",
	"来源链接、名字或 id": "ソースのリンク、名前または ID",
	"来源链覆盖要写成 `类型=来源,来源`": "ソースチェーンの上書きは `種類=ソース,ソース` の形式で書いてください",
	来源限制当前地区: "ソースが現在の地域を制限しています",
	来源限流冷却中: "ソースのレート制限によるクールダウン中",
	"来源限流（429）": "ソースのレート制限（429）",
	"来源限流，已记录冷却时间；已有图片保留": "ソースのレート制限により、クールダウン時間を記録しました。既存の画像は保持されます",
	来源页: "ソースページ",
	来源页面: "ソースページ",
	"来源：{0}": "ソース：{0}",
	"来自共享，留空表示不改": "共有から取得。空欄のままなら変更しません",
	松绿: "パイングリーン",
	枚书签: "件のブックマーク",
	柔化: "ぼかし",
	柠绿: "ライムグリーン",
	查创作者身份: "クリエイターの身元を調べる",
	查找: "検索",
	"查找中…（首次按名字查要下载创作者索引，可能几十秒）": "検索中…（初回の名前検索ではクリエイター索引をダウンロードするため、数十秒かかる場合があります）",
	"查找中：{0}/{1}": "検索中：{0}/{1}",
	"查找关注来源：{0} 个来源已查完": "フォローソースの検索：{0} 件のソースを確認しました",
	"查找关注来源：来源 {0}/{1} · {2}": "フォローソースの検索：ソース {0}/{1} · {2}",
	查找失败: "検索に失敗しました",
	查找文件夹: "フォルダを検索",
	查找目标目录: "対象ディレクトリを検索",
	查找结果: "検索結果",
	查找资源: "リソースを検索",
	查推送发现的云端路径前缀: "プッシュで見つかったクラウド上のパス接頭辞を調べる",
	查无此人: "該当者なし",
	查目标目录里的文件: "対象ディレクトリ内のファイルを調べる",
	查看: "表示",
	"查看 {0}": "{0} を表示",
	"查看 {0} 的作者页": "{0} の作者ページを表示",
	"查看 {0} 详情": "{0} の詳細を表示",
	查看任务: "タスクを表示",
	查看作品与订阅新作: "作品と購読中の新作を表示",
	查看全部: "すべて表示",
	"查看全部 {0} 部作品": "{0} 本の作品をすべて表示",
	查看全部内容: "すべての内容を表示",
	查看全部视频: "すべての動画を表示",
	查看内置站点: "内蔵サイトを表示",
	查看发布页: "リリースページを表示",
	查看口味: "好みを表示",
	查看图片: "画像を表示",
	查看处理详情: "処理の詳細を表示",
	查看并处理: "確認して処理",
	查看归属冲突: "割り当ての競合を表示",
	查看来源图片: "ソース画像を表示",
	查看来源页: "ソースページを表示",
	查看版本: "バージョンを表示",
	查看离线任务与配额: "オフラインタスクとクォータを表示",
	"查看第 {0} 张图片": "{0} 枚目の画像を表示",
	查看详情: "詳細を表示",
	查看配置: "構成を表示",
	查离线任务: "オフラインタスクを調べる",
	查离线配额: "オフラインのクォータを調べる",
	查询外部资料: "外部の情報を照会",
	"查过 {0} 次": "{0} 回検索済み",
	"查过 {0} 次都没找到": "{0} 回検索しても見つかりませんでした",
	标为不喜欢: "好きではないとしてマーク",
	标为已看过: "視聴済みにする",
	"标为已看过 {0}": "{0} を視聴済みにする",
	标为看过: "視聴済みにする",
	标准: "標準",
	标签: "タグ",
	"标签「{0}」已存在": "タグ「{0}」はすでに存在します",
	标签云: "タグクラウド",
	标签候选为空: "タグ候補が空です",
	标签候选必须是数组: "タグ候補は配列である必要があります",
	标签偏好: "タグの好み",
	"标签名须为 1 到 80 个字符，且不能是出演者标记": "タグ名は 1～80 文字で、出演者マークにはできません",
	标签命中: "タグの一致",
	标签接近: "タグが近い",
	标签未删除: "タグは削除されていません",
	标签来源: "タグのソース",
	标签筛选: "タグで絞り込み",
	标签类型: "タグの種類",
	标签视图: "タグ表示",
	"标签（文本数组）": "タグ（テキスト配列）",
	标记为已看: "視聴済みにする",
	标记为非垃圾: "スパムではないとしてマーク",
	标记已忽略: "無視としてマーク",
	标记已看: "視聴済みにする",
	标题: "タイトル",
	"标题候选为空、过长或含控制字符": "タイトル候補が空か、長すぎるか、制御文字を含んでいます",
	标题未取得: "タイトル未取得",
	栗棕: "栗色",
	栗黄: "マロンイエロー",
	"样张 {0} 张 · {1} 部作品": "サンプル画像 {0} 枚 · 作品 {1} 本",
	"核对 API 令牌": "API トークンを確認",
	"核对依赖失败：{0}": "依存関係の確認に失敗しました：{0}",
	核对目录: "ディレクトリを照合",
	"核对该目录：磁盘上已删除的移入 Peach 回收站，带个人记录的标为已消失": "このディレクトリを照合：ディスク上で削除済みのものは Peach のゴミ箱へ移動し、個人記録のあるものは消失済みとしてマーク",
	"根据已登记的 {0} 个视频、{1} GiB": "登録済みの動画 {0} 本、{1} GiB に基づく",
	"根据当前阶段待处理数量粗估，运行后校准": "現在の段階の処理待ち件数から概算しています。実行後に補正されます",
	"根据当前阶段最近完成的 {0} 个视频耗时校准": "現在の段階で最近完了した動画 {0} 本の所要時間で補正しています",
	格式: "形式",
	"格式 1 不接受格式 2 字段": "形式 1 は形式 2 のフィールドを受け付けません",
	"格式 2 的实体必须声明独立身份锚点": "形式 2 のエンティティは独立した身元アンカーを宣言する必要があります",
	"格式 2 需要 revision、content_sha256 与累计 withdrawals": "形式 2 には revision、content_sha256 と累計の withdrawals が必要です",
	桃晕: "ピーチブラッシュ",
	桃红: "ピーチピンク",
	框出头像那一块: "アバターにする部分を囲む",
	框选的区域不成立: "選択した範囲が無効です",
	"桌面快捷方式属于另一份 Peach 安装": "デスクトップのショートカットは別の Peach インストールのものです",
	桌面快捷方式状态未取得: "デスクトップのショートカットの状態を取得できませんでした",
	档案名称: "プロファイル名",
	档案已不存在: "プロフィールはすでに存在しません",
	"档案已不存在，拒绝回滚整批": "プロフィールがすでに存在しないため、バッチ全体の取り消しを拒否しました",
	桥未返回有效的来源记录: "ブリッジが有効なソース記録を返しませんでした",
	梅紫: "プラムパープル",
	條: "條",
	"检查 {0} 的全部来源": "{0} のすべてのソースをチェック",
	"检查 {0} 的更新": "{0} の更新をチェック",
	检查上游版本: "上流のバージョンをチェック",
	检查中: "チェック中",
	"检查了 {0} 个来源：{1}": "{0} 件のソースをチェックしました：{1}",
	检查于: "チェック日時",
	"检查于 {0}": "{0} にチェック",
	检查全部: "すべてチェック",
	检查失败: "チェックに失敗しました",
	检查失败项: "失敗した項目をチェック",
	"检查失败：{0}": "チェックに失敗しました：{0}",
	检查媒体目录: "メディアディレクトリをチェック",
	检查媒体目录与挂载状态: "メディアディレクトリとマウント状態をチェック",
	检查所选: "選択項目をチェック",
	检查数据目录与可用空间: "データディレクトリと空き容量をチェック",
	检查文件: "ファイルをチェック",
	检查时按推送发现选: "チェック時にプッシュ検出から選択",
	检查时间: "チェック日時",
	检查更新: "アップデートを確認",
	检查本机数据库与备份: "このマシンのデータベースとバックアップをチェック",
	"检查来源连接方式，并为需要登录的来源保存凭证。": "ソースの接続方法をチェックし、ログインが必要なソースの認証情報を保存します。",
	检查死链: "リンク切れをチェック",
	检查每个来源的更新: "各ソースの更新をチェック",
	检查结果: "チェック結果",
	"检查结果已过期，请重新检查": "チェック結果の有効期限が切れました。もう一度チェックしてください",
	检查连接: "接続をチェック",
	检查配套文件: "付属ファイルをチェック",
	检查频率: "チェック頻度",
	棕: "ブラウン",
	森绿: "フォレストグリーン",
	模板不可用: "テンプレートを利用できません",
	"模板不能以分隔符开头；它只描述来源根下面的相对位置": "テンプレートは区切り文字で始められません。ソースのルート以下の相対位置だけを記述します",
	"模板不能包含 `.` 或 `..`": "テンプレートに `.` や `..` を含めることはできません",
	"模板不能带盘符；它只描述来源根下面的相对位置": "テンプレートにドライブ文字は使えません。ソースのルート以下の相対位置だけを記述します",
	模板太长: "テンプレートが長すぎます",
	模特: "モデル",
	横屏: "横向き",
	樱桃: "チェリー",
	樱红: "チェリーレッド",
	橘黄: "オレンジイエロー",
	橙: "オレンジ",
	次数: "回数",
	次访问: "回の訪問",
	"欢迎使用 Peach": "Peach へようこそ",
	欧美: "欧米",
	"正在{0}": "{0}中",
	正在下载: "ダウンロード中",
	"正在下载 {0} 工具包": "{0} ツールパッケージをダウンロード中",
	"正在估算剩余时间…": "残り時間を推定しています…",
	正在保存: "保存中",
	"正在保存…": "保存中…",
	"正在保存任务进度，随后重启安装": "タスクの進行状況を保存しています。このあと再起動してインストールします",
	正在保留旧版本: "旧バージョンを保持しています",
	正在准备安装: "インストールを準備しています",
	"正在准备安装更新，暂时不能启动新任务。请等待安装完成。": "更新のインストールを準備しているため、新しいタスクは一時的に開始できません。インストールの完了をお待ちください。",
	正在准备查找关注来源: "フォローソースの検索を準備しています",
	正在准备检查任务: "チェックタスクを準備中",
	"正在准备检查任务…": "チェックタスクを準備中…",
	正在删除空文件夹: "空のフォルダを削除しています",
	正在加载图片: "画像を読み込み中",
	"正在加载字幕…": "字幕を読み込み中…",
	"正在卸载，Peach 将退出。完成后可关闭此页。": "アンインストール中です。Peach は終了します。完了後はこのページを閉じてかまいません。",
	正在启动新版本: "新しいバージョンを起動しています",
	"正在启动补全…": "補完を開始しています…",
	"正在启动馆藏。": "コレクションを起動しています。",
	正在回滚上一批: "前回のバッチを元に戻しています",
	正在处理: "処理中",
	"正在处理 {0} / {1}": "処理中 {0} / {1}",
	正在处理失效记录: "無効な記録を処理しています",
	"正在复核并清理…": "確認してクリーンアップしています…",
	"正在复核并清理失效条目…": "無効な項目を確認してクリーンアップしています…",
	正在复用和校验已安装工具: "インストール済みのツールを再利用・検証しています",
	正在安装新版本: "新しいバージョンをインストールしています",
	正在定位: "位置を特定中",
	正在导入口味数据: "好みのデータを取り込んでいます",
	正在打开: "開いています",
	正在扫描来源: "ソースをスキャンしています",
	正在抓取封面: "カバーを取得しています",
	"正在按模板算计划…": "テンプレートから計画を算出しています…",
	正在提交喜爱理由: "お気に入りの理由を送信しています",
	"正在搜索字幕…": "字幕を検索しています…",
	正在搜索磁力: "マグネットを検索しています",
	正在搜索资源: "リソースを検索しています",
	"正在播放 ·": "再生中 ·",
	正在整理: "整理中",
	"正在整理文件…": "ファイルを整理しています…",
	正在整理缓存目录并汇总释放空间: "キャッシュディレクトリを整理し、解放された容量を集計しています",
	正在显示写入端的实时复核队列: "書き込み側のリアルタイム確認キューを表示しています",
	正在暂停: "一時停止しています",
	"正在暂停，当前步骤结束后暂停": "一時停止しています。現在のステップが終わると停止します",
	正在更新本地数据库: "ローカルデータベースを更新しています",
	"正在查找 Peach 主机上的浏览器资料": "Peach ホスト上のブラウザープロファイルを探しています",
	正在查找建议: "候補を検索しています",
	正在查找文件夹: "フォルダを検索しています",
	"正在查找资源链接…": "リソースリンクを検索しています…",
	正在校验: "検証中",
	"正在校验 {0} 工具包": "{0} ツールパッケージを検証中",
	正在核对可重建缓存清单: "再構築可能なキャッシュ一覧を確認しています",
	正在核对失效链接清单: "リンク切れ一覧を確認しています",
	"正在核对目录…": "ディレクトリを照合しています…",
	正在核对计划: "計画を確認しています",
	"正在检查 CloudDrive2": "CloudDrive2 を確認中",
	"正在检查安装进度…": "インストールの進行状況を確認中…",
	"正在检查来源更新…": "ソースの更新を確認中…",
	正在检查链接: "リンクを確認中",
	正在检测: "検出中",
	"正在汇总口味分布、标签与创作者排名": "好みの分布、タグ、クリエイターのランキングを集計しています",
	正在生成口味分析报告与候选清单: "好み分析レポートと候補リストを生成しています",
	"正在监视 {0}": "{0} を監視中",
	"正在等待 cloudflared 连上 Cloudflare 边缘。": "cloudflared が Cloudflare エッジに接続するのを待っています。",
	"正在给刚加入的番号取资料与封面。": "追加したばかりの品番の情報とカバーを取得しています。",
	正在统计新目录的文件数量和大小: "新しいディレクトリのファイル数とサイズを集計しています",
	正在缓冲: "バッファリング中",
	正在解压: "展開中",
	正在识别正片: "本編を識別しています",
	正在试查来源: "ソースを試し検索中",
	"正在试查来源…": "ソースを試し検索中…",
	正在读取作品: "作品を読み込み中",
	正在读取作品列表: "作品一覧を読み込み中",
	正在读取作品详情: "作品の詳細を読み込み中",
	正在读取作品资料: "作品情報を読み込み中",
	"正在读取作品资料 · {0} / {1} 部": "作品情報を読み込み中 · {0} / {1} 本",
	正在读取关注内容: "フォロー中のコンテンツを読み込み中",
	正在读取内容: "コンテンツを読み込み中",
	正在读取图片: "画像を読み込み中",
	正在读取垃圾文件: "不要ファイルを読み込み中",
	正在读取复核队列: "レビューキューを読み込み中",
	"正在读取字幕文件…": "字幕ファイルを読み込み中…",
	正在读取想要: "ほしいものを読み込み中",
	正在读取推荐: "おすすめを読み込み中",
	正在读取数据管理状态: "データ管理の状態を読み込み中",
	正在读取文件夹: "フォルダを読み込み中",
	正在读取来源凭据: "ソースの認証情報を読み込み中",
	正在读取样图: "サンプル画像を読み込み中",
	正在读取浏览器书签: "ブラウザーのブックマークを読み込み中",
	正在读取浏览器添加设置: "ブラウザ追加の設定を読み込み中",
	正在读取浏览记录并更新口味分析: "閲覧履歴を読み込み、好み分析を更新しています",
	正在读取版本: "バージョンを読み込み中",
	正在读取目录树: "ディレクトリツリーを読み込み中",
	正在读取系统诊断: "システム診断を読み込み中",
	正在读取索引: "インデックスを読み込み中",
	正在读取评论: "コメントを読み込み中",
	正在读取资料: "情報を読み込み中",
	正在读取资源搜索设置: "リソース検索の設定を読み込み中",
	正在读取配置: "構成を読み込み中",
	正在读取采集来源: "収集ソースを読み込み中",
	正在读取页面: "ページを読み込み中",
	正在读取预览: "プレビューを読み込み中",
	正在读取馆藏: "コレクションを読み込み中",
	"正在读订阅源。": "購読フィードを読み込んでいます。",
	正在进行: "進行中",
	正在连接: "接続中",
	"正在连接 GitHub": "GitHub に接続しています",
	"正在连接数据目录…": "データディレクトリに接続中…",
	正在逐条复核失效记录: "無効な記録を 1 件ずつ確認しています",
	"正在采集，进度在活动页查看。": "収集中です。進行状況はアクティビティページで確認できます。",
	正在重建运行环境: "実行環境を再構築中",
	"正在重验并删除失效链接…": "リンクを再検証し、無効なリンクを削除しています…",
	正在重验链接: "リンクを再検証中",
	正在预览: "プレビュー中",
	正常: "正常",
	正常观看: "通常視聴",
	正常读取: "通常読み込み",
	正序: "昇順",
	正片: "本編",
	"正片已绑定其他番号：{0}": "本編はすでに別の品番に紐付けられています：{0}",
	"正片已绑定，资料已采集并完成整理": "本編を紐付け、情報の収集と整理が完了しました",
	"正片已绑定，资料已采集；整理跳过：{0}": "本編を紐付け、情報を収集しました。整理はスキップしました：{0}",
	此分类没有待复核项目: "このカテゴリにレビュー待ちの項目はありません",
	此安装方式不支持独立包更新: "このインストール方法はスタンドアロンパッケージの更新に対応していません",
	"此来源不接受登录 Cookie": "このソースはログイン Cookie を受け付けません",
	"此目录中没有数据库，请选择保存原配置和数据库的数据目录": "このディレクトリにはデータベースがありません。元の構成とデータベースを保存しているデータディレクトリを選択してください",
	"此目录中没有有效的 config.toml": "このディレクトリに有効な config.toml がありません",
	此系统未提供桌面快捷方式: "このシステムではデスクトップのショートカットを利用できません",
	此系统未提供登录自启入口: "このシステムではログイン時の自動起動を利用できません",
	此设备的外部播放器: "このデバイスの外部プレーヤー",
	此部署通过配置文件管理服务: "このデプロイでは構成ファイルでサービスを管理しています",
	母公司: "親会社",
	"每 10 秒一张": "10 秒ごとに 1 枚",
	"每 3 个月": "3 か月ごと",
	"每 30 秒一张": "30 秒ごとに 1 枚",
	"每 6 小时": "6 時間ごと",
	"每 {0} 分钟": "{0} 分ごと",
	"每 {0} 天": "{0} 日ごと",
	"每 {0} 小时": "{0} 時間ごと",
	每一项必须是对象: "各項目はオブジェクトである必要があります",
	"每个来源都只抓了第 1 页": "各ソースとも 1 ページ目のみ取得しました",
	"每个来源都抓到第 {0} 页": "各ソースとも {0} ページ目まで取得しました",
	每周: "毎週",
	每天: "毎日",
	每年: "毎年",
	每批作品: "1 回あたりの作品数",
	每批加载作品: "1 回に読み込む作品数",
	"每提交一次扣一条离线配额，重新提交也算。": "送信するたびにオフライン枠を 1 件消費します。再送信も含まれます。",
	每日播放: "日別再生",
	每日活跃: "日別アクティビティ",
	"每页 {0} {1}": "1 ページ {0} {1}",
	每页显示数量: "1 ページの表示件数",
	毒龙钻: "アナル舐め",
	"比对模型不可用：{0}": "照合モデルを利用できません：{0}",
	氛围模式: "アンビエントモード",
	永久删除回收站内容: "ゴミ箱の中身を完全に削除",
	永久删除所选项目: "選択した項目を完全に削除",
	汇总当前阶段与所有待执行阶段的剩余耗时: "現在の段階と実行待ちのすべての段階の残り所要時間を集計",
	沉浸模式: "没入モード",
	"沉浸模式 · 随机连播": "没入モード · ランダム連続再生",
	"沉浸模式还没有接上宿主（configureImmerse）": "没入モードがまだホストに接続されていません（configureImmerse）",
	沙棕: "サンドブラウン",
	"没有 captcha_token": "captcha_token がありません",
	"没有 uv.lock：{0}": "uv.lock がありません：{0}",
	"没有「{0}」这种界面音效": "「{0}」という UI 効果音はありません",
	没有一个参照切得出能解码的片子: "どの参照からもデコード可能な動画を切り出せませんでした",
	没有任何更新: "更新はありません",
	"没有任务在跑。": "実行中のタスクはありません。",
	没有保存: "保存されていません",
	没有匹配的收藏: "一致するお気に入りはありません",
	没有匹配的文件夹: "一致するフォルダはありません",
	"没有单人作品封面可比，只留候选": "比較できる単体作品のカバーがないため、候補のみ残します",
	没有可以回滚的批次: "元に戻せるバッチがありません",
	"没有可撤回的批次 {0}": "元に戻せるバッチ {0} がありません",
	没有可用头像: "使用できるアバターがありません",
	没有可用的图片: "利用できる画像がありません",
	没有可用预览: "使用できるプレビューがありません",
	"没有可补的（对上 {0} 位）": "補完できるものはありません（{0} 人と一致）",
	没有可解析的内容: "解析できる内容がありません",
	没有可配置的来源: "設定できるソースがありません",
	"没有可采用的资料，只能拒绝或跳过": "採用できる情報がありません。却下またはスキップのみ可能です",
	没有可重试的链接: "再試行できるリンクがありません",
	没有可验证的写入端: "検証できる書き込み元がありません",
	"没有填 CloudDrive2 地址，本机 {0} 都没有应答。确认 CloudDrive2 已启动，或在地址栏填上它的实际地址": "CloudDrive2 のアドレスが入力されておらず、このマシンの {0} からも応答がありません。CloudDrive2 が起動しているか確認するか、アドレス欄に実際のアドレスを入力してください",
	没有填写内容: "内容が入力されていません",
	没有封面: "カバーなし",
	没有已完成的检查结果: "完了したチェック結果がありません",
	没有已排除的文件: "除外済みのファイルはありません",
	没有已记录的任务失败: "記録されたタスクの失敗はありません",
	没有已配置的本地来源: "構成済みのローカルソースがありません",
	没有待判断的垃圾文件: "判定待ちの不要ファイルはありません",
	没有找到: "見つかりません",
	没有找到当前作品的中文字幕: "この作品の中国語字幕が見つかりません",
	"没有找到更大或更合适的封面。": "より大きい、またはより適切なカバーは見つかりませんでした。",
	没有找到重复文件: "重複ファイルは見つかりません",
	没有新写法: "新しい表記はありません",
	没有更多: "これ以上ありません",
	没有更多历史内容: "これ以上の履歴はありません",
	没有更新: "更新なし",
	没有权限写入数据目录: "データディレクトリへの書き込み権限がありません",
	没有权限读取: "読み取り権限がありません",
	没有标记中的高清版目标: "マーク中の高画質版ターゲットはありません",
	"没有比上封面的图，只留候选": "カバーと一致する画像がないため、候補のみ残します",
	没有番号或文件名对得上的文件: "品番またはファイル名が一致するファイルはありません",
	"没有登记 {0} 这种后继": "{0} という後継は登録されていません",
	没有符合条件的作品: "条件に一致する作品はありません",
	没有符合条件的内容: "条件に一致するコンテンツはありません",
	没有符合条件的推荐: "条件に一致するおすすめはありません",
	没有符合条件的更新: "条件に一致する更新はありません",
	没有符合条件的视频: "条件に一致する動画はありません",
	"没有符合条件的资源。": "条件に一致するリソースはありません。",
	没有符合的作品: "一致する作品はありません",
	"没有第 {0} 轮任务": "第 {0} 回のタスクはありません",
	没有给出原因: "理由が示されていません",
	没有能进作品页的番号: "作品ページに進める品番がありません",
	没有要修的: "修復が必要なものはありません",
	没有要写入的设置: "書き込む設定がありません",
	"没有要改的文件。{0}": "変更するファイルはありません。{0}",
	没有要补的番号: "補完する品番がありません",
	没有记录: "記録なし",
	没有读到订阅源: "購読フィードを読み込めませんでした",
	没有资料: "情報なし",
	没有运行: "停止中",
	没有这个下载任务: "このダウンロードタスクはありません",
	没有这个媒体库: "このメディアライブラリはありません",
	没有这个路径: "このパスはありません",
	没有重复内容: "重複コンテンツはありません",
	"没有需要处理的作品。": "処理が必要な作品はありません。",
	"没有项目 venv：{0}": "プロジェクトの venv がありません：{0}",
	没看过: "未視聴",
	没磁链: "マグネットリンクなし",
	没能使用此数据目录: "このデータディレクトリを使用できませんでした",
	没能完成设置: "設定を完了できませんでした",
	没能打开文件夹对话框: "フォルダダイアログを開けませんでした",
	"没能读取{0}": "{0}を読み込めませんでした",
	没能读取设置题目: "設定項目を読み込めませんでした",
	泄密: "リーク",
	泄密流出: "リーク流出",
	派出后继: "後続タスクを起動",
	流出: "流出",
	浅杏: "ライトアプリコット",
	浅色: "ライト",
	浅色主题: "ライトテーマ",
	浅青: "ライトシアン",
	测试包: "テストパッケージ",
	"测试期间代码或依赖持续变化，三次验证均未取得有效记录；请稍后重试。": "テスト中にコードまたは依存関係が変化し続け、3 回の検証でいずれも有効な記録を取得できませんでした。しばらくしてから再試行してください。",
	测试版: "ベータ版",
	"浏览 {0}": "{0} を閲覧",
	浏览与播放: "閲覧と再生",
	浏览主线: "閲覧の主な傾向",
	"浏览信号 {0} 次 · 馆藏 {1} 部 ·": "閲覧シグナル {0} 回 · コレクション {1} 本 ·",
	"浏览兴趣以{0}为主，Peach 中稳定出现{1}。": "閲覧の関心は{0}が中心で、Peach では{1}が安定して見られます。",
	"浏览兴趣目前以{0}为主，Peach 观看证据仍偏少。": "閲覧の関心は現在{0}が中心ですが、Peach での視聴の根拠はまだ少なめです。",
	"浏览历史里出现 {0} 次{1}": "閲覧履歴に {0} 回出現{1}",
	浏览器书签: "ブラウザのブックマーク",
	"浏览器书签未取得，请检查资料目录或退出浏览器后重试": "ブラウザーのブックマークを取得できませんでした。プロファイルディレクトリを確認するか、ブラウザーを終了してから再試行してください",
	"浏览器传输只发 GET": "ブラウザー転送は GET のみ送信します",
	浏览器关闭了调试连接: "ブラウザーがデバッグ接続を閉じました",
	"浏览器历史快照未取得，请退出该浏览器后重新读取": "ブラウザー履歴のスナップショットを取得できませんでした。そのブラウザーを終了してから読み込み直してください",
	"浏览器历史文件未取得，请检查资料目录": "ブラウザー履歴ファイルを取得できませんでした。プロファイルディレクトリを確認してください",
	"浏览器历史未取得，请检查资料目录或退出浏览器后重试": "ブラウザー履歴を取得できませんでした。プロファイルディレクトリを確認するか、ブラウザーを終了してから再試行してください",
	"浏览器历史格式不受支持，请选择包含网页访问记录的历史文件": "ブラウザー履歴の形式に対応していません。Web ページの訪問記録を含む履歴ファイルを選択してください",
	浏览器历史记录: "ブラウザの閲覧履歴",
	浏览器历史记录导入指南: "ブラウザ閲覧履歴のインポートガイド",
	浏览器口味维度: "ブラウザ好みの観点",
	浏览器名称: "ブラウザ名",
	"浏览器启动后立即退出（{0}）": "ブラウザーが起動直後に終了しました（{0}）",
	浏览器在握手时关闭了连接: "ブラウザーがハンドシェイク中に接続を閉じました",
	"浏览器地址里冒号后面的数字，一般不用改。": "ブラウザーのアドレスでコロンの後ろにある数字です。通常は変更不要です。",
	浏览器拒绝了调试连接: "ブラウザーがデバッグ接続を拒否しました",
	浏览器操作无效: "ブラウザー操作が無効です",
	浏览器来源不存在: "ブラウザーのソースが存在しません",
	浏览器没有写出调试口: "ブラウザーがデバッグポートを書き出しませんでした",
	"浏览器没有启动：{0}": "ブラウザーが起動しませんでした：{0}",
	"浏览器没有打开：{0}": "ブラウザーが開きませんでした：{0}",
	"浏览器添加 JAV": "ブラウザから JAV を追加",
	浏览器添加专用令牌: "ブラウザ追加専用トークン",
	浏览器添加只在允许修改数据库的设备上可用: "ブラウザーからの追加は、データベースの変更が許可されたデバイスでのみ利用できます",
	浏览器添加已关闭: "ブラウザーからの追加はオフになっています",
	浏览器添加的下载渠道: "ブラウザ追加のダウンロード経路",
	浏览器添加队列无法读取: "ブラウザー追加キューを読み取れません",
	浏览器画像: "ブラウザプロファイル",
	"浏览器登录出错：{0}": "ブラウザーでのログインでエラーが発生しました：{0}",
	浏览器登录没有启用: "ブラウザーでのログインが有効になっていません",
	"浏览器登录，由 Peach 续期": "ブラウザでログインし、Peach が更新",
	"浏览器的调试口没有接上：{0}": "ブラウザーのデバッグポートに接続できませんでした：{0}",
	"浏览器窗口已关闭，登录没有完成": "ブラウザーウィンドウが閉じられたため、ログインは完了していません",
	"浏览器窗口已打开，在里面登录 PikPak": "ブラウザーウィンドウを開きました。そこで PikPak にログインしてください",
	浏览器记录: "ブラウザ履歴",
	"浏览器请求未取得：{0}": "ブラウザーのリクエストを取得できませんでした：{0}",
	浏览活跃时间: "閲覧アクティブ時間帯",
	浏览线索: "閲覧の手がかり",
	浏览记录: "閲覧履歴",
	浏览馆藏: "コレクションを見る",
	浴室: "浴室",
	海报: "ポスター",
	"涉及合集，只能复核分片关系，不能整体合并": "総集編が関係しているため、分割関係の確認のみ可能で、まとめて統合することはできません",
	淡紫: "ライトパープル",
	淫语: "淫語",
	深喉: "イラマチオ",
	深林: "ディープフォレスト",
	深灰: "ダークグレー",
	深紫: "ディープパープル",
	深翠: "ディープエメラルド",
	深色: "ダーク",
	深色主题: "ダークテーマ",
	深蓝: "ネイビー",
	深褐: "ダークブラウン",
	添加: "追加",
	"添加 JAV 订阅": "JAV 購読を追加",
	添加一个关注来源: "フォローソースを追加",
	添加下载: "ダウンロードを追加",
	添加下载失败: "ダウンロードの追加に失敗しました",
	"添加中… {0}/{1}": "追加中… {0}/{1}",
	添加关注: "フォローを追加",
	"添加关注后，会按来源检查必要凭证。": "フォローを追加すると、ソースごとに必要な認証情報を確認します。",
	"添加关注来源并获取内容后，这里会显示来源上的": "フォローソースを追加してコンテンツを取得すると、ここにソース上の",
	"添加关注来源并获取内容后，这里会显示来源上的{0}。": "フォローソースを追加してコンテンツを取得すると、ここにソース上の{0}が表示されます。",
	添加内容: "コンテンツを追加",
	"添加内容并补充资料后，这里会显示对应信息。": "コンテンツを追加して情報を補完すると、ここに対応する情報が表示されます。",
	"添加创作者或订阅来源后，更新会集中显示在这里。": "クリエイターまたは購読ソースを追加すると、更新がここにまとめて表示されます。",
	添加别名: "別名を追加",
	"添加别名…": "別名を追加…",
	添加前缀: "プレフィックスを追加",
	"添加失败，可重试": "追加に失敗しました。再試行できます",
	添加媒体库: "メディアライブラリを追加",
	"添加媒体库，开始整理馆藏。": "メディアライブラリを追加して、コレクションの整理を始めましょう。",
	添加媒体目录: "メディアディレクトリを追加",
	"添加媒体目录后，这里会显示存储空间。": "メディアディレクトリを追加すると、ここにストレージ容量が表示されます。",
	"添加媒体目录或关注来源后，这里会显示馆藏统计。": "メディアディレクトリまたはフォローソースを追加すると、ここにコレクションの統計が表示されます。",
	"添加媒体目录或关注来源，开始建立你的馆藏。": "メディアディレクトリまたはフォローソースを追加して、コレクションを作り始めましょう。",
	"添加想持续追踪的创作者或来源。": "継続して追跡したいクリエイターやソースを追加します。",
	添加文件夹: "フォルダを追加",
	添加时间: "追加日時",
	添加来源: "ソースを追加",
	添加标签: "タグを追加",
	添加浏览器: "ブラウザを追加",
	添加索引器: "インデクサーを追加",
	"添加订阅（{0}）": "購読を追加（{0}）",
	"添加选中（{0}）": "選択項目を追加（{0}）",
	"添加队列已满，请等待当前任务结束": "追加キューがいっぱいです。現在のタスクの終了をお待ちください",
	清单为空: "リストは空です",
	"清单未取得，请重新检查。": "リストを取得できませんでした。もう一度確認してください。",
	清晰度: "解像度",
	"清理 {0} 个缓存，释放 {1}。": "{0} 件のキャッシュをクリーンアップし、{1} を解放します。",
	清理内容: "クリーンアップ内容",
	清理失效条目: "無効な項目をクリーンアップ",
	清理失败: "クリーンアップに失敗しました",
	清理结果: "クリーンアップ結果",
	"清理缓存：已处理 {0} / {1} 个": "キャッシュのクリーンアップ：{0} / {1} 件処理済み",
	清空: "クリア",
	清空回收站: "ゴミ箱を空にする",
	清空当前选择: "現在の選択をクリア",
	清空本组: "このグループをクリア",
	清除: "クリア",
	"清除已保存的 API key": "保存済みの API key をクリア",
	清除来源凭据: "ソースの認証情報をクリア",
	清除筛选: "絞り込みをクリア",
	"清除筛选后查看其他作品。": "絞り込みをクリアすると他の作品を表示できます。",
	"清除筛选后查看名下全部视频。": "絞り込みをクリアするとすべての動画を表示できます。",
	"清除筛选或搜索条件后查看全部内容。": "絞り込みや検索条件をクリアするとすべてのコンテンツを表示できます。",
	游戏: "ゲーム",
	游戏同人: "ゲーム同人",
	湖蓝: "レイクブルー",
	湿润: "しずく",
	源文件不存在: "元のファイルが存在しません",
	"源文件已变化，请重新选择文字": "元のファイルが変更されました。文字を選択し直してください",
	"源码 Tunnel 的 HTTPS 端口无效：{0}": "ソース版 Tunnel の HTTPS ポートが無効です：{0}",
	"源码 Tunnel 的局域网地址不是 IP：{0}": "ソース版 Tunnel の LAN アドレスが IP ではありません：{0}",
	"源码 Tunnel 需要正在运行的 HTTPS 服务": "ソース版 Tunnel には稼働中の HTTPS サービスが必要です",
	"源码 Tunnel 需要项目 CA：{0}": "ソース版 Tunnel にはプロジェクト CA が必要です：{0}",
	"源码安装请先关闭开机自启并退出托盘，再手动移除项目与数据目录": "ソース版のインストールでは、先にログイン時の自動起動をオフにしてトレイを終了し、その後プロジェクトとデータディレクトリを手動で削除してください",
	"源码安装请先退出托盘，再手动移除项目；数据目录见下方": "ソース版のインストールでは、先にトレイを終了してからプロジェクトを手動で削除してください。データディレクトリは下記を参照してください",
	"源码托盘已正常重启并重新拥有 HTTP/HTTPS 子服务": "ソース版トレイは正常に再起動し、HTTP/HTTPS 子サービスを再び管理しています",
	"源码服务没有配置 mDNS 名称": "ソース版サービスに mDNS 名が構成されていません",
	源码运行: "ソースから実行",
	漂移速度: "ドリフト速度",
	演员: "出演者",
	"演员 id {0} 已属另一条实体": "出演者 id {0} はすでに別のエンティティに属しています",
	"演员:": "出演者:",
	"演员:{0}": "出演者:{0}",
	演员候选为空: "出演者候補が空です",
	演员候选必须是数组: "出演者候補は配列である必要があります",
	演员候选条目无效: "出演者候補の項目が無効です",
	"演员卡 {0}{1} 列着她的名字": "出演者カード {0}{1} に彼女の名前が載っています",
	"演员（文本数组）": "出演者（テキスト配列）",
	潟湖: "ラグーン",
	瀑布流: "メイソンリー",
	火红: "ファイアレッド",
	灰: "グレー",
	灰雾: "グレーミスト",
	"点“不是垃圾”的资源会保留在这里，可随时重新判断。": "「不要ではない」を選んだリソースはここに残り、いつでも判定し直せます。",
	"点「检查更新」去各个来源取一遍；来源有新内容时会集中显示在这里。": "「更新を確認」を押すと各ソースから取得します。ソースに新しいコンテンツがあると、ここにまとめて表示されます。",
	点名的媒体不是这篇帖子里的视频: "指定されたメディアはこの投稿内の動画ではありません",
	"点此开始拉流 ·": "クリックしてストリーミング開始 ·",
	"点此开始拉流 · {0}": "クリックしてストリーミング開始 · {0}",
	烟: "タバコ",
	热度: "人気度",
	热情: "情熱",
	照片: "写真",
	"照片 · {0}": "写真 · {0}",
	片商: "制作会社",
	片商与厂牌: "制作会社とメーカー",
	片商官网: "メーカー公式サイト",
	"片商官网按番号选择，请输入馆藏番号检查高清封面。": "メーカー公式サイトは品番で選択します。コレクションの品番を入力して高画質カバーを確認してください。",
	片商归属只适用于厂牌: "メーカーへの所属はレーベルにのみ適用されます",
	"片尾/出处证据": "エンドカード／出典の証拠",
	"片尾明确写有 Full version available": "エンドロールに Full version available と明記されています",
	版本: "バージョン",
	"版本目标：": "バージョンの目標：",
	"版本目标：{0}。可在下方调整搜索优先项；完整度与水印需要逐条复核。": "バージョンの目標：{0}。下で検索の優先項目を調整できます。完全性と透かしは 1 件ずつ確認が必要です。",
	版本统计与错误诊断: "バージョン統計とエラー診断",
	版本统计与错误诊断须同时开启或关闭: "バージョン統計とエラー診断は同時にオンまたはオフにする必要があります",
	"版本，不随上游自动升级。": "バージョンを使用し、上流に合わせて自動アップグレードはしません。",
	特典: "特典",
	状态: "状態",
	"独立包 Tunnel 的 HTTP 端口无效：{0}": "スタンドアロン版 Tunnel の HTTP ポートが無効です：{0}",
	独立包只支持临时链接: "スタンドアロン版は一時リンクのみ対応しています",
	"独立托盘启动仅适用于 Windows": "スタンドアロン版トレイの起動は Windows でのみ利用できます",
	独立测试包: "スタンドアロンテストパッケージ",
	猜你喜欢: "あなたへのおすすめ",
	玉绿: "ジェイドグリーン",
	玫瑰金: "ローズゴールド",
	玫粉: "ローズピンク",
	玫紫: "ローズパープル",
	玫红: "ローズレッド",
	现名: "現在の名前",
	现在不能这样做: "現在この操作はできません",
	"现在扫描 {target}？": "{target} を今すぐスキャンしますか？",
	"现有归属与精确撤销值不一致，保留断言": "現在の所属が厳密な取り消し値と一致しないため、アサーションを保持します",
	"现有版本都已满足条件，或还没有加入追踪。": "既存のバージョンはすべて条件を満たしているか、まだ追跡に追加されていません。",
	"现有资料与精确撤销值不一致，保留断言": "現在の情報が厳密な取り消し値と一致しないため、アサーションを保持します",
	玻璃原色: "ガラス本来の色",
	珊瑚: "コーラル",
	琉璃: "ラピス",
	琉璃霞: "ラピスの霞",
	琥珀: "アンバー",
	甜心: "ロリポップ",
	生: "生",
	"生产入口不存在或不是 Peach.exe：{0}": "本番エントリが存在しないか、Peach.exe ではありません：{0}",
	生年月日: "生年月日",
	生成播放链接: "再生リンクを生成",
	生成视频预览: "動画プレビューを生成",
	"生成视频预览会读取视频并占用处理器，可能让电脑变慢。需要同时使用电脑时，可选择低占用模式。": "動画プレビューの生成は動画を読み込んでプロセッサを使用するため、パソコンが遅くなることがあります。同時にパソコンを使う場合は低負荷モードを選択できます。",
	生成预览图: "プレビュー画像を生成",
	"生成预览图失败，请检查 FFmpeg 与目录权限后重试": "プレビュー画像の生成に失敗しました。FFmpeg とディレクトリの権限を確認してから再試行してください",
	"生成预览图超时，请重试": "プレビュー画像の生成がタイムアウトしました。再試行してください",
	生成预览图需要共享馆藏写入连接: "プレビュー画像の生成には共有コレクションへの書き込み接続が必要です",
	生日: "誕生日",
	生涯: "活動期間",
	"用 Google 继续查找 F95zone": "Google で F95zone の検索を続ける",
	"用于展开 Gofile 文件页，取得其中的图片和视频列表；Gofile 当前要求 Premium 才能读取 contents API，不配置仍会保留文件页链接。": "Gofile のファイルページを展開し、中の画像と動画の一覧を取得するために使います。Gofile は現在 contents API の読み取りに Premium を必要とします。構成しなくてもファイルページのリンクは保持されます。",
	"用于生成口味分析。完成设置后选择读取这台电脑，或导入其他设备的记录；也可稍后从「口味」进入。": "好み分析の生成に使います。設定完了後にこのパソコンを読み込むか、他のデバイスの履歴をインポートしてください。後から「好み」から開くこともできます。",
	用户停止任务: "ユーザーがタスクを停止しました",
	"用户确认目录用途：": "ユーザーが確認したディレクトリの用途：",
	用户设置格式不正确: "ユーザー設定の形式が正しくありません",
	"用时 {0}": "所要時間 {0}",
	用浏览器登录: "ブラウザでログイン",
	用过的: "使用済み",
	用这一块: "この範囲を使う",
	用这个地址: "このアドレスを使う",
	"由 Mix 保存": "Mix で保存",
	"由 {0} 条作品级否定派生：": "{0} 件の作品単位の否定から派生：",
	由子目录规则管理: "サブディレクトリのルールで管理",
	电影: "映画",
	电蓝: "エレクトリックブルー",
	男性: "男性",
	画中画: "ピクチャーインピクチャー",
	画像を拡大する: "画像を拡大する",
	画幅: "アスペクト比",
	画质: "画質",
	"画面出现来源/水印：": "画面にソース／透かしが表示されています：",
	画面截不出这一块: "画面からこの部分を切り出せません",
	界面语言: "表示言語",
	界面音效: "UI 効果音",
	"留 {0}": "{0} を残す",
	留最大: "最大のものを残す",
	留最长: "最長のものを残す",
	留空时按推送发现自动填写: "空欄の場合はプッシュ検出に従って自動入力します",
	留空自动查找: "空欄で自動検索",
	留空表示原地改名: "空欄の場合はその場で名前を変更します",
	番: "品番",
	番号: "品番",
	"番号 标题": "品番 タイトル",
	"番号与创作者的绑定由 metadata_fields 那条路写": "品番とクリエイターの紐付けは metadata_fields の経路で書き込みます",
	番号封面: "品番カバー",
	番号格式无效: "品番の形式が無効です",
	番号目录存疑: "品番ディレクトリ要確認",
	番号资料刮削: "品番情報のスクレイピング",
	"番号，如 ABW-232": "品番（例：ABW-232）",
	登出: "ログアウト",
	登录: "ログイン",
	"登录 FANBOX 后，从一次成功的 api.fanbox.cc/post.info 请求复制整条 Cookie 请求头。": "FANBOX にログインしたあと、成功した api.fanbox.cc/post.info リクエストから Cookie リクエストヘッダーを丸ごとコピーしてください。",
	"登录 Peach": "Peach にログイン",
	"登录 Premium Gofile 账户后，在个人资料页复制 API token。": "Premium Gofile アカウントにログインしたあと、プロフィールページで API token をコピーしてください。",
	"登录后从浏览器复制整条 Cookie 请求头，写进凭据文件的 cookie 字段。": "ログイン後、ブラウザーから Cookie リクエストヘッダーを丸ごとコピーし、認証情報ファイルの cookie フィールドに書き込んでください。",
	"登录后在账号设置页生成 API key，把 user_id 和 api_key 写进凭据文件。": "ログイン後、アカウント設定ページで API key を生成し、user_id と api_key を認証情報ファイルに書き込んでください。",
	"登录回包里没有 token": "ログイン応答に token がありません",
	"登录已失效，请刷新页面重新登录。": "ログインの有効期限が切れました。ページを再読み込みしてもう一度ログインしてください。",
	登录方式: "ログイン方法",
	"登记 {0} 个别名": "別名を {0} 件登録",
	白色: "ホワイト",
	"监听地址不是 IP，端口状态未取得": "待ち受けアドレスが IP ではないため、ポートの状態を取得できませんでした",
	"监视一个 Windows Peach 托盘实例": "Windows の Peach トレイインスタンスを 1 つ監視します",
	监视本机文件夹: "このデバイスのフォルダを監視",
	目录不存在: "ディレクトリが存在しません",
	目录不存在或已移出媒体库: "ディレクトリが存在しないか、メディアライブラリから外されています",
	"目录不存在，或者不是目录：{0}。先建好再填。": "ディレクトリが存在しないか、ディレクトリではありません：{0}。先に作成してから入力してください。",
	"目录与分段文件使用 Gachinco PPV 作品号及画质后缀；不作为账号": "ディレクトリと分割ファイルには Gachinco PPV の作品番号と画質の接尾辞が使われています。アカウントとしては扱いません",
	"目录与媒体文件同为站点作品号 {0}；官网目录 {1}": "ディレクトリとメディアファイルはどちらもサイトの作品番号 {0} です。公式サイトのディレクトリ {1}",
	"目录与媒体文件的发行标识 {0} 一致；画质与版本后缀不作为账号": "ディレクトリとメディアファイルの配信識別子 {0} が一致しています。画質とバージョンの接尾辞はアカウントとして扱いません",
	"目录与文件同为番号 {0}": "ディレクトリとファイルはどちらも品番 {0} です",
	"目录与文件同为站点作品号 {0}": "ディレクトリとファイルはどちらもサイトの作品番号 {0} です",
	目录中未找到浏览器历史或书签文件: "ディレクトリ内にブラウザー履歴またはブックマークファイルが見つかりません",
	"目录内 {0} 项都还在，无需改动": "ディレクトリ内の {0} 項目はすべて存在するため、変更は不要です",
	"目录内容或归属已变化，请重新预览": "ディレクトリの内容または所属が変更されました。もう一度プレビューしてください",
	"目录名是发行标识 {0} 与画质版本后缀；不作为账号，也不推断目录内文件的番号": "ディレクトリ名は配信識別子 {0} と画質・バージョンの接尾辞です。アカウントとしては扱わず、ディレクトリ内ファイルの品番も推定しません",
	"目录名里嵌着番号 {0}，与目录内文件对得上": "ディレクトリ名に品番 {0} が含まれており、ディレクトリ内のファイルと一致します",
	"目录商品标识与媒体文件 {0} 一致；番号不改写": "ディレクトリの商品識別子がメディアファイル {0} と一致しています。品番は書き換えません",
	"目录是「域名+番号」的推广打包": "ディレクトリは「ドメイン+品番」の宣伝用パッケージです",
	"目录有 {0} 项暂时无法读取，本次未改动": "ディレクトリ内の {0} 項目が一時的に読み込めないため、今回は変更していません",
	"目录核对完成，无需改动": "ディレクトリの照合が完了しました。変更は不要です",
	目录模板: "ディレクトリテンプレート",
	目录模板里有空的一层: "ディレクトリテンプレートに空の階層があります",
	目录用途影响范围: "ディレクトリ用途の影響範囲",
	"目录番号 {0} 与文件 DMM 商品标识一致；番号不改写": "ディレクトリの品番 {0} がファイルの DMM 商品識別子と一致しています。品番は書き換えません",
	目录的月份或画质后缀与已存在的完整账号名对应: "ディレクトリの月または画質の接尾辞が、既存の完全なアカウント名に対応しています",
	"目录缓存刷新未取得：": "ディレクトリキャッシュを更新できませんでした：",
	"目录缓存范围越出 A 盘": "ディレクトリキャッシュの範囲が A ドライブを超えています",
	目录范围与新文件设置须明确选择: "ディレクトリの範囲と新規ファイルの設定を明示的に選択してください",
	"目录要已经存在。": "ディレクトリはあらかじめ存在している必要があります。",
	"目录规则已变化，请重新打开设置": "ディレクトリのルールが変更されました。設定を開き直してください",
	目录规则格式不正确: "ディレクトリのルールの形式が正しくありません",
	目录读取失败: "ディレクトリの読み取りに失敗しました",
	目录里没有量到时长的视频: "フォルダ内に再生時間を測定できた動画がありません",
	目标不是目录: "対象がフォルダではありません",
	"目标实例当前不是 ledger writer": "対象インスタンスは現在台帳の書き込み側ではありません",
	目标已存在: "対象はすでに存在します",
	目标父路径不是目录: "対象の親パスがフォルダではありません",
	目标目录: "保存先ディレクトリ",
	"目标目录对应不到媒体目录。115 在「推送发现」里配置云端路径前缀；PikPak 在「云下载」设置里选 PikPak 根目录对应的媒体目录": "対象フォルダに対応するメディアフォルダが見つかりません。115 は「プッシュ検出」でクラウドパスのプレフィックスを設定し、PikPak は「クラウドダウンロード」設定で PikPak ルートに対応するメディアフォルダを選んでください",
	"目标目录要写成 PikPak 里的一个具体文件夹": "対象フォルダには PikPak 内の具体的なフォルダを指定してください",
	"目标目录要写成网盘里的一个具体文件夹，不能是网盘根目录": "対象フォルダにはクラウドストレージ内の具体的なフォルダを指定してください。クラウドストレージのルートは指定できません",
	直接连接: "直接接続",
	直连: "直接接続",
	直连站点必须属于本次查询来源: "直接接続のサイトは今回の照会ソースに含まれている必要があります",
	相关推荐数量: "関連おすすめの件数",
	"看原因。": "で原因を確認してください。",
	看过: "視聴済み",
	"看过 {0}": "視聴済み {0}",
	看过了: "視聴済み",
	"看过了 · 只降低近期推荐": "視聴済み · 最近のおすすめで優先度を下げるのみ",
	"真实 {0}% · 到达 {1}%": "実視聴 {0}% · 到達 {1}%",
	真实观看: "実視聴",
	"真实观看 {0}%": "実視聴 {0}%",
	"真正写 ledger；默认只做 dry-run": "実際に台帳へ書き込みます。既定では dry-run のみ",
	眼镜: "メガネ",
	眼镜娘: "メガネっ娘",
	瞬时网络: "一時的なネットワーク障害",
	短: "短め",
	"短单名，会命中别人": "短い単名のため、別人にも一致します",
	"短片-2分内": "短編（2 分以内）",
	"短边 {0}": "短辺 {0}",
	石灰: "ライム",
	砖红: "ブリックレッド",
	确认访问密码: "アクセスパスワードの確認",
	碧波: "エメラルドウェーブ",
	碧绿: "エメラルドグリーン",
	"磁力 {0}": "マグネット {0}",
	"磁力抓取链未取得，请稍后重试或检查来源连接。": "マグネット取得チェーンを取得できませんでした。しばらくしてから再試行するか、ソース接続を確認してください。",
	磁力链接: "マグネットリンク",
	"磁力链接里没有 urn:btih，Peach 只接受 BitTorrent 磁力": "マグネットリンクに urn:btih が含まれていません。Peach は BitTorrent のマグネットのみ受け付けます",
	"磁力链接里的 infohash 不是 40 位十六进制或 32 位 base32": "マグネットリンクの infohash が 40 桁の 16 進数または 32 桁の base32 ではありません",
	磁盘: "ディスク",
	磁链: "マグネットリンク",
	"磁链区资源未取得：": "マグネット欄のリソースを取得できませんでした：",
	社交主页: "SNS プロフィール",
	社交账号: "SNS アカウント",
	社区来源没有这部片的封面: "コミュニティソースにこの作品のカバーがありません",
	社区来源的封面下载失败: "コミュニティソースのカバーのダウンロードに失敗しました",
	社区来源给的封面都是动图或太小: "コミュニティソースのカバーはすべてアニメーション画像か小さすぎます",
	社区来源都没有这个番号: "どのコミュニティソースにもこの品番がありません",
	社媒头像: "SNS アバター",
	离开位置: "離脱位置",
	离开详情后小窗播放: "詳細を離れたらミニプレーヤーで再生",
	离线: "オフライン",
	离线权限: "オフライン権限",
	"离线配额不够：{0}": "オフライン割り当てが不足しています：{0}",
	"离线，已跳过": "オフラインのためスキップしました",
	私密: "プライベート",
	私有导出: "プライベートエクスポート",
	"种子 JSON 字段重复：{0}": "シード JSON のフィールドが重複しています：{0}",
	"种子 revision 不得回退或复用": "シードの revision は巻き戻しも再利用もできません",
	"种子内容与排队任务的摘要不一致，请重新派发": "シードの内容がキュー内タスクのダイジェストと一致しません。再配布してください",
	种子内容摘要不符: "シードの内容ダイジェストが一致しません",
	种子内来源编号身份冲突或使用本机编号: "シード内のソース ID が衝突しているか、ローカル ID を使用しています",
	"种子内身份名称冲突：{0}": "シード内の名前が衝突しています：{0}",
	"种子包必须是带整数 format 的对象": "シードパッケージは整数の format を持つオブジェクトである必要があります",
	"种子包结构无效：{0}": "シードパッケージの構造が無効です：{0}",
	种子必须原样继承全部历史撤销: "シードは過去の取り消しをすべてそのまま引き継ぐ必要があります",
	"种子文件缺少 info 字典": "トレントファイルに info 辞書がありません",
	种子片商归属成环: "シードのメーカー所属が循環しています",
	种子计数与包内容不一致: "シードの件数がパッケージ内容と一致しません",
	"种子资料 tags 必须是字符串数组": "シード資料の tags は文字列の配列である必要があります",
	"种子资料列无效：{0}": "シード資料の列が無効です：{0}",
	"种子链接必须是无凭据的 HTTP(S) 地址": "トレントのリンクは認証情報を含まない HTTP(S) アドレスである必要があります",
	秒: "秒",
	移入回收站: "ゴミ箱に移動",
	"移入回收站 · 文件仍保留，可从回收站永久清除": "ゴミ箱に移動 · ファイルは残り、ゴミ箱から完全に削除できます",
	移入回收站失败: "ゴミ箱への移動に失敗しました",
	移出播放列表: "プレイリストから外す",
	移出稍后看: "後で見るから外す",
	移动状态或完整成员不符: "移動状態または全メンバーが一致しません",
	"移动状态未确认，保留意图回执并停止；不重复操作、不写数据库": "移動状態が未確認のため、意図レシートを残して停止しました。操作の繰り返しやデータベースへの書き込みは行いません",
	移动确认次数越出预算: "移動の確認回数が上限を超えました",
	移动请求仍可能在服务端处理: "移動リクエストがまだサーバー側で処理中の可能性があります",
	移除: "削除",
	"移除 {0}": "{0} を削除",
	"移除 {0} 条订阅源": "{0} 件の購読フィードを削除",
	移除创作者别名: "クリエイターの別名を削除",
	"移除别名 {0}": "別名 {0} を削除",
	移除口味数据源: "好みデータソースを削除",
	移除所选创作者别名: "選択したクリエイターの別名を削除",
	移除所选别名: "選択した別名を削除",
	"移除所选别名（{0}）": "選択した別名を削除（{0}）",
	移除所选订阅源: "選択した購読フィードを削除",
	移除目录规则: "ディレクトリルールを削除",
	移除索引器: "インデクサーを削除",
	"移除索引器 {0}": "インデクサー {0} を削除",
	移除规则: "ルールを削除",
	移除订阅源: "購読フィードを削除",
	"移除该浏览器的读取配置和已导入历史、书签，浏览器原文件保留。可以通过添加浏览器重新接入。": "このブラウザの読み込み構成と、インポート済みの閲覧履歴・ブックマークを削除します。ブラウザ側の元ファイルは残ります。「ブラウザを追加」から再接続できます。",
	移除这一条: "この項目を削除",
	移除这个文件夹: "このフォルダを削除",
	"程序与数据目录重叠，请手动卸载": "プログラムとデータフォルダが重なっています。手動でアンインストールしてください",
	程序目录不适合自动卸载: "このプログラムフォルダは自動アンインストールに適していません",
	稍后: "後で",
	"稍后在配置页开始扫描媒体库。": "後で構成ページからメディアライブラリのスキャンを開始します。",
	稍后看: "後で見る",
	"稍后看 · 加入或移出队列": "後で見る · キューに追加または削除",
	空名: "名前が空",
	空文件夹: "空のフォルダ",
	"空文件夹 {0} 个": "空のフォルダ {0} 個",
	空间使用偏高: "使用容量がやや多めです",
	空间充足: "容量に余裕があります",
	空间即将用满: "容量がまもなくいっぱいになります",
	窗口不透明度: "ウィンドウの不透明度",
	窗口颜色: "ウィンドウの色",
	立即拉取: "今すぐ取得",
	立即重启: "今すぐ再起動",
	竖屏: "縦画面",
	"站上同名不止一位：{0}": "サイト上に同名の人が複数います：{0}",
	站上没有这一页: "サイトにこのページがありません",
	"站上这一页挂在「{0}」名下": "サイト上のこのページは「{0}」に紐づいています",
	"站内 id 精确匹配": "サイト内 ID の完全一致",
	"站内存在以该词开头的标签 {0}": "サイト内にこの語で始まるタグ {0} があります",
	"站内存在标签 {0}": "サイト内にタグ {0} があります",
	"站内搜索{0}「{1}」": "サイト内で{0}「{1}」を検索",
	"站内标签 {0} 下有 {1} 件作品": "サイト内のタグ {0} に {1} 件の作品があります",
	"站内标签 {0} 下有作品": "サイト内のタグ {0} に作品があります",
	"站内标签以该词开头：{0} 下有 {1} 件作品": "サイト内のタグがこの語で始まります：{0} に {1} 件の作品があります",
	站内没有查到来源: "サイト内でソースが見つかりませんでした",
	站外链接: "外部リンク",
	站方拒绝了这个出口: "サイト側がこの出口を拒否しました",
	站方按地区拒绝了这个出口: "サイト側が地域を理由にこの出口を拒否しました",
	站方要求年龄验证: "サイト側が年齢確認を求めています",
	站点: "サイト",
	"站点不让游客读帖，检查更新必须带登录会话；前面的 DDoS-Guard 对标准桌面浏览器标识不出质询，Peach 也不解任何质询，cookie 失效就原样报错。": "このサイトはゲストに投稿を読ませないため、更新の確認にはログインセッションが必要です。前段の DDoS-Guard は標準的なデスクトップブラウザの識別子にはチャレンジを出しません。Peach はチャレンジを一切解かず、Cookie が無効になればそのままエラーを返します。",
	站点作品号: "サイトの作品番号",
	"站点拒绝程序访问或一次临时故障都会落在这里。链接保留，可勾选后单独重试。": "サイトがプログラムからのアクセスを拒否した場合や一時的な障害が起きた場合はここに表示されます。リンクは残るので、チェックを入れて個別に再試行できます。",
	站点根: "サイトのルート",
	"站点返回 404 或 410，确认这个地址不存在。": "サイトが 404 または 410 を返したため、このアドレスは存在しないと判断しました。",
	端口: "ポート",
	端口当前可用: "ポートは現在使用できます",
	端口正在使用: "ポートは使用中です",
	端口状态未取得: "ポートの状態を取得できませんでした",
	"端口要是 1 到 65535 之间的整数": "ポートは 1～65535 の整数で指定してください",
	"第 {0} 卷": "第 {0} 巻",
	"第 {0} 张": "{0} 枚目",
	"第 {0} 张，共 {1} 张": "{0} / {1} 枚目",
	"第 {0} 格": "{0} コマ目",
	"第 {0} 页": "{0} ページ目",
	等: "など",
	"等 {0} 个名字": "ほか {0} 件の名前",
	"等 {0} 人": "ほか {0} 人",
	"等 {0} 份": "ほか計 {0} 件",
	等下一次处理: "次回の処理を待機中",
	"等了 {0} 小时远端还没完成，多半是没有人做种。可以取消，或换一个磁力": "{0} 時間待ってもリモートが完了していません。シーダーがいない可能性が高いです。キャンセルするか、別のマグネットに切り替えてください",
	"等你在浏览器窗口里登录 PikPak": "ブラウザウィンドウで PikPak にログインするのを待っています",
	"等同于 {0}": "{0} と同等",
	等宽无衬线: "等幅サンセリフ",
	等宽衬线: "等幅セリフ",
	"等待上限在 1 到 {0} 小时之间": "待機上限は 1～{0} 時間の範囲で指定してください",
	等待上限要写成小时数: "待機上限は時間数で指定してください",
	"等待上限（小时）": "待機上限（時間）",
	等待安装完成后继续: "インストール完了後に続行",
	"等待当前文件响应，剩余时间待更新": "現在のファイルの応答を待っています。残り時間は更新待ちです",
	"等待扫描导入第一项馆藏。": "スキャンで最初のコレクション項目が取り込まれるのを待っています。",
	等待搜索磁力: "マグネット検索待ち",
	等待服务启动后继续: "サービス起動後に続行",
	"等待服务响应超时，请检查连接后重试。": "サービスの応答がタイムアウトしました。接続を確認してから再試行してください。",
	"等待服务响应超时，请稍后重试。": "サービスの応答がタイムアウトしました。しばらくしてから再試行してください。",
	等待识别正片并整理: "本編の識別と整理待ち",
	等待重新处理: "再処理待ち",
	筛选与排序: "絞り込みと並べ替え",
	筛选分组方式: "絞り込みのグループ化方法",
	筛选包含不支持的条件: "絞り込みにサポートされていない条件が含まれています",
	筛选名称: "絞り込み名",
	"筛选名称须为 1 到 80 个字符": "絞り込み名は 1～80 文字にしてください",
	筛选地址过长或格式不正确: "絞り込みのアドレスが長すぎるか、形式が正しくありません",
	筛选字段分类: "絞り込み項目のカテゴリ",
	筛选已保存: "絞り込みを保存しました",
	筛选当前分类: "現在のカテゴリを絞り込む",
	筛选想要: "ほしいものを絞り込む",
	筛选推荐: "おすすめを絞り込む",
	"筛选番号、女优或标题": "品番・女優・タイトルで絞り込む",
	简中: "簡体字",
	简体: "簡体字",
	简体中文: "簡体字中国語",
	算不出轨道时长: "トラックの再生時間を算出できません",
	管理: "管理",
	管理关注: "フォローを管理",
	管理媒体库: "メディアライブラリを管理",
	管理订阅: "購読を管理",
	类型: "種類",
	粉樱: "サクラピンク",
	"粗估，运行后校准": "概算（実行後に補正）",
	"粘贴 Cookie": "Cookie を貼り付け",
	"粘贴来源链接，或输入创作者名、id…": "ソースのリンクを貼り付けるか、クリエイター名・id を入力…",
	精选: "厳選",
	糖果: "キャンディ",
	系列: "シリーズ",
	系列偏好: "シリーズの好み",
	系统代理: "システムプロキシ",
	系统检查: "システムチェック",
	系统盘: "システムドライブ",
	"系统盘最低可用 GiB；运行中每隔一段时间复查": "システムドライブの最低空き容量（GiB）。実行中も一定間隔で再確認します",
	系统诊断: "システム診断",
	素人: "素人",
	"素人系総合 Wiki": "素人系総合 Wiki",
	"索引器 XML 含不支持的实体声明": "インデクサーの XML にサポートされていないエンティティ宣言が含まれています",
	"索引器 {0} API key": "インデクサー {0} の API key",
	"索引器 {0} Torznab 地址": "インデクサー {0} の Torznab アドレス",
	"索引器 {0} 名称": "インデクサー {0} の名前",
	"索引器名称须为 1 到 80 个字符": "インデクサー名は 1～80 文字にしてください",
	"索引器后备：已查询": "インデクサーへのフォールバック：照会済み",
	"索引器响应超过 2 MiB": "インデクサーの応答が 2 MiB を超えています",
	索引器地址格式不正确: "インデクサーのアドレス形式が正しくありません",
	"索引器提供的 API 地址": "インデクサーが提供する API アドレス",
	索引器数量超过上限: "インデクサーの数が上限を超えています",
	索引器查询超时: "インデクサーの照会がタイムアウトしました",
	索引器没有声明番号搜索能力: "インデクサーが品番検索に対応していません",
	"索引器没有返回 Torznab XML": "インデクサーが Torznab XML を返しませんでした",
	索引器编号为空或重复: "インデクサー ID が空か重複しています",
	"索引器返回 HTTP {0}": "インデクサーが HTTP {0} を返しました",
	索引器连接帮助: "インデクサー接続のヘルプ",
	索引器配置必须是对象: "インデクサー設定はオブジェクトである必要があります",
	"索引器配置没有保存，请检查本机凭据目录权限": "インデクサー設定を保存できませんでした。ローカルの認証情報フォルダの権限を確認してください",
	索引器配置读不出来: "インデクサー設定を読み込めません",
	"索引器配置读不出来，请在本机「配置 → 下载」中重新保存": "インデクサー設定を読み込めません。ローカルの「構成 → ダウンロード」で保存し直してください",
	索引版式: "インデックスのレイアウト",
	"紧凑 · 圆形头像": "コンパクト · 円形アバター",
	"紧凑 · 圆形标识": "コンパクト · 円形ロゴ",
	紫: "パープル",
	紫罗兰: "バイオレット",
	紫藤: "ウィステリア",
	"累计撤销 id 不得改写": "累積取り消しの ID は書き換えできません",
	"累计撤销需要格式 2 的 revision": "累積取り消しには format 2 の revision が必要です",
	網紅: "インフルエンサー",
	繁中: "繁体字",
	繁体: "繁体字",
	繁体中文: "繁体字中国語",
	繁體: "繁体字",
	繁體中文: "繁体字中国語",
	红: "レッド",
	红色: "レッド",
	约: "約",
	"约 {0} 天": "約 {0} 日",
	"线程 {0}": "スレッド {0}",
	线程存在: "スレッドあり",
	"线路 {0}": "回線 {0}",
	组: "グループ",
	绑定: "紐付け",
	绑定关注作者: "フォロー中の作者と紐づけ",
	结果: "結果",
	统一选择来源: "ソースを一括選択",
	统计: "統計",
	统计维度: "統計の観点",
	统计视图: "統計ビュー",
	继续: "続行",
	"继续载入中…": "続きを読み込み中…",
	"继续：{0}": "続行：{0}",
	续播位置不在这个播放列表中: "再開位置がこのプレイリストにありません",
	维护: "メンテナンス",
	"维护脚本 {0}": "メンテナンススクリプト {0}",
	绿: "グリーン",
	绿色: "グリーン",
	缓冲健康: "バッファの状態",
	缓存上限: "キャッシュ上限",
	"缓存上限和清理方式填在 CloudDrive「设置」里，清理方式选 LRU。上限不要填 0，系统盘至少留 40 GiB；填完重开设置页确认存住了。": "キャッシュ上限とクリーンアップ方式は CloudDrive の「設定」で入力し、クリーンアップ方式は LRU を選んでください。上限に 0 は入力せず、システムディスクには 40 GiB 以上を残してください。入力後は設定ページを開き直して保存されたことを確認してください。",
	"缓存按所在硬盘和可用内存选起步值，再根据播放表现调整。": "キャッシュは配置先のディスクと空きメモリに応じて初期値を選び、再生の状況を見て調整します。",
	缓存清理已停止: "キャッシュのクリーンアップを停止しました",
	编号: "ID",
	编号已属另一条实体: "この ID はすでに別のエンティティに属しています",
	编号已绑: "ID 紐付け済み",
	"编号已绑，资料取回不到 30 天": "ID 紐付け済み、資料取得から 30 日未満",
	"编号已绑，重取女优页": "ID 紐付け済み、女優ページを再取得",
	"编码 / 传输": "エンコード / 転送",
	编码未识别: "エンコードを識別できません",
	编辑: "編集",
	编辑名称: "名前を編集",
	编辑播放列表: "プレイリストを編集",
	缩小: "縮小",
	缩小播放墙: "再生ウォールを縮小",
	缩放: "ズーム",
	缩略图: "サムネイル",
	缩略图采集间隔: "サムネイルの取得間隔",
	"缺 {0}": "{0} 不足",
	缺封面: "カバーなし",
	"缺少 Peach 内部访问令牌，不能启动公网 Tunnel": "Peach の内部アクセストークンがないため、公開 Tunnel を起動できません",
	"缺少 untrunc": "untrunc がありません",
	"缺少 {0} 的设置": "{0} の設定がありません",
	"缺少{0}：{1}": "{0}がありません：{1}",
	缺少任务编号: "タスク ID がありません",
	"缺少内容哈希，不能进入复核候选": "コンテンツハッシュがないため、確認候補にできません",
	"缺少同步标记，无法判断两份数据库的先后": "同期マーカーがないため、2 つのデータベースの前後関係を判断できません",
	"缺少实体 id": "エンティティ ID がありません",
	缺少想要条目编号: "ほしいものの項目 ID がありません",
	"缺少：{0}": "不足：{0}",
	缺时长: "再生時間なし",
	"缺时间戳表的片子另存一份修好的头，原文件不动；缺索引的片子重建后替换原文件，": "タイムスタンプテーブルが欠けた動画は修復したヘッダーを別に保存し、元ファイルはそのままにします。インデックスが欠けた動画は再構築後に元ファイルを置き換え、",
	网址: "URL",
	网址快捷方式: "URL ショートカット",
	网盘与本地: "クラウドストレージとローカル",
	网红: "インフルエンサー",
	网络与访问: "ネットワークとアクセス",
	网络播放地址: "ネットワーク再生アドレス",
	网络活动: "ネットワークアクティビティ",
	"网络请求失败：{0}": "ネットワークリクエストに失敗しました：{0}",
	网页存档: "Web アーカイブ",
	网页存档的脚本或样式附件: "Web アーカイブのスクリプトまたはスタイルの添付ファイル",
	"网页版挂了 Cloudflare 验证码，Peach 不绕验证码，只能走官方 API。": "Web 版に Cloudflare の CAPTCHA がかかっています。Peach は CAPTCHA を回避しないため、公式 API のみを使います。",
	网页链接: "Web リンク",
	网黄博主: "アダルト系インフルエンサー",
	罗马字写法: "ローマ字表記",
	"罗马字单名，会命中别人": "ローマ字の単名のため、別人にも一致します",
	"署上这个名字的视频入库后会显示在这里。": "この名前がクレジットされた動画を取り込むと、ここに表示されます。",
	署名含: "クレジットに含む",
	"署名含 {0}": "クレジットに {0} を含む",
	美乳: "美乳",
	美颜: "美形",
	翠绿: "エメラルド",
	翡翠: "ジェイド",
	耀斑: "フレア",
	"联网识别候选，需核对来源页": "オンライン識別の候補です。ソースページを確認してください",
	背后位: "バック",
	背景不透明度: "背景の不透明度",
	背景颜色: "背景色",
	"能连接到 Peach 的设备打开地址就能看馆藏，不需要登录。": "Peach に接続できるデバイスならアドレスを開くだけでコレクションを閲覧でき、ログインは不要です。",
	脚: "足",
	脚交: "足コキ",
	自动: "自動",
	"自动下载仅适用于 Windows 独立测试包": "自動ダウンロードは Windows 単体テストパッケージでのみ使えます",
	自动下载更新: "更新を自動ダウンロード",
	自动更新: "自動更新",
	"自动更新设置无法读取，请重新保存。": "自動更新の設定を読み込めません。保存し直してください。",
	自动更新需要由托盘管理的服务: "自動更新にはトレイで管理されるサービスが必要です",
	"自动更新需要由托盘管理的服务。": "自動更新にはトレイで管理されるサービスが必要です。",
	自动检查新版本: "新しいバージョンを自動確認",
	自动检查更新: "更新を自動確認",
	自动检查间隔: "自動確認の間隔",
	自动识别: "自動認識",
	自定义: "カスタム",
	自定义元数据来源: "カスタムメタデータソース",
	自定义来源配置无效: "カスタムソースの設定が無効です",
	自己挑的: "自分で選んだもの",
	自己添过的: "自分で追加したもの",
	"至少 8 个字符。保存后其他设备需要重新登录。": "8 文字以上。保存後、他のデバイスでは再ログインが必要です。",
	至少要给一个模板: "テンプレートを少なくとも 1 つ指定してください",
	至少选择一种有效内容类型: "有効なコンテンツの種類を少なくとも 1 つ選んでください",
	"舞台播放器还没有接上宿主（configureStagePlayer）": "ステージプレーヤーがまだホストに接続されていません（configureStagePlayer）",
	"舞台还没有接上宿主（configureStage）": "ステージがまだホストに接続されていません（configureStage）",
	色系: "カラー系統",
	艺人: "アーティスト",
	艺人与新作: "出演者と新作",
	"艺人身份已变化，请重新预览": "アーティストの身元が変わりました。もう一度プレビューしてください",
	艺术创作者: "アートクリエイター",
	花朵: "花",
	苔绿: "モスグリーン",
	英文: "英語",
	英语: "英語",
	茄紫: "茄子紺",
	草绿: "リーフグリーン",
	莓紫: "ベリーパープル",
	获取凭据: "認証情報を取得",
	落地未见: "取り込み先で見つからない",
	落地目录里没有可识别的视频: "取り込み先フォルダに識別できる動画がありません",
	落日: "夕焼け",
	葡萄: "グレープ",
	蓝: "青",
	蓝色: "ブルー",
	薄荷: "ミント",
	薄荷冰: "アイスミント",
	薰衣草: "ラベンダー",
	藏蓝: "ネイビー",
	藕粉: "ダスティピンク",
	"虚拟环境缺少基础解释器目录：{0}": "仮想環境にベースインタープリターのフォルダがありません：{0}",
	蛋白石: "オパール",
	蜜桃: "ピーチ",
	血液型: "血液型",
	"补 code {0}（{1} 条为空）": "code {0} を補完（{1} 件が空）",
	"补上 {0} 部的样张（{1} 张）": "{0} 本のサンプル画像を補完（{1} 枚）",
	"补全完成：取得 {0} 张封面，生成 {1} 部视频预览。": "補完が完了しました：カバー {0} 枚を取得し、動画プレビュー {1} 本を生成しました。",
	补全未完成: "補完が完了していません",
	补全资料: "情報を補完",
	补全资料图片: "資料画像を補完",
	"补全资料或添加标签后，这里会显示馆藏中的内容标签。": "情報を補完するかタグを追加すると、コレクション内のコンテンツタグがここに表示されます。",
	补全预览: "プレビューを補完",
	补厂牌官网与标识: "メーカーの公式サイトとロゴを補完",
	补女优别名: "女優の別名を補完",
	补女优资料: "女優の資料を補完",
	补番号样张: "品番のサンプル画像を補完",
	补资料失败: "資料の補完に失敗しました",
	补齐关注来源凭证: "フォロー中のソースの認証情報を補完",
	补齐女优资料: "女優の資料を補完",
	"补齐女优资料：别名 {0} 个，头像 {1} 张": "女優情報を補完：別名 {0} 件、アバター {1} 枚",
	补齐馆藏证据: "コレクションの証拠を補完",
	表格视图: "テーブル表示",
	衬线: "セリフ",
	"被 Cloudflare 拦下": "Cloudflare にブロックされました",
	被打断: "中断",
	被挡下的: "ブロック中",
	被撤销别名不能同时作为身份锚点: "取り消された別名は身元アンカーとして同時に使えません",
	被撤销编号不能同时作为身份锚点: "取り消された ID は身元アンカーとして同時に使えません",
	"裁剪 {0} 的封面": "{0} のカバーを切り抜き",
	裁剪封面: "カバーを切り抜き",
	"裁剪封面：框出正封那一块": "カバーを切り抜き：表面カバーの部分を囲んでください",
	装饰符小图: "装飾用の小さな画像",
	裸足: "裸足",
	褐棕: "ブラウン",
	西方: "洋物",
	西方成人发行: "欧米成人向けリリース",
	西方身份回配: "洋物の身元照合",
	要先勾选至少一张演员卡: "先に出演者カードを少なくとも 1 枚選んでください",
	"要先有 CloudDrive2 能访问的 HTTPS 地址才能生成。": "生成するには、CloudDrive2 からアクセスできる HTTPS アドレスが必要です。",
	要先给一个女优名: "先に女優名を入力してください",
	要写的字段是空的: "書き込むフィールドが空です",
	"要收录的 genre 是空的": "登録する genre が空です",
	观看: "視聴",
	观看与反馈: "視聴とフィードバック",
	观看历史: "視聴履歴",
	"观看或标记作品后，可以探索少看的馆藏。": "作品を視聴またはマークすると、あまり見ていないコレクションを探索できます。",
	观看时间: "視聴日時",
	观看次数: "視聴回数",
	观看状态: "視聴状況",
	观看进度: "視聴進捗",
	规范创作者: "正規クリエイター",
	规范创作者名: "正規クリエイター名",
	规范创作者名和平台别名都不能为空: "正規のクリエイター名とプラットフォーム別名はどちらも空にできません",
	"规范化名称存在包含关系，仅供人工确认": "正規化した名前に包含関係があります。手動確認用です",
	规范名不能作为别名移除: "正規名は別名として削除できません",
	"视口 / 帧": "ビューポート / フレーム",
	视图: "表示",
	视图与标签: "表示とタグ",
	视频: "動画",
	"视频 ID / 会话": "動画 ID / セッション",
	"视频 {0}": "動画 {0}",
	"视频 · {0}{1}": "動画 · {0}{1}",
	视频卡片大小: "動画カードのサイズ",
	视频合集: "動画総集編",
	视频封面生成失败: "動画カバーの生成に失敗しました",
	"视频抽帧未取得，反馈问题请导出诊断报告": "動画のフレーム抽出結果を取得できませんでした。問題を報告する場合は診断レポートをエクスポートしてください",
	"视频抽帧超时，可重试；反馈问题请导出诊断报告": "動画のフレーム抽出がタイムアウトしました。再試行できます。問題を報告する場合は診断レポートをエクスポートしてください",
	"视频时长未取得，请检查媒体文件后重试": "動画の再生時間を取得できませんでした。メディアファイルを確認してから再試行してください",
	视频暂时无法播放: "動画を一時的に再生できません",
	视频缩略图采集: "動画サムネイルの収集",
	"视频轨没有 stts": "映像トラックに stts がありません",
	视频预览: "動画プレビュー",
	视频预览响应未取得: "動画プレビューの応答を取得できませんでした",
	"视频预览已生成：{0} 部": "動画プレビューを生成しました：{0} 本",
	视频预览未取得: "動画プレビューは未取得",
	"视频预览生成已关闭，请先在媒体库设置中开启": "動画プレビューの生成はオフになっています。先にメディアライブラリ設定でオンにしてください",
	角色: "役柄",
	角色扮演: "コスプレ",
	角色设定: "役柄設定",
	"解压到 {0}。": "{0} に展開します。",
	"解码出 {0} 帧，样本表里有 {1} 个": "{0} フレームをデコードしましたが、サンプルテーブルには {1} 個あります",
	"解码器报的时间戳不在 stts 里": "デコーダーが報告したタイムスタンプが stts にありません",
	计划: "予定",
	计划中的厂牌身份不存在: "計画中のメーカーの身元が存在しません",
	计划中的账号身份不存在: "計画中のアカウントの身元が存在しません",
	"订阅地址必须以 https:// 开头": "購読アドレスは https:// で始まる必要があります",
	"订阅地址必须是解析到公网的 HTTPS 地址": "購読アドレスは公開ネットワークに解決される HTTPS アドレスである必要があります",
	订阅新作: "新作を購読",
	订阅检查已停止: "購読チェックを停止しました",
	订阅源批量操作: "購読フィードの一括操作",
	订阅源拉取: "購読フィードの取得",
	订阅源拉取只在写入端可用: "購読フィードの取得は書き込み側でのみ使えます",
	"认不出番号：{0}": "品番を識別できません：{0}",
	认不出这个番号: "この品番を識別できません",
	"认不出这条关注作者建档后继：{0}": "フォロー作者の登録後続タスクを識別できません：{0}",
	"认不出这条取资料后继：{0}": "資料取得の後続タスクを識別できません：{0}",
	"认不出这条查创作者身份后继：{0}": "クリエイター身元照会の後続タスクを識別できません：{0}",
	"认不出这条补别名后继：{0}": "別名補完の後続タスクを識別できません：{0}",
	"认不出这条补厂牌后继：{0}": "メーカー補完の後続タスクを識別できません：{0}",
	"认不出这条补头像后继：{0}": "アバター補完の後続タスクを識別できません：{0}",
	"认不出这条补女优资料后继：{0}": "女優資料補完の後続タスクを識別できません：{0}",
	"认证样本越出 A 盘来源": "認証サンプルが A ドライブのソースの範囲外です",
	记一次高潮: "O を1回記録",
	"记录在其他设备上：导出文件后，选择「导入历史文件」或「导入书签文件」。书签支持浏览器导出的 HTML 文件和 Chromium Bookmarks JSON 文件。": "記録が別のデバイスにある場合：ファイルをエクスポートしてから「履歴ファイルをインポート」または「ブックマークファイルをインポート」を選択してください。ブックマークはブラウザからエクスポートした HTML ファイルと Chromium Bookmarks JSON ファイルに対応しています。",
	"记录已接到新文件，批次 {0}": "記録を新しいファイルに引き継ぎました（バッチ {0}）",
	设置: "設定",
	"设置写入失败：{0}": "設定の書き込みに失敗しました：{0}",
	设置分区: "設定セクション",
	设置完成: "設定完了",
	"设置已变更，请刷新后再保存": "設定が変更されました。再読み込みしてから保存してください",
	设置必须是一个对象: "設定はオブジェクトである必要があります",
	设置文件: "設定ファイル",
	"设置正在保存，请稍后重试": "設定を保存中です。しばらくしてから再試行してください",
	设置目录用途: "フォルダの用途を設定",
	设置访问密码: "アクセスパスワードを設定",
	设置采集来源与凭证: "収集ソースと認証情報を設定",
	访问: "アクセス",
	访问安全: "アクセスの安全性",
	访问密码: "アクセスパスワード",
	访问密码不正确: "アクセスパスワードが正しくありません",
	访问密码配置无法读取: "アクセスパスワードの設定を読み込めません",
	"访问密码需为 8–256 个字符": "アクセスパスワードは 8～256 文字で入力してください",
	访问端口由托盘管理: "アクセスポートはトレイで管理されています",
	访问范围: "アクセス範囲",
	访问设置不是受支持的密码模式: "アクセス設定がサポートされているパスワードモードではありません",
	"访问设置已变更，请刷新后再保存": "アクセス設定が変更されました。再読み込みしてから保存してください",
	"访问设置损坏，不能启动公网 Tunnel": "アクセス設定が破損しているため、公開 Tunnel を起動できません",
	"访问设置无法读取，请在本机检查配置文件": "アクセス設定を読み込めません。ローカルで設定ファイルを確認してください",
	"访问设置无法读取，请在本机检查配置文件。": "アクセス設定を読み込めません。このマシンで構成ファイルを確認してください。",
	"访问设置正在保存，请稍后重试": "アクセス設定を保存中です。しばらくしてから再試行してください",
	"证书未覆盖：": "証明書の対象外：",
	"证书还有 {0} 天到期": "証明書の有効期限まであと {0} 日です",
	"证据 {0}": "証拠 {0}",
	"证据未取得（{0} 不可写：{1}）": "証拠を取得できませんでした（{0} に書き込めません：{1}）",
	"证据还不足以形成稳定口味结论。": "安定した好みの結論を出すには、まだ証拠が足りません。",
	"评为 {0} 星": "星 {0} で評価",
	评分: "評価",
	"评分 {0}": "評価 {0}",
	评论: "レビュー",
	评论日期: "レビュー日",
	"评论未取得，请稍后重试": "レビューを取得できませんでした。しばらくしてから再試行してください",
	"评论标记 {0}": "コメントのマーク {0}",
	"评论资源未取得：": "コメントのリソースを取得できませんでした：",
	"评论页码必须在 1 至 8 之间": "コメントのページ番号は 1～8 の範囲で指定してください",
	"识别中…": "識別中…",
	识别失败: "識別に失敗しました",
	"诊断报告下载失败（HTTP {0}）": "診断レポートのダウンロードに失敗しました（HTTP {0}）",
	"诊断报告已保存，可打开目录或文件。": "診断レポートを保存しました。フォルダまたはファイルを開けます。",
	诊断报告无法写入数据目录或临时目录: "診断レポートをデータフォルダにも一時フォルダにも書き込めません",
	"诊断报告未取得。": "診断レポートを取得できませんでした。",
	诊断读取失败: "診断の読み込みに失敗しました",
	词表: "語彙リスト",
	"试查番号（回车查询）": "品番を試しに検索（Enter で検索）",
	"试试其他名称。": "別の名前で試してください。",
	"试试其他番号、女优或标题。": "別の品番、女優、タイトルで試してください。",
	该作品没有可用的封面地址: "この作品には使用できるカバーのアドレスがありません",
	该作品的封面未取得: "この作品のカバーを取得できませんでした",
	"该元数据字段没有 Peach 写入映射": "このメタデータフィールドには Peach の書き込みマッピングがありません",
	"该创作者有 {0} 条作品，超过单次批准上限 {1}，请在页面上显式勾选后再通过": "このクリエイターには {0} 件の作品があり、1 回の承認上限 {1} を超えています。ページで明示的にチェックを入れてから承認してください",
	该条目不需要生成视频封面: "この項目には動画カバーの生成は不要です",
	该标签不在当前词表中: "このタグは現在の語彙にありません",
	详情: "詳細",
	详细设置: "詳細設定",
	详细配置说明: "詳細な構成の説明",
	"请从 Peach 设置页提交": "Peach の設定ページから送信してください",
	"请从 Peach 配置页提交": "Peach の構成ページから送信してください",
	"请从支持的 JAV 影片详情页添加": "対応している JAV 作品の詳細ページから追加してください",
	"请使用支持原盘的外部播放器打开。": "オリジナルディスク形式に対応した外部プレーヤーで開いてください。",
	请使用本机地址打开设置: "ローカルアドレスで設定を開いてください",
	"请先为所选资料选择要采用的来源。": "選択した情報に採用するソースを先に選んでください。",
	"请先保存所选网盘的账号和目标目录。": "選択したクラウドストレージのアカウントと保存先フォルダを先に保存してください。",
	请先启用浏览器添加: "先にブラウザからの追加を有効にしてください",
	请先在下载渠道配置网盘账号和目标目录: "先にダウンロードチャネルでクラウドストレージのアカウントと対象フォルダを設定してください",
	请先在媒体库设置中开启视频预览生成: "先にメディアライブラリ設定で動画プレビューの生成をオンにしてください",
	请先在配置页添加媒体目录: "先に構成ページでメディアフォルダを追加してください",
	请先完成首次设置: "先に初回セットアップを完了してください",
	"请先将 CloudDrive2 或 OpenList 中的网盘挂载为本机文件夹；Windows 读取 NAS 共享时，请先映射为盘符，再选择对应文件夹。本机安装提示仅适用于在本机运行 CloudDrive。文件操作需要挂载工具和网盘账号授予写入权限；光鸭云盘的上传、建文件夹、改名和移动需要 CloudDrive2 v1.1.0 或更高版本，删除和复制暂不支持。": "先に CloudDrive2 または OpenList でクラウドストレージをローカルフォルダとしてマウントしてください。Windows で NAS 共有を読み込む場合は、先にドライブ文字に割り当ててから対応するフォルダを選んでください。ローカルインストールの案内は、このマシンで CloudDrive を実行する場合にのみ当てはまります。ファイル操作には、マウントツールとクラウドストレージのアカウントに書き込み権限が必要です。光鸭云盘のアップロード、フォルダ作成、名前変更、移動には CloudDrive2 v1.1.0 以降が必要で、削除とコピーにはまだ対応していません。",
	"请先查看字段与数据预览，再明确同意上传": "先にフィールドとデータのプレビューを確認し、アップロードに明示的に同意してください",
	请先添加媒体目录: "先にメディアフォルダを追加してください",
	请先粘贴一条来源链接: "先にソースのリンクを貼り付けてください",
	"请先输入要查找的名字或 id": "先に検索する名前または ID を入力してください",
	"请在 Peach 下载渠道启用浏览器添加并配置专用令牌": "Peach のダウンロードチャネルでブラウザからの追加を有効にし、専用トークンを設定してください",
	"请在本机「配置 → 下载」中添加并启用索引器": "ローカルの「構成 → ダウンロード」でインデクサーを追加して有効にしてください",
	"请在运行 Peach 的电脑上打开系统诊断": "Peach を実行しているコンピューターでシステム診断を開いてください",
	"请在运行 Peach 的电脑上打开配置": "Peach を実行しているコンピューターで構成を開いてください",
	"请在运行 Peach 的设备上打开 Peach 配置": "Peach を実行しているデバイスで Peach 構成を開いてください",
	"请在运行 Peach 的这台电脑上打开设置。": "Peach を実行しているこのコンピューターで設定を開いてください。",
	"请填写 PikPak 账号和密码": "PikPak のアカウントとパスワードを入力してください",
	请填写响应中番号字段的路径: "レスポンス内の品番フィールドのパスを入力してください",
	"请填写媒体目录的完整路径，例如 /media": "メディアフォルダのフルパスを入力してください（例：/media）",
	"请填写带端口的 HTTP 或 SOCKS 代理地址": "ポート付きの HTTP または SOCKS プロキシのアドレスを入力してください",
	请填写浏览器名称和资料目录: "ブラウザ名とプロファイルフォルダを入力してください",
	请打开详情播放在线作品: "オンライン作品は詳細を開いて再生してください",
	请打开详情确认计费来源: "詳細を開いて課金対象のソースを確認してください",
	请提交每个站点的地址: "各サイトのアドレスを送信してください",
	"请提供一个明确的 JAV 番号": "明確な JAV 品番を指定してください",
	"请查看任务记录，核对已处理的文件。": "タスク記録で処理済みのファイルを確認してください。",
	"请查看任务记录，核对已处理的链接。": "タスク記録で処理済みのリンクを確認してください。",
	请查看并处理未完成项: "未完了の項目を確認して対応してください",
	请求体必须是一个对象: "リクエストボディはオブジェクトである必要があります",
	"请求失败（{0}）": "リクエストに失敗しました（{0}）",
	"请求失败，请重试": "リクエストに失敗しました。再試行してください",
	"请求正文要是 JSON 对象": "リクエスト本文は JSON オブジェクトである必要があります",
	"请求的内容已不存在，请刷新列表。": "リクエストした内容は存在しません。リストを更新してください。",
	"请求超时，请稍后重试。": "リクエストがタイムアウトしました。しばらくしてから再試行してください。",
	"请求过于频繁，请稍后重试。": "リクエストが多すぎます。しばらくしてから再試行してください。",
	"请添加 1 到 100 个媒体目录": "メディアフォルダを 1～100 個追加してください",
	"请确认卸载 Peach": "Peach のアンインストールを確認してください",
	请稍候: "お待ちください",
	"请粘贴一行 Cookie 请求头": "Cookie リクエストヘッダーを 1 行貼り付けてください",
	请粘贴磁力链接: "マグネットリンクを貼り付けてください",
	"请输入 15–10080 的整数（分钟）。": "15～10080 の整数（分）を入力してください。",
	"请输入 8–256 个字符。": "8～256 文字で入力してください。",
	"请输入 {0}–{1} 的整数（{2}）": "{0}～{1} の整数（{2}）を入力してください",
	请输入关联名称: "関連付ける名前を入力してください",
	请输入可识别的作品番号: "識別できる作品の品番を入力してください",
	请输入当前访问密码: "現在のアクセスパスワードを入力してください",
	请输入访问密码: "アクセスパスワードを入力してください",
	"请选择 115 或 PikPak": "115 または PikPak を選んでください",
	"请选择 4 MiB 以内的 SRT、ASS、SSA 或 VTT 文件": "4 MiB 以内の SRT、ASS、SSA、VTT ファイルを選択してください",
	"请选择 Peach 代理的连接方式": "Peach プロキシの接続方法を選んでください",
	"请选择 SRT、ASS、SSA 或 VTT 文本字幕": "SRT、ASS、SSA、VTT のいずれかのテキスト字幕を選んでください",
	"请选择不超过 2000 字的静态文案": "2000 文字以内の静的テキストを選んでください",
	请选择代理流量保护设置: "プロキシのトラフィック保護設定を選んでください",
	"请选择低占用、标准或高强度模式": "低負荷、標準、高負荷のいずれかのモードを選んでください",
	请选择列表中的媒体库图标: "一覧からメディアライブラリのアイコンを選んでください",
	请选择列表中的媒体来源: "一覧からメディアソースを選んでください",
	"请选择启用、更新令牌或关闭": "有効化、トークン更新、無効化のいずれかを選んでください",
	请选择失效链接: "無効なリンクを選んでください",
	请选择媒体读取策略: "メディアの読み込み方式を選択してください",
	请选择已有数据目录的绝对路径: "既存のデータフォルダの絶対パスを選んでください",
	"请选择是否删除 Peach 数据": "Peach のデータを削除するかどうかを選んでください",
	请选择有效的保持登录时间: "有効なログイン保持期間を選んでください",
	请选择有效的视频项目: "有効な動画項目を選んでください",
	请选择来源: "ソースを選んでください",
	请选择来源连接方式: "ソースの接続方法を選んでください",
	请选择检查频率: "チェック頻度を選んでください",
	请选择正在处理的任务: "処理中のタスクを選んでください",
	"请选择浏览器导出的 HTML 书签文件或 Chromium Bookmarks 文件": "ブラウザからエクスポートした HTML ブックマークファイル、または Chromium の Bookmarks ファイルを選んでください",
	请选择目录用途: "フォルダの用途を選んでください",
	"请选择直连或 Peach 代理": "直接接続または Peach プロキシを選んでください",
	请选择自动更新方式: "自動更新の方法を選んでください",
	请选择视频预览生成状态: "動画プレビューの生成状態を選んでください",
	请选择设置或关闭密码: "パスワードを設定するか無効にするかを選んでください",
	"请选择运行 Peach 的电脑上的浏览器资料。": "Peach を実行しているコンピューター上のブラウザプロファイルを選択してください。",
	请重试: "再試行してください",
	"读 f95zone 首楼的作者主页链接需要登录 cookie；请把它写进 peach-data/secrets/follow/f95zone.json": "f95zone の最初の投稿にある作者ページのリンクを読むにはログイン Cookie が必要です。peach-data/secrets/follow/f95zone.json に書き込んでください",
	读不出证书有效期: "証明書の有効期限を読み取れません",
	"读不出这部作品的{0}": "この作品の{0}を読み取れません",
	读不到媒体修复的状态: "メディア修復の状態を読み込めません",
	读取任务中心失败: "タスクセンターの読み込みに失敗しました",
	读取单张配套图片: "付属画像を 1 枚読み込み",
	读取口味分析失败: "好み分析の読み込みに失敗しました",
	读取失败: "読み込みに失敗しました",
	读取媒体属性: "メディア情報の読み込み",
	读取媒体属性与生成预览: "メディア情報の読み込みとプレビュー生成",
	"读取已有 NFO 和封面，采集缺失资料。符合自动规则的资料会在处理完成后保存到数据库，其余资料留待确认。": "既存の NFO とカバーを読み込み、不足している情報を収集します。自動ルールに合致する情報は処理完了後にデータベースへ保存され、それ以外は確認待ちになります。",
	"读取接着看失败：{0}": "「続きから見る」の読み込みに失敗しました：{0}",
	读取时长与分辨率: "再生時間と解像度の読み込み",
	读取未取得: "読み込めませんでした",
	读取本地资料: "ローカル資料の読み込み",
	读取浏览器历史: "ブラウザ履歴を読み込む",
	读取浏览器记录: "ブラウザの記録を読み込む",
	"读取浏览记录：第 {0} / {1} 个浏览器资料，已读取 {2} 条": "閲覧履歴を読み込み中：ブラウザプロファイル {0} / {1}、{2} 件読み込み済み",
	读取自定义来源: "カスタムソースを読み込む",
	"读取运行 Peach 的这台电脑上的浏览历史与书签": "Peach を実行しているこのコンピューター上の閲覧履歴とブックマークを読み込む",
	读取配套图片: "付属画像を読み込む",
	"读取配套图片超时，可稍后重试": "付属画像の読み込みがタイムアウトしました。しばらくしてから再試行してください",
	读取采集来源失败: "収集ソースの読み込みに失敗しました",
	"读取长度和下载线程填在每个网盘各自的下载设置里，线程都从 2 开始。": "読み込み長とダウンロードスレッド数は各クラウドストレージのダウンロード設定で指定します。スレッド数はいずれも 2 から始まります。",
	"读取长度（默认 / 最小）": "読み込み長（デフォルト / 最小）",
	谁可以访问: "アクセスできるユーザー",
	"谁可以访问：": "アクセスできるユーザー：",
	调整播放顺序: "再生順を調整",
	调整数据目录的写入权限: "データフォルダの書き込み権限を調整",
	账号: "アカウント",
	账号没有本人身份依据: "アカウントに本人であることの根拠がありません",
	账号身份已变化: "アカウントの身元が変わりました",
	账本路径: "台帳のパス",
	"质量目标只能是高清、中字或无码": "品質の目標は高画質、中国語字幕、無修正のいずれかのみです",
	"贴进 CloudDrive2「设置 → Webhooks」，需要会员；更换密钥后要重贴。": "CloudDrive2 の「設定 → Webhooks」に貼り付けてください（会員が必要です）。キーを変更したら貼り直してください。",
	"资产 {0} 已发生后续改动，拒绝回滚整批": "アセット {0} はその後変更されているため、一括ロールバックを拒否しました",
	"资产 {0} 有多个存续创作者，需复核兼容投影": "アセット {0} に有効なクリエイターが複数います。互換プロジェクションを確認してください",
	"资产 {0} 的创作者字段拒绝写入": "アセット {0} のクリエイターフィールドへの書き込みを拒否しました",
	"资产已被改过：期望 revision {0}，数据库现值 {1}": "アセットはすでに変更されています：期待した revision は {0}、データベースの現在値は {1}",
	资料: "情報",
	资料与事务所归属只适用于女优: "資料と事務所の所属は女優にのみ適用されます",
	资料出处: "情報の出典",
	"资料取回不到 30 天": "資料取得から 30 日未満",
	资料库: "データベース",
	资料未取得: "情報は未取得",
	"资料未取得：": "情報は未取得：",
	资料未过期: "資料は期限切れではありません",
	资料目录不可用: "データフォルダを利用できません",
	资料目录或历史文件: "プロファイルフォルダまたは履歴ファイル",
	资料结果: "情報の結果",
	资料解析失败: "資料の解析に失敗しました",
	资料解析通过: "資料の解析に成功しました",
	资料还没取到: "情報はまだ取得されていません",
	资料采集失败: "資料の収集に失敗しました",
	资料页上没有数据库里她的名字: "資料ページにデータベース上の彼女の名前がありません",
	资料页列着数据库里她的名字: "資料ページにデータベース上の彼女の名前が載っています",
	资源: "リソース",
	资源同步: "リソース同期",
	资源同步检查: "リソース同期チェック",
	资源同步清理: "リソース同期クリーンアップ",
	资源搜索: "リソース検索",
	"资源搜索暂不可用，请在 Peach 检查来源后重试": "リソース検索は現在利用できません。Peach でソースを確認してから再試行してください",
	"资源搜索正在进行，请稍后重试": "リソース検索を実行中です。しばらくしてから再試行してください",
	资源检查已停止: "リソースチェックを停止しました",
	资源清理已停止: "リソースのクリーンアップを停止しました",
	资源清理未完成: "リソースのクリーンアップが完了していません",
	资源盘: "リソースドライブ",
	资源被拒: "リソースが拒否されました",
	资源链接: "リソースリンク",
	"资源链接{0}": "リソースリンク{0}",
	资源链接未取得: "リソースリンクは未取得",
	"资源链接未取得，请稍后重试或检查来源连接。": "リソースのリンクを取得できませんでした。しばらくしてから再試行するか、ソース接続を確認してください。",
	赭棕: "オーカー",
	超上限未派: "上限超過で未発行",
	"超时标为停滞；可填 1–{0} 小时。": "時間を超えると停滞としてマークします。1～{0} 時間で指定できます。",
	超深度未派: "深さ超過で未発行",
	"超过 {0} 次重定向": "リダイレクトが {0} 回を超えました",
	"超长片-30分上": "超長編-30分以上",
	趣味・特技: "趣味・特技",
	足: "足",
	足交: "足コキ",
	足系: "足フェチ",
	足迹: "足",
	跟随浏览器: "ブラウザに合わせる",
	"跟随浏览器时按浏览器的首选语言显示中文或日文。": "「ブラウザに合わせる」では、ブラウザの優先言語に応じて中国語または日本語で表示します。",
	跟随系统: "システムに合わせる",
	跨盘: "別ドライブ",
	"跨盘 {0}": "ドライブ横断 {0}",
	路径: "パス",
	路径不能包含控制字符: "パスに制御文字を含めることはできません",
	路径末段是目录词: "パスの末尾がフォルダを表す語です",
	路径过长: "パスが長すぎます",
	"路由树里没有这一页：{0}": "ルートツリーにこのページはありません：{0}",
	跳到正文: "本文へスキップ",
	跳过: "スキップ",
	"跳过 {0} 条无资源": "リソースのない {0} 件をスキップ",
	"跳过 {0} 条超出首次采集范围的历史内容": "初回収集範囲を超える過去のコンテンツ {0} 件をスキップ",
	"跳过：{0}。": "スキップ：{0}。",
	身份修复记录已发生后续改动: "身元修正の記録はその後変更されています",
	"身份关联来源冲突，需先复核": "身元の関連付けでソースが衝突しています。先に確認してください",
	身份分类: "身元区分",
	"身份判断落在 entity 上，由专门的合并流程写，不在复核这一步": "身元の判断はエンティティに対して行われ、専用の統合フローで書き込みます。この確認ステップでは扱いません",
	身份待核验: "身元の検証待ち",
	身份清单与实体名称不一致: "身元リストがエンティティ名と一致しません",
	身份计划已过期: "身元の計画は期限切れです",
	"身份锚点未命中，未取得可撤销实体": "身元アンカーが一致せず、取り消せるエンティティを取得できませんでした",
	"身份锚点未唯一命中，保留断言": "身元アンカーが一意に一致しないため、断言を保留します",
	身材: "体型",
	轮播: "カルーセル",
	载入更多: "さらに読み込む",
	"载入更多作品后继续浏览。": "さらに作品を読み込んで閲覧を続けられます。",
	"输入人物、账号或厂牌名称": "人物、アカウント、メーカー名を入力",
	输入名称: "名前を入力",
	"输入女优名，到 JavDB 找她的演员页": "女優名を入力して JavDB で女優ページを探す",
	"输入已结束。": "入力が終了しました。",
	"输入番号，例如 SSIS-950": "品番を入力（例：SSIS-950）",
	"输入番号，按回车搜索": "品番を入力して Enter で検索",
	"输入番号，添加想看的作品。": "品番を入力して、見たい作品を追加します。",
	"输入馆藏番号，如 ABW-232": "コレクションの品番を入力（例：ABW-232）",
	迁移校验未取得: "移行の検証結果を取得できませんでした",
	迁移校验通过: "移行の検証に成功しました",
	"迁移没能启动：{0}": "移行を開始できませんでした：{0}",
	迁移记录与当前程序不一致: "移行記録が現在のプログラムと一致しません",
	过滤: "絞り込み",
	"过滤{0}": "{0}を絞り込み",
	运营公司: "運営会社",
	"运行中 {0} 仅剩 {1} GiB（阈值 {2} GiB）；已停止任务。检查第三方缓存目录，本任务的产物目录未必是消耗方": "実行中の {0} の空きが {1} GiB しかありません（しきい値 {2} GiB）。タスクを停止しました。サードパーティのキャッシュフォルダを確認してください。このタスクの出力フォルダが消費元とは限りません",
	运行信息: "実行情報",
	运行环境: "実行環境",
	"运行通过浏览器管理的 Peach 服务": "ブラウザで管理される Peach サービスを実行",
	"近 {0} 轮": "直近 {0} 回",
	返回: "戻る",
	"返回{0}列表": "{0}一覧に戻る",
	返回上一个菜单: "前のメニューに戻る",
	返回备选图片: "候補画像に戻る",
	返回待判断: "判定待ちに戻す",
	返回首次设置: "初期設定に戻る",
	返回首页: "ホームに戻る",
	还原: "復元",
	还原所选项目: "選択した項目を復元",
	还有: "ほかに",
	"还有 {0} 位": "ほか {0} 人",
	"还有 {0} 条需要复核。": "あと {0} 件の確認が必要です。",
	还没发售: "未発売",
	还没拉过: "未取得",
	还没有: "まだありません：",
	"还没有{0}": "{0}はまだありません",
	"还没有与已建档女优关联的浏览记录。": "登録済みの女優に関連する閲覧記録はまだありません。",
	还没有任务记录: "タスク記録はまだありません",
	还没有保存创作者别名: "保存済みのクリエイター別名はまだありません",
	还没有保存的筛选: "保存済みの絞り込みはまだありません",
	"还没有共享密钥，保存配置后生成。": "共有キーはまだありません。構成を保存すると生成されます。",
	还没有关注任何来源: "まだどのソースもフォローしていません",
	还没有关注来源: "フォロー中のソースはまだありません",
	还没有内容标签: "コンテンツタグはまだありません",
	还没有可探索的入口: "探索できる入口はまだありません",
	"还没有可用于分析的口味网站访问记录。": "分析に使える好みサイトのアクセス記録はまだありません。",
	"还没有填 115 目标目录，「推送发现」登记的前缀（{0}）里也没有 115 网盘上的。在「推送发现」卡里加上 CloudDrive2 里 115 的挂载根，再点检查；也可以直接填目标目录": "115 の対象フォルダがまだ入力されておらず、「プッシュ検出」に登録されたプレフィックス（{0}）にも 115 のクラウドストレージのものがありません。「プッシュ検出」カードに CloudDrive2 内の 115 のマウントルートを追加してから、もう一度チェックしてください。対象フォルダを直接入力することもできます",
	"还没有填 115 目标目录，「推送发现」里也没有登记云端路径前缀。在「推送发现」卡里登记 CloudDrive2 里 115 的挂载根和它对应的媒体目录，再点检查；也可以直接填目标目录": "115 の対象フォルダがまだ入力されておらず、「プッシュ検出」にもクラウドパスのプレフィックスが登録されていません。「プッシュ検出」カードに CloudDrive2 内の 115 のマウントルートと、対応するメディアフォルダを登録してから、もう一度チェックしてください。対象フォルダを直接入力することもできます",
	"还没有填 CloudDrive2 地址，先在设置页「检查」探测本机端口后保存": "CloudDrive2 のアドレスがまだ入力されていません。先に設定ページの「チェック」でローカルのポートを検出してから保存してください",
	"还没有填 CloudDrive2 的 API 令牌": "CloudDrive2 の API トークンがまだ入力されていません",
	还没有存储来源: "ストレージソースはまだありません",
	还没有想要的作品: "ほしいものはまだありません",
	还没有抓到更新: "更新はまだ取得されていません",
	还没有播放列表: "プレイリストはまだありません",
	"还没有播放列表，填个名称就能新建一份。": "プレイリストはまだありません。名前を入力すると新規作成できます。",
	还没有收藏: "お気に入りはまだありません",
	还没有数据源: "データソースはまだありません",
	还没有更新: "更新はまだありません",
	还没有标签来源: "タグのソースはまだありません",
	还没有此类收藏: "この種類のお気に入りはまだありません",
	"还没有登录 PikPak": "PikPak にまだログインしていません",
	"还没有符合条件的 JAV 作品": "条件に合う JAV 作品はまだありません",
	还没有观看记录: "視聴記録はまだありません",
	还没有视频: "動画はまだありません",
	还没有订阅源: "購読フィードはまだありません",
	"还没有选 PikPak 根目录对应的媒体目录，「推送发现」里也没有 PikPak 云盘根那条前缀可以推。在下拉框里直接选，或在「推送发现」卡里登记 PikPak 的挂载根": "PikPak ルートに対応するメディアフォルダがまだ選ばれておらず、「プッシュ検出」にも推定に使える PikPak ルートのプレフィックスがありません。ドロップダウンで直接選ぶか、「プッシュ検出」カードに PikPak のマウントルートを登録してください",
	还没查过: "未検索",
	"这 {0} 个文件夹": "この {0} 個のフォルダ",
	这一块裁不出来: "この部分は切り抜けません",
	"这一批可以从「回滚上一批」整批退回。": "このバッチは「前のバッチをロールバック」からまとめて元に戻せます。",
	这一条的请求数用完了: "この項目のリクエスト数を使い切りました",
	"这一档用每块玻璃自带的反光，颜色跟着明暗主题走。": "このモードでは各ガラス面固有の反射を使い、色はライト／ダークテーマに合わせて変わります。",
	这一次取不到作品画面: "今回は作品の画像を取得できません",
	这一次没有完成: "今回は完了しませんでした",
	"这一步不可撤销。": "この操作は元に戻せません。",
	这一组已不存在: "このグループは存在しません",
	"这一行是人写的，不覆盖": "この行は手動で書かれたものなので上書きしません",
	这一轮已被新的任务顶替: "このラウンドは新しいタスクに置き換えられました",
	这一轮没有补上样张: "このラウンドではサンプル画像を補完できませんでした",
	这一页没有来源: "このページにはソースがありません",
	这一页解不出任何条目: "このページから項目を 1 件も解析できません",
	"这一项耗时较长，暂时没有新进展。任务结束后可以重试未完成的部分。": "この項目は時間がかかっており、しばらく進捗がありません。タスク終了後に未完了の部分を再試行できます。",
	"这不是一张能识别的 JPEG 或 PNG 图片": "識別できる JPEG または PNG 画像ではありません",
	这不是一张能识别的图片: "識別できる画像ではありません",
	这不是一条合法链接: "有効なリンクではありません",
	"这两个名字归一化后相同，不需要维护别名": "この 2 つの名前は正規化すると同じになるため、別名を管理する必要はありません",
	"这个 Mix 的 {0} 个视频会存成一份可以继续播放的列表。": "この Mix の動画 {0} 本を、続きから再生できるリストとして保存します。",
	"这个任务已经结束，不能取消": "このタスクはすでに終了しているため、キャンセルできません",
	这个任务没有失败的后处理可以重试: "このタスクには再試行できる失敗した後処理がありません",
	"这个任务还没有 PikPak 任务号，无法取消": "このタスクにはまだ PikPak のタスク番号がないため、キャンセルできません",
	"这个位置不归 Peach 管，只能自己打开": "この場所は Peach の管理外なので、自分で開いてください",
	这个位置已经不在了: "この場所はもう存在しません",
	这个关注来源不存在: "このフォローソースは存在しません",
	这个创作者别名不存在: "このクリエイター別名は存在しません",
	"这个地址下没有页面。": "このアドレスにはページがありません。",
	"这个地址不接受这种请求。": "このアドレスはこの種類のリクエストを受け付けません。",
	这个地址的图还没有取过: "このアドレスの画像はまだ取得していません",
	"这个库在计费来源上，每修一部都要把片子完整拉一遍。": "このライブラリは課金対象のソース上にあるため、1 本修復するごとに動画全体をダウンロードする必要があります。",
	"这个库里的片子都能直接播。": "このライブラリの動画はすべて直接再生できます。",
	"这个播放列表将被删除，视频文件保留。": "このプレイリストは削除されます。動画ファイルは残ります。",
	这个文件夹用于: "このフォルダの用途",
	这个服务实例没有接上转码与修复组件: "このサービスインスタンスはトランスコードと修復のコンポーネントに接続されていません",
	"这个片源已经有 ctts": "このソースにはすでに ctts があります",
	这个番号没有封面: "この品番にはカバーがありません",
	这个番号的封面不是一张能识别的图片: "この品番のカバーは識別できる画像ではありません",
	这个番号的封面还没有取过: "この品番のカバーはまだ取得していません",
	"这个番号的链上没有经 amane 桥问的站": "この品番のチェーンには amane ブリッジ経由で照会するサイトがありません",
	"这个目录不存在。": "このフォルダは存在しません。",
	"这个磁力已有任务，没有重复提交": "このマグネットにはすでにタスクがあるため、重複して送信しませんでした",
	"这个端口已被占用，请换一个端口": "このポートは使用中です。別のポートにしてください",
	"这个系统上先退出 Peach，再手动移除程序与数据目录": "このシステムでは、Peach を終了してから、プログラムとデータフォルダを手動で削除してください",
	这个系统上没有可用的文件夹对话框: "このシステムでは使用できるフォルダダイアログがありません",
	"这个视频将从播放列表移除，视频文件保留。": "この動画はプレイリストから削除されます。動画ファイルは残ります。",
	这个订阅地址已经在列表里了: "この購読アドレスはすでに一覧にあります",
	"这个资源被判为违规，不再提交。": "このリソースは規約違反と判定されたため、今後は送信しません。",
	"这个部署由配置文件管理服务；在本机编辑下方的设置文件。": "このデプロイでは構成ファイルがサービスを管理しています。ローカルで下の設定ファイルを編集してください。",
	"这些作品的文件已不在盘上，喜欢、稍后看、播放列表与观看历史都还留着。接到新文件后记录跟过去，旧的这一条删掉。": "これらの作品のファイルはもうドライブ上にありませんが、お気に入り、後で見る、プレイリスト、視聴履歴は残っています。新しいファイルに引き継ぐと記録が移り、古い項目は削除されます。",
	"这些来源这一轮没有取到更新。": "これらのソースは今回更新を取得できませんでした。",
	"这些订阅源这一轮没有取到新条目。": "これらの購読フィードは今回新しい項目を取得できませんでした。",
	"这些设置不跟数据库同步：{0}": "これらの設定はデータベースと同期されません：{0}",
	"这些词在浏览记录中出现，但 Peach 观看记录还没有对应证据": "これらの語は閲覧記録に出てきますが、Peach の視聴記録にはまだ対応する根拠がありません",
	"这位在 JavDB 上没有演员页编号": "この人には JavDB の出演者ページ ID がありません",
	"这几张卡分属数据库里不同的人：": "これらのカードはデータベース上の別々の人物に属しています：",
	"这几样不可撤销。": "これらは元に戻せません。",
	这台机器上打不开文件管理器: "このマシンではファイルマネージャーを開けません",
	"这台电脑上没有找到 Chrome 或 Edge，用不了浏览器登录。可以展开下方用账号密码登录": "このコンピューターに Chrome も Edge も見つからないため、ブラウザログインは使えません。下を展開してアカウントとパスワードでログインできます",
	"这台电脑是只读端，请在写入端扫描和导入资料": "このコンピューターは読み取り専用です。書き込み側でスキャンと資料のインポートを行ってください",
	这张图不在本机缓存里了: "この画像はもうローカルキャッシュにありません",
	这张图未取得或太大了: "この画像を取得できなかったか、大きすぎます",
	"这张图未取得：请求超时": "この画像を取得できませんでした：リクエストがタイムアウトしました",
	"这张图读不出来，换一张再框。": "この画像を読み込めません。別の画像で囲み直してください。",
	"这张图还没下载过，而这一次不允许联网": "この画像はまだダウンロードされておらず、今回はネットワーク接続が許可されていません",
	这张备选图片不属于当前创作者: "この候補画像は現在のクリエイターのものではありません",
	"这张封面刚换过，返回备选图片重新框一次": "このカバーは差し替えたばかりです。候補画像に戻って範囲を選び直してください",
	这张封面读不出来: "このカバーを読み取れません",
	这批作品尚未抽帧: "これらの作品はまだフレーム抽出されていません",
	这批作品没有封面: "これらの作品にはカバーがありません",
	"这批影片中有 {0} 部暂无预览，可补全资料与图片。": "これらの動画のうち {0} 本はプレビューがありません。情報と画像を補完できます。",
	"这批结果没有中文，可查看更多字幕": "これらの結果に中国語はありません。ほかの字幕も確認できます",
	这条作品没有可播放的视频: "この作品には再生できる動画がありません",
	这条关注内容已不存在: "このフォローコンテンツは存在しません",
	"这条关注内容已不存在，可能已被来源删除或已清理。": "このフォローコンテンツは存在しません。ソース側で削除されたか、クリーンアップ済みの可能性があります。",
	这条媒体没有可代理的主机白名单: "このメディアにはプロキシできるホストの許可リストがありません",
	"这条没有对应的关注条目，媒体地址无从解析。": "対応するフォロー項目がないため、メディアのアドレスを解決できません。",
	这条结果没有可加载的文本字幕: "この結果には読み込めるテキスト字幕がありません",
	"这次检查的结果已经清理，重新扫描可再核对。": "今回のチェック結果はクリーンアップ済みです。再スキャンすると再確認できます。",
	"这组关注作者已经不在等确认了，刷新后再看": "このフォロー作者のグループはもう確認待ちではありません。再読み込みして確認してください",
	这部作品不在这个人名下: "この作品はこの人物に属していません",
	"这部作品的{0}还没有落在本机": "この作品の{0}はまだローカルにありません",
	这里不能打开: "ここでは開けません",
	"进入 Peach": "Peach に入る",
	进入播放墙: "再生ウォールに入る",
	进入沉浸模式: "没入モードに入る",
	进入馆藏: "コレクションに入る",
	进行中: "進行中",
	远端下载进度: "リモートのダウンロード進捗",
	"远端不认这个链接：{0}": "リモートがこのリンクを受け付けません：{0}",
	"远端任务列表里找不到这个任务，目标目录里也没有文件": "リモートのタスク一覧にこのタスクがなく、対象フォルダにもファイルがありません",
	远端完成: "リモート完了",
	"远端已完成，但挂载目录里一直没有出现 {0}": "リモートでは完了しましたが、マウントフォルダに {0} が現れません",
	"远端已有同一个任务：{0}": "リモートに同じタスクがすでにあります：{0}",
	"远端已有同一任务，已接管": "リモートに同じタスクがあったため、引き継ぎました",
	"远端拒绝了这个任务：{0}": "リモートがこのタスクを拒否しました：{0}",
	"远端没有取消成功：{0}": "リモートでキャンセルできませんでした：{0}",
	远端没有给出原因: "リモートから理由が返されませんでした",
	远端进行中: "リモートで処理中",
	"连 FC2/日期番号一起试；默认只跑片商与素人形态": "FC2／日付形式の品番も試します。既定ではメーカーと素人の形式のみ実行します",
	连上轮确认没有封套的番号也重探一遍: "前回ジャケットなしと確認した品番も再探索します",
	"连不上 PikPak：{0}": "PikPak に接続できません：{0}",
	连字符转下划线: "ハイフンをアンダースコアに変換",
	"连接不到 Peach，请确认它仍在运行后重试": "Peach に接続できません。実行中であることを確認してから再試行してください",
	"连接中断，正在重新读取处理进度": "接続が切断されました。処理の進捗を再読み込みしています",
	连接方式: "接続方式",
	"连接未取得；{0}": "接続できませんでした。{0}",
	"连接未取得；此来源可能需要代理，请检查来源连接方式。": "接続できませんでした。このソースにはプロキシが必要な可能性があります。ソースの接続方法を確認してください。",
	"连接检查通过；解析状态未取得": "接続チェックに成功しました。解析状態は取得できませんでした",
	连接速度: "接続速度",
	"连接速度 {0}": "接続速度 {0}",
	迷你播放器: "ミニプレーヤー",
	追更时间戳必须带时区: "追跡のタイムスタンプにはタイムゾーンが必要です",
	"追更条目 {0} 不存在": "追跡項目 {0} は存在しません",
	"追更条目不存在：{0}": "追跡項目が存在しません：{0}",
	追更检查: "追跡チェック",
	追踪常访创作者: "よく見るクリエイターを追跡",
	退出全屏: "全画面を終了",
	退出搜索: "検索を終了",
	退出播放墙: "再生ウォールを終了",
	退出画中画: "ピクチャーインピクチャーを終了",
	退出码: "終了コード",
	"退出码 {0}，没有输出": "終了コード {0}、出力なし",
	"退出码 {0}，输出为空": "終了コード {0}、出力が空です",
	"退回后这一批不再出现在这里。": "元に戻すと、このバッチはここに表示されなくなります。",
	适应窗口: "ウィンドウに合わせる",
	适用内容类型: "対象コンテンツの種類",
	"选中的 {0} 项归为同一个产地。判定之后，刮削和自动推断不再改写产地。": "選択した {0} 件を同じ制作地域にまとめます。判定後は、スクレイピングや自動推定で制作地域が書き換えられなくなります。",
	"选了「同一局域网的设备」之后，其他设备在浏览器里输入这个地址就能打开 Peach。": "「同じ LAN 内のデバイス」を選ぶと、他のデバイスのブラウザでこのアドレスを入力して Peach を開けます。",
	选择: "選択",
	"选择 Chrome 历史记录，下载 ZIP 后直接导入。": "Chrome の履歴を選び、ZIP をダウンロードしてそのままインポートします。",
	"选择 {0}": "{0} を選択",
	"选择别名 {0}，归入 {1}": "別名 {0} を選択して {1} にまとめる",
	"选择包含 config.toml 和 database 文件夹的数据目录。": "config.toml と database フォルダを含むデータフォルダを選択してください。",
	选择图片: "画像を選択",
	选择媒体库: "メディアライブラリを選択",
	选择媒体库图标: "メディアライブラリのアイコンを選択",
	选择媒体目录: "メディアフォルダを選択",
	选择字幕文件: "字幕ファイルを選択",
	"选择已保存别名 {0}": "保存済みの別名 {0} を選択",
	选择文件: "ファイルを選択",
	选择文件夹: "フォルダを選択",
	选择要加载的字幕: "読み込む字幕を選択",
	选择要添加的页面: "追加するページを選択",
	选择读取策略: "読み込み方式を選択",
	选择项目与失败重试不能同时使用: "項目の選択と失敗分の再試行は同時に使えません",
	选用此资源: "このリソースを使う",
	通用: "一般",
	通知: "通知",
	通过: "承認",
	"通过后记录身份判断。": "承認すると身元の判定が記録されます。",
	通过所选: "選択項目を承認",
	速食: "超短編",
	遥测和自动错误诊断必须是布尔值: "テレメトリーと自動エラー診断はブール値である必要があります",
	邮箱或手机号: "メールアドレスまたは電話番号",
	部: "本",
	部作品: "本の作品",
	"部分媒体未取得：需要 F95 登录会话解析": "一部のメディアは未取得：解決には F95 のログインセッションが必要です",
	部分完成: "一部完了",
	"部分来源未取得，请稍后重试或检查来源连接。": "一部のソースを取得できませんでした。しばらくしてから再試行するか、ソース接続を確認してください。",
	"部分来源连接失败，未能完成全部来源比较。": "一部のソースへの接続に失敗したため、すべてのソースを比較できませんでした。",
	部分浏览记录未取得: "一部の閲覧記録は未取得",
	"部有编号作品、": "本の品番付き作品、",
	配套图片体积超出范围: "付属画像のサイズが範囲外です",
	配套图片无法读取: "付属画像を読み込めません",
	配置: "構成",
	"配置 Peach 代理": "Peach のプロキシを構成",
	配置与认证: "構成と認証",
	配置与访问: "構成とアクセス",
	"配置保存失败：{0}": "構成の保存に失敗しました：{0}",
	配置分区: "構成セクション",
	配置可读取: "構成を読み込めます",
	配置已保存: "構成を保存しました",
	"配置已变更，请刷新后再保存": "構成が変更されました。再読み込みしてから保存してください",
	"配置已变更，请重新确认卸载": "構成が変更されました。アンインストールをもう一度確認してください",
	配置文件中的目录对应关系重复或互相包含: "構成ファイル内のフォルダ対応が重複しているか、互いに含まれています",
	配置文件无法读取: "構成ファイルを読み込めません",
	配置读取失败: "構成の読み込みに失敗しました",
	配置连接方式: "接続方式を構成",
	配色: "配色",
	配音版: "吹き替え版",
	配额: "割り当て",
	配额耗尽: "割り当てを使い切りました",
	酒红: "ワインレッド",
	"采样位置未取得画面，反馈问题请导出诊断报告": "サンプリング位置で画像を取得できませんでした。問題を報告する場合は診断レポートをエクスポートしてください",
	采集作品资料: "作品資料の収集",
	采集外部资料与封面: "外部資料とカバーの収集",
	采集密度无效: "収集の密度が無効です",
	采集未取得: "収集できませんでした",
	采集来源与登录状态: "収集ソースとログイン状態",
	采集来源读取失败: "収集ソースの読み込みに失敗しました",
	"采集浏览记录后，这里会列出常访问的网站。": "閲覧記録を収集すると、よく訪れるサイトがここに表示されます。",
	"采集浏览记录后，这里会列出浏览过的创作者。": "閲覧記録を収集すると、閲覧したクリエイターがここに表示されます。",
	"采集浏览记录后，这里会列出浏览过的标签。": "閲覧記録を収集すると、閲覧したタグがここに表示されます。",
	"采集浏览记录后，这里会显示聚合后的口味证据。": "閲覧記録を収集すると、集計した好みの根拠がここに表示されます。",
	采集缩略图: "サムネイルの収集",
	采集缺失封面: "不足しているカバーを収集",
	采集缺失资料: "不足している資料の収集",
	"采集重定向必须使用 HTTPS": "収集時のリダイレクトには HTTPS が必要です",
	采集重定向次数超过上限: "収集時のリダイレクト回数が上限を超えました",
	重启安装: "再起動してインストール",
	重复: "重複",
	重复内容: "重複コンテンツ",
	重复文件: "重複ファイル",
	重复文件读取失败: "重複ファイルの読み込みに失敗しました",
	"重复身份 {0}": "重複した身元 {0}",
	"重定向终点落在 {0}，{1}": "リダイレクト先が {0} でした。{1}",
	"重建 amane 桥超过 {0} 秒未完成": "amane ブリッジの再構築が {0} 秒以内に完了しませんでした",
	重建后的头长度对不上: "再構築後のヘッダー長が一致しません",
	重建未完成: "再構築が完了していません",
	"重探已有封套；只有候选像素更多时才原子替换": "既存のジャケットを再探索します。候補の画素数が多い場合のみアトミックに置き換えます",
	重新判断: "再判定",
	重新加载图片: "画像を再読み込み",
	重新安装: "再インストール",
	重新打开教程: "チュートリアルを再表示",
	重新扫描: "再スキャン",
	重新提交: "再送信",
	重新查找: "再検索",
	重新查询: "再照会",
	重新检查: "再チェック",
	重新检查文件: "ファイルを再チェック",
	重新读取资料: "情報を再読み込み",
	重置: "リセット",
	重试: "再試行",
	重试后处理: "後処理を再試行",
	重试未完成项: "未完了の項目を再試行",
	重试样图: "サンプル画像を再試行",
	重试读取收藏: "お気に入りの読み込みを再試行",
	"重试选中的 {0} 条": "選択した {0} 件を再試行",
	重试选中的链接: "選択したリンクを再試行",
	重试项目不属于原任务的失败集合: "再試行項目が元のタスクの失敗セットに含まれていません",
	重试项目格式无效: "再試行項目の形式が無効です",
	"重验失效链接：已检查 {0} / {1} 条": "無効なリンクを再検証中：{0} / {1} 件チェック済み",
	"重验结束：准备处理 {0} 条，保留 {1} 条": "再検証完了：{0} 件を処理予定、{1} 件を保持",
	金黄: "ゴールド",
	钨丝: "タングステン",
	钨丝暖阁: "タングステンの灯",
	铁灰: "アイアングレー",
	链接: "リンク",
	链接已失效: "リンクの有効期限が切れています",
	链接总数: "リンク総数",
	链接无效: "リンクが無効です",
	"链接有效期为 6 小时。VR 播放器可使用网络播放地址；另一台设备需要能访问当前 Peach 地址。": "リンクの有効期限は 6 時間です。VR プレーヤーではネットワーク再生アドレスを使えます。別のデバイスからは現在の Peach アドレスにアクセスできる必要があります。",
	链接来源: "リンクのソース",
	链接检查: "リンクチェック",
	链接检查已停止: "リンクチェックを停止しました",
	链接清理已停止: "リンクのクリーンアップを停止しました",
	链接清理未完成: "リンクのクリーンアップが完了していません",
	链接直接指明: "リンクで直接指定",
	链接管理: "リンク管理",
	链接统计读取失败: "リンク統計の読み込みに失敗しました",
	链接里不能带账号密码: "リンクにアカウントやパスワードを含めることはできません",
	锁定正封比例: "表面カバーの比率を固定",
	错误日志无法写入: "エラーログを書き込めません",
	错误记录格式无效: "エラー記録の形式が無効です",
	错误记录缺少原因: "エラー記録に原因がありません",
	错误记录过于频繁: "エラー記録が頻繁すぎます",
	错误记录过长: "エラー記録が長すぎます",
	长: "長め",
	"长宽比 {0}，补背景填成正方形": "アスペクト比 {0}、背景を補って正方形にします",
	"长片-30分内": "長編-30分以内",
	问题: "問題",
	"问题清单：共 {0} 项": "問題一覧：全 {0} 件",
	"问题清单：共 {0} 项，展开查看前 {1} 项": "問題一覧：全 {0} 件、展開して先頭 {1} 件を表示",
	阳黄: "サンイエロー",
	阴影: "影",
	降序: "降順",
	陶棕: "テラコッタ",
	随机: "ランダム",
	隐藏: "非表示",
	"隐藏 {0}": "{0} を非表示",
	隐藏切片: "切り抜きを非表示",
	隐藏单人合集: "単体総集編を非表示",
	隐藏大合集: "大型総集編を非表示",
	"隐藏敏感画面，停止悬停预览。": "センシティブな画面を隠し、ホバープレビューを停止します。",
	隐藏标签: "タグを非表示",
	隐藏这张图: "この画像を非表示",
	隔离恢复内容不符: "隔離からの復元内容が一致しません",
	隔离恢复路径不符: "隔離からの復元パスが一致しません",
	隔离推广附件: "プロモーション用の添付ファイルを隔離",
	隧道令牌: "トンネルトークン",
	零个文件: "ファイルを残さない",
	雾灰: "ミストグレー",
	需人工确认: "手動確認が必要",
	需处理: "要対応",
	需检查: "要チェック",
	需要: "必要",
	"需要 ?t=口令": "?t=トークン が必要です",
	"需要 confirm": "confirm が必要です",
	需要人机验证: "ボット確認が必要です",
	需要关注: "要注意",
	"需要关注 · {0} 项": "要注意 · {0} 件",
	"需要刷新时再次读取或导入；数据源可在页面底部移除。": "更新が必要なときは再度読み込むかインポートしてください。データソースはページ下部で削除できます。",
	需要有效的作品番号: "有効な作品の品番が必要です",
	"需要登录时，任选一种方式提供 Cookie。": "ログインが必要な場合は、いずれかの方法で Cookie を指定してください。",
	"需要离线任务权限。": "オフラインタスクの権限が必要です。",
	需要选择连接方式: "接続方式の選択が必要です",
	需要配置凭据: "認証情報の構成が必要です",
	需选择来源: "ソースの選択が必要",
	霁蓝: "晴れ空ブルー",
	霞红: "朝焼けレッド",
	青: "シアン",
	青绿: "ティール",
	青色: "シアン",
	静音: "ミュート",
	靛紫: "インディゴパープル",
	靛蓝: "インディゴ",
	非职业出演者: "非プロの出演者",
	韩国: "韓国",
	"韩国 MIB": "韓国 MIB",
	"韩国 MIB 不适用 JAV 封面来源": "韓国 MIB には JAV のカバーソースは適用されません",
	韩文: "韓国語",
	韩语: "韓国語",
	音声: "音声",
	音量: "音量",
	音频: "音声",
	页面脚本出错: "ページのスクリプトでエラーが発生しました",
	页面视图: "ページビュー",
	"顶层缺 moov 或 mdat": "トップレベルに moov または mdat がありません",
	项: "件",
	"项 · 可应用": "件 · 適用可能",
	项保留现有归属: "件は現在の割り当てを維持",
	"项关联，再按当前范围应用。": "件の関連付けを解除してから、現在の範囲で適用します。",
	项媒体: "件のメディア",
	项更新: "件の更新",
	"项目 venv 与 uv.lock 一致": "プロジェクトの venv は uv.lock と一致しています",
	"项目 venv 与 uv.lock 不一致，要装 {0} 个包": "プロジェクトの venv が uv.lock と一致しません。{0} 個のパッケージをインストールする必要があります",
	预告片: "予告編",
	预览: "プレビュー",
	"预览 {0}": "プレビュー {0}",
	预览上传内容: "アップロード内容をプレビュー",
	预览传输中断: "プレビューの転送が中断されました",
	预览图: "プレビュー画像",
	预览图不存在: "プレビュー画像が存在しません",
	"预览图无法读取，请重试": "プレビュー画像を読み込めません。再試行してください",
	"预览图未生成，请检查媒体文件后重试": "プレビュー画像が生成されていません。メディアファイルを確認してから再試行してください",
	预览对象不存在: "プレビュー対象が存在しません",
	预览影响: "影響をプレビュー",
	预览未取得: "プレビューは未取得",
	预览来源不可用: "プレビューのソースを利用できません",
	预览清单未取得: "プレビューのマニフェストを取得できませんでした",
	预览清单过大: "プレビューのマニフェストが大きすぎます",
	预览结果: "プレビュー結果",
	预览连接未取得: "プレビューの接続を取得できませんでした",
	"预计剩余不到 1 分钟": "残り 1 分未満",
	"预计剩余约 {0} {1}{2}{3}": "残り約 {0} {1}{2}{3}",
	频率: "頻度",
	颗粒: "粒子感",
	题材: "ジャンル",
	颜色: "色",
	"馆外 {0} 部单人作品封面上没有能截的脸": "コレクション外の単体作品 {0} 本のカバーに切り抜ける顔がありません",
	"馆外单人作品封面 {0}（{1} 部互证）": "コレクション外の単体作品カバー {0}（{1} 本で相互確認）",
	"馆外单人作品封面只截到 {0} 张脸，凑不齐两部互证": "コレクション外の単体作品カバーから顔を {0} 枚しか切り抜けず、2 本での相互確認ができません",
	馆藏: "コレクション",
	"馆藏与口味上传失败，自动重试。": "コレクションと好みのアップロードに失敗しました。自動で再試行します。",
	馆藏与口味上传选项必须是布尔值: "コレクションと好みのアップロードオプションはブール値である必要があります",
	馆藏与口味上传预览: "コレクションと好みのアップロードプレビュー",
	"馆藏与口味明细上传默认关闭，可在「应用与维护」查看并选择。": "コレクションと好みの詳細のアップロードはデフォルトでオフです。「アプリとメンテナンス」で確認して選択できます。",
	"馆藏与口味明细压缩后超过 18 MiB，整份未发送": "コレクションと好みの明細が圧縮後に 18 MiB を超えたため、全体を送信しませんでした",
	"馆藏与口味明细超过 100 MiB，整份未发送": "コレクションと好みの明細が 100 MiB を超えたため、全体を送信しませんでした",
	"馆藏中有 {0} 项": "コレクションに {0} 件",
	馆藏已有这部作品: "この作品はすでにコレクションにあります",
	馆藏探索: "コレクション探索",
	"馆藏文件数量、有编号作品数量与无编号条目数量": "コレクションのファイル数、品番あり作品数、品番なし項目数",
	馆藏显示方式: "コレクションの表示方法",
	馆藏未找到这个番号: "コレクションにこの品番が見つかりません",
	馆藏番号: "コレクションの品番",
	馆藏积累: "コレクションの蓄積",
	馆藏统计读取失败: "コレクション統計の読み込みに失敗しました",
	馆藏观看: "コレクションの視聴",
	馆藏视频: "コレクションの動画",
	"馆藏记录可在回收站还原。": "コレクションの記録はゴミ箱から復元できます。",
	馆藏资料与预览处理: "コレクションの資料とプレビューの処理",
	"馆藏里暂时没有对得上浏览信号的标签。": "コレクションには閲覧シグナルと一致するタグがまだありません。",
	"首次复核队列已清空。": "初回確認キューは空になりました。",
	"首次扫描已排队，在后台整理媒体库，期间可以照常使用 Peach。": "初回スキャンをキューに追加しました。バックグラウンドでメディアライブラリを整理します。その間も Peach は通常どおり使えます。",
	首次采集范围: "初回収集範囲",
	首页: "ホーム",
	首页卡片版式: "ホームのカードレイアウト",
	香蕉: "バナナ",
	马眼: "尿道口",
	"马眼/尿道/龟头": "尿道口／尿道／亀頭",
	骑乘位: "騎乗位",
	高清: "HD",
	高清图片: "高画質画像",
	"高清图片 CDN": "高画質画像 CDN",
	"高清图片可能要经代理才能下载，先检查连接。": "高画質画像のダウンロードにはプロキシが必要な場合があります。先に接続を確認してください。",
	高清封面: "高画質カバー",
	高清封面已保存: "高画質カバーを保存しました",
	"高清帧 {0}": "高画質フレーム {0}",
	高清版: "HD 版",
	高清版目标读取失败: "HD 版の対象の読み込みに失敗しました",
	高潮: "O",
	"高潮 {0}": "O {0}",
	"高潮 {0} 次": "O {0} 回",
	高潮计数: "O カウンター",
	高级设置: "詳細設定",
	高频域名: "よく見るドメイン",
	麦黄: "ウィートイエロー",
	麻豆: "麻豆",
	黄: "黄",
	黄色: "イエロー",
	黑色: "ブラック",
	默认: "デフォルト",
	默认图片: "デフォルト画像",
	默认排序: "デフォルトの並べ替え",
	默认排序方向: "デフォルトの並べ替え方向",
	默认视图: "デフォルトの表示",
	默认顺序: "デフォルトの順序",
	齐全: "すべてそろっています",
	龟头: "亀頭",
	龟头责: "亀頭責め",
	"（一条都没配）": "（1 件も設定されていません）",
	"（不在任何已配置的媒体目录下）": "（設定済みのどのメディアフォルダにも含まれていません）",
	"（仅附件）": "（添付ファイルのみ）",
	"（写法 {0}）": "（表記 {0}）",
	"（必填）": "（必須）",
	"（推断）": "（推定）",
	"（无正文）": "（本文なし）",
	"（空）": "（空）",
	"（第 {0}/{1} 行）": "（{0}/{1} 行目）",
	"（粗估）": "（概算）",
	"（设置文件里一个都没有）": "（設定ファイルに 1 件もありません）",
	"（设置文件里没有 pikpak 来源）": "（設定ファイルに pikpak ソースがありません）",
	"（该目录属于 {0}）": "（このフォルダは {0} に属しています）",
	"（还可以再试 {0} 次）": "（あと {0} 回試せます）",
	"（还没填）": "（未入力）",
	"）提供这些内置站点的解析能力。 重新安装会使用 Peach 内置的": "）がこれらの組み込みサイトの解析機能を提供します。 再インストールでは Peach 組み込みの",
	"，{0} 条文件已恢复，未删除": "、{0} 件のファイルは復元済みのため削除していません",
	"，{0} 秒后重试": "、{0} 秒後に再試行",
	"，{0} 行未能处理": "、{0} 行を処理できませんでした",
	"，{0} 行未能退回": "、{0} 行を元に戻せませんでした",
	"，{0} 项未完成": "、{0} 件が未完了",
	"，{0} 项未能读取": "、{0} 件を読み込めませんでした",
	"，关联 {0} 项": "、{0} 件を関連付け",
	"，当前宽度不超过 {0}": "、現在の幅は {0} 以下",
	"，当前版本 {0}": "、現在のバージョン {0}",
	"，版块标签 {0}": "、板のタグ {0}",
	"，生成 {0} 部视频预览": "、動画プレビュー {0} 本を生成",
	"，番号前缀 {0}": "、品番プレフィックス {0}",
	"，站上归为{0}": "、サイト上では{0}に分類",
	"，队列里还有 {0} 条": "、キューに残り {0} 件",
	"：已完成 {0}/{1}": "：{0}/{1} 完了",
	"：框出正封那一块，封面原图不动。拖动方框移动，滚轮或角上那枚方块改大小。": "：表面カバーの部分を囲みます。元のカバー画像は変更されません。枠をドラッグして移動し、ホイールまたは角のハンドルでサイズを変更します。",
	"；{0} 个{1}；{2} 个资料来源": "；{1} {0} 件；資料ソース {2} 件",
	"；名称指向厂牌或系列，不是个人账号": "；名前はメーカーまたはシリーズを指しており、個人アカウントではありません",
	"；女优页未取得，资料留空": "；女優ページを取得できなかったため、資料は空のままです",
	"；来源": "；ソース",
	"；跳过": "；スキップ",
	"；跳过 {0}": "；{0} をスキップ",
	"；转码、媒体信息与缩略图需要 FFmpeg 工具包。": "；トランスコード、メディア情報、サムネイルには FFmpeg ツールキットが必要です。",
	"；还有 {0} 部待补，": "；あと {0} 本が補完待ち、"
}, f = "peach.locale";
function p() {
	try {
		let e = localStorage.getItem(f);
		return e === "zh" || e === "ja" ? e : "auto";
	} catch {
		return "auto";
	}
}
function m(e, t = navigator.languages ?? []) {
	return e === "auto" ? t.map((e) => e.toLowerCase()).find((e) => /^(?:zh|ja)\b/.test(e))?.startsWith("ja") ? "ja" : "zh" : e;
}
var h = () => m(p()), g = /[㐀-鿿]/, _ = /[㐀-鿿]/g, v = /\{(\d+)\}/g, y = /(\s*[·・|｜/／、，,：:；;（）()「」『』【】[\]—→←]\s*)/, b = 4e3, x = [
	"title",
	"aria-label",
	"aria-description",
	"aria-roledescription",
	"aria-valuetext",
	"placeholder",
	"alt",
	"label"
], S = (e) => e.replace(/\s+/g, " ").trim(), C = (e) => e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
function w(e, t) {
	let n = e.split(v).filter((e, t) => t % 2 == 0), r = (n.join("").match(_) ?? []).length;
	if (!r) return null;
	let i = r > 1 ? "(.+?)" : "([^\\u3400-\\u9fff]+?)", a = [], o = e.split(v).map((e, t) => t % 2 ? (a.push(Number(e)), i) : C(e).replace(/ /g, "\\s*")).join("");
	return {
		anchor: n.reduce((e, t) => t.trim().length > e.length ? t.trim() : e, ""),
		regex: RegExp(`^${o}$`),
		order: a,
		value: t,
		weight: r
	};
}
function T(e) {
	let t = /* @__PURE__ */ new Map(), n = [];
	for (let [r, i] of Object.entries(e)) {
		if (!i) continue;
		let e = S(r);
		if (/\{\d+\}/.test(e)) {
			let t = w(e, i);
			t && n.push(t);
		} else t.set(e, i);
	}
	n.sort((e, t) => t.weight - e.weight || t.anchor.length - e.anchor.length);
	let r = /* @__PURE__ */ new Map(), i = (e, t) => {
		for (let r of n) {
			if (r.anchor && !e.includes(r.anchor)) continue;
			let n = r.regex.exec(e);
			if (!n) continue;
			let i = [];
			return r.order.forEach((e, t) => {
				i[e] = n[t + 1] ?? "";
			}), r.value.replace(v, (e, n) => o(i[Number(n)] ?? "", t + 1));
		}
		return null;
	}, a = (e, n, r = y) => {
		let o = e.split(r);
		if (o.length < 2) return r === y ? a(e, n, /(\s+)/) : null;
		let s = !1, c = o.map((e, o) => {
			if (o % 2 || !g.test(e)) return e;
			let c = e.trim(), l = t.get(c) ?? (n < 2 ? i(c, n) : null) ?? (r === y ? a(c, n, /(\s+)/) : null);
			return l == null ? e : (s = !0, e.replace(c, l));
		});
		return s ? c.join("") : null;
	};
	function o(e, n) {
		let r = S(e);
		return g.test(r) ? t.get(r) ?? (n > 2 ? e : i(r, n) ?? a(r, n) ?? e) : e;
	}
	return (e) => {
		if (!g.test(e)) return e;
		let t = r.get(e);
		if (t === void 0) {
			let n = o(e, 0);
			t = n === e ? e : `${/^\s*/.exec(e)[0]}${n}${/\s*$/.exec(e)[0]}`, r.size >= b && r.clear(), r.set(e, t);
		}
		return t;
	};
}
var E = "script,style,textarea,code,pre,[contenteditable]:not([contenteditable=\"false\"]),[translate=\"no\"]", D = 8;
function O(e, t) {
	let n = /* @__PURE__ */ new WeakMap(), r = /* @__PURE__ */ new WeakMap(), i = /* @__PURE__ */ new WeakMap(), a = (e) => !e || e.closest(E) !== null, o = (e, t) => {
		r.set(e, t), e.nodeValue !== t && (e.nodeValue = t);
	}, s = (e) => {
		let t = e.nodeValue ?? "";
		return r.has(e) && r.get(e) === t ? n.get(e) ?? t : (n.set(e, t), t);
	}, c = (e) => {
		let t = e.childNodes;
		if (t.length < 2 || t.length > D) return null;
		for (let e of t) if (e.nodeType !== Node.TEXT_NODE) return null;
		return [...t];
	}, l = (e) => {
		let n = e.parentElement;
		if (a(n)) return;
		let r = n && c(n);
		if (r) {
			let e = r.map(s), n = e.join(""), i = g.test(n) ? t(n) : n;
			if (i !== n) {
				r.forEach((e, t) => o(e, t ? "" : i));
				return;
			}
			r.forEach((n, r) => o(n, t(e[r] ?? "")));
			return;
		}
		let i = s(e);
		o(e, g.test(i) ? t(i) : i);
	}, u = (e, n) => {
		let r = e.getAttribute(n);
		if (r == null || !g.test(r) || a(e)) return;
		let o = i.get(e);
		if (o?.get(n) === r) return;
		let s = t(r);
		o ? o.set(n, s) : i.set(e, /* @__PURE__ */ new Map([[n, s]])), s !== r && e.setAttribute(n, s);
	}, d = (e) => {
		if (e.nodeType === Node.TEXT_NODE) {
			l(e);
			return;
		}
		if (e.nodeType !== Node.ELEMENT_NODE) return;
		let t = e;
		if (a(t)) return;
		let n = document.createTreeWalker(t, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
		for (let e = t; e; e = n.nextNode()) if (e.nodeType === Node.TEXT_NODE) (g.test(e.nodeValue ?? "") || r.has(e)) && l(e);
		else for (let t of x) u(e, t);
	};
	d(e);
	let f = new MutationObserver((e) => {
		for (let t of e) if (t.type === "characterData") l(t.target);
		else if (t.type === "attributes") u(t.target, t.attributeName ?? "");
		else if (t.addedNodes.forEach(d), t.removedNodes.length && t.target.nodeType === Node.ELEMENT_NODE) {
			let e = t.target.firstChild;
			e?.nodeType === Node.TEXT_NODE && l(e);
		}
	});
	return f.observe(e, {
		subtree: !0,
		childList: !0,
		characterData: !0,
		attributes: !0,
		attributeFilter: [...x]
	}), () => f.disconnect();
}
//#endregion
//#region src/i18n/index.ts
var k = (e) => e, ee = [
	[
		"PingFang SC",
		["Hiragino Sans W3", "HiraginoSans-W3"],
		["Hiragino Sans W6", "HiraginoSans-W6"]
	],
	[
		"Microsoft YaHei UI",
		["Yu Gothic UI", "YuGothicUI-Regular"],
		["Yu Gothic UI Bold", "YuGothicUI-Bold"]
	],
	[
		"Microsoft YaHei",
		[
			"Yu Gothic Medium",
			"YuGothic-Medium",
			"Meiryo"
		],
		[
			"Yu Gothic Bold",
			"YuGothic-Bold",
			"Meiryo Bold"
		]
	]
], A = (e, t, n) => `@font-face{font-family:"${e}";font-weight:${n};src:${t.map((e) => `local("${e}")`).join(",")}}`;
function j() {
	let e = document.createElement("style");
	e.dataset.localeFonts = "ja", e.textContent = ee.map(([e, t, n]) => A(e, t, "1 500") + A(e, n, "600 1000")).join(""), document.head.append(e);
}
var te = null;
function ne() {
	return te || (te = h(), document.documentElement.lang = te === "ja" ? "ja" : "zh-CN", te === "ja" && (j(), k = T(d), O(document.documentElement, k)), te);
}
//#endregion
//#region node_modules/scheduler/cjs/scheduler.production.js
var re = /* @__PURE__ */ o(((e) => {
	function t(e, t) {
		var n = e.length;
		e.push(t);
		a: for (; 0 < n;) {
			var r = n - 1 >>> 1, a = e[r];
			if (0 < i(a, t)) e[r] = t, e[n] = a, n = r;
			else break a;
		}
	}
	function n(e) {
		return e.length === 0 ? null : e[0];
	}
	function r(e) {
		if (e.length === 0) return null;
		var t = e[0], n = e.pop();
		if (n !== t) {
			e[0] = n;
			a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
				var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
				if (0 > i(c, n)) l < a && 0 > i(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
				else if (l < a && 0 > i(u, n)) e[r] = u, e[l] = n, r = l;
				else break a;
			}
		}
		return t;
	}
	function i(e, t) {
		var n = e.sortIndex - t.sortIndex;
		return n === 0 ? e.id - t.id : n;
	}
	if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
		var a = performance;
		e.unstable_now = function() {
			return a.now();
		};
	} else {
		var o = Date, s = o.now();
		e.unstable_now = function() {
			return o.now() - s;
		};
	}
	var c = [], l = [], u = 1, d = null, f = 3, p = !1, m = !1, h = !1, g = !1, _ = typeof setTimeout == "function" ? setTimeout : null, v = typeof clearTimeout == "function" ? clearTimeout : null, y = typeof setImmediate < "u" ? setImmediate : null;
	function b(e) {
		for (var i = n(l); i !== null;) {
			if (i.callback === null) r(l);
			else if (i.startTime <= e) r(l), i.sortIndex = i.expirationTime, t(c, i);
			else break;
			i = n(l);
		}
	}
	function x(e) {
		if (h = !1, b(e), !m) {
			if (n(c) !== null) m = !0, S || (S = !0, O());
			else {
				var t = n(l);
				t !== null && A(x, t.startTime - e);
			}
		}
	}
	var S = !1, C = -1, w = 5, T = -1;
	function E() {
		return g ? !0 : !(e.unstable_now() - T < w);
	}
	function D() {
		if (g = !1, S) {
			var t = e.unstable_now();
			T = t;
			var i = !0;
			try {
				a: {
					m = !1, h && (h = !1, v(C), C = -1), p = !0;
					var a = f;
					try {
						b: {
							for (b(t), d = n(c); d !== null && !(d.expirationTime > t && E());) {
								var o = d.callback;
								if (typeof o == "function") {
									d.callback = null, f = d.priorityLevel;
									var s = o(d.expirationTime <= t);
									if (t = e.unstable_now(), typeof s == "function") {
										d.callback = s, b(t), i = !0;
										break b;
									}
									d === n(c) && r(c), b(t);
								} else r(c);
								d = n(c);
							}
							if (d !== null) i = !0;
							else {
								var u = n(l);
								u !== null && A(x, u.startTime - t), i = !1;
							}
						}
						break a;
					} finally {
						d = null, f = a, p = !1;
					}
					i = void 0;
				}
			} finally {
				i ? O() : S = !1;
			}
		}
	}
	var O;
	if (typeof y == "function") O = function() {
		y(D);
	};
	else if (typeof MessageChannel < "u") {
		var k = new MessageChannel(), ee = k.port2;
		k.port1.onmessage = D, O = function() {
			ee.postMessage(null);
		};
	} else O = function() {
		_(D, 0);
	};
	function A(t, n) {
		C = _(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : w = 0 < e ? Math.floor(1e3 / e) : 5;
	}, e.unstable_getCurrentPriorityLevel = function() {
		return f;
	}, e.unstable_next = function(e) {
		switch (f) {
			case 1:
			case 2:
			case 3:
				var t = 3;
				break;
			default: t = f;
		}
		var n = f;
		f = t;
		try {
			return e();
		} finally {
			f = n;
		}
	}, e.unstable_requestPaint = function() {
		g = !0;
	}, e.unstable_runWithPriority = function(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: e = 3;
		}
		var n = f;
		f = e;
		try {
			return t();
		} finally {
			f = n;
		}
	}, e.unstable_scheduleCallback = function(r, i, a) {
		var o = e.unstable_now();
		switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, r) {
			case 1:
				var s = -1;
				break;
			case 2:
				s = 250;
				break;
			case 5:
				s = 1073741823;
				break;
			case 4:
				s = 1e4;
				break;
			default: s = 5e3;
		}
		return s = a + s, r = {
			id: u++,
			callback: i,
			priorityLevel: r,
			startTime: a,
			expirationTime: s,
			sortIndex: -1
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(C), C = -1) : h = !0, A(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, S || (S = !0, O()))), r;
	}, e.unstable_shouldYield = E, e.unstable_wrapCallback = function(e) {
		var t = f;
		return function() {
			var n = f;
			f = t;
			try {
				return e.apply(this, arguments);
			} finally {
				f = n;
			}
		};
	};
})), M = /* @__PURE__ */ o(((e, t) => {
	t.exports = re();
})), ie = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), f = Symbol.for("react.activity"), p = Symbol.for("react.view_transition"), m = Symbol.iterator;
	function h(e) {
		return typeof e != "object" || !e ? null : (e = m && e[m] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var g = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, _ = Object.assign, v = {};
	function y(e, t, n) {
		this.props = e, this.context = t, this.refs = v, this.updater = n || g;
	}
	y.prototype.isReactComponent = {}, y.prototype.setState = function(e, t) {
		if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, e, t, "setState");
	}, y.prototype.forceUpdate = function(e) {
		this.updater.enqueueForceUpdate(this, e, "forceUpdate");
	};
	function b() {}
	b.prototype = y.prototype;
	function x(e, t, n) {
		this.props = e, this.context = t, this.refs = v, this.updater = n || g;
	}
	var S = x.prototype = new b();
	S.constructor = x, _(S, y.prototype), S.isPureReactComponent = !0;
	var C = Array.isArray;
	function w() {}
	var T = {
		H: null,
		A: null,
		T: null,
		S: null
	}, E = Object.prototype.hasOwnProperty;
	function D(e, n, r) {
		var i = r.ref;
		return {
			$$typeof: t,
			type: e,
			key: n,
			ref: i === void 0 ? null : i,
			props: r
		};
	}
	function O(e, t) {
		return D(e.type, t, e.props);
	}
	function k(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function ee(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var A = /\/+/g;
	function j(e, t) {
		return typeof e == "object" && e && e.key != null ? ee("" + e.key) : t.toString(36);
	}
	function te(e) {
		switch (e.status) {
			case "fulfilled": return e.value;
			case "rejected": throw e.reason;
			default: switch (typeof e.status == "string" ? e.then(w, w) : (e.status = "pending", e.then(function(t) {
				e.status === "pending" && (e.status = "fulfilled", e.value = t);
			}, function(t) {
				e.status === "pending" && (e.status = "rejected", e.reason = t);
			})), e.status) {
				case "fulfilled": return e.value;
				case "rejected": throw e.reason;
			}
		}
		throw e;
	}
	function ne(e, r, i, a, o) {
		var s = typeof e;
		(s === "undefined" || s === "boolean") && (e = null);
		var c = !1;
		if (e === null) c = !0;
		else switch (s) {
			case "bigint":
			case "string":
			case "number":
				c = !0;
				break;
			case "object": switch (e.$$typeof) {
				case t:
				case n:
					c = !0;
					break;
				case d: return c = e._init, ne(c(e._payload), r, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + j(e, 0) : a, C(o) ? (i = "", c != null && (i = c.replace(A, "$&/") + "/"), ne(o, r, i, "", function(e) {
			return e;
		})) : o != null && (k(o) && (o = O(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(A, "$&/") + "/") + c)), r.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (C(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + j(a, u), c += ne(a, r, i, s, o);
		else if (u = h(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + j(a, u++), c += ne(a, r, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return ne(te(e), r, i, a, o);
			throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function re(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return ne(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function M(e) {
		if (e._status === -1) {
			var t = e._result, n = t();
			n.then(function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 1, e._result = t, n.status === void 0 && (n.status = "fulfilled", n.value = t));
			}, function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 2, e._result = t, n.status === void 0 && (n.status = "rejected", n.reason = t));
			}), e._status === -1 && (e._status = 0, e._result = n);
		}
		if (e._status === 1) return e._result.default;
		throw e._result;
	}
	var ie = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	};
	function ae(e) {
		var t = T.T, n = {};
		n.types = t === null ? null : t.types, T.T = n;
		try {
			var r = e(), i = T.S;
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(w, ie);
		} catch (e) {
			ie(e);
		} finally {
			t !== null && n.types !== null && (t.types = n.types), T.T = t;
		}
	}
	function oe(e) {
		var t = T.T;
		if (t !== null) {
			var n = t.types;
			n === null ? t.types = [e] : n.indexOf(e) === -1 && n.push(e);
		} else ae(oe.bind(null, e));
	}
	var se = {
		map: re,
		forEach: function(e, t, n) {
			re(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return re(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return re(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!k(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	};
	e.Activity = f, e.Children = se, e.Component = y, e.Fragment = r, e.Profiler = a, e.PureComponent = x, e.StrictMode = i, e.Suspense = l, e.ViewTransition = p, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = T, e.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(e) {
			return T.H.useMemoCache(e);
		}
	}, e.addTransitionType = oe, e.cache = function(e) {
		return function() {
			return e.apply(null, arguments);
		};
	}, e.cacheSignal = function() {
		return null;
	}, e.cloneElement = function(e, t, n) {
		if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
		var r = _({}, e.props), i = e.key;
		if (t != null) for (a in t.key !== void 0 && (i = "" + t.key), t) !E.call(t, a) || a === "key" || a === "__self" || a === "__source" || a === "ref" && t.ref === void 0 || (r[a] = t[a]);
		var a = arguments.length - 2;
		if (a === 1) r.children = n;
		else if (1 < a) {
			for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
			r.children = o;
		}
		return D(e.type, i, r);
	}, e.createContext = function(e) {
		return e = {
			$$typeof: s,
			_currentValue: e,
			_currentValue2: e,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		}, e.Provider = e, e.Consumer = {
			$$typeof: o,
			_context: e
		}, e;
	}, e.createElement = function(e, t, n) {
		var r, i = {}, a = null;
		if (t != null) for (r in t.key !== void 0 && (a = "" + t.key), t) E.call(t, r) && r !== "key" && r !== "__self" && r !== "__source" && (i[r] = t[r]);
		var o = arguments.length - 2;
		if (o === 1) i.children = n;
		else if (1 < o) {
			for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
			i.children = s;
		}
		if (e && e.defaultProps) for (r in o = e.defaultProps, o) i[r] === void 0 && (i[r] = o[r]);
		return D(e, a, i);
	}, e.createRef = function() {
		return { current: null };
	}, e.forwardRef = function(e) {
		return {
			$$typeof: c,
			render: e
		};
	}, e.isValidElement = k, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: M
		};
	}, e.memo = function(e, t) {
		return {
			$$typeof: u,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, e.startTransition = ae, e.unstable_useCacheRefresh = function() {
		return T.H.useCacheRefresh();
	}, e.use = function(e) {
		return T.H.use(e);
	}, e.useActionState = function(e, t, n) {
		return T.H.useActionState(e, t, n);
	}, e.useCallback = function(e, t) {
		return T.H.useCallback(e, t);
	}, e.useContext = function(e) {
		return T.H.useContext(e);
	}, e.useDebugValue = function() {}, e.useDeferredValue = function(e, t) {
		return T.H.useDeferredValue(e, t);
	}, e.useEffect = function(e, t) {
		return T.H.useEffect(e, t);
	}, e.useEffectEvent = function(e) {
		return T.H.useEffectEvent(e);
	}, e.useId = function() {
		return T.H.useId();
	}, e.useImperativeHandle = function(e, t, n) {
		return T.H.useImperativeHandle(e, t, n);
	}, e.useInsertionEffect = function(e, t) {
		return T.H.useInsertionEffect(e, t);
	}, e.useLayoutEffect = function(e, t) {
		return T.H.useLayoutEffect(e, t);
	}, e.useMemo = function(e, t) {
		return T.H.useMemo(e, t);
	}, e.useOptimistic = function(e, t) {
		return T.H.useOptimistic(e, t);
	}, e.useReducer = function(e, t, n) {
		return T.H.useReducer(e, t, n);
	}, e.useRef = function(e) {
		return T.H.useRef(e);
	}, e.useState = function(e) {
		return T.H.useState(e);
	}, e.useSyncExternalStore = function(e, t, n) {
		return T.H.useSyncExternalStore(e, t, n);
	}, e.useTransition = function() {
		return T.H.useTransition();
	}, e.version = "19.3.1";
})), ae = /* @__PURE__ */ o(((e, t) => {
	t.exports = ie();
})), oe = /* @__PURE__ */ o(((e) => {
	var t = ae();
	function n(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function r() {}
	var i = {
		d: {
			f: r,
			r: function() {
				throw Error(n(522));
			},
			D: r,
			C: r,
			L: r,
			m: r,
			X: r,
			S: r,
			M: r
		},
		p: 0,
		findDOMNode: null
	}, a = Symbol.for("react.portal"), o = Symbol.for("react.recoverable"), s = Symbol.for("react.optimistic_key");
	function c(e, t, n) {
		var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: a,
			key: r == null ? null : r === s ? s : "" + r,
			children: e,
			containerInfo: t,
			implementation: n
		};
	}
	var l = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function u(e, t) {
		if (e === "font") return "";
		if (typeof t == "string") return t === "use-credentials" ? t : "";
	}
	e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, e.browser = function(e) {
		return {
			$$typeof: o,
			_reason: e
		};
	}, e.createPortal = function(e, t) {
		var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
		if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error(n(299));
		return c(e, t, null, r);
	}, e.flushSync = function(e) {
		var t = l.T, n = i.p;
		try {
			if (l.T = null, i.p = 2, e) return e();
		} finally {
			l.T = t, i.p = n, i.d.f();
		}
	}, e.preconnect = function(e, t) {
		typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, i.d.C(e, t));
	}, e.prefetchDNS = function(e) {
		typeof e == "string" && i.d.D(e);
	}, e.preinit = function(e, t) {
		if (typeof e == "string" && t && typeof t.as == "string") {
			var n = t.as, r = u(n, t.crossOrigin), a = typeof t.integrity == "string" ? t.integrity : void 0, o = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
			n === "style" ? i.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o
			}) : n === "script" && i.d.X(e, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0
			});
		}
	}, e.preinitModule = function(e, t) {
		if (typeof e == "string") {
			if (typeof t == "object" && t) {
				if (t.as == null || t.as === "script") {
					var n = u(t.as, t.crossOrigin);
					i.d.M(e, {
						crossOrigin: n,
						integrity: typeof t.integrity == "string" ? t.integrity : void 0,
						nonce: typeof t.nonce == "string" ? t.nonce : void 0,
						fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0
					});
				}
			} else t ?? i.d.M(e);
		}
	}, e.preload = function(e, t) {
		if (typeof e == "string" && typeof t == "object" && t && typeof t.as == "string") {
			var n = t.as, r = u(n, t.crossOrigin);
			i.d.L(e, n, {
				crossOrigin: r,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0,
				type: typeof t.type == "string" ? t.type : void 0,
				fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
				referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
				imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
				imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
				media: typeof t.media == "string" ? t.media : void 0
			});
		}
	}, e.preloadModule = function(e, t) {
		if (typeof e == "string") {
			if (t) {
				var n = u(t.as, t.crossOrigin);
				i.d.m(e, {
					as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
					crossOrigin: n,
					integrity: typeof t.integrity == "string" ? t.integrity : void 0,
					nonce: typeof t.nonce == "string" ? t.nonce : void 0,
					fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0
				});
			} else i.d.m(e);
		}
	}, e.requestFormReset = function(e) {
		i.d.r(e);
	}, e.unstable_batchedUpdates = function(e, t) {
		return e(t);
	}, e.useFormState = function(e, t, n) {
		return l.H.useFormState(e, t, n);
	}, e.useFormStatus = function() {
		return l.H.useHostTransitionStatus();
	}, e.version = "19.3.1";
})), se = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == "function") try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = oe();
})), ce = /* @__PURE__ */ o(((e) => {
	var t = M(), n = ae(), r = se();
	function i(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function a(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function o(e) {
		for (var t = e, n = t; n && !n.alternate;) t = n, t.flags & 4098 && (e = t.return), n = t.return;
		for (; t.return;) t = t.return;
		return t.tag === 3 ? e : null;
	}
	function s(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function c(e) {
		if (e.tag === 31) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function l(e) {
		if (o(e) !== e) throw Error(i(188));
	}
	function u(e) {
		var t = e.alternate;
		if (!t) {
			if (t = o(e), t === null) throw Error(i(188));
			return t === e ? e : null;
		}
		for (var n = e, r = t;;) {
			var a = n.return;
			if (a === null) break;
			var s = a.alternate;
			if (s === null) {
				if (r = a.return, r !== null) {
					n = r;
					continue;
				}
				break;
			}
			if (a.child === s.child) {
				for (s = a.child; s;) {
					if (s === n) return l(a), e;
					if (s === r) return l(a), t;
					s = s.sibling;
				}
				throw Error(i(188));
			}
			if (n.return !== r.return) n = a, r = s;
			else {
				for (var c = !1, u = a.child; u;) {
					if (u === n) {
						c = !0, n = a, r = s;
						break;
					}
					if (u === r) {
						c = !0, r = a, n = s;
						break;
					}
					u = u.sibling;
				}
				if (!c) {
					for (u = s.child; u;) {
						if (u === n) {
							c = !0, n = s, r = a;
							break;
						}
						if (u === r) {
							c = !0, r = s, n = a;
							break;
						}
						u = u.sibling;
					}
					if (!c) throw Error(i(189));
				}
			}
			if (n.alternate !== r) throw Error(i(190));
		}
		if (n.tag !== 3) throw Error(i(188));
		return n.stateNode.current === n ? e : t;
	}
	function d(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = d(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	function f(e, t, n, r, i, a) {
		for (; e !== null;) {
			if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && n(e, r, i, a) || (e.tag !== 22 || e.memoizedState === null) && (t || e.tag !== 5 && e.tag !== 27) && f(e.child, t, n, r, i, a)) return !0;
			e = e.sibling;
		}
		return !1;
	}
	function p(e) {
		for (e = e.return; e !== null;) {
			if (e.tag === 3 || e.tag === 5 || e.tag === 27) return e;
			e = e.return;
		}
		return null;
	}
	function m(e) {
		var t = !1;
		for (e = e.return; e !== null && (e.tag === 4 && (t = !0), e.tag !== 3 && e.tag !== 5 && e.tag !== 27);) e = e.return;
		return t;
	}
	function h(e) {
		var t = [null, null], n = p(e);
		return n === null || g(t, e, n.child, { foundSelf: !1 }), t;
	}
	function g(e, t, n, r) {
		for (; n !== null;) {
			if (n === t) r.foundSelf = !0;
			else if (n.tag === 5 || n.tag === 27 || n.tag === 6) {
				if (r.foundSelf) return e[1] = n, !0;
				e[0] = n;
			} else if ((n.tag !== 22 || n.memoizedState === null) && g(e, t, n.child, r)) return !0;
			n = n.sibling;
		}
		return !1;
	}
	function _(e) {
		switch (e.tag) {
			case 5:
			case 27:
			case 6: return e.stateNode;
			case 3: return e.stateNode.containerInfo;
			default: throw Error(i(559));
		}
	}
	var v = null, y = null;
	function b(e, t, n) {
		return e === n || e === t && (v = e, !0);
	}
	function x(e, t, n) {
		return e === n ? (y = e, !1) : e === t && (y !== null && (v = e), !0);
	}
	function S(e) {
		if (e === null) return null;
		do
			e = e === null ? null : e.return;
		while (e && e.tag !== 5 && e.tag !== 27 && e.tag !== 3);
		return e || null;
	}
	function C(e, t, n) {
		for (var r = 0, i = e; i; i = n(i)) r++;
		i = 0;
		for (var a = t; a; a = n(a)) i++;
		for (; 0 < r - i;) e = n(e), r--;
		for (; 0 < i - r;) t = n(t), i--;
		for (; r--;) {
			if (e === t || t !== null && e === t.alternate) return e;
			e = n(e), t = n(t);
		}
		return null;
	}
	var w = Object.assign, T = Symbol.for("react.element"), E = Symbol.for("react.transitional.element"), D = Symbol.for("react.portal"), O = Symbol.for("react.fragment"), k = Symbol.for("react.strict_mode"), ee = Symbol.for("react.profiler"), A = Symbol.for("react.consumer"), j = Symbol.for("react.context"), te = Symbol.for("react.forward_ref"), ne = Symbol.for("react.suspense"), re = Symbol.for("react.suspense_list"), ie = Symbol.for("react.memo"), oe = Symbol.for("react.lazy"), ce = Symbol.for("react.activity"), le = Symbol.for("react.legacy_hidden"), N = Symbol.for("react.memo_cache_sentinel"), ue = Symbol.for("react.view_transition"), de = Symbol.for("react.recoverable"), fe = Symbol.iterator;
	function pe(e) {
		return typeof e != "object" || !e ? null : (e = fe && e[fe] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var me = Symbol.for("react.client.reference");
	function he(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === me ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case O: return "Fragment";
			case ee: return "Profiler";
			case k: return "StrictMode";
			case ne: return "Suspense";
			case re: return "SuspenseList";
			case ce: return "Activity";
			case ue: return "ViewTransition";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case D: return "Portal";
			case j: return e.displayName || "Context";
			case A: return (e._context.displayName || "Context") + ".Consumer";
			case te:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case ie: return t = e.displayName || null, t === null ? he(e.type) || "Memo" : t;
			case oe:
				t = e._payload, e = e._init;
				try {
					return he(e(t));
				} catch {}
		}
		return null;
	}
	var ge = Array.isArray, P = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, F = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, _e = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, ve = [], ye = -1;
	function be(e) {
		return { current: e };
	}
	function xe(e) {
		0 > ye || (e.current = ve[ye], ve[ye] = null, ye--);
	}
	function Se(e, t) {
		ye++, ve[ye] = e.current, e.current = t;
	}
	var Ce = be(null), we = be(null), Te = be(null), Ee = be(null);
	function De(e, t) {
		switch (Se(Te, t), Se(we, e), Se(Ce, null), t.nodeType) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? up(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = up(t), e = dp(t, e);
			else switch (e) {
				case "svg":
					e = 1;
					break;
				case "math":
					e = 2;
					break;
				default: e = 0;
			}
		}
		xe(Ce), Se(Ce, e);
	}
	function Oe() {
		xe(Ce), xe(we), xe(Te);
	}
	function ke(e) {
		var t = e.memoizedState;
		t !== null && (sh._currentValue = t.memoizedState, Se(Ee, e)), t = Ce.current;
		var n = dp(t, e.type);
		t !== n && (Se(we, e), Se(Ce, n));
	}
	function Ae(e) {
		we.current === e && (xe(Ce), xe(we)), Ee.current === e && (xe(Ee), sh._currentValue = _e);
	}
	var je, Me;
	function Ne(e) {
		if (je === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			je = t && t[1] || "", Me = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + je + e + Me;
	}
	var Pe = !1;
	function Fe(e, t) {
		if (!e || Pe) return "";
		Pe = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var r = { DetermineComponentFrameRoot: function() {
				try {
					if (t) {
						var n = function() {
							throw Error();
						};
						if (Object.defineProperty(n.prototype, "props", { set: function() {
							throw Error();
						} }), typeof Reflect == "object" && Reflect.construct) {
							try {
								Reflect.construct(n, []);
							} catch (e) {
								var r = e;
							}
							Reflect.construct(e, [], n);
						} else {
							try {
								n.call();
							} catch (e) {
								r = e;
							}
							n = !1;
							try {
								var i = Object.getOwnPropertyDescriptor(e.prototype, "props");
								Object.defineProperty(e.prototype, "props", {
									configurable: !0,
									set: function() {
										throw Error();
									}
								}), n = !0, new e();
							} finally {
								n && (i === void 0 ? delete e.prototype.props : Object.defineProperty(e.prototype, "props", i));
							}
						}
					} else {
						try {
							throw Error();
						} catch (e) {
							r = e;
						}
						(n = e()) && typeof n.catch == "function" && n.catch(function() {});
					}
				} catch (e) {
					if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
				}
				return [null, null];
			} };
			r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, "name");
			i && i.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
			var a = r.DetermineComponentFrameRoot(), o = a[0], s = a[1];
			if (o && s) {
				var c = o.split("\n"), l = s.split("\n");
				for (i = r = 0; r < c.length && !c[r].includes("DetermineComponentFrameRoot");) r++;
				for (; i < l.length && !l[i].includes("DetermineComponentFrameRoot");) i++;
				if (r === c.length || i === l.length) for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i];) i--;
				for (; 1 <= r && 0 <= i; r--, i--) if (c[r] !== l[i]) {
					if (r !== 1 || i !== 1) do
						if (r--, i--, 0 > i || c[r] !== l[i]) {
							var u = "\n" + c[r].replace(" at new ", " at ");
							return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
						}
					while (1 <= r && 0 <= i);
					break;
				}
			}
		} finally {
			Pe = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? Ne(n) : "";
	}
	function Ie(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return Ne(e.type);
			case 16: return Ne("Lazy");
			case 13: return e.child !== t && t !== null ? Ne("Suspense Fallback") : Ne("Suspense");
			case 19: return Ne("SuspenseList");
			case 0:
			case 15: return Fe(e.type, !1);
			case 11: return Fe(e.type.render, !1);
			case 1: return Fe(e.type, !0);
			case 31: return Ne("Activity");
			case 30: return Ne("ViewTransition");
			default: return "";
		}
	}
	function Le(e) {
		try {
			var t = "", n = null;
			do
				t += Ie(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var Re = Object.prototype.hasOwnProperty, ze = t.unstable_scheduleCallback, Be = t.unstable_cancelCallback, Ve = t.unstable_shouldYield, He = t.unstable_requestPaint, Ue = t.unstable_now, We = t.unstable_getCurrentPriorityLevel, Ge = t.unstable_ImmediatePriority, Ke = t.unstable_UserBlockingPriority, qe = t.unstable_NormalPriority, Je = t.unstable_LowPriority, Ye = t.unstable_IdlePriority, Xe = t.log, Ze = t.unstable_setDisableYieldValue, I = null, Qe = null;
	function $e(e) {
		if (typeof Xe == "function" && Ze(e), Qe && typeof Qe.setStrictMode == "function") try {
			Qe.setStrictMode(I, e);
		} catch {}
	}
	var et = Math.clz32 ? Math.clz32 : rt, tt = Math.log, nt = Math.LN2;
	function rt(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (tt(e) / nt | 0) | 0;
	}
	var it = 256, at = 262144, ot = 4194304;
	function st(e) {
		var t = e & 42;
		if (t !== 0) return t;
		switch (e & -e) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64: return 64;
			case 128: return 128;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072: return e & -e;
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return e & 3932160;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return e & 62914560;
			case 67108864: return 67108864;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 0;
			default: return e;
		}
	}
	function ct(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = st(n))) : i = st(o) : i = st(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = st(n))) : i = st(o)) : i = st(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function L(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function lt(e, t) {
		t & 8 && (t |= t & 32);
		var n = e.entangledLanes;
		if (n !== 0) for (e = e.entanglements, n &= t; 0 < n;) {
			var r = 31 - et(n), i = 1 << r;
			t |= e[r], n &= ~i;
		}
		return t;
	}
	function ut(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4:
			case 8:
			case 64: return t + 250;
			case 16:
			case 32:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return -1;
			case 67108864:
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function dt() {
		var e = ot;
		return ot <<= 1, !(ot & 62914560) && (ot = 4194304), e;
	}
	function ft(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function pt(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function mt(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - et(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && ht(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function ht(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - et(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function R(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - et(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function gt(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : _t(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function _t(e) {
		switch (e) {
			case 2:
				e = 1;
				break;
			case 8:
				e = 4;
				break;
			case 32:
				e = 16;
				break;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152:
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
				e = 128;
				break;
			case 268435456:
				e = 134217728;
				break;
			default: e = 0;
		}
		return e;
	}
	function vt(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function yt() {
		var e = F.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : Ch(e.type)) : e;
	}
	function bt(e, t) {
		var n = F.p;
		try {
			return F.p = e, t();
		} finally {
			F.p = n;
		}
	}
	var xt = Math.random().toString(36).slice(2), St = "__reactFiber$" + xt, Ct = "__reactProps$" + xt, wt = "__reactContainer$" + xt, Tt = "__reactEvents$" + xt, Et = "__reactListeners$" + xt, Dt = "__reactHandles$" + xt, Ot = "__reactResources$" + xt, kt = "__reactMarker$" + xt, At = "__reactLoad$" + xt;
	function jt(e) {
		delete e[St], delete e[Ct], delete e[Et], delete e[Dt];
	}
	function Mt(e) {
		var t;
		if (t = e[St]) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[wt] || n[St]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = fm(e); e !== null;) {
					if (n = e[St]) return n;
					e = fm(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function Nt(e) {
		if (e = e[St] || e[wt]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function Pt(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function Ft(e) {
		var t = e[Ot];
		return t ||= e[Ot] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function It(e) {
		e[kt] = !0;
	}
	function Lt(e) {
		e[At] = void 0;
	}
	var Rt = /* @__PURE__ */ new Set(), zt = {};
	function Bt(e, t) {
		Vt(e, t), Vt(e + "Capture", t);
	}
	function Vt(e, t) {
		for (zt[e] = t, e = 0; e < t.length; e++) Rt.add(t[e]);
	}
	var z = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Ht = {}, Ut = {};
	function B(e) {
		return Re.call(Ut, e) ? !0 : Re.call(Ht, e) ? !1 : z.test(e) ? Ut[e] = !0 : (Ht[e] = !0, !1);
	}
	var V = !1;
	function Wt() {
		var e = V;
		return V = !1, e;
	}
	function Gt(e, t, n) {
		if (B(t)) {
			if (n === null) e.removeAttribute(t);
			else {
				switch (typeof n) {
					case "undefined":
					case "function":
					case "symbol":
						e.removeAttribute(t);
						return;
					case "boolean":
						var r = t.toLowerCase().slice(0, 5);
						if (r !== "data-" && r !== "aria-") {
							e.removeAttribute(t);
							return;
						}
				}
				e.setAttribute(t, n);
			}
		}
	}
	function Kt(e, t, n) {
		if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(t);
					return;
			}
			e.setAttribute(t, n);
		}
	}
	function qt(e, t, n, r) {
		if (r === null) e.removeAttribute(n);
		else {
			switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(n);
					return;
			}
			e.setAttributeNS(t, n, r);
		}
	}
	function Jt(e) {
		switch (typeof e) {
			case "bigint":
			case "boolean":
			case "number":
			case "string":
			case "undefined": return e;
			case "object": return e;
			default: return "";
		}
	}
	function Yt(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function Xt(e, t, n) {
		var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
		if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
			var i = r.get, a = r.set;
			return Object.defineProperty(e, t, {
				configurable: !0,
				get: function() {
					return i.call(this);
				},
				set: function(e) {
					n = "" + e, a.call(this, e);
				}
			}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
				getValue: function() {
					return n;
				},
				setValue: function(e) {
					n = "" + e;
				},
				stopTracking: function() {
					e._valueTracker = null, delete e[t];
				}
			};
		}
	}
	function Zt(e) {
		if (!e._valueTracker) {
			var t = Yt(e) ? "checked" : "value";
			e._valueTracker = Xt(e, t, "" + e[t]);
		}
	}
	function Qt(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = Yt(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n && (t.setValue(e), !0);
	}
	var H = /[\n"\\]/g;
	function $t(e) {
		return e.replace(H, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function en(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Jt(t)) : e.value !== "" + Jt(t) && (e.value = "" + Jt(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : nn(e, Jt(n)) : o === "number" && e.value == t ? nn(e, Jt(e.value)) : nn(e, Jt(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + Jt(s) : e.removeAttribute("name");
	}
	function tn(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				Zt(e);
				return;
			}
			n = n == null ? "" : "" + Jt(n), t = t == null ? n : "" + Jt(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), Zt(e);
	}
	function nn(e, t) {
		e.defaultValue !== "" + t && (e.defaultValue = "" + t);
	}
	function rn(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + Jt(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function an(e, t, n) {
		t != null && (t = "" + Jt(t), t !== e.value && (e.value = t), n == null) ? e.defaultValue !== t && (e.defaultValue = t) : e.defaultValue = n == null ? "" : "" + Jt(n);
	}
	function on(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (ge(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = Jt(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), Zt(e);
	}
	function sn(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var cn = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function ln(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || cn.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function un(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "", V = !0);
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && (ln(e, a, r), V = !0);
		} else for (var o in t) t.hasOwnProperty(o) && ln(e, o, t[o]);
	}
	function dn(e) {
		if (e.indexOf("-") === -1) return !1;
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var fn = /* @__PURE__ */ new Map([
		["acceptCharset", "accept-charset"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"],
		["crossOrigin", "crossorigin"],
		["accentHeight", "accent-height"],
		["alignmentBaseline", "alignment-baseline"],
		["arabicForm", "arabic-form"],
		["baselineShift", "baseline-shift"],
		["capHeight", "cap-height"],
		["clipPath", "clip-path"],
		["clipRule", "clip-rule"],
		["colorInterpolation", "color-interpolation"],
		["colorInterpolationFilters", "color-interpolation-filters"],
		["colorProfile", "color-profile"],
		["colorRendering", "color-rendering"],
		["dominantBaseline", "dominant-baseline"],
		["enableBackground", "enable-background"],
		["fillOpacity", "fill-opacity"],
		["fillRule", "fill-rule"],
		["floodColor", "flood-color"],
		["floodOpacity", "flood-opacity"],
		["fontFamily", "font-family"],
		["fontSize", "font-size"],
		["fontSizeAdjust", "font-size-adjust"],
		["fontStretch", "font-stretch"],
		["fontStyle", "font-style"],
		["fontVariant", "font-variant"],
		["fontWeight", "font-weight"],
		["glyphName", "glyph-name"],
		["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
		["glyphOrientationVertical", "glyph-orientation-vertical"],
		["horizAdvX", "horiz-adv-x"],
		["horizOriginX", "horiz-origin-x"],
		["imageRendering", "image-rendering"],
		["letterSpacing", "letter-spacing"],
		["lightingColor", "lighting-color"],
		["markerEnd", "marker-end"],
		["markerMid", "marker-mid"],
		["markerStart", "marker-start"],
		["maskType", "mask-type"],
		["overlinePosition", "overline-position"],
		["overlineThickness", "overline-thickness"],
		["paintOrder", "paint-order"],
		["panose-1", "panose-1"],
		["pointerEvents", "pointer-events"],
		["renderingIntent", "rendering-intent"],
		["shapeRendering", "shape-rendering"],
		["stopColor", "stop-color"],
		["stopOpacity", "stop-opacity"],
		["strikethroughPosition", "strikethrough-position"],
		["strikethroughThickness", "strikethrough-thickness"],
		["strokeDasharray", "stroke-dasharray"],
		["strokeDashoffset", "stroke-dashoffset"],
		["strokeLinecap", "stroke-linecap"],
		["strokeLinejoin", "stroke-linejoin"],
		["strokeMiterlimit", "stroke-miterlimit"],
		["strokeOpacity", "stroke-opacity"],
		["strokeWidth", "stroke-width"],
		["textAnchor", "text-anchor"],
		["textDecoration", "text-decoration"],
		["textRendering", "text-rendering"],
		["transformOrigin", "transform-origin"],
		["underlinePosition", "underline-position"],
		["underlineThickness", "underline-thickness"],
		["unicodeBidi", "unicode-bidi"],
		["unicodeRange", "unicode-range"],
		["unitsPerEm", "units-per-em"],
		["vAlphabetic", "v-alphabetic"],
		["vHanging", "v-hanging"],
		["vIdeographic", "v-ideographic"],
		["vMathematical", "v-mathematical"],
		["vectorEffect", "vector-effect"],
		["vertAdvY", "vert-adv-y"],
		["vertOriginX", "vert-origin-x"],
		["vertOriginY", "vert-origin-y"],
		["wordSpacing", "word-spacing"],
		["writingMode", "writing-mode"],
		["xmlnsXlink", "xmlns:xlink"],
		["xHeight", "x-height"]
	]), pn = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function mn(e) {
		return pn.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function hn() {}
	var gn = null;
	function _n(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var vn = null, yn = null;
	function bn(e) {
		var t = Nt(e);
		if (t && (e = t.stateNode)) {
			var n = e[Ct] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (en(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + $t("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[Ct] || null;
								if (!a) throw Error(i(90));
								en(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && Qt(r);
					}
					break a;
				case "textarea":
					an(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && rn(e, !!n.multiple, t, !1);
			}
		}
	}
	var xn = !1;
	function Sn(e, t, n) {
		if (xn) return e(t, n);
		xn = !0;
		try {
			return e(t);
		} finally {
			if (xn = !1, (vn !== null || yn !== null) && (Ld(), vn && (t = vn, e = yn, yn = vn = null, bn(t), e))) for (t = 0; t < e.length; t++) bn(e[t]);
		}
	}
	function Cn(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[Ct] || null;
		if (r === null) return null;
		n = r[t];
		a: switch (t) {
			case "onClick":
			case "onClickCapture":
			case "onDoubleClick":
			case "onDoubleClickCapture":
			case "onMouseDown":
			case "onMouseDownCapture":
			case "onMouseMove":
			case "onMouseMoveCapture":
			case "onMouseUp":
			case "onMouseUpCapture":
			case "onMouseEnter":
				(r = !r.disabled) || (e = e.type, r = e !== "button" && e !== "input" && e !== "select" && e !== "textarea"), e = !r;
				break a;
			default: e = !1;
		}
		if (e) return null;
		if (n && typeof n != "function") throw Error(i(231, t, typeof n));
		return n;
	}
	var U = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, wn = !1;
	if (U) try {
		var Tn = {};
		Object.defineProperty(Tn, "passive", { get: function() {
			wn = !0;
		} }), window.addEventListener("test", Tn, Tn), window.removeEventListener("test", Tn, Tn);
	} catch {
		wn = !1;
	}
	var En = null, Dn = null, On = null;
	function kn() {
		if (On) return On;
		var e, t = Dn, n = t.length, r, i = "value" in En ? En.value : En.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return On = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function An(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function jn() {
		return !0;
	}
	function Mn() {
		return !1;
	}
	function Nn(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? jn : Mn, this.isPropagationStopped = Mn, this;
		}
		return w(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = jn);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = jn);
			},
			persist: function() {},
			isPersistent: jn
		}), t;
	}
	var Pn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, Fn = Nn(Pn), In = w({}, Pn, {
		view: 0,
		detail: 0
	}), W = Nn(In), Ln, Rn, zn, Bn = w({}, In, {
		screenX: 0,
		screenY: 0,
		clientX: 0,
		clientY: 0,
		pageX: 0,
		pageY: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		getModifierState: Yn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== zn && (zn && e.type === "mousemove" ? (Ln = e.screenX - zn.screenX, Rn = e.screenY - zn.screenY) : Rn = Ln = 0, zn = e), Ln);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : Rn;
		}
	}), Vn = Nn(Bn), Hn = Nn(w({}, Bn, { dataTransfer: 0 })), Un = Nn(w({}, In, { relatedTarget: 0 })), Wn = Nn(w({}, Pn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Gn = Nn(w({}, Pn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), G = Nn(w({}, Pn, { data: 0 })), Kn = {
		Esc: "Escape",
		Spacebar: " ",
		Left: "ArrowLeft",
		Up: "ArrowUp",
		Right: "ArrowRight",
		Down: "ArrowDown",
		Del: "Delete",
		Win: "OS",
		Menu: "ContextMenu",
		Apps: "ContextMenu",
		Scroll: "ScrollLock",
		MozPrintableKey: "Unidentified"
	}, K = {
		8: "Backspace",
		9: "Tab",
		12: "Clear",
		13: "Enter",
		16: "Shift",
		17: "Control",
		18: "Alt",
		19: "Pause",
		20: "CapsLock",
		27: "Escape",
		32: " ",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "ArrowLeft",
		38: "ArrowUp",
		39: "ArrowRight",
		40: "ArrowDown",
		45: "Insert",
		46: "Delete",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NumLock",
		145: "ScrollLock",
		224: "Meta"
	}, qn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function Jn(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = qn[e]) ? !!t[e] : !1;
	}
	function Yn() {
		return Jn;
	}
	var Xn = Nn(w({}, In, {
		key: function(e) {
			if (e.key) {
				var t = Kn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = An(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? K[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: Yn,
		charCode: function(e) {
			return e.type === "keypress" ? An(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? An(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), Zn = Nn(w({}, Bn, {
		pointerId: 0,
		width: 0,
		height: 0,
		pressure: 0,
		tangentialPressure: 0,
		tiltX: 0,
		tiltY: 0,
		twist: 0,
		pointerType: 0,
		isPrimary: 0
	})), Qn = Nn(w({}, Pn, { submitter: 0 })), $n = Nn(w({}, In, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: Yn
	})), er = Nn(w({}, Pn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), tr = Nn(w({}, Bn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), nr = Nn(w({}, Pn, {
		newState: 0,
		oldState: 0,
		source: 0
	})), rr = [
		9,
		13,
		27,
		32
	], ir = U && "CompositionEvent" in window, ar = null;
	U && "documentMode" in document && (ar = document.documentMode);
	var or = U && "TextEvent" in window && !ar, sr = U && (!ir || ar && 8 < ar && 11 >= ar), cr = " ", lr = !1;
	function ur(e, t) {
		switch (e) {
			case "keyup": return rr.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function dr(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var fr = !1;
	function pr(e, t) {
		switch (e) {
			case "compositionend": return dr(t);
			case "keypress": return t.which === 32 ? (lr = !0, cr) : null;
			case "textInput": return e = t.data, e === cr && lr ? null : e;
			default: return null;
		}
	}
	function mr(e, t) {
		if (fr) return e === "compositionend" || !ir && ur(e, t) ? (e = kn(), On = Dn = En = null, fr = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return sr && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var hr = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0
	};
	function gr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!hr[e.type] : t === "textarea";
	}
	function _r(e, t, n, r) {
		vn ? yn ? yn.push(r) : yn = [r] : vn = r, t = qf(t, "onChange"), 0 < t.length && (n = new Fn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var vr = null, yr = null;
	function br(e) {
		Bf(e, 0);
	}
	function xr(e) {
		if (Qt(Pt(e))) return e;
	}
	function Sr(e, t) {
		if (e === "change") return t;
	}
	var Cr = !1;
	if (U) {
		var wr;
		if (U) {
			var Tr = "oninput" in document;
			if (!Tr) {
				var Er = document.createElement("div");
				Er.setAttribute("oninput", "return;"), Tr = typeof Er.oninput == "function";
			}
			wr = Tr;
		} else wr = !1;
		Cr = wr && (!document.documentMode || 9 < document.documentMode);
	}
	function Dr() {
		vr && (vr.detachEvent("onpropertychange", Or), yr = vr = null);
	}
	function Or(e) {
		if (e.propertyName === "value" && xr(yr)) {
			var t = [];
			_r(t, yr, e, _n(e)), Sn(br, t);
		}
	}
	function kr(e, t, n) {
		e === "focusin" ? (Dr(), vr = t, yr = n, vr.attachEvent("onpropertychange", Or)) : e === "focusout" && Dr();
	}
	function Ar(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return xr(yr);
	}
	function jr(e, t) {
		if (e === "click") return xr(t);
	}
	function Mr(e, t) {
		if (e === "input" || e === "change") return xr(t);
	}
	function Nr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var Pr = typeof Object.is == "function" ? Object.is : Nr;
	function Fr(e, t) {
		if (Pr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!Re.call(t, i) || !Pr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function Ir(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	function Lr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function Rr(e, t) {
		var n = Lr(e);
		e = 0;
		for (var r; n;) {
			if (n.nodeType === 3) {
				if (r = e + n.textContent.length, e <= t && r >= t) return {
					node: n,
					offset: t - e
				};
				e = r;
			}
			a: {
				for (; n;) {
					if (n.nextSibling) {
						n = n.nextSibling;
						break a;
					}
					n = n.parentNode;
				}
				n = void 0;
			}
			n = Lr(n);
		}
	}
	function zr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? zr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function Br(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = Ir(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Ir(e.document);
		}
		return t;
	}
	function Vr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var Hr = U && "documentMode" in document && 11 >= document.documentMode, Ur = null, Wr = null, Gr = null, Kr = !1;
	function qr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		Kr || Ur == null || Ur !== Ir(r) || (r = Ur, "selectionStart" in r && Vr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), Gr && Fr(Gr, r) || (Gr = r, r = qf(Wr, "onSelect"), 0 < r.length && (t = new Fn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = Ur)));
	}
	function Jr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var Yr = {
		animationend: Jr("Animation", "AnimationEnd"),
		animationiteration: Jr("Animation", "AnimationIteration"),
		animationstart: Jr("Animation", "AnimationStart"),
		transitionrun: Jr("Transition", "TransitionRun"),
		transitionstart: Jr("Transition", "TransitionStart"),
		transitioncancel: Jr("Transition", "TransitionCancel"),
		transitionend: Jr("Transition", "TransitionEnd")
	}, Xr = {}, Zr = {};
	U && (Zr = document.createElement("div").style, "AnimationEvent" in window || (delete Yr.animationend.animation, delete Yr.animationiteration.animation, delete Yr.animationstart.animation), "TransitionEvent" in window || delete Yr.transitionend.transition);
	function Qr(e) {
		if (Xr[e]) return Xr[e];
		if (!Yr[e]) return e;
		var t = Yr[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Zr) return Xr[e] = t[n];
		return e;
	}
	var $r = Qr("animationend"), ei = Qr("animationiteration"), ti = Qr("animationstart"), ni = Qr("transitionrun"), ri = Qr("transitionstart"), ii = Qr("transitioncancel"), ai = Qr("transitionend"), q = /* @__PURE__ */ new Map(), oi = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	oi.push("scrollEnd");
	function si(e, t) {
		q.set(e, t), Bt(t, [e]);
	}
	var ci = 0;
	function li(e, t) {
		if (e.name != null && e.name !== "auto") return e.name;
		if (t.autoName !== null) return t.autoName;
		e = vd.identifierPrefix;
		var n = ci++;
		return e = "_" + e + "t_" + n.toString(32) + "_", t.autoName = e;
	}
	function ui(e) {
		if (e == null || typeof e == "string") return e;
		var t = null, n = Ed;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = e[n[r]];
			if (i != null) {
				if (i === "none") return "none";
				t = t == null ? i : t + (" " + i);
			}
		}
		return t ?? e.default;
	}
	function di(e, t) {
		return e = ui(e), t = ui(t), t == null ? e === "auto" ? null : e : t === "auto" ? null : t;
	}
	var fi = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, pi = [], mi = 0, hi = 0;
	function gi() {
		for (var e = mi, t = hi = mi = 0; t < e;) {
			var n = pi[t];
			pi[t++] = null;
			var r = pi[t];
			pi[t++] = null;
			var i = pi[t];
			pi[t++] = null;
			var a = pi[t];
			if (pi[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && bi(n, i, a);
		}
	}
	function _i(e, t, n, r) {
		pi[mi++] = e, pi[mi++] = t, pi[mi++] = n, pi[mi++] = r, hi |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function vi(e, t, n, r) {
		return _i(e, t, n, r), xi(e);
	}
	function yi(e, t) {
		return _i(e, null, null, t), xi(e);
	}
	function bi(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - et(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function xi(e) {
		if (50 < Dd) throw Dd = 0, Od = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var Si = {};
	function Ci(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function wi(e, t, n, r) {
		return new Ci(e, t, n, r);
	}
	function Ti(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function Ei(e, t) {
		var n = e.alternate;
		return n === null ? (n = wi(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 1206910976, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function Di(e, t) {
		e.flags &= 1206910978;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function Oi(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof r == "function") Ti(r) && (s = 1);
		else if (typeof r == "string") s = qm(e, n, Ce.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (r) {
			case ce: return e = wi(31, n, t, a), e.elementType = ce, e.lanes = o, e;
			case O: return ki(n.children, a, o, t);
			case k:
				s = 8, a |= 24;
				break;
			case ee: return e = wi(12, n, t, a | 2), e.elementType = ee, e.lanes = o, e;
			case ne: return e = wi(13, n, t, a), e.elementType = ne, e.lanes = o, e;
			case re: return e = wi(19, n, t, a), e.elementType = re, e.lanes = o, e;
			case le:
			case ue: return e = a | 32, e = wi(30, n, t, e), e.elementType = ue, e.lanes = o, e.stateNode = {
				autoName: null,
				paired: null,
				clones: null,
				ref: null
			}, e;
			default:
				if (typeof r == "object" && r) switch (r.$$typeof) {
					case j:
						s = 10;
						break a;
					case A:
						s = 9;
						break a;
					case te:
						s = 11;
						break a;
					case ie:
						s = 14;
						break a;
					case oe:
						s = 16, r = null;
						break a;
				}
				s = 29, n = Error(i(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = wi(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function ki(e, t, n, r) {
		return e = wi(7, e, r, t), e.lanes = n, e;
	}
	function Ai(e, t, n) {
		return e = wi(6, e, null, t), e.lanes = n, e;
	}
	function ji(e) {
		var t = wi(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function Mi(e, t, n) {
		return t = wi(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var Ni = /* @__PURE__ */ new WeakMap();
	function Pi(e, t) {
		if (typeof e == "object" && e) {
			var n = Ni.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: Le(t)
			}, Ni.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: Le(t)
		};
	}
	var Fi = [], Ii = 0, Li = null, Ri = 0, zi = [], Bi = 0, Vi = null, Hi = 1, Ui = "";
	function Wi(e, t) {
		Fi[Ii++] = Ri, Fi[Ii++] = Li, Li = e, Ri = t;
	}
	function Gi(e, t, n) {
		zi[Bi++] = Hi, zi[Bi++] = Ui, zi[Bi++] = Vi, Vi = e;
		var r = Hi;
		e = Ui;
		var i = 32 - et(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - et(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, Hi = 1 << 32 - et(t) + i | n << i | r, Ui = a + e;
		} else Hi = 1 << a | n << i | r, Ui = e;
	}
	function Ki(e) {
		e.return !== null && (Wi(e, 1), Gi(e, 1, 0));
	}
	function qi(e) {
		for (; e === Li;) Li = Fi[--Ii], Fi[Ii] = null, Ri = Fi[--Ii], Fi[Ii] = null;
		for (; e === Vi;) Vi = zi[--Bi], zi[Bi] = null, Ui = zi[--Bi], zi[Bi] = null, Hi = zi[--Bi], zi[Bi] = null;
	}
	function Ji(e, t) {
		zi[Bi++] = Hi, zi[Bi++] = Ui, zi[Bi++] = Vi, Hi = t.id, Ui = t.overflow, Vi = e;
	}
	var Yi = null, Xi = null, J = !1, Zi = null, Qi = !1, $i = Error(i(519));
	function ea(e) {
		throw oa(Pi(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), $i;
	}
	function ta(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[St] = e, t[Ct] = r, n) {
			case "dialog":
				$("cancel", t), $("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				$("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < Rf.length; n++) $(Rf[n], t);
				break;
			case "source":
				$("error", t);
				break;
			case "img":
			case "image":
			case "link":
				$("error", t), $("load", t);
				break;
			case "details":
				$("toggle", t);
				break;
			case "input":
				$("invalid", t), tn(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				$("invalid", t);
				break;
			case "textarea": $("invalid", t), on(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || $f(t.textContent, n) ? (r.popover != null && ($("beforetoggle", t), $("toggle", t)), r.onScroll != null && $("scroll", t), r.onScrollEnd != null && $("scrollend", t), r.onClick != null && (t.onclick = hn), t = !0) : t = !1, t || ea(e, !0);
	}
	function na(e) {
		for (Yi = e.return; Yi;) switch (Yi.tag) {
			case 5:
			case 31:
			case 13:
				Qi = !1;
				return;
			case 27:
			case 3:
				Qi = !0;
				return;
			default: Yi = Yi.return;
		}
	}
	function ra(e) {
		if (e !== Yi) return !1;
		if (!J) return na(e), J = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = n === "form" || n === "button" || pp(e.type, e.memoizedProps)), n = !n), n && Xi && ea(e), na(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Xi = dm(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Xi = dm(e);
		} else t === 27 ? (t = Xi, Sp(e.type) ? (e = um, um = null, Xi = e) : Xi = t) : Xi = Yi ? lm(e.stateNode.nextSibling) : null;
		return !0;
	}
	function ia() {
		Xi = Yi = null, J = !1;
	}
	function aa() {
		var e = Zi;
		return e !== null && (ud === null ? ud = e : ud.push.apply(ud, e), Zi = null), e;
	}
	function oa(e) {
		Zi === null ? Zi = [e] : Zi.push(e);
	}
	var sa = be(null), ca = null, la = null;
	function ua(e, t, n) {
		Se(sa, t._currentValue), t._currentValue = n;
	}
	function da(e) {
		e._currentValue = sa.current, xe(sa);
	}
	function fa(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function pa(e, t, n, r) {
		var a = e.child;
		for (a !== null && (a.return = e); a !== null;) {
			var o = a.dependencies;
			if (o !== null) {
				var s = a.child;
				o = o.firstContext;
				a: for (; o !== null;) {
					var c = o;
					o = a;
					for (var l = 0; l < t.length; l++) if (c.context === t[l]) {
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), fa(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), fa(s, n, e), s = null;
			} else a.tag === 13 && a.memoizedState !== null && a.memoizedState.dehydrated === null ? (a.lanes |= n, s = a.alternate, s !== null && (s.lanes |= n), fa(a.return, n, e), s = a.child, s = s === null ? null : s.sibling) : s = a.child;
			if (s !== null) s.return = a;
			else for (s = a; s !== null;) {
				if (s === e) {
					s = null;
					break;
				}
				if (a = s.sibling, a !== null) {
					a.return = s.return, s = a;
					break;
				}
				s = s.return;
			}
			a = s;
		}
	}
	function ma(e, t, n, r) {
		e = null;
		for (var a = t, o = !1; a !== null;) {
			if (!o) {
				if (a.flags & 524288) o = !0;
				else if (a.flags & 262144) break;
			}
			if (a.tag === 10) {
				var s = a.alternate;
				if (s === null) throw Error(i(387));
				if (s = s.memoizedProps, s !== null) {
					var c = a.type;
					Pr(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === Ee.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [sh] : e.push(sh));
			}
			a = a.return;
		}
		return e !== null && pa(t, e, n, r), t.flags |= 262144, e !== null;
	}
	function ha(e) {
		for (e = e.firstContext; e !== null;) {
			if (!Pr(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function ga(e) {
		ca = e, la = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function _a(e) {
		return ya(ca, e);
	}
	function va(e, t) {
		return ca === null && ga(e), ya(e, t);
	}
	function ya(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, la === null) {
			if (e === null) throw Error(i(308));
			la = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else la = la.next = t;
		return n;
	}
	var ba = typeof AbortController < "u" ? AbortController : function() {
		var e = [], t = this.signal = {
			aborted: !1,
			addEventListener: function(t, n) {
				e.push(n);
			}
		};
		this.abort = function() {
			t.aborted = !0, e.forEach(function(e) {
				return e();
			});
		};
	}, xa = t.unstable_scheduleCallback, Sa = t.unstable_NormalPriority, Ca = {
		$$typeof: j,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function wa() {
		return {
			controller: new ba(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function Ta(e) {
		e.refCount--, e.refCount === 0 && xa(Sa, function() {
			e.controller.abort();
		});
	}
	function Ea(e, t) {
		if (e.pendingLanes & 4194048) {
			var n = e.transitionTypes;
			for (n === null && (n = e.transitionTypes = []), e = 0; e < t.length; e++) {
				var r = t[e];
				n.indexOf(r) === -1 && n.push(r);
			}
		}
	}
	var Da = null;
	function Oa(e) {
		var t = e.transitionTypes;
		return e.transitionTypes = null, t;
	}
	var ka = null, Aa = 0, ja = 0, Ma = null;
	function Na(e, t) {
		if (ka === null) {
			var n = ka = [];
			Aa = 0, ja = Nf(), Ma = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return Aa++, t.then(Pa, Pa), t;
	}
	function Pa() {
		if (--Aa === 0 && (Da = null, ka !== null)) {
			Ma !== null && (Ma.status = "fulfilled");
			var e = ka;
			ka = null, ja = 0, Ma = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function Fa(e, t) {
		var n = [], r = {
			status: "pending",
			value: null,
			reason: null,
			then: function(e) {
				n.push(e);
			}
		};
		return e.then(function() {
			r.status = "fulfilled", r.value = t;
			for (var e = 0; e < n.length; e++) (0, n[e])(t);
		}, function(e) {
			for (r.status = "rejected", r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
		}), r;
	}
	var Ia = P.S;
	P.S = function(e, t) {
		if (pd = Ue(), typeof t == "object" && t && typeof t.then == "function" && Na(e, t), Da !== null) for (var n = yf; n !== null;) Ea(n, Da), n = n.next;
		if (n = e.types, n !== null) {
			for (var r = yf; r !== null;) Ea(r, n), r = r.next;
			if (ja !== 0) {
				r = Da, r === null && (r = Da = []);
				for (var i = 0; i < n.length; i++) {
					var a = n[i];
					r.indexOf(a) === -1 && r.push(a);
				}
			}
		}
		Ia !== null && Ia(e, t);
	};
	var La = be(null);
	function Ra() {
		var e = La.current;
		return e === null ? Xu.pooledCache : e;
	}
	function za(e, t) {
		t === null ? Se(La, La.current) : Se(La, t.pool);
	}
	function Ba() {
		var e = Ra();
		return e === null ? null : {
			parent: Ca._currentValue,
			pool: e
		};
	}
	var Va = Error(i(460)), Ha = Error(i(474)), Ua = Error(i(542)), Wa = { then: function() {} };
	function Ga(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function Ka(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(hn, hn), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, Xa(e), e === void 0 && !("reason" in t) ? Error(i(600)) : e;
			default:
				if (typeof t.status == "string") t.then(hn, hn);
				else {
					if (e = Xu, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
					e = t, e.status = "pending", e.then(function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "fulfilled", n.value = e;
						}
					}, function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "rejected", n.reason = e;
						}
					});
				}
				switch (t.status) {
					case "fulfilled": return t.value;
					case "rejected": throw e = t.reason, Xa(e), e;
				}
				throw Ja = t, Va;
		}
	}
	function qa(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (Ja = e, Va) : e;
		}
	}
	var Ja = null;
	function Ya() {
		if (Ja === null) throw Error(i(459));
		var e = Ja;
		return Ja = null, e;
	}
	function Xa(e) {
		if (e === Va || e === Ua) throw Error(i(483));
	}
	var Za = null, Qa = 0;
	function $a(e) {
		var t = Qa;
		return Qa += 1, Za === null && (Za = []), Ka(Za, e, t);
	}
	function eo(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function to(e, t) {
		throw t.$$typeof === T ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function no(e) {
		function t(t, n) {
			if (e) {
				var r = t.deletions;
				r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
			}
		}
		function n(n, r) {
			if (!e) return null;
			for (; r !== null;) t(n, r), r = r.sibling;
			return null;
		}
		function r(e) {
			for (var t = /* @__PURE__ */ new Map(); e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
			return t;
		}
		function a(e, t) {
			return e = Ei(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 134217730, n) : (r = r.index, r < n ? (t.flags |= 2, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 134217730), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = Ai(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === O ? (e = d(e, t, n.props.children, r, n.key), eo(e, n), e) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === oe && qa(i) === t.type) ? (t = a(t, n.props), eo(t, n), t.return = e, t) : (t = Oi(n.type, n.key, n.props, null, e.mode, r), eo(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = Mi(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = ki(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = Ai("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case E: return n = Oi(t.type, t.key, t.props, null, e.mode, n), eo(n, t), n.return = e, n;
					case D: return t = Mi(t, e.mode, n), t.return = e, t;
					case oe: return t = qa(t), f(e, t, n);
				}
				if (ge(t) || pe(t)) return t = ki(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, $a(t), n);
				if (t.$$typeof === j) return f(e, va(e, t), n);
				to(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case E: return n.key === i ? l(e, t, n, r) : null;
					case D: return n.key === i ? u(e, t, n, r) : null;
					case oe: return n = qa(n), p(e, t, n, r);
				}
				if (ge(n) || pe(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, $a(n), r);
				if (n.$$typeof === j) return p(e, t, va(e, n), r);
				to(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case E: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case D: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case oe: return r = qa(r), m(e, t, n, r, i);
				}
				if (ge(r) || pe(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, $a(r), i);
				if (r.$$typeof === j) return m(e, t, n, va(t, r), i);
				to(t, r);
			}
			return null;
		}
		function h(i, a, s, c) {
			for (var l = null, u = null, d = a, h = a = 0, g = null; d !== null && h < s.length; h++) {
				d.index > h ? (g = d, d = null) : g = d.sibling;
				var _ = p(i, d, s[h], c);
				if (_ === null) {
					d === null && (d = g);
					break;
				}
				e && d && _.alternate === null && t(i, d), a = o(_, a, h), u === null ? l = _ : u.sibling = _, u = _, d = g;
			}
			if (h === s.length) return n(i, d), J && Wi(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return J && Wi(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && (_ = g.alternate, _ !== null && d.delete(_.key === null ? h : _.key)), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), J && Wi(i, h), l;
		}
		function g(a, s, c, l) {
			if (c == null) throw Error(i(151));
			for (var u = null, d = null, h = s, g = s = 0, _ = null, v = c.next(); h !== null && !v.done; g++, v = c.next()) {
				h.index > g ? (_ = h, h = null) : _ = h.sibling;
				var y = p(a, h, v.value, l);
				if (y === null) {
					h === null && (h = _);
					break;
				}
				e && h && y.alternate === null && t(a, h), s = o(y, s, g), d === null ? u = y : d.sibling = y, d = y, h = _;
			}
			if (v.done) return n(a, h), J && Wi(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return J && Wi(a, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && (_ = v.alternate, _ !== null && h.delete(_.key === null ? g : _.key)), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), J && Wi(a, g), u;
		}
		function _(e, r, o, c) {
			if (typeof o == "object" && o && o.type === O && o.key === null && o.props.ref === void 0 && (o = o.props.children), typeof o == "object" && o) {
				switch (o.$$typeof) {
					case E:
						a: {
							for (var l = o.key; r !== null;) {
								if (r.key === l) {
									if (l = o.type, l === O) {
										if (r.tag === 7) {
											n(e, r.sibling), c = a(r, o.props.children), eo(c, o), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === oe && qa(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), eo(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							o.type === O ? (c = ki(o.props.children, e.mode, c, o.key), eo(c, o), c.return = e, e = c) : (c = Oi(o.type, o.key, o.props, null, e.mode, c), eo(c, o), c.return = e, e = c);
						}
						return s(e);
					case D:
						a: {
							for (l = o.key; r !== null;) {
								if (r.key === l) {
									if (r.tag === 4 && r.stateNode.containerInfo === o.containerInfo && r.stateNode.implementation === o.implementation) {
										n(e, r.sibling), c = a(r, o.children || []), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								}
								t(e, r), r = r.sibling;
							}
							c = Mi(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case oe: return o = qa(o), _(e, r, o, c);
				}
				if (ge(o)) return h(e, r, o, c);
				if (pe(o)) {
					if (l = pe(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), g(e, r, o, c);
				}
				if (typeof o.then == "function") return _(e, r, $a(o), c);
				if (o.$$typeof === j) return _(e, r, va(e, o), c);
				to(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = Ai(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				Qa = 0;
				var i = _(e, t, n, r);
				return Za = null, i;
			} catch (t) {
				if (t === Va || t === Ua) throw t;
				var a = wi(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var ro = no(!0), io = no(!1), ao = !1;
	function oo(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				lanes: 0,
				hiddenCallbacks: null
			},
			callbacks: null
		};
	}
	function so(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function co(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function lo(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, X & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = xi(e), bi(e, null, n), t;
		}
		return _i(e, r, t, n), xi(e);
	}
	function uo(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, R(e, n);
		}
	}
	function fo(e, t) {
		var n = e.updateQueue, r = e.alternate;
		if (r !== null && (r = r.updateQueue, n === r)) {
			var i = null, a = null;
			if (n = n.firstBaseUpdate, n !== null) {
				do {
					var o = {
						lane: n.lane,
						tag: n.tag,
						payload: n.payload,
						callback: null,
						next: null
					};
					a === null ? i = a = o : a = a.next = o, n = n.next;
				} while (n !== null);
				a === null ? i = a = t : a = a.next = t;
			} else i = a = t;
			n = {
				baseState: r.baseState,
				firstBaseUpdate: i,
				lastBaseUpdate: a,
				shared: r.shared,
				callbacks: r.callbacks
			}, e.updateQueue = n;
		} else e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
	}
	var po = !1;
	function mo() {
		if (po) {
			var e = Ma;
			if (e !== null) throw e;
		}
	}
	function ho(e, t, n, r) {
		po = !1;
		var i = e.updateQueue;
		ao = !1;
		var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
		if (s !== null) {
			i.shared.pending = null;
			var c = s, l = c.next;
			c.next = null, o === null ? a = l : o.next = l, o = c;
			var u = e.alternate;
			u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
		}
		if (a !== null) {
			var d = i.baseState;
			o = 0, u = l = c = null, s = a;
			do {
				var f = s.lane & -536870913, p = f !== s.lane;
				if (p ? (Q & f) === f : (r & f) === f) {
					f !== 0 && f === ja && (po = !0), u !== null && (u = u.next = {
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: null,
						next: null
					});
					a: {
						var m = e, h = s;
						f = t;
						var g = n;
						switch (h.tag) {
							case 1:
								if (m = h.payload, typeof m == "function") {
									d = m.call(g, d, f);
									break a;
								}
								d = m;
								break a;
							case 3: m.flags = m.flags & -65537 | 128;
							case 0:
								if (m = h.payload, f = typeof m == "function" ? m.call(g, d, f) : m, f == null) break a;
								d = w({}, d, f);
								break a;
							case 2: ao = !0;
						}
					}
					f = s.callback, f !== null && (e.flags |= 64, p && (e.flags |= 8192), p = i.callbacks, p === null ? i.callbacks = [f] : p.push(f));
				} else p = {
					lane: f,
					tag: s.tag,
					payload: s.payload,
					callback: s.callback,
					next: null
				}, u === null ? (l = u = p, c = d) : u = u.next = p, o |= f;
				if (s = s.next, s === null) {
					if (s = i.shared.pending, s === null) break;
					p = s, s = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null;
				}
			} while (1);
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), id |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function go(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function _o(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) go(n[e], t);
	}
	var vo = be(null), yo = be(0);
	function bo(e, t) {
		e = nd, Se(yo, e), Se(vo, t), nd = e | t.baseLanes;
	}
	function xo() {
		Se(yo, nd), Se(vo, vo.current);
	}
	function So() {
		nd = yo.current, xe(vo), xe(yo);
	}
	var Co = be(null), wo = null;
	function To(e) {
		var t = e.alternate;
		Se(Ao, Ao.current & 1), Se(Co, e), wo === null && (t === null || vo.current !== null || t.memoizedState !== null) && (wo = e);
	}
	function Eo(e) {
		Se(Ao, Ao.current), Se(Co, e), wo === null && (wo = e);
	}
	function Do(e) {
		e.tag === 22 ? (Se(Ao, Ao.current), Se(Co, e), wo === null && (wo = e)) : Oo();
	}
	function Oo() {
		Se(Ao, Ao.current), Se(Co, Co.current);
	}
	function ko(e) {
		xe(Co), wo === e && (wo = null), xe(Ao);
	}
	var Ao = be(0);
	function jo(e, t) {
		Se(Co, Co.current), Se(Ao, t);
	}
	function Mo(e) {
		xe(Ao), xe(Co), wo === e && (wo = null);
	}
	function No(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || om(n) || sm(n))) return t;
			} else if (t.tag === 19 && t.memoizedProps.revealOrder !== "independent") {
				if (t.flags & 128) return t;
			} else if (t.child !== null) {
				t.child.return = t, t = t.child;
				continue;
			}
			if (t === e) break;
			for (; t.sibling === null;) {
				if (t.return === null || t.return === e) return null;
				t = t.return;
			}
			t.sibling.return = t.return, t = t.sibling;
		}
		return null;
	}
	var Po = 0, Y = null, Fo = null, Io = null, Lo = !1, Ro = !1, zo = !1, Bo = 0, Vo = 0, Ho = null, Uo = 0;
	function Wo() {
		throw Error(i(321));
	}
	function Go(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!Pr(e[n], t[n])) return !1;
		return !0;
	}
	function Ko(e, t, n, r, i, a) {
		return Po = a, Y = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, P.H = e === null || e.memoizedState === null ? lc : uc, zo = !1, a = n(r, i), zo = !1, Ro && (a = Jo(t, n, r, i)), qo(e), a;
	}
	function qo(e) {
		P.H = cc;
		var t = Fo !== null && Fo.next !== null;
		if (Po = 0, Io = Fo = Y = null, Lo = !1, Vo = 0, Ho = null, t) throw Error(i(300));
		e === null || Dc || (e = e.dependencies, e !== null && ha(e) && (Dc = !0));
	}
	function Jo(e, t, n, r) {
		Y = e;
		var a = 0;
		do {
			if (Ro && (Ho = null), Vo = 0, Ro = !1, 25 <= a) throw Error(i(301));
			if (a += 1, Io = Fo = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			P.H = dc, o = t(n, r);
		} while (Ro);
		return o;
	}
	function Yo() {
		var e = P.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? ns(t) : t, e = e.useState()[0], (Fo === null ? null : Fo.memoizedState) !== e && (Y.flags |= 1024), t;
	}
	function Xo() {
		var e = Bo !== 0;
		return Bo = 0, e;
	}
	function Zo(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function Qo(e) {
		if (Lo) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			Lo = !1;
		}
		Po = 0, Io = Fo = Y = null, Ro = !1, Vo = Bo = 0, Ho = null;
	}
	function $o() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return Io === null ? Y.memoizedState = Io = e : Io = Io.next = e, Io;
	}
	function es() {
		if (Fo === null) {
			var e = Y.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = Fo.next;
		var t = Io === null ? Y.memoizedState : Io.next;
		if (t !== null) Io = t, Fo = e;
		else {
			if (e === null) throw Y.alternate === null ? Error(i(467)) : Error(i(310));
			Fo = e, e = {
				memoizedState: Fo.memoizedState,
				baseState: Fo.baseState,
				baseQueue: Fo.baseQueue,
				queue: Fo.queue,
				next: null
			}, Io === null ? Y.memoizedState = Io = e : Io = Io.next = e;
		}
		return Io;
	}
	function ts() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function ns(e) {
		var t = Vo;
		return Vo += 1, Ho === null && (Ho = []), e = Ka(Ho, e, t), t = Y, (Io === null ? t.memoizedState : Io.next) === null && (t = t.alternate, P.H = t === null || t.memoizedState === null ? lc : uc), e;
	}
	function rs(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return ns(e);
			if (e.$$typeof === de) return;
			if (e.$$typeof === j) return _a(e);
		}
		throw Error(i(438, String(e)));
	}
	function is(e) {
		var t = null, n = Y.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = Y.alternate;
			r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
				data: r.data.map(function(e) {
					return e.slice();
				}),
				index: 0
			})));
		}
		if (t ??= {
			data: [],
			index: 0
		}, n === null && (n = ts(), Y.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = N;
		return t.index++, n;
	}
	function as(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function os(e) {
		return ss(es(), Fo, e);
	}
	function ss(e, t, n) {
		var r = e.queue;
		if (r === null) throw Error(i(311));
		r.lastRenderedReducer = n;
		var a = e.baseQueue, o = r.pending;
		if (o !== null) {
			if (a !== null) {
				var s = a.next;
				a.next = o.next, o.next = s;
			}
			t.baseQueue = a = o, r.pending = null;
		}
		if (o = e.baseState, a === null) e.memoizedState = o;
		else {
			t = a.next;
			var c = s = null, l = null, u = t, d = !1;
			do {
				var f = u.lane & -536870913;
				if (f === u.lane ? (Po & f) === f : (Q & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === ja && (d = !0);
					else if ((Po & p) === p) {
						u = u.next, p === ja && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, Y.lanes |= p, id |= p;
					f = u.action, zo && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, Y.lanes |= f, id |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !Pr(o, e.memoizedState) && (Dc = !0, d && (n = Ma, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function cs(e) {
		var t = es(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			Pr(o, t.memoizedState) || (Dc = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function ls(e, t, n) {
		var r = Y, a = es(), o = J;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !Pr((Fo || a).memoizedState, n);
		if (s && (a.memoizedState = n, Dc = !0), a = a.queue, Ps(fs.bind(null, r, a, e), [e]), e = a.getSnapshot !== t || s || Io !== null && !!(Io.memoizedState.tag & 1), ks(e ? 9 : 8, { destroy: void 0 }, ds.bind(null, r, a, n, t), null), e) {
			if (r.flags |= 2048, Xu === null) throw Error(i(349));
			o || Po & 127 || us(r, t, n);
		}
		return n;
	}
	function us(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = Y.updateQueue, t === null ? (t = ts(), Y.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function ds(e, t, n, r) {
		t.value = n, t.getSnapshot = r, ps(t) && ms(e);
	}
	function fs(e, t, n) {
		return n(function() {
			ps(t) && ms(e);
		});
	}
	function ps(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !Pr(e, n);
		} catch {
			return !0;
		}
	}
	function ms(e) {
		var t = yi(e, 2);
		t !== null && Md(t, e, 2);
	}
	function hs(e) {
		var t = $o();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), zo) {
				$e(!0);
				try {
					n();
				} finally {
					$e(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: as,
			lastRenderedState: e
		}, t;
	}
	function gs(e, t, n, r) {
		return e.baseState = n, ss(e, Fo, typeof r == "function" ? r : as);
	}
	function _s(e, t, n, r, a) {
		if (ac(e)) throw Error(i(485));
		if (e = t.action, e !== null) {
			var o = {
				payload: a,
				action: e,
				next: null,
				isTransition: !0,
				status: "pending",
				value: null,
				reason: null,
				listeners: [],
				then: function(e) {
					o.listeners.push(e);
				}
			};
			P.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, vs(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function vs(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = P.T, o = {};
			o.types = a === null ? null : a.types, P.T = o;
			try {
				var s = n(i, r), c = P.S;
				c !== null && c(o, s), ys(e, t, s);
			} catch (n) {
				xs(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), P.T = a;
			}
		} else try {
			a = n(i, r), ys(e, t, a);
		} catch (n) {
			xs(e, t, n);
		}
	}
	function ys(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			bs(e, t, n);
		}, function(n) {
			return xs(e, t, n);
		}) : bs(e, t, n);
	}
	function bs(e, t, n) {
		t.status = "fulfilled", t.value = n, Ss(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, vs(e, n)));
	}
	function xs(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, Ss(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function Ss(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function Cs(e, t) {
		return t;
	}
	function ws(e, t) {
		if (J) {
			var n = Xu.formState;
			if (n !== null) {
				a: {
					var r = Y;
					if (J) {
						if (Xi) {
							b: {
								for (var i = Xi, a = Qi; i.nodeType !== 8;) if (!a || (i = lm(i.nextSibling), i === null)) {
									i = null;
									break b;
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								Xi = lm(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						ea(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = $o(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Cs,
			lastRenderedState: t
		}, n.queue = r, n = nc.bind(null, Y, r), r.dispatch = n, r = hs(!1), a = ic.bind(null, Y, !1, r.queue), r = $o(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = _s.bind(null, Y, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function Ts(e) {
		return Es(es(), Fo, e);
	}
	function Es(e, t, n) {
		if (t = ss(e, t, Cs)[0], e = os(as)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = ns(t);
		} catch (e) {
			throw e === Va ? Ua : e;
		}
		else r = t;
		t = es();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (Y.flags |= 2048, ks(9, { destroy: void 0 }, Ds.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function Ds(e, t) {
		e.action = t;
	}
	function Os(e) {
		var t = es(), n = Fo;
		if (n !== null) return Es(t, n, e);
		es(), t = t.memoizedState, n = es();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function ks(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = Y.updateQueue, t === null && (t = ts(), Y.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function As() {
		return es().memoizedState;
	}
	function js(e, t, n, r) {
		var i = $o();
		Y.flags |= e, i.memoizedState = ks(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function Ms(e, t, n, r) {
		var i = es();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		Fo !== null && r !== null && Go(r, Fo.memoizedState.deps) ? i.memoizedState = ks(t, a, n, r) : (Y.flags |= e, i.memoizedState = ks(1 | t, a, n, r));
	}
	function Ns(e, t) {
		js(8390656, 8, e, t);
	}
	function Ps(e, t) {
		Ms(2048, 8, e, t);
	}
	function Fs(e) {
		Y.flags |= 4;
		var t = Y.updateQueue;
		if (t === null) t = ts(), Y.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function Is(e) {
		var t = es().memoizedState;
		return Fs({
			ref: t,
			nextImpl: e
		}), function() {
			if (X & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function Ls(e, t) {
		return Ms(4, 2, e, t);
	}
	function Rs(e, t) {
		return Ms(4, 4, e, t);
	}
	function zs(e, t) {
		if (typeof t == "function") {
			e = e();
			var n = t(e);
			return function() {
				typeof n == "function" ? n() : t(null);
			};
		}
		if (t != null) return e = e(), t.current = e, function() {
			t.current = null;
		};
	}
	function Bs(e, t, n) {
		n = n == null ? null : n.concat([e]), Ms(4, 4, zs.bind(null, t, e), n);
	}
	function Vs() {}
	function Hs(e, t) {
		var n = es();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && Go(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function Us(e, t) {
		var n = es();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && Go(t, r[1])) return r[0];
		if (r = e(), zo) {
			$e(!0);
			try {
				e();
			} finally {
				$e(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function Ws(e, t, n) {
		return n === void 0 || Po & 1073741824 && !(Q & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = Ad(), Y.lanes |= e, id |= e, n);
	}
	function Gs(e, t, n, r) {
		return Pr(n, t) ? n : vo.current === null ? !(Po & 106) || Po & 1073741824 && !(Q & 261930) ? (Dc = !0, e.memoizedState = n) : (e = Ad(), Y.lanes |= e, id |= e, t) : (e = Ws(e, n, r), Pr(e, t) || (Dc = !0), e);
	}
	function Ks(e, t, n, r, i) {
		var a = F.p;
		F.p = a !== 0 && 8 > a ? a : 8;
		var o = P.T, s = {};
		s.types = o === null ? null : o.types, P.T = s, ic(e, !1, t, n);
		try {
			var c = i(), l = P.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? rc(e, t, Fa(c, r), kd(e)) : rc(e, t, r, kd(e));
		} catch (n) {
			rc(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, kd());
		} finally {
			F.p = a, o !== null && s.types !== null && (o.types = s.types), P.T = o;
		}
	}
	function qs() {}
	function Js(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = Ys(e).queue;
		Ks(e, a, t, _e, n === null ? qs : function() {
			return Xs(e), n(r);
		});
	}
	function Ys(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: _e,
			baseState: _e,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: as,
				lastRenderedState: _e
			},
			next: null
		};
		var n = {};
		return t.next = {
			memoizedState: n,
			baseState: n,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: as,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function Xs(e) {
		var t = Ys(e);
		t.next === null && (t = e.alternate.memoizedState), rc(e, t.next.queue, {}, kd());
	}
	function Zs() {
		return _a(sh);
	}
	function Qs() {
		return es().memoizedState;
	}
	function $s() {
		return es().memoizedState;
	}
	function ec(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = kd();
					e = co(n);
					var r = lo(t, e, n);
					r !== null && (Md(r, t, n), uo(r, t, n)), t = { cache: wa() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function tc(e, t, n) {
		var r = kd();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, ac(e) ? oc(t, n) : (n = vi(e, t, n, r), n !== null && (Md(n, e, r), sc(n, t, r)));
	}
	function nc(e, t, n) {
		rc(e, t, n, kd());
	}
	function rc(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (ac(e)) oc(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, Pr(s, o)) return _i(e, t, i, 0), Xu === null && gi(), !1;
			} catch {}
			if (n = vi(e, t, i, r), n !== null) return Md(n, e, r), sc(n, t, r), !0;
		}
		return !1;
	}
	function ic(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: Nf(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, ac(e)) {
			if (t) throw Error(i(479));
		} else t = vi(e, n, r, 2), t !== null && Md(t, e, 2);
	}
	function ac(e) {
		var t = e.alternate;
		return e === Y || t !== null && t === Y;
	}
	function oc(e, t) {
		Ro = Lo = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function sc(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, R(e, n);
		}
	}
	var cc = {
		readContext: _a,
		use: rs,
		useCallback: Wo,
		useContext: Wo,
		useEffect: Wo,
		useImperativeHandle: Wo,
		useLayoutEffect: Wo,
		useInsertionEffect: Wo,
		useMemo: Wo,
		useReducer: Wo,
		useRef: Wo,
		useState: Wo,
		useDebugValue: Wo,
		useDeferredValue: Wo,
		useTransition: Wo,
		useSyncExternalStore: Wo,
		useId: Wo,
		useHostTransitionStatus: Wo,
		useFormState: Wo,
		useActionState: Wo,
		useOptimistic: Wo,
		useMemoCache: Wo,
		useCacheRefresh: Wo,
		useEffectEvent: Wo
	}, lc = {
		readContext: _a,
		use: rs,
		useCallback: function(e, t) {
			return $o().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: _a,
		useEffect: Ns,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), js(4194308, 4, zs.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return js(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			js(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = $o();
			t = t === void 0 ? null : t;
			var r = e();
			if (zo) {
				$e(!0);
				try {
					e();
				} finally {
					$e(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = $o();
			if (n !== void 0) {
				var i = n(t);
				if (zo) {
					$e(!0);
					try {
						n(t);
					} finally {
						$e(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = tc.bind(null, Y, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = $o();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = hs(e);
			var t = e.queue, n = nc.bind(null, Y, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: Vs,
		useDeferredValue: function(e, t) {
			return Ws($o(), e, t);
		},
		useTransition: function() {
			var e = hs(!1);
			return e = Ks.bind(null, Y, e.queue, !0, !1), $o().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = Y, a = $o();
			if (J) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), Xu === null) throw Error(i(349));
				Q & 127 || us(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, Ns(fs.bind(null, r, o, e), [e]), r.flags |= 2048, ks(9, { destroy: void 0 }, ds.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = $o(), t = Xu.identifierPrefix;
			if (J) {
				var n = Ui, r = Hi;
				n = (r & ~(1 << 32 - et(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = Bo++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = Uo++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: Zs,
		useFormState: ws,
		useActionState: ws,
		useOptimistic: function(e) {
			var t = $o();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = ic.bind(null, Y, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: is,
		useCacheRefresh: function() {
			return $o().memoizedState = ec.bind(null, Y);
		},
		useEffectEvent: function(e) {
			var t = $o(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (X & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, uc = {
		readContext: _a,
		use: rs,
		useCallback: Hs,
		useContext: _a,
		useEffect: Ps,
		useImperativeHandle: Bs,
		useInsertionEffect: Ls,
		useLayoutEffect: Rs,
		useMemo: Us,
		useReducer: os,
		useRef: As,
		useState: function() {
			return os(as);
		},
		useDebugValue: Vs,
		useDeferredValue: function(e, t) {
			return Gs(es(), Fo.memoizedState, e, t);
		},
		useTransition: function() {
			var e = os(as)[0], t = es().memoizedState;
			return [typeof e == "boolean" ? e : ns(e), t];
		},
		useSyncExternalStore: ls,
		useId: Qs,
		useHostTransitionStatus: Zs,
		useFormState: Ts,
		useActionState: Ts,
		useOptimistic: function(e, t) {
			return gs(es(), Fo, e, t);
		},
		useMemoCache: is,
		useCacheRefresh: $s,
		useEffectEvent: Is
	}, dc = {
		readContext: _a,
		use: rs,
		useCallback: Hs,
		useContext: _a,
		useEffect: Ps,
		useImperativeHandle: Bs,
		useInsertionEffect: Ls,
		useLayoutEffect: Rs,
		useMemo: Us,
		useReducer: cs,
		useRef: As,
		useState: function() {
			return cs(as);
		},
		useDebugValue: Vs,
		useDeferredValue: function(e, t) {
			var n = es();
			return Fo === null ? Ws(n, e, t) : Gs(n, Fo.memoizedState, e, t);
		},
		useTransition: function() {
			var e = cs(as)[0], t = es().memoizedState;
			return [typeof e == "boolean" ? e : ns(e), t];
		},
		useSyncExternalStore: ls,
		useId: Qs,
		useHostTransitionStatus: Zs,
		useFormState: Os,
		useActionState: Os,
		useOptimistic: function(e, t) {
			var n = es();
			return Fo === null ? (n.baseState = e, [e, n.queue.dispatch]) : gs(n, Fo, e, t);
		},
		useMemoCache: is,
		useCacheRefresh: $s,
		useEffectEvent: Is
	};
	function fc(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : w({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var pc = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = kd(), i = co(r);
			i.payload = t, n != null && (i.callback = n), t = lo(e, i, r), t !== null && (Md(t, e, r), uo(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = kd(), i = co(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = lo(e, i, r), t !== null && (Md(t, e, r), uo(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = kd(), r = co(n);
			r.tag = 2, t != null && (r.callback = t), t = lo(e, r, n), t !== null && (Md(t, e, n), uo(t, e, n));
		}
	};
	function mc(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !Fr(n, r) || !Fr(i, a) : !0;
	}
	function hc(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && pc.enqueueReplaceState(t, t.state, null);
	}
	function gc(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = w({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function _c(e) {
		fi(e);
	}
	function vc(e) {
		console.error(e);
	}
	function yc(e) {
		fi(e);
	}
	function bc(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function xc(e, t, n) {
		try {
			var r = e.onCaughtError;
			r(n.value, {
				componentStack: n.stack,
				errorBoundary: t.tag === 1 ? t.stateNode : null
			});
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Sc(e, t, n) {
		return n = co(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			bc(e, t);
		}, n;
	}
	function Cc(e) {
		return e = co(e), e.tag = 3, e;
	}
	function wc(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				xc(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			xc(t, n, r), typeof i != "function" && (gd === null ? gd = /* @__PURE__ */ new Set([this]) : gd.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function Tc(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && ma(t, n, a, !0), n = Co.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13:
					case 19: return wo === null ? Wd() : n.alternate === null && rd === 0 && (rd = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === Wa ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = /* @__PURE__ */ new Set([r]) : t.add(r), pf(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === Wa ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: /* @__PURE__ */ new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = /* @__PURE__ */ new Set([r]) : n.add(r)), pf(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return pf(e, r, a), Wd(), !1;
		}
		if (J) return t = Co.current, t === null ? (r !== $i && (t = Error(i(423), { cause: r }), oa(Pi(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = Pi(r, n), a = Sc(e.stateNode, r, a), fo(e, a), rd !== 4 && (rd = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== $i && (e = Error(i(422), { cause: r }), oa(Pi(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = Pi(o, n), ld === null ? ld = [o] : ld.push(o), rd !== 4 && (rd = 2), t === null) return !0;
		r = Pi(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = Sc(n.stateNode, r, e), fo(n, e), !1;
				case 1:
					if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (gd === null || !gd.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = Cc(a), wc(a, e, n, r), fo(n, a), !1;
					break;
				case 22: if (n.memoizedState !== null) return n.flags |= 65536, !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var Ec = Error(i(461)), Dc = !1;
	function Oc(e, t, n, r) {
		t.child = e === null ? io(t, null, n, r) : ro(t, e.child, n, r);
	}
	function kc(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return ga(t), r = Ko(e, t, n, o, a, i), s = Xo(), e !== null && !Dc ? (Zo(e, t, i), rl(e, t, i)) : (J && s && Ki(t), t.flags |= 1, Oc(e, t, r, i), t.child);
	}
	function Ac(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !Ti(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, jc(e, t, a, r, i)) : (e = Oi(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !il(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? Fr : n, n(o, r) && e.ref === t.ref) return rl(e, t, i);
		}
		return t.flags |= 1, e = Ei(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function jc(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (Fr(a, r) && e.ref === t.ref) {
				if (Dc = !1, t.pendingProps = r = a, il(e, i)) e.flags & 131072 && (Dc = !0);
				else return t.lanes = e.lanes, rl(e, t, i);
			}
		}
		return zc(e, t, n, r, i);
	}
	function Mc(e, t, n, r) {
		var i = r.children, a = e === null ? null : e.memoizedState;
		if (e === null && t.stateNode === null && (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), r.mode === "hidden") {
			if (t.flags & 128) {
				if (a = a === null ? n : a.baseLanes | n, e !== null) {
					for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
					r = i & ~a;
				} else r = 0, t.child = null;
				return Pc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && za(t, a === null ? null : a.cachePool), a === null ? xo() : bo(t, a), Do(t);
			else return r = t.lanes = 536870912, Pc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && za(t, null), xo(), Oo()) : (za(t, a.cachePool), bo(t, a), Oo(), t.memoizedState = null);
		return Oc(e, t, i, n), t.child;
	}
	function Nc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function Pc(e, t, n, r, i) {
		var a = Ra();
		return a = a === null ? null : {
			parent: Ca._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && za(t, null), xo(), Do(t), e !== null && ma(e, t, r, !0), t.childLanes = i, null;
	}
	function Fc(e, t) {
		return t = Jc({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function Ic(e, t, n) {
		return ro(t, e.child, null, n), e = Fc(t, t.pendingProps), e.flags |= 2, ko(t), t.memoizedState = null, e;
	}
	function Lc(e, t, n) {
		var r = t.pendingProps, a = !!(t.flags & 128);
		if (t.flags &= -129, e === null) {
			if (J) {
				if (r.mode === "hidden") return e = Fc(t, r), t.lanes = 536870912, e.memoizedState = {
					baseLanes: 0,
					cachePool: null
				}, Nc(null, e);
				if (Eo(t), (e = Xi) ? (e = am(e, Qi), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Vi === null ? null : {
						id: Hi,
						overflow: Ui
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = ji(e), n.return = t, t.child = n, Yi = t, Xi = null)) : e = null, e === null) throw ea(t);
				return t.lanes = 536870912, null;
			}
			return Fc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (Eo(t), a) {
				if (t.flags & 256) t.flags &= -257, t = Ic(e, t, n);
				else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
				else throw Error(i(558));
			} else if (Dc || ma(e, t, n, !1), a = (n & e.childLanes) !== 0, Dc || a) {
				if (vo.current === null) {
					if (r = Xu, r !== null && (s = gt(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, yi(e, s), Md(r, e, s), Ec;
					Wd();
				}
				t = Ic(e, t, n);
			} else e = o.treeContext, Xi = lm(s.nextSibling), Yi = t, J = !0, Zi = null, Qi = !1, e !== null && Ji(t, e), t = Fc(t, r), t.flags |= 134221824;
			return t;
		}
		return e = Ei(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function Rc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function zc(e, t, n, r, i) {
		return ga(t), n = Ko(e, t, n, r, void 0, i), r = Xo(), e !== null && !Dc ? (Zo(e, t, i), rl(e, t, i)) : (J && r && Ki(t), t.flags |= 1, Oc(e, t, n, i), t.child);
	}
	function Bc(e, t, n, r, i, a) {
		return ga(t), t.updateQueue = null, n = Jo(t, r, n, i), qo(e), r = Xo(), e !== null && !Dc ? (Zo(e, t, a), rl(e, t, a)) : (J && r && Ki(t), t.flags |= 1, Oc(e, t, n, a), t.child);
	}
	function Vc(e, t, n, r, i) {
		if (ga(t), t.stateNode === null) {
			var a = Si, o = n.contextType;
			typeof o == "object" && o && (a = _a(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = pc, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, oo(t), o = n.contextType, a.context = typeof o == "object" && o ? _a(o) : Si, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (fc(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && pc.enqueueReplaceState(a, a.state, null), ho(t, r, a, i), mo(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = gc(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = Si, typeof u == "object" && u && (o = _a(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && hc(t, a, r, o), ao = !1;
			var f = t.memoizedState;
			a.state = f, ho(t, r, a, i), mo(), l = t.memoizedState, s || f !== l || ao ? (typeof d == "function" && (fc(t, n, d, r), l = t.memoizedState), (c = ao || mc(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, so(e, t), o = t.memoizedProps, u = gc(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = Si, typeof l == "object" && l && (c = _a(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && hc(t, a, r, c), ao = !1, f = t.memoizedState, a.state = f, ho(t, r, a, i), mo();
			var p = t.memoizedState;
			o !== d || f !== p || ao || e !== null && e.dependencies !== null && ha(e.dependencies) ? (typeof s == "function" && (fc(t, n, s, r), p = t.memoizedState), (u = ao || mc(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && ha(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, Rc(e, t), r = !!(t.flags & 128), a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = ro(t, e.child, null, i), t.child = ro(t, null, n, i)) : Oc(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = rl(e, t, i), e;
	}
	function Hc(e, t, n, r) {
		return ia(), t.flags |= 256, Oc(e, t, n, r), t.child;
	}
	var Uc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function Wc(e) {
		return {
			baseLanes: e,
			cachePool: Ba()
		};
	}
	function Gc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= sd), e;
	}
	function Kc(e, t, n) {
		var r = t.pendingProps, i = !1, a = !!(t.flags & 128), o;
		if ((o = a) || (o = e !== null && e.memoizedState === null ? !1 : !!(Ao.current & 2)), o && (i = !0, t.flags &= -129), o = !!(t.flags & 32), t.flags &= -33, e === null) {
			if (J) {
				if (i ? To(t) : Oo(), (e = Xi) ? (e = am(e, Qi), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Vi === null ? null : {
						id: Hi,
						overflow: Ui
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = ji(e), n.return = t, t.child = n, Yi = t, Xi = null)) : e = null, e === null) throw ea(t);
				return t.lanes = sm(e) ? 32 : 536870912, null;
			}
			return a = r.children, r = r.fallback, i ? (Oo(), i = t.mode, a = Jc({
				mode: "hidden",
				children: a
			}, i), r = ki(r, i, n, null), a.return = t, r.return = t, a.sibling = r, t.child = a, r = t.child, r.memoizedState = Wc(n), r.childLanes = Gc(e, o, n), t.memoizedState = Uc, Nc(null, r)) : (To(t), qc(t, a));
		}
		var s = e.memoizedState;
		if (s !== null) {
			var c = s.dehydrated;
			if (c !== null) return Xc(e, t, a, o, r, c, s, n);
		}
		return i ? (Oo(), i = r.fallback, a = t.mode, s = e.child, c = s.sibling, r = Ei(s, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = s.subtreeFlags & 1206910976, c === null ? (i = ki(i, a, n, null), i.flags |= 2) : i = Ei(c, i), i.return = t, r.return = t, r.sibling = i, t.child = r, Nc(null, r), r = t.child, i = e.child.memoizedState, i === null ? i = Wc(n) : (a = i.cachePool, a === null ? a = Ba() : (s = Ca._currentValue, a = a.parent === s ? a : {
			parent: s,
			pool: s
		}), i = {
			baseLanes: i.baseLanes | n,
			cachePool: a
		}), r.memoizedState = i, r.childLanes = Gc(e, o, n), t.memoizedState = Uc, Nc(e.child, r)) : (To(t), n = e.child, e = n.sibling, n = Ei(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (o = t.deletions, o === null ? (t.deletions = [e], t.flags |= 16) : o.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function qc(e, t) {
		return t = Jc({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function Jc(e, t) {
		return e = wi(22, e, null, t), e.lanes = 0, e;
	}
	function Yc(e, t, n) {
		return ro(t, e.child, null, n), e = qc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function Xc(e, t, n, r, a, o, s, c) {
		if (n) return t.flags & 256 ? (To(t), t.flags &= -257, Yc(e, t, c)) : t.memoizedState === null ? (Oo(), o = a.fallback, s = t.mode, a = Jc({
			mode: "visible",
			children: a.children
		}, s), o = ki(o, s, c, null), o.flags |= 2, a.return = t, o.return = t, a.sibling = o, t.child = a, ro(t, e.child, null, c), a = t.child, a.memoizedState = Wc(c), a.childLanes = Gc(e, r, c), t.memoizedState = Uc, Nc(null, a)) : (Oo(), t.child = e.child, t.flags |= 128, null);
		if (To(t), sm(o)) {
			if (r = o.nextSibling && o.nextSibling.dataset, r) var l = r.dgst;
			return r = l, r !== "" && (a = Error(i(419)), a.stack = "", a.digest = r, oa({
				value: a,
				source: null,
				stack: null
			})), Yc(e, t, c);
		}
		if (Dc || ma(e, t, c, !1), r = (c & e.childLanes) !== 0, Dc || r) {
			if (vo.current !== null) return Yc(e, t, c);
			if (r = Xu, r !== null && (a = gt(r, c), a !== 0 && a !== s.retryLane)) throw s.retryLane = a, yi(e, a), Md(r, e, a), Ec;
			return om(o) || Wd(), Yc(e, t, c);
		}
		return om(o) ? (t.flags |= 192, t.child = e.child, null) : (e = s.treeContext, Xi = lm(o.nextSibling), Yi = t, J = !0, Zi = null, Qi = !1, e !== null && Ji(t, e), t = qc(t, a.children), t.flags |= 134221824, t);
	}
	function Zc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), fa(e.return, t, n);
	}
	function Qc(e) {
		for (var t = null; e !== null;) {
			var n = e.alternate;
			n !== null && No(n) === null && (t = e), e = e.sibling;
		}
		return t;
	}
	function $c(e, t, n, r, i, a) {
		var o = e.memoizedState;
		o === null ? e.memoizedState = {
			isBackwards: t,
			rendering: null,
			renderingStartTime: 0,
			last: r,
			tail: n,
			tailMode: i,
			treeForkCount: a
		} : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i, o.treeForkCount = a);
	}
	function el(e) {
		var t = e.child;
		for (e.child = null; t !== null;) {
			var n = t.sibling;
			t.sibling = e.child, e.child = t, t = n;
		}
	}
	function tl(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = Ao.current;
		if (t.flags & 128) return jo(t, o), null;
		var s = !!(o & 2);
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, jo(t, o), i === "backwards" && e !== null ? (el(e), Oc(e, t, r, n), el(e)) : Oc(e, t, r, n), r = J ? Ri : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && Zc(e, n, t);
			else if (e.tag === 19) Zc(e, n, t);
			else if (e.child !== null) {
				e.child.return = e, e = e.child;
				continue;
			}
			if (e === t) break a;
			for (; e.sibling === null;) {
				if (e.return === null || e.return === t) break a;
				e = e.return;
			}
			e.sibling.return = e.return, e = e.sibling;
		}
		switch (i) {
			case "backwards":
				n = Qc(t.child), n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null, el(t)), $c(t, !0, i, null, a, r);
				break;
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && No(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				$c(t, !0, n, null, a, r);
				break;
			case "together":
				$c(t, !1, null, null, void 0, r);
				break;
			case "independent":
				t.memoizedState = null;
				break;
			default: n = Qc(t.child), n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), $c(t, !1, i, n, a, r);
		}
		return t.child;
	}
	function nl(e, t, n) {
		var r = t.pendingProps;
		return ua(t, t.type, r.value), Oc(e, t, r.children, n), t.child;
	}
	function rl(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), id |= t.lanes, (n & t.childLanes) === 0) {
			if (e !== null) {
				if (ma(e, t, n, !1), (n & t.childLanes) === 0) return null;
			} else return null;
		}
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = Ei(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = Ei(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function il(e, t) {
		return (e.lanes & t) !== 0 || (e = e.dependencies, !!(e !== null && ha(e)));
	}
	function al(e, t, n) {
		switch (t.tag) {
			case 3:
				De(t, t.stateNode.containerInfo), ua(t, Ca, e.memoizedState.cache), ia();
				break;
			case 27:
			case 5:
				ke(t);
				break;
			case 4:
				De(t, t.stateNode.containerInfo);
				break;
			case 10:
				ua(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, Eo(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) {
					if (r.dehydrated !== null) return To(t), t.flags |= 128, null;
					r = ma(e, t, n, !1);
					var i = t.child.childLanes;
					return r || (n & i) !== 0 ? Kc(e, t, n) : (To(t), e = rl(e, t, n), e === null ? null : e.sibling);
				}
				To(t);
				break;
			case 19:
				if (t.flags & 128) return tl(e, t, n);
				if (i = !!(e.flags & 128), r = (n & t.childLanes) !== 0, r ||= (ma(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return tl(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), jo(t, Ao.current), r) break;
				return null;
			case 22: return t.lanes = 0, Mc(e, t, n, t.pendingProps);
			case 24: ua(t, Ca, e.memoizedState.cache);
		}
		return rl(e, t, n);
	}
	function ol(e, t, n) {
		if (e !== null) {
			if (e.memoizedProps !== t.pendingProps) Dc = !0;
			else {
				if (!il(e, n) && !(t.flags & 128)) return Dc = !1, al(e, t, n);
				Dc = !!(e.flags & 131072);
			}
		} else Dc = !1, J && t.flags & 1048576 && Gi(t, Ri, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = qa(t.elementType), t.type = e, typeof e == "function") Ti(e) ? (r = gc(e, r), t.tag = 1, t = Vc(null, t, e, r, n)) : (t.tag = 0, t = zc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === te) {
								t.tag = 11, t = kc(null, t, e, r, n);
								break a;
							}
							if (a === ie) {
								t.tag = 14, t = Ac(null, t, e, r, n);
								break a;
							}
							if (a === j) {
								t.tag = 10, t.type = e, t = nl(null, t, n);
								break a;
							}
						}
						throw t = he(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return zc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = gc(r, t.pendingProps), Vc(e, t, r, a, n);
			case 3:
				a: {
					if (De(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, so(e, t), ho(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, ua(t, Ca, r), r !== o.cache && pa(t, [Ca], n, !0), mo(), r = s.element, o.isDehydrated) {
						if (o = {
							element: r,
							isDehydrated: !1,
							cache: s.cache
						}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
							t = Hc(e, t, r, n);
							break a;
						}
						if (r !== a) {
							a = Pi(Error(i(424)), t), oa(a), t = Hc(e, t, r, n);
							break a;
						}
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (Xi = lm(e.firstChild), Yi = t, J = !0, Zi = null, Qi = !0, n = io(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 134221824, n = n.sibling;
					} else {
						if (ia(), r === a) {
							t = rl(e, t, n);
							break a;
						}
						Oc(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return Rc(e, t), e === null ? (n = Nm(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : J || (t.stateNode = fp(t.type, t.pendingProps, Te.current, t)) : t.memoizedState = Nm(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return ke(t), e === null && J && (r = t.stateNode = hm(t.type, t.pendingProps, Te.current), Yi = t, Qi = !0, a = Xi, Sp(t.type) ? (um = a, Xi = lm(r.firstChild)) : Xi = a), Oc(e, t, t.pendingProps.children, n), Rc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && J && ((a = r = Xi) && (r = rm(r, t.type, t.pendingProps, Qi), r === null ? a = !1 : (t.stateNode = r, Yi = t, Xi = lm(r.firstChild), Qi = !1, a = !0)), a || ea(t)), ke(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, pp(a, o) ? r = null : s !== null && pp(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = Ko(e, t, Yo, null, null, n), sh._currentValue = a), Rc(e, t), Oc(e, t, r, n), t.child;
			case 6: return e === null && J && ((e = n = Xi) && (n = im(n, t.pendingProps, Qi), n === null ? e = !1 : (t.stateNode = n, Yi = t, Xi = null, e = !0)), e || ea(t)), null;
			case 13: return Kc(e, t, n);
			case 4: return De(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = ro(t, null, r, n) : Oc(e, t, r, n), t.child;
			case 11: return kc(e, t, t.type, t.pendingProps, n);
			case 7: return r = t.pendingProps, Rc(e, t), Oc(e, t, r, n), t.child;
			case 8: return Oc(e, t, t.pendingProps.children, n), t.child;
			case 12: return Oc(e, t, t.pendingProps.children, n), t.child;
			case 10: return nl(e, t, n);
			case 9: return a = t.type._context, r = t.pendingProps.children, ga(t), a = _a(a), r = r(a), t.flags |= 1, Oc(e, t, r, n), t.child;
			case 14: return Ac(e, t, t.type, t.pendingProps, n);
			case 15: return jc(e, t, t.type, t.pendingProps, n);
			case 19: return tl(e, t, n);
			case 31: return Lc(e, t, n);
			case 22: return Mc(e, t, n, t.pendingProps);
			case 24: return ga(t), r = _a(Ca), e === null ? (a = Ra(), a === null && (a = Xu, o = wa(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, oo(t), ua(t, Ca, a)) : ((e.lanes & n) !== 0 && (so(e, t), ho(t, null, null, n), mo()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, ua(t, Ca, r), r !== a.cache && pa(t, [Ca], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), ua(t, Ca, r))), Oc(e, t, t.pendingProps.children, n), t.child;
			case 30: return t.stateNode === null && (t.stateNode = {
				autoName: null,
				paired: null,
				clones: null,
				ref: null
			}), r = t.pendingProps, r.name != null && r.name !== "auto" ? t.flags |= e === null ? 18882560 : 18874368 : J && Ki(t), e !== null && e.memoizedProps.name !== r.name ? t.flags |= 4194816 : Rc(e, t), Oc(e, t, r.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function sl(e) {
		e.flags |= 4;
	}
	function cl(e, t, n, r, i) {
		var a;
		if ((a = !!(e.mode & 32)) && (a = n === null ? Jm(t, r) : Jm(t, r) && (r.src !== n.src || r.srcSet !== n.srcSet)), a) {
			if (e.flags |= 16777216, (i & 335544128) === i) {
				if (e.stateNode.complete) e.flags |= 8192;
				else if (Vd()) e.flags |= 8192;
				else throw Ja = Wa, Ha;
			}
		} else e.flags &= -16777217;
	}
	function ll(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Ym(t)) {
			if (Vd()) e.flags |= 8192;
			else throw Ja = Wa, Ha;
		}
	}
	function ul(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : dt(), e.lanes |= t, cd |= t);
	}
	function dl(e, t) {
		if (!J) switch (e.tailMode) {
			case "visible": break;
			case "collapsed":
				for (var n = e.tail, r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
				r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
				break;
			default:
				for (t = e.tail, n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
				n === null ? e.tail = null : n.sibling = null;
		}
	}
	function fl(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 1206910976, r |= i.flags & 1206910976, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function pl(e, t, n) {
		var r = t.pendingProps;
		switch (qi(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return fl(t), null;
			case 1: return fl(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), da(Ca), Oe(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (ra(t) ? sl(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, aa())), fl(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (sl(t), o === null ? (fl(t), cl(t, a, null, r, n)) : (fl(t), ll(t, o))) : o ? o === e.memoizedState ? (fl(t), t.flags &= -16777217) : (sl(t), fl(t), ll(t, o)) : (e = e.memoizedProps, e !== r && sl(t), fl(t), cl(t, a, e, r, n)), null;
			case 27:
				if (Ae(t), n = Te.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && sl(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return fl(t), t.subtreeFlags &= -33554433, null;
					}
					e = Ce.current, ra(t) ? ta(t, e) : (e = hm(a, r, n), t.stateNode = e, sl(t));
				}
				return fl(t), t.subtreeFlags &= -33554433, null;
			case 5:
				if (Ae(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && sl(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return fl(t), t.subtreeFlags &= -33554433, null;
					}
					if (o = Ce.current, ra(t)) ta(t, o);
					else {
						var s = lp(Te.current);
						switch (o) {
							case 1:
								o = s.createElementNS("http://www.w3.org/2000/svg", a);
								break;
							case 2:
								o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
								break;
							default: switch (a) {
								case "svg":
									o = s.createElementNS("http://www.w3.org/2000/svg", a);
									break;
								case "math":
									o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
									break;
								case "script":
									o = s.createElement("div"), o.innerHTML = "<script><\/script>", o = o.removeChild(o.firstChild);
									break;
								case "select":
									o = typeof r.is == "string" ? s.createElement("select", { is: r.is }) : s.createElement("select"), r.multiple ? o.multiple = !0 : r.size && (o.size = r.size);
									break;
								default: o = typeof r.is == "string" ? s.createElement(a, { is: r.is }) : s.createElement(a);
							}
						}
						o[St] = t, o[Ct] = r;
						a: for (s = t.child; s !== null;) {
							if (s.tag === 5 || s.tag === 6) o.appendChild(s.stateNode);
							else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
								s.child.return = s, s = s.child;
								continue;
							}
							if (s === t) break a;
							for (; s.sibling === null;) {
								if (s.return === null || s.return === t) break a;
								s = s.return;
							}
							s.sibling.return = s.return, s = s.sibling;
						}
						t.stateNode = o;
						a: switch (np(o, a, r), a) {
							case "button":
							case "input":
							case "select":
							case "textarea":
								r = !!r.autoFocus;
								break a;
							case "img":
								r = !0;
								break a;
							default: r = !1;
						}
						r && sl(t);
					}
				}
				return fl(t), t.subtreeFlags &= -33554433, cl(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && sl(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = Te.current, ra(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = Yi, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[St] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || $f(e.nodeValue, n)), e || ea(t, !0);
					} else e = lp(e).createTextNode(r), e[St] = t, t.stateNode = e;
				}
				return fl(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = ra(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[St] = t;
						} else ia(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						fl(t), e = !1;
					} else n = aa(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (ko(t), t) : (ko(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return fl(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = ra(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[St] = t;
						} else ia(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						fl(t), a = !1;
					} else a = aa(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (ko(t), t) : (ko(t), null);
				}
				return ko(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), ul(t, t.updateQueue), fl(t), null);
			case 4: return Oe(), e === null && Uf(t.stateNode.containerInfo), t.flags |= 67108864, fl(t), null;
			case 10: return da(t.type), fl(t), null;
			case 19:
				if (Mo(t), r = t.memoizedState, r === null) return fl(t), null;
				if (a = !!(t.flags & 128), o = r.rendering, o === null) {
					if (a) dl(r, !1);
					else {
						if (rd !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
							if (o = No(e), o !== null) {
								for (t.flags |= 128, dl(r, !1), e = o.updateQueue, t.updateQueue = e, ul(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) Di(n, e), n = n.sibling;
								return jo(t, Ao.current & 1 | 2), J && Wi(t, r.treeForkCount), t.child;
							}
							e = e.sibling;
						}
						r.tail !== null && Ue() > md && (t.flags |= 128, a = !0, dl(r, !1), t.lanes = 4194304);
					}
				} else {
					if (!a) {
						if (e = No(o), e !== null) {
							if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, ul(t, e), dl(r, !0), r.tail === null && r.tailMode !== "collapsed" && r.tailMode !== "visible" && !o.alternate && !J) return fl(t), null;
						} else 2 * Ue() - r.renderingStartTime > md && n !== 536870912 && (t.flags |= 128, a = !0, dl(r, !1), t.lanes = 4194304);
					}
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				if (r.tail !== null) {
					e = r.tail;
					a: {
						for (n = e; n !== null;) {
							if (n.alternate !== null) {
								n = !1;
								break a;
							}
							n = n.sibling;
						}
						n = !0;
					}
					return r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Ue(), e.sibling = null, o = Ao.current, o = a ? o & 1 | 2 : o & 1, r.tailMode === "visible" || r.tailMode === "collapsed" || !n || J ? jo(t, o) : (n = o, Se(Co, t), Se(Ao, n), wo === null && (wo = t)), J && Wi(t, r.treeForkCount), e;
				}
				return fl(t), null;
			case 22:
			case 23: return ko(t), So(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (fl(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : fl(t), n = t.updateQueue, n !== null && ul(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && xe(La), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), da(Ca), fl(t), null;
			case 25: return null;
			case 30: return t.flags |= 33554432, fl(t), null;
		}
		throw Error(i(156, t.tag));
	}
	function ml(e, t) {
		switch (qi(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return da(Ca), Oe(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return Ae(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (ko(t), t.alternate === null) throw Error(i(340));
					ia();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (ko(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					ia();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return Mo(t), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, e = t.memoizedState, e !== null && (e.rendering = null, e.tail = null), t.flags |= 4, t) : null;
			case 4: return Oe(), null;
			case 10: return da(t.type), null;
			case 22:
			case 23: return ko(t), So(), e !== null && xe(La), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return da(Ca), null;
			case 25: return null;
			default: return null;
		}
	}
	function hl(e, t) {
		switch (qi(t), t.tag) {
			case 3:
				da(Ca), Oe();
				break;
			case 26:
			case 27:
			case 5:
				Ae(t);
				break;
			case 4:
				Oe();
				break;
			case 31:
				t.memoizedState !== null && ko(t);
				break;
			case 13:
				ko(t);
				break;
			case 19:
				Mo(t);
				break;
			case 10:
				da(t.type);
				break;
			case 22:
			case 23:
				ko(t), So(), e !== null && xe(La);
				break;
			case 24: da(Ca);
		}
	}
	function gl(e, t) {
		try {
			var n = t.updateQueue, r = n === null ? null : n.lastEffect;
			if (r !== null) {
				var i = r.next;
				n = i;
				do {
					if ((n.tag & e) === e) {
						r = void 0;
						var a = n.create, o = n.inst;
						r = a(), o.destroy = r;
					}
					n = n.next;
				} while (n !== i);
			}
		} catch (e) {
			ff(t, t.return, e);
		}
	}
	function _l(e, t, n) {
		try {
			var r = t.updateQueue, i = r === null ? null : r.lastEffect;
			if (i !== null) {
				var a = i.next;
				r = a;
				do {
					if ((r.tag & e) === e) {
						var o = r.inst, s = o.destroy;
						if (s !== void 0) {
							o.destroy = void 0, i = t;
							var c = n, l = s;
							try {
								l();
							} catch (e) {
								ff(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			ff(t, t.return, e);
		}
	}
	function vl(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				_o(t, n);
			} catch (t) {
				ff(e, e.return, t);
			}
		}
	}
	function yl(e, t, n) {
		n.props = gc(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			ff(e, t, n);
		}
	}
	function bl(e, t) {
		try {
			var n = e.ref;
			if (n !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var r = e.stateNode;
						break;
					case 30:
						var i = e.stateNode, a = li(e.memoizedProps, i);
						(i.ref === null || i.ref.name !== a) && (i.ref = Pp(a)), r = i.ref;
						break;
					case 7:
						if (e.stateNode === null) {
							var o = new Fp(e);
							f(e.child, !1, Qp, o, void 0, void 0), e.stateNode = o;
						}
						r = e.stateNode;
						break;
					default: r = e.stateNode;
				}
				typeof n == "function" ? e.refCleanup = n(r) : n.current = r;
			}
		} catch (n) {
			ff(e, t, n);
		}
	}
	function xl(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) {
			if (typeof r == "function") try {
				r();
			} catch (n) {
				ff(e, t, n);
			} finally {
				e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
			}
			else if (typeof n == "function") try {
				n(null);
			} catch (n) {
				ff(e, t, n);
			}
			else n.current = null;
		}
	}
	function Sl(e, t) {
		if ((e.tag === 5 || e.tag === 27 || e.tag === 6) && e.alternate === null && t !== null) for (var n = 0; n < t.length; n++) em(e.stateNode, t[n]);
	}
	function Cl(e) {
		for (var t = e.return; t !== null && (El(t) && em(e.stateNode, t.stateNode), !Tl(t));) t = t.return;
	}
	function wl(e) {
		for (var t = e.return; t !== null && (El(t) && tm(e.stateNode, t.stateNode), !Tl(t));) t = t.return;
	}
	function Tl(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 27;
	}
	function El(e) {
		return e && e.tag === 7 && e.stateNode !== null;
	}
	function Dl(e) {
		var t = e.type, n = e.memoizedProps, r = e.stateNode;
		try {
			a: switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && r.focus();
					break a;
				case "img": n.src ? r.src = n.src : n.srcSet && (r.srcset = n.srcSet);
			}
		} catch (t) {
			ff(e, e.return, t);
		}
	}
	function Ol(e, t, n) {
		try {
			var r = e.stateNode;
			ip(r, e.type, n, t), r[Ct] = t;
		} catch (t) {
			ff(e, e.return, t);
		}
	}
	function kl(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Sp(e.type) || e.tag === 4;
	}
	function Al(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || kl(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && Sp(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function jl(e, t, n, r) {
		var i = e.tag;
		if (i === 5 || i === 6) i = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(i, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(i), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = hn)), Sl(e, r), V = !0;
		else if (i !== 4 && (i === 27 && (Sl(e, r), r = null, Sp(e.type) && (n = e.stateNode, t = null)), e = e.child, e !== null)) for (jl(e, t, n, r), e = e.sibling; e !== null;) jl(e, t, n, r), e = e.sibling;
	}
	function Ml(e, t, n, r) {
		var i = e.tag;
		if (i === 5 || i === 6) i = e.stateNode, t ? n.insertBefore(i, t) : n.appendChild(i), Sl(e, r), V = !0;
		else if (i !== 4 && (i === 27 && (Sl(e, r), r = null, Sp(e.type) && (n = e.stateNode)), e = e.child, e !== null)) for (Ml(e, t, n, r), e = e.sibling; e !== null;) Ml(e, t, n, r), e = e.sibling;
	}
	function Nl(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			np(t, r, n), t[St] = e, t[Ct] = n;
		} catch (t) {
			ff(e, e.return, t);
		}
	}
	var Pl = !1, Fl = null;
	function Il(e) {
		(e.tag === 30 || e.subtreeFlags & 33554432) && (Pl = !0);
	}
	var Ll = null;
	function Rl() {
		var e = Ll;
		return Ll = null, e;
	}
	var zl = 0;
	function Bl(e, t, n, r, i) {
		return zl = 0, Vl(e.child, t, n, r, i);
	}
	function Vl(e, t, n, r, i) {
		for (var a = !1; e !== null;) {
			if (e.tag === 5) {
				var o = e.stateNode;
				if (r !== null) {
					var s = Op(o);
					r.push(s), s.view && (a = !0);
				} else a || Op(o).view && (a = !0);
				Pl = !0, Tp(o, zl === 0 ? t : t + "_" + zl, n), zl++;
			} else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && i || Vl(e.child, t, n, r, i) && (a = !0));
			e = e.sibling;
		}
		return a;
	}
	function Hl(e, t) {
		for (; e !== null;) e.tag === 5 ? Ep(e.stateNode, e.memoizedProps) : (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && t || Hl(e.child, t)), e = e.sibling;
	}
	function Ul(e) {
		if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
			if ((e.tag !== 22 || e.memoizedState === null) && (Ul(e), e.tag === 30 && e.flags & 18874368 && e.stateNode.paired)) {
				var t = e.memoizedProps;
				if (t.name == null || t.name === "auto") throw Error(i(544));
				var n = t.name;
				t = di(t.default, t.share), t !== "none" && (Bl(e, n, t, null, !1) || Hl(e.child, !1));
			}
			e = e.sibling;
		}
	}
	function Wl(e, t) {
		if (e.tag === 30) {
			var n = e.stateNode, r = e.memoizedProps, i = li(r, n), a = di(r.default, n.paired ? r.share : r.enter);
			a === "none" ? Ul(e) : Bl(e, i, a, null, !1) ? (Ul(e), n.paired || t || jd(e, r.onEnter)) : Hl(e.child, !1);
		} else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) Wl(e, t), e = e.sibling;
		else Ul(e);
	}
	function Gl(e) {
		if (Fl !== null && Fl.size !== 0) {
			var t = Fl;
			if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
				if (e.tag !== 22 || e.memoizedState === null) {
					if (e.tag === 30 && e.flags & 18874368) {
						var n = e.memoizedProps, r = n.name;
						if (r != null && r !== "auto") {
							var i = t.get(r);
							if (i !== void 0) {
								var a = di(n.default, n.share);
								if (a !== "none" && (Bl(e, r, a, null, !1) ? (a = e.stateNode, i.paired = a, a.paired = i, jd(e, n.onShare)) : Hl(e.child, !1)), t.delete(r), t.size === 0) break;
							}
						}
					}
					Gl(e);
				}
				e = e.sibling;
			}
		}
	}
	function Kl(e) {
		if (e.tag === 30) {
			var t = e.memoizedProps, n = li(t, e.stateNode), r = Fl === null ? void 0 : Fl.get(n), i = di(t.default, r === void 0 ? t.exit : t.share);
			i !== "none" && (Bl(e, n, i, null, !1) ? r === void 0 ? jd(e, t.onExit) : (i = e.stateNode, r.paired = i, i.paired = r, Fl.delete(n), jd(e, t.onShare)) : Hl(e.child, !1)), Fl !== null && Gl(e);
		} else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) Kl(e), e = e.sibling;
		else Fl !== null && Gl(e);
	}
	function ql(e) {
		for (e = e.child; e !== null;) {
			if (e.tag === 30) {
				var t = e.memoizedProps, n = li(t, e.stateNode);
				t = di(t.default, t.update), e.flags &= -5, t !== "none" && Bl(e, n, t, e.memoizedState = [], !1);
			} else e.subtreeFlags & 33554432 && ql(e);
			e = e.sibling;
		}
	}
	function Jl(e) {
		if (e.subtreeFlags & 18874368) for (e = e.child; e !== null;) {
			if (e.tag !== 22 || e.memoizedState === null) {
				if (e.tag === 30 && e.flags & 18874368) {
					var t = e.stateNode;
					t.paired !== null && (t.paired = null, Hl(e.child, !1));
				}
				Jl(e);
			}
			e = e.sibling;
		}
	}
	function Yl(e) {
		if (e.tag === 30) e.stateNode.paired = null, Hl(e.child, !1), Jl(e);
		else if (e.subtreeFlags & 33554432) for (e = e.child; e !== null;) Yl(e), e = e.sibling;
		else Jl(e);
	}
	function Xl(e) {
		for (e = e.child; e !== null;) e.tag === 30 ? Hl(e.child, !1) : e.subtreeFlags & 33554432 && Xl(e), e = e.sibling;
	}
	function Zl(e, t, n, r, i, a, o) {
		for (var s = !1; t !== null;) {
			if (t.tag === 5) {
				var c = t.stateNode;
				if (a !== null && zl < a.length) {
					var l = a[zl], u = Op(c);
					(l.view || u.view) && (s = !0);
					var d;
					if (d = !(e.flags & 4)) {
						if (u.clip) d = !0;
						else {
							d = l.rect;
							var f = u.rect;
							d = d.y !== f.y || d.x !== f.x || d.height !== f.height || d.width !== f.width;
						}
					}
					d && (e.flags |= 4), u.abs ? u = !l.abs : (l = l.rect, u = u.rect, u = l.height !== u.height || l.width !== u.width), u && (e.flags |= 32);
				} else e.flags |= 32;
				e.flags & 4 && Tp(c, zl === 0 ? n : n + "_" + zl, i), s && e.flags & 4 || (Ll === null && (Ll = []), Ll.push(c, zl === 0 ? r : r + "_" + zl, t.memoizedProps)), zl++;
			} else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && o ? e.flags |= t.flags & 32 : Zl(e, t.child, n, r, i, a, o) && (s = !0));
			t = t.sibling;
		}
		return s;
	}
	function Ql(e, t) {
		for (e = e.child; e !== null;) {
			if (e.tag === 30) {
				var n = e.memoizedProps, r = e.stateNode, i = li(n, r), a = di(n.default, n.update);
				if (t) {
					r = r.clones;
					var o = r === null ? null : r.map(kp);
				} else o = e.memoizedState, e.memoizedState = null;
				r = e;
				var s = e.child;
				zl = 0, i = Zl(r, s, i, i, a, o, !1), e.flags & 4 && i && (t || jd(e, n.onUpdate));
			} else e.subtreeFlags & 33554432 && Ql(e, t);
			e = e.sibling;
		}
	}
	var $l = !1, eu = !1, tu = !1, nu = !1, ru = typeof WeakSet == "function" ? WeakSet : Set, iu = null, au = !1, ou = !1, su = !1, cu = !1;
	function lu(e, t, n) {
		if (e = e.containerInfo, sp = gh, e = Br(e), Vr(e)) {
			if ("selectionStart" in e) var r = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else a: {
				r = (r = e.ownerDocument) && r.defaultView || window;
				var i = r.getSelection && r.getSelection();
				if (i && i.rangeCount !== 0) {
					r = i.anchorNode;
					var a = i.anchorOffset, o = i.focusNode;
					i = i.focusOffset;
					try {
						r.nodeType, o.nodeType;
					} catch {
						r = null;
						break a;
					}
					var s = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== r || a !== 0 && f.nodeType !== 3 || (c = s + a), f !== o || i !== 0 && f.nodeType !== 3 || (l = s + i), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === r && ++u === a && (c = s), p === o && ++d === i && (l = s), (m = f.nextSibling) !== null) break;
							f = p, p = f.parentNode;
						}
						f = m;
					}
					r = c === -1 || l === -1 ? null : {
						start: c,
						end: l
					};
				} else r = null;
			}
			r ||= {
				start: 0,
				end: 0
			};
		} else r = null;
		for (cp = {
			focusedElem: e,
			selectionRange: r
		}, gh = !1, n = (n & 335544064) === n, iu = t, t = n ? 9270 : 1024; iu !== null;) {
			if (e = iu, n && (r = e.deletions, r !== null)) for (a = 0; a < r.length; a++) n && Kl(r[a]);
			if (e.alternate === null && e.flags & 2) n && Il(e), uu(n);
			else {
				if (e.tag === 22) {
					if (r = e.alternate, e.memoizedState !== null) {
						r !== null && r.memoizedState === null && n && Kl(r), uu(n);
						continue;
					}
					if (r !== null && r.memoizedState !== null) {
						n && Il(e), uu(n);
						continue;
					}
				}
				r = e.child, (e.subtreeFlags & t) !== 0 && r !== null ? (r.return = e, iu = r) : (n && ql(e), uu(n));
			}
		}
		Fl = null;
	}
	function uu(e) {
		for (; iu !== null;) {
			var t = iu, n = e, r = t.alternate, a = t.flags;
			switch (t.tag) {
				case 0:
				case 11:
				case 15: break;
				case 1:
					if (a & 1024 && r !== null) {
						n = void 0, a = r.memoizedProps, r = r.memoizedState;
						var o = t.stateNode;
						try {
							var s = gc(t.type, a);
							n = o.getSnapshotBeforeUpdate(s, r), o.__reactInternalSnapshotBeforeUpdate = n;
						} catch (e) {
							ff(t, t.return, e);
						}
					}
					break;
				case 3:
					if (a & 1024) {
						if (r = t.stateNode.containerInfo, n = r.nodeType, n === 9) nm(r);
						else if (n === 1) switch (r.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								nm(r);
								break;
							default: r.textContent = "";
						}
					}
					break;
				case 5:
				case 26:
				case 27:
				case 6:
				case 4:
				case 17: break;
				case 30:
					n && r !== null && (n = li(r.memoizedProps, r.stateNode), a = t.memoizedProps, a = di(a.default, a.update), a !== "none" && Bl(r, n, a, r.memoizedState = [], !0));
					break;
				default: if (a & 1024) throw Error(i(163));
			}
			if (r = t.sibling, r !== null) {
				r.return = t.return, iu = r;
				break;
			}
			iu = t.return;
		}
	}
	function du(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				ju(e, n), r & 4 && gl(5, n);
				break;
			case 1:
				if (ju(e, n), r & 4) {
					if (e = n.stateNode, t === null) try {
						e.componentDidMount();
					} catch (e) {
						ff(n, n.return, e);
					}
					else {
						var i = gc(n.type, t.memoizedProps);
						t = t.memoizedState;
						try {
							e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
						} catch (e) {
							ff(n, n.return, e);
						}
					}
				}
				r & 64 && vl(n), r & 512 && bl(n, n.return);
				break;
			case 3:
				if (ju(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						_o(e, t);
					} catch (e) {
						ff(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && Nl(n);
			case 26:
			case 5:
				ju(e, n), t === null && r & 4 && Dl(n), r & 512 && bl(n, n.return);
				break;
			case 12:
				ju(e, n);
				break;
			case 31:
				ju(e, n), r & 4 && bu(e, n);
				break;
			case 13:
				ju(e, n), r & 4 && xu(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = gf.bind(null, n), cm(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || $l, !r) {
					var a = t !== null && t.memoizedState !== null || eu;
					t = $l, i = eu, $l = r, (eu = a) && !i ? (r = 2, n.subtreeFlags & 8772 && (r |= 1), Nu(e, n, r)) : ju(e, n), $l = t, eu = i;
				}
				break;
			case 30:
				ju(e, n), r & 512 && bl(n, n.return);
				break;
			case 7: r & 512 && bl(n, n.return);
			default: ju(e, n);
		}
	}
	function fu(e, t) {
		for (e = e.child; e !== null;) pu(e, t), e = e.sibling;
	}
	function pu(e, t) {
		switch (e.tag) {
			case 5:
			case 26:
				try {
					var n = e.stateNode;
					if (t) {
						var r = n.style;
						typeof r.setProperty == "function" ? r.setProperty("display", "none", "important") : r.display = "none";
					} else {
						var i = e.stateNode, a = e.memoizedProps.style, o = a != null && a.hasOwnProperty("display") ? a.display : null;
						i.style.display = o == null || typeof o == "boolean" ? "" : ("" + o).trim();
					}
				} catch (t) {
					ff(e, e.return, t);
				}
				mu(e, t);
				break;
			case 6:
				try {
					e.stateNode.nodeValue = t ? "" : e.memoizedProps, V = !0;
				} catch (t) {
					ff(e, e.return, t);
				}
				break;
			case 18:
				try {
					var s = e.stateNode;
					t ? wp(s, !0) : wp(e.stateNode, !1);
				} catch (t) {
					ff(e, e.return, t);
				}
				break;
			case 22:
			case 23:
				e.memoizedState === null && fu(e, t);
				break;
			default: fu(e, t);
		}
	}
	function mu(e, t) {
		if (e.subtreeFlags & 67108864) for (e = e.child; e !== null;) {
			a: {
				var n = e, r = t;
				switch (n.tag) {
					case 4:
						pu(n, r);
						break a;
					case 22:
						n.memoizedState === null && mu(n, r);
						break a;
					default: mu(n, r);
				}
			}
			e = e.sibling;
		}
	}
	function hu(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, hu(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && jt(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var gu = null, _u = !1;
	function vu(e, t, n) {
		for (n = n.child; n !== null;) yu(e, t, n), n = n.sibling;
	}
	function yu(e, t, n) {
		if (Qe && typeof Qe.onCommitFiberUnmount == "function") try {
			Qe.onCommitFiberUnmount(I, n);
		} catch {}
		switch (n.tag) {
			case 26:
				eu || xl(n, t), vu(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && !eu && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				eu || xl(n, t), wl(n);
				var r = gu, i = _u;
				Sp(n.type) && (gu = n.stateNode, _u = !1), vu(e, t, n), gm(n.stateNode, n.type, n.memoizedProps), gu = r, _u = i;
				break;
			case 5: eu || xl(n, t), wl(n);
			case 6:
				if (n.tag === 6 && wl(n), r = gu, i = _u, gu = null, vu(e, t, n), gu = r, _u = i, gu !== null) {
					if (_u) try {
						(gu.nodeType === 9 ? gu.body : gu.nodeName === "HTML" ? gu.ownerDocument.body : gu).removeChild(n.stateNode), V = !0;
					} catch (e) {
						ff(n, t, e);
					}
					else try {
						gu.removeChild(n.stateNode), V = !0;
					} catch (e) {
						ff(n, t, e);
					}
				}
				break;
			case 18:
				gu !== null && (_u ? (e = gu, Cp(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Hh(e)) : Cp(gu, n.stateNode));
				break;
			case 4:
				r = gu, i = _u, gu = n.stateNode.containerInfo, _u = !0, vu(e, t, n), gu = r, _u = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				_l(2, n, t), eu || _l(4, n, t), vu(e, t, n);
				break;
			case 1:
				eu || (xl(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && yl(n, t, r)), vu(e, t, n);
				break;
			case 21:
				vu(e, t, n);
				break;
			case 22:
				eu = (r = eu) || n.memoizedState !== null, vu(e, t, n), eu = r;
				break;
			case 30:
				xl(n, t), vu(e, t, n);
				break;
			case 7:
				eu || xl(n, t), vu(e, t, n);
				break;
			default: vu(e, t, n);
		}
	}
	function bu(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Hh(e);
			} catch (e) {
				ff(t, t.return, e);
			}
		}
	}
	function xu(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Hh(e);
		} catch (e) {
			ff(t, t.return, e);
		}
	}
	function Su(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new ru()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new ru()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function Cu(e, t) {
		var n = Su(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = _f.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function wu(e, t, n) {
		var r = t.deletions;
		if (r !== null) for (var a = 0; a < r.length; a++) {
			var o = r[a], s = e, c = t, l = c;
			a: for (; l !== null;) {
				switch (l.tag) {
					case 27:
						if (Sp(l.type)) {
							gu = l.stateNode, _u = !1;
							break a;
						}
						break;
					case 5:
						gu = l.stateNode, _u = !1;
						break a;
					case 3:
					case 4:
						gu = l.stateNode.containerInfo, _u = !0;
						break a;
				}
				l = l.return;
			}
			if (gu === null) throw Error(i(160));
			yu(s, c, o), gu = null, _u = !1, s = o.alternate, s !== null && (s.return = null), o.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) Eu(t, e, n), t = t.sibling;
	}
	var Tu = null;
	function Eu(e, t, n) {
		var r = e.alternate, a = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				if (a & 4 && (r = e.updateQueue, r = r === null ? null : r.events, r !== null)) for (var o = 0; o < r.length; o++) {
					var s = r[o];
					s.ref.impl = s.nextImpl;
				}
				wu(t, e, n), Du(e), a & 4 && (_l(3, e, e.return), gl(3, e), _l(5, e, e.return));
				break;
			case 1:
				wu(t, e, n), Du(e), a & 512 && (eu || r === null || xl(r, r.return)), a & 64 && $l && (e = e.updateQueue, e !== null && (t = e.callbacks, t !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? t : n.concat(t))));
				break;
			case 26:
				if (o = Tu, wu(t, e, n), Du(e), a & 512 && (eu || r === null || xl(r, r.return)), a & 4) {
					if (a = r === null ? null : r.memoizedState, n = e.memoizedState, r === null) {
						if (n === null) {
							if (e.stateNode === null) {
								if ($l) e.stateNode = fp(e.type, e.memoizedProps, t.containerInfo, e);
								else {
									a: {
										t = e.type, n = e.memoizedProps, a = o.ownerDocument || o;
										b: switch (t) {
											case "title":
												r = a.getElementsByTagName("title")[0], (!r || r[kt] || r[St] || r.namespaceURI === "http://www.w3.org/2000/svg" || r.hasAttribute("itemprop")) && (r = a.createElement(t), a.head.insertBefore(r, a.querySelector("head > title"))), np(r, t, n), r[St] = e, It(r), t = r;
												break a;
											case "link":
												if (o = Gm("link", "href", a).get(t + (n.href || ""))) {
													for (s = 0; s < o.length; s++) if (r = o[s], r.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && r.getAttribute("rel") === (n.rel == null ? null : n.rel) && r.getAttribute("title") === (n.title == null ? null : n.title) && r.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
														o.splice(s, 1);
														break b;
													}
												}
												r = a.createElement(t), np(r, t, n), a.head.appendChild(r);
												break;
											case "meta":
												if (o = Gm("meta", "content", a).get(t + (n.content || ""))) {
													for (s = 0; s < o.length; s++) if (r = o[s], r.getAttribute("content") === (n.content == null ? null : "" + n.content) && r.getAttribute("name") === (n.name == null ? null : n.name) && r.getAttribute("property") === (n.property == null ? null : n.property) && r.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && r.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
														o.splice(s, 1);
														break b;
													}
												}
												r = a.createElement(t), np(r, t, n), a.head.appendChild(r);
												break;
											default: throw Error(i(468, t));
										}
										r[St] = e, It(r), t = r;
									}
									e.stateNode = t;
								}
							} else $l || Km(o, e.type, e.stateNode);
						} else e.stateNode = Bm(o, n, e.memoizedProps);
					} else a === n ? n === null && e.stateNode !== null && Ol(e, e.memoizedProps, r.memoizedProps) : (a === null ? (t = r.stateNode, t === null || eu || t.parentNode.removeChild(t)) : a.count--, n === null ? $l || Km(o, e.type, e.stateNode) : Bm(o, n, e.memoizedProps));
				}
				break;
			case 27:
				wu(t, e, n), Du(e), a & 512 && (eu || r === null || xl(r, r.return)), r !== null && a & 4 && Ol(e, e.memoizedProps, r.memoizedProps);
				break;
			case 5:
				if (o = tu, tu = !1, wu(t, e, n), tu = o, Du(e), a & 512 && (eu || r === null || xl(r, r.return)), e.flags & 32) {
					t = e.stateNode;
					try {
						sn(t, ""), V = !0;
					} catch (t) {
						ff(e, e.return, t);
					}
				}
				a & 4 && e.stateNode != null && (t = e.memoizedProps, Ol(e, t, r === null ? t : r.memoizedProps)), a & 1024 && (nu = !0);
				break;
			case 6:
				if (wu(t, e, n), Du(e), a & 4) {
					if (e.stateNode === null) throw Error(i(162));
					t = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = t, V = !0;
					} catch (t) {
						ff(e, e.return, t);
					}
				}
				break;
			case 3:
				if (V = !1, Wm = null, o = Tu, Tu = bm(t.containerInfo), wu(t, e, n), Tu = o, Du(e), a & 4 && r !== null && r.memoizedState.isDehydrated) try {
					Hh(t.containerInfo);
				} catch (t) {
					ff(e, e.return, t);
				}
				nu && (nu = !1, Ou(e)), V = !1;
				break;
			case 4:
				a = tu, tu = $l, r = Wt(), o = Tu, Tu = bm(e.stateNode.containerInfo), wu(t, e, n), Du(e), Tu = o, V && ou && (su = !0), V = r, tu = a;
				break;
			case 12:
				wu(t, e, n), Du(e);
				break;
			case 31:
				wu(t, e, n), Du(e), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Cu(e, t)));
				break;
			case 13:
				wu(t, e, n), Du(e), e.child.flags & 8192 && e.memoizedState !== null != (r !== null && r.memoizedState !== null) && (fd = Ue()), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Cu(e, t)));
				break;
			case 22:
				o = e.memoizedState !== null, s = r !== null && r.memoizedState !== null;
				var c = $l, l = eu, u = tu;
				$l = c || o, tu = u || o, eu = l || s, wu(t, e, n), eu = l, tu = u, $l = c, Du(e), a & 8192 && (t = e.stateNode, t._visibility = o ? t._visibility & -2 : t._visibility | 1, !o || r === null || s || $l || eu || (t = s || eu, n = $l, r = eu, $l = o || $l, eu = t, Mu(e, 2), $l = n, eu = r), !o && tu || fu(e, o)), a & 4 && (t = e.updateQueue, t !== null && (n = t.retryQueue, n !== null && (t.retryQueue = null, Cu(e, n))));
				break;
			case 19:
				wu(t, e, n), Du(e), a & 4 && (t = e.updateQueue, t !== null && (e.updateQueue = null, Cu(e, t)));
				break;
			case 30:
				a & 512 && (eu || r === null || xl(r, r.return)), a = Wt(), o = ou, s = (n & 335544064) === n, c = e.memoizedProps, ou = s && di(c.default, c.update) !== "none", wu(t, e, n), Du(e), s && r !== null && V && (e.flags |= 4), ou = o, V = a;
				break;
			case 21: break;
			case 7: a & 512 && (eu || r === null || xl(r, r.return)), r && r.stateNode !== null && (r.stateNode._fragmentFiber = e);
			default: wu(t, e, n), Du(e);
		}
	}
	function Du(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (kl(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				r = null;
				for (var a = e.return; a !== null;) {
					if (El(a)) {
						var o = a.stateNode;
						r === null ? r = [o] : r.push(o);
					}
					if (Tl(a)) break;
					a = a.return;
				}
				var s = r;
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var c = n.stateNode;
						Ml(e, Al(e), c, s);
						break;
					case 5:
						var l = n.stateNode;
						n.flags & 32 && (sn(l, ""), n.flags &= -33), Ml(e, Al(e), l, s);
						break;
					case 3:
					case 4:
						var u = n.stateNode.containerInfo;
						jl(e, Al(e), u, s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				ff(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function Ou(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			Ou(t), t.tag === 5 && t.flags & 1024 && (t = t.stateNode, gh = !0, t.reset(), gh = !1), e = e.sibling;
		}
	}
	function ku(e, t) {
		if (t.subtreeFlags & 9270) for (t = t.child; t !== null;) Au(t, e), t = t.sibling;
		else Ql(t, !1);
	}
	function Au(e, t) {
		var n = e.alternate;
		if (n === null) Wl(e, !1);
		else switch (e.tag) {
			case 3:
				if (cu = au = !1, Rl(), ku(t, e), !au && !su) {
					if (e = Ll, e !== null) for (var r = 0; r < e.length; r += 3) {
						n = e[r];
						var i = e[r + 1];
						Ep(n, e[r + 2]), n = n.ownerDocument.documentElement, n !== null && n.animate({
							opacity: [0, 0],
							pointerEvents: ["none", "none"]
						}, {
							duration: 0,
							fill: "forwards",
							pseudoElement: "::view-transition-group(" + i + ")"
						});
					}
					e = t.containerInfo, e = e.nodeType === 9 ? e.documentElement : e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "" && (e.style.viewTransitionName = "none", e.animate({
						opacity: [0, 0],
						pointerEvents: ["none", "none"]
					}, {
						duration: 0,
						fill: "forwards",
						pseudoElement: "::view-transition-group(root)"
					}), e.animate({
						width: [0, 0],
						height: [0, 0]
					}, {
						duration: 0,
						fill: "forwards",
						pseudoElement: "::view-transition"
					})), cu = !0;
				}
				Ll = null;
				break;
			case 5:
				ku(t, e);
				break;
			case 4:
				r = au, au = !1, ku(t, e), au && (su = !0), au = r;
				break;
			case 22:
				e.memoizedState === null && (n.memoizedState === null ? ku(t, e) : Wl(e, !1));
				break;
			case 30:
				r = au, i = Rl(), au = !1, ku(t, e), au && (e.flags |= 4);
				var a = e.memoizedProps, o = e.stateNode;
				t = li(a, o), o = li(n.memoizedProps, o);
				var s = di(a.default, a.update);
				s === "none" ? t = !1 : (a = n.memoizedState, n.memoizedState = null, n = e.child, zl = 0, t = Zl(e, n, t, o, s, a, !0), zl !== (a === null ? 0 : a.length) && (e.flags |= 32)), e.flags & 4 && t ? (jd(e, e.memoizedProps.onUpdate), Ll = i) : i !== null && (i.push.apply(i, Ll), Ll = i), au = e.flags & 32 ? !0 : r;
				break;
			default: ku(t, e);
		}
	}
	function ju(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) du(e, t.alternate, t), t = t.sibling;
	}
	function Mu(e, t) {
		for (e = e.child; e !== null;) {
			var n = e, r = t;
			switch (n.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					_l(4, n, n.return), Mu(n, r);
					break;
				case 1:
					xl(n, n.return);
					var i = n.stateNode;
					typeof i.componentWillUnmount == "function" && yl(n, n.return, i), Mu(n, r);
					break;
				case 27: r & 2 && gm(n.stateNode, n.type, n.memoizedProps);
				case 5:
					xl(n, n.return), n.tag !== 5 && n.tag !== 27 || wl(n), Mu(n, r);
					break;
				case 6:
					wl(n);
					break;
				case 26:
					xl(n, n.return), i = n.stateNode, n.memoizedState !== null || i === null || eu || i.parentNode.removeChild(i), Mu(n, r);
					break;
				case 22:
					n.memoizedState === null && Mu(n, r);
					break;
				case 30:
					xl(n, n.return), Mu(n, r);
					break;
				case 7: xl(n, n.return);
				default: Mu(n, r);
			}
			e = e.sibling;
		}
	}
	function Nu(e, t, n) {
		for (n = t.subtreeFlags & 8772 ? n : n & -2, t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags, s = !!(n & 1);
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					Nu(i, a, n), gl(4, a);
					break;
				case 1:
					if (Nu(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						ff(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var c = r.stateNode;
						try {
							var l = i.shared.hiddenCallbacks;
							if (l !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < l.length; i++) go(l[i], c);
						} catch (e) {
							ff(r, r.return, e);
						}
					}
					s && o & 64 && vl(a), bl(a, a.return);
					break;
				case 27: n & 2 && Nl(a);
				case 5:
					a.tag !== 5 && a.tag !== 27 || Cl(a), Nu(i, a, n), s && r === null && o & 4 && Dl(a), bl(a, a.return);
					break;
				case 6:
					Cl(a);
					break;
				case 26:
					c = a.stateNode, a.memoizedState !== null || c === null || $l || Km(bm(c.ownerDocument), a.type, c), Nu(i, a, n), s && r === null && o & 4 && Dl(a), bl(a, a.return);
					break;
				case 12:
					Nu(i, a, n);
					break;
				case 31:
					Nu(i, a, n), s && o & 4 && bu(i, a);
					break;
				case 13:
					Nu(i, a, n), s && o & 4 && xu(i, a);
					break;
				case 22:
					a.memoizedState === null && Nu(i, a, n), bl(a, a.return);
					break;
				case 30:
					Nu(i, a, n), bl(a, a.return);
					break;
				case 7: bl(a, a.return);
				default: Nu(i, a, n);
			}
			t = t.sibling;
		}
	}
	function Pu(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && Ta(n));
	}
	function Fu(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Ta(e));
	}
	function Iu(e, t, n, r) {
		var i = (n & 335544064) === n;
		if (t.subtreeFlags & (i ? 10262 : 10256)) for (t = t.child; t !== null;) Lu(e, t, n, r), t = t.sibling;
		else i && Xl(t);
	}
	function Lu(e, t, n, r) {
		var i = (n & 335544064) === n;
		i && t.alternate === null && t.return !== null && t.return.alternate !== null && Yl(t);
		var a = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				Iu(e, t, n, r), a & 2048 && gl(9, t);
				break;
			case 1:
				Iu(e, t, n, r);
				break;
			case 3:
				Iu(e, t, n, r), i && cu && (e = e.containerInfo, e = e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, e.style.viewTransitionName === "root" && (e.style.viewTransitionName = ""), e = e.ownerDocument.documentElement, e !== null && e.style.viewTransitionName === "none" && (e.style.viewTransitionName = "")), a & 2048 && (a = null, t.alternate !== null && (a = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== a && (t.refCount++, a != null && Ta(a)));
				break;
			case 12:
				if (a & 2048) {
					Iu(e, t, n, r), a = t.stateNode;
					try {
						var o = t.memoizedProps, s = o.id, c = o.onPostCommit;
						typeof c == "function" && c(s, t.alternate === null ? "mount" : "update", a.passiveEffectDuration, -0);
					} catch (e) {
						ff(t, t.return, e);
					}
				} else Iu(e, t, n, r);
				break;
			case 31:
				Iu(e, t, n, r);
				break;
			case 13:
				Iu(e, t, n, r);
				break;
			case 23: break;
			case 22:
				o = t.stateNode, s = t.alternate, t.memoizedState === null ? (i && s !== null && s.memoizedState !== null && Yl(t), o._visibility & 2 ? Iu(e, t, n, r) : (o._visibility |= 2, Ru(e, t, n, r, !!(t.subtreeFlags & 10256) || !1))) : (i && s !== null && s.memoizedState === null && Yl(s), o._visibility & 2 ? Iu(e, t, n, r) : zu(e, t)), a & 2048 && Pu(s, t);
				break;
			case 24:
				Iu(e, t, n, r), a & 2048 && Fu(t.alternate, t);
				break;
			case 30:
				i && (a = t.alternate, a !== null && (Hl(a.child, !0), Hl(t.child, !0))), Iu(e, t, n, r);
				break;
			default: Iu(e, t, n, r);
		}
	}
	function Ru(e, t, n, r, i) {
		for (i &&= !!(t.subtreeFlags & 10256) || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					Ru(a, o, s, c, i), gl(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, Ru(a, o, s, c, i)) : u._visibility & 2 ? Ru(a, o, s, c, i) : zu(a, o), i && l & 2048 && Pu(o.alternate, o);
					break;
				case 24:
					Ru(a, o, s, c, i), i && l & 2048 && Fu(o.alternate, o);
					break;
				default: Ru(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function zu(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					zu(n, r), i & 2048 && Pu(r.alternate, r);
					break;
				case 24:
					zu(n, r), i & 2048 && Fu(r.alternate, r);
					break;
				default: zu(n, r);
			}
			t = t.sibling;
		}
	}
	var Bu = 8192;
	function Vu(e, t, n) {
		if (e.subtreeFlags & Bu) for (e = e.child; e !== null;) Hu(e, t, n), e = e.sibling;
	}
	function Hu(e, t, n) {
		switch (e.tag) {
			case 26:
				Vu(e, t, n), e.flags & Bu && (e.memoizedState === null ? (e = e.stateNode, (t & 335544128) === t && Zm(n, e)) : Qm(n, Tu, e.memoizedState, e.memoizedProps));
				break;
			case 5:
				Vu(e, t, n), e.flags & Bu && (e = e.stateNode, (t & 335544128) === t && Zm(n, e));
				break;
			case 3:
			case 4:
				var r = Tu;
				Tu = bm(e.stateNode.containerInfo), Vu(e, t, n), Tu = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Bu, Bu = 16777216, Vu(e, t, n), Bu = r) : Vu(e, t, n));
				break;
			case 30:
				if ((e.flags & Bu) !== 0 && (r = e.memoizedProps.name, r != null && r !== "auto")) {
					var i = e.stateNode;
					i.paired = null, Fl === null && (Fl = /* @__PURE__ */ new Map()), Fl.set(r, i);
				}
				Vu(e, t, n);
				break;
			default: Vu(e, t, n);
		}
	}
	function Uu(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Wu(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				iu = r, qu(r, e);
			}
			Uu(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Gu(e), e = e.sibling;
	}
	function Gu(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Wu(e), e.flags & 2048 && _l(9, e, e.return);
				break;
			case 3:
				Wu(e);
				break;
			case 12:
				Wu(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Ku(e)) : Wu(e);
				break;
			default: Wu(e);
		}
	}
	function Ku(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				iu = r, qu(r, e);
			}
			Uu(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					_l(8, t, t.return), Ku(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Ku(t));
					break;
				default: Ku(t);
			}
			e = e.sibling;
		}
	}
	function qu(e, t) {
		for (; iu !== null;) {
			var n = iu;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					_l(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: Ta(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, iu = r;
			else a: for (n = e; iu !== null;) {
				r = iu;
				var i = r.sibling, a = r.return;
				if (hu(r), r === n) {
					iu = null;
					break a;
				}
				if (i !== null) {
					i.return = a, iu = i;
					break a;
				}
				iu = a;
			}
		}
	}
	var Ju = {
		getCacheForType: function(e) {
			var t = _a(Ca), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return _a(Ca).controller.signal;
		}
	}, Yu = typeof WeakMap == "function" ? WeakMap : Map, X = 0, Xu = null, Z = null, Q = 0, Zu = 0, Qu = null, $u = !1, ed = !1, td = !1, nd = 0, rd = 0, id = 0, ad = 0, od = 0, sd = 0, cd = 0, ld = null, ud = null, dd = !1, fd = 0, pd = 0, md = Infinity, hd = null, gd = null, _d = 0, vd = null, yd = null, bd = 0, xd = 0, Sd = null, Cd = null, wd = null, Td = null, Ed = null, Dd = 0, Od = null;
	function kd() {
		return X & 2 && Q !== 0 ? Q & -Q : P.T === null ? yt() : Nf();
	}
	function Ad() {
		if (sd === 0) {
			if (!(Q & 536870912) || J) {
				var e = at;
				at <<= 1, !(at & 3932160) && (at = 262144), sd = e;
			} else sd = 536870912;
		}
		return e = Co.current, e !== null && (e.flags |= 32), sd;
	}
	function jd(e, t) {
		if (t != null) {
			var n = e.stateNode, r = n.ref;
			r === null && (r = n.ref = Pp(li(e.memoizedProps, n))), Td === null && (Td = []), Td.push(t.bind(null, r));
		}
	}
	function Md(e, t, n) {
		(e === Xu && (Zu === 2 || Zu === 9) || e.cancelPendingCommit !== null) && (zd(e, 0), Id(e, Q, sd, !1)), pt(e, n), (!(X & 2) || e !== Xu) && (e === Xu && (!(X & 2) && (ad |= n), rd === 4 && Id(e, Q, sd, !1)), Tf(e));
	}
	function Nd(e, t, n) {
		if (X & 6) throw Error(i(327));
		var r = !n && !(t & 127) && (t & e.expiredLanes) === 0 || L(e, t), a = r ? qd(e, t) : Gd(e, t, !0), o = r;
		do {
			if (a === 0) {
				ed && !r && Id(e, t, 0, !1);
				break;
			}
			if (n = e.current.alternate, o && !Fd(n)) a = Gd(e, t, !1), o = !1;
			else {
				if (a === 2) {
					if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
					else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
					if (s !== 0) {
						t = s;
						a: {
							var c = e;
							a = ld;
							var l = c.current.memoizedState.isDehydrated;
							if (l && (zd(c, s).flags |= 256), s = Gd(c, s, !1), s !== 2 && s !== 6) {
								if (td && !l) {
									c.errorRecoveryDisabledLanes |= o, ad |= o, a = 4;
									break a;
								}
								o = ud, ud = a, o !== null && (ud === null ? ud = o : ud.push.apply(ud, o));
							}
							a = s;
						}
						if (o = !1, a !== 2) continue;
					}
				}
				if (a === 1) {
					zd(e, 0), Id(e, t, 0, !0);
					break;
				}
				a: {
					switch (r = e, o = a, o) {
						case 0:
						case 1: throw Error(i(345));
						case 4: if ((t & 4194048) !== t && (t & 62914560) !== t) break;
						case 6:
							Id(r, t, sd, !$u);
							break a;
						case 2:
							ud = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(i(329));
					}
					if ((t & 62914560) === t && (a = fd + 300 - Ue(), 10 < a)) {
						if (Id(r, t, sd, !$u), ct(r, 0, !0) !== 0) break a;
						bd = t, r.timeoutHandle = gp(Pd.bind(null, r, n, ud, hd, dd, t, sd, ad, cd, $u, o, "Throttled", -0, 0), a);
						break a;
					}
					Pd(r, n, ud, hd, dd, t, sd, ad, cd, $u, o, null, -0, 0);
				}
				break;
			}
		} while (1);
		Tf(e);
	}
	function Pd(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		e.timeoutHandle = -1;
		var m = t.subtreeFlags, h = (a & 335544064) === a;
		d = null, (h || m & 8192 || (m & 16785408) == 16785408) && (d = {
			stylesheets: null,
			count: 0,
			imgCount: 0,
			imgBytes: 0,
			suspenseyImages: [],
			waitingForImages: !0,
			waitingForViewTransition: !1,
			unsuspend: hn
		}, Fl = null, Hu(t, a, d), h && (m = d, h = e.containerInfo, h = (h.nodeType === 9 ? h : h.ownerDocument).__reactViewTransition, h != null && (m.count++, m.waitingForViewTransition = !0, m = nh.bind(m), h.finished.then(m, m))), m = (a & 62914560) === a ? fd - Ue() : (a & 4194048) === a ? pd - Ue() : 0, m = eh(d, m), m !== null) ? (bd = a, e.cancelPendingCommit = m(ef.bind(null, e, t, a, n, r, i, o, s, c, l, u, d, null, f, p)), Id(e, a, o, !l)) : ef(e, t, a, n, r, i, o, s, c, l, u, d);
	}
	function Fd(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!Pr(a(), i)) return !1;
				} catch {
					return !1;
				}
			}
			if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
			else {
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return !0;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
		}
		return !0;
	}
	function Id(e, t, n, r) {
		t = lt(e, t), t &= ~od, t &= ~ad, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - et(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && ht(e, n, t);
	}
	function Ld() {
		return X & 6 ? !0 : (Ef(0, !1), !1);
	}
	function Rd() {
		if (Z !== null) {
			if (Zu === 0) var e = Z.return;
			else e = Z, la = ca = null, Qo(e), Za = null, Qa = 0, e = Z;
			for (; e !== null;) hl(e.alternate, e), e = e.return;
			Z = null;
		}
	}
	function zd(e, t) {
		var n = e.timeoutHandle;
		return n !== -1 && (e.timeoutHandle = -1, _p(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), bd = 0, Rd(), Xu = e, Z = n = Ei(e.current, null), Q = t, Zu = 0, Qu = null, $u = !1, ed = L(e, t), td = !1, cd = sd = od = ad = id = rd = 0, ud = ld = null, dd = !1, nd = lt(e, t), gi(), n;
	}
	function Bd(e, t) {
		Y = null, P.H = cc, t === Va || t === Ua ? (t = Ya(), Zu = 3) : t === Ha ? (t = Ya(), Zu = 4) : Zu = t === Ec ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, Qu = t, Z === null && (rd = 1, bc(e, Pi(t, e.current)));
	}
	function Vd() {
		var e = Co.current;
		return e === null ? !0 : (Q & 4194048) === Q ? wo === null : (Q & 62914560) === Q || Q & 536870912 ? e === wo : !1;
	}
	function Hd() {
		var e = P.H;
		return P.H = cc, e === null ? cc : e;
	}
	function Ud() {
		var e = P.A;
		return P.A = Ju, e;
	}
	function Wd() {
		rd = 4, $u || (Q & 4194048) !== Q && Co.current !== null || (ed = !0), !(id & 134217727) && !(ad & 134217727) || Xu === null || Id(Xu, Q, sd, !1);
	}
	function Gd(e, t, n) {
		var r = X;
		X |= 2;
		var i = Hd(), a = Ud();
		(Xu !== e || Q !== t) && (hd = null, zd(e, t)), t = !1;
		var o = rd;
		a: do
			try {
				if (Zu !== 0 && Z !== null) {
					var s = Z, c = Qu;
					switch (Zu) {
						case 8:
							Rd(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							Co.current === null && (t = !0);
							var l = Zu;
							if (Zu = 0, Qu = null, Zd(e, s, c, l), n && ed) {
								o = 0;
								break a;
							}
							break;
						default: l = Zu, Zu = 0, Qu = null, Zd(e, s, c, l);
					}
				}
				Kd(), o = rd;
				break;
			} catch (t) {
				Bd(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, la = ca = null, X = r, P.H = i, P.A = a, Z === null && (Xu = null, Q = 0, gi()), o;
	}
	function Kd() {
		for (; Z !== null;) Yd(Z);
	}
	function qd(e, t) {
		var n = X;
		X |= 2;
		var r = Hd(), a = Ud();
		Xu !== e || Q !== t ? (hd = null, md = Ue() + 500, zd(e, t)) : ed = L(e, t);
		a: do
			try {
				if (Zu !== 0 && Z !== null) {
					t = Z;
					var o = Qu;
					b: switch (Zu) {
						case 1:
							Zu = 0, Qu = null, Zd(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (Ga(o)) {
								Zu = 0, Qu = null, Xd(t);
								break;
							}
							t = function() {
								Zu !== 2 && Zu !== 9 || Xu !== e || (Zu = 7), Tf(e);
							}, o.then(t, t);
							break a;
						case 3:
							Zu = 7;
							break a;
						case 4:
							Zu = 5;
							break a;
						case 7:
							Ga(o) ? (Zu = 0, Qu = null, Xd(t)) : (Zu = 0, Qu = null, Zd(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (Z.tag) {
								case 26: s = Z.memoizedState;
								case 5:
								case 27:
									var c = Z;
									if (s ? Ym(s) : c.stateNode.complete) {
										Zu = 0, Qu = null;
										var l = c.sibling;
										if (l !== null) Z = l;
										else {
											var u = c.return;
											u === null ? Z = null : (Z = u, Qd(u));
										}
										break b;
									}
							}
							Zu = 0, Qu = null, Zd(e, t, o, 5);
							break;
						case 6:
							Zu = 0, Qu = null, Zd(e, t, o, 6);
							break;
						case 8:
							Rd(), rd = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				Jd();
				break;
			} catch (t) {
				Bd(e, t);
			}
		while (1);
		return la = ca = null, P.H = r, P.A = a, X = n, Z === null ? (Xu = null, Q = 0, gi(), rd) : 0;
	}
	function Jd() {
		for (; Z !== null && !Ve();) Yd(Z);
	}
	function Yd(e) {
		var t = ol(e.alternate, e, nd);
		e.memoizedProps = e.pendingProps, t === null ? Qd(e) : Z = t;
	}
	function Xd(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = Bc(n, t, t.pendingProps, t.type, void 0, Q);
				break;
			case 11:
				t = Bc(n, t, t.pendingProps, t.type.render, t.ref, Q);
				break;
			case 5:
				Qo(t);
				var r = t;
				r === Yi && (J ? (na(r), r.tag === 5 && r.stateNode != null && (Xi = r.stateNode)) : (na(r), J = !0));
			default: hl(n, t), t = Z = Di(t, nd), t = ol(n, t, nd);
		}
		e.memoizedProps = e.pendingProps, t === null ? Qd(e) : Z = t;
	}
	function Zd(e, t, n, r) {
		la = ca = null, Qo(t), Za = null, Qa = 0;
		var i = t.return;
		try {
			if (Tc(e, i, t, n, Q)) {
				rd = 1, bc(e, Pi(n, e.current)), Z = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw Z = i, t;
			rd = 1, bc(e, Pi(n, e.current)), Z = null;
			return;
		}
		t.flags & 32768 ? (J || r === 1 ? e = !0 : ed || Q & 536870912 ? e = !1 : ($u = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = Co.current, r !== null && r.tag === 13 && (r.flags |= 16384))), $d(t, e)) : Qd(t);
	}
	function Qd(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				$d(t, $u);
				return;
			}
			e = t.return;
			var n = pl(t.alternate, t, nd);
			if (n !== null) {
				Z = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				Z = t;
				return;
			}
			Z = t = e;
		} while (t !== null);
		rd === 0 && (rd = 5);
	}
	function $d(e, t) {
		do {
			var n = ml(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, Z = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				Z = e;
				return;
			}
			Z = e = n;
		} while (e !== null);
		rd = 6, Z = null;
	}
	function ef(e, t, n, r, a, o, s, c, l, u, d, f) {
		e.cancelPendingCommit = null;
		do
			lf();
		while (_d !== 0);
		if (X & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			e === Xu && (Z = Xu = null, Q = 0), yd = t, vd = e, bd = n, Sd = a, Cd = r, tf(e, t, n, s, c, l, f);
		}
	}
	function tf(e, t, n, r, i, a, o) {
		var s = t.lanes | t.childLanes;
		if (xd = s, s |= hi, mt(e, n, s, r, i, a), Td = null, (n & 335544064) === n ? (Ed = Oa(e), r = 10262) : (Ed = null, r = 10256), (t.subtreeFlags & r) !== 0 || (t.flags & r) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, vf(qe, function() {
			return uf(), null;
		})) : (e.callbackNode = null, e.callbackPriority = 0), Pl = !1, r = !!(t.flags & 13878), t.subtreeFlags & 13878 || r) {
			r = P.T, P.T = null, i = F.p, F.p = 2, a = X, X |= 4;
			try {
				lu(e, t, n);
			} finally {
				X = a, F.p = i, P.T = r;
			}
		}
		_d = 1, Pl ? wd = Mp(o, e.containerInfo, Ed, af, of, rf, sf, uf, nf, null, null) : (af(), of(), sf());
	}
	function nf(e) {
		if (_d !== 0) {
			var t = vd.onRecoverableError;
			t(e, { componentStack: null });
		}
	}
	function rf() {
		_d === 3 && (_d = 0, Au(yd, vd), _d = 4);
	}
	function af() {
		if (_d === 1) {
			_d = 0;
			var e = vd, t = yd, n = bd, r = !!(t.flags & 13878);
			if (t.subtreeFlags & 13878 || r) {
				r = P.T, P.T = null;
				var i = F.p;
				F.p = 2;
				var a = X;
				X |= 4;
				try {
					ou = su = !1, Eu(t, e, n), n = cp;
					var o = Br(e.containerInfo), s = n.focusedElem, c = n.selectionRange;
					if (o !== s && s && s.ownerDocument && zr(s.ownerDocument.documentElement, s)) {
						if (c !== null && Vr(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = Rr(s, h), v = Rr(s, g);
									if (_ && v && (p.rangeCount !== 1 || p.anchorNode !== _.node || p.anchorOffset !== _.offset || p.focusNode !== v.node || p.focusOffset !== v.offset)) {
										var y = d.createRange();
										y.setStart(_.node, _.offset), p.removeAllRanges(), h > g ? (p.addRange(y), p.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), p.addRange(y));
									}
								}
							}
						}
						for (d = [], p = s; p = p.parentNode;) p.nodeType === 1 && d.push({
							element: p,
							left: p.scrollLeft,
							top: p.scrollTop
						});
						for (typeof s.focus == "function" && s.focus(), s = 0; s < d.length; s++) {
							var b = d[s];
							b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
						}
					}
					gh = !!sp, cp = sp = null;
				} finally {
					X = a, F.p = i, P.T = r;
				}
			}
			e.current = t, _d = 2;
		}
	}
	function of() {
		if (_d === 2) {
			_d = 0;
			var e = vd, t = yd, n = !!(t.flags & 8772);
			if (t.subtreeFlags & 8772 || n) {
				n = P.T, P.T = null;
				var r = F.p;
				F.p = 2;
				var i = X;
				X |= 4;
				try {
					du(e, t.alternate, t);
				} finally {
					X = i, F.p = r, P.T = n;
				}
			}
			_d = 3;
		}
	}
	function sf() {
		if (_d === 4 || _d === 3) {
			_d = 0;
			var e = wd;
			wd = null, He();
			var t = vd, n = yd, r = bd, i = Cd, a = (r & 335544064) === r ? 10262 : 10256;
			if ((n.subtreeFlags & a) !== 0 || (n.flags & a) !== 0 ? _d = 5 : (_d = 0, yd = vd = null, cf(t, t.pendingLanes)), a = t.pendingLanes, a === 0 && (gd = null), vt(r), n = n.stateNode, Qe && typeof Qe.onCommitFiberRoot == "function") try {
				Qe.onCommitFiberRoot(I, n, void 0, (n.current.flags & 128) == 128);
			} catch {}
			if (i !== null) {
				n = P.T, a = F.p, F.p = 2, P.T = null;
				try {
					for (var o = t.onRecoverableError, s = 0; s < i.length; s++) {
						var c = i[s];
						o(c.value, { componentStack: c.stack });
					}
				} finally {
					P.T = n, F.p = a;
				}
			}
			if (i = Td, o = Ed, Ed = null, i !== null && (Td = null, o === null && (o = []), e !== null)) for (c = 0; c < i.length; c++) n = (0, i[c])(o), n !== void 0 && e.finished.finally(n);
			bd & 3 && lf(), Tf(t), a = t.pendingLanes, r & 261930 && a & 42 ? t === Od ? Dd++ : (Dd = 0, Od = t) : (Dd = 0, Od = null), Ef(0, !1);
		}
	}
	function cf(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Ta(t)));
	}
	function lf() {
		return wd !== null && (wd.skipTransition(), wd = null), af(), of(), sf(), uf();
	}
	function uf() {
		if (_d !== 5) return !1;
		var e = vd, t = xd;
		xd = 0;
		var n = vt(bd), r = P.T, a = F.p;
		try {
			F.p = 32 > n ? 32 : n, P.T = null, n = Sd, Sd = null;
			var o = vd, s = bd;
			if (_d = 0, yd = vd = null, bd = 0, X & 6) throw Error(i(331));
			var c = X;
			if (X |= 4, Gu(o.current), Lu(o, o.current, s, n), X = c, Ef(0, !1), Qe && typeof Qe.onPostCommitFiberRoot == "function") try {
				Qe.onPostCommitFiberRoot(I, o);
			} catch {}
			return !0;
		} finally {
			F.p = a, P.T = r, cf(e, t);
		}
	}
	function df(e, t, n) {
		t = Pi(n, t), t = Sc(e.stateNode, t, 2), e = lo(e, t, 2), e !== null && (pt(e, 2), Tf(e));
	}
	function ff(e, t, n) {
		if (e.tag === 3) df(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				df(t, e, n);
				break;
			}
			if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (gd === null || !gd.has(r))) {
					e = Pi(n, e), n = Cc(2), r = lo(t, n, 2), r !== null && (wc(n, r, t, e), pt(r, 2), Tf(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function pf(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new Yu();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (td = !0, i.add(n), e = mf.bind(null, e, t, n), t.then(e, e));
	}
	function mf(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Xu === e && (Q & n) === n && (rd === 4 || rd === 3 && (Q & 62914560) === Q && 300 > Ue() - fd ? X & 2 ? od |= n : zd(e, 0) : od |= n, cd === Q && (cd = 0)), Tf(e);
	}
	function hf(e, t) {
		t === 0 && (t = dt()), e = yi(e, t), e !== null && (pt(e, t), Tf(e));
	}
	function gf(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), hf(e, n);
	}
	function _f(e, t) {
		var n = 0;
		switch (e.tag) {
			case 31:
			case 13:
				var r = e.stateNode, a = e.memoizedState;
				a !== null && (n = a.retryLane);
				break;
			case 19:
				r = e.stateNode;
				break;
			case 22:
				r = e.stateNode._retryCache;
				break;
			default: throw Error(i(314));
		}
		r !== null && r.delete(t), hf(e, n);
	}
	function vf(e, t) {
		return ze(e, t);
	}
	var yf = null, bf = null, xf = !1, Sf = !1, Cf = !1, wf = 0;
	function Tf(e) {
		e !== bf && e.next === null && (bf === null ? yf = bf = e : bf = bf.next = e), Sf = !0, xf || (xf = !0, Mf());
	}
	function Ef(e, t) {
		if (!Cf && Sf) {
			Cf = !0;
			do
				for (var n = !1, r = yf; r !== null;) {
					if (!t) {
						if (e !== 0) {
							var i = r.pendingLanes;
							if (i === 0) var a = 0;
							else {
								var o = r.suspendedLanes, s = r.pingedLanes;
								a = (1 << 31 - et(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
							}
							a !== 0 && (n = !0, jf(r, a));
						} else a = Q, a = ct(r, r === Xu ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || L(r, a) || (n = !0, jf(r, a));
					}
					r = r.next;
				}
			while (n);
			Cf = !1;
		}
	}
	function Df() {
		Of();
	}
	function Of() {
		Sf = xf = !1;
		var e = 0;
		wf !== 0 && hp() && (e = wf);
		for (var t = Ue(), n = null, r = yf; r !== null;) {
			var i = r.next, a = kf(r, t);
			a === 0 ? (r.next = null, n === null ? yf = i : n.next = i, i === null && (bf = n)) : (n = r, (e !== 0 || a & 3) && (Sf = !0)), r = i;
		}
		_d !== 0 && _d !== 5 || Ef(e, !1), wf !== 0 && (wf = 0);
	}
	function kf(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - et(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = ut(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = Xu, n = Q, n = ct(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (Zu === 2 || Zu === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && Be(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || L(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && Be(r), vt(n)) {
				case 2:
				case 8:
					n = Ke;
					break;
				case 32:
					n = qe;
					break;
				case 268435456:
					n = Ye;
					break;
				default: n = qe;
			}
			return r = Af.bind(null, e), n = ze(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && Be(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function Af(e, t) {
		if (_d !== 0 && _d !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (lf() && e.callbackNode !== n) return null;
		var r = Q;
		return r = ct(e, e === Xu ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (Nd(e, r, t), kf(e, Ue()), e.callbackNode != null && e.callbackNode === n ? Af.bind(null, e) : null);
	}
	function jf(e, t) {
		if (lf()) return null;
		Nd(e, t, !0);
	}
	function Mf() {
		bp(function() {
			X & 6 ? ze(Ge, Df) : Of();
		});
	}
	function Nf() {
		if (wf === 0) {
			var e = ja;
			e === 0 && (e = it, it <<= 1, !(it & 261888) && (it = 256)), wf = e;
		}
		return wf;
	}
	function Pf(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : mn(e);
	}
	function Ff(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = Pf((i[Ct] || null).action), o = r.submitter;
			o && (t = (t = o[Ct] || null) ? Pf(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new Fn("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (wf !== 0) {
								var e = new FormData(i, o);
								Js(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = new FormData(i, o), Js(n, {
							pending: !0,
							data: e,
							method: i.method,
							action: a
						}, a, e));
					},
					currentTarget: i
				}]
			});
		}
	}
	for (var If = 0; If < oi.length; If++) {
		var Lf = oi[If];
		si(Lf.toLowerCase(), "on" + (Lf[0].toUpperCase() + Lf.slice(1)));
	}
	si($r, "onAnimationEnd"), si(ei, "onAnimationIteration"), si(ti, "onAnimationStart"), si("dblclick", "onDoubleClick"), si("focusin", "onFocus"), si("focusout", "onBlur"), si(ni, "onTransitionRun"), si(ri, "onTransitionStart"), si(ii, "onTransitionCancel"), si(ai, "onTransitionEnd"), Vt("onMouseEnter", ["mouseout", "mouseover"]), Vt("onMouseLeave", ["mouseout", "mouseover"]), Vt("onPointerEnter", ["pointerout", "pointerover"]), Vt("onPointerLeave", ["pointerout", "pointerover"]), Bt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Bt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Bt("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), Bt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Bt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Bt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var Rf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), zf = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Rf));
	function Bf(e, t) {
		t = !!(t & 4);
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = r.event;
			r = r.listeners;
			a: {
				var a = void 0;
				if (t) for (var o = r.length - 1; 0 <= o; o--) {
					var s = r[o], c = s.instance, l = s.currentTarget;
					if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						fi(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						fi(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function $(e, t) {
		var n = t[Tt];
		n === void 0 && (n = t[Tt] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (Wf(t, e, 2, !1), n.add(r));
	}
	function Vf(e, t, n) {
		var r = 0;
		t && (r |= 4), Wf(n, e, r, t);
	}
	var Hf = "_reactListening" + Math.random().toString(36).slice(2);
	function Uf(e) {
		if (!e[Hf]) {
			e[Hf] = !0, Rt.forEach(function(t) {
				t !== "selectionchange" && (zf.has(t) || Vf(t, !1, e), Vf(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[Hf] || (t[Hf] = !0, Vf("selectionchange", !1, t));
		}
	}
	function Wf(e, t, n, r) {
		switch (Ch(t)) {
			case 2:
				var i = _h;
				break;
			case 8:
				i = vh;
				break;
			default: i = yh;
		}
		n = i.bind(null, t, n, e), i = void 0, !wn || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function Gf(e, t, n, r, i) {
		var a = r;
		if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
			if (r === null) return;
			var s = r.tag;
			if (s === 3 || s === 4) {
				var c = r.stateNode.containerInfo;
				if (c === i) break;
				if (s === 4) for (s = r.return; s !== null;) {
					var l = s.tag;
					if ((l === 3 || l === 4) && s.stateNode.containerInfo === i) return;
					s = s.return;
				}
				for (; c !== null;) {
					if (s = Mt(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		Sn(function() {
			var r = a, i = _n(n), s = [];
			a: {
				var c = q.get(e);
				if (c !== void 0) {
					var l = Fn, u = e;
					switch (e) {
						case "keypress": if (An(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = Xn;
							break;
						case "focusin":
							u = "focus", l = Un;
							break;
						case "focusout":
							u = "blur", l = Un;
							break;
						case "beforeblur":
						case "afterblur":
							l = Un;
							break;
						case "click": if (n.button === 2) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							l = Vn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = Hn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = $n;
							break;
						case $r:
						case ei:
						case ti:
							l = Wn;
							break;
						case ai:
							l = er;
							break;
						case "scroll":
						case "scrollend":
							l = W;
							break;
						case "wheel":
							l = tr;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = Gn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = Zn;
							break;
						case "submit":
							l = Qn;
							break;
						case "toggle":
						case "beforetoggle": l = nr;
					}
					var d = !!(t & 4), f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = Cn(m, p), g != null && d.push(Kf(m, g, h))), f) break;
						m = m.return;
					}
					0 < d.length && (c = new l(c, u, null, n, i), s.push({
						event: c,
						listeners: d
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (l = e === "mouseover" || e === "pointerover", c = e === "mouseout" || e === "pointerout", l && n !== gn && (u = n.relatedTarget || n.fromElement) && (Mt(u) || u[wt])) break a;
					(c || l) && (u = i.window === i ? i : (l = i.ownerDocument) ? l.defaultView || l.parentWindow : window, c ? (l = n.relatedTarget || n.toElement, c = r, l = l ? Mt(l) : null, l !== null && (f = o(l), d = l.tag, l !== f || d !== 5 && d !== 27 && d !== 6) && (l = null)) : (c = null, l = r), c !== l && (d = Vn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = Zn, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = c == null ? u : Pt(c), h = l == null ? u : Pt(l), u = new d(g, m + "leave", c, n, i), u.target = f, u.relatedTarget = h, g = null, Mt(i) === r && (d = new d(p, m + "enter", l, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, d = c && l ? C(c, l, Jf) : null, c !== null && Yf(s, u, c, d, !1), l !== null && f !== null && Yf(s, f, l, d, !0)));
				}
				a: {
					if (c = r ? Pt(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var _ = Sr;
					else if (gr(c)) {
						if (Cr) _ = Mr;
						else {
							_ = Ar;
							var v = kr;
						}
					} else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && dn(r.elementType) && (_ = Sr) : _ = jr;
					if (_ &&= _(e, r)) {
						_r(s, _, n, i);
						break a;
					}
					v && v(e, c, r);
				}
				switch (v = r ? Pt(r) : window, e) {
					case "focusin":
						(gr(v) || v.contentEditable === "true") && (Ur = v, Wr = r, Gr = null);
						break;
					case "focusout":
						Gr = Wr = Ur = null;
						break;
					case "mousedown":
						Kr = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						Kr = !1, qr(s, n, i);
						break;
					case "selectionchange": if (Hr) break;
					case "keydown":
					case "keyup": qr(s, n, i);
				}
				var y;
				if (ir) b: {
					switch (e) {
						case "compositionstart":
							var b = "onCompositionStart";
							break b;
						case "compositionend":
							b = "onCompositionEnd";
							break b;
						case "compositionupdate":
							b = "onCompositionUpdate";
							break b;
					}
					b = void 0;
				}
				else fr ? ur(e, n) && (b = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (b = "onCompositionStart");
				b && (sr && n.locale !== "ko" && (fr || b !== "onCompositionStart" ? b === "onCompositionEnd" && fr && (y = kn()) : (En = i, Dn = "value" in En ? En.value : En.textContent, fr = !0)), v = qf(r, b), 0 < v.length && (b = new G(b, e, null, n, i), s.push({
					event: b,
					listeners: v
				}), y ? b.data = y : (y = dr(n), y !== null && (b.data = y)))), (y = or ? pr(e, n) : mr(e, n)) && (b = qf(r, "onBeforeInput"), 0 < b.length && (v = new G("onBeforeInput", "beforeinput", null, n, i), s.push({
					event: v,
					listeners: b
				}), v.data = y)), Ff(s, e, r, n, i);
			}
			Bf(s, t);
		});
	}
	function Kf(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function qf(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = Cn(e, n), i != null && r.unshift(Kf(e, i, a)), i = Cn(e, t), i != null && r.push(Kf(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function Jf(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function Yf(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = Cn(n, a), l != null && o.unshift(Kf(n, l, c))) : i || (l = Cn(n, a), l != null && o.push(Kf(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var Xf = /\r\n?/g, Zf = /\u0000|\uFFFD/g;
	function Qf(e) {
		return (typeof e == "string" ? e : "" + e).replace(Xf, "\n").replace(Zf, "");
	}
	function $f(e, t) {
		return t = Qf(t), Qf(e) === t;
	}
	function ep(e, t, n, r, a, o) {
		switch (n) {
			case "children":
				if (typeof r == "string") t === "body" || t === "textarea" && r === "" || sn(e, r);
				else if (typeof r == "number" || typeof r == "bigint") t !== "body" && sn(e, "" + r);
				else return;
				break;
			case "className":
				Kt(e, "class", r);
				break;
			case "tabIndex":
				Kt(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				Kt(e, n, r);
				break;
			case "style":
				un(e, r, o);
				return;
			case "data": if (t !== "object") {
				Kt(e, "data", r);
				break;
			}
			case "src":
			case "href":
				if (r === "" && (t !== "a" || n !== "href") || r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = mn(r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				}
				if (typeof o == "function" && (n === "formAction" ? (t !== "input" && ep(e, t, "name", a.name, a, null), ep(e, t, "formEncType", a.formEncType, a, null), ep(e, t, "formMethod", a.formMethod, a, null), ep(e, t, "formTarget", a.formTarget, a, null)) : (ep(e, t, "encType", a.encType, a, null), ep(e, t, "method", a.method, a, null), ep(e, t, "target", a.target, a, null))), r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = mn(r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = hn);
				return;
			case "onScroll":
				r != null && $("scroll", e);
				return;
			case "onScrollEnd":
				r != null && $("scrollend", e);
				return;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						o?.__html !== n && (e.innerHTML = n);
					}
				}
				break;
			case "multiple":
				e.multiple = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "muted":
				e.muted = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "ref": break;
			case "autoFocus": break;
			case "xlinkHref":
				if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
					e.removeAttribute("xlink:href");
					break;
				}
				n = mn(r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "inert":
			case "allowFullScreen":
			case "async":
			case "autoPlay":
			case "controls":
			case "credentialless":
			case "default":
			case "defer":
			case "disabled":
			case "disablePictureInPicture":
			case "disableRemotePlayback":
			case "formNoValidate":
			case "hidden":
			case "loop":
			case "noModule":
			case "noValidate":
			case "open":
			case "playsInline":
			case "readOnly":
			case "required":
			case "reversed":
			case "scoped":
			case "seamless":
			case "itemScope":
				r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
				break;
			case "capture":
			case "download":
				!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "rowSpan":
			case "start":
				r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : e.setAttribute(n, r);
				break;
			case "popover":
				$("beforetoggle", e), $("toggle", e), Gt(e, "popover", r);
				break;
			case "xlinkActuate":
				qt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				qt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				qt(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				qt(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				qt(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				qt(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				qt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				qt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				qt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				Gt(e, "is", r);
				break;
			case "innerText":
			case "textContent": return;
			default: if (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") n = fn.get(n) || n, Gt(e, n, r);
			else return;
		}
		V = !0;
	}
	function tp(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				un(e, r, o);
				return;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						o?.__html !== n && (e.innerHTML = n);
					}
				}
				break;
			case "children":
				if (typeof r == "string") sn(e, r);
				else if (typeof r == "number" || typeof r == "bigint") sn(e, "" + r);
				else return;
				break;
			case "onScroll":
				r != null && $("scroll", e);
				return;
			case "onScrollEnd":
				r != null && $("scrollend", e);
				return;
			case "onClick":
				r != null && (e.onclick = hn);
				return;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": return;
			case "innerText":
			case "textContent": return;
			default:
				if (!zt.hasOwnProperty(n)) a: {
					if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), o = n.slice(2, a ? n.length - 7 : void 0), t = e[Ct] || null, t = t == null ? null : t[n], typeof t == "function" && e.removeEventListener(o, t, a), typeof r == "function")) {
						typeof t != "function" && t !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(o, r, a);
						break a;
					}
					V = !0, n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : Gt(e, n, r);
				}
				return;
		}
		V = !0;
	}
	function np(e, t, n) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "img":
				$("error", e), $("load", e);
				var r = !1, a = !1, o;
				for (o in n) if (n.hasOwnProperty(o)) {
					var s = n[o];
					if (s != null) switch (o) {
						case "src":
							r = !0;
							break;
						case "srcSet":
							a = !0;
							break;
						case "children":
						case "dangerouslySetInnerHTML": throw Error(i(137, t));
						default: ep(e, t, o, s, n, null);
					}
				}
				a && ep(e, t, "srcSet", n.srcSet, n, null), r && ep(e, t, "src", n.src, n, null);
				return;
			case "input":
				$("invalid", e);
				var c = o = s = a = null, l = null, u = null;
				for (r in n) if (n.hasOwnProperty(r)) {
					var d = n[r];
					if (d != null) switch (r) {
						case "name":
							a = d;
							break;
						case "type":
							s = d;
							break;
						case "checked":
							l = d;
							break;
						case "defaultChecked":
							u = d;
							break;
						case "value":
							o = d;
							break;
						case "defaultValue":
							c = d;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (d != null) throw Error(i(137, t));
							break;
						default: ep(e, t, r, d, n, null);
					}
				}
				tn(e, o, c, l, u, s, a, !1);
				return;
			case "select":
				for (a in $("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(a) && (c = n[a], c != null)) switch (a) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: ep(e, t, a, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && rn(e, !!r, n, !0) : rn(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in $("invalid", e), o = a = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
					case "value":
						r = c;
						break;
					case "defaultValue":
						a = c;
						break;
					case "children":
						o = c;
						break;
					case "dangerouslySetInnerHTML":
						if (c != null) throw Error(i(91));
						break;
					default: ep(e, t, s, c, n, null);
				}
				on(e, r, a, o);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: ep(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				$("beforetoggle", e), $("toggle", e), $("cancel", e), $("close", e);
				break;
			case "iframe":
			case "object":
				$("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < Rf.length; r++) $(Rf[r], e);
				break;
			case "image":
				$("error", e), $("load", e);
				break;
			case "details":
				$("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": $("error", e), $("load", e);
			case "area":
			case "base":
			case "br":
			case "col":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "track":
			case "wbr":
			case "menuitem":
				for (u in n) if (n.hasOwnProperty(u) && (r = n[u], r != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error(i(137, t));
					default: ep(e, t, u, r, n, null);
				}
				return;
			default: if (dn(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && tp(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && ep(e, t, c, r, n, null));
	}
	var rp = {};
	function ip(e, t, n, r) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "input":
				var a = null, o = null, s = null, c = null, l = null, u = null, d = null;
				for (m in n) {
					var f = n[m];
					if (n.hasOwnProperty(m) && f != null) switch (m) {
						case "checked": break;
						case "value": break;
						case "defaultValue": l = f;
						default: r.hasOwnProperty(m) || ep(e, t, m, null, r, f);
					}
				}
				for (var p in r) {
					var m = r[p];
					if (f = n[p], r.hasOwnProperty(p) && (m != null || f != null)) switch (p) {
						case "type":
							m !== f && (V = !0), o = m;
							break;
						case "name":
							m !== f && (V = !0), a = m;
							break;
						case "checked":
							m !== f && (V = !0), u = m;
							break;
						case "defaultChecked":
							m !== f && (V = !0), d = m;
							break;
						case "value":
							m !== f && (V = !0), s = m;
							break;
						case "defaultValue":
							m !== f && (V = !0), c = m;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (m != null) throw Error(i(137, t));
							break;
						default: m !== f && ep(e, t, p, m, r, f);
					}
				}
				en(e, s, c, l, u, d, o, a);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || ep(e, t, o, null, r, l);
				}
				for (a in r) if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
					case "value":
						o !== l && (V = !0), p = o;
						break;
					case "defaultValue":
						o !== l && (V = !0), c = o;
						break;
					case "multiple": o !== l && (V = !0), s = o;
					default: o !== l && ep(e, t, a, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? rn(e, !!n, n ? [] : "", !1) : rn(e, !!n, t, !0)) : rn(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: ep(e, t, c, null, r, a);
				}
				for (s in r) if (a = r[s], o = n[s], r.hasOwnProperty(s) && (a != null || o != null)) switch (s) {
					case "value":
						a !== o && (V = !0), p = a;
						break;
					case "defaultValue":
						a !== o && (V = !0), m = a;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (a != null) throw Error(i(91));
						break;
					default: a !== o && ep(e, t, s, a, r, o);
				}
				an(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: ep(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						p !== m && (V = !0), e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: ep(e, t, l, p, r, m);
				}
				return;
			case "img":
			case "link":
			case "area":
			case "base":
			case "br":
			case "col":
			case "embed":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "source":
			case "track":
			case "wbr":
			case "menuitem":
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && ep(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(i(137, t));
						break;
					default: ep(e, t, u, p, r, m);
				}
				return;
			default: if (dn(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && tp(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || tp(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && ep(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || ep(e, t, f, p, r, m);
	}
	function ap(e) {
		switch (e) {
			case "css":
			case "script":
			case "font":
			case "img":
			case "image":
			case "input":
			case "link": return !0;
			default: return !1;
		}
	}
	function op() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && ap(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && ap(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var sp = null, cp = null;
	function lp(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function up(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function dp(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function fp(e, t, n, r) {
		return n = lp(n).createElement(e), n[St] = r, n[Ct] = t, np(n, e, t), It(n), n;
	}
	function pp(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var mp = null;
	function hp() {
		var e = window.event;
		return e && e.type === "popstate" ? e !== mp && (mp = e, !0) : (mp = null, !1);
	}
	var gp = typeof setTimeout == "function" ? setTimeout : void 0, _p = typeof clearTimeout == "function" ? clearTimeout : void 0, vp = typeof Promise == "function" ? Promise : void 0, yp = typeof requestAnimationFrame == "function" ? requestAnimationFrame : gp, bp = typeof queueMicrotask == "function" ? queueMicrotask : vp === void 0 ? gp : function(e) {
		return vp.resolve(null).then(e).catch(xp);
	};
	function xp(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function Sp(e) {
		return e === "head";
	}
	function Cp(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) {
				if (n = i.data, n === "/$" || n === "/&") {
					if (r === 0) {
						e.removeChild(i), Hh(t);
						return;
					}
					r--;
				} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
				else if (n === "html") _m(e.ownerDocument.documentElement);
				else if (n === "head") {
					n = e.ownerDocument.head, _m(n);
					for (var a = n.firstChild; a;) {
						var o = a.nextSibling, s = a.nodeName;
						a[kt] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
					}
				} else n === "body" && _m(e.ownerDocument.body);
			}
			n = i;
		} while (n);
		Hh(t);
	}
	function wp(e, t) {
		var n = e;
		e = 0;
		do {
			var r = n.nextSibling;
			if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) {
				if (n = r.data, n === "/$") {
					if (e === 0) break;
					e--;
				} else n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
			}
			n = r;
		} while (n);
	}
	function Tp(e, t, n) {
		if (t = CSS.escape(t) === t ? t : "r-" + btoa(t).replace(/=/g, ""), e.style.viewTransitionName = t, n != null && (e.style.viewTransitionClass = n), n = getComputedStyle(e), n.display === "inline") {
			if (t = e.getClientRects(), t.length === 1) var r = 1;
			else for (var i = r = 0; i < t.length; i++) {
				var a = t[i];
				0 < a.width && 0 < a.height && r++;
			}
			r === 1 && (e = e.style, e.display = t.length === 1 ? "inline-block" : "block", e.marginTop = "-" + n.paddingTop, e.marginBottom = "-" + n.paddingBottom);
		}
	}
	function Ep(e, t) {
		e = e.style, t = t.style;
		var n = t == null ? null : t.hasOwnProperty("viewTransitionName") ? t.viewTransitionName : t.hasOwnProperty("view-transition-name") ? t["view-transition-name"] : null;
		e.viewTransitionName = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), n = t == null ? null : t.hasOwnProperty("viewTransitionClass") ? t.viewTransitionClass : t.hasOwnProperty("view-transition-class") ? t["view-transition-class"] : null, e.viewTransitionClass = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), e.display === "inline-block" && (t == null ? e.display = e.margin = "" : (n = t.display, e.display = n == null || typeof n == "boolean" ? "" : n, n = t.margin, n == null ? (n = t.hasOwnProperty("marginTop") ? t.marginTop : t["margin-top"], e.marginTop = n == null || typeof n == "boolean" ? "" : n, t = t.hasOwnProperty("marginBottom") ? t.marginBottom : t["margin-bottom"], e.marginBottom = t == null || typeof t == "boolean" ? "" : t) : e.margin = n));
	}
	function Dp(e, t, n) {
		return n = n.ownerDocument.defaultView, {
			rect: e,
			abs: t.position === "absolute" || t.position === "fixed",
			clip: t.clipPath !== "none" || t.overflow !== "visible" || t.filter !== "none" || t.mask !== "none" || t.mask !== "none" || t.borderRadius !== "0px",
			view: 0 <= e.bottom && 0 <= e.right && e.top <= n.innerHeight && e.left <= n.innerWidth
		};
	}
	function Op(e) {
		return Dp(e.getBoundingClientRect(), getComputedStyle(e), e);
	}
	function kp(e) {
		var t = e.getBoundingClientRect();
		t = new DOMRect(t.x + 2e4, t.y + 2e4, t.width, t.height);
		var n = getComputedStyle(e);
		return Dp(t, n, e);
	}
	function Ap(e) {
		return e.documentElement.clientHeight;
	}
	function jp(e) {
		this.addEventListener("load", e), this.addEventListener("error", e);
	}
	function Mp(e, t, n, r, i, a, o, s, c) {
		var l = t.nodeType === 9 ? t : t.ownerDocument;
		try {
			var u = l.startViewTransition({
				update: function() {
					var t = l.defaultView, n = t.navigation && t.navigation.transition, o = l.fonts.status;
					r();
					var s = [];
					if (o === "loaded" && (Ap(l), l.fonts.status === "loading" && s.push(l.fonts.ready)), o = s.length, e !== null) for (var c = e.suspenseyImages, u = 0, d = 0; d < c.length; d++) {
						var f = c[d];
						if (!f.complete) {
							var p = f.getBoundingClientRect();
							if (0 < p.bottom && 0 < p.right && p.top < t.innerHeight && p.left < t.innerWidth) {
								if (u += Xm(f), u > $m) {
									s.length = o;
									break;
								}
								f = new Promise(jp.bind(f)), s.push(f);
							}
						}
					}
					if (0 < s.length) return t = Promise.race([Promise.all(s), new Promise(function(e) {
						return setTimeout(e, 500);
					})]).then(i, i), (n ? Promise.allSettled([n.finished, t]) : t).then(a, a);
					if (i(), n) return n.finished.then(a, a);
					a();
				},
				types: n
			});
			l.__reactViewTransition = u;
			var d = [];
			return u.ready.then(function() {
				for (var e = l.documentElement.getAnimations({ subtree: !0 }), t = 0; t < e.length; t++) {
					var n = e[t], r = n.effect, i = r.pseudoElement;
					if (i != null && i.startsWith("::view-transition")) {
						d.push(n), n = r.getKeyframes();
						for (var a = i = void 0, s = !0, c = 0; c < n.length; c++) {
							var u = n[c], f = u.width;
							if (i === void 0) i = f;
							else if (i !== f) {
								s = !1;
								break;
							}
							if (f = u.height, a === void 0) a = f;
							else if (a !== f) {
								s = !1;
								break;
							}
							delete u.width, delete u.height, u.transform === "none" && delete u.transform;
						}
						s && i !== void 0 && a !== void 0 && (r.setKeyframes(n), s = getComputedStyle(r.target, r.pseudoElement), s.width !== i || s.height !== a) && (s = n[0], s.width = i, s.height = a, s = n[n.length - 1], s.width = i, s.height = a, r.setKeyframes(n));
					}
				}
				o();
			}, function(e) {
				l.__reactViewTransition === u && (l.__reactViewTransition = null);
				try {
					if (typeof e == "object" && e) switch (e.name) {
						case "InvalidStateError": (e.message === "View transition was skipped because document visibility state is hidden." || e.message === "Skipping view transition because document visibility state has become hidden." || e.message === "Skipping view transition because viewport size changed." || e.message === "Transition was aborted because of invalid state") && (e = null);
					}
					e !== null && c(e);
				} finally {
					r(), i(), o();
				}
			}), u.finished.finally(function() {
				for (var e = 0; e < d.length; e++) d[e].cancel();
				l.__reactViewTransition === u && (l.__reactViewTransition = null), s();
			}), u;
		} catch {
			return r(), i(), o(), null;
		}
	}
	function Np(e, t) {
		this._scope = document.documentElement, this._selector = "::view-transition-" + e + "(" + t + ")";
	}
	Np.prototype.animate = function(e, t) {
		return t = typeof t == "number" ? { duration: t } : w({}, t), t.pseudoElement = this._selector, this._scope.animate(e, t);
	}, Np.prototype.getAnimations = function() {
		for (var e = this._scope, t = this._selector, n = e.getAnimations({ subtree: !0 }), r = [], i = 0; i < n.length; i++) {
			var a = n[i].effect;
			a !== null && a.target === e && a.pseudoElement === t && r.push(n[i]);
		}
		return r;
	}, Np.prototype.getComputedStyle = function() {
		return getComputedStyle(this._scope, this._selector);
	};
	function Pp(e) {
		return {
			name: e,
			group: new Np("group", e),
			imagePair: new Np("image-pair", e),
			old: new Np("old", e),
			new: new Np("new", e)
		};
	}
	function Fp(e) {
		this._fragmentFiber = e, this._observers = this._eventListeners = null;
	}
	Fp.prototype.addEventListener = function(e, t, n) {
		var r = null, i = null;
		if (!(n != null && typeof n != "boolean" && (r = n.signal || null, r !== null && r.aborted))) {
			this._eventListeners === null && (this._eventListeners = []);
			var a = this._eventListeners;
			if (Bp(a, e, t, n) === -1) {
				var o = this, s = t;
				n != null && typeof n != "boolean" && !0 === n.once && (s = function(r) {
					o.removeEventListener(e, t, n), typeof t == "function" ? t.call(this, r) : t.handleEvent(r);
				}), r !== null && (i = o.removeEventListener.bind(o, e, t, n), r.addEventListener("abort", i, { once: !0 }), i = r.removeEventListener.bind(r, "abort", i)), r = Rp(n), a.push({
					type: e,
					listener: t,
					optionsOrUseCapture: n,
					attachedListener: s,
					cleanup: i
				}), f(this._fragmentFiber.child, !1, Ip, e, s, r);
			}
			this._eventListeners = a;
		}
	};
	function Ip(e, t, n, r) {
		return _(e).addEventListener(t, n, r), !1;
	}
	Fp.prototype.removeEventListener = function(e, t, n) {
		var r = this._eventListeners;
		if (r !== null && (t = Bp(r, e, t, n), t !== -1)) {
			var i = r[t];
			n = i.attachedListener;
			var a = i.cleanup;
			i = Rp(i.optionsOrUseCapture), f(this._fragmentFiber.child, !1, Lp, e, n, i), r.splice(t, 1), a !== null && a();
		}
	};
	function Lp(e, t, n, r) {
		return _(e).removeEventListener(t, n, r), !1;
	}
	function Rp(e) {
		return e != null && typeof e != "boolean" && (!0 === e.once || e.signal instanceof AbortSignal) ? {
			capture: e.capture,
			passive: e.passive
		} : e;
	}
	function zp(e) {
		return e == null ? "c=0" : typeof e == "boolean" ? "c=" + (e ? "1" : "0") : "c=" + (e.capture ? "1" : "0");
	}
	function Bp(e, t, n, r) {
		if (e.length === 0) return -1;
		r = zp(r);
		for (var i = 0; i < e.length; i++) {
			var a = e[i];
			if (a.type === t && a.listener === n && zp(a.optionsOrUseCapture) === r) return i;
		}
		return -1;
	}
	Fp.prototype.dispatchEvent = function(e) {
		var t = p(this._fragmentFiber);
		if (t === null) return !0;
		t = _(t);
		var n = this._eventListeners;
		if (n !== null && 0 < n.length || !e.bubbles) {
			var r = t.nodeType === 9 ? t.createComment("") : document.createTextNode("");
			if (n) for (var i = 0; i < n.length; i++) {
				var a = n[i];
				r.addEventListener(a.type, a.attachedListener, Rp(a.optionsOrUseCapture));
			}
			if (t.appendChild(r), e = r.dispatchEvent(e), n) for (i = 0; i < n.length; i++) a = n[i], r.removeEventListener(a.type, a.attachedListener, Rp(a.optionsOrUseCapture));
			return t.removeChild(r), e;
		}
		return t.dispatchEvent(e);
	}, Fp.prototype.focus = function(e) {
		f(this._fragmentFiber.child, !0, Vp, e, void 0, void 0);
	};
	function Vp(e, t) {
		return e.tag !== 6 && (e = _(e), pm(e, t));
	}
	Fp.prototype.focusLast = function(e) {
		var t = [];
		f(this._fragmentFiber.child, !0, Hp, t, void 0, void 0);
		for (var n = t.length - 1; 0 <= n && !Vp(t[n], e); n--);
	};
	function Hp(e, t) {
		return t.push(e), !1;
	}
	Fp.prototype.blur = function() {
		var e = p(this._fragmentFiber);
		e !== null && (e = _(e), e = lp(e).activeElement, e !== null && f(this._fragmentFiber.child, !1, Up, e, void 0, void 0));
	};
	function Up(e, t) {
		return e.tag !== 6 && (e = _(e), e === t || e.contains(t) ? (t.blur(), !0) : !1);
	}
	Fp.prototype.observeUsing = function(e) {
		this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(e), f(this._fragmentFiber.child, !1, Wp, e, void 0, void 0);
	};
	function Wp(e, t) {
		return e.tag === 6 || (e = _(e), t.observe(e)), !1;
	}
	Fp.prototype.unobserveUsing = function(e) {
		var t = this._observers;
		if (t !== null && t.has(e)) {
			t.delete(e), f(this._fragmentFiber.child, !1, Gp, e, void 0, void 0);
			for (var n = t = 0; n < Kp.length; n++) {
				var r = Kp[n];
				r.fragmentInstance === this && r.observer === e ? e.unobserve(r.instance) : Kp[t++] = r;
			}
			Kp.length = t;
		}
	};
	function Gp(e, t) {
		return e.tag === 6 || (e = _(e), t.unobserve(e)), !1;
	}
	var Kp = [], qp = !1;
	function Jp(e, t, n) {
		Kp.push({
			fragmentInstance: e,
			observer: t,
			instance: n
		}), qp || (qp = !0, mm(function() {
			qp = !1;
			var e = Kp;
			Kp = [];
			for (var t = 0; t < e.length; t++) {
				var n = e[t];
				n.observer.unobserve(n.instance);
			}
		}));
	}
	Fp.prototype.getClientRects = function() {
		var e = [];
		return f(this._fragmentFiber.child, !1, Yp, e, void 0, void 0), e;
	};
	function Yp(e, t) {
		if (e.tag === 6) {
			e = e.stateNode;
			var n = e.ownerDocument.createRange();
			n.selectNodeContents(e), t.push.apply(t, n.getClientRects());
		} else e = _(e), t.push.apply(t, e.getClientRects());
		return !1;
	}
	Fp.prototype.getRootNode = function(e) {
		var t = p(this._fragmentFiber);
		return t === null ? this : _(t).getRootNode(e);
	}, Fp.prototype.compareDocumentPosition = function(e) {
		var t = p(this._fragmentFiber);
		if (t === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
		var n = [];
		f(this._fragmentFiber.child, !1, Hp, n, void 0, void 0);
		var r = _(t);
		if (n.length === 0) {
			if (n = r, m(this._fragmentFiber)) {
				a: {
					for (t = this._fragmentFiber.return; t !== null;) {
						if (t.tag === 4) {
							t = t.stateNode.containerInfo;
							break a;
						}
						if (t.tag === 3 || t.tag === 5 || t.tag === 27) break;
						t = t.return;
					}
					t = null;
				}
				t != null && (n = t);
			}
			t = this._fragmentFiber;
			var i = r = n.compareDocumentPosition(e);
			return n === e ? i = Node.DOCUMENT_POSITION_CONTAINS : r & Node.DOCUMENT_POSITION_CONTAINED_BY && (n = h(t)[1], n === null ? i = Node.DOCUMENT_POSITION_PRECEDING : (e = _(n).compareDocumentPosition(e), i = e === 0 || e & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), i |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
		}
		t = _(n[0]), i = _(n[n.length - 1]);
		var a = m(this._fragmentFiber) ? t.parentElement : r;
		if (a == null) return Node.DOCUMENT_POSITION_DISCONNECTED;
		r = a.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY, a = a.compareDocumentPosition(i) & Node.DOCUMENT_POSITION_CONTAINED_BY;
		var o = t.compareDocumentPosition(e), s = i.compareDocumentPosition(e), c = o & Node.DOCUMENT_POSITION_CONTAINED_BY || s & Node.DOCUMENT_POSITION_CONTAINED_BY;
		return s = r && a && o & Node.DOCUMENT_POSITION_FOLLOWING && s & Node.DOCUMENT_POSITION_PRECEDING, t = r && t === e || a && i === e || c || s ? Node.DOCUMENT_POSITION_CONTAINED_BY : !r && t === e || !a && i === e ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : o, t & Node.DOCUMENT_POSITION_DISCONNECTED || t & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || Xp(t, this._fragmentFiber, n[0], n[n.length - 1], e) ? t : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
	};
	function Xp(e, t, n, r, i) {
		var a = Mt(i);
		if (e & Node.DOCUMENT_POSITION_CONTAINED_BY) {
			if (n = !!a) a: {
				for (; a !== null;) {
					if (a.tag === 7 && (a === t || a.alternate === t)) {
						n = !0;
						break a;
					}
					a = a.return;
				}
				n = !1;
			}
			return n;
		}
		if (e & Node.DOCUMENT_POSITION_CONTAINS) {
			if (a === null) return a = i.ownerDocument, i === a || i === a.documentElement || i === a.body;
			a: {
				for (a = t, t = p(t); a !== null;) {
					if (!(a.tag !== 5 && a.tag !== 3 && a.tag !== 27 || a !== t && a.alternate !== t)) {
						a = !0;
						break a;
					}
					a = a.return;
				}
				a = !1;
			}
			return a;
		}
		return e & Node.DOCUMENT_POSITION_PRECEDING ? ((t = !!a) && !(t = a === n) && (t = C(n, a, S), t === null ? t = !1 : (f(t, !0, b, a, n), a = v, v = null, t = a !== null)), t) : e & Node.DOCUMENT_POSITION_FOLLOWING ? ((t = !!a) && !(t = a === r) && (t = C(r, a, S), t === null ? t = !1 : (f(t, !0, x, a, r), a = v, y = v = null, t = a !== null)), t) : !1;
	}
	function Zp(e, t) {
		var n = e.ownerDocument.createRange();
		n.selectNodeContents(e), e = n.getBoundingClientRect(), window.scrollTo(window.scrollX + e.left, t ? window.scrollY + e.top : window.scrollY + e.bottom - window.innerHeight);
	}
	Fp.prototype.scrollIntoView = function(e) {
		if (typeof e == "object") throw Error(i(566));
		var t = [];
		f(this._fragmentFiber.child, !1, Hp, t, void 0, void 0);
		var n = !1 !== e;
		if (t.length === 0) {
			var r = h(this._fragmentFiber);
			if (r = n ? r[1] || r[0] || p(this._fragmentFiber) : r[0] || r[1], r === null) return;
			if (r.tag === 6) {
				e = _(r), Zp(e, n);
				return;
			}
			if (r = _(r), r.nodeType !== 9) {
				if (r.nodeType === 11) {
					n = "host" in r ? r.host : null, n !== null && n.scrollIntoView(e);
					return;
				}
				r.scrollIntoView(e);
			}
		}
		for (r = n ? t.length - 1 : 0; r !== (n ? -1 : t.length);) {
			var a = t[r];
			a.tag === 6 ? (a = _(a), Zp(a, n)) : _(a).scrollIntoView(e), r += n ? -1 : 1;
		}
	};
	function Qp(e, t) {
		return e = _(e), $p(e, t), !1;
	}
	function $p(e, t) {
		e.reactFragments ??= /* @__PURE__ */ new Set(), e.reactFragments.add(t);
	}
	function em(e, t) {
		var n = t._eventListeners;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = n[r];
			e.addEventListener(i.type, i.attachedListener, Rp(i.optionsOrUseCapture));
		}
		e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(n) {
			for (var r = 0, i = 0; i < Kp.length; i++) {
				var a = Kp[i];
				(a.fragmentInstance !== t || a.observer !== n || a.instance !== e) && (Kp[r++] = a);
			}
			Kp.length = r, n.observe(e);
		}), $p(e, t));
	}
	function tm(e, t) {
		var n = t._eventListeners;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var i = n[r];
			e.removeEventListener(i.type, i.attachedListener, Rp(i.optionsOrUseCapture));
		}
		e.nodeType !== 3 && (n = t._observers, n !== null && n.forEach(function(n) {
			typeof n.rootMargin == "string" ? Jp(t, n, e) : n.unobserve(e);
		}), e.reactFragments != null && e.reactFragments.delete(t));
	}
	function nm(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					nm(n), jt(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function rm(e, t, n, r) {
		for (; e.nodeType === 1;) {
			var i = n;
			if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
				if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
			} else if (!r) {
				if (t === "input" && e.type === "hidden") {
					var a = i.name == null ? null : "" + i.name;
					if (i.type === "hidden" && e.getAttribute("name") === a) return e;
				} else return e;
			} else if (!e[kt]) switch (t) {
				case "meta":
					if (!e.hasAttribute("itemprop")) break;
					return e;
				case "link":
					if (a = e.getAttribute("rel"), a === "stylesheet" && e.hasAttribute("data-precedence") || a !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
					return e;
				case "style":
					if (e.hasAttribute("data-precedence")) break;
					return e;
				case "script":
					if (a = e.getAttribute("src"), (a !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
					return e;
				default: return e;
			}
			if (e = lm(e.nextSibling), e === null) break;
		}
		return null;
	}
	function im(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = lm(e.nextSibling), e === null)) return null;
		return e;
	}
	function am(e, t) {
		for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = lm(e.nextSibling), e === null)) return null;
		return e;
	}
	function om(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function sm(e) {
		return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
	}
	function cm(e, t) {
		var n = e.ownerDocument;
		if (e.data === "$~") e._reactRetry = t;
		else if (e.data !== "$?" || n.readyState !== "loading") t();
		else {
			var r = function() {
				t(), n.removeEventListener("DOMContentLoaded", r);
			};
			n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
		}
	}
	function lm(e) {
		for (; e != null; e = e.nextSibling) {
			var t = e.nodeType;
			if (t === 1 || t === 3) break;
			if (t === 8) {
				if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
				if (t === "/$" || t === "/&") return null;
			}
		}
		return e;
	}
	var um = null;
	function dm(e) {
		e = e.nextSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "/$" || n === "/&") {
					if (t === 0) return lm(e.nextSibling);
					t--;
				} else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function fm(e) {
		e = e.previousSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
					if (t === 0) return e;
					t--;
				} else n !== "/$" && n !== "/&" || t++;
			}
			e = e.previousSibling;
		}
		return null;
	}
	function pm(e, t) {
		function n() {
			r = !0;
		}
		if (e.ownerDocument.activeElement === e) return !0;
		var r = !1;
		try {
			e.ownerDocument.addEventListener("focus", n, !0), (e.focus || HTMLElement.prototype.focus).call(e, t);
		} finally {
			e.ownerDocument.removeEventListener("focus", n, !0);
		}
		return r;
	}
	function mm(e) {
		yp(function() {
			yp(function(t) {
				return e(t);
			});
		});
	}
	function hm(e, t, n) {
		switch (t = lp(n), e) {
			case "html":
				if (e = t.documentElement, !e) throw Error(i(452));
				return e;
			case "head":
				if (e = t.head, !e) throw Error(i(453));
				return e;
			case "body":
				if (e = t.body, !e) throw Error(i(454));
				return e;
			default: throw Error(i(451));
		}
	}
	function gm(e, t, n) {
		for (var r in n) {
			var i = n[r];
			n.hasOwnProperty(r) && i != null && ep(e, t, r, null, rp, i);
		}
		n.dangerouslySetInnerHTML != null && (e.textContent = ""), e.onclick === hn && (e.onclick = null), jt(e);
	}
	function _m(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		jt(e);
	}
	var vm = /* @__PURE__ */ new Map(), ym = /* @__PURE__ */ new Set();
	function bm(e) {
		if (typeof e.getRootNode == "function") {
			var t = e.getRootNode();
			if (t.nodeType === 9 || t.nodeType === 11) return t;
		}
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	var xm = F.d;
	F.d = {
		f: Sm,
		r: Cm,
		D: Em,
		C: Dm,
		L: Om,
		m: km,
		X: jm,
		S: Am,
		M: Mm
	};
	function Sm() {
		var e = xm.f(), t = Ld();
		return e || t;
	}
	function Cm(e) {
		var t = Nt(e);
		t !== null && t.tag === 5 && t.type === "form" ? Xs(t) : xm.r(e);
	}
	var wm = typeof document > "u" ? null : document;
	function Tm(e, t, n) {
		var r = wm;
		if (r && typeof t == "string" && t) {
			var i = $t(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), ym.has(i) || (ym.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), np(t, "link", e), It(t), r.head.appendChild(t)));
		}
	}
	function Em(e) {
		xm.D(e), Tm("dns-prefetch", e, null);
	}
	function Dm(e, t) {
		xm.C(e, t), Tm("preconnect", e, t);
	}
	function Om(e, t, n) {
		xm.L(e, t, n);
		var r = wm;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + $t(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + $t(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + $t(n.imageSizes) + "\"]")) : i += "[href=\"" + $t(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = Pm(e);
					break;
				case "script": a = Rm(e);
			}
			if (!(vm.has(a) || (e = w({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), vm.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(Fm(a)) || t === "script" && r.querySelector(zm(a))))) {
				var o = r.createElement("link");
				np(o, "link", e), t === "style" && (o[At] = !0, o.onload = o.onerror = function() {
					Lt(o);
				}), It(o), r.head.appendChild(o);
			}
		}
	}
	function km(e, t) {
		xm.m(e, t);
		var n = wm;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + $t(r) + "\"][href=\"" + $t(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = Rm(e);
			}
			if (!vm.has(a) && (e = w({
				rel: "modulepreload",
				href: e
			}, t), vm.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(zm(a))) return;
				}
				r = n.createElement("link"), np(r, "link", e), It(r), n.head.appendChild(r);
			}
		}
	}
	function Am(e, t, n) {
		xm.S(e, t, n);
		var r = wm;
		if (r && e) {
			var i = Ft(r).hoistableStyles, a = Pm(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(Fm(a))) s.loading = 5;
				else {
					e = w({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = vm.get(a)) && Hm(e, n);
					var c = o = r.createElement("link");
					It(c), np(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, Vm(o, t, r);
				}
				o = {
					type: "stylesheet",
					instance: o,
					count: 1,
					state: s
				}, i.set(a, o);
			}
		}
	}
	function jm(e, t) {
		xm.X(e, t);
		var n = wm;
		if (n && e) {
			var r = Ft(n).hoistableScripts, i = Rm(e), a = r.get(i);
			a || (a = n.querySelector(zm(i)), a || (e = w({
				src: e,
				async: !0
			}, t), (t = vm.get(i)) && Um(e, t), a = n.createElement("script"), It(a), np(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Mm(e, t) {
		xm.M(e, t);
		var n = wm;
		if (n && e) {
			var r = Ft(n).hoistableScripts, i = Rm(e), a = r.get(i);
			a || (a = n.querySelector(zm(i)), a || (e = w({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = vm.get(i)) && Um(e, t), a = n.createElement("script"), It(a), np(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Nm(e, t, n, r) {
		var a = (a = Te.current) ? bm(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (n = Pm(n.href), t = Ft(a).hoistableStyles, r = t.get(n), r || (r = {
				type: "style",
				instance: null,
				count: 0,
				state: null
			}, t.set(n, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			case "link":
				if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
					e = Pm(n.href);
					var o = Ft(a).hoistableStyles, s = o.get(e);
					if (s || (a = a.ownerDocument || a, s = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, o.set(e, s), (o = a.querySelector(Fm(e))) ? o._p || (s.instance = o, s.state.loading = 5) : (o = vm.get(e), o || (o = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, vm.set(e, o)), Lm(a, e, o, s.state))), t && r === null) throw Error(i(528, ""));
					return s;
				}
				if (t && r !== null) throw Error(i(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (n = Rm(n), t = Ft(a).hoistableScripts, r = t.get(n), r || (r = {
				type: "script",
				instance: null,
				count: 0,
				state: null
			}, t.set(n, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			default: throw Error(i(444, e));
		}
	}
	function Pm(e) {
		return "href=\"" + $t(e) + "\"";
	}
	function Fm(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Im(e) {
		return w({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Lm(e, t, n, r) {
		if (t = e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]")) {
			if (!0 !== t[At]) {
				r.loading = 1;
				return;
			}
		} else t = e.createElement("link"), t[At] = !0, t.onload = t.onerror = Lt.bind(null, t), np(t, "link", n), It(t), e.head.appendChild(t);
		r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		});
	}
	function Rm(e) {
		return "[src=\"" + $t(e) + "\"]";
	}
	function zm(e) {
		return "script[async]" + e;
	}
	function Bm(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + $t(n.href) + "\"]");
				if (r) return t.instance = r, It(r), r;
				var a = w({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), It(r), np(r, "style", a), Vm(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Pm(n.href);
				var o = e.querySelector(Fm(a));
				if (o) return t.state.loading |= 4, t.instance = o, It(o), o;
				r = Im(n), (a = vm.get(a)) && Hm(r, a), o = (e.ownerDocument || e).createElement("link"), It(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), np(o, "link", r), t.state.loading |= 4, Vm(o, n.precedence, e), t.instance = o;
			case "script": return o = Rm(n.src), (a = e.querySelector(zm(o))) ? (t.instance = a, It(a), a) : (r = n, (a = vm.get(o)) && (r = w({}, n), Um(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), It(a), np(a, "link", r), e.head.appendChild(a), t.instance = a);
			case "void": return null;
			default: throw Error(i(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, Vm(r, n.precedence, e));
		return t.instance;
	}
	function Vm(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function Hm(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
	}
	function Um(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
	}
	var Wm = null;
	function Gm(e, t, n) {
		if (Wm === null) {
			var r = /* @__PURE__ */ new Map(), i = Wm = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = Wm, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
		if (r.has(e)) return r;
		for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
			var a = n[i];
			if (!(a[kt] || a[St] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
				var o = a.getAttribute(t) || "";
				o = e + o;
				var s = r.get(o);
				s ? s.push(a) : r.set(o, [a]);
			}
		}
		return r;
	}
	function Km(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function qm(e, t, n) {
		if (n === 1 || t.itemProp != null) return !1;
		switch (e) {
			case "meta":
			case "title": return !0;
			case "style":
				if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
				return !0;
			case "link":
				if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
				switch (t.rel) {
					case "stylesheet": return e = t.disabled, typeof t.precedence == "string" && e == null;
					default: return !0;
				}
			case "script": if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0;
		}
		return !1;
	}
	function Jm(e, t) {
		return e === "img" && t.src != null && t.src !== "" && t.onLoad == null && t.loading !== "lazy";
	}
	function Ym(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	function Xm(e) {
		return (e.width || 100) * (e.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * .25;
	}
	function Zm(e, t) {
		typeof t.decode == "function" && (e.imgCount++, t.complete || (e.imgBytes += Xm(t), e.suspenseyImages.push(t)), e = rh.bind(e), t.decode().then(e, e));
	}
	function Qm(e, t, n, r) {
		if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
			if (n.instance === null) {
				var i = Pm(r.href), a = t.querySelector(Fm(i));
				if (a) {
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = nh.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, It(a);
					return;
				}
				a = t.ownerDocument || t, r = Im(r), (i = vm.get(i)) && Hm(r, i), a = a.createElement("link"), It(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), np(a, "link", r), n.instance = a;
			}
			e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = nh.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
		}
	}
	var $m = 0;
	function eh(e, t) {
		return e.stylesheets && e.count === 0 && ah(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
			var r = setTimeout(function() {
				if (e.stylesheets && ah(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4 + t);
			0 < e.imgBytes && $m === 0 && ($m = 62500 * op());
			var i = setTimeout(function() {
				if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && ah(e, e.stylesheets), e.unsuspend)) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, (e.imgBytes > $m ? 50 : 800) + t);
			return e.unsuspend = n, function() {
				e.unsuspend = null, clearTimeout(r), clearTimeout(i);
			};
		} : null;
	}
	function th(e) {
		if (e.count === 0 && (e.imgCount === 0 || !e.waitingForImages)) {
			if (e.stylesheets) ah(e, e.stylesheets);
			else if (e.unsuspend) {
				var t = e.unsuspend;
				e.unsuspend = null, t();
			}
		}
	}
	function nh() {
		this.count--, th(this);
	}
	function rh() {
		this.imgCount--, th(this);
	}
	var ih = null;
	function ah(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, ih = /* @__PURE__ */ new Map(), t.forEach(oh, e), ih = null, nh.call(e));
	}
	function oh(e, t) {
		if (!(t.state.loading & 4)) {
			var n = ih.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), ih.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = nh.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var sh = {
		$$typeof: j,
		Provider: null,
		Consumer: null,
		_currentValue: _e,
		_currentValue2: _e,
		_threadCount: 0
	};
	function ch(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = ft(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ft(0), this.hiddenUpdates = ft(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function lh(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new ch(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = wi(3, null, null, t), e.current = a, a.stateNode = e, t = wa(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, oo(a), e;
	}
	function uh(e) {
		return e ? (e = Si, e) : Si;
	}
	function dh(e, t, n, r, i, a) {
		i = uh(i), r.context === null ? r.context = i : r.pendingContext = i, r = co(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = lo(e, r, t), n !== null && (Md(n, e, t), uo(n, e, t));
	}
	function fh(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function ph(e, t) {
		fh(e, t), (e = e.alternate) && fh(e, t);
	}
	function mh(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = yi(e, 67108864);
			t !== null && Md(t, e, 67108864), ph(e, 67108864);
		}
	}
	function hh(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = kd();
			t = _t(t);
			var n = yi(e, t);
			n !== null && Md(n, e, t), ph(e, t);
		}
	}
	var gh = !0;
	function _h(e, t, n, r) {
		var i = P.T;
		P.T = null;
		var a = F.p;
		try {
			F.p = 2, yh(e, t, n, r);
		} finally {
			F.p = a, P.T = i;
		}
	}
	function vh(e, t, n, r) {
		var i = P.T;
		P.T = null;
		var a = F.p;
		try {
			F.p = 8, yh(e, t, n, r);
		} finally {
			F.p = a, P.T = i;
		}
	}
	function yh(e, t, n, r) {
		if (gh) {
			var i = bh(r);
			if (i === null) Gf(e, t, r, xh, n), Mh(e, r);
			else if (Ph(i, e, t, n, r)) r.stopPropagation();
			else if (Mh(e, r), t & 4 && -1 < jh.indexOf(e)) {
				for (; i !== null;) {
					var a = Nt(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = st(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - et(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									Tf(a), !(X & 6) && (md = Ue() + 500, Ef(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = yi(a, 2), s !== null && Md(s, a, 2), Ld(), ph(a, 2);
					}
					if (a = bh(r), a === null && Gf(e, t, r, xh, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else Gf(e, t, r, null, n);
		}
	}
	function bh(e) {
		return e = _n(e), Sh(e);
	}
	var xh = null;
	function Sh(e) {
		if (xh = null, e = Mt(e), e !== null) {
			var t = o(e);
			if (t === null) e = null;
			else {
				var n = t.tag;
				if (n === 13) {
					if (e = s(t), e !== null) return e;
					e = null;
				} else if (n === 31) {
					if (e = c(t), e !== null) return e;
					e = null;
				} else if (n === 3) {
					if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
					e = null;
				} else t !== e && (e = null);
			}
		}
		return xh = e, null;
	}
	function Ch(e) {
		switch (e) {
			case "beforetoggle":
			case "cancel":
			case "click":
			case "close":
			case "contextmenu":
			case "copy":
			case "cut":
			case "auxclick":
			case "dblclick":
			case "dragend":
			case "dragstart":
			case "drop":
			case "focusin":
			case "focusout":
			case "input":
			case "invalid":
			case "keydown":
			case "keypress":
			case "keyup":
			case "mousedown":
			case "mouseup":
			case "paste":
			case "pause":
			case "play":
			case "pointercancel":
			case "pointerdown":
			case "pointerup":
			case "ratechange":
			case "reset":
			case "seeked":
			case "submit":
			case "toggle":
			case "touchcancel":
			case "touchend":
			case "touchstart":
			case "volumechange":
			case "change":
			case "selectionchange":
			case "textInput":
			case "compositionstart":
			case "compositionend":
			case "compositionupdate":
			case "beforeblur":
			case "afterblur":
			case "beforeinput":
			case "blur":
			case "fullscreenchange":
			case "fullscreenerror":
			case "focus":
			case "hashchange":
			case "popstate":
			case "select":
			case "selectstart": return 2;
			case "drag":
			case "dragenter":
			case "dragexit":
			case "dragleave":
			case "dragover":
			case "mousemove":
			case "mouseout":
			case "mouseover":
			case "pointermove":
			case "pointerout":
			case "pointerover":
			case "resize":
			case "scroll":
			case "touchmove":
			case "wheel":
			case "mouseenter":
			case "mouseleave":
			case "pointerenter":
			case "pointerleave": return 8;
			case "message": switch (We()) {
				case Ge: return 2;
				case Ke: return 8;
				case qe:
				case Je: return 32;
				case Ye: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var wh = !1, Th = null, Eh = null, Dh = null, Oh = /* @__PURE__ */ new Map(), kh = /* @__PURE__ */ new Map(), Ah = [], jh = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function Mh(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				Th = null;
				break;
			case "dragenter":
			case "dragleave":
				Eh = null;
				break;
			case "mouseover":
			case "mouseout":
				Dh = null;
				break;
			case "pointerover":
			case "pointerout":
				Oh.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": kh.delete(t.pointerId);
		}
	}
	function Nh(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = Nt(t), t !== null && mh(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Ph(e, t, n, r, i) {
		switch (t) {
			case "focusin": return Th = Nh(Th, e, t, n, r, i), !0;
			case "dragenter": return Eh = Nh(Eh, e, t, n, r, i), !0;
			case "mouseover": return Dh = Nh(Dh, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return Oh.set(a, Nh(Oh.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, kh.set(a, Nh(kh.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Fh(e) {
		var t = Mt(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, bt(e.priority, function() {
							hh(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, bt(e.priority, function() {
							hh(n);
						});
						return;
					}
				} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
					e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
					return;
				}
			}
		}
		e.blockedOn = null;
	}
	function Ih(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = bh(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				gn = r, n.target.dispatchEvent(r), gn = null;
			} else return t = Nt(n), t !== null && mh(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function Lh(e, t, n) {
		Ih(e) && n.delete(t);
	}
	function Rh() {
		wh = !1, Th !== null && Ih(Th) && (Th = null), Eh !== null && Ih(Eh) && (Eh = null), Dh !== null && Ih(Dh) && (Dh = null), Oh.forEach(Lh), kh.forEach(Lh);
	}
	function zh(e, n) {
		e.blockedOn === n && (e.blockedOn = null, wh || (wh = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, Rh)));
	}
	var Bh = null;
	function Vh(e) {
		Bh !== e && (Bh = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			Bh === e && (Bh = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (Sh(r || n) === null) continue;
					break;
				}
				var a = Nt(n);
				a !== null && (e.splice(t, 3), t -= 3, Js(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function Hh(e) {
		function t(t) {
			return zh(t, e);
		}
		Th !== null && zh(Th, e), Eh !== null && zh(Eh, e), Dh !== null && zh(Dh, e), Oh.forEach(t), kh.forEach(t);
		for (var n = 0; n < Ah.length; n++) {
			var r = Ah[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < Ah.length && (n = Ah[0], n.blockedOn === null);) Fh(n), n.blockedOn === null && Ah.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[Ct] || null;
			if (typeof a == "function") o || Vh(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[Ct] || null) s = o.formAction;
					else if (Sh(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Vh(n);
			}
		}
	}
	function Uh() {
		function e(e) {
			e.canIntercept && e.info === "react-transition" && e.intercept({
				handler: function() {
					return new Promise(function(e) {
						return i = e;
					});
				},
				focusReset: "manual",
				scroll: "manual"
			});
		}
		function t() {
			i !== null && (i(), i = null), r || setTimeout(n, 20);
		}
		function n() {
			if (!r && !navigation.transition) {
				var e = navigation.currentEntry;
				e && e.url != null && navigation.navigate(e.url, {
					state: e.getState(),
					info: "react-transition",
					history: "replace"
				});
			}
		}
		if (typeof navigation == "object") {
			var r = !1, i = null;
			return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
				r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
			};
		}
	}
	function Wh(e) {
		this._internalRoot = e;
	}
	Gh.prototype.render = Wh.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(i(409));
		var n = t.current;
		dh(n, kd(), e, t, null, null);
	}, Gh.prototype.unmount = Wh.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			dh(e.current, 2, null, e, null, null), Ld(), t[wt] = null;
		}
	};
	function Gh(e) {
		this._internalRoot = e;
	}
	Gh.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = yt();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < Ah.length && t !== 0 && t < Ah[n].priority; n++);
			Ah.splice(n, 0, e), n === 0 && Fh(e);
		}
	};
	var Kh = n.version;
	if (Kh !== "19.3.1") throw Error(i(527, Kh, "19.3.1"));
	F.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = u(t), e = e === null ? null : d(e), e = e === null ? null : e.stateNode, e;
	};
	var qh = {
		bundleType: 0,
		version: "19.3.1",
		rendererPackageName: "react-dom",
		currentDispatcherRef: P,
		reconcilerVersion: "19.3.1"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var Jh = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!Jh.isDisabled && Jh.supportsFiber) try {
			I = Jh.inject(qh), Qe = Jh;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = _c, s = vc, c = yc;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = lh(e, 1, !1, null, null, n, r, null, o, s, c, Uh), e[wt] = t.current, Uf(e), new Wh(t);
	};
})), le = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE == "function") try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = ce();
})), N = /* @__PURE__ */ c(ae(), 1), ue = le(), de = (e, t) => {
	let n = Array(e.length + t.length);
	for (let t = 0; t < e.length; t++) n[t] = e[t];
	for (let r = 0; r < t.length; r++) n[e.length + r] = t[r];
	return n;
}, fe = (e, t) => ({
	classGroupId: e,
	validator: t
}), pe = (e = /* @__PURE__ */ new Map(), t = null, n) => ({
	nextPart: e,
	validators: t,
	classGroupId: n
}), me = "-", he = [], ge = "arbitrary..", P = (e) => {
	let t = ve(e), { conflictingClassGroups: n, conflictingClassGroupModifiers: r } = e;
	return {
		getClassGroupId: (e) => {
			if (e.startsWith("[") && e.endsWith("]")) return _e(e);
			let n = e.split(me);
			return F(n, +(n[0] === "" && n.length > 1), t);
		},
		getConflictingClassGroupIds: (e, t) => {
			if (t) {
				let t = r[e], i = n[e];
				return t ? i ? de(i, t) : t : i || he;
			}
			return n[e] || he;
		}
	};
}, F = (e, t, n) => {
	if (e.length - t === 0) return n.classGroupId;
	let r = e[t], i = n.nextPart.get(r);
	if (i) {
		let n = F(e, t + 1, i);
		if (n) return n;
	}
	let a = n.validators;
	if (a === null) return;
	let o = t === 0 ? e.join(me) : e.slice(t).join(me), s = a.length;
	for (let e = 0; e < s; e++) {
		let t = a[e];
		if (t.validator(o)) return t.classGroupId;
	}
}, _e = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
	let t = e.slice(1, -1), n = t.indexOf(":"), r = t.slice(0, n);
	return r ? ge + r : void 0;
})(), ve = (e) => {
	let { theme: t, classGroups: n } = e;
	return ye(n, t);
}, ye = (e, t) => {
	let n = pe();
	for (let r in e) {
		let i = e[r];
		be(i, n, r, t);
	}
	return n;
}, be = (e, t, n, r) => {
	let i = e.length;
	for (let a = 0; a < i; a++) {
		let i = e[a];
		xe(i, t, n, r);
	}
}, xe = (e, t, n, r) => {
	typeof e == "string" ? Se(e, t, n) : typeof e == "function" ? Ce(e, t, n, r) : we(e, t, n, r);
}, Se = (e, t, n) => {
	let r = e === "" ? t : Te(t, e);
	r.classGroupId = n;
}, Ce = (e, t, n, r) => {
	Ee(e) ? be(e(r), t, n, r) : (t.validators === null && (t.validators = []), t.validators.push(fe(n, e)));
}, we = (e, t, n, r) => {
	let i = Object.entries(e), a = i.length;
	for (let e = 0; e < a; e++) {
		let [a, o] = i[e];
		be(o, Te(t, a), n, r);
	}
}, Te = (e, t) => {
	let n = e, r = t.split(me), i = r.length;
	for (let e = 0; e < i; e++) {
		let t = r[e], i = n.nextPart.get(t);
		i || (i = pe(), n.nextPart.set(t, i)), n = i;
	}
	return n;
}, Ee = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, De = (e) => {
	if (e < 1) return {
		get: () => void 0,
		set: () => {}
	};
	let t = 0, n = Object.create(null), r = Object.create(null), i = (i, a) => {
		n[i] = a, t++, t > e && (t = 0, r = n, n = Object.create(null));
	};
	return {
		get(e) {
			let t = n[e];
			if (t !== void 0) return t;
			if ((t = r[e]) !== void 0) return i(e, t), t;
		},
		set(e, t) {
			e in n ? n[e] = t : i(e, t);
		}
	};
}, Oe = "!", ke = ":", Ae = [], je = (e, t, n, r, i) => ({
	modifiers: e,
	hasImportantModifier: t,
	baseClassName: n,
	maybePostfixModifierPosition: r,
	isExternal: i
}), Me = (e) => {
	let { prefix: t, experimentalParseClassName: n } = e, r = (e) => {
		let t = [], n = 0, r = 0, i = 0, a, o = e.length;
		for (let s = 0; s < o; s++) {
			let o = e[s];
			if (n === 0 && r === 0) {
				if (o === ke) {
					t.push(e.slice(i, s)), i = s + 1;
					continue;
				}
				if (o === "/") {
					a = s;
					continue;
				}
			}
			o === "[" ? n++ : o === "]" ? n-- : o === "(" ? r++ : o === ")" && r--;
		}
		let s = t.length === 0 ? e : e.slice(i), c = s, l = !1;
		s.endsWith(Oe) ? (c = s.slice(0, -1), l = !0) : s.startsWith(Oe) && (c = s.slice(1), l = !0);
		let u = a && a > i ? a - i : void 0;
		return je(t, l, c, u);
	};
	if (t) {
		let e = t + ke, n = r;
		r = (t) => t.startsWith(e) ? n(t.slice(e.length)) : je(Ae, !1, t, void 0, !0);
	}
	if (n) {
		let e = r;
		r = (t) => n({
			className: t,
			parseClassName: e
		});
	}
	return r;
}, Ne = (e) => {
	let t = /* @__PURE__ */ new Map();
	return e.orderSensitiveModifiers.forEach((e, n) => {
		t.set(e, 1e6 + n);
	}), (e) => {
		let n = [], r = [];
		for (let i = 0; i < e.length; i++) {
			let a = e[i], o = a[0] === "[", s = t.has(a);
			o || s ? (r.length > 0 && (r.sort(), n.push(...r), r = []), n.push(a)) : r.push(a);
		}
		return r.length > 0 && (r.sort(), n.push(...r)), n;
	};
}, Pe = (e) => ({
	cache: De(e.cacheSize),
	parseClassName: Me(e),
	sortModifiers: Ne(e),
	postfixLookupClassGroupIds: Fe(e),
	...P(e)
}), Fe = (e) => {
	let t = Object.create(null), n = e.postfixLookupClassGroups;
	if (n) for (let e = 0; e < n.length; e++) t[n[e]] = !0;
	return t;
}, Ie = /\s+/, Le = (e, t) => {
	let { parseClassName: n, getClassGroupId: r, getConflictingClassGroupIds: i, sortModifiers: a, postfixLookupClassGroupIds: o } = t, s = [], c = e.trim().split(Ie), l = "";
	for (let e = c.length - 1; e >= 0; --e) {
		let t = c[e], { isExternal: u, modifiers: d, hasImportantModifier: f, baseClassName: p, maybePostfixModifierPosition: m } = n(t);
		if (u) {
			l = t + (l.length > 0 ? " " + l : l);
			continue;
		}
		let h = !!m, g;
		if (h) {
			g = r(p.substring(0, m));
			let e = g && o[g] ? r(p) : void 0;
			e && e !== g && (g = e, h = !1);
		} else g = r(p);
		if (!g) {
			if (!h || (g = r(p), !g)) {
				l = t + (l.length > 0 ? " " + l : l);
				continue;
			}
			h = !1;
		}
		let _ = d.length === 0 ? "" : d.length === 1 ? d[0] : a(d).join(":"), v = f ? _ + Oe : _, y = v + g;
		if (s.indexOf(y) > -1) continue;
		s.push(y);
		let b = i(g, h);
		for (let e = 0; e < b.length; ++e) {
			let t = b[e];
			s.push(v + t);
		}
		l = t + (l.length > 0 ? " " + l : l);
	}
	return l;
}, Re = (...e) => {
	let t = 0, n, r, i = "";
	for (; t < e.length;) (n = e[t++]) && (r = ze(n)) && (i && (i += " "), i += r);
	return i;
}, ze = (e) => {
	if (typeof e == "string") return e;
	let t, n = "";
	for (let r = 0; r < e.length; r++) e[r] && (t = ze(e[r])) && (n && (n += " "), n += t);
	return n;
}, Be = (e, ...t) => {
	let n, r, i, a, o = (o) => (n = Pe(t.reduce((e, t) => t(e), e())), r = n.cache.get, i = n.cache.set, a = s, s(o)), s = (e) => {
		let t = r(e);
		if (t) return t;
		let a = Le(e, n);
		return i(e, a), a;
	};
	return a = o, (...e) => a(Re(...e));
}, Ve = [], He = (e) => {
	let t = (t) => t[e] || Ve;
	return t.isThemeGetter = !0, t.themeKey = e, t;
}, Ue = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, We = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Ge = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, Ke = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, qe = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Je = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix|color|light-dark)\(.+\)$/, Ye = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Xe = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Ze = (e) => Ge.test(e), I = (e) => !!e && !Number.isNaN(Number(e)), Qe = (e) => !!e && Number.isInteger(Number(e)), $e = (e) => e.endsWith("%") && I(e.slice(0, -1)), et = (e) => Ke.test(e), tt = () => !0, nt = (e) => qe.test(e) && !Je.test(e), rt = () => !1, it = (e) => Ye.test(e), at = (e) => Xe.test(e), ot = (e) => !L(e) && !R(e), st = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), ct = (e) => Ct(e, Dt, rt), L = (e) => Ue.test(e), lt = (e) => Ct(e, Ot, nt), ut = (e) => Ct(e, kt, I), dt = (e) => Ct(e, jt, tt), ft = (e) => Ct(e, At, rt), pt = (e) => Ct(e, Tt, rt), mt = (e) => Ct(e, Et, at), ht = (e) => Ct(e, Mt, it), R = (e) => We.test(e), gt = (e) => wt(e, Ot), _t = (e) => wt(e, At), vt = (e) => wt(e, Tt), yt = (e) => wt(e, Dt), bt = (e) => wt(e, Et), xt = (e) => wt(e, Mt, !0), St = (e) => wt(e, jt, !0), Ct = (e, t, n) => {
	let r = Ue.exec(e);
	return r ? r[1] ? t(r[1]) : n(r[2]) : !1;
}, wt = (e, t, n = !1) => {
	let r = We.exec(e);
	return r ? r[1] ? t(r[1]) : n : !1;
}, Tt = (e) => e === "position" || e === "percentage", Et = (e) => e === "image" || e === "url", Dt = (e) => e === "length" || e === "size" || e === "bg-size", Ot = (e) => e === "length", kt = (e) => e === "number", At = (e) => e === "family-name", jt = (e) => e === "number" || e === "weight", Mt = (e) => e === "shadow", Nt = () => {
	let e = He("color"), t = He("font"), n = He("text"), r = He("font-weight"), i = He("tracking"), a = He("leading"), o = He("breakpoint"), s = He("container"), c = He("spacing"), l = He("radius"), u = He("shadow"), d = He("inset-shadow"), f = He("text-shadow"), p = He("drop-shadow"), m = He("blur"), h = He("perspective"), g = He("aspect"), _ = He("ease"), v = He("animate"), y = () => [
		"auto",
		"avoid",
		"all",
		"avoid-page",
		"page",
		"left",
		"right",
		"column"
	], b = () => [
		"center",
		"top",
		"bottom",
		"left",
		"right",
		"top-left",
		"left-top",
		"top-right",
		"right-top",
		"bottom-right",
		"right-bottom",
		"bottom-left",
		"left-bottom"
	], x = () => [
		...b(),
		R,
		L
	], S = () => [
		"auto",
		"hidden",
		"clip",
		"visible",
		"scroll"
	], C = () => [
		"auto",
		"contain",
		"none"
	], w = () => [
		R,
		L,
		c
	], T = () => [
		Ze,
		"full",
		"auto",
		...w()
	], E = () => [
		Qe,
		"none",
		"subgrid",
		R,
		L
	], D = () => [
		"auto",
		{ span: [
			"full",
			Qe,
			R,
			L
		] },
		Qe,
		R,
		L
	], O = () => [
		Qe,
		"auto",
		R,
		L
	], k = () => [
		"auto",
		"min",
		"max",
		"fr",
		R,
		L
	], ee = () => [
		"start",
		"end",
		"center",
		"between",
		"around",
		"evenly",
		"stretch",
		"baseline",
		"center-safe",
		"end-safe"
	], A = () => [
		"start",
		"end",
		"center",
		"stretch",
		"center-safe",
		"end-safe"
	], j = () => ["auto", ...w()], te = () => [
		Ze,
		"auto",
		"full",
		"dvw",
		"dvh",
		"lvw",
		"lvh",
		"svw",
		"svh",
		"min",
		"max",
		"fit",
		...w()
	], ne = () => [
		s,
		Ze,
		"screen",
		"full",
		"dvw",
		"lvw",
		"svw",
		"min",
		"max",
		"fit",
		...w()
	], re = () => [
		Ze,
		"screen",
		"full",
		"lh",
		"dvh",
		"lvh",
		"svh",
		"min",
		"max",
		"fit",
		...w()
	], M = () => [
		e,
		R,
		L
	], ie = () => [
		...b(),
		vt,
		pt,
		{ position: [R, L] }
	], ae = () => ["no-repeat", { repeat: [
		"",
		"x",
		"y",
		"space",
		"round"
	] }], oe = () => [
		"auto",
		"cover",
		"contain",
		yt,
		ct,
		{ size: [R, L] }
	], se = () => [
		$e,
		gt,
		lt
	], ce = () => [
		"",
		"none",
		"full",
		l,
		R,
		L
	], le = () => [
		"",
		I,
		gt,
		lt
	], N = () => [
		"solid",
		"dashed",
		"dotted",
		"double"
	], ue = () => [
		"normal",
		"multiply",
		"screen",
		"overlay",
		"darken",
		"lighten",
		"color-dodge",
		"color-burn",
		"hard-light",
		"soft-light",
		"difference",
		"exclusion",
		"hue",
		"saturation",
		"color",
		"luminosity"
	], de = () => [
		I,
		$e,
		vt,
		pt
	], fe = () => [
		"",
		"none",
		m,
		R,
		L
	], pe = () => [
		"none",
		I,
		R,
		L
	], me = () => [
		"none",
		I,
		R,
		L
	], he = () => [
		I,
		R,
		L
	], ge = () => [
		Ze,
		"full",
		...w()
	];
	return {
		cacheSize: 500,
		theme: {
			animate: [
				"spin",
				"ping",
				"pulse",
				"bounce"
			],
			aspect: ["video"],
			blur: [et],
			breakpoint: [et],
			color: [tt],
			container: [et],
			"drop-shadow": [et],
			ease: [
				"in",
				"out",
				"in-out"
			],
			font: [ot],
			"font-weight": [
				"thin",
				"extralight",
				"light",
				"normal",
				"medium",
				"semibold",
				"bold",
				"extrabold",
				"black"
			],
			"inset-shadow": [et],
			leading: [
				"none",
				"tight",
				"snug",
				"normal",
				"relaxed",
				"loose"
			],
			perspective: [
				"dramatic",
				"near",
				"normal",
				"midrange",
				"distant",
				"none"
			],
			radius: [et],
			shadow: [et],
			spacing: ["px", I],
			text: [et],
			"text-shadow": [et],
			tracking: [
				"tighter",
				"tight",
				"normal",
				"wide",
				"wider",
				"widest"
			]
		},
		classGroups: {
			aspect: [{ aspect: [
				"auto",
				"square",
				Ze,
				L,
				R,
				g
			] }],
			container: ["container"],
			"container-type": [{ "@container": [
				"",
				"normal",
				"size",
				R,
				L
			] }],
			"container-named": [st],
			columns: [{ columns: [
				I,
				"auto",
				L,
				R,
				s
			] }],
			"break-after": [{ "break-after": y() }],
			"break-before": [{ "break-before": y() }],
			"break-inside": [{ "break-inside": [
				"auto",
				"avoid",
				"avoid-page",
				"avoid-column"
			] }],
			"box-decoration": [{ "box-decoration": ["slice", "clone"] }],
			box: [{ box: ["border", "content"] }],
			display: [
				"block",
				"inline-block",
				"inline",
				"flex",
				"inline-flex",
				"table",
				"inline-table",
				"table-caption",
				"table-cell",
				"table-column",
				"table-column-group",
				"table-footer-group",
				"table-header-group",
				"table-row-group",
				"table-row",
				"flow-root",
				"grid",
				"inline-grid",
				"contents",
				"list-item",
				"hidden"
			],
			sr: ["sr-only", "not-sr-only"],
			float: [{ float: [
				"right",
				"left",
				"none",
				"start",
				"end"
			] }],
			clear: [{ clear: [
				"left",
				"right",
				"both",
				"none",
				"start",
				"end"
			] }],
			isolation: ["isolate", "isolation-auto"],
			"object-fit": [{ object: [
				"contain",
				"cover",
				"fill",
				"none",
				"scale-down"
			] }],
			"object-position": [{ object: x() }],
			overflow: [{ overflow: S() }],
			"overflow-x": [{ "overflow-x": S() }],
			"overflow-y": [{ "overflow-y": S() }],
			overscroll: [{ overscroll: C() }],
			"overscroll-x": [{ "overscroll-x": C() }],
			"overscroll-y": [{ "overscroll-y": C() }],
			position: [
				"static",
				"fixed",
				"absolute",
				"relative",
				"sticky"
			],
			inset: [{ inset: T() }],
			"inset-x": [{ "inset-x": T() }],
			"inset-y": [{ "inset-y": T() }],
			start: [{
				"inset-s": T(),
				start: T()
			}],
			end: [{
				"inset-e": T(),
				end: T()
			}],
			"inset-bs": [{ "inset-bs": T() }],
			"inset-be": [{ "inset-be": T() }],
			top: [{ top: T() }],
			right: [{ right: T() }],
			bottom: [{ bottom: T() }],
			left: [{ left: T() }],
			visibility: [
				"visible",
				"invisible",
				"collapse"
			],
			z: [{ z: [
				Qe,
				"auto",
				R,
				L
			] }],
			basis: [{ basis: [
				Ze,
				"full",
				"auto",
				s,
				...w()
			] }],
			"flex-direction": [{ flex: [
				"row",
				"row-reverse",
				"col",
				"col-reverse"
			] }],
			"flex-wrap": [{ flex: [
				"nowrap",
				"wrap",
				"wrap-reverse"
			] }],
			flex: [{ flex: [
				I,
				Ze,
				"auto",
				"initial",
				"none",
				L
			] }],
			grow: [{ grow: [
				"",
				I,
				R,
				L
			] }],
			shrink: [{ shrink: [
				"",
				I,
				R,
				L
			] }],
			order: [{ order: [
				Qe,
				"first",
				"last",
				"none",
				R,
				L
			] }],
			"grid-cols": [{ "grid-cols": E() }],
			"col-start-end": [{ col: D() }],
			"col-start": [{ "col-start": O() }],
			"col-end": [{ "col-end": O() }],
			"grid-rows": [{ "grid-rows": E() }],
			"row-start-end": [{ row: D() }],
			"row-start": [{ "row-start": O() }],
			"row-end": [{ "row-end": O() }],
			"grid-flow": [{ "grid-flow": [
				"row",
				"col",
				"dense",
				"row-dense",
				"col-dense"
			] }],
			"auto-cols": [{ "auto-cols": k() }],
			"auto-rows": [{ "auto-rows": k() }],
			gap: [{ gap: w() }],
			"gap-x": [{ "gap-x": w() }],
			"gap-y": [{ "gap-y": w() }],
			"justify-content": [{ justify: [...ee(), "normal"] }],
			"justify-items": [{ "justify-items": [...A(), "normal"] }],
			"justify-self": [{ "justify-self": ["auto", ...A()] }],
			"align-content": [{ content: ["normal", ...ee()] }],
			"align-items": [{ items: [...A(), { baseline: ["", "last"] }] }],
			"align-self": [{ self: [
				"auto",
				...A(),
				{ baseline: ["", "last"] }
			] }],
			"place-content": [{ "place-content": ee() }],
			"place-items": [{ "place-items": [...A(), "baseline"] }],
			"place-self": [{ "place-self": ["auto", ...A()] }],
			p: [{ p: w() }],
			px: [{ px: w() }],
			py: [{ py: w() }],
			ps: [{ ps: w() }],
			pe: [{ pe: w() }],
			pbs: [{ pbs: w() }],
			pbe: [{ pbe: w() }],
			pt: [{ pt: w() }],
			pr: [{ pr: w() }],
			pb: [{ pb: w() }],
			pl: [{ pl: w() }],
			m: [{ m: j() }],
			mx: [{ mx: j() }],
			my: [{ my: j() }],
			ms: [{ ms: j() }],
			me: [{ me: j() }],
			mbs: [{ mbs: j() }],
			mbe: [{ mbe: j() }],
			mt: [{ mt: j() }],
			mr: [{ mr: j() }],
			mb: [{ mb: j() }],
			ml: [{ ml: j() }],
			"space-x": [{ "space-x": w() }],
			"space-x-reverse": ["space-x-reverse"],
			"space-y": [{ "space-y": w() }],
			"space-y-reverse": ["space-y-reverse"],
			size: [{ size: te() }],
			"inline-size": [{ inline: ["auto", ...ne()] }],
			"min-inline-size": [{ "min-inline": ["auto", ...ne()] }],
			"max-inline-size": [{ "max-inline": ["none", ...ne()] }],
			"block-size": [{ block: ["auto", ...re()] }],
			"min-block-size": [{ "min-block": ["auto", ...re()] }],
			"max-block-size": [{ "max-block": ["none", ...re()] }],
			w: [{ w: [
				s,
				"screen",
				...te()
			] }],
			"min-w": [{ "min-w": [
				s,
				"screen",
				"none",
				...te()
			] }],
			"max-w": [{ "max-w": [
				s,
				"screen",
				"none",
				"prose",
				{ screen: [o] },
				...te()
			] }],
			h: [{ h: [
				"screen",
				"lh",
				...te()
			] }],
			"min-h": [{ "min-h": [
				"screen",
				"lh",
				"none",
				...te()
			] }],
			"max-h": [{ "max-h": [
				"screen",
				"lh",
				"none",
				...te()
			] }],
			"font-size": [{ text: [
				"base",
				n,
				gt,
				lt
			] }],
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			"font-style": ["italic", "not-italic"],
			"font-weight": [{ font: [
				r,
				St,
				dt
			] }],
			"font-stretch": [{ "font-stretch": [
				"ultra-condensed",
				"extra-condensed",
				"condensed",
				"semi-condensed",
				"normal",
				"semi-expanded",
				"expanded",
				"extra-expanded",
				"ultra-expanded",
				$e,
				L
			] }],
			"font-family": [{ font: [
				_t,
				ft,
				t
			] }],
			"font-features": [{ "font-features": [L] }],
			"fvn-normal": ["normal-nums"],
			"fvn-ordinal": ["ordinal"],
			"fvn-slashed-zero": ["slashed-zero"],
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			tracking: [{ tracking: [
				i,
				R,
				L
			] }],
			"line-clamp": [{ "line-clamp": [
				I,
				"none",
				R,
				ut
			] }],
			leading: [{ leading: [
				"none",
				a,
				...w()
			] }],
			"list-image": [{ "list-image": [
				"none",
				R,
				L
			] }],
			"list-style-position": [{ list: ["inside", "outside"] }],
			"list-style-type": [{ list: [
				"disc",
				"decimal",
				"none",
				R,
				L
			] }],
			"text-alignment": [{ text: [
				"left",
				"center",
				"right",
				"justify",
				"start",
				"end"
			] }],
			"placeholder-color": [{ placeholder: M() }],
			"text-color": [{ text: M() }],
			"text-decoration": [
				"underline",
				"overline",
				"line-through",
				"no-underline"
			],
			"text-decoration-style": [{ decoration: [...N(), "wavy"] }],
			"text-decoration-thickness": [{ decoration: [
				I,
				"from-font",
				"auto",
				R,
				lt
			] }],
			"text-decoration-color": [{ decoration: M() }],
			"underline-offset": [{ "underline-offset": [
				I,
				"auto",
				R,
				L
			] }],
			"text-transform": [
				"uppercase",
				"lowercase",
				"capitalize",
				"normal-case"
			],
			"text-overflow": [
				"truncate",
				"text-ellipsis",
				"text-clip"
			],
			"text-wrap": [{ text: [
				"wrap",
				"nowrap",
				"balance",
				"pretty"
			] }],
			indent: [{ indent: w() }],
			"tab-size": [{ tab: [
				Qe,
				R,
				L
			] }],
			"vertical-align": [{ align: [
				"baseline",
				"top",
				"middle",
				"bottom",
				"text-top",
				"text-bottom",
				"sub",
				"super",
				R,
				L
			] }],
			whitespace: [{ whitespace: [
				"normal",
				"nowrap",
				"pre",
				"pre-line",
				"pre-wrap",
				"break-spaces"
			] }],
			break: [{ break: [
				"normal",
				"words",
				"all",
				"keep"
			] }],
			wrap: [{ wrap: [
				"break-word",
				"anywhere",
				"normal"
			] }],
			hyphens: [{ hyphens: [
				"none",
				"manual",
				"auto"
			] }],
			content: [{ content: [
				"none",
				R,
				L
			] }],
			"bg-attachment": [{ bg: [
				"fixed",
				"local",
				"scroll"
			] }],
			"bg-clip": [{ "bg-clip": [
				"border",
				"padding",
				"content",
				"text"
			] }],
			"bg-origin": [{ "bg-origin": [
				"border",
				"padding",
				"content"
			] }],
			"bg-position": [{ bg: ie() }],
			"bg-repeat": [{ bg: ae() }],
			"bg-size": [{ bg: oe() }],
			"bg-image": [{ bg: [
				"none",
				{
					linear: [
						{ to: [
							"t",
							"tr",
							"r",
							"br",
							"b",
							"bl",
							"l",
							"tl"
						] },
						Qe,
						R,
						L
					],
					radial: [
						"",
						R,
						L
					],
					conic: [
						"",
						Qe,
						R,
						L
					]
				},
				bt,
				mt
			] }],
			"bg-color": [{ bg: M() }],
			"gradient-from-pos": [{ from: se() }],
			"gradient-via-pos": [{ via: se() }],
			"gradient-to-pos": [{ to: se() }],
			"gradient-from": [{ from: M() }],
			"gradient-via": [{ via: M() }],
			"gradient-to": [{ to: M() }],
			rounded: [{ rounded: ce() }],
			"rounded-s": [{ "rounded-s": ce() }],
			"rounded-e": [{ "rounded-e": ce() }],
			"rounded-t": [{ "rounded-t": ce() }],
			"rounded-r": [{ "rounded-r": ce() }],
			"rounded-b": [{ "rounded-b": ce() }],
			"rounded-l": [{ "rounded-l": ce() }],
			"rounded-ss": [{ "rounded-ss": ce() }],
			"rounded-se": [{ "rounded-se": ce() }],
			"rounded-ee": [{ "rounded-ee": ce() }],
			"rounded-es": [{ "rounded-es": ce() }],
			"rounded-tl": [{ "rounded-tl": ce() }],
			"rounded-tr": [{ "rounded-tr": ce() }],
			"rounded-br": [{ "rounded-br": ce() }],
			"rounded-bl": [{ "rounded-bl": ce() }],
			"border-w": [{ border: le() }],
			"border-w-x": [{ "border-x": le() }],
			"border-w-y": [{ "border-y": le() }],
			"border-w-s": [{ "border-s": le() }],
			"border-w-e": [{ "border-e": le() }],
			"border-w-bs": [{ "border-bs": le() }],
			"border-w-be": [{ "border-be": le() }],
			"border-w-t": [{ "border-t": le() }],
			"border-w-r": [{ "border-r": le() }],
			"border-w-b": [{ "border-b": le() }],
			"border-w-l": [{ "border-l": le() }],
			"divide-x": [{ "divide-x": le() }],
			"divide-x-reverse": ["divide-x-reverse"],
			"divide-y": [{ "divide-y": le() }],
			"divide-y-reverse": ["divide-y-reverse"],
			"border-style": [{ border: [
				...N(),
				"hidden",
				"none"
			] }],
			"divide-style": [{ divide: [
				...N(),
				"hidden",
				"none"
			] }],
			"border-color": [{ border: M() }],
			"border-color-x": [{ "border-x": M() }],
			"border-color-y": [{ "border-y": M() }],
			"border-color-s": [{ "border-s": M() }],
			"border-color-e": [{ "border-e": M() }],
			"border-color-bs": [{ "border-bs": M() }],
			"border-color-be": [{ "border-be": M() }],
			"border-color-t": [{ "border-t": M() }],
			"border-color-r": [{ "border-r": M() }],
			"border-color-b": [{ "border-b": M() }],
			"border-color-l": [{ "border-l": M() }],
			"divide-color": [{ divide: M() }],
			"outline-style": [{ outline: [
				...N(),
				"none",
				"hidden"
			] }],
			"outline-offset": [{ "outline-offset": [
				I,
				R,
				L
			] }],
			"outline-w": [{ outline: [
				"",
				I,
				gt,
				lt
			] }],
			"outline-color": [{ outline: M() }],
			shadow: [{ shadow: [
				"",
				"inner",
				"none",
				u,
				xt,
				ht
			] }],
			"shadow-color": [{ shadow: M() }],
			"inset-shadow": [{ "inset-shadow": [
				"none",
				d,
				xt,
				ht
			] }],
			"inset-shadow-color": [{ "inset-shadow": M() }],
			"ring-w": [{ ring: le() }],
			"ring-w-inset": ["ring-inset"],
			"ring-color": [{ ring: M() }],
			"ring-offset-w": [{ "ring-offset": [I, lt] }],
			"ring-offset-color": [{ "ring-offset": M() }],
			"inset-ring-w": [{ "inset-ring": le() }],
			"inset-ring-color": [{ "inset-ring": M() }],
			"text-shadow": [{ "text-shadow": [
				"none",
				f,
				xt,
				ht
			] }],
			"text-shadow-color": [{ "text-shadow": M() }],
			opacity: [{ opacity: [
				I,
				R,
				L
			] }],
			"mix-blend": [{ "mix-blend": [
				...ue(),
				"plus-darker",
				"plus-lighter"
			] }],
			"bg-blend": [{ "bg-blend": ue() }],
			"mask-clip": [{ "mask-clip": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }, "mask-no-clip"],
			"mask-composite": [{ mask: [
				"add",
				"subtract",
				"intersect",
				"exclude"
			] }],
			"mask-image-linear-pos": [{ "mask-linear": [I] }],
			"mask-image-linear-from-pos": [{ "mask-linear-from": de() }],
			"mask-image-linear-to-pos": [{ "mask-linear-to": de() }],
			"mask-image-linear-from-color": [{ "mask-linear-from": M() }],
			"mask-image-linear-to-color": [{ "mask-linear-to": M() }],
			"mask-image-t-from-pos": [{ "mask-t-from": de() }],
			"mask-image-t-to-pos": [{ "mask-t-to": de() }],
			"mask-image-t-from-color": [{ "mask-t-from": M() }],
			"mask-image-t-to-color": [{ "mask-t-to": M() }],
			"mask-image-r-from-pos": [{ "mask-r-from": de() }],
			"mask-image-r-to-pos": [{ "mask-r-to": de() }],
			"mask-image-r-from-color": [{ "mask-r-from": M() }],
			"mask-image-r-to-color": [{ "mask-r-to": M() }],
			"mask-image-b-from-pos": [{ "mask-b-from": de() }],
			"mask-image-b-to-pos": [{ "mask-b-to": de() }],
			"mask-image-b-from-color": [{ "mask-b-from": M() }],
			"mask-image-b-to-color": [{ "mask-b-to": M() }],
			"mask-image-l-from-pos": [{ "mask-l-from": de() }],
			"mask-image-l-to-pos": [{ "mask-l-to": de() }],
			"mask-image-l-from-color": [{ "mask-l-from": M() }],
			"mask-image-l-to-color": [{ "mask-l-to": M() }],
			"mask-image-x-from-pos": [{ "mask-x-from": de() }],
			"mask-image-x-to-pos": [{ "mask-x-to": de() }],
			"mask-image-x-from-color": [{ "mask-x-from": M() }],
			"mask-image-x-to-color": [{ "mask-x-to": M() }],
			"mask-image-y-from-pos": [{ "mask-y-from": de() }],
			"mask-image-y-to-pos": [{ "mask-y-to": de() }],
			"mask-image-y-from-color": [{ "mask-y-from": M() }],
			"mask-image-y-to-color": [{ "mask-y-to": M() }],
			"mask-image-radial": [{ "mask-radial": [R, L] }],
			"mask-image-radial-from-pos": [{ "mask-radial-from": de() }],
			"mask-image-radial-to-pos": [{ "mask-radial-to": de() }],
			"mask-image-radial-from-color": [{ "mask-radial-from": M() }],
			"mask-image-radial-to-color": [{ "mask-radial-to": M() }],
			"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
			"mask-image-radial-size": [{ "mask-radial": [{
				closest: ["side", "corner"],
				farthest: ["side", "corner"]
			}] }],
			"mask-image-radial-pos": [{ "mask-radial-at": b() }],
			"mask-image-conic-pos": [{ "mask-conic": [I] }],
			"mask-image-conic-from-pos": [{ "mask-conic-from": de() }],
			"mask-image-conic-to-pos": [{ "mask-conic-to": de() }],
			"mask-image-conic-from-color": [{ "mask-conic-from": M() }],
			"mask-image-conic-to-color": [{ "mask-conic-to": M() }],
			"mask-mode": [{ mask: [
				"alpha",
				"luminance",
				"match"
			] }],
			"mask-origin": [{ "mask-origin": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }],
			"mask-position": [{ mask: ie() }],
			"mask-repeat": [{ mask: ae() }],
			"mask-size": [{ mask: oe() }],
			"mask-type": [{ "mask-type": ["alpha", "luminance"] }],
			"mask-image": [{ mask: [
				"none",
				R,
				L
			] }],
			filter: [{ filter: [
				"",
				"none",
				R,
				L
			] }],
			blur: [{ blur: fe() }],
			brightness: [{ brightness: [
				I,
				R,
				L
			] }],
			contrast: [{ contrast: [
				I,
				R,
				L
			] }],
			"drop-shadow": [{ "drop-shadow": [
				"",
				"none",
				p,
				xt,
				ht
			] }],
			"drop-shadow-color": [{ "drop-shadow": M() }],
			grayscale: [{ grayscale: [
				"",
				I,
				R,
				L
			] }],
			"hue-rotate": [{ "hue-rotate": [
				I,
				R,
				L
			] }],
			invert: [{ invert: [
				"",
				I,
				R,
				L
			] }],
			saturate: [{ saturate: [
				I,
				R,
				L
			] }],
			sepia: [{ sepia: [
				"",
				I,
				R,
				L
			] }],
			"backdrop-filter": [{ "backdrop-filter": [
				"",
				"none",
				R,
				L
			] }],
			"backdrop-blur": [{ "backdrop-blur": fe() }],
			"backdrop-brightness": [{ "backdrop-brightness": [
				I,
				R,
				L
			] }],
			"backdrop-contrast": [{ "backdrop-contrast": [
				I,
				R,
				L
			] }],
			"backdrop-grayscale": [{ "backdrop-grayscale": [
				"",
				I,
				R,
				L
			] }],
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
				I,
				R,
				L
			] }],
			"backdrop-invert": [{ "backdrop-invert": [
				"",
				I,
				R,
				L
			] }],
			"backdrop-opacity": [{ "backdrop-opacity": [
				I,
				R,
				L
			] }],
			"backdrop-saturate": [{ "backdrop-saturate": [
				I,
				R,
				L
			] }],
			"backdrop-sepia": [{ "backdrop-sepia": [
				"",
				I,
				R,
				L
			] }],
			"border-collapse": [{ border: ["collapse", "separate"] }],
			"border-spacing": [{ "border-spacing": w() }],
			"border-spacing-x": [{ "border-spacing-x": w() }],
			"border-spacing-y": [{ "border-spacing-y": w() }],
			"table-layout": [{ table: ["auto", "fixed"] }],
			caption: [{ caption: ["top", "bottom"] }],
			transition: [{ transition: [
				"",
				"all",
				"colors",
				"opacity",
				"shadow",
				"transform",
				"none",
				R,
				L
			] }],
			"transition-behavior": [{ transition: ["normal", "discrete"] }],
			duration: [{ duration: [
				I,
				"initial",
				R,
				L
			] }],
			ease: [{ ease: [
				"linear",
				"initial",
				_,
				R,
				L
			] }],
			delay: [{ delay: [
				I,
				R,
				L
			] }],
			animate: [{ animate: [
				"none",
				v,
				R,
				L
			] }],
			backface: [{ backface: ["hidden", "visible"] }],
			perspective: [{ perspective: [
				h,
				R,
				L
			] }],
			"perspective-origin": [{ "perspective-origin": x() }],
			rotate: [{ rotate: pe() }],
			"rotate-x": [{ "rotate-x": pe() }],
			"rotate-y": [{ "rotate-y": pe() }],
			"rotate-z": [{ "rotate-z": pe() }],
			scale: [{ scale: me() }],
			"scale-x": [{ "scale-x": me() }],
			"scale-y": [{ "scale-y": me() }],
			"scale-z": [{ "scale-z": me() }],
			"scale-3d": ["scale-3d"],
			skew: [{ skew: he() }],
			"skew-x": [{ "skew-x": he() }],
			"skew-y": [{ "skew-y": he() }],
			transform: [{ transform: [
				R,
				L,
				"",
				"none",
				"gpu",
				"cpu"
			] }],
			"transform-origin": [{ origin: x() }],
			"transform-style": [{ transform: ["3d", "flat"] }],
			translate: [{ translate: ge() }],
			"translate-x": [{ "translate-x": ge() }],
			"translate-y": [{ "translate-y": ge() }],
			"translate-z": [{ "translate-z": ge() }],
			"translate-none": ["translate-none"],
			zoom: [{ zoom: [
				Qe,
				R,
				L
			] }],
			accent: [{ accent: M() }],
			appearance: [{ appearance: ["none", "auto"] }],
			"caret-color": [{ caret: M() }],
			"color-scheme": [{ scheme: [
				"normal",
				"dark",
				"light",
				"light-dark",
				"only-dark",
				"only-light"
			] }],
			cursor: [{ cursor: [
				"auto",
				"default",
				"pointer",
				"wait",
				"text",
				"move",
				"help",
				"not-allowed",
				"none",
				"context-menu",
				"progress",
				"cell",
				"crosshair",
				"vertical-text",
				"alias",
				"copy",
				"no-drop",
				"grab",
				"grabbing",
				"all-scroll",
				"col-resize",
				"row-resize",
				"n-resize",
				"e-resize",
				"s-resize",
				"w-resize",
				"ne-resize",
				"nw-resize",
				"se-resize",
				"sw-resize",
				"ew-resize",
				"ns-resize",
				"nesw-resize",
				"nwse-resize",
				"zoom-in",
				"zoom-out",
				R,
				L
			] }],
			"field-sizing": [{ "field-sizing": ["fixed", "content"] }],
			"pointer-events": [{ "pointer-events": ["auto", "none"] }],
			resize: [{ resize: [
				"none",
				"",
				"y",
				"x"
			] }],
			"scroll-behavior": [{ scroll: ["auto", "smooth"] }],
			"scrollbar-thumb-color": [{ "scrollbar-thumb": M() }],
			"scrollbar-track-color": [{ "scrollbar-track": M() }],
			"scrollbar-gutter": [{ "scrollbar-gutter": [
				"auto",
				"stable",
				"both"
			] }],
			"scrollbar-w": [{ scrollbar: [
				"auto",
				"thin",
				"none"
			] }],
			"scroll-m": [{ "scroll-m": w() }],
			"scroll-mx": [{ "scroll-mx": w() }],
			"scroll-my": [{ "scroll-my": w() }],
			"scroll-ms": [{ "scroll-ms": w() }],
			"scroll-me": [{ "scroll-me": w() }],
			"scroll-mbs": [{ "scroll-mbs": w() }],
			"scroll-mbe": [{ "scroll-mbe": w() }],
			"scroll-mt": [{ "scroll-mt": w() }],
			"scroll-mr": [{ "scroll-mr": w() }],
			"scroll-mb": [{ "scroll-mb": w() }],
			"scroll-ml": [{ "scroll-ml": w() }],
			"scroll-p": [{ "scroll-p": w() }],
			"scroll-px": [{ "scroll-px": w() }],
			"scroll-py": [{ "scroll-py": w() }],
			"scroll-ps": [{ "scroll-ps": w() }],
			"scroll-pe": [{ "scroll-pe": w() }],
			"scroll-pbs": [{ "scroll-pbs": w() }],
			"scroll-pbe": [{ "scroll-pbe": w() }],
			"scroll-pt": [{ "scroll-pt": w() }],
			"scroll-pr": [{ "scroll-pr": w() }],
			"scroll-pb": [{ "scroll-pb": w() }],
			"scroll-pl": [{ "scroll-pl": w() }],
			"snap-align": [{ snap: [
				"start",
				"end",
				"center",
				"align-none"
			] }],
			"snap-stop": [{ snap: ["normal", "always"] }],
			"snap-type": [{ snap: [
				"none",
				"x",
				"y",
				"both"
			] }],
			"snap-strictness": [{ snap: ["mandatory", "proximity"] }],
			touch: [{ touch: [
				"auto",
				"none",
				"manipulation"
			] }],
			"touch-x": [{ "touch-pan": [
				"x",
				"left",
				"right"
			] }],
			"touch-y": [{ "touch-pan": [
				"y",
				"up",
				"down"
			] }],
			"touch-pz": ["touch-pinch-zoom"],
			select: [{ select: [
				"none",
				"text",
				"all",
				"auto"
			] }],
			"will-change": [{ "will-change": [
				"auto",
				"scroll",
				"contents",
				"transform",
				R,
				L
			] }],
			fill: [{ fill: ["none", ...M()] }],
			"stroke-w": [{ stroke: [
				I,
				gt,
				lt,
				ut
			] }],
			stroke: [{ stroke: ["none", ...M()] }],
			"forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }]
		},
		conflictingClassGroups: {
			"container-named": ["container-type"],
			overflow: ["overflow-x", "overflow-y"],
			overscroll: ["overscroll-x", "overscroll-y"],
			inset: [
				"inset-x",
				"inset-y",
				"inset-bs",
				"inset-be",
				"start",
				"end",
				"top",
				"right",
				"bottom",
				"left"
			],
			"inset-x": [
				"start",
				"end",
				"right",
				"left"
			],
			"inset-y": [
				"inset-bs",
				"inset-be",
				"top",
				"bottom"
			],
			flex: [
				"basis",
				"grow",
				"shrink"
			],
			gap: ["gap-x", "gap-y"],
			p: [
				"px",
				"py",
				"ps",
				"pe",
				"pbs",
				"pbe",
				"pt",
				"pr",
				"pb",
				"pl"
			],
			px: [
				"ps",
				"pe",
				"pr",
				"pl"
			],
			py: [
				"pbs",
				"pbe",
				"pt",
				"pb"
			],
			m: [
				"mx",
				"my",
				"ms",
				"me",
				"mbs",
				"mbe",
				"mt",
				"mr",
				"mb",
				"ml"
			],
			mx: [
				"ms",
				"me",
				"mr",
				"ml"
			],
			my: [
				"mbs",
				"mbe",
				"mt",
				"mb"
			],
			size: ["w", "h"],
			"font-size": ["leading"],
			"fvn-normal": [
				"fvn-ordinal",
				"fvn-slashed-zero",
				"fvn-figure",
				"fvn-spacing",
				"fvn-fraction"
			],
			"fvn-ordinal": ["fvn-normal"],
			"fvn-slashed-zero": ["fvn-normal"],
			"fvn-figure": ["fvn-normal"],
			"fvn-spacing": ["fvn-normal"],
			"fvn-fraction": ["fvn-normal"],
			"line-clamp": ["display", "overflow"],
			rounded: [
				"rounded-s",
				"rounded-e",
				"rounded-t",
				"rounded-r",
				"rounded-b",
				"rounded-l",
				"rounded-ss",
				"rounded-se",
				"rounded-ee",
				"rounded-es",
				"rounded-tl",
				"rounded-tr",
				"rounded-br",
				"rounded-bl"
			],
			"rounded-s": ["rounded-ss", "rounded-es"],
			"rounded-e": ["rounded-se", "rounded-ee"],
			"rounded-t": ["rounded-tl", "rounded-tr"],
			"rounded-r": ["rounded-tr", "rounded-br"],
			"rounded-b": ["rounded-br", "rounded-bl"],
			"rounded-l": ["rounded-tl", "rounded-bl"],
			"border-spacing": ["border-spacing-x", "border-spacing-y"],
			"border-w": [
				"border-w-x",
				"border-w-y",
				"border-w-s",
				"border-w-e",
				"border-w-bs",
				"border-w-be",
				"border-w-t",
				"border-w-r",
				"border-w-b",
				"border-w-l"
			],
			"border-w-x": [
				"border-w-s",
				"border-w-e",
				"border-w-r",
				"border-w-l"
			],
			"border-w-y": [
				"border-w-bs",
				"border-w-be",
				"border-w-t",
				"border-w-b"
			],
			"border-color": [
				"border-color-x",
				"border-color-y",
				"border-color-s",
				"border-color-e",
				"border-color-bs",
				"border-color-be",
				"border-color-t",
				"border-color-r",
				"border-color-b",
				"border-color-l"
			],
			"border-color-x": [
				"border-color-s",
				"border-color-e",
				"border-color-r",
				"border-color-l"
			],
			"border-color-y": [
				"border-color-bs",
				"border-color-be",
				"border-color-t",
				"border-color-b"
			],
			translate: [
				"translate-x",
				"translate-y",
				"translate-none"
			],
			"translate-none": [
				"translate",
				"translate-x",
				"translate-y",
				"translate-z"
			],
			"scroll-m": [
				"scroll-mx",
				"scroll-my",
				"scroll-ms",
				"scroll-me",
				"scroll-mbs",
				"scroll-mbe",
				"scroll-mt",
				"scroll-mr",
				"scroll-mb",
				"scroll-ml"
			],
			"scroll-mx": [
				"scroll-ms",
				"scroll-me",
				"scroll-mr",
				"scroll-ml"
			],
			"scroll-my": [
				"scroll-mbs",
				"scroll-mbe",
				"scroll-mt",
				"scroll-mb"
			],
			"scroll-p": [
				"scroll-px",
				"scroll-py",
				"scroll-ps",
				"scroll-pe",
				"scroll-pbs",
				"scroll-pbe",
				"scroll-pt",
				"scroll-pr",
				"scroll-pb",
				"scroll-pl"
			],
			"scroll-px": [
				"scroll-ps",
				"scroll-pe",
				"scroll-pr",
				"scroll-pl"
			],
			"scroll-py": [
				"scroll-pbs",
				"scroll-pbe",
				"scroll-pt",
				"scroll-pb"
			],
			touch: [
				"touch-x",
				"touch-y",
				"touch-pz"
			],
			"touch-x": ["touch"],
			"touch-y": ["touch"],
			"touch-pz": ["touch"]
		},
		conflictingClassGroupModifiers: { "font-size": ["leading"] },
		postfixLookupClassGroups: ["container-type"],
		orderSensitiveModifiers: [
			"*",
			"**",
			"after",
			"backdrop",
			"before",
			"details-content",
			"file",
			"first-letter",
			"first-line",
			"marker",
			"placeholder",
			"selection"
		]
	};
}, Pt = (e, { cacheSize: t, prefix: n, experimentalParseClassName: r, extend: i = {}, override: a = {} }) => (Ft(e, "cacheSize", t), Ft(e, "prefix", n), Ft(e, "experimentalParseClassName", r), It(e.theme, a.theme), It(e.classGroups, a.classGroups), It(e.conflictingClassGroups, a.conflictingClassGroups), It(e.conflictingClassGroupModifiers, a.conflictingClassGroupModifiers), Ft(e, "postfixLookupClassGroups", a.postfixLookupClassGroups), Ft(e, "orderSensitiveModifiers", a.orderSensitiveModifiers), Lt(e.theme, i.theme), Lt(e.classGroups, i.classGroups), Lt(e.conflictingClassGroups, i.conflictingClassGroups), Lt(e.conflictingClassGroupModifiers, i.conflictingClassGroupModifiers), Rt(e, i, "postfixLookupClassGroups"), Rt(e, i, "orderSensitiveModifiers"), e), Ft = (e, t, n) => {
	n !== void 0 && (e[t] = n);
}, It = (e, t) => {
	if (t) for (let n in t) Ft(e, n, t[n]);
}, Lt = (e, t) => {
	if (t) for (let n in t) Rt(e, t, n);
}, Rt = (e, t, n) => {
	let r = t[n];
	r !== void 0 && (e[n] = e[n] ? e[n].concat(r) : r);
}, zt = (e, ...t) => typeof e == "function" ? Be(Nt, e, ...t) : Be(() => Pt(Nt(), e), ...t), Bt = [
	"large-title",
	"display-1",
	"display-2",
	"display-3",
	"display-4",
	"title-1",
	"title-2",
	"title-3",
	"headline",
	"body",
	"body-2",
	"caption-1",
	"caption-2"
], Vt = [
	"regular",
	"medium",
	"semibold",
	"bold"
], z = zt({ extend: { classGroups: { "font-size": [{ text: Bt.flatMap((e) => Vt.map((t) => `${e}-${t}`)) }] } } });
function Ht(e) {
	return e;
}
//#endregion
//#region node_modules/react/cjs/react-jsx-runtime.production.js
var Ut = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
	function r(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.Fragment = n, e.jsx = r, e.jsxs = r;
})), B = (/* @__PURE__ */ o(((e, t) => {
	t.exports = Ut();
})))(), V = Ht({
	base: [
		"inline-flex items-center justify-center gap-0.5 whitespace-nowrap overflow-hidden",
		"font-sans select-none cursor-pointer",
		"button-press-motion",
		"outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-border-focus-ring",
		"disabled:cursor-not-allowed aria-disabled:cursor-not-allowed"
	].join(" "),
	size: {
		medium: "h-9 rounded-2lg p-2 text-body-medium",
		small: "h-8 rounded-lg px-2 py-1.5 text-body-medium",
		xs: "h-6 rounded-sm px-2 text-caption-1-semibold"
	},
	iconOnlySize: {
		medium: "",
		small: "size-8 p-0",
		xs: "size-6 p-0"
	},
	icon: {
		medium: "size-5 shrink-0",
		small: "size-[18px] shrink-0",
		xs: "size-3.5 shrink-0"
	},
	label: {
		medium: "inline-flex items-center justify-center px-1 shrink-0",
		small: "inline-flex items-center justify-center px-0.5 shrink-0",
		xs: "inline-flex items-center justify-center px-0.5 shrink-0"
	},
	variant: {
		primary: [
			"bg-button-primary text-text-white shadow-xs",
			"disabled:text-button-primary-disabled-foreground disabled:shadow-none",
			"aria-disabled:text-button-primary-disabled-foreground aria-disabled:shadow-none"
		].join(" "),
		danger: [
			"bg-button-danger text-text-white shadow-xs",
			"disabled:text-foreground-disabled-danger disabled:shadow-none",
			"aria-disabled:text-foreground-disabled-danger aria-disabled:shadow-none"
		].join(" "),
		secondary: [
			"bg-background-primary-default text-text-primary",
			"border border-border-button-default shadow-xs",
			"hover:bg-background-primary-hover  hover:border-border-button-hover",
			"active:bg-background-primary-active active:border-border-button-active",
			"disabled:bg-background-primary-disabled disabled:border-border-button-default disabled:text-text-tertiary disabled:shadow-none",
			"aria-disabled:bg-background-primary-disabled aria-disabled:border-border-button-default aria-disabled:text-text-tertiary aria-disabled:shadow-none"
		].join(" "),
		ghost: [
			"bg-button-ghost-background text-button-ghost-foreground",
			"hover:bg-button-ghost-hover active:bg-button-ghost-active",
			"disabled:bg-button-ghost-disabled disabled:text-button-ghost-disabled-foreground disabled:shadow-none",
			"aria-disabled:bg-button-ghost-disabled aria-disabled:text-button-ghost-disabled-foreground aria-disabled:shadow-none"
		].join(" ")
	}
});
function Wt({ variant: e = "primary", size: t = "medium", iconOnly: n = !1, leadingIcon: r, trailingIcon: i, children: a, className: o, type: s = "button", ref: c, ...l }) {
	return /* @__PURE__ */ (0, B.jsxs)("button", {
		ref: c,
		type: s,
		className: z(V.base, V.size[t], V.variant[e], n && V.iconOnlySize[t], o),
		...l,
		children: [
			r ? /* @__PURE__ */ (0, B.jsx)(r, {
				className: V.icon[t],
				"aria-hidden": !0
			}) : null,
			!n && a != null && /* @__PURE__ */ (0, B.jsx)("span", {
				className: V.label[t],
				children: a
			}),
			!n && i ? /* @__PURE__ */ (0, B.jsx)(i, {
				className: V.icon[t],
				"aria-hidden": !0
			}) : null
		]
	});
}
function Gt({ variant: e = "primary", size: t = "medium", iconOnly: n = !1, leadingIcon: r, trailingIcon: i, children: a, className: o, ref: s, ...c }) {
	return /* @__PURE__ */ (0, B.jsxs)("a", {
		ref: s,
		className: z(V.base, V.size[t], V.variant[e], n && V.iconOnlySize[t], o),
		...c,
		children: [
			r ? /* @__PURE__ */ (0, B.jsx)(r, {
				className: V.icon[t],
				"aria-hidden": !0
			}) : null,
			!n && a != null && /* @__PURE__ */ (0, B.jsx)("span", {
				className: V.label[t],
				children: a
			}),
			!n && i ? /* @__PURE__ */ (0, B.jsx)(i, {
				className: V.icon[t],
				"aria-hidden": !0
			}) : null
		]
	});
}
//#endregion
//#region src/react/pages/auth-card.tsx
function Kt({ title: e, lede: t, busy: n = !1, children: r }) {
	return /* @__PURE__ */ (0, B.jsx)("main", {
		className: "flex justify-center px-6 py-12 max-sm:px-4 max-sm:py-6",
		children: /* @__PURE__ */ (0, B.jsxs)("section", {
			"aria-labelledby": "auth-card-title",
			"aria-busy": n || void 0,
			className: "flex w-full max-w-140 flex-col gap-6 rounded-3xl border border-separator-border bg-background-secondary-default p-8 max-sm:p-5",
			children: [/* @__PURE__ */ (0, B.jsxs)("header", {
				className: "flex flex-col gap-1",
				children: [
					/* @__PURE__ */ (0, B.jsx)("img", {
						src: "/peach-logo.png",
						alt: "",
						width: 40,
						height: 40,
						className: "mb-4 size-10"
					}),
					/* @__PURE__ */ (0, B.jsx)("h1", {
						id: "auth-card-title",
						className: "text-title-2-medium text-text-primary",
						children: e
					}),
					t ? /* @__PURE__ */ (0, B.jsx)("p", {
						className: "whitespace-pre-line text-body-2-regular text-text-secondary wrap-anywhere",
						children: t
					}) : null
				]
			}), r]
		})
	});
}
function qt({ first: e = !1, labelledBy: t, children: n }) {
	return /* @__PURE__ */ (0, B.jsx)("section", {
		"aria-labelledby": t,
		className: e ? "flex flex-col gap-4" : "flex flex-col gap-4 border-t border-separator-border pt-6",
		children: n
	});
}
function Jt({ id: e, children: t }) {
	return /* @__PURE__ */ (0, B.jsx)("h2", {
		id: e,
		className: "text-body-semibold text-text-primary",
		children: t
	});
}
//#endregion
//#region src/react/pages/error/error-page.tsx
var Yt = {
	403: "这里不能打开",
	404: "四〇四",
	409: "现在不能这样做"
};
function Xt(e) {
	return Yt[e ?? ""] ?? "出了点问题";
}
function Zt({ data: e }) {
	let t = Xt(e.status);
	return (0, N.useEffect)(() => {
		document.title = `Peach · ${t}`;
	}, [t]), /* @__PURE__ */ (0, B.jsx)(Kt, {
		title: t,
		lede: e.status === "404" ? void 0 : e.detail,
		children: /* @__PURE__ */ (0, B.jsx)(Gt, {
			href: "/",
			className: "self-start",
			children: "返回首页"
		})
	});
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/chain.mjs
function Qt(...e) {
	return (...t) => {
		for (let n of e) typeof n == "function" && n(...t);
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useLayoutEffect.mjs
var H = typeof document < "u" ? N.useLayoutEffect : () => {}, $t = {
	prefix: String(Math.round(Math.random() * 1e10)),
	current: 0
}, en = /*#__PURE__*/ N.createContext($t), tn = /*#__PURE__*/ N.createContext(!1);
typeof window < "u" && window.document && window.document.createElement;
var nn = /* @__PURE__ */ new WeakMap();
function rn(e = !1) {
	let t = (0, N.useContext)(en), n = (0, N.useRef)(null);
	if (n.current === null && !e) {
		let e = N.default.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED?.ReactCurrentOwner?.current;
		if (e) {
			let n = nn.get(e);
			n == null ? nn.set(e, {
				id: t.current,
				state: e.memoizedState
			}) : e.memoizedState !== n.state && (t.current = n.id, nn.delete(e));
		}
		n.current = ++t.current;
	}
	return n.current;
}
function an(e) {
	let t = (0, N.useContext)(en), n = rn(!!e), r = `react-aria${t.prefix}`;
	return e || `${r}-${n}`;
}
function on(e) {
	let t = N.useId(), [n] = (0, N.useState)(dn()), r = n ? "react-aria" : `react-aria${$t.prefix}`;
	return e || `${r}-${t}`;
}
var sn = typeof N.useId == "function" ? on : an;
function cn() {
	return !1;
}
function ln() {
	return !0;
}
function un(e) {
	return () => {};
}
function dn() {
	return typeof N.useSyncExternalStore == "function" ? N.useSyncExternalStore(un, cn, ln) : (0, N.useContext)(tn);
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useValueEffect.mjs
function fn(e) {
	let [t, n] = (0, N.useState)(e), r = (0, N.useRef)(t), i = (0, N.useRef)(null), a = (0, N.useRef)(() => {
		if (!i.current) return;
		let e = i.current.next();
		e.done ? i.current = null : r.current === e.value ? a.current() : n(e.value);
	});
	return H(() => {
		r.current = t, i.current && a.current();
	}), [t, (0, N.useCallback)((e) => {
		i.current = e(r.current), a.current();
	}, [a])];
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useId.mjs
var pn = !!(typeof window < "u" && window.document && window.document.createElement), mn = /* @__PURE__ */ new Map(), hn;
typeof FinalizationRegistry < "u" && (hn = new FinalizationRegistry((e) => {
	mn.delete(e);
}));
var gn = /* @__PURE__ */ new WeakMap();
function _n(e) {
	let [t, n] = (0, N.useState)(e), r = (0, N.useRef)(null), i = sn(t), a = (0, N.useRef)(null), o = gn.get(a);
	if (hn && o !== i && (o != null && hn.unregister(a), hn.register(a, i, a), gn.set(a, i)), pn) {
		let e = mn.get(i);
		e && !e.includes(r) ? e.push(r) : mn.set(i, [r]);
	}
	return H(() => {
		let e = i;
		return () => {
			hn && (hn.unregister(a), gn.delete(a)), mn.delete(e);
		};
	}, [i]), (0, N.useEffect)(() => {
		let e = r.current;
		return e && n(e), () => {
			e && (r.current = null);
		};
	}), i;
}
function vn(e, t) {
	if (e === t) return e;
	let n = mn.get(e);
	if (n) return n.forEach((e) => e.current = t), t;
	let r = mn.get(t);
	return r ? (r.forEach((t) => t.current = e), e) : t;
}
function yn(e = []) {
	let t = _n(), [n, r] = fn(t), i = (0, N.useCallback)(() => {
		r(function* () {
			yield t, yield document.getElementById(t) ? t : void 0;
		});
	}, [t, r]);
	return H(i, [
		t,
		i,
		...e
	]), n;
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/mergeRefs.mjs
function bn(...e) {
	return e.length === 1 && e[0] ? e[0] : (t) => {
		let n = !1, r = e.map((e) => {
			let r = xn(e, t);
			return n ||= typeof r == "function", r;
		});
		if (n) return () => {
			r.forEach((t, n) => {
				typeof t == "function" ? t() : xn(e[n], null);
			});
		};
	};
}
function xn(e, t) {
	if (typeof e == "function") return e(t);
	e != null && (e.current = t);
}
//#endregion
//#region node_modules/clsx/dist/clsx.mjs
function Sn(e) {
	var t, n, r = "";
	if (typeof e == "string" || typeof e == "number") r += e;
	else if (typeof e == "object") {
		if (Array.isArray(e)) {
			var i = e.length;
			for (t = 0; t < i; t++) e[t] && (n = Sn(e[t])) && (r && (r += " "), r += n);
		} else for (n in e) e[n] && (r && (r += " "), r += n);
	}
	return r;
}
function Cn() {
	for (var e, t, n = 0, r = "", i = arguments.length; n < i; n++) (e = arguments[n]) && (t = Sn(e)) && (r && (r += " "), r += t);
	return r;
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/mergeProps.mjs
function U(...e) {
	let t = { ...e[0] };
	for (let n = 1; n < e.length; n++) {
		let r = e[n];
		for (let e in r) {
			let n = t[e], i = r[e];
			typeof n == "function" && typeof i == "function" && e[0] === "o" && e[1] === "n" && e.charCodeAt(2) >= 65 && e.charCodeAt(2) <= 90 ? t[e] = Qt(n, i) : (e === "className" || e === "UNSAFE_className") && typeof n == "string" && typeof i == "string" ? t[e] = Cn(n, i) : e === "id" && n && i ? t.id = vn(n, i) : e === "ref" && n && i ? t.ref = bn(n, i) : t[e] = i === void 0 ? n : i;
		}
	}
	return t;
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useObjectRef.mjs
function wn(e) {
	let t = (0, N.useRef)(null), n = (0, N.useRef)(void 0), r = (0, N.useCallback)((t) => {
		if (typeof e == "function") {
			let n = e, r = n(t);
			return () => {
				typeof r == "function" ? r() : n(null);
			};
		}
		if (e) return e.current = t, () => {
			e.current = null;
		};
	}, [e]);
	return (0, N.useMemo)(() => ({
		get current() {
			return t.current;
		},
		set current(e) {
			t.current = e, n.current &&= (n.current(), void 0), e != null && (n.current = r(e));
		}
	}), [r]);
}
//#endregion
//#region node_modules/react-aria-components/dist/private/utils.mjs
var Tn = Symbol("default");
function En({ values: e, children: t }) {
	for (let [n, r] of e) t = /*#__PURE__*/ N.createElement(n.Provider, { value: r }, t);
	return t;
}
function Dn(e) {
	let { className: t, style: n, children: r, defaultClassName: i, defaultChildren: a, defaultStyle: o, values: s, render: c } = e;
	return (0, N.useMemo)(() => {
		let e, l, u;
		return e = typeof t == "function" ? t({
			...s,
			defaultClassName: i
		}) : t, l = typeof n == "function" ? n({
			...s,
			defaultStyle: o || {}
		}) : n, u = typeof r == "function" ? r({
			...s,
			defaultChildren: a
		}) : r ?? a, {
			className: e ?? i,
			style: l || o ? {
				...o,
				...l
			} : void 0,
			children: u ?? a,
			"data-rac": "",
			render: c ? (e) => c(e, s) : void 0
		};
	}, [
		t,
		n,
		r,
		i,
		a,
		o,
		s,
		c
	]);
}
function On(e, t) {
	let n = (0, N.useContext)(e);
	if (t === null) return null;
	if (n && typeof n == "object" && "slots" in n && n.slots) {
		let e = t || Tn;
		if (!n.slots[e]) {
			let e = new Intl.ListFormat().format(Object.keys(n.slots).map((e) => `"${e}"`)), r = t ? `Invalid slot "${t}".` : "A slot prop is required.";
			throw Error(`${r} Valid slot names are ${e}.`);
		}
		return n.slots[e];
	}
	return n;
}
function kn(e, t, n) {
	let { ref: r, ...i } = On(n, e.slot) || {}, a = wn((0, N.useMemo)(() => bn(t, r), [t, r])), o = U(i, e);
	return "style" in i && i.style && "style" in e && e.style && (o.style = typeof i.style == "function" || typeof e.style == "function" ? (t) => {
		let n = typeof i.style == "function" ? i.style(t) : i.style, r = {
			...t.defaultStyle,
			...n
		}, a = typeof e.style == "function" ? e.style({
			...t,
			defaultStyle: r
		}) : e.style;
		return {
			...r,
			...a
		};
	} : {
		...i.style,
		...e.style
	}), [o, a];
}
function An(e = !0) {
	let [t, n] = (0, N.useState)(e), r = (0, N.useRef)(!1), i = (0, N.useCallback)((e) => {
		r.current = !0, n(!!e);
	}, []);
	return H(() => {
		r.current || n(!1);
	}, []), [i, t];
}
function jn(e) {
	let t = /^(data-.*)$/, n = {};
	for (let r in e) t.test(r) || (n[r] = e[r]);
	return n;
}
function Mn(e, t, n) {
	let { render: r, ...i } = t, a = (0, N.useRef)(null), o = (0, N.useMemo)(() => bn(n, a), [n, a]);
	H(() => {}, [e, r]);
	let s = {
		...i,
		ref: o
	};
	return r ? r(s, void 0) : /*#__PURE__*/ N.createElement(e, s);
}
var Nn = {}, Pn = new Proxy({}, { get(e, t) {
	if (typeof t != "string") return;
	let n = Nn[t];
	return n || (n = /*#__PURE__*/ (0, N.forwardRef)(Mn.bind(null, t)), Nn[t] = n), n;
} }), Fn = "react-aria-clear-focus", In = "react-aria-focus", W = (e) => zn(e) ? e.document : Bn(e) ? e : e?.ownerDocument ?? (typeof document < "u" ? document : void 0), Ln = (e) => W(e)?.defaultView ?? (typeof window < "u" ? window : void 0);
function Rn(e) {
	return typeof e == "object" && !!e && "nodeType" in e && typeof e.nodeType == "number";
}
function zn(e) {
	return typeof e == "object" && !!e && "window" in e && e.window === e;
}
function Bn(e) {
	return Rn(e) && e.nodeType === 9;
}
function Vn(e) {
	return Rn(e) && e.nodeType === 11 && "host" in e;
}
function Hn(e, t, n, r) {
	if (n == null || e == null) return () => {};
	let i = Array.isArray(e) ? e : [e];
	for (let e of i) e.addEventListener(t, n, r);
	return () => {
		for (let e of i) e.removeEventListener(t, n, r);
	};
}
function Un(e, t, n, r) {
	if (e == null) return () => {};
	let i = [], a = Array.isArray(e) ? e : [e];
	for (let e of a) {
		let a = e.style.getPropertyValue(t), o = e.style.getPropertyPriority(t);
		e.style.setProperty(t, n, r), i.unshift(() => {
			a ? e.style.setProperty(t, a, o) : e.style.removeProperty(t);
		});
	}
	return () => {
		for (let e of i) e();
	};
}
//#endregion
//#region node_modules/react-stately/dist/private/flags/flags.mjs
var Wn = !1;
function Gn() {
	return Wn;
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/shadowdom/DOMFunctions.mjs
function G(e, t) {
	if (!Gn()) return t && e ? e.contains(t) : !1;
	if (!e || !t) return !1;
	let n = t;
	for (; n != null;) {
		if (n === e) return !0;
		n = typeof n.assignedElements != "function" && n.assignedSlot?.parentNode ? n.assignedSlot.parentNode : Vn(n) ? n.host : n.parentNode;
	}
	return !1;
}
var Kn = (e = document) => {
	if (!Gn()) return e.activeElement;
	let t = e.activeElement;
	for (; t && "shadowRoot" in t && t.shadowRoot?.activeElement;) t = t.shadowRoot.activeElement;
	return t;
};
function K(e) {
	if (Gn() && e.target instanceof Element && e.target.shadowRoot) {
		if ("composedPath" in e) return e.composedPath()[0] ?? null;
		if ("composedPath" in e.nativeEvent) return e.nativeEvent.composedPath()[0] ?? null;
	}
	return e.target;
}
function qn(e, t) {
	if (t === null) return [];
	t ??= Ln(e);
	let n = [t];
	if (!Gn() || !e || e === t) return n;
	let r = "getRootNode" in t ? t.getRootNode() : null, i = e.getRootNode() ?? null;
	for (; Vn(i) && i !== r;) n.push(i), i = i.host.getRootNode();
	return n;
}
function Jn(e) {
	if (!e) return !1;
	let t = e.getRootNode(), n = Ln(e);
	if (!(t instanceof n.Document || t instanceof n.ShadowRoot)) return !1;
	let r = t.activeElement;
	return r != null && e.contains(r);
}
//#endregion
//#region node_modules/react-aria/dist/private/focus/virtualFocus.mjs
function Yn(e) {
	let t = Qn(W(e));
	t !== e && (t && Xn(t, e), e && Zn(e, t));
}
function Xn(e, t) {
	e.dispatchEvent(new FocusEvent("blur", { relatedTarget: t })), e.dispatchEvent(new FocusEvent("focusout", {
		bubbles: !0,
		relatedTarget: t
	}));
}
function Zn(e, t) {
	e.dispatchEvent(new FocusEvent("focus", { relatedTarget: t })), e.dispatchEvent(new FocusEvent("focusin", {
		bubbles: !0,
		relatedTarget: t
	}));
}
function Qn(e) {
	let t = Kn(e), n = t?.getAttribute("aria-activedescendant");
	return n && e.getElementById(n) || t;
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/focusWithoutScrolling.mjs
function $n(e) {
	e.focus({ preventScroll: !0 });
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/isElementVisible.mjs
var er = typeof Element < "u" && "checkVisibility" in Element.prototype;
function tr(e) {
	let t = Ln(e);
	if (!(e instanceof t.HTMLElement) && !(e instanceof t.SVGElement)) return !1;
	let { display: n, visibility: r } = e.style, i = n !== "none" && r !== "hidden" && r !== "collapse";
	if (i) {
		let { getComputedStyle: t } = Ln(e), { display: n, visibility: r } = t(e);
		i = n !== "none" && r !== "hidden" && r !== "collapse";
	}
	return i;
}
function nr(e, t) {
	return !e.hasAttribute("hidden") && !e.hasAttribute("data-react-aria-prevent-focus") && (e.nodeName === "DETAILS" && t && t.nodeName !== "SUMMARY" ? e.hasAttribute("open") : !0);
}
function rr(e, t) {
	return er ? e.checkVisibility({ visibilityProperty: !0 }) && !e.closest("[data-react-aria-prevent-focus]") : e.nodeName !== "#comment" && tr(e) && nr(e, t) && (!e.parentElement || rr(e.parentElement, e));
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/isFocusable.mjs
var ir = [
	"input:not([disabled]):not([type=hidden])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"button:not([disabled])",
	"a[href]",
	"area[href]",
	"summary",
	"iframe",
	"object",
	"embed",
	"audio[controls]",
	"video[controls]",
	"[contenteditable]:not([contenteditable^=\"false\"])",
	"permission"
], ar = ir.join(":not([hidden]),") + ",[tabindex]:not([disabled]):not([hidden])";
ir.push("[tabindex]:not([tabindex=\"-1\"]):not([disabled])");
var or = ir.join(":not([hidden]):not([tabindex=\"-1\"]),");
function sr(e, t) {
	return e.matches(ar) && !lr(e) && (t?.skipVisibilityCheck || rr(e));
}
function cr(e) {
	return e.matches(or) && rr(e) && !lr(e);
}
function lr(e) {
	let t = e;
	for (; t != null;) {
		if (t instanceof Ln(t).HTMLElement && t.inert) return !0;
		t = t.parentElement;
	}
	return !1;
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/utils.mjs
function ur(e) {
	let t = e;
	return t.nativeEvent = e, t.isDefaultPrevented = () => t.defaultPrevented, t.isPropagationStopped = () => t.cancelBubble, t.persist = () => {}, t;
}
function dr(e, t) {
	Object.defineProperty(e, "target", { value: t }), Object.defineProperty(e, "currentTarget", { value: t });
}
function fr(e) {
	let t = (0, N.useRef)({
		isFocused: !1,
		observer: null
	});
	return H(() => {
		let e = t.current;
		return () => {
			e.observer &&= (e.observer.disconnect(), null);
		};
	}, []), (0, N.useCallback)((n) => {
		let r = K(n);
		if (r instanceof HTMLButtonElement || r instanceof HTMLInputElement || r instanceof HTMLTextAreaElement || r instanceof HTMLSelectElement) {
			t.current.isFocused = !0;
			let n = r;
			n.addEventListener("focusout", (r) => {
				if (t.current.isFocused = !1, n.disabled) {
					let t = ur(r);
					e?.(t);
				}
				t.current.observer && (t.current.observer.disconnect(), t.current.observer = null);
			}, { once: !0 }), t.current.observer = new MutationObserver(() => {
				if (t.current.isFocused && n.disabled) {
					t.current.observer?.disconnect();
					let e = n === Kn() ? null : Kn();
					n.dispatchEvent(new FocusEvent("blur", { relatedTarget: e })), n.dispatchEvent(new FocusEvent("focusout", {
						bubbles: !0,
						relatedTarget: e
					}));
				}
			}), t.current.observer.observe(n, {
				attributes: !0,
				attributeFilter: ["disabled"]
			});
		}
	}, [e]);
}
var pr = !1;
function mr(e) {
	for (; e && !sr(e, { skipVisibilityCheck: !0 });) e = e.parentElement;
	let t = Kn(Ln(e).document);
	if (!t || t === e) return;
	let n = e?.getRootNode(), r = n != null && Vn(n) ? n : Ln(e), i = (t) => t === e || Rn(t) && G(e, t), a = (e) => e === t || t != null && Rn(e) && G(t, e);
	pr = !0;
	let o = !1, s = (e) => {
		(a(K(e)) || o) && e.stopImmediatePropagation();
	}, c = (n) => {
		(a(K(n)) || o) && (n.stopImmediatePropagation(), !e && !o && (o = !0, $n(t), d()));
	}, l = (e) => {
		(i(K(e)) || o) && e.stopImmediatePropagation();
	}, u = (e) => {
		(i(K(e)) || o) && (e.stopImmediatePropagation(), o || (o = !0, $n(t), d()));
	};
	r.addEventListener("blur", s, !0), r.addEventListener("focusout", c, !0), r.addEventListener("focusin", u, !0), r.addEventListener("focus", l, !0);
	let d = () => {
		cancelAnimationFrame(f), r.removeEventListener("blur", s, !0), r.removeEventListener("focusout", c, !0), r.removeEventListener("focusin", u, !0), r.removeEventListener("focus", l, !0), pr = !1, o = !1;
	}, f = requestAnimationFrame(d);
	return d;
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/platform.mjs
function hr(e) {
	if (typeof window > "u" || window.navigator == null) return !1;
	let t = window.navigator.userAgentData?.brands;
	return Array.isArray(t) && t.some((t) => e.test(t.brand)) || e.test(window.navigator.userAgent);
}
function gr(e) {
	return typeof window < "u" && window.navigator != null && e.test(window.navigator.userAgentData?.platform || window.navigator.platform);
}
function _r(e) {
	let t = null;
	return () => (t ??= e(), t);
}
var vr = _r(function() {
	return gr(/^Mac/i);
}), yr = _r(function() {
	return gr(/^iPhone/i);
}), br = _r(function() {
	return gr(/^iPad/i) || vr() && navigator.maxTouchPoints > 1;
}), xr = _r(function() {
	return yr() || br();
}), Sr = _r(function() {
	return vr() || xr();
}), Cr = _r(function() {
	return hr(/AppleWebKit/i) && (xr() || !wr());
}), wr = _r(function() {
	return hr(/Chrome|CriOS|CrMo/i);
}), Tr = _r(function() {
	return hr(/Android/i);
});
//#endregion
//#region node_modules/react-aria/dist/private/utils/isVirtualEvent.mjs
function Er(e) {
	return e.pointerType === "" && e.isTrusted ? !0 : Tr() && e.pointerType ? e.type === "click" && e.buttons === 1 : e.detail === 0 && !e.pointerType;
}
function Dr(e) {
	return !Tr() && e.width === 0 && e.height === 0 || Tr() && e.width === 1 && e.height === 1 && e.pressure === 0 && e.detail === 0 && e.pointerType === "mouse";
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/openLink.mjs
var Or = /*#__PURE__*/ (0, N.createContext)({
	isNative: !0,
	open: Mr,
	useHref: (e) => e
});
function kr() {
	return (0, N.useContext)(Or);
}
function Ar(e, t, n = !0) {
	let { metaKey: r, ctrlKey: i, altKey: a, shiftKey: o } = t, s = Cr() && vr() && !br() ? new KeyboardEvent("keydown", {
		keyIdentifier: "Enter",
		metaKey: r,
		ctrlKey: i,
		altKey: a,
		shiftKey: o
	}) : new MouseEvent("click", {
		metaKey: r,
		ctrlKey: i,
		altKey: a,
		shiftKey: o,
		detail: 1,
		bubbles: !0,
		cancelable: !0
	});
	Ar.isOpening = n, $n(e), e.dispatchEvent(s), Ar.isOpening = !1;
}
Ar.isOpening = !1;
function jr(e, t) {
	if (e instanceof HTMLAnchorElement) t(e);
	else if (e.hasAttribute("data-href")) {
		let n = document.createElement("a");
		n.href = e.getAttribute("data-href"), e.hasAttribute("data-target") && (n.target = e.getAttribute("data-target")), e.hasAttribute("data-rel") && (n.rel = e.getAttribute("data-rel")), e.hasAttribute("data-download") && (n.download = e.getAttribute("data-download")), e.hasAttribute("data-ping") && (n.ping = e.getAttribute("data-ping")), e.hasAttribute("data-referrer-policy") && (n.referrerPolicy = e.getAttribute("data-referrer-policy")), e.appendChild(n), t(n), e.removeChild(n);
	}
}
function Mr(e, t) {
	jr(e, (e) => Ar(e, t));
}
function Nr(e) {
	let t = kr().useHref(e?.href ?? ""), n = {};
	if (e) for (let r of [
		"href",
		"target",
		"rel",
		"download",
		"ping",
		"referrerPolicy"
	]) r in e && e[r] !== void 0 && (n[r] = r === "href" ? t : e[r]);
	return n;
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/useFocusVisible.mjs
var Pr = null, Fr = /* @__PURE__ */ new Set(), Ir = /* @__PURE__ */ new Map(), Lr = !1, Rr = !1, zr = {
	Tab: !0,
	Escape: !0
};
function Br(e, t) {
	for (let n of Fr) n(e, t);
}
function Vr(e) {
	return !(e.metaKey || !vr() && e.altKey || e.ctrlKey || e.key === "Control" || e.key === "Shift" || e.key === "Meta");
}
function Hr(e) {
	Lr = !0, !Ar.isOpening && Vr(e) && (Pr = "keyboard", Br("keyboard", e));
}
function Ur(e) {
	Pr = "pointer", "pointerType" in e && e.pointerType, (e.type === "mousedown" || e.type === "pointerdown") && (Lr = !0, Br("pointer", e));
}
function Wr(e) {
	!Ar.isOpening && Er(e) && (Lr = !0, Pr = "virtual");
}
function Gr(e) {
	if (pr) return;
	let t = K(e), n = Ln(t), r = W(t);
	t === n ? Rr = !0 : t !== r && e.isTrusted && (!Lr && !Rr && (Pr = "virtual", Br("virtual", e)), Lr = !1, Rr = !1);
}
function Kr() {
	pr || (Lr = !1, Rr = !0);
}
function qr(e) {
	let t = Kn(W(K(e)));
	queueMicrotask(() => {
		Kn(W(K(e))) !== t && $r("keyboard");
	});
}
function Jr(e) {
	if (typeof window > "u" || typeof document > "u") return;
	let t = Ln(e), n = W(e);
	if (Ir.get(t)) return;
	let r = t.HTMLElement.prototype.focus;
	Reflect.defineProperty(t.HTMLElement.prototype, "focus", {
		configurable: !0,
		writable: !0,
		value: function() {
			Lr = !0, r.apply(this, arguments);
		}
	}), n.addEventListener("keydown", Hr, !0), n.addEventListener("keyup", Hr, !0), n.addEventListener("click", Wr, !0), n.addEventListener("invalid", qr, !0), t.addEventListener("focus", Gr, !0), t.addEventListener("blur", Kr, !1), typeof PointerEvent < "u" && (n.addEventListener("pointerdown", Ur, !0), n.addEventListener("pointermove", Ur, !0), n.addEventListener("pointerup", Ur, !0)), t.addEventListener("beforeunload", () => {
		Yr(e);
	}, { once: !0 }), Ir.set(t, { focus: r });
}
var Yr = (e, t) => {
	let n = Ln(e), r = W(e);
	t && r.removeEventListener("DOMContentLoaded", t), Ir.has(n) && (Reflect.defineProperty(n.HTMLElement.prototype, "focus", {
		configurable: !0,
		writable: !0,
		value: Ir.get(n).focus
	}), r.removeEventListener("keydown", Hr, !0), r.removeEventListener("keyup", Hr, !0), r.removeEventListener("click", Wr, !0), r.removeEventListener("invalid", qr, !0), n.removeEventListener("focus", Gr, !0), n.removeEventListener("blur", Kr, !1), typeof PointerEvent < "u" && (r.removeEventListener("pointerdown", Ur, !0), r.removeEventListener("pointermove", Ur, !0), r.removeEventListener("pointerup", Ur, !0)), Ir.delete(n));
};
function Xr(e) {
	let t = W(e), n;
	return t.readyState === "loading" ? (n = () => {
		Jr(e);
	}, t.addEventListener("DOMContentLoaded", n)) : Jr(e), () => Yr(e, n);
}
typeof document < "u" && Xr();
function Zr() {
	return Pr !== "pointer";
}
function Qr() {
	return Pr;
}
function $r(e) {
	Pr = e, Br(e, null);
}
var ei = /* @__PURE__ */ new Set([
	"checkbox",
	"radio",
	"range",
	"color",
	"file",
	"image",
	"button",
	"submit",
	"reset"
]);
function ti(e, t, n) {
	let r = n ? K(n) : void 0, i = W(r), a = Ln(r), o = a === void 0 ? HTMLInputElement : a.HTMLInputElement, s = a === void 0 ? HTMLTextAreaElement : a.HTMLTextAreaElement, c = a === void 0 ? HTMLElement : a.HTMLElement, l = a === void 0 ? KeyboardEvent : a.KeyboardEvent, u = Kn(i);
	return e = e || u instanceof o && !ei.has(u.type) || u instanceof s || u instanceof c && u.isContentEditable, !(e && t === "keyboard" && n instanceof l && !zr[n.key]);
}
function ni(e, t, n) {
	Jr(), (0, N.useEffect)(() => {
		if (n?.enabled === !1) return;
		let t = (t, r) => {
			ti(!!n?.isTextInput, t, r) && e(Zr());
		};
		return Fr.add(t), () => {
			Fr.delete(t);
		};
	}, t);
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/getMetaValue.mjs
function ri(e, t) {
	let n = Ln(t), r = W(t);
	if (r == null || n == null) return;
	let i, a = `meta[name="${CSS.escape(e)}"], meta[property="${CSS.escape(e)}"]`, o = r.querySelector(a);
	return o && o instanceof n.HTMLMetaElement && (e === "csp-nonce" && o.nonce && (i ??= o.nonce || void 0), o.content && (i ??= o.content || void 0)), e === "csp-nonce" && (i ??= n.__webpack_nonce__ || globalThis.__webpack_nonce__ || void 0), i;
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/keyboard.mjs
var ii = 100, ai = 600, q = {
	isOpen: !1,
	screenWidth: 0,
	screenHeight: 0,
	screenAngle: 0,
	screenTimeout: 0,
	startTimeStamp: 0,
	endTimeStamp: 0,
	resizeTimeStamp: 0,
	resizeTimeout: 0
}, oi = /* @__PURE__ */ new Set([
	"checkbox",
	"radio",
	"range",
	"color",
	"file",
	"image",
	"button",
	"submit",
	"reset"
]);
function si() {
	let e = Number(window.visualViewport?.width ?? window.innerWidth), t = Number(window.visualViewport?.height ?? window.innerHeight), n = Number(window.visualViewport?.scale ?? 1);
	return {
		width: e * n,
		height: t * n,
		angle: window.screen.orientation?.angle ?? 0
	};
}
function ci(e) {
	q.resizeTimeStamp <= e.timeStamp + 50 && (q.resizeTimeStamp = e.timeStamp + 150, window.clearTimeout(q.resizeTimeout), q.resizeTimeout = window.setTimeout(li, 150));
}
function li() {
	let e = ri("viewport");
	if (Tr() && e?.includes("overlays-content")) return;
	let t = performance.now(), n = si(), r = t - q.startTimeStamp, i = q.screenHeight - n.height, a = q.screenAngle - n.angle;
	Math.abs(a) % 180 && q.screenWidth - n.height < ii && (q.screenWidth = n.width, q.screenHeight = n.height, q.screenAngle = n.angle, i = 0), r > ai && (window.clearTimeout(q.screenTimeout), q.screenTimeout = window.setTimeout(() => {
		let e = mi(document.hasFocus() ? Kn() : null), t = si();
		Math.abs(q.screenAngle - t.angle) % 180 || q.isOpen && e || (q.screenWidth = t.width, q.screenHeight = t.height, q.screenAngle = t.angle, q.isOpen = !1);
	}, ai)), r <= ai && i >= ii && (q.endTimeStamp = t), q.isOpen = i >= ii;
}
function ui() {
	let e = si(), t = q.screenAngle - e.angle;
	if (Math.abs(t) % 180 && !q.isOpen) {
		let e = q.screenWidth;
		q.screenWidth = q.screenHeight, q.screenHeight = e;
	}
	q.isOpen || (q.screenAngle = e.angle);
}
function di(e) {
	let t = mi(K(e)), n = performance.now(), r = si(), i = q.screenHeight - r.height;
	i < ii && t && (q.screenWidth = r.width, q.screenHeight = r.height, q.screenAngle = r.angle, q.startTimeStamp = n), t && window.clearTimeout(q.screenTimeout), i >= ii && t && (q.endTimeStamp = n);
}
function fi() {
	let e = si();
	Hn(window.visualViewport, "resize", Cr() ? li : ci), Hn(window.screen.orientation, "change", ui), Hn(window, "focus", di, {
		capture: !0,
		passive: !0
	}), q.screenWidth = e.width, q.screenHeight = e.height, q.screenAngle = e.angle;
}
typeof document < "u" && (document.readyState === "loading" ? Hn(document, "DOMContentLoaded", fi) : fi());
function pi() {
	let e = ri("viewport");
	return Tr() && e?.includes("overlays-content") ? !1 : q.isOpen ? !0 : q.startTimeStamp ? q.endTimeStamp >= q.startTimeStamp ? !0 : performance.now() - q.startTimeStamp <= ai ? q.endTimeStamp > 0 || window.navigator.maxTouchPoints > 0 : !1 : window.navigator.maxTouchPoints > 0;
}
function mi(e) {
	if (!(e instanceof Element) || !sr(e)) return !1;
	let t = e instanceof HTMLTextAreaElement, n = e instanceof HTMLElement && e.isContentEditable, r = e instanceof HTMLInputElement && !oi.has(e.type);
	return t || n || r;
}
function hi(e) {
	return vr() ? e.metaKey : e.ctrlKey;
}
function gi() {
	return q.isOpen;
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useEffectEvent.mjs
var _i = N.useInsertionEffect ?? H;
function vi(e) {
	let t = (0, N.useRef)(null);
	return _i(() => {
		t.current = e;
	}, [e]), (0, N.useCallback)((...e) => {
		let n = t.current;
		return n?.(...e);
	}, []);
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useEvent.mjs
function yi(e, t, n, r) {
	let i = vi(n), a = n == null;
	(0, N.useEffect)(() => {
		if (!(a || e.current == null)) return Hn(e.current, t, i, r);
	}, [
		e,
		t,
		r,
		a
	]);
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useLabels.mjs
function bi(e, t) {
	let { id: n, "aria-label": r, "aria-labelledby": i } = e;
	return n = _n(n), i && r ? i = [.../* @__PURE__ */ new Set([n, ...i.trim().split(/\s+/)])].join(" ") : i &&= i.trim().split(/\s+/).join(" "), !r && !i && t && (r = t), {
		id: n,
		"aria-label": r,
		"aria-labelledby": i
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/i18n/utils.mjs
var xi = /* @__PURE__ */ new Set([
	"Arab",
	"Syrc",
	"Samr",
	"Mand",
	"Thaa",
	"Mend",
	"Nkoo",
	"Adlm",
	"Rohg",
	"Hebr"
]), Si = /* @__PURE__ */ new Set([
	"ae",
	"ar",
	"arc",
	"bcc",
	"bqi",
	"ckb",
	"dv",
	"fa",
	"glk",
	"he",
	"ku",
	"mzn",
	"nqo",
	"pnb",
	"ps",
	"sd",
	"ug",
	"ur",
	"yi"
]);
function Ci(e) {
	if (Intl.Locale) {
		let t = new Intl.Locale(e).maximize(), n = typeof t.getTextInfo == "function" ? t.getTextInfo() : t.textInfo;
		if (n) return n.direction === "rtl";
		if (t.script) return xi.has(t.script);
	}
	let t = e.split("-")[0];
	return Si.has(t);
}
//#endregion
//#region node_modules/react-aria/dist/private/i18n/useDefaultLocale.mjs
var wi = Symbol.for("react-aria.i18n.locale");
function Ti() {
	let e = typeof window < "u" && window[wi] || typeof navigator < "u" && (navigator.language || navigator.userLanguage) || "en-US";
	try {
		Intl.DateTimeFormat.supportedLocalesOf([e]);
	} catch {
		e = "en-US";
	}
	return {
		locale: e,
		direction: Ci(e) ? "rtl" : "ltr"
	};
}
var Ei = Ti(), Di = /* @__PURE__ */ new Set();
function Oi() {
	Ei = Ti();
	for (let e of Di) e(Ei);
}
function ki() {
	let e = dn(), [t, n] = (0, N.useState)(Ei);
	return (0, N.useEffect)(() => (Di.size === 0 && window.addEventListener("languagechange", Oi), Di.add(n), () => {
		Di.delete(n), Di.size === 0 && window.removeEventListener("languagechange", Oi);
	}), []), e ? {
		locale: typeof window < "u" && window[wi] || "en-US",
		direction: "ltr"
	} : t;
}
//#endregion
//#region node_modules/react-aria/dist/private/i18n/I18nProvider.mjs
var Ai = /*#__PURE__*/ N.createContext(null);
function ji() {
	let e = ki();
	return (0, N.useContext)(Ai) || e;
}
//#endregion
//#region node_modules/@internationalized/string/dist/private/LocalizedStringDictionary.mjs
var Mi = Symbol.for("react-aria.i18n.locale"), Ni = Symbol.for("react-aria.i18n.strings"), Pi = void 0, Fi = class e {
	constructor(e, t = "en-US") {
		this.strings = Object.fromEntries(Object.entries(e).filter(([, e]) => e)), this.defaultLocale = t;
	}
	getStringForLocale(e, t) {
		let n = this.getStringsForLocale(t)[e];
		if (!n) throw Error(`Could not find intl message ${e} in ${t} locale`);
		return n;
	}
	getStringsForLocale(e) {
		let t = this.strings[e];
		return t || (t = Ii(e, this.strings, this.defaultLocale), this.strings[e] = t), t;
	}
	static getGlobalDictionaryForPackage(t) {
		if (typeof window > "u") return null;
		let n = window[Mi];
		if (Pi === void 0) {
			let t = window[Ni];
			if (!t) return null;
			Pi = {};
			for (let r in t) Pi[r] = new e({ [n]: t[r] }, n);
		}
		let r = Pi?.[t];
		if (!r) throw Error(`Strings for package "${t}" were not included by LocalizedStringProvider. Please add it to the list passed to createLocalizedStringDictionary.`);
		return r;
	}
};
function Ii(e, t, n = "en-US") {
	if (t[e]) return t[e];
	let r = Li(e), i = Ri(e);
	if (i && t[`${r}-${i}`]) return t[`${r}-${i}`];
	if (t[r]) return t[r];
	for (let e in t) if (e.startsWith(r + "-")) return t[e];
	return t[n];
}
function Li(e) {
	return Intl.Locale ? new Intl.Locale(e).language : e.split("-")[0];
}
function Ri(e) {
	if (Intl.Locale) return new Intl.Locale(e).script;
}
//#endregion
//#region node_modules/@internationalized/string/dist/private/LocalizedStringFormatter.mjs
var zi = /* @__PURE__ */ new Map(), Bi = /* @__PURE__ */ new Map(), Vi = class {
	constructor(e, t) {
		this.locale = e, this.strings = t;
	}
	format(e, t) {
		let n = this.strings.getStringForLocale(e, this.locale);
		return typeof n == "function" ? n(t, this) : n;
	}
	plural(e, t, n = "cardinal") {
		let r = t["=" + e];
		if (r) return typeof r == "function" ? r() : r;
		let i = this.locale + ":" + n, a = zi.get(i);
		return a || (a = new Intl.PluralRules(this.locale, { type: n }), zi.set(i, a)), r = t[a.select(e)] || t.other, typeof r == "function" ? r() : r;
	}
	number(e) {
		let t = Bi.get(this.locale);
		return t || (t = new Intl.NumberFormat(this.locale), Bi.set(this.locale, t)), t.format(e);
	}
	select(e, t) {
		let n = e[t] || e.other;
		return typeof n == "function" ? n() : n;
	}
}, Hi = /* @__PURE__ */ new WeakMap();
function Ui(e) {
	let t = Hi.get(e);
	return t || (t = new Fi(e), Hi.set(e, t)), t;
}
function Wi(e, t) {
	return t && Fi.getGlobalDictionaryForPackage(t) || Ui(e);
}
function Gi(e, t) {
	let { locale: n } = ji(), r = Wi(e, t);
	return (0, N.useMemo)(() => new Vi(n, r), [n, r]);
}
//#endregion
//#region node_modules/react-stately/dist/private/utils/useControlledState.mjs
var Ki = N.useInsertionEffect ?? N.useLayoutEffect;
function qi(e, t, n) {
	let [r, i] = (0, N.useState)(e || t), a = (0, N.useRef)(r), o = (0, N.useRef)(e !== void 0), s = e !== void 0;
	(0, N.useEffect)(() => {
		o.current, o.current = s;
	}, [s]);
	let c = s ? e : r;
	Ki(() => {
		a.current = c;
	});
	let [, l] = (0, N.useReducer)(() => ({}), {});
	return [c, (0, N.useCallback)((e, ...t) => {
		let r = typeof e == "function" ? e(a.current) : e;
		Object.is(a.current, r) || (a.current = r, i(r), l(), n?.(r, ...t));
	}, [n])];
}
//#endregion
//#region node_modules/react-aria-components/dist/private/Autocomplete.mjs
var Ji = /*#__PURE__*/ (0, N.createContext)(null), Yi = /*#__PURE__*/ (0, N.createContext)(null), Xi = class {
	constructor(e) {
		this.value = null, this.level = 0, this.hasChildNodes = !1, this.rendered = null, this.textValue = "", this["aria-label"] = void 0, this.index = 0, this.parentKey = null, this.prevKey = null, this.nextKey = null, this.firstChildKey = null, this.lastChildKey = null, this.props = {}, this.colSpan = null, this.colIndex = null, this.type = this.constructor.type, this.key = e;
	}
	get childNodes() {
		throw Error("childNodes is not supported");
	}
	clone() {
		let e = new this.constructor(this.key);
		return e.value = this.value, e.level = this.level, e.hasChildNodes = this.hasChildNodes, e.rendered = this.rendered, e.textValue = this.textValue, e["aria-label"] = this["aria-label"], e.index = this.index, e.parentKey = this.parentKey, e.prevKey = this.prevKey, e.nextKey = this.nextKey, e.firstChildKey = this.firstChildKey, e.lastChildKey = this.lastChildKey, e.props = this.props, e.render = this.render, e.colSpan = this.colSpan, e.colIndex = this.colIndex, e;
	}
	filter(e, t, n) {
		let r = this.clone();
		return t.addDescendants(r, e), r;
	}
}, J = class extends Xi {
	filter(e, t, n) {
		let [r, i] = ea(e, t, this.firstChildKey, n), a = this.clone();
		return a.firstChildKey = r, a.lastChildKey = i, a;
	}
};
(class extends Xi {
	static {
		this.type = "header";
	}
});
var Zi = class extends Xi {
	static {
		this.type = "loader";
	}
}, Qi = class extends J {
	static {
		this.type = "item";
	}
	filter(e, t, n) {
		if (n(this.textValue, this)) {
			let n = this.clone();
			return t.addDescendants(n, e), n;
		}
		return null;
	}
};
(class extends J {
	static {
		this.type = "section";
	}
	filter(e, t, n) {
		let r = super.filter(e, t, n);
		if (r && r.lastChildKey !== null) {
			let t = e.getItem(r.lastChildKey);
			if (t && t.type !== "header") return r;
		}
		return null;
	}
});
var $i = class {
	get size() {
		return this.itemCount;
	}
	getKeys() {
		return this.keyMap.keys();
	}
	*[Symbol.iterator]() {
		let e = this.firstKey == null ? void 0 : this.keyMap.get(this.firstKey);
		for (; e;) yield e, e = e.nextKey == null ? void 0 : this.keyMap.get(e.nextKey);
	}
	getChildren(e) {
		let t = this.keyMap;
		return { *[Symbol.iterator]() {
			let n = t.get(e), r = n?.firstChildKey == null ? null : t.get(n.firstChildKey);
			for (; r;) yield r, r = r.nextKey == null ? void 0 : t.get(r.nextKey);
		} };
	}
	getKeyBefore(e) {
		let t = this.keyMap.get(e);
		if (!t) return null;
		if (t.prevKey != null) {
			for (t = this.keyMap.get(t.prevKey); t && t.type !== "item" && t.lastChildKey != null;) t = this.keyMap.get(t.lastChildKey);
			return t?.key ?? null;
		}
		return t.parentKey;
	}
	getKeyAfter(e) {
		let t = this.keyMap.get(e);
		if (!t) return null;
		if (t.type !== "item" && t.firstChildKey != null) return t.firstChildKey;
		for (; t;) {
			if (t.nextKey != null) return t.nextKey;
			if (t.parentKey != null) t = this.keyMap.get(t.parentKey);
			else return null;
		}
		return null;
	}
	getFirstKey() {
		return this.firstKey;
	}
	getLastKey() {
		let e = this.lastKey == null ? null : this.keyMap.get(this.lastKey);
		for (; e?.lastChildKey != null;) e = this.keyMap.get(e.lastChildKey);
		return e?.key ?? null;
	}
	getItem(e) {
		return this.keyMap.get(e) ?? null;
	}
	at() {
		throw Error("Not implemented");
	}
	clone() {
		let e = this.constructor, t = new e();
		return t.keyMap = new Map(this.keyMap), t.firstKey = this.firstKey, t.lastKey = this.lastKey, t.itemCount = this.itemCount, t;
	}
	addNode(e) {
		if (this.frozen) throw Error("Cannot add a node to a frozen collection");
		e.type === "item" && this.keyMap.get(e.key) == null && this.itemCount++, this.keyMap.set(e.key, e);
	}
	addDescendants(e, t) {
		this.addNode(e);
		let n = t.getChildren(e.key);
		for (let e of n) this.addDescendants(e, t);
	}
	removeNode(e) {
		if (this.frozen) throw Error("Cannot remove a node to a frozen collection");
		let t = this.keyMap.get(e);
		t != null && t.type === "item" && this.itemCount--, this.keyMap.delete(e);
	}
	commit(e, t, n = !1) {
		if (this.frozen) throw Error("Cannot commit a frozen collection");
		this.firstKey = e, this.lastKey = t, this.frozen = !n;
	}
	filter(e) {
		let t = new this.constructor(), [n, r] = ea(this, t, this.firstKey, e);
		return t?.commit(n, r), t;
	}
	constructor() {
		this.keyMap = /* @__PURE__ */ new Map(), this.firstKey = null, this.lastKey = null, this.frozen = !1, this.itemCount = 0;
	}
};
function ea(e, t, n, r) {
	if (n == null) return [null, null];
	let i = null, a = null, o = e.getItem(n);
	for (; o != null;) {
		let n = o.filter(e, t, r);
		n != null && (n.nextKey = null, a && (n.prevKey = a.key, a.nextKey = n.key), i ??= n, t.addNode(n), a = n), o = o.nextKey == null ? null : e.getItem(o.nextKey);
	}
	if (a && a.type === "separator") {
		let e = a.prevKey;
		t.removeNode(a.key), e == null ? a = null : (a = t.getItem(e), a.nextKey = null);
	}
	return [i?.key ?? null, a?.key ?? null];
}
//#endregion
//#region node_modules/react-aria/dist/private/collections/Document.mjs
var ta = class {
	constructor(e) {
		this._firstChild = null, this._lastChild = null, this._previousSibling = null, this._nextSibling = null, this._parentNode = null, this._minInvalidChildIndex = null, this.ownerDocument = e;
	}
	*[Symbol.iterator]() {
		let e = this.firstChild;
		for (; e;) yield e, e = e.nextSibling;
	}
	get firstChild() {
		return this._firstChild;
	}
	set firstChild(e) {
		this._firstChild = e, this.ownerDocument.markDirty(this);
	}
	get lastChild() {
		return this._lastChild;
	}
	set lastChild(e) {
		this._lastChild = e, this.ownerDocument.markDirty(this);
	}
	get previousSibling() {
		return this._previousSibling;
	}
	set previousSibling(e) {
		this._previousSibling = e, this.ownerDocument.markDirty(this);
	}
	get nextSibling() {
		return this._nextSibling;
	}
	set nextSibling(e) {
		this._nextSibling = e, this.ownerDocument.markDirty(this);
	}
	get parentNode() {
		return this._parentNode;
	}
	set parentNode(e) {
		this._parentNode = e, this.ownerDocument.markDirty(this);
	}
	get isConnected() {
		return this.parentNode?.isConnected || !1;
	}
	invalidateChildIndices(e) {
		(this._minInvalidChildIndex == null || !this._minInvalidChildIndex.isConnected || e.index < this._minInvalidChildIndex.index) && (this._minInvalidChildIndex = e, this.ownerDocument.markDirty(this));
	}
	updateChildIndices() {
		let e = this._minInvalidChildIndex;
		for (; e;) e.index = e.previousSibling ? e.previousSibling.index + 1 : 0, e = e.nextSibling;
		this._minInvalidChildIndex = null;
	}
	appendChild(e) {
		e.parentNode && e.parentNode.removeChild(e), this.firstChild ??= e, this.lastChild ? (this.lastChild.nextSibling = e, e.index = this.lastChild.index + 1, e.previousSibling = this.lastChild) : (e.previousSibling = null, e.index = 0), e.parentNode = this, e.nextSibling = null, this.lastChild = e, this.ownerDocument.markDirty(this), this.isConnected && this.ownerDocument.queueUpdate();
	}
	insertBefore(e, t) {
		if (t == null) return this.appendChild(e);
		e.parentNode && e.parentNode.removeChild(e), e.nextSibling = t, e.previousSibling = t.previousSibling, e.index = t.index - 1, this.firstChild === t ? this.firstChild = e : t.previousSibling && (t.previousSibling.nextSibling = e), t.previousSibling = e, e.parentNode = t.parentNode, this.invalidateChildIndices(e), this.isConnected && this.ownerDocument.queueUpdate();
	}
	removeChild(e) {
		e.parentNode === this && (this._minInvalidChildIndex === e && (this._minInvalidChildIndex = null), e.nextSibling && (this.invalidateChildIndices(e.nextSibling), e.nextSibling.previousSibling = e.previousSibling), e.previousSibling && (e.previousSibling.nextSibling = e.nextSibling), this.firstChild === e && (this.firstChild = e.nextSibling), this.lastChild === e && (this.lastChild = e.previousSibling), e.parentNode = null, e.nextSibling = null, e.previousSibling = null, e.index = 0, this.ownerDocument.markDirty(e), this.isConnected && this.ownerDocument.queueUpdate());
	}
	addEventListener() {}
	removeEventListener() {}
	get previousVisibleSibling() {
		let e = this.previousSibling;
		for (; e && e.isHidden;) e = e.previousSibling;
		return e;
	}
	get nextVisibleSibling() {
		let e = this.nextSibling;
		for (; e && e.isHidden;) e = e.nextSibling;
		return e;
	}
	get firstVisibleChild() {
		let e = this.firstChild;
		for (; e && e.isHidden;) e = e.nextSibling;
		return e;
	}
	get lastVisibleChild() {
		let e = this.lastChild;
		for (; e && e.isHidden;) e = e.previousSibling;
		return e;
	}
}, na = class e extends ta {
	constructor(e, t) {
		super(t), this.nodeType = 8, this.isMutated = !0, this._index = 0, this.isHidden = !1, this.node = null;
	}
	get index() {
		return this._index;
	}
	set index(e) {
		this._index = e, this.ownerDocument.markDirty(this);
	}
	get level() {
		return this.parentNode instanceof e ? this.parentNode.level + +(this.parentNode.node?.type === "item") : 0;
	}
	getMutableNode() {
		return this.node == null ? null : (this.isMutated ||= (this.node = this.node.clone(), !0), this.ownerDocument.markDirty(this), this.node);
	}
	updateNode() {
		let t = this.nextVisibleSibling, n = this.getMutableNode();
		if (n != null && (n.index = this.index, n.level = this.level, n.parentKey = this.parentNode instanceof e ? this.parentNode.node?.key ?? null : null, n.prevKey = this.previousVisibleSibling?.node?.key ?? null, n.nextKey = t?.node?.key ?? null, n.hasChildNodes = !!this.firstChild, n.firstChildKey = this.firstVisibleChild?.node?.key ?? null, n.lastChildKey = this.lastVisibleChild?.node?.key ?? null, (n.colSpan != null || n.colIndex != null) && t)) {
			let e = (n.colIndex ?? n.index) + (n.colSpan ?? 1);
			if (t.node != null && e !== t.node.colIndex) {
				let n = t.getMutableNode();
				n.colIndex = e;
			}
		}
	}
	setProps(e, t, n, r, i) {
		let a, { value: o, textValue: s, id: c, ...l } = e;
		if (this.node == null ? (a = new n(c ?? `react-aria-${++this.ownerDocument.nodeId}`), this.node = a) : a = this.getMutableNode(), l.ref = t, a.props = l, a.rendered = r, a.render = i, a.value = o, e["aria-label"] && (a["aria-label"] = e["aria-label"]), a.textValue = s || (typeof l.children == "string" ? l.children : "") || e["aria-label"] || "", c != null && c !== a.key) throw Error("Cannot change the id of an item");
		l.colSpan != null && (a.colSpan = l.colSpan), this.isConnected && this.ownerDocument.queueUpdate();
	}
	get style() {
		let e = this;
		return {
			get display() {
				return e.isHidden ? "none" : "";
			},
			set display(t) {
				let n = t === "none";
				if (e.isHidden !== n) {
					(e.parentNode?.firstVisibleChild === e || e.parentNode?.lastVisibleChild === e) && e.ownerDocument.markDirty(e.parentNode);
					let t = e.previousVisibleSibling, r = e.nextVisibleSibling;
					t && e.ownerDocument.markDirty(t), r && e.ownerDocument.markDirty(r), e.isHidden = n, e.ownerDocument.markDirty(e);
				}
			}
		};
	}
	hasAttribute() {}
	setAttribute() {}
	setAttributeNS() {}
	removeAttribute() {}
}, ra = class extends ta {
	constructor(e) {
		super(null), this.nodeType = 11, this.ownerDocument = this, this.dirtyNodes = /* @__PURE__ */ new Set(), this.isSSR = !1, this.nodeId = 0, this.nodesByProps = /* @__PURE__ */ new WeakMap(), this.keyOwners = /* @__PURE__ */ new Map(), this.nextCollection = null, this.subscriptions = /* @__PURE__ */ new Set(), this.queuedRender = !1, this.inSubscription = !1, this.collection = e, this.nextCollection = e;
	}
	get isConnected() {
		return !0;
	}
	createElement(e) {
		return new na(e, this);
	}
	getMutableCollection() {
		return this.nextCollection ||= this.collection.clone(), this.nextCollection;
	}
	markDirty(e) {
		this.dirtyNodes.add(e);
	}
	addNode(e) {
		if (e.isHidden || e.node == null) return;
		let t = this.getMutableCollection();
		if (!t.getItem(e.node.key)) for (let t of e) this.addNode(t);
		t.addNode(e.node);
	}
	removeNode(e) {
		for (let t of e) this.removeNode(t);
		e.node && this.getMutableCollection().removeNode(e.node.key);
	}
	getCollection() {
		return this.inSubscription || (this.queuedRender = !1, this.updateCollection()), this.collection;
	}
	updateCollection() {
		for (let e of this.dirtyNodes) e instanceof na && (!e.isConnected || e.isHidden) ? this.removeNode(e) : e.updateChildIndices();
		for (let e of this.dirtyNodes) e instanceof na ? (e.isConnected && !e.isHidden && (e.updateNode(), this.addNode(e)), e.node && this.dirtyNodes.delete(e), e.isMutated = !1) : this.dirtyNodes.delete(e);
		this.nextCollection && (this.nextCollection.commit(this.firstVisibleChild?.node?.key ?? null, this.lastVisibleChild?.node?.key ?? null, this.isSSR), this.isSSR || (this.collection = this.nextCollection, this.nextCollection = null));
	}
	queueUpdate() {
		if (!(this.dirtyNodes.size === 0 || this.queuedRender)) {
			this.queuedRender = !0, this.inSubscription = !0, this.isSSR || (this.collection = this.collection.clone());
			for (let e of this.subscriptions) e();
			this.inSubscription = !1;
		}
	}
	subscribe(e) {
		return this.subscriptions.add(e), this.queuedRender && e(), () => this.subscriptions.delete(e);
	}
	resetAfterSSR() {
		this.isSSR && (this.isSSR = !1, this.firstChild = null, this.lastChild = null, this.nodeId = 0, this.keyOwners.clear());
	}
};
//#endregion
//#region node_modules/react-aria/dist/private/collections/useCachedChildren.mjs
function ia(e) {
	let { children: t, items: n, idScope: r, addIdAndValue: i, dependencies: a = [] } = e, o = (0, N.useMemo)(() => void 0, [t]), s = (0, N.useMemo)(() => /* @__PURE__ */ new WeakMap(), [...a, o]);
	return (0, N.useMemo)(() => {
		if (n && typeof t == "function") {
			let e = [];
			for (let a of n) {
				let n = aa(a) ? a : null, o = n ? s.get(n) : null;
				if (!o) {
					o = t(a);
					let c = o.props.id ?? a?.key ?? a?.id;
					r != null && o.props.id == null && c != null && (c = r + ":" + c);
					let l = c ?? e.length;
					o = (0, N.cloneElement)(o, i ? {
						key: l,
						id: c,
						value: a
					} : { key: l }), n && s.set(n, o);
				}
				e.push(o);
			}
			return e;
		}
		if (typeof t != "function") return t;
	}, [
		t,
		n,
		s,
		r,
		i
	]);
}
function aa(e) {
	switch (typeof e) {
		case "object": return e != null;
		case "function":
		case "symbol": return !0;
		default: return !1;
	}
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/runAfterTransition.mjs
var oa = /* @__PURE__ */ new Map(), sa = /* @__PURE__ */ new Set();
function ca(e) {
	return "propertyName" in e;
}
function la(e) {
	let t = K(e);
	if (!ca(e) || !t) return;
	let n = oa.get(t);
	n || (n = /* @__PURE__ */ new Set(), oa.set(t, n), t.addEventListener("transitioncancel", ua, { once: !0 })), n.add(e.propertyName);
}
function ua(e) {
	let t = K(e);
	if (!ca(e) || !t) return;
	let n = oa.get(t);
	if (n && (n.delete(e.propertyName), n.size === 0 && (t.removeEventListener("transitioncancel", ua), oa.delete(t)), oa.size === 0)) for (let e of sa) e(!0), sa.delete(e);
}
function da() {
	Hn(document, "transitionrun", la), Hn(document, "transitionend", ua);
}
function fa() {
	for (let [e] of oa) "isConnected" in e && !e.isConnected && oa.delete(e);
}
typeof document < "u" && (document.readyState === "loading" ? Hn(document, "DOMContentLoaded", da) : da());
function pa(e) {
	let t = window.requestAnimationFrame(() => {
		if (fa(), oa.size === 0) return e(!1);
		sa.add(e);
	});
	return () => {
		window.cancelAnimationFrame(t), sa.delete(e);
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/focusSafely.mjs
function ma(e) {
	if (!e.isConnected) return;
	let t = W(e);
	if (Qr() === "virtual") {
		let n = Kn(t);
		pa(() => {
			let r = Kn(t);
			(r === n || r === t.body) && e.isConnected && $n(e);
		});
	} else $n(e);
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/useFocus.mjs
function ha(e) {
	let { isDisabled: t, onFocus: n, onBlur: r, onFocusChange: i } = e, a = (0, N.useCallback)((e) => {
		if (K(e) === e.currentTarget) return r && r(e), i && i(!1), !0;
	}, [r, i]), o = fr(a), s = (0, N.useCallback)((e) => {
		let t = K(e), r = W(t), a = r ? Kn(r) : Kn();
		t === e.currentTarget && t === a && (n && n(e), i && i(!0), o(e));
	}, [
		i,
		n,
		o
	]);
	return { focusProps: {
		onFocus: !t && (n || i || r) ? s : void 0,
		onBlur: !t && (r || i) ? a : void 0
	} };
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/createEventHandler.mjs
function ga(e) {
	if (e) return (t) => {
		let n = !0;
		e({
			...t,
			preventDefault() {
				t.preventDefault();
			},
			isDefaultPrevented() {
				return t.isDefaultPrevented();
			},
			stopPropagation() {
				n = !0;
			},
			continuePropagation() {
				n = !1, typeof t.continuePropagation == "function" && t.continuePropagation();
			},
			isPropagationStopped() {
				return n;
			}
		}), n && !(typeof t.isPropagationStopped == "function" && t.isPropagationStopped()) && t.stopPropagation();
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/createKeyboardShortcutHandler.mjs
var _a = /* @__PURE__ */ new Set([
	"shift",
	"alt",
	"control",
	"meta",
	"mod"
]), va = [
	"Alt",
	"Control",
	"Meta",
	"Shift"
];
function ya(e) {
	let t = /* @__PURE__ */ new Set();
	return e.alt && t.add("Alt"), e.shift && t.add("Shift"), e.ctrl && t.add("Control"), e.meta && t.add("Meta"), e.mod && t.add(vr() ? "Meta" : "Control"), t;
}
function ba(e) {
	let t = /* @__PURE__ */ new Set();
	return e.altKey && t.add("Alt"), e.ctrlKey && t.add("Control"), e.metaKey && t.add("Meta"), e.shiftKey && t.add("Shift"), t;
}
function xa(e) {
	return va.filter((t) => e.has(t));
}
function Sa(e) {
	let t = e.split("+").reduce((e, t) => {
		let n = t.toLowerCase();
		return _a.has(n) ? n === "shift" ? e.shift = !0 : n === "alt" ? e.alt = !0 : n === "control" ? e.ctrl = !0 : n === "meta" ? e.meta = !0 : n === "mod" && (e.mod = !0) : e.key = t, e;
	}, {
		shift: !1,
		alt: !1,
		ctrl: !1,
		meta: !1,
		mod: !1,
		key: ""
	});
	if (t.key === "") throw Error(`Invalid keyboard shortcut: "${e}". Must include exactly one non-modifier key (e.g. "a", "Enter", "ArrowDown"). Combine any of Shift, Alt, Ctrl, Meta, and Mod.`);
	return t;
}
function Ca(e) {
	return e.toLowerCase();
}
var wa = {
	space: " ",
	esc: "escape",
	del: "delete",
	ins: "insert",
	left: "arrowleft",
	right: "arrowright",
	up: "arrowup",
	down: "arrowdown",
	pageup: "pageup",
	pagedown: "pagedown"
};
function Ta(e) {
	let t = Ca(e);
	return wa[t] ?? t;
}
function Ea(e) {
	let t = xa(ya(e)), n = Ta(e.key);
	return t.length > 0 ? `${t.join("+")}+${n}` : n;
}
function Da(e) {
	let t = xa(ba(e)), n = Ca(e.key);
	return (t.length > 0 ? `${t.join("+")}+` : "") + n;
}
function Oa(e) {
	let t = /* @__PURE__ */ new Map();
	for (let [n, r] of Object.entries(e)) {
		let e = Sa(n);
		t.set(Ea(e), r);
	}
	return (e) => {
		let n = Da(e), r = t.get(n), i = r?.(e);
		i === void 0 && r !== void 0 ? i = {
			shouldContinuePropagation: !1,
			shouldPreventDefault: !0
		} : typeof i == "boolean" && (i = {
			shouldContinuePropagation: !i,
			shouldPreventDefault: i
		}), i?.shouldPreventDefault && e.preventDefault(), (!r || i?.shouldContinuePropagation) && e.continuePropagation();
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/useKeyboard.mjs
function ka(e) {
	let { shortcuts: t, allowRepeats: n = !1, allowComposing: r = !1 } = e, i, a;
	if (t) {
		let o = Oa(t), s = ga((e) => {
			G(e.currentTarget, K(e)) ? e.nativeEvent?.repeat && !n || e.nativeEvent?.isComposing && !r ? e.continuePropagation() : o(e) : e.continuePropagation();
		}), c = ga((e) => {
			G(e.currentTarget, K(e)) && (e.nativeEvent?.repeat && !n || e.nativeEvent?.isComposing), e.continuePropagation();
		});
		i = e.onKeyDown ? Qt(e.onKeyDown, s) : s, a = e.onKeyUp ? Qt(e.onKeyUp, c) : c;
	} else i = ga(e.onKeyDown), a = ga(e.onKeyUp);
	return { keyboardProps: e.isDisabled ? {} : {
		onKeyDown: i,
		onKeyUp: a
	} };
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useSyncRef.mjs
function Aa(e, t) {
	H(() => {
		if (e && e.ref && t) return e.ref.current = t.current, () => {
			e.ref && (e.ref.current = null);
		};
	});
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/useFocusable.mjs
var ja = /*#__PURE__*/ N.createContext(null);
function Ma(e) {
	let t = (0, N.useContext)(ja) || {};
	Aa(t, e);
	let { ref: n, ...r } = t;
	return r;
}
function Na(e, t) {
	let { focusProps: n } = ha(e), { keyboardProps: r } = ka(e), i = U(n, r), a = Ma(t), o = e.isDisabled ? {} : a, s = (0, N.useRef)(e.autoFocus);
	(0, N.useEffect)(() => {
		s.current && t.current && ma(t.current), s.current = !1;
	}, [t]);
	let c = e.excludeFromTabOrder ? -1 : 0;
	return e.isDisabled && (c = void 0), { focusableProps: U({
		...i,
		tabIndex: c
	}, o) };
}
//#endregion
//#region node_modules/react-aria/dist/private/collections/Hidden.mjs
typeof HTMLTemplateElement < "u" && (Object.defineProperty(HTMLTemplateElement.prototype, "firstChild", {
	configurable: !0,
	enumerable: !0,
	get: function() {
		return this.content.firstChild;
	}
}), Object.defineProperty(HTMLTemplateElement.prototype, "appendChild", {
	configurable: !0,
	enumerable: !0,
	value: function(e) {
		return this.content.appendChild(e);
	}
}), Object.defineProperty(HTMLTemplateElement.prototype, "removeChild", {
	configurable: !0,
	enumerable: !0,
	value: function(e) {
		return this.content.removeChild(e);
	}
}), Object.defineProperty(HTMLTemplateElement.prototype, "insertBefore", {
	configurable: !0,
	enumerable: !0,
	value: function(e, t) {
		return this.content.insertBefore(e, t);
	}
}));
var Pa = /*#__PURE__*/ (0, N.createContext)(!1);
function Fa(e) {
	if ((0, N.useContext)(Pa)) return /*#__PURE__*/ N.createElement(N.Fragment, null, e.children);
	let t = /*#__PURE__*/ N.createElement(Pa.Provider, { value: !0 }, e.children);
	return /*#__PURE__*/ N.createElement("template", null, t);
}
function Ia(e) {
	let t = (t, n) => (0, N.useContext)(Pa) ? null : e(t, n);
	return t.displayName = e.displayName || e.name, (0, N.forwardRef)(t);
}
function La() {
	return (0, N.useContext)(Pa);
}
//#endregion
//#region node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.js
var Ra = /* @__PURE__ */ o(((e) => {
	var t = ae();
	function n(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var r = typeof Object.is == "function" ? Object.is : n, i = t.useState, a = t.useEffect, o = t.useLayoutEffect, s = t.useDebugValue;
	function c(e, t) {
		var n = t(), r = i({ inst: {
			value: n,
			getSnapshot: t
		} }), c = r[0].inst, u = r[1];
		return o(function() {
			c.value = n, c.getSnapshot = t, l(c) && u({ inst: c });
		}, [
			e,
			n,
			t
		]), a(function() {
			return l(c) && u({ inst: c }), e(function() {
				l(c) && u({ inst: c });
			});
		}, [e]), s(n), n;
	}
	function l(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !r(e, n);
		} catch {
			return !0;
		}
	}
	function u(e, t) {
		return t();
	}
	var d = typeof window > "u" || window.document === void 0 || window.document.createElement === void 0 ? u : c;
	e.useSyncExternalStore = t.useSyncExternalStore === void 0 ? d : t.useSyncExternalStore;
})), za = /* @__PURE__ */ o(((e, t) => {
	t.exports = Ra();
})), Ba = /* @__PURE__ */ c(se(), 1), Va = za(), Ha = /*#__PURE__*/ (0, N.createContext)(!1), Ua = /*#__PURE__*/ (0, N.createContext)(null);
function Wa(e) {
	if ((0, N.useContext)(Ua)) return e.content;
	let { collection: t, document: n } = Ja(e.createCollection);
	return /*#__PURE__*/ N.createElement(N.Fragment, null, /*#__PURE__*/ N.createElement(Fa, null, /*#__PURE__*/ N.createElement(Ua.Provider, { value: n }, e.content)), /*#__PURE__*/ N.createElement(Ga, {
		render: e.children,
		collection: t
	}));
}
function Ga({ collection: e, render: t }) {
	return t(e);
}
function Ka(e, t, n) {
	let r = dn(), i = (0, N.useRef)(r);
	i.current = r;
	let a = (0, N.useCallback)(() => i.current ? n() : t(), [t, n]);
	return (0, Va.useSyncExternalStore)(e, a);
}
var qa = typeof N.useSyncExternalStore == "function" ? N.useSyncExternalStore : Ka;
function Ja(e) {
	let [t] = (0, N.useState)(() => new ra(e?.() || new $i()));
	return {
		collection: qa((0, N.useCallback)((e) => t.subscribe(e), [t]), (0, N.useCallback)(() => {
			let e = t.getCollection();
			return t.isSSR && t.resetAfterSSR(), e;
		}, [t]), (0, N.useCallback)(() => (t.isSSR = !0, t.getCollection()), [t])),
		document: t
	};
}
var Ya = /*#__PURE__*/ (0, N.createContext)(null);
function Xa(e) {
	return class extends Xi {
		static {
			this.type = e;
		}
	};
}
function Za(e, t, n, r, i, a) {
	typeof e == "string" && (e = Xa(e));
	let o = (0, N.useCallback)((i) => {
		i?.setProps(t, n, e, r, a);
	}, [
		t,
		n,
		r,
		a,
		e
	]), s = (0, N.useContext)(Ya);
	if (s) {
		let o = s.ownerDocument.nodesByProps.get(t);
		return o || (o = s.ownerDocument.createElement(e.type), o.setProps(t, n, e, r, a), s.appendChild(o), s.ownerDocument.updateCollection(), s.ownerDocument.nodesByProps.set(t, o)), i ? /*#__PURE__*/ N.createElement(Ya.Provider, { value: o }, i) : null;
	}
	return /*#__PURE__*/ N.createElement(e.type, { ref: o }, i);
}
function Qa(e, t) {
	let n = ({ node: e }) => t(e.props, e.props.ref, e), r = (0, N.forwardRef)((r, i) => {
		let a = (0, N.useContext)(ja);
		if (!(0, N.useContext)(Ha)) {
			if (t.length >= 3) throw Error(t.name + " cannot be rendered outside a collection.");
			return t(r, i);
		}
		return Za(e, r, i, "children" in r ? r.children : null, null, (e) => /*#__PURE__*/ N.createElement(ja.Provider, { value: a }, /*#__PURE__*/ N.createElement(n, { node: e })));
	});
	return r.displayName = t.name, r;
}
function $a(e) {
	return ia({
		...e,
		addIdAndValue: !0
	});
}
var eo = /*#__PURE__*/ (0, N.createContext)(null);
function to(e) {
	let t = (0, N.useContext)(eo), n = (t?.dependencies || []).concat(e.dependencies), r = e.idScope ?? t?.idScope, i = $a({
		...e,
		idScope: r,
		dependencies: n
	});
	return (0, N.useContext)(Ua) && (i = /*#__PURE__*/ N.createElement(no, null, i)), t = (0, N.useMemo)(() => ({
		dependencies: n,
		idScope: r
	}), [r, ...n]), /*#__PURE__*/ N.createElement(eo.Provider, { value: t }, i);
}
function no({ children: e }) {
	let t = (0, N.useContext)(Ua), n = (0, N.useMemo)(() => /*#__PURE__*/ N.createElement(Ua.Provider, { value: null }, /*#__PURE__*/ N.createElement(Ha.Provider, { value: !0 }, e)), [e]);
	return dn() ? /*#__PURE__*/ N.createElement(Ya.Provider, { value: t }, n) : /*#__PURE__*/ (0, Ba.createPortal)(n, t);
}
//#endregion
//#region node_modules/react-aria-components/dist/private/Collection.mjs
var ro = /*#__PURE__*/ (0, N.createContext)(null), io = {
	CollectionRoot({ collection: e, renderDropIndicator: t }) {
		return ao(e, null, t);
	},
	CollectionBranch({ collection: e, parent: t, renderDropIndicator: n }) {
		return ao(e, t, n);
	}
};
function ao(e, t, n) {
	return ia({
		items: t ? e.getChildren(t.key) : e,
		dependencies: [n],
		children(t) {
			if (t.type === "content") return /*#__PURE__*/ N.createElement(N.Fragment, null);
			let r = t.render(t);
			return !n || t.type !== "item" ? r : /*#__PURE__*/ N.createElement(N.Fragment, null, n({
				type: "item",
				key: t.key,
				dropPosition: "before"
			}), r, oo(e, t, n));
		}
	});
}
function oo(e, t, n) {
	let r = t.key, i = e.getKeyAfter(r), a = i == null ? null : e.getItem(i);
	for (; a != null && a.type !== "item";) i = e.getKeyAfter(a.key), a = i == null ? null : e.getItem(i);
	let o = t.nextKey == null ? null : e.getItem(t.nextKey);
	for (; o != null && o.type !== "item";) o = o.nextKey == null ? null : e.getItem(o.nextKey);
	let s = [];
	if (o == null) {
		let r = t;
		for (; r?.type === "item" && (!a || r.parentKey !== a.parentKey && a.level < r.level);) {
			let t = n({
				type: "item",
				key: r.key,
				dropPosition: "after"
			});
			/*#__PURE__*/ (0, N.isValidElement)(t) && s.push(/*#__PURE__*/ (0, N.cloneElement)(t, { key: `${r.key}-after` })), r = r.parentKey == null ? null : e.getItem(r.parentKey);
		}
	}
	return s;
}
var so = /*#__PURE__*/ (0, N.createContext)(io), co = /* @__PURE__ */ new Set(["id"]), lo = /* @__PURE__ */ new Set([
	"aria-label",
	"aria-labelledby",
	"aria-describedby",
	"aria-details"
]), uo = /* @__PURE__ */ new Set([
	"href",
	"hrefLang",
	"target",
	"rel",
	"download",
	"ping",
	"referrerPolicy"
]), fo = /* @__PURE__ */ new Set([
	"dir",
	"lang",
	"hidden",
	"inert",
	"translate",
	"suppressHydrationWarning"
]), po = /* @__PURE__ */ new Set(/* @__PURE__ */ "onClick.onAuxClick.onContextMenu.onDoubleClick.onMouseDown.onMouseEnter.onMouseLeave.onMouseMove.onMouseOut.onMouseOver.onMouseUp.onTouchCancel.onTouchEnd.onTouchMove.onTouchStart.onPointerDown.onPointerMove.onPointerUp.onPointerCancel.onPointerEnter.onPointerLeave.onPointerOver.onPointerOut.onGotPointerCapture.onLostPointerCapture.onScroll.onWheel.onAnimationStart.onAnimationEnd.onAnimationIteration.onTransitionCancel.onTransitionEnd.onTransitionRun.onTransitionStart".split(".")), mo = /^(data-.*)$/;
function ho(e, t = {}) {
	let { labelable: n, isLink: r, global: i, events: a = i, propNames: o } = t, s = {};
	for (let t in e) Object.prototype.hasOwnProperty.call(e, t) && (co.has(t) || n && lo.has(t) || r && uo.has(t) || i && fo.has(t) || a && (po.has(t) || t.endsWith("Capture") && po.has(t.slice(0, -7))) || o?.has(t) || mo.test(t)) && (s[t] = e[t]);
	return s;
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/textSelection.mjs
var go = "default", _o = "", vo = /* @__PURE__ */ new WeakMap();
function yo(e) {
	if (xr() && Cr()) {
		if (go === "default") {
			let t = W(e);
			_o = t.documentElement.style.webkitUserSelect, t.documentElement.style.webkitUserSelect = "none";
		}
		go = "disabled";
	} else if (e instanceof HTMLElement || e instanceof SVGElement) {
		let t = "userSelect" in e.style ? "userSelect" : "webkitUserSelect";
		vo.set(e, e.style[t]), e.style[t] = "none";
	}
}
function bo(e) {
	if (xr() && Cr()) {
		if (go !== "disabled") return;
		go = "restoring", setTimeout(() => {
			pa(() => {
				if (go === "restoring") {
					let t = W(e);
					t.documentElement.style.webkitUserSelect === "none" && (t.documentElement.style.webkitUserSelect = _o || ""), _o = "", go = "default";
				}
			});
		}, 300);
	} else if ((e instanceof HTMLElement || e instanceof SVGElement) && e && vo.has(e)) {
		let t = vo.get(e), n = "userSelect" in e.style ? "userSelect" : "webkitUserSelect";
		e.style[n] === "none" && (e.style[n] = t), e.getAttribute("style") === "" && e.removeAttribute("style"), vo.delete(e);
	}
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/getNonce.mjs
var xo = /* @__PURE__ */ new WeakMap();
function So(e) {
	let t = W(e), n = xo.get(t);
	return n ??= ri("csp-nonce", t), n !== void 0 && xo.set(t, n), n;
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/context.mjs
var Co = N.createContext({ register: () => {} });
Co.displayName = "PressResponderContext";
//#endregion
//#region node_modules/react-aria/dist/private/utils/useGlobalListeners.mjs
function wo() {
	let e = (0, N.useRef)(/* @__PURE__ */ new Map()), t = (0, N.useCallback)((t, n, r, i) => {
		let a = i?.once ? (...t) => {
			e.current.delete(r), r(...t);
		} : r;
		e.current.set(r, {
			type: n,
			eventTarget: t,
			fn: a,
			options: i
		}), t.addEventListener(n, a, i);
	}, []), n = (0, N.useCallback)((t, n, r, i) => {
		let a = e.current.get(r)?.fn || r;
		t.removeEventListener(n, a, i), e.current.delete(r);
	}, []), r = (0, N.useCallback)(() => {
		e.current.forEach((e, t) => {
			n(e.eventTarget, e.type, t, e.options);
		});
	}, [n]);
	return (0, N.useEffect)(() => r, [r]), {
		addGlobalListener: t,
		removeGlobalListener: n,
		removeAllGlobalListeners: r
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/usePress.mjs
function To(e) {
	let t = (0, N.useContext)(Co);
	if (t) {
		let { register: n, ref: r, ...i } = t;
		e = U(i, e), n();
	}
	return Aa(t, e.ref), e;
}
var Eo = class {
	#e;
	constructor(e, t, n, r) {
		this.#e = !0;
		let i = (r?.target ?? n.currentTarget)?.getBoundingClientRect(), a, o = 0, s, c = null;
		n.clientX != null && n.clientY != null && (s = n.clientX, c = n.clientY), i && (s != null && c != null ? (a = s - i.left, o = c - i.top) : (a = i.width / 2, o = i.height / 2)), this.type = e, this.pointerType = t, this.target = n.currentTarget, this.shiftKey = n.shiftKey, this.metaKey = n.metaKey, this.ctrlKey = n.ctrlKey, this.altKey = n.altKey, this.x = a, this.y = o, this.key = n.key;
	}
	continuePropagation() {
		this.#e = !1;
	}
	get shouldStopPropagation() {
		return this.#e;
	}
}, Do = Symbol("linkClicked"), Oo = "react-aria-pressable-style", ko = "data-react-aria-pressable";
function Ao(e) {
	let { onPress: t, onPressChange: n, onPressStart: r, onPressEnd: i, onPressUp: a, onClick: o, isDisabled: s, isPressed: c, preventFocusOnPress: l, shouldCancelOnPointerExit: u, allowTextSelectionOnPress: d, ref: f, ...p } = To(e), [m, h] = (0, N.useState)(!1), g = (0, N.useRef)({
		isPressed: !1,
		ignoreEmulatedMouseEvents: !1,
		didFirePressStart: !1,
		isTriggeringEvent: !1,
		activePointerId: null,
		target: null,
		isOverTarget: !1,
		pointerType: null,
		disposables: []
	}), { addGlobalListener: _, removeAllGlobalListeners: v } = wo(), y = (0, N.useCallback)((e, t) => {
		let i = g.current;
		if (s || i.didFirePressStart) return !1;
		let a = !0;
		if (i.isTriggeringEvent = !0, r) {
			let n = new Eo("pressstart", t, e);
			r(n), a = n.shouldStopPropagation;
		}
		return n && n(!0), i.isTriggeringEvent = !1, i.didFirePressStart = !0, h(!0), a;
	}, [
		s,
		r,
		n
	]), b = (0, N.useCallback)((e, r, a = !0) => {
		let o = g.current;
		if (!o.didFirePressStart) return !1;
		o.didFirePressStart = !1, o.isTriggeringEvent = !0;
		let c = !0;
		if (i) {
			let t = new Eo("pressend", r, e);
			i(t), c = t.shouldStopPropagation;
		}
		if (n && n(!1), h(!1), t && a && !s) {
			let n = new Eo("press", r, e);
			t(n), c &&= n.shouldStopPropagation;
		}
		return o.isTriggeringEvent = !1, c;
	}, [
		s,
		i,
		n,
		t
	]), x = vi(b), S = vi((0, N.useCallback)((e, t) => {
		let n = g.current;
		if (s) return !1;
		if (a) {
			n.isTriggeringEvent = !0;
			let r = new Eo("pressup", t, e);
			return a(r), n.isTriggeringEvent = !1, r.shouldStopPropagation;
		}
		return !0;
	}, [s, a])), C = (0, N.useCallback)((e) => {
		let t = g.current;
		if (t.isPressed && t.target) {
			t.didFirePressStart && t.pointerType != null && b(No(t.target, e), t.pointerType, !1), t.isPressed = !1, t.isOverTarget = !1, t.activePointerId = null, t.pointerType = null, v(), d || bo(t.target);
			for (let e of t.disposables) e();
			t.disposables = [];
		}
	}, [
		d,
		v,
		b
	]), w = vi(C);
	(0, N.useEffect)(() => {
		s && g.current.isPressed && w({
			currentTarget: g.current.target,
			shiftKey: !1,
			ctrlKey: !1,
			metaKey: !1,
			altKey: !1
		});
	}, [s]);
	let T = (0, N.useCallback)((e) => {
		u && C(e);
	}, [u, C]), E = (0, N.useCallback)((e) => {
		s || o?.(e);
	}, [s, o]), D = (0, N.useCallback)((e, t) => {
		if (!s && o) {
			let n = new MouseEvent("click", e);
			dr(n, t), o(ur(n));
		}
	}, [s, o]), O = (0, N.useMemo)(() => {
		let e = g.current, t = {
			onKeyDown(t) {
				if (Mo(t.nativeEvent, t.currentTarget) && G(t.currentTarget, K(t))) {
					Y(K(t), t.key) && t.preventDefault();
					let r = !0;
					!e.isPressed && !t.repeat && (e.target = t.currentTarget, e.isPressed = !0, e.pointerType = "keyboard", r = y(t, "keyboard"));
					let i = t.currentTarget;
					_(W(t.currentTarget), "keyup", Qt((t) => {
						Mo(t, i) && !t.repeat && G(i, K(t)) && e.target && S(No(e.target, t), "keyboard");
					}, n), !0), r && t.stopPropagation(), t.metaKey && vr() && e.metaKeyEvents?.set(t.key, t.nativeEvent);
				} else t.key === "Meta" && (e.metaKeyEvents = /* @__PURE__ */ new Map());
			},
			onClick(t) {
				if ((!t || G(t.currentTarget, K(t))) && t && t.button === 0 && !e.isTriggeringEvent && !Ar.isOpening) {
					let n = !0;
					if (s && t.preventDefault(), !e.ignoreEmulatedMouseEvents && !e.isPressed && (e.pointerType === "virtual" || Er(t.nativeEvent))) {
						let e = y(t, "virtual"), r = S(t, "virtual"), i = x(t, "virtual");
						E(t), n = e && r && i;
					} else if (e.isPressed && e.pointerType !== "keyboard") {
						let r = e.pointerType || t.nativeEvent.pointerType || "virtual", i = S(No(t.currentTarget, t), r), a = x(No(t.currentTarget, t), r, !0);
						n = i && a, e.isOverTarget = !1, E(t), w(t);
					}
					e.ignoreEmulatedMouseEvents = !1, n && t.stopPropagation();
				}
			}
		}, n = (t) => {
			if (e.isPressed && e.target && Mo(t, e.target)) {
				Y(K(t), t.key) && t.preventDefault();
				let n = K(t), r = G(e.target, n);
				x(No(e.target, t), "keyboard", r), r && D(t, e.target), v(), t.key !== "Enter" && jo(e.target) && G(e.target, n) && !t[Do] && (t[Do] = !0, Ar(e.target, t, !1)), e.isPressed = !1, e.metaKeyEvents?.delete(t.key);
			} else if (t.key === "Meta" && e.metaKeyEvents?.size) {
				let t = e.metaKeyEvents;
				e.metaKeyEvents = void 0;
				for (let n of t.values()) e.target?.dispatchEvent(new KeyboardEvent("keyup", n));
			}
		};
		if (typeof PointerEvent < "u") {
			t.onPointerDown = (t) => {
				if (t.button !== 0 || !G(t.currentTarget, K(t))) return;
				if (Dr(t.nativeEvent)) {
					e.pointerType = "virtual";
					return;
				}
				e.pointerType = t.pointerType;
				let i = !0;
				if (!e.isPressed) {
					e.isPressed = !0, e.isOverTarget = !0, e.activePointerId = t.pointerId, e.target = t.currentTarget, d || yo(e.target), i = y(t, e.pointerType);
					let a = K(t);
					"releasePointerCapture" in a && ("hasPointerCapture" in a ? a.hasPointerCapture(t.pointerId) && a.releasePointerCapture(t.pointerId) : a.releasePointerCapture(t.pointerId)), _(W(t.currentTarget), "pointerup", n, !1), _(W(t.currentTarget), "pointercancel", r, !1);
				}
				i && t.stopPropagation();
			}, t.onMouseDown = (t) => {
				if (G(t.currentTarget, K(t)) && t.button === 0) {
					if (l) {
						let n = mr(t.target);
						n && e.disposables.push(n);
					}
					t.stopPropagation();
				}
			}, t.onPointerUp = (t) => {
				G(t.currentTarget, K(t)) && e.pointerType !== "virtual" && t.button === 0 && !e.isPressed && S(t, e.pointerType || t.pointerType);
			}, t.onPointerEnter = (t) => {
				t.pointerId === e.activePointerId && e.target && !e.isOverTarget && e.pointerType != null && (e.isOverTarget = !0, y(No(e.target, t), e.pointerType));
			}, t.onPointerLeave = (t) => {
				t.pointerId === e.activePointerId && e.target && e.isOverTarget && e.pointerType != null && (e.isOverTarget = !1, x(No(e.target, t), e.pointerType, !1), T(t));
			};
			let n = (t) => {
				if (t.pointerId === e.activePointerId && e.isPressed && t.button === 0 && e.target) {
					if (G(e.target, K(t)) && e.pointerType != null) {
						let n = !1, r = setTimeout(() => {
							e.isPressed && e.target instanceof HTMLElement && (n ? w(t) : ($n(e.target), e.target.click()));
						}, 80);
						_(t.currentTarget, "click", () => n = !0, !0), e.disposables.push(() => clearTimeout(r));
					} else w(t);
					e.isOverTarget = !1;
				}
			}, r = (e) => {
				w(e);
			};
			t.onDragStart = (e) => {
				G(e.currentTarget, K(e)) && w(e);
			};
		}
		return t;
	}, [
		_,
		s,
		l,
		v,
		d,
		T,
		y,
		E,
		D
	]);
	return (0, N.useEffect)(() => {
		if (!f) return;
		let e = W(f.current);
		if (!e || !e.head || e.getElementById(Oo)) return;
		let t = e.createElement("style");
		t.id = Oo;
		let n = So(e);
		n && (t.nonce = n), t.textContent = `
@layer {
  [${ko}] {
    touch-action: pan-x pan-y pinch-zoom;
  }
}
    `.trim(), e.head.prepend(t);
	}, [f]), (0, N.useEffect)(() => {
		let e = g.current;
		return () => {
			d || bo(e.target ?? void 0);
			for (let t of e.disposables) t();
			e.disposables = [];
		};
	}, [d]), {
		isPressed: c || m,
		pressProps: U(p, O, { [ko]: !0 })
	};
}
function jo(e) {
	return e.tagName === "A" && e.hasAttribute("href");
}
function Mo(e, t) {
	let { key: n, code: r } = e, i = t, a = i.getAttribute("role");
	return (n === "Enter" || n === " " || n === "Spacebar" || r === "Space") && !(i instanceof Ln(i).HTMLInputElement && !Io(i, n) || i instanceof Ln(i).HTMLTextAreaElement || i.isContentEditable) && !((a === "link" || !a && jo(i)) && n !== "Enter");
}
function No(e, t) {
	let n = t.clientX, r = t.clientY;
	return {
		currentTarget: e,
		shiftKey: t.shiftKey,
		ctrlKey: t.ctrlKey,
		metaKey: t.metaKey,
		altKey: t.altKey,
		clientX: n,
		clientY: r,
		key: t.key
	};
}
function Po(e) {
	return e instanceof HTMLInputElement ? !1 : e instanceof HTMLButtonElement ? e.type !== "submit" && e.type !== "reset" : !jo(e);
}
function Y(e, t) {
	return vr() && t === "Enter" ? !1 : e instanceof HTMLInputElement ? t === "Enter" && (e.type === "checkbox" || e.type === "radio") ? !1 : !Io(e, t) : Po(e);
}
var Fo = /* @__PURE__ */ new Set([
	"checkbox",
	"radio",
	"range",
	"color",
	"file",
	"image",
	"button",
	"submit",
	"reset"
]);
function Io(e, t) {
	return e.type === "checkbox" || e.type === "radio" ? t === " " : Fo.has(e.type);
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/useFocusWithin.mjs
function Lo(e) {
	let { isDisabled: t, onBlurWithin: n, onFocusWithin: r, onFocusWithinChange: i } = e, a = (0, N.useRef)({ isFocusWithin: !1 }), { addGlobalListener: o, removeAllGlobalListeners: s } = wo(), c = (0, N.useCallback)((e) => {
		G(e.currentTarget, K(e)) && a.current.isFocusWithin && !G(e.currentTarget, e.relatedTarget) && (a.current.isFocusWithin = !1, s(), n && n(e), i && i(!1));
	}, [
		n,
		i,
		a,
		s
	]), l = fr(c), u = (0, N.useCallback)((e) => {
		if (!G(e.currentTarget, K(e))) return;
		let t = K(e), n = W(t), s = Kn(n);
		if (!a.current.isFocusWithin && s === t) {
			r && r(e), i && i(!0), a.current.isFocusWithin = !0, l(e);
			let t = e.currentTarget;
			o(n, "focus", (e) => {
				let r = K(e);
				if (a.current.isFocusWithin && !G(t, r)) {
					let e = new n.defaultView.FocusEvent("blur", { relatedTarget: r });
					dr(e, t);
					let i = ur(e);
					c(i);
				}
			}, { capture: !0 });
		}
	}, [
		r,
		i,
		l,
		o,
		c
	]);
	return t ? { focusWithinProps: {
		onFocus: void 0,
		onBlur: void 0
	} } : { focusWithinProps: {
		onFocus: u,
		onBlur: c
	} };
}
//#endregion
//#region node_modules/react-aria/dist/private/focus/useFocusRing.mjs
function Ro(e = {}) {
	let { autoFocus: t = !1, isTextInput: n, within: r } = e, i = (0, N.useRef)({
		isFocused: !1,
		isFocusVisible: t || Zr()
	}), [a, o] = (0, N.useState)(!1), [s, c] = (0, N.useState)(() => i.current.isFocused && i.current.isFocusVisible), l = (0, N.useCallback)(() => c(i.current.isFocused && i.current.isFocusVisible), []), u = (0, N.useCallback)((e) => {
		i.current.isFocused = e, i.current.isFocusVisible = Zr(), o(e), l();
	}, [l]);
	ni((e) => {
		i.current.isFocusVisible = e, l();
	}, [n, a], {
		enabled: a,
		isTextInput: n
	});
	let { focusProps: d } = ha({
		isDisabled: r,
		onFocusChange: u
	}), { focusWithinProps: f } = Lo({
		isDisabled: !r,
		onFocusWithinChange: u
	});
	return {
		isFocused: a,
		isFocusVisible: s,
		focusProps: r ? f : d
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/useHover.mjs
var zo = !1, Bo = 0;
function Vo() {
	zo = !0, setTimeout(() => {
		zo = !1;
	}, 500);
}
function Ho(e) {
	e.pointerType === "touch" && Vo();
}
function Uo() {
	let e = W(null);
	if (e !== void 0) return Bo === 0 && typeof PointerEvent < "u" && e.addEventListener("pointerup", Ho), Bo++, () => {
		Bo--, !(Bo > 0) && typeof PointerEvent < "u" && e.removeEventListener("pointerup", Ho);
	};
}
function Wo(e) {
	let { onHoverStart: t, onHoverChange: n, onHoverEnd: r, isDisabled: i } = e, [a, o] = (0, N.useState)(!1), s = (0, N.useRef)({
		isHovered: !1,
		ignoreEmulatedMouseEvents: !1,
		pointerType: "",
		target: null
	}).current;
	(0, N.useEffect)(Uo, []);
	let { addGlobalListener: c, removeAllGlobalListeners: l } = wo(), { hoverProps: u, triggerHoverEnd: d } = (0, N.useMemo)(() => {
		let e = (e, r) => {
			if (s.pointerType = r, i || r === "touch" || s.isHovered || !G(e.currentTarget, K(e))) return;
			s.isHovered = !0;
			let l = e.currentTarget;
			s.target = l, c(W(K(e)), "pointerover", (e) => {
				s.isHovered && s.target && !G(s.target, K(e)) && a(e, e.pointerType);
			}, { capture: !0 }), t && t({
				type: "hoverstart",
				target: l,
				pointerType: r
			}), n && n(!0), o(!0);
		}, a = (e, t) => {
			let i = s.target;
			s.pointerType = "", s.target = null, t !== "touch" && s.isHovered && i && (s.isHovered = !1, l(), r && r({
				type: "hoverend",
				target: i,
				pointerType: t
			}), n && n(!1), o(!1));
		}, u = {};
		return typeof PointerEvent < "u" && (u.onPointerEnter = (t) => {
			zo && t.pointerType === "mouse" || e(t, t.pointerType);
		}, u.onPointerLeave = (e) => {
			!i && G(e.currentTarget, K(e)) && a(e, e.pointerType);
		}), {
			hoverProps: u,
			triggerHoverEnd: a
		};
	}, [
		t,
		n,
		r,
		i,
		s,
		c,
		l
	]);
	return (0, N.useEffect)(() => {
		i && d({ currentTarget: s.target }, s.pointerType);
	}, [i]), {
		hoverProps: u,
		isHovered: a
	};
}
//#endregion
//#region node_modules/react-aria-components/dist/private/Label.mjs
var Go = /*#__PURE__*/ (0, N.createContext)({}), Ko = /*#__PURE__*/ Ia(function(e, t) {
	[e, t] = kn(e, t, Go);
	let { elementType: n = "label", ...r } = e, i = Pn[n];
	return /*#__PURE__*/ N.createElement(i, {
		className: "react-aria-Label",
		...r,
		ref: t
	});
});
//#endregion
//#region node_modules/react-aria/dist/private/label/useLabel.mjs
function qo(e) {
	let { id: t, label: n, "aria-labelledby": r, "aria-label": i, labelElementType: a = "label" } = e;
	t = _n(t);
	let o = _n(), s = {};
	n && (r = r ? `${o} ${r}` : o, s = {
		id: o,
		htmlFor: a === "label" ? t : void 0
	});
	let c = bi({
		id: t,
		"aria-label": i,
		"aria-labelledby": r
	});
	return {
		labelProps: s,
		fieldProps: c
	};
}
//#endregion
//#region node_modules/react-stately/dist/private/utils/number.mjs
function Jo(e, t = -Infinity, n = Infinity) {
	return Math.min(Math.max(e, t), n);
}
//#endregion
//#region node_modules/react-aria-components/dist/private/ProgressBar.mjs
var Yo = /*#__PURE__*/ (0, N.createContext)(null), Xo = 7e3, Zo = null;
function Qo(e, t = "assertive", n = Xo) {
	Zo ? Zo.announce(e, t, n) : (Zo = new $o(), (typeof IS_REACT_ACT_ENVIRONMENT == "boolean" ? IS_REACT_ACT_ENVIRONMENT : typeof jest < "u") ? Zo.announce(e, t, n) : setTimeout(() => {
		Zo?.isAttached() && Zo?.announce(e, t, n);
	}, 100));
}
var $o = class {
	constructor() {
		this.node = null, this.assertiveLog = null, this.politeLog = null, typeof document < "u" && (this.node = document.createElement("div"), this.node.dataset.liveAnnouncer = "true", Object.assign(this.node.style, {
			border: 0,
			clip: "rect(0 0 0 0)",
			clipPath: "inset(50%)",
			height: "1px",
			margin: "-1px",
			overflow: "hidden",
			padding: 0,
			position: "absolute",
			width: "1px",
			whiteSpace: "nowrap"
		}), this.assertiveLog = this.createLog("assertive"), this.node.appendChild(this.assertiveLog), this.politeLog = this.createLog("polite"), this.node.appendChild(this.politeLog), document.body.prepend(this.node));
	}
	isAttached() {
		return this.node?.isConnected;
	}
	createLog(e) {
		let t = document.createElement("div");
		return t.setAttribute("role", "log"), t.setAttribute("aria-live", e), t.setAttribute("aria-relevant", "additions"), t;
	}
	destroy() {
		this.node &&= (document.body.removeChild(this.node), null);
	}
	announce(e, t = "assertive", n = Xo) {
		if (!this.node) return;
		let r = document.createElement("div");
		typeof e == "object" ? (r.setAttribute("role", "img"), r.setAttribute("aria-labelledby", e["aria-labelledby"])) : r.textContent = e, t === "assertive" ? this.assertiveLog?.appendChild(r) : this.politeLog?.appendChild(r), e !== "" && setTimeout(() => {
			r.remove();
		}, n);
	}
	clear(e) {
		this.node && ((!e || e === "assertive") && this.assertiveLog && (this.assertiveLog.innerHTML = ""), (!e || e === "polite") && this.politeLog && (this.politeLog.innerHTML = ""));
	}
};
//#endregion
//#region node_modules/react-aria/dist/private/button/useButton.mjs
function es(e, t) {
	let { elementType: n = "button", isDisabled: r, onPress: i, onPressStart: a, onPressEnd: o, onPressUp: s, onPressChange: c, preventFocusOnPress: l, allowFocusWhenDisabled: u, onClick: d, href: f, target: p, rel: m, type: h = "button" } = e, g;
	g = n === "button" ? {
		type: h,
		disabled: r,
		form: e.form,
		formAction: e.formAction,
		formEncType: e.formEncType,
		formMethod: e.formMethod,
		formNoValidate: e.formNoValidate,
		formTarget: e.formTarget,
		name: e.name,
		value: e.value
	} : {
		role: "button",
		href: n === "a" && !r ? f : void 0,
		target: n === "a" ? p : void 0,
		type: n === "input" ? h : void 0,
		disabled: n === "input" ? r : void 0,
		"aria-disabled": !r || n === "input" ? void 0 : r,
		rel: n === "a" ? m : void 0
	};
	let { pressProps: _, isPressed: v } = Ao({
		onPressStart: a,
		onPressEnd: o,
		onPressChange: c,
		onPress: i,
		onPressUp: s,
		onClick: d,
		isDisabled: r,
		preventFocusOnPress: l,
		ref: t
	}), { focusableProps: y } = Na(e, t);
	u && (y.tabIndex = r ? -1 : y.tabIndex);
	let b = U(y, _, ho(e, { labelable: !0 }));
	return {
		isPressed: v,
		buttonProps: U(g, b, {
			"aria-haspopup": e["aria-haspopup"],
			"aria-expanded": e["aria-expanded"],
			"aria-controls": e["aria-controls"],
			"aria-pressed": e["aria-pressed"],
			"aria-current": e["aria-current"],
			"aria-disabled": e["aria-disabled"]
		})
	};
}
//#endregion
//#region node_modules/react-aria-components/dist/private/Button.mjs
var ts = /*#__PURE__*/ (0, N.createContext)({}), ns = /*#__PURE__*/ Ia(function(e, t) {
	[e, t] = kn(e, t, ts);
	let n = e, { isPending: r } = n, { buttonProps: i, isPressed: a } = es(e, t);
	i = is(i, r);
	let { focusProps: o, isFocused: s, isFocusVisible: c } = Ro(e), { hoverProps: l, isHovered: u } = Wo({
		...e,
		isDisabled: e.isDisabled || r
	}), d = {
		isHovered: u,
		isPressed: (n.isPressed || a) && !r,
		isFocused: s,
		isFocusVisible: c,
		isDisabled: e.isDisabled || !1,
		isPending: r ?? !1
	}, f = Dn({
		...e,
		values: d,
		defaultClassName: "react-aria-Button"
	}), p = _n(i.id), m = _n(), h = i["aria-labelledby"];
	r && (h ? h = `${h} ${m}` : i["aria-label"] && (h = `${p} ${m}`));
	let g = (0, N.useRef)(r);
	(0, N.useEffect)(() => {
		let e = { "aria-labelledby": h || p };
		(!g.current && s && r || g.current && s && !r) && Qo(e, "assertive"), g.current = r;
	}, [
		r,
		s,
		h,
		p
	]);
	let _ = ho(e, { global: !0 });
	return delete _.onClick, /*#__PURE__*/ N.createElement(Pn.button, {
		...U(_, f, i, o, l),
		type: i.type === "submit" && r ? "button" : i.type,
		id: p,
		ref: t,
		"aria-labelledby": h,
		slot: e.slot || void 0,
		"aria-disabled": r ? "true" : i["aria-disabled"],
		"data-disabled": e.isDisabled || void 0,
		"data-pressed": d.isPressed || void 0,
		"data-hovered": u || void 0,
		"data-focused": s || void 0,
		"data-pending": r || void 0,
		"data-focus-visible": c || void 0
	}, /*#__PURE__*/ N.createElement(Yo.Provider, { value: { id: m } }, f.children));
}), rs = /Focus|Blur|Hover|Pointer(Enter|Leave|Over|Out)|Mouse(Enter|Leave|Over|Out)/;
function is(e, t) {
	if (t) {
		for (let t in e) t.startsWith("on") && !rs.test(t) && (e[t] = void 0);
		e.href = void 0, e.target = void 0;
	}
	return e;
}
//#endregion
//#region node_modules/react-aria-components/dist/private/Text.mjs
var as = /*#__PURE__*/ (0, N.createContext)({}), os = /*#__PURE__*/ Ia(function(e, t) {
	[e, t] = kn(e, t, as);
	let { elementType: n = "span", ...r } = e, i = Pn[n];
	return /*#__PURE__*/ N.createElement(i, {
		className: "react-aria-Text",
		...r,
		ref: t
	});
});
//#endregion
//#region node_modules/react-aria/dist/private/utils/isScrollable.mjs
function ss(e, t) {
	if (!e) return !1;
	let n = window.getComputedStyle(e), r = document.scrollingElement || document.documentElement, i = /(auto|scroll)/.test(n.overflow + n.overflowX + n.overflowY);
	return e === r && n.overflow !== "hidden" && (i = !0), i && t && (i = e.scrollHeight !== e.clientHeight || e.scrollWidth !== e.clientWidth), i;
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/getScrollParent.mjs
function cs(e, t) {
	let n = e;
	for (ss(n, t) && (n = n.parentElement); n && !ss(n, t);) n = n.parentElement;
	return n || document.scrollingElement || document.documentElement;
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/getScrollParents.mjs
function ls(e, t) {
	let n = [], r = document.scrollingElement || document.documentElement;
	for (; e && (ss(e, t) && n.push(e), e !== r);) e = e.parentElement;
	return n;
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/scrollIntoView.mjs
function us(e, t, n = {}) {
	e !== t && ds(e, t, t.getBoundingClientRect(), n);
}
function ds(e, t, n, r = {}) {
	let { block: i = "nearest", inline: a = "nearest" } = r, o = e.scrollTop, s = e.scrollLeft, c = e.getBoundingClientRect(), l = window.getComputedStyle(t), u = window.getComputedStyle(e), d = document.scrollingElement || document.documentElement, f = e === d, p = e === d ? 0 : c.top, m = e === d ? e.clientHeight : c.bottom, h = e === d ? 0 : c.left, g = e === d ? e.clientWidth : c.right, _ = parseFloat(l.scrollMarginTop) || 0, v = parseFloat(l.scrollMarginBottom) || 0, y = parseFloat(l.scrollMarginLeft) || 0, b = parseFloat(l.scrollMarginRight) || 0, x = parseFloat(u.scrollPaddingTop) || 0, S = parseFloat(u.scrollPaddingBottom) || 0, C = parseFloat(u.scrollPaddingLeft) || 0, w = parseFloat(u.scrollPaddingRight) || 0, T = parseFloat(u.borderTopWidth) || 0, E = parseFloat(u.borderBottomWidth) || 0, D = parseFloat(u.borderLeftWidth) || 0, O = parseFloat(u.borderRightWidth) || 0, k = n.top - _, ee = n.bottom + v, A = n.left - y, j = n.right + b, te = e === d ? 0 : D + O, ne = e === d ? 0 : T + E, re = e === d ? 0 : e.offsetWidth - e.clientWidth - te, M = e === d ? 0 : e.offsetHeight - e.clientHeight - ne, ie = p + (f ? 0 : T) + x, ae = m - (f ? 0 : E) - S - M, oe = h + (f ? 0 : D) + C, se = g - (f ? 0 : O) - w;
	xr() && Cr() || u.direction === "ltr" ? se -= re : u.direction === "rtl" && (oe += re);
	let ce = k < ie || ee > ae, le = A < oe || j > se;
	if (ce && i === "start") o += k - ie;
	else if (ce && i === "center") o += (k + ee) / 2 - (ie + ae) / 2;
	else if (ce && i === "end") o += ee - ae;
	else if (ce && i === "nearest") {
		let e = k - ie, t = ee - ae;
		o += Math.abs(e) <= Math.abs(t) ? e : t;
	}
	if (le && a === "start") s += A - oe;
	else if (le && a === "center") s += (A + j) / 2 - (oe + se) / 2;
	else if (le && a === "end") s += j - se;
	else if (le && a === "nearest") {
		let e = A - oe, t = j - se;
		s += Math.abs(e) <= Math.abs(t) ? e : t;
	}
	e.scrollTo({
		left: s,
		top: o
	});
}
function fs(e, t = {}) {
	let { containingElement: n } = t;
	if (e && e.isConnected) {
		let t = document.scrollingElement || document.documentElement;
		if (window.getComputedStyle(t).overflow !== "hidden") {
			let { left: t, top: r } = e.getBoundingClientRect();
			e?.scrollIntoView?.({ block: "nearest" });
			let { left: i, top: a } = e.getBoundingClientRect();
			(Math.abs(t - i) > 1 || Math.abs(r - a) > 1) && (n?.scrollIntoView?.({
				block: "center",
				inline: "center"
			}), e.scrollIntoView?.({ block: "nearest" }));
		} else {
			let { left: t, top: r } = e.getBoundingClientRect(), i = ls(e, !0);
			for (let t of i) us(t, e);
			let { left: a, top: o } = e.getBoundingClientRect();
			if (Math.abs(t - a) > 1 || Math.abs(r - o) > 1) {
				i = n ? ls(n, !0) : [];
				for (let e of i) us(e, n, {
					block: "center",
					inline: "center"
				});
				for (let t of ls(e, !0)) us(t, e);
			}
		}
	}
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useDescription.mjs
var ps = 0, ms = /* @__PURE__ */ new Map();
function hs(e) {
	let [t, n] = (0, N.useState)();
	return H(() => {
		if (!e) return;
		let t = ms.get(e);
		if (t) n(t.element.id);
		else {
			let r = `react-aria-description-${ps++}`;
			n(r);
			let i = document.createElement("div");
			i.id = r, i.style.display = "none", i.textContent = e, document.body.appendChild(i), t = {
				refCount: 0,
				element: i
			}, ms.set(e, t);
		}
		return t.refCount++, () => {
			t && --t.refCount === 0 && (t.element.remove(), ms.delete(e));
		};
	}, [e]), { "aria-describedby": e ? t : void 0 };
}
//#endregion
//#region node_modules/react-aria/dist/private/visually-hidden/VisuallyHidden.mjs
var gs = {
	border: 0,
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: "1px",
	margin: "-1px",
	overflow: "hidden",
	padding: 0,
	position: "absolute",
	width: "1px",
	whiteSpace: "nowrap"
};
function _s(e = {}) {
	let { style: t, isFocusable: n } = e, [r, i] = (0, N.useState)(!1), { focusWithinProps: a } = Lo({
		isDisabled: !n,
		onFocusWithinChange: (e) => i(e)
	}), o = (0, N.useMemo)(() => r ? t : t ? {
		...gs,
		...t
	} : gs, [r]);
	return { visuallyHiddenProps: {
		...a,
		style: o
	} };
}
function vs(e) {
	let { children: t, elementType: n = "div", isFocusable: r, style: i, ...a } = e, { visuallyHiddenProps: o } = _s(e);
	return /*#__PURE__*/ N.createElement(n, U(a, o), t);
}
//#endregion
//#region node_modules/react-aria-components/dist/private/FieldError.mjs
var ys = /*#__PURE__*/ (0, N.createContext)(null), bs = {
	badInput: !1,
	customError: !1,
	patternMismatch: !1,
	rangeOverflow: !1,
	rangeUnderflow: !1,
	stepMismatch: !1,
	tooLong: !1,
	tooShort: !1,
	typeMismatch: !1,
	valueMissing: !1,
	valid: !0
}, xs = {
	...bs,
	customError: !0,
	valid: !1
}, Ss = {
	isInvalid: !1,
	validationDetails: bs,
	validationErrors: []
}, Cs = (0, N.createContext)({}), ws = "__reactAriaFormValidationState";
function Ts(e) {
	if (e.__reactAriaFormValidationState) {
		let { realtimeValidation: t, displayValidation: n, updateValidation: r, resetValidation: i, commitValidation: a } = e[ws];
		return {
			realtimeValidation: t,
			displayValidation: n,
			updateValidation: r,
			resetValidation: i,
			commitValidation: a
		};
	}
	return Es(e);
}
function Es(e) {
	let { isInvalid: t, validationState: n, name: r, value: i, builtinValidation: a, validate: o, validationBehavior: s = "aria" } = e;
	n && (t ||= n === "invalid");
	let c = t === void 0 ? null : {
		isInvalid: t,
		validationErrors: [],
		validationDetails: xs
	}, l = (0, N.useMemo)(() => !o || i == null ? null : ks(Os(o, i)), [o, i]);
	a?.validationDetails.valid && (a = void 0);
	let u = (0, N.useContext)(Cs), d = (0, N.useMemo)(() => r ? Array.isArray(r) ? r.flatMap((e) => Ds(u[e])) : Ds(u[r]) : [], [u, r]), [f, p] = (0, N.useState)(u), [m, h] = (0, N.useState)(!1);
	u !== f && (p(u), h(!1));
	let g = (0, N.useMemo)(() => ks(m ? [] : d), [m, d]), _ = (0, N.useRef)(Ss), [v, y] = (0, N.useState)(Ss), b = (0, N.useRef)(Ss), x = () => {
		if (!S) return;
		C(!1);
		let e = l || a || _.current;
		As(e, b.current) || (b.current = e, y(e));
	}, [S, C] = (0, N.useState)(!1);
	return (0, N.useEffect)(x), {
		realtimeValidation: c || g || l || a || Ss,
		displayValidation: s === "native" ? c || g || v : c || g || l || a || v,
		updateValidation(e) {
			s === "aria" && !As(v, e) ? y(e) : _.current = e;
		},
		resetValidation() {
			let e = Ss;
			As(e, b.current) || (b.current = e, y(e)), s === "native" && C(!1), h(!0);
		},
		commitValidation() {
			s === "native" && C(!0), h(!0);
		}
	};
}
function Ds(e) {
	return e ? Array.isArray(e) ? e : [e] : [];
}
function Os(e, t) {
	if (typeof e == "function") {
		let n = e(t);
		if (n && typeof n != "boolean") return Ds(n);
	}
	return [];
}
function ks(e) {
	return e.length ? {
		isInvalid: !0,
		validationErrors: e,
		validationDetails: xs
	} : null;
}
function As(e, t) {
	return e === t || !!e && !!t && e.isInvalid === t.isInvalid && e.validationErrors.length === t.validationErrors.length && e.validationErrors.every((e, n) => e === t.validationErrors[n]) && Object.entries(e.validationDetails).every(([e, n]) => t.validationDetails[e] === n);
}
//#endregion
//#region node_modules/react-aria-components/dist/private/Form.mjs
var js = /*#__PURE__*/ (0, N.createContext)(null), Ms = /* @__PURE__ */ new WeakMap();
//#endregion
//#region node_modules/react-aria/dist/private/label/useField.mjs
function Ns(e) {
	let { description: t, errorMessage: n, isInvalid: r, validationState: i } = e, { labelProps: a, fieldProps: o } = qo(e), s = yn([
		!!t,
		!!n,
		r,
		i
	]), c = yn([
		!!t,
		!!n,
		r,
		i
	]);
	return o = U(o, { "aria-describedby": [
		s,
		c,
		e["aria-describedby"]
	].filter(Boolean).join(" ") || void 0 }), {
		labelProps: a,
		fieldProps: o,
		descriptionProps: { id: s },
		errorMessageProps: { id: c }
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useFormReset.mjs
function Ps(e, t, n) {
	let r = vi((e) => {
		n && !e.defaultPrevented && n(t);
	});
	(0, N.useEffect)(() => {
		let t = e?.current?.form;
		return t?.addEventListener("reset", r), () => {
			t?.removeEventListener("reset", r);
		};
	}, [e]);
}
//#endregion
//#region node_modules/react-aria/dist/private/form/useFormValidation.mjs
function Fs(e, t, n) {
	let { validationBehavior: r, focus: i } = e;
	H(() => {
		if (r === "native" && n?.current && "setCustomValidity" in n.current && !n.current.disabled) {
			let e = t.realtimeValidation.isInvalid ? t.realtimeValidation.validationErrors.join(" ") || "Invalid value." : "";
			n.current.setCustomValidity(e), n.current.hasAttribute("title") || (n.current.title = ""), t.realtimeValidation.isInvalid || t.updateValidation(Ls(n.current));
		}
	});
	let a = (0, N.useRef)(!1), o = vi(() => {
		a.current || t.resetValidation();
	}), s = vi((e) => {
		t.displayValidation.isInvalid || t.commitValidation();
		let r = n?.current?.form;
		!e.defaultPrevented && n && r && Rs(r) === n.current && (i ? i() : n.current?.focus(), $r("keyboard")), e.preventDefault();
	}), c = vi(() => {
		t.commitValidation();
	});
	(0, N.useEffect)(() => {
		let e = n?.current;
		if (!e) return;
		let t = e.form, r = t?.reset;
		return t && (t.reset = () => {
			a.current = !window.event || window.event.type === "message" && K(window.event) instanceof MessagePort, r?.call(t), a.current = !1;
		}), e.addEventListener("invalid", s), e.addEventListener("change", c), t?.addEventListener("reset", o), () => {
			e.removeEventListener("invalid", s), e.removeEventListener("change", c), t?.removeEventListener("reset", o), t && (t.reset = r);
		};
	}, [n, r]);
}
function Is(e) {
	let t = e.validity;
	return {
		badInput: t.badInput,
		customError: t.customError,
		patternMismatch: t.patternMismatch,
		rangeOverflow: t.rangeOverflow,
		rangeUnderflow: t.rangeUnderflow,
		stepMismatch: t.stepMismatch,
		tooLong: t.tooLong,
		tooShort: t.tooShort,
		typeMismatch: t.typeMismatch,
		valueMissing: t.valueMissing,
		valid: t.valid
	};
}
function Ls(e) {
	return {
		isInvalid: !e.validity.valid,
		validationDetails: Is(e),
		validationErrors: e.validationMessage ? [e.validationMessage] : []
	};
}
function Rs(e) {
	for (let t = 0; t < e.elements.length; t++) {
		let n = e.elements[t];
		if (n.validity?.valid === !1) return n;
	}
	return null;
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useSlot.mjs
function zs(e = !0) {
	let [t, n] = (0, N.useState)(e), r = (0, N.useRef)(!1), i = (0, N.useCallback)((e) => {
		r.current = !0, n(!!e);
	}, []);
	return H(() => {
		r.current || n(!1);
	}, []), [i, t];
}
function Bs(e = !0) {
	let t = _n(), [n, r] = zs(e);
	return {
		id: r ? t : void 0,
		ref: n
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/toggle/useToggle.mjs
function Vs(e, t, n) {
	let { isDisabled: r = !1, isReadOnly: i = !1, value: a, name: o, form: s, children: c, isRequired: l, validationBehavior: u = "aria", "aria-label": d, "aria-labelledby": f, "aria-describedby": p, onPressStart: m, onPressEnd: h, onPressChange: g, onPress: _, onPressUp: v, onClick: y } = e, b = Ts({
		...e,
		value: t.isSelected
	}), { isInvalid: x, validationErrors: S, validationDetails: C } = b.displayValidation;
	Fs(e, b, n);
	let w = (e) => {
		e.stopPropagation(), t.setSelected(K(e).checked);
	}, { pressProps: T, isPressed: E } = Ao({
		onPressStart: m,
		onPressEnd: h,
		onPressChange: g,
		onPress: _,
		onPressUp: v,
		onClick: y,
		isDisabled: r
	}), [D, O] = (0, N.useState)(!1), { pressProps: k } = Ao({
		onPressStart(e) {
			e.pointerType === "keyboard" || e.pointerType === "virtual" ? e.continuePropagation() : (m?.(e), g?.(!0), O(!0));
		},
		onPressEnd(e) {
			e.pointerType === "keyboard" || e.pointerType === "virtual" ? e.continuePropagation() : (h?.(e), g?.(!1), O(!1));
		},
		onPressUp(e) {
			e.pointerType === "keyboard" || e.pointerType === "virtual" ? e.continuePropagation() : v?.(e);
		},
		onClick: y,
		onPress(r) {
			if (r.pointerType === "keyboard" || r.pointerType === "virtual") {
				r.continuePropagation();
				return;
			}
			_?.(r), t.toggle(), n.current?.focus();
			let { [ws]: i } = e, { commitValidation: a } = i || b;
			a();
		},
		isDisabled: r || i
	}), { focusableProps: ee } = Na(e, n), A = U(T, ee), j = ho(e, { labelable: !0 });
	Ps(n, t.defaultSelected, t.setSelected);
	let te = Bs(), ne = Bs();
	return {
		labelProps: U(k, { onClick: (e) => e.preventDefault() }),
		inputProps: U(j, {
			checked: t.isSelected,
			"aria-required": l && u === "aria" || void 0,
			required: l && u === "native",
			"aria-invalid": x || e.validationState === "invalid" || void 0,
			"aria-errormessage": e["aria-errormessage"],
			"aria-controls": e["aria-controls"],
			"aria-readonly": i || void 0,
			"aria-describedby": [
				te.id,
				ne.id,
				p
			].filter(Boolean).join(" ") || void 0,
			onChange: w,
			disabled: r,
			...a == null ? {} : { value: a },
			name: o,
			form: s,
			type: "checkbox",
			...A
		}),
		descriptionProps: te,
		errorMessageProps: ne,
		isSelected: t.isSelected,
		isPressed: E || D,
		isDisabled: r,
		isReadOnly: i,
		isInvalid: x || e.validationState === "invalid",
		validationErrors: S,
		validationDetails: C
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/checkbox/useCheckbox.mjs
function Hs(e, t, n) {
	let { labelProps: r, inputProps: i, descriptionProps: a, errorMessageProps: o, isSelected: s, isPressed: c, isDisabled: l, isReadOnly: u, isInvalid: d, validationErrors: f, validationDetails: p } = Vs(e, t, n), { isIndeterminate: m } = e;
	return (0, N.useEffect)(() => {
		n.current && (n.current.indeterminate = !!m);
	}), {
		labelProps: U(r, (0, N.useMemo)(() => ({ onMouseDown: (e) => e.preventDefault() }), [])),
		inputProps: i,
		descriptionProps: a,
		errorMessageProps: o,
		isSelected: s,
		isPressed: c,
		isDisabled: l,
		isReadOnly: u,
		isInvalid: d,
		validationErrors: f,
		validationDetails: p
	};
}
//#endregion
//#region node_modules/react-stately/dist/private/toggle/useToggleState.mjs
function Us(e = {}) {
	let { isReadOnly: t } = e, [n, r] = qi(e.isSelected, e.defaultSelected || !1, e.onChange), [i] = (0, N.useState)(n);
	function a(e) {
		t || r(e);
	}
	function o() {
		t || r(!n);
	}
	return {
		isSelected: n,
		defaultSelected: e.defaultSelected ?? i,
		setSelected: a,
		toggle: o
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/checkbox/useCheckboxGroupItem.mjs
function Ws(e, t, n) {
	let r = Us({
		isReadOnly: e.isReadOnly || t.isReadOnly,
		isSelected: t.isSelected(e.value),
		defaultSelected: t.defaultValue.includes(e.value),
		onChange(n) {
			n ? t.addValue(e.value) : t.removeValue(e.value), e.onChange && e.onChange(n);
		}
	}), { name: i, form: a, descriptionId: o, errorMessageId: s, validationBehavior: c } = Ms.get(t);
	c = e.validationBehavior ?? c;
	let { realtimeValidation: l } = Ts({
		...e,
		value: r.isSelected,
		name: void 0,
		validationBehavior: "aria"
	}), u = (0, N.useRef)(Ss), d = () => {
		t.setInvalid(e.value, l.isInvalid ? l : u.current);
	};
	(0, N.useEffect)(d);
	let f = t.realtimeValidation.isInvalid ? t.realtimeValidation : l, p = c === "native" ? t.displayValidation : f, m = Hs({
		...e,
		isReadOnly: e.isReadOnly || t.isReadOnly,
		isDisabled: e.isDisabled || t.isDisabled,
		name: e.name || i,
		form: e.form || a,
		isRequired: e.isRequired ?? t.isRequired,
		validationBehavior: c,
		[ws]: {
			realtimeValidation: f,
			displayValidation: p,
			resetValidation: t.resetValidation,
			commitValidation: t.commitValidation,
			updateValidation(e) {
				u.current = e, d();
			}
		}
	}, r, n);
	return {
		...m,
		inputProps: {
			...m.inputProps,
			"aria-describedby": [
				m.inputProps["aria-describedby"],
				t.isInvalid ? s : null,
				o
			].filter(Boolean).join(" ") || void 0
		}
	};
}
//#endregion
//#region node_modules/react-aria-components/dist/private/Checkbox.mjs
var Gs = /*#__PURE__*/ (0, N.createContext)(null), Ks = /*#__PURE__*/ (0, N.createContext)(null), qs = /*#__PURE__*/ (0, N.createContext)(null);
function Js(e, t) {
	let { validationBehavior: n } = On(js) || {}, r = e.validationBehavior ?? n ?? "native", i = (0, N.useContext)(Ks), a = wn((0, N.useMemo)(() => bn(t, e.inputRef === void 0 ? null : e.inputRef), [t, e.inputRef])), o = {
		...jn(e),
		children: typeof e.children == "function" || e.children,
		value: e.value,
		validationBehavior: r
	};
	return [i ? Ws(o, i, a) : Hs(o, Us(e), a), a];
}
var Ys = /*#__PURE__*/ (0, N.forwardRef)(function(e, t) {
	let { inputRef: n = null, ...r } = e;
	[e, t] = kn(r, t, Gs);
	let [i, a] = Js(e, n);
	return /*#__PURE__*/ N.createElement(qs.Provider, { value: {
		...i,
		inputRef: a,
		defaultClassName: "react-aria-Checkbox",
		isIndeterminate: e.isIndeterminate,
		isRequired: e.isRequired
	} }, /*#__PURE__*/ N.createElement(Xs, {
		...e,
		ref: t
	}));
}), Xs = /*#__PURE__*/ (0, N.forwardRef)(function(e, t) {
	let { labelProps: n, inputProps: r, isSelected: i, isDisabled: a, isReadOnly: o, isPressed: s, isInvalid: c, inputRef: l, defaultClassName: u, isIndeterminate: d, isRequired: f } = (0, N.useContext)(qs), { isFocused: p, isFocusVisible: m, focusProps: h } = Ro(), g = a || o, { hoverProps: _, isHovered: v } = Wo({
		...e,
		isDisabled: g
	}), y = Dn({
		...e,
		defaultClassName: u,
		values: {
			isSelected: i,
			isIndeterminate: d || !1,
			isPressed: s,
			isHovered: v,
			isFocused: p,
			isFocusVisible: m,
			isDisabled: a,
			isReadOnly: o,
			isInvalid: c,
			isRequired: f || !1
		}
	}), b = ho(e, { global: !0 });
	return delete b.id, delete b.onClick, /*#__PURE__*/ N.createElement(Pn.label, {
		...U(b, n, _, y),
		ref: t,
		slot: e.slot || void 0,
		"data-selected": i || void 0,
		"data-indeterminate": d || void 0,
		"data-pressed": s || void 0,
		"data-hovered": v || void 0,
		"data-focused": p || void 0,
		"data-focus-visible": m || void 0,
		"data-disabled": a || void 0,
		"data-readonly": o || void 0,
		"data-invalid": c || void 0,
		"data-required": f || void 0
	}, /*#__PURE__*/ N.createElement(vs, { elementType: "span" }, /*#__PURE__*/ N.createElement("input", {
		...U(r, h),
		ref: l
	})), y.children);
}), Zs = /*#__PURE__*/ (0, N.createContext)({}), Qs = /*#__PURE__*/ (0, N.forwardRef)(function(e, t) {
	[e, t] = kn(e, t, Zs);
	let { isDisabled: n, isInvalid: r, isReadOnly: i, onHoverStart: a, onHoverChange: o, onHoverEnd: s, ...c } = e;
	n ??= !!e["aria-disabled"] && e["aria-disabled"] !== "false", r ??= !!e["aria-invalid"] && e["aria-invalid"] !== "false";
	let { hoverProps: l, isHovered: u } = Wo({
		onHoverStart: a,
		onHoverChange: o,
		onHoverEnd: s,
		isDisabled: n
	}), { isFocused: d, isFocusVisible: f, focusProps: p } = Ro({ within: !0 }), m = Dn({
		...e,
		values: {
			isHovered: u,
			isFocusWithin: d,
			isFocusVisible: f,
			isDisabled: n,
			isInvalid: r
		},
		defaultClassName: "react-aria-Group"
	});
	return /*#__PURE__*/ N.createElement(Pn.div, {
		...U(c, p, l),
		...m,
		ref: t,
		role: e.role ?? "group",
		slot: e.slot ?? void 0,
		"data-focus-within": d || void 0,
		"data-hovered": u || void 0,
		"data-focus-visible": f || void 0,
		"data-disabled": n || void 0,
		"data-invalid": r || void 0,
		"data-readonly": i || void 0
	}, m.children);
}), $s = /*#__PURE__*/ (0, N.createContext)({}), ec = (e) => {
	let { onHoverStart: t, onHoverChange: n, onHoverEnd: r, ...i } = e;
	return i;
}, tc = /*#__PURE__*/ Ia(function(e, t) {
	[e, t] = kn(e, t, $s);
	let { hoverProps: n, isHovered: r } = Wo({
		...e,
		isDisabled: e.disabled
	}), { isFocused: i, isFocusVisible: a, focusProps: o } = Ro({
		isTextInput: !0,
		autoFocus: e.autoFocus
	}), s = !!e["aria-invalid"] && e["aria-invalid"] !== "false", c = Dn({
		...e,
		values: {
			isHovered: r,
			isFocused: i,
			isFocusVisible: a,
			isDisabled: e.disabled || !1,
			isInvalid: s
		},
		defaultClassName: "react-aria-Input"
	});
	return /*#__PURE__*/ N.createElement(Pn.input, {
		...U(ec(e), o, n),
		...c,
		ref: t,
		"data-focused": i || void 0,
		"data-disabled": e.disabled || void 0,
		"data-hovered": r || void 0,
		"data-focus-visible": a || void 0,
		"data-invalid": s || void 0
	});
});
//#endregion
//#region node_modules/react-aria/dist/private/textfield/useTextField.mjs
function nc(e, t) {
	let { inputElementType: n = "input", isDisabled: r = !1, isRequired: i = !1, isReadOnly: a = !1, type: o = "text", validationBehavior: s = "aria" } = e, [c, l] = qi(e.value, e.defaultValue || "", e.onChange), { focusableProps: u } = Na(e, t), d = Ts({
		...e,
		value: c
	}), { isInvalid: f, validationErrors: p, validationDetails: m } = d.displayValidation, { labelProps: h, fieldProps: g, descriptionProps: _, errorMessageProps: v } = Ns({
		...e,
		isInvalid: f,
		errorMessage: e.errorMessage || p
	}), y = ho(e, { labelable: !0 }), b = {
		type: o,
		pattern: e.pattern
	}, [x] = (0, N.useState)(c);
	return Ps(t, e.defaultValue ?? x, l), Fs(e, d, t), {
		labelProps: h,
		inputProps: U(y, n === "input" ? b : void 0, {
			disabled: r,
			readOnly: a,
			required: i && s === "native",
			"aria-required": i && s === "aria" || void 0,
			"aria-invalid": f || void 0,
			"aria-errormessage": e["aria-errormessage"],
			"aria-activedescendant": e["aria-activedescendant"],
			"aria-autocomplete": e["aria-autocomplete"],
			"aria-haspopup": e["aria-haspopup"],
			"aria-controls": e["aria-controls"],
			value: c,
			onChange: (e) => l(K(e).value),
			autoComplete: e.autoComplete,
			autoCapitalize: e.autoCapitalize,
			maxLength: e.maxLength,
			minLength: e.minLength,
			name: e.name,
			form: e.form,
			placeholder: e.placeholder,
			inputMode: e.inputMode,
			autoCorrect: e.autoCorrect,
			spellCheck: e.spellCheck,
			enterKeyHint: e.enterKeyHint,
			onCopy: e.onCopy,
			onCut: e.onCut,
			onPaste: e.onPaste,
			onCompositionEnd: e.onCompositionEnd,
			onCompositionStart: e.onCompositionStart,
			onCompositionUpdate: e.onCompositionUpdate,
			onSelect: e.onSelect,
			onBeforeInput: e.onBeforeInput,
			onInput: e.onInput,
			...u,
			...g
		}),
		descriptionProps: _,
		errorMessageProps: v,
		isInvalid: f,
		validationErrors: p,
		validationDetails: m
	};
}
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/ar-AE.mjs
var rc = {};
rc = {
	colorSwatchPicker: "تغييرات الألوان",
	dropzoneLabel: "DropZone",
	selectPlaceholder: "حدد عنصرًا",
	tableResizer: "أداة تغيير الحجم"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/bg-BG.mjs
var ic = {};
ic = {
	colorSwatchPicker: "Цветови мостри",
	dropzoneLabel: "DropZone",
	selectPlaceholder: "Изберете предмет",
	tableResizer: "Преоразмерител"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/cs-CZ.mjs
var ac = {};
ac = {
	colorSwatchPicker: "Vzorky barev",
	dropzoneLabel: "Místo pro přetažení",
	selectPlaceholder: "Vyberte položku",
	tableResizer: "Změna velikosti"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/da-DK.mjs
var oc = {};
oc = {
	colorSwatchPicker: "Farveprøver",
	dropzoneLabel: "DropZone",
	selectPlaceholder: "Vælg et element",
	tableResizer: "Størrelsesændring"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/de-DE.mjs
var sc = {};
sc = {
	colorSwatchPicker: "Farbfelder",
	dropzoneLabel: "Ablegebereich",
	selectPlaceholder: "Element wählen",
	tableResizer: "Größenanpassung"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/el-GR.mjs
var cc = {};
cc = {
	colorSwatchPicker: "Χρωματικά δείγματα",
	dropzoneLabel: "DropZone",
	selectPlaceholder: "Επιλέξτε ένα αντικείμενο",
	tableResizer: "Αλλαγή μεγέθους"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/en-US.mjs
var lc = {};
lc = {
	selectPlaceholder: "Select an item",
	tableResizer: "Resizer",
	dropzoneLabel: "DropZone",
	colorSwatchPicker: "Color swatches"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/es-ES.mjs
var uc = {};
uc = {
	colorSwatchPicker: "Muestras de colores",
	dropzoneLabel: "DropZone",
	selectPlaceholder: "Seleccionar un artículo",
	tableResizer: "Cambiador de tamaño"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/et-EE.mjs
var dc = {};
dc = {
	colorSwatchPicker: "Värvinäidised",
	dropzoneLabel: "DropZone",
	selectPlaceholder: "Valige üksus",
	tableResizer: "Suuruse muutja"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/fi-FI.mjs
var fc = {};
fc = {
	colorSwatchPicker: "Värimallit",
	dropzoneLabel: "DropZone",
	selectPlaceholder: "Valitse kohde",
	tableResizer: "Koon muuttaja"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/fr-FR.mjs
var pc = {};
pc = {
	colorSwatchPicker: "Échantillons de couleurs",
	dropzoneLabel: "DropZone",
	selectPlaceholder: "Sélectionner un élément",
	tableResizer: "Redimensionneur"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/he-IL.mjs
var mc = {};
mc = {
	colorSwatchPicker: "דוגמיות צבע",
	dropzoneLabel: "DropZone",
	selectPlaceholder: "בחר פריט",
	tableResizer: "שינוי גודל"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/hr-HR.mjs
var hc = {};
hc = {
	colorSwatchPicker: "Uzorci boja",
	dropzoneLabel: "Zona spuštanja",
	selectPlaceholder: "Odaberite stavku",
	tableResizer: "Promjena veličine"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/hu-HU.mjs
var gc = {};
gc = {
	colorSwatchPicker: "Színtárak",
	dropzoneLabel: "DropZone",
	selectPlaceholder: "Válasszon ki egy elemet",
	tableResizer: "Átméretező"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/it-IT.mjs
var _c = {};
_c = {
	colorSwatchPicker: "Campioni di colore",
	dropzoneLabel: "Zona di rilascio",
	selectPlaceholder: "Seleziona un elemento",
	tableResizer: "Ridimensionamento"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/ja-JP.mjs
var vc = {};
vc = {
	colorSwatchPicker: "カラースウォッチ",
	dropzoneLabel: "ドロップゾーン",
	selectPlaceholder: "項目を選択",
	tableResizer: "サイズ変更ツール"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/ko-KR.mjs
var yc = {};
yc = {
	colorSwatchPicker: "색상 견본",
	dropzoneLabel: "드롭 영역",
	selectPlaceholder: "항목 선택",
	tableResizer: "크기 조정기"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/lt-LT.mjs
var bc = {};
bc = {
	colorSwatchPicker: "Spalvų pavyzdžiai",
	dropzoneLabel: "„DropZone“",
	selectPlaceholder: "Pasirinkite elementą",
	tableResizer: "Dydžio keitiklis"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/lv-LV.mjs
var xc = {};
xc = {
	colorSwatchPicker: "Krāsu paraugi",
	dropzoneLabel: "DropZone",
	selectPlaceholder: "Izvēlēties vienumu",
	tableResizer: "Izmēra mainītājs"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/nb-NO.mjs
var Sc = {};
Sc = {
	colorSwatchPicker: "Fargekart",
	dropzoneLabel: "Droppsone",
	selectPlaceholder: "Velg et element",
	tableResizer: "Størrelsesendrer"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/nl-NL.mjs
var Cc = {};
Cc = {
	colorSwatchPicker: "kleurstalen",
	dropzoneLabel: "DropZone",
	selectPlaceholder: "Selecteer een item",
	tableResizer: "Resizer"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/pl-PL.mjs
var wc = {};
wc = {
	colorSwatchPicker: "Próbki kolorów",
	dropzoneLabel: "Strefa upuszczania",
	selectPlaceholder: "Wybierz element",
	tableResizer: "Zmiana rozmiaru"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/pt-BR.mjs
var Tc = {};
Tc = {
	colorSwatchPicker: "Amostras de cores",
	dropzoneLabel: "DropZone",
	selectPlaceholder: "Selecione um item",
	tableResizer: "Redimensionador"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/pt-PT.mjs
var Ec = {};
Ec = {
	colorSwatchPicker: "Amostras de cores",
	dropzoneLabel: "DropZone",
	selectPlaceholder: "Selecione um item",
	tableResizer: "Redimensionador"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/ro-RO.mjs
var Dc = {};
Dc = {
	colorSwatchPicker: "Specimene de culoare",
	dropzoneLabel: "Zonă de plasare",
	selectPlaceholder: "Selectați un element",
	tableResizer: "Instrument de redimensionare"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/ru-RU.mjs
var Oc = {};
Oc = {
	colorSwatchPicker: "Цветовые образцы",
	dropzoneLabel: "DropZone",
	selectPlaceholder: "Выберите элемент",
	tableResizer: "Средство изменения размера"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/sk-SK.mjs
var kc = {};
kc = {
	colorSwatchPicker: "Vzorkovníky farieb",
	dropzoneLabel: "DropZone",
	selectPlaceholder: "Vyberte položku",
	tableResizer: "Nástroj na zmenu veľkosti"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/sl-SI.mjs
var Ac = {};
Ac = {
	colorSwatchPicker: "Barvne palete",
	dropzoneLabel: "DropZone",
	selectPlaceholder: "Izberite element",
	tableResizer: "Spreminjanje velikosti"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/sr-SP.mjs
var jc = {};
jc = {
	colorSwatchPicker: "Uzorci boje",
	dropzoneLabel: "DropZone",
	selectPlaceholder: "Izaberite stavku",
	tableResizer: "Promena veličine"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/sv-SE.mjs
var Mc = {};
Mc = {
	colorSwatchPicker: "Färgrutor",
	dropzoneLabel: "DropZone",
	selectPlaceholder: "Välj en artikel",
	tableResizer: "Storleksändrare"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/tr-TR.mjs
var Nc = {};
Nc = {
	colorSwatchPicker: "Renk örnekleri",
	dropzoneLabel: "Bırakma Bölgesi",
	selectPlaceholder: "Bir öğe seçin",
	tableResizer: "Yeniden boyutlandırıcı"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/uk-UA.mjs
var Pc = {};
Pc = {
	colorSwatchPicker: "Зразки кольорів",
	dropzoneLabel: "DropZone",
	selectPlaceholder: "Виберіть елемент",
	tableResizer: "Засіб змінення розміру"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/zh-CN.mjs
var Fc = {};
Fc = {
	colorSwatchPicker: "颜色色板",
	dropzoneLabel: "放置区域",
	selectPlaceholder: "选择一个项目",
	tableResizer: "尺寸调整器"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intl/zh-TW.mjs
var Ic = {};
Ic = {
	colorSwatchPicker: "色票",
	dropzoneLabel: "放置區",
	selectPlaceholder: "選取項目",
	tableResizer: "大小調整器"
};
//#endregion
//#region node_modules/react-aria-components/dist/private/intlStrings.mjs
var Lc = {};
Lc = {
	"ar-AE": rc,
	"bg-BG": ic,
	"cs-CZ": ac,
	"da-DK": oc,
	"de-DE": sc,
	"el-GR": cc,
	"en-US": lc,
	"es-ES": uc,
	"et-EE": dc,
	"fi-FI": fc,
	"fr-FR": pc,
	"he-IL": mc,
	"hr-HR": hc,
	"hu-HU": gc,
	"it-IT": _c,
	"ja-JP": vc,
	"ko-KR": yc,
	"lt-LT": bc,
	"lv-LV": xc,
	"nb-NO": Sc,
	"nl-NL": Cc,
	"pl-PL": wc,
	"pt-BR": Tc,
	"pt-PT": Ec,
	"ro-RO": Dc,
	"ru-RU": Oc,
	"sk-SK": kc,
	"sl-SI": Ac,
	"sr-SP": jc,
	"sv-SE": Mc,
	"tr-TR": Nc,
	"uk-UA": Pc,
	"zh-CN": Fc,
	"zh-TW": Ic
};
//#endregion
//#region node_modules/react-aria-components/dist/private/DragAndDrop.mjs
var Rc = /*#__PURE__*/ (0, N.createContext)({}), zc = /*#__PURE__*/ (0, N.createContext)(null), Bc = /*#__PURE__*/ (0, N.forwardRef)(function(e, t) {
	let { render: n } = (0, N.useContext)(zc);
	return /*#__PURE__*/ N.createElement(N.Fragment, null, n(e, t));
});
function Vc(e, t) {
	let n = e?.renderDropIndicator, r = e?.isVirtualDragging?.(), i = (0, N.useCallback)((e) => {
		if (r || t?.isDropTarget(e)) return n ? n(e) : /*#__PURE__*/ N.createElement(Bc, { target: e });
	}, [
		t?.target,
		r,
		n
	]);
	return e?.useDropIndicator ? i : void 0;
}
function Hc(e, t, n) {
	let r = e.focusedKey, i = null;
	if (t?.isVirtualDragging?.() && n?.target?.type === "item" && (i = n.target.key, n.target.dropPosition === "after")) {
		let e = n.collection.getKeyAfter(i), t = null;
		if (e != null) {
			let r = n.collection.getItem(i)?.level ?? 0;
			for (; e != null;) {
				let i = n.collection.getItem(e);
				if (!i) break;
				if (i.type !== "item") e = n.collection.getKeyAfter(e);
				else {
					if ((i.level ?? 0) <= r) break;
					t = e, e = n.collection.getKeyAfter(e);
				}
			}
		}
		i = e ?? t ?? i;
	}
	return (0, N.useMemo)(() => new Set([r, i].filter((e) => e != null)), [r, i]);
}
//#endregion
//#region node_modules/react-aria-components/dist/private/Header.mjs
var Uc = /*#__PURE__*/ (0, N.createContext)({}), Wc = /*#__PURE__*/ (0, N.createContext)(null);
function Gc(e) {
	let t = (0, N.useRef)({});
	return /*#__PURE__*/ N.createElement(Wc.Provider, { value: t }, e.children);
}
//#endregion
//#region node_modules/react-aria-components/dist/private/SelectionIndicator.mjs
var Kc = /*#__PURE__*/ (0, N.createContext)({ isSelected: !1 }), qc = /*#__PURE__*/ (0, N.createContext)({});
(class extends Xi {
	static {
		this.type = "separator";
	}
	filter(e, t) {
		let n = t.getItem(this.prevKey);
		if (n && n.type !== "separator") {
			let n = this.clone();
			return t.addDescendants(n, e), n;
		}
		return null;
	}
});
//#endregion
//#region node_modules/react-aria/dist/private/listbox/utils.mjs
var Jc = /* @__PURE__ */ new WeakMap();
function Yc(e) {
	return typeof e == "string" ? e.replace(/\s*/g, "") : "" + e;
}
function Xc(e, t) {
	let n = Jc.get(e);
	if (!n) throw Error("Unknown list");
	return `${n.id}-option-${Yc(t)}`;
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/shadowdom/ShadowTreeWalker.mjs
var Zc = class {
	constructor(e, t, n, r) {
		this._walkerStack = [], this._currentSetFor = /* @__PURE__ */ new Set(), this._acceptNode = (e) => {
			if (e.nodeType === Node.ELEMENT_NODE) {
				let t = e.shadowRoot;
				if (t) {
					let e = this._doc.createTreeWalker(t, this.whatToShow, { acceptNode: this._acceptNode });
					return this._walkerStack.unshift(e), NodeFilter.FILTER_ACCEPT;
				}
				if (typeof this.filter == "function") return this.filter(e);
				if (this.filter?.acceptNode) return this.filter.acceptNode(e);
				if (this.filter === null) return NodeFilter.FILTER_ACCEPT;
			}
			return NodeFilter.FILTER_SKIP;
		}, this._doc = e, this.root = t, this.filter = r ?? null, this.whatToShow = n ?? NodeFilter.SHOW_ALL, this._currentNode = t, this._walkerStack.unshift(e.createTreeWalker(t, n, this._acceptNode));
		let i = t.shadowRoot;
		if (i) {
			let e = this._doc.createTreeWalker(i, this.whatToShow, { acceptNode: this._acceptNode });
			this._walkerStack.unshift(e);
		}
	}
	get currentNode() {
		return this._currentNode;
	}
	set currentNode(e) {
		if (!G(this.root, e)) throw Error("Cannot set currentNode to a node that is not contained by the root node.");
		let t = [], n = e, r = e;
		for (this._currentNode = e; n && n !== this.root;) if (n.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
			let e = n, i = this._doc.createTreeWalker(e, this.whatToShow, { acceptNode: this._acceptNode });
			t.push(i), i.currentNode = r, this._currentSetFor.add(i), n = r = e.host;
		} else n = n.parentNode;
		let i = this._doc.createTreeWalker(this.root, this.whatToShow, { acceptNode: this._acceptNode });
		t.push(i), i.currentNode = r, this._currentSetFor.add(i), this._walkerStack = t;
	}
	get doc() {
		return this._doc;
	}
	firstChild() {
		let e = this.currentNode, t = this.nextNode();
		return G(e, t) ? (t && (this.currentNode = t), t) : (this.currentNode = e, null);
	}
	lastChild() {
		let e = this._walkerStack[0].lastChild();
		return e && (this.currentNode = e), e;
	}
	nextNode() {
		let e = this._walkerStack[0].nextNode();
		if (e) {
			if (e.shadowRoot) {
				let t;
				if (typeof this.filter == "function" ? t = this.filter(e) : this.filter?.acceptNode && (t = this.filter.acceptNode(e)), t === NodeFilter.FILTER_ACCEPT) return this.currentNode = e, e;
				let n = this.nextNode();
				return n && (this.currentNode = n), n;
			}
			return e && (this.currentNode = e), e;
		}
		if (this._walkerStack.length > 1) {
			this._walkerStack.shift();
			let e = this.nextNode();
			return e && (this.currentNode = e), e;
		}
		return null;
	}
	previousNode() {
		let e = this._walkerStack[0];
		if (e.currentNode === e.root) {
			if (this._currentSetFor.has(e)) {
				if (this._currentSetFor.delete(e), this._walkerStack.length > 1) {
					this._walkerStack.shift();
					let e = this.previousNode();
					return e && (this.currentNode = e), e;
				}
				return null;
			}
			return null;
		}
		let t = e.previousNode();
		if (t) {
			if (t.shadowRoot) {
				let e;
				if (typeof this.filter == "function" ? e = this.filter(t) : this.filter?.acceptNode && (e = this.filter.acceptNode(t)), e === NodeFilter.FILTER_ACCEPT) return t && (this.currentNode = t), t;
				let n = this.lastChild();
				return n && (this.currentNode = n), n;
			}
			return t && (this.currentNode = t), t;
		}
		if (this._walkerStack.length > 1) {
			this._walkerStack.shift();
			let e = this.previousNode();
			return e && (this.currentNode = e), e;
		}
		return null;
	}
	nextSibling() {
		return null;
	}
	previousSibling() {
		return null;
	}
	parentNode() {
		return null;
	}
};
function Qc(e, t, n, r) {
	return Gn() ? new Zc(e, t, n, r) : e.createTreeWalker(t, n, r);
}
//#endregion
//#region node_modules/react-aria/dist/private/focus/FocusScope.mjs
var $c = /*#__PURE__*/ N.createContext(null), el = "react-aria-focus-scope-restore", tl = null;
function nl(e) {
	let { children: t, contain: n, restoreFocus: r, autoFocus: i } = e, a = (0, N.useRef)(null), o = (0, N.useRef)(null), s = (0, N.useRef)([]), { parentNode: c } = (0, N.useContext)($c) || {}, l = (0, N.useMemo)(() => new wl({ scopeRef: s }), [s]);
	H(() => {
		let e = c || Tl.root;
		if (Tl.getTreeNode(e.scopeRef) && tl && !pl(tl, e.scopeRef)) {
			let t = Tl.getTreeNode(tl);
			t && (e = t);
		}
		e.addChild(l), Tl.addNode(l);
	}, [l, c]), H(() => {
		let e = Tl.getTreeNode(s);
		e && (e.contain = !!n);
	}, [n]), H(() => {
		let e = a.current?.nextSibling, t = [], n = (e) => e.stopPropagation();
		for (; e && e !== o.current;) t.push(e), e.addEventListener(el, n), e = e.nextSibling;
		return s.current = t, () => {
			for (let e of t) e.removeEventListener(el, n);
		};
	}, [t]), vl(s, r, n), cl(s, n), bl(s, r, n), _l(s, i), (0, N.useEffect)(() => {
		let e = Kn(W(s.current ? s.current[0] : void 0)), t = null;
		if (ul(e, s.current)) {
			for (let n of Tl.traverse()) n.scopeRef && ul(e, n.scopeRef.current) && (t = n);
			t === Tl.getTreeNode(s) && (tl = t.scopeRef);
		}
	}, [s]), H(() => () => {
		let e = Tl.getTreeNode(s)?.parent?.scopeRef ?? null;
		(s === tl || pl(s, tl)) && (!e || Tl.getTreeNode(e)) && (tl = e), Tl.removeTreeNode(s);
	}, [s]);
	let u = (0, N.useMemo)(() => rl(s), []), d = (0, N.useMemo)(() => ({
		focusManager: u,
		parentNode: l
	}), [l, u]);
	return /*#__PURE__*/ N.createElement($c.Provider, { value: d }, /*#__PURE__*/ N.createElement("span", {
		"data-focus-scope-start": !0,
		hidden: !0,
		ref: a
	}), t, /*#__PURE__*/ N.createElement("span", {
		"data-focus-scope-end": !0,
		hidden: !0,
		ref: o
	}));
}
function rl(e) {
	return {
		focusNext(t = {}) {
			let n = e.current, { from: r, tabbable: i, wrap: a, accept: o } = t, s = r || Kn(W(n[0] ?? void 0)), c = n[0].previousElementSibling, l = Sl(il(n), {
				tabbable: i,
				accept: o
			}, n);
			l.currentNode = ul(s, n) ? s : c;
			let u = l.nextNode();
			return !u && a && (l.currentNode = c, u = l.nextNode()), u && ml(u, !0), u;
		},
		focusPrevious(t = {}) {
			let n = e.current, { from: r, tabbable: i, wrap: a, accept: o } = t, s = r || Kn(W(n[0] ?? void 0)), c = n[n.length - 1].nextElementSibling, l = Sl(il(n), {
				tabbable: i,
				accept: o
			}, n);
			l.currentNode = ul(s, n) ? s : c;
			let u = l.previousNode();
			return !u && a && (l.currentNode = c, u = l.previousNode()), u && ml(u, !0), u;
		},
		focusFirst(t = {}) {
			let n = e.current, { tabbable: r, accept: i } = t, a = Sl(il(n), {
				tabbable: r,
				accept: i
			}, n);
			a.currentNode = n[0].previousElementSibling;
			let o = a.nextNode();
			return o && ml(o, !0), o;
		},
		focusLast(t = {}) {
			let n = e.current, { tabbable: r, accept: i } = t, a = Sl(il(n), {
				tabbable: r,
				accept: i
			}, n);
			a.currentNode = n[n.length - 1].nextElementSibling;
			let o = a.previousNode();
			return o && ml(o, !0), o;
		}
	};
}
function il(e) {
	return e[0].parentElement;
}
function al(e) {
	let t = Tl.getTreeNode(tl);
	for (; t && t.scopeRef !== e;) {
		if (t.contain) return !1;
		t = t.parent;
	}
	return !0;
}
function ol(e) {
	if (!e.form) return Array.from(W(e).querySelectorAll(`input[type="radio"][name="${CSS.escape(e.name)}"]`)).filter((e) => !e.form);
	let t = e.form.elements.namedItem(e.name), n = Ln(e);
	return t instanceof n.RadioNodeList ? Array.from(t).filter((e) => e instanceof n.HTMLInputElement) : t instanceof n.HTMLInputElement ? [t] : [];
}
function sl(e) {
	if (e.checked) return !0;
	let t = ol(e);
	return t.length > 0 && !t.some((e) => e.checked);
}
function cl(e, t) {
	let n = (0, N.useRef)(void 0), r = (0, N.useRef)(void 0);
	H(() => {
		let i = e.current;
		if (!t) {
			r.current &&= (cancelAnimationFrame(r.current), void 0);
			return;
		}
		let a = W(i ? i[0] : void 0), o = (t) => {
			if (t.key !== "Tab" || t.altKey || t.ctrlKey || t.metaKey || !al(e) || t.isComposing) return;
			let n = Kn(a), r = e.current;
			if (!r || !ul(n, r)) return;
			let i = Sl(il(r), { tabbable: !0 }, r);
			if (!n) return;
			i.currentNode = n;
			let o = t.shiftKey ? i.previousNode() : i.nextNode();
			o ||= (i.currentNode = t.shiftKey ? r[r.length - 1].nextElementSibling : r[0].previousElementSibling, t.shiftKey ? i.previousNode() : i.nextNode()), t.preventDefault(), o && (ml(o, !0), o instanceof Ln(o).HTMLInputElement && o.select());
		}, s = (t) => {
			(!tl || pl(tl, e)) && ul(K(t), e.current) ? (tl = e, n.current = K(t)) : al(e) && !dl(K(t), e) ? n.current ? ml(n.current) : tl && tl.current && gl(tl.current) : al(e) && (n.current = K(t));
		}, c = (t) => {
			r.current && cancelAnimationFrame(r.current), r.current = requestAnimationFrame(() => {
				let r = Qr(), i = (r === "virtual" || r === null) && Tr() && wr(), o = Kn(a);
				if (!i && o && al(e) && !dl(o, e)) {
					tl = e;
					let r = K(t);
					r && r.isConnected ? (n.current = r, ml(n.current)) : tl.current && gl(tl.current);
				}
			});
		};
		return a.addEventListener("keydown", o, !1), a.addEventListener("focusin", s, !1), i?.forEach((e) => e.addEventListener("focusin", s, !1)), i?.forEach((e) => e.addEventListener("focusout", c, !1)), () => {
			a.removeEventListener("keydown", o, !1), a.removeEventListener("focusin", s, !1), i?.forEach((e) => e.removeEventListener("focusin", s, !1)), i?.forEach((e) => e.removeEventListener("focusout", c, !1));
		};
	}, [e, t]), H(() => () => {
		r.current && cancelAnimationFrame(r.current);
	}, [r]);
}
function ll(e) {
	return dl(e);
}
function ul(e, t) {
	return !e || !t ? !1 : t.some((t) => G(t, e));
}
function dl(e, t = null) {
	if (e instanceof Element && e.closest("[data-react-aria-top-layer]")) return !0;
	for (let { scopeRef: n } of Tl.traverse(Tl.getTreeNode(t))) if (n && ul(e, n.current)) return !0;
	return !1;
}
function fl(e) {
	return dl(e, tl);
}
function pl(e, t) {
	let n = Tl.getTreeNode(t)?.parent;
	for (; n;) {
		if (n.scopeRef === e) return !0;
		n = n.parent;
	}
	return !1;
}
function ml(e, t = !1) {
	if (e != null && !t) try {
		ma(e);
	} catch {}
	else if (e != null) try {
		e.focus();
	} catch {}
}
function hl(e, t = !0) {
	let n = e[0].previousElementSibling, r = il(e), i = Sl(r, { tabbable: t }, e);
	i.currentNode = n;
	let a = i.nextNode();
	return t && !a && (r = il(e), i = Sl(r, { tabbable: !1 }, e), i.currentNode = n, a = i.nextNode()), a;
}
function gl(e, t = !0) {
	ml(hl(e, t));
}
function _l(e, t) {
	let n = N.useRef(t);
	(0, N.useEffect)(() => {
		n.current && (tl = e, !ul(Kn(W(e.current ? e.current[0] : void 0)), tl.current) && e.current && gl(e.current)), n.current = !1;
	}, [e]);
}
function vl(e, t, n) {
	H(() => {
		if (t || n) return;
		let r = e.current, i = W(r ? r[0] : void 0), a = (t) => {
			let n = K(t);
			ul(n, e.current) ? tl = e : ll(n) || (tl = null);
		};
		return i.addEventListener("focusin", a, !1), r?.forEach((e) => e.addEventListener("focusin", a, !1)), () => {
			i.removeEventListener("focusin", a, !1), r?.forEach((e) => e.removeEventListener("focusin", a, !1));
		};
	}, [
		e,
		t,
		n
	]);
}
function yl(e) {
	let t = Tl.getTreeNode(tl);
	for (; t && t.scopeRef !== e;) {
		if (t.nodeToRestore) return !1;
		t = t.parent;
	}
	return t?.scopeRef === e;
}
function bl(e, t, n) {
	let r = (0, N.useRef)(typeof document < "u" ? Kn(W(e.current ? e.current[0] : void 0)) : null);
	H(() => {
		let r = e.current, i = W(r ? r[0] : void 0);
		if (!t || n) return;
		let a = () => {
			(!tl || pl(tl, e)) && ul(Kn(i), e.current) && (tl = e);
		};
		return i.addEventListener("focusin", a, !1), r?.forEach((e) => e.addEventListener("focusin", a, !1)), () => {
			i.removeEventListener("focusin", a, !1), r?.forEach((e) => e.removeEventListener("focusin", a, !1));
		};
	}, [e, n]), H(() => {
		let r = W(e.current ? e.current[0] : void 0);
		if (!t) return;
		let i = (t) => {
			if (t.key !== "Tab" || t.altKey || t.ctrlKey || t.metaKey || !al(e) || t.isComposing) return;
			let n = r.activeElement;
			if (!dl(n, e) || !yl(e)) return;
			let i = Tl.getTreeNode(e);
			if (!i) return;
			let a = i.nodeToRestore, o = Sl(r.body, { tabbable: !0 });
			o.currentNode = n;
			let s = t.shiftKey ? o.previousNode() : o.nextNode();
			if ((!a || !a.isConnected || a === r.body) && (a = void 0, i.nodeToRestore = void 0), (!s || !dl(s, e)) && a) {
				o.currentNode = a;
				do
					s = t.shiftKey ? o.previousNode() : o.nextNode();
				while (dl(s, e));
				t.preventDefault(), t.stopPropagation(), s ? ml(s, !0) : ll(a) ? ml(a, !0) : n.blur();
			}
		};
		return n || r.addEventListener("keydown", i, !0), () => {
			n || r.removeEventListener("keydown", i, !0);
		};
	}, [
		e,
		t,
		n
	]), H(() => {
		let n = W(e.current ? e.current[0] : void 0);
		if (!t) return;
		let i = Tl.getTreeNode(e);
		if (i) return i.nodeToRestore = r.current ?? void 0, () => {
			let r = Tl.getTreeNode(e);
			if (!r) return;
			let i = r.nodeToRestore, a = Kn(n);
			if (t && i && (a && dl(a, e) || a === n.body && yl(e))) {
				let t = Tl.clone();
				requestAnimationFrame(() => {
					if (n.activeElement === n.body) {
						let n = t.getTreeNode(e);
						for (; n;) {
							if (n.nodeToRestore && n.nodeToRestore.isConnected) {
								xl(n.nodeToRestore);
								return;
							}
							n = n.parent;
						}
						for (n = t.getTreeNode(e); n;) {
							if (n.scopeRef && n.scopeRef.current && Tl.getTreeNode(n.scopeRef)) {
								let e = hl(n.scopeRef.current, !0);
								if (e) {
									xl(e);
									return;
								}
							}
							n = n.parent;
						}
					}
				});
			}
		};
	}, [e, t]);
}
function xl(e) {
	e.dispatchEvent(new CustomEvent(el, {
		bubbles: !0,
		cancelable: !0
	})) && ml(e);
}
function Sl(e, t, n) {
	let r = t?.tabbable ? cr : sr, i = W(e?.nodeType === Node.ELEMENT_NODE ? e : null), a = Qc(i, e || i, NodeFilter.SHOW_ELEMENT, { acceptNode(e) {
		return G(t?.from, e) || t?.tabbable && e.tagName === "INPUT" && e.getAttribute("type") === "radio" && (!sl(e) || a.currentNode.tagName === "INPUT" && a.currentNode.type === "radio" && a.currentNode.name === e.name) ? NodeFilter.FILTER_REJECT : r(e) && (!n || ul(e, n)) && (!t?.accept || t.accept(e)) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	} });
	return t?.from && (a.currentNode = t.from), a;
}
var Cl = class e {
	constructor() {
		this.fastMap = /* @__PURE__ */ new Map(), this.root = new wl({ scopeRef: null }), this.fastMap.set(null, this.root);
	}
	get size() {
		return this.fastMap.size;
	}
	getTreeNode(e) {
		return this.fastMap.get(e);
	}
	addTreeNode(e, t, n) {
		let r = this.fastMap.get(t ?? null);
		if (!r) return;
		let i = new wl({ scopeRef: e });
		r.addChild(i), i.parent = r, this.fastMap.set(e, i), n && (i.nodeToRestore = n);
	}
	addNode(e) {
		this.fastMap.set(e.scopeRef, e);
	}
	removeTreeNode(e) {
		if (e === null) return;
		let t = this.fastMap.get(e);
		if (!t) return;
		let n = t.parent;
		for (let e of this.traverse()) e !== t && t.nodeToRestore && e.nodeToRestore && t.scopeRef && t.scopeRef.current && ul(e.nodeToRestore, t.scopeRef.current) && (e.nodeToRestore = t.nodeToRestore);
		let r = t.children;
		n && (n.removeChild(t), r.size > 0 && r.forEach((e) => n && n.addChild(e))), this.fastMap.delete(t.scopeRef);
	}
	*traverse(e = this.root) {
		if (e.scopeRef != null && (yield e), e.children.size > 0) for (let t of e.children) yield* this.traverse(t);
	}
	clone() {
		let t = new e();
		for (let e of this.traverse()) t.addTreeNode(e.scopeRef, e.parent?.scopeRef ?? null, e.nodeToRestore);
		return t;
	}
}, wl = class {
	constructor(e) {
		this.children = /* @__PURE__ */ new Set(), this.contain = !1, this.scopeRef = e.scopeRef;
	}
	addChild(e) {
		this.children.add(e), e.parent = this;
	}
	removeChild(e) {
		this.children.delete(e), e.parent = void 0;
	}
}, Tl = new Cl();
//#endregion
//#region node_modules/react-aria/dist/private/selection/utils.mjs
function El(e) {
	return Sr() ? e.altKey : e.ctrlKey;
}
function Dl(e, t) {
	let n = `[data-key="${CSS.escape(String(t))}"]`, r = e.current?.dataset.collection;
	return r && (n = `[data-collection="${CSS.escape(r)}"]${n}`), e.current?.querySelector(n);
}
var Ol = /* @__PURE__ */ new WeakMap();
function kl(e) {
	let t = _n();
	return Ol.set(e, t), t;
}
function Al(e) {
	return Ol.get(e);
}
//#endregion
//#region node_modules/react-aria/dist/private/selection/useTypeSelect.mjs
var jl = 1e3;
function Ml(e) {
	let { keyboardDelegate: t, selectionManager: n, onTypeSelect: r } = e, i = (0, N.useRef)({
		search: "",
		timeout: void 0
	});
	return (0, N.useEffect)(() => {
		let e = i.current.timeout;
		return () => {
			clearTimeout(e);
		};
	}, [i]), { typeSelectProps: {
		onKeyDownCapture: t.getKeyForSearch ? (e) => {
			if (i.current.search.length > 0 && e.key === " ") {
				if (e.preventDefault(), (!("continuePropagation" in e) || "continuePropagation" in e && !e.isPropagationStopped()) && e.stopPropagation(), i.current.search += " ", t.getKeyForSearch != null) {
					let e = t.getKeyForSearch(i.current.search, n.focusedKey);
					e ??= t.getKeyForSearch(i.current.search), e != null && (n.setFocusedKey(e), r && r(e));
				}
				clearTimeout(i.current.timeout), i.current.timeout = setTimeout(() => {
					i.current.search = "";
				}, jl);
			}
		} : void 0,
		onKeyDown: t.getKeyForSearch ? (e) => {
			let a = Nl(e.key);
			if (!(!a || e.ctrlKey || e.metaKey || e.altKey || !G(e.currentTarget, K(e)) || i.current.search.length === 0 && a === " ")) {
				if (i.current.search += a, t.getKeyForSearch != null) {
					let a = t.getKeyForSearch(i.current.search, n.focusedKey);
					if (a ??= t.getKeyForSearch(i.current.search), a != null) n.setFocusedKey(a), r && r(a), e.preventDefault(), "continuePropagation" in e || e.stopPropagation();
					else {
						i.current.search = "", clearTimeout(i.current.timeout), i.current.timeout = void 0;
						return;
					}
				}
				clearTimeout(i.current.timeout), i.current.timeout = setTimeout(() => {
					i.current.search = "";
				}, jl);
			}
		} : void 0
	} };
}
function Nl(e) {
	return e.length === 1 || !/^[A-Z]/i.test(e) ? e : "";
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useUpdateLayoutEffect.mjs
function Pl(e, t) {
	let n = (0, N.useRef)(!0), r = (0, N.useRef)(null);
	H(() => (n.current = !0, () => {
		n.current = !1;
	}), []), H(() => {
		n.current ? n.current = !1 : (!r.current || t.some((e, t) => !Object.is(e, r[t]))) && e(), r.current = t;
	}, t);
}
//#endregion
//#region node_modules/react-aria/dist/private/selection/useSelectableCollection.mjs
function Fl(e) {
	let { selectionManager: t, keyboardDelegate: n, ref: r, autoFocus: i = !1, shouldFocusWrap: a = !1, disallowEmptySelection: o = !1, disallowSelectAll: s = !1, escapeKeyBehavior: c = "clearSelection", selectOnFocus: l = t.selectionBehavior === "replace", disallowTypeAhead: u = !1, shouldUseVirtualFocus: d, allowsTabNavigation: f = !1, scrollRef: p = r, linkBehavior: m = "action", UNSTABLE_focusOnEntry: h } = e, { direction: g } = ji(), _ = kr(), v = (e, n, i) => {
		if (n != null) {
			if (t.isLink(n) && m === "selection" && l && !El(e)) {
				(0, Ba.flushSync)(() => {
					t.setFocusedKey(n, i);
				});
				let a = Dl(r, n), o = t.getItemProps(n);
				if (a) {
					_.open(a, e, o.href, o.routerOptions);
					return;
				}
				return !1;
			}
			if (t.setFocusedKey(n, i), t.isLink(n) && m === "override") return !1;
			if (e.shiftKey && t.selectionMode === "multiple") {
				t.extendSelection(n);
				return;
			}
			if (l && !El(e)) {
				t.replaceSelection(n);
				return;
			}
		}
		return !1;
	}, y = (e) => {
		if (n.getKeyBelow) {
			let r = t.focusedKey == null ? n.getFirstKey?.() : n.getKeyBelow?.(t.focusedKey);
			if (r == null && a && (r = n.getFirstKey?.(t.focusedKey)), r != null) {
				v(e, r);
				return;
			}
		}
		return !1;
	}, b = (e) => {
		if (n.getKeyAbove) {
			let r = t.focusedKey == null ? n.getLastKey?.() : n.getKeyAbove?.(t.focusedKey);
			if (r == null && a && (r = n.getLastKey?.(t.focusedKey)), r != null) {
				v(e, r);
				return;
			}
		}
		return !1;
	}, x = (e) => {
		if (n.getFirstKey) {
			if (t.focusedKey === null && e.shiftKey) return !1;
			let r = n.getFirstKey(t.focusedKey, hi(e));
			if (t.setFocusedKey(r), r != null) {
				if (hi(e) && e.shiftKey && t.selectionMode === "multiple") {
					t.extendSelection(r);
					return;
				}
				if (l) {
					t.replaceSelection(r);
					return;
				}
			}
		}
		return !1;
	}, S = (e) => {
		if (n.getKeyLeftOf) {
			let r = t.focusedKey == null ? n.getFirstKey?.() : n.getKeyLeftOf?.(t.focusedKey);
			if (r == null && a && (r = g === "rtl" ? n.getFirstKey?.(t.focusedKey) : n.getLastKey?.(t.focusedKey)), r != null) {
				v(e, r, g === "rtl" ? "first" : "last");
				return;
			}
		}
		return !1;
	}, C = (e) => {
		if (n.getKeyRightOf) {
			let r = t.focusedKey == null ? n.getFirstKey?.() : n.getKeyRightOf?.(t.focusedKey);
			if (r == null && a && (r = g === "rtl" ? n.getLastKey?.(t.focusedKey) : n.getFirstKey?.(t.focusedKey)), r != null) {
				v(e, r, g === "rtl" ? "last" : "first");
				return;
			}
		}
		return !1;
	}, w = (e) => {
		if (n.getLastKey) {
			if (t.focusedKey === null && e.shiftKey) return !1;
			let r = n.getLastKey(t.focusedKey, hi(e));
			if (t.setFocusedKey(r), r != null) {
				if (hi(e) && e.shiftKey && t.selectionMode === "multiple") {
					t.extendSelection(r);
					return;
				}
				if (l) {
					t.replaceSelection(r);
					return;
				}
			}
		}
		return !1;
	}, T = (e) => {
		if (n.getKeyPageBelow && t.focusedKey != null) {
			let r = n.getKeyPageBelow(t.focusedKey);
			if (r != null) return v(e, r);
		}
		return !1;
	}, E = (e) => {
		if (n.getKeyPageAbove && t.focusedKey != null) {
			let r = n.getKeyPageAbove(t.focusedKey);
			if (r != null) return v(e, r);
		}
		return !1;
	}, D = () => {
		if (t.selectionMode === "multiple" && s !== !0) t.selectAll();
		else return !1;
	}, O = () => {
		if (c === "clearSelection" && !o && t.selectedKeys.size !== 0) t.clearSelection();
		else return !1;
	}, k = () => {
		if (!f && r.current) {
			let e = Sl(r.current, { tabbable: !0 }), t, n;
			do
				n = e.lastChild(), n && (t = n);
			while (n);
			let i = Kn();
			t && (!Jn(t) || i && !cr(i)) && $n(t);
		}
		return {
			shouldContinuePropagation: !0,
			shouldPreventDefault: !1
		};
	}, ee = () => (!f && r.current && r.current.focus(), {
		shouldContinuePropagation: !0,
		shouldPreventDefault: !1
	}), A = (e, t) => ({
		[vr() ? e + "+Shift+Alt" : e + "+Shift+Control"]: t,
		[e + "+Shift"]: t,
		[vr() ? e + "+Alt" : e + "+Control"]: t,
		[e]: t
	}), { keyboardProps: j } = ka({
		shortcuts: {
			...A("ArrowDown", y),
			...A("ArrowUp", b),
			...A("ArrowLeft", S),
			...A("ArrowRight", C),
			...A("PageDown", T),
			...A("PageUp", E)
		},
		allowRepeats: !0
	}), { keyboardProps: te } = ka({ shortcuts: {
		...A("Home", x),
		...A("End", w),
		"Mod+A": D,
		Escape: O,
		Tab: k,
		"Tab+Shift": ee
	} }), ne = (0, N.useRef)({
		top: 0,
		left: 0
	});
	yi(p, "scroll", () => {
		ne.current = {
			top: p.current?.scrollTop ?? 0,
			left: p.current?.scrollLeft ?? 0
		};
	});
	let re = (e) => {
		if (t.isFocused) {
			G(e.currentTarget, K(e)) || t.setFocused(!1);
			return;
		}
		if (!G(e.currentTarget, K(e))) return;
		let i = Qr();
		t.setFocused(!0);
		let a = (e) => {
			e != null && (t.setFocusedKey(e), l && !t.isSelected(e) && t.replaceSelection(e));
		};
		if (h && (i === "keyboard" || i === "virtual")) a(h === "first" ? n.getFirstKey?.() : n.getLastKey?.());
		else if (t.focusedKey == null) {
			let r = e.relatedTarget;
			r && e.currentTarget.compareDocumentPosition(r) & Node.DOCUMENT_POSITION_FOLLOWING ? a(t.lastSelectedKey ?? n.getLastKey?.()) : a(t.firstSelectedKey ?? n.getFirstKey?.());
		} else p.current && (p.current.scrollTop = ne.current.top, p.current.scrollLeft = ne.current.left);
		if (t.focusedKey != null && p.current) {
			let e = Dl(r, t.focusedKey);
			e instanceof HTMLElement && (!Jn(e) && !d && $n(e), (i === "keyboard" || h && i === "virtual") && fs(e, { containingElement: r.current }));
		}
	}, M = (e) => {
		G(e.currentTarget, e.relatedTarget) || t.setFocused(!1);
	}, ie = (0, N.useRef)(!1);
	yi(r, In, d ? (e) => {
		let { detail: n } = e;
		e.stopPropagation(), t.setFocused(!0), n?.focusStrategy === "first" && (ie.current = !0);
	} : void 0);
	let ae = n.getFirstKey?.() ?? null;
	Pl(() => {
		if (ie.current) {
			if (ae == null) {
				let e = Kn();
				Yn(r.current), Zn(e, null), t.collection.size > 0 && (ie.current = !1);
			} else t.setFocusedKey(ae), ie.current = !1;
		}
	}, [ae, t.collection.size]), Pl(() => {
		t.collection.size > 0 && (ie.current = !1);
	}, [t.focusedKey]), yi(r, Fn, d ? (e) => {
		e.stopPropagation(), t.setFocused(!1), e.detail?.clearFocusKey && t.setFocusedKey(null);
	} : void 0);
	let oe = (0, N.useRef)(i), se = (0, N.useRef)(!1);
	(0, N.useEffect)(() => {
		if (oe.current) {
			let e = null;
			i === "first" && (e = n.getFirstKey?.() ?? null), i === "last" && (e = n.getLastKey?.() ?? null);
			let a = t.selectedKeys;
			if (a.size) {
				for (let n of a) if (t.canSelectItem(n)) {
					e = n;
					break;
				}
			}
			t.setFocused(!0), t.setFocusedKey(e), e != null && l && !a.size && t.canSelectItem(e) && t.replaceSelection(e), e == null && !d && r.current && ma(r.current), t.collection.size > 0 && (oe.current = !1, se.current = !0);
		}
	});
	let ce = (0, N.useRef)(t.focusedKey), le = (0, N.useRef)(null);
	(0, N.useEffect)(() => {
		if (t.isFocused && t.focusedKey != null && (t.focusedKey !== ce.current || se.current) && p.current && r.current) {
			let e = Qr(), n = Dl(r, t.focusedKey);
			if (!(n instanceof HTMLElement)) return;
			(e === "keyboard" || se.current) && (le.current && cancelAnimationFrame(le.current), le.current = requestAnimationFrame(() => {
				p.current && (us(p.current, n), e !== "virtual" && fs(n, { containingElement: r.current }));
			}));
		}
		!d && t.isFocused && t.focusedKey == null && ce.current != null && r.current && ma(r.current), ce.current = t.focusedKey, se.current = !1;
	}), (0, N.useEffect)(() => () => {
		le.current && cancelAnimationFrame(le.current);
	}, []), yi(r, "react-aria-focus-scope-restore", (e) => {
		e.preventDefault(), t.setFocused(!0);
	});
	let ue = {
		...U(te, j),
		onFocus: re,
		onBlur: M,
		onMouseDown(e) {
			p.current === K(e) && e.preventDefault();
		}
	}, { typeSelectProps: de } = Ml({
		keyboardDelegate: n,
		selectionManager: t
	});
	u || (ue = U(de, ue));
	let fe;
	d || (fe = t.focusedKey == null ? 0 : -1);
	let pe = kl(t.collection);
	return { collectionProps: U(ue, {
		tabIndex: fe,
		"data-collection": pe
	}) };
}
//#endregion
//#region node_modules/react-aria/dist/private/selection/DOMLayoutDelegate.mjs
var Il = class {
	constructor(e) {
		this.ref = e;
	}
	getItemRect(e) {
		let t = this.ref.current;
		if (!t) return null;
		let n = e == null ? null : Dl(this.ref, e);
		if (!n) return null;
		let r = t.getBoundingClientRect(), i = n.getBoundingClientRect();
		return {
			x: i.left - r.left - t.clientLeft + t.scrollLeft,
			y: i.top - r.top - t.clientTop + t.scrollTop,
			width: i.width,
			height: i.height
		};
	}
	getContentSize() {
		let e = this.ref.current;
		return {
			width: e?.scrollWidth ?? 0,
			height: e?.scrollHeight ?? 0
		};
	}
	getVisibleRect() {
		let e = this.ref.current;
		return {
			x: e?.scrollLeft ?? 0,
			y: e?.scrollTop ?? 0,
			width: e?.clientWidth ?? 0,
			height: e?.clientHeight ?? 0
		};
	}
}, Ll = class {
	constructor(...e) {
		if (e.length === 1) {
			let t = e[0];
			this.collection = t.collection, this.ref = t.ref, this.collator = t.collator, this.disabledKeys = t.disabledKeys || /* @__PURE__ */ new Set(), this.disabledBehavior = t.disabledBehavior || "all", this.orientation = t.orientation || "vertical", this.direction = t.direction, this.layout = t.layout || "stack", this.layoutDelegate = t.layoutDelegate || new Il(t.ref);
		} else this.collection = e[0], this.disabledKeys = e[1], this.ref = e[2], this.collator = e[3], this.layout = "stack", this.orientation = "vertical", this.disabledBehavior = "all", this.layoutDelegate = new Il(this.ref);
		this.layout === "stack" && this.orientation === "vertical" && (this.getKeyLeftOf = void 0, this.getKeyRightOf = void 0);
	}
	isDisabled(e) {
		return this.disabledBehavior === "all" && (e.props?.isDisabled || this.disabledKeys.has(e.key)) && e.props?.disabledBehavior !== "selection";
	}
	findNextNonDisabled(e, t, n = !1) {
		let r = e;
		for (; r != null;) {
			let e = this.collection.getItem(r);
			if (e?.type === "item" && (n || !this.isDisabled(e))) return r;
			r = t(r);
		}
		return null;
	}
	getNextKey(e, t) {
		let n = e;
		return n = this.collection.getKeyAfter(n), this.findNextNonDisabled(n, (e) => this.collection.getKeyAfter(e), t?.includeDisabled);
	}
	getPreviousKey(e, t) {
		let n = e;
		return n = this.collection.getKeyBefore(n), this.findNextNonDisabled(n, (e) => this.collection.getKeyBefore(e), t?.includeDisabled);
	}
	findKey(e, t, n) {
		let r = e, i = this.layoutDelegate.getItemRect(r);
		if (!i || r == null) return null;
		let a = i;
		do {
			if (r = t(r), r == null) break;
			i = this.layoutDelegate.getItemRect(r);
		} while (i && n(a, i) && r != null);
		return r;
	}
	isSameRow(e, t) {
		return e.y === t.y || e.x !== t.x;
	}
	isSameColumn(e, t) {
		return e.x === t.x || e.y !== t.y;
	}
	isReversed(e) {
		let t = this.getNextKey(e), n = Dl(this.ref, e);
		if (t != null) {
			let e = Dl(this.ref, t);
			return !n || !e ? !1 : n.getBoundingClientRect().top > e.getBoundingClientRect().top;
		}
		let r = this.getPreviousKey(e);
		if (r != null) {
			let e = Dl(this.ref, r);
			return !n || !e ? !1 : e.getBoundingClientRect().top > n.getBoundingClientRect().top;
		}
		return !1;
	}
	getKeyBelow(e, t) {
		return this.layout === "grid" && this.orientation === "vertical" ? this.findKey(e, (e) => this.getNextKey(e, t), this.isSameRow) : this.orientation === "vertical" && this.isReversed(e) ? this.getPreviousKey(e, t) : this.getNextKey(e, t);
	}
	getKeyAbove(e, t) {
		return this.layout === "grid" && this.orientation === "vertical" ? this.findKey(e, (e) => this.getPreviousKey(e, t), this.isSameRow) : this.orientation === "vertical" && this.isReversed(e) ? this.getNextKey(e, t) : this.getPreviousKey(e, t);
	}
	getNextColumn(e, t, n) {
		return t ? this.getPreviousKey(e, n) : this.getNextKey(e, n);
	}
	getKeyRightOf(e, t) {
		let n = this.direction === "ltr" ? "getKeyRightOf" : "getKeyLeftOf";
		return this.layoutDelegate[n] ? (e = this.layoutDelegate[n](e), this.findNextNonDisabled(e, (e) => this.layoutDelegate[n](e), t?.includeDisabled)) : this.layout === "grid" ? this.orientation === "vertical" ? this.getNextColumn(e, this.direction === "rtl", t) : this.findKey(e, (e) => this.getNextColumn(e, this.direction === "rtl", t), this.isSameColumn) : this.orientation === "horizontal" ? this.getNextColumn(e, this.direction === "rtl", t) : null;
	}
	getKeyLeftOf(e, t) {
		let n = this.direction === "ltr" ? "getKeyLeftOf" : "getKeyRightOf";
		return this.layoutDelegate[n] ? (e = this.layoutDelegate[n](e), this.findNextNonDisabled(e, (e) => this.layoutDelegate[n](e), t?.includeDisabled)) : this.layout === "grid" ? this.orientation === "vertical" ? this.getNextColumn(e, this.direction === "ltr", t) : this.findKey(e, (e) => this.getNextColumn(e, this.direction === "ltr", t), this.isSameColumn) : this.orientation === "horizontal" ? this.getNextColumn(e, this.direction === "ltr", t) : null;
	}
	getFirstKey() {
		let e = this.collection.getFirstKey();
		return this.findNextNonDisabled(e, (e) => this.collection.getKeyAfter(e));
	}
	getLastKey() {
		let e = this.collection.getLastKey();
		return this.findNextNonDisabled(e, (e) => this.collection.getKeyBefore(e));
	}
	getKeyPageAbove(e) {
		let t = this.ref.current, n = this.layoutDelegate.getItemRect(e);
		if (!n) return null;
		let r = this.isReversed(e);
		if (t && !ss(t)) return this.getFirstKey();
		let i = e;
		if (this.orientation === "horizontal") {
			let e = Math.max(0, n.x + n.width - this.layoutDelegate.getVisibleRect().width);
			for (; n && n.x > e && i != null;) i = this.getKeyAbove(i), n = i == null ? null : this.layoutDelegate.getItemRect(i);
		} else {
			let e = this.layoutDelegate.getVisibleRect(), t = r ? n.y - e.height : Math.max(0, n.y + n.height - e.height);
			for (; n && n.y > t && i != null;) i = this.getKeyAbove(i), n = i == null ? null : this.layoutDelegate.getItemRect(i);
		}
		return i ?? (r ? this.getLastKey() : this.getFirstKey());
	}
	getKeyPageBelow(e) {
		let t = this.ref.current, n = this.layoutDelegate.getItemRect(e);
		if (!n) return null;
		let r = this.isReversed(e);
		if (t && !ss(t)) return this.getLastKey();
		let i = e;
		if (this.orientation === "horizontal") {
			let e = Math.min(this.layoutDelegate.getContentSize().width, n.x - n.width + this.layoutDelegate.getVisibleRect().width);
			for (; n && n.x < e && i != null;) i = this.getKeyBelow(i), n = i == null ? null : this.layoutDelegate.getItemRect(i);
		} else {
			let e = Math.min(this.layoutDelegate.getContentSize().height, n.y - n.height + this.layoutDelegate.getVisibleRect().height);
			for (; n && n.y < e && i != null;) i = this.getKeyBelow(i), n = i == null ? null : this.layoutDelegate.getItemRect(i);
		}
		return i ?? (r ? this.getFirstKey() : this.getLastKey());
	}
	getKeyForSearch(e, t) {
		if (!this.collator) return null;
		let n = this.collection, r = t || this.getFirstKey();
		for (; r != null;) {
			let t = n.getItem(r);
			if (!t) return null;
			let i = t.textValue.slice(0, e.length);
			if (t.textValue && this.collator.compare(i, e) === 0) return r;
			r = this.getNextKey(r);
		}
		return null;
	}
}, Rl = /* @__PURE__ */ new Map();
function zl(e) {
	let { locale: t } = ji(), n = t + (e ? Object.entries(e).sort((e, t) => e[0] < t[0] ? -1 : 1).join() : "");
	if (Rl.has(n)) return Rl.get(n);
	let r = new Intl.Collator(t, e);
	return Rl.set(n, r), r;
}
//#endregion
//#region node_modules/react-aria/dist/private/selection/useSelectableList.mjs
function Bl(e) {
	let { selectionManager: t, collection: n, disabledKeys: r, ref: i, keyboardDelegate: a, layoutDelegate: o, orientation: s } = e, c = zl({
		usage: "search",
		sensitivity: "base"
	}), l = t.disabledBehavior, u = (0, N.useMemo)(() => a || new Ll({
		collection: n,
		disabledKeys: r,
		disabledBehavior: l,
		ref: i,
		collator: c,
		layoutDelegate: o,
		orientation: s
	}), [
		a,
		o,
		n,
		r,
		i,
		c,
		l,
		s
	]), { collectionProps: d } = Fl({
		...e,
		ref: i,
		selectionManager: t,
		keyboardDelegate: u
	});
	return { listProps: d };
}
//#endregion
//#region node_modules/react-aria/dist/private/listbox/useListBox.mjs
function Vl(e, t, n) {
	let r = ho(e, { labelable: !0 }), i = e.selectionBehavior || "toggle", a = e.orientation || "vertical", o = e.linkBehavior || (i === "replace" ? "action" : "override");
	i === "toggle" && o === "action" && (o = "override");
	let { listProps: s } = Bl({
		...e,
		ref: n,
		selectionManager: t.selectionManager,
		collection: t.collection,
		disabledKeys: t.disabledKeys,
		linkBehavior: o
	}), { focusWithinProps: c } = Lo({
		onFocusWithin: e.onFocus,
		onBlurWithin: e.onBlur,
		onFocusWithinChange: e.onFocusChange
	}), l = _n(e.id);
	Jc.set(t, {
		id: l,
		shouldUseVirtualFocus: e.shouldUseVirtualFocus,
		shouldSelectOnPressUp: e.shouldSelectOnPressUp,
		shouldFocusOnHover: e.shouldFocusOnHover,
		isVirtualized: e.isVirtualized,
		onAction: e.onAction,
		linkBehavior: o,
		UNSTABLE_itemBehavior: e.UNSTABLE_itemBehavior
	});
	let { labelProps: u, fieldProps: d } = qo({
		...e,
		id: l,
		labelElementType: "span"
	});
	return {
		labelProps: u,
		listBoxProps: U(r, c, t.selectionManager.selectionMode === "multiple" ? { "aria-multiselectable": "true" } : {}, {
			role: "listbox",
			"aria-orientation": a,
			...U(d, s)
		})
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/useLongPress.mjs
var Hl = 500;
function Ul(e) {
	let { isDisabled: t, pointerType: n, onLongPressStart: r, onLongPressEnd: i, onLongPress: a, threshold: o = Hl, accessibilityDescription: s } = e, c = (0, N.useRef)(void 0), { addGlobalListener: l, removeAllGlobalListeners: u } = wo(), d = (e) => n ? e.pointerType === n : e.pointerType === "mouse" || e.pointerType === "touch", { pressProps: f } = Ao({
		isDisabled: t,
		onPressStart(e) {
			if (e.continuePropagation(), d(e)) {
				r && r({
					...e,
					type: "longpressstart"
				}), c.current = setTimeout(() => {
					e.target.dispatchEvent(new PointerEvent("pointercancel", { bubbles: !0 })), l(e.target, "click", (e) => e.preventDefault(), { once: !0 }), W(e.target).activeElement !== e.target && $n(e.target), a && a({
						...e,
						type: "longpress"
					}), c.current = void 0;
				}, o), e.pointerType === "touch" && l(e.target, "contextmenu", (e) => e.preventDefault(), { once: !0 });
				let t = Ln(e.target);
				l(t, "pointerup", () => {
					setTimeout(() => {
						u();
					}, 100);
				}, { once: !0 });
			}
		},
		onPressEnd(e) {
			c.current && clearTimeout(c.current), i && d(e) && i({
				...e,
				type: "longpressend"
			});
		}
	});
	return { longPressProps: U(f, hs(a && !t ? s : void 0)) };
}
//#endregion
//#region node_modules/react-aria/dist/private/selection/useSelectableItem.mjs
function Wl(e) {
	let { id: t, selectionManager: n, key: r, ref: i, shouldSelectOnPressUp: a, shouldUseVirtualFocus: o, focus: s, isDisabled: c, onAction: l, allowsDifferentPressOrigin: u, linkBehavior: d = "action" } = e, f = kr();
	t = _n(t);
	let p = (e) => {
		if (e.pointerType === "keyboard" && El(e)) n.toggleSelection(r);
		else {
			if (n.selectionMode === "none") return;
			if (n.isLink(r)) {
				if (d === "selection" && i.current) {
					let t = n.getItemProps(r);
					f.open(i.current, e, t.href, t.routerOptions), n.setSelectedKeys(n.selectedKeys);
					return;
				}
				if (d === "override" || d === "none") return;
			}
			n.selectionMode === "single" ? n.isSelected(r) && !n.disallowEmptySelection ? n.toggleSelection(r) : n.replaceSelection(r) : e && e.shiftKey ? n.extendSelection(r) : n.selectionBehavior === "toggle" || e && (hi(e) || e.pointerType === "touch" || e.pointerType === "virtual") ? n.toggleSelection(r) : n.replaceSelection(r);
		}
	};
	(0, N.useEffect)(() => {
		r === n.focusedKey && n.isFocused && (o ? Yn(i.current) : s ? s() : Kn() !== i.current && i.current && ma(i.current));
	}, [
		i,
		r,
		n.focusedKey,
		n.childFocusStrategy,
		n.isFocused,
		o
	]), c ||= n.isDisabled(r);
	let m = {};
	!o && !c ? m = {
		tabIndex: r === n.focusedKey ? 0 : -1,
		onFocus(e) {
			K(e) === i.current && n.setFocusedKey(r);
		}
	} : c && (m.onMouseDown = (e) => {
		e.preventDefault();
	}), (0, N.useEffect)(() => {
		c && n.focusedKey === r && n.setFocusedKey(null);
	}, [
		n,
		c,
		r
	]);
	let h = n.isLink(r) && d === "override", g = l && e.UNSTABLE_itemBehavior === "action", _ = n.isLink(r) && d !== "selection" && d !== "none", v = !c && n.canSelectItem(r) && !h && !g, y = (l || _) && !c, b = y && (n.selectionBehavior === "replace" ? !v : !v || n.isEmpty), x = y && v && n.selectionBehavior === "replace", S = b || x, C = (0, N.useRef)(null), w = S && v, T = (0, N.useRef)(!1), E = (0, N.useRef)(!1), D = n.getItemProps(r), O = (e) => {
		l && (l(), i.current?.dispatchEvent(new CustomEvent("react-aria-item-action", { bubbles: !0 }))), _ && i.current && f.open(i.current, e, D.href, D.routerOptions);
	}, k = { ref: i };
	a ? (k.onPressStart = (e) => {
		C.current = e.pointerType, T.current = w, e.pointerType === "keyboard" && (!S || Kl(e.key)) && p(e);
	}, u ? (k.onPressUp = b ? void 0 : (e) => {
		e.pointerType === "mouse" && v && p(e);
	}, k.onPress = b ? O : (e) => {
		e.pointerType !== "keyboard" && e.pointerType !== "mouse" && v && p(e);
	}) : k.onPress = (e) => {
		if (b || x && e.pointerType !== "mouse") {
			if (e.pointerType === "keyboard" && !Gl(e.key)) return;
			O(e);
		} else e.pointerType !== "keyboard" && v && p(e);
	}) : (k.onPressStart = (e) => {
		C.current = e.pointerType, T.current = w, E.current = b, v && (e.pointerType === "mouse" && !b || e.pointerType === "keyboard" && (!y || Kl(e.key))) && p(e);
	}, k.onPress = (e) => {
		(e.pointerType === "touch" || e.pointerType === "pen" || e.pointerType === "virtual" || e.pointerType === "keyboard" && S && Gl(e.key) || e.pointerType === "mouse" && E.current) && (S ? O(e) : v && p(e));
	});
	let ee = Al(n.collection);
	if (m["data-collection"] = ee, m["data-key"] = r, k.preventFocusOnPress = o, o && (k = U(k, {
		onPressStart(e) {
			e.pointerType !== "touch" && (n.setFocused(!0), n.setFocusedKey(r));
		},
		onPress(e) {
			e.pointerType === "touch" && (n.setFocused(!0), n.setFocusedKey(r));
		}
	})), D) for (let e of [
		"onPressStart",
		"onPressEnd",
		"onPressChange",
		"onPress",
		"onPressUp",
		"onClick"
	]) D[e] && (k[e] = Qt(k[e], D[e]));
	let { pressProps: A, isPressed: j } = Ao(k), te = x ? (e) => {
		C.current === "mouse" && (e.stopPropagation(), e.preventDefault(), O(e));
	} : void 0, { longPressProps: ne } = Ul({
		isDisabled: !w,
		onLongPress(e) {
			e.pointerType === "touch" && (p(e), n.setSelectionBehavior("toggle"));
		}
	}), re = (e) => {
		C.current === "touch" && T.current && e.preventDefault();
	}, M = d !== "none" && n.isLink(r) ? (e) => {
		Ar.isOpening || e.preventDefault();
	} : void 0, ie = U(m, v || b || o && !c ? A : {}, w ? ne : {}, {
		onDoubleClick: te,
		onDragStartCapture: re,
		onClick: M,
		id: t
	}, o ? { onMouseDown: (e) => e.preventDefault() } : void 0), ae = (e) => {
		let t = e;
		for (; t && t !== i.current;) {
			let e = t.getAttribute("data-collection");
			if (e != null) return e !== ee;
			t = t.parentElement;
		}
		return cr(e);
	}, oe = ie.onPointerDown;
	ie.onPointerDown = (e) => {
		let t = K(e);
		t && t !== i.current && ae(t) ? e.stopPropagation() : oe?.(e);
	};
	let se = ie.onMouseDown;
	return ie.onMouseDown = (e) => {
		let t = K(e);
		t && t !== i.current && ae(t) ? e.stopPropagation() : se?.(e);
	}, {
		itemProps: ie,
		isPressed: j,
		isSelected: n.isSelected(r),
		isFocused: n.isFocused && n.focusedKey === r,
		isDisabled: c,
		allowsSelection: v,
		hasAction: S
	};
}
function Gl(e) {
	return e === "Enter";
}
function Kl(e) {
	return e === " ";
}
//#endregion
//#region node_modules/react-stately/dist/private/collections/getChildNodes.mjs
function ql(e, t) {
	return typeof t.getChildren == "function" ? t.getChildren(e.key) : e.childNodes;
}
function Jl(e) {
	return Yl(e, 0);
}
function Yl(e, t) {
	if (t < 0) return;
	let n = 0;
	for (let r of e) {
		if (n === t) return r;
		n++;
	}
}
function Xl(e, t, n) {
	if (t.parentKey === n.parentKey) return t.index - n.index;
	let r = [...Zl(e, t), t], i = [...Zl(e, n), n], a = r.slice(0, i.length).findIndex((e, t) => e !== i[t]);
	return a === -1 ? r.findIndex((e) => e === n) >= 0 ? 1 : (i.findIndex((e) => e === t), -1) : (t = r[a], n = i[a], t.index - n.index);
}
function Zl(e, t) {
	let n = [], r = t;
	for (; r?.parentKey != null;) r = e.getItem(r.parentKey), r && n.unshift(r);
	return n;
}
//#endregion
//#region node_modules/react-stately/dist/private/collections/getItemCount.mjs
var Ql = /* @__PURE__ */ new WeakMap();
function $l(e) {
	let t = Ql.get(e);
	if (t != null) return t;
	let n = 0, r = (t) => {
		for (let i of t) i.type === "section" ? r(ql(i, e)) : i.type === "item" && n++;
	};
	return r(e), Ql.set(e, n), n;
}
//#endregion
//#region node_modules/react-aria/dist/private/listbox/useOption.mjs
function eu(e, t, n) {
	let { key: r } = e, i = Jc.get(t), a = e.isDisabled ?? t.selectionManager.isDisabled(r), o = e.isSelected ?? t.selectionManager.isSelected(r), s = e.shouldSelectOnPressUp ?? i?.shouldSelectOnPressUp, c = e.shouldFocusOnHover ?? i?.shouldFocusOnHover, l = e.shouldUseVirtualFocus ?? i?.shouldUseVirtualFocus, u = e.isVirtualized ?? i?.isVirtualized, d = yn(), f = yn(), p = {
		role: "option",
		"aria-disabled": a || void 0,
		"aria-selected": t.selectionManager.selectionMode === "none" ? void 0 : o,
		"aria-label": e["aria-label"],
		"aria-labelledby": d,
		"aria-describedby": f
	}, m = t.collection.getItem(r);
	if (u) {
		let e = Number(m?.index);
		p["aria-posinset"] = Number.isNaN(e) ? void 0 : e + 1, p["aria-setsize"] = $l(t.collection);
	}
	let h = i?.onAction ? () => i?.onAction?.(r) : void 0, g = Xc(t, r), { itemProps: _, isPressed: v, isFocused: y, hasAction: b, allowsSelection: x } = Wl({
		selectionManager: t.selectionManager,
		key: r,
		ref: n,
		shouldSelectOnPressUp: s,
		allowsDifferentPressOrigin: s && c,
		isVirtualized: u,
		shouldUseVirtualFocus: l,
		isDisabled: a,
		onAction: h || m?.props?.onAction ? Qt(m?.props?.onAction, h) : void 0,
		linkBehavior: i?.linkBehavior,
		UNSTABLE_itemBehavior: i?.UNSTABLE_itemBehavior,
		id: g
	}), { hoverProps: S } = Wo({
		isDisabled: a || !c,
		onHoverStart() {
			Zr() || (t.selectionManager.setFocused(!0), t.selectionManager.setFocusedKey(r));
		}
	}), C = ho(m?.props);
	delete C.id;
	let w = Nr(m?.props);
	return {
		optionProps: {
			...p,
			...U(C, _, S, w),
			id: g
		},
		labelProps: { id: d },
		descriptionProps: { id: f },
		isFocused: y,
		isFocusVisible: y && t.selectionManager.isFocused && Zr(),
		isSelected: o,
		isDisabled: a,
		isPressed: v,
		allowsSelection: x,
		hasAction: b
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/listbox/useListBoxSection.mjs
function tu(e) {
	let { heading: t, "aria-label": n } = e, r = _n();
	return {
		itemProps: { role: "presentation" },
		headingProps: t ? {
			id: r,
			role: "presentation",
			onMouseDown: (e) => {
				e.preventDefault();
			}
		} : {},
		groupProps: {
			role: "group",
			"aria-label": n,
			"aria-labelledby": t ? r : void 0
		}
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/inertValue.mjs
function nu(e) {
	let t = N.version.split(".");
	return parseInt(t[0], 10) >= 19 ? e : e ? "true" : void 0;
}
//#endregion
//#region node_modules/react-stately/dist/private/list/ListCollection.mjs
var ru = class {
	constructor(e) {
		this.keyMap = /* @__PURE__ */ new Map(), this.firstKey = null, this.lastKey = null, this.iterable = e;
		let t = (e) => {
			if (this.keyMap.set(e.key, e), e.childNodes && e.type === "section") for (let n of e.childNodes) t(n);
		};
		for (let n of e) t(n);
		let n = null, r = 0, i = 0;
		for (let [e, t] of this.keyMap) n ? (n.nextKey = e, t.prevKey = n.key) : (this.firstKey = e, t.prevKey = void 0), t.type === "item" && (t.index = r++), (t.type === "section" || t.type === "item") && i++, n = t, n.nextKey = void 0;
		this._size = i, this.lastKey = n?.key ?? null;
	}
	*[Symbol.iterator]() {
		yield* this.iterable;
	}
	get size() {
		return this._size;
	}
	getKeys() {
		return this.keyMap.keys();
	}
	getKeyBefore(e) {
		let t = this.keyMap.get(e);
		return t ? t.prevKey ?? null : null;
	}
	getKeyAfter(e) {
		let t = this.keyMap.get(e);
		return t ? t.nextKey ?? null : null;
	}
	getFirstKey() {
		return this.firstKey;
	}
	getLastKey() {
		return this.lastKey;
	}
	getItem(e) {
		return this.keyMap.get(e) ?? null;
	}
	at(e) {
		let t = [...this.getKeys()];
		return this.getItem(t[e]);
	}
	getChildren(e) {
		return this.keyMap.get(e)?.childNodes || [];
	}
}, iu = class e extends Set {
	constructor(t, n, r) {
		super(t), t instanceof e ? (this.anchorKey = n ?? t.anchorKey, this.currentKey = r ?? t.currentKey) : (this.anchorKey = n ?? null, this.currentKey = r ?? null);
	}
};
//#endregion
//#region node_modules/react-stately/dist/private/selection/useMultipleSelectionState.mjs
function au(e, t) {
	if (e.size !== t.size) return !1;
	for (let n of e) if (!t.has(n)) return !1;
	return !0;
}
function ou(e) {
	let { selectionMode: t = "none", disallowEmptySelection: n = !1, allowDuplicateSelectionEvents: r, selectionBehavior: i = "toggle", disabledBehavior: a = "all" } = e, o = (0, N.useRef)(!1), [, s] = (0, N.useState)(!1), c = (0, N.useRef)(null), l = (0, N.useRef)(null), [, u] = (0, N.useState)(null), [d, f] = qi((0, N.useMemo)(() => su(e.selectedKeys), [e.selectedKeys]), (0, N.useMemo)(() => su(e.defaultSelectedKeys, new iu()), [e.defaultSelectedKeys]), e.onSelectionChange), p = (0, N.useMemo)(() => e.disabledKeys ? new Set(e.disabledKeys) : /* @__PURE__ */ new Set(), [e.disabledKeys]), [m, h] = (0, N.useState)(i);
	i === "replace" && m === "toggle" && typeof d == "object" && d.size === 0 && h("replace");
	let g = (0, N.useRef)(i);
	return (0, N.useEffect)(() => {
		i !== g.current && (h(i), g.current = i);
	}, [i]), {
		selectionMode: t,
		disallowEmptySelection: n,
		selectionBehavior: m,
		setSelectionBehavior: h,
		get isFocused() {
			return o.current;
		},
		setFocused(e) {
			o.current = e, s(e);
		},
		get focusedKey() {
			return c.current;
		},
		get childFocusStrategy() {
			return l.current;
		},
		setFocusedKey(e, t = "first") {
			c.current = e, l.current = t, u(e);
		},
		selectedKeys: d,
		setSelectedKeys(e) {
			(r || !au(e, d)) && f(e);
		},
		disabledKeys: p,
		disabledBehavior: a
	};
}
function su(e, t) {
	return e ? e === "all" ? "all" : new iu(e) : t;
}
//#endregion
//#region node_modules/react-stately/dist/private/selection/SelectionManager.mjs
var cu = class e {
	constructor(e, t, n) {
		this.collection = e, this.state = t, this.allowsCellSelection = n?.allowsCellSelection ?? !1, this._isSelectAll = null, this.layoutDelegate = n?.layoutDelegate || null, this.fullCollection = n?.fullCollection || null;
	}
	get selectionMode() {
		return this.state.selectionMode;
	}
	get disallowEmptySelection() {
		return this.state.disallowEmptySelection;
	}
	get selectionBehavior() {
		return this.state.selectionBehavior;
	}
	setSelectionBehavior(e) {
		this.state.setSelectionBehavior(e);
	}
	get isFocused() {
		return this.state.isFocused;
	}
	setFocused(e) {
		this.state.setFocused(e);
	}
	get focusedKey() {
		return this.state.focusedKey;
	}
	get childFocusStrategy() {
		return this.state.childFocusStrategy;
	}
	setFocusedKey(e, t) {
		(e == null || this.collection.getItem(e)) && this.state.setFocusedKey(e, t);
	}
	get selectedKeys() {
		return this.state.selectedKeys === "all" ? new Set(this.getSelectAllKeys()) : this.state.selectedKeys;
	}
	get rawSelection() {
		return this.state.selectedKeys;
	}
	isSelected(e) {
		if (this.state.selectionMode === "none") return !1;
		let t = this.getKey(e);
		return t == null ? !1 : this.state.selectedKeys === "all" ? this.canSelectItem(t) : this.state.selectedKeys.has(t);
	}
	get isEmpty() {
		return this.state.selectedKeys !== "all" && this.state.selectedKeys.size === 0;
	}
	get isSelectAll() {
		if (this.isEmpty) return !1;
		if (this.state.selectedKeys === "all") return !0;
		if (this._isSelectAll != null) return this._isSelectAll;
		let e = this.getSelectAllKeys(), t = this.state.selectedKeys;
		return this._isSelectAll = e.every((e) => t.has(e)), this._isSelectAll;
	}
	get firstSelectedKey() {
		let e = null;
		for (let t of this.state.selectedKeys) {
			let n = this.collection.getItem(t);
			(!e || n && Xl(this.collection, n, e) < 0) && (e = n);
		}
		return e?.key ?? null;
	}
	get lastSelectedKey() {
		let e = null;
		for (let t of this.state.selectedKeys) {
			let n = this.collection.getItem(t);
			(!e || n && Xl(this.collection, n, e) > 0) && (e = n);
		}
		return e?.key ?? null;
	}
	get disabledKeys() {
		return this.state.disabledKeys;
	}
	get disabledBehavior() {
		return this.state.disabledBehavior;
	}
	extendSelection(e) {
		if (this.selectionMode === "none") return;
		if (this.selectionMode === "single") {
			this.replaceSelection(e);
			return;
		}
		let t = this.getKey(e);
		if (t == null) return;
		let n;
		if (this.state.selectedKeys === "all") n = new iu([t], t, t);
		else {
			let e = this.state.selectedKeys, r = e.anchorKey ?? t;
			n = new iu(e, r, t);
			for (let i of this.getKeyRange(r, e.currentKey ?? t)) n.delete(i);
			for (let e of this.getKeyRange(t, r)) this.canSelectItem(e) && n.add(e);
		}
		this.state.setSelectedKeys(n);
	}
	getKeyRange(e, t) {
		let n = this.collection.getItem(e), r = this.collection.getItem(t);
		return n && r ? Xl(this.collection, n, r) <= 0 ? this.getKeyRangeInternal(e, t) : this.getKeyRangeInternal(t, e) : [];
	}
	getKeyRangeInternal(e, t) {
		if (this.layoutDelegate?.getKeyRange) return this.layoutDelegate.getKeyRange(e, t);
		let n = [], r = e;
		for (; r != null;) {
			let e = this.collection.getItem(r);
			if (e && (e.type === "item" || e.type === "cell" && this.allowsCellSelection) && n.push(r), r === t) return n;
			r = this.collection.getKeyAfter(r);
		}
		return [];
	}
	getKey(e) {
		let t = this.collection.getItem(e);
		if (!t || t.type === "cell" && this.allowsCellSelection) return e;
		for (; t && t.type !== "item" && t.parentKey != null;) t = this.collection.getItem(t.parentKey);
		return !t || t.type !== "item" ? null : t.key;
	}
	toggleSelection(e) {
		if (this.selectionMode === "none") return;
		if (this.selectionMode === "single" && !this.isSelected(e)) {
			this.replaceSelection(e);
			return;
		}
		let t = this.getKey(e);
		if (t == null) return;
		let n = new iu(this.state.selectedKeys === "all" ? this.getSelectAllKeys() : this.state.selectedKeys);
		n.has(t) ? n.delete(t) : this.canSelectItem(t) && (n.add(t), n.anchorKey = t, n.currentKey = t), !(this.disallowEmptySelection && n.size === 0) && this.state.setSelectedKeys(n);
	}
	replaceSelection(e) {
		if (this.selectionMode === "none") return;
		let t = this.getKey(e);
		if (t == null) return;
		let n = this.canSelectItem(t) ? new iu([t], t, t) : new iu();
		this.state.setSelectedKeys(n);
	}
	setSelectedKeys(e) {
		if (this.selectionMode === "none") return;
		let t = new iu();
		for (let n of e) {
			let e = this.getKey(n);
			if (e != null && (t.add(e), this.selectionMode === "single")) break;
		}
		this.state.setSelectedKeys(t);
	}
	getSelectAllKeys() {
		let e = this.fullCollection ?? this.collection, t = [], n = (r) => {
			for (; r != null;) {
				if (this.canSelectItemIn(r, e)) {
					let i = e.getItem(r);
					i?.type === "item" && t.push(r), i?.hasChildNodes && (this.allowsCellSelection || i.type !== "item") && n(Jl(ql(i, e))?.key ?? null);
				}
				r = e.getKeyAfter(r);
			}
		};
		return n(e.getFirstKey()), t;
	}
	selectAll() {
		!this.isSelectAll && this.selectionMode === "multiple" && this.state.setSelectedKeys("all");
	}
	clearSelection() {
		!this.disallowEmptySelection && (this.state.selectedKeys === "all" || this.state.selectedKeys.size > 0) && this.state.setSelectedKeys(new iu());
	}
	toggleSelectAll() {
		this.isSelectAll ? this.clearSelection() : this.selectAll();
	}
	select(e, t) {
		this.selectionMode !== "none" && (this.selectionMode === "single" ? this.isSelected(e) && !this.disallowEmptySelection ? this.toggleSelection(e) : this.replaceSelection(e) : this.selectionBehavior === "toggle" || t && (t.pointerType === "touch" || t.pointerType === "virtual") ? this.toggleSelection(e) : this.replaceSelection(e));
	}
	isSelectionEqual(e) {
		if (e === this.state.selectedKeys) return !0;
		let t = this.selectedKeys;
		if (e.size !== t.size) return !1;
		for (let n of e) if (!t.has(n)) return !1;
		for (let n of t) if (!e.has(n)) return !1;
		return !0;
	}
	canSelectItem(e) {
		return this.canSelectItemIn(e, this.collection);
	}
	canSelectItemIn(e, t) {
		if (this.state.selectionMode === "none" || this.state.disabledKeys.has(e)) return !1;
		let n = t.getItem(e);
		return !(!n || n?.props?.isDisabled || n.type === "cell" && !this.allowsCellSelection);
	}
	isDisabled(e) {
		let t = this.collection.getItem(e);
		return this.state.disabledBehavior === "all" && (this.state.disabledKeys.has(e) || !!t?.props?.isDisabled) && t?.props?.disabledBehavior !== "selection";
	}
	isLink(e) {
		return !!this.collection.getItem(e)?.props?.href;
	}
	getItemProps(e) {
		return this.collection.getItem(e)?.props;
	}
	withCollection(t) {
		return new e(t, this.state, {
			allowsCellSelection: this.allowsCellSelection,
			layoutDelegate: this.layoutDelegate || void 0,
			fullCollection: this.fullCollection ?? this.collection
		});
	}
}, lu = class {
	build(e, t) {
		return this.context = t, uu(() => this.iterateCollection(e));
	}
	*iterateCollection(e) {
		let { children: t, items: n } = e;
		if (N.isValidElement(t) && t.type === N.Fragment) yield* this.iterateCollection({
			children: t.props.children,
			items: n
		});
		else if (typeof t == "function") {
			if (!n) throw Error("props.children was a function but props.items is missing");
			let e = 0;
			for (let r of n) yield* this.getFullNode({
				value: r,
				index: e
			}, { renderer: t }), e++;
		} else {
			let e = [];
			N.Children.forEach(t, (t) => {
				t && e.push(t);
			});
			let n = 0;
			for (let t of e) {
				let e = this.getFullNode({
					element: t,
					index: n
				}, {});
				for (let t of e) n++, yield t;
			}
		}
	}
	getKey(e, t, n, r) {
		if (e.key != null) return e.key;
		if (t.type === "cell" && t.key != null) return `${r}${t.key}`;
		let i = t.value;
		if (i != null) {
			let e = i.key ?? i.id;
			if (e == null) throw Error("No key found for item");
			return e;
		}
		return r ? `${r}.${t.index}` : `$.${t.index}`;
	}
	getChildState(e, t) {
		return { renderer: t.renderer || e.renderer };
	}
	*getFullNode(e, t, n, r) {
		if (N.isValidElement(e.element) && e.element.type === N.Fragment) {
			let i = [];
			N.Children.forEach(e.element.props.children, (e) => {
				i.push(e);
			});
			let a = e.index ?? 0;
			for (let e of i) yield* this.getFullNode({
				element: e,
				index: a++
			}, t, n, r);
			return;
		}
		let i = e.element;
		if (!i && e.value && t && t.renderer) {
			let n = this.cache.get(e.value);
			if (n && (!n.shouldInvalidate || !n.shouldInvalidate(this.context))) {
				n.index = e.index, n.parentKey = r ? r.key : null, yield n;
				return;
			}
			i = t.renderer(e.value);
		}
		if (N.isValidElement(i)) {
			let a = i.type;
			if (typeof a != "function" && typeof a.getCollectionNode != "function") {
				let e = i.type;
				throw Error(`Unknown element <${e}> in collection.`);
			}
			let o = a.getCollectionNode(i.props, this.context), s = e.index ?? 0, c = o.next();
			for (; !c.done && c.value;) {
				let a = c.value;
				e.index = s;
				let l = a.key ?? null;
				l ??= a.element ? null : this.getKey(i, e, t, n);
				let u = [...this.getFullNode({
					...a,
					key: l,
					index: s,
					wrapper: du(e.wrapper, a.wrapper)
				}, this.getChildState(t, a), n ? `${n}${i.key}` : i.key, r)];
				for (let t of u) {
					if (t.value = a.value ?? e.value ?? null, t.value && this.cache.set(t.value, t), e.type && t.type !== e.type) throw Error(`Unsupported type <${fu(t.type)}> in <${fu(r?.type ?? "unknown parent type")}>. Only <${fu(e.type)}> is supported.`);
					s++, yield t;
				}
				c = o.next(u);
			}
			return;
		}
		if (e.key == null || e.type == null) return;
		let a = this, o = {
			type: e.type,
			props: e.props,
			key: e.key,
			parentKey: r ? r.key : null,
			value: e.value ?? null,
			level: (r?.level ?? 0) + +(r?.type === "item"),
			index: e.index,
			rendered: e.rendered,
			textValue: e.textValue ?? "",
			"aria-label": e["aria-label"],
			wrapper: e.wrapper,
			shouldInvalidate: e.shouldInvalidate,
			hasChildNodes: e.hasChildNodes || !1,
			childNodes: uu(function* () {
				if (!e.hasChildNodes || !e.childNodes) return;
				let n = 0;
				for (let r of e.childNodes()) {
					r.key != null && (r.key = `${o.key}${r.key}`);
					let e = a.getFullNode({
						...r,
						index: n
					}, a.getChildState(t, r), o.key, o);
					for (let t of e) n++, yield t;
				}
			})
		};
		yield o;
	}
	constructor() {
		this.cache = /* @__PURE__ */ new WeakMap();
	}
};
function uu(e) {
	let t = [], n = null;
	return { *[Symbol.iterator]() {
		for (let e of t) yield e;
		n ||= e();
		for (let e of n) t.push(e), yield e;
	} };
}
function du(e, t) {
	if (e && t) return (n) => e(t(n));
	if (e) return e;
	if (t) return t;
}
function fu(e) {
	return e[0].toUpperCase() + e.slice(1);
}
//#endregion
//#region node_modules/react-stately/dist/private/collections/useCollection.mjs
function pu(e, t, n) {
	let r = (0, N.useMemo)(() => new lu(), []), { children: i, items: a, collection: o } = e;
	return (0, N.useMemo)(() => o || t(r.build({
		children: i,
		items: a
	}, n)), [
		r,
		i,
		a,
		o,
		n,
		t
	]);
}
//#endregion
//#region node_modules/react-stately/dist/private/list/useListState.mjs
function mu(e) {
	let { filter: t, layoutDelegate: n } = e, r = ou(e), i = (0, N.useMemo)(() => e.disabledKeys ? new Set(e.disabledKeys) : /* @__PURE__ */ new Set(), [e.disabledKeys]), a = pu(e, (0, N.useCallback)((e) => t ? new ru(t(e)) : new ru(e), [t]), (0, N.useMemo)(() => ({ suppressTextValueWarning: e.suppressTextValueWarning }), [e.suppressTextValueWarning])), o = (0, N.useMemo)(() => new cu(a, r, { layoutDelegate: n }), [
		a,
		r,
		n
	]);
	return gu(a, o), {
		collection: a,
		disabledKeys: i,
		selectionManager: o
	};
}
function hu(e, t) {
	let n = (0, N.useMemo)(() => t ? e.collection.filter(t) : e.collection, [e.collection, t]), r = e.selectionManager.withCollection(n);
	return gu(n, r), {
		collection: n,
		selectionManager: r,
		disabledKeys: e.disabledKeys
	};
}
function gu(e, t) {
	let n = (0, N.useRef)(null);
	(0, N.useEffect)(() => {
		if (t.focusedKey != null && !e.getItem(t.focusedKey) && n.current) {
			let r = n.current.getKeyAfter(t.focusedKey), i = null;
			for (; r != null;) {
				let a = e.getItem(r);
				if (a && a.type === "item" && !t.isDisabled(r)) {
					i = r;
					break;
				}
				r = n.current.getKeyAfter(r);
			}
			if (i == null) for (r = n.current.getKeyBefore(t.focusedKey); r != null;) {
				let a = e.getItem(r);
				if (a && a.type === "item" && !t.isDisabled(r)) {
					i = r;
					break;
				}
				r = n.current.getKeyBefore(r);
			}
			t.setFocusedKey(i);
		}
		n.current = e;
	}, [e, t]);
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useLoadMoreSentinel.mjs
function _u(e, t) {
	let { collection: n, onLoadMore: r, scrollOffset: i = 1, direction: a = "end" } = e, o = (0, N.useRef)(null), s = vi((e) => {
		for (let t of e) t.isIntersecting && r && r();
	});
	H(() => {
		if (t.current) {
			let e = 100 * i, n = a === "start" ? `${e}% 0px 0px 0px` : `0px ${e}% ${e}% ${e}%`;
			o.current = new IntersectionObserver(s, {
				root: cs(t?.current),
				rootMargin: n
			}), o.current.observe(t.current);
		}
		return () => {
			o.current && o.current.disconnect();
		};
	}, [
		n,
		t,
		i,
		a
	]);
}
//#endregion
//#region node_modules/react-aria-components/dist/private/ListBox.mjs
var vu = /*#__PURE__*/ (0, N.createContext)(null), yu = /*#__PURE__*/ (0, N.createContext)(null), bu = /*#__PURE__*/ (0, N.forwardRef)(function(e, t) {
	[e, t] = kn(e, t, vu);
	let n = (0, N.useContext)(yu);
	return n ? /*#__PURE__*/ N.createElement(Su, {
		state: n,
		props: e,
		listBoxRef: t
	}) : /*#__PURE__*/ N.createElement(Wa, { content: /*#__PURE__*/ N.createElement(to, e) }, (n) => /*#__PURE__*/ N.createElement(xu, {
		props: e,
		listBoxRef: t,
		collection: n
	}));
});
function xu({ props: e, listBoxRef: t, collection: n }) {
	e = {
		...e,
		collection: n,
		children: null,
		items: null
	};
	let { layoutDelegate: r } = (0, N.useContext)(so), i = mu({
		...e,
		layoutDelegate: r
	});
	return /*#__PURE__*/ N.createElement(Su, {
		state: i,
		props: e,
		listBoxRef: t
	});
}
function Su({ state: e, props: t, listBoxRef: n }) {
	[t, n] = kn(t, n, Ji);
	let { dragAndDropHooks: r, layout: i = "stack", orientation: a = "vertical", filter: o } = t, s = hu(e, o), { collection: c, selectionManager: l } = s, u = !!r?.useDraggableCollectionState, d = !!r?.useDroppableCollectionState, { direction: f } = ji(), { disabledBehavior: p, disabledKeys: m } = l, h = zl({
		usage: "search",
		sensitivity: "base"
	}), { isVirtualized: g, layoutDelegate: _, dropTargetDelegate: v, CollectionRoot: y } = (0, N.useContext)(so), b = (0, N.useMemo)(() => t.keyboardDelegate || new Ll({
		collection: c,
		collator: h,
		ref: n,
		disabledKeys: m,
		disabledBehavior: p,
		layout: i,
		orientation: a,
		direction: f,
		layoutDelegate: _
	}), [
		c,
		h,
		n,
		p,
		m,
		a,
		f,
		t.keyboardDelegate,
		i,
		_
	]), { listBoxProps: x } = Vl({
		...t,
		shouldSelectOnPressUp: u || t.shouldSelectOnPressUp,
		keyboardDelegate: b,
		isVirtualized: g
	}, s, n);
	(0, N.useRef)(u), (0, N.useRef)(d), (0, N.useEffect)(() => {}, [u, d]);
	let S, C, w, T = !1, E = null, D = (0, N.useRef)(null);
	if (u && r) {
		S = r.useDraggableCollectionState({
			collection: c,
			selectionManager: l,
			preview: r.renderDragPreview ? D : void 0
		}), r.useDraggableCollection({}, S, n);
		let e = r.DragPreview;
		E = r.renderDragPreview ? /*#__PURE__*/ N.createElement(e, { ref: D }, r.renderDragPreview) : null;
	}
	if (d && r) {
		C = r.useDroppableCollectionState({
			collection: c,
			selectionManager: l
		});
		let e = r.dropTargetDelegate || v || new r.ListDropTargetDelegate(c, n, {
			orientation: a,
			layout: i,
			direction: f
		});
		w = r.useDroppableCollection({
			keyboardDelegate: b,
			dropTargetDelegate: e
		}, C, n), T = C.isDropTarget({ type: "root" });
	}
	let { focusProps: O, isFocused: k, isFocusVisible: ee } = Ro(), A = s.collection.size === 0, j = {
		isDropTarget: T,
		isEmpty: A,
		isFocused: k,
		isFocusVisible: ee,
		layout: t.layout || "stack",
		orientation: a,
		state: s
	}, te = Dn({
		...t,
		children: void 0,
		defaultClassName: "react-aria-ListBox",
		values: j
	}), ne = null;
	A && t.renderEmptyState && (ne = /*#__PURE__*/ N.createElement("div", {
		role: "option",
		style: { display: "contents" }
	}, t.renderEmptyState(j)));
	let re = ho(t, { global: !0 });
	return /*#__PURE__*/ N.createElement(nl, null, /*#__PURE__*/ N.createElement(Pn.div, {
		...U(re, te, x, O, w?.collectionProps),
		ref: n,
		slot: t.slot || void 0,
		onScroll: t.onScroll,
		"data-drop-target": T || void 0,
		"data-empty": A || void 0,
		"data-focused": k || void 0,
		"data-focus-visible": ee || void 0,
		"data-layout": t.layout || "stack",
		"data-orientation": a
	}, /*#__PURE__*/ N.createElement(En, { values: [
		[vu, t],
		[yu, s],
		[Rc, {
			dragAndDropHooks: r,
			dragState: S,
			dropState: C
		}],
		[qc, { elementType: "div" }],
		[zc, { render: Tu }],
		[ro, {
			name: "ListBoxSection",
			render: Cu
		}]
	] }, /*#__PURE__*/ N.createElement(Gc, null, /*#__PURE__*/ N.createElement(y, {
		collection: c,
		scrollRef: n,
		persistedKeys: Hc(l, r, C),
		renderDropIndicator: Vc(r, C)
	}))), ne, E));
}
function Cu(e, t, n, r = "react-aria-ListBoxSection") {
	let i = (0, N.useContext)(yu), { dragAndDropHooks: a, dropState: o } = (0, N.useContext)(Rc), { CollectionBranch: s } = (0, N.useContext)(so), [c, l] = An(), { headingProps: u, groupProps: d } = tu({
		heading: l,
		"aria-label": e["aria-label"] ?? void 0
	}), f = Dn({
		...e,
		id: void 0,
		children: void 0,
		defaultClassName: r,
		values: void 0
	}), p = ho(e, { global: !0 });
	return delete p.id, /*#__PURE__*/ N.createElement(Pn.section, {
		...U(p, f, d),
		ref: t
	}, /*#__PURE__*/ N.createElement(Uc.Provider, { value: {
		...u,
		ref: c
	} }, /*#__PURE__*/ N.createElement(s, {
		collection: i.collection,
		parent: n,
		renderDropIndicator: Vc(a, o)
	})));
}
var wu = /*#__PURE__*/ Qa(Qi, function(e, t, n) {
	let r = wn(t), i = (0, N.useContext)(yu), { dragAndDropHooks: a, dragState: o, dropState: s } = (0, N.useContext)(Rc), c = o && !(o.isDisabled || o.selectionManager.isDisabled(n.key)), { optionProps: l, labelProps: u, descriptionProps: d, ...f } = eu({
		key: n.key,
		"aria-label": e?.["aria-label"]
	}, i, r), { hoverProps: p, isHovered: m } = Wo({
		isDisabled: !f.allowsSelection && !f.hasAction && !c,
		onHoverStart: n.props.onHoverStart,
		onHoverChange: n.props.onHoverChange,
		onHoverEnd: n.props.onHoverEnd
	}), { keyboardProps: h } = ka(e), { focusProps: g } = ha(e), _ = null;
	o && a && (_ = a.useDraggableItem({
		key: n.key,
		hasAction: f.hasAction
	}, o));
	let v = null;
	s && a && (v = a.useDroppableItem({ target: {
		type: "item",
		key: n.key,
		dropPosition: "on"
	} }, s, r));
	let y = o && o.isDragging(n.key), b = Dn({
		...e,
		id: void 0,
		children: e.children,
		defaultClassName: "react-aria-ListBoxItem",
		values: {
			...f,
			isHovered: m,
			selectionMode: i.selectionManager.selectionMode,
			selectionBehavior: i.selectionManager.selectionBehavior,
			allowsDragging: !!o,
			isDragging: y,
			isDropTarget: v?.isDropTarget
		}
	});
	(0, N.useEffect)(() => {
		n.textValue;
	}, [n.textValue]);
	let x = e.href ? Pn.a : Pn.div, S = ho(e, { global: !0 });
	return delete S.id, delete S.onClick, e.href && l.tabIndex == null && (l.tabIndex = -1), /*#__PURE__*/ N.createElement(x, {
		...U(S, b, l, p, h, g, _?.dragProps, v?.dropProps),
		ref: r,
		"data-allows-dragging": !!o || void 0,
		"data-selected": f.isSelected || void 0,
		"data-disabled": f.isDisabled || void 0,
		"data-hovered": m || void 0,
		"data-focused": f.isFocused || void 0,
		"data-focus-visible": f.isFocusVisible || void 0,
		"data-pressed": f.isPressed || void 0,
		"data-dragging": y || void 0,
		"data-drop-target": v?.isDropTarget || void 0,
		"data-selection-mode": i.selectionManager.selectionMode === "none" ? void 0 : i.selectionManager.selectionMode
	}, /*#__PURE__*/ N.createElement(En, { values: [[as, { slots: {
		[Tn]: u,
		label: u,
		description: d
	} }], [Kc, { isSelected: f.isSelected }]] }, b.children));
});
function Tu(e, t) {
	t = wn(t);
	let { dragAndDropHooks: n, dropState: r } = (0, N.useContext)(Rc), { dropIndicatorProps: i, isHidden: a, isDropTarget: o } = n.useDropIndicator(e, r, t);
	return a ? null : /*#__PURE__*/ N.createElement(Du, {
		...e,
		dropIndicatorProps: i,
		isDropTarget: o,
		ref: t
	});
}
function Eu(e, t) {
	let { dropIndicatorProps: n, isDropTarget: r, ...i } = e, a = Dn({
		...i,
		defaultClassName: "react-aria-DropIndicator",
		values: { isDropTarget: r }
	});
	return /*#__PURE__*/ N.createElement(N.Fragment, null, /*#__PURE__*/ N.createElement(Pn.div, {
		...n,
		...a,
		role: "option",
		ref: t,
		"data-drop-target": r || void 0
	}));
}
var Du = /*#__PURE__*/ (0, N.forwardRef)(Eu);
Qa(Zi, function(e, t, n) {
	let r = (0, N.useContext)(yu), { isLoading: i, onLoadMore: a, scrollOffset: o, ...s } = e, c = (0, N.useRef)(null);
	_u((0, N.useMemo)(() => ({
		onLoadMore: a,
		collection: r?.collection,
		sentinelRef: c,
		scrollOffset: o
	}), [
		a,
		o,
		r?.collection
	]), c);
	let l = Dn({
		...s,
		id: void 0,
		children: n.rendered,
		defaultClassName: "react-aria-ListBoxLoadingIndicator",
		values: void 0
	});
	return /*#__PURE__*/ N.createElement(N.Fragment, null, /*#__PURE__*/ N.createElement("div", {
		style: {
			position: "relative",
			width: 0,
			height: 0
		},
		inert: nu(!0)
	}, /*#__PURE__*/ N.createElement("div", {
		"data-testid": "loadMoreSentinel",
		ref: c,
		style: {
			position: "absolute",
			height: 1,
			width: 1
		}
	})), i && l.children && /*#__PURE__*/ N.createElement(N.Fragment, null, /*#__PURE__*/ N.createElement(Pn.div, {
		...U(ho(e, { global: !0 }), { tabIndex: -1 }),
		...l,
		role: "option",
		ref: t
	}, l.children)));
});
//#endregion
//#region node_modules/react-aria-components/dist/private/OverlayArrow.mjs
var Ou = /*#__PURE__*/ (0, N.createContext)({ placement: "bottom" }), ku = typeof HTMLElement < "u" && "inert" in HTMLElement.prototype;
function Au(e) {
	return e.dataset.liveAnnouncer === "true" || e.dataset.reactAriaTopLayer !== void 0;
}
var ju = /* @__PURE__ */ new WeakMap(), Mu = [];
function Nu(e, t) {
	let n = Ln(e?.[0]), r = t instanceof n.Element ? { root: t } : t, i = r?.root ?? document.body, a = r?.shouldUseInert && ku, o = new Set(e), s = /* @__PURE__ */ new Set(), c = (e) => a && e instanceof n.HTMLElement ? e.inert : e.getAttribute("aria-hidden") === "true", l = (e, t) => {
		a && e instanceof n.HTMLElement ? e.inert = t : t ? e.setAttribute("aria-hidden", "true") : (e.removeAttribute("aria-hidden"), e instanceof n.HTMLElement && (e.inert = !1));
	}, u = /* @__PURE__ */ new Set();
	if (Gn()) {
		let t = i.getRootNode();
		for (let n of e) {
			let e = n.getRootNode();
			for (; Vn(e) && e !== t;) u.add(e), e = e.host.getRootNode();
		}
	}
	let d = (e) => {
		for (let t of e.querySelectorAll("[data-live-announcer], [data-react-aria-top-layer]")) o.add(t);
		let t = (e) => {
			if (s.has(e) || o.has(e) || e.parentElement && s.has(e.parentElement) && e.parentElement.getAttribute("role") !== "row") return NodeFilter.FILTER_REJECT;
			for (let t of o) if (G(e, t)) return NodeFilter.FILTER_SKIP;
			return NodeFilter.FILTER_ACCEPT;
		}, n = Qc(W(e), e, NodeFilter.SHOW_ELEMENT, { acceptNode: t }), r = t(e);
		if (r === NodeFilter.FILTER_ACCEPT && f(e), r !== NodeFilter.FILTER_REJECT) {
			let e = n.nextNode();
			for (; e != null;) f(e), e = n.nextNode();
		}
	}, f = (e) => {
		let t = ju.get(e) ?? 0;
		c(e) && t === 0 || (t === 0 && l(e, !0), s.add(e), ju.set(e, t + 1));
	};
	Mu.length && Mu[Mu.length - 1].disconnect(), d(i);
	let p = new MutationObserver((e) => {
		for (let t of e) if (t.type === "childList") {
			if (t.target.isConnected && ![...o, ...s].some((e) => G(e, t.target))) for (let e of t.addedNodes) (e instanceof HTMLElement || e instanceof SVGElement) && Au(e) ? o.add(e) : e instanceof Element && d(e);
			if (Gn()) {
				for (let e of u) if (!e.isConnected) {
					p.disconnect();
					break;
				}
			}
		}
	});
	p.observe(i, {
		childList: !0,
		subtree: !0
	});
	let m = /* @__PURE__ */ new Set();
	if (Gn()) for (let e of u) {
		let t = new MutationObserver((e) => {
			for (let t of e) if (t.type === "childList") {
				if (t.target.isConnected && ![...o, ...s].some((e) => G(e, t.target))) for (let e of t.addedNodes) (e instanceof HTMLElement || e instanceof SVGElement) && Au(e) ? o.add(e) : e instanceof Element && d(e);
				if (Gn()) {
					for (let e of u) if (!e.isConnected) {
						p.disconnect();
						break;
					}
				}
			}
		});
		t.observe(e, {
			childList: !0,
			subtree: !0
		}), m.add(t);
	}
	let h = {
		visibleNodes: o,
		hiddenNodes: s,
		observe() {
			p.observe(i, {
				childList: !0,
				subtree: !0
			});
		},
		disconnect() {
			p.disconnect();
		}
	};
	return Mu.push(h), () => {
		if (p.disconnect(), Gn()) for (let e of m) e.disconnect();
		for (let e of s) {
			let t = ju.get(e);
			t != null && (t === 1 ? (l(e, !1), ju.delete(e)) : ju.set(e, t - 1));
		}
		h === Mu[Mu.length - 1] ? (Mu.pop(), Mu.length && Mu[Mu.length - 1].observe()) : Mu.splice(Mu.indexOf(h), 1);
	};
}
function Pu(e) {
	let t = Mu[Mu.length - 1];
	if (t && !t.visibleNodes.has(e)) return t.visibleNodes.add(e), () => {
		t.visibleNodes.delete(e);
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/overlays/calculatePosition.mjs
var Fu = {
	top: "top",
	bottom: "top",
	left: "left",
	right: "left"
}, Iu = {
	top: "bottom",
	bottom: "top",
	left: "right",
	right: "left"
}, Lu = {
	top: "left",
	left: "top"
}, Ru = {
	top: "height",
	left: "width"
}, zu = {
	width: "totalWidth",
	height: "totalHeight"
}, Bu = {}, Vu = () => typeof document < "u" ? window.visualViewport : null;
function Hu(e, t) {
	let n = 0, r = 0, i = 0, a = 0, o = 0, s = 0, c = {}, l = (t?.scale ?? 1) > 1;
	if (e.tagName === "BODY" || e.tagName === "HTML") {
		let l = document.documentElement;
		i = l.clientWidth, a = l.clientHeight, n = t?.width ?? i, r = t?.height ?? a, c.top = l.scrollTop || e.scrollTop, c.left = l.scrollLeft || e.scrollLeft, t && (o = Math.max(0, t.pageTop - (c.top ?? 0)), s = Math.max(0, t.pageLeft - (c.left ?? 0)));
	} else ({width: n, height: r, top: o, left: s} = Q(e, !1)), c.top = e.scrollTop, c.left = e.scrollLeft, i = n, a = r;
	return Cr() && (e.tagName === "BODY" || e.tagName === "HTML") && l && (c.top = 0, c.left = 0, o = t?.pageTop ?? 0, s = t?.pageLeft ?? 0), {
		width: n,
		height: r,
		totalWidth: i,
		totalHeight: a,
		scroll: c,
		top: o,
		left: s
	};
}
function Uu(e) {
	return {
		top: e.scrollTop,
		left: e.scrollLeft,
		width: e.scrollWidth,
		height: e.scrollHeight
	};
}
function Wu(e, t, n, r, i, a, o) {
	let s = i.scroll[e] ?? 0, c = r[Ru[e]], l = o[e] + r.scroll[Fu[e]] + a, u = o[e] + r.scroll[Fu[e]] + c - a, d = t - s + r.scroll[Fu[e]] + o[e] - r[Fu[e]], f = t - s + n + r.scroll[Fu[e]] + o[e] - r[Fu[e]];
	return d < l ? l - d : f > u ? Math.max(u - f, l - d) : 0;
}
function Gu(e) {
	let t = window.getComputedStyle(e);
	return {
		top: parseInt(t.marginTop, 10) || 0,
		bottom: parseInt(t.marginBottom, 10) || 0,
		left: parseInt(t.marginLeft, 10) || 0,
		right: parseInt(t.marginRight, 10) || 0
	};
}
function Ku(e) {
	if (Bu[e]) return Bu[e];
	let [t, n] = e.split(" "), r = Fu[t] || "right", i = Lu[r];
	Fu[n] || (n = "center");
	let a = Ru[r], o = Ru[i];
	return Bu[e] = {
		placement: t,
		crossPlacement: n,
		axis: r,
		crossAxis: i,
		size: a,
		crossSize: o
	}, Bu[e];
}
function qu(e, t, n, r, i, a, o, s, c, l, u) {
	let { placement: d, crossPlacement: f, axis: p, crossAxis: m, size: h, crossSize: g } = r, _ = {};
	_[m] = e[m] ?? 0, f === "center" ? _[m] += ((e[g] ?? 0) - (n[g] ?? 0)) / 2 : f !== m && (_[m] += (e[g] ?? 0) - (n[g] ?? 0)), _[m] += a;
	let v = e[m] - n[g] + c + l, y = e[m] + e[g] - c - l;
	if (_[m] = Jo(_[m], v, y), d === p) {
		let t = s ? u[h] : u[zu[h]];
		_[Iu[p]] = Math.floor(t - e[p] + i);
	} else _[p] = Math.floor(e[p] + e[h] + i);
	return _;
}
function Ju(e, t, n, r, i, a, o, s, c, l, u) {
	let d = (e.top == null ? c[zu.height] - (e.bottom ?? 0) - o : e.top) - (c.scroll.top ?? 0), f = l ? n.top : 0, p = {
		top: Math.max(t.top + f, (u?.offsetTop ?? t.top) + f),
		bottom: Math.min(t.top + t.height + f, (u?.offsetTop ?? 0) + (u?.height ?? 0))
	};
	return s === "top" ? Math.max(0, d + o - p.top - ((i.top ?? 0) + (i.bottom ?? 0) + a)) : Math.max(0, p.bottom - d - ((i.top ?? 0) + (i.bottom ?? 0) + a));
}
function Yu(e, t, n, r, i, a, o, s) {
	let { placement: c, axis: l, size: u } = a;
	return c === l ? Math.max(0, n[l] - (o.scroll[l] ?? 0) - (e[l] + (s ? t[l] : 0)) - (r[l] ?? 0) - r[Iu[l]] - i) : Math.max(0, e[u] + e[l] + (s ? t[l] : 0) - n[l] - n[u] + (o.scroll[l] ?? 0) - (r[l] ?? 0) - r[Iu[l]] - i);
}
function X(e, t, n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _) {
	let v = Ku(e), { size: y, crossAxis: b, crossSize: x, placement: S, crossPlacement: C } = v, w = qu(t, s, n, v, u, d, l, f, m, h, c), T = u, E = Yu(s, l, t, i, a + u, v, c, g);
	if (o && n[y] > E) {
		let e = Ku(`${Iu[S]} ${C}`), r = qu(t, s, n, e, u, d, l, f, m, h, c);
		Yu(s, l, t, i, a + u, e, c, g) > E && (v = e, w = r, T = u);
	}
	let D = "bottom";
	v.axis === "top" ? v.placement === "top" ? D = "top" : v.placement === "bottom" && (D = "bottom") : v.crossAxis === "top" && (v.crossPlacement === "top" ? D = "bottom" : v.crossPlacement === "bottom" && (D = "top"));
	let O = Wu(b, w[b], n[x], s, c, a, l);
	w[b] += O;
	let k = Ju(w, s, l, f, i, a, n.height, D, c, g, _);
	p && p < k && (k = p), n.height = Math.min(n.height, k), w = qu(t, s, n, v, T, d, l, f, m, h, c), O = Wu(b, w[b], n[x], s, c, a, l), w[b] += O;
	let ee = {}, A = t[b] - w[b] - i[Fu[b]], j = A + .5 * t[x], te = m / 2 + h, ne = Fu[b] === "left" ? (i.left ?? 0) + (i.right ?? 0) : (i.top ?? 0) + (i.bottom ?? 0), re = n[x] - ne - m / 2 - h;
	ee[b] = Jo(Jo(j, t[b] + m / 2 - (w[b] + i[Fu[b]]), t[b] + t[x] - m / 2 - (w[b] + i[Fu[b]])), te, re), {placement: S, crossPlacement: C} = v, m ? A = ee[b] : C === "right" ? A += t[x] : C === "center" && (A += t[x] / 2);
	let M = S === "left" || S === "top" ? n[y] : 0, ie = {
		x: S === "top" || S === "bottom" ? A : M,
		y: S === "left" || S === "right" ? A : M
	};
	return {
		position: w,
		maxHeight: k,
		arrowOffsetLeft: ee.left,
		arrowOffsetTop: ee.top,
		placement: S,
		triggerAnchorPoint: ie
	};
}
function Xu(e) {
	let { placement: t, targetNode: n, overlayNode: r, scrollNode: i, padding: a, shouldFlip: o, boundaryElement: s, offset: c, crossOffset: l, maxHeight: u, arrowSize: d = 0, arrowBoundaryOffset: f = 0, targetRect: p } = e, m = Vu(), h = r instanceof HTMLElement ? Qu(r) : document.documentElement, g = h === document.documentElement, _ = window.getComputedStyle(h).position, v = !!_ && _ !== "static", y = g ? Q(n, !1, p) : Zu(n, h, !1, p);
	if (!g) {
		let { marginTop: e, marginLeft: t } = window.getComputedStyle(n);
		y.top += parseInt(e, 10) || 0, y.left += parseInt(t, 10) || 0;
	}
	let b = Q(r, !0), x = Gu(r);
	b.width += (x.left ?? 0) + (x.right ?? 0), b.height += (x.top ?? 0) + (x.bottom ?? 0);
	let S = Uu(i), C = Hu(s, m), w = Hu(h, m), T;
	if ((s.tagName === "BODY" || s.tagName === "HTML") && !g) {
		let e = Z(h, !1);
		T = {
			top: -(e.top - C.top),
			left: -(e.left - C.left),
			width: 0,
			height: 0
		};
	} else T = (s.tagName === "BODY" || s.tagName === "HTML") && g ? {
		top: 0,
		left: 0,
		width: 0,
		height: 0
	} : Zu(s, h, !1);
	let E = G(s, h);
	return X(t, y, b, S, x, a, o, C, w, T, c, l, v, u, d, f, E, m);
}
function Z(e, t) {
	let { top: n, left: r, width: i, height: a } = e.getBoundingClientRect();
	return t && e instanceof e.ownerDocument.defaultView.HTMLElement && (i = e.offsetWidth, a = e.offsetHeight), {
		top: n,
		left: r,
		width: i,
		height: a
	};
}
function Q(e, t, n) {
	let { top: r, left: i, width: a, height: o } = n || Z(e, t), { scrollTop: s, scrollLeft: c, clientTop: l, clientLeft: u } = document.documentElement;
	return {
		top: r + s - l,
		left: i + c - u,
		width: a,
		height: o
	};
}
function Zu(e, t, n, r) {
	let i = window.getComputedStyle(e), a;
	if (i.position === "fixed") a = r || Z(e, n);
	else {
		a = Q(e, n, r);
		let i = Q(t, n), o = window.getComputedStyle(t);
		i.top += (parseInt(o.borderTopWidth, 10) || 0) - t.scrollTop, i.left += (parseInt(o.borderLeftWidth, 10) || 0) - t.scrollLeft, a.top -= i.top, a.left -= i.left;
	}
	return a.top -= parseInt(i.marginTop, 10) || 0, a.left -= parseInt(i.marginLeft, 10) || 0, a;
}
function Qu(e) {
	let t = e.offsetParent;
	if (t && t === document.body && window.getComputedStyle(t).position === "static" && !$u(t) && (t = document.documentElement), t == null) for (t = e.parentElement; t && !$u(t);) t = t.parentElement;
	return t || document.documentElement;
}
function $u(e) {
	let t = window.getComputedStyle(e);
	return t.transform !== "none" || /transform|perspective/.test(t.willChange) || t.filter !== "none" || t.contain === "paint" || "backdropFilter" in t && t.backdropFilter !== "none" || "WebkitBackdropFilter" in t && t.WebkitBackdropFilter !== "none";
}
//#endregion
//#region node_modules/react-aria/dist/private/overlays/useCloseOnScroll.mjs
var ed = /* @__PURE__ */ new WeakMap();
function td(e) {
	let { triggerRef: t, isOpen: n, onClose: r } = e;
	(0, N.useEffect)(() => !n || r === null ? void 0 : Hn(qn(t.current), "scroll", (e) => {
		let n = K(e);
		if (!t.current || n instanceof Node && !G(n, t.current) || n instanceof HTMLInputElement || n instanceof HTMLTextAreaElement) return;
		let i = r || ed.get(t.current);
		i && i();
	}, !0), [
		n,
		r,
		t
	]);
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/useResizeObserver.mjs
function nd() {
	return window.ResizeObserver !== void 0;
}
function rd(e) {
	let { ref: t, box: n, onResize: r } = e, i = vi(r);
	(0, N.useEffect)(() => {
		let e = t?.current;
		if (e) {
			if (nd()) {
				let t = new window.ResizeObserver((e) => {
					e.length && i();
				});
				return t.observe(e, { box: n }), () => {
					e && t.unobserve(e);
				};
			}
			return window.addEventListener("resize", i, !1), () => {
				window.removeEventListener("resize", i, !1);
			};
		}
	}, [t, n]);
}
//#endregion
//#region node_modules/react-aria/dist/private/overlays/useOverlayPosition.mjs
var id = typeof document < "u" ? window.visualViewport : null;
function ad(e) {
	let { direction: t } = ji(), { arrowSize: n, targetRef: r, overlayRef: i, arrowRef: a, scrollRef: o = i, placement: s = "bottom", containerPadding: c = 12, shouldFlip: l = !0, boundaryElement: u = typeof document < "u" ? document.body : null, offset: d = 0, crossOffset: f = 0, shouldUpdatePosition: p = !0, isOpen: m = !0, onClose: h, maxHeight: g, arrowBoundaryOffset: _ = 0, getTargetRect: v } = e, [y, b] = (0, N.useState)(null), x = [
		p,
		s,
		i.current,
		r.current,
		a?.current,
		o.current,
		c,
		l,
		u,
		d,
		f,
		m,
		t,
		g,
		_,
		n
	], S = (0, N.useRef)(id?.scale);
	(0, N.useEffect)(() => {
		m && (S.current = id?.scale);
	}, [m]);
	let C = (0, N.useCallback)(() => {
		if (p === !1 || !m || !i.current || !r.current || !u || id?.scale !== S.current) return;
		let e = null;
		if (o.current && Jn(o.current)) {
			let t = Kn()?.getBoundingClientRect(), n = o.current.getBoundingClientRect();
			e = {
				type: "top",
				offset: (t?.top ?? 0) - n.top
			}, e.offset > n.height / 2 && (e.type = "bottom", e.offset = (t?.bottom ?? 0) - n.bottom);
		}
		let h = i.current;
		!g && i.current && (h.style.top = "0px", h.style.bottom = "", h.style.maxHeight = (window.visualViewport?.height ?? window.innerHeight) + "px");
		let y = Xu({
			placement: sd(s, t),
			overlayNode: i.current,
			targetNode: r.current,
			scrollNode: o.current || i.current,
			padding: c,
			shouldFlip: l,
			boundaryElement: u,
			offset: d,
			crossOffset: f,
			maxHeight: g,
			arrowSize: n ?? (a?.current ? Z(a.current, !0).width : 0),
			arrowBoundaryOffset: _,
			targetRect: v?.(r.current)
		});
		if (!y.position) return;
		h.style.top = "", h.style.bottom = "", h.style.left = "", h.style.right = "", Object.keys(y.position).forEach((e) => h.style[e] = y.position[e] + "px"), h.style.maxHeight = y.maxHeight == null ? "" : y.maxHeight + "px";
		let x = Kn();
		if (e && x && o.current) {
			let t = x.getBoundingClientRect(), n = o.current.getBoundingClientRect(), r = t[e.type] - n[e.type];
			o.current.scrollTop += r - e.offset;
		}
		b(y);
	}, x);
	H(C, x), od(C), rd({
		ref: i,
		onResize: C
	}), rd({
		ref: r,
		onResize: C
	});
	let w = (0, N.useRef)(!1);
	H(() => {
		let e, t = () => {
			w.current = !0, clearTimeout(e), e = setTimeout(() => {
				w.current = !1;
			}, 500), C();
		}, n = () => {
			w.current && t();
		};
		id?.addEventListener("resize", t), id?.addEventListener("scroll", n);
		let r = Hn(qn(window), "scroll", n);
		return () => {
			id?.removeEventListener("resize", t), id?.removeEventListener("scroll", n), r();
		};
	}, [C]);
	let T = (0, N.useCallback)(() => {
		w.current || h?.();
	}, [h, w]);
	return td({
		triggerRef: r,
		isOpen: m,
		onClose: h && T
	}), {
		overlayProps: { style: {
			position: y ? "absolute" : "fixed",
			top: y ? void 0 : 0,
			left: y ? void 0 : 0,
			zIndex: 1e5,
			...y?.position,
			maxHeight: y?.maxHeight ?? "100vh"
		} },
		placement: y?.placement ?? null,
		triggerAnchorPoint: y?.triggerAnchorPoint ?? null,
		arrowProps: {
			"aria-hidden": "true",
			role: "presentation",
			style: {
				left: y?.arrowOffsetLeft,
				top: y?.arrowOffsetTop
			}
		},
		updatePosition: C
	};
}
function od(e) {
	H(() => (window.addEventListener("resize", e, !1), () => {
		window.removeEventListener("resize", e, !1);
	}), [e]);
}
function sd(e, t) {
	return t === "rtl" ? e.replace("start", "right").replace("end", "left") : e.replace("start", "left").replace("end", "right");
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/useInteractOutside.mjs
function cd(e) {
	let { ref: t, onInteractOutside: n, isDisabled: r, onInteractOutsideStart: i } = e, a = (0, N.useRef)({
		isPointerDown: !1,
		ignoreEmulatedMouseEvents: !1
	}), o = vi((e) => {
		n && ld(e, t) && (i && i(e), a.current.isPointerDown = !0);
	}), s = vi((e) => {
		n && n(e);
	});
	(0, N.useEffect)(() => {
		let e = a.current;
		if (r) return;
		let n = t.current, i = W(n);
		if (typeof PointerEvent < "u") {
			let n = (n) => {
				e.isPointerDown && ld(n, t) && s(n), e.isPointerDown = !1;
			};
			return i.addEventListener("pointerdown", o, !0), i.addEventListener("click", n, !0), () => {
				i.removeEventListener("pointerdown", o, !0), i.removeEventListener("click", n, !0);
			};
		}
	}, [t, r]);
}
function ld(e, t) {
	if (e.button > 0) return !1;
	let n = K(e);
	if (n) {
		let e = n.ownerDocument;
		if (!e || !G(e.documentElement, n) || n.closest("[data-react-aria-top-layer]")) return !1;
	}
	return t.current ? !e.composedPath().includes(t.current) : !1;
}
//#endregion
//#region node_modules/react-aria/dist/private/overlays/useOverlay.mjs
var ud = [];
function dd(e, t) {
	let { onClose: n, shouldCloseOnBlur: r, isOpen: i, isDismissable: a = !1, isKeyboardDismissDisabled: o = !1, shouldCloseOnInteractOutside: s } = e, c = (0, N.useRef)(void 0);
	(0, N.useEffect)(() => {
		if (i && !ud.includes(t)) return ud.push(t), () => {
			let e = ud.indexOf(t);
			e >= 0 && ud.splice(e, 1);
		};
	}, [i, t]);
	let l = () => {
		ud[ud.length - 1] === t && n && n();
	}, u = (e) => {
		let n = ud[ud.length - 1];
		c.current = n, (!s || s(K(e))) && n === t && e.stopPropagation();
	}, d = (e) => {
		(!s || s(K(e))) && (ud[ud.length - 1] === t && e.stopPropagation(), c.current === t && l()), c.current = void 0;
	}, { keyboardProps: f } = ka({ shortcuts: { Escape: () => {
		if (!o) l();
		else return !1;
	} } });
	cd({
		ref: t,
		onInteractOutside: a && i ? d : void 0,
		onInteractOutsideStart: u
	});
	let { focusWithinProps: p } = Lo({
		isDisabled: !r,
		onBlurWithin: (e) => {
			e.relatedTarget && !fl(e.relatedTarget) && (!s || s(e.relatedTarget)) && n?.();
		}
	});
	return {
		overlayProps: {
			...f,
			...p
		},
		underlayProps: {}
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/runAfterKeyboard.mjs
var fd = 200, pd = 50, md = 600, hd = /* @__PURE__ */ new WeakMap(), gd = /* @__PURE__ */ new Set(), _d = /* @__PURE__ */ new Set();
function vd(e, t) {
	let n = gi();
	if (e !== n || t.aborted) for (let e of _d) e(n), _d.delete(e);
	if (!e && n && Cr() && !t.aborted) window.clearInterval(hd.get(window)), hd.set(window, yd(fd));
	else {
		if (e !== n || t.aborted) for (let e of gd) e(n), gd.delete(e);
		(_d.size + gd.size <= 0 || t.aborted) && (window.clearInterval(hd.get(window)), hd.delete(window));
	}
}
function yd(e = md) {
	return window.setInterval(vd, pd, gi(), AbortSignal.timeout(e));
}
function bd(e) {
	if (!pi()) return e(!1), () => {};
	let t = window.requestAnimationFrame(() => {
		t = window.requestAnimationFrame(() => {
			let t = mi(document.hasFocus() ? Kn() : null);
			if (gi() === t || gi() && !t) return e(t);
			_d.add(e), hd.has(window) || hd.set(window, yd());
		});
	});
	return () => {
		window.cancelAnimationFrame(t), _d.delete(e);
	};
}
function xd(e) {
	if (!pi()) return e(!1), () => {};
	let t = window.requestAnimationFrame(() => {
		t = window.requestAnimationFrame(() => {
			let t = mi(document.hasFocus() ? Kn() : null);
			if (gi() === t) return e(t);
			gd.add(e), hd.has(window) || hd.set(window, yd());
		});
	});
	return () => {
		window.cancelAnimationFrame(t), gd.delete(e);
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/overlays/usePreventScroll.mjs
var Sd = typeof document < "u" && window.visualViewport, Cd = 0, wd;
function Td(e = {}) {
	let { isDisabled: t, UNSTABLE_overrideFocus: n } = e;
	H(() => {
		if (!t) return Cd++, Cd === 1 && (wd = xr() && Cr() ? Dd() : Ed(n)), () => {
			Cd--, Cd === 0 && wd();
		};
	}, [t, n]);
}
function Ed(e) {
	let t = window.innerWidth - document.documentElement.clientWidth;
	return Qt(t > 0 && ("scrollbarGutter" in document.documentElement.style ? Un(document.documentElement, "scrollbar-gutter", "stable") : Un(document.documentElement, "padding-right", `${t}px`)), Un(document.documentElement, "overflow", "hidden"), e && kd(), e && pi() && Od());
}
function Dd() {
	let e = Un(document.documentElement, "overflow", "hidden"), t, n = !1, r = (e) => {
		let r = K(e);
		t = ss(r, !0) ? r : cs(r, !0), n = !1;
		let i = r.ownerDocument.defaultView.getSelection();
		i && !i.isCollapsed && i.containsNode(r, !0) && (n = !0), e.composedPath().some((e) => e instanceof HTMLInputElement && e.type === "range") && (n = !0), "selectionStart" in r && "selectionEnd" in r && r.selectionStart < r.selectionEnd && r.ownerDocument.activeElement === r && (n = !0);
	}, i = document.createElement("style"), a = So();
	a && (i.nonce = a), i.textContent = "@layer {\n  * {\n    overscroll-behavior: contain;\n  }\n}", document.head.prepend(i);
	let o = (e) => {
		e.touches.length === 2 || n || (!t || t === document.documentElement || t === document.body || t.scrollHeight === t.clientHeight && t.scrollWidth === t.clientWidth) && e.preventDefault();
	}, s = kd(), c = Qt(Hn(document, "touchstart", r, {
		passive: !1,
		capture: !0
	}), Hn(document, "touchmove", o, {
		passive: !1,
		capture: !0
	}), Od());
	return () => {
		e(), c(), i.remove(), s();
	};
}
function Od() {
	return Hn(document, "blur", (e) => {
		let t = K(e), n = e.relatedTarget;
		n && mi(n) ? n.focus() : n || (t.parentElement?.closest("[tabindex]"))?.focus({ preventScroll: !0 });
	}, !0);
}
function kd() {
	let e = HTMLElement.prototype.focus;
	return Reflect.defineProperty(HTMLElement.prototype, "focus", {
		configurable: !0,
		writable: !0,
		value: function(t) {
			if (e.call(this, {
				...t,
				preventScroll: !0
			}), !t || !t.preventScroll) {
				let e = () => {
					Kn() === this && Ad(this);
				};
				bd((t) => t ? e() : xd(() => e()));
			}
		}
	}), () => {
		Reflect.defineProperty(HTMLElement.prototype, "focus", {
			configurable: !0,
			writable: !0,
			value: e
		});
	};
}
function Ad(e) {
	let t = document.scrollingElement || document.documentElement, n = e;
	for (; n && n !== t && n.isConnected;) {
		let e = cs(n);
		if (e !== document.documentElement && e !== document.body && e !== n) {
			let t = e.getBoundingClientRect(), r = n.getBoundingClientRect();
			if (r.top < t.top || r.bottom > t.top + n.clientHeight) {
				let n = t.bottom;
				Sd && (n = Math.min(n, Sd.offsetTop + Sd.height));
				let i = r.top - t.top - ((n - t.top) / 2 - r.height / 2);
				e.scrollTo({
					top: Math.max(0, Math.min(e.scrollHeight - e.clientHeight, e.scrollTop + i)),
					behavior: "smooth"
				});
			}
		}
		n = e.parentElement;
	}
}
//#endregion
//#region node_modules/react-aria/dist/private/overlays/usePopover.mjs
function jd(e, t) {
	let { triggerRef: n, popoverRef: r, groupRef: i, isNonModal: a, isKeyboardDismissDisabled: o, shouldCloseOnInteractOutside: s, ...c } = e, l = c.trigger === "SubmenuTrigger", { overlayProps: u, underlayProps: d } = dd({
		isOpen: t.isOpen,
		onClose: t.close,
		shouldCloseOnBlur: !0,
		isDismissable: !a || l,
		isKeyboardDismissDisabled: o,
		shouldCloseOnInteractOutside: s
	}, i ?? r), { overlayProps: f, arrowProps: p, placement: m, triggerAnchorPoint: h } = ad({
		...c,
		targetRef: n,
		overlayRef: r,
		isOpen: t.isOpen,
		onClose: a && !l ? t.close : null,
		getTargetRect: c.getTargetRect ?? (t.point ? () => new DOMRect(t.point.x, t.point.y, 0, 0) : void 0)
	});
	Td({ isDisabled: a || !t.isOpen }), (0, N.useEffect)(() => {
		if (t.isOpen && r.current) return a ? Pu(i?.current ?? r.current) : Nu([i?.current ?? r.current], { shouldUseInert: !0 });
	}, [
		a,
		t.isOpen,
		r,
		i
	]);
	let { focusWithinProps: g } = Lo(e);
	return {
		popoverProps: U(u, f, g),
		arrowProps: p,
		underlayProps: d,
		placement: m,
		triggerAnchorPoint: h
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/ar-AE.mjs
var Md = {};
Md = { dismiss: "تجاهل" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/bg-BG.mjs
var Nd = {};
Nd = { dismiss: "Отхвърляне" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/cs-CZ.mjs
var Pd = {};
Pd = { dismiss: "Odstranit" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/da-DK.mjs
var Fd = {};
Fd = { dismiss: "Luk" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/de-DE.mjs
var Id = {};
Id = { dismiss: "Schließen" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/el-GR.mjs
var Ld = {};
Ld = { dismiss: "Απόρριψη" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/en-US.mjs
var Rd = {};
Rd = { dismiss: "Dismiss" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/es-ES.mjs
var zd = {};
zd = { dismiss: "Descartar" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/et-EE.mjs
var Bd = {};
Bd = { dismiss: "Lõpeta" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/fi-FI.mjs
var Vd = {};
Vd = { dismiss: "Hylkää" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/fr-FR.mjs
var Hd = {};
Hd = { dismiss: "Rejeter" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/he-IL.mjs
var Ud = {};
Ud = { dismiss: "התעלם" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/hr-HR.mjs
var Wd = {};
Wd = { dismiss: "Odbaci" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/hu-HU.mjs
var Gd = {};
Gd = { dismiss: "Elutasítás" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/it-IT.mjs
var Kd = {};
Kd = { dismiss: "Ignora" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/ja-JP.mjs
var qd = {};
qd = { dismiss: "閉じる" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/ko-KR.mjs
var Jd = {};
Jd = { dismiss: "무시" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/lt-LT.mjs
var Yd = {};
Yd = { dismiss: "Atmesti" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/lv-LV.mjs
var Xd = {};
Xd = { dismiss: "Nerādīt" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/nb-NO.mjs
var Zd = {};
Zd = { dismiss: "Lukk" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/nl-NL.mjs
var Qd = {};
Qd = { dismiss: "Negeren" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/pl-PL.mjs
var $d = {};
$d = { dismiss: "Zignoruj" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/pt-BR.mjs
var ef = {};
ef = { dismiss: "Descartar" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/pt-PT.mjs
var tf = {};
tf = { dismiss: "Dispensar" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/ro-RO.mjs
var nf = {};
nf = { dismiss: "Revocare" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/ru-RU.mjs
var rf = {};
rf = { dismiss: "Пропустить" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/sk-SK.mjs
var af = {};
af = { dismiss: "Zrušiť" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/sl-SI.mjs
var of = {};
of = { dismiss: "Opusti" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/sr-SP.mjs
var sf = {};
sf = { dismiss: "Odbaci" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/sv-SE.mjs
var cf = {};
cf = { dismiss: "Avvisa" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/tr-TR.mjs
var lf = {};
lf = { dismiss: "Kapat" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/uk-UA.mjs
var uf = {};
uf = { dismiss: "Скасувати" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/zh-CN.mjs
var df = {};
df = { dismiss: "取消" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/overlays/zh-TW.mjs
var ff = {};
ff = { dismiss: "關閉" };
//#endregion
//#region node_modules/react-aria/dist/private/overlays/intlStrings.mjs
var pf = {};
pf = {
	"ar-AE": Md,
	"bg-BG": Nd,
	"cs-CZ": Pd,
	"da-DK": Fd,
	"de-DE": Id,
	"el-GR": Ld,
	"en-US": Rd,
	"es-ES": zd,
	"et-EE": Bd,
	"fi-FI": Vd,
	"fr-FR": Hd,
	"he-IL": Ud,
	"hr-HR": Wd,
	"hu-HU": Gd,
	"it-IT": Kd,
	"ja-JP": qd,
	"ko-KR": Jd,
	"lt-LT": Yd,
	"lv-LV": Xd,
	"nb-NO": Zd,
	"nl-NL": Qd,
	"pl-PL": $d,
	"pt-BR": ef,
	"pt-PT": tf,
	"ro-RO": nf,
	"ru-RU": rf,
	"sk-SK": af,
	"sl-SI": of,
	"sr-SP": sf,
	"sv-SE": cf,
	"tr-TR": lf,
	"uk-UA": uf,
	"zh-CN": df,
	"zh-TW": ff
};
//#endregion
//#region node_modules/react-aria/dist/private/overlays/DismissButton.mjs
function mf(e) {
	return e && e.__esModule ? e.default : e;
}
function hf(e) {
	let { onDismiss: t, ...n } = e, r = bi(n, Gi(mf(pf), "@react-aria/overlays").format("dismiss")), i = () => {
		t && t();
	};
	return /*#__PURE__*/ N.createElement(vs, null, /*#__PURE__*/ N.createElement("button", {
		...r,
		tabIndex: -1,
		onClick: i,
		style: {
			width: 1,
			height: 1
		}
	}));
}
//#endregion
//#region node_modules/react-aria/dist/private/interactions/PressResponder.mjs
function gf({ children: e }) {
	let t = (0, N.useMemo)(() => ({ register: () => {} }), []);
	return /*#__PURE__*/ N.createElement(Co.Provider, { value: t }, e);
}
//#endregion
//#region node_modules/react-aria/dist/private/overlays/PortalProvider.mjs
var _f = /*#__PURE__*/ (0, N.createContext)({});
function vf() {
	return (0, N.useContext)(_f) ?? {};
}
//#endregion
//#region node_modules/react-aria/dist/private/overlays/Overlay.mjs
var yf = /*#__PURE__*/ N.createContext(null);
function bf(e) {
	let t = dn(), { portalContainer: n = t ? null : document.body, isExiting: r } = e, [i, a] = (0, N.useState)(!1), o = (0, N.useMemo)(() => ({
		contain: i,
		setContain: a
	}), [i, a]), { getContainer: s } = vf();
	if (!e.portalContainer && s && (n = s()), !n) return null;
	let c = e.children;
	return e.disableFocusManagement || (c = /*#__PURE__*/ N.createElement(nl, {
		restoreFocus: !0,
		contain: (e.shouldContainFocus || i) && !r
	}, c)), c = /*#__PURE__*/ N.createElement(yf.Provider, { value: o }, /*#__PURE__*/ N.createElement(gf, null, /*#__PURE__*/ N.createElement(ja.Provider, { value: null }, c))), /*#__PURE__*/ Ba.createPortal(c, n);
}
//#endregion
//#region node_modules/react-stately/dist/private/overlays/useOverlayTriggerState.mjs
function xf(e) {
	let [t, n] = qi(e.isOpen, e.defaultOpen || !1, e.onOpenChange), [r, i] = (0, N.useState)(null);
	return {
		isOpen: t,
		setOpen: n,
		open: (0, N.useCallback)(() => {
			n(!0);
		}, [n]),
		close: (0, N.useCallback)(() => {
			n(!1);
		}, [n]),
		toggle: (0, N.useCallback)(() => {
			n(!t);
		}, [n, t]),
		point: r,
		setPoint: i
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/utils/animation.mjs
function Sf(e, t = !0, n) {
	let [r, i] = (0, N.useState)(!0), a = r && t;
	return H(() => {
		if (!t && e.current) return Qt(Un(e.current, "opacity", "0"), Un(e.current, "clip", "rect(0 0 0 0)"), Un(e.current, "clip-path", "inset(50%)"), Un(e.current, "mask-image", "linear-gradient(#0000, #0000)"));
	}, [e, t]), H(() => {
		if (a && e.current && "getAnimations" in e.current) for (let t of e.current.getAnimations()) t instanceof CSSTransition && t.cancel();
	}, [e, a]), wf(e, a, n, (0, N.useCallback)(() => i(!1), [])), a;
}
function Cf(e, t, n) {
	let [r, i] = (0, N.useState)(t ? "open" : "closed");
	switch (r) {
		case "open":
			t || i("exiting");
			break;
		case "closed":
		case "exiting": t && i("open");
	}
	let a = r === "exiting";
	return wf(e, a, n, (0, N.useCallback)(() => {
		i((e) => e === "exiting" ? "closed" : e);
	}, [])), a;
}
function wf(e, t, n, r) {
	let i = (0, N.useRef)(null), a = vi(n);
	H(() => {
		if (t && e.current && i.current !== t) {
			if (i.current = t, !("getAnimations" in e.current)) {
				r();
				return;
			}
			let n = a?.(e.current), o = e.current.getAnimations().filter((e) => (typeof DocumentTimeline > "u" || e.timeline instanceof DocumentTimeline) && e.playState === "running");
			if (o.length === 0 && !n) {
				r();
				return;
			}
			Promise.all([n, ...o.map((e) => e.finished)]).then(() => {
				(0, Ba.flushSync)(() => {
					r();
				});
			}).catch(() => {});
		}
		i.current = t;
	}, [
		e,
		t,
		r
	]);
}
//#endregion
//#region node_modules/react-aria-components/dist/private/Popover.mjs
var Tf = /*#__PURE__*/ (0, N.createContext)(null), Ef = /*#__PURE__*/ (0, N.createContext)(null), Df = /*#__PURE__*/ (0, N.forwardRef)(function(e, t) {
	[e, t] = kn(e, t, Tf);
	let n = (0, N.useContext)(pp), r = xf(e), i = e.isOpen != null || e.defaultOpen != null || !n ? r : n, a = Cf(t, i.isOpen), o = e.isExiting || !e.shouldSkipAnimation && a || !1, s = La(), { direction: c } = ji();
	if (s) {
		let t = e.children;
		return typeof t == "function" && (t = t({
			trigger: e.trigger || null,
			placement: "bottom",
			isEntering: !1,
			isExiting: !1,
			defaultChildren: null
		})), /*#__PURE__*/ N.createElement(N.Fragment, null, t);
	}
	return i && !i.isOpen && !o ? null : /*#__PURE__*/ N.createElement(Of, {
		...e,
		triggerRef: e.triggerRef,
		state: i,
		popoverRef: t,
		isExiting: o,
		dir: c
	});
});
function Of({ state: e, isExiting: t, UNSTABLE_portalContainer: n, clearContexts: r, ...i }) {
	let a = (0, N.useRef)(null), o = (0, N.useRef)(null), s = (0, N.useContext)(Ef), c = s && i.trigger === "SubmenuTrigger", [l, u] = (0, N.useState)(!1), { popoverProps: d, underlayProps: f, arrowProps: p, placement: m, triggerAnchorPoint: h } = jd({
		...i,
		offset: i.offset ?? 8,
		arrowRef: a,
		groupRef: c ? s : o
	}, e), g = i.popoverRef, _ = Sf(g, !!m && l), v = i.isEntering || !i.shouldSkipAnimation && _ || !1, y = Dn({
		...i,
		defaultClassName: "react-aria-Popover",
		values: {
			trigger: i.trigger || null,
			placement: m,
			isEntering: v,
			isExiting: t
		}
	}), b = !i.isNonModal || i.trigger === "SubmenuTrigger" || i.trigger === "PreviewTrigger", [x, S] = (0, N.useState)(i.trigger === "PreviewTrigger");
	H(() => {
		g.current && S(b && !g.current.querySelector("[role=dialog]"));
	}, [g, b]), (0, N.useEffect)(() => {
		x && i.trigger !== "PreviewTrigger" && (i.trigger !== "SubmenuTrigger" || Qr() !== "pointer") && g.current && !Jn(g.current) && ma(g.current);
	}, [
		x,
		g,
		i.trigger
	]);
	let C = (0, N.useMemo)(() => {
		let e = y.children;
		for (let t of [Tf, ...r ?? []]) e = /*#__PURE__*/ N.createElement(t.Provider, { value: null }, e);
		return e;
	}, [y.children, r]), [w, T] = (0, N.useState)(null), E = (0, N.useCallback)(() => {
		i.triggerRef.current && T(i.triggerRef.current.getBoundingClientRect().width + "px");
	}, [i.triggerRef]);
	H(E, [E]), rd({
		ref: y.style?.["--trigger-width"] ? void 0 : i.triggerRef,
		onResize: E
	});
	let D = {
		...d.style,
		"--trigger-anchor-point": h ? `${h.x}px ${h.y}px` : void 0,
		...y.style,
		"--trigger-width": y.style?.["--trigger-width"] || w
	};
	H(() => bd(() => u(!0)), []);
	let O = /*#__PURE__*/ N.createElement(Pn.div, {
		...U(ho(i, { global: !0 }), d),
		...y,
		id: x ? i.id : void 0,
		role: x ? "dialog" : void 0,
		tabIndex: x ? -1 : void 0,
		"aria-label": i["aria-label"],
		"aria-labelledby": i["aria-labelledby"],
		ref: g,
		slot: i.slot || void 0,
		style: D,
		dir: i.dir,
		"data-trigger": i.trigger,
		"data-placement": m,
		"data-entering": v || void 0,
		"data-exiting": t || void 0
	}, !i.isNonModal && /*#__PURE__*/ N.createElement(hf, { onDismiss: e.close }), /*#__PURE__*/ N.createElement(Ou.Provider, { value: {
		...p,
		placement: m,
		ref: a
	} }, C), /*#__PURE__*/ N.createElement(hf, { onDismiss: e.close }));
	return c ? /*#__PURE__*/ N.createElement(bf, {
		...i,
		shouldContainFocus: x && i.trigger !== "PreviewTrigger",
		isExiting: t,
		portalContainer: n ?? s?.current ?? void 0
	}, O) : /*#__PURE__*/ N.createElement(bf, {
		...i,
		shouldContainFocus: x && i.trigger !== "PreviewTrigger",
		isExiting: t,
		portalContainer: n
	}, !i.isNonModal && e.isOpen && /*#__PURE__*/ N.createElement("div", {
		"data-testid": "underlay",
		...f,
		style: {
			position: "fixed",
			inset: 0
		}
	}), /*#__PURE__*/ N.createElement("div", {
		ref: o,
		style: { display: "contents" }
	}, /*#__PURE__*/ N.createElement(Ef.Provider, { value: o }, O)));
}
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/ar-AE.mjs
var kf = {};
kf = { longPressMessage: "اضغط مطولاً أو اضغط على Alt + السهم لأسفل لفتح القائمة" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/bg-BG.mjs
var Af = {};
Af = { longPressMessage: "Натиснете продължително или натиснете Alt+ стрелка надолу, за да отворите менюто" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/cs-CZ.mjs
var jf = {};
jf = { longPressMessage: "Dlouhým stiskem nebo stisknutím kláves Alt + šipka dolů otevřete nabídku" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/da-DK.mjs
var Mf = {};
Mf = { longPressMessage: "Langt tryk eller tryk på Alt + pil ned for at åbne menuen" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/de-DE.mjs
var Nf = {};
Nf = { longPressMessage: "Drücken Sie lange oder drücken Sie Alt + Nach-unten, um das Menü zu öffnen" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/el-GR.mjs
var Pf = {};
Pf = { longPressMessage: "Πιέστε παρατεταμένα ή πατήστε Alt + κάτω βέλος για να ανοίξετε το μενού" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/en-US.mjs
var Ff = {};
Ff = { longPressMessage: "Long press or press Alt + ArrowDown to open menu" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/es-ES.mjs
var If = {};
If = { longPressMessage: "Mantenga pulsado o pulse Alt + flecha abajo para abrir el menú" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/et-EE.mjs
var Lf = {};
Lf = { longPressMessage: "Menüü avamiseks vajutage pikalt või vajutage klahve Alt + allanool" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/fi-FI.mjs
var Rf = {};
Rf = { longPressMessage: "Avaa valikko painamalla pohjassa tai näppäinyhdistelmällä Alt + Alanuoli" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/fr-FR.mjs
var zf = {};
zf = { longPressMessage: "Appuyez de manière prolongée ou appuyez sur Alt\xA0+\xA0Flèche vers le bas pour ouvrir le menu." };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/he-IL.mjs
var Bf = {};
Bf = { longPressMessage: "לחץ לחיצה ארוכה או הקש Alt + ArrowDown כדי לפתוח את התפריט" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/hr-HR.mjs
var $ = {};
$ = { longPressMessage: "Dugo pritisnite ili pritisnite Alt + strelicu prema dolje za otvaranje izbornika" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/hu-HU.mjs
var Vf = {};
Vf = { longPressMessage: "Nyomja meg hosszan, vagy nyomja meg az Alt + lefele nyíl gombot a menü megnyitásához" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/it-IT.mjs
var Hf = {};
Hf = { longPressMessage: "Premi a lungo o premi Alt + Freccia giù per aprire il menu" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/ja-JP.mjs
var Uf = {};
Uf = { longPressMessage: "長押しまたは Alt+下矢印キーでメニューを開く" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/ko-KR.mjs
var Wf = {};
Wf = { longPressMessage: "길게 누르거나 Alt + 아래쪽 화살표를 눌러 메뉴 열기" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/lt-LT.mjs
var Gf = {};
Gf = { longPressMessage: "Norėdami atidaryti meniu, nuspaudę palaikykite arba paspauskite „Alt + ArrowDown“." };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/lv-LV.mjs
var Kf = {};
Kf = { longPressMessage: "Lai atvērtu izvēlni, turiet nospiestu vai nospiediet taustiņu kombināciju Alt + lejupvērstā bultiņa" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/nb-NO.mjs
var qf = {};
qf = { longPressMessage: "Langt trykk eller trykk Alt + PilNed for å åpne menyen" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/nl-NL.mjs
var Jf = {};
Jf = { longPressMessage: "Druk lang op Alt + pijl-omlaag of druk op Alt om het menu te openen" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/pl-PL.mjs
var Yf = {};
Yf = { longPressMessage: "Naciśnij i przytrzymaj lub naciśnij klawisze Alt + Strzałka w dół, aby otworzyć menu" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/pt-BR.mjs
var Xf = {};
Xf = { longPressMessage: "Pressione e segure ou pressione Alt + Seta para baixo para abrir o menu" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/pt-PT.mjs
var Zf = {};
Zf = { longPressMessage: "Prima continuamente ou prima Alt + Seta Para Baixo para abrir o menu" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/ro-RO.mjs
var Qf = {};
Qf = { longPressMessage: "Apăsați lung sau apăsați pe Alt + săgeată în jos pentru a deschide meniul" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/ru-RU.mjs
var $f = {};
$f = { longPressMessage: "Нажмите и удерживайте или нажмите Alt + Стрелка вниз, чтобы открыть меню" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/sk-SK.mjs
var ep = {};
ep = { longPressMessage: "Ponuku otvoríte dlhým stlačením alebo stlačením klávesu Alt + klávesu so šípkou nadol" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/sl-SI.mjs
var tp = {};
tp = { longPressMessage: "Za odprtje menija pritisnite in držite gumb ali pritisnite Alt+puščica navzdol" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/sr-SP.mjs
var np = {};
np = { longPressMessage: "Dugo pritisnite ili pritisnite Alt + strelicu prema dole da otvorite meni" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/sv-SE.mjs
var rp = {};
rp = { longPressMessage: "Håll nedtryckt eller tryck på Alt + pil nedåt för att öppna menyn" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/tr-TR.mjs
var ip = {};
ip = { longPressMessage: "Menüyü açmak için uzun basın veya Alt + Aşağı Ok tuşuna basın" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/uk-UA.mjs
var ap = {};
ap = { longPressMessage: "Довго або звичайно натисніть комбінацію клавіш Alt і стрілка вниз, щоб відкрити меню" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/zh-CN.mjs
var op = {};
op = { longPressMessage: "长按或按 Alt + 向下方向键以打开菜单" };
//#endregion
//#region node_modules/react-aria/dist/private/intl/menu/zh-TW.mjs
var sp = {};
sp = { longPressMessage: "長按或按 Alt+向下鍵以開啟功能表" };
//#endregion
//#region node_modules/react-aria/dist/private/menu/intlStrings.mjs
var cp = {};
cp = {
	"ar-AE": kf,
	"bg-BG": Af,
	"cs-CZ": jf,
	"da-DK": Mf,
	"de-DE": Nf,
	"el-GR": Pf,
	"en-US": Ff,
	"es-ES": If,
	"et-EE": Lf,
	"fi-FI": Rf,
	"fr-FR": zf,
	"he-IL": Bf,
	"hr-HR": $,
	"hu-HU": Vf,
	"it-IT": Hf,
	"ja-JP": Uf,
	"ko-KR": Wf,
	"lt-LT": Gf,
	"lv-LV": Kf,
	"nb-NO": qf,
	"nl-NL": Jf,
	"pl-PL": Yf,
	"pt-BR": Xf,
	"pt-PT": Zf,
	"ro-RO": Qf,
	"ru-RU": $f,
	"sk-SK": ep,
	"sl-SI": tp,
	"sr-SP": np,
	"sv-SE": rp,
	"tr-TR": ip,
	"uk-UA": ap,
	"zh-CN": op,
	"zh-TW": sp
};
//#endregion
//#region node_modules/react-aria/dist/private/interactions/useContextMenu.mjs
function lp(e) {
	let { onContextMenu: t } = e, n = (0, N.useRef)(!1), { longPressProps: r } = Ul({
		onLongPressStart() {
			n.current = !1;
		},
		onLongPress(e) {
			n.current ? n.current = !1 : t?.({
				target: e.target,
				x: e.x,
				y: e.y
			});
		}
	});
	return t ? { contextMenuProps: U(xr() ? r : {}, {
		onContextMenu(e) {
			e.stopPropagation(), e.preventDefault(), n.current = !0;
			let r = e.currentTarget.getBoundingClientRect();
			t({
				target: e.currentTarget,
				x: e.clientX - r.x,
				y: e.clientY - r.y
			});
		},
		onKeyDown(e) {
			if (vr() && e.ctrlKey && e.key === "Enter") {
				n.current = !1;
				let r = e.currentTarget;
				e.stopPropagation(), setTimeout(() => {
					if (n.current) n.current = !1;
					else {
						let e = r.getBoundingClientRect();
						t({
							target: r,
							x: e.width / 2,
							y: e.height / 2
						});
					}
				}, 10);
			}
		}
	}) } : { contextMenuProps: {} };
}
//#endregion
//#region node_modules/react-aria/dist/private/overlays/useOverlayTrigger.mjs
function up(e, t, n) {
	let { type: r } = e, { isOpen: i } = t;
	(0, N.useEffect)(() => {
		n && n.current && ed.set(n.current, t.close);
	});
	let a;
	r === "menu" ? a = !0 : r === "listbox" && (a = "listbox");
	let o = _n();
	return {
		triggerProps: {
			"aria-haspopup": a,
			"aria-expanded": i,
			"aria-controls": i ? o : void 0,
			onPress: t.toggle
		},
		overlayProps: { id: o }
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/menu/useMenuTrigger.mjs
function dp(e) {
	return e && e.__esModule ? e.default : e;
}
function fp(e, t, n) {
	let { type: r = "menu", isDisabled: i, trigger: a = "press" } = e, o = _n(), { triggerProps: s, overlayProps: c } = up({ type: r }, t, n), l = (e, n, r = "first") => {
		if (!e || n.isDefaultPrevented()) return !1;
		t.toggle(r);
	}, { keyboardProps: u } = ka({
		isDisabled: i,
		shortcuts: {
			Enter: (e) => l(a !== "longPress", e, "first"),
			" ": (e) => l(a !== "longPress", e, "first"),
			ArrowDown: (e) => l(a !== "longPress", e, "first"),
			ArrowUp: (e) => l(a !== "longPress", e, "last"),
			"Alt+Enter": (e) => l(a === "longPress", e, "first"),
			"Alt+ ": (e) => l(a === "longPress", e, "first"),
			"Alt+ArrowDown": (e) => l(!0, e, "first"),
			"Alt+ArrowUp": (e) => l(!0, e, "last")
		}
	}), d = Gi(dp(cp), "@react-aria/menu"), { longPressProps: f } = Ul({
		isDisabled: i || a !== "longPress",
		accessibilityDescription: d.format("longPressMessage"),
		onLongPressStart() {
			t.close();
		},
		onLongPress() {
			t.open("first");
		}
	}), p = {
		preventFocusOnPress: !0,
		onPressStart(e) {
			e.pointerType !== "touch" && e.pointerType !== "keyboard" && !i && ($n(e.target), t.open(e.pointerType === "virtual" ? "first" : null));
		},
		onPress(e) {
			e.pointerType === "touch" && !i && ($n(e.target), t.toggle());
		}
	};
	delete s.onPress;
	let { contextMenuProps: m } = lp({ onContextMenu(e) {
		let n = e.target.getBoundingClientRect();
		t.setPoint({
			x: n.x + e.x,
			y: n.y + e.y
		}), t.open();
	} });
	(0, N.useEffect)(() => {
		if (t.isOpen && a === "contextMenu") {
			let e = (e) => {
				(e.button === 2 || e.button === 0 && e.ctrlKey === !0) && K(e) === document.body && t.close();
			};
			return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
		}
	}, [t, a]);
	let h;
	if (a === "press") h = {
		...p,
		...u
	};
	else if (a === "longPress") h = {
		...f,
		...u
	};
	else if (a === "contextMenu") {
		h = m;
		let { "aria-haspopup": e, "aria-expanded": t, "aria-controls": n, ...r } = s;
		s = r;
	}
	return {
		menuTriggerProps: {
			...s,
			...h,
			id: o
		},
		menuProps: {
			...c,
			"aria-labelledby": o,
			autoFocus: t.focusStrategy || !0,
			onClose: t.close
		}
	};
}
//#endregion
//#region node_modules/react-aria-components/dist/private/Dialog.mjs
var pp = /*#__PURE__*/ (0, N.createContext)(null);
//#endregion
//#region node_modules/react-aria/dist/private/i18n/useListFormatter.mjs
function mp(e = {}) {
	let { locale: t } = ji();
	return (0, N.useMemo)(() => new Intl.ListFormat(t, e), [t, e]);
}
//#endregion
//#region node_modules/react-aria/dist/private/radio/utils.mjs
var hp = /* @__PURE__ */ new WeakMap();
//#endregion
//#region node_modules/react-aria/dist/private/radio/useRadio.mjs
function gp(e, t, n) {
	let { value: r, children: i, "aria-label": a, "aria-labelledby": o, onPressStart: s, onPressEnd: c, onPressChange: l, onPress: u, onPressUp: d, onClick: f } = e, p = e.isDisabled || t.isDisabled, m = t.selectedValue === r, h = (e) => {
		e.stopPropagation(), t.setSelectedValue(r);
	}, { pressProps: g, isPressed: _ } = Ao({
		onPressStart: s,
		onPressEnd: c,
		onPressChange: l,
		onPress: u,
		onPressUp: d,
		onClick: f,
		isDisabled: p
	}), { pressProps: v, isPressed: y } = Ao({
		onPressStart: s,
		onPressEnd: c,
		onPressChange: l,
		onPressUp: d,
		onClick: f,
		isDisabled: p,
		onPress(e) {
			u?.(e), t.setSelectedValue(r), n.current?.focus();
		}
	}), { focusableProps: b } = Na(U(e, { onFocus: () => t.setLastFocusedValue(r) }), n), x = U(g, b), S = ho(e, { labelable: !0 }), C = -1;
	t.selectedValue == null ? (t.lastFocusedValue === r || t.lastFocusedValue == null) && (C = 0) : t.selectedValue === r && (C = 0), p && (C = void 0);
	let { name: w, form: T, descriptionId: E, errorMessageId: D, validationBehavior: O } = hp.get(t);
	Ps(n, t.defaultSelectedValue, t.setSelectedValue), Fs({ validationBehavior: O }, t, n);
	let k = Bs();
	return {
		labelProps: U(v, (0, N.useMemo)(() => ({
			onClick: (e) => e.preventDefault(),
			onMouseDown: (e) => e.preventDefault()
		}), [])),
		inputProps: U(S, {
			...x,
			type: "radio",
			name: w,
			form: T,
			tabIndex: C,
			disabled: p,
			required: t.isRequired && O === "native",
			checked: m,
			value: r,
			onChange: h,
			"aria-describedby": [
				e["aria-describedby"],
				k.id,
				t.isInvalid ? D : null,
				E
			].filter(Boolean).join(" ") || void 0
		}),
		descriptionProps: k,
		isDisabled: p,
		isSelected: m,
		isPressed: _ || y
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/radio/useRadioGroup.mjs
function _p(e, t) {
	let { name: n, form: r, isReadOnly: i, isRequired: a, isDisabled: o, orientation: s = "vertical", validationBehavior: c = "aria" } = e, { direction: l } = ji(), { isInvalid: u, validationErrors: d, validationDetails: f } = t.displayValidation, { labelProps: p, fieldProps: m, descriptionProps: h, errorMessageProps: g } = Ns({
		...e,
		labelElementType: "span",
		isInvalid: t.isInvalid,
		errorMessage: e.errorMessage || d
	}), _ = ho(e, { labelable: !0 }), { focusWithinProps: v } = Lo({
		onBlurWithin(n) {
			e.onBlur?.(n), t.selectedValue || t.setLastFocusedValue(null);
		},
		onFocusWithin: e.onFocus,
		onFocusWithinChange: e.onFocusChange
	});
	function y(e, n) {
		let r = Sl(n.currentTarget, {
			from: K(n),
			accept: (e) => e instanceof Ln(e).HTMLInputElement && e.type === "radio"
		}), i;
		return e === "next" ? (i = r.nextNode(), i ||= (r.currentNode = n.currentTarget, r.firstChild())) : (i = r.previousNode(), i ||= (r.currentNode = n.currentTarget, r.lastChild())), i ? (i.focus(), t.setSelectedValue(i.value), !0) : !1;
	}
	let { keyboardProps: b } = ka({
		shortcuts: {
			ArrowRight: (e) => y(l === "rtl" && s !== "vertical" ? "prev" : "next", e),
			ArrowLeft: (e) => y(l === "rtl" && s !== "vertical" ? "next" : "prev", e),
			ArrowDown: (e) => y("next", e),
			ArrowUp: (e) => y("prev", e)
		},
		allowRepeats: !0
	}), x = _n(n);
	return hp.set(t, {
		name: x,
		form: r,
		descriptionId: h.id,
		errorMessageId: g.id,
		validationBehavior: c
	}), {
		radioGroupProps: U(_, {
			role: "radiogroup",
			...b,
			"aria-invalid": t.isInvalid || void 0,
			"aria-errormessage": e["aria-errormessage"],
			"aria-readonly": i || void 0,
			"aria-required": a || void 0,
			"aria-disabled": o || void 0,
			"aria-orientation": s,
			...m,
			...v
		}),
		labelProps: p,
		descriptionProps: h,
		errorMessageProps: g,
		isInvalid: u,
		validationErrors: d,
		validationDetails: f
	};
}
//#endregion
//#region node_modules/react-stately/dist/private/radio/useRadioGroupState.mjs
var vp = Math.round(Math.random() * 1e10), yp = 0;
function bp(e) {
	let t = (0, N.useMemo)(() => e.name || `radio-group-${vp}-${++yp}`, [e.name]), [n, r] = qi(e.value, e.defaultValue ?? null, e.onChange), [i] = (0, N.useState)(n), [a, o] = (0, N.useState)(null), s = Ts({
		...e,
		value: n
	}), c = (t) => {
		!e.isReadOnly && !e.isDisabled && (r(t), s.commitValidation());
	}, l = s.displayValidation.isInvalid;
	return {
		...s,
		name: t,
		selectedValue: n,
		defaultSelectedValue: e.value === void 0 ? e.defaultValue ?? null : i,
		setSelectedValue: c,
		lastFocusedValue: a,
		setLastFocusedValue: o,
		isDisabled: e.isDisabled || !1,
		isReadOnly: e.isReadOnly || !1,
		isRequired: e.isRequired || !1,
		validationState: e.validationState || (l ? "invalid" : null),
		isInvalid: l
	};
}
//#endregion
//#region node_modules/react-aria-components/dist/private/RadioGroup.mjs
var xp = /*#__PURE__*/ (0, N.createContext)(null), Sp = /*#__PURE__*/ (0, N.createContext)(null), Cp = /*#__PURE__*/ (0, N.createContext)(null), wp = /*#__PURE__*/ (0, N.forwardRef)(function(e, t) {
	[e, t] = kn(e, t, xp);
	let { validationBehavior: n } = On(js) || {}, r = e.validationBehavior ?? n ?? "native", i = bp({
		...e,
		validationBehavior: r
	}), [a, o] = An(!e["aria-label"] && !e["aria-labelledby"]), { radioGroupProps: s, labelProps: c, descriptionProps: l, errorMessageProps: u, ...d } = _p({
		...e,
		label: o,
		validationBehavior: r
	}, i), f = Dn({
		...e,
		values: {
			orientation: e.orientation || "vertical",
			isDisabled: i.isDisabled,
			isReadOnly: i.isReadOnly,
			isRequired: i.isRequired,
			isInvalid: i.isInvalid,
			state: i
		},
		defaultClassName: "react-aria-RadioGroup"
	}), p = ho(e, { global: !0 });
	return /*#__PURE__*/ N.createElement(Pn.div, {
		...U(p, f, s),
		ref: t,
		slot: e.slot || void 0,
		"data-orientation": e.orientation || "vertical",
		"data-invalid": i.isInvalid || void 0,
		"data-disabled": i.isDisabled || void 0,
		"data-readonly": i.isReadOnly || void 0,
		"data-required": i.isRequired || void 0
	}, /*#__PURE__*/ N.createElement(En, { values: [
		[Cp, i],
		[Go, {
			...c,
			ref: a,
			elementType: "span"
		}],
		[as, { slots: {
			description: l,
			errorMessage: u
		} }],
		[ys, d]
	] }, /*#__PURE__*/ N.createElement(Gc, null, f.children)));
}), Tp = /*#__PURE__*/ (0, N.forwardRef)(function(e, t) {
	let { inputRef: n = null, ...r } = e;
	[e, t] = kn(r, t, Sp);
	let i = N.useContext(Cp), a = wn((0, N.useMemo)(() => bn(n, e.inputRef === void 0 ? null : e.inputRef), [n, e.inputRef])), o = gp({
		...jn(e),
		children: typeof e.children == "function" || e.children
	}, i, a);
	return /*#__PURE__*/ N.createElement(Ep.Provider, { value: {
		...o,
		inputRef: a,
		defaultClassName: "react-aria-Radio"
	} }, /*#__PURE__*/ N.createElement(Dp, {
		...e,
		ref: t
	}));
}), Ep = /*#__PURE__*/ (0, N.createContext)(null), Dp = /*#__PURE__*/ (0, N.forwardRef)(function(e, t) {
	let { labelProps: n, inputProps: r, isSelected: i, isDisabled: a, isPressed: o, defaultClassName: s, inputRef: c } = (0, N.useContext)(Ep), l = N.useContext(Cp), { isFocused: u, isFocusVisible: d, focusProps: f } = Ro(), p = a || l.isReadOnly, { hoverProps: m, isHovered: h } = Wo({
		...e,
		isDisabled: p
	}), g = Dn({
		...e,
		defaultClassName: s,
		values: {
			isSelected: i,
			isPressed: o,
			isHovered: h,
			isFocused: u,
			isFocusVisible: d,
			isDisabled: a,
			isReadOnly: l.isReadOnly,
			isInvalid: l.isInvalid,
			isRequired: l.isRequired
		}
	}), _ = ho(e, { global: !0 });
	return delete _.id, delete _.onClick, /*#__PURE__*/ N.createElement(Pn.label, {
		...U(_, n, m, g),
		ref: t,
		"data-selected": i || void 0,
		"data-pressed": o || void 0,
		"data-hovered": h || void 0,
		"data-focused": u || void 0,
		"data-focus-visible": d || void 0,
		"data-disabled": a || void 0,
		"data-readonly": l.isReadOnly || void 0,
		"data-invalid": l.isInvalid || void 0,
		"data-required": l.isRequired || void 0
	}, /*#__PURE__*/ N.createElement(vs, { elementType: "span" }, /*#__PURE__*/ N.createElement("input", {
		...U(r, f),
		ref: c
	})), g.children);
}), Op = /* @__PURE__ */ new WeakMap();
function kp(e, t, n) {
	let { keyboardDelegate: r, isDisabled: i, isRequired: a, name: o, form: s, validationBehavior: c = "aria" } = e, l = zl({
		usage: "search",
		sensitivity: "base"
	}), u = (0, N.useMemo)(() => r || new Ll(t.collection, t.disabledKeys, n, l), [
		r,
		t.collection,
		t.disabledKeys,
		l,
		n
	]), { menuTriggerProps: d, menuProps: f } = fp({
		isDisabled: i,
		type: "listbox"
	}, t, n), { keyboardProps: p } = ka({
		shortcuts: {
			ArrowLeft: () => {
				if (t.selectionManager.selectionMode === "multiple") return !1;
				let e = t.selectedKey == null ? u.getFirstKey?.() : u.getKeyAbove?.(t.selectedKey);
				e != null && t.setSelectedKey(e);
			},
			ArrowRight: () => {
				if (t.selectionManager.selectionMode === "multiple") return !1;
				let e = t.selectedKey == null ? u.getFirstKey?.() : u.getKeyBelow?.(t.selectedKey);
				e != null && t.setSelectedKey(e);
			}
		},
		allowRepeats: !0,
		onKeyDown: e.onKeyDown,
		onKeyUp: e.onKeyUp
	}), { typeSelectProps: m } = Ml({
		keyboardDelegate: u,
		selectionManager: t.selectionManager,
		onTypeSelect(e) {
			t.setSelectedKey(e);
		}
	}), { isInvalid: h, validationErrors: g, validationDetails: _ } = t.displayValidation, { labelProps: v, fieldProps: y, descriptionProps: b, errorMessageProps: x } = Ns({
		...e,
		labelElementType: "span",
		isInvalid: h,
		errorMessage: e.errorMessage || g
	});
	t.selectionManager.selectionMode === "multiple" && (m = {});
	let S = ho(e, { labelable: !0 }), C = U(m, d, y), w = _n();
	return Op.set(t, {
		isDisabled: i,
		isRequired: a,
		name: o,
		form: s,
		validationBehavior: c
	}), {
		labelProps: {
			...v,
			onClick: () => {
				e.isDisabled || (n.current?.focus(), $r("keyboard"));
			}
		},
		triggerProps: U(S, {
			...C,
			isDisabled: i,
			onKeyDown: Qt(C.onKeyDown, p.onKeyDown),
			onKeyUp: p.onKeyUp,
			"aria-labelledby": [
				w,
				C["aria-labelledby"],
				C["aria-label"] && !C["aria-labelledby"] ? C.id : null
			].filter(Boolean).join(" "),
			onFocus(n) {
				t.isFocused || (e.onFocus && e.onFocus(n), e.onFocusChange && e.onFocusChange(!0), t.setFocused(!0));
			},
			onBlur(n) {
				t.isOpen || (e.onBlur && e.onBlur(n), e.onFocusChange && e.onFocusChange(!1), t.setFocused(!1));
			}
		}),
		valueProps: { id: w },
		menuProps: {
			...f,
			onAction: void 0,
			autoFocus: t.focusStrategy || !0,
			shouldSelectOnPressUp: !0,
			shouldFocusOnHover: !0,
			disallowEmptySelection: !0,
			linkBehavior: "selection",
			onBlur: (n) => {
				G(n.currentTarget, n.relatedTarget) || (e.onBlur && e.onBlur(n), e.onFocusChange && e.onFocusChange(!1), t.setFocused(!1));
			},
			"aria-labelledby": [y["aria-labelledby"], C["aria-label"] && !y["aria-labelledby"] ? C.id : null].filter(Boolean).join(" ")
		},
		descriptionProps: b,
		errorMessageProps: x,
		isInvalid: h,
		validationErrors: g,
		validationDetails: _,
		hiddenSelectProps: {
			isDisabled: i,
			name: o,
			label: e.label,
			state: t,
			triggerRef: n,
			form: s
		}
	};
}
//#endregion
//#region node_modules/react-aria/dist/private/select/HiddenSelect.mjs
function Ap(e, t, n) {
	let r = Op.get(t) || {}, { autoComplete: i, name: a = r.name, form: o = r.form, isDisabled: s = r.isDisabled } = e, { validationBehavior: c, isRequired: l } = r, { visuallyHiddenProps: u } = _s({ style: {
		position: "fixed",
		top: 0,
		left: 0
	} });
	Ps(e.selectRef, t.defaultValue, t.setValue), Fs({
		validationBehavior: c,
		focus: () => n.current?.focus()
	}, t, e.selectRef);
	let d = t.setValue, f = (0, N.useCallback)((e) => {
		let t = K(e);
		t.multiple ? d(Array.from(t.selectedOptions, (e) => e.value)) : d(e.currentTarget.value);
	}, [d]);
	return {
		containerProps: {
			...u,
			"aria-hidden": !0,
			"data-react-aria-prevent-focus": !0,
			"data-a11y-ignore": "aria-hidden-focus"
		},
		inputProps: { style: { display: "none" } },
		selectProps: {
			tabIndex: -1,
			autoComplete: i,
			disabled: s,
			multiple: t.selectionManager.selectionMode === "multiple",
			required: c === "native" && l,
			name: a,
			form: o,
			value: t.value ?? "",
			onChange: f,
			onInput: f
		}
	};
}
function jp(e) {
	let { state: t, triggerRef: n, label: r, name: i, form: a, isDisabled: o } = e, s = (0, N.useRef)(null), c = (0, N.useRef)(null), { containerProps: l, selectProps: u } = Ap({
		...e,
		selectRef: t.collection.size <= 300 ? s : c
	}, t, n), d = Array.isArray(t.value) ? t.value : [t.value];
	if (t.collection.size <= 300) return /*#__PURE__*/ N.createElement("div", {
		...l,
		"data-testid": "hidden-select-container"
	}, /*#__PURE__*/ N.createElement("label", null, r, /*#__PURE__*/ N.createElement("select", {
		...u,
		ref: s
	}, /*#__PURE__*/ N.createElement("option", {
		value: "",
		label: "\xA0"
	}, "\xA0"), [...t.collection.getKeys()].map((e) => {
		let n = t.collection.getItem(e);
		if (n && n.type === "item") return /*#__PURE__*/ N.createElement("option", {
			key: n.key,
			value: n.key
		}, n.textValue);
	}), t.collection.size === 0 && i && d.map((e, t) => /*#__PURE__*/ N.createElement("option", {
		key: t,
		value: e ?? ""
	})))));
	if (i) {
		let { validationBehavior: e } = Op.get(t) || {};
		d.length === 0 && (d = [null]);
		let n = d.map((t, n) => {
			let r = {
				type: "hidden",
				autoComplete: u.autoComplete,
				name: i,
				form: a,
				disabled: o,
				value: t ?? ""
			};
			return e === "native" ? /*#__PURE__*/ N.createElement("input", {
				key: n,
				...r,
				ref: n === 0 ? c : null,
				style: { display: "none" },
				type: "text",
				required: n === 0 && u.required,
				onChange: () => {}
			}) : /*#__PURE__*/ N.createElement("input", {
				key: n,
				...r,
				ref: n === 0 ? c : null
			});
		});
		return /*#__PURE__*/ N.createElement(N.Fragment, null, n);
	}
	return null;
}
//#endregion
//#region node_modules/react-stately/dist/private/select/useSelectState.mjs
function Mp(e) {
	let { selectionMode: t = "single", shouldCloseOnSelect: n = t === "single" } = e, r = xf(e), [i, a] = (0, N.useState)(null), o = (0, N.useMemo)(() => e.defaultValue === void 0 ? t === "single" ? e.defaultSelectedKey ?? null : [] : e.defaultValue, [
		e.defaultValue,
		e.defaultSelectedKey,
		t
	]), [s, c] = qi((0, N.useMemo)(() => e.value === void 0 ? t === "single" ? e.selectedKey : void 0 : e.value, [
		e.value,
		e.selectedKey,
		t
	]), o, e.onChange), l = t === "single" && Array.isArray(s) ? s[0] : s, u = (n) => {
		if (t === "single") {
			let t = Array.isArray(n) ? n[0] ?? null : n;
			c(t), t !== l && e.onSelectionChange?.(t);
		} else {
			let e = [];
			Array.isArray(n) ? e = n : n != null && (e = [n]), c(e);
		}
	}, d = mu({
		...e,
		selectionMode: t,
		disallowEmptySelection: t === "single",
		allowDuplicateSelectionEvents: !0,
		selectedKeys: (0, N.useMemo)(() => Np(l), [l]),
		onSelectionChange: (e) => {
			if (e !== "all") {
				if (t === "single") {
					let t = e.values().next().value ?? null;
					u(t);
				} else u([...e]);
				n && r.close(), m.commitValidation();
			}
		}
	}), f = d.selectionManager.firstSelectedKey, p = (0, N.useMemo)(() => [...d.selectionManager.selectedKeys].map((e) => d.collection.getItem(e)).filter((e) => e != null), [d.selectionManager.selectedKeys, d.collection]), m = Ts({
		...e,
		value: Array.isArray(l) && l.length === 0 ? null : l
	}), [h, g] = (0, N.useState)(!1), [_] = (0, N.useState)(l);
	return {
		...m,
		...d,
		...r,
		value: l,
		defaultValue: o ?? _,
		setValue: u,
		selectedKey: f,
		setSelectedKey: u,
		selectedItem: p[0] ?? null,
		selectedItems: p,
		defaultSelectedKey: e.defaultSelectedKey ?? (e.selectionMode === "single" ? _ : null),
		focusStrategy: i,
		open(t = null) {
			(d.collection.size !== 0 || e.allowsEmptyCollection) && (a(t), r.open());
		},
		toggle(t = null) {
			(d.collection.size !== 0 || e.allowsEmptyCollection) && (a(t), r.toggle());
		},
		isFocused: h,
		setFocused: g
	};
}
function Np(e) {
	if (e !== void 0) return e === null ? [] : Array.isArray(e) ? e : [e];
}
//#endregion
//#region node_modules/react-aria-components/dist/private/Select.mjs
function Pp(e) {
	return e && e.__esModule ? e.default : e;
}
var Fp = /*#__PURE__*/ (0, N.createContext)(null), Ip = /*#__PURE__*/ (0, N.createContext)(null), Lp = /*#__PURE__*/ Ia(function(e, t) {
	[e, t] = kn(e, t, Fp);
	let { children: n, isDisabled: r = !1, isInvalid: i = !1, isRequired: a = !1 } = e, o = (0, N.useMemo)(() => typeof n == "function" ? n({
		isOpen: !1,
		isDisabled: r,
		isInvalid: i,
		isRequired: a,
		isFocused: !1,
		isFocusVisible: !1,
		defaultChildren: null
	}) : n, [
		n,
		r,
		i,
		a
	]);
	return /*#__PURE__*/ N.createElement(Wa, { content: o }, (n) => /*#__PURE__*/ N.createElement(zp, {
		props: e,
		collection: n,
		selectRef: t
	}));
}), Rp = [
	Go,
	ts,
	as
];
function zp({ props: e, selectRef: t, collection: n }) {
	let { validationBehavior: r } = On(js) || {}, i = e.validationBehavior ?? r ?? "native", a = Mp({
		...e,
		collection: n,
		children: void 0,
		validationBehavior: i
	}), { isFocusVisible: o, focusProps: s } = Ro({ within: !0 }), c = (0, N.useRef)(null), [l, u] = An(!e["aria-label"] && !e["aria-labelledby"]), { labelProps: d, triggerProps: f, valueProps: p, menuProps: m, descriptionProps: h, errorMessageProps: g, hiddenSelectProps: _, ...v } = kp({
		...jn(e),
		label: u,
		validationBehavior: i
	}, a, c), y = (0, N.useMemo)(() => ({
		isOpen: a.isOpen,
		isFocused: a.isFocused,
		isFocusVisible: o,
		isDisabled: e.isDisabled || !1,
		isInvalid: v.isInvalid || !1,
		isRequired: e.isRequired || !1
	}), [
		a.isOpen,
		a.isFocused,
		o,
		e.isDisabled,
		v.isInvalid,
		e.isRequired
	]), b = Dn({
		...e,
		values: y,
		defaultClassName: "react-aria-Select"
	}), x = ho(e, { global: !0 });
	delete x.id;
	let S = (0, N.useRef)(null);
	return /*#__PURE__*/ N.createElement(En, { values: [
		[Fp, e],
		[Ip, a],
		[Bp, p],
		[Go, {
			...d,
			ref: l,
			elementType: "span"
		}],
		[ts, {
			...f,
			ref: c,
			isPressed: a.isOpen,
			autoFocus: e.autoFocus
		}],
		[pp, a],
		[Tf, {
			trigger: "Select",
			triggerRef: c,
			scrollRef: S,
			placement: "bottom start",
			"aria-labelledby": m["aria-labelledby"],
			clearContexts: Rp
		}],
		[vu, {
			...m,
			ref: S
		}],
		[yu, a],
		[as, { slots: {
			description: h,
			errorMessage: g
		} }],
		[ys, v]
	] }, /*#__PURE__*/ N.createElement(Pn.div, {
		...U(x, b, s),
		ref: t,
		slot: e.slot || void 0,
		"data-focused": a.isFocused || void 0,
		"data-focus-visible": o || void 0,
		"data-open": a.isOpen || void 0,
		"data-disabled": e.isDisabled || void 0,
		"data-invalid": v.isInvalid || void 0,
		"data-required": e.isRequired || void 0
	}, b.children, /*#__PURE__*/ N.createElement(jp, {
		..._,
		autoComplete: e.autoComplete
	})));
}
var Bp = /*#__PURE__*/ (0, N.createContext)(null), Vp = /*#__PURE__*/ Ia(function(e, t) {
	[e, t] = kn(e, t, Bp);
	let n = (0, N.useContext)(Ip), { placeholder: r } = On(Fp), i = n.selectedItems.map((e) => {
		let t = e.props?.children;
		return typeof t == "function" && (t = t({
			isHovered: !1,
			isPressed: !1,
			isSelected: !1,
			isFocused: !1,
			isFocusVisible: !1,
			isDisabled: !1,
			selectionMode: "single",
			selectionBehavior: "toggle"
		})), t;
	}), a = mp(), o = (0, N.useMemo)(() => n.selectedItems.map((e) => e?.textValue), [n.selectedItems]), s = n.selectionManager.selectionMode, c = (0, N.useMemo)(() => s === "single" ? o[0] ?? "" : a.format(o), [
		s,
		a,
		o
	]), l = (0, N.useMemo)(() => {
		if (s === "single") return i[0];
		let e = a.formatToParts(o);
		if (e.length === 0) return null;
		let t = 0;
		return e.map((e) => e.type === "element" ? /*#__PURE__*/ N.createElement(N.Fragment, { key: t }, i[t++]) : e.value);
	}, [
		s,
		a,
		o,
		i
	]), u = Gi(Pp(Lc), "react-aria-components"), d = Dn({
		...e,
		defaultChildren: l ?? r ?? u.format("selectPlaceholder"),
		defaultClassName: "react-aria-SelectValue",
		values: {
			selectedItem: n.selectedItems[0]?.value ?? null,
			selectedItems: (0, N.useMemo)(() => n.selectedItems.map((e) => e.value ?? null), [n.selectedItems]),
			selectedText: c,
			isPlaceholder: n.selectedItems.length === 0,
			state: n
		}
	}), f = ho(e, { global: !0 });
	return /*#__PURE__*/ N.createElement(Pn.span, {
		ref: t,
		...f,
		...d,
		"data-placeholder": n.selectedItems.length === 0 || void 0
	}, /*#__PURE__*/ N.createElement(as.Provider, { value: void 0 }, d.children));
});
//#endregion
//#region node_modules/react-aria/dist/private/switch/useSwitch.mjs
function Hp(e, t, n) {
	let { labelProps: r, inputProps: i, isSelected: a, ...o } = Vs(e, t, n);
	return {
		labelProps: r,
		inputProps: {
			...i,
			role: "switch",
			checked: a
		},
		isSelected: a,
		...o
	};
}
//#endregion
//#region node_modules/react-aria-components/dist/private/Switch.mjs
var Up = /*#__PURE__*/ (0, N.createContext)(null), Wp = /*#__PURE__*/ (0, N.createContext)(null), Gp = /*#__PURE__*/ (0, N.forwardRef)(function(e, t) {
	let { inputRef: n = null, ...r } = e;
	[e, t] = kn(r, t, Up);
	let i = wn((0, N.useMemo)(() => bn(n, e.inputRef === void 0 ? null : e.inputRef), [n, e.inputRef])), a = Us(e), o = Hp({
		...jn(e),
		children: typeof e.children == "function" || e.children
	}, a, i);
	return /*#__PURE__*/ N.createElement(En, { values: [[Wp, a], [Kp, {
		...o,
		inputRef: i,
		defaultClassName: "react-aria-Switch"
	}]] }, /*#__PURE__*/ N.createElement(qp, {
		...e,
		ref: t
	}));
}), Kp = /*#__PURE__*/ (0, N.createContext)(null), qp = /*#__PURE__*/ (0, N.forwardRef)(function(e, t) {
	let { labelProps: n, inputProps: r, isSelected: i, isDisabled: a, isReadOnly: o, isPressed: s, isInvalid: c, inputRef: l, defaultClassName: u, isRequired: d } = (0, N.useContext)(Kp), { isFocused: f, isFocusVisible: p, focusProps: m } = Ro(), h = a || o, g = (0, N.useContext)(Wp), { hoverProps: _, isHovered: v } = Wo({
		...e,
		isDisabled: h
	}), y = Dn({
		...e,
		defaultClassName: u,
		values: {
			isSelected: i,
			isPressed: s,
			isHovered: v,
			isFocused: f,
			isFocusVisible: p,
			isDisabled: a,
			isReadOnly: o,
			isInvalid: c,
			isRequired: d || !1,
			state: g
		}
	}), b = ho(e, { global: !0 });
	return delete b.id, delete b.onClick, /*#__PURE__*/ N.createElement(Pn.label, {
		...U(b, n, _, y),
		ref: t,
		slot: e.slot || void 0,
		"data-selected": i || void 0,
		"data-pressed": s || void 0,
		"data-hovered": v || void 0,
		"data-focused": f || void 0,
		"data-focus-visible": p || void 0,
		"data-disabled": a || void 0,
		"data-readonly": o || void 0,
		"data-invalid": c || void 0,
		"data-required": d || void 0
	}, /*#__PURE__*/ N.createElement(vs, { elementType: "span" }, /*#__PURE__*/ N.createElement("input", {
		...U(r, m),
		ref: l
	})), y.children);
}), Jp = /*#__PURE__*/ (0, N.createContext)({}), Yp = /*#__PURE__*/ (0, N.createContext)(null), Xp = /*#__PURE__*/ Ia(function(e, t) {
	[e, t] = kn(e, t, Yp);
	let { validationBehavior: n } = On(js) || {}, r = e.validationBehavior ?? n ?? "native", i = (0, N.useRef)(null);
	[e, i] = kn(e, i, Yi);
	let [a, o] = An(!e["aria-label"] && !e["aria-labelledby"]), [s, c] = (0, N.useState)("input"), { labelProps: l, inputProps: u, descriptionProps: d, errorMessageProps: f, ...p } = nc({
		...jn(e),
		inputElementType: s,
		label: o,
		validationBehavior: r
	}, i), m = (0, N.useCallback)((e) => {
		i.current = e, e && c(e instanceof HTMLTextAreaElement ? "textarea" : "input");
	}, [i]), h = Dn({
		...e,
		values: {
			isDisabled: e.isDisabled || !1,
			isInvalid: p.isInvalid,
			isReadOnly: e.isReadOnly || !1,
			isRequired: e.isRequired || !1
		},
		defaultClassName: "react-aria-TextField"
	}), g = ho(e, { global: !0 });
	return delete g.id, /*#__PURE__*/ N.createElement(Pn.div, {
		...g,
		...h,
		ref: t,
		slot: e.slot || void 0,
		"data-disabled": e.isDisabled || void 0,
		"data-invalid": p.isInvalid || void 0,
		"data-readonly": e.isReadOnly || void 0,
		"data-required": e.isRequired || void 0
	}, /*#__PURE__*/ N.createElement(En, { values: [
		[Go, {
			...l,
			ref: a
		}],
		[$s, {
			...u,
			ref: m
		}],
		[Jp, {
			...u,
			ref: m
		}],
		[Zs, {
			role: "presentation",
			isInvalid: p.isInvalid,
			isDisabled: e.isDisabled || !1
		}],
		[as, { slots: {
			description: d,
			errorMessage: f
		} }],
		[ys, p]
	] }, h.children));
}), Zp = {
	md: {
		box: "size-4",
		glyph: "size-4",
		label: "text-body-medium",
		gap: "gap-2"
	},
	sm: {
		box: "size-3.5",
		glyph: "size-3.5",
		label: "text-body-2-medium",
		gap: "gap-1.5"
	}
};
function Qp({ state: e, size: t = "md" }) {
	let { isSelected: n, isIndeterminate: r, isFocusVisible: i, isDisabled: a, isHovered: o } = e, s = Zp[t], c = n || r, l = o && !a;
	return /* @__PURE__ */ (0, B.jsx)("span", {
		"aria-hidden": !0,
		className: z("flex shrink-0 items-center justify-center rounded-sm", "transition-[background-color,border-color,box-shadow] duration-150 ease", s.box, c ? z("bg-linear-to-b shadow-checkbox-selected", l ? "from-accent-400 to-accent-500" : "from-accent-500 to-accent-600") : z("border bg-background-primary-default shadow-xs", l ? "border-border-checkbox-hover" : "border-border-checkbox-default"), a && "opacity-50", i && "ring-2 ring-border-focus-ring ring-offset-2"),
		children: /* @__PURE__ */ (0, B.jsx)("svg", {
			viewBox: "0 0 16 16",
			fill: "none",
			className: s.glyph,
			children: r ? /* @__PURE__ */ (0, B.jsx)("path", {
				d: "M4.5 8H8H11.5",
				stroke: "white",
				strokeWidth: "2",
				strokeLinecap: "round"
			}) : n ? /* @__PURE__ */ (0, B.jsx)("path", {
				d: "M4 7.7002L6.64645 10.3466C6.84171 10.5419 7.15829 10.5419 7.35355 10.3466L12 5.7002",
				stroke: "white",
				strokeWidth: "2",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				pathLength: 1,
				className: "animate-check-draw"
			}) : null
		})
	});
}
//#endregion
//#region src/react/boardui/components/base/checkbox/checkbox.tsx
function $p({ className: e, children: t, size: n = "md", ref: r, ...i }) {
	let a = Zp[n];
	return /* @__PURE__ */ (0, B.jsx)(Ys, {
		ref: r,
		...i,
		className: (t) => z("group inline-flex items-center select-none", a.gap, t.isDisabled ? "cursor-not-allowed" : "cursor-pointer", typeof e == "function" ? e(t) : e),
		children: (e) => /* @__PURE__ */ (0, B.jsxs)(B.Fragment, { children: [/* @__PURE__ */ (0, B.jsx)(Qp, {
			state: e,
			size: n
		}), t != null && /* @__PURE__ */ (0, B.jsx)("span", {
			className: z(a.label, "text-text-primary"),
			children: t
		})] })
	});
}
//#endregion
//#region node_modules/@remixicon/react/index.mjs
var em = ({ color: e = "currentColor", size: t = 24, className: n, ...r }) => N.createElement("svg", {
	viewBox: "0 0 24 24",
	xmlns: "http://www.w3.org/2000/svg",
	width: t,
	height: t,
	fill: e,
	...r,
	className: "remixicon " + (n || "")
}, N.createElement("path", { d: "M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" })), tm = ({ color: e = "currentColor", size: t = 24, className: n, ...r }) => N.createElement("svg", {
	viewBox: "0 0 24 24",
	xmlns: "http://www.w3.org/2000/svg",
	width: t,
	height: t,
	fill: e,
	...r,
	className: "remixicon " + (n || "")
}, N.createElement("path", { d: "M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z" })), nm = ({ color: e = "currentColor", size: t = 24, className: n, ...r }) => N.createElement("svg", {
	viewBox: "0 0 24 24",
	xmlns: "http://www.w3.org/2000/svg",
	width: t,
	height: t,
	fill: e,
	...r,
	className: "remixicon " + (n || "")
}, N.createElement("path", { d: "M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z" })), rm = ({ color: e = "currentColor", size: t = 24, className: n, ...r }) => N.createElement("svg", {
	viewBox: "0 0 24 24",
	xmlns: "http://www.w3.org/2000/svg",
	width: t,
	height: t,
	fill: e,
	...r,
	className: "remixicon " + (n || "")
}, N.createElement("path", { d: "M10 6V8H5V19H16V14H18V20C18 20.5523 17.5523 21 17 21H4C3.44772 21 3 20.5523 3 20V7C3 6.44772 3.44772 6 4 6H10ZM21 3V11H19L18.9999 6.413L11.2071 14.2071L9.79289 12.7929L17.5849 5H13V3H21Z" })), im = ({ color: e = "currentColor", size: t = 24, className: n, ...r }) => N.createElement("svg", {
	viewBox: "0 0 24 24",
	xmlns: "http://www.w3.org/2000/svg",
	width: t,
	height: t,
	fill: e,
	...r,
	className: "remixicon " + (n || "")
}, N.createElement("path", { d: "M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11V17H13V11H11ZM11 7V9H13V7H11Z" }));
//#endregion
//#region src/react/boardui/components/base/input/label.tsx
function am({ isRequired: e = !1, isInvalid: t, tooltip: n, className: r, children: i, ...a }) {
	return /* @__PURE__ */ (0, B.jsxs)(Ko, {
		"data-label": "true",
		...a,
		className: z("flex cursor-default items-center gap-0.5", "text-body-medium text-text-primary", r),
		children: [
			i,
			e && /* @__PURE__ */ (0, B.jsx)("span", {
				"aria-hidden": "true",
				className: "text-body-medium text-text-error-primary",
				children: "*"
			}),
			n && /* @__PURE__ */ (0, B.jsx)(im, {
				className: "size-4 shrink-0 text-foreground-icon-quaternary",
				"aria-hidden": !0
			})
		]
	});
}
//#endregion
//#region src/react/boardui/components/base/input/hint-text.tsx
function om({ isInvalid: e = !1, className: t, ...n }) {
	return /* @__PURE__ */ (0, B.jsx)(os, {
		slot: e ? "errorMessage" : "description",
		...n,
		className: z("pt-px text-caption-1-medium text-text-secondary", e && "text-text-error-primary", t)
	});
}
//#endregion
//#region src/react/boardui/components/base/input/input.tsx
var sm = (0, N.createContext)({});
function cm({ size: e = "medium", fieldClassName: t, inputClassName: n, className: r, children: i, ...a }) {
	return /* @__PURE__ */ (0, B.jsx)(sm.Provider, {
		value: {
			size: e,
			fieldClassName: t,
			inputClassName: n
		},
		children: /* @__PURE__ */ (0, B.jsx)(Xp, {
			...a,
			"data-input-size": e,
			className: z("group flex h-max w-full flex-col items-start gap-1", r),
			children: i
		})
	});
}
cm.displayName = "TextField";
var lm = Ht({
	field: [
		"relative flex w-full items-center",
		"rounded-2lg",
		"bg-background-tertiary-default text-foreground-icon-tertiary",
		"ring-2 ring-inset ring-transparent",
		"transition-[background-color,box-shadow,color] duration-[var(--input-transition-ms)] ease"
	].join(" "),
	fieldSize: {
		medium: "p-2",
		small: "h-8 px-1.5 py-2"
	},
	fieldWithAddonSize: {
		medium: "h-9 pl-1 pr-2 py-2",
		small: "h-8 pl-1 pr-1.5 py-2"
	},
	content: "flex w-full items-center gap-2 min-w-0",
	leftSection: "flex flex-1 items-center gap-0.5 min-w-0",
	input: [
		"min-w-0 flex-1 bg-transparent border-0 outline-none p-0 m-0",
		"font-sans text-body-regular text-text-primary pl-1",
		"placeholder:text-text-tertiary",
		"focus:placeholder:text-text-primary",
		"disabled:text-input-disabled-text disabled:placeholder:text-input-disabled-text",
		"disabled:cursor-not-allowed",
		"aria-invalid:placeholder:text-text-error-placeholder"
	].join(" "),
	icon: "size-5 shrink-0"
});
function um({ size: e, leadingIcon: t, trailingIcon: n, leadingAddon: r, fieldClassName: i, className: a, ref: o, groupRef: s, ...c }) {
	let l = (0, N.useContext)(sm), u = e ?? l.size ?? "medium", d = r != null;
	return /* @__PURE__ */ (0, B.jsx)(Qs, {
		ref: s,
		className: ({ isFocusWithin: e, isHovered: t, isDisabled: n, isInvalid: r }) => z(lm.field, d ? lm.fieldWithAddonSize[u] : lm.fieldSize[u], t && !e && !n && !r && "ring-border-button-hover", e && !n && !r && "ring-border-button-active", n && "bg-input-disabled-background text-input-disabled-foreground", r && "bg-background-tertiary-error text-foreground-icon-error", l.fieldClassName, i),
		children: /* @__PURE__ */ (0, B.jsxs)("div", {
			className: lm.content,
			children: [/* @__PURE__ */ (0, B.jsxs)("div", {
				className: lm.leftSection,
				children: [d ? r : t ? /* @__PURE__ */ (0, B.jsx)(t, {
					className: lm.icon,
					"aria-hidden": !0
				}) : null, /* @__PURE__ */ (0, B.jsx)(tc, {
					ref: o,
					...c,
					className: z(lm.input, l.inputClassName, a)
				})]
			}), n ? /* @__PURE__ */ (0, B.jsx)(n, {
				className: lm.icon,
				"aria-hidden": !0
			}) : null]
		})
	});
}
um.displayName = "InputBase";
function dm({ label: e, hint: t, tooltip: n, placeholder: r, leadingIcon: i, trailingIcon: a, leadingAddon: o, fieldClassName: s, ref: c, groupRef: l, className: u, ...d }) {
	return /* @__PURE__ */ (0, B.jsx)(cm, {
		...d,
		className: u,
		"aria-label": d["aria-label"] ?? (!e && typeof r == "string" ? r : void 0),
		children: ({ isRequired: u, isInvalid: d }) => /* @__PURE__ */ (0, B.jsxs)(B.Fragment, { children: [
			e && /* @__PURE__ */ (0, B.jsx)(am, {
				isRequired: u,
				isInvalid: d,
				tooltip: n,
				children: e
			}),
			/* @__PURE__ */ (0, B.jsx)(um, {
				ref: c,
				groupRef: l,
				placeholder: r,
				leadingIcon: i,
				trailingIcon: a,
				leadingAddon: o,
				fieldClassName: s
			}),
			t && /* @__PURE__ */ (0, B.jsx)(om, {
				isInvalid: d,
				children: t
			})
		] })
	});
}
dm.displayName = "Input";
function fm({ data: e }) {
	let [t, n] = (0, N.useState)(e.error || (e.invalid === "true" ? "访问密码不正确" : ""));
	return /* @__PURE__ */ (0, B.jsx)(Kt, {
		title: "Peach",
		children: /* @__PURE__ */ (0, B.jsxs)("form", {
			method: "post",
			action: "/login",
			"aria-labelledby": "auth-card-title",
			className: "flex flex-col gap-6",
			children: [
				/* @__PURE__ */ (0, B.jsx)(dm, {
					id: "login-token",
					label: "访问密码",
					name: "token",
					type: "password",
					maxLength: 256,
					autoComplete: "current-password",
					autoFocus: !0,
					isRequired: !0,
					isInvalid: t ? !0 : void 0,
					onChange: () => n(""),
					hint: t ? /* @__PURE__ */ (0, B.jsx)("span", {
						role: "alert",
						children: t
					}) : void 0
				}),
				/* @__PURE__ */ (0, B.jsx)("input", {
					type: "hidden",
					name: "next",
					value: e.next || "/"
				}),
				/* @__PURE__ */ (0, B.jsx)($p, {
					name: "days",
					value: "30",
					defaultSelected: !0,
					children: "保持登录"
				}),
				/* @__PURE__ */ (0, B.jsx)(Wt, {
					type: "submit",
					className: "w-full",
					children: "登录"
				})
			]
		})
	});
}
//#endregion
//#region src/react/components/note.tsx
function pm({ tone: e, title: t, action: n, extra: r, children: i, actionLayout: a = "inline", className: o }) {
	let s = /* @__PURE__ */ (0, B.jsxs)(B.Fragment, { children: [/* @__PURE__ */ (0, B.jsxs)("div", {
		"data-note-layout": "",
		className: z("flex flex-col items-start gap-3", a === "inline" && "@xl:flex-row @xl:items-center @xl:justify-between"),
		children: [/* @__PURE__ */ (0, B.jsxs)("div", {
			className: "flex min-w-0 flex-1 flex-col justify-center gap-0.5 self-stretch",
			children: [t ? /* @__PURE__ */ (0, B.jsx)("p", {
				className: "text-body-medium wrap-anywhere",
				children: t
			}) : null, /* @__PURE__ */ (0, B.jsx)("p", {
				className: "whitespace-pre-line text-body-2-regular wrap-anywhere",
				children: i
			})]
		}), n ? /* @__PURE__ */ (0, B.jsx)("div", {
			"data-note-action": "",
			className: "max-w-full",
			children: n
		}) : null]
	}), r] });
	switch (e) {
		case "info": return /* @__PURE__ */ (0, B.jsx)("div", {
			role: "status",
			className: z("@container flex flex-col gap-2 rounded-2lg bg-notification-information-background px-3 py-2 text-notification-information-foreground", o),
			children: s
		});
		case "success": return /* @__PURE__ */ (0, B.jsx)("div", {
			role: "status",
			className: z("@container flex flex-col gap-2 rounded-2lg bg-notification-success-background px-3 py-2 text-notification-success-foreground", o),
			children: s
		});
		case "warning": return /* @__PURE__ */ (0, B.jsx)("div", {
			role: "note",
			className: z("@container flex flex-col gap-2 rounded-2lg bg-status-yellow-background px-3 py-2 text-status-yellow-text", o),
			children: s
		});
		case "error": return /* @__PURE__ */ (0, B.jsx)("div", {
			role: "alert",
			className: z("@container flex flex-col gap-2 rounded-2lg bg-background-tertiary-error px-3 py-2 text-text-error-primary", o),
			children: s
		});
		default: return /* @__PURE__ */ (0, B.jsx)("div", {
			role: "note",
			className: z("@container flex flex-col gap-2 rounded-2lg bg-background-tertiary-default px-3 py-2 text-text-secondary", o),
			children: s
		});
	}
}
//#endregion
//#region src/configuration-endpoints.ts
var mm = "/api/pick-folder", hm = "/api/setup/questions", gm = "/api/setup", _m = class extends Error {
	status;
	errors;
	constructor(e, t, n) {
		super(t), this.status = e, this.errors = n;
	}
};
async function vm(e, t, n) {
	let r;
	try {
		r = await fetch(e, {
			credentials: "same-origin",
			...t,
			headers: {
				Accept: "application/json",
				...t.body ? { "Content-Type": "application/json" } : {}
			}
		});
	} catch (e) {
		throw t.signal?.aborted ? e : new _m(0, "连接不到 Peach，请确认它仍在运行后重试");
	}
	let i = await r.json().catch(() => null);
	if (!r.ok) throw new _m(r.status, i?.error || n, i?.errors);
	return i;
}
var ym = (e) => vm(hm, { signal: e }, "没能读取设置题目"), bm = (e) => vm(gm, {
	method: "POST",
	body: JSON.stringify(e)
}, "没能完成设置"), xm = (e) => vm(`${gm}/restore`, {
	method: "POST",
	body: JSON.stringify({ data_root: e })
}, "没能使用此数据目录"), Sm = async (e) => (await vm(mm, {
	method: "POST",
	body: JSON.stringify({ initial: e })
}, "没能打开文件夹对话框")).path, Cm = (e) => e instanceof Error && e.message || "请求失败，请重试", wm = 8e3, Tm = /* @__PURE__ */ new WeakMap();
function Em(e, t, n) {
	t.classList.add("ui-fcollapse");
	let r = (Tm.get(t) || 0) + 1;
	Tm.set(t, r);
	let i = () => Tm.get(t) === r;
	if (n) {
		t.inert = !1;
		let n = e.open ? t.getBoundingClientRect().height : 0;
		e.open = !0, Om(t, n, i);
	} else t.inert = !0, t.classList.remove("ui-fcollapse-settled"), t.style.height = t.getBoundingClientRect().height + "px", t.getBoundingClientRect(), t.style.height = "0px", Dm(t, () => {
		i() && (e.open = !1, t.style.height = "");
	});
}
function Dm(e, t) {
	let n = !1, r, i = (a) => {
		a && a.propertyName !== "height" || n || (n = !0, e.removeEventListener("transitionend", i), clearTimeout(r), t());
	};
	e.addEventListener("transitionend", i), r = setTimeout(i, 260);
}
function Om(e, t, n = () => !0) {
	e.classList.remove("ui-fcollapse-settled"), e.style.height = t + "px", e.getBoundingClientRect(), e.style.height = e.scrollHeight + "px", Dm(e, () => {
		n() && (e.style.height = "auto", e.classList.add("ui-fcollapse-settled"));
	});
}
//#endregion
//#region ../resources/media-sources.json
var km = [
	{
		id: "local",
		name: "本地磁盘",
		label: "本地磁盘",
		default_cost: "free",
		cloud: !1,
		icon: "hard-drive"
	},
	{
		id: "115",
		name: "115",
		label: "CloudDrive · 115",
		default_cost: "free",
		cloud: !0,
		icon: "database"
	},
	{
		id: "pikpak",
		name: "PikPak",
		label: "CloudDrive · PikPak",
		default_cost: "metered",
		cloud: !0,
		icon: "database"
	},
	{
		id: "guangya",
		name: "光鸭云盘",
		label: "光鸭云盘",
		default_cost: "free",
		cloud: !0,
		icon: "database"
	},
	{
		id: "onedrive",
		name: "OneDrive",
		label: "OneDrive",
		default_cost: "metered",
		cloud: !0,
		icon: "database"
	},
	{
		id: "mounted",
		name: "其他已挂载网盘",
		label: "其他已挂载网盘",
		default_cost: "metered",
		cloud: !0,
		icon: "database"
	}
], Am = km, jm = km.map((e) => [e.id, e.label]);
km.map((e) => e.id);
var Mm = km.filter((e) => e.cloud).map((e) => e.id), Nm = Object.fromEntries(km.map((e) => [e.id, e.name])), Pm = {
	local: "hard-drive",
	guangya: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAEWUlEQVR42sWXT2hcVRTGf/fNYCZdNNPGTaHaSUXFVQZSLLowoe3GdpEERHFhYqTQRBATcWlpSly56YQu4ipNZivYxCK46Z9EsBGkHdwItdhXrLixzaASo2bucXHve/feNzOagqQXHnPf/XPOd77z3XPfKLwmkxTZit4lkiEiykQK8wA5+5v0c5i5nNj3ZJ03nwPyKpmvEekFpGNZvV6PE58qdT7BEIoLRKqYOo0g6PtOogQEDkDWeS4DVgQ0MVpNqbGNpRSATDCEcLHJYcAAzWz4QHIqZCcdswwloWr7iBpWJzeWlIxTAq4CJSK7MNmQOhXrSGXeWzj205AGAiiLQAAt0JA6HZ09eRRDCKV0UmGoUsq8SzJoKRS7DgFJxpQxmjhRXsRg5pU4AAKIKvL7xmQeGPVWerJIHBACSX9TQw5EAlB75lLnnm1t18NgHqHsAPjGvCj8KHN27rEuONgPnV3w96/wVx3urZrotefMj0n5DABalfME59CjUXwGPGDlEegbgZ5+mtpmHW5fgusz8NtdF30AwKZCa9AKJeNIYERZ4anM0esuwWvzJurttK8+hLUZY1B5gaUpMIHlW+8Wh0YL7O2BU5dhb4lttxc/sEBmnE3lmba6yrf0re1RE7vj7RbOf1iBWhXqdw1D+3rh8DtQLIUgNuvwzXmaUm3T25yCJA3Kgjg+DS+fcXMPYvjkLYhXw1Ql/YHT0H861MXcs7C5bo+2BCzkpg8x3ZpDZTa8cQE6i274XB/8/K0TVt8oPDcI67FxFq9AYQ/sP2zm8wXIdcDWn7D7AOwuGdZsRWzNQFJMegfh1EU3tjoLy+85oR4agVfnzdydFZg/ZuY6izD1PRSKzXbjFageS2tF1FZEIvD0QDj29aKt41bJHV0Z7YiZ31iH7z5rbfdmFRruTsj/q5K7D4TvP9Ys9fZofXkeuntgz5Nw6X1jNDn363FzjbgyAzeqnhCzKXhmAKauuk2LY7C2YAWJExyJ6CyQ5LL5aMvtvVE1YlWZtBIexTAF9zOonyg7tCn1Ht2JohsCPS+Fe3+quas3eRpi6G9o82hpAWCj7t5fGIVdxRCE9mt5ereb0+C3ezWnCS1eXweAmkW4tuj6nUU4fiZTQPCMmijY1wvPj4a14vaKi1pjhScOsG6VAoArlZCFo5NwIgvCA/JUP5z8NLTxxVnn2Hx8uPUND1TbOnB0El45R1N6Ls8aagEeL5kUZY/qgximD3riU5n7Jbz62xeikQXj4GHa/RhmjxgQqkV5F3sSRKfA2hei6pvw+dntO791DSpH4Jc7nuCyAhT3NWTT0Z6BtBiV4MR0ezZuXTPCvb7Q8jpJo/aveNyF9N8AkrarCPvL7lr+o270kK0dD9mUTHAz/C7cwSbUIoRlHlWLWIwoUEGoPwL3McJSpCrUiRjbcfeKKfUxcQSg5lhCMQzEO5D3OophNcdS8O8YQMYpoRkix+j/LkxFDWGZAhVVcSn/Bw2n+w/oK+fWAAAAAElFTkSuQmCC",
	115: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAHB0lEQVR4nO2bbUwURxjH/zN38qIcb4JWoIoHFYumWhDbRquNiSlYC4ZGjVYrotHWD1VTLdY00X7zbA22Na21KWqsUMHYSiygJjaRQDW+VK2YioBarVZBQA9QDm6nedajCuxxHrfH7dX+kiXcvszM8+zO7DPP/JfBzcQmfx4O1jpJEmKUgBTHwUYIIAyAwbYRZtoYUCdBVDLwi5yxCgjfo1Uly2vd2T7mjkJj3vgsUVitcwWkqQxstAv1CAFxnoEfZjpdbvXPq05p1gFxqSZDexuWCIhMCMTDHTBcYGA5+n7YdrEwy6xOkS4yJi07uMliWSGEeB9ACPqGBsbYFwE+PpvP7l/Z6BEHCCFYzDRTBgATBMLhCRhofMiqLsrawRgTvSuiFxinbxjK2pErgAnQAAwoE3rMrTmw5s9eXOscxpSNE5iQ9glgEDQEA24LxtNrij8sc+Y67szJscmmTAjpiNaMJ+Q2CemI3Ea1n4CZM/N1p5pqPoXASngDDNmJAcbVBQWzrI5PfRLjzTX7AKTCuyhMNBjTHTmBOypFvvPeZzyRamt775+A2GRTpgTxHbwYDraoqiQrx2kHGFM2TqBBBYAPvBsLGJ9i7+3AenjPn9DiaN/rV6QeSUpxgl4pwotNMeWqbXw/PceYuAiEBvk7dZ2/Xz8MCQvE2JERGB4ZgteXOt8jyRY5cBPi1a4Ro77rybbwVtUIzzDAF7mmOYiPGexSOZt2Hu31tRS12mzbbvctMCYtO1iO7VVmUXqSy8bX323Bjp9OutoUk81GZQc0WSwr1J7YBAb4IiNtnMvlbCs4jpYHba4VIhAu26jkgLhUk8E2pVWVRenj5S7QWyxtVhQcOoecH0+o0h6ykWztNga0t2GJ2vP5oAA/ZKQldtv/1Q+/Yv8vFWg0P3BYhrm5Fa2WdjWbFWKzdVMnB8iZHJVZ/NZ4BPTvfPfzis64NJipgc1W2QG8I4endhor2OCHd1ITOu27/6AN2btK4XEE4mWbYXMAJTD74u5/f+A07jS2QAt02MzlH5Cmqn/3u/d9vV6HyeOM8nFP02Ezo7y9hPu31MwQr86YjHdnv9zjOTXX7+D4uWsoKv0D5WeuwgMIDv/Belq0gFDP+JBAf8zv0veVMEYNlLc508bir1t3sffw78g/eA5/16mS7X4SGNnOacVG7b4/wN+5CWTk4CAsnzcRh79djPlvOnaeWkhCjOK0XKVmoXWNzdhTchalpy7Ld9YZ+vv5YP2yqfK8YfDAALgbASmOxSRvoGmv67GqHcJCBuDFkRHybC5pdBQSno8EY457XPW1O5i9ajca7t13V9Oo359kxuQNlwFEo494JsyAGVNGYeGMcbJzeuLcxZt4e02e63MA+1yh1+C/cXFfQIPc1vxjmJSxFZt3lcJqleye+0LcEKyYP9GdzTH0uQM6oPj+y9xyzM3Kw83ae3bPmzc9ARGDAt3qAI9ysuI6Zn2wG7X1TYrHfX30WDb7FbfVz23iBI9yo/YeFq/bK88VlJicZHRX1WZNOIA4X3ULuw6cVjwWER6I6Ai3rLybOclSoBFy9p2wO/ePHTpQ9foYUMdJkwONUNvQjIuXlSVBOp36w5UEUclJkAQNcdPOXIDTs6oyjMRYshpLQ1gl5big5nq96nVxxio4SdEeps21QVx0uGJesPKK6mo5QbZz0uGRFA0agMLk4ZGh3faX/XaF9HKqQjZXlSyvlUcW0uFBA9BUWKmvUxZZbTps5vIPnS4XHoZecwsU0mgHyypRUU0JK3XpsJnTH1mByXABHoKySFvWzpAXQrtOiT/aXKx+hQwXOlSn/NE+ZldE4E6GDQlGwaZ5eG4YyYcfcbu+CRkf5+Nuk+PFE2d53Fbe8Q/JT0mBiT6CJjlLZ76Eoq8zMTyq88B36WodFqzdgxu37c8SXaDBZqtMpxEnJsW0XgixDm6CNAKUGaLU+OzkMQgN6t/peLtVwjf5x7Alr1xeE3QHjLFPqouz1ivqAwJ8fDabLa3LXF0hHjEsDBMSoqHjHH4+egwM7g9jVCgS46O69XOC0l6Hyiuxs/CU3VBYFRhqycbOu7pgTNmwEAI5aiyMvjbeiEkJRhifDUXkoCB5qbyt3YrmFguu3mxE5dVaHCq7hPIzV2CV+iAWY8isKV6zvUcHiIcSmVKt6IDV1BNXFWd1k8jwbicyJkh4TMIi/EewiaTmKinKudIFpKYi4bEsMfN+LLKI2o6SnNu7inR1HOw9eDlkQ08Kct7TxbLCkiEb3gpDdk8qUcJhmoVU1yQ8hvdRaGs7XHJAQcEsK6muvepJILn8EyjFCafyTDbx9Nca1g9bqM87euwfhzlbw1P9yQxBFZDwmAILaATbR1NJzhpP/P/ZHFzkqf1wsitP7aezSjyVH0/DDlr/fP4fOwTeE5lpP+gAAAAASUVORK5CYII=",
	pikpak: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACY0lEQVR4nNWXy2tTQRSHv7m5RUWttqlNW1OairhKNbrU+lhE/AOkdCOIIO7arty0QhSxCIIQ7VJwIfgfCIJdFB+rgC32AVIflD5CbFUsoohJRiZzb5Ne05p4kxv94HCTc+bO+c0MM3eOoICD/TJswAAQBdoBH5UhA8wDo1mIv7ojpuyAsH9EBuQgkmuASXVJI4lN3BXDawIifXIQwQ28RDA0ERfDwpr2cQ9G7iSdhcOGteZeJ1eYKreB5DS1I2oiCJba2hDQVA9tjdDaCHMfICuhMwDJz5D8BMtftK9E2s2NttrJMOxvzSdT1rIb6goW69KIXsjr5/K+nxlIWWKWrOebJIxNFhXgK7r20QjcPL+59PllGH8LarDvU3oWFHU+CDZpK+TKA3j88vd+zGKd93av/y8lrKxao7Ls6bROrrj6EE6E9WzZppZKrJ0y0Hu8RAGhZuhohqk5nShp2Y/0+nZqxPaoFQsr2my2mNDSkBe01w/7AvAu9QcB/nrYs0vboU4qSsNOwCHAoMYY/5WAsckNt1NJ8WKY5TS+fF8/E7f/Lu5aQDrjLu5agOlzF3ct4NYFd3HXAk51uYv/k9vQLPeFr9/h4gh0dcCBNu17vaiP7nt9sGNblQVs3wo9x+DZNCRm9aUyFICebh0rF9PpWP22+QvqC3f2qLZyKda34XTMLsGLGSrO8xndtxMR6ZfqQ+tz7uczRyDor0zyxY/6LlDkoMqYVsUSKvSqho8SVB/JglqCUWqF4ImharVcueQ96j4bN3KFoiDmeXpJTOXO7QJVoyEZ8mgm0rm6sLA4talFef4LaurBZfZxNPMAAAAASUVORK5CYII=",
	onedrive: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAL30lEQVR42u2aa4xd11XHf2ufez2v6/GMY2dix4nHbRw7tI5TmyZgFToKtCKokitoigT9kAopFEFFGqkSAUrDowiJD614SEj5EEG/VUXllQgQLbQVCNqIokoVQmmVKKiNgELcUGfuPXuvtfiw9z73zPUjduxAC3dJW/uc0Zk7Z/3Xf/3XWvsOzG1uc5vb3OY2t7nNbW5z+/9o8r/xR898Kp1txb7fAriABcTFRAKhafwfhkv6x39/YvSv/2cAuO9J3z92e1cc2E+qcDQFRwNYY1gAGkcChMYhgDQOyLPi/tTyYPArnz2x8MVvSwDuf9L3fyPZB2LgvSpOCpCCowLWOCaONo402WkJEIJDAxKcEEDEIfEUxgc+f3r0Z982ANz3CX+oEf/lFnZHcRIQmwyCBScVELxxJDgyyE5Lk0GQUAABwPKLTvyJke7+iU+dka9+ywJw/5O+P415DOfsRCCKE4EY8m6hx4QGpLEc7WaaCtJAECeII5JZIBgAnnheUvPg586s/Om3HAD3P+n7mwl/m+C21iAaRIGJOFGK00BqsgZ4yfnQGDQZhBp5AgxwRAzBwcm7OO42aV5s3vt3b1l97FrfeXAtv7z5I184mybtXTHGtYWF8Eb5z8mpZrSwlAzcQB1UwUSw4JjJFATL6AfAEYJkB90F3AkGLpLLhIBgeOYA4izYUvqtu//iha9/7q3rn/gfZcDr3/P0Vrvd/kxs49tTG9E2kdrI6fvuYOPIPsYKrcHYYKIwcUgCLZDEu+hbcJpmmvcEp6l6UGkvjpDpL57dF3EcA3FwWraHP/rUD+z+g1edAXc99PxmGp9/PLZxS9XwskyV4/dscui12Xl1SJojnAzUIDrZaYGEYOY0jeA4UiIuQTCdpkEXHvfMBBwozgP5R7bLPf4u8IoBCFfy0KmHn3tA4/YzqrplxWlVRdVYWVvk+OmDRKVbybPjavk6ASlBVMETeBIsgUTBk+MRPDqSBItAufeJl+ctP9M6HgWiY9GxCI7uO/Hx/3jiVQPg1MPPfTi1+rgmRZNiKWFJu3X6rcew0GTBU4gJ2lSA0KwBqmAKnkCTgIJEsOhQQCDle0ngE6AtDreOTwogKe/WgrfgEayFZpf+4Os+9uKbrnsKnHr4Xx5NMT2kMdGtpGjK+8Hb97N6w4hxglaL4zZlQSwMUPLPTMg3ASxkGps6TdEECY4nx7w0QFKoXkpiTQME3Ot9ThPS5HeAk9dNBE89/NwDqdXHNSZScT61CY2R1CaaAdz7rruxpmGSyEszEBOF1qdlMBUg3PILh07ocimQxgjBaapDQQl4LgBiU/HbJcRRwIZCGoVcEsWRVmlaVxo5+/T37nnimgG466HnNy1ufyHFtKYxRzw7n0gxK//xrds5dPsG0XLkdzhveSUvouiQ3EvAHHHPJTA4BMtgBCO4IyEr/hQgx3Y3pBuHxJUGD56X5J6A4ITGGTS5irjxtVab33j2+PJHXrEGxPH5R+MkrqU2kmIktTFHvji/sm+FA0c3mCiMe863Wmjfy301SOqIgpgjmlHxZFhrOd/HuW7aWLGxYxPDJoZHJx1aIt6yTFoa4A5mZTkognnuFays0HBwZSl9+NhXXvzy4S+fv++qGfD69zy9Fdv0V1pErsv7mgYx8YYfOs3u/atoiXasANT8L12gaol86eRwz2Wt7GK9Oi+KeE4HdyesNsjRZXShQcVzIyV5UVkQcq/QlOg3hQ1NGaoEJufHwwefObb0+1csgu1LkwdUFU2l3M0AcPCuwyztXWWSprU+zjifDDSBVmcB8RI29253c0yNxi3X+CJ0zXpgeHyFtgkZM8lR93p+UD4GL52kg5nkaJaOEoQQfGG01P7ekX/e9meOLX30ygCI8WwucZYZkCoASjMUDty5Sau9Gm895S+1XxXMHbMaecsCWJx3s5IOmc+mhRFiNHsDiydHpOK8Ghi5glhxFMkfa5BHZ8tOm+QHpbTM7oIHWNqVHtv8p/G/PXvH4p9fFoDNd3x+K43jmqlianRpkBIalcNvvhMLTaZ26fVrxCsYSXPkO+etPFgTWJ1gjpti5ohqBsCMZhcsn9iND0J21ovzLtNr8XyIUhAwkTw8dYhkyriDhPxnRVgYDNJvAscuK4Jtm7ZSG0mT3ir3owPr7DlyICt8EbtYrqvjnfNaXqgIXq7Tlmt8SSdvDW8TNlG8VaxVll63Qlgdds5Xn1JpsWt36SYkLcJXRdEENcE07911WUG4/dCXxj99WQakNm5qUlwN1ZoCiptx8Lu/IzczpbGpL5WqIpd7M3bkuVh+c1PLlI+V9oZnlcTVWLh5yOJrl0hd1NnJAhNUsg6YFRaY9JTcqwDkHsKliORUG4Zi7wd++5IMGO4dnUiTSJxE0qQltRE3Y+P0bTRroxzxWaX3aTpY763FnGB1IMjC4Mnw0k57zJHXmAiNsX5mT3aUndGv9xXoVKNvsiPyeYF6ibpNo1+vHW7d+OLkxCUBWLp5Yzu1mfamuQNbXF/mhpO35T6/p/qxl/dqWfTEneBO8BxlT1URM1peBgSfGD5J3Qct3znClwc7I06vaFBZJ5l5VgGYgtAtFdTzdQUg9XYxfuySACwc2L96wxuOTu/Xljl473eSpEHNy0Q3zXfX3OR4ysIm6rj6VCBUy6BTqJ4SFhVXxZOirSLBGN2x0jmts9TvpUMqDKiptiPy/Yj3Iz+z3LnlkhrgItujY69h9fhrsrKWipqid9N4fUEtNA21wdGS70WVxLw4bx31iRmM2gWaKnvfsh8fNt1nzgKhfiEIoevfSt57J/54KGcl3SCV9+lvyPFLAiDOE2Z2twbp+nb3DIJJPuaqL9edURj5tKbU90x9R1JWTFfFa+ub8rWWfrnZHVg6OppqyGWiX++dUglKqXMvDZI7Ich0rwDQ2ylHzJdshIRPJvVfysdPUp6u0S/1uNdDS2ly8EL/Uu5ELQtipX6sjZV1OWSq7Nu6EdNpb2/9qPvMz8t1NaueBceLw15HbIHQj/7Ohv/SAHzpfcO/ue1D2980kVH2DlQyG6yjXBYOoUMFJ+e+mGUNKEXbk2OqeOdlLn+WjMVDCyzcskKK03ZBZ5y/GBCznjhCCNM2WQoILl1V7FIBwE0+fdlWOLl90k3OulNg7P1V6VXckiL9eu/JwUtnp9MSWFPAUzlLNGPvvQfQeBHq9523HiPs4sOM1zMWkY4BlQVysTSw8JXLAjAc2iOTl+Ssi2SnKnouID4VE+eCwUaKc7W5ccszgJdGyC0/t+e79iGLA1KaOthh5jPOXyL6s9alpshF6d/tA/7yZQ9Ebv3g+T9xs7d1LdTMVukv3i/UiueWLQteYYAnRaOXBkhpRg03veNwd1DSHZjYzuvovRnjCgC46Kxf1V+69/5Meqe8+WXPBIcj+/H2BXvGYXkHfJUMdebwPM/XMLrV4/J8b2ln5N1g/U03llF5GuHZ6z4DZsXvasx3JjA4H7ziM8HDv/hfPxwn6eNS4KuFIXQlM0deyFG30giZaQEgA2Epa4InY/XkGit3rO8QvB1TZe++32m+Qv9n7dO8W7au6puhm3/h3CO2rb/WTwWRWv58WgatnNJqzf06AOWx19XYtW+B9e85uDPnZ6jfP2Pog3Ed7BsM2OTdcu6qvxq7+WfP/byO4696EZjy/WRHsGCemxGtYpjTAM2nPWbOrj1D9p65CRtMO74+3S/GgrpfF+cbtnhQ/vEVfzd468+d+772m/Fjbra3+6V61GW5AfKy14R2Myw5u9Z2sX7PBtY0OxqdPgizAFQmmF8H5wNb/NTFnb+qL0cPf+jfD0xekF/3l9I73XyRrgvMYEzPAUrumzNcHbL3jTfhPeeNndHvpmW/cL9G+yPgAd53Ie2v6dvhw4+eO9Weiw+mcXq7tWmjdoOUbtDdkUZYvnUPK0fWulbBekPNLAAXsMCu2fGP8H7561f9HyQ2H/n6PZOxnrSJv01dgyBhsDxYWdwYHQnLC0ojLyAyrpOjWk6cVHXSp31TaRhJhvvVAVAdfZZF/vDlIj63uc1tbnOb29zmNre5zW1ucwP+G1ME77lSc/kUAAAAAElFTkSuQmCC"
}, Fm = Object.fromEntries(Am.map((e) => [e.id, Pm[e.id] || e.icon]));
//#endregion
//#region src/react/boardui/components/application/settings/settings-rows.tsx
function Im({ label: e, description: t, children: n }) {
	return /* @__PURE__ */ (0, B.jsxs)("div", {
		className: z("flex min-h-[52px] w-full items-center justify-between gap-4 py-2.5 pr-2.5", "border-b border-separator-border last:border-b-0"),
		children: [/* @__PURE__ */ (0, B.jsxs)("div", {
			className: "flex min-w-0 flex-col",
			children: [/* @__PURE__ */ (0, B.jsx)("p", {
				className: "text-body-regular text-text-primary",
				children: e
			}), t && /* @__PURE__ */ (0, B.jsx)("p", {
				className: "text-body-2-regular text-text-secondary",
				children: t
			})]
		}), n]
	});
}
//#endregion
//#region src/react/boardui/components/base/buttons/link-button.tsx
var Lm = Ht({
	base: [
		"inline-flex items-center justify-center gap-1 whitespace-nowrap",
		"font-sans select-none cursor-pointer rounded-sm",
		"underline-offset-3 hover:underline",
		"transition-colors duration-150 ease",
		"outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-border-focus-ring",
		"disabled:cursor-not-allowed disabled:no-underline aria-disabled:cursor-not-allowed aria-disabled:no-underline"
	].join(" "),
	size: {
		medium: "text-body-medium",
		small: "text-body-medium",
		xs: "text-caption-1-semibold"
	},
	icon: {
		medium: "size-5 shrink-0",
		small: "size-[18px] shrink-0",
		xs: "size-3.5 shrink-0"
	},
	variant: {
		primary: ["text-accent-600 active:text-accent-800", "disabled:text-text-tertiary aria-disabled:text-text-tertiary"].join(" "),
		secondary: ["text-text-secondary active:text-text-primary", "disabled:text-text-tertiary aria-disabled:text-text-tertiary"].join(" ")
	}
});
function Rm({ variant: e = "primary", size: t = "medium", leadingIcon: n, trailingIcon: r, children: i, className: a, disabled: o = !1, ...s }) {
	let c = z(Lm.base, Lm.size[t], Lm.variant[e], a), l = /* @__PURE__ */ (0, B.jsxs)(B.Fragment, { children: [
		n ? /* @__PURE__ */ (0, B.jsx)(n, {
			className: Lm.icon[t],
			"aria-hidden": !0
		}) : null,
		i != null && /* @__PURE__ */ (0, B.jsx)("span", { children: i }),
		r ? /* @__PURE__ */ (0, B.jsx)(r, {
			className: Lm.icon[t],
			"aria-hidden": !0
		}) : null
	] });
	if (s.href !== void 0) {
		let { ref: e, href: t, ...n } = s;
		return /* @__PURE__ */ (0, B.jsx)("a", {
			ref: e,
			href: o ? void 0 : t,
			"aria-disabled": o || void 0,
			className: c,
			...n,
			children: l
		});
	}
	let { ref: u, type: d = "button", ...f } = s;
	return /* @__PURE__ */ (0, B.jsx)("button", {
		ref: u,
		type: d,
		disabled: o,
		className: c,
		...f,
		children: l
	});
}
//#endregion
//#region src/react/settings/section.tsx
function zm({ children: e }) {
	return /* @__PURE__ */ (0, B.jsx)("div", {
		className: "flex flex-col",
		children: e
	});
}
function Bm({ divided: e = !1, children: t }) {
	return e ? /* @__PURE__ */ (0, B.jsx)("div", {
		className: "flex flex-col gap-4 border-t border-separator-border py-4 pr-3",
		children: t
	}) : /* @__PURE__ */ (0, B.jsx)("div", {
		className: "flex flex-col gap-4 py-4 pr-3",
		children: t
	});
}
function Vm({ role: e, children: t }) {
	return /* @__PURE__ */ (0, B.jsx)("p", {
		role: e,
		className: "text-body-2-regular text-text-secondary",
		children: t
	});
}
function Hm({ children: e }) {
	return /* @__PURE__ */ (0, B.jsx)("p", {
		role: "alert",
		className: "text-body-2-regular text-text-error-primary",
		children: e
	});
}
function Um({ href: e, children: t, leadingIcon: n }) {
	return /* @__PURE__ */ (0, B.jsx)(Rm, {
		href: e,
		target: "_blank",
		rel: "noopener noreferrer",
		size: "small",
		leadingIcon: n,
		trailingIcon: rm,
		className: "min-w-0 max-w-full",
		children: /* @__PURE__ */ (0, B.jsx)("span", {
			className: "min-w-0 whitespace-normal break-all",
			children: t
		})
	});
}
function Wm({ children: e }) {
	return /* @__PURE__ */ (0, B.jsx)("dl", {
		className: "flex flex-col",
		children: e
	});
}
function Gm({ term: e, children: t }) {
	return /* @__PURE__ */ (0, B.jsxs)("div", {
		className: "flex min-h-11 items-center justify-between gap-4 border-b border-separator-border py-2.5 pr-3 last:border-b-0",
		children: [/* @__PURE__ */ (0, B.jsx)("dt", {
			className: "flex max-w-1/2 min-w-0 shrink-0 items-center gap-2 text-body-regular text-text-secondary",
			children: e
		}), /* @__PURE__ */ (0, B.jsx)("dd", {
			className: "flex min-w-0 flex-wrap items-center justify-end gap-2 text-left text-body-regular break-all text-text-primary",
			children: t
		})]
	});
}
function Km({ summary: e, defaultOpen: t = !1, children: n, trailing: r = !1, onOpenChange: i, contentClassName: a }) {
	let o = (0, N.useId)(), s = (0, N.useRef)(null), c = (0, N.useRef)(null), l = (0, N.useRef)(!1), [u, d] = (0, N.useState)(t);
	return /* @__PURE__ */ (0, B.jsxs)("details", {
		ref: (e) => {
			s.current = e, e && t && !l.current && (l.current = !0, e.open = !0);
		},
		children: [/* @__PURE__ */ (0, B.jsxs)("summary", {
			"aria-expanded": u,
			"aria-controls": o,
			onClick: (e) => {
				e.preventDefault(), s.current && c.current && (Em(s.current, c.current, !u), d(!u), i?.(!u));
			},
			className: `${r ? "w-full" : "w-fit"} flex cursor-pointer list-none items-center gap-1 rounded-sm text-body-2-medium text-text-secondary outline-none select-none hover:text-text-primary focus-visible:ring-2 focus-visible:ring-border-focus-ring`,
			children: [
				r ? null : /* @__PURE__ */ (0, B.jsx)(tm, {
					"aria-hidden": !0,
					className: u ? "size-4 shrink-0 rotate-90 transition-transform" : "size-4 shrink-0 transition-transform"
				}),
				e,
				r ? /* @__PURE__ */ (0, B.jsx)(tm, {
					"aria-hidden": !0,
					className: u ? "ml-auto size-4 shrink-0 -rotate-90 transition-transform" : "ml-auto size-4 shrink-0 rotate-90 transition-transform"
				}) : null
			]
		}), /* @__PURE__ */ (0, B.jsx)("div", {
			ref: c,
			id: o,
			inert: !u,
			children: /* @__PURE__ */ (0, B.jsx)("div", {
				className: z("flex flex-col gap-2 pt-3", a),
				children: n
			})
		})]
	});
}
function qm({ name: e }) {
	return /* @__PURE__ */ (0, B.jsx)("svg", {
		"aria-hidden": !0,
		viewBox: "0 0 24 24",
		fill: "none",
		className: "size-4 shrink-0 stroke-current stroke-2",
		children: /* @__PURE__ */ (0, B.jsx)("use", { href: `#i-${e}` })
	});
}
function Jm({ mark: e }) {
	return e.startsWith("data:image/png;base64,") ? /* @__PURE__ */ (0, B.jsx)("img", {
		src: e,
		alt: "",
		width: 16,
		height: 16,
		className: "size-4 shrink-0"
	}) : /* @__PURE__ */ (0, B.jsx)(qm, { name: e });
}
//#endregion
//#region src/react/pages/setup/setup-done.tsx
function Ym({ done: e }) {
	let t = (0, N.useRef)(null);
	return (0, N.useEffect)(() => {
		document.title = "Peach · 设置完成", t.current?.focus();
	}, []), (0, N.useEffect)(() => {
		let t = e.redirect;
		if (!t) return;
		let n = setTimeout(() => location.assign(t), wm);
		return () => clearTimeout(n);
	}, [e.redirect]), /* @__PURE__ */ (0, B.jsxs)(Kt, {
		title: "设置完成",
		lede: "正在启动馆藏。",
		children: [
			/* @__PURE__ */ (0, B.jsx)("p", {
				className: "text-body-regular text-text-primary",
				children: e.restored ? "已连接已有数据目录。" : e.scan_requested ? "首次扫描已排队，在后台整理媒体库，期间可以照常使用 Peach。" : "稍后在配置页开始扫描媒体库。"
			}),
			/* @__PURE__ */ (0, B.jsx)(Gt, {
				ref: t,
				href: e.url,
				className: "self-start",
				children: e.history_guide ? "导入浏览器历史记录" : "进入 Peach"
			}),
			/* @__PURE__ */ (0, B.jsx)(Km, {
				summary: "运行信息",
				children: /* @__PURE__ */ (0, B.jsx)(Wm, { children: e.facts.map((e) => /* @__PURE__ */ (0, B.jsxs)(Gm, {
					term: e.term,
					children: [e.value, e.download_url ? /* @__PURE__ */ (0, B.jsx)(Um, {
						href: e.download_url,
						children: e.download_label ?? e.download_url
					}) : null]
				}, e.term)) })
			})
		]
	});
}
//#endregion
//#region src/react/boardui/components/base/switch/switch.tsx
var Xm = Ht({
	sm: {
		track: "h-4 w-7",
		trackRadius: {
			pill: "rounded-full",
			rectangle: "rounded-[3px]"
		},
		onShadow: "shadow-[inset_0_1px_0_0_rgb(255_255_255/0.25),inset_0_0_0_0.5px_var(--color-accent-500)]",
		thumb: "size-3",
		thumbRadius: {
			pill: "rounded-full",
			rectangle: "rounded-[1px]"
		},
		offset: "left-0.5 top-0.5",
		travel: "translate-x-3",
		chip: "size-[5px] border-[0.25px] shadow-[0_2px_2px_0_rgb(0_0_0/0.03)]",
		chipRadius: {
			pill: "rounded-full",
			rectangle: "rounded-[0.5px]"
		}
	},
	md: {
		track: "h-6 w-[42px]",
		trackRadius: {
			pill: "rounded-full",
			rectangle: "rounded-[4.5px]"
		},
		onShadow: "shadow-[inset_0_1.5px_0_0_rgb(255_255_255/0.25),inset_0_0_0_0.75px_var(--color-accent-500)]",
		thumb: "size-[18px]",
		thumbRadius: {
			pill: "rounded-full",
			rectangle: "rounded-[1.5px]"
		},
		offset: "left-[3px] top-[3px]",
		travel: "translate-x-[18px]",
		chip: "size-[7.5px] border-[0.375px] shadow-[0_3px_3px_0_rgb(0_0_0/0.03)]",
		chipRadius: {
			pill: "rounded-full",
			rectangle: "rounded-[0.75px]"
		}
	},
	lg: {
		track: "h-8 w-14",
		trackRadius: {
			pill: "rounded-full",
			rectangle: "rounded-md"
		},
		onShadow: "shadow-checkbox-selected",
		thumb: "size-6",
		thumbRadius: {
			pill: "rounded-full",
			rectangle: "rounded-xs"
		},
		offset: "left-1 top-1",
		travel: "translate-x-6",
		chip: "size-[10px] border-[0.5px] shadow-[0_4px_4px_0_rgb(0_0_0/0.03)]",
		chipRadius: {
			pill: "rounded-full",
			rectangle: "rounded-[1px]"
		}
	}
});
function Zm({ state: e, size: t = "md", shape: n = "pill" }) {
	let r = Xm[t];
	return /* @__PURE__ */ (0, B.jsx)("span", {
		"aria-hidden": !0,
		className: z("relative shrink-0 transition-colors duration-200 ease", r.track, r.trackRadius[n], e.isSelected ? z("bg-linear-to-b from-accent-500 to-accent-600", r.onShadow) : "bg-background-tertiary-default", e.isDisabled && "opacity-50", e.isFocusVisible && "ring-2 ring-border-focus-ring ring-offset-2"),
		children: /* @__PURE__ */ (0, B.jsx)("span", {
			className: z("absolute flex items-center justify-center", "bg-linear-to-b from-control-indicator-background from-[43.837%] to-control-indicator-background-subtle", "shadow-[0_3px_3px_0_rgb(0_0_0/0.03),0_0.75px_0_0_rgb(0_0_0/0.05)]", "transition-transform duration-200 ease", r.thumb, r.thumbRadius[n], r.offset, e.isSelected && r.travel),
			children: /* @__PURE__ */ (0, B.jsx)("span", { className: z("border-solid bg-linear-to-t from-[43.837%]", r.chip, r.chipRadius[n], e.isSelected ? "border-accent-600 from-switch-on-chip-start to-switch-on-chip-end" : "border-border-button-default/50 from-switch-off-chip-start to-switch-off-chip-end") })
		})
	});
}
function Qm({ className: e, children: t, size: n = "md", shape: r = "pill", ref: i, ...a }) {
	return /* @__PURE__ */ (0, B.jsx)(Gp, {
		ref: i,
		...a,
		className: (t) => z("group inline-flex items-center gap-2 select-none", t.isDisabled ? "cursor-not-allowed" : "cursor-pointer", typeof e == "function" ? e(t) : e),
		children: (e) => /* @__PURE__ */ (0, B.jsxs)(B.Fragment, { children: [/* @__PURE__ */ (0, B.jsx)(Zm, {
			state: e,
			size: n,
			shape: r
		}), t != null && t !== !1 && /* @__PURE__ */ (0, B.jsx)("span", {
			className: "text-body-medium text-text-primary",
			children: t
		})] })
	});
}
//#endregion
//#region node_modules/motion-utils/dist/es/clamp.mjs
var $m = (e, t, n) => n > t ? t : n < e ? e : n, eh = {};
//#endregion
//#region node_modules/motion-utils/dist/es/memo.mjs
/*#__NO_SIDE_EFFECTS__*/
function th(e) {
	let t;
	return () => (t === void 0 && (t = e()), t);
}
//#endregion
//#region node_modules/motion-utils/dist/es/noop.mjs
var nh = /* @__NO_SIDE_EFFECTS__ */ (e) => e, rh = /* @__NO_SIDE_EFFECTS__ */ (e) => e * 1e3, ih = /* @__NO_SIDE_EFFECTS__ */ (e) => e / 1e3, ah = /* @__NO_SIDE_EFFECTS__ */ (e) => Array.isArray(e) && typeof e[0] == "number", oh = {
	delta: 0,
	timestamp: 0,
	isProcessing: !1
}, sh;
function ch() {
	sh = void 0;
}
var lh = {
	now: () => (sh === void 0 && lh.set(oh.isProcessing || eh.useManualTiming ? oh.timestamp : performance.now()), sh),
	set: (e) => {
		sh = e, queueMicrotask(ch);
	}
}, uh = (e, t, n = 10) => {
	let r = "", i = Math.max(Math.round(t / n), 2);
	for (let t = 0; t < i; t++) r += Math.round(e(t / (i - 1)) * 1e4) / 1e4 + ", ";
	return `linear(${r.substring(0, r.length - 2)})`;
}, dh = 2e4;
function fh(e, t = 50, n = dh, r) {
	let i = 0, a = e.next(i);
	for (r?.push(a.value); !a.done && i < n;) i += t, a = e.next(i), r?.push(a.value);
	return i >= n ? Infinity : i;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/utils/create-generator-easing.mjs
function ph(e, t = 100, n) {
	let { keyframes: r, velocity: i } = e, a = r && r[r.length - 1] - r[0], o = n({
		...e,
		velocity: i && a ? i * t / a : i,
		keyframes: [0, t]
	}), s = Math.min(fh(o), dh);
	return {
		type: "keyframes",
		ease: (e) => o.next(s * e).value / t,
		duration: /* @__PURE__ */ ih(s)
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/spring.mjs
var mh = {
	stiffness: 100,
	damping: 10,
	mass: 1,
	duration: 800,
	bounce: .3,
	visualDuration: .3,
	restSpeed: {
		granular: .01,
		default: 2
	},
	restDelta: {
		granular: .005,
		default: .5
	},
	minDuration: .01,
	maxDuration: 10,
	minDamping: .05
}, hh = (e) => e < 0 ? 1 / Math.max(1 + e, mh.minDamping) : Math.max(1 - e, mh.minDamping);
function gh(e, t) {
	if (!(e > 1)) return 1;
	let n = Math.sqrt(e * e - 1), r = e - n, i = e + n, a = 2 * n * Math.exp(-t) * (1 + t);
	return yh((e) => i * Math.exp(-r * e) - r * Math.exp(-i * e) - a, (e) => Math.exp(-i * e) - Math.exp(-r * e), t) / t;
}
function _h(e, t) {
	return e * Math.sqrt(1 - t * t);
}
var vh = 12;
function yh(e, t, n) {
	let r = n;
	for (let n = 1; n < vh; n++) r -= e(r) / t(r);
	return r;
}
var bh = .001;
function xh({ duration: e = mh.duration, bounce: t = mh.bounce }) {
	let n, r;
	mh.maxDuration;
	let i = hh(t);
	e = $m(mh.minDuration, mh.maxDuration, /* @__PURE__ */ ih(e)), i < 1 ? (n = (t) => {
		let n = t * i, r = n * e, a = _h(t, i), o = Math.exp(-r);
		return bh - n / a * o;
	}, r = (t) => {
		let r = t * i * e, a = i * i * t * t * e, o = Math.exp(-r), s = _h(t * t, i);
		return (-n(t) + bh > 0 ? -1 : 1) * -a * o / s;
	}) : (n = (t) => -.001 + Math.exp(-t * e) * (t * e + 1), r = (t) => Math.exp(-t * e) * (-t * (e * e)));
	let a = 5 / e, o = yh(n, r, a), s = o * gh(i, o * e), c = s * s;
	return {
		stiffness: c,
		damping: i * 2 * Math.sqrt(c),
		duration: /* @__PURE__ */ rh(e)
	};
}
var Sh = (e, t) => (t ? e >= 0 : e > 0) && e < Infinity;
function Ch(e, t) {
	if (Sh(e, t)) return e;
}
function wh(e) {
	let t = Ch(e.stiffness), n = Ch(e.damping, !0), r = Ch(e.mass), i = {
		...e,
		stiffness: t ?? mh.stiffness,
		damping: n ?? mh.damping,
		mass: r ?? mh.mass,
		isResolvedFromDuration: !1,
		isTimeDefined: (t ?? n ?? r) === void 0 && (e.duration !== void 0 || e.bounce !== void 0)
	};
	if (i.isTimeDefined) {
		if (e.visualDuration) {
			let t = hh(e.bounce || 0), n = 2 * Math.PI / (e.visualDuration * 1.2) * gh(t, 2 * Math.PI / 1.2);
			i.stiffness = n * n, i.damping = 2 * t * Math.sqrt(i.stiffness);
		} else Object.assign(i, xh(i)), i.isResolvedFromDuration = !0;
		(!Sh(i.stiffness) || !Sh(i.damping, !0)) && (i.stiffness = mh.stiffness, i.damping = mh.damping);
	}
	return i;
}
function Th(e = mh.visualDuration, t = mh.bounce) {
	let n = typeof e == "object" ? e : {
		visualDuration: e,
		keyframes: [0, 1],
		bounce: t
	}, r = n.keyframes[0], i = n.keyframes[n.keyframes.length - 1], a = {
		done: !1,
		value: r
	}, { stiffness: o, damping: s, mass: c, duration: l, isResolvedFromDuration: u, isTimeDefined: d } = wh({ ...n }), f = (e) => d ? 0 : -/* @__PURE__ */ ih(e), p = s / (2 * Math.sqrt(o * c)), m = /* @__PURE__ */ ih(Math.sqrt(o / c)), h = p * m, g = {
		target: i,
		delta: i - r,
		velocity: f(n.velocity || 0) || 0,
		restSpeed: 0,
		restDelta: 0
	}, _ = () => {
		let e = Math.abs(g.delta) < 5;
		g.restSpeed = n.restSpeed || (e ? mh.restSpeed.granular : mh.restSpeed.default), g.restDelta = n.restDelta || (e ? mh.restDelta.granular : mh.restDelta.default);
	};
	_();
	let v, y, b;
	if (p < 1) {
		let e = _h(m, p), t = {
			A: 0,
			sinC: 0,
			cosC: 0,
			t: -1,
			env: 0,
			sin: 0,
			cos: 0
		};
		b = () => {
			t.A = (g.velocity + h * g.delta) / e, t.sinC = h * t.A + g.delta * e, t.cosC = h * g.delta - t.A * e;
		};
		let n = (n) => {
			n !== t.t && (t.t = n, t.env = Math.exp(-h * n), t.sin = Math.sin(e * n), t.cos = Math.cos(e * n));
		};
		v = (e) => (n(e), g.target - t.env * (t.A * t.sin + g.delta * t.cos)), y = (e) => (n(e), t.env * (t.sinC * t.sin + t.cosC * t.cos));
	} else if (p === 1) {
		v = (e) => g.target - Math.exp(-m * e) * (g.delta + (g.velocity + m * g.delta) * e);
		let e = { C: 0 };
		b = () => {
			e.C = g.velocity + m * g.delta;
		}, y = (t) => Math.exp(-m * t) * (m * e.C * t - g.velocity);
	} else {
		let e = m * Math.sqrt(p * p - 1), t = h - e, n = h + e, r = d ? Infinity : 300 / e, i = (e, t) => Math.exp(t > r ? -e * r - h * (t - r) : -e * t), a = {
			S: 0,
			F: 0
		};
		b = () => {
			let t = (g.velocity + h * g.delta) / e;
			a.S = (g.delta + t) / 2, a.F = (g.delta - t) / 2;
		}, v = (e) => g.target - a.S * i(t, e) - a.F * i(n, e), y = (e) => t * a.S * i(t, e) + n * a.F * i(n, e);
	}
	b();
	let x = u && l || null, S = {
		calculatedDuration: x,
		retarget: (e, t) => {
			g.target = e[e.length - 1], g.delta = g.target - e[0], g.velocity = f(t), n.restSpeed && n.restDelta || _(), S.calculatedDuration = x, a.done = !1, b();
		},
		velocity: (e) => /* @__PURE__ */ rh(y(e)),
		next: (e) => {
			let t = v(e);
			if (u) a.done = e >= l;
			else {
				let n = /* @__PURE__ */ rh(y(e));
				a.done = Math.abs(n) <= g.restSpeed && Math.abs(g.target - t) <= g.restDelta;
			}
			return a.value = a.done ? g.target : t, a;
		},
		toString: () => {
			let e = Math.min(fh(S), dh), t = uh((t) => S.next(e * t).value, e, 30);
			return e + "ms " + t;
		},
		toTransition: () => {}
	};
	return S;
}
Th.applyToOptions = (e) => {
	let t = ph(e, 100, Th);
	return e.ease = t.ease, e.duration = /* @__PURE__ */ rh(t.duration), e.type = "keyframes", e;
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/get-final.mjs
var Eh = (e) => e !== null;
function Dh(e, { repeat: t, repeatType: n = "loop" }, r, i = 1) {
	let a = e.filter(Eh), o = i < 0 || t && n !== "loop" && t % 2 == 1 ? 0 : a.length - 1;
	return !o || r === void 0 ? a[o] : r;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/notify-inspector.mjs
function Oh(e, t) {
	return {
		kind: e,
		animation: t,
		timestamp: lh.now(),
		frameTimestamp: oh.timestamp,
		frameIsProcessing: oh.isProcessing
	};
}
function kh(e, t, n) {
	let r = globalThis.__MOTION_INSPECT__;
	if (r) try {
		r({
			...Oh("animation-start", e),
			options: n ? {
				...t,
				...n
			} : t
		});
	} catch {}
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/WithPromise.mjs
var Ah = class {
	constructor() {
		this.isResolved = !1;
	}
	get finished() {
		return this._finished ||= this.isResolved ? Promise.resolve() : new Promise((e) => {
			this._resolve = e;
		}), this._finished;
	}
	updateFinished() {
		this._finished = this._resolve = void 0, this.isResolved = !1;
	}
	notifyFinished() {
		this.isResolved = !0, this._resolve?.();
	}
	then(e, t) {
		return this.finished.then(e, t);
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/utils/fill-wildcards.mjs
function jh(e) {
	for (let t = 1; t < e.length; t++) e[t] ?? (e[t] = e[t - 1]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/dom/is-css-var.mjs
var Mh = (e) => e.startsWith("--");
//#endregion
//#region node_modules/motion-dom/dist/es/render/dom/style-set.mjs
function Nh(e, t, n) {
	Mh(t) ? e.style.setProperty(t, n) : e.style[t] = n;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/supports/flags.mjs
var Ph = {};
//#endregion
//#region node_modules/motion-dom/dist/es/utils/supports/memo.mjs
function Fh(e, t) {
	let n = /* @__PURE__ */ th(e);
	return () => Ph[t] ?? n();
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/supports/scroll-timeline.mjs
var Ih = /* @__PURE__ */ Fh(() => window.ScrollTimeline !== void 0, "scrollTimeline"), Lh = /*@__PURE__*/ Fh(() => {
	try {
		document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
	} catch {
		return !1;
	}
	return !0;
}, "linearEasing"), Rh = ([e, t, n, r]) => `cubic-bezier(${e}, ${t}, ${n}, ${r})`, zh = {
	linear: "linear",
	ease: "ease",
	easeIn: "ease-in",
	easeOut: "ease-out",
	easeInOut: "ease-in-out",
	circIn: /*@__PURE__*/ Rh([
		0,
		.65,
		.55,
		1
	]),
	circOut: /*@__PURE__*/ Rh([
		.55,
		0,
		1,
		.45
	]),
	backIn: /*@__PURE__*/ Rh([
		.31,
		.01,
		.66,
		-.59
	]),
	backOut: /*@__PURE__*/ Rh([
		.33,
		1.53,
		.69,
		.99
	])
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/easing/map-easing.mjs
function Bh(e, t) {
	if (e) return typeof e == "function" ? Lh() ? uh(e, t) : "ease-out" : /* @__PURE__ */ ah(e) ? Rh(e) : Array.isArray(e) ? e.map((e) => Bh(e, t) || zh.easeOut) : zh[e];
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/start-waapi-animation.mjs
function Vh(e, t, n, { delay: r = 0, duration: i = 300, repeat: a = 0, repeatType: o = "loop", ease: s = "easeOut", times: c } = {}, l = void 0) {
	let u = { [t]: n };
	c && (u.offset = c);
	let d = Bh(s, i);
	Array.isArray(d) && (u.easing = d);
	let f = {
		delay: r,
		duration: i,
		easing: Array.isArray(d) ? "linear" : d,
		fill: "both",
		iterations: a + 1,
		direction: o === "reverse" ? "alternate" : "normal"
	};
	return l && (f.pseudoElement = l), e.animate(u, f);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/utils/is-generator.mjs
function Hh(e) {
	return typeof e == "function" && "applyToOptions" in e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/utils/apply-generator.mjs
function Uh({ type: e, ...t }) {
	return Hh(e) && Lh() ? e.applyToOptions(t) : (t.duration ??= 300, t.ease ??= "easeOut", t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/NativeAnimation.mjs
var Wh = class extends Ah {
	constructor(e) {
		if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !e) return;
		let { element: t, name: n, keyframes: r, pseudoElement: i, allowFlatten: a = !1, finalKeyframe: o, onComplete: s } = e;
		this.isPseudoElement = !!i, this.allowFlatten = a, this.options = e, e.type;
		let c = Uh(e);
		this.animation = Vh(t, n, r, c, i), c.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
			if (this.finishedTime = this.time, !i) {
				let e = Dh(r, this.options, o, this.speed);
				this.updateMotionValue && this.updateMotionValue(e), Nh(t, n, e), this.animation.cancel();
			}
			s?.(), this.notifyFinished();
		}, kh(this, e, c);
	}
	play() {
		this.isStopped || (this.manualStartTime = null, this.animation.play(), this.state === "finished" && this.updateFinished());
	}
	pause() {
		this.animation.pause();
	}
	complete() {
		this.animation.finish?.();
	}
	cancel() {
		try {
			this.animation.cancel();
		} catch {}
	}
	stop() {
		if (this.isStopped) return;
		this.isStopped = !0;
		let { state: e } = this;
		e !== "idle" && e !== "finished" && (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
	}
	commitStyles() {
		let e = this.options?.element;
		!this.isPseudoElement && e?.isConnected && this.animation.commitStyles?.();
	}
	get duration() {
		let e = this.animation.effect?.getComputedTiming?.().duration || 0;
		return /* @__PURE__ */ ih(Number(e));
	}
	get iterationDuration() {
		let { delay: e = 0 } = this.options || {};
		return this.duration + /* @__PURE__ */ ih(e);
	}
	get time() {
		return /* @__PURE__ */ ih(Number(this.animation.currentTime) || 0);
	}
	set time(e) {
		let t = this.finishedTime !== null;
		this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ rh(e), t && this.animation.pause();
	}
	get speed() {
		return this.animation.playbackRate;
	}
	set speed(e) {
		e < 0 && (this.finishedTime = null), this.animation.playbackRate = e;
	}
	get state() {
		return this.finishedTime === null ? this.animation.playState : "finished";
	}
	get startTime() {
		return this.manualStartTime ?? Number(this.animation.startTime);
	}
	set startTime(e) {
		this.manualStartTime = this.animation.startTime = e;
	}
	attachTimeline({ timeline: e, onAttach: t, observe: n }) {
		return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, e && Ih() ? (this.animation.timeline = e, t?.(this.animation), nh) : n(this);
	}
}, Gh = class {
	constructor(e) {
		this.stop = () => this.runAll("stop"), this.animations = e.filter(Boolean);
	}
	get finished() {
		return Promise.all(this.animations.map((e) => e.finished));
	}
	getAll(e) {
		return this.animations[0][e];
	}
	setAll(e, t) {
		for (let n = 0; n < this.animations.length; n++) this.animations[n][e] = t;
	}
	attachTimeline(e) {
		let t = this.animations.map((t) => t.attachTimeline(e));
		return () => {
			t.forEach((e, t) => {
				e && e(), this.animations[t].stop();
			});
		};
	}
	get time() {
		return this.getAll("time");
	}
	set time(e) {
		this.setAll("time", e);
	}
	get speed() {
		return this.getAll("speed");
	}
	set speed(e) {
		this.setAll("speed", e);
	}
	get state() {
		return this.getAll("state");
	}
	get startTime() {
		return this.getAll("startTime");
	}
	get duration() {
		return Kh(this.animations, "duration");
	}
	get iterationDuration() {
		return Kh(this.animations, "iterationDuration");
	}
	runAll(e) {
		this.animations.forEach((t) => t[e]());
	}
	play() {
		this.runAll("play");
	}
	pause() {
		this.runAll("pause");
	}
	cancel() {
		this.runAll("cancel");
	}
	complete() {
		this.runAll("complete");
	}
};
function Kh(e, t) {
	let n = 0;
	for (let r = 0; r < e.length; r++) {
		let i = e[r][t];
		i !== null && i > n && (n = i);
	}
	return n;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/GroupAnimationWithThen.mjs
var qh = class extends Gh {
	then(e, t) {
		return this.finished.finally(e).then(() => {});
	}
}, Jh = /* @__PURE__ */ new WeakMap(), Yh = (e, t = "") => `${e}:${t}`;
function Xh(e) {
	let t = Jh.get(e);
	return t || (t = /* @__PURE__ */ new Map(), Jh.set(e, t)), t;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/resolve-transition.mjs
function Zh(e, t) {
	if (e?.inherit && t) {
		let { inherit: n, ...r } = e;
		return {
			...t,
			...r
		};
	}
	return e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/get-value-transition.mjs
function Qh(e, t) {
	let n = e?.[t] ?? e?.default ?? e;
	return n === e ? n : Zh(n, e);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/utils/px-values.mjs
var $h = /* @__PURE__ */ new Set(/* @__PURE__ */ "borderWidth.borderTopWidth.borderRightWidth.borderBottomWidth.borderLeftWidth.borderRadius.borderTopLeftRadius.borderTopRightRadius.borderBottomRightRadius.borderBottomLeftRadius.width.maxWidth.height.maxHeight.top.right.bottom.left.inset.insetBlock.insetBlockStart.insetBlockEnd.insetInline.insetInlineStart.insetInlineEnd.padding.paddingTop.paddingRight.paddingBottom.paddingLeft.paddingBlock.paddingBlockStart.paddingBlockEnd.paddingInline.paddingInlineStart.paddingInlineEnd.margin.marginTop.marginRight.marginBottom.marginLeft.marginBlock.marginBlockStart.marginBlockEnd.marginInline.marginInlineStart.marginInlineEnd.fontSize.backgroundPositionX.backgroundPositionY".split("."));
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/utils/apply-px-defaults.mjs
function eg(e, t) {
	for (let n = 0; n < e.length; n++) typeof e[n] == "number" && $h.has(t) && (e[n] = e[n] + "px");
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/resolve-elements.mjs
function tg(e, t, n) {
	if (e == null) return [];
	if (e instanceof EventTarget) return [e];
	if (typeof e == "string") {
		let r = document;
		t && (r = t.current);
		let i = n?.[e] ?? r.querySelectorAll(e);
		return i ? Array.from(i) : [];
	}
	return Array.from(e).filter((e) => e != null);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/dom/style-computed.mjs
function ng(e, t) {
	let n = window.getComputedStyle(e);
	return Mh(t) ? n.getPropertyValue(t) : n[t];
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animators/waapi/animate-elements.mjs
function rg(e, t, n, r) {
	if (e == null) return [];
	let i = tg(e, r), a = i.length, o = [];
	for (let e = 0; e < a; e++) {
		let r = i[e], s = { ...n };
		typeof s.delay == "function" && (s.delay = s.delay(e, a));
		for (let e in t) {
			let n = t[e];
			Array.isArray(n) || (n = [n]);
			let i = { ...Qh(s, e) };
			i.duration &&= /* @__PURE__ */ rh(i.duration), i.delay &&= /* @__PURE__ */ rh(i.delay);
			let a = Xh(r), c = Yh(e, i.pseudoElement || ""), l = a.get(c);
			l && l.stop(), o.push({
				map: a,
				key: c,
				unresolvedKeyframes: n,
				options: {
					...i,
					element: r,
					name: e,
					allowFlatten: !s.type && !s.ease
				}
			});
		}
	}
	for (let e = 0; e < o.length; e++) {
		let { unresolvedKeyframes: t, options: n } = o[e], { element: r, name: i, pseudoElement: a } = n;
		!a && t[0] === null && (t[0] = ng(r, i)), jh(t), eg(t, i), !a && t.length < 2 && t.unshift(ng(r, i)), n.keyframes = t;
	}
	let s = [];
	for (let e = 0; e < o.length; e++) {
		let { map: t, key: n, options: r } = o[e], i = new Wh(r);
		t.set(n, i), i.finished.finally(() => t.delete(n)), s.push(i);
	}
	return s;
}
var ig = /*@__PURE__*/ ((e) => {
	function t(t, n, r) {
		return new qh(rg(t, n, r, e));
	}
	return t;
})(), ag = {
	selection: {
		type: Th,
		duration: .16,
		bounce: 0
	},
	hover: {
		type: Th,
		duration: .08,
		bounce: 0
	}
};
function og(e) {
	let [t, n] = (0, N.useState)(null);
	return (0, N.useLayoutEffect)(() => {
		if (!t) return;
		let n = document.createElement("span");
		n.setAttribute("aria-hidden", "true"), n.dataset.movingSurface = e, n.hidden = !0, t.prepend(n), t.dataset.surfaceHost = e;
		let r = matchMedia("(prefers-reduced-motion: reduce)"), i = matchMedia("(hover: hover) and (pointer: fine)"), a = !1, o = null, s = null, c = "", l, u = e === "selection" ? "[role=\"tab\"],label[data-rac]" : "[role=\"option\"],button", d = () => [...t.querySelectorAll(u)].filter((e) => e.getBoundingClientRect().width > 0), f = () => {
			l?.cancel(), n.hidden = !0, s = null, c = "", delete t.dataset.surfaceReady;
		}, p = (u = !1) => {
			let p = d(), m = p.find((e) => e.hasAttribute("data-selected") || e.getAttribute("aria-selected") === "true"), h = e === "selection" ? m : o;
			if (!h || !t.contains(h) || !p.includes(h) || e === "hover" && (!i.matches || !a || p.length > 8 || h.matches(":disabled,[aria-disabled=\"true\"],[data-disabled]"))) {
				f();
				return;
			}
			let g = h.getBoundingClientRect(), _ = t.getBoundingClientRect(), v = _.width / t.offsetWidth || 1, y = _.height / t.offsetHeight || 1, b = (g.left - _.left) / v + t.scrollLeft - t.clientLeft, x = (g.top - _.top) / y + t.scrollTop - t.clientTop, S = g.width / v, C = g.height / y, w = `${b},${x},${S},${C}`;
			if (a && i.matches && !r.matches && s === h && c === w) return;
			let T = n.hidden ? null : n.getBoundingClientRect();
			l?.cancel(), n.hidden = !1, n.style.width = `${S}px`, n.style.height = `${C}px`;
			let E = `translate(${b}px, ${x}px) scale(1, 1)`;
			if (u && a && !r.matches && T && s !== h) {
				let r = `translate(${(T.left - _.left) / v + t.scrollLeft - t.clientLeft}px, ${(T.top - _.top) / y + t.scrollTop - t.clientTop}px) scale(${T.width / v / S}, ${T.height / y / C})`;
				l = ig(n, { transform: [r, E] }, ag[e]);
			} else n.style.transform = E;
			s = h, c = w, t.dataset.surfaceReady = "";
		}, m = (t) => {
			if (a = t.pointerType === "mouse" && i.matches, e === "hover") {
				let e = t.target instanceof Element ? t.target.closest(u) : null;
				if (e === o && a) return;
				o = e, p(!0);
			}
		}, h = () => {
			a = !1, e === "hover" ? f() : p();
		}, g = () => {
			o = null, e === "hover" && f();
		}, _ = () => p(), v = new MutationObserver(() => p(!0)), y = new ResizeObserver(_), b = () => {
			y.disconnect(), y.observe(t), d().forEach((e) => y.observe(e));
		}, x = new MutationObserver(() => {
			b(), p();
		});
		return v.observe(t, {
			subtree: !0,
			attributes: !0,
			attributeFilter: [
				"data-selected",
				"aria-selected",
				"data-disabled",
				"aria-disabled"
			]
		}), x.observe(t, {
			childList: !0,
			subtree: !0
		}), b(), p(), t.addEventListener("pointerdown", m, !0), t.addEventListener("pointermove", m), t.addEventListener("pointerleave", g), t.addEventListener("keydown", h, !0), t.addEventListener("scroll", _, !0), r.addEventListener("change", _), i.addEventListener("change", _), () => {
			l?.cancel(), v.disconnect(), x.disconnect(), y.disconnect(), t.removeEventListener("pointerdown", m, !0), t.removeEventListener("pointermove", m), t.removeEventListener("pointerleave", g), t.removeEventListener("keydown", h, !0), t.removeEventListener("scroll", _, !0), r.removeEventListener("change", _), i.removeEventListener("change", _), n.remove(), delete t.dataset.surfaceHost, delete t.dataset.surfaceReady;
		};
	}, [t, e]), n;
}
Object.fromEntries(Object.entries({
	fresh: "/unseen",
	later: "/watch-later",
	flagged: "/flagged",
	ads: "/junk-files"
}).map(([e, t]) => [t, e])), typeof Intl < "u" && typeof Intl.Segmenter == "function" && new Intl.Segmenter(void 0, { granularity: "grapheme" }), { ...Nm };
//#endregion
//#region src/ui-kit/scroll.ts
var sg = /* @__PURE__ */ new Map(), cg, lg = 240, ug = 50, dg = 70, fg = .55, pg = .35, mg = 480;
function hg(e, t) {
	return !e || !(t > 0) ? 0 : Math.sign(e) * (1 - 1 / (Math.abs(e) * fg / t + 1)) * t;
}
function gg(e) {
	let t = null, n = 0, r = () => typeof e.animate != "function" || matchMedia("(prefers-reduced-motion:reduce)").matches, i = () => {
		t = null, n || e.classList.remove("edgepull");
	}, a = (n, r) => {
		t?.cancel(), e.classList.add("edgepull"), t = e.animate(n, { duration: r }), t.onfinish = i;
	};
	return {
		drag(i) {
			r() || (t?.cancel(), t = null, n = -hg(i, e.clientWidth), e.classList.toggle("edgepull", !!n), n ? e.style.setProperty("--edge-pull", `${n}px`) : e.style.removeProperty("--edge-pull"));
		},
		release() {
			if (!n) return;
			let t = n, r = yg();
			n = 0, e.style.removeProperty("--edge-pull"), a([{
				"--edge-pull": `${t}px`,
				easing: r.easing
			}, { "--edge-pull": "0px" }], r.duration);
		},
		kick(t) {
			if (r() || n) return;
			let i = -hg(t * pg, Math.min(e.clientWidth, mg));
			if (!i) return;
			let o = yg();
			a([
				{
					"--edge-pull": "0px",
					easing: "cubic-bezier(.2,.8,.4,1)"
				},
				{
					"--edge-pull": `${i}px`,
					offset: .3,
					easing: o.easing
				},
				{ "--edge-pull": "0px" }
			], o.duration * 1.6);
		}
	};
}
function _g(e, { drag: t = !1, fade: n = !0 } = {}) {
	if (!e) return;
	let r = sg.get(e);
	if (r) return r.options.drag ||= t, r.options.fade ||= n, r.update(), r;
	let i = {
		drag: t,
		fade: n
	}, a = new AbortController(), o = gg(e), s = null, c = 0, l = 0, u = 0, d = !1, f = 0, p = 0, m = 0, h = 0, g = (t, n) => {
		e.dataset[t] !== n && (e.dataset[t] = n);
	}, _ = () => [
		"auto",
		"scroll",
		"hidden"
	].includes(getComputedStyle(e).overflowX), v = () => {
		if (i.fade) {
			let t = _();
			g("overflowLeft", String(t && e.scrollLeft > 1)), g("overflowRight", String(t && e.scrollLeft + e.clientWidth < e.scrollWidth - 1));
		}
	}, y = (e, t, n, r = {}) => e.addEventListener(t, n, {
		...r,
		signal: a.signal
	});
	y(e, "scroll", v, { passive: !0 });
	let b = (e) => {
		d || (d = !0, o.kick(e));
	}, x = () => {
		cancelAnimationFrame(f), f = 0, h = 0;
	}, S = (t) => {
		let n = Math.min(Math.max(t - p, 0), 64);
		if (p = t, m += (u - m) * (1 - Math.exp(-n / dg)), Math.abs(u - m) < .5 && (m = u), e.scrollLeft = m, m !== u) f = requestAnimationFrame(S);
		else if (f = 0, h) {
			let e = h;
			h = 0, b(e);
		}
	};
	y(e, "wheel", (t) => {
		let n = e.scrollWidth - e.clientWidth;
		if (t.defaultPrevented || !t.cancelable || Math.abs(t.deltaY) <= Math.abs(t.deltaX) || n <= 0 || !_()) return;
		t.preventDefault();
		let r = performance.now(), i = Math.abs(t.deltaY);
		r > l && (d = !1), l = r + lg;
		let a = f ? u : e.scrollLeft, o = a + t.deltaY;
		u = Math.min(n, Math.max(0, o));
		let s = o === u ? 0 : t.deltaY;
		i < ug || u === a ? (u !== a && (x(), e.scrollLeft = u), s && !f ? b(s) : s && (h = s)) : (s && (h = s), f ||= (m = e.scrollLeft, p = performance.now(), requestAnimationFrame(S)));
	}, { passive: !1 }), y(e, "mousedown", (t) => {
		!i.drag || t.button !== 0 || e.scrollWidth - e.clientWidth <= 1 || (t.stopPropagation(), x(), s = {
			x: t.pageX,
			left: e.scrollLeft
		}, c = 0, e.style.cursor = "grabbing");
	}), y(window, "mousemove", (t) => {
		if (!s) return;
		let n = t.pageX - s.x, r = s.left - n, i = e.scrollWidth - e.clientWidth;
		c = Math.max(c, Math.abs(n)), e.scrollLeft = r, o.drag(r < 0 ? r : r > i ? r - i : 0), t.preventDefault();
	}), y(window, "mouseup", () => {
		s && o.release(), s = null, e.style.cursor = "";
	}), y(e, "click", (e) => {
		c > 6 && (e.stopPropagation(), e.preventDefault(), c = 0);
	}, { capture: !0 });
	let C = new ResizeObserver(v), w = () => {
		C.observe(e);
		for (let t of e.children) C.observe(t);
		v();
	}, T = new MutationObserver(() => {
		C.disconnect(), w();
	});
	T.observe(e, {
		childList: !0,
		characterData: !0,
		subtree: !0
	}), w();
	let E = {
		options: i,
		update: v,
		destroy() {
			a.abort(), x(), C.disconnect(), T.disconnect(), sg.delete(e), e.style.cursor = "", sg.size || (cg?.disconnect(), cg = null);
		}
	};
	return sg.set(e, E), cg || (cg = new MutationObserver(() => {
		for (let [e, t] of sg) e.isConnected || t.destroy();
	}), cg.observe(document.body, {
		childList: !0,
		subtree: !0
	})), v(), E;
}
var vg = null;
function yg() {
	if (!vg) {
		let e = getComputedStyle(document.documentElement);
		vg = {
			easing: e.getPropertyValue("--spring-pane").trim() || "ease",
			duration: parseFloat(e.getPropertyValue("--spring-pane-ms")) || 300
		};
	}
	return vg;
}
[
	"[data-stage-side-content]",
	"[data-stage-scroll]",
	".tagpickbody",
	"[data-mix-list]",
	".playlistpicklist",
	"[data-player-stats]",
	".vjs-peach-settings-menu",
	".ui-geist-scroller-container",
	".metricstrip",
	".ui-tastesummaries",
	".ui-skeletondashstrip",
	".followpagination",
	".reviewtabs",
	".ftablewrap",
	".ui-board-local-nav",
	"[data-manage-menu]",
	".follow-workspace-switch",
	".fmanagenav",
	"[role=\"listbox\"]"
].join(",");
//#endregion
//#region src/react/components/use-horizontal-scroller.ts
function bg(e, t = !0) {
	let [n, r] = (0, N.useState)(null), i = (0, N.useCallback)((t) => {
		r(t), typeof e == "function" ? e(t) : e && (e.current = t);
	}, [e]);
	return (0, N.useLayoutEffect)(() => {
		if (!n || !t) return;
		n.dataset.horizontalScroll = "";
		let e = _g(n);
		return () => {
			e.destroy(), delete n.dataset.horizontalScroll, delete n.dataset.overflowLeft, delete n.dataset.overflowRight;
		};
	}, [n, t]), i;
}
//#endregion
//#region src/react/components/segmented.tsx
function xg(e) {
	let t = bg(og("selection"));
	return /* @__PURE__ */ (0, B.jsx)(wp, {
		...e,
		ref: t
	});
}
var Sg = "inline-flex w-max max-w-full items-center gap-0.5 overflow-x-auto overscroll-x-contain rounded-2lg bg-background-tertiary-default p-1", Cg = "flex min-h-7 flex-none cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1 max-sm:px-2 text-body-medium whitespace-nowrap text-text-secondary outline-none transition-colors hover:text-text-primary focus-visible:ring-2 focus-visible:ring-border-focus-ring data-focus-visible:ring-2 data-focus-visible:ring-border-focus-ring data-selected:bg-background-primary-default data-selected:text-text-primary data-selected:shadow-card dark:data-selected:bg-background-primary-hover";
//#endregion
//#region src/react/settings/busy-props.ts
function wg(e) {
	return e ? {
		"aria-busy": !0,
		"aria-disabled": !0
	} : {};
}
//#endregion
//#region src/react/boardui/components/base/buttons/icon-button.tsx
var Tg = Ht({
	base: [
		"relative inline-flex shrink-0 items-center justify-center overflow-visible rounded-2lg",
		"bg-background-primary-default text-foreground-icon-primary",
		"border border-border-button-default shadow-xs",
		"select-none cursor-pointer",
		"transition-[background-color,border-color,box-shadow,color] duration-150 ease",
		"outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-border-focus-ring",
		"hover:bg-background-primary-hover hover:border-border-button-hover",
		"active:bg-background-primary-active active:border-border-button-active",
		"disabled:cursor-not-allowed disabled:bg-background-primary-disabled disabled:border-border-button-default disabled:text-icon-button-disabled-foreground disabled:opacity-60 disabled:shadow-none"
	].join(" "),
	size: {
		medium: "size-9",
		small: "size-8"
	},
	icon: {
		medium: "size-5 shrink-0",
		small: "size-4 shrink-0"
	}
});
function Eg({ icon: e, size: t = "medium", className: n, type: r = "button", ref: i, ...a }) {
	return /* @__PURE__ */ (0, B.jsx)("button", {
		ref: i,
		type: r,
		className: z(Tg.base, Tg.size[t], n),
		...a,
		children: /* @__PURE__ */ (0, B.jsx)(e, {
			className: Tg.icon[t],
			"aria-hidden": !0
		})
	});
}
//#endregion
//#region src/react/boardui/components/base/dropdown/menu-styles.ts
var Dg = [
	"max-w-[calc(100vw-32px)] overflow-y-auto",
	"rounded-2xl border border-border-button-default bg-background-primary-default p-2.5 shadow-dropdown",
	"transition duration-150 ease-out",
	"data-[entering]:opacity-0 data-[entering]:scale-95 data-[entering]:blur-[2px]",
	"data-[exiting]:opacity-0 data-[exiting]:scale-95 data-[exiting]:blur-[2px]",
	"data-[placement=bottom]:origin-top-left data-[placement=top]:origin-bottom-left",
	"data-[placement=left]:origin-right data-[placement=right]:origin-left"
].join(" "), Og = "w-[266px]", kg = "flex w-full flex-col gap-1 outline-none", Ag = ["flex w-full cursor-pointer items-center gap-2 rounded-2lg p-2 text-left", "text-text-primary outline-none transition-colors"].join(" ");
//#endregion
//#region src/react/boardui/components/foundations/icons/chevrons.tsx
function jg(e) {
	return /* @__PURE__ */ (0, B.jsx)("svg", {
		viewBox: "0 0 16 16",
		fill: "none",
		"aria-hidden": !0,
		...e,
		children: /* @__PURE__ */ (0, B.jsx)("path", {
			d: "M4 7L7.29289 10.2929C7.68342 10.6834 8.31658 10.6834 8.70711 10.2929L12 7",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeLinecap: "round"
		})
	});
}
//#endregion
//#region src/react/boardui/utils/use-dismiss-on-outside-press.ts
function Mg(e, t, n) {
	(0, N.useEffect)(() => {
		if (!e) return;
		let r = (e) => {
			let r = e.target;
			n.some((e) => e.current?.contains(r)) || t();
		};
		return document.addEventListener("pointerdown", r, !0), () => document.removeEventListener("pointerdown", r, !0);
	}, [
		e,
		t,
		n
	]);
}
function Ng(e, t) {
	let n = (0, N.useRef)(!1);
	return (0, N.useEffect)(() => {
		if (!e) return;
		let r = (e) => {
			t.current?.contains(e.target) && (n.current = !0, setTimeout(() => {
				n.current = !1;
			}, 400));
		};
		return document.addEventListener("pointerdown", r, !0), () => document.removeEventListener("pointerdown", r, !0);
	}, [e, t]), (e) => e && n.current ? (n.current = !1, !1) : !0;
}
//#endregion
//#region src/react/boardui/components/base/select/select.tsx
var Pg = (0, N.createContext)("md");
function Fg({ className: e, triggerClassName: t, popoverClassName: n, size: r = "md", children: i, items: a, renderValue: o, ref: s, ...c }) {
	let l = (0, N.useRef)(null), u = (0, N.useRef)(null), [d, f] = (0, N.useState)(!1);
	Mg(d, () => f(!1), [l, u]);
	let p = Ng(d, l);
	return /* @__PURE__ */ (0, B.jsx)(Lp, {
		ref: s,
		...c,
		isOpen: d,
		onOpenChange: (e) => p(e) && f(e),
		className: z("group flex flex-col", e),
		children: ({ isOpen: e }) => /* @__PURE__ */ (0, B.jsxs)(B.Fragment, { children: [/* @__PURE__ */ (0, B.jsxs)(ns, {
			ref: l,
			className: z("flex w-full cursor-pointer items-center justify-between rounded-2lg", "border border-border-button-default bg-background-primary-default shadow-xs", "text-text-primary", "transition-[background-color,border-color,box-shadow,padding,font-size] duration-200 ease", "hover:bg-background-primary-hover hover:border-border-button-hover", "outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-border-focus-ring", "disabled:cursor-not-allowed disabled:bg-background-primary-disabled disabled:text-text-tertiary disabled:shadow-none", r === "sm" ? "gap-1 px-[7px] py-1 text-body-2-medium" : "gap-1.5 px-2.5 py-2 text-body-medium", t),
			children: [/* @__PURE__ */ (0, B.jsx)(Vp, {
				className: z("flex min-w-0 items-center truncate", r === "sm" ? "gap-1" : "gap-[5px]"),
				children: o
			}), /* @__PURE__ */ (0, B.jsx)(jg, { className: z("shrink-0 text-text-secondary transition-transform duration-200 ease", r === "sm" ? "size-3.5" : "size-4", e && "rotate-180") })]
		}), /* @__PURE__ */ (0, B.jsx)(Df, {
			ref: u,
			isNonModal: !0,
			offset: 4,
			className: z(Og, Dg, "p-2", n),
			children: /* @__PURE__ */ (0, B.jsx)(bu, {
				items: a,
				className: z(kg, "max-h-[240px] overflow-auto"),
				children: /* @__PURE__ */ (0, B.jsx)(Pg.Provider, {
					value: r,
					children: i
				})
			})
		})] })
	});
}
function Ig({ className: e, children: t, ...n }) {
	let r = (0, N.useContext)(Pg);
	return /* @__PURE__ */ (0, B.jsx)(wu, {
		...n,
		className: (t) => z(Ag, r === "sm" ? "px-2 py-1.5 text-body-2-medium" : "text-body-medium", (t.isFocused || t.isSelected) && "bg-dropdown-item-hover-background", t.isDisabled && "cursor-not-allowed text-text-disabled", typeof e == "function" ? e(t) : e),
		children: t
	});
}
//#endregion
//#region src/react/settings/folder-rows.tsx
function Lg({ className: e }) {
	return /* @__PURE__ */ (0, B.jsx)("svg", {
		"aria-hidden": !0,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 2,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		className: e,
		children: /* @__PURE__ */ (0, B.jsx)("use", { href: "#i-folder-search" })
	});
}
var Rg = jm, zg = (e) => Fm[e] || "database", Bg = (e) => Mm.includes(e);
function Vg({ index: e, cost: t, error: n, onChange: r }) {
	return /* @__PURE__ */ (0, B.jsxs)("div", {
		"data-media-read-policy": e,
		className: "flex w-full flex-col gap-1.5 @lg:w-48",
		children: [/* @__PURE__ */ (0, B.jsxs)(Fg, {
			"aria-label": `媒体读取策略 ${e + 1}`,
			placeholder: "选择读取策略",
			isRequired: !0,
			validationBehavior: "aria",
			isInvalid: !!n,
			selectedKey: t || null,
			onSelectionChange: (e) => {
				(e === "free" || e === "metered") && r(e);
			},
			children: [/* @__PURE__ */ (0, B.jsx)(Ig, {
				id: "free",
				children: "正常读取"
			}), /* @__PURE__ */ (0, B.jsx)(Ig, {
				id: "metered",
				children: "代理流量保护"
			})]
		}), n ? /* @__PURE__ */ (0, B.jsx)(Hm, { children: n }) : null]
	});
}
function Hg() {
	return /* @__PURE__ */ (0, B.jsx)(Vm, { children: "按挂载工具实际配置选择；代理流量保护会限制自动媒体读取。" });
}
function Ug({ initial: e, blank: t, pickFolder: n, describe: r, focusAfterPick: i = !1 }) {
	let [a, o] = (0, N.useState)(e), [s, c] = (0, N.useState)([]), [l, u] = (0, N.useState)(null), [d, f] = (0, N.useState)(null), p = (0, N.useRef)(!1), m = (0, N.useRef)([]);
	(0, N.useLayoutEffect)(() => {
		l !== null && (m.current[l]?.focus(), u(null));
	}, [l]);
	let h = (e, t) => o((n) => n.map((n, r) => r === e ? {
		...n,
		...t
	} : n)), g = (e, t) => c((n) => {
		let r = [...n];
		for (; r.length <= e;) r.push("");
		return r[e] = t, r;
	});
	return {
		rows: a,
		edit: h,
		add: () => {
			u(a.length), o((e) => [...e, t()]);
		},
		remove: (e) => {
			o((t) => t.filter((t, n) => n !== e)), c((t) => t.filter((t, n) => n !== e));
		},
		errors: s,
		setErrors: c,
		picking: d,
		pick: async (e) => {
			if (!p.current) {
				p.current = !0, f(e);
				try {
					let t = await n(a[e]?.path ?? "");
					t && (h(e, { path: t }), g(e, "")), i && u(e);
				} catch (t) {
					g(e, r(t));
				} finally {
					p.current = !1, f(null);
				}
			}
		},
		inputRef: (e) => (t) => {
			m.current[e] = t;
		}
	};
}
function Wg({ label: e, path: t, onPath: n, error: r, inputRef: i, picking: a, onPick: o, onRemove: s, status: c, children: l }) {
	let u = (0, N.useRef)(null), d = () => {
		let e = u.current;
		e && e.ownerDocument.activeElement !== e && (e.scrollLeft = e.scrollWidth);
	};
	return (0, N.useLayoutEffect)(() => {
		u.current && (u.current.title = t), d();
	}, [t]), /* @__PURE__ */ (0, B.jsxs)("div", {
		"data-folder-row": !0,
		className: "@container flex flex-col gap-2 rounded-2lg border border-separator-border bg-background-primary-default p-3",
		children: [/* @__PURE__ */ (0, B.jsxs)("div", {
			className: "flex items-start gap-2",
			children: [
				/* @__PURE__ */ (0, B.jsx)(dm, {
					className: "min-w-0 flex-1",
					"aria-label": e,
					placeholder: "媒体目录路径",
					value: t,
					onChange: n,
					ref: (e) => {
						u.current = e, i(e);
					},
					onBlur: () => requestAnimationFrame(d),
					validationBehavior: "aria",
					isInvalid: !!r,
					hint: r || void 0
				}),
				c ? /* @__PURE__ */ (0, B.jsx)("div", {
					className: "flex h-9 shrink-0 items-center",
					children: c
				}) : null,
				/* @__PURE__ */ (0, B.jsx)(Eg, {
					icon: Lg,
					"aria-label": "选择文件夹",
					onClick: o,
					...wg(a)
				}),
				s ? /* @__PURE__ */ (0, B.jsx)(Wt, {
					variant: "danger",
					iconOnly: !0,
					leadingIcon: nm,
					"aria-label": "移除这个文件夹",
					onClick: s
				}) : null
			]
		}), /* @__PURE__ */ (0, B.jsx)("div", {
			className: "flex flex-wrap items-end gap-2",
			children: l
		})]
	});
}
function Gg({ index: e, value: t, onChange: n, options: r = Rg }) {
	return /* @__PURE__ */ (0, B.jsx)(Fg, {
		className: "w-full @lg:w-60",
		"aria-label": `媒体来源 ${e + 1}`,
		selectedKey: t,
		onSelectionChange: (e) => {
			e !== null && n(String(e));
		},
		children: r.map(([e, t]) => /* @__PURE__ */ (0, B.jsxs)(Ig, {
			id: e,
			textValue: t,
			children: [/* @__PURE__ */ (0, B.jsx)(Jm, { mark: zg(e) }), t]
		}, e))
	});
}
//#endregion
//#region src/react/settings/password-pair.tsx
function Kg({ label: e, password: t, confirmation: n, onPassword: r, onConfirmation: i, disabled: a = !1, passwordError: o, passwordHint: s, confirmationError: c, confirmationInvalid: l = !1 }) {
	return /* @__PURE__ */ (0, B.jsxs)(B.Fragment, { children: [/* @__PURE__ */ (0, B.jsx)(dm, {
		id: "access-password",
		type: "password",
		label: e,
		autoComplete: "new-password",
		maxLength: 256,
		value: t,
		onChange: r,
		isDisabled: a,
		isRequired: !a,
		validationBehavior: "aria",
		isInvalid: !a && !!o,
		hint: a ? s : o || s
	}), /* @__PURE__ */ (0, B.jsx)(dm, {
		id: "access-confirm",
		type: "password",
		label: "确认访问密码",
		autoComplete: "new-password",
		maxLength: 256,
		value: n,
		onChange: i,
		isDisabled: a,
		isRequired: !a,
		validationBehavior: "aria",
		isInvalid: !a && (!!c || l),
		hint: a ? void 0 : c
	})] });
}
//#endregion
//#region src/react/settings/remote-reporting-settings.tsx
function qg({ value: e, onChange: t, busy: n = !1 }) {
	return /* @__PURE__ */ (0, B.jsxs)(B.Fragment, { children: [/* @__PURE__ */ (0, B.jsx)(zm, { children: /* @__PURE__ */ (0, B.jsx)(Im, {
		label: "发送版本统计与错误诊断（推荐）",
		description: "上传版本、系统信息、故障类型、代码位置与发生次数。",
		children: /* @__PURE__ */ (0, B.jsx)(Qm, {
			"aria-label": "发送版本统计与错误诊断（推荐）",
			isSelected: e.usage && e.errors,
			onChange: (n) => t({
				...e,
				usage: n,
				errors: n
			}),
			...wg(n)
		})
	}) }), e.available ? null : /* @__PURE__ */ (0, B.jsx)(Bm, {
		divided: !0,
		children: /* @__PURE__ */ (0, B.jsx)(Vm, { children: "上传服务未配置。" })
	})] });
}
//#endregion
//#region src/react/pages/setup/setup-form.tsx
var Jg = [
	"data_root",
	"host",
	"port",
	"mdns_name"
];
function Yg(e, t) {
	return Array.isArray(e) ? e.length === t ? {
		rows: e,
		table: ""
	} : {
		rows: [],
		table: e.filter(Boolean).join(" ")
	} : {
		rows: [],
		table: e ?? ""
	};
}
function Xg(e) {
	return e.length ? e.length === 1 ? `完成设置后扫描并补全资料：${e[0]}` : `完成设置后扫描这 ${e.length} 个文件夹并补全资料` : "完成设置后扫描并补全资料";
}
var Zg = (e) => Array.isArray(e) ? e.filter(Boolean).join(" ") : e ?? "";
function Qg({ setup: e, onDone: t }) {
	let n = e.questions.find((e) => e.input === "folders"), r = e.questions.filter((e) => e.input !== "folders"), i = e.media_sources.map(({ value: e, label: t }) => [e, t]), a = (t = "") => ({
		path: t,
		location: e.media_source_default,
		root: "",
		cost: e.media_source_default === "local" ? "free" : ""
	}), o = Ug({
		initial: () => [a(n?.default ?? "")],
		blank: () => a(),
		pickFolder: Sm,
		describe: Cm,
		focusAfterPick: !0
	}), [s, c] = (0, N.useState)(() => Object.fromEntries(r.map((e) => [e.key, e.default]))), [l, u] = (0, N.useState)(e.access_enabled), [d, f] = (0, N.useState)(""), [p, m] = (0, N.useState)(""), [h, g] = (0, N.useState)(e.scan_now), [_, v] = (0, N.useState)(e.history_guide), [y, b] = (0, N.useState)(e.remote_reporting), [x, S] = (0, N.useState)({}), [C, w] = (0, N.useState)(""), [T, E] = (0, N.useState)(""), [D, O] = (0, N.useState)(!1), [k, ee] = (0, N.useState)(!1), [A, j] = (0, N.useState)(0), te = (0, N.useRef)(null), ne = (0, N.useRef)(null), [re, M] = (0, N.useState)(0);
	(0, N.useEffect)(() => {
		re && te.current?.querySelector("input[aria-invalid=\"true\"]")?.focus();
	}, [re]);
	let ie = (e) => e ? /* @__PURE__ */ (0, B.jsx)("span", {
		role: "alert",
		children: e
	}, re) : void 0, ae = (e) => !e.visible_when || Object.entries(e.visible_when).every(([e, t]) => s[e] === t), oe = (e, t) => c((n) => ({
		...n,
		[e]: t
	})), se = async (e) => {
		if (e.preventDefault(), D) return;
		let n = o.rows.findIndex((e) => !e.cost);
		if (n >= 0) {
			ee(!0), requestAnimationFrame(() => te.current?.querySelector(`[data-media-read-policy="${n}"] button`)?.focus());
			return;
		}
		O(!0), E("");
		let i = {
			media_dir: o.rows,
			access_enabled: l,
			scan_now: h,
			history_guide: _,
			...y ? { remote_reporting: {
				usage: y.usage,
				errors: y.errors
			} } : {}
		};
		for (let e of r) ae(e) && (i[e.key] = s[e.key] ?? "");
		l && Object.assign(i, {
			access_password: d,
			access_confirm: p
		});
		try {
			t(await bm(i));
		} catch (e) {
			if (e instanceof _m && e.status === 400 && e.errors) {
				let t = e.errors, { rows: n, table: r } = Yg(t.media_dir, o.rows.length);
				o.setErrors(n), w(r), S(t), Jg.some((e) => t[e]) && j((e) => e + 1), t.access_password && u(!0), M((e) => e + 1);
			} else E(Cm(e));
		} finally {
			O(!1);
		}
	}, ce = (e) => {
		let t = Zg(x[e.key]), n = e.help.join("");
		if (e.input === "choice") {
			let r = `setup-${e.key}-label`;
			return /* @__PURE__ */ (0, B.jsxs)("div", {
				className: "flex flex-col gap-1.5",
				children: [
					/* @__PURE__ */ (0, B.jsx)(am, {
						id: r,
						elementType: "span",
						children: e.label
					}),
					/* @__PURE__ */ (0, B.jsx)(xg, {
						"aria-labelledby": r,
						orientation: "horizontal",
						className: Sg,
						value: s[e.key] ?? e.default,
						onChange: (t) => oe(e.key, t),
						children: (e.options ?? []).map((e) => /* @__PURE__ */ (0, B.jsx)(Tp, {
							value: e.value,
							className: Cg,
							children: e.label
						}, e.value))
					}),
					n ? /* @__PURE__ */ (0, B.jsx)(Vm, { children: n }) : null,
					t ? /* @__PURE__ */ (0, B.jsx)(Hm, { children: t }, re) : null
				]
			}, e.key);
		}
		return /* @__PURE__ */ (0, B.jsx)(dm, {
			id: `f-${e.key}`,
			label: e.label,
			isRequired: e.required,
			inputMode: e.input === "number" ? "numeric" : void 0,
			autoComplete: "off",
			spellCheck: "false",
			value: s[e.key] ?? "",
			onChange: (t) => oe(e.key, t),
			leadingAddon: e.prefix ? /* @__PURE__ */ (0, B.jsx)("span", {
				className: "shrink-0 pl-1 text-body-regular text-text-secondary",
				children: e.prefix
			}) : void 0,
			trailingIcon: e.suffix ? () => /* @__PURE__ */ (0, B.jsx)("span", {
				className: "shrink-0 pr-1 text-body-regular text-text-secondary",
				children: e.suffix
			}) : void 0,
			validationBehavior: "aria",
			isInvalid: !!t,
			hint: ie(t) ?? (n || void 0)
		}, e.key);
	}, le = o.rows.map((e) => e.path.trim()).filter(Boolean), ue = o.rows.some((e) => Bg(e.location));
	return /* @__PURE__ */ (0, B.jsxs)("form", {
		ref: te,
		noValidate: !0,
		onSubmit: (e) => void se(e),
		"aria-labelledby": "auth-card-title",
		className: "flex flex-col gap-6",
		children: [
			n ? /* @__PURE__ */ (0, B.jsxs)(qt, {
				first: !0,
				labelledBy: "setup-media-title",
				children: [
					/* @__PURE__ */ (0, B.jsxs)(Jt, {
						id: "setup-media-title",
						children: [n.label, /* @__PURE__ */ (0, B.jsx)("span", {
							"aria-hidden": !0,
							className: "ml-0.5 text-text-error-primary",
							children: "*"
						})]
					}),
					C ? /* @__PURE__ */ (0, B.jsx)(Hm, { children: C }, re) : null,
					/* @__PURE__ */ (0, B.jsx)("div", {
						role: "group",
						"aria-labelledby": "setup-media-title",
						className: "flex flex-col gap-3",
						children: o.rows.map((e, t) => /* @__PURE__ */ (0, B.jsxs)(Wg, {
							label: `${n.label} ${t + 1}`,
							path: e.path,
							onPath: (e) => o.edit(t, { path: e }),
							error: ie(o.errors[t]),
							inputRef: o.inputRef(t),
							picking: o.picking === t,
							onPick: () => void o.pick(t),
							onRemove: o.rows.length > 1 ? () => {
								o.remove(t), ne.current?.focus();
							} : void 0,
							children: [/* @__PURE__ */ (0, B.jsx)(Gg, {
								index: t,
								value: e.location,
								options: i,
								onChange: (e) => o.edit(t, {
									location: e,
									cost: e === "local" ? "free" : ""
								})
							}), /* @__PURE__ */ (0, B.jsx)(Vg, {
								index: t,
								cost: e.cost ?? "",
								error: k && !e.cost ? "请选择媒体读取策略" : void 0,
								onChange: (e) => o.edit(t, { cost: e })
							})]
						}, t))
					}),
					/* @__PURE__ */ (0, B.jsx)(Wt, {
						ref: ne,
						variant: "secondary",
						leadingIcon: em,
						className: "self-start",
						onClick: o.add,
						children: "添加媒体库"
					}),
					ue ? /* @__PURE__ */ (0, B.jsxs)(B.Fragment, { children: [
						/* @__PURE__ */ (0, B.jsx)(Hg, {}),
						/* @__PURE__ */ (0, B.jsxs)(Vm, { children: [e.cloud.help, /* @__PURE__ */ (0, B.jsx)(Um, {
							href: e.cloud.link.url,
							children: e.cloud.link.label
						})] }),
						e.cloud.dependencies.map((e) => /* @__PURE__ */ (0, B.jsxs)(Vm, { children: [e.message, /* @__PURE__ */ (0, B.jsx)(Um, {
							href: e.download_url,
							children: e.download_label
						})] }, e.name))
					] }) : null,
					n.help.map((e) => /* @__PURE__ */ (0, B.jsx)(Vm, { children: e }, e))
				]
			}) : null,
			/* @__PURE__ */ (0, B.jsxs)(qt, {
				labelledBy: "setup-access-title",
				children: [
					/* @__PURE__ */ (0, B.jsxs)("div", {
						className: "flex items-start justify-between gap-4",
						children: [/* @__PURE__ */ (0, B.jsxs)("div", {
							className: "flex min-w-0 flex-col gap-0.5",
							children: [/* @__PURE__ */ (0, B.jsx)(Jt, {
								id: "setup-access-title",
								children: "访问密码"
							}), /* @__PURE__ */ (0, B.jsx)("p", {
								id: "setup-access-description",
								className: "text-body-2-regular text-text-secondary",
								children: "开启后，访问 Peach 需要先登录。"
							})]
						}), /* @__PURE__ */ (0, B.jsx)(Qm, {
							"aria-labelledby": "setup-access-title",
							"aria-describedby": "setup-access-description",
							isSelected: l,
							onChange: u
						})]
					}),
					/* @__PURE__ */ (0, B.jsx)(Vm, { children: "未设置密码时，能连接到 Peach 的设备可直接进入。" }),
					l ? /* @__PURE__ */ (0, B.jsx)(Kg, {
						label: "访问密码",
						password: d,
						confirmation: p,
						onPassword: f,
						onConfirmation: m,
						passwordError: ie(Zg(x.access_password)),
						passwordHint: "请输入 8–256 个字符。",
						confirmationInvalid: !!x.access_password
					}) : null
				]
			}),
			/* @__PURE__ */ (0, B.jsx)(qt, { children: /* @__PURE__ */ (0, B.jsx)(Km, {
				summary: "高级设置",
				defaultOpen: A > 0,
				children: /* @__PURE__ */ (0, B.jsx)("div", {
					className: "flex flex-col gap-4",
					children: r.filter(ae).map(ce)
				})
			}, A) }),
			/* @__PURE__ */ (0, B.jsxs)(qt, {
				labelledBy: "setup-options-title",
				children: [
					/* @__PURE__ */ (0, B.jsx)(Jt, {
						id: "setup-options-title",
						children: "完成设置后"
					}),
					/* @__PURE__ */ (0, B.jsxs)("div", {
						className: "flex flex-col gap-1.5",
						children: [/* @__PURE__ */ (0, B.jsx)($p, {
							isSelected: h,
							onChange: g,
							children: Xg(le)
						}), /* @__PURE__ */ (0, B.jsx)(Vm, { children: "读取已有 NFO 和封面，采集缺失资料。符合自动规则的资料会在处理完成后保存到数据库，其余资料留待确认。" })]
					}),
					/* @__PURE__ */ (0, B.jsxs)("section", {
						"aria-labelledby": "setup-history-title",
						className: "flex flex-col gap-1.5 border-t border-separator-border pt-4",
						children: [
							/* @__PURE__ */ (0, B.jsxs)("h3", {
								id: "setup-history-title",
								className: "flex items-center gap-2 text-body-medium text-text-primary",
								children: ["浏览器历史记录", /* @__PURE__ */ (0, B.jsx)("span", {
									className: "text-body-2-regular text-text-tertiary",
									children: "可选"
								})]
							}),
							/* @__PURE__ */ (0, B.jsx)($p, {
								isSelected: _,
								onChange: v,
								children: "接下来导入浏览器历史记录"
							}),
							/* @__PURE__ */ (0, B.jsx)(Vm, { children: "用于生成口味分析。完成设置后选择读取这台电脑，或导入其他设备的记录；也可稍后从「口味」进入。" })
						]
					})
				]
			}),
			T ? /* @__PURE__ */ (0, B.jsx)(Hm, { children: T }) : null,
			y ? /* @__PURE__ */ (0, B.jsxs)(qt, { children: [
				/* @__PURE__ */ (0, B.jsx)(Jt, { children: "版本统计与错误诊断" }),
				/* @__PURE__ */ (0, B.jsx)(qg, {
					value: y,
					onChange: b
				}),
				/* @__PURE__ */ (0, B.jsx)(Vm, { children: "馆藏与口味明细上传默认关闭，可在「应用与维护」查看并选择。" })
			] }) : null,
			/* @__PURE__ */ (0, B.jsx)(Wt, {
				type: "submit",
				className: "self-start",
				...wg(D),
				children: "完成设置"
			})
		]
	});
}
//#endregion
//#region src/react/pages/setup/setup-restore.tsx
function $g({ onDone: e }) {
	let [t, n] = (0, N.useState)(""), [r, i] = (0, N.useState)(""), [a, o] = (0, N.useState)(!1);
	return /* @__PURE__ */ (0, B.jsxs)("form", {
		className: "flex flex-col gap-4",
		onSubmit: async (n) => {
			if (n.preventDefault(), !a) {
				o(!0), i("");
				try {
					e(await xm(t));
				} catch (e) {
					let t = e instanceof _m ? e.errors?.data_root : void 0;
					i(typeof t == "string" ? t : Cm(e));
				} finally {
					o(!1);
				}
			}
		},
		noValidate: !0,
		children: [/* @__PURE__ */ (0, B.jsx)(dm, {
			label: "已有数据目录",
			value: t,
			onChange: n,
			isRequired: !0,
			autoComplete: "off",
			spellCheck: "false",
			validationBehavior: "aria",
			isInvalid: !!r,
			hint: r ? /* @__PURE__ */ (0, B.jsx)("span", {
				role: "alert",
				children: r
			}) : "选择包含 config.toml 和 database 文件夹的数据目录。"
		}), /* @__PURE__ */ (0, B.jsx)(Wt, {
			type: "submit",
			className: "self-start",
			...wg(a),
			children: a ? "正在连接数据目录…" : "使用此目录"
		})]
	});
}
//#endregion
//#region src/react/pages/setup/setup-page.tsx
function e_() {
	let [e, t] = (0, N.useState)({ kind: "loading" }), [n, r] = (0, N.useState)(0), [i, a] = (0, N.useState)(!1);
	return (0, N.useEffect)(() => {
		let e = new AbortController();
		return ym(e.signal).then((e) => t({
			kind: "form",
			setup: e
		}), (n) => {
			e.signal.aborted || t(n instanceof _m && n.status === 403 ? { kind: "denied" } : {
				kind: "failed",
				message: Cm(n)
			});
		}), () => e.abort();
	}, [n]), e.kind === "done" ? /* @__PURE__ */ (0, B.jsx)(Ym, { done: e.done }) : /* @__PURE__ */ (0, B.jsxs)(Kt, {
		title: "欢迎使用 Peach",
		lede: "添加媒体库，开始整理馆藏。",
		busy: e.kind === "loading",
		children: [
			e.kind === "denied" ? /* @__PURE__ */ (0, B.jsx)(pm, {
				tone: "error",
				children: "请在运行 Peach 的这台电脑上打开设置。"
			}) : null,
			e.kind === "failed" ? /* @__PURE__ */ (0, B.jsx)(pm, {
				tone: "error",
				action: /* @__PURE__ */ (0, B.jsx)(Wt, {
					variant: "secondary",
					onClick: () => {
						t({ kind: "loading" }), r((e) => e + 1);
					},
					children: "重试"
				}),
				children: e.message
			}) : null,
			e.kind === "form" ? /* @__PURE__ */ (0, B.jsxs)(B.Fragment, { children: [/* @__PURE__ */ (0, B.jsx)(Wt, {
				variant: "secondary",
				className: "self-start",
				onClick: () => a((e) => !e),
				children: i ? "返回首次设置" : "使用已有数据目录"
			}), i ? /* @__PURE__ */ (0, B.jsx)($g, { onDone: (e) => t({
				kind: "done",
				done: e
			}) }) : /* @__PURE__ */ (0, B.jsx)(Qg, {
				setup: e.setup,
				onDone: (e) => t({
					kind: "done",
					done: e
				})
			})] }) : null
		]
	});
}
//#endregion
//#region src/react/pages/index.tsx
var t_ = {
	setup: e_,
	login: fm,
	error: Zt
};
u(), ne();
var n_ = document.getElementById("peach-page"), r_ = n_ ? t_[n_.dataset.page ?? ""] : void 0;
n_ && r_ && (0, ue.createRoot)(n_).render(/* @__PURE__ */ (0, B.jsx)(r_, { data: { ...n_.dataset } }));
//#endregion
