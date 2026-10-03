import { playUiSound as e } from "/js/ui-sounds.js";
import { esc as t, icon as n } from "/js/core.js";
//#region src/ui-kit/overlay-scrollbar.ts
function r(e, { variant: t = "" } = {}) {
	if (!e || e.dataset.overlayScrollbar) return null;
	let n = e === document.documentElement, r = n ? document.body : e.parentElement;
	if (!r) return null;
	e.dataset.overlayScrollbar = "true", !n && getComputedStyle(r).position === "static" && (r.style.position = "relative");
	let i = n ? null : document.createElement("div");
	i && (i.className = "ov-edges", i.setAttribute("aria-hidden", "true"), i.innerHTML = "<span class=\"ov-edge-top\"></span><span class=\"ov-edge-bottom\"></span>", r.append(i));
	let a = (n ? ["y"] : ["y", "x"]).map((e) => {
		let n = document.createElement("div");
		n.className = `ovtrack ${e === "y" ? "ov-y" : "ov-x"}${t ? ` ${t}` : ""}`;
		let i = document.createElement("div");
		return i.className = "ovthumb", n.append(i), r.append(n), {
			axis: e,
			track: n,
			thumb: i
		};
	}), o = () => {
		let t = 0, n = 0, i = e;
		for (; i && i !== r;) {
			let e = i;
			t += e.offsetLeft, n += e.offsetTop, i = e.offsetParent;
		}
		if (i === r) return {
			left: t,
			top: n
		};
		let a = r.getBoundingClientRect(), o = e.getBoundingClientRect();
		return {
			left: o.left - a.left - r.clientLeft,
			top: o.top - a.top - r.clientTop
		};
	}, s = ({ axis: t, track: i }) => {
		if (n) return;
		let { left: a, top: s } = o();
		t === "y" ? (i.style.top = `${s + 8}px`, i.style.height = `${Math.max(0, e.clientHeight - 16)}px`, i.style.right = `${r.clientWidth - a - e.clientWidth}px`) : (i.style.left = `${a + 8}px`, i.style.width = `${Math.max(0, e.clientWidth - 16)}px`, i.style.bottom = `${r.clientHeight - s - e.clientHeight}px`);
	}, c = () => {
		if (i) {
			let { left: t, top: n } = o(), r = e.scrollHeight - e.clientHeight, a = r > 1 && e.scrollTop > 1, s = r > 1 && e.scrollTop < r - 1;
			i.hidden = !a && !s, i.style.left = `${t}px`, i.style.top = `${n}px`, i.style.width = `${e.clientWidth}px`, i.style.height = `${e.clientHeight}px`, i.classList.toggle("can-scroll-top", a), i.classList.toggle("can-scroll-bottom", s), a || s ? (e.style.setProperty("--scroll-edge-top", a ? "16px" : "0px"), e.style.setProperty("--scroll-edge-bottom", s ? "16px" : "0px")) : (e.style.removeProperty("--scroll-edge-top"), e.style.removeProperty("--scroll-edge-bottom")), e.toggleAttribute("data-scroll-edges", a || s);
		}
		a.forEach((t) => {
			let { axis: n, track: r, thumb: i } = t, a = n === "y", o = a ? e.clientHeight : e.clientWidth, c = a ? e.scrollHeight : e.scrollWidth, l = c - o;
			if (l <= 1) {
				r.hidden = !0;
				return;
			}
			r.hidden = !1, s(t);
			let u = a ? r.clientHeight : r.clientWidth;
			if (!u) return;
			let d = Math.max(24, Math.min(u, o / c * u)), f = u - d, p = a ? e.scrollTop : e.scrollLeft, m = f > 0 ? p / l * f : 0;
			i.style[a ? "height" : "width"] = `${d}px`, i.style.transform = `translate${a ? "Y" : "X"}(${m}px)`;
		});
	};
	return (n ? document : e).addEventListener("scroll", c, { passive: !0 }), new ResizeObserver(c).observe(e), n || e.addEventListener("load", c, !0), n ? new ResizeObserver(c).observe(document.body) : new MutationObserver(c).observe(e, {
		childList: !0,
		characterData: !0,
		subtree: !0
	}), a.forEach(({ axis: t, track: n, thumb: r }) => n.addEventListener("pointerdown", (i) => {
		let a = t === "y", o = n.getBoundingClientRect(), s = r.getBoundingClientRect(), c = a ? o.height - s.height : o.width - s.width, l = a ? e.scrollHeight - e.clientHeight : e.scrollWidth - e.clientWidth;
		if (c <= 0 || l <= 0) return;
		let u = (e) => a ? e.clientY : e.clientX, d = a ? s.top : s.left, f = a ? s.bottom : s.right, p = u(i) >= d && u(i) <= f ? u(i) - d : (a ? s.height : s.width) / 2, m = a ? o.top : o.left, h = (t) => {
			let n = Math.max(0, Math.min(l, (u(t) - m - p) / c * l));
			a ? e.scrollTop = n : e.scrollLeft = n;
		}, g = () => {
			n.classList.remove("dragging"), n.removeEventListener("pointermove", h), n.removeEventListener("pointerup", g), n.removeEventListener("pointercancel", g);
		};
		n.classList.add("dragging"), n.setPointerCapture(i.pointerId), n.addEventListener("pointermove", h), n.addEventListener("pointerup", g), n.addEventListener("pointercancel", g), h(i), i.preventDefault();
	})), c(), c;
}
//#endregion
//#region src/ui-kit/collapse.ts
function i(e, t, n, r = "summary") {
	e?.querySelectorAll(t).forEach((e, t) => {
		if (e.querySelector(":scope > .fcollapse")) return;
		let i = document.createElement("div");
		i.className = "fcollapse";
		let a = document.createElement("div");
		a.className = "fcollapsebody", [...e.children].forEach((e) => {
			e.tagName !== "SUMMARY" && a.appendChild(e);
		}), i.appendChild(a), e.appendChild(i);
		let s = e.querySelector(r);
		r !== "summary" && e.querySelector("summary").addEventListener("click", (e) => e.preventDefault());
		let c = e.open;
		i.id = `${n}-${t}`, i.inert = !c, c && i.classList.add("fcollapse-settled"), s.setAttribute("aria-controls", i.id), s.setAttribute("aria-expanded", String(c)), s.addEventListener("click", (t) => {
			t.preventDefault(), c = !c, s.setAttribute("aria-expanded", String(c)), o(e, i, c);
		});
	});
}
var a = /* @__PURE__ */ new WeakMap();
function o(e, t, n) {
	t.classList.add("fcollapse");
	let r = (a.get(t) || 0) + 1;
	a.set(t, r);
	let i = () => a.get(t) === r;
	if (n) {
		t.inert = !1;
		let n = e.open ? t.getBoundingClientRect().height : 0;
		e.open = !0, c(t, n, i);
	} else t.inert = !0, t.classList.remove("fcollapse-settled"), t.style.height = t.getBoundingClientRect().height + "px", t.getBoundingClientRect(), t.style.height = "0px", s(t, () => {
		i() && (e.open = !1, t.style.height = "");
	});
}
function s(e, t) {
	let n = !1, r, i = (a) => {
		a && a.propertyName !== "height" || n || (n = !0, e.removeEventListener("transitionend", i), clearTimeout(r), t());
	};
	e.addEventListener("transitionend", i), r = setTimeout(i, 260);
}
function c(e, t, n = () => !0) {
	e.classList.remove("fcollapse-settled"), e.style.height = t + "px", e.getBoundingClientRect(), e.style.height = e.scrollHeight + "px", s(e, () => {
		n() && (e.style.height = "auto", e.classList.add("fcollapse-settled"));
	});
}
//#endregion
//#region src/ui-kit/anchored-menu.ts
var l = null, u = globalThis;
u.__peachMenuCloser || (u.__peachMenuCloser = !0, document.addEventListener("click", (e) => {
	if (!l) return;
	let t = e.target;
	l.menu.contains(t) || l.toggle.contains(t) || l.mount.contains(t) && !(t instanceof Element && t.closest("a[href],button,input,select,textarea,summary,[role=button],[role=menuitem],[tabindex]")) || l.setOpen(!1);
}, !0));
function d() {
	l && l.setOpen(!1);
}
var f = /* @__PURE__ */ new WeakMap();
function p(t) {
	f.delete(t), t.classList.remove("leaving"), t.hidden && e("whoosh"), t.hidden = !1;
}
function m(e, t) {
	if (e.hidden || f.has(e)) return;
	let n = () => {
		f.get(e) === n && (f.delete(e), e.classList.remove("leaving"), e.hidden = !0, t && t());
	};
	if (f.set(e, n), e.classList.add("leaving"), getComputedStyle(e).animationName === "none") {
		n();
		return;
	}
	e.addEventListener("animationend", (t) => {
		t.target === e && n();
	}, { once: !0 }), setTimeout(n, 240);
}
var h = () => 8 + (parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--topH")) || 0);
function g(e, t) {
	return e.target instanceof Node && e.target.contains(t);
}
function _(e, t, n, { side: r = !1, align: i = "end" } = {}) {
	let a = () => {
		let e = t.getBoundingClientRect(), a = n.offsetWidth;
		if (r && innerWidth >= 640) {
			n.dataset.placement = "right", n.style.maxHeight = Math.max(0, innerHeight - 32) + "px", n.style.left = Math.max(16, Math.min(e.right + 8, innerWidth - a - 16)) + "px", n.style.top = Math.max(16, Math.min(e.top, innerHeight - n.offsetHeight - 16)) + "px";
			return;
		}
		let o = h(), s = innerHeight - 8 - e.bottom - 8, c = e.top - 8 - o, l = n.scrollHeight + n.offsetHeight - n.clientHeight, u = s >= l || s >= c, d = Math.min(l, Math.max(u ? s : c, 0));
		n.dataset.placement = u ? "bottom" : "top", n.style.maxHeight = d + "px";
		let f = i === "start" || n.classList.contains("context-card") ? e.left : e.right - a;
		n.style.left = Math.max(8, Math.min(f, innerWidth - a - 8)) + "px", n.style.top = (u ? e.bottom + 8 : e.top - 8 - d) + "px";
	}, o = (e) => {
		g(e, t) && u(!1);
	}, s = n.hasAttribute("popover"), c = !1, u = (r) => {
		r ? (l && l.mount !== e && l.setOpen(!1), c = !0, p(n), s && !n.matches(":popover-open") && n.showPopover(), a(), window.addEventListener("resize", a), window.addEventListener("scroll", o, {
			capture: !0,
			passive: !0
		})) : (c = !1, window.removeEventListener("resize", a), window.removeEventListener("scroll", o, !0), m(n, () => {
			n.style.left = "", n.style.top = "", n.style.maxHeight = "", s && n.matches(":popover-open") && n.hidePopover();
		})), t.setAttribute("aria-expanded", String(r)), l = r ? {
			mount: e,
			menu: n,
			toggle: t,
			setOpen: u
		} : l && l.mount === e ? null : l;
	};
	return t.addEventListener("click", (e) => {
		e.stopPropagation(), u(!c);
	}), e.addEventListener("keydown", (e) => {
		e.key === "Escape" && c && (e.stopPropagation(), u(!1), t.focus());
	}), {
		setOpen: u,
		isOpen: () => c
	};
}
//#endregion
//#region src/ui-kit/select-field.ts
function v(e) {
	return e ? e.startsWith("data:image/png;base64,") ? `<img class="gselectmark" src="${t(e)}" alt="" width="16" height="16">` : n(e, "gselectmark") : "";
}
function y(e, r, { label: i = "", attr: a = "", className: o = "" } = {}) {
	let s = e.find(([e]) => String(e) === String(r)) || e[0] || ["", ""], c = ([, e, n]) => `${v(n)}${t(e)}`, l = e.map(([e, n, r]) => `<button type="button" role="option" data-select-option="${t(e)}"
      aria-selected="${String(e) === String(s[0])}" tabindex="-1"><span data-select-content>${c([
		e,
		n,
		r
	])}</span></button>`).join("");
	return `<div class="gselect${o ? ` ${t(o)}` : ""}" ${a}>
    <button type="button" class="gselectfield" data-select-trigger aria-haspopup="listbox"
      aria-expanded="false" aria-label="${t(i)}"><span data-select-label>${c(s)}</span>${n("chevron-down")}</button>
    <div class="popmenu gselectmenu" role="listbox" aria-label="${t(i)}" popover="manual" data-select-menu hidden>${l}</div></div>`;
}
function b(e) {
	let t = e.querySelector("[data-select-trigger]"), n = e.querySelector("[data-select-menu]"), r = e.querySelector("[data-select-label]"), i = () => [...n.querySelectorAll("[data-select-option]")], a = () => n.querySelector("[aria-selected=\"true\"]");
	t.addEventListener("click", () => {
		let r = `${t.getBoundingClientRect().width}px`;
		n.style.minWidth = r, e.hasAttribute("data-fixed-width") && (n.style.width = r);
	});
	let o = _(e, t, n);
	t.addEventListener("click", () => {
		o.isOpen() && a()?.focus();
	});
	let s = (e) => {
		let t = i().find((t) => t.dataset.selectOption === String(e));
		t && (i().forEach((e) => {
			e.setAttribute("aria-selected", String(e === t)), e.tabIndex = e === t ? 0 : -1;
		}), r.innerHTML = t.querySelector("[data-select-content]").innerHTML);
	};
	return i().forEach((n) => {
		n.onclick = () => {
			let r = n.getAttribute("aria-selected") !== "true";
			s(n.dataset.selectOption), o.setOpen(!1), t.focus(), r && e.dispatchEvent(new Event("change", { bubbles: !0 }));
		}, n.onkeydown = (e) => {
			if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
			e.preventDefault();
			let t = i();
			t[(t.indexOf(n) + (e.key === "ArrowDown" ? 1 : -1) + t.length) % t.length].focus();
		};
	}), a() && (a().tabIndex = 0), Object.defineProperty(e, "value", {
		configurable: !0,
		get: () => a()?.dataset.selectOption ?? "",
		set: (e) => s(e)
	}), Object.defineProperty(e, "disabled", {
		configurable: !0,
		get: () => t.disabled,
		set: (e) => {
			t.disabled = !!e, e && o.setOpen(!1);
		}
	}), e;
}
//#endregion
//#region src/ui-kit/media-source-icons.ts
var x = {
	local: "hard-drive",
	115: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAHB0lEQVR4nO2bbUwURxjH/zN38qIcb4JWoIoHFYumWhDbRquNiSlYC4ZGjVYrotHWD1VTLdY00X7zbA22Na21KWqsUMHYSiygJjaRQDW+VK2YioBarVZBQA9QDm6nedajCuxxHrfH7dX+kiXcvszM8+zO7DPP/JfBzcQmfx4O1jpJEmKUgBTHwUYIIAyAwbYRZtoYUCdBVDLwi5yxCgjfo1Uly2vd2T7mjkJj3vgsUVitcwWkqQxstAv1CAFxnoEfZjpdbvXPq05p1gFxqSZDexuWCIhMCMTDHTBcYGA5+n7YdrEwy6xOkS4yJi07uMliWSGEeB9ACPqGBsbYFwE+PpvP7l/Z6BEHCCFYzDRTBgATBMLhCRhofMiqLsrawRgTvSuiFxinbxjK2pErgAnQAAwoE3rMrTmw5s9eXOscxpSNE5iQ9glgEDQEA24LxtNrij8sc+Y67szJscmmTAjpiNaMJ+Q2CemI3Ea1n4CZM/N1p5pqPoXASngDDNmJAcbVBQWzrI5PfRLjzTX7AKTCuyhMNBjTHTmBOypFvvPeZzyRamt775+A2GRTpgTxHbwYDraoqiQrx2kHGFM2TqBBBYAPvBsLGJ9i7+3AenjPn9DiaN/rV6QeSUpxgl4pwotNMeWqbXw/PceYuAiEBvk7dZ2/Xz8MCQvE2JERGB4ZgteXOt8jyRY5cBPi1a4Ro77rybbwVtUIzzDAF7mmOYiPGexSOZt2Hu31tRS12mzbbvctMCYtO1iO7VVmUXqSy8bX323Bjp9OutoUk81GZQc0WSwr1J7YBAb4IiNtnMvlbCs4jpYHba4VIhAu26jkgLhUk8E2pVWVRenj5S7QWyxtVhQcOoecH0+o0h6ykWztNga0t2GJ2vP5oAA/ZKQldtv/1Q+/Yv8vFWg0P3BYhrm5Fa2WdjWbFWKzdVMnB8iZHJVZ/NZ4BPTvfPfzis64NJipgc1W2QG8I4endhor2OCHd1ITOu27/6AN2btK4XEE4mWbYXMAJTD74u5/f+A07jS2QAt02MzlH5Cmqn/3u/d9vV6HyeOM8nFP02Ezo7y9hPu31MwQr86YjHdnv9zjOTXX7+D4uWsoKv0D5WeuwgMIDv/Belq0gFDP+JBAf8zv0veVMEYNlLc508bir1t3sffw78g/eA5/16mS7X4SGNnOacVG7b4/wN+5CWTk4CAsnzcRh79djPlvOnaeWkhCjOK0XKVmoXWNzdhTchalpy7Ld9YZ+vv5YP2yqfK8YfDAALgbASmOxSRvoGmv67GqHcJCBuDFkRHybC5pdBQSno8EY457XPW1O5i9ajca7t13V9Oo359kxuQNlwFEo494JsyAGVNGYeGMcbJzeuLcxZt4e02e63MA+1yh1+C/cXFfQIPc1vxjmJSxFZt3lcJqleye+0LcEKyYP9GdzTH0uQM6oPj+y9xyzM3Kw83ae3bPmzc9ARGDAt3qAI9ysuI6Zn2wG7X1TYrHfX30WDb7FbfVz23iBI9yo/YeFq/bK88VlJicZHRX1WZNOIA4X3ULuw6cVjwWER6I6Ai3rLybOclSoBFy9p2wO/ePHTpQ9foYUMdJkwONUNvQjIuXlSVBOp36w5UEUclJkAQNcdPOXIDTs6oyjMRYshpLQ1gl5big5nq96nVxxio4SdEeps21QVx0uGJesPKK6mo5QbZz0uGRFA0agMLk4ZGh3faX/XaF9HKqQjZXlSyvlUcW0uFBA9BUWKmvUxZZbTps5vIPnS4XHoZecwsU0mgHyypRUU0JK3XpsJnTH1mByXABHoKySFvWzpAXQrtOiT/aXKx+hQwXOlSn/NE+ZldE4E6GDQlGwaZ5eG4YyYcfcbu+CRkf5+Nuk+PFE2d53Fbe8Q/JT0mBiT6CJjlLZ76Eoq8zMTyq88B36WodFqzdgxu37c8SXaDBZqtMpxEnJsW0XgixDm6CNAKUGaLU+OzkMQgN6t/peLtVwjf5x7Alr1xeE3QHjLFPqouz1ivqAwJ8fDabLa3LXF0hHjEsDBMSoqHjHH4+egwM7g9jVCgS46O69XOC0l6Hyiuxs/CU3VBYFRhqycbOu7pgTNmwEAI5aiyMvjbeiEkJRhifDUXkoCB5qbyt3YrmFguu3mxE5dVaHCq7hPIzV2CV+iAWY8isKV6zvUcHiIcSmVKt6IDV1BNXFWd1k8jwbicyJkh4TMIi/EewiaTmKinKudIFpKYi4bEsMfN+LLKI2o6SnNu7inR1HOw9eDlkQ08Kct7TxbLCkiEb3gpDdk8qUcJhmoVU1yQ8hvdRaGs7XHJAQcEsK6muvepJILn8EyjFCafyTDbx9Nca1g9bqM87euwfhzlbw1P9yQxBFZDwmAILaATbR1NJzhpP/P/ZHFzkqf1wsitP7aezSjyVH0/DDlr/fP4fOwTeE5lpP+gAAAAASUVORK5CYII=",
	pikpak: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACY0lEQVR4nNWXy2tTQRSHv7m5RUWttqlNW1OairhKNbrU+lhE/AOkdCOIIO7arty0QhSxCIIQ7VJwIfgfCIJdFB+rgC32AVIflD5CbFUsoohJRiZzb5Ne05p4kxv94HCTc+bO+c0MM3eOoICD/TJswAAQBdoBH5UhA8wDo1mIv7ojpuyAsH9EBuQgkmuASXVJI4lN3BXDawIifXIQwQ28RDA0ERfDwpr2cQ9G7iSdhcOGteZeJ1eYKreB5DS1I2oiCJba2hDQVA9tjdDaCHMfICuhMwDJz5D8BMtftK9E2s2NttrJMOxvzSdT1rIb6goW69KIXsjr5/K+nxlIWWKWrOebJIxNFhXgK7r20QjcPL+59PllGH8LarDvU3oWFHU+CDZpK+TKA3j88vd+zGKd93av/y8lrKxao7Ls6bROrrj6EE6E9WzZppZKrJ0y0Hu8RAGhZuhohqk5nShp2Y/0+nZqxPaoFQsr2my2mNDSkBe01w/7AvAu9QcB/nrYs0vboU4qSsNOwCHAoMYY/5WAsckNt1NJ8WKY5TS+fF8/E7f/Lu5aQDrjLu5agOlzF3ct4NYFd3HXAk51uYv/k9vQLPeFr9/h4gh0dcCBNu17vaiP7nt9sGNblQVs3wo9x+DZNCRm9aUyFICebh0rF9PpWP22+QvqC3f2qLZyKda34XTMLsGLGSrO8xndtxMR6ZfqQ+tz7uczRyDor0zyxY/6LlDkoMqYVsUSKvSqho8SVB/JglqCUWqF4ImharVcueQ96j4bN3KFoiDmeXpJTOXO7QJVoyEZ8mgm0rm6sLA4talFef4LaurBZfZxNPMAAAAASUVORK5CYII="
};
//#endregion
export { x as MEDIA_SOURCE_ICONS, r as attachOverlayScrollbar, d as closeAnchoredMenu, m as dismissMenu, c as growCollapse, p as presentMenu, g as scrollMovesAnchor, y as selectFieldHtml, v as selectOptionIconHtml, o as setCollapseOpen, _ as wireAnchoredMenu, i as wireCollapse, b as wireSelectField };
