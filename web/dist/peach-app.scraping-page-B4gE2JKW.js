(function() {
	try {
		var e = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "b462d411-35de-42c3-900c-71bbe2607118", e._sentryDebugIdIdentifier = "sentry-dbid-b462d411-35de-42c3-900c-71bbe2607118");
	} catch {}
})();
import { $fe21c36db05242bb$export$d7b12c4107be0d61 as e, AMANE_BRIDGE_CHECK_URL as t, AMANE_BRIDGE_KEY as n, AMANE_BRIDGE_REBUILD_URL as r, ActionSpinner as i, Button as a, CHECK_ALL_KEY as o, COVER_JOB_KEY as s, CUSTOM_SOURCES_KEY as c, CUSTOM_SOURCES_URL as l, Checkbox as u, Disclosure as d, ErrorText as f, ExternalLink as p, Fact as m, FactList as h, FieldLabel as g, Footer as _, Help as v, Input as y, IssueRow as b, JAVDB_BROWSER_LOGIN_URL as ee, LinkButton as te, Note as x, QueryErrorNote as S, Rows as ne, SCRAPING_CHECK_ALL_URL as re, SCRAPING_CHECK_URL as ie, SCRAPING_COVER_URL as ae, SCRAPING_KEY as C, SCRAPING_SETTINGS_URL as oe, SEGMENT as se, SEGMENTED_TRACK as ce, Section as w, SectionToc as T, SegmentedRadioGroup as le, Select$1 as ue, SelectField as E, SelectItem$1 as de, SettingsCard as fe, SettingsRow as pe, SiteMark as D, Stack as O, StatusLabel as k, TaskProgress as A, __toESM as j, activityKind as M, apiSend as N, busyProps as P, checkText as me, codedText as F, composingKey as I, confirmModal as L, errorMessage as R, esc as z, fetchAmaneBridge as B, fetchCheckAllJob as V, fetchCoverJob as he, fetchCustomSources as H, fetchSources as ge, i2 as _e, interfaceLanguage as ve, jobText as U, joinList as W, momentText as G, partsLabel as K, queryClient as q, require_jsx_runtime as ye, require_react as J, serverLabel as be, spinnerHtml as xe, t as Y, useAction as Se, useBackgroundJob as X, useMutation as Z, useQuery as Ce } from "./peach-app.js";
import { ConnectionStatus as we } from "./peach-app.connection-status-BrXhLGSm.js";
import { Page as Te } from "./peach-app.page-QAncjzM1.js";
import { SourceBrowserLoginButton as Ee, SourceBrowserLoginStatus as De, sourceBrowserLoginUrl as Oe, useSourceBrowserLogin as ke } from "./peach-app.source-browser-login-x7L-xBDi.js";
import { CodeBlock as Ae } from "./peach-app.code-block-BdQewVJ0.js";
// src/react/scraping/custom-sources.tsx
var Q = /* @__PURE__ */ j(J(), 1), $ = ye(), je = [
	["code", Y("manage:shared.code")],
	["title", Y("manage:shared.title")],
	["studio", Y("manage:customSources.fieldStudio")],
	["series", Y("manage:shared.series")],
	["release_date", Y("manage:shared.releaseDate")],
	["performers", Y("manage:customSources.fieldPerformers")],
	["tags", Y("manage:customSources.fieldTags")]
], Me = [
	["censored", Y("manage:customSources.typeCensored")],
	["amateur", Y("manage:customSources.typeAmateur")],
	["uncensored", Y("manage:shared.uncensored")],
	["fc2", "FC2"],
	["kmib", Y("manage:customSources.typeKoreanMib")],
	["other", Y("manage:shared.other")],
	["unsure", Y("manage:customSources.typeUnverifiedCode")],
	["unknown", Y("manage:shared.unknown")]
], Ne = () => ({
	name: "",
	endpoint: "",
	enabled: !1,
	fields: {
		code: "id",
		title: "title"
	},
	content_types: ["censored"]
});
function Pe({ receipt: e }) {
	let [t, n] = (0, Q.useState)(null), r = Ce({
		queryKey: c,
		queryFn: ({ signal: e }) => H(e)
	}), i = Se(), o = (e) => q.setQueryData(c, e), s = !!(r.isPending || r.error || r.data?.items.length || i.error), u = /* @__PURE__ */ (0, $.jsx)(a, {
		variant: "secondary",
		onClick: () => n(Ne()),
		children: Y("manage:customSources.addSource")
	});
	return /* @__PURE__ */ (0, $.jsxs)(w, {
		id: "custom-sources",
		title: Y("manage:customSources.title"),
		children: [
			s ? /* @__PURE__ */ (0, $.jsxs)(O, { children: [
				r.isPending ? /* @__PURE__ */ (0, $.jsxs)("div", {
					role: "status",
					"data-skeleton": "",
					"aria-label": Y("manage:customSources.loading"),
					className: "flex min-h-9 items-center gap-3",
					"aria-busy": "true",
					children: [/* @__PURE__ */ (0, $.jsx)("span", {
						className: "skeleton-sheen h-3.5 w-1/3 rounded-sm",
						"aria-hidden": "true"
					}), /* @__PURE__ */ (0, $.jsx)("span", {
						className: "skeleton-sheen ml-auto h-8 w-24 rounded-lg",
						"aria-hidden": "true"
					})]
				}) : null,
				r.error ? /* @__PURE__ */ (0, $.jsx)(S, {
					titleKey: "manage:customSources.loadFailed",
					query: r
				}) : null,
				r.data?.items.map((t) => /* @__PURE__ */ (0, $.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [
						/* @__PURE__ */ (0, $.jsx)("span", {
							className: "min-w-0 flex-1",
							children: t.name
						}),
						/* @__PURE__ */ (0, $.jsx)(k, {
							tone: t.enabled ? "success" : "neutral",
							children: t.enabled ? Y("manage:customSources.enabled") : Y("manage:customSources.disabled")
						}),
						/* @__PURE__ */ (0, $.jsx)(a, {
							variant: "secondary",
							onClick: () => n(t),
							children: Y("manage:shared.edit")
						}),
						/* @__PURE__ */ (0, $.jsx)(a, {
							variant: "secondary",
							...P(i.busy === t.id),
							onClick: () => void i.run(t.id, (e) => N(l, {
								...t,
								enabled: !t.enabled
							}, "POST", e), (n) => {
								o(n), e(t.enabled ? Y("manage:customSources.sourceDisabled") : Y("manage:customSources.sourceEnabled"));
							}),
							children: t.enabled ? Y("manage:customSources.disable") : Y("manage:customSources.enable")
						}),
						/* @__PURE__ */ (0, $.jsx)(a, {
							variant: "secondary",
							onClick: () => L({
								title: Y("manage:customSources.deleteTitle"),
								body: Y("manage:customSources.deleteBody", { name: z(t.name) }),
								confirmLabel: Y("manage:customSources.deleteConfirm"),
								danger: !0,
								holdToConfirm: !0,
								onConfirm: async () => {
									o(await N(l, {
										action: "delete",
										id: t.id
									})), n(null), e(Y("manage:customSources.deleted"));
								}
							}),
							children: Y("manage:shared.delete")
						})
					]
				}, t.id)),
				i.error ? /* @__PURE__ */ (0, $.jsx)(f, { children: i.error }) : null
			] }) : null,
			t ? null : s ? /* @__PURE__ */ (0, $.jsx)(_, { children: u }) : /* @__PURE__ */ (0, $.jsx)(O, { children: /* @__PURE__ */ (0, $.jsx)("div", {
				className: "flex justify-end",
				children: u
			}) }),
			t ? /* @__PURE__ */ (0, $.jsx)(Fe, {
				initial: t,
				cancel: () => n(null),
				saved: (t) => {
					o(t), n(null), e(Y("manage:customSources.saved"));
				}
			}, t.id || "new") : null
		]
	});
}
function Fe({ initial: e, cancel: t, saved: n }) {
	let [r, i] = (0, Q.useState)(e), [o, s] = (0, Q.useState)(""), [c, d] = (0, Q.useState)(""), p = (0, Q.useRef)(0), m = Se(), h = (e) => {
		p.current++, i((t) => ({
			...t,
			...e
		})), d("");
	};
	return /* @__PURE__ */ (0, $.jsxs)("form", {
		"aria-label": Y("manage:customSources.formLabel"),
		"aria-busy": m.busy === "preview",
		onSubmit: (e) => {
			e.preventDefault(), m.run("save", (e) => N(l, r, "POST", e), n);
		},
		children: [/* @__PURE__ */ (0, $.jsxs)(O, { children: [
			/* @__PURE__ */ (0, $.jsx)(y, {
				label: Y("manage:customSources.name"),
				value: r.name,
				maxLength: 80,
				onChange: (e) => h({ name: e })
			}),
			/* @__PURE__ */ (0, $.jsx)(y, {
				label: Y("manage:customSources.endpoint"),
				value: r.endpoint,
				maxLength: 2048,
				placeholder: "https://example.com/api/movies/{code}",
				onChange: (e) => h({ endpoint: e })
			}),
			/* @__PURE__ */ (0, $.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, $.jsx)(g, { children: Y("manage:customSources.network") }), /* @__PURE__ */ (0, $.jsx)(E, {
					id: "custom-source-network",
					label: Y("manage:customSources.network"),
					epoch: 0,
					value: r.network || "direct",
					options: [["direct", Y("manage:processingTraffic.connectionDirect")], ["peach_proxy", Y("manage:customSources.peachProxy")]],
					onPick: (e) => h({ network: e })
				})]
			}),
			/* @__PURE__ */ (0, $.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, $.jsx)(g, { children: Y("manage:customSources.codeFormat") }), /* @__PURE__ */ (0, $.jsx)(E, {
					id: "custom-source-code-format",
					label: Y("manage:customSources.codeFormat"),
					epoch: 0,
					value: r.code_format || "original",
					options: [
						["original", Y("manage:customSources.codeAsIs")],
						["lowercase", Y("manage:customSources.codeLowercase")],
						["compact", Y("manage:customSources.codeNoHyphens")],
						["underscore", Y("manage:customSources.codeUnderscores")]
					],
					onPick: (e) => h({ code_format: e })
				})]
			}),
			/* @__PURE__ */ (0, $.jsx)(v, { children: Y("manage:customSources.help") }),
			je.map(([e, t]) => /* @__PURE__ */ (0, $.jsx)(y, {
				label: Y("manage:customSources.fieldPath", { field: t }),
				value: r.fields[e] || "",
				onChange: (t) => {
					let n = { ...r.fields };
					t ? n[e] = t : delete n[e], h({ fields: n });
				}
			}, e)),
			/* @__PURE__ */ (0, $.jsx)("div", {
				className: "flex flex-wrap gap-3",
				role: "group",
				"aria-label": Y("manage:customSources.contentTypes"),
				children: Me.map(([e, t]) => /* @__PURE__ */ (0, $.jsx)(u, {
					isSelected: r.content_types.includes(e),
					onChange: (t) => h({ content_types: t ? [...r.content_types, e] : r.content_types.filter((t) => t !== e) }),
					children: t
				}, e))
			}),
			/* @__PURE__ */ (0, $.jsx)(u, {
				isSelected: r.enabled,
				onChange: (e) => h({ enabled: e }),
				children: Y("manage:customSources.enableSource")
			}),
			/* @__PURE__ */ (0, $.jsx)(y, {
				label: Y("manage:customSources.testCode"),
				value: o,
				onChange: (e) => {
					p.current++, s(e), d("");
				},
				onKeyDown: (e) => {
					if (e.key !== "Enter" || I(e.nativeEvent)) return;
					e.preventDefault();
					let t = p.current;
					m.run("preview", (e) => N(l, {
						...r,
						code: o,
						action: "preview"
					}, "POST", e), (e) => {
						t === p.current && d(JSON.stringify(e.record, null, 2));
					}, (e) => {
						t === p.current && m.setError(R(e));
					});
				}
			}),
			m.busy === "preview" ? /* @__PURE__ */ (0, $.jsxs)(v, {
				role: "status",
				children: [/* @__PURE__ */ (0, $.jsx)("span", { dangerouslySetInnerHTML: { __html: xe(Y("manage:customSources.testing")) } }), Y("manage:customSources.testing")]
			}) : null,
			c ? /* @__PURE__ */ (0, $.jsx)(Ae, {
				code: c,
				language: "json",
				label: Y("manage:customSources.response")
			}) : null,
			m.error ? /* @__PURE__ */ (0, $.jsx)(f, { children: m.error }) : null
		] }), /* @__PURE__ */ (0, $.jsxs)(_, { children: [/* @__PURE__ */ (0, $.jsx)(a, {
			variant: "secondary",
			type: "button",
			onClick: t,
			children: Y("manage:shared.cancel")
		}), /* @__PURE__ */ (0, $.jsx)(a, {
			type: "submit",
			...P(m.busy === "save"),
			children: Y("manage:customSources.saveSource")
		})] })]
	});
}
// src/react/scraping/scraping-page.tsx
var Ie = [["peach", Y("manage:customSources.peachProxy")], ["direct", Y("manage:sourceSettings.direct")]];
function Le(e) {
	return Ie.some(([t]) => t === e) || !e ? [...Ie] : [...Ie, [e, e]];
}
function Re(e) {
	try {
		return new URL(e).host || e;
	} catch {
		return e;
	}
}
var ze = [["paste", Y("manage:sourceSettings.pasteCookie")], ["file", Y("manage:sourceSettings.uploadFile")]], Be = [C];
function Ve() {
	return /* @__PURE__ */ (0, $.jsx)(D, { source: "github" });
}
function He({ source: t, toast: n, open: r, onOpenChange: i }) {
	let o = t.source === "javdb", s = o || t.browser_login === !0, [c, l] = (0, Q.useState)(t.network), [u, m] = (0, Q.useState)(""), [h, v] = (0, Q.useState)(""), [b, S] = (0, Q.useState)(""), [re, ae] = (0, Q.useState)(ze[0][0]), [w, T] = (0, Q.useState)(""), [E, A] = (0, Q.useState)(""), j = (0, Q.useRef)(null);
	function M() {
		m(""), v(""), S(""), T(""), A(""), j.current && (j.current.value = "");
	}
	let I = Z({
		mutationFn: (e) => N(oe, {
			source: t.source,
			network: c,
			cookie: u,
			cookies_text: b,
			revoke: e,
			...h ? { api_key: h } : {}
		}),
		onSuccess: (e, r) => {
			q.setQueryData(C, (t) => t && {
				...t,
				sources: t.sources.map((t) => t.source === e.saved.source ? e.saved : t)
			}), M(), n(Y(r ? t.accepts_api_key ? "manage:sourceSettings.apiKeyRemoved" : "manage:sourceSettings.cookieRevoked" : "manage:sourceSettings.saved"));
		}
	}), L = Z({ mutationFn: () => N(ie, {
		source: t.source,
		lookup: !0
	}) }), z = Z({ mutationFn: () => N(ie, {
		source: t.source,
		verify_session: !0
	}) }), B = ke(o ? ee : Oe(t.source), s && r, Be), V = I.isPending || L.isPending || z.isPending || B.busy, he = (e) => {
		e.preventDefault(), V || (L.reset(), z.reset(), I.mutate(!1));
	}, H = () => {
		V || (L.reset(), z.reset(), I.mutate(!0));
	}, ge = () => {
		V || (I.reset(), L.mutate());
	};
	async function U(e) {
		let t = e.currentTarget, n = t.files?.[0];
		if (S(""), A(""), !n) T("");
		else if (n.size > 262144) t.value = "", T(""), A(Y("manage:sourceSettings.cookieTooLarge"));
		else try {
			let e = await n.text();
			S(e), T(n.name);
		} catch {
			A(Y("manage:sourceSettings.cookieFileUnread"));
		}
	}
	let W = E || (I.error ? R(I.error) : "") || (L.error ? R(L.error) : "") || (z.error ? R(z.error) : "") || B.error, G = L.data?.results ?? [], K = z.data?.results[0], ye = c === "peach" || t.accepts_cookie || t.accepts_api_key || t.browser || !!W || G.length > 0, J = F(t, "label"), be = /* @__PURE__ */ (0, $.jsxs)("form", {
		"aria-label": J,
		noValidate: !0,
		onSubmit: he,
		className: "min-w-0 wrap-anywhere",
		children: [
			t.login ? /* @__PURE__ */ (0, $.jsx)("div", {
				className: "flex pb-2 pr-3",
				children: /* @__PURE__ */ (0, $.jsx)(p, {
					href: o ? new URL("/login", t.login).href : t.login,
					children: o ? Y("manage:sourceSettings.javdbSignIn") : Re(t.login)
				})
			}) : null,
			/* @__PURE__ */ (0, $.jsx)(ne, { children: /* @__PURE__ */ (0, $.jsx)(pe, {
				label: Y("manage:sourceSettings.connectionMode"),
				children: /* @__PURE__ */ (0, $.jsx)(ue, {
					"aria-label": Y("manage:sourceSettings.connectionMode"),
					className: "w-44 min-w-0",
					selectedKey: c,
					onSelectionChange: (e) => {
						e !== null && l(String(e));
					},
					children: Le(c).map(([e, t]) => /* @__PURE__ */ (0, $.jsx)(de, {
						id: e,
						children: t
					}, e))
				})
			}) }),
			t.cooldown_until && t.cooldown_until > Date.now() / 1e3 ? /* @__PURE__ */ (0, $.jsx)(x, {
				tone: "warning",
				children: /* @__PURE__ */ (0, $.jsxs)("span", {
					className: "inline-flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, $.jsx)(k, {
						tone: "warning",
						children: Y("manage:sourceSettings.coolingDown")
					}), /* @__PURE__ */ (0, $.jsx)("span", { children: Y("manage:sourceSettings.retryAfter", { time: (/* @__PURE__ */ new Date(t.cooldown_until * 1e3)).toLocaleString(ve) }) })]
				})
			}) : null,
			ye ? /* @__PURE__ */ (0, $.jsxs)(O, {
				divided: !0,
				children: [
					c === "peach" ? /* @__PURE__ */ (0, $.jsx)("span", {
						className: "self-start",
						children: /* @__PURE__ */ (0, $.jsx)(te, {
							href: "/settings/network#peachProxy",
							size: "small",
							trailingIcon: _e,
							children: Y("manage:sourceSettings.setUpProxy")
						})
					}) : null,
					t.browser ? /* @__PURE__ */ (0, $.jsx)("p", {
						className: "text-body-2-regular text-text-secondary",
						children: Y("manage:sourceSettings.browserVerification")
					}) : null,
					t.accepts_api_key ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
						/* @__PURE__ */ (0, $.jsx)("span", {
							className: "self-start",
							children: /* @__PURE__ */ (0, $.jsx)(k, {
								tone: t.api_key_saved ? "success" : "neutral",
								children: Y(t.api_key_saved ? "manage:sourceSettings.apiKeySaved" : "manage:sourceSettings.apiKeyNotSet")
							})
						}),
						/* @__PURE__ */ (0, $.jsx)("p", {
							className: "text-body-2-regular text-text-secondary",
							"data-copy-key": `source-settings.${t.source}.hint`,
							children: Y(t.source === "theporndb" ? "manage:sourceSettings.thePornDbHint" : "manage:sourceSettings.stashDbHint")
						}),
						/* @__PURE__ */ (0, $.jsx)(y, {
							type: "password",
							label: Y("manage:sourceSettings.apiKey"),
							autoComplete: "off",
							value: h,
							onChange: v
						})
					] }) : null,
					t.accepts_cookie && !t.browser ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
						/* @__PURE__ */ (0, $.jsxs)("div", {
							className: "flex flex-col gap-2",
							children: [
								/* @__PURE__ */ (0, $.jsx)("span", {
									className: "self-start",
									children: /* @__PURE__ */ (0, $.jsx)(k, {
										tone: t.cookie_saved ? "success" : "neutral",
										children: t.cookie_saved ? Y("manage:sourceSettings.cookieSaved") : Y("manage:sourceSettings.cookieNotSet")
									})
								}),
								/* @__PURE__ */ (0, $.jsx)("p", {
									className: "text-body-2-regular text-text-secondary",
									children: Y(o ? "manage:sourceSettings.javdbSessionHint" : t.cookie_saved ? "manage:sourceSettings.signInUnverified" : "manage:sourceSettings.provideCookieHint")
								}),
								s ? /* @__PURE__ */ (0, $.jsxs)("div", {
									className: "flex flex-wrap gap-2",
									children: [/* @__PURE__ */ (0, $.jsx)(Ee, {
										login: B,
										disabled: V,
										onStart: z.reset
									}), o ? /* @__PURE__ */ (0, $.jsx)(a, {
										variant: "secondary",
										...P(V),
										onClick: () => {
											V || (I.reset(), z.mutate());
										},
										children: Y("manage:sourceSettings.testJavdbSession")
									}) : null]
								}) : null,
								/* @__PURE__ */ (0, $.jsx)(De, {
									login: B,
									saved: t.cookie_saved
								}),
								K ? /* @__PURE__ */ (0, $.jsx)(x, {
									tone: K.ok ? "success" : K.kind === "unchecked" ? "neutral" : "warning",
									children: me(K, J)
								}) : null
							]
						}),
						/* @__PURE__ */ (0, $.jsx)(le, {
							"aria-label": Y("manage:sourceSettings.cookieMethod"),
							value: re,
							onChange: (e) => {
								ae(e), M();
							},
							className: ce,
							children: ze.map(([t, n]) => /* @__PURE__ */ (0, $.jsx)(e, {
								value: t,
								className: se,
								children: n
							}, t))
						}),
						re === "paste" ? /* @__PURE__ */ (0, $.jsx)(y, {
							type: "password",
							label: "Cookie",
							autoComplete: "off",
							value: u,
							onChange: m
						}) : /* @__PURE__ */ (0, $.jsxs)("div", {
							className: "flex flex-col gap-2",
							children: [
								/* @__PURE__ */ (0, $.jsx)(g, { children: Y("manage:sourceSettings.cookieFileLabel") }),
								/* @__PURE__ */ (0, $.jsxs)("div", {
									className: "flex flex-wrap items-center gap-3",
									children: [/* @__PURE__ */ (0, $.jsx)(a, {
										variant: "secondary",
										onClick: () => j.current?.click(),
										children: Y("manage:sourceSettings.chooseFile")
									}), /* @__PURE__ */ (0, $.jsx)("span", {
										className: "min-w-0 text-body-2-regular break-all text-text-secondary",
										children: w || Y("manage:sourceSettings.noFileChosen")
									})]
								}),
								/* @__PURE__ */ (0, $.jsx)("input", {
									ref: j,
									type: "file",
									accept: ".txt",
									tabIndex: -1,
									"aria-hidden": !0,
									className: "hidden",
									onChange: (e) => {
										U(e);
									}
								})
							]
						})
					] }) : null,
					W ? /* @__PURE__ */ (0, $.jsx)(f, { children: W }) : null,
					G.map((e) => {
						let n = e.kind === "unchecked" ? "neutral" : e.ok ? "success" : "error", r = e.target === "lookup" ? Y(e.ok ? "manage:sourceSettings.sampleMatched" : "manage:sourceSettings.sampleFailed") : e.kind === "unchecked" ? Y("manage:sourceSettings.unchecked") : e.ok ? Y("manage:sourceSettings.reachable") : Y("manage:sourceSettings.connectionFailed");
						return /* @__PURE__ */ (0, $.jsx)(x, {
							tone: n,
							children: /* @__PURE__ */ (0, $.jsxs)("span", {
								className: "flex flex-col items-start gap-1",
								children: [/* @__PURE__ */ (0, $.jsx)(we, {
									tone: n,
									children: r
								}), /* @__PURE__ */ (0, $.jsx)("span", { children: me(e, F(t, "label")) })]
							})
						}, e.label);
					})
				]
			}) : null,
			/* @__PURE__ */ (0, $.jsxs)(_, { children: [
				t.api_key_saved ? /* @__PURE__ */ (0, $.jsx)(a, {
					variant: "secondary",
					onClick: H,
					...P(V),
					children: Y("manage:sourceSettings.removeApiKey")
				}) : null,
				t.accepts_cookie && t.cookie_saved ? /* @__PURE__ */ (0, $.jsx)(a, {
					variant: "secondary",
					onClick: H,
					...P(V),
					children: Y("manage:sourceSettings.revokeCookie")
				}) : null,
				/* @__PURE__ */ (0, $.jsx)(a, {
					variant: "secondary",
					onClick: ge,
					...P(V),
					children: Y("manage:sourceSettings.testConnection")
				}),
				/* @__PURE__ */ (0, $.jsx)(a, {
					type: "submit",
					...P(V),
					children: Y("manage:shared.save")
				})
			] })
		]
	});
	return /* @__PURE__ */ (0, $.jsx)("div", {
		id: `source-${t.source}`,
		className: "[&_summary]:pr-3",
		children: /* @__PURE__ */ (0, $.jsx)(fe, { children: /* @__PURE__ */ (0, $.jsx)(d, {
			isOpen: r,
			onOpenChange: i,
			trailing: !0,
			contentClassName: "pt-0",
			summary: /* @__PURE__ */ (0, $.jsxs)("span", {
				className: "flex min-w-0 items-center gap-2 py-3 pr-2 text-body-medium text-text-primary",
				children: [/* @__PURE__ */ (0, $.jsx)(D, { source: t.source }), /* @__PURE__ */ (0, $.jsx)("span", { children: J })]
			}),
			children: be
		}) })
	});
}
var Ue = {
	ok: "success",
	auth: "warning",
	http: "error",
	cooldown: "warning",
	network: "error",
	skipped: "neutral"
}, We = [
	"ok",
	"auth",
	"cooldown",
	"http",
	"network",
	"skipped"
];
function Ge(e, t) {
	let n = F(e, "label");
	return t.target === "cdn" ? Y("manage:connectionCheck.hdImages", { source: n }) : n;
}
function Ke({ toast: e }) {
	let { job: t, running: n, start: r, query: i } = X({
		queryKey: o,
		queryFn: ({ signal: e }) => V(e),
		start: (e) => N(re, { retry_failed: e }),
		onFinish: (t) => {
			q.invalidateQueries({
				queryKey: C,
				exact: !0
			}), t.status === "complete" && e(t.failed ? Y("manage:connectionCheck.doneWithFailures", { count: t.failed }) : Y("manage:connectionCheck.doneAllReachable"));
		}
	}), s = (e) => {
		e.preventDefault(), !i.data || n || r.isPending || r.mutate(!1);
	}, c = (t?.results ?? []).flatMap((e) => e.results.map((t) => ({
		source: e.source,
		name: Ge(e, t),
		check: t
	}))), l = (e, t) => /* @__PURE__ */ (0, $.jsxs)("span", {
		className: "inline-flex min-w-0 items-center gap-1.5",
		children: [/* @__PURE__ */ (0, $.jsx)(D, { source: e }), t]
	}), u = c.filter(({ check: e }) => e.outcome === "ok"), f = c.some(({ check: e }) => e.outcome === "network" || e.outcome === "http" && e.reason !== "rate_limited"), p = c.filter(({ check: e }) => e.outcome !== "ok").sort((e, t) => We.indexOf(e.check.outcome) - We.indexOf(t.check.outcome)), g = r.error ? R(r.error) : i.error ? R(i.error) : t?.status === "failed" ? U(t, "error") || Y("manage:connectionCheck.notFinished") : "", y = t?.status === "complete" && t.completed_at ? [G((/* @__PURE__ */ new Date(t.completed_at * 1e3)).toISOString()), t.elapsed_s === void 0 ? "" : Y("manage:connectionCheck.elapsed", { seconds: t.elapsed_s.toFixed(1) })].filter(Boolean).join(" · ") : "";
	return /* @__PURE__ */ (0, $.jsxs)(w, {
		id: "check-all",
		title: Y("manage:connectionCheck.title"),
		onSubmit: s,
		children: [/* @__PURE__ */ (0, $.jsxs)(O, { children: [
			i.isPending ? /* @__PURE__ */ (0, $.jsx)("div", {
				role: "status",
				"aria-label": Y("manage:connectionCheck.loadingStatus"),
				"data-skeleton": "",
				className: "skeleton-sheen h-6 rounded-md"
			}) : null,
			/* @__PURE__ */ (0, $.jsx)(v, { children: Y("manage:connectionCheck.help") }),
			n ? /* @__PURE__ */ (0, $.jsx)(A, {
				embedded: !0,
				kind: "radar",
				value: t?.checked ?? 0,
				total: t?.total ?? 0,
				label: Y("manage:connectionCheck.checkedCount", {
					checked: t?.checked ?? 0,
					count: t?.total ?? 0
				})
			}) : null,
			g ? /* @__PURE__ */ (0, $.jsx)(x, {
				tone: "error",
				children: g
			}) : null,
			c.length ? /* @__PURE__ */ (0, $.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: We.map((e) => {
					let t = c.filter(({ check: t }) => t.outcome === e).length;
					return t ? /* @__PURE__ */ (0, $.jsxs)(k, {
						tone: Ue[e],
						children: [
							F(c.find(({ check: t }) => t.outcome === e)?.check, "outcome_label"),
							" ",
							t
						]
					}, e) : null;
				})
			}) : null,
			p.length ? /* @__PURE__ */ (0, $.jsx)("ul", {
				className: "flex min-w-0 flex-col",
				children: p.map(({ source: e, name: t, check: n }) => /* @__PURE__ */ (0, $.jsx)(b, {
					title: l(e, t),
					children: /* @__PURE__ */ (0, $.jsxs)("span", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, $.jsx)(k, {
								tone: Ue[n.outcome],
								children: F(n, "outcome_label")
							}),
							n.outcome === "auth" ? /* @__PURE__ */ (0, $.jsx)("a", {
								href: `#source-${e}`,
								className: "underline",
								children: Y("manage:connectionCheck.openSource")
							}) : null,
							n.message ? /* @__PURE__ */ (0, $.jsx)("span", {
								className: "text-body-2-regular text-text-secondary",
								children: F(n, "message")
							}) : null
						]
					})
				}, t))
			}) : null,
			u.length ? /* @__PURE__ */ (0, $.jsx)(d, {
				summary: Y("manage:connectionCheck.reachableCount", { count: u.length }),
				children: /* @__PURE__ */ (0, $.jsx)(h, { children: u.map(({ source: e, name: t, check: n }) => /* @__PURE__ */ (0, $.jsx)(m, {
					term: l(e, t),
					children: [n.width ? `${n.width} × ${n.height}` : "", n.elapsed_s === void 0 ? "" : Y("manage:connectionCheck.seconds", { seconds: n.elapsed_s.toFixed(2) })].filter(Boolean).join(" · ")
				}, t)) })
			}) : null
		] }), /* @__PURE__ */ (0, $.jsxs)(_, {
			status: y ? Y("manage:connectionCheck.lastChecked", { time: y }) : void 0,
			children: [f ? /* @__PURE__ */ (0, $.jsx)(a, {
				variant: "secondary",
				disabled: n || r.isPending,
				onClick: () => r.mutate(!0),
				children: Y("manage:connectionCheck.retryFailed")
			}) : null, /* @__PURE__ */ (0, $.jsx)(a, {
				type: "submit",
				disabled: !i.data,
				...P(n || r.isPending),
				children: Y("manage:connectionCheck.checkAll")
			})]
		})]
	});
}
var qe = (e) => be(e.result_code ?? "", e.result ?? "", e.result_params), Je = (e) => K(e.error_parts, U(e, "error"));
function Ye({ toast: e }) {
	let [t, n] = (0, Q.useState)(""), { running: r, outcome: o, start: c, query: l } = X({
		queryKey: s,
		queryFn: ({ signal: e }) => he(e),
		start: () => N(ae, { code: t }),
		onFinish: (t) => {
			t.status === "complete" && e(qe(t) || Y("manage:hdCover.fetched"));
		}
	}), u = (e) => {
		e.preventDefault(), l.data && !r && !c.isPending && t.trim() && c.mutate();
	}, d = c.isPending || c.isError ? null : o, f = c.error ? R(c.error) : l.error ? R(l.error) : d?.status === "failed" ? Je(d) || Y("manage:hdCover.notFound") : "";
	return /* @__PURE__ */ (0, $.jsx)(w, {
		id: "hd-cover",
		title: Y("manage:hdCover.title"),
		onSubmit: u,
		children: /* @__PURE__ */ (0, $.jsxs)(O, { children: [
			l.isPending ? /* @__PURE__ */ (0, $.jsx)("div", {
				role: "status",
				"aria-label": Y("manage:hdCover.loadingStatus"),
				"data-skeleton": "",
				className: "skeleton-sheen h-6 rounded-md"
			}) : null,
			/* @__PURE__ */ (0, $.jsxs)("div", {
				className: "flex flex-wrap items-end gap-2",
				children: [/* @__PURE__ */ (0, $.jsx)("div", {
					className: "min-w-0 flex-1",
					children: /* @__PURE__ */ (0, $.jsx)(y, {
						"aria-label": Y("manage:hdCover.codeLabel"),
						isRequired: !0,
						isDisabled: r,
						value: t,
						onChange: n,
						placeholder: Y("manage:hdCover.codePlaceholder")
					})
				}), /* @__PURE__ */ (0, $.jsx)(a, {
					type: "submit",
					disabled: !l.data || !t.trim(),
					leadingIcon: c.isPending ? i : void 0,
					...P(r || c.isPending),
					children: Y("manage:hdCover.fetchCover")
				})]
			}),
			r ? /* @__PURE__ */ (0, $.jsx)(A, {
				embedded: !0,
				kind: M("scraping-cover"),
				label: Y("manage:hdCover.fetching")
			}) : null,
			f ? /* @__PURE__ */ (0, $.jsx)(x, {
				tone: "error",
				children: f
			}) : null,
			d?.status === "complete" ? /* @__PURE__ */ (0, $.jsx)(x, {
				tone: "success",
				children: qe(d) || Y("manage:hdCover.fetched")
			}) : null
		] })
	});
}
function Xe({ toast: e }) {
	let { query: o, running: s, outcome: c, start: l } = X({
		queryKey: n,
		queryFn: ({ signal: e }) => B(e),
		start: () => N(r, {}),
		jobOf: (e) => e.job,
		withJob: (e, t) => e && {
			...e,
			job: t
		},
		onFinish: (t) => {
			t.status === "complete" && e(F(t, "result") || Y("manage:amaneRuntime.rebuilt"));
		}
	}), u = Z({ mutationFn: () => N(t, {}) }), f = o.data;
	if (!f) return o.error ? /* @__PURE__ */ (0, $.jsx)(w, {
		id: "amane",
		title: "amane",
		children: /* @__PURE__ */ (0, $.jsx)(O, { children: /* @__PURE__ */ (0, $.jsx)(x, {
			tone: "error",
			children: R(o.error)
		}) })
	}) : null;
	let g = s || l.isPending || u.isPending, y = l.isPending || l.isError ? null : c, b = l.error ? R(l.error) : u.error ? R(u.error) : y?.status === "failed" ? U(y, "error") || Y("manage:amaneRuntime.rebuildNotFinished") : "";
	return /* @__PURE__ */ (0, $.jsxs)(w, {
		id: "amane",
		title: "amane",
		aside: /* @__PURE__ */ (0, $.jsx)(p, {
			href: f.repository,
			leadingIcon: Ve,
			children: f.repository
		}),
		children: [
			/* @__PURE__ */ (0, $.jsxs)(h, { children: [
				/* @__PURE__ */ (0, $.jsx)(m, {
					term: Y("manage:amaneRuntime.installedVersion"),
					children: f.installed_version || Y("manage:amaneRuntime.notInstalled")
				}),
				/* @__PURE__ */ (0, $.jsx)(m, {
					term: Y("manage:amaneRuntime.latestVersion"),
					children: u.data ? F(u.data, "latest") : Y("manage:amaneRuntime.notChecked")
				}),
				/* @__PURE__ */ (0, $.jsx)(m, {
					term: Y("manage:amaneRuntime.runtime"),
					children: f.installed ? Y("manage:amaneRuntime.installed") : Y("manage:amaneRuntime.notInstalled")
				}),
				/* @__PURE__ */ (0, $.jsx)(m, {
					term: Y("manage:amaneRuntime.builtInSites"),
					children: Y("manage:amaneRuntime.siteCount", { count: f.sites.length })
				})
			] }),
			/* @__PURE__ */ (0, $.jsxs)(O, {
				divided: !0,
				children: [
					f.sites.length ? /* @__PURE__ */ (0, $.jsx)(d, {
						summary: Y("manage:amaneRuntime.showSites"),
						children: /* @__PURE__ */ (0, $.jsx)("p", {
							className: "text-body-2-regular text-text-secondary",
							children: W(f.sites.map((e) => F(e, "label")))
						})
					}) : null,
					f.problem ? /* @__PURE__ */ (0, $.jsx)(x, {
						tone: "error",
						children: f.problem
					}) : /* @__PURE__ */ (0, $.jsx)(v, { children: Y("manage:amaneRuntime.help", {
						license: f.license,
						version: f.version
					}) }),
					s ? /* @__PURE__ */ (0, $.jsx)(A, {
						embedded: !0,
						kind: M("amane-bridge"),
						label: Y("manage:amaneRuntime.rebuilding")
					}) : null,
					b ? /* @__PURE__ */ (0, $.jsx)(x, {
						tone: "error",
						children: b
					}) : null,
					y?.status === "complete" ? /* @__PURE__ */ (0, $.jsx)(x, {
						tone: "success",
						children: F(y, "result") || Y("manage:amaneRuntime.rebuilt")
					}) : null
				]
			}),
			/* @__PURE__ */ (0, $.jsxs)(_, { children: [/* @__PURE__ */ (0, $.jsx)(a, {
				variant: "secondary",
				onClick: () => {
					g || u.mutate();
				},
				...P(u.isPending),
				children: Y("manage:amaneRuntime.checkUpstream")
			}), /* @__PURE__ */ (0, $.jsx)(a, {
				disabled: !!f.problem,
				onClick: () => {
					g || l.mutate();
				},
				leadingIcon: l.isPending ? i : void 0,
				...P(s || l.isPending),
				children: f.installed ? Y("manage:amaneRuntime.reinstall") : Y("manage:amaneRuntime.install")
			})] })
		]
	});
}
var Ze = [
	{
		id: "western",
		sources: [
			"stashdb",
			"theporndb",
			"vixen-network"
		]
	},
	{
		id: "japanese",
		sources: [
			"r18dev",
			"dmm",
			"prestige",
			"mgstage",
			"faleno",
			"dahlia",
			"makers",
			"1pondo",
			"javdb",
			"javbus",
			"airav",
			"avsox",
			"avbase",
			"freejavbt"
		]
	},
	{
		id: "fc2",
		sources: [
			"fc2",
			"fc2cmadb",
			"fc2ppvdb",
			"fc2club",
			"javten",
			"javarchive"
		]
	},
	{
		id: "people",
		sources: [
			"avwikidb",
			"minnano-av",
			"instagram"
		]
	},
	{
		id: "resources",
		sources: ["manko", "sukebei"]
	}
];
function Qe({ id: e, title: t, children: n }) {
	return /* @__PURE__ */ (0, $.jsxs)("section", {
		id: e,
		"aria-label": t,
		className: "flex min-w-0 flex-col gap-3",
		children: [/* @__PURE__ */ (0, $.jsx)("h3", {
			className: "px-3 text-title-3-medium text-text-primary",
			children: /* @__PURE__ */ (0, $.jsx)("span", { children: t })
		}), n]
	});
}
function $e({ toast: e }) {
	let t = Ce({
		queryKey: C,
		queryFn: ({ signal: e }) => ge(e)
	}), [n, r] = (0, Q.useState)(() => /* @__PURE__ */ new Set([location.hash.slice(1)])), i = (0, Q.useCallback)((e, t) => {
		e.startsWith("source-") && !e.startsWith("source-group-") && r((n) => {
			if (n.has(e) === t) return n;
			let r = new Set(n);
			return t ? r.add(e) : r.delete(e), r;
		});
	}, []);
	(0, Q.useEffect)(() => {
		let e = () => i(location.hash.slice(1), !0);
		return window.addEventListener("hashchange", e), () => window.removeEventListener("hashchange", e);
	}, [i]);
	let a = t.data;
	if (!a) return /* @__PURE__ */ (0, $.jsx)(Te, { children: /* @__PURE__ */ (0, $.jsx)(x, {
		tone: "error",
		title: Y("manage:scrapingSources.loadFailedTitle"),
		children: t.error ? R(t.error) : Y("manage:scrapingSources.loadFailed")
	}) });
	let o = Ze.map(({ id: e, sources: t }) => ({
		id: `source-group-${e}`,
		title: Y(`manage:scrapingSources.groups.${e}`),
		sources: t.flatMap((e) => {
			let t = a.sources.find((t) => t.source === e);
			return t ? [t] : [];
		})
	})), s = new Set(o.flatMap((e) => e.sources.map((e) => e.source))), c = a.sources.filter((e) => !s.has(e.source));
	c.length && o.push({
		id: "source-group-other",
		title: Y("manage:scrapingSources.groups.other"),
		sources: c
	});
	let l = o.filter((e) => e.sources.length), u = Y("manage:scrapingSources.groups.tools");
	return /* @__PURE__ */ (0, $.jsxs)(Te, { children: [/* @__PURE__ */ (0, $.jsx)("p", {
		className: "text-body-2-regular text-text-secondary",
		children: Y("manage:scrapingSources.proxyHint")
	}), /* @__PURE__ */ (0, $.jsxs)(T, {
		label: Y("manage:scrapingSources.contents"),
		entries: [...l.map((e) => ({
			id: e.id,
			label: e.title
		})), {
			id: "source-tools",
			label: u
		}],
		children: [l.map((t) => /* @__PURE__ */ (0, $.jsx)(Qe, {
			id: t.id,
			title: t.title,
			children: /* @__PURE__ */ (0, $.jsx)("div", {
				className: "flex flex-col gap-2",
				children: t.sources.map((t) => /* @__PURE__ */ (0, $.jsx)(He, {
					source: t,
					toast: e,
					open: n.has(`source-${t.source}`),
					onOpenChange: (e) => i(`source-${t.source}`, e)
				}, t.source))
			})
		}, t.id)), /* @__PURE__ */ (0, $.jsx)(Qe, {
			id: "source-tools",
			title: u,
			children: /* @__PURE__ */ (0, $.jsxs)("div", {
				className: "flex min-w-0 flex-col gap-6",
				children: [
					/* @__PURE__ */ (0, $.jsx)(Ke, { toast: e }),
					/* @__PURE__ */ (0, $.jsx)(Ye, { toast: e }),
					/* @__PURE__ */ (0, $.jsx)(Pe, { receipt: e }),
					/* @__PURE__ */ (0, $.jsx)("div", {
						id: "source-amane",
						children: /* @__PURE__ */ (0, $.jsx)(Xe, { toast: e })
					})
				]
			})
		})]
	})] });
}
export { $e as ScrapingPage, Re as linkHost, Le as networkOptions };

//# debugId=b462d411-35de-42c3-900c-71bbe2607118