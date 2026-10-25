(function() {
	try {
		var e = typeof window < "u" ? window : typeof global < "u" ? global : typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "9cfdcf22-0388-4139-90eb-3626f6d70fb8", e._sentryDebugIdIdentifier = "sentry-dbid-9cfdcf22-0388-4139-90eb-3626f6d70fb8");
	} catch {}
})();
import { require_jsx_runtime as e } from "./peach-app.js";
//#region src/react/components/page.tsx
var t = e();
function n({ children: e }) {
	return /* @__PURE__ */ (0, t.jsx)("div", {
		className: "mx-auto flex w-full max-w-board flex-col gap-8",
		children: e
	});
}
//#endregion
export { n as Page };

//# debugId=9cfdcf22-0388-4139-90eb-3626f6d70fb8