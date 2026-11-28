(function() {
	try {
		var e = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "623a1edd-94bf-4be7-8220-8fa31601c280", e._sentryDebugIdIdentifier = "sentry-dbid-623a1edd-94bf-4be7-8220-8fa31601c280");
	} catch {}
})();
import { $2ec61d1d4f780267$export$a8a3e93435678ff9 as e, $542a13ca2fa5b484$export$5b6b19405a83ff9d as t, $72abaeab4d80592f$export$78efe591171d7d45 as n, $ea3928288112382f$export$439d29a4e110a164 as r, $f2ff30fde7b014be$export$3ddf2d174ce01153 as i, $fe21c36db05242bb$export$a98f0dcb43a68a25 as a, $fe21c36db05242bb$export$d7b12c4107be0d61 as o, ACCENTS as s, AILibrarySettings as c, ActionSpinner as l, ActivityStatus as u, AnimatedItems as d, AnimatedNumber as f, ApiError as p, Button as m, ButtonLink as h, CLOUD_LOCATIONS as g, CLOUD_PROXY_HELP as _, CONFIGURATION_KEY as v, CONFIGURATION_SECTIONS as y, CONFIGURATION_URL as b, CREDENTIAL_STATE as x, Cell as S, ChartBackground as C, ChartContainer as w, ChartLegend as T, ChartLegendContent as E, ChartTip as D, ChartTooltip as O, ChartTooltipContent as ee, Checkbox as k, Chip as A, CommandSteps as te, Curve as ne, DATA_ITEM_GRAPHICAL_ITEM_ID_ATTRIBUTE_NAME as re, DATA_ITEM_INDEX_ATTRIBUTE_NAME as ie, DataLabelColorsContextProvider as ae, DataLabelThemeContextProvider as oe, DefaultZIndexes as se, Disclosure as ce, EDITION_TONE as le, ENTRY_LINKS_HELP as ue, ENTRY_LINKS_HINT as de, EmptyState as fe, ErrorText as j, Eu as pe, EvilBarChart as me, ExternalLink as he, FOLLOW_CREDENTIALS_KEY as ge, FOLLOW_CREDENTIALS_KEY$1 as _e, FOLLOW_INITIAL_RANGE_OPTIONS as ve, Fact as M, FactList as ye, FieldLabel as be, FillObjectDefinition as xe, Footer as N, Help as P, Input as F, L1 as Se, LIBRARY_FOLDER_HELP as Ce, LIBRARY_PROCESSING_KEY as we, Label as Te, LabelList as Ee, LabelListFromLabelProp as De, Layer as Oe, LinkButton as ke, LoadingIndicator as Ae, M6 as je, MEDIA_PROCESSING_KEY as Me, MEDIA_PROCESSING_URL as Ne, MEDIA_SOURCE_ICONS as Pe, MENU_POPOVER_SURFACE as Fe, NavigationOrderRows as Ie, Note as I, PICK_FOLDER_URL as Le, POLICY_COLUMNS as Re, POLICY_COVER_NOTE as ze, POLICY_MATRIX as Be, POLICY_SUMMARY as Ve, PathLine as He, PolarLabelContextProvider as Ue, PolarLabelListContextProvider as We, ProcessingMode as Ge, Progress as Ke, QueryErrorNote as qe, RELEASE_NOTICE_EVENT as Je, REPAIR_CENTER_PATH as Ye, RegisterGraphicalItemId as Xe, Rows as L, SCHEDULES as Ze, SCRAPING_KEY as Qe, SCRAPING_SETTINGS_URL as $e, SEGMENT as et, SEGMENTED_TRACK as tt, SETTINGS_KEY as nt, SETTINGS_URL as rt, Section as R, SectionSkeleton as it, SectionToc as at, Sector as ot, SegmentedRadioGroup as st, Select as ct, Select$1 as lt, SelectItem as ut, SelectItem$1 as dt, SetPolarGraphicalItem as ft, SetPolarLegendPayload as pt, SetTooltipEntrySettings as mt, SettingsCard as ht, SettingsRow as z, Shape as gt, SiteLabel as _t, SortableBoardTabs as vt, SourceLabel as yt, SourceMark as bt, Stack as B, StatusLabel as xt, Switch as V, THUMBNAIL_JOBS_KEY as St, TIP_SWATCH as Ct, TaskCenterLink as wt, TaskProgress as Tt, Text as Et, Textarea as Dt, Uz as Ot, ZIndexLayer as kt, __toESM as At, _p as jt, activityKind as Mt, adaptEventsOfChild as Nt, apiGet as H, apiSend as U, appSettingsStore as Pt, applyLabelTheme as Ft, arrayTooltipSearcher as It, bodyFieldErrors as Lt, boundedPreference as Rt, busyProps as W, cardClass as zt, checkClientUpdates as Bt, cloudProxySkeleton as Vt, clsx as Ht, cn$1 as Ut, codedText as G, configurationDescriptionKey as Wt, confirmModal as Gt, createSelector as Kt, credentialDone as qt, credentialsSkeleton as Jt, cx as Yt, d6 as Xt, devicesSkeleton as Zt, editionName as Qt, errorMessage as K, fetchConfiguration as $t, fetchCredentials as en, fetchLibraryProcessing as tn, fetchMediaProcessing as nn, fetchSettings as rn, fetchSources as an, fetchThumbnailJobs as on, filledShapeLabelColors as sn, findAllByType as cn, fmtSize as ln, get as un, getActiveStyleOverrides as dn, getClassNameFromUnknown as fn, getColorGraphicalItems as pn, getColorsCount as mn, getEntryFillId as hn, getFillUrl as gn, getIndexedEntryFillObject as _n, getMaxRadius as vn, getOwnStyles as yn, getPercentValue as bn, getTooltipNameProp as xn, getValueByDataKey as Sn, h8 as Cn, hasOwnColors as wn, i2 as Tn, indexersSkeleton as En, interfaceLanguage as Dn, interpolate as On, isDataAttribute as kn, isNumber as An, isSvgElementPropKey as jn, javBrowserSkeleton as Mn, jobText as Nn, joinList as Pn, l1 as Fn, ledgerBackupsSkeleton as In, localizedFact as Ln, matchAppend as Rn, mathSign as zn, momentText as Bn, motion as Vn, overlayHost as Hn, peachHistory$1 as Un, pickServerFolder as Wn, polarToCartesian as Gn, pollUntil as Kn, previewLibraryColor as qn, processingActive as Jn, providerIcon as Yn, queryClient as Xn, randomId as Zn, readEntryFill as Qn, rememberShape as $n, require_jsx_runtime as er, require_react as tr, resolveDefaultProps as nr, restartEffectText as rr, saveCredential as ir, schedulePollInterval as ar, sectionTitle as or, selectActiveTooltipDataKey as sr, selectActiveTooltipGraphicalItemId as cr, selectActiveTooltipIndex as lr, selectChartDataAndAlwaysIgnoreIndexes as ur, selectChartOffsetInternal as dr, serverLabel as q, serverLabelList as fr, serverText as pr, settingsPath as mr, shellNavigate as hr, sourceDefaultCost as gr, spinnerHtml as _r, splitFill as vr, stageText as yr, svgPropertiesNoEvents as br, svgPropertiesNoEventsFromUnknown as xr, t as J, t3 as Sr, tone as Cr, translateWithNodes as wr, useAction as Y, useAnimationCallbacks as Tr, useAppSelector as Er, useBackwardsCompatibleTheme as Dr, useClientUpdates as Or, useDataLabelThemeResolver as kr, useIndexedLabelThemeResolver as Ar, useLibraryTints as jr, useMouseClickItemDispatch as Mr, useMouseEnterItemDispatch as Nr, useMouseLeaveItemDispatch as Pr, useMutation as Fr, useOrderedLibraries as Ir, usePolarChartLayout as Lr, useQuery as X, useQueryClient as Rr, useRunSchedule as zr, useSaveSchedule as Br, useSaveSettings as Vr, useSaveThumbnailMode as Hr, useThemeFillObjects as Ur, we as Wr, withoutColors as Gr, z3 as Kr } from "./peach-app.js";
import { useCheckReceipt as qr } from "./peach-app.use-check-receipt-CVw_ZYdx.js";
import { ConnectionStatus as Jr } from "./peach-app.connection-status-BrXhLGSm.js";
import { CodeBlock as Yr } from "./peach-app.code-block-BdQewVJ0.js";
import { PolarChart as Xr, defaultPolarChartProps as Zr, selectUnfilteredPolarItems as Qr } from "./peach-app.PolarChart-CeCYLBHr.js";
import { FolderField as $r, FolderFieldLine as ei, FolderRow as ti, MEDIA_SOURCES as ni, MediaReadPolicy as ri, MediaReadPolicyHelp as ii, SourceSelect as ai, isCloudSource as oi, sourceMark as si, useFolderRows as ci } from "./peach-app.folder-rows-CDuIppaT.js";
import { BrowserIcon as li, browserIconId as ui } from "./peach-app.browser-icon-N9Od-bAf.js";
import { SourceBrowserLoginButton as di, SourceBrowserLoginStatus as fi, sourceBrowserLoginUrl as pi, useSourceBrowserLogin as mi } from "./peach-app.source-browser-login-x7L-xBDi.js";
import { SourceIcon as hi } from "./peach-app.source-view-CqeSCcU2.js";
// node_modules/recharts/es6/state/selectors/pieSelectors.js
function gi(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function _i(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? gi(Object(n), !0).forEach(function(t) {
			vi(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : gi(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function vi(e, t, n) {
	return (t = yi(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function yi(e) {
	var t = bi(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function bi(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var xi = Kt([Qr, (e, t) => t], (e, t) => e.filter((e) => e.type === "pie").find((e) => e.id === t)), Si = [], Ci = (e, t, n) => n?.length === 0 ? Si : n, wi = Kt([
	ur,
	xi,
	Ci
], (e, t, n) => {
	var r = e.chartData;
	if (t != null) {
		var i = t?.data != null && t.data.length > 0 ? t.data : r;
		if (i && i.length || n == null || (i = n.map((e) => _i(_i({}, t.presentationProps), e.props))), i != null) return i;
	}
}), Ti = Kt([
	wi,
	xi,
	Ci
], (e, t, n) => {
	if (e != null && t != null) return e.map((e, r) => {
		var i, a = Sn(e, t.nameKey, t.name), o = Qn(n == null || (i = n[r]) == null ? void 0 : i.props).color ?? Qn(e).color ?? t.fill;
		return {
			value: xn(a, t.dataKey),
			dataKey: t.dataKey,
			color: o,
			payload: e,
			type: t.legendType
		};
	});
}), Ei = Kt([
	wi,
	xi,
	Ci,
	dr
], (e, t, n, r) => {
	if (t != null && e != null) return ia({
		offset: r,
		pieSettings: t,
		displayedData: e,
		cells: n
	});
}), Z = /* @__PURE__ */ At(tr()), Di = ["key"], Oi = [
	"onMouseEnter",
	"onClick",
	"onMouseLeave"
], ki = [
	"id",
	"graphicalItems",
	"explicitStyleProps",
	"pieFillObject"
], Ai = ["id"];
function ji() {
	return ji = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, ji.apply(null, arguments);
}
function Mi(e, t) {
	if (e == null) return {};
	var n, r, i = Ni(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function Ni(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function Pi(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Q(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Pi(Object(n), !0).forEach(function(t) {
			Fi(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Pi(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Fi(e, t, n) {
	return (t = Ii(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Ii(e) {
	var t = Li(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Li(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var Ri = /* @__PURE__ */ new Set([
	"cx",
	"cy",
	"r",
	"name"
]);
function zi(e) {
	var t = {};
	for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (n === "id" || kn(n) || (!jn(n) || Ri.has(n)) && (t[n] = e[n]));
	return t;
}
var Bi = ot;
function Vi(e, t, n, r) {
	var i = n[t % n.length];
	if (i != null) {
		var a = typeof e == "object" && e ? Q(Q({}, e), {}, { fill: Qn(e).color }) : {}, o = Q(Q({}, yn(r)), yn(a)), s = wn(a) || wn(r);
		return {
			fill: s ? o.fill : i.fill,
			fillOpacity: o.fillOpacity ?? i.fillOpacity,
			stroke: s ? o.stroke : i.stroke,
			strokeOpacity: o.strokeOpacity ?? i.strokeOpacity,
			strokeWidth: o.strokeWidth ?? i.strokeWidth,
			strokeDasharray: o.strokeDasharray ?? i.strokeDasharray
		};
	}
}
function Hi(e) {
	return e.fill && e.fill !== "none" ? e.fill : e.stroke;
}
function Ui(e, t, n, r) {
	var i = Vi(e.payload, t, n, r);
	return i == null ? e : Q(Q(Q({}, e), i), {}, { tooltipPayload: e.tooltipPayload?.map((e) => Q(Q({}, e), {}, {
		color: Hi(i),
		fill: i.fill
	})) });
}
function Wi(e) {
	var t = (0, Z.useMemo)(() => cn(e.children, S), [e.children]), n = Ur(), r = Er((n) => Ti(n, e.id, t));
	if (r == null) return null;
	var i = r.map((r, i) => {
		var a, o = Q(Q({}, r.payload), t == null || (a = t[i]) == null ? void 0 : a.props), s = _n(o, i, e.pieFillObject, n, wn(e.explicitStyleProps)), c = Vi(o, i, e.graphicalItems, e.explicitStyleProps);
		return c == null ? s == null ? r : Q(Q({}, r), {}, { fill: s }) : Q(Q({}, r), {}, {
			color: Hi(c),
			fill: s
		});
	});
	return /*#__PURE__*/ Z.createElement(pt, { legendPayload: i });
}
function Gi(e) {
	if (e != null && typeof e != "boolean" && typeof e != "function") {
		if (/*#__PURE__*/ Z.isValidElement(e)) {
			var t = e.props?.fill;
			return typeof t == "string" ? t : void 0;
		}
		var n = e.fill;
		return typeof n == "string" ? n : void 0;
	}
}
var Ki = /*#__PURE__*/ Z.memo((e) => {
	var t = e.dataKey, n = e.nameKey, r = e.sectors, i = e.stroke, a = e.strokeWidth, o = e.fill, s = e.name, c = e.hide, l = e.tooltipType, u = e.formatter, d = e.id, f = Gi(e.activeShape), p = {
		dataDefinedOnItem: r.map((e) => {
			var t = e.tooltipPayload;
			return f == null || t == null ? t : t.map((e) => Q(Q({}, e), {}, {
				color: f,
				fill: f
			}));
		}),
		getPosition: (e) => r[Number(e)]?.tooltipPosition,
		settings: {
			stroke: i,
			strokeWidth: a,
			fill: o,
			dataKey: t,
			nameKey: n,
			name: xn(s, t),
			hide: c,
			type: l,
			color: o,
			unit: "",
			formatter: u,
			graphicalItemId: d
		}
	};
	return /*#__PURE__*/ Z.createElement(mt, { tooltipEntrySettings: p });
}), qi = (e, t) => e > t ? "start" : e < t ? "end" : "middle", Ji = (e, t, n) => bn(typeof t == "function" ? t(e) : t, n, n * .8), Yi = (e, t, n) => {
	var r = t.top, i = t.left, a = t.width, o = t.height, s = e.maxRadius ?? vn(a, o);
	return {
		cx: i + bn(e.cx, a, a / 2),
		cy: r + bn(e.cy, o, o / 2),
		innerRadius: bn(e.innerRadius, s, 0),
		outerRadius: Ji(n, e.outerRadius, s),
		maxRadius: e.maxRadius ?? Math.sqrt(a * a + o * o) / 2
	};
}, Xi = (e, t) => zn(t - e) * Math.min(Math.abs(t - e), 360), Zi = (e, t) => {
	if (/*#__PURE__*/ Z.isValidElement(e)) return /*#__PURE__*/ Z.cloneElement(e, t);
	if (typeof e == "function") return e(t);
	var n = Ht("recharts-pie-label-line", typeof e == "boolean" ? "" : e.className);
	t.key;
	var r = Mi(t, Di);
	return /*#__PURE__*/ Z.createElement(ne, ji({}, r, {
		type: "linear",
		className: n
	}));
}, Qi = (e, t, n, r) => {
	if (/*#__PURE__*/ Z.isValidElement(e)) return /*#__PURE__*/ Z.cloneElement(e, t);
	var i = n;
	if (typeof e == "function" && (i = e(t), /*#__PURE__*/ Z.isValidElement(i))) return i;
	var a = Ht("recharts-pie-label-text", fn(e));
	return /*#__PURE__*/ Z.createElement(Et, ji({}, t, {
		alignmentBaseline: "middle",
		className: a,
		background: r
	}), i);
};
function $i(e) {
	if (!(typeof e != "object" || !e || /*#__PURE__*/ Z.isValidElement(e) || "position" in e)) return e;
}
function ea(e) {
	var t = e.sectors, n = e.props, r = e.showLabels, i = kr(), a = n.label, o = n.labelLine, s = n.dataKey;
	if (!r || !a || !t) return null;
	var c = br(n), l = xr(a), u = $i(a), d = xr(o), f = typeof a == "object" && "offsetRadius" in a && typeof a.offsetRadius == "number" && a.offsetRadius || 20, p = t.map((e, t) => {
		var n = (e.startAngle + e.endAngle) / 2, r = Gn(e.cx, e.cy, e.outerRadius + f, n), p = zi(e), m = Q(Q(Q(Q({}, c), p), {}, {
			fill: e.fill,
			stroke: "none"
		}, l), {}, {
			index: t,
			textAnchor: qi(r.x, e.cx)
		}, r), h = Ft(i?.(t), {
			fill: u?.fill,
			style: u?.style ?? m.style,
			background: u?.background
		}, m.fill), g = Q(Q({}, m), h), _ = Q(Q(Q(Q({}, c), p), {}, {
			fill: "none",
			stroke: e.fill
		}, d), {}, {
			index: t,
			points: [Gn(e.cx, e.cy, e.outerRadius, n), r],
			key: "line"
		});
		return /*#__PURE__*/ Z.createElement(kt, {
			zIndex: se.label,
			key: `label-${e.startAngle}-${e.endAngle}-${e.midAngle}-${t}`
		}, /*#__PURE__*/ Z.createElement(Oe, null, o && Zi(o, _), Qi(a, g, Sn(e.payload, s, e.value), h.background)));
	});
	return /*#__PURE__*/ Z.createElement(Oe, { className: "recharts-pie-labels" }, p);
}
function ta(e) {
	var t = e.sectors, n = e.props, r = e.showLabels, i = n.label;
	return typeof i == "object" && i && "position" in i ? /*#__PURE__*/ Z.createElement(De, { label: i }) : /*#__PURE__*/ Z.createElement(ea, {
		sectors: t,
		props: n,
		showLabels: r
	});
}
function na(e) {
	var t = e.sectors, n = e.activeShape, r = e.inactiveShape, i = e.allOtherPieProps, a = e.shape, o = e.id, s = e.animationElapsedTime, c = e.isAnimating, l = e.isEntrance, u = e.indexedActiveStyles, d = Er(lr), f = Er(sr), p = Er(cr), m = i.onMouseEnter, h = i.onClick, g = i.onMouseLeave, _ = Mi(i, Oi), v = Nr(m, i.dataKey, o), y = Pr(g), b = Mr(h, i.dataKey, o);
	return t == null || t.length === 0 ? null : /*#__PURE__*/ Z.createElement(Z.Fragment, null, t.map((e, m) => {
		if (e?.startAngle === 0 && e?.endAngle === 0 && t.length !== 1) return null;
		var h = p == null || p === o, g = String(m) === d && (f == null || i.dataKey === f) && h, x = d ? r : null, S, C = !1;
		g && n ? S = n === !0 ? a : n : x == null ? S = a : (S = x, C = !0);
		var w = Q(Q({}, e), {}, {
			fill: i.sectorPaintFills?.[m] ?? e.fill,
			stroke: e.stroke,
			tabIndex: -1,
			index: m,
			isActive: g,
			animationElapsedTime: s,
			isAnimating: c,
			isEntrance: l,
			[ie]: m,
			[re]: o
		}), T = g && !C ? dn(S === Bi || S, u[m % u.length], e.payload) : void 0, E = T == null ? w : Q(Q({}, w), T);
		return /*#__PURE__*/ Z.createElement(Oe, ji({
			key: `sector-${e?.startAngle}-${e?.endAngle}-${e.midAngle}-${m}`,
			tabIndex: -1,
			className: "recharts-pie-sector"
		}, Nt(_, e, m), {
			onMouseEnter: v(e, m),
			onMouseLeave: y(e, m),
			onClick: b(e, m)
		}), /*#__PURE__*/ Z.createElement(gt, {
			option: S,
			DefaultShape: Bi,
			shapeProps: E
		}));
	}));
}
function ra(e) {
	return An(e) && e !== 0;
}
function ia(e) {
	var t = e.pieSettings, n = e.displayedData, r = e.cells, i = e.offset, a = t.cornerRadius, o = t.startAngle, s = t.endAngle, c = t.dataKey, l = t.nameKey, u = t.tooltipType, d = Math.abs(t.minAngle), f = Xi(o, s), p = Math.abs(f), m = n.filter((e) => ra(Sn(e, c, 0))).length, h = m <= 1 ? 0 : t.paddingAngle ?? 0, g = n.findIndex((e) => ra(Sn(e, c, 0))), _ = (p >= 360 ? m : m - 1) * h, v = n.reduce((e, t) => {
		var n = Sn(t, c, 0);
		return e + (An(n) ? n : 0);
	}, 0), y = d > 0 && v > 0 && n.some((e) => {
		var t = Sn(e, c, 0), n = (An(t) ? t : 0) / v;
		return ra(t) && n * p < d;
	}) ? d : 0, b = p - m * y - _, x;
	if (v > 0) {
		var S;
		x = n.map((e, n) => {
			var s = Sn(e, c, 0), d = Sn(e, l, n), p = Yi(t, i, e), m = (An(s) ? s : 0) / v, _, x = Q(Q({}, e), r && r[n] && r[n].props), C = Q({}, x);
			delete C.id;
			var w = Qn(x), T = w.color ?? t.fill, E = n > 0 && n === g, D = ra(s) && !E;
			_ = n ? S.endAngle + zn(f) * h * +!!D : o;
			var O = _ + zn(f) * ((ra(s) ? y : 0) + m * b), ee = (_ + O) / 2, k = (p.innerRadius + p.outerRadius) / 2, A = [{
				name: d,
				value: s,
				payload: x,
				dataKey: c,
				type: u,
				color: T,
				fill: T,
				graphicalItemId: t.id
			}], te = Gn(p.cx, p.cy, k, ee);
			return S = Q(Q(Q(Q(Q({}, t.presentationProps), {}, {
				percent: m,
				cornerRadius: typeof a == "string" ? parseFloat(a) : a,
				name: d,
				tooltipPayload: A,
				midAngle: ee,
				middleRadius: k,
				tooltipPosition: te
			}, C), w.fillObject == null ? void 0 : { fill: T }), p), {}, {
				value: s,
				dataKey: c,
				startAngle: _,
				endAngle: O,
				payload: x,
				paddingAngle: D ? zn(f) * h : 0
			}), S;
		});
	}
	return x;
}
function aa(e) {
	var t = e.showLabels, n = e.sectors, r = e.children, i = (0, Z.useMemo)(() => !t || !n ? [] : n.map((e) => ({
		value: e.value,
		payload: e.payload,
		clockWise: !1,
		parentViewBox: void 0,
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
	})), [n, t]);
	return /*#__PURE__*/ Z.createElement(We, { value: t ? i : void 0 }, r);
}
var oa = (e, t) => {
	if (e == null) return [];
	var n = [], r = e.find((e) => e.status !== "removed"), i = r ? r.next.startAngle : 0;
	return e.forEach((e, r) => {
		if (e.status !== "removed") {
			if (e.status === "matched") {
				var a = r > 0 ? On(un(e.prev, "paddingAngle", 0), un(e.next, "paddingAngle", 0), t) : 0, o = On(e.prev.endAngle - e.prev.startAngle, e.next.endAngle - e.next.startAngle, t), s = Q(Q({}, e.next), {}, {
					startAngle: i + a,
					endAngle: i + o + a
				});
				n.push(s), i = s.endAngle;
			} else {
				var c = r > 0 ? un(e.next, "paddingAngle", 0) : 0, l = On(0, e.next.endAngle - e.next.startAngle, t), u = Q(Q({}, e.next), {}, {
					startAngle: i + c,
					endAngle: i + l + c
				});
				n.push(u), i = u.endAngle;
			}
		}
	}), n;
};
function sa(e) {
	var t = e.props, n = e.previousSectorsRef, r = e.id, i = e.graphicalItems, a = e.indexedActiveStyles, o = t.sectors, s = t.activeShape, c = t.inactiveShape, l = t.animationInterpolateFn, u = Ar(i), f = Tr(t.onAnimationStart, t.onAnimationEnd), p = f.isAnimating, m = f.handleAnimationStart, h = f.handleAnimationEnd, g = Lr();
	if (g == null) return null;
	var _ = o[0];
	return /*#__PURE__*/ Z.createElement(oe, { value: u }, /*#__PURE__*/ Z.createElement(ae, { value: sn }, /*#__PURE__*/ Z.createElement(aa, {
		showLabels: !p,
		sectors: o
	}, /*#__PURE__*/ Z.createElement(d, {
		animationInput: t,
		animationIdPrefix: "recharts-pie-",
		items: o,
		previousItemsRef: n,
		isAnimationActive: t.isAnimationActive,
		animationBegin: t.animationBegin,
		animationDuration: t.animationDuration,
		animationEasing: t.animationEasing,
		onAnimationStart: m,
		onAnimationEnd: h,
		animationInterpolateFn: l,
		animationMatchBy: t.animationMatchBy,
		layout: g
	}, (e, n, i) => /*#__PURE__*/ Z.createElement(Oe, null, /*#__PURE__*/ Z.createElement(na, {
		sectors: e,
		activeShape: s,
		inactiveShape: c,
		allOtherPieProps: t,
		shape: t.shape,
		id: r,
		indexedActiveStyles: a,
		animationElapsedTime: n,
		isAnimating: p || n < 1,
		isEntrance: i
	}))), /*#__PURE__*/ Z.createElement(ta, {
		showLabels: !p,
		sectors: o,
		props: t
	}), /*#__PURE__*/ Z.createElement(Ue, {
		cx: _?.cx ?? 0,
		cy: _?.cy ?? 0,
		innerRadius: _?.innerRadius ?? 0,
		outerRadius: _?.outerRadius ?? 0,
		startAngle: t.startAngle,
		endAngle: t.endAngle,
		clockWise: !1
	}, t.children))));
}
var ca = {
	animationBegin: 400,
	animationDuration: 1500,
	animationEasing: "ease",
	animationInterpolateFn: oa,
	animationMatchBy: Rn,
	cx: "50%",
	cy: "50%",
	dataKey: "value",
	endAngle: 360,
	fill: "#808080",
	hide: !1,
	innerRadius: 0,
	isAnimationActive: "auto",
	label: !1,
	labelLine: !0,
	legendType: "rect",
	minAngle: 0,
	nameKey: "name",
	outerRadius: "80%",
	paddingAngle: 0,
	rootTabIndex: 0,
	shape: Bi,
	startAngle: 0,
	stroke: "#fff",
	zIndex: se.area
};
function la(e) {
	var t = e.id, n = e.graphicalItems, r = e.explicitStyleProps, i = e.pieFillObject, a = Mi(e, ki), o = e.hide, s = e.className, c = e.rootTabIndex, l = Ur(), u = (0, Z.useMemo)(() => cn(e.children, S), [e.children]), d = wn(r), f = (0, Z.useMemo)(() => n.map((e) => d ? Gr(e.active) : e.active), [n, d]), p = Er((e) => Ei(e, t, u)), m = (0, Z.useRef)(null), h = Ht("recharts-pie", s);
	if (o || p == null) return m.current = null, /*#__PURE__*/ Z.createElement(Oe, {
		tabIndex: c,
		className: h
	});
	var g = p.map((e, t) => Ui(e, t, n, r)), _ = g.map((e, t) => _n(e.payload, t, i, l, d)), v = _.map((e, n) => e == null ? void 0 : gn(hn(t, n))), y = n.length > 0;
	return /*#__PURE__*/ Z.createElement(kt, { zIndex: e.zIndex }, /*#__PURE__*/ Z.createElement(Ki, {
		dataKey: e.dataKey,
		nameKey: e.nameKey,
		sectors: g,
		stroke: y ? r.stroke : e.stroke,
		strokeWidth: y ? r.strokeWidth : e.strokeWidth,
		fill: y ? r.fill : e.fill,
		name: e.name,
		hide: e.hide,
		tooltipType: e.tooltipType,
		formatter: e.formatter,
		id: t,
		activeShape: e.activeShape
	}), /*#__PURE__*/ Z.createElement(Oe, {
		tabIndex: c,
		className: h
	}, _.some((e) => e != null) && /*#__PURE__*/ Z.createElement("defs", null, _.map((e, n) => e == null ? null : /*#__PURE__*/ Z.createElement(xe, {
		key: n,
		id: hn(t, n),
		fillObject: e,
		color: g[n]?.fill
	}))), /*#__PURE__*/ Z.createElement(sa, {
		props: Q(Q({}, a), {}, {
			sectors: g,
			sectorPaintFills: v
		}),
		previousSectorsRef: m,
		id: t,
		graphicalItems: n,
		indexedActiveStyles: f
	})));
}
function ua(e) {
	var t = vr(e.fill), n = t.color, r = t.fillObject, i = Q(Q({}, e), {}, { fill: n }), a = nr(i, ca), o = Dr((e) => ({ graphicalItems: e.graphicalItems }), {}, void 0), s = {
		fill: i.fill,
		fillOpacity: i.fillOpacity,
		stroke: i.stroke,
		strokeOpacity: i.strokeOpacity,
		strokeWidth: i.strokeWidth,
		strokeDasharray: i.strokeDasharray
	}, c = a.id, l = Mi(a, Ai), u = br(l);
	return /*#__PURE__*/ Z.createElement(Xe, {
		id: c,
		type: "pie"
	}, (e) => /*#__PURE__*/ Z.createElement(Z.Fragment, null, /*#__PURE__*/ Z.createElement(ft, {
		type: "pie",
		id: e,
		data: l.data,
		dataKey: l.dataKey,
		hide: l.hide,
		angleAxisId: 0,
		radiusAxisId: 0,
		name: l.name,
		nameKey: l.nameKey,
		tooltipType: l.tooltipType,
		legendType: l.legendType,
		fill: l.fill,
		cx: l.cx,
		cy: l.cy,
		startAngle: l.startAngle,
		endAngle: l.endAngle,
		paddingAngle: l.paddingAngle,
		minAngle: l.minAngle,
		innerRadius: l.innerRadius,
		outerRadius: l.outerRadius,
		cornerRadius: l.cornerRadius,
		presentationProps: u,
		maxRadius: a.maxRadius
	}), /*#__PURE__*/ Z.createElement(Wi, ji({}, l, {
		id: e,
		graphicalItems: pn(o?.graphicalItems) ?? [],
		explicitStyleProps: s,
		pieFillObject: r
	})), /*#__PURE__*/ Z.createElement(la, ji({}, l, {
		id: e,
		graphicalItems: pn(o?.graphicalItems) ?? [],
		explicitStyleProps: s,
		pieFillObject: r
	}))));
}
var da = ua;
da.displayName = "Pie";
// node_modules/recharts/es6/chart/PieChart.js
function fa(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function pa(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? fa(Object(n), !0).forEach(function(t) {
			ma(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : fa(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function ma(e, t, n) {
	return (t = ha(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function ha(e) {
	var t = ga(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function ga(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var _a = ["item"], va = pa(pa({}, Zr), {}, {
	layout: "centric",
	startAngle: 0,
	endAngle: 360
}), ya = /*#__PURE__*/ (0, Z.forwardRef)((e, t) => {
	var n = nr(e, va);
	return /*#__PURE__*/ Z.createElement(Xr, {
		chartName: "PieChart",
		defaultTooltipEventType: "item",
		validateTooltipEventTypes: _a,
		tooltipPayloadSearcher: It,
		categoricalChartProps: n,
		ref: t
	});
}), $ = er();
function ba({ entries: e }) {
	let t = e.filter((e) => !!e);
	return t.length ? /* @__PURE__ */ (0, $.jsx)(at, {
		inline: !0,
		label: J("settings:configurationPage.contents"),
		entries: t,
		children: t.map(({ id: e, content: t }) => /* @__PURE__ */ (0, $.jsx)("div", {
			id: e,
			className: "flex min-w-0 flex-col gap-6",
			children: t
		}, e))
	}) : null;
}
// src/react/settings/userscript-probe.ts
function xa() {
	let e = (0, Z.useRef)(null), [t, n] = (0, Z.useState)(0), [r, i] = (0, Z.useState)("checking");
	return (0, Z.useEffect)(() => {
		let t = Zn(), n = !1, r = e.current, a, o = () => {
			n = !0, clearInterval(u), i("missing");
		}, s = () => {
			n || (clearTimeout(a), a = setTimeout(o, 3e3), c());
		}, c = () => e.current?.contentWindow?.postMessage({
			type: "peach-userscript:probe",
			nonce: t
		}, window.location.origin), l = (r) => {
			!n && r.source === e.current?.contentWindow && r.origin === window.location.origin && r.data?.type === "peach-userscript:ready" && r.data.nonce === t && r.data.protocol === 1 && typeof r.data.version == "string" && /^\d{1,5}\.\d{1,5}\.\d{1,5}$/.test(r.data.version) && typeof r.data.paired == "boolean" && (n = !0, clearInterval(u), clearTimeout(a), i({
				version: r.data.version,
				paired: r.data.paired
			}));
		};
		window.addEventListener("message", l);
		let u = setInterval(c, 250);
		return a = setTimeout(o, 15e3), r?.addEventListener("load", s), r?.contentDocument?.readyState === "complete" && r.contentDocument.URL !== "about:blank" && s(), c(), () => {
			clearInterval(u), clearTimeout(a), r?.removeEventListener("load", s), window.removeEventListener("message", l);
		};
	}, [t]), {
		frame: e,
		attempt: t,
		status: r,
		retry: () => {
			r !== "checking" && (i("checking"), n((e) => e + 1));
		}
	};
}
// src/react/settings/userscript-status.tsx
function Sa(e, t) {
	let n = e.split(".").map(Number), r = t.split(".").map(Number);
	for (let e = 0; e < 3; e++) if (n[e] !== r[e]) return n[e] > r[e];
	return !0;
}
function Ca({ enabled: e, release: t }) {
	let { frame: n, attempt: r, status: i, retry: a } = xa(), { checked: o } = qr(), s = (0, Z.useRef)(0), c = typeof i == "object", l = c && !Sa(i.version, t.minimum_version), u = c && !Sa(i.version, t.version), d = i === "checking" ? "progress" : i === "missing" ? "neutral" : l || u || !i.paired ? "warning" : "success", f = i === "checking" ? J("settings:userscriptStatus.checking") : i === "missing" ? J("settings:mediaLibraries.dependencyMissing") : l ? J("settings:userscriptStatus.updateRequired") : u ? J("settings:userscriptStatus.updateAvailable") : i.paired ? J("settings:userscriptStatus.connected") : J("settings:userscriptStatus.unpaired");
	(0, Z.useEffect)(() => {
		i !== "checking" && s.current !== r && (s.current = r, o(J("settings:userscriptStatus.checkResult", { result: f })));
	}, [
		r,
		o,
		f,
		i
	]);
	let p = i === "checking" ? "checking" : i === "missing" ? "missing" : l ? "required" : u ? "available" : i.paired ? e ? "enabled" : "disabled" : "unpaired";
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)("iframe", {
		ref: n,
		title: J("settings:userscriptStatus.probeFrame"),
		hidden: !0,
		src: "/integrations/peach-userscript-bridge"
	}, r), /* @__PURE__ */ (0, $.jsxs)("div", {
		"aria-live": "polite",
		"data-userscript-status": "",
		className: zt({
			variant: "raised",
			bordered: "line",
			className: "flex flex-col gap-3"
		}),
		children: [
			/* @__PURE__ */ (0, $.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, $.jsx)("span", {
					className: "text-body-medium text-text-primary",
					children: J("settings:userscriptStatus.title")
				}), /* @__PURE__ */ (0, $.jsx)(Jr, {
					tone: d,
					children: /* @__PURE__ */ (0, $.jsx)("span", {
						"data-copy-key": `userscript.${p}.status`,
						children: f
					})
				})]
			}),
			c ? /* @__PURE__ */ (0, $.jsxs)("p", {
				"data-copy-key": "userscript.installed.version",
				className: "text-body-regular text-text-secondary",
				children: [J("settings:userscriptStatus.installedVersion"), i.version]
			}) : null,
			/* @__PURE__ */ (0, $.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, $.jsx)("span", {
					className: "text-body-regular text-text-secondary",
					children: J("settings:userscriptStatus.addFromBrowser")
				}), /* @__PURE__ */ (0, $.jsx)(xt, {
					tone: e ? "success" : "neutral",
					children: /* @__PURE__ */ (0, $.jsx)("span", {
						"data-copy-key": `userscript.adding.${e ? "enabled" : "disabled"}`,
						children: J(e ? "settings:shared.enabled" : "settings:shared.notEnabled")
					})
				})]
			}),
			/* @__PURE__ */ (0, $.jsx)("p", {
				"data-copy-key": `userscript.${p}.message`,
				className: "text-caption-1-regular text-text-secondary",
				children: i === "checking" ? J("settings:userscriptStatus.checkingHelp") : i === "missing" ? J("settings:userscriptStatus.missingHelp") : l ? J("settings:userscriptStatus.updateRequiredHelp", { version: t.minimum_version }) : u ? J("settings:userscriptStatus.updateAvailableHelp", { version: t.version }) : i.paired ? J(e ? "settings:userscriptStatus.readyHelp" : "settings:userscriptStatus.addingDisabledHelp") : J("settings:userscriptStatus.pairHelp")
			}),
			/* @__PURE__ */ (0, $.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					i === "missing" || l || u ? /* @__PURE__ */ (0, $.jsx)(he, {
						href: t.install_url,
						children: /* @__PURE__ */ (0, $.jsx)("span", {
							"data-copy-key": `userscript.${i === "missing" ? "install" : "update"}.action`,
							children: J(l || u ? "settings:userscriptStatus.update" : "settings:userscriptStatus.install")
						})
					}) : null,
					i === "missing" ? /* @__PURE__ */ (0, $.jsx)(he, {
						href: "https://www.tampermonkey.net/faq.php#Q209",
						children: J("settings:userscriptStatus.permissionGuide")
					}) : null,
					/* @__PURE__ */ (0, $.jsx)(m, {
						variant: "secondary",
						type: "button",
						...W(i === "checking"),
						onClick: a,
						children: J("settings:userscriptStatus.checkAgain")
					})
				]
			})
		]
	})] });
}
// src/react/settings/jav-browser-settings.tsx
var wa = "/api/configuration/jav-browser";
function Ta({ receipt: e, refreshKey: t }) {
	let n = X({
		queryKey: ["jav-browser-settings", t],
		queryFn: ({ signal: e }) => H(wa, e),
		refetchOnMount: "always",
		refetchOnWindowFocus: "always"
	});
	return n.error && !n.data ? /* @__PURE__ */ (0, $.jsx)(qe, {
		titleKey: "settings:browserAdd.loadFailed",
		query: n
	}) : n.isFetching && !n.data ? /* @__PURE__ */ (0, $.jsx)(it, {
		label: J("settings:browserAdd.loading"),
		html: Mn
	}) : n.data ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [n.error ? /* @__PURE__ */ (0, $.jsx)(qe, {
		titleKey: "settings:browserAdd.loadFailed",
		query: n
	}) : null, /* @__PURE__ */ (0, $.jsx)(Ea, {
		initial: n.data,
		receipt: e
	})] }) : null;
}
function Ea({ initial: e, receipt: t }) {
	let [n, r] = (0, Z.useState)(e), [i, a] = (0, Z.useState)(e.provider), [o, s] = (0, Z.useState)(""), c = Y();
	(0, Z.useEffect)(() => {
		$n("javBrowser", {
			enabled: e.enabled,
			ready: e.providers.some((t) => t.key === e.provider && t.configured && t.target)
		}), r(e), a((t) => e.providers.some((e) => e.key === t) ? t : e.provider), e.enabled || s("");
	}, [e]);
	let l = (e) => {
		c.run(e, (t) => U(wa, {
			action: e,
			provider: i
		}, "POST", t), (n) => {
			let { token: i = "", ...o } = n;
			r(o), a(o.provider), s(i), t(J(e === "disable" ? "settings:browserAdd.turnedOff" : "settings:browserAdd.tokenIssued"));
		});
	}, u = (e) => {
		c.busy || (r((t) => ({
			...t,
			want_on_no_match: e
		})), c.run("want", (t) => U("/api/settings", { javBrowserWantOnNoMatch: e }, "POST", t), () => t(J("settings:shared.settingsSaved")), (t) => {
			r((t) => ({
				...t,
				want_on_no_match: !e
			})), c.setError(K(t));
		}));
	}, d = n.providers.some((e) => e.key === i && e.configured && e.target);
	return /* @__PURE__ */ (0, $.jsxs)(R, {
		guide: "browser",
		title: J("settings:javBrowser.title"),
		children: [/* @__PURE__ */ (0, $.jsxs)(B, { children: [/* @__PURE__ */ (0, $.jsxs)("div", {
			className: "flex min-w-0 flex-col gap-4",
			children: [
				/* @__PURE__ */ (0, $.jsx)(Ca, {
					enabled: n.enabled,
					release: n.userscript
				}),
				/* @__PURE__ */ (0, $.jsxs)("div", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ (0, $.jsx)(be, { children: J("settings:browserAdd.channel") }), /* @__PURE__ */ (0, $.jsx)(lt, {
						"aria-label": J("settings:browserAdd.channel"),
						selectedKey: i || null,
						placeholder: J("settings:browserAdd.noChannels"),
						onSelectionChange: (e) => {
							e !== null && a(String(e));
						},
						isDisabled: !n.providers.length || !!c.busy,
						children: n.providers.map((e) => /* @__PURE__ */ (0, $.jsx)(dt, {
							id: e.key,
							textValue: e.label,
							children: /* @__PURE__ */ (0, $.jsx)(yt, {
								source: e.key,
								label: e.label
							})
						}, e.key))
					})]
				}),
				d ? null : /* @__PURE__ */ (0, $.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:browserAdd.needsCloudDrive") }), /* @__PURE__ */ (0, $.jsx)(h, {
						href: "/settings/downloads",
						variant: "secondary",
						size: "small",
						children: /* @__PURE__ */ (0, $.jsx)("span", {
							"data-copy-key": "shell.downloadChannels.settingsLink",
							children: J("shell:downloadChannels.settingsLink")
						})
					})]
				}),
				n.problems?.map((e) => /* @__PURE__ */ (0, $.jsx)(P, { children: e }, e)),
				n.enabled && n.active_provider && !n.providers.some((e) => e.key === n.active_provider) ? /* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:browserAdd.channelUnavailable") }) : null,
				/* @__PURE__ */ (0, $.jsx)("div", { children: /* @__PURE__ */ (0, $.jsx)(z, {
					label: J("settings:browserAdd.wantOnNoMatch"),
					description: J("settings:browserAdd.wantOnNoMatchHelp"),
					children: /* @__PURE__ */ (0, $.jsx)(V, {
						"aria-label": J("settings:browserAdd.wantOnNoMatch"),
						isSelected: n.want_on_no_match,
						isDisabled: !!c.busy || !n.enabled,
						onChange: u
					})
				}) }),
				/* @__PURE__ */ (0, $.jsx)(F, {
					label: J("settings:browserAdd.peachUrl"),
					value: window.location.origin,
					isReadOnly: !0,
					autoComplete: "off"
				}),
				o ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
					/* @__PURE__ */ (0, $.jsx)(F, {
						label: J("settings:browserAdd.token"),
						type: "password",
						value: o,
						isReadOnly: !0,
						autoComplete: "new-password"
					}),
					/* @__PURE__ */ (0, $.jsx)("div", { children: /* @__PURE__ */ (0, $.jsx)(m, {
						variant: "secondary",
						type: "button",
						onClick: () => {
							c.run("copy", async () => navigator.clipboard.writeText(JSON.stringify({
								peach_pairing: 1,
								base: window.location.origin,
								token: o
							})), () => t(J("settings:browserAdd.pairingCopied")));
						},
						...W(c.busy === "copy"),
						children: J("settings:browserAdd.copyPairing")
					}) }),
					/* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:browserAdd.pairingHelp") })
				] }) : null
			]
		}), c.error ? /* @__PURE__ */ (0, $.jsx)(j, { children: c.error }) : null] }), /* @__PURE__ */ (0, $.jsxs)(N, { children: [n.enabled ? /* @__PURE__ */ (0, $.jsx)(m, {
			variant: "secondary",
			type: "button",
			disabled: !!c.busy,
			onClick: () => l("disable"),
			children: J("settings:javBrowser.disable")
		}) : null, /* @__PURE__ */ (0, $.jsx)(m, {
			type: "button",
			disabled: !n.available || !d || !!c.busy,
			onClick: () => l(n.enabled ? "rotate" : "enable"),
			...W(c.busy === "enable" || c.busy === "rotate"),
			children: n.enabled ? J("settings:javBrowser.updateChannelToken") : J("settings:javBrowser.enable")
		})] })]
	});
}
// src/react/settings/field-validation.ts
var Da = "input:not([type=\"hidden\"]), textarea, button[aria-haspopup=\"listbox\"]";
function Oa() {
	let [e, t] = (0, Z.useState)({});
	return {
		errors: e,
		clear() {
			t({});
		},
		update(e, n) {
			t((t) => t[e] === n ? t : {
				...t,
				[e]: n
			});
		},
		check(e, n) {
			t(n);
			let r = Object.keys(n).filter((e) => n[e]);
			return !r.length || (requestAnimationFrame(() => {
				let t = [...e?.querySelectorAll("[data-settings-field]") ?? []].filter((e) => r.includes(e.dataset.settingsField ?? "")).map((e) => e.querySelector(Da)).filter((e) => !(!e || e.matches(":disabled")));
				t[0]?.focus();
				let n = t.map((e) => e.closest("[data-input-size]>div") ?? e).filter((e) => getComputedStyle(e).animationName === "field-shake");
				for (let e of n) e.style.animationName = "none";
				n[0]?.offsetWidth;
				for (let e of n) e.style.removeProperty("animation-name");
			}), !1);
		}
	};
}
var ka = (e) => e.trim().replace(/\/+$/, "");
function Aa(e) {
	let t = ka(e);
	if (!t) return "";
	let n = t.includes("://") ? t : `http://${t}`, r = Array.from(t).some((e) => e.charCodeAt(0) < 32);
	if (!/^https?:\/\/[^/?#@\\\s]+\/?$/i.test(n) || r) return "errors.downloads.addressFormat";
	try {
		let e = new URL(n);
		if (!e.hostname) return "errors.downloads.addressFormat";
		if (e.port === "0" || /:$/.test(t)) return "errors.downloads.addressPortInvalid";
	} catch {
		return "errors.downloads.addressPortInvalidIpv6";
	}
	return "";
}
function ja(e) {
	return "/" + e.trim().replaceAll("\\", "/").split("/").filter(Boolean).join("/");
}
function Ma(e) {
	if (!e.trim()) return !1;
	let t = ja(e);
	return t === "/" || t.split("/").some((e) => e === "." || e === "..");
}
// src/react/settings/local-download-settings.tsx
var Na = "/api/configuration/downloads/qbittorrent/check", Pa = (e) => {
	let t = Aa(e);
	return t ? q(t, "", { label: "qBittorrent" }) : "";
}, Fa = (e) => Ma(e) ? q("errors.downloads.localTargetInvalid", "") : "", Ia = (e) => (e.problems ?? []).map((t, n) => {
	let r = e.problem_codes?.[n];
	return r?.code ? q(r.code, t, r.params) : t;
}).filter((e) => e.includes("qBittorrent")), La = (e) => e.problems.map((t, n) => {
	let r = e.problem_codes?.[n];
	return r?.code ? q(r.code, t, r.params) : t;
});
function Ra({ state: e, settle: t, receipt: n }) {
	let { checked: r, checkFailed: i } = qr(), a = J("settings:connectionCheck.action", { service: "qBittorrent" }), o = e.qbittorrent ?? {
		address: "",
		save_path: "",
		media_root: "",
		username: "",
		password_set: !1
	}, s = e.local_roots ?? [], [c, l] = (0, Z.useState)(o.address), [u, d] = (0, Z.useState)(o.save_path), f = (0, Z.useRef)(0), [p, h] = (0, Z.useState)(o.media_root), [g, _] = (0, Z.useState)(o.username), [v, y] = (0, Z.useState)(""), [b, x] = (0, Z.useState)(!1), [S, C] = (0, Z.useState)(null), [w, T] = (0, Z.useState)(""), E = Y(), D = Oa(), { errors: O } = D, ee = (0, Z.useId)();
	(0, Z.useEffect)(() => {
		l(o.address), f.current++, d(o.save_path), h(o.media_root), _(o.username);
	}, [
		o.address,
		o.save_path,
		o.media_root,
		o.username
	]);
	let A = {
		...e.config,
		qbittorrent_address: c,
		qbittorrent_save_path: u,
		qbittorrent_media_root: p,
		qbittorrent_username: g,
		qbittorrent_password: v,
		clear_qbittorrent_password: b
	}, te = (e, t) => {
		let n = !!ka(c), r = !t && !n && (!!o.address || b), i = {
			address: !r && !n ? q("labels.downloadsQbittorrent.addressMissing", "") : Pa(c),
			savePath: Fa(u),
			mediaRoot: !r && !p ? q("labels.downloadsQbittorrent.mediaRootMissing", "") : p && !s.some((e) => e.root.toLowerCase() === p.toLowerCase()) ? q("errors.downloads.notLocalRoot", "", {
				root: p,
				known: s.map((e) => e.root)
			}) : ""
		};
		return T(""), D.check(e, i) ? !0 : (C(null), !1);
	}, ne = (e) => {
		let t = e.currentTarget.form;
		if (!te(t, !0)) return;
		let n = f.current;
		E.run("check", (e) => U(Na, A, "POST", e), (e) => {
			C(e), n === f.current && !u.trim() && e.save_path && d(e.save_path), T(""), e.ok ? r(J("settings:connectionCheck.passed", { service: "qBittorrent" })) : i(a, La(e)[0] || J("settings:connectionCheck.details"));
		}, (e) => {
			let t = K(e);
			T(t), i(a, t);
		});
	}, re = (e) => {
		e.preventDefault(), te(e.currentTarget, !1) && E.run("save", (e) => U("/api/configuration/downloads", A, "POST", e), (e) => {
			let { report: r, qbittorrent_report: i, ...a } = e;
			t(a), y(""), x(!1), C(i || null), T(""), n(J("settings:localDownload.saved"));
		}, (e) => T(K(e)));
	}, ie = Ia(e);
	return /* @__PURE__ */ (0, $.jsxs)(R, {
		title: J("settings:localDownload.title"),
		onSubmit: re,
		children: [
			ie.length ? /* @__PURE__ */ (0, $.jsx)(B, { children: /* @__PURE__ */ (0, $.jsx)(I, {
				tone: "error",
				title: J("settings:localDownload.needsAttention"),
				children: ie.join("\n")
			}) }) : null,
			/* @__PURE__ */ (0, $.jsxs)(B, { children: [
				/* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:localDownload.help") }),
				/* @__PURE__ */ (0, $.jsx)(F, {
					label: J("settings:localDownload.address"),
					placeholder: J("settings:localDownload.addressPlaceholder"),
					autoComplete: "off",
					maxLength: 200,
					value: c,
					isDisabled: !e.available,
					"data-settings-field": "address",
					validationBehavior: "aria",
					isInvalid: !!O.address,
					hint: O.address,
					onBlur: () => {
						c.trim() && D.update("address", Pa(c));
					},
					onChange: (e) => {
						l(e), D.update("address");
					}
				}),
				/* @__PURE__ */ (0, $.jsx)(F, {
					label: J("settings:localDownload.username"),
					autoComplete: "username",
					maxLength: 200,
					value: g,
					isDisabled: !e.available,
					onChange: _
				}),
				/* @__PURE__ */ (0, $.jsx)(F, {
					label: J("settings:localDownload.password"),
					type: "password",
					autoComplete: "current-password",
					maxLength: 400,
					placeholder: o.password_set ? J("settings:shared.savedLeaveBlank") : J("settings:localDownload.passwordPlaceholder"),
					value: v,
					isDisabled: !e.available,
					onChange: y
				}),
				o.password_set ? /* @__PURE__ */ (0, $.jsx)(k, {
					isSelected: b,
					isDisabled: !e.available,
					onChange: x,
					children: J("settings:localDownload.clearPassword")
				}) : null,
				/* @__PURE__ */ (0, $.jsx)(F, {
					label: J("settings:localDownload.savePath"),
					placeholder: J("settings:localDownload.savePathPlaceholder"),
					autoComplete: "off",
					maxLength: 500,
					value: u,
					isDisabled: !e.available,
					"data-settings-field": "savePath",
					validationBehavior: "aria",
					isInvalid: !!O.savePath,
					hint: O.savePath || J("settings:localDownload.savePathHint"),
					onBlur: () => D.update("savePath", Fa(u)),
					onChange: (e) => {
						f.current++, d(e), D.update("savePath");
					}
				}),
				/* @__PURE__ */ (0, $.jsxs)("div", {
					className: "flex flex-col gap-1",
					children: [
						/* @__PURE__ */ (0, $.jsx)(be, { children: J("settings:localDownload.mediaRoot") }),
						s.length ? /* @__PURE__ */ (0, $.jsx)(ct, {
							"aria-label": J("settings:localDownload.mediaRoot"),
							selectedKey: p || null,
							"aria-describedby": O.mediaRoot ? ee : void 0,
							"data-settings-field": "mediaRoot",
							validationBehavior: "aria",
							isInvalid: !!O.mediaRoot,
							isDisabled: !e.available,
							placeholder: J("settings:localDownload.mediaRootPlaceholder"),
							onSelectionChange: (e) => {
								h(e === null ? "" : String(e)), D.update("mediaRoot");
							},
							children: s.map((e) => /* @__PURE__ */ (0, $.jsxs)(ut, {
								id: e.root,
								glyph: "folder-open",
								textValue: J("shell:format.withNote", {
									text: e.label,
									note: e.root
								}),
								children: [
									e.label,
									" · ",
									e.root
								]
							}, e.root))
						}) : O.mediaRoot ? /* @__PURE__ */ (0, $.jsx)(j, { children: J("settings:localDownload.noLocalRoots", { section: J("navigation:configurationSections.library") }) }) : /* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:localDownload.noLocalRoots", { section: J("navigation:configurationSections.library") }) }),
						O.mediaRoot && s.length ? /* @__PURE__ */ (0, $.jsx)(j, {
							id: ee,
							children: O.mediaRoot
						}) : null,
						/* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:localDownload.mediaRootHelp") })
					]
				}),
				w ? /* @__PURE__ */ (0, $.jsx)(j, { children: w }) : null
			] }),
			S ? /* @__PURE__ */ (0, $.jsxs)(B, {
				divided: !0,
				children: [
					/* @__PURE__ */ (0, $.jsx)("h4", {
						className: "text-body-medium text-text-primary",
						"data-copy-key": "settings.connectionCheck.results",
						children: J("settings:connectionCheck.results")
					}),
					/* @__PURE__ */ (0, $.jsxs)(ye, { children: [
						/* @__PURE__ */ (0, $.jsx)(M, {
							term: J("settings:localDownload.version"),
							children: S.version || J("settings:shared.notFound")
						}),
						/* @__PURE__ */ (0, $.jsx)(M, {
							term: "WebAPI",
							children: S.webapi_version || J("settings:shared.notFound")
						}),
						/* @__PURE__ */ (0, $.jsx)(M, {
							term: J("settings:localDownload.savePath"),
							children: S.save_path || J("settings:shared.notSet")
						}),
						/* @__PURE__ */ (0, $.jsx)(M, {
							term: J("settings:localDownload.mediaRoot"),
							children: S.media_root || J("settings:shared.notSet")
						})
					] }),
					S.problems.length ? /* @__PURE__ */ (0, $.jsx)(I, {
						tone: "error",
						title: J("settings:localDownload.checkFailed"),
						children: La(S).join("\n")
					}) : null
				]
			}) : null,
			/* @__PURE__ */ (0, $.jsxs)(N, {
				status: e.available ? void 0 : J("settings:cloudDownload.primaryOnly"),
				children: [/* @__PURE__ */ (0, $.jsxs)(m, {
					type: "button",
					variant: "secondary",
					disabled: !e.available || E.busy === "save",
					...W(E.busy === "check"),
					onClick: ne,
					children: [E.busy === "check" ? /* @__PURE__ */ (0, $.jsx)("span", {
						"aria-hidden": !0,
						dangerouslySetInnerHTML: { __html: _r() }
					}) : null, J("settings:cloudDownload.testConnection")]
				}), /* @__PURE__ */ (0, $.jsxs)(m, {
					type: "submit",
					disabled: !e.available || E.busy === "check",
					...W(E.busy === "save"),
					children: [E.busy === "save" ? /* @__PURE__ */ (0, $.jsx)("span", {
						"aria-hidden": !0,
						dangerouslySetInnerHTML: { __html: _r() }
					}) : null, J("settings:shared.saveSettings")]
				})]
			})
		]
	});
}
// src/react/settings/download-settings.tsx
var za = "/api/configuration/downloads", Ba = "/api/configuration/downloads/check", Va = "/api/configuration/downloads/folder", Ha = "/api/configuration/downloads/pikpak/login", Ua = "/api/configuration/downloads/pikpak/logout", Wa = "/api/configuration/downloads/pikpak/browser-login", Ga = 2e3, Ka = 9e5, qa = Yn("pikpak"), Ja = (e) => (e.problems ?? []).map((t, n) => {
	let r = e.problem_codes?.[n];
	return r?.code ? q(r.code, t, r.params) : t;
}), Ya = (e) => e.missing.map((t, n) => q(e.missing_codes?.[n] ?? "", t));
function Xa({ initial: e, receipt: t, active: n, issues: r }) {
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [r, e ? /* @__PURE__ */ (0, $.jsx)(Za, {
		initial: e,
		receipt: t,
		active: n
	}) : null] });
}
function Za({ initial: e, receipt: t, active: n = !0 }) {
	let [r, i] = (0, Z.useState)(e), [a, o] = (0, Z.useState)("");
	(0, Z.useEffect)(() => {
		i((t) => ({
			...t,
			media_sources: e.media_sources,
			pikpak_roots: e.pikpak_roots
		}));
	}, [e.media_sources, e.pikpak_roots]);
	let s = r.media_sources ?? [], c = s.includes("pikpak"), l = s.some((e) => g.includes(e)), u = c && (r.pikpak.logged_in || !!a.trim());
	return /* @__PURE__ */ (0, $.jsx)(ba, { entries: [
		l && {
			id: "downloads-cloud",
			label: J("settings:cloudDownload.title"),
			content: /* @__PURE__ */ (0, $.jsx)(Qa, {
				state: r,
				settle: i,
				receipt: t,
				pikpakAccount: u,
				active: n
			})
		},
		c && {
			id: "downloads-pikpak",
			label: J("settings:pikpakAccount.title"),
			content: /* @__PURE__ */ (0, $.jsx)(ro, {
				state: r,
				settle: i,
				receipt: t,
				username: a,
				setUsername: o
			})
		},
		{
			id: "downloads-local",
			label: J("settings:localDownload.title"),
			content: /* @__PURE__ */ (0, $.jsx)(Ra, {
				state: r,
				settle: i,
				receipt: t
			})
		},
		{
			id: "downloads-browser",
			label: J("settings:javBrowser.title"),
			content: /* @__PURE__ */ (0, $.jsx)(Ta, {
				receipt: t,
				refreshKey: JSON.stringify([
					r.media_sources,
					r.config,
					r.token_set,
					r.pikpak.logged_in,
					r.qbittorrent,
					r.local_roots
				])
			})
		}
	] });
}
function Qa({ state: e, settle: t, receipt: n, pikpakAccount: r, active: i }) {
	let { checked: a, checkFailed: o } = qr(), s = J("settings:connectionCheck.action", { service: "CloudDrive2" }), [c, l] = (0, Z.useState)(e.config), [d, f] = (0, Z.useState)(""), [p, h] = (0, Z.useState)(String(e.config.wait_hours)), [g, _] = (0, Z.useState)(null), [v, y] = (0, Z.useState)(""), [b, x] = (0, Z.useState)(to), [S, C] = (0, Z.useState)(""), w = Y(), T = Oa(), { errors: E } = T, D = (0, Z.useRef)(!1), O = e.media_sources ?? [], ee = O.includes("115"), k = O.includes("pikpak"), A = (e) => c.targets[e] ?? "", te = (e, t) => l({
		...c,
		targets: {
			...c.targets,
			[e]: t
		}
	}), ne = ee && !(!b.target || b.target.exists || A("115") !== b.target.path), re = (e, t, n = "") => {
		let r = t.target ? e.suggested_target : null, i = !!(r && n && r.path === n), a = t.root ? e.suggested_pikpak_root : "";
		l((n) => ({
			...n,
			clouddrive_address: t.address && e.address ? e.address : n.clouddrive_address,
			targets: r && !i ? {
				...n.targets,
				115: r.path
			} : n.targets,
			pikpak_root: a || n.pikpak_root
		})), _(e), y(t.address ? e.address : ""), x({
			target: r,
			root: a,
			saved: i
		}), C("");
	}, ie = (e) => {
		let t = Aa(e);
		return t ? q(t, "", { label: "CloudDrive2" }) : "";
	}, ae = (e) => Ma(e) ? q("errors.downloads.targetIsRoot", "") : "", oe = () => p.trim() ? /^[+-]?\d+$/.test(p.trim()) ? Number(p) < 1 || Number(p) > e.max_wait_hours ? q("errors.downloads.waitHoursOutOfRange", "", { max: e.max_wait_hours }) : "" : q("errors.downloads.waitHoursNotNumber", "") : "";
	return (0, Z.useEffect)(() => {
		if (!i || D.current || (D.current = !0, !e.available || !e.config.clouddrive_address || !e.token_set)) return;
		let t = {
			address: !1,
			target: !e.config.targets[115],
			root: !e.config.pikpak_root
		};
		w.run("auto", (e) => H(Ba, e), (e) => re(e, t), (e) => C(K(e)));
	}, [i]), /* @__PURE__ */ (0, $.jsxs)(R, {
		guide: "download",
		title: J("settings:cloudDownload.title"),
		onSubmit: (e) => {
			if (e.preventDefault(), C(""), !T.check(e.currentTarget, {
				address: ie(c.clouddrive_address),
				target115: ee ? ae(A("115")) || (ne ? J("settings:cloudDownload.createOrPick") : "") : "",
				targetPikPak: k ? ae(A("pikpak")) : "",
				hours: oe()
			})) return;
			let i = !A("115").trim(), a = {
				...c,
				wait_hours: p.trim(),
				token: d,
				pikpak_account: r
			};
			w.run("save", (e) => U(za, a, "POST", e), (e) => {
				let { report: r, ...a } = e;
				t(a), l(a.config), h(String(a.config.wait_hours)), f(""), r ? re(r, {
					address: !a.config.clouddrive_address,
					target: i,
					root: !a.config.pikpak_root
				}, a.config.targets[115] ?? "") : (_(null), y(""), x(to), C("")), n(J("settings:shared.settingsSaved"));
			}, (e) => C(K(e)));
		},
		children: [
			e.problems?.length ? /* @__PURE__ */ (0, $.jsx)(B, { children: /* @__PURE__ */ (0, $.jsx)(I, {
				tone: "error",
				title: J("settings:cloudDownload.needsAttention"),
				children: Ja(e).join("\n")
			}) }) : null,
			/* @__PURE__ */ (0, $.jsxs)(B, { children: [
				/* @__PURE__ */ (0, $.jsx)(F, {
					label: J("settings:cloudDownload.cloudDriveUrl"),
					placeholder: J("settings:cloudDownload.addressPlaceholder"),
					autoComplete: "off",
					maxLength: 200,
					"data-settings-field": "address",
					validationBehavior: "aria",
					isInvalid: !!E.address,
					hint: E.address || J("settings:cloudDownload.cloudDriveUrlHelp"),
					value: c.clouddrive_address,
					isDisabled: !e.available,
					onBlur: () => T.update("address", ie(c.clouddrive_address)),
					onChange: (e) => {
						l({
							...c,
							clouddrive_address: e
						}), T.update("address");
					}
				}),
				/* @__PURE__ */ (0, $.jsx)(F, {
					label: J("settings:cloudDownload.apiToken"),
					type: "password",
					autoComplete: "off",
					maxLength: 400,
					placeholder: e.token_set ? J("settings:shared.savedLeaveBlank") : J("settings:cloudDownload.tokenPlaceholder"),
					"data-settings-field": "token",
					validationBehavior: "aria",
					isInvalid: !!E.token,
					hint: E.token || J("settings:cloudDownload.apiTokenHelp"),
					value: d,
					isDisabled: !e.available,
					onChange: (e) => {
						f(e), T.update("token");
					}
				}),
				ee ? /* @__PURE__ */ (0, $.jsx)(F, {
					label: /* @__PURE__ */ (0, $.jsx)(yt, {
						source: "115",
						label: J("settings:cloudDownload.target115")
					}),
					placeholder: J("settings:cloudDownload.targetPlaceholder"),
					autoComplete: "off",
					maxLength: 300,
					"data-settings-field": "target115",
					validationBehavior: "aria",
					isInvalid: !!(E.target115 || ne),
					hint: E.target115 || J(ne ? "settings:cloudDownload.directoryMissing" : "settings:cloudDownload.target115Help"),
					onBlur: () => T.update("target115", ae(A("115"))),
					value: A("115"),
					isDisabled: !e.available,
					onChange: (e) => {
						te("115", e), T.update("target115");
					}
				}) : null,
				k ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)(F, {
					label: /* @__PURE__ */ (0, $.jsx)(yt, {
						source: "pikpak",
						label: J("settings:cloudDownload.targetPikpak")
					}),
					placeholder: J("settings:cloudDownload.pikpakPathPlaceholder"),
					autoComplete: "off",
					maxLength: 300,
					"data-settings-field": "targetPikPak",
					validationBehavior: "aria",
					isInvalid: !!E.targetPikPak,
					hint: E.targetPikPak || J("settings:cloudDownload.targetPikpakHelp"),
					onBlur: () => T.update("targetPikPak", ae(A("pikpak"))),
					value: A("pikpak"),
					isDisabled: !e.available,
					onChange: (e) => {
						te("pikpak", e), T.update("targetPikPak");
					}
				}), /* @__PURE__ */ (0, $.jsxs)("div", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ (0, $.jsx)(be, { children: /* @__PURE__ */ (0, $.jsx)(yt, {
						source: "pikpak",
						label: J("settings:cloudDownload.pikpakRootDirectory")
					}) }), e.pikpak_roots.length ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)(ct, {
						"aria-label": J("settings:cloudDownload.pikpakRootDirectory"),
						selectedKey: c.pikpak_root || null,
						isDisabled: !e.available || !r,
						placeholder: J("settings:cloudDownload.rootPlaceholder"),
						onSelectionChange: (e) => l({
							...c,
							pikpak_root: e === null ? "" : String(e)
						}),
						children: e.pikpak_roots.map((e) => /* @__PURE__ */ (0, $.jsx)(ut, {
							id: e,
							glyph: "folder-open",
							children: e
						}, e))
					}), /* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:cloudDownload.pikpakRootDirectoryHelp") })] }) : /* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:cloudDownload.addPikpakMount") })]
				})] }) : null,
				/* @__PURE__ */ (0, $.jsx)(F, {
					label: J("settings:cloudDownload.maxWait"),
					inputMode: "numeric",
					autoComplete: "off",
					"data-settings-field": "hours",
					validationBehavior: "aria",
					isInvalid: !!E.hours,
					hint: E.hours || J("settings:cloudDownload.waitHint", { max: e.max_wait_hours }),
					onBlur: () => T.update("hours", oe()),
					value: p,
					isDisabled: !e.available,
					onChange: (e) => {
						h(e), T.update("hours");
					}
				}),
				/* @__PURE__ */ (0, $.jsx)(eo, {
					values: c.edition_preferences ?? [],
					disabled: !e.available,
					onChange: (e) => l((t) => ({
						...t,
						edition_preferences: e
					}))
				})
			] }),
			w.busy === "auto" ? /* @__PURE__ */ (0, $.jsx)(B, {
				divided: !0,
				children: /* @__PURE__ */ (0, $.jsx)(u, {
					kind: "radar",
					label: J("settings:cloudDownload.checking")
				})
			}) : null,
			g ? /* @__PURE__ */ (0, $.jsx)(no, {
				report: g,
				detected: v,
				suggested: b,
				create: e.available ? (e) => {
					let t = {
						clouddrive_address: c.clouddrive_address,
						token: d,
						path: e,
						pikpak_root: c.pikpak_root,
						pikpak_account: r
					};
					w.run("folder", (e) => U(Va, t, "POST", e), (t) => {
						_(t), x((t) => ({
							...t,
							target: {
								path: e,
								exists: !0
							}
						})), T.update("target115"), C(""), n(J("settings:cloudDownload.directoryCreated"));
					}, (e) => C(K(e)));
				} : void 0,
				creating: w.busy === "folder"
			}) : null,
			S || w.error ? /* @__PURE__ */ (0, $.jsx)(B, {
				divided: !0,
				children: /* @__PURE__ */ (0, $.jsx)(j, { children: S || w.error })
			}) : null,
			/* @__PURE__ */ (0, $.jsxs)(N, {
				status: e.available ? void 0 : J("settings:cloudDownload.primaryOnly"),
				children: [/* @__PURE__ */ (0, $.jsx)(m, {
					variant: "secondary",
					onClick: (t) => {
						if (C(""), !T.check(t.currentTarget.form, {
							address: ie(c.clouddrive_address),
							token: ka(c.clouddrive_address) && !e.token_set && !d.trim() ? q("errors.downloadsClouddrive.tokenMissing", "") : "",
							target115: ee ? ae(A("115")) : ""
						})) {
							_(null);
							return;
						}
						let n = {
							address: !ka(c.clouddrive_address),
							target: !A("115").trim(),
							root: !c.pikpak_root
						}, i = {
							clouddrive_address: c.clouddrive_address,
							token: d,
							target: A("115"),
							pikpak_root: c.pikpak_root,
							pikpak_account: r
						};
						w.run("check", (e) => U(Ba, i, "POST", e), (e) => {
							re(e, n), e.ok ? a(J("settings:connectionCheck.passed", { service: "CloudDrive2" })) : o(s, Ja(e)[0] || J("settings:connectionCheck.details"));
						}, (e) => {
							let t = K(e);
							C(t), o(s, t);
						});
					},
					disabled: !e.available,
					...W(w.busy === "check"),
					children: J("settings:cloudDownload.testConnection")
				}), /* @__PURE__ */ (0, $.jsx)(m, {
					type: "submit",
					disabled: !e.available,
					...W(w.busy === "save"),
					children: J("settings:shared.saveSettings")
				})]
			})
		]
	});
}
var $a = Object.keys(le);
function eo({ values: e, disabled: t, onChange: n }) {
	let r = J("settings:cloudDownload.editionPreferences"), i = [...e, ...$a.filter((t) => !e.includes(t))], a = Object.fromEntries($a.map((e) => [e, Qt(e)])), o = {
		label: r,
		keys: i,
		defaults: $a,
		commit: n
	};
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		className: "flex flex-col gap-2",
		role: "group",
		"aria-label": r,
		children: [
			/* @__PURE__ */ (0, $.jsxs)("div", {
				className: "flex flex-col gap-1",
				children: [/* @__PURE__ */ (0, $.jsx)(be, { children: r }), /* @__PURE__ */ (0, $.jsx)(P, { children: J(e.length ? "settings:cloudDownload.editionPreferencesHelp" : "settings:cloudDownload.editionPreferencesDefault") })]
			}),
			/* @__PURE__ */ (0, $.jsx)(Ie, {
				order: o,
				labels: a,
				fixed: t ? i : [],
				reset: !1,
				render: (e) => /* @__PURE__ */ (0, $.jsx)("small", {
					className: `javedition ${le[e]}`,
					children: a[e]
				})
			}),
			e.length ? /* @__PURE__ */ (0, $.jsx)(m, {
				type: "button",
				variant: "secondary",
				size: "small",
				className: "self-start",
				disabled: t,
				onClick: () => n([]),
				children: J("settings:cloudDownload.resetEditionPreferences")
			}) : null
		]
	});
}
var to = {
	target: null,
	root: "",
	saved: !1
};
function no({ report: e, detected: t, suggested: n, create: r, creating: i }) {
	let a = n.target, o = !!(t || a || n.root || e.permissions.length || e.folder || e.quota);
	return !o && !e.problems.length ? null : /* @__PURE__ */ (0, $.jsxs)(B, {
		divided: !0,
		children: [
			/* @__PURE__ */ (0, $.jsx)("h4", {
				className: "text-body-medium text-text-primary",
				"data-copy-key": "settings.connectionCheck.results",
				children: J("settings:connectionCheck.results")
			}),
			o ? /* @__PURE__ */ (0, $.jsxs)(ye, { children: [
				t ? /* @__PURE__ */ (0, $.jsx)(M, {
					term: J("settings:cloudDownload.cloudDriveUrl"),
					children: J("settings:cloudDownload.detectedAddress", { address: t })
				}) : null,
				a?.exists ? /* @__PURE__ */ (0, $.jsx)(M, {
					term: /* @__PURE__ */ (0, $.jsx)(yt, {
						source: "115",
						label: J("settings:cloudDownload.target115")
					}),
					children: n.saved ? J("settings:cloudDownload.filledSaved", { path: a.path }) : J("settings:cloudDownload.filledPending", { path: a.path })
				}) : null,
				a && !a.exists ? /* @__PURE__ */ (0, $.jsxs)(M, {
					term: /* @__PURE__ */ (0, $.jsx)(yt, {
						source: "115",
						label: J("settings:cloudDownload.target115")
					}),
					children: [J("settings:cloudDownload.pathMissing", { path: a.path }), r ? /* @__PURE__ */ (0, $.jsx)(m, {
						variant: "secondary",
						size: "small",
						onClick: () => r(a.path),
						...W(i),
						children: J("settings:cloudDownload.createDirectory")
					}) : null]
				}) : null,
				n.root ? /* @__PURE__ */ (0, $.jsx)(M, {
					term: /* @__PURE__ */ (0, $.jsx)(yt, {
						source: "pikpak",
						label: J("settings:cloudDownload.pikpakRoot")
					}),
					children: J("settings:cloudDownload.filledPending", { path: n.root })
				}) : null,
				e.permissions.length ? /* @__PURE__ */ (0, $.jsx)(M, {
					term: J("settings:cloudDownload.offlinePermissions"),
					children: e.missing.length ? Ya(e).map((e) => /* @__PURE__ */ (0, $.jsx)(A, {
						variant: "caption",
						color: "yellow",
						children: J("settings:cloudDownload.missingPermission", { permission: e })
					}, e)) : /* @__PURE__ */ (0, $.jsx)(A, {
						variant: "caption",
						color: "lime",
						children: J("settings:cloudDownload.permissionsComplete")
					})
				}) : null,
				e.folder ? /* @__PURE__ */ (0, $.jsx)(M, {
					term: J("settings:cloudDownload.targetDirectory"),
					children: e.folder.can_offline ? J("settings:cloudDownload.offlineSupported", { path: e.folder.path }) : J("settings:cloudDownload.offlineUnsupported", { path: e.folder.path })
				}) : null,
				e.quota ? /* @__PURE__ */ (0, $.jsx)(M, {
					term: /* @__PURE__ */ (0, $.jsx)(yt, {
						source: "115",
						label: J("settings:cloudDownload.quota115")
					}),
					children: J("settings:cloudDownload.quotaLeft", {
						count: e.quota.left,
						total: e.quota.total
					})
				}) : null
			] }) : null,
			Ja(e).map((e) => /* @__PURE__ */ (0, $.jsx)(j, { children: e }, e))
		]
	});
}
function ro({ state: e, settle: t, receipt: n, username: r, setUsername: i }) {
	let [a, o] = (0, Z.useState)(""), s = Oa(), [c, l] = (0, Z.useState)(!1), [d, f] = (0, Z.useState)(""), [p, h] = (0, Z.useState)(""), [g, _] = (0, Z.useState)(""), v = Y(), y = e.pikpak, b = e.pikpak_browser, x = b.state === "waiting";
	(0, Z.useEffect)(() => {
		if (!x) return;
		let e = new AbortController();
		return Kn({
			signal: e.signal,
			everyMs: Ga,
			limitMs: Ka,
			read: (e) => H(Wa, e),
			apply: (e) => {
				t(e), e.pikpak_browser.state === "done" ? n(J("settings:pikpakAccount.signedInReceipt")) : e.pikpak_browser.state !== "waiting" && _(Nn(e.pikpak_browser));
			},
			done: (e) => e.pikpak_browser.state !== "waiting",
			failed: (e) => h(K(e))
		}), () => e.abort();
	}, [x]);
	let S = () => {
		_(""), v.run("browser", (e) => U(Wa, {}, "POST", e), (e) => {
			t(e), h("");
		}, (e) => h(K(e)));
	}, C = () => {
		v.run("cancel", (e) => U(`${Wa}/cancel`, {}, "POST", e), (e) => {
			t(e), h(""), _(Nn(e.pikpak_browser));
		}, (e) => h(K(e)));
	}, w = (e) => {
		if (e.preventDefault(), y.logged_in || (h(""), !s.check(e.currentTarget, {
			username: r.trim() ? "" : J("settings:pikpakAccount.accountRequired"),
			password: a ? "" : J("settings:pikpakAccount.passwordRequired")
		}))) return;
		let i = {
			username: r,
			password: a,
			remember: c
		};
		v.run("login", (e) => U(Ha, i, "POST", e), (e) => {
			t(e.settings), h(""), e.ok ? (f(""), o(""), n(J("settings:pikpakAccount.signedInReceipt"))) : f(e.captcha_url ?? "");
		}, (e) => h(K(e)));
	}, T = () => {
		v.run("logout", (e) => U(Ua, {}, "POST", e), (e) => {
			t(e), h(""), n(J("settings:pikpakAccount.signedOutReceipt"));
		}, (e) => h(K(e)));
	}, E = /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
		/* @__PURE__ */ (0, $.jsx)(F, {
			label: J("settings:shared.account"),
			placeholder: J("settings:pikpakAccount.usernamePlaceholder"),
			autoComplete: "username",
			maxLength: 200,
			"data-settings-field": "username",
			validationBehavior: "aria",
			isInvalid: !!s.errors.username,
			hint: s.errors.username,
			value: r,
			isDisabled: !e.available,
			onChange: (e) => {
				i(e), s.update("username");
			}
		}),
		/* @__PURE__ */ (0, $.jsx)(F, {
			label: J("settings:shared.password"),
			type: "password",
			autoComplete: "current-password",
			maxLength: 200,
			"data-settings-field": "password",
			validationBehavior: "aria",
			isInvalid: !!s.errors.password,
			hint: s.errors.password,
			value: a,
			isDisabled: !e.available,
			onChange: (e) => {
				o(e), s.update("password");
			}
		}),
		/* @__PURE__ */ (0, $.jsx)(k, {
			isSelected: c,
			isDisabled: !e.available,
			onChange: l,
			children: J("settings:pikpakAccount.rememberPassword")
		}),
		d ? /* @__PURE__ */ (0, $.jsx)(I, {
			tone: "warning",
			title: J("settings:pikpakAccount.captchaTitle"),
			extra: /* @__PURE__ */ (0, $.jsx)("div", {
				className: "pt-2",
				children: /* @__PURE__ */ (0, $.jsx)(he, {
					href: d,
					children: J("settings:pikpakAccount.openCaptcha")
				})
			}),
			children: J("settings:pikpakAccount.captchaHelp")
		}) : null
	] }), D = /* @__PURE__ */ (0, $.jsx)(m, {
		type: "submit",
		variant: "primary",
		disabled: !e.available || x,
		...W(v.busy === "login"),
		children: J("settings:shared.signIn")
	}), O = b.state === "timeout" || b.state === "failed";
	return /* @__PURE__ */ (0, $.jsxs)(R, {
		guide: "pikpak",
		title: J("settings:pikpakAccount.title"),
		icon: /* @__PURE__ */ (0, $.jsx)(qa, {}),
		onSubmit: w,
		aside: /* @__PURE__ */ (0, $.jsx)(xt, {
			tone: y.logged_in ? "success" : x ? "progress" : O ? "error" : "neutral",
			children: y.logged_in ? J("settings:pikpakAccount.signedIn") : J(x ? "settings:pikpakAccount.waiting" : O ? "settings:pikpakAccount.incomplete" : "settings:pikpakAccount.notSignedIn")
		}),
		children: [
			y.logged_in ? /* @__PURE__ */ (0, $.jsxs)(ye, { children: [/* @__PURE__ */ (0, $.jsx)(M, {
				term: J("settings:shared.account"),
				children: y.username || J("settings:pikpakAccount.signedIn")
			}), y.method === "browser" ? /* @__PURE__ */ (0, $.jsx)(M, {
				term: J("settings:pikpakAccount.method"),
				children: J("settings:pikpakAccount.browserMethod")
			}) : /* @__PURE__ */ (0, $.jsx)(M, {
				term: J("settings:shared.password"),
				children: y.remember ? J("settings:pikpakAccount.passwordSaved") : J("settings:pikpakAccount.passwordNotSaved")
			})] }) : /* @__PURE__ */ (0, $.jsxs)(B, { children: [g ? O ? /* @__PURE__ */ (0, $.jsx)(j, { children: g }) : /* @__PURE__ */ (0, $.jsx)(P, {
				role: "status",
				children: g
			}) : null, E] }),
			p || v.error ? /* @__PURE__ */ (0, $.jsx)(B, {
				divided: !0,
				children: /* @__PURE__ */ (0, $.jsx)(j, { children: p || v.error })
			}) : null,
			/* @__PURE__ */ (0, $.jsx)(N, {
				status: !y.logged_in && x ? /* @__PURE__ */ (0, $.jsx)(u, {
					kind: "clock",
					label: Nn(b) || J("settings:pikpakAccount.waitingBrowser")
				}) : null,
				children: y.logged_in ? /* @__PURE__ */ (0, $.jsx)(m, {
					variant: "secondary",
					onClick: T,
					disabled: !e.available,
					...W(v.busy === "logout"),
					children: J("settings:shared.signOut")
				}) : /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [b.available ? x ? /* @__PURE__ */ (0, $.jsx)(m, {
					variant: "secondary",
					type: "button",
					onClick: C,
					...W(v.busy === "cancel"),
					children: J("settings:shared.cancel")
				}) : /* @__PURE__ */ (0, $.jsx)(m, {
					variant: "secondary",
					type: "button",
					onClick: S,
					disabled: !e.available,
					...W(v.busy === "browser"),
					children: J("settings:pikpakAccount.browserSignIn")
				}) : null, D] })
			})
		]
	});
}
// src/react/settings/general-settings.tsx
var io = "/api/configuration/startup";
function ao({ active: e, initial: t, receipt: n }) {
	let r = X({
		queryKey: ["configuration", "startup"],
		queryFn: ({ signal: e }) => H(io, e),
		enabled: e,
		initialData: t
	});
	return r.data ? /* @__PURE__ */ (0, $.jsx)(oo, {
		startup: r.data,
		receipt: n
	}) : e ? /* @__PURE__ */ (0, $.jsx)(R, {
		guide: "startup",
		title: J("settings:startup.title"),
		children: r.isError ? /* @__PURE__ */ (0, $.jsx)(I, {
			tone: "error",
			action: /* @__PURE__ */ (0, $.jsx)(m, {
				variant: "secondary",
				size: "small",
				...W(r.isFetching),
				onClick: () => void r.refetch(),
				children: J("settings:shared.reload")
			}),
			children: K(r.error)
		}) : /* @__PURE__ */ (0, $.jsx)("div", {
			role: "status",
			"aria-busy": "true",
			className: "px-4 py-3",
			children: /* @__PURE__ */ (0, $.jsx)("span", { className: "block h-4 w-36 rounded-md bg-background-tertiary-default" })
		})
	}) : null;
}
function oo({ startup: e, receipt: t }) {
	let [n, r] = (0, Z.useState)(e.enabled), [i, a] = (0, Z.useState)(e.silent), [o, s] = (0, Z.useState)(e.desktop), c = Y(), l = e.available && !e.desktop_message, u = G(e, "desktop_message"), d = G(e, "message");
	return /* @__PURE__ */ (0, $.jsxs)(R, {
		guide: "startup",
		title: J("settings:startup.title"),
		onSubmit: (r) => {
			r.preventDefault(), e.available && c.run("save", (e) => U(io, {
				enabled: n,
				silent: i,
				desktop: o
			}, "POST", e), () => t(J("settings:shared.settingsSaved")));
		},
		children: [
			/* @__PURE__ */ (0, $.jsxs)(L, { children: [
				/* @__PURE__ */ (0, $.jsx)(z, {
					label: J("settings:startup.launchAtStartup"),
					description: J("settings:startup.launchAtStartupHelp"),
					children: /* @__PURE__ */ (0, $.jsx)(V, {
						"aria-label": J("settings:startup.launchAtStartup"),
						isSelected: n,
						isDisabled: !e.available,
						onChange: r
					})
				}),
				/* @__PURE__ */ (0, $.jsx)(z, {
					label: J("settings:startup.trayOnly"),
					description: J("settings:startup.trayOnlyHelp"),
					children: /* @__PURE__ */ (0, $.jsx)(V, {
						"aria-label": J("settings:startup.trayOnly"),
						isSelected: i,
						isDisabled: !e.available || !n,
						onChange: a
					})
				}),
				/* @__PURE__ */ (0, $.jsx)(z, {
					label: J("settings:startup.desktopShortcut"),
					description: u || void 0,
					children: /* @__PURE__ */ (0, $.jsx)(V, {
						"aria-label": J("settings:startup.desktopShortcut"),
						isSelected: o,
						isDisabled: !l,
						onChange: s
					})
				})
			] }),
			d || c.error ? /* @__PURE__ */ (0, $.jsxs)(B, {
				divided: !0,
				children: [d ? /* @__PURE__ */ (0, $.jsx)(P, { children: d }) : null, c.error ? /* @__PURE__ */ (0, $.jsx)(j, { children: c.error }) : null]
			}) : null,
			/* @__PURE__ */ (0, $.jsx)(N, { children: /* @__PURE__ */ (0, $.jsx)(m, {
				type: "submit",
				disabled: !e.available,
				...W(c.busy === "save"),
				children: J("settings:shared.saveSettings")
			}) })
		]
	});
}
// src/react/settings/ledger-backup-settings.tsx
var so = "/api/configuration/ledger-backups", co = 1500, lo = 36e5, uo = (e) => (/* @__PURE__ */ new Date(e.modified_at * 1e3)).toLocaleString(Dn);
function fo(e) {
	return [e.source === "manual" ? J("settings:databaseBackups.manual") : J("settings:databaseBackups.automatic", { purpose: q(`ledgerBackup.purpose.${e.purpose_code}`, e.purpose) }), ln(e.bytes)].join(" · ");
}
function po({ job: e, task: t, label: n }) {
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		"aria-live": "polite",
		className: "flex flex-col gap-2",
		children: [/* @__PURE__ */ (0, $.jsx)(Tt, {
			embedded: !0,
			kind: Mt(t, e.stage_code),
			label: [n, yr(e)].filter(Boolean).join(" · "),
			value: e.done || 0,
			total: e.total
		}), /* @__PURE__ */ (0, $.jsx)(wt, {})]
	});
}
function mo({ receipt: e }) {
	let [t, n] = (0, Z.useState)(null), [r, i] = (0, Z.useState)(""), a = Y(), o = t?.backup.status === "running", s = t?.restore.status === "running", c = o || s, l = (0, Z.useRef)({
		backup: !1,
		restore: !1
	});
	if ((0, Z.useEffect)(() => {
		let e = new AbortController();
		return H(so, e.signal).then(n, (t) => {
			e.signal.aborted || i(String(t?.message || t));
		}), () => e.abort();
	}, []), (0, Z.useEffect)(() => {
		if (!c) return;
		let e = new AbortController();
		return Kn({
			signal: e.signal,
			everyMs: co,
			limitMs: lo,
			read: (e) => H(so, e),
			apply: n,
			done: (e) => e.backup.status !== "running" && e.restore.status !== "running"
		}), () => e.abort();
	}, [c]), (0, Z.useEffect)(() => {
		if (t) for (let n of ["backup", "restore"]) {
			let r = t[n];
			r.status === "running" ? l.current[n] = !0 : l.current[n] && (l.current[n] = !1, r.status === "complete" && e(n === "backup" ? J("settings:databaseBackups.backedUp", { name: r.name }) : J("settings:databaseBackups.restored", { name: r.saved })));
		}
	}, [t]), !t && !r) return /* @__PURE__ */ (0, $.jsx)(it, {
		label: J("settings:databaseBackups.loading"),
		html: In
	});
	if (!t) return /* @__PURE__ */ (0, $.jsx)(R, {
		id: "ledgerBackups",
		guide: "ledger-backups",
		title: J("settings:databaseBackups.title"),
		children: /* @__PURE__ */ (0, $.jsx)(B, { children: /* @__PURE__ */ (0, $.jsx)(j, { children: r }) })
	});
	let u = () => void a.run("backup", (e) => U(`${so}/backup`, {}, "POST", e), n), d = (e) => void Gt({
		title: J("settings:databaseBackups.restoreTitle"),
		danger: !0,
		body: J("settings:databaseBackups.restoreBody", {
			time: uo(e),
			details: fo(e)
		}),
		confirmLabel: J("settings:databaseBackups.replaceCurrent"),
		onConfirm: async () => {
			l.current.restore = !0, n(await U(`${so}/restore`, {
				id: e.id,
				confirm: !0
			}));
		}
	}), f = [t.backup, t.restore].find((e) => e.status === "failed"), p = t.last_restore, h = o ? J("settings:databaseBackups.backingUp") : s ? J("settings:databaseBackups.restoring") : t.backups.length ? J("settings:databaseBackups.count", { count: t.backups.length }) : J("settings:databaseBackups.empty");
	return /* @__PURE__ */ (0, $.jsxs)(R, {
		id: "ledgerBackups",
		guide: "ledger-backups",
		title: J("settings:databaseBackups.title"),
		children: [
			/* @__PURE__ */ (0, $.jsxs)(B, { children: [
				/* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:databaseBackups.help") }),
				t.writer ? null : /* @__PURE__ */ (0, $.jsxs)(P, { children: [J("settings:databaseBackups.notPrimary"), G(t, "writer_reason")] }),
				o ? /* @__PURE__ */ (0, $.jsx)(po, {
					job: t.backup,
					task: "ledger-backup",
					label: J("settings:databaseBackups.backupProgress")
				}) : null,
				s ? /* @__PURE__ */ (0, $.jsx)(po, {
					job: t.restore,
					task: "ledger-restore",
					label: J("settings:databaseBackups.restoreProgress")
				}) : null,
				f ? /* @__PURE__ */ (0, $.jsx)(j, { children: Nn(f, "error") || J("settings:databaseBackups.jobIncomplete") }) : null,
				p ? p.outcome === "kept" || p.outcome === "completed" ? /* @__PURE__ */ (0, $.jsx)(P, { children: G(p, "message") }) : /* @__PURE__ */ (0, $.jsx)(j, { children: G(p, "message") }) : null,
				a.error ? /* @__PURE__ */ (0, $.jsx)(j, { children: a.error }) : null
			] }),
			t.backups.length ? /* @__PURE__ */ (0, $.jsx)("div", {
				className: "border-t border-separator-border",
				"data-ledger-backups": "",
				children: /* @__PURE__ */ (0, $.jsx)(L, { children: t.backups.map((e) => /* @__PURE__ */ (0, $.jsx)(z, {
					label: uo(e),
					description: fo(e),
					children: /* @__PURE__ */ (0, $.jsx)(m, {
						variant: "secondary",
						disabled: !t.writer || c,
						onClick: () => d(e),
						children: J("settings:databaseBackups.restore")
					})
				}, e.id)) })
			}) : null,
			/* @__PURE__ */ (0, $.jsx)(N, {
				status: /* @__PURE__ */ (0, $.jsx)("p", { children: h }),
				children: /* @__PURE__ */ (0, $.jsx)(m, {
					disabled: c,
					onClick: u,
					...W(a.busy === "backup" || o),
					children: J("settings:databaseBackups.backUpNow")
				})
			})
		]
	});
}
// src/react/settings/background-work-settings.tsx
var ho = "/api/configuration/background-work", go = ["background-work-settings"];
function _o({ receipt: e }) {
	let t = X({
		queryKey: go,
		queryFn: ({ signal: e }) => H(ho, e)
	}), n = Y();
	return /* @__PURE__ */ (0, $.jsxs)(R, {
		id: "backgroundWork",
		title: J("settings:backgroundWork.title"),
		children: [
			/* @__PURE__ */ (0, $.jsx)(L, { children: /* @__PURE__ */ (0, $.jsx)(z, {
				label: J("settings:backgroundWork.precompute"),
				description: J("settings:backgroundWork.precomputeHelp"),
				children: /* @__PURE__ */ (0, $.jsx)(V, {
					"aria-label": J("settings:backgroundWork.precompute"),
					isSelected: t.data?.precompute ?? !1,
					isDisabled: !t.data || !!n.busy,
					onChange: (t) => void n.run("save", (e) => U(ho, { precompute: t }, "POST", e), (t) => {
						Xn.setQueryData(go, t), e(J("settings:shared.settingsSaved"));
					})
				})
			}) }),
			t.error ? /* @__PURE__ */ (0, $.jsx)(B, {
				divided: !0,
				children: /* @__PURE__ */ (0, $.jsx)(qe, {
					titleKey: "settings:backgroundWork.loadFailed",
					query: t
				})
			}) : null,
			n.error ? /* @__PURE__ */ (0, $.jsx)(B, {
				divided: !0,
				children: /* @__PURE__ */ (0, $.jsx)(j, { children: n.error })
			}) : null
		]
	});
}
// src/react/settings/docker-update.tsx
var vo = 3e3, yo = 9e5;
async function bo(e, t, n) {
	let r = "";
	return await Kn({
		read: n.read || ((e) => H("/api/client-updates", e)),
		apply: (t) => {
			let n = t.runtime?.version;
			n && n !== e && (r = n);
		},
		done: () => !!r,
		signal: t,
		everyMs: vo,
		limitMs: Math.max(1, n.limitMs),
		pause: n.pause
	}), t.aborted ? null : r ? {
		state: "done",
		version: r
	} : { state: "timeout" };
}
function xo(e) {
	let [t, n] = (0, Z.useState)({ state: "idle" }), r = Y(), i = (0, Z.useRef)(0);
	return (0, Z.useEffect)(() => {
		if (t.state !== "updating") return;
		let r = new AbortController();
		return bo(e, r.signal, { limitMs: yo - (Date.now() - i.current) }).then((e) => {
			e && n(e);
		}), () => r.abort();
	}, [t.state, e]), {
		job: t,
		run: () => r.run("docker-update", (e) => U("/api/configuration/docker-update", {}, "POST", e), () => {
			i.current = Date.now(), n({ state: "updating" });
		}),
		busy: r.busy === "docker-update",
		error: r.error
	};
}
function So({ job: e }) {
	return e.state === "updating" ? /* @__PURE__ */ (0, $.jsx)(Tt, {
		embedded: !0,
		kind: "clock",
		label: J("settings:dockerUpdate.updating")
	}) : e.state === "done" ? /* @__PURE__ */ (0, $.jsx)(P, {
		role: "status",
		children: J("settings:dockerUpdate.done", { version: e.version })
	}) : e.state === "timeout" ? /* @__PURE__ */ (0, $.jsxs)(B, { children: [/* @__PURE__ */ (0, $.jsx)(j, { children: J("settings:dockerUpdate.timeout") }), /* @__PURE__ */ (0, $.jsx)(te, {
		label: J("settings:dockerUpdate.logsLabel"),
		steps: [{
			text: J("settings:dockerUpdate.watchtowerLog"),
			command: "docker compose logs watchtower"
		}, {
			text: J("settings:dockerUpdate.peachLog"),
			command: "docker compose logs peach"
		}]
	})] }) : null;
}
// src/react/settings/release-updates.tsx
var Co = /* @__PURE__ */ new Set([
	"downloading",
	"verifying",
	"extracting",
	"preparing",
	"restarting",
	"installing"
]), wo = [
	65,
	75,
	90
], To = 7, Eo = "https://github.com/peach-mitao/peach/releases", Do = /((?:[\w.-]+\/[\w.-]+)?#\d+)/;
function Oo(e) {
	let [t, n] = e.split("#");
	return `https://github.com/${t || "peach-mitao/peach"}/issues/${n}`;
}
function ko({ text: e }) {
	return /* @__PURE__ */ (0, $.jsx)($.Fragment, { children: e.split("`").map((e, t) => t % 2 ? /* @__PURE__ */ (0, $.jsx)("code", { children: e }, t) : e.split(Do).map((e, n) => n % 2 ? /* @__PURE__ */ (0, $.jsx)("a", {
		href: Oo(e),
		target: "_blank",
		rel: "noopener noreferrer",
		className: "text-accent-600 hover:underline",
		children: e
	}, `${t}-${n}`) : e)) });
}
function Ao({ notes: e }) {
	let t = Dn === "zh-CN" ? "zh-CN" : "en";
	return /* @__PURE__ */ (0, $.jsx)(ce, {
		summary: J("settings:releaseUpdates.changelogTitle", { versions: Pn(e.map((e) => e.version)) }),
		children: /* @__PURE__ */ (0, $.jsx)("div", {
			className: "flex flex-col gap-5 pt-3",
			children: e.map((e) => /* @__PURE__ */ (0, $.jsxs)("section", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, $.jsxs)("div", {
					className: "flex items-baseline justify-between gap-3",
					children: [/* @__PURE__ */ (0, $.jsx)("h3", {
						className: "text-body-2-medium text-text-primary",
						children: e.version
					}), /* @__PURE__ */ (0, $.jsx)(he, {
						href: e.url,
						children: J("settings:releaseUpdates.releasePage")
					})]
				}), /* @__PURE__ */ (0, $.jsx)("ul", {
					className: "flex list-disc flex-col gap-1 ps-5 text-body-2-regular text-text-primary",
					children: e[t].map((e, t) => /* @__PURE__ */ (0, $.jsxs)("li", { children: [e.title ? /* @__PURE__ */ (0, $.jsx)("span", {
						className: "text-body-2-medium",
						children: J("settings:releaseUpdates.highlightTitle", { title: e.title })
					}) : null, /* @__PURE__ */ (0, $.jsx)(ko, { text: e.text })] }, t))
				})]
			}, e.version))
		})
	});
}
function jo({ initial: e, initialJob: t }) {
	let [n, r] = (0, Z.useState)(e), [i, a] = (0, Z.useState)(t || {
		state: "idle",
		progress: 0
	}), { snapshot: o, failures: s } = Or(), c = (0, Z.useRef)(o), l = Y(), { checked: u, checkFailed: d } = qr(), p = (0, Z.useRef)(!1), g = (0, Z.useRef)(!0), _ = Co.has(i.state), v = xo(e.current_version), y = n.state === "available" && !!n.one_click?.available, b = v.job.state === "updating", x = n.installation_code === "standalone", S = () => void Gt({
		title: J("settings:releaseUpdates.oneClickUpdate"),
		body: J("settings:releaseUpdates.dockerUpdateBody", { version: n.latest_version || "" }),
		confirmLabel: J("settings:releaseUpdates.startUpdate"),
		cancelLabel: J("settings:shared.cancel"),
		onConfirm: v.run
	});
	(0, Z.useEffect)(() => (g.current = !0, () => {
		g.current = !1;
	}), []);
	let C = async () => {
		let e = await U("/api/configuration/update-restart", {});
		g.current && a(e), Bt();
	}, w = () => void Gt({
		title: J("settings:releaseUpdates.updateReady"),
		body: J("settings:releaseUpdates.installAfterRestart", { version: i.version || "" }),
		confirmLabel: J("settings:releaseUpdates.restartNow"),
		cancelLabel: J("settings:shared.later"),
		onConfirm: C
	});
	(0, Z.useEffect)(() => {
		i.state !== "ready" || p.current || (p.current = !0, w());
	}, [i.state]), (0, Z.useEffect)(() => {
		if (!o || o === c.current) return;
		let e = o.update_job;
		a(e), o.release.checked_at && r(o.release), e.state === "complete" && r((t) => ({
			...t,
			current_version: e.version || t.current_version,
			state: "current",
			message: J("settings:releaseUpdates.latestTestBuild")
		}));
	}, [o]);
	let T = () => {
		_ || (p.current = !1, l.run("download", (e) => U("/api/configuration/update", {}, "POST", e), (e) => {
			a(e), Bt();
		}));
	}, E = () => void l.run("check", (e) => H("/api/configuration/updates", e), (e) => {
		r(e);
		let t = pr(e);
		e.state === "error" ? d(J("settings:releaseUpdates.check"), t) : u(t || J("settings:releaseUpdates.checkDone"));
	}, (t) => {
		let n = K(t);
		r({
			...e,
			state: "error"
		}), l.setError(n), d(J("settings:releaseUpdates.check"), n);
	}), D = s >= To ? J("settings:releaseUpdates.connectionLost") : "", O = l.error || D || v.error, ee = pr(n), k = n.installation_code === "standalone" && (n.state === "available" || i.state !== "idle") ? n.package_kind : void 0, A = k === "update" ? J("settings:releaseUpdates.updatePackageHelp") : k === "full" ? J("settings:releaseUpdates.includesMediaTools") : k === "installer" ? J("settings:releaseUpdates.installerHelp") : "", ne = i.state === "downloading" && i.total ? `${((i.downloaded || 0) / 1048576).toFixed(1)} / ${(i.total / 1048576).toFixed(1)} MB` : `${i.progress}%`;
	return /* @__PURE__ */ (0, $.jsxs)(R, {
		id: "releaseUpdates",
		guide: "updates",
		title: J("settings:releaseUpdates.check"),
		aside: /* @__PURE__ */ (0, $.jsx)(xt, {
			tone: O || n.state === "error" || i.state === "error" || v.job.state === "timeout" ? "error" : _ || b ? "progress" : v.job.state === "done" ? "success" : n.state === "available" ? "warning" : n.state === "unchecked" ? "neutral" : "success",
			children: O || n.state === "error" || i.state === "error" ? J("settings:releaseUpdates.checkIncomplete") : v.job.state === "timeout" ? J("settings:releaseUpdates.updateIncomplete") : _ ? J("settings:releaseUpdates.preparing") : b ? J("settings:releaseUpdates.updating") : v.job.state === "done" ? J("settings:releaseUpdates.updated") : i.state === "ready" ? J("settings:releaseUpdates.readyToInstall") : n.state === "available" ? J("settings:releaseUpdates.updateAvailable") : n.state === "unchecked" ? J("settings:releaseUpdates.notChecked") : J("settings:releaseUpdates.checkDone")
		}),
		children: [
			/* @__PURE__ */ (0, $.jsxs)(ye, { children: [
				/* @__PURE__ */ (0, $.jsx)(M, {
					term: J("settings:releaseUpdates.currentVersion"),
					children: v.job.state === "done" ? v.job.version : n.current_version
				}),
				/* @__PURE__ */ (0, $.jsx)(M, {
					term: J("settings:releaseUpdates.installation"),
					children: q(`release.installation.${n.installation_code}`, n.installation)
				}),
				/* @__PURE__ */ (0, $.jsx)(M, {
					term: J("settings:releaseUpdates.channel"),
					children: q(`release.channel.${n.channel_code}`, n.channel)
				}),
				/* @__PURE__ */ (0, $.jsx)(M, {
					term: J("settings:releaseUpdates.latestVersion"),
					children: n.latest_version || J("settings:shared.notFound")
				}),
				k ? /* @__PURE__ */ (0, $.jsxs)(M, {
					term: J("settings:releaseUpdates.package"),
					children: [J(k === "update" ? "settings:releaseUpdates.appUpdatePackage" : k === "installer" ? "settings:releaseUpdates.macosDiskImage" : "settings:releaseUpdates.appAndTools"), n.asset_size ? ` · ${(n.asset_size / 1048576).toFixed(1)} MB` : ""]
				}) : null
			] }),
			A ? /* @__PURE__ */ (0, $.jsx)(B, { children: /* @__PURE__ */ (0, $.jsx)(P, { children: A }) }) : null,
			n.state === "unchecked" && !n.checked_at && !O && i.state === "idle" ? null : /* @__PURE__ */ (0, $.jsxs)(B, {
				divided: !0,
				children: [
					n.checked_at ? /* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:releaseUpdates.checkedAt", { time: (/* @__PURE__ */ new Date(n.checked_at * 1e3)).toLocaleString(Dn) }) }) : null,
					v.job.state === "done" ? null : n.state === "available" && !O ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)(I, {
						tone: "info",
						title: J("settings:releaseUpdates.updateAvailable"),
						children: ee
					}), n.notes?.length ? /* @__PURE__ */ (0, $.jsx)(Ao, { notes: n.notes }) : null] }) : O || n.state === "error" ? /* @__PURE__ */ (0, $.jsx)(j, { children: O || ee }) : n.state === "unchecked" ? null : /* @__PURE__ */ (0, $.jsx)(P, {
						role: "status",
						children: ee
					}),
					n.state === "available" && !O && !y && v.job.state === "idle" && n.steps?.length ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)(te, {
						label: J("settings:releaseUpdates.updateOnHost"),
						steps: n.steps.map((e) => ({
							...e,
							text: q(`release.dockerStep.${e.id}`, e.text)
						}))
					}), /* @__PURE__ */ (0, $.jsx)(P, { children: (n.one_click?.reason ? G(n.one_click, "reason") : "") || J("settings:releaseUpdates.watchtowerHint") })] }) : null,
					/* @__PURE__ */ (0, $.jsx)(So, { job: v.job }),
					i.state === "error" ? /* @__PURE__ */ (0, $.jsx)(j, { children: Nn(i) }) : null,
					i.state !== "idle" && i.state !== "error" ? /* @__PURE__ */ (0, $.jsxs)("div", {
						"aria-live": "polite",
						className: "flex flex-col gap-2",
						children: [
							/* @__PURE__ */ (0, $.jsx)(Ke, {
								label: J("settings:releaseUpdates.progressLabel"),
								value: i.progress,
								stops: wo
							}),
							/* @__PURE__ */ (0, $.jsxs)(P, { children: [
								J("settings:releaseUpdates.progressSteps"),
								" ",
								Nn(i)
							] }),
							/* @__PURE__ */ (0, $.jsx)(P, { children: /* @__PURE__ */ (0, $.jsx)(f, { value: ne }) })
						]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, $.jsxs)(N, {
				status: /* @__PURE__ */ (0, $.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [
						/* @__PURE__ */ (0, $.jsx)(he, {
							href: "https://peach.video/#download",
							children: J("settings:shared.officialSite")
						}),
						/* @__PURE__ */ (0, $.jsx)(he, {
							href: "https://github.com/peach-mitao/peach",
							children: "GitHub"
						}),
						/* @__PURE__ */ (0, $.jsx)(he, {
							href: n.release_url || Eo,
							children: J("settings:releaseUpdates.releasePage")
						})
					]
				}),
				children: [
					/* @__PURE__ */ (0, $.jsx)(m, {
						variant: "ghost",
						onClick: () => document.dispatchEvent(new Event(Je)),
						children: J("settings:releaseUpdates.whatsNew")
					}),
					/* @__PURE__ */ (0, $.jsx)(m, {
						variant: i.state === "ready" || y || n.state === "available" && x ? "secondary" : "primary",
						disabled: _ || b,
						onClick: E,
						...W(l.busy === "check"),
						children: J("settings:releaseUpdates.check")
					}),
					v.job.state === "done" ? /* @__PURE__ */ (0, $.jsx)(m, {
						variant: "primary",
						onClick: () => window.location.reload(),
						children: J("settings:releaseUpdates.refreshPage")
					}) : y ? /* @__PURE__ */ (0, $.jsx)(m, {
						variant: "primary",
						onClick: S,
						...W(b || v.busy),
						children: J("settings:releaseUpdates.oneClickUpdate")
					}) : null,
					n.state === "available" && n.in_app_update && i.state !== "ready" ? /* @__PURE__ */ (0, $.jsx)(m, {
						variant: "primary",
						onClick: T,
						...W(_ || l.busy === "download"),
						children: J("settings:releaseUpdates.downloadAndInstall")
					}) : n.state === "available" && x && n.asset_url ? /* @__PURE__ */ (0, $.jsx)(h, {
						variant: "primary",
						href: n.asset_url,
						children: J("settings:releaseUpdates.downloadNewVersion")
					}) : null,
					i.state === "ready" ? /* @__PURE__ */ (0, $.jsx)(m, {
						variant: "primary",
						onClick: w,
						children: J("settings:releaseUpdates.restartToInstall")
					}) : null
				]
			})
		]
	});
}
// src/react/settings/retention-settings.tsx
var Mo = "/api/configuration/retention", No = ["retention-settings"], Po = [
	2,
	5,
	10,
	20
], Fo = [
	30,
	90,
	183,
	365
], Io = (e) => e === 183 ? J("settings:retention.halfYear") : e === 365 ? J("settings:retention.oneYear") : J("settings:retention.days", { count: e });
function Lo({ receipt: e }) {
	let t = X({
		queryKey: No,
		queryFn: ({ signal: e }) => H(Mo, e)
	}), n = Y(), r = !t.data || !!n.busy, i = (t) => void n.run("save", (e) => U(Mo, t, "POST", e), (t) => {
		Xn.setQueryData(No, t), e(J("settings:shared.settingsSaved"));
	});
	return /* @__PURE__ */ (0, $.jsxs)(R, {
		title: J("settings:retention.title"),
		children: [
			/* @__PURE__ */ (0, $.jsxs)(L, { children: [/* @__PURE__ */ (0, $.jsx)(z, {
				label: J("settings:retention.backups"),
				description: J("settings:retention.backupsHelp"),
				children: /* @__PURE__ */ (0, $.jsx)("div", {
					id: "backupKeepSetting",
					className: "shrink-0",
					children: /* @__PURE__ */ (0, $.jsx)(lt, {
						"aria-label": J("settings:retention.backups"),
						selectedKey: String(t.data?.backup_keep ?? 5),
						isDisabled: r,
						onSelectionChange: (e) => {
							e !== null && i({ backup_keep: Number(e) });
						},
						children: Po.map((e) => /* @__PURE__ */ (0, $.jsx)(dt, {
							id: String(e),
							children: J("settings:retention.copies", { count: e })
						}, e))
					})
				})
			}), /* @__PURE__ */ (0, $.jsx)(z, {
				label: J("settings:retention.logs"),
				description: J("settings:retention.logsHelp"),
				children: /* @__PURE__ */ (0, $.jsx)("div", {
					id: "logDaysSetting",
					className: "shrink-0",
					children: /* @__PURE__ */ (0, $.jsx)(lt, {
						"aria-label": J("settings:retention.logs"),
						selectedKey: String(t.data?.log_days ?? 183),
						isDisabled: r,
						onSelectionChange: (e) => {
							e !== null && i({ log_days: Number(e) });
						},
						children: Fo.map((e) => /* @__PURE__ */ (0, $.jsx)(dt, {
							id: String(e),
							children: Io(e)
						}, e))
					})
				})
			})] }),
			t.error ? /* @__PURE__ */ (0, $.jsx)(B, {
				divided: !0,
				children: /* @__PURE__ */ (0, $.jsx)(qe, {
					titleKey: "settings:retention.loadFailed",
					query: t
				})
			}) : null,
			n.error ? /* @__PURE__ */ (0, $.jsx)(B, {
				divided: !0,
				children: /* @__PURE__ */ (0, $.jsx)(j, { children: n.error })
			}) : null
		]
	});
}
// src/react/settings/library-sharing-settings.tsx
function Ro({ value: e }) {
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)("ul", {
		className: "list-disc space-y-2 pl-5",
		children: fr(e.fields, e.field_codes).map((e) => /* @__PURE__ */ (0, $.jsx)("li", { children: /* @__PURE__ */ (0, $.jsx)(P, { children: e }) }, e))
	}), /* @__PURE__ */ (0, $.jsx)(P, { children: G(e, "notice") })] });
}
function zo({ value: e }) {
	let t = e.participation, n = {
		"not-attempted": J("settings:librarySharing.notSent"),
		queued: J("settings:librarySharing.waiting"),
		accepted: J("settings:librarySharing.sent"),
		failed: J("settings:librarySharing.sendFailed"),
		unknown: J("settings:librarySharing.resultUnknown"),
		blocked: J("settings:librarySharing.blocked")
	}, r = {
		queued: "progress",
		accepted: "success",
		failed: "error",
		unknown: "warning",
		blocked: "warning"
	};
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
		e.consent_state === "needs-consent" ? /* @__PURE__ */ (0, $.jsxs)(B, {
			divided: !0,
			children: [/* @__PURE__ */ (0, $.jsx)("span", {
				className: "self-start",
				children: /* @__PURE__ */ (0, $.jsx)(xt, {
					tone: "warning",
					children: J("settings:librarySharing.needsConsent")
				})
			}), /* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:librarySharing.fieldsChanged") })]
		}) : null,
		t ? /* @__PURE__ */ (0, $.jsxs)(B, {
			divided: !0,
			children: [/* @__PURE__ */ (0, $.jsx)(ye, { children: /* @__PURE__ */ (0, $.jsx)(M, {
				term: J("settings:librarySharing.participation"),
				children: /* @__PURE__ */ (0, $.jsx)(xt, {
					"aria-label": J("settings:librarySharing.participation"),
					tone: t.pending_state ? "progress" : r[t.status] || "neutral",
					children: t.pending_state ? t.pending_state === "disabled" ? J("settings:librarySharing.pendingOff") : J("settings:librarySharing.pendingOn") : n[t.status] || J("settings:librarySharing.resultUnknown")
				})
			}) }), e.last_sent_at ? /* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:librarySharing.lastSentAt", { date: new Date(e.last_sent_at).toLocaleDateString(Dn) }) }) : null]
		}) : null,
		e.enabled && e.last_attempt?.snapshot_id ? /* @__PURE__ */ (0, $.jsxs)(B, {
			divided: !0,
			children: [
				/* @__PURE__ */ (0, $.jsxs)(ye, { children: [/* @__PURE__ */ (0, $.jsx)(M, {
					term: J("settings:librarySharing.snapshot"),
					children: /* @__PURE__ */ (0, $.jsx)(xt, {
						tone: r[e.last_attempt.status || ""] || "neutral",
						children: n[e.last_attempt.status || ""] || J("settings:librarySharing.waitingData")
					})
				}), /* @__PURE__ */ (0, $.jsx)(M, {
					term: J("settings:librarySharing.snapshotId"),
					children: e.last_attempt.snapshot_id
				})] }),
				e.last_attempt.raw_bytes !== void 0 && e.last_attempt.compressed_bytes !== void 0 ? /* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:librarySharing.snapshotSizes", {
					raw: (e.last_attempt.raw_bytes / 1024).toFixed(1),
					compressed: (e.last_attempt.compressed_bytes / 1024).toFixed(1)
				}) }) : null,
				e.last_attempt.status === "accepted" ? /* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:librarySharing.acceptedHelp") }) : null
			]
		}) : null,
		e.enabled && e.last_attempt?.status === "failed" ? /* @__PURE__ */ (0, $.jsxs)(B, {
			divided: !0,
			children: [/* @__PURE__ */ (0, $.jsx)("span", {
				className: "self-start",
				children: /* @__PURE__ */ (0, $.jsx)(xt, {
					tone: e.last_attempt.attempted ? "error" : "warning",
					children: e.last_attempt.attempted ? J("settings:librarySharing.uploadFailed") : J("settings:librarySharing.retryPending")
				})
			}), /* @__PURE__ */ (0, $.jsx)(j, { children: e.last_attempt.attempted ? J("settings:librarySharing.failedThisWeek") : J("settings:librarySharing.incomplete") })]
		}) : null,
		e.enabled && e.last_attempt?.status === "waiting-data" ? /* @__PURE__ */ (0, $.jsxs)(B, {
			divided: !0,
			children: [/* @__PURE__ */ (0, $.jsx)("span", {
				className: "self-start",
				children: /* @__PURE__ */ (0, $.jsx)(xt, { children: J("settings:librarySharing.waitingData") })
			}), /* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:librarySharing.waitingDataHelp") })]
		}) : null,
		e.enabled && e.last_attempt?.status === "unknown" ? /* @__PURE__ */ (0, $.jsxs)(B, {
			divided: !0,
			children: [/* @__PURE__ */ (0, $.jsx)("span", {
				className: "self-start",
				children: /* @__PURE__ */ (0, $.jsx)(xt, {
					tone: "warning",
					children: J("settings:librarySharing.resultUnknown")
				})
			}), /* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:librarySharing.resultUnknownHelp") })]
		}) : null
	] });
}
function Bo({ preview: e }) {
	let t = JSON.stringify(e.data, null, 2);
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
		/* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:librarySharing.snapshotSizes", {
			raw: (e.bytes / 1024).toFixed(1),
			compressed: (e.compressed_bytes / 1024).toFixed(1)
		}) }),
		/* @__PURE__ */ (0, $.jsx)(Yr, {
			code: t,
			language: "json",
			label: J("settings:librarySharing.previewLabel"),
			maxCharacters: 24e3
		}),
		t.length > 24e3 ? /* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:librarySharing.truncated") }) : null
	] });
}
// src/react/settings/seed-sharing-details.tsx
function Vo() {
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
		/* @__PURE__ */ (0, $.jsx)("ul", {
			className: "list-disc space-y-2 pl-5",
			children: [
				"works",
				"entities",
				"decisions",
				"images",
				"sources"
			].map((e) => /* @__PURE__ */ (0, $.jsx)("li", { children: /* @__PURE__ */ (0, $.jsx)(P, { children: J(`settings:seedSharing.${e}`) }) }, e))
		}),
		/* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:seedSharing.excluded") }),
		/* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:seedSharing.independent") }),
		/* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:seedSharing.notice") })
	] });
}
function Ho({ value: e }) {
	let t = e.last_attempt.status;
	return /* @__PURE__ */ (0, $.jsxs)(B, {
		divided: !0,
		children: [
			/* @__PURE__ */ (0, $.jsx)(xt, {
				className: "self-start",
				tone: t === "failed" ? "error" : t === "accepted" ? "success" : "neutral",
				children: J(t ? `settings:seedSharing.status.${t}` : "settings:librarySharing.notSent")
			}),
			t === "accepted" ? /* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:seedSharing.acceptedHelp") }) : null,
			e.name_candidates && Object.values(e.name_candidates).some(Boolean) ? /* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:seedSharing.names", { ...e.name_candidates }) }) : null
		]
	});
}
function Uo({ preview: e }) {
	let t = JSON.stringify(e.data, null, 2);
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)(Yr, {
		code: t,
		language: "json",
		label: J("settings:seedSharing.previewData"),
		maxCharacters: 24e3
	}), t.length > 24e3 ? /* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:librarySharing.truncated") }) : null] });
}
// src/react/settings/sharing-choice.tsx
function Wo({ label: e, description: t, selected: n, available: r, disabled: i, busy: a = !1, onChange: o }) {
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)(L, { children: /* @__PURE__ */ (0, $.jsx)(z, {
		label: e,
		description: t,
		children: /* @__PURE__ */ (0, $.jsx)(V, {
			"aria-label": e,
			isSelected: n,
			isDisabled: i,
			onChange: o,
			...W(a)
		})
	}) }), r === !1 ? /* @__PURE__ */ (0, $.jsx)(B, {
		divided: !0,
		children: /* @__PURE__ */ (0, $.jsx)(xt, {
			className: "self-start",
			children: J("settings:librarySharing.unavailable")
		})
	}) : null] });
}
// src/react/settings/community-sharing-settings.tsx
var Go = "/api/configuration/community-sharing", Ko = ["community-sharing"];
async function qo(e) {
	let t = await H(Go, e);
	if (!t?.library || !t.metadata) throw Error(J("settings:communitySharing.readFailed"));
	return t;
}
function Jo(e) {
	let t = JSON.stringify({
		library: e.library.data,
		public_metadata: e.metadata.data
	}, null, 2), n = URL.createObjectURL(new Blob([t], { type: "application/json" })), r = document.createElement("a");
	r.href = n, r.download = "peach-community-sharing-preview.json", r.click(), setTimeout(() => URL.revokeObjectURL(n), 1e3);
}
function Yo({ title: e, children: t }) {
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		className: "flex min-w-0 flex-col gap-2",
		children: [/* @__PURE__ */ (0, $.jsx)("p", {
			className: "text-body-semibold text-text-primary",
			children: e
		}), t]
	});
}
function Xo({ active: e, receipt: t }) {
	let n = Rr(), r = X({
		queryKey: Ko,
		enabled: e,
		queryFn: ({ signal: e }) => qo(e)
	}), [i, a] = (0, Z.useState)(null), o = (0, Z.useRef)(null);
	(0, Z.useEffect)(() => {
		i && o.current?.focus();
	}, [i]);
	let s = Y(), c = r.data, l = c?.library.enabled === !0, u = c?.metadata.enabled === !0, d = l && u, f = c ? c.library.available && c.metadata.available : void 0, p = l !== u, h = c?.library.participation, g = !!(c && (c.library.consent_state === "needs-consent" || c.library.last_sent_at || c.library.last_attempt?.status || h?.pending_state || h?.status && h.status !== "not-attempted" || c.metadata.last_attempt.status || Object.values(c.metadata.name_candidates ?? {}).some(Boolean))), _ = (e) => n.setQueryData(Ko, e), v = () => void s.run("refresh", qo, _), y = () => void s.run("preview", async (e) => {
		let [t, n] = await Promise.all([H("/api/configuration/library-sharing/preview", e), H("/api/configuration/seed-sharing/preview", e)]);
		return {
			library: t,
			metadata: n
		};
	}, a), b = (e) => void s.run("save", (t) => U(Go, {
		enabled: e,
		...e && i ? {
			consent: !0,
			library: {
				token: i.library.token,
				schema: i.library.schema
			},
			metadata: {
				token: i.metadata.token,
				schema: i.metadata.schema
			}
		} : {}
	}, "POST", t), (e) => {
		_(e), a(null), e.failed?.length || t(J("settings:communitySharing.saved"));
	}, (e) => {
		s.setError(K(e)), r.refetch();
	});
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
		/* @__PURE__ */ (0, $.jsx)(Wo, {
			label: J("settings:communitySharing.enable"),
			description: J("settings:communitySharing.description"),
			selected: l || u,
			available: f,
			disabled: !c,
			busy: !!s.busy,
			onChange: (e) => e ? y() : b(!1)
		}),
		p ? /* @__PURE__ */ (0, $.jsx)(B, {
			divided: !0,
			children: /* @__PURE__ */ (0, $.jsx)(xt, {
				className: "self-start",
				tone: "warning",
				children: J(l ? "settings:communitySharing.onlyStudy" : "settings:communitySharing.onlyMetadata")
			})
		}) : null,
		c && i ? /* @__PURE__ */ (0, $.jsx)("section", {
			"aria-labelledby": "community-sharing-preview",
			children: /* @__PURE__ */ (0, $.jsxs)(B, {
				divided: !0,
				children: [
					/* @__PURE__ */ (0, $.jsx)("h4", {
						id: "community-sharing-preview",
						ref: o,
						tabIndex: -1,
						className: "text-body-semibold text-text-primary",
						children: J("settings:communitySharing.previewTitle")
					}),
					/* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:librarySharing.previewSummary", {
						count: i.library.data.library.length,
						uncoded: i.library.data.coverage.uncoded_items,
						size: (i.library.bytes / 1024).toFixed(1)
					}) }),
					/* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:seedSharing.summary", {
						count: i.metadata.data.claims.length,
						omitted: i.metadata.data.omitted,
						size: (i.metadata.bytes / 1024).toFixed(1)
					}) }),
					/* @__PURE__ */ (0, $.jsx)(ce, {
						summary: J("settings:communitySharing.previewDetails"),
						children: /* @__PURE__ */ (0, $.jsxs)("div", {
							className: "flex min-w-0 flex-col gap-6",
							children: [/* @__PURE__ */ (0, $.jsxs)(Yo, {
								title: J("settings:communitySharing.study"),
								children: [/* @__PURE__ */ (0, $.jsx)(Ro, { value: c.library }), /* @__PURE__ */ (0, $.jsx)(Bo, { preview: i.library })]
							}), /* @__PURE__ */ (0, $.jsxs)(Yo, {
								title: J("settings:seedSharing.title"),
								children: [/* @__PURE__ */ (0, $.jsx)(Vo, {}), /* @__PURE__ */ (0, $.jsx)(Uo, { preview: i.metadata })]
							})]
						})
					})
				]
			})
		}) : null,
		c?.failed?.length || r.isError || s.error ? /* @__PURE__ */ (0, $.jsx)(B, {
			divided: !0,
			children: /* @__PURE__ */ (0, $.jsx)(j, { children: s.error || (c?.failed?.length ? J("settings:communitySharing.saveFailed") : J("settings:communitySharing.readFailed")) })
		}) : null,
		c && !i && g ? /* @__PURE__ */ (0, $.jsx)("div", {
			id: "seedSharing",
			children: /* @__PURE__ */ (0, $.jsx)(B, {
				divided: !0,
				children: /* @__PURE__ */ (0, $.jsxs)(ce, {
					summary: J("settings:communitySharing.deliveryStatus"),
					children: [/* @__PURE__ */ (0, $.jsx)(Yo, {
						title: J("settings:communitySharing.study"),
						children: /* @__PURE__ */ (0, $.jsx)(zo, { value: c.library })
					}), /* @__PURE__ */ (0, $.jsx)(Yo, {
						title: J("settings:seedSharing.title"),
						children: /* @__PURE__ */ (0, $.jsx)(Ho, { value: c.metadata })
					})]
				})
			})
		}) : null,
		/* @__PURE__ */ (0, $.jsx)(N, {
			status: c && !i && !g ? /* @__PURE__ */ (0, $.jsx)("span", {
				id: "seedSharing",
				children: /* @__PURE__ */ (0, $.jsx)(xt, {
					"aria-label": J("settings:communitySharing.deliveryStatus"),
					children: J("settings:librarySharing.notSent")
				})
			}) : void 0,
			children: i ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
				/* @__PURE__ */ (0, $.jsx)(m, {
					variant: "secondary",
					onClick: () => a(null),
					children: J("settings:shared.cancel")
				}),
				/* @__PURE__ */ (0, $.jsx)(m, {
					variant: "secondary",
					onClick: () => Jo(i),
					children: J("settings:librarySharing.downloadPreview")
				}),
				d ? null : /* @__PURE__ */ (0, $.jsx)(m, {
					variant: "primary",
					disabled: !f,
					onClick: () => b(!0),
					...W(s.busy === "save"),
					children: J("settings:communitySharing.agree")
				})
			] }) : /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [g || l || u || r.isError ? /* @__PURE__ */ (0, $.jsx)(m, {
				variant: "secondary",
				onClick: v,
				...W(s.busy === "refresh"),
				children: J("settings:communitySharing.refresh")
			}) : null, /* @__PURE__ */ (0, $.jsx)(m, {
				variant: "secondary",
				disabled: !c,
				onClick: y,
				...W(s.busy === "preview"),
				children: J(p ? "settings:communitySharing.complete" : "settings:communitySharing.preview")
			})] })
		})
	] });
}
// src/react/settings/remote-reporting-settings.tsx
function Zo({ value: e, onChange: t, busy: n = !1 }) {
	return /* @__PURE__ */ (0, $.jsx)(Wo, {
		label: J("settings:dataSharing.reportErrors"),
		description: J("settings:dataSharing.reportErrorsHelp"),
		selected: e.usage && e.errors,
		available: e.available,
		busy: n,
		onChange: (n) => t({
			...e,
			usage: n,
			errors: n
		})
	});
}
function Qo({ initial: e, receipt: t }) {
	let [n, r] = (0, Z.useState)(e), i = Y(), a = Object.values(n.delivery ?? {}).flatMap((e) => e.last_sent_at ? [Date.parse(e.last_sent_at)] : []).filter(Number.isFinite), o = a.length ? Math.max(...a) : null;
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
		/* @__PURE__ */ (0, $.jsx)(Zo, {
			value: n,
			busy: i.busy === "save",
			onChange: (e) => {
				i.run("save", (t) => U("/api/configuration/remote-reporting", {
					usage: e.usage,
					errors: e.errors
				}, "POST", t), (e) => {
					r(e), t(J("settings:diagnosticsReporting.saved"));
				});
			}
		}),
		/* @__PURE__ */ (0, $.jsxs)(B, {
			divided: !0,
			children: [/* @__PURE__ */ (0, $.jsxs)(ce, {
				summary: J("settings:diagnosticsReporting.fieldsAndRules"),
				children: [
					/* @__PURE__ */ (0, $.jsx)(P, { children: q(n.field_codes?.usage ?? "", n.fields.usage) }),
					/* @__PURE__ */ (0, $.jsx)(P, { children: q(n.field_codes?.errors ?? "", n.fields.errors) }),
					/* @__PURE__ */ (0, $.jsx)(P, { children: G(n, "notice") })
				]
			}), o === null ? null : /* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:librarySharing.lastSentAt", { date: new Date(o).toLocaleDateString(Dn) }) })]
		}),
		i.error ? /* @__PURE__ */ (0, $.jsx)(B, {
			divided: !0,
			children: /* @__PURE__ */ (0, $.jsx)(j, { children: i.error })
		}) : null
	] });
}
// src/react/evilcharts/registry/charts/recharts-pie-chart.tsx
var $o = 5, es = 2e3, ts = 0, ns = "80%", rs = 0, is = 0, as = 0, os = 360, ss = [], cs = (0, Z.createContext)(null);
function ls() {
	let e = (0, Z.use)(cs);
	if (!e) throw Error("Pie chart parts (<Pie />, <Tooltip />, …) must be used within <EvilPieChart />");
	return e;
}
function us({ config: e, data: t, dataKey: n, nameKey: r, children: i, className: a, chartProps: o, defaultSelectedSector: s = null, onSelectionChange: c, isLoading: l = !1 }) {
	let [u, d] = (0, Z.useState)(s), f = (0, Z.useCallback)((e) => {
		if (d(e), e === null) {
			c?.(null);
			return;
		}
		let i = t.find((t) => t[r] === e);
		i && c?.({
			dataKey: e,
			value: i[n]
		});
	}, [
		t,
		n,
		r,
		c
	]), p = (0, Z.useMemo)(() => ({
		config: e,
		data: t,
		dataKey: n,
		nameKey: r,
		isLoading: l,
		selectedSector: u,
		selectSector: f
	}), [
		e,
		t,
		n,
		r,
		l,
		u,
		f
	]);
	return /* @__PURE__ */ (0, $.jsx)(cs, {
		value: p,
		children: /* @__PURE__ */ (0, $.jsxs)(w, {
			className: a,
			config: e,
			children: [/* @__PURE__ */ (0, $.jsx)(Ae, { isLoading: l }), /* @__PURE__ */ (0, $.jsx)(ya, {
				id: "evil-charts-pie-chart",
				accessibilityLayer: !0,
				...o,
				children: i
			})]
		})
	});
}
var ds = () => null, fs = (e, t) => {
	let n = null;
	return Z.Children.forEach(e, (e) => {
		if (!(0, Z.isValidElement)(e) || e.type !== ds) return;
		let { dataKey: r, labelListProps: i } = e.props;
		n = /* @__PURE__ */ (0, $.jsx)(Ee, {
			dataKey: r ?? t,
			stroke: "none",
			fontSize: 12,
			fontWeight: 500,
			fill: "currentColor",
			className: "fill-background",
			...i
		});
	}), n;
}, ps = ({ id: e, config: t }) => /* @__PURE__ */ (0, $.jsx)($.Fragment, { children: Object.entries(t).map(([t, n]) => {
	let r = mn(n);
	return /* @__PURE__ */ (0, $.jsx)("linearGradient", {
		id: `${e}-colors-${t}`,
		x1: "0",
		y1: "0",
		x2: "1",
		y2: "1",
		children: r === 1 ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)("stop", {
			offset: "0%",
			stopColor: `var(--color-${t}-0)`
		}), /* @__PURE__ */ (0, $.jsx)("stop", {
			offset: "100%",
			stopColor: `var(--color-${t}-0)`
		})] }) : Array.from({ length: r }, (e, n) => {
			let i = `${n / (r - 1) * 100}%`;
			return /* @__PURE__ */ (0, $.jsx)("stop", {
				offset: i,
				stopColor: `var(--color-${t}-${n}, var(--color-${t}-0))`
			}, i);
		})
	}, `${e}-colors-${t}`);
}) }), ms = ({ id: e, glowingSectors: t }) => /* @__PURE__ */ (0, $.jsx)($.Fragment, { children: t.map((t) => /* @__PURE__ */ (0, $.jsxs)("filter", {
	id: `${e}-glow-${t}`,
	x: "-100%",
	y: "-100%",
	width: "300%",
	height: "300%",
	children: [
		/* @__PURE__ */ (0, $.jsx)("feGaussianBlur", {
			in: "SourceGraphic",
			stdDeviation: "8",
			result: "blur"
		}),
		/* @__PURE__ */ (0, $.jsx)("feColorMatrix", {
			in: "blur",
			type: "matrix",
			values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.5 0",
			result: "glow"
		}),
		/* @__PURE__ */ (0, $.jsxs)("feMerge", { children: [/* @__PURE__ */ (0, $.jsx)("feMergeNode", { in: "glow" }), /* @__PURE__ */ (0, $.jsx)("feMergeNode", { in: "SourceGraphic" })] })
	]
}, `${e}-glow-${t}`)) }), hs = Array.from({ length: $o }, (e, t) => ({
	name: `loading${t}`,
	value: 100 / $o
})), gs = (e) => {
	let { index: t = 0, ...n } = e, r = t / $o * (es / 1e3);
	return /* @__PURE__ */ (0, $.jsx)(Vn.g, {
		initial: { opacity: .15 },
		animate: { opacity: [
			.15,
			.5,
			.15
		] },
		transition: {
			duration: es / 1e3,
			delay: r,
			repeat: 1e400,
			ease: "easeInOut"
		},
		children: /* @__PURE__ */ (0, $.jsx)(ot, {
			...n,
			fill: "currentColor"
		})
	});
};
us.Pie = function({ variant: e = "gradient", innerRadius: t = ts, outerRadius: n = ns, cornerRadius: r = rs, paddingAngle: i = is, startAngle: a = as, endAngle: o = os, isClickable: s = !1, glowingSectors: c = ss, children: l, pieProps: u }) {
	let { config: d, data: f, dataKey: p, nameKey: m, isLoading: h, selectedSector: g, selectSector: _ } = ls(), v = (0, Z.useId)().replace(/:/g, "");
	if (h) return /* @__PURE__ */ (0, $.jsx)(da, {
		data: hs,
		dataKey: "value",
		nameKey: "name",
		innerRadius: t,
		outerRadius: n,
		cornerRadius: r,
		paddingAngle: i,
		startAngle: a,
		endAngle: o,
		strokeWidth: 0,
		isAnimationActive: !1,
		shape: (e) => /* @__PURE__ */ (0, $.jsx)(gs, { ...e })
	});
	let y = fs(l, p), b = f.map((e) => ({
		...e,
		fill: `url(#${v}-colors-${e[m]})`
	}));
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)(da, {
		data: b,
		dataKey: p,
		nameKey: m,
		innerRadius: t,
		outerRadius: n,
		cornerRadius: r,
		paddingAngle: i,
		startAngle: a,
		endAngle: o,
		strokeWidth: 0,
		isAnimationActive: !0,
		style: s ? { cursor: "pointer" } : void 0,
		onClick: (e, t) => {
			if (!s) return;
			let n = f[t]?.[m];
			_(g === n ? null : n);
		},
		shape: (e) => {
			let t = f[e.index ?? 0]?.[m], n = c.includes(t), r = s && g !== null && g !== t;
			return /* @__PURE__ */ (0, $.jsx)(ot, {
				...e,
				fill: `url(#${v}-colors-${t})`,
				filter: n ? `url(#${v}-glow-${t})` : void 0,
				stroke: i < 0 ? "var(--background)" : "none",
				strokeWidth: i < 0 ? 5 : 0,
				opacity: r ? .15 : 1,
				className: "transition-opacity duration-200"
			});
		},
		...u,
		children: y
	}), /* @__PURE__ */ (0, $.jsxs)("defs", { children: [/* @__PURE__ */ (0, $.jsx)(ps, {
		id: v,
		config: d,
		variant: e
	}), c.length > 0 && /* @__PURE__ */ (0, $.jsx)(ms, {
		id: v,
		glowingSectors: c
	})] })] });
}, us.Label = ds, us.Tooltip = function({ variant: e, roundness: t, defaultIndex: n }) {
	let { isLoading: r, nameKey: i } = ls();
	return r ? null : /* @__PURE__ */ (0, $.jsx)(O, {
		defaultIndex: n,
		content: /* @__PURE__ */ (0, $.jsx)(ee, {
			nameKey: i,
			hideLabel: !0,
			roundness: t,
			variant: e
		})
	});
}, us.Legend = function({ variant: e, align: t = "center", verticalAlign: n = "bottom", isClickable: r = !1 }) {
	let { nameKey: i, selectedSector: a, selectSector: o } = ls();
	return /* @__PURE__ */ (0, $.jsx)(T, {
		verticalAlign: n,
		align: t,
		content: /* @__PURE__ */ (0, $.jsx)(E, {
			selected: a,
			onSelectChange: o,
			isClickable: r,
			nameKey: i,
			variant: e
		})
	});
}, us.Background = function({ variant: e = "dots" }) {
	return /* @__PURE__ */ (0, $.jsx)(C, { variant: e });
};
// src/react/settings/storage-charts.tsx
var _s = {
	database: "var(--color-chart-1)",
	backups: "var(--color-chart-2)",
	playback: "var(--color-chart-3)",
	thumbnails: "var(--color-chart-4)",
	previews: "var(--color-chart-5)",
	downloads: "var(--color-chart-6)",
	follow_snapshots: "var(--color-chart-7)",
	records: "var(--color-chart-8)",
	project_archives: "var(--color-chart-9)"
}, vs = "var(--color-text-tertiary)", ys = {
	database: "bg-chart-1",
	backups: "bg-chart-2",
	playback: "bg-chart-3",
	thumbnails: "bg-chart-4",
	previews: "bg-chart-5",
	downloads: "bg-chart-6",
	follow_snapshots: "bg-chart-7",
	records: "bg-chart-8",
	project_archives: "bg-chart-9"
}, bs = (e) => ln(e);
function xs(e) {
	let t = e.filter((e) => _s[e.key] && e.bytes > 0).map((e) => ({
		key: e.key,
		label: e.label,
		bytes: e.bytes,
		color: _s[e.key]
	})), n = e.filter((e) => !_s[e.key]).reduce((e, t) => e + t.bytes, 0);
	return n > 0 ? [...t, {
		key: "rest",
		label: J("settings:storageCharts.rest"),
		bytes: n,
		color: vs
	}] : t;
}
function Ss({ storage: e }) {
	let t = e.usage, n = xs(t.categories), r = Object.fromEntries(n.map((e) => [e.key, {
		label: e.label,
		colors: Cr(e.color)
	}])), i = n.map((e) => ({
		slice: e.key,
		value: e.bytes
	}));
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		className: "flex flex-col gap-5 md:flex-row md:items-center",
		children: [/* @__PURE__ */ (0, $.jsxs)("div", {
			className: "relative mx-auto size-48 flex-none",
			role: "img",
			"aria-label": J("settings:storageCharts.categoryShare", { size: bs(t.total_bytes) }),
			children: [/* @__PURE__ */ (0, $.jsxs)(us, {
				data: i,
				dataKey: "value",
				nameKey: "slice",
				config: r,
				className: "aspect-square size-48 flex-none",
				children: [/* @__PURE__ */ (0, $.jsx)(us.Pie, {
					innerRadius: "68%",
					outerRadius: "100%",
					paddingAngle: 1,
					cornerRadius: 3
				}), /* @__PURE__ */ (0, $.jsx)(D, {
					nameKey: "slice",
					hideLabel: !0,
					format: bs
				})]
			}), /* @__PURE__ */ (0, $.jsxs)("div", {
				className: "pointer-events-none absolute inset-0 flex flex-col items-center justify-center",
				children: [/* @__PURE__ */ (0, $.jsx)("b", {
					className: "text-title-2-medium tabular-nums text-text-primary",
					children: bs(t.total_bytes)
				}), /* @__PURE__ */ (0, $.jsx)("small", {
					className: "text-caption-1-regular tabular-nums text-text-secondary",
					children: J("settings:storageCharts.fileCount", { count: t.total_files })
				})]
			})]
		}), /* @__PURE__ */ (0, $.jsxs)("div", {
			className: "flex min-w-0 flex-1 flex-col gap-4",
			children: [/* @__PURE__ */ (0, $.jsx)("ul", {
				className: "flex flex-wrap gap-x-4 gap-y-1.5",
				"aria-label": J("settings:storageCharts.legend"),
				children: n.map((e) => /* @__PURE__ */ (0, $.jsxs)("li", {
					className: "flex items-center gap-1.5 text-caption-1-regular text-text-secondary",
					children: [
						/* @__PURE__ */ (0, $.jsx)("i", {
							"aria-hidden": !0,
							className: `${Ct} ${ys[e.key] || "bg-text-tertiary"}`
						}),
						e.label,
						/* @__PURE__ */ (0, $.jsx)("span", {
							className: "tabular-nums text-text-primary",
							children: bs(e.bytes)
						})
					]
				}, e.key))
			}), /* @__PURE__ */ (0, $.jsx)(Cs, { storage: e })]
		})]
	});
}
function Cs({ storage: e }) {
	if (e.total_bytes === null || e.free_bytes === null || !e.usage) return null;
	let t = Math.min(e.usage.total_bytes, e.total_bytes), n = e.free_bytes, r = Math.max(0, e.total_bytes - n - t), i = {
		peach: {
			label: J("settings:storageCharts.peachData"),
			colors: Cr("var(--color-border-focus-ring)")
		},
		others: {
			label: J("settings:storageCharts.otherFiles"),
			colors: Cr(vs)
		},
		free: {
			label: J("settings:storageCharts.free"),
			colors: Cr("var(--color-background-tertiary-default)")
		}
	};
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		className: "flex flex-col gap-2",
		children: [/* @__PURE__ */ (0, $.jsx)("p", {
			className: "text-caption-1-regular text-text-secondary",
			children: J("settings:storageCharts.diskSummary", {
				total: bs(e.total_bytes),
				systemDrive: e.system_drive ? J("settings:storageCharts.systemDrive") : "",
				share: ((t) => {
					let n = t / e.total_bytes * 100;
					return n < .1 ? J("settings:storageCharts.underTenthPercent") : `${n.toFixed(+(n < 10))}%`;
				})(t),
				free: bs(n)
			})
		}), /* @__PURE__ */ (0, $.jsxs)(me, {
			data: [{
				disk: J("settings:libraryIcons.hardDrive"),
				peach: t,
				others: r,
				free: n
			}],
			config: i,
			layout: "horizontal",
			stackType: "percent",
			barRadius: 4,
			chartProps: { margin: {
				top: 0,
				right: 0,
				bottom: 0,
				left: 0
			} },
			className: "aspect-auto h-6 flex-none",
			children: [
				/* @__PURE__ */ (0, $.jsx)(me.YAxis, {
					dataKey: "disk",
					hide: !0
				}),
				/* @__PURE__ */ (0, $.jsx)(me.XAxis, { hide: !0 }),
				/* @__PURE__ */ (0, $.jsx)(me.Bar, { dataKey: "peach" }),
				/* @__PURE__ */ (0, $.jsx)(me.Bar, { dataKey: "others" }),
				/* @__PURE__ */ (0, $.jsx)(me.Bar, { dataKey: "free" }),
				/* @__PURE__ */ (0, $.jsx)(D, {
					hideLabel: !0,
					format: bs
				})
			]
		})]
	});
}
// src/react/components/configuration-fields.tsx
function ws({ id: e, label: t, value: n, onChange: r, options: i, isDisabled: a, isInvalid: s, children: c }) {
	let l = `${e}-label`;
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		className: "flex flex-col gap-1.5",
		children: [
			/* @__PURE__ */ (0, $.jsx)(Te, {
				id: l,
				elementType: "span",
				children: t
			}),
			/* @__PURE__ */ (0, $.jsx)(st, {
				id: e,
				"aria-labelledby": l,
				orientation: "horizontal",
				className: tt,
				value: n,
				onChange: r,
				isDisabled: a,
				isInvalid: s,
				children: i.map((e) => /* @__PURE__ */ (0, $.jsx)(o, {
					value: e.value,
					className: et,
					children: e.label
				}, e.value))
			}),
			c
		]
	});
}
function Ts({ prefix: e, suffix: t, unit: n, fieldClassName: r, ...i }) {
	let a = () => /* @__PURE__ */ (0, $.jsx)("span", {
		"aria-hidden": n ? !0 : void 0,
		className: Yt("shrink-0 text-body-regular text-text-secondary", n ? "w-10" : "pr-1"),
		children: n ? /* @__PURE__ */ (0, $.jsx)("span", {
			className: "absolute inset-y-0 right-0 flex items-center border-l border-border-button-default px-2",
			children: n
		}) : t
	});
	return /* @__PURE__ */ (0, $.jsx)(F, {
		...i,
		fieldClassName: r,
		leadingAddon: e ? /* @__PURE__ */ (0, $.jsx)("span", {
			className: "shrink-0 pl-1 text-body-regular text-text-secondary",
			children: e
		}) : void 0,
		trailingIcon: n || t ? a : void 0
	});
}
// src/react/settings/storage-budget-settings.tsx
var Es = [
	[
		"minimum_free_gib",
		J("settings:storageLimits.reservedSpace"),
		J("settings:storageLimits.reservedSpaceHelp")
	],
	[
		"data_max_gib",
		J("settings:storageLimits.dataLimit"),
		J("settings:storageLimits.dataLimitHelp")
	],
	[
		"cache_max_gib",
		J("settings:storageLimits.cacheLimit"),
		J("settings:storageLimits.cacheLimitHelp")
	]
], Ds = (e) => !e.trim() || /^\d+$/.test(e.trim()) && Number(e) <= 1048576 ? "" : J("settings:storageLimits.invalidLimit"), Os = (e) => fr(e.reasons, e.reason_codes?.map((e) => e?.code ?? null), e.reason_codes?.map((e) => e?.params ?? null));
function ks({ initial: e, after: t, receipt: n }) {
	let [r, i] = (0, Z.useState)(e.policy), a = Y(G(e, "error")), [o, s] = (0, Z.useState)(""), [c, l] = (0, Z.useState)({}), u = Oa();
	(0, Z.useEffect)(() => {
		if (!r?.enabled || e.policy?.external_cache_path) return;
		let t = new AbortController();
		return s(J("settings:storageLimits.readingCloudDrive")), H("/api/configuration/storage/external-cache", t.signal).then((e) => {
			if (t.signal.aborted) return;
			let n = e.path;
			n ? (i((e) => e && !e.external_cache_path ? {
				...e,
				external_cache_path: n
			} : e), s(J("settings:storageLimits.cacheDetected"))) : s(J("settings:storageLimits.cloudDriveMissing"));
		}).catch((e) => {
			t.signal.aborted || s(J("settings:storageLimits.cacheReadFailed", { error: K(e) }));
		}), () => t.abort();
	}, [r?.enabled, e.policy?.external_cache_path]);
	let d = (e, t) => i((n) => n && {
		...n,
		[e]: t
	}), f = e.last_check;
	if (!r) return /* @__PURE__ */ (0, $.jsx)(R, {
		title: J("settings:storageLimits.title"),
		children: /* @__PURE__ */ (0, $.jsx)(B, { children: /* @__PURE__ */ (0, $.jsx)(j, { children: a.error || J("settings:storageLimits.loadFailed") }) })
	});
	let p = (e) => {
		let t = c[e] ?? (r[e] ? String(r[e]) : "");
		return {
			"data-settings-field": e,
			value: t,
			validationBehavior: "aria",
			isInvalid: !!u.errors[e],
			hint: u.errors[e],
			onBlur: () => u.update(e, Ds(t)),
			onChange: (t) => {
				l((n) => ({
					...n,
					[e]: t
				})), u.update(e);
			}
		};
	};
	return /* @__PURE__ */ (0, $.jsxs)(R, {
		id: "storageBudgetSettings",
		title: J("settings:storageLimits.title"),
		onSubmit: (e) => {
			e.preventDefault();
			let o = r.enabled ? Es.map(([e]) => e) : [];
			r.enabled && r.external_cache_path && o.push("external_cache_max_gib");
			let c = Object.fromEntries(o.map((e) => [e, Ds(p(e).value)]));
			if (!u.check(e.currentTarget, c)) return;
			let d = {
				...r,
				...Object.fromEntries(o.map((e) => [e, Number(p(e).value)]))
			};
			a.run("save", (e) => U("/api/configuration/storage/policy", d, "POST", e), (e) => {
				l({}), i(e.budget?.policy ?? d), s(""), t(e), n(J("settings:storageLimits.saved"));
			});
		},
		children: [
			/* @__PURE__ */ (0, $.jsxs)(L, { children: [/* @__PURE__ */ (0, $.jsx)(z, {
				label: J("settings:storageLimits.enable"),
				description: J("settings:storageLimits.enableHelp"),
				children: /* @__PURE__ */ (0, $.jsx)(V, {
					"aria-label": J("settings:storageLimits.enable"),
					isSelected: r.enabled,
					isDisabled: !!a.busy,
					onChange: (e) => d("enabled", e)
				})
			}), r.enabled ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [Es.map(([e, t, n]) => /* @__PURE__ */ (0, $.jsx)(z, {
				label: t,
				description: n,
				children: /* @__PURE__ */ (0, $.jsx)(Ts, {
					"aria-label": J("settings:storageLimits.limitGib", { label: t }),
					unit: "GiB",
					inputMode: "numeric",
					pattern: "[0-9]*",
					size: "small",
					className: "w-32 shrink-0",
					placeholder: J(e === "minimum_free_gib" ? "settings:shared.auto" : "settings:shared.noLimit"),
					...p(e),
					isDisabled: !!a.busy
				})
			}, e)), /* @__PURE__ */ (0, $.jsx)(z, {
				label: J("settings:storageLimits.autoClean"),
				description: J("settings:storageLimits.autoCleanHelp"),
				children: /* @__PURE__ */ (0, $.jsx)(V, {
					"aria-label": J("settings:storageLimits.autoClean"),
					isSelected: r.auto_clean,
					isDisabled: !!a.busy,
					onChange: (e) => d("auto_clean", e)
				})
			})] }) : null] }),
			r.enabled ? /* @__PURE__ */ (0, $.jsxs)(B, {
				divided: !0,
				children: [
					/* @__PURE__ */ (0, $.jsx)(F, {
						label: J("settings:storageLimits.externalCache"),
						hint: o || J("settings:storageLimits.externalCacheHelp"),
						value: r.external_cache_path,
						size: "small",
						className: "w-full",
						placeholder: J("settings:shared.notSet"),
						onChange: (e) => d("external_cache_path", e),
						isDisabled: !!a.busy
					}),
					r.external_cache_path ? /* @__PURE__ */ (0, $.jsx)(L, { children: /* @__PURE__ */ (0, $.jsx)(z, {
						label: J("settings:storageLimits.externalCacheLimit"),
						description: J("settings:storageLimits.externalCacheLimitHelp"),
						children: /* @__PURE__ */ (0, $.jsx)(Ts, {
							"aria-label": J("settings:storageLimits.externalCacheLimitGib"),
							unit: "GiB",
							size: "small",
							className: "w-32 shrink-0",
							placeholder: J("settings:shared.noLimit"),
							inputMode: "numeric",
							pattern: "[0-9]*",
							...p("external_cache_max_gib"),
							isDisabled: !!a.busy
						})
					}) }) : null,
					/* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:storageLimits.limitsHelp") }),
					f?.paused ? /* @__PURE__ */ (0, $.jsx)(j, { children: J("settings:storageLimits.pausedWithReasons", { reasons: Os(f).join(J("shell:format.semicolonSeparator")) }) }) : null,
					a.error ? /* @__PURE__ */ (0, $.jsx)(j, { children: a.error }) : null
				]
			}) : a.error ? /* @__PURE__ */ (0, $.jsx)(B, { children: /* @__PURE__ */ (0, $.jsx)(j, { children: a.error }) }) : null,
			/* @__PURE__ */ (0, $.jsx)(N, { children: /* @__PURE__ */ (0, $.jsx)(m, {
				type: "submit",
				...W(a.busy === "save"),
				children: J("settings:shared.saveSettings")
			}) })
		]
	});
}
// src/react/settings/storage-settings.tsx
var As = "/api/configuration/storage", js = 1500, Ms = 36e5, Ns = 864e5, Ps = (e) => e instanceof p && Lt(e.body)?.target || K(e);
function Fs(e) {
	if (e.free_bytes === null || e.total_bytes === null) return J("settings:shared.notFound");
	let t = J("settings:storageSpace.diskFreeOfTotal", {
		free: ln(e.free_bytes),
		total: ln(e.total_bytes)
	});
	return e.system_drive ? J("settings:storageSpace.systemDriveSuffix", { summary: t }) : t;
}
var Is = (e) => e.cleanable && e.reclaimable > 0, Ls = (e) => ({
	...e,
	label: q(`storage.category.${e.key}.label`, e.label),
	description: q(`storage.category.${e.key}.description`, e.description),
	note: q(`storage.category.${e.key}.note`, e.note)
}), Rs = (e) => [G(e, "message"), ...(e.notes ?? []).map((t, n) => q(e.note_codes?.[n]?.code ?? "", t, e.note_codes?.[n]?.params))], zs = (e) => ({
	text: G(e, "text"),
	command: G(e, "command")
});
function Bs({ job: e }) {
	let t = e.files || 0, n = e.expected_files || 0, r = {
		files: /* @__PURE__ */ (0, $.jsx)(f, { value: t }),
		size: /* @__PURE__ */ (0, $.jsx)(f, {
			value: e.bytes || 0,
			format: ln
		})
	};
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		"aria-live": "polite",
		className: "flex flex-col gap-2",
		children: [n ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)(Ke, {
			label: J("settings:storageSpace.measureProgress"),
			value: Math.min(t, n * .99),
			max: n
		}), /* @__PURE__ */ (0, $.jsx)(P, { children: wr("settings:storageSpace.measuringOfLast", {
			count: t,
			expected: n
		}, r) })] }) : /* @__PURE__ */ (0, $.jsx)(u, {
			kind: "radar",
			label: J("settings:storageSpace.measuringLabel")
		}), n ? null : /* @__PURE__ */ (0, $.jsx)(P, { children: wr("settings:storageSpace.measuring", { count: t }, r) })]
	});
}
var Vs = /* @__PURE__ */ new Set([
	"follow_snapshots",
	"source_snapshots",
	"project_archives"
]);
function Hs({ category: e, selected: t, disabled: n, onToggle: r }) {
	let i = Is(e), a = e.key === "follow_snapshots", o = a || e.key === "project_archives", s = e.cleanable ? e.reclaimable > 0 ? J("settings:storageSpace.afterCleanup", { effect: e.note }) : J("settings:storageSpace.nothingToClean") : o ? e.note : J("settings:storageSpace.cannotClean", { reason: e.note });
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		"data-category": e.key,
		className: "flex min-h-13 w-full items-start gap-3 border-b border-separator-border py-2.5 pr-3 last:border-b-0",
		children: [
			e.cleanable ? /* @__PURE__ */ (0, $.jsx)(k, {
				"aria-label": J("settings:storageSpace.cleanCategory", { category: e.label }),
				isSelected: t,
				isDisabled: !i || n,
				onChange: r,
				className: "mt-0.5"
			}) : /* @__PURE__ */ (0, $.jsx)("span", {
				"aria-hidden": !0,
				className: "w-4 shrink-0"
			}),
			/* @__PURE__ */ (0, $.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [
					/* @__PURE__ */ (0, $.jsxs)("p", {
						className: "flex items-center gap-2 text-body-regular text-text-primary",
						children: [/* @__PURE__ */ (0, $.jsx)("i", {
							"aria-hidden": !0,
							className: `size-2.5 shrink-0 rounded-xs ${ys[e.key] || "bg-text-tertiary"}`
						}), /* @__PURE__ */ (0, $.jsx)("span", {
							"data-copy-key": `storage.category.${e.key}.label`,
							children: e.label
						})]
					}),
					/* @__PURE__ */ (0, $.jsx)("p", {
						"data-copy-key": `storage.category.${e.key}.description`,
						className: "text-body-2-regular text-text-secondary",
						children: e.description
					}),
					/* @__PURE__ */ (0, $.jsx)("p", {
						"data-copy-key": `storage.category.${e.key}.${e.cleanable && !i ? "empty" : "note"}`,
						className: "text-caption-1-regular text-text-tertiary",
						children: s
					}),
					a ? /* @__PURE__ */ (0, $.jsx)(ke, {
						href: `${Ye}#repair-item-follow-evidence`,
						size: "xs",
						trailingIcon: Tn,
						className: "mt-1 self-start whitespace-normal",
						children: /* @__PURE__ */ (0, $.jsx)("span", {
							"data-copy-key": "storageSpace.reviewFollowSnapshots",
							children: J("settings:storageSpace.reviewFollowSnapshots")
						})
					}) : null
				]
			}),
			/* @__PURE__ */ (0, $.jsxs)("div", {
				className: "flex shrink-0 flex-col items-end gap-0.5 text-right",
				children: [/* @__PURE__ */ (0, $.jsx)(f, {
					value: e.bytes,
					format: ln,
					className: "text-body-regular text-text-primary"
				}), i ? /* @__PURE__ */ (0, $.jsxs)("span", {
					className: "text-caption-1-regular text-text-secondary",
					children: [
						J("settings:storageSpace.canFree"),
						" ",
						ln(e.reclaimable)
					]
				}) : null]
			})
		]
	});
}
function Us({ initial: e, receipt: t, active: n = !0 }) {
	let [r, i] = (0, Z.useState)(e), [a, o] = (0, Z.useState)(""), [s, c] = (0, Z.useState)(/* @__PURE__ */ new Set()), l = Y(), u = r.job.state !== "idle", d = (0, Z.useRef)(u), f = (0, Z.useRef)(!1);
	(0, Z.useEffect)(() => {
		n && !f.current && (f.current = !0, e.usage || e.job.state !== "idle" || document.body.classList.contains("peach-guiding") || l.run("measure", (e) => U(`${As}/measure`, {}, "POST", e), i));
	}, [
		n,
		e,
		l.run
	]), (0, Z.useEffect)(() => {
		if (!u) return;
		let e = new AbortController();
		return Kn({
			signal: e.signal,
			everyMs: js,
			limitMs: Ms,
			read: (e) => H(As, e),
			apply: i,
			done: (e) => e.job.state === "idle"
		}), () => e.abort();
	}, [u]), (0, Z.useEffect)(() => {
		u ? d.current = !0 : d.current && (d.current = !1, c(/* @__PURE__ */ new Set()), r.job.error || t(G(r.job, "message") || J("settings:storageSpace.measured")));
	}, [u]);
	let p = () => void l.run("measure", (e) => U(`${As}/measure`, {}, "POST", e), i), h = r.usage && {
		...r.usage,
		categories: r.usage.categories.map(Ls)
	}, g = h?.categories.filter(Is) ?? [], _ = g.filter((e) => s.has(e.key)), v = (e, t) => {
		if (!e.length) return;
		let n = e.reduce((e, t) => e + t.reclaimable, 0);
		Gt({
			title: t,
			body: J("settings:storageSpace.cleanBody", {
				size: ln(n),
				items: Pn(e.map((e) => J("settings:storageSpace.cleanItem", {
					label: e.label,
					size: ln(e.reclaimable),
					effect: e.note
				})))
			}),
			confirmLabel: J("settings:storageSpace.cleanSize", { size: ln(n) }),
			holdToConfirm: !0,
			danger: e.some((e) => e.key === "backups"),
			onConfirm: async () => i(await U(`${As}/clean`, { categories: e.map((e) => e.key) }))
		});
	}, y = () => void l.run("relocate", async (e) => {
		let t = await Wn(r.data_root, (t) => U(Le, t, "POST", e), "data");
		if (!t) return;
		let n = r.usage ? ln(r.usage.total_bytes) : "";
		await Gt({
			title: J("settings:storageSpace.moveDataDirectory"),
			body: J("settings:storageSpace.moveConfirm", {
				size: n,
				from: r.data_root,
				to: t
			}),
			confirmLabel: J("settings:storageSpace.moveDataDirectory"),
			onConfirm: async () => {
				try {
					o(pr(await U(`${As}/relocate`, { target: t })));
				} catch (e) {
					throw Error(Ps(e));
				}
			}
		});
	}, () => void 0), b = r.relocation.last, x = b && (b.state === "error" || (b.notes?.length ?? 0) > 0 || Date.now() - b.finished_at * 1e3 < Ns), S = h?.categories.find((e) => e.key === r.job.category)?.label, C = a || (r.job.state === "cleaning" ? J("settings:storageSpace.cleaningCategory", { category: S || "" }) : r.job.state === "measuring" ? J("settings:storageSpace.measuringStatus") : _.length ? J("settings:storageSpace.selectedSummary", {
		count: _.length,
		size: ln(_.reduce((e, t) => e + t.reclaimable, 0))
	}) : h ? J("settings:storageSpace.measuredAt", { time: (/* @__PURE__ */ new Date(h.measured_at * 1e3)).toLocaleString(Dn) }) : ""), w = u || !!a, T = (e) => (t) => c((n) => {
		let r = new Set(n);
		return t ? r.add(e) : r.delete(e), r;
	});
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsxs)(R, {
		id: "storageSettings",
		guide: "storage",
		title: J("settings:diskUsage.title"),
		children: [
			/* @__PURE__ */ (0, $.jsxs)(ye, { children: [/* @__PURE__ */ (0, $.jsx)(M, {
				term: J("settings:shared.dataDirectory"),
				children: /* @__PURE__ */ (0, $.jsx)(He, {
					path: r.data_root,
					className: "text-body-regular text-text-primary",
					onRevealed: t
				})
			}), /* @__PURE__ */ (0, $.jsx)(M, {
				term: J("settings:diskUsage.disk"),
				children: Fs(r)
			})] }),
			/* @__PURE__ */ (0, $.jsxs)(B, {
				divided: !0,
				children: [
					r.job.state === "measuring" ? /* @__PURE__ */ (0, $.jsx)(Bs, { job: r.job }) : null,
					h?.capacity_error ? /* @__PURE__ */ (0, $.jsxs)(j, { children: [J("settings:storageSpace.capacityIncomplete"), h.capacity_error] }) : null,
					h?.allocated_bytes == null ? null : /* @__PURE__ */ (0, $.jsxs)(P, { children: [
						J("settings:storageSpace.allocatedOnDisk"),
						" ",
						ln(h.allocated_bytes)
					] }),
					h ? /* @__PURE__ */ (0, $.jsxs)("div", {
						"data-storage-result": "",
						className: zt({
							variant: "outlined",
							padding: "none",
							className: "flex flex-col"
						}),
						children: [/* @__PURE__ */ (0, $.jsx)("div", {
							className: "border-b border-separator-border p-4",
							children: /* @__PURE__ */ (0, $.jsx)(Ss, { storage: h ? {
								...r,
								usage: h
							} : r })
						}), /* @__PURE__ */ (0, $.jsx)("div", {
							className: "flex flex-col pl-4",
							children: h.categories.filter((e) => e.files > 0 || !Vs.has(e.key)).map((e) => /* @__PURE__ */ (0, $.jsx)(Hs, {
								category: e,
								selected: s.has(e.key),
								disabled: w,
								onToggle: T(e.key)
							}, e.key))
						})]
					}) : r.job.state === "measuring" ? null : /* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:diskUsage.emptyHelp") }),
					r.relocation.available ? null : /* @__PURE__ */ (0, $.jsx)(P, { children: G(r.relocation, "message") }),
					!r.relocation.available && r.relocation.steps?.length ? /* @__PURE__ */ (0, $.jsx)(te, {
						label: J("settings:storageSpace.moveOnHost"),
						steps: r.relocation.steps.map(zs)
					}) : null,
					r.job.error ? /* @__PURE__ */ (0, $.jsx)(j, { children: G(r.job, "message") }) : null,
					l.error ? /* @__PURE__ */ (0, $.jsx)(j, { children: l.error }) : null,
					x && b ? b.state === "error" ? /* @__PURE__ */ (0, $.jsx)(j, { children: Rs(b).join(J("shell:format.semicolonSeparator")) }) : /* @__PURE__ */ (0, $.jsx)(P, { children: Rs(b).join(J("shell:format.semicolonSeparator")) }) : null
				]
			}),
			/* @__PURE__ */ (0, $.jsxs)(N, {
				status: C ? /* @__PURE__ */ (0, $.jsx)("p", {
					role: a ? "status" : void 0,
					children: C
				}) : null,
				children: [
					h ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)(m, {
						variant: "secondary",
						disabled: w || !_.length,
						...W(r.job.state === "cleaning" && _.length > 0),
						onClick: () => v(_, J("settings:storageSpace.cleanSelectedTitle")),
						children: J("settings:storageSpace.cleanSelected")
					}), /* @__PURE__ */ (0, $.jsx)(m, {
						variant: "secondary",
						disabled: w || !g.length,
						onClick: () => v(g, J("settings:storageSpace.cleanAllTitle")),
						children: J("settings:storageSpace.cleanAll")
					})] }) : null,
					/* @__PURE__ */ (0, $.jsx)(m, {
						variant: "secondary",
						disabled: w || !r.relocation.available || !h,
						onClick: y,
						...W(l.busy === "relocate"),
						children: J("settings:diskUsage.changeLocation")
					}),
					/* @__PURE__ */ (0, $.jsx)(m, {
						disabled: !!a || r.job.state === "cleaning",
						onClick: p,
						...W(l.busy === "measure" || r.job.state === "measuring"),
						children: J(h ? "settings:diskUsage.measureAgain" : "settings:diskUsage.measure")
					})
				]
			})
		]
	}), r.budget ? /* @__PURE__ */ (0, $.jsx)(ks, {
		initial: r.budget,
		after: i,
		receipt: t
	}) : null] });
}
// src/react/settings/upgrade-repairs.tsx
var Ws = {
	pending: J("settings:upgradeRepairs.pending"),
	running: J("settings:upgradeRepairs.repairing"),
	failed: J("settings:repairCenter.needsRetry"),
	deferred: J("settings:repairCenter.deferred"),
	review: J("settings:upgradeRepairs.needsReview"),
	complete: J("settings:shared.completed"),
	unavailable: J("settings:upgradeRepairs.unavailable")
}, Gs = (e) => wr("settings:upgradeRepairs.itemCount", { count: e }, { value: /* @__PURE__ */ (0, $.jsx)(f, { value: e }) });
function Ks({ lastCapacityCheckPassed: e = !1 } = {}) {
	let { snapshot: t } = Or(), [n, r] = (0, Z.useState)(null), i = Y();
	(0, Z.useEffect)(() => r(null), [t]);
	let a = n ?? t?.repairs, o = a?.state || "pending", s = a?.message_code === "labels.upgradeRepairs.mediaPaused" && e, c = a?.items.reduce((e, t) => e + (t.pending || 0), 0) || 0, l = a?.items.reduce((e, t) => e + (t.failed || 0), 0) || 0, u = a?.items.reduce((e, t) => e + (t.deferred || 0), 0) || 0, d = a?.items.reduce((e, t) => e + (t.review_count || 0), 0) || 0;
	return /* @__PURE__ */ (0, $.jsxs)(R, {
		id: "upgradeRepairs",
		title: J("settings:upgradeRepairs.title"),
		aside: /* @__PURE__ */ (0, $.jsx)(xt, {
			tone: o === "failed" ? "error" : o === "running" ? "progress" : o === "review" ? "warning" : o === "complete" ? "success" : "neutral",
			children: /* @__PURE__ */ (0, $.jsx)("span", {
				"data-copy-key": `upgradeRepairs.${o}.status`,
				children: Ws[o] || J("settings:shared.notFound")
			}, o)
		}),
		children: [
			/* @__PURE__ */ (0, $.jsxs)(ye, { children: [
				/* @__PURE__ */ (0, $.jsx)(M, {
					term: J("settings:upgradeRepairs.toDo"),
					children: /* @__PURE__ */ (0, $.jsx)("span", { children: Gs(c) })
				}),
				/* @__PURE__ */ (0, $.jsx)(M, {
					term: J("settings:shared.failed"),
					children: /* @__PURE__ */ (0, $.jsx)("span", { children: Gs(l) })
				}),
				u ? /* @__PURE__ */ (0, $.jsx)(M, {
					term: J("settings:upgradeRepairs.deferred"),
					children: /* @__PURE__ */ (0, $.jsx)("span", { children: Gs(u) })
				}) : null,
				/* @__PURE__ */ (0, $.jsx)(M, {
					term: J("settings:upgradeRepairs.toReview"),
					children: /* @__PURE__ */ (0, $.jsx)("span", { children: Gs(d) })
				})
			] }),
			s && !i.error ? /* @__PURE__ */ (0, $.jsx)(B, { children: /* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:upgradeRepairs.capacityReady") }) }) : a?.message || i.error ? /* @__PURE__ */ (0, $.jsx)(B, { children: /* @__PURE__ */ (0, $.jsx)(j, { children: i.error || G(a, "message") }) }) : null,
			o === "running" ? /* @__PURE__ */ (0, $.jsxs)(B, { children: [/* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:upgradeRepairs.runningHelp") }), /* @__PURE__ */ (0, $.jsx)(wt, {})] }) : null,
			o === "deferred" ? /* @__PURE__ */ (0, $.jsx)(B, { children: /* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:upgradeRepairs.deferredHelp") }) }) : null,
			/* @__PURE__ */ (0, $.jsxs)(N, {
				status: d ? /* @__PURE__ */ (0, $.jsx)(he, {
					href: "/api/configuration/upgrade-repairs/review",
					children: J("settings:upgradeRepairs.downloadReviewLog")
				}) : null,
				children: [/* @__PURE__ */ (0, $.jsx)(ke, {
					href: Ye,
					size: "small",
					trailingIcon: Tn,
					children: J("settings:upgradeRepairs.repairCenterLink")
				}), /* @__PURE__ */ (0, $.jsx)(m, {
					size: "small",
					variant: "secondary",
					disabled: !a?.available || o === "running" || !!i.busy || !l && o !== "failed",
					onClick: () => void i.run("retry", (e) => U("/api/configuration/upgrade-repairs/retry", {}, "POST", e), (e) => {
						r(e), Bt();
					}),
					children: J("settings:upgradeRepairs.retryFailed")
				})]
			})
		]
	});
}
// src/react/settings/maintenance-settings.tsx
var qs = [
	["6", J("settings:automaticUpdates.every6Hours")],
	["24", J("settings:automaticUpdates.daily")],
	["168", J("settings:automaticUpdates.weekly")]
];
function Js({ entry: e, children: t }) {
	return /* @__PURE__ */ (0, $.jsxs)("section", {
		id: e.id,
		"aria-labelledby": `${e.id}-title`,
		className: "flex min-w-0 flex-col gap-3",
		children: [/* @__PURE__ */ (0, $.jsx)("h3", {
			id: `${e.id}-title`,
			className: "px-3 text-title-3-medium text-text-primary",
			children: /* @__PURE__ */ (0, $.jsx)("span", { children: e.label })
		}), /* @__PURE__ */ (0, $.jsx)("div", {
			className: "flex min-w-0 flex-col gap-6",
			children: t
		})]
	});
}
function Ys({ data: e, receipt: t, reopenTutorial: n, active: r }) {
	let i = {
		id: "maintenance-updates",
		label: J("settings:maintenanceGroups.updates")
	}, a = {
		id: "maintenance-runtime",
		label: J("settings:maintenanceGroups.runtime")
	}, o = {
		id: "maintenance-backups",
		label: J("settings:maintenanceGroups.backups")
	}, s = {
		id: "maintenance-privacy",
		label: J("settings:maintenanceGroups.privacy")
	}, c = [
		i,
		a,
		...e.storage ? [o] : [],
		s,
		...e.uninstall ? [{
			id: "uninstallPeach",
			label: J("settings:uninstall.title")
		}] : []
	];
	return /* @__PURE__ */ (0, $.jsxs)(at, {
		inline: !0,
		label: J("settings:configurationPage.contents"),
		entries: c,
		children: [
			/* @__PURE__ */ (0, $.jsxs)(Js, {
				entry: i,
				children: [
					e.updates ? /* @__PURE__ */ (0, $.jsx)(jo, {
						initial: e.updates,
						initialJob: e.update_job
					}) : null,
					e.automatic_updates ? /* @__PURE__ */ (0, $.jsx)(Zs, {
						initial: e.automatic_updates,
						receipt: t
					}) : null,
					/* @__PURE__ */ (0, $.jsx)(Ks, { lastCapacityCheckPassed: e.storage?.budget?.last_check?.paused === !1 })
				]
			}),
			/* @__PURE__ */ (0, $.jsxs)(Js, {
				entry: a,
				children: [
					/* @__PURE__ */ (0, $.jsx)(ao, {
						active: r,
						initial: e.startup,
						receipt: t
					}),
					e.storage ? /* @__PURE__ */ (0, $.jsx)(_o, { receipt: t }) : null,
					e.storage ? /* @__PURE__ */ (0, $.jsx)(Us, {
						initial: e.storage,
						receipt: t,
						active: r
					}) : null,
					/* @__PURE__ */ (0, $.jsx)(Qs, {
						facts: e.facts,
						receipt: t
					}),
					/* @__PURE__ */ (0, $.jsx)(Xs, {
						receipt: t,
						reopenTutorial: n
					})
				]
			}),
			e.storage ? /* @__PURE__ */ (0, $.jsxs)(Js, {
				entry: o,
				children: [/* @__PURE__ */ (0, $.jsx)(mo, { receipt: t }), /* @__PURE__ */ (0, $.jsx)(Lo, { receipt: t })]
			}) : null,
			/* @__PURE__ */ (0, $.jsxs)(Js, {
				entry: s,
				children: [e.remote_reporting ? /* @__PURE__ */ (0, $.jsx)(R, {
					guide: "diagnostics-reporting",
					title: J("settings:dataSharing.diagnosticsTitle"),
					children: /* @__PURE__ */ (0, $.jsx)(Qo, {
						initial: e.remote_reporting,
						receipt: t
					})
				}) : null, /* @__PURE__ */ (0, $.jsx)(R, {
					id: "librarySharing",
					guide: "reporting",
					title: J("settings:dataSharing.communityTitle"),
					children: /* @__PURE__ */ (0, $.jsx)(Xo, {
						active: r,
						receipt: t
					})
				})]
			}),
			e.uninstall ? /* @__PURE__ */ (0, $.jsx)($s, {
				uninstall: e.uninstall,
				receipt: t
			}) : null
		]
	});
}
function Xs({ reopenTutorial: e }) {
	return /* @__PURE__ */ (0, $.jsx)("section", {
		"aria-label": J("settings:tour.guidedTour"),
		className: "w-full",
		children: /* @__PURE__ */ (0, $.jsx)(ht, { children: /* @__PURE__ */ (0, $.jsx)(L, { children: /* @__PURE__ */ (0, $.jsx)(z, {
			label: J("settings:tour.guidedTour"),
			description: J("settings:tour.reopenDescription"),
			children: /* @__PURE__ */ (0, $.jsx)(m, {
				variant: "secondary",
				onClick: () => void e(),
				children: J("settings:tour.reopen")
			})
		}) }) })
	});
}
function Zs({ initial: e, receipt: t }) {
	let [n, r] = (0, Z.useState)(e.mode), [i, a] = (0, Z.useState)(e.interval_hours), o = Y(e.error ? G(e, "error") : e.error), s = (r) => {
		r.preventDefault(), e.available && o.run("save", (e) => U("/api/configuration/automatic-updates", {
			mode: n,
			interval_hours: i
		}, "POST", e), () => t(J("settings:shared.settingsSaved")));
	}, c = e.available ? e.download_available ? J("settings:automaticUpdates.confirmInstall") : void 0 : J("settings:automaticUpdates.needsTray");
	return /* @__PURE__ */ (0, $.jsxs)(R, {
		id: "automaticUpdates",
		guide: "automatic-updates",
		title: J("settings:autoUpdate.title"),
		onSubmit: s,
		children: [
			/* @__PURE__ */ (0, $.jsxs)(L, { children: [
				/* @__PURE__ */ (0, $.jsx)(z, {
					label: J("settings:autoUpdate.autoCheck"),
					description: J("settings:autoUpdate.autoCheckHelp"),
					children: /* @__PURE__ */ (0, $.jsx)(V, {
						"aria-label": J("settings:autoUpdate.autoCheck"),
						isSelected: n !== "off",
						isDisabled: !e.available,
						onChange: (e) => r(e ? "check" : "off")
					})
				}),
				/* @__PURE__ */ (0, $.jsx)(z, {
					label: J("settings:autoUpdate.autoDownload"),
					description: J("settings:autoUpdate.autoDownloadHelp"),
					children: /* @__PURE__ */ (0, $.jsx)(V, {
						"aria-label": J("settings:autoUpdate.autoDownload"),
						isSelected: n === "download",
						isDisabled: !e.available || !e.download_available || n === "off",
						onChange: (e) => r(e ? "download" : "check")
					})
				}),
				/* @__PURE__ */ (0, $.jsx)(z, {
					label: J("settings:autoUpdate.frequency"),
					description: c,
					children: /* @__PURE__ */ (0, $.jsx)(lt, {
						"aria-label": J("settings:autoUpdate.frequency"),
						selectedKey: String(i),
						isDisabled: !e.available || n === "off",
						onSelectionChange: (e) => {
							e !== null && a(Number(e));
						},
						children: qs.map(([e, t]) => /* @__PURE__ */ (0, $.jsx)(dt, {
							id: e,
							children: t
						}, e))
					})
				})
			] }),
			o.error ? /* @__PURE__ */ (0, $.jsx)(B, {
				divided: !0,
				children: /* @__PURE__ */ (0, $.jsx)(j, { children: o.error })
			}) : null,
			/* @__PURE__ */ (0, $.jsx)(N, { children: /* @__PURE__ */ (0, $.jsx)(m, {
				type: "submit",
				disabled: !e.available,
				...W(o.busy === "save"),
				children: J("settings:shared.saveSettings")
			}) })
		]
	});
}
function Qs({ facts: e, receipt: t }) {
	let [n, r] = (0, Z.useState)(null), i = n ?? e, a = Y(), o = (e) => void a.run(e, (t) => U("/api/configuration/media-tools", { tool: e }, "POST", t), (e) => {
		r(e.facts.map(Ln)), t(pr(e) || e.message);
	});
	return /* @__PURE__ */ (0, $.jsxs)(R, {
		guide: "facts",
		title: J("settings:runtimeInfo.title"),
		children: [/* @__PURE__ */ (0, $.jsx)(ye, { children: i.map(({ term: e, value: t, install_tool: n, download_url: r, download_label: i }) => /* @__PURE__ */ (0, $.jsx)(M, {
			term: e,
			children: n ? /* @__PURE__ */ (0, $.jsxs)("span", {
				className: "flex min-w-0 items-center gap-3",
				children: [/* @__PURE__ */ (0, $.jsx)("span", {
					className: "min-w-0",
					children: t
				}), /* @__PURE__ */ (0, $.jsx)(m, {
					size: "small",
					className: "shrink-0",
					onClick: () => o(n),
					...W(a.busy === n),
					children: J("settings:shared.install")
				})]
			}) : /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [t, r ? /* @__PURE__ */ (0, $.jsx)(he, {
				href: r,
				children: i
			}) : null] })
		}, e)) }), a.error ? /* @__PURE__ */ (0, $.jsx)(j, { children: a.error }) : null]
	});
}
function $s({ uninstall: e, receipt: t }) {
	let [n, r] = (0, Z.useState)(!1), [i, a] = (0, Z.useState)(""), o = () => void Gt({
		title: J("settings:uninstall.title"),
		holdToConfirm: !0,
		danger: !0,
		body: J(n ? "settings:uninstall.confirmFull" : "settings:uninstall.confirmAppOnly"),
		confirmLabel: J("settings:uninstall.title"),
		onConfirm: async () => {
			let e = await U("/api/configuration/uninstall", {
				delete_data: n,
				confirmation: "uninstall-peach"
			});
			a(pr(e) || e.message);
		}
	}), s = i || G(e, "message"), c = [.../* @__PURE__ */ new Set([e.data_root, ...e.directories])];
	return /* @__PURE__ */ (0, $.jsxs)(R, {
		id: "uninstallPeach",
		guide: "uninstall",
		title: J("settings:uninstall.title"),
		children: [
			e.available ? /* @__PURE__ */ (0, $.jsx)(B, { children: /* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:uninstall.help") }) }) : null,
			/* @__PURE__ */ (0, $.jsx)(L, { children: /* @__PURE__ */ (0, $.jsx)(z, {
				label: J("settings:uninstall.full"),
				description: J("settings:uninstall.fullHelp"),
				children: /* @__PURE__ */ (0, $.jsx)(V, {
					"aria-label": J("settings:uninstall.full"),
					isSelected: n,
					isDisabled: !e.full_available || !!i,
					onChange: r
				})
			}) }),
			/* @__PURE__ */ (0, $.jsx)(B, {
				divided: !0,
				children: /* @__PURE__ */ (0, $.jsx)(ce, {
					summary: J("settings:shared.dataDirectory"),
					children: c.map((e) => /* @__PURE__ */ (0, $.jsx)(He, {
						path: e,
						className: "text-body-2-regular text-text-secondary",
						onRevealed: t
					}, e))
				})
			}),
			/* @__PURE__ */ (0, $.jsx)(N, {
				status: s ? /* @__PURE__ */ (0, $.jsx)("p", {
					role: i ? "status" : void 0,
					children: s
				}) : null,
				children: /* @__PURE__ */ (0, $.jsx)(m, {
					variant: "secondary",
					disabled: !e.available || !!i,
					onClick: o,
					children: J("settings:uninstall.title")
				})
			})
		]
	});
}
// src/react/restart-redirect.ts
var ec = 8e3, tc = [
	{
		name: J("settings:cloudDriveGuide.tierHdd"),
		cache: "10–20 GiB",
		read: "256 / 128 KB",
		task: J("settings:cloudDriveGuide.tasksOne")
	},
	{
		name: J("settings:cloudDriveGuide.tierSata"),
		cache: "20–50 GiB",
		read: "256 / 128 KB",
		task: J("settings:cloudDriveGuide.tasksOneToTwo")
	},
	{
		name: J("settings:cloudDriveGuide.tierNvme"),
		cache: "50–100 GiB",
		read: "256 / 128 KB",
		task: J("settings:cloudDriveGuide.tasksTwoPlus")
	}
], nc = [
	["cache", J("settings:cloudDriveGuide.cacheLimit")],
	["read", J("settings:cloudDriveGuide.readLength")],
	["task", J("settings:cloudDriveGuide.concurrentVideos")]
];
function rc() {
	return /* @__PURE__ */ (0, $.jsx)("div", {
		className: "@container flex flex-col gap-3",
		children: /* @__PURE__ */ (0, $.jsxs)(ce, {
			summary: J("settings:cloudDriveGuide.title"),
			children: [
				/* @__PURE__ */ (0, $.jsxs)(P, { children: [J("settings:cloudDriveGuide.mountFirst"), /* @__PURE__ */ (0, $.jsx)(he, {
					href: "https://www.clouddrive2.com/help.html",
					children: J("settings:cloudDriveGuide.mountHelp")
				})] }),
				/* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:cloudDriveGuide.cacheHelp") }),
				/* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:cloudDriveGuide.writeAccess") }),
				/* @__PURE__ */ (0, $.jsx)("ul", {
					"aria-label": J("settings:cloudDriveGuide.tiersLabel"),
					className: "flex flex-col gap-2",
					children: tc.map((e) => /* @__PURE__ */ (0, $.jsxs)("li", {
						className: "flex flex-col gap-2 rounded-2lg border border-separator-border bg-background-primary-default p-3",
						children: [/* @__PURE__ */ (0, $.jsx)("p", {
							className: "text-body-medium text-text-primary",
							children: e.name
						}), /* @__PURE__ */ (0, $.jsx)("dl", {
							className: "inline-grid grid-cols-1 gap-2 @md:grid-cols-3",
							children: nc.map(([t, n]) => /* @__PURE__ */ (0, $.jsxs)("div", {
								className: "flex flex-col",
								children: [/* @__PURE__ */ (0, $.jsx)("dt", {
									className: "text-caption-1-regular text-text-secondary",
									children: n
								}), /* @__PURE__ */ (0, $.jsx)("dd", {
									className: "text-body-regular text-text-primary",
									children: e[t]
								})]
							}, t))
						})]
					}, e.name))
				}),
				/* @__PURE__ */ (0, $.jsxs)("ul", {
					className: "flex list-disc flex-col gap-1 pl-5 text-body-2-regular text-text-secondary",
					children: [
						/* @__PURE__ */ (0, $.jsx)("li", { children: J("settings:cloudDriveGuide.cacheSettingsTip") }),
						/* @__PURE__ */ (0, $.jsx)("li", { children: J("settings:cloudDriveGuide.readLengthTip") }),
						/* @__PURE__ */ (0, $.jsx)("li", { children: J("settings:cloudDriveGuide.cacheTypesTip") })
					]
				}),
				/* @__PURE__ */ (0, $.jsx)(P, { children: /* @__PURE__ */ (0, $.jsx)(he, {
					href: "https://github.com/peach-mitao/peach/blob/master/docs/CLOUDDRIVE.md",
					children: J("settings:cloudDriveGuide.fullGuide")
				}) })
			]
		})
	});
}
// src/react/settings/cloud-proxy-settings.tsx
var ic = "/api/configuration/cloud-proxies", ac = (e) => e.mode === "http" || e.mode === "socks5", oc = (e) => !e.trim() || e.trim().length > 253 || /[/@?#\s]/.test(e.trim()) ? q("errors.clouddriveProxy.hostOnly", "") : "", sc = (e) => !/^\d+$/.test(e.trim()) || Number(e) < 1 || Number(e) > 65535 ? q("errors.clouddriveProxy.portRange", "") : "", cc = [
	[
		"direct",
		J("settings:cloudProxy.direct"),
		"globe"
	],
	[
		"system",
		J("settings:shared.followSystem"),
		"monitor"
	],
	[
		"http",
		J("settings:cloudProxy.http"),
		"network"
	],
	[
		"socks5",
		J("settings:cloudProxy.socks5"),
		"network"
	]
];
function lc({ receipt: e }) {
	let [t, n] = (0, Z.useState)(null), [r, i] = (0, Z.useState)(!0), a = (0, Z.useRef)(/* @__PURE__ */ new Set()), o = (0, Z.useRef)(/* @__PURE__ */ new Set()), [s, c] = (0, Z.useState)(!1), l = (0, Z.useRef)(() => void 0), u = Y(), { checked: d, checkFailed: f } = qr(), p = (e) => {
		o.current.size || u.run("refresh", (e) => H(ic, e), (t) => {
			a.current.clear(), n(t), i(!1), e && d(J("settings:cloudProxy.refreshed"));
		}, (t) => {
			let n = t instanceof Error ? t.message : J("settings:cloudProxy.loadFailed");
			i(!1), u.setError(n), e && f(J("settings:cloudProxy.title"), n);
		});
	};
	return l.current = () => p(!1), (0, Z.useEffect)(() => {
		l.current();
		let e = () => {
			a.current.size || l.current();
		};
		return window.addEventListener("focus", e), () => window.removeEventListener("focus", e);
	}, []), (0, Z.useEffect)(() => {
		if (!t) return;
		let e = (e) => e.mode === "http" || e.mode === "socks5";
		$n("cloudProxy", {
			configured: t.configured !== !1,
			unlinked: t.unlinked?.length ?? 0,
			accounts: t.accounts.map((t) => [e(t.data), e(t.api)])
		});
	}, [t]), r ? /* @__PURE__ */ (0, $.jsx)(it, {
		label: J("settings:cloudProxy.loading"),
		html: Vt
	}) : /* @__PURE__ */ (0, $.jsxs)(R, {
		guide: "cloud-proxy",
		title: J("settings:cloudProxy.title"),
		children: [/* @__PURE__ */ (0, $.jsxs)(B, { children: [/* @__PURE__ */ (0, $.jsx)(P, { children: _ }), /* @__PURE__ */ (0, $.jsxs)("div", {
			className: "flex min-w-0 flex-col gap-4",
			children: [
				u.error ? /* @__PURE__ */ (0, $.jsx)(I, {
					tone: "error",
					title: J("settings:cloudProxy.readFailedTitle"),
					action: /* @__PURE__ */ (0, $.jsx)(ke, {
						href: "/settings/downloads",
						size: "small",
						children: J("settings:cloudProxy.downloadSettingsLink")
					}),
					children: u.error
				}) : null,
				t?.configured === !1 ? /* @__PURE__ */ (0, $.jsx)(I, {
					tone: "neutral",
					action: /* @__PURE__ */ (0, $.jsx)(ke, {
						href: "/settings/downloads",
						size: "small",
						children: J("settings:cloudProxy.downloadSettingsLink")
					}),
					children: J("settings:cloudProxy.notConfigured")
				}) : t?.accounts.length === 0 && !t.unlinked?.length ? /* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:cloudProxy.noLibraries") }) : null,
				t?.unlinked?.map((e) => /* @__PURE__ */ (0, $.jsxs)("div", {
					className: "flex min-w-0 flex-col gap-1",
					children: [/* @__PURE__ */ (0, $.jsx)(be, { children: /* @__PURE__ */ (0, $.jsxs)("span", {
						className: "inline-flex items-center gap-2",
						children: [/* @__PURE__ */ (0, $.jsx)(bt, { mark: si(e.location) }), e.name]
					}) }), /* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:cloudProxy.unmatched") })]
				}, e.root)),
				t?.accounts.map((t) => /* @__PURE__ */ (0, $.jsx)(uc, {
					initial: t,
					receipt: e,
					onDirty: () => a.current.add(t.id),
					onSaving: (e) => {
						e ? o.current.add(t.id) : o.current.delete(t.id), c(!!o.current.size);
					},
					onSaved: (e) => {
						a.current.delete(e.id), n((t) => t && {
							...t,
							accounts: t.accounts.map((t) => t.id === e.id ? e : t)
						});
					}
				}, t.id + t.revision))
			]
		})] }), /* @__PURE__ */ (0, $.jsx)(N, { children: /* @__PURE__ */ (0, $.jsx)(m, {
			variant: "secondary",
			disabled: s,
			onClick: () => p(!0),
			...W(u.busy === "refresh"),
			children: J("settings:shared.reload")
		}) })]
	});
}
function uc({ initial: e, receipt: t, onDirty: n, onSaved: r, onSaving: i }) {
	let [a, o] = (0, Z.useState)(e), [s, c] = (0, Z.useState)([]), [l, u] = (0, Z.useState)({}), d = Oa(), f = Pn(a.libraries?.map((e) => e.name) ?? []) || a.name, p = Y(), h = (e, t) => {
		o((n) => ({
			...n,
			[e]: t
		})), c((t) => t.includes(e) ? t : [...t, e]), n();
	}, g = (e) => l[e] ?? String(a[e].port || "");
	return /* @__PURE__ */ (0, $.jsxs)("form", {
		"aria-label": J("settings:cloudProxy.accountForm", { name: f }),
		onSubmit: (e) => {
			e.preventDefault();
			let n = {}, l = {};
			for (let e of s) {
				let t = a[e];
				ac(t) && (n[`${e}-host`] = oc(t.host), n[`${e}-port`] = sc(g(e))), l[e] = {
					...t,
					port: ac(t) ? Number(g(e)) : t.port
				};
			}
			d.check(e.currentTarget, n) && (i(!0), p.run("save", (e) => U(ic, {
				id: a.id,
				revision: a.revision,
				...l
			}, "POST", e), (e) => {
				o(e), u({}), c([]), r(e), t(J("settings:cloudProxy.saved"));
			}).finally(() => i(!1)));
		},
		className: "flex min-w-0 flex-col gap-4 border-t border-separator-border pt-4",
		children: [
			/* @__PURE__ */ (0, $.jsx)(be, { children: /* @__PURE__ */ (0, $.jsxs)("span", {
				className: "inline-flex items-center gap-2",
				children: [/* @__PURE__ */ (0, $.jsx)(bt, { mark: si(a.libraries?.[0]?.location || (a.cloud === "115open" ? "115" : a.cloud.toLowerCase())) }), f]
			}) }),
			/* @__PURE__ */ (0, $.jsxs)(P, { children: [
				a.name,
				" · ",
				a.path
			] }),
			["data", "api"].map((e) => /* @__PURE__ */ (0, $.jsx)(dc, {
				kind: e,
				label: J(e === "data" ? "settings:cloudProxy.dataProxy" : "settings:cloudProxy.apiProxy"),
				value: a[e],
				port: g(e),
				validation: d,
				disabled: !a.writable || !!p.busy,
				onChange: (t) => h(e, t),
				onPortChange: (t) => {
					u((n) => ({
						...n,
						[e]: t
					})), h(e, a[e]);
				}
			}, e)),
			a.writable ? null : /* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:cloudProxy.needsWritePermission") }),
			p.error ? /* @__PURE__ */ (0, $.jsx)(I, {
				tone: "error",
				title: J("settings:shared.notSaved"),
				children: p.error
			}) : null,
			/* @__PURE__ */ (0, $.jsx)("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ (0, $.jsx)(m, {
					type: "submit",
					disabled: !a.writable || !s.length,
					...W(p.busy === "save"),
					children: J("settings:shared.saveSettings")
				})
			})
		]
	});
}
function dc({ kind: e, label: t, value: n, port: r, disabled: i, validation: a, onChange: o, onPortChange: s }) {
	let c = ac(n), l = `${e}-host`, u = `${e}-port`;
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		className: "flex min-w-0 flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, $.jsx)(be, { children: t }),
			/* @__PURE__ */ (0, $.jsxs)(ct, {
				"aria-label": t,
				selectedKey: n.mode,
				isDisabled: i,
				onSelectionChange: (e) => {
					e && (a.update(l), a.update(u), o({
						...n,
						mode: String(e)
					}));
				},
				children: [n.mode === "unknown" ? /* @__PURE__ */ (0, $.jsx)(ut, {
					id: "unknown",
					glyph: "info",
					children: J("settings:cloudProxy.unknownType")
				}) : null, cc.map(([e, t, n]) => /* @__PURE__ */ (0, $.jsx)(ut, {
					id: e,
					glyph: n,
					children: t
				}, e))]
			}),
			c ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsxs)("div", {
				className: "flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, $.jsx)(F, {
					className: "min-w-40 flex-1",
					label: J("settings:cloudProxy.host", { label: t }),
					value: n.host,
					autoComplete: "off",
					isDisabled: i,
					"data-settings-field": l,
					validationBehavior: "aria",
					isInvalid: !!a.errors[l],
					hint: a.errors[l],
					onBlur: () => a.update(l, oc(n.host)),
					onChange: (e) => {
						o({
							...n,
							host: e
						}), a.update(l);
					}
				}), /* @__PURE__ */ (0, $.jsx)(F, {
					className: "w-full sm:w-28",
					label: J("settings:cloudProxy.port", { label: t }),
					value: r,
					inputMode: "numeric",
					isDisabled: i,
					"data-settings-field": u,
					validationBehavior: "aria",
					isInvalid: !!a.errors[u],
					hint: a.errors[u],
					onBlur: () => a.update(u, sc(r)),
					onChange: (e) => {
						s(e), a.update(u);
					}
				})]
			}), /* @__PURE__ */ (0, $.jsxs)(ce, {
				summary: J("settings:cloudProxy.authentication"),
				children: [
					/* @__PURE__ */ (0, $.jsx)(F, {
						label: J("settings:cloudProxy.username", { label: t }),
						value: n.username,
						autoComplete: "off",
						isDisabled: i,
						onChange: (e) => o({
							...n,
							username: e
						})
					}),
					/* @__PURE__ */ (0, $.jsx)(F, {
						label: J("settings:cloudProxy.password", { label: t }),
						type: "password",
						value: n.password || "",
						autoComplete: "new-password",
						isDisabled: i,
						placeholder: n.password_set ? J("settings:shared.savedLeaveBlank") : J("settings:shared.optional"),
						onChange: (e) => o({
							...n,
							password: e
						})
					}),
					n.password_set ? /* @__PURE__ */ (0, $.jsx)(k, {
						isSelected: !!n.clear_password,
						isDisabled: i,
						onChange: (e) => o({
							...n,
							clear_password: e
						}),
						children: J("settings:cloudProxy.clearPassword")
					}) : null
				]
			})] }) : null
		]
	});
}
// src/react/settings/code-pattern-settings.tsx
var fc = "^\\+{3}\\s*(?<code>FC2-PPV-\\d+)\n\\[(?<code>[A-Z]+-\\d+)\\]";
function pc({ receipt: e }) {
	let t = X({
		queryKey: nt,
		queryFn: ({ signal: e }) => rn(e)
	}), [n, r] = (0, Z.useState)(null), i = Y(), a = n ?? (t.data?.codePatterns ?? []).join("\n"), o = i.error || (t.error ? K(t.error) : "");
	return /* @__PURE__ */ (0, $.jsxs)(R, {
		guide: "codes",
		title: J("settings:codePatterns.title"),
		onSubmit: (t) => {
			t.preventDefault();
			let n = a.split("\n").map((e) => e.trim()).filter(Boolean);
			i.run("save", (e) => U(rt, { codePatterns: n }, "POST", e), (t) => {
				Xn.setQueryData(nt, t), r(null), e(J("settings:shared.settingsSaved"));
			});
		},
		children: [/* @__PURE__ */ (0, $.jsxs)(B, { children: [/* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:codePatterns.help") }), /* @__PURE__ */ (0, $.jsx)(Dt, {
			id: "codePatternSetting",
			"aria-label": J("settings:codePatterns.title"),
			rows: 3,
			autoResize: !0,
			maxRows: 12,
			spellCheck: "false",
			autoComplete: "off",
			placeholder: fc,
			value: a,
			isDisabled: !t.data,
			isInvalid: !!o,
			hint: o || void 0,
			onChange: r
		})] }), /* @__PURE__ */ (0, $.jsx)(N, { children: /* @__PURE__ */ (0, $.jsx)(m, {
			type: "submit",
			...W(i.busy === "save"),
			children: J("settings:shared.saveSettings")
		}) })]
	});
}
// src/react/settings/service-preferences.tsx
var mc = [
	["off", J("settings:timelineThumbnails.off")],
	["precise", J("settings:timelineThumbnails.precise")],
	["coarse", J("settings:timelineThumbnails.coarse")]
], hc = [
	{
		key: "sourceBudgetRequests",
		fallback: 6e3,
		choices: [
			1500,
			3e3,
			6e3,
			12e3,
			24e3,
			48e3
		],
		label: () => J("settings:sourceBudget.requests"),
		help: () => J("settings:sourceBudget.requestsHelp"),
		option: (e) => J("settings:sourceBudget.requestCount", { count: e })
	},
	{
		key: "sourceBudgetHours",
		fallback: 4,
		choices: [
			1,
			2,
			4,
			8,
			12,
			24
		],
		label: () => J("settings:sourceBudget.hours"),
		help: () => void 0,
		option: (e) => J("settings:sourceBudget.hourCount", { count: e })
	},
	{
		key: "sourceBudgetGigabytes",
		fallback: 1,
		choices: [
			1,
			2,
			4,
			8,
			16
		],
		label: () => J("settings:sourceBudget.gigabytes"),
		help: () => void 0,
		option: (e) => J("settings:sourceBudget.gigabyteCount", { count: e })
	}
];
function gc({ receipt: e }) {
	let t = X({
		queryKey: nt,
		queryFn: ({ signal: e }) => rn(e)
	}), n = Vr(), r = n.error || t.error, i = !t.data || n.isPending;
	return /* @__PURE__ */ (0, $.jsxs)(R, {
		title: J("settings:taskSpeed.title"),
		children: [/* @__PURE__ */ (0, $.jsxs)(L, { children: [/* @__PURE__ */ (0, $.jsx)(z, {
			label: J("settings:taskSpeed.defaultSpeed"),
			description: J("settings:taskSpeed.defaultSpeedHelp"),
			children: /* @__PURE__ */ (0, $.jsx)(Ge, {
				value: t.data?.taskSpeedMode || "standard",
				busy: i,
				onChange: (t) => n.mutate({ taskSpeedMode: t }, { onSuccess: () => e(J("settings:taskSpeed.saved")) })
			})
		}), hc.map((r) => /* @__PURE__ */ (0, $.jsx)(z, {
			label: r.label(),
			description: r.help(),
			children: /* @__PURE__ */ (0, $.jsx)("div", {
				id: `${r.key}Setting`,
				className: "shrink-0",
				children: /* @__PURE__ */ (0, $.jsx)(lt, {
					"aria-label": r.label(),
					selectedKey: String(t.data?.[r.key] ?? r.fallback),
					isDisabled: i,
					onSelectionChange: (t) => {
						t !== null && n.mutate({ [r.key]: Number(t) }, { onSuccess: () => e(J("settings:sourceBudget.saved")) });
					},
					children: r.choices.map((e) => /* @__PURE__ */ (0, $.jsx)(dt, {
						id: String(e),
						children: r.option(e)
					}, e))
				})
			})
		}, r.key))] }), r ? /* @__PURE__ */ (0, $.jsx)(B, {
			divided: !0,
			children: /* @__PURE__ */ (0, $.jsx)(j, { children: K(r) })
		}) : null]
	});
}
function _c({ epoch: e = 0, disabled: t = !1 }) {
	let n = X({
		queryKey: St,
		queryFn: ({ signal: e }) => on(e),
		refetchOnMount: "always"
	}), r = Hr(), i = r.reset;
	(0, Z.useEffect)(() => {
		i();
	}, [e, i]);
	let a = n.data, o = r.error || n.error;
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
		/* @__PURE__ */ (0, $.jsx)(L, { children: /* @__PURE__ */ (0, $.jsx)(z, {
			label: J("settings:videoPreviews.timeline"),
			description: J("settings:videoPreviews.timelineHelp"),
			children: /* @__PURE__ */ (0, $.jsx)("div", {
				id: "videoThumbnailSetting",
				children: /* @__PURE__ */ (0, $.jsx)(lt, {
					"aria-label": J("settings:timelineThumbnails.interval"),
					selectedKey: a?.mode || "off",
					isDisabled: t || !a || n.isFetching || r.isPending,
					onSelectionChange: (e) => {
						e !== null && r.mutate(String(e));
					},
					children: mc.map(([e, t]) => /* @__PURE__ */ (0, $.jsx)(dt, {
						id: e,
						children: t
					}, e))
				})
			})
		}) }),
		r.isPending || a?.status === "running" ? /* @__PURE__ */ (0, $.jsxs)(B, {
			divided: !0,
			children: [r.isPending ? /* @__PURE__ */ (0, $.jsx)(Tt, {
				embedded: !0,
				kind: "gather",
				label: J("settings:shared.saving")
			}) : /* @__PURE__ */ (0, $.jsx)(Tt, {
				embedded: !0,
				kind: Mt("timeline-thumbnails"),
				label: J("settings:timelineThumbnails.generating")
			}), r.isPending ? null : /* @__PURE__ */ (0, $.jsx)(wt, {})]
		}) : null,
		o ? /* @__PURE__ */ (0, $.jsx)(B, {
			divided: !0,
			children: /* @__PURE__ */ (0, $.jsx)(j, { children: K(o) })
		}) : null
	] });
}
function vc({ receipt: e }) {
	let t = Pt();
	(0, Z.useSyncExternalStore)(t.subscribe, t.version);
	let n = X({
		queryKey: nt,
		queryFn: ({ signal: e }) => rn(e),
		refetchOnMount: "always"
	}), r = Vr(), i = n.data?.followInitialDays ?? t.value.followInitialDays, a = r.error || n.error;
	return /* @__PURE__ */ (0, $.jsxs)(R, {
		guide: "follow-options",
		title: J("settings:followFetch.title"),
		children: [/* @__PURE__ */ (0, $.jsxs)(L, { children: [
			/* @__PURE__ */ (0, $.jsx)(bc, { kind: "follow" }),
			/* @__PURE__ */ (0, $.jsx)(bc, { kind: "feed" }),
			/* @__PURE__ */ (0, $.jsx)(z, {
				label: J("settings:followFetch.initialRange"),
				description: J("settings:followFetch.initialRangeHelp"),
				children: /* @__PURE__ */ (0, $.jsx)("div", {
					id: "followInitialDaysSetting",
					className: "shrink-0",
					children: /* @__PURE__ */ (0, $.jsx)(lt, {
						"aria-label": J("settings:followFetch.initialRange"),
						selectedKey: String(i),
						isDisabled: n.isFetching || r.isPending,
						onSelectionChange: (n) => {
							n !== null && r.mutate({ followInitialDays: Number(n) }, { onSuccess: (n) => {
								typeof n.followInitialDays == "number" && (t.value.followInitialDays = n.followInitialDays), t.save(), e(J("settings:followSchedule.initialRangeSaved"));
							} });
						},
						children: ve.map(([e, t]) => /* @__PURE__ */ (0, $.jsx)(dt, {
							id: e,
							children: t
						}, e))
					})
				})
			}),
			/* @__PURE__ */ (0, $.jsx)(z, {
				label: J("settings:followFetch.avatarRefresh"),
				description: J("settings:followFetch.avatarRefreshHelp"),
				children: /* @__PURE__ */ (0, $.jsx)("span", {
					className: "shrink-0",
					children: J("settings:followSchedule.avatarRefresh")
				})
			}),
			/* @__PURE__ */ (0, $.jsx)(z, {
				label: J("settings:followFetch.faviconRefresh"),
				description: J("settings:followFetch.faviconRefreshHelp"),
				children: /* @__PURE__ */ (0, $.jsx)("span", {
					className: "shrink-0",
					children: J("settings:followSchedule.faviconRefresh")
				})
			})
		] }), a ? /* @__PURE__ */ (0, $.jsx)(B, {
			divided: !0,
			children: /* @__PURE__ */ (0, $.jsx)(j, { children: K(a) })
		}) : null]
	});
}
var yc = {
	follow: {
		id: "followScheduleSetting",
		label: () => J("settings:followFetch.autoCheck"),
		help: () => J("settings:followSchedule.autoCheckHelp"),
		input: () => J("settings:followSchedule.autoCheckInterval"),
		name: "follow-interval",
		running: () => J("settings:followSchedule.checking"),
		activity: "follow-check",
		failure: () => J("settings:followSchedule.lastCheckFailed")
	},
	feed: {
		id: "feedScheduleSetting",
		label: () => J("settings:followFetch.feedSchedule"),
		help: () => J("settings:followSchedule.feedScheduleHelp"),
		input: () => J("settings:followSchedule.feedScheduleInterval"),
		name: "feed-interval",
		running: () => J("settings:followSchedule.fetchingFeeds"),
		activity: "feed-check",
		failure: () => J("settings:followSchedule.lastFetchFailed")
	}
};
function bc({ kind: e }) {
	let t = yc[e], { key: n, fetch: r, fallback: i } = Ze[e], a = X({
		queryKey: n,
		queryFn: ({ signal: e }) => r(e),
		refetchOnMount: "always",
		refetchInterval: ar
	}), o = Br(e), s = a.data, c = `peach.number.${t.id}`, u = (0, Z.useRef)(Rt(Number(localStorage.getItem(c)), 15, 10080, i)), [d, f] = (0, Z.useState)("switch"), [p, m] = (0, Z.useState)(String(i)), [h, g] = (0, Z.useState)(!1);
	(0, Z.useEffect)(() => {
		s?.enabled && (u.current = s.interval_minutes, m(String(s.interval_minutes)));
	}, [s]);
	let _ = !s?.available || a.isFetching || o.isPending, v = () => {
		let e = Number(p);
		!Number.isInteger(e) || e < 15 || e > 10080 ? g(!0) : (g(!1), s?.enabled && !_ && e !== s.interval_minutes && (u.current = e, localStorage.setItem(c, String(e)), f("interval"), o.mutate(e)));
	}, y = o.error || a.error, b = o.isPending ? /* @__PURE__ */ (0, $.jsxs)("span", {
		role: "status",
		className: "flex items-center gap-1 text-body-2-regular text-text-secondary",
		children: [/* @__PURE__ */ (0, $.jsx)(l, { className: "size-4" }), J("settings:shared.saving")]
	}) : null, x = s && !s.available ? J("settings:followSchedule.primaryOnly") : t.help();
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
		/* @__PURE__ */ (0, $.jsx)(z, {
			label: t.label(),
			description: x,
			children: /* @__PURE__ */ (0, $.jsxs)("div", {
				id: t.id,
				className: "flex min-h-9 shrink-0 flex-wrap items-center justify-end gap-2",
				children: [
					/* @__PURE__ */ (0, $.jsx)(V, {
						"aria-label": t.label(),
						isSelected: s?.enabled === !0,
						isDisabled: !s?.available,
						"aria-disabled": _ || void 0,
						"aria-busy": o.isPending && d === "switch" || void 0,
						onChange: (e) => {
							_ || (localStorage.setItem(c, String(u.current)), f("switch"), o.mutate(e ? u.current : 0));
						}
					}),
					d === "switch" ? b : null,
					s?.enabled ? /* @__PURE__ */ (0, $.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, $.jsx)(F, {
							type: "number",
							inputMode: "numeric",
							name: t.name,
							autoComplete: "off",
							"aria-label": t.input(),
							className: "w-21 sm:w-24",
							value: p,
							onChange: (e) => {
								m(e), g(!1);
							},
							onBlur: v,
							onKeyDown: (e) => {
								e.key === "Enter" && (e.preventDefault(), v());
							},
							isDisabled: !s.available,
							isReadOnly: a.isFetching || o.isPending,
							isInvalid: h,
							"aria-busy": o.isPending && d === "interval" || void 0
						}), /* @__PURE__ */ (0, $.jsx)("span", {
							className: "text-body-2-regular text-text-secondary",
							children: J("settings:numberSetting.unitMinutes")
						})]
					}) : null,
					d === "interval" ? b : null
				]
			})
		}),
		h ? /* @__PURE__ */ (0, $.jsx)(B, { children: /* @__PURE__ */ (0, $.jsx)(j, { children: J("settings:followSchedule.invalidInterval") }) }) : null,
		s?.running ? /* @__PURE__ */ (0, $.jsx)(B, { children: /* @__PURE__ */ (0, $.jsx)(Tt, {
			embedded: !0,
			kind: Mt(t.activity),
			label: t.running()
		}) }) : null,
		/* @__PURE__ */ (0, $.jsx)(xc, {
			kind: e,
			status: s,
			title: t.failure()
		}),
		y ? /* @__PURE__ */ (0, $.jsx)(B, { children: /* @__PURE__ */ (0, $.jsx)(j, { children: K(y) }) }) : null
	] });
}
function xc({ kind: e, status: t, title: n }) {
	let r = zr(e);
	if (!t?.enabled || t.running || !t.last_error) return null;
	let i = t.consecutive_failures ?? 0, a = Bn(t.next_run_at), o = [i > 1 ? J("settings:followSchedule.consecutiveFailures", { count: i }) : "", a ? J("settings:followSchedule.nextRun", { time: a }) : ""].filter(Boolean).join(J("shell:format.clauseSeparator")), s = [
		t.last_error,
		o,
		r.error ? J("settings:followSchedule.retryFailed", { error: K(r.error) }) : ""
	].filter(Boolean).join("\n");
	return /* @__PURE__ */ (0, $.jsx)(B, { children: /* @__PURE__ */ (0, $.jsx)(I, {
		tone: "error",
		title: n,
		action: /* @__PURE__ */ (0, $.jsx)(m, {
			variant: "secondary",
			size: "small",
			disabled: !t.available,
			...W(r.isPending),
			onClick: () => r.mutate(),
			children: J("settings:shared.retryNow")
		}),
		children: s
	}) });
}
// src/react/settings/media-processing-settings.tsx
function Sc({ receipt: e }) {
	let t = X({
		queryKey: Me,
		queryFn: ({ signal: e }) => nn(e)
	}), n = Y(), r = n.error || (t.error ? K(t.error) : ""), i = !t.data || t.isFetching || !!n.busy;
	return /* @__PURE__ */ (0, $.jsxs)(R, {
		guide: "preview",
		title: J("settings:videoPreviews.title"),
		children: [
			/* @__PURE__ */ (0, $.jsx)(L, { children: /* @__PURE__ */ (0, $.jsx)(z, {
				label: J("settings:videoPreviews.generate"),
				description: J("settings:videoPreviews.generateHelp"),
				children: /* @__PURE__ */ (0, $.jsx)(V, {
					"aria-label": J("settings:videoPreviews.generate"),
					isSelected: !!t.data && !t.data.metadata_only,
					isDisabled: i,
					onChange: (t) => void n.run("save", (e) => U(Ne, { metadata_only: !t }, "POST", e), (t) => {
						Xn.setQueryData(Me, t), Xn.invalidateQueries({ queryKey: St }), Xn.invalidateQueries({ queryKey: we }), e(t.metadata_only ? J("settings:videoPreview.turnedOff") : J("settings:videoPreview.turnedOn"));
					})
				})
			}) }),
			/* @__PURE__ */ (0, $.jsx)(_c, { disabled: !t.data || t.data.metadata_only || !!n.busy }),
			/* @__PURE__ */ (0, $.jsx)(L, { children: /* @__PURE__ */ (0, $.jsx)(z, {
				label: J("settings:videoPreviews.decoder"),
				description: J("settings:videoPreviews.decoderHelp"),
				children: /* @__PURE__ */ (0, $.jsx)("div", {
					id: "previewAccelerationSetting",
					children: /* @__PURE__ */ (0, $.jsxs)(ct, {
						"aria-label": J("settings:videoPreviews.decoder"),
						selectedKey: t.data?.preview_acceleration || "auto",
						isDisabled: i || !!t.data?.metadata_only,
						onSelectionChange: (t) => {
							t !== null && n.run("preview_acceleration", (e) => U(Ne, { preview_acceleration: String(t) }, "POST", e), (t) => {
								Xn.setQueryData(Me, t), e(J("settings:videoPreview.decodingSaved"));
							});
						},
						children: [/* @__PURE__ */ (0, $.jsx)(ut, {
							id: "auto",
							glyph: Cn,
							children: J("settings:videoProcessing.autoHardwareFirst")
						}), /* @__PURE__ */ (0, $.jsx)(ut, {
							id: "software",
							glyph: Sr,
							children: J("settings:videoPreview.softwareDecoding")
						})]
					})
				})
			}) }),
			n.busy ? /* @__PURE__ */ (0, $.jsx)(B, {
				divided: !0,
				children: /* @__PURE__ */ (0, $.jsx)(Tt, {
					embedded: !0,
					kind: "gather",
					label: J("settings:shared.saving")
				})
			}) : null,
			r ? /* @__PURE__ */ (0, $.jsx)(B, {
				divided: !0,
				children: /* @__PURE__ */ (0, $.jsx)(j, { children: r })
			}) : null
		]
	});
}
var Cc = [
	0,
	1080,
	720,
	480
];
function wc({ receipt: e }) {
	let t = X({
		queryKey: Me,
		queryFn: ({ signal: e }) => nn(e)
	}), n = Y(), r = n.error || (t.error ? K(t.error) : ""), i = !t.data || t.isFetching || !!n.busy;
	return /* @__PURE__ */ (0, $.jsxs)(R, {
		guide: "transcode",
		title: J("settings:transcoding.title"),
		children: [
			/* @__PURE__ */ (0, $.jsxs)(L, { children: [/* @__PURE__ */ (0, $.jsx)(z, {
				label: J("settings:transcoding.mode"),
				description: J("settings:transcoding.modeHelp"),
				children: /* @__PURE__ */ (0, $.jsx)("div", {
					id: "playbackAccelerationSetting",
					children: /* @__PURE__ */ (0, $.jsxs)(ct, {
						"aria-label": J("settings:transcoding.mode"),
						selectedKey: t.data?.playback_acceleration || "auto",
						isDisabled: i,
						onSelectionChange: (t) => {
							t !== null && n.run("playback_acceleration", (e) => U(Ne, { playback_acceleration: String(t) }, "POST", e), (t) => {
								Xn.setQueryData(Me, t), e(J("settings:playbackTranscode.saved"));
							});
						},
						children: [/* @__PURE__ */ (0, $.jsx)(ut, {
							id: "auto",
							glyph: Cn,
							children: J("settings:videoProcessing.autoHardwareFirst")
						}), /* @__PURE__ */ (0, $.jsx)(ut, {
							id: "software",
							glyph: Sr,
							children: J("settings:playbackTranscode.software")
						})]
					})
				})
			}), /* @__PURE__ */ (0, $.jsx)(z, {
				label: J("settings:transcoding.quality"),
				description: J("settings:transcoding.qualityHelp"),
				children: /* @__PURE__ */ (0, $.jsx)("div", {
					id: "playbackQualitySetting",
					children: /* @__PURE__ */ (0, $.jsx)(ct, {
						"aria-label": J("settings:transcoding.quality"),
						selectedKey: String(t.data?.playback_max_height ?? 0),
						isDisabled: i,
						onSelectionChange: (t) => {
							t !== null && n.run("playback_max_height", (e) => U(Ne, { playback_max_height: Number(t) }, "POST", e), (t) => {
								Xn.setQueryData(Me, t), e(J("settings:playbackTranscode.qualitySaved"));
							});
						},
						children: Cc.map((e) => /* @__PURE__ */ (0, $.jsx)(ut, {
							id: String(e),
							children: e ? J("settings:transcoding.qualityHeight", { height: e }) : J("settings:transcoding.original")
						}, e))
					})
				})
			})] }),
			n.busy ? /* @__PURE__ */ (0, $.jsx)(B, {
				divided: !0,
				children: /* @__PURE__ */ (0, $.jsx)(Tt, {
					embedded: !0,
					kind: "gather",
					label: J("settings:shared.saving")
				})
			}) : null,
			r ? /* @__PURE__ */ (0, $.jsx)(B, {
				divided: !0,
				children: /* @__PURE__ */ (0, $.jsx)(j, { children: r })
			}) : null
		]
	});
}
// src/react/settings/library-icon-picker.tsx
var Tc = [
	["", J("settings:libraryIcons.auto")],
	["hard-drive", J("settings:libraryIcons.hardDrive")],
	["database", J("settings:libraryIcons.database")],
	["heart", J("settings:libraryIcons.crush")],
	["heart-hand", J("settings:libraryIcons.intimate")],
	["flame", J("settings:libraryIcons.passion")],
	["cherry", J("settings:libraryIcons.cherry")],
	["lollipop", J("settings:libraryIcons.sweetie")],
	["candy", J("settings:libraryIcons.candy")],
	["banana", J("settings:libraryIcons.banana")],
	["droplets", J("settings:libraryIcons.wet")],
	["venus", J("settings:libraryIcons.female")],
	["mars", J("settings:libraryIcons.male")],
	["venus-and-mars", J("settings:libraryIcons.couple")],
	["gem", J("settings:libraryIcons.featured")],
	["crown", J("settings:libraryIcons.queen")],
	["ribbon", J("settings:libraryIcons.ribbon")],
	["shirt", J("settings:libraryIcons.uniform")],
	["graduation-cap", J("settings:libraryIcons.student")],
	["stethoscope", J("settings:libraryIcons.nurse")],
	["glasses", J("settings:libraryIcons.glasses")],
	["footprints", J("settings:libraryIcons.footprints")],
	["hand", J("settings:libraryIcons.hands")],
	["flower", J("settings:libraryIcons.flower")],
	["venetian-mask", J("settings:libraryIcons.cosplay")],
	["rabbit", J("settings:libraryIcons.bunnyGirl")],
	["paw-print", J("settings:libraryIcons.animalEars")],
	["dumbbell", J("settings:libraryIcons.fitness")],
	["bed-double", J("settings:libraryIcons.bedroom")],
	["bath", J("settings:libraryIcons.bathroom")],
	["key-round", J("settings:libraryIcons.private")],
	["wine", J("settings:libraryIcons.tipsy")],
	["cigarette", J("settings:libraryIcons.smoking")],
	["moon", J("settings:libraryIcons.night")],
	["sparkles", J("settings:libraryIcons.fantasy")],
	["camera", J("settings:libraryIcons.photoShoot")],
	["video", J("settings:libraryIcons.videos")],
	["film", J("settings:libraryIcons.movies")],
	["image", J("settings:libraryIcons.imageSets")],
	["gamepad-2", J("settings:libraryIcons.games")],
	["star", J("settings:libraryIcons.favorites")],
	["tags", J("settings:libraryIcons.topics")]
];
function Ec(e) {
	let t = e === "local" ? "" : Pe[e];
	return t ? [t, J("settings:libraryIcons.auto")] : ["hard-drive", J("settings:libraryIcons.default")];
}
var Dc = "auto";
function Oc({ value: n, label: r, kind: s = "local", onChange: c }) {
	let l = (0, Z.useRef)(null), [u, d] = (0, Z.useState)(!1), [f, p] = (0, Z.useState)(n), [h, g] = Ec(s);
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)(m, {
		ref: l,
		variant: "secondary",
		className: "self-start",
		"aria-label": r,
		"aria-haspopup": "dialog",
		"aria-expanded": u,
		onClick: () => {
			p(n), d(!0);
		},
		children: /* @__PURE__ */ (0, $.jsxs)("span", {
			"data-icon-choice": !0,
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, $.jsx)(bt, { mark: n || h }), ((e) => e && Tc.find(([t]) => t === e)?.[1] || g)(n)]
		})
	}), /* @__PURE__ */ (0, $.jsx)(t, {
		triggerRef: l,
		isOpen: u,
		onOpenChange: d,
		placement: "bottom start",
		offset: 4,
		className: Fe,
		children: /* @__PURE__ */ (0, $.jsxs)(i, {
			"aria-label": J("settings:libraryIcons.dialogLabel", { label: r }),
			className: "flex w-72 flex-col gap-3 outline-none",
			children: [
				/* @__PURE__ */ (0, $.jsx)(e, {
					slot: "title",
					className: "px-1 text-body-medium text-text-primary",
					children: J("settings:libraryIcons.title")
				}),
				/* @__PURE__ */ (0, $.jsx)(a, {
					"aria-label": J("settings:libraryIcons.choices"),
					value: f || Dc,
					onChange: (e) => p(e === Dc ? "" : e),
					className: "inline-grid grid-cols-7 gap-1",
					children: Tc.map(([e, t]) => /* @__PURE__ */ (0, $.jsx)(o, {
						value: e || Dc,
						"aria-label": e ? t : g,
						className: "flex h-10 cursor-pointer items-center justify-center rounded-lg text-foreground-icon-secondary outline-none hover:bg-dropdown-item-hover-background focus-visible:ring-2 focus-visible:ring-border-focus-ring data-selected:bg-dropdown-item-hover-background data-selected:text-text-primary",
						children: /* @__PURE__ */ (0, $.jsx)(bt, { mark: e || h })
					}, e || Dc))
				}),
				/* @__PURE__ */ (0, $.jsxs)("div", {
					className: "flex justify-end gap-2 border-t border-separator-border pt-2.5",
					children: [/* @__PURE__ */ (0, $.jsx)(m, {
						variant: "secondary",
						onClick: () => d(!1),
						children: J("settings:shared.cancel")
					}), /* @__PURE__ */ (0, $.jsx)(m, {
						disabled: f === n,
						onClick: () => {
							c(f), d(!1);
						},
						children: J("settings:shared.apply")
					})]
				})
			]
		})
	})] });
}
// src/react/settings/library-policy-settings.tsx
var kc = [
	["probe", J("settings:libraryPolicy.stepProbe")],
	["metadata", J("settings:libraryPolicy.stepMetadata")],
	["cover", J("settings:libraryPolicy.stepCovers")],
	["people", J("settings:libraryPolicy.stepAvatars")],
	["preview", J("settings:libraryPolicy.stepContactSheet")]
], Ac = [
	"probe",
	"metadata",
	"cover",
	"people",
	"preview"
], jc = [
	[
		"auto",
		J("settings:libraryPolicy.auto"),
		J("settings:libraryPolicy.autoHint")
	],
	[
		"local",
		J("settings:libraryPolicy.localOnly"),
		J("settings:libraryPolicy.localHint")
	],
	[
		"custom",
		J("settings:shared.custom"),
		J("settings:libraryPolicy.customHint")
	]
];
function Mc() {
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		"data-policy-legend": "",
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ (0, $.jsx)(P, { children: Ve }), /* @__PURE__ */ (0, $.jsxs)(ce, {
			summary: J("settings:libraryPolicy.compare"),
			children: [/* @__PURE__ */ (0, $.jsxs)("table", {
				"data-policy-matrix": "",
				className: "text-body-2-regular",
				children: [/* @__PURE__ */ (0, $.jsx)("thead", { children: /* @__PURE__ */ (0, $.jsxs)("tr", { children: [/* @__PURE__ */ (0, $.jsx)("th", {
					scope: "col",
					children: /* @__PURE__ */ (0, $.jsx)(r, { children: J("settings:libraryPolicy.step") })
				}), Re.map((e) => /* @__PURE__ */ (0, $.jsx)("th", {
					scope: "col",
					children: e
				}, e))] }) }), /* @__PURE__ */ (0, $.jsx)("tbody", { children: Be.map(([e, ...t]) => /* @__PURE__ */ (0, $.jsxs)("tr", { children: [/* @__PURE__ */ (0, $.jsx)("th", {
					scope: "row",
					children: e
				}), t.map((e, t) => /* @__PURE__ */ (0, $.jsx)("td", {
					"data-policy-cell": e === "✓" ? "on" : e === "—" ? "off" : "choice",
					children: e === "✓" ? /* @__PURE__ */ (0, $.jsx)("span", {
						"aria-label": J("settings:libraryPolicy.included"),
						children: "✓"
					}) : e === "—" ? /* @__PURE__ */ (0, $.jsx)("span", {
						"aria-label": J("settings:libraryPolicy.notIncluded"),
						children: "—"
					}) : e
				}, Re[t]))] }, e)) })]
			}), /* @__PURE__ */ (0, $.jsx)(P, { children: ze })]
		})]
	});
}
function Nc({ name: e, value: t, onChange: n }) {
	return /* @__PURE__ */ (0, $.jsx)(ct, {
		"data-guide-target": "library-policy",
		className: "w-full",
		"aria-label": J("settings:libraryPolicy.modeLabel", { name: e }),
		selectedKey: t,
		prefix: J("settings:libraryPolicy.mode"),
		renderValue: /* @__PURE__ */ (0, $.jsx)("span", {
			className: "truncate",
			children: jc.find(([e]) => e === t)?.[1]
		}),
		onSelectionChange: (e) => n(String(e)),
		children: jc.map(([e, t, n]) => /* @__PURE__ */ (0, $.jsx)(ut, {
			id: e,
			textValue: t,
			children: /* @__PURE__ */ (0, $.jsxs)("span", {
				className: "flex min-w-0 flex-col",
				children: [/* @__PURE__ */ (0, $.jsx)("span", { children: t }), /* @__PURE__ */ (0, $.jsx)("span", {
					className: "text-body-2-regular text-text-secondary whitespace-normal",
					children: n
				})]
			})
		}, e))
	});
}
function Pc({ name: e, value: t, onChange: n, previewsOff: r = !1 }) {
	return /* @__PURE__ */ (0, $.jsxs)(ce, {
		defaultOpen: !0,
		summary: J("settings:libraryPolicy.stepsSummary", {
			name: e,
			selected: t.length,
			total: kc.length
		}),
		children: [/* @__PURE__ */ (0, $.jsx)("div", {
			className: "flex flex-wrap gap-x-6 gap-y-2",
			role: "group",
			"aria-label": J("settings:libraryPolicy.stepsLabel", { name: e }),
			children: kc.map(([e, i]) => /* @__PURE__ */ (0, $.jsx)(k, {
				isSelected: t.includes(e),
				isDisabled: r && e === "preview",
				onChange: (r) => n(r ? [...t, e] : t.filter((t) => t !== e)),
				children: i
			}, e))
		}), r ? /* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:libraryPolicy.previewsOff") }) : null]
	});
}
function Fc({ id: e, name: r, value: a, onChange: o }) {
	let c = (0, Z.useRef)(null), [l, u] = (0, Z.useState)(!1), d = s.find(([e]) => e === a)?.[1] || J("settings:libraryColor.none"), f = (t) => {
		o(t), qn(e, t), u(!1);
	};
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsxs)("button", {
		ref: c,
		type: "button",
		className: "text-body-medium",
		"data-glow-chip": "",
		"data-library-color-trigger": "",
		"aria-haspopup": "dialog",
		"aria-expanded": l,
		"aria-label": J("settings:libraryColor.triggerLabel", {
			name: r || J("settings:mediaLibraries.untitled"),
			color: d
		}),
		title: d,
		onClick: () => u(!0),
		children: [
			/* @__PURE__ */ (0, $.jsx)("span", {
				"aria-hidden": !0,
				className: "text-text-tertiary",
				children: J("settings:libraryColor.label")
			}),
			a ? /* @__PURE__ */ (0, $.jsx)("span", {
				"data-glow-ball": "",
				"aria-hidden": "true",
				"data-accent-ball": a
			}) : /* @__PURE__ */ (0, $.jsx)("span", {
				"data-glow-ball": "",
				"data-library-none": "",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, $.jsx)("span", { children: d })
		]
	}), /* @__PURE__ */ (0, $.jsx)(n, {
		getContainer: () => Hn(c.current),
		children: /* @__PURE__ */ (0, $.jsx)(t, {
			triggerRef: c,
			isOpen: l,
			onOpenChange: u,
			placement: "bottom start",
			offset: 8,
			containerPadding: 12,
			className: Fe,
			children: /* @__PURE__ */ (0, $.jsxs)(i, {
				"aria-label": J("settings:libraryColor.dialogLabel", { name: r || J("settings:mediaLibraries.untitled") }),
				className: "outline-none",
				children: [/* @__PURE__ */ (0, $.jsx)("p", {
					className: "px-1 pb-2 text-body-medium text-text-primary",
					children: J("settings:libraryColor.choose")
				}), /* @__PURE__ */ (0, $.jsxs)("div", {
					"data-accent-grid": "",
					"data-library-colors": "",
					role: "group",
					children: [/* @__PURE__ */ (0, $.jsx)("button", {
						type: "button",
						"data-glow-chip": "",
						"aria-pressed": !a,
						title: J("settings:libraryColor.none"),
						"aria-label": J("settings:libraryColor.none"),
						onClick: () => f(""),
						children: /* @__PURE__ */ (0, $.jsx)("span", {
							"data-glow-ball": "",
							"data-library-none": "",
							"aria-hidden": "true"
						})
					}), s.map(([e, t]) => /* @__PURE__ */ (0, $.jsx)("button", {
						type: "button",
						"data-glow-chip": "",
						"aria-pressed": e === a,
						title: t,
						"aria-label": t,
						onClick: () => f(e),
						children: /* @__PURE__ */ (0, $.jsx)("span", {
							"data-glow-ball": "",
							"aria-hidden": "true",
							"data-accent-ball": e
						})
					}, e))]
				})]
			})
		})
	})] });
}
// src/react/settings/push-discovery-settings.tsx
var Ic = "/api/configuration/push-discovery", Lc = "/api/configuration/push-discovery/secret";
function Rc({ label: e, help: t, status: n, children: r }) {
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		className: "flex min-h-13 w-full items-center justify-between gap-4 border-b border-separator-border py-2.5 pr-2.5 last:border-b-0",
		children: [/* @__PURE__ */ (0, $.jsxs)("div", {
			className: "flex min-w-0 flex-col",
			children: [/* @__PURE__ */ (0, $.jsx)("p", {
				className: "text-body-regular text-text-primary",
				children: e
			}), /* @__PURE__ */ (0, $.jsxs)(P, { children: [/* @__PURE__ */ (0, $.jsx)("span", { children: t }), n ? /* @__PURE__ */ (0, $.jsx)("span", {
				className: "block",
				children: n
			}) : null] })]
		}), r]
	});
}
function zc({ initial: e, receipt: t }) {
	let [n, r] = (0, Z.useState)(e), [i, a] = (0, Z.useState)(e.prefixes), [o, s] = (0, Z.useState)(""), c = Y(), l = n.media_roots, u = Oa(), d = (0, Z.useId)(), [f, p] = (0, Z.useState)(e), h = (e, n) => {
		r(e), p(e), a(e.prefixes), s(""), t(n);
	}, g = (e, t) => a((n) => n.map((n, r) => r === e ? {
		...n,
		...t
	} : n)), _ = (e) => {
		e.preventDefault();
		let t = {}, r = /* @__PURE__ */ new Set();
		for (let [e, n] of i.entries()) {
			let i = ja(n.prefix), a = n.root.trim();
			a ? l.some((e) => e.toLowerCase() === a.toLowerCase()) || (t[`root-${e}`] = q(l.length ? "errors.pushDiscovery.undeclaredRoot" : "errors.pushDiscovery.noDeclaredRoots", "", {
				root: a,
				known: l
			})) : t[`root-${e}`] = J(l.length ? "settings:pushDiscovery.chooseMediaRoot" : "settings:pushDiscovery.addMediaRoot"), i === "/" ? t[`prefix-${e}`] = J("settings:pushDiscovery.concretePrefix") : (r.has(i) && (t[`prefix-${e}`] = q("errors.pushDiscovery.duplicatePrefix", "", { prefix: i })), r.add(i));
		}
		if (s(""), !u.check(e.currentTarget, t)) return;
		let a = {
			enabled: n.enabled,
			watch_local: n.watch_local,
			cloud: n.cloud,
			prefixes: i
		};
		c.run("save", (e) => U(Ic, a, "POST", e), (e) => h(e, J("settings:shared.settingsSaved")), (e) => s(K(e)));
	}, v = () => {
		c.run("secret", (e) => U(Lc, {}, "POST", e), (e) => h(e, J("settings:pushDiscovery.secretRotated")), (e) => s(K(e)));
	}, y = [
		J("settings:pushDiscovery.ingestedCount", { count: f.queue.ingested }),
		f.queue.failed ? J("settings:pushDiscovery.failedCount", { count: f.queue.failed }) : "",
		f.queue.pending ? J("settings:pushDiscovery.pendingCount", { count: f.queue.pending }) : ""
	].filter(Boolean).join(J("shell:format.clauseSeparator")), b = f.local_running ? J("settings:pushDiscovery.monitoring", { paths: Pn(f.local_roots) }) : (f.local_message ? G(f, "local_message") : "") || J("settings:pushDiscovery.notRunningDetail");
	return /* @__PURE__ */ (0, $.jsxs)(R, {
		id: "pushDiscovery",
		guide: "discovery",
		title: J("settings:fileDiscovery.title"),
		onSubmit: _,
		children: [
			/* @__PURE__ */ (0, $.jsx)(B, { children: /* @__PURE__ */ (0, $.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, $.jsx)("span", {
					className: "text-body-regular text-text-secondary",
					children: J("settings:pushDiscovery.localMonitoring")
				}), /* @__PURE__ */ (0, $.jsx)(xt, {
					tone: !f.enabled || !f.watch_local ? "neutral" : f.local_running ? "progress" : "warning",
					children: !f.enabled || !f.watch_local ? J("settings:shared.notEnabled") : f.local_running ? J("settings:shared.running") : J("settings:pushDiscovery.notRunning")
				})]
			}) }),
			/* @__PURE__ */ (0, $.jsxs)(L, { children: [
				/* @__PURE__ */ (0, $.jsx)(Rc, {
					label: J("settings:fileDiscovery.autoImport"),
					help: J("settings:fileDiscovery.autoImportHelp"),
					status: f.enabled ? y : void 0,
					children: /* @__PURE__ */ (0, $.jsx)(V, {
						"aria-label": J("settings:fileDiscovery.autoImport"),
						isSelected: n.enabled,
						isDisabled: !n.available,
						onChange: (e) => r({
							...n,
							enabled: e
						})
					})
				}),
				/* @__PURE__ */ (0, $.jsx)(Rc, {
					label: J("settings:fileDiscovery.monitorLocal"),
					help: J("settings:fileDiscovery.monitorLocalHelp"),
					status: f.enabled && f.watch_local ? b : void 0,
					children: /* @__PURE__ */ (0, $.jsx)(V, {
						"aria-label": J("settings:fileDiscovery.monitorLocal"),
						isSelected: n.watch_local,
						isDisabled: !n.available || !n.enabled,
						onChange: (e) => r({
							...n,
							watch_local: e
						})
					})
				}),
				/* @__PURE__ */ (0, $.jsx)(z, {
					label: J("settings:fileDiscovery.cloudNotify"),
					description: J("settings:fileDiscovery.cloudNotifyHelp"),
					children: /* @__PURE__ */ (0, $.jsx)(V, {
						"aria-label": J("settings:fileDiscovery.cloudNotify"),
						isSelected: n.cloud,
						isDisabled: !n.available || !n.enabled,
						onChange: (e) => r({
							...n,
							cloud: e
						})
					})
				})
			] }),
			f.enabled && f.queue.last_error ? /* @__PURE__ */ (0, $.jsx)(B, {
				divided: !0,
				children: /* @__PURE__ */ (0, $.jsx)(I, {
					tone: "error",
					title: J("settings:pushDiscovery.lastImportFailed"),
					children: f.queue.last_error
				})
			}) : null,
			f.enabled && f.cloud ? /* @__PURE__ */ (0, $.jsxs)(B, {
				divided: !0,
				children: [/* @__PURE__ */ (0, $.jsxs)("div", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ (0, $.jsx)(be, { children: J("settings:fileDiscovery.webhookConfig") }), /* @__PURE__ */ (0, $.jsx)(P, { children: f.config_toml ? J("settings:pushDiscovery.webhookHelp") : f.origin ? J("settings:pushDiscovery.noSecret") : J("settings:pushDiscovery.needsLanUrl") })]
				}), f.config_toml ? /* @__PURE__ */ (0, $.jsxs)(ce, {
					summary: J("settings:fileDiscovery.viewConfig"),
					children: [/* @__PURE__ */ (0, $.jsx)(Yr, {
						code: f.config_toml,
						language: "toml",
						label: J("settings:pushDiscovery.configLabel"),
						bounded: !1,
						copyLabel: J("settings:pushDiscovery.copyConfig"),
						onCopy: () => t(J("settings:pushDiscovery.configCopied"))
					}), /* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:pushDiscovery.invalidPasteHelp") })]
				}) : null]
			}) : null,
			/* @__PURE__ */ (0, $.jsx)(B, {
				divided: !0,
				children: /* @__PURE__ */ (0, $.jsxs)("div", {
					className: "flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, $.jsx)(be, { children: J("settings:pushDiscovery.cloudPrefixes") }),
						/* @__PURE__ */ (0, $.jsx)(P, { children: /* @__PURE__ */ (0, $.jsx)("span", {
							"data-copy-key": "settings.pushDiscovery.cloudPrefixesHelp",
							children: J("settings:pushDiscovery.cloudPrefixesHelp")
						}) }),
						/* @__PURE__ */ (0, $.jsx)("div", {
							role: "group",
							"aria-label": J("settings:pushDiscovery.cloudPrefixes"),
							className: "flex flex-col gap-3",
							children: i.map((e, t) => {
								let n = `prefix-${t}`, r = `root-${t}`, i = u.errors[n], o = u.errors[r];
								return /* @__PURE__ */ (0, $.jsxs)("div", {
									className: "flex items-start gap-2",
									children: [
										/* @__PURE__ */ (0, $.jsx)(F, {
											className: "min-w-0 flex-1",
											"aria-label": J("settings:pushDiscovery.prefixLabel", { index: t + 1 }),
											placeholder: "/115open/Peach",
											autoComplete: "off",
											maxLength: 200,
											value: e.prefix,
											"data-settings-field": n,
											validationBehavior: "aria",
											isInvalid: !!i,
											hint: i,
											onChange: (e) => {
												g(t, { prefix: e }), u.clear();
											}
										}),
										/* @__PURE__ */ (0, $.jsxs)("div", {
											className: "flex min-w-0 flex-col gap-1",
											children: [/* @__PURE__ */ (0, $.jsx)(ct, {
												"aria-label": J("settings:pushDiscovery.prefixRootLabel", { index: t + 1 }),
												prefix: J("settings:pushDiscovery.mapsTo"),
												selectedKey: e.root || null,
												placeholder: J("settings:pushDiscovery.chooseMediaRoot"),
												"data-settings-field": r,
												validationBehavior: "aria",
												isInvalid: !!o,
												"aria-describedby": o ? `${d}-${t}` : void 0,
												onSelectionChange: (e) => {
													e !== null && (g(t, { root: String(e) }), u.clear());
												},
												children: l.map((e) => /* @__PURE__ */ (0, $.jsx)(ut, {
													id: e,
													glyph: "folder-open",
													children: e
												}, e))
											}), o ? /* @__PURE__ */ (0, $.jsx)(j, {
												id: `${d}-${t}`,
												children: o
											}) : null]
										}),
										/* @__PURE__ */ (0, $.jsx)(m, {
											variant: "secondary",
											iconOnly: !0,
											leadingIcon: je,
											"aria-label": J("settings:pushDiscovery.removeRow"),
											onClick: () => {
												a((e) => e.filter((e, n) => n !== t)), u.clear();
											}
										})
									]
								}, t);
							})
						}),
						/* @__PURE__ */ (0, $.jsx)("div", { children: /* @__PURE__ */ (0, $.jsx)(m, {
							variant: "secondary",
							onClick: () => a((e) => [...e, {
								prefix: "",
								root: l[0] ?? ""
							}]),
							children: J("settings:pushDiscovery.addPrefix")
						}) })
					]
				})
			}),
			o || c.error ? /* @__PURE__ */ (0, $.jsx)(B, {
				divided: !0,
				children: /* @__PURE__ */ (0, $.jsx)(j, { children: o || c.error })
			}) : null,
			/* @__PURE__ */ (0, $.jsxs)(N, { children: [f.enabled && f.cloud && f.config_toml ? /* @__PURE__ */ (0, $.jsx)(m, {
				variant: "secondary",
				onClick: v,
				disabled: !n.available,
				...W(c.busy === "secret"),
				children: J("settings:fileDiscovery.rotateSecret")
			}) : null, /* @__PURE__ */ (0, $.jsx)(m, {
				type: "submit",
				disabled: !n.available,
				...W(c.busy === "save"),
				children: J("settings:shared.saveSettings")
			})] })
		]
	});
}
// src/react/settings/media-settings.tsx
async function Bc(e) {
	let t;
	try {
		t = await tn();
	} catch {
		return !0;
	}
	if (!Jn(t)) return !0;
	let { confirmed: n } = await Gt({
		title: J("settings:mediaLibraries.processingRunning"),
		body: rr(t, e),
		confirmLabel: J("settings:mediaLibraries.saveAnyway")
	});
	return n;
}
var Vc = (e) => ni.find(([t]) => t === e)?.[1] ?? e, Hc = [...ni, ["smb", J("settings:mediaLibraries.smbShare")]], Uc = (e) => e.library_icon || Ec(e.transport === "smb" ? "smb" : e.location)[0], Wc = async (e) => Wn(e, (e) => U(Le, e)), Gc = (e) => ({
	library_id: e.library_id,
	library: e.library,
	library_icon: e.library_icon,
	library_color: e.library_color,
	library_policy: e.library_policy,
	library_stages: e.library_stages
}), Kc = (e) => e.library_stages ? Ac.filter((t) => e.library_stages.split(",").includes(t)) : [], qc = (e = "") => ({
	path: e,
	transport: e.startsWith("smb://") ? "smb" : "filesystem",
	location: "local",
	root: "",
	library_id: Zn(),
	library: "",
	library_icon: "",
	library_color: "",
	library_policy: "auto",
	library_stages: "",
	cost: "free"
});
function Jc(e) {
	let t = e.media_sources?.filter((e) => ni.some(([t]) => t === e.location));
	return t?.length ? t.map((e) => ({
		transport: e.transport === "smb" || e.path.startsWith("smb://") ? "smb" : "filesystem",
		smb_username: e.smb_username,
		smb_password: "",
		smb_encrypt: e.smb_encrypt,
		path: e.path,
		location: e.location,
		root: e.root,
		library: e.library || "",
		library_icon: e.library_icon || "",
		library_color: e.library_color || "",
		library_policy: e.library_policy || "auto",
		library_stages: e.library_stages || "",
		root_id: e.root_id,
		library_id: e.library_id || Zn(),
		cost: e.cost ?? gr(e.location)
	})) : (e.media_dirs.length ? e.media_dirs : [""]).map((e) => qc(e));
}
var Yc = (e) => !(e instanceof p) || e.status !== 400 ? null : Lt(e.body) ?? null;
function Xc({ data: e, receipt: t }) {
	let n = !e.section_errors?.media_sources && !e.section_errors?.library_count, r = !!e.media_sources?.some((e) => oi(e.location));
	return (0, Z.useEffect)(() => {
		if (n && e.editable) {
			let t = /* @__PURE__ */ new Map();
			for (let n of Jc(e)) t.set(n.library_id, (t.get(n.library_id) ?? 0) + 1);
			$n("media", {
				folders: [...t.values()],
				cloud: r
			});
		}
		let t = e.push_discovery;
		n && t && $n("discovery", {
			enabled: t.enabled,
			watchLocal: t.watch_local,
			cloud: t.cloud,
			webhook: t.enabled && t.cloud && !!t.config_toml,
			prefixes: t.prefixes.length
		});
	}, [
		e,
		r,
		n
	]), /* @__PURE__ */ (0, $.jsx)(ba, { entries: [
		n && {
			id: "library-folders",
			label: J("settings:libraryFolders.title"),
			content: e.editable ? /* @__PURE__ */ (0, $.jsx)(Zc, {
				data: e,
				receipt: t
			}) : /* @__PURE__ */ (0, $.jsx)(I, {
				tone: "neutral",
				title: J("settings:mediaLibraries.readOnly"),
				children: e.notice
			})
		},
		n && !e.editable && !!e.media_sources && {
			id: "library-mounts",
			label: J("settings:mountStatus.title"),
			content: /* @__PURE__ */ (0, $.jsx)($c, { data: e })
		},
		n && r && {
			id: "library-cloud-proxy",
			label: J("settings:cloudProxy.title"),
			content: /* @__PURE__ */ (0, $.jsx)(lc, { receipt: t })
		},
		n && e.push_discovery && {
			id: "library-discovery",
			label: J("settings:fileDiscovery.title"),
			content: /* @__PURE__ */ (0, $.jsx)(zc, {
				initial: e.push_discovery,
				receipt: t
			})
		},
		{
			id: "library-code-patterns",
			label: J("settings:codePatterns.title"),
			content: /* @__PURE__ */ (0, $.jsx)(pc, { receipt: t })
		},
		{
			id: "library-video-previews",
			label: J("settings:videoPreviews.title"),
			content: /* @__PURE__ */ (0, $.jsx)(Sc, { receipt: t })
		},
		{
			id: "library-transcoding",
			label: J("settings:transcoding.title"),
			content: /* @__PURE__ */ (0, $.jsx)(wc, { receipt: t })
		},
		{
			id: "library-task-speed",
			label: J("settings:taskSpeed.title"),
			content: /* @__PURE__ */ (0, $.jsx)(gc, { receipt: t })
		}
	] });
}
function Zc({ data: e, receipt: t }) {
	let { checked: n, checkFailed: r } = qr(), { rows: i, edit: a, add: o, remove: s, errors: c, setErrors: l, picking: u, pick: d, inputRef: f } = ci({
		initial: () => Jc(e),
		blank: () => qc(),
		pickFolder: Wc,
		describe: K
	}), [p, h] = (0, Z.useState)(!1), g = X({
		queryKey: Me,
		queryFn: ({ signal: e }) => nn(e)
	}, Xn).data?.metadata_only === !0, [_, v] = (0, Z.useState)(!1), [y, x] = (0, Z.useState)(""), [S, C] = (0, Z.useState)({}), [w, T] = (0, Z.useState)(null), E = (0, Z.useRef)(e.revision), D = (0, Z.useRef)(!1), O = Y();
	jr();
	let ee = (e, t) => {
		i.forEach((n, r) => {
			n.library_id === i[e].library_id && a(r, t);
		});
	}, A = Ir([...i.reduce((e, t) => e.has(t.library_id) ? e : e.set(t.library_id, t), /* @__PURE__ */ new Map()).values()], (e) => e.library_id), [te, ne] = (0, Z.useState)(null);
	(0, Z.useEffect)(() => {
		if (!te) return;
		let e = document.querySelector(`[data-library-key="${CSS.escape(te)}"] [data-library-head] input`);
		e?.scrollIntoView({ block: "center" }), e?.focus(), ne(null);
	}, [te]);
	let re = (e, t) => {
		let n = i.find((e) => e.library_id === t);
		if (n) {
			a(e, Gc(n));
			return;
		}
		let r = Zn();
		a(e, {
			library_id: r,
			library: "",
			library_icon: "",
			library_color: "",
			library_policy: "auto",
			library_stages: ""
		}), ne(r);
	};
	(0, Z.useEffect)(() => {
		if (!w) return;
		let e = setTimeout(() => location.assign(w.url), ec);
		return () => clearTimeout(e);
	}, [w]);
	let ie = (e) => {
		e.preventDefault();
		let t = i.findIndex((e) => !e.cost);
		if (t >= 0) {
			v(!0);
			let n = e.currentTarget;
			requestAnimationFrame(() => n.querySelector(`[data-media-read-policy="${t}"] button`)?.focus());
		} else O.busy || D.current || (x(""), D.current = !0, Bc(p).then((e) => {
			D.current = !1, e && se();
		}));
	}, ae = (t) => e.media_sources?.find((e) => e.root_id === t.root_id && e.path === t.path), oe = (e) => {
		let t = e.transport === "smb" ? ae(e) : void 0;
		return t?.smb_username || t?.smb_password_saved ? t : void 0;
	}, se = () => {
		O.run("save", (t) => U(b, {
			revision: E.current,
			media_dirs: i.map((e) => e.path),
			...e.media_sources ? { media_sources: i.map((e) => e.smb_clear && !oe(e) ? {
				...e,
				smb_clear: !1
			} : e) } : {},
			port: String(e.port),
			scan_now: p
		}, "POST", t), (e) => {
			E.current = e.revision, l([]), t(J("settings:shared.settingsSaved")), T(e);
		}, (e) => {
			let t = Yc(e);
			l(t?.media_dirs ?? []), (!t || t.port) && x(t?.port || K(e));
		});
	};
	if (w) return /* @__PURE__ */ (0, $.jsx)(R, {
		guide: "media",
		title: J("settings:libraryFolders.title"),
		children: /* @__PURE__ */ (0, $.jsx)(B, { children: /* @__PURE__ */ (0, $.jsxs)(I, {
			tone: "success",
			title: J("settings:shared.configSaved"),
			children: [
				J("settings:mediaLibraries.restartingRedirect"),
				/* @__PURE__ */ (0, $.jsx)(ke, {
					href: w.url,
					size: "small",
					children: J("settings:mediaLibraries.goToCollection")
				}),
				J("shell:format.period")
			]
		}) })
	});
	let ce = i.some((e) => oi(e.location)), le = ce ? (e.mount_dependencies ?? []).filter((e) => !e.available) : [];
	return /* @__PURE__ */ (0, $.jsxs)(R, {
		guide: "media",
		title: J("settings:libraryFolders.title"),
		onSubmit: ie,
		children: [/* @__PURE__ */ (0, $.jsxs)(B, { children: [
			/* @__PURE__ */ (0, $.jsx)(Mc, {}),
			/* @__PURE__ */ (0, $.jsx)("div", {
				role: "group",
				"aria-label": J("settings:libraryFolders.title"),
				className: "flex flex-col gap-4",
				children: A.map((e) => {
					let t = i.findIndex((t) => t.library_id === e.library_id), l = i.map((e, t) => ({
						row: e,
						index: t
					})).filter(({ row: t }) => t.library_id === e.library_id), p = e.library_policy, h = e.library || J("settings:mediaLibraries.untitled");
					return /* @__PURE__ */ (0, $.jsxs)("div", {
						"data-library-block": "",
						"data-library-key": e.library_id,
						className: zt({
							variant: "raised",
							padding: "none",
							className: "flex flex-col p-2"
						}),
						"data-library": e.library_color ? e.library_id : void 0,
						children: [
							/* @__PURE__ */ (0, $.jsxs)("div", {
								"data-library-head": "",
								children: [
									/* @__PURE__ */ (0, $.jsx)(Oc, {
										label: J("settings:mediaLibraries.iconLabel", { name: h }),
										value: e.library_icon,
										kind: e.transport === "smb" ? "smb" : e.location,
										onChange: (e) => ee(t, { library_icon: e })
									}),
									/* @__PURE__ */ (0, $.jsx)(F, {
										className: "w-full",
										"aria-label": J("settings:mediaLibraries.nameLabel", { name: h }),
										maxLength: 80,
										placeholder: J("settings:mediaLibraries.namePlaceholder"),
										value: e.library,
										onChange: (e) => ee(t, { library: e })
									}),
									/* @__PURE__ */ (0, $.jsx)(Fc, {
										id: e.library_id,
										name: e.library,
										value: e.library_color,
										onChange: (e) => ee(t, { library_color: e })
									}),
									/* @__PURE__ */ (0, $.jsx)(Nc, {
										name: h,
										value: p,
										onChange: (n) => ee(t, {
											library_policy: n,
											library_stages: n === "custom" ? e.library_stages || Ac.join(",") : ""
										})
									})
								]
							}),
							p === "custom" ? /* @__PURE__ */ (0, $.jsx)(Pc, {
								name: h,
								value: Kc(e),
								previewsOff: g,
								onChange: (e) => ee(t, { library_stages: Ac.filter((t) => e.includes(t)).join(",") })
							}) : null,
							/* @__PURE__ */ (0, $.jsxs)("div", {
								"data-library-folders": "",
								role: "group",
								"aria-label": J("settings:mediaLibraries.directoriesLabel", { name: h }),
								children: [l.map(({ row: t, index: o }) => {
									let p = oe(t), g = !!(p && t.smb_clear);
									return /* @__PURE__ */ (0, $.jsxs)(ti, {
										label: J("settings:mediaLibraries.directoryLabel", { index: o + 1 }),
										path: t.path,
										onPath: (e) => a(o, {
											path: e,
											transport: e.startsWith("smb://") ? "smb" : t.transport,
											smb_clear: !1
										}),
										error: c[o],
										inputRef: f(o),
										picking: u === o,
										onPick: () => void d(o),
										onRemove: i.length > 1 ? () => s(o) : void 0,
										status: ae(t) ? /* @__PURE__ */ (0, $.jsx)(Qc, { online: ae(t)?.online }) : null,
										children: [/* @__PURE__ */ (0, $.jsxs)(ei, { children: [
											/* @__PURE__ */ (0, $.jsx)(ai, {
												index: o,
												value: t.transport === "smb" ? "smb" : t.location,
												options: Hc,
												onChange: (e) => {
													let n = e === "smb";
													a(o, {
														transport: n ? "smb" : "filesystem",
														location: n ? "local" : e,
														cost: n || e === "local" ? "free" : "",
														smb_clear: !1,
														path: n ? t.path.startsWith("smb://") ? t.path : "smb://" : t.path.startsWith("smb://") ? "" : t.path
													}), C((e) => {
														let t = { ...e };
														return delete t[o], t;
													});
												}
											}),
											/* @__PURE__ */ (0, $.jsx)(ri, {
												index: o,
												cost: t.cost,
												onChange: (e) => a(o, { cost: e }),
												error: _ && !t.cost ? J("settings:mediaLibraries.readPolicyRequired") : void 0
											}),
											t.root_id && !ae(t) ? /* @__PURE__ */ (0, $.jsx)($r, {
												label: J("settings:mediaLibraries.changeType"),
												className: "w-full @lg:w-auto @lg:flex-1",
												children: /* @__PURE__ */ (0, $.jsxs)(ct, {
													className: "w-full",
													"aria-label": J("settings:mediaLibraries.changeTypeLabel", { index: o + 1 }),
													placeholder: J("settings:mediaLibraries.changeTypePlaceholder"),
													selectedKey: t.change_mode || null,
													onSelectionChange: (e) => {
														e === "add" ? a(o, {
															root_id: void 0,
															root: "",
															change_mode: ""
														}) : a(o, { change_mode: "relocate" });
													},
													children: [/* @__PURE__ */ (0, $.jsx)(ut, {
														id: "relocate",
														glyph: "folder-sync",
														children: J("settings:mediaLibraries.relocate")
													}), /* @__PURE__ */ (0, $.jsx)(ut, {
														id: "add",
														glyph: "plus",
														children: J("settings:mediaLibraries.addAnother")
													})]
												})
											}) : null,
											A.length > 1 ? /* @__PURE__ */ (0, $.jsx)($r, {
												label: J("settings:mediaLibraries.moveTo"),
												className: "w-full @lg:w-48",
												children: /* @__PURE__ */ (0, $.jsxs)(ct, {
													className: "w-full",
													"aria-label": J("settings:mediaLibraries.moveToLabel", { index: o + 1 }),
													selectedKey: t.library_id,
													renderValue: /* @__PURE__ */ (0, $.jsxs)("span", {
														className: "flex min-w-0 items-center gap-2",
														children: [/* @__PURE__ */ (0, $.jsx)(bt, { mark: Uc(e) }), /* @__PURE__ */ (0, $.jsx)("span", {
															className: "truncate",
															children: h
														})]
													}),
													onSelectionChange: (e) => {
														e && re(o, String(e));
													},
													children: [A.map((e) => /* @__PURE__ */ (0, $.jsx)(ut, {
														id: e.library_id,
														textValue: e.library || J("settings:mediaLibraries.untitled"),
														children: /* @__PURE__ */ (0, $.jsxs)("span", {
															className: "flex min-w-0 items-center gap-2",
															children: [/* @__PURE__ */ (0, $.jsx)(bt, { mark: Uc(e) }), /* @__PURE__ */ (0, $.jsx)("span", {
																className: "truncate",
																children: e.library || J("settings:mediaLibraries.untitled")
															})]
														})
													}, e.library_id)), l.length > 1 ? /* @__PURE__ */ (0, $.jsx)(ut, {
														id: "new",
														textValue: J("settings:mediaLibraries.newLibrary"),
														children: /* @__PURE__ */ (0, $.jsxs)("span", {
															className: "flex min-w-0 items-center gap-2",
															children: [/* @__PURE__ */ (0, $.jsx)(bt, { mark: "plus" }), /* @__PURE__ */ (0, $.jsx)("span", { children: J("settings:mediaLibraries.newLibrary") })]
														})
													}) : null]
												})
											}) : null
										] }), t.transport === "smb" ? /* @__PURE__ */ (0, $.jsxs)("div", {
											className: "flex w-full flex-col gap-2",
											children: [
												/* @__PURE__ */ (0, $.jsxs)(ei, { children: [/* @__PURE__ */ (0, $.jsx)($r, {
													label: J("settings:smbShare.account"),
													className: "w-full @lg:flex-1",
													children: /* @__PURE__ */ (0, $.jsx)(F, {
														"aria-label": J("settings:smbShare.accountLabel", { index: o + 1 }),
														value: t.smb_username || "",
														autoComplete: "off",
														isDisabled: g,
														onChange: (e) => a(o, { smb_username: e })
													})
												}), /* @__PURE__ */ (0, $.jsx)($r, {
													label: J("settings:smbShare.password"),
													className: "w-full @lg:flex-1",
													children: /* @__PURE__ */ (0, $.jsx)(F, {
														"aria-label": J("settings:smbShare.passwordLabel", { index: o + 1 }),
														type: "password",
														value: t.smb_password || "",
														autoComplete: "new-password",
														placeholder: p?.smb_password_saved ? J("settings:smbShare.keepPassword") : "",
														isDisabled: g,
														onChange: (e) => a(o, { smb_password: e })
													})
												})] }),
												p ? /* @__PURE__ */ (0, $.jsx)(k, {
													isSelected: g,
													onChange: (e) => a(o, { smb_clear: e }),
													children: J("settings:smbShare.removeAccount")
												}) : null,
												/* @__PURE__ */ (0, $.jsxs)("div", {
													className: "flex flex-wrap items-center justify-between gap-3",
													children: [/* @__PURE__ */ (0, $.jsx)(V, {
														"data-smb-encryption": "",
														isSelected: t.smb_encrypt || !1,
														isDisabled: g,
														onChange: (e) => a(o, { smb_encrypt: e }),
														children: J("settings:smbShare.requireEncryption")
													}), /* @__PURE__ */ (0, $.jsx)(m, {
														className: "ml-auto",
														variant: "secondary",
														...W(O.busy === `smb-${o}`),
														onClick: () => void O.run(`smb-${o}`, (e) => U("/api/configuration/smb/test", t, "POST", e), (e) => {
															let t = J("settings:smbShare.readable");
															C((n) => ({
																...n,
																[o]: {
																	message: t,
																	directories: e.directories
																}
															})), n(t);
														}, (e) => {
															let t = K(e);
															C((e) => ({
																...e,
																[o]: {
																	message: t,
																	directories: []
																}
															})), r(J("settings:connectionCheck.action", { service: "SMB" }), t);
														}),
														children: J("settings:smbShare.testConnection")
													})]
												}),
												S[o] ? /* @__PURE__ */ (0, $.jsx)(P, { children: S[o].message }) : null,
												S[o]?.directories.length ? /* @__PURE__ */ (0, $.jsx)(ct, {
													"aria-label": J("settings:smbShare.subdirectoryLabel", { index: o + 1 }),
													placeholder: J("settings:smbShare.openSubdirectory"),
													selectedKey: null,
													onSelectionChange: (e) => {
														e && (a(o, {
															path: t.path.replace(/\/$/, "") + "/" + encodeURIComponent(String(e)),
															smb_clear: !1
														}), C((e) => ({
															...e,
															[o]: {
																message: J("settings:smbShare.testSubdirectory"),
																directories: []
															}
														})));
													},
													children: S[o].directories.map((e) => /* @__PURE__ */ (0, $.jsx)(ut, {
														id: e,
														glyph: "folder-open",
														children: e
													}, e))
												}) : null,
												/* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:smbShare.help") })
											]
										}) : null]
									}, o);
								}), /* @__PURE__ */ (0, $.jsx)("div", {
									className: "flex",
									children: /* @__PURE__ */ (0, $.jsx)(m, {
										variant: "secondary",
										"aria-label": J("settings:mediaLibraries.addDirectoryLabel", { name: h }),
										onClick: () => {
											o(), a(i.length, {
												...Gc(e),
												location: e.location,
												cost: e.cost
											});
										},
										children: J("settings:mediaLibraries.addDirectory")
									})
								})]
							})
						]
					}, e.library_id);
				})
			}),
			/* @__PURE__ */ (0, $.jsx)(m, {
				variant: "secondary",
				className: "self-start",
				onClick: o,
				children: J("settings:mediaLibraries.addLibrary")
			}),
			/* @__PURE__ */ (0, $.jsx)(P, { children: Ce }),
			ce ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)(ii, {}), /* @__PURE__ */ (0, $.jsx)(rc, {})] }) : null,
			le.map((e) => /* @__PURE__ */ (0, $.jsxs)(P, { children: [
				J("settings:mediaLibraries.dependencyMissingName", { name: e.name }),
				J("shell:format.sentenceGap"),
				/* @__PURE__ */ (0, $.jsxs)(he, {
					href: e.download_url,
					children: [
						J("settings:shared.download"),
						" ",
						e.name
					]
				})
			] }, e.name)),
			/* @__PURE__ */ (0, $.jsx)(k, {
				isSelected: p,
				onChange: h,
				children: J("settings:mediaLibraries.scanAfterSave")
			}),
			y ? /* @__PURE__ */ (0, $.jsx)(I, {
				tone: "error",
				title: J("settings:shared.notSaved"),
				children: y
			}) : null
		] }), /* @__PURE__ */ (0, $.jsx)(N, {
			status: J("settings:libraryFolders.restartNotice"),
			children: /* @__PURE__ */ (0, $.jsx)(m, {
				type: "submit",
				...W(O.busy === "save"),
				children: J("settings:shared.saveSettings")
			})
		})]
	});
}
function Qc({ online: e }) {
	return /* @__PURE__ */ (0, $.jsx)(Jr, { online: e });
}
function $c({ data: e }) {
	let t = e.media_sources, n = Y(), { checked: r, checkFailed: i } = qr();
	return t ? /* @__PURE__ */ (0, $.jsxs)(R, {
		guide: "mounts",
		title: J("settings:mountStatus.title"),
		children: [
			/* @__PURE__ */ (0, $.jsx)(ye, { children: t.map((e, t) => /* @__PURE__ */ (0, $.jsxs)(M, {
				term: /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)(bt, { mark: si(e.location) }), Vc(e.location)] }),
				children: [e.path || J("settings:mountStatus.notConfigured"), /* @__PURE__ */ (0, $.jsx)(Qc, { online: e.online })]
			}, t)) }),
			n.error ? /* @__PURE__ */ (0, $.jsx)(B, {
				divided: !0,
				children: /* @__PURE__ */ (0, $.jsx)(j, { children: n.error })
			}) : null,
			/* @__PURE__ */ (0, $.jsx)(N, { children: /* @__PURE__ */ (0, $.jsx)(m, {
				variant: "secondary",
				onClick: () => void n.run("refresh", (e) => $t(e), (e) => {
					Xn.setQueryData(v, e), !e.section_errors?.media_sources && e.media_sources ? r(J("settings:mountStatus.refreshed")) : i(J("settings:mountStatus.refresh"), e.section_errors?.media_sources?.message || J("settings:shared.notFound"));
				}, (e) => {
					let t = K(e);
					n.setError(t), i(J("settings:mountStatus.refresh"), t);
				}),
				...W(n.busy === "refresh"),
				children: J("settings:mountStatus.refresh")
			}) })
		]
	}) : null;
}
// src/react/settings/password-pair.tsx
function el({ label: e, password: t, confirmation: n, onPassword: r, onConfirmation: i, disabled: a = !1, passwordError: o, passwordHint: s, confirmationError: c, confirmationInvalid: l = !1 }) {
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)(F, {
		id: "access-password",
		type: "password",
		label: e,
		autoComplete: "new-password",
		maxLength: 256,
		value: t,
		onChange: r,
		isDisabled: a,
		isRequired: !a,
		validationBehavior: "aria",
		isInvalid: !a && !!o,
		hint: a ? s : o || s
	}), /* @__PURE__ */ (0, $.jsx)(F, {
		id: "access-confirm",
		type: "password",
		label: J("settings:accessPassword.confirm"),
		autoComplete: "new-password",
		maxLength: 256,
		value: n,
		onChange: i,
		isDisabled: a,
		isRequired: !a,
		validationBehavior: "aria",
		isInvalid: !a && (!!c || l),
		hint: a ? void 0 : c
	})] });
}
// src/react/settings/access-settings.tsx
var tl = {
	legacy: J("settings:accessPassword.legacyHelp"),
	locked: J("settings:accessPassword.lockedHelp"),
	password: J("settings:accessPassword.passwordHelp")
};
function nl({ initial: e, receipt: t, onSaved: n }) {
	let [r, i] = (0, Z.useState)(e), [a, o] = (0, Z.useState)(""), [s, c] = (0, Z.useState)(""), [l, u] = (0, Z.useState)(""), [d, f] = (0, Z.useState)(!1), [h, g] = (0, Z.useState)({}), _ = (0, Z.useRef)(null), v = Y(), y = (e) => {
		e.preventDefault();
		let m = {};
		r.mode === "password" && !a && (m.current_password = J("settings:accessPassword.enterCurrent")), d || ((s.length < 8 || s.length > 256) && (m.password = J("settings:accessPassword.lengthError")), s !== l && (m.confirmation = J("settings:accessPassword.mismatch"))), g(m), Object.keys(m).length ? requestAnimationFrame(() => _.current?.querySelector("input[aria-invalid=\"true\"]")?.focus()) : v.run("save", (e) => U("/api/configuration/access", {
			revision: r.revision,
			action: d ? "disable" : "set",
			confirm_disable: d,
			current_password: a,
			password: d ? "" : s,
			confirmation: d ? "" : l
		}, "POST", e), (e) => {
			i(e), o(""), c(""), u(""), f(!1), g({}), n?.(e), t(e.mode === "open" ? J("settings:accessPassword.turnedOff") : J("settings:shared.settingsSaved"));
		}, (e) => {
			let t = e instanceof p ? e.body : null, n = Lt(t) || Lt(t?.detail);
			n ? g(n) : v.setError(K(e));
		});
	}, b = tl[r.mode], x = r.mode !== "locked";
	return /* @__PURE__ */ (0, $.jsxs)(R, {
		guide: "access",
		title: J("settings:accessPassword.title"),
		onSubmit: y,
		children: [/* @__PURE__ */ (0, $.jsx)("div", {
			ref: _,
			children: /* @__PURE__ */ (0, $.jsxs)(B, { children: [
				b ? /* @__PURE__ */ (0, $.jsx)(P, { children: b }) : null,
				r.mode === "open" ? /* @__PURE__ */ (0, $.jsx)(I, {
					tone: "warning",
					title: J("settings:accessPassword.notSet"),
					children: J("settings:accessPassword.openWarning")
				}) : null,
				r.mode === "password" || r.mode === "legacy" ? /* @__PURE__ */ (0, $.jsx)(k, {
					isSelected: d,
					onChange: f,
					children: J("settings:accessPassword.turnOff")
				}) : null,
				r.mode === "password" ? /* @__PURE__ */ (0, $.jsx)(F, {
					id: "access-current",
					type: "password",
					label: J("settings:accessPassword.current"),
					autoComplete: "current-password",
					maxLength: 256,
					value: a,
					onChange: o,
					isRequired: !0,
					validationBehavior: "aria",
					isInvalid: !!h.current_password,
					hint: h.current_password
				}) : null,
				x && !d ? /* @__PURE__ */ (0, $.jsx)(el, {
					label: r.mode === "password" ? J("settings:accessPassword.new") : J("settings:accessPassword.set"),
					password: s,
					confirmation: l,
					onPassword: c,
					onConfirmation: u,
					passwordError: h.password,
					confirmationError: h.confirmation,
					passwordHint: J("settings:accessPassword.newHelp")
				}) : null,
				d ? /* @__PURE__ */ (0, $.jsx)(I, {
					tone: "warning",
					title: J("settings:accessPassword.scope"),
					children: J("settings:accessPassword.disableWarning")
				}) : null,
				v.error ? /* @__PURE__ */ (0, $.jsx)(j, { children: v.error }) : null
			] })
		}), x ? /* @__PURE__ */ (0, $.jsx)(N, { children: /* @__PURE__ */ (0, $.jsx)(m, {
			type: "submit",
			...W(v.busy === "save"),
			children: J("settings:shared.saveSettings")
		}) }) : null]
	});
}
// src/react/settings/api-token-settings.tsx
var rl = "/api/configuration/access/token/rotate";
function il(e, t) {
	let n = J("settings:accessToken.scriptsInvalidated"), r = J(e === "legacy" ? "settings:accessToken.rotateEffectLegacy" : e === "open" ? "settings:accessToken.rotateEffectOpen" : "settings:accessToken.rotateEffectPassword", { scripts: n });
	return t ? J("settings:accessToken.rotateEffectPaired", { sentence: r }) : r;
}
function al({ initial: e, mode: t, receipt: n }) {
	let [r, i] = (0, Z.useState)(e), [a, o] = (0, Z.useState)(null), s = Y(), c = Rr();
	return /* @__PURE__ */ (0, $.jsxs)(R, {
		title: J("settings:accessToken.title"),
		children: [/* @__PURE__ */ (0, $.jsxs)(B, { children: [
			/* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:accessToken.help") }),
			a ? /* @__PURE__ */ (0, $.jsxs)("div", {
				className: "flex min-w-0 flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, $.jsxs)("div", {
						className: "flex min-w-0 flex-wrap items-end gap-2",
						children: [/* @__PURE__ */ (0, $.jsx)(F, {
							className: "min-w-0 flex-1",
							label: J("settings:accessToken.newToken"),
							value: a.token,
							isReadOnly: !0,
							autoComplete: "off"
						}), /* @__PURE__ */ (0, $.jsx)(m, {
							variant: "secondary",
							"aria-label": J("settings:accessToken.copyNew"),
							onClick: () => void s.run("copy", () => navigator.clipboard.writeText(a.token), () => n(J("settings:accessToken.copied"))),
							children: J("settings:accessToken.copy")
						})]
					}),
					s.error ? /* @__PURE__ */ (0, $.jsx)(P, {
						role: "status",
						children: J("settings:accessToken.copyFailed")
					}) : null,
					/* @__PURE__ */ (0, $.jsx)(I, {
						tone: "info",
						title: J("settings:accessToken.shownOnce"),
						children: J("settings:accessToken.shownOnceHelp")
					})
				]
			}) : null,
			a?.relogin ? /* @__PURE__ */ (0, $.jsx)(I, {
				tone: "warning",
				title: J("settings:accessToken.reloginTitle"),
				children: J("settings:accessToken.reloginHelp")
			}) : null,
			r.rotatable ? null : /* @__PURE__ */ (0, $.jsx)(P, { children: r.reason })
		] }), r.rotatable ? /* @__PURE__ */ (0, $.jsx)(N, {
			status: J("settings:accessToken.immediate"),
			children: /* @__PURE__ */ (0, $.jsx)(m, {
				variant: "secondary",
				onClick: () => void Gt({
					title: J("settings:accessToken.rotateTitle"),
					body: il(t, r.paired),
					confirmLabel: J("settings:accessToken.rotate"),
					onConfirm: async () => {
						let e = await U(rl, {});
						i(e), o(e), e.mode === "legacy" && c.invalidateQueries({ queryKey: ["access-sessions"] }), n(e.signed_out ? J("settings:accessToken.rotatedSignedOut", { count: e.signed_out }) : J("settings:accessToken.rotated"));
					}
				}),
				children: J("settings:accessToken.rotate")
			})
		}) : null]
	});
}
// src/react/settings/certificate-trust.tsx
function ol({ rows: e, label: t }) {
	let n = e.length + 8, r = e.flatMap((e, t) => [...e].flatMap((e, n) => e === "1" ? [`M${n + 4} ${t + 4}h1v1h-1z`] : [])).join("");
	return /* @__PURE__ */ (0, $.jsx)("svg", {
		role: "img",
		"aria-label": t,
		viewBox: `0 0 ${n} ${n}`,
		shapeRendering: "crispEdges",
		className: "size-40 shrink-0 rounded-lg bg-white text-black",
		children: /* @__PURE__ */ (0, $.jsx)("path", {
			d: r,
			fill: "currentColor"
		})
	});
}
var sl = [
	[J("settings:certificateTrust.iosDevices"), J("settings:certificateTrust.iosSteps")],
	["Android", J("settings:certificateTrust.androidSteps")],
	[J("settings:certificateTrust.computer"), J("settings:certificateTrust.computerSteps")]
];
function cl({ initial: e }) {
	let t = Math.max(60, e.expires_in - 60) * 1e3, n = X({
		queryKey: ["ca-certificate"],
		initialData: e,
		queryFn: ({ signal: e }) => H("/api/configuration/certificate", e),
		staleTime: t,
		refetchInterval: t,
		refetchOnMount: !0,
		refetchOnWindowFocus: !0
	}), r = n.data, i = n.isError, a = r.fingerprint.split(":"), o = [
		0,
		8,
		16,
		24
	].map((e) => a.slice(e, e + 8).join(":"));
	return /* @__PURE__ */ (0, $.jsxs)(R, {
		title: J("settings:certificateTrust.title"),
		children: [
			/* @__PURE__ */ (0, $.jsxs)(B, { children: [/* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:certificateTrust.help") }), /* @__PURE__ */ (0, $.jsxs)("div", {
				className: "flex min-w-0 flex-wrap items-start gap-4",
				children: [i ? /* @__PURE__ */ (0, $.jsx)(I, {
					tone: "error",
					title: /* @__PURE__ */ (0, $.jsx)("span", {
						"data-copy-key": "settings.certificateTrust.qrRefreshFailed",
						children: J("settings:certificateTrust.qrRefreshFailed")
					}),
					action: /* @__PURE__ */ (0, $.jsx)(m, {
						size: "small",
						variant: "secondary",
						disabled: n.isFetching,
						onClick: () => void n.refetch(),
						children: /* @__PURE__ */ (0, $.jsx)("span", {
							"data-copy-key": "settings.certificateTrust.qrRetry",
							children: J("settings:certificateTrust.qrRetry")
						})
					}),
					children: K(n.error)
				}) : n.isStale ? /* @__PURE__ */ (0, $.jsx)(P, {
					role: "status",
					children: J("settings:certificateTrust.qrRefreshing")
				}) : /* @__PURE__ */ (0, $.jsx)(ol, {
					rows: r.qr,
					label: J("settings:certificateTrust.qrLabel")
				}), /* @__PURE__ */ (0, $.jsxs)("div", {
					className: "flex min-w-0 flex-1 basis-64 flex-col gap-2",
					children: [/* @__PURE__ */ (0, $.jsxs)(ye, { children: [/* @__PURE__ */ (0, $.jsx)(M, {
						term: J("settings:certificateTrust.fingerprint"),
						children: /* @__PURE__ */ (0, $.jsx)("span", {
							className: "flex max-w-sm flex-wrap justify-end gap-x-2 font-mono text-caption-1-regular",
							children: o.map((e, t) => /* @__PURE__ */ (0, $.jsx)("span", {
								className: "whitespace-nowrap",
								children: e
							}, t))
						})
					}), /* @__PURE__ */ (0, $.jsx)(M, {
						term: J("settings:certificateTrust.validUntil"),
						children: r.not_after
					})] }), !i && !n.isStale ? /* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:certificateTrust.qrHelp") }) : null]
				})]
			})] }),
			/* @__PURE__ */ (0, $.jsx)(L, { children: sl.map(([e, t]) => /* @__PURE__ */ (0, $.jsx)(z, {
				label: e,
				description: t
			}, e)) }),
			/* @__PURE__ */ (0, $.jsx)(B, {
				divided: !0,
				children: /* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:certificateTrust.verifyHelp") })
			}),
			/* @__PURE__ */ (0, $.jsx)(N, { children: /* @__PURE__ */ (0, $.jsx)(h, {
				href: r.download,
				download: "peach-local-ca.crt",
				leadingIcon: Wr,
				children: J("settings:certificateTrust.download")
			}) })
		]
	});
}
// src/react/settings/device-sessions.tsx
var ll = "/api/configuration/access/sessions", ul = (e) => e.device || J("settings:deviceSessions.unknownBrowser"), dl = {
	glyph: Se,
	brand: "apple"
}, fl = {
	glyph: Fn,
	brand: "android"
}, pl = {
	iPhone: {
		platform: dl,
		terminal: jt
	},
	iPad: {
		platform: dl,
		terminal: pe
	},
	Android: {
		platform: fl,
		terminal: jt
	},
	"Android tablet": {
		platform: fl,
		terminal: pe,
		label: () => J("settings:deviceSessions.androidTablet")
	},
	ChromeOS: {
		platform: { browser: "chrome" },
		terminal: Kr
	},
	Windows: {
		platform: {
			glyph: Ot,
			brand: "windows"
		},
		terminal: Kr
	},
	macOS: {
		platform: dl,
		terminal: Kr
	},
	Linux: { terminal: Kr }
}, ml = "inline size-4 -mt-0.5 mr-1 align-middle";
function hl({ platform: e }) {
	if ("browser" in e) return /* @__PURE__ */ (0, $.jsx)(li, {
		name: e.browser,
		className: ml
	});
	let { glyph: t, brand: n } = e;
	return /* @__PURE__ */ (0, $.jsx)(t, {
		"aria-hidden": !0,
		"data-platform-mark": n,
		className: ml
	});
}
function gl({ row: e }) {
	if (!e.device) return ul(e);
	let t = e.device.split(" · "), n = pl[t.at(-1) ?? ""] ? t.pop() : "", r = t.join(" · "), i = n ? pl[n].platform : void 0;
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
		r ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [ui(r) ? /* @__PURE__ */ (0, $.jsx)(li, {
			name: r,
			className: ml
		}) : null, r] }) : null,
		r && n ? " · " : null,
		n ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [i ? /* @__PURE__ */ (0, $.jsx)(hl, { platform: i }) : null, pl[n].label?.() ?? n] }) : null
	] });
}
function _l({ row: e }) {
	let t = pl[e.device.split(" · ").at(-1) ?? ""]?.terminal ?? Xt;
	return /* @__PURE__ */ (0, $.jsx)(t, {
		"aria-hidden": !0,
		className: "size-5 shrink-0 text-foreground-icon-secondary"
	});
}
function vl({ row: e, children: t }) {
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		className: "flex min-h-13 w-full items-center justify-between gap-4 border-b border-separator-border py-2.5 pr-2.5 last:border-b-0",
		children: [/* @__PURE__ */ (0, $.jsxs)("div", {
			className: "flex min-w-0 items-center gap-3",
			children: [/* @__PURE__ */ (0, $.jsx)(_l, { row: e }), /* @__PURE__ */ (0, $.jsxs)("div", {
				className: "flex min-w-0 flex-col",
				children: [/* @__PURE__ */ (0, $.jsx)("p", {
					className: "text-body-regular text-text-primary",
					children: /* @__PURE__ */ (0, $.jsx)(gl, { row: e })
				}), /* @__PURE__ */ (0, $.jsx)("p", {
					className: "text-body-2-regular text-text-secondary",
					children: xl(e)
				})]
			})]
		}), t]
	});
}
function yl(e, t = Date.now() / 1e3) {
	let n = Math.max(0, t - e);
	return n < 60 ? J("settings:deviceSessions.justNow") : n < 3600 ? J("settings:deviceSessions.minutesAgo", { count: Math.floor(n / 60) }) : n < 86400 ? J("settings:deviceSessions.hoursAgo", { count: Math.floor(n / 3600) }) : n < 2592e3 ? J("settings:deviceSessions.daysAgo", { count: Math.floor(n / 86400) }) : (/* @__PURE__ */ new Date(e * 1e3)).toLocaleDateString(Dn);
}
function bl(e) {
	return e.network === "loopback" ? J("settings:deviceSessions.loopback") : e.network ? e.remote ? J("settings:deviceSessions.viaRemoteAccess", { network: e.network }) : e.network : "";
}
var xl = (e) => [J("settings:deviceSessions.lastActive", { time: yl(e.last_seen) }), bl(e)].filter(Boolean).join(" · ");
function Sl({ revision: e, receipt: t }) {
	let n = X({
		queryKey: ["access-sessions", e],
		refetchOnMount: "always",
		queryFn: ({ signal: e }) => H(ll, e)
	});
	return n.error ? /* @__PURE__ */ (0, $.jsx)(R, {
		title: J("settings:signedInDevices.title"),
		children: /* @__PURE__ */ (0, $.jsx)(B, { children: /* @__PURE__ */ (0, $.jsx)(qe, {
			titleKey: "settings:deviceSessions.loadFailed",
			query: n
		}) })
	}) : n.isFetching || !n.data ? /* @__PURE__ */ (0, $.jsx)(it, {
		label: J("settings:deviceSessions.loading"),
		html: Zt
	}) : /* @__PURE__ */ (0, $.jsx)(Cl, {
		initial: n.data,
		receipt: t
	});
}
function Cl({ initial: e, receipt: t }) {
	let [n, r] = (0, Z.useState)(e);
	(0, Z.useEffect)(() => r(e), [e]);
	let i = n.sessions.filter((e) => !e.current);
	(0, Z.useEffect)(() => {
		$n("devices", {
			rows: Math.min(n.sessions.length, 8),
			manageable: n.manageable && i.length > 0
		});
	}, [n, i.length]);
	let a = (e) => void Gt({
		title: J("settings:deviceSessions.revokeTitle"),
		body: J("settings:deviceSessions.revokeBody", {
			device: ul(e),
			details: xl(e)
		}),
		confirmLabel: J("settings:deviceSessions.revokeConfirm"),
		onConfirm: async () => {
			r(await U(`${ll}/revoke`, {
				revision: n.revision,
				id: e.id
			})), t(J("settings:deviceSessions.revoked"));
		}
	});
	return /* @__PURE__ */ (0, $.jsxs)(R, {
		title: J("settings:signedInDevices.title"),
		children: [
			n.sessions.length ? /* @__PURE__ */ (0, $.jsx)(L, { children: n.sessions.map((e) => /* @__PURE__ */ (0, $.jsx)(vl, {
				row: e,
				children: e.current ? /* @__PURE__ */ (0, $.jsx)(A, {
					color: "blue",
					variant: "caption",
					children: J("settings:deviceSessions.thisDevice")
				}) : n.manageable ? /* @__PURE__ */ (0, $.jsx)(m, {
					size: "small",
					variant: "secondary",
					"aria-label": J("settings:deviceSessions.revokeDevice", { device: ul(e) }),
					onClick: () => a(e),
					children: J("settings:deviceSessions.revoke")
				}) : null
			}, e.id)) }) : /* @__PURE__ */ (0, $.jsx)(B, { children: /* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:deviceSessions.empty") }) }),
			!n.manageable && i.length ? /* @__PURE__ */ (0, $.jsx)(B, {
				divided: !0,
				children: /* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:deviceSessions.serverOnly") })
			}) : null,
			n.manageable && i.length ? /* @__PURE__ */ (0, $.jsx)(N, {
				status: J("settings:signedInDevices.passwordChangeNotice"),
				children: /* @__PURE__ */ (0, $.jsx)(m, {
					variant: "secondary",
					onClick: () => void Gt({
						title: J("settings:deviceSessions.revokeOthersTitle"),
						body: J("settings:deviceSessions.revokeOthersBody", { count: i.length }),
						confirmLabel: J("settings:deviceSessions.revokeConfirm"),
						onConfirm: async () => {
							let e = await U(`${ll}/revoke`, {
								revision: n.revision,
								scope: "others"
							});
							r(e), t(J("settings:deviceSessions.revokedCount", { count: e.removed }));
						}
					}),
					children: J("settings:signedInDevices.revokeOthers")
				})
			}) : null
		]
	});
}
// src/react/settings/port-settings.tsx
var wl = [{
	value: "0.0.0.0",
	label: J("settings:accessAddress.lanDevices")
}, {
	value: "127.0.0.1",
	label: J("settings:accessAddress.thisComputerOnly")
}], Tl = (e) => /^\d+$/.test(e.trim()) && Number(e) >= 1 && Number(e) <= 65535 ? "" : q("errors.onboarding.portInvalid", ""), El = (e) => /^[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?$/i.test(e.trim()) ? "" : q("errors.onboarding.mdnsNameInvalid", "");
function Dl({ data: e, receipt: t }) {
	let n = e.network, r = n ? n.editable : e.editable && e.port_editable !== !1, [i, a] = (0, Z.useState)(n?.host ?? "127.0.0.1"), [o, s] = (0, Z.useState)(n?.mdns_name ?? "peach"), [c, l] = (0, Z.useState)(String(e.port)), u = Oa(), d = u.errors, [f, h] = (0, Z.useState)(null), g = Y();
	return (0, Z.useEffect)(() => {
		if (!f) return;
		let e = setTimeout(() => location.assign(f.url), ec);
		return () => clearTimeout(e);
	}, [f]), f ? /* @__PURE__ */ (0, $.jsx)(R, {
		guide: "port",
		title: J("settings:accessUrls.title"),
		children: /* @__PURE__ */ (0, $.jsx)(B, { children: /* @__PURE__ */ (0, $.jsxs)(I, {
			tone: "success",
			title: J("settings:shared.configSaved"),
			children: [J("settings:accessAddress.restarting"), /* @__PURE__ */ (0, $.jsx)(ke, {
				href: f.url,
				size: "small",
				children: J("settings:accessAddress.backToNetwork")
			})]
		}) })
	}) : /* @__PURE__ */ (0, $.jsxs)(R, {
		guide: "port",
		title: J("settings:accessUrls.title"),
		onSubmit: r ? (r) => {
			r.preventDefault();
			let a = r.currentTarget;
			u.check(a, {
				port: Tl(c),
				mdns_name: n?.editable && i === "0.0.0.0" ? El(o) : ""
			}) && g.run("save", (t) => U(b, {
				revision: e.revision,
				media_dirs: e.media_dirs,
				...e.media_sources ? { media_sources: e.media_sources } : {},
				port: c,
				scan_now: !1,
				...n?.editable ? {
					host: i,
					...i === "0.0.0.0" ? { mdns_name: o } : {}
				} : {}
			}, "POST", t), (e) => {
				h({ url: new URL("/settings/network", e.url).href }), t(J("settings:shared.settingsSaved"));
			}, (e) => {
				let t = e instanceof p && e.status === 400 ? Lt(e.body) : null;
				t && (t.port || t.host || t.mdns_name) ? u.check(a, t) : g.setError(K(e));
			});
		} : void 0,
		children: [/* @__PURE__ */ (0, $.jsxs)(B, { children: [
			n ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)(Ol, {
				label: J("settings:accessAddress.localUrl"),
				value: n.local_url,
				receipt: t
			}), n.lan_url || n.ip_url ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
				/* @__PURE__ */ (0, $.jsx)(Ol, {
					label: J("settings:accessAddress.phoneUrl"),
					value: n.lan_url || n.ip_url,
					receipt: t
				}),
				n.lan_url && n.ip_url ? /* @__PURE__ */ (0, $.jsx)(Ol, {
					label: J("settings:accessAddress.alternateIp"),
					value: n.ip_url,
					receipt: t
				}) : null,
				/* @__PURE__ */ (0, $.jsxs)(P, { children: [J("settings:accessAddress.sameWifi"), n.ip_url && n.lan_url ? J("settings:accessAddress.tryIp") : ""] })
			] }) : /* @__PURE__ */ (0, $.jsx)(P, { children: n.scope === "local" ? J("settings:accessAddress.localOnly") : J("settings:accessAddress.lanUnavailable") })] }) : null,
			r ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [n?.editable ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)(ws, {
				id: "configHost",
				label: J("settings:accessAddress.whoCanConnect"),
				value: i,
				onChange: a,
				options: wl,
				isDisabled: !!g.busy,
				isInvalid: !!d.host,
				children: d.host ? /* @__PURE__ */ (0, $.jsx)(j, { children: d.host }) : null
			}), i === "0.0.0.0" ? /* @__PURE__ */ (0, $.jsx)(Ts, {
				id: "configMdnsName",
				"data-settings-field": "mdns_name",
				label: J("settings:accessUrls.lanUrl"),
				value: o,
				onChange: (e) => {
					s(e), u.update("mdns_name");
				},
				onBlur: () => u.update("mdns_name", El(o)),
				prefix: n.local_url.startsWith("https:") ? "https://" : "http://",
				suffix: ".local",
				autoComplete: "off",
				spellCheck: "false",
				maxLength: 63,
				isDisabled: !!g.busy,
				validationBehavior: "aria",
				isInvalid: !!d.mdns_name,
				hint: d.mdns_name || void 0
			}) : null] }) : null, /* @__PURE__ */ (0, $.jsx)(Ts, {
				id: "configPort",
				"data-settings-field": "port",
				label: J("settings:accessUrls.port"),
				prefix: "localhost:",
				inputMode: "numeric",
				value: c,
				onChange: (e) => {
					l(e), u.update("port");
				},
				onBlur: () => u.update("port", Tl(c)),
				isDisabled: !!g.busy,
				validationBehavior: "aria",
				isInvalid: !!d.port,
				hint: d.port
			})] }) : /* @__PURE__ */ (0, $.jsx)(P, { children: e.notice || J("settings:accessAddress.managedByStartup") }),
			n?.editable && i === "0.0.0.0" && n.scope === "local" ? /* @__PURE__ */ (0, $.jsx)(P, { children: J("settings:accessAddress.phoneUrlAfterRestart") }) : null,
			g.error ? /* @__PURE__ */ (0, $.jsx)(I, {
				tone: "error",
				title: J("settings:shared.notSaved"),
				children: g.error
			}) : null
		] }), r ? /* @__PURE__ */ (0, $.jsx)(N, {
			status: J("settings:accessUrls.restartNotice"),
			children: /* @__PURE__ */ (0, $.jsx)(m, {
				type: "submit",
				...W(g.busy === "save"),
				children: J("settings:shared.saveSettings")
			})
		}) : null]
	});
}
function Ol({ label: e, value: t, receipt: n }) {
	let r = Y();
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		className: "flex min-w-0 flex-col gap-2",
		children: [/* @__PURE__ */ (0, $.jsxs)("div", {
			className: "flex min-w-0 flex-wrap items-end gap-2",
			children: [/* @__PURE__ */ (0, $.jsx)(F, {
				className: "min-w-0 flex-1",
				label: e,
				value: t,
				isReadOnly: !0,
				autoComplete: "off"
			}), /* @__PURE__ */ (0, $.jsx)(m, {
				variant: "secondary",
				"aria-label": J("settings:accessAddress.copyLabel", { label: e }),
				onClick: () => void r.run("copy", () => navigator.clipboard.writeText(t), () => n(J("settings:accessAddress.copied"))),
				children: J("settings:accessAddress.copyUrl")
			})]
		}), r.error ? /* @__PURE__ */ (0, $.jsx)(P, {
			role: "status",
			children: J("settings:accessAddress.copyFailed")
		}) : null]
	});
}
// src/react/settings/peach-proxy-fields.tsx
var kl = [
	[
		"environment",
		J("settings:peachProxy.environment"),
		"monitor"
	],
	[
		"direct",
		J("settings:cloudProxy.direct"),
		"globe"
	],
	[
		"proxy",
		J("settings:shared.custom"),
		"settings"
	]
];
function Al({ mode: e, onChange: t, labelledBy: n }) {
	return /* @__PURE__ */ (0, $.jsx)(ct, {
		"aria-label": n ? void 0 : J("settings:peachProxy.mode"),
		"aria-labelledby": n,
		selectedKey: e,
		onSelectionChange: (e) => {
			e !== null && t(String(e));
		},
		children: kl.map(([e, t, n]) => /* @__PURE__ */ (0, $.jsx)(ut, {
			id: e,
			glyph: n,
			children: t
		}, e))
	});
}
function jl({ id: e, value: t, onChange: n, saved: r = !1, required: i, error: a, onBlur: o }) {
	return /* @__PURE__ */ (0, $.jsx)(F, {
		id: e,
		type: "password",
		label: J("settings:peachProxy.url"),
		autoComplete: "off",
		spellCheck: "false",
		"data-settings-field": e,
		value: t,
		onChange: n,
		onBlur: o,
		placeholder: r ? J("settings:peachProxy.savedPlaceholder") : "http://127.0.0.1:7890",
		validationBehavior: "aria",
		isRequired: i,
		isInvalid: !!a,
		hint: a
	});
}
// src/react/settings/tunnel-settings.tsx
var Ml = 2e3, Nl = 3e5, Pl = [["quick", J("settings:cloudflareTunnel.quick")], ["named", J("settings:cloudflareTunnel.named")]], Fl = {
	quick: J("settings:remoteAccess.quickHelp"),
	named: J("settings:remoteAccess.namedHelp")
};
function Il(e, t = !1) {
	if (!e.trim() && !t) return "";
	let n = e.trim().replace(/\.+$/, "").replace(/^https?:\/\//i, "").replace(/\/+$/, "").replace(/\.+$/, "");
	return n ? n.length > 253 || !/^[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?)+$/i.test(n) ? q("errors.tunnel.invalidHostname", "", { value: e }) : "" : q("errors.tunnel.hostnameRequired", "");
}
function Ll({ revision: e, initial: t, receipt: n, blocked: r = !1 }) {
	let [i, a] = (0, Z.useState)(t);
	(0, Z.useEffect)(() => {
		r && a((e) => e.state === "stopped" ? e : {
			...e,
			enabled: !1,
			state: "stopped",
			url: ""
		});
	}, [r]);
	let [s, c] = (0, Z.useState)(e), [l, u] = (0, Z.useState)(t.mode), [d, f] = (0, Z.useState)(t.hostname), [h, g] = (0, Z.useState)(""), _ = Oa(), y = _.errors, b = Y(), x = i.state === "starting" || i.state === "running", S = i.named_available && l === "named";
	(0, Z.useEffect)(() => {
		if (i.state !== "starting") return;
		let e = new AbortController();
		return Kn({
			signal: e.signal,
			everyMs: Ml,
			limitMs: Nl,
			read: (e) => $t(e),
			apply: (e) => {
				e.tunnel && (Xn.setQueryData(v, e), a(e.tunnel), c(e.revision));
			},
			done: (e) => !!e.tunnel && e.tunnel.state !== "starting"
		}), () => e.abort();
	}, [i.state]);
	let C = (e, t, n, r) => {
		_.check(e, {
			hostname: S && !x ? Il(d, n && !i.hostname) : "",
			token: S && n && !x && !i.token_set && !h.trim() ? q("errors.tunnel.tokenRequired", "") : ""
		}) && b.run(t, (e) => U("/api/configuration/tunnel", {
			revision: s,
			enabled: n,
			mode: l,
			hostname: d,
			token: h
		}, "POST", e), (e) => {
			a(e), c(e.revision), u(e.mode), f(e.hostname), g(""), r(e);
		}, (t) => {
			let n = t instanceof p ? t.body : null, r = Lt(n) || Lt(n?.detail);
			r ? _.check(e, r) : b.setError(K(t));
		});
	};
	return /* @__PURE__ */ (0, $.jsxs)(R, {
		id: "tunnel",
		guide: "tunnel",
		title: J("settings:remoteAccess.title"),
		onSubmit: (e) => {
			e.preventDefault(), C(e.currentTarget, "save", x, () => n(J("settings:shared.settingsSaved")));
		},
		aside: /* @__PURE__ */ (0, $.jsx)(xt, {
			tone: i.error ? "error" : x ? "progress" : "neutral",
			children: i.error ? J("settings:cloudflareTunnel.connectionFailed") : i.state === "running" ? J("settings:shared.running") : i.state === "starting" ? J("settings:cloudflareTunnel.connectingStatus") : J("settings:shared.stopped")
		}),
		children: [/* @__PURE__ */ (0, $.jsxs)(B, { children: [
			i.named_available ? /* @__PURE__ */ (0, $.jsx)(st, {
				"aria-label": J("settings:cloudflareTunnel.modeLabel"),
				value: l,
				isDisabled: x || r,
				onChange: (e) => {
					u(e), _.clear();
				},
				className: tt,
				children: Pl.map(([e, t]) => /* @__PURE__ */ (0, $.jsx)(o, {
					value: e,
					className: et,
					children: t
				}, e))
			}) : null,
			/* @__PURE__ */ (0, $.jsx)(P, { children: Fl[S ? "named" : "quick"] }),
			S ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)(F, {
				id: "tunnel-hostname",
				"data-settings-field": "hostname",
				label: J("settings:remoteAccess.hostname"),
				autoComplete: "off",
				maxLength: 253,
				value: d,
				onChange: (e) => {
					f(e), _.update("hostname");
				},
				isDisabled: x || r,
				validationBehavior: "aria",
				onBlur: () => {
					d.trim() && _.update("hostname", Il(d));
				},
				isInvalid: !!y.hostname,
				hint: y.hostname || J("settings:remoteAccess.hostnameHelp")
			}), /* @__PURE__ */ (0, $.jsx)(F, {
				id: "tunnel-token",
				"data-settings-field": "token",
				type: "password",
				label: J("settings:remoteAccess.tunnelToken"),
				autoComplete: "off",
				maxLength: 2048,
				value: h,
				onChange: (e) => {
					g(e), _.update("token");
				},
				isDisabled: x || r,
				validationBehavior: "aria",
				isInvalid: !!y.token,
				hint: y.token || (i.token_set ? J("settings:cloudflareTunnel.tokenSaved") : J("settings:cloudflareTunnel.tokenHint"))
			})] }) : null,
			i.available ? null : /* @__PURE__ */ (0, $.jsx)(I, {
				tone: "warning",
				title: J("settings:cloudflareTunnel.binaryMissing"),
				children: J("settings:cloudflareTunnel.binaryMissingHelp")
			}),
			i.state === "running" && i.url ? /* @__PURE__ */ (0, $.jsx)(I, {
				tone: "info",
				title: J("settings:cloudflareTunnel.publicUrl"),
				children: /* @__PURE__ */ (0, $.jsx)(he, {
					href: i.url,
					children: i.url
				})
			}) : null,
			i.state === "starting" ? /* @__PURE__ */ (0, $.jsx)(I, {
				tone: "info",
				title: J("settings:cloudflareTunnel.connectingTitle"),
				children: J("settings:cloudflareTunnel.connectingHelp")
			}) : null,
			i.error ? /* @__PURE__ */ (0, $.jsx)(j, { children: G(i, "error") }) : null,
			b.error ? /* @__PURE__ */ (0, $.jsx)(j, { children: b.error }) : null
		] }), /* @__PURE__ */ (0, $.jsxs)(N, { children: [/* @__PURE__ */ (0, $.jsx)(m, {
			variant: i.named_available ? "secondary" : "primary",
			onClick: (e) => C(e.currentTarget.form, "toggle", !x, (e) => n(e.enabled ? J("settings:cloudflareTunnel.started") : J("settings:cloudflareTunnel.stopped"))),
			...W(b.busy === "toggle"),
			disabled: r && !x,
			children: J(x ? "settings:cloudflareTunnel.stop" : "settings:remoteAccess.start")
		}), i.named_available ? /* @__PURE__ */ (0, $.jsx)(m, {
			type: "submit",
			...W(b.busy === "save"),
			children: J("settings:shared.saveSettings")
		}) : null] })]
	});
}
// src/react/settings/network-settings.tsx
function Rl({ data: e, receipt: t, issues: n }) {
	let [r, i] = (0, Z.useState)(e.access), a = r?.mode === "open" || r?.mode === "locked";
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [n, /* @__PURE__ */ (0, $.jsx)(ba, { entries: [
		(!!e.network || e.editable && e.port_editable !== !1 && !e.section_errors?.media_sources) && {
			id: "network-addresses",
			label: J("settings:accessUrls.title"),
			content: /* @__PURE__ */ (0, $.jsx)(Dl, {
				data: e,
				receipt: t
			})
		},
		e.access && {
			id: "network-access",
			label: J("settings:accessPassword.title"),
			content: /* @__PURE__ */ (0, $.jsx)(nl, {
				initial: e.access,
				receipt: t,
				onSaved: i
			})
		},
		r && (r.mode === "password" || r.mode === "legacy") && {
			id: "network-devices",
			label: J("settings:signedInDevices.title"),
			content: /* @__PURE__ */ (0, $.jsx)(Sl, {
				revision: r.revision,
				receipt: t
			})
		},
		r && e.api_token && {
			id: "network-api-token",
			label: J("settings:accessToken.title"),
			content: /* @__PURE__ */ (0, $.jsx)(al, {
				initial: e.api_token,
				mode: r.mode,
				receipt: t
			})
		},
		e.certificate && {
			id: "network-certificate",
			label: J("settings:certificateTrust.title"),
			content: /* @__PURE__ */ (0, $.jsx)(cl, { initial: e.certificate })
		},
		e.tunnel && {
			id: "network-tunnel",
			label: J("settings:remoteAccess.title"),
			content: /* @__PURE__ */ (0, $.jsx)(Ll, {
				revision: e.revision,
				initial: e.tunnel,
				receipt: t,
				blocked: a
			})
		},
		e.peach_proxy && {
			id: "peachProxy",
			label: J("settings:peachProxy.title"),
			content: /* @__PURE__ */ (0, $.jsx)(zl, {
				initial: e.peach_proxy,
				receipt: t
			})
		}
	] })] });
}
function zl({ initial: e, receipt: t }) {
	let [n, r] = (0, Z.useState)(e), [i, a] = (0, Z.useState)(e.mode), [o, s] = (0, Z.useState)(""), c = Y(), l = Oa(), u = () => {
		if (i !== "proxy" || !o && n.proxy_saved) return "";
		let e = o.trim(), t = /^(?:https?|socks5h?):\/\/([^/?#\s]+)\/?$/i.exec(e)?.[1];
		if (t && /:\d+$/.test(t)) try {
			if (new URL(e).hostname && Number(t.split(":").at(-1)) > 0) return "";
		} catch {}
		return q("errors.peachProxy.addressInvalid", "");
	};
	return /* @__PURE__ */ (0, $.jsxs)(R, {
		guide: "proxy",
		title: J("settings:peachProxy.title"),
		onSubmit: (e) => {
			e.preventDefault(), l.check(e.currentTarget, { peachProxyAddress: u() }) && c.run("save", (e) => U("/api/configuration/peach-proxy", {
				mode: i,
				proxy: o
			}, "POST", e), (e) => {
				r(e), s(""), t(J("settings:shared.settingsSaved"));
			});
		},
		children: [
			/* @__PURE__ */ (0, $.jsx)(L, { children: /* @__PURE__ */ (0, $.jsx)(z, {
				label: J("settings:peachProxy.mode"),
				description: J("settings:peachProxy.modeHelp"),
				children: /* @__PURE__ */ (0, $.jsx)(Al, {
					mode: i,
					onChange: (e) => {
						a(e), l.clear();
					}
				})
			}) }),
			i === "proxy" || n.needs_selection || c.error ? /* @__PURE__ */ (0, $.jsxs)(B, {
				divided: !0,
				children: [
					i === "proxy" ? /* @__PURE__ */ (0, $.jsx)(jl, {
						id: "peachProxyAddress",
						value: o,
						saved: n.proxy_saved,
						error: l.errors.peachProxyAddress,
						onBlur: () => {
							o && l.update("peachProxyAddress", u());
						},
						onChange: (e) => {
							s(e), l.update("peachProxyAddress");
						}
					}) : null,
					n.needs_selection ? /* @__PURE__ */ (0, $.jsx)(I, {
						tone: "warning",
						title: J("settings:peachProxy.chooseMode"),
						children: J("settings:peachProxy.modeConflict")
					}) : null,
					c.error ? /* @__PURE__ */ (0, $.jsx)(j, { children: c.error }) : null
				]
			}) : null,
			/* @__PURE__ */ (0, $.jsx)(N, { children: /* @__PURE__ */ (0, $.jsx)(m, {
				type: "submit",
				...W(c.busy === "save"),
				children: J("settings:shared.saveSettings")
			}) })
		]
	});
}
// src/react/follow-manage/credentials.tsx
var Bl = J("follow:sourceCredentials.clearBody"), Vl = J("follow:sourceCredentials.worldReadable"), Hl = [_e, ge];
function Ul(e, t) {
	return (e.shared_fields || []).includes(t) ? J("follow:sourceCredentials.fromSharedHint") : e.fields.includes(t) ? J("follow:sourceCredentials.savedHint") : J("follow:sourceCredentials.notSet");
}
function Wl({ row: e }) {
	if (qt(e)) return /* @__PURE__ */ (0, $.jsx)(A, {
		variant: "caption",
		color: "lime",
		children: J("follow:sourceCredentials.configured")
	});
	let t = e.requirement === "required" ? "yellow" : e.requirement === "blocked" ? "rose" : "neutral";
	return /* @__PURE__ */ (0, $.jsx)(A, {
		variant: "caption",
		color: t,
		children: x[e.requirement] || ""
	});
}
function Gl({ row: e, readOnly: t, open: n, toast: r }) {
	let [i, a] = (0, Z.useState)({}), [o, s] = (0, Z.useState)(""), c = qt(e), l = e.browser_login === !0 && !t, u = mi(pi(e.provider), l && n, Hl), d = Fr({
		mutationFn: (t) => ir(e.provider, t),
		onSuccess: (e, t) => {
			if (e.note) s(q(e.note_code ?? "", e.note));
			else {
				s(""), a({});
				for (let e of Hl) Xn.invalidateQueries({
					queryKey: e,
					exact: !0
				});
				r(Object.keys(t).length ? J("follow:sourceCredentials.saved") : J("follow:sourceCredentials.cleared"));
			}
		},
		onError: (e) => s(K(e))
	}), f = () => {
		if (u.busy) return;
		let e = Object.fromEntries(Object.entries(i).map(([e, t]) => [e, t.trim()]).filter(([, e]) => e));
		Object.keys(e).length ? d.mutate(e) : s(J("follow:sourceCredentials.nothingEntered"));
	};
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		className: "flex flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, $.jsxs)(P, { children: [G(e, "why"), e.where ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [" ", /* @__PURE__ */ (0, $.jsx)(he, {
				href: e.where,
				children: J("follow:sourceCredentials.getCredentials")
			})] }) : null] }),
			l ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)("div", {
				className: "self-start",
				children: /* @__PURE__ */ (0, $.jsx)(di, {
					login: u,
					disabled: d.isPending,
					onStart: () => s("")
				})
			}), /* @__PURE__ */ (0, $.jsx)(fi, {
				login: u,
				saved: c
			})] }) : null,
			e.howto ? /* @__PURE__ */ (0, $.jsx)(P, { children: G(e, "howto") }) : null,
			/* @__PURE__ */ (0, $.jsx)("div", {
				className: "flex w-full flex-col gap-3",
				children: (e.needs || []).map((n) => /* @__PURE__ */ (0, $.jsx)(F, {
					type: "password",
					label: n,
					placeholder: Ul(e, n),
					autoComplete: "off",
					spellCheck: "false",
					isDisabled: t || u.busy,
					value: i[n] || "",
					onChange: (e) => a({
						...i,
						[n]: e
					}),
					className: "w-full min-w-0"
				}, n))
			}),
			/* @__PURE__ */ (0, $.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [c ? /* @__PURE__ */ (0, $.jsx)(m, {
					variant: "secondary",
					disabled: t,
					...W(d.isPending || u.busy),
					onClick: () => void Gt({
						title: J("follow:sourceCredentials.clearTitle"),
						body: Bl,
						confirmLabel: J("follow:sourceCredentials.clearTitle"),
						danger: !0,
						holdToConfirm: !0,
						onConfirm: () => d.mutateAsync({})
					}),
					children: J("follow:shared.clear")
				}) : null, /* @__PURE__ */ (0, $.jsx)(m, {
					variant: "primary",
					disabled: t,
					...W(d.isPending || u.busy),
					onClick: f,
					children: J("follow:shared.saveSettings")
				})]
			}),
			o || u.error ? /* @__PURE__ */ (0, $.jsx)(j, { children: o || u.error }) : null,
			(e.shared_fields || []).length ? /* @__PURE__ */ (0, $.jsx)(P, { children: J("follow:sourceCredentials.sharedFieldsHint", {
				count: e.shared_fields.length,
				fields: Pn(e.shared_fields)
			}) }) : null,
			e.path ? /* @__PURE__ */ (0, $.jsx)(ce, {
				summary: J("follow:sourceCredentials.credentialsFile"),
				children: /* @__PURE__ */ (0, $.jsx)(He, {
					path: e.path,
					className: "font-mono text-caption-1-regular text-text-tertiary",
					onRevealed: r
				})
			}) : null
		]
	});
}
function Kl({ row: e, readOnly: t, toast: n }) {
	let [r, i] = (0, Z.useState)(e.requirement === "required" && !qt(e)), a = /* @__PURE__ */ (0, $.jsxs)("span", {
		className: "flex min-w-0 flex-wrap items-center gap-2",
		children: [
			/* @__PURE__ */ (0, $.jsx)("span", {
				className: "inline-flex size-3.5 shrink-0 items-center justify-center",
				children: /* @__PURE__ */ (0, $.jsx)(hi, { provider: e.provider })
			}),
			/* @__PURE__ */ (0, $.jsx)("b", {
				className: "min-w-0 text-body-medium wrap-anywhere text-text-primary",
				children: e.provider_label
			}),
			/* @__PURE__ */ (0, $.jsx)(Wl, { row: e }),
			e.missing.map((e) => /* @__PURE__ */ (0, $.jsx)(A, {
				variant: "caption",
				color: "rose",
				children: J("follow:sourceCredentials.missingField", { field: e })
			}, e))
		]
	});
	return e.requirement === "none" || e.requirement === "blocked" ? /* @__PURE__ */ (0, $.jsxs)("div", {
		className: "flex flex-wrap items-center gap-3 border-b border-separator-border px-6 py-5 last:border-b-0 max-sm:px-4",
		children: [a, e.requirement === "blocked" ? /* @__PURE__ */ (0, $.jsx)(P, { children: G(e, "why") }) : null]
	}) : /* @__PURE__ */ (0, $.jsxs)("div", {
		"data-credential-provider": e.provider,
		className: "flex flex-col gap-2 border-b border-separator-border px-6 py-5 last:border-b-0 max-sm:px-4",
		children: [
			a,
			/* @__PURE__ */ (0, $.jsx)(ce, {
				summary: qt(e) ? J("follow:sourceCredentials.editCredentials") : J("follow:sourceCredentials.enterCredentials"),
				isOpen: r,
				onOpenChange: i,
				children: /* @__PURE__ */ (0, $.jsx)(Gl, {
					row: e,
					readOnly: t,
					open: r,
					toast: n
				})
			}),
			e.world_readable ? /* @__PURE__ */ (0, $.jsx)(I, {
				tone: "error",
				title: J("follow:sourceCredentials.permissionsTooOpen"),
				children: Vl
			}) : null
		]
	});
}
function ql({ data: e, readOnly: t, toast: n, embedded: r = !1 }) {
	let i = e.providers || [], a = i.filter((e) => e.requirement === "required" && !qt(e));
	if ((0, Z.useEffect)(() => {
		$n("credentials", { done: i.filter(qt).map((e) => e.provider) });
	}, [e]), !i.length) return /* @__PURE__ */ (0, $.jsx)(fe, {
		size: "compact",
		icon: Ut,
		title: J("follow:sourceCredentials.emptyTitle"),
		children: J("follow:sourceCredentials.emptyHint")
	});
	let o = a.length ? /* @__PURE__ */ (0, $.jsx)("span", {
		className: "text-body-2-regular text-text-error-primary",
		children: J("follow:sourceCredentials.pendingCount", { count: a.length })
	}) : null, s = /* @__PURE__ */ (0, $.jsx)($.Fragment, { children: [
		{
			title: J("follow:sourceCredentials.groupSupported"),
			rows: i.filter((e) => e.requirement !== "none" && e.requirement !== "blocked")
		},
		{
			title: J("follow:sourceCredentials.groupNotNeeded"),
			rows: i.filter((e) => e.requirement === "none")
		},
		{
			title: J("follow:sourceCredentials.groupUnsupported"),
			rows: i.filter((e) => e.requirement === "blocked")
		}
	].filter((e) => e.rows.length).map((e) => /* @__PURE__ */ (0, $.jsxs)("section", {
		"aria-label": e.title,
		className: "flex flex-col gap-2",
		children: [/* @__PURE__ */ (0, $.jsx)("h4", {
			className: "text-body-medium text-text-secondary",
			children: e.title
		}), /* @__PURE__ */ (0, $.jsx)("div", {
			className: zt({
				variant: "outlined",
				padding: "none",
				className: "flex flex-col overflow-hidden"
			}),
			children: e.rows.map((e) => /* @__PURE__ */ (0, $.jsx)(Kl, {
				row: e,
				readOnly: t,
				toast: n
			}, e.provider))
		})]
	}, e.title)) });
	return r ? /* @__PURE__ */ (0, $.jsx)(R, {
		guide: "credentials",
		title: J("follow:sourceCredentials.sectionTitle"),
		aside: o || void 0,
		children: /* @__PURE__ */ (0, $.jsx)(B, { children: /* @__PURE__ */ (0, $.jsx)("div", {
			className: "flex flex-col gap-4",
			children: s
		}) })
	}) : /* @__PURE__ */ (0, $.jsxs)("div", {
		className: zt({
			padding: "none",
			className: "flex flex-col gap-4 px-6 py-5 max-sm:px-4"
		}),
		children: [/* @__PURE__ */ (0, $.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2",
			children: [/* @__PURE__ */ (0, $.jsx)("h3", {
				className: "mr-auto text-title-2-medium text-text-primary",
				children: J("follow:sourceCredentials.sectionTitle")
			}), o]
		}), s]
	});
}
// src/react/settings/entry-links-settings.tsx
function Jl(e) {
	let t = e.host.trim().replace(/^https?:\/\//i, "").replace(/\/+$/, "");
	if (!t) return "";
	let n = t.length > 100 ? "errors.entryLinks.hostTooLong" : /^[a-z\d](?:[a-z\d-]*[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]*[a-z\d])?)+$/i.test(t) ? "" : "errors.entryLinks.hostShape";
	return n ? q(n, "", {
		site: e.label,
		limit: 100,
		example: e.default_host
	}) : "";
}
function Yl({ initial: e, receipt: t }) {
	let [n, r] = (0, Z.useState)(e.sites), i = Y(), a = Oa(), o = (e, t) => r((n) => n.map((n) => n.key === e ? {
		...n,
		host: t
	} : n));
	return /* @__PURE__ */ (0, $.jsxs)(R, {
		guide: "entry-links",
		title: J("settings:entryLinks.title"),
		onSubmit: (e) => {
			if (e.preventDefault(), !a.check(e.currentTarget, Object.fromEntries(n.map((e) => [e.key, Jl(e)])))) return;
			let o = { sites: Object.fromEntries(n.map((e) => [e.key, { host: e.host }])) };
			i.run("save", (e) => U("/api/configuration/entry-links", o, "POST", e), (e) => {
				r(e.sites), t(J("settings:shared.settingsSaved"));
			});
		},
		children: [/* @__PURE__ */ (0, $.jsxs)(B, { children: [
			/* @__PURE__ */ (0, $.jsx)(P, { children: ue }),
			n.map((e) => /* @__PURE__ */ (0, $.jsx)(F, {
				id: `entry-link-${e.key}`,
				label: /* @__PURE__ */ (0, $.jsx)(_t, {
					site: e.key,
					label: J("settings:entryLinks.siteAddress", { site: e.label })
				}),
				autoComplete: "off",
				maxLength: 100,
				value: e.host,
				placeholder: e.default_host,
				"data-settings-field": e.key,
				isInvalid: !!a.errors[e.key],
				onChange: (t) => {
					o(e.key, t), a.update(e.key);
				},
				onBlur: () => a.update(e.key, Jl(e)),
				validationBehavior: "aria",
				hint: a.errors[e.key] || de
			}, e.key)),
			i.error ? /* @__PURE__ */ (0, $.jsx)(j, { children: i.error }) : null
		] }), /* @__PURE__ */ (0, $.jsx)(N, { children: /* @__PURE__ */ (0, $.jsx)(m, {
			type: "submit",
			...W(i.busy === "save"),
			children: J("settings:shared.saveSettings")
		}) })]
	});
}
// src/react/settings/indexer-settings.tsx
var Xl = "/api/configuration/indexers", Zl = [
	"name",
	"url",
	"api_key"
], Ql = (e, t) => `${e.key}-${t}`;
function $l(e, t) {
	let n = t.trim();
	if (e === "name") return !n || n.length > 80 ? q("errors.resourceSearch.invalidIndexerName", "") : "";
	if (e === "api_key") return n.length > 512 || /\s/.test(n) ? q("errors.resourceSearch.invalidApiKey", "") : "";
	if (n.length <= 2048 && /^https?:\/\/[^/?#@\\\s]+/i.test(n) && !/[?#\\\s]/.test(n)) try {
		let e = new globalThis.URL(n);
		if (e.hostname && e.port !== "0" && !e.username && !e.password) return "";
	} catch {}
	return q("errors.resourceSearch.endpointFormat", "");
}
function eu({ receipt: e }) {
	let t = X({
		queryKey: ["indexers"],
		queryFn: ({ signal: e }) => H(Xl, e),
		refetchOnMount: "always"
	});
	return t.error ? /* @__PURE__ */ (0, $.jsx)(qe, {
		titleKey: "settings:indexers.loadFailed",
		query: t
	}) : t.isFetching ? /* @__PURE__ */ (0, $.jsx)(it, {
		label: J("settings:indexers.loading"),
		html: En
	}) : t.data ? /* @__PURE__ */ (0, $.jsx)(ru, {
		initial: t.data,
		receipt: e
	}) : null;
}
function tu(e) {
	try {
		return new globalThis.URL(e).host;
	} catch {
		return e;
	}
}
function nu({ row: e, index: t }) {
	let n = [
		e.url ? tu(e.url) : J("settings:indexers.noUrl"),
		e.enabled ? J("settings:shared.enabled") : J("settings:shared.disabled"),
		e.api_key_set && !e.clear_api_key ? J("settings:indexers.apiKeySaved") : e.api_key ? J("settings:indexers.apiKeyUnsaved") : J("settings:indexers.noApiKey")
	];
	return /* @__PURE__ */ (0, $.jsxs)("span", {
		className: "flex min-w-0 items-baseline gap-3",
		children: [/* @__PURE__ */ (0, $.jsx)("span", {
			className: "shrink-0 text-text-primary",
			children: e.name || J("settings:indexers.defaultName", { index: t + 1 })
		}), /* @__PURE__ */ (0, $.jsx)("span", {
			className: "truncate text-body-2-regular text-text-secondary",
			children: n.join(" · ")
		})]
	});
}
function ru({ initial: e, receipt: t }) {
	let [n, r] = (0, Z.useState)(e.indexers), [i, a] = (0, Z.useState)({}), o = Oa(), s = Y();
	(0, Z.useEffect)(() => {
		$n("indexers", { open: e.indexers.map((e) => !e.url) });
	}, [e]);
	let c = (e, t) => r((n) => n.map((n) => n.key === e ? {
		...n,
		...t
	} : n)), l = (e, t) => {
		let n = Ql(e, t), r = e[t] ?? "";
		return {
			"data-settings-field": n,
			value: r,
			isInvalid: !!o.errors[n],
			validationBehavior: "aria",
			hint: o.errors[n],
			onChange: (r) => {
				c(e.key, { [t]: r }), o.update(n);
			},
			onBlur: () => {
				r && o.update(n, $l(t, r));
			}
		};
	};
	return /* @__PURE__ */ (0, $.jsxs)(R, {
		guide: "indexers",
		title: J("settings:indexers.title"),
		onSubmit: (e) => {
			e.preventDefault();
			let i = {}, c = {};
			for (let e of n) for (let t of Zl) {
				let n = $l(t, e[t] ?? "");
				n && (i[Ql(e, t)] = n, c[e.key] = !0);
			}
			o.check(e.currentTarget, i) ? s.run("save", (e) => U(Xl, { indexers: n }, "POST", e), (e) => {
				r(e.indexers), t(J("settings:indexers.saved"));
			}) : a((e) => ({
				...e,
				...c
			}));
		},
		children: [/* @__PURE__ */ (0, $.jsxs)(B, { children: [/* @__PURE__ */ (0, $.jsxs)("div", {
			className: "flex min-w-0 flex-col gap-4",
			children: [/* @__PURE__ */ (0, $.jsx)(ce, {
				summary: J("settings:indexers.connectHelp"),
				children: /* @__PURE__ */ (0, $.jsxs)(P, { children: [
					J("settings:indexers.helpText"),
					" ",
					/* @__PURE__ */ (0, $.jsx)(he, {
						href: "https://github.com/peach-mitao/peach/blob/master/docs/RESOURCE_SEARCH.md",
						children: J("settings:indexers.setupGuide")
					})
				] })
			}), n.map((t, n) => /* @__PURE__ */ (0, $.jsx)("div", {
				className: "min-w-0 border-t border-separator-border pt-2",
				children: /* @__PURE__ */ (0, $.jsx)(ce, {
					isOpen: i[t.key] ?? !e.indexers.some((e) => e.key === t.key && e.url),
					onOpenChange: (e) => a((n) => ({
						...n,
						[t.key]: e
					})),
					summary: /* @__PURE__ */ (0, $.jsx)(nu, {
						row: t,
						index: n
					}),
					children: /* @__PURE__ */ (0, $.jsxs)("div", {
						className: "flex min-w-0 flex-col gap-4",
						children: [
							/* @__PURE__ */ (0, $.jsx)(F, {
								label: J("settings:shared.name"),
								"aria-label": J("settings:indexers.nameLabel", { index: n + 1 }),
								maxLength: 80,
								isDisabled: !!s.busy,
								...l(t, "name")
							}),
							/* @__PURE__ */ (0, $.jsx)(F, {
								label: J("settings:indexers.torznabUrl"),
								"aria-label": J("settings:indexers.torznabUrlLabel", { index: n + 1 }),
								type: "url",
								autoComplete: "off",
								placeholder: J("settings:indexers.urlPlaceholder"),
								isDisabled: !!s.busy,
								...l(t, "url")
							}),
							/* @__PURE__ */ (0, $.jsxs)("div", {
								className: "flex min-w-0 flex-col gap-2",
								children: [/* @__PURE__ */ (0, $.jsx)(F, {
									label: "API key",
									"aria-label": J("settings:indexers.apiKeyLabel", { index: n + 1 }),
									type: "password",
									autoComplete: "new-password",
									placeholder: t.api_key_set ? J("settings:shared.savedLeaveBlank") : void 0,
									isDisabled: !!s.busy,
									...l(t, "api_key")
								}), t.api_key_set ? /* @__PURE__ */ (0, $.jsx)(k, {
									isSelected: !!t.clear_api_key,
									isDisabled: !!s.busy,
									onChange: (e) => c(t.key, { clear_api_key: e }),
									children: J("settings:indexers.clearApiKey")
								}) : null]
							}),
							/* @__PURE__ */ (0, $.jsxs)("div", {
								className: "flex min-h-10 items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, $.jsx)(V, {
									isSelected: t.enabled,
									isDisabled: !!s.busy,
									onChange: (e) => c(t.key, { enabled: e }),
									children: J("settings:shared.enable")
								}), /* @__PURE__ */ (0, $.jsx)(m, {
									variant: "secondary",
									type: "button",
									size: "small",
									leadingIcon: je,
									disabled: !!s.busy,
									"aria-label": J("settings:indexers.removeLabel", { index: n + 1 }),
									onClick: () => r((e) => e.filter((e) => e.key !== t.key)),
									children: J("settings:shared.remove")
								})]
							})
						]
					})
				})
			}, t.key))]
		}), s.error ? /* @__PURE__ */ (0, $.jsx)(j, { children: s.error }) : null] }), /* @__PURE__ */ (0, $.jsxs)(N, { children: [/* @__PURE__ */ (0, $.jsx)(m, {
			variant: "secondary",
			type: "button",
			disabled: !!s.busy || n.length >= e.max_indexers,
			onClick: () => r([...n, {
				key: Zn(),
				name: "",
				url: "",
				enabled: !0,
				api_key_set: !1
			}]),
			children: J("settings:indexers.add")
		}), /* @__PURE__ */ (0, $.jsx)(m, {
			type: "submit",
			...W(s.busy === "save"),
			children: J("settings:shared.saveSettings")
		})] })]
	});
}
// src/react/settings/scraping-browser-settings.tsx
var iu = ["window", "headless"], au = (e) => J(e === "headless" ? "settings:scrapingBrowser.headless" : "settings:scrapingBrowser.window");
function ou({ receipt: e }) {
	let t = X({
		queryKey: Qe,
		queryFn: ({ signal: e }) => an(e),
		refetchOnMount: "always"
	}), n = Fr({
		mutationFn: (e) => U($e, { browser_mode: e }),
		onSuccess: (t) => {
			Xn.setQueryData(Qe, (e) => e && {
				...e,
				browser_mode: t.browser_mode
			}), e(J("settings:shared.settingsSaved"));
		}
	}, Xn), r = n.error || t.error;
	return /* @__PURE__ */ (0, $.jsxs)(R, {
		title: J("settings:scrapingBrowser.title"),
		children: [/* @__PURE__ */ (0, $.jsx)(L, { children: /* @__PURE__ */ (0, $.jsx)(z, {
			label: J("settings:scrapingBrowser.mode"),
			description: J("settings:scrapingBrowser.modeHelp"),
			children: /* @__PURE__ */ (0, $.jsx)("div", {
				id: "scrapingBrowserModeSetting",
				className: "shrink-0",
				children: /* @__PURE__ */ (0, $.jsx)(lt, {
					"aria-label": J("settings:scrapingBrowser.mode"),
					selectedKey: t.data?.browser_mode ?? "window",
					isDisabled: !t.data || n.isPending,
					onSelectionChange: (e) => {
						e !== null && n.mutate(String(e));
					},
					children: iu.map((e) => /* @__PURE__ */ (0, $.jsx)(dt, {
						id: e,
						children: au(e)
					}, e))
				})
			})
		}) }), r ? /* @__PURE__ */ (0, $.jsx)(B, {
			divided: !0,
			children: /* @__PURE__ */ (0, $.jsx)(j, { children: K(r) })
		}) : null]
	});
}
// src/react/settings/want-search-settings.tsx
var su = [
	1,
	3,
	7,
	14,
	30
], cu = [
	1,
	3,
	5,
	10,
	0
], lu = (e) => e === 1 ? J("settings:wantSearch.daily") : J("settings:wantSearch.everyDays", { count: e }), uu = (e) => e === 0 ? J("settings:wantSearch.never") : J("settings:wantSearch.attempts", { count: e });
function du({ receipt: e }) {
	let t = X({
		queryKey: nt,
		queryFn: ({ signal: e }) => rn(e),
		refetchOnMount: "always"
	}), n = Vr("want-search"), r = !t.data || n.isPending, i = (t) => n.mutate(t, { onSuccess: () => e(J("settings:shared.settingsSaved")) }), a = n.error || t.error;
	return /* @__PURE__ */ (0, $.jsxs)(R, {
		title: J("settings:wantSearch.title"),
		children: [/* @__PURE__ */ (0, $.jsxs)(L, { children: [/* @__PURE__ */ (0, $.jsx)(z, {
			label: J("settings:wantSearch.interval"),
			description: J("settings:wantSearch.intervalHelp"),
			children: /* @__PURE__ */ (0, $.jsx)("div", {
				id: "wantStaleSearchDaysSetting",
				className: "shrink-0",
				children: /* @__PURE__ */ (0, $.jsx)(lt, {
					"aria-label": J("settings:wantSearch.interval"),
					selectedKey: String(t.data?.wantStaleSearchDays ?? 7),
					isDisabled: r,
					onSelectionChange: (e) => {
						e !== null && i({ wantStaleSearchDays: Number(e) });
					},
					children: su.map((e) => /* @__PURE__ */ (0, $.jsx)(dt, {
						id: String(e),
						children: lu(e)
					}, e))
				})
			})
		}), /* @__PURE__ */ (0, $.jsx)(z, {
			label: J("settings:wantSearch.giveUp"),
			description: J("settings:wantSearch.giveUpHelp"),
			children: /* @__PURE__ */ (0, $.jsx)("div", {
				id: "wantStaleAttemptLimitSetting",
				className: "shrink-0",
				children: /* @__PURE__ */ (0, $.jsx)(lt, {
					"aria-label": J("settings:wantSearch.giveUp"),
					selectedKey: String(t.data?.wantStaleAttemptLimit ?? 3),
					isDisabled: r,
					onSelectionChange: (e) => {
						e !== null && i({ wantStaleAttemptLimit: Number(e) });
					},
					children: cu.map((e) => /* @__PURE__ */ (0, $.jsx)(dt, {
						id: String(e),
						children: uu(e)
					}, e))
				})
			})
		})] }), a ? /* @__PURE__ */ (0, $.jsx)(B, {
			divided: !0,
			children: /* @__PURE__ */ (0, $.jsx)(j, { children: K(a) })
		}) : null]
	});
}
// src/react/settings/cover-fallback-settings.tsx
function fu({ receipt: e }) {
	let t = X({
		queryKey: nt,
		queryFn: ({ signal: e }) => rn(e),
		refetchOnMount: "always"
	}), n = Vr("cover-fallback"), r = n.error || t.error;
	return /* @__PURE__ */ (0, $.jsxs)(R, {
		title: J("settings:coverFallback.title"),
		children: [/* @__PURE__ */ (0, $.jsx)(L, { children: /* @__PURE__ */ (0, $.jsx)(z, {
			label: J("settings:coverFallback.javdb"),
			description: J("settings:coverFallback.javdbHelp"),
			children: /* @__PURE__ */ (0, $.jsx)(V, {
				"aria-label": J("settings:coverFallback.javdb"),
				isSelected: t.data?.javdbCoverFallback === !0,
				isDisabled: !t.data || n.isPending,
				onChange: (t) => n.mutate({ javdbCoverFallback: t }, { onSuccess: () => e(J("settings:shared.settingsSaved")) })
			})
		}) }), r ? /* @__PURE__ */ (0, $.jsx)(B, {
			divided: !0,
			children: /* @__PURE__ */ (0, $.jsx)(j, { children: K(r) })
		}) : null]
	});
}
// src/react/settings/source-settings.tsx
function pu({ data: e, receipt: t, active: n, issues: r }) {
	let i = X({
		queryKey: _e,
		queryFn: ({ signal: e }) => en(e),
		enabled: n,
		refetchOnMount: "always"
	});
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [r, /* @__PURE__ */ (0, $.jsx)(ba, { entries: [
		{
			id: "sources-credentials",
			label: J("follow:sourceCredentials.sectionTitle"),
			content: /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)("div", {
				"data-guide-target": "sources",
				children: /* @__PURE__ */ (0, $.jsx)(h, {
					href: "/sources",
					variant: "secondary",
					children: J("settings:sourceSettings.sourcesLink")
				})
			}), i.data ? /* @__PURE__ */ (0, $.jsx)(ql, {
				data: i.data,
				readOnly: !!e.ledger_read_only,
				toast: t,
				embedded: !0
			}) : i.error ? /* @__PURE__ */ (0, $.jsx)(qe, {
				titleKey: "settings:sourceSettings.credentialsFailed",
				query: i
			}) : n ? /* @__PURE__ */ (0, $.jsx)(it, {
				label: J("settings:sourceSettings.loadingCredentials"),
				html: Jt
			}) : null] })
		},
		{
			id: "sources-follow-fetch",
			label: J("settings:followFetch.title"),
			content: /* @__PURE__ */ (0, $.jsx)(vc, { receipt: t })
		},
		{
			id: "sources-scraping-browser",
			label: J("settings:scrapingBrowser.title"),
			content: /* @__PURE__ */ (0, $.jsx)(ou, { receipt: t })
		},
		{
			id: "sources-covers",
			label: J("settings:coverFallback.title"),
			content: /* @__PURE__ */ (0, $.jsx)(fu, { receipt: t })
		},
		e.entry_links && {
			id: "sources-entry-links",
			label: J("settings:entryLinks.title"),
			content: /* @__PURE__ */ (0, $.jsx)(Yl, {
				initial: e.entry_links,
				receipt: t
			})
		},
		{
			id: "sources-indexers",
			label: J("settings:indexers.title"),
			content: /* @__PURE__ */ (0, $.jsx)(eu, { receipt: t })
		},
		{
			id: "sources-want-search",
			label: J("settings:wantSearch.title"),
			content: /* @__PURE__ */ (0, $.jsx)(du, { receipt: t })
		}
	] })] });
}
// src/react/settings/configuration-panel.ts
var mu = "flex flex-col gap-6";
function hu(e) {
	return {
		className: e.active ? `${mu} ui-board-group-active` : mu,
		"data-board-group": String(e.index),
		id: e.id,
		role: "tabpanel",
		"aria-labelledby": e.labelledBy
	};
}
// src/react/settings/configuration-shape.ts
function gu(e) {
	let t = e.downloads;
	if (!t) return null;
	let n = t.media_sources ?? [];
	return {
		cloud: n.some((e) => g.includes(e)),
		has115: n.includes("115"),
		pikpak: n.includes("pikpak"),
		pikpakRoots: t.pikpak_roots.length > 0,
		pikpakLoggedIn: t.pikpak.logged_in,
		browserLogin: t.pikpak_browser.available,
		localDownload: !0
	};
}
function _u(e) {
	let t = e.tunnel;
	return {
		port: !!(e.editable && e.port_editable !== !1),
		addresses: e.network ? 1 + Number(!!(e.network.lan_url || e.network.ip_url)) + Number(!!(e.network.lan_url && e.network.ip_url)) : 0,
		networkEditable: !!e.network?.editable,
		lan: e.network?.host === "0.0.0.0",
		proxyAddress: e.peach_proxy?.mode === "proxy" || !!e.peach_proxy?.needs_selection,
		access: e.access?.mode ?? "",
		apiToken: !!(e.access && e.api_token),
		tunnelNamed: !!t?.named_available,
		tunnelNamedMode: !!(t?.named_available && t.mode === "named"),
		tunnelNote: !!(t && (!t.available || t.state === "starting" || t.state === "running" && t.url))
	};
}
function vu(e) {
	let t = e.updates, n = e.update_job?.state ?? "idle", r = !t || t.state === "unchecked" && !t.checked_at && n === "idle", i = +!!t?.package_kind + (r ? 0 : +!!t?.checked_at + (t?.state === "unchecked" ? 0 : 1) + (n === "idle" ? 0 : 1)), a = e.automatic_updates, o = e.storage;
	return {
		releaseFacts: t?.package_kind ? 5 : 4,
		releaseNotes: i,
		autoUpdateHelp: !(!a || a.available && !a.download_available),
		startupNote: !!e.startup?.message,
		desktopNote: !!e.startup?.desktop_message,
		storage: !!o,
		storageRows: o?.usage?.categories.length ?? 0,
		storageNotes: o && !o.relocation.available ? 1 : 0,
		reporting: !!e.remote_reporting,
		reportingIdle: !(!e.remote_reporting || e.remote_reporting.available),
		sharingIdle: !(!e.library_sharing || e.library_sharing.available),
		facts: e.facts.map((e) => e.term),
		uninstall: !!e.uninstall,
		uninstallHelp: !!e.uninstall?.available
	};
}
// src/react/settings/configuration-page.tsx
function yu({ receipt: e, reopenTutorial: t, section: n = "", diagnostics: r }) {
	let i = X({
		queryKey: v,
		queryFn: ({ signal: e }) => $t(e)
	}), a = i.data;
	return a ? /* @__PURE__ */ (0, $.jsx)(Cu, {
		data: a,
		receipt: e,
		reopenTutorial: t,
		section: n,
		diagnostics: r,
		refreshing: i.isFetching,
		reload: () => {
			i.refetch({ cancelRefetch: !1 });
		}
	}) : /* @__PURE__ */ (0, $.jsx)("div", {
		className: "ui-configpage",
		children: /* @__PURE__ */ (0, $.jsx)(I, {
			tone: "error",
			title: J("settings:configurationPage.loadFailedTitle"),
			children: i.error ? K(i.error) : J("settings:configurationPage.loadFailed")
		})
	});
}
function bu({ data: e, sections: t, reload: n, refreshing: r }) {
	return /* @__PURE__ */ (0, $.jsx)($.Fragment, { children: t.map((t) => {
		let i = e.section_errors?.[t];
		return i ? /* @__PURE__ */ (0, $.jsx)(I, {
			tone: "error",
			title: i.title,
			action: /* @__PURE__ */ (0, $.jsx)(m, {
				variant: "secondary",
				size: "small",
				onClick: n,
				...W(r),
				children: J("settings:shared.reload")
			}),
			children: i.message
		}, t) : null;
	}) });
}
var xu = "(max-width:1100px)", Su = 0;
function Cu({ data: e, receipt: t, reopenTutorial: n, section: r, diagnostics: i, reload: a, refreshing: o }) {
	let [s] = (0, Z.useState)(() => `board-tabs-${++Su}`), [l, u] = (0, Z.useState)(r), d = (0, Z.useRef)(null), f = (0, Z.useRef)(null), p = (0, Z.useRef)(l);
	(0, Z.useEffect)(() => {
		u(r);
	}, [r]), (0, Z.useEffect)(() => {
		let t = gu(e);
		t && $n("downloads", t), $n("network", _u(e)), $n("maintenance", vu(e));
	}, [e]), (0, Z.useLayoutEffect)(() => {
		let e = f.current, t = d.current, n = () => t.style.setProperty("--settings-nav-height", `${e.offsetHeight}px`);
		n();
		let r = new ResizeObserver(n);
		return r.observe(e), () => r.disconnect();
	}, []), (0, Z.useLayoutEffect)(() => {
		if (p.current === l) return;
		p.current = l;
		let e = d.current?.querySelector(".ui-board-local-nav"), t = d.current?.querySelector(".ui-board-group-active");
		if (!e || !t) return;
		let n = parseFloat(getComputedStyle(e).top);
		if (!Number.isFinite(n) || e.getBoundingClientRect().top > n + 1) return;
		let r = matchMedia(xu).matches ? e.getBoundingClientRect().bottom + 8 : n;
		window.scrollTo(0, Math.max(0, window.scrollY + t.getBoundingClientRect().top - r));
	}, [l]);
	let m = (e) => {
		u(e), hr(mr(e), {
			replace: !0,
			state: Un.navigation.location.state
		});
	}, [h, g] = (0, Z.useState)(() => matchMedia(xu).matches);
	(0, Z.useEffect)(() => {
		let e = matchMedia(xu), t = () => g(e.matches);
		return e.addEventListener("change", t), () => e.removeEventListener("change", t);
	}, []);
	let _ = {
		data: e,
		receipt: t
	}, v = (t) => /* @__PURE__ */ (0, $.jsx)(bu, {
		data: e,
		sections: t,
		reload: a,
		refreshing: o
	}), b = [
		"peach_proxy",
		"access",
		"tunnel",
		"push_discovery",
		...e.editable && e.port_editable !== !1 ? ["media_sources"] : []
	], x = !!(e.peach_proxy || e.access || e.tunnel || e.editable && e.port_editable !== !1 || b.some((t) => e.section_errors?.[t])), S = e.downloads, C = [
		{
			id: "library",
			title: y.library,
			body: () => /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [v([
				"media_sources",
				"library_count",
				"mount_dependencies"
			]), /* @__PURE__ */ (0, $.jsx)(Xc, { ..._ })] })
		},
		{
			id: "sources",
			title: y.subscriptions,
			body: (e) => /* @__PURE__ */ (0, $.jsx)(pu, {
				..._,
				active: e,
				issues: v(["entry_links"])
			})
		},
		{
			id: "ai",
			title: y.ai,
			body: (e) => /* @__PURE__ */ (0, $.jsx)(c, {
				active: e,
				receipt: t
			})
		},
		...S || e.section_errors?.downloads ? [{
			id: "downloads",
			title: y.downloads,
			body: (e) => /* @__PURE__ */ (0, $.jsx)(Xa, {
				initial: S,
				receipt: t,
				active: e,
				issues: v(["downloads"])
			})
		}] : [],
		...x ? [{
			id: "network",
			title: y.network,
			body: () => /* @__PURE__ */ (0, $.jsx)(Rl, {
				..._,
				issues: v(b)
			})
		}] : [],
		{
			id: "maintenance",
			title: y.maintenance,
			body: (e) => /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [v([
				"startup",
				"uninstall",
				"storage",
				"remote_reporting",
				"library_sharing",
				"updates",
				"update_job",
				"automatic_updates",
				"facts"
			]), /* @__PURE__ */ (0, $.jsx)(Ys, {
				..._,
				active: e,
				reopenTutorial: n
			})] })
		},
		{
			id: "diagnostics",
			title: y.diagnostics,
			body: (e) => e ? i : void 0
		}
	], w = Math.max(0, C.findIndex((e) => e.title === or(l)));
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		ref: d,
		className: "ui-configpage",
		children: [/* @__PURE__ */ (0, $.jsx)("div", {
			ref: f,
			className: "ui-board-local-nav",
			"data-section-nav": "",
			children: /* @__PURE__ */ (0, $.jsx)(vt, {
				group: "configuration",
				label: J("settings:configurationPage.sectionsLabel"),
				value: C[w].id,
				tabs: C.map(({ id: e, title: t }) => ({
					value: e,
					label: t
				})),
				sectionItems: !0,
				panelPrefix: s,
				orientation: h ? "horizontal" : "vertical",
				className: "",
				onChange: (e) => m(C.find((t) => t.id === e).title)
			})
		}), C.map(({ id: e, title: t, body: n }, r) => {
			let i = {
				index: r,
				id: `${s}-panel-${e}`,
				labelledBy: `${s}-tab-${e}`,
				active: r === w
			}, a = Wt(e);
			return /* @__PURE__ */ (0, $.jsxs)("div", {
				...hu(i),
				children: [/* @__PURE__ */ (0, $.jsxs)("header", {
					className: "flex min-w-0 flex-col gap-1",
					children: [/* @__PURE__ */ (0, $.jsx)("h2", {
						className: "text-title-2-medium text-text-primary",
						"data-copy-key": `navigation.configurationSections.${e === "sources" ? "feeds" : e}`,
						children: t
					}), /* @__PURE__ */ (0, $.jsx)("p", {
						className: "text-body-2-regular text-text-secondary select-text",
						"data-copy-key": "settings." + a,
						children: J("settings:" + a)
					})]
				}), n(i.active)]
			}, e);
		})]
	});
}
export { yu as ConfigurationPage };

//# debugId=623a1edd-94bf-4be7-8220-8fa31601c280