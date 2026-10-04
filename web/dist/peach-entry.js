//#region src/core/index.ts
var e = (e) => document.querySelector(e), t = {
	"text-aa": 1.435,
	"mark-javdb": 326 / 111
}, n = (e, n = "") => {
	let r = t[e], i = [r ? "iconwide" : "", n].filter(Boolean).join(" "), a = r ? `0 0 ${(24 * r).toFixed(2)} 24` : "0 0 24 24";
	return `<svg${i ? ` class="${i}"` : ""} viewBox="${a}" aria-hidden="true"><use href="#i-${e}"/></svg>`;
};
function r(e, t = 0) {
	let n = String(e?.message ?? e ?? ""), r = Number(t || e?.status || n.match(/\b(400|401|403|404|408|409|413|429|500|502|503|504)\b/)?.[1]), i = {
		400: "提交内容有误，请检查输入后重试。",
		401: "登录已失效，请刷新页面重新登录。",
		403: "当前设备没有执行此操作的权限，请在运行 Peach 的电脑上操作。",
		404: "请求的内容已不存在，请刷新列表。",
		408: "请求超时，请稍后重试。",
		409: "当前状态不允许此操作，请刷新后重试。",
		413: "提交内容过大，请减少数量后重试。",
		429: "请求过于频繁，请稍后重试。",
		500: "Peach 服务处理失败，请重试；持续失败时查看托盘日志。",
		502: "连接上游服务失败，请检查代理或来源服务。",
		503: "Peach 服务暂时不可用，请稍后重试。",
		504: "等待服务响应超时，请稍后重试。"
	};
	return /Failed to fetch|fetch failed|NetworkError|Load failed|network request failed|ERR_CONNECTION/i.test(n) ? "无法连接到 Peach 服务，请确认网络连接和托盘服务已启动。" : e?.name === "TimeoutError" || /timed? ?out|timeout/i.test(n) ? "等待服务响应超时，请检查连接后重试。" : /[㐀-鿿]/.test(n) && !/^请求失败[（(]/.test(n) ? n : i[r] ? i[r] : "操作未完成，请重试；持续失败时查看托盘日志。";
}
var i = async (e, t) => {
	if (!t?.method || t.method === "GET") {
		let t = sessionStorage.getItem("peach.library");
		t && /^\/api\/(items|facets)(\?|$)/.test(e) && (e += (e.includes("?") ? "&" : "?") + "library=" + encodeURIComponent(t));
	}
	let { signal: n = null, ...i } = t || {}, a = {
		headers: { "Content-Type": "application/json" },
		...i
	};
	n && (a.signal = n);
	let o;
	try {
		o = await fetch(e, a);
	} catch (e) {
		throw e?.name === "AbortError" ? e : Error(r(e), { cause: e });
	}
	let s = null;
	try {
		s = await o.json();
	} catch {}
	if (!o.ok) {
		let e = s && (s.message || s.detail || s.error);
		throw Error(r(e, o.status));
	}
	return s;
}, a = (e) => e?.name === "AbortError", o = async (e, t, n) => {
	let r = [...e], i = Array(r.length), a = 0, o = async () => {
		for (; a < r.length;) {
			let e = a++;
			try {
				i[e] = {
					ok: !0,
					value: await n(r[e], e)
				};
			} catch (t) {
				i[e] = {
					ok: !1,
					error: t
				};
			}
		}
	}, s = Math.min(Math.max(1, t), r.length);
	return await Promise.all(Array.from({ length: s }, o)), i;
}, s = {
	fresh: "/unseen",
	later: "/watch-later",
	flagged: "/flagged",
	ads: "/junk-files"
}, c = Object.fromEntries(Object.entries(s).map(([e, t]) => [t, e])), l = {
	fresh: "没看过",
	later: "稍后看",
	flagged: "已标记",
	ads: "垃圾文件"
}, u = (e) => e === "/" || Object.prototype.hasOwnProperty.call(c, e), d = {
	performer: "performers",
	studio: "studios",
	creator: "creators",
	series: "series",
	agency: "agencies"
}, f = {
	performers: "performer",
	studios: "studio",
	creators: "creator",
	series: "series",
	agencies: "agency"
}, p = (e, t) => `/${d[e] || e}/${encodeURIComponent(t)}`, m = (e) => String(e ?? "").replace(/[&<>"']/g, (e) => ({
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;"
})[e]), h = [
	["nax-pro.com", "NAX"],
	["t-powers.co.jp", "T-POWERS"],
	["dmm.co.jp", "DMM"],
	["mgstage.com", "MGStage"],
	["av-event.jp", "AV-EVENT"],
	["k-mib.com", "K-MIB"],
	["minnano-av.com", "みんなのAV"],
	["km-produce.com", "KMP"],
	["mousouzoku-av.com", "妄想族"],
	["mines-pro.jp", "マインズ"],
	["lightpro.jp", "LIGHT"],
	["eltra.jp", "ELTRA"],
	["linx.live", "LINX"],
	["bambi.ne.jp", "Bambi"],
	["prestige-av.com", "Prestige"],
	["cmore.jp", "C-more"],
	["so-agent.jp", "SO MODEL"],
	["attractive-llc.net", "Attractive"],
	["krone-web.jp", "KRONE"],
	["actentertainment.jp", "ACT"],
	["crusegroup.net", "Cruse"],
	["prime-recruit.com", "Prime"],
	["life-promotion.com", "Life"],
	["8man.jp", "Eightman"],
	["senzai.tv", "Five"],
	["maxing.jp", "MAXING"],
	["s1s1s1.com", "S1"],
	["ideapocket.com", "Idea Pocket"],
	["faleno.jp", "FALENO"],
	["capsule.bz", "Capsule"],
	["sod.co.jp", "SOD"],
	["tokyo-hot.com", "Tokyo-Hot"],
	["heyzo.com", "HEYZO"],
	["dogma.co.jp", "DOGMA"],
	["naturalhigh.co.jp", "Natural High"],
	["bangbros.com", "BangBros"],
	["dorcelclub.com", "Dorcel"]
], g = (e) => String(e).replace(/^www\./, "").toLowerCase(), _ = (e) => {
	try {
		return g(new URL(e).hostname);
	} catch {
		return "";
	}
}, v = (e) => {
	let t = _(e);
	return t && h.find(([e]) => t === e || t.endsWith("." + e))?.[1] || "";
}, y = (e) => `/link-mark?id=${encodeURIComponent(e.link_id ?? "")}`, b = (e) => `/site-mark?${new URLSearchParams(e)}`, x = [
	[["x.com", "twitter.com"], "brand-x"],
	[["instagram.com"], "brand-instagram"],
	[["threads.com", "threads.net"], "brand-threads"],
	[["tiktok.com"], "brand-tiktok"],
	[["youtube.com", "youtu.be"], "brand-youtube"],
	[["facebook.com", "fb.com"], "brand-facebook"],
	[["linktr.ee", "linktree.com"], "brand-linktree"]
], S = (e) => {
	let t = _(e);
	return t && x.find(([e]) => e.some((e) => t === e || t.endsWith("." + e)))?.[1] || "";
}, C = (e) => String(e ?? "").normalize("NFKC").trim().toLocaleLowerCase(), ee = ["web.archive.org"], te = (e) => ee.includes(_(e)), ne = (e, t, n = []) => {
	let r = v(e.url) || e.label || "";
	if (t !== "studio" && t !== "agency" || te(e.url)) return r;
	let i = [r, e.label].map(C).filter(Boolean);
	return !i.length || i.includes("官方网站") || i.some((t) => g(t) === _(e.url) || n.some((e) => {
		let n = C(e);
		return !!n && (n.includes(t) || t.includes(n));
	})) ? "官方网站" : r;
}, re = (e) => {
	let t = Number(e);
	return Number.isFinite(t) && t > 0 ? t : 0;
}, ie = (e) => {
	if (e = re(e), !e) return "—";
	e = Math.round(e);
	let t = e / 3600 | 0, n = e % 3600 / 60 | 0, r = e % 60;
	return t ? `${t}:${String(n).padStart(2, "0")}:${String(r).padStart(2, "0")}` : `${n}:${String(r).padStart(2, "0")}`;
}, ae = (e) => {
	e = Math.max(0, Math.floor(Number(e) || 0));
	let t = e / 3600 | 0, n = e % 3600 / 60 | 0, r = e % 60;
	return t ? `${t}:${String(n).padStart(2, "0")}:${String(r).padStart(2, "0")}` : `${n}:${String(r).padStart(2, "0")}`;
}, oe = (e) => e >= 0x4000000000000 ? (e / 0x4000000000000).toFixed(2) + " PB" : e >= 1099511627776 ? (e / 1099511627776).toFixed(2) + " TB" : e >= 1073741824 ? (e / 1073741824).toFixed(1) + " GB" : (e / 1048576 | 0) + " MB", se = {
	local: "本地",
	115: "115",
	pikpak: "PikPak",
	online: "在线"
}, ce = (e, t) => {
	let n = 2166136261;
	for (let r of `${e}\u0000${t}`) n ^= r.codePointAt(0), n = Math.imul(n, 16777619) >>> 0;
	return n;
}, le = {
	"1080P": "1080p",
	"60fps": "60FPS",
	AI去码: "AI解码",
	JK制服: "JK",
	OL制服: "OL",
	眼镜: "眼镜娘",
	情趣内衣: "性感内衣",
	口罩遮脸: "口罩",
	强制剧情: "强制",
	骑乘: "骑乘位",
	后入: "背后位",
	"3P多人": "3P",
	双洞齐插: "双洞齐下",
	毒龙: "毒龙钻"
}, ue = (e) => le[e] || e, de = /\.(?:mp4|mkv|avi|wmv|mov|m4v|webm|ts|m2ts|mts|mpg|mpeg|flv|rm|rmvb|iso)$/i, w = (e, t = e?.name) => {
	let n = String(t || "").trim();
	return e?.is_jav ? n.replace(de, "") : n;
}, T = (e) => /[぀-ヿ㐀-鿿]/.test(String(e || "")), fe = (e) => {
	let t = [e?.catalog_title, e?.original_title].map((e) => String(e || "").trim()).filter(Boolean);
	return t.find(T) || t[0] || "";
};
function E(e, t = e?.name) {
	let n = w(e, t), r = String(e?.code || "").trim().toUpperCase();
	if (!e?.is_jav || !r) return {
		code: "",
		title: n
	};
	let i = String(e?.display_code || r).trim().toUpperCase(), a = n.toUpperCase(), o = a === r || a === i || a.startsWith(r) && /^[\s._\-[\]]/.test(n.slice(r.length)) || a.startsWith(i) && /^[\s._\-[\]]/.test(n.slice(i.length)), s = a.startsWith(i) ? i.length : r.length, c = (o ? n.slice(s) : n).replace(/^[\s._-]+/, "").trim(), l = fe(e), u = Object.prototype.hasOwnProperty.call(e || {}, "display_title") ? String(e.display_title || "").trim() : c;
	return {
		code: i,
		title: l || u,
		badges: Array.isArray(e?.edition_badges) ? e.edition_badges.filter((e) => [
			"中字",
			"无码",
			"无码破解"
		].includes(e)) : []
	};
}
var pe = (e, t = e?.name) => {
	let { code: n, title: r, badges: i = [] } = E(e, t);
	return n ? [
		n,
		...i,
		r
	].filter(Boolean).join(" ") : r;
};
function me(e, t = e?.name) {
	let { code: n, title: r, badges: i = [] } = E(e, t);
	if (!n) return m(r);
	let a = i.map((e) => `<small class="javedition ${e === "中字" ? "subtitle" : e === "无码" ? "uncensored" : "cracked"}">${m(e)}</small>`).join("");
	return `<span class="javidentity"><strong class="javcode">${m(n)}</strong>${a}</span>${r ? ` <span class="javtitle">${m(r)}</span>` : ""}`;
}
//#endregion
//#region src/ui-kit/sounds.ts
var D = null, O = !1;
function he() {
	let e = globalThis.AudioContext || globalThis.webkitAudioContext;
	return e ? (D ||= new e(), D.state === "suspended" && D.resume()?.catch?.(() => {}), D) : null;
}
function k(e, t, { type: n = "sine", from: r, to: i = r, duration: a, volume: o, attack: s = 0, start: c = 0, filter: l = null }) {
	let u = t + c, d = e.createOscillator(), f = e.createGain();
	d.type = n, d.frequency.setValueAtTime(r, u), i !== r && d.frequency.exponentialRampToValueAtTime(i, u + a), s ? (f.gain.setValueAtTime(.001, u), f.gain.exponentialRampToValueAtTime(o, u + s)) : f.gain.setValueAtTime(o, u), f.gain.exponentialRampToValueAtTime(.001, u + a);
	let p = d;
	if (l) {
		let t = e.createBiquadFilter();
		t.type = l.type, t.frequency.value = l.frequency, t.Q.value = l.Q ?? 1, d.connect(t), p = t;
	}
	p.connect(f), f.connect(e.destination), d.start(u), d.stop(u + a + .01);
}
function ge(e, t, { duration: n, volume: r, filter: i, sweepTo: a = null, attack: o = 0 }) {
	let s = Math.max(1, Math.round(e.sampleRate * n)), c = e.createBuffer(1, s, e.sampleRate), l = c.getChannelData(0);
	for (let e = 0; e < s; e++) l[e] = Math.random() * 2 - 1;
	let u = e.createBufferSource();
	u.buffer = c;
	let d = e.createBiquadFilter();
	d.type = "bandpass", d.Q.value = i.Q, d.frequency.setValueAtTime(i.frequency, t), a && d.frequency.exponentialRampToValueAtTime(a, t + n);
	let f = e.createGain();
	o ? (f.gain.setValueAtTime(.001, t), f.gain.exponentialRampToValueAtTime(r, t + o)) : f.gain.setValueAtTime(r, t), f.gain.exponentialRampToValueAtTime(.001, t + n), u.connect(d), d.connect(f), f.connect(e.destination), u.onended = () => {
		u.disconnect(), d.disconnect(), f.disconnect();
	}, u.start(t);
}
var _e = {
	click: (e, t) => ge(e, t, {
		duration: .06,
		volume: .12,
		filter: {
			frequency: 1200,
			Q: 1
		}
	}),
	"toggle-on": (e, t) => k(e, t, {
		from: 550,
		to: 650,
		duration: .08,
		volume: .15
	}),
	"toggle-off": (e, t) => k(e, t, {
		from: 650,
		to: 550,
		duration: .08,
		volume: .15
	}),
	success: (e, t) => {
		k(e, t, {
			from: 523,
			duration: .12,
			volume: .18
		}), k(e, t, {
			from: 653.75,
			duration: .12,
			volume: .18,
			start: .2
		});
	},
	warning: (e, t) => {
		k(e, t, {
			type: "triangle",
			from: 600,
			duration: .08,
			volume: .15
		}), k(e, t, {
			type: "triangle",
			from: 600,
			duration: .08,
			volume: .15,
			start: .16
		});
	},
	error: (e, t) => k(e, t, {
		type: "sawtooth",
		from: 400,
		to: 200,
		duration: .25,
		volume: .15,
		filter: {
			type: "lowpass",
			frequency: 1500,
			Q: 1
		}
	}),
	whoosh: (e, t) => ge(e, t, {
		duration: .12,
		volume: .08,
		attack: .036,
		filter: {
			frequency: 1e3,
			Q: 1
		},
		sweepTo: 6e3
	}),
	pop: (e, t) => k(e, t, {
		from: 1500,
		to: 500,
		duration: .04,
		volume: .15
	})
}, ve = Object.freeze(Object.keys(_e));
function ye(e) {
	O = e === !0;
}
function be() {
	return O;
}
function A(e) {
	let t = _e[e];
	if (!t) throw Error(`没有「${e}」这种界面音效`);
	if (!O) return !1;
	let n = he();
	return n ? (t(n, n.currentTime), !0) : !1;
}
var xe = "button,[role=\"button\"],[role=\"tab\"],[role=\"menuitem\"],[role=\"menuitemradio\"],[role=\"menuitemcheckbox\"],[role=\"option\"],summary,a[href]", Se = "input[type=\"checkbox\"][role=\"switch\"]";
function Ce(e) {
	return e.disabled === !0 || e.getAttribute("aria-disabled") === "true";
}
function we(e = document) {
	e.addEventListener("click", (e) => {
		let t = e.target?.closest?.(xe);
		!t || Ce(t) || A("click");
	}, { capture: !0 }), e.addEventListener("change", (e) => {
		let t = e.target;
		!t?.matches?.(Se) || Ce(t) || A(t.checked ? "toggle-on" : "toggle-off");
	}, { capture: !0 });
}
//#endregion
//#region src/ui-kit/middle-truncate.ts
var Te = "…", Ee = typeof Intl.Segmenter == "function" ? new Intl.Segmenter(void 0, { granularity: "grapheme" }) : null, j = /* @__PURE__ */ new WeakMap(), De = /* @__PURE__ */ new WeakSet(), M = null, Oe = (e) => Ee ? [...Ee.segment(String(e ?? ""))].map((e) => e.segment) : Array.from(String(e ?? ""));
function ke(e, t) {
	let n = Oe(e);
	if (!n.length || t(e)) return String(e ?? "");
	let r = 0, i = Math.max(0, n.length - 1), a = Te;
	for (; r <= i;) {
		let e = r + i >> 1, o = Math.ceil(e / 2), s = Math.floor(e / 2), c = n.slice(0, o).join("") + Te + (s ? n.slice(-s).join("") : "");
		t(c) ? (a = c, r = e + 1) : i = e - 1;
	}
	return a;
}
var Ae = Object.assign((e, t) => {
	let n = getComputedStyle(e), r = (Ae.canvas ||= document.createElement("canvas")).getContext("2d");
	if (!r) return Infinity;
	r.font = n.font || `${n.fontStyle} ${n.fontWeight} ${n.fontSize} ${n.fontFamily}`;
	let i = r.measureText(t).width, a = parseFloat(n.letterSpacing);
	Number.isFinite(a) && (i += Math.max(0, Oe(t).length - 1) * a);
	let o = parseFloat(n.wordSpacing);
	return Number.isFinite(o) && (i += (t.match(/\s/g) || []).length * o), i;
}, { canvas: null }), je = (e) => {
	if (e.dataset.middleTruncateWithin === void 0) return e.clientWidth;
	let t = e.parentElement;
	if (!t) return e.clientWidth;
	let n = getComputedStyle(t), r = parseFloat(n.columnGap) || 0, i = 0, a = 0;
	for (let n of t.children) {
		let t = n.getBoundingClientRect().width;
		if (n === e) {
			a++;
			continue;
		}
		t > 0 && (i += t, a++);
	}
	return t.getBoundingClientRect().width - (parseFloat(n.paddingLeft) || 0) - (parseFloat(n.paddingRight) || 0) - i - r * Math.max(0, a - 1);
}, Me = (e) => {
	let t = j.get(e);
	if (!t || !e.isConnected) return;
	let n = je(e), r = n > 0 ? ke(t.full, (t) => Ae(e, t) <= n) : t.full;
	t.rendered = r, e.textContent !== r && (e.textContent = r);
	let i = r !== t.full;
	e.classList.toggle("middle-truncated", i), e.setAttribute("aria-label", t.full), (!e.hasAttribute("title") || e.dataset.middleTitle === "true") && (e.title = t.full, e.dataset.middleTitle = "true");
}, N = (e) => {
	let t = j.get(e);
	!t || t.raf || (t.raf = requestAnimationFrame(() => {
		t.raf = 0, Me(e);
	}));
}, Ne = (e) => {
	e instanceof HTMLElement && (j.has(e) || j.set(e, {
		full: e.textContent || "",
		rendered: e.textContent || "",
		raf: 0
	}), De.has(e) || (De.add(e), e.dataset.middleTruncateWithin !== void 0 && e.parentElement ? M?.observe(e.parentElement) : M?.observe(e)), N(e));
}, Pe = (e) => {
	if (e.nodeType !== Node.ELEMENT_NODE) return;
	let t = e;
	t.matches("[data-middle-truncate]") && Ne(t), t.querySelectorAll("[data-middle-truncate]").forEach(Ne);
};
function Fe(e = document) {
	M = new ResizeObserver((e) => e.forEach((e) => {
		N(e.target), e.target.querySelectorAll?.(":scope>[data-middle-truncate-within]").forEach(N);
	})), Pe(e.documentElement || e), new MutationObserver((e) => e.forEach((e) => {
		e.addedNodes.forEach(Pe);
		let t = (e.target.nodeType === Node.TEXT_NODE ? e.target.parentElement : e.target)?.closest?.("[data-middle-truncate]");
		if (!t) return;
		let n = j.get(t);
		n && t.textContent !== n.rendered && (n.full = t.textContent || "", t.dataset.middleTitle === "true" && t.removeAttribute("title"), N(t));
	})).observe(e.body || e, {
		childList: !0,
		characterData: !0,
		subtree: !0
	}), document.fonts?.ready?.then(() => e.querySelectorAll("[data-middle-truncate]").forEach(N)), e.addEventListener("copy", (e) => {
		let t = document.getSelection();
		if (!t || t.isCollapsed) return;
		let n = (t.anchorNode?.nodeType === Node.ELEMENT_NODE ? t.anchorNode : t.anchorNode?.parentElement)?.closest?.("[data-middle-truncate]"), r = n && j.get(n);
		!r || !n.contains(t.focusNode) || !e.clipboardData || (e.clipboardData?.setData("text/plain", r.full), e.preventDefault());
	});
}
//#endregion
//#region src/ui-kit/overlay-scrollbar.ts
function Ie(e, { variant: t = "" } = {}) {
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
function Le(e, t, n, r = "summary") {
	e?.querySelectorAll(t).forEach((e, t) => {
		if (e.querySelector(":scope > .fcollapse")) return;
		let i = document.createElement("div");
		i.className = "fcollapse";
		let a = document.createElement("div");
		a.className = "fcollapsebody", [...e.children].forEach((e) => {
			e.tagName !== "SUMMARY" && a.appendChild(e);
		}), i.appendChild(a), e.appendChild(i);
		let o = e.querySelector(r);
		r !== "summary" && e.querySelector("summary").addEventListener("click", (e) => e.preventDefault());
		let s = e.open;
		i.id = `${n}-${t}`, i.inert = !s, s && i.classList.add("fcollapse-settled"), o.setAttribute("aria-controls", i.id), o.setAttribute("aria-expanded", String(s)), o.addEventListener("click", (t) => {
			t.preventDefault(), s = !s, o.setAttribute("aria-expanded", String(s)), Re(e, i, s);
		});
	});
}
var P = /* @__PURE__ */ new WeakMap();
function Re(e, t, n) {
	t.classList.add("fcollapse");
	let r = (P.get(t) || 0) + 1;
	P.set(t, r);
	let i = () => P.get(t) === r;
	if (n) {
		t.inert = !1;
		let n = e.open ? t.getBoundingClientRect().height : 0;
		e.open = !0, I(t, n, i);
	} else t.inert = !0, t.classList.remove("fcollapse-settled"), t.style.height = t.getBoundingClientRect().height + "px", t.getBoundingClientRect(), t.style.height = "0px", F(t, () => {
		i() && (e.open = !1, t.style.height = "");
	});
}
function F(e, t) {
	let n = !1, r, i = (a) => {
		a && a.propertyName !== "height" || n || (n = !0, e.removeEventListener("transitionend", i), clearTimeout(r), t());
	};
	e.addEventListener("transitionend", i), r = setTimeout(i, 260);
}
function I(e, t, n = () => !0) {
	e.classList.remove("fcollapse-settled"), e.style.height = t + "px", e.getBoundingClientRect(), e.style.height = e.scrollHeight + "px", F(e, () => {
		n() && (e.style.height = "auto", e.classList.add("fcollapse-settled"));
	});
}
//#endregion
//#region src/ui-kit/anchored-menu.ts
var L = null, R = globalThis;
R.__peachMenuCloser || (R.__peachMenuCloser = !0, document.addEventListener("click", (e) => {
	if (!L) return;
	let t = e.target;
	L.menu.contains(t) || L.toggle.contains(t) || L.mount.contains(t) && !(t instanceof Element && t.closest("a[href],button,input,select,textarea,summary,[role=button],[role=menuitem],[tabindex]")) || L.setOpen(!1);
}, !0));
function ze() {
	L && L.setOpen(!1);
}
var z = /* @__PURE__ */ new WeakMap();
function Be(e) {
	z.delete(e), e.classList.remove("leaving"), e.hidden && A("whoosh"), e.hidden = !1;
}
function Ve(e, t) {
	if (e.hidden || z.has(e)) return;
	let n = () => {
		z.get(e) === n && (z.delete(e), e.classList.remove("leaving"), e.hidden = !0, t && t());
	};
	if (z.set(e, n), e.classList.add("leaving"), getComputedStyle(e).animationName === "none") {
		n();
		return;
	}
	e.addEventListener("animationend", (t) => {
		t.target === e && n();
	}, { once: !0 }), setTimeout(n, 240);
}
var He = () => 8 + (parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--topH")) || 0);
function Ue(e, t) {
	return e.target instanceof Node && e.target.contains(t);
}
function B(e, t, n, { side: r = !1, align: i = "end" } = {}) {
	let a = () => {
		let e = t.getBoundingClientRect(), a = n.offsetWidth;
		if (r && innerWidth >= 640) {
			n.dataset.placement = "right", n.style.maxHeight = Math.max(0, innerHeight - 32) + "px", n.style.left = Math.max(16, Math.min(e.right + 8, innerWidth - a - 16)) + "px", n.style.top = Math.max(16, Math.min(e.top, innerHeight - n.offsetHeight - 16)) + "px";
			return;
		}
		let o = He(), s = innerHeight - 8 - e.bottom - 8, c = e.top - 8 - o, l = n.scrollHeight + n.offsetHeight - n.clientHeight, u = s >= l || s >= c, d = Math.min(l, Math.max(u ? s : c, 0));
		n.dataset.placement = u ? "bottom" : "top", n.style.maxHeight = d + "px";
		let f = i === "start" || n.classList.contains("context-card") ? e.left : e.right - a;
		n.style.left = Math.max(8, Math.min(f, innerWidth - a - 8)) + "px", n.style.top = (u ? e.bottom + 8 : e.top - 8 - d) + "px";
	}, o = (e) => {
		Ue(e, t) && l(!1);
	}, s = n.hasAttribute("popover"), c = !1, l = (r) => {
		r ? (L && L.mount !== e && L.setOpen(!1), c = !0, Be(n), s && !n.matches(":popover-open") && n.showPopover(), a(), window.addEventListener("resize", a), window.addEventListener("scroll", o, {
			capture: !0,
			passive: !0
		})) : (c = !1, window.removeEventListener("resize", a), window.removeEventListener("scroll", o, !0), Ve(n, () => {
			n.style.left = "", n.style.top = "", n.style.maxHeight = "", s && n.matches(":popover-open") && n.hidePopover();
		})), t.setAttribute("aria-expanded", String(r)), L = r ? {
			mount: e,
			menu: n,
			toggle: t,
			setOpen: l
		} : L && L.mount === e ? null : L;
	};
	return t.addEventListener("click", (e) => {
		e.stopPropagation(), l(!c);
	}), e.addEventListener("keydown", (e) => {
		e.key === "Escape" && c && (e.stopPropagation(), l(!1), t.focus());
	}), {
		setOpen: l,
		isOpen: () => c
	};
}
//#endregion
//#region src/ui-kit/select-field.ts
function We(e) {
	return e ? e.startsWith("data:image/png;base64,") ? `<img class="gselectmark" src="${m(e)}" alt="" width="16" height="16">` : n(e, "gselectmark") : "";
}
function Ge(e, t, { label: r = "", attr: i = "", className: a = "" } = {}) {
	let o = e.find(([e]) => String(e) === String(t)) || e[0] || ["", ""], s = ([, e, t]) => `${We(t)}${m(e)}`, c = e.map(([e, t, n]) => `<button type="button" role="option" data-select-option="${m(e)}"
      aria-selected="${String(e) === String(o[0])}" tabindex="-1"><span data-select-content>${s([
		e,
		t,
		n
	])}</span></button>`).join("");
	return `<div class="gselect${a ? ` ${m(a)}` : ""}" ${i}>
    <button type="button" class="gselectfield" data-select-trigger aria-haspopup="listbox"
      aria-expanded="false" aria-label="${m(r)}"><span data-select-label>${s(o)}</span>${n("chevron-down")}</button>
    <div class="popmenu gselectmenu" role="listbox" aria-label="${m(r)}" popover="manual" data-select-menu hidden>${c}</div></div>`;
}
function Ke(e) {
	let t = e.querySelector("[data-select-trigger]"), n = e.querySelector("[data-select-menu]"), r = e.querySelector("[data-select-label]"), i = () => [...n.querySelectorAll("[data-select-option]")], a = () => n.querySelector("[aria-selected=\"true\"]");
	t.addEventListener("click", () => {
		let r = `${t.getBoundingClientRect().width}px`;
		n.style.minWidth = r, e.hasAttribute("data-fixed-width") && (n.style.width = r);
	});
	let o = B(e, t, n);
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
var qe = {
	local: "hard-drive",
	115: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAHB0lEQVR4nO2bbUwURxjH/zN38qIcb4JWoIoHFYumWhDbRquNiSlYC4ZGjVYrotHWD1VTLdY00X7zbA22Na21KWqsUMHYSiygJjaRQDW+VK2YioBarVZBQA9QDm6nedajCuxxHrfH7dX+kiXcvszM8+zO7DPP/JfBzcQmfx4O1jpJEmKUgBTHwUYIIAyAwbYRZtoYUCdBVDLwi5yxCgjfo1Uly2vd2T7mjkJj3vgsUVitcwWkqQxstAv1CAFxnoEfZjpdbvXPq05p1gFxqSZDexuWCIhMCMTDHTBcYGA5+n7YdrEwy6xOkS4yJi07uMliWSGEeB9ACPqGBsbYFwE+PpvP7l/Z6BEHCCFYzDRTBgATBMLhCRhofMiqLsrawRgTvSuiFxinbxjK2pErgAnQAAwoE3rMrTmw5s9eXOscxpSNE5iQ9glgEDQEA24LxtNrij8sc+Y67szJscmmTAjpiNaMJ+Q2CemI3Ea1n4CZM/N1p5pqPoXASngDDNmJAcbVBQWzrI5PfRLjzTX7AKTCuyhMNBjTHTmBOypFvvPeZzyRamt775+A2GRTpgTxHbwYDraoqiQrx2kHGFM2TqBBBYAPvBsLGJ9i7+3AenjPn9DiaN/rV6QeSUpxgl4pwotNMeWqbXw/PceYuAiEBvk7dZ2/Xz8MCQvE2JERGB4ZgteXOt8jyRY5cBPi1a4Ro77rybbwVtUIzzDAF7mmOYiPGexSOZt2Hu31tRS12mzbbvctMCYtO1iO7VVmUXqSy8bX323Bjp9OutoUk81GZQc0WSwr1J7YBAb4IiNtnMvlbCs4jpYHba4VIhAu26jkgLhUk8E2pVWVRenj5S7QWyxtVhQcOoecH0+o0h6ykWztNga0t2GJ2vP5oAA/ZKQldtv/1Q+/Yv8vFWg0P3BYhrm5Fa2WdjWbFWKzdVMnB8iZHJVZ/NZ4BPTvfPfzis64NJipgc1W2QG8I4endhor2OCHd1ITOu27/6AN2btK4XEE4mWbYXMAJTD74u5/f+A07jS2QAt02MzlH5Cmqn/3u/d9vV6HyeOM8nFP02Ezo7y9hPu31MwQr86YjHdnv9zjOTXX7+D4uWsoKv0D5WeuwgMIDv/Belq0gFDP+JBAf8zv0veVMEYNlLc508bir1t3sffw78g/eA5/16mS7X4SGNnOacVG7b4/wN+5CWTk4CAsnzcRh79djPlvOnaeWkhCjOK0XKVmoXWNzdhTchalpy7Ld9YZ+vv5YP2yqfK8YfDAALgbASmOxSRvoGmv67GqHcJCBuDFkRHybC5pdBQSno8EY457XPW1O5i9ajca7t13V9Oo359kxuQNlwFEo494JsyAGVNGYeGMcbJzeuLcxZt4e02e63MA+1yh1+C/cXFfQIPc1vxjmJSxFZt3lcJqleye+0LcEKyYP9GdzTH0uQM6oPj+y9xyzM3Kw83ae3bPmzc9ARGDAt3qAI9ysuI6Zn2wG7X1TYrHfX30WDb7FbfVz23iBI9yo/YeFq/bK88VlJicZHRX1WZNOIA4X3ULuw6cVjwWER6I6Ai3rLybOclSoBFy9p2wO/ePHTpQ9foYUMdJkwONUNvQjIuXlSVBOp36w5UEUclJkAQNcdPOXIDTs6oyjMRYshpLQ1gl5big5nq96nVxxio4SdEeps21QVx0uGJesPKK6mo5QbZz0uGRFA0agMLk4ZGh3faX/XaF9HKqQjZXlSyvlUcW0uFBA9BUWKmvUxZZbTps5vIPnS4XHoZecwsU0mgHyypRUU0JK3XpsJnTH1mByXABHoKySFvWzpAXQrtOiT/aXKx+hQwXOlSn/NE+ZldE4E6GDQlGwaZ5eG4YyYcfcbu+CRkf5+Nuk+PFE2d53Fbe8Q/JT0mBiT6CJjlLZ76Eoq8zMTyq88B36WodFqzdgxu37c8SXaDBZqtMpxEnJsW0XgixDm6CNAKUGaLU+OzkMQgN6t/peLtVwjf5x7Alr1xeE3QHjLFPqouz1ivqAwJ8fDabLa3LXF0hHjEsDBMSoqHjHH4+egwM7g9jVCgS46O69XOC0l6Hyiuxs/CU3VBYFRhqycbOu7pgTNmwEAI5aiyMvjbeiEkJRhifDUXkoCB5qbyt3YrmFguu3mxE5dVaHCq7hPIzV2CV+iAWY8isKV6zvUcHiIcSmVKt6IDV1BNXFWd1k8jwbicyJkh4TMIi/EewiaTmKinKudIFpKYi4bEsMfN+LLKI2o6SnNu7inR1HOw9eDlkQ08Kct7TxbLCkiEb3gpDdk8qUcJhmoVU1yQ8hvdRaGs7XHJAQcEsK6muvepJILn8EyjFCafyTDbx9Nca1g9bqM87euwfhzlbw1P9yQxBFZDwmAILaATbR1NJzhpP/P/ZHFzkqf1wsitP7aezSjyVH0/DDlr/fP4fOwTeE5lpP+gAAAAASUVORK5CYII=",
	pikpak: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACY0lEQVR4nNWXy2tTQRSHv7m5RUWttqlNW1OairhKNbrU+lhE/AOkdCOIIO7arty0QhSxCIIQ7VJwIfgfCIJdFB+rgC32AVIflD5CbFUsoohJRiZzb5Ne05p4kxv94HCTc+bO+c0MM3eOoICD/TJswAAQBdoBH5UhA8wDo1mIv7ojpuyAsH9EBuQgkmuASXVJI4lN3BXDawIifXIQwQ28RDA0ERfDwpr2cQ9G7iSdhcOGteZeJ1eYKreB5DS1I2oiCJba2hDQVA9tjdDaCHMfICuhMwDJz5D8BMtftK9E2s2NttrJMOxvzSdT1rIb6goW69KIXsjr5/K+nxlIWWKWrOebJIxNFhXgK7r20QjcPL+59PllGH8LarDvU3oWFHU+CDZpK+TKA3j88vd+zGKd93av/y8lrKxao7Ls6bROrrj6EE6E9WzZppZKrJ0y0Hu8RAGhZuhohqk5nShp2Y/0+nZqxPaoFQsr2my2mNDSkBe01w/7AvAu9QcB/nrYs0vboU4qSsNOwCHAoMYY/5WAsckNt1NJ8WKY5TS+fF8/E7f/Lu5aQDrjLu5agOlzF3ct4NYFd3HXAk51uYv/k9vQLPeFr9/h4gh0dcCBNu17vaiP7nt9sGNblQVs3wo9x+DZNCRm9aUyFICebh0rF9PpWP22+QvqC3f2qLZyKda34XTMLsGLGSrO8xndtxMR6ZfqQ+tz7uczRyDor0zyxY/6LlDkoMqYVsUSKvSqho8SVB/JglqCUWqF4ImharVcueQ96j4bN3KFoiDmeXpJTOXO7QJVoyEZ8mgm0rm6sLA4talFef4LaurBZfZxNPMAAAAASUVORK5CYII="
}, Je = /* @__PURE__ */ new Set([
	"secondary",
	"warning",
	"error",
	"success"
]);
function Ye({ readout: e = "", controls: t = "", before: n = "", className: r = "", loading: i = !1, filterRow: a = "" } = {}) {
	return `<div class="entitycollectionhead${r ? " " + m(r) : ""}"${a ? ` data-filter-row="${m(a)}"` : ""}>${n}<h3${i ? " class=\"skeleton\"" : ""}>${e}</h3>${t}</div>`;
}
function Xe({ label: e = "", items: t = [], footnote: n = "" } = {}) {
	return `<details class="geist-note-details"><summary>${m(e)}</summary>
    <ul>${t.map((e) => `<li>${e.href ? `<a href="${m(e.href)}">${m(e.label || "")}</a>` : `<b>${m(e.label || "")}</b>`}<span>${m(e.note || "")}</span>${e.hint ? `<code>${m(e.hint)}</code>` : ""}</li>`).join("")}</ul>${n ? `<p>${m(n)}</p>` : ""}</details>`;
}
function V(e, { variant: t = "secondary", label: i = "", className: a = "", size: o = "medium", filled: s = !1, actionLabel: c = "", actionHref: l = "", details: u = null } = {}) {
	let d = Je.has(t) ? t : "secondary", f = d === "secondary" ? "info" : d === "success" ? "check" : "alert", p = d === "error" ? " role=\"alert\"" : " role=\"note\"", h = c ? l ? `<a class="geist-button" href="${m(l)}" data-note-action>${m(c)}</a>` : `<button type="button" class="geist-button primary" data-note-action>${m(c)}</button>` : "";
	return `<div class="geist-note geist-note-${d}${a ? ` ${m(a)}` : ""}${o === "small" ? " geist-note-small" : ""}${s ? " geist-note-filled" : ""}"${p}>
    ${n(f)}<p>${i ? `<b>${m(i)}</b>` : ""}<span>${m(d === "error" ? r(e) : e)}</span></p>${h}${u ? Xe(u) : ""}</div>`;
}
var Ze = {
	gray: "project-banner-gray",
	success: "project-banner-success",
	warning: "project-banner-warning",
	error: "project-banner-error"
};
function Qe(e, { variant: t = "gray", href: r, label: i, value: a, max: o } = {}) {
	let s = [
		"gray",
		"success",
		"warning",
		"error"
	].includes(t) ? t : "gray";
	return `<aside class="project-banner ${Ze[s]}" role="${s === "error" ? "alert" : "status"}"><div>${Number(o) > 0 ? $e("任务完成率", a, o) : n(s === "error" || s === "warning" ? "alert" : "info")}<p>${m(e)}</p></div><a href="${m(r)}">${m(i)}</a></aside>`;
}
function $e(e, t, n = 100, { usage: r = !1, compact: i = !1 } = {}) {
	let a = Number(n), o = Number(t);
	if (!Number.isFinite(a) || a <= 0 || !Number.isFinite(o)) return `<span>${m(e)}：未取得</span>`;
	let s = Math.max(0, Math.min(100, o / a * 100)), c = r ? s >= 95 ? "error" : s >= 80 ? "warning" : "normal" : "normal", l = r ? c === "error" ? "空间即将用满" : c === "warning" ? "空间使用偏高" : "空间充足" : "";
	return `<span class="geist-gauge" data-level="${c}" role="progressbar" aria-label="${m(e + (l ? "：" + l : ""))}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${s}"><svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="13"/><circle cx="16" cy="16" r="13" pathLength="100" stroke-dasharray="${s} 100"/></svg></span>${l && !i ? `<span class="gauge-status">${l}</span>` : ""}`;
}
function et(e, t, n = 100, { variant: r = "active", stops: i = [] } = {}) {
	let a = Math.max(0, Number(n) || 0), o = Math.max(0, Math.min(Number(t) || 0, a)), s = a ? o / a * 100 : 0;
	return `<div class="geist-progress" role="progressbar" aria-label="${m(e)}"
    aria-valuemin="0" aria-valuemax="${a}" aria-valuenow="${o}"
    style="--progress-value:${s}%;--progress-color:var(${r === "error" ? "--drop" : r === "warning" ? "--meter" : "--feedback-success"})"><i></i>${i.filter((e) => Number(e.value) > 0 && Number(e.value) < a && e.label).map((e) => `<span class="geist-progress-stop" style="left:${Number(e.value) / a * 100}%" role="img" aria-label="${m(e.label)}"></span>`).join("")}</div>`;
}
function tt(e = "加载中") {
	let t = Array.from({ length: 10 }, (e, t) => `<i aria-hidden="true" style="--spinner-angle:${t * 36}deg;--spinner-delay:${t * 100 - 900}ms"></i>`).join("");
	return `<span class="geist-spinner" role="status" aria-label="${m(e)}">${t}</span>`;
}
function nt({ label: e, id: t = "", name: r = "", value: i = "", placeholder: a = "", attrs: o = "" } = {}) {
	let s = [
		"type=\"search\"",
		t ? `id="${m(t)}"` : "",
		r ? `name="${m(r)}"` : "",
		a ? `placeholder="${m(a)}"` : "",
		`value="${m(i)}"`,
		`aria-label="${m(e)}"`,
		"spellcheck=\"false\" autocomplete=\"off\"",
		o
	].filter(Boolean).join(" ");
	return `<div class="geist-search" data-search-input>
    <span class="geist-search-prefix" data-search-prefix>${n("search")}</span>
    <input ${s}></div>`;
}
function rt(e = "正在处理", { className: t = "" } = {}) {
	return `<span class="geist-loading${t ? ` ${m(t)}` : ""}" role="status">
    <span class="geist-loading-dots" aria-hidden="true"><i></i><i></i><i></i></span>
    <span>${m(e)}</span></span>`;
}
function it(e, { active: t = "", attr: r = "data-tab", label: i = "页面视图", className: a = "", panel: o = "" } = {}) {
	let s = e.map(({ value: e, label: i, count: a, symbol: s }) => {
		let c = String(e) === String(t), l = a == null ? "" : `<span class="board-tab-count">${m(Number(a).toLocaleString())}</span>`;
		return `<button type="button" role="tab" ${r}="${m(e)}" aria-selected="${c}"${o ? ` aria-controls="${m(o)}"` : ""}>${s ? n(s) : ""}${m(i)}${l}</button>`;
	}).join("");
	return `<div class="board-local-nav board-tabs${a ? ` ${m(a)}` : ""}" role="tablist" aria-label="${m(i)}">${s}</div>`;
}
function at(e, t, r, { className: i = "", actions: a = "" } = {}) {
	return `<div class="emptystate${i ? ` ${m(i)}` : ""}" data-geist-empty-state role="status">
    <div class="es-icon" aria-hidden="true">${n(e)}</div>
    <div class="es-copy"><h3>${m(t)}</h3><p>${m(r)}</p></div>
    ${a ? `<div class="es-actions">${a}</div>` : ""}
  </div>`;
}
function ot(e) {
	return `<span class="geist-badge">${m(e)}</span>`;
}
function st(e = "") {
	return `<span class="pcheck"><input type="checkbox" ${e}><span aria-hidden="true">${n("check")}</span></span>`;
}
//#endregion
//#region src/ui-kit/motion.ts
function ct(e, t, r = "a", { className: i = "", iconClass: a = "", label: o = "" } = {}) {
	return `<span class="iconswap${i ? " " + m(i) : ""}" data-icon-swap data-icon-state="${r === "b" ? "b" : "a"}"${o ? ` aria-label="${m(o)}"` : ""}><span data-icon="a">${n(e, a)}</span><span data-icon="b">${n(t, a)}</span></span>`;
}
function lt(e, t) {
	let n = e && (e.matches?.("[data-icon-swap]") ? e : e.querySelector?.("[data-icon-swap]"));
	return n && (n.dataset.iconState = t === "b" || t === !0 ? "b" : "a"), n;
}
function ut(e, t, { html: n = !1 } = {}) {
	if (!e) return;
	let r = String(t ?? ""), i = () => {
		n ? e.innerHTML = r : e.textContent = r;
	}, a = e.dataset.swapText;
	if (a === r && (e.textContent || "").length) return;
	if (e.dataset.swapText = r, e.classList.add("textswap"), a === void 0 || a === r) {
		i();
		return;
	}
	e.classList.remove("entering"), e.classList.add("leaving");
	let o = () => {
		e.classList.remove("leaving"), i(), e.classList.add("entering"), e.getBoundingClientRect(), e.classList.remove("entering");
	}, s = (t) => {
		t.target === e && (e.removeEventListener("transitionend", s), o());
	};
	e.addEventListener("transitionend", s), setTimeout(() => {
		e.classList.contains("leaving") && (e.removeEventListener("transitionend", s), o());
	}, 400);
}
function dt(e, t) {
	if (!e) return;
	let n = String(t ?? ""), r = e.dataset.popCount;
	if (r === n && e.firstElementChild) return;
	e.dataset.popCount = n;
	let i = -1;
	if (e.innerHTML = `<span class="digits">${[...n].map((e) => (/\d/.test(e) && (i += 1), `<span style="--digit-at:${Math.max(i, 0)}">${m(e)}</span>`)).join("")}</span>`, r === void 0 || r === n) return;
	let a = e.firstElementChild;
	a.getBoundingClientRect(), a.classList.add("popping");
}
function ft(e, t = e && e.parentElement, { text: n = e && e.value, scrollLeft: r = e && e.scrollLeft || 0 } = {}) {
	if (!e || !t || (t.querySelectorAll(":scope > .cleardissolve").forEach((e) => e.remove()), e.classList.remove("dissolving"), e.value = "", !n || !e.isConnected)) return () => {};
	let i = e.getBoundingClientRect(), a = t.getBoundingClientRect();
	if (!i.width) return () => {};
	let o = document.createElement("span");
	o.className = "cleardissolve", o.setAttribute("aria-hidden", "true");
	let s = document.createElement("span");
	s.dataset.dissolveValue = "", s.textContent = n, s.style.transform = `translateX(-${Math.max(0, r)}px)`, o.append(s);
	let c = getComputedStyle(e);
	Object.assign(o.style, {
		left: `${i.left - a.left - t.clientLeft}px`,
		top: `${i.top - a.top - t.clientTop}px`,
		width: `${i.width}px`,
		height: `${i.height}px`,
		boxSizing: "border-box",
		padding: c.padding,
		font: c.font,
		lineHeight: c.lineHeight,
		letterSpacing: c.letterSpacing,
		textAlign: c.textAlign,
		direction: c.direction
	}), e.classList.add("dissolving"), t.append(o);
	let l = !0, u = null, d = () => {
		l && (l = !1, u !== null && clearTimeout(u), o.removeEventListener("animationend", d), o.remove(), t.querySelector(":scope > .cleardissolve") || e.classList.remove("dissolving"));
	};
	return o.addEventListener("animationend", d), u = setTimeout(d, 1e3), d;
}
var pt = /* @__PURE__ */ new Map();
function mt(e, t = "") {
	e && e.querySelectorAll("[data-count-badge]").forEach((e) => {
		let n = `${t}\u0000${e.dataset.countBadge}`, r = e.textContent || "", i = pt.get(n);
		pt.set(n, r), e.classList.add("countbadge"), i !== void 0 && i !== r && (e.classList.add("popped"), e.getBoundingClientRect(), e.classList.remove("popped"));
	});
}
function ht(e, t = "[data-reveal-line]") {
	if (!e) return;
	let n = [...e.querySelectorAll(t)];
	if (!n.length) return;
	n.forEach((e, t) => {
		e.classList.remove("revealing"), e.classList.add("revealline"), e.style.setProperty("--reveal-at", String(t));
	}), n[0].getBoundingClientRect(), n.forEach((e) => e.classList.add("revealing"));
	let r = () => n.forEach((e) => {
		e.classList.remove("revealline", "revealing"), e.style.removeProperty("--reveal-at");
	}), i = n[n.length - 1], a = (e) => {
		e.target === i && (i.removeEventListener("transitionend", a), r());
	};
	i.addEventListener("transitionend", a), setTimeout(() => {
		i.classList.contains("revealline") && (i.removeEventListener("transitionend", a), r());
	}, 1200);
}
//#endregion
//#region src/ui-kit/skeleton.ts
function gt(e, t) {
	if (!e) return;
	if (e.querySelector(".skeleton-awaiting")) {
		t();
		return;
	}
	if (!e.querySelector(".skeleton,[data-skeleton],.skeletoncard,.countskeleton") || !e.firstChild) {
		t();
		return;
	}
	let n = document.createElement("div");
	for (n.className = "skelfade", n.setAttribute("aria-hidden", "true"); e.firstChild;) n.append(e.firstChild);
	t(), e.classList.add("skelreveal"), e.prepend(n), e.getBoundingClientRect(), e.classList.add("revealing");
	let r = () => {
		n.remove(), e.classList.remove("skelreveal", "revealing");
	}, i = (e) => {
		e.target === n && (n.removeEventListener("transitionend", i), r());
	};
	n.addEventListener("transitionend", i), setTimeout(() => {
		n.isConnected && (n.removeEventListener("transitionend", i), r());
	}, 1e3);
}
function _t() {
	return `<div class="configpage" data-skeleton="configuration" role="status" aria-label="正在读取配置">${[
		["通用", 1],
		["媒体", 2],
		["网络与访问", 2],
		["更新与维护", 3]
	].map(([e, t]) => `<h2 class="configgroup" aria-hidden="true">${e}</h2>${Array.from({ length: t }, () => "<div class=\"configfieldset config-skeleton-card\" aria-hidden=\"true\"><div class=\"geist-fieldset-content\"><span class=\"skeleton\"></span><span class=\"skeleton\"></span><span class=\"skeleton\"></span></div><footer class=\"geist-fieldset-footer\"><span class=\"skeleton\"></span></footer></div>").join("")}`).join("")}</div>`;
}
function vt(e = "正在读取内容", { className: t = "", variant: n = "panel", count: r = 6, fill: i = !0, gridClass: a = "", gridSize: o = "", cardRatio: s = 0 } = {}) {
	let c = (/* @__PURE__ */ new Set([
		"panel",
		"cards",
		"dashboard"
	])).has(n) ? n : "panel", l = c === "cards" ? Array.from({ length: Math.max(1, r) }, () => "<span class=\"skeletoncard\"><i></i><s></s><b></b><em></em><u></u></span>").join("") : c === "dashboard" ? `<span class="skeletondashstrip">${Array.from({ length: 4 }, () => "<span><i></i><b></b><em></em></span>").join("")}</span>
        <span class="skeletondashhero"><i></i><b></b></span>
        <span class="skeletondashpanel"><i></i><b></b><em></em></span>
        <span class="skeletondashpanel"><i></i><b></b><em></em></span>` : "<span class=\"skeleton\" style=\"width:38%\"></span>\n      <span class=\"skeleton\" style=\"width:100%\"></span>\n      <span class=\"skeleton\" style=\"width:100%\"></span>\n      <span class=\"skeleton\" style=\"width:72%\"></span>";
	return `<div class="skeletonpanel skeleton-${c}${t ? ` ${m(t)}` : ""}"
    data-skeleton="${m(c)}${t ? `/${m(t)}` : ""}"${c === "cards" && i ? " data-fill=\"\"" : ""}
    role="status" aria-label="${m(e)}"><span class="sr-only">${m(e)}</span>
    <div${a ? ` class="${m(a)}"` : ""}${o ? ` data-size="${m(o)}"` : ""}${c === "cards" && Number(s) > 0 ? ` style="--skeleton-card-ratio:${Number(s)}"` : ""} aria-hidden="true">${l}</div></div>`;
}
function yt({ kind: e, layout: t = "big", mode: n = "alphabet" } = {}) {
	let r = e !== "tags", i = e === "studios" || e === "agencies", a = r ? "<span class=\"icell\"><span class=\"ring skeleton\"></span><span class=\"nm skeleton\">&nbsp;</span><span class=\"n skeleton\">&nbsp;</span></span>" : "<span class=\"alphatag\"><span class=\"skeleton\"></span><span class=\"n skeleton\"></span></span>", o = r ? `igrid" data-cells="${i ? "company" : "people"}" data-layout="${m(t)}` : "alphalist", s = !r && n === "cloud" ? `<div class="tagwall index-tags">${Array.from({ length: 60 }, (e, t) => `<span class="tg skeleton" style="width:${[
		92,
		128,
		76,
		108,
		144
	][t % 5]}px">&nbsp;</span>`).join("")}</div>` : r ? `<div class="${o}">${a.repeat(12)}</div>` : `<section class="alphagroup"><span class="indexletterskeleton skeleton"></span><div class="${o}">${a.repeat(10)}</div></section>`.repeat(3), c = "正在读取索引";
	return `<div class="skeletonpanel index-skeleton" data-skeleton="index/${m(e)}/${m(t)}/${m(n)}"${r ? " data-fill=\"\"" : ""}
    role="status" aria-label="${c}"><span class="sr-only">${c}</span><section aria-hidden="true">${s}</section></div>`;
}
var bt = {
	av: () => "<span class=\"av avskeleton\"><span class=\"ring\"></span><span class=\"nm\">&nbsp;</span></span>",
	brandpill: (e) => `<span class="brandpill brandskeleton" style="width:${e}px"><span class="mk"></span></span>`,
	pill: (e) => `<span class="pill tagskeleton" style="width:${e}px"></span>`
}, xt = {
	av: [0],
	brandpill: [
		132,
		158,
		118,
		146,
		124,
		164,
		138
	],
	pill: [
		92,
		68,
		104,
		76,
		88,
		64,
		96,
		72,
		100,
		80,
		68,
		92,
		76,
		84
	]
}, St = 180, Ct = "[data-skeleton],[data-skeleton-tier],.countskeleton";
function wt(e) {
	if (!e) return;
	let t = [...e.matches?.(Ct) ? [e] : [], ...e.querySelectorAll(Ct)], n = t.filter((e) => !t.some((t) => t !== e && t.contains(e)));
	for (let e of n) e.dataset.skeletonReveal || (e.dataset.skeletonReveal = "pending", e.classList.add("skeleton-awaiting"), setTimeout(() => {
		!e.isConnected || e.dataset.skeletonReveal !== "pending" || (e.dataset.skeletonReveal = "shown", e.classList.remove("skeleton-awaiting"));
	}, 180));
}
var Tt = 64;
function H(e) {
	e = e.filter((e) => e.row && bt[e.kind] && (!e.row.children.length || e.row.scrollWidth <= e.row.clientWidth)).map((e) => ({
		...e,
		start: e.row.children.length,
		added: 0
	}));
	let t = (e, t) => {
		let n = bt[e.kind], r = xt[e.kind], i = "";
		for (let a = Math.min(Tt, e.added + t); e.added < a; e.added++) i += n(r[e.added % r.length]);
		e.row.insertAdjacentHTML("beforeend", i);
	};
	for (let n of e) t(n, xt[n.kind].length);
	for (let n = 0; n < 4; n++) {
		let n = e.filter((e) => e.added < Tt && e.row.scrollWidth <= e.row.clientWidth).map((e) => {
			let t = e.row.children[e.start].getBoundingClientRect(), n = e.row.lastElementChild.getBoundingClientRect(), r = Math.max(1, (n.right - t.left) / e.added);
			return [e, Math.ceil((e.row.getBoundingClientRect().right - n.right) / r) + 1];
		});
		if (!n.length) break;
		for (let [e, r] of n) t(e, Math.max(1, r));
	}
	for (let t of e) wt(t.row);
}
function Et(e, t) {
	H([{
		row: e,
		kind: t
	}]);
}
function Dt(e) {
	if (!e) return;
	let t = (t) => [...e.matches?.(t) ? [e] : [], ...e.querySelectorAll(t)];
	H(t("[data-skeleton-tier]").map((e) => ({
		row: e,
		kind: e.dataset.skeletonTier
	})));
	for (let e of t(".skeletonpanel[data-fill]>div,.index-skeleton[data-fill]>section>div")) {
		let t = e.firstElementChild, n = getComputedStyle(e);
		if (!t || n.display !== "grid") continue;
		let r = n.gridTemplateColumns.split(" ").filter(Boolean).length, i = parseFloat(n.rowGap) || 0, a = t.getBoundingClientRect().height;
		if (!r || !a) continue;
		let o = window.innerHeight - e.getBoundingClientRect().top, s = r * Math.max(1, Math.min(4, Math.ceil((o + i) / (a + i))));
		for (; e.children.length > s;) e.lastElementChild.remove();
		for (; e.children.length < s;) e.appendChild(t.cloneNode(!0));
	}
	wt(e);
}
//#endregion
//#region src/ui-kit/scroll.ts
var U = /* @__PURE__ */ new Map(), W, Ot = 240, kt = 50, At = 70, jt = .55, Mt = .35, Nt = 480;
function G(e, t) {
	return !e || !(t > 0) ? 0 : Math.sign(e) * (1 - 1 / (Math.abs(e) * jt / t + 1)) * t;
}
function Pt(e) {
	let t = null, n = 0, r = () => typeof e.animate != "function" || matchMedia("(prefers-reduced-motion:reduce)").matches, i = () => {
		t = null, n || e.classList.remove("edgepull");
	}, a = (n, r) => {
		t?.cancel(), e.classList.add("edgepull"), t = e.animate(n, { duration: r }), t.onfinish = i;
	};
	return {
		drag(i) {
			r() || (t?.cancel(), t = null, n = -G(i, e.clientWidth), e.classList.toggle("edgepull", !!n), n ? e.style.setProperty("--edge-pull", `${n}px`) : e.style.removeProperty("--edge-pull"));
		},
		release() {
			if (!n) return;
			let t = n, r = J();
			n = 0, e.style.removeProperty("--edge-pull"), a([{
				"--edge-pull": `${t}px`,
				easing: r.easing
			}, { "--edge-pull": "0px" }], r.duration);
		},
		kick(t) {
			if (r() || n) return;
			let i = -G(t * Mt, Math.min(e.clientWidth, Nt));
			if (!i) return;
			let o = J();
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
function Ft(e, { drag: t = !1, fade: n = !0 } = {}) {
	if (!e) return;
	let r = U.get(e);
	if (r) return r.options.drag ||= t, r.options.fade ||= n, r.update(), r;
	let i = {
		drag: t,
		fade: n
	}, a = new AbortController(), o = Pt(e), s = null, c = 0, l = 0, u = 0, d = !1, f = 0, p = 0, m = 0, h = 0, g = (t, n) => {
		e.dataset[t] !== n && (e.dataset[t] = n);
	}, _ = () => {
		i.fade && (g("overflowLeft", String(e.scrollLeft > 1)), g("overflowRight", String(e.scrollLeft + e.clientWidth < e.scrollWidth - 1)));
	}, v = (e, t, n, r = {}) => e.addEventListener(t, n, {
		...r,
		signal: a.signal
	});
	v(e, "scroll", _, { passive: !0 });
	let y = (e) => {
		d || (d = !0, o.kick(e));
	}, b = () => {
		cancelAnimationFrame(f), f = 0, h = 0;
	}, x = (t) => {
		let n = Math.min(Math.max(t - p, 0), 64);
		if (p = t, m += (u - m) * (1 - Math.exp(-n / At)), Math.abs(u - m) < .5 && (m = u), e.scrollLeft = m, m !== u) {
			f = requestAnimationFrame(x);
			return;
		}
		if (f = 0, h) {
			let e = h;
			h = 0, y(e);
		}
	};
	v(e, "wheel", (t) => {
		let n = e.scrollWidth - e.clientWidth;
		if (t.defaultPrevented || !t.cancelable || Math.abs(t.deltaY) <= Math.abs(t.deltaX) || n <= 0) return;
		t.preventDefault();
		let r = performance.now(), i = Math.abs(t.deltaY);
		r > l && (d = !1), l = r + Ot;
		let a = f ? u : e.scrollLeft, o = a + t.deltaY;
		u = Math.min(n, Math.max(0, o));
		let s = o === u ? 0 : t.deltaY;
		if (i < kt || u === a) {
			u !== a && (b(), e.scrollLeft = u), s && !f ? y(s) : s && (h = s);
			return;
		}
		s && (h = s), f ||= (m = e.scrollLeft, p = performance.now(), requestAnimationFrame(x));
	}, { passive: !1 }), v(e, "mousedown", (t) => {
		!i.drag || t.button !== 0 || e.scrollWidth - e.clientWidth <= 1 || (t.stopPropagation(), b(), s = {
			x: t.pageX,
			left: e.scrollLeft
		}, c = 0, e.style.cursor = "grabbing");
	}), v(window, "mousemove", (t) => {
		if (!s) return;
		let n = t.pageX - s.x, r = s.left - n, i = e.scrollWidth - e.clientWidth;
		c = Math.max(c, Math.abs(n)), e.scrollLeft = r, o.drag(r < 0 ? r : r > i ? r - i : 0), t.preventDefault();
	}), v(window, "mouseup", () => {
		s && o.release(), s = null, e.style.cursor = "";
	}), v(e, "click", (e) => {
		c > 6 && (e.stopPropagation(), e.preventDefault(), c = 0);
	}, { capture: !0 });
	let S = new ResizeObserver(_);
	S.observe(e);
	let C = {
		options: i,
		update: _,
		destroy() {
			a.abort(), b(), S.disconnect(), U.delete(e), e.style.cursor = "", U.size || (W?.disconnect(), W = null);
		}
	};
	return U.set(e, C), W || (W = new MutationObserver(() => {
		for (let [e, t] of U) e.isConnected || t.destroy();
	}), W.observe(document.body, {
		childList: !0,
		subtree: !0
	})), _(), C;
}
var It = 24, Lt = 2e3, Rt = 3e3, K = /* @__PURE__ */ new Map();
function zt(e) {
	if (!e || K.has(e) || matchMedia("(prefers-reduced-motion:reduce)").matches) return;
	let t = new AbortController(), n = e.scrollLeft, r = 1, i = 0, a = 0, o = !1, s = 0, c = (e, n, r) => e.addEventListener(n, r, {
		passive: !0,
		signal: t.signal
	}), l = () => {
		let t = e.getBoundingClientRect();
		return t.width > 0 && t.bottom > 0 && t.top < innerHeight;
	}, u = () => e.isConnected && !o && !document.hidden && !e.matches(":focus-within") && l(), d = (t) => {
		if (a = 0, !e.isConnected) {
			m();
			return;
		}
		if (!u()) return;
		a = requestAnimationFrame(d);
		let o = i ? Math.min(t - i, 64) : 0;
		i = t;
		let c = e.scrollWidth - e.clientWidth;
		t < s || c <= 1 || (n = Math.min(c, Math.max(0, n + r * It * o / 1e3)), e.scrollLeft = n, (n >= c || n <= 0) && (r = n >= c ? -1 : 1, s = t + Lt));
	}, f = () => {
		e.isConnected ? !a && u() && (i = 0, a = requestAnimationFrame(d)) : m();
	}, p = () => {
		s = performance.now() + Rt;
	};
	c(e, "scroll", () => {
		Math.abs(e.scrollLeft - n) > 1 && (n = e.scrollLeft, p());
	}), c(e, "pointerenter", () => {
		o = !0;
	}), c(e, "pointerleave", () => {
		o = !1, p(), f();
	}), c(e, "focusout", () => setTimeout(f, 0)), c(document, "visibilitychange", f), document.addEventListener("scroll", f, {
		capture: !0,
		passive: !0,
		signal: t.signal
	}), f();
	function m() {
		cancelAnimationFrame(a), a = 0, t.abort(), K.delete(e);
	}
	K.set(e, m);
}
function Bt(e) {
	K.get(e)?.();
}
var q = null;
function J() {
	if (!q) {
		let e = getComputedStyle(document.documentElement);
		q = {
			easing: e.getPropertyValue("--spring-pane").trim() || "ease",
			duration: parseFloat(e.getPropertyValue("--spring-pane-ms")) || 300
		};
	}
	return q;
}
function Vt(e, t, n, r = "x") {
	e.style.width = `${n.w}px`, e.style.height = `${n.h}px`;
	let i = r === "y" ? "h" : "w", a = r === "y" ? "y" : "x", o = `${n.x}px ${n.y}px`;
	if (t && t[a] !== n[a] && !matchMedia("(prefers-reduced-motion:reduce)").matches) {
		let s = J();
		e.getAnimations().forEach((e) => e.cancel()), e.animate([{ translate: r === "y" ? `${n.x}px ${t.y}px` : `${t.x}px ${n.y}px` }, { translate: o }], {
			duration: s.duration,
			easing: s.easing,
			fill: "none"
		});
		let c = 1 + Math.min(Math.abs(n[a] - t[a]) / n[i], 1.5) * .12;
		e.animate([
			{
				scale: "1 1",
				offset: 0
			},
			{
				scale: r === "y" ? `1 ${c}` : `${c} 1`,
				offset: .3
			},
			{
				scale: "1 1",
				offset: 1
			}
		], {
			duration: s.duration,
			easing: "ease-in-out",
			fill: "none"
		});
	}
	e.style.translate = o;
}
function Ht(e, { className: t = "", label: n = "可滚动内容", overflow: r = "y" } = {}) {
	let i = (/* @__PURE__ */ new Set([
		"x",
		"y",
		"both"
	])).has(r) ? r : "y";
	return `<div class="geist-scroller${t ? ` ${m(t)}` : ""}" data-geist-scroller>
    <div class="geist-scroller-overlay" aria-hidden="true"></div>
    <div class="geist-scroller-container" data-overflow="${i}" tabindex="0" aria-label="${m(n)}">${e}</div>
  </div>`;
}
function Y(e) {
	let t = e.querySelector(":scope > .geist-scroller-container"), n = e.querySelector(":scope > .geist-scroller-overlay");
	!t || !n || (n.classList.toggle("can-scroll-top", t.scrollTop > 1), n.classList.toggle("can-scroll-bottom", t.scrollTop + t.clientHeight < t.scrollHeight - 1), n.classList.toggle("can-scroll-left", t.scrollLeft > 1), n.classList.toggle("can-scroll-right", t.scrollLeft + t.clientWidth < t.scrollWidth - 1));
}
function Ut(e = document) {
	e.querySelectorAll("[data-geist-scroller]").forEach((e) => {
		let t = e.querySelector(":scope > .geist-scroller-container");
		t && (t.dataset.scrollerWired || (t.dataset.scrollerWired = "true", t.addEventListener("scroll", () => Y(e), { passive: !0 }), t.addEventListener("load", () => Y(e), !0)), requestAnimationFrame(() => Y(e)));
	});
}
var Wt = [
	"[data-stage-side-content]",
	"[data-stage-scroll]",
	".tagpickbody",
	"[data-mix-list]",
	".playlistpicklist",
	"[data-player-stats]",
	".vjs-peach-settings-menu",
	".geist-scroller-container",
	".metricstrip",
	".tastesummaries",
	".skeletondashstrip",
	".followpagination",
	".reviewtabs",
	".ftablewrap",
	".board-local-nav",
	"[data-manage-menu]",
	".follow-workspace-switch",
	".fmanagenav",
	"[role=\"listbox\"]"
].join(","), Gt = ".reviewtabs,.ftablewrap,.board-local-nav,[data-manage-menu],.follow-workspace-switch,.fmanagenav";
function Kt(e = document) {
	e.querySelectorAll(Wt).forEach((e) => {
		if (e.matches(Gt)) {
			Ft(e);
			return;
		}
		Ie(e);
	});
}
//#endregion
//#region src/ui-kit/controls.ts
function X(e, t = !0) {
	e && (t ? (e.setAttribute("aria-busy", "true"), e.setAttribute("aria-disabled", "true")) : (e.removeAttribute("aria-busy"), e.removeAttribute("aria-disabled")));
}
var qt = /* @__PURE__ */ new WeakSet();
function Jt(e = document) {
	qt.has(e) || (qt.add(e), e.addEventListener("click", (t) => {
		let n = t.target.closest?.("button[aria-busy=\"true\"],[role=\"button\"][aria-busy=\"true\"]");
		!n || !e.contains(n) || (t.preventDefault(), t.stopImmediatePropagation());
	}, !0));
}
function Yt(e, t, r, i, { attr: a = "", className: o = "", text: s = !1 } = {}) {
	let c = r.map(([t, r, o]) => `<label title="${m(r)}"><input type="radio" name="${m(e)}" value="${m(t)}" ${a}
      ${t === i ? "checked" : ""}><span aria-hidden="true">${s ? (o ? n(o) : "") + m(r) : n(o)}</span><span class="sr-only">${m(r)}</span></label>`).join("");
	return `<fieldset class="iconswitch${o ? ` ${m(o)}` : ""}"><legend class="sr-only">${m(t)}</legend>${c}</fieldset>`;
}
function Xt(e, t, n) {
	e?.querySelectorAll(`[${t}]`).forEach((e) => {
		e.onchange = () => {
			e.checked && n(e.value);
		};
	});
}
var Zt = 9;
function Qt({ value: e = 0, min: t = 0, max: n = 100, step: r = 1, label: i = "", suffix: a = "%", attr: o = "", className: s = "" } = {}) {
	let c = n > t ? (e - t) / (n - t) * 100 : 0, l = `${e}${a}`;
	return `<div class="dial${s ? ` ${m(s)}` : ""}" ${o}>
    <div class="dial-slider" data-dial-slider role="slider" tabindex="0" aria-label="${m(i)}"
      aria-valuemin="${t}" aria-valuemax="${n}" aria-valuenow="${e}" aria-valuetext="${m(l)}"
      data-dial-step="${r}" style="--dial-at:${c}%">
      <span class="dial-track" aria-hidden="true"><span class="dial-fill"></span></span>
      <span class="dial-ticks" aria-hidden="true">${"<span></span>".repeat(Zt)}</span>
      <span class="dial-handle" aria-hidden="true"></span>
    </div><b class="dial-value mono" data-dial-value>${m(l)}</b></div>`;
}
function $t(e, { onInput: t = () => {}, onChange: n = () => {}, suffix: r = "%" } = {}) {
	let i = e.querySelector("[data-dial-slider]"), a = e.querySelector("[data-dial-value]"), o = e.querySelector(".dial-track"), s = +i.getAttribute("aria-valuemin"), c = +i.getAttribute("aria-valuemax"), l = +i.dataset.dialStep || 1, u = +i.getAttribute("aria-valuenow"), d = (e) => Math.min(c, Math.max(s, Math.round(e / l) * l)), f = () => {
		let e = `${u}${r}`;
		i.style.setProperty("--dial-at", `${c > s ? (u - s) / (c - s) * 100 : 0}%`), i.setAttribute("aria-valuenow", String(u)), i.setAttribute("aria-valuetext", e), a && (a.textContent = e);
	}, p = (e, n) => {
		let r = d(e);
		return r !== u && (u = r, f(), n && t(u), !0);
	}, m = null, h = (e) => {
		let t = m || o.getBoundingClientRect(), n = t.width ? (e.clientX - t.left) / t.width : 0;
		p(s + (c - s) * Math.min(1, Math.max(0, n)), !0);
	};
	i.addEventListener("pointerdown", (e) => {
		if (e.pointerType !== "mouse" || e.button === 0) {
			e.preventDefault(), i.focus(), m = o.getBoundingClientRect(), i.dataset.dragging = "true";
			try {
				i.setPointerCapture(e.pointerId);
			} catch {}
			h(e);
		}
	}), i.addEventListener("pointermove", (e) => {
		i.dataset.dragging === "true" && h(e);
	});
	let g = (e) => {
		if (i.dataset.dragging === "true") {
			delete i.dataset.dragging, m = null;
			try {
				i.hasPointerCapture(e.pointerId) && i.releasePointerCapture(e.pointerId);
			} catch {}
			n(u);
		}
	};
	return i.addEventListener("pointerup", g), i.addEventListener("pointercancel", g), i.addEventListener("keydown", (e) => {
		let t = e.shiftKey ? 10 : l, r = {
			ArrowLeft: -t,
			ArrowDown: -t,
			ArrowRight: t,
			ArrowUp: t
		}, i = null;
		e.key in r ? i = u + r[e.key] : e.key === "Home" ? i = s : e.key === "End" && (i = c), i !== null && (e.preventDefault(), p(i, !0) && n(u));
	}), {
		get value() {
			return u;
		},
		set(e) {
			p(e, !1);
		}
	};
}
function en(e, t, n) {
	n.classList.add("context-card"), n.setAttribute("popover", "manual"), n.setAttribute("role", "dialog"), n.tabIndex = -1, t.setAttribute("aria-haspopup", "dialog"), t.setAttribute("aria-controls", n.id);
	let r = B(e, t, n), i, a = () => {
		clearTimeout(i), r.setOpen(!1);
	}, o = () => {
		clearTimeout(i), i = setTimeout(() => {
			t.isConnected && r.setOpen(!0);
		}, 150);
	}, s = () => {
		clearTimeout(i), i = setTimeout(() => {
			!n.matches(":hover") && !t.matches(":hover") && !n.contains(document.activeElement) && document.activeElement !== t && a();
		}, 150);
	};
	return t.addEventListener("pointerenter", o), t.addEventListener("pointerleave", s), n.addEventListener("pointerenter", () => clearTimeout(i)), n.addEventListener("pointerleave", s), t.addEventListener("focus", o), t.addEventListener("blur", s), t.addEventListener("click", () => clearTimeout(i)), e.addEventListener("keydown", (e) => {
		e.key === "Escape" && a();
	}), n.addEventListener("focusout", s), t.addEventListener("keydown", (e) => {
		e.key === "ArrowDown" && r.isOpen() && (e.preventDefault(), (n.querySelector("a,button,[tabindex=\"0\"]") || n).focus());
	}), {
		...r,
		hide: a
	};
}
function tn(e, { selector: t, attribute: n, onMove: r } = {}) {
	let i = () => [...e.querySelectorAll(t)], a = () => i().forEach((e) => e.classList.remove("dragging", "drop-before", "drop-after")), o = null;
	i().forEach((e) => {
		let t = e.getAttribute(n);
		e.draggable = !0, e.addEventListener("dragstart", (n) => {
			o = t, e.classList.add("dragging"), n.dataTransfer.effectAllowed = "move", n.dataTransfer.setData("text/plain", t || "peach-row");
		}), e.addEventListener("dragover", (n) => {
			if (o === null || o === t) return;
			n.preventDefault(), n.dataTransfer.dropEffect = "move";
			let r = n.clientY > e.getBoundingClientRect().top + e.offsetHeight / 2;
			i().forEach((e) => e.classList.remove("drop-before", "drop-after")), e.classList.add(r ? "drop-after" : "drop-before");
		}), e.addEventListener("drop", (n) => {
			n.preventDefault();
			let i = e.classList.contains("drop-after"), s = o;
			o = null, a(), s !== null && s !== t && r(s, t, i);
		}), e.addEventListener("dragend", () => {
			o = null, a();
		});
	});
}
//#endregion
//#region src/ui-kit/modal.ts
var nn = 0;
function rn({ title: e, description: t = "", body: n = "", confirmLabel: r, cancelLabel: i = "取消", onConfirm: a = null, confirmDisabled: o = !1 } = {}) {
	let s = document.activeElement, c = document.createElement("dialog");
	c.className = "geist-modal";
	let l = `geist-form-title-${++nn}`;
	c.setAttribute("aria-labelledby", l), c.innerHTML = `<form class="geist-modal-form" novalidate>
      <div class="geist-modal-body"><h3 id="${l}"></h3>${t ? "<p></p>" : ""}
        <div class="geist-modal-fields">${n}</div><div data-modal-error></div></div>
      <footer class="geist-modal-footer">
        <div><button type="button" class="geist-button" data-modal-cancel></button></div>
        <div><button type="submit" class="geist-button primary" data-modal-confirm></button></div>
      </footer></form>`, c.querySelector("h3").textContent = e, t && (c.querySelector(".geist-modal-body p").textContent = t);
	let u = c.querySelector("[data-modal-cancel]"), d = c.querySelector("[data-modal-confirm]"), f = c.querySelector("[data-modal-error]");
	u.textContent = i, d.textContent = r, d.disabled = !!o, document.body.append(c);
	let p = null, m = !1, h = new Promise((e) => c.addEventListener("close", () => {
		c.remove(), s instanceof HTMLElement && s.isConnected && s.focus(), e(p || { confirmed: !1 });
	}, { once: !0 }));
	return u.onclick = () => {
		m || c.close();
	}, c.addEventListener("cancel", (e) => {
		m && e.preventDefault();
	}), c.addEventListener("click", (e) => {
		e.target === c && !m && c.close();
	}), c.querySelector("form").onsubmit = async (e) => {
		if (e.preventDefault(), !(m || d.disabled)) {
			if (!a) {
				p = { confirmed: !0 }, c.close();
				return;
			}
			f.innerHTML = "", m = !0, X(d);
			try {
				p = {
					confirmed: !0,
					result: await a()
				}, c.close();
			} catch (e) {
				f.innerHTML = V(e.message || "操作未完成", { variant: "error" }), X(d, !1);
			} finally {
				m = !1;
			}
		}
	}, c.showModal(), A("pop"), (c.querySelector(".geist-modal-fields input:not([type=\"checkbox\"])") || d).focus(), {
		dialog: c,
		confirmButton: d,
		done: h,
		close: () => c.close()
	};
}
var an = 0;
function on({ title: e, body: t, confirmLabel: n, cancelLabel: r = "取消", onConfirm: i = null, danger: a = !1 } = {}) {
	let o = document.activeElement, s = document.createElement("dialog");
	s.className = "geist-modal";
	let c = `geist-modal-title-${++an}`;
	s.setAttribute("aria-labelledby", c), s.innerHTML = `<div class="geist-modal-body">
      <h3 id="${c}"></h3><p></p><div data-modal-error></div></div>
    <footer class="geist-modal-footer">
      <div><button type="button" class="geist-button" data-modal-cancel></button></div>
      <div><button type="button" class="geist-button primary" data-modal-confirm></button></div>
    </footer>`, s.querySelector("h3").textContent = e, s.querySelector(".geist-modal-body p").textContent = t;
	let l = s.querySelector("[data-modal-cancel]"), u = s.querySelector("[data-modal-confirm]");
	a && (u.classList.remove("primary"), u.classList.add("danger"));
	let d = s.querySelector("[data-modal-error]");
	return l.textContent = r, u.textContent = n, document.body.append(s), new Promise((e) => {
		let t = null, n = !1;
		s.addEventListener("close", () => {
			s.remove(), o instanceof HTMLElement && o.isConnected && o.focus(), e(t || { confirmed: !1 });
		}, { once: !0 }), l.onclick = () => {
			n || s.close();
		}, s.addEventListener("cancel", (e) => {
			n && e.preventDefault();
		}), s.addEventListener("click", (e) => {
			e.target === s && !n && !a && s.close();
		}), u.onclick = async () => {
			if (!n) {
				if (!i) {
					t = { confirmed: !0 }, s.close();
					return;
				}
				d.innerHTML = "", n = !0, X(u);
				try {
					t = {
						confirmed: !0,
						result: await i()
					}, s.close();
				} catch (e) {
					d.innerHTML = V(e.message || "操作未完成", { variant: "error" }), X(u, !1);
				} finally {
					n = !1;
				}
			}
		}, s.showModal(), A("pop"), (a ? l : u).focus();
	});
}
//#endregion
//#region src/onboarding/post-setup-tutorial.ts
var sn = "peach.post-setup-tutorial.v1", Z = "peach.post-setup-tutorial-collapsed.v1", cn = "peach.post-setup-tutorial-skipped.v1", Q = (e) => {
	try {
		return localStorage.getItem(e);
	} catch {
		return null;
	}
}, $ = (e, t) => {
	try {
		localStorage.setItem(e, t);
	} catch {}
}, ln = () => Q("peach.post-setup-tutorial.v1") || "", un = (e) => $(sn, e), dn = () => Q(Z) === "1", fn = (e) => $(Z, e ? "1" : "0"), pn = () => {
	try {
		let e = JSON.parse(Q("peach.post-setup-tutorial-skipped.v1") || "[]");
		return new Set(Array.isArray(e) ? e.filter((e) => typeof e == "string") : []);
	} catch {
		return /* @__PURE__ */ new Set();
	}
}, mn = (e) => $(cn, JSON.stringify([...e])), hn = (e) => JSON.stringify(e.map((e) => [
	e.key,
	e.done,
	e.label,
	e.description,
	e.href
])), gn = 0, _n = () => ++gn, vn = (e) => e === gn;
function yn() {
	mn(/* @__PURE__ */ new Set()), fn(!1), un("pending");
}
//#endregion
export { e as $, d as ENTITY_ROUTES, se as LOC, qe as MEDIA_SOURCE_ICONS, Z as POST_SETUP_TUTORIAL_COLLAPSED_KEY, sn as POST_SETUP_TUTORIAL_KEY, cn as POST_SETUP_TUTORIAL_SKIPPED_KEY, f as ROUTE_ENTITIES, c as ROUTE_STATES, St as SKELETON_REVEAL_DELAY, l as STATE_LABELS, s as STATE_ROUTES, le as TAG_DISPLAY_NAMES, ve as UI_SOUNDS, i as api, Ie as attachOverlayScrollbar, ot as badgeHtml, it as boardTabsHtml, S as brandIcon, st as checkboxHtml, ze as closeAnchoredMenu, Ye as collectionHeaderHtml, _t as configurationSkeletonHtml, on as confirmModal, Qt as dialSliderHtml, Ve as dismissMenu, ft as dissolveValue, at as emptyStateHtml, p as entityPath, m as esc, Et as fillSkeletonTier, Dt as fitSkeleton, ae as fmtClock, ie as fmtDur, oe as fmtSize, C as foldName, rn as formModal, $e as gaugeHtml, J as glideEase, I as growCollapse, T as hasJapaneseText, n as icon, ct as iconSwapHtml, Yt as iconSwitchHtml, yt as indexSkeletonHtml, Fe as initMiddleTruncate, a as isAbort, u as isCatalogPath, vn as isCurrentPostSetupTutorialRequest, pe as javDisplayName, w as javFileDisplayName, fe as javPreferredTitle, me as javTitleHtml, E as javTitleParts, y as linkMarkUrl, rt as loadingDotsHtml, o as mapLimit, ke as middleTruncateText, Vt as moveGlidePane, _n as nextPostSetupTutorialRequest, V as noteHtml, ne as officialLinkText, A as playUiSound, mt as popBadges, dt as popCount, dn as postSetupTutorialCollapsed, ln as postSetupTutorialMarker, hn as postSetupTutorialSignature, pn as postSetupTutorialSkipped, Be as presentMenu, et as progressHtml, Qe as projectBannerHtml, re as realDuration, r as requestErrorMessage, yn as resetPostSetupTutorialState, gt as revealSkeleton, ht as revealTexts, G as rubberBand, Ue as scrollMovesAnchor, Ht as scrollerHtml, nt as searchInputHtml, ce as seededRank, Ge as selectFieldHtml, We as selectOptionIconHtml, X as setActionBusy, Re as setCollapseOpen, lt as setIconSwap, fn as setPostSetupTutorialCollapsed, un as setPostSetupTutorialMarker, mn as setPostSetupTutorialSkipped, ye as setUiSoundsEnabled, b as siteMarkUrl, v as siteName, vt as skeletonHtml, tt as spinnerHtml, Bt as stopAutoScroll, ut as swapText, ue as tagLabel, be as uiSoundsEnabled, B as wireAnchoredMenu, zt as wireAutoScroll, Jt as wireBusyActions, Le as wireCollapse, en as wireContextCard, $t as wireDialSlider, tn as wireDragReorder, Ft as wireHorizontalScroller, Xt as wireIconSwitch, Kt as wireOverlayScrollbars, Ut as wireScrollers, Ke as wireSelectField, we as wireUiSounds };
