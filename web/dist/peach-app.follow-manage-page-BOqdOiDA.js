(function() {
	try {
		var e = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "b192af89-df49-4842-af55-a8b2a8686b05", e._sentryDebugIdIdentifier = "sentry-dbid-b192af89-df49-4842-af55-a8b2a8686b05");
	} catch {}
})();
import { createPaginatedRowModel as e } from "./peach-app.createPaginatedRowModel-ClHnhG_T.js";
import { createSortedRowModel as t, useTableSelection as n } from "./peach-app.use-table-selection-BSdXI_Nc.js";
import { $2ec61d1d4f780267$export$a8a3e93435678ff9 as r, $542a13ca2fa5b484$export$5b6b19405a83ff9d as i, $76d00c5a4edb230a$export$76ccd210b9029917 as a, $76d00c5a4edb230a$export$816b5d811295e6bc as o, $76d00c5a4edb230a$export$b59bdbef9ce70de2 as s, $76d00c5a4edb230a$export$f6f0c3fe4ec306ea as c, $76d00c5a4edb230a$export$f850895b287ef28e as l, $b4f18e3395fe64d7$export$3d96ec278d3efce4 as u, $b4f18e3395fe64d7$export$3e41faf802a29e71 as d, $b4f18e3395fe64d7$export$b2539bed5023c21c as f, $ea3928288112382f$export$439d29a4e110a164 as ee, $l as p, ApiError as m, Button as h, ButtonLink as g, Bx as _, Checkbox as v, ChevronSortDown as te, Chip as y, DataTableFooter as ne, DataTableFrame as b, DataTableSort as re, EmptyFocusButton as x, EmptyState as S, ErrorText as ie, ExternalLink as C, FEEDS_KEY as w, FOLLOW_CREDENTIALS_KEY as T, FOLLOW_MANAGE_KEY as E, FOLLOW_MANAGE_NAV as D, FOLLOW_RESOLVE_KEY as O, FieldLabel as k, Help as A, Input as j, LoadingDots as M, M6 as N, MENU_ITEM as P, MENU_ITEM_INTERACTIVE as F, MENU_POPOVER_SURFACE as I, ModalFrame as L, Note as R, P7 as z, SORT_DEFAULT_DIR as B, STAT_STRIP_SIX as V, SelectionDock as H, SelectionPopover as U, SiteLabel as ae, Switch as oe, Table as se, TableColumnControls as ce, TableColumnResizer as le, TableSelectionHeader as ue, TagManager as W, TaskProgress as de, Wt as fe, Xf as pe, __toESM as me, addAlias as he, addSource as ge, avatarInner as G, busyProps as K, cardClass as _e, checkFeeds as ve, columnVisibilityFeature as ye, composingKey as q, confirmModal as be, createColumnHelper as xe, credentialDone as Se, cx as J, dZ as Y, errorHeadline as Ce, errorMessage as X, feedIntervalText as we, fetchCredentials as Te, fetchFeeds as Ee, fetchFollow as De, fetchResolveJob as Oe, fetchSuggestions as ke, flexRender as Ae, followFeedByName as je, followFeedEntity as Me, followSuggestKey as Ne, groupByAuthor as Pe, isBroken as Fe, isLayout as Ie, keepSelected as Le, localTime as Re, lookupFeedActor as ze, mapLimit as Be, pageSizeOf as Ve, pageWindow as He, pv as Ue, queryClient as We, reloadFollowManage as Ge, removeAlias as Ke, removeFeed as qe, renameAliasGroup as Je, require_jsx_runtime as Ye, require_react as Xe, resolveFollowSort as Ze, rowPaginationFeature as Qe, rowSelectionFeature as $e, rowSortingFeature as et, setFeedEnabled as tt, startCheck as nt, startResolve as rt, tableFeatures as it, useAction as at, useBackgroundJob as ot, useMutation as st, useQuery as ct, useTable as lt, useTablePreferences as ut } from "./peach-app.js";
import { Page as dt } from "./peach-app.page-QAncjzM1.js";
import { LEGACY_AVATAR_IMG as ft } from "./peach-app.legacy-avatar-NSITxLRS.js";
import { PillAriaTabList as pt } from "./peach-app.pill-aria-tab-list-BMY1ZEv1.js";
import { AuthorAvatar as mt, SourceIcon as ht } from "./peach-app.source-view-Cr-fzNHo.js";
import { SourceList as gt } from "./peach-app.source-list-BPZPYgyw.js";
// src/react/follow-manage/add-source.tsx
var Z = /* @__PURE__ */ me(Xe(), 1), Q = Ye(), _t = J(P, F, "text-body-2-medium"), vt = "Paste a source link, or type a creator name or id…", yt = "Add a creator follow", bt = "Searching (the first name lookup downloads the creator index and may take tens of seconds)", xt = "Identifying", St = "The in-site lookup found no source", Ct = "/settings/subscriptions", wt = (e, t) => `${e}:${t.url}`;
function Tt({ field: e, menu: t, options: n, active: r, busy: a, onPick: o, onClose: s }) {
	return (0, Z.useEffect)(() => {
		t.current?.querySelector("[aria-current=\"true\"]")?.scrollIntoView({ block: "nearest" });
	}, [t, r]), /* @__PURE__ */ (0, Q.jsxs)(i, {
		ref: t,
		triggerRef: e,
		isOpen: !0,
		isNonModal: !0,
		shouldFlip: !1,
		onOpenChange: (e) => {
			e || s();
		},
		placement: "bottom start",
		offset: 4,
		"aria-label": "Source suggestions",
		className: J(I, "flex w-(--trigger-width) flex-col gap-1 overscroll-contain"),
		children: [a && !n.length ? /* @__PURE__ */ (0, Q.jsx)("div", {
			className: "px-2 py-1.5",
			children: /* @__PURE__ */ (0, Q.jsx)(M, { label: "Searching suggestions" })
		}) : null, n.map((e, t) => /* @__PURE__ */ (0, Q.jsxs)(Z.Fragment, { children: [e.group === n[t - 1]?.group ? null : /* @__PURE__ */ (0, Q.jsx)("div", {
			className: "px-2 pt-1 text-caption-1-regular text-text-tertiary",
			children: e.group
		}), /* @__PURE__ */ (0, Q.jsxs)("button", {
			type: "button",
			"aria-current": t === r ? "true" : void 0,
			className: t === r ? J(_t, "bg-background-secondary-default") : _t,
			onMouseDown: (e) => e.preventDefault(),
			onClick: () => o(e.value),
			children: [
				/* @__PURE__ */ (0, Q.jsx)("span", {
					className: "min-w-0 grow truncate text-left",
					children: e.value
				}),
				e.matched ? /* @__PURE__ */ (0, Q.jsx)("span", {
					className: "shrink-0 text-caption-1-regular text-text-tertiary",
					children: e.matched
				}) : null,
				e.n ? /* @__PURE__ */ (0, Q.jsx)("span", {
					className: "shrink-0 text-caption-1-regular tabular-nums text-text-tertiary",
					children: e.n.toLocaleString()
				}) : null
			]
		})] }, `${e.group}-${e.value}`))]
	});
}
function Et({ credentials: e, hidden: t, onHidden: n }) {
	let r = (e.providers || []).filter((e) => e.followable), i = r.filter((e) => !t.has(e.provider_label)).length, a = i === r.length ? "All sources" : `${i}/${r.length} sources`;
	return /* @__PURE__ */ (0, Q.jsx)(U, {
		label: "Source filter",
		triggerLabel: a,
		leadingIcon: p,
		empty: "'No sources available yet'",
		items: r.map((e) => ({
			id: e.provider_label,
			selected: !t.has(e.provider_label),
			label: /* @__PURE__ */ (0, Q.jsxs)("span", {
				className: "flex min-w-0 items-center gap-1.5",
				children: [/* @__PURE__ */ (0, Q.jsx)(ht, { provider: e.provider }), e.provider_label]
			})
		})),
		onChange: (e, r) => {
			let i = new Set(t);
			r ? i.delete(e) : i.add(e), n(i);
		},
		actions: [
			{
				label: "Select all",
				disabled: !r.length,
				onPress: () => n(/* @__PURE__ */ new Set())
			},
			{
				label: "Deselect all",
				disabled: !r.length,
				onPress: () => n(new Set(r.map((e) => e.provider_label)))
			},
			{
				label: "Credential setup",
				href: Ct
			}
		]
	});
}
function Dt({ row: e, at: t, hidden: n, unpicked: r, onPick: i }) {
	if (e.kind === "error") return /* @__PURE__ */ (0, Q.jsx)(R, {
		tone: "error",
		title: e.line,
		children: e.error || "Lookup failed"
	});
	let a = (e.candidates || []).filter((e) => !n.has(e.provider_label || "")), o = Object.entries(e.failures || {});
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: _e({
			variant: "outlined",
			padding: "none",
			className: "flex flex-col gap-2 p-4"
		}),
		children: [
			/* @__PURE__ */ (0, Q.jsx)("b", {
				className: "text-body-medium text-text-primary",
				children: e.line
			}),
			a.length ? a.map((e) => {
				let n = wt(t, e);
				return /* @__PURE__ */ (0, Q.jsx)(v, {
					isSelected: !e.known && !r.has(n),
					isDisabled: e.known,
					onChange: (e) => i(n, e),
					children: /* @__PURE__ */ (0, Q.jsxs)("span", {
						className: "flex min-w-0 flex-wrap items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, Q.jsx)(ht, { provider: e.provider }),
							/* @__PURE__ */ (0, Q.jsx)("b", {
								className: "text-body-medium",
								children: e.provider_label
							}),
							/* @__PURE__ */ (0, Q.jsx)("span", {
								className: "min-w-0 break-words",
								children: e.label
							}),
							/* @__PURE__ */ (0, Q.jsx)("small", {
								className: "text-caption-1-regular text-text-secondary",
								children: e.known ? "Already followed" : e.evidence
							})
						]
					})
				}, n);
			}) : /* @__PURE__ */ (0, Q.jsx)(A, { children: St }),
			(e.external_searches || []).map((e) => /* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, Q.jsx)("small", {
					className: "text-caption-1-regular text-text-secondary",
					children: e.evidence
				}), /* @__PURE__ */ (0, Q.jsx)(C, {
					href: e.url,
					children: `${e.label}: ${e.query}`
				})]
			}, e.url)),
			o.length ? /* @__PURE__ */ (0, Q.jsx)(A, { children: o.map(([e, t]) => `${e}: ${t}`).join("; ") }) : null
		]
	});
}
function Ot({ data: e, credentials: t, readOnly: n, toast: r }) {
	let [i, a] = (0, Z.useState)(""), [o, s] = (0, Z.useState)(!1), [c, l] = (0, Z.useState)(""), [u, d] = (0, Z.useState)(""), [f, ee] = (0, Z.useState)(!1), [p, m] = (0, Z.useState)(null), [g, _] = (0, Z.useState)(-1), v = (0, Z.useRef)(null), te = (0, Z.useRef)(null), [y, ne] = (0, Z.useState)(/* @__PURE__ */ new Set()), [b, re] = (0, Z.useState)(/* @__PURE__ */ new Set()), [x, S] = (0, Z.useState)(""), [ie, C] = (0, Z.useState)(0);
	(0, Z.useEffect)(() => {
		let e = i.trim();
		if (o || !e || e.includes("/")) {
			d("");
			return;
		}
		let t = setTimeout(() => d(e), 250);
		return () => clearTimeout(t);
	}, [i, o]);
	let w = ct({
		queryKey: Ne(u),
		queryFn: ({ signal: e }) => ke(u, e),
		enabled: u.length > 0 && f && !o && p !== i
	}), T = (0, Z.useMemo)(() => (w.data?.groups || []).flatMap((e) => e.items.map((t) => ({
		value: t.value,
		matched: t.matched || "",
		n: t.n || 0,
		group: e.label
	}))), [w.data]), { job: E, running: D, outcome: A, start: M, dismiss: N } = ot({
		queryKey: O,
		queryFn: ({ signal: e }) => Oe(e),
		start: (e) => rt([e]),
		onStarted: () => re(/* @__PURE__ */ new Set()),
		onError: (e) => S(X(e)),
		onFinish: (e) => {
			e.status === "failed" && S(e.error || "Lookup failed");
		}
	}), P = (e) => {
		let t = e.trim();
		!t || n || o || D || M.isPending || (S(""), _(-1), l(t), a(t), d(""), m(t), M.mutate(t));
	}, F = w.isFetching, I = f && !o && p !== i && (T.length > 0 || F), L = () => {
		_(-1), m(i);
	}, z = (e) => {
		if (!(o || q(e.nativeEvent))) {
			if (e.key === "Escape" && I) L();
			else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
				if (!T.length) return;
				if (e.preventDefault(), !I) {
					m(null);
					return;
				}
				let t = e.key === "ArrowDown" ? 1 : -1;
				_((e) => {
					let n = e + t;
					return n < 0 ? T.length - 1 : n >= T.length ? 0 : n;
				});
			} else e.key === "Enter" && (e.preventDefault(), P(T[g]?.value || i));
		}
	}, B = A?.results || [], V = B.flatMap((e, t) => (e.candidates || []).filter((e) => !e.known && !y.has(e.provider_label || "")).map((e) => ({
		candidate: e,
		key: wt(t, e)
	})).filter((e) => !b.has(e.key))), H = st({
		mutationFn: async (e) => {
			let t = [], n = [];
			C(0);
			for (let r of e) {
				try {
					let e = await ge(r.candidate);
					n.push(e.source);
				} catch (e) {
					t.push(`${r.candidate.label}: ${X(e)}`);
				}
				C((e) => e + 1);
			}
			if (n.length) try {
				await nt(n);
			} catch (e) {
				t.push(X(e));
			}
			return {
				failures: t,
				sources: n
			};
		},
		onSuccess: (e) => {
			Ge(), e.failures.length ? S(e.failures.join("; ")) : (S(""), N(), r(`Added ${e.sources.length} follow sources`));
		},
		onError: (e) => S(X(e))
	}), U = e.suggestions || [], ae = !c.includes("/");
	return /* @__PURE__ */ (0, Q.jsxs)("section", {
		"aria-label": yt,
		className: _e({
			padding: "none",
			className: "flex flex-col gap-4 px-6 py-5 max-sm:px-4"
		}),
		children: [
			/* @__PURE__ */ (0, Q.jsx)("h3", {
				className: "text-title-2-medium text-text-primary",
				children: yt
			}),
			/* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-wrap items-end gap-2",
				children: [
					/* @__PURE__ */ (0, Q.jsxs)("div", {
						ref: v,
						className: "min-w-64 grow",
						onFocus: () => ee(!0),
						onBlur: (e) => {
							let t = e.relatedTarget;
							!e.currentTarget.contains(t) && !te.current?.contains(t) && ee(!1);
						},
						children: [/* @__PURE__ */ (0, Q.jsx)(j, {
							"aria-label": "Source link, name, or id",
							placeholder: vt,
							value: i,
							leadingIcon: Ue,
							enterKeyHint: "search",
							isDisabled: n,
							onChange: a,
							onCompositionStart: () => {
								s(!0), _(-1);
							},
							onCompositionEnd: (e) => {
								s(!1), a(e.currentTarget.value);
							},
							onKeyDown: z
						}), I ? /* @__PURE__ */ (0, Q.jsx)(Tt, {
							field: v,
							menu: te,
							options: T,
							active: g,
							busy: F,
							onPick: P,
							onClose: L
						}) : null]
					}),
					/* @__PURE__ */ (0, Q.jsx)(Et, {
						credentials: t,
						hidden: y,
						onHidden: ne
					}),
					/* @__PURE__ */ (0, Q.jsx)(h, {
						variant: "primary",
						disabled: n || !i.trim(),
						...K(D || M.isPending),
						onClick: () => P(i),
						children: "Find"
					})
				]
			}),
			/* @__PURE__ */ (0, Q.jsxs)("div", {
				"aria-live": "polite",
				className: "flex flex-col gap-3 empty:hidden",
				children: [D || M.isPending ? /* @__PURE__ */ (0, Q.jsx)(de, {
					embedded: !0,
					label: E?.message || (E?.total ? `Searching: ${E.checked || 0}/${E.total}` : ae ? bt : xt),
					value: E?.checked,
					total: E?.total
				}) : null, x ? /* @__PURE__ */ (0, Q.jsx)(R, {
					tone: "error",
					title: "This run did not finish",
					children: x
				}) : null]
			}),
			B.length ? /* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, Q.jsx)(k, { children: "Lookup results" }),
					B.map((e, t) => /* @__PURE__ */ (0, Q.jsx)(Dt, {
						row: e,
						at: t,
						hidden: y,
						unpicked: b,
						onPick: (e, t) => {
							let n = new Set(b);
							t ? n.delete(e) : n.add(e), re(n);
						}
					}, `${e.line}-${t}`)),
					/* @__PURE__ */ (0, Q.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, Q.jsx)(h, {
								variant: "secondary",
								size: "small",
								onClick: () => N(),
								children: "Off"
							}),
							/* @__PURE__ */ (0, Q.jsx)(h, {
								variant: "primary",
								size: "small",
								disabled: n || !V.length,
								...K(H.isPending),
								onClick: () => H.mutate(V),
								children: `Add selected (${V.length})`
							}),
							H.isPending ? /* @__PURE__ */ (0, Q.jsx)("span", {
								role: "status",
								className: "text-body-2-regular text-text-secondary",
								children: `Adding… ${ie}/${V.length}`
							}) : null
						]
					})
				]
			}) : null,
			U.length ? /* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, Q.jsx)("span", {
					className: "text-body-2-regular text-text-secondary",
					children: "Guess you like"
				}), U.map((e) => /* @__PURE__ */ (0, Q.jsx)(h, {
					variant: "secondary",
					size: "small",
					disabled: n,
					title: `Appeared ${e.visits} times in browsing history${e.origin ? ` · ${e.origin}` : ""}`,
					onClick: () => P(e.name),
					children: e.name
				}, e.name))]
			}) : null
		]
	});
}
// src/react/follow-manage/add-feed.tsx
var kt = "Enter a performer name to find her performer page on JavDB", At = "Add JAV subscription";
function jt(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let r of e.candidates) t.has(r.id) && r.held_by && n.set(r.held_by.id, r.held_by.name);
	if (n.size > 1) return {
		text: `The selected cards belong to different people in the database: ${[...n.values()].join(", ")}. Merge them first, then follow`,
		blocked: !0
	};
	let [r] = n.values();
	return r ? {
		text: `It will file under "${r}"`,
		blocked: !1
	} : e.known ? {
		text: `It will be filed under "${e.known.name}" in the database`,
		blocked: !1
	} : {
		text: `"${e.q}" is not in the database yet; a new person will be created`,
		blocked: !1
	};
}
function Mt({ card: e, picked: t, onPick: n }) {
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: "flex flex-wrap items-center gap-2",
		children: [/* @__PURE__ */ (0, Q.jsx)(v, {
			isSelected: t,
			onChange: n,
			children: /* @__PURE__ */ (0, Q.jsxs)("span", {
				className: "flex min-w-0 flex-wrap items-center gap-1.5",
				children: [
					/* @__PURE__ */ (0, Q.jsx)("span", {
						className: "min-w-0 break-words",
						children: e.names.join(", ")
					}),
					e.record ? /* @__PURE__ */ (0, Q.jsx)(y, {
						variant: "caption",
						color: "neutral",
						children: e.record
					}) : null,
					e.held_by ? /* @__PURE__ */ (0, Q.jsx)("small", {
						className: "text-caption-1-regular text-text-secondary",
						children: `Already filed under "${e.held_by.name}"`
					}) : null
				]
			})
		}), /* @__PURE__ */ (0, Q.jsx)(C, {
			href: e.url,
			children: e.id
		})]
	});
}
function Nt({ readOnly: e, toast: t, onAdded: n }) {
	let [r, i] = (0, Z.useState)(""), [a, o] = (0, Z.useState)(null), [s, c] = (0, Z.useState)(/* @__PURE__ */ new Set()), l = at(), u = () => {
		let t = r.trim();
		t && !e && l.run("lookup", (e) => ze(t, e), (e) => {
			o(e), c(new Set(e.suggested));
		});
	}, d = (e) => {
		e.key === "Enter" && !q(e.nativeEvent) && (e.preventDefault(), u());
	}, f = () => {
		o(null), c(/* @__PURE__ */ new Set()), l.setError("");
	}, ee = () => {
		a && l.run("follow", (e) => je(a.q, [...s], e), (e) => {
			t(e.created ? `Created "${e.entity_name}" and subscribed to her new releases` : `Subscribed to new releases of "${e.entity_name}"`), i(""), f(), n();
		});
	}, p = () => {
		let e = a?.known;
		e && l.run("known", (t) => Me(e.id, t), () => {
			t(`已订阅「${e.name}」的新作`), i(""), f(), n();
		});
	}, m = a ? jt(a, s) : null, g = a && !a.candidates.length && a.known?.subscribable ? a.known : null;
	return /* @__PURE__ */ (0, Q.jsxs)("section", {
		"aria-label": At,
		className: _e({
			padding: "none",
			className: "flex flex-col gap-4 px-6 py-5 max-sm:px-4"
		}),
		children: [
			/* @__PURE__ */ (0, Q.jsx)("h3", {
				className: "text-title-2-medium text-text-primary",
				children: At
			}),
			/* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-wrap items-end gap-2",
				children: [/* @__PURE__ */ (0, Q.jsx)("div", {
					className: "min-w-64 grow",
					children: /* @__PURE__ */ (0, Q.jsx)(j, {
						"aria-label": "Performer name",
						placeholder: kt,
						value: r,
						leadingIcon: Ue,
						enterKeyHint: "search",
						isDisabled: e,
						onChange: i,
						onKeyDown: d
					})
				}), /* @__PURE__ */ (0, Q.jsx)(h, {
					variant: "primary",
					disabled: e || !r.trim(),
					...K(l.busy === "lookup"),
					onClick: u,
					children: "Find"
				})]
			}),
			l.error ? /* @__PURE__ */ (0, Q.jsx)(R, {
				tone: "error",
				title: "This run did not finish",
				children: l.error
			}) : null,
			a ? /* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-col gap-3",
				children: [
					a.unavailable ? /* @__PURE__ */ (0, Q.jsx)(R, {
						tone: "warning",
						title: "JavDB 这一次没有搜成",
						children: a.unavailable
					}) : null,
					/* @__PURE__ */ (0, Q.jsx)(k, { children: "JavDB 上的演员卡" }),
					a.candidates.length ? a.candidates.map((e) => /* @__PURE__ */ (0, Q.jsx)(Mt, {
						card: e,
						picked: s.has(e.id),
						onPick: (t) => c((n) => {
							let r = new Set(n);
							return t ? r.add(e.id) : r.delete(e.id), r;
						})
					}, e.id)) : /* @__PURE__ */ (0, Q.jsx)(A, { children: a.unavailable ? "这一次没有拿到演员卡。" : "JavDB 上没有搜到这个名字。" }),
					a.candidates.length ? /* @__PURE__ */ (0, Q.jsx)(A, {
						role: "status",
						children: s.size ? m.text : "Check her performer card; if both the censored and uncensored records are her, check both."
					}) : null,
					g ? /* @__PURE__ */ (0, Q.jsx)(A, {
						role: "status",
						children: g.following ? `数据库里的「${g.name}」已经在订阅新作。` : `数据库里的「${g.name}」已有 JavDB 或 DMM 编号，可以直接订阅。`
					}) : null,
					/* @__PURE__ */ (0, Q.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, Q.jsx)(h, {
								variant: "secondary",
								size: "small",
								onClick: f,
								children: "Off"
							}),
							a.candidates.length ? /* @__PURE__ */ (0, Q.jsx)(h, {
								variant: "primary",
								size: "small",
								disabled: e || !s.size || m.blocked,
								...K(l.busy === "follow"),
								onClick: ee,
								children: `Add subscriptions (${s.size})`
							}) : null,
							g && !g.following ? /* @__PURE__ */ (0, Q.jsx)(h, {
								variant: "primary",
								size: "small",
								disabled: e,
								...K(l.busy === "known"),
								onClick: p,
								children: `订阅「${g.name}」`
							}) : null
						]
					})
				]
			}) : null
		]
	});
}
// src/react/follow-manage/alias-rename-dialog.tsx
function Pt({ group: e, close: t, receipt: n }) {
	return /* @__PURE__ */ (0, Q.jsx)(L, {
		isOpen: !!e,
		onOpenChange: (e) => {
			e || t();
		},
		width: "form",
		label: "Edit the canonical name",
		children: e ? /* @__PURE__ */ (0, Q.jsx)(Ft, {
			group: e,
			close: t,
			receipt: n
		}, e.canonical_key) : null
	});
}
function Ft({ group: e, close: t, receipt: n }) {
	let [i, a] = (0, Z.useState)(e.canonical_name), o = at();
	return /* @__PURE__ */ (0, Q.jsxs)("form", {
		onSubmit: (r) => {
			r.preventDefault(), i.trim() && i.trim() !== e.canonical_name && o.run("rename", (t) => Je(e.canonical_key, i.trim(), t), () => {
				Ge(), n(`Changed the canonical name to ${i.trim()}`), t();
			});
		},
		className: "flex min-h-0 flex-col gap-4 p-5",
		children: [
			/* @__PURE__ */ (0, Q.jsx)(r, {
				slot: "title",
				className: "text-title-2-semibold text-text-primary",
				children: "Edit the canonical name"
			}),
			/* @__PURE__ */ (0, Q.jsxs)("p", {
				className: "text-body-2-regular wrap-anywhere text-text-secondary",
				children: ["Current name:", e.canonical_name]
			}),
			/* @__PURE__ */ (0, Q.jsx)(j, {
				"aria-label": "Canonical name",
				autoFocus: !0,
				value: i,
				onChange: a
			}),
			/* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, Q.jsx)(k, { children: "Pick an existing alias" }), /* @__PURE__ */ (0, Q.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: e.aliases.map((e) => /* @__PURE__ */ (0, Q.jsx)(h, {
						variant: "secondary",
						size: "small",
						onClick: () => a(e.name),
						children: e.name
					}, e.key))
				})]
			}),
			/* @__PURE__ */ (0, Q.jsx)("p", {
				className: "text-body-2-regular text-text-secondary",
				children: "The original name is kept as an alias; linked profiles and video credits update together."
			}),
			o.error ? /* @__PURE__ */ (0, Q.jsx)(R, {
				tone: "error",
				children: o.error
			}) : null,
			/* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-wrap justify-end gap-2",
				children: [/* @__PURE__ */ (0, Q.jsx)(h, {
					variant: "secondary",
					onClick: t,
					children: "Cancel"
				}), /* @__PURE__ */ (0, Q.jsx)(h, {
					type: "submit",
					variant: "primary",
					disabled: !i.trim() || i.trim() === e.canonical_name,
					...K(!!o.busy),
					children: "Edit the canonical name"
				})]
			})
		]
	});
}
// src/react/follow-manage/alias-manager.tsx
var It = (e) => `The alias "${e}" will be removed and its source restored to a standalone creator group.`, Lt = it({
	rowSelectionFeature: $e,
	rowSortingFeature: et,
	rowPaginationFeature: Qe,
	columnVisibilityFeature: ye,
	sortedRowModel: t(),
	paginatedRowModel: e()
}), Rt = Lt, zt = {
	id: "select",
	label: "Select",
	width: 48,
	min: 48,
	max: 48,
	required: !0
}, Bt = {
	id: "canonical",
	label: "Canonical name",
	width: 280,
	min: 240,
	required: !0,
	flex: !0
}, Vt = [
	zt,
	Bt,
	{
		id: "alias",
		label: "Platform alias",
		width: 240
	},
	{
		id: "evidence",
		label: "Basis",
		width: 320
	},
	{
		id: "actions",
		label: "Actions",
		width: 112
	}
], Ht = [
	zt,
	Bt,
	{
		id: "aliases",
		label: "Platform alias",
		width: 400
	},
	{
		id: "actions",
		label: "Actions",
		width: 184,
		min: 168
	}
], Ut = (e) => e.alias;
function Wt(e, t, n) {
	let r = n ? `name:${n}` : "", i = r && e.find((e) => e.author_key === r) || e.find((e) => e.author_name === t || e.entity_name === t);
	return i ? e.filter((e) => e.author_key === i.author_key) : [];
}
function Gt({ sources: e, name: t, canonicalKey: n }) {
	return /* @__PURE__ */ (0, Q.jsxs)("span", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ (0, Q.jsx)(mt, {
			group: Wt(e, t, n),
			name: t
		}), /* @__PURE__ */ (0, Q.jsx)("b", {
			className: "text-body-medium",
			children: t
		})]
	});
}
function Kt({ groups: e, suggestions: t, sources: r = [], readOnly: i, toast: u }) {
	let d = ut("alias-suggestions", Vt), f = ut("alias-saved", Ht), [ee, p] = (0, Z.useState)(null), [g, _] = (0, Z.useState)({}), [y, C] = (0, Z.useState)({}), w = n(() => _({})), T = n(() => C({})), [E, D] = (0, Z.useState)([]), [O, A] = (0, Z.useState)([]), [M, N] = (0, Z.useState)({
		pageIndex: 0,
		pageSize: 20
	}), [P, F] = (0, Z.useState)({
		pageIndex: 0,
		pageSize: 20
	}), I = {
		...M,
		pageIndex: Math.min(M.pageIndex, Math.max(0, Math.ceil(t.length / M.pageSize) - 1))
	}, L = {
		...P,
		pageIndex: Math.min(P.pageIndex, Math.max(0, Math.ceil(e.length / P.pageSize) - 1))
	}, [R, B] = (0, Z.useState)(""), [V, U] = (0, Z.useState)(""), [ae, oe] = (0, Z.useState)(""), W = st({
		mutationFn: async (e) => {
			let t = 0;
			for (let n of e) {
				try {
					await he(n.canonical, n.alias);
				} catch (n) {
					t && Ge();
					let r = e.length - t;
					throw new m(`${X(n)} (${r} group${r === 1 ? "" : "s"} left unmerged)`, 200);
				}
				t += 1;
			}
			return {
				done: t,
				items: e
			};
		},
		onSuccess: (e) => {
			B(""), _({}), Ge(), u(`Merged ${e.done} creator alias groups`);
		},
		onError: (e) => B(X(e))
	}), de = st({
		mutationFn: (e) => he(e.canonical, e.alias),
		onSuccess: () => {
			B(""), U(""), oe(""), Ge(), u("Creator aliases saved");
		},
		onError: (e) => B(X(e))
	}), fe = st({
		mutationFn: async (e) => {
			let t = typeof e == "string" ? [e] : e, n = 0;
			try {
				for (let e of t) await Ke(e), n += 1;
			} catch (e) {
				throw Error(`${X(e)} (removed ${n} aliases, ${t.length - n} left unremoved)`);
			} finally {
				Ge();
			}
		},
		onSuccess: () => {
			B(""), C({}), u("Removed the creator alias");
		},
		onError: (e) => B(X(e))
	}), me = (e, t) => {
		e.length && be({
			title: t ? "Merge all creator aliases" : "Merge selected creator aliases",
			body: `Will merge the following ${e.length} creator groups: ${e.map((e) => `"${e.alias}" into "${e.canonical}"`).join("; ")}.`,
			confirmLabel: t ? "Merge all aliases" : "Merge selected aliases",
			onConfirm: () => W.mutateAsync(e)
		});
	}, ge = (e) => void be({
		title: "Remove creator alias",
		body: It(e),
		confirmLabel: "Remove creator alias",
		onConfirm: () => fe.mutateAsync(e)
	}), G = (0, Z.useRef)({
		sources: r,
		readOnly: i,
		merging: W.isPending,
		removing: fe.isPending,
		merge: me,
		remove: ge,
		rename: p
	});
	G.current = {
		sources: r,
		readOnly: i,
		merging: W.isPending,
		removing: fe.isPending,
		merge: me,
		remove: ge,
		rename: p
	};
	let ve = (0, Z.useMemo)(() => {
		let e = xe();
		return e.columns([
			e.display({
				id: "select",
				header: (e) => /* @__PURE__ */ (0, Q.jsx)(ue, {
					table: e.table,
					label: "Select all pending-merge aliases"
				}),
				cell: (e) => /* @__PURE__ */ (0, Q.jsx)(v, {
					slot: null,
					isSelected: e.row.getIsSelected(),
					"aria-label": `Choose alias ${e.row.original.alias} to merge into ${e.row.original.canonical}`,
					onChange: (t) => e.row.toggleSelected(t)
				})
			}),
			e.accessor("canonical", {
				header: "Canonical name",
				cell: (e) => /* @__PURE__ */ (0, Q.jsx)(Gt, {
					sources: G.current.sources,
					name: e.getValue()
				})
			}),
			e.accessor("alias", {
				header: "Platform alias",
				cell: (e) => e.getValue()
			}),
			e.accessor("evidence", {
				header: "Basis",
				cell: (e) => /* @__PURE__ */ (0, Q.jsx)("span", {
					className: "text-body-2-regular text-text-secondary",
					children: e.getValue()
				})
			}),
			e.display({
				id: "actions",
				header: "Actions",
				cell: (e) => /* @__PURE__ */ (0, Q.jsx)(h, {
					variant: "secondary",
					size: "small",
					disabled: G.current.readOnly,
					...K(G.current.merging),
					onClick: () => G.current.merge([e.row.original], !1),
					children: "Merge"
				})
			})
		]);
	}, []), ye = (0, Z.useMemo)(() => {
		let e = xe();
		return e.columns([
			e.display({
				id: "select",
				header: ({ table: e }) => /* @__PURE__ */ (0, Q.jsx)(ue, {
					table: e,
					label: "Select all saved aliases"
				}),
				cell: ({ row: e }) => /* @__PURE__ */ (0, Q.jsx)(v, {
					slot: null,
					"aria-label": `Select saved alias ${e.original.canonical_name}`,
					isSelected: e.getIsSelected(),
					onChange: (t) => e.toggleSelected(t)
				})
			}),
			e.accessor("canonical_name", {
				id: "canonical",
				header: "Canonical name",
				cell: (e) => /* @__PURE__ */ (0, Q.jsx)(Gt, {
					sources: G.current.sources,
					name: e.getValue(),
					canonicalKey: e.row.original.canonical_key
				})
			}),
			e.accessor("aliases", {
				header: "Platform alias",
				sortFn: (e, t) => e.original.aliases.map((e) => e.name).join(" ").localeCompare(t.original.aliases.map((e) => e.name).join(" "), "zh-CN"),
				cell: (e) => /* @__PURE__ */ (0, Q.jsx)("span", {
					className: "flex flex-wrap items-center gap-1.5",
					children: e.getValue().map((e) => /* @__PURE__ */ (0, Q.jsxs)("span", {
						className: "inline-flex items-center gap-1 rounded-md bg-background-secondary-default px-1.5 py-1 text-caption-1-medium text-text-secondary",
						children: [e.name, /* @__PURE__ */ (0, Q.jsx)(h, {
							variant: "ghost",
							size: "xs",
							iconOnly: !0,
							leadingIcon: z,
							"aria-label": `Remove alias ${e.name}`,
							disabled: G.current.readOnly,
							...K(G.current.removing),
							onClick: () => G.current.remove(e.name)
						})]
					}, e.key))
				})
			}),
			e.display({
				id: "actions",
				header: "Actions",
				cell: ({ row: e }) => /* @__PURE__ */ (0, Q.jsx)(h, {
					variant: "secondary",
					size: "small",
					disabled: G.current.readOnly,
					"aria-label": `Edit the canonical name of ${e.original.canonical_name}`,
					onClick: () => G.current.rename(e.original),
					children: "Edit the canonical name"
				})
			})
		]);
	}, []), q = lt({
		features: Lt,
		data: t,
		columns: ve,
		getRowId: Ut,
		state: {
			rowSelection: g,
			sorting: E,
			pagination: I,
			columnVisibility: d.visibility
		},
		onColumnVisibilityChange: d.change,
		onRowSelectionChange: (e) => {
			w(), _(e);
		},
		onSortingChange: (e) => {
			D(e), N((e) => ({
				...e,
				pageIndex: 0
			}));
		},
		onPaginationChange: N,
		enableRowSelection: !0
	}), Se = lt({
		features: Rt,
		data: e,
		columns: ye,
		getRowId: (e) => e.canonical_key,
		state: {
			rowSelection: y,
			sorting: O,
			pagination: L,
			columnVisibility: f.visibility
		},
		onColumnVisibilityChange: f.change,
		onRowSelectionChange: (e) => {
			T(), C(e);
		},
		enableRowSelection: !0,
		onSortingChange: (e) => {
			A(e), F((e) => ({
				...e,
				pageIndex: 0
			}));
		},
		onPaginationChange: F
	}), J = q.getSelectedRowModel().rows.map((e) => e.original), Y = Se.getSelectedRowModel().rows.flatMap((e) => e.original.aliases.map((e) => e.name)), Ce = K(W.isPending);
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: _e({
			padding: "none",
			className: "flex flex-col gap-4 px-6 py-5 max-sm:px-4"
		}),
		children: [
			/* @__PURE__ */ (0, Q.jsx)("h3", {
				className: "text-title-2-medium text-text-primary",
				children: "Creator aliases"
			}),
			/* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, Q.jsx)(k, { children: "Add an alias manually" }), /* @__PURE__ */ (0, Q.jsxs)("div", {
					className: "flex flex-wrap items-end gap-2",
					children: [
						/* @__PURE__ */ (0, Q.jsx)(j, {
							"aria-label": "Canonical name",
							placeholder: "The name shown consistently across Peach",
							value: V,
							onChange: U,
							isDisabled: i,
							className: "w-56"
						}),
						/* @__PURE__ */ (0, Q.jsx)(j, {
							"aria-label": "Platform alias",
							placeholder: "Platform alias",
							value: ae,
							onChange: oe,
							isDisabled: i,
							className: "w-56"
						}),
						/* @__PURE__ */ (0, Q.jsx)(h, {
							variant: "primary",
							disabled: i || !V.trim() || !ae.trim(),
							...K(de.isPending),
							onClick: () => de.mutate({
								canonical: V.trim(),
								alias: ae.trim()
							}),
							children: "Save alias"
						})
					]
				})]
			}),
			R ? /* @__PURE__ */ (0, Q.jsx)(ie, { children: R }) : null,
			t.length ? /* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, Q.jsxs)("div", {
						"data-responsive-toolbar": "",
						children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
							"data-toolbar-heading": "",
							children: [/* @__PURE__ */ (0, Q.jsx)(k, { children: "Pending merge" }), /* @__PURE__ */ (0, Q.jsx)("span", {
								className: "text-body-2-regular text-text-secondary",
								children: `${t.length} groups`
							})]
						}), /* @__PURE__ */ (0, Q.jsxs)("div", {
							"data-toolbar-actions": "",
							children: [
								/* @__PURE__ */ (0, Q.jsx)(h, {
									variant: "primary",
									size: "small",
									disabled: i,
									...Ce,
									onClick: () => me(t, !0),
									children: `Merge all (${t.length})`
								}),
								/* @__PURE__ */ (0, Q.jsx)(re, {
									label: "Creator aliases pending merge",
									sorting: E,
									options: [
										{
											id: "canonical",
											label: "Canonical name"
										},
										{
											id: "alias",
											label: "Platform alias"
										},
										{
											id: "evidence",
											label: "Basis"
										}
									],
									onChange: (e) => {
										D(e), N((e) => ({
											...e,
											pageIndex: 0
										}));
									}
								}),
								/* @__PURE__ */ (0, Q.jsx)(ce, {
									preferences: d,
									label: "Creator aliases pending merge"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, Q.jsxs)(H, {
						label: "Pending-merge alias bulk actions",
						visible: J.length > 0,
						count: `${J.length} groups selected`,
						children: [/* @__PURE__ */ (0, Q.jsx)(h, {
							variant: "secondary",
							size: "small",
							disabled: i,
							...Ce,
							onClick: () => me(J, !1),
							children: `Merge selected (${J.length})`
						}), /* @__PURE__ */ (0, Q.jsx)(h, {
							variant: "ghost",
							size: "small",
							onClick: () => _({}),
							children: "Clear selection"
						})]
					}),
					/* @__PURE__ */ (0, Q.jsx)(b, {
						follow: !0,
						preferences: d,
						onRowClick: (e) => q.getRow(e)?.toggleSelected(),
						children: /* @__PURE__ */ (0, Q.jsxs)(se, {
							"aria-label": "Creator aliases pending merge",
							size: "sm",
							sortDescriptor: E[0] ? {
								column: E[0].id,
								direction: E[0].desc ? "descending" : "ascending"
							} : void 0,
							onSortChange: (e) => q.getColumn(String(e.column))?.toggleSorting(e.direction === "descending"),
							children: [/* @__PURE__ */ (0, Q.jsxs)(l, { children: [q.getHeaderGroups()[0].headers.map((e) => /* @__PURE__ */ (0, Q.jsx)(o, {
								id: e.id,
								isRowHeader: e.column.id === "canonical",
								allowsSorting: e.column.getCanSort(),
								...d.columnProps(e.id),
								children: ({ sortDirection: t }) => /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsxs)("span", {
									className: "flex items-center gap-0.5",
									children: [Ae(e.column.columnDef.header, e.getContext()), e.column.getCanSort() ? /* @__PURE__ */ (0, Q.jsx)("span", {
										"data-sort-indicator": !0,
										"data-direction": t || void 0,
										children: /* @__PURE__ */ (0, Q.jsx)(te, {})
									}) : null]
								}), /* @__PURE__ */ (0, Q.jsx)(le, {
									preferences: d,
									id: e.id
								})] })
							}, e.id)), /* @__PURE__ */ (0, Q.jsx)(o, {
								id: "remaining-space",
								"aria-label": "Row empty space",
								"data-table-space": "",
								width: d.spaceWidth,
								minWidth: 0
							})] }), /* @__PURE__ */ (0, Q.jsx)(a, { children: q.getRowModel().rows.map((e) => /* @__PURE__ */ (0, Q.jsxs)(s, {
								id: e.id,
								"data-board-selected": e.getIsSelected() || void 0,
								children: [e.getVisibleCells().map((e) => /* @__PURE__ */ (0, Q.jsx)(c, { children: Ae(e.column.columnDef.cell, e.getContext()) }, e.id)), /* @__PURE__ */ (0, Q.jsx)(c, { "data-table-space": "" })]
							}, e.id)) })]
						})
					}),
					/* @__PURE__ */ (0, Q.jsx)(ne, {
						label: "Creator aliases pending merge",
						unit: "groups",
						total: t.length,
						pagination: I,
						onChange: N
					})
				]
			}) : null,
			/* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, Q.jsxs)("div", {
						"data-responsive-toolbar": "",
						children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
							"data-toolbar-heading": "",
							children: [/* @__PURE__ */ (0, Q.jsx)(k, { children: "Saved aliases" }), /* @__PURE__ */ (0, Q.jsx)("span", {
								className: "text-body-2-regular text-text-secondary",
								children: `${e.length} groups`
							})]
						}), /* @__PURE__ */ (0, Q.jsxs)("div", {
							"data-toolbar-actions": "",
							children: [/* @__PURE__ */ (0, Q.jsx)(re, {
								label: "Saved creator aliases",
								sorting: O,
								options: [{
									id: "canonical",
									label: "Canonical name"
								}, {
									id: "aliases",
									label: "Platform alias"
								}],
								onChange: (e) => {
									A(e), F((e) => ({
										...e,
										pageIndex: 0
									}));
								}
							}), /* @__PURE__ */ (0, Q.jsx)(ce, {
								preferences: f,
								label: "Saved creator aliases"
							})]
						})]
					}),
					/* @__PURE__ */ (0, Q.jsxs)(H, {
						label: "Saved alias bulk actions",
						visible: Y.length > 0,
						count: `Selected ${Y.length} aliases`,
						children: [/* @__PURE__ */ (0, Q.jsx)(h, {
							variant: "secondary",
							size: "small",
							disabled: i,
							...K(fe.isPending),
							onClick: () => void be({
								title: "Remove selected creator aliases",
								body: `Will remove the following ${Y.length} aliases, restoring their sources as separate creator groups.`,
								items: Y,
								confirmLabel: "Remove selected aliases",
								onConfirm: () => fe.mutateAsync(Y)
							}),
							children: `Remove selected aliases (${Y.length})`
						}), /* @__PURE__ */ (0, Q.jsx)(h, {
							variant: "ghost",
							size: "small",
							onClick: () => C({}),
							children: "Clear selection"
						})]
					}),
					e.length ? /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)(b, {
						follow: !0,
						preferences: f,
						onRowClick: (e) => Se.getRow(e)?.toggleSelected(),
						children: /* @__PURE__ */ (0, Q.jsxs)(se, {
							"aria-label": "Saved creator aliases",
							size: "sm",
							sortDescriptor: O[0] ? {
								column: O[0].id,
								direction: O[0].desc ? "descending" : "ascending"
							} : void 0,
							onSortChange: (e) => Se.getColumn(String(e.column))?.toggleSorting(e.direction === "descending"),
							children: [/* @__PURE__ */ (0, Q.jsxs)(l, { children: [Se.getHeaderGroups()[0].headers.map((e) => /* @__PURE__ */ (0, Q.jsx)(o, {
								id: e.id,
								isRowHeader: e.column.id === "canonical",
								allowsSorting: e.column.getCanSort(),
								...f.columnProps(e.id),
								children: ({ sortDirection: t }) => /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsxs)("span", {
									className: "flex items-center gap-0.5",
									children: [Ae(e.column.columnDef.header, e.getContext()), e.column.getCanSort() ? /* @__PURE__ */ (0, Q.jsx)("span", {
										"data-sort-indicator": !0,
										"data-direction": t || void 0,
										children: /* @__PURE__ */ (0, Q.jsx)(te, {})
									}) : null]
								}), /* @__PURE__ */ (0, Q.jsx)(le, {
									preferences: f,
									id: e.id
								})] })
							}, e.id)), /* @__PURE__ */ (0, Q.jsx)(o, {
								id: "remaining-space",
								"aria-label": "Row empty space",
								"data-table-space": "",
								width: f.spaceWidth,
								minWidth: 0
							})] }), /* @__PURE__ */ (0, Q.jsx)(a, { children: Se.getRowModel().rows.map((e) => /* @__PURE__ */ (0, Q.jsxs)(s, {
								id: e.id,
								"data-board-selected": e.getIsSelected() || void 0,
								children: [e.getVisibleCells().map((e) => /* @__PURE__ */ (0, Q.jsx)(c, { children: Ae(e.column.columnDef.cell, e.getContext()) }, e.id)), /* @__PURE__ */ (0, Q.jsx)(c, { "data-table-space": "" })]
							}, e.id)) })]
						})
					}), /* @__PURE__ */ (0, Q.jsx)(ne, {
						label: "Saved creator aliases",
						unit: "groups",
						total: e.length,
						pagination: L,
						onChange: F
					})] }) : /* @__PURE__ */ (0, Q.jsx)(S, {
						size: "compact",
						icon: pe,
						title: "No saved creator aliases yet",
						actions: i ? void 0 : /* @__PURE__ */ (0, Q.jsx)(x, {
							target: "input[aria-label=\"Canonical name\"]",
							children: "Add alias"
						}),
						children: "Fill in the unified name plus the names this creator uses on other platforms."
					})
				]
			}),
			/* @__PURE__ */ (0, Q.jsx)(Pt, {
				group: ee,
				close: () => p(null),
				receipt: u
			})
		]
	});
}
// src/react/follow-manage/feed-sources.tsx
var qt = it({
	rowPaginationFeature: Qe,
	rowSelectionFeature: $e,
	rowSortingFeature: et,
	columnVisibilityFeature: ye,
	sortedRowModel: t(),
	paginatedRowModel: e()
}), Jt = {
	select: "Select",
	name: "Name",
	kind: "Kind",
	origin: "Source",
	status: "State",
	interval: "Frequency",
	fetched: "Last fetch",
	fresh: "Last additions",
	actions: "Actions"
}, Yt = /* @__PURE__ */ new Set(["actions"]), Xt = Object.entries(Jt).map(([e, t]) => ({
	id: e,
	label: t,
	width: e === "select" ? 48 : e === "name" ? 300 : e === "actions" ? 208 : e === "fetched" ? 200 : e === "origin" ? 184 : 160,
	min: e === "select" ? 48 : e === "actions" ? 200 : e === "name" ? 300 : 112,
	max: e === "select" ? 48 : e === "name" ? 2e3 : 800,
	flex: e === "name",
	required: e === "select" || e === "name"
})), Zt = () => We.invalidateQueries({
	queryKey: w,
	exact: !0
}), $ = (e) => e.name || e.url;
function Qt(e) {
	try {
		return new URL(e).hostname.replace(/^www\./, "");
	} catch {
		return e;
	}
}
function $t({ source: e }) {
	return e.enabled ? e.last_error ? /* @__PURE__ */ (0, Q.jsx)(y, {
		variant: "caption",
		color: "rose",
		children: "Fetch failed"
	}) : e.last_fetched_at ? /* @__PURE__ */ (0, Q.jsx)(y, {
		variant: "caption",
		color: "lime",
		children: "Normal"
	}) : /* @__PURE__ */ (0, Q.jsx)(y, {
		variant: "caption",
		color: "gray",
		children: "Unchecked"
	}) : /* @__PURE__ */ (0, Q.jsx)(y, {
		variant: "caption",
		color: "gray",
		children: "Paused"
	});
}
function en({ source: e }) {
	let t = e.entity_id ? {
		id: e.entity_id,
		has_image: !!e.has_image,
		image_version: e.image_version,
		avatar_focus: e.avatar_focus
	} : null;
	return /* @__PURE__ */ (0, Q.jsx)("span", {
		"aria-hidden": !0,
		className: `relative inline-grid size-8 shrink-0 place-items-center overflow-hidden rounded-full bg-background-tertiary-default text-caption-1-semibold text-text-secondary ${ft}`,
		dangerouslySetInnerHTML: { __html: G($(e), t, null, "performer") }
	});
}
var tn = (e, t) => e.entity_id !== null && t.has(e.entity_id) && e.page_name && e.page_name !== e.name ? e.page_name : "";
function nn(e) {
	let t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set();
	for (let { entity_id: r } of e) r !== null && (t.has(r) ? n.add(r) : t.add(r));
	return n;
}
function rn(e, t) {
	let n = e.length === 1 ? e[0] : null;
	return be({
		title: n ? "Remove feed" : `Remove ${e.length} follow sources`,
		body: n ? `Will remove the feed "${$(n)}"; its new releases will no longer be pulled, and new releases already fetched are kept.` : "The selected sources will be removed and their new releases will no longer be fetched; new releases already fetched are kept.",
		confirmLabel: n ? "Remove feed" : "Remove selected feeds",
		danger: !0,
		onConfirm: t
	});
}
function an({ readOnly: e, toast: t, onAdd: n, selection: r }) {
	let i = ct({
		queryKey: w,
		queryFn: ({ signal: e }) => Ee(e)
	}), u = at(), d = ut("jav-feeds", Xt), f = i.data, p = (0, Z.useMemo)(() => f?.sources ?? [], [f]), [m, g] = (0, Z.useState)(/* @__PURE__ */ new Set()), y = r?.ids ?? m, x = r?.onChange ?? g, [C, T] = (0, Z.useState)(1), [E, D] = (0, Z.useState)(20), [O, k] = (0, Z.useState)([]), j = He(p.length, E, C);
	(0, Z.useEffect)(() => {
		T((e) => Math.min(e, j.pages));
	}, [j.pages]), (0, Z.useEffect)(() => {
		x((e) => {
			let t = new Set(p.map((e) => e.id)), n = new Set([...e].filter((e) => t.has(e)));
			return n.size === e.size ? e : n;
		});
	}, [p, x]);
	let M = st({
		mutationFn: async (e) => {
			let t = await Be(e.ids, 4, async (t) => {
				e.action === "remove" ? await qe(t) : await tt(t, e.action === "enabled");
			});
			return {
				...e,
				results: t
			};
		},
		onSuccess: (e) => {
			let n = e.results.filter((e) => !e.ok), r = e.ids.length - n.length;
			if (x(/* @__PURE__ */ new Set()), Zt(), e.action === "remove" && r && t(`Removed ${r} follow sources`), n.length) {
				let e = n[0];
				u.setError(`${n.length} not written: ${e.ok ? "" : X(e.error)}`);
			}
		},
		onError: (e) => u.setError(X(e))
	}), P = (0, Z.useMemo)(() => nn(p), [p]), F = (0, Z.useRef)({
		readOnly: e,
		shared: P,
		busy: null,
		toggle: () => {},
		fetch: () => {},
		remove: () => {}
	});
	F.current = {
		readOnly: e,
		shared: P,
		busy: u.busy,
		toggle: (e, t) => void u.run(`enabled-${e.id}`, (n) => tt(e.id, t, n), () => void Zt()),
		fetch: (e) => void u.run(`check-${e.id}`, (t) => ve(t, [e.id]), () => void Zt()),
		remove: (e) => void rn([e], async () => {
			await qe(e.id), t(`Removed the follow source "${$(e)}"`), Zt();
		})
	};
	let I = (0, Z.useMemo)(() => {
		let e = xe(), t = (e) => () => Jt[e] || e;
		return e.columns([
			e.display({
				id: "select",
				header: (e) => /* @__PURE__ */ (0, Q.jsx)(ue, {
					table: e.table,
					label: "Select all feeds on this page",
					page: !0
				}),
				cell: (e) => /* @__PURE__ */ (0, Q.jsx)(v, {
					slot: null,
					isSelected: e.row.getIsSelected(),
					onChange: (t) => e.row.toggleSelected(t),
					"aria-label": `Select ${$(e.row.original)}`
				})
			}),
			e.accessor($, {
				id: "name",
				header: t("name"),
				cell: (e) => {
					let t = tn(e.row.original, F.current.shared);
					return /* @__PURE__ */ (0, Q.jsxs)("span", {
						className: "flex items-center gap-2 whitespace-nowrap text-body-medium text-text-primary",
						children: [
							/* @__PURE__ */ (0, Q.jsx)(en, { source: e.row.original }),
							e.getValue(),
							t ? /* @__PURE__ */ (0, Q.jsx)("span", {
								className: "text-body-2-regular text-text-secondary",
								title: `On-site this page files under "${t}"`,
								children: t
							}) : null
						]
					});
				}
			}),
			e.accessor((e) => e.kind_label, {
				id: "kind",
				header: t("kind"),
				cell: (e) => /* @__PURE__ */ (0, Q.jsx)("span", {
					className: "whitespace-nowrap",
					children: e.getValue()
				})
			}),
			e.accessor((e) => e.url, {
				id: "origin",
				header: t("origin"),
				cell: (e) => /* @__PURE__ */ (0, Q.jsxs)("a", {
					href: e.getValue(),
					target: "_blank",
					rel: "noopener noreferrer",
					title: "打开来源页面",
					className: "max-w-full text-text-primary underline-offset-2 hover:underline",
					children: [/* @__PURE__ */ (0, Q.jsx)(ae, {
						site: e.row.original.kind.startsWith("javdb") ? "javdb" : e.row.original.kind.startsWith("dmm") ? "dmm" : Qt(e.getValue()),
						label: Qt(e.getValue())
					}), /* @__PURE__ */ (0, Q.jsx)(fe, {
						"aria-hidden": !0,
						className: "size-(--icon-inline) shrink-0"
					})]
				})
			}),
			e.accessor((e) => e.last_error ? "Fetch failed" : e.enabled ? "Enabled" : "Paused", {
				id: "status",
				header: t("status"),
				cell: (e) => /* @__PURE__ */ (0, Q.jsx)($t, { source: e.row.original })
			}),
			e.accessor((e) => e.interval_minutes, {
				id: "interval",
				header: t("interval"),
				cell: (e) => /* @__PURE__ */ (0, Q.jsx)("span", {
					className: "whitespace-nowrap",
					children: we(e.getValue())
				})
			}),
			e.accessor((e) => e.last_fetched_at && Date.parse(e.last_fetched_at) || 0, {
				id: "fetched",
				header: t("fetched"),
				cell: (e) => /* @__PURE__ */ (0, Q.jsx)("span", {
					className: "whitespace-nowrap tabular-nums",
					children: e.row.original.last_fetched_at ? Re(e.row.original.last_fetched_at) : "Never fetched"
				})
			}),
			e.accessor((e) => e.last_new_count, {
				id: "fresh",
				header: t("fresh"),
				cell: (e) => /* @__PURE__ */ (0, Q.jsx)("span", {
					className: "whitespace-nowrap tabular-nums",
					children: `${e.getValue()} items`
				})
			}),
			e.display({
				id: "actions",
				header: t("actions"),
				cell: (e) => /* @__PURE__ */ (0, Q.jsxs)("span", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ (0, Q.jsx)(oe, {
							"aria-label": `Enable ${$(e.row.original)}`,
							isSelected: e.row.original.enabled,
							isDisabled: F.current.readOnly,
							onChange: (t) => F.current.toggle(e.row.original, t)
						}),
						/* @__PURE__ */ (0, Q.jsx)(h, {
							variant: "secondary",
							size: "small",
							iconOnly: !0,
							leadingIcon: Y,
							"aria-label": `Fetch ${$(e.row.original)}`,
							disabled: F.current.readOnly,
							...K(F.current.busy === `check-${e.row.original.id}`),
							onClick: () => F.current.fetch(e.row.original)
						}),
						/* @__PURE__ */ (0, Q.jsx)(h, {
							variant: "secondary",
							size: "small",
							iconOnly: !0,
							leadingIcon: N,
							"aria-label": `Remove ${$(e.row.original)}`,
							disabled: F.current.readOnly,
							onClick: () => F.current.remove(e.row.original)
						})
					]
				})
			})
		]);
	}, []), L = (0, Z.useMemo)(() => Object.fromEntries([...y].map((e) => [String(e), !0])), [y]), z = lt({
		features: qt,
		data: p,
		columns: I,
		getRowId: (e) => String(e.id),
		state: {
			rowSelection: L,
			sorting: O,
			pagination: {
				pageIndex: j.page - 1,
				pageSize: E
			},
			columnVisibility: d.visibility
		},
		onColumnVisibilityChange: d.change,
		onSortingChange: (e) => {
			k(e), T(1);
		},
		enableRowSelection: !0,
		onRowSelectionChange: (e) => {
			r?.onActivate();
			let t = typeof e == "function" ? e(L) : e;
			x(new Set(Object.entries(t).filter(([, e]) => e).map(([e]) => Number(e))));
		}
	});
	if (!f) return i.error ? /* @__PURE__ */ (0, Q.jsx)(R, {
		tone: "error",
		title: "The follow source will not open",
		children: X(i.error)
	}) : /* @__PURE__ */ (0, Q.jsx)(A, { children: "Reading feed." });
	let B = () => void u.run("check", (e) => ve(e), () => void Zt()), V = (e) => {
		r?.onActivate(), x((t) => {
			let n = new Set(t);
			return n.has(e) ? n.delete(e) : n.add(e), n;
		});
	}, U = p.filter((e) => y.has(e.id)), W = p.filter((e) => e.last_error);
	return /* @__PURE__ */ (0, Q.jsx)("div", {
		className: "flex flex-col gap-3",
		children: /* @__PURE__ */ (0, Q.jsxs)("section", {
			"aria-label": "JAV subscription list",
			className: _e({
				padding: "none",
				className: "flex flex-col gap-4 px-6 py-5 max-sm:px-4"
			}),
			children: [
				/* @__PURE__ */ (0, Q.jsxs)("div", {
					"data-responsive-toolbar": "",
					children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
						"data-toolbar-heading": "",
						children: [/* @__PURE__ */ (0, Q.jsx)("h3", {
							className: "text-title-2-medium text-text-primary",
							children: "JAV feed"
						}), /* @__PURE__ */ (0, Q.jsx)("span", {
							className: "text-body-2-regular text-text-secondary",
							children: `${p.length.toLocaleString()} feeds - ${(Number(f.unread) || 0).toLocaleString()} unread`
						})]
					}), /* @__PURE__ */ (0, Q.jsxs)("div", {
						"data-toolbar-actions": "",
						children: [
							/* @__PURE__ */ (0, Q.jsx)(h, {
								onClick: B,
								disabled: e,
								...K(u.busy === "check"),
								children: "Fetch now"
							}),
							/* @__PURE__ */ (0, Q.jsx)(ce, {
								preferences: d,
								label: "JAV feed"
							}),
							/* @__PURE__ */ (0, Q.jsx)(re, {
								label: "JAV feed",
								sorting: O,
								onChange: (e) => {
									k(e), T(1);
								},
								options: [
									"name",
									"kind",
									"origin",
									"status",
									"interval",
									"fetched",
									"fresh"
								].map((e) => ({
									id: e,
									label: Jt[e]
								}))
							})
						]
					})]
				}),
				W.length || u.error ? /* @__PURE__ */ (0, Q.jsxs)("div", {
					className: "flex flex-col gap-3",
					children: [W.length ? /* @__PURE__ */ (0, Q.jsx)(R, {
						tone: "error",
						title: `${W.length.toLocaleString()} ${W.length === 1 ? "feed" : "feeds"} failed to fetch`,
						extra: /* @__PURE__ */ (0, Q.jsx)("ul", {
							className: "flex flex-col gap-0.5 text-body-2-regular",
							children: W.map((e) => /* @__PURE__ */ (0, Q.jsx)("li", {
								className: "min-w-0 truncate",
								title: e.last_error || "",
								children: `${$(e)}: ${Ce(e.last_error || "") || "reason not stated"}`
							}, e.id))
						}),
						children: "These feeds fetched no new entries this round."
					}) : null, u.error ? /* @__PURE__ */ (0, Q.jsx)(ie, { children: u.error }) : null]
				}) : null,
				/* @__PURE__ */ (0, Q.jsxs)(H, {
					visible: U.length > 0,
					label: "Feed bulk actions",
					count: `Selected ${U.length} ${U.length === 1 ? "follow source" : "follow sources"}`,
					children: [
						/* @__PURE__ */ (0, Q.jsx)(h, {
							variant: "secondary",
							size: "small",
							disabled: e,
							...K(M.isPending),
							onClick: () => M.mutate({
								ids: U.map((e) => e.id),
								action: "enabled"
							}),
							children: "Enabled"
						}),
						/* @__PURE__ */ (0, Q.jsx)(h, {
							variant: "secondary",
							size: "small",
							disabled: e,
							...K(M.isPending),
							onClick: () => M.mutate({
								ids: U.map((e) => e.id),
								action: "paused"
							}),
							children: "Paused"
						}),
						/* @__PURE__ */ (0, Q.jsx)(h, {
							variant: "danger",
							size: "small",
							disabled: e,
							...K(M.isPending),
							onClick: () => void rn(U, () => M.mutateAsync({
								ids: U.map((e) => e.id),
								action: "remove"
							})),
							children: "Remove"
						}),
						/* @__PURE__ */ (0, Q.jsx)(h, {
							variant: "ghost",
							size: "small",
							onClick: () => x(/* @__PURE__ */ new Set()),
							children: "Clear selection"
						})
					]
				}),
				p.length ? /* @__PURE__ */ (0, Q.jsx)(b, {
					follow: !0,
					preferences: d,
					onRowClick: (e) => V(Number(e)),
					children: /* @__PURE__ */ (0, Q.jsxs)(se, {
						"aria-label": "JAV feed",
						size: "sm",
						sortDescriptor: O[0] ? {
							column: O[0].id,
							direction: O[0].desc ? "descending" : "ascending"
						} : void 0,
						onSortChange: (e) => z.getColumn(String(e.column))?.toggleSorting(e.direction === "descending"),
						children: [/* @__PURE__ */ (0, Q.jsxs)(l, { children: [z.getHeaderGroups()[0].headers.map((e) => {
							let t = Ae(e.column.columnDef.header, e.getContext());
							return /* @__PURE__ */ (0, Q.jsx)(o, {
								id: e.id,
								isRowHeader: e.column.id === "name",
								allowsSorting: e.column.getCanSort(),
								...d.columnProps(e.id),
								children: ({ sortDirection: n }) => /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [Yt.has(e.column.id) ? /* @__PURE__ */ (0, Q.jsx)(ee, { children: t }) : /* @__PURE__ */ (0, Q.jsxs)("span", {
									className: "flex items-center gap-0.5",
									children: [t, e.column.getCanSort() ? /* @__PURE__ */ (0, Q.jsx)("span", {
										"data-sort-indicator": !0,
										"data-direction": n || void 0,
										children: /* @__PURE__ */ (0, Q.jsx)(te, {})
									}) : null]
								}), /* @__PURE__ */ (0, Q.jsx)(le, {
									preferences: d,
									id: e.id
								})] })
							}, e.id);
						}), /* @__PURE__ */ (0, Q.jsx)(o, {
							id: "remaining-space",
							"aria-label": "Row empty space",
							"data-table-space": "",
							width: d.spaceWidth,
							minWidth: 0
						})] }), /* @__PURE__ */ (0, Q.jsx)(a, { children: z.getRowModel().rows.map((e) => /* @__PURE__ */ (0, Q.jsxs)(s, {
							id: e.id,
							"data-follow-selected": e.getIsSelected() || void 0,
							children: [e.getVisibleCells().map((e) => /* @__PURE__ */ (0, Q.jsx)(c, { children: Ae(e.column.columnDef.cell, e.getContext()) }, e.id)), /* @__PURE__ */ (0, Q.jsx)(c, { "data-table-space": "" })]
						}, e.id)) })]
					})
				}) : /* @__PURE__ */ (0, Q.jsx)(S, {
					icon: _,
					title: "No follow sources yet",
					size: "compact",
					actions: e ? void 0 : /* @__PURE__ */ (0, Q.jsx)(h, {
						variant: "secondary",
						onClick: n,
						children: "Add subscription"
					}),
					children: "Add by performer name under Add follow, or click Subscribe to new releases on a person page."
				}),
				p.length ? /* @__PURE__ */ (0, Q.jsx)(ne, {
					label: "JAV subscriptions",
					total: j.total,
					unit: "follow sources",
					pagination: {
						pageIndex: j.page - 1,
						pageSize: E
					},
					onChange: (e) => {
						D(e.pageSize), T(e.pageIndex + 1);
					}
				}) : null,
				/* @__PURE__ */ (0, Q.jsx)("footer", {
					className: "-mx-6 -mb-5 flex flex-wrap items-center gap-2 border-t border-separator-border rounded-b-2xl bg-card-footer px-6 py-4 max-sm:-mx-4 max-sm:px-4",
					children: /* @__PURE__ */ (0, Q.jsx)("span", {
						role: "status",
						className: "mr-auto text-body-2-regular text-text-secondary",
						children: `Unwatched ${(Number(f.unread) || 0).toLocaleString()} · Enabled ${p.filter((e) => e.enabled).length.toLocaleString()} / ${p.length.toLocaleString()}`
					})
				})
			]
		})
	});
}
// src/react/follow-manage/follow-manage-page.tsx
var on = (e) => D.some(([t]) => t === e);
function sn({ term: e, figure: t, unit: n }) {
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: _e({
			padding: "none",
			className: "flex flex-col gap-3 px-6 py-5 max-sm:gap-2 max-sm:p-4"
		}),
		children: [/* @__PURE__ */ (0, Q.jsx)("span", {
			className: "text-body-medium text-text-secondary",
			children: `${e} `
		}), /* @__PURE__ */ (0, Q.jsxs)("b", {
			"data-follow-reading": "",
			className: `flex min-w-0 flex-wrap items-baseline gap-x-1 tabular-nums text-text-primary ${t >= 1e6 ? "text-headline-medium" : t >= 1e5 ? "text-title-3-medium" : "text-title-1-medium"}`,
			children: [/* @__PURE__ */ (0, Q.jsx)("span", {
				className: "min-w-0 wrap-anywhere",
				children: t.toLocaleString()
			}), /* @__PURE__ */ (0, Q.jsx)("small", {
				className: "whitespace-nowrap text-body-2-regular text-text-secondary",
				children: ` ${n}`
			})]
		})]
	});
}
function cn(e) {
	let { route: t, savePreference: n, toast: r, openFollow: i, readOnly: a, readOnlyMessage: o, writerUrl: s } = e, [c, l] = (0, Z.useState)(on(e.tab) ? e.tab : "list"), [ee, p] = (0, Z.useState)(Math.max(1, Math.floor(e.page) || 1)), [m, h] = (0, Z.useState)(() => Ze(e.sort, e.dir).sort), [_, v] = (0, Z.useState)(() => Ze(e.sort, e.dir).dir), [te, y] = (0, Z.useState)(Ie(e.layout) ? e.layout : "default"), [ne, b] = (0, Z.useState)(Ve(e.pageSize)), [re, x] = (0, Z.useState)(/* @__PURE__ */ new Set()), [S, ie] = (0, Z.useState)(/* @__PURE__ */ new Set()), O = ct({
		queryKey: E,
		queryFn: ({ signal: e }) => De(e)
	}), k = ct({
		queryKey: T,
		queryFn: ({ signal: e }) => Te(e)
	}), A = ct({
		queryKey: w,
		queryFn: ({ signal: e }) => Ee(e)
	}), j = O.data || { sources: [] }, M = k.data || {
		root: "",
		providers: []
	}, N = j.sources;
	(0, Z.useEffect)(() => {
		x((e) => {
			let t = Le(e, N);
			return t.size === e.size ? e : t;
		});
	}, [N]);
	let P = (e) => {
		let n = e.sort ?? m, r = e.dir ?? _;
		t({
			tab: e.tab ?? c,
			page: e.page ?? ee,
			sort: n === "checked" ? "" : n,
			dir: r === B[n] ? "" : r
		});
	}, F = Pe(N), I = N.filter(Fe).length, L = N.filter((e) => e.enabled).length, z = (M.providers || []).filter((e) => e.requirement === "required" && !Se(e)).length, H = new Set((A.data?.sources || []).map((e) => e.entity_id ?? `source-${e.id}`)).size;
	return /* @__PURE__ */ (0, Q.jsxs)(dt, { children: [
		a ? /* @__PURE__ */ (0, Q.jsx)(R, {
			tone: "warning",
			title: "This machine is browse-only",
			extra: s ? /* @__PURE__ */ (0, Q.jsx)("p", {
				className: "text-body-2-regular",
				children: /* @__PURE__ */ (0, Q.jsx)(C, {
					href: s,
					children: "Go to the writer instance to manage follows"
				})
			}) : void 0,
			children: o
		}) : null,
		/* @__PURE__ */ (0, Q.jsxs)("div", {
			className: V,
			"aria-label": "Follow overview",
			children: [
				/* @__PURE__ */ (0, Q.jsx)(sn, {
					term: "Follow creator",
					figure: F.length,
					unit: "people"
				}),
				/* @__PURE__ */ (0, Q.jsx)(sn, {
					term: "Enable the source",
					figure: L,
					unit: `/ ${N.length}`
				}),
				/* @__PURE__ */ (0, Q.jsx)(sn, {
					term: "Check failed",
					figure: I,
					unit: "sources"
				}),
				/* @__PURE__ */ (0, Q.jsx)(sn, {
					term: "Unwatched updates",
					figure: j.counts?.new || 0,
					unit: "items"
				}),
				/* @__PURE__ */ (0, Q.jsx)(sn, {
					term: "JAV subscriptions",
					figure: H,
					unit: "people"
				}),
				/* @__PURE__ */ (0, Q.jsx)(sn, {
					term: "Unwatched new releases",
					figure: A.data?.unread || 0,
					unit: "items"
				})
			]
		}),
		/* @__PURE__ */ (0, Q.jsxs)(f, {
			selectedKey: c,
			onSelectionChange: (e) => {
				let t = String(e);
				on(t) && (x(/* @__PURE__ */ new Set()), ie(/* @__PURE__ */ new Set()), l(t), P({ tab: t }));
			},
			className: "flex flex-col gap-6",
			children: [
				/* @__PURE__ */ (0, Q.jsx)(pt, {
					"aria-label": "Follow management area",
					"data-section-nav": !0,
					"data-section-items": !0,
					className: "flex max-w-full flex-nowrap overflow-x-auto",
					children: D.map(([e, t]) => /* @__PURE__ */ (0, Q.jsx)(d, {
						id: e,
						"data-pill-selected": c === e ? "" : void 0,
						"data-pill-variant": "gray",
						className: "cursor-pointer whitespace-nowrap",
						children: t
					}, e))
				}),
				/* @__PURE__ */ (0, Q.jsxs)(u, {
					id: "list",
					className: "flex flex-col gap-4",
					children: [/* @__PURE__ */ (0, Q.jsx)(an, {
						readOnly: a,
						toast: r,
						onAdd: () => {
							l("add"), P({ tab: "add" });
						},
						selection: {
							ids: S,
							onChange: ie,
							onActivate: () => x(/* @__PURE__ */ new Set())
						}
					}), /* @__PURE__ */ (0, Q.jsx)(gt, {
						data: j,
						sort: m,
						dir: _,
						page: ee,
						layout: te,
						pageSize: ne,
						selected: re,
						readOnly: a,
						toast: r,
						openFollow: i,
						onAdd: () => {
							l("add"), P({ tab: "add" });
						},
						onSort: (e, t) => {
							h(e), v(t), p(1), P({
								sort: e,
								dir: t,
								page: 1
							});
						},
						onPage: (e) => {
							p(e), P({ page: e });
						},
						onSelected: (e) => {
							x(e), ie(/* @__PURE__ */ new Set());
						},
						onLayout: (e) => {
							y(e), p(1), n({ layout: e }), P({ page: 1 });
						},
						onPageSize: (e) => {
							b(e), p(1), n({ pageSize: e }), P({ page: 1 });
						}
					})]
				}),
				/* @__PURE__ */ (0, Q.jsxs)(u, {
					id: "add",
					className: "flex flex-col gap-8",
					children: [
						/* @__PURE__ */ (0, Q.jsx)(Ot, {
							data: j,
							credentials: M,
							readOnly: a,
							toast: r
						}),
						/* @__PURE__ */ (0, Q.jsx)(Nt, {
							readOnly: a,
							toast: r,
							onAdded: () => {
								A.refetch(), l("list"), P({ tab: "list" });
							}
						}),
						/* @__PURE__ */ (0, Q.jsx)(Kt, {
							groups: j.author_aliases || [],
							readOnly: a,
							toast: r,
							suggestions: j.alias_suggestions || [],
							sources: j.sources
						})
					]
				}),
				/* @__PURE__ */ (0, Q.jsx)(u, {
					id: "tags",
					className: "flex flex-col gap-4",
					children: /* @__PURE__ */ (0, Q.jsx)(W, { scope: "online" })
				})
			]
		}),
		/* @__PURE__ */ (0, Q.jsx)("div", { children: /* @__PURE__ */ (0, Q.jsxs)(g, {
			variant: "secondary",
			href: "/settings/subscriptions",
			children: ["Sources and subscription settings", z ? ` (${z})` : ""]
		}) })
	] });
}
export { cn as FollowManagePage };

//# debugId=b192af89-df49-4842-af55-a8b2a8686b05