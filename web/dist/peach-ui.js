import { SKELETON_REVEAL_DELAY as e, emptyStateHtml as t, loadingDotsHtml as n, moveGlidePane as r, noteHtml as i, scrollMovesAnchor as a } from "/js/ui-components.js";
import { esc as o, icon as s } from "/js/core.js";
//#region src/sort-preferences.ts
function c(e, t, n) {
	return e === "seed" ? "" : e === t && n === "asc" ? "asc" : "desc";
}
//#endregion
//#region src/settings-store.ts
function l(e, t) {
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
//#region src/number-setting.ts
function u(e, t, n, r) {
	return Number.isInteger(e) && e >= t && e <= n ? e : r;
}
//#endregion
//#region src/board-controls.ts
function d(e) {
	let t = Number(e.min) || 0, n = Number(e.max) || 100, r = Number(e.value), i = n > t ? Math.max(0, Math.min(100, (r - t) / (n - t) * 100)) : 0;
	e.style.setProperty("--board-range-value", `${i}%`);
}
function f() {
	let e = (e) => {
		e.querySelectorAll("input[type=range]").forEach(d), g(e), m(e);
	};
	e(document), new MutationObserver((t) => {
		for (let n of t) for (let t of n.addedNodes) t instanceof Element && (t.matches("input[type=range]") && d(t), e(t));
	}).observe(document.body, {
		subtree: !0,
		childList: !0
	}), document.addEventListener("input", (e) => {
		e.target instanceof HTMLInputElement && e.target.type === "range" && d(e.target);
	});
	let t = document.createElement("div");
	t.className = "board-tooltip", t.id = "board-control-tooltip", t.role = "tooltip", t.hidden = !0, document.body.append(t);
	let n = null, r = "", i = null, o, s = () => {
		clearTimeout(o), t.hidden = !0, n && (n.hasAttribute("title") || (n.title = r), i === null ? n.removeAttribute("aria-describedby") : n.setAttribute("aria-describedby", i)), n = null;
	}, c = (e, a) => {
		let c = e instanceof Element ? e.closest("[title]") : null;
		!c || c === n || c.closest(".vjs-control") || !c.title.trim() || (s(), n = c, r = c.title, i = c.getAttribute("aria-describedby"), c.removeAttribute("title"), o = setTimeout(() => {
			if (n !== c || !c.isConnected) return;
			t.textContent = r, t.hidden = !1;
			let e = c.getBoundingClientRect(), a = t.getBoundingClientRect();
			t.style.left = `${Math.max(8, Math.min(innerWidth - a.width - 8, e.left + (e.width - a.width) / 2))}px`, t.style.top = `${e.top >= a.height + 16 ? e.top - a.height - 8 : Math.min(innerHeight - a.height - 8, e.bottom + 8)}px`, c.setAttribute("aria-describedby", [i, t.id].filter(Boolean).join(" "));
		}, a));
	};
	document.addEventListener("pointerover", (e) => c(e.target, 400)), document.addEventListener("pointerout", (e) => {
		n && !n.contains(e.relatedTarget) && s();
	}), document.addEventListener("focusin", (e) => c(e.target, 0)), document.addEventListener("focusout", s), document.addEventListener("keydown", (e) => {
		e.key === "Escape" && s();
	}), document.addEventListener("scroll", (e) => {
		n && a(e, n) && s();
	}, !0), window.addEventListener("resize", s);
}
var p = /* @__PURE__ */ new Map();
function m(e) {
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
			n(i), p.set(t, i);
		}, i = p.get(t);
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
var h = /* @__PURE__ */ new Map();
function g(e) {
	let t = ".iconswitch,.insightswitch,.follow-workspace-switch", n = [...e.querySelectorAll(t)];
	e instanceof HTMLElement && e.matches(t) && n.push(e), n.forEach((e) => {
		if (e.hasAttribute("data-board-segments") || e.closest("[data-skeleton]")) return;
		e.dataset.boardSegments = "true";
		let t = document.createElement("span");
		t.className = "board-segment-thumb", t.setAttribute("aria-hidden", "true"), e.prepend(t);
		let n = e.className + (e.getAttribute("aria-label") ?? ""), i = h.get(n) ?? null, a = () => {
			let a = e.querySelector("label:has(input:checked),button[aria-selected=true]");
			if (!a || !a.offsetWidth) return;
			let o = {
				x: a.offsetLeft,
				y: a.offsetTop,
				w: a.offsetWidth,
				h: a.offsetHeight
			};
			r(t, i, o, "x"), i = o, h.set(n, o);
		};
		e.addEventListener("change", a);
		let o = new MutationObserver(a);
		o.observe(e, {
			subtree: !0,
			attributes: !0,
			attributeFilter: ["aria-selected"]
		});
		let s = new ResizeObserver(() => {
			if (!e.isConnected) {
				s.disconnect(), o.disconnect();
				return;
			}
			a();
		});
		s.observe(e), a(), requestAnimationFrame(() => e.classList.add("board-segments-ready"));
	});
}
//#endregion
//#region src/theme-transition.ts
var _ = !1;
async function ee(e, t) {
	if (_) return;
	if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) {
		t();
		return;
	}
	let n = e.getBoundingClientRect(), r = n.left + n.width / 2, i = n.top + n.height / 2, a = Math.hypot(Math.max(r, innerWidth - r), Math.max(i, innerHeight - i)) * 2.5, o = document.createElement("style");
	o.textContent = `::view-transition-old(root){animation:none}::view-transition-new(root){mix-blend-mode:normal;mask-image:radial-gradient(circle closest-side,#000 78%,#0006 88%,transparent);mask-repeat:no-repeat;will-change:mask-position,mask-size;animation:peach-theme-reveal 560ms cubic-bezier(.16,1,.3,1) both}@keyframes peach-theme-reveal{from{mask-position:${r}px ${i}px;mask-size:0px 0px}to{mask-position:${r - a / 2}px ${i - a / 2}px;mask-size:${a}px ${a}px}}`, _ = !0, document.head.append(o);
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
		delete s.dataset.themeSnapshot, o.remove(), _ = !1;
	}
}
//#endregion
//#region src/sidebar-skeleton.ts
var v = (e) => e.replace(/[&<>"']/g, (e) => ({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
})[e]);
function y(e, t, n) {
	let r = new Map(t.map((e) => [e[0], e]));
	return `<div data-sidebar-head=""></div><div data-sidebar-nav="">${e.map((e) => r.get(e)).filter((e) => e !== void 0).map(([e, t, r]) => {
		let i = e === "" ? "<img data-sidebar-home-logo=\"\" src=\"/peach-logo.png\" alt=\"\">" : `<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${v(r)}"/></svg>`;
		return `<button type="button" data-nav="${v(e)}" aria-pressed="${n(e)}" aria-label="${v(t)}">${i}<span>${v(t)}</span></button>`;
	}).join("")}</div>`;
}
//#endregion
//#region src/manage-header.ts
var b = {
	"/junk-files": "垃圾文件",
	"/duplicates": "重复文件",
	"/review": "人工复核",
	"/trash": "回收站",
	"/quality-goals": "高清版",
	"/scraping": "来源和凭证"
}, x = /* @__PURE__ */ new Set(["/data-cleanup", "/scraping"]), te = ({ total: e, shown: t }) => `${e.toLocaleString()} 个符合 · 显示 ${t}`;
function ne(e) {
	let t = e.sections.find(([t]) => t === e.section);
	if (!t) return null;
	let n = b[e.path] ?? "";
	return {
		title: e.section === "cleanup" && n || t[1],
		crumb: n,
		compact: x.has(e.path) || e.section === "configuration",
		lede: e.section === "trash" ? e.trash ? {
			kind: "count",
			text: te(e.trash),
			total: e.trash.total
		} : { kind: "skeleton" } : { kind: "none" }
	};
}
var S = (e) => e.replace(/[&<>"']/g, (e) => ({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
})[e]), re = (e) => `<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${S(e)}"/></svg>`, ie = "<span class=\"skeleton\" data-trash-lede-skeleton=\"text\" aria-hidden=\"true\"></span><span class=\"skeleton\" data-trash-lede-skeleton=\"action\" aria-hidden=\"true\"></span>";
function ae(e) {
	let t = ne(e);
	if (!t) return "";
	let n = e.menu.map(([t, n, r]) => {
		let i = t === e.section;
		return `<button type="button" data-manage="${S(t)}" aria-pressed="${i}"${i ? " aria-current=\"page\"" : ""}>${re(r)}<span>${S(n)}</span></button>`;
	}).join(""), r = t.crumb ? `<nav data-manage-crumb="" aria-label="Breadcrumb"><ol><li><a href="/data-cleanup">数据管理</a>${re("chevron-right")}</li><li aria-current="true"><span>${S(t.crumb)}</span></li></ol></nav>` : "", i = t.lede.kind === "none" ? "" : `<p class="mono" data-manage-lede="">${t.lede.kind === "skeleton" ? ie : `<span data-lede-text="">${S(t.lede.text)}</span>${t.lede.total ? oe : ""}`}</p>`;
	return `<nav data-manage-bar="" aria-label="管理"><div data-manage-menu="">${n}<span data-manage-indicator="" aria-hidden="true"></span></div></nav>` + r + `<h2 data-manage-title=""${t.compact ? " data-compact=\"\"" : ""}>${S(t.title)}</h2>` + i;
}
var oe = "<button type=\"button\" data-empty-trash=\"\" title=\"永久删除回收站内容\">清空回收站</button>";
//#endregion
//#region src/jobs.ts
function se(e, t, n) {
	if (!Number.isFinite(n) || n <= 0) return "";
	let r = Math.max(0, Math.min(n, Number.isFinite(t) ? t : 0)), i = r / n * 100;
	return `<div class="board-job-progress" role="progressbar" aria-label="${o(e)}" aria-valuemin="0" aria-valuemax="${n}" aria-valuenow="${r}"><svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true"><circle class="board-job-track" cx="18" cy="18" r="15"/><circle class="board-job-fill" cx="18" cy="18" r="15" pathLength="100" stroke-dasharray="${i} ${100 - i}" transform="rotate(-90 18 18)"/></svg><span>${o(e)}<small>${Math.round(i)}%</small></span></div>`;
}
function ce(e, t = 0, r = 0) {
	return r > 0 ? se(e, t, r) : n(e);
}
async function le(e) {
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
function ue(e) {
	let t = e.note || ((e) => i(e, {
		label: "任务状态",
		variant: "error"
	})), r = e.loading || n, a = e.progress || ((e, t, n) => ce(n || `已处理 ${e} / ${t}`, e, t)), o = e.container || ((e) => `<section class="followtask" data-geist-fieldset aria-label="任务进度"><div class="geist-fieldset-content">${e}</div></section>`), s = document.createElement("div");
	e.host.hidden = !0, s.dataset.followJob = "", s.setAttribute("aria-live", "polite"), e.host.prepend(s);
	let c = e.storageKey || "peach-follow-job", l = sessionStorage.getItem(c) || void 0, u = !1;
	le({
		read: e.read,
		active: () => !u && e.active() && s.isConnected,
		keepWatching: e.watchIdle !== !1,
		render: (n) => {
			let i = n.status === "running";
			if (e.host.hidden = !i, e.busy(i), i) {
				l = n.job_id, l && sessionStorage.setItem(c, l);
				let t = n.current, i = (t?.attempt || 1) > 1 ? ` · 第 ${t?.attempt}/${t?.max_attempts} 次尝试${t?.retry_in ? `，${t.retry_in} 秒后重试` : ""}` : "", u = (n.message || (e.title ? e.title + (n.total ? `：已完成 ${n.checked || 0}/${n.total}` : "") : "") || (n.total ? `${n.older ? "抓取历史" : "检查更新"}：已完成 ${n.checked || 0}/${n.total} 个来源` : "正在准备检查任务…")) + (t ? ` · ${t.label || t.provider || ""}${i}` : ""), d = (n.total || 0) > 0 ? a(n.checked || 0, n.total, u) : r(u);
				s.innerHTML = o(d);
			} else if (l && l === n.job_id) l = void 0, u = !0, e.host.hidden = n.status !== "failed", sessionStorage.removeItem(c), s.innerHTML = n.status === "failed" ? t(n.error || "检查失败") : "", e.complete(n);
			else {
				if (l && n.status === "idle") {
					e.host.hidden = !1, s.innerHTML = t("任务状态已失效，请重新发起任务"), sessionStorage.removeItem(c), u = !0;
					return;
				}
				s.innerHTML = "";
			}
		},
		disconnected: () => {
			e.host.hidden = !1, s.innerHTML = t("暂时无法读取进度，正在重新连接…");
		}
	});
}
//#endregion
//#region src/selection.ts
function de(e, t, n, r, i, a = i || !e.has(r)) {
	let o = n === null ? -1 : t.indexOf(n), s = t.indexOf(r);
	return i && o >= 0 && s >= 0 ? t.slice(Math.min(o, s), Math.max(o, s) + 1).forEach((t) => e.add(t)) : a ? e.add(r) : e.delete(r), r;
}
function fe(e, t) {
	let n = t.filter((t) => e.has(t)).length;
	return {
		count: n,
		all: n > 0 && n === t.length,
		mixed: n > 0 && n < t.length
	};
}
function pe(e, t, n) {
	t.forEach((t) => n ? e.add(t) : e.delete(t));
}
function me({ count: e, label: t, all: n, summary: r, actions: i, locked: a = !1 }) {
	e && (e.textContent = t), n && (n.checked = r.all, n.indeterminate = r.mixed);
	for (let e of i) e.disabled = !r.count || a;
}
function he(e, t, n = 1) {
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
function ge(e, t) {
	return Math.max(1, Math.ceil(e / t));
}
function _e(e, t) {
	return Math.min(Math.max(1, Math.floor(e) || 1), t);
}
function ve(e, t, n) {
	if (t <= 1) return "";
	let r = he(e, t).map((t) => t === "…" ? "<li class=\"board-page-dots\" aria-hidden=\"true\">…</li>" : `<li><button type="button" class="board-page" data-page="${t}" aria-label="第 ${t} 页"${t === e ? " aria-current=\"page\"" : ""}>${t}</button></li>`).join("");
	return `<nav class="board-pagination" aria-label="${n}">
    <button type="button" class="geist-button" data-page="${e - 1}"${e <= 1 ? " disabled" : ""}><svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-chevron-left"></use></svg>上一页</button>
    <ul>${r}</ul>
    <button type="button" class="geist-button" data-page="${e + 1}"${e >= t ? " disabled" : ""}>下一页<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-chevron-right"></use></svg></button>
  </nav>`;
}
//#endregion
//#region src/card-art/face-frame.ts
var C = .32, ye = 13, w = .6;
function T(e) {
	return e ? Number.isFinite(e.cx) && Number.isFinite(e.cy) && Number(e.faceW) > 0 && Number(e.imgW) > 0 && Number(e.imgH) > 0 : !1;
}
function be(e, t, n = 1, r = C, i = w) {
	if (!T(e) || !(t && t.w > 0 && t.h > 0)) return 1;
	let a = n > 0 ? n : 1, o = Math.max(t.w / e.imgW, t.h / e.imgH), s = e.faceW * o;
	if (!(s > 0)) return 1;
	let c = Math.min(t.w, t.h), l = Math.max(r, 13 / c) * c / s, u = Math.max(t.w / (2 * Math.min(e.cx, 1 - e.cx) * e.imgW * o), t.h / (2 * Math.min(e.cy, 1 - e.cy) * e.imgH * o)), d = e.faceW / (s * a);
	return Math.max(1, Math.min(Math.max(l, Math.min(u, i * c / s)), d));
}
function xe(e, t, n = 1, r = C, i = w) {
	let a = be(e, t, n, r, i);
	if (a <= 1 || !T(e) || !t) return null;
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
var Se = "|", Ce = "closest:";
function we(e) {
	return String(e ?? "").split(Se).map((e) => e.trim()).filter(Boolean);
}
function Te({ drop: e = "self", fallbacks: t = [], initial: n = "", dropClass: r = "", dropStyle: i = !1 } = {}) {
	let a = (Array.isArray(t) ? t : [t]).filter(Boolean);
	return [
		`data-drop="${o(e)}"`,
		a.length ? `data-fallbacks="${o(a.join(Se))}"` : "",
		n ? `data-initial="${o(n)}"` : "",
		r ? `data-drop-class="${o(r)}"` : "",
		i ? "data-drop-style" : ""
	].filter(Boolean).join(" ");
}
function Ee(e) {
	if (!e || !e.dataset || !e.dataset.drop) return "";
	let t = we(e.dataset.fallbacks);
	if (t.length) {
		let [n = "", ...r] = t;
		return "dropStyle" in e.dataset && e.removeAttribute("style"), delete e.dataset.facebox, r.length ? e.dataset.fallbacks = r.join(Se) : delete e.dataset.fallbacks, e.src = n, "retry";
	}
	let n = e.dataset.drop;
	if (n.startsWith(Ce)) return (e.closest(n.slice(8)) || e).remove(), "drop";
	if (n === "initial") {
		let t = document.createElement("span");
		return t.className = e.dataset.dropClass || "", t.textContent = e.dataset.initial || "", e.replaceWith(t), "drop";
	}
	return e.remove(), "drop";
}
function De(e) {
	e.addEventListener("error", (e) => {
		e.target instanceof HTMLImageElement && Ee(e.target);
	}, !0);
}
//#endregion
//#region src/card-art/native-image.ts
function Oe(e, t, n, r) {
	if (!(e > 0 && t > 0 && n > 0 && r > 0)) return 0;
	let i = e / n, a = t / r;
	return i > 1.001 || a > 1.001 || Math.abs(i - a) > Math.max(i, a) * .01 ? 0 : i;
}
function ke(e, t, n, r, i = 1) {
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
var Ae = /* @__PURE__ */ new Map();
function je(e) {
	(e || []).forEach((e) => {
		e.rep && e.has_avatar && Ae.set(e.k, e.rep);
	});
}
function E(e) {
	return Ae.get(e);
}
//#endregion
//#region src/jav-artwork.ts
function Me(e) {
	return [
		"small",
		"sleeve",
		"preview"
	].includes(String(e)) ? "small" : "big";
}
function Ne(e) {
	return {
		javLayout: Me(e.javLayout),
		javImage: D(e.javLayout === "preview" ? "thumbnail" : e.javImage)
	};
}
function D(e) {
	return e === "thumbnail" ? "thumbnail" : "cover";
}
function Pe(e, t) {
	return e.is_jav && e.code && e.has_cover && (D(t) === "cover" || !e.has_thumb) ? "cover" : e.has_thumb ? "thumbnail" : "";
}
var Fe = .704;
function Ie(e, t) {
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
function Le(e, t) {
	e.querySelectorAll("img[data-jav-image]").forEach((e) => {
		let n = e.dataset.javCover || "", r = e.dataset.javThumb || "", i = !!(n && (D(t) === "cover" || !r)), a = i ? n : r;
		e.classList.toggle("cover", i), e.classList.toggle("whole", i && e.dataset.javImageLayout !== "big"), e.classList.toggle("front", i && e.dataset.javImageLayout === "big"), e.classList.remove("panel"), e.removeAttribute("style"), e.closest(".pic,[data-media-pic]")?.style.removeProperty("--cover-blur"), a && e.getAttribute("src") !== a && (e.src = a);
	});
}
function Re(e, t) {
	let n = [];
	return e.querySelectorAll("img[data-jav-image]").forEach((e) => {
		e.dataset.javImageLayout !== t && (e.dataset.javImageLayout = t, e.classList.contains("cover") && (e.classList.toggle("whole", t !== "big"), e.classList.toggle("front", t === "big"), e.classList.remove("panel"), e.removeAttribute("style"), e.closest(".pic,[data-media-pic]")?.style.removeProperty("--cover-blur"), e.complete && e.naturalWidth && n.push(e)));
	}), n;
}
//#endregion
//#region src/card-art/markup.ts
var ze = (e) => e && typeof e == "object" ? e : null;
function Be(e) {
	return e && e.is_jav ? "女优" : "艺人";
}
function Ve({ kind: e = "performer", id: t = null, hasImage: n = !1, version: r = "", rep: i = null, mark: a = null, logo: o = "", logoVariant: s = "logo", alt: c = "", lazy: l = !0, style: u = "", dropStyle: d = !1, focus: f = null, thumb: p = !1 } = {}) {
	let m = !!(t && n), h = m ? `/entity-image?kind=${e}&id=${t}${p ? "&thumb=1" : ""}` + (r ? `&v=${encodeURIComponent(r)}` : "") : "", g = i ? `/avatar?id=${i}` : "", _ = !!o, ee = _ ? `/logo?studio=${encodeURIComponent(o)}&variant=${s}` : h || g || (a ? `/link-mark?id=${a}` : "");
	if (!ee) return "";
	let v = _ ? [h, g].filter(Boolean) : m && g ? [g] : [], y = m && !_, b = y ? Ge(f) : "", x = u || We(f);
	return `<img src="${ee}" alt="${c}"${l ? " loading=\"lazy\"" : ""} decoding="async"${y ? x : ""} ${b}${Te({
		dropStyle: (d || !!b || !!x) && y,
		fallbacks: v
	})}>`;
}
function O(e, t, n, r = "performer", i = null, a = "", s = "icon", c = void 0, l = !1) {
	let u = c === void 0 ? t && t.avatar_focus || null : c;
	return `<span class="ini">${o((e || "?").slice(0, 1))}</span>` + Ve({
		kind: r,
		id: t && t.id,
		hasImage: !!(t && t.has_image),
		version: t && t.image_version,
		rep: n,
		mark: i,
		logo: a,
		logoVariant: s,
		focus: u,
		thumb: l
	});
}
function He(e, t, n) {
	return O(e, t, n ? E(e) : null, n || "performer");
}
function Ue(e) {
	let t = ze(e);
	return t && t.axis === "x" ? `${t.pct}% 50%` : t && t.axis === "y" ? `50% ${t.pct}%` : "";
}
function We(e) {
	let t = Ue(e);
	return t ? ` style="object-position:${t}"` : "";
}
function Ge(e) {
	let t = ze(e)?.box;
	return t ? ` data-facebox="${[
		t.cx,
		t.cy,
		t.faceW,
		t.imgW,
		t.imgH
	].map(Number).join(" ")}"` : "";
}
function Ke(e, t, n = !1) {
	let r = `/cover?code=${encodeURIComponent(e.code || "")}&thumb=1`, i = e.cover_frame || {}, a = [i.cx == null ? "" : ` data-cx="${i.cx}"`, i.cy == null ? "" : ` data-cy="${Math.min(.6, Math.max(.05, i.cy))}"`].join(""), o = e.poster_box, s = o ? ` data-posterbox="${[
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
var qe = {
	kind: "",
	html: ""
};
function Je(e, t, n, r) {
	let i = Pe(e, r);
	if (!i) return qe;
	let a = e.has_cover && e.code ? `/cover?code=${encodeURIComponent(e.code)}&thumb=1` : "", s = e.has_thumb || e.has_local_poster ? `/poster?id=${e.id}&c=4` : "", c = Ke(e, t, n), l = (c.match(/ data-(?:c[xy]|posterbox)="[^"]*"/g) || []).join(""), u = i === "cover" ? c : `<img class="poster" src="${s}" alt="" loading="${n ? "eager" : "lazy"}"${l}>`;
	return {
		kind: i === "cover" ? "cover" : "thumb",
		html: u.replace("<img ", `<img data-jav-image="${e.id}" data-jav-cover="${o(a)}" data-jav-thumb="${o(s)}" data-jav-image-layout="${t}" `)
	};
}
function Ye(e, t, n, r) {
	return e.is_jav ? Je(e, t, n, r) : e.follow_thumb_url ? {
		kind: "thumb",
		html: `<img class="poster" src="${o(e.follow_thumb_url)}" alt="" loading="${n ? "eager" : "lazy"}" referrerpolicy="no-referrer">`
	} : k(e, t, n, r);
}
function k(e, t, n, r) {
	return e.is_jav ? Je(e, t, n, r) : !e.has_thumb && !e.has_local_poster ? qe : {
		kind: "thumb",
		html: `<img class="poster" src="/poster?id=${e.id}&c=4" alt="" loading="${n ? "eager" : "lazy"}">`
	};
}
function Xe(e, t) {
	return k(e, "small", !1, t).html || "<span class=\"nopic\">无预览</span>";
}
function Ze(e, t) {
	let n = e.has_thumb || e.has_local_poster ? `/poster?id=${e.id}&c=4` : "";
	return e.is_jav && Pe(e, t) === "cover" ? `/cover?code=${encodeURIComponent(e.code || "")}` : n;
}
function Qe(e) {
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
function $e(e) {
	let { kind: t, name: n, coStarred: r, performers: i, refs: a } = Qe(e);
	return r ? `<div class="mavstack">${i.slice(0, 5).map((e, t) => `<span class="mav">${O(e, a[t], E(e))}</span>`).join("")}</div>` : `<span class="mav">${O(n, t === "performer" ? a[0] : e.creator_entity, t ? E(n) : null, t || "performer")}</span>`;
}
function et(e, t) {
	let n = (e.performers || [])[0];
	return (e.is_jav && n ? n : e.creator) || n || e.studio || e.code || t((e.tags || [])[0] || "") || "为你推荐";
}
//#endregion
//#region src/card-art/framing.ts
var tt = () => window.devicePixelRatio || 1;
function A(e) {
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
			r.width > 0 && r.height > 0 && (n.disconnect(), A(e));
		});
		n.observe(t);
		return;
	}
	let [r = NaN, i = NaN, a = NaN, o = NaN, s = NaN] = String(e.dataset.facebox).split(" ").map(Number), c = Oe(e.naturalWidth, e.naturalHeight, o, s);
	if (!c) {
		e.style.objectPosition = "50% 50%";
		return;
	}
	let l = xe({
		cx: r,
		cy: i,
		faceW: a * c,
		imgW: o * c,
		imgH: s * c
	}, {
		w: n.width,
		h: n.height
	}, tt());
	if (!l) return;
	let u = e.style;
	u.position = "absolute", u.right = "auto", u.bottom = "auto", u.left = `${l.left}%`, u.top = `${l.top}%`, u.width = `${l.width}%`, u.height = `${l.height}%`, u.maxWidth = "none", u.maxHeight = "none";
}
function j(e) {
	let t = e.naturalWidth / e.naturalHeight;
	if (!t) return;
	let n = new URL(e.currentSrc || e.src, location.href).searchParams.get("code") || "";
	e.dataset.frame = /^FC2(?:-PPV)?-/i.test(n) || t >= 1.65 ? "still" : t > 1.2 ? "sleeve" : "front";
	let r = it(e), i = (t, n, r) => {
		if (n == null || !(r > 0 && r < 1)) return;
		let i = Math.min(1, Math.max(0, (n - r / 2) / (1 - r)));
		e.style.setProperty(t, `${Math.round(i * 100)}%`);
	};
	i("--cover-x", at(e, "cx"), r / t), i("--cover-y", at(e, "cy"), t / r), nt(e, r), (e.classList.contains("whole") || e.dataset.frame === "front") && Math.abs(t / r - 1) > .02 && rt(e);
}
function nt(e, t) {
	if (e.dataset.frame === "front") return;
	let [n = NaN, r = NaN, i = NaN, a = NaN, o = NaN, s = NaN] = String(e.dataset.posterbox || "").split(" ").map(Number);
	if (!e.dataset.posterbox && e.dataset.frame === "sleeve" && (r = e.naturalWidth, i = e.naturalHeight, n = Math.round(r - Fe * i), a = 0, o = r, s = i), !Oe(e.naturalWidth, e.naturalHeight, r, i)) return;
	let c = Ie({
		x0: n,
		y0: a,
		x1: o,
		y1: s,
		px: [r, i]
	}, t);
	c && (e.classList.add("panel"), e.style.setProperty("--panel-clip", `${c.clip.top}% ${c.clip.right}% ${c.clip.bottom}% ${c.clip.left}%`), e.style.setProperty("--panel-left", `${c.left}%`), e.style.setProperty("--panel-top", `${c.top}%`), e.style.setProperty("--panel-height", `${c.height}%`), rt(e));
}
function rt(e) {
	e.closest(".pic,[data-media-pic]")?.style.setProperty("--cover-blur", `url("${e.dataset.thumbSrc || e.currentSrc || e.src}")`);
}
function M(e) {
	if (!/[?&]thumb=1(&|$)/.test(e.src) || !e.naturalWidth) return;
	let { width: t, height: n } = e.getBoundingClientRect();
	(getComputedStyle(e).objectFit === "contain" ? Math.min : Math.max)(t / e.naturalWidth, n / e.naturalHeight) * tt() > 1.01 && (e.dataset.thumbSrc = e.src, e.src = e.src.replace(/[?&]thumb=1(?=&|$)/, ""));
}
function it(e) {
	let t = getComputedStyle(e).getPropertyValue("--card-ratio").trim().split("/").map(Number), n = t.length === 2 ? Number(t[0]) / Number(t[1]) : Number(t[0]);
	return Number.isFinite(n) && n > 0 ? n : 16 / 9;
}
function at(e, t) {
	let n = parseFloat(e.dataset[t] ?? "");
	return Number.isFinite(n) ? n : null;
}
var ot = ".pic>img.poster,[data-media-art]>img,.ring>img,[data-tier-ring]>img,[data-person-ring]>img,[data-entity-portrait]>img,[data-hero-ring]>img", st = /* @__PURE__ */ new WeakMap();
function ct(e) {
	let t = e.matches(ot) ? [e] : e.querySelectorAll(ot);
	for (let e of t) !e.complete && e.parentElement && (e.parentElement.classList.add("imgwait"), st.set(e.parentElement, performance.now()));
}
function lt(t) {
	let n = t.parentElement;
	if (!n?.classList.contains("imgwait")) return;
	if (performance.now() - (st.get(n) ?? NaN) < e) {
		n.classList.remove("imgwait");
		return;
	}
	n.classList.replace("imgwait", "imgdone");
	let r, i = (e) => {
		e && (e.target !== n || e.pseudoElement !== "::after") || (n.removeEventListener("transitionend", i), clearTimeout(r), n.classList.remove("imgdone"));
	};
	n.addEventListener("transitionend", i), r = setTimeout(i, 1e3);
}
function ut(e) {
	let t = "img.cover,img[data-facebox]", n = e.matches(t) ? [e] : e.querySelectorAll(t);
	for (let e of n) {
		let t = e;
		t.complete && t.naturalWidth && (t.classList.contains("cover") ? j(t) : (N(t), A(t)));
	}
}
function N(e) {
	let t = e.closest("[data-fit-native]");
	if (!t || !e.naturalWidth) return;
	let { small: n, width: r, height: i } = ke(e.naturalWidth, e.naturalHeight, t.clientWidth, t.clientHeight, tt());
	t.dataset.nativeSmall = String(n), t.style.setProperty("--markw", n ? r + "px" : "100%"), t.style.setProperty("--markh", n ? i + "px" : "100%");
	let a = (e.currentSrc || e.src).replace(/"/g, "%22");
	t.style.setProperty("--markbg", n ? `url("${a}")` : "none");
}
function dt(e) {
	(e || document).querySelectorAll("[data-fit-native] img").forEach((e) => {
		N(e), e.dataset.facebox && A(e);
	});
}
function ft(e, t) {
	for (let n of Re(e, t)) j(n), M(n);
}
var pt = !1;
function mt() {
	pt || (pt = !0, document.addEventListener("load", (e) => {
		let t = e.target;
		t instanceof HTMLImageElement && (lt(t), N(t), t.classList.contains("cover") ? (j(t), M(t)) : t.dataset.facebox && A(t));
	}, !0), new MutationObserver((e) => {
		for (let t of e) for (let e of t.addedNodes) e.nodeType === Node.ELEMENT_NODE && (ct(e), ut(e));
	}).observe(document.body, {
		childList: !0,
		subtree: !0
	}), document.addEventListener("error", (e) => {
		let t = e.target;
		t instanceof HTMLImageElement && !t.dataset.fallbacks && lt(t);
	}, !0));
}
//#endregion
//#region src/card-art/hover.ts
var ht = ".card,[data-media-card],[data-mix-card]", P = {
	selecting: () => !1,
	censored: () => !1,
	delaySeconds: () => 0
};
function gt(e) {
	P = e;
}
var _t = () => !!window.__scrolling;
function F(e = document, t = null) {
	!e || !e.querySelectorAll || (e.querySelectorAll(ht).forEach((e) => {
		e !== t && e._stopHover && e._stopHover();
	}), e.querySelectorAll("video.hv").forEach((e) => {
		e.closest(ht) !== t && (e._hop && clearInterval(e._hop), e.pause(), e.removeAttribute("src"), e.load(), e.remove());
	}), e.querySelectorAll("img.hvframes").forEach((e) => {
		e.closest(ht) !== t && (e.removeAttribute("src"), e.remove());
	}));
}
function vt(e) {
	e._stopHover?.(), F(e);
}
function I(e, t, n) {
	n ? e.dataset[t] = "" : delete e.dataset[t];
}
function yt(e, t) {
	let n = e, r = e.querySelector("[data-media-pic]");
	if (!r) return;
	e.dataset.hoverMode = t.location === "local" ? "video" : "frames";
	let i, a = () => {
		clearTimeout(i), P.delaySeconds() && (I(e, "previewing", !0), i = setTimeout(() => {
			P.delaySeconds() && I(e, "longhover", !0);
		}, P.delaySeconds() * 1e3));
	}, o = () => {
		clearTimeout(i), I(e, "previewing", !1), I(e, "longhover", !1);
	};
	if (t.location !== "local") {
		if (!t.has_thumb) return;
		let i, s = 4, c = null, l = !1;
		e.addEventListener("mouseenter", () => {
			P.selecting() || P.censored() || (a(), c || (c = document.createElement("img"), c.className = "hvframes", c.alt = "", c.src = `/poster?id=${t.id}&c=${s}`, r.appendChild(c)), clearInterval(i), i = setInterval(() => {
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
		P.selecting() || P.censored() || _t() || (s = setTimeout(() => {
			if (_t() || P.censored()) return;
			F(document, e);
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
function bt(e, t, n) {
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
var xt = [
	["checked", "检查时间"],
	["added", "添加时间"],
	["name", "创作者名称"],
	["sources", "来源数量"],
	["source", "来源名称"],
	["provider", "站点"],
	["status", "状态"]
], St = "checked", Ct = {
	checked: "desc",
	added: "desc",
	name: "asc",
	sources: "desc",
	source: "asc",
	provider: "asc",
	status: "asc"
}, wt = (e) => xt.some(([t]) => t === e);
function Tt(e, t) {
	let n = wt(e) ? e : St;
	return {
		sort: n,
		dir: t === "asc" || t === "desc" ? t : Ct[n]
	};
}
//#endregion
//#region src/island-skeleton.ts
var Et = "inline-flex items-center justify-center gap-0.5 whitespace-nowrap overflow-hidden font-sans", Dt = {
	medium: "h-9 rounded-2lg p-2 text-body-medium",
	small: "h-8 rounded-lg px-2 py-1.5 text-body-medium"
}, Ot = {
	medium: Dt.medium,
	small: "size-8 rounded-lg p-0 text-body-medium"
}, kt = {
	medium: "size-5 shrink-0",
	small: "size-[18px] shrink-0"
}, At = {
	medium: "inline-flex items-center justify-center px-1 shrink-0",
	small: "inline-flex items-center justify-center px-0.5 shrink-0"
}, jt = {
	primary: "bg-button-primary text-text-white shadow-xs",
	secondary: "bg-background-primary-default text-text-primary border border-border-button-default shadow-xs",
	ghost: "bg-button-ghost-background text-button-ghost-foreground"
}, L = (e, t) => `<svg class="${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><use href="#i-${e}"/></svg>`;
function R({ variant: e = "primary", size: t = "medium", glyph: n, label: r, attrs: i = "", compact: a = !1 }) {
	let o = r ? Dt[t] : Ot[t], s = n ? L(n, kt[t]) : "", c = r ? `<span class="${At[t]}"${a ? " data-compact-label" : ""}>${r}</span>` : "";
	return `<button type="button" class="${Et} ${o} ${jt[e]}"${i ? ` ${i}` : ""}>${s}${c}</button>`;
}
var Mt = {
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
function z(e, { size: t = "md", className: n = "", attrs: r = "" } = {}) {
	let i = Mt[t];
	return `<div class="group flex flex-col${n ? ` ${n}` : ""}"><button type="button" aria-haspopup="listbox"${r ? ` ${r}` : ""} class="flex w-full items-center justify-between rounded-2lg border border-border-button-default bg-background-primary-default shadow-xs text-text-primary ${i.box}"><span class="flex min-w-0 items-center truncate ${i.value}">${e}</span>${L("chevron-down", `shrink-0 text-text-secondary ${i.chevron}`)}</button></div>`;
}
var Nt = "flex items-end justify-between gap-4 rounded-surface bg-background-secondary-default px-6 py-5 max-compact:flex-col max-compact:items-start max-compact:gap-3 max-compact:p-4 dark:bg-background-primary-default", Pt = "flex min-w-0 flex-col gap-2", Ft = "text-body-regular text-text-secondary", It = "text-display-4-medium tabular-nums text-text-primary", Lt = "relative inline-block h-8 w-24 rounded-2lg align-middle skeleton-sheen";
function Rt(e) {
	return `<div data-collection-summary="" class="${Nt}"><div class="${Pt}"><span class="${Ft}">${e}</span><strong class="${It}"><span data-skeleton="count" aria-hidden="true" class="${Lt}"></span></strong></div></div>`;
}
//#endregion
//#region src/configuration-copy.ts
var zt = "JavDB 或 MISSAV 无法访问时，可填写能访问的镜像域名，Peach 会保留人物页路径。 资料页只显示已有站点身份记录的入口；JavDB 和 MISSAV 还要求有 JAV 目录站记录。 缺少这些记录的 FC2 创作者不会显示这两个入口。", Bt = "仅填域名；留空使用默认地址", Vt = (e, t) => `<section aria-label="${e}" class="flex w-full flex-col gap-2"><p class="w-full px-3 text-body-2-medium text-text-secondary">${e}</p><div class="flex w-full flex-col rounded-2xl bg-background-secondary-default pl-3">${t}<div class="-ml-3 flex flex-wrap items-center justify-end gap-3 rounded-b-2xl border-t border-separator-border bg-card-footer px-3 py-3">${R({
	label: "保存配置",
	attrs: "disabled data-skeleton-action"
})}</div></div></section>`, B = (e, t = "") => `<div class="flex min-h-[52px] w-full items-center justify-between gap-4 py-2.5 pr-2.5 border-b border-separator-border last:border-b-0"><div class="flex min-w-0 flex-col"><p class="text-body-regular text-text-primary">${e}</p>${t ? `<p class="text-body-2-regular text-text-secondary">${t}</p>` : ""}</div><span class="skeleton configuration-skeleton-toggle"></span></div>`, Ht = (e) => `<div class="flex w-full flex-col gap-1"><p class="text-body-medium text-text-primary">${e} 地址</p><span class="skeleton configuration-skeleton-input"></span><p class="pt-px text-caption-1-medium text-text-secondary">${Bt}</p></div>`;
function Ut() {
	return `<div class="peach-react"><div class="configpage">${`<div class="board-local-nav" data-section-nav data-section-items>${[
		"通用",
		"媒体",
		"网络与访问",
		"更新与维护"
	].map((e, t) => `<button type="button" tabindex="-1" aria-selected="${t === 0}">${e}</button>`).join("")}</div>`}<div class="flex flex-col gap-6">${Vt("开机自启", `<div class="flex flex-col">${B("开机后启动 Peach")}${B("静默启动", "开机后只显示托盘图标，不打开网页；「开机后启动 Peach」打开时生效。")}${B("在桌面创建快捷方式", "双击图标打开 Peach 网页；卸载时一并移除。")}</div>`)}${Vt("外部入口", `<div class="flex flex-col gap-4 py-4 pr-3"><p class="text-body-2-regular text-text-secondary">${zt}</p>${Ht("JavDB")}${Ht("MISSAV")}</div>`)}</div></div></div>`;
}
//#endregion
//#region src/management-skeletons.ts
var V = "relative overflow-hidden skeleton-sheen bg-background-tertiary-default rounded-lg", H = (e = "60%") => `<span class="${V} inline-block max-w-full align-middle" style="width:${e};height:1em"></span>`, U = "disabled data-skeleton-action", Wt = "min-w-0 rounded-2-5xl bg-background-secondary-default p-5 flex flex-col gap-4 max-sm:p-4";
function Gt() {
	let e = [
		"馆藏视频",
		"看过",
		"内容标签",
		"使用空间"
	].map((e, t) => `
    <div class="min-w-0 rounded-2xl shadow-card flex flex-col overflow-hidden pt-4 text-left ${t === 0 ? "ring-2 ring-border-focus-ring bg-background-primary-default" : "bg-background-secondary-default"}">
      <span class="flex min-w-0 items-center gap-2 px-4 text-body-regular text-text-secondary max-sm:gap-1.5 max-sm:px-3"><i class="${V} size-7 max-sm:size-6"></i>${e}</span>
      <b class="px-4 pt-3 pb-4 text-title-1-medium max-sm:px-3 max-sm:pb-3">${H("4em")}</b>
      <small class="mt-auto block min-h-9.5 bg-card-footer px-4 py-2.5 text-caption-1-regular max-sm:px-3 max-sm:py-2">${H("6em")}</small>
    </div>`).join(""), t = (e) => `<section class="${Wt}" data-stats-chart>
    <header class="flex flex-wrap items-end justify-between gap-x-4 gap-y-1"><span class="flex min-w-0 flex-col gap-1"><h3 class="text-title-2-medium text-text-primary">${e}</h3><b class="text-display-4-medium">${H("4em")}</b></span><small class="text-caption-1-regular text-text-secondary">个视频</small></header>
    <svg class="h-75 w-full max-sm:h-65 text-background-tertiary-default" viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="12">${[
		76,
		54,
		32
	].map((e) => `<circle cx="100" cy="100" r="${e}"/>`).join("")}</svg>
    <div class="inline-grid w-full grid-cols-3 gap-2 max-sm:grid-cols-2">${Array.from({ length: 3 }, () => `<div class="flex min-w-0 flex-col gap-1 rounded-xl bg-background-tertiary-default p-2.5"><span class="text-caption-1-regular">${H()}</span><b class="text-title-2-medium">${H("3em")}</b><small class="text-caption-1-regular">${H()}</small></div>`).join("")}</div>
  </section>`;
	return `<div class="peach-react"><div class="mx-auto flex w-full max-w-board flex-col gap-8">
    <p class="text-caption-1-regular text-text-secondary">账本当前快照 · ${H("12em")}</p>
    <div class="flex flex-col gap-4"><div class="inline-grid w-full grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" data-stats-metrics>${e}</div>
      <div class="flex flex-col gap-5"><div class="inline-grid w-full gap-5 md:grid-cols-2">${t("网盘与本地")}${t("媒体库")}</div>
        <div class="inline-grid w-full gap-5 md:grid-cols-2 xl:grid-cols-3">${[
		"时长",
		"画质",
		"文件类型"
	].map((e) => `<section class="${Wt}"><h3 class="text-title-2-medium">${e}</h3><div class="${V} h-64"></div></section>`).join("")}</div>
      </div>
    </div>
    <section class="rounded-surface bg-background-secondary-default dark:bg-background-primary-default">
      <div class="flex flex-wrap gap-3 px-4 pt-3 text-body-regular">${[
		"内容标签",
		"最近看过",
		"标签来源"
	].map((e) => `<span>${e}</span>`).join("")}</div>
      <div class="flex flex-col gap-3 px-4 pt-3.5 pb-4">${Array.from({ length: 5 }, () => `<div class="${V} h-7"></div>`).join("")}</div>
    </section>
  </div></div>`;
}
function Kt() {
	let e = `<div class="duplicate-row items-center gap-3 border-t border-separator-border px-5 py-4 max-compact:p-4">
    <span class="${V} row-span-2 inline-grid aspect-16/10 w-full rounded-2lg"></span>
    <span class="text-body-regular max-duplicate-narrow:col-start-2 max-duplicate-narrow:-col-end-1">${H("70%")}</span>
    ${Array.from({ length: 3 }, () => `<span class="font-mono text-caption-1-regular leading-5">${H("3em")}</span>`).join("")}
    <span class="col-start-2 -col-end-1 min-w-0 pt-0.5 font-mono text-caption-1-regular leading-5 max-duplicate-narrow:col-span-full">${H("75%")}</span>
  </div>`, t = `<section class="mb-6 overflow-hidden rounded-surface bg-background-secondary-default dark:bg-background-primary-default" data-duplicate-group>
    <div class="flex flex-wrap items-center gap-3 bg-background-tertiary-default p-5 max-compact:p-4 dark:bg-background-secondary-default">
      <b class="text-title-2-medium">${H("5em")}</b><span class="font-mono text-caption-1-regular leading-5">${H("8em")}</span>
      <span class="ml-auto flex flex-wrap gap-2 max-compact:ml-0 max-compact:w-full">${[
		"留最大",
		"留最长",
		"整组回收"
	].map((e) => R({
		variant: "secondary",
		size: "small",
		label: e,
		attrs: U
	})).join("")}</span>
    </div>${e.repeat(2)}</section>`;
	return `<div class="peach-react"><div class="mx-auto w-full max-w-board pb-10.5">
    <div data-collection-summary class="mb-5 flex items-end justify-between gap-4 rounded-surface bg-background-secondary-default px-6 py-5 max-compact:flex-col max-compact:items-start max-compact:gap-3 max-compact:p-4 dark:bg-background-primary-default">
      <div class="flex min-w-0 flex-col gap-2"><span class="text-body-regular text-text-secondary">重复内容</span><strong class="text-display-4-medium">${H("4em")}</strong></div><p class="text-body-regular text-text-secondary">${H("12em")}</p>
    </div>
    <div data-filter-glass data-glass-pane class="mb-5.5 flex flex-wrap items-center gap-x-2.5 gap-y-2 px-4 py-2.5"><h3 class="mr-1 text-body-medium">批量保留</h3>${["全部保留最大", "全部保留最长"].map((e) => `<button ${U} class="h-7.5 rounded-full border border-separator-border px-3 text-body-2-medium">${e}</button>`).join("")}</div>
    ${t.repeat(2)}
  </div></div>`;
}
function qt() {
	let e = `<li class="min-w-0 bg-background-secondary-default rounded-2xl shadow-card border border-separator-border flex flex-col gap-3 p-3">
    <div class="flex min-w-0 gap-4"><span class="${V} inline-grid w-card-cover shrink-0 aspect-card-cover rounded-2lg"></span>
      <div class="flex min-w-0 flex-1 flex-col gap-1.5"><h3 class="text-headline-medium">${H("80%")}</h3><p class="text-body-2-regular">${H("60%")}</p></div>
    </div>
    <footer class="flex justify-end">${R({
		variant: "secondary",
		size: "small",
		label: "查看版本",
		attrs: U
	})}</footer>
  </li>`;
	return `<div class="peach-react"><div class="mx-auto flex w-full max-w-board flex-col gap-8">
    ${Rt("待升级")}
    <ul class="card-grid-cover gap-5">${e.repeat(6)}</ul>
  </div></div>`;
}
//#endregion
//#region src/board-skeleton.ts
var W = (e = "60%") => `<span class="skeleton" style="width:${e}"></span>`, G = () => `${W("80%")}${W("48%")}`, K = (e, t) => e.repeat(t), Jt = (e, t = "metricstrip") => `<div class="${t}">${e.map((e) => `<div class="tastesummary"><span class="board-stat-label">${e}</span><b class="board-stat-value">${W("45%")}</b><small class="board-stat-footer">${W("60%")}</small></div>`).join("")}</div>`, Yt = (e, t) => `<div class="${t} skeleton-segments" data-board-segments="true">${e.map((e, t) => `<span${t === 0 ? " class=\"skeleton-segment-selected\"" : ""}>${e}</span>`).join("")}</div>`, q = (e) => `<section class="insightpanel"><header>${e}</header><div class="insightpanelbody skeleton-lines">${K(G(), 3)}</div></section>`, J = "disabled data-skeleton-action", Y = (e) => `<span class="skeleton skeleton-text" style="width:${e}"></span>`, X = (e, t, n = !1) => `<span class="skeleton" style="width:${e}px;height:${t}px;flex:none${n ? ";border-radius:50%" : ""}"></span>`, Xt = "min-w-0 bg-background-secondary-default rounded-2xl shadow-card flex flex-col gap-3 px-6 py-5 max-sm:gap-2 max-sm:p-4", Zt = () => `<div class="inline-grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 xl:grid-cols-6">${[
	"关注创作者",
	"启用来源",
	"检查失败",
	"未看更新",
	"JAV 订阅",
	"未看新作"
].map((e) => `<div class="${Xt}"><span class="text-body-medium text-text-secondary">${e}</span><b class="text-title-1-medium tabular-nums text-text-primary">${Y("3em")}</b></div>`).join("")}</div>`, Qt = () => `<div data-section-nav data-section-items class="flex max-w-full flex-nowrap overflow-x-auto">${[
	"关注列表",
	"添加关注",
	"JAV 订阅源",
	"想要",
	"来源和凭证"
].map((e, t) => `<span class="whitespace-nowrap" aria-selected="${t === 0}">${e}</span>`).join("")}</div>`, $t = (e = "") => `<span class="group inline-flex items-center select-none gap-2"><span class="flex shrink-0 items-center justify-center rounded-sm size-4 border bg-background-primary-default shadow-xs border-border-checkbox-default"></span>${e ? `<span class="text-body-medium text-text-primary">${e}</span>` : ""}</span>`, en = ({ table: e, sort: t, dir: n }) => {
	let r = xt.find(([e]) => e === t)[1];
	return `<div class="flex flex-wrap items-center gap-2 follow-skeleton-toolbar"><h3 class="mr-auto text-title-2-medium text-text-primary">关注列表</h3><span class="text-body-2-regular text-text-secondary">${Y("132px")}</span>${R({
		glyph: "refresh-cw",
		label: "检查全部",
		compact: !0,
		attrs: J
	})}<span data-button-group role="group">${R({
		variant: "ghost",
		glyph: "layout-grid",
		attrs: `aria-pressed="${!e}"`
	})}${R({
		variant: "ghost",
		glyph: "table",
		attrs: `aria-pressed="${e}"`
	})}</span>${z(r)}${R({
		variant: "secondary",
		glyph: n === "asc" ? "arrow-up" : "arrow-down"
	})}${e ? "" : R({
		variant: "secondary",
		glyph: "chevron-up",
		label: "全部收起",
		compact: !0,
		attrs: J
	})}</div>`;
}, tn = () => `<span class="flex shrink-0 items-center gap-1">${R({
	variant: "secondary",
	size: "small",
	glyph: "refresh-cw",
	attrs: J
})}${R({
	variant: "secondary",
	size: "small",
	glyph: "trash",
	attrs: J
})}</span>`, nn = () => `<div class="flex min-h-16 flex-wrap items-center gap-3 px-2 py-3 follow-skeleton-source">${$t()}<span class="flex min-w-0 grow flex-col gap-0.5"><span class="text-body-medium">${Y("8em")}</span></span><span class="flex shrink-0 items-center gap-1.5">${X(14, 14)}</span>${X(48, 24)}<span class="shrink-0 text-body-2-regular whitespace-nowrap text-text-secondary">${Y("113px")}</span>${tn()}</div>`, rn = (e) => `<section class="min-w-0 bg-background-primary-default rounded-2xl shadow-card flex flex-col overflow-hidden p-2 follow-skeleton-author"><div class="flex flex-wrap items-center gap-3 px-2 py-2.5" data-follow-author-header data-open>${X(32, 32, !0)}<b class="min-w-0 grow text-body-medium break-words text-text-primary">${Y("92px")}</b>${R({
	variant: "secondary",
	size: "small",
	glyph: "refresh-cw",
	attrs: J
})}<span class="flex shrink-0 items-center gap-1">${X(14, 14)}${X(14, 14)}</span>${R({
	variant: "secondary",
	size: "small",
	glyph: "check-check",
	label: "全选",
	attrs: J
})}${R({
	variant: "secondary",
	size: "small",
	glyph: "chevron-up",
	label: "收起",
	attrs: J
})}</div><div data-source-divider>${K(nn(), e)}</div></section>`, an = () => {
	try {
		return Number(JSON.parse(localStorage.getItem("peach.settings.v1") || "{}").followPageSize) || 20;
	} catch {
		return 20;
	}
}, on = [
	["select", ""],
	["author", "创作者"],
	["source", "来源"],
	["provider", "站点"],
	["status", "状态"],
	["checked", "上次检查"],
	["actions", ""]
], sn = {
	name: "author",
	source: "source",
	provider: "provider",
	status: "status",
	checked: "checked"
}, cn = "<svg viewBox=\"0 0 24 24\" fill=\"none\" aria-hidden=\"true\"><path d=\"M12.7071 15.2929C12.3166 15.6834 11.6834 15.6834 11.2929 15.2929L7.70711 11.7071C7.07714 11.0771 7.52331 10 8.41421 10H15.5858C16.4767 10 16.9229 11.0771 16.2929 11.7071L12.7071 15.2929Z\" fill=\"currentColor\"/></svg>", ln = (e, { sort: t, dir: n }) => `<div data-board-data-table data-follow-table class="follow-skeleton-table"><div class="w-full overflow-x-auto"><table class="bui-table bui-table-sm"><thead><tr>${on.map(([e, r]) => r ? `<th><span class="flex items-center gap-0.5">${r}<span data-sort-indicator${sn[t] === e ? ` data-direction="${n === "asc" ? "ascending" : "descending"}"` : ""}>${cn}</span></span></th>` : "<th></th>").join("")}</tr></thead><tbody>${K(`<tr>${[
	$t(),
	`<span class="flex min-w-0 items-center gap-2">${X(32, 32, !0)}${Y("5em")}</span>`,
	Y("10em"),
	`<span class="flex items-center gap-1.5">${X(14, 14)}${Y("4em")}</span>`,
	X(48, 24),
	Y("113px"),
	tn()
].map((e) => `<td>${e}</td>`).join("")}</tr>`, e)}</tbody></table></div></div>`, un = (e, t) => `<div class="flex flex-wrap items-center justify-between gap-3"><span class="text-body-2-regular text-text-secondary">${Y("111px")}</span>${z(`每页 ${t} ${e ? "条" : "位"}`, { size: "sm" })}${X(204, 32)}</div>`, dn = (e) => {
	let t = e.followLayout === "table", n = Tt(e.followSort, e.followDir), r = e.followPageSize || an(), i = t ? ln(r, n) : `${$t("全选本页")}<div class="flex flex-col gap-3">${rn(3)}${rn(4)}${rn(3)}</div>`;
	return `<div class="peach-react"><div class="mx-auto flex w-full max-w-board flex-col gap-8">${Zt()}<div class="flex flex-col gap-6">${Qt()}<div class="flex flex-col gap-4"><div class="min-w-0 bg-background-secondary-default rounded-2xl shadow-card flex flex-col gap-4 px-6 py-5 max-sm:px-4 follow-skeleton-surface" data-layout="${t ? "table" : "default"}">${en({
		table: t,
		...n
	})}${i}${un(t, r)}</div></div></div></div></div>`;
};
function fn() {
	return `<div data-stage-grid="" aria-hidden="true"><div data-stage-media="" class="skeleton-detail-media skeleton"></div><aside data-stage-side=""><div data-stage-side-content="" class="skeleton-lines">${W("85%")}${W("65%")}${K(G(), 4)}</div></aside></div>`;
}
function pn() {
	return `<div data-skeleton="detail" role="status" aria-label="正在读取作品详情">${fn()}</div>`;
}
function mn(e, t = {}) {
	let n = "";
	if (e === "/stats") n = Gt();
	else if (e === "/taste") n = `<div class="tastepage"><header class="tastehead">${Yt(["浏览器记录", "Peach 内部"], "insightswitch")}${W("24%")}</header><div class="tastestate"></div>${Jt([
		"浏览记录",
		"口味维度",
		"浏览候选",
		"私有导出"
	], "tastesummaries")}<section class="tastehero"><div class="insightcopy"><span>浏览器画像</span><div class="skeleton skeleton-radar"></div></div><div class="tastebars skeleton-lines">${K(G(), 4)}</div></section>${q("口味分析")}<div class="board-activity-charts">${q("浏览活动")}${q("时间分布")}</div>${q("标签")}</div>`;
	else if (e === "/follow-manage") n = dn(t);
	else if (e === "/configuration") n = Ut();
	else if (e === "/activity") n = `<div class="activitypage">${[
		"正在进行",
		"被挡下的",
		"最近完成"
	].map((e) => `<section class="activitysection"><h3 class="geist-fieldset-title">${e}</h3><div class="activity-runs"><article class="cleanupfieldset activity-run"><div class="geist-fieldset-content skeleton-lines">${W("35%")}${G()}</div></article></div></section>`).join("")}</div>`;
	else if (e === "/duplicates") n = Kt();
	else if (e === "/quality-goals") n = qt();
	else if (e === "/playlists") n = `<section class="playlistpage"><header><div><h2>播放列表</h2><p>保存 Mix，按自己的顺序继续播放。</p></div><div class="playlistcreate skeleton-lines"><span>新播放列表</span>${W("200px")}</div></header><div class="playlistcards">${K(`<article class="card playlistcard"><div class="mixstack"><div class="pic skeleton"></div></div><div class="mixmeta"><span class="mav skeleton"></span><div class="mixcopy skeleton-lines">${G()}</div></div></article>`, 6)}</div></section>`;
	else return "";
	return `<div class="board-page-skeleton" data-skeleton="board${e}" role="status" aria-label="正在读取页面"><div aria-hidden="true" inert>${n}</div></div>`;
}
//#endregion
//#region src/catalog-onboarding.ts
var hn = [
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
async function gn(e, t) {
	let n = new URLSearchParams();
	for (let t of hn) e[t] && n.set(t, e[t]);
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
function _n({ kind: e = "catalog", filtered: n = !1, jav: r = !1, configurable: i = !1, online: a = !1 } = {}) {
	let o = i ? "<button class=\"geist-button primary\" data-empty-settings>添加内容</button>" : "", s = "<a class=\"geist-button" + (!i || a ? " primary" : "") + "\" href=\"/follow-manage?tab=add\">添加关注</a>";
	if (n || r) return t("search", r ? "还没有符合条件的 JAV 作品" : "没有符合条件的内容", r ? "已扫描但尚未补充发行资料的视频可在全部内容中查看。" : "清除筛选或搜索条件后查看全部内容。", { actions: "<a class=\"geist-button primary\" href=\"/?loc=&thumb=0\">查看全部内容</a>" });
	if (e !== "catalog") {
		let n = (a ? {
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
		return t(e === "tags" ? "tags" : "user-round", "还没有" + n, a ? "添加关注来源并获取内容后，这里会显示来源上的" + n + "。" : "添加内容并补充资料后，这里会显示对应信息。", { actions: a ? s : o + s });
	}
	return t("play", "还没有视频", "添加媒体文件夹或关注来源，开始建立你的馆藏。", { actions: o + s });
}
//#endregion
//#region src/catalog-filter-skeleton.ts
var vn = 64, yn = (e) => e.replace(/[&<>"]/g, (e) => ({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;"
})[e]), bn = (e) => e.repeat(vn);
function xn(e, t) {
	let n = e.map((e) => `<a href="${yn(e.href)}" data-catalog-view="${yn(e.k)}" data-entity-press="" aria-pressed="${t === e.k}">${yn(e.label)}</a>`).join("");
	return "<div class=\"peach-react\"><div class=\"contents\" data-catalog-root=\"\" data-loading=\"\"><div data-catalog-tiers=\"\" aria-busy=\"true\"><div data-catalog-tier=\"performers\" data-skeleton=\"tiers\">" + bn("<span data-catalog-placeholder=\"performer\" aria-hidden=\"true\"><span></span><span>&nbsp;</span></span>") + "</div><div data-catalog-tier=\"studios\">" + bn("<span data-catalog-placeholder=\"studio\" aria-hidden=\"true\"><span></span><span>&nbsp;</span></span>") + `</div></div><div role="group" aria-label="筛选与排序" data-filter-glass="" data-glass-pane="" data-filter-frame="" data-catalog-frame="" class="sticky top-topbar z-10 mb-5.5 flex flex-col mx-4"><div role="group" aria-label="视图与标签" data-filter-row="top" class="flex h-12 min-w-0 items-center overscroll-x-contain px-3 py-2 gap-1.5 overflow-visible"><div data-catalog-scroll=""><div role="group" aria-label="视图" data-catalog-views="">${n}<span data-entity-sep="" aria-hidden="true"></span></div><div data-catalog-tags=""><span data-catalog-placeholder="tag" aria-hidden="true">` + "<span></span>".repeat(vn) + "</span></div></div></div><div data-filter-row=\"bottom\" aria-busy=\"true\" class=\"flex min-w-0 items-center gap-3 px-3 py-2 min-h-12\"><span data-catalog-readout=\"\"><span data-skeleton=\"count\" aria-hidden=\"true\" class=\"relative inline-block h-3.5 w-37.5 rounded-md align-middle skeleton-sheen\"></span></span></div></div></div></div>";
}
//#endregion
//#region src/sidebar.ts
var Sn = [
	"",
	"follow",
	"jav",
	"performers",
	"tags",
	"studios",
	"flagged",
	"manage"
], Cn = [
	"playlists",
	"immerse",
	"stats",
	"review",
	"data-cleanup",
	"trash",
	"follow-manage",
	"quality"
], wn = /* @__PURE__ */ new Set([...Sn, ...Cn]), Tn = (e) => e === "ads" || e === "dupes" ? "data-cleanup" : e;
function En(e) {
	let t = Array.isArray(e) ? e.filter((e) => typeof e == "string") : [], n = [...new Set(t.map(Tn))].filter((e) => wn.has(e));
	return n.length ? n : [...Sn];
}
function Dn(e) {
	return [
		"/",
		"/unseen",
		"/watch-later",
		"/flagged",
		"/trash",
		"/junk-files"
	].includes(e) || /^\/(item|mix|parts|editions)\//.test(e) || /^\/playlists\/\d+\/\d+$/.test(e) || /^\/(performers|studios|creators|series|agencies)\/.+/.test(e);
}
function On(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) for (let e of new Set(n.tags || [])) t.set(e, (t.get(e) || 0) + 1);
	return [...t].sort((e, t) => t[1] - e[1]).slice(0, 30);
}
//#endregion
//#region src/management.ts
var kn = "扫描媒体文件夹，导入已有资料，采集缺失信息。两段也可以分开跑：新盘刚接上时先只扫描，几万个文件登记完就能用；采集被网络拖住时只重跑采集，不必再扫一遍磁盘。", An = "修缺时间戳表（播放卡顿）和缺索引（打不开）的 MP4。常看的片子先修。", Z = "<span class=\"skeleton skeleton-text\" aria-hidden=\"true\"></span>", jn = "type=\"button\" disabled data-skeleton-action", Mn = "disabled data-skeleton-action", Nn = "aria-disabled=\"true\"", Pn = (e) => `<div class="peach-react"><div class="flex flex-col gap-4">${e}</div></div>`, Fn = (e, t) => `<div data-geist-fieldset-content>
          <h3 class="text-title-2-medium text-text-primary">${e}</h3>
          <p class="text-body-2-regular text-text-secondary">${t}</p></div>`;
function In() {
	return Pn(`<section aria-label="扫描与采集" data-geist-fieldset data-cleanup-task data-cleanup-processing data-fieldset-stack>
        ${Fn("扫描与采集", kn)}
        <footer data-geist-fieldset-footer><a href="/scraping" class="inline-flex items-center justify-center gap-1 whitespace-nowrap font-sans rounded-sm text-body-medium text-accent-600"><span>来源和凭证</span>${L("arrow-up", "size-[18px] shrink-0 rotate-90")}</a><span data-button-group data-split-button data-variant="primary">${R({
		glyph: "database",
		label: "扫描并补全资料",
		attrs: Mn
	})}${R({
		glyph: "chevron-down",
		attrs: `${Mn} aria-label="更多扫描与采集方式"`
	})}</span></footer>
      </section>`);
}
function Ln() {
	return Pn(`<section aria-label="媒体修复" data-geist-fieldset data-cleanup-task data-cleanup-processing>
        ${Fn("媒体修复", An)}
        <footer data-geist-fieldset-footer>${z(Z, {
		className: "w-48",
		attrs: Nn
	})}${R({
		label: "开始修复",
		attrs: Mn
	})}</footer>
      </section>`);
}
function Rn() {
	let e = [
		["人工复核", "square-check-big"],
		["高清版", "sparkles"],
		["重复文件", "file-stack"],
		["垃圾文件", "file-archive"],
		["回收站", "trash"]
	], t = `<span class="geist-button organize-preset-skeleton">${Z}</span>`.repeat(3), n = (e) => `<div class="organizefield"><span>${e}</span>
            <span class="geist-input organize-input-skeleton">${Z}</span></div>`;
	return `<div class="cleanuppage" data-skeleton="cleanup" aria-busy="true" aria-label="正在读取数据管理状态">
    <div class="cleanupstats">${e.map(([e, t]) => `
      <button type="button" class="board-plain-stat" disabled>
        <span class="board-plain-stat-head"><span class="board-stat-tile">${s(t)}</span>${e}</span>
        <strong>${Z}</strong><span class="cleanupmeta">${Z}</span></button>`).join("")}</div>
    <div class="cleanupgrid">
      <div class="cleanupscraping">${In()}</div>
      <div class="cleanupmediarepair">${Ln()}</div>
      <section class="cleanupfieldset cleanuporganize" data-geist-fieldset data-cleanup-task aria-labelledby="cleanup-loading-organize">
        <div class="geist-fieldset-content"><h3 class="geist-fieldset-title" id="cleanup-loading-organize">整理</h3>
          <p>按模板给文件改名并归入目录。先预览，确认后执行；执行过的一批可以整批退回。</p>
          <div class="organizefields">
            <div class="organizesource"><span class="gselect"><span class="gselectfield organize-source-skeleton">${Z}${s("chevron-down")}</span></span></div>
            ${n("文件名模板")}
            ${n("目录模板")}
            <div class="organizepresets">${t}</div>
            <p class="cleanupmeta">${Z}</p>
          </div></div>
        <footer class="geist-fieldset-footer" data-geist-fieldset-footer><button class="geist-button primary" ${jn}>预览</button></footer>
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
        <div class="resourcesyncfooter geist-fieldset-footer" data-geist-fieldset-footer><button class="resourceaction primary" ${jn}>${s("unlink")}<span>检查死链</span></button></div>
      </div></section>
    <section class="resourcesync" aria-labelledby="cleanup-loading-sync">
      <h2 id="cleanup-loading-sync">资源同步</h2>
      <div class="resourcesyncbox" data-geist-fieldset data-cleanup-task>
        <div class="resourcesyncbody geist-fieldset-content"><h3 class="geist-fieldset-title">文件与记录核对</h3>
          <p>按馆藏记录逐条查找本地磁盘与网盘上的文件，列出文件已不存在的记录、空文件夹，以及不再被引用的缓存。</p></div>
        <div class="resourcesyncfooter geist-fieldset-footer" data-geist-fieldset-footer><button class="resourceaction primary" ${jn}>${s("git-compare")}<span>检查文件</span></button></div>
      </div></section></div>`;
}
//#endregion
//#region src/junk-queue.ts
var zn = [
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
], Bn = (e) => zn.find(([t]) => t === e)?.[0] ?? "";
function Vn(e) {
	let t = new URLSearchParams(e);
	return {
		kind: Bn(t.get("type")),
		view: t.get("view") === "dismissed" ? "dismissed" : "pending"
	};
}
function Q(e = "", t = "pending") {
	let n = new URLSearchParams();
	e && n.set("type", e), t === "dismissed" && n.set("view", "dismissed");
	let r = n.toString();
	return `/junk-files${r ? `?${r}` : ""}`;
}
function Hn(e) {
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
var Un = (e) => e === "dismissed" ? "已排除" : "待判断", Wn = (e) => `<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-${e}"></use></svg>`;
function Gn({ kind: e, view: t }) {
	let n = zn.map(([n, r, i]) => `<a href="${Q(n, t)}" data-junk-kind-link="${n}"${n === e ? " aria-current=\"page\"" : ""}>${Wn(i)}${o(r)}</a>`).join(""), r = Hn(t);
	return `<div class="peach-react" data-junk-count-skeleton=""><div data-junk-count=""><div data-junk-summary="" aria-live="polite">${Rt(Un(t))}</div><div data-junk-filters-frame="" data-filter-glass="" data-glass-pane=""><span data-view-glide="" aria-hidden="true" hidden></span><nav data-junk-filters="" aria-label="垃圾文件分类">${n}<i data-junk-divider="" aria-hidden="true"></i><a href="${r.href}" data-junk-view-link="${r.view}"${t === "dismissed" ? " aria-current=\"page\"" : ""}>${Wn(r.glyph)}${r.label}</a></nav></div></div></div>`;
}
//#endregion
//#region src/player/controls.ts
function Kn(e, t) {
	e?.closest(".video-js")?.querySelector(`.vjs-control-bar ${t}`)?.click();
}
//#endregion
//#region src/player/playback.ts
function qn(e) {
	e && (e.paused ? e.play()?.catch(() => {}) : e.pause());
}
function Jn(e, t) {
	let n = e.duration, r = (e.currentTime || 0) + t;
	e.currentTime = Number.isFinite(n) ? Math.max(0, Math.min(n, r)) : Math.max(0, r);
}
//#endregion
//#region src/islands.ts
var Yn = {
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
}, Xn = () => import("/dist/peach-react.js").then(() => void 0), Zn = () => Object.keys(Yn), $ = /* @__PURE__ */ new Map();
async function Qn(e, t, n, r = {}) {
	let i = Yn[e];
	if (!i) throw Error(`未注册的 island：${String(e)}`);
	nr(t);
	let a = { controller: new AbortController() };
	$.set(t, a);
	let o = (await import("/dist/peach-react.js")).pages[i.react];
	try {
		await o.prefetch(n, a.controller.signal);
	} catch {
		if (a.controller.signal.aborted) return;
	}
	if (!er(t, a, r)) return;
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
function $n(e, t) {
	let n = e ? $.get(e) : void 0;
	!n?.update || !n.props || (n.props = {
		...n.props,
		...t
	}, n.update(n.props));
}
function er(e, t, n) {
	return $.get(e) === t ? n.isCurrent && !n.isCurrent() ? ($.delete(e), !1) : !0 : !1;
}
var tr = (e) => !!e && $.has(e);
function nr(e) {
	for (let t of [...$.keys()]) (t === e || e.contains(t)) && rr(t);
}
function rr(e) {
	let t = $.get(e);
	t && (t.controller.abort(), $.delete(e), t.dispose?.());
}
var ir = null;
function ar(e, t, n, r) {
	ir ??= import("/dist/peach-react.js").then((n) => (n.mountToaster(e, t), n)), ir.then((e) => e.showToast(n, r));
}
var or = null, sr = null;
function cr(e) {
	return or ??= import("/dist/peach-react.js").then((t) => (sr = t.configureStage(e), sr)), or;
}
var lr = () => sr, ur = null, dr = null;
function fr(e) {
	return ur ??= import("/dist/peach-react.js").then((t) => (dr = t.configureSettingsPanel(e), dr)), ur;
}
var pr = () => dr, mr = null, hr = null;
function gr(e) {
	return mr ??= import("/dist/peach-react.js").then((t) => (hr = t.configureImmerse(e), hr)), mr;
}
var _r = () => hr, vr = null, yr = null;
function br(e) {
	return vr ??= import("/dist/peach-react.js").then((t) => (yr = t.configureSidebar(e), yr)), vr;
}
var xr = () => yr, Sr = null, Cr = null;
function wr(e) {
	return Sr ??= import("/dist/peach-react.js").then((t) => (Cr = t.configureManageHeader(e), Cr)), Sr;
}
var Tr = () => Cr, Er = null, Dr = null;
function Or(e) {
	return Er ??= import("/dist/peach-react.js").then((t) => (Dr = t.configureBatchDock(e), Dr)), Er;
}
var kr = () => Dr;
//#endregion
export { Sn as DEFAULT_SIDEBAR_ORDER, w as FACE_CEILING, C as FACE_TARGET, ye as MIN_FACE_PX, Ee as advanceImageFallback, A as avatarFrame, O as avatarInner, kr as batchDockApi, mn as boardPageSkeleton, u as boundedPreference, Ye as cardArtwork, Qe as cardIdentity, _n as catalogEmptyHtml, xn as catalogFilterSkeletonHtml, gn as catalogSuggestions, _e as clampPage, Rn as cleanupSkeletonHtml, Kn as clickPlayerControl, gt as configureHoverPreview, j as coverAnchor, rt as coverBackdrop, at as coverFace, Ke as coverImage, it as coverRatio, l as createSettingsStore, Ze as detailPosterUrl, pn as detailSkeletonHtml, He as entityAvatar, Ve as entityFaceImg, bt as entitySkeletonHtml, Ge as faceBoxAttrs, xe as faceFrame, Ue as faceOrigin, We as facePos, Oe as faceSourceScale, be as faceZoom, N as fitNativeImage, ue as followJobProgress, ut as frameCachedImages, T as hasFaceBox, Te as imageFallbackAttrs, _r as immerseApi, f as initBoardControls, mt as installCardArt, tr as islandMounted, Zn as islandNames, Je as javArtwork, Pe as javImageKind, ce as jobActivityHtml, Gn as junkCountSkeletonHtml, Q as junkPath, Vn as junkRoute, Or as loadBatchDock, gr as loadImmerse, wr as loadManageHeader, fr as loadSettingsPanel, br as loadSidebar, cr as loadStage, Tr as manageHeaderApi, ae as manageHeaderSkeletonHtml, ne as manageHeaderView, k as mixFace, et as mixLabel, Qn as mountIsland, ke as nativeImageFit, D as normalizeJavImage, Me as normalizeJavLayout, Ne as normalizeJavPreferences, En as normalizeSidebarOrder, ge as pageCount, ve as paginationHtml, Ie as panelFrame, we as parseFallbacks, Be as performerLabel, nt as posterPanel, c as preferredDirection, Xn as preloadIslands, $e as queueAvatarHtml, Xe as queueThumbHtml, dt as refitNativeImages, ft as relayoutCovers, Re as relayoutJavImages, vt as releaseHover, F as releaseHoverPreviews, je as rememberRepresentatives, E as representativeOf, Jn as seekVideoBy, pe as selectGroup, de as selectRange, fe as selectionSummary, I as setHoverState, pr as settingsPanelApi, lt as settleImage, ar as showToast, xr as sidebarApi, Dn as sidebarHasCatalogContent, y as sidebarSkeletonHtml, On as sidebarTagCounts, lr as stageApi, d as syncBoardRange, Le as syncJavImages, me as syncSelectionToolbar, qn as toggleVideoPlayback, ee as transitionTheme, nr as unmountIsland, $n as updateIsland, M as upgradeCover, le as watchJob, ct as watchPendingImages, yt as wireHover, De as wireImageFallbacks };
