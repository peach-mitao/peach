(function() {
	try {
		var e = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "923ff459-a6a5-4c91-8bdc-7904555ea4f5", e._sentryDebugIdIdentifier = "sentry-dbid-923ff459-a6a5-4c91-8bdc-7904555ea4f5");
	} catch {}
})();
import { cx as e, require_jsx_runtime as t, sortCx as n } from "./peach-app.js";
//#region src/react/boardui/components/base/badges/status-dot.tsx
var r = t(), i = n({
	base: "inline-flex size-3 shrink-0 items-center justify-center rounded-full",
	halo: {
		green: "bg-status-dot-green-halo",
		yellow: "bg-status-dot-yellow-halo",
		indigo: "bg-status-dot-indigo-halo"
	},
	dot: {
		green: "bg-green-500",
		yellow: "bg-yellow-500",
		indigo: "bg-indigo-500"
	}
});
function a({ color: t = "green", className: n, ref: a, ...o }) {
	return /* @__PURE__ */ (0, r.jsx)("span", {
		ref: a,
		"aria-hidden": !0,
		className: e(i.base, i.halo[t], n),
		...o,
		children: /* @__PURE__ */ (0, r.jsx)("span", { className: e("size-1.5 rounded-full", i.dot[t]) })
	});
}
//#endregion
//#region src/react/components/connection-status.tsx
var o = {
	success: "text-green-700 dark:text-green-400",
	warning: "text-status-yellow-text",
	progress: "text-notification-information-foreground",
	neutral: "text-text-secondary",
	error: "text-text-error-primary"
};
function s({ online: t, tone: n, children: i }) {
	let s = n ?? (t === !0 ? "success" : t === !1 ? "warning" : "neutral");
	return /* @__PURE__ */ (0, r.jsxs)("span", {
		"data-mount": t === !0 ? "online" : t === !1 ? "offline" : "unknown",
		"data-connection-tone": s,
		className: e("inline-flex items-center gap-1.5 whitespace-nowrap text-body-2-medium", o[s]),
		children: [/* @__PURE__ */ (0, r.jsx)(a, { color: s === "success" ? "green" : s === "warning" ? "yellow" : "indigo" }), i ?? (t === !0 ? "在线" : t === !1 ? "离线" : "未检测")]
	});
}
//#endregion
export { s as ConnectionStatus };

//# debugId=923ff459-a6a5-4c91-8bdc-7904555ea4f5