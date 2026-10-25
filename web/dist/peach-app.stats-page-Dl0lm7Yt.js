(function() {
	try {
		var e = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "82936c02-5b67-4889-8313-b4254447f6e3", e._sentryDebugIdIdentifier = "sentry-dbid-82936c02-5b67-4889-8313-b4254447f6e3");
	} catch {}
})();
import { ActivityHeat as e, AnimatedItems as t, BarCard as n, CHART_CARD as r, CHART_COLORS as i, Cell as a, ChartBackground as o, ChartContainer as s, ChartEmpty as c, ChartLegend as l, ChartLegendContent as u, ChartTip as d, ChartTooltip as f, ChartTooltipContent as p, DefaultZIndexes as m, ExpandableRanking as h, LabelListFromLabelProp as g, Layer as _, LoadingIndicator as v, PolarAngleAxis as y, PolarChart as b, PolarLabelListContextProvider as x, RegisterGraphicalItemId as S, Sector as C, SetPolarGraphicalItem as w, SetPolarLegendPayload as T, SetTooltipEntrySettings as E, Shape as ee, ZIndexLayer as D, adaptEventsOfChild as O, arrayTooltipSearcher as te, combineAllBarPositions as ne, combineBarPosition as re, combineBarSizeList as ie, combineDisplayedStackedData as ae, combineStackGroups as oe, combineStackedData as se, createSelector as k, defaultPolarChartProps as ce, findAllByType as le, getBandSizeOfAxis as A, getBaseValueOfBar as ue, getCateCoordinateOfBar as de, getColorsCount as fe, getNormalizedStackId as pe, getTooltipNameProp as me, getValueByDataKey as he, getZIndexFromUnknown as ge, interpolate as _e, isCategoricalAxis as ve, isNullish as ye, isStacked as be, matchAppend as xe, mathSign as Se, noop as Ce, resolveDefaultProps as we, selectActiveTooltipIndex as Te, selectAngleAxis as Ee, selectBarCategoryGap as De, selectBarGap as Oe, selectChartDataAndAlwaysIgnoreIndexes as ke, selectChartDataWithIndexes as Ae, selectChartLayout as j, selectPolarAxisScale as je, selectPolarAxisTicks as Me, selectPolarGraphicalItemAxisTicks as Ne, selectPolarItemsSettings as Pe, selectPolarViewBox as Fe, selectRadiusAxis as Ie, selectReverseStackOrder as Le, selectRootBarSize as Re, selectRootMaxBarSize as ze, selectStackOffsetType as Be, selectTooltipAxis as Ve, selectUnfilteredPolarItems as He, sliceConfig as Ue, sliceKey as We, svgPropertiesNoEvents as Ge, svgPropertiesNoEventsFromUnknown as Ke, truncateByDomain as qe, useAnimationCallbacks as Je, useAppSelector as M, useMouseClickItemDispatch as Ye, useMouseEnterItemDispatch as Xe, useMouseLeaveItemDispatch as Ze, usePolarChartLayout as Qe } from "./peach-app.expandable-ranking-CyDn34Ar.js";
import { $b4f18e3395fe64d7$export$3d96ec278d3efce4 as N, $b4f18e3395fe64d7$export$3e41faf802a29e71 as P, $b4f18e3395fe64d7$export$b2539bed5023c21c as $e, $b4f18e3395fe64d7$export$e51a686c67fdaa2d as et, ButtonLink as F, EmptyState as I, LOC as tt, MEDIA_SOURCE_ICONS as nt, NR as rt, Note as it, Progress as L, SEGMENT as at, SEGMENTED_TRACK as ot, STATS_KEY as st, SegmentedTabList as ct, SourceMark as lt, StatusLabel as ut, Xc as dt, Xt as ft, _8 as pt, __toESM as mt, bandRows as ht, cardClass as gt, clsx as _t, errorMessage as vt, fetchStats as yt, fmtCount as R, fmtSize as z, known as bt, lengthRows as xt, mM as St, mediumRows as Ct, percentText as wt, playedFor as Tt, playedItemUrl as Et, radialArc as Dt, radialBarSize as Ot, radialCeiling as kt, radialSlices as At, reachedShare as jt, replayRows as Mt, require_jsx_runtime as Nt, require_react as Pt, settingsPath as Ft, uo as It, useQuery as Lt, watchNote as Rt, watchedShare as zt } from "./peach-app.js";
import { Page as Bt } from "./peach-app.page-Irl_Wogd.js";
import { STAT_STRIP as Vt, StatCard as Ht, statCardClass as Ut } from "./peach-app.stat-card-Q_AB9v0S.js";
import { ConnectionStatus as Wt } from "./peach-app.connection-status-BP0ylxDH.js";
//#region node_modules/recharts/es6/util/RadialBarUtils.js
var B = /* @__PURE__ */ mt(Pt()), Gt = ["option"];
function Kt(e, t) {
	if (e == null) return {};
	var n, r, i = qt(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function qt(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var Jt = C;
function Yt(e) {
	return typeof e == "string" ? parseInt(e, 10) : e;
}
function Xt(e) {
	var t = e.option, n = Kt(e, Gt);
	return /*#__PURE__*/ B.createElement(ee, {
		option: t,
		DefaultShape: Jt,
		shapeProps: n
	});
}
//#endregion
//#region node_modules/recharts/es6/state/selectors/radialBarSelectors.js
function Zt(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function V(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Zt(Object(n), !0).forEach(function(t) {
			Qt(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Zt(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Qt(e, t, n) {
	return (t = $t(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function $t(e) {
	var t = en(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function en(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var H = k([(e, t) => Ie(e, t), (e, t) => je(e, "radiusAxis", t)], (e, t) => {
	if (e != null && t != null) return V(V({}, e), {}, { scale: t });
}), tn = (e, t) => Ne(e, "radiusAxis", t, !1), U = k([(e, t, n) => Ee(e, n), (e, t, n) => je(e, "angleAxis", n)], (e, t) => {
	if (e != null && t != null) return V(V({}, e), {}, { scale: t });
}), W = (e, t, n) => Me(e, "angleAxis", n, !1), G = k([He, (e, t, n, r) => r], (e, t) => {
	if (e.some((e) => e.type === "radialBar" && t.dataKey === e.dataKey && t.stackId === e.stackId)) return t;
}), nn = k([
	j,
	H,
	tn,
	U,
	W
], (e, t, n, r, i) => ve(e, "radiusAxis") ? A(t, n, !1) : A(r, i, !1)), rn = k([
	U,
	H,
	j
], (e, t, n) => {
	var r = n === "radial" ? e : t;
	if (r != null && r.scale != null) return ue({ numericAxis: r });
}), an = (e, t, n, r, i) => i, on = (e, t, n, r, i) => n, sn = (e, t, n, r, i) => t, cn = (e, t, n, r, i) => r.maxBarSize, ln = (e) => e.type === "radialBar", un = k([
	j,
	He,
	on,
	sn
], (e, t, n, r) => t.filter((t) => e === "centric" ? t.angleAxisId === n : t.radiusAxisId === r).filter((e) => e.hide === !1).filter(ln)), dn = k([
	un,
	Re,
	() => void 0
], ie), fn = k([
	j,
	ze,
	U,
	W,
	H,
	tn,
	cn
], (e, t, n, r, i, a, o) => {
	var s = ye(o) ? t : o;
	return e === "centric" ? A(n, r, !0) ?? s ?? 0 : A(i, a, !0) ?? s ?? 0;
}), pn = k([
	dn,
	ze,
	Oe,
	De,
	fn,
	nn,
	cn
], ne), mn = k([pn, G], re), hn = k([Pe], (e) => e.filter(ln).filter(be)), gn = k([
	hn,
	ke,
	Ve
], ae), _n = k([
	gn,
	hn,
	Be,
	Le
], oe), vn = k([(e, t, n) => j(e) === "centric" ? _n(e, "radiusAxis", t) : _n(e, "angleAxis", n), G], se), yn = k([
	U,
	W,
	H,
	tn,
	Ae,
	G,
	nn,
	j,
	rn,
	Fe,
	an,
	mn,
	vn
], (e, t, n, r, i, a, o, s, c, l, u, d, f) => {
	var p = i.chartData, m = i.dataStartIndex, h = i.dataEndIndex;
	if (a == null || n == null || e == null || p == null || o == null || d == null || s !== "centric" && s !== "radial" || r == null || l == null) return [];
	var g = a.dataKey, _ = a.minPointSize, v = l.cx, y = l.cy, b = l.startAngle, x = l.endAngle;
	return Bn({
		angleAxis: e,
		angleAxisTicks: t,
		bandSize: o,
		baseValue: c,
		cells: u,
		cx: v,
		cy: y,
		dataKey: g,
		dataStartIndex: m,
		displayedData: p.slice(m, h + 1),
		endAngle: x,
		layout: s,
		minPointSize: _,
		pos: d,
		radiusAxis: n,
		radiusAxisTicks: r,
		stackedData: f,
		stackedDomain: f ? (s === "centric" ? n : e).scale.domain() : null,
		startAngle: b
	});
}), bn = k([ke, (e, t) => t], (e, t) => {
	var n = e.chartData, r = e.dataStartIndex, i = e.dataEndIndex;
	if (n == null) return [];
	var a = n.slice(r, i + 1);
	return a.length === 0 ? [] : a.map((e) => ({
		type: t,
		value: e.name,
		color: e.fill,
		payload: e
	}));
}), xn = [
	"shape",
	"activeShape",
	"cornerRadius",
	"id"
], Sn = [
	"onMouseEnter",
	"onClick",
	"onMouseLeave"
], Cn = ["value", "background"];
function K() {
	return K = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, K.apply(null, arguments);
}
function wn(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function q(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? wn(Object(n), !0).forEach(function(t) {
			Tn(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : wn(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Tn(e, t, n) {
	return (t = En(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function En(e) {
	var t = Dn(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Dn(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function On(e, t) {
	if (e == null) return {};
	var n, r, i = kn(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function kn(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
var An = [];
function jn(e) {
	var t = e.showLabels, n = e.sectors, r = e.children, i = n.map((e) => ({
		value: e.value,
		payload: e.payload,
		parentViewBox: void 0,
		clockWise: !1,
		viewBox: {
			cx: e.cx,
			cy: e.cy,
			innerRadius: e.innerRadius,
			outerRadius: e.outerRadius,
			startAngle: e.startAngle,
			endAngle: e.endAngle,
			clockWise: !1
		},
		fill: e.fill
	}));
	return /*#__PURE__*/ B.createElement(x, { value: t ? i : void 0 }, r);
}
function Mn(e) {
	var t = e.sectors, n = e.allOtherRadialBarProps, r = e.showLabels, i = e.animationElapsedTime, a = e.isAnimating, o = e.isEntrance, s = n.shape, c = n.activeShape, l = n.cornerRadius, u = n.id, d = On(n, xn), f = Ge(d), p = M(Te), h = n.onMouseEnter, _ = n.onClick, v = n.onMouseLeave, y = On(n, Sn), b = Xe(h, n.dataKey, u), x = Ze(v), S = Ye(_, n.dataKey, u);
	return t == null ? null : /*#__PURE__*/ B.createElement(jn, {
		showLabels: r,
		sectors: t
	}, t.map((e, t) => {
		var n = !!(c && p === String(t)), r = b(e, t), u = x(e, t), h = S(e, t), g = q(q(q(q({}, f), {}, { cornerRadius: Yt(l) }, e), O(y, e, t)), {}, {
			onMouseEnter: r,
			onMouseLeave: u,
			onClick: h,
			className: `recharts-radial-bar-sector ${e.className}`,
			forceCornerRadius: d.forceCornerRadius,
			cornerIsExternal: d.cornerIsExternal,
			animationElapsedTime: i,
			isAnimating: a,
			isEntrance: o,
			isActive: n,
			option: n && c != null ? c : s,
			index: t
		});
		return n ? /*#__PURE__*/ B.createElement(D, {
			zIndex: m.activeBar,
			key: `sector-${e.cx}-${e.cy}-${e.innerRadius}-${e.outerRadius}-${e.startAngle}-${e.endAngle}-${t}`
		}, /*#__PURE__*/ B.createElement(Xt, g)) : /*#__PURE__*/ B.createElement(Xt, K({ key: `sector-${e.cx}-${e.cy}-${e.innerRadius}-${e.outerRadius}-${e.startAngle}-${e.endAngle}-${t}` }, g));
	}), /*#__PURE__*/ B.createElement(g, { label: n.label }), n.children);
}
var Nn = (e, t) => e == null ? [] : t === 1 ? e.flatMap((e) => e.status === "removed" ? [] : [e.next]) : e.flatMap((e) => e.status === "removed" ? [] : e.status === "matched" ? [q(q({}, e.next), {}, {
	startAngle: _e(e.prev.startAngle, e.next.startAngle, t),
	endAngle: _e(e.prev.endAngle, e.next.endAngle, t)
})] : [q(q({}, e.next), {}, { endAngle: _e(e.next.startAngle, e.next.endAngle, t) })]);
function Pn(e) {
	var n = e.props, r = e.previousSectorsRef, i = n.sectors, a = n.isAnimationActive, o = n.animationBegin, s = n.animationDuration, c = n.animationEasing, l = n.onAnimationStart, u = n.onAnimationEnd, d = Je(l, u), f = d.isAnimating, p = d.handleAnimationStart, m = d.handleAnimationEnd, h = Qe();
	return h == null ? null : /*#__PURE__*/ B.createElement(t, {
		animationInput: n,
		animationIdPrefix: "recharts-radialbar-",
		items: i,
		previousItemsRef: r,
		isAnimationActive: a,
		animationBegin: o,
		animationDuration: s,
		animationEasing: c,
		onAnimationStart: p,
		onAnimationEnd: m,
		animationInterpolateFn: n.animationInterpolateFn,
		animationMatchBy: n.animationMatchBy,
		layout: h
	}, (e, t, r) => /*#__PURE__*/ B.createElement(Mn, {
		sectors: e,
		allOtherRadialBarProps: n,
		showLabels: !f,
		animationElapsedTime: t,
		isAnimating: f || t < 1,
		isEntrance: r
	}));
}
function Fn(e) {
	var t = (0, B.useRef)(null);
	return /*#__PURE__*/ B.createElement(Pn, {
		props: e,
		previousSectorsRef: t
	});
}
function In(e) {
	var t = M((t) => bn(t, e.legendType));
	return /*#__PURE__*/ B.createElement(T, { legendPayload: t ?? [] });
}
var Ln = /*#__PURE__*/ B.memo((e) => {
	var t = e.dataKey, n = e.sectors, r = e.stroke, i = e.strokeWidth, a = e.name, o = e.hide, s = e.fill, c = e.tooltipType, l = e.formatter, u = e.id, d = {
		dataDefinedOnItem: n,
		getPosition: Ce,
		settings: {
			graphicalItemId: u,
			stroke: r,
			strokeWidth: i,
			fill: s,
			nameKey: void 0,
			dataKey: t,
			name: me(a, t),
			hide: o,
			type: c,
			color: s,
			unit: "",
			formatter: l
		}
	};
	return /*#__PURE__*/ B.createElement(E, { tooltipEntrySettings: d });
}), Rn = class extends B.PureComponent {
	renderBackground(e) {
		if (e == null) return null;
		var t = this.props.cornerRadius, n = Ke(this.props.background);
		return /*#__PURE__*/ B.createElement(D, { zIndex: ge(this.props.background, m.barBackground) }, e.map((e, r) => {
			e.value;
			var i = e.background, a = On(e, Cn);
			if (!i) return null;
			var o = q(q(q(q(q({ cornerRadius: Yt(t) }, a), {}, { fill: "#eee" }, i), n), O(this.props, e, r)), {}, {
				index: r,
				className: _t("recharts-radial-bar-background-sector", String(n?.className)),
				option: i,
				isActive: !1
			});
			return /*#__PURE__*/ B.createElement(Xt, K({ key: `background-${a.cx}-${a.cy}-${a.innerRadius}-${a.outerRadius}-${a.startAngle}-${a.endAngle}-${r}` }, o));
		}));
	}
	render() {
		var e = this.props, t = e.hide, n = e.sectors, r = e.className, i = e.background;
		if (t) return null;
		var a = _t("recharts-area", r);
		return /*#__PURE__*/ B.createElement(D, { zIndex: this.props.zIndex }, /*#__PURE__*/ B.createElement(_, { className: a }, i && /*#__PURE__*/ B.createElement(_, { className: "recharts-radial-bar-background" }, this.renderBackground(n)), /*#__PURE__*/ B.createElement(_, { className: "recharts-radial-bar-sectors" }, /*#__PURE__*/ B.createElement(Fn, this.props))));
	}
};
function zn(e) {
	var t = B.useMemo(() => le(e.children, a), [e.children]), n = B.useMemo(() => ({
		data: void 0,
		hide: !1,
		id: e.id,
		dataKey: e.dataKey,
		minPointSize: e.minPointSize,
		stackId: pe(e.stackId),
		maxBarSize: e.maxBarSize,
		barSize: e.barSize,
		type: "radialBar",
		angleAxisId: e.angleAxisId,
		radiusAxisId: e.radiusAxisId
	}), [
		e.id,
		e.dataKey,
		e.minPointSize,
		e.stackId,
		e.maxBarSize,
		e.barSize,
		e.angleAxisId,
		e.radiusAxisId
	]), r = M((r) => yn(r, e.radiusAxisId, e.angleAxisId, n, t)) ?? An;
	return /*#__PURE__*/ B.createElement(B.Fragment, null, /*#__PURE__*/ B.createElement(Ln, {
		dataKey: e.dataKey,
		sectors: r,
		stroke: e.stroke,
		strokeWidth: e.strokeWidth,
		name: e.name,
		hide: e.hide,
		fill: e.fill,
		tooltipType: e.tooltipType,
		formatter: e.formatter,
		id: e.id
	}), /*#__PURE__*/ B.createElement(Rn, K({}, e, { sectors: r })));
}
var J = {
	angleAxisId: 0,
	animationBegin: 0,
	animationDuration: 1500,
	animationEasing: "ease",
	animationMatchBy: xe,
	animationInterpolateFn: Nn,
	background: !1,
	cornerIsExternal: !1,
	cornerRadius: 0,
	forceCornerRadius: !1,
	hide: !1,
	isAnimationActive: "auto",
	label: !1,
	legendType: "rect",
	minPointSize: 0,
	radiusAxisId: 0,
	shape: Jt,
	zIndex: m.bar
};
function Bn(e) {
	var t = e.displayedData, n = e.stackedData, r = e.dataStartIndex, i = e.stackedDomain, a = e.dataKey, o = e.baseValue, s = e.layout, c = e.radiusAxis, l = e.radiusAxisTicks, u = e.bandSize, d = e.pos, f = e.angleAxis, p = e.minPointSize, m = e.cx, h = e.cy, g = e.angleAxisTicks, _ = e.cells, v = e.startAngle, y = e.endAngle;
	return g == null || l == null ? An : (t ?? []).map((e, t) => {
		var b, x, S, C, w, T;
		if (n ? b = qe(n[r + t], i) : (b = he(e, a), Array.isArray(b) || (b = [o, b])), s === "radial") {
			if (C = f.scale.map(b[0]) ?? v, w = f.scale.map(b[1]) ?? y, x = de({
				axis: c,
				ticks: l,
				bandSize: u,
				offset: d.offset,
				entry: e,
				index: t
			}), x != null && w != null && C != null) {
				S = x + d.size;
				var E = w - C;
				if (Math.abs(p) > 0 && Math.abs(E) < Math.abs(p)) {
					var ee = Se(E || p) * (Math.abs(p) - Math.abs(E));
					w += ee;
				}
				T = { background: {
					cx: m,
					cy: h,
					innerRadius: x,
					outerRadius: S,
					startAngle: v,
					endAngle: y
				} };
			}
		} else if (x = c.scale.map(b[0]), S = c.scale.map(b[1]), C = de({
			axis: f,
			ticks: g,
			bandSize: u,
			offset: d.offset,
			entry: e,
			index: t
		}), x != null && S != null && C != null) {
			w = C + d.size;
			var D = S - x;
			if (Math.abs(p) > 0 && Math.abs(D) < Math.abs(p)) {
				var O = Se(D || p) * (Math.abs(p) - Math.abs(D));
				S += O;
			}
		}
		return q(q(q({}, e), T), {}, {
			payload: e,
			value: n ? b : b[1],
			cx: m,
			cy: h,
			innerRadius: x,
			outerRadius: S,
			startAngle: C,
			endAngle: w
		}, _ && _[t] && _[t].props);
	});
}
function Vn(e) {
	var t = we(e, J);
	return /*#__PURE__*/ B.createElement(S, {
		id: t.id,
		type: "radialBar"
	}, (e) => /*#__PURE__*/ B.createElement(B.Fragment, null, /*#__PURE__*/ B.createElement(w, {
		type: "radialBar",
		id: e,
		data: void 0,
		dataKey: t.dataKey,
		hide: t.hide ?? J.hide,
		angleAxisId: t.angleAxisId ?? J.angleAxisId,
		radiusAxisId: t.radiusAxisId ?? J.radiusAxisId,
		stackId: pe(t.stackId),
		barSize: t.barSize,
		minPointSize: t.minPointSize,
		maxBarSize: t.maxBarSize
	}), /*#__PURE__*/ B.createElement(In, t), /*#__PURE__*/ B.createElement(zn, K({}, t, { id: e }))));
}
Vn.displayName = "RadialBar";
//#endregion
//#region node_modules/recharts/es6/chart/RadialBarChart.js
function Hn(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Un(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Hn(Object(n), !0).forEach(function(t) {
			Wn(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Hn(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Wn(e, t, n) {
	return (t = Gn(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Gn(e) {
	var t = Kn(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Kn(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var qn = ["axis", "item"], Jn = Un(Un({}, ce), {}, {
	layout: "radial",
	startAngle: 0,
	endAngle: 360
}), Yn = /*#__PURE__*/ (0, B.forwardRef)((e, t) => {
	var n = we(e, Jn);
	return /*#__PURE__*/ B.createElement(b, {
		chartName: "RadialBarChart",
		defaultTooltipEventType: "axis",
		validateTooltipEventTypes: qn,
		tooltipPayloadSearcher: te,
		categoricalChartProps: n,
		ref: t
	});
}), Y = Nt(), Xn = "30%", Zn = "100%", Qn = 5, $n = 14, er = 5, tr = 1500, nr = (0, B.createContext)(null);
function rr() {
	let e = (0, B.use)(nr);
	if (!e) throw Error("Radial chart parts (<RadialBar />, <Tooltip />, …) must be used within <EvilRadialChart />");
	return e;
}
function X({ config: e, data: t, nameKey: n, children: r, className: i, chartProps: a, variant: c = "full", max: l, innerRadius: u = Xn, outerRadius: d = Zn, defaultSelectedDataKey: f = null, onSelectionChange: p, isLoading: m = !1, backgroundVariant: h }) {
	let g = (0, B.useId)().replace(/:/g, ""), [_, b] = (0, B.useState)(f), x = ur(m), S = sr(c), C = (0, B.useCallback)((e, t) => {
		b(e), p?.(e === null ? null : {
			dataKey: e,
			value: t ?? 0
		});
	}, [p]), w = (0, B.useMemo)(() => t.map((e) => ({
		...e,
		fill: `url(#${g}-radial-colors-${e[n]})`
	})), [
		t,
		n,
		g
	]), T = (0, B.useMemo)(() => ({
		config: e,
		nameKey: n,
		chartId: g,
		isLoading: m,
		selectedBar: _,
		selectBar: C
	}), [
		e,
		n,
		g,
		m,
		_,
		C
	]);
	return /* @__PURE__ */ (0, Y.jsx)(nr, {
		value: T,
		children: /* @__PURE__ */ (0, Y.jsxs)(s, {
			className: i,
			config: e,
			children: [/* @__PURE__ */ (0, Y.jsx)(v, { isLoading: m }), /* @__PURE__ */ (0, Y.jsxs)(Yn, {
				id: g,
				data: m ? x : w,
				innerRadius: u,
				outerRadius: d,
				startAngle: S.startAngle,
				endAngle: S.endAngle,
				cx: S.cx,
				cy: S.cy,
				...a,
				children: [
					l != null && l > 0 && /* @__PURE__ */ (0, Y.jsx)(y, {
						type: "number",
						domain: [0, l],
						tick: !1,
						axisLine: !1
					}),
					h && /* @__PURE__ */ (0, Y.jsx)(o, { variant: h }),
					r,
					m && /* @__PURE__ */ (0, Y.jsx)(dr, {}),
					/* @__PURE__ */ (0, Y.jsx)("defs", { children: /* @__PURE__ */ (0, Y.jsx)(cr, {
						config: e,
						chartId: g
					}) })
				]
			})]
		})
	});
}
function ir({ dataKey: e, cornerRadius: t = Qn, barSize: n = $n, showBackground: r = !0, isClickable: i = !1, radialBarProps: a }) {
	let { nameKey: o, isLoading: s, selectedBar: c, selectBar: l } = rr();
	return s ? null : /* @__PURE__ */ (0, Y.jsx)(Vn, {
		dataKey: e,
		cornerRadius: t,
		barSize: n,
		background: r,
		className: "drop-shadow-sm",
		style: i ? { cursor: "pointer" } : void 0,
		onClick: (t, n) => {
			if (!i) return;
			let r = t, a = r?.[o] ?? String(n), s = Number(r?.[e] ?? 0);
			l(c === a ? null : a, s);
		},
		shape: (e) => {
			let t = e[o], n = c === null || c === t;
			return /* @__PURE__ */ (0, Y.jsx)(C, {
				...e,
				opacity: i && !n ? .15 : 1,
				className: "transition-opacity duration-200"
			});
		},
		...a
	});
}
function ar({ variant: e, roundness: t, defaultIndex: n }) {
	let { nameKey: r, isLoading: i } = rr();
	return i ? null : /* @__PURE__ */ (0, Y.jsx)(f, {
		defaultIndex: n,
		cursor: !1,
		content: /* @__PURE__ */ (0, Y.jsx)(p, {
			nameKey: r,
			hideLabel: !0,
			roundness: t,
			variant: e
		})
	});
}
function or({ variant: e, align: t = "center", verticalAlign: n = "bottom", isClickable: r = !1 }) {
	let { nameKey: i, isLoading: a, selectedBar: o, selectBar: s } = rr();
	return a ? null : /* @__PURE__ */ (0, Y.jsx)(l, {
		verticalAlign: n,
		align: t,
		content: /* @__PURE__ */ (0, Y.jsx)(u, {
			selected: o,
			onSelectChange: s,
			isClickable: r,
			nameKey: i,
			variant: e
		})
	});
}
function sr(e) {
	switch (e) {
		case "semi": return {
			startAngle: 180,
			endAngle: 0,
			cx: "50%",
			cy: "70%"
		};
		default: return {
			startAngle: 90,
			endAngle: -270,
			cx: "50%",
			cy: "50%"
		};
	}
}
var cr = ({ config: e, chartId: t }) => /* @__PURE__ */ (0, Y.jsx)(Y.Fragment, { children: Object.entries(e).map(([e, n]) => {
	let r = fe(n);
	return /* @__PURE__ */ (0, Y.jsx)("linearGradient", {
		id: `${t}-radial-colors-${e}`,
		x1: "0",
		y1: "0",
		x2: "1",
		y2: "1",
		children: r === 1 ? /* @__PURE__ */ (0, Y.jsxs)(Y.Fragment, { children: [/* @__PURE__ */ (0, Y.jsx)("stop", {
			offset: "0%",
			stopColor: `var(--color-${e}-0)`
		}), /* @__PURE__ */ (0, Y.jsx)("stop", {
			offset: "100%",
			stopColor: `var(--color-${e}-0)`
		})] }) : Array.from({ length: r }, (t, n) => {
			let i = `${n / (r - 1) * 100}%`;
			return /* @__PURE__ */ (0, Y.jsx)("stop", {
				offset: i,
				stopColor: `var(--color-${e}-${n}, var(--color-${e}-0))`
			}, i);
		})
	}, `${t}-radial-colors-${e}`);
}) });
function lr() {
	return Array.from({ length: er }, (e, t) => ({
		name: `loading${t}`,
		value: 40 + Math.random() * 60
	}));
}
function ur(e) {
	let [t, n] = (0, B.useState)(0);
	return (0, B.useEffect)(() => {
		if (!e) return;
		let t = setInterval(() => {
			n((e) => e + 1);
		}, tr);
		return () => clearInterval(t);
	}, [e]), (0, B.useMemo)(() => lr(), [t]);
}
var dr = () => /* @__PURE__ */ (0, Y.jsx)(Vn, {
	dataKey: "value",
	cornerRadius: Qn,
	barSize: $n,
	background: !0,
	isAnimationActive: !0,
	animationDuration: tr,
	animationEasing: "ease-in-out",
	shape: (e) => /* @__PURE__ */ (0, Y.jsx)(C, {
		...e,
		fill: "currentColor",
		fillOpacity: .25
	})
});
X.RadialBar = ir, X.Tooltip = ar, X.Legend = or;
//#endregion
//#region src/react/stats/radial-card.tsx
var fr = [
	"bg-chart-1",
	"bg-chart-2",
	"bg-chart-3",
	"bg-chart-4",
	"bg-chart-5",
	"bg-chart-6"
], pr = [
	"aria-pressed:bg-chart-1/10 aria-pressed:ring-chart-1",
	"aria-pressed:bg-chart-2/10 aria-pressed:ring-chart-2",
	"aria-pressed:bg-chart-3/10 aria-pressed:ring-chart-3",
	"aria-pressed:bg-chart-4/10 aria-pressed:ring-chart-4",
	"aria-pressed:bg-chart-5/10 aria-pressed:ring-chart-5",
	"aria-pressed:bg-chart-6/10 aria-pressed:ring-chart-6"
];
function mr({ title: e, rows: t, empty: n, unit: i = "个视频" }) {
	let [a, o] = (0, B.useState)(-1), [s, l] = (0, B.useState)(-1), u = At(t);
	if (!u.length) return /* @__PURE__ */ (0, Y.jsx)(c, {
		title: e,
		children: n
	});
	let f = s >= 0 ? s : a, p = u.reduce((e, t) => e + t.value, 0), m = u[f], h = (e) => o((t) => t === e ? -1 : e), g = kt(u.map((e) => e.value)), _ = u.map((e, t) => ({
		slice: We(t),
		value: e.value,
		arc: Dt(e.value, g)
	}));
	return /* @__PURE__ */ (0, Y.jsxs)("section", {
		className: r,
		children: [
			/* @__PURE__ */ (0, Y.jsxs)("header", {
				className: "flex flex-wrap items-end justify-between gap-x-4 gap-y-1",
				children: [/* @__PURE__ */ (0, Y.jsxs)("span", {
					className: "flex min-w-0 flex-col gap-1",
					children: [/* @__PURE__ */ (0, Y.jsxs)("h3", {
						className: "flex items-center gap-1.5 text-title-2-medium wrap-anywhere text-text-primary",
						children: [m?.mark ? /* @__PURE__ */ (0, Y.jsx)(lt, { mark: m.mark }) : null, m ? m.name : e]
					}), /* @__PURE__ */ (0, Y.jsx)("b", {
						className: "text-display-4-medium tabular-nums text-text-primary",
						children: (m ? m.value : p).toLocaleString()
					})]
				}), /* @__PURE__ */ (0, Y.jsx)("small", {
					className: "text-caption-1-regular text-text-secondary",
					children: i
				})]
			}),
			/* @__PURE__ */ (0, Y.jsx)("div", {
				role: "img",
				"aria-label": e,
				onPointerLeave: () => l(-1),
				children: /* @__PURE__ */ (0, Y.jsxs)(X, {
					data: _,
					nameKey: "slice",
					config: Ue(u.map((e) => e.name)),
					max: g,
					innerRadius: "22%",
					className: "aspect-auto h-75 max-sm:h-65",
					children: [/* @__PURE__ */ (0, Y.jsx)(X.RadialBar, {
						dataKey: "arc",
						barSize: Ot(u.length),
						radialBarProps: {
							shape: (e) => /* @__PURE__ */ (0, Y.jsx)(C, {
								...e,
								opacity: f >= 0 && f !== e.index ? .3 : 1,
								className: "cursor-pointer transition-opacity duration-200"
							}),
							onClick: (e, t) => h(t),
							onMouseEnter: (e, t) => l(t)
						}
					}), /* @__PURE__ */ (0, Y.jsx)(d, {
						nameKey: "slice",
						valueKey: "value",
						hideLabel: !0
					})]
				})
			}),
			/* @__PURE__ */ (0, Y.jsx)("div", {
				className: "inline-grid w-full grid-cols-3 gap-2 max-sm:grid-cols-2",
				children: u.map((e, t) => /* @__PURE__ */ (0, Y.jsxs)("button", {
					type: "button",
					"aria-pressed": a === t,
					onClick: () => h(t),
					onPointerEnter: () => l(t),
					onPointerLeave: () => l(-1),
					onFocus: () => l(t),
					onBlur: () => l(-1),
					className: `flex min-w-0 cursor-pointer flex-col items-start gap-1 rounded-xl bg-background-tertiary-default p-2.5 text-left outline-none aria-pressed:ring-1 aria-pressed:ring-inset focus-visible:ring-2 focus-visible:ring-border-focus-ring ${pr[t % 6]}`,
					children: [
						/* @__PURE__ */ (0, Y.jsxs)("span", {
							className: "flex min-w-0 max-w-full items-start gap-1.5 text-caption-1-regular text-text-secondary",
							children: [/* @__PURE__ */ (0, Y.jsx)("i", {
								"aria-hidden": !0,
								className: `mt-0.5 size-3 shrink-0 rounded-sm ${fr[t % 6]}`
							}), /* @__PURE__ */ (0, Y.jsxs)("span", {
								className: "inline-flex min-w-0 items-start gap-1.5 wrap-anywhere",
								children: [e.mark ? /* @__PURE__ */ (0, Y.jsx)(lt, { mark: e.mark }) : null, e.name]
							})]
						}),
						/* @__PURE__ */ (0, Y.jsx)("b", {
							className: "text-title-2-medium tabular-nums text-text-primary",
							children: e.value.toLocaleString()
						}),
						e.bytes == null ? null : /* @__PURE__ */ (0, Y.jsx)("small", {
							className: "text-caption-1-regular text-text-secondary",
							children: z(e.bytes)
						})
					]
				}, We(t)))
			})
		]
	});
}
//#endregion
//#region src/react/stats/stats-page.tsx
var hr = Ft("媒体库与入库"), gr = 10, _r = i[5], vr = i[4], yr = `${gt()} flex flex-col gap-4`, br = "添加媒体目录或关注来源后，这里会显示馆藏统计。", xr = "补全资料或添加标签后，这里会显示馆藏中的内容标签。", Sr = "开始播放后，这里会显示最近的真实观看证据。", Cr = "补充作品资料或手动添加标签后，这里会显示各个标签来源对应的视频数量。", wr = "添加媒体目录后，这里会显示存储空间。", Tr = "把媒体目录归进媒体库后，这里会按库显示视频数。", Er = "探测时长后，这里会显示时长分布。", Dr = "探测画质后，这里会显示画质分布。", Or = "开始播放后，这里会显示播放落在一周的哪些时段。", kr = "开始播放后，这里会显示每个作品播了几次。", Ar = (e, t) => Math.min(Math.max(e, 0), t);
function Z({ term: e, value: t }) {
	return /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: "flex min-h-16 min-w-0 flex-col gap-1.5 rounded-2lg bg-background-primary-default p-3",
		children: [/* @__PURE__ */ (0, Y.jsx)("span", {
			className: "text-caption-1-regular text-text-secondary",
			children: e
		}), /* @__PURE__ */ (0, Y.jsx)("b", {
			className: "text-title-3-medium tabular-nums text-text-primary",
			children: R(t)
		})]
	});
}
function Q({ term: e, value: t, total: n }) {
	let r = Math.max(n, 1);
	return /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: "flex flex-col gap-1.5 border-b border-separator-border py-3 last:border-b-0",
		children: [/* @__PURE__ */ (0, Y.jsxs)("p", {
			className: "flex items-baseline justify-between gap-3 text-body-2-regular text-text-primary",
			children: [/* @__PURE__ */ (0, Y.jsx)("span", { children: e }), /* @__PURE__ */ (0, Y.jsxs)("b", {
				className: "tabular-nums",
				children: [R(t), bt(t) ? /* @__PURE__ */ (0, Y.jsx)("span", {
					className: "ml-1.5 text-caption-1-regular text-text-secondary",
					children: wt(t, n)
				}) : null]
			})]
		}), /* @__PURE__ */ (0, Y.jsx)(L, {
			label: `${e}：${R(t)} / ${n.toLocaleString()}`,
			value: bt(t) ? Ar(t, r) : 0,
			max: r
		})]
	});
}
function jr({ term: e, figure: t, unit: n }) {
	return /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: "flex shrink-0 flex-col gap-0.5 pb-5 md:w-64 md:pr-6 md:pb-0",
		children: [
			/* @__PURE__ */ (0, Y.jsx)("span", {
				className: "text-caption-1-regular text-text-secondary",
				children: e
			}),
			/* @__PURE__ */ (0, Y.jsx)("b", {
				className: "text-display-4-medium tabular-nums text-text-primary",
				children: t
			}),
			/* @__PURE__ */ (0, Y.jsx)("span", {
				className: "text-body-2-regular text-text-secondary",
				children: n
			})
		]
	});
}
function Mr({ headline: e, children: t }) {
	return /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: `${yr} md:flex-row md:gap-6`,
		children: [e, /* @__PURE__ */ (0, Y.jsx)("div", {
			className: "min-w-0 grow",
			children: t
		})]
	});
}
function Nr({ data: e }) {
	return e.by_loc.reduce((e, t) => e + t.videos, 0) ? /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: "flex flex-col gap-5",
		children: [/* @__PURE__ */ (0, Y.jsxs)("div", {
			className: "inline-grid w-full gap-5 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, Y.jsx)(mr, {
				title: "网盘与本地",
				empty: br,
				rows: e.by_loc.map((e) => ({
					name: tt[e.k] ?? e.k,
					value: e.videos,
					bytes: e.bytes,
					mark: nt[e.k] || "database"
				}))
			}), /* @__PURE__ */ (0, Y.jsx)(mr, {
				title: "媒体库",
				empty: Tr,
				rows: e.by_library.map((e) => ({
					name: e.name,
					value: e.videos,
					bytes: e.bytes,
					mark: nt[e.icon] || e.icon || "database"
				}))
			})]
		}), /* @__PURE__ */ (0, Y.jsxs)("div", {
			className: "inline-grid w-full gap-5 md:grid-cols-2 xl:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, Y.jsx)(n, {
					title: "时长",
					unit: "个视频",
					series: "视频",
					color: _r,
					rows: xt(e.by_length),
					empty: Er
				}),
				/* @__PURE__ */ (0, Y.jsx)(n, {
					title: "画质",
					unit: "个视频",
					series: "视频",
					color: _r,
					rows: ht(e.by_quality),
					empty: Dr
				}),
				/* @__PURE__ */ (0, Y.jsx)(n, {
					title: "文件类型",
					unit: "个条目",
					series: "条目",
					color: _r,
					layout: "horizontal",
					rows: Ct(e.by_medium),
					empty: br
				})
			]
		})]
	}) : /* @__PURE__ */ (0, Y.jsx)(I, {
		icon: rt,
		title: "还没有视频",
		actions: /* @__PURE__ */ (0, Y.jsxs)(Y.Fragment, { children: [/* @__PURE__ */ (0, Y.jsx)(F, {
			variant: "secondary",
			href: "/subscriptions?tab=add",
			size: "small",
			children: "添加关注"
		}), /* @__PURE__ */ (0, Y.jsx)(F, {
			variant: "primary",
			href: hr,
			size: "small",
			children: "添加媒体"
		})] }),
		children: br
	});
}
function Pr({ data: t }) {
	return /* @__PURE__ */ (0, Y.jsxs)(Y.Fragment, { children: [/* @__PURE__ */ (0, Y.jsx)(e, {
		activity: t.play_activity,
		title: "播放时间",
		dailyTitle: "每日播放",
		words: {
			unit: "个作品",
			series: "作品",
			cellUnit: "个作品"
		},
		tone: 5,
		empty: Or
	}), /* @__PURE__ */ (0, Y.jsx)(n, {
		title: "播放次数",
		unit: "个作品",
		series: "作品",
		color: vr,
		rows: Mt(t.replays),
		empty: kr
	})] });
}
function Fr({ attribution: e }) {
	let t = e.videos;
	return /* @__PURE__ */ (0, Y.jsxs)("div", {
		className: "flex flex-col",
		children: [
			/* @__PURE__ */ (0, Y.jsx)(Q, {
				term: "有创作者",
				value: e.creator,
				total: t
			}),
			/* @__PURE__ */ (0, Y.jsx)(Q, {
				term: "有番号",
				value: e.code,
				total: t
			}),
			/* @__PURE__ */ (0, Y.jsx)(Q, {
				term: "有厂牌",
				value: e.studio,
				total: t
			}),
			/* @__PURE__ */ (0, Y.jsx)(Q, {
				term: "已抽帧",
				value: e.thumb,
				total: t
			}),
			/* @__PURE__ */ (0, Y.jsx)(Q, {
				term: "已探测时长",
				value: e.duration,
				total: t
			})
		]
	});
}
function Ir({ volume: e }) {
	let t = e.total, n = e.used ?? 0;
	return /* @__PURE__ */ (0, Y.jsxs)("article", {
		className: "flex min-w-0 flex-col gap-1.5 border-b border-separator-border py-3 last:border-b-0",
		children: [
			/* @__PURE__ */ (0, Y.jsxs)("header", {
				className: "flex items-baseline justify-between gap-3 text-body-2-regular text-text-primary",
				children: [/* @__PURE__ */ (0, Y.jsx)("h3", {
					className: "min-w-0 break-words",
					children: e.label
				}), t == null ? e.online ? /* @__PURE__ */ (0, Y.jsx)(ut, { children: "容量未取得" }) : /* @__PURE__ */ (0, Y.jsx)(Wt, { online: !1 }) : /* @__PURE__ */ (0, Y.jsxs)("b", {
					className: "whitespace-nowrap tabular-nums",
					children: [z(n), /* @__PURE__ */ (0, Y.jsx)("span", {
						className: "ml-1.5 text-caption-1-regular text-text-secondary",
						children: wt(n, t)
					})]
				})]
			}),
			t == null ? null : /* @__PURE__ */ (0, Y.jsx)(L, {
				label: `${e.label}空间使用率`,
				value: Ar(n, Math.max(t, 1)),
				max: Math.max(t, 1)
			}),
			/* @__PURE__ */ (0, Y.jsxs)("p", {
				className: "flex justify-between gap-3 text-caption-1-regular text-text-secondary",
				children: [/* @__PURE__ */ (0, Y.jsx)("span", {
					className: "min-w-0 break-words",
					children: e.root ?? "未映射"
				}), t == null ? null : /* @__PURE__ */ (0, Y.jsx)("span", {
					className: "whitespace-nowrap tabular-nums",
					children: `可用 ${z(e.free ?? 0)} · 共 ${z(t)}`
				})]
			})
		]
	});
}
function Lr({ volumes: e }) {
	return e.length ? /* @__PURE__ */ (0, Y.jsx)("div", {
		className: "flex flex-col",
		children: e.map((e) => /* @__PURE__ */ (0, Y.jsx)(Ir, { volume: e }, `${e.kind}:${e.label}`))
	}) : /* @__PURE__ */ (0, Y.jsx)(I, {
		icon: dt,
		title: "还没有存储来源",
		actions: /* @__PURE__ */ (0, Y.jsx)(F, {
			variant: "primary",
			href: hr,
			size: "small",
			children: "添加媒体"
		}),
		children: wr
	});
}
function Rr({ tags: e, tagLabel: t, onTag: n, hasMedia: r }) {
	return e.length ? /* @__PURE__ */ (0, Y.jsx)(h, {
		previewCount: gr,
		className: "inline-grid w-full gap-x-6 gap-y-1 sm:grid-cols-2",
		children: e.map((e, r) => /* @__PURE__ */ (0, Y.jsx)("li", {
			className: "min-w-0",
			children: /* @__PURE__ */ (0, Y.jsxs)("button", {
				type: "button",
				onClick: () => n(e.k),
				className: "flex min-h-11 w-full min-w-0 cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring",
				children: [
					/* @__PURE__ */ (0, Y.jsx)("span", {
						className: "w-6 shrink-0 text-caption-1-regular tabular-nums text-text-secondary",
						children: r + 1
					}),
					/* @__PURE__ */ (0, Y.jsx)("span", {
						className: "min-w-0 grow text-body-2-regular break-words text-text-primary",
						children: t(e.k)
					}),
					/* @__PURE__ */ (0, Y.jsx)("b", {
						className: "text-body-2-medium tabular-nums text-text-secondary",
						children: e.n.toLocaleString()
					})
				]
			})
		}, `${e.k}:${r}`))
	}) : /* @__PURE__ */ (0, Y.jsx)(I, {
		icon: St,
		title: "还没有内容标签",
		actions: /* @__PURE__ */ (0, Y.jsx)(F, {
			variant: "secondary",
			href: r ? "/data-cleanup" : "/settings/library",
			size: "small",
			children: r ? "补全资料" : "添加媒体"
		}),
		children: xr
	});
}
function zr({ rows: e, hasMedia: t }) {
	return e.length ? /* @__PURE__ */ (0, Y.jsx)("div", {
		className: "flex flex-col gap-5",
		children: e.map((e) => {
			let t = zt(e);
			return /* @__PURE__ */ (0, Y.jsxs)("article", {
				className: "flex flex-wrap items-center gap-x-6 gap-y-2",
				children: [/* @__PURE__ */ (0, Y.jsxs)("div", {
					className: "min-w-0 grow basis-64",
					children: [/* @__PURE__ */ (0, Y.jsx)("h3", {
						className: "min-w-0 text-body-2-medium text-text-primary",
						children: /* @__PURE__ */ (0, Y.jsx)("a", {
							href: Et(e),
							"data-middle-truncate": !0,
							className: "block max-w-full overflow-hidden whitespace-nowrap hover:underline",
							children: e.name
						})
					}), /* @__PURE__ */ (0, Y.jsxs)("p", {
						className: "flex flex-wrap gap-3 text-caption-1-regular text-text-secondary",
						children: [e.creator ? /* @__PURE__ */ (0, Y.jsx)("span", {
							className: "min-w-0 wrap-anywhere",
							children: e.creator
						}) : null, /* @__PURE__ */ (0, Y.jsx)("span", { children: Rt(e) })]
					})]
				}), /* @__PURE__ */ (0, Y.jsxs)("div", {
					className: "min-w-0 basis-40",
					children: [/* @__PURE__ */ (0, Y.jsx)(L, {
						label: `真实观看 ${t.toFixed(0)}%`,
						value: t
					}), /* @__PURE__ */ (0, Y.jsx)("small", {
						className: "mt-1.5 block text-caption-1-regular text-text-secondary",
						children: `真实 ${t.toFixed(0)}% · 到达 ${jt(e).toFixed(0)}%`
					})]
				})]
			}, `${e.kind}:${e.id}`);
		})
	}) : /* @__PURE__ */ (0, Y.jsx)(I, {
		icon: It,
		title: "还没有观看记录",
		actions: /* @__PURE__ */ (0, Y.jsx)(F, {
			variant: "secondary",
			href: t ? "/" : "/settings/library",
			size: "small",
			children: t ? "浏览馆藏" : "添加媒体"
		}),
		children: Sr
	});
}
function Br({ sources: e, videos: t }) {
	return e.length ? /* @__PURE__ */ (0, Y.jsx)("div", {
		className: "inline-grid w-full gap-x-8 gap-y-6 sm:grid-cols-2",
		children: e.map((e) => /* @__PURE__ */ (0, Y.jsxs)("article", {
			className: "flex min-w-0 flex-col gap-1.5",
			children: [
				/* @__PURE__ */ (0, Y.jsxs)("header", {
					className: "flex items-baseline justify-between gap-3",
					children: [/* @__PURE__ */ (0, Y.jsx)("h3", {
						className: "min-w-0 text-body-2-medium break-words text-text-primary",
						children: e.k
					}), /* @__PURE__ */ (0, Y.jsxs)("b", {
						className: "text-body-2-medium whitespace-nowrap text-text-primary",
						children: [e.assets.toLocaleString(), /* @__PURE__ */ (0, Y.jsx)("small", {
							className: "ml-1 text-caption-1-regular font-normal text-text-secondary",
							children: "个视频"
						})]
					})]
				}),
				/* @__PURE__ */ (0, Y.jsx)(L, {
					label: `${e.k} 覆盖视频`,
					value: Ar(e.assets, Math.max(t, 1)),
					max: Math.max(t, 1)
				}),
				/* @__PURE__ */ (0, Y.jsxs)("small", {
					className: "text-caption-1-regular text-text-secondary",
					children: [e.n.toLocaleString(), " 条标签"]
				})
			]
		}, e.k))
	}) : /* @__PURE__ */ (0, Y.jsx)(I, {
		icon: St,
		title: "还没有标签来源",
		actions: /* @__PURE__ */ (0, Y.jsx)(F, {
			variant: "secondary",
			href: t ? "/data-cleanup" : "/settings/library",
			size: "small",
			children: t ? "补全资料" : "添加媒体"
		}),
		children: Cr
	});
}
function $({ id: e, label: t, figure: n, detail: r, icon: i, accent: a }) {
	return /* @__PURE__ */ (0, Y.jsx)(P, {
		id: e,
		className: Ut({
			interactive: !0,
			selectable: !0
		}),
		children: /* @__PURE__ */ (0, Y.jsx)(Ht, {
			label: t,
			icon: i,
			accent: a,
			figure: n,
			footer: r
		})
	});
}
function Vr(e) {
	let t = Lt({
		queryKey: st,
		queryFn: ({ signal: e }) => yt(e)
	}), n = t.data;
	if (!n) return /* @__PURE__ */ (0, Y.jsx)(Bt, { children: /* @__PURE__ */ (0, Y.jsx)(it, {
		tone: "error",
		title: "馆藏统计读取失败",
		children: t.error ? vt(t.error) : "未取得统计数据，请刷新页面重试。"
	}) });
	let r = n.consumption, i = n.storage_summary, a = n.by_loc.reduce((e, t) => e + t.videos, 0), o = n.by_loc.reduce((e, t) => e + t.bytes, 0), s = bt(n.tag_cov) ? wt(n.tag_cov, n.attribution.videos) : "未取得", c = `${R(n.tag_cov)} / ${n.attribution.videos.toLocaleString()}`;
	return /* @__PURE__ */ (0, Y.jsxs)(Bt, { children: [
		/* @__PURE__ */ (0, Y.jsx)("p", {
			className: "text-caption-1-regular text-text-secondary",
			children: `数据库中的当前统计 · ${a.toLocaleString()} 个视频 · ${z(o)}`
		}),
		/* @__PURE__ */ (0, Y.jsxs)($e, {
			defaultSelectedKey: "inventory",
			className: "flex flex-col gap-4",
			children: [
				/* @__PURE__ */ (0, Y.jsxs)(et, {
					"aria-label": "统计视图",
					className: Vt,
					children: [
						/* @__PURE__ */ (0, Y.jsx)($, {
							id: "inventory",
							label: "馆藏视频",
							icon: pt,
							accent: 0,
							figure: a.toLocaleString(),
							detail: z(o)
						}),
						/* @__PURE__ */ (0, Y.jsx)($, {
							id: "viewing",
							label: "看过",
							icon: ft,
							accent: 1,
							figure: R(r.played),
							detail: Tt(r.play_seconds)
						}),
						/* @__PURE__ */ (0, Y.jsx)($, {
							id: "coverage",
							label: "内容标签",
							icon: St,
							accent: 2,
							figure: s,
							detail: c
						}),
						/* @__PURE__ */ (0, Y.jsx)($, {
							id: "storage",
							label: "使用空间",
							icon: dt,
							accent: 3,
							figure: `${i.online.toLocaleString()} 个卷`,
							detail: i.measured ? `已用 ${z(i.used)}` : "容量未取得"
						})
					]
				}),
				/* @__PURE__ */ (0, Y.jsx)(N, {
					id: "inventory",
					children: /* @__PURE__ */ (0, Y.jsx)(Nr, {
						data: n,
						...e
					})
				}),
				/* @__PURE__ */ (0, Y.jsxs)(N, {
					id: "viewing",
					className: "flex flex-col gap-5",
					children: [/* @__PURE__ */ (0, Y.jsx)(Mr, {
						headline: /* @__PURE__ */ (0, Y.jsx)(jr, {
							term: "观看",
							figure: R(r.played),
							unit: "个作品有播放记录"
						}),
						children: /* @__PURE__ */ (0, Y.jsxs)("div", {
							className: "inline-grid w-full gap-3 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, Y.jsx)(Z, {
									term: "馆藏观看",
									value: r.library_played
								}),
								/* @__PURE__ */ (0, Y.jsx)(Z, {
									term: "在线直接观看",
									value: r.online_played
								}),
								/* @__PURE__ */ (0, Y.jsx)(Z, {
									term: "高潮计数",
									value: r.o_total
								}),
								/* @__PURE__ */ (0, Y.jsx)(Z, {
									term: "快进扫过",
									value: r.skimmed
								}),
								/* @__PURE__ */ (0, Y.jsx)(Z, {
									term: "喜欢",
									value: r.liked
								}),
								/* @__PURE__ */ (0, Y.jsx)(Z, {
									term: "明确不喜欢",
									value: r.dislike
								}),
								/* @__PURE__ */ (0, Y.jsx)(Z, {
									term: "看过了",
									value: r.seen
								}),
								/* @__PURE__ */ (0, Y.jsx)(Z, {
									term: "回收站",
									value: r.trash
								})
							]
						})
					}), /* @__PURE__ */ (0, Y.jsx)(Pr, { data: n })]
				}),
				/* @__PURE__ */ (0, Y.jsx)(N, {
					id: "coverage",
					children: /* @__PURE__ */ (0, Y.jsx)(Mr, {
						headline: /* @__PURE__ */ (0, Y.jsx)(jr, {
							term: "内容标签覆盖",
							figure: s,
							unit: c
						}),
						children: /* @__PURE__ */ (0, Y.jsx)(Fr, { attribution: n.attribution })
					})
				}),
				/* @__PURE__ */ (0, Y.jsx)(N, {
					id: "storage",
					children: /* @__PURE__ */ (0, Y.jsx)(Mr, {
						headline: /* @__PURE__ */ (0, Y.jsx)(jr, {
							term: "使用空间",
							figure: i.measured.toLocaleString(),
							unit: "个卷已取得容量"
						}),
						children: /* @__PURE__ */ (0, Y.jsx)(Lr, {
							volumes: n.storage_volumes,
							...e
						})
					})
				})
			]
		}),
		/* @__PURE__ */ (0, Y.jsxs)($e, {
			defaultSelectedKey: "tags",
			className: `${gt({ padding: "none" })} flex flex-col`,
			children: [
				/* @__PURE__ */ (0, Y.jsx)("div", {
					className: "px-4 pt-3",
					children: /* @__PURE__ */ (0, Y.jsxs)(ct, {
						"aria-label": "统计维度",
						className: ot,
						children: [
							/* @__PURE__ */ (0, Y.jsx)(P, {
								id: "tags",
								className: at,
								children: "内容标签"
							}),
							/* @__PURE__ */ (0, Y.jsx)(P, {
								id: "recent",
								className: at,
								children: "最近看过"
							}),
							/* @__PURE__ */ (0, Y.jsx)(P, {
								id: "sources",
								className: at,
								children: "标签来源"
							})
						]
					})
				}),
				/* @__PURE__ */ (0, Y.jsx)(N, {
					id: "tags",
					className: "px-4 pt-3.5 pb-4",
					children: /* @__PURE__ */ (0, Y.jsx)(Rr, {
						tags: n.top_tags,
						hasMedia: a > 0,
						...e
					})
				}),
				/* @__PURE__ */ (0, Y.jsx)(N, {
					id: "recent",
					className: "px-4 pt-3.5 pb-4",
					children: /* @__PURE__ */ (0, Y.jsx)(zr, {
						rows: n.recent,
						hasMedia: a > 0
					})
				}),
				/* @__PURE__ */ (0, Y.jsx)(N, {
					id: "sources",
					className: "px-4 pt-3.5 pb-4",
					children: /* @__PURE__ */ (0, Y.jsx)(Br, {
						sources: n.tag_source,
						videos: n.attribution.videos
					})
				})
			]
		})
	] });
}
//#endregion
export { Vr as StatsPage };

//# debugId=82936c02-5b67-4889-8313-b4254447f6e3