(function() {
	try {
		var e = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "0f2dd4b3-fa00-449b-936e-67875e98a681", e._sentryDebugIdIdentifier = "sentry-dbid-0f2dd4b3-fa00-449b-936e-67875e98a681");
	} catch {}
})();
import { Button as e, CONFIGURATION_SECTIONS as t, Disclosure as n, GuideFieldDetails as r, JAV_TABS as i, Note as a, PREFERENCE_SECTIONS as o, ROUTE_META as s, SettingsDialogClose as c, __toESM as l, beginPlayerGuidePreview as u, closeDrawerAfterNav as d, disposeStage as f, peachHistory$1 as p, px as m, r2 as h, require_client as g, require_jsx_runtime as _, require_react_dom as v, useOverlayScrollbar as y } from "./peach-app.js";
// node_modules/driver.js/dist/driver.js.mjs
var b = [
	"pointerdown",
	"mousedown",
	"pointerup",
	"mouseup",
	"click"
], x = /* @__PURE__ */ new WeakMap();
function S(e, t, n) {
	C(e);
	let r = (r) => {
		let i = r.target;
		e.contains(i) && ((!n || n(i)) && (r.preventDefault(), r.stopPropagation(), r.stopImmediatePropagation()), r.type === "click" && t?.(r));
	};
	for (let e of b) document.addEventListener(e, r, !0);
	x.set(e, r);
}
function C(e) {
	let t = x.get(e);
	if (t) {
		for (let e of b) document.removeEventListener(e, t, !0);
		x.delete(e);
	}
}
function ee(e, t) {
	let n = e.wrapper.getBoundingClientRect();
	return {
		width: n.width + t,
		height: n.height + t,
		realWidth: n.width,
		realHeight: n.height
	};
}
function te(e, t) {
	let { elementDimensions: n, popoverDimensions: r, popoverPadding: i, popoverArrowDimensions: a } = t;
	return e === "start" ? Math.max(Math.min(n.top - i, window.innerHeight - r.realHeight - a.width), a.width) : e === "end" ? Math.max(Math.min(n.top - r?.realHeight + n.height + i, window.innerHeight - r?.realHeight - a.width), a.width) : e === "center" ? Math.max(Math.min(n.top + n.height / 2 - r?.realHeight / 2, window.innerHeight - r?.realHeight - a.width), a.width) : 0;
}
function ne(e, t) {
	let { elementDimensions: n, popoverDimensions: r, popoverPadding: i, popoverArrowDimensions: a } = t;
	return e === "start" ? Math.max(Math.min(n.left - i, window.innerWidth - r.realWidth - a.width), a.width) : e === "end" ? Math.max(Math.min(n.left - r?.realWidth + n.width + i, window.innerWidth - r?.realWidth - a.width), a.width) : e === "center" ? Math.max(Math.min(n.left + n.width / 2 - r?.realWidth / 2, window.innerWidth - r?.realWidth - a.width), a.width) : 0;
}
function w(e, t, n) {
	let { align: r, side: i } = n, a = n.centered ? "over" : i, o = n.padding, s = ee(e, n.offset), c = e.arrow.getBoundingClientRect(), l = t.getBoundingClientRect(), u = l.top - s.height, d = u >= 0, f = window.innerHeight - (l.bottom + s.height), p = f >= 0, m = l.left - s.width, h = m >= 0, g = window.innerWidth - (l.right + s.width), _ = g >= 0, v = !d && !p && !h && !_, y = a;
	if (a === "top" && d ? _ = h = p = !1 : a === "bottom" && p ? _ = h = d = !1 : a === "left" && h ? _ = d = p = !1 : a === "right" && _ && (h = d = p = !1), a === "over") {
		let t = window.innerWidth / 2 - s.realWidth / 2, n = window.innerHeight / 2 - s.realHeight / 2;
		e.wrapper.style.left = `${t}px`, e.wrapper.style.right = "auto", e.wrapper.style.top = `${n}px`, e.wrapper.style.bottom = "auto";
	} else if (v) {
		let t = window.innerWidth / 2 - s?.realWidth / 2;
		e.wrapper.style.left = `${t}px`, e.wrapper.style.right = "auto", e.wrapper.style.bottom = "10px", e.wrapper.style.top = "auto";
	} else if (h) {
		let t = Math.min(m, window.innerWidth - s?.realWidth - c.width), n = te(r, {
			elementDimensions: l,
			popoverDimensions: s,
			popoverPadding: o,
			popoverArrowDimensions: c
		});
		e.wrapper.style.left = `${t}px`, e.wrapper.style.top = `${n}px`, e.wrapper.style.bottom = "auto", e.wrapper.style.right = "auto", y = "left";
	} else if (_) {
		let t = Math.min(g, window.innerWidth - s?.realWidth - c.width), n = te(r, {
			elementDimensions: l,
			popoverDimensions: s,
			popoverPadding: o,
			popoverArrowDimensions: c
		});
		e.wrapper.style.right = `${t}px`, e.wrapper.style.top = `${n}px`, e.wrapper.style.bottom = "auto", e.wrapper.style.left = "auto", y = "right";
	} else if (d) {
		let t = Math.min(u, window.innerHeight - s.realHeight - c.width), n = ne(r, {
			elementDimensions: l,
			popoverDimensions: s,
			popoverPadding: o,
			popoverArrowDimensions: c
		});
		e.wrapper.style.top = `${t}px`, e.wrapper.style.left = `${n}px`, e.wrapper.style.bottom = "auto", e.wrapper.style.right = "auto", y = "top";
	} else if (p) {
		let t = Math.min(f, window.innerHeight - s?.realHeight - c.width), n = ne(r, {
			elementDimensions: l,
			popoverDimensions: s,
			popoverPadding: o,
			popoverArrowDimensions: c
		});
		e.wrapper.style.left = `${n}px`, e.wrapper.style.bottom = `${t}px`, e.wrapper.style.top = "auto", e.wrapper.style.right = "auto", y = "bottom";
	}
	ie(e, v ? "over" : y, r, t), [...e.wrapper.classList].filter((e) => e.startsWith("driver-popover-side-") || e.startsWith("driver-popover-align-")).forEach((t) => e.wrapper.classList.remove(t)), e.wrapper.classList.add(`driver-popover-side-${y}`), e.wrapper.classList.add(`driver-popover-align-${r}`);
}
function T(e, t, n, r, i, a = 10) {
	let o = r - n;
	return e <= n && t >= r ? i === "start" ? 15 + a / 2 : i === "end" ? o - 15 - a / 2 : o / 2 : (Math.min(Math.max(e, n), r) + Math.min(Math.max(t, n), r)) / 2 - n;
}
function E(e, t, n = 10) {
	let r = t - 15 - n;
	if (r < 15) return Math.max(0, (t - n) / 2);
	let i = e - n / 2;
	return Math.min(Math.max(i, 15), r);
}
function re(e, t, n) {
	return e === "left" || e === "right" ? t.bottom > n.top && t.top < n.bottom ? e : t.bottom <= n.top ? "bottom" : "top" : t.right > n.left && t.left < n.right ? e : t.right <= n.left ? "right" : "left";
}
function ie(e, t, n, r) {
	let i = e.arrow;
	if (i.className = "driver-popover-arrow", i.style.top = "", i.style.right = "", i.style.bottom = "", i.style.left = "", t === "over") {
		i.classList.add("driver-popover-arrow-none");
		return;
	}
	let a = r.getBoundingClientRect(), o = e.wrapper.getBoundingClientRect(), s = re(t, a, o);
	i.classList.add(`driver-popover-arrow-side-${s}`);
	let c = i.getBoundingClientRect().width || 10;
	if (s === "left" || s === "right") {
		let e = T(a.top, a.bottom, o.top, o.bottom, n, c);
		i.style.top = `${E(e, o.height, c)}px`;
	} else {
		let e = T(a.left, a.right, o.left, o.right, n, c);
		i.style.left = `${E(e, o.width, c)}px`;
	}
}
function D(e) {
	return typeof e == "function" ? e() : typeof e == "string" ? document.querySelector(e) : e;
}
function O(e) {
	let t = window.getComputedStyle(e);
	return [
		t.overflow,
		t.overflowX,
		t.overflowY
	].some((e) => e === "auto" || e === "scroll");
}
function k(e, t, n, r) {
	return (e /= r / 2) < 1 ? n / 2 * e * e + t : -n / 2 * (--e * (e - 2) - 1) + t;
}
function A(e) {
	let t = "a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type=\"text\"]:not([disabled]), input[type=\"radio\"]:not([disabled]), input[type=\"checkbox\"]:not([disabled]), select:not([disabled])";
	return e.flatMap((e) => {
		let n = e.matches(t), r = Array.from(e.querySelectorAll(t));
		return [...n ? [e] : [], ...r];
	}).filter((e) => getComputedStyle(e).pointerEvents !== "none" && le(e));
}
function ae(e, t) {
	if (!e || se(e)) return;
	let n = e.offsetHeight > window.innerHeight;
	e.scrollIntoView({
		behavior: !t || oe(e) ? "auto" : "smooth",
		inline: "center",
		block: n ? "start" : "center"
	});
}
function oe(e) {
	if (!e || !e.parentElement) return;
	let t = e.parentElement;
	return t.scrollHeight > t.clientHeight;
}
function se(e) {
	let t = e.getBoundingClientRect();
	return t.top >= 0 && t.left >= 0 && t.bottom <= (window.innerHeight || document.documentElement.clientHeight) && t.right <= (window.innerWidth || document.documentElement.clientWidth) && !ce(e, t);
}
function ce(e, t) {
	let n = e;
	for (; n;) {
		if (getComputedStyle(n).position === "fixed") return !1;
		let e = n.parentElement;
		if (!e || e === document.body || e === document.documentElement) return !1;
		if (O(e)) {
			let n = e.getBoundingClientRect(), r = n.top + e.clientTop, i = n.left + e.clientLeft;
			if (t.top < r || t.left < i || t.bottom > r + (e.clientHeight || n.height) || t.right > i + (e.clientWidth || n.width)) return !0;
		}
		n = e;
	}
	return !1;
}
function le(e) {
	return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
}
var j = /* @__PURE__ */ new WeakSet();
function ue(e) {
	let t = e.closest("dialog[open]");
	if (!t) return document.body;
	if (!("showPopover" in t)) return t;
	let n = t.querySelector(":scope > .driver-layer");
	return n || (n = document.createElement("div"), n.className = "driver-layer", n.setAttribute("popover", "manual"), t.appendChild(n)), j.has(t) || (j.add(t), t.addEventListener("close", () => {
		t.querySelector(":scope > .driver-layer:popover-open")?.hidePopover();
	})), n.matches(":popover-open") || n.showPopover(), n;
}
function de(e) {
	let t = e.parentElement;
	e.remove(), t?.classList.contains("driver-layer") && !t.childElementCount && t.remove();
}
function M(e) {
	e && (e.wrapper.style.display = "none");
}
function fe(e, t) {
	let n = me();
	ue(e).appendChild(n.wrapper);
	let { title: r, description: i, showButtons: a, disableButtons: o, showProgress: s, nextBtnText: c, prevBtnText: l, progressText: u } = t;
	n.nextButton.innerHTML = c, n.previousButton.innerHTML = l, n.progress.innerHTML = u, n.closeButton.setAttribute("aria-label", t.closeBtnLabel), t.doneButton && n.nextButton.classList.add("driver-popover-done-btn"), r ? (n.title.innerHTML = r, n.title.style.display = "block") : n.title.style.display = "none", i ? (n.description.innerHTML = i, n.description.style.display = "block") : n.description.style.display = "none";
	let d = a.includes("next") || a.includes("previous") || s;
	n.closeButton.style.display = a.includes("close") ? "block" : "none", d ? (n.footer.style.display = "flex", n.progress.style.display = s ? "block" : "none", n.nextButton.style.display = a.includes("next") ? "block" : "none", n.previousButton.style.display = a.includes("previous") ? "block" : "none") : n.footer.style.display = "none", o.includes("next") && (n.nextButton.disabled = !0, n.nextButton.classList.add("driver-popover-btn-disabled")), o.includes("previous") && (n.previousButton.disabled = !0, n.previousButton.classList.add("driver-popover-btn-disabled")), o.includes("close") && (n.closeButton.disabled = !0, n.closeButton.classList.add("driver-popover-btn-disabled"));
	let f = n.wrapper;
	f.style.display = "block", f.style.left = "", f.style.top = "", f.style.bottom = "", f.style.right = "", f.id = "driver-popover-content", f.setAttribute("role", "dialog"), f.setAttribute("aria-labelledby", "driver-popover-title"), f.setAttribute("aria-describedby", "driver-popover-description");
	let p = n.arrow;
	p.className = "driver-popover-arrow", f.className = `driver-popover ${t.popoverClass || ""}`.trim(), S(n.wrapper, (e) => {
		let n = e.target instanceof Element ? e.target : e.target?.parentElement;
		if (n) {
			if (n.closest(".driver-popover-next-btn")) return t.onNextClick?.();
			if (n.closest(".driver-popover-prev-btn")) return t.onPrevClick?.();
			if (n.closest(".driver-popover-close-btn")) return t.onCloseClick?.();
		}
	}, (e) => n.description.contains(e) || n.title.contains(e) ? !1 : !!e.closest(".driver-popover-prev-btn, .driver-popover-next-btn, .driver-popover-close-btn")), t.onRender?.(n), w(n, e, t.position), pe(n, e, t.position), ae(f, t.smoothScroll);
	let m = A([f, e]);
	return m.length > 0 && m[0].focus(), n;
}
function pe(e, t, n) {
	e.wrapper.querySelectorAll("img").forEach((r) => {
		if (r.complete) return;
		let i = () => w(e, t, n);
		r.addEventListener("load", i, { once: !0 }), r.addEventListener("error", i, { once: !0 });
	});
}
function me() {
	let e = document.createElement("div");
	e.classList.add("driver-popover");
	let t = document.createElement("div");
	t.classList.add("driver-popover-arrow");
	let n = document.createElement("div");
	n.id = "driver-popover-title", n.classList.add("driver-popover-title"), n.style.display = "none", n.innerText = "Popover Title";
	let r = document.createElement("div");
	r.id = "driver-popover-description", r.classList.add("driver-popover-description"), r.style.display = "none", r.innerText = "Popover description is here";
	let i = document.createElement("button");
	i.type = "button", i.classList.add("driver-popover-close-btn"), i.innerHTML = "&times;";
	let a = document.createElement("div");
	a.classList.add("driver-popover-footer");
	let o = document.createElement("span");
	o.classList.add("driver-popover-progress-text"), o.innerText = "";
	let s = document.createElement("span");
	s.classList.add("driver-popover-navigation-btns");
	let c = document.createElement("button");
	c.type = "button", c.classList.add("driver-popover-prev-btn", "driver-popover-footer-btn"), c.innerHTML = "Previous";
	let l = document.createElement("button");
	return l.type = "button", l.classList.add("driver-popover-next-btn", "driver-popover-footer-btn"), l.innerHTML = "Next", s.appendChild(c), s.appendChild(l), a.appendChild(o), a.appendChild(s), e.appendChild(i), e.appendChild(t), e.appendChild(n), e.appendChild(r), e.appendChild(a), {
		wrapper: e,
		arrow: t,
		title: n,
		description: r,
		footer: a,
		previousButton: c,
		nextButton: l,
		closeButton: i,
		footerButtons: s,
		progress: o
	};
}
function N(e) {
	e && (C(e.wrapper), de(e.wrapper));
}
function P(e, t) {
	let n = window.innerWidth, r = window.innerHeight, i = t.padding, a = t.radius, o = e.width + i * 2, s = e.height + i * 2, c = Math.min(a, o / 2, s / 2), l = Math.floor(Math.max(c, 0)), u = e.x - i + l, d = e.y - i, f = o - l * 2, p = s - l * 2;
	return `M${n},0L0,0L0,${r}L${n},${r}L${n},0Z
    M${u},${d} h${f} a${l},${l} 0 0 1 ${l},${l} v${p} a${l},${l} 0 0 1 -${l},${l} h-${f} a${l},${l} 0 0 1 -${l},-${l} v-${p} a${l},${l} 0 0 1 ${l},-${l} z`;
}
function he(e, t, n, r, i) {
	let a = e.getState("__activeStagePosition"), o = a || r.getBoundingClientRect(), s = i.getBoundingClientRect();
	a = {
		x: k(t, o.x, s.x - o.x, n),
		y: k(t, o.y, s.y - o.y, n),
		width: k(t, o.width, s.width - o.width, n),
		height: k(t, o.height, s.height - o.height, n)
	}, I(e, a), e.setState("__activeStagePosition", a);
}
function F(e, t) {
	if (!t) return;
	let n = t.getBoundingClientRect(), r = {
		x: n.x,
		y: n.y,
		width: n.width,
		height: n.height
	};
	e.setState("__activeStagePosition", r), I(e, r);
}
function ge(e) {
	let t = e.getState("__activeStagePosition"), n = e.getState("__overlaySvg");
	if (!t) return;
	if (!n) {
		console.warn("No stage svg found.");
		return;
	}
	let r = window.innerWidth, i = window.innerHeight;
	n.setAttribute("viewBox", `0 0 ${r} ${i}`);
}
function _e(e, t) {
	let n = ve(e, t);
	document.body.appendChild(n), S(n, (t) => {
		t.target.tagName === "path" && e.emit("overlayClick");
	}), e.setState("__overlaySvg", n);
}
function I(e, t) {
	let n = e.getState("__overlaySvg");
	if (!n) {
		_e(e, t);
		return;
	}
	let r = n.firstElementChild;
	if (r?.tagName !== "path") throw Error("no path element found in stage svg");
	r.setAttribute("d", P(t, L(e)));
}
function L(e) {
	return e.getState("activeElement")?.id === "driver-dummy-element" ? {
		padding: 0,
		radius: 0
	} : {
		padding: e.getConfig("stagePadding") || 0,
		radius: e.getConfig("stageRadius") || 0
	};
}
function ve(e, t) {
	let n = window.innerWidth, r = window.innerHeight, i = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	i.classList.add("driver-overlay", "driver-overlay-animated"), i.setAttribute("viewBox", `0 0 ${n} ${r}`), i.setAttribute("xmlSpace", "preserve"), i.setAttribute("xmlnsXlink", "http://www.w3.org/1999/xlink"), i.setAttribute("version", "1.1"), i.setAttribute("preserveAspectRatio", "xMinYMin slice"), i.style.fillRule = "evenodd", i.style.clipRule = "evenodd", i.style.strokeLinejoin = "round", i.style.strokeMiterlimit = "2", i.style.zIndex = "10000", i.style.position = "fixed", i.style.top = "0", i.style.left = "0", i.style.width = "100%", i.style.height = "100%";
	let a = document.createElementNS("http://www.w3.org/2000/svg", "path");
	return a.setAttribute("d", P(t, L(e))), a.style.fill = e.getConfig("overlayColor") || "rgb(0,0,0)", a.style.opacity = `${e.getConfig("overlayOpacity")}`, a.style.pointerEvents = "auto", a.style.cursor = "auto", i.appendChild(a), i;
}
function ye(e) {
	let t = e.getState("__overlaySvg");
	t && (C(t), t.remove());
}
var R = "{{current}} of {{total}}";
function z(e, t) {
	return !(t.skipMissingElement ?? e.getConfig("skipMissingElement")) || !t.element ? !1 : !D(t.element);
}
function B(e, t, n) {
	let r = e.getConfig("steps") || [];
	for (let i = t; i >= 0 && i < r.length; i += n) if (!z(e, r[i])) return i;
}
function V(e, t) {
	let n = e.getState("activeIndex"), r = n !== void 0 && B(e, n + 1, 1) === void 0, i = t?.popover?.onDoneClick || e.getConfig("onDoneClick");
	return r && i ? i : t?.popover?.onNextClick || e.getConfig("onNextClick");
}
function H(e, t) {
	return t?.popover?.onPrevClick || e.getConfig("onPrevClick");
}
function be(e, t) {
	return t?.popover?.onCloseClick || e.getConfig("onCloseClick");
}
function xe(e, t, n) {
	let r = e.getConfig("steps") || [], i = r[t], a = i.popover || {}, o = B(e, t + 1, 1) !== void 0, s = B(e, t - 1, -1) !== void 0, c = a.doneBtnText || e.getConfig("doneBtnText") || "Done", l = e.getConfig("allowClose"), u = a.showProgress === void 0 ? e.getConfig("showProgress") : a.showProgress, d = (a.progressText || e.getConfig("progressText") || R).replace("{{current}}", `${t + 1}`).replace("{{total}}", `${r.length}`), f = a.showButtons || e.getConfig("showButtons"), p = [
		"next",
		"previous",
		...l ? ["close"] : []
	].filter((e) => !f?.length || f.includes(e)), m = a.onNextClick || e.getConfig("onNextClick"), h = a.onPrevClick || e.getConfig("onPrevClick"), g = a.onCloseClick || e.getConfig("onCloseClick");
	return {
		...i,
		popover: {
			showButtons: p,
			nextBtnText: o ? void 0 : c,
			disableButtons: [...e.getConfig("disableButtons") || [], ...s ? [] : ["previous"]],
			showProgress: u,
			onNextClick: m || n.onNextClick,
			onPrevClick: h || n.onPrevClick,
			onCloseClick: g || n.onCloseClick,
			...a,
			progressText: d
		}
	};
}
function U(e, t) {
	return {
		showButtons: t?.popover?.showButtons || e.getConfig("showButtons") || [],
		disableButtons: t?.popover?.disableButtons || e.getConfig("disableButtons") || []
	};
}
function W(e, t, n) {
	let r = e.getConfig("stagePadding") || 0;
	return {
		side: n.popover?.side || "bottom",
		align: n.popover?.align || "start",
		offset: r + (e.getConfig("popoverOffset") || 0),
		padding: r,
		centered: t.id === "driver-dummy-element"
	};
}
function Se(e, t, n) {
	let r = n.popover || {}, i = e.getState("activeIndex"), a = i !== void 0 && B(e, i + 1, 1) === void 0;
	return {
		title: r.title,
		description: r.description,
		...U(e, n),
		showProgress: r.showProgress || e.getConfig("showProgress") || !1,
		progressText: r.progressText ?? (e.getConfig("progressText") || R),
		nextBtnText: r.nextBtnText ?? (e.getConfig("nextBtnText") || "Next"),
		prevBtnText: r.prevBtnText ?? (e.getConfig("prevBtnText") || "Previous"),
		closeBtnLabel: r.closeBtnLabel ?? (e.getConfig("closeBtnLabel") || "Close"),
		doneButton: a,
		popoverClass: r.popoverClass || e.getConfig("popoverClass") || "",
		smoothScroll: e.getConfig("smoothScroll"),
		onNextClick: () => {
			a && e.setState("__destroyReason", "done");
			let r = V(e, n);
			return r ? r(t, n, e.getHookOpts()) : e.emit("nextClick");
		},
		onPrevClick: () => {
			let r = H(e, n);
			return r ? r(t, n, e.getHookOpts()) : e.emit("prevClick");
		},
		onCloseClick: () => {
			e.setState("__destroyReason", "close");
			let r = be(e, n);
			return r ? r(t, n, e.getHookOpts()) : e.emit("closeClick");
		},
		onRender: (t) => {
			e.setState("popover", t), (r.onPopoverRender || e.getConfig("onPopoverRender"))?.(t, e.getHookOpts());
		},
		position: W(e, t, n)
	};
}
function G(e, t, n) {
	N(e.getState("popover")), fe(t, Se(e, t, n));
}
function Ce(e, t, n) {
	let r = e.getState("popover");
	r && w(r, t, W(e, t, n));
}
var K = {
	"aria-haspopup": "dialog",
	"aria-expanded": "true",
	"aria-controls": "driver-popover-content"
}, q = /* @__PURE__ */ new WeakMap();
function we(e) {
	if (!q.has(e)) {
		let t = Object.fromEntries(Object.keys(K).map((t) => [t, e.getAttribute(t)]));
		q.set(e, t);
	}
	for (let [t, n] of Object.entries(K)) e.setAttribute(t, n);
}
function Te(e) {
	let t = q.get(e);
	if (t) {
		for (let [n, r] of Object.entries(t)) r === null ? e.removeAttribute(n) : e.setAttribute(n, r);
		q.delete(e);
	}
}
function Ee() {
	let e = document.getElementById("driver-dummy-element");
	if (e) return e;
	let t = document.createElement("div");
	return t.id = "driver-dummy-element", t.style.width = "0", t.style.height = "0", t.style.pointerEvents = "none", t.style.opacity = "0", t.style.position = "fixed", t.style.top = "50%", t.style.left = "50%", document.body.appendChild(t), t;
}
function De(e, t) {
	let n = D(t.element);
	n ||= Ee(), ke(e, n, t);
}
function Oe(e) {
	let t = e.getState("__activeElement"), n = e.getState("__activeStep");
	t && (F(e, t), ge(e), Ce(e, t, n));
}
function ke(e, t, n) {
	let r = e.getConfig("duration") || 400, i = Date.now(), a = e.getState("__activeStep"), o = e.getState("__activeElement") || t, s = !o || o === t, c = t.id === "driver-dummy-element", l = o.id === "driver-dummy-element", u = e.getConfig("animate"), d = n.onHighlightStarted || e.getConfig("onHighlightStarted"), f = n?.onHighlighted || e.getConfig("onHighlighted"), p = a?.onDeselected || e.getConfig("onDeselected"), m = e.getHookOpts();
	a && a !== n && p && p(l ? void 0 : o, a, m), d && d(c ? void 0 : t, n, m);
	let h = !s && u, g = !1;
	M(e.getState("popover")), e.setState("previousStep", a), e.setState("previousElement", o), e.setState("activeStep", n), e.setState("activeElement", t);
	let _ = () => {
		if (e.getState("__transitionCallback") !== _) return;
		let s = Date.now() - i, l = r - s <= r / 2;
		n.popover && l && !g && h && (G(e, t, n), g = !0), e.getConfig("animate") && s < r ? he(e, s, r, o, t) : (F(e, t), f && f(c ? void 0 : t, n, e.getHookOpts()), e.setState("__transitionCallback", void 0), e.setState("__previousStep", a), e.setState("__previousElement", o), e.setState("__activeStep", n), e.setState("__activeElement", t)), window.requestAnimationFrame(_);
	};
	e.setState("__transitionCallback", _), window.requestAnimationFrame(_), document.querySelectorAll(".driver-active-element-parent").forEach((e) => {
		e.classList.remove("driver-active-element-parent", "driver-active-element-parent-no-scroll");
	}), ae(t, e.getConfig("smoothScroll")), !h && n.popover && G(e, t, n), document.querySelectorAll(".driver-active-element").forEach((e) => {
		e.classList.remove("driver-active-element", "driver-no-interaction"), Te(e);
	}), (n.disableActiveInteraction ?? e.getConfig("disableActiveInteraction")) && t.classList.add("driver-no-interaction");
	let v = t.parentElement;
	v && v !== document.body && (v.classList.add("driver-active-element-parent"), O(v) && v.classList.add("driver-active-element-parent-no-scroll")), t.classList.add("driver-active-element"), t.id !== "driver-dummy-element" && we(t);
}
function Ae() {
	document.getElementById("driver-dummy-element")?.remove(), document.querySelectorAll(".driver-active-element").forEach((e) => {
		let t = e.parentElement;
		t && t !== document.body && t.classList.remove("driver-active-element-parent", "driver-active-element-parent-no-scroll"), e.classList.remove("driver-active-element", "driver-no-interaction"), Te(e);
	});
}
function J(e) {
	let t = e.getState("__resizeTimeout");
	t && window.cancelAnimationFrame(t), e.setState("__resizeTimeout", window.requestAnimationFrame(() => Oe(e)));
}
function je(e, t) {
	if (!e.getState("isInitialized") || t.key !== "Tab" && t.keyCode !== 9) return;
	let n = e.getState("__activeElement"), r = e.getState("popover")?.wrapper, i = A([...r ? [r] : [], ...n ? [n] : []]), a = i[0], o = i[i.length - 1];
	t.preventDefault(), t.shiftKey ? (i[i.indexOf(document.activeElement) - 1] || o)?.focus() : (i[i.indexOf(document.activeElement) + 1] || a)?.focus();
}
function Me(e, t) {
	(e.getConfig("allowKeyboardControl") ?? !0) && (t.key === "Escape" ? e.emit("escapePress") : t.key === "ArrowRight" ? e.emit("arrowRightPress") : t.key === "ArrowLeft" && e.emit("arrowLeftPress"));
}
function Ne(e, t) {
	let n = e.getState("__activeElement"), r = t.target;
	n && r && n.contains(r) && e.emit("activeElementClick");
}
function Pe(e) {
	let t = (t) => Me(e, t), n = (t) => je(e, t), r = () => J(e), i = () => J(e), a = (t) => Ne(e, t);
	e.setState("__events", {
		onKeyup: t,
		onKeydown: n,
		onResize: r,
		onScroll: i,
		onClick: a
	}), window.addEventListener("keyup", t, !1), window.addEventListener("keydown", n, !1), window.addEventListener("resize", r), window.addEventListener("scroll", i), document.addEventListener("click", a, !1);
}
function Fe(e) {
	let t = e.getState("__events");
	t && (window.removeEventListener("keyup", t.onKeyup), window.removeEventListener("keydown", t.onKeydown), window.removeEventListener("resize", t.onResize), window.removeEventListener("scroll", t.onScroll), document.removeEventListener("click", t.onClick, !1));
}
function Ie() {
	let e = {};
	function t(t = {}) {
		e = {
			animate: !0,
			duration: 400,
			allowClose: !0,
			allowScroll: !0,
			overlayClickBehavior: "close",
			overlayOpacity: .7,
			smoothScroll: !1,
			disableActiveInteraction: !1,
			advanceOnClick: !1,
			skipMissingElement: !1,
			waitForElement: 0,
			showProgress: !1,
			stagePadding: 10,
			stageRadius: 5,
			popoverOffset: 10,
			showButtons: [
				"next",
				"previous",
				"close"
			],
			disableButtons: [],
			overlayColor: "#000",
			...t
		};
	}
	return t(), {
		getConfig: ((t) => t ? e[t] : e),
		configure: t
	};
}
function Le() {
	let e = {}, t = ((t) => t ? e[t] : e), n = (t, n) => {
		e[t] = n;
	};
	function r() {
		e = {};
	}
	return {
		getState: t,
		setState: n,
		resetState: r
	};
}
function Re() {
	let e = {};
	function t(t, n) {
		e[t] = n;
	}
	function n(t) {
		e[t]?.();
	}
	function r() {
		e = {};
	}
	return {
		listen: t,
		emit: n,
		reset: r
	};
}
function ze(e = {}) {
	let t = Ie();
	t.configure(e);
	let n = Le(), r = Re(), i;
	return {
		getConfig: t.getConfig,
		setConfig: t.configure,
		getState: n.getState,
		setState: n.setState,
		resetState: n.resetState,
		listen: r.listen,
		emit: r.emit,
		resetEmitter: r.reset,
		getDriver: () => i,
		setDriver: (e) => {
			i = e;
		},
		getHookOpts: (e, r) => {
			let a = e || n.getState();
			return {
				config: t.getConfig(),
				state: a,
				driver: i,
				index: a.activeIndex,
				...r ? { reason: r } : {}
			};
		}
	};
}
var Y;
function Be(e = {}) {
	let t = ze(e), n = () => v("replaced", !1);
	function r(e = "close") {
		t.getConfig("allowClose") && v(e);
	}
	function i() {
		let e = t.getState("activeIndex");
		e !== void 0 && B(t, e + 1, 1) === void 0 && t.setState("__destroyReason", "done");
	}
	function a() {
		let { disableButtons: e } = U(t, t.getState("__activeStep"));
		e.includes("close") || r("escape");
	}
	function o(e) {
		let { showButtons: n, disableButtons: r } = U(t, t.getState("__activeStep"));
		return n.includes(e) && !r.includes(e);
	}
	function s() {
		let e = t.getConfig("overlayClickBehavior");
		if (t.getConfig("allowClose") && e === "close") v("overlay");
		else if (typeof e == "function") {
			t.setState("__destroyReason", "overlay");
			let n = t.getState("__activeStep");
			e(t.getState("__activeElement"), n, t.getHookOpts());
		} else if (e === "nextStep") {
			let e = t.getState("activeStep"), n = t.getState("activeElement"), r = V(t, e);
			if (r) {
				i(), r(n, e, t.getHookOpts());
				return;
			}
			c();
		}
	}
	function c() {
		let e = t.getState("activeIndex"), n = t.getConfig("steps") || [];
		if (e === void 0) return;
		let r = e + 1;
		n[r] ? _(r) : v("done");
	}
	function l() {
		let e = t.getState("activeIndex"), n = t.getConfig("steps") || [];
		if (e === void 0) return;
		let r = e - 1;
		n[r] ? _(r) : v("api");
	}
	function u(e) {
		(t.getConfig("steps") || [])[e] ? _(e) : v("api");
	}
	function d() {
		if (t.getState("__transitionCallback")) return;
		let e = t.getState("__activeStep");
		if (!e || !(e.advanceOnClick ?? t.getConfig("advanceOnClick"))) return;
		let n = t.getState("__activeElement"), r = V(t, e);
		r ? (i(), r(n, e, t.getHookOpts())) : c();
	}
	function f() {
		if (t.getState("__transitionCallback")) return;
		let e = t.getState("activeIndex"), n = t.getState("__activeStep"), r = t.getState("__activeElement");
		if (e === void 0 || n === void 0 || !(t.getConfig("steps") || [])[e - 1] || !o("previous")) return;
		let i = H(t, n);
		if (i) return i(r, n, t.getHookOpts());
		l();
	}
	function p() {
		if (t.getState("__transitionCallback")) return;
		let e = t.getState("activeIndex"), n = t.getState("__activeStep"), r = t.getState("__activeElement");
		if (e === void 0 || n === void 0 || !o("next")) return;
		let a = V(t, n);
		if (a) return i(), a(r, n, t.getHookOpts());
		c();
	}
	function m() {
		t.getState("isInitialized") || (Y && Y !== n && Y(), Y = n, t.setState("isInitialized", !0), document.body.classList.add("driver-active", t.getConfig("animate") ? "driver-fade" : "driver-simple"), t.getConfig("allowScroll") || document.body.classList.add("driver-no-scroll"), document.body.style.setProperty("--driver-animation-duration", `${t.getConfig("duration") || 400}ms`), Pe(t), t.listen("overlayClick", s), t.listen("activeElementClick", d), t.listen("escapePress", a), t.listen("closeClick", r), t.listen("arrowLeftPress", f), t.listen("arrowRightPress", p));
	}
	function h() {
		let e = t.getState("__pendingWaitCancel");
		e && (t.setState("__pendingWaitCancel", void 0), e());
	}
	function g(e, n, r) {
		let i = () => {
			a.disconnect(), window.clearTimeout(o), t.setState("__pendingWaitCancel", void 0), r();
		}, a = new MutationObserver(() => {
			D(e.element) && i();
		}), o = window.setTimeout(i, n);
		t.setState("__pendingWaitCancel", () => {
			a.disconnect(), window.clearTimeout(o);
		}), a.observe(document.documentElement, {
			childList: !0,
			subtree: !0,
			attributes: !0
		});
	}
	function _(e = 0, n = !1) {
		h(), t.setState("__destroyReason", void 0);
		let r = t.getConfig("steps");
		if (!r) {
			console.error("No steps to drive through"), v("api");
			return;
		}
		if (!r[e]) {
			v("api");
			return;
		}
		let i = r[e], a = i.waitForElement ?? t.getConfig("waitForElement") ?? 0;
		if (!n && a > 0 && i.element && !D(i.element)) {
			M(t.getState("popover")), g(i, a, () => _(e, !0));
			return;
		}
		if (z(t, i)) {
			let n = t.getState("activeIndex"), i = typeof n == "number" && e < n ? -1 : 1;
			r[e + i] ? _(e + i) : i === 1 && v("done");
			return;
		}
		t.setState("__activeOnDestroyed", document.activeElement), t.setState("activeIndex", e);
		let o = r[e + 1];
		De(t, xe(t, e, {
			onNextClick: () => {
				o ? _(e + 1) : v("done");
			},
			onPrevClick: () => {
				_(e - 1);
			},
			onCloseClick: () => {
				v("close");
			}
		}));
	}
	function v(e, r = !0) {
		if (!t.getState("isInitialized")) return;
		e === "api" && (e = t.getState("__destroyReason") ?? "api");
		let i = t.getState("__activeElement"), a = t.getState("__activeStep"), o = t.getState("__activeOnDestroyed"), s = t.getConfig("onDestroyStarted");
		if (r && s) {
			t.setState("__destroyReason", e), s(!i || i?.id === "driver-dummy-element" ? void 0 : i, a, t.getHookOpts(void 0, e));
			return;
		}
		Y === n && (Y = void 0);
		let c = a?.onDeselected || t.getConfig("onDeselected"), l = t.getConfig("onDestroyed");
		document.body.classList.remove("driver-active", "driver-fade", "driver-simple", "driver-no-scroll"), document.body.style.removeProperty("--driver-animation-duration"), h(), Fe(t), N(t.getState("popover")), Ae(), ye(t), t.resetEmitter();
		let u = t.getState();
		if (t.resetState(), i && a) {
			let n = i.id === "driver-dummy-element";
			c && c(n ? void 0 : i, a, t.getHookOpts(u, e)), l && l(n ? void 0 : i, a, t.getHookOpts(u, e));
		}
		o && o.focus();
	}
	let y = {
		isActive: () => t.getState("isInitialized") || !1,
		refresh: () => J(t),
		drive: (e = 0) => {
			m(), _(e);
		},
		setConfig: t.setConfig,
		setSteps: (e) => {
			h(), t.resetState(), t.setConfig({
				...t.getConfig(),
				steps: e
			});
		},
		getConfig: t.getConfig,
		getState: t.getState,
		getActiveIndex: () => t.getState("activeIndex"),
		isFirstStep: () => {
			let e = t.getState("activeIndex");
			return e !== void 0 && B(t, e - 1, -1) === void 0;
		},
		isLastStep: () => {
			let e = t.getState("activeIndex");
			return e !== void 0 && B(t, e + 1, 1) === void 0;
		},
		getActiveStep: () => t.getState("activeStep"),
		getActiveElement: () => t.getState("activeElement"),
		getPreviousElement: () => t.getState("previousElement"),
		getPreviousStep: () => t.getState("previousStep"),
		getNextStep: () => {
			let e = t.getConfig("steps") || [], n = t.getState("activeIndex");
			if (n === void 0) return;
			let r = B(t, n + 1, 1);
			return r === void 0 ? void 0 : e[r];
		},
		moveNext: c,
		movePrevious: l,
		moveTo: u,
		hasNextStep: () => {
			let e = t.getState("activeIndex");
			return e !== void 0 && B(t, e + 1, 1) !== void 0;
		},
		hasPreviousStep: () => {
			let e = t.getState("activeIndex");
			return e !== void 0 && B(t, e - 1, -1) !== void 0;
		},
		highlight: (e) => {
			m(), t.setState("__destroyReason", void 0), De(t, {
				...e,
				popover: e.popover ? {
					showButtons: [],
					showProgress: !1,
					progressText: "",
					...e.popover
				} : void 0
			});
		},
		destroy: () => {
			v("api", !1);
		}
	};
	return t.setDriver(y), y;
}
// src/onboarding/guide-entry.ts
var Ve = /* @__PURE__ */ l(v(), 1), He = g(), X = "侧栏收起时，先点左上角的导航按钮。", Z = (...e) => ({
	path: ["侧栏", ...e],
	hint: X
}), Ue = (e) => ({
	path: ["侧栏底部的设置", e],
	hint: X
});
function We(e) {
	if (e.surface) return e.id === "external" ? { path: [
		"作品卡片",
		"作品详情",
		"外部播放器"
	] } : e.surface === "subtitles" ? { path: [
		"作品卡片",
		"播放器齿轮",
		"字幕"
	] } : e.surface === "player" ? { path: ["作品卡片", "播放器底部控制条"] } : { path: [
		"首页",
		"点击作品卡片",
		"作品详情"
	] };
	if (!e.route) return;
	let [n, r = ""] = e.route.split("#")[0].split("?"), a = n.split("/")[2];
	if (n.startsWith("/settings/")) {
		let e = o[a];
		if (e) return Ue(e);
		let n = t[a];
		if (n) return {
			path: [
				"侧栏底部的设置",
				"Peach 配置",
				n
			],
			hint: X
		};
	}
	let c = new URLSearchParams(r);
	if (n === "/jav" || c.get("jav") === "1") return Z("JAV", i.find(([e]) => e === (c.get("tab") || "library"))?.[1] || i[0][1]);
	if (n === "/") {
		switch (e.id) {
			case "search": return {
				path: ["页面顶部", "搜索"],
				hint: "手机上先点放大镜，再输入关键词。"
			};
			case "navigation": return { path: ["左上角导航按钮", "侧栏中的浏览入口"] };
			case "library": return {
				path: ["侧栏顶部", "媒体库选择器"],
				hint: X
			};
			case "preferences": return Ue(o.appearance);
			case "wall": return { path: ["页面顶部", "播放墙按钮"] };
			case "immerse": return { path: ["页面顶部", "沉浸模式按钮"] };
			case "cards":
			case "detail": return { path: [
				"首页",
				"点击作品卡片",
				"作品详情"
			] };
			case "player": return {
				path: [
					"首页",
					"点击作品卡片",
					"播放入口"
				],
				hint: "开始播放后，在播放器中选择字幕和播放选项。"
			};
			case "filter": return {
				path: ["首页", "列表上方的筛选与排序"],
				hint: "来源、时长等更多筛选位于侧栏。"
			};
		}
		return Z("首页");
	}
	if ([
		"/review",
		"/quality-goals",
		"/trash"
	].includes(n)) return Z("管理", s["/data-cleanup"].title, n === "/trash" ? "回收站" : s[n].title);
	let l = s[n];
	if (l?.nav && l.title) {
		let e = Z(l.title);
		return n === "/playlists" && (e.hint = "若侧栏没有播放列表，到设置 → 外观与导航 → 导航入口与顺序添加；手机上先展开侧栏。"), e;
	}
	if (l?.section && l.title) return Z("管理", l.title);
}
// src/react/onboarding/guide-popover.tsx
var Q = _();
function Ge({ step: t, position: i, total: o, missing: s, next: l, previous: u, close: d, invitation: f }) {
	let p = y(), g = We(t);
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: "peach-guide-popover-content",
		onPointerDown: (e) => e.stopPropagation(),
		children: [
			/* @__PURE__ */ (0, Q.jsxs)("header", {
				className: "flex shrink-0 items-center justify-between gap-3 px-4 pt-4 pb-3",
				children: [/* @__PURE__ */ (0, Q.jsx)("h3", {
					id: "driver-popover-title",
					className: "text-body-medium text-text-primary",
					children: t.title
				}), /* @__PURE__ */ (0, Q.jsx)(c, {
					label: f ? "关闭教程提示" : "结束导览",
					onPress: d
				})]
			}),
			/* @__PURE__ */ (0, Q.jsx)("div", {
				className: "peach-guide-step-frame",
				children: /* @__PURE__ */ (0, Q.jsxs)("div", {
					ref: p,
					className: "peach-guide-step-body flex flex-col gap-3 px-4 pb-4",
					children: [
						g ? /* @__PURE__ */ (0, Q.jsxs)("section", {
							"aria-label": "打开方式",
							className: "flex flex-col gap-2 rounded-xl bg-background-secondary-default p-3",
							children: [
								/* @__PURE__ */ (0, Q.jsxs)("div", {
									className: "flex items-center gap-2 text-body-2-medium text-text-secondary",
									children: [/* @__PURE__ */ (0, Q.jsx)(m, {
										className: "size-4 shrink-0",
										"aria-hidden": "true"
									}), "打开方式"]
								}),
								/* @__PURE__ */ (0, Q.jsx)("ol", {
									className: "flex flex-wrap items-center gap-x-1 gap-y-1 text-body-2-medium text-text-primary",
									children: g.path.map((e, t) => /* @__PURE__ */ (0, Q.jsxs)("li", {
										className: "inline-flex items-center gap-1",
										children: [t ? /* @__PURE__ */ (0, Q.jsx)(h, {
											className: "size-4 shrink-0 text-text-secondary",
											"aria-hidden": "true"
										}) : null, /* @__PURE__ */ (0, Q.jsx)("span", { children: e })]
									}, `${t}-${e}`))
								}),
								g.hint ? /* @__PURE__ */ (0, Q.jsx)("p", {
									className: "text-caption-1-regular text-text-secondary",
									children: g.hint
								}) : null
							]
						}) : null,
						/* @__PURE__ */ (0, Q.jsx)("p", {
							id: "driver-popover-description",
							className: "text-body-regular text-text-secondary",
							children: t.body
						}),
						t.surface ? /* @__PURE__ */ (0, Q.jsx)("p", {
							className: "text-caption-1-regular text-text-secondary",
							children: "导览期间不自动播放；退出后仍按原来的播放设置使用。"
						}) : null,
						t.details?.length ? /* @__PURE__ */ (0, Q.jsx)(n, {
							summary: "更多说明",
							children: /* @__PURE__ */ (0, Q.jsx)(r, { details: t.details })
						}) : null,
						t.scope ? /* @__PURE__ */ (0, Q.jsx)("p", {
							className: "text-body-2-regular text-text-secondary",
							children: t.scope
						}) : null,
						s ? /* @__PURE__ */ (0, Q.jsx)(a, {
							tone: "neutral",
							children: t.surface ? "尚未取得可演示的视频或对应控件。请先添加视频，或跳过后稍后重看。" : "当前页面未显示这个入口，可能尚无内容、没有配置权限或仍在加载。可以跳过，稍后重看。"
						}) : null
					]
				})
			}),
			/* @__PURE__ */ (0, Q.jsx)("footer", {
				className: "flex shrink-0 flex-wrap items-center gap-2 border-t border-separator-border px-4 py-3",
				children: f ? /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)(e, {
					variant: "ghost",
					size: "small",
					className: "ml-auto",
					onClick: d,
					children: "稍后再说"
				}), /* @__PURE__ */ (0, Q.jsx)(e, {
					size: "small",
					"data-guide-next": "",
					onClick: () => l(),
					children: "打开教程"
				})] }) : /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [
					/* @__PURE__ */ (0, Q.jsxs)("span", {
						className: "mr-auto text-body-2-regular tabular-nums text-text-secondary",
						children: [
							i + 1,
							" / ",
							o,
							" 步"
						]
					}),
					/* @__PURE__ */ (0, Q.jsx)(e, {
						variant: "ghost",
						size: "small",
						onClick: d,
						children: "跳过本章"
					}),
					/* @__PURE__ */ (0, Q.jsx)(e, {
						variant: "secondary",
						size: "small",
						disabled: i === 0,
						onClick: u,
						children: "上一步"
					}),
					/* @__PURE__ */ (0, Q.jsx)(e, {
						size: "small",
						"data-guide-next": "",
						onClick: () => l(s),
						children: i === o - 1 ? "完成本章" : "下一步"
					})
				] })
			})
		]
	});
}
function Ke(e, t, n) {
	let r = document.createElement("div");
	e.replaceChildren(r, t);
	let i = (0, He.createRoot)(r);
	return (0, Ve.flushSync)(() => i.render(/* @__PURE__ */ (0, Q.jsx)(Ge, { ...n }))), () => i.unmount();
}
// src/onboarding/guide-driver.ts
function qe(e) {
	let t = e.getBoundingClientRect();
	if (!e.isConnected || !t.width || !t.height || t.right <= 0 || t.left >= innerWidth || e.closest("[hidden],[inert],[data-skeleton]")) return !1;
	for (let t = e; t; t = t.parentElement) {
		let e = getComputedStyle(t);
		if (e.display === "none" || e.visibility === "hidden" || e.visibility === "collapse" || e.opacity === "0") return !1;
	}
	return ![...e.querySelectorAll("[data-skeleton]")].some((e) => e.getBoundingClientRect().height > 0);
}
function Je(e) {
	if (!e) return;
	let t = e.split(",").flatMap((e) => [...document.querySelectorAll(e.trim())]).find(qe);
	if (t) return t.closest("[data-setting-row], [data-setting-sort-controls]") || t;
}
async function $(e, t, n = 4e3) {
	if (!e) return;
	let r = Date.now();
	for (; !t.aborted;) {
		let t = Je(e);
		if (t) return t;
		if (Date.now() - r >= n) return;
		await new Promise((e) => setTimeout(e, 80));
	}
}
function Ye(e) {
	let t = null, n = null, r = !1, i = !1, a, o = 0, s, c, l = () => {
		c &&= (f(!1, !1, { miniplayer: !1 }), c(), void 0);
	}, m = document.activeElement, h = (t) => {
		let n = new URL(t, location.origin);
		if (location.pathname !== n.pathname || n.search && location.search !== n.search || n.hash && location.hash !== n.hash) {
			new URLSearchParams(location.search).has("edit") && n.searchParams.set("edit", ""), r = !0;
			try {
				e.navigate(`${n.pathname}${n.search}${n.hash}`);
			} finally {
				r = !1;
			}
		}
	}, g = (t) => {
		if (t.target instanceof Element && t.target.closest("[data-copy-inline], [data-copy-input]")) return;
		if (t.key === "Escape") {
			t.preventDefault(), t.stopImmediatePropagation(), e.close();
			return;
		}
		let n = document.querySelector(".peach-guide-popover");
		if (!n) return;
		let r = e.invitation && t.target instanceof Element && t.target.closest("#tutorialBtn");
		if (!n.contains(t.target) && !r && t.key !== "Tab") {
			t.preventDefault(), t.stopImmediatePropagation();
			return;
		}
		if (t.key !== "Tab") return;
		let i = [...n.querySelectorAll("button:not([disabled]), summary, a[href], [tabindex=\"0\"]")].filter((e) => e.offsetWidth && e.offsetHeight), a = e.invitation ? document.getElementById("tutorialBtn") : null;
		a && i.unshift(a);
		let o = i.indexOf(document.activeElement);
		t.preventDefault(), t.stopImmediatePropagation(), i[(o + (t.shiftKey ? -1 : 1) + i.length) % i.length]?.focus();
	};
	window.addEventListener("keydown", g, !0), window.addEventListener("resize", d);
	let _ = p.listen(() => {
		r || (e.leave || e.close)();
	}), v = () => {
		n?.abort(), cancelAnimationFrame(o), a?.(), a = void 0, t?.destroy(), t = null;
	};
	return {
		async show(r, f, p) {
			v(), d();
			let m = new AbortController();
			n = m, document.querySelector("#stage .vjs-peach-settings-toggle[aria-expanded=\"true\"]")?.click();
			let g = r.route;
			if (r.surface || l(), r.surface) {
				if (!s) {
					h("/");
					let e = await $("[data-guide-video][data-id]", m.signal), t = Number(e?.dataset.id);
					Number.isSafeInteger(t) && t > 0 && (s = t);
				}
				if (i || m.signal.aborted) return;
				s && (c ||= u(), g = `/assets/${s}`);
			}
			if (g && h(g), r.surface === "subtitles" && s) {
				let e = await $("#stage .vjs-peach-settings-toggle", m.signal);
				!m.signal.aborted && e?.getAttribute("aria-expanded") !== "true" && e?.click();
			}
			let _ = await $(r.target, m.signal);
			if (i || m.signal.aborted) return;
			let y = !_;
			t = Be({
				animate: !1,
				smoothScroll: !1,
				disableActiveInteraction: !e.invitation,
				allowKeyboardControl: !1,
				allowClose: !0,
				overlayClickBehavior: () => e.close(),
				stagePadding: 6,
				stageRadius: parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--control-radius")) || 8,
				popoverClass: "peach-react peach-guide-popover",
				showButtons: [],
				onPopoverRender(t) {
					a?.();
					let n = document.querySelector("#stage[open]");
					if (r.surface && n) {
						n.append(t.wrapper);
						let e = document.querySelector(".driver-overlay");
						e && n.append(e);
					}
					t.wrapper.setAttribute("role", "dialog"), t.wrapper.setAttribute("aria-modal", "true"), a = Ke(t.wrapper, t.arrow, {
						step: r,
						position: f,
						total: p,
						missing: y,
						...e
					});
				},
				onNextClick: () => e.next(y),
				onDoneClick: () => e.next(y),
				onPrevClick: () => e.previous(),
				onCloseClick: () => e.close()
			});
			let b = () => t?.highlight({
				element: _,
				popover: {
					side: "bottom",
					align: "center",
					showButtons: []
				}
			});
			b();
			let x = "", S = () => {
				if (i || m.signal.aborted) return;
				let e = r.surface ? document.querySelector("#stage[open]") : null, n = document.querySelector(".driver-overlay");
				e && n && n.parentElement !== e && e.append(n);
				let a = Je(r.target);
				a !== _ && (_ = a, y = !a, b(), x = "");
				let s = _?.getBoundingClientRect(), c = window.visualViewport, l = `${s?.x}:${s?.y}:${s?.width}:${s?.height}:${innerWidth}:${innerHeight}:${c?.height}:${c?.offsetTop}`;
				l !== x && (x = l, t?.refresh()), o = requestAnimationFrame(S);
			};
			o = requestAnimationFrame(S), queueMicrotask(() => {
				m.signal.aborted || document.querySelector(".peach-guide-popover [data-guide-next]")?.focus();
			});
		},
		stop() {
			i = !0, v(), _(), l(), window.removeEventListener("keydown", g, !0), window.removeEventListener("resize", d), m?.isConnected && m.getBoundingClientRect().width && m.focus();
		}
	};
}
export { Ye as createGuideSession };

//# debugId=0f2dd4b3-fa00-449b-936e-67875e98a681