import { api as e, esc as t, icon as n } from "/js/core.js";
import { DEFAULT_ACCENT as r, DEFAULT_HOME_GLOW as i, normalizeAccent as a, normalizeHomeGlow as o } from "/js/home-glow.js";
import { SKELETON_REVEAL_DELAY as s, emptyStateHtml as c, iconSwapHtml as l, loadingDotsHtml as u, moveGlidePane as d, noteHtml as f, scrollMovesAnchor as p, setIconSwap as m } from "/js/ui-components.js";
//#region src/sort-preferences.ts
var h = [
	["seed", "随机"],
	["rating", "评分"],
	["o", "高潮计数"],
	["plays", "观看次数"],
	["dur", "时长"],
	["size", "体积"],
	["new", "入库时间"],
	["played", "观看时间"]
], g = ["release", "发行时间"], _ = [...h, g].map(([e]) => e), v = {
	rating: ["从高到低", "从低到高"],
	o: ["从多到少", "从少到多"],
	plays: ["从多到少", "从少到多"],
	dur: ["从长到短", "从短到长"],
	size: ["从大到小", "从小到大"],
	new: ["从新到旧", "从旧到新"],
	played: ["从近到远", "从远到近"],
	release: ["从新到旧", "从旧到新"]
}, y = {
	big: ["size", "desc"],
	short: ["dur", "asc"],
	long: ["dur", "desc"]
}, ee = (e, t, n = v) => (n[e] || [])[+(t === "asc")] || "", b = (e, t = v) => t[e] ? "desc" : "";
function te(e, t, n, r = v) {
	return e === t ? r[e] ? {
		sort: e,
		dir: n === "asc" ? "desc" : "asc"
	} : null : {
		sort: e,
		dir: b(e, r)
	};
}
function ne(e, t, n) {
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
function re(e) {
	return {
		javLayout: x(e.javLayout),
		javImage: S(e.javLayout === "preview" ? "thumbnail" : e.javImage)
	};
}
function S(e) {
	return e === "thumbnail" ? "thumbnail" : "cover";
}
function ie(e, t) {
	return e.is_jav && e.code && e.has_cover && (S(t) === "cover" || !e.has_thumb) ? "cover" : e.has_thumb ? "thumbnail" : "";
}
var ae = .704;
function oe(e, t) {
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
function se(e, t) {
	e.querySelectorAll("img[data-jav-image]").forEach((e) => {
		let n = e.dataset.javCover || "", r = e.dataset.javThumb || "", i = !!(n && (S(t) === "cover" || !r)), a = i ? n : r;
		e.classList.toggle("cover", i), e.classList.toggle("whole", i && e.dataset.javImageLayout !== "big"), e.classList.toggle("front", i && e.dataset.javImageLayout === "big"), e.classList.remove("panel"), e.removeAttribute("style"), e.closest(".pic,[data-media-pic]")?.style.removeProperty("--cover-blur"), a && e.getAttribute("src") !== a && (e.src = a);
	});
}
function ce(e, t) {
	let n = [];
	return e.querySelectorAll("img[data-jav-image]").forEach((e) => {
		e.dataset.javImageLayout !== t && (e.dataset.javImageLayout = t, e.classList.contains("cover") && (e.classList.toggle("whole", t !== "big"), e.classList.toggle("front", t === "big"), e.classList.remove("panel"), e.removeAttribute("style"), e.closest(".pic,[data-media-pic]")?.style.removeProperty("--cover-blur"), e.complete && e.naturalWidth && n.push(e)));
	}), n;
}
//#endregion
//#region src/number-setting.ts
function C(e, t, n, r) {
	return Number.isInteger(e) && e >= t && e <= n ? e : r;
}
//#endregion
//#region src/settings-store.ts
function le(e, t) {
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
var w = [
	"",
	"follow",
	"jav",
	"performers",
	"tags",
	"studios",
	"flagged",
	"manage"
], ue = [
	"playlists",
	"immerse",
	"stats",
	"review",
	"data-cleanup",
	"trash",
	"follow-manage",
	"quality"
], de = /* @__PURE__ */ new Set([...w, ...ue]), fe = (e) => e === "ads" || e === "dupes" ? "data-cleanup" : e;
function pe(e) {
	let t = Array.isArray(e) ? e.filter((e) => typeof e == "string") : [], n = [...new Set(t.map(fe))].filter((e) => de.has(e));
	return n.length ? n : [...w];
}
function me(e) {
	return [
		"/",
		"/unseen",
		"/watch-later",
		"/flagged",
		"/trash",
		"/junk-files"
	].includes(e) || /^\/(item|mix|parts|editions)\//.test(e) || /^\/playlists\/\d+\/\d+$/.test(e) || /^\/(performers|studios|creators|series|agencies)\/.+/.test(e);
}
function he(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) for (let e of new Set(n.tags || [])) t.set(e, (t.get(e) || 0) + 1);
	return [...t].sort((e, t) => t[1] - e[1]).slice(0, 30);
}
//#endregion
//#region src/appearance/settings.ts
var ge = "peach.settings.v1", _e = [
	"system",
	"light",
	"dark"
], ve = [
	0,
	7,
	30,
	90
], ye = [
	0,
	7,
	30,
	90
], be = [
	"feedHideGroupCompilations",
	"feedHideSoloCompilations",
	"feedHideExcerpts"
], xe = {
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
	sidebarOrder: [...w],
	homeGlow: i,
	accent: r
}, T = (e, t, n) => t.includes(e) ? e : n;
function Se(e) {
	let t = e && typeof e == "object" ? e : {}, n = {
		...xe,
		...t
	};
	n.followInitialDays = ve.includes(+n.followInitialDays) ? +n.followInitialDays : 30, delete n.rotateMinutes;
	let r = !1, i = +n.sortDefaultsVersion || 0;
	i < 2 && n.defaultSort === "new" && (n.defaultSort = "seed", r = !0);
	let s = y[n.defaultSort];
	return i < 3 && s && (n.defaultSort = s[0], r = !0), n.sortDefaultsVersion = 3, n.batchSize = C(+n.batchSize, 1, 200, 60), n.defaultSort = T(n.defaultSort, _, "seed"), n.hoverDelaySeconds = C(+n.hoverDelaySeconds, 0, 60, 5), n.seekSeconds = C(+n.seekSeconds, 1, 300, 10), delete n.loginDays, n.ambientMode = n.ambientMode !== !1, n.theaterMode = n.theaterMode === !0, n.groupCollapse = n.groupCollapse !== !1, n.detailAutoplay = n.detailAutoplay !== !1, n.miniplayer = n.miniplayer !== !1, n.uiSounds = n.uiSounds !== !1, n.feedAutoScroll = n.feedAutoScroll !== !1, n.feedHideGroupCompilations = n.feedHideGroupCompilations !== !1, n.feedHideSoloCompilations = n.feedHideSoloCompilations === !0, n.feedHideExcerpts = n.feedHideExcerpts !== !1, n.searchHistoryLimit = C(+n.searchHistoryLimit, 0, 50, 10), n.relatedLimit = C(+n.relatedLimit, 0, 60, 20), n.metadataRefreshDays = T(+n.metadataRefreshDays, ye, 30), Object.assign(n, re(n)), n.theme = T(n.theme, _e, "system"), n.homeGlow = o(n.homeGlow), n.accent = a(n.accent), n.sidebarOrder = pe(n.sidebarOrder), {
		settings: n,
		migrated: r
	};
}
function Ce(e) {
	let t = {};
	try {
		t = JSON.parse(e.getItem("peach.settings.v1") || "{}");
	} catch {}
	return Se(t);
}
var E = null;
function D() {
	if (E) return E;
	let { settings: e, migrated: t } = Ce(localStorage);
	return E = le(ge, e), t && E.save(), E;
}
function we(e, t, n = D()) {
	let r = n.value, i = e && e.followInitialDays;
	ve.includes(i) && (r.followInitialDays = i, n.save());
	let a = e && e.metadataRefreshDays;
	ye.includes(a) && a !== r.metadataRefreshDays && (r.metadataRefreshDays = a, n.save());
	for (let t of be) typeof e?.[t] == "boolean" && e[t] !== r[t] && (r[t] = e[t], n.save());
	let o = e && e.searchHistoryLimit;
	Number.isInteger(o) && o >= 0 && o <= 50 ? o !== r.searchHistoryLimit && (r.searchHistoryLimit = C(o, 0, 50, 10), n.save(), t("searchHistoryLimit")) : e && e.searchHistoryLimit === null && r.searchHistoryLimit !== xe.searchHistoryLimit && Te(n);
	let s = Array.isArray(e && e.sidebarOrder) ? e.sidebarOrder : null;
	!s || !s.length || s.join(",") === r.sidebarOrder.join(",") || (r.sidebarOrder = s, n.save());
}
function Te(t = D()) {
	return e("/api/settings", {
		method: "POST",
		body: JSON.stringify({ searchHistoryLimit: t.value.searchHistoryLimit })
	}).catch(() => {});
}
//#endregion
//#region src/appearance/theme.ts
var Ee = [
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
], De = null, Oe = () => De ??= matchMedia("(prefers-color-scheme: dark)");
function ke(e = D().value.theme) {
	let t = document.documentElement;
	e === "system" ? delete t.dataset.theme : t.dataset.theme = e;
	let n = e === "dark" || e === "system" && Oe().matches;
	t.classList.toggle("dark", n), document.querySelectorAll("[data-board-theme]").forEach((e) => e.setAttribute("aria-pressed", String(e.dataset.boardTheme === "dark" === n))), document.querySelector(".board-theme-toggle")?.classList.toggle("is-dark", n), document.querySelectorAll("meta[data-theme-color]").forEach((e) => {
		e.media = e.dataset.themeColor === "dark" === n ? "all" : "not all";
	});
}
var Ae = !1;
function je() {
	Ae || (Ae = !0, Oe().addEventListener("change", () => {
		D().value.theme === "system" && ke();
	}));
}
//#endregion
//#region src/appearance/layout.ts
var Me = [[
	"big",
	"大图",
	"maximize"
], [
	"small",
	"小图",
	"layout-grid"
]], Ne = [[
	"big",
	"大图",
	"maximize"
], [
	"small",
	"小图",
	"layout-grid"
]], Pe = [[
	"fixed",
	"固定比例",
	"layout-grid"
], [
	"masonry",
	"瀑布流",
	"columns-2"
]], Fe = .75, O = () => D().value, Ie = (e = O()) => x(e.javLayout), Le = (e = O()) => x(e.homeLayout), Re = (e, t = O()) => e ? Le(t) : Ie(t), ze = Ne.map(([e]) => e), Be = Pe.map(([e]) => e), Ve = (e = O()) => T(e.photoSize, ze, "small"), He = (e = O()) => T(e.photoLayout, Be, "masonry"), Ue = null;
function We(e, t = O()) {
	let n = {
		active: e.active,
		size: Re(e.home, t),
		portrait: e.portrait,
		javImage: t.javImage
	}, r = Ue;
	return (!r || Object.keys(n).some((e) => n[e] !== r[e])) && (Ue = n), Ue;
}
function Ge(e) {
	return e.portrait ? 9 / 16 : e.active && e.size === "big" ? Fe : 16 / 9;
}
function Ke(e, t = D()) {
	t.value.homeLayout = x(e), t.save();
}
function qe(e, t = D()) {
	t.value.javLayout = x(e), t.save();
}
function Je(e, t = D()) {
	t.value.homeLayout = t.value.javLayout = x(e), t.save();
}
function Ye(e, t = D()) {
	t.value.photoSize = T(e, ze, "small"), t.save();
}
function Xe(e, t = D()) {
	t.value.photoLayout = T(e, Be, "masonry"), t.save();
}
//#endregion
//#region src/appearance/density.ts
var Ze = "density", Qe = {
	big: "336px",
	dense: "168px"
}, $e = () => localStorage.getItem(Ze) === "dense" ? "dense" : "big";
function et(e, t) {
	let [n, r] = Ne;
	e.querySelector("[data-icon-swap]") ? m(e, t === r[0] ? "b" : "a") : e.innerHTML = l(n[2], r[2], t === r[0] ? "b" : "a"), e.setAttribute("aria-label", t === "big" ? "切换为小图" : "切换为大图");
}
var tt = () => document.querySelector("#density");
function nt(e = $e()) {
	document.documentElement.style.setProperty("--tile", Qe[e]), document.body.dataset.density = e;
	let t = tt();
	t && (t.setAttribute("aria-pressed", String(e === "dense")), t.title = "当前：" + (e === "big" ? "大图" : "密集"), et(t, e === "big" ? "big" : "small"));
}
function rt() {
	let e = $e() === "big" ? "dense" : "big";
	localStorage.setItem(Ze, e), nt(e);
}
function it(e) {
	let t = tt();
	t && (t.setAttribute("aria-pressed", String(e === "small")), t.title = "当前：" + (e === "big" ? "大图" : "小图"), et(t, e));
}
//#endregion
//#region src/board-controls.ts
function k(e) {
	let t = Number(e.min) || 0, n = Number(e.max) || 100, r = Number(e.value), i = n > t ? Math.max(0, Math.min(100, (r - t) / (n - t) * 100)) : 0;
	e.style.setProperty("--board-range-value", `${i}%`);
}
function at() {
	let e = (e) => {
		e.querySelectorAll("input[type=range]").forEach(k), lt(e), st(e);
	};
	e(document), new MutationObserver((t) => {
		for (let n of t) for (let t of n.addedNodes) t instanceof Element && (t.matches("input[type=range]") && k(t), e(t));
	}).observe(document.body, {
		subtree: !0,
		childList: !0
	}), document.addEventListener("input", (e) => {
		e.target instanceof HTMLInputElement && e.target.type === "range" && k(e.target);
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
		n && p(e, n) && o();
	}, !0), window.addEventListener("resize", o);
}
var ot = /* @__PURE__ */ new Map();
function st(e) {
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
			n(i), ot.set(t, i);
		}, i = ot.get(t);
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
var ct = /* @__PURE__ */ new Map();
function lt(e) {
	let t = ".iconswitch,.insightswitch,.follow-workspace-switch", n = [...e.querySelectorAll(t)];
	e instanceof HTMLElement && e.matches(t) && n.push(e), n.forEach((e) => {
		if (e.hasAttribute("data-board-segments") || e.closest("[data-skeleton]")) return;
		e.dataset.boardSegments = "true";
		let t = document.createElement("span");
		t.className = "board-segment-thumb", t.setAttribute("aria-hidden", "true"), e.prepend(t);
		let n = e.className + (e.getAttribute("aria-label") ?? ""), r = ct.get(n) ?? null, i = () => {
			let i = e.querySelector("label:has(input:checked),button[aria-selected=true]");
			if (!i || !i.offsetWidth) return;
			let a = {
				x: i.offsetLeft,
				y: i.offsetTop,
				w: i.offsetWidth,
				h: i.offsetHeight
			};
			d(t, r, a, "x"), r = a, ct.set(n, a);
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
var ut = !1;
async function dt(e, t) {
	if (ut) return;
	if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) {
		t();
		return;
	}
	let n = e.getBoundingClientRect(), r = n.left + n.width / 2, i = n.top + n.height / 2, a = Math.hypot(Math.max(r, innerWidth - r), Math.max(i, innerHeight - i)) * 2.5, o = document.createElement("style");
	o.textContent = `::view-transition-old(root){animation:none}::view-transition-new(root){mix-blend-mode:normal;mask-image:radial-gradient(circle closest-side,#000 78%,#0006 88%,transparent);mask-repeat:no-repeat;will-change:mask-position,mask-size;animation:peach-theme-reveal 560ms cubic-bezier(.16,1,.3,1) both}@keyframes peach-theme-reveal{from{mask-position:${r}px ${i}px;mask-size:0px 0px}to{mask-position:${r - a / 2}px ${i - a / 2}px;mask-size:${a}px ${a}px}}`, ut = !0, document.head.append(o);
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
		delete s.dataset.themeSnapshot, o.remove(), ut = !1;
	}
}
//#endregion
//#region src/sidebar-skeleton.ts
var A = (e) => e.replace(/[&<>"']/g, (e) => ({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
})[e]);
function ft(e, t, n) {
	let r = new Map(t.map((e) => [e[0], e]));
	return `<div data-sidebar-head=""></div><div data-sidebar-nav="">${e.map((e) => r.get(e)).filter((e) => e !== void 0).map(([e, t, r]) => {
		let i = e === "" ? "<img data-sidebar-home-logo=\"\" src=\"/peach-logo.png\" alt=\"\">" : `<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${A(r)}"/></svg>`;
		return `<button type="button" data-nav="${A(e)}" aria-pressed="${n(e)}" aria-label="${A(t)}">${i}<span>${A(t)}</span></button>`;
	}).join("")}</div>`;
}
//#endregion
//#region src/manage-header.ts
var pt = {
	"/junk-files": "垃圾文件",
	"/duplicates": "重复文件",
	"/review": "人工复核",
	"/trash": "回收站",
	"/quality-goals": "高清版",
	"/scraping": "来源和凭证"
}, mt = /* @__PURE__ */ new Set(["/data-cleanup", "/scraping"]), ht = ({ total: e, shown: t }) => `${e.toLocaleString()} 个符合 · 显示 ${t}`;
function gt(e) {
	let t = e.sections.find(([t]) => t === e.section);
	if (!t) return null;
	let n = pt[e.path] ?? "";
	return {
		title: e.section === "cleanup" && n || t[1],
		crumb: n,
		compact: mt.has(e.path) || e.section === "configuration",
		lede: e.section === "trash" ? e.trash ? {
			kind: "count",
			text: ht(e.trash),
			total: e.trash.total
		} : { kind: "skeleton" } : { kind: "none" }
	};
}
var j = (e) => e.replace(/[&<>"']/g, (e) => ({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
})[e]), _t = (e) => `<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${j(e)}"/></svg>`, vt = "<span class=\"skeleton\" data-trash-lede-skeleton=\"text\" aria-hidden=\"true\"></span><span class=\"skeleton\" data-trash-lede-skeleton=\"action\" aria-hidden=\"true\"></span>";
function yt(e) {
	let t = gt(e);
	if (!t) return "";
	let n = e.menu.map(([t, n, r]) => {
		let i = t === e.section;
		return `<button type="button" data-manage="${j(t)}" aria-pressed="${i}"${i ? " aria-current=\"page\"" : ""}>${_t(r)}<span>${j(n)}</span></button>`;
	}).join(""), r = t.crumb ? `<nav data-manage-crumb="" aria-label="Breadcrumb"><ol><li><a href="/data-cleanup">数据管理</a>${_t("chevron-right")}</li><li aria-current="true"><span>${j(t.crumb)}</span></li></ol></nav>` : "", i = t.lede.kind === "none" ? "" : `<p class="mono" data-manage-lede="">${t.lede.kind === "skeleton" ? vt : `<span data-lede-text="">${j(t.lede.text)}</span>${t.lede.total ? bt : ""}`}</p>`;
	return `<nav data-manage-bar="" aria-label="管理"><div data-manage-menu="">${n}<span data-manage-indicator="" aria-hidden="true"></span></div></nav>` + r + `<h2 data-manage-title=""${t.compact ? " data-compact=\"\"" : ""}>${j(t.title)}</h2>` + i;
}
var bt = "<button type=\"button\" data-empty-trash=\"\" title=\"永久删除回收站内容\">清空回收站</button>";
//#endregion
//#region src/jobs.ts
function xt(e, n, r) {
	if (!Number.isFinite(r) || r <= 0) return "";
	let i = Math.max(0, Math.min(r, Number.isFinite(n) ? n : 0)), a = i / r * 100;
	return `<div class="board-job-progress" role="progressbar" aria-label="${t(e)}" aria-valuemin="0" aria-valuemax="${r}" aria-valuenow="${i}"><svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true"><circle class="board-job-track" cx="18" cy="18" r="15"/><circle class="board-job-fill" cx="18" cy="18" r="15" pathLength="100" stroke-dasharray="${a} ${100 - a}" transform="rotate(-90 18 18)"/></svg><span>${t(e)}<small>${Math.round(a)}%</small></span></div>`;
}
function St(e, t = 0, n = 0) {
	return n > 0 ? xt(e, t, n) : u(e);
}
async function Ct(e) {
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
function wt(e) {
	let t = e.note || ((e) => f(e, {
		label: "任务状态",
		variant: "error"
	})), n = e.loading || u, r = e.progress || ((e, t, n) => St(n || `已处理 ${e} / ${t}`, e, t)), i = e.container || ((e) => `<section class="followtask" data-geist-fieldset aria-label="任务进度"><div class="geist-fieldset-content">${e}</div></section>`), a = document.createElement("div");
	e.host.hidden = !0, a.dataset.followJob = "", a.setAttribute("aria-live", "polite"), e.host.prepend(a);
	let o = e.storageKey || "peach-follow-job", s = sessionStorage.getItem(o) || void 0, c = !1;
	Ct({
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
function Tt(e, t, n, r, i, a = i || !e.has(r)) {
	let o = n === null ? -1 : t.indexOf(n), s = t.indexOf(r);
	return i && o >= 0 && s >= 0 ? t.slice(Math.min(o, s), Math.max(o, s) + 1).forEach((t) => e.add(t)) : a ? e.add(r) : e.delete(r), r;
}
function Et(e, t) {
	let n = t.filter((t) => e.has(t)).length;
	return {
		count: n,
		all: n > 0 && n === t.length,
		mixed: n > 0 && n < t.length
	};
}
function Dt(e, t, n) {
	t.forEach((t) => n ? e.add(t) : e.delete(t));
}
function Ot({ count: e, label: t, all: n, summary: r, actions: i, locked: a = !1 }) {
	e && (e.textContent = t), n && (n.checked = r.all, n.indeterminate = r.mixed);
	for (let e of i) e.disabled = !r.count || a;
}
function kt(e, t, n = 1) {
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
function At(e, t) {
	return Math.max(1, Math.ceil(e / t));
}
function jt(e, t) {
	return Math.min(Math.max(1, Math.floor(e) || 1), t);
}
function Mt(e, t, n) {
	if (t <= 1) return "";
	let r = kt(e, t).map((t) => t === "…" ? "<li class=\"board-page-dots\" aria-hidden=\"true\">…</li>" : `<li><button type="button" class="board-page" data-page="${t}" aria-label="第 ${t} 页"${t === e ? " aria-current=\"page\"" : ""}>${t}</button></li>`).join("");
	return `<nav class="board-pagination" aria-label="${n}">
    <button type="button" class="geist-button" data-page="${e - 1}"${e <= 1 ? " disabled" : ""}><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-chevron-left"></use></svg>上一页</button>
    <ul>${r}</ul>
    <button type="button" class="geist-button" data-page="${e + 1}"${e >= t ? " disabled" : ""}>下一页<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-chevron-right"></use></svg></button>
  </nav>`;
}
//#endregion
//#region src/card-art/face-frame.ts
var Nt = .32, Pt = 13, Ft = .6;
function It(e) {
	return e ? Number.isFinite(e.cx) && Number.isFinite(e.cy) && Number(e.faceW) > 0 && Number(e.imgW) > 0 && Number(e.imgH) > 0 : !1;
}
function Lt(e, t, n = 1, r = Nt, i = Ft) {
	if (!It(e) || !(t && t.w > 0 && t.h > 0)) return 1;
	let a = n > 0 ? n : 1, o = Math.max(t.w / e.imgW, t.h / e.imgH), s = e.faceW * o;
	if (!(s > 0)) return 1;
	let c = Math.min(t.w, t.h), l = Math.max(r, 13 / c) * c / s, u = Math.max(t.w / (2 * Math.min(e.cx, 1 - e.cx) * e.imgW * o), t.h / (2 * Math.min(e.cy, 1 - e.cy) * e.imgH * o)), d = e.faceW / (s * a);
	return Math.max(1, Math.min(Math.max(l, Math.min(u, i * c / s)), d));
}
function Rt(e, t, n = 1, r = Nt, i = Ft) {
	let a = Lt(e, t, n, r, i);
	if (a <= 1 || !It(e) || !t) return null;
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
var zt = "|", Bt = "closest:";
function Vt(e) {
	return String(e ?? "").split(zt).map((e) => e.trim()).filter(Boolean);
}
function Ht({ drop: e = "self", fallbacks: n = [], initial: r = "", dropClass: i = "", dropStyle: a = !1 } = {}) {
	let o = (Array.isArray(n) ? n : [n]).filter(Boolean);
	return [
		`data-drop="${t(e)}"`,
		o.length ? `data-fallbacks="${t(o.join(zt))}"` : "",
		r ? `data-initial="${t(r)}"` : "",
		i ? `data-drop-class="${t(i)}"` : "",
		a ? "data-drop-style" : ""
	].filter(Boolean).join(" ");
}
function Ut(e) {
	if (!e || !e.dataset || !e.dataset.drop) return "";
	let t = Vt(e.dataset.fallbacks);
	if (t.length) {
		let [n = "", ...r] = t;
		return "dropStyle" in e.dataset && e.removeAttribute("style"), delete e.dataset.facebox, r.length ? e.dataset.fallbacks = r.join(zt) : delete e.dataset.fallbacks, e.src = n, "retry";
	}
	let n = e.dataset.drop;
	if (n.startsWith(Bt)) return (e.closest(n.slice(8)) || e).remove(), "drop";
	if (n === "initial") {
		let t = document.createElement("span");
		return t.className = e.dataset.dropClass || "", t.textContent = e.dataset.initial || "", e.replaceWith(t), "drop";
	}
	return e.remove(), "drop";
}
function Wt(e) {
	e.addEventListener("error", (e) => {
		e.target instanceof HTMLImageElement && Ut(e.target);
	}, !0);
}
//#endregion
//#region src/card-art/native-image.ts
function Gt(e, t, n, r) {
	if (!(e > 0 && t > 0 && n > 0 && r > 0)) return 0;
	let i = e / n, a = t / r;
	return i > 1.001 || a > 1.001 || Math.abs(i - a) > Math.max(i, a) * .01 ? 0 : i;
}
function Kt(e, t, n, r, i = 1) {
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
var qt = /* @__PURE__ */ new Map();
function Jt(e) {
	(e || []).forEach((e) => {
		e.rep && e.has_avatar && qt.set(e.k, e.rep);
	});
}
function M(e) {
	return qt.get(e);
}
//#endregion
//#region src/card-art/markup.ts
var N = (e, t) => t ? `${e}&v=${encodeURIComponent(t)}` : e, P = (e, t = !1) => N(`/cover?code=${encodeURIComponent(e.code || "")}${t ? "&thumb=1" : ""}`, e.cover_version), Yt = (e, t, n) => N(`/logo?studio=${encodeURIComponent(e)}&variant=${t}`, n), Xt = (e) => e && typeof e == "object" ? e : null;
function Zt(e) {
	return e && e.is_jav ? "女优" : "艺人";
}
function Qt({ kind: e = "performer", id: t = null, hasImage: n = !1, version: r = "", rep: i = null, mark: a = null, logo: o = "", logoVersion: s = "", logoVariant: c = "logo", alt: l = "", lazy: u = !0, style: d = "", dropStyle: f = !1, focus: p = null, thumb: m = !1 } = {}) {
	let h = !!(t && n), g = h ? N(`/entity-image?kind=${e}&id=${t}${m ? "&thumb=1" : ""}`, r) : "", _ = i ? `/avatar?id=${i}` : "", v = !!o, y = v ? Yt(o, c, s) : g || _ || (a ? `/link-mark?id=${a}` : "");
	if (!y) return "";
	let ee = v ? [g, _].filter(Boolean) : h && _ ? [_] : [], b = h && !v, te = b ? nn(p) : "", ne = d || tn(p);
	return `<img src="${y}" alt="${l}"${u ? " loading=\"lazy\"" : ""} decoding="async"${b ? ne : ""} ${te}${Ht({
		dropStyle: (f || !!te || !!ne) && b,
		fallbacks: ee
	})}>`;
}
function F(e, n, r, i = "performer", a = null, o = "", s = "icon", c = void 0, l = !1) {
	let u = c === void 0 ? n && n.avatar_focus || null : c;
	return `<span class="ini">${t((e || "?").slice(0, 1))}</span>` + Qt({
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
function $t(e, t, n) {
	return F(e, t, n ? M(e) : null, n || "performer");
}
function en(e) {
	let t = Xt(e);
	return t && t.axis === "x" ? `${t.pct}% 50%` : t && t.axis === "y" ? `50% ${t.pct}%` : "";
}
function tn(e) {
	let t = en(e);
	return t ? ` style="object-position:${t}"` : "";
}
function nn(e) {
	let t = Xt(e)?.box;
	return t ? ` data-facebox="${[
		t.cx,
		t.cy,
		t.faceW,
		t.imgW,
		t.imgH
	].map(Number).join(" ")}"` : "";
}
function rn(e, t, n = !1) {
	let r = P(e, !0), i = e.cover_frame || {}, a = [i.cx == null ? "" : ` data-cx="${i.cx}"`, i.cy == null ? "" : ` data-cy="${Math.min(.6, Math.max(.05, i.cy))}"`].join(""), o = e.poster_box, s = o ? ` data-posterbox="${[
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
var an = {
	kind: "",
	html: ""
};
function on(e, n, r, i) {
	let a = ie(e, i);
	if (!a) return an;
	let o = e.has_cover && e.code ? P(e, !0) : "", s = e.has_thumb || e.has_local_poster ? `/poster?id=${e.id}&c=4` : "", c = rn(e, n, r), l = (c.match(/ data-(?:c[xy]|posterbox)="[^"]*"/g) || []).join(""), u = a === "cover" ? c : `<img class="poster" src="${s}" alt="" loading="${r ? "eager" : "lazy"}"${l}>`;
	return {
		kind: a === "cover" ? "cover" : "thumb",
		html: u.replace("<img ", `<img data-jav-image="${e.id}" data-jav-cover="${t(o)}" data-jav-thumb="${t(s)}" data-jav-image-layout="${n}" `)
	};
}
function sn(e, n, r, i) {
	return e.is_jav ? on(e, n, r, i) : e.follow_thumb_url ? {
		kind: "thumb",
		html: `<img class="poster" src="${t(e.follow_thumb_url)}" alt="" loading="${r ? "eager" : "lazy"}" referrerpolicy="no-referrer">`
	} : cn(e, n, r, i);
}
function cn(e, t, n, r) {
	return e.is_jav ? on(e, t, n, r) : !e.has_thumb && !e.has_local_poster ? an : {
		kind: "thumb",
		html: `<img class="poster" src="/poster?id=${e.id}&c=4" alt="" loading="${n ? "eager" : "lazy"}">`
	};
}
function ln(e, t) {
	return cn(e, "small", !1, t).html || "<span class=\"nopic\">无预览</span>";
}
function un(e, t) {
	let n = e.has_thumb || e.has_local_poster ? `/poster?id=${e.id}&c=4` : "";
	return e.is_jav && ie(e, t) === "cover" ? P(e) : n;
}
function dn(e) {
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
function fn(e) {
	let { kind: t, name: n, coStarred: r, performers: i, refs: a } = dn(e);
	return r ? `<div class="mavstack">${i.slice(0, 5).map((e, t) => `<span class="mav">${F(e, a[t], M(e))}</span>`).join("")}</div>` : `<span class="mav">${F(n, t === "performer" ? a[0] : e.creator_entity, t ? M(n) : null, t || "performer")}</span>`;
}
function pn(e, t) {
	let n = (e.performers || [])[0];
	return (e.is_jav && n ? n : e.creator) || n || e.studio || e.code || t((e.tags || [])[0] || "") || "为你推荐";
}
//#endregion
//#region src/card-art/framing.ts
var mn = () => window.devicePixelRatio || 1;
function I(e) {
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
			r.width > 0 && r.height > 0 && (n.disconnect(), I(e));
		});
		n.observe(t);
		return;
	}
	let [r = NaN, i = NaN, a = NaN, o = NaN, s = NaN] = String(e.dataset.facebox).split(" ").map(Number), c = Gt(e.naturalWidth, e.naturalHeight, o, s);
	if (!c) {
		e.style.objectPosition = "50% 50%";
		return;
	}
	let l = Rt({
		cx: r,
		cy: i,
		faceW: a * c,
		imgW: o * c,
		imgH: s * c
	}, {
		w: n.width,
		h: n.height
	}, mn());
	if (!l) return;
	let u = e.style;
	u.position = "absolute", u.right = "auto", u.bottom = "auto", u.left = `${l.left}%`, u.top = `${l.top}%`, u.width = `${l.width}%`, u.height = `${l.height}%`, u.maxWidth = "none", u.maxHeight = "none";
}
function L(e) {
	let t = e.naturalWidth / e.naturalHeight;
	if (!t) return;
	let n = new URL(e.currentSrc || e.src, location.href).searchParams.get("code") || "";
	e.dataset.frame = /^FC2(?:-PPV)?-/i.test(n) || t >= 1.65 ? "still" : t > 1.2 ? "sleeve" : "front";
	let r = vn(e), i = (t, n, r) => {
		if (n == null || !(r > 0 && r < 1)) return;
		let i = Math.min(1, Math.max(0, (n - r / 2) / (1 - r)));
		e.style.setProperty(t, `${Math.round(i * 100)}%`);
	};
	i("--cover-x", yn(e, "cx"), r / t), i("--cover-y", yn(e, "cy"), t / r), hn(e, r), (e.classList.contains("whole") || e.dataset.frame === "front") && Math.abs(t / r - 1) > .02 && gn(e);
}
function hn(e, t) {
	if (e.dataset.frame === "front") return;
	let [n = NaN, r = NaN, i = NaN, a = NaN, o = NaN, s = NaN] = String(e.dataset.posterbox || "").split(" ").map(Number);
	if (!e.dataset.posterbox && e.dataset.frame === "sleeve" && (r = e.naturalWidth, i = e.naturalHeight, n = Math.round(r - ae * i), a = 0, o = r, s = i), !Gt(e.naturalWidth, e.naturalHeight, r, i)) return;
	let c = oe({
		x0: n,
		y0: a,
		x1: o,
		y1: s,
		px: [r, i]
	}, t);
	c && (e.classList.add("panel"), e.style.setProperty("--panel-clip", `${c.clip.top}% ${c.clip.right}% ${c.clip.bottom}% ${c.clip.left}%`), e.style.setProperty("--panel-left", `${c.left}%`), e.style.setProperty("--panel-top", `${c.top}%`), e.style.setProperty("--panel-height", `${c.height}%`), gn(e));
}
function gn(e) {
	e.closest(".pic,[data-media-pic]")?.style.setProperty("--cover-blur", `url("${e.dataset.thumbSrc || e.currentSrc || e.src}")`);
}
function _n(e) {
	if (!/[?&]thumb=1(&|$)/.test(e.src) || !e.naturalWidth) return;
	let { width: t, height: n } = e.getBoundingClientRect();
	(getComputedStyle(e).objectFit === "contain" ? Math.min : Math.max)(t / e.naturalWidth, n / e.naturalHeight) * mn() > 1.01 && (e.dataset.thumbSrc = e.src, e.src = e.src.replace(/[?&]thumb=1(?=&|$)/, ""));
}
function vn(e) {
	let t = getComputedStyle(e).getPropertyValue("--card-ratio").trim().split("/").map(Number), n = t.length === 2 ? Number(t[0]) / Number(t[1]) : Number(t[0]);
	return Number.isFinite(n) && n > 0 ? n : 16 / 9;
}
function yn(e, t) {
	let n = parseFloat(e.dataset[t] ?? "");
	return Number.isFinite(n) ? n : null;
}
var bn = ".pic>img.poster,[data-media-art]>img,.ring>img,[data-tier-ring]>img,[data-person-ring]>img,[data-entity-portrait]>img,[data-hero-ring]>img", xn = /* @__PURE__ */ new WeakMap();
function Sn(e) {
	let t = e.matches(bn) ? [e] : e.querySelectorAll(bn);
	for (let e of t) !e.complete && e.parentElement && (e.parentElement.classList.add("imgwait"), xn.set(e.parentElement, performance.now()));
}
function Cn(e) {
	let t = e.parentElement;
	if (!t?.classList.contains("imgwait")) return;
	if (performance.now() - (xn.get(t) ?? NaN) < s) {
		t.classList.remove("imgwait");
		return;
	}
	t.classList.replace("imgwait", "imgdone");
	let n, r = (e) => {
		e && (e.target !== t || e.pseudoElement !== "::after") || (t.removeEventListener("transitionend", r), clearTimeout(n), t.classList.remove("imgdone"));
	};
	t.addEventListener("transitionend", r), n = setTimeout(r, 1e3);
}
function wn(e) {
	let t = "img.cover,img[data-facebox]", n = e.matches(t) ? [e] : e.querySelectorAll(t);
	for (let e of n) {
		let t = e;
		t.complete && t.naturalWidth && (t.classList.contains("cover") ? L(t) : (R(t), I(t)));
	}
}
function R(e) {
	let t = e.closest("[data-fit-native]");
	if (!t || !e.naturalWidth) return;
	let { small: n, width: r, height: i } = Kt(e.naturalWidth, e.naturalHeight, t.clientWidth, t.clientHeight, mn());
	t.dataset.nativeSmall = String(n), t.style.setProperty("--markw", n ? r + "px" : "100%"), t.style.setProperty("--markh", n ? i + "px" : "100%");
	let a = (e.currentSrc || e.src).replace(/"/g, "%22");
	t.style.setProperty("--markbg", n ? `url("${a}")` : "none");
}
function Tn(e) {
	(e || document).querySelectorAll("[data-fit-native] img").forEach((e) => {
		R(e), e.dataset.facebox && I(e);
	});
}
function En(e, t) {
	for (let n of ce(e, t)) L(n), _n(n);
}
var Dn = !1;
function On() {
	Dn || (Dn = !0, document.addEventListener("load", (e) => {
		let t = e.target;
		t instanceof HTMLImageElement && (Cn(t), R(t), t.classList.contains("cover") ? (L(t), _n(t)) : t.dataset.facebox && I(t));
	}, !0), new MutationObserver((e) => {
		for (let t of e) for (let e of t.addedNodes) e.nodeType === Node.ELEMENT_NODE && (Sn(e), wn(e));
	}).observe(document.body, {
		childList: !0,
		subtree: !0
	}), document.addEventListener("error", (e) => {
		let t = e.target;
		t instanceof HTMLImageElement && !t.dataset.fallbacks && Cn(t);
	}, !0));
}
//#endregion
//#region src/card-art/hover.ts
var kn = ".card,[data-media-card],[data-mix-card]", z = {
	selecting: () => !1,
	censored: () => !1,
	delaySeconds: () => 0
};
function An(e) {
	z = e;
}
var jn = () => !!window.__scrolling;
function Mn(e = document, t = null) {
	!e || !e.querySelectorAll || (e.querySelectorAll(kn).forEach((e) => {
		e !== t && e._stopHover && e._stopHover();
	}), e.querySelectorAll("video.hv").forEach((e) => {
		e.closest(kn) !== t && (e._hop && clearInterval(e._hop), e.pause(), e.removeAttribute("src"), e.load(), e.remove());
	}), e.querySelectorAll("img.hvframes").forEach((e) => {
		e.closest(kn) !== t && (e.removeAttribute("src"), e.remove());
	}));
}
function Nn(e) {
	e._stopHover?.(), Mn(e);
}
function B(e, t, n) {
	n ? e.dataset[t] = "" : delete e.dataset[t];
}
function Pn(e, t) {
	let n = e, r = e.querySelector("[data-media-pic]");
	if (!r) return;
	e.dataset.hoverMode = t.location === "local" ? "video" : "frames";
	let i, a = () => {
		clearTimeout(i), z.delaySeconds() && (B(e, "previewing", !0), i = setTimeout(() => {
			z.delaySeconds() && B(e, "longhover", !0);
		}, z.delaySeconds() * 1e3));
	}, o = () => {
		clearTimeout(i), B(e, "previewing", !1), B(e, "longhover", !1);
	};
	if (t.location !== "local") {
		if (!t.has_thumb) return;
		let i, s = 4, c = null, l = !1;
		e.addEventListener("mouseenter", () => {
			z.selecting() || z.censored() || (a(), c || (c = document.createElement("img"), c.className = "hvframes", c.alt = "", c.src = `/poster?id=${t.id}&c=${s}`, r.appendChild(c)), clearInterval(i), i = setInterval(() => {
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
		z.selecting() || z.censored() || jn() || (s = setTimeout(() => {
			if (jn() || z.censored()) return;
			Mn(document, e);
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
function Fn(e, t, n) {
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
var In = [
	["checked", "检查时间"],
	["added", "添加时间"],
	["name", "创作者名称"],
	["sources", "来源数量"],
	["source", "来源名称"],
	["provider", "站点"],
	["status", "状态"]
], Ln = "checked", Rn = {
	checked: "desc",
	added: "desc",
	name: "asc",
	sources: "desc",
	source: "asc",
	provider: "asc",
	status: "asc"
}, zn = (e) => In.some(([t]) => t === e);
function Bn(e, t) {
	let n = zn(e) ? e : Ln;
	return {
		sort: n,
		dir: t === "asc" || t === "desc" ? t : Rn[n]
	};
}
//#endregion
//#region src/island-skeleton.ts
var Vn = "inline-flex items-center justify-center gap-0.5 whitespace-nowrap overflow-hidden font-sans", Hn = {
	medium: "h-9 rounded-2lg p-2 text-body-medium",
	small: "h-8 rounded-lg px-2 py-1.5 text-body-medium"
}, Un = {
	medium: Hn.medium,
	small: "size-8 rounded-lg p-0 text-body-medium"
}, Wn = {
	medium: "size-5 shrink-0",
	small: "size-[18px] shrink-0"
}, Gn = {
	medium: "inline-flex items-center justify-center px-1 shrink-0",
	small: "inline-flex items-center justify-center px-0.5 shrink-0"
}, Kn = {
	primary: "bg-button-primary text-text-white shadow-xs",
	secondary: "bg-background-primary-default text-text-primary border border-border-button-default shadow-xs",
	ghost: "bg-button-ghost-background text-button-ghost-foreground"
}, qn = (e, t) => `<svg class="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><use href="#i-${e}"/></svg>`;
function V({ variant: e = "primary", size: t = "medium", glyph: n, label: r, attrs: i = "", compact: a = !1 }) {
	let o = r ? Hn[t] : Un[t], s = n ? qn(n, Wn[t]) : "", c = r ? `<span class="${Gn[t]}"${a ? " data-compact-label" : ""}>${r}</span>` : "";
	return `<button type="button" class="${Vn} ${o} ${Kn[e]}"${i ? ` ${i}` : ""}>${s}${c}</button>`;
}
var Jn = {
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
function Yn(e, { size: t = "md", className: n = "", attrs: r = "" } = {}) {
	let i = Jn[t];
	return `<div class="group flex flex-col${n ? ` ${n}` : ""}"><button type="button" aria-haspopup="listbox"${r ? ` ${r}` : ""} class="flex w-full items-center justify-between rounded-2lg border border-border-button-default bg-background-primary-default shadow-xs text-text-primary ${i.box}"><span class="flex min-w-0 items-center truncate ${i.value}">${e}</span>${qn("chevron-down", `shrink-0 text-text-secondary ${i.chevron}`)}</button></div>`;
}
var Xn = "flex items-end justify-between gap-4 rounded-surface bg-background-secondary-default px-6 py-5 max-compact:flex-col max-compact:items-start max-compact:gap-3 max-compact:p-4 dark:bg-background-primary-default", Zn = "flex min-w-0 flex-col gap-2", Qn = "text-body-regular text-text-secondary", $n = "text-display-4-medium tabular-nums text-text-primary", er = "relative inline-block h-8 w-24 rounded-2lg align-middle skeleton-sheen";
function tr(e) {
	return `<div data-collection-summary="" class="${Xn}"><div class="${Zn}"><span class="${Qn}">${e}</span><strong class="${$n}"><span data-skeleton="count" aria-hidden="true" class="${er}"></span></strong></div></div>`;
}
//#endregion
//#region src/configuration-copy.ts
var nr = "JavDB 或 MISSAV 无法访问时，可填写能访问的镜像域名，Peach 会保留人物页路径。 资料页只显示已有站点身份记录的入口；JavDB 和 MISSAV 还要求有 JAV 目录站记录。 缺少这些记录的 FC2 创作者不会显示这两个入口。", rr = "仅填域名；留空使用默认地址", ir = (e, t) => `<section aria-label="${e}" class="flex w-full flex-col gap-2"><p class="w-full px-3 text-body-2-medium text-text-secondary">${e}</p><div class="flex w-full flex-col rounded-2xl bg-background-secondary-default pl-3">${t}<div class="-ml-3 flex flex-wrap items-center justify-end gap-3 rounded-b-2xl border-t border-separator-border bg-card-footer px-3 py-3">${V({
	label: "保存配置",
	attrs: "disabled data-skeleton-action"
})}</div></div></section>`, ar = (e, t = "") => `<div class="flex min-h-[52px] w-full items-center justify-between gap-4 py-2.5 pr-2.5 border-b border-separator-border last:border-b-0"><div class="flex min-w-0 flex-col"><p class="text-body-regular text-text-primary">${e}</p>${t ? `<p class="text-body-2-regular text-text-secondary">${t}</p>` : ""}</div><span class="skeleton configuration-skeleton-toggle"></span></div>`, or = (e) => `<div class="flex w-full flex-col gap-1"><p class="text-body-medium text-text-primary">${e} 地址</p><span class="skeleton configuration-skeleton-input"></span><p class="pt-px text-caption-1-medium text-text-secondary">${rr}</p></div>`;
function sr() {
	return `<div class="peach-react"><div class="configpage">${`<div class="board-local-nav" data-section-nav data-section-items>${[
		"通用",
		"媒体",
		"网络与访问",
		"更新与维护"
	].map((e, t) => `<button type="button" tabindex="-1" aria-selected="${t === 0}">${e}</button>`).join("")}</div>`}<div class="flex flex-col gap-6">${ir("开机自启", `<div class="flex flex-col">${ar("开机后启动 Peach")}${ar("静默启动", "开机后只显示托盘图标，不打开网页；「开机后启动 Peach」打开时生效。")}${ar("在桌面创建快捷方式", "双击图标打开 Peach 网页；卸载时一并移除。")}</div>`)}${ir("外部入口", `<div class="flex flex-col gap-4 py-4 pr-3"><p class="text-body-2-regular text-text-secondary">${nr}</p>${or("JavDB")}${or("MISSAV")}</div>`)}</div></div></div>`;
}
//#endregion
//#region src/management-skeletons.ts
var H = "relative overflow-hidden skeleton-sheen bg-background-tertiary-default rounded-lg", U = (e = "60%") => `<span class="${H} inline-block max-w-full align-middle" style="width:${e};height:1em"></span>`, cr = "disabled data-skeleton-action", lr = "min-w-0 rounded-2-5xl bg-background-secondary-default p-5 flex flex-col gap-4 max-sm:p-4";
function ur() {
	let e = [
		"馆藏视频",
		"看过",
		"内容标签",
		"使用空间"
	].map((e, t) => `
    <div class="min-w-0 rounded-2xl shadow-card flex flex-col overflow-hidden pt-4 text-left ${t === 0 ? "ring-2 ring-border-focus-ring bg-background-primary-default" : "bg-background-secondary-default"}">
      <span class="flex min-w-0 items-center gap-2 px-4 text-body-regular text-text-secondary max-sm:gap-1.5 max-sm:px-3"><i class="${H} size-7 max-sm:size-6"></i>${e}</span>
      <b class="px-4 pt-3 pb-4 text-title-1-medium max-sm:px-3 max-sm:pb-3">${U("4em")}</b>
      <small class="mt-auto block min-h-9.5 bg-card-footer px-4 py-2.5 text-caption-1-regular max-sm:px-3 max-sm:py-2">${U("6em")}</small>
    </div>`).join(""), t = (e) => `<section class="${lr}" data-stats-chart>
    <header class="flex flex-wrap items-end justify-between gap-x-4 gap-y-1"><span class="flex min-w-0 flex-col gap-1"><h3 class="text-title-2-medium text-text-primary">${e}</h3><b class="text-display-4-medium">${U("4em")}</b></span><small class="text-caption-1-regular text-text-secondary">个视频</small></header>
    <svg class="h-75 w-full max-sm:h-65 text-background-tertiary-default" viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="12">${[
		76,
		54,
		32
	].map((e) => `<circle cx="100" cy="100" r="${e}"/>`).join("")}</svg>
    <div class="inline-grid w-full grid-cols-3 gap-2 max-sm:grid-cols-2">${Array.from({ length: 3 }, () => `<div class="flex min-w-0 flex-col gap-1 rounded-xl bg-background-tertiary-default p-2.5"><span class="text-caption-1-regular">${U()}</span><b class="text-title-2-medium">${U("3em")}</b><small class="text-caption-1-regular">${U()}</small></div>`).join("")}</div>
  </section>`;
	return `<div class="peach-react"><div class="mx-auto flex w-full max-w-board flex-col gap-8">
    <p class="text-caption-1-regular text-text-secondary">账本当前快照 · ${U("12em")}</p>
    <div class="flex flex-col gap-4"><div class="inline-grid w-full grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" data-stats-metrics>${e}</div>
      <div class="flex flex-col gap-5"><div class="inline-grid w-full gap-5 md:grid-cols-2">${t("网盘与本地")}${t("媒体库")}</div>
        <div class="inline-grid w-full gap-5 md:grid-cols-2 xl:grid-cols-3">${[
		"时长",
		"画质",
		"文件类型"
	].map((e) => `<section class="${lr}"><h3 class="text-title-2-medium">${e}</h3><div class="${H} h-64"></div></section>`).join("")}</div>
      </div>
    </div>
    <section class="rounded-surface bg-background-secondary-default dark:bg-background-primary-default">
      <div class="flex flex-wrap gap-3 px-4 pt-3 text-body-regular">${[
		"内容标签",
		"最近看过",
		"标签来源"
	].map((e) => `<span>${e}</span>`).join("")}</div>
      <div class="flex flex-col gap-3 px-4 pt-3.5 pb-4">${Array.from({ length: 5 }, () => `<div class="${H} h-7"></div>`).join("")}</div>
    </section>
  </div></div>`;
}
function dr() {
	let e = `<div class="duplicate-row items-center gap-3 border-t border-separator-border px-5 py-4 max-compact:p-4">
    <span class="${H} row-span-2 inline-grid aspect-16/10 w-full rounded-2lg"></span>
    <span class="text-body-regular max-duplicate-narrow:col-start-2 max-duplicate-narrow:-col-end-1">${U("70%")}</span>
    ${Array.from({ length: 3 }, () => `<span class="font-mono text-caption-1-regular leading-5">${U("3em")}</span>`).join("")}
    <span class="col-start-2 -col-end-1 min-w-0 pt-0.5 font-mono text-caption-1-regular leading-5 max-duplicate-narrow:col-span-full">${U("75%")}</span>
  </div>`, t = `<section class="mb-6 overflow-hidden rounded-surface bg-background-secondary-default dark:bg-background-primary-default" data-duplicate-group>
    <div class="flex flex-wrap items-center gap-3 bg-background-tertiary-default p-5 max-compact:p-4 dark:bg-background-secondary-default">
      <b class="text-title-2-medium">${U("5em")}</b><span class="font-mono text-caption-1-regular leading-5">${U("8em")}</span>
      <span class="ml-auto flex flex-wrap gap-2 max-compact:ml-0 max-compact:w-full">${[
		"留最大",
		"留最长",
		"整组回收"
	].map((e) => V({
		variant: "secondary",
		size: "small",
		label: e,
		attrs: cr
	})).join("")}</span>
    </div>${e.repeat(2)}</section>`;
	return `<div class="peach-react"><div class="mx-auto w-full max-w-board pb-10.5">
    <div data-collection-summary class="mb-5 flex items-end justify-between gap-4 rounded-surface bg-background-secondary-default px-6 py-5 max-compact:flex-col max-compact:items-start max-compact:gap-3 max-compact:p-4 dark:bg-background-primary-default">
      <div class="flex min-w-0 flex-col gap-2"><span class="text-body-regular text-text-secondary">重复内容</span><strong class="text-display-4-medium">${U("4em")}</strong></div><p class="text-body-regular text-text-secondary">${U("12em")}</p>
    </div>
    <div data-filter-glass data-glass-pane class="mb-5.5 flex flex-wrap items-center gap-x-2.5 gap-y-2 px-4 py-2.5"><h3 class="mr-1 text-body-medium">批量保留</h3>${["全部保留最大", "全部保留最长"].map((e) => `<button ${cr} class="h-7.5 rounded-full border border-separator-border px-3 text-body-2-medium">${e}</button>`).join("")}</div>
    ${t.repeat(2)}
  </div></div>`;
}
function fr() {
	let e = `<li class="min-w-0 bg-background-secondary-default rounded-2xl shadow-card border border-separator-border flex flex-col gap-3 p-3">
    <div class="flex min-w-0 gap-4"><span class="${H} inline-grid w-card-cover shrink-0 aspect-card-cover rounded-2lg"></span>
      <div class="flex min-w-0 flex-1 flex-col gap-1.5"><h3 class="text-headline-medium">${U("80%")}</h3><p class="text-body-2-regular">${U("60%")}</p></div>
    </div>
    <footer class="flex justify-end">${V({
		variant: "secondary",
		size: "small",
		label: "查看版本",
		attrs: cr
	})}</footer>
  </li>`;
	return `<div class="peach-react"><div class="mx-auto flex w-full max-w-board flex-col gap-8">
    ${tr("待升级")}
    <ul class="card-grid-cover gap-5">${e.repeat(6)}</ul>
  </div></div>`;
}
//#endregion
//#region src/board-skeleton.ts
var W = (e = "60%") => `<span class="skeleton" style="width:${e}"></span>`, G = () => `${W("80%")}${W("48%")}`, K = (e, t) => e.repeat(t), pr = (e, t = "metricstrip") => `<div class="${t}">${e.map((e) => `<div class="tastesummary"><span class="board-stat-label">${e}</span><b class="board-stat-value">${W("45%")}</b><small class="board-stat-footer">${W("60%")}</small></div>`).join("")}</div>`, mr = (e, t) => `<div class="${t} skeleton-segments" data-board-segments="true">${e.map((e, t) => `<span${t === 0 ? " class=\"skeleton-segment-selected\"" : ""}>${e}</span>`).join("")}</div>`, q = (e) => `<section class="insightpanel"><header>${e}</header><div class="insightpanelbody skeleton-lines">${K(G(), 3)}</div></section>`, J = "disabled data-skeleton-action", Y = (e) => `<span class="skeleton skeleton-text" style="width:${e}"></span>`, X = (e, t, n = !1) => `<span class="skeleton" style="width:${e}px;height:${t}px;flex:none${n ? ";border-radius:50%" : ""}"></span>`, hr = "min-w-0 bg-background-secondary-default rounded-2xl shadow-card flex flex-col gap-3 px-6 py-5 max-sm:gap-2 max-sm:p-4", gr = () => `<div class="inline-grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-6">${[
	"关注创作者",
	"启用来源",
	"检查失败",
	"未看更新",
	"JAV 订阅",
	"未看新作"
].map((e) => `<div class="${hr}"><span class="text-body-medium text-text-secondary">${e}</span><b class="text-title-1-medium tabular-nums text-text-primary">${Y("3em")}</b></div>`).join("")}</div>`, _r = () => `<div data-section-nav data-section-items class="flex max-w-full flex-nowrap overflow-x-auto">${[
	"关注列表",
	"添加关注",
	"JAV 订阅源",
	"想要",
	"来源和凭证"
].map((e, t) => `<span class="whitespace-nowrap" aria-selected="${t === 0}">${e}</span>`).join("")}</div>`, vr = (e = "") => `<span class="group inline-flex items-center select-none gap-2"><span class="flex shrink-0 items-center justify-center rounded-sm size-4 border bg-background-primary-default shadow-xs border-border-checkbox-default"></span>${e ? `<span class="text-body-medium text-text-primary">${e}</span>` : ""}</span>`, yr = ({ table: e, sort: t, dir: n }) => {
	let r = In.find(([e]) => e === t)[1];
	return `<div class="flex flex-wrap items-center gap-2 follow-skeleton-toolbar"><h3 class="mr-auto text-title-2-medium text-text-primary">关注列表</h3><span class="text-body-2-regular text-text-secondary">${Y("132px")}</span>${V({
		glyph: "refresh-cw",
		label: "检查全部",
		compact: !0,
		attrs: J
	})}<span data-button-group role="group">${V({
		variant: "ghost",
		glyph: "layout-grid",
		attrs: `aria-pressed="${!e}"`
	})}${V({
		variant: "ghost",
		glyph: "table",
		attrs: `aria-pressed="${e}"`
	})}</span>${Yn(r)}${V({
		variant: "secondary",
		glyph: n === "asc" ? "arrow-up" : "arrow-down"
	})}${e ? "" : V({
		variant: "secondary",
		glyph: "chevron-up",
		label: "全部收起",
		compact: !0,
		attrs: J
	})}</div>`;
}, br = () => `<span class="flex shrink-0 items-center gap-1">${V({
	variant: "secondary",
	size: "small",
	glyph: "refresh-cw",
	attrs: J
})}${V({
	variant: "secondary",
	size: "small",
	glyph: "trash",
	attrs: J
})}</span>`, xr = () => `<div class="flex min-h-16 flex-wrap items-center gap-3 px-2 py-3 follow-skeleton-source">${vr()}<span class="flex min-w-0 grow flex-col gap-0.5"><span class="text-body-medium">${Y("8em")}</span></span><span class="flex shrink-0 items-center gap-1.5">${X(14, 14)}</span>${X(48, 24)}<span class="shrink-0 text-body-2-regular whitespace-nowrap text-text-secondary">${Y("113px")}</span>${br()}</div>`, Sr = (e) => `<section class="min-w-0 bg-background-primary-default rounded-2xl shadow-card flex flex-col overflow-hidden p-2 follow-skeleton-author"><div class="flex flex-wrap items-center gap-3 px-2 py-2.5" data-follow-author-header data-open>${X(32, 32, !0)}<b class="min-w-0 grow text-body-medium break-words text-text-primary">${Y("92px")}</b>${V({
	variant: "secondary",
	size: "small",
	glyph: "refresh-cw",
	attrs: J
})}<span class="flex shrink-0 items-center gap-1">${X(14, 14)}${X(14, 14)}</span>${V({
	variant: "secondary",
	size: "small",
	glyph: "check-check",
	label: "全选",
	attrs: J
})}${V({
	variant: "secondary",
	size: "small",
	glyph: "chevron-up",
	label: "收起",
	attrs: J
})}</div><div data-source-divider>${K(xr(), e)}</div></section>`, Cr = () => {
	try {
		return Number(JSON.parse(localStorage.getItem("peach.settings.v1") || "{}").followPageSize) || 20;
	} catch {
		return 20;
	}
}, wr = [
	["select", ""],
	["author", "创作者"],
	["source", "来源"],
	["provider", "站点"],
	["status", "状态"],
	["checked", "上次检查"],
	["actions", ""]
], Tr = {
	name: "author",
	source: "source",
	provider: "provider",
	status: "status",
	checked: "checked"
}, Er = "<svg viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\"><path d=\"M12.7071 15.2929C12.3166 15.6834 11.6834 15.6834 11.2929 15.2929L7.70711 11.7071C7.07714 11.0771 7.52331 10 8.41421 10H15.5858C16.4767 10 16.9229 11.0771 16.2929 11.7071L12.7071 15.2929Z\" fill=\"currentColor\"/></svg>", Dr = (e, { sort: t, dir: n }) => `<div data-board-data-table data-follow-table class="follow-skeleton-table"><div class="w-full overflow-x-auto"><table class="bui-table bui-table-sm"><thead><tr>${wr.map(([e, r]) => r ? `<th><span class="flex items-center gap-0.5">${r}<span data-sort-indicator${Tr[t] === e ? ` data-direction="${n === "asc" ? "ascending" : "descending"}"` : ""}>${Er}</span></span></th>` : "<th></th>").join("")}</tr></thead><tbody>${K(`<tr>${[
	vr(),
	`<span class="flex min-w-0 items-center gap-2">${X(32, 32, !0)}${Y("5em")}</span>`,
	Y("10em"),
	`<span class="flex items-center gap-1.5">${X(14, 14)}${Y("4em")}</span>`,
	X(48, 24),
	Y("113px"),
	br()
].map((e) => `<td>${e}</td>`).join("")}</tr>`, e)}</tbody></table></div></div>`, Or = (e, t) => `<div class="flex flex-wrap items-center justify-between gap-3"><span class="text-body-2-regular text-text-secondary">${Y("111px")}</span>${Yn(`每页 ${t} ${e ? "条" : "位"}`, { size: "sm" })}${X(204, 32)}</div>`, kr = (e) => {
	let t = e.followLayout === "table", n = Bn(e.followSort, e.followDir), r = e.followPageSize || Cr(), i = t ? Dr(r, n) : `${vr("全选本页")}<div class="flex flex-col gap-3">${Sr(3)}${Sr(4)}${Sr(3)}</div>`;
	return `<div class="peach-react"><div class="mx-auto flex w-full max-w-board flex-col gap-8">${gr()}<div class="flex flex-col gap-6">${_r()}<div class="flex flex-col gap-4"><div class="min-w-0 bg-background-secondary-default rounded-2xl shadow-card flex flex-col gap-4 px-6 py-5 max-sm:px-4 follow-skeleton-surface" data-layout="${t ? "table" : "default"}">${yr({
		table: t,
		...n
	})}${i}${Or(t, r)}</div></div></div></div></div>`;
};
function Ar() {
	return `<div data-stage-grid="" aria-hidden="true"><div data-stage-media="" class="skeleton-detail-media skeleton"></div><aside data-stage-side=""><div data-stage-side-content="" class="skeleton-lines">${W("85%")}${W("65%")}${K(G(), 4)}</div></aside></div>`;
}
function jr() {
	return `<div data-skeleton="detail" role="status" aria-label="正在读取作品详情">${Ar()}</div>`;
}
function Mr(e, t = {}) {
	let n = "";
	if (e === "/stats") n = ur();
	else if (e === "/taste") n = `<div class="tastepage"><header class="tastehead">${mr(["浏览器记录", "Peach 内部"], "insightswitch")}${W("24%")}</header><div class="tastestate"></div>${pr([
		"浏览记录",
		"口味维度",
		"浏览候选",
		"私有导出"
	], "tastesummaries")}<section class="tastehero"><div class="insightcopy"><span>浏览器画像</span><div class="skeleton skeleton-radar"></div></div><div class="tastebars skeleton-lines">${K(G(), 4)}</div></section>${q("口味分析")}<div class="board-activity-charts">${q("浏览活动")}${q("时间分布")}</div>${q("标签")}</div>`;
	else if (e === "/follow-manage") n = kr(t);
	else if (e === "/configuration") n = sr();
	else if (e === "/activity") n = `<div class="activitypage">${[
		"正在进行",
		"被挡下的",
		"最近完成"
	].map((e) => `<section class="activitysection"><h3 class="geist-fieldset-title">${e}</h3><div class="activity-runs"><article class="cleanupfieldset activity-run"><div class="geist-fieldset-content skeleton-lines">${W("35%")}${G()}</div></article></div></section>`).join("")}</div>`;
	else if (e === "/duplicates") n = dr();
	else if (e === "/quality-goals") n = fr();
	else if (e === "/playlists") n = `<section class="playlistpage"><header><div><h2>播放列表</h2><p>保存 Mix，按自己的顺序继续播放。</p></div><div class="playlistcreate skeleton-lines"><span>新播放列表</span>${W("200px")}</div></header><div class="playlistcards">${K(`<article class="card playlistcard"><div class="mixstack"><div class="pic skeleton"></div></div><div class="mixmeta"><span class="mav skeleton"></span><div class="mixcopy skeleton-lines">${G()}</div></div></article>`, 6)}</div></section>`;
	else return "";
	return `<div class="board-page-skeleton" data-skeleton="board${e}" role="status" aria-label="正在读取页面"><div aria-hidden="true" inert>${n}</div></div>`;
}
//#endregion
//#region src/catalog-onboarding.ts
var Nr = [
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
async function Pr(e, t) {
	let n = new URLSearchParams();
	for (let t of Nr) e[t] && n.set(t, e[t]);
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
function Fr({ kind: e = "catalog", filtered: t = !1, jav: n = !1, configurable: r = !1, online: i = !1 } = {}) {
	let a = r ? "<button class=\"geist-button primary\" data-empty-settings>添加内容</button>" : "", o = "<a class=\"geist-button" + (!r || i ? " primary" : "") + "\" href=\"/follow-manage?tab=add\">添加关注</a>";
	if (t || n) return c("search", n ? "还没有符合条件的 JAV 作品" : "没有符合条件的内容", n ? "已扫描但尚未补充发行资料的视频可在全部内容中查看。" : "清除筛选或搜索条件后查看全部内容。", { actions: "<a class=\"geist-button primary\" href=\"/?loc=&thumb=0\">查看全部内容</a>" });
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
		return c(e === "tags" ? "tags" : "user-round", "还没有" + t, i ? "添加关注来源并获取内容后，这里会显示来源上的" + t + "。" : "添加内容并补充资料后，这里会显示对应信息。", { actions: i ? o : a + o });
	}
	return c("play", "还没有视频", "添加媒体文件夹或关注来源，开始建立你的馆藏。", { actions: a + o });
}
//#endregion
//#region src/catalog-filter-skeleton.ts
var Ir = 64, Lr = (e) => e.replace(/[&<>"]/g, (e) => ({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;"
})[e]), Rr = (e) => e.repeat(Ir);
function zr(e, t) {
	let n = e.map((e) => `<a href="${Lr(e.href)}" data-catalog-view="${Lr(e.k)}" data-entity-press="" aria-pressed="${t === e.k}">${Lr(e.label)}</a>`).join("");
	return "<div class=\"peach-react\"><div class=\"contents\" data-catalog-root=\"\" data-loading=\"\"><div data-catalog-tiers=\"\" aria-busy=\"true\"><div data-catalog-tier=\"performers\" data-skeleton=\"tiers\">" + Rr("<span data-catalog-placeholder=\"performer\" aria-hidden=\"true\"><span></span><span>&nbsp;</span></span>") + "</div><div data-catalog-tier=\"studios\">" + Rr("<span data-catalog-placeholder=\"studio\" aria-hidden=\"true\"><span></span><span>&nbsp;</span></span>") + `</div></div><div role="group" aria-label="筛选与排序" data-filter-glass="" data-glass-pane="" data-filter-frame="" data-catalog-frame="" class="sticky top-topbar z-10 mb-5.5 flex flex-col mx-4"><div role="group" aria-label="视图与标签" data-filter-row="top" class="flex h-12 min-w-0 items-center overscroll-x-contain px-3 py-2 gap-1.5 overflow-visible"><div data-catalog-scroll=""><div role="group" aria-label="视图" data-catalog-views="">${n}<span data-entity-sep="" aria-hidden="true"></span></div><div data-catalog-tags=""><span data-catalog-placeholder="tag" aria-hidden="true">` + "<span></span>".repeat(Ir) + "</span></div></div></div><div data-filter-row=\"bottom\" aria-busy=\"true\" class=\"flex min-w-0 items-center gap-3 px-3 py-2 min-h-12\"><span data-catalog-readout=\"\"><span data-skeleton=\"count\" aria-hidden=\"true\" class=\"relative inline-block h-3.5 w-37.5 rounded-md align-middle skeleton-sheen\"></span></span></div></div></div></div>";
}
//#endregion
//#region src/management.ts
var Br = "扫描媒体文件夹，导入已有资料，采集缺失信息。两段也可以分开跑：新盘刚接上时先只扫描，几万个文件登记完就能用；采集被网络拖住时只重跑采集，不必再扫一遍磁盘。", Vr = "修缺时间戳表（播放卡顿）和缺索引（打不开）的 MP4。常看的片子先修。", Z = "<span class=\"skeleton skeleton-text\" aria-hidden=\"true\"></span>", Hr = "type=\"button\" disabled data-skeleton-action", Ur = "disabled data-skeleton-action", Wr = "aria-disabled=\"true\"", Gr = (e) => `<div class="peach-react"><div class="flex flex-col gap-4">${e}</div></div>`, Kr = (e, t) => `<div data-geist-fieldset-content>
          <h3 class="text-title-2-medium text-text-primary">${e}</h3>
          <p class="text-body-2-regular text-text-secondary">${t}</p></div>`;
function qr() {
	return Gr(`<section aria-label="扫描与采集" data-geist-fieldset data-cleanup-task data-cleanup-processing data-fieldset-stack>
        ${Kr("扫描与采集", Br)}
        <footer data-geist-fieldset-footer><a href="/scraping" class="inline-flex items-center justify-center gap-1 whitespace-nowrap font-sans rounded-sm text-body-medium text-accent-600"><span>来源和凭证</span>${qn("arrow-up", "size-[18px] shrink-0 rotate-90")}</a><span data-button-group data-split-button data-variant="primary">${V({
		glyph: "database",
		label: "扫描并补全资料",
		attrs: Ur
	})}${V({
		glyph: "chevron-down",
		attrs: `${Ur} aria-label="更多扫描与采集方式"`
	})}</span></footer>
      </section>`);
}
function Jr() {
	return Gr(`<section aria-label="媒体修复" data-geist-fieldset data-cleanup-task data-cleanup-processing>
        ${Kr("媒体修复", Vr)}
        <footer data-geist-fieldset-footer>${Yn(Z, {
		className: "w-48",
		attrs: Wr
	})}${V({
		label: "开始修复",
		attrs: Ur
	})}</footer>
      </section>`);
}
function Yr() {
	let e = [
		["人工复核", "square-check-big"],
		["高清版", "sparkles"],
		["重复文件", "file-stack"],
		["垃圾文件", "file-archive"],
		["回收站", "trash"]
	], t = `<span class="geist-button organize-preset-skeleton">${Z}</span>`.repeat(3), r = (e) => `<div class="organizefield"><span>${e}</span>
            <span class="geist-input organize-input-skeleton">${Z}</span></div>`;
	return `<div class="cleanuppage" data-skeleton="cleanup" aria-busy="true" aria-label="正在读取数据管理状态">
    <div class="cleanupstats">${e.map(([e, t]) => `
      <button type="button" class="board-plain-stat" disabled>
        <span class="board-plain-stat-head"><span class="board-stat-tile">${n(t)}</span>${e}</span>
        <strong>${Z}</strong><span class="cleanupmeta">${Z}</span></button>`).join("")}</div>
    <div class="cleanupgrid">
      <div class="cleanupscraping">${qr()}</div>
      <div class="cleanupmediarepair">${Jr()}</div>
      <section class="cleanupfieldset cleanuporganize" data-geist-fieldset data-cleanup-task aria-labelledby="cleanup-loading-organize">
        <div class="geist-fieldset-content"><h3 class="geist-fieldset-title" id="cleanup-loading-organize">整理</h3>
          <p>按模板给文件改名并归入目录。先预览，确认后执行；执行过的一批可以整批退回。</p>
          <div class="organizefields">
            <div class="organizesource"><span class="gselect"><span class="gselectfield organize-source-skeleton">${Z}${n("chevron-down")}</span></span></div>
            ${r("文件名模板")}
            ${r("目录模板")}
            <div class="organizepresets">${t}</div>
            <p class="cleanupmeta">${Z}</p>
          </div></div>
        <footer class="geist-fieldset-footer" data-geist-fieldset-footer><button class="geist-button primary" ${Hr}>预览</button></footer>
      </section></div>
    <section class="resourcesync" aria-labelledby="cleanup-loading-links">
      <h2 id="cleanup-loading-links">链接管理</h2>
      <div class="resourcesyncbox" data-geist-fieldset data-cleanup-task data-fieldset-stack>
        <div class="resourcesyncbody geist-fieldset-content"><h3 class="geist-fieldset-title">站外链接</h3>
          <div class="linksummary"><div class="linkstats"><div><span>链接总数</span><b>${Z}</b><small>${Z}</small></div>${[
		"官网/事务所",
		"社交账号",
		"作品资料站"
	].map((e) => `<div><span>${e}</span><b>${Z}</b></div>`).join("")}</div>
          <div class="linkhosts"><span>主要站点</span><b>${Z}</b></div></div></div>
        <div class="resourcesyncfooter geist-fieldset-footer" data-geist-fieldset-footer><button class="resourceaction primary" ${Hr}>${n("unlink")}<span>检查死链</span></button></div>
      </div></section>
    <section class="resourcesync" aria-labelledby="cleanup-loading-sync">
      <h2 id="cleanup-loading-sync">资源同步</h2>
      <div class="resourcesyncbox" data-geist-fieldset data-cleanup-task>
        <div class="resourcesyncbody geist-fieldset-content"><h3 class="geist-fieldset-title">文件与记录核对</h3>
          <p>按馆藏记录逐条查找本地磁盘与网盘上的文件，列出文件已不存在的记录、空文件夹，以及不再被引用的缓存。</p></div>
        <div class="resourcesyncfooter geist-fieldset-footer" data-geist-fieldset-footer><button class="resourceaction primary" ${Hr}>${n("git-compare")}<span>检查文件</span></button></div>
      </div></section></div>`;
}
//#endregion
//#region src/junk-queue.ts
var Xr = [
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
], Zr = (e) => Xr.find(([t]) => t === e)?.[0] ?? "";
function Qr(e) {
	let t = new URLSearchParams(e);
	return {
		kind: Zr(t.get("type")),
		view: t.get("view") === "dismissed" ? "dismissed" : "pending"
	};
}
function Q(e = "", t = "pending") {
	let n = new URLSearchParams();
	e && n.set("type", e), t === "dismissed" && n.set("view", "dismissed");
	let r = n.toString();
	return `/junk-files${r ? `?${r}` : ""}`;
}
function $r(e) {
	return e === "dismissed" ? {
		view: "pending",
		label: "返回待判断",
		glyph: "rotate-ccw",
		href: Q("", "pending")
	} : {
		view: "dismissed",
		label: "已排除",
		glyph: "eye-off",
		href: Q("", "dismissed")
	};
}
var ei = (e) => e === "dismissed" ? "已排除" : "待判断", ti = (e) => `<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${e}"></use></svg>`;
function ni({ kind: e, view: n }) {
	let r = Xr.map(([r, i, a]) => `<a href="${Q(r, n)}" data-junk-kind-link="${r}"${r === e ? " aria-current=\"page\"" : ""}>${ti(a)}${t(i)}</a>`).join(""), i = $r(n);
	return `<div class="peach-react" data-junk-count-skeleton=""><div data-junk-count=""><div data-junk-summary="" aria-live="polite">${tr(ei(n))}</div><div data-junk-filters-frame="" data-filter-glass="" data-glass-pane=""><span data-view-glide="" aria-hidden="true" hidden></span><nav data-junk-filters="" aria-label="垃圾文件分类">${r}<i data-junk-divider="" aria-hidden="true"></i><a href="${i.href}" data-junk-view-link="${i.view}"${n === "dismissed" ? " aria-current=\"page\"" : ""}>${ti(i.glyph)}${i.label}</a></nav></div></div></div>`;
}
//#endregion
//#region src/player/controls.ts
function ri(e, t) {
	e?.closest(".video-js")?.querySelector(`.vjs-control-bar ${t}`)?.click();
}
//#endregion
//#region src/player/playback.ts
function ii(e) {
	e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
}
function ai(e, t) {
	let n = e.duration, r = (e.currentTime || 0) + t;
	e.currentTime = Number.isFinite(n) ? Math.max(0, Math.min(n, r)) : Math.max(0, r);
}
//#endregion
//#region src/islands.ts
var oi = {
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
}, si = () => import("/dist/peach-react.js").then(() => void 0), ci = () => Object.keys(oi), $ = /* @__PURE__ */ new Map();
async function li(e, t, n, r = {}) {
	let i = oi[e];
	if (!i) throw Error(`未注册的 island：${String(e)}`);
	pi(t);
	let a = { controller: new AbortController() };
	$.set(t, a);
	let o = (await import("/dist/peach-react.js")).pages[i.react];
	try {
		await o.prefetch(n, a.controller.signal);
	} catch {
		if (a.controller.signal.aborted) return;
	}
	if (!di(t, a, r)) return;
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
function ui(e, t) {
	let n = e ? $.get(e) : void 0;
	!n?.update || !n.props || (n.props = {
		...n.props,
		...t
	}, n.update(n.props));
}
function di(e, t, n) {
	return $.get(e) === t ? n.isCurrent && !n.isCurrent() ? ($.delete(e), !1) : !0 : !1;
}
var fi = (e) => !!e && $.has(e);
function pi(e) {
	for (let t of [...$.keys()]) (t === e || e.contains(t)) && mi(t);
}
function mi(e) {
	let t = $.get(e);
	t && (t.controller.abort(), $.delete(e), t.dispose?.());
}
var hi = null;
function gi(e, t, n, r) {
	hi ??= import("/dist/peach-react.js").then((n) => (n.mountToaster(e, t), n)), hi.then((e) => e.showToast(n, r));
}
var _i = null, vi = null;
function yi(e) {
	return _i ??= import("/dist/peach-react.js").then((t) => (vi = t.configureStage(e), vi)), _i;
}
var bi = () => vi, xi = null, Si = null;
function Ci(e) {
	return xi ??= import("/dist/peach-react.js").then((t) => (Si = t.configureSettingsPanel(e), Si)), xi;
}
var wi = () => Si, Ti = null, Ei = null;
function Di(e) {
	return Ti ??= import("/dist/peach-react.js").then((t) => (Ei = t.configureImmerse(e), Ei)), Ti;
}
var Oi = () => Ei, ki = null, Ai = null;
function ji(e) {
	return ki ??= import("/dist/peach-react.js").then((t) => (Ai = t.configureSidebar(e), Ai)), ki;
}
var Mi = () => Ai, Ni = null, Pi = null;
function Fi(e) {
	return Ni ??= import("/dist/peach-react.js").then((t) => (Pi = t.configureManageHeader(e), Pi)), Ni;
}
var Ii = () => Pi, Li = null, Ri = null;
function zi(e) {
	return Li ??= import("/dist/peach-react.js").then((t) => (Ri = t.configureBatchDock(e), Ri)), Li;
}
var Bi = () => Ri;
//#endregion
export { Fe as COVER_FRONT_RATIO, xe as DEFAULT_SETTINGS, w as DEFAULT_SIDEBAR_ORDER, Ft as FACE_CEILING, Nt as FACE_TARGET, be as FEED_COMPILATION_KEYS, ve as FOLLOW_INITIAL_DAYS, Me as JAV_LAYOUTS, g as JAV_RELEASE_SORT, ye as METADATA_REFRESH_DAYS, Pt as MIN_FACE_PX, Pe as PHOTO_LAYOUTS, Ne as PHOTO_SIZES, ge as SETTINGS_KEY, h as SORTS, y as SORT_ALIASES, v as SORT_DIR_WORDS, _ as SORT_KEYS, _e as THEME_CHOICES, Ee as THEME_OPTIONS, Qe as TILES, Ut as advanceImageFallback, T as allowedSetting, D as appSettingsStore, nt as applyDensity, we as applySyncedSettings, ke as applyTheme, I as avatarFrame, F as avatarInner, Bi as batchDockApi, Mr as boardPageSkeleton, C as boundedPreference, sn as cardArtwork, dn as cardIdentity, Re as cardLayoutFor, Ge as cardRatio, Fr as catalogEmptyHtml, zr as catalogFilterSkeletonHtml, Pr as catalogSuggestions, jt as clampPage, Yr as cleanupSkeletonHtml, ri as clickPlayerControl, An as configureHoverPreview, L as coverAnchor, gn as coverBackdrop, yn as coverFace, rn as coverImage, vn as coverRatio, P as coverUrl, le as createSettingsStore, $e as currentDensity, b as defaultSortDir, un as detailPosterUrl, jr as detailSkeletonHtml, $t as entityAvatar, Qt as entityFaceImg, Fn as entitySkeletonHtml, nn as faceBoxAttrs, Rt as faceFrame, en as faceOrigin, tn as facePos, Gt as faceSourceScale, Lt as faceZoom, R as fitNativeImage, wt as followJobProgress, wn as frameCachedImages, We as gridLayout, It as hasFaceBox, Le as homeLayout, Ht as imageFallbackAttrs, Oi as immerseApi, at as initBoardControls, On as installCardArt, fi as islandMounted, ci as islandNames, on as javArtwork, ie as javImageKind, Ie as javLayout, St as jobActivityHtml, ni as junkCountSkeletonHtml, Q as junkPath, Qr as junkRoute, zi as loadBatchDock, Di as loadImmerse, Fi as loadManageHeader, Ci as loadSettingsPanel, ji as loadSidebar, yi as loadStage, Yt as logoUrl, Ii as manageHeaderApi, yt as manageHeaderSkeletonHtml, gt as manageHeaderView, cn as mixFace, pn as mixLabel, li as mountIsland, Kt as nativeImageFit, te as nextSortState, Se as normalizeAppSettings, S as normalizeJavImage, x as normalizeJavLayout, re as normalizeJavPreferences, pe as normalizeSidebarOrder, At as pageCount, Mt as paginationHtml, it as paintPhotoSizeButton, oe as panelFrame, Vt as parseFallbacks, Zt as performerLabel, He as photoLayout, Ve as photoSize, Te as postSearchHistoryLimit, hn as posterPanel, ne as preferredDirection, si as preloadIslands, fn as queueAvatarHtml, ln as queueThumbHtml, Ce as readAppSettings, Tn as refitNativeImages, En as relayoutCovers, ce as relayoutJavImages, Nn as releaseHover, Mn as releaseHoverPreviews, Jt as rememberRepresentatives, M as representativeOf, ai as seekVideoBy, Dt as selectGroup, Tt as selectRange, Et as selectionSummary, B as setHoverState, wi as settingsPanelApi, Cn as settleImage, gi as showToast, Mi as sidebarApi, me as sidebarHasCatalogContent, ft as sidebarSkeletonHtml, he as sidebarTagCounts, ee as sortDirWord, bi as stageApi, Ke as storeHomeLayout, qe as storeJavLayout, Xe as storePhotoLayout, Ye as storePhotoSize, Je as storeVideoLayout, k as syncBoardRange, se as syncJavImages, Ot as syncSelectionToolbar, rt as toggleDensity, ii as toggleVideoPlayback, dt as transitionTheme, pi as unmountIsland, ui as updateIsland, _n as upgradeCover, Ct as watchJob, Sn as watchPendingImages, je as watchSystemTheme, Pn as wireHover, Wt as wireImageFallbacks, N as withVersion };
