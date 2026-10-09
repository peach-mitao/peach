import { api as e, esc as t, icon as n, requestErrorMessage as r } from "/js/core.js";
import { SKELETON_REVEAL_DELAY as i, boardTabsHtml as a, configurationSkeletonHtml as o, emptyStateHtml as s, fitSkeleton as c, iconSwapHtml as l, iconSwitchHtml as u, indexSkeletonHtml as d, loadingDotsHtml as f, moveGlidePane as p, noteHtml as m, scrollMovesAnchor as h, searchInputHtml as g, setIconSwap as _, skeletonHtml as v } from "/js/ui-components.js";
//#region \0rolldown/runtime.js
var y = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), ee = [
	["seed", "随机"],
	["rating", "评分"],
	["o", "高潮计数"],
	["plays", "观看次数"],
	["dur", "时长"],
	["size", "体积"],
	["new", "入库时间"],
	["played", "观看时间"]
], te = ["release", "发行时间"], ne = [...ee, te].map(([e]) => e), b = {
	rating: ["从高到低", "从低到高"],
	o: ["从多到少", "从少到多"],
	plays: ["从多到少", "从少到多"],
	dur: ["从长到短", "从短到长"],
	size: ["从大到小", "从小到大"],
	new: ["从新到旧", "从旧到新"],
	played: ["从近到远", "从远到近"],
	release: ["从新到旧", "从旧到新"]
}, re = {
	big: ["size", "desc"],
	short: ["dur", "asc"],
	long: ["dur", "desc"]
}, ie = (e, t, n = b) => (n[e] || [])[+(t === "asc")] || "", ae = (e, t = b) => t[e] ? "desc" : "";
function oe(e, t, n, r = b) {
	return e === t ? r[e] ? {
		sort: e,
		dir: n === "asc" ? "desc" : "asc"
	} : null : {
		sort: e,
		dir: ae(e, r)
	};
}
function se(e, t, n) {
	return e === "seed" ? "" : e === t && n === "asc" ? "asc" : "desc";
}
//#endregion
//#region src/jav-artwork.ts
function x(e) {
	return [
		"small",
		"sleeve",
		"preview"
	].includes(String(e)) ? "small" : "big";
}
function ce(e) {
	return {
		javLayout: x(e.javLayout),
		javImage: le(e.javLayout === "preview" ? "thumbnail" : e.javImage)
	};
}
function le(e) {
	return e === "thumbnail" ? "thumbnail" : "cover";
}
function ue(e, t) {
	return e.is_jav && e.code && e.has_cover && (le(t) === "cover" || !e.has_thumb) ? "cover" : e.has_thumb ? "thumbnail" : "";
}
var de = .704;
function fe(e, t) {
	let n = Number(e?.px?.[0]), r = Number(e?.px?.[1]), i = Number(e?.x0);
	if (!(n > 0 && r > 0 && t > 0) || !Number.isFinite(i)) return null;
	let a = (e, t, n) => Math.min(n, Math.max(0, Number.isFinite(Number(e)) ? Number(e) : t)), o = a(i, 0, n), s = Math.max(o, a(e?.x1, n, n)), c = a(e?.y0, 0, r), l = Math.max(c, a(e?.y1, r, r)), u = s - o, d = l - c;
	if (!(u > 0 && d > 0)) return null;
	let f = u / d / t;
	if (!(f > 0)) return null;
	let p = f <= 1 ? (1 - f) / 2 - o / d / t : 1 - s / d / t, m = (e) => (Math.round(e * 1e4) || 0) / 100;
	return {
		clip: {
			top: m(c / r),
			right: m(1 - s / n),
			bottom: m(1 - l / r),
			left: m(o / n)
		},
		left: m(p),
		top: m(-c / d),
		height: m(r / d)
	};
}
function pe(e, t) {
	e.querySelectorAll("img[data-jav-image]").forEach((e) => {
		let n = e.dataset.javCover || "", r = e.dataset.javThumb || "", i = !!(n && (le(t) === "cover" || !r)), a = i ? n : r;
		e.classList.toggle("cover", i), e.classList.toggle("whole", i && e.dataset.javImageLayout !== "big"), e.classList.toggle("front", i && e.dataset.javImageLayout === "big"), e.classList.remove("panel"), e.removeAttribute("style"), e.closest(".pic,[data-media-pic]")?.style.removeProperty("--cover-blur"), a && e.getAttribute("src") !== a && (e.src = a);
	});
}
function me(e, t) {
	let n = [];
	return e.querySelectorAll("img[data-jav-image]").forEach((e) => {
		e.dataset.javImageLayout !== t && (e.dataset.javImageLayout = t, e.classList.contains("cover") && (e.classList.toggle("whole", t !== "big"), e.classList.toggle("front", t === "big"), e.classList.remove("panel"), e.removeAttribute("style"), e.closest(".pic,[data-media-pic]")?.style.removeProperty("--cover-blur"), e.complete && e.naturalWidth && n.push(e)));
	}), n;
}
//#endregion
//#region src/number-setting.ts
function S(e, t, n, r) {
	return Number.isInteger(e) && e >= t && e <= n ? e : r;
}
//#endregion
//#region src/settings-store.ts
function he(e, t) {
	let n = /* @__PURE__ */ new Set(), r = 0, i = () => {
		r += 1, n.forEach((e) => e());
	};
	return {
		value: t,
		version: () => r,
		subscribe(e) {
			return n.add(e), () => {
				n.delete(e);
			};
		},
		save() {
			localStorage.setItem(e, JSON.stringify(t)), i();
		},
		notify: i
	};
}
//#endregion
//#region src/sidebar.ts
var ge = [
	"",
	"follow",
	"jav",
	"performers",
	"tags",
	"studios",
	"flagged",
	"manage"
], _e = [
	"playlists",
	"immerse",
	"stats",
	"review",
	"data-cleanup",
	"trash",
	"follow-manage",
	"quality"
], ve = /* @__PURE__ */ new Set([...ge, ..._e]), ye = (e) => e === "ads" || e === "dupes" ? "data-cleanup" : e;
function be(e) {
	let t = Array.isArray(e) ? e.filter((e) => typeof e == "string") : [], n = [...new Set(t.map(ye))].filter((e) => ve.has(e));
	return n.length ? n : [...ge];
}
function xe(e) {
	return [
		"/",
		"/unseen",
		"/watch-later",
		"/flagged",
		"/trash",
		"/junk-files"
	].includes(e) || /^\/(item|mix|parts|editions)\//.test(e) || /^\/playlists\/\d+\/\d+$/.test(e) || /^\/(performers|studios|creators|series|agencies)\/.+/.test(e);
}
function Se(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) for (let e of new Set(n.tags || [])) t.set(e, (t.get(e) || 0) + 1);
	return [...t].sort((e, t) => t[1] - e[1]).slice(0, 30);
}
//#endregion
//#region src/appearance/home-glow.ts
var Ce = [
	"spot1",
	"spot2",
	"spot3"
], we = [
	"光晕一",
	"光晕二",
	"光晕三"
], Te = "native", C = [
	[
		"ash",
		"灰雾",
		{
			spot1: {
				color: "#8f98a4",
				alpha: 52
			},
			spot2: {
				color: "#b6bcc4",
				alpha: 38
			},
			spot3: {
				color: "#6f7783",
				alpha: 50
			}
		},
		"blue"
	],
	[
		"amber",
		"钨丝暖阁",
		{
			spot1: {
				color: "#e08a2f",
				alpha: 62
			},
			spot2: {
				color: "#c4544a",
				alpha: 52
			},
			spot3: {
				color: "#a86a52",
				alpha: 52
			}
		},
		"amber"
	],
	[
		"plum",
		"夜樱",
		{
			spot1: {
				color: "#b455a0",
				alpha: 64
			},
			spot2: {
				color: "#6a4fd0",
				alpha: 54
			},
			spot3: {
				color: "#7a4f96",
				alpha: 56
			}
		},
		"violet"
	],
	[
		"pine",
		"深林",
		{
			spot1: {
				color: "#3f9e57",
				alpha: 66
			},
			spot2: {
				color: "#7fae4a",
				alpha: 48
			},
			spot3: {
				color: "#4f9463",
				alpha: 56
			}
		},
		"emerald"
	],
	[
		"iris",
		"琉璃霞",
		{
			spot1: {
				color: "#1e50a2",
				alpha: 62
			},
			spot2: {
				color: "#f09199",
				alpha: 52
			},
			spot3: {
				color: "#895b8a",
				alpha: 52
			}
		},
		"indigo"
	],
	[
		"opal",
		"蛋白石",
		{
			spot1: {
				color: "#9be0e8",
				alpha: 62
			},
			spot2: {
				color: "#c4b5f7",
				alpha: 52
			},
			spot3: {
				color: "#f8b8d9",
				alpha: 52
			}
		},
		"sky"
	],
	[
		"lagoon",
		"潟湖",
		{
			spot1: {
				color: "#5ce3e6",
				alpha: 62
			},
			spot2: {
				color: "#0f9cc2",
				alpha: 52
			},
			spot3: {
				color: "#274a78",
				alpha: 52
			}
		},
		"teal"
	],
	[
		"jade",
		"翡翠",
		{
			spot1: {
				color: "#8fe3b0",
				alpha: 62
			},
			spot2: {
				color: "#22c79a",
				alpha: 52
			},
			spot3: {
				color: "#0b5f51",
				alpha: 52
			}
		},
		"emerald"
	],
	[
		"flare",
		"耀斑",
		{
			spot1: {
				color: "#ffc24b",
				alpha: 62
			},
			spot2: {
				color: "#f4664d",
				alpha: 52
			},
			spot3: {
				color: "#8a2e5e",
				alpha: 52
			}
		},
		"orange"
	],
	[
		"orchid",
		"兰紫",
		{
			spot1: {
				color: "#e794c9",
				alpha: 62
			},
			spot2: {
				color: "#9678ce",
				alpha: 52
			},
			spot3: {
				color: "#4a3894",
				alpha: 52
			}
		},
		"violet"
	],
	[
		"peach",
		"桃晕",
		{
			spot1: {
				color: "#ffc9a3",
				alpha: 62
			},
			spot2: {
				color: "#f08a8c",
				alpha: 52
			},
			spot3: {
				color: "#b65e8c",
				alpha: 52
			}
		},
		"rose"
	],
	[
		"tide",
		"电蓝",
		{
			spot1: {
				color: "#6fd8f2",
				alpha: 62
			},
			spot2: {
				color: "#4c5be0",
				alpha: 52
			},
			spot3: {
				color: "#2a2450",
				alpha: 52
			}
		},
		"blue"
	],
	[
		"sunset",
		"落日",
		{
			spot1: {
				color: "#ffae3f",
				alpha: 62
			},
			spot2: {
				color: "#f0574d",
				alpha: 52
			},
			spot3: {
				color: "#5d2a66",
				alpha: 52
			}
		},
		"amber"
	],
	[
		"mint",
		"薄荷冰",
		{
			spot1: {
				color: "#a8f0dc",
				alpha: 62
			},
			spot2: {
				color: "#52cbb0",
				alpha: 52
			},
			spot3: {
				color: "#147a5f",
				alpha: 52
			}
		},
		"emerald"
	],
	[
		"bloom",
		"夜昙",
		{
			spot1: {
				color: "#4c3894",
				alpha: 62
			},
			spot2: {
				color: "#b387e8",
				alpha: 52
			},
			spot3: {
				color: "#f6c6e2",
				alpha: 52
			}
		},
		"fuchsia"
	],
	[
		"rosegold",
		"玫瑰金",
		{
			spot1: {
				color: "#fbc9ac",
				alpha: 62
			},
			spot2: {
				color: "#e79ba7",
				alpha: 52
			},
			spot3: {
				color: "#8e5a74",
				alpha: 52
			}
		},
		"rose"
	],
	[
		Te,
		"玻璃原色",
		{
			spot1: {
				color: "#6686b8",
				alpha: 52
			},
			spot2: {
				color: "#8f98a4",
				alpha: 44
			},
			spot3: {
				color: "#6686b8",
				alpha: 52
			}
		},
		"blue"
	]
], w = (e) => e === Te, Ee = [...C.map(([e, t]) => [e, t]), ["custom", "自定义"]], De = (e) => (Ee.find(([t]) => t === e) || Ee[0])[1], Oe = (e) => structuredClone((C.find(([t]) => t === e) || C[0])[2]), ke = [
	["red", "红"],
	["orange", "橙"],
	["amber", "琥珀"],
	["lime", "柠绿"],
	["emerald", "翠绿"],
	["teal", "青绿"],
	["sky", "天蓝"],
	["blue", "蓝"],
	["indigo", "靛蓝"],
	["violet", "紫罗兰"],
	["fuchsia", "品红"],
	["rose", "玫红"]
], Ae = "blue", je = (e) => ke.some(([t]) => t === e) ? e : Ae, Me = (e) => (C.find(([t]) => t === e) || [])[3] || "blue", Ne = [
	["all", "全部"],
	["gray", "灰"],
	["red", "红"],
	["yellow", "黄"],
	["green", "绿"],
	["cyan", "青"],
	["blue", "蓝"],
	["purple", "紫"],
	["brown", "棕"]
], Pe = [
	[
		"gray",
		"云灰",
		"#d8dade"
	],
	[
		"gray",
		"雾灰",
		"#b6bcc4"
	],
	[
		"gray",
		"石灰",
		"#8f98a4"
	],
	[
		"gray",
		"铁灰",
		"#6f7783"
	],
	[
		"gray",
		"墨灰",
		"#4a4e56"
	],
	[
		"gray",
		"深灰",
		"#2e3138"
	],
	[
		"red",
		"樱红",
		"#f08a8a"
	],
	[
		"red",
		"珊瑚",
		"#e26a62"
	],
	[
		"red",
		"砖红",
		"#c4544a"
	],
	[
		"red",
		"朱红",
		"#b5322f"
	],
	[
		"red",
		"酒红",
		"#8e2a2c"
	],
	[
		"red",
		"暗红",
		"#6b2224"
	],
	[
		"yellow",
		"麦黄",
		"#f2d48a"
	],
	[
		"yellow",
		"琥珀",
		"#e8b451"
	],
	[
		"yellow",
		"钨丝",
		"#e08a2f"
	],
	[
		"yellow",
		"金黄",
		"#cf8a20"
	],
	[
		"yellow",
		"姜黄",
		"#a9701c"
	],
	[
		"yellow",
		"栗黄",
		"#7d5216"
	],
	[
		"green",
		"嫩芽",
		"#a9cf7e"
	],
	[
		"green",
		"叶绿",
		"#7fae4a"
	],
	[
		"green",
		"草绿",
		"#5da34f"
	],
	[
		"green",
		"森绿",
		"#3f9e57"
	],
	[
		"green",
		"苔绿",
		"#4f9463"
	],
	[
		"green",
		"墨绿",
		"#27563a"
	],
	[
		"blue",
		"天蓝",
		"#9fc2e8"
	],
	[
		"blue",
		"湖蓝",
		"#6a9fd8"
	],
	[
		"blue",
		"靛蓝",
		"#4478c0"
	],
	[
		"blue",
		"宝蓝",
		"#2f5ba3"
	],
	[
		"blue",
		"深蓝",
		"#27467c"
	],
	[
		"blue",
		"夜蓝",
		"#1c3358"
	],
	[
		"purple",
		"丁香",
		"#c3a7e0"
	],
	[
		"purple",
		"品红",
		"#b455a0"
	],
	[
		"purple",
		"薰衣草",
		"#a67fd2"
	],
	[
		"purple",
		"葡萄",
		"#6a4fd0"
	],
	[
		"purple",
		"茄紫",
		"#7a4f96"
	],
	[
		"purple",
		"深紫",
		"#432c6d"
	],
	[
		"brown",
		"沙棕",
		"#d6b492"
	],
	[
		"brown",
		"陶棕",
		"#bd8f68"
	],
	[
		"brown",
		"赭棕",
		"#a86a52"
	],
	[
		"brown",
		"栗棕",
		"#8c5340"
	],
	[
		"brown",
		"褐棕",
		"#6d3f31"
	],
	[
		"brown",
		"深褐",
		"#4e2d23"
	],
	[
		"red",
		"霞红",
		"#f09199"
	],
	[
		"red",
		"藕粉",
		"#f8b8d9"
	],
	[
		"red",
		"火红",
		"#f4664d"
	],
	[
		"red",
		"桃红",
		"#f08a8c"
	],
	[
		"red",
		"夕红",
		"#f0574d"
	],
	[
		"red",
		"粉樱",
		"#f6c6e2"
	],
	[
		"red",
		"玫粉",
		"#e79ba7"
	],
	[
		"yellow",
		"阳黄",
		"#ffc24b"
	],
	[
		"yellow",
		"橘黄",
		"#ffae3f"
	],
	[
		"green",
		"玉绿",
		"#8fe3b0"
	],
	[
		"green",
		"翠绿",
		"#22c79a"
	],
	[
		"green",
		"深翠",
		"#0b5f51"
	],
	[
		"green",
		"松绿",
		"#147a5f"
	],
	[
		"cyan",
		"浅青",
		"#9be0e8"
	],
	[
		"cyan",
		"碧波",
		"#5ce3e6"
	],
	[
		"cyan",
		"孔雀",
		"#0f9cc2"
	],
	[
		"cyan",
		"冰青",
		"#6fd8f2"
	],
	[
		"cyan",
		"薄荷",
		"#a8f0dc"
	],
	[
		"cyan",
		"碧绿",
		"#52cbb0"
	],
	[
		"blue",
		"琉璃",
		"#1e50a2"
	],
	[
		"blue",
		"藏蓝",
		"#274a78"
	],
	[
		"blue",
		"电蓝",
		"#4c5be0"
	],
	[
		"purple",
		"古紫",
		"#895b8a"
	],
	[
		"purple",
		"紫藤",
		"#c4b5f7"
	],
	[
		"purple",
		"梅紫",
		"#8a2e5e"
	],
	[
		"purple",
		"兰粉",
		"#e794c9"
	],
	[
		"purple",
		"兰紫",
		"#9678ce"
	],
	[
		"purple",
		"靛紫",
		"#4a3894"
	],
	[
		"purple",
		"莓紫",
		"#b65e8c"
	],
	[
		"purple",
		"墨紫",
		"#2a2450"
	],
	[
		"purple",
		"暮紫",
		"#5d2a66"
	],
	[
		"purple",
		"夜紫",
		"#4c3894"
	],
	[
		"purple",
		"淡紫",
		"#b387e8"
	],
	[
		"purple",
		"玫紫",
		"#8e5a74"
	],
	[
		"brown",
		"杏橙",
		"#ffc9a3"
	],
	[
		"brown",
		"浅杏",
		"#fbc9ac"
	],
	[
		"blue",
		"霁蓝",
		"#6686b8"
	]
], Fe = (e, t, n, r) => Number.isInteger(e) && e >= t && e <= n ? e : r, Ie = (e, t) => /^#[0-9a-f]{6}$/i.test(String(e)) ? String(e).toLowerCase() : t, Le = (e, t) => `rgba(${[
	1,
	3,
	5
].map((t) => parseInt(e.slice(t, t + 2), 16)).join(",")},${(t / 100).toFixed(2)})`, Re = {
	strength: [
		0,
		100,
		100
	],
	noise: [
		0,
		100,
		0
	],
	speed: [
		0,
		300,
		100
	],
	soften: [
		0,
		100,
		50
	],
	size: [
		0,
		100,
		50
	]
}, ze = {
	on: !0,
	preset: "ash",
	strength: 100,
	noise: 0,
	speed: 100,
	soften: 50,
	size: 50,
	...Oe("ash")
};
function Be(e) {
	let t = e && typeof e == "object" ? e : {}, n = Ee.some(([e]) => e === t.preset), r = n ? t.preset : "ash", i = Oe(r === "custom" ? "ash" : r), a = {
		on: t.on !== !1,
		preset: r
	};
	for (let [e, [n, r, i]] of Object.entries(Re)) a[e] = Fe(+t[e], n, r, i);
	for (let e of Ce) {
		let r = n && t[e] && typeof t[e] == "object" ? t[e] : {}, o = i[e];
		a[e] = {
			color: Ie(r.color, o.color),
			alpha: Fe(+r.alpha, 0, 100, o.alpha)
		};
	}
	return a;
}
var Ve = (e) => `conic-gradient(from -90deg,${e.map((t, n) => `${t} ${(n * 100 / e.length).toFixed(3)}% ${((n + 1) * 100 / e.length).toFixed(3)}%`).join(",")})`, He = /* @__PURE__ */ new WeakMap();
function Ue(e, t) {
	if (!e) return;
	let n = He.get(e);
	n || (n = /* @__PURE__ */ new Map(), He.set(e, n));
	let r = t.on && !w(t.preset), i = (t, r) => {
		n.get(t) !== r && (n.set(t, r), e.style.setProperty(t, r));
	};
	i("--glow-strength", String(r ? t.strength / 100 : 0)), i("--glow-noise", String(r ? t.noise / 100 : 0)), i("--glow-soften", (.7 + t.soften / 100 * .6).toFixed(3)), i("--glow-size", (.5 + t.size / 100).toFixed(3)), i("--glow-drift-scale", t.speed ? (100 / t.speed).toFixed(3) : "1"), i("--glow-drift-play", t.speed ? "running" : "paused"), Ce.forEach((e, n) => {
		let r = t[e];
		i(`--glow-spot-${n + 1}-color`, Le(r.color, r.alpha));
	});
}
function We(e, t) {
	if (!e) return;
	let n = !t.on || w(t.preset);
	if (e.toggleAttribute("data-glow-native", n), e.style.setProperty("--glow-drift-scale", t.speed ? (100 / t.speed).toFixed(3) : "1"), e.style.setProperty("--glow-drift-play", t.speed ? "running" : "paused"), n) {
		e.style.removeProperty("--glass-tint-a"), e.style.removeProperty("--glass-tint-b");
		return;
	}
	e.style.setProperty("--glass-tint-a", t.spot1.color), e.style.setProperty("--glass-tint-b", t.spot2.color);
}
//#endregion
//#region src/appearance/settings.ts
var Ge = "peach.settings.v1", Ke = [
	"system",
	"light",
	"dark"
], qe = [
	0,
	7,
	30,
	90
], Je = [
	0,
	7,
	30,
	90
], Ye = [
	"feedHideGroupCompilations",
	"feedHideSoloCompilations",
	"feedHideExcerpts"
], Xe = {
	batchSize: 60,
	defaultSort: "seed",
	sortDefaultsVersion: 3,
	hoverDelaySeconds: 5,
	seekSeconds: 10,
	searchHistoryLimit: 10,
	relatedLimit: 20,
	javLayout: "big",
	homeLayout: "small",
	javImage: "cover",
	followLayout: "default",
	peopleLayout: "big",
	photoSize: "small",
	ambientMode: !0,
	miniplayer: !0,
	theaterMode: !1,
	theme: "system",
	groupCollapse: !0,
	sidebarOrder: [...ge],
	homeGlow: ze,
	accent: Ae
}, T = (e, t, n) => t.includes(e) ? e : n;
function Ze(e) {
	let t = e && typeof e == "object" ? e : {}, n = {
		...Xe,
		...t
	};
	n.followInitialDays = qe.includes(+n.followInitialDays) ? +n.followInitialDays : 30, delete n.rotateMinutes;
	let r = !1, i = +n.sortDefaultsVersion || 0;
	i < 2 && n.defaultSort === "new" && (n.defaultSort = "seed", r = !0);
	let a = re[n.defaultSort];
	return i < 3 && a && (n.defaultSort = a[0], r = !0), n.sortDefaultsVersion = 3, n.batchSize = S(+n.batchSize, 1, 200, 60), n.defaultSort = T(n.defaultSort, ne, "seed"), n.hoverDelaySeconds = S(+n.hoverDelaySeconds, 0, 60, 5), n.seekSeconds = S(+n.seekSeconds, 1, 300, 10), delete n.loginDays, n.ambientMode = n.ambientMode !== !1, n.theaterMode = n.theaterMode === !0, n.groupCollapse = n.groupCollapse !== !1, n.detailAutoplay = n.detailAutoplay !== !1, n.miniplayer = n.miniplayer !== !1, n.uiSounds = n.uiSounds !== !1, n.feedAutoScroll = n.feedAutoScroll !== !1, n.feedHideGroupCompilations = n.feedHideGroupCompilations !== !1, n.feedHideSoloCompilations = n.feedHideSoloCompilations === !0, n.feedHideExcerpts = n.feedHideExcerpts !== !1, n.searchHistoryLimit = S(+n.searchHistoryLimit, 0, 50, 10), n.relatedLimit = S(+n.relatedLimit, 0, 60, 20), n.metadataRefreshDays = T(+n.metadataRefreshDays, Je, 30), Object.assign(n, ce(n)), n.theme = T(n.theme, Ke, "system"), n.homeGlow = Be(n.homeGlow), n.accent = je(n.accent), n.sidebarOrder = be(n.sidebarOrder), {
		settings: n,
		migrated: r
	};
}
function Qe(e) {
	let t = {};
	try {
		t = JSON.parse(e.getItem("peach.settings.v1") || "{}");
	} catch {}
	return Ze(t);
}
var $e = null;
function E() {
	if ($e) return $e;
	let { settings: e, migrated: t } = Qe(localStorage);
	return $e = he(Ge, e), t && $e.save(), $e;
}
function et(e, t, n = E()) {
	let r = n.value, i = e && e.followInitialDays;
	qe.includes(i) && (r.followInitialDays = i, n.save());
	let a = e && e.metadataRefreshDays;
	Je.includes(a) && a !== r.metadataRefreshDays && (r.metadataRefreshDays = a, n.save());
	for (let t of Ye) typeof e?.[t] == "boolean" && e[t] !== r[t] && (r[t] = e[t], n.save());
	let o = e && e.searchHistoryLimit;
	Number.isInteger(o) && o >= 0 && o <= 50 ? o !== r.searchHistoryLimit && (r.searchHistoryLimit = S(o, 0, 50, 10), n.save(), t("searchHistoryLimit")) : e && e.searchHistoryLimit === null && r.searchHistoryLimit !== Xe.searchHistoryLimit && tt(n);
	let s = Array.isArray(e && e.sidebarOrder) ? e.sidebarOrder : null;
	!s || !s.length || s.join(",") === r.sidebarOrder.join(",") || (r.sidebarOrder = s, n.save());
}
function tt(t = E()) {
	return e("/api/settings", {
		method: "POST",
		body: JSON.stringify({ searchHistoryLimit: t.value.searchHistoryLimit })
	}).catch(() => {});
}
//#endregion
//#region src/appearance/theme.ts
var nt = [
	[
		"system",
		"跟随系统",
		"monitor"
	],
	[
		"light",
		"浅色",
		"sun"
	],
	[
		"dark",
		"深色",
		"moon"
	]
], rt = null, it = () => rt ??= matchMedia("(prefers-color-scheme: dark)");
function at(e = E().value.theme) {
	let t = document.documentElement;
	e === "system" ? delete t.dataset.theme : t.dataset.theme = e;
	let n = e === "dark" || e === "system" && it().matches;
	t.classList.toggle("dark", n), document.querySelectorAll("[data-board-theme]").forEach((e) => e.setAttribute("aria-pressed", String(e.dataset.boardTheme === "dark" === n))), document.querySelector(".board-theme-toggle")?.classList.toggle("is-dark", n), document.querySelectorAll("meta[data-theme-color]").forEach((e) => {
		e.media = e.dataset.themeColor === "dark" === n ? "all" : "not all";
	});
}
var ot = !1;
function st() {
	ot || (ot = !0, it().addEventListener("change", () => {
		E().value.theme === "system" && at();
	}));
}
//#endregion
//#region src/appearance/layout.ts
var ct = [[
	"big",
	"大图",
	"maximize"
], [
	"small",
	"小图",
	"layout-grid"
]], lt = [[
	"big",
	"大图",
	"maximize"
], [
	"small",
	"小图",
	"layout-grid"
]], ut = [[
	"fixed",
	"固定比例",
	"layout-grid"
], [
	"masonry",
	"瀑布流",
	"columns-2"
]], dt = .75, D = () => E().value, ft = (e = D()) => x(e.javLayout), pt = (e = D()) => x(e.homeLayout), mt = (e, t = D()) => e ? pt(t) : ft(t), ht = lt.map(([e]) => e), gt = ut.map(([e]) => e), _t = (e = D()) => T(e.photoSize, ht, "small"), vt = (e = D()) => T(e.photoLayout, gt, "masonry"), yt = null;
function bt(e, t = D()) {
	let n = {
		active: e.active,
		size: mt(e.home, t),
		portrait: e.portrait,
		javImage: t.javImage
	}, r = yt;
	return (!r || Object.keys(n).some((e) => n[e] !== r[e])) && (yt = n), yt;
}
function xt(e) {
	return e.portrait ? 9 / 16 : e.active && e.size === "big" ? dt : 16 / 9;
}
function St(e, t = E()) {
	t.value.homeLayout = x(e), t.save();
}
function Ct(e, t = E()) {
	t.value.javLayout = x(e), t.save();
}
function wt(e, t = E()) {
	t.value.homeLayout = t.value.javLayout = x(e), t.save();
}
function Tt(e, t = E()) {
	t.value.photoSize = T(e, ht, "small"), t.save();
}
function Et(e, t = E()) {
	t.value.photoLayout = T(e, gt, "masonry"), t.save();
}
//#endregion
//#region src/appearance/density.ts
var Dt = "density", Ot = {
	big: "336px",
	dense: "168px"
}, kt = () => localStorage.getItem(Dt) === "dense" ? "dense" : "big";
function At(e, t) {
	let [n, r] = lt;
	e.querySelector("[data-icon-swap]") ? _(e, t === r[0] ? "b" : "a") : e.innerHTML = l(n[2], r[2], t === r[0] ? "b" : "a"), e.setAttribute("aria-label", t === "big" ? "切换为小图" : "切换为大图");
}
var jt = () => document.querySelector("#density");
function Mt(e = kt()) {
	document.documentElement.style.setProperty("--tile", Ot[e]), document.body.dataset.density = e;
	let t = jt();
	t && (t.setAttribute("aria-pressed", String(e === "dense")), t.title = "当前：" + (e === "big" ? "大图" : "密集"), At(t, e === "big" ? "big" : "small"));
}
function Nt() {
	let e = kt() === "big" ? "dense" : "big";
	localStorage.setItem(Dt, e), Mt(e);
}
function Pt(e) {
	let t = jt();
	t && (t.setAttribute("aria-pressed", String(e === "small")), t.title = "当前：" + (e === "big" ? "大图" : "小图"), At(t, e));
}
//#endregion
//#region src/appearance/glow.ts
function Ft(e = E()) {
	Ue(document.querySelector(".glowlayer"), e.value.homeGlow);
}
var It = 0;
function Lt(e = E()) {
	It ||= requestAnimationFrame(() => {
		It = 0, Ft(e);
	});
}
function Rt(e = E()) {
	We(document.documentElement, e.value.homeGlow);
}
function zt(e = E()) {
	document.documentElement.dataset.accent = e.value.accent;
}
var Bt = (e, t, n) => ({
	key: e,
	label: t,
	native: w(e),
	fill: w(e) ? "" : Ve(n)
});
function Vt(e) {
	let t = C.map(([e, t, n]) => Bt(e, t, Ce.map((e) => n[e].color)));
	return e.preset === "custom" && t.push(Bt("custom", "自定义", Ce.map((t) => e[t].color))), t;
}
var Ht = ke;
function Ut(e, t = E()) {
	if (e === "custom") return;
	let n = t.value.homeGlow;
	n.preset = e, Object.assign(n, Oe(e)), t.value.accent = Me(e), t.save(), Lt(t), Rt(t), zt(t);
}
function Wt(e, t = E()) {
	t.value.accent = je(e), t.save(), zt(t);
}
function Gt(e = E()) {
	let t = e.value.homeGlow;
	t.preset = ze.preset, Object.assign(t, Oe(t.preset)), e.value.accent = Ae, e.save(), Lt(e), Rt(e), zt(e);
}
function Kt(e, t) {
	e.style.setProperty("--glow-swatch", t.on ? t.spot1.color : "var(--color-accent-500)"), e.toggleAttribute("data-glow-native", t.on && w(t.preset)), e.toggleAttribute("data-glow-off", !t.on);
}
function qt(e, t = E()) {
	return Kt(e, t.value.homeGlow), t.subscribe(() => Kt(e, t.value.homeGlow));
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/timeoutManager.js
var Jt = {
	setTimeout: (e, t) => setTimeout(e, t),
	clearTimeout: (e) => clearTimeout(e),
	setInterval: (e, t) => setInterval(e, t),
	clearInterval: (e) => clearInterval(e)
}, O = new class {
	#e = Jt;
	setTimeoutProvider(e) {
		this.#e = e;
	}
	setTimeout(e, t) {
		return this.#e.setTimeout(e, t);
	}
	clearTimeout(e) {
		this.#e.clearTimeout(e);
	}
	setInterval(e, t) {
		return this.#e.setInterval(e, t);
	}
	clearInterval(e) {
		this.#e.clearInterval(e);
	}
}();
function Yt(e) {
	setTimeout(e, 0);
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/utils.js
var Xt = typeof window > "u" || "Deno" in globalThis;
function k() {}
function Zt(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function Qt(e) {
	return typeof e == "number" && e >= 0 && e !== Infinity;
}
function $t(e, t) {
	return Math.max(e + (t || 0) - Date.now(), 0);
}
function A(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function en(e, t) {
	let { type: n = "all", exact: r, fetchStatus: i, predicate: a, queryKey: o, stale: s } = e;
	if (o) {
		if (r) {
			if (t.queryHash !== nn(o, t.options)) return !1;
		} else if (!M(t.queryKey, o)) return !1;
	}
	if (n !== "all") {
		let e = t.isActive();
		if (n === "active" && !e || n === "inactive" && e) return !1;
	}
	return !(typeof s == "boolean" && t.isStale() !== s || i && i !== t.state.fetchStatus || a && !a(t));
}
function tn(e, t) {
	let { exact: n, status: r, predicate: i, mutationKey: a } = e;
	if (a) {
		if (!t.options.mutationKey) return !1;
		if (n) {
			if (j(t.options.mutationKey) !== j(a)) return !1;
		} else if (!M(t.options.mutationKey, a)) return !1;
	}
	return !(r && t.state.status !== r || i && !i(t));
}
function nn(e, t) {
	return (t?.queryKeyHashFn || j)(e);
}
function j(e) {
	return JSON.stringify(e, (e, t) => cn(t) ? Object.keys(t).sort().reduce((e, n) => (e[n] = t[n], e), {}) : t);
}
function M(e, t) {
	if (e === t) return !0;
	if (typeof e != typeof t) return !1;
	if (e && t && typeof e == "object" && typeof t == "object") {
		if (Array.isArray(e) && Array.isArray(t)) {
			if (t.length > e.length) return !1;
			for (let n = 0; n < t.length; n++) if (!M(e[n], t[n])) return !1;
			return !0;
		}
		let n = Object.keys(t);
		for (let r of n) if (!M(e[r], t[r])) return !1;
		return !0;
	}
	return !1;
}
var rn = Object.prototype.hasOwnProperty;
function an(e, t, n = 0) {
	if (e === t) return e;
	if (n > 500) return t;
	let r = sn(e) && sn(t);
	if (!r && !(cn(e) && cn(t))) return t;
	let i = (r ? e : Object.keys(e)).length, a = r ? t : Object.keys(t), o = a.length, s = r ? Array(o) : {}, c = 0;
	for (let l = 0; l < o; l++) {
		let o = r ? l : a[l], u = e[o], d = t[o];
		if (u === d) {
			s[o] = u, (r ? l < i : rn.call(e, o)) && c++;
			continue;
		}
		if (u === null || d === null || typeof u != "object" || typeof d != "object") {
			s[o] = d;
			continue;
		}
		let f = an(u, d, n + 1);
		s[o] = f, f === u && c++;
	}
	return i === o && c === i ? e : s;
}
function on(e, t) {
	if (!t || Object.keys(e).length !== Object.keys(t).length) return !1;
	for (let n in e) if (e[n] !== t[n]) return !1;
	return !0;
}
function sn(e) {
	return Array.isArray(e) && e.length === Object.keys(e).length;
}
function cn(e) {
	if (!ln(e)) return !1;
	let t = Object.getPrototypeOf(e), n = t?.constructor;
	if (n === void 0) return !0;
	if (typeof n != "function") return !1;
	let r = n.prototype;
	return !(!ln(r) || !r.hasOwnProperty("isPrototypeOf") || t !== Object.prototype);
}
function ln(e) {
	return Object.prototype.toString.call(e) === "[object Object]";
}
function un(e) {
	return new Promise((t) => {
		O.setTimeout(t, e);
	});
}
function dn(e, t, n) {
	return typeof n.structuralSharing == "function" ? n.structuralSharing(e, t) : n.structuralSharing === !1 ? t : an(e, t);
}
function fn(e) {
	return e;
}
function pn(e, t, n = 0) {
	let r = [...e, t];
	return n && r.length > n ? r.slice(1) : r;
}
function mn(e, t, n = 0) {
	let r = [t, ...e];
	return n && r.length > n ? r.slice(0, -1) : r;
}
var hn = Symbol();
function gn(e, t) {
	return !e.queryFn && t?.initialPromise ? () => t.initialPromise : !e.queryFn || e.queryFn === hn ? () => Promise.reject(/* @__PURE__ */ Error(`Missing queryFn: '${e.queryHash}'`)) : e.queryFn;
}
function _n(e, t) {
	return typeof e == "function" ? e(...t) : !!e;
}
function vn(e, t, n) {
	let r = !1, i;
	return Object.defineProperty(e, "signal", {
		enumerable: !0,
		get: () => (i ??= t(), r ? i : (r = !0, i.aborted ? n() : i.addEventListener("abort", n, { once: !0 }), i))
	}), e;
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/environmentManager.js
var yn = () => Xt, bn = () => yn(), xn = {
	isServer: bn,
	setIsServer(e) {
		yn = e;
	}
}, N = class {
	constructor() {
		this.listeners = /* @__PURE__ */ new Set(), this.subscribe = this.subscribe.bind(this);
	}
	subscribe(e) {
		return this.listeners.add(e), this.onSubscribe(), () => {
			this.listeners.delete(e), this.onUnsubscribe();
		};
	}
	hasListeners() {
		return this.listeners.size > 0;
	}
	onSubscribe() {}
	onUnsubscribe() {}
}, Sn = new class extends N {
	#e;
	#t;
	#n;
	constructor() {
		super(), this.#n = (e) => {
			if (typeof window < "u" && window.addEventListener) {
				let t = () => e();
				return window.addEventListener("visibilitychange", t, !1), () => {
					window.removeEventListener("visibilitychange", t);
				};
			}
		};
	}
	onSubscribe() {
		this.#t || this.setEventListener(this.#n);
	}
	onUnsubscribe() {
		this.hasListeners() || (this.#t?.(), this.#t = void 0);
	}
	setEventListener(e) {
		this.#n = e, this.#t?.(), this.#t = e((e) => {
			typeof e == "boolean" ? this.setFocused(e) : this.onFocus();
		});
	}
	setFocused(e) {
		this.#e !== e && (this.#e = e, this.onFocus());
	}
	onFocus() {
		let e = this.isFocused();
		this.listeners.forEach((t) => {
			t(e);
		});
	}
	isFocused() {
		return typeof this.#e == "boolean" ? this.#e : globalThis.document?.visibilityState !== "hidden";
	}
}();
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/hydration.js
function Cn(e) {
	let t;
	if (e.then((e) => (t = e, e), k)?.catch?.(k), t !== void 0) return { data: t };
}
function wn(e) {
	return {
		mutationKey: e.options.mutationKey,
		state: e.state,
		...e.options.scope && { scope: e.options.scope },
		...e.meta && { meta: e.meta }
	};
}
function Tn(e, t, n) {
	let r = e.promise?.then(t).catch((e) => n?.(e) === !1 ? Promise.reject(e) : Promise.reject(/* @__PURE__ */ Error("redacted")));
	return r?.catch(k), r;
}
function En(e, t, n) {
	return {
		dehydratedAt: Date.now(),
		state: {
			...e.state,
			...e.state.data !== void 0 && { data: t ? t(e.state.data) : e.state.data }
		},
		queryKey: e.queryKey,
		queryHash: e.queryHash,
		...e.state.status === "pending" && { promise: Tn(e, t, n) },
		...e.meta && { meta: e.meta },
		...e.queryType && { queryType: e.queryType }
	};
}
function Dn(e) {
	return e.state.isPaused;
}
function On(e) {
	return e.state.status === "success";
}
function kn(e, t = {}) {
	let n = t.shouldDehydrateMutation ?? e.getDefaultOptions().dehydrate?.shouldDehydrateMutation ?? Dn, r = e.getMutationCache().getAll().flatMap((e) => n(e) ? [wn(e)] : []), i = t.shouldDehydrateQuery ?? e.getDefaultOptions().dehydrate?.shouldDehydrateQuery ?? On, a = t.shouldRedactErrors ?? e.getDefaultOptions().dehydrate?.shouldRedactErrors, o = t.serializeData ?? e.getDefaultOptions().dehydrate?.serializeData;
	return {
		mutations: r,
		queries: e.getQueryCache().getAll().flatMap((e) => i(e) ? [En(e, o, a)] : [])
	};
}
function An(e, t, n) {
	let r = e.getMutationCache(), i = e.getQueryCache(), a = n?.defaultOptions?.deserializeData ?? e.getDefaultOptions().hydrate?.deserializeData;
	t.mutations?.forEach(({ state: t, ...i }) => {
		r.build(e, {
			...e.getDefaultOptions().hydrate?.mutations,
			...n?.defaultOptions?.mutations,
			...i
		}, t);
	}), t.queries?.forEach(({ queryKey: t, state: r, queryHash: o, meta: s, promise: c, dehydratedAt: l, queryType: u }) => {
		let d = c ? Cn(c) : void 0, f = r.data === void 0 ? d?.data : r.data, p = f === void 0 ? f : a ? a(f) : f, m = i.get(o), h = m?.state.status === "pending", g = m?.state.fetchStatus === "fetching";
		if (m) {
			let e = d && l > m.state.dataUpdatedAt;
			if (r.dataUpdatedAt > m.state.dataUpdatedAt || e) {
				let { fetchStatus: e, ...t } = r;
				m.setState({
					...t,
					data: p,
					...r.status === "pending" && p !== void 0 && {
						status: "success",
						dataUpdatedAt: l,
						...!g && { fetchStatus: "idle" }
					}
				});
			}
		} else m = i.build(e, {
			...e.getDefaultOptions().hydrate?.queries,
			...n?.defaultOptions?.queries,
			queryKey: t,
			queryHash: o,
			meta: s,
			_type: u
		}, {
			...r,
			data: p,
			fetchStatus: "idle",
			status: r.status === "pending" && p !== void 0 ? "success" : r.status,
			...r.status === "pending" && p !== void 0 && { dataUpdatedAt: l }
		});
		c && !d && !h && !g && l > m.state.dataUpdatedAt && m.fetch(void 0, { initialPromise: Promise.resolve(c).then(a) }).catch(k);
	});
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/notifyManager.js
var jn = Yt;
function Mn() {
	let e = [], t = 0, n = (e) => {
		e();
	}, r = (e) => {
		e();
	}, i = jn, a = (r) => {
		t ? e.push(r) : i(() => {
			n(r);
		});
	}, o = () => {
		let t = e;
		e = [], t.length && i(() => {
			r(() => {
				t.forEach((e) => {
					n(e);
				});
			});
		});
	};
	return {
		batch: (e) => {
			let n;
			t++;
			try {
				n = e();
			} finally {
				t--, t || o();
			}
			return n;
		},
		batchCalls: (e) => (...t) => {
			a(() => {
				e(...t);
			});
		},
		schedule: a,
		setNotifyFunction: (e) => {
			n = e;
		},
		setBatchNotifyFunction: (e) => {
			r = e;
		},
		setScheduler: (e) => {
			i = e;
		}
	};
}
var P = Mn(), Nn = new class extends N {
	#e = !0;
	#t;
	#n;
	constructor() {
		super(), this.#n = (e) => {
			if (typeof window < "u" && window.addEventListener) {
				let t = () => e(!0), n = () => e(!1);
				return window.addEventListener("online", t, !1), window.addEventListener("offline", n, !1), () => {
					window.removeEventListener("online", t), window.removeEventListener("offline", n);
				};
			}
		};
	}
	onSubscribe() {
		this.#t || this.setEventListener(this.#n);
	}
	onUnsubscribe() {
		this.hasListeners() || (this.#t?.(), this.#t = void 0);
	}
	setEventListener(e) {
		this.#n = e, this.#t?.(), this.#t = e(this.setOnline.bind(this));
	}
	setOnline(e) {
		this.#e !== e && (this.#e = e, this.listeners.forEach((t) => {
			t(e);
		}));
	}
	isOnline() {
		return this.#e;
	}
}();
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/retryer.js
function Pn(e) {
	return Math.min(1e3 * 2 ** e, 3e4);
}
function Fn(e) {
	return (e ?? "online") !== "online" || Nn.isOnline();
}
var In = class extends Error {
	constructor(e) {
		super("CancelledError"), this.revert = e?.revert, this.silent = e?.silent;
	}
};
function Ln(e) {
	return e instanceof In;
}
function Rn(e) {
	let t = !1, n = 0, r, i = "pending", a, o, s = new Promise((e, t) => {
		a = e, o = t;
	});
	s.catch(k);
	let c = () => i !== "pending", l = (t) => {
		if (!c()) {
			let n = new In(t);
			h(n), e.onCancel?.(n);
		}
	}, u = () => {
		t = !0;
	}, d = () => {
		t = !1;
	}, f = () => Sn.isFocused() && (e.networkMode === "always" || Nn.isOnline()) && e.canRun(), p = () => Fn(e.networkMode) && e.canRun(), m = (e) => {
		c() || (r?.(), i = "resolved", a(e));
	}, h = (e) => {
		c() || (r?.(), i = "rejected", o(e));
	}, g = () => new Promise((t) => {
		r = (e) => {
			(c() || f()) && t(e);
		}, e.onPause?.();
	}).then(() => {
		r = void 0, c() || e.onContinue?.();
	}), _ = () => {
		if (c()) return;
		let r, i = n === 0 ? e.initialPromise : void 0;
		try {
			r = i ?? e.fn();
		} catch (e) {
			r = Promise.reject(e);
		}
		Promise.resolve(r).then(m).catch((r) => {
			if (c()) return;
			let i = e.retry ?? (bn() ? 0 : 3), a = e.retryDelay ?? Pn, o = typeof a == "function" ? a(n, r) : a, s = i === !0 || typeof i == "number" && n < i || typeof i == "function" && i(n, r);
			if (t || !s) {
				h(r);
				return;
			}
			n++, e.onFail?.(n, r), un(o).then(() => f() ? void 0 : g()).then(() => {
				t ? h(r) : _();
			});
		});
	};
	return {
		promise: s,
		status: () => i,
		cancel: l,
		continue: () => (r?.(), s),
		cancelRetry: u,
		continueRetry: d,
		canStart: p,
		start: () => (p() ? _() : g().then(_), s)
	};
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/removable.js
var zn = class {
	#e;
	destroy() {
		this.clearGcTimeout();
	}
	scheduleGc() {
		this.clearGcTimeout(), Qt(this.gcTime) && (this.#e = O.setTimeout(() => {
			this.optionalRemove();
		}, this.gcTime));
	}
	updateGcTime(e) {
		this.gcTime = Math.max(this.gcTime || 0, e ?? (bn() ? Infinity : 3e5));
	}
	clearGcTimeout() {
		this.#e !== void 0 && (O.clearTimeout(this.#e), this.#e = void 0);
	}
};
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/infiniteQueryBehavior.js
function Bn(e) {
	return { onFetch: (t, n) => {
		let r = t.options, i = t.fetchOptions?.meta?.fetchMore?.direction, a = t.state.data?.pages || [], o = t.state.data?.pageParams || [], s = {
			pages: [],
			pageParams: []
		}, c = 0, l = async () => {
			let n = !1, l = (e) => {
				vn(e, () => t.signal, () => n = !0);
			}, u = gn(t.options, t.fetchOptions), d = async (e, r, i) => {
				if (n) return Promise.reject(t.signal.reason);
				if (r == null && e.pages.length) return Promise.resolve(e);
				let a = (() => {
					let e = {
						client: t.client,
						queryKey: t.queryKey,
						pageParam: r,
						direction: i ? "backward" : "forward",
						meta: t.options.meta
					};
					return l(e), e;
				})(), o = await u(a), { maxPages: s } = t.options, c = i ? mn : pn;
				return {
					pages: c(e.pages, o, s),
					pageParams: c(e.pageParams, r, s)
				};
			};
			if (i && a.length) {
				let e = i === "backward", t = e ? Hn : Vn, n = {
					pages: a,
					pageParams: o
				};
				s = await d(n, t(r, n), e);
			} else {
				let t = e ?? a.length;
				do {
					let e = c === 0 ? o[0] ?? r.initialPageParam : Vn(r, s);
					if (c > 0 && e == null) break;
					s = await d(s, e), c++;
				} while (c < t);
			}
			return s;
		};
		t.fetchFn = t.options.persister ? () => t.options.persister?.(l, {
			client: t.client,
			queryKey: t.queryKey,
			meta: t.options.meta,
			signal: t.signal
		}, n) : l;
	} };
}
function Vn(e, { pages: t, pageParams: n }) {
	let r = t.length - 1;
	return t.length > 0 ? e.getNextPageParam(t[r], t, n[r], n) : void 0;
}
function Hn(e, { pages: t, pageParams: n }) {
	return t.length > 0 ? e.getPreviousPageParam?.(t[0], t, n[0], n) : void 0;
}
function Un(e, t) {
	return t ? Vn(e, t) != null : !1;
}
function Wn(e, t) {
	return !t || !e.getPreviousPageParam ? !1 : Hn(e, t) != null;
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/query.js
var Gn = class extends zn {
	#e;
	#t;
	#n;
	#r;
	#i;
	#a;
	#o;
	#s;
	constructor(e) {
		super(), this.#s = !1, this.#o = e.defaultOptions, this.setOptions(e.options), this.observers = [], this.#i = e.client, this.#r = this.#i.getQueryCache(), this.queryKey = e.queryKey, this.queryHash = e.queryHash, this.#t = Jn(this.options), this.state = e.state ?? this.#t, this.scheduleGc();
	}
	get meta() {
		return this.options.meta;
	}
	get queryType() {
		return this.#e;
	}
	get promise() {
		return this.#a?.promise;
	}
	setOptions(e) {
		if (this.options = {
			...this.#o,
			...e
		}, e?._type && (this.#e = e._type), this.updateGcTime(this.options.gcTime), this.state && this.state.data === void 0) {
			let e = Jn(this.options);
			e.data !== void 0 && (this.setState(qn(e.data, e.dataUpdatedAt)), this.#t = e);
		}
	}
	optionalRemove() {
		!this.observers.length && this.state.fetchStatus === "idle" && this.#r.remove(this);
	}
	setData(e, t) {
		let n = dn(this.state.data, e, this.options);
		return this.#c({
			data: n,
			type: "success",
			dataUpdatedAt: t?.updatedAt,
			manual: t?.manual
		}), n;
	}
	setState(e) {
		this.#c({
			type: "setState",
			state: e
		});
	}
	cancel(e) {
		let t = this.#a?.promise;
		return this.#a?.cancel(e), t ? t.then(k).catch(k) : Promise.resolve();
	}
	destroy() {
		super.destroy(), this.cancel({ silent: !0 });
	}
	get resetState() {
		return this.#t;
	}
	reset() {
		this.destroy(), this.setState(this.resetState);
	}
	isActive() {
		return this.observers.some((e) => A(e.options.enabled, this) !== !1);
	}
	isDisabled() {
		return this.getObserversCount() > 0 ? !this.isActive() : this.options.queryFn === hn || !this.isFetched();
	}
	isFetched() {
		return this.state.dataUpdateCount + this.state.errorUpdateCount > 0;
	}
	isStatic() {
		return this.getObserversCount() > 0 && this.observers.some((e) => A(e.options.staleTime, this) === "static");
	}
	isStale() {
		return this.getObserversCount() > 0 ? this.observers.some((e) => e.getCurrentResult().isStale) : this.state.data === void 0 || this.state.isInvalidated;
	}
	isStaleByTime(e = 0) {
		return this.state.data === void 0 ? !0 : e === "static" ? !1 : this.state.isInvalidated ? !0 : !$t(this.state.dataUpdatedAt, e);
	}
	onFocus() {
		this.observers.find((e) => e.shouldFetchOnWindowFocus())?.refetch({ cancelRefetch: !1 }), this.#a?.continue();
	}
	onOnline() {
		this.observers.find((e) => e.shouldFetchOnReconnect())?.refetch({ cancelRefetch: !1 }), this.#a?.continue();
	}
	addObserver(e) {
		this.observers.includes(e) || (this.observers.push(e), this.clearGcTimeout(), this.#r.notify({
			type: "observerAdded",
			query: this,
			observer: e
		}));
	}
	removeObserver(e) {
		let t = this.observers.indexOf(e);
		t !== -1 && (this.observers.splice(t, 1), this.observers.length || (this.#a && (this.#s || this.state.fetchStatus === "paused" && this.state.status === "pending" ? this.#a.cancel({ revert: !0 }) : this.#a.cancelRetry()), this.scheduleGc()), this.#r.notify({
			type: "observerRemoved",
			query: this,
			observer: e
		}));
	}
	getObserversCount() {
		return this.observers.length;
	}
	invalidate() {
		this.state.isInvalidated || this.#c({ type: "invalidate" });
	}
	async fetch(e, t) {
		if (this.state.fetchStatus !== "idle" && this.#a?.status() !== "rejected") {
			if (this.state.data !== void 0 && t?.cancelRefetch) this.cancel({ silent: !0 });
			else if (this.#a) return this.#a.continueRetry(), this.#a.promise;
		}
		if (e && this.setOptions(e), !this.options.queryFn) {
			let e = this.observers.find((e) => e.options.queryFn);
			e && this.setOptions(e.options);
		}
		let n = new AbortController(), r = (e) => {
			Object.defineProperty(e, "signal", {
				enumerable: !0,
				get: () => (this.#s = !0, n.signal)
			});
		}, i = () => {
			let e = gn(this.options, t), n = (() => {
				let e = {
					client: this.#i,
					queryKey: this.queryKey,
					meta: this.meta
				};
				return r(e), e;
			})();
			return this.#s = !1, this.options.persister ? this.options.persister(e, n, this) : e(n);
		}, a = (() => {
			let e = {
				fetchOptions: t,
				options: this.options,
				queryKey: this.queryKey,
				client: this.#i,
				state: this.state,
				fetchFn: i
			};
			return r(e), e;
		})();
		(this.#e === "infinite" ? Bn(this.options.pages) : this.options.behavior)?.onFetch(a, this), this.#n = this.state, (this.state.fetchStatus === "idle" || this.state.fetchMeta !== a.fetchOptions?.meta) && this.#c({
			type: "fetch",
			meta: a.fetchOptions?.meta
		});
		let o = this.#a = Rn({
			initialPromise: t?.initialPromise,
			fn: a.fetchFn,
			onCancel: (e) => {
				e instanceof In && e.revert && this.setState({
					...this.#n,
					fetchStatus: "idle"
				}), n.abort();
			},
			onFail: (e, t) => {
				this.#c({
					type: "failed",
					failureCount: e,
					error: t
				});
			},
			onPause: () => {
				this.#c({ type: "pause" });
			},
			onContinue: () => {
				this.#c({ type: "continue" });
			},
			retry: a.options.retry,
			retryDelay: a.options.retryDelay,
			networkMode: a.options.networkMode,
			canRun: () => !0
		});
		try {
			let e = await o.start();
			if (e === void 0) throw Error(`${this.queryHash} data is undefined`);
			return this.setData(e), this.#r.config.onSuccess?.(e, this), this.#r.config.onSettled?.(e, this.state.error, this), e;
		} catch (e) {
			if (e instanceof In) {
				if (e.silent) return this.#a.promise;
				if (e.revert) {
					if (this.state.data === void 0) throw e;
					return this.state.data;
				}
			}
			throw this.#c({
				type: "error",
				error: e
			}), this.#r.config.onError?.(e, this), this.#r.config.onSettled?.(this.state.data, e, this), e;
		} finally {
			this.#a === o && (this.#a = void 0), this.scheduleGc();
		}
	}
	#c(e) {
		let t = (t) => {
			switch (e.type) {
				case "failed": return {
					...t,
					fetchFailureCount: e.failureCount,
					fetchFailureReason: e.error
				};
				case "pause": return {
					...t,
					fetchStatus: "paused"
				};
				case "continue": return {
					...t,
					fetchStatus: "fetching"
				};
				case "fetch": return {
					...t,
					...Kn(t.data, this.options),
					fetchMeta: e.meta ?? null
				};
				case "success":
					let n = {
						...t,
						...qn(e.data, e.dataUpdatedAt),
						dataUpdateCount: t.dataUpdateCount + 1,
						...!e.manual && {
							fetchStatus: "idle",
							fetchFailureCount: 0,
							fetchFailureReason: null
						}
					};
					return this.#n = e.manual ? n : void 0, n;
				case "error":
					let r = e.error;
					return {
						...t,
						error: r,
						errorUpdateCount: t.errorUpdateCount + 1,
						errorUpdatedAt: Date.now(),
						fetchFailureCount: t.fetchFailureCount + 1,
						fetchFailureReason: r,
						fetchStatus: "idle",
						status: "error",
						isInvalidated: !0
					};
				case "invalidate": return {
					...t,
					isInvalidated: !0
				};
				case "setState": return {
					...t,
					...e.state
				};
			}
		};
		this.state = t(this.state), P.batch(() => {
			this.observers.slice().forEach((e) => {
				e.onQueryUpdate();
			}), this.#r.notify({
				query: this,
				type: "updated",
				action: e
			});
		});
	}
};
function Kn(e, t) {
	return {
		fetchFailureCount: 0,
		fetchFailureReason: null,
		fetchStatus: Fn(t.networkMode) ? "fetching" : "paused",
		...e === void 0 && {
			error: null,
			status: "pending"
		}
	};
}
function qn(e, t) {
	return {
		data: e,
		dataUpdatedAt: t ?? Date.now(),
		error: null,
		isInvalidated: !1,
		status: "success"
	};
}
function Jn(e) {
	let t = typeof e.initialData == "function" ? e.initialData() : e.initialData, n = t !== void 0, r = n ? typeof e.initialDataUpdatedAt == "function" ? e.initialDataUpdatedAt() : e.initialDataUpdatedAt : 0;
	return {
		data: t,
		dataUpdateCount: 0,
		dataUpdatedAt: n ? r ?? Date.now() : 0,
		error: null,
		errorUpdateCount: 0,
		errorUpdatedAt: 0,
		fetchFailureCount: 0,
		fetchFailureReason: null,
		fetchMeta: null,
		isInvalidated: !1,
		status: n ? "success" : "pending",
		fetchStatus: "idle"
	};
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/queryObserver.js
var Yn = class extends N {
	#e;
	#t = void 0;
	#n = void 0;
	#r = void 0;
	#i;
	#a;
	#o;
	#s;
	#c;
	#l;
	#u;
	#d;
	#f;
	#p = /* @__PURE__ */ new Set();
	constructor(e, t) {
		super(), this.options = t, this.#e = e, this.#o = null, this.bindMethods(), this.setOptions(t);
	}
	bindMethods() {
		this.refetch = this.refetch.bind(this);
	}
	onSubscribe() {
		this.listeners.size === 1 && (this.#t.addObserver(this), Zn(this.#t, this.options) ? this.#m() : this.updateResult(), this.#y());
	}
	onUnsubscribe() {
		this.hasListeners() || this.destroy();
	}
	shouldFetchOnReconnect() {
		return Qn(this.#t, this.options, this.options.refetchOnReconnect);
	}
	shouldFetchOnWindowFocus() {
		return Qn(this.#t, this.options, this.options.refetchOnWindowFocus);
	}
	destroy() {
		this.listeners = /* @__PURE__ */ new Set(), this.#b(), this.#x(), this.#t.removeObserver(this);
	}
	setOptions(e) {
		let t = this.options, n = this.#t;
		if (this.options = this.#e.defaultQueryOptions(e), this.options.enabled !== void 0 && typeof this.options.enabled != "boolean" && typeof this.options.enabled != "function" && typeof A(this.options.enabled, this.#t) != "boolean") throw Error("Expected enabled to be a boolean or a callback that returns a boolean");
		this.#S(), this.#t.setOptions(this.options), t._defaulted && !on(this.options, t) && this.#e.getQueryCache().notify({
			type: "observerOptionsUpdated",
			query: this.#t,
			observer: this
		});
		let r = this.hasListeners();
		r && $n(this.#t, n, this.options, t) && this.#m(), this.updateResult(), r && (this.#t !== n || A(this.options.enabled, this.#t) !== A(t.enabled, this.#t) || A(this.options.staleTime, this.#t) !== A(t.staleTime, this.#t)) && this.#g();
		let i = this.#_();
		r && (this.#t !== n || A(this.options.enabled, this.#t) !== A(t.enabled, this.#t) || i !== this.#f) && this.#v(i);
	}
	getOptimisticResult(e) {
		let t = this.#e.getQueryCache().build(this.#e, e), n = this.createResult(t, e);
		return on(this.getCurrentResult(), n) || (this.#r = n, this.#a = this.options, this.#i = this.#t.state), n;
	}
	getCurrentResult() {
		return this.#r;
	}
	trackResult(e, t) {
		return new Proxy(e, { get: (e, n) => (this.trackProp(n), t?.(n), Reflect.get(e, n)) });
	}
	trackProp(e) {
		this.#p.add(e);
	}
	getCurrentQuery() {
		return this.#t;
	}
	refetch({ ...e } = {}) {
		return this.fetch({ ...e });
	}
	fetchOptimistic(e) {
		let t = this.#e.defaultQueryOptions(e), n = this.#e.getQueryCache().build(this.#e, t), r = () => {}, i, a = new Promise((e) => {
			i = e, r = this.#e.getQueryCache().subscribe((i) => {
				i.type === "updated" && i.query.queryHash === n.queryHash && n.state.data !== void 0 && (r(), e(this.createResult(n, t)));
			});
		});
		return Promise.race([n.fetch().then(() => {
			let e = this.createResult(n, t);
			return i?.(e), e;
		}).finally(() => {
			r();
		}), a]);
	}
	fetch(e) {
		return this.#m({
			...e,
			cancelRefetch: e.cancelRefetch ?? !0
		}).then(() => (this.updateResult(), this.#r));
	}
	#m(e) {
		this.#S();
		let t = this.#t.fetch(this.options, e);
		return e?.throwOnError || (t = t.catch(k)), t;
	}
	#h(e) {
		return !bn() && A(this.options.enabled, this.#t) !== !1 && Qt(e);
	}
	#g() {
		this.#b();
		let e = A(this.options.staleTime, this.#t);
		if (this.#r.isStale || !this.#h(e)) return;
		let t = $t(this.#r.dataUpdatedAt, e) + 1;
		this.#u = O.setTimeout(() => {
			this.#r.isStale || this.updateResult();
		}, t);
	}
	#_() {
		return A(this.options.refetchInterval, this.#t) ?? !1;
	}
	#v(e) {
		this.#x(), this.#f = e, !(this.#f === 0 || !this.#h(this.#f)) && (this.#d = O.setInterval(() => {
			(this.options.refetchIntervalInBackground || Sn.isFocused()) && this.#m();
		}, this.#f));
	}
	#y() {
		this.#g(), this.#v(this.#_());
	}
	#b() {
		this.#u !== void 0 && (O.clearTimeout(this.#u), this.#u = void 0);
	}
	#x() {
		this.#d !== void 0 && (O.clearInterval(this.#d), this.#d = void 0);
	}
	createResult(e, t) {
		let n = this.#t, r = this.options, i = this.#r, a = this.#i, o = this.#a, s = e === n ? this.#n : e.state, { state: c } = e, l = { ...c }, u = !1, d;
		if (t._optimisticResults) {
			let i = this.hasListeners(), a = !i && Zn(e, t), o = i && $n(e, n, t, r);
			(a || o) && (l = {
				...l,
				...Kn(c.data, e.options)
			}), t._optimisticResults === "isRestoring" && (l.fetchStatus = "idle");
		}
		let { error: f, errorUpdatedAt: p, status: m } = l;
		d = l.data;
		let h = !1;
		if (t.placeholderData !== void 0 && d === void 0 && m === "pending") {
			let e;
			i?.isPlaceholderData && t.placeholderData === o?.placeholderData ? (e = i.data, h = !0) : e = typeof t.placeholderData == "function" ? t.placeholderData(this.#l?.state.data, this.#l) : t.placeholderData, e !== void 0 && (m = "success", d = dn(i?.data, e, t), u = !0);
		}
		if (t.select && d !== void 0 && !h) {
			if (i && d === a?.data && t.select === this.#s) d = this.#c;
			else try {
				this.#s = t.select, d = t.select(d), d = dn(i?.data, d, t), this.#c = d, this.#o = null;
			} catch (e) {
				this.#o = e;
			}
		} else d === void 0 && (this.#o = null);
		this.#o && (f = this.#o, d = this.#c, p = Date.now(), m = "error", u = !1);
		let g = l.fetchStatus === "fetching", _ = m === "pending", v = m === "error", y = _ && g, ee = d !== void 0;
		return {
			status: m,
			fetchStatus: l.fetchStatus,
			isPending: _,
			isSuccess: m === "success",
			isError: v,
			isInitialLoading: y,
			isLoading: y,
			data: d,
			dataUpdatedAt: l.dataUpdatedAt,
			error: f,
			errorUpdatedAt: p,
			failureCount: l.fetchFailureCount,
			failureReason: l.fetchFailureReason,
			errorUpdateCount: l.errorUpdateCount,
			isFetched: e.isFetched(),
			isFetchedAfterMount: l.dataUpdateCount > s.dataUpdateCount || l.errorUpdateCount > s.errorUpdateCount,
			isFetching: g,
			isRefetching: g && !_,
			isLoadingError: v && !ee,
			isPaused: l.fetchStatus === "paused",
			isPlaceholderData: u,
			isRefetchError: v && ee,
			isStale: er(e, t),
			refetch: this.refetch,
			isEnabled: A(t.enabled, e) !== !1
		};
	}
	updateResult() {
		let e = this.#r, t = this.createResult(this.#t, this.options);
		if (this.#i = this.#t.state, this.#a = this.options, this.#i.data !== void 0 && (this.#l = this.#t), on(t, e)) return;
		this.#r = t;
		let n = (() => {
			if (!e) return !0;
			let { notifyOnChangeProps: t } = this.options, n = typeof t == "function" ? t() : t;
			if (n === "all" || !n && !this.#p.size) return !0;
			let r = new Set(n ?? this.#p);
			return this.options.throwOnError && r.add("error"), Object.keys(this.#r).some((t) => {
				let n = t;
				return this.#r[n] !== e[n] && r.has(n);
			});
		})();
		P.batch(() => {
			n && this.listeners.forEach((e) => {
				e(this.#r);
			}), this.#e.getQueryCache().notify({
				query: this.#t,
				type: "observerResultsUpdated"
			});
		});
	}
	#S() {
		let e = this.#e.getQueryCache().build(this.#e, this.options);
		if (e === this.#t) return;
		let t = this.#t;
		this.#t = e, this.#n = e.state, this.hasListeners() && (t?.removeObserver(this), e.addObserver(this));
	}
	onQueryUpdate() {
		this.updateResult(), this.hasListeners() && this.#y();
	}
};
function Xn(e, t) {
	return A(t.enabled, e) !== !1 && e.state.data === void 0 && (e.state.status !== "error" || A(t.retryOnMount, e) !== !1);
}
function Zn(e, t) {
	return Xn(e, t) || e.state.data !== void 0 && Qn(e, t, t.refetchOnMount);
}
function Qn(e, t, n) {
	if (A(t.enabled, e) !== !1 && A(t.staleTime, e) !== "static") {
		let r = A(n, e);
		return r === "always" || r !== !1 && er(e, t);
	}
	return !1;
}
function $n(e, t, n, r) {
	return (e !== t || A(r.enabled, e) === !1) && (!n.suspense || e.state.status !== "error") && er(e, n);
}
function er(e, t) {
	return A(t.enabled, e) !== !1 && e.isStaleByTime(A(t.staleTime, e));
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/infiniteQueryObserver.js
var tr = class extends Yn {
	constructor(e, t) {
		super(e, t);
	}
	bindMethods() {
		super.bindMethods(), this.fetchNextPage = this.fetchNextPage.bind(this), this.fetchPreviousPage = this.fetchPreviousPage.bind(this);
	}
	setOptions(e) {
		e._type = "infinite", super.setOptions(e);
	}
	getOptimisticResult(e) {
		return e._type = "infinite", super.getOptimisticResult(e);
	}
	fetchNextPage(e) {
		return this.fetch({
			...e,
			meta: { fetchMore: { direction: "forward" } }
		});
	}
	fetchPreviousPage(e) {
		return this.fetch({
			...e,
			meta: { fetchMore: { direction: "backward" } }
		});
	}
	createResult(e, t) {
		let { state: n } = e, r = super.createResult(e, t), { isFetching: i, isRefetching: a, isError: o, isRefetchError: s } = r, c = n.fetchMeta?.fetchMore?.direction, l = o && c === "forward", u = i && c === "forward", d = o && c === "backward", f = i && c === "backward";
		return {
			...r,
			fetchNextPage: this.fetchNextPage,
			fetchPreviousPage: this.fetchPreviousPage,
			hasNextPage: Un(t, n.data),
			hasPreviousPage: Wn(t, n.data),
			isFetchNextPageError: l,
			isFetchingNextPage: u,
			isFetchPreviousPageError: d,
			isFetchingPreviousPage: f,
			isRefetchError: s && !l && !d,
			isRefetching: a && !u && !f
		};
	}
}, nr = class extends zn {
	#e;
	#t;
	#n;
	#r;
	constructor(e) {
		super(), this.#e = e.client, this.mutationId = e.mutationId, this.#n = e.mutationCache, this.#t = [], this.state = e.state || rr(), this.setOptions(e.options), this.scheduleGc();
	}
	setOptions(e) {
		this.options = e, this.updateGcTime(this.options.gcTime);
	}
	get meta() {
		return this.options.meta;
	}
	addObserver(e) {
		this.#t.includes(e) || (this.#t.push(e), this.clearGcTimeout(), this.#n.notify({
			type: "observerAdded",
			mutation: this,
			observer: e
		}));
	}
	removeObserver(e) {
		this.#t = this.#t.filter((t) => t !== e), this.scheduleGc(), this.#n.notify({
			type: "observerRemoved",
			mutation: this,
			observer: e
		});
	}
	optionalRemove() {
		this.#t.length || (this.state.status === "pending" ? this.scheduleGc() : this.#n.remove(this));
	}
	continue() {
		return this.#r?.continue() ?? (this.state.status === "pending" ? this.execute(this.state.variables) : Promise.resolve());
	}
	async execute(e) {
		let t = () => {
			this.#i({ type: "continue" });
		}, n = {
			client: this.#e,
			meta: this.options.meta,
			mutationKey: this.options.mutationKey
		}, r = this.#r = Rn({
			fn: () => this.options.mutationFn ? this.options.mutationFn(e, n) : Promise.reject(/* @__PURE__ */ Error("No mutationFn found")),
			onFail: (e, t) => {
				this.#i({
					type: "failed",
					failureCount: e,
					error: t
				});
			},
			onPause: () => {
				this.#i({ type: "pause" });
			},
			onContinue: t,
			retry: this.options.retry ?? 0,
			retryDelay: this.options.retryDelay,
			networkMode: this.options.networkMode,
			canRun: () => this.#n.canRun(this)
		}), i = this.state.status === "pending", a = !r.canStart();
		try {
			if (i) t();
			else {
				this.#i({
					type: "pending",
					variables: e,
					isPaused: a
				}), this.#n.config.onMutate && await this.#n.config.onMutate(e, this, n);
				let t = await this.options.onMutate?.(e, n);
				t !== this.state.context && this.#i({
					type: "pending",
					context: t,
					variables: e,
					isPaused: a
				});
			}
			let o = await r.start();
			return await this.#n.config.onSuccess?.(o, e, this.state.context, this, n), await this.options.onSuccess?.(o, e, this.state.context, n), await this.#n.config.onSettled?.(o, null, this.state.variables, this.state.context, this, n), await this.options.onSettled?.(o, null, e, this.state.context, n), this.#i({
				type: "success",
				data: o
			}), o;
		} catch (t) {
			try {
				await this.#n.config.onError?.(t, e, this.state.context, this, n);
			} catch (e) {
				Promise.reject(e);
			}
			try {
				await this.options.onError?.(t, e, this.state.context, n);
			} catch (e) {
				Promise.reject(e);
			}
			try {
				await this.#n.config.onSettled?.(void 0, t, this.state.variables, this.state.context, this, n);
			} catch (e) {
				Promise.reject(e);
			}
			try {
				await this.options.onSettled?.(void 0, t, e, this.state.context, n);
			} catch (e) {
				Promise.reject(e);
			}
			throw this.#i({
				type: "error",
				error: t
			}), t;
		} finally {
			this.#r === r && (this.#r = void 0), this.#n.runNext(this);
		}
	}
	#i(e) {
		let t = (t) => {
			switch (e.type) {
				case "failed": return {
					...t,
					failureCount: e.failureCount,
					failureReason: e.error
				};
				case "pause": return {
					...t,
					isPaused: !0
				};
				case "continue": return {
					...t,
					isPaused: !1
				};
				case "pending": return {
					...t,
					context: e.context,
					data: void 0,
					failureCount: 0,
					failureReason: null,
					error: null,
					isPaused: e.isPaused,
					status: "pending",
					variables: e.variables,
					submittedAt: Date.now()
				};
				case "success": return {
					...t,
					data: e.data,
					failureCount: 0,
					failureReason: null,
					error: null,
					status: "success",
					isPaused: !1
				};
				case "error": return {
					...t,
					data: void 0,
					error: e.error,
					failureCount: t.failureCount + 1,
					failureReason: e.error,
					isPaused: !1,
					status: "error"
				};
			}
		};
		this.state = t(this.state), P.batch(() => {
			this.#t.forEach((t) => {
				t.onMutationUpdate(e);
			}), this.#n.notify({
				mutation: this,
				type: "updated",
				action: e
			});
		});
	}
};
function rr() {
	return {
		context: void 0,
		data: void 0,
		error: null,
		failureCount: 0,
		failureReason: null,
		isPaused: !1,
		status: "idle",
		variables: void 0,
		submittedAt: 0
	};
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/mutationCache.js
var ir = class extends N {
	#e;
	#t;
	#n;
	constructor(e = {}) {
		super(), this.config = e, this.#e = /* @__PURE__ */ new Set(), this.#t = /* @__PURE__ */ new Map(), this.#n = 0;
	}
	build(e, t, n) {
		let r = new nr({
			client: e,
			mutationCache: this,
			mutationId: ++this.#n,
			options: e.defaultMutationOptions(t),
			state: n
		});
		return this.add(r), r;
	}
	add(e) {
		this.#e.add(e);
		let t = ar(e);
		if (typeof t == "string") {
			let n = this.#t.get(t);
			n ? n.push(e) : this.#t.set(t, [e]);
		}
		this.notify({
			type: "added",
			mutation: e
		});
	}
	remove(e) {
		if (this.#e.delete(e)) {
			let t = ar(e);
			if (typeof t == "string") {
				let n = this.#t.get(t);
				if (n) {
					if (n.length > 1) {
						let t = n.indexOf(e);
						t !== -1 && n.splice(t, 1);
					} else n[0] === e && this.#t.delete(t);
				}
			}
		}
		this.notify({
			type: "removed",
			mutation: e
		});
	}
	canRun(e) {
		let t = ar(e);
		if (typeof t == "string") {
			let n = this.#t.get(t)?.find((e) => e.state.status === "pending");
			return !n || n === e;
		}
		return !0;
	}
	runNext(e) {
		let t = ar(e);
		return typeof t == "string" ? (this.#t.get(t)?.find((t) => t !== e && t.state.isPaused))?.continue() ?? Promise.resolve() : Promise.resolve();
	}
	clear() {
		P.batch(() => {
			this.#e.forEach((e) => {
				this.notify({
					type: "removed",
					mutation: e
				});
			}), this.#e.clear(), this.#t.clear();
		});
	}
	getAll() {
		return Array.from(this.#e);
	}
	find(e) {
		let t = {
			exact: !0,
			...e
		};
		return this.getAll().find((e) => tn(t, e));
	}
	findAll(e = {}) {
		return this.getAll().filter((t) => tn(e, t));
	}
	notify(e) {
		P.batch(() => {
			this.listeners.forEach((t) => {
				t(e);
			});
		});
	}
	resumePausedMutations() {
		let e = this.getAll().filter((e) => e.state.isPaused);
		return P.batch(() => Promise.all(e.map((e) => e.continue().catch(k))));
	}
};
function ar(e) {
	return e.options.scope?.id;
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/mutationObserver.js
var or = class extends N {
	#e;
	#t = void 0;
	#n;
	#r;
	constructor(e, t) {
		super(), this.#e = e, this.setOptions(t), this.bindMethods(), this.#i();
	}
	bindMethods() {
		this.mutate = this.mutate.bind(this), this.reset = this.reset.bind(this);
	}
	setOptions(e) {
		let t = this.options;
		this.options = this.#e.defaultMutationOptions(e), on(this.options, t) || this.#e.getMutationCache().notify({
			type: "observerOptionsUpdated",
			mutation: this.#n,
			observer: this
		}), t?.mutationKey && this.options.mutationKey && j(t.mutationKey) !== j(this.options.mutationKey) ? this.reset() : this.#n?.state.status === "pending" && this.#n.setOptions(this.options);
	}
	onSubscribe() {
		this.listeners.size === 1 && this.#n && (this.#n.addObserver(this), this.#i());
	}
	onUnsubscribe() {
		this.hasListeners() || this.#n?.removeObserver(this);
	}
	onMutationUpdate(e) {
		this.#i(), this.#a(e);
	}
	getCurrentResult() {
		return this.#t;
	}
	reset() {
		this.#n?.removeObserver(this), this.#n = void 0, this.#i(), this.#a();
	}
	mutate(e, t) {
		return this.#r = t, this.#n?.removeObserver(this), this.#n = this.#e.getMutationCache().build(this.#e, this.options), this.#n.addObserver(this), this.#n.execute(e);
	}
	#i() {
		let e = this.#n?.state ?? rr();
		this.#t = {
			...e,
			isPending: e.status === "pending",
			isSuccess: e.status === "success",
			isError: e.status === "error",
			isIdle: e.status === "idle",
			mutate: this.mutate,
			reset: this.reset
		};
	}
	#a(e) {
		P.batch(() => {
			if (this.#r && this.hasListeners()) {
				let t = this.#t.variables, n = this.#t.context, r = {
					client: this.#e,
					meta: this.options.meta,
					mutationKey: this.options.mutationKey
				};
				if (e?.type === "success") {
					try {
						this.#r.onSuccess?.(e.data, t, n, r);
					} catch (e) {
						Promise.reject(e);
					}
					try {
						this.#r.onSettled?.(e.data, null, t, n, r);
					} catch (e) {
						Promise.reject(e);
					}
				} else if (e?.type === "error") {
					try {
						this.#r.onError?.(e.error, t, n, r);
					} catch (e) {
						Promise.reject(e);
					}
					try {
						this.#r.onSettled?.(void 0, e.error, t, n, r);
					} catch (e) {
						Promise.reject(e);
					}
				}
			}
			this.listeners.forEach((e) => {
				e(this.#t);
			});
		});
	}
};
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/queriesObserver.js
function sr(e, t) {
	let n = new Set(t);
	return e.filter((e) => !n.has(e));
}
var cr = class extends N {
	#e;
	#t;
	#n;
	#r;
	#i;
	#a;
	#o;
	#s;
	#c;
	#l = [];
	constructor(e, t, n) {
		super(), this.#e = e, this.#r = n, this.#n = [], this.#i = [], this.#t = [], this.setQueries(t);
	}
	onSubscribe() {
		this.listeners.size === 1 && this.#i.forEach((e) => {
			e.subscribe((t) => {
				this.#m(e, t);
			});
		});
	}
	onUnsubscribe() {
		this.listeners.size || this.destroy();
	}
	destroy() {
		this.listeners = /* @__PURE__ */ new Set(), this.#i.forEach((e) => {
			e.destroy();
		});
	}
	setQueries(e, t) {
		this.#n = e, this.#r = t, P.batch(() => {
			let e = this.#i, t = this.#p(this.#n);
			t.forEach((e) => e.observer.setOptions(e.defaultedQueryOptions));
			let n = t.map((e) => e.observer), r = n.map((e) => e.getCurrentResult()), i = e.length !== n.length, a = n.some((t, n) => t !== e[n]), o = i || a, s = o ? !0 : r.some((e, t) => {
				let n = this.#t[t];
				return !n || !on(e, n);
			});
			!o && !s || (o && (this.#l = t, this.#i = n), this.#t = r, this.hasListeners() && (o && (sr(e, n).forEach((e) => {
				e.destroy();
			}), sr(n, e).forEach((e) => {
				e.subscribe((t) => {
					this.#m(e, t);
				});
			})), this.#h()));
		});
	}
	getCurrentResult() {
		return this.#t;
	}
	getQueries() {
		return this.#i.map((e) => e.getCurrentQuery());
	}
	getObservers() {
		return this.#i;
	}
	getOptimisticResult(e, t) {
		let n = this.#p(e), r = n.map((e) => e.observer.getOptimisticResult(e.defaultedQueryOptions)), i = n.map((e) => e.defaultedQueryOptions.queryHash);
		return [
			r,
			(e) => this.#d(e ?? r, t, i),
			() => this.#u(r, n)
		];
	}
	#u(e, t) {
		let n = /* @__PURE__ */ new Set();
		return t.map((r, i) => {
			let a = e[i];
			return r.defaultedQueryOptions.notifyOnChangeProps ? a : r.observer.trackResult(a, (e) => {
				n.has(e) || (n.add(e), t.forEach((t) => {
					t.observer.trackProp(e);
				}));
			});
		});
	}
	#d(e, t, n) {
		if (t) {
			let r = this.#c, i = n !== void 0 && r !== void 0 && (r.length !== n.length || n.some((e, t) => e !== r[t]));
			return (this.#t !== this.#s || i || t !== this.#o) && (this.#o = t, this.#s = this.#t, n !== void 0 && (this.#c = n), this.#a = an(this.#a, t(e))), this.#a;
		}
		return e;
	}
	#f() {
		return !this.#r?.combine || this.#i.some((e, t) => e.options.suspense && this.#t[t]?.data === void 0);
	}
	#p(e) {
		let t = /* @__PURE__ */ new Map();
		this.#i.forEach((e) => {
			let n = e.options.queryHash;
			if (!n) return;
			let r = t.get(n);
			r ? r.push(e) : t.set(n, [e]);
		});
		let n = [];
		return e.forEach((e) => {
			let r = this.#e.defaultQueryOptions(e), i = t.get(r.queryHash)?.shift() ?? new Yn(this.#e, r);
			n.push({
				defaultedQueryOptions: r,
				observer: i
			});
		}), n;
	}
	#m(e, t) {
		let n = this.#i.indexOf(e);
		n !== -1 && (this.#t = this.#t.slice(), this.#t[n] = t, this.#h());
	}
	#h() {
		if (this.hasListeners()) {
			let e = this.#f(), t = this.#a, n = e ? t : this.#d(this.#u(this.#t, this.#l), this.#r?.combine);
			(e || t !== n) && P.batch(() => {
				this.listeners.forEach((e) => {
					e(this.#t);
				});
			});
		}
	}
}, lr = class extends N {
	#e;
	constructor(e = {}) {
		super(), this.config = e, this.#e = /* @__PURE__ */ new Map();
	}
	build(e, t, n) {
		let r = t.queryKey, i = t.queryHash ?? nn(r, t), a = this.get(i);
		return a || (a = new Gn({
			client: e,
			queryKey: r,
			queryHash: i,
			options: e.defaultQueryOptions(t),
			state: n,
			defaultOptions: e.getQueryDefaults(r)
		}), this.add(a)), a;
	}
	add(e) {
		this.#e.has(e.queryHash) || (this.#e.set(e.queryHash, e), this.notify({
			type: "added",
			query: e
		}));
	}
	remove(e) {
		this.#e.get(e.queryHash) === e && (e.destroy(), this.#e.delete(e.queryHash), this.notify({
			type: "removed",
			query: e
		}));
	}
	clear() {
		P.batch(() => {
			this.getAll().forEach((e) => {
				this.remove(e);
			});
		});
	}
	get(e) {
		return this.#e.get(e);
	}
	getAll() {
		return [...this.#e.values()];
	}
	find(e) {
		let t = {
			exact: !0,
			...e
		};
		return this.getAll().find((e) => en(t, e));
	}
	findAll(e = {}) {
		let t = this.getAll();
		return Object.keys(e).length > 0 ? t.filter((t) => en(e, t)) : t;
	}
	notify(e) {
		P.batch(() => {
			this.listeners.forEach((t) => {
				t(e);
			});
		});
	}
	onFocus() {
		P.batch(() => {
			this.getAll().forEach((e) => {
				e.onFocus();
			});
		});
	}
	onOnline() {
		P.batch(() => {
			this.getAll().forEach((e) => {
				e.onOnline();
			});
		});
	}
}, ur = class {
	#e;
	#t;
	#n;
	#r;
	#i;
	#a;
	#o;
	#s;
	constructor(e = {}) {
		this.#e = e.queryCache || new lr(), this.#t = e.mutationCache || new ir(), this.#n = e.defaultOptions || {}, this.#r = /* @__PURE__ */ new Map(), this.#i = /* @__PURE__ */ new Map(), this.#a = 0;
	}
	mount() {
		this.#a++, this.#a === 1 && (this.#o = Sn.subscribe(async (e) => {
			e && (await this.resumePausedMutations(), this.#e.onFocus());
		}), this.#s = Nn.subscribe(async (e) => {
			e && (await this.resumePausedMutations(), this.#e.onOnline());
		}));
	}
	unmount() {
		this.#a--, this.#a === 0 && (this.#o?.(), this.#o = void 0, this.#s?.(), this.#s = void 0);
	}
	isFetching(e) {
		return this.#e.findAll({
			...e,
			fetchStatus: "fetching"
		}).length;
	}
	isMutating(e) {
		return this.#t.findAll({
			...e,
			status: "pending"
		}).length;
	}
	getQueryData(e) {
		let t = this.defaultQueryOptions({ queryKey: e });
		return this.#e.get(t.queryHash)?.state.data;
	}
	ensureQueryData(e) {
		let t = this.defaultQueryOptions(e), n = this.#e.build(this, t), r = n.state.data;
		return r === void 0 ? this.fetchQuery(e) : (e.revalidateIfStale && n.isStaleByTime(A(t.staleTime, n)) && this.prefetchQuery(t), Promise.resolve(r));
	}
	getQueriesData(e) {
		return this.#e.findAll(e).map(({ queryKey: e, state: t }) => [e, t.data]);
	}
	setQueryData(e, t, n) {
		let r = this.defaultQueryOptions({ queryKey: e }), i = this.#e.get(r.queryHash)?.state.data, a = Zt(t, i);
		if (a !== void 0) return this.#e.build(this, r).setData(a, {
			...n,
			manual: !0
		});
	}
	setQueriesData(e, t, n) {
		return P.batch(() => this.#e.findAll(e).map(({ queryKey: e }) => [e, this.setQueryData(e, t, n)]));
	}
	getQueryState(e) {
		let t = this.defaultQueryOptions({ queryKey: e });
		return this.#e.get(t.queryHash)?.state;
	}
	removeQueries(e) {
		let t = this.#e;
		P.batch(() => {
			t.findAll(e).forEach((e) => {
				t.remove(e);
			});
		});
	}
	resetQueries(e, t) {
		let n = this.#e;
		return P.batch(() => {
			let r = n.findAll(e), i = new Set(r);
			return r.forEach((e) => {
				e.reset();
			}), this.refetchQueries({
				type: "active",
				predicate: (e) => i.has(e)
			}, t);
		});
	}
	cancelQueries(e, t = {}) {
		let n = {
			revert: !0,
			...t
		}, r = P.batch(() => this.#e.findAll(e).map((e) => e.cancel(n)));
		return Promise.all(r).then(k).catch(k);
	}
	invalidateQueries(e, t = {}) {
		return P.batch(() => (this.#e.findAll(e).forEach((e) => {
			e.invalidate();
		}), e?.refetchType === "none" ? Promise.resolve() : this.refetchQueries({
			...e,
			type: e?.refetchType ?? e?.type ?? "active"
		}, t)));
	}
	refetchQueries(e, t = {}) {
		let n = {
			...t,
			cancelRefetch: t.cancelRefetch ?? !0
		}, r = P.batch(() => this.#e.findAll(e).filter((e) => !e.isDisabled() && !e.isStatic()).map((e) => {
			let t = e.fetch(void 0, n);
			return n.throwOnError || (t = t.catch(k)), e.state.fetchStatus === "paused" ? Promise.resolve() : t;
		}));
		return Promise.all(r).then(k);
	}
	async query(e) {
		let t = this.defaultQueryOptions(e);
		t.retry === void 0 && (t.retry = !1);
		let n = this.#e.build(this, t), r = n.isStaleByTime(A(t.staleTime, n)) ? await n.fetch(t) : n.state.data, i = t.select;
		return i ? i(r) : r;
	}
	fetchQuery(e) {
		let t = this.defaultQueryOptions(e);
		t.retry === void 0 && (t.retry = !1);
		let n = this.#e.build(this, t);
		return n.isStaleByTime(A(t.staleTime, n)) ? n.fetch(t) : Promise.resolve(n.state.data);
	}
	prefetchQuery(e) {
		return this.fetchQuery(e).then(k).catch(k);
	}
	infiniteQuery(e) {
		return e._type = "infinite", this.query(e);
	}
	fetchInfiniteQuery(e) {
		return e._type = "infinite", this.fetchQuery(e);
	}
	prefetchInfiniteQuery(e) {
		return this.fetchInfiniteQuery(e).then(k).catch(k);
	}
	ensureInfiniteQueryData(e) {
		return e._type = "infinite", this.ensureQueryData(e);
	}
	resumePausedMutations() {
		return Nn.isOnline() ? this.#t.resumePausedMutations() : Promise.resolve();
	}
	getQueryCache() {
		return this.#e;
	}
	getMutationCache() {
		return this.#t;
	}
	getDefaultOptions() {
		return this.#n;
	}
	setDefaultOptions(e) {
		this.#n = e;
	}
	setQueryDefaults(e, t) {
		this.#r.set(j(e), {
			queryKey: e,
			defaultOptions: t
		});
	}
	getQueryDefaults(e) {
		let t = [...this.#r.values()], n = {};
		return t.forEach((t) => {
			M(e, t.queryKey) && Object.assign(n, t.defaultOptions);
		}), n;
	}
	setMutationDefaults(e, t) {
		this.#i.set(j(e), {
			mutationKey: e,
			defaultOptions: t
		});
	}
	getMutationDefaults(e) {
		let t = [...this.#i.values()], n = {};
		return t.forEach((t) => {
			M(e, t.mutationKey) && Object.assign(n, t.defaultOptions);
		}), n;
	}
	defaultQueryOptions(e) {
		if (e._defaulted) return e;
		let t = {
			...this.#n.queries,
			...this.getQueryDefaults(e.queryKey),
			...e,
			_defaulted: !0
		};
		return t.queryHash ||= nn(t.queryKey, t), t.refetchOnReconnect === void 0 && (t.refetchOnReconnect = t.networkMode !== "always"), t.throwOnError === void 0 && (t.throwOnError = !!t.suspense), !t.networkMode && t.persister && (t.networkMode = "offlineFirst"), t.queryFn === hn && (t.enabled = !1), t;
	}
	defaultMutationOptions(e) {
		return e?._defaulted ? e : {
			...this.#n.mutations,
			...e?.mutationKey && this.getMutationDefaults(e.mutationKey),
			...e,
			_defaulted: !0
		};
	}
	clear() {
		this.#e.clear(), this.#t.clear();
	}
};
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/streamedQuery.js
function dr({ streamFn: e, refetchMode: t = "reset", reducer: n = (e, t) => pn(e, t), initialValue: r = [] }) {
	return async (i) => {
		let a = i.client.getQueryCache().find({
			queryKey: i.queryKey,
			exact: !0
		}), o = !!a && a.isFetched();
		o && t === "reset" && a.setState({
			...a.resetState,
			fetchStatus: "fetching"
		});
		let s = r, c = !1, l = await e(vn({
			client: i.client,
			meta: i.meta,
			queryKey: i.queryKey,
			pageParam: i.pageParam,
			direction: i.direction
		}, () => i.signal, () => c = !0)), u = o && t === "replace";
		for await (let e of l) {
			if (c) break;
			u ? s = n(s, e) : i.client.setQueryData(i.queryKey, (t) => n(t === void 0 ? r : t, e));
		}
		u && !c && i.client.setQueryData(i.queryKey, s);
		let d = i.client.getQueryData(i.queryKey);
		return d === void 0 ? r : d;
	};
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/types.js
/* istanbul ignore file */
var fr = Symbol(), pr = Symbol(), mr = Symbol(), F = new ur({ defaultOptions: { queries: {
	networkMode: "always",
	retry: 0,
	refetchOnWindowFocus: !1,
	refetchOnMount: !1,
	retryOnMount: !1
} } }), hr = class extends Error {
	status;
	body;
	constructor(e, t, n = null) {
		super(r(e, t)), this.name = "ApiError", this.status = t, this.body = n;
	}
}, gr = (e) => {
	if (!e || typeof e != "object") return "";
	let t = e;
	for (let e of [
		"message",
		"detail",
		"error"
	]) {
		let n = t[e];
		if (typeof n == "string" && n) return n;
	}
	return "";
};
async function _r(e, t) {
	let n = await fetch(e, {
		headers: { Accept: "application/json" },
		credentials: "same-origin",
		...t ? { signal: t } : {}
	}), r = null;
	try {
		r = await n.json();
	} catch {}
	if (!n.ok) throw new hr(gr(r) || `请求失败（${n.status}）`, n.status);
	return r;
}
//#endregion
//#region src/query/media-sources.ts
var vr = "/api/sources", yr = ["media-sources"], br = (e) => _r(vr, e), xr = (e) => e?.name === "AbortError" || Ln(e);
async function Sr() {
	let e = () => F.fetchQuery({
		queryKey: yr,
		queryFn: () => br()
	});
	try {
		return await e();
	} catch (t) {
		if (!xr(t)) throw t;
		return await e();
	}
}
//#endregion
//#region node_modules/react-router/dist/production/lib/router/url.js
var Cr = /^[\\/]{2}/, wr = "popstate";
function Tr(e) {
	return typeof e == "object" && !!e && "pathname" in e && "search" in e && "hash" in e && "state" in e && "key" in e;
}
function Er(e = {}) {
	function t(e, t) {
		let n = t.state?.masked, { pathname: r, search: i, hash: a } = n || e.location;
		return jr("", {
			pathname: r,
			search: i,
			hash: a
		}, t.state && t.state.usr || null, t.state && t.state.key || "default", n ? {
			pathname: e.location.pathname,
			search: e.location.search,
			hash: e.location.hash
		} : void 0);
	}
	function n(e, t) {
		return typeof t == "string" ? t : Mr(t);
	}
	return Pr(t, n, null, e);
}
function Dr(e, t) {
	if (e === !1 || e == null) throw Error(t);
}
function Or(e, t) {
	if (!e) {
		typeof console < "u" && console.warn(t);
		try {
			throw Error(t);
		} catch {}
	}
}
function kr() {
	return Math.random().toString(36).substring(2, 10);
}
function Ar(e, t) {
	return {
		usr: e.state,
		key: e.key,
		idx: t,
		masked: e.mask ? {
			pathname: e.pathname,
			search: e.search,
			hash: e.hash
		} : void 0
	};
}
function jr(e, t, n = null, r, i) {
	return {
		pathname: typeof e == "string" ? e : e.pathname,
		search: "",
		hash: "",
		...typeof t == "string" ? Nr(t) : t,
		state: n,
		key: t && t.key || r || kr(),
		mask: i
	};
}
function Mr({ pathname: e = "/", search: t = "", hash: n = "" }) {
	return t && t !== "?" && (e += t.charAt(0) === "?" ? t : "?" + t), n && n !== "#" && (e += n.charAt(0) === "#" ? n : "#" + n), e;
}
function Nr(e) {
	let t = {};
	if (e) {
		let n = e.indexOf("#");
		n >= 0 && (t.hash = e.substring(n), e = e.substring(0, n));
		let r = e.indexOf("?");
		r >= 0 && (t.search = e.substring(r), e = e.substring(0, r)), e && (t.pathname = e);
	}
	return t;
}
function Pr(e, t, n, r = {}) {
	let { window: i = document.defaultView, v5Compat: a = !1 } = r, o = i.history, s = "POP", c = null, l = u();
	l ?? (l = 0, o.replaceState({
		...o.state,
		idx: l
	}, ""));
	function u() {
		return (o.state || { idx: null }).idx;
	}
	function d() {
		s = "POP";
		let e = u(), t = e == null ? null : e - l;
		l = e, c && c({
			action: s,
			location: h.location,
			delta: t
		});
	}
	function f(e, t) {
		s = "PUSH";
		let r = Tr(e) ? e : jr(h.location, e, t);
		n && n(r, e), l = u() + 1;
		let d = Ar(r, l), f = h.createHref(r.mask || r);
		try {
			o.pushState(d, "", f);
		} catch (e) {
			if (e instanceof DOMException && e.name === "DataCloneError") throw e;
			i.location.assign(f);
		}
		a && c && c({
			action: s,
			location: h.location,
			delta: 1
		});
	}
	function p(e, t) {
		s = "REPLACE";
		let r = Tr(e) ? e : jr(h.location, e, t);
		n && n(r, e), l = u();
		let i = Ar(r, l), d = h.createHref(r.mask || r);
		o.replaceState(i, "", d), a && c && c({
			action: s,
			location: h.location,
			delta: 0
		});
	}
	function m(e) {
		return Fr(i, e);
	}
	let h = {
		get action() {
			return s;
		},
		get location() {
			return e(i, o);
		},
		listen(e) {
			if (c) throw Error("A history only accepts one active listener");
			return i.addEventListener(wr, d), c = e, () => {
				i.removeEventListener(wr, d), c = null;
			};
		},
		createHref(e) {
			return t(i, e);
		},
		createURL: m,
		encodeLocation(e) {
			let t = m(e);
			return {
				pathname: t.pathname,
				search: t.search,
				hash: t.hash
			};
		},
		push: f,
		replace: p,
		go(e) {
			return o.go(e);
		}
	};
	return h;
}
function Fr(e, t, n = !1) {
	let r = "http://localhost";
	e && (r = e.location.origin === "null" ? e.location.href : e.location.origin), Dr(r, "No window.location.(origin|href) available to create URL");
	let i = typeof t == "string" ? t : Mr(t);
	return i = i.replace(/ $/, "%20"), !n && Cr.test(i) && (i = r + i), new URL(i, r);
}
//#endregion
//#region node_modules/react/cjs/react.production.js
var Ir = /* @__PURE__ */ y(((e) => {
	var t = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, n = Object.assign, r = {};
	function i(e, n, i) {
		this.props = e, this.context = n, this.refs = r, this.updater = i || t;
	}
	i.prototype.isReactComponent = {}, i.prototype.setState = function(e, t) {
		if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, e, t, "setState");
	}, i.prototype.forceUpdate = function(e) {
		this.updater.enqueueForceUpdate(this, e, "forceUpdate");
	};
	function a() {}
	a.prototype = i.prototype;
	function o(e, n, i) {
		this.props = e, this.context = n, this.refs = r, this.updater = i || t;
	}
	var s = o.prototype = new a();
	s.constructor = o, n(s, i.prototype), s.isPureReactComponent = !0, Array.isArray;
}));
(/* @__PURE__ */ y(((e, t) => {
	t.exports = Ir();
})))();
function Lr(e, t) {
	typeof e == "string" && (e = {
		path: e,
		caseSensitive: !1,
		end: !0
	});
	let [n, r] = zr(e.path, e.caseSensitive, e.end);
	return Rr(e, t, n, r);
}
function Rr(e, t, n, r) {
	let i = t.match(n);
	if (!i) return null;
	let a = i[0], o = Br(a, 1), s = i.slice(1);
	return {
		params: r.reduce((e, { paramName: t, isOptional: n }, r) => {
			if (t === "*") {
				let e = s[r] || "";
				o = Br(a.slice(0, a.length - e.length), 1);
			}
			let i = s[r];
			return e[t] = n && !i ? void 0 : (i || "").replace(/%2F/g, "/"), e;
		}, {}),
		pathname: a,
		pathnameBase: o,
		pattern: e
	};
}
function zr(e, t = !1, n = !0) {
	Or(e === "*" || !e.endsWith("*") || e.endsWith("/*"), `Route path "${e}" will be treated as if it were "${e.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/, "/*")}".`);
	let r = [], i = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (e, t, n, i, a) => {
		if (r.push({
			paramName: t,
			isOptional: n != null
		}), n) {
			let t = a.charAt(i + e.length);
			return t && t !== "/" ? "/([^\\/]*)" : "(?:/([^\\/]*))?";
		}
		return "/([^\\/]+)";
	}).replace(/\/([\w-]+)\?(?=\/|$|\()/g, "(?:/$1)?");
	return e.endsWith("*") ? (r.push({ paramName: "*" }), i += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : n ? i += "\\/*$" : e !== "" && e !== "/" && (i += "(?:(?=\\/|$))"), [new RegExp(i, t ? void 0 : "i"), r];
}
function Br(e, t = 0) {
	let n = e.length;
	for (; n > t && e.charCodeAt(n - 1) === 47;) n--;
	return n === e.length ? e : e.slice(0, n);
}
typeof window < "u" && window.document !== void 0 && window.document.createElement;
//#endregion
//#region src/history/overlay.ts
var Vr = [
	"/item/:id",
	"/mix/:seed/:item",
	"/parts/:seed/:item",
	"/editions/:seed/:item",
	"/playlists/:playlist/:item",
	"/follow/item/:id"
], Hr = (e) => Vr.some((t) => Lr(t, e) !== null);
function Ur(e) {
	let t = e?.backgroundLocation;
	return typeof t?.pathname == "string" ? {
		pathname: t.pathname,
		search: typeof t.search == "string" ? t.search : ""
	} : null;
}
var Wr = null, Gr = null;
function Kr() {
	let { pathname: e, search: t } = window.location;
	Hr(e) || (Wr = {
		pathname: e,
		search: t
	});
}
function qr() {
	Wr = null, Gr = null;
}
function Jr(e) {
	let t = Ur(e);
	t && (Wr = t, Gr = t.pathname + t.search);
}
function Yr() {
	let e = Gr;
	return Gr = null, e;
}
function Xr(e) {
	return Wr ? {
		backgroundLocation: { ...Wr },
		overlay: e
	} : void 0;
}
//#endregion
//#region src/history/route-meta.ts
var I = {
	"/stats": {
		section: "stats",
		title: "统计"
	},
	"/taste": {
		section: "taste",
		title: "口味",
		refresh: "reopen"
	},
	"/review": {
		section: "review",
		title: "人工复核",
		refresh: "reopen"
	},
	"/data-cleanup": {
		section: "cleanup",
		title: "数据管理"
	},
	"/duplicates": {
		section: "cleanup",
		title: "重复文件",
		refresh: "reopen"
	},
	"/quality-goals": {
		section: "quality",
		title: "高清版",
		refresh: "reopen"
	},
	"/scraping": {
		section: "cleanup",
		title: "来源和凭证",
		refresh: "reopen"
	},
	"/follow-manage": {
		section: "follow",
		title: "关注管理",
		refresh: "skip"
	},
	"/configuration": {
		section: "configuration",
		title: "配置",
		refresh: "reopen"
	},
	"/activity": {
		section: "activity",
		title: "活动",
		refresh: "reopen"
	},
	"/diagnostics": {
		section: "configuration",
		title: "系统诊断",
		refresh: "reopen"
	},
	"/resource-sync": { title: "数据管理" },
	"/performers": {
		nav: "performers",
		title: "艺人",
		reload: "reopen"
	},
	"/creators": {
		title: "卖家",
		reload: "reopen"
	},
	"/studios": {
		nav: "studios",
		title: "厂牌",
		reload: "reopen"
	},
	"/agencies": {
		title: "事务所",
		reload: "reopen"
	},
	"/tags": {
		nav: "tags",
		title: "标签",
		reload: "reopen"
	},
	"/performers/*": { reload: "reopen" },
	"/studios/*": { reload: "reopen" },
	"/creators/*": { reload: "reopen" },
	"/series/*": { reload: "reopen" },
	"/agencies/*": { reload: "reopen" }
};
function Zr(e) {
	if (Object.hasOwn(I, e)) return I[e];
	let [t, ...n] = e.split("/").filter(Boolean);
	if (!t) return null;
	if (!n.length) return Object.hasOwn(I, `/${t}`) ? I[`/${t}`] : null;
	let r = `/${t}/*`;
	return Object.hasOwn(I, r) ? {
		...I[r],
		title: n.join("/")
	} : null;
}
//#endregion
//#region src/history/managed.ts
var Qr = () => {}, $r = new Promise((e) => {
	Qr = e;
});
$r.catch(() => {});
var ei = null;
function ti(e) {
	ei = e;
}
var L = /* @__PURE__ */ new Map(), R = /* @__PURE__ */ new Map(), ni = 0, ri = /* @__PURE__ */ new Set();
function ii(e) {
	Qr(e);
}
function ai(e) {
	return L.get(e) ?? null;
}
function oi(e) {
	return !!e && (L.has(e) || R.has(e));
}
var si = () => [...L.values()];
function ci(e) {
	return ri.add(e), () => {
		ri.delete(e);
	};
}
function li(e) {
	let t = si();
	for (let n of [...ri]) n(t, e);
}
async function ui(e, t, n) {
	let { container: r } = n;
	if (pi(r), !n.isCurrent()) return !1;
	ni += 1;
	let i = {
		revision: ni,
		controller: new AbortController()
	};
	R.set(r, i);
	let a = ei;
	ei = null, a?.();
	let o = await $r;
	if (R.get(r) !== i) return !1;
	try {
		await o(e, t, i.controller.signal);
	} catch {
		if (i.controller.signal.aborted) return !1;
	}
	if (R.get(r) !== i || (R.delete(r), !n.isCurrent())) return !1;
	let s = n.place ? n.place(r) : di(r);
	return L.set(r, {
		path: e,
		props: t,
		revision: i.revision,
		container: r,
		host: s,
		resident: !!n.resident
	}), li(!0), !0;
}
function z(e, t, n = () => t) {
	return ui(e, {}, {
		container: t,
		isCurrent: () => !0,
		place: () => n(t),
		resident: !0
	});
}
function di(e) {
	let t = e.ownerDocument.createElement("div");
	return t.className = "peach-react", e.textContent = "", e.append(t), t;
}
function fi(e, t) {
	let n = e ? L.get(e) : void 0;
	n && (L.set(n.container, {
		...n,
		props: {
			...n.props,
			...t
		}
	}), li(!1));
}
function pi(e, ...t) {
	let n = [];
	for (let r of /* @__PURE__ */ new Set([e, ...t])) {
		let e = R.get(r);
		e && (e.controller.abort(), R.delete(r));
		let t = L.get(r);
		t && (L.delete(r), n.push(t));
	}
	if (n.length) {
		li(!0);
		for (let e of n) e.resident || e.host.remove();
	}
}
function mi(e, t) {
	let n = L.get(e);
	n?.revision === t && (L.delete(e), n.resident || n.host.remove(), queueMicrotask(() => {
		li(!1);
	}));
}
//#endregion
//#region src/history/index.ts
var B = Er({ v5Compat: !0 }), hi = 0, gi = 0, _i = {
	action: B.action,
	location: B.location,
	seq: hi,
	openEpoch: gi
}, vi = /* @__PURE__ */ new Set(), yi = 0, bi = !1, xi = null;
B.listen(({ action: e, location: t }) => {
	hi += 1, bi ? yi = hi : gi += 1, _i = {
		action: e,
		location: t,
		seq: hi,
		openEpoch: gi
	};
	for (let e of [...vi]) e(_i);
});
var Si = {
	get navigation() {
		return _i;
	},
	listen(e) {
		return vi.add(e), () => {
			vi.delete(e);
		};
	},
	createHref: (e) => B.createHref(e),
	createURL: (e) => B.createURL(e),
	encodeLocation: (e) => B.encodeLocation(e),
	go: (e) => B.go(e),
	push: (e, t) => B.push(e, t),
	replace: (e, t) => B.replace(e, t)
};
function Ci(e, { replace: t = !1, state: n, claim: r = !0 } = {}) {
	let i = new URL(e, window.location.href), a = `${i.pathname}${i.search}${i.hash}`;
	bi = r;
	try {
		t ? B.replace(a, n) : B.push(a, n);
	} finally {
		bi = !1;
	}
}
var wi = () => {}, Ti = new Promise((e) => {
	wi = e;
});
function Ei(e) {
	return xi = e, yi = hi, wi(), Promise.resolve(e("boot"));
}
function Di(e) {
	!xi || e <= yi || (yi = e, xi("history"));
}
function Oi(e) {
	let t = Xr(e);
	!t || !Hr(window.location.pathname) || Ci(window.location.href, {
		replace: !0,
		state: t
	});
}
//#endregion
//#region src/shell/index.ts
var ki, Ai, ji = null, Mi = /* @__PURE__ */ new Set(), Ni = /* @__PURE__ */ new Set(), Pi = !1, Fi = null, Ii = null, Li = "", Ri = "/", zi = null, Bi = !1, Vi = !1, Hi = null, Ui = null, Wi = null, Gi = "/follow", Ki = "", qi = null, Ji = !1, Yi = 0, Xi = !1, Zi = /* @__PURE__ */ new Set(), Qi = 0;
function $i(e) {
	let t = (t) => Object.prototype.hasOwnProperty.call(e, t);
	t("state") && (ki = e.state), t("barsContext") && (Ai = e.barsContext), t("detailReturnBarsContext") && (ji = e.detailReturnBarsContext), t("selectMode") && (Pi = e.selectMode), t("lastSelectedId") && (Fi = e.lastSelectedId), t("followLastSelectedId") && (Ii = e.followLastSelectedId), t("selectSurface") && (Li = e.selectSurface), t("detailReturnPath") && (Ri = e.detailReturnPath), t("detailOriginAnchor") && (zi = e.detailOriginAnchor), t("detailOriginAbove") && (Bi = e.detailOriginAbove), t("detailReturnNeedsRestore") && (Vi = e.detailReturnNeedsRestore), t("activeQueue") && (Hi = e.activeQueue), t("pendingQueueRoute") && (Ui = e.pendingQueueRoute), t("presentedItem") && (Wi = e.presentedItem), t("followDetailReturnPath") && (Gi = e.followDetailReturnPath), t("configurationRequestedSection") && (Ki = e.configurationRequestedSection), t("pageOpens") && (Yi = e.pageOpens), t("entityJavLayout") && (Xi = e.entityJavLayout), t("runtimeConfigurable") && (qi = e.runtimeConfigurable), t("cameFromSetup") && (Ji = e.cameFromSetup), ea();
}
function ea() {
	Qi += 1;
	for (let e of [...Zi]) e();
}
function ta(e) {
	return Zi.add(e), () => {
		Zi.delete(e);
	};
}
var na = () => Qi;
//#endregion
//#region src/board-controls.ts
function ra(e) {
	let t = Number(e.min) || 0, n = Number(e.max) || 100, r = Number(e.value), i = n > t ? Math.max(0, Math.min(100, (r - t) / (n - t) * 100)) : 0;
	e.style.setProperty("--board-range-value", `${i}%`);
}
function ia() {
	let e = (e) => {
		e.querySelectorAll("input[type=range]").forEach(ra), ca(e), oa(e);
	};
	e(document), new MutationObserver((t) => {
		for (let n of t) for (let t of n.addedNodes) t instanceof Element && (t.matches("input[type=range]") && ra(t), e(t));
	}).observe(document.body, {
		subtree: !0,
		childList: !0
	}), document.addEventListener("input", (e) => {
		e.target instanceof HTMLInputElement && e.target.type === "range" && ra(e.target);
	});
	let t = document.createElement("div");
	t.className = "board-tooltip", t.id = "board-control-tooltip", t.role = "tooltip", t.popover = "manual", t.hidden = !0, document.body.append(t);
	let n = null, r = "", i = null, a, o = () => {
		clearTimeout(a), t.matches(":popover-open") && t.hidePopover(), t.hidden = !0, n && (n.hasAttribute("title") || (n.title = r), i === null ? n.removeAttribute("aria-describedby") : n.setAttribute("aria-describedby", i)), n = null;
	}, s = (e, s) => {
		let c = e instanceof Element ? e.closest("[title]") : null;
		!c || c === n || c.closest(".vjs-control") || !c.title.trim() || (o(), n = c, r = c.title, i = c.getAttribute("aria-describedby"), c.removeAttribute("title"), a = setTimeout(() => {
			if (n !== c || !c.isConnected) return;
			(c.closest("dialog[open]") ?? document.body).append(t), t.textContent = r, t.hidden = !1, t.showPopover();
			let e = c.getBoundingClientRect(), a = t.getBoundingClientRect();
			t.style.left = `${Math.max(8, Math.min(innerWidth - a.width - 8, e.left + (e.width - a.width) / 2))}px`, t.style.top = `${e.top >= a.height + 16 ? e.top - a.height - 8 : Math.min(innerHeight - a.height - 8, e.bottom + 8)}px`, c.setAttribute("aria-describedby", [i, t.id].filter(Boolean).join(" "));
		}, s));
	};
	document.addEventListener("pointerover", (e) => s(e.target, 400)), document.addEventListener("pointerout", (e) => {
		n && !n.contains(e.relatedTarget) && o();
	}), document.addEventListener("focusin", (e) => s(e.target, 0)), document.addEventListener("focusout", o), document.addEventListener("keydown", (e) => {
		e.key === "Escape" && o();
	}), document.addEventListener("scroll", (e) => {
		n && h(e, n) && o();
	}, !0), window.addEventListener("resize", o);
}
var aa = /* @__PURE__ */ new Map();
function oa(e) {
	let t = ".board-local-nav:not([data-section-nav])", n = [...e.querySelectorAll(t)];
	e instanceof HTMLElement && e.matches(t) && n.push(e), n.forEach((e) => {
		if (e.hasAttribute("data-board-tabs")) return;
		e.dataset.boardTabs = "true";
		let t = e.className + e.getAttribute("aria-label"), n = (t) => {
			e.style.setProperty("--tab-x", `${t.left}px`), e.style.setProperty("--tab-width", `${t.width}px`);
		}, r = () => {
			let r = e.querySelector("button[aria-selected=true],button[aria-pressed=true]");
			if (!r || !r.offsetWidth) return;
			let i = {
				left: r.offsetLeft,
				width: r.offsetWidth
			};
			n(i), aa.set(t, i);
		}, i = aa.get(t);
		i ? n(i) : r(), requestAnimationFrame(() => {
			e.classList.add("board-tabs-ready"), requestAnimationFrame(r);
		});
		let a = new MutationObserver(r);
		a.observe(e, {
			subtree: !0,
			attributes: !0,
			attributeFilter: ["aria-selected", "aria-pressed"]
		});
		let o = new ResizeObserver(() => {
			if (!e.isConnected) {
				o.disconnect(), a.disconnect();
				return;
			}
			r();
		});
		o.observe(e);
	});
}
var sa = /* @__PURE__ */ new Map();
function ca(e) {
	let t = ".iconswitch,.insightswitch,.follow-workspace-switch", n = [...e.querySelectorAll(t)];
	e instanceof HTMLElement && e.matches(t) && n.push(e), n.forEach((e) => {
		if (e.hasAttribute("data-board-segments") || e.closest("[data-skeleton]")) return;
		e.dataset.boardSegments = "true";
		let t = document.createElement("span");
		t.className = "board-segment-thumb", t.setAttribute("aria-hidden", "true"), e.prepend(t);
		let n = e.className + (e.getAttribute("aria-label") ?? ""), r = sa.get(n) ?? null, i = () => {
			let i = e.querySelector("label:has(input:checked),button[aria-selected=true]");
			if (!i || !i.offsetWidth) return;
			let a = {
				x: i.offsetLeft,
				y: i.offsetTop,
				w: i.offsetWidth,
				h: i.offsetHeight
			};
			p(t, r, a, "x"), r = a, sa.set(n, a);
		};
		e.addEventListener("change", i);
		let a = new MutationObserver(i);
		a.observe(e, {
			subtree: !0,
			attributes: !0,
			attributeFilter: ["aria-selected"]
		});
		let o = new ResizeObserver(() => {
			if (!e.isConnected) {
				o.disconnect(), a.disconnect();
				return;
			}
			i();
		});
		o.observe(e), i(), requestAnimationFrame(() => e.classList.add("board-segments-ready"));
	});
}
//#endregion
//#region src/theme-transition.ts
var la = !1;
async function ua(e, t) {
	if (la) return;
	if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) {
		t();
		return;
	}
	let n = e.getBoundingClientRect(), r = n.left + n.width / 2, i = n.top + n.height / 2, a = Math.hypot(Math.max(r, innerWidth - r), Math.max(i, innerHeight - i)) * 2.5, o = document.createElement("style");
	o.textContent = `::view-transition-old(root){animation:none}::view-transition-new(root){mix-blend-mode:normal;mask-image:radial-gradient(circle closest-side,#000 78%,#0006 88%,transparent);mask-repeat:no-repeat;will-change:mask-position,mask-size;animation:peach-theme-reveal 560ms cubic-bezier(.16,1,.3,1) both}@keyframes peach-theme-reveal{from{mask-position:${r}px ${i}px;mask-size:0px 0px}to{mask-position:${r - a / 2}px ${i - a / 2}px;mask-size:${a}px ${a}px}}`, la = !0, document.head.append(o);
	let s = document.documentElement;
	s.dataset.themeSnapshot = "true";
	let c = !1, l = () => {
		c || (c = !0, t());
	};
	try {
		await document.startViewTransition(l).finished;
	} catch {
		l();
	} finally {
		delete s.dataset.themeSnapshot, o.remove(), la = !1;
	}
}
//#endregion
//#region src/sidebar-skeleton.ts
var da = (e) => e.replace(/[&<>"']/g, (e) => ({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
})[e]);
function fa(e, t, n) {
	let r = new Map(t.map((e) => [e[0], e]));
	return `<div data-sidebar-head=""></div><div data-sidebar-nav="">${e.map((e) => r.get(e)).filter((e) => e !== void 0).map(([e, t, r]) => {
		let i = e === "" ? "<img data-sidebar-home-logo=\"\" src=\"/peach-logo.png\" alt=\"\">" : `<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${da(r)}"/></svg>`;
		return `<button type="button" data-nav="${da(e)}" aria-pressed="${n(e)}" aria-label="${da(t)}">${i}<span>${da(t)}</span></button>`;
	}).join("")}</div>`;
}
//#endregion
//#region src/manage-header.ts
var pa = {
	"/junk-files": "垃圾文件",
	"/duplicates": "重复文件",
	"/review": "人工复核",
	"/trash": "回收站",
	"/quality-goals": "高清版",
	"/scraping": "来源和凭证"
}, ma = /* @__PURE__ */ new Set(["/data-cleanup", "/scraping"]), ha = ({ total: e, shown: t }) => `${e.toLocaleString()} 个符合 · 显示 ${t}`;
function ga(e) {
	let t = e.sections.find(([t]) => t === e.section);
	if (!t) return null;
	let n = pa[e.path] ?? "";
	return {
		title: e.path === "/diagnostics" ? "系统诊断" : e.section === "cleanup" && n || t[1],
		crumb: n,
		compact: ma.has(e.path) || e.section === "configuration",
		lede: e.section === "trash" ? e.trash ? {
			kind: "count",
			text: ha(e.trash),
			total: e.trash.total
		} : { kind: "skeleton" } : { kind: "none" }
	};
}
var V = (e) => e.replace(/[&<>"']/g, (e) => ({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
})[e]), _a = (e) => `<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${V(e)}"/></svg>`, va = "<span class=\"skeleton\" data-trash-lede-skeleton=\"text\" aria-hidden=\"true\"></span><span class=\"skeleton\" data-trash-lede-skeleton=\"action\" aria-hidden=\"true\"></span>";
function ya(e) {
	let t = ga(e);
	if (!t) return "";
	let n = e.menu.map(([t, n, r]) => {
		let i = t === e.section;
		return `<button type="button" data-manage="${V(t)}" aria-pressed="${i}"${i ? " aria-current=\"page\"" : ""}>${_a(r)}<span>${V(n)}</span></button>`;
	}).join(""), r = t.crumb ? `<nav data-manage-crumb="" aria-label="Breadcrumb"><ol><li><a href="/data-cleanup">数据管理</a>${_a("chevron-right")}</li><li aria-current="true"><span>${V(t.crumb)}</span></li></ol></nav>` : "", i = t.lede.kind === "none" ? "" : `<p class="mono" data-manage-lede="">${t.lede.kind === "skeleton" ? va : `<span data-lede-text="">${V(t.lede.text)}</span>${t.lede.total ? ba : ""}`}</p>`;
	return `<nav data-manage-bar="" aria-label="管理"><div data-manage-menu="">${n}<span data-manage-indicator="" aria-hidden="true"></span></div></nav>` + r + `<h2 data-manage-title=""${t.compact ? " data-compact=\"\"" : ""}>${V(t.title)}</h2>` + i;
}
var ba = "<button type=\"button\" data-empty-trash=\"\" title=\"永久删除回收站内容\">清空回收站</button>";
//#endregion
//#region src/jobs.ts
function xa(e, n, r) {
	if (!Number.isFinite(r) || r <= 0) return "";
	let i = Math.max(0, Math.min(r, Number.isFinite(n) ? n : 0)), a = i / r * 100;
	return `<div class="board-job-progress" role="progressbar" aria-label="${t(e)}" aria-valuemin="0" aria-valuemax="${r}" aria-valuenow="${i}"><svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true"><circle class="board-job-track" cx="18" cy="18" r="15"/><circle class="board-job-fill" cx="18" cy="18" r="15" pathLength="100" stroke-dasharray="${a} ${100 - a}" transform="rotate(-90 18 18)"/></svg><span>${t(e)}<small>${Math.round(a)}%</small></span></div>`;
}
function Sa(e, t = 0, n = 0) {
	return n > 0 ? xa(e, t, n) : f(e);
}
async function Ca(e) {
	let t = e.pause || ((e) => new Promise((t) => setTimeout(t, e))), n = 0;
	for (; e.active();) {
		let r;
		try {
			r = await e.read(AbortSignal.timeout(15e3));
		} catch (r) {
			if (!e.active()) return;
			n++, e.disconnected(r), await t(Math.min(2e3 * 2 ** Math.min(n, 4), 3e4));
			continue;
		}
		if (!e.active() || (n = 0, e.render(r), e.once) || !e.keepWatching && r.status !== "running") return;
		await t(2e3);
	}
}
function wa(e) {
	let t = e.note || ((e) => m(e, {
		label: "任务状态",
		variant: "error"
	})), n = e.loading || f, r = e.progress || ((e, t, n) => Sa(n || `已处理 ${e} / ${t}`, e, t)), i = e.container || ((e) => `<section class="followtask" data-geist-fieldset aria-label="任务进度"><div class="geist-fieldset-content">${e}</div></section>`), a = document.createElement("div");
	e.host.hidden = !0, a.dataset.followJob = "", a.setAttribute("aria-live", "polite"), e.host.prepend(a);
	let o = e.storageKey || "peach-follow-job", s = sessionStorage.getItem(o) || void 0, c = !1;
	Ca({
		read: e.read,
		active: () => !c && e.active() && a.isConnected,
		keepWatching: e.watchIdle !== !1,
		render: (l) => {
			let u = l.status === "running";
			if (e.host.hidden = !u, e.busy(u), u) {
				s = l.job_id, s && sessionStorage.setItem(o, s);
				let t = l.current, c = (t?.attempt || 1) > 1 ? ` · 第 ${t?.attempt}/${t?.max_attempts} 次尝试${t?.retry_in ? `，${t.retry_in} 秒后重试` : ""}` : "", u = (l.message || (e.title ? e.title + (l.total ? `：已完成 ${l.checked || 0}/${l.total}` : "") : "") || (l.total ? `${l.older ? "抓取历史" : "检查更新"}：已完成 ${l.checked || 0}/${l.total} 个来源` : "正在准备检查任务…")) + (t ? ` · ${t.label || t.provider || ""}${c}` : ""), d = (l.total || 0) > 0 ? r(l.checked || 0, l.total, u) : n(u);
				a.innerHTML = i(d);
			} else if (s && s === l.job_id) s = void 0, c = !0, e.host.hidden = l.status !== "failed", sessionStorage.removeItem(o), a.innerHTML = l.status === "failed" ? t(l.error || "检查失败") : "", e.complete(l);
			else {
				if (s && l.status === "idle") {
					e.host.hidden = !1, a.innerHTML = t("任务状态已失效，请重新发起任务"), sessionStorage.removeItem(o), c = !0;
					return;
				}
				a.innerHTML = "";
			}
		},
		disconnected: () => {
			e.host.hidden = !1, a.innerHTML = t("暂时无法读取进度，正在重新连接…");
		}
	});
}
//#endregion
//#region src/selection.ts
function Ta(e, t, n, r, i, a = i || !e.has(r)) {
	let o = n === null ? -1 : t.indexOf(n), s = t.indexOf(r);
	return i && o >= 0 && s >= 0 ? t.slice(Math.min(o, s), Math.max(o, s) + 1).forEach((t) => e.add(t)) : a ? e.add(r) : e.delete(r), r;
}
function Ea(e, t) {
	let n = t.filter((t) => e.has(t)).length;
	return {
		count: n,
		all: n > 0 && n === t.length,
		mixed: n > 0 && n < t.length
	};
}
function Da(e, t, n) {
	t.forEach((t) => n ? e.add(t) : e.delete(t));
}
function Oa({ count: e, label: t, all: n, summary: r, actions: i, locked: a = !1 }) {
	e && (e.textContent = t), n && (n.checked = r.all, n.indeterminate = r.mixed);
	for (let e of i) e.disabled = !r.count || a;
}
function ka(e, t, n = 1) {
	let r = (e, t) => Array.from({ length: t - e + 1 }, (t, n) => e + n);
	if (n * 2 + 5 >= t) return r(1, t);
	let i = Math.max(e - n, 1), a = Math.min(e + n, t), o = i > 2, s = a < t - 2;
	return !o && s ? [
		...r(1, 3 + 2 * n),
		"…",
		t
	] : o && !s ? [
		1,
		"…",
		...r(t - (2 + 2 * n), t)
	] : [
		1,
		"…",
		...r(i, a),
		"…",
		t
	];
}
function Aa(e, t) {
	return Math.max(1, Math.ceil(e / t));
}
function ja(e, t) {
	return Math.min(Math.max(1, Math.floor(e) || 1), t);
}
function Ma(e, t, n) {
	if (t <= 1) return "";
	let r = ka(e, t).map((t) => t === "…" ? "<li class=\"board-page-dots\" aria-hidden=\"true\">…</li>" : `<li><button type="button" class="board-page" data-page="${t}" aria-label="第 ${t} 页"${t === e ? " aria-current=\"page\"" : ""}>${t}</button></li>`).join("");
	return `<nav class="board-pagination" aria-label="${n}">
    <button type="button" class="geist-button" data-page="${e - 1}"${e <= 1 ? " disabled" : ""}><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-chevron-left"></use></svg>上一页</button>
    <ul>${r}</ul>
    <button type="button" class="geist-button" data-page="${e + 1}"${e >= t ? " disabled" : ""}>下一页<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-chevron-right"></use></svg></button>
  </nav>`;
}
//#endregion
//#region src/card-art/face-frame.ts
var Na = .32, Pa = 13, Fa = .6;
function Ia(e) {
	return e ? Number.isFinite(e.cx) && Number.isFinite(e.cy) && Number(e.faceW) > 0 && Number(e.imgW) > 0 && Number(e.imgH) > 0 : !1;
}
function La(e, t, n = 1, r = Na, i = Fa) {
	if (!Ia(e) || !(t && t.w > 0 && t.h > 0)) return 1;
	let a = n > 0 ? n : 1, o = Math.max(t.w / e.imgW, t.h / e.imgH), s = e.faceW * o;
	if (!(s > 0)) return 1;
	let c = Math.min(t.w, t.h), l = Math.max(r, 13 / c) * c / s, u = Math.max(t.w / (2 * Math.min(e.cx, 1 - e.cx) * e.imgW * o), t.h / (2 * Math.min(e.cy, 1 - e.cy) * e.imgH * o)), d = e.faceW / (s * a);
	return Math.max(1, Math.min(Math.max(l, Math.min(u, i * c / s)), d));
}
function Ra(e, t, n = 1, r = Na, i = Fa) {
	let a = La(e, t, n, r, i);
	if (a <= 1 || !Ia(e) || !t) return null;
	let o = Math.max(t.w / e.imgW, t.h / e.imgH) * a, s = e.imgW * o, c = e.imgH * o, l = Math.min(0, Math.max(t.w - s, t.w / 2 - e.cx * s)), u = Math.min(0, Math.max(t.h - c, t.h / 2 - e.cy * c)), d = (e, t) => Math.round(e / t * 1e4) / 100;
	return {
		zoom: Math.round(a * 1e3) / 1e3,
		width: d(s, t.w),
		height: d(c, t.h),
		left: d(l, t.w),
		top: d(u, t.h)
	};
}
//#endregion
//#region src/card-art/image-fallback.ts
var za = "|", Ba = "closest:";
function Va(e) {
	return String(e ?? "").split(za).map((e) => e.trim()).filter(Boolean);
}
function Ha({ drop: e = "self", fallbacks: n = [], initial: r = "", dropClass: i = "", dropStyle: a = !1 } = {}) {
	let o = (Array.isArray(n) ? n : [n]).filter(Boolean);
	return [
		`data-drop="${t(e)}"`,
		o.length ? `data-fallbacks="${t(o.join(za))}"` : "",
		r ? `data-initial="${t(r)}"` : "",
		i ? `data-drop-class="${t(i)}"` : "",
		a ? "data-drop-style" : ""
	].filter(Boolean).join(" ");
}
function Ua(e) {
	if (!e || !e.dataset || !e.dataset.drop) return "";
	let t = Va(e.dataset.fallbacks);
	if (t.length) {
		let [n = "", ...r] = t;
		return "dropStyle" in e.dataset && e.removeAttribute("style"), delete e.dataset.facebox, r.length ? e.dataset.fallbacks = r.join(za) : delete e.dataset.fallbacks, e.src = n, "retry";
	}
	let n = e.dataset.drop;
	if (n.startsWith(Ba)) return (e.closest(n.slice(8)) || e).remove(), "drop";
	if (n === "initial") {
		let t = document.createElement("span");
		return t.className = e.dataset.dropClass || "", t.textContent = e.dataset.initial || "", e.replaceWith(t), "drop";
	}
	return e.remove(), "drop";
}
function Wa(e) {
	e.addEventListener("error", (e) => {
		e.target instanceof HTMLImageElement && Ua(e.target);
	}, !0);
}
//#endregion
//#region src/card-art/native-image.ts
function Ga(e, t, n, r) {
	if (!(e > 0 && t > 0 && n > 0 && r > 0)) return 0;
	let i = e / n, a = t / r;
	return i > 1.001 || a > 1.001 || Math.abs(i - a) > Math.max(i, a) * .01 ? 0 : i;
}
function Ka(e, t, n, r, i = 1) {
	let a = Number.isFinite(i) && i > 0 ? i : 1;
	e /= a, t /= a;
	let o = [
		e,
		t,
		n,
		r
	].every((e) => Number.isFinite(e) && e > 0), s = o && Math.min(n, r) >= 64 && (e < n * .4 || t < r * .4), c = o ? Math.min(1, n / e, r / t) : 1;
	return {
		small: s,
		width: e * c,
		height: t * c
	};
}
//#endregion
//#region src/card-art/representatives.ts
var qa = /* @__PURE__ */ new Map();
function Ja(e) {
	(e || []).forEach((e) => {
		e.rep && e.has_avatar && qa.set(e.k, e.rep);
	});
}
function Ya(e) {
	return qa.get(e);
}
//#endregion
//#region src/card-art/markup.ts
var Xa = (e, t) => t ? `${e}&v=${encodeURIComponent(t)}` : e, Za = (e, t = !1) => Xa(`/cover?code=${encodeURIComponent(e.cover_key || e.code || "")}${t ? "&thumb=1" : ""}`, e.cover_version), Qa = (e, t, n) => Xa(`/logo?studio=${encodeURIComponent(e)}&variant=${t}`, n), $a = (e) => e && typeof e == "object" ? e : null;
function eo(e) {
	return e && e.is_jav ? "女优" : "艺人";
}
function to({ kind: e = "performer", id: t = null, hasImage: n = !1, version: r = "", rep: i = null, mark: a = null, logo: o = "", logoVersion: s = "", logoVariant: c = "logo", alt: l = "", lazy: u = !0, style: d = "", dropStyle: f = !1, focus: p = null, thumb: m = !1 } = {}) {
	let h = !!(t && n), g = h ? Xa(`/entity-image?kind=${e}&id=${t}${m ? "&thumb=1" : ""}`, r) : "", _ = i ? `/avatar?id=${i}` : "", v = !!o, y = v ? Qa(o, c, s) : g || _ || (a ? `/link-mark?id=${a}` : "");
	if (!y) return "";
	let ee = v ? [g, _].filter(Boolean) : h && _ ? [_] : [], te = h && !v, ne = te ? oo(p) : "", b = d || ao(p);
	return `<img src="${y}" width="128" height="128" alt="${l}"${u ? " loading=\"lazy\"" : ""} decoding="async"${te ? b : ""} ${ne}${Ha({
		dropStyle: (f || !!ne || !!b) && te,
		fallbacks: ee
	})}>`;
}
function no(e, n, r, i = "performer", a = null, o = "", s = "icon", c = void 0, l = !1) {
	let u = c === void 0 ? n && n.avatar_focus || null : c;
	return `<span class="ini">${t((e || "?").slice(0, 1))}</span>` + to({
		kind: i,
		id: n && n.id,
		hasImage: !!(n && n.has_image),
		version: n && n.image_version,
		rep: r,
		mark: a,
		logo: o,
		logoVersion: n && n.logo_version,
		logoVariant: s,
		focus: u,
		thumb: l
	});
}
function ro(e, t, n) {
	return no(e, t, n ? Ya(e) : null, n || "performer");
}
function io(e) {
	let t = $a(e);
	return t && t.axis === "x" ? `${t.pct}% 50%` : t && t.axis === "y" ? `50% ${t.pct}%` : "";
}
function ao(e) {
	let t = io(e);
	return t ? ` style="object-position:${t}"` : "";
}
function oo(e) {
	let t = $a(e)?.box;
	return t ? ` data-facebox="${[
		t.cx,
		t.cy,
		t.faceW,
		t.imgW,
		t.imgH
	].map(Number).join(" ")}"` : "";
}
function so(e, t, n = !1) {
	let r = Za(e, !0), i = e.cover_frame || {}, a = [i.cx == null ? "" : ` data-cx="${i.cx}"`, i.cy == null ? "" : ` data-cy="${Math.min(.6, Math.max(.05, i.cy))}"`].join(""), o = e.poster_box, s = o ? ` data-posterbox="${[
		o.x0,
		(o.px || [])[0],
		(o.px || [])[1],
		o.y0,
		o.x1,
		o.y1
	].map(Number).join(" ")}"` : "";
	return `<img class="poster cover ${t === "small" ? "whole" : "front"}" src="${r}"
    width="640" height="360" alt="" loading="${n ? "eager" : "lazy"}"${a}${s} data-drop="self">`;
}
var co = {
	kind: "",
	html: ""
};
function lo(e, n, r, i) {
	let a = ue(e, i);
	if (!a) return co;
	let o = e.has_cover && e.code ? Za(e, !0) : "", s = e.has_thumb || e.has_local_poster ? `/poster?id=${e.id}&c=4` : "", c = so(e, n, r), l = (c.match(/ data-(?:c[xy]|posterbox)="[^"]*"/g) || []).join(""), u = a === "cover" ? c : `<img class="poster" src="${s}" width="640" height="360" alt="" loading="${r ? "eager" : "lazy"}"${l}>`;
	return {
		kind: a === "cover" ? "cover" : "thumb",
		html: u.replace("<img ", `<img data-jav-image="${e.id}" data-jav-cover="${t(o)}" data-jav-thumb="${t(s)}" data-jav-image-layout="${n}" `)
	};
}
function uo(e, n, r, i) {
	return e.is_jav ? lo(e, n, r, i) : e.follow_thumb_url ? {
		kind: "thumb",
		html: `<img class="poster" src="${t(e.follow_thumb_url)}" width="640" height="360" alt="" loading="${r ? "eager" : "lazy"}" referrerpolicy="no-referrer">`
	} : fo(e, n, r, i);
}
function fo(e, t, n, r) {
	return e.is_jav ? lo(e, t, n, r) : e.has_cover && e.cover_key ? {
		kind: "cover",
		html: so(e, t, n)
	} : !e.has_thumb && !e.has_local_poster ? co : {
		kind: "thumb",
		html: `<img class="poster" src="/poster?id=${e.id}&c=4" width="640" height="360" alt="" loading="${n ? "eager" : "lazy"}">`
	};
}
function po(e, t) {
	return fo(e, "small", !1, t).html || "<span class=\"nopic\">无预览</span>";
}
function mo(e, t) {
	let n = e.has_thumb || e.has_local_poster ? `/poster?id=${e.id}&c=4` : "";
	return e.is_jav ? ue(e, t) === "cover" ? Za(e) : n : e.has_cover && e.cover_key ? Za(e) : n;
}
function ho(e) {
	let t = e.performers || [], n = e.performer_entities || [], r = t[0] || "", i = e.is_jav && r ? "" : e.creator || "";
	return {
		kind: i ? "creator" : r ? "performer" : "",
		name: i || r || "未归属",
		coStarred: t.length > 1 && !i,
		performers: t,
		refs: n,
		total: e.performer_total || t.length
	};
}
function go(e) {
	let { kind: t, name: n, coStarred: r, performers: i, refs: a } = ho(e);
	return r ? `<div class="mavstack">${i.slice(0, 5).map((e, t) => `<span class="mav">${no(e, a[t], Ya(e))}</span>`).join("")}</div>` : `<span class="mav">${no(n, t === "performer" ? a[0] : e.creator_entity, t ? Ya(n) : null, t || "performer")}</span>`;
}
function _o(e, t) {
	let n = (e.performers || [])[0];
	return (e.is_jav && n ? n : e.creator) || n || e.studio || e.code || t((e.tags || [])[0] || "") || "为你推荐";
}
//#endregion
//#region src/card-art/framing.ts
var vo = () => window.devicePixelRatio || 1;
function yo(e) {
	let t = e.parentElement;
	if (!t || ([
		"position",
		"right",
		"bottom",
		"left",
		"top",
		"width",
		"height",
		"max-width",
		"max-height"
	].forEach((t) => e.style.removeProperty(t)), e.dataset.faceFramed = "", t.dataset.nativeSmall === "true")) return;
	let n = t.getBoundingClientRect();
	if (!(n.width > 0 && n.height > 0)) {
		if (typeof ResizeObserver != "function") return;
		delete e.dataset.faceFramed;
		let n = new ResizeObserver(() => {
			let r = t.getBoundingClientRect();
			r.width > 0 && r.height > 0 && (n.disconnect(), yo(e));
		});
		n.observe(t);
		return;
	}
	let [r = NaN, i = NaN, a = NaN, o = NaN, s = NaN] = String(e.dataset.facebox).split(" ").map(Number), c = Ga(e.naturalWidth, e.naturalHeight, o, s);
	if (!c) {
		e.style.objectPosition = "50% 50%";
		return;
	}
	let l = Ra({
		cx: r,
		cy: i,
		faceW: a * c,
		imgW: o * c,
		imgH: s * c
	}, {
		w: n.width,
		h: n.height
	}, vo());
	if (!l) return;
	let u = e.style;
	u.position = "absolute", u.right = "auto", u.bottom = "auto", u.left = `${l.left}%`, u.top = `${l.top}%`, u.width = `${l.width}%`, u.height = `${l.height}%`, u.maxWidth = "none", u.maxHeight = "none";
}
function bo(e) {
	let t = e.naturalWidth / e.naturalHeight;
	if (!t) return;
	let n = new URL(e.currentSrc || e.src, location.href).searchParams.get("code") || "";
	e.dataset.frame = /^FC2(?:-PPV)?-/i.test(n) || t >= 1.65 ? "still" : t > 1.2 ? "sleeve" : "front";
	let r = wo(e), i = (t, n, r) => {
		if (n == null || !(r > 0 && r < 1)) return;
		let i = Math.min(1, Math.max(0, (n - r / 2) / (1 - r)));
		e.style.setProperty(t, `${Math.round(i * 100)}%`);
	};
	i("--cover-x", To(e, "cx"), r / t), i("--cover-y", To(e, "cy"), t / r), xo(e, r), (e.classList.contains("whole") || e.dataset.frame === "front") && Math.abs(t / r - 1) > .02 && So(e);
}
function xo(e, t) {
	if (e.dataset.frame === "front") return;
	let [n = NaN, r = NaN, i = NaN, a = NaN, o = NaN, s = NaN] = String(e.dataset.posterbox || "").split(" ").map(Number);
	if (!e.dataset.posterbox && e.dataset.frame === "sleeve" && (r = e.naturalWidth, i = e.naturalHeight, n = Math.round(r - de * i), a = 0, o = r, s = i), !Ga(e.naturalWidth, e.naturalHeight, r, i)) return;
	let c = fe({
		x0: n,
		y0: a,
		x1: o,
		y1: s,
		px: [r, i]
	}, t);
	c && (e.style.setProperty("--panel-aspect", `${e.naturalWidth} / ${e.naturalHeight}`), e.classList.add("panel"), e.style.setProperty("--panel-clip", `${c.clip.top}% ${c.clip.right}% ${c.clip.bottom}% ${c.clip.left}%`), e.style.setProperty("--panel-left", `${c.left}%`), e.style.setProperty("--panel-top", `${c.top}%`), e.style.setProperty("--panel-height", `${c.height}%`), So(e));
}
function So(e) {
	e.closest(".pic,[data-media-pic]")?.style.setProperty("--cover-blur", `url("${e.dataset.thumbSrc || e.currentSrc || e.src}")`);
}
function Co(e) {
	if (!/[?&]thumb=1(&|$)/.test(e.src) || !e.naturalWidth) return;
	let { width: t, height: n } = e.getBoundingClientRect();
	(getComputedStyle(e).objectFit === "contain" ? Math.min : Math.max)(t / e.naturalWidth, n / e.naturalHeight) * vo() > 1.01 && (e.dataset.thumbSrc = e.src, e.src = e.src.replace(/[?&]thumb=1(?=&|$)/, ""));
}
function wo(e) {
	let t = getComputedStyle(e).getPropertyValue("--card-ratio").trim().split("/").map(Number), n = t.length === 2 ? Number(t[0]) / Number(t[1]) : Number(t[0]);
	return Number.isFinite(n) && n > 0 ? n : 16 / 9;
}
function To(e, t) {
	let n = parseFloat(e.dataset[t] ?? "");
	return Number.isFinite(n) ? n : null;
}
var Eo = ".pic>img.poster,[data-media-art]>img,.ring>img,[data-tier-ring]>img,[data-person-ring]>img,[data-entity-portrait]>img,[data-hero-ring]>img", Do = /* @__PURE__ */ new WeakMap();
function Oo(e) {
	let t = e.matches(Eo) ? [e] : e.querySelectorAll(Eo);
	for (let e of t) !e.complete && e.parentElement && (e.parentElement.classList.add("imgwait"), Do.set(e.parentElement, performance.now()));
}
function ko(e) {
	let t = e.parentElement;
	if (!t?.classList.contains("imgwait")) return;
	if (performance.now() - (Do.get(t) ?? NaN) < i) {
		t.classList.remove("imgwait");
		return;
	}
	t.classList.replace("imgwait", "imgdone");
	let n, r = (e) => {
		e && (e.target !== t || e.pseudoElement !== "::after") || (t.removeEventListener("transitionend", r), clearTimeout(n), t.classList.remove("imgdone"));
	};
	t.addEventListener("transitionend", r), n = setTimeout(r, 1e3);
}
function Ao(e) {
	let t = "img.cover,img[data-facebox]", n = e.matches(t) ? [e] : e.querySelectorAll(t);
	for (let e of n) {
		let t = e;
		t.complete && t.naturalWidth && (t.classList.contains("cover") ? bo(t) : (jo(t), yo(t)));
	}
}
function jo(e) {
	let t = e.closest("[data-fit-native]");
	if (!t || !e.naturalWidth) return;
	let { small: n, width: r, height: i } = Ka(e.naturalWidth, e.naturalHeight, t.clientWidth, t.clientHeight, vo());
	t.dataset.nativeSmall = String(n), t.style.setProperty("--markw", n ? r + "px" : "100%"), t.style.setProperty("--markh", n ? i + "px" : "100%");
	let a = (e.currentSrc || e.src).replace(/"/g, "%22");
	t.style.setProperty("--markbg", n ? `url("${a}")` : "none");
}
function Mo(e) {
	(e || document).querySelectorAll("[data-fit-native] img").forEach((e) => {
		jo(e), e.dataset.facebox && yo(e);
	});
}
function No(e, t) {
	for (let n of me(e, t)) bo(n), Co(n);
}
var Po = !1;
function Fo() {
	Po || (Po = !0, document.addEventListener("load", (e) => {
		let t = e.target;
		t instanceof HTMLImageElement && (ko(t), jo(t), t.classList.contains("cover") ? (bo(t), Co(t)) : t.dataset.facebox && yo(t));
	}, !0), new MutationObserver((e) => {
		for (let t of e) for (let e of t.addedNodes) e.nodeType === Node.ELEMENT_NODE && (Oo(e), Ao(e));
	}).observe(document.body, {
		childList: !0,
		subtree: !0
	}), document.addEventListener("error", (e) => {
		let t = e.target;
		t instanceof HTMLImageElement && !t.dataset.fallbacks && ko(t);
	}, !0));
}
//#endregion
//#region src/card-art/hover.ts
var Io = ".card,[data-media-card],[data-mix-card]", H = {
	selecting: () => !1,
	censored: () => !1,
	delaySeconds: () => 0
};
function Lo(e) {
	H = e;
}
var Ro = () => !!window.__scrolling;
function zo(e = document, t = null) {
	!e || !e.querySelectorAll || (e.querySelectorAll(Io).forEach((e) => {
		e !== t && e._stopHover && e._stopHover();
	}), e.querySelectorAll("video.hv").forEach((e) => {
		e.closest(Io) !== t && (e._hop && clearInterval(e._hop), e.pause(), e.removeAttribute("src"), e.load(), e.remove());
	}), e.querySelectorAll("img.hvframes").forEach((e) => {
		e.closest(Io) !== t && (e.removeAttribute("src"), e.remove());
	}));
}
function Bo(e) {
	e._stopHover?.(), zo(e);
}
function U(e, t, n) {
	n ? e.dataset[t] = "" : delete e.dataset[t];
}
function Vo(e, t) {
	let n = e, r = e.querySelector("[data-media-pic]");
	if (!r) return;
	e.dataset.hoverMode = t.location === "local" ? "video" : "frames";
	let i, a = () => {
		clearTimeout(i), H.delaySeconds() && (U(e, "previewing", !0), i = setTimeout(() => {
			H.delaySeconds() && U(e, "longhover", !0);
		}, H.delaySeconds() * 1e3));
	}, o = () => {
		clearTimeout(i), U(e, "previewing", !1), U(e, "longhover", !1);
	};
	if (t.location !== "local") {
		if (!t.has_thumb) return;
		let i, s = 4, c = null, l = !1;
		e.addEventListener("mouseenter", () => {
			H.selecting() || H.censored() || (a(), c || (c = document.createElement("img"), c.className = "hvframes", c.alt = "", c.src = `/poster?id=${t.id}&c=${s}`, r.appendChild(c)), clearInterval(i), i = setInterval(() => {
				if (!c || l) return;
				let e = (s + 1) % 9, n = new Image();
				l = !0, n.onload = () => {
					c && (c.src = n.src, s = e), l = !1;
				}, n.onerror = () => {
					l = !1;
				}, n.src = `/poster?id=${t.id}&c=${e}`;
			}, 430));
		});
		let u = () => {
			o(), clearInterval(i), i = void 0, c &&= (c.remove(), null), s = 4;
		};
		n._stopHover = u, e.addEventListener("mouseleave", u);
		return;
	}
	let s, c = null;
	e.addEventListener("mouseenter", () => {
		H.selecting() || H.censored() || Ro() || (s = setTimeout(() => {
			if (Ro() || H.censored()) return;
			zo(document, e);
			let n = document.createElement("video");
			c = n, n.className = "hv", n.muted = !0, n.playsInline = !0, n.loop = !0, n.preload = "metadata", n.src = "/stream?id=" + t.id;
			let i = [
				.08,
				.22,
				.36,
				.5,
				.64,
				.78,
				.9
			], o = 0, s = () => {
				try {
					n.currentTime = (n.duration || 0) * (i[o] ?? 0);
				} catch {}
			};
			n.addEventListener("loadedmetadata", () => {
				s(), n.classList.add("on"), n.dataset.playing = "", a(), n._hop = setInterval(() => {
					o = (o + 1) % i.length, s();
				}, 1400);
			}, { once: !0 }), r.appendChild(n), n.play().catch(() => {});
		}, 340));
	});
	let l = () => {
		o(), clearTimeout(s), s = void 0, c &&= (c._hop && clearInterval(c._hop), c.pause(), c.removeAttribute("src"), c.load(), c.remove(), null);
	};
	n._stopHover = l, e.addEventListener("mouseleave", l);
}
//#endregion
//#region src/entity-skeleton.ts
function Ho(e, t, n) {
	return `<section data-skeleton="entity/${e}" role="status" aria-label="正在读取资料">
    <span class="sr-only">正在读取资料</span><div aria-hidden="true">
    <section class="entityhero"><div class="entityprofile"><div class="entityportrait ${e === "studio" || e === "agency" ? "square " : ""}skeleton"></div>
      <div class="entityidentity entityskeletontext"><div class="entitytitle"><h2 class="skeleton">&nbsp;</h2></div>
      <div class="alias"><span class="skeleton"></span></div>
      <div class="entitylinks"><span class="skeleton"></span></div></div></div></section>
    <div class="board-filter-frame" data-filter-frame>
      <section class="entitytagbar" data-filter-row="top"><div class="filterscroll" data-skeleton-tier="pill"></div></section>
      ${t}</div>
    <div class="entitysection">${n}</div></div></section>`;
}
//#endregion
//#region src/index-skeleton.ts
var Uo = {
	performers: "艺人",
	creators: "卖家",
	studios: "厂牌",
	agencies: "事务所",
	tags: "标签"
}, Wo = [[
	"big",
	"大图 · 竖幅头像",
	"maximize"
], [
	"compact",
	"紧凑 · 圆形头像",
	"layout-grid"
]], Go = [[
	"big",
	"大图 · 完整标识",
	"maximize"
], [
	"compact",
	"紧凑 · 圆形标识",
	"layout-grid"
]], Ko = [[
	"studios",
	"厂牌",
	"clapperboard"
], [
	"agencies",
	"事务所",
	"briefcase"
]], qo = [[
	"local",
	"本地",
	"hard-drive"
], [
	"online",
	"在线",
	"rss"
]], Jo = [
	[
		"performers",
		"艺人",
		"user"
	],
	[
		"creators",
		"卖家",
		"user"
	],
	[
		"online",
		"在线",
		"rss"
	]
], Yo = [[
	"cloud",
	"标签云",
	"tags"
], [
	"alphabet",
	"字母表",
	"text-aa"
]], Xo = (e) => e === "compact" ? "compact" : "big";
function Zo(e, t) {
	let n = new URLSearchParams(t);
	return {
		kind: e,
		q: n.get("q") || "",
		scope: n.get("scope") === "online" ? "online" : "local",
		view: n.get("view") === "cloud" ? "cloud" : "alphabet",
		category: n.get("category") || "all"
	};
}
var Qo = (e, t, n) => a(e.map(([e, t, n]) => ({
	value: e,
	label: t,
	symbol: n
})), {
	active: t,
	label: n,
	className: "indextabs"
}), $o = (e) => `<div class="board-filter-frame" data-filter-frame>
    <div class="tagbar" data-filter-row="top" data-skeleton-tier="pill" aria-label="标签类型"></div>
    <div class="count" data-filter-row="bottom"><span class="mono"><span class="countskeleton"></span></span>
      ${u("tag-view", "标签视图", Yo, e)}</div></div>`;
function es({ kind: e, q: t, scope: n, view: r }, i) {
	let a = Uo[e] || "标签", o = e !== "tags", s = e === "studios" || e === "agencies", c = o ? u("people-layout", a + "索引版式", s ? Go : Wo, i) : "";
	return `<div class="ihead">
      <h2 class="disp indexheading">${a}</h2>
      ${o ? "<span class=\"mono\" id=\"indexCount\"><span class=\"countskeleton\"></span></span>" : ""}${c}
      ${g({
		label: "过滤" + a,
		value: t || ""
	})}
    </div>
    ${e === "tags" ? Qo(qo, n, "词表") : e === "performers" || e === "creators" ? Qo(Jo, e === "performers" && n === "online" ? "online" : e, "人物名册") : s ? Qo(Ko, e, "公司类型") : ""}
    ${e === "tags" ? $o(r) : ""}
    ${d({
		kind: e,
		layout: i,
		mode: r
	})}`;
}
var ts = (e) => e.match(/data-skeleton="([^"]*)"/)?.[1] || "";
function ns(e, t, n) {
	let r = es(t, n);
	e.querySelector("[data-skeleton]")?.dataset.skeleton !== ts(r) && (e.innerHTML = r, c(e));
}
//#endregion
//#region src/follow-sort.ts
var rs = [
	["checked", "检查时间"],
	["added", "添加时间"],
	["name", "创作者名称"],
	["sources", "来源数量"],
	["source", "来源名称"],
	["provider", "站点"],
	["status", "状态"]
], is = "checked", as = {
	checked: "desc",
	added: "desc",
	name: "asc",
	sources: "desc",
	source: "asc",
	provider: "asc",
	status: "asc"
}, os = (e) => rs.some(([t]) => t === e);
function ss(e, t) {
	let n = os(e) ? e : is;
	return {
		sort: n,
		dir: t === "asc" || t === "desc" ? t : as[n]
	};
}
//#endregion
//#region src/island-skeleton.ts
var cs = "inline-flex items-center justify-center gap-0.5 whitespace-nowrap overflow-hidden font-sans", ls = {
	medium: "h-9 rounded-2lg p-2 text-body-medium",
	small: "h-8 rounded-lg px-2 py-1.5 text-body-medium"
}, us = {
	medium: ls.medium,
	small: "size-8 rounded-lg p-0 text-body-medium"
}, ds = {
	medium: "size-5 shrink-0",
	small: "size-[18px] shrink-0"
}, fs = {
	medium: "inline-flex items-center justify-center px-1 shrink-0",
	small: "inline-flex items-center justify-center px-0.5 shrink-0"
}, ps = {
	primary: "bg-button-primary text-text-white shadow-xs",
	secondary: "bg-background-primary-default text-text-primary border border-border-button-default shadow-xs",
	ghost: "bg-button-ghost-background text-button-ghost-foreground"
}, ms = (e, t) => `<svg class="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><use href="#i-${e}"/></svg>`;
function W({ variant: e = "primary", size: t = "medium", glyph: n, label: r, attrs: i = "", compact: a = !1 }) {
	let o = r ? ls[t] : us[t], s = n ? ms(n, ds[t]) : "", c = r ? `<span class="${fs[t]}"${a ? " data-compact-label" : ""}>${r}</span>` : "";
	return `<button type="button" class="${cs} ${o} ${ps[e]}"${i ? ` ${i}` : ""}>${s}${c}</button>`;
}
var hs = {
	md: {
		box: "gap-1.5 px-2.5 py-2 text-body-medium",
		value: "gap-[5px]",
		chevron: "size-4"
	},
	sm: {
		box: "gap-1 px-[7px] py-1 text-body-2-medium",
		value: "gap-1",
		chevron: "size-3.5"
	}
};
function gs(e, { size: t = "md", className: n = "", attrs: r = "" } = {}) {
	let i = hs[t];
	return `<div class="group flex flex-col${n ? ` ${n}` : ""}"><button type="button" aria-haspopup="listbox"${r ? ` ${r}` : ""} class="flex w-full items-center justify-between rounded-2lg border border-border-button-default bg-background-primary-default shadow-xs text-text-primary ${i.box}"><span class="flex min-w-0 items-center truncate ${i.value}">${e}</span>${ms("chevron-down", `shrink-0 text-text-secondary ${i.chevron}`)}</button></div>`;
}
var _s = "flex items-end justify-between gap-4 rounded-surface bg-background-secondary-default px-6 py-5 max-compact:flex-col max-compact:items-start max-compact:gap-3 max-compact:p-4 dark:bg-background-primary-default", vs = "flex min-w-0 flex-col gap-2", ys = "text-body-regular text-text-secondary", bs = "text-display-4-medium tabular-nums text-text-primary", xs = "relative inline-block h-8 w-24 rounded-2lg align-middle skeleton-sheen";
function Ss(e) {
	return `<div data-collection-summary="" class="${_s}"><div class="${vs}"><span class="${ys}">${e}</span><strong class="${bs}"><span data-skeleton="count" aria-hidden="true" class="${xs}"></span></strong></div></div>`;
}
//#endregion
//#region src/configuration-skeleton.ts
var Cs = (e, t) => `<section aria-label="${e}" class="flex w-full flex-col gap-2"><p class="w-full px-3 text-body-2-medium text-text-secondary">${e}</p><div class="flex w-full flex-col rounded-2xl bg-background-secondary-default pl-3">${t}<div class="-ml-3 flex flex-wrap items-center justify-end gap-3 rounded-b-2xl border-t border-separator-border bg-card-footer px-3 py-3">${W({
	label: "保存配置",
	attrs: "disabled data-skeleton-action"
})}</div></div></section>`, G = (e, t = "", n = "configuration-skeleton-toggle") => `<div class="flex min-h-[52px] w-full items-center justify-between gap-4 py-2.5 pr-2.5 border-b border-separator-border last:border-b-0"><div class="flex min-w-0 flex-col"><p class="text-body-regular text-text-primary">${e}</p>${t ? `<p class="text-body-2-regular text-text-secondary">${t}</p>` : ""}</div><span class="skeleton ${n}"></span></div>`;
function ws() {
	return `<div class="peach-react"><div class="configpage">${`<div class="board-local-nav" data-section-nav data-section-items>${[
		"通用",
		"媒体",
		"下载",
		"网络与访问",
		"维护"
	].map((e, t) => `<button type="button" tabindex="-1" aria-selected="${t === 0}">${e}</button>`).join("")}</div>`}<div class="flex flex-col gap-6">${Cs("开机自启", `<div class="flex flex-col">${G("开机后启动 Peach")}${G("静默启动", "开机后只显示托盘图标，不打开网页。")}${G("在桌面创建快捷方式", "双击图标打开 Peach 网页。")}</div>`)}${Cs("自动更新", `<div class="flex flex-col">${G("自动检查新版本")}${G("自动下载更新")}${G("检查频率", "", "configuration-skeleton-select")}</div>`)}</div></div></div>`;
}
//#endregion
//#region src/management-skeletons.ts
var K = "relative overflow-hidden skeleton-sheen bg-background-tertiary-default rounded-lg", q = (e = "60%") => `<span class="${K} inline-block max-w-full align-middle" style="width:${e};height:1em"></span>`, Ts = "disabled data-skeleton-action", Es = "min-w-0 rounded-2-5xl bg-background-secondary-default p-5 flex flex-col gap-4 max-sm:p-4";
function Ds() {
	let e = [
		"馆藏视频",
		"看过",
		"内容标签",
		"使用空间"
	].map((e, t) => `
    <div class="min-w-0 rounded-2xl shadow-card flex flex-col overflow-hidden pt-4 text-left ${t === 0 ? "ring-2 ring-border-focus-ring bg-background-primary-default" : "bg-background-secondary-default"}">
      <span class="flex min-w-0 items-center gap-2 px-4 text-body-regular text-text-secondary max-sm:gap-1.5 max-sm:px-3"><i class="${K} size-7 max-sm:size-6"></i>${e}</span>
      <b class="px-4 pt-3 pb-4 text-title-1-medium max-sm:px-3 max-sm:pb-3">${q("4em")}</b>
      <small class="mt-auto block min-h-9.5 bg-card-footer px-4 py-2.5 text-caption-1-regular max-sm:px-3 max-sm:py-2">${q("6em")}</small>
    </div>`).join(""), t = (e) => `<section class="${Es}" data-stats-chart>
    <header class="flex flex-wrap items-end justify-between gap-x-4 gap-y-1"><span class="flex min-w-0 flex-col gap-1"><h3 class="text-title-2-medium text-text-primary">${e}</h3><b class="text-display-4-medium">${q("4em")}</b></span><small class="text-caption-1-regular text-text-secondary">个视频</small></header>
    <svg class="h-75 w-full max-sm:h-65 text-background-tertiary-default" viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="12">${[
		76,
		54,
		32
	].map((e) => `<circle cx="100" cy="100" r="${e}"/>`).join("")}</svg>
    <div class="inline-grid w-full grid-cols-3 gap-2 max-sm:grid-cols-2">${Array.from({ length: 3 }, () => `<div class="flex min-w-0 flex-col gap-1 rounded-xl bg-background-tertiary-default p-2.5"><span class="text-caption-1-regular">${q()}</span><b class="text-title-2-medium">${q("3em")}</b><small class="text-caption-1-regular">${q()}</small></div>`).join("")}</div>
  </section>`;
	return `<div class="peach-react"><div class="mx-auto flex w-full max-w-board flex-col gap-8">
    <p class="text-caption-1-regular text-text-secondary">账本当前快照 · ${q("12em")}</p>
    <div class="flex flex-col gap-4"><div class="inline-grid w-full grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" data-stats-metrics>${e}</div>
      <div class="flex flex-col gap-5"><div class="inline-grid w-full gap-5 md:grid-cols-2">${t("网盘与本地")}${t("媒体库")}</div>
        <div class="inline-grid w-full gap-5 md:grid-cols-2 xl:grid-cols-3">${[
		"时长",
		"画质",
		"文件类型"
	].map((e) => `<section class="${Es}"><h3 class="text-title-2-medium">${e}</h3><div class="${K} h-64"></div></section>`).join("")}</div>
      </div>
    </div>
    <section class="rounded-surface bg-background-secondary-default dark:bg-background-primary-default">
      <div class="flex flex-wrap gap-3 px-4 pt-3 text-body-regular">${[
		"内容标签",
		"最近看过",
		"标签来源"
	].map((e) => `<span>${e}</span>`).join("")}</div>
      <div class="flex flex-col gap-3 px-4 pt-3.5 pb-4">${Array.from({ length: 5 }, () => `<div class="${K} h-7"></div>`).join("")}</div>
    </section>
  </div></div>`;
}
function Os() {
	let e = `<div class="duplicate-row items-center gap-3 border-t border-separator-border px-5 py-4 max-compact:p-4">
    <span class="${K} row-span-2 inline-grid aspect-16/10 w-full rounded-2lg"></span>
    <span class="text-body-regular max-duplicate-narrow:col-start-2 max-duplicate-narrow:-col-end-1">${q("70%")}</span>
    ${Array.from({ length: 3 }, () => `<span class="font-mono text-caption-1-regular leading-5">${q("3em")}</span>`).join("")}
    <span class="col-start-2 -col-end-1 min-w-0 pt-0.5 font-mono text-caption-1-regular leading-5 max-duplicate-narrow:col-span-full">${q("75%")}</span>
  </div>`, t = `<section class="mb-6 overflow-hidden rounded-surface bg-background-secondary-default dark:bg-background-primary-default" data-duplicate-group>
    <div class="flex flex-wrap items-center gap-3 bg-background-tertiary-default p-5 max-compact:p-4 dark:bg-background-secondary-default">
      <b class="text-title-2-medium">${q("5em")}</b><span class="font-mono text-caption-1-regular leading-5">${q("8em")}</span>
      <span class="ml-auto flex flex-wrap gap-2 max-compact:ml-0 max-compact:w-full">${[
		"留最大",
		"留最长",
		"整组回收"
	].map((e) => W({
		variant: "secondary",
		size: "small",
		label: e,
		attrs: Ts
	})).join("")}</span>
    </div>${e.repeat(2)}</section>`;
	return `<div class="peach-react"><div class="mx-auto w-full max-w-board pb-10.5">
    <div data-collection-summary class="mb-5 flex items-end justify-between gap-4 rounded-surface bg-background-secondary-default px-6 py-5 max-compact:flex-col max-compact:items-start max-compact:gap-3 max-compact:p-4 dark:bg-background-primary-default">
      <div class="flex min-w-0 flex-col gap-2"><span class="text-body-regular text-text-secondary">重复内容</span><strong class="text-display-4-medium">${q("4em")}</strong></div><p class="text-body-regular text-text-secondary">${q("12em")}</p>
    </div>
    <div data-filter-glass data-glass-pane class="mb-5.5 flex flex-wrap items-center gap-x-2.5 gap-y-2 px-4 py-2.5"><h3 class="mr-1 text-body-medium">批量保留</h3>${["全部保留最大", "全部保留最长"].map((e) => `<button ${Ts} class="h-7.5 rounded-full border border-separator-border px-3 text-body-2-medium">${e}</button>`).join("")}</div>
    ${t.repeat(2)}
  </div></div>`;
}
function ks() {
	let e = `<li class="min-w-0 bg-background-secondary-default rounded-2xl shadow-card border border-separator-border flex flex-col gap-3 p-3">
    <div class="flex min-w-0 gap-4"><span class="${K} inline-grid w-card-cover shrink-0 aspect-card-cover rounded-2lg"></span>
      <div class="flex min-w-0 flex-1 flex-col gap-1.5"><h3 class="text-headline-medium">${q("80%")}</h3><p class="text-body-2-regular">${q("60%")}</p></div>
    </div>
    <footer class="flex justify-end">${W({
		variant: "secondary",
		size: "small",
		label: "查看版本",
		attrs: Ts
	})}</footer>
  </li>`;
	return `<div class="peach-react"><div class="mx-auto flex w-full max-w-board flex-col gap-8">
    ${Ss("待升级")}
    <ul class="card-grid-cover gap-5">${e.repeat(6)}</ul>
  </div></div>`;
}
//#endregion
//#region src/board-skeleton.ts
var J = (e = "60%") => `<span class="skeleton" style="width:${e}"></span>`, As = () => `${J("80%")}${J("48%")}`, Y = (e, t) => e.repeat(t), js = (e, t = "metricstrip") => `<div class="${t}">${e.map((e) => `<div class="tastesummary"><span class="board-stat-label">${e}</span><b class="board-stat-value">${J("45%")}</b><small class="board-stat-footer">${J("60%")}</small></div>`).join("")}</div>`, Ms = (e, t) => `<div class="${t} skeleton-segments" data-board-segments="true">${e.map((e, t) => `<span${t === 0 ? " class=\"skeleton-segment-selected\"" : ""}>${e}</span>`).join("")}</div>`, Ns = (e) => `<section class="insightpanel"><header>${e}</header><div class="insightpanelbody skeleton-lines">${Y(As(), 3)}</div></section>`, X = "disabled data-skeleton-action", Z = (e) => `<span class="skeleton skeleton-text" style="width:${e}"></span>`, Q = (e, t, n = !1) => `<span class="skeleton" style="width:${e}px;height:${t}px;flex:none${n ? ";border-radius:50%" : ""}"></span>`, Ps = "min-w-0 bg-background-secondary-default rounded-2xl shadow-card flex flex-col gap-3 px-6 py-5 max-sm:gap-2 max-sm:p-4", Fs = () => `<div class="inline-grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-6">${[
	"关注创作者",
	"启用来源",
	"检查失败",
	"未看更新",
	"JAV 订阅",
	"未看新作"
].map((e) => `<div class="${Ps}"><span class="text-body-medium text-text-secondary">${e}</span><b class="text-title-1-medium tabular-nums text-text-primary">${Z("3em")}</b></div>`).join("")}</div>`, Is = () => `<div data-section-nav data-section-items class="flex max-w-full flex-nowrap overflow-x-auto">${[
	"关注列表",
	"添加关注",
	"JAV 订阅源",
	"想要",
	"来源和凭证"
].map((e, t) => `<span class="whitespace-nowrap" aria-selected="${t === 0}">${e}</span>`).join("")}</div>`, Ls = (e = "") => `<span class="group inline-flex items-center select-none gap-2"><span class="flex shrink-0 items-center justify-center rounded-sm size-4 border bg-background-primary-default shadow-xs border-border-checkbox-default"></span>${e ? `<span class="text-body-medium text-text-primary">${e}</span>` : ""}</span>`, Rs = ({ table: e, sort: t, dir: n }) => {
	let r = rs.find(([e]) => e === t)[1];
	return `<div class="flex flex-wrap items-center gap-2 follow-skeleton-toolbar"><h3 class="mr-auto text-title-2-medium text-text-primary">关注列表</h3><span class="text-body-2-regular text-text-secondary">${Z("132px")}</span>${W({
		glyph: "refresh-cw",
		label: "检查全部",
		compact: !0,
		attrs: X
	})}<span data-button-group role="group">${W({
		variant: "ghost",
		glyph: "layout-grid",
		attrs: `aria-pressed="${!e}"`
	})}${W({
		variant: "ghost",
		glyph: "table",
		attrs: `aria-pressed="${e}"`
	})}</span>${gs(r)}${W({
		variant: "secondary",
		glyph: n === "asc" ? "arrow-up" : "arrow-down"
	})}${e ? "" : W({
		variant: "secondary",
		glyph: "chevron-up",
		label: "全部收起",
		compact: !0,
		attrs: X
	})}</div>`;
}, zs = () => `<span class="flex shrink-0 items-center gap-1">${W({
	variant: "secondary",
	size: "small",
	glyph: "refresh-cw",
	attrs: X
})}${W({
	variant: "secondary",
	size: "small",
	glyph: "trash",
	attrs: X
})}</span>`, Bs = () => `<div class="flex min-h-16 flex-wrap items-center gap-3 px-2 py-3 follow-skeleton-source">${Ls()}<span class="flex min-w-0 grow flex-col gap-0.5"><span class="text-body-medium">${Z("8em")}</span></span><span class="flex shrink-0 items-center gap-1.5">${Q(14, 14)}</span>${Q(48, 24)}<span class="shrink-0 text-body-2-regular whitespace-nowrap text-text-secondary">${Z("113px")}</span>${zs()}</div>`, Vs = (e) => `<section class="min-w-0 bg-background-primary-default rounded-2xl shadow-card flex flex-col overflow-hidden p-2 follow-skeleton-author"><div class="flex flex-wrap items-center gap-3 px-2 py-2.5" data-follow-author-header data-open>${Q(32, 32, !0)}<b class="min-w-0 grow text-body-medium break-words text-text-primary">${Z("92px")}</b>${W({
	variant: "secondary",
	size: "small",
	glyph: "refresh-cw",
	attrs: X
})}<span class="flex shrink-0 items-center gap-1">${Q(14, 14)}${Q(14, 14)}</span>${W({
	variant: "secondary",
	size: "small",
	glyph: "check-check",
	label: "全选",
	attrs: X
})}${W({
	variant: "secondary",
	size: "small",
	glyph: "chevron-up",
	label: "收起",
	attrs: X
})}</div><div data-source-divider>${Y(Bs(), e)}</div></section>`, Hs = () => {
	try {
		return Number(JSON.parse(localStorage.getItem("peach.settings.v1") || "{}").followPageSize) || 20;
	} catch {
		return 20;
	}
}, Us = [
	["select", ""],
	["author", "创作者"],
	["source", "来源"],
	["provider", "站点"],
	["status", "状态"],
	["checked", "上次检查"],
	["actions", ""]
], Ws = {
	name: "author",
	source: "source",
	provider: "provider",
	status: "status",
	checked: "checked"
}, Gs = "<svg viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\"><path d=\"M12.7071 15.2929C12.3166 15.6834 11.6834 15.6834 11.2929 15.2929L7.70711 11.7071C7.07714 11.0771 7.52331 10 8.41421 10H15.5858C16.4767 10 16.9229 11.0771 16.2929 11.7071L12.7071 15.2929Z\" fill=\"currentColor\"/></svg>", Ks = (e, { sort: t, dir: n }) => `<div data-board-data-table data-follow-table class="follow-skeleton-table"><div class="w-full overflow-x-auto"><table class="bui-table bui-table-sm"><thead><tr>${Us.map(([e, r]) => r ? `<th><span class="flex items-center gap-0.5">${r}<span data-sort-indicator${Ws[t] === e ? ` data-direction="${n === "asc" ? "ascending" : "descending"}"` : ""}>${Gs}</span></span></th>` : "<th></th>").join("")}</tr></thead><tbody>${Y(`<tr>${[
	Ls(),
	`<span class="flex min-w-0 items-center gap-2">${Q(32, 32, !0)}${Z("5em")}</span>`,
	Z("10em"),
	`<span class="flex items-center gap-1.5">${Q(14, 14)}${Z("4em")}</span>`,
	Q(48, 24),
	Z("113px"),
	zs()
].map((e) => `<td>${e}</td>`).join("")}</tr>`, e)}</tbody></table></div></div>`, qs = (e, t) => `<div class="flex flex-wrap items-center justify-between gap-3"><span class="text-body-2-regular text-text-secondary">${Z("111px")}</span>${gs(`每页 ${t} ${e ? "条" : "位"}`, { size: "sm" })}${Q(204, 32)}</div>`, Js = (e) => {
	let t = e.followLayout === "table", n = ss(e.followSort, e.followDir), r = e.followPageSize || Hs(), i = t ? Ks(r, n) : `${Ls("全选本页")}<div class="flex flex-col gap-3">${Vs(3)}${Vs(4)}${Vs(3)}</div>`;
	return `<div class="peach-react"><div class="mx-auto flex w-full max-w-board flex-col gap-8">${Fs()}<div class="flex flex-col gap-6">${Is()}<div class="flex flex-col gap-4"><div class="min-w-0 bg-background-secondary-default rounded-2xl shadow-card flex flex-col gap-4 px-6 py-5 max-sm:px-4 follow-skeleton-surface" data-layout="${t ? "table" : "default"}">${Rs({
		table: t,
		...n
	})}${i}${qs(t, r)}</div></div></div></div></div>`;
};
function Ys() {
	return `<div data-stage-grid="" aria-hidden="true"><div data-stage-media="" class="skeleton-detail-media skeleton"></div><aside data-stage-side=""><div data-stage-side-content="" class="skeleton-lines">${J("85%")}${J("65%")}${Y(As(), 4)}</div></aside></div>`;
}
function Xs() {
	return `<div data-skeleton="detail" role="status" aria-label="正在读取作品详情">${Ys()}</div>`;
}
function Zs(e, t = {}) {
	let n = "";
	if (e === "/stats") n = Ds();
	else if (e === "/taste") n = `<div class="tastepage"><header class="tastehead">${Ms(["浏览器记录", "Peach 内部"], "insightswitch")}${J("24%")}</header><div class="tastestate"></div>${js([
		"浏览记录",
		"口味维度",
		"浏览候选",
		"私有导出"
	], "tastesummaries")}<section class="tastehero"><div class="insightcopy"><span>浏览器画像</span><div class="skeleton skeleton-radar"></div></div><div class="tastebars skeleton-lines">${Y(As(), 4)}</div></section>${Ns("口味分析")}<div class="board-activity-charts">${Ns("浏览活动")}${Ns("时间分布")}</div>${Ns("标签")}</div>`;
	else if (e === "/follow-manage") n = Js(t);
	else if (e === "/configuration") n = ws();
	else if (e === "/activity") n = `<div class="activitypage">${[
		"正在进行",
		"被挡下的",
		"最近完成"
	].map((e) => `<section class="activitysection"><h3 class="geist-fieldset-title">${e}</h3><div class="activity-runs"><article class="cleanupfieldset activity-run"><div class="geist-fieldset-content skeleton-lines">${J("35%")}${As()}</div></article></div></section>`).join("")}</div>`;
	else if (e === "/duplicates") n = Os();
	else if (e === "/quality-goals") n = ks();
	else if (e === "/playlists") n = `<section class="playlistpage"><header><div><h2>播放列表</h2><p>保存 Mix，按自己的顺序继续播放。</p></div><div class="playlistcreate skeleton-lines"><span>新播放列表</span>${J("200px")}</div></header><div class="playlistcards">${Y(`<article class="card playlistcard"><div class="mixstack"><div class="pic skeleton"></div></div><div class="mixmeta"><span class="mav skeleton"></span><div class="mixcopy skeleton-lines">${As()}</div></div></article>`, 6)}</div></section>`;
	else return "";
	return `<div class="board-page-skeleton" data-skeleton="board${e}" role="status" aria-label="正在读取页面"><div aria-hidden="true" inert>${n}</div></div>`;
}
//#endregion
//#region src/catalog-onboarding.ts
var Qs = [
	"loc",
	"creator",
	"performer",
	"studio",
	"series",
	"agency",
	"tag",
	"tag_match",
	"len",
	"dur_min",
	"dur_max",
	"orient",
	"region",
	"state",
	"jav",
	"thumb"
];
async function $s(e, t) {
	let n = new URLSearchParams();
	for (let t of Qs) e[t] && n.set(t, e[t]);
	let [r, i] = await Promise.all([t("/api/facets?" + n), t("/api/items?" + n + "&limit=5")]), a = [...new Set([
		...r.creators || [],
		...r.tagperformers || [],
		...r.tags || []
	].map((e) => String(e.k || "")).concat((i.items || []).map((e) => e.code || e.name || "")))].filter((e) => e.length > 1).slice(0, 10);
	return (await Promise.all(a.map(async (e) => {
		let r = new URLSearchParams(n);
		return r.set("q", e), r.set("limit", "1"), (await t("/api/items?" + r)).total > 0 ? e : "";
	}))).filter(Boolean);
}
function ec({ kind: e = "catalog", filtered: t = !1, jav: n = !1, configurable: r = !1, online: i = !1 } = {}) {
	let a = r ? "<button class=\"geist-button primary\" data-empty-settings>添加内容</button>" : "", o = "<a class=\"geist-button" + (!r || i ? " primary" : "") + "\" href=\"/follow-manage?tab=add\">添加关注</a>";
	if (t || n) return s("search", n ? "还没有符合条件的 JAV 作品" : "没有符合条件的内容", n ? "已扫描但尚未补充发行资料的视频可在全部内容中查看。" : "清除筛选或搜索条件后查看全部内容。", { actions: "<a class=\"geist-button primary\" href=\"/?loc=&thumb=0\">查看全部内容</a>" });
	if (e !== "catalog") {
		let t = (i ? {
			tags: "标签",
			performers: "创作者"
		}[e] : "") || {
			tags: "标签",
			performers: "艺人",
			creators: "卖家",
			studios: "厂牌",
			agencies: "事务所",
			series: "系列"
		}[e] || "资料";
		return s(e === "tags" ? "tags" : "user-round", "还没有" + t, i ? "添加关注来源并获取内容后，这里会显示来源上的" + t + "。" : "添加内容并补充资料后，这里会显示对应信息。", { actions: i ? o : a + o });
	}
	return s("play", "还没有视频", "添加媒体文件夹或关注来源，开始建立你的馆藏。", { actions: a + o });
}
//#endregion
//#region src/catalog-filter-skeleton.ts
var tc = 64, nc = (e) => e.replace(/[&<>"]/g, (e) => ({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;"
})[e]), rc = (e) => e.repeat(tc);
function ic(e, t) {
	let n = e.map((e) => `<a href="${nc(e.href)}" data-catalog-view="${nc(e.k)}" data-entity-press="" aria-pressed="${t === e.k}">${nc(e.label)}</a>`).join("");
	return "<div class=\"peach-react\"><div class=\"contents\" data-catalog-root=\"\" data-loading=\"\"><div data-catalog-tiers=\"\" aria-busy=\"true\"><div data-catalog-tier=\"performers\" data-skeleton=\"tiers\">" + rc("<span data-catalog-placeholder=\"performer\" aria-hidden=\"true\"><span></span><span>&nbsp;</span></span>") + "</div><div data-catalog-tier=\"studios\">" + rc("<span data-catalog-placeholder=\"studio\" aria-hidden=\"true\"><span></span><span>&nbsp;</span></span>") + `</div></div><div role="group" aria-label="筛选与排序" data-filter-glass="" data-glass-pane="" data-filter-frame="" data-catalog-frame="" class="sticky top-topbar z-10 mb-5.5 flex flex-col mx-4"><div role="group" aria-label="视图与标签" data-filter-row="top" class="flex h-12 min-w-0 items-center overscroll-x-contain px-3 py-2 gap-1.5 overflow-visible"><div data-catalog-scroll=""><div role="group" aria-label="视图" data-catalog-views="">${n}<span data-entity-sep="" aria-hidden="true"></span></div><div data-catalog-tags=""><span data-catalog-placeholder="tag" aria-hidden="true">` + "<span></span>".repeat(tc) + "</span></div></div></div><div data-filter-row=\"bottom\" aria-busy=\"true\" class=\"flex min-w-0 items-center gap-3 px-3 py-2 min-h-12\"><span data-catalog-readout=\"\"><span data-skeleton=\"count\" aria-hidden=\"true\" class=\"relative inline-block h-3.5 w-37.5 rounded-md align-middle skeleton-sheen\"></span></span></div></div></div></div>";
}
//#endregion
//#region src/catalog-bars.ts
var ac = 3e4, oc = 0, sc = (e, t = oc) => [
	"facets",
	e,
	t
], cc = (e, t, n = oc) => [
	"tops",
	e,
	t,
	n
], lc = (e, t = oc) => [
	"tops",
	e,
	t
];
async function uc(t) {
	let n = String(t), r = await e(`/api/tops?${n}`), i = new URLSearchParams(n);
	return r.performers.length || r.studios.length || !i.has("state") ? r : (i.delete("state"), await e(`/api/tops?${i}`));
}
function dc(t, n) {
	return Promise.all([F.fetchQuery({
		queryKey: sc(t),
		queryFn: () => e(`/api/facets${t ? `?${t}` : ""}`),
		staleTime: ac
	}), F.fetchQuery({
		queryKey: cc(n, t),
		queryFn: () => uc(n),
		staleTime: ac
	})]);
}
function fc(e) {
	return F.fetchQuery({
		queryKey: lc(e),
		queryFn: () => uc(e),
		staleTime: ac
	});
}
function pc() {
	oc += 1;
	let e = (e) => e.state.fetchStatus === "idle";
	F.removeQueries({
		queryKey: ["facets"],
		predicate: e
	}), F.removeQueries({
		queryKey: ["tops"],
		predicate: e
	});
}
//#endregion
//#region src/management.ts
var mc = "扫描媒体文件夹，导入已有资料，采集缺失信息。两段也可以分开跑：新盘刚接上时先只扫描，几万个文件登记完就能用；采集被网络拖住时只重跑采集，不必再扫一遍磁盘。", hc = "修缺时间戳表（播放卡顿）和缺索引（打不开）的 MP4。常看的片子先修。", $ = "<span class=\"skeleton skeleton-text\" aria-hidden=\"true\"></span>", gc = "type=\"button\" disabled data-skeleton-action", _c = "disabled data-skeleton-action", vc = "aria-disabled=\"true\"", yc = (e) => `<div class="peach-react"><div class="flex flex-col gap-4">${e}</div></div>`, bc = (e, t) => `<div data-geist-fieldset-content>
          <h3 class="text-title-2-medium text-text-primary">${e}</h3>
          <p class="text-body-2-regular text-text-secondary">${t}</p></div>`;
function xc() {
	return yc(`<section aria-label="扫描与采集" data-geist-fieldset data-cleanup-task data-cleanup-processing data-fieldset-stack>
        ${bc("扫描与采集", mc)}
        <footer data-geist-fieldset-footer><a href="/scraping" class="inline-flex items-center justify-center gap-1 whitespace-nowrap font-sans rounded-sm text-body-medium text-accent-600"><span>来源和凭证</span>${ms("arrow-up", "size-[18px] shrink-0 rotate-90")}</a><span data-button-group data-split-button data-variant="primary">${W({
		glyph: "database",
		label: "扫描并补全资料",
		attrs: _c
	})}${W({
		glyph: "chevron-down",
		attrs: `${_c} aria-label="更多扫描与采集方式"`
	})}</span></footer>
      </section>`);
}
function Sc() {
	return yc(`<section aria-label="媒体修复" data-geist-fieldset data-cleanup-task data-cleanup-processing>
        ${bc("媒体修复", hc)}
        <footer data-geist-fieldset-footer>${gs($, {
		className: "w-48",
		attrs: vc
	})}${W({
		label: "开始修复",
		attrs: _c
	})}</footer>
      </section>`);
}
function Cc() {
	let e = [
		["人工复核", "square-check-big"],
		["高清版", "sparkles"],
		["重复文件", "file-stack"],
		["垃圾文件", "file-archive"],
		["回收站", "trash"]
	], t = `<span class="geist-button organize-preset-skeleton">${$}</span>`.repeat(3), r = (e) => `<div class="organizefield"><span>${e}</span>
            <span class="geist-input organize-input-skeleton">${$}</span></div>`;
	return `<div class="cleanuppage" data-skeleton="cleanup" aria-busy="true" aria-label="正在读取数据管理状态">
    <div class="cleanupstats">${e.map(([e, t]) => `
      <button type="button" class="board-plain-stat" disabled>
        <span class="board-plain-stat-head"><span class="board-stat-tile">${n(t)}</span>${e}</span>
        <strong>${$}</strong><span class="cleanupmeta">${$}</span></button>`).join("")}</div>
    <div class="cleanupgrid">
      <div class="cleanupscraping">${xc()}</div>
      <div class="cleanupmediarepair">${Sc()}</div>
      <section class="cleanupfieldset cleanuporganize" data-geist-fieldset data-cleanup-task aria-labelledby="cleanup-loading-organize">
        <div class="geist-fieldset-content"><h3 class="geist-fieldset-title" id="cleanup-loading-organize">整理</h3>
          <p>按模板给文件改名并归入目录。先预览，确认后执行；执行过的一批可以整批退回。</p>
          <div class="organizefields">
            <div class="organizesource"><span class="gselect"><span class="gselectfield organize-source-skeleton">${$}${n("chevron-down")}</span></span></div>
            ${r("文件名模板")}
            ${r("目录模板")}
            <div class="organizepresets">${t}</div>
            <p class="cleanupmeta">${$}</p>
          </div></div>
        <footer class="geist-fieldset-footer" data-geist-fieldset-footer><button class="geist-button primary" ${gc}>预览</button></footer>
      </section></div>
    <section class="resourcesync" aria-labelledby="cleanup-loading-links">
      <h2 id="cleanup-loading-links">链接管理</h2>
      <div class="resourcesyncbox" data-geist-fieldset data-cleanup-task data-fieldset-stack>
        <div class="resourcesyncbody geist-fieldset-content"><h3 class="geist-fieldset-title">站外链接</h3>
          <div class="linksummary"><div class="linkstats"><div><span>链接总数</span><b>${$}</b><small>${$}</small></div>${[
		"官网/事务所",
		"社交账号",
		"作品资料站"
	].map((e) => `<div><span>${e}</span><b>${$}</b></div>`).join("")}</div>
          <div class="linkhosts"><span>主要站点</span><b>${$}</b></div></div></div>
        <div class="resourcesyncfooter geist-fieldset-footer" data-geist-fieldset-footer><button class="resourceaction primary" ${gc}>${n("unlink")}<span>检查死链</span></button></div>
      </div></section>
    <section class="resourcesync" aria-labelledby="cleanup-loading-sync">
      <h2 id="cleanup-loading-sync">资源同步</h2>
      <div class="resourcesyncbox" data-geist-fieldset data-cleanup-task>
        <div class="resourcesyncbody geist-fieldset-content"><h3 class="geist-fieldset-title">文件与记录核对</h3>
          <p>按馆藏记录逐条查找本地磁盘与网盘上的文件，列出文件已不存在的记录、空文件夹，以及不再被引用的缓存。</p></div>
        <div class="resourcesyncfooter geist-fieldset-footer" data-geist-fieldset-footer><button class="resourceaction primary" ${gc}>${n("git-compare")}<span>检查文件</span></button></div>
      </div></section></div>`;
}
//#endregion
//#region src/management-placeholder.ts
var wc = (e, { cards: t = !1, className: n = "", variant: r = "", count: i, fill: a, cardRatio: o, gridClass: s = "", gridSize: c = "" } = {}) => v(e, {
	variant: r || (t ? "cards" : "panel"),
	className: n,
	gridClass: s,
	gridSize: c,
	...i ? { count: i } : {},
	...a === void 0 ? {} : { fill: a },
	...o ? { cardRatio: o } : {}
}), Tc = [
	"元数据字段",
	"创作者标签",
	"厂牌 Logo",
	"女优头像",
	"西方身份回配",
	"番号目录存疑",
	"FC2 评论标记",
	"FC2 跨号相似",
	"片尾/出处证据"
], Ec = (e = "正在读取复核队列") => `<div class="review review-workspace review-skeleton" data-skeleton="review" aria-busy="true" aria-label="${t(e)}">
  <div class="reviewcontrols" data-section-nav><h2 class="review-category-title">复核分类</h2>
    <div class="reviewtabs" data-section-items>${Tc.map((e, n) => `<button type="button" disabled aria-selected="${n === 0}">${t(e)}<span class="skeleton reviewcountskeleton" aria-hidden="true"></span></button>`).join("")}</div></div>
  <div class="reviewbulkbar reviewbulktoolbar" aria-hidden="true">${"<span class=\"skeleton reviewtoolskeleton\"></span>".repeat(3)}</div>
  <section class="reviewsection"><div class="reviewlist">${"<div class=\"skeletoncard\" aria-hidden=\"true\"><i></i><b></b><em></em></div>".repeat(6)}</div></section></div>`, Dc = {
	"/data-cleanup": () => Cc(),
	"/resource-sync": () => Cc(),
	"/review": () => Ec(),
	"/diagnostics": () => o(),
	"/scraping": () => `<div class="scraping-page"><p>高清图片可能要经代理才能下载，先检查连接。</p>
    ${wc("正在读取采集来源", {
		cards: !0,
		count: 4,
		fill: !1,
		className: "cleanup-skeleton"
	})}</div>`
};
function Oc(e, { followLayout: t, followSort: n, followDir: r }) {
	return Zs(e, {
		followLayout: t,
		...e === "/follow-manage" ? {
			followSort: n,
			followDir: r
		} : {}
	}) || (Dc[e] ?? (() => wc("正在读取页面")))();
}
var kc = (e) => String(e).match(/data-skeleton="([^"]*)"/)?.[1] || "";
function Ac(e, t) {
	let n = e.querySelector("[data-skeleton]")?.dataset.skeleton || "", r = kc(t);
	(!r || r !== n) && (e.innerHTML = t, c(e));
}
//#endregion
//#region src/junk-queue.ts
var jc = [
	[
		"",
		"全部",
		"layout-grid"
	],
	[
		"video",
		"视频",
		"play"
	],
	[
		"image",
		"图片",
		"pics"
	],
	[
		"archive",
		"压缩包",
		"file-archive"
	],
	[
		"audio",
		"音频",
		"file-audio"
	],
	[
		"url",
		"网址",
		"globe"
	],
	[
		"other",
		"其它",
		"hard-drive"
	]
], Mc = (e) => jc.find(([t]) => t === e)?.[0] ?? "";
function Nc(e) {
	let t = new URLSearchParams(e);
	return {
		kind: Mc(t.get("type")),
		view: t.get("view") === "dismissed" ? "dismissed" : "pending"
	};
}
function Pc(e = "", t = "pending") {
	let n = new URLSearchParams();
	e && n.set("type", e), t === "dismissed" && n.set("view", "dismissed");
	let r = n.toString();
	return `/junk-files${r ? `?${r}` : ""}`;
}
function Fc(e) {
	return e === "dismissed" ? {
		view: "pending",
		label: "返回待判断",
		glyph: "rotate-ccw",
		href: Pc("", "pending")
	} : {
		view: "dismissed",
		label: "已排除",
		glyph: "eye-off",
		href: Pc("", "dismissed")
	};
}
var Ic = (e) => e === "dismissed" ? "已排除" : "待判断", Lc = (e) => `<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${e}"></use></svg>`;
function Rc({ kind: e, view: n }) {
	let r = jc.map(([r, i, a]) => `<a href="${Pc(r, n)}" data-junk-kind-link="${r}"${r === e ? " aria-current=\"page\"" : ""}>${Lc(a)}${t(i)}</a>`).join(""), i = Fc(n);
	return `<div class="peach-react" data-junk-count-skeleton=""><div data-junk-count=""><div data-junk-summary="" aria-live="polite">${Ss(Ic(n))}</div><div data-junk-filters-frame="" data-filter-glass="" data-glass-pane=""><span data-view-glide="" aria-hidden="true" hidden></span><nav data-junk-filters="" aria-label="垃圾文件分类">${r}<i data-junk-divider="" aria-hidden="true"></i><a href="${i.href}" data-junk-view-link="${i.view}"${n === "dismissed" ? " aria-current=\"page\"" : ""}>${Lc(i.glyph)}${i.label}</a></nav></div></div></div>`;
}
//#endregion
//#region src/player/controls.ts
function zc(e, t) {
	e?.closest(".video-js")?.querySelector(`.vjs-control-bar ${t}`)?.click();
}
//#endregion
//#region src/player/playback.ts
function Bc(e) {
	e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
}
function Vc(e, t) {
	let n = e.duration, r = (e.currentTime || 0) + t;
	e.currentTime = Number.isFinite(n) ? Math.max(0, Math.min(n, r)) : Math.max(0, r);
}
//#endregion
//#region src/islands.ts
var Hc = null;
function Uc(e, t, n, r) {
	Hc ??= import("/dist/peach-react.js").then((n) => (n.mountToaster(e, t), n)), Hc.then((e) => e.showToast(n, r));
}
var Wc = null, Gc = null;
function Kc(e) {
	return Wc ??= import("/dist/peach-react.js").then(async (t) => {
		let n = t.configureStage(e), r = document.createElement("div");
		return r.dataset.stageHost = "", await z("stage", r, (e) => (document.body.append(e), e)), Gc = n, n;
	}), Wc;
}
var qc = () => Gc, Jc = null, Yc = null;
function Xc(e) {
	return Jc ??= import("/dist/peach-react.js").then(async (t) => {
		let n = t.configureSettingsPanel(e), r = document.createElement("div");
		return r.dataset.settingsHost = "", await z("settings-panel", r, (e) => (document.body.append(e), e)), Yc = n, n;
	}), Jc;
}
var Zc = () => Yc, Qc = null, $c = null;
function el(e) {
	return Qc ??= import("/dist/peach-react.js").then(async (t) => {
		let n = t.configureImmerse(e), r = document.createElement("div");
		return r.dataset.immerseHost = "", await z("immerse", r, (e) => (document.body.append(e), e)), $c = n, n;
	}), Qc;
}
var tl = () => $c, nl = null, rl = null;
function il(e) {
	return nl ??= import("/dist/peach-react.js").then(async (t) => {
		let n = t.configureSidebar(e);
		return await z("sidebar", e.scroll, (e) => (e.replaceChildren(), e)), e.attached(), rl = n, n;
	}), nl;
}
var al = () => rl, ol = null, sl = null;
function cl(e) {
	return ol ??= import("/dist/peach-react.js").then(async (t) => {
		let n = t.configureManageHeader(e);
		return await z("manage-header", e.root, (e) => (e.replaceChildren(), e)), sl = n, n;
	}), ol;
}
var ll = () => sl, ul = null, dl = null;
function fl(e) {
	return ul ??= import("/dist/peach-react.js").then(async (t) => {
		let n = t.configureBatchDock(e);
		return await z("batch-dock", e.root), dl = n, n;
	}), ul;
}
var pl = () => dl, ml = null;
function hl(e) {
	return ml ??= import("/dist/peach-react.js").then(async (t) => {
		t.configureGlowPicker(e), await z("glow-picker", e.root);
	}), ml;
}
var gl = null;
ti(() => {
	import("/dist/peach-react.js").catch(() => {});
});
function _l(e) {
	if (!gl) {
		let t = import("/dist/peach-react.js").then((t) => (t.configureRouter(e), t));
		ii(t.then((e) => e.prefetchManagedRoute)), gl = t.then(() => void 0);
	}
	return gl;
}
//#endregion
export { ke as ACCENTS, Ht as ACCENT_CHOICES, dt as COVER_FRONT_RATIO, In as CancelledError, Ae as DEFAULT_ACCENT, ze as DEFAULT_HOME_GLOW, Xe as DEFAULT_SETTINGS, ge as DEFAULT_SIDEBAR_ORDER, Fa as FACE_CEILING, Na as FACE_TARGET, Ye as FEED_COMPILATION_KEYS, qe as FOLLOW_INITIAL_DAYS, Te as GLASS_NATIVE_PRESET, we as GLOW_SPOT_LABELS, Pe as GLOW_SWATCHES, Ne as GLOW_SWATCH_FAMILIES, Ee as HOME_GLOW_CHOICES, C as HOME_GLOW_PRESETS, Ce as HOME_GLOW_SPOTS, Uo as INDEX_TITLES, tr as InfiniteQueryObserver, ct as JAV_LAYOUTS, te as JAV_RELEASE_SORT, yr as MEDIA_SOURCES_KEY, vr as MEDIA_SOURCES_URL, Je as METADATA_REFRESH_DAYS, Pa as MIN_FACE_PX, nr as Mutation, ir as MutationCache, or as MutationObserver, Vr as OVERLAY_PATHS, ut as PHOTO_LAYOUTS, lt as PHOTO_SIZES, cr as QueriesObserver, Gn as Query, lr as QueryCache, ur as QueryClient, Yn as QueryObserver, I as ROUTE_META, Ge as SETTINGS_KEY, ee as SORTS, re as SORT_ALIASES, b as SORT_DIR_WORDS, ne as SORT_KEYS, Ke as THEME_CHOICES, nt as THEME_OPTIONS, Ot as TILES, Hi as activeQueue, Jr as adoptOverlayState, Ua as advanceImageFallback, T as allowedSetting, E as appSettingsStore, zt as applyAccent, Mt as applyDensity, Rt as applyGlassFaces, Lt as applyHomeGlow, et as applySyncedSettings, at as applyTheme, yo as avatarFrame, no as avatarInner, Ur as backgroundOf, Ai as barsContext, pl as batchDockApi, Ji as cameFromSetup, uo as cardArtwork, ho as cardIdentity, mt as cardLayoutFor, xt as cardRatio, ec as catalogEmptyHtml, ic as catalogFilterSkeletonHtml, $s as catalogSuggestions, Wt as chooseAccent, Ut as chooseGlowPreset, ja as clampPage, qr as clearOverlayBackground, zc as clickPlayerControl, Ki as configurationRequestedSection, Lo as configureHoverPreview, ii as connectManagedRoutes, bo as coverAnchor, So as coverBackdrop, To as coverFace, so as coverImage, wo as coverRatio, Za as coverUrl, kt as currentDensity, pr as dataTagErrorSymbol, fr as dataTagSymbol, jn as defaultScheduler, Dn as defaultShouldDehydrateMutation, On as defaultShouldDehydrateQuery, ae as defaultSortDir, kn as dehydrate, En as dehydrateQuery, Bi as detailOriginAbove, zi as detailOriginAnchor, mo as detailPosterUrl, ji as detailReturnBarsContext, Vi as detailReturnNeedsRestore, Ri as detailReturnPath, Xs as detailSkeletonHtml, pc as dropBars, ro as entityAvatar, to as entityFaceImg, Xi as entityJavLayout, Ho as entitySkeletonHtml, xn as environmentManager, dr as experimental_streamedQuery, oo as faceBoxAttrs, Ra as faceFrame, io as faceOrigin, ao as facePos, Ga as faceSourceScale, La as faceZoom, mi as failManagedRoute, dc as fetchBars, br as fetchMediaSources, fc as fetchTopsPage, jo as fitNativeImage, Sn as focusManager, Gi as followDetailReturnPath, wa as followJobProgress, Ii as followLastSelectedId, Ni as followSelected, Ao as frameCachedImages, Me as glowAccent, Ve as glowChipFill, Vt as glowChips, Ie as glowColor, Oe as glowPalette, De as glowPresetName, bt as gridLayout, Ia as hasFaceBox, j as hashKey, Kr as holdOverlayBackground, pt as homeLayout, An as hydrate, Ha as imageFallbackAttrs, tl as immerseApi, Zo as indexParams, ia as initBoardControls, Fo as installCardArt, Ln as isCancelledError, w as isNativeGlass, Hr as isOverlayPath, Xt as isServer, lo as javArtwork, ue as javImageKind, ft as javLayout, Sa as jobActivityHtml, Rc as junkCountSkeletonHtml, Pc as junkPath, Nc as junkRoute, fn as keepPreviousData, Fi as lastSelectedId, ci as listenManagedEntry, fl as loadBatchDock, hl as loadGlowPicker, el as loadImmerse, cl as loadManageHeader, Sr as loadMediaSources, _l as loadRouter, Xc as loadSettingsPanel, il as loadSidebar, Kc as loadStage, Qa as logoUrl, ll as manageHeaderApi, ya as manageHeaderSkeletonHtml, ga as manageHeaderView, si as managedEntries, ai as managedEntry, oi as managedTaken, Oc as managementSkeletonHtml, tn as matchMutation, en as matchQuery, fo as mixFace, _o as mixLabel, Ka as nativeImageFit, oe as nextSortState, k as noop, je as normalizeAccent, Ze as normalizeAppSettings, Be as normalizeHomeGlow, le as normalizeJavImage, x as normalizeJavLayout, ce as normalizeJavPreferences, be as normalizeSidebarOrder, P as notifyManager, ea as notifyShell, Nn as onlineManager, ui as openManagedRoute, z as openResidentSurface, Xr as overlayState, Aa as pageCount, Yi as pageOpens, wc as pageSkeletonHtml, Ma as paginationHtml, We as paintGlassFaces, Kt as paintGlowButton, Ue as paintHomeGlow, Ft as paintHomeGlowNow, ns as paintIndexSkeleton, Ac as paintManagementPlaceholder, Pt as paintPhotoSizeButton, fe as panelFrame, Va as parseFallbacks, M as partialMatchKey, Si as peachHistory, Ui as pendingQueueRoute, Xo as peopleLayoutOf, eo as performerLabel, vt as photoLayout, _t as photoSize, tt as postSearchHistoryLimit, xo as posterPanel, se as preferredDirection, ti as preloadManagedRoutes, Wi as presentedItem, F as queryClient, go as queueAvatarHtml, po as queueThumbHtml, Qe as readAppSettings, Mo as refitNativeImages, No as relayoutCovers, me as relayoutJavImages, Bo as releaseHover, zo as releaseHoverPreviews, pi as releaseManagedRoute, Ja as rememberRepresentatives, an as replaceEqualDeep, Ya as representativeOf, Gt as resetGlowColors, Oi as retagOverlay, Zr as routeMetaOf, Di as routeSeen, Ti as routingStarted, qi as runtimeConfigurable, Vc as seekVideoBy, Da as selectGroup, Pi as selectMode, Ta as selectRange, Li as selectSurface, Mi as selected, Ea as selectionSummary, U as setHoverState, Zc as settingsPanelApi, ko as settleImage, Ci as shellNavigate, na as shellVersion, _n as shouldThrowError, Uc as showToast, al as sidebarApi, xe as sidebarHasCatalogContent, fa as sidebarSkeletonHtml, Se as sidebarTagCounts, kc as skeletonKeyOf, hn as skipToken, ie as sortDirWord, qc as stageApi, Ei as startRouting, ki as state, St as storeHomeLayout, Ct as storeJavLayout, Et as storePhotoLayout, Tt as storePhotoSize, wt as storeVideoLayout, ta as subscribeShell, ra as syncBoardRange, pe as syncJavImages, Oa as syncSelectionToolbar, Yr as takeOverlayReturn, O as timeoutManager, Nt as toggleDensity, Bc as toggleVideoPlayback, ua as transitionTheme, mr as unsetMarker, fi as updateManagedRoute, Co as upgradeCover, Ca as watchJob, Oo as watchPendingImages, st as watchSystemTheme, qt as wireGlowButton, Vo as wireHover, Wa as wireImageFallbacks, Xa as withVersion, $i as writeShell };
