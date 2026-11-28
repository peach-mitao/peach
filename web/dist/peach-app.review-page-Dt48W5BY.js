(function() {
	try {
		var e = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "12ad85d4-1199-4619-9e60-3299721aa57a", e._sentryDebugIdIdentifier = "sentry-dbid-12ad85d4-1199-4619-9e60-3299721aa57a");
	} catch {}
})();
import { $ea3928288112382f$export$439d29a4e110a164 as e, $fe21c36db05242bb$export$d7b12c4107be0d61 as t, Button as n, ButtonLink as r, Checkbox as i, CheckboxGlyph as a, Chip as o, CollapseChevron as s, CollapseRegion as c, DEFAULT_CATEGORY as l, DataTable as u, DataTableFooter as d, ENTITY_REVIEW_KINDS as ee, Ea as te, EmptyState as f, ExternalLink as ne, FIELDSET_FOOT as re, FilterGlassRows as p, FilterSearch as m, Gg as h, InputBase as g, LEGACY_AVATAR_IMG as _, LinkButton as v, Note as y, REVIEW_CATEGORIES as b, REVIEW_DECISION_LABELS as ie, REVIEW_KEY as x, REVIEW_LABELS as S, REVIEW_QUEUES as C, REVIEW_QUEUE_LABELS as w, RadioDot as T, RadioGroup as E, Select as D, SelectItem as O, SelectionActions as k, SelectionDock as A, SortableBoardTabs as ae, TextField as j, Wt as M, Xf as oe, Yt as se, __toESM as N, apiGet as ce, apiSend as P, avatarInner as le, b1 as F, busyProps as I, canApprove as ue, cardClass as L, codedText as de, commonReviewSources as fe, composingKey as pe, currentReviewRow as me, cx as R, decisionPayload as he, decisionReceipt as ge, defaultChoice as _e, enterPageSelection as ve, errorMessage as z, exitPageSelection as B, fetchReview as ye, filterReviewRows as be, gB as xe, groupReviewRows as Se, isReviewCategory as Ce, joinList as we, l7 as Te, localTime as V, m7 as Ee, mirrorText as De, pendingGenres as H, queryClient as Oe, quoted as U, recordGenre as ke, reloadReview as Ae, require_jsx_runtime as je, require_react as Me, reviewGroupingOptions as Ne, reviewQueueData as Pe, reviewQueueOf as Fe, reviewWindow as Ie, rowEvidence as Le, rowFieldName as W, rowSelectionOperation as Re, rowSubject as G, rowTags as ze, rowTitle as Be, s7 as Ve, selectReviewRange as He, serverLabel as Ue, serverLabelList as We, settleReviewRows as Ge, submitDecision as Ke, t as K, useMutation as qe, useNavigationOrder as Je, useOverlayScrollbar as Ye, usePageSelection as Xe, useQuery as Ze, useRectangleSelection as Qe, useViewGlide as $e, useWorkContextMenu as et } from "./peach-app.js";
import { Page as tt } from "./peach-app.page-QAncjzM1.js";
import { ComparisonText as q } from "./peach-app.comparison-text-CyF--PA8.js";
// src/react/review/auto-landings.ts
var J = /* @__PURE__ */ N(Me(), 1), nt = "/api/review/auto-landings", Y = "/api/review/auto-landings/revert", rt = ["review", "auto-landings"], X = (e) => Ue(e.field_code ?? "", e.field), it = (e) => Ue(e.label_code ?? "", e.label), at = (e) => ce(nt, e), ot = (e) => ce(`${nt}?items=${encodeURIComponent(e.join("\n"))}`), st = (e, t) => P(Y, {
	items: e,
	token: t
}), Z = (e) => e.at === null ? "" : V((/* @__PURE__ */ new Date(e.at * 1e3)).toISOString()), Q = (e) => e.code || e.name || (e.asset_id ? `#${e.asset_id}` : K("manage:autoLandings.unknownVideo")), ct = (e) => e ? U(e) : K("manage:autoLandings.emptyValue"), lt = (e) => e.tags.length ? we(e.tags) : e.value, ut = (e) => e.tags.length ? K("manage:autoLandings.existingTagsKept") : K("manage:autoLandings.previousValue", { value: e.previous.length ? we(e.previous.map(ct)) : K("manage:autoLandings.emptyValue") });
function dt(e) {
	return [
		...e.restores.map((e) => K("manage:autoLandings.previewRestore", {
			video: Q(e),
			field: X(e),
			current: ct(e.current),
			previous: ct(e.previous)
		})),
		...e.tags.map((e) => K("manage:autoLandings.previewRemoveTag", {
			video: Q(e),
			tag: e.tag
		})),
		...e.changed.map((e) => e.gone ? K("manage:autoLandings.previewGone", {
			video: Q(e),
			field: X(e)
		}) : K("manage:autoLandings.previewEdited", {
			video: Q(e),
			field: X(e)
		}))
	];
}
function ft(e) {
	let t = [e.restores.length ? K("manage:autoLandings.previewRestoreCount", { count: e.restores.length }) : "", e.tags.length ? K("manage:autoLandings.previewRemoveTags", { count: e.tags.length }) : ""].filter(Boolean);
	return [
		t.length ? K("manage:autoLandings.previewRevert", {
			count: e.decisions,
			details: t.join(K("shell:format.clauseSeparator"))
		}) : K("manage:autoLandings.previewRevertNothing", { count: e.decisions }),
		e.changed.length ? K("manage:autoLandings.previewUnchanged", { count: e.changed.length }) : "",
		K("manage:autoLandings.revertBackupNote")
	].filter(Boolean).join(K("shell:format.sentenceGap"));
}
function pt(e) {
	let t = [e.restored ? K("manage:autoLandings.resultRestoreCount", { count: e.restored }) : "", e.removed_tags ? K("manage:autoLandings.resultRemovedTags", { count: e.removed_tags }) : ""].filter(Boolean);
	return t.length ? K("manage:autoLandings.resultSummaryDetails", {
		count: e.decisions,
		details: t.join(K("shell:format.clauseSeparator"))
	}) : K("manage:autoLandings.resultSummary", { count: e.decisions });
}
// src/react/review/auto-landings-card.tsx
var $ = je(), mt = K("manage:autoLandings.description");
function ht({ item: t, openItem: n }) {
	let r = t.asset_id && !t.gone ? () => n(t.asset_id) : void 0;
	return /* @__PURE__ */ (0, $.jsxs)("span", {
		className: "flex min-w-0 items-center gap-3",
		children: [/* @__PURE__ */ (0, $.jsxs)("button", {
			type: "button",
			disabled: !r,
			onClick: r,
			className: "flex aspect-card-cover w-16 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-media-placeholder outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring disabled:cursor-default",
			children: [t.preview_url ? /* @__PURE__ */ (0, $.jsx)("img", {
				src: t.preview_url,
				alt: "",
				loading: "lazy",
				className: "size-full object-cover"
			}) : /* @__PURE__ */ (0, $.jsx)("span", {
				className: "text-caption-1-regular text-text-secondary",
				children: K("manage:shared.noCover")
			}), /* @__PURE__ */ (0, $.jsx)(e, { children: K("manage:autoLandings.openVideo", { name: Q(t) }) })]
		}), /* @__PURE__ */ (0, $.jsxs)("span", {
			className: "flex min-w-0 flex-1 flex-col gap-0.5",
			children: [/* @__PURE__ */ (0, $.jsxs)("span", {
				className: "truncate text-body-medium text-text-primary",
				children: [Q(t), t.assets > 1 ? /* @__PURE__ */ (0, $.jsx)("small", {
					className: "ml-1 text-caption-1-regular text-text-secondary",
					children: K("manage:autoLandings.fileCount", { count: t.assets })
				}) : null]
			}), /* @__PURE__ */ (0, $.jsx)("small", {
				title: t.name,
				className: "truncate text-caption-1-regular text-text-secondary",
				children: t.gone ? K("manage:autoLandings.videoGone") : t.name
			})]
		})]
	});
}
function gt({ item: e }) {
	return /* @__PURE__ */ (0, $.jsxs)("span", {
		className: "flex min-w-0 flex-col gap-0.5",
		children: [/* @__PURE__ */ (0, $.jsxs)("span", {
			title: lt(e),
			className: "truncate text-body-regular text-text-primary",
			children: [/* @__PURE__ */ (0, $.jsx)("span", {
				className: "text-text-secondary",
				children: K("shell:format.labelPrefix", { label: X(e) })
			}), lt(e)]
		}), /* @__PURE__ */ (0, $.jsx)("small", {
			title: ut(e),
			className: "truncate text-caption-1-regular text-text-secondary",
			children: ut(e)
		})]
	});
}
function _t({ locked: e, openItem: t, toast: n }) {
	let [r, i] = (0, J.useState)([]), [a, o] = (0, J.useState)(null), s = Ze({
		queryKey: rt,
		queryFn: ({ signal: e }) => at(e)
	}), c = s.data?.items ?? [], l = (e) => {
		let t = null, n = null;
		return {
			key: "revert",
			label: K("manage:autoLandings.revertSelected", { count: e }),
			reversal: "irreversible",
			confirm: async (e) => (t = await ot(e.map((e) => e.item_key)), {
				title: K("manage:autoLandings.revertTitle"),
				body: ft(t),
				items: dt(t),
				confirmLabel: K("manage:shared.revert")
			}),
			run: async () => {
				n = await st(t.items, t.token), o(n), Oe.invalidateQueries({ queryKey: x });
			},
			receipt: () => n ? pt(n) : ""
		};
	}, d = {
		receipt: n,
		failure: (e) => n(z(e))
	};
	if (!c.length && !a && !s.isError) return null;
	let ee = [
		{
			id: "work",
			label: K("manage:shared.video"),
			width: 300,
			min: 240,
			value: (e) => Q(e),
			render: (e) => /* @__PURE__ */ (0, $.jsx)(ht, {
				item: e,
				openItem: t
			})
		},
		{
			id: "written",
			label: K("manage:autoLandings.columnWritten"),
			width: 320,
			min: 220,
			value: (e) => `${X(e)}${lt(e)}`,
			filter: { values: X },
			render: (e) => /* @__PURE__ */ (0, $.jsx)(gt, { item: e })
		},
		{
			id: "rule",
			label: K("manage:autoLandings.columnRule"),
			width: 142,
			min: 100,
			value: it,
			filter: { values: it },
			render: (e) => /* @__PURE__ */ (0, $.jsx)("span", {
				title: it(e),
				className: "block truncate text-body-2-regular text-text-secondary",
				children: it(e)
			})
		},
		{
			id: "at",
			label: K("manage:autoLandings.columnTime"),
			width: 152,
			min: 132,
			value: (e) => e.at ?? 0,
			filter: {
				range: "timestamp",
				value: (e) => e.at
			},
			render: (e) => /* @__PURE__ */ (0, $.jsx)("span", {
				title: e.batch,
				className: "whitespace-nowrap tabular-nums text-caption-1-regular text-text-secondary",
				children: Z(e) || K("manage:autoLandings.timeUnknown")
			})
		}
	];
	return /* @__PURE__ */ (0, $.jsxs)("section", {
		"aria-labelledby": "auto-landings-title",
		className: "flex flex-col gap-4",
		children: [a ? /* @__PURE__ */ (0, $.jsxs)(y, {
			tone: "success",
			title: pt(a),
			children: [/* @__PURE__ */ (0, $.jsx)("p", {
				className: "text-body-2-regular",
				children: K("manage:autoLandings.backupDone", { path: a.backup })
			}), a.changed.length ? /* @__PURE__ */ (0, $.jsxs)("p", {
				className: "flex flex-wrap items-center gap-x-2 gap-y-1 text-body-2-regular",
				children: [K("manage:autoLandings.leftUnchanged", { count: a.changed.length }), a.changed.map((e) => e.gone ? /* @__PURE__ */ (0, $.jsx)("span", {
					className: "text-text-secondary",
					children: K("manage:autoLandings.deletedAsset", { id: e.asset_id })
				}, `${e.asset_id}:${e.field}`) : /* @__PURE__ */ (0, $.jsx)(v, {
					size: "small",
					onClick: () => t(e.asset_id),
					children: Q(e)
				}, `${e.asset_id}:${e.field}`))]
			}) : null]
		}) : null, s.isError ? /* @__PURE__ */ (0, $.jsx)(y, {
			tone: "error",
			title: K("manage:autoLandings.loadFailed"),
			children: z(s.error)
		}) : c.length ? /* @__PURE__ */ (0, $.jsx)(u, {
			preferenceId: "auto-landings",
			label: K("manage:autoLandings.title"),
			items: c,
			columns: ee,
			title: K("manage:autoLandings.title"),
			titleId: "auto-landings-title",
			unit: K("manage:autoLandings.unit"),
			description: mt,
			rowId: (e) => e.item_key,
			rowLabel: (e) => `${Q(e)} ${X(e)}`,
			selected: r,
			onSelected: i,
			contextOperations: ({ asset_id: e, gone: n }) => e && !n ? [{
				id: "open",
				label: K("catalog:mediaActions.open"),
				icon: h,
				run: () => t(e)
			}] : [],
			actions: (t, n) => [{
				action: l(t.length),
				items: t,
				host: d,
				disabled: e,
				done: n,
				rowAction: {
					label: K("manage:shared.revert"),
					icon: F
				}
			}]
		}) : null]
	});
}
// src/react/review/bulk-toolbar.tsx
function vt(e) {
	let { groupOptions: t, groupBy: r, onGroupBy: i, groups: a, filter: o, onFilter: s, pageKeys: c, allKeys: l = c, selected: u, onSelected: d, selectedRows: ee, metadata: te, busy: f, feedback: ne, onUnifySource: re, actions: h, queueView: g = "pending", queueCounts: _, onQueueChange: v, locked: y, fields: b, fieldFilter: ie, onFieldFilter: x, search: S = "", onSearch: T } = e, E = c.length > 0 || !!T && !!S, k = c.filter((e) => u.has(e)), ae = k.length > 0 && k.length === c.length, j = l.length > c.length && l.every((e) => u.has(e)), M = fe(ee), oe = te && ee.some((e) => (e.candidates?.length || 0) > 1), se = M.length ? K("manage:reviewToolbar.sourceForAll") : K("manage:reviewToolbar.noCommonSource"), N = (0, J.useRef)(null), ce = (0, J.useRef)(null), P = (0, J.useRef)(null), [le, F] = (0, J.useState)(!1), I = $e(N, ce, "[data-entity-state][aria-pressed=\"true\"]", g);
	return (0, J.useLayoutEffect)(() => {
		let e = ce.current, t = P.current, n = e?.parentElement, r = e?.closest("[data-review-filter]");
		if (!e || !t || !n || !r) return;
		let i = () => F(t.offsetHeight > 0 && Math.abs(n.getBoundingClientRect().top - t.getBoundingClientRect().top) < 1), a = new ResizeObserver(i);
		for (let n of [
			r,
			e,
			t
		]) a.observe(n);
		return i(), () => a.disconnect();
	}, []), /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)(p, {
		label: K("manage:reviewToolbar.filters"),
		topLabel: K("manage:reviewToolbar.processingStatus"),
		attrs: { "data-review-filter": "" },
		className: "mb-0 flex-row flex-wrap",
		topClassName: "max-w-full flex-none",
		bottomClassName: E ? "min-h-12 max-w-full flex-none [&>*]:shrink-0" : "hidden",
		bottomRef: P,
		panes: /* @__PURE__ */ (0, $.jsx)("span", {
			ref: N,
			"data-view-glide": "",
			"aria-hidden": "true"
		}),
		top: /* @__PURE__ */ (0, $.jsxs)("div", {
			ref: ce,
			role: "group",
			"aria-label": K("manage:reviewToolbar.reviewStatus"),
			"data-entity-states": "",
			onPointerLeave: I.leave,
			children: [C.map((e) => /* @__PURE__ */ (0, $.jsxs)("button", {
				type: "button",
				"data-entity-state": e,
				"data-entity-press": "",
				disabled: f,
				"aria-pressed": g === e,
				onPointerEnter: I.hover,
				onClick: () => {
					e !== g && v(e);
				},
				children: [
					/* @__PURE__ */ (0, $.jsx)("span", {
						"data-copy-key": `review.queue.${e}`,
						children: w[e]
					}),
					" ",
					/* @__PURE__ */ (0, $.jsx)("span", {
						className: "ms-1.5 tabular-nums text-caption-1-medium text-text-secondary",
						children: _ ? _[e].toLocaleString() : /* @__PURE__ */ (0, $.jsx)("span", {
							className: "skeleton-sheen inline-block h-3.5 w-4 rounded-md align-middle",
							"aria-hidden": !0
						})
					})
				]
			}, e)), /* @__PURE__ */ (0, $.jsx)("span", {
				"data-entity-sep": "",
				"aria-hidden": "true",
				className: le ? void 0 : "invisible"
			})]
		}),
		bottom: E ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [T ? /* @__PURE__ */ (0, $.jsx)(m, {
			compact: !0,
			label: K("manage:reviewPage.search"),
			value: S,
			onQuery: T
		}) : null, c.length ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
			te && b.length ? /* @__PURE__ */ (0, $.jsxs)(D, {
				"aria-label": K("manage:reviewToolbar.filterField"),
				size: "sm",
				prefix: /* @__PURE__ */ (0, $.jsx)("span", {
					"data-copy-key": "review.filter.field",
					className: "pointer-events-auto",
					children: K("manage:reviewToolbar.field")
				}),
				selectedKey: ie || "*",
				isDisabled: f,
				onSelectionChange: (e) => {
					e !== null && x(String(e) === "*" ? "" : String(e));
				},
				children: [/* @__PURE__ */ (0, $.jsx)(O, {
					id: "*",
					children: K("manage:shared.all")
				}), b.map((e) => /* @__PURE__ */ (0, $.jsx)(O, {
					id: e.key,
					children: `${e.title} · ${e.rows.length}`
				}, e.key))]
			}) : null,
			/* @__PURE__ */ (0, $.jsx)(D, {
				"aria-label": K("manage:reviewToolbar.groupBy"),
				size: "sm",
				selectedKey: r,
				onSelectionChange: (e) => {
					e !== null && i(String(e));
				},
				children: t.map(([e, t]) => /* @__PURE__ */ (0, $.jsx)(O, {
					id: e,
					children: t
				}, e))
			}),
			a.length > 1 ? /* @__PURE__ */ (0, $.jsxs)(D, {
				"aria-label": K(r === "field" ? "manage:reviewToolbar.filterFieldGroup" : "manage:reviewToolbar.filterGroup"),
				size: "sm",
				prefix: K("manage:reviewToolbar.group"),
				selectedKey: o || "*",
				onSelectionChange: (e) => {
					e !== null && s(String(e) === "*" ? "" : String(e));
				},
				children: [/* @__PURE__ */ (0, $.jsx)(O, {
					id: "*",
					children: K("manage:shared.all")
				}), a.map((e) => /* @__PURE__ */ (0, $.jsx)(O, {
					id: e.key,
					children: `${e.title} · ${e.rows.length}`
				}, e.key))]
			}) : null,
			y ? null : /* @__PURE__ */ (0, $.jsx)(n, {
				variant: "secondary",
				size: "small",
				leadingIcon: Te,
				"aria-pressed": ae,
				disabled: f,
				onClick: () => {
					let e = new Set(u);
					for (let t of c) ae ? e.delete(t) : e.add(t);
					d(e);
				},
				children: K(ae ? "manage:reviewToolbar.clearSelection" : o ? "manage:reviewToolbar.selectGroup" : "manage:reviewToolbar.selectPage")
			}),
			y || l.length <= c.length || j ? null : /* @__PURE__ */ (0, $.jsx)(n, {
				variant: "secondary",
				size: "small",
				disabled: f,
				onClick: () => d(/* @__PURE__ */ new Set([...u, ...l])),
				children: K("manage:reviewToolbar.selectAll", { count: l.length })
			})
		] }) : null] }) : null
	}), /* @__PURE__ */ (0, $.jsxs)(A, {
		label: K("manage:reviewToolbar.selectedDock"),
		visible: !y && u.size > 0,
		count: K("manage:reviewToolbar.selectedCount", { count: u.size }),
		actions: h,
		leading: oe && g !== "ignored" ? /* @__PURE__ */ (0, $.jsxs)(D, {
			"aria-label": K("manage:reviewToolbar.sourceForAll"),
			size: "sm",
			selectedKey: "",
			isDisabled: f || !M.length,
			onSelectionChange: (e) => {
				e !== null && e !== "" && re(String(e));
			},
			children: [/* @__PURE__ */ (0, $.jsx)(O, {
				id: "",
				children: se
			}), M.map((e) => /* @__PURE__ */ (0, $.jsx)(O, {
				id: e,
				children: e
			}, e))]
		}) : null,
		children: [/* @__PURE__ */ (0, $.jsx)(n, {
			variant: "ghost",
			size: "small",
			disabled: f,
			onClick: B,
			children: K("manage:reviewToolbar.deselect")
		}), ne ? /* @__PURE__ */ (0, $.jsx)("p", {
			role: "status",
			className: "w-full text-body-2-regular text-text-secondary",
			children: ne
		}) : null]
	})] });
}
// src/react/boardui/components/base/radio/radio-card.tsx
function yt({ className: e, title: n, description: r, ref: i, ...a }) {
	return /* @__PURE__ */ (0, $.jsx)(t, {
		ref: i,
		...a,
		className: (t) => R("group flex w-full items-center justify-between gap-3 rounded-2lg border border-border-button-default py-3 pe-5 ps-4 select-none", "transition-colors duration-150 ease", t.isHovered && !t.isDisabled ? "bg-background-primary-hover" : "bg-background-primary-default", t.isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer", typeof e == "function" ? e(t) : e),
		children: (e) => /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsxs)("span", {
			className: "flex min-w-0 flex-col gap-0.5",
			children: [/* @__PURE__ */ (0, $.jsx)("span", {
				className: "truncate text-body-medium text-text-primary",
				children: n
			}), r != null && /* @__PURE__ */ (0, $.jsx)("span", {
				className: "truncate text-body-regular text-text-secondary",
				children: r
			})]
		}), /* @__PURE__ */ (0, $.jsx)("span", {
			className: "flex shrink-0 items-center py-1",
			children: /* @__PURE__ */ (0, $.jsx)(T, {
				size: "md",
				selected: e.isSelected,
				focusVisible: e.isFocusVisible
			})
		})] })
	});
}
// src/react/review/candidate-form.tsx
var bt = {
	title: K("manage:shared.title"),
	original_title: K("manage:reviewCandidate.originalTitle"),
	runtime: K("manage:reviewCandidate.sourceRuntime"),
	director: K("manage:reviewCandidate.director"),
	label: "Label",
	poster_url: K("manage:reviewCandidate.poster"),
	cover_url: K("manage:shared.cover"),
	screenshot_urls: K("manage:reviewCandidate.screenshots"),
	trailer_url: K("manage:reviewCandidate.trailer")
}, xt = "reviewgenretags";
function St({ tags: e }) {
	return e.length ? /* @__PURE__ */ (0, $.jsx)("datalist", {
		id: xt,
		children: e.map((e) => /* @__PURE__ */ (0, $.jsx)("option", { value: e }, e))
	}) : null;
}
function Ct({ candidate: e, row: t }) {
	let [r, i] = (0, J.useState)(!1), a = (0, J.useId)(), o = Object.entries(e.catalog_evidence || {}).filter(([, e]) => e && e.display_value);
	return o.length ? /* @__PURE__ */ (0, $.jsxs)("div", {
		className: "min-w-0",
		children: [/* @__PURE__ */ (0, $.jsxs)(n, {
			variant: "secondary",
			size: "small",
			leadingIcon: s,
			"aria-expanded": r,
			"aria-controls": a,
			"aria-label": K(r ? "manage:reviewCandidate.collapseEvidence" : "manage:reviewCandidate.expandEvidence", { source: e.source || K("manage:reviewCandidate.thisSource") }),
			onClick: () => i(!r),
			children: [/* @__PURE__ */ (0, $.jsx)("span", {
				"data-copy-key": "review.card.source_evidence",
				children: K("manage:reviewCandidate.sourceEvidence")
			}), ` · ${o.length}`]
		}), /* @__PURE__ */ (0, $.jsx)(c, {
			id: a,
			open: r,
			children: /* @__PURE__ */ (0, $.jsx)("dl", {
				className: "flex min-w-0 flex-col gap-2 px-3 pt-2 pb-1",
				children: o.map(([n, r]) => /* @__PURE__ */ (0, $.jsxs)("div", {
					className: "flex min-w-0 flex-wrap gap-x-2",
					children: [
						/* @__PURE__ */ (0, $.jsx)("dt", {
							className: "text-caption-1-regular text-text-tertiary",
							children: bt[n] || n
						}),
						/* @__PURE__ */ (0, $.jsx)("dd", {
							className: "min-w-0 text-body-2-regular break-words text-text-primary",
							children: /* @__PURE__ */ (0, $.jsx)(q, {
								value: de(r, "display_value"),
								reference: n === t.field && t.current_value ? t.current_value : de(t.candidates?.find((t) => t.candidate_key !== e.candidate_key && t.catalog_evidence?.[n]?.display_value)?.catalog_evidence?.[n], "display_value")
							})
						}),
						We(r.warnings, r.warning_codes, r.warning_params).map((e) => /* @__PURE__ */ (0, $.jsx)("small", {
							className: "w-full text-caption-1-regular text-status-yellow-text",
							children: e
						}, e))
					]
				}, n))
			})
		})]
	}) : null;
}
function wt(e) {
	let t = e.content_id || e.provider_id;
	return `${e.source || K("manage:reviewQueue.unspecifiedSource")}${e.official ? ` · ${K("manage:reviewCandidate.officialFirst")}` : ""}${t ? ` · ID ${t}` : ""}`;
}
function Tt({ candidate: e, reference: t }) {
	return /* @__PURE__ */ (0, $.jsxs)("span", {
		className: "flex min-w-0 flex-col gap-2 whitespace-normal wrap-anywhere",
		children: [/* @__PURE__ */ (0, $.jsx)("span", {
			className: "text-body-regular text-text-primary",
			children: /* @__PURE__ */ (0, $.jsx)(q, {
				value: e.display_value || "",
				reference: t
			})
		}), We(e.warnings, e.warning_codes, e.warning_params).map((e) => /* @__PURE__ */ (0, $.jsx)("span", {
			className: "text-body-2-regular text-status-yellow-text",
			children: e
		}, e))]
	});
}
function Et({ row: e, fieldName: t, value: n, onChange: r, locked: i }) {
	let a = e.candidates || [];
	return a.length ? a.length === 1 ? /* @__PURE__ */ (0, $.jsxs)("div", {
		className: "flex min-w-0 flex-col gap-2",
		children: [/* @__PURE__ */ (0, $.jsxs)("div", {
			className: "flex min-w-0 flex-col gap-2 rounded-2lg bg-background-primary-default px-4 py-3",
			children: [/* @__PURE__ */ (0, $.jsx)("p", {
				className: "text-body-medium text-text-primary",
				children: wt(a[0])
			}), /* @__PURE__ */ (0, $.jsx)(Tt, {
				candidate: a[0],
				reference: e.current_value || void 0
			})]
		}), /* @__PURE__ */ (0, $.jsx)(Ct, {
			candidate: a[0],
			row: e
		})]
	}) : /* @__PURE__ */ (0, $.jsx)(E, {
		"aria-label": K("manage:reviewCandidate.sourceFor", { field: t || K("manage:scanFetch.slowWhatMetadata") }),
		value: n,
		isDisabled: i,
		onChange: r,
		children: /* @__PURE__ */ (0, $.jsx)("div", {
			className: "flex min-w-0 flex-col gap-3",
			children: a.map((t) => /* @__PURE__ */ (0, $.jsxs)("div", {
				className: "flex min-w-0 flex-col gap-1",
				children: [/* @__PURE__ */ (0, $.jsx)(yt, {
					value: t.candidate_key,
					className: "relative items-start",
					title: /* @__PURE__ */ (0, $.jsx)("span", {
						title: wt(t),
						children: wt(t)
					}),
					description: /* @__PURE__ */ (0, $.jsx)(Tt, {
						candidate: t,
						reference: e.current_value || a.find((e) => e.candidate_key !== t.candidate_key)?.display_value
					})
				}), /* @__PURE__ */ (0, $.jsx)(Ct, {
					candidate: t,
					row: e
				})]
			}, t.candidate_key))
		})
	}) : null;
}
function Dt({ genre: e, tags: t, locked: r, toast: i }) {
	let [a, o] = (0, J.useState)(""), [s, c] = (0, J.useState)(""), l = qe({
		mutationFn: (t) => ke(e, t),
		onSuccess: async (t, n) => {
			t.ok ? (i(n ? K("manage:reviewCandidate.mapped", {
				genre: e,
				tag: n
			}) : K("manage:reviewCandidate.markedNonContent", { genre: e })), await Ae()) : c(t.error || K("manage:reviewCandidate.mapRejected"));
		},
		onError: (e) => c(z(e))
	}), u = () => {
		let e = a.trim();
		e ? (c(""), l.mutate(e)) : c(K("manage:reviewCandidate.tagRequired"));
	};
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		className: "flex flex-wrap items-center gap-2",
		children: [
			/* @__PURE__ */ (0, $.jsx)("b", {
				lang: "ja",
				className: "text-body-medium text-text-primary",
				children: e
			}),
			/* @__PURE__ */ (0, $.jsx)(j, {
				"aria-label": K("manage:reviewCandidate.tagFor", { genre: e }),
				value: a,
				onChange: o,
				maxLength: 40,
				isDisabled: r || l.isPending,
				className: "min-w-40 flex-1",
				children: /* @__PURE__ */ (0, $.jsx)(g, {
					size: "small",
					list: t.length ? xt : void 0,
					autoComplete: "off",
					placeholder: K("manage:reviewCandidate.tagPlaceholder"),
					onKeyDown: (e) => {
						e.key !== "Enter" || pe(e.nativeEvent) || (e.preventDefault(), u());
					}
				})
			}),
			/* @__PURE__ */ (0, $.jsx)(n, {
				variant: "secondary",
				size: "small",
				disabled: r || l.isPending,
				onClick: u,
				children: K("manage:reviewCandidate.map")
			}),
			/* @__PURE__ */ (0, $.jsx)(n, {
				variant: "secondary",
				size: "small",
				disabled: r || l.isPending,
				onClick: () => {
					c(""), l.mutate("");
				},
				children: K("manage:reviewCandidate.notContent")
			}),
			s ? /* @__PURE__ */ (0, $.jsx)("p", {
				role: "status",
				className: "w-full text-body-2-regular text-text-error-primary",
				children: s
			}) : null
		]
	});
}
function Ot({ row: e, tags: t, locked: n, toast: r }) {
	let i = H(e);
	return i.length ? /* @__PURE__ */ (0, $.jsxs)("div", {
		role: "group",
		"aria-label": K("manage:reviewCandidate.unmappedGenres"),
		className: "flex flex-col gap-2 border-t border-separator-border pt-4",
		children: [/* @__PURE__ */ (0, $.jsx)("h5", {
			className: "text-body-2-medium text-text-secondary",
			children: K("manage:reviewCandidate.unmappedGenresCount", { count: i.length })
		}), /* @__PURE__ */ (0, $.jsx)("div", {
			role: "list",
			className: "flex flex-col",
			children: i.map((e, i) => /* @__PURE__ */ (0, $.jsx)("div", {
				role: "listitem",
				className: `py-3 first:pt-0 last:pb-0 ${i ? "border-t border-separator-border" : ""}`,
				children: /* @__PURE__ */ (0, $.jsx)(Dt, {
					genre: e,
					tags: t,
					locked: n,
					toast: r
				})
			}, e))
		})]
	}) : null;
}
// src/react/review/review-evidence.tsx
var kt = (e = "") => /^https?:\/\//i.test(e) ? e : "", At = (e = "") => kt(e) || (e.startsWith("/") && !e.startsWith("//") ? e : "");
function jt({ url: e }) {
	let t = At(e || "");
	return /* @__PURE__ */ (0, $.jsx)(Mt, { source: t }, t);
}
function Mt({ source: e }) {
	let [t, r] = (0, J.useState)("idle");
	return (0, J.useEffect)(() => {
		if (t !== "loading") return;
		let e = setTimeout(() => r("failed"), 3e4);
		return () => clearTimeout(e);
	}, [t]), /* @__PURE__ */ (0, $.jsxs)("div", {
		className: "relative flex h-review-image items-center justify-center overflow-hidden rounded-surface bg-background-secondary-default",
		children: [t === "loading" ? /* @__PURE__ */ (0, $.jsx)("span", {
			role: "status",
			"aria-busy": "true",
			"aria-label": K("manage:reviewEvidence.loadingImage"),
			"data-skeleton": "",
			className: "absolute inset-0 skeleton-sheen"
		}) : null, e && (t === "loading" || t === "ready") ? /* @__PURE__ */ (0, $.jsx)("img", {
			src: e,
			alt: K("manage:reviewEvidence.candidateImageAlt"),
			referrerPolicy: "no-referrer",
			decoding: "async",
			className: `size-full object-contain ${t === "loading" ? "invisible" : ""}`,
			onLoad: () => r("ready"),
			onError: () => r("failed")
		}) : e ? /* @__PURE__ */ (0, $.jsxs)("div", {
			className: "flex flex-col items-center gap-2",
			children: [t === "failed" ? /* @__PURE__ */ (0, $.jsx)("span", {
				className: "text-body-2-regular text-text-secondary",
				children: K("manage:reviewEvidence.imageNotFound")
			}) : null, /* @__PURE__ */ (0, $.jsx)(n, {
				variant: "secondary",
				size: "small",
				"aria-label": t === "failed" ? K("manage:reviewEvidence.retryImage") : void 0,
				onClick: () => r("loading"),
				children: K(t === "failed" ? "manage:shared.retryNow" : "manage:reviewEvidence.viewImage")
			})]
		}) : /* @__PURE__ */ (0, $.jsx)("span", {
			className: "text-body-2-regular text-text-secondary",
			children: K("manage:reviewEvidence.imageNotFound")
		})]
	});
}
function Nt({ asset: t, openItem: r }) {
	let i = t.name || "";
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		className: "flex min-w-0 items-center gap-3",
		children: [/* @__PURE__ */ (0, $.jsxs)("button", {
			type: "button",
			onClick: () => r(t.id),
			className: "flex aspect-card-cover w-20 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-2lg bg-media-placeholder outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring",
			children: [t.preview_url ? /* @__PURE__ */ (0, $.jsx)("img", {
				src: t.preview_url,
				alt: "",
				loading: "lazy",
				className: "size-full object-cover"
			}) : /* @__PURE__ */ (0, $.jsx)("span", {
				className: "text-caption-1-regular text-text-secondary",
				children: K("manage:shared.noCover")
			}), /* @__PURE__ */ (0, $.jsx)(e, { children: K("manage:reviewEvidence.openOriginalNamed", { name: i }) })]
		}), /* @__PURE__ */ (0, $.jsxs)("div", {
			className: "flex min-w-0 flex-col items-start gap-1",
			children: [/* @__PURE__ */ (0, $.jsx)("b", {
				title: i,
				className: "w-full truncate text-body-medium text-text-primary",
				children: t.code || i || K("manage:reviewEvidence.originalVideo")
			}), /* @__PURE__ */ (0, $.jsx)(n, {
				variant: "secondary",
				size: "small",
				leadingIcon: h,
				onClick: () => r(t.id),
				children: K("manage:reviewEvidence.openOriginal")
			})]
		})]
	});
}
function Pt({ kind: e, name: t, works: n, avatar: r, openEntity: i }) {
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		className: "flex min-w-0 items-center gap-3",
		children: [/* @__PURE__ */ (0, $.jsx)("button", {
			type: "button",
			"aria-label": K("manage:reviewEvidence.openCreator", { name: t }),
			onClick: () => i(e, t),
			className: `relative inline-grid size-11 shrink-0 cursor-pointer place-items-center overflow-hidden rounded-full bg-media-placeholder text-caption-1-medium text-text-secondary outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring ${_}`,
			dangerouslySetInnerHTML: { __html: r }
		}), /* @__PURE__ */ (0, $.jsxs)("div", {
			className: "flex min-w-0 flex-col items-start",
			children: [/* @__PURE__ */ (0, $.jsx)("button", {
				type: "button",
				onClick: () => i(e, t),
				"data-inline-action": "",
				className: "max-w-full cursor-pointer truncate text-body-medium text-text-primary",
				children: t
			}), n ? /* @__PURE__ */ (0, $.jsx)("small", {
				className: "tabular-nums text-body-2-regular text-text-secondary",
				children: K("manage:reviewEvidence.videoCount", { count: n })
			}) : null]
		})]
	});
}
function Ft({ row: e, openItem: t, openEntity: i, onReveal: a, revealing: o, note: s }) {
	let c = kt(e.profile_url || ""), l = (e.preview_assets || []).slice(0, 6), u = Math.max(0, Number(e.video_count || e.videos || 0));
	return /* @__PURE__ */ (0, $.jsxs)("section", {
		className: "flex flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, $.jsx)("h5", {
				className: "text-body-medium text-text-primary",
				children: K("manage:reviewEvidence.pendingPerson", { name: e.babepedia_name || K("manage:reviewEvidence.unlabeled") })
			}),
			/* @__PURE__ */ (0, $.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [c ? /* @__PURE__ */ (0, $.jsx)(r, {
					"data-button-link": "",
					variant: "secondary",
					size: "small",
					trailingIcon: M,
					href: c,
					target: "_blank",
					rel: "noopener noreferrer",
					children: /* @__PURE__ */ (0, $.jsx)("span", {
						"data-external-link-label": "",
						children: K("manage:reviewEvidence.sourceProfile")
					})
				}) : null, /* @__PURE__ */ (0, $.jsx)(n, {
					variant: "secondary",
					size: "small",
					onClick: () => i("creator", e.creator || ""),
					children: K("manage:reviewEvidence.viewAllVideos", { count: u })
				})]
			}),
			/* @__PURE__ */ (0, $.jsx)(jt, { url: e.preview_url }),
			l.length ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)("h5", {
				className: "text-body-medium text-text-primary",
				children: K("manage:reviewEvidence.localSamples")
			}), /* @__PURE__ */ (0, $.jsx)("ul", {
				className: "flex flex-col gap-1",
				children: l.map((e) => /* @__PURE__ */ (0, $.jsxs)("li", {
					className: "flex min-w-0 items-center gap-2",
					children: [/* @__PURE__ */ (0, $.jsx)(n, {
						variant: "ghost",
						size: "small",
						className: "min-w-0",
						onClick: () => t(e.id),
						children: /* @__PURE__ */ (0, $.jsx)("span", {
							title: e.name,
							className: "block max-w-full truncate",
							children: e.name
						})
					}), /* @__PURE__ */ (0, $.jsx)(n, {
						variant: "ghost",
						size: "small",
						"aria-label": K("manage:reviewEvidence.revealNamed", { name: e.name }),
						...I(o === e.id),
						onClick: () => a(e.id),
						children: K("manage:reviewEvidence.fileLocation")
					})]
				}, e.id))
			})] }) : /* @__PURE__ */ (0, $.jsx)("p", {
				className: "text-body-2-regular text-text-secondary",
				children: K("manage:reviewEvidence.noLocalSamples")
			}),
			s ? /* @__PURE__ */ (0, $.jsx)("p", {
				role: "status",
				className: "text-body-2-regular text-text-error-primary",
				children: s
			}) : null
		]
	});
}
function It({ assets: t, picked: n, onPicked: r, locked: i }) {
	let [o, s] = (0, J.useState)(null), c = new Set(n), l = (e, n) => {
		if (i) return;
		let a = new Set(c);
		if (n && o !== null) {
			let [n, r] = [Math.min(o, e), Math.max(o, e)];
			for (let e = n; e <= r; e++) a.add(t[e].id);
		} else {
			let n = t[e].id;
			a.has(n) ? a.delete(n) : a.add(n);
		}
		s(e), r(t.filter((e) => a.has(e.id)).map((e) => e.id));
	};
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		className: "flex flex-col gap-2",
		children: [/* @__PURE__ */ (0, $.jsx)(k, {
			prefix: /* @__PURE__ */ (0, $.jsx)("span", {
				className: "tabular-nums text-body-2-regular text-text-secondary",
				children: K("manage:reviewEvidence.selectedOfTotal", {
					count: c.size,
					total: t.length
				})
			}),
			actions: [{
				label: K("manage:shared.selectAll"),
				disabled: i,
				onPress: () => r(t.map((e) => e.id))
			}, {
				label: K("manage:reviewEvidence.clearSelection"),
				disabled: i,
				onPress: () => r([])
			}]
		}), /* @__PURE__ */ (0, $.jsx)("div", {
			className: "review-asset-grid gap-1.5",
			children: t.map((t, n) => {
				let r = c.has(t.id);
				return /* @__PURE__ */ (0, $.jsxs)("button", {
					type: "button",
					"aria-pressed": r,
					title: t.name,
					onClick: (e) => l(n, e.shiftKey),
					className: `relative aspect-card-cover cursor-pointer overflow-hidden rounded-surface bg-media-placeholder outline-none transition-opacity focus-visible:ring-2 focus-visible:ring-border-focus-ring ${r ? "opacity-100 ring-2 ring-border-button-active ring-inset" : "opacity-50"}`,
					children: [
						/* @__PURE__ */ (0, $.jsx)("img", {
							src: `/poster?id=${t.id}&c=4`,
							alt: "",
							loading: "lazy",
							className: "size-full object-cover"
						}),
						/* @__PURE__ */ (0, $.jsx)("span", {
							className: "absolute top-1 right-1",
							children: /* @__PURE__ */ (0, $.jsx)(a, {
								size: "sm",
								state: {
									isSelected: r,
									isIndeterminate: !1,
									isFocusVisible: !1,
									isDisabled: i,
									isHovered: !1
								}
							})
						}),
						/* @__PURE__ */ (0, $.jsx)(e, { children: K(r ? "manage:reviewEvidence.assetSelected" : "manage:reviewEvidence.assetUnselected", { name: t.name || t.id }) })
					]
				}, t.id);
			})
		})]
	});
}
// src/react/review/review-card.tsx
var Lt = L({
	variant: "filled",
	padding: "none",
	className: "flex flex-col overflow-hidden"
}), Rt = "flex min-h-6 min-w-0 items-center", zt = 2, Bt = (e) => e === "western_identity" ? "h-review-card-tall" : "h-review-card";
function Vt(e) {
	let { category: t, row: r, choice: a, onChoice: s, selected: c, onSelect: l, locked: u, busy: d, problem: ne, genreTags: p, onDecide: m, handlers: g, queueView: _ = "pending" } = e, v = (0, J.useRef)(!1), y = Ye(), b = t === "metadata_fields", x = ee[t] || "", S = String(r.creator || "").trim(), C = !!x && !!S, w = Be(t, r), T = W(t, r), E = G(t, r), D = Le(r), O = ze(r), k = ue(t, r), A = r.comparison_assets || [], ae = r.preview_assets || [], j = ie[r.decision || ""], M = A.length > 1 ? /* @__PURE__ */ (0, $.jsxs)("div", {
		className: "flex flex-col gap-3",
		children: [A.slice(0, zt).map((e) => /* @__PURE__ */ (0, $.jsx)(Nt, {
			asset: e,
			openItem: g.openItem
		}, e.id)), A.length > zt ? /* @__PURE__ */ (0, $.jsx)("p", {
			className: "text-body-2-regular text-text-secondary",
			children: K("manage:reviewCard.moreComparison", { count: A.length - zt })
		}) : null]
	}) : C ? /* @__PURE__ */ (0, $.jsx)(Pt, {
		kind: x,
		name: S,
		works: Number(r.video_count || r.videos || 0),
		openEntity: g.openEntity,
		avatar: le(S, r.entity_id ? {
			id: r.entity_id,
			has_image: !!r.has_image,
			image_version: r.image_version,
			avatar_focus: r.avatar_focus
		} : null, null, x)
	}) : r.asset_id ? /* @__PURE__ */ (0, $.jsx)(Nt, {
		openItem: g.openItem,
		asset: {
			id: r.asset_id,
			name: r.asset_name,
			code: r.code,
			preview_url: r.asset_preview_url
		}
	}) : null, N = b ? /* @__PURE__ */ (0, $.jsx)(Et, {
		row: r,
		fieldName: T,
		value: a.candidateKey,
		onChange: (e) => s({
			...a,
			candidateKey: e
		}),
		locked: u
	}) : t === "creator_tags" ? ae.length ? /* @__PURE__ */ (0, $.jsx)(It, {
		assets: ae,
		picked: a.assets,
		locked: u,
		onPicked: (e) => s({
			...a,
			assets: e
		})
	}) : /* @__PURE__ */ (0, $.jsx)(f, {
		size: "compact",
		icon: te,
		title: K("manage:reviewCard.noFramesTitle"),
		children: r.video_count ? K("manage:reviewCard.noFramesBody", { count: r.video_count }) : K("manage:reviewCard.noFramesBodyUncounted")
	}) : t === "fc2_similarity" ? null : t === "western_identity" ? /* @__PURE__ */ (0, $.jsx)(Ft, {
		row: r,
		openItem: g.openItem,
		openEntity: g.openEntity,
		onReveal: g.onReveal,
		revealing: g.revealing,
		note: g.revealNote
	}) : /* @__PURE__ */ (0, $.jsx)(jt, { url: r.preview_url }), ce = C ? M : T ? /* @__PURE__ */ (0, $.jsxs)("h4", {
		className: R(Rt, "flex-wrap gap-2"),
		children: [/* @__PURE__ */ (0, $.jsx)("span", {
			title: T,
			className: "flex max-w-full min-w-0 overflow-hidden rounded-md",
			children: /* @__PURE__ */ (0, $.jsx)(o, {
				variant: "caption",
				color: "neutral",
				children: T
			})
		}), /* @__PURE__ */ (0, $.jsx)("span", {
			title: E,
			className: "min-w-0 truncate text-body-medium text-text-primary",
			children: E
		})]
	}) : /* @__PURE__ */ (0, $.jsx)("h4", {
		className: Rt,
		children: /* @__PURE__ */ (0, $.jsx)("span", {
			title: w,
			className: "min-w-0 truncate text-body-medium text-text-primary",
			children: w
		})
	}), P = et(), L = [];
	if (A.length <= 1) {
		if (C) L.push({
			id: "entity",
			label: S,
			icon: oe,
			run: () => g.openEntity(x, S)
		});
		else if (r.asset_id) {
			let e = r.asset_id;
			L.push({
				id: "open",
				label: K("catalog:mediaActions.open"),
				icon: h,
				run: () => g.openItem(e)
			});
		}
	}
	u || (L.push(Re(c, () => l(!1, !c))), _ !== "ignored" && L.push({
		id: "approve",
		label: K("manage:reviewDecision.approve"),
		icon: Ve,
		disabled: d || !k,
		run: () => m("approved")
	}), L.push(_ === "pending" ? {
		id: "later",
		label: K("manage:reviewDecision.later"),
		icon: xe,
		disabled: d,
		run: () => m("skipped")
	} : {
		id: "restore",
		label: K("manage:reviewDecision.moveToPending"),
		icon: F,
		disabled: d,
		run: () => m("restore")
	}), _ !== "ignored" && L.push({
		id: "ignore",
		label: K("manage:shared.ignore"),
		icon: se,
		disabled: d,
		run: () => m("rejected")
	}));
	let de = {
		key: r.item_key,
		operations: L
	};
	return /* @__PURE__ */ (0, $.jsxs)("section", {
		"aria-label": w,
		"data-review-key": r.item_key,
		"data-rectangle-key": r.item_key,
		tabIndex: -1,
		className: R(Lt, Bt(t)),
		onContextMenu: (e) => {
			e.target.closest("input, textarea, select, [contenteditable]") || P.onContextMenu(e, de);
		},
		onKeyDown: (e) => {
			e.target.closest("input, textarea, select, [contenteditable]") || P.onKeyDown(e, de);
		},
		children: [
			P.menu,
			/* @__PURE__ */ (0, $.jsxs)("header", {
				className: "flex min-w-0 shrink-0 items-center gap-2 border-b border-separator-border px-5 py-4",
				children: [
					u ? null : /* @__PURE__ */ (0, $.jsx)("span", {
						className: R(Rt, "shrink-0"),
						onPointerDownCapture: (e) => {
							v.current = e.shiftKey;
						},
						onKeyDownCapture: (e) => {
							v.current = e.shiftKey;
						},
						children: /* @__PURE__ */ (0, $.jsx)(i, {
							isSelected: c,
							"aria-label": K("manage:reviewCard.selectItem", { title: w }),
							onChange: (e) => l(v.current, e)
						})
					}),
					/* @__PURE__ */ (0, $.jsx)("div", {
						className: "min-w-0 flex-1",
						children: ce
					}),
					j ? /* @__PURE__ */ (0, $.jsx)(o, {
						variant: "caption",
						color: "neutral",
						children: j
					}) : null
				]
			}),
			/* @__PURE__ */ (0, $.jsx)("div", {
				className: "relative mx-5 flex min-w-0 min-h-0 flex-1 flex-col",
				children: /* @__PURE__ */ (0, $.jsxs)("div", {
					ref: y,
					className: "flex min-w-0 min-h-0 flex-1 flex-col gap-4 overflow-y-auto py-4",
					children: [
						r.source_name ? /* @__PURE__ */ (0, $.jsx)("p", {
							className: "text-body-2-regular text-text-secondary",
							children: K("manage:reviewCard.sourceSpelling", { name: r.source_name })
						}) : null,
						!C && (r.board || r.assets) ? /* @__PURE__ */ (0, $.jsx)("p", {
							className: "text-body-2-regular text-text-secondary",
							children: K("manage:reviewCard.comparisonFiles", { count: Number(r.video_count || r.assets || 0) })
						}) : null,
						!C && M ? M : null,
						b && (D || r.current_value !== void 0) ? /* @__PURE__ */ (0, $.jsxs)("div", {
							role: "region",
							"aria-label": K("manage:reviewCard.currentInfo"),
							className: "flex min-w-0 flex-col gap-1 border-b border-separator-border pb-4",
							children: [
								/* @__PURE__ */ (0, $.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [/* @__PURE__ */ (0, $.jsx)("h5", {
										"data-copy-key": "review.card.current_value",
										className: "text-caption-1-medium text-text-secondary",
										children: K("manage:reviewCard.currentValue")
									}), r.current_owner?.startsWith("user:") || r.current_owner?.startsWith("review:") ? /* @__PURE__ */ (0, $.jsx)(o, {
										variant: "caption",
										color: "neutral",
										children: K("manage:reviewCard.manuallyConfirmed")
									}) : null]
								}),
								/* @__PURE__ */ (0, $.jsx)("p", {
									className: "text-body-2-regular text-text-primary wrap-anywhere",
									children: r.current_value === void 0 ? D : r.current_value ? /* @__PURE__ */ (0, $.jsx)(q, {
										value: r.current_value,
										reference: (r.candidates?.find((e) => e.candidate_key === a.candidateKey) || r.candidates?.[0])?.display_value
									}) : K("manage:reviewCard.noMetadata")
								}),
								r.videos === void 0 ? null : /* @__PURE__ */ (0, $.jsx)("p", {
									className: "text-caption-1-regular text-text-secondary",
									children: K(r.asset_path ? "manage:reviewCard.matchingFiles" : "manage:reviewCard.sameCodeFiles", { count: Number(r.videos) })
								})
							]
						}) : null,
						O.length || t === "creator_tags" ? /* @__PURE__ */ (0, $.jsx)("div", {
							className: "flex flex-wrap gap-1",
							children: O.length ? O.map((e) => /* @__PURE__ */ (0, $.jsx)(o, {
								variant: "caption",
								color: "soft",
								children: e
							}, e)) : /* @__PURE__ */ (0, $.jsx)("small", {
								className: "text-body-2-regular text-text-secondary",
								children: K("manage:reviewCard.noPendingTags")
							})
						}) : null,
						b ? /* @__PURE__ */ (0, $.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, $.jsxs)("h5", {
								className: "text-caption-1-medium text-text-secondary",
								children: [/* @__PURE__ */ (0, $.jsx)("span", {
									"data-copy-key": "review.card.candidate_sources",
									children: K("manage:reviewCard.candidateSources")
								}), ` · ${r.candidates?.length || 0}`]
							}), r.current_value || (r.candidates?.length || 0) > 1 ? /* @__PURE__ */ (0, $.jsx)("span", {
								"data-copy-key": r.current_value ? "review.card.compare_current" : "review.card.compare_sources",
								className: "text-caption-1-regular text-text-tertiary",
								children: r.current_value ? K("manage:reviewCard.comparedToCurrent") : K("manage:reviewCard.sourceDifferences")
							}) : null]
						}) : null,
						N,
						/* @__PURE__ */ (0, $.jsx)(Ot, {
							row: r,
							tags: p,
							locked: u,
							toast: g.toast
						}),
						!b && D ? /* @__PURE__ */ (0, $.jsx)("p", {
							className: "text-body-2-regular text-text-secondary wrap-anywhere",
							children: D
						}) : null
					]
				})
			}),
			/* @__PURE__ */ (0, $.jsxs)("footer", {
				className: R(re.stack, "shrink-0"),
				children: [
					_ === "ignored" ? null : /* @__PURE__ */ (0, $.jsx)(n, {
						variant: "ghost",
						size: "small",
						className: "me-auto",
						disabled: u,
						...I(d),
						onClick: () => m("rejected"),
						children: K("manage:shared.ignore")
					}),
					_ === "pending" ? /* @__PURE__ */ (0, $.jsx)(n, {
						variant: "secondary",
						size: "small",
						disabled: u,
						...I(d),
						onClick: () => m("skipped"),
						children: K("manage:reviewDecision.later")
					}) : /* @__PURE__ */ (0, $.jsx)(n, {
						variant: _ === "ignored" ? "primary" : "secondary",
						size: "small",
						disabled: u,
						...I(d),
						onClick: () => m("restore"),
						children: K("manage:reviewDecision.moveToPending")
					}),
					_ === "ignored" ? null : /* @__PURE__ */ (0, $.jsx)(n, {
						variant: "primary",
						size: "small",
						disabled: u || !k,
						...I(d),
						title: k ? void 0 : K("manage:reviewCard.cannotApproveHint"),
						onClick: () => m("approved"),
						children: K(k ? "manage:reviewDecision.approve" : "manage:reviewCard.cannotApprove")
					}),
					ne ? /* @__PURE__ */ (0, $.jsx)("p", {
						role: "status",
						className: "w-full text-body-2-regular text-text-error-primary",
						children: ne
					}) : null
				]
			})
		]
	});
}
// src/react/review/review-page.tsx
var Ht = "flex cursor-pointer items-center justify-between gap-2";
function Ut(e) {
	let t = Je("review").keys.filter(Ce), [r, i] = (0, J.useState)(() => matchMedia("(max-width:900px)").matches);
	(0, J.useEffect)(() => {
		let e = matchMedia("(max-width:900px)"), t = () => i(e.matches);
		return e.addEventListener("change", t), () => e.removeEventListener("change", t);
	}, []);
	let { route: a, openItem: o, openEntity: s, revealSource: c, toast: u, readOnly: ee, readOnlyMessage: te, writerUrl: re } = e, [p, m] = (0, J.useState)(Ce(e.category) ? e.category : l), [h, g] = (0, J.useState)(() => Fe(e.queue)), [_, v] = (0, J.useState)("candidates"), [ie, w] = (0, J.useState)(""), [T, E] = (0, J.useState)(""), [D, O] = (0, J.useState)(1), [k, A] = (0, J.useState)(20), [j, M] = (0, J.useState)(/* @__PURE__ */ new Set()), oe = Xe(() => M(/* @__PURE__ */ new Set()));
	(0, J.useEffect)(() => {
		j.size && ve();
	}, [j]);
	let [se, N] = (0, J.useState)(/* @__PURE__ */ new Map()), [ce, P] = (0, J.useState)(/* @__PURE__ */ new Map()), [le, F] = (0, J.useState)(""), I = (0, J.useRef)(null), [L, de] = (0, J.useState)(0), [fe, pe] = (0, J.useState)(""), R = (0, J.useRef)(!0);
	(0, J.useEffect)(() => () => {
		R.current = !1;
	}, []);
	let B = Ze({
		queryKey: x,
		queryFn: ({ signal: e }) => ye(e)
	}), xe = B.data || {
		sections: {},
		counts: {},
		queues: {
			later: {
				sections: {},
				counts: {}
			},
			ignored: {
				sections: {},
				counts: {}
			}
		}
	}, we = Pe(xe, h), Te = B.data ? Object.fromEntries(C.map((e) => [e, b.reduce((t, n) => t + Number(Pe(xe, e).counts[n] || 0), 0)])) : void 0, V = we.sections[p] || [], H = p === "metadata_fields", U = ee;
	(0, J.useEffect)(() => {
		let e = new Set(V.map((e) => e.item_key));
		M((t) => {
			let n = [...t].filter((t) => e.has(t));
			return n.length === t.size ? t : new Set(n);
		}), N((t) => {
			let n = [...t].filter(([t]) => e.has(t));
			return n.length === t.size ? t : new Map(n);
		}), P((t) => {
			let n = [...t].filter(([t]) => e.has(t));
			return n.length === t.size ? t : new Map(n);
		});
	}, [V]);
	let [ke, Ae] = (0, J.useState)(""), je = (0, J.useMemo)(() => {
		let e = ke.toLocaleLowerCase();
		return e ? V.filter((t) => Object.values(t).some((t) => typeof t == "string" && t.toLocaleLowerCase().includes(e))) : V;
	}, [V, ke]), Me = (0, J.useMemo)(() => H ? Se(je, "field") : [], [je, H]), Le = Me.some((e) => e.key === T) ? T : "", W = (0, J.useMemo)(() => H ? be(je, "field", Le) : je, [
		je,
		H,
		Le
	]), Re = (0, J.useMemo)(() => Ne(W, H), [W, H]), G = Re.some(([e]) => e === _) ? _ : "candidates", ze = (0, J.useMemo)(() => Se(W, G), [W, G]), Be = ze.some((e) => e.key === ie) ? ie : "", Ve = (0, J.useMemo)(() => be(W, G, Be), [
		W,
		G,
		Be
	]), Ue = (0, J.useMemo)(() => Ie(Ve, D, k), [
		Ve,
		D,
		k
	]), We = Ue.rows.map((e) => e.item_key), Ye = new Set(We), $e = ze.map((e) => ({
		...e,
		rows: e.rows.filter((e) => Ye.has(e.item_key))
	})).filter((e) => e.rows.length), et = (0, J.useRef)(null), q = (0, J.useRef)(null), nt = Qe(U ? void 0 : (e, t) => M((n) => /* @__PURE__ */ new Set([...t ? n : [], ...e])), {
		selecting: oe,
		items: "[data-review-key]",
		start: ".review-grid"
	});
	(0, J.useLayoutEffect)(() => {
		let e = q.current;
		if (!e || e.card.isConnected || (q.current = null, document.activeElement !== document.body)) return;
		let t = [...et.current?.querySelectorAll("[data-review-key]") ?? []];
		(e.following.map((e) => t.find((t) => t.dataset.reviewKey === e)).find(Boolean) ?? t[0] ?? et.current)?.focus();
	});
	let Y = (e) => se.get(e.item_key) || _e(e), rt = (0, J.useMemo)(() => V.filter((e) => j.has(e.item_key)), [V, j]), X = (e) => {
		let t = new Set(e);
		M((e) => new Set([...e].filter((e) => !t.has(e)))), N((e) => new Map([...e].filter(([e]) => !t.has(e)))), P((e) => new Map([...e].filter(([e]) => !t.has(e))));
	}, it = (e, t) => P((n) => new Map(n).set(e, t)), at = () => {
		q.current = null, v("candidates"), w(""), E(""), O(1), M(/* @__PURE__ */ new Set()), N(/* @__PURE__ */ new Map()), P(/* @__PURE__ */ new Map()), F(""), I.current = null;
	}, ot = (e) => {
		m(e), at(), a({
			category: e === "metadata_fields" ? "" : e,
			queue: h === "pending" ? "" : h
		});
	}, st = (e) => {
		g(e), at(), a({
			category: p === "metadata_fields" ? "" : p,
			queue: e === "pending" ? "" : e
		});
	}, Z = qe({
		mutationFn: ({ row: e, status: t, category: n }) => Ke(he(n, me(n, e), t, Y(e))),
		onSuccess: (e, { row: t, status: n, category: r }) => {
			if (!e.ok) {
				it(t.item_key, e.error || K("manage:reviewPage.decisionRejected"));
				return;
			}
			let i = document.activeElement?.closest("[data-review-key]");
			if (i?.dataset.reviewKey === t.item_key && et.current?.contains(i)) {
				let e = [...et.current.querySelectorAll("[data-review-key]")], t = e.indexOf(i), n = [...e.slice(t + 1), ...e.slice(0, t).reverse()].map((e) => e.dataset.reviewKey);
				q.current = {
					card: i,
					following: n
				};
			}
			Ge(r, [t.item_key], n), X([t.item_key]), u(ge(n));
		},
		onError: (e, { row: t }) => it(t.item_key, z(e))
	}), Q = qe({
		mutationFn: async ({ status: e, category: t, rows: n }) => {
			let r = [], i = [];
			for (let [a, o] of n.entries()) {
				if (!R.current) break;
				F(K("manage:reviewPage.processingProgress", {
					current: a,
					total: n.length
				}));
				try {
					let n = await Ke(he(t, me(t, o), e, Y(o)));
					if (!n.ok) throw Error(n.error || K("manage:reviewPage.itemNotAccepted"));
					r.push(o.item_key);
				} catch (e) {
					i.push([o.item_key, z(e)]);
				}
			}
			return {
				status: e,
				category: t,
				done: r,
				failures: i
			};
		},
		onSuccess: ({ status: e, category: t, done: n, failures: r }) => {
			Ge(t, n, e), X(n), r.forEach(([e, t]) => it(e, t)), F("");
		},
		onError: (e) => {
			F(z(e));
		}
	}), ct = {
		receipt: u,
		failure: (e) => F(z(e))
	}, lt = {
		ignored: "rejected",
		later: "skipped"
	}, ut = (e, t) => {
		let n = {
			done: [],
			failures: []
		};
		return {
			key: e,
			label: t,
			reversal: e === "approved" ? "irreversible" : "undo",
			danger: !1,
			confirm: (n) => {
				if (e === "approved" && H && n.some((e) => !Y(e).candidateKey)) throw Error(K("manage:reviewPage.chooseSourceFirst"));
				return F(""), {
					title: t,
					body: K(`manage:reviewPage.confirm.${e}`, { count: n.length })
				};
			},
			run: async (t) => {
				n = await Q.mutateAsync({
					status: e,
					category: p,
					rows: [...t]
				});
				let { done: r } = n;
				if (e === "approved") return;
				let i = p, a = t.filter((e) => r.includes(e.item_key)), o = e === "restore" ? lt[h] : "restore";
				return async () => {
					for (let e of a) await Ke(he(i, me(i, e), o, Y(e)));
					await Oe.invalidateQueries({ queryKey: x });
				};
			},
			receipt: () => K({
				approved: "manage:reviewPage.approvedCount",
				rejected: "manage:reviewPage.ignoredCount",
				skipped: "manage:reviewPage.laterCount",
				restore: "manage:reviewPage.pendingCount"
			}[e], { count: n.done.length }) + (n.failures.length ? K("manage:reviewPage.notCompletedSuffix", { count: n.failures.length }) : "")
		};
	}, dt = rt.every((e) => ue(p, e)), ft = [
		...h === "ignored" ? [] : [ut("rejected", K("manage:reviewToolbar.ignoreSelected"))],
		h === "pending" ? ut("skipped", K("manage:reviewToolbar.laterSelected")) : ut("restore", K("manage:reviewToolbar.restoreSelected")),
		...h === "ignored" ? [] : [ut("approved", K("manage:reviewToolbar.approveSelected"))]
	].map((e) => ({
		action: e,
		items: rt,
		host: ct,
		variant: e.key === "approved" || h === "ignored" && e.key === "restore" ? "primary" : void 0,
		disabled: Q.isPending || Z.isPending || e.key === "approved" && !dt
	})), pt = (e) => {
		N((t) => {
			let n = new Map(t);
			for (let t of rt) {
				let r = t.candidates?.find((t) => t.source === e);
				r && n.set(t.item_key, {
					...Y(t),
					candidateKey: r.candidate_key
				});
			}
			return n;
		}), F(K("manage:reviewPage.sourceChosen", { source: e }));
	}, mt = async (e) => {
		if (L) return;
		de(e), pe("");
		let t = await c(e);
		R.current && (de(0), pe(t));
	}, ht = De(xe.mirror, te), gt = xe.genre_tags || [], yt = {
		openItem: o,
		openEntity: s,
		onReveal: mt,
		revealing: L,
		revealNote: fe,
		toast: u
	};
	return /* @__PURE__ */ (0, $.jsx)(tt, { children: /* @__PURE__ */ (0, $.jsxs)("div", {
		className: "flex flex-col gap-5 pb-10",
		children: [
			U ? /* @__PURE__ */ (0, $.jsx)(y, {
				tone: "warning",
				title: K("manage:reviewPage.readOnly"),
				extra: re ? /* @__PURE__ */ (0, $.jsx)("p", {
					className: "text-body-2-regular",
					children: /* @__PURE__ */ (0, $.jsx)(ne, {
						href: re,
						children: K("manage:reviewPage.goToPrimary")
					})
				}) : void 0,
				children: ht
			}) : null,
			/* @__PURE__ */ (0, $.jsx)(St, { tags: gt }),
			/* @__PURE__ */ (0, $.jsxs)("div", {
				className: "flex flex-col gap-5 review-split:flex-row review-split:items-start review-split:gap-6",
				children: [/* @__PURE__ */ (0, $.jsxs)("div", {
					"data-section-nav": !0,
					className: "w-full min-w-0 review-split:sticky review-split:top-topbar review-split:w-review-tabs review-split:shrink-0",
					children: [/* @__PURE__ */ (0, $.jsx)("h2", {
						id: "reviewcategories",
						children: K("manage:reviewPage.categories")
					}), /* @__PURE__ */ (0, $.jsx)(ae, {
						group: "review",
						label: K("manage:reviewPage.categories"),
						value: p,
						onChange: ot,
						orientation: r ? "horizontal" : "vertical",
						panelPrefix: "review",
						sectionItems: !0,
						className: "",
						itemClassName: Ht,
						disabled: Z.isPending || Q.isPending,
						tabs: b.map((e) => {
							let t = Number(we.counts[e] || 0);
							return {
								value: e,
								label: S[e],
								badge: t ? /* @__PURE__ */ (0, $.jsx)("span", {
									className: "tabular-nums text-caption-1-medium text-text-secondary",
									children: t.toLocaleString()
								}) : null
							};
						})
					})]
				}), /* @__PURE__ */ (0, $.jsxs)("div", {
					ref: et,
					role: "tabpanel",
					id: `review-panel-${p}`,
					"aria-labelledby": `review-tab-${p}`,
					tabIndex: -1,
					className: "flex min-w-0 flex-1 flex-col gap-5",
					children: [
						/* @__PURE__ */ (0, $.jsx)(vt, {
							search: ke,
							onSearch: (e) => {
								Ae(e), w(""), O(1);
							},
							queueView: h,
							queueCounts: Te,
							onQueueChange: st,
							locked: U,
							fields: Me,
							fieldFilter: Le,
							onFieldFilter: (e) => {
								E(e), w(""), O(1);
							},
							groupOptions: Re,
							groupBy: G,
							onGroupBy: (e) => {
								v(e), w(""), O(1);
							},
							groups: ze,
							filter: Be,
							onFilter: (e) => {
								w(e), O(1);
							},
							pageKeys: We,
							allKeys: Ve.map((e) => e.item_key),
							selected: j,
							onSelected: M,
							selectedRows: rt,
							metadata: H,
							busy: Q.isPending || Z.isPending,
							feedback: le,
							onUnifySource: pt,
							actions: ft
						}),
						Ue.rows.length ? /* @__PURE__ */ (0, $.jsx)("div", {
							"data-rectangle-gutter": "",
							...nt,
							className: "flex flex-col gap-5",
							children: $e.map((e) => /* @__PURE__ */ (0, $.jsxs)("section", {
								"data-rectangle-gap": "",
								className: "flex flex-col gap-3",
								children: [$e.length > 1 || G !== "candidates" ? /* @__PURE__ */ (0, $.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [/* @__PURE__ */ (0, $.jsx)("h3", {
										className: "text-body-medium text-text-primary",
										children: `${e.title} · ${e.rows.length}`
									}), U ? null : /* @__PURE__ */ (0, $.jsx)(n, {
										variant: "ghost",
										size: "small",
										onClick: () => {
											let t = e.rows.map((e) => e.item_key), n = t.every((e) => j.has(e)), r = new Set(j);
											for (let e of t) n ? r.delete(e) : r.add(e);
											M(r);
										},
										children: e.rows.every((e) => j.has(e.item_key)) ? K("manage:reviewPage.clearGroup") : K("manage:reviewPage.selectGroup")
									})]
								}) : null, /* @__PURE__ */ (0, $.jsx)("div", {
									className: "review-grid gap-5",
									children: e.rows.map((e) => /* @__PURE__ */ (0, $.jsx)(Vt, {
										category: p,
										row: e,
										queueView: h,
										choice: Y(e),
										onChoice: (t) => N((n) => new Map(n).set(e.item_key, t)),
										selected: j.has(e.item_key),
										onSelect: (t, n) => M((r) => {
											let i = new Set(r);
											return I.current = He(i, We, I.current, e.item_key, t, n), i;
										}),
										locked: U,
										busy: Q.isPending || Z.isPending && Z.variables?.row.item_key === e.item_key,
										problem: ce.get(e.item_key) || "",
										genreTags: gt,
										onDecide: (t) => {
											Z.isPending || Q.isPending || (P((t) => new Map([...t].filter(([t]) => t !== e.item_key))), Z.mutate({
												row: e,
												status: t,
												category: p
											}));
										},
										handlers: yt
									}, e.item_key))
								})]
							}, e.key))
						}) : B.isError && !B.data ? /* @__PURE__ */ (0, $.jsx)(y, {
							tone: "error",
							title: K("manage:reviewPage.queueLoadFailed"),
							action: /* @__PURE__ */ (0, $.jsx)(n, {
								variant: "secondary",
								size: "small",
								disabled: B.isFetching,
								onClick: () => void B.refetch(),
								children: K("manage:shared.retryNow")
							}),
							children: z(B.error)
						}) : /* @__PURE__ */ (0, $.jsx)(f, {
							icon: Ee,
							title: K({
								pending: "manage:reviewPage.emptyPending",
								later: "manage:reviewPage.emptyLater",
								ignored: "manage:reviewPage.emptyIgnored"
							}[h]),
							actions: b.some((e) => e !== p && Number(we.counts[e] || 0) > 0) ? /* @__PURE__ */ (0, $.jsx)(n, {
								size: "small",
								onClick: () => {
									let e = t.find((e) => e !== p && Number(we.counts[e] || 0) > 0);
									e && ot(e);
								},
								children: K("manage:reviewPage.viewOtherCategories")
							}) : void 0,
							children: K(h === "pending" ? "manage:reviewPage.switchCategoryHint" : h === "later" ? "manage:reviewPage.laterKeptHint" : "manage:reviewPage.ignoredKeptHint")
						}),
						Ve.length ? /* @__PURE__ */ (0, $.jsx)(d, {
							label: K("manage:reviewPage.footerLabel"),
							total: Ve.length,
							pagination: {
								pageIndex: Ue.page - 1,
								pageSize: k
							},
							onChange: (e) => {
								O(e.pageIndex + 1), A(e.pageSize);
							}
						}) : null,
						H && h === "pending" ? /* @__PURE__ */ (0, $.jsx)(_t, {
							locked: U,
							openItem: o,
							toast: u
						}) : null
					]
				})]
			})
		]
	}) });
}
export { Ut as ReviewPage };

//# debugId=12ad85d4-1199-4619-9e60-3299721aa57a