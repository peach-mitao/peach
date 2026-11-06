(function() {
	try {
		var e = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "9a28c9a4-de0a-4ca2-af2a-5a70a0f45b3e", e._sentryDebugIdIdentifier = "sentry-dbid-9a28c9a4-de0a-4ca2-af2a-5a70a0f45b3e");
	} catch {}
})();
import { AnimatedItems as e, Cell as t, ChartBackground as n, ChartContainer as r, ChartLegend as i, ChartLegendContent as a, ChartTip as o, ChartTooltip as s, ChartTooltipContent as c, Curve as l, DATA_ITEM_GRAPHICAL_ITEM_ID_ATTRIBUTE_NAME as u, DATA_ITEM_INDEX_ATTRIBUTE_NAME as d, DefaultZIndexes as f, EvilBarChart as p, LabelList as m, LabelListFromLabelProp as h, Layer as g, LoadingIndicator as _, PolarChart as v, PolarLabelContextProvider as y, PolarLabelListContextProvider as b, RegisterGraphicalItemId as x, Sector as S, SetPolarGraphicalItem as C, SetPolarLegendPayload as w, SetTooltipEntrySettings as T, Shape as ee, TIP_SWATCH as te, Text as ne, ZIndexLayer as re, adaptEventsOfChild as ie, arrayTooltipSearcher as ae, createSelector as oe, defaultPolarChartProps as se, findAllByType as ce, get as le, getClassNameFromUnknown as ue, getColorsCount as de, getMaxRadius as fe, getPercentValue as pe, getTooltipNameProp as me, getValueByDataKey as he, interpolate as ge, isNumber as _e, matchAppend as ve, mathSign as ye, polarToCartesian as be, resolveDefaultProps as xe, selectActiveTooltipDataKey as Se, selectActiveTooltipGraphicalItemId as Ce, selectActiveTooltipIndex as we, selectChartDataAndAlwaysIgnoreIndexes as Te, selectChartOffsetInternal as Ee, selectUnfilteredPolarItems as De, svgPropertiesNoEvents as Oe, svgPropertiesNoEventsFromUnknown as ke, tone as Ae, useAnimationCallbacks as je, useAppSelector as Me, useMouseClickItemDispatch as Ne, useMouseEnterItemDispatch as Pe, useMouseLeaveItemDispatch as Fe, usePolarChartLayout as Ie } from "./peach-app.chart-tip-CRxYp6KT.js";
import { $2ec61d1d4f780267$export$a8a3e93435678ff9 as Le, $3a442827418ebe87$export$eb2fcfdbd7ba97d4 as Re, $542a13ca2fa5b484$export$5b6b19405a83ff9d as ze, $72abaeab4d80592f$export$78efe591171d7d45 as Be, $bd263d78e9bf3c56$export$f5c9f3c2c4054eec as Ve, $ea3928288112382f$export$439d29a4e110a164 as He, $f2ff30fde7b014be$export$3ddf2d174ce01153 as Ue, $fe21c36db05242bb$export$a98f0dcb43a68a25 as We, $fe21c36db05242bb$export$d7b12c4107be0d61 as Ge, ACCENTS as Ke, ApiError as qe, Button as E, ButtonLink as Je, CLOUD_LOCATIONS as Ye, CLOUD_PROXY_HELP as Xe, CONFIGURATION_KEY as Ze, CONFIGURATION_URL as Qe, CREDENTIAL_STATE as $e, Checkbox as D, Chip as et, CommandSteps as tt, Disclosure as O, ENTRY_LINKS_HELP as nt, ENTRY_LINKS_HINT as rt, EmptyState as it, ErrorText as k, Eu as at, ExternalLink as A, FEED_SCHEDULE_KEY as ot, FOLLOW_CREDENTIALS_KEY as st, FOLLOW_INITIAL_RANGE_OPTIONS as ct, FOLLOW_SCHEDULE_KEY as lt, Fact as j, FactList as ut, FieldLabel as dt, Footer as M, Help as N, HintText as ft, Input as P, L1 as pt, LIBRARY_FOLDER_HELP as mt, LIBRARY_PROCESSING_KEY as ht, Label as gt, LinkButton as _t, LoadingDots as vt, M6 as yt, MEDIA_PROCESSING_KEY as bt, MEDIA_PROCESSING_URL as xt, MEDIA_SOURCE_ICONS as St, MENU_POPOVER_SURFACE as Ct, Note as F, PICK_FOLDER_URL as wt, POLICY_COLUMNS as Tt, POLICY_COVER_NOTE as Et, POLICY_MATRIX as Dt, POLICY_SUMMARY as Ot, PathLine as kt, PillTabList as At, Progress as jt, Rows as I, SEGMENT as Mt, SEGMENTED_TRACK as Nt, SETTINGS_KEY as Pt, SETTINGS_URL as Ft, Section as L, SectionSkeleton as It, SegmentedRadioGroup as Lt, Select as Rt, Select$1 as R, SelectItem as z, SettingsCard as zt, SettingsRow as B, SiteLabel as Bt, SourceLabel as Vt, SourceMark as Ht, Stack as V, StatusLabel as H, Switch as U, THUMBNAIL_JOBS_KEY as Ut, TaskCenterLink as Wt, TextField as Gt, TextFieldContext as Kt, Uz as qt, __toESM as Jt, _p as Yt, animate as Xt, apiGet as W, apiSend as G, appSettingsStore as Zt, boundedPreference as Qt, busyProps as K, cardClass as $t, cloudProxySkeleton as en, clsx as tn, cn as nn, confirmModal as rn, credentialDone as an, credentialsSkeleton as on, cx as sn, d6 as cn, devicesSkeleton as ln, errorMessage as q, fetchConfiguration as un, fetchCredentials as dn, fetchFeedSchedule as fn, fetchFollowSchedule as pn, fetchLibraryProcessing as mn, fetchMediaProcessing as hn, fetchSettings as gn, fetchThumbnailJobs as _n, fmtSize as J, indexersSkeleton as vn, javBrowserSkeleton as yn, l1 as bn, momentText as xn, motion as Sn, overlayHost as Cn, peachHistory$1 as wn, previewLibraryColor as Tn, processingActive as En, providerIcon as Dn, queryClient as On, randomId as kn, rememberShape as An, require_jsx_runtime as jn, require_react as Mn, restartEffectText as Nn, saveCredential as Pn, schedulePollInterval as Fn, settingsPath as In, shellNavigate as Ln, sortCx as Rn, sourceDefaultCost as zn, useAction as Y, useClientUpdates as Bn, useLibraryTints as Vn, useMutation as Hn, useQuery as X, useQueryClient as Un, useReducedMotion as Wn, useRunSchedule as Gn, useSaveFollowSchedule as Kn, useSaveSettings as qn, useSaveThumbnailMode as Jn, we as Yn, z3 as Xn } from "./peach-app.js";
import { CodeBlock as Zn } from "./peach-app.code-block-6TfoDGLR.js";
import { FolderField as Qn, FolderFieldLine as $n, FolderRow as er, MEDIA_SOURCES as tr, MediaReadPolicy as nr, MediaReadPolicyHelp as rr, SourceSelect as ir, isCloudSource as ar, sourceMark as or, useFolderRows as sr } from "./peach-app.folder-rows-c6xBdYCX.js";
import { ConnectionStatus as cr } from "./peach-app.connection-status-B0tSnjj0.js";
import { SourceIcon as lr } from "./peach-app.source-view-Cr-fzNHo.js";
import { BrowserIcon as ur, browserIconId as dr } from "./peach-app.browser-icon-N9Od-bAf.js";
// src/react/settings/configuration-panel.ts
var Z = /* @__PURE__ */ Jt(Mn(), 1), fr = "flex flex-col gap-6";
function pr(e) {
	return e ? {
		className: e.active ? `${fr} ui-board-group-active` : fr,
		"data-board-group": String(e.index),
		id: e.id,
		role: "tabpanel",
		"aria-labelledby": e.labelledBy
	} : { className: fr };
}
// src/react/settings/userscript-probe.ts
function mr() {
	let e = (0, Z.useRef)(null), [t, n] = (0, Z.useState)(0), [r, i] = (0, Z.useState)("checking");
	return (0, Z.useEffect)(() => {
		let t = kn(), n = !1, r = e.current, a, o = () => {
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
var Q = jn();
function hr(e, t) {
	let n = e.split(".").map(Number), r = t.split(".").map(Number);
	for (let e = 0; e < 3; e++) if (n[e] !== r[e]) return n[e] > r[e];
	return !0;
}
function gr({ enabled: e, release: t }) {
	let { frame: n, attempt: r, status: i, retry: a } = mr(), o = typeof i == "object", s = o && !hr(i.version, t.minimum_version), c = o && !hr(i.version, t.version), l = i === "checking" ? "progress" : i === "missing" ? "neutral" : s || c || !i.paired ? "warning" : "success", u = i === "checking" ? "Detecting" : i === "missing" ? "Not detected" : s ? "Needs update" : c ? "Updatable" : i.paired ? "Connected" : "Pending pairing", d = i === "checking" ? "checking" : i === "missing" ? "missing" : s ? "required" : c ? "available" : i.paired ? e ? "enabled" : "disabled" : "unpaired";
	return /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)("iframe", {
		ref: n,
		title: "Peach userscript check",
		hidden: !0,
		src: "/integrations/peach-userscript-bridge"
	}, r), /* @__PURE__ */ (0, Q.jsxs)("div", {
		"aria-live": "polite",
		"data-userscript-status": "",
		className: $t({
			variant: "raised",
			bordered: "line",
			className: "flex flex-col gap-3"
		}),
		children: [
			/* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, Q.jsx)("span", {
					className: "text-body-medium text-text-primary",
					children: "Peach userscript"
				}), /* @__PURE__ */ (0, Q.jsx)(cr, {
					tone: l,
					children: /* @__PURE__ */ (0, Q.jsx)("span", {
						"data-copy-key": `userscript.${d}.status`,
						children: u
					})
				})]
			}),
			o ? /* @__PURE__ */ (0, Q.jsxs)("p", {
				"data-copy-key": "userscript.installed.version",
				className: "text-body-regular text-text-secondary",
				children: ["Userscript v", i.version]
			}) : null,
			/* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, Q.jsx)("span", {
					className: "text-body-regular text-text-secondary",
					children: "Add browser"
				}), /* @__PURE__ */ (0, Q.jsx)(H, {
					tone: e ? "success" : "neutral",
					children: /* @__PURE__ */ (0, Q.jsx)("span", {
						"data-copy-key": `userscript.adding.${e ? "enabled" : "disabled"}`,
						children: e ? "Enabled" : "Not enabled"
					})
				})]
			}),
			/* @__PURE__ */ (0, Q.jsx)("p", {
				"data-copy-key": `userscript.${d}.message`,
				className: "text-caption-1-regular text-text-secondary",
				children: i === "checking" ? "Detecting the userscript in the current browser." : i === "missing" ? "Confirm the script is enabled and updated to the latest version. On Chrome, also enable \"Allow user scripts\" or developer mode in the Tampermonkey extension details, and allow access to the current Peach site; refresh the page and check again." : s ? `Please update to v${t.minimum_version} or later.` : c ? `User script v${t.version} can be updated.` : i.paired ? e ? "Supported sites can add directly to your Peach library." : "With browser adding enabled, you can add to the Peach library directly on supported sites." : "Generate a token, copy the pairing info, then paste and save it in the userscript settings."
			}),
			/* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					i === "missing" || s || c ? /* @__PURE__ */ (0, Q.jsx)(A, {
						href: t.install_url,
						children: /* @__PURE__ */ (0, Q.jsx)("span", {
							"data-copy-key": `userscript.${i === "missing" ? "install" : "update"}.action`,
							children: s || c ? "Update the userscript" : "Install the Peach userscript"
						})
					}) : null,
					i === "missing" ? /* @__PURE__ */ (0, Q.jsx)(A, {
						href: "https://www.tampermonkey.net/faq.php#Q209",
						children: "Tampermonkey permission setup notes"
					}) : null,
					/* @__PURE__ */ (0, Q.jsx)(E, {
						variant: "secondary",
						type: "button",
						...K(i === "checking"),
						onClick: a,
						children: "Detect again"
					})
				]
			})
		]
	})] });
}
// src/react/settings/jav-browser-settings.tsx
var _r = "/api/configuration/jav-browser";
function vr({ receipt: e, refreshKey: t }) {
	let n = X({
		queryKey: ["jav-browser-settings", t],
		queryFn: ({ signal: e }) => W(_r, e),
		refetchOnMount: "always",
		refetchOnWindowFocus: "always"
	});
	return n.error && !n.data ? /* @__PURE__ */ (0, Q.jsx)(k, { children: q(n.error) }) : n.isFetching && !n.data ? /* @__PURE__ */ (0, Q.jsx)(It, {
		label: "Reading browser add settings",
		html: yn
	}) : n.data ? /* @__PURE__ */ (0, Q.jsx)(yr, {
		initial: n.data,
		receipt: e
	}) : null;
}
function yr({ initial: e, receipt: t }) {
	let [n, r] = (0, Z.useState)(e), [i, a] = (0, Z.useState)(e.provider), [o, s] = (0, Z.useState)(""), c = Y();
	(0, Z.useEffect)(() => {
		An("javBrowser", {
			enabled: e.enabled,
			ready: e.providers.some((t) => t.key === e.provider && t.configured && t.target)
		}), r(e), a((t) => e.providers.some((e) => e.key === t) ? t : e.provider), e.enabled || s("");
	}, [e]);
	let l = (e) => {
		c.run(e, (t) => G(_r, {
			action: e,
			provider: i
		}, "POST", t), (n) => {
			let { token: i = "", ...o } = n;
			r(o), a(o.provider), s(i), t(e === "disable" ? "Browser adding turned off" : "Dedicated token generated");
		});
	}, u = n.providers.some((e) => e.key === i && e.configured && e.target);
	return /* @__PURE__ */ (0, Q.jsxs)(L, {
		guide: "browser",
		title: "浏览器添加 JAV",
		children: [/* @__PURE__ */ (0, Q.jsxs)(V, { children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
			className: "flex min-w-0 flex-col gap-4",
			children: [
				/* @__PURE__ */ (0, Q.jsx)(gr, {
					enabled: n.enabled,
					release: n.userscript
				}),
				/* @__PURE__ */ (0, Q.jsxs)("div", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ (0, Q.jsx)(dt, { children: "Browser-added download channels" }), /* @__PURE__ */ (0, Q.jsx)(R, {
						"aria-label": "Browser-added download channels",
						selectedKey: i || null,
						placeholder: "'No channels available yet'",
						onSelectionChange: (e) => {
							e !== null && a(String(e));
						},
						isDisabled: !n.providers.length || !!c.busy,
						children: n.providers.map((e) => /* @__PURE__ */ (0, Q.jsx)(z, {
							id: e.key,
							textValue: e.label,
							children: /* @__PURE__ */ (0, Q.jsx)(Vt, {
								source: e.key,
								label: e.label
							})
						}, e.key))
					})]
				}),
				u ? null : /* @__PURE__ */ (0, Q.jsx)(N, { children: "Add a cloud-download-capable drive in the library and configure its account and target folder." }),
				n.problems?.map((e) => /* @__PURE__ */ (0, Q.jsx)(N, { children: e }, e)),
				n.enabled && n.active_provider && !n.providers.some((e) => e.key === n.active_provider) ? /* @__PURE__ */ (0, Q.jsx)(N, { children: "The enabled download channel is unavailable; choose a channel and update the token." }) : null,
				/* @__PURE__ */ (0, Q.jsx)(P, {
					label: "Peach address",
					value: window.location.origin,
					isReadOnly: !0,
					autoComplete: "off"
				}),
				o ? /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [
					/* @__PURE__ */ (0, Q.jsx)(P, {
						label: "Dedicated token for browser adds",
						type: "password",
						value: o,
						isReadOnly: !0,
						autoComplete: "new-password"
					}),
					/* @__PURE__ */ (0, Q.jsx)("div", { children: /* @__PURE__ */ (0, Q.jsx)(E, {
						variant: "secondary",
						type: "button",
						onClick: () => {
							c.run("copy", async () => navigator.clipboard.writeText(JSON.stringify({
								peach_pairing: 1,
								base: window.location.origin,
								token: o
							})), () => t("Pairing info copied"));
						},
						...K(c.busy === "copy"),
						children: "Copy the pairing info"
					}) }),
					/* @__PURE__ */ (0, Q.jsx)(N, { children: "Paste the pairing info into \"Peach address\" in the userscript settings to fill in the address and token." })
				] }) : null
			]
		}), c.error ? /* @__PURE__ */ (0, Q.jsx)(k, { children: c.error }) : null] }), /* @__PURE__ */ (0, Q.jsxs)(M, { children: [n.enabled ? /* @__PURE__ */ (0, Q.jsx)(E, {
			variant: "secondary",
			type: "button",
			disabled: !!c.busy,
			onClick: () => l("disable"),
			children: "Close browser add"
		}) : null, /* @__PURE__ */ (0, Q.jsx)(E, {
			type: "button",
			disabled: !n.available || !u || !!c.busy,
			onClick: () => l(n.enabled ? "rotate" : "enable"),
			...K(c.busy === "enable" || c.busy === "rotate"),
			children: n.enabled ? "Update channels and tokens" : "Enable and generate a token"
		})] })]
	});
}
// src/react/settings/download-settings.tsx
var br = "/api/configuration/downloads", xr = "/api/configuration/downloads/check", Sr = "/api/configuration/downloads/folder", Cr = "/api/configuration/downloads/pikpak/login", wr = "/api/configuration/downloads/pikpak/logout", Tr = "/api/configuration/downloads/pikpak/browser-login", Er = 2e3, Dr = Dn("pikpak");
function Or({ initial: e, receipt: t, panel: n, issues: r }) {
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		...pr(n),
		children: [r, e ? /* @__PURE__ */ (0, Q.jsx)(kr, {
			initial: e,
			receipt: t
		}) : null]
	});
}
function kr({ initial: e, receipt: t }) {
	let [n, r] = (0, Z.useState)(e), [i, a] = (0, Z.useState)("");
	(0, Z.useEffect)(() => {
		r((t) => ({
			...t,
			media_sources: e.media_sources,
			pikpak_roots: e.pikpak_roots
		}));
	}, [e.media_sources, e.pikpak_roots]);
	let o = n.media_sources ?? [], s = o.includes("pikpak"), c = o.some((e) => Ye.includes(e)), l = s && (n.pikpak.logged_in || !!i.trim());
	return /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [
		c ? /* @__PURE__ */ (0, Q.jsx)(Ar, {
			state: n,
			settle: r,
			receipt: t,
			pikpakAccount: l
		}) : null,
		s ? /* @__PURE__ */ (0, Q.jsx)(Nr, {
			state: n,
			settle: r,
			receipt: t,
			username: i,
			setUsername: a
		}) : null,
		/* @__PURE__ */ (0, Q.jsx)(vr, {
			receipt: t,
			refreshKey: JSON.stringify([
				n.media_sources,
				n.config,
				n.token_set,
				n.pikpak.logged_in
			])
		})
	] });
}
function Ar({ state: e, settle: t, receipt: n, pikpakAccount: r }) {
	let [i, a] = (0, Z.useState)(e.config), [o, s] = (0, Z.useState)(""), [c, l] = (0, Z.useState)(String(e.config.wait_hours)), [u, d] = (0, Z.useState)(null), [f, p] = (0, Z.useState)(""), [m, h] = (0, Z.useState)(jr), [g, _] = (0, Z.useState)(""), [v, y] = (0, Z.useState)(!1), b = Y(), x = e.media_sources ?? [], S = x.includes("115"), C = x.includes("pikpak"), w = (e) => i.targets[e] ?? "", T = (e, t) => a({
		...i,
		targets: {
			...i.targets,
			[e]: t
		}
	}), ee = S && !(!m.target || m.target.exists || w("115") !== m.target.path), te = (e, t, n = "") => {
		let r = t.target ? e.suggested_target : null, i = !!(r && n && r.path === n), o = t.root ? e.suggested_pikpak_root : "";
		a((n) => ({
			...n,
			clouddrive_address: t.address && e.address ? e.address : n.clouddrive_address,
			targets: r && !i ? {
				...n.targets,
				115: r.path
			} : n.targets,
			pikpak_root: o || n.pikpak_root
		})), d(e), p(t.address ? e.address : ""), h({
			target: r,
			root: o,
			saved: i
		}), y(!1), _("");
	};
	return (0, Z.useEffect)(() => {
		if (!e.available || !e.config.clouddrive_address || !e.token_set) return;
		let t = {
			address: !1,
			target: !e.config.targets[115],
			root: !e.config.pikpak_root
		};
		b.run("auto", (e) => W(xr, e), (e) => te(e, t), (e) => _(q(e)));
	}, []), /* @__PURE__ */ (0, Q.jsxs)(L, {
		guide: "download",
		title: "云下载",
		onSubmit: (e) => {
			if (e.preventDefault(), ee) {
				y(!0);
				return;
			}
			let u = !w("115").trim(), f = {
				...i,
				wait_hours: c,
				token: o,
				pikpak_account: r
			};
			b.run("save", (e) => G(br, f, "POST", e), (e) => {
				let { report: r, ...i } = e;
				t(i), a(i.config), l(String(i.config.wait_hours)), s(""), r ? te(r, {
					address: !i.config.clouddrive_address,
					target: u,
					root: !i.config.pikpak_root
				}, i.config.targets[115] ?? "") : (d(null), p(""), h(jr), y(!1), _("")), n("Configuration saved");
			}, (e) => _(q(e)));
		},
		children: [
			e.problems?.length ? /* @__PURE__ */ (0, Q.jsx)(V, { children: /* @__PURE__ */ (0, Q.jsx)(F, {
				tone: "error",
				title: "云下载配置需要检查",
				children: e.problems.join("\n")
			}) }) : null,
			/* @__PURE__ */ (0, Q.jsxs)(V, { children: [
				/* @__PURE__ */ (0, Q.jsx)(P, {
					label: "CloudDrive2 address",
					placeholder: "Leave empty to look up automatically",
					autoComplete: "off",
					maxLength: 200,
					value: i.clouddrive_address,
					isDisabled: !e.available,
					onChange: (e) => a({
						...i,
						clouddrive_address: e
					})
				}),
				/* @__PURE__ */ (0, Q.jsx)(P, {
					label: "CloudDrive2 API token",
					type: "password",
					autoComplete: "off",
					maxLength: 400,
					placeholder: e.token_set ? "Saved; leave empty to keep" : "Generated in CloudDrive2 under \"Settings → API tokens\"",
					hint: "Offline task permission required.",
					value: o,
					isDisabled: !e.available,
					onChange: s
				}),
				S ? /* @__PURE__ */ (0, Q.jsx)(P, {
					label: /* @__PURE__ */ (0, Q.jsx)(Vt, {
						source: "115",
						label: "115 target folder"
					}),
					placeholder: "Left empty, filled automatically from the library folder",
					autoComplete: "off",
					maxLength: 300,
					validationBehavior: "aria",
					isInvalid: ee,
					hint: ee ? v ? "Create this folder first, or fill in an existing one." : "This folder does not exist." : "Should sit inside the auto-intake cloud path prefix.",
					value: w("115"),
					isDisabled: !e.available,
					onChange: (e) => T("115", e)
				}) : null,
				C ? /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)(P, {
					label: /* @__PURE__ */ (0, Q.jsx)(Vt, {
						source: "pikpak",
						label: "PikPak target folder"
					}),
					placeholder: "A drive path starting with /",
					autoComplete: "off",
					maxLength: 300,
					hint: "The folder must already exist.",
					value: w("pikpak"),
					isDisabled: !e.available,
					onChange: (e) => T("pikpak", e)
				}), /* @__PURE__ */ (0, Q.jsxs)("div", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ (0, Q.jsx)(dt, { children: /* @__PURE__ */ (0, Q.jsx)(Vt, {
						source: "pikpak",
						label: "Media folder matching the PikPak root"
					}) }), e.pikpak_roots.length ? /* @__PURE__ */ (0, Q.jsx)(R, {
						"aria-label": "Media folder matching the PikPak root",
						selectedKey: i.pikpak_root || null,
						isDisabled: !e.available,
						placeholder: "Checking picks folders based on the library directories",
						onSelectionChange: (e) => a({
							...i,
							pikpak_root: e === null ? "" : String(e)
						}),
						children: e.pikpak_roots.map((e) => /* @__PURE__ */ (0, Q.jsx)(z, {
							id: e,
							children: e
						}, e))
					}) : /* @__PURE__ */ (0, Q.jsx)(N, { children: "Add the PikPak mount folder under \"Libraries and intake\" first." })]
				})] }) : null,
				/* @__PURE__ */ (0, Q.jsx)(P, {
					label: "Wait cap (hours)",
					type: "number",
					inputMode: "numeric",
					autoComplete: "off",
					hint: `Timeouts are marked stalled; enter 1–${e.max_wait_hours} hours.`,
					value: c,
					isDisabled: !e.available,
					onChange: l
				})
			] }),
			b.busy === "auto" ? /* @__PURE__ */ (0, Q.jsx)(V, {
				divided: !0,
				children: /* @__PURE__ */ (0, Q.jsx)(vt, { label: "Checking CloudDrive2" })
			}) : null,
			u ? /* @__PURE__ */ (0, Q.jsx)(Mr, {
				report: u,
				detected: f,
				suggested: m,
				create: e.available ? (e) => {
					let t = {
						clouddrive_address: i.clouddrive_address,
						token: o,
						path: e,
						pikpak_root: i.pikpak_root,
						pikpak_account: r
					};
					b.run("folder", (e) => G(Sr, t, "POST", e), (t) => {
						d(t), h((t) => ({
							...t,
							target: {
								path: e,
								exists: !0
							}
						})), y(!1), _(""), n("Catalog created");
					}, (e) => _(q(e)));
				} : void 0,
				creating: b.busy === "folder"
			}) : null,
			g || b.error ? /* @__PURE__ */ (0, Q.jsx)(V, {
				divided: !0,
				children: /* @__PURE__ */ (0, Q.jsx)(k, { children: g || b.error })
			}) : null,
			/* @__PURE__ */ (0, Q.jsxs)(M, {
				status: e.available ? void 0 : "Cloud download is only available on devices allowed to modify the database.",
				children: [/* @__PURE__ */ (0, Q.jsx)(E, {
					variant: "secondary",
					onClick: () => {
						let e = {
							address: !i.clouddrive_address.trim(),
							target: !w("115").trim(),
							root: !i.pikpak_root
						}, t = {
							clouddrive_address: i.clouddrive_address,
							token: o,
							target: w("115"),
							pikpak_root: i.pikpak_root,
							pikpak_account: r
						};
						b.run("check", (e) => G(xr, t, "POST", e), (t) => te(t, e), (e) => _(q(e)));
					},
					disabled: !e.available,
					...K(b.busy === "check"),
					children: "Check connection"
				}), /* @__PURE__ */ (0, Q.jsx)(E, {
					type: "submit",
					disabled: !e.available,
					...K(b.busy === "save"),
					children: "Save configuration"
				})]
			})
		]
	});
}
var jr = {
	target: null,
	root: "",
	saved: !1
};
function Mr({ report: e, detected: t, suggested: n, create: r, creating: i }) {
	let a = n.target, o = !!(t || a || n.root || e.permissions.length || e.folder || e.quota);
	return !o && !e.problems.length ? null : /* @__PURE__ */ (0, Q.jsxs)(V, {
		divided: !0,
		children: [o ? /* @__PURE__ */ (0, Q.jsxs)(ut, { children: [
			t ? /* @__PURE__ */ (0, Q.jsx)(j, {
				term: "CloudDrive2 address",
				children: `Detected ${t}; it takes effect once the configuration is saved`
			}) : null,
			a?.exists ? /* @__PURE__ */ (0, Q.jsx)(j, {
				term: /* @__PURE__ */ (0, Q.jsx)(Vt, {
					source: "115",
					label: "115 target folder"
				}),
				children: n.saved ? `Filled from the library folder as ${a.path}` : `Filled from the library folder as ${a.path}; it takes effect once the configuration is saved`
			}) : null,
			a && !a.exists ? /* @__PURE__ */ (0, Q.jsxs)(j, {
				term: /* @__PURE__ */ (0, Q.jsx)(Vt, {
					source: "115",
					label: "115 target folder"
				}),
				children: [`${a.path} does not exist`, r ? /* @__PURE__ */ (0, Q.jsx)(E, {
					variant: "secondary",
					size: "small",
					onClick: () => r(a.path),
					...K(i),
					children: "Create this folder"
				}) : null]
			}) : null,
			n.root ? /* @__PURE__ */ (0, Q.jsx)(j, {
				term: /* @__PURE__ */ (0, Q.jsx)(Vt, {
					source: "pikpak",
					label: "PikPak root"
				}),
				children: `Filled from the library folder as ${n.root}; it takes effect once the configuration is saved`
			}) : null,
			e.permissions.length ? /* @__PURE__ */ (0, Q.jsx)(j, {
				term: "Offline permission",
				children: e.missing.length ? e.missing.map((e) => /* @__PURE__ */ (0, Q.jsx)(et, {
					variant: "caption",
					color: "yellow",
					children: `Missing ${e}`
				}, e)) : /* @__PURE__ */ (0, Q.jsx)(et, {
					variant: "caption",
					color: "lime",
					children: "Complete"
				})
			}) : null,
			e.folder ? /* @__PURE__ */ (0, Q.jsx)(j, {
				term: "Target folder",
				children: e.folder.can_offline ? `${e.folder.path} supports offline download` : `${e.folder.path} does not support offline download`
			}) : null,
			e.quota ? /* @__PURE__ */ (0, Q.jsx)(j, {
				term: /* @__PURE__ */ (0, Q.jsx)(Vt, {
					source: "115",
					label: "115 offline quota"
				}),
				children: `${e.quota.left} of ${e.quota.total} left this month`
			}) : null
		] }) : null, e.problems.map((e) => /* @__PURE__ */ (0, Q.jsx)(k, { children: e }, e))]
	});
}
function Nr({ state: e, settle: t, receipt: n, username: r, setUsername: i }) {
	let [a, o] = (0, Z.useState)(""), [s, c] = (0, Z.useState)(!1), [l, u] = (0, Z.useState)(""), [d, f] = (0, Z.useState)(""), [p, m] = (0, Z.useState)(""), h = Y(), g = e.pikpak, _ = e.pikpak_browser, v = _.state === "waiting";
	(0, Z.useEffect)(() => {
		if (!v) return;
		let e = new AbortController(), r, i = async () => {
			try {
				let r = await W(Tr, e.signal);
				if (e.signal.aborted || (t(r), r.pikpak_browser.state === "done" ? n("Signed in to PikPak") : r.pikpak_browser.state !== "waiting" && m(r.pikpak_browser.message), r.pikpak_browser.state !== "waiting")) return;
			} catch (t) {
				if (e.signal.aborted) return;
				f(q(t));
			}
			r = setTimeout(i, Er);
		};
		return r = setTimeout(i, Er), () => {
			e.abort(), clearTimeout(r);
		};
	}, [v]);
	let y = () => {
		m(""), h.run("browser", (e) => G(Tr, {}, "POST", e), (e) => {
			t(e), f("");
		}, (e) => f(q(e)));
	}, b = () => {
		h.run("cancel", (e) => G(`${Tr}/cancel`, {}, "POST", e), (e) => {
			t(e), f(""), m(e.pikpak_browser.message);
		}, (e) => f(q(e)));
	}, x = (e) => {
		if (e.preventDefault(), g.logged_in) return;
		let i = {
			username: r,
			password: a,
			remember: s
		};
		h.run("login", (e) => G(Cr, i, "POST", e), (e) => {
			t(e.settings), f(""), e.ok ? (u(""), o(""), n("Signed in to PikPak")) : u(e.captcha_url ?? "");
		}, (e) => f(q(e)));
	}, S = () => {
		h.run("logout", (e) => G(wr, {}, "POST", e), (e) => {
			t(e), f(""), n("Signed out of PikPak");
		}, (e) => f(q(e)));
	}, C = /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [
		/* @__PURE__ */ (0, Q.jsx)(P, {
			label: "Account",
			placeholder: "Email or phone",
			autoComplete: "username",
			maxLength: 200,
			value: r,
			isDisabled: !e.available,
			onChange: i
		}),
		/* @__PURE__ */ (0, Q.jsx)(P, {
			label: "Password",
			type: "password",
			autoComplete: "current-password",
			maxLength: 200,
			value: a,
			isDisabled: !e.available,
			onChange: o
		}),
		/* @__PURE__ */ (0, Q.jsx)(D, {
			isSelected: s,
			isDisabled: !e.available,
			onChange: c,
			children: "Save the password and re-sign in automatically when the session expires"
		}),
		l ? /* @__PURE__ */ (0, Q.jsx)(F, {
			tone: "warning",
			title: "A human check is required",
			extra: /* @__PURE__ */ (0, Q.jsx)("div", {
				className: "pt-2",
				children: /* @__PURE__ */ (0, Q.jsx)(A, {
					href: l,
					children: "Open the PikPak verification page"
				})
			}),
			children: "After finishing verification in the browser, come back here and click Sign in again."
		}) : null
	] }), w = /* @__PURE__ */ (0, Q.jsx)(E, {
		type: "submit",
		variant: "primary",
		disabled: !e.available || v,
		...K(h.busy === "login"),
		children: "Sign in"
	}), T = _.state === "timeout" || _.state === "failed";
	return /* @__PURE__ */ (0, Q.jsxs)(L, {
		guide: "pikpak",
		title: "PikPak 账号",
		icon: /* @__PURE__ */ (0, Q.jsx)(Dr, {}),
		onSubmit: x,
		aside: /* @__PURE__ */ (0, Q.jsx)(H, {
			tone: g.logged_in ? "success" : v ? "progress" : T ? "error" : "neutral",
			children: g.logged_in ? "Signed in" : v ? "Waiting for sign-in" : T ? "Sign-in not completed" : "Not signed in"
		}),
		children: [
			g.logged_in ? /* @__PURE__ */ (0, Q.jsxs)(ut, { children: [/* @__PURE__ */ (0, Q.jsx)(j, {
				term: "Account",
				children: g.username || "Signed in"
			}), g.method === "browser" ? /* @__PURE__ */ (0, Q.jsx)(j, {
				term: "Sign-in method",
				children: "Browser sign-in, renewed by Peach"
			}) : /* @__PURE__ */ (0, Q.jsx)(j, {
				term: "Password",
				children: g.remember ? "Saved; re-signs-in automatically when the session expires" : "Not saved; after the session expires you must return here to sign in again"
			})] }) : /* @__PURE__ */ (0, Q.jsxs)(V, { children: [p ? T ? /* @__PURE__ */ (0, Q.jsx)(k, { children: p }) : /* @__PURE__ */ (0, Q.jsx)(N, {
				role: "status",
				children: p
			}) : null, C] }),
			d || h.error ? /* @__PURE__ */ (0, Q.jsx)(V, {
				divided: !0,
				children: /* @__PURE__ */ (0, Q.jsx)(k, { children: d || h.error })
			}) : null,
			/* @__PURE__ */ (0, Q.jsx)(M, {
				status: !g.logged_in && v ? /* @__PURE__ */ (0, Q.jsx)(vt, { label: _.message || "Waiting for you to sign in to PikPak in the browser window" }) : null,
				children: g.logged_in ? /* @__PURE__ */ (0, Q.jsx)(E, {
					variant: "secondary",
					onClick: S,
					disabled: !e.available,
					...K(h.busy === "logout"),
					children: "Sign out"
				}) : /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [_.available ? v ? /* @__PURE__ */ (0, Q.jsx)(E, {
					variant: "secondary",
					type: "button",
					onClick: b,
					...K(h.busy === "cancel"),
					children: "Cancel"
				}) : /* @__PURE__ */ (0, Q.jsx)(E, {
					variant: "secondary",
					type: "button",
					onClick: y,
					disabled: !e.available,
					...K(h.busy === "browser"),
					children: "Sign in with browser"
				}) : null, w] })
			})
		]
	});
}
// src/react/settings/ledger-backup-settings.tsx
var Pr = "/api/configuration/ledger-backups", Fr = 1500, Ir = (e) => (/* @__PURE__ */ new Date(e.modified_at * 1e3)).toLocaleString();
function Lr(e) {
	return [e.source === "manual" ? "手动" : `自动 · ${e.purpose}`, J(e.bytes)].join(" · ");
}
function Rr({ job: e, label: t }) {
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		"aria-live": "polite",
		className: "flex flex-col gap-2",
		children: [
			e.total ? /* @__PURE__ */ (0, Q.jsx)(jt, {
				label: t,
				value: e.done || 0,
				max: e.total
			}) : /* @__PURE__ */ (0, Q.jsx)(vt, { label: t }),
			/* @__PURE__ */ (0, Q.jsx)(N, { children: e.stage || t }),
			/* @__PURE__ */ (0, Q.jsx)(Wt, {})
		]
	});
}
function zr({ receipt: e }) {
	let [t, n] = (0, Z.useState)(null), [r, i] = (0, Z.useState)(""), a = Y(), o = t?.backup.status === "running", s = t?.restore.status === "running", c = o || s, l = (0, Z.useRef)({
		backup: !1,
		restore: !1
	});
	if ((0, Z.useEffect)(() => {
		let e = new AbortController();
		return W(Pr, e.signal).then(n, (t) => {
			e.signal.aborted || i(String(t?.message || t));
		}), () => e.abort();
	}, []), (0, Z.useEffect)(() => {
		if (!c) return;
		let e = new AbortController(), t = setTimeout(() => {
			W(Pr, e.signal).then(n, () => {
				e.signal.aborted || n((e) => e && { ...e });
			});
		}, Fr);
		return () => {
			e.abort(), clearTimeout(t);
		};
	}, [t]), (0, Z.useEffect)(() => {
		if (t) for (let n of ["backup", "restore"]) {
			let r = t[n];
			r.status === "running" ? l.current[n] = !0 : l.current[n] && (l.current[n] = !1, r.status === "complete" && e(n === "backup" ? `已备份账本：${r.name}` : `已从备份恢复账本，恢复前的账本另存为 ${r.saved}。刷新页面查看恢复后的资料`));
		}
	}, [t]), !t) return /* @__PURE__ */ (0, Q.jsx)(L, {
		id: "ledgerBackups",
		guide: "ledger-backups",
		title: "账本备份",
		children: /* @__PURE__ */ (0, Q.jsx)(V, { children: r ? /* @__PURE__ */ (0, Q.jsx)(k, { children: r }) : /* @__PURE__ */ (0, Q.jsx)(vt, { label: "正在读取备份列表" }) })
	});
	let u = () => void a.run("backup", (e) => G(`${Pr}/backup`, {}, "POST", e), n), d = (e) => void rn({
		title: "从备份恢复账本",
		danger: !0,
		body: `将用 ${Ir(e)} 的备份（${Lr(e)}）替换当前账本，此后的资料、观看记录与复核结论回到备份时的状态。替换前先把当前账本另存为一份备份；恢复期间不能启动新任务。`,
		confirmLabel: "替换当前账本",
		onConfirm: async () => {
			l.current.restore = !0, n(await G(`${Pr}/restore`, {
				id: e.id,
				confirm: !0
			}));
		}
	}), f = [t.backup, t.restore].find((e) => e.status === "failed"), p = t.last_restore, m = o ? "正在备份…" : s ? "正在恢复…" : t.backups.length ? `共 ${t.backups.length} 份可恢复的备份` : "还没有备份";
	return /* @__PURE__ */ (0, Q.jsxs)(L, {
		id: "ledgerBackups",
		guide: "ledger-backups",
		title: "账本备份",
		children: [
			/* @__PURE__ */ (0, Q.jsxs)(V, { children: [
				/* @__PURE__ */ (0, Q.jsx)(N, { children: "账本保存全部资料、观看记录与复核结论。手动备份与写入前的自动备份放在一起，保留最近 5 份和 24 小时内的备份。" }),
				t.writer ? null : /* @__PURE__ */ (0, Q.jsxs)(N, { children: ["这台电脑不是账本写入端，只能在写入端恢复：", t.writer_reason] }),
				o ? /* @__PURE__ */ (0, Q.jsx)(Rr, {
					job: t.backup,
					label: "备份进度"
				}) : null,
				s ? /* @__PURE__ */ (0, Q.jsx)(Rr, {
					job: t.restore,
					label: "恢复进度"
				}) : null,
				f ? /* @__PURE__ */ (0, Q.jsx)(k, { children: f.error || "任务没有完成" }) : null,
				p ? p.outcome === "kept" || p.outcome === "completed" ? /* @__PURE__ */ (0, Q.jsx)(N, { children: p.message }) : /* @__PURE__ */ (0, Q.jsx)(k, { children: p.message }) : null,
				a.error ? /* @__PURE__ */ (0, Q.jsx)(k, { children: a.error }) : null
			] }),
			t.backups.length ? /* @__PURE__ */ (0, Q.jsx)("div", {
				className: "border-t border-separator-border",
				"data-ledger-backups": "",
				children: /* @__PURE__ */ (0, Q.jsx)(I, { children: t.backups.map((e) => /* @__PURE__ */ (0, Q.jsx)(B, {
					label: Ir(e),
					description: Lr(e),
					children: /* @__PURE__ */ (0, Q.jsx)(E, {
						variant: "secondary",
						disabled: !t.writer || c,
						onClick: () => d(e),
						children: "恢复"
					})
				}, e.id)) })
			}) : null,
			/* @__PURE__ */ (0, Q.jsx)(M, {
				status: /* @__PURE__ */ (0, Q.jsx)("p", { children: m }),
				children: /* @__PURE__ */ (0, Q.jsx)(E, {
					disabled: c,
					onClick: u,
					...K(a.busy === "backup" || o),
					children: "立即备份"
				})
			})
		]
	});
}
// src/react/settings/library-sharing-settings.tsx
function Br({ initial: e, receipt: t }) {
	let [n, r] = (0, Z.useState)(e), [i, a] = (0, Z.useState)(null), [o, s] = (0, Z.useState)(!1), [c, l] = (0, Z.useState)(!1), u = (0, Z.useMemo)(() => i ? JSON.stringify(i.data, null, 2) : "", [i]), d = Y(), f = (e) => void d.run("save", (t) => G("/api/configuration/library-sharing", {
		enabled: e,
		schema: n.schema,
		consent: c,
		preview_token: i?.token
	}, "POST", t), (e) => {
		r(e), a(null), l(!1), s(!1), t("Saved library and taste upload options");
	}), p = () => {
		let e = URL.createObjectURL(new Blob([u], { type: "application/json" })), t = document.createElement("a");
		t.href = e, t.download = "peach-library-taste-preview.json", document.body.append(t);
		try {
			t.click();
		} finally {
			t.remove(), setTimeout(() => URL.revokeObjectURL(e), 1e3);
		}
	};
	return /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [
		/* @__PURE__ */ (0, Q.jsx)(I, { children: /* @__PURE__ */ (0, Q.jsx)(B, {
			label: "Upload library and taste details",
			description: n.notice,
			children: /* @__PURE__ */ (0, Q.jsx)(U, {
				"aria-label": "Upload library and taste details",
				isSelected: n.enabled,
				onChange: (e) => e ? s(!0) : f(!1),
				...K(d.busy === "save")
			})
		}) }),
		n.available ? null : /* @__PURE__ */ (0, Q.jsx)(V, {
			divided: !0,
			children: /* @__PURE__ */ (0, Q.jsx)("span", {
				className: "self-start",
				children: /* @__PURE__ */ (0, Q.jsx)(H, { children: "Upload service not configured" })
			})
		}),
		n.enabled && n.last_attempt?.status === "failed" ? /* @__PURE__ */ (0, Q.jsxs)(V, {
			divided: !0,
			children: [/* @__PURE__ */ (0, Q.jsx)("span", {
				className: "self-start",
				children: /* @__PURE__ */ (0, Q.jsx)(H, {
					tone: n.last_attempt.attempted ? "error" : "warning",
					children: n.last_attempt.attempted ? "Upload failed" : "Pending re-prep"
				})
			}), /* @__PURE__ */ (0, Q.jsx)(k, { children: n.last_attempt.attempted ? "Library and taste uploads failed; nothing more sends this week." : "Library and taste uploads did not finish and will re-prepare automatically." })]
		}) : null,
		n.enabled && n.last_attempt?.status === "waiting-data" ? /* @__PURE__ */ (0, Q.jsxs)(V, {
			divided: !0,
			children: [/* @__PURE__ */ (0, Q.jsx)("span", {
				className: "self-start",
				children: /* @__PURE__ */ (0, Q.jsx)(H, { children: "Waiting for data" })
			}), /* @__PURE__ */ (0, Q.jsx)(N, { children: "Waiting for library or preference data to analyze." })]
		}) : null,
		n.enabled && n.last_attempt?.status === "unknown" ? /* @__PURE__ */ (0, Q.jsxs)(V, {
			divided: !0,
			children: [/* @__PURE__ */ (0, Q.jsx)("span", {
				className: "self-start",
				children: /* @__PURE__ */ (0, Q.jsx)(H, {
					tone: "warning",
					children: "Result not fetched"
				})
			}), /* @__PURE__ */ (0, Q.jsx)(N, { children: "No upload result received; not sending again this week." })]
		}) : null,
		i ? /* @__PURE__ */ (0, Q.jsxs)(V, {
			divided: !0,
			children: [
				/* @__PURE__ */ (0, Q.jsxs)(N, { children: [
					"Current preview includes ",
					i.data.library.length,
					" coded videos, ",
					i.data.coverage.uncoded_items,
					" entries of uncoded library summarized, about ",
					(i.bytes / 1024).toFixed(1),
					" KiB. Excludes personal data such as accounts, devices, file paths, and browser history."
				] }),
				/* @__PURE__ */ (0, Q.jsx)(O, {
					summary: "Upload data preview",
					defaultOpen: !0,
					children: /* @__PURE__ */ (0, Q.jsx)(Zn, {
						code: u,
						language: "json",
						label: "Library and taste upload preview",
						maxCharacters: 24e3
					})
				}),
				u.length > 24e3 ? /* @__PURE__ */ (0, Q.jsx)(N, { children: "Showing the first 24,000 characters; download to view the full content." }) : null,
				/* @__PURE__ */ (0, Q.jsx)(E, {
					variant: "secondary",
					onClick: p,
					children: "Download the full preview"
				}),
				n.enabled ? null : /* @__PURE__ */ (0, Q.jsx)(D, {
					isSelected: c,
					onChange: l,
					children: "I reviewed the upload preview and consent to uploading library and taste details"
				})
			]
		}) : null,
		d.error ? /* @__PURE__ */ (0, Q.jsx)(V, {
			divided: !0,
			children: /* @__PURE__ */ (0, Q.jsx)(k, { children: d.error })
		}) : null,
		/* @__PURE__ */ (0, Q.jsxs)(M, { children: [
			o && !n.enabled ? /* @__PURE__ */ (0, Q.jsx)(E, {
				variant: "secondary",
				onClick: () => {
					s(!1), a(null), l(!1);
				},
				children: "Cancel"
			}) : null,
			/* @__PURE__ */ (0, Q.jsx)(E, {
				variant: "secondary",
				onClick: () => {
					s(!0), d.run("preview", (e) => W("/api/configuration/library-sharing/preview", e), (e) => {
						a(e), l(!1);
					});
				},
				...K(d.busy === "preview"),
				children: "Preview the upload contents"
			}),
			!n.enabled && i ? /* @__PURE__ */ (0, Q.jsx)(E, {
				variant: "primary",
				disabled: !c,
				onClick: () => f(!0),
				...K(d.busy === "save"),
				children: "Agree and enable upload"
			}) : null
		] })
	] });
}
// src/react/settings/remote-reporting-settings.tsx
function Vr({ value: e, onChange: t, busy: n = !1 }) {
	return /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)(I, { children: /* @__PURE__ */ (0, Q.jsx)(B, {
		label: "Send version statistics and error diagnostics (recommended)",
		description: "Uploads version, system info, failure type, code location, and occurrence count.",
		children: /* @__PURE__ */ (0, Q.jsx)(U, {
			"aria-label": "Send version statistics and error diagnostics (recommended)",
			isSelected: e.usage && e.errors,
			onChange: (n) => t({
				...e,
				usage: n,
				errors: n
			}),
			...K(n)
		})
	}) }), e.available ? null : /* @__PURE__ */ (0, Q.jsx)(V, {
		divided: !0,
		children: /* @__PURE__ */ (0, Q.jsx)("span", {
			className: "self-start",
			children: /* @__PURE__ */ (0, Q.jsx)(H, { children: "Upload service not configured" })
		})
	})] });
}
function Hr({ initial: e, receipt: t }) {
	let [n, r] = (0, Z.useState)(e), i = Y();
	return /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)(Vr, {
		value: n,
		busy: i.busy === "save",
		onChange: (e) => {
			i.run("save", (t) => G("/api/configuration/remote-reporting", {
				usage: e.usage,
				errors: e.errors
			}, "POST", t), (e) => {
				r(e), t("Diagnostic options saved");
			});
		}
	}), i.error ? /* @__PURE__ */ (0, Q.jsx)(V, {
		divided: !0,
		children: /* @__PURE__ */ (0, Q.jsx)(k, { children: i.error })
	}) : null] });
}
// src/react/components/animated-number.tsx
var Ur = .6;
function Wr({ value: e, format: t = (e) => Math.round(e).toLocaleString(), className: n }) {
	let r = Wn(), [i, a] = (0, Z.useState)(e), o = (0, Z.useRef)(e);
	return (0, Z.useEffect)(() => {
		if (r || o.current === e) {
			o.current = e, a(e);
			return;
		}
		let t = Xt(o.current, e, {
			duration: Ur,
			ease: "easeOut",
			onUpdate: (e) => {
				o.current = e, a(e);
			}
		});
		return () => t.stop();
	}, [e, r]), /* @__PURE__ */ (0, Q.jsx)("span", {
		className: n ? `tabular-nums ${n}` : "tabular-nums",
		children: t(i)
	});
}
// node_modules/recharts/es6/state/selectors/pieSelectors.js
function Gr(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function Kr(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Gr(Object(n), !0).forEach(function(t) {
			qr(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Gr(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function qr(e, t, n) {
	return (t = Jr(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Jr(e) {
	var t = Yr(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Yr(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var Xr = oe([De, (e, t) => t], (e, t) => e.filter((e) => e.type === "pie").find((e) => e.id === t)), Zr = [], Qr = (e, t, n) => n?.length === 0 ? Zr : n, $r = oe([
	Te,
	Xr,
	Qr
], (e, t, n) => {
	var r = e.chartData;
	if (t != null) {
		var i = t?.data != null && t.data.length > 0 ? t.data : r;
		if (i && i.length || n == null || (i = n.map((e) => Kr(Kr({}, t.presentationProps), e.props))), i != null) return i;
	}
}), ei = oe([
	$r,
	Xr,
	Qr
], (e, t, n) => {
	if (e != null && t != null) return e.map((e, r) => {
		var i, a = he(e, t.nameKey, t.name), o = n != null && (i = n[r]) != null && (i = i.props) != null && i.fill ? n[r].props.fill : typeof e == "object" && e && "fill" in e ? e.fill : t.fill;
		return {
			value: me(a, t.dataKey),
			dataKey: t.dataKey,
			color: o,
			payload: e,
			type: t.legendType
		};
	});
}), ti = oe([
	$r,
	Xr,
	Qr,
	Ee
], (e, t, n, r) => {
	if (t != null && e != null) return Ei({
		offset: r,
		pieSettings: t,
		displayedData: e,
		cells: n
	});
}), ni = ["key"], ri = [
	"onMouseEnter",
	"onClick",
	"onMouseLeave"
], ii = ["id"], ai = ["id"];
function oi() {
	return oi = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, oi.apply(null, arguments);
}
function si(e, t) {
	if (e == null) return {};
	var n, r, i = ci(e, t);
	if (Object.getOwnPropertySymbols) {
		var a = Object.getOwnPropertySymbols(e);
		for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) === -1 && {}.propertyIsEnumerable.call(e, n) && (i[n] = e[n]);
	}
	return i;
}
function ci(e, t) {
	if (e == null) return {};
	var n = {};
	for (var r in e) if ({}.hasOwnProperty.call(e, r)) {
		if (t.indexOf(r) !== -1) continue;
		n[r] = e[r];
	}
	return n;
}
function li(e, t) {
	var n = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var r = Object.getOwnPropertySymbols(e);
		t && (r = r.filter(function(t) {
			return Object.getOwnPropertyDescriptor(e, t).enumerable;
		})), n.push.apply(n, r);
	}
	return n;
}
function $(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? li(Object(n), !0).forEach(function(t) {
			ui(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : li(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function ui(e, t, n) {
	return (t = di(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function di(e) {
	var t = fi(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function fi(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var pi = S;
function mi(e) {
	var n = (0, Z.useMemo)(() => ce(e.children, t), [e.children]), r = Me((t) => ei(t, e.id, n));
	return r == null ? null : /*#__PURE__*/ Z.createElement(w, { legendPayload: r });
}
function hi(e) {
	if (e != null && typeof e != "boolean" && typeof e != "function") {
		if (/*#__PURE__*/ Z.isValidElement(e)) {
			var t = e.props?.fill;
			return typeof t == "string" ? t : void 0;
		}
		var n = e.fill;
		return typeof n == "string" ? n : void 0;
	}
}
var gi = /*#__PURE__*/ Z.memo((e) => {
	var t = e.dataKey, n = e.nameKey, r = e.sectors, i = e.stroke, a = e.strokeWidth, o = e.fill, s = e.name, c = e.hide, l = e.tooltipType, u = e.formatter, d = e.id, f = e.activeShape, p = hi(f), m = {
		dataDefinedOnItem: r.map((e) => {
			var t = e.tooltipPayload;
			return p == null || t == null ? t : t.map((e) => $($({}, e), {}, {
				color: p,
				fill: p
			}));
		}),
		getPosition: (e) => r[Number(e)]?.tooltipPosition,
		settings: {
			stroke: i,
			strokeWidth: a,
			fill: o,
			dataKey: t,
			nameKey: n,
			name: me(s, t),
			hide: c,
			type: l,
			color: o,
			unit: "",
			formatter: u,
			graphicalItemId: d
		}
	};
	return /*#__PURE__*/ Z.createElement(T, { tooltipEntrySettings: m });
}), _i = (e, t) => e > t ? "start" : e < t ? "end" : "middle", vi = (e, t, n) => pe(typeof t == "function" ? t(e) : t, n, n * .8), yi = (e, t, n) => {
	var r = t.top, i = t.left, a = t.width, o = t.height, s = fe(a, o);
	return {
		cx: i + pe(e.cx, a, a / 2),
		cy: r + pe(e.cy, o, o / 2),
		innerRadius: pe(e.innerRadius, s, 0),
		outerRadius: vi(n, e.outerRadius, s),
		maxRadius: e.maxRadius || Math.sqrt(a * a + o * o) / 2
	};
}, bi = (e, t) => ye(t - e) * Math.min(Math.abs(t - e), 360), xi = (e, t) => {
	if (/*#__PURE__*/ Z.isValidElement(e)) return /*#__PURE__*/ Z.cloneElement(e, t);
	if (typeof e == "function") return e(t);
	var n = tn("recharts-pie-label-line", typeof e == "boolean" ? "" : e.className);
	t.key;
	var r = si(t, ni);
	return /*#__PURE__*/ Z.createElement(l, oi({}, r, {
		type: "linear",
		className: n
	}));
}, Si = (e, t, n) => {
	if (/*#__PURE__*/ Z.isValidElement(e)) return /*#__PURE__*/ Z.cloneElement(e, t);
	var r = n;
	if (typeof e == "function" && (r = e(t), /*#__PURE__*/ Z.isValidElement(r))) return r;
	var i = tn("recharts-pie-label-text", ue(e));
	return /*#__PURE__*/ Z.createElement(ne, oi({}, t, {
		alignmentBaseline: "middle",
		className: i
	}), r);
};
function Ci(e) {
	var t = e.sectors, n = e.props, r = e.showLabels, i = n.label, a = n.labelLine, o = n.dataKey;
	if (!r || !i || !t) return null;
	var s = Oe(n), c = ke(i), l = ke(a), u = typeof i == "object" && "offsetRadius" in i && typeof i.offsetRadius == "number" && i.offsetRadius || 20, d = t.map((e, t) => {
		var n = (e.startAngle + e.endAngle) / 2, r = be(e.cx, e.cy, e.outerRadius + u, n), d = $($($($({}, s), e), {}, { stroke: "none" }, c), {}, {
			index: t,
			textAnchor: _i(r.x, e.cx)
		}, r), p = $($($($({}, s), e), {}, {
			fill: "none",
			stroke: e.fill
		}, l), {}, {
			index: t,
			points: [be(e.cx, e.cy, e.outerRadius, n), r],
			key: "line"
		});
		return /*#__PURE__*/ Z.createElement(re, {
			zIndex: f.label,
			key: `label-${e.startAngle}-${e.endAngle}-${e.midAngle}-${t}`
		}, /*#__PURE__*/ Z.createElement(g, null, a && xi(a, p), Si(i, d, he(e, o))));
	});
	return /*#__PURE__*/ Z.createElement(g, { className: "recharts-pie-labels" }, d);
}
function wi(e) {
	var t = e.sectors, n = e.props, r = e.showLabels, i = n.label;
	return typeof i == "object" && i && "position" in i ? /*#__PURE__*/ Z.createElement(h, { label: i }) : /*#__PURE__*/ Z.createElement(Ci, {
		sectors: t,
		props: n,
		showLabels: r
	});
}
function Ti(e) {
	var t = e.sectors, n = e.activeShape, r = e.inactiveShape, i = e.allOtherPieProps, a = e.shape, o = e.id, s = e.animationElapsedTime, c = e.isAnimating, l = e.isEntrance, f = Me(we), p = Me(Se), m = Me(Ce), h = i.onMouseEnter, _ = i.onClick, v = i.onMouseLeave, y = si(i, ri), b = Pe(h, i.dataKey, o), x = Fe(v), S = Ne(_, i.dataKey, o);
	return t == null || t.length === 0 ? null : /*#__PURE__*/ Z.createElement(Z.Fragment, null, t.map((e, h) => {
		if (e?.startAngle === 0 && e?.endAngle === 0 && t.length !== 1) return null;
		var _ = m == null || m === o, v = String(h) === f && (p == null || i.dataKey === p) && _, C = n && v ? n : f ? r : null, w = $($({}, e), {}, {
			stroke: e.stroke,
			tabIndex: -1,
			index: h,
			isActive: v,
			animationElapsedTime: s,
			isAnimating: c,
			isEntrance: l,
			[d]: h,
			[u]: o
		});
		return /*#__PURE__*/ Z.createElement(g, oi({
			key: `sector-${e?.startAngle}-${e?.endAngle}-${e.midAngle}-${h}`,
			tabIndex: -1,
			className: "recharts-pie-sector"
		}, ie(y, e, h), {
			onMouseEnter: b(e, h),
			onMouseLeave: x(e, h),
			onClick: S(e, h)
		}), /*#__PURE__*/ Z.createElement(ee, {
			option: C ?? a,
			DefaultShape: pi,
			shapeProps: w
		}));
	}));
}
function Ei(e) {
	var t = e.pieSettings, n = e.displayedData, r = e.cells, i = e.offset, a = t.cornerRadius, o = t.startAngle, s = t.endAngle, c = t.dataKey, l = t.nameKey, u = t.tooltipType, d = Math.abs(t.minAngle), f = bi(o, s), p = Math.abs(f), m = n.length <= 1 ? 0 : t.paddingAngle ?? 0, h = n.filter((e) => he(e, c, 0) !== 0).length, g = (p >= 360 ? h : h - 1) * m, _ = n.reduce((e, t) => {
		var n = he(t, c, 0);
		return e + (_e(n) ? n : 0);
	}, 0), v = d > 0 && _ > 0 && n.some((e) => {
		var t = he(e, c, 0), n = (_e(t) ? t : 0) / _;
		return t !== 0 && n * p < d;
	}) ? d : 0, y = p - h * v - g, b;
	if (_ > 0) {
		var x;
		b = n.map((e, n) => {
			var s = he(e, c, 0), d = he(e, l, n), p = yi(t, i, e), h = (_e(s) ? s : 0) / _, g, b = $($({}, e), r && r[n] && r[n].props), S = b != null && "fill" in b && typeof b.fill == "string" ? b.fill : t.fill;
			g = n ? x.endAngle + ye(f) * m * (s === 0 ? 0 : 1) : o;
			var C = g + ye(f) * ((s === 0 ? 0 : v) + h * y), w = (g + C) / 2, T = (p.innerRadius + p.outerRadius) / 2, ee = [{
				name: d,
				value: s,
				payload: b,
				dataKey: c,
				type: u,
				color: S,
				fill: S,
				graphicalItemId: t.id
			}], te = be(p.cx, p.cy, T, w);
			return x = $($($($({}, t.presentationProps), {}, {
				percent: h,
				cornerRadius: typeof a == "string" ? parseFloat(a) : a,
				name: d,
				tooltipPayload: ee,
				midAngle: w,
				middleRadius: T,
				tooltipPosition: te
			}, b), p), {}, {
				value: s,
				dataKey: c,
				startAngle: g,
				endAngle: C,
				payload: b,
				paddingAngle: s === 0 ? 0 : ye(f) * m
			}), x;
		});
	}
	return b;
}
function Di(e) {
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
	return /*#__PURE__*/ Z.createElement(b, { value: t ? i : void 0 }, r);
}
var Oi = (e, t) => {
	if (e == null) return [];
	var n = [], r = e.find((e) => e.status !== "removed"), i = r ? r.next.startAngle : 0;
	return e.forEach((e, r) => {
		if (e.status !== "removed") {
			var a = r > 0 ? le(e.next, "paddingAngle", 0) : 0;
			if (e.status === "matched") {
				var o = ge(e.prev.endAngle - e.prev.startAngle, e.next.endAngle - e.next.startAngle, t), s = $($({}, e.next), {}, {
					startAngle: i + a,
					endAngle: i + o + a
				});
				n.push(s), i = s.endAngle;
			} else {
				var c = ge(0, e.next.endAngle - e.next.startAngle, t), l = $($({}, e.next), {}, {
					startAngle: i + a,
					endAngle: i + c + a
				});
				n.push(l), i = l.endAngle;
			}
		}
	}), n;
};
function ki(t) {
	var n = t.props, r = t.previousSectorsRef, i = t.id, a = n.sectors, o = n.activeShape, s = n.inactiveShape, c = n.animationInterpolateFn, l = je(n.onAnimationStart, n.onAnimationEnd), u = l.isAnimating, d = l.handleAnimationStart, f = l.handleAnimationEnd, p = Ie();
	if (p == null) return null;
	var m = a[0];
	return /*#__PURE__*/ Z.createElement(Di, {
		showLabels: !u,
		sectors: a
	}, /*#__PURE__*/ Z.createElement(e, {
		animationInput: n,
		animationIdPrefix: "recharts-pie-",
		items: a,
		previousItemsRef: r,
		isAnimationActive: n.isAnimationActive,
		animationBegin: n.animationBegin,
		animationDuration: n.animationDuration,
		animationEasing: n.animationEasing,
		onAnimationStart: d,
		onAnimationEnd: f,
		animationInterpolateFn: c,
		animationMatchBy: n.animationMatchBy,
		layout: p
	}, (e, t, r) => /*#__PURE__*/ Z.createElement(g, null, /*#__PURE__*/ Z.createElement(Ti, {
		sectors: e,
		activeShape: o,
		inactiveShape: s,
		allOtherPieProps: n,
		shape: n.shape,
		id: i,
		animationElapsedTime: t,
		isAnimating: u || t < 1,
		isEntrance: r
	}))), /*#__PURE__*/ Z.createElement(wi, {
		showLabels: !u,
		sectors: a,
		props: n
	}), /*#__PURE__*/ Z.createElement(y, {
		cx: m?.cx ?? 0,
		cy: m?.cy ?? 0,
		innerRadius: m?.innerRadius ?? 0,
		outerRadius: m?.outerRadius ?? 0,
		startAngle: n.startAngle,
		endAngle: n.endAngle,
		clockWise: !1
	}, n.children));
}
var Ai = {
	animationBegin: 400,
	animationDuration: 1500,
	animationEasing: "ease",
	animationInterpolateFn: Oi,
	animationMatchBy: ve,
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
	shape: pi,
	startAngle: 0,
	stroke: "#fff",
	zIndex: f.area
};
function ji(e) {
	var n = e.id, r = si(e, ii), i = e.hide, a = e.className, o = e.rootTabIndex, s = (0, Z.useMemo)(() => ce(e.children, t), [e.children]), c = Me((e) => ti(e, n, s)), l = (0, Z.useRef)(null), u = tn("recharts-pie", a);
	return i || c == null ? (l.current = null, /*#__PURE__*/ Z.createElement(g, {
		tabIndex: o,
		className: u
	})) : /*#__PURE__*/ Z.createElement(re, { zIndex: e.zIndex }, /*#__PURE__*/ Z.createElement(gi, {
		dataKey: e.dataKey,
		nameKey: e.nameKey,
		sectors: c,
		stroke: e.stroke,
		strokeWidth: e.strokeWidth,
		fill: e.fill,
		name: e.name,
		hide: e.hide,
		tooltipType: e.tooltipType,
		formatter: e.formatter,
		id: n,
		activeShape: e.activeShape
	}), /*#__PURE__*/ Z.createElement(g, {
		tabIndex: o,
		className: u
	}, /*#__PURE__*/ Z.createElement(ki, {
		props: $($({}, r), {}, { sectors: c }),
		previousSectorsRef: l,
		id: n
	})));
}
function Mi(e) {
	var t = xe(e, Ai), n = t.id, r = si(t, ai), i = Oe(r);
	return /*#__PURE__*/ Z.createElement(x, {
		id: n,
		type: "pie"
	}, (e) => /*#__PURE__*/ Z.createElement(Z.Fragment, null, /*#__PURE__*/ Z.createElement(C, {
		type: "pie",
		id: e,
		data: r.data,
		dataKey: r.dataKey,
		hide: r.hide,
		angleAxisId: 0,
		radiusAxisId: 0,
		name: r.name,
		nameKey: r.nameKey,
		tooltipType: r.tooltipType,
		legendType: r.legendType,
		fill: r.fill,
		cx: r.cx,
		cy: r.cy,
		startAngle: r.startAngle,
		endAngle: r.endAngle,
		paddingAngle: r.paddingAngle,
		minAngle: r.minAngle,
		innerRadius: r.innerRadius,
		outerRadius: r.outerRadius,
		cornerRadius: r.cornerRadius,
		presentationProps: i,
		maxRadius: t.maxRadius
	}), /*#__PURE__*/ Z.createElement(mi, oi({}, r, { id: e })), /*#__PURE__*/ Z.createElement(ji, oi({}, r, { id: e }))));
}
var Ni = Mi;
Ni.displayName = "Pie";
// node_modules/recharts/es6/chart/PieChart.js
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
function Fi(e) {
	for (var t = 1; t < arguments.length; t++) {
		var n = arguments[t] == null ? {} : arguments[t];
		t % 2 ? Pi(Object(n), !0).forEach(function(t) {
			Ii(e, t, n[t]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : Pi(Object(n)).forEach(function(t) {
			Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
		});
	}
	return e;
}
function Ii(e, t, n) {
	return (t = Li(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Li(e) {
	var t = Ri(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Ri(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var zi = ["item"], Bi = Fi(Fi({}, se), {}, {
	layout: "centric",
	startAngle: 0,
	endAngle: 360
}), Vi = /*#__PURE__*/ (0, Z.forwardRef)((e, t) => {
	var n = xe(e, Bi);
	return /*#__PURE__*/ Z.createElement(v, {
		chartName: "PieChart",
		defaultTooltipEventType: "item",
		validateTooltipEventTypes: zi,
		tooltipPayloadSearcher: ae,
		categoricalChartProps: n,
		ref: t
	});
}), Hi = 5, Ui = 2e3, Wi = 0, Gi = "80%", Ki = 0, qi = 0, Ji = 0, Yi = 360, Xi = [], Zi = (0, Z.createContext)(null);
function Qi() {
	let e = (0, Z.use)(Zi);
	if (!e) throw Error("Pie chart parts (<Pie />, <Tooltip />, …) must be used within <EvilPieChart />");
	return e;
}
function $i({ config: e, data: t, dataKey: n, nameKey: i, children: a, className: o, chartProps: s, defaultSelectedSector: c = null, onSelectionChange: l, isLoading: u = !1 }) {
	let [d, f] = (0, Z.useState)(c), p = (0, Z.useCallback)((e) => {
		if (f(e), e === null) {
			l?.(null);
			return;
		}
		let r = t.find((t) => t[i] === e);
		r && l?.({
			dataKey: e,
			value: r[n]
		});
	}, [
		t,
		n,
		i,
		l
	]), m = (0, Z.useMemo)(() => ({
		config: e,
		data: t,
		dataKey: n,
		nameKey: i,
		isLoading: u,
		selectedSector: d,
		selectSector: p
	}), [
		e,
		t,
		n,
		i,
		u,
		d,
		p
	]);
	return /* @__PURE__ */ (0, Q.jsx)(Zi, {
		value: m,
		children: /* @__PURE__ */ (0, Q.jsxs)(r, {
			className: o,
			config: e,
			children: [/* @__PURE__ */ (0, Q.jsx)(_, { isLoading: u }), /* @__PURE__ */ (0, Q.jsx)(Vi, {
				id: "evil-charts-pie-chart",
				accessibilityLayer: !0,
				...s,
				children: a
			})]
		})
	});
}
function ea({ variant: e = "gradient", innerRadius: t = Wi, outerRadius: n = Gi, cornerRadius: r = Ki, paddingAngle: i = qi, startAngle: a = Ji, endAngle: o = Yi, isClickable: s = !1, glowingSectors: c = Xi, children: l, pieProps: u }) {
	let { config: d, data: f, dataKey: p, nameKey: m, isLoading: h, selectedSector: g, selectSector: _ } = Qi(), v = (0, Z.useId)().replace(/:/g, "");
	if (h) return /* @__PURE__ */ (0, Q.jsx)(Ni, {
		data: ca,
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
		shape: (e) => /* @__PURE__ */ (0, Q.jsx)(la, { ...e })
	});
	let y = aa(l, p), b = f.map((e) => ({
		...e,
		fill: `url(#${v}-colors-${e[m]})`
	}));
	return /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)(Ni, {
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
			return /* @__PURE__ */ (0, Q.jsx)(S, {
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
	}), /* @__PURE__ */ (0, Q.jsxs)("defs", { children: [/* @__PURE__ */ (0, Q.jsx)(oa, {
		id: v,
		config: d,
		variant: e
	}), c.length > 0 && /* @__PURE__ */ (0, Q.jsx)(sa, {
		id: v,
		glowingSectors: c
	})] })] });
}
var ta = () => null;
function na({ variant: e, roundness: t, defaultIndex: n }) {
	let { isLoading: r, nameKey: i } = Qi();
	return r ? null : /* @__PURE__ */ (0, Q.jsx)(s, {
		defaultIndex: n,
		content: /* @__PURE__ */ (0, Q.jsx)(c, {
			nameKey: i,
			hideLabel: !0,
			roundness: t,
			variant: e
		})
	});
}
function ra({ variant: e, align: t = "center", verticalAlign: n = "bottom", isClickable: r = !1 }) {
	let { nameKey: o, selectedSector: s, selectSector: c } = Qi();
	return /* @__PURE__ */ (0, Q.jsx)(i, {
		verticalAlign: n,
		align: t,
		content: /* @__PURE__ */ (0, Q.jsx)(a, {
			selected: s,
			onSelectChange: c,
			isClickable: r,
			nameKey: o,
			variant: e
		})
	});
}
function ia({ variant: e = "dots" }) {
	return /* @__PURE__ */ (0, Q.jsx)(n, { variant: e });
}
var aa = (e, t) => {
	let n = null;
	return Z.Children.forEach(e, (e) => {
		if (!(0, Z.isValidElement)(e) || e.type !== ta) return;
		let { dataKey: r, labelListProps: i } = e.props;
		n = /* @__PURE__ */ (0, Q.jsx)(m, {
			dataKey: r ?? t,
			stroke: "none",
			fontSize: 12,
			fontWeight: 500,
			fill: "currentColor",
			className: "fill-background",
			...i
		});
	}), n;
}, oa = ({ id: e, config: t }) => /* @__PURE__ */ (0, Q.jsx)(Q.Fragment, { children: Object.entries(t).map(([t, n]) => {
	let r = de(n);
	return /* @__PURE__ */ (0, Q.jsx)("linearGradient", {
		id: `${e}-colors-${t}`,
		x1: "0",
		y1: "0",
		x2: "1",
		y2: "1",
		children: r === 1 ? /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)("stop", {
			offset: "0%",
			stopColor: `var(--color-${t}-0)`
		}), /* @__PURE__ */ (0, Q.jsx)("stop", {
			offset: "100%",
			stopColor: `var(--color-${t}-0)`
		})] }) : Array.from({ length: r }, (e, n) => {
			let i = `${n / (r - 1) * 100}%`;
			return /* @__PURE__ */ (0, Q.jsx)("stop", {
				offset: i,
				stopColor: `var(--color-${t}-${n}, var(--color-${t}-0))`
			}, i);
		})
	}, `${e}-colors-${t}`);
}) }), sa = ({ id: e, glowingSectors: t }) => /* @__PURE__ */ (0, Q.jsx)(Q.Fragment, { children: t.map((t) => /* @__PURE__ */ (0, Q.jsxs)("filter", {
	id: `${e}-glow-${t}`,
	x: "-100%",
	y: "-100%",
	width: "300%",
	height: "300%",
	children: [
		/* @__PURE__ */ (0, Q.jsx)("feGaussianBlur", {
			in: "SourceGraphic",
			stdDeviation: "8",
			result: "blur"
		}),
		/* @__PURE__ */ (0, Q.jsx)("feColorMatrix", {
			in: "blur",
			type: "matrix",
			values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.5 0",
			result: "glow"
		}),
		/* @__PURE__ */ (0, Q.jsxs)("feMerge", { children: [/* @__PURE__ */ (0, Q.jsx)("feMergeNode", { in: "glow" }), /* @__PURE__ */ (0, Q.jsx)("feMergeNode", { in: "SourceGraphic" })] })
	]
}, `${e}-glow-${t}`)) }), ca = Array.from({ length: Hi }, (e, t) => ({
	name: `loading${t}`,
	value: 100 / Hi
})), la = (e) => {
	let { index: t = 0, ...n } = e, r = t / Hi * (Ui / 1e3);
	return /* @__PURE__ */ (0, Q.jsx)(Sn.g, {
		initial: { opacity: .15 },
		animate: { opacity: [
			.15,
			.5,
			.15
		] },
		transition: {
			duration: Ui / 1e3,
			delay: r,
			repeat: Infinity,
			ease: "easeInOut"
		},
		children: /* @__PURE__ */ (0, Q.jsx)(S, {
			...n,
			fill: "currentColor"
		})
	});
};
$i.Pie = ea, $i.Label = ta, $i.Tooltip = na, $i.Legend = ra, $i.Background = ia;
// src/react/settings/storage-charts.tsx
var ua = {
	database: "var(--color-chart-1)",
	backups: "var(--color-chart-2)",
	playback: "var(--color-chart-3)",
	thumbnails: "var(--color-chart-4)",
	previews: "var(--color-chart-5)",
	downloads: "var(--color-chart-6)",
	sources: "var(--color-chart-7)",
	records: "var(--color-chart-8)",
	tools: "var(--color-chart-9)"
}, da = "var(--color-text-tertiary)", fa = {
	database: "bg-chart-1",
	backups: "bg-chart-2",
	playback: "bg-chart-3",
	thumbnails: "bg-chart-4",
	previews: "bg-chart-5",
	downloads: "bg-chart-6",
	sources: "bg-chart-7",
	records: "bg-chart-8",
	tools: "bg-chart-9"
}, pa = (e) => J(e);
function ma(e) {
	let t = e.filter((e) => ua[e.key] && e.bytes > 0).map((e) => ({
		key: e.key,
		label: e.label,
		bytes: e.bytes,
		color: ua[e.key]
	})), n = e.filter((e) => !ua[e.key]).reduce((e, t) => e + t.bytes, 0);
	return n > 0 ? [...t, {
		key: "rest",
		label: "The rest",
		bytes: n,
		color: da
	}] : t;
}
function ha({ storage: e }) {
	let t = e.usage, n = ma(t.categories), r = Object.fromEntries(n.map((e) => [e.key, {
		label: e.label,
		colors: Ae(e.color)
	}])), i = n.map((e) => ({
		slice: e.key,
		value: e.bytes
	}));
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: "flex flex-col gap-5 md:flex-row md:items-center",
		children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
			className: "relative mx-auto size-48 flex-none",
			role: "img",
			"aria-label": `Data directory totals ${pa(t.total_bytes)}, breakdown by category`,
			children: [/* @__PURE__ */ (0, Q.jsxs)($i, {
				data: i,
				dataKey: "value",
				nameKey: "slice",
				config: r,
				className: "aspect-square size-48 flex-none",
				children: [/* @__PURE__ */ (0, Q.jsx)($i.Pie, {
					innerRadius: "68%",
					outerRadius: "100%",
					paddingAngle: 1,
					cornerRadius: 3
				}), /* @__PURE__ */ (0, Q.jsx)(o, {
					nameKey: "slice",
					hideLabel: !0,
					format: pa
				})]
			}), /* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "pointer-events-none absolute inset-0 flex flex-col items-center justify-center",
				children: [/* @__PURE__ */ (0, Q.jsx)("b", {
					className: "text-title-2-medium tabular-nums text-text-primary",
					children: pa(t.total_bytes)
				}), /* @__PURE__ */ (0, Q.jsxs)("small", {
					className: "text-caption-1-regular tabular-nums text-text-secondary",
					children: [t.total_files.toLocaleString(), " files on this disk"]
				})]
			})]
		}), /* @__PURE__ */ (0, Q.jsxs)("div", {
			className: "flex min-w-0 flex-1 flex-col gap-4",
			children: [/* @__PURE__ */ (0, Q.jsx)("ul", {
				className: "flex flex-wrap gap-x-4 gap-y-1.5",
				"aria-label": "Legend",
				children: n.map((e) => /* @__PURE__ */ (0, Q.jsxs)("li", {
					className: "flex items-center gap-1.5 text-caption-1-regular text-text-secondary",
					children: [
						/* @__PURE__ */ (0, Q.jsx)("i", {
							"aria-hidden": !0,
							className: `${te} ${fa[e.key] || "bg-text-tertiary"}`
						}),
						e.label,
						/* @__PURE__ */ (0, Q.jsx)("span", {
							className: "tabular-nums text-text-primary",
							children: pa(e.bytes)
						})
					]
				}, e.key))
			}), /* @__PURE__ */ (0, Q.jsx)(ga, { storage: e })]
		})]
	});
}
function ga({ storage: e }) {
	if (e.total_bytes === null || e.free_bytes === null || !e.usage) return null;
	let t = Math.min(e.usage.total_bytes, e.total_bytes), n = e.free_bytes, r = Math.max(0, e.total_bytes - n - t), i = {
		peach: {
			label: "Peach data",
			colors: Ae("var(--color-border-focus-ring)")
		},
		others: {
			label: "Other files",
			colors: Ae(da)
		},
		free: {
			label: "Available",
			colors: Ae("var(--color-background-tertiary-default)")
		}
	};
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: "flex flex-col gap-2",
		children: [/* @__PURE__ */ (0, Q.jsxs)("p", {
			className: "text-caption-1-regular text-text-secondary",
			children: [
				"A total of ",
				pa(e.total_bytes),
				e.system_drive ? "(system drive)" : "",
				", Peach uses ",
				((t) => {
					let n = t / e.total_bytes * 100;
					return n < .1 ? "Under 0.1%" : `${n.toFixed(+(n < 10))}%`;
				})(t),
				", free ",
				pa(n)
			]
		}), /* @__PURE__ */ (0, Q.jsxs)(p, {
			data: [{
				disk: "Disk",
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
				/* @__PURE__ */ (0, Q.jsx)(p.YAxis, {
					dataKey: "disk",
					hide: !0
				}),
				/* @__PURE__ */ (0, Q.jsx)(p.XAxis, { hide: !0 }),
				/* @__PURE__ */ (0, Q.jsx)(p.Bar, { dataKey: "peach" }),
				/* @__PURE__ */ (0, Q.jsx)(p.Bar, { dataKey: "others" }),
				/* @__PURE__ */ (0, Q.jsx)(p.Bar, { dataKey: "free" }),
				/* @__PURE__ */ (0, Q.jsx)(o, {
					hideLabel: !0,
					format: pa
				})
			]
		})]
	});
}
// src/react/settings/storage-settings.tsx
var _a = "/api/configuration/storage", va = 1500, ya = 864e5, ba = (e) => e instanceof qe && e.body?.errors?.target || q(e);
function xa(e) {
	if (e.free_bytes === null || e.total_bytes === null) return "Not fetched";
	let t = `${J(e.free_bytes)} free of ${J(e.total_bytes)}`;
	return e.system_drive ? `${t} (system disk)` : t;
}
var Sa = (e) => e.cleanable && e.reclaimable > 0;
function Ca({ job: e }) {
	let t = e.files || 0, n = e.expected_files || 0, r = /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [
		"Measured ",
		/* @__PURE__ */ (0, Q.jsx)(Wr, { value: t }),
		" files · ",
		/* @__PURE__ */ (0, Q.jsx)(Wr, {
			value: e.bytes || 0,
			format: J
		})
	] });
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		"aria-live": "polite",
		className: "flex flex-col gap-2",
		children: [n ? /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)(jt, {
			label: "Usage progress",
			value: Math.min(t, n * .99),
			max: n
		}), /* @__PURE__ */ (0, Q.jsxs)(N, { children: [
			r,
			", last time ",
			n.toLocaleString(),
			" items"
		] })] }) : /* @__PURE__ */ (0, Q.jsx)(vt, { label: "Measuring disk usage" }), n ? null : /* @__PURE__ */ (0, Q.jsx)(N, { children: r })]
	});
}
function wa({ category: e, selected: t, disabled: n, onToggle: r }) {
	let i = Sa(e), a = e.cleanable ? e.reclaimable > 0 ? `After cleanup, ${e.note}` : "No files to clean up" : `Cannot clean: ${e.note}`;
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		"data-category": e.key,
		className: "flex min-h-13 w-full items-start gap-3 border-b border-separator-border py-2.5 pr-3 last:border-b-0",
		children: [
			/* @__PURE__ */ (0, Q.jsx)(D, {
				"aria-label": `Clean ${e.label}`,
				isSelected: t,
				isDisabled: !i || n,
				onChange: r,
				className: "mt-0.5"
			}),
			/* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [
					/* @__PURE__ */ (0, Q.jsxs)("p", {
						className: "flex items-center gap-2 text-body-regular text-text-primary",
						children: [/* @__PURE__ */ (0, Q.jsx)("i", {
							"aria-hidden": !0,
							className: `size-2.5 shrink-0 rounded-xs ${fa[e.key] || "bg-text-tertiary"}`
						}), e.label]
					}),
					/* @__PURE__ */ (0, Q.jsx)("p", {
						className: "text-body-2-regular text-text-secondary",
						children: e.description
					}),
					/* @__PURE__ */ (0, Q.jsx)("p", {
						className: "text-caption-1-regular text-text-tertiary",
						children: a
					})
				]
			}),
			/* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex shrink-0 flex-col items-end gap-0.5 text-right",
				children: [/* @__PURE__ */ (0, Q.jsx)(Wr, {
					value: e.bytes,
					format: J,
					className: "text-body-regular text-text-primary"
				}), i ? /* @__PURE__ */ (0, Q.jsxs)("span", {
					className: "text-caption-1-regular text-text-secondary",
					children: ["Releasable ", J(e.reclaimable)]
				}) : null]
			})
		]
	});
}
function Ta({ initial: e, receipt: t }) {
	let [n, r] = (0, Z.useState)(e), [i, a] = (0, Z.useState)(""), [o, s] = (0, Z.useState)(/* @__PURE__ */ new Set()), c = Y(), l = n.job.state !== "idle", u = (0, Z.useRef)(l);
	(0, Z.useEffect)(() => {
		if (!l) return;
		let e = new AbortController(), t = setTimeout(() => {
			W(_a, e.signal).then(r, () => {
				e.signal.aborted || r((e) => ({ ...e }));
			});
		}, va);
		return () => {
			e.abort(), clearTimeout(t);
		};
	}, [n]), (0, Z.useEffect)(() => {
		l ? u.current = !0 : u.current && (u.current = !1, s(/* @__PURE__ */ new Set()), n.job.error || t(n.job.message || "Disk usage calculated"));
	}, [l]);
	let d = () => void c.run("measure", (e) => G(`${_a}/measure`, {}, "POST", e), r), f = n.usage, p = f?.categories.filter(Sa) ?? [], m = p.filter((e) => o.has(e.key)), h = (e, t) => {
		if (!e.length) return;
		let n = e.reduce((e, t) => e + t.reclaimable, 0);
		rn({
			title: t,
			body: `Will delete ${J(n)}: ${e.map((e) => `${e.label} ${J(e.reclaimable)} (${e.note} after cleanup)`).join("; ")}.`,
			confirmLabel: `Clean ${J(n)}`,
			danger: e.some((e) => e.key === "backups"),
			onConfirm: async () => r(await G(`${_a}/clean`, { categories: e.map((e) => e.key) }))
		});
	}, g = () => void c.run("relocate", async (e) => {
		let t = (await G(wt, { initial: n.data_root }, "POST", e)).path;
		if (!t) return;
		let r = n.usage ? J(n.usage.total_bytes) : "";
		await rn({
			title: "Migrate the data directory",
			body: `Move ${r} of data from ${n.data_root} to ${t}. Peach exits during the migration and reopens automatically when it is done; data at the old location is deleted after it has been verified at the new one.`,
			confirmLabel: "Migrate the data directory",
			onConfirm: async () => {
				try {
					a((await G(`${_a}/relocate`, { target: t })).message);
				} catch (e) {
					throw Error(ba(e));
				}
			}
		});
	}, () => void 0), _ = n.relocation.last, v = _ && (_.state === "error" || (_.notes?.length ?? 0) > 0 || Date.now() - _.finished_at * 1e3 < ya), y = f?.categories.find((e) => e.key === n.job.category)?.label, b = i || (n.job.state === "cleaning" ? `Cleaning${y || ""}…` : n.job.state === "measuring" ? "Calculating disk usage…" : m.length ? `${m.length} ${m.length === 1 ? "category" : "categories"} selected, ${J(m.reduce((e, t) => e + t.reclaimable, 0))} releasable` : f ? `Measured at ${(/* @__PURE__ */ new Date(f.measured_at * 1e3)).toLocaleString()}` : ""), x = l || !!i, S = (e) => (t) => s((n) => {
		let r = new Set(n);
		return t ? r.add(e) : r.delete(e), r;
	});
	return /* @__PURE__ */ (0, Q.jsxs)(L, {
		id: "storageSettings",
		guide: "storage",
		title: "存储空间",
		children: [
			/* @__PURE__ */ (0, Q.jsxs)(ut, { children: [/* @__PURE__ */ (0, Q.jsx)(j, {
				term: "Data directory",
				children: /* @__PURE__ */ (0, Q.jsx)(kt, {
					path: n.data_root,
					className: "text-body-regular text-text-primary",
					onRevealed: t
				})
			}), /* @__PURE__ */ (0, Q.jsx)(j, {
				term: "'Hosting disk'",
				children: xa(n)
			})] }),
			/* @__PURE__ */ (0, Q.jsxs)(V, {
				divided: !0,
				children: [
					n.job.state === "measuring" ? /* @__PURE__ */ (0, Q.jsx)(Ca, { job: n.job }) : null,
					f ? /* @__PURE__ */ (0, Q.jsxs)("div", {
						"data-storage-result": "",
						className: $t({
							variant: "outlined",
							padding: "none",
							className: "flex flex-col"
						}),
						children: [/* @__PURE__ */ (0, Q.jsx)("div", {
							className: "border-b border-separator-border p-4",
							children: /* @__PURE__ */ (0, Q.jsx)(ha, { storage: n })
						}), /* @__PURE__ */ (0, Q.jsx)("div", {
							className: "flex flex-col pl-4",
							children: f.categories.map((e) => /* @__PURE__ */ (0, Q.jsx)(wa, {
								category: e,
								selected: o.has(e.key),
								disabled: x,
								onToggle: S(e.key)
							}, e.key))
						})]
					}) : n.job.state === "measuring" ? null : /* @__PURE__ */ (0, Q.jsx)(N, { children: "After analysis, shows usage per data type and lets you clear the cache and old backups." }),
					n.relocation.available ? null : /* @__PURE__ */ (0, Q.jsx)(N, { children: n.relocation.message }),
					!n.relocation.available && n.relocation.steps?.length ? /* @__PURE__ */ (0, Q.jsx)(tt, {
						label: "在宿主机上迁移",
						steps: n.relocation.steps
					}) : null,
					n.job.error ? /* @__PURE__ */ (0, Q.jsx)(k, { children: n.job.message }) : null,
					c.error ? /* @__PURE__ */ (0, Q.jsx)(k, { children: c.error }) : null,
					v && _ ? _.state === "error" ? /* @__PURE__ */ (0, Q.jsx)(k, { children: _.message }) : /* @__PURE__ */ (0, Q.jsx)(N, { children: [_.message, ..._.notes ?? []].join("; ") }) : null
				]
			}),
			/* @__PURE__ */ (0, Q.jsxs)(M, {
				status: b ? /* @__PURE__ */ (0, Q.jsx)("p", {
					role: i ? "status" : void 0,
					children: b
				}) : null,
				children: [
					f ? /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)(E, {
						variant: "secondary",
						disabled: x || !m.length,
						...K(n.job.state === "cleaning" && m.length > 0),
						onClick: () => h(m, "Clean the selected data"),
						children: "Clean selected"
					}), /* @__PURE__ */ (0, Q.jsx)(E, {
						variant: "secondary",
						disabled: x || !p.length,
						onClick: () => h(p, "Clean every cleanable piece of data"),
						children: "Clean all"
					})] }) : null,
					/* @__PURE__ */ (0, Q.jsx)(E, {
						variant: "secondary",
						disabled: x || !n.relocation.available || !f,
						onClick: g,
						...K(c.busy === "relocate"),
						children: "Change location"
					}),
					/* @__PURE__ */ (0, Q.jsx)(E, {
						disabled: !!i || n.job.state === "cleaning",
						onClick: d,
						...K(c.busy === "measure" || n.job.state === "measuring"),
						children: f ? "Re-measure" : "Measure usage"
					})
				]
			})
		]
	});
}
// src/react/settings/maintenance-settings.tsx
var Ea = [
	["6", "Every 6 hours"],
	["24", "Daily"],
	["168", "Weekly"]
];
function Da({ data: e, receipt: t, reopenTutorial: n, panel: r }) {
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		...pr(r),
		children: [
			e.storage ? /* @__PURE__ */ (0, Q.jsx)(Ta, {
				initial: e.storage,
				receipt: t
			}) : null,
			e.storage ? /* @__PURE__ */ (0, Q.jsx)(zr, { receipt: t }) : null,
			e.remote_reporting || e.library_sharing ? /* @__PURE__ */ (0, Q.jsxs)(L, {
				id: "librarySharing",
				guide: "reporting",
				title: "数据上传",
				children: [e.remote_reporting ? /* @__PURE__ */ (0, Q.jsx)(Hr, {
					initial: e.remote_reporting,
					receipt: t
				}) : null, e.library_sharing ? /* @__PURE__ */ (0, Q.jsx)("div", {
					className: "border-t border-separator-border",
					children: /* @__PURE__ */ (0, Q.jsx)(Br, {
						initial: e.library_sharing,
						receipt: t
					})
				}) : null]
			}) : null,
			/* @__PURE__ */ (0, Q.jsx)(Aa, {
				facts: e.facts,
				receipt: t
			}),
			/* @__PURE__ */ (0, Q.jsx)(Oa, {
				receipt: t,
				reopenTutorial: n
			}),
			e.uninstall ? /* @__PURE__ */ (0, Q.jsx)(ja, {
				uninstall: e.uninstall,
				receipt: t
			}) : null
		]
	});
}
function Oa({ reopenTutorial: e }) {
	return /* @__PURE__ */ (0, Q.jsx)("section", {
		"aria-label": "新手教程",
		className: "w-full",
		children: /* @__PURE__ */ (0, Q.jsx)(zt, { children: /* @__PURE__ */ (0, Q.jsx)(I, { children: /* @__PURE__ */ (0, Q.jsx)(B, {
			label: "新手教程",
			description: "在所有设备上恢复右上角教程入口，保留已读进度",
			children: /* @__PURE__ */ (0, Q.jsx)(E, {
				variant: "secondary",
				onClick: () => void e(),
				children: "重新打开"
			})
		}) }) })
	});
}
function ka({ initial: e, receipt: t }) {
	let [n, r] = (0, Z.useState)(e.mode), [i, a] = (0, Z.useState)(e.interval_hours), o = Y(e.error), s = (r) => {
		r.preventDefault(), e.available && o.run("save", (e) => G("/api/configuration/automatic-updates", {
			mode: n,
			interval_hours: i
		}, "POST", e), () => t("Configuration saved"));
	}, c = e.available ? e.download_available ? "After downloading, confirm the restart install here." : void 0 : "Auto-update needs the tray-managed service.";
	return /* @__PURE__ */ (0, Q.jsxs)(L, {
		id: "automaticUpdates",
		guide: "automatic-updates",
		title: "自动更新",
		onSubmit: s,
		children: [
			/* @__PURE__ */ (0, Q.jsxs)(I, { children: [
				/* @__PURE__ */ (0, Q.jsx)(B, {
					label: "Automatically check for new versions",
					children: /* @__PURE__ */ (0, Q.jsx)(U, {
						"aria-label": "Automatically check for new versions",
						isSelected: n !== "off",
						isDisabled: !e.available,
						onChange: (e) => r(e ? "check" : "off")
					})
				}),
				/* @__PURE__ */ (0, Q.jsx)(B, {
					label: "自动下载更新",
					description: "发现新版本后先下载，重启安装前会询问。",
					children: /* @__PURE__ */ (0, Q.jsx)(U, {
						"aria-label": "自动下载更新",
						isSelected: n === "download",
						isDisabled: !e.available || !e.download_available || n === "off",
						onChange: (e) => r(e ? "download" : "check")
					})
				}),
				/* @__PURE__ */ (0, Q.jsx)(B, {
					label: "Check frequency",
					description: c,
					children: /* @__PURE__ */ (0, Q.jsx)(R, {
						"aria-label": "Check frequency",
						selectedKey: String(i),
						isDisabled: !e.available,
						onSelectionChange: (e) => {
							e !== null && a(Number(e));
						},
						children: Ea.map(([e, t]) => /* @__PURE__ */ (0, Q.jsx)(z, {
							id: e,
							children: t
						}, e))
					})
				})
			] }),
			o.error ? /* @__PURE__ */ (0, Q.jsx)(V, {
				divided: !0,
				children: /* @__PURE__ */ (0, Q.jsx)(k, { children: o.error })
			}) : null,
			/* @__PURE__ */ (0, Q.jsx)(M, { children: /* @__PURE__ */ (0, Q.jsx)(E, {
				type: "submit",
				disabled: !e.available,
				...K(o.busy === "save"),
				children: "Save configuration"
			}) })
		]
	});
}
function Aa({ facts: e, receipt: t }) {
	let [n, r] = (0, Z.useState)(null), i = n ?? e, a = Y(), o = (e) => void a.run(e, (t) => G("/api/configuration/media-tools", { tool: e }, "POST", t), (e) => {
		r(e.facts), t(e.message);
	});
	return /* @__PURE__ */ (0, Q.jsxs)(L, {
		guide: "facts",
		title: "运行信息",
		children: [/* @__PURE__ */ (0, Q.jsx)(ut, { children: i.map(({ term: e, value: t, install_tool: n, download_url: r, download_label: i }) => /* @__PURE__ */ (0, Q.jsx)(j, {
			term: e,
			children: n ? /* @__PURE__ */ (0, Q.jsxs)("span", {
				className: "flex min-w-0 items-center gap-3",
				children: [/* @__PURE__ */ (0, Q.jsx)("span", {
					className: "min-w-0",
					children: t
				}), /* @__PURE__ */ (0, Q.jsx)(E, {
					size: "small",
					className: "shrink-0",
					onClick: () => o(n),
					...K(a.busy === n),
					children: "安装"
				})]
			}) : /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [t, r ? /* @__PURE__ */ (0, Q.jsx)(A, {
				href: r,
				children: i
			}) : null] })
		}, e)) }), a.error ? /* @__PURE__ */ (0, Q.jsx)(k, { children: a.error }) : null]
	});
}
function ja({ uninstall: e, receipt: t }) {
	let [n, r] = (0, Z.useState)(!1), [i, a] = (0, Z.useState)(""), o = () => void rn({
		title: "Uninstall Peach",
		danger: !0,
		body: n ? "This quits Peach and removes the program, autostart, desktop icons, settings, the local database, watch history, credentials, and caches. Original media files are kept." : "Will quit Peach and remove the program, launch at startup and desktop icons. Settings, the local database, watch history, and caches are kept.",
		confirmLabel: "Uninstall Peach",
		onConfirm: async () => {
			let e = await G("/api/configuration/uninstall", {
				delete_data: n,
				confirmation: "Uninstall Peach"
			});
			a(e.message);
		}
	}), s = i || e.message, c = [.../* @__PURE__ */ new Set([e.data_root, ...e.directories])];
	return /* @__PURE__ */ (0, Q.jsxs)(L, {
		id: "uninstallPeach",
		guide: "uninstall",
		title: "卸载 Peach",
		children: [
			e.available ? /* @__PURE__ */ (0, Q.jsx)(V, { children: /* @__PURE__ */ (0, Q.jsx)(N, { children: "卸载移除 Peach 程序本身，原始媒体文件保留。" }) }) : null,
			/* @__PURE__ */ (0, Q.jsx)(I, { children: /* @__PURE__ */ (0, Q.jsx)(B, {
				label: "Full uninstall",
				description: "Also delete settings, the local database, watch history, credentials, and caches",
				children: /* @__PURE__ */ (0, Q.jsx)(U, {
					"aria-label": "Full uninstall",
					isSelected: n,
					isDisabled: !e.full_available || !!i,
					onChange: r
				})
			}) }),
			/* @__PURE__ */ (0, Q.jsx)(V, {
				divided: !0,
				children: /* @__PURE__ */ (0, Q.jsx)(O, {
					summary: "Data directory",
					children: c.map((e) => /* @__PURE__ */ (0, Q.jsx)(kt, {
						path: e,
						revealLabel: "Show in Explorer",
						className: "text-body-2-regular text-text-secondary",
						onRevealed: t
					}, e))
				})
			}),
			/* @__PURE__ */ (0, Q.jsx)(M, {
				status: s ? /* @__PURE__ */ (0, Q.jsx)("p", {
					role: i ? "status" : void 0,
					children: s
				}) : null,
				children: /* @__PURE__ */ (0, Q.jsx)(E, {
					variant: "danger",
					disabled: !e.available || !!i,
					onClick: o,
					children: "Uninstall Peach"
				})
			})
		]
	});
}
// src/react/settings/docker-update.tsx
var Ma = 3e3, Na = 9e5;
function Pa(e) {
	let [t, n] = (0, Z.useState)({ state: "idle" }), r = Y(), i = (0, Z.useRef)(0);
	return (0, Z.useEffect)(() => {
		if (t.state !== "updating") return;
		let r = new AbortController(), a, o = async () => {
			try {
				let t = (await W("/api/client-updates", r.signal)).runtime?.version;
				if (!r.signal.aborted && t && t !== e) {
					n({
						state: "done",
						version: t
					});
					return;
				}
			} catch {}
			r.signal.aborted || (Date.now() - i.current > Na ? n({ state: "timeout" }) : a = setTimeout(o, Ma));
		};
		return a = setTimeout(o, Ma), () => {
			r.abort(), clearTimeout(a);
		};
	}, [t.state, e]), {
		job: t,
		run: () => r.run("docker-update", (e) => G("/api/configuration/docker-update", {}, "POST", e), () => {
			i.current = Date.now(), n({ state: "updating" });
		}),
		busy: r.busy === "docker-update",
		error: r.error
	};
}
function Fa({ job: e }) {
	return e.state === "updating" ? /* @__PURE__ */ (0, Q.jsx)(N, {
		role: "status",
		children: "Watchtower 正在拉取新镜像并重建容器。期间 Peach 会断开一会儿，新版本启动后这里会提示刷新。"
	}) : e.state === "done" ? /* @__PURE__ */ (0, Q.jsxs)(N, {
		role: "status",
		children: [
			"已更新到 Peach ",
			e.version,
			"，刷新页面即可使用。"
		]
	}) : e.state === "timeout" ? /* @__PURE__ */ (0, Q.jsxs)(V, { children: [/* @__PURE__ */ (0, Q.jsx)(k, { children: "15 分钟内没有看到新版本启动。在 compose.yaml 所在目录查看 Watchtower 与 Peach 的日志：" }), /* @__PURE__ */ (0, Q.jsx)(tt, {
		label: "查看更新日志",
		steps: [{
			text: "Watchtower 的拉取与重建记录",
			command: "docker compose logs watchtower"
		}, {
			text: "Peach 的启动与数据库迁移记录",
			command: "docker compose logs peach"
		}]
	})] }) : null;
}
// src/react/settings/release-updates.tsx
var Ia = /* @__PURE__ */ new Set([
	"downloading",
	"verifying",
	"extracting",
	"preparing",
	"restarting",
	"installing"
]), La = [
	65,
	75,
	90
], Ra = 120, za = "https://github.com/peach-mitao/peach/releases";
function Ba({ initial: e, initialJob: t }) {
	let [n, r] = (0, Z.useState)(e), [i, a] = (0, Z.useState)(t || {
		state: "idle",
		progress: 0
	}), [o, s] = (0, Z.useState)(""), c = Y(), l = (0, Z.useRef)(!1), u = (0, Z.useRef)(!0), d = Ia.has(i.state), f = Pa(e.current_version), p = n.state === "available" && !!n.one_click?.available, m = f.job.state === "updating", h = () => void rn({
		title: "一键更新",
		body: `Watchtower 会拉取 Peach ${n.latest_version || ""} 的镜像并重建容器，/data 数据卷保留。重建期间 Peach 暂时断开，进行中的任务在启动后续跑；有待执行的数据库迁移时，启动前先备份再迁移。`,
		confirmLabel: "开始更新",
		cancelLabel: "取消",
		onConfirm: f.run
	});
	(0, Z.useEffect)(() => (u.current = !0, () => {
		u.current = !1;
	}), []);
	let g = async () => {
		let e = await G("/api/configuration/update-restart", {});
		u.current && a(e);
	}, _ = () => void rn({
		title: "The update is ready",
		body: `Peach ${i.version || ""} will be installed after a restart.`,
		confirmLabel: "Restart now",
		cancelLabel: "Later",
		onConfirm: g
	});
	(0, Z.useEffect)(() => {
		i.state !== "ready" || l.current || (l.current = !0, _());
	}, [i.state]), (0, Z.useEffect)(() => {
		let e = new AbortController(), t = Ia.has(i.state) ? 1e3 : 3e4, n, o = 0, c = async () => {
			try {
				let t = await W("/api/configuration/update-status", e.signal);
				if (e.signal.aborted) return;
				a(t), o = 0, t.state === "complete" && r((e) => ({
					...e,
					current_version: t.version || e.current_version,
					state: "current",
					message: "Already the latest beta."
				}));
				let n = await W("/api/configuration/automatic-updates", e.signal);
				!e.signal.aborted && n.result && r(n.result);
			} catch {
				o += 1, o >= Ra && !e.signal.aborted && s("Not connected to Peach yet; check the tray, then refresh the page.");
			}
			!e.signal.aborted && o < Ra && (n = setTimeout(c, t));
		};
		return n = setTimeout(c, t), () => {
			e.abort(), clearTimeout(n);
		};
	}, [i.state]);
	let v = () => {
		d || (l.current = !1, s(""), c.run("download", (e) => G("/api/configuration/update", {}, "POST", e), a));
	}, y = () => void c.run("check", (e) => W("/api/configuration/updates", e), r, (t) => {
		r({
			...e,
			state: "error"
		}), c.setError(q(t));
	}), b = c.error || o || f.error, x = i.state === "downloading" && i.total ? `${((i.downloaded || 0) / 1048576).toFixed(1)} / ${(i.total / 1048576).toFixed(1)} MB` : `${i.progress}%`;
	return /* @__PURE__ */ (0, Q.jsxs)(L, {
		id: "releaseUpdates",
		guide: "updates",
		title: "检查更新",
		aside: /* @__PURE__ */ (0, Q.jsx)(H, {
			tone: b || n.state === "error" || i.state === "error" || f.job.state === "timeout" ? "error" : d || m ? "progress" : f.job.state === "done" ? "success" : n.state === "available" ? "warning" : n.state === "unchecked" ? "neutral" : "success",
			children: b || n.state === "error" || i.state === "error" ? "检查未完成" : f.job.state === "timeout" ? "更新未完成" : d ? "准备更新中" : m ? "正在更新" : f.job.state === "done" ? "已更新" : i.state === "ready" ? "可安装" : n.state === "available" ? "有可用更新" : n.state === "unchecked" ? "尚未检查" : "检查完成"
		}),
		children: [
			/* @__PURE__ */ (0, Q.jsxs)(ut, { children: [
				/* @__PURE__ */ (0, Q.jsx)(j, {
					term: "当前版本",
					children: f.job.state === "done" ? f.job.version : n.current_version
				}),
				/* @__PURE__ */ (0, Q.jsx)(j, {
					term: "安装方式",
					children: n.installation
				}),
				/* @__PURE__ */ (0, Q.jsx)(j, {
					term: "更新通道",
					children: n.channel
				}),
				/* @__PURE__ */ (0, Q.jsx)(j, {
					term: "最新版本",
					children: n.latest_version || "未取得"
				}),
				n.package_kind ? /* @__PURE__ */ (0, Q.jsxs)(j, {
					term: "下载内容",
					children: [n.package_kind === "update" ? "应用更新包" : n.package_kind === "installer" ? "macOS 安装镜像" : "应用与工具", n.asset_size ? ` · ${(n.asset_size / 1048576).toFixed(1)} MB` : ""]
				}) : null
			] }),
			n.package_kind === "update" ? /* @__PURE__ */ (0, Q.jsx)(N, { children: "应用更新包复用已安装工具；工具缺失、损坏或版本变化时会另行下载所需工具包。" }) : n.package_kind === "full" ? /* @__PURE__ */ (0, Q.jsx)(N, { children: "本次更新包含媒体工具。" }) : n.package_kind === "installer" ? /* @__PURE__ */ (0, Q.jsx)(N, { children: "下载后打开镜像，把 Peach 拖入「应用程序」替换旧版本，数据目录与设置保留；提示已损坏时按发布页说明移除隔离标记。" }) : null,
			n.state === "unchecked" && !n.checked_at && !b && i.state === "idle" ? null : /* @__PURE__ */ (0, Q.jsxs)(V, {
				divided: !0,
				children: [
					n.checked_at ? /* @__PURE__ */ (0, Q.jsxs)(N, { children: ["检查于 ", (/* @__PURE__ */ new Date(n.checked_at * 1e3)).toLocaleString()] }) : null,
					f.job.state === "done" ? null : n.state === "available" && !b ? /* @__PURE__ */ (0, Q.jsx)(F, {
						tone: "info",
						title: "有可用更新",
						children: n.message
					}) : b || n.state === "error" ? /* @__PURE__ */ (0, Q.jsx)(k, { children: b || n.message }) : n.state === "unchecked" ? null : /* @__PURE__ */ (0, Q.jsx)(N, {
						role: "status",
						children: n.message
					}),
					n.state === "available" && !b && !p && f.job.state === "idle" && n.steps?.length ? /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)(tt, {
						label: "在宿主机上更新",
						steps: n.steps
					}), /* @__PURE__ */ (0, Q.jsx)(N, { children: n.one_click?.reason || "用 compose 的 watchtower profile 启动 Watchtower 后，可以在这里一键更新，启用前先读 Docker 部署说明。" })] }) : null,
					/* @__PURE__ */ (0, Q.jsx)(Fa, { job: f.job }),
					i.state === "error" ? /* @__PURE__ */ (0, Q.jsx)(k, { children: i.message }) : null,
					i.state !== "idle" && i.state !== "error" ? /* @__PURE__ */ (0, Q.jsxs)("div", {
						"aria-live": "polite",
						className: "flex flex-col gap-2",
						children: [
							/* @__PURE__ */ (0, Q.jsx)(jt, {
								label: "'Update preparation progress'",
								value: i.progress,
								stops: La
							}),
							/* @__PURE__ */ (0, Q.jsxs)(N, { children: ["Download → verify → extract → preparing install · ", i.message] }),
							/* @__PURE__ */ (0, Q.jsx)(N, { children: x })
						]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, Q.jsxs)(M, {
				status: /* @__PURE__ */ (0, Q.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [
						/* @__PURE__ */ (0, Q.jsx)(A, {
							href: "https://peach.video/#download",
							children: "Official site"
						}),
						/* @__PURE__ */ (0, Q.jsx)(A, {
							href: "https://github.com/peach-mitao/peach",
							children: "GitHub"
						}),
						/* @__PURE__ */ (0, Q.jsx)(A, {
							href: n.release_url || za,
							children: "View release page"
						})
					]
				}),
				children: [
					/* @__PURE__ */ (0, Q.jsx)(E, {
						variant: i.state === "ready" || p || n.state === "available" && n.installation === "独立测试包" ? "secondary" : "primary",
						disabled: d || m,
						onClick: y,
						...K(c.busy === "check"),
						children: "检查更新"
					}),
					f.job.state === "done" ? /* @__PURE__ */ (0, Q.jsx)(E, {
						variant: "primary",
						onClick: () => window.location.reload(),
						children: "刷新页面"
					}) : p ? /* @__PURE__ */ (0, Q.jsx)(E, {
						variant: "primary",
						onClick: h,
						...K(m || f.busy),
						children: "一键更新"
					}) : null,
					n.state === "available" && n.in_app_update && i.state !== "ready" ? /* @__PURE__ */ (0, Q.jsx)(E, {
						variant: "primary",
						onClick: v,
						...K(d || c.busy === "download"),
						children: "下载并安装"
					}) : n.state === "available" && n.installation === "独立测试包" && n.asset_url ? /* @__PURE__ */ (0, Q.jsx)(Je, {
						variant: "primary",
						href: n.asset_url,
						children: "下载新版本"
					}) : null,
					i.state === "ready" ? /* @__PURE__ */ (0, Q.jsx)(E, {
						variant: "primary",
						onClick: _,
						children: "重启安装"
					}) : null
				]
			})
		]
	});
}
// src/react/settings/upgrade-repairs.tsx
var Va = {
	pending: "Awaiting repair",
	running: "Repairing",
	failed: "Needs retry",
	review: "Needs review",
	complete: "Completed",
	unavailable: "Not enabled in this deployment"
};
function Ha() {
	let { snapshot: e } = Bn(), [t, n] = (0, Z.useState)(null), r = Y();
	(0, Z.useEffect)(() => n(null), [e]);
	let i = t ?? e?.repairs, a = i?.state || "pending", o = i?.items.reduce((e, t) => e + (t.pending || 0), 0) || 0, s = i?.items.reduce((e, t) => e + (t.failed || 0), 0) || 0, c = i?.items.reduce((e, t) => e + (t.review_count || 0), 0) || 0;
	return /* @__PURE__ */ (0, Q.jsxs)(L, {
		id: "upgradeRepairs",
		title: "Auto repair",
		aside: /* @__PURE__ */ (0, Q.jsx)(H, {
			tone: a === "failed" ? "error" : a === "running" ? "progress" : a === "review" ? "warning" : a === "complete" ? "success" : "neutral",
			children: /* @__PURE__ */ (0, Q.jsx)("span", {
				"data-copy-key": `upgradeRepairs.${a}.status`,
				children: Va[a] || "Not fetched"
			}, a)
		}),
		children: [
			/* @__PURE__ */ (0, Q.jsx)(V, { children: /* @__PURE__ */ (0, Q.jsx)(N, { children: "Profiles are fixed and caches refreshed automatically after the upgrade." }) }),
			/* @__PURE__ */ (0, Q.jsxs)(ut, { children: [
				/* @__PURE__ */ (0, Q.jsx)(j, {
					term: "To do",
					children: /* @__PURE__ */ (0, Q.jsxs)("span", { children: [/* @__PURE__ */ (0, Q.jsx)(Wr, { value: o }), " items"] })
				}),
				/* @__PURE__ */ (0, Q.jsx)(j, {
					term: "Failed",
					children: /* @__PURE__ */ (0, Q.jsxs)("span", { children: [/* @__PURE__ */ (0, Q.jsx)(Wr, { value: s }), " items"] })
				}),
				/* @__PURE__ */ (0, Q.jsx)(j, {
					term: "To review",
					children: /* @__PURE__ */ (0, Q.jsxs)("span", { children: [/* @__PURE__ */ (0, Q.jsx)(Wr, { value: c }), " items"] })
				})
			] }),
			i?.message || r.error ? /* @__PURE__ */ (0, Q.jsx)(V, { children: /* @__PURE__ */ (0, Q.jsx)(k, { children: r.error || i?.message }) }) : null,
			a === "running" ? /* @__PURE__ */ (0, Q.jsxs)(V, { children: [/* @__PURE__ */ (0, Q.jsx)(N, { children: "Details and previews are completing in the background." }), /* @__PURE__ */ (0, Q.jsx)(Wt, {})] }) : null,
			/* @__PURE__ */ (0, Q.jsx)(M, {
				status: c ? /* @__PURE__ */ (0, Q.jsx)(A, {
					href: "/api/configuration/upgrade-repairs/review",
					children: "Download the review records"
				}) : void 0,
				children: /* @__PURE__ */ (0, Q.jsx)(E, {
					size: "small",
					variant: "secondary",
					disabled: !i?.available || a === "running" || !!r.busy || !s && a !== "failed",
					onClick: () => void r.run("retry", (e) => G("/api/configuration/upgrade-repairs/retry", {}, "POST", e), (e) => {
						n(e), document.dispatchEvent(new Event("peach:client-updates"));
					}),
					children: "Retry failed items"
				})
			})
		]
	});
}
// src/react/settings/general-settings.tsx
function Ua({ data: e, receipt: t, panel: n }) {
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		...pr(n),
		children: [
			e.updates ? /* @__PURE__ */ (0, Q.jsx)(Ba, {
				initial: e.updates,
				initialJob: e.update_job
			}) : null,
			/* @__PURE__ */ (0, Q.jsx)(Ha, {}),
			e.automatic_updates ? /* @__PURE__ */ (0, Q.jsx)(ka, {
				initial: e.automatic_updates,
				receipt: t
			}) : null,
			e.startup ? /* @__PURE__ */ (0, Q.jsx)(Wa, {
				startup: e.startup,
				receipt: t
			}) : null
		]
	});
}
function Wa({ startup: e, receipt: t }) {
	let [n, r] = (0, Z.useState)(e.enabled), [i, a] = (0, Z.useState)(e.silent), [o, s] = (0, Z.useState)(e.desktop), c = Y(), l = e.available && !e.desktop_message;
	return /* @__PURE__ */ (0, Q.jsxs)(L, {
		guide: "startup",
		title: "开机自启",
		onSubmit: (r) => {
			r.preventDefault(), e.available && c.run("save", (e) => G("/api/configuration/startup", {
				enabled: n,
				silent: i,
				desktop: o
			}, "POST", e), () => t("Configuration saved"));
		},
		children: [
			/* @__PURE__ */ (0, Q.jsxs)(I, { children: [
				/* @__PURE__ */ (0, Q.jsx)(B, {
					label: "Start Peach after sign-in",
					children: /* @__PURE__ */ (0, Q.jsx)(U, {
						"aria-label": "Start Peach after sign-in",
						isSelected: n,
						isDisabled: !e.available,
						onChange: r
					})
				}),
				/* @__PURE__ */ (0, Q.jsx)(B, {
					label: "只启动托盘，不打开网页",
					description: "开机后在后台运行，需要时从托盘打开页面。",
					children: /* @__PURE__ */ (0, Q.jsx)(U, {
						"aria-label": "只启动托盘，不打开网页",
						isSelected: i,
						isDisabled: !e.available || !n,
						onChange: a
					})
				}),
				/* @__PURE__ */ (0, Q.jsx)(B, {
					label: "Create desktop shortcut",
					description: e.desktop_message || void 0,
					children: /* @__PURE__ */ (0, Q.jsx)(U, {
						"aria-label": "Create desktop shortcut",
						isSelected: o,
						isDisabled: !l,
						onChange: s
					})
				})
			] }),
			e.message || c.error ? /* @__PURE__ */ (0, Q.jsxs)(V, {
				divided: !0,
				children: [e.message ? /* @__PURE__ */ (0, Q.jsx)(N, { children: e.message }) : null, c.error ? /* @__PURE__ */ (0, Q.jsx)(k, { children: c.error }) : null]
			}) : null,
			/* @__PURE__ */ (0, Q.jsx)(M, { children: /* @__PURE__ */ (0, Q.jsx)(E, {
				type: "submit",
				disabled: !e.available,
				...K(c.busy === "save"),
				children: "Save configuration"
			}) })
		]
	});
}
// src/react/restart-redirect.ts
var Ga = 8e3, Ka = [
	{
		name: "Hard disk drive, or up to 8 GB memory",
		cache: "10–20 GiB",
		read: "256 / 128 KB",
		task: "1 item"
	},
	{
		name: "SATA SSD with 8-16 GB memory",
		cache: "20–50 GiB",
		read: "256 / 128 KB",
		task: "1–2 items"
	},
	{
		name: "NVMe SSD with 16 GB+ memory",
		cache: "50–100 GiB",
		read: "256 / 128 KB",
		task: "Minimum 2"
	}
], qa = [
	["cache", "Cache cap"],
	["read", "Read length (default / min)"],
	["task", "Process videos too"]
];
function Ja() {
	return /* @__PURE__ */ (0, Q.jsx)("div", {
		className: "@container flex flex-col gap-3",
		children: /* @__PURE__ */ (0, Q.jsxs)(O, {
			summary: "CloudDrive setup help",
			children: [
				/* @__PURE__ */ (0, Q.jsxs)(N, { children: ["First mount the cloud drive from CloudDrive2 or OpenList as a local folder, then choose it here.", /* @__PURE__ */ (0, Q.jsx)(A, {
					href: "https://www.clouddrive2.com/help.html",
					children: "Mount help"
				})] }),
				/* @__PURE__ */ (0, Q.jsx)(N, { children: "The cache picks its starting value from the hosting disk and free memory, then adjusts to playback behavior." }),
				/* @__PURE__ */ (0, Q.jsx)(N, { children: "File operations need the mount tool and write permission granted by the cloud drive account. Uploading, creating folders, renaming, and moving on the Guangya cloud drive require CloudDrive2 v1.1.0 or later; deletion and copy are not supported yet." }),
				/* @__PURE__ */ (0, Q.jsx)("ul", {
					"aria-label": "Tiered by cache disk",
					className: "flex flex-col gap-2",
					children: Ka.map((e) => /* @__PURE__ */ (0, Q.jsxs)("li", {
						className: "flex flex-col gap-2 rounded-2lg border border-separator-border bg-background-primary-default p-3",
						children: [/* @__PURE__ */ (0, Q.jsx)("p", {
							className: "text-body-medium text-text-primary",
							children: e.name
						}), /* @__PURE__ */ (0, Q.jsx)("dl", {
							className: "inline-grid grid-cols-1 gap-2 @md:grid-cols-3",
							children: qa.map(([t, n]) => /* @__PURE__ */ (0, Q.jsxs)("div", {
								className: "flex flex-col",
								children: [/* @__PURE__ */ (0, Q.jsx)("dt", {
									className: "text-caption-1-regular text-text-secondary",
									children: n
								}), /* @__PURE__ */ (0, Q.jsx)("dd", {
									className: "text-body-regular text-text-primary",
									children: e[t]
								})]
							}, t))
						})]
					}, e.name))
				}),
				/* @__PURE__ */ (0, Q.jsxs)("ul", {
					className: "flex list-disc flex-col gap-1 pl-5 text-body-2-regular text-text-secondary",
					children: [
						/* @__PURE__ */ (0, Q.jsx)("li", { children: "Fill in the cache limit and cleanup mode under CloudDrive \"Settings\", choosing LRU for cleanup. Do not set the limit to 0, and leave at least 40 GiB on the system disk; reopen the settings page after filling it in to confirm it persisted." }),
						/* @__PURE__ */ (0, Q.jsx)("li", { children: "Read length and download threads go in each cloud drive's own download settings, with threads starting at 2." }),
						/* @__PURE__ */ (0, Q.jsx)("li", { children: "Buffer Cache uses memory; disk cache and folder cache use disk; changing one does not govern the other two." })
					]
				}),
				/* @__PURE__ */ (0, Q.jsx)(N, { children: /* @__PURE__ */ (0, Q.jsx)(A, {
					href: "https://github.com/peach-mitao/peach/blob/master/docs/CLOUDDRIVE.md",
					children: "Full configuration and tuning guide"
				}) })
			]
		})
	});
}
// src/react/settings/cloud-proxy-settings.tsx
var Ya = "/api/configuration/cloud-proxies", Xa = [
	["direct", "Direct"],
	["system", "Follow system"],
	["http", "HTTP proxy"],
	["socks5", "SOCKS5 proxy"]
];
function Za({ receipt: e }) {
	let [t, n] = (0, Z.useState)(null), [r, i] = (0, Z.useState)(!0), a = (0, Z.useRef)(/* @__PURE__ */ new Set()), o = (0, Z.useRef)(/* @__PURE__ */ new Set()), [s, c] = (0, Z.useState)(!1), l = (0, Z.useRef)(() => void 0), u = Y(), d = () => {
		o.current.size || u.run("refresh", (e) => W(Ya, e), (e) => {
			a.current.clear(), n(e), i(!1);
		}, (e) => {
			i(!1), u.setError(e instanceof Error ? e.message : "The drive proxy could not be read");
		});
	};
	return l.current = d, (0, Z.useEffect)(() => {
		l.current();
		let e = () => {
			a.current.size || l.current();
		};
		return window.addEventListener("focus", e), () => window.removeEventListener("focus", e);
	}, []), (0, Z.useEffect)(() => {
		if (!t) return;
		let e = (e) => e.mode === "http" || e.mode === "socks5";
		An("cloudProxy", {
			configured: t.configured !== !1,
			unlinked: t.unlinked?.length ?? 0,
			accounts: t.accounts.map((t) => [e(t.data), e(t.api)])
		});
	}, [t]), r ? /* @__PURE__ */ (0, Q.jsx)(It, {
		label: "正在读取网盘代理",
		html: en
	}) : /* @__PURE__ */ (0, Q.jsxs)(L, {
		guide: "cloud-proxy",
		title: "CloudDrive 代理",
		children: [/* @__PURE__ */ (0, Q.jsxs)(V, { children: [/* @__PURE__ */ (0, Q.jsx)(N, { children: Xe }), /* @__PURE__ */ (0, Q.jsxs)("div", {
			className: "flex min-w-0 flex-col gap-4",
			children: [
				u.error ? /* @__PURE__ */ (0, Q.jsxs)(F, {
					tone: "error",
					title: "The configuration was not read",
					children: [
						u.error,
						" ",
						/* @__PURE__ */ (0, Q.jsx)(_t, {
							href: "/settings/downloads",
							size: "small",
							children: "Download settings"
						})
					]
				}) : null,
				t?.configured === !1 ? /* @__PURE__ */ (0, Q.jsxs)(N, { children: ["After filling in the CloudDrive2 address and API token, set a proxy for each cloud drive account here. ", /* @__PURE__ */ (0, Q.jsx)(_t, {
					href: "/settings/downloads",
					size: "small",
					children: "Download settings"
				})] }) : t?.accounts.length === 0 && !t.unlinked?.length ? /* @__PURE__ */ (0, Q.jsx)(N, { children: "No library uses CloudDrive yet." }) : null,
				t?.unlinked?.map((e) => /* @__PURE__ */ (0, Q.jsxs)("div", {
					className: "flex min-w-0 flex-col gap-1",
					children: [/* @__PURE__ */ (0, Q.jsx)(dt, { children: /* @__PURE__ */ (0, Q.jsxs)("span", {
						className: "inline-flex items-center gap-2",
						children: [/* @__PURE__ */ (0, Q.jsx)(Ht, { mark: or(e.location) }), e.name]
					}) }), /* @__PURE__ */ (0, Q.jsx)(N, { children: "No CloudDrive account matched yet" })]
				}, e.root)),
				t?.accounts.map((t) => /* @__PURE__ */ (0, Q.jsx)(Qa, {
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
		})] }), /* @__PURE__ */ (0, Q.jsx)(M, { children: /* @__PURE__ */ (0, Q.jsx)(E, {
			variant: "secondary",
			disabled: s,
			onClick: d,
			...K(u.busy === "refresh"),
			children: "Read again"
		}) })]
	});
}
function Qa({ initial: e, receipt: t, onDirty: n, onSaved: r, onSaving: i }) {
	let [a, o] = (0, Z.useState)(e), [s, c] = (0, Z.useState)([]), l = a.libraries?.map((e) => e.name).join(", ") || a.name, u = Y(), d = (e, t) => {
		o((n) => ({
			...n,
			[e]: t
		})), c((t) => t.includes(e) ? t : [...t, e]), n();
	};
	return /* @__PURE__ */ (0, Q.jsxs)("form", {
		"aria-label": `${l} proxy`,
		onSubmit: (e) => {
			e.preventDefault(), i(!0), u.run("save", (e) => G(Ya, {
				id: a.id,
				revision: a.revision,
				...s.includes("api") ? { api: a.api } : {},
				...s.includes("data") ? { data: a.data } : {}
			}, "POST", e), (e) => {
				o(e), c([]), r(e), t("CloudDrive proxy saved");
			}).finally(() => i(!1));
		},
		className: "flex min-w-0 flex-col gap-4 border-t border-separator-border pt-4",
		children: [
			/* @__PURE__ */ (0, Q.jsx)(dt, { children: /* @__PURE__ */ (0, Q.jsxs)("span", {
				className: "inline-flex items-center gap-2",
				children: [/* @__PURE__ */ (0, Q.jsx)(Ht, { mark: or(a.libraries?.[0]?.location || (a.cloud === "115open" ? "115" : a.cloud.toLowerCase())) }), l]
			}) }),
			/* @__PURE__ */ (0, Q.jsxs)(N, { children: [
				a.name,
				" · ",
				a.path
			] }),
			/* @__PURE__ */ (0, Q.jsx)($a, {
				label: "Data proxy",
				value: a.data,
				disabled: !a.writable || !!u.busy,
				onChange: (e) => d("data", e)
			}),
			/* @__PURE__ */ (0, Q.jsx)($a, {
				label: "API proxy",
				value: a.api,
				disabled: !a.writable || !!u.busy,
				onChange: (e) => d("api", e)
			}),
			a.writable ? null : /* @__PURE__ */ (0, Q.jsx)(N, { children: "The API token needs the \"modify drives\" permission to save." }),
			u.error ? /* @__PURE__ */ (0, Q.jsx)(F, {
				tone: "error",
				title: "Not saved",
				children: u.error
			}) : null,
			/* @__PURE__ */ (0, Q.jsx)("div", {
				className: "flex justify-end",
				children: /* @__PURE__ */ (0, Q.jsx)(E, {
					type: "submit",
					disabled: !a.writable || !s.length,
					...K(u.busy === "save"),
					children: "Save configuration"
				})
			})
		]
	});
}
function $a({ label: e, value: t, disabled: n, onChange: r }) {
	let i = t.mode === "http" || t.mode === "socks5";
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: "flex min-w-0 flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, Q.jsx)(dt, { children: e }),
			/* @__PURE__ */ (0, Q.jsxs)(R, {
				"aria-label": e,
				selectedKey: t.mode,
				isDisabled: n,
				onSelectionChange: (e) => {
					e && r({
						...t,
						mode: String(e)
					});
				},
				children: [t.mode === "unknown" ? /* @__PURE__ */ (0, Q.jsx)(z, {
					id: "unknown",
					children: "Unrecognized proxy type"
				}) : null, Xa.map(([e, t]) => /* @__PURE__ */ (0, Q.jsx)(z, {
					id: e,
					children: t
				}, e))]
			}),
			i ? /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, Q.jsx)(P, {
					className: "min-w-40 flex-1",
					label: `${e} address`,
					value: t.host,
					autoComplete: "off",
					isDisabled: n,
					onChange: (e) => r({
						...t,
						host: e
					})
				}), /* @__PURE__ */ (0, Q.jsx)(P, {
					className: "w-full sm:w-28",
					label: `${e} port`,
					value: t.port ? String(t.port) : "",
					inputMode: "numeric",
					isDisabled: n,
					onChange: (e) => r({
						...t,
						port: Number(e)
					})
				})]
			}), /* @__PURE__ */ (0, Q.jsxs)(O, {
				summary: "Proxy authentication",
				children: [
					/* @__PURE__ */ (0, Q.jsx)(P, {
						label: `${e} account`,
						value: t.username,
						autoComplete: "off",
						isDisabled: n,
						onChange: (e) => r({
							...t,
							username: e
						})
					}),
					/* @__PURE__ */ (0, Q.jsx)(P, {
						label: `${e} password`,
						type: "password",
						value: t.password || "",
						autoComplete: "new-password",
						isDisabled: n,
						placeholder: t.password_set ? "Saved; leave empty to keep" : "Optional",
						onChange: (e) => r({
							...t,
							password: e
						})
					}),
					t.password_set ? /* @__PURE__ */ (0, Q.jsx)(D, {
						isSelected: !!t.clear_password,
						isDisabled: n,
						onChange: (e) => r({
							...t,
							clear_password: e
						}),
						children: "Clear the saved password"
					}) : null
				]
			})] }) : null
		]
	});
}
// src/react/settings/library-icon-picker.tsx
var eo = [
	["", "Auto-detect"],
	["hard-drive", "Disk"],
	["database", "Profile library"],
	["heart", "Crush"],
	["heart-hand", "Intimate"],
	["flame", "Passionate"],
	["cherry", "Cherry"],
	["lollipop", "Sweetheart"],
	["candy", "Candy"],
	["banana", "Banana"],
	["droplets", "Wet"],
	["venus", "Female"],
	["mars", "Male"],
	["venus-and-mars", "Couple"],
	["gem", "Featured"],
	["crown", "Queen"],
	["ribbon", "Ribbon"],
	["shirt", "Uniform"],
	["graduation-cap", "Student"],
	["stethoscope", "Nurse"],
	["glasses", "Glasses"],
	["footprints", "Footprints"],
	["hand", "Hands"],
	["flower", "Flowers"],
	["venetian-mask", "Cosplay"],
	["rabbit", "Bunny girl"],
	["paw-print", "Animal ears"],
	["dumbbell", "Gym"],
	["bed-double", "Bedroom"],
	["bath", "Bathroom"],
	["key-round", "Private"],
	["wine", "Tipsy"],
	["cigarette", "Smoking"],
	["moon", "Night"],
	["sparkles", "Fantasy"],
	["camera", "Photobook"],
	["video", "Movie"],
	["film", "Movies"],
	["image", "Gallery"],
	["gamepad-2", "Game"],
	["star", "Favorites"],
	["tags", "Theme"]
];
function to(e) {
	let t = e === "local" ? "" : St[e];
	return t ? [t, "Auto-detect"] : ["hard-drive", "Default"];
}
var no = "auto";
function ro({ value: e, label: t, kind: n = "local", onChange: r }) {
	let i = (0, Z.useRef)(null), [a, o] = (0, Z.useState)(!1), [s, c] = (0, Z.useState)(e), [l, u] = to(n);
	return /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)(E, {
		ref: i,
		variant: "secondary",
		className: "self-start",
		"aria-label": t,
		"aria-haspopup": "dialog",
		"aria-expanded": a,
		onClick: () => {
			c(e), o(!0);
		},
		children: /* @__PURE__ */ (0, Q.jsxs)("span", {
			"data-icon-choice": !0,
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, Q.jsx)(Ht, { mark: e || l }), ((e) => e && eo.find(([t]) => t === e)?.[1] || u)(e)]
		})
	}), /* @__PURE__ */ (0, Q.jsx)(ze, {
		triggerRef: i,
		isOpen: a,
		onOpenChange: o,
		placement: "bottom start",
		offset: 4,
		className: Ct,
		children: /* @__PURE__ */ (0, Q.jsxs)(Ue, {
			"aria-label": `${t} icon options`,
			className: "flex w-72 flex-col gap-3 outline-none",
			children: [
				/* @__PURE__ */ (0, Q.jsx)(Le, {
					slot: "title",
					className: "px-1 text-body-medium text-text-primary",
					children: "Select library icon"
				}),
				/* @__PURE__ */ (0, Q.jsx)(We, {
					"aria-label": "Optional marks",
					value: s || no,
					onChange: (e) => c(e === no ? "" : e),
					className: "inline-grid grid-cols-7 gap-1",
					children: eo.map(([e, t]) => /* @__PURE__ */ (0, Q.jsx)(Ge, {
						value: e || no,
						"aria-label": e ? t : u,
						className: "flex h-10 cursor-pointer items-center justify-center rounded-lg text-foreground-icon-secondary outline-none hover:bg-dropdown-item-hover-background focus-visible:ring-2 focus-visible:ring-border-focus-ring data-selected:bg-dropdown-item-hover-background data-selected:text-text-primary",
						children: /* @__PURE__ */ (0, Q.jsx)(Ht, { mark: e || l })
					}, e || no))
				}),
				/* @__PURE__ */ (0, Q.jsxs)("div", {
					className: "flex justify-end gap-2 border-t border-separator-border pt-2.5",
					children: [/* @__PURE__ */ (0, Q.jsx)(E, {
						variant: "secondary",
						onClick: () => o(!1),
						children: "Cancel"
					}), /* @__PURE__ */ (0, Q.jsx)(E, {
						disabled: s === e,
						onClick: () => {
							r(s), o(!1);
						},
						children: "Apply"
					})]
				})
			]
		})
	})] });
}
// src/react/settings/library-policy-settings.tsx
var io = [
	["probe", "Read video info"],
	["metadata", "Fetch profiles online"],
	["cover", "Fetch covers online"],
	["people", "Fetch person images online"],
	["preview", "Generate 3x3 grid preview"]
], ao = [
	"probe",
	"metadata",
	"cover",
	"people",
	"preview"
], oo = [
	[
		"auto",
		"Auto-complete",
		"Fetches online only what is missing"
	],
	[
		"local",
		"Use local profiles only",
		"Never online; local NFO and images only"
	],
	[
		"custom",
		"Custom",
		"Pick the steps to run one by one"
	]
];
function so() {
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		"data-policy-legend": "",
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ (0, Q.jsx)(N, { children: Ot }), /* @__PURE__ */ (0, Q.jsxs)(O, {
			summary: "Comparing the three handling methods",
			children: [/* @__PURE__ */ (0, Q.jsxs)("table", {
				"data-policy-matrix": "",
				className: "text-body-2-regular",
				children: [/* @__PURE__ */ (0, Q.jsx)("thead", { children: /* @__PURE__ */ (0, Q.jsxs)("tr", { children: [/* @__PURE__ */ (0, Q.jsx)("th", {
					scope: "col",
					children: /* @__PURE__ */ (0, Q.jsx)(He, { children: "Steps" })
				}), Tt.map((e) => /* @__PURE__ */ (0, Q.jsx)("th", {
					scope: "col",
					children: e
				}, e))] }) }), /* @__PURE__ */ (0, Q.jsx)("tbody", { children: Dt.map(([e, ...t]) => /* @__PURE__ */ (0, Q.jsxs)("tr", { children: [/* @__PURE__ */ (0, Q.jsx)("th", {
					scope: "row",
					children: e
				}), t.map((e, t) => /* @__PURE__ */ (0, Q.jsx)("td", {
					"data-policy-cell": e === "✓" ? "on" : e === "—" ? "off" : "choice",
					children: e === "✓" ? /* @__PURE__ */ (0, Q.jsx)("span", {
						"aria-label": "do",
						children: "✓"
					}) : e === "—" ? /* @__PURE__ */ (0, Q.jsx)("span", {
						"aria-label": "Skip",
						children: "—"
					}) : e
				}, Tt[t]))] }, e)) })]
			}), /* @__PURE__ */ (0, Q.jsx)(N, { children: Et })]
		})]
	});
}
function co({ name: e, value: t, onChange: n }) {
	return /* @__PURE__ */ (0, Q.jsx)(Rt, {
		"data-guide-target": "library-policy",
		className: "w-full",
		"aria-label": `${e} 处理方式`,
		selectedKey: t,
		prefix: "处理方式",
		renderValue: /* @__PURE__ */ (0, Q.jsx)("span", {
			className: "truncate",
			children: oo.find(([e]) => e === t)?.[1]
		}),
		onSelectionChange: (e) => n(String(e)),
		children: oo.map(([e, t, n]) => /* @__PURE__ */ (0, Q.jsx)(z, {
			id: e,
			textValue: t,
			children: /* @__PURE__ */ (0, Q.jsxs)("span", {
				className: "flex min-w-0 flex-col",
				children: [/* @__PURE__ */ (0, Q.jsx)("span", { children: t }), /* @__PURE__ */ (0, Q.jsx)("span", {
					className: "text-body-2-regular text-text-secondary whitespace-normal",
					children: n
				})]
			})
		}, e))
	});
}
function lo({ name: e, value: t, onChange: n }) {
	return /* @__PURE__ */ (0, Q.jsx)(O, {
		defaultOpen: !0,
		summary: `${e} processing steps (${t.length}/${io.length})`,
		children: /* @__PURE__ */ (0, Q.jsx)("div", {
			className: "flex flex-wrap gap-x-6 gap-y-2",
			role: "group",
			"aria-label": `${e} handling steps`,
			children: io.map(([e, r]) => /* @__PURE__ */ (0, Q.jsx)(D, {
				isSelected: t.includes(e),
				onChange: (r) => n(r ? [...t, e] : t.filter((t) => t !== e)),
				children: r
			}, e))
		})
	});
}
function uo({ id: e, name: t, value: n, onChange: r }) {
	let i = (0, Z.useRef)(null), [a, o] = (0, Z.useState)(!1), s = Ke.find(([e]) => e === n)?.[1] || "No color", c = (t) => {
		r(t), Tn(e, t), o(!1);
	};
	return /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsxs)("button", {
		ref: i,
		type: "button",
		className: "text-body-medium",
		"data-glow-chip": "",
		"data-library-color-trigger": "",
		"aria-haspopup": "dialog",
		"aria-expanded": a,
		"aria-label": `Source color of ${t || "Unnamed library"}: ${s}`,
		title: s,
		onClick: () => o(!0),
		children: [
			/* @__PURE__ */ (0, Q.jsx)("span", {
				"aria-hidden": !0,
				className: "text-text-tertiary",
				children: "Source color"
			}),
			n ? /* @__PURE__ */ (0, Q.jsx)("span", {
				"data-glow-ball": "",
				"aria-hidden": "true",
				"data-accent-ball": n
			}) : /* @__PURE__ */ (0, Q.jsx)("span", {
				"data-glow-ball": "",
				"data-library-none": "",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, Q.jsx)("span", { children: s })
		]
	}), /* @__PURE__ */ (0, Q.jsx)(Be, {
		getContainer: () => Cn(i.current),
		children: /* @__PURE__ */ (0, Q.jsx)(ze, {
			triggerRef: i,
			isOpen: a,
			onOpenChange: o,
			placement: "bottom start",
			offset: 8,
			containerPadding: 12,
			className: Ct,
			children: /* @__PURE__ */ (0, Q.jsxs)(Ue, {
				"aria-label": `Source color of ${t || "Unnamed library"}`,
				className: "outline-none",
				children: [/* @__PURE__ */ (0, Q.jsx)("p", {
					className: "px-1 pb-2 text-body-medium text-text-primary",
					children: "Choose a source color"
				}), /* @__PURE__ */ (0, Q.jsxs)("div", {
					"data-accent-grid": "",
					"data-library-colors": "",
					role: "group",
					children: [/* @__PURE__ */ (0, Q.jsx)("button", {
						type: "button",
						"data-glow-chip": "",
						"aria-pressed": !n,
						title: "No color",
						"aria-label": "No color",
						onClick: () => c(""),
						children: /* @__PURE__ */ (0, Q.jsx)("span", {
							"data-glow-ball": "",
							"data-library-none": "",
							"aria-hidden": "true"
						})
					}), Ke.map(([e, t]) => /* @__PURE__ */ (0, Q.jsx)("button", {
						type: "button",
						"data-glow-chip": "",
						"aria-pressed": e === n,
						title: t,
						"aria-label": t,
						onClick: () => c(e),
						children: /* @__PURE__ */ (0, Q.jsx)("span", {
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
var fo = "/api/configuration/push-discovery", po = "/api/configuration/push-discovery/secret";
function mo({ initial: e, receipt: t }) {
	let [n, r] = (0, Z.useState)(e), [i, a] = (0, Z.useState)(e.prefixes), [o, s] = (0, Z.useState)(""), c = Y(), l = n.media_roots, [u, d] = (0, Z.useState)(e), f = (e, n) => {
		r(e), d(e), a(e.prefixes), s(""), t(n);
	}, p = (e, t) => a((n) => n.map((n, r) => r === e ? {
		...n,
		...t
	} : n)), m = (e) => {
		e.preventDefault();
		let t = {
			enabled: n.enabled,
			watch_local: n.watch_local,
			cloud: n.cloud,
			prefixes: i
		};
		c.run("save", (e) => G(fo, t, "POST", e), (e) => f(e, "Configuration saved"), (e) => s(q(e)));
	}, h = () => {
		c.run("secret", (e) => G(po, {}, "POST", e), (e) => f(e, "Shared secret rotated"), (e) => s(q(e)));
	}, g = `${u.queue.ingested} files added to library` + (u.queue.failed ? `, ${u.queue.failed} failed intake` : "") + (u.queue.pending ? `, ${u.queue.pending} more in the queue` : ""), _ = u.local_running ? `Watching ${u.local_roots.join(", ")}` : u.local_message || "Not running";
	return /* @__PURE__ */ (0, Q.jsxs)(L, {
		id: "pushDiscovery",
		guide: "discovery",
		title: "自动发现新文件",
		onSubmit: m,
		children: [
			/* @__PURE__ */ (0, Q.jsx)(V, { children: /* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, Q.jsx)("span", {
					className: "text-body-regular text-text-secondary",
					children: "Watch this machine"
				}), /* @__PURE__ */ (0, Q.jsx)(H, {
					tone: !u.enabled || !u.watch_local ? "neutral" : u.local_running ? "progress" : "warning",
					children: !u.enabled || !u.watch_local ? "Not enabled" : u.local_running ? "Running" : "Not running"
				})]
			}) }),
			/* @__PURE__ */ (0, Q.jsxs)(I, { children: [
				/* @__PURE__ */ (0, Q.jsx)(B, {
					label: "Auto-intake after finding new files",
					description: u.enabled ? g : void 0,
					children: /* @__PURE__ */ (0, Q.jsx)(U, {
						"aria-label": "Auto-intake after finding new files",
						isSelected: n.enabled,
						isDisabled: !n.available,
						onChange: (e) => r({
							...n,
							enabled: e
						})
					})
				}),
				/* @__PURE__ */ (0, Q.jsx)(B, {
					label: "Watch local folders",
					description: u.enabled && u.watch_local ? _ : void 0,
					children: /* @__PURE__ */ (0, Q.jsx)(U, {
						"aria-label": "Watch local folders",
						isSelected: n.watch_local,
						isDisabled: !n.available || !n.enabled,
						onChange: (e) => r({
							...n,
							watch_local: e
						})
					})
				}),
				/* @__PURE__ */ (0, Q.jsx)(B, {
					label: "接收 CloudDrive2 通知",
					description: "网盘目录有变化时由 CloudDrive2 推送过来。",
					children: /* @__PURE__ */ (0, Q.jsx)(U, {
						"aria-label": "接收 CloudDrive2 通知",
						isSelected: n.cloud,
						isDisabled: !n.available || !n.enabled,
						onChange: (e) => r({
							...n,
							cloud: e
						})
					})
				}),
				u.enabled && u.cloud ? /* @__PURE__ */ (0, Q.jsx)(B, {
					label: "Webhook configuration",
					description: u.config_toml ? "Paste into CloudDrive2 \"Settings → Webhooks\"; membership required. Paste again after changing the key." : u.origin ? "No shared secret yet; it generates after saving the configuration." : "A LAN address CloudDrive2 can reach must exist before this can be generated."
				}) : null
			] }),
			u.enabled && u.queue.last_error ? /* @__PURE__ */ (0, Q.jsx)(V, {
				divided: !0,
				children: /* @__PURE__ */ (0, Q.jsx)(F, {
					tone: "error",
					title: "The most recent intake failure",
					children: u.queue.last_error
				})
			}) : null,
			u.enabled && u.cloud && u.config_toml ? /* @__PURE__ */ (0, Q.jsx)(V, {
				divided: !0,
				children: /* @__PURE__ */ (0, Q.jsx)("div", {
					className: "flex flex-col gap-3",
					children: /* @__PURE__ */ (0, Q.jsxs)(O, {
						summary: "View configuration",
						children: [/* @__PURE__ */ (0, Q.jsx)(Zn, {
							code: u.config_toml,
							language: "toml",
							label: "CloudDrive2 configuration",
							bounded: !1,
							copyLabel: "Copy configuration",
							onCopy: () => t("CloudDrive2 configuration copied")
						}), /* @__PURE__ */ (0, Q.jsx)(N, { children: "When the Windows desktop version shows \"Invalid\" after pasting, save this as a .toml file and put it in the %LOCALAPPDATA%\\CloudDrive.WinUI\\webhooks\\ directory." })]
					})
				})
			}) : null,
			n.enabled && n.cloud ? /* @__PURE__ */ (0, Q.jsx)(V, {
				divided: !0,
				children: /* @__PURE__ */ (0, Q.jsxs)("div", {
					className: "flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, Q.jsx)(dt, { children: "Cloud path prefix" }),
						/* @__PURE__ */ (0, Q.jsx)("div", {
							role: "group",
							"aria-label": "Cloud path prefix",
							className: "flex flex-col gap-3",
							children: i.map((e, t) => /* @__PURE__ */ (0, Q.jsxs)("div", {
								className: "flex items-start gap-2",
								children: [
									/* @__PURE__ */ (0, Q.jsx)(P, {
										className: "min-w-0 flex-1",
										"aria-label": `Cloud path prefix ${t + 1}`,
										placeholder: "/115",
										autoComplete: "off",
										maxLength: 200,
										value: e.prefix,
										onChange: (e) => p(t, { prefix: e })
									}),
									/* @__PURE__ */ (0, Q.jsx)(Rt, {
										"aria-label": `Media root for prefix ${t + 1}`,
										prefix: "Matching folders",
										selectedKey: e.root,
										onSelectionChange: (e) => {
											e !== null && p(t, { root: String(e) });
										},
										children: l.map((e) => /* @__PURE__ */ (0, Q.jsx)(z, {
											id: e,
											children: e
										}, e))
									}),
									/* @__PURE__ */ (0, Q.jsx)(E, {
										variant: "danger",
										iconOnly: !0,
										leadingIcon: yt,
										"aria-label": "Remove this entry",
										onClick: () => a((e) => e.filter((e, n) => n !== t))
									})
								]
							}, t))
						}),
						/* @__PURE__ */ (0, Q.jsx)("div", { children: /* @__PURE__ */ (0, Q.jsx)(E, {
							variant: "secondary",
							onClick: () => a((e) => [...e, {
								prefix: "",
								root: l[0] ?? ""
							}]),
							children: "Add prefix"
						}) })
					]
				})
			}) : null,
			o || c.error ? /* @__PURE__ */ (0, Q.jsx)(V, {
				divided: !0,
				children: /* @__PURE__ */ (0, Q.jsx)(k, { children: o || c.error })
			}) : null,
			/* @__PURE__ */ (0, Q.jsxs)(M, { children: [u.enabled && u.cloud && u.config_toml ? /* @__PURE__ */ (0, Q.jsx)(E, {
				variant: "secondary",
				onClick: h,
				disabled: !n.available,
				...K(c.busy === "secret"),
				children: "Rotate the key"
			}) : null, /* @__PURE__ */ (0, Q.jsx)(E, {
				type: "submit",
				disabled: !n.available,
				...K(c.busy === "save"),
				children: "Save configuration"
			})] })
		]
	});
}
// src/react/settings/media-settings.tsx
async function ho(e) {
	let t;
	try {
		t = await mn();
	} catch {
		return !0;
	}
	if (!En(t)) return !0;
	let { confirmed: n } = await rn({
		title: "扫描与采集正在进行",
		body: Nn(t, e),
		confirmLabel: "仍然保存"
	});
	return n;
}
var go = (e) => tr.find(([t]) => t === e)?.[1] ?? e, _o = [...tr, ["smb", "SMB share"]], vo = (e) => e.library_icon || to(e.transport === "smb" ? "smb" : e.location)[0], yo = async (e) => (await G(wt, { initial: e })).path, bo = (e) => ({
	library_id: e.library_id,
	library: e.library,
	library_icon: e.library_icon,
	library_color: e.library_color,
	library_policy: e.library_policy,
	library_stages: e.library_stages
}), xo = (e) => e.library_stages ? ao.filter((t) => e.library_stages.split(",").includes(t)) : [], So = (e = "") => ({
	path: e,
	transport: e.startsWith("smb://") ? "smb" : "filesystem",
	location: "local",
	root: "",
	library_id: kn(),
	library: "",
	library_icon: "",
	library_color: "",
	library_policy: "auto",
	library_stages: "",
	cost: "free"
});
function Co(e) {
	let t = e.media_sources?.filter((e) => tr.some(([t]) => t === e.location));
	return t?.length ? t.map((e) => ({
		transport: e.transport === "smb" || e.path.startsWith("smb://") ? "smb" : "filesystem",
		smb_username: e.smb_username,
		smb_password: "",
		smb_encrypt: e.smb_encrypt,
		smb_password_saved: e.smb_password_saved,
		path: e.path,
		location: e.location,
		root: e.root,
		library: e.library || "",
		library_icon: e.library_icon || "",
		library_color: e.library_color || "",
		library_policy: e.library_policy || "auto",
		library_stages: e.library_stages || "",
		root_id: e.root_id,
		library_id: e.library_id || kn(),
		cost: e.cost ?? zn(e.location)
	})) : (e.media_dirs.length ? e.media_dirs : [""]).map((e) => So(e));
}
var wo = (e) => !(e instanceof qe) || e.status !== 400 ? null : e.body?.errors ?? null;
function To({ data: e, receipt: t, panel: n }) {
	let r = !!e.media_sources?.some((e) => ar(e.location));
	return (0, Z.useEffect)(() => {
		if (e.editable) {
			let t = /* @__PURE__ */ new Map();
			for (let n of Co(e)) t.set(n.library_id, (t.get(n.library_id) ?? 0) + 1);
			An("media", {
				folders: [...t.values()],
				cloud: r
			});
		}
		let t = e.push_discovery;
		t && An("discovery", {
			enabled: t.enabled,
			watchLocal: t.watch_local,
			cloud: t.cloud,
			webhook: t.enabled && t.cloud && !!t.config_toml,
			prefixes: t.prefixes.length
		});
	}, [e, r]), /* @__PURE__ */ (0, Q.jsxs)("div", {
		...pr(n),
		children: [
			e.editable ? /* @__PURE__ */ (0, Q.jsx)(Eo, {
				data: e,
				receipt: t
			}) : /* @__PURE__ */ (0, Q.jsx)(F, {
				tone: "neutral",
				title: "Read-only",
				children: e.notice
			}),
			e.editable ? null : /* @__PURE__ */ (0, Q.jsx)(Oo, { data: e }),
			r ? /* @__PURE__ */ (0, Q.jsx)(Za, { receipt: t }) : null,
			e.push_discovery ? /* @__PURE__ */ (0, Q.jsx)(mo, {
				initial: e.push_discovery,
				receipt: t
			}) : null
		]
	});
}
function Eo({ data: e, receipt: t }) {
	let { rows: n, edit: r, add: i, remove: a, errors: o, setErrors: s, picking: c, pick: l, inputRef: u } = sr({
		initial: () => Co(e),
		blank: () => So(),
		pickFolder: yo,
		describe: q
	}), [d, f] = (0, Z.useState)(!1), [p, m] = (0, Z.useState)(!1), [h, g] = (0, Z.useState)(""), [_, v] = (0, Z.useState)({}), [y, b] = (0, Z.useState)(null), x = (0, Z.useRef)(e.revision), S = (0, Z.useRef)(!1), C = Y();
	Vn();
	let w = (e, t) => {
		n.forEach((i, a) => {
			i.library_id === n[e].library_id && r(a, t);
		});
	}, T = [...n.reduce((e, t) => e.has(t.library_id) ? e : e.set(t.library_id, t), /* @__PURE__ */ new Map()).values()], [ee, te] = (0, Z.useState)(null);
	(0, Z.useEffect)(() => {
		if (!ee) return;
		let e = document.querySelector(`[data-library-key="${CSS.escape(ee)}"] [data-library-head] input`);
		e?.scrollIntoView({ block: "center" }), e?.focus(), te(null);
	}, [ee]);
	let ne = (e, t) => {
		let i = n.find((e) => e.library_id === t);
		if (i) {
			r(e, bo(i));
			return;
		}
		let a = kn();
		r(e, {
			library_id: a,
			library: "",
			library_icon: "",
			library_color: "",
			library_policy: "auto",
			library_stages: ""
		}), te(a);
	};
	(0, Z.useEffect)(() => {
		if (!y) return;
		let e = setTimeout(() => location.assign(y.url), Ga);
		return () => clearTimeout(e);
	}, [y]);
	let re = (e) => {
		e.preventDefault();
		let t = n.findIndex((e) => !e.cost);
		if (t >= 0) {
			m(!0);
			let n = e.currentTarget;
			requestAnimationFrame(() => n.querySelector(`[data-media-read-policy="${t}"] button`)?.focus());
		} else C.busy || S.current || (g(""), S.current = !0, ho(d).then((e) => {
			S.current = !1, e && ie();
		}));
	}, ie = () => {
		C.run("save", (t) => G(Qe, {
			revision: x.current,
			media_dirs: n.map((e) => e.path),
			...e.media_sources ? { media_sources: n } : {},
			port: String(e.port),
			scan_now: d
		}, "POST", t), (e) => {
			x.current = e.revision, s([]), t("Configuration saved"), b(e);
		}, (e) => {
			let t = wo(e);
			s(t?.media_dirs ?? []), (!t || t.port) && g(t?.port || q(e));
		});
	};
	if (y) return /* @__PURE__ */ (0, Q.jsx)(L, {
		guide: "media",
		title: "媒体库与目录",
		children: /* @__PURE__ */ (0, Q.jsx)(V, { children: /* @__PURE__ */ (0, Q.jsxs)(F, {
			tone: "success",
			title: "Configuration saved",
			children: [
				"Peach is restarting. You will be redirected shortly, or open ",
				/* @__PURE__ */ (0, Q.jsx)(_t, {
					href: y.url,
					size: "small",
					children: "the library"
				}),
				"."
			]
		}) })
	});
	let ae = (t) => e.media_sources?.find((e) => e.root_id === t.root_id && e.path === t.path), oe = n.some((e) => ar(e.location)), se = oe ? (e.mount_dependencies ?? []).filter((e) => !e.available) : [];
	return /* @__PURE__ */ (0, Q.jsxs)(L, {
		guide: "media",
		title: "媒体库与目录",
		onSubmit: re,
		children: [/* @__PURE__ */ (0, Q.jsxs)(V, { children: [
			/* @__PURE__ */ (0, Q.jsx)(so, {}),
			/* @__PURE__ */ (0, Q.jsx)("div", {
				role: "group",
				"aria-label": "Libraries and folders",
				className: "flex flex-col gap-4",
				children: T.map((e) => {
					let t = n.findIndex((t) => t.library_id === e.library_id), s = n.map((e, t) => ({
						row: e,
						index: t
					})).filter(({ row: t }) => t.library_id === e.library_id), d = e.library_policy, f = e.library || "Unnamed library";
					return /* @__PURE__ */ (0, Q.jsxs)("div", {
						"data-library-block": "",
						"data-library-key": e.library_id,
						className: $t({
							variant: "raised",
							padding: "none",
							className: "flex flex-col p-2"
						}),
						"data-library": e.library_color ? e.library_id : void 0,
						children: [
							/* @__PURE__ */ (0, Q.jsxs)("div", {
								"data-library-head": "",
								children: [
									/* @__PURE__ */ (0, Q.jsx)(ro, {
										label: `${f} icon`,
										value: e.library_icon,
										kind: e.transport === "smb" ? "smb" : e.location,
										onChange: (e) => w(t, { library_icon: e })
									}),
									/* @__PURE__ */ (0, Q.jsx)(P, {
										className: "w-full",
										"aria-label": `${f} name`,
										maxLength: 80,
										placeholder: "Library name",
										value: e.library,
										onChange: (e) => w(t, { library: e })
									}),
									/* @__PURE__ */ (0, Q.jsx)(uo, {
										id: e.library_id,
										name: e.library,
										value: e.library_color,
										onChange: (e) => w(t, { library_color: e })
									}),
									/* @__PURE__ */ (0, Q.jsx)(co, {
										name: f,
										value: d,
										onChange: (n) => w(t, {
											library_policy: n,
											library_stages: n === "custom" ? e.library_stages || ao.join(",") : ""
										})
									})
								]
							}),
							d === "custom" ? /* @__PURE__ */ (0, Q.jsx)(lo, {
								name: f,
								value: xo(e),
								onChange: (e) => w(t, { library_stages: ao.filter((t) => e.includes(t)).join(",") })
							}) : null,
							/* @__PURE__ */ (0, Q.jsxs)("div", {
								"data-library-folders": "",
								role: "group",
								"aria-label": `${f} folders`,
								children: [s.map(({ row: t, index: i }) => /* @__PURE__ */ (0, Q.jsxs)(er, {
									label: `Media folder ${i + 1}`,
									path: t.path,
									onPath: (e) => r(i, {
										path: e,
										transport: e.startsWith("smb://") ? "smb" : t.transport
									}),
									error: o[i],
									inputRef: u(i),
									picking: c === i,
									onPick: () => void l(i),
									onRemove: n.length > 1 ? () => a(i) : void 0,
									status: ae(t) ? /* @__PURE__ */ (0, Q.jsx)(Do, { online: ae(t)?.online }) : null,
									children: [/* @__PURE__ */ (0, Q.jsxs)($n, { children: [
										/* @__PURE__ */ (0, Q.jsx)(ir, {
											index: i,
											value: t.transport === "smb" ? "smb" : t.location,
											options: _o,
											onChange: (e) => {
												let n = e === "smb";
												r(i, {
													transport: n ? "smb" : "filesystem",
													location: n ? "local" : e,
													cost: n || e === "local" ? "free" : "",
													path: n ? t.path.startsWith("smb://") ? t.path : "smb://" : t.path.startsWith("smb://") ? "" : t.path
												}), v((e) => {
													let t = { ...e };
													return delete t[i], t;
												});
											}
										}),
										/* @__PURE__ */ (0, Q.jsx)(nr, {
											index: i,
											cost: t.cost,
											onChange: (e) => r(i, { cost: e }),
											error: p && !t.cost ? "Select a media reading strategy" : void 0
										}),
										t.root_id && !ae(t) ? /* @__PURE__ */ (0, Q.jsx)(Qn, {
											label: "Change method",
											className: "w-full @lg:w-auto @lg:flex-1",
											children: /* @__PURE__ */ (0, Q.jsxs)(R, {
												className: "w-full",
												"aria-label": `Folder change method ${i + 1}`,
												placeholder: "Choose the folder change method",
												selectedKey: t.change_mode || null,
												onSelectionChange: (e) => {
													e === "add" ? r(i, {
														root_id: void 0,
														root: "",
														change_mode: ""
													}) : r(i, { change_mode: "relocate" });
												},
												children: [/* @__PURE__ */ (0, Q.jsx)(z, {
													id: "relocate",
													children: "Relocate this folder, keeping file records"
												}), /* @__PURE__ */ (0, Q.jsx)(z, {
													id: "add",
													children: "Add another folder"
												})]
											})
										}) : null,
										T.length > 1 ? /* @__PURE__ */ (0, Q.jsx)(Qn, {
											label: "Move to library",
											className: "w-full @lg:w-48",
											children: /* @__PURE__ */ (0, Q.jsxs)(R, {
												className: "w-full",
												"aria-label": `Media library owning directory ${i + 1}`,
												selectedKey: t.library_id,
												renderValue: /* @__PURE__ */ (0, Q.jsxs)("span", {
													className: "flex min-w-0 items-center gap-2",
													children: [/* @__PURE__ */ (0, Q.jsx)(Ht, { mark: vo(e) }), /* @__PURE__ */ (0, Q.jsx)("span", {
														className: "truncate",
														children: f
													})]
												}),
												onSelectionChange: (e) => {
													e && ne(i, String(e));
												},
												children: [T.map((e) => /* @__PURE__ */ (0, Q.jsx)(z, {
													id: e.library_id,
													textValue: e.library || "Unnamed library",
													children: /* @__PURE__ */ (0, Q.jsxs)("span", {
														className: "flex min-w-0 items-center gap-2",
														children: [/* @__PURE__ */ (0, Q.jsx)(Ht, { mark: vo(e) }), /* @__PURE__ */ (0, Q.jsx)("span", {
															className: "truncate",
															children: e.library || "Unnamed library"
														})]
													})
												}, e.library_id)), s.length > 1 ? /* @__PURE__ */ (0, Q.jsx)(z, {
													id: "new",
													textValue: "New library",
													children: /* @__PURE__ */ (0, Q.jsxs)("span", {
														className: "flex min-w-0 items-center gap-2",
														children: [/* @__PURE__ */ (0, Q.jsx)(Ht, { mark: "plus" }), /* @__PURE__ */ (0, Q.jsx)("span", { children: "New media library" })]
													})
												}) : null]
											})
										}) : null
									] }), t.transport === "smb" ? /* @__PURE__ */ (0, Q.jsxs)("div", {
										className: "flex w-full flex-col gap-2",
										children: [
											/* @__PURE__ */ (0, Q.jsxs)($n, { children: [/* @__PURE__ */ (0, Q.jsx)(Qn, {
												label: "SMB account",
												className: "w-full @lg:flex-1",
												children: /* @__PURE__ */ (0, Q.jsx)(P, {
													"aria-label": `SMB account ${i + 1}`,
													value: t.smb_username || "",
													autoComplete: "off",
													onChange: (e) => r(i, { smb_username: e })
												})
											}), /* @__PURE__ */ (0, Q.jsx)(Qn, {
												label: "SMB password",
												className: "w-full @lg:flex-1",
												children: /* @__PURE__ */ (0, Q.jsx)(P, {
													"aria-label": `SMB password ${i + 1}`,
													type: "password",
													value: t.smb_password || "",
													autoComplete: "new-password",
													placeholder: t.smb_password_saved ? "Leave blank to keep the saved password" : "",
													onChange: (e) => r(i, { smb_password: e })
												})
											})] }),
											/* @__PURE__ */ (0, Q.jsx)(D, {
												isSelected: t.smb_encrypt || !1,
												onChange: (e) => r(i, { smb_encrypt: e }),
												children: "Require SMB encryption"
											}),
											/* @__PURE__ */ (0, Q.jsx)(D, {
												isSelected: t.smb_clear || !1,
												onChange: (e) => r(i, { smb_clear: e }),
												children: "Remove the saved SMB account"
											}),
											/* @__PURE__ */ (0, Q.jsx)(E, {
												className: "self-start",
												variant: "secondary",
												...K(C.busy === `smb-${i}`),
												onClick: () => void C.run(`smb-${i}`, (e) => G("/api/configuration/smb/test", t, "POST", e), (e) => v((t) => ({
													...t,
													[i]: {
														message: "Shared directory is readable",
														directories: e.directories
													}
												})), (e) => v((t) => ({
													...t,
													[i]: {
														message: q(e),
														directories: []
													}
												}))),
												children: "Test connection"
											}),
											_[i] ? /* @__PURE__ */ (0, Q.jsx)(N, { children: _[i].message }) : null,
											_[i]?.directories.length ? /* @__PURE__ */ (0, Q.jsx)(R, {
												"aria-label": `SMB subfolder ${i + 1}`,
												placeholder: "Enter subfolder",
												selectedKey: null,
												onSelectionChange: (e) => {
													e && (r(i, { path: t.path.replace(/\/$/, "") + "/" + encodeURIComponent(String(e)) }), v((e) => ({
														...e,
														[i]: {
															message: "Please test this subdirectory",
															directories: []
														}
													})));
												},
												children: _[i].directories.map((e) => /* @__PURE__ */ (0, Q.jsx)(z, {
													id: e,
													children: e
												}, e))
											}) : null,
											/* @__PURE__ */ (0, Q.jsx)(N, { children: "Enter the address as smb://server/share/folder. Reads and writes follow the share account's permissions; organizing and deleting are triggered by the matching actions, and details and previews are stored in the Peach data directory." })
										]
									}) : null]
								}, i)), /* @__PURE__ */ (0, Q.jsx)("div", {
									className: "flex",
									children: /* @__PURE__ */ (0, Q.jsx)(E, {
										variant: "secondary",
										"aria-label": `Add folders to ${f}`,
										onClick: () => {
											i(), r(n.length, {
												...bo(e),
												location: e.location,
												cost: e.cost
											});
										},
										children: "Add folder"
									})
								})]
							})
						]
					}, e.library_id);
				})
			}),
			/* @__PURE__ */ (0, Q.jsx)(E, {
				variant: "secondary",
				className: "self-start",
				onClick: i,
				children: "Add media library"
			}),
			/* @__PURE__ */ (0, Q.jsx)(N, { children: mt }),
			oe ? /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)(rr, {}), /* @__PURE__ */ (0, Q.jsx)(Ja, {})] }) : null,
			se.map((e) => /* @__PURE__ */ (0, Q.jsxs)(N, { children: [
				"Not detected: ",
				e.name,
				".",
				/* @__PURE__ */ (0, Q.jsxs)(A, {
					href: e.download_url,
					children: ["Download ", e.name]
				})
			] }, e.name)),
			/* @__PURE__ */ (0, Q.jsx)(D, {
				isSelected: d,
				onChange: f,
				children: "After saving, scan and complete details"
			}),
			h ? /* @__PURE__ */ (0, Q.jsx)(F, {
				tone: "error",
				title: "Not saved",
				children: h
			}) : null
		] }), /* @__PURE__ */ (0, Q.jsx)(M, {
			status: "Peach restarts after saving.",
			children: /* @__PURE__ */ (0, Q.jsx)(E, {
				type: "submit",
				...K(C.busy === "save"),
				children: "Save configuration"
			})
		})]
	});
}
function Do({ online: e }) {
	return /* @__PURE__ */ (0, Q.jsx)(cr, { online: e });
}
function Oo({ data: e }) {
	let t = e.media_sources, n = Y();
	return t ? /* @__PURE__ */ (0, Q.jsxs)(L, {
		guide: "mounts",
		title: "挂载状态",
		children: [
			/* @__PURE__ */ (0, Q.jsx)(ut, { children: t.map((e, t) => /* @__PURE__ */ (0, Q.jsxs)(j, {
				term: /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)(Ht, { mark: or(e.location) }), go(e.location)] }),
				children: [e.path || "No mount point configured", /* @__PURE__ */ (0, Q.jsx)(Do, { online: e.online })]
			}, t)) }),
			n.error ? /* @__PURE__ */ (0, Q.jsx)(V, {
				divided: !0,
				children: /* @__PURE__ */ (0, Q.jsx)(k, { children: n.error })
			}) : null,
			/* @__PURE__ */ (0, Q.jsx)(M, { children: /* @__PURE__ */ (0, Q.jsx)(E, {
				variant: "secondary",
				onClick: () => void n.run("refresh", (e) => un(e), (e) => On.setQueryData(Ze, e)),
				...K(n.busy === "refresh"),
				children: "Refresh mount state"
			}) })
		]
	}) : null;
}
// src/react/settings/service-preferences.tsx
var ko = [
	["off", "Off"],
	["precise", "One per 10 seconds"],
	["coarse", "One per 30 seconds"]
];
function Ao({ epoch: e = 0, disabled: t = !1 }) {
	let n = X({
		queryKey: Ut,
		queryFn: ({ signal: e }) => _n(e),
		refetchOnMount: "always"
	}), r = Jn(), i = r.reset;
	(0, Z.useEffect)(() => {
		i();
	}, [e, i]);
	let a = n.data, o = r.error || n.error;
	return /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [
		/* @__PURE__ */ (0, Q.jsx)(I, { children: /* @__PURE__ */ (0, Q.jsx)(B, {
			label: "Timeline preview",
			description: "Extract frames at the chosen interval, processing only videos on local disks.",
			children: /* @__PURE__ */ (0, Q.jsx)("div", {
				id: "videoThumbnailSetting",
				children: /* @__PURE__ */ (0, Q.jsx)(R, {
					"aria-label": "Thumbnail capture interval",
					selectedKey: a?.mode || "off",
					isDisabled: t || !a || n.isFetching || r.isPending,
					onSelectionChange: (e) => {
						e !== null && r.mutate(String(e));
					},
					children: ko.map(([e, t]) => /* @__PURE__ */ (0, Q.jsx)(z, {
						id: e,
						children: t
					}, e))
				})
			})
		}) }),
		r.isPending || a?.status === "running" ? /* @__PURE__ */ (0, Q.jsxs)(V, {
			divided: !0,
			children: [/* @__PURE__ */ (0, Q.jsx)(N, {
				role: "status",
				children: r.isPending ? "Saving…" : "Scraping."
			}), r.isPending ? null : /* @__PURE__ */ (0, Q.jsx)(Wt, {})]
		}) : null,
		o ? /* @__PURE__ */ (0, Q.jsx)(V, {
			divided: !0,
			children: /* @__PURE__ */ (0, Q.jsx)(k, { children: q(o) })
		}) : null
	] });
}
function jo({ receipt: e }) {
	let t = Zt();
	(0, Z.useSyncExternalStore)(t.subscribe, t.version);
	let n = X({
		queryKey: Pt,
		queryFn: ({ signal: e }) => gn(e),
		refetchOnMount: "always"
	}), r = qn(), i = n.data?.followInitialDays ?? t.value.followInitialDays, a = r.error || n.error;
	return /* @__PURE__ */ (0, Q.jsxs)(L, {
		guide: "follow-options",
		title: "关注采集",
		children: [/* @__PURE__ */ (0, Q.jsxs)(I, { children: [
			/* @__PURE__ */ (0, Q.jsx)(Mo, {}),
			/* @__PURE__ */ (0, Q.jsx)(No, {}),
			/* @__PURE__ */ (0, Q.jsx)(B, {
				label: "首次采集范围",
				description: "新关注的来源第一次回看多久以前的内容。",
				children: /* @__PURE__ */ (0, Q.jsx)("div", {
					id: "followInitialDaysSetting",
					className: "shrink-0",
					children: /* @__PURE__ */ (0, Q.jsx)(R, {
						"aria-label": "首次采集范围",
						selectedKey: String(i),
						isDisabled: n.isFetching || r.isPending,
						onSelectionChange: (n) => {
							n !== null && r.mutate({ followInitialDays: Number(n) }, { onSuccess: (n) => {
								typeof n.followInitialDays == "number" && (t.value.followInitialDays = n.followInitialDays), t.save(), e("Initial collection scope saved");
							} });
						},
						children: ct.map(([e, t]) => /* @__PURE__ */ (0, Q.jsx)(z, {
							id: e,
							children: t
						}, e))
					})
				})
			}),
			/* @__PURE__ */ (0, Q.jsx)(B, {
				label: "头像刷新",
				description: "重新获取关注创作者的头像。",
				children: /* @__PURE__ */ (0, Q.jsx)("span", {
					className: "shrink-0",
					children: "每 3 个月"
				})
			}),
			/* @__PURE__ */ (0, Q.jsx)(B, {
				label: "favicon 刷新",
				description: "重新获取来源站点的图标。",
				children: /* @__PURE__ */ (0, Q.jsx)("span", {
					className: "shrink-0",
					children: "每年"
				})
			})
		] }), a ? /* @__PURE__ */ (0, Q.jsx)(V, {
			divided: !0,
			children: /* @__PURE__ */ (0, Q.jsx)(k, { children: q(a) })
		}) : null]
	});
}
function Mo() {
	let e = X({
		queryKey: lt,
		queryFn: ({ signal: e }) => pn(e),
		refetchOnMount: "always",
		refetchInterval: (e) => Fn(e.state.data)
	}), t = Kn(), n = e.data, r = (0, Z.useRef)(Qt(Number(localStorage.getItem("peach.number.followScheduleSetting")), 15, 10080, 60)), [i, a] = (0, Z.useState)("60"), [o, s] = (0, Z.useState)(!1);
	(0, Z.useEffect)(() => {
		n?.enabled && (r.current = n.interval_minutes, a(String(n.interval_minutes)));
	}, [n]);
	let c = !n?.available || e.isFetching || t.isPending, l = () => {
		let e = Number(i);
		!Number.isInteger(e) || e < 15 || e > 10080 ? s(!0) : (s(!1), n?.enabled && !c && e !== n.interval_minutes && (r.current = e, localStorage.setItem("peach.number.followScheduleSetting", String(e)), t.mutate(e)));
	}, u = t.error || e.error;
	return /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [
		/* @__PURE__ */ (0, Q.jsx)(B, {
			label: "自动检查更新",
			description: "近 7 天有更新的来源按这个间隔检查，久未更新的逐级放慢，最长一天一次",
			children: /* @__PURE__ */ (0, Q.jsxs)("div", {
				id: "followScheduleSetting",
				className: "flex min-h-9 shrink-0 flex-wrap items-center justify-end gap-2",
				children: [/* @__PURE__ */ (0, Q.jsx)(U, {
					"aria-label": "自动检查更新",
					isSelected: n?.enabled === !0,
					isDisabled: c,
					onChange: (e) => {
						localStorage.setItem("peach.number.followScheduleSetting", String(r.current)), t.mutate(e ? r.current : 0);
					}
				}), n?.enabled ? /* @__PURE__ */ (0, Q.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, Q.jsx)(P, {
						type: "number",
						inputMode: "numeric",
						name: "follow-interval",
						autoComplete: "off",
						"aria-label": "自动检查间隔",
						className: "w-21 sm:w-24",
						value: i,
						onChange: (e) => {
							a(e), s(!1);
						},
						onBlur: l,
						onKeyDown: (e) => {
							e.key === "Enter" && (e.preventDefault(), l());
						},
						isDisabled: c,
						isInvalid: o
					}), /* @__PURE__ */ (0, Q.jsx)("span", {
						className: "text-body-2-regular text-text-secondary",
						children: "min"
					})]
				}) : null]
			})
		}),
		o ? /* @__PURE__ */ (0, Q.jsx)(V, { children: /* @__PURE__ */ (0, Q.jsx)(k, { children: "Enter a whole number from 15 to 10080 (minutes)." }) }) : null,
		t.isPending || n?.running ? /* @__PURE__ */ (0, Q.jsx)(V, { children: /* @__PURE__ */ (0, Q.jsx)(N, {
			role: "status",
			children: t.isPending ? "Saving…" : "Checking source updates…"
		}) }) : null,
		/* @__PURE__ */ (0, Q.jsx)(Po, {
			kind: "follow",
			status: n,
			title: "The last auto-check failed"
		}),
		u ? /* @__PURE__ */ (0, Q.jsx)(V, { children: /* @__PURE__ */ (0, Q.jsx)(k, { children: q(u) }) }) : null
	] });
}
function No() {
	let e = X({
		queryKey: ot,
		queryFn: ({ signal: e }) => fn(e),
		refetchOnMount: "always",
		refetchInterval: (e) => Fn(e.state.data)
	}), t = e.data;
	if (!t) return e.isPending ? /* @__PURE__ */ (0, Q.jsx)(B, {
		label: "Follow source fetching",
		children: /* @__PURE__ */ (0, Q.jsx)("span", {
			"data-skeleton": !0,
			"aria-busy": "true",
			"aria-label": "Reading the follow source fetch interval",
			className: "block h-4 w-16 rounded-2lg bg-background-tertiary-default"
		})
	}) : null;
	let n = t.interval_minutes, r = n % 60 ? `Every ${n} minutes` : `Every ${n / 60} hours`;
	return /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [
		/* @__PURE__ */ (0, Q.jsx)(B, {
			label: "Follow source fetching",
			children: /* @__PURE__ */ (0, Q.jsx)("span", {
				id: "feedScheduleSetting",
				children: t.available ? t.enabled ? r : "Closed" : "Only available on the writer instance"
			})
		}),
		t.running ? /* @__PURE__ */ (0, Q.jsx)(V, { children: /* @__PURE__ */ (0, Q.jsx)(N, {
			role: "status",
			children: "Fetching follow sources…"
		}) }) : null,
		/* @__PURE__ */ (0, Q.jsx)(Po, {
			kind: "feed",
			status: t,
			title: "The last auto-fetch failed"
		})
	] });
}
function Po({ kind: e, status: t, title: n }) {
	let r = Gn(e);
	if (!t?.enabled || t.running || !t.last_error) return null;
	let i = t.consecutive_failures ?? 0, a = xn(t.next_run_at), o = [i > 1 ? `Failed ${i} times in a row` : "", a ? `Next round ${a}` : ""].filter(Boolean).join(", "), s = [
		t.last_error,
		o,
		r.error ? `No retry: ${q(r.error)}` : ""
	].filter(Boolean).join("\n");
	return /* @__PURE__ */ (0, Q.jsx)(V, { children: /* @__PURE__ */ (0, Q.jsx)(F, {
		tone: "error",
		title: n,
		action: /* @__PURE__ */ (0, Q.jsx)(E, {
			variant: "secondary",
			size: "small",
			disabled: !t.available,
			...K(r.isPending),
			onClick: () => r.mutate(),
			children: "Retry now"
		}),
		children: s
	}) });
}
// src/react/settings/media-processing-settings.tsx
function Fo({ receipt: e }) {
	let t = X({
		queryKey: bt,
		queryFn: ({ signal: e }) => hn(e)
	}), n = Y(), r = n.error || (t.error ? q(t.error) : ""), i = !t.data || t.isFetching || !!n.busy;
	return /* @__PURE__ */ (0, Q.jsxs)(L, {
		guide: "preview",
		title: "视频预览",
		children: [
			/* @__PURE__ */ (0, Q.jsx)(I, { children: /* @__PURE__ */ (0, Q.jsx)(B, {
				label: "Generate video previews",
				description: "Generates contact-sheet and timeline previews for local videos; when off, duration and resolution are still probed per the library rules.",
				children: /* @__PURE__ */ (0, Q.jsx)(U, {
					"aria-label": "Generate video previews",
					isSelected: !!t.data && !t.data.metadata_only,
					isDisabled: i,
					onChange: (t) => void n.run("save", (e) => G(xt, { metadata_only: !t }, "POST", e), (t) => {
						On.setQueryData(bt, t), On.invalidateQueries({ queryKey: Ut }), On.invalidateQueries({ queryKey: ht }), e(t.metadata_only ? "Video preview generation disabled" : "Video preview generation enabled");
					})
				})
			}) }),
			/* @__PURE__ */ (0, Q.jsx)(Ao, { disabled: !t.data || t.data.metadata_only || !!n.busy }),
			/* @__PURE__ */ (0, Q.jsx)(I, { children: /* @__PURE__ */ (0, Q.jsx)(B, {
				label: "Frame extraction decoder",
				description: "Used to generate covers, contact sheets, and timelines.",
				children: /* @__PURE__ */ (0, Q.jsx)("div", {
					id: "previewAccelerationSetting",
					children: /* @__PURE__ */ (0, Q.jsxs)(R, {
						"aria-label": "Frame extraction decoder",
						selectedKey: t.data?.preview_acceleration || "auto",
						isDisabled: i,
						onSelectionChange: (t) => {
							t !== null && n.run("preview_acceleration", (e) => G(xt, { preview_acceleration: String(t) }, "POST", e), (t) => {
								On.setQueryData(bt, t), e("Frame extraction decoder saved");
							});
						},
						children: [/* @__PURE__ */ (0, Q.jsx)(z, {
							id: "auto",
							children: "Automatic (hardware first)"
						}), /* @__PURE__ */ (0, Q.jsx)(z, {
							id: "software",
							children: "Software decode"
						})]
					})
				})
			}) }),
			n.busy ? /* @__PURE__ */ (0, Q.jsx)(V, {
				divided: !0,
				children: /* @__PURE__ */ (0, Q.jsx)(N, {
					role: "status",
					children: "Saving…"
				})
			}) : null,
			r ? /* @__PURE__ */ (0, Q.jsx)(V, {
				divided: !0,
				children: /* @__PURE__ */ (0, Q.jsx)(k, { children: r })
			}) : null
		]
	});
}
function Io({ receipt: e }) {
	let t = X({
		queryKey: bt,
		queryFn: ({ signal: e }) => hn(e)
	}), n = Y(), r = n.error || (t.error ? q(t.error) : "");
	return /* @__PURE__ */ (0, Q.jsxs)(L, {
		guide: "transcode",
		title: "视频播放",
		children: [
			/* @__PURE__ */ (0, Q.jsx)(I, { children: /* @__PURE__ */ (0, Q.jsx)(B, {
				label: "Transcode method",
				description: "Used for video transcoding during playback.",
				children: /* @__PURE__ */ (0, Q.jsx)("div", {
					id: "playbackAccelerationSetting",
					children: /* @__PURE__ */ (0, Q.jsxs)(R, {
						"aria-label": "Transcode method",
						selectedKey: t.data?.playback_acceleration || "auto",
						isDisabled: !t.data || t.isFetching || !!n.busy,
						onSelectionChange: (t) => {
							t !== null && n.run("playback_acceleration", (e) => G(xt, { playback_acceleration: String(t) }, "POST", e), (t) => {
								On.setQueryData(bt, t), e("Transcode method saved");
							});
						},
						children: [/* @__PURE__ */ (0, Q.jsx)(z, {
							id: "auto",
							children: "Automatic (hardware first)"
						}), /* @__PURE__ */ (0, Q.jsx)(z, {
							id: "software",
							children: "Software codec"
						})]
					})
				})
			}) }),
			n.busy ? /* @__PURE__ */ (0, Q.jsx)(V, {
				divided: !0,
				children: /* @__PURE__ */ (0, Q.jsx)(N, {
					role: "status",
					children: "Saving…"
				})
			}) : null,
			r ? /* @__PURE__ */ (0, Q.jsx)(V, {
				divided: !0,
				children: /* @__PURE__ */ (0, Q.jsx)(k, { children: r })
			}) : null
		]
	});
}
// src/react/boardui/components/base/textarea/textarea.tsx
var Lo = Rn({
	field: "relative flex w-full flex-col rounded-2lg bg-background-tertiary-default text-foreground-icon-tertiary ring-2 ring-inset ring-transparent transition-[background-color,box-shadow,color] duration-[var(--input-transition-ms)] ease",
	fieldSize: {
		medium: "p-2",
		small: "px-1.5 py-2"
	},
	textarea: "block w-full min-w-0 bg-transparent border-0 outline-none m-0 p-0 px-1 font-sans text-body-regular text-text-primary placeholder:text-text-tertiary focus:placeholder:text-text-primary disabled:text-input-disabled-text disabled:placeholder:text-input-disabled-text disabled:cursor-not-allowed aria-invalid:placeholder:text-text-error-placeholder",
	resize: {
		none: "resize-none",
		vertical: "resize-y"
	},
	footer: "flex w-full items-start justify-between gap-3",
	count: "ms-auto shrink-0 pt-px text-caption-1-medium text-text-tertiary tabular-nums"
}), Ro = 20;
function zo({ size: e, rows: t = 3, autoResize: n = !1, maxRows: r, resize: i = "vertical", fieldClassName: a, className: o, ref: s, groupRef: c, onInput: l, ...u }) {
	let d = (0, Z.useContext)(Kt), f = e ?? d.size ?? "medium", p = (0, Z.useRef)(null), m = (e) => {
		p.current = e, typeof s == "function" ? s(e) : s && (s.current = e);
	}, h = () => {
		let e = p.current;
		if (!e) return;
		if (!n) {
			e.style.height = "", e.style.maxHeight = "", e.style.overflowY = "";
			return;
		}
		let i = parseFloat(window.getComputedStyle(e).lineHeight) || Ro, a = r ? r * i : Infinity;
		e.style.height = "0px";
		let o = Math.max(e.scrollHeight, t * i);
		e.style.height = `${Math.min(o, a)}px`, e.style.maxHeight = r ? `${a}px` : "", e.style.overflowY = o > a ? "auto" : "hidden";
	};
	return (0, Z.useLayoutEffect)(h), /* @__PURE__ */ (0, Q.jsx)(Re, {
		ref: c,
		className: ({ isFocusWithin: e, isHovered: t, isDisabled: n, isInvalid: r }) => sn(Lo.field, Lo.fieldSize[f], t && !e && !n && !r && "ring-border-button-hover", e && !n && !r && "ring-border-button-active", n && "bg-input-disabled-background text-input-disabled-foreground", r && "bg-background-tertiary-error text-foreground-icon-error", d.fieldClassName, a),
		children: /* @__PURE__ */ (0, Q.jsx)(Ve, {
			ref: m,
			rows: t,
			...u,
			onInput: (e) => {
				h(), l?.(e);
			},
			className: sn(Lo.textarea, Lo.resize[n ? "none" : i], d.inputClassName, o)
		})
	});
}
zo.displayName = "TextareaBase";
function Bo({ label: e, hint: t, tooltip: n, placeholder: r, rows: i, autoResize: a, maxRows: o, resize: s, maxLength: c, showCount: l = !1, fieldClassName: u, ref: d, groupRef: f, className: p, value: m, defaultValue: h, onChange: g, ..._ }) {
	let [v, y] = (0, Z.useState)(() => (h ?? "").length), b = m === void 0 ? v : m.length;
	return /* @__PURE__ */ (0, Q.jsx)(Gt, {
		..._,
		value: m,
		defaultValue: h,
		onChange: (e) => {
			l && m === void 0 && y(e.length), g?.(e);
		},
		className: p,
		"aria-label": _["aria-label"] ?? (!e && typeof r == "string" ? r : void 0),
		children: ({ isRequired: p, isInvalid: m }) => /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [
			e && /* @__PURE__ */ (0, Q.jsx)(gt, {
				isRequired: p,
				isInvalid: m,
				tooltip: n,
				children: e
			}),
			/* @__PURE__ */ (0, Q.jsx)(zo, {
				ref: d,
				groupRef: f,
				placeholder: r,
				rows: i,
				autoResize: a,
				maxRows: o,
				resize: s,
				maxLength: c,
				fieldClassName: u
			}),
			(t || l) && /* @__PURE__ */ (0, Q.jsxs)("div", {
				className: Lo.footer,
				children: [t && /* @__PURE__ */ (0, Q.jsx)(ft, {
					isInvalid: m,
					children: t
				}), l && /* @__PURE__ */ (0, Q.jsx)("span", {
					className: sn(Lo.count, m && "text-text-error-primary"),
					children: c ? `${b}/${c}` : b
				})]
			})
		] })
	});
}
Bo.displayName = "Textarea";
// src/react/settings/code-pattern-settings.tsx
var Vo = "^\\+{3}\\s*(?<code>FC2-PPV-\\d+)\n\\[(?<code>[A-Z]+-\\d+)\\]";
function Ho({ receipt: e }) {
	let t = X({
		queryKey: Pt,
		queryFn: ({ signal: e }) => gn(e)
	}), [n, r] = (0, Z.useState)(null), i = Y(), a = n ?? (t.data?.codePatterns ?? []).join("\n"), o = i.error || (t.error ? q(t.error) : "");
	return /* @__PURE__ */ (0, Q.jsxs)(L, {
		guide: "codes",
		title: "番号识别规则",
		onSubmit: (t) => {
			t.preventDefault();
			let n = a.split("\n").map((e) => e.trim()).filter(Boolean);
			i.run("save", (e) => G(Ft, { codePatterns: n }, "POST", e), (t) => {
				On.setQueryData(Pt, t), r(null), e("Configuration saved");
			});
		},
		children: [/* @__PURE__ */ (0, Q.jsxs)(V, { children: [/* @__PURE__ */ (0, Q.jsx)(N, { children: "When the built-in rules cannot recognize a code, it is taken from the file name by the rules here. One regular expression per line; write the code in (?<code>...), and without a named group the first parenthesized group is used. Rules take effect on the next processing run, for videos that do not have a code yet." }), /* @__PURE__ */ (0, Q.jsx)(Bo, {
			id: "codePatternSetting",
			"aria-label": "Code recognition rules",
			rows: 3,
			autoResize: !0,
			maxRows: 12,
			spellCheck: "false",
			autoComplete: "off",
			placeholder: Vo,
			value: a,
			isDisabled: !t.data,
			isInvalid: !!o,
			hint: o || void 0,
			onChange: r
		})] }), /* @__PURE__ */ (0, Q.jsx)(M, { children: /* @__PURE__ */ (0, Q.jsx)(E, {
			type: "submit",
			...K(i.busy === "save"),
			children: "Save configuration"
		}) })]
	});
}
// src/react/settings/password-pair.tsx
function Uo({ label: e, password: t, confirmation: n, onPassword: r, onConfirmation: i, disabled: a = !1, passwordError: o, passwordHint: s, confirmationError: c, confirmationInvalid: l = !1 }) {
	return /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)(P, {
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
	}), /* @__PURE__ */ (0, Q.jsx)(P, {
		id: "access-confirm",
		type: "password",
		label: "Confirm the access password",
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
var Wo = {
	legacy: "A system-generated access passphrase is in use. Set your own password, or turn off the sign-in requirement.",
	locked: "Access settings could not be read; check the configuration file on this machine.",
	password: "A password is set. New devices need to sign in; checking \"Keep me signed in\" keeps the session for 30 days."
};
function Go({ initial: e, receipt: t, devices: n, after: r }) {
	let [i, a] = (0, Z.useState)(e), [o, s] = (0, Z.useState)(""), [c, l] = (0, Z.useState)(""), [u, d] = (0, Z.useState)(""), [f, p] = (0, Z.useState)(!1), [m, h] = (0, Z.useState)({}), g = (0, Z.useRef)(null), _ = Y(), v = (e) => {
		e.preventDefault();
		let n = {};
		i.mode === "password" && !o && (n.current_password = "Enter the current access password"), f || ((c.length < 8 || c.length > 256) && (n.password = "The access password needs 8-256 characters"), c !== u && (n.confirmation = "The two passwords do not match")), h(n), Object.keys(n).length ? requestAnimationFrame(() => g.current?.querySelector("input[aria-invalid=\"true\"]")?.focus()) : _.run("save", (e) => G("/api/configuration/access", {
			revision: i.revision,
			action: f ? "disable" : "set",
			confirm_disable: f,
			current_password: o,
			password: f ? "" : c,
			confirmation: f ? "" : u
		}, "POST", e), (e) => {
			a(e), s(""), l(""), d(""), p(!1), h({}), t(e.mode === "open" ? "Access password turned off" : "Configuration saved");
		}, (e) => {
			let t = e instanceof qe ? e.body : null, n = t?.errors || t?.detail?.errors;
			n ? h(n) : _.setError(q(e));
		});
	}, y = Wo[i.mode], b = i.mode !== "locked";
	return /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [
		/* @__PURE__ */ (0, Q.jsxs)(L, {
			guide: "access",
			title: "访问密码",
			onSubmit: v,
			children: [/* @__PURE__ */ (0, Q.jsx)("div", {
				ref: g,
				children: /* @__PURE__ */ (0, Q.jsxs)(V, { children: [
					y ? /* @__PURE__ */ (0, Q.jsx)(N, { children: y }) : null,
					i.mode === "open" ? /* @__PURE__ */ (0, Q.jsx)(F, {
						tone: "warning",
						title: "No access password set",
						children: "Any device that can reach Peach can view the library by opening the address, with no sign-in required."
					}) : null,
					i.mode === "password" || i.mode === "legacy" ? /* @__PURE__ */ (0, Q.jsx)(D, {
						isSelected: f,
						onChange: p,
						children: "Turn off the access password"
					}) : null,
					i.mode === "password" ? /* @__PURE__ */ (0, Q.jsx)(P, {
						id: "access-current",
						type: "password",
						label: "'Current access password'",
						autoComplete: "current-password",
						maxLength: 256,
						value: o,
						onChange: s,
						isRequired: !0,
						validationBehavior: "aria",
						isInvalid: !!m.current_password,
						hint: m.current_password
					}) : null,
					b && !f ? /* @__PURE__ */ (0, Q.jsx)(Uo, {
						label: i.mode === "password" ? "New access password" : "Set the access password",
						password: c,
						confirmation: u,
						onPassword: l,
						onConfirmation: d,
						passwordError: m.password,
						confirmationError: m.confirmation,
						passwordHint: "At least 8 characters. After saving, other devices must sign in again."
					}) : null,
					f ? /* @__PURE__ */ (0, Q.jsx)(F, {
						tone: "warning",
						title: "Access range",
						children: "After saving, devices that can reach Peach will access the library directly."
					}) : null,
					_.error ? /* @__PURE__ */ (0, Q.jsx)(k, { children: _.error }) : null
				] })
			}), b ? /* @__PURE__ */ (0, Q.jsx)(M, { children: /* @__PURE__ */ (0, Q.jsx)(E, {
				type: "submit",
				...K(_.busy === "save"),
				children: "Save configuration"
			}) }) : null]
		}),
		n && (i.mode === "password" || i.mode === "legacy") ? n(i) : null,
		r ? r(i) : null
	] });
}
// src/react/settings/api-token-settings.tsx
var Ko = "/api/configuration/access/token/rotate";
function qo(e, t) {
	let n = "用旧口令的脚本和 API 调用会立即失效。", r = e === "legacy" ? `其他浏览器现在用这串口令登录，会全部退出，需要输入新口令重新登录；本机保持登录。${n}` : e === "open" ? `浏览器不需要登录，不受影响。${n}` : `用访问密码登录的浏览器不受影响。${n}`;
	return t ? `${r}另一台电脑要换成同一份口令文件，两台之间才能继续互取复核结果。` : r;
}
function Jo({ initial: e, mode: t, receipt: n }) {
	let [r, i] = (0, Z.useState)(e), [a, o] = (0, Z.useState)(null), s = Y(), c = Un();
	return /* @__PURE__ */ (0, Q.jsxs)(L, {
		title: "访问口令",
		children: [/* @__PURE__ */ (0, Q.jsxs)(V, { children: [
			/* @__PURE__ */ (0, Q.jsx)(N, { children: "脚本和 API 调用在 X-Token 请求头里携带访问口令。口令只存在这台电脑上，页面不显示。" }),
			a ? /* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex min-w-0 flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, Q.jsxs)("div", {
						className: "flex min-w-0 flex-wrap items-end gap-2",
						children: [/* @__PURE__ */ (0, Q.jsx)(P, {
							className: "min-w-0 flex-1",
							label: "新访问口令",
							value: a.token,
							isReadOnly: !0,
							autoComplete: "off"
						}), /* @__PURE__ */ (0, Q.jsx)(E, {
							variant: "secondary",
							"aria-label": "复制新访问口令",
							onClick: () => void s.run("copy", () => navigator.clipboard.writeText(a.token), () => n("已复制口令")),
							children: "复制口令"
						})]
					}),
					s.error ? /* @__PURE__ */ (0, Q.jsx)(N, {
						role: "status",
						children: "复制失败，请选中口令复制。"
					}) : null,
					/* @__PURE__ */ (0, Q.jsx)(F, {
						tone: "info",
						title: "新口令只显示这一次",
						children: "已经生效，不用重启。离开本页后不再显示，之后在终端运行 peach token 查看。"
					})
				]
			}) : null,
			a?.relogin ? /* @__PURE__ */ (0, Q.jsx)(F, {
				tone: "warning",
				title: "本机需要重新登录",
				children: "刷新页面后用新口令登录。"
			}) : null,
			r.rotatable ? null : /* @__PURE__ */ (0, Q.jsx)(N, { children: r.reason })
		] }), r.rotatable ? /* @__PURE__ */ (0, Q.jsx)(M, {
			status: "更换后立即生效。",
			children: /* @__PURE__ */ (0, Q.jsx)(E, {
				variant: "secondary",
				onClick: () => void rn({
					title: "更换访问口令",
					body: qo(t, r.paired),
					confirmLabel: "更换口令",
					onConfirm: async () => {
						let e = await G(Ko, {});
						i(e), o(e), e.mode === "legacy" && c.invalidateQueries({ queryKey: ["access-sessions"] }), n(e.signed_out ? `已更换访问口令，${e.signed_out} 台设备需要重新登录` : "已更换访问口令");
					}
				}),
				children: "更换口令"
			})
		}) : null]
	});
}
// src/react/settings/certificate-trust.tsx
function Yo({ rows: e, label: t }) {
	let n = e.length + 8, r = e.flatMap((e, t) => [...e].flatMap((e, n) => e === "1" ? [`M${n + 4} ${t + 4}h1v1h-1z`] : [])).join("");
	return /* @__PURE__ */ (0, Q.jsx)("svg", {
		role: "img",
		"aria-label": t,
		viewBox: `0 0 ${n} ${n}`,
		shapeRendering: "crispEdges",
		className: "size-40 shrink-0 rounded-lg bg-white text-black",
		children: /* @__PURE__ */ (0, Q.jsx)("path", {
			d: r,
			fill: "currentColor"
		})
	});
}
var Xo = [
	["iPhone／iPad", "用相机扫码，在 Safari 中允许下载描述文件；到「设置 → 通用 → VPN 与设备管理」安装它，再到「设置 → 通用 → 关于本机 → 证书信任设置」打开这张证书的完全信任。"],
	["Android", "扫码下载后，到「设置 → 安全 → 加密与凭据 → 安装证书 → CA 证书」选择下载的文件。菜单名称因厂商而异。"],
	["电脑", "点「下载证书」。Windows 双击文件，安装到「受信任的根证书颁发机构」；macOS 在「钥匙串访问」里把它设为「始终信任」。"]
];
function Zo({ initial: e }) {
	let t = X({
		queryKey: ["ca-certificate"],
		initialData: e,
		queryFn: ({ signal: e }) => W("/api/configuration/certificate", e),
		staleTime: Infinity,
		refetchInterval: Math.max(60, e.expires_in - 60) * 1e3
	}).data, n = t.fingerprint.split(":"), r = [
		0,
		8,
		16,
		24
	].map((e) => n.slice(e, e + 8).join(":"));
	return /* @__PURE__ */ (0, Q.jsxs)(L, {
		title: "其他设备信任 HTTPS 证书",
		children: [
			/* @__PURE__ */ (0, Q.jsxs)(V, { children: [/* @__PURE__ */ (0, Q.jsx)(N, { children: "手机、平板和其他电脑第一次打开 HTTPS 地址时会提示证书不受信任。在那台设备上安装并信任本机 CA 证书后不再提示。证书只含公开部分，不含私钥。" }), /* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex min-w-0 flex-wrap items-start gap-4",
				children: [/* @__PURE__ */ (0, Q.jsx)(Yo, {
					rows: t.qr,
					label: "手机扫码下载本机 CA 证书"
				}), /* @__PURE__ */ (0, Q.jsxs)("div", {
					className: "flex min-w-0 flex-1 basis-64 flex-col gap-2",
					children: [/* @__PURE__ */ (0, Q.jsxs)(ut, { children: [/* @__PURE__ */ (0, Q.jsx)(j, {
						term: "SHA-256 指纹",
						children: /* @__PURE__ */ (0, Q.jsx)("span", {
							className: "flex max-w-sm flex-wrap justify-end gap-x-2 font-mono text-caption-1-regular",
							children: r.map((e, t) => /* @__PURE__ */ (0, Q.jsx)("span", {
								className: "whitespace-nowrap",
								children: e
							}, t))
						})
					}), /* @__PURE__ */ (0, Q.jsx)(j, {
						term: "有效期至",
						children: t.not_after
					})] }), /* @__PURE__ */ (0, Q.jsx)(N, { children: "二维码 10 分钟内有效，页面开着时会自动更新。Android 打不开 .local 地址时，在这台电脑上改用局域网 IP 打开本页再扫码。" })]
				})]
			})] }),
			/* @__PURE__ */ (0, Q.jsx)(I, { children: Xo.map(([e, t]) => /* @__PURE__ */ (0, Q.jsx)(B, {
				label: e,
				description: t
			}, e)) }),
			/* @__PURE__ */ (0, Q.jsx)(V, {
				divided: !0,
				children: /* @__PURE__ */ (0, Q.jsx)(N, { children: "装好后在设备的证书详情里核对 SHA-256 指纹，与上面一致才算装对。" })
			}),
			/* @__PURE__ */ (0, Q.jsx)(M, { children: /* @__PURE__ */ (0, Q.jsx)(Je, {
				href: t.download,
				download: "peach-local-ca.crt",
				leadingIcon: Yn,
				children: "下载证书"
			}) })
		]
	});
}
// src/react/settings/device-sessions.tsx
var Qo = "/api/configuration/access/sessions", $o = (e) => e.device || "未识别的浏览器", es = {
	glyph: pt,
	brand: "apple"
}, ts = {
	glyph: bn,
	brand: "android"
}, ns = {
	iPhone: {
		platform: es,
		terminal: Yt
	},
	iPad: {
		platform: es,
		terminal: at
	},
	Android: {
		platform: ts,
		terminal: Yt
	},
	"Android 平板": {
		platform: ts,
		terminal: at
	},
	ChromeOS: {
		platform: { browser: "chrome" },
		terminal: Xn
	},
	Windows: {
		platform: {
			glyph: qt,
			brand: "windows"
		},
		terminal: Xn
	},
	macOS: {
		platform: es,
		terminal: Xn
	},
	Linux: { terminal: Xn }
}, rs = "inline size-4 -mt-0.5 mr-1 align-middle";
function is({ platform: e }) {
	if ("browser" in e) return /* @__PURE__ */ (0, Q.jsx)(ur, {
		name: e.browser,
		className: rs
	});
	let { glyph: t, brand: n } = e;
	return /* @__PURE__ */ (0, Q.jsx)(t, {
		"aria-hidden": !0,
		"data-platform-mark": n,
		className: rs
	});
}
function as({ row: e }) {
	if (!e.device) return $o(e);
	let t = e.device.split(" · "), n = ns[t.at(-1) ?? ""] ? t.pop() : "", r = t.join(" · "), i = n ? ns[n].platform : void 0;
	return /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [
		r ? /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [dr(r) ? /* @__PURE__ */ (0, Q.jsx)(ur, {
			name: r,
			className: rs
		}) : null, r] }) : null,
		r && n ? " · " : null,
		n ? /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [i ? /* @__PURE__ */ (0, Q.jsx)(is, { platform: i }) : null, n] }) : null
	] });
}
function os({ row: e }) {
	let t = ns[e.device.split(" · ").at(-1) ?? ""]?.terminal ?? cn;
	return /* @__PURE__ */ (0, Q.jsx)(t, {
		"aria-hidden": !0,
		className: "size-5 shrink-0 text-foreground-icon-secondary"
	});
}
function ss({ row: e, children: t }) {
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: "flex min-h-13 w-full items-center justify-between gap-4 border-b border-separator-border py-2.5 pr-2.5 last:border-b-0",
		children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
			className: "flex min-w-0 items-center gap-3",
			children: [/* @__PURE__ */ (0, Q.jsx)(os, { row: e }), /* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex min-w-0 flex-col",
				children: [/* @__PURE__ */ (0, Q.jsx)("p", {
					className: "text-body-regular text-text-primary",
					children: /* @__PURE__ */ (0, Q.jsx)(as, { row: e })
				}), /* @__PURE__ */ (0, Q.jsx)("p", {
					className: "text-body-2-regular text-text-secondary",
					children: us(e)
				})]
			})]
		}), t]
	});
}
function cs(e, t = Date.now() / 1e3) {
	let n = Math.max(0, t - e);
	return n < 60 ? "刚刚" : n < 3600 ? `${Math.floor(n / 60)} 分钟前` : n < 86400 ? `${Math.floor(n / 3600)} 小时前` : n < 2592e3 ? `${Math.floor(n / 86400)} 天前` : (/* @__PURE__ */ new Date(e * 1e3)).toLocaleDateString("zh-CN");
}
function ls(e) {
	return e.network === "loopback" ? "运行 Peach 的电脑" : e.network ? e.remote ? `公网入口 · ${e.network}` : e.network : "";
}
var us = (e) => [`最近活动 ${cs(e.last_seen)}`, ls(e)].filter(Boolean).join(" · ");
function ds({ revision: e, receipt: t }) {
	let n = X({
		queryKey: ["access-sessions", e],
		refetchOnMount: "always",
		queryFn: ({ signal: e }) => W(Qo, e)
	});
	return n.error ? /* @__PURE__ */ (0, Q.jsx)(L, {
		title: "已登录的设备",
		children: /* @__PURE__ */ (0, Q.jsx)(V, { children: /* @__PURE__ */ (0, Q.jsx)(k, { children: q(n.error) }) })
	}) : n.isFetching || !n.data ? /* @__PURE__ */ (0, Q.jsx)(It, {
		label: "正在读取已登录的设备",
		html: ln
	}) : /* @__PURE__ */ (0, Q.jsx)(fs, {
		initial: n.data,
		receipt: t
	});
}
function fs({ initial: e, receipt: t }) {
	let [n, r] = (0, Z.useState)(e);
	(0, Z.useEffect)(() => r(e), [e]);
	let i = n.sessions.filter((e) => !e.current);
	(0, Z.useEffect)(() => {
		An("devices", {
			rows: Math.min(n.sessions.length, 8),
			manageable: n.manageable && i.length > 0
		});
	}, [n, i.length]);
	let a = (e) => void rn({
		title: "撤销这台设备的登录",
		body: `${$o(e)}（${us(e)}）下次打开 Peach 需要重新输入访问密码。`,
		confirmLabel: "撤销登录",
		onConfirm: async () => {
			r(await G(`${Qo}/revoke`, {
				revision: n.revision,
				id: e.id
			})), t("已撤销登录");
		}
	});
	return /* @__PURE__ */ (0, Q.jsxs)(L, {
		title: "已登录的设备",
		children: [
			n.sessions.length ? /* @__PURE__ */ (0, Q.jsx)(I, { children: n.sessions.map((e) => /* @__PURE__ */ (0, Q.jsx)(ss, {
				row: e,
				children: e.current ? /* @__PURE__ */ (0, Q.jsx)(et, {
					color: "blue",
					variant: "caption",
					children: "本机"
				}) : n.manageable ? /* @__PURE__ */ (0, Q.jsx)(E, {
					size: "small",
					variant: "secondary",
					"aria-label": `撤销 ${$o(e)} 的登录`,
					onClick: () => a(e),
					children: "撤销"
				}) : null
			}, e.id)) }) : /* @__PURE__ */ (0, Q.jsx)(V, { children: /* @__PURE__ */ (0, Q.jsx)(N, { children: "还没有浏览器用访问密码登录过。" }) }),
			!n.manageable && i.length ? /* @__PURE__ */ (0, Q.jsx)(V, {
				divided: !0,
				children: /* @__PURE__ */ (0, Q.jsx)(N, { children: "在运行 Peach 的电脑上打开这一页才能撤销。" })
			}) : null,
			n.manageable && i.length ? /* @__PURE__ */ (0, Q.jsx)(M, {
				status: "修改访问密码会让全部设备退出。",
				children: /* @__PURE__ */ (0, Q.jsx)(E, {
					variant: "secondary",
					onClick: () => void rn({
						title: "撤销其他设备的登录",
						body: `除本机以外的 ${i.length} 台设备下次打开 Peach 需要重新输入访问密码。`,
						confirmLabel: "撤销登录",
						onConfirm: async () => {
							let e = await G(`${Qo}/revoke`, {
								revision: n.revision,
								scope: "others"
							});
							r(e), t(`已撤销 ${e.removed} 台设备的登录`);
						}
					}),
					children: "撤销其他设备"
				})
			}) : null
		]
	});
}
// src/react/components/configuration-fields.tsx
function ps({ id: e, label: t, value: n, onChange: r, options: i, isDisabled: a, isInvalid: o, children: s }) {
	let c = `${e}-label`;
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: "flex flex-col gap-1.5",
		children: [
			/* @__PURE__ */ (0, Q.jsx)(gt, {
				id: c,
				elementType: "span",
				children: t
			}),
			/* @__PURE__ */ (0, Q.jsx)(Lt, {
				id: e,
				"aria-labelledby": c,
				orientation: "horizontal",
				className: Nt,
				value: n,
				onChange: r,
				isDisabled: a,
				isInvalid: o,
				children: i.map((e) => /* @__PURE__ */ (0, Q.jsx)(Ge, {
					value: e.value,
					className: Mt,
					children: e.label
				}, e.value))
			}),
			s
		]
	});
}
function ms({ prefix: e, suffix: t, ...n }) {
	let r = () => /* @__PURE__ */ (0, Q.jsx)("span", {
		className: "shrink-0 pr-1 text-body-regular text-text-secondary",
		children: t
	});
	return /* @__PURE__ */ (0, Q.jsx)(P, {
		...n,
		leadingAddon: e ? /* @__PURE__ */ (0, Q.jsx)("span", {
			className: "shrink-0 pl-1 text-body-regular text-text-secondary",
			children: e
		}) : void 0,
		trailingIcon: t ? r : void 0
	});
}
// src/react/settings/port-settings.tsx
var hs = [{
	value: "0.0.0.0",
	label: "Devices on the same LAN"
}, {
	value: "127.0.0.1",
	label: "This computer only"
}];
function gs({ data: e, receipt: t }) {
	let n = e.network, r = n ? n.editable : e.editable && e.port_editable !== !1, [i, a] = (0, Z.useState)(n?.host ?? "127.0.0.1"), [o, s] = (0, Z.useState)(n?.mdns_name ?? "peach"), [c, l] = (0, Z.useState)(String(e.port)), [u, d] = (0, Z.useState)({}), [f, p] = (0, Z.useState)(null), m = Y();
	return (0, Z.useEffect)(() => {
		if (!f) return;
		let e = setTimeout(() => location.assign(f.url), Ga);
		return () => clearTimeout(e);
	}, [f]), f ? /* @__PURE__ */ (0, Q.jsx)(L, {
		guide: "port",
		title: "访问地址",
		children: /* @__PURE__ */ (0, Q.jsx)(V, { children: /* @__PURE__ */ (0, Q.jsxs)(F, {
			tone: "success",
			title: "配置已保存",
			children: ["Peach 正在重新启动。", /* @__PURE__ */ (0, Q.jsx)(_t, {
				href: f.url,
				size: "small",
				children: "返回网络与访问"
			})]
		}) })
	}) : /* @__PURE__ */ (0, Q.jsxs)(L, {
		guide: "port",
		title: "访问地址",
		onSubmit: r ? (r) => {
			r.preventDefault(), d({}), m.run("save", (t) => G(Qe, {
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
				p({ url: new URL("/settings/network", e.url).href }), t("Configuration saved");
			}, (e) => {
				let t = e instanceof qe && e.status === 400 ? e.body?.errors : null;
				t && (t.port || t.host || t.mdns_name) ? d(t) : m.setError(q(e));
			});
		} : void 0,
		children: [/* @__PURE__ */ (0, Q.jsxs)(V, { children: [
			n ? /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)(_s, {
				label: "Local address",
				value: n.local_url,
				receipt: t
			}), n.lan_url || n.ip_url ? /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [
				/* @__PURE__ */ (0, Q.jsx)(_s, {
					label: "Phone connection address",
					value: n.lan_url || n.ip_url,
					receipt: t
				}),
				n.lan_url && n.ip_url ? /* @__PURE__ */ (0, Q.jsx)(_s, {
					label: "Fallback IP address",
					value: n.ip_url,
					receipt: t
				}) : null,
				/* @__PURE__ */ (0, Q.jsxs)(N, { children: ["Phone and computer on the same Wi-Fi.", n.ip_url && n.lan_url ? "If the hostname does not open, try the fallback IP address." : ""] })
			] }) : /* @__PURE__ */ (0, Q.jsx)(N, { children: n.scope === "local" ? "Only this computer may access for now, so phones cannot connect." : "LAN address not obtained. Check the network connection and service startup configuration on this computer." })] }) : null,
			r ? /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [n?.editable ? /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)(ps, {
				id: "configHost",
				label: "Who can access",
				value: i,
				onChange: a,
				options: hs,
				isDisabled: !!m.busy,
				isInvalid: !!u.host,
				children: u.host ? /* @__PURE__ */ (0, Q.jsx)(k, { children: u.host }) : null
			}), i === "0.0.0.0" ? /* @__PURE__ */ (0, Q.jsx)(ms, {
				id: "configMdnsName",
				label: "LAN access address",
				value: o,
				onChange: s,
				prefix: n.local_url.startsWith("https:") ? "https://" : "http://",
				suffix: ".local",
				autoComplete: "off",
				spellCheck: "false",
				maxLength: 63,
				isDisabled: !!m.busy,
				validationBehavior: "aria",
				isInvalid: !!u.mdns_name,
				hint: u.mdns_name || void 0
			}) : null] }) : null, /* @__PURE__ */ (0, Q.jsx)(ms, {
				id: "configPort",
				label: "Port",
				prefix: "localhost:",
				inputMode: "numeric",
				value: c,
				onChange: l,
				isDisabled: !!m.busy,
				validationBehavior: "aria",
				isInvalid: !!u.port,
				hint: u.port
			})] }) : /* @__PURE__ */ (0, Q.jsx)(N, { children: e.notice || "Access range, name, and port are managed by the service startup configuration." }),
			n?.editable && i === "0.0.0.0" && n.scope === "local" ? /* @__PURE__ */ (0, Q.jsx)(N, { children: "After saving and restarting, the phone connection address shows. Set an access password below." }) : null,
			m.error ? /* @__PURE__ */ (0, Q.jsx)(F, {
				tone: "error",
				title: "Not saved",
				children: m.error
			}) : null
		] }), r ? /* @__PURE__ */ (0, Q.jsx)(M, {
			status: "Peach will restart after saving and jump to the new address.",
			children: /* @__PURE__ */ (0, Q.jsx)(E, {
				type: "submit",
				...K(m.busy === "save"),
				children: "Save configuration"
			})
		}) : null]
	});
}
function _s({ label: e, value: t, receipt: n }) {
	let r = Y();
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: "flex min-w-0 flex-col gap-2",
		children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
			className: "flex min-w-0 flex-wrap items-end gap-2",
			children: [/* @__PURE__ */ (0, Q.jsx)(P, {
				className: "min-w-0 flex-1",
				label: e,
				value: t,
				isReadOnly: !0,
				autoComplete: "off"
			}), /* @__PURE__ */ (0, Q.jsx)(E, {
				variant: "secondary",
				"aria-label": `Copy ${e}`,
				onClick: () => void r.run("copy", () => navigator.clipboard.writeText(t), () => n("Address copied")),
				children: "Copy address"
			})]
		}), r.error ? /* @__PURE__ */ (0, Q.jsx)(N, {
			role: "status",
			children: "Copy failed; select the address and copy it."
		}) : null]
	});
}
// src/react/settings/peach-proxy-fields.tsx
var vs = [
	["environment", "Follow the environment"],
	["direct", "Direct"],
	["proxy", "Custom"]
];
function ys({ mode: e, onChange: t, labelledBy: n }) {
	return /* @__PURE__ */ (0, Q.jsx)(R, {
		"aria-label": n ? void 0 : "Connection method",
		"aria-labelledby": n,
		selectedKey: e,
		onSelectionChange: (e) => {
			e !== null && t(String(e));
		},
		children: vs.map(([e, t]) => /* @__PURE__ */ (0, Q.jsx)(z, {
			id: e,
			children: t
		}, e))
	});
}
function bs({ id: e, value: t, onChange: n, saved: r = !1, error: i }) {
	return /* @__PURE__ */ (0, Q.jsx)(P, {
		id: e,
		type: "password",
		label: "Proxy address",
		autoComplete: "off",
		spellCheck: "false",
		value: t,
		onChange: n,
		placeholder: r ? "Saved; leave empty to keep" : "http://127.0.0.1:7890",
		validationBehavior: "aria",
		isInvalid: !!i,
		hint: i
	});
}
// src/react/settings/tunnel-settings.tsx
var xs = 2e3, Ss = [["quick", "Temporary link"], ["named", "Named tunnel"]], Cs = {
	quick: "For temporary preview only; the address is random and changes after restart. Set an access password before starting.",
	named: "Uses the fixed domain you bound on Cloudflare. Set an access password before starting."
};
function ws({ revision: e, initial: t, receipt: n }) {
	let [r, i] = (0, Z.useState)(t), [a, o] = (0, Z.useState)(e), [s, c] = (0, Z.useState)(t.mode), [l, u] = (0, Z.useState)(t.hostname), [d, f] = (0, Z.useState)(""), [p, m] = (0, Z.useState)({}), h = Y(), g = r.state === "starting" || r.state === "running", _ = r.named_available && s === "named";
	(0, Z.useEffect)(() => {
		if (r.state !== "starting") return;
		let e = new AbortController(), t = window.setInterval(() => {
			un(e.signal).then((t) => {
				!e.signal.aborted && t.tunnel && (On.setQueryData(Ze, t), i(t.tunnel), o(t.revision));
			}).catch(() => void 0);
		}, xs);
		return () => {
			e.abort(), window.clearInterval(t);
		};
	}, [r.state]);
	let v = (e, t, n) => {
		m({}), h.run(e, (e) => G("/api/configuration/tunnel", {
			revision: a,
			enabled: t,
			mode: s,
			hostname: l,
			token: d
		}, "POST", e), (e) => {
			i(e), o(e.revision), c(e.mode), u(e.hostname), f(""), n(e);
		}, (e) => {
			let t = e instanceof qe ? e.body : null, n = t?.errors || t?.detail?.errors;
			n ? m(n) : h.setError(q(e));
		});
	};
	return /* @__PURE__ */ (0, Q.jsxs)(L, {
		id: "tunnel",
		guide: "tunnel",
		title: "Cloudflare 公网入口",
		onSubmit: (e) => {
			e.preventDefault(), v("save", g, () => n("Configuration saved"));
		},
		aside: /* @__PURE__ */ (0, Q.jsx)(H, {
			tone: r.error ? "error" : g ? "progress" : "neutral",
			children: r.error ? "连接失败" : r.state === "running" ? "运行中" : r.state === "starting" ? "连接中" : "已停止"
		}),
		children: [/* @__PURE__ */ (0, Q.jsxs)(V, { children: [
			r.named_available ? /* @__PURE__ */ (0, Q.jsx)(Lt, {
				"aria-label": "Public entry form (pick one of two)",
				value: s,
				isDisabled: g,
				onChange: (e) => c(e),
				className: Nt,
				children: Ss.map(([e, t]) => /* @__PURE__ */ (0, Q.jsx)(Ge, {
					value: e,
					className: Mt,
					children: t
				}, e))
			}) : null,
			/* @__PURE__ */ (0, Q.jsx)(N, { children: Cs[_ ? "named" : "quick"] }),
			_ ? /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)(P, {
				id: "tunnel-hostname",
				label: "Public hostname",
				autoComplete: "off",
				maxLength: 253,
				value: l,
				onChange: u,
				isDisabled: g,
				validationBehavior: "aria",
				isInvalid: !!p.hostname,
				hint: p.hostname || "The hostname in Cloudflare Zero Trust that points at this computer."
			}), /* @__PURE__ */ (0, Q.jsx)(P, {
				id: "tunnel-token",
				type: "password",
				label: "Tunnel token",
				autoComplete: "off",
				maxLength: 2048,
				value: d,
				onChange: f,
				isDisabled: g,
				validationBehavior: "aria",
				hint: r.token_set ? "Saved. Leave blank to keep unchanged." : "Copy it from the tunnel details page in Cloudflare Zero Trust."
			})] }) : null,
			r.available ? null : /* @__PURE__ */ (0, Q.jsx)(F, {
				tone: "warning",
				title: "Could not find cloudflared",
				children: "Install the official cloudflared, or specify a path via tunnel.binary in the settings file and PEACH_CLOUDFLARED."
			}),
			r.state === "running" && r.url ? /* @__PURE__ */ (0, Q.jsx)(F, {
				tone: "info",
				title: "Public address",
				children: /* @__PURE__ */ (0, Q.jsx)(A, {
					href: r.url,
					children: r.url
				})
			}) : null,
			r.state === "starting" ? /* @__PURE__ */ (0, Q.jsx)(F, {
				tone: "info",
				title: "Connecting",
				children: "Waiting for cloudflared to connect to the Cloudflare edge."
			}) : null,
			r.error ? /* @__PURE__ */ (0, Q.jsx)(k, { children: r.error }) : null,
			h.error ? /* @__PURE__ */ (0, Q.jsx)(k, { children: h.error }) : null
		] }), /* @__PURE__ */ (0, Q.jsxs)(M, {
			status: r.enabled ? "Resumes automatically after Peach restarts." : void 0,
			children: [/* @__PURE__ */ (0, Q.jsx)(E, {
				variant: r.named_available ? "secondary" : "primary",
				onClick: () => v("toggle", !g, (e) => n(e.enabled ? "Public entry point started" : "Public entry point stopped")),
				...K(h.busy === "toggle"),
				children: g ? "Stop the public entry" : "Start the public entry point"
			}), r.named_available ? /* @__PURE__ */ (0, Q.jsx)(E, {
				type: "submit",
				...K(h.busy === "save"),
				children: "Save configuration"
			}) : null]
		})]
	});
}
// src/react/settings/network-settings.tsx
function Ts({ data: e, receipt: t, panel: n, issues: r }) {
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		...pr(n),
		children: [
			r,
			e.network || e.editable && e.port_editable !== !1 && !e.section_errors?.media_sources ? /* @__PURE__ */ (0, Q.jsx)(gs, {
				data: e,
				receipt: t
			}) : null,
			e.access ? /* @__PURE__ */ (0, Q.jsx)(Go, {
				initial: e.access,
				receipt: t,
				devices: (e) => /* @__PURE__ */ (0, Q.jsx)(ds, {
					revision: e.revision,
					receipt: t
				}),
				after: e.api_token ? (n) => /* @__PURE__ */ (0, Q.jsx)(Jo, {
					initial: e.api_token,
					mode: n.mode,
					receipt: t
				}) : void 0
			}) : null,
			e.certificate ? /* @__PURE__ */ (0, Q.jsx)(Zo, { initial: e.certificate }) : null,
			e.tunnel ? /* @__PURE__ */ (0, Q.jsx)(ws, {
				revision: e.revision,
				initial: e.tunnel,
				receipt: t
			}) : null,
			e.peach_proxy ? /* @__PURE__ */ (0, Q.jsx)(Es, {
				initial: e.peach_proxy,
				receipt: t
			}) : null
		]
	});
}
function Es({ initial: e, receipt: t }) {
	let [n, r] = (0, Z.useState)(e), [i, a] = (0, Z.useState)(e.mode), [o, s] = (0, Z.useState)(""), c = Y();
	return /* @__PURE__ */ (0, Q.jsxs)(L, {
		id: "peachProxy",
		guide: "proxy",
		title: "Peach 代理",
		onSubmit: (e) => {
			e.preventDefault(), c.run("save", (e) => G("/api/configuration/peach-proxy", {
				mode: i,
				proxy: o
			}, "POST", e), (e) => {
				r(e), s(""), t("Configuration saved");
			});
		},
		children: [
			/* @__PURE__ */ (0, Q.jsx)(I, { children: /* @__PURE__ */ (0, Q.jsx)(B, {
				label: "连接方式",
				description: "Peach 访问外网和采集来源时使用。",
				children: /* @__PURE__ */ (0, Q.jsx)(ys, {
					mode: i,
					onChange: a
				})
			}) }),
			i === "proxy" || n.needs_selection || c.error ? /* @__PURE__ */ (0, Q.jsxs)(V, {
				divided: !0,
				children: [
					i === "proxy" ? /* @__PURE__ */ (0, Q.jsx)(bs, {
						id: "peachProxyAddress",
						value: o,
						onChange: s,
						saved: n.proxy_saved
					}) : null,
					n.needs_selection ? /* @__PURE__ */ (0, Q.jsx)(F, {
						tone: "warning",
						title: "A connection method must be chosen.",
						children: "Existing sources use different proxy addresses; choose the shared connection method."
					}) : null,
					c.error ? /* @__PURE__ */ (0, Q.jsx)(k, { children: c.error }) : null
				]
			}) : null,
			/* @__PURE__ */ (0, Q.jsx)(M, { children: /* @__PURE__ */ (0, Q.jsx)(E, {
				type: "submit",
				...K(c.busy === "save"),
				children: "Save configuration"
			}) })
		]
	});
}
// src/react/follow-manage/credentials.tsx
var Ds = "This will clear this source's login credentials on this machine and in shared copies.", Os = "Other system users can read this credentials file. On the Mac or Linux computer running Peach, set the file permissions so only the current user can read and write it (0600).";
function ks(e, t) {
	return (e.shared_fields || []).includes(t) ? "From sharing; leave empty to keep as is" : e.fields.includes(t) ? "Saved; leave empty to keep as is" : "Not filled in";
}
function As({ row: e }) {
	if (an(e)) return /* @__PURE__ */ (0, Q.jsx)(et, {
		variant: "caption",
		color: "lime",
		children: "Configured"
	});
	let t = e.requirement === "required" ? "yellow" : e.requirement === "blocked" ? "rose" : "neutral";
	return /* @__PURE__ */ (0, Q.jsx)(et, {
		variant: "caption",
		color: t,
		children: $e[e.requirement] || ""
	});
}
function js({ row: e, readOnly: t, toast: n }) {
	let [r, i] = (0, Z.useState)({}), [a, o] = (0, Z.useState)(""), s = an(e), c = Hn({
		mutationFn: (t) => Pn(e.provider, t),
		onSuccess: (e, t) => {
			e.note ? o(e.note) : (o(""), i({}), On.invalidateQueries({
				queryKey: st,
				exact: !0
			}), n(Object.keys(t).length ? "Source credentials saved" : "Source credentials cleared"));
		},
		onError: (e) => o(q(e))
	}), l = () => {
		let e = Object.fromEntries(Object.entries(r).map(([e, t]) => [e, t.trim()]).filter(([, e]) => e));
		Object.keys(e).length ? c.mutate(e) : o("Nothing was filled in");
	};
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: "flex flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, Q.jsxs)(N, { children: [e.why, e.where ? /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [" ", /* @__PURE__ */ (0, Q.jsx)(A, {
				href: e.where,
				children: "Get credentials"
			})] }) : null] }),
			e.howto ? /* @__PURE__ */ (0, Q.jsx)(N, { children: e.howto }) : null,
			/* @__PURE__ */ (0, Q.jsx)("div", {
				className: "flex w-full flex-col gap-3",
				children: (e.needs || []).map((n) => /* @__PURE__ */ (0, Q.jsx)(P, {
					type: "password",
					label: n,
					placeholder: ks(e, n),
					autoComplete: "off",
					spellCheck: "false",
					isDisabled: t,
					value: r[n] || "",
					onChange: (e) => i({
						...r,
						[n]: e
					}),
					className: "w-full min-w-0"
				}, n))
			}),
			/* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [s ? /* @__PURE__ */ (0, Q.jsx)(E, {
					variant: "danger",
					disabled: t,
					...K(c.isPending),
					onClick: () => void rn({
						title: "Clear source credentials",
						body: Ds,
						confirmLabel: "Clear source credentials",
						danger: !0,
						onConfirm: () => c.mutateAsync({})
					}),
					children: "Clear"
				}) : null, /* @__PURE__ */ (0, Q.jsx)(E, {
					variant: "primary",
					disabled: t,
					...K(c.isPending),
					onClick: l,
					children: "Save configuration"
				})]
			}),
			a ? /* @__PURE__ */ (0, Q.jsx)(k, { children: a }) : null,
			(e.shared_fields || []).length ? /* @__PURE__ */ (0, Q.jsx)(N, { children: `${e.shared_fields.join(", ")} use login information from the shared copy; this machine keeps no separate copy. Clearing deletes the login information on both this machine and the shared copy.` }) : null,
			e.path ? /* @__PURE__ */ (0, Q.jsx)(O, {
				summary: "Credentials file",
				children: /* @__PURE__ */ (0, Q.jsx)(kt, {
					path: e.path,
					className: "font-mono text-caption-1-regular text-text-tertiary",
					onRevealed: n
				})
			}) : null
		]
	});
}
function Ms({ row: e, readOnly: t, toast: n }) {
	let r = /* @__PURE__ */ (0, Q.jsxs)("span", {
		className: "flex min-w-0 flex-wrap items-center gap-2",
		children: [
			/* @__PURE__ */ (0, Q.jsx)("span", {
				className: "inline-flex size-3.5 shrink-0 items-center justify-center",
				children: /* @__PURE__ */ (0, Q.jsx)(lr, { provider: e.provider })
			}),
			/* @__PURE__ */ (0, Q.jsx)("b", {
				className: "min-w-0 text-body-medium wrap-anywhere text-text-primary",
				children: e.provider_label
			}),
			/* @__PURE__ */ (0, Q.jsx)(As, { row: e }),
			e.missing.map((e) => /* @__PURE__ */ (0, Q.jsx)(et, {
				variant: "caption",
				color: "rose",
				children: `Missing ${e}`
			}, e))
		]
	});
	return e.requirement === "none" || e.requirement === "blocked" ? /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: "flex flex-wrap items-center gap-3 border-b border-separator-border px-6 py-5 last:border-b-0 max-sm:px-4",
		children: [r, e.requirement === "blocked" ? /* @__PURE__ */ (0, Q.jsx)(N, { children: e.why }) : null]
	}) : /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: "flex flex-col gap-2 border-b border-separator-border px-6 py-5 last:border-b-0 max-sm:px-4",
		children: [
			r,
			/* @__PURE__ */ (0, Q.jsx)(O, {
				summary: an(e) ? "Edit credentials" : "Fill in credentials",
				defaultOpen: e.requirement === "required" && !an(e),
				children: /* @__PURE__ */ (0, Q.jsx)(js, {
					row: e,
					readOnly: t,
					toast: n
				})
			}),
			e.world_readable ? /* @__PURE__ */ (0, Q.jsx)(F, {
				tone: "error",
				title: "The credentials file permissions are too broad",
				children: Os
			}) : null
		]
	});
}
function Ns({ data: e, readOnly: t, toast: n, embedded: r = !1 }) {
	let i = e.providers || [], a = i.filter((e) => e.requirement === "required" && !an(e));
	if ((0, Z.useEffect)(() => {
		An("credentials", { done: i.filter(an).map((e) => e.provider) });
	}, [e]), !i.length) return /* @__PURE__ */ (0, Q.jsx)(it, {
		size: "compact",
		icon: nn,
		title: "No configurable sources",
		children: "Connected sites and their credential states show here."
	});
	let o = a.length ? /* @__PURE__ */ (0, Q.jsx)("span", {
		className: "text-body-2-regular text-text-error-primary",
		children: `${a.length} ${a.length === 1 ? "item" : "items"} to configure`
	}) : null, s = /* @__PURE__ */ (0, Q.jsx)(Q.Fragment, { children: [
		{
			title: "Configurable credentials",
			rows: i.filter((e) => e.requirement !== "none" && e.requirement !== "blocked")
		},
		{
			title: "No credentials needed",
			rows: i.filter((e) => e.requirement === "none")
		},
		{
			title: "Not supported yet",
			rows: i.filter((e) => e.requirement === "blocked")
		}
	].filter((e) => e.rows.length).map((e) => /* @__PURE__ */ (0, Q.jsxs)("section", {
		"aria-label": e.title,
		className: "flex flex-col gap-2",
		children: [/* @__PURE__ */ (0, Q.jsx)("h4", {
			className: "text-body-medium text-text-secondary",
			children: e.title
		}), /* @__PURE__ */ (0, Q.jsx)("div", {
			className: $t({
				variant: "outlined",
				padding: "none",
				className: "flex flex-col overflow-hidden"
			}),
			children: e.rows.map((e) => /* @__PURE__ */ (0, Q.jsx)(Ms, {
				row: e,
				readOnly: t,
				toast: n
			}, e.provider))
		})]
	}, e.title)) });
	return r ? /* @__PURE__ */ (0, Q.jsx)(L, {
		guide: "credentials",
		title: "来源凭据",
		aside: o || void 0,
		children: /* @__PURE__ */ (0, Q.jsx)(V, { children: /* @__PURE__ */ (0, Q.jsx)("div", {
			className: "flex flex-col gap-4",
			children: s
		}) })
	}) : /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: $t({
			padding: "none",
			className: "flex flex-col gap-4 px-6 py-5 max-sm:px-4"
		}),
		children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2",
			children: [/* @__PURE__ */ (0, Q.jsx)("h3", {
				className: "mr-auto text-title-2-medium text-text-primary",
				children: "Source credentials"
			}), o]
		}), s]
	});
}
// src/react/settings/entry-links-settings.tsx
function Ps({ initial: e, receipt: t }) {
	let [n, r] = (0, Z.useState)(e.sites), i = Y(), a = (e, t) => r((n) => n.map((n) => n.key === e ? {
		...n,
		host: t
	} : n));
	return /* @__PURE__ */ (0, Q.jsxs)(L, {
		guide: "entry-links",
		title: "作品资料站点",
		onSubmit: (e) => {
			e.preventDefault();
			let a = { sites: Object.fromEntries(n.map((e) => [e.key, { host: e.host }])) };
			i.run("save", (e) => G("/api/configuration/entry-links", a, "POST", e), (e) => {
				r(e.sites), t("Configuration saved");
			});
		},
		children: [/* @__PURE__ */ (0, Q.jsxs)(V, { children: [
			/* @__PURE__ */ (0, Q.jsx)(N, { children: nt }),
			n.map((e) => /* @__PURE__ */ (0, Q.jsx)(P, {
				id: `entry-link-${e.key}`,
				label: /* @__PURE__ */ (0, Q.jsx)(Bt, {
					site: e.key,
					label: `${e.label} address`
				}),
				autoComplete: "off",
				maxLength: 100,
				value: e.host,
				placeholder: e.default_host,
				onChange: (t) => a(e.key, t),
				validationBehavior: "aria",
				hint: rt
			}, e.key)),
			i.error ? /* @__PURE__ */ (0, Q.jsx)(k, { children: i.error }) : null
		] }), /* @__PURE__ */ (0, Q.jsx)(M, { children: /* @__PURE__ */ (0, Q.jsx)(E, {
			type: "submit",
			...K(i.busy === "save"),
			children: "Save configuration"
		}) })]
	});
}
// src/react/settings/indexer-settings.tsx
var Fs = "/api/configuration/indexers";
function Is({ receipt: e }) {
	let t = X({
		queryKey: ["indexers"],
		queryFn: ({ signal: e }) => W(Fs, e),
		refetchOnMount: "always"
	});
	return t.error ? /* @__PURE__ */ (0, Q.jsx)(k, { children: q(t.error) }) : t.isFetching ? /* @__PURE__ */ (0, Q.jsx)(It, {
		label: "Reading resource search settings",
		html: vn
	}) : t.data ? /* @__PURE__ */ (0, Q.jsx)(zs, {
		initial: t.data,
		receipt: e
	}) : null;
}
function Ls(e) {
	try {
		return new globalThis.URL(e).host;
	} catch {
		return e;
	}
}
function Rs({ row: e, index: t }) {
	let n = [
		e.url ? Ls(e.url) : "Address not filled",
		e.enabled ? "Enabled" : "Disabled",
		e.api_key_set && !e.clear_api_key ? "API key saved" : e.api_key ? "API key pending save" : "No API key"
	];
	return /* @__PURE__ */ (0, Q.jsxs)("span", {
		className: "flex min-w-0 items-baseline gap-3",
		children: [/* @__PURE__ */ (0, Q.jsx)("span", {
			className: "shrink-0 text-text-primary",
			children: e.name || `Indexer ${t + 1}`
		}), /* @__PURE__ */ (0, Q.jsx)("span", {
			className: "truncate text-body-2-regular text-text-secondary",
			children: n.join(" · ")
		})]
	});
}
function zs({ initial: e, receipt: t }) {
	let [n, r] = (0, Z.useState)(e.indexers), i = Y();
	(0, Z.useEffect)(() => {
		An("indexers", { open: e.indexers.map((e) => !e.url) });
	}, [e]);
	let a = (e, t) => r((n) => n.map((n) => n.key === e ? {
		...n,
		...t
	} : n));
	return /* @__PURE__ */ (0, Q.jsxs)(L, {
		guide: "indexers",
		title: "资源搜索",
		onSubmit: (e) => {
			e.preventDefault(), i.run("save", (e) => G(Fs, { indexers: n }, "POST", e), (e) => {
				r(e.indexers), t("Indexer saved");
			});
		},
		children: [/* @__PURE__ */ (0, Q.jsxs)(V, { children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
			className: "flex min-w-0 flex-col gap-4",
			children: [/* @__PURE__ */ (0, Q.jsx)(O, {
				summary: "Indexer connection help",
				children: /* @__PURE__ */ (0, Q.jsxs)(N, { children: [
					"Fill in the Torznab address and API key from Prowlarr or Jackett.",
					" ",
					/* @__PURE__ */ (0, Q.jsx)(A, {
						href: "https://github.com/peach-mitao/peach/blob/master/docs/RESOURCE_SEARCH.md",
						children: "Detailed configuration notes"
					})
				] })
			}), n.map((e, t) => /* @__PURE__ */ (0, Q.jsx)("div", {
				className: "min-w-0 border-t border-separator-border pt-2",
				children: /* @__PURE__ */ (0, Q.jsx)(O, {
					defaultOpen: !e.url,
					summary: /* @__PURE__ */ (0, Q.jsx)(Rs, {
						row: e,
						index: t
					}),
					children: /* @__PURE__ */ (0, Q.jsxs)("div", {
						className: "flex min-w-0 flex-col gap-4",
						children: [
							/* @__PURE__ */ (0, Q.jsx)(P, {
								label: "Name",
								"aria-label": `Indexer ${t + 1} name`,
								value: e.name,
								maxLength: 80,
								isDisabled: !!i.busy,
								onChange: (t) => a(e.key, { name: t })
							}),
							/* @__PURE__ */ (0, Q.jsx)(P, {
								label: "Torznab address",
								"aria-label": `Indexer ${t + 1} Torznab address`,
								value: e.url,
								type: "url",
								autoComplete: "off",
								placeholder: "API address provided by the indexer",
								isDisabled: !!i.busy,
								onChange: (t) => a(e.key, { url: t })
							}),
							/* @__PURE__ */ (0, Q.jsx)(P, {
								label: "API key",
								"aria-label": `Indexer ${t + 1} API key`,
								type: "password",
								autoComplete: "new-password",
								value: e.api_key || "",
								placeholder: e.api_key_set ? "Saved; leave empty to keep" : void 0,
								isDisabled: !!i.busy,
								onChange: (t) => a(e.key, { api_key: t })
							}),
							/* @__PURE__ */ (0, Q.jsxs)("div", {
								className: "flex flex-wrap items-center gap-x-6 gap-y-2",
								children: [
									/* @__PURE__ */ (0, Q.jsx)(D, {
										isSelected: e.enabled,
										isDisabled: !!i.busy,
										onChange: (t) => a(e.key, { enabled: t }),
										children: "Enabled"
									}),
									e.api_key_set ? /* @__PURE__ */ (0, Q.jsx)(D, {
										isSelected: !!e.clear_api_key,
										isDisabled: !!i.busy,
										onChange: (t) => a(e.key, { clear_api_key: t }),
										children: "Clear the saved API key"
									}) : null,
									/* @__PURE__ */ (0, Q.jsx)(E, {
										variant: "danger",
										type: "button",
										size: "small",
										disabled: !!i.busy,
										"aria-label": `Remove indexer ${t + 1}`,
										onClick: () => r(n.filter((t) => t.key !== e.key)),
										children: "Remove"
									})
								]
							})
						]
					})
				})
			}, e.key))]
		}), i.error ? /* @__PURE__ */ (0, Q.jsx)(k, { children: i.error }) : null] }), /* @__PURE__ */ (0, Q.jsxs)(M, { children: [/* @__PURE__ */ (0, Q.jsx)(E, {
			variant: "secondary",
			type: "button",
			disabled: !!i.busy || n.length >= e.max_indexers,
			onClick: () => r([...n, {
				key: kn(),
				name: "",
				url: "",
				enabled: !0,
				api_key_set: !1
			}]),
			children: "Add indexer"
		}), /* @__PURE__ */ (0, Q.jsx)(E, {
			type: "submit",
			...K(i.busy === "save"),
			children: "Save configuration"
		})] })]
	});
}
// src/react/settings/source-settings.tsx
function Bs({ data: e, receipt: t, panel: n, issues: r }) {
	let i = X({
		queryKey: st,
		queryFn: ({ signal: e }) => dn(e),
		enabled: n?.active !== !1,
		refetchOnMount: "always"
	});
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		...pr(n),
		children: [
			r,
			/* @__PURE__ */ (0, Q.jsx)("div", {
				"data-guide-target": "sources",
				children: /* @__PURE__ */ (0, Q.jsx)(Je, {
					href: "/sources",
					variant: "secondary",
					children: "采集来源与登录状态"
				})
			}),
			i.data ? /* @__PURE__ */ (0, Q.jsx)(Ns, {
				data: i.data,
				readOnly: !!e.ledger_read_only,
				toast: t,
				embedded: !0
			}) : i.error ? /* @__PURE__ */ (0, Q.jsx)(F, {
				tone: "error",
				title: "Source credentials not fetched",
				children: q(i.error)
			}) : n?.active === !1 ? null : /* @__PURE__ */ (0, Q.jsx)(It, {
				label: "Reading source credentials",
				html: on
			}),
			/* @__PURE__ */ (0, Q.jsx)(jo, { receipt: t }),
			/* @__PURE__ */ (0, Q.jsx)(Is, { receipt: t }),
			e.entry_links ? /* @__PURE__ */ (0, Q.jsx)(Ps, {
				initial: e.entry_links,
				receipt: t
			}) : null
		]
	});
}
// src/react/settings/configuration-shape.ts
function Vs(e) {
	let t = e.downloads;
	if (!t) return null;
	let n = t.media_sources ?? [];
	return {
		cloud: n.some((e) => Ye.includes(e)),
		has115: n.includes("115"),
		pikpak: n.includes("pikpak"),
		pikpakRoots: t.pikpak_roots.length > 0,
		pikpakLoggedIn: t.pikpak.logged_in,
		browserLogin: t.pikpak_browser.available
	};
}
function Hs(e) {
	let t = e.tunnel;
	return {
		port: !!(e.editable && e.port_editable !== !1),
		addresses: e.network ? 1 + Number(!!(e.network.lan_url || e.network.ip_url)) + Number(!!(e.network.lan_url && e.network.ip_url)) : 0,
		networkEditable: !!e.network?.editable,
		lan: e.network?.host === "0.0.0.0",
		proxyAddress: e.peach_proxy?.mode === "proxy" || !!e.peach_proxy?.needs_selection,
		access: e.access?.mode ?? "",
		tunnelNamed: !!t?.named_available,
		tunnelNamedMode: !!(t?.named_available && t.mode === "named"),
		tunnelNote: !!(t && (!t.available || t.state === "starting" || t.state === "running" && t.url))
	};
}
function Us(e) {
	let t = e.updates, n = e.update_job?.state ?? "idle", r = !t || t.state === "unchecked" && !t.checked_at && n === "idle", i = +!!t?.package_kind + (r ? 0 : +!!t?.checked_at + (t?.state === "unchecked" ? 0 : 1) + (n === "idle" ? 0 : 1)), a = e.automatic_updates, o = e.storage;
	return {
		releaseFacts: t?.package_kind ? 5 : 4,
		releaseNotes: i,
		autoUpdateHelp: !(!a || a.available && !a.download_available),
		startupNote: !!e.startup?.message,
		desktopNote: !!e.startup?.desktop_message,
		storageRows: o?.usage?.categories.length ?? 0,
		storageNotes: o && !o.relocation.available ? 1 : 0,
		reporting: !!e.remote_reporting,
		reportingIdle: !(!e.remote_reporting || e.remote_reporting.available),
		sharing: !!e.library_sharing,
		sharingNotice: !!e.library_sharing?.notice,
		sharingIdle: !(!e.library_sharing || e.library_sharing.available),
		facts: e.facts.map((e) => e.term),
		uninstall: !!e.uninstall,
		uninstallHelp: !!e.uninstall?.available
	};
}
// src/react/settings/configuration-page.tsx
function Ws({ receipt: e, reopenTutorial: t, section: n = "", diagnostics: r }) {
	let i = X({
		queryKey: Ze,
		queryFn: ({ signal: e }) => un(e)
	}), a = i.data;
	return a ? /* @__PURE__ */ (0, Q.jsx)(qs, {
		data: a,
		receipt: e,
		reopenTutorial: t,
		section: n,
		diagnostics: r,
		refreshing: i.isFetching,
		reload: () => {
			i.refetch({ cancelRefetch: !1 });
		}
	}) : /* @__PURE__ */ (0, Q.jsx)("div", {
		className: "ui-configpage",
		children: /* @__PURE__ */ (0, Q.jsx)(F, {
			tone: "error",
			title: "Reading the configuration failed",
			children: i.error ? q(i.error) : "The configuration could not be fetched; refresh the page and retry."
		})
	});
}
function Gs({ data: e, sections: t, reload: n, refreshing: r }) {
	return /* @__PURE__ */ (0, Q.jsx)(Q.Fragment, { children: t.map((t) => {
		let i = e.section_errors?.[t];
		return i ? /* @__PURE__ */ (0, Q.jsx)(F, {
			tone: "error",
			title: i.title,
			action: /* @__PURE__ */ (0, Q.jsx)(E, {
				variant: "secondary",
				size: "small",
				onClick: n,
				...K(r),
				children: "Read again"
			}),
			children: i.message
		}, t) : null;
	}) });
}
var Ks = 0;
function qs({ data: e, receipt: t, reopenTutorial: n, section: r, diagnostics: i, reload: a, refreshing: o }) {
	let [s] = (0, Z.useState)(() => `board-tabs-${++Ks}`), [c, l] = (0, Z.useState)(r), u = (0, Z.useRef)(null), d = (0, Z.useRef)(c);
	(0, Z.useEffect)(() => {
		l(r);
	}, [r]), (0, Z.useEffect)(() => {
		let t = Vs(e);
		t && An("downloads", t), An("network", Hs(e)), An("maintenance", Us(e));
	}, [e]), (0, Z.useLayoutEffect)(() => {
		if (d.current === c) return;
		d.current = c;
		let e = u.current?.querySelector("[role=\"tablist\"]"), t = u.current?.querySelector(".ui-board-group-active");
		if (!e || !t) return;
		let n = parseFloat(getComputedStyle(e).top);
		if (!Number.isFinite(n) || e.getBoundingClientRect().top > n + 1) return;
		let r = matchMedia("(max-width:900px)").matches ? e.getBoundingClientRect().bottom + 8 : n;
		window.scrollTo(0, Math.max(0, window.scrollY + t.getBoundingClientRect().top - r));
	}, [c]);
	let f = (e) => {
		l(e), Ln(In(e), {
			replace: !0,
			state: wn.navigation.location.state
		});
	}, [p, m] = (0, Z.useState)(() => matchMedia("(max-width:900px)").matches);
	(0, Z.useEffect)(() => {
		let e = matchMedia("(max-width:900px)"), t = () => m(e.matches);
		return e.addEventListener("change", t), () => e.removeEventListener("change", t);
	}, []);
	let h = (0, Z.useRef)([]), g = {
		data: e,
		receipt: t
	}, _ = (t) => /* @__PURE__ */ (0, Q.jsx)(Gs, {
		data: e,
		sections: t,
		reload: a,
		refreshing: o
	}), v = [
		"peach_proxy",
		"access",
		"tunnel",
		"push_discovery",
		...e.editable && e.port_editable !== !1 ? ["media_sources"] : []
	], y = !!(e.peach_proxy || e.access || e.tunnel || e.editable && e.port_editable !== !1 || v.some((t) => e.section_errors?.[t])), b = e.downloads, x = [
		{
			title: "Library and imports",
			body: (n) => /* @__PURE__ */ (0, Q.jsxs)("div", {
				...pr(n),
				children: [
					_([
						"media_sources",
						"library_count",
						"mount_dependencies"
					]),
					!e.section_errors?.media_sources && !e.section_errors?.library_count ? /* @__PURE__ */ (0, Q.jsx)(To, { ...g }) : null,
					/* @__PURE__ */ (0, Q.jsx)(Ho, { receipt: t }),
					/* @__PURE__ */ (0, Q.jsx)(Fo, { receipt: t })
				]
			})
		},
		{
			title: "Sources and subscriptions",
			body: (e) => /* @__PURE__ */ (0, Q.jsx)(Bs, {
				...g,
				panel: e,
				issues: _(["entry_links"])
			})
		},
		...b || e.section_errors?.downloads ? [{
			title: "Download channels",
			body: (e) => /* @__PURE__ */ (0, Q.jsx)(Or, {
				initial: b,
				receipt: t,
				panel: e,
				issues: _(["downloads"])
			})
		}] : [],
		...y ? [{
			title: "Network & access",
			body: (e) => /* @__PURE__ */ (0, Q.jsx)(Ts, {
				...g,
				panel: e,
				issues: _(v)
			})
		}] : [],
		{
			title: "App and maintenance",
			body: (e) => /* @__PURE__ */ (0, Q.jsxs)("div", {
				...pr(e),
				children: [
					_([
						"startup",
						"uninstall",
						"storage",
						"remote_reporting",
						"library_sharing",
						"updates",
						"update_job",
						"automatic_updates",
						"facts"
					]),
					/* @__PURE__ */ (0, Q.jsx)(Ua, { ...g }),
					/* @__PURE__ */ (0, Q.jsx)(Io, { receipt: t }),
					/* @__PURE__ */ (0, Q.jsx)(Da, {
						...g,
						reopenTutorial: n
					})
				]
			})
		},
		{
			title: "System diagnostics",
			body: (e) => /* @__PURE__ */ (0, Q.jsx)("div", {
				...pr(e),
				children: e.active ? i : null
			})
		}
	], S = Math.max(0, x.findIndex((e) => e.title === c)), C = (e, t) => {
		let n = x.length - 1, r;
		if (e.key === "ArrowRight" || e.key === "ArrowDown") r = t === n ? 0 : t + 1;
		else if (e.key === "ArrowLeft" || e.key === "ArrowUp") r = t === 0 ? n : t - 1;
		else if (e.key === "Home") r = 0;
		else if (e.key === "End") r = n;
		else return;
		e.preventDefault(), f(x[r].title), h.current[r]?.focus();
	};
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		ref: u,
		className: "ui-configpage",
		children: [/* @__PURE__ */ (0, Q.jsx)(At, {
			className: "ui-board-local-nav",
			role: "tablist",
			"aria-label": "Configuration sections",
			"data-section-nav": "",
			"data-section-items": "",
			"data-pill-nav": "",
			"aria-orientation": p ? "horizontal" : "vertical",
			children: x.map(({ title: e }, t) => /* @__PURE__ */ (0, Q.jsx)("button", {
				ref: (e) => {
					h.current[t] = e;
				},
				type: "button",
				role: "tab",
				id: `${s}-tab-${t}`,
				"aria-controls": `${s}-panel-${t}-0`,
				"aria-selected": t === S,
				"data-pill-selected": t === S ? "" : void 0,
				"data-pill-variant": "gray",
				tabIndex: t === S ? 0 : -1,
				onClick: () => f(e),
				onKeyDown: (e) => C(e, t),
				children: e
			}, e))
		}), x.map(({ title: e, body: t }, n) => /* @__PURE__ */ (0, Q.jsxs)(Z.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)("h2", {
			className: "ui-configgroup",
			children: e
		}), t({
			index: n,
			id: `${s}-panel-${n}-0`,
			labelledBy: `${s}-tab-${n}`,
			active: n === S
		})] }, e))]
	});
}
export { Ws as ConfigurationPage };

//# debugId=9a28c9a4-de0a-4ca2-af2a-5a70a0f45b3e