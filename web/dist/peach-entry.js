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
}, ee = (e) => `/link-mark?id=${encodeURIComponent(e.link_id ?? "")}`, te = (e) => `/site-mark?${new URLSearchParams(e)}`, ne = [
	[["x.com", "twitter.com"], "brand-x"],
	[["instagram.com"], "brand-instagram"],
	[["threads.com", "threads.net"], "brand-threads"],
	[["tiktok.com"], "brand-tiktok"],
	[["youtube.com", "youtu.be"], "brand-youtube"],
	[["facebook.com", "fb.com"], "brand-facebook"],
	[["linktr.ee", "linktree.com"], "brand-linktree"]
], re = (e) => {
	let t = _(e);
	return t && ne.find(([e]) => e.some((e) => t === e || t.endsWith("." + e)))?.[1] || "";
}, y = (e) => String(e ?? "").normalize("NFKC").trim().toLocaleLowerCase(), ie = ["web.archive.org"], ae = (e) => ie.includes(_(e)), oe = (e, t, n = []) => {
	let r = v(e.url) || e.label || "";
	if (t !== "studio" && t !== "agency" || ae(e.url)) return r;
	let i = [r, e.label].map(y).filter(Boolean);
	return !i.length || i.includes("官方网站") || i.some((t) => g(t) === _(e.url) || n.some((e) => {
		let n = y(e);
		return !!n && (n.includes(t) || t.includes(n));
	})) ? "官方网站" : r;
}, b = (e) => {
	let t = Number(e);
	return Number.isFinite(t) && t > 0 ? t : 0;
}, se = (e) => {
	if (e = b(e), !e) return "—";
	e = Math.round(e);
	let t = e / 3600 | 0, n = e % 3600 / 60 | 0, r = e % 60;
	return t ? `${t}:${String(n).padStart(2, "0")}:${String(r).padStart(2, "0")}` : `${n}:${String(r).padStart(2, "0")}`;
}, ce = (e) => {
	e = Math.max(0, Math.floor(Number(e) || 0));
	let t = e / 3600 | 0, n = e % 3600 / 60 | 0, r = e % 60;
	return t ? `${t}:${String(n).padStart(2, "0")}:${String(r).padStart(2, "0")}` : `${n}:${String(r).padStart(2, "0")}`;
}, le = (e) => e >= 0x4000000000000 ? (e / 0x4000000000000).toFixed(2) + " PB" : e >= 1099511627776 ? (e / 1099511627776).toFixed(2) + " TB" : e >= 1073741824 ? (e / 1073741824).toFixed(1) + " GB" : (e / 1048576 | 0) + " MB", ue = {
	local: "本地",
	115: "115",
	pikpak: "PikPak",
	online: "在线"
}, de = (e, t) => {
	let n = 2166136261;
	for (let r of `${e}\u0000${t}`) n ^= r.codePointAt(0), n = Math.imul(n, 16777619) >>> 0;
	return n;
}, x = {
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
}, fe = (e) => x[e] || e, pe = /\.(?:mp4|mkv|avi|wmv|mov|m4v|webm|ts|m2ts|mts|mpg|mpeg|flv|rm|rmvb|iso)$/i, S = (e, t = e?.name) => {
	let n = String(t || "").trim();
	return e?.is_jav ? n.replace(pe, "") : n;
}, C = (e) => /[぀-ヿ㐀-鿿]/.test(String(e || "")), w = (e) => {
	let t = [e?.catalog_title, e?.original_title].map((e) => String(e || "").trim()).filter(Boolean);
	return t.find(C) || t[0] || "";
};
function T(e, t = e?.name) {
	let n = S(e, t), r = String(e?.code || "").trim().toUpperCase();
	if (!e?.is_jav || !r) return {
		code: "",
		title: n
	};
	let i = String(e?.display_code || r).trim().toUpperCase(), a = n.toUpperCase(), o = a === r || a === i || a.startsWith(r) && /^[\s._\-[\]]/.test(n.slice(r.length)) || a.startsWith(i) && /^[\s._\-[\]]/.test(n.slice(i.length)), s = a.startsWith(i) ? i.length : r.length, c = (o ? n.slice(s) : n).replace(/^[\s._-]+/, "").trim(), l = w(e), u = Object.prototype.hasOwnProperty.call(e || {}, "display_title") ? String(e.display_title || "").trim() : c;
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
var me = (e, t = e?.name) => {
	let { code: n, title: r, badges: i = [] } = T(e, t);
	return n ? [
		n,
		...i,
		r
	].filter(Boolean).join(" ") : r;
};
function he(e, t = e?.name) {
	let { code: n, title: r, badges: i = [] } = T(e, t);
	if (!n) return m(r);
	let a = i.map((e) => `<small class="javedition ${e === "中字" ? "subtitle" : e === "无码" ? "uncensored" : "cracked"}">${m(e)}</small>`).join("");
	return `<span class="javidentity"><strong class="javcode">${m(n)}</strong>${a}</span>${r ? ` <span class="javtitle">${m(r)}</span>` : ""}`;
}
//#endregion
//#region src/ui-kit/sounds.ts
var E = null, D = !1;
function ge() {
	let e = globalThis.AudioContext || globalThis.webkitAudioContext;
	return e ? (E ||= new e(), E.state === "suspended" && E.resume()?.catch?.(() => {}), E) : null;
}
function O(e, t, { type: n = "sine", from: r, to: i = r, duration: a, volume: o, attack: s = 0, start: c = 0, filter: l = null }) {
	let u = t + c, d = e.createOscillator(), f = e.createGain();
	d.type = n, d.frequency.setValueAtTime(r, u), i !== r && d.frequency.exponentialRampToValueAtTime(i, u + a), s ? (f.gain.setValueAtTime(.001, u), f.gain.exponentialRampToValueAtTime(o, u + s)) : f.gain.setValueAtTime(o, u), f.gain.exponentialRampToValueAtTime(.001, u + a);
	let p = d;
	if (l) {
		let t = e.createBiquadFilter();
		t.type = l.type, t.frequency.value = l.frequency, t.Q.value = l.Q ?? 1, d.connect(t), p = t;
	}
	p.connect(f), f.connect(e.destination), d.start(u), d.stop(u + a + .01);
}
function k(e, t, { duration: n, volume: r, filter: i, sweepTo: a = null, attack: o = 0 }) {
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
var A = {
	click: (e, t) => k(e, t, {
		duration: .06,
		volume: .12,
		filter: {
			frequency: 1200,
			Q: 1
		}
	}),
	"toggle-on": (e, t) => O(e, t, {
		from: 550,
		to: 650,
		duration: .08,
		volume: .15
	}),
	"toggle-off": (e, t) => O(e, t, {
		from: 650,
		to: 550,
		duration: .08,
		volume: .15
	}),
	success: (e, t) => {
		O(e, t, {
			from: 523,
			duration: .12,
			volume: .18
		}), O(e, t, {
			from: 653.75,
			duration: .12,
			volume: .18,
			start: .2
		});
	},
	warning: (e, t) => {
		O(e, t, {
			type: "triangle",
			from: 600,
			duration: .08,
			volume: .15
		}), O(e, t, {
			type: "triangle",
			from: 600,
			duration: .08,
			volume: .15,
			start: .16
		});
	},
	error: (e, t) => O(e, t, {
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
	whoosh: (e, t) => k(e, t, {
		duration: .12,
		volume: .08,
		attack: .036,
		filter: {
			frequency: 1e3,
			Q: 1
		},
		sweepTo: 6e3
	}),
	pop: (e, t) => O(e, t, {
		from: 1500,
		to: 500,
		duration: .04,
		volume: .15
	})
}, _e = Object.freeze(Object.keys(A));
function ve(e) {
	D = e === !0;
}
function ye() {
	return D;
}
function j(e) {
	let t = A[e];
	if (!t) throw Error(`没有「${e}」这种界面音效`);
	if (!D) return !1;
	let n = ge();
	return n ? (t(n, n.currentTime), !0) : !1;
}
var be = "button,[role=\"button\"],[role=\"tab\"],[role=\"menuitem\"],[role=\"menuitemradio\"],[role=\"menuitemcheckbox\"],[role=\"option\"],summary,a[href]", xe = "input[type=\"checkbox\"][role=\"switch\"]";
function M(e) {
	return e.disabled === !0 || e.getAttribute("aria-disabled") === "true";
}
function Se(e = document) {
	e.addEventListener("click", (e) => {
		let t = e.target?.closest?.(be);
		!t || M(t) || j("click");
	}, { capture: !0 }), e.addEventListener("change", (e) => {
		let t = e.target;
		!t?.matches?.(xe) || M(t) || j(t.checked ? "toggle-on" : "toggle-off");
	}, { capture: !0 });
}
//#endregion
//#region src/ui-kit/middle-truncate.ts
var N = "…", P = typeof Intl.Segmenter == "function" ? new Intl.Segmenter(void 0, { granularity: "grapheme" }) : null, F = /* @__PURE__ */ new WeakMap(), Ce = /* @__PURE__ */ new WeakSet(), I = null, L = (e) => P ? [...P.segment(String(e ?? ""))].map((e) => e.segment) : Array.from(String(e ?? ""));
function R(e, t) {
	let n = L(e);
	if (!n.length || t(e)) return String(e ?? "");
	let r = 0, i = Math.max(0, n.length - 1), a = N;
	for (; r <= i;) {
		let e = r + i >> 1, o = Math.ceil(e / 2), s = Math.floor(e / 2), c = n.slice(0, o).join("") + N + (s ? n.slice(-s).join("") : "");
		t(c) ? (a = c, r = e + 1) : i = e - 1;
	}
	return a;
}
var z = Object.assign((e, t) => {
	let n = getComputedStyle(e), r = (z.canvas ||= document.createElement("canvas")).getContext("2d");
	if (!r) return Infinity;
	r.font = n.font || `${n.fontStyle} ${n.fontWeight} ${n.fontSize} ${n.fontFamily}`;
	let i = r.measureText(t).width, a = parseFloat(n.letterSpacing);
	Number.isFinite(a) && (i += Math.max(0, L(t).length - 1) * a);
	let o = parseFloat(n.wordSpacing);
	return Number.isFinite(o) && (i += (t.match(/\s/g) || []).length * o), i;
}, { canvas: null }), we = (e) => {
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
}, Te = (e) => {
	let t = F.get(e);
	if (!t || !e.isConnected) return;
	let n = we(e), r = n > 0 ? R(t.full, (t) => z(e, t) <= n) : t.full;
	t.rendered = r, e.textContent !== r && (e.textContent = r);
	let i = r !== t.full;
	e.classList.toggle("middle-truncated", i), e.setAttribute("aria-label", t.full), (!e.hasAttribute("title") || e.dataset.middleTitle === "true") && (e.title = t.full, e.dataset.middleTitle = "true");
}, B = (e) => {
	let t = F.get(e);
	!t || t.raf || (t.raf = requestAnimationFrame(() => {
		t.raf = 0, Te(e);
	}));
}, V = (e) => {
	e instanceof HTMLElement && (F.has(e) || F.set(e, {
		full: e.textContent || "",
		rendered: e.textContent || "",
		raf: 0
	}), Ce.has(e) || (Ce.add(e), e.dataset.middleTruncateWithin !== void 0 && e.parentElement ? I?.observe(e.parentElement) : I?.observe(e)), B(e));
}, H = (e) => {
	if (e.nodeType !== Node.ELEMENT_NODE) return;
	let t = e;
	t.matches("[data-middle-truncate]") && V(t), t.querySelectorAll("[data-middle-truncate]").forEach(V);
};
function Ee(e = document) {
	I = new ResizeObserver((e) => e.forEach((e) => {
		B(e.target), e.target.querySelectorAll?.(":scope>[data-middle-truncate-within]").forEach(B);
	})), H(e.documentElement || e), new MutationObserver((e) => e.forEach((e) => {
		e.addedNodes.forEach(H);
		let t = (e.target.nodeType === Node.TEXT_NODE ? e.target.parentElement : e.target)?.closest?.("[data-middle-truncate]");
		if (!t) return;
		let n = F.get(t);
		n && t.textContent !== n.rendered && (n.full = t.textContent || "", t.dataset.middleTitle === "true" && t.removeAttribute("title"), B(t));
	})).observe(e.body || e, {
		childList: !0,
		characterData: !0,
		subtree: !0
	}), document.fonts?.ready?.then(() => e.querySelectorAll("[data-middle-truncate]").forEach(B)), e.addEventListener("copy", (e) => {
		let t = document.getSelection();
		if (!t || t.isCollapsed) return;
		let n = (t.anchorNode?.nodeType === Node.ELEMENT_NODE ? t.anchorNode : t.anchorNode?.parentElement)?.closest?.("[data-middle-truncate]"), r = n && F.get(n);
		!r || !n.contains(t.focusNode) || !e.clipboardData || (e.clipboardData?.setData("text/plain", r.full), e.preventDefault());
	});
}
//#endregion
//#region src/ui-kit/overlay-scrollbar.ts
function De(e, { variant: t = "" } = {}) {
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
function Oe(e, t, n, r = "summary") {
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
			t.preventDefault(), s = !s, o.setAttribute("aria-expanded", String(s)), W(e, i, s);
		});
	});
}
var U = /* @__PURE__ */ new WeakMap();
function W(e, t, n) {
	t.classList.add("fcollapse");
	let r = (U.get(t) || 0) + 1;
	U.set(t, r);
	let i = () => U.get(t) === r;
	if (n) {
		t.inert = !1;
		let n = e.open ? t.getBoundingClientRect().height : 0;
		e.open = !0, K(t, n, i);
	} else t.inert = !0, t.classList.remove("fcollapse-settled"), t.style.height = t.getBoundingClientRect().height + "px", t.getBoundingClientRect(), t.style.height = "0px", G(t, () => {
		i() && (e.open = !1, t.style.height = "");
	});
}
function G(e, t) {
	let n = !1, r, i = (a) => {
		a && a.propertyName !== "height" || n || (n = !0, e.removeEventListener("transitionend", i), clearTimeout(r), t());
	};
	e.addEventListener("transitionend", i), r = setTimeout(i, 260);
}
function K(e, t, n = () => !0) {
	e.classList.remove("fcollapse-settled"), e.style.height = t + "px", e.getBoundingClientRect(), e.style.height = e.scrollHeight + "px", G(e, () => {
		n() && (e.style.height = "auto", e.classList.add("fcollapse-settled"));
	});
}
//#endregion
//#region src/ui-kit/anchored-menu.ts
var q = null, J = globalThis;
J.__peachMenuCloser || (J.__peachMenuCloser = !0, document.addEventListener("click", (e) => {
	if (!q) return;
	let t = e.target;
	q.menu.contains(t) || q.toggle.contains(t) || q.mount.contains(t) && !(t instanceof Element && t.closest("a[href],button,input,select,textarea,summary,[role=button],[role=menuitem],[tabindex]")) || q.setOpen(!1);
}, !0));
function ke() {
	q && q.setOpen(!1);
}
var Y = /* @__PURE__ */ new WeakMap();
function X(e) {
	Y.delete(e), e.classList.remove("leaving"), e.hidden && j("whoosh"), e.hidden = !1;
}
function Z(e, t) {
	if (e.hidden || Y.has(e)) return;
	let n = () => {
		Y.get(e) === n && (Y.delete(e), e.classList.remove("leaving"), e.hidden = !0, t && t());
	};
	if (Y.set(e, n), e.classList.add("leaving"), getComputedStyle(e).animationName === "none") {
		n();
		return;
	}
	e.addEventListener("animationend", (t) => {
		t.target === e && n();
	}, { once: !0 }), setTimeout(n, 240);
}
var Ae = () => 8 + (parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--topH")) || 0);
function Q(e, t) {
	return e.target instanceof Node && e.target.contains(t);
}
function je(e, t, n, { side: r = !1, align: i = "end" } = {}) {
	let a = () => {
		let e = t.getBoundingClientRect(), a = n.offsetWidth;
		if (r && innerWidth >= 640) {
			n.dataset.placement = "right", n.style.maxHeight = Math.max(0, innerHeight - 32) + "px", n.style.left = Math.max(16, Math.min(e.right + 8, innerWidth - a - 16)) + "px", n.style.top = Math.max(16, Math.min(e.top, innerHeight - n.offsetHeight - 16)) + "px";
			return;
		}
		let o = Ae(), s = innerHeight - 8 - e.bottom - 8, c = e.top - 8 - o, l = n.scrollHeight + n.offsetHeight - n.clientHeight, u = s >= l || s >= c, d = Math.min(l, Math.max(u ? s : c, 0));
		n.dataset.placement = u ? "bottom" : "top", n.style.maxHeight = d + "px";
		let f = i === "start" || n.classList.contains("context-card") ? e.left : e.right - a;
		n.style.left = Math.max(8, Math.min(f, innerWidth - a - 8)) + "px", n.style.top = (u ? e.bottom + 8 : e.top - 8 - d) + "px";
	}, o = (e) => {
		Q(e, t) && l(!1);
	}, s = n.hasAttribute("popover"), c = !1, l = (r) => {
		r ? (q && q.mount !== e && q.setOpen(!1), c = !0, X(n), s && !n.matches(":popover-open") && n.showPopover(), a(), window.addEventListener("resize", a), window.addEventListener("scroll", o, {
			capture: !0,
			passive: !0
		})) : (c = !1, window.removeEventListener("resize", a), window.removeEventListener("scroll", o, !0), Z(n, () => {
			n.style.left = "", n.style.top = "", n.style.maxHeight = "", s && n.matches(":popover-open") && n.hidePopover();
		})), t.setAttribute("aria-expanded", String(r)), q = r ? {
			mount: e,
			menu: n,
			toggle: t,
			setOpen: l
		} : q && q.mount === e ? null : q;
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
function $(e) {
	return e ? e.startsWith("data:image/png;base64,") ? `<img class="gselectmark" src="${m(e)}" alt="" width="16" height="16">` : n(e, "gselectmark") : "";
}
function Me(e, t, { label: r = "", attr: i = "", className: a = "" } = {}) {
	let o = e.find(([e]) => String(e) === String(t)) || e[0] || ["", ""], s = ([, e, t]) => `${$(t)}${m(e)}`, c = e.map(([e, t, n]) => `<button type="button" role="option" data-select-option="${m(e)}"
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
function Ne(e) {
	let t = e.querySelector("[data-select-trigger]"), n = e.querySelector("[data-select-menu]"), r = e.querySelector("[data-select-label]"), i = () => [...n.querySelectorAll("[data-select-option]")], a = () => n.querySelector("[aria-selected=\"true\"]");
	t.addEventListener("click", () => {
		let r = `${t.getBoundingClientRect().width}px`;
		n.style.minWidth = r, e.hasAttribute("data-fixed-width") && (n.style.width = r);
	});
	let o = je(e, t, n);
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
var Pe = {
	local: "hard-drive",
	115: "data:image/png;base64,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",
	pikpak: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACY0lEQVR4nNWXy2tTQRSHv7m5RUWttqlNW1OairhKNbrU+lhE/AOkdCOIIO7arty0QhSxCIIQ7VJwIfgfCIJdFB+rgC32AVIflD5CbFUsoohJRiZzb5Ne05p4kxv94HCTc+bO+c0MM3eOoICD/TJswAAQBdoBH5UhA8wDo1mIv7ojpuyAsH9EBuQgkmuASXVJI4lN3BXDawIifXIQwQ28RDA0ERfDwpr2cQ9G7iSdhcOGteZeJ1eYKreB5DS1I2oiCJba2hDQVA9tjdDaCHMfICuhMwDJz5D8BMtftK9E2s2NttrJMOxvzSdT1rIb6goW69KIXsjr5/K+nxlIWWKWrOebJIxNFhXgK7r20QjcPL+59PllGH8LarDvU3oWFHU+CDZpK+TKA3j88vd+zGKd93av/y8lrKxao7Ls6bROrrj6EE6E9WzZppZKrJ0y0Hu8RAGhZuhohqk5nShp2Y/0+nZqxPaoFQsr2my2mNDSkBe01w/7AvAu9QcB/nrYs0vboU4qSsNOwCHAoMYY/5WAsckNt1NJ8WKY5TS+fF8/E7f/Lu5aQDrjLu5agOlzF3ct4NYFd3HXAk51uYv/k9vQLPeFr9/h4gh0dcCBNu17vaiP7nt9sGNblQVs3wo9x+DZNCRm9aUyFICebh0rF9PpWP22+QvqC3f2qLZyKda34XTMLsGLGSrO8xndtxMR6ZfqQ+tz7uczRyDor0zyxY/6LlDkoMqYVsUSKvSqho8SVB/JglqCUWqF4ImharVcueQ96j4bN3KFoiDmeXpJTOXO7QJVoyEZ8mgm0rm6sLA4talFef4LaurBZfZxNPMAAAAASUVORK5CYII="
};
//#endregion
export { e as $, d as ENTITY_ROUTES, ue as LOC, Pe as MEDIA_SOURCE_ICONS, f as ROUTE_ENTITIES, c as ROUTE_STATES, l as STATE_LABELS, s as STATE_ROUTES, x as TAG_DISPLAY_NAMES, _e as UI_SOUNDS, i as api, De as attachOverlayScrollbar, re as brandIcon, ke as closeAnchoredMenu, Z as dismissMenu, p as entityPath, m as esc, ce as fmtClock, se as fmtDur, le as fmtSize, y as foldName, K as growCollapse, C as hasJapaneseText, n as icon, Ee as initMiddleTruncate, a as isAbort, u as isCatalogPath, me as javDisplayName, S as javFileDisplayName, w as javPreferredTitle, he as javTitleHtml, T as javTitleParts, ee as linkMarkUrl, o as mapLimit, R as middleTruncateText, oe as officialLinkText, j as playUiSound, X as presentMenu, b as realDuration, r as requestErrorMessage, Q as scrollMovesAnchor, de as seededRank, Me as selectFieldHtml, $ as selectOptionIconHtml, W as setCollapseOpen, ve as setUiSoundsEnabled, te as siteMarkUrl, v as siteName, fe as tagLabel, ye as uiSoundsEnabled, je as wireAnchoredMenu, Oe as wireCollapse, Ne as wireSelectField, Se as wireUiSounds };
