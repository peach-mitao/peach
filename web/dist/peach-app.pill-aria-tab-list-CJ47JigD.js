(function() {
	try {
		var e = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "e349969a-e436-4cad-8405-40d25260f270", e._sentryDebugIdIdentifier = "sentry-dbid-e349969a-e436-4cad-8405-40d25260f270");
	} catch {}
})();
import { $b4f18e3395fe64d7$export$e51a686c67fdaa2d as e, PillTabList as t, __toESM as n, require_jsx_runtime as r, require_react as i, useHorizontalScroller as a } from "./peach-app.js";
//#region src/react/components/pill-aria-tab-list.tsx
var o = /* @__PURE__ */ n(i(), 1), s = r();
function c({ scrollable: n = !0, ...r }) {
	let [i, c] = (0, o.useState)(null), l = a(c, n);
	return /* @__PURE__ */ (0, s.jsxs)(s.Fragment, { children: [/* @__PURE__ */ (0, s.jsx)(e, {
		...r,
		ref: l,
		"data-pill-nav": ""
	}), /* @__PURE__ */ (0, s.jsx)(t, { container: i })] });
}
//#endregion
export { c as PillAriaTabList };

//# debugId=e349969a-e436-4cad-8405-40d25260f270