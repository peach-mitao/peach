import { api as e, esc as t, icon as n } from "/js/core.js";
import { ACCENTS as r, DEFAULT_ACCENT as i, DEFAULT_HOME_GLOW as a, HOME_GLOW_PRESETS as o, HOME_GLOW_SPOTS as s, glowAccent as c, glowChipFill as l, glowPalette as u, isNativeGlass as d, normalizeAccent as f, normalizeHomeGlow as p, paintGlassFaces as m, paintHomeGlow as h } from "/js/home-glow.js";
import { SKELETON_REVEAL_DELAY as g, emptyStateHtml as _, iconSwapHtml as v, loadingDotsHtml as y, moveGlidePane as ee, noteHtml as te, scrollMovesAnchor as ne, setIconSwap as re } from "/js/ui-components.js";
//#region src/sort-preferences.ts
var ie = [
	["seed", "随机"],
	["rating", "评分"],
	["o", "高潮计数"],
	["plays", "观看次数"],
	["dur", "时长"],
	["size", "体积"],
	["new", "入库时间"],
	["played", "观看时间"]
], ae = ["release", "发行时间"], oe = [...ie, ae].map(([e]) => e), se = {
	rating: ["从高到低", "从低到高"],
	o: ["从多到少", "从少到多"],
	plays: ["从多到少", "从少到多"],
	dur: ["从长到短", "从短到长"],
	size: ["从大到小", "从小到大"],
	new: ["从新到旧", "从旧到新"],
	played: ["从近到远", "从远到近"],
	release: ["从新到旧", "从旧到新"]
}, ce = {
	big: ["size", "desc"],
	short: ["dur", "asc"],
	long: ["dur", "desc"]
}, le = (e, t, n = se) => (n[e] || [])[+(t === "asc")] || "", ue = (e, t = se) => t[e] ? "desc" : "";
function de(e, t, n, r = se) {
	return e === t ? r[e] ? {
		sort: e,
		dir: n === "asc" ? "desc" : "asc"
	} : null : {
		sort: e,
		dir: ue(e, r)
	};
}
function fe(e, t, n) {
	return e === "seed" ? "" : e === t && n === "asc" ? "asc" : "desc";
}
//#endregion
//#region src/jav-artwork.ts
function b(e) {
	return [
		"small",
		"sleeve",
		"preview"
	].includes(String(e)) ? "small" : "big";
}
function pe(e) {
	return {
		javLayout: b(e.javLayout),
		javImage: me(e.javLayout === "preview" ? "thumbnail" : e.javImage)
	};
}
function me(e) {
	return e === "thumbnail" ? "thumbnail" : "cover";
}
function he(e, t) {
	return e.is_jav && e.code && e.has_cover && (me(t) === "cover" || !e.has_thumb) ? "cover" : e.has_thumb ? "thumbnail" : "";
}
var ge = .704;
function _e(e, t) {
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
function ve(e, t) {
	e.querySelectorAll("img[data-jav-image]").forEach((e) => {
		let n = e.dataset.javCover || "", r = e.dataset.javThumb || "", i = !!(n && (me(t) === "cover" || !r)), a = i ? n : r;
		e.classList.toggle("cover", i), e.classList.toggle("whole", i && e.dataset.javImageLayout !== "big"), e.classList.toggle("front", i && e.dataset.javImageLayout === "big"), e.classList.remove("panel"), e.removeAttribute("style"), e.closest(".pic,[data-media-pic]")?.style.removeProperty("--cover-blur"), a && e.getAttribute("src") !== a && (e.src = a);
	});
}
function ye(e, t) {
	let n = [];
	return e.querySelectorAll("img[data-jav-image]").forEach((e) => {
		e.dataset.javImageLayout !== t && (e.dataset.javImageLayout = t, e.classList.contains("cover") && (e.classList.toggle("whole", t !== "big"), e.classList.toggle("front", t === "big"), e.classList.remove("panel"), e.removeAttribute("style"), e.closest(".pic,[data-media-pic]")?.style.removeProperty("--cover-blur"), e.complete && e.naturalWidth && n.push(e)));
	}), n;
}
//#endregion
//#region src/number-setting.ts
function x(e, t, n, r) {
	return Number.isInteger(e) && e >= t && e <= n ? e : r;
}
//#endregion
//#region src/settings-store.ts
function be(e, t) {
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
var xe = [
	"",
	"follow",
	"jav",
	"performers",
	"tags",
	"studios",
	"flagged",
	"manage"
], Se = [
	"playlists",
	"immerse",
	"stats",
	"review",
	"data-cleanup",
	"trash",
	"follow-manage",
	"quality"
], Ce = /* @__PURE__ */ new Set([...xe, ...Se]), we = (e) => e === "ads" || e === "dupes" ? "data-cleanup" : e;
function Te(e) {
	let t = Array.isArray(e) ? e.filter((e) => typeof e == "string") : [], n = [...new Set(t.map(we))].filter((e) => Ce.has(e));
	return n.length ? n : [...xe];
}
function Ee(e) {
	return [
		"/",
		"/unseen",
		"/watch-later",
		"/flagged",
		"/trash",
		"/junk-files"
	].includes(e) || /^\/(item|mix|parts|editions)\//.test(e) || /^\/playlists\/\d+\/\d+$/.test(e) || /^\/(performers|studios|creators|series|agencies)\/.+/.test(e);
}
function De(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) for (let e of new Set(n.tags || [])) t.set(e, (t.get(e) || 0) + 1);
	return [...t].sort((e, t) => t[1] - e[1]).slice(0, 30);
}
//#endregion
//#region src/appearance/settings.ts
var Oe = "peach.settings.v1", ke = [
	"system",
	"light",
	"dark"
], Ae = [
	0,
	7,
	30,
	90
], je = [
	0,
	7,
	30,
	90
], Me = [
	"feedHideGroupCompilations",
	"feedHideSoloCompilations",
	"feedHideExcerpts"
], Ne = {
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
	sidebarOrder: [...xe],
	homeGlow: a,
	accent: i
}, S = (e, t, n) => t.includes(e) ? e : n;
function Pe(e) {
	let t = e && typeof e == "object" ? e : {}, n = {
		...Ne,
		...t
	};
	n.followInitialDays = Ae.includes(+n.followInitialDays) ? +n.followInitialDays : 30, delete n.rotateMinutes;
	let r = !1, i = +n.sortDefaultsVersion || 0;
	i < 2 && n.defaultSort === "new" && (n.defaultSort = "seed", r = !0);
	let a = ce[n.defaultSort];
	return i < 3 && a && (n.defaultSort = a[0], r = !0), n.sortDefaultsVersion = 3, n.batchSize = x(+n.batchSize, 1, 200, 60), n.defaultSort = S(n.defaultSort, oe, "seed"), n.hoverDelaySeconds = x(+n.hoverDelaySeconds, 0, 60, 5), n.seekSeconds = x(+n.seekSeconds, 1, 300, 10), delete n.loginDays, n.ambientMode = n.ambientMode !== !1, n.theaterMode = n.theaterMode === !0, n.groupCollapse = n.groupCollapse !== !1, n.detailAutoplay = n.detailAutoplay !== !1, n.miniplayer = n.miniplayer !== !1, n.uiSounds = n.uiSounds !== !1, n.feedAutoScroll = n.feedAutoScroll !== !1, n.feedHideGroupCompilations = n.feedHideGroupCompilations !== !1, n.feedHideSoloCompilations = n.feedHideSoloCompilations === !0, n.feedHideExcerpts = n.feedHideExcerpts !== !1, n.searchHistoryLimit = x(+n.searchHistoryLimit, 0, 50, 10), n.relatedLimit = x(+n.relatedLimit, 0, 60, 20), n.metadataRefreshDays = S(+n.metadataRefreshDays, je, 30), Object.assign(n, pe(n)), n.theme = S(n.theme, ke, "system"), n.homeGlow = p(n.homeGlow), n.accent = f(n.accent), n.sidebarOrder = Te(n.sidebarOrder), {
		settings: n,
		migrated: r
	};
}
function Fe(e) {
	let t = {};
	try {
		t = JSON.parse(e.getItem("peach.settings.v1") || "{}");
	} catch {}
	return Pe(t);
}
var C = null;
function w() {
	if (C) return C;
	let { settings: e, migrated: t } = Fe(localStorage);
	return C = be(Oe, e), t && C.save(), C;
}
function Ie(e, t, n = w()) {
	let r = n.value, i = e && e.followInitialDays;
	Ae.includes(i) && (r.followInitialDays = i, n.save());
	let a = e && e.metadataRefreshDays;
	je.includes(a) && a !== r.metadataRefreshDays && (r.metadataRefreshDays = a, n.save());
	for (let t of Me) typeof e?.[t] == "boolean" && e[t] !== r[t] && (r[t] = e[t], n.save());
	let o = e && e.searchHistoryLimit;
	Number.isInteger(o) && o >= 0 && o <= 50 ? o !== r.searchHistoryLimit && (r.searchHistoryLimit = x(o, 0, 50, 10), n.save(), t("searchHistoryLimit")) : e && e.searchHistoryLimit === null && r.searchHistoryLimit !== Ne.searchHistoryLimit && Le(n);
	let s = Array.isArray(e && e.sidebarOrder) ? e.sidebarOrder : null;
	!s || !s.length || s.join(",") === r.sidebarOrder.join(",") || (r.sidebarOrder = s, n.save());
}
function Le(t = w()) {
	return e("/api/settings", {
		method: "POST",
		body: JSON.stringify({ searchHistoryLimit: t.value.searchHistoryLimit })
	}).catch(() => {});
}
//#endregion
//#region src/appearance/theme.ts
var Re = [
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
], ze = null, Be = () => ze ??= matchMedia("(prefers-color-scheme: dark)");
function Ve(e = w().value.theme) {
	let t = document.documentElement;
	e === "system" ? delete t.dataset.theme : t.dataset.theme = e;
	let n = e === "dark" || e === "system" && Be().matches;
	t.classList.toggle("dark", n), document.querySelectorAll("[data-board-theme]").forEach((e) => e.setAttribute("aria-pressed", String(e.dataset.boardTheme === "dark" === n))), document.querySelector(".board-theme-toggle")?.classList.toggle("is-dark", n), document.querySelectorAll("meta[data-theme-color]").forEach((e) => {
		e.media = e.dataset.themeColor === "dark" === n ? "all" : "not all";
	});
}
var He = !1;
function Ue() {
	He || (He = !0, Be().addEventListener("change", () => {
		w().value.theme === "system" && Ve();
	}));
}
//#endregion
//#region src/appearance/layout.ts
var We = [[
	"big",
	"大图",
	"maximize"
], [
	"small",
	"小图",
	"layout-grid"
]], Ge = [[
	"big",
	"大图",
	"maximize"
], [
	"small",
	"小图",
	"layout-grid"
]], Ke = [[
	"fixed",
	"固定比例",
	"layout-grid"
], [
	"masonry",
	"瀑布流",
	"columns-2"
]], qe = .75, T = () => w().value, Je = (e = T()) => b(e.javLayout), Ye = (e = T()) => b(e.homeLayout), Xe = (e, t = T()) => e ? Ye(t) : Je(t), Ze = Ge.map(([e]) => e), Qe = Ke.map(([e]) => e), $e = (e = T()) => S(e.photoSize, Ze, "small"), et = (e = T()) => S(e.photoLayout, Qe, "masonry"), tt = null;
function nt(e, t = T()) {
	let n = {
		active: e.active,
		size: Xe(e.home, t),
		portrait: e.portrait,
		javImage: t.javImage
	}, r = tt;
	return (!r || Object.keys(n).some((e) => n[e] !== r[e])) && (tt = n), tt;
}
function rt(e) {
	return e.portrait ? 9 / 16 : e.active && e.size === "big" ? qe : 16 / 9;
}
function it(e, t = w()) {
	t.value.homeLayout = b(e), t.save();
}
function at(e, t = w()) {
	t.value.javLayout = b(e), t.save();
}
function ot(e, t = w()) {
	t.value.homeLayout = t.value.javLayout = b(e), t.save();
}
function st(e, t = w()) {
	t.value.photoSize = S(e, Ze, "small"), t.save();
}
function ct(e, t = w()) {
	t.value.photoLayout = S(e, Qe, "masonry"), t.save();
}
//#endregion
//#region src/appearance/density.ts
var lt = "density", ut = {
	big: "336px",
	dense: "168px"
}, dt = () => localStorage.getItem(lt) === "dense" ? "dense" : "big";
function ft(e, t) {
	let [n, r] = Ge;
	e.querySelector("[data-icon-swap]") ? re(e, t === r[0] ? "b" : "a") : e.innerHTML = v(n[2], r[2], t === r[0] ? "b" : "a"), e.setAttribute("aria-label", t === "big" ? "切换为小图" : "切换为大图");
}
var pt = () => document.querySelector("#density");
function mt(e = dt()) {
	document.documentElement.style.setProperty("--tile", ut[e]), document.body.dataset.density = e;
	let t = pt();
	t && (t.setAttribute("aria-pressed", String(e === "dense")), t.title = "当前：" + (e === "big" ? "大图" : "密集"), ft(t, e === "big" ? "big" : "small"));
}
function ht() {
	let e = dt() === "big" ? "dense" : "big";
	localStorage.setItem(lt, e), mt(e);
}
function gt(e) {
	let t = pt();
	t && (t.setAttribute("aria-pressed", String(e === "small")), t.title = "当前：" + (e === "big" ? "大图" : "小图"), ft(t, e));
}
//#endregion
//#region src/appearance/glow.ts
function _t(e = w()) {
	h(document.querySelector(".glowlayer"), e.value.homeGlow);
}
var vt = 0;
function yt(e = w()) {
	vt ||= requestAnimationFrame(() => {
		vt = 0, _t(e);
	});
}
function bt(e = w()) {
	m(document.documentElement, e.value.homeGlow);
}
function xt(e = w()) {
	document.documentElement.dataset.accent = e.value.accent;
}
var St = (e, t, n) => ({
	key: e,
	label: t,
	native: d(e),
	fill: d(e) ? "" : l(n)
});
function Ct(e) {
	let t = o.map(([e, t, n]) => St(e, t, s.map((e) => n[e].color)));
	return e.preset === "custom" && t.push(St("custom", "自定义", s.map((t) => e[t].color))), t;
}
var wt = r;
function Tt(e, t = w()) {
	if (e === "custom") return;
	let n = t.value.homeGlow;
	n.preset = e, Object.assign(n, u(e)), t.value.accent = c(e), t.save(), yt(t), bt(t), xt(t);
}
function Et(e, t = w()) {
	t.value.accent = f(e), t.save(), xt(t);
}
function Dt(e = w()) {
	let t = e.value.homeGlow;
	t.preset = a.preset, Object.assign(t, u(t.preset)), e.value.accent = i, e.save(), yt(e), bt(e), xt(e);
}
function Ot(e, t) {
	e.style.setProperty("--glow-swatch", t.on ? t.spot1.color : "var(--color-accent-500)"), e.toggleAttribute("data-glow-native", t.on && d(t.preset)), e.toggleAttribute("data-glow-off", !t.on);
}
function kt(e, t = w()) {
	return Ot(e, t.value.homeGlow), t.subscribe(() => Ot(e, t.value.homeGlow));
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/timeoutManager.js
var At = {
	setTimeout: (e, t) => setTimeout(e, t),
	clearTimeout: (e) => clearTimeout(e),
	setInterval: (e, t) => setInterval(e, t),
	clearInterval: (e) => clearInterval(e)
}, E = new class {
	#e = At;
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
function jt(e) {
	setTimeout(e, 0);
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/utils.js
var Mt = typeof window > "u" || "Deno" in globalThis;
function D() {}
function Nt(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function Pt(e) {
	return typeof e == "number" && e >= 0 && e !== Infinity;
}
function Ft(e, t) {
	return Math.max(e + (t || 0) - Date.now(), 0);
}
function O(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function It(e, t) {
	let { type: n = "all", exact: r, fetchStatus: i, predicate: a, queryKey: o, stale: s } = e;
	if (o) {
		if (r) {
			if (t.queryHash !== Rt(o, t.options)) return !1;
		} else if (!A(t.queryKey, o)) return !1;
	}
	if (n !== "all") {
		let e = t.isActive();
		if (n === "active" && !e || n === "inactive" && e) return !1;
	}
	return !(typeof s == "boolean" && t.isStale() !== s || i && i !== t.state.fetchStatus || a && !a(t));
}
function Lt(e, t) {
	let { exact: n, status: r, predicate: i, mutationKey: a } = e;
	if (a) {
		if (!t.options.mutationKey) return !1;
		if (n) {
			if (k(t.options.mutationKey) !== k(a)) return !1;
		} else if (!A(t.options.mutationKey, a)) return !1;
	}
	return !(r && t.state.status !== r || i && !i(t));
}
function Rt(e, t) {
	return (t?.queryKeyHashFn || k)(e);
}
function k(e) {
	return JSON.stringify(e, (e, t) => Ht(t) ? Object.keys(t).sort().reduce((e, n) => (e[n] = t[n], e), {}) : t);
}
function A(e, t) {
	if (e === t) return !0;
	if (typeof e != typeof t) return !1;
	if (e && t && typeof e == "object" && typeof t == "object") {
		if (Array.isArray(e) && Array.isArray(t)) {
			if (t.length > e.length) return !1;
			for (let n = 0; n < t.length; n++) if (!A(e[n], t[n])) return !1;
			return !0;
		}
		let n = Object.keys(t);
		for (let r of n) if (!A(e[r], t[r])) return !1;
		return !0;
	}
	return !1;
}
var zt = Object.prototype.hasOwnProperty;
function Bt(e, t, n = 0) {
	if (e === t) return e;
	if (n > 500) return t;
	let r = Vt(e) && Vt(t);
	if (!r && !(Ht(e) && Ht(t))) return t;
	let i = (r ? e : Object.keys(e)).length, a = r ? t : Object.keys(t), o = a.length, s = r ? Array(o) : {}, c = 0;
	for (let l = 0; l < o; l++) {
		let o = r ? l : a[l], u = e[o], d = t[o];
		if (u === d) {
			s[o] = u, (r ? l < i : zt.call(e, o)) && c++;
			continue;
		}
		if (u === null || d === null || typeof u != "object" || typeof d != "object") {
			s[o] = d;
			continue;
		}
		let f = Bt(u, d, n + 1);
		s[o] = f, f === u && c++;
	}
	return i === o && c === i ? e : s;
}
function j(e, t) {
	if (!t || Object.keys(e).length !== Object.keys(t).length) return !1;
	for (let n in e) if (e[n] !== t[n]) return !1;
	return !0;
}
function Vt(e) {
	return Array.isArray(e) && e.length === Object.keys(e).length;
}
function Ht(e) {
	if (!Ut(e)) return !1;
	let t = Object.getPrototypeOf(e), n = t?.constructor;
	if (n === void 0) return !0;
	if (typeof n != "function") return !1;
	let r = n.prototype;
	return !(!Ut(r) || !r.hasOwnProperty("isPrototypeOf") || t !== Object.prototype);
}
function Ut(e) {
	return Object.prototype.toString.call(e) === "[object Object]";
}
function Wt(e) {
	return new Promise((t) => {
		E.setTimeout(t, e);
	});
}
function Gt(e, t, n) {
	return typeof n.structuralSharing == "function" ? n.structuralSharing(e, t) : n.structuralSharing === !1 ? t : Bt(e, t);
}
function Kt(e) {
	return e;
}
function qt(e, t, n = 0) {
	let r = [...e, t];
	return n && r.length > n ? r.slice(1) : r;
}
function Jt(e, t, n = 0) {
	let r = [t, ...e];
	return n && r.length > n ? r.slice(0, -1) : r;
}
var Yt = Symbol();
function Xt(e, t) {
	return !e.queryFn && t?.initialPromise ? () => t.initialPromise : !e.queryFn || e.queryFn === Yt ? () => Promise.reject(/* @__PURE__ */ Error(`Missing queryFn: '${e.queryHash}'`)) : e.queryFn;
}
function Zt(e, t) {
	return typeof e == "function" ? e(...t) : !!e;
}
function Qt(e, t, n) {
	let r = !1, i;
	return Object.defineProperty(e, "signal", {
		enumerable: !0,
		get: () => (i ??= t(), r ? i : (r = !0, i.aborted ? n() : i.addEventListener("abort", n, { once: !0 }), i))
	}), e;
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/environmentManager.js
var $t = () => Mt, en = () => $t(), tn = {
	isServer: en,
	setIsServer(e) {
		$t = e;
	}
}, M = class {
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
}, nn = new class extends M {
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
function rn(e) {
	let t;
	if (e.then((e) => (t = e, e), D)?.catch?.(D), t !== void 0) return { data: t };
}
function an(e) {
	return {
		mutationKey: e.options.mutationKey,
		state: e.state,
		...e.options.scope && { scope: e.options.scope },
		...e.meta && { meta: e.meta }
	};
}
function on(e, t, n) {
	let r = e.promise?.then(t).catch((e) => n?.(e) === !1 ? Promise.reject(e) : Promise.reject(/* @__PURE__ */ Error("redacted")));
	return r?.catch(D), r;
}
function sn(e, t, n) {
	return {
		dehydratedAt: Date.now(),
		state: {
			...e.state,
			...e.state.data !== void 0 && { data: t ? t(e.state.data) : e.state.data }
		},
		queryKey: e.queryKey,
		queryHash: e.queryHash,
		...e.state.status === "pending" && { promise: on(e, t, n) },
		...e.meta && { meta: e.meta },
		...e.queryType && { queryType: e.queryType }
	};
}
function cn(e) {
	return e.state.isPaused;
}
function ln(e) {
	return e.state.status === "success";
}
function un(e, t = {}) {
	let n = t.shouldDehydrateMutation ?? e.getDefaultOptions().dehydrate?.shouldDehydrateMutation ?? cn, r = e.getMutationCache().getAll().flatMap((e) => n(e) ? [an(e)] : []), i = t.shouldDehydrateQuery ?? e.getDefaultOptions().dehydrate?.shouldDehydrateQuery ?? ln, a = t.shouldRedactErrors ?? e.getDefaultOptions().dehydrate?.shouldRedactErrors, o = t.serializeData ?? e.getDefaultOptions().dehydrate?.serializeData;
	return {
		mutations: r,
		queries: e.getQueryCache().getAll().flatMap((e) => i(e) ? [sn(e, o, a)] : [])
	};
}
function dn(e, t, n) {
	let r = e.getMutationCache(), i = e.getQueryCache(), a = n?.defaultOptions?.deserializeData ?? e.getDefaultOptions().hydrate?.deserializeData;
	t.mutations?.forEach(({ state: t, ...i }) => {
		r.build(e, {
			...e.getDefaultOptions().hydrate?.mutations,
			...n?.defaultOptions?.mutations,
			...i
		}, t);
	}), t.queries?.forEach(({ queryKey: t, state: r, queryHash: o, meta: s, promise: c, dehydratedAt: l, queryType: u }) => {
		let d = c ? rn(c) : void 0, f = r.data === void 0 ? d?.data : r.data, p = f === void 0 ? f : a ? a(f) : f, m = i.get(o), h = m?.state.status === "pending", g = m?.state.fetchStatus === "fetching";
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
		c && !d && !h && !g && l > m.state.dataUpdatedAt && m.fetch(void 0, { initialPromise: Promise.resolve(c).then(a) }).catch(D);
	});
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/notifyManager.js
var fn = jt;
function pn() {
	let e = [], t = 0, n = (e) => {
		e();
	}, r = (e) => {
		e();
	}, i = fn, a = (r) => {
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
var N = pn(), P = new class extends M {
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
function mn(e) {
	return Math.min(1e3 * 2 ** e, 3e4);
}
function hn(e) {
	return (e ?? "online") !== "online" || P.isOnline();
}
var F = class extends Error {
	constructor(e) {
		super("CancelledError"), this.revert = e?.revert, this.silent = e?.silent;
	}
};
function gn(e) {
	return e instanceof F;
}
function _n(e) {
	let t = !1, n = 0, r, i = "pending", a, o, s = new Promise((e, t) => {
		a = e, o = t;
	});
	s.catch(D);
	let c = () => i !== "pending", l = (t) => {
		if (!c()) {
			let n = new F(t);
			h(n), e.onCancel?.(n);
		}
	}, u = () => {
		t = !0;
	}, d = () => {
		t = !1;
	}, f = () => nn.isFocused() && (e.networkMode === "always" || P.isOnline()) && e.canRun(), p = () => hn(e.networkMode) && e.canRun(), m = (e) => {
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
			let i = e.retry ?? (en() ? 0 : 3), a = e.retryDelay ?? mn, o = typeof a == "function" ? a(n, r) : a, s = i === !0 || typeof i == "number" && n < i || typeof i == "function" && i(n, r);
			if (t || !s) {
				h(r);
				return;
			}
			n++, e.onFail?.(n, r), Wt(o).then(() => f() ? void 0 : g()).then(() => {
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
var vn = class {
	#e;
	destroy() {
		this.clearGcTimeout();
	}
	scheduleGc() {
		this.clearGcTimeout(), Pt(this.gcTime) && (this.#e = E.setTimeout(() => {
			this.optionalRemove();
		}, this.gcTime));
	}
	updateGcTime(e) {
		this.gcTime = Math.max(this.gcTime || 0, e ?? (en() ? Infinity : 3e5));
	}
	clearGcTimeout() {
		this.#e !== void 0 && (E.clearTimeout(this.#e), this.#e = void 0);
	}
};
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/infiniteQueryBehavior.js
function yn(e) {
	return { onFetch: (t, n) => {
		let r = t.options, i = t.fetchOptions?.meta?.fetchMore?.direction, a = t.state.data?.pages || [], o = t.state.data?.pageParams || [], s = {
			pages: [],
			pageParams: []
		}, c = 0, l = async () => {
			let n = !1, l = (e) => {
				Qt(e, () => t.signal, () => n = !0);
			}, u = Xt(t.options, t.fetchOptions), d = async (e, r, i) => {
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
				})(), o = await u(a), { maxPages: s } = t.options, c = i ? Jt : qt;
				return {
					pages: c(e.pages, o, s),
					pageParams: c(e.pageParams, r, s)
				};
			};
			if (i && a.length) {
				let e = i === "backward", t = e ? xn : bn, n = {
					pages: a,
					pageParams: o
				};
				s = await d(n, t(r, n), e);
			} else {
				let t = e ?? a.length;
				do {
					let e = c === 0 ? o[0] ?? r.initialPageParam : bn(r, s);
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
function bn(e, { pages: t, pageParams: n }) {
	let r = t.length - 1;
	return t.length > 0 ? e.getNextPageParam(t[r], t, n[r], n) : void 0;
}
function xn(e, { pages: t, pageParams: n }) {
	return t.length > 0 ? e.getPreviousPageParam?.(t[0], t, n[0], n) : void 0;
}
function Sn(e, t) {
	return t ? bn(e, t) != null : !1;
}
function Cn(e, t) {
	return !t || !e.getPreviousPageParam ? !1 : xn(e, t) != null;
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/query.js
var wn = class extends vn {
	#e;
	#t;
	#n;
	#r;
	#i;
	#a;
	#o;
	#s;
	constructor(e) {
		super(), this.#s = !1, this.#o = e.defaultOptions, this.setOptions(e.options), this.observers = [], this.#i = e.client, this.#r = this.#i.getQueryCache(), this.queryKey = e.queryKey, this.queryHash = e.queryHash, this.#t = Dn(this.options), this.state = e.state ?? this.#t, this.scheduleGc();
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
			let e = Dn(this.options);
			e.data !== void 0 && (this.setState(En(e.data, e.dataUpdatedAt)), this.#t = e);
		}
	}
	optionalRemove() {
		!this.observers.length && this.state.fetchStatus === "idle" && this.#r.remove(this);
	}
	setData(e, t) {
		let n = Gt(this.state.data, e, this.options);
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
		return this.#a?.cancel(e), t ? t.then(D).catch(D) : Promise.resolve();
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
		return this.observers.some((e) => O(e.options.enabled, this) !== !1);
	}
	isDisabled() {
		return this.getObserversCount() > 0 ? !this.isActive() : this.options.queryFn === Yt || !this.isFetched();
	}
	isFetched() {
		return this.state.dataUpdateCount + this.state.errorUpdateCount > 0;
	}
	isStatic() {
		return this.getObserversCount() > 0 && this.observers.some((e) => O(e.options.staleTime, this) === "static");
	}
	isStale() {
		return this.getObserversCount() > 0 ? this.observers.some((e) => e.getCurrentResult().isStale) : this.state.data === void 0 || this.state.isInvalidated;
	}
	isStaleByTime(e = 0) {
		return this.state.data === void 0 ? !0 : e === "static" ? !1 : this.state.isInvalidated ? !0 : !Ft(this.state.dataUpdatedAt, e);
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
			let e = Xt(this.options, t), n = (() => {
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
		(this.#e === "infinite" ? yn(this.options.pages) : this.options.behavior)?.onFetch(a, this), this.#n = this.state, (this.state.fetchStatus === "idle" || this.state.fetchMeta !== a.fetchOptions?.meta) && this.#c({
			type: "fetch",
			meta: a.fetchOptions?.meta
		});
		let o = this.#a = _n({
			initialPromise: t?.initialPromise,
			fn: a.fetchFn,
			onCancel: (e) => {
				e instanceof F && e.revert && this.setState({
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
			if (e instanceof F) {
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
					...Tn(t.data, this.options),
					fetchMeta: e.meta ?? null
				};
				case "success":
					let n = {
						...t,
						...En(e.data, e.dataUpdatedAt),
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
		this.state = t(this.state), N.batch(() => {
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
function Tn(e, t) {
	return {
		fetchFailureCount: 0,
		fetchFailureReason: null,
		fetchStatus: hn(t.networkMode) ? "fetching" : "paused",
		...e === void 0 && {
			error: null,
			status: "pending"
		}
	};
}
function En(e, t) {
	return {
		data: e,
		dataUpdatedAt: t ?? Date.now(),
		error: null,
		isInvalidated: !1,
		status: "success"
	};
}
function Dn(e) {
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
var On = class extends M {
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
		this.listeners.size === 1 && (this.#t.addObserver(this), An(this.#t, this.options) ? this.#m() : this.updateResult(), this.#y());
	}
	onUnsubscribe() {
		this.hasListeners() || this.destroy();
	}
	shouldFetchOnReconnect() {
		return jn(this.#t, this.options, this.options.refetchOnReconnect);
	}
	shouldFetchOnWindowFocus() {
		return jn(this.#t, this.options, this.options.refetchOnWindowFocus);
	}
	destroy() {
		this.listeners = /* @__PURE__ */ new Set(), this.#b(), this.#x(), this.#t.removeObserver(this);
	}
	setOptions(e) {
		let t = this.options, n = this.#t;
		if (this.options = this.#e.defaultQueryOptions(e), this.options.enabled !== void 0 && typeof this.options.enabled != "boolean" && typeof this.options.enabled != "function" && typeof O(this.options.enabled, this.#t) != "boolean") throw Error("Expected enabled to be a boolean or a callback that returns a boolean");
		this.#S(), this.#t.setOptions(this.options), t._defaulted && !j(this.options, t) && this.#e.getQueryCache().notify({
			type: "observerOptionsUpdated",
			query: this.#t,
			observer: this
		});
		let r = this.hasListeners();
		r && Mn(this.#t, n, this.options, t) && this.#m(), this.updateResult(), r && (this.#t !== n || O(this.options.enabled, this.#t) !== O(t.enabled, this.#t) || O(this.options.staleTime, this.#t) !== O(t.staleTime, this.#t)) && this.#g();
		let i = this.#_();
		r && (this.#t !== n || O(this.options.enabled, this.#t) !== O(t.enabled, this.#t) || i !== this.#f) && this.#v(i);
	}
	getOptimisticResult(e) {
		let t = this.#e.getQueryCache().build(this.#e, e), n = this.createResult(t, e);
		return j(this.getCurrentResult(), n) || (this.#r = n, this.#a = this.options, this.#i = this.#t.state), n;
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
		return e?.throwOnError || (t = t.catch(D)), t;
	}
	#h(e) {
		return !en() && O(this.options.enabled, this.#t) !== !1 && Pt(e);
	}
	#g() {
		this.#b();
		let e = O(this.options.staleTime, this.#t);
		if (this.#r.isStale || !this.#h(e)) return;
		let t = Ft(this.#r.dataUpdatedAt, e) + 1;
		this.#u = E.setTimeout(() => {
			this.#r.isStale || this.updateResult();
		}, t);
	}
	#_() {
		return O(this.options.refetchInterval, this.#t) ?? !1;
	}
	#v(e) {
		this.#x(), this.#f = e, !(this.#f === 0 || !this.#h(this.#f)) && (this.#d = E.setInterval(() => {
			(this.options.refetchIntervalInBackground || nn.isFocused()) && this.#m();
		}, this.#f));
	}
	#y() {
		this.#g(), this.#v(this.#_());
	}
	#b() {
		this.#u !== void 0 && (E.clearTimeout(this.#u), this.#u = void 0);
	}
	#x() {
		this.#d !== void 0 && (E.clearInterval(this.#d), this.#d = void 0);
	}
	createResult(e, t) {
		let n = this.#t, r = this.options, i = this.#r, a = this.#i, o = this.#a, s = e === n ? this.#n : e.state, { state: c } = e, l = { ...c }, u = !1, d;
		if (t._optimisticResults) {
			let i = this.hasListeners(), a = !i && An(e, t), o = i && Mn(e, n, t, r);
			(a || o) && (l = {
				...l,
				...Tn(c.data, e.options)
			}), t._optimisticResults === "isRestoring" && (l.fetchStatus = "idle");
		}
		let { error: f, errorUpdatedAt: p, status: m } = l;
		d = l.data;
		let h = !1;
		if (t.placeholderData !== void 0 && d === void 0 && m === "pending") {
			let e;
			i?.isPlaceholderData && t.placeholderData === o?.placeholderData ? (e = i.data, h = !0) : e = typeof t.placeholderData == "function" ? t.placeholderData(this.#l?.state.data, this.#l) : t.placeholderData, e !== void 0 && (m = "success", d = Gt(i?.data, e, t), u = !0);
		}
		if (t.select && d !== void 0 && !h) {
			if (i && d === a?.data && t.select === this.#s) d = this.#c;
			else try {
				this.#s = t.select, d = t.select(d), d = Gt(i?.data, d, t), this.#c = d, this.#o = null;
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
			isStale: Nn(e, t),
			refetch: this.refetch,
			isEnabled: O(t.enabled, e) !== !1
		};
	}
	updateResult() {
		let e = this.#r, t = this.createResult(this.#t, this.options);
		if (this.#i = this.#t.state, this.#a = this.options, this.#i.data !== void 0 && (this.#l = this.#t), j(t, e)) return;
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
		N.batch(() => {
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
function kn(e, t) {
	return O(t.enabled, e) !== !1 && e.state.data === void 0 && (e.state.status !== "error" || O(t.retryOnMount, e) !== !1);
}
function An(e, t) {
	return kn(e, t) || e.state.data !== void 0 && jn(e, t, t.refetchOnMount);
}
function jn(e, t, n) {
	if (O(t.enabled, e) !== !1 && O(t.staleTime, e) !== "static") {
		let r = O(n, e);
		return r === "always" || r !== !1 && Nn(e, t);
	}
	return !1;
}
function Mn(e, t, n, r) {
	return (e !== t || O(r.enabled, e) === !1) && (!n.suspense || e.state.status !== "error") && Nn(e, n);
}
function Nn(e, t) {
	return O(t.enabled, e) !== !1 && e.isStaleByTime(O(t.staleTime, e));
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/infiniteQueryObserver.js
var Pn = class extends On {
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
			hasNextPage: Sn(t, n.data),
			hasPreviousPage: Cn(t, n.data),
			isFetchNextPageError: l,
			isFetchingNextPage: u,
			isFetchPreviousPageError: d,
			isFetchingPreviousPage: f,
			isRefetchError: s && !l && !d,
			isRefetching: a && !u && !f
		};
	}
}, Fn = class extends vn {
	#e;
	#t;
	#n;
	#r;
	constructor(e) {
		super(), this.#e = e.client, this.mutationId = e.mutationId, this.#n = e.mutationCache, this.#t = [], this.state = e.state || In(), this.setOptions(e.options), this.scheduleGc();
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
		}, r = this.#r = _n({
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
		this.state = t(this.state), N.batch(() => {
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
function In() {
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
var Ln = class extends M {
	#e;
	#t;
	#n;
	constructor(e = {}) {
		super(), this.config = e, this.#e = /* @__PURE__ */ new Set(), this.#t = /* @__PURE__ */ new Map(), this.#n = 0;
	}
	build(e, t, n) {
		let r = new Fn({
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
		let t = Rn(e);
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
			let t = Rn(e);
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
		let t = Rn(e);
		if (typeof t == "string") {
			let n = this.#t.get(t)?.find((e) => e.state.status === "pending");
			return !n || n === e;
		}
		return !0;
	}
	runNext(e) {
		let t = Rn(e);
		return typeof t == "string" ? (this.#t.get(t)?.find((t) => t !== e && t.state.isPaused))?.continue() ?? Promise.resolve() : Promise.resolve();
	}
	clear() {
		N.batch(() => {
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
		return this.getAll().find((e) => Lt(t, e));
	}
	findAll(e = {}) {
		return this.getAll().filter((t) => Lt(e, t));
	}
	notify(e) {
		N.batch(() => {
			this.listeners.forEach((t) => {
				t(e);
			});
		});
	}
	resumePausedMutations() {
		let e = this.getAll().filter((e) => e.state.isPaused);
		return N.batch(() => Promise.all(e.map((e) => e.continue().catch(D))));
	}
};
function Rn(e) {
	return e.options.scope?.id;
}
//#endregion
//#region node_modules/@tanstack/query-core/build/modern/mutationObserver.js
var zn = class extends M {
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
		this.options = this.#e.defaultMutationOptions(e), j(this.options, t) || this.#e.getMutationCache().notify({
			type: "observerOptionsUpdated",
			mutation: this.#n,
			observer: this
		}), t?.mutationKey && this.options.mutationKey && k(t.mutationKey) !== k(this.options.mutationKey) ? this.reset() : this.#n?.state.status === "pending" && this.#n.setOptions(this.options);
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
		let e = this.#n?.state ?? In();
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
		N.batch(() => {
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
function Bn(e, t) {
	let n = new Set(t);
	return e.filter((e) => !n.has(e));
}
var Vn = class extends M {
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
		this.#n = e, this.#r = t, N.batch(() => {
			let e = this.#i, t = this.#p(this.#n);
			t.forEach((e) => e.observer.setOptions(e.defaultedQueryOptions));
			let n = t.map((e) => e.observer), r = n.map((e) => e.getCurrentResult()), i = e.length !== n.length, a = n.some((t, n) => t !== e[n]), o = i || a, s = o ? !0 : r.some((e, t) => {
				let n = this.#t[t];
				return !n || !j(e, n);
			});
			!o && !s || (o && (this.#l = t, this.#i = n), this.#t = r, this.hasListeners() && (o && (Bn(e, n).forEach((e) => {
				e.destroy();
			}), Bn(n, e).forEach((e) => {
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
			return (this.#t !== this.#s || i || t !== this.#o) && (this.#o = t, this.#s = this.#t, n !== void 0 && (this.#c = n), this.#a = Bt(this.#a, t(e))), this.#a;
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
			let r = this.#e.defaultQueryOptions(e), i = t.get(r.queryHash)?.shift() ?? new On(this.#e, r);
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
			(e || t !== n) && N.batch(() => {
				this.listeners.forEach((e) => {
					e(this.#t);
				});
			});
		}
	}
}, Hn = class extends M {
	#e;
	constructor(e = {}) {
		super(), this.config = e, this.#e = /* @__PURE__ */ new Map();
	}
	build(e, t, n) {
		let r = t.queryKey, i = t.queryHash ?? Rt(r, t), a = this.get(i);
		return a || (a = new wn({
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
		N.batch(() => {
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
		return this.getAll().find((e) => It(t, e));
	}
	findAll(e = {}) {
		let t = this.getAll();
		return Object.keys(e).length > 0 ? t.filter((t) => It(e, t)) : t;
	}
	notify(e) {
		N.batch(() => {
			this.listeners.forEach((t) => {
				t(e);
			});
		});
	}
	onFocus() {
		N.batch(() => {
			this.getAll().forEach((e) => {
				e.onFocus();
			});
		});
	}
	onOnline() {
		N.batch(() => {
			this.getAll().forEach((e) => {
				e.onOnline();
			});
		});
	}
}, Un = class {
	#e;
	#t;
	#n;
	#r;
	#i;
	#a;
	#o;
	#s;
	constructor(e = {}) {
		this.#e = e.queryCache || new Hn(), this.#t = e.mutationCache || new Ln(), this.#n = e.defaultOptions || {}, this.#r = /* @__PURE__ */ new Map(), this.#i = /* @__PURE__ */ new Map(), this.#a = 0;
	}
	mount() {
		this.#a++, this.#a === 1 && (this.#o = nn.subscribe(async (e) => {
			e && (await this.resumePausedMutations(), this.#e.onFocus());
		}), this.#s = P.subscribe(async (e) => {
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
		return r === void 0 ? this.fetchQuery(e) : (e.revalidateIfStale && n.isStaleByTime(O(t.staleTime, n)) && this.prefetchQuery(t), Promise.resolve(r));
	}
	getQueriesData(e) {
		return this.#e.findAll(e).map(({ queryKey: e, state: t }) => [e, t.data]);
	}
	setQueryData(e, t, n) {
		let r = this.defaultQueryOptions({ queryKey: e }), i = this.#e.get(r.queryHash)?.state.data, a = Nt(t, i);
		if (a !== void 0) return this.#e.build(this, r).setData(a, {
			...n,
			manual: !0
		});
	}
	setQueriesData(e, t, n) {
		return N.batch(() => this.#e.findAll(e).map(({ queryKey: e }) => [e, this.setQueryData(e, t, n)]));
	}
	getQueryState(e) {
		let t = this.defaultQueryOptions({ queryKey: e });
		return this.#e.get(t.queryHash)?.state;
	}
	removeQueries(e) {
		let t = this.#e;
		N.batch(() => {
			t.findAll(e).forEach((e) => {
				t.remove(e);
			});
		});
	}
	resetQueries(e, t) {
		let n = this.#e;
		return N.batch(() => {
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
		}, r = N.batch(() => this.#e.findAll(e).map((e) => e.cancel(n)));
		return Promise.all(r).then(D).catch(D);
	}
	invalidateQueries(e, t = {}) {
		return N.batch(() => (this.#e.findAll(e).forEach((e) => {
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
		}, r = N.batch(() => this.#e.findAll(e).filter((e) => !e.isDisabled() && !e.isStatic()).map((e) => {
			let t = e.fetch(void 0, n);
			return n.throwOnError || (t = t.catch(D)), e.state.fetchStatus === "paused" ? Promise.resolve() : t;
		}));
		return Promise.all(r).then(D);
	}
	async query(e) {
		let t = this.defaultQueryOptions(e);
		t.retry === void 0 && (t.retry = !1);
		let n = this.#e.build(this, t), r = n.isStaleByTime(O(t.staleTime, n)) ? await n.fetch(t) : n.state.data, i = t.select;
		return i ? i(r) : r;
	}
	fetchQuery(e) {
		let t = this.defaultQueryOptions(e);
		t.retry === void 0 && (t.retry = !1);
		let n = this.#e.build(this, t);
		return n.isStaleByTime(O(t.staleTime, n)) ? n.fetch(t) : Promise.resolve(n.state.data);
	}
	prefetchQuery(e) {
		return this.fetchQuery(e).then(D).catch(D);
	}
	infiniteQuery(e) {
		return e._type = "infinite", this.query(e);
	}
	fetchInfiniteQuery(e) {
		return e._type = "infinite", this.fetchQuery(e);
	}
	prefetchInfiniteQuery(e) {
		return this.fetchInfiniteQuery(e).then(D).catch(D);
	}
	ensureInfiniteQueryData(e) {
		return e._type = "infinite", this.ensureQueryData(e);
	}
	resumePausedMutations() {
		return P.isOnline() ? this.#t.resumePausedMutations() : Promise.resolve();
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
		this.#r.set(k(e), {
			queryKey: e,
			defaultOptions: t
		});
	}
	getQueryDefaults(e) {
		let t = [...this.#r.values()], n = {};
		return t.forEach((t) => {
			A(e, t.queryKey) && Object.assign(n, t.defaultOptions);
		}), n;
	}
	setMutationDefaults(e, t) {
		this.#i.set(k(e), {
			mutationKey: e,
			defaultOptions: t
		});
	}
	getMutationDefaults(e) {
		let t = [...this.#i.values()], n = {};
		return t.forEach((t) => {
			A(e, t.mutationKey) && Object.assign(n, t.defaultOptions);
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
		return t.queryHash ||= Rt(t.queryKey, t), t.refetchOnReconnect === void 0 && (t.refetchOnReconnect = t.networkMode !== "always"), t.throwOnError === void 0 && (t.throwOnError = !!t.suspense), !t.networkMode && t.persister && (t.networkMode = "offlineFirst"), t.queryFn === Yt && (t.enabled = !1), t;
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
function Wn({ streamFn: e, refetchMode: t = "reset", reducer: n = (e, t) => qt(e, t), initialValue: r = [] }) {
	return async (i) => {
		let a = i.client.getQueryCache().find({
			queryKey: i.queryKey,
			exact: !0
		}), o = !!a && a.isFetched();
		o && t === "reset" && a.setState({
			...a.resetState,
			fetchStatus: "fetching"
		});
		let s = r, c = !1, l = await e(Qt({
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
var Gn = Symbol(), Kn = Symbol(), qn = Symbol(), I = new Un({ defaultOptions: { queries: {
	networkMode: "always",
	retry: 0,
	refetchOnWindowFocus: !1,
	refetchOnMount: !1,
	retryOnMount: !1
} } }), Jn = /^[\\/]{2}/, Yn = "popstate";
function Xn(e) {
	return typeof e == "object" && !!e && "pathname" in e && "search" in e && "hash" in e && "state" in e && "key" in e;
}
function Zn(e = {}) {
	function t(e, t) {
		let n = t.state?.masked, { pathname: r, search: i, hash: a } = n || e.location;
		return tr("", {
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
		return typeof t == "string" ? t : nr(t);
	}
	return ir(t, n, null, e);
}
function Qn(e, t) {
	if (e === !1 || e == null) throw Error(t);
}
function $n() {
	return Math.random().toString(36).substring(2, 10);
}
function er(e, t) {
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
function tr(e, t, n = null, r, i) {
	return {
		pathname: typeof e == "string" ? e : e.pathname,
		search: "",
		hash: "",
		...typeof t == "string" ? rr(t) : t,
		state: n,
		key: t && t.key || r || $n(),
		mask: i
	};
}
function nr({ pathname: e = "/", search: t = "", hash: n = "" }) {
	return t && t !== "?" && (e += t.charAt(0) === "?" ? t : "?" + t), n && n !== "#" && (e += n.charAt(0) === "#" ? n : "#" + n), e;
}
function rr(e) {
	let t = {};
	if (e) {
		let n = e.indexOf("#");
		n >= 0 && (t.hash = e.substring(n), e = e.substring(0, n));
		let r = e.indexOf("?");
		r >= 0 && (t.search = e.substring(r), e = e.substring(0, r)), e && (t.pathname = e);
	}
	return t;
}
function ir(e, t, n, r = {}) {
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
		let r = Xn(e) ? e : tr(h.location, e, t);
		n && n(r, e), l = u() + 1;
		let d = er(r, l), f = h.createHref(r.mask || r);
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
		let r = Xn(e) ? e : tr(h.location, e, t);
		n && n(r, e), l = u();
		let i = er(r, l), d = h.createHref(r.mask || r);
		o.replaceState(i, "", d), a && c && c({
			action: s,
			location: h.location,
			delta: 0
		});
	}
	function m(e) {
		return ar(i, e);
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
			return i.addEventListener(Yn, d), c = e, () => {
				i.removeEventListener(Yn, d), c = null;
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
function ar(e, t, n = !1) {
	let r = "http://localhost";
	e && (r = e.location.origin === "null" ? e.location.href : e.location.origin), Qn(r, "No window.location.(origin|href) available to create URL");
	let i = typeof t == "string" ? t : nr(t);
	return i = i.replace(/ $/, "%20"), !n && Jn.test(i) && (i = r + i), new URL(i, r);
}
//#endregion
//#region src/history/index.ts
var L = Zn({ v5Compat: !0 }), or = 0, sr = {
	action: L.action,
	location: L.location,
	seq: or
}, cr = /* @__PURE__ */ new Set();
L.listen(({ action: e, location: t }) => {
	or += 1, sr = {
		action: e,
		location: t,
		seq: or
	};
	for (let e of [...cr]) e(sr);
});
var lr = {
	get navigation() {
		return sr;
	},
	listen(e) {
		return cr.add(e), () => {
			cr.delete(e);
		};
	},
	createHref: (e) => L.createHref(e),
	createURL: (e) => L.createURL(e),
	encodeLocation: (e) => L.encodeLocation(e),
	go: (e) => L.go(e),
	push: (e, t) => L.push(e, t),
	replace: (e, t) => L.replace(e, t)
};
function ur(e, { replace: t = !1, state: n } = {}) {
	let r = new URL(e, window.location.href), i = `${r.pathname}${r.search}${r.hash}`;
	t ? L.replace(i, n) : L.push(i, n);
}
//#endregion
//#region src/board-controls.ts
function dr(e) {
	let t = Number(e.min) || 0, n = Number(e.max) || 100, r = Number(e.value), i = n > t ? Math.max(0, Math.min(100, (r - t) / (n - t) * 100)) : 0;
	e.style.setProperty("--board-range-value", `${i}%`);
}
function fr() {
	let e = (e) => {
		e.querySelectorAll("input[type=range]").forEach(dr), gr(e), mr(e);
	};
	e(document), new MutationObserver((t) => {
		for (let n of t) for (let t of n.addedNodes) t instanceof Element && (t.matches("input[type=range]") && dr(t), e(t));
	}).observe(document.body, {
		subtree: !0,
		childList: !0
	}), document.addEventListener("input", (e) => {
		e.target instanceof HTMLInputElement && e.target.type === "range" && dr(e.target);
	});
	let t = document.createElement("div");
	t.className = "board-tooltip", t.id = "board-control-tooltip", t.role = "tooltip", t.hidden = !0, document.body.append(t);
	let n = null, r = "", i = null, a, o = () => {
		clearTimeout(a), t.hidden = !0, n && (n.hasAttribute("title") || (n.title = r), i === null ? n.removeAttribute("aria-describedby") : n.setAttribute("aria-describedby", i)), n = null;
	}, s = (e, s) => {
		let c = e instanceof Element ? e.closest("[title]") : null;
		!c || c === n || c.closest(".vjs-control") || !c.title.trim() || (o(), n = c, r = c.title, i = c.getAttribute("aria-describedby"), c.removeAttribute("title"), a = setTimeout(() => {
			if (n !== c || !c.isConnected) return;
			t.textContent = r, t.hidden = !1;
			let e = c.getBoundingClientRect(), a = t.getBoundingClientRect();
			t.style.left = `${Math.max(8, Math.min(innerWidth - a.width - 8, e.left + (e.width - a.width) / 2))}px`, t.style.top = `${e.top >= a.height + 16 ? e.top - a.height - 8 : Math.min(innerHeight - a.height - 8, e.bottom + 8)}px`, c.setAttribute("aria-describedby", [i, t.id].filter(Boolean).join(" "));
		}, s));
	};
	document.addEventListener("pointerover", (e) => s(e.target, 400)), document.addEventListener("pointerout", (e) => {
		n && !n.contains(e.relatedTarget) && o();
	}), document.addEventListener("focusin", (e) => s(e.target, 0)), document.addEventListener("focusout", o), document.addEventListener("keydown", (e) => {
		e.key === "Escape" && o();
	}), document.addEventListener("scroll", (e) => {
		n && ne(e, n) && o();
	}, !0), window.addEventListener("resize", o);
}
var pr = /* @__PURE__ */ new Map();
function mr(e) {
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
			n(i), pr.set(t, i);
		}, i = pr.get(t);
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
var hr = /* @__PURE__ */ new Map();
function gr(e) {
	let t = ".iconswitch,.insightswitch,.follow-workspace-switch", n = [...e.querySelectorAll(t)];
	e instanceof HTMLElement && e.matches(t) && n.push(e), n.forEach((e) => {
		if (e.hasAttribute("data-board-segments") || e.closest("[data-skeleton]")) return;
		e.dataset.boardSegments = "true";
		let t = document.createElement("span");
		t.className = "board-segment-thumb", t.setAttribute("aria-hidden", "true"), e.prepend(t);
		let n = e.className + (e.getAttribute("aria-label") ?? ""), r = hr.get(n) ?? null, i = () => {
			let i = e.querySelector("label:has(input:checked),button[aria-selected=true]");
			if (!i || !i.offsetWidth) return;
			let a = {
				x: i.offsetLeft,
				y: i.offsetTop,
				w: i.offsetWidth,
				h: i.offsetHeight
			};
			ee(t, r, a, "x"), r = a, hr.set(n, a);
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
var _r = !1;
async function vr(e, t) {
	if (_r) return;
	if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) {
		t();
		return;
	}
	let n = e.getBoundingClientRect(), r = n.left + n.width / 2, i = n.top + n.height / 2, a = Math.hypot(Math.max(r, innerWidth - r), Math.max(i, innerHeight - i)) * 2.5, o = document.createElement("style");
	o.textContent = `::view-transition-old(root){animation:none}::view-transition-new(root){mix-blend-mode:normal;mask-image:radial-gradient(circle closest-side,#000 78%,#0006 88%,transparent);mask-repeat:no-repeat;will-change:mask-position,mask-size;animation:peach-theme-reveal 560ms cubic-bezier(.16,1,.3,1) both}@keyframes peach-theme-reveal{from{mask-position:${r}px ${i}px;mask-size:0px 0px}to{mask-position:${r - a / 2}px ${i - a / 2}px;mask-size:${a}px ${a}px}}`, _r = !0, document.head.append(o);
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
		delete s.dataset.themeSnapshot, o.remove(), _r = !1;
	}
}
//#endregion
//#region src/sidebar-skeleton.ts
var yr = (e) => e.replace(/[&<>"']/g, (e) => ({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
})[e]);
function br(e, t, n) {
	let r = new Map(t.map((e) => [e[0], e]));
	return `<div data-sidebar-head=""></div><div data-sidebar-nav="">${e.map((e) => r.get(e)).filter((e) => e !== void 0).map(([e, t, r]) => {
		let i = e === "" ? "<img data-sidebar-home-logo=\"\" src=\"/peach-logo.png\" alt=\"\">" : `<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${yr(r)}"/></svg>`;
		return `<button type="button" data-nav="${yr(e)}" aria-pressed="${n(e)}" aria-label="${yr(t)}">${i}<span>${yr(t)}</span></button>`;
	}).join("")}</div>`;
}
//#endregion
//#region src/manage-header.ts
var xr = {
	"/junk-files": "垃圾文件",
	"/duplicates": "重复文件",
	"/review": "人工复核",
	"/trash": "回收站",
	"/quality-goals": "高清版",
	"/scraping": "来源和凭证"
}, Sr = /* @__PURE__ */ new Set(["/data-cleanup", "/scraping"]), Cr = ({ total: e, shown: t }) => `${e.toLocaleString()} 个符合 · 显示 ${t}`;
function wr(e) {
	let t = e.sections.find(([t]) => t === e.section);
	if (!t) return null;
	let n = xr[e.path] ?? "";
	return {
		title: e.section === "cleanup" && n || t[1],
		crumb: n,
		compact: Sr.has(e.path) || e.section === "configuration",
		lede: e.section === "trash" ? e.trash ? {
			kind: "count",
			text: Cr(e.trash),
			total: e.trash.total
		} : { kind: "skeleton" } : { kind: "none" }
	};
}
var R = (e) => e.replace(/[&<>"']/g, (e) => ({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
})[e]), Tr = (e) => `<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${R(e)}"/></svg>`, Er = "<span class=\"skeleton\" data-trash-lede-skeleton=\"text\" aria-hidden=\"true\"></span><span class=\"skeleton\" data-trash-lede-skeleton=\"action\" aria-hidden=\"true\"></span>";
function Dr(e) {
	let t = wr(e);
	if (!t) return "";
	let n = e.menu.map(([t, n, r]) => {
		let i = t === e.section;
		return `<button type="button" data-manage="${R(t)}" aria-pressed="${i}"${i ? " aria-current=\"page\"" : ""}>${Tr(r)}<span>${R(n)}</span></button>`;
	}).join(""), r = t.crumb ? `<nav data-manage-crumb="" aria-label="Breadcrumb"><ol><li><a href="/data-cleanup">数据管理</a>${Tr("chevron-right")}</li><li aria-current="true"><span>${R(t.crumb)}</span></li></ol></nav>` : "", i = t.lede.kind === "none" ? "" : `<p class="mono" data-manage-lede="">${t.lede.kind === "skeleton" ? Er : `<span data-lede-text="">${R(t.lede.text)}</span>${t.lede.total ? Or : ""}`}</p>`;
	return `<nav data-manage-bar="" aria-label="管理"><div data-manage-menu="">${n}<span data-manage-indicator="" aria-hidden="true"></span></div></nav>` + r + `<h2 data-manage-title=""${t.compact ? " data-compact=\"\"" : ""}>${R(t.title)}</h2>` + i;
}
var Or = "<button type=\"button\" data-empty-trash=\"\" title=\"永久删除回收站内容\">清空回收站</button>";
//#endregion
//#region src/jobs.ts
function kr(e, n, r) {
	if (!Number.isFinite(r) || r <= 0) return "";
	let i = Math.max(0, Math.min(r, Number.isFinite(n) ? n : 0)), a = i / r * 100;
	return `<div class="board-job-progress" role="progressbar" aria-label="${t(e)}" aria-valuemin="0" aria-valuemax="${r}" aria-valuenow="${i}"><svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true"><circle class="board-job-track" cx="18" cy="18" r="15"/><circle class="board-job-fill" cx="18" cy="18" r="15" pathLength="100" stroke-dasharray="${a} ${100 - a}" transform="rotate(-90 18 18)"/></svg><span>${t(e)}<small>${Math.round(a)}%</small></span></div>`;
}
function Ar(e, t = 0, n = 0) {
	return n > 0 ? kr(e, t, n) : y(e);
}
async function jr(e) {
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
function Mr(e) {
	let t = e.note || ((e) => te(e, {
		label: "任务状态",
		variant: "error"
	})), n = e.loading || y, r = e.progress || ((e, t, n) => Ar(n || `已处理 ${e} / ${t}`, e, t)), i = e.container || ((e) => `<section class="followtask" data-geist-fieldset aria-label="任务进度"><div class="geist-fieldset-content">${e}</div></section>`), a = document.createElement("div");
	e.host.hidden = !0, a.dataset.followJob = "", a.setAttribute("aria-live", "polite"), e.host.prepend(a);
	let o = e.storageKey || "peach-follow-job", s = sessionStorage.getItem(o) || void 0, c = !1;
	jr({
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
function Nr(e, t, n, r, i, a = i || !e.has(r)) {
	let o = n === null ? -1 : t.indexOf(n), s = t.indexOf(r);
	return i && o >= 0 && s >= 0 ? t.slice(Math.min(o, s), Math.max(o, s) + 1).forEach((t) => e.add(t)) : a ? e.add(r) : e.delete(r), r;
}
function Pr(e, t) {
	let n = t.filter((t) => e.has(t)).length;
	return {
		count: n,
		all: n > 0 && n === t.length,
		mixed: n > 0 && n < t.length
	};
}
function Fr(e, t, n) {
	t.forEach((t) => n ? e.add(t) : e.delete(t));
}
function Ir({ count: e, label: t, all: n, summary: r, actions: i, locked: a = !1 }) {
	e && (e.textContent = t), n && (n.checked = r.all, n.indeterminate = r.mixed);
	for (let e of i) e.disabled = !r.count || a;
}
function Lr(e, t, n = 1) {
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
function Rr(e, t) {
	return Math.max(1, Math.ceil(e / t));
}
function zr(e, t) {
	return Math.min(Math.max(1, Math.floor(e) || 1), t);
}
function Br(e, t, n) {
	if (t <= 1) return "";
	let r = Lr(e, t).map((t) => t === "…" ? "<li class=\"board-page-dots\" aria-hidden=\"true\">…</li>" : `<li><button type="button" class="board-page" data-page="${t}" aria-label="第 ${t} 页"${t === e ? " aria-current=\"page\"" : ""}>${t}</button></li>`).join("");
	return `<nav class="board-pagination" aria-label="${n}">
    <button type="button" class="geist-button" data-page="${e - 1}"${e <= 1 ? " disabled" : ""}><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-chevron-left"></use></svg>上一页</button>
    <ul>${r}</ul>
    <button type="button" class="geist-button" data-page="${e + 1}"${e >= t ? " disabled" : ""}>下一页<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-chevron-right"></use></svg></button>
  </nav>`;
}
//#endregion
//#region src/card-art/face-frame.ts
var Vr = .32, Hr = 13, Ur = .6;
function Wr(e) {
	return e ? Number.isFinite(e.cx) && Number.isFinite(e.cy) && Number(e.faceW) > 0 && Number(e.imgW) > 0 && Number(e.imgH) > 0 : !1;
}
function Gr(e, t, n = 1, r = Vr, i = Ur) {
	if (!Wr(e) || !(t && t.w > 0 && t.h > 0)) return 1;
	let a = n > 0 ? n : 1, o = Math.max(t.w / e.imgW, t.h / e.imgH), s = e.faceW * o;
	if (!(s > 0)) return 1;
	let c = Math.min(t.w, t.h), l = Math.max(r, 13 / c) * c / s, u = Math.max(t.w / (2 * Math.min(e.cx, 1 - e.cx) * e.imgW * o), t.h / (2 * Math.min(e.cy, 1 - e.cy) * e.imgH * o)), d = e.faceW / (s * a);
	return Math.max(1, Math.min(Math.max(l, Math.min(u, i * c / s)), d));
}
function Kr(e, t, n = 1, r = Vr, i = Ur) {
	let a = Gr(e, t, n, r, i);
	if (a <= 1 || !Wr(e) || !t) return null;
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
var qr = "|", Jr = "closest:";
function Yr(e) {
	return String(e ?? "").split(qr).map((e) => e.trim()).filter(Boolean);
}
function Xr({ drop: e = "self", fallbacks: n = [], initial: r = "", dropClass: i = "", dropStyle: a = !1 } = {}) {
	let o = (Array.isArray(n) ? n : [n]).filter(Boolean);
	return [
		`data-drop="${t(e)}"`,
		o.length ? `data-fallbacks="${t(o.join(qr))}"` : "",
		r ? `data-initial="${t(r)}"` : "",
		i ? `data-drop-class="${t(i)}"` : "",
		a ? "data-drop-style" : ""
	].filter(Boolean).join(" ");
}
function Zr(e) {
	if (!e || !e.dataset || !e.dataset.drop) return "";
	let t = Yr(e.dataset.fallbacks);
	if (t.length) {
		let [n = "", ...r] = t;
		return "dropStyle" in e.dataset && e.removeAttribute("style"), delete e.dataset.facebox, r.length ? e.dataset.fallbacks = r.join(qr) : delete e.dataset.fallbacks, e.src = n, "retry";
	}
	let n = e.dataset.drop;
	if (n.startsWith(Jr)) return (e.closest(n.slice(8)) || e).remove(), "drop";
	if (n === "initial") {
		let t = document.createElement("span");
		return t.className = e.dataset.dropClass || "", t.textContent = e.dataset.initial || "", e.replaceWith(t), "drop";
	}
	return e.remove(), "drop";
}
function Qr(e) {
	e.addEventListener("error", (e) => {
		e.target instanceof HTMLImageElement && Zr(e.target);
	}, !0);
}
//#endregion
//#region src/card-art/native-image.ts
function $r(e, t, n, r) {
	if (!(e > 0 && t > 0 && n > 0 && r > 0)) return 0;
	let i = e / n, a = t / r;
	return i > 1.001 || a > 1.001 || Math.abs(i - a) > Math.max(i, a) * .01 ? 0 : i;
}
function ei(e, t, n, r, i = 1) {
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
var ti = /* @__PURE__ */ new Map();
function ni(e) {
	(e || []).forEach((e) => {
		e.rep && e.has_avatar && ti.set(e.k, e.rep);
	});
}
function ri(e) {
	return ti.get(e);
}
//#endregion
//#region src/card-art/markup.ts
var ii = (e, t) => t ? `${e}&v=${encodeURIComponent(t)}` : e, ai = (e, t = !1) => ii(`/cover?code=${encodeURIComponent(e.code || "")}${t ? "&thumb=1" : ""}`, e.cover_version), oi = (e, t, n) => ii(`/logo?studio=${encodeURIComponent(e)}&variant=${t}`, n), si = (e) => e && typeof e == "object" ? e : null;
function ci(e) {
	return e && e.is_jav ? "女优" : "艺人";
}
function li({ kind: e = "performer", id: t = null, hasImage: n = !1, version: r = "", rep: i = null, mark: a = null, logo: o = "", logoVersion: s = "", logoVariant: c = "logo", alt: l = "", lazy: u = !0, style: d = "", dropStyle: f = !1, focus: p = null, thumb: m = !1 } = {}) {
	let h = !!(t && n), g = h ? ii(`/entity-image?kind=${e}&id=${t}${m ? "&thumb=1" : ""}`, r) : "", _ = i ? `/avatar?id=${i}` : "", v = !!o, y = v ? oi(o, c, s) : g || _ || (a ? `/link-mark?id=${a}` : "");
	if (!y) return "";
	let ee = v ? [g, _].filter(Boolean) : h && _ ? [_] : [], te = h && !v, ne = te ? mi(p) : "", re = d || pi(p);
	return `<img src="${y}" alt="${l}"${u ? " loading=\"lazy\"" : ""} decoding="async"${te ? re : ""} ${ne}${Xr({
		dropStyle: (f || !!ne || !!re) && te,
		fallbacks: ee
	})}>`;
}
function ui(e, n, r, i = "performer", a = null, o = "", s = "icon", c = void 0, l = !1) {
	let u = c === void 0 ? n && n.avatar_focus || null : c;
	return `<span class="ini">${t((e || "?").slice(0, 1))}</span>` + li({
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
function di(e, t, n) {
	return ui(e, t, n ? ri(e) : null, n || "performer");
}
function fi(e) {
	let t = si(e);
	return t && t.axis === "x" ? `${t.pct}% 50%` : t && t.axis === "y" ? `50% ${t.pct}%` : "";
}
function pi(e) {
	let t = fi(e);
	return t ? ` style="object-position:${t}"` : "";
}
function mi(e) {
	let t = si(e)?.box;
	return t ? ` data-facebox="${[
		t.cx,
		t.cy,
		t.faceW,
		t.imgW,
		t.imgH
	].map(Number).join(" ")}"` : "";
}
function hi(e, t, n = !1) {
	let r = ai(e, !0), i = e.cover_frame || {}, a = [i.cx == null ? "" : ` data-cx="${i.cx}"`, i.cy == null ? "" : ` data-cy="${Math.min(.6, Math.max(.05, i.cy))}"`].join(""), o = e.poster_box, s = o ? ` data-posterbox="${[
		o.x0,
		(o.px || [])[0],
		(o.px || [])[1],
		o.y0,
		o.x1,
		o.y1
	].map(Number).join(" ")}"` : "";
	return `<img class="poster cover ${t === "small" ? "whole" : "front"}" src="${r}"
    alt="" loading="${n ? "eager" : "lazy"}"${a}${s} data-drop="self">`;
}
var gi = {
	kind: "",
	html: ""
};
function _i(e, n, r, i) {
	let a = he(e, i);
	if (!a) return gi;
	let o = e.has_cover && e.code ? ai(e, !0) : "", s = e.has_thumb || e.has_local_poster ? `/poster?id=${e.id}&c=4` : "", c = hi(e, n, r), l = (c.match(/ data-(?:c[xy]|posterbox)="[^"]*"/g) || []).join(""), u = a === "cover" ? c : `<img class="poster" src="${s}" alt="" loading="${r ? "eager" : "lazy"}"${l}>`;
	return {
		kind: a === "cover" ? "cover" : "thumb",
		html: u.replace("<img ", `<img data-jav-image="${e.id}" data-jav-cover="${t(o)}" data-jav-thumb="${t(s)}" data-jav-image-layout="${n}" `)
	};
}
function vi(e, n, r, i) {
	return e.is_jav ? _i(e, n, r, i) : e.follow_thumb_url ? {
		kind: "thumb",
		html: `<img class="poster" src="${t(e.follow_thumb_url)}" alt="" loading="${r ? "eager" : "lazy"}" referrerpolicy="no-referrer">`
	} : yi(e, n, r, i);
}
function yi(e, t, n, r) {
	return e.is_jav ? _i(e, t, n, r) : !e.has_thumb && !e.has_local_poster ? gi : {
		kind: "thumb",
		html: `<img class="poster" src="/poster?id=${e.id}&c=4" alt="" loading="${n ? "eager" : "lazy"}">`
	};
}
function bi(e, t) {
	return yi(e, "small", !1, t).html || "<span class=\"nopic\">无预览</span>";
}
function xi(e, t) {
	let n = e.has_thumb || e.has_local_poster ? `/poster?id=${e.id}&c=4` : "";
	return e.is_jav && he(e, t) === "cover" ? ai(e) : n;
}
function Si(e) {
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
function Ci(e) {
	let { kind: t, name: n, coStarred: r, performers: i, refs: a } = Si(e);
	return r ? `<div class="mavstack">${i.slice(0, 5).map((e, t) => `<span class="mav">${ui(e, a[t], ri(e))}</span>`).join("")}</div>` : `<span class="mav">${ui(n, t === "performer" ? a[0] : e.creator_entity, t ? ri(n) : null, t || "performer")}</span>`;
}
function wi(e, t) {
	let n = (e.performers || [])[0];
	return (e.is_jav && n ? n : e.creator) || n || e.studio || e.code || t((e.tags || [])[0] || "") || "为你推荐";
}
//#endregion
//#region src/card-art/framing.ts
var Ti = () => window.devicePixelRatio || 1;
function z(e) {
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
			r.width > 0 && r.height > 0 && (n.disconnect(), z(e));
		});
		n.observe(t);
		return;
	}
	let [r = NaN, i = NaN, a = NaN, o = NaN, s = NaN] = String(e.dataset.facebox).split(" ").map(Number), c = $r(e.naturalWidth, e.naturalHeight, o, s);
	if (!c) {
		e.style.objectPosition = "50% 50%";
		return;
	}
	let l = Kr({
		cx: r,
		cy: i,
		faceW: a * c,
		imgW: o * c,
		imgH: s * c
	}, {
		w: n.width,
		h: n.height
	}, Ti());
	if (!l) return;
	let u = e.style;
	u.position = "absolute", u.right = "auto", u.bottom = "auto", u.left = `${l.left}%`, u.top = `${l.top}%`, u.width = `${l.width}%`, u.height = `${l.height}%`, u.maxWidth = "none", u.maxHeight = "none";
}
function Ei(e) {
	let t = e.naturalWidth / e.naturalHeight;
	if (!t) return;
	let n = new URL(e.currentSrc || e.src, location.href).searchParams.get("code") || "";
	e.dataset.frame = /^FC2(?:-PPV)?-/i.test(n) || t >= 1.65 ? "still" : t > 1.2 ? "sleeve" : "front";
	let r = Ai(e), i = (t, n, r) => {
		if (n == null || !(r > 0 && r < 1)) return;
		let i = Math.min(1, Math.max(0, (n - r / 2) / (1 - r)));
		e.style.setProperty(t, `${Math.round(i * 100)}%`);
	};
	i("--cover-x", ji(e, "cx"), r / t), i("--cover-y", ji(e, "cy"), t / r), Di(e, r), (e.classList.contains("whole") || e.dataset.frame === "front") && Math.abs(t / r - 1) > .02 && Oi(e);
}
function Di(e, t) {
	if (e.dataset.frame === "front") return;
	let [n = NaN, r = NaN, i = NaN, a = NaN, o = NaN, s = NaN] = String(e.dataset.posterbox || "").split(" ").map(Number);
	if (!e.dataset.posterbox && e.dataset.frame === "sleeve" && (r = e.naturalWidth, i = e.naturalHeight, n = Math.round(r - ge * i), a = 0, o = r, s = i), !$r(e.naturalWidth, e.naturalHeight, r, i)) return;
	let c = _e({
		x0: n,
		y0: a,
		x1: o,
		y1: s,
		px: [r, i]
	}, t);
	c && (e.classList.add("panel"), e.style.setProperty("--panel-clip", `${c.clip.top}% ${c.clip.right}% ${c.clip.bottom}% ${c.clip.left}%`), e.style.setProperty("--panel-left", `${c.left}%`), e.style.setProperty("--panel-top", `${c.top}%`), e.style.setProperty("--panel-height", `${c.height}%`), Oi(e));
}
function Oi(e) {
	e.closest(".pic,[data-media-pic]")?.style.setProperty("--cover-blur", `url("${e.dataset.thumbSrc || e.currentSrc || e.src}")`);
}
function ki(e) {
	if (!/[?&]thumb=1(&|$)/.test(e.src) || !e.naturalWidth) return;
	let { width: t, height: n } = e.getBoundingClientRect();
	(getComputedStyle(e).objectFit === "contain" ? Math.min : Math.max)(t / e.naturalWidth, n / e.naturalHeight) * Ti() > 1.01 && (e.dataset.thumbSrc = e.src, e.src = e.src.replace(/[?&]thumb=1(?=&|$)/, ""));
}
function Ai(e) {
	let t = getComputedStyle(e).getPropertyValue("--card-ratio").trim().split("/").map(Number), n = t.length === 2 ? Number(t[0]) / Number(t[1]) : Number(t[0]);
	return Number.isFinite(n) && n > 0 ? n : 16 / 9;
}
function ji(e, t) {
	let n = parseFloat(e.dataset[t] ?? "");
	return Number.isFinite(n) ? n : null;
}
var Mi = ".pic>img.poster,[data-media-art]>img,.ring>img,[data-tier-ring]>img,[data-person-ring]>img,[data-entity-portrait]>img,[data-hero-ring]>img", Ni = /* @__PURE__ */ new WeakMap();
function Pi(e) {
	let t = e.matches(Mi) ? [e] : e.querySelectorAll(Mi);
	for (let e of t) !e.complete && e.parentElement && (e.parentElement.classList.add("imgwait"), Ni.set(e.parentElement, performance.now()));
}
function Fi(e) {
	let t = e.parentElement;
	if (!t?.classList.contains("imgwait")) return;
	if (performance.now() - (Ni.get(t) ?? NaN) < g) {
		t.classList.remove("imgwait");
		return;
	}
	t.classList.replace("imgwait", "imgdone");
	let n, r = (e) => {
		e && (e.target !== t || e.pseudoElement !== "::after") || (t.removeEventListener("transitionend", r), clearTimeout(n), t.classList.remove("imgdone"));
	};
	t.addEventListener("transitionend", r), n = setTimeout(r, 1e3);
}
function Ii(e) {
	let t = "img.cover,img[data-facebox]", n = e.matches(t) ? [e] : e.querySelectorAll(t);
	for (let e of n) {
		let t = e;
		t.complete && t.naturalWidth && (t.classList.contains("cover") ? Ei(t) : (Li(t), z(t)));
	}
}
function Li(e) {
	let t = e.closest("[data-fit-native]");
	if (!t || !e.naturalWidth) return;
	let { small: n, width: r, height: i } = ei(e.naturalWidth, e.naturalHeight, t.clientWidth, t.clientHeight, Ti());
	t.dataset.nativeSmall = String(n), t.style.setProperty("--markw", n ? r + "px" : "100%"), t.style.setProperty("--markh", n ? i + "px" : "100%");
	let a = (e.currentSrc || e.src).replace(/"/g, "%22");
	t.style.setProperty("--markbg", n ? `url("${a}")` : "none");
}
function Ri(e) {
	(e || document).querySelectorAll("[data-fit-native] img").forEach((e) => {
		Li(e), e.dataset.facebox && z(e);
	});
}
function zi(e, t) {
	for (let n of ye(e, t)) Ei(n), ki(n);
}
var Bi = !1;
function Vi() {
	Bi || (Bi = !0, document.addEventListener("load", (e) => {
		let t = e.target;
		t instanceof HTMLImageElement && (Fi(t), Li(t), t.classList.contains("cover") ? (Ei(t), ki(t)) : t.dataset.facebox && z(t));
	}, !0), new MutationObserver((e) => {
		for (let t of e) for (let e of t.addedNodes) e.nodeType === Node.ELEMENT_NODE && (Pi(e), Ii(e));
	}).observe(document.body, {
		childList: !0,
		subtree: !0
	}), document.addEventListener("error", (e) => {
		let t = e.target;
		t instanceof HTMLImageElement && !t.dataset.fallbacks && Fi(t);
	}, !0));
}
//#endregion
//#region src/card-art/hover.ts
var Hi = ".card,[data-media-card],[data-mix-card]", B = {
	selecting: () => !1,
	censored: () => !1,
	delaySeconds: () => 0
};
function Ui(e) {
	B = e;
}
var Wi = () => !!window.__scrolling;
function Gi(e = document, t = null) {
	!e || !e.querySelectorAll || (e.querySelectorAll(Hi).forEach((e) => {
		e !== t && e._stopHover && e._stopHover();
	}), e.querySelectorAll("video.hv").forEach((e) => {
		e.closest(Hi) !== t && (e._hop && clearInterval(e._hop), e.pause(), e.removeAttribute("src"), e.load(), e.remove());
	}), e.querySelectorAll("img.hvframes").forEach((e) => {
		e.closest(Hi) !== t && (e.removeAttribute("src"), e.remove());
	}));
}
function Ki(e) {
	e._stopHover?.(), Gi(e);
}
function V(e, t, n) {
	n ? e.dataset[t] = "" : delete e.dataset[t];
}
function qi(e, t) {
	let n = e, r = e.querySelector("[data-media-pic]");
	if (!r) return;
	e.dataset.hoverMode = t.location === "local" ? "video" : "frames";
	let i, a = () => {
		clearTimeout(i), B.delaySeconds() && (V(e, "previewing", !0), i = setTimeout(() => {
			B.delaySeconds() && V(e, "longhover", !0);
		}, B.delaySeconds() * 1e3));
	}, o = () => {
		clearTimeout(i), V(e, "previewing", !1), V(e, "longhover", !1);
	};
	if (t.location !== "local") {
		if (!t.has_thumb) return;
		let i, s = 4, c = null, l = !1;
		e.addEventListener("mouseenter", () => {
			B.selecting() || B.censored() || (a(), c || (c = document.createElement("img"), c.className = "hvframes", c.alt = "", c.src = `/poster?id=${t.id}&c=${s}`, r.appendChild(c)), clearInterval(i), i = setInterval(() => {
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
		B.selecting() || B.censored() || Wi() || (s = setTimeout(() => {
			if (Wi() || B.censored()) return;
			Gi(document, e);
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
function Ji(e, t, n) {
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
//#region src/follow-sort.ts
var Yi = [
	["checked", "检查时间"],
	["added", "添加时间"],
	["name", "创作者名称"],
	["sources", "来源数量"],
	["source", "来源名称"],
	["provider", "站点"],
	["status", "状态"]
], Xi = "checked", Zi = {
	checked: "desc",
	added: "desc",
	name: "asc",
	sources: "desc",
	source: "asc",
	provider: "asc",
	status: "asc"
}, Qi = (e) => Yi.some(([t]) => t === e);
function $i(e, t) {
	let n = Qi(e) ? e : Xi;
	return {
		sort: n,
		dir: t === "asc" || t === "desc" ? t : Zi[n]
	};
}
//#endregion
//#region src/island-skeleton.ts
var ea = "inline-flex items-center justify-center gap-0.5 whitespace-nowrap overflow-hidden font-sans", ta = {
	medium: "h-9 rounded-2lg p-2 text-body-medium",
	small: "h-8 rounded-lg px-2 py-1.5 text-body-medium"
}, na = {
	medium: ta.medium,
	small: "size-8 rounded-lg p-0 text-body-medium"
}, ra = {
	medium: "size-5 shrink-0",
	small: "size-[18px] shrink-0"
}, ia = {
	medium: "inline-flex items-center justify-center px-1 shrink-0",
	small: "inline-flex items-center justify-center px-0.5 shrink-0"
}, aa = {
	primary: "bg-button-primary text-text-white shadow-xs",
	secondary: "bg-background-primary-default text-text-primary border border-border-button-default shadow-xs",
	ghost: "bg-button-ghost-background text-button-ghost-foreground"
}, oa = (e, t) => `<svg class="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><use href="#i-${e}"/></svg>`;
function H({ variant: e = "primary", size: t = "medium", glyph: n, label: r, attrs: i = "", compact: a = !1 }) {
	let o = r ? ta[t] : na[t], s = n ? oa(n, ra[t]) : "", c = r ? `<span class="${ia[t]}"${a ? " data-compact-label" : ""}>${r}</span>` : "";
	return `<button type="button" class="${ea} ${o} ${aa[e]}"${i ? ` ${i}` : ""}>${s}${c}</button>`;
}
var sa = {
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
function ca(e, { size: t = "md", className: n = "", attrs: r = "" } = {}) {
	let i = sa[t];
	return `<div class="group flex flex-col${n ? ` ${n}` : ""}"><button type="button" aria-haspopup="listbox"${r ? ` ${r}` : ""} class="flex w-full items-center justify-between rounded-2lg border border-border-button-default bg-background-primary-default shadow-xs text-text-primary ${i.box}"><span class="flex min-w-0 items-center truncate ${i.value}">${e}</span>${oa("chevron-down", `shrink-0 text-text-secondary ${i.chevron}`)}</button></div>`;
}
var la = "flex items-end justify-between gap-4 rounded-surface bg-background-secondary-default px-6 py-5 max-compact:flex-col max-compact:items-start max-compact:gap-3 max-compact:p-4 dark:bg-background-primary-default", ua = "flex min-w-0 flex-col gap-2", da = "text-body-regular text-text-secondary", fa = "text-display-4-medium tabular-nums text-text-primary", pa = "relative inline-block h-8 w-24 rounded-2lg align-middle skeleton-sheen";
function ma(e) {
	return `<div data-collection-summary="" class="${la}"><div class="${ua}"><span class="${da}">${e}</span><strong class="${fa}"><span data-skeleton="count" aria-hidden="true" class="${pa}"></span></strong></div></div>`;
}
//#endregion
//#region src/configuration-copy.ts
var ha = "JavDB 或 MISSAV 无法访问时，可填写能访问的镜像域名，Peach 会保留人物页路径。 资料页只显示已有站点身份记录的入口；JavDB 和 MISSAV 还要求有 JAV 目录站记录。 缺少这些记录的 FC2 创作者不会显示这两个入口。", ga = "仅填域名；留空使用默认地址", _a = (e, t) => `<section aria-label="${e}" class="flex w-full flex-col gap-2"><p class="w-full px-3 text-body-2-medium text-text-secondary">${e}</p><div class="flex w-full flex-col rounded-2xl bg-background-secondary-default pl-3">${t}<div class="-ml-3 flex flex-wrap items-center justify-end gap-3 rounded-b-2xl border-t border-separator-border bg-card-footer px-3 py-3">${H({
	label: "保存配置",
	attrs: "disabled data-skeleton-action"
})}</div></div></section>`, va = (e, t = "") => `<div class="flex min-h-[52px] w-full items-center justify-between gap-4 py-2.5 pr-2.5 border-b border-separator-border last:border-b-0"><div class="flex min-w-0 flex-col"><p class="text-body-regular text-text-primary">${e}</p>${t ? `<p class="text-body-2-regular text-text-secondary">${t}</p>` : ""}</div><span class="skeleton configuration-skeleton-toggle"></span></div>`, ya = (e) => `<div class="flex w-full flex-col gap-1"><p class="text-body-medium text-text-primary">${e} 地址</p><span class="skeleton configuration-skeleton-input"></span><p class="pt-px text-caption-1-medium text-text-secondary">${ga}</p></div>`;
function ba() {
	return `<div class="peach-react"><div class="configpage">${`<div class="board-local-nav" data-section-nav data-section-items>${[
		"通用",
		"媒体",
		"网络与访问",
		"更新与维护"
	].map((e, t) => `<button type="button" tabindex="-1" aria-selected="${t === 0}">${e}</button>`).join("")}</div>`}<div class="flex flex-col gap-6">${_a("开机自启", `<div class="flex flex-col">${va("开机后启动 Peach")}${va("静默启动", "开机后只显示托盘图标，不打开网页；「开机后启动 Peach」打开时生效。")}${va("在桌面创建快捷方式", "双击图标打开 Peach 网页；卸载时一并移除。")}</div>`)}${_a("外部入口", `<div class="flex flex-col gap-4 py-4 pr-3"><p class="text-body-2-regular text-text-secondary">${ha}</p>${ya("JavDB")}${ya("MISSAV")}</div>`)}</div></div></div>`;
}
//#endregion
//#region src/management-skeletons.ts
var U = "relative overflow-hidden skeleton-sheen bg-background-tertiary-default rounded-lg", W = (e = "60%") => `<span class="${U} inline-block max-w-full align-middle" style="width:${e};height:1em"></span>`, xa = "disabled data-skeleton-action", Sa = "min-w-0 rounded-2-5xl bg-background-secondary-default p-5 flex flex-col gap-4 max-sm:p-4";
function Ca() {
	let e = [
		"馆藏视频",
		"看过",
		"内容标签",
		"使用空间"
	].map((e, t) => `
    <div class="min-w-0 rounded-2xl shadow-card flex flex-col overflow-hidden pt-4 text-left ${t === 0 ? "ring-2 ring-border-focus-ring bg-background-primary-default" : "bg-background-secondary-default"}">
      <span class="flex min-w-0 items-center gap-2 px-4 text-body-regular text-text-secondary max-sm:gap-1.5 max-sm:px-3"><i class="${U} size-7 max-sm:size-6"></i>${e}</span>
      <b class="px-4 pt-3 pb-4 text-title-1-medium max-sm:px-3 max-sm:pb-3">${W("4em")}</b>
      <small class="mt-auto block min-h-9.5 bg-card-footer px-4 py-2.5 text-caption-1-regular max-sm:px-3 max-sm:py-2">${W("6em")}</small>
    </div>`).join(""), t = (e) => `<section class="${Sa}" data-stats-chart>
    <header class="flex flex-wrap items-end justify-between gap-x-4 gap-y-1"><span class="flex min-w-0 flex-col gap-1"><h3 class="text-title-2-medium text-text-primary">${e}</h3><b class="text-display-4-medium">${W("4em")}</b></span><small class="text-caption-1-regular text-text-secondary">个视频</small></header>
    <svg class="h-75 w-full max-sm:h-65 text-background-tertiary-default" viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="12">${[
		76,
		54,
		32
	].map((e) => `<circle cx="100" cy="100" r="${e}"/>`).join("")}</svg>
    <div class="inline-grid w-full grid-cols-3 gap-2 max-sm:grid-cols-2">${Array.from({ length: 3 }, () => `<div class="flex min-w-0 flex-col gap-1 rounded-xl bg-background-tertiary-default p-2.5"><span class="text-caption-1-regular">${W()}</span><b class="text-title-2-medium">${W("3em")}</b><small class="text-caption-1-regular">${W()}</small></div>`).join("")}</div>
  </section>`;
	return `<div class="peach-react"><div class="mx-auto flex w-full max-w-board flex-col gap-8">
    <p class="text-caption-1-regular text-text-secondary">账本当前快照 · ${W("12em")}</p>
    <div class="flex flex-col gap-4"><div class="inline-grid w-full grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" data-stats-metrics>${e}</div>
      <div class="flex flex-col gap-5"><div class="inline-grid w-full gap-5 md:grid-cols-2">${t("网盘与本地")}${t("媒体库")}</div>
        <div class="inline-grid w-full gap-5 md:grid-cols-2 xl:grid-cols-3">${[
		"时长",
		"画质",
		"文件类型"
	].map((e) => `<section class="${Sa}"><h3 class="text-title-2-medium">${e}</h3><div class="${U} h-64"></div></section>`).join("")}</div>
      </div>
    </div>
    <section class="rounded-surface bg-background-secondary-default dark:bg-background-primary-default">
      <div class="flex flex-wrap gap-3 px-4 pt-3 text-body-regular">${[
		"内容标签",
		"最近看过",
		"标签来源"
	].map((e) => `<span>${e}</span>`).join("")}</div>
      <div class="flex flex-col gap-3 px-4 pt-3.5 pb-4">${Array.from({ length: 5 }, () => `<div class="${U} h-7"></div>`).join("")}</div>
    </section>
  </div></div>`;
}
function wa() {
	let e = `<div class="duplicate-row items-center gap-3 border-t border-separator-border px-5 py-4 max-compact:p-4">
    <span class="${U} row-span-2 inline-grid aspect-16/10 w-full rounded-2lg"></span>
    <span class="text-body-regular max-duplicate-narrow:col-start-2 max-duplicate-narrow:-col-end-1">${W("70%")}</span>
    ${Array.from({ length: 3 }, () => `<span class="font-mono text-caption-1-regular leading-5">${W("3em")}</span>`).join("")}
    <span class="col-start-2 -col-end-1 min-w-0 pt-0.5 font-mono text-caption-1-regular leading-5 max-duplicate-narrow:col-span-full">${W("75%")}</span>
  </div>`, t = `<section class="mb-6 overflow-hidden rounded-surface bg-background-secondary-default dark:bg-background-primary-default" data-duplicate-group>
    <div class="flex flex-wrap items-center gap-3 bg-background-tertiary-default p-5 max-compact:p-4 dark:bg-background-secondary-default">
      <b class="text-title-2-medium">${W("5em")}</b><span class="font-mono text-caption-1-regular leading-5">${W("8em")}</span>
      <span class="ml-auto flex flex-wrap gap-2 max-compact:ml-0 max-compact:w-full">${[
		"留最大",
		"留最长",
		"整组回收"
	].map((e) => H({
		variant: "secondary",
		size: "small",
		label: e,
		attrs: xa
	})).join("")}</span>
    </div>${e.repeat(2)}</section>`;
	return `<div class="peach-react"><div class="mx-auto w-full max-w-board pb-10.5">
    <div data-collection-summary class="mb-5 flex items-end justify-between gap-4 rounded-surface bg-background-secondary-default px-6 py-5 max-compact:flex-col max-compact:items-start max-compact:gap-3 max-compact:p-4 dark:bg-background-primary-default">
      <div class="flex min-w-0 flex-col gap-2"><span class="text-body-regular text-text-secondary">重复内容</span><strong class="text-display-4-medium">${W("4em")}</strong></div><p class="text-body-regular text-text-secondary">${W("12em")}</p>
    </div>
    <div data-filter-glass data-glass-pane class="mb-5.5 flex flex-wrap items-center gap-x-2.5 gap-y-2 px-4 py-2.5"><h3 class="mr-1 text-body-medium">批量保留</h3>${["全部保留最大", "全部保留最长"].map((e) => `<button ${xa} class="h-7.5 rounded-full border border-separator-border px-3 text-body-2-medium">${e}</button>`).join("")}</div>
    ${t.repeat(2)}
  </div></div>`;
}
function Ta() {
	let e = `<li class="min-w-0 bg-background-secondary-default rounded-2xl shadow-card border border-separator-border flex flex-col gap-3 p-3">
    <div class="flex min-w-0 gap-4"><span class="${U} inline-grid w-card-cover shrink-0 aspect-card-cover rounded-2lg"></span>
      <div class="flex min-w-0 flex-1 flex-col gap-1.5"><h3 class="text-headline-medium">${W("80%")}</h3><p class="text-body-2-regular">${W("60%")}</p></div>
    </div>
    <footer class="flex justify-end">${H({
		variant: "secondary",
		size: "small",
		label: "查看版本",
		attrs: xa
	})}</footer>
  </li>`;
	return `<div class="peach-react"><div class="mx-auto flex w-full max-w-board flex-col gap-8">
    ${ma("待升级")}
    <ul class="card-grid-cover gap-5">${e.repeat(6)}</ul>
  </div></div>`;
}
//#endregion
//#region src/board-skeleton.ts
var G = (e = "60%") => `<span class="skeleton" style="width:${e}"></span>`, K = () => `${G("80%")}${G("48%")}`, q = (e, t) => e.repeat(t), Ea = (e, t = "metricstrip") => `<div class="${t}">${e.map((e) => `<div class="tastesummary"><span class="board-stat-label">${e}</span><b class="board-stat-value">${G("45%")}</b><small class="board-stat-footer">${G("60%")}</small></div>`).join("")}</div>`, Da = (e, t) => `<div class="${t} skeleton-segments" data-board-segments="true">${e.map((e, t) => `<span${t === 0 ? " class=\"skeleton-segment-selected\"" : ""}>${e}</span>`).join("")}</div>`, Oa = (e) => `<section class="insightpanel"><header>${e}</header><div class="insightpanelbody skeleton-lines">${q(K(), 3)}</div></section>`, J = "disabled data-skeleton-action", Y = (e) => `<span class="skeleton skeleton-text" style="width:${e}"></span>`, X = (e, t, n = !1) => `<span class="skeleton" style="width:${e}px;height:${t}px;flex:none${n ? ";border-radius:50%" : ""}"></span>`, ka = "min-w-0 bg-background-secondary-default rounded-2xl shadow-card flex flex-col gap-3 px-6 py-5 max-sm:gap-2 max-sm:p-4", Aa = () => `<div class="inline-grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-6">${[
	"关注创作者",
	"启用来源",
	"检查失败",
	"未看更新",
	"JAV 订阅",
	"未看新作"
].map((e) => `<div class="${ka}"><span class="text-body-medium text-text-secondary">${e}</span><b class="text-title-1-medium tabular-nums text-text-primary">${Y("3em")}</b></div>`).join("")}</div>`, ja = () => `<div data-section-nav data-section-items class="flex max-w-full flex-nowrap overflow-x-auto">${[
	"关注列表",
	"添加关注",
	"JAV 订阅源",
	"想要",
	"来源和凭证"
].map((e, t) => `<span class="whitespace-nowrap" aria-selected="${t === 0}">${e}</span>`).join("")}</div>`, Ma = (e = "") => `<span class="group inline-flex items-center select-none gap-2"><span class="flex shrink-0 items-center justify-center rounded-sm size-4 border bg-background-primary-default shadow-xs border-border-checkbox-default"></span>${e ? `<span class="text-body-medium text-text-primary">${e}</span>` : ""}</span>`, Na = ({ table: e, sort: t, dir: n }) => {
	let r = Yi.find(([e]) => e === t)[1];
	return `<div class="flex flex-wrap items-center gap-2 follow-skeleton-toolbar"><h3 class="mr-auto text-title-2-medium text-text-primary">关注列表</h3><span class="text-body-2-regular text-text-secondary">${Y("132px")}</span>${H({
		glyph: "refresh-cw",
		label: "检查全部",
		compact: !0,
		attrs: J
	})}<span data-button-group role="group">${H({
		variant: "ghost",
		glyph: "layout-grid",
		attrs: `aria-pressed="${!e}"`
	})}${H({
		variant: "ghost",
		glyph: "table",
		attrs: `aria-pressed="${e}"`
	})}</span>${ca(r)}${H({
		variant: "secondary",
		glyph: n === "asc" ? "arrow-up" : "arrow-down"
	})}${e ? "" : H({
		variant: "secondary",
		glyph: "chevron-up",
		label: "全部收起",
		compact: !0,
		attrs: J
	})}</div>`;
}, Pa = () => `<span class="flex shrink-0 items-center gap-1">${H({
	variant: "secondary",
	size: "small",
	glyph: "refresh-cw",
	attrs: J
})}${H({
	variant: "secondary",
	size: "small",
	glyph: "trash",
	attrs: J
})}</span>`, Fa = () => `<div class="flex min-h-16 flex-wrap items-center gap-3 px-2 py-3 follow-skeleton-source">${Ma()}<span class="flex min-w-0 grow flex-col gap-0.5"><span class="text-body-medium">${Y("8em")}</span></span><span class="flex shrink-0 items-center gap-1.5">${X(14, 14)}</span>${X(48, 24)}<span class="shrink-0 text-body-2-regular whitespace-nowrap text-text-secondary">${Y("113px")}</span>${Pa()}</div>`, Ia = (e) => `<section class="min-w-0 bg-background-primary-default rounded-2xl shadow-card flex flex-col overflow-hidden p-2 follow-skeleton-author"><div class="flex flex-wrap items-center gap-3 px-2 py-2.5" data-follow-author-header data-open>${X(32, 32, !0)}<b class="min-w-0 grow text-body-medium break-words text-text-primary">${Y("92px")}</b>${H({
	variant: "secondary",
	size: "small",
	glyph: "refresh-cw",
	attrs: J
})}<span class="flex shrink-0 items-center gap-1">${X(14, 14)}${X(14, 14)}</span>${H({
	variant: "secondary",
	size: "small",
	glyph: "check-check",
	label: "全选",
	attrs: J
})}${H({
	variant: "secondary",
	size: "small",
	glyph: "chevron-up",
	label: "收起",
	attrs: J
})}</div><div data-source-divider>${q(Fa(), e)}</div></section>`, La = () => {
	try {
		return Number(JSON.parse(localStorage.getItem("peach.settings.v1") || "{}").followPageSize) || 20;
	} catch {
		return 20;
	}
}, Ra = [
	["select", ""],
	["author", "创作者"],
	["source", "来源"],
	["provider", "站点"],
	["status", "状态"],
	["checked", "上次检查"],
	["actions", ""]
], za = {
	name: "author",
	source: "source",
	provider: "provider",
	status: "status",
	checked: "checked"
}, Ba = "<svg viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\"><path d=\"M12.7071 15.2929C12.3166 15.6834 11.6834 15.6834 11.2929 15.2929L7.70711 11.7071C7.07714 11.0771 7.52331 10 8.41421 10H15.5858C16.4767 10 16.9229 11.0771 16.2929 11.7071L12.7071 15.2929Z\" fill=\"currentColor\"/></svg>", Va = (e, { sort: t, dir: n }) => `<div data-board-data-table data-follow-table class="follow-skeleton-table"><div class="w-full overflow-x-auto"><table class="bui-table bui-table-sm"><thead><tr>${Ra.map(([e, r]) => r ? `<th><span class="flex items-center gap-0.5">${r}<span data-sort-indicator${za[t] === e ? ` data-direction="${n === "asc" ? "ascending" : "descending"}"` : ""}>${Ba}</span></span></th>` : "<th></th>").join("")}</tr></thead><tbody>${q(`<tr>${[
	Ma(),
	`<span class="flex min-w-0 items-center gap-2">${X(32, 32, !0)}${Y("5em")}</span>`,
	Y("10em"),
	`<span class="flex items-center gap-1.5">${X(14, 14)}${Y("4em")}</span>`,
	X(48, 24),
	Y("113px"),
	Pa()
].map((e) => `<td>${e}</td>`).join("")}</tr>`, e)}</tbody></table></div></div>`, Ha = (e, t) => `<div class="flex flex-wrap items-center justify-between gap-3"><span class="text-body-2-regular text-text-secondary">${Y("111px")}</span>${ca(`每页 ${t} ${e ? "条" : "位"}`, { size: "sm" })}${X(204, 32)}</div>`, Ua = (e) => {
	let t = e.followLayout === "table", n = $i(e.followSort, e.followDir), r = e.followPageSize || La(), i = t ? Va(r, n) : `${Ma("全选本页")}<div class="flex flex-col gap-3">${Ia(3)}${Ia(4)}${Ia(3)}</div>`;
	return `<div class="peach-react"><div class="mx-auto flex w-full max-w-board flex-col gap-8">${Aa()}<div class="flex flex-col gap-6">${ja()}<div class="flex flex-col gap-4"><div class="min-w-0 bg-background-secondary-default rounded-2xl shadow-card flex flex-col gap-4 px-6 py-5 max-sm:px-4 follow-skeleton-surface" data-layout="${t ? "table" : "default"}">${Na({
		table: t,
		...n
	})}${i}${Ha(t, r)}</div></div></div></div></div>`;
};
function Wa() {
	return `<div data-stage-grid="" aria-hidden="true"><div data-stage-media="" class="skeleton-detail-media skeleton"></div><aside data-stage-side=""><div data-stage-side-content="" class="skeleton-lines">${G("85%")}${G("65%")}${q(K(), 4)}</div></aside></div>`;
}
function Ga() {
	return `<div data-skeleton="detail" role="status" aria-label="正在读取作品详情">${Wa()}</div>`;
}
function Ka(e, t = {}) {
	let n = "";
	if (e === "/stats") n = Ca();
	else if (e === "/taste") n = `<div class="tastepage"><header class="tastehead">${Da(["浏览器记录", "Peach 内部"], "insightswitch")}${G("24%")}</header><div class="tastestate"></div>${Ea([
		"浏览记录",
		"口味维度",
		"浏览候选",
		"私有导出"
	], "tastesummaries")}<section class="tastehero"><div class="insightcopy"><span>浏览器画像</span><div class="skeleton skeleton-radar"></div></div><div class="tastebars skeleton-lines">${q(K(), 4)}</div></section>${Oa("口味分析")}<div class="board-activity-charts">${Oa("浏览活动")}${Oa("时间分布")}</div>${Oa("标签")}</div>`;
	else if (e === "/follow-manage") n = Ua(t);
	else if (e === "/configuration") n = ba();
	else if (e === "/activity") n = `<div class="activitypage">${[
		"正在进行",
		"被挡下的",
		"最近完成"
	].map((e) => `<section class="activitysection"><h3 class="geist-fieldset-title">${e}</h3><div class="activity-runs"><article class="cleanupfieldset activity-run"><div class="geist-fieldset-content skeleton-lines">${G("35%")}${K()}</div></article></div></section>`).join("")}</div>`;
	else if (e === "/duplicates") n = wa();
	else if (e === "/quality-goals") n = Ta();
	else if (e === "/playlists") n = `<section class="playlistpage"><header><div><h2>播放列表</h2><p>保存 Mix，按自己的顺序继续播放。</p></div><div class="playlistcreate skeleton-lines"><span>新播放列表</span>${G("200px")}</div></header><div class="playlistcards">${q(`<article class="card playlistcard"><div class="mixstack"><div class="pic skeleton"></div></div><div class="mixmeta"><span class="mav skeleton"></span><div class="mixcopy skeleton-lines">${K()}</div></div></article>`, 6)}</div></section>`;
	else return "";
	return `<div class="board-page-skeleton" data-skeleton="board${e}" role="status" aria-label="正在读取页面"><div aria-hidden="true" inert>${n}</div></div>`;
}
//#endregion
//#region src/catalog-onboarding.ts
var qa = [
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
async function Ja(e, t) {
	let n = new URLSearchParams();
	for (let t of qa) e[t] && n.set(t, e[t]);
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
function Ya({ kind: e = "catalog", filtered: t = !1, jav: n = !1, configurable: r = !1, online: i = !1 } = {}) {
	let a = r ? "<button class=\"geist-button primary\" data-empty-settings>添加内容</button>" : "", o = "<a class=\"geist-button" + (!r || i ? " primary" : "") + "\" href=\"/follow-manage?tab=add\">添加关注</a>";
	if (t || n) return _("search", n ? "还没有符合条件的 JAV 作品" : "没有符合条件的内容", n ? "已扫描但尚未补充发行资料的视频可在全部内容中查看。" : "清除筛选或搜索条件后查看全部内容。", { actions: "<a class=\"geist-button primary\" href=\"/?loc=&thumb=0\">查看全部内容</a>" });
	if (e !== "catalog") {
		let t = (i ? {
			tags: "标签",
			performers: "创作者"
		}[e] : "") || {
			tags: "标签",
			performers: "艺人",
			creators: "创作者",
			studios: "厂牌",
			agencies: "事务所",
			series: "系列"
		}[e] || "资料";
		return _(e === "tags" ? "tags" : "user-round", "还没有" + t, i ? "添加关注来源并获取内容后，这里会显示来源上的" + t + "。" : "添加内容并补充资料后，这里会显示对应信息。", { actions: i ? o : a + o });
	}
	return _("play", "还没有视频", "添加媒体文件夹或关注来源，开始建立你的馆藏。", { actions: a + o });
}
//#endregion
//#region src/catalog-filter-skeleton.ts
var Xa = 64, Za = (e) => e.replace(/[&<>"]/g, (e) => ({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;"
})[e]), Qa = (e) => e.repeat(Xa);
function $a(e, t) {
	let n = e.map((e) => `<a href="${Za(e.href)}" data-catalog-view="${Za(e.k)}" data-entity-press="" aria-pressed="${t === e.k}">${Za(e.label)}</a>`).join("");
	return "<div class=\"peach-react\"><div class=\"contents\" data-catalog-root=\"\" data-loading=\"\"><div data-catalog-tiers=\"\" aria-busy=\"true\"><div data-catalog-tier=\"performers\" data-skeleton=\"tiers\">" + Qa("<span data-catalog-placeholder=\"performer\" aria-hidden=\"true\"><span></span><span>&nbsp;</span></span>") + "</div><div data-catalog-tier=\"studios\">" + Qa("<span data-catalog-placeholder=\"studio\" aria-hidden=\"true\"><span></span><span>&nbsp;</span></span>") + `</div></div><div role="group" aria-label="筛选与排序" data-filter-glass="" data-glass-pane="" data-filter-frame="" data-catalog-frame="" class="sticky top-topbar z-10 mb-5.5 flex flex-col mx-4"><div role="group" aria-label="视图与标签" data-filter-row="top" class="flex h-12 min-w-0 items-center overscroll-x-contain px-3 py-2 gap-1.5 overflow-visible"><div data-catalog-scroll=""><div role="group" aria-label="视图" data-catalog-views="">${n}<span data-entity-sep="" aria-hidden="true"></span></div><div data-catalog-tags=""><span data-catalog-placeholder="tag" aria-hidden="true">` + "<span></span>".repeat(Xa) + "</span></div></div></div><div data-filter-row=\"bottom\" aria-busy=\"true\" class=\"flex min-w-0 items-center gap-3 px-3 py-2 min-h-12\"><span data-catalog-readout=\"\"><span data-skeleton=\"count\" aria-hidden=\"true\" class=\"relative inline-block h-3.5 w-37.5 rounded-md align-middle skeleton-sheen\"></span></span></div></div></div></div>";
}
//#endregion
//#region src/catalog-bars.ts
var eo = 3e4, Z = 0, to = (e, t = Z) => [
	"facets",
	e,
	t
], no = (e, t, n = Z) => [
	"tops",
	e,
	t,
	n
], ro = (e, t = Z) => [
	"tops",
	e,
	t
];
async function io(t) {
	let n = String(t), r = await e(`/api/tops?${n}`), i = new URLSearchParams(n);
	return r.performers.length || r.studios.length || !i.has("state") ? r : (i.delete("state"), await e(`/api/tops?${i}`));
}
function ao(t, n) {
	return Promise.all([I.fetchQuery({
		queryKey: to(t),
		queryFn: () => e(`/api/facets${t ? `?${t}` : ""}`),
		staleTime: eo
	}), I.fetchQuery({
		queryKey: no(n, t),
		queryFn: () => io(n),
		staleTime: eo
	})]);
}
function oo(e) {
	return I.fetchQuery({
		queryKey: ro(e),
		queryFn: () => io(e),
		staleTime: eo
	});
}
function so() {
	Z += 1;
	let e = (e) => e.state.fetchStatus === "idle";
	I.removeQueries({
		queryKey: ["facets"],
		predicate: e
	}), I.removeQueries({
		queryKey: ["tops"],
		predicate: e
	});
}
//#endregion
//#region src/management.ts
var co = "扫描媒体文件夹，导入已有资料，采集缺失信息。两段也可以分开跑：新盘刚接上时先只扫描，几万个文件登记完就能用；采集被网络拖住时只重跑采集，不必再扫一遍磁盘。", lo = "修缺时间戳表（播放卡顿）和缺索引（打不开）的 MP4。常看的片子先修。", Q = "<span class=\"skeleton skeleton-text\" aria-hidden=\"true\"></span>", uo = "type=\"button\" disabled data-skeleton-action", fo = "disabled data-skeleton-action", po = "aria-disabled=\"true\"", mo = (e) => `<div class="peach-react"><div class="flex flex-col gap-4">${e}</div></div>`, ho = (e, t) => `<div data-geist-fieldset-content>
          <h3 class="text-title-2-medium text-text-primary">${e}</h3>
          <p class="text-body-2-regular text-text-secondary">${t}</p></div>`;
function go() {
	return mo(`<section aria-label="扫描与采集" data-geist-fieldset data-cleanup-task data-cleanup-processing data-fieldset-stack>
        ${ho("扫描与采集", co)}
        <footer data-geist-fieldset-footer><a href="/scraping" class="inline-flex items-center justify-center gap-1 whitespace-nowrap font-sans rounded-sm text-body-medium text-accent-600"><span>来源和凭证</span>${oa("arrow-up", "size-[18px] shrink-0 rotate-90")}</a><span data-button-group data-split-button data-variant="primary">${H({
		glyph: "database",
		label: "扫描并补全资料",
		attrs: fo
	})}${H({
		glyph: "chevron-down",
		attrs: `${fo} aria-label="更多扫描与采集方式"`
	})}</span></footer>
      </section>`);
}
function _o() {
	return mo(`<section aria-label="媒体修复" data-geist-fieldset data-cleanup-task data-cleanup-processing>
        ${ho("媒体修复", lo)}
        <footer data-geist-fieldset-footer>${ca(Q, {
		className: "w-48",
		attrs: po
	})}${H({
		label: "开始修复",
		attrs: fo
	})}</footer>
      </section>`);
}
function vo() {
	let e = [
		["人工复核", "square-check-big"],
		["高清版", "sparkles"],
		["重复文件", "file-stack"],
		["垃圾文件", "file-archive"],
		["回收站", "trash"]
	], t = `<span class="geist-button organize-preset-skeleton">${Q}</span>`.repeat(3), r = (e) => `<div class="organizefield"><span>${e}</span>
            <span class="geist-input organize-input-skeleton">${Q}</span></div>`;
	return `<div class="cleanuppage" data-skeleton="cleanup" aria-busy="true" aria-label="正在读取数据管理状态">
    <div class="cleanupstats">${e.map(([e, t]) => `
      <button type="button" class="board-plain-stat" disabled>
        <span class="board-plain-stat-head"><span class="board-stat-tile">${n(t)}</span>${e}</span>
        <strong>${Q}</strong><span class="cleanupmeta">${Q}</span></button>`).join("")}</div>
    <div class="cleanupgrid">
      <div class="cleanupscraping">${go()}</div>
      <div class="cleanupmediarepair">${_o()}</div>
      <section class="cleanupfieldset cleanuporganize" data-geist-fieldset data-cleanup-task aria-labelledby="cleanup-loading-organize">
        <div class="geist-fieldset-content"><h3 class="geist-fieldset-title" id="cleanup-loading-organize">整理</h3>
          <p>按模板给文件改名并归入目录。先预览，确认后执行；执行过的一批可以整批退回。</p>
          <div class="organizefields">
            <div class="organizesource"><span class="gselect"><span class="gselectfield organize-source-skeleton">${Q}${n("chevron-down")}</span></span></div>
            ${r("文件名模板")}
            ${r("目录模板")}
            <div class="organizepresets">${t}</div>
            <p class="cleanupmeta">${Q}</p>
          </div></div>
        <footer class="geist-fieldset-footer" data-geist-fieldset-footer><button class="geist-button primary" ${uo}>预览</button></footer>
      </section></div>
    <section class="resourcesync" aria-labelledby="cleanup-loading-links">
      <h2 id="cleanup-loading-links">链接管理</h2>
      <div class="resourcesyncbox" data-geist-fieldset data-cleanup-task data-fieldset-stack>
        <div class="resourcesyncbody geist-fieldset-content"><h3 class="geist-fieldset-title">站外链接</h3>
          <div class="linksummary"><div class="linkstats"><div><span>链接总数</span><b>${Q}</b><small>${Q}</small></div>${[
		"官网/事务所",
		"社交账号",
		"作品资料站"
	].map((e) => `<div><span>${e}</span><b>${Q}</b></div>`).join("")}</div>
          <div class="linkhosts"><span>主要站点</span><b>${Q}</b></div></div></div>
        <div class="resourcesyncfooter geist-fieldset-footer" data-geist-fieldset-footer><button class="resourceaction primary" ${uo}>${n("unlink")}<span>检查死链</span></button></div>
      </div></section>
    <section class="resourcesync" aria-labelledby="cleanup-loading-sync">
      <h2 id="cleanup-loading-sync">资源同步</h2>
      <div class="resourcesyncbox" data-geist-fieldset data-cleanup-task>
        <div class="resourcesyncbody geist-fieldset-content"><h3 class="geist-fieldset-title">文件与记录核对</h3>
          <p>按馆藏记录逐条查找本地磁盘与网盘上的文件，列出文件已不存在的记录、空文件夹，以及不再被引用的缓存。</p></div>
        <div class="resourcesyncfooter geist-fieldset-footer" data-geist-fieldset-footer><button class="resourceaction primary" ${uo}>${n("git-compare")}<span>检查文件</span></button></div>
      </div></section></div>`;
}
//#endregion
//#region src/junk-queue.ts
var yo = [
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
], bo = (e) => yo.find(([t]) => t === e)?.[0] ?? "";
function xo(e) {
	let t = new URLSearchParams(e);
	return {
		kind: bo(t.get("type")),
		view: t.get("view") === "dismissed" ? "dismissed" : "pending"
	};
}
function So(e = "", t = "pending") {
	let n = new URLSearchParams();
	e && n.set("type", e), t === "dismissed" && n.set("view", "dismissed");
	let r = n.toString();
	return `/junk-files${r ? `?${r}` : ""}`;
}
function Co(e) {
	return e === "dismissed" ? {
		view: "pending",
		label: "返回待判断",
		glyph: "rotate-ccw",
		href: So("", "pending")
	} : {
		view: "dismissed",
		label: "已排除",
		glyph: "eye-off",
		href: So("", "dismissed")
	};
}
var wo = (e) => e === "dismissed" ? "已排除" : "待判断", To = (e) => `<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${e}"></use></svg>`;
function Eo({ kind: e, view: n }) {
	let r = yo.map(([r, i, a]) => `<a href="${So(r, n)}" data-junk-kind-link="${r}"${r === e ? " aria-current=\"page\"" : ""}>${To(a)}${t(i)}</a>`).join(""), i = Co(n);
	return `<div class="peach-react" data-junk-count-skeleton=""><div data-junk-count=""><div data-junk-summary="" aria-live="polite">${ma(wo(n))}</div><div data-junk-filters-frame="" data-filter-glass="" data-glass-pane=""><span data-view-glide="" aria-hidden="true" hidden></span><nav data-junk-filters="" aria-label="垃圾文件分类">${r}<i data-junk-divider="" aria-hidden="true"></i><a href="${i.href}" data-junk-view-link="${i.view}"${n === "dismissed" ? " aria-current=\"page\"" : ""}>${To(i.glyph)}${i.label}</a></nav></div></div></div>`;
}
//#endregion
//#region src/player/controls.ts
function Do(e, t) {
	e?.closest(".video-js")?.querySelector(`.vjs-control-bar ${t}`)?.click();
}
//#endregion
//#region src/player/playback.ts
function Oo(e) {
	e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
}
function ko(e, t) {
	let n = e.duration, r = (e.currentTime || 0) + t;
	e.currentTime = Number.isFinite(n) ? Math.max(0, Math.min(n, r)) : Math.max(0, r);
}
//#endregion
//#region src/islands.ts
var Ao = {
	"catalog-filter": { react: "catalog-filter" },
	"catalog-grid": { react: "catalog-grid" },
	"data-cleanup": { react: "data-cleanup" },
	duplicates: { react: "duplicates" },
	"entity-page": { react: "entity-page" },
	"feed-new": { react: "feed-new" },
	"follow-feed": { react: "follow-feed" },
	"follow-manage": { react: "follow-manage" },
	index: { react: "index" },
	"junk-queue": { react: "junk-queue" },
	"library-processing": { react: "library-processing" },
	playlists: { react: "playlists" },
	scraping: { react: "scraping" },
	"quality-goals": { react: "quality-goals" },
	review: { react: "review" },
	search: { react: "search" },
	configuration: { react: "configuration" },
	activity: { react: "activity" },
	stats: { react: "stats" },
	taste: { react: "taste" }
}, jo = () => import("/dist/peach-react.js").then(() => void 0), Mo = () => Object.keys(Ao), $ = /* @__PURE__ */ new Map();
async function No(e, t, n, r = {}) {
	let i = Ao[e];
	if (!i) throw Error(`未注册的 island：${String(e)}`);
	Lo(t);
	let a = { controller: new AbortController() };
	$.set(t, a);
	let o = (await import("/dist/peach-react.js")).pages[i.react];
	try {
		await o.prefetch(n, a.controller.signal);
	} catch {
		if (a.controller.signal.aborted) return;
	}
	if (!Fo(t, a, r)) return;
	let s = () => {
		t.textContent = "";
		let e = t.ownerDocument.createElement("div");
		e.className = "peach-react", t.append(e);
		let r = o.mount(e, n);
		a.dispose = () => {
			r.unmount(), e.remove();
		}, a.props = n, a.update = (e) => r.update(e);
	};
	r.reveal ? r.reveal(t, s) : s();
}
function Po(e, t) {
	let n = e ? $.get(e) : void 0;
	!n?.update || !n.props || (n.props = {
		...n.props,
		...t
	}, n.update(n.props));
}
function Fo(e, t, n) {
	return $.get(e) === t ? n.isCurrent && !n.isCurrent() ? ($.delete(e), !1) : !0 : !1;
}
var Io = (e) => !!e && $.has(e);
function Lo(e) {
	for (let t of [...$.keys()]) (t === e || e.contains(t)) && Ro(t);
}
function Ro(e) {
	let t = $.get(e);
	t && (t.controller.abort(), $.delete(e), t.dispose?.());
}
var zo = null;
function Bo(e, t, n, r) {
	zo ??= import("/dist/peach-react.js").then((n) => (n.mountToaster(e, t), n)), zo.then((e) => e.showToast(n, r));
}
var Vo = null, Ho = null;
function Uo(e) {
	return Vo ??= import("/dist/peach-react.js").then((t) => (Ho = t.configureStage(e), Ho)), Vo;
}
var Wo = () => Ho, Go = null, Ko = null;
function qo(e) {
	return Go ??= import("/dist/peach-react.js").then((t) => (Ko = t.configureSettingsPanel(e), Ko)), Go;
}
var Jo = () => Ko, Yo = null, Xo = null;
function Zo(e) {
	return Yo ??= import("/dist/peach-react.js").then((t) => (Xo = t.configureImmerse(e), Xo)), Yo;
}
var Qo = () => Xo, $o = null, es = null;
function ts(e) {
	return $o ??= import("/dist/peach-react.js").then((t) => (es = t.configureSidebar(e), es)), $o;
}
var ns = () => es, rs = null, is = null;
function as(e) {
	return rs ??= import("/dist/peach-react.js").then((t) => (is = t.configureManageHeader(e), is)), rs;
}
var os = () => is, ss = null, cs = null;
function ls(e) {
	return ss ??= import("/dist/peach-react.js").then((t) => (cs = t.configureBatchDock(e), cs)), ss;
}
var us = () => cs, ds = null;
function fs(e) {
	return ds ??= import("/dist/peach-react.js").then((t) => t.configureGlowPicker(e)), ds;
}
//#endregion
export { wt as ACCENT_CHOICES, qe as COVER_FRONT_RATIO, F as CancelledError, Ne as DEFAULT_SETTINGS, xe as DEFAULT_SIDEBAR_ORDER, Ur as FACE_CEILING, Vr as FACE_TARGET, Me as FEED_COMPILATION_KEYS, Ae as FOLLOW_INITIAL_DAYS, Pn as InfiniteQueryObserver, We as JAV_LAYOUTS, ae as JAV_RELEASE_SORT, je as METADATA_REFRESH_DAYS, Hr as MIN_FACE_PX, Fn as Mutation, Ln as MutationCache, zn as MutationObserver, Ke as PHOTO_LAYOUTS, Ge as PHOTO_SIZES, Vn as QueriesObserver, wn as Query, Hn as QueryCache, Un as QueryClient, On as QueryObserver, Oe as SETTINGS_KEY, ie as SORTS, ce as SORT_ALIASES, se as SORT_DIR_WORDS, oe as SORT_KEYS, ke as THEME_CHOICES, Re as THEME_OPTIONS, ut as TILES, Zr as advanceImageFallback, S as allowedSetting, w as appSettingsStore, xt as applyAccent, mt as applyDensity, bt as applyGlassFaces, yt as applyHomeGlow, Ie as applySyncedSettings, Ve as applyTheme, z as avatarFrame, ui as avatarInner, us as batchDockApi, Ka as boardPageSkeleton, vi as cardArtwork, Si as cardIdentity, Xe as cardLayoutFor, rt as cardRatio, Ya as catalogEmptyHtml, $a as catalogFilterSkeletonHtml, Ja as catalogSuggestions, Et as chooseAccent, Tt as chooseGlowPreset, zr as clampPage, vo as cleanupSkeletonHtml, Do as clickPlayerControl, Ui as configureHoverPreview, Ei as coverAnchor, Oi as coverBackdrop, ji as coverFace, hi as coverImage, Ai as coverRatio, ai as coverUrl, dt as currentDensity, Kn as dataTagErrorSymbol, Gn as dataTagSymbol, fn as defaultScheduler, cn as defaultShouldDehydrateMutation, ln as defaultShouldDehydrateQuery, ue as defaultSortDir, un as dehydrate, sn as dehydrateQuery, xi as detailPosterUrl, Ga as detailSkeletonHtml, so as dropBars, di as entityAvatar, li as entityFaceImg, Ji as entitySkeletonHtml, tn as environmentManager, Wn as experimental_streamedQuery, mi as faceBoxAttrs, Kr as faceFrame, fi as faceOrigin, pi as facePos, $r as faceSourceScale, Gr as faceZoom, ao as fetchBars, oo as fetchTopsPage, Li as fitNativeImage, nn as focusManager, Mr as followJobProgress, Ii as frameCachedImages, Ct as glowChips, nt as gridLayout, Wr as hasFaceBox, k as hashKey, Ye as homeLayout, dn as hydrate, Xr as imageFallbackAttrs, Qo as immerseApi, fr as initBoardControls, Vi as installCardArt, gn as isCancelledError, Mt as isServer, Io as islandMounted, Mo as islandNames, _i as javArtwork, he as javImageKind, Je as javLayout, Ar as jobActivityHtml, Eo as junkCountSkeletonHtml, So as junkPath, xo as junkRoute, Kt as keepPreviousData, ls as loadBatchDock, fs as loadGlowPicker, Zo as loadImmerse, as as loadManageHeader, qo as loadSettingsPanel, ts as loadSidebar, Uo as loadStage, oi as logoUrl, os as manageHeaderApi, Dr as manageHeaderSkeletonHtml, wr as manageHeaderView, Lt as matchMutation, It as matchQuery, yi as mixFace, wi as mixLabel, No as mountIsland, ei as nativeImageFit, de as nextSortState, D as noop, Pe as normalizeAppSettings, me as normalizeJavImage, b as normalizeJavLayout, pe as normalizeJavPreferences, Te as normalizeSidebarOrder, N as notifyManager, P as onlineManager, Rr as pageCount, Br as paginationHtml, Ot as paintGlowButton, _t as paintHomeGlowNow, gt as paintPhotoSizeButton, _e as panelFrame, Yr as parseFallbacks, A as partialMatchKey, lr as peachHistory, ci as performerLabel, et as photoLayout, $e as photoSize, Le as postSearchHistoryLimit, Di as posterPanel, fe as preferredDirection, jo as preloadIslands, I as queryClient, Ci as queueAvatarHtml, bi as queueThumbHtml, Fe as readAppSettings, Ri as refitNativeImages, zi as relayoutCovers, ye as relayoutJavImages, Ki as releaseHover, Gi as releaseHoverPreviews, ni as rememberRepresentatives, Bt as replaceEqualDeep, ri as representativeOf, Dt as resetGlowColors, ko as seekVideoBy, Fr as selectGroup, Nr as selectRange, Pr as selectionSummary, V as setHoverState, Jo as settingsPanelApi, Fi as settleImage, ur as shellNavigate, Zt as shouldThrowError, Bo as showToast, ns as sidebarApi, Ee as sidebarHasCatalogContent, br as sidebarSkeletonHtml, De as sidebarTagCounts, Yt as skipToken, le as sortDirWord, Wo as stageApi, it as storeHomeLayout, at as storeJavLayout, ct as storePhotoLayout, st as storePhotoSize, ot as storeVideoLayout, dr as syncBoardRange, ve as syncJavImages, Ir as syncSelectionToolbar, E as timeoutManager, ht as toggleDensity, Oo as toggleVideoPlayback, vr as transitionTheme, Lo as unmountIsland, qn as unsetMarker, Po as updateIsland, ki as upgradeCover, jr as watchJob, Pi as watchPendingImages, Ue as watchSystemTheme, kt as wireGlowButton, qi as wireHover, Qr as wireImageFallbacks, ii as withVersion };
