(function() {
	try {
		var e = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "713c6429-edd4-4ac7-80b3-a5784403d709", e._sentryDebugIdIdentifier = "sentry-dbid-713c6429-edd4-4ac7-80b3-a5784403d709");
	} catch {}
})();
import { $542a13ca2fa5b484$export$5b6b19405a83ff9d as e, $b4f18e3395fe64d7$export$3d96ec278d3efce4 as t, $b4f18e3395fe64d7$export$3e41faf802a29e71 as n, $b4f18e3395fe64d7$export$b2539bed5023c21c as r, ActivePoints as i, AnimatedItems as a, Button as o, ButtonLink as s, CHART_CARD as c, CHART_COLORS as l, CartesianLabelListContextProvider as u, CategoryTick as d, ChartBackground as f, ChartContainer as p, ChartHead as m, ChartLegend as h, ChartLegendContent as g, ChartTip as _, ChartTooltip as v, ChartTooltipContent as y, DataLabelColorsContextProvider as b, DataLabelThemeContextProvider as x, DefaultZIndexes as S, Disclosure as C, Dots as w, E3 as T, EmptyState as E, EvilBarChart as D, FLOW_LABEL_X as O, FLOW_VIEWBOX as k, FillObjectDefinition as ee, Gg as A, ImageWithFallback as te, Input as ne, LEGACY_AVATAR_IMG as re, LabelListFromLabelProp as ie, Layer as j, LoadingIndicator as ae, M6 as oe, MENU_ITEM as se, MENU_ITEM_INTERACTIVE as ce, MENU_POPOVER_SURFACE as le, MenuDialog as ue, Note as M, OV as de, PolarLabelContextProvider as fe, PolarLabelFromLabelProp as pe, Progress as me, RegisterGraphicalItemId as he, Rf as ge, SEGMENT as _e, SEGMENTED_TRACK as ve, STAT_STRIP as ye, SegmentedTabList as be, Select$1 as xe, SelectItem$1 as Se, SetPolarGraphicalItem as Ce, SetPolarLegendPayload as we, SetTooltipEntrySettings as Te, StatCard as Ee, TASTE_REFRESH_KEY as De, TASTE_REFRESH_TASK as Oe, TASTE_WINDOWS as ke, TaskProgress as Ae, Text as je, Wt as Me, Xt as Ne, ZIndexLayer as Pe, _8 as Fe, __toESM as Ie, aB as Le, activityKind as Re, adaptEventsOfChild as ze, addRadiusAxis as Be, arrayTooltipSearcher as Ve, avatarInner as He, busyProps as N, cB as Ue, cardClass as We, categoryAxisWidth as Ge, clsx as P, cn as Ke, codedText as F, configureTasteBrowser as qe, confirmModal as Je, createSelector as I, cx as Ye, defaultPolarRadiusAxisProps as Xe, errorMessage as L, f1 as Ze, fetchTaste as Qe, fetchTasteJob as $e, firstGrapheme as et, fitLabel as tt, flowGraph as nt, flowLabel as rt, fmtSize as it, g4 as at, getAxisTypeBasedOnLayout as ot, getBandSizeOfAxis as st, getClassNameFromUnknown as ct, getColorsCount as lt, getDotSymbol as ut, getFillUrl as dt, getLegendPayloadDot as ft, getPercentValue as pt, getSeriesFillId as mt, getTooltipNameProp as ht, getValueByDataKey as gt, historySpan as _t, identity as vt, importTasteExport as yt, interpolate as bt, isArrayLike as xt, isCategoricalAxis as St, isNullish as Ct, iteratee as wt, jobText as Tt, joinList as Et, keepPreviousData as Dt, mM as Ot, matchAnimationItems as kt, matchByIndex as At, noop as jt, polarToCartesian as R, pv as Mt, queryClient as z, r2 as Nt, radarRows as Pt, rankDetail as Ft, rankShares as It, removeRadiusAxis as Lt, removeTasteSource as Rt, require_jsx_runtime as zt, require_react as Bt, resolveDefaultProps as Vt, selectAngleAxis as Ht, selectAngleAxisRangeWithReversed as Ut, selectChartDataAndAlwaysIgnoreIndexes as Wt, selectChartLayout as Gt, selectPolarViewBox as Kt, selectRadiusAxis as qt, serverLabel as Jt, serverLabelList as Yt, siteMarkUrl as Xt, splitFill as Zt, startTasteRefresh as Qt, statCardClass as $t, svgPropertiesAndEvents as en, svgPropertiesNoEvents as B, svgPropertiesNoEventsFromUnknown as tn, t as V, tasteDate as nn, tasteDimensions as rn, tasteHours as an, tasteKey as H, tasteRefetchInterval as on, tasteTime as sn, tone as cn, topScores as ln, uo as un, useAnimationCallbacks as dn, useAnimationStartSnapshot as fn, useAppDispatch as pn, useAppSelector as U, useBackgroundJob as mn, useBackwardsCompatibleTheme as hn, useEffectiveDataKey as gn, useFillPaint as _n, useGraphicalItemIdentity as vn, useGraphicalItemThemeFill as yn, useIsPanorama as bn, useMutation as xn, usePolarChartLayout as Sn, useQuery as Cn, useRechartsTheme as wn, useSeriesDataLabelColors as Tn, useSeriesLabelThemeResolver as En, useThemeFillObject as Dn, useThemedActiveStyles as On, useUnthemedColors as kn, withFillColor as An } from "./peach-app.js";
import { ActivityHeat as jn, BAR_DOMAIN as Mn, ExpandableRanking as Nn, PolarAngleAxis as Pn, Polygon as Fn, barLabel as In, selectPolarAngleAxisTicks as Ln, selectPolarAxisScale as Rn, selectPolarAxisTicks as zn } from "./peach-app.expandable-ranking-Bxr5Gn6r.js";
import { Page as Bn } from "./peach-app.page-QAncjzM1.js";
import { PolarChart as Vn, defaultPolarChartProps as Hn, selectUnfilteredPolarItems as Un } from "./peach-app.PolarChart-CeCYLBHr.js";
import { BrowserIcon as Wn } from "./peach-app.browser-icon-N9Od-bAf.js";
var Gn = I([(e, t) => Ln(e, "angleAxis", t, !1)], (e) => {
	if (e) return e.map((e) => e.coordinate);
}), Kn = I([(e, t) => zn(e, "radiusAxis", t, !1)], (e) => {
	if (e) return e.map((e) => e.coordinate);
}), W = /* @__PURE__ */ Ie(Bt()), qn = [
	"gridType",
	"radialLines",
	"angleAxisId",
	"radiusAxisId",
	"cx",
	"cy",
	"innerRadius",
	"outerRadius",
	"polarAngles",
	"polarRadius",
	"zIndex"
];
function Jn(e, t) {
	if (e == null) return {};
	var n, r, i = Yn(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function Yn(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function G() {
	return G = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, G.apply(null, arguments);
}
function Xn(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function K(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Xn(Object(n), !0).forEach(function(t) {
			Zn(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Xn(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Zn(e, t, n) {
	return (t = Qn(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Qn(e) {
	var t = $n(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function $n(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var er = (e, t, n, r) => {
	var i = "";
	return r.forEach((r, a) => {
		var o = R(t, n, e, r);
		i += a ? `L ${o.x},${o.y}` : `M ${o.x},${o.y}`;
	}), i += "Z", i;
}, tr = (e) => {
	var t = e.cx, n = e.cy, r = e.innerRadius, i = e.outerRadius, a = e.polarAngles, o = e.radialLines;
	if (!a || !a.length || !o) return null;
	var s = K({}, B(e));
	return /*#__PURE__*/ W.createElement("g", { className: "recharts-polar-grid-angle" }, a.map((e) => {
		var a = R(t, n, r, e), o = R(t, n, i, e);
		return /*#__PURE__*/ W.createElement("line", G({ key: `line-${e}` }, s, {
			x1: a.x,
			y1: a.y,
			x2: o.x,
			y2: o.y
		}));
	}));
}, nr = (e) => {
	var t = e.cx, n = e.cy, r = e.radius, i = K({}, B(e));
	return /*#__PURE__*/ W.createElement("circle", G({}, i, {
		className: P("recharts-polar-grid-concentric-circle", e.className),
		cx: t,
		cy: n,
		r
	}));
}, rr = (e) => {
	var t = e.radius, n = K({}, B(e));
	return /*#__PURE__*/ W.createElement("path", G({}, n, {
		className: P("recharts-polar-grid-concentric-polygon", e.className),
		d: er(t, e.cx, e.cy, e.polarAngles)
	}));
}, ir = (e) => {
	var t = e.polarRadius, n = e.gridType;
	if (!t || !t.length) return null;
	var r = Math.max(...t), i = e.fill && e.fill !== "none";
	return /*#__PURE__*/ W.createElement("g", { className: "recharts-polar-grid-concentric" }, i && n === "circle" && /*#__PURE__*/ W.createElement(nr, G({}, e, { radius: r })), i && n !== "circle" && /*#__PURE__*/ W.createElement(rr, G({}, e, { radius: r })), t.map((t, r) => {
		var i = r;
		return n === "circle" ? /*#__PURE__*/ W.createElement(nr, G({ key: i }, e, {
			fill: "none",
			radius: t
		})) : /*#__PURE__*/ W.createElement(rr, G({ key: i }, e, {
			fill: "none",
			radius: t
		}));
	}));
}, ar = {
	stroke: "#ccc",
	strokeWidth: 1,
	fill: "none"
}, or = {
	angleAxisId: 0,
	radiusAxisId: 0,
	gridType: "polygon",
	radialLines: !0,
	zIndex: S.grid
}, sr = (e) => {
	var t = K(K({}, e), {}, { fill: Zt(e.fill).color }), n = hn((e) => An(e.grid), t, ar), r = Dn((e) => e.grid), i = _n(e.fill ?? r, n.fill, "recharts-polar-grid-fill"), a = K(K(K({}, t), n), {}, { fill: i.paint }), o = Vt(a, or), s = o.gridType, c = o.radialLines, l = o.angleAxisId, u = o.radiusAxisId, d = o.cx, f = o.cy, p = o.innerRadius, m = o.outerRadius, h = o.polarAngles, g = o.polarRadius, _ = o.zIndex, v = Jn(o, qn), y = U(Kt), b = U((e) => Gn(e, l)), x = U((e) => Kn(e, u)), S = Array.isArray(h) ? h : b, C = Array.isArray(g) ? g : x;
	if (S == null || C == null) return null;
	var w = y?.outerRadius ?? m ?? 0;
	if (w <= 0) return null;
	var T = C.map((e) => pt(e, w)), E = K({
		cx: y?.cx ?? d ?? 0,
		cy: y?.cy ?? f ?? 0,
		innerRadius: y?.innerRadius ?? p ?? 0,
		outerRadius: w,
		polarAngles: S,
		polarRadius: T,
		zIndex: _
	}, v);
	return /*#__PURE__*/ W.createElement(Pe, { zIndex: E.zIndex }, /*#__PURE__*/ W.createElement("g", { className: "recharts-polar-grid" }, i.definition != null && /*#__PURE__*/ W.createElement("defs", null, i.definition), /*#__PURE__*/ W.createElement(ir, G({
		gridType: s,
		radialLines: c
	}, E, {
		polarAngles: S,
		polarRadius: T
	})), /*#__PURE__*/ W.createElement(tr, G({
		gridType: s,
		radialLines: c
	}, E, {
		polarAngles: S,
		polarRadius: T
	}))));
};
sr.displayName = "PolarGrid";
// node_modules/es-toolkit/dist/compat/_internal/toArray.mjs
function cr(e) {
	return Array.isArray(e) ? e : Array.from(e);
}
// node_modules/es-toolkit/dist/compat/math/maxBy.mjs
function lr(e, t = vt) {
	if (e == null) return;
	let n = cr(e);
	if (n.length === 0) return;
	let r = wt(t), i, a;
	for (let e = 0; e < n.length; e++) {
		let t = n[e], o = r(t, e, n);
		o == null || Number.isNaN(o) || typeof o == "symbol" || (a === void 0 || o > a) && (a = o, i = t);
	}
	return i;
}
// node_modules/es-toolkit/dist/compat/math/minBy.mjs
function ur(e, t = vt) {
	if (e == null) return;
	let n = cr(e);
	if (n.length === 0) return;
	let r = wt(t), i, a;
	for (let e = 0; e < n.length; e++) {
		let t = n[e], o = r(t, e, n);
		o == null || Number.isNaN(o) || typeof o == "symbol" || (a === void 0 || o < a) && (a = o, i = t);
	}
	return i;
}
// node_modules/recharts/es6/polar/PolarRadiusAxis.js
var dr = ["type"], fr = [
	"cx",
	"cy",
	"angle",
	"axisLine"
], pr = [
	"angle",
	"tickFormatter",
	"stroke",
	"tick"
];
function q() {
	return q = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, q.apply(null, arguments);
}
function mr(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function J(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? mr(Object(n), !0).forEach(function(t) {
			hr(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : mr(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function hr(e, t, n) {
	return (t = gr(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function gr(e) {
	var t = _r(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function _r(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function vr(e, t) {
	if (e == null) return {};
	var n, r, i = yr(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function yr(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var br = "radiusAxis", xr = { stroke: "#ccc" };
function Sr(e) {
	var t = pn(), n = Sn(), r = (0, W.useMemo)(() => {
		var t = e.type, r = vr(e, dr), i = ot(n, "radiusAxis", t);
		if (i != null) return J(J({}, r), {}, { type: i });
	}, [e, n]);
	return (0, W.useEffect)(() => r == null ? jt : (t(Be(r)), () => {
		t(Lt(r));
	}), [t, r]), null;
}
var Cr = (e, t, n, r) => {
	var i = e.coordinate;
	return R(n, r, i, t);
}, wr = (e) => {
	var t;
	switch (e) {
		case "left":
			t = "end";
			break;
		case "right":
			t = "start";
			break;
		default: t = "middle";
	}
	return t;
}, Tr = (e, t, n, r) => {
	var i = lr(r, (e) => e.coordinate || 0);
	return {
		cx: t,
		cy: n,
		startAngle: e,
		endAngle: e,
		innerRadius: ur(r, (e) => e.coordinate || 0)?.coordinate || 0,
		outerRadius: i?.coordinate || 0,
		clockWise: !1
	};
}, Er = (e, t) => {
	var n = e.cx, r = e.cy, i = e.angle, a = e.axisLine, o = vr(e, fr), s = t.reduce((e, t) => [Math.min(e[0], t.coordinate), Math.max(e[1], t.coordinate)], [1e400, -1e400]), c = R(n, r, s[0], i), l = R(n, r, s[1], i), u = J(J(J({}, B(o)), {}, { fill: "none" }, B(a)), {}, {
		x1: c.x,
		y1: c.y,
		x2: l.x,
		y2: l.y
	});
	return /*#__PURE__*/ W.createElement("line", q({ className: "recharts-polar-radius-axis-line" }, u));
}, Dr = (e, t, n) => /*#__PURE__*/ W.isValidElement(e) ? /*#__PURE__*/ W.cloneElement(e, t) : typeof e == "function" ? e(t) : /*#__PURE__*/ W.createElement(je, q({}, t, { className: "recharts-polar-radius-axis-tick-value" }), n), Or = (e, t) => {
	var n = e.angle, r = e.tickFormatter, i = e.stroke, a = e.tick, o = vr(e, pr), s = wr(e.orientation), c = B(o), l = tn(a), u = t.map((t, o) => {
		var u = Cr(t, e.angle, e.cx, e.cy), d = J(J(J(J({
			textAnchor: s,
			transform: `rotate(${90 - n}, ${u.x}, ${u.y})`
		}, c), {}, {
			stroke: "none",
			fill: i
		}, l), {}, { index: o }, u), {}, { payload: t });
		return /*#__PURE__*/ W.createElement(j, q({
			className: P("recharts-polar-radius-axis-tick", ct(a)),
			key: `tick-${t.coordinate}`
		}, ze(e, t, o)), Dr(a, d, r ? r(t.value, o) : t.value));
	});
	return /*#__PURE__*/ W.createElement(j, { className: "recharts-polar-radius-axis-ticks" }, u);
}, kr = (e) => {
	var t = e.radiusAxisId, n = hn((e) => e.axis, {
		stroke: e.stroke,
		strokeWidth: e.strokeWidth,
		strokeOpacity: e.strokeOpacity,
		strokeDasharray: e.strokeDasharray
	}, xr), r = U(Kt), i = U((e) => Rn(e, "radiusAxis", t)), a = U((e) => zn(e, "radiusAxis", t, !1));
	if (r == null || !a || !a.length || i == null) return null;
	var o = J(J(J({}, e), n), {}, { scale: i }, r), s = o.tick, c = o.axisLine;
	return /*#__PURE__*/ W.createElement(Pe, { zIndex: o.zIndex }, /*#__PURE__*/ W.createElement(j, { className: P("recharts-polar-radius-axis", br, o.className) }, c && Er(o, a), s && Or(o, a), /*#__PURE__*/ W.createElement(fe, Tr(o.angle, o.cx, o.cy, a), /*#__PURE__*/ W.createElement(pe, { label: o.label }), o.children)));
};
function Ar(e) {
	var t = Vt(e, Xe);
	return /*#__PURE__*/ W.createElement(W.Fragment, null, /*#__PURE__*/ W.createElement(Sr, {
		domain: t.domain,
		id: t.radiusAxisId,
		scale: t.scale,
		type: t.type,
		dataKey: t.dataKey,
		unit: void 0,
		name: t.name,
		allowDuplicatedCategory: t.allowDuplicatedCategory,
		allowDataOverflow: t.allowDataOverflow,
		reversed: t.reversed,
		includeHidden: t.includeHidden,
		allowDecimals: t.allowDecimals,
		niceTicks: t.niceTicks ?? "auto",
		ticks: t.ticks,
		tickCount: t.tickCount,
		tick: t.tick
	}), /*#__PURE__*/ W.createElement(kr, t));
}
Ar.displayName = "PolarRadiusAxis";
// node_modules/es-toolkit/dist/array/last.mjs
function jr(e) {
	return e[e.length - 1];
}
// node_modules/es-toolkit/dist/compat/array/last.mjs
function Mr(e) {
	if (xt(e) && e.length !== 0) return jr(cr(e));
}
// node_modules/recharts/es6/state/selectors/radarSelectors.js
function Nr(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Pr(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Nr(Object(n), !0).forEach(function(t) {
			Fr(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Nr(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Fr(e, t, n) {
	return (t = Ir(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Ir(e) {
	var t = Lr(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Lr(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var Rr = (e, t) => Rn(e, "radiusAxis", t), zr = I([Rr], (e) => {
	if (e != null) return { scale: e };
}), Br = I([qt, Rr], (e, t) => {
	if (e != null && t != null) return Pr(Pr({}, e), {}, { scale: t });
}), Vr = (e, t, n, r) => zn(e, "radiusAxis", t, r), Hr = (e, t, n) => Ht(e, n), Ur = (e, t, n) => Rn(e, "angleAxis", n), Wr = I([Hr, Ur], (e, t) => {
	if (e != null && t != null) return Pr(Pr({}, e), {}, { scale: t });
}), Gr = (e, t, n, r) => zn(e, "angleAxis", n, r), Kr = I([
	Hr,
	Ur,
	Kt,
	(e, t, n) => Ut(e, n)
], (e, t, n, r) => {
	if (n != null && t != null && r != null) return {
		scale: t,
		type: e.type,
		dataKey: e.dataKey,
		cx: n.cx,
		cy: n.cy,
		range: r
	};
}), qr = (e, t, n, r, i) => i, Jr = I([
	Gt,
	Br,
	Vr,
	Wr,
	Gr
], (e, t, n, r, i) => St(e, "radiusAxis") ? st(t, n, !1) : st(r, i, !1)), Yr = I([Un, qr], (e, t) => {
	if (e != null) return e.find((e) => e.type === "radar" && t === e.id)?.dataKey;
}), Xr = I([
	zr,
	Kr,
	Wt,
	Yr,
	Jr
], (e, t, n, r, i) => {
	var a = n.chartData, o = n.dataStartIndex, s = n.dataEndIndex;
	if (e != null && t != null && a != null && i != null && r != null) return ui({
		radiusAxis: e,
		angleAxis: t,
		displayedData: a.slice(o, s + 1),
		dataKey: r,
		bandSize: i
	});
}), Zr = [
	"id",
	"dotFill",
	"unthemedColors"
], Qr = [
	"shape",
	"isRange",
	"connectNulls",
	"dotFill",
	"fillObject"
];
function $r() {
	return $r = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, $r.apply(null, arguments);
}
function ei(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Y(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? ei(Object(n), !0).forEach(function(t) {
			ti(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : ei(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function ti(e, t, n) {
	return (t = ni(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function ni(e) {
	var t = ri(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function ri(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function ii(e, t) {
	if (e == null) return {};
	var n, r, i = ai(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function ai(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function oi(e, t) {
	return e && e !== "none" ? e : t;
}
var si = (e, t, n) => {
	var r = e.dataKey, i = e.name, a = e.stroke, o = e.fill, s = e.legendType, c = e.hide, l = e.dot;
	return [{
		inactive: c,
		dataKey: r,
		type: s,
		dot: ft(l, {
			fill: t ?? o,
			stroke: a
		}, !1),
		color: oi(a, o),
		fill: n,
		value: ht(i, r),
		payload: e
	}];
}, ci = /*#__PURE__*/ W.memo((e) => {
	var t = e.dataKey, n = e.stroke, r = e.strokeWidth, i = e.fill, a = e.name, o = e.hide, s = e.tooltipType, c = e.id, l = {
		dataDefinedOnItem: void 0,
		getPosition: jt,
		settings: {
			stroke: n,
			strokeWidth: r,
			fill: i,
			nameKey: void 0,
			dataKey: t,
			name: ht(a, t),
			hide: o,
			type: s,
			color: oi(n, i),
			unit: "",
			graphicalItemId: c,
			ignoreDataEntryColors: !0
		}
	};
	return /*#__PURE__*/ W.createElement(Te, { tooltipEntrySettings: l });
});
function li(e) {
	var t = e.points, n = e.props, r = n.dot, i = n.dataKey;
	n.id;
	var a = n.dotFill, o = n.unthemedColors, s = ii(n, Zr), c = B(s);
	return /*#__PURE__*/ W.createElement(w, {
		points: t,
		dot: r,
		className: "recharts-radar-dots",
		dotClassName: "recharts-radar-dot",
		dataKey: i,
		baseProps: Y(Y({}, c), {}, { fill: a ?? c.fill }),
		unthemedColors: o
	});
}
function ui(e) {
	var t = e.radiusAxis, n = e.angleAxis, r = e.displayedData, i = e.dataKey, a = e.bandSize, o = n.cx, s = n.cy, c = !1, l = [], u = n.range[0] > n.range[1], d = n.type !== "number" && u ? a ?? 0 : 0;
	r.forEach((e, r) => {
		var a = gt(e, n.dataKey, r), u = gt(e, i), f = (n.scale.map(a) ?? 0) + d, p = Array.isArray(u) ? Mr(u) : u, m = Ct(p) ? NaN : t.scale.map(p) ?? 0;
		Array.isArray(u) && u.length >= 2 && (c = !0), l.push(Y(Y({}, R(o, s, m, f)), {}, {
			name: a,
			value: u,
			cx: o,
			cy: s,
			radius: m,
			angle: f,
			payload: e
		}));
	});
	var f = [];
	return c && l.forEach((e) => {
		if (Array.isArray(e.value)) {
			var n = e.value[0], r = Ct(n) ? NaN : t.scale.map(n) ?? 0;
			f.push(Y(Y({}, e), {}, { radius: r }, R(o, s, r, e.angle)));
		} else f.push(e);
	}), {
		points: l,
		isRange: c,
		baseLinePoints: f
	};
}
function di(e) {
	var t = e.showLabels, n = e.points, r = e.children, i = n.map((e) => {
		var t = {
			x: e.x,
			y: e.y,
			width: 0,
			lowerWidth: 0,
			upperWidth: 0,
			height: 0
		};
		return Y(Y({}, t), {}, {
			value: e.value ?? "",
			payload: e.payload,
			parentViewBox: void 0,
			viewBox: t,
			fill: void 0
		});
	});
	return /*#__PURE__*/ W.createElement(u, { value: t ? i : void 0 }, r);
}
function fi(e) {
	var t = e.points, n = e.baseLinePoints, r = e.props;
	if (t == null) return null;
	var i = r.shape, a = r.isRange, o = r.connectNulls;
	r.dotFill;
	var s = r.fillObject, c = ii(r, Qr), l = s == null ? r.fill : dt(mt(r.id)), u = /*#__PURE__*/ W.isValidElement(i) ? /*#__PURE__*/ W.cloneElement(i, Y(Y({}, c), {}, {
		fill: l,
		points: t
	})) : typeof i == "function" ? i(Y(Y({}, c), {}, {
		fill: l,
		points: t
	})) : /*#__PURE__*/ W.createElement(Fn, $r({}, en(r), {
		fill: l,
		onMouseEnter: (e) => {
			var t = r.onMouseEnter;
			t && t(r, e);
		},
		onMouseLeave: (e) => {
			var t = r.onMouseLeave;
			t && t(r, e);
		},
		points: t,
		baseLinePoints: a ? n : void 0,
		connectNulls: o
	}));
	return /*#__PURE__*/ W.createElement(j, { className: "recharts-radar-polygon" }, u, /*#__PURE__*/ W.createElement(li, {
		props: r,
		points: t
	}));
}
var pi = (e, t) => e == null ? [] : t === 1 ? e.flatMap((e) => e.status === "removed" ? [] : [e.next]) : e.flatMap((e) => e.status === "removed" ? [] : e.status === "matched" ? [Y(Y({}, e.next), {}, {
	x: bt(e.prev.x, e.next.x, t),
	y: bt(e.prev.y, e.next.y, t)
})] : [Y(Y({}, e.next), {}, {
	x: bt(e.next.cx, e.next.x, t),
	y: bt(e.next.cy, e.next.y, t)
})]);
function mi(e) {
	var t = e.props, n = e.previousPointsRef, r = e.previousBaseLinePointsRef, i = t.points, o = t.baseLinePoints, s = t.isAnimationActive, c = t.animationBegin, l = t.animationDuration, u = t.animationEasing, d = t.animationMatchBy, f = t.animationInterpolateFn, p = t.onAnimationStart, m = t.onAnimationEnd, h = fn(t, r), g = h.startValue, _ = kt(g ?? null, o, d), v = dn(p, m), y = v.isAnimating, b = v.handleAnimationStart, x = v.handleAnimationEnd, S = Sn();
	return S == null ? null : /*#__PURE__*/ W.createElement(di, {
		showLabels: !y,
		points: i
	}, /*#__PURE__*/ W.createElement(a, {
		animationInput: t,
		animationIdPrefix: "recharts-radar-",
		items: i,
		previousItemsRef: n,
		isAnimationActive: s,
		animationBegin: c,
		animationDuration: l,
		animationEasing: u,
		onAnimationStart: b,
		onAnimationEnd: x,
		animationInterpolateFn: f,
		animationMatchBy: d,
		layout: S
	}, (e, n) => {
		var r = n === 1 ? o : f(_, n, S);
		return h.syncStepValue(r, n), /*#__PURE__*/ W.createElement(fi, {
			points: e,
			baseLinePoints: r,
			props: t
		});
	}), /*#__PURE__*/ W.createElement(ie, { label: t.label }), t.children);
}
function hi(e) {
	var t = (0, W.useRef)(void 0), n = (0, W.useRef)(void 0);
	return /*#__PURE__*/ W.createElement(mi, {
		props: e,
		previousPointsRef: t,
		previousBaseLinePointsRef: n
	});
}
var gi = {
	activeDot: !0,
	angleAxisId: 0,
	animationBegin: 0,
	animationDuration: 1500,
	animationEasing: "ease",
	animationMatchBy: At,
	animationInterpolateFn: pi,
	dot: !1,
	hide: !1,
	isAnimationActive: "auto",
	label: !1,
	legendType: "rect",
	radiusAxisId: 0,
	zIndex: S.area
};
function _i(e) {
	var t = e.hide, n = e.className, r = e.points;
	if (t) return null;
	var a = P("recharts-radar", n);
	return /*#__PURE__*/ W.createElement(Pe, { zIndex: e.zIndex }, /*#__PURE__*/ W.createElement(j, { className: a }, e.fillObject != null && /*#__PURE__*/ W.createElement("defs", null, /*#__PURE__*/ W.createElement(ee, {
		id: mt(e.id),
		fillObject: e.fillObject,
		color: e.fill
	})), /*#__PURE__*/ W.createElement(hi, e)), /*#__PURE__*/ W.createElement(i, {
		points: r,
		mainColor: oi(e.stroke, e.fill),
		itemDataKey: e.dataKey,
		activeDot: e.activeDot,
		themedActiveStyles: e.themedActiveStyles
	}));
}
function vi(e) {
	var t = bn(), n = U((n) => Xr(n, e.radiusAxisId, e.angleAxisId, t, e.id));
	return n?.points == null ? null : /*#__PURE__*/ W.createElement(_i, $r({}, e, {
		points: n?.points,
		baseLinePoints: n?.baseLinePoints,
		isRange: n?.isRange
	}));
}
function yi(e) {
	var t = Zt(e.fill), n = t.color, r = t.fillObject, i = Y(Y({}, e), {}, { fill: n }), a = wn(), o = gn({
		dataKey: i.dataKey,
		angleAxisId: i.angleAxisId ?? gi.angleAxisId,
		radiusAxisId: i.radiusAxisId ?? gi.radiusAxisId
	}), s = vn(o, i), c = yn(o, i), l = r ?? c, u = En(s), d = hn(s, i, void 0), f = d?.strokeDasharray, p = kn(i), m = On(s, i), h = Y(Y({}, i), {}, {
		dataKey: o,
		activeDot: i.activeDot,
		legendType: i.legendType ?? ut(i.dot),
		fill: i.fill ?? d?.fill,
		fillOpacity: i.fillOpacity ?? d?.fillOpacity,
		stroke: i.stroke ?? d?.stroke,
		strokeOpacity: i.strokeOpacity ?? d?.strokeOpacity,
		strokeWidth: i.strokeWidth ?? d?.strokeWidth,
		strokeDasharray: i.strokeDasharray ?? (Array.isArray(f) ? f.join(",") : f)
	}), g = Vt(h, gi), _ = i.fill ?? (a == null ? g.fill : oi(g.stroke, d?.fill)), v = Tn(oi(g.stroke, g.fill));
	return /*#__PURE__*/ W.createElement(he, {
		id: g.id,
		type: "radar"
	}, (e) => /*#__PURE__*/ W.createElement(W.Fragment, null, /*#__PURE__*/ W.createElement(Ce, {
		type: "radar",
		id: e,
		data: void 0,
		dataKey: g.dataKey,
		hide: g.hide,
		angleAxisId: g.angleAxisId,
		radiusAxisId: g.radiusAxisId
	}), /*#__PURE__*/ W.createElement(we, { legendPayload: si(g, _, l) }), /*#__PURE__*/ W.createElement(ci, {
		dataKey: g.dataKey,
		stroke: g.stroke,
		strokeWidth: g.strokeWidth,
		fill: g.fill,
		name: g.name,
		hide: g.hide,
		tooltipType: g.tooltipType,
		id: e
	}), /*#__PURE__*/ W.createElement(x, { value: u }, /*#__PURE__*/ W.createElement(b, { value: v }, /*#__PURE__*/ W.createElement(vi, $r({}, g, {
		id: e,
		dotFill: _,
		fillObject: l,
		unthemedColors: p,
		themedActiveStyles: m
	}))))));
}
yi.displayName = "Radar";
// node_modules/recharts/es6/chart/RadarChart.js
function bi(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function xi(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? bi(Object(n), !0).forEach(function(t) {
			Si(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : bi(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Si(e, t, n) {
	return (t = Ci(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Ci(e) {
	var t = wi(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function wi(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var Ti = ["axis"], Ei = xi(xi({}, Hn), {}, {
	layout: "centric",
	startAngle: 90,
	endAngle: -270
}), Di = /*#__PURE__*/ (0, W.forwardRef)((e, t) => {
	var n = Vt(e, Ei);
	return /*#__PURE__*/ W.createElement(Vn, {
		chartName: "RadarChart",
		defaultTooltipEventType: "axis",
		validateTooltipEventTypes: Ti,
		tooltipPayloadSearcher: Ve,
		categoricalChartProps: n,
		ref: t
	});
}), X = zt(), Oi = W.memo(function({ cx: e, cy: t, dataKey: n, chartId: r, className: i, fillOpacity: a = 1, type: o = "default", maskId: s }) {
	let c = W.useId().replace(/:/g, ""), l = `url(#${r}-colors-${String(n)})`;
	if (e === void 0 || t === void 0) return null;
	switch (o) {
		case "border": return /* @__PURE__ */ (0, X.jsx)(Ai, {
			cx: e,
			cy: t,
			dotId: c,
			fillOpacity: a,
			gradientUrl: l,
			className: i,
			maskId: s
		});
		case "colored-border": return /* @__PURE__ */ (0, X.jsx)(ji, {
			cx: e,
			cy: t,
			dotId: c,
			fillOpacity: a,
			gradientUrl: l,
			className: i,
			maskId: s
		});
		default: return /* @__PURE__ */ (0, X.jsx)(ki, {
			cx: e,
			cy: t,
			dotId: c,
			fillOpacity: a,
			gradientUrl: l,
			className: i,
			maskId: s
		});
	}
}), ki = W.memo(({ cx: e, cy: t, dotId: n, fillOpacity: r, gradientUrl: i, className: a, maskId: o }) => /* @__PURE__ */ (0, X.jsxs)("g", {
	className: a,
	mask: o ? `url(#${o})` : void 0,
	children: [/* @__PURE__ */ (0, X.jsx)("defs", { children: /* @__PURE__ */ (0, X.jsx)("clipPath", {
		id: `dot-clip-${n}`,
		children: /* @__PURE__ */ (0, X.jsx)("circle", {
			cx: e,
			cy: t,
			r: 3
		})
	}) }), /* @__PURE__ */ (0, X.jsx)("rect", {
		x: "0",
		y: t - 3,
		width: "100%",
		height: 6,
		fill: i,
		fillOpacity: r,
		clipPath: `url(#dot-clip-${n})`
	})]
}));
ki.displayName = "DefaultDot";
var Ai = W.memo(({ cx: e, cy: t, dotId: n, fillOpacity: r, gradientUrl: i, className: a, maskId: o }) => /* @__PURE__ */ (0, X.jsxs)("g", {
	className: Ke(a, "text-background"),
	mask: o ? `url(#${o})` : void 0,
	children: [
		/* @__PURE__ */ (0, X.jsx)("defs", { children: /* @__PURE__ */ (0, X.jsx)("clipPath", {
			id: `dot-clip-${n}`,
			children: /* @__PURE__ */ (0, X.jsx)("circle", {
				cx: e,
				cy: t,
				r: 6
			})
		}) }),
		/* @__PURE__ */ (0, X.jsx)("circle", {
			cx: e,
			cy: t,
			r: 6,
			fill: "currentColor"
		}),
		/* @__PURE__ */ (0, X.jsx)("rect", {
			x: "0",
			y: t - 3.5,
			width: "100%",
			height: 7,
			fill: i,
			fillOpacity: r,
			clipPath: `url(#dot-clip-inner-${n})`
		}),
		/* @__PURE__ */ (0, X.jsx)("defs", { children: /* @__PURE__ */ (0, X.jsx)("clipPath", {
			id: `dot-clip-inner-${n}`,
			children: /* @__PURE__ */ (0, X.jsx)("circle", {
				cx: e,
				cy: t,
				r: 3.5
			})
		}) })
	]
}));
Ai.displayName = "PrimaryBorderDot";
var ji = W.memo(({ cx: e, cy: t, dotId: n, fillOpacity: r, gradientUrl: i, className: a, maskId: o }) => /* @__PURE__ */ (0, X.jsxs)("g", {
	className: Ke(a, "text-background"),
	mask: o ? `url(#${o})` : void 0,
	children: [
		/* @__PURE__ */ (0, X.jsx)("defs", { children: /* @__PURE__ */ (0, X.jsx)("clipPath", {
			id: `dot-clip-${n}`,
			children: /* @__PURE__ */ (0, X.jsx)("circle", {
				cx: e,
				cy: t,
				r: 3.5
			})
		}) }),
		/* @__PURE__ */ (0, X.jsx)("rect", {
			x: "0",
			y: t - 3 - .5,
			width: "100%",
			height: 7,
			fill: i,
			fillOpacity: r,
			clipPath: `url(#dot-clip-${n})`
		}),
		/* @__PURE__ */ (0, X.jsx)("circle", {
			cx: e,
			cy: t,
			r: 2.5,
			fill: "currentColor"
		})
	]
}));
ji.displayName = "ColoredBorderDot";
// src/react/evilcharts/registry/charts/recharts-radar-chart.tsx
var Mi = 1, Ni = .3, Pi = 6, Fi = 1500, Ii = "value", Li = (0, W.createContext)(null);
function Z() {
	let e = (0, W.use)(Li);
	if (!e) throw Error("Radar chart parts (<Radar />, <PolarAngleAxis />, …) must be used within <EvilRadarChart />");
	return e;
}
function Q({ config: e, data: t, children: n, className: r, chartProps: i, backgroundVariant: a, defaultSelectedDataKey: o = null, onSelectionChange: s, isLoading: c = !1, loadingPoints: l }) {
	let u = (0, W.useId)().replace(/:/g, ""), [d, m] = (0, W.useState)(o), h = qi(c, l), g = (0, W.useCallback)((e) => {
		m(e), s?.(e);
	}, [s]), _ = (0, W.useMemo)(() => ({
		config: e,
		isLoading: c,
		selectedDataKey: d,
		selectDataKey: g
	}), [
		e,
		c,
		d,
		g
	]);
	return /* @__PURE__ */ (0, X.jsx)(Li, {
		value: _,
		children: /* @__PURE__ */ (0, X.jsxs)(p, {
			className: r,
			config: e,
			children: [/* @__PURE__ */ (0, X.jsx)(ae, { isLoading: c }), /* @__PURE__ */ (0, X.jsxs)(Di, {
				id: u,
				data: c ? h : t,
				...i,
				children: [
					a && /* @__PURE__ */ (0, X.jsx)(f, { variant: a }),
					n,
					c && /* @__PURE__ */ (0, X.jsx)(Ji, {})
				]
			})]
		})
	});
}
var Ri = () => null, zi = () => null, Bi = (e, t, n, r) => {
	let i = !1, a = !1;
	return W.Children.forEach(e, (e) => {
		if ((0, W.isValidElement)(e)) {
			if (e.type === Ri) {
				let { variant: a } = e.props;
				i = /* @__PURE__ */ (0, X.jsx)(Oi, {
					type: a,
					dataKey: n,
					chartId: t,
					fillOpacity: r
				});
			}
			if (e.type === zi) {
				let { variant: i } = e.props;
				a = /* @__PURE__ */ (0, X.jsx)(Oi, {
					type: i,
					dataKey: n,
					chartId: t,
					fillOpacity: r
				});
			}
		}
	}), {
		dot: i,
		activeDot: a
	};
}, Vi = ({ dataKey: e, colorsCount: t, opacities: n }) => t === 1 ? /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [/* @__PURE__ */ (0, X.jsx)("stop", {
	offset: "0%",
	stopColor: `var(--color-${e}-0)`,
	stopOpacity: n?.[0]
}), /* @__PURE__ */ (0, X.jsx)("stop", {
	offset: "100%",
	stopColor: `var(--color-${e}-0)`,
	stopOpacity: n?.[n.length - 1]
})] }) : /* @__PURE__ */ (0, X.jsx)(X.Fragment, { children: Array.from({ length: t }, (r, i) => {
	let a = `${i / (t - 1) * 100}%`;
	return /* @__PURE__ */ (0, X.jsx)("stop", {
		offset: a,
		stopColor: `var(--color-${e}-${i}, var(--color-${e}-0))`,
		stopOpacity: n?.[i]
	}, a);
}) }), Hi = ({ id: e, dataKey: t, config: n }) => {
	let r = lt(n[t] ?? {});
	return /* @__PURE__ */ (0, X.jsx)("linearGradient", {
		id: `${e}-colors-${t}`,
		x1: "0",
		y1: "0",
		x2: "1",
		y2: "0",
		children: /* @__PURE__ */ (0, X.jsx)(Vi, {
			dataKey: t,
			colorsCount: r
		})
	});
}, Ui = ({ id: e, dataKey: t, config: n }) => {
	let r = lt(n[t] ?? {});
	return /* @__PURE__ */ (0, X.jsx)("linearGradient", {
		id: `${e}-radar-stroke-${t}`,
		x1: "0",
		y1: "0",
		x2: "1",
		y2: "1",
		children: /* @__PURE__ */ (0, X.jsx)(Vi, {
			dataKey: t,
			colorsCount: r
		})
	});
}, Wi = ({ id: e, dataKey: t, config: n }) => {
	let r = lt(n[t] ?? {}), i = r === 1 ? [.8, .3] : Array.from({ length: r }, (e, t) => t === 0 ? .8 : .3);
	return /* @__PURE__ */ (0, X.jsx)("radialGradient", {
		id: `${e}-radar-fill-${t}`,
		cx: "50%",
		cy: "50%",
		r: "50%",
		children: /* @__PURE__ */ (0, X.jsx)(Vi, {
			dataKey: t,
			colorsCount: r,
			opacities: i
		})
	});
}, Gi = ({ id: e, dataKey: t }) => /* @__PURE__ */ (0, X.jsxs)("filter", {
	id: `${e}-radar-glow-${t}`,
	x: "-50%",
	y: "-50%",
	width: "200%",
	height: "200%",
	children: [
		/* @__PURE__ */ (0, X.jsx)("feGaussianBlur", {
			in: "SourceGraphic",
			stdDeviation: "4",
			result: "blur"
		}),
		/* @__PURE__ */ (0, X.jsx)("feColorMatrix", {
			in: "blur",
			type: "matrix",
			values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.6 0",
			result: "glow"
		}),
		/* @__PURE__ */ (0, X.jsxs)("feMerge", { children: [/* @__PURE__ */ (0, X.jsx)("feMergeNode", { in: "glow" }), /* @__PURE__ */ (0, X.jsx)("feMergeNode", { in: "SourceGraphic" })] })
	]
}), Ki = (e) => [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F"
].slice(0, e).map((e) => ({
	skill: e,
	[Ii]: 30 + Math.random() * 70
}));
function qi(e, t = Pi) {
	let [n, r] = (0, W.useState)(0);
	return (0, W.useEffect)(() => {
		if (!e) return;
		let t = setInterval(() => {
			r((e) => e + 1);
		}, Fi);
		return () => clearInterval(t);
	}, [e]), (0, W.useMemo)(() => Ki(t), [t, n]);
}
var Ji = () => /* @__PURE__ */ (0, X.jsx)(yi, {
	dataKey: Ii,
	stroke: "currentColor",
	strokeOpacity: .3,
	strokeWidth: 2,
	fill: "currentColor",
	fillOpacity: .1,
	dot: !1,
	isAnimationActive: !0,
	animationDuration: Fi,
	animationEasing: "ease-in-out"
});
Q.Radar = function({ dataKey: e, variant: t = "filled", fillOpacity: n = Ni, isGlowing: r = !1, isClickable: i = !1, children: a, radarProps: o }) {
	let { config: s, isLoading: c, selectedDataKey: l, selectDataKey: u } = Z(), d = (0, W.useId)().replace(/:/g, "");
	if (c) return null;
	let f = i && l !== null && l !== e, p = {
		stroke: f ? .2 : 1,
		fill: f ? .1 : 1,
		dot: f ? .2 : 1
	}, m = t === "filled", { dot: h, activeDot: g } = Bi(a, d, e, p.dot);
	return /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [/* @__PURE__ */ (0, X.jsx)(yi, {
		dataKey: e,
		stroke: `url(#${d}-radar-stroke-${e})`,
		strokeOpacity: p.stroke,
		strokeWidth: Mi,
		fill: m ? `url(#${d}-radar-fill-${e})` : "none",
		fillOpacity: m ? n * p.fill : 0,
		dot: h,
		activeDot: g,
		filter: r ? `url(#${d}-radar-glow-${e})` : void 0,
		className: "transition-opacity duration-200",
		style: i ? { cursor: "pointer" } : void 0,
		onClick: () => {
			i && u(l === e ? null : e);
		},
		...o
	}), /* @__PURE__ */ (0, X.jsxs)("defs", { children: [
		/* @__PURE__ */ (0, X.jsx)(Hi, {
			id: d,
			dataKey: e,
			config: s
		}),
		/* @__PURE__ */ (0, X.jsx)(Ui, {
			id: d,
			dataKey: e,
			config: s
		}),
		m && /* @__PURE__ */ (0, X.jsx)(Wi, {
			id: d,
			dataKey: e,
			config: s
		}),
		r && /* @__PURE__ */ (0, X.jsx)(Gi, {
			id: d,
			dataKey: e
		})
	] })] });
}, Q.Dot = Ri, Q.ActiveDot = zi, Q.PolarGrid = function({ gridType: e = "polygon", stroke: t = "currentColor", strokeOpacity: n = .2, strokeDasharray: r = "3 4", ...i }) {
	return /* @__PURE__ */ (0, X.jsx)(sr, {
		gridType: e,
		stroke: t,
		strokeOpacity: n,
		strokeDasharray: r,
		...i
	});
}, Q.PolarAngleAxis = function({ tick: e = {
	fill: "currentColor",
	fontSize: 12
}, tickLine: t = !1, ...n }) {
	let { isLoading: r } = Z();
	return r ? null : /* @__PURE__ */ (0, X.jsx)(Pn, {
		tick: e,
		tickLine: t,
		...n
	});
}, Q.PolarRadiusAxis = function({ tick: e = {
	fill: "currentColor",
	fontSize: 10
}, tickLine: t = !1, axisLine: n = !1, ...r }) {
	let { isLoading: i } = Z();
	return i ? null : /* @__PURE__ */ (0, X.jsx)(Ar, {
		tick: e,
		tickLine: t,
		axisLine: n,
		...r
	});
}, Q.Tooltip = function({ variant: e, roundness: t, defaultIndex: n }) {
	let { isLoading: r, selectedDataKey: i } = Z();
	return r ? null : /* @__PURE__ */ (0, X.jsx)(v, {
		defaultIndex: n,
		cursor: !1,
		content: /* @__PURE__ */ (0, X.jsx)(y, {
			selected: i,
			roundness: t,
			variant: e
		})
	});
}, Q.Legend = function({ variant: e, align: t = "center", verticalAlign: n = "bottom", isClickable: r = !1 }) {
	let { isLoading: i, selectedDataKey: a, selectDataKey: o } = Z();
	return i ? null : /* @__PURE__ */ (0, X.jsx)(h, {
		verticalAlign: n,
		align: t,
		content: /* @__PURE__ */ (0, X.jsx)(g, {
			selected: a,
			onSelectChange: o,
			isClickable: r,
			variant: e
		})
	});
};
// src/react/taste/charts.tsx
function Yi(e) {
	let { x: t = 0, cx: n, textAnchor: r, payload: i, ...a } = e, o = String(i?.value ?? ""), s = typeof n == "number" ? n * 2 : 0, c = s ? r === "start" ? s - t : r === "end" ? t : 2 * Math.min(t, s - t) : 56;
	return /* @__PURE__ */ (0, X.jsxs)("g", { children: [/* @__PURE__ */ (0, X.jsx)("title", { children: o }), /* @__PURE__ */ (0, X.jsx)(je, {
		...a,
		x: t,
		textAnchor: r,
		fill: "currentColor",
		fontSize: 12,
		children: tt(o, c - 4)
	})] });
}
var Xi = [
	"stroke-chart-1",
	"stroke-chart-2",
	"stroke-chart-3",
	"stroke-chart-4",
	"stroke-chart-5",
	"stroke-chart-6"
], Zi = [
	"fill-chart-1",
	"fill-chart-2",
	"fill-chart-3",
	"fill-chart-4",
	"fill-chart-5",
	"fill-chart-6"
], Qi = { value: {
	label: V("manage:tasteCharts.tagOccurrences"),
	colors: cn(l[3])
} }, $i = [
	"min-h-24",
	"min-h-24",
	"min-h-24",
	"min-h-32",
	"min-h-40",
	"min-h-48",
	"min-h-52",
	"min-h-60",
	"min-h-64"
], ea = 26, ta = { radius: Qi.value }, na = (e, t) => Math.sqrt(e / t);
function ra({ rows: e, label: t }) {
	let n = Pt(e);
	if (!n.length) return null;
	let r = n[0].value, i = n.map((e) => ({
		...e,
		radius: na(e.value, r)
	}));
	return /* @__PURE__ */ (0, X.jsx)("div", {
		role: "img",
		"aria-label": V("manage:tasteCharts.radarSummary", {
			label: t,
			items: Et(i.map((e) => e.name))
		}),
		children: /* @__PURE__ */ (0, X.jsxs)(Q, {
			data: i,
			config: ta,
			chartProps: { outerRadius: "58%" },
			className: "aspect-auto h-70 text-text-secondary",
			children: [
				/* @__PURE__ */ (0, X.jsx)(Q.PolarGrid, {}),
				/* @__PURE__ */ (0, X.jsx)(Q.PolarAngleAxis, {
					dataKey: "name",
					tick: /* @__PURE__ */ (0, X.jsx)(Yi, {})
				}),
				/* @__PURE__ */ (0, X.jsx)(Q.PolarRadiusAxis, {
					domain: [0, 1],
					allowDecimals: !0,
					tick: !1
				}),
				/* @__PURE__ */ (0, X.jsx)(Q.Radar, { dataKey: "radius" }),
				/* @__PURE__ */ (0, X.jsx)(_, { valueKey: "value" })
			]
		})
	});
}
function ia({ rows: e, label: t }) {
	let n = ln(e, 8);
	return n.length ? /* @__PURE__ */ (0, X.jsx)("section", {
		"aria-label": t,
		className: `flex grow flex-col ${$i[n.length]}`,
		children: /* @__PURE__ */ (0, X.jsxs)(D, {
			data: n,
			config: Qi,
			layout: "horizontal",
			barRadius: 4,
			chartProps: {
				maxBarSize: ea,
				margin: {
					top: 5,
					right: 56,
					bottom: 5,
					left: 5
				}
			},
			className: "aspect-auto text-text-secondary",
			children: [
				/* @__PURE__ */ (0, X.jsx)(D.YAxis, {
					dataKey: "name",
					interval: 0,
					tick: /* @__PURE__ */ (0, X.jsx)(d, { along: "y" }),
					width: Ge(n.map((e) => e.name))
				}),
				/* @__PURE__ */ (0, X.jsx)(D.XAxis, {
					hide: !0,
					domain: Mn
				}),
				/* @__PURE__ */ (0, X.jsx)(D.Bar, {
					dataKey: "value",
					enableHoverHighlight: !0,
					barProps: {
						dataKey: "value",
						label: In("right")
					}
				}),
				/* @__PURE__ */ (0, X.jsx)(_, {})
			]
		})
	}) : null;
}
function aa({ flows: e }) {
	let [t, n] = (0, W.useState)(null), r = nt(e);
	if (!r) return null;
	let i = t?.node ?? null, a = (e, n) => t ? i === null ? t.label === n : e.source === i || e.target === i : !0;
	return /* @__PURE__ */ (0, X.jsxs)("section", {
		className: c,
		children: [
			/* @__PURE__ */ (0, X.jsx)(m, {
				title: V("manage:tasteCharts.creatorLeadSources"),
				figure: (t ? t.value : r.total).toLocaleString(),
				note: t ? t.label : V("manage:tasteCharts.leadsUnit", { count: r.total })
			}),
			/* @__PURE__ */ (0, X.jsx)("ol", {
				"aria-label": V("manage:tasteCharts.sitesAndCreatorLeads"),
				className: "flex flex-col sm:hidden",
				children: [...r.links].sort((e, t) => t.value - e.value).map((e) => /* @__PURE__ */ (0, X.jsxs)("li", {
					className: "flex items-baseline justify-between gap-3 border-b border-separator-border py-2 text-body-2-regular text-text-primary last:border-b-0",
					children: [/* @__PURE__ */ (0, X.jsx)("span", {
						className: "min-w-0 wrap-anywhere",
						children: e.label
					}), /* @__PURE__ */ (0, X.jsx)("b", {
						className: "shrink-0 tabular-nums",
						children: e.value.toLocaleString()
					})]
				}, e.key))
			}),
			/* @__PURE__ */ (0, X.jsx)("div", {
				className: "min-w-0 max-sm:hidden",
				children: /* @__PURE__ */ (0, X.jsxs)("svg", {
					viewBox: `0 0 ${k.width} ${r.height}`,
					fill: "none",
					role: "img",
					"aria-label": V("manage:tasteCharts.sitesAndCreatorLeads"),
					className: "block h-auto w-full",
					onPointerLeave: () => n(null),
					children: [/* @__PURE__ */ (0, X.jsx)("g", { children: r.links.map((e) => /* @__PURE__ */ (0, X.jsx)("path", {
						d: e.d,
						strokeWidth: e.width,
						tabIndex: 0,
						role: "img",
						"aria-label": V("manage:tasteCharts.leadCount", {
							name: e.label,
							count: e.value
						}),
						fillOpacity: 0,
						strokeOpacity: a(e, e.label) ? .55 : .08,
						className: `outline-none transition-opacity ${Xi[e.color]}`,
						onPointerEnter: () => n({
							value: e.value,
							label: e.label,
							node: null
						}),
						onFocus: () => n({
							value: e.value,
							label: e.label,
							node: null
						}),
						onBlur: () => n(null)
					}, e.key)) }), /* @__PURE__ */ (0, X.jsx)("g", { children: r.nodes.map((e) => /* @__PURE__ */ (0, X.jsxs)("g", {
						tabIndex: 0,
						role: "img",
						"aria-label": V("manage:tasteCharts.leadCount", {
							name: e.name,
							count: e.value
						}),
						className: "outline-none focus-visible:opacity-100",
						onPointerEnter: () => n({
							value: e.value,
							label: e.name,
							node: e.index
						}),
						onFocus: () => n({
							value: e.value,
							label: e.name,
							node: e.index
						}),
						onBlur: () => n(null),
						children: [/* @__PURE__ */ (0, X.jsx)("rect", {
							x: e.x,
							y: e.y,
							width: 10,
							height: e.height,
							rx: 5,
							className: e.side === "source" ? Zi[e.color] : "fill-text-secondary"
						}), /* @__PURE__ */ (0, X.jsxs)("text", {
							x: O[e.side],
							y: e.y + e.height / 2,
							textAnchor: e.side === "source" ? "end" : "start",
							dominantBaseline: "middle",
							className: "fill-text-secondary text-caption-1-regular",
							children: [rt(e.name), /* @__PURE__ */ (0, X.jsx)("tspan", {
								x: O[e.side],
								dy: 15,
								children: e.side === "source" ? e.value.toLocaleString() : `${e.share.toFixed(1)}%`
							})]
						})]
					}, e.id)) })]
				})
			}),
			/* @__PURE__ */ (0, X.jsxs)("footer", {
				className: "flex justify-between gap-3 text-caption-1-regular text-text-secondary max-sm:hidden",
				children: [/* @__PURE__ */ (0, X.jsx)("span", { children: V("manage:tasteCharts.sourceSites") }), /* @__PURE__ */ (0, X.jsx)("span", { children: V("manage:tasteCharts.creatorsLeadShare") })]
			})
		]
	});
}
// src/react/taste/browser-sources.tsx
var oa = "flex min-w-0 items-center gap-3 rounded-xl bg-background-primary-default p-3";
function sa({ browsers: e, sources: t, range: n, children: r }) {
	let [i, a] = (0, W.useState)(!1), [s, c] = (0, W.useState)(""), [l, u] = (0, W.useState)(""), d = xn({
		mutationFn: (e) => qe(e, n),
		onSuccess: (e) => {
			z.setQueryData(H(n), e.dashboard), a(!1), c(""), u("");
		}
	});
	return /* @__PURE__ */ (0, X.jsxs)("section", {
		className: `${We()} flex flex-col gap-4`,
		"aria-label": V("manage:tasteSources.dataSources"),
		children: [
			/* @__PURE__ */ (0, X.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, X.jsx)("h3", {
					className: "text-title-2-medium text-text-primary",
					children: V("manage:tasteSources.dataSources")
				}), /* @__PURE__ */ (0, X.jsx)(o, {
					variant: "secondary",
					onClick: () => a(!0),
					disabled: i,
					children: V("manage:tasteSources.addBrowser")
				})]
			}),
			d.error ? /* @__PURE__ */ (0, X.jsx)(M, {
				tone: "error",
				children: L(d.error)
			}) : null,
			i ? /* @__PURE__ */ (0, X.jsxs)("form", {
				className: "flex flex-col gap-3",
				onSubmit: (e) => {
					e.preventDefault(), d.isPending || d.mutate({
						operation: "add",
						name: s,
						path: l
					});
				},
				children: [
					/* @__PURE__ */ (0, X.jsx)(ne, {
						label: V("manage:tasteSources.browserName"),
						value: s,
						onChange: c,
						maxLength: 80,
						isRequired: !0,
						isDisabled: d.isPending
					}),
					/* @__PURE__ */ (0, X.jsx)(ne, {
						label: V("manage:tasteSources.profilePath"),
						value: l,
						onChange: u,
						maxLength: 1024,
						isRequired: !0,
						isDisabled: d.isPending,
						hint: V("manage:tasteSources.profilePathHint")
					}),
					/* @__PURE__ */ (0, X.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, X.jsx)(o, {
							variant: "ghost",
							disabled: d.isPending,
							onClick: () => {
								a(!1), d.reset();
							},
							children: V("manage:shared.cancel")
						}), /* @__PURE__ */ (0, X.jsx)(o, {
							type: "submit",
							variant: "secondary",
							disabled: !s.trim() || !l.trim(),
							...N(d.isPending),
							children: V("manage:shared.add")
						})]
					})
				]
			}) : null,
			/* @__PURE__ */ (0, X.jsxs)("div", {
				className: "inline-grid w-full min-w-0 gap-2 sm:grid-cols-2",
				children: [r, e.map((e) => {
					let n = t.filter((t) => e.source_keys?.includes(t.source_key)), r = n.reduce((e, t) => e + (t.visits || 0), 0), i = n.reduce((e, t) => e + (t.bookmarks || 0), 0);
					return /* @__PURE__ */ (0, X.jsxs)("div", {
						"data-taste-source": "browser",
						className: oa,
						children: [
							/* @__PURE__ */ (0, X.jsx)("span", {
								className: "inline-grid size-8 shrink-0 place-items-center rounded-lg text-text-secondary",
								children: /* @__PURE__ */ (0, X.jsx)(Wn, { name: e.name })
							}),
							/* @__PURE__ */ (0, X.jsxs)("div", {
								className: "flex min-w-0 grow flex-col gap-0.5",
								children: [
									/* @__PURE__ */ (0, X.jsx)("b", {
										className: "text-body-2-medium break-words text-text-primary",
										children: e.name
									}),
									/* @__PURE__ */ (0, X.jsx)("span", {
										className: "break-all text-caption-1-regular text-text-secondary",
										children: e.path
									}),
									/* @__PURE__ */ (0, X.jsx)("span", {
										className: "text-caption-1-regular text-text-secondary",
										children: e.enabled ? e.available ? V("manage:tasteSources.profileCount", { count: e.profiles }) : V("manage:tasteSources.profileUnavailable") : V("manage:tasteSources.readingStopped")
									}),
									n.length ? /* @__PURE__ */ (0, X.jsxs)("span", {
										className: "text-caption-1-regular text-text-secondary",
										children: [
											V("manage:tasteSources.historyCount", { count: r }),
											" · ",
											V("manage:tasteSources.bookmarkCount", { count: i })
										]
									}) : null
								]
							}),
							/* @__PURE__ */ (0, X.jsxs)("span", {
								className: "flex shrink-0 gap-1",
								children: [/* @__PURE__ */ (0, X.jsx)(o, {
									variant: "secondary",
									size: "small",
									...N(d.isPending),
									iconOnly: !0,
									leadingIcon: e.enabled ? de : A,
									"aria-label": `${e.enabled ? V("manage:tasteSources.stopReading") : V("manage:customSources.enable")} ${e.name}`,
									onClick: () => {
										e.enabled ? Je({
											title: V("manage:tasteSources.stopReadingTitle", { browser: e.name }),
											body: V("manage:tasteSources.stopReadingBody"),
											confirmLabel: V("manage:tasteSources.stopReading"),
											onConfirm: () => d.mutateAsync({
												operation: "disable",
												id: e.id
											})
										}) : d.mutate({
											operation: "enable",
											id: e.id
										});
									}
								}), /* @__PURE__ */ (0, X.jsx)(o, {
									variant: "secondary",
									size: "small",
									iconOnly: !0,
									leadingIcon: oe,
									...N(d.isPending),
									"aria-label": V("manage:tasteSources.deleteBrowserTitle", { browser: e.name }),
									onClick: () => {
										Je({
											title: V("manage:tasteSources.deleteBrowserTitle", { browser: e.name }),
											body: V("manage:tasteSources.deleteBrowserBody"),
											confirmLabel: V("manage:tasteSources.deleteBrowser"),
											danger: !0,
											holdToConfirm: !0,
											onConfirm: () => d.mutateAsync({
												operation: "delete_browser",
												id: e.id
											})
										});
									}
								})]
							})
						]
					}, e.id);
				})]
			})
		]
	});
}
// src/react/taste/taste-page.tsx
var ca = 10, la = Ye(se, ce, "text-body-2-medium"), ua = `${We()} flex flex-col gap-4`, da = "rounded-xl bg-background-primary-default p-3", fa = V("manage:taste.readHistoryTooltip"), pa = V("manage:taste.noSourceHint"), ma = V("manage:taste.noLeadHint"), ha = V("manage:taste.noCategoryHint"), ga = V("manage:taste.gapHint"), _a = V("manage:taste.noBrowserTagHint"), va = V("manage:taste.noBrowserCreatorHint"), ya = V("manage:taste.noDomainHint"), ba = V("manage:taste.noPeachTagHint"), xa = V("manage:taste.noPeachCreatorHint"), Sa = V("manage:taste.noPeachActressHint"), Ca = V("manage:taste.guideLocal"), wa = V("manage:taste.guideRemote"), Ta = V("manage:taste.guideRefresh"), Ea = V("manage:taste.removeSourceBody"), Da = "peach-taste-guide-dismissed", Oa = "\0", ka = (e, t) => {
	let [n = "", r = ""] = e.split(Oa);
	return /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [
		n,
		t,
		r
	] });
}, Aa = (0, W.createContext)(/* @__PURE__ */ (0, X.jsx)(s, {
	size: "small",
	href: "/",
	children: V("manage:shared.browseCollection")
}));
function ja() {
	return (0, W.useContext)(Aa);
}
function $({ icon: e, term: t, figure: n, detail: r, detailTitle: i, accent: a }) {
	return /* @__PURE__ */ (0, X.jsx)("div", {
		className: $t(),
		children: /* @__PURE__ */ (0, X.jsx)(Ee, {
			label: t,
			icon: e,
			accent: a,
			figure: n,
			footer: /* @__PURE__ */ (0, X.jsx)("span", {
				className: "block min-w-0 truncate",
				title: i || r,
				children: r ?? ""
			})
		})
	});
}
function Ma({ name: e, domain: t }) {
	return /* @__PURE__ */ (0, X.jsxs)("span", {
		className: "relative inline-grid size-8 shrink-0 place-items-center overflow-hidden rounded-lg bg-background-tertiary-default text-caption-1-medium text-text-secondary",
		children: [et(e).toUpperCase(), /* @__PURE__ */ (0, X.jsx)(te, {
			src: Xt({ domain: t }),
			alt: "",
			loading: "lazy",
			width: 20,
			height: 20,
			className: "absolute size-5 object-contain"
		})]
	});
}
function Na({ html: e }) {
	return /* @__PURE__ */ (0, X.jsx)("span", {
		className: `relative inline-grid size-8 shrink-0 place-items-center overflow-hidden rounded-full bg-media-placeholder text-caption-1-medium text-text-secondary ${re}`,
		dangerouslySetInnerHTML: { __html: e }
	});
}
function Pa({ rows: e, kind: t, visual: n, empty: r, onSignal: i }) {
	if (!e.length) return /* @__PURE__ */ (0, X.jsx)(E, {
		size: "compact",
		icon: Mt,
		title: V("manage:taste.notEnoughData"),
		actions: /* @__PURE__ */ (0, X.jsx)(ja, {}),
		children: r
	});
	let a = It(e);
	return /* @__PURE__ */ (0, X.jsx)(Nn, {
		previewCount: ca,
		className: "inline-grid w-full gap-x-7 gap-y-2 sm:grid-cols-2",
		children: e.map((e, r) => {
			let o = !!t && !!e.peach_items, s = String(e.source_domain || ""), c = /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [
				/* @__PURE__ */ (0, X.jsx)("svg", {
					viewBox: "0 0 100 1",
					preserveAspectRatio: "none",
					"aria-hidden": !0,
					className: "absolute inset-0 -z-10 size-full overflow-hidden rounded-lg opacity-15",
					children: /* @__PURE__ */ (0, X.jsx)("rect", {
						width: a[r],
						height: 1,
						className: "fill-chart-4"
					})
				}),
				/* @__PURE__ */ (0, X.jsx)("span", {
					className: "w-6 shrink-0 text-caption-1-regular tabular-nums text-text-secondary",
					children: r + 1
				}),
				n === "domain" ? /* @__PURE__ */ (0, X.jsx)(Ma, {
					name: e.name,
					domain: e.name
				}) : null,
				n === "creator" && !e.entity_id && !e.has_avatar && s ? /* @__PURE__ */ (0, X.jsx)(Ma, {
					name: e.name,
					domain: s
				}) : null,
				n !== "none" && n !== "domain" && (e.entity_id || e.has_avatar || !s) ? /* @__PURE__ */ (0, X.jsx)(Na, { html: He(e.name, e.entity_id ? {
					id: e.entity_id,
					has_image: !!e.has_image,
					image_version: e.image_version,
					avatar_focus: e.avatar_focus,
					avatar_stand_in: e.avatar_stand_in
				} : null, e.has_avatar ? e.representative_asset_id ?? null : null, n === "creator" ? "creator" : t || "performer") }) : null,
				/* @__PURE__ */ (0, X.jsxs)("span", {
					className: "flex min-w-0 grow flex-col gap-0.5",
					children: [/* @__PURE__ */ (0, X.jsx)("b", {
						className: "min-w-0 text-body-medium break-words text-text-primary",
						children: e.name
					}), /* @__PURE__ */ (0, X.jsx)("small", {
						className: "text-caption-1-regular text-text-secondary",
						children: Ft(e)
					})]
				}),
				o ? /* @__PURE__ */ (0, X.jsx)(Nt, {
					"aria-hidden": !0,
					className: "size-4 shrink-0 text-text-tertiary"
				}) : null
			] }), l = "relative isolate flex min-h-11 w-full min-w-0 items-center gap-2.5 rounded-lg px-3 py-2 text-left";
			return /* @__PURE__ */ (0, X.jsx)("li", {
				className: "min-w-0",
				children: o ? /* @__PURE__ */ (0, X.jsx)("button", {
					type: "button",
					onClick: () => i(t, e.name),
					className: `${l} cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring`,
					children: c
				}) : /* @__PURE__ */ (0, X.jsx)("div", {
					className: l,
					children: c
				})
			}, `${e.name}:${r}`);
		})
	});
}
function Fa({ label: e, panels: i, onSignal: a }) {
	return /* @__PURE__ */ (0, X.jsxs)(r, {
		className: `${We({ padding: "none" })} flex flex-col`,
		children: [/* @__PURE__ */ (0, X.jsx)("div", {
			className: "px-4 pt-3",
			children: /* @__PURE__ */ (0, X.jsx)(be, {
				"aria-label": e,
				className: ve,
				children: i.map((e) => /* @__PURE__ */ (0, X.jsx)(n, {
					id: e.id,
					className: _e,
					children: e.name
				}, e.id))
			})
		}), i.map((e) => /* @__PURE__ */ (0, X.jsx)(t, {
			id: e.id,
			className: "px-4 pt-3.5 pb-4",
			children: /* @__PURE__ */ (0, X.jsx)(Pa, {
				...e.props,
				onSignal: a
			})
		}, e.id))]
	});
}
function Ia({ data: e, onSignal: t, navigate: n }) {
	let r = e.analysis;
	if (!r?.headline) return null;
	let i = r.confidence || {}, a = [...(r.explore || []).map((e) => ({
		key: `tag:${e.tag}`,
		title: F(e, "title"),
		detail: F(e, "detail"),
		act: () => t("tag", e.tag)
	})), ...(r.next_steps || []).map((e) => ({
		key: `route:${e.route}`,
		title: F(e, "title"),
		detail: F(e, "detail"),
		act: () => n(e.route)
	}))];
	return /* @__PURE__ */ (0, X.jsxs)("section", {
		className: ua,
		"aria-label": V("manage:taste.summary"),
		children: [
			/* @__PURE__ */ (0, X.jsxs)("header", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, X.jsx)("h3", {
						className: "text-title-2-medium text-text-primary",
						children: V("manage:taste.summary")
					}),
					/* @__PURE__ */ (0, X.jsx)("p", {
						className: "max-w-prose text-title-2-regular wrap-anywhere text-text-primary",
						children: F(r, "headline")
					}),
					/* @__PURE__ */ (0, X.jsxs)("p", {
						className: "flex flex-wrap items-center gap-2 text-body-2-regular text-text-secondary",
						children: [/* @__PURE__ */ (0, X.jsx)("i", {
							"aria-hidden": !0,
							className: `size-2 shrink-0 rounded-full ${i.level === "high" ? "bg-status-lime-text" : i.level === "medium" ? "bg-status-yellow-text" : "bg-text-tertiary"}`
						}), /* @__PURE__ */ (0, X.jsx)("span", {
							className: "min-w-0 wrap-anywhere",
							children: F(i, "label") || V("manage:taste.stillLearning")
						})]
					})
				]
			}),
			r.points?.length ? /* @__PURE__ */ (0, X.jsx)("div", {
				className: "inline-grid w-full gap-3 sm:grid-cols-2",
				children: r.points.map((e) => /* @__PURE__ */ (0, X.jsxs)("div", {
					className: `flex min-w-0 flex-col gap-1 ${da}`,
					children: [/* @__PURE__ */ (0, X.jsx)("span", {
						className: "text-caption-1-regular text-text-secondary",
						children: F(e, "label")
					}), /* @__PURE__ */ (0, X.jsx)("b", {
						className: "text-body-2-medium break-words text-text-primary",
						children: F(e, "text")
					})]
				}, e.label))
			}) : null,
			a.length ? /* @__PURE__ */ (0, X.jsx)("div", {
				className: "flex flex-col gap-2",
				children: a.map((e) => /* @__PURE__ */ (0, X.jsxs)("button", {
					type: "button",
					onClick: e.act,
					className: `flex w-full min-w-0 cursor-pointer items-center gap-3 ${da} text-left outline-none hover:bg-background-primary-hover focus-visible:ring-2 focus-visible:ring-border-focus-ring`,
					children: [/* @__PURE__ */ (0, X.jsxs)("span", {
						className: "flex min-w-0 grow flex-col gap-1",
						children: [/* @__PURE__ */ (0, X.jsx)("b", {
							className: "text-body-2-medium wrap-anywhere text-text-primary",
							children: e.title
						}), /* @__PURE__ */ (0, X.jsx)("small", {
							className: "text-caption-1-regular wrap-anywhere text-text-secondary",
							children: e.detail
						})]
					}), /* @__PURE__ */ (0, X.jsx)(Nt, {
						"aria-hidden": !0,
						className: "size-4 shrink-0 text-text-tertiary"
					})]
				}, e.key))
			}) : /* @__PURE__ */ (0, X.jsx)(E, {
				size: "compact",
				icon: Mt,
				title: V("manage:taste.nothingToExplore"),
				actions: /* @__PURE__ */ (0, X.jsx)(s, {
					size: "small",
					href: "/",
					children: V("manage:shared.browseCollection")
				}),
				children: ma
			})
		]
	});
}
function La({ onboarding: e, done: t }) {
	let [n, r] = (0, W.useState)(() => {
		try {
			return localStorage.getItem(Da) === "1";
		} catch {
			return !1;
		}
	});
	return t || n ? null : /* @__PURE__ */ (0, X.jsx)("div", {
		className: We({
			padding: "none",
			className: "p-4"
		}),
		children: /* @__PURE__ */ (0, X.jsxs)(C, {
			summary: V("manage:taste.importGuide"),
			defaultOpen: e,
			children: [
				/* @__PURE__ */ (0, X.jsx)("p", {
					className: "text-body-2-regular text-text-secondary",
					children: Ca
				}),
				/* @__PURE__ */ (0, X.jsx)("p", {
					className: "text-body-2-regular text-text-secondary",
					children: wa
				}),
				/* @__PURE__ */ (0, X.jsxs)("ul", {
					className: "flex list-disc flex-col gap-1 pl-5 text-body-2-regular text-text-secondary",
					children: [/* @__PURE__ */ (0, X.jsx)("li", { children: ka(V("manage:taste.guideChrome", { link: Oa }), /* @__PURE__ */ (0, X.jsxs)("a", {
						href: "https://takeout.google.com/",
						target: "_blank",
						rel: "noopener noreferrer",
						className: "text-text-primary underline-offset-4 hover:underline",
						children: ["Google Takeout", /* @__PURE__ */ (0, X.jsx)(Me, {
							"aria-hidden": !0,
							className: "size-(--icon-inline) shrink-0"
						})]
					})) }), /* @__PURE__ */ (0, X.jsx)("li", { children: ka(V("manage:taste.guideOther", { link: Oa }), /* @__PURE__ */ (0, X.jsxs)("a", {
						href: "https://github.com/purarue/browserexport",
						target: "_blank",
						rel: "noopener noreferrer",
						className: "text-text-primary underline-offset-4 hover:underline",
						children: ["browserexport", /* @__PURE__ */ (0, X.jsx)(Me, {
							"aria-hidden": !0,
							className: "size-(--icon-inline) shrink-0"
						})]
					})) })]
				}),
				/* @__PURE__ */ (0, X.jsx)("p", {
					className: "text-body-2-regular text-text-secondary",
					children: Ta
				}),
				/* @__PURE__ */ (0, X.jsx)("span", {
					className: "self-start",
					children: /* @__PURE__ */ (0, X.jsx)(o, {
						variant: "secondary",
						size: "small",
						onClick: () => {
							try {
								localStorage.setItem(Da, "1");
							} catch {}
							r(!0);
						},
						children: V("manage:shared.skip")
					})
				})
			]
		})
	});
}
function Ra({ busy: t, onRefresh: n, onImport: r, onImportBookmarks: i }) {
	let a = (0, W.useRef)(null), [s, c] = (0, W.useState)(!1), l = (e) => {
		c(!1), e();
	};
	return /* @__PURE__ */ (0, X.jsxs)(X.Fragment, { children: [/* @__PURE__ */ (0, X.jsxs)("span", {
		"data-guide-target": "history-import",
		"data-button-group": !0,
		"data-split-button": !0,
		"data-variant": "primary",
		children: [/* @__PURE__ */ (0, X.jsx)(o, {
			leadingIcon: T,
			title: fa,
			onClick: n,
			...N(t),
			children: V("manage:taste.readBrowserHistory")
		}), /* @__PURE__ */ (0, X.jsx)(o, {
			ref: a,
			iconOnly: !0,
			leadingIcon: Ze,
			"aria-label": V("manage:taste.moreHistoryOptions"),
			"aria-haspopup": "dialog",
			"aria-expanded": s,
			...N(t),
			onClick: () => {
				t || c(!0);
			}
		})]
	}), /* @__PURE__ */ (0, X.jsx)(e, {
		triggerRef: a,
		isOpen: s,
		onOpenChange: c,
		placement: "bottom end",
		offset: 4,
		className: le,
		children: /* @__PURE__ */ (0, X.jsxs)(ue, {
			"aria-label": V("manage:taste.moreHistoryOptions"),
			className: "flex w-52 flex-col gap-1 outline-none",
			children: [
				/* @__PURE__ */ (0, X.jsxs)("button", {
					type: "button",
					className: la,
					onClick: () => l(n),
					children: [/* @__PURE__ */ (0, X.jsx)(T, {
						"aria-hidden": !0,
						className: "size-4 shrink-0"
					}), V("manage:taste.readBrowserHistory")]
				}),
				/* @__PURE__ */ (0, X.jsxs)("button", {
					type: "button",
					className: la,
					onClick: () => l(r),
					children: [/* @__PURE__ */ (0, X.jsx)(ge, {
						"aria-hidden": !0,
						className: "size-4 shrink-0"
					}), V("manage:taste.importHistoryFile")]
				}),
				/* @__PURE__ */ (0, X.jsxs)("button", {
					type: "button",
					className: la,
					onClick: () => l(i),
					children: [/* @__PURE__ */ (0, X.jsx)(at, {
						"aria-hidden": !0,
						className: "size-4 shrink-0"
					}), V("manage:taste.importBookmarksFile")]
				})
			]
		})
	})] });
}
function za({ sources: e, browsers: t, window: n, toast: r, emptyActions: i }) {
	let a = xn({
		mutationFn: (e) => Rt(e, n),
		onSuccess: (e) => {
			z.setQueryData(H(n), e.dashboard), r(V("manage:taste.sourceRemoved"));
		}
	});
	return /* @__PURE__ */ (0, X.jsxs)(sa, {
		browsers: t,
		sources: e,
		range: n,
		children: [a.error ? /* @__PURE__ */ (0, X.jsx)("div", {
			className: "sm:col-span-2",
			children: /* @__PURE__ */ (0, X.jsx)(M, {
				tone: "error",
				children: L(a.error)
			})
		}) : null, e.length ? /* @__PURE__ */ (0, X.jsx)(X.Fragment, { children: e.filter((e) => !t.some((t) => t.source_keys?.includes(e.source_key))).map((e) => /* @__PURE__ */ (0, X.jsxs)("div", {
			"data-taste-source": "import",
			className: oa,
			children: [
				/* @__PURE__ */ (0, X.jsx)("span", {
					className: "inline-grid size-8 shrink-0 place-items-center rounded-lg text-text-secondary",
					children: e.browser === "browserexport" ? /* @__PURE__ */ (0, X.jsx)(ge, {
						"aria-hidden": !0,
						className: "size-4"
					}) : /* @__PURE__ */ (0, X.jsx)(Fe, {
						"aria-hidden": !0,
						className: "size-4"
					})
				}),
				/* @__PURE__ */ (0, X.jsxs)("span", {
					className: "flex min-w-0 grow flex-col gap-0.5",
					children: [/* @__PURE__ */ (0, X.jsx)("b", {
						className: "min-w-0 text-body-2-medium break-words text-text-primary",
						children: e.profile
					}), /* @__PURE__ */ (0, X.jsx)("small", {
						className: "min-w-0 text-caption-1-regular break-words text-text-secondary",
						children: V(e.bookmarks ? "manage:taste.importedBookmarks" : "manage:taste.importedHistory", {
							host: e.host,
							count: Number(e.visits || e.bookmarks || 0)
						})
					})]
				}),
				/* @__PURE__ */ (0, X.jsx)(o, {
					variant: "secondary",
					size: "small",
					"aria-label": V("manage:taste.removeSourceLabel", { source: e.profile }),
					className: "shrink-0",
					iconOnly: !0,
					leadingIcon: oe,
					...N(a.isPending),
					onClick: () => {
						a.isPending || Je({
							title: V("manage:taste.removeSource"),
							body: Ea,
							confirmLabel: V("manage:taste.removeSource"),
							holdToConfirm: !0,
							onConfirm: () => a.mutateAsync(e.source_key)
						});
					}
				})
			]
		}, e.source_key)) }) : t.length ? null : /* @__PURE__ */ (0, X.jsx)(E, {
			size: "compact",
			icon: Fe,
			title: V("manage:taste.noSourcesTitle"),
			actions: i,
			children: pa
		})]
	});
}
function Ba(e) {
	let { onSignal: i, navigate: a, toast: c, onboarding: l } = e, [u, d] = (0, W.useState)("all"), [f, p] = (0, W.useState)("browser"), m = (0, W.useRef)(null), h = (0, W.useRef)(null), g = Cn({
		queryKey: H(u),
		queryFn: ({ signal: e }) => Qe(u, e),
		placeholderData: Dt,
		refetchInterval: on
	}), { job: _, running: v, outcome: y, start: b } = mn({
		queryKey: De,
		queryFn: ({ signal: e }) => $e(e),
		start: () => Qt(u),
		taskKey: Oe,
		onFinish: (e) => {
			e.status !== "failed" && (z.invalidateQueries({ queryKey: ["taste"] }), c(e.warnings?.length ? V("manage:taste.partialHistory") : V("manage:taste.analysisUpdated")));
		}
	}), x = xn({
		mutationFn: (e) => Qe(e, void 0, !0),
		onSuccess: (e, t) => {
			z.setQueryData(H(t), e);
		}
	}), S = xn({
		mutationFn: (e) => yt(e),
		onSuccess: (e) => {
			z.setQueryData(H("all"), e.dashboard), d("all"), c(V("manage:taste.dataImported"));
		}
	}), C = (e) => {
		let t = e.currentTarget.files?.[0];
		e.currentTarget.value = "", t && !S.isPending && (S.reset(), S.mutate(t));
	}, w = () => {
		v || b.isPending || (b.reset(), b.mutate());
	}, T = g.data;
	if (!T) return /* @__PURE__ */ (0, X.jsx)(Bn, { children: /* @__PURE__ */ (0, X.jsx)(M, {
		tone: "error",
		title: V("manage:taste.loadFailedTitle"),
		children: g.error ? L(g.error) : V("manage:taste.loadFailedBody")
	}) });
	let D = T.summary || {}, O = T.coverage || {}, k = T.rankings || {}, ee = T.storage || {}, A = rn(k.browser_categories || []), te = Pt(A).length > 0, ne = T.gaps || [], re = O.tagged || 0, ie = O.identified || 0, j = b.error ? L(b.error) : S.error ? L(S.error) : x.error ? L(x.error) : y?.status === "failed" ? Tt(y, "error") || V("manage:taste.readNotFound") : "", ae = /* @__PURE__ */ (0, X.jsxs)("div", {
		className: "flex flex-wrap justify-center gap-2",
		children: [/* @__PURE__ */ (0, X.jsx)(o, {
			variant: "secondary",
			...N(v || b.isPending || S.isPending),
			onClick: w,
			children: V("manage:taste.readBrowserHistory")
		}), /* @__PURE__ */ (0, X.jsx)(o, {
			variant: "secondary",
			...N(S.isPending),
			onClick: () => m.current?.click(),
			children: V("manage:taste.importHistoryFile")
		})]
	});
	return /* @__PURE__ */ (0, X.jsx)(Bn, { children: /* @__PURE__ */ (0, X.jsxs)(Aa, {
		value: u === "all" ? f === "peach" ? /* @__PURE__ */ (0, X.jsx)(s, {
			size: "small",
			variant: "secondary",
			href: "/",
			children: V("manage:shared.browseCollection")
		}) : ae : /* @__PURE__ */ (0, X.jsx)(o, {
			size: "small",
			variant: "secondary",
			onClick: () => d("all"),
			children: V("manage:taste.viewAllTime")
		}),
		children: [
			/* @__PURE__ */ (0, X.jsxs)(r, {
				selectedKey: f,
				onSelectionChange: (e) => p(String(e)),
				className: "flex flex-col gap-5",
				children: [
					/* @__PURE__ */ (0, X.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, X.jsxs)(be, {
							"aria-label": V("manage:taste.evidenceLabel"),
							className: ve,
							children: [/* @__PURE__ */ (0, X.jsx)(n, {
								id: "peach",
								className: _e,
								children: V("manage:taste.peachActivity")
							}), /* @__PURE__ */ (0, X.jsx)(n, {
								id: "browser",
								className: _e,
								children: V("manage:taste.browserHistory")
							})]
						}), /* @__PURE__ */ (0, X.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, X.jsx)(xe, {
									"aria-label": V("manage:taste.rangeLabel"),
									selectedKey: u,
									onSelectionChange: (e) => {
										e !== null && d(String(e));
									},
									children: ke.map(([e, t]) => /* @__PURE__ */ (0, X.jsx)(Se, {
										id: e,
										children: t
									}, e))
								}),
								/* @__PURE__ */ (0, X.jsx)(Ra, {
									busy: v || b.isPending || S.isPending,
									onRefresh: w,
									onImport: () => m.current?.click(),
									onImportBookmarks: () => h.current?.click()
								}),
								/* @__PURE__ */ (0, X.jsx)("input", {
									ref: m,
									type: "file",
									tabIndex: -1,
									"aria-hidden": !0,
									className: "hidden",
									onChange: C
								}),
								/* @__PURE__ */ (0, X.jsx)("input", {
									ref: h,
									type: "file",
									tabIndex: -1,
									"aria-hidden": !0,
									className: "hidden",
									"data-bookmark-import": !0,
									onChange: C
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, X.jsx)(La, {
						onboarding: l,
						done: !!(D.history_sources || T.updated_at)
					}),
					/* @__PURE__ */ (0, X.jsxs)("div", {
						"aria-live": "polite",
						className: "flex flex-col gap-3 empty:hidden",
						children: [
							v ? /* @__PURE__ */ (0, X.jsx)(Ae, {
								kind: Re("taste-refresh"),
								label: Tt(_, "message") || V("manage:taste.refreshing"),
								value: _?.checked,
								total: _?.total
							}) : null,
							S.isPending ? /* @__PURE__ */ (0, X.jsx)(Ae, {
								kind: "gather",
								label: V("manage:taste.importing")
							}) : null,
							T.stale && T.error ? /* @__PURE__ */ (0, X.jsx)(M, {
								tone: "error",
								action: /* @__PURE__ */ (0, X.jsx)(o, {
									variant: "secondary",
									size: "small",
									...N(x.isPending),
									onClick: () => x.mutate(u),
									children: V("manage:shared.retryNow")
								}),
								children: V("manage:taste.updateFailedStale", {
									time: sn(T.computed_at),
									error: Jt(T.message_code ?? "", T.error, T.message_params)
								})
							}) : T.stale ? /* @__PURE__ */ (0, X.jsx)(Ae, {
								kind: Re("taste-refresh"),
								label: V("manage:taste.updatingStale", { time: sn(T.computed_at) })
							}) : null,
							j ? /* @__PURE__ */ (0, X.jsx)(M, {
								tone: "error",
								children: j
							}) : null,
							y?.warnings?.length ? /* @__PURE__ */ (0, X.jsx)(M, {
								tone: "warning",
								children: Yt(y.warnings, y.warning_codes, y.warning_params).join(V("shell:format.semicolonSeparator"))
							}) : null
						]
					}),
					/* @__PURE__ */ (0, X.jsxs)(t, {
						id: "browser",
						className: "flex flex-col gap-5",
						children: [
							/* @__PURE__ */ (0, X.jsxs)("div", {
								className: ye,
								children: [
									/* @__PURE__ */ (0, X.jsx)($, {
										accent: 0,
										icon: un,
										term: V("manage:tasteSkeleton.browsingHistory"),
										figure: Number(D.history_visits || 0).toLocaleString(),
										detail: _t(D),
										detailTitle: `${nn(D.range_start)}—${nn(D.range_end)}`
									}),
									/* @__PURE__ */ (0, X.jsx)($, {
										accent: 1,
										icon: Ot,
										term: V("manage:tasteSkeleton.tasteDimensions"),
										figure: A.length.toLocaleString(),
										detail: A[0]?.name || V("manage:taste.noTopDimension")
									}),
									/* @__PURE__ */ (0, X.jsx)($, {
										accent: 2,
										icon: Mt,
										term: V("manage:tasteSkeleton.browsingLeads"),
										figure: ne.length.toLocaleString()
									}),
									/* @__PURE__ */ (0, X.jsx)($, {
										accent: 3,
										icon: at,
										term: V("manage:taste.bookmarks"),
										figure: Number(D.bookmarks || 0).toLocaleString(),
										detail: V("manage:taste.privateExports", {
											count: Number(ee.exports || 0),
											size: it(ee.bytes || 0)
										})
									})
								]
							}),
							/* @__PURE__ */ (0, X.jsxs)("section", {
								className: te ? `${ua} md:flex-row md:gap-6` : ua,
								"aria-label": V("manage:taste.browsingProfile"),
								children: [/* @__PURE__ */ (0, X.jsxs)("div", {
									className: te ? "flex shrink-0 flex-col gap-2 pb-5 md:w-80 md:pr-6 md:pb-0" : "flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1",
									children: [
										/* @__PURE__ */ (0, X.jsx)("span", {
											className: "text-caption-1-regular text-text-secondary",
											children: V("manage:taste.browsingProfile")
										}),
										te ? /* @__PURE__ */ (0, X.jsx)(ra, {
											rows: A,
											label: V("manage:taste.topDimensions")
										}) : null,
										/* @__PURE__ */ (0, X.jsx)("small", {
											className: "text-caption-1-regular text-text-secondary",
											children: T.updated_at ? V("manage:taste.updatedAt", { date: nn(T.updated_at) }) : V("manage:taste.historyNotFetched")
										})
									]
								}), /* @__PURE__ */ (0, X.jsx)("div", {
									className: "flex min-w-0 grow flex-col",
									children: A.length ? /* @__PURE__ */ (0, X.jsx)(ia, {
										rows: A,
										label: V("manage:taste.dimensionRanking")
									}) : /* @__PURE__ */ (0, X.jsx)(E, {
										size: "compact",
										icon: Mt,
										title: V("manage:taste.noDimensions"),
										actions: /* @__PURE__ */ (0, X.jsx)(ja, {}),
										children: ha
									})
								})]
							}),
							/* @__PURE__ */ (0, X.jsx)(jn, {
								activity: T.activity,
								title: V("manage:taste.browsingActivity"),
								dailyTitle: V("manage:taste.dailyActivity"),
								words: {
									unit: (e) => V("manage:taste.siteVisitsUnit", { count: e }),
									series: V("manage:taste.visitsSeries"),
									cell: (e) => V("manage:taste.visitsCell", { count: e })
								},
								tone: 4,
								empty: V("manage:taste.noVisitsHint")
							}),
							/* @__PURE__ */ (0, X.jsx)(aa, { flows: T.creator_flows }),
							/* @__PURE__ */ (0, X.jsx)(Fa, {
								label: V("manage:taste.browserDimensions"),
								onSignal: i,
								panels: [
									{
										id: "tags",
										name: V("manage:shared.tags"),
										props: {
											rows: k.browser_tags || [],
											kind: "tag",
											visual: "none",
											empty: _a
										}
									},
									{
										id: "creators",
										name: V("manage:shared.creators"),
										props: {
											rows: k.browser_creators || [],
											kind: "creator",
											visual: "creator",
											empty: va
										}
									},
									{
										id: "performers",
										name: V("manage:shared.actresses"),
										props: {
											rows: k.browser_performers || [],
											kind: "performer",
											visual: "entity",
											empty: V("manage:taste.noActressHistory")
										}
									},
									{
										id: "domains",
										name: V("manage:taste.topSites"),
										props: {
											rows: k.domains || [],
											kind: "",
											visual: "domain",
											empty: ya
										}
									},
									{
										id: "gaps",
										name: V("manage:tasteSkeleton.browsingLeads"),
										props: {
											rows: ne,
											kind: "",
											visual: "none",
											empty: ga
										}
									}
								]
							})
						]
					}),
					/* @__PURE__ */ (0, X.jsxs)(t, {
						id: "peach",
						className: "flex flex-col gap-5",
						children: [
							/* @__PURE__ */ (0, X.jsxs)("div", {
								className: ye,
								children: [
									/* @__PURE__ */ (0, X.jsx)($, {
										accent: 0,
										icon: Ne,
										term: V("manage:taste.watchedInPeach"),
										figure: Number(D.peach_items || 0).toLocaleString(),
										detail: an(D.peach_seconds || 0)
									}),
									/* @__PURE__ */ (0, X.jsx)($, {
										accent: 1,
										icon: Le,
										term: V("manage:shared.like"),
										figure: Number(D.liked || 0).toLocaleString()
									}),
									/* @__PURE__ */ (0, X.jsx)($, {
										accent: 2,
										icon: Ue,
										term: V("manage:taste.disliked"),
										figure: Number(D.disliked || 0).toLocaleString()
									}),
									/* @__PURE__ */ (0, X.jsx)($, {
										accent: 3,
										icon: Ot,
										term: V("manage:taste.tagged"),
										figure: re.toLocaleString()
									})
								]
							}),
							/* @__PURE__ */ (0, X.jsxs)("section", {
								className: `${ua} md:flex-row md:gap-6`,
								"aria-label": V("manage:taste.peachViewing"),
								children: [/* @__PURE__ */ (0, X.jsxs)("div", {
									className: "flex shrink-0 flex-col gap-0.5 pb-5 md:w-72 md:pr-6 md:pb-0",
									children: [
										/* @__PURE__ */ (0, X.jsx)("span", {
											className: "text-caption-1-regular text-text-secondary",
											children: V("manage:taste.peachViewing")
										}),
										/* @__PURE__ */ (0, X.jsx)("b", {
											className: "text-display-4-medium tabular-nums text-text-primary",
											children: Number(D.peach_items || 0).toLocaleString()
										}),
										/* @__PURE__ */ (0, X.jsx)("span", {
											className: "text-body-2-regular text-text-secondary",
											children: V("manage:taste.watchedOrRatedUnit", { count: Number(D.peach_items || 0) })
										})
									]
								}), /* @__PURE__ */ (0, X.jsxs)("div", {
									className: "flex min-w-0 grow flex-col",
									children: [/* @__PURE__ */ (0, X.jsx)(Va, {
										term: V("manage:taste.tagged"),
										value: re,
										rest: O.untagged || 0
									}), /* @__PURE__ */ (0, X.jsx)(Va, {
										term: V("manage:taste.identified"),
										value: ie,
										rest: O.unidentified || 0
									})]
								})]
							}),
							/* @__PURE__ */ (0, X.jsx)(Fa, {
								label: V("manage:taste.peachDimensions"),
								onSignal: i,
								panels: [
									{
										id: "tags",
										name: V("manage:shared.tags"),
										props: {
											rows: k.peach_tags || [],
											kind: "tag",
											visual: "none",
											empty: ba
										}
									},
									{
										id: "creators",
										name: V("manage:shared.creators"),
										props: {
											rows: k.peach_creators || [],
											kind: "creator",
											visual: "creator",
											empty: xa
										}
									},
									{
										id: "performers",
										name: V("manage:shared.actresses"),
										props: {
											rows: k.peach_performers || [],
											kind: "performer",
											visual: "entity",
											empty: Sa
										}
									}
								]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, X.jsx)(Ia, {
				data: T,
				onSignal: i,
				navigate: a
			}),
			/* @__PURE__ */ (0, X.jsx)(za, {
				sources: T.sources || [],
				browsers: T.browsers || [],
				window: u,
				toast: c,
				emptyActions: ae
			})
		]
	}) });
}
function Va({ term: e, value: t, rest: n }) {
	let r = Math.max(t + n, 1);
	return /* @__PURE__ */ (0, X.jsxs)("div", {
		className: "flex flex-col gap-1.5 border-b border-separator-border py-3 last:border-b-0",
		children: [/* @__PURE__ */ (0, X.jsxs)("p", {
			className: "flex items-baseline justify-between gap-3 text-body-2-regular text-text-primary",
			children: [/* @__PURE__ */ (0, X.jsx)("span", { children: e }), /* @__PURE__ */ (0, X.jsxs)("b", {
				className: "tabular-nums",
				children: [t.toLocaleString(), /* @__PURE__ */ (0, X.jsx)("span", {
					className: "ml-1.5 text-caption-1-regular text-text-secondary",
					children: V("manage:taste.remainingCount", { count: n })
				})]
			})]
		}), /* @__PURE__ */ (0, X.jsx)(me, {
			meter: !0,
			label: V("manage:shared.termProgress", {
				term: e,
				value: t.toLocaleString(),
				total: r.toLocaleString()
			}),
			value: t,
			max: r
		})]
	});
}
export { Da as TASTE_GUIDE_KEY, Ba as TastePage };

//# debugId=713c6429-edd4-4ac7-80b3-a5784403d709