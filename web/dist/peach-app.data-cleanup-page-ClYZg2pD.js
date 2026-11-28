(function() {
	try {
		var e = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "e3e948b9-4158-414f-ab3b-08da3b5252dc", e._sentryDebugIdIdentifier = "sentry-dbid-e3e948b9-4158-414f-ab3b-08da3b5252dc");
	} catch {}
})();
import { AnimatedNumber as e, BATCH_DELETE_TEXT as t, BC as n, Button as r, ButtonLink as i, CLEANUP_ENTRY as a, CLEANUP_ENTRY_GRID as o, CLEANUP_HASH_REDIRECTS as s, CLEANUP_TOOLS as c, Chip as l, ColumnFilterAvatar as u, DIRECTORY_TEMPLATE_ERROR as d, DUPLICATES_KEY as f, DataTable as p, Fieldset as m, FieldsetTitle as h, IDLE_REPAIR as g, IconButton as _, ImageWithFallback as v, IndexSearch as y, Input as b, JUNK_KEY as x, LEGACY_AVATAR_IMG as S, LINKS_KEY as C, LINK_CHECK_KEY as ee, LINK_KINDS as w, LINK_PRUNE_KEY as te, LOC as T, LibraryLabel as E, LibraryProcessingCard as D, M6 as ne, MEDIA_REPAIR_KEY as O, MEDIA_REPAIR_URL as k, MEDIA_SOURCES_KEY as re, MEDIA_SOURCE_ICONS as ie, Note as A, ORGANIZE_KEY as j, ORGANIZE_PARAMETER_HINT as ae, ORGANIZE_SCOPE_HINT as oe, ORGANIZE_TEXT as M, ORPHAN_RECORDS_KEY as N, ORPHAN_RECORDS_TEXT as P, PERFORMER_DELETE_KEY as F, PLAIN_STAT_STRIP as se, PlainStat as I, Progress as ce, QUALITY_GOALS_KEY as L, QueryErrorNote as R, RECORD_LABELS as le, REPAIR_CARD_TEXT as ue, REPAIR_LIBRARIES_KEY as de, RESOURCE_APPLY_KEY as fe, RESOURCE_SCAN_KEY as pe, RESOURCE_SYNC_TEXT as me, RESULT_PANEL as z, RESULT_SECTION as he, REVIEW_COUNTS_KEY as B, SOURCE_LABELS as ge, SectionHeading as _e, Select as ve, SelectItem as ye, SiteMark as be, SourceLabel as xe, SourceMark as Se, StatusLabel as Ce, TRASH_KEY as we, TaskProgress as V, Wt as Te, __toESM as Ee, activityKind as H, apiSend as De, applyConfirmText as Oe, applyLeftovers as ke, applyPlanText as Ae, applyText as je, attachOrphan as Me, baseName as Ne, busyProps as U, candidateText as Pe, checkLine as Fe, cleanupToolSkeletonHtml as Ie, codedText as Le, confirmModal as Re, cx as ze, dZ as Be, deletePerformerVideos as Ve, entityDisplayName as He, entityFaceImg as Ue, entityPath as We, errorMessage as W, esc as Ge, fetchDeletePerformers as Ke, fetchDeletePlan as qe, fetchDuplicates as Je, fetchJunkSummary as Ye, fetchLinkCheck as Xe, fetchLinkPrune as Ze, fetchLinkStats as Qe, fetchMediaRepair as $e, fetchMediaSources as et, fetchOrganize as tt, fetchOrganizeExample as nt, fetchOrphanRecords as rt, fetchQualityGoals as it, fetchRepairLibraries as at, fetchResourceApply as ot, fetchResourceScan as st, fetchReviewCounts as ct, fetchTrashSummary as lt, firstGrapheme as ut, fmtSize as G, hasChanges as dt, hasResourceRoots as ft, jobText as K, junkBreakdown as pt, ks as mt, linkLabel as ht, missingToolText as gt, organizeOutcome as _t, peachHistory$1 as vt, pickOrganizeFolder as yt, plainStatClass as bt, planSummary as xt, previewOrganize as St, pruneText as Ct, purgeCount as wt, purgeOrphan as Tt, queryClient as q, recordsText as Et, rememberTemplates as Dt, require_jsx_runtime as Ot, require_react as kt, reviewSummary as At, runBulkAction as jt, scanLine as Mt, serverLabel as Nt, sourceMeta as Pt, spriteGlyph as J, stageText as Ft, startLinkCheck as It, startLinkPrune as Lt, startOrganize as Rt, startResourceApply as zt, startResourceScan as Bt, statusLine as Vt, t as Y, useAction as Ht, useBackgroundJob as X, useEntityNames as Ut, useMutation as Wt, useOrderedLibraries as Gt, useQuery as Z, withOrganizeJob as Kt } from "./peach-app.js";
import { Page as qt } from "./peach-app.page-QAncjzM1.js";
import { ErrorExcerpt as Jt } from "./peach-app.error-excerpt-Ugft6I5o.js";
import { FolderSearchIcon as Yt } from "./peach-app.folder-rows-CDuIppaT.js";
import { ConnectionStatus as Xt } from "./peach-app.connection-status-BrXhLGSm.js";
// src/react/data-cleanup/cleanup-entry-card.tsx
var Q = /* @__PURE__ */ Ee(kt(), 1), $ = Ot(), Zt = J("chevron-right");
function Qt({ label: e, icon: t, summary: n, detail: r, state: i, attributes: o, onOpen: s }) {
	return /* @__PURE__ */ (0, $.jsxs)("button", {
		type: "button",
		...o,
		className: a.face,
		onClick: s,
		"data-entry-state": i,
		"aria-busy": i === "loading" || void 0,
		children: [
			/* @__PURE__ */ (0, $.jsx)("span", {
				"aria-hidden": !0,
				className: a.icon,
				children: /* @__PURE__ */ (0, $.jsx)(t, {
					"aria-hidden": !0,
					className: "size-5"
				})
			}),
			/* @__PURE__ */ (0, $.jsxs)("span", {
				className: a.body,
				children: [
					/* @__PURE__ */ (0, $.jsx)("span", {
						className: a.title,
						children: e
					}),
					/* @__PURE__ */ (0, $.jsx)("span", {
						className: ze(a.summary, i === "error" && "text-text-error-primary"),
						children: n
					}),
					r ? /* @__PURE__ */ (0, $.jsx)("span", {
						className: a.detail,
						children: r
					}) : null
				]
			}),
			/* @__PURE__ */ (0, $.jsx)(Zt, {
				"aria-hidden": !0,
				className: a.arrow
			})
		]
	});
}
// src/react/media-repair/media-repair-card.tsx
var $t = (e) => ie[e] || e, en = (e) => q.setQueryData(O, e);
function tn({ toast: e = () => {} }) {
	let t = X({
		queryKey: O,
		queryFn: ({ signal: e }) => $e(e),
		start: (e) => De(k, {
			library: e,
			restart: !0
		}),
		onFinish: (t) => {
			t.status === "complete" && !t.failed && !t.missing_tool && e(t.repaired ? Y("cleanup:mediaRepair.repaired", { count: t.repaired }) : Y("cleanup:mediaRepair.nothingToRepair"));
		}
	}), n = Z({
		queryKey: de,
		queryFn: ({ signal: e }) => at(e)
	}), [i, a] = (0, Q.useState)(""), o = Ht(), s = t.job ?? g, c = Gt(n.data ?? [], (e) => e.id), l = s.status === "running", u = c.find((e) => e.id === (l ? s.library : i)) ?? c.find((e) => e.id === s.library) ?? c[0], d = () => {
		u && Re({
			title: Y("cleanup:mediaRepair.confirmTitle", { name: u.name }),
			body: [Y("cleanup:mediaRepair.body"), ...u.metered ? [Y("cleanup:mediaRepair.meteredWarning")] : []].join(Y("cleanup:shared.sentenceGap")),
			confirmLabel: Y("cleanup:mediaRepair.confirm"),
			onConfirm: async () => {
				await t.start.mutateAsync(u.id);
			}
		});
	}, f = () => void o.run("stop", (e) => De(k, { stop: !0 }, "POST", e), en), p = t.outcome, _ = Vt(l ? s : p ?? g), v = o.error || K(p, "error") || (t.query.error ? Y("cleanup:mediaRepair.statusUnavailable") : "");
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, $.jsx)(m, {
			layout: "split",
			label: Y("cleanup:tools.mediaRepair"),
			footer: /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)(ve, {
				"aria-label": Y("cleanup:mediaRepair.library"),
				prefix: Y("cleanup:mediaRepair.library"),
				className: "w-48",
				selectedKey: u?.id ?? null,
				isDisabled: l || !c.length,
				"aria-busy": n.isPending || void 0,
				onSelectionChange: (e) => {
					e !== null && a(String(e));
				},
				children: c.map((e) => /* @__PURE__ */ (0, $.jsx)(ye, {
					id: e.id,
					textValue: e.name,
					children: /* @__PURE__ */ (0, $.jsx)(E, { library: {
						id: e.id,
						name: e.name,
						icon: $t(e.icon)
					} })
				}, e.id))
			}), l ? /* @__PURE__ */ (0, $.jsx)(r, {
				onClick: f,
				...U(o.busy === "stop"),
				children: Y("cleanup:shared.stop")
			}) : /* @__PURE__ */ (0, $.jsx)(r, {
				onClick: d,
				disabled: !u,
				children: Y("cleanup:mediaRepair.start")
			})] }),
			children: /* @__PURE__ */ (0, $.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, $.jsx)(h, { children: Y("cleanup:tools.mediaRepair") }),
					/* @__PURE__ */ (0, $.jsx)("p", {
						className: "text-body-2-regular text-text-secondary",
						children: ue
					}),
					l && s.total ? /* @__PURE__ */ (0, $.jsx)(ce, {
						label: Y("cleanup:mediaRepair.progress"),
						value: s.checked,
						max: s.total
					}) : null,
					_ ? /* @__PURE__ */ (0, $.jsx)("p", {
						role: "status",
						className: "text-caption-1-regular text-text-secondary",
						children: _
					}) : null
				]
			})
		}), /* @__PURE__ */ (0, $.jsxs)("div", {
			"aria-live": "polite",
			className: "flex flex-col gap-4 empty:hidden",
			children: [
				p?.status === "complete" && p.missing_tool ? /* @__PURE__ */ (0, $.jsx)(A, {
					tone: "warning",
					title: Y("cleanup:mediaRepair.missingTool"),
					action: /* @__PURE__ */ (0, $.jsx)(r, {
						variant: "ghost",
						size: "small",
						onClick: t.dismiss,
						children: Y("cleanup:mediaRepair.dismiss")
					}),
					children: gt(p)
				}) : null,
				n.isError ? /* @__PURE__ */ (0, $.jsx)(R, {
					titleKey: "cleanup:mediaRepair.librariesUnavailable",
					query: n
				}) : null,
				v ? /* @__PURE__ */ (0, $.jsx)(A, {
					tone: "error",
					children: v
				}) : null
			]
		})]
	});
}
// src/react/data-cleanup/link-check-icon.tsx
function nn({ className: e }) {
	return /* @__PURE__ */ (0, $.jsxs)("svg", {
		"aria-hidden": !0,
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: 2,
		strokeLinecap: "round",
		strokeLinejoin: "round",
		className: e,
		"data-link-check-icon": "",
		children: [
			/* @__PURE__ */ (0, $.jsx)("path", { d: "m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71" }),
			/* @__PURE__ */ (0, $.jsx)("path", { d: "m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71" }),
			/* @__PURE__ */ (0, $.jsxs)("g", {
				"data-link-check-rays": "",
				children: [
					/* @__PURE__ */ (0, $.jsx)("path", { d: "M8 2v3" }),
					/* @__PURE__ */ (0, $.jsx)("path", { d: "M2 8h3" }),
					/* @__PURE__ */ (0, $.jsx)("path", { d: "M16 19v3" }),
					/* @__PURE__ */ (0, $.jsx)("path", { d: "M19 16h3" })
				]
			})
		]
	});
}
// src/react/data-cleanup/link-manager.tsx
var rn = J("rotate-cw"), an = Y("cleanup:links.goneHint"), on = Y("cleanup:links.unclearHint"), sn = Y("cleanup:links.pruneHint"), cn = (e) => Number(e || 0).toLocaleString();
function ln({ label: e, value: t, note: n }) {
	return /* @__PURE__ */ (0, $.jsxs)("div", {
		className: "flex min-w-0 flex-col gap-0.5",
		children: [
			/* @__PURE__ */ (0, $.jsx)("span", {
				className: "text-caption-1-regular leading-5 text-text-secondary",
				children: e
			}),
			/* @__PURE__ */ (0, $.jsx)("b", {
				className: "text-title-2-semibold font-bold leading-5 tabular-nums text-text-primary",
				children: t
			}),
			n ? /* @__PURE__ */ (0, $.jsx)("small", {
				className: "text-caption-1-regular leading-5 text-text-secondary",
				children: n
			}) : null
		]
	});
}
function un({ title: e, items: t, hint: r, picked: i, onPick: a, actions: o, controls: s, retry: c, retrying: l, footer: d, confirmed: f = !1 }) {
	if (!t.length) return null;
	let m = [
		{
			id: "entity",
			label: Y("cleanup:links.columnEntry"),
			width: 180,
			min: 128,
			value: (e) => e.entity,
			filter: {
				values: (e) => e.entity,
				option: (e, t) => ({ leading: t && /* @__PURE__ */ (0, $.jsx)(u, {
					person: {
						...t.face,
						id: t.entity_id,
						name: e
					},
					kind: t.entity_kind,
					markId: t.entity_kind === "studio" || t.entity_kind === "agency" ? t.id : null
				}) })
			},
			render: (e) => /* @__PURE__ */ (0, $.jsxs)("a", {
				className: "flex min-w-24 items-center gap-2 text-text-secondary hover:text-text-primary",
				"data-inline-action": e.entity_id && e.entity_kind ? "" : void 0,
				href: e.entity_id && e.entity_kind ? We(e.entity_kind, e.entity, e.entity_id) : void 0,
				"data-link-identity": "",
				children: [/* @__PURE__ */ (0, $.jsx)("span", {
					"data-link-avatar": "",
					className: `relative flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-media-placeholder text-caption-1-medium text-text-primary ${S}`,
					"aria-hidden": !0,
					dangerouslySetInnerHTML: { __html: `<span>${Ge(ut(e.entity))}</span>` + Ue({
						kind: e.entity_kind,
						id: e.entity_id,
						hasImage: e.face?.has_image,
						version: e.face?.image_version,
						focus: e.face?.avatar_focus,
						thumb: !0,
						mark: e.entity_kind === "studio" || e.entity_kind === "agency" ? e.id : null
					}) }
				}), /* @__PURE__ */ (0, $.jsx)("span", {
					className: "min-w-0 wrap-anywhere",
					children: e.entity
				})]
			})
		},
		{
			id: "kind",
			label: Y("cleanup:shared.type"),
			width: 128,
			value: (e) => w[e.link_kind] || e.link_kind,
			filter: {
				values: (e) => e.link_kind,
				option: (e) => ({ label: w[e] || e })
			},
			render: (e) => w[e.link_kind] || e.link_kind
		},
		{
			id: "label",
			label: Y("cleanup:links.columnName"),
			min: 128,
			value: (e) => ht(e.label),
			filter: {
				values: (e) => ht(e.label) || new URL(e.url).hostname,
				option: (e, t) => ({ leading: t && /* @__PURE__ */ (0, $.jsx)(be, { linkId: t.id }) })
			},
			render: (e) => /* @__PURE__ */ (0, $.jsx)("span", {
				className: "flex min-w-24 items-center gap-2",
				"data-link-name": "",
				children: /* @__PURE__ */ (0, $.jsx)("span", {
					className: "min-w-0 wrap-anywhere",
					children: ht(e.label) || new URL(e.url).hostname
				})
			})
		},
		{
			id: "note",
			label: Y("cleanup:links.columnResult"),
			width: 320,
			min: 192,
			value: (e) => e.note,
			filter: { values: (e) => Nt(e.note_code ?? "", e.note, e.note_params) },
			render: (e) => /* @__PURE__ */ (0, $.jsxs)("div", {
				className: "min-w-0 w-full",
				"data-link-result": f ? "gone" : "unclear",
				children: [/^(?:HTTP\s+)?[1-5]\d{2}$/.test(e.note.trim()) ? /* @__PURE__ */ (0, $.jsx)(Ce, {
					tone: f || /^(?:HTTP\s+)?5\d{2}$/.test(e.note.trim()) ? "error" : "warning",
					"data-link-code": "",
					children: e.note.trim()
				}) : /* @__PURE__ */ (0, $.jsxs)("div", {
					className: "flex flex-col items-start gap-1",
					children: [/* @__PURE__ */ (0, $.jsx)(Ce, {
						tone: f ? "error" : "warning",
						children: Y(f ? "cleanup:links.dead" : "cleanup:links.inconclusive")
					}), /* @__PURE__ */ (0, $.jsx)(Jt, {
						text: Nt(e.note_code ?? "", e.note, e.note_params),
						className: "tabular-nums text-text-secondary"
					})]
				}), !f && e.temporary && e.attempts ? /* @__PURE__ */ (0, $.jsx)("span", {
					"data-link-rechecked": "",
					className: "mt-1 block text-body-2-regular text-text-secondary",
					children: Y("cleanup:links.rechecked", { count: e.attempts })
				}) : null]
			})
		},
		{
			id: "url",
			label: Y("cleanup:links.columnUrl"),
			width: 360,
			min: 180,
			value: (e) => e.url,
			filter: {
				values: (e) => new URL(e.url).hostname,
				option: (e, t) => ({ leading: t && /* @__PURE__ */ (0, $.jsx)(be, { linkId: t.id }) })
			},
			render: (e) => /* @__PURE__ */ (0, $.jsxs)("a", {
				href: e.url,
				target: "_blank",
				rel: "noopener noreferrer",
				title: e.url,
				"data-link-address": "",
				className: "flex min-w-0 items-center gap-1 text-text-secondary hover:text-text-primary",
				children: [
					/* @__PURE__ */ (0, $.jsx)(be, { linkId: e.id }),
					/* @__PURE__ */ (0, $.jsx)("span", {
						"data-middle-truncate": !0,
						"data-external-link-label": "",
						className: "min-w-0 truncate",
						children: e.url
					}),
					/* @__PURE__ */ (0, $.jsx)(Te, {
						"aria-hidden": !0,
						className: "size-(--icon-inline) shrink-0"
					})
				]
			})
		}
	];
	return /* @__PURE__ */ (0, $.jsx)("div", {
		className: he,
		"data-link-results": f ? "gone" : "unclear",
		children: /* @__PURE__ */ (0, $.jsx)(p, {
			preferenceId: f ? "links-dead" : "links-unreached",
			label: e,
			items: t,
			columns: m,
			rowId: (e) => String(e.id),
			description: r,
			unit: Y("cleanup:links.unit"),
			panel: !1,
			footerActions: d,
			rowLabel: (e) => Y("cleanup:links.rowLabel", {
				entity: e.entity,
				link: ht(e.label) || e.url
			}),
			selected: i.map(String),
			onSelected: (e) => a(e.map(Number)),
			contextOperations: (e) => [{
				id: "copy",
				label: Y("cleanup:links.copyLink"),
				icon: n,
				run: () => navigator.clipboard.writeText(e.url)
			}, ...c ? [{
				id: "retry",
				label: Y("manage:shared.retryNow"),
				icon: Be,
				disabled: l,
				run: () => c(e.id)
			}] : []],
			actions: (e) => o?.(e) ?? [],
			controls: () => s
		})
	});
}
function dn() {
	let t = Z({
		queryKey: C,
		queryFn: ({ signal: e }) => Qe(e)
	}), [n, a] = (0, Q.useState)([]), [o, s] = (0, Q.useState)([]), c = X({
		queryKey: te,
		queryFn: ({ signal: e }) => Ze(e),
		start: Lt,
		onFinish: () => {
			q.invalidateQueries({
				queryKey: C,
				exact: !0
			}), q.invalidateQueries({
				queryKey: ee,
				exact: !0
			});
		}
	}), u = X({
		queryKey: ee,
		queryFn: ({ signal: e }) => Xe(e),
		start: It,
		onStarted: () => {
			c.dismiss(), a([]), s([]);
		}
	}), d = u.job, f = d?.check_id ?? "";
	(0, Q.useEffect)(() => {
		a([]), s([]);
	}, [f]);
	let p = u.running || u.start.isPending, g = c.running || c.start.isPending, _ = c.running ? c.job : void 0, v = !!u.job && !!c.job, y = d?.status === "complete", b = d?.gone ?? [], x = d?.unclear ?? [], S = y ? x : [], T = S.filter((e) => n.includes(e.id)).map((e) => e.id), E = t.data, D = (E?.top_hosts ?? []).slice(0, 3), O = (e) => {
		!v || p || e && !e.length || u.start.mutate(e ? {
			retry: e,
			checkId: f
		} : {});
	}, k = (e, t = !1) => ({
		key: t ? "prune-all" : "prune",
		label: e,
		reversal: "irreversible",
		danger: !0,
		holdToConfirm: !0,
		confirm: (e) => ({
			title: Y("cleanup:links.deleteDead"),
			danger: !0,
			body: Y("cleanup:links.deleteDeadBody", { count: e.length })
		}),
		run: async (e) => {
			await c.start.mutateAsync({
				checkId: f,
				ids: t ? void 0 : e.map((e) => e.id)
			});
		},
		receipt: () => ""
	}), re = { receipt: () => {} }, ie = () => {
		v && !g && b.length && jt(k(Y("cleanup:links.deleteDead"), !0), b, re);
	}, j = g || c.start.isError ? null : c.outcome, ae = u.start.error ?? c.start.error, oe = null, M = null;
	if (j?.status === "failed") M = /* @__PURE__ */ (0, $.jsx)(A, {
		tone: "error",
		title: Y("cleanup:links.pruneIncomplete"),
		action: /* @__PURE__ */ (0, $.jsx)(i, {
			href: "/tasks",
			size: "small",
			variant: "secondary",
			children: /* @__PURE__ */ (0, $.jsx)("span", {
				"data-copy-key": "shell.routeTitle.tasks",
				children: Y("shell:routeTitle.tasks")
			})
		}),
		children: K(j, "error") || Y("cleanup:links.checkTaskLog")
	});
	else if (j && !b.length && !x.length) M = /* @__PURE__ */ (0, $.jsx)(A, {
		tone: "success",
		title: Y("cleanup:links.pruneDone"),
		children: Ct(j)
	});
	else if (ae) M = /* @__PURE__ */ (0, $.jsx)(A, {
		tone: "error",
		title: Y("cleanup:links.checkFailed"),
		children: W(ae)
	});
	else if (u.query.isError) M = /* @__PURE__ */ (0, $.jsx)(R, {
		titleKey: "cleanup:links.checkStatusFailed",
		query: u.query
	});
	else if (d?.status === "failed") M = /* @__PURE__ */ (0, $.jsx)(A, {
		tone: "error",
		title: Y("cleanup:links.checkFailed"),
		action: /* @__PURE__ */ (0, $.jsx)(i, {
			href: "/tasks",
			size: "small",
			variant: "secondary",
			children: /* @__PURE__ */ (0, $.jsx)("span", {
				"data-copy-key": "shell.routeTitle.tasks",
				children: Y("shell:routeTitle.tasks")
			})
		}),
		children: K(d, "error") || Y("cleanup:links.checkTaskLog")
	});
	else if (d && d.status !== "idle") {
		let t = Fe(d);
		oe = /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [d.status === "running" ? /* @__PURE__ */ (0, $.jsx)(V, {
			embedded: !0,
			kind: H("link-check"),
			label: t,
			labelContent: d.total ? /* @__PURE__ */ (0, $.jsx)(e, { value: t }) : t,
			value: Math.min(d.checked || 0, d.total || 0),
			total: d.total
		}) : null, g ? /* @__PURE__ */ (0, $.jsx)(V, {
			embedded: !0,
			kind: H("link-prune"),
			label: K(_) || Y("cleanup:links.pruning"),
			value: _?.checked,
			total: _?.total
		}) : null] });
		let i = Y("cleanup:links.retrySelected", { count: T.length });
		M = y || b.length || x.length ? /* @__PURE__ */ (0, $.jsxs)("div", {
			className: z,
			children: [
				j?.status === "complete" ? /* @__PURE__ */ (0, $.jsx)(A, {
					tone: "success",
					title: Y("cleanup:links.pruneDone"),
					children: Ct(j)
				}) : null,
				/* @__PURE__ */ (0, $.jsx)(un, {
					title: Y("cleanup:links.dead"),
					items: b,
					hint: an,
					picked: o,
					onPick: s,
					confirmed: !0,
					footer: y && b.length ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)("p", {
						className: "mr-auto min-w-0 text-caption-1-regular text-text-secondary",
						children: sn
					}), /* @__PURE__ */ (0, $.jsx)(r, {
						variant: "secondary",
						...U(g),
						onClick: ie,
						children: Y("cleanup:links.deleteDeadCount", { count: b.length })
					})] }) : null,
					actions: (e) => [{
						action: k(Y("cleanup:links.deleteSelected", { count: e.length })),
						items: e,
						host: re,
						disabled: !y || g,
						rowAction: {
							label: Y("cleanup:links.deleteDead"),
							icon: ne
						}
					}]
				}),
				/* @__PURE__ */ (0, $.jsx)(un, {
					title: Y("cleanup:links.unreached"),
					items: x,
					hint: on,
					picked: n,
					onPick: a,
					retry: y ? (e) => O([e]) : void 0,
					retrying: p,
					footer: S.length ? /* @__PURE__ */ (0, $.jsx)(r, {
						variant: "primary",
						leadingIcon: rn,
						...U(p),
						onClick: () => O(S.map((e) => e.id)),
						children: Y("cleanup:links.retryAll", { count: S.length })
					}) : null,
					controls: S.length ? /* @__PURE__ */ (0, $.jsx)(r, {
						variant: "secondary",
						leadingIcon: rn,
						disabled: !T.length,
						...U(p),
						onClick: () => O(T),
						children: i
					}) : null
				}),
				y && !b.length && !x.length ? /* @__PURE__ */ (0, $.jsx)("p", {
					className: `${he} text-body-regular text-notification-success-foreground`,
					children: Y("cleanup:links.allReachable")
				}) : null
			]
		}) : null;
	}
	return /* @__PURE__ */ (0, $.jsxs)("section", {
		id: "link-manager",
		"aria-labelledby": "link-manager-title",
		className: "flex scroll-mt-20 flex-col gap-4",
		children: [/* @__PURE__ */ (0, $.jsxs)(m, {
			layout: "stack",
			labelledBy: "link-manager-title",
			footer: /* @__PURE__ */ (0, $.jsx)(r, {
				"data-link-check": "",
				leadingIcon: nn,
				disabled: !v,
				...U(p),
				onClick: () => O(),
				children: Y(p ? "cleanup:links.checking" : y ? "cleanup:links.checkAgain" : "cleanup:links.checkLinks")
			}),
			children: [
				/* @__PURE__ */ (0, $.jsx)(h, {
					id: "link-manager-title",
					gap: "small",
					children: Y("cleanup:tools.links")
				}),
				c.query.isError ? /* @__PURE__ */ (0, $.jsx)(R, {
					titleKey: "cleanup:links.pruneStatusFailed",
					query: c.query
				}) : null,
				t.isError ? /* @__PURE__ */ (0, $.jsx)(R, {
					titleKey: "cleanup:links.statsLoadFailed",
					query: t
				}) : E ? /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsxs)("div", {
					className: "link-stat-grid mt-4 gap-x-8 gap-y-3",
					children: [/* @__PURE__ */ (0, $.jsx)(ln, {
						label: Y("cleanup:links.totalLinks"),
						value: cn(E.total),
						note: Y("cleanup:links.entitySpread", { count: Number(E.entities || 0) })
					}), Object.entries(E.by_kind ?? {}).map(([e, t]) => /* @__PURE__ */ (0, $.jsx)(ln, {
						label: w[e] || e,
						value: cn(t)
					}, e))]
				}), D.length ? /* @__PURE__ */ (0, $.jsxs)("div", {
					className: "mt-4 flex min-w-0 flex-col gap-0.5",
					children: [/* @__PURE__ */ (0, $.jsx)("span", {
						className: "text-caption-1-regular text-text-secondary",
						children: Y("cleanup:links.topSites")
					}), /* @__PURE__ */ (0, $.jsx)("div", {
						className: "flex min-w-0 flex-wrap gap-x-5 gap-y-2",
						children: D.map(([e, t]) => /* @__PURE__ */ (0, $.jsxs)("span", {
							"data-top-host": "",
							className: "inline-flex min-w-0 max-w-full items-center gap-1.5",
							children: [/* @__PURE__ */ (0, $.jsxs)("a", {
								href: `https://${e}`,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "inline-flex min-w-0 items-center gap-1.5 text-body-2-medium text-text-primary",
								children: [
									/* @__PURE__ */ (0, $.jsx)(be, { linkId: E.top_host_link_ids?.[e] }),
									/* @__PURE__ */ (0, $.jsx)("span", {
										className: "min-w-0 wrap-anywhere",
										children: e
									}),
									/* @__PURE__ */ (0, $.jsx)(Te, {
										"aria-hidden": !0,
										className: "size-(--icon-inline) shrink-0"
									})
								]
							}), /* @__PURE__ */ (0, $.jsx)(l, {
								variant: "caption",
								color: "neutral",
								children: /* @__PURE__ */ (0, $.jsx)("span", {
									className: "tabular-nums",
									children: cn(t)
								})
							})]
						}, e))
					})]
				}) : null] }) : null,
				/* @__PURE__ */ (0, $.jsx)("div", {
					"aria-live": "polite",
					className: "mt-4 flex flex-col gap-3 empty:hidden",
					children: oe
				})
			]
		}), /* @__PURE__ */ (0, $.jsx)("div", {
			"aria-live": "polite",
			className: "empty:hidden",
			children: M
		})]
	});
}
// src/react/data-cleanup/organize-card.tsx
var fn = (e, t) => t ? Y("cleanup:organize.applyBodyPath", {
	name: e,
	path: t
}) : Y("cleanup:organize.applyBodyAll", { name: e }), pn = Y("cleanup:organize.rollbackBody"), mn = 8;
function hn({ plan: e }) {
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)("ol", {
		className: "mt-2 flex min-w-0 flex-col gap-1",
		children: e.rows.slice(0, mn).map((e) => /* @__PURE__ */ (0, $.jsxs)("li", {
			className: "flex min-w-0 items-center gap-2 text-caption-1-regular text-text-secondary",
			children: [
				/* @__PURE__ */ (0, $.jsx)("span", {
					"data-middle-truncate": !0,
					title: e.current_path,
					className: "min-w-0 truncate",
					children: Ne(e.current_path)
				}),
				/* @__PURE__ */ (0, $.jsx)("span", {
					"aria-hidden": !0,
					children: "→"
				}),
				/* @__PURE__ */ (0, $.jsx)("span", {
					"data-middle-truncate": !0,
					title: e.target_path,
					className: "min-w-0 truncate text-text-primary",
					children: Ne(e.target_path)
				})
			]
		}, e.current_path))
	}), e.truncated || e.rows.length > mn ? /* @__PURE__ */ (0, $.jsx)("p", {
		className: "text-caption-1-regular text-text-secondary",
		children: Y("cleanup:organize.planTruncated")
	}) : null] });
}
function gn({ toast: e, failure: t }) {
	let n = Z({
		queryKey: j,
		queryFn: ({ signal: e }) => tt(e)
	}).data, i = n?.locations ?? [], [a, o] = (0, Q.useState)(""), s = i.some((e) => e.location === a) ? a : i[0]?.location ?? "", c = n?.templates?.[s], [l, u] = (0, Q.useState)(null), f = l?.location === s ? l : {
		location: s,
		file: c?.file ?? "",
		dir: c?.dir ?? ""
	}, p = (e) => {
		u({
			...f,
			...e
		}), N.reset();
	}, [g, v] = (0, Q.useState)({
		location: "",
		path: ""
	}), y = g.location === s ? g.path : "", x = (0, Q.useRef)({
		location: s,
		path: y
	});
	x.current = {
		location: s,
		path: y
	};
	let [S, C] = (0, Q.useState)(null), ee = (0, Q.useRef)(null), w = (0, Q.useRef)(null), te = (0, Q.useRef)(null), E = Z({
		queryKey: [
			"organize-example",
			f.file,
			f.dir
		],
		queryFn: ({ signal: e }) => nt(f.file, f.dir, e),
		enabled: !!n
	}), [D, ne] = (0, Q.useState)("file"), O = (0, Q.useRef)(!1), k = (0, Q.useRef)(null);
	(0, Q.useLayoutEffect)(() => {
		let e = k.current;
		if (!e) return;
		k.current = null;
		let t = (e.field === "file" ? ee : w).current;
		t?.focus(), t?.setSelectionRange(e.caret, e.caret);
	});
	let re = () => ({
		location: s,
		path: y.trim(),
		file_template: f.file.trim(),
		dir_template: f.dir.trim()
	}), N = Wt({
		mutationFn: St,
		onError: (e) => {
			let t = /整理路径/.test(W(e)) ? "path" : d.test(W(e)) ? "dir" : "file";
			C(t), (t === "path" ? te : t === "dir" ? w : ee).current?.focus();
		}
	}), P = Wt({
		mutationFn: ({ initial: e }) => yt(e),
		onSuccess: (e, t) => {
			e.path && t.location === x.current.location && t.path === x.current.path && (v({
				location: t.location,
				path: e.path
			}), C(null), N.reset(), te.current?.focus());
		}
	}), F = X({
		queryKey: j,
		queryFn: ({ signal: e }) => tt(e),
		start: Rt,
		jobOf: (e) => e,
		withJob: Kt,
		onStarted: () => N.reset(),
		onFinish: (n) => {
			if (q.invalidateQueries({
				queryKey: j,
				exact: !0
			}), n.status !== "complete") return;
			let { text: r, failed: i } = _t(n);
			i ? t(Y("cleanup:tools.organize"), Error(Y("cleanup:organize.rowsFailed", { count: i }))) : e(r.replace(/。$/, ""));
		}
	}), se = F.running || F.start.isPending, I = F.query.error, ce = JSON.stringify(N.variables) === JSON.stringify(re()), L = ce ? N.data : void 0, R = Number(L?.counts?.change || 0), le = T[s] || s, ue = (e) => {
		p(e), C(null), N.reset();
	}, de = (e) => {
		let t = (D === "file" ? ee : w).current, n = f[D], r = O.current ? t?.selectionStart ?? n.length : n.length, i = O.current ? t?.selectionEnd ?? r : r, a = `{${e}}`;
		k.current = {
			field: D,
			caret: r + a.length
		}, ue({ [D]: n.slice(0, r) + a + n.slice(i) });
	}, fe = () => {
		N.isPending || se || !s || (F.dismiss(), F.start.reset(), C(null), N.mutate(re()));
	}, pe = () => {
		let e = N.variables;
		e && L && R && Re({
			title: Y("cleanup:tools.organize"),
			body: fn(le, e.path),
			confirmLabel: Y("cleanup:tools.organize"),
			onConfirm: async () => {
				await F.start.mutateAsync({
					kind: "apply",
					request: e
				}), Dt({
					...n?.templates ?? {},
					[e.location]: {
						file: e.file_template,
						dir: e.dir_template
					}
				});
			}
		});
	}, me = () => void Re({
		title: Y("cleanup:organize.rollbackTitle"),
		body: pn,
		confirmLabel: Y("cleanup:organize.rollbackConfirm"),
		onConfirm: () => F.start.mutateAsync({ kind: "rollback" })
	}), z = null, he = !!R && !se && !F.outcome && !I, B = F.job, ge = F.outcome;
	if (I) z = /* @__PURE__ */ (0, $.jsx)(A, {
		tone: "error",
		title: /* @__PURE__ */ (0, $.jsx)("span", {
			"data-copy-key": "cleanup.organize.statusUnavailable",
			children: Y("cleanup:organize.statusUnavailable")
		}),
		action: /* @__PURE__ */ (0, $.jsx)(r, {
			size: "small",
			variant: "secondary",
			disabled: F.query.isFetching,
			onClick: () => void F.query.refetch(),
			children: Y("cleanup:shared.retry")
		}),
		children: W(I)
	});
	else if (B?.status === "running") {
		let e = K(B) || Ft(B) || Y("cleanup:organize.running");
		z = /* @__PURE__ */ (0, $.jsx)(V, {
			embedded: !0,
			kind: H("organize", B.stage_code),
			label: e,
			value: Math.min(B.checked || 0, B.total || 0),
			total: B.total
		});
	} else if (ge?.status === "failed") z = /* @__PURE__ */ (0, $.jsx)(A, {
		tone: "error",
		title: Y("cleanup:organize.incomplete"),
		children: K(ge, "error") || Y("cleanup:shared.checkTaskLogFiles")
	});
	else if (ge) {
		let { text: e, failed: t } = _t(ge);
		z = /* @__PURE__ */ (0, $.jsx)(A, {
			tone: t ? "warning" : "success",
			title: Y(t ? "cleanup:shared.partiallyCompleted" : "cleanup:organize.result"),
			children: e
		});
	} else F.start.isError ? z = /* @__PURE__ */ (0, $.jsx)(A, {
		tone: "error",
		title: Y("cleanup:organize.failed"),
		children: W(F.start.error)
	}) : N.isPending ? z = /* @__PURE__ */ (0, $.jsx)(V, {
		embedded: !0,
		kind: H("organize", "organize.checkingPlan"),
		label: Y("cleanup:organize.checkingPlan")
	}) : N.isError && ce ? z = /* @__PURE__ */ (0, $.jsx)(A, {
		tone: "error",
		title: Y("cleanup:organize.previewFailed"),
		children: W(N.error)
	}) : L && (z = /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)(A, {
		tone: "neutral",
		title: Y("cleanup:organize.previewResult"),
		children: xt(L)
	}), R ? /* @__PURE__ */ (0, $.jsx)(hn, { plan: L }) : null] }));
	return /* @__PURE__ */ (0, $.jsxs)(m, {
		layout: "stack",
		id: "organize",
		labelledBy: "cleanup-organize-title",
		attributes: { "data-cleanup-organize": "" },
		footer: /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [
			n?.last_batch ? /* @__PURE__ */ (0, $.jsx)(r, {
				variant: "secondary",
				disabled: !!I,
				...U(se),
				onClick: me,
				children: Y("cleanup:organize.rollbackLastBatch")
			}) : null,
			/* @__PURE__ */ (0, $.jsx)(r, {
				variant: he ? "secondary" : "primary",
				disabled: !i.length || se || !!I,
				...U(N.isPending),
				onClick: fe,
				children: Y("cleanup:organize.preview")
			}),
			he ? /* @__PURE__ */ (0, $.jsx)(r, {
				variant: "primary",
				onClick: pe,
				children: Y("cleanup:organize.apply")
			}) : null
		] }),
		children: [
			/* @__PURE__ */ (0, $.jsx)(h, {
				id: "cleanup-organize-title",
				gap: "medium",
				children: Y("cleanup:organize.title")
			}),
			/* @__PURE__ */ (0, $.jsx)("p", {
				className: "text-body-regular text-text-secondary",
				children: M
			}),
			/* @__PURE__ */ (0, $.jsxs)("div", {
				className: "mt-3 flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, $.jsxs)("div", {
						"data-organize-scope": !0,
						className: "flex min-w-0 flex-wrap items-start gap-2",
						children: [i.length ? /* @__PURE__ */ (0, $.jsx)(ve, {
							"aria-label": Y("cleanup:organize.storageLabel"),
							prefix: Y("cleanup:organize.storagePrefix"),
							className: "w-fit min-w-25",
							selectedKey: s || null,
							onSelectionChange: (e) => {
								e !== null && (o(String(e)), v({
									location: String(e),
									path: ""
								}), C(null), N.reset(), P.reset(), O.current = !1);
							},
							children: i.map((e) => /* @__PURE__ */ (0, $.jsxs)(ye, {
								id: e.location,
								textValue: T[e.location] || e.location,
								children: [/* @__PURE__ */ (0, $.jsx)(Se, { mark: ie[e.location] || "database" }), T[e.location] || e.location]
							}, e.location))
						}) : null, /* @__PURE__ */ (0, $.jsxs)("div", {
							className: "flex min-w-0 basis-64 flex-1 items-start gap-2",
							children: [/* @__PURE__ */ (0, $.jsx)(b, {
								"aria-label": Y("cleanup:organize.pathLabel"),
								className: "min-w-0 flex-1",
								placeholder: Y("cleanup:organize.pathPlaceholder"),
								name: "organize-path",
								autoComplete: "off",
								spellCheck: "false",
								value: y,
								ref: te,
								isInvalid: S === "path",
								onChange: (e) => {
									v({
										location: s,
										path: e
									}), C(null), N.reset(), P.reset();
								}
							}), /* @__PURE__ */ (0, $.jsx)(_, {
								icon: Yt,
								"aria-label": Y("cleanup:organize.choosePath"),
								...U(P.isPending),
								onClick: () => P.mutate({
									initial: y || i.find((e) => e.location === s)?.roots[0] || "",
									location: s,
									path: y
								})
							})]
						})]
					}),
					/* @__PURE__ */ (0, $.jsx)("p", {
						className: "text-caption-1-regular text-text-secondary",
						children: oe
					}),
					P.isError ? /* @__PURE__ */ (0, $.jsxs)(A, {
						tone: "error",
						title: Y("cleanup:organize.pickerFailed"),
						children: [W(P.error), Y("cleanup:organize.pickerFallback")]
					}) : null,
					/* @__PURE__ */ (0, $.jsx)(b, {
						label: Y("cleanup:organize.fileTemplate"),
						placeholder: "{code}[ {title}]",
						value: f.file,
						ref: ee,
						spellCheck: "false",
						isInvalid: S === "file",
						onFocus: () => {
							ne("file"), O.current = !0;
						},
						onChange: (e) => ue({ file: e })
					}),
					/* @__PURE__ */ (0, $.jsx)(b, {
						label: Y("cleanup:organize.dirTemplate"),
						placeholder: Y("cleanup:organize.dirTemplatePlaceholder"),
						value: f.dir,
						ref: w,
						spellCheck: "false",
						isInvalid: S === "dir",
						onFocus: () => {
							ne("dir"), O.current = !0;
						},
						onChange: (e) => ue({ dir: e })
					}),
					n?.presets?.length ? /* @__PURE__ */ (0, $.jsxs)("div", {
						className: "flex flex-col gap-2",
						role: "group",
						"aria-label": Y("cleanup:organize.applyPreset"),
						children: [/* @__PURE__ */ (0, $.jsx)("p", {
							className: "text-caption-1-medium text-text-secondary",
							children: Y("cleanup:organize.applyPreset")
						}), /* @__PURE__ */ (0, $.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: n.presets.map((e) => {
								let t = Le(e, "label");
								return /* @__PURE__ */ (0, $.jsx)(r, {
									variant: "secondary",
									size: "small",
									title: e.example || t,
									className: "max-w-full [&>span]:min-w-0 [&>span]:shrink",
									onClick: () => {
										ue({
											file: e.file,
											dir: e.dir
										}), O.current = !1;
									},
									children: /* @__PURE__ */ (0, $.jsx)("span", {
										className: "truncate",
										children: t
									})
								}, e.id || e.label);
							})
						})]
					}) : null,
					/* @__PURE__ */ (0, $.jsxs)("p", {
						"aria-live": "polite",
						"aria-busy": E.isFetching,
						"data-organize-example": "",
						className: "text-caption-1-regular text-text-secondary",
						children: [Y("cleanup:organize.examplePath"), /* @__PURE__ */ (0, $.jsx)("code", {
							className: "wrap-anywhere",
							children: E.data?.example || E.data?.error || (E.isError ? W(E.error) : Y("cleanup:organize.previewLoading"))
						})]
					}),
					n?.placeholders?.length ? /* @__PURE__ */ (0, $.jsxs)("div", {
						className: "flex flex-col gap-2",
						role: "group",
						"aria-label": Y("cleanup:organize.insertParameter"),
						children: [/* @__PURE__ */ (0, $.jsxs)("p", {
							className: "text-caption-1-regular text-text-secondary",
							"aria-live": "polite",
							children: [/* @__PURE__ */ (0, $.jsx)("strong", {
								className: "text-caption-1-semibold text-text-primary",
								children: Y("cleanup:organize.insertParameter")
							}), Y("cleanup:organize.insertTarget", { target: Y(D === "file" ? "cleanup:organize.fileTemplate" : "cleanup:organize.dirTemplate") })]
						}), /* @__PURE__ */ (0, $.jsx)("div", {
							className: "flex flex-wrap gap-1",
							children: n.placeholders.map((e) => {
								let t = Nt(`labels.organizeTemplates.placeholder.${e.key}`, e.label);
								return /* @__PURE__ */ (0, $.jsx)(r, {
									variant: "ghost",
									size: "small",
									"aria-label": `${t} {${e.key}}`,
									onClick: () => de(e.key),
									children: /* @__PURE__ */ (0, $.jsxs)("span", {
										className: "inline-flex flex-wrap items-center gap-x-1.5",
										children: [/* @__PURE__ */ (0, $.jsx)("code", { children: `{${e.key}}` }), /* @__PURE__ */ (0, $.jsx)("span", {
											className: "text-text-secondary",
											children: t
										})]
									})
								}, e.key);
							})
						})]
					}) : null,
					/* @__PURE__ */ (0, $.jsx)("p", {
						className: "text-caption-1-regular leading-4.5 text-text-secondary",
						children: ae
					})
				]
			}),
			/* @__PURE__ */ (0, $.jsx)("div", {
				"aria-live": "polite",
				className: "mt-3 flex flex-col gap-2 empty:hidden",
				children: z
			})
		]
	});
}
// src/react/data-cleanup/orphan-records-card.tsx
var _n = J("play"), vn = Object.fromEntries([
	...le,
	["rating", Y("catalog:shared.rating")],
	["play_count", Y("catalog:catalogList.plays")],
	["last_played", Y("catalog:catalogList.lastWatched")],
	["o_count", Y("catalog:catalogList.climaxCount")]
]), yn = () => q.invalidateQueries({
	queryKey: N,
	exact: !0
});
function bn(e, t) {
	return Re({
		title: Y("cleanup:orphans.deleteRecord"),
		holdToConfirm: !0,
		body: Et(e.records) ? Y("cleanup:orphans.deleteBodyWithActivity", {
			name: e.name,
			records: Et(e.records)
		}) : Y("cleanup:orphans.deleteBody", { name: e.name }),
		confirmLabel: Y("cleanup:orphans.deleteRecord"),
		danger: !0,
		onConfirm: t
	});
}
async function xn(e, t) {
	t((await Tt(e.id)).blocked.length ? Y("cleanup:orphans.fileRestored", { name: e.name }) : Y("cleanup:orphans.recordDeleted", { name: e.name })), yn();
}
function Sn({ item: e, toast: t }) {
	let [n, i] = (0, Q.useState)(e.candidates[0]?.id ?? null), a = Wt({
		mutationFn: () => Me(e.id, Number(n)),
		onSuccess: () => {
			let r = e.candidates.find((e) => e.id === n);
			t(Y("cleanup:orphans.attached", {
				name: e.name,
				target: r?.name ?? Y("cleanup:orphans.selectedFile")
			})), yn();
		},
		onError: (e) => t(W(e))
	}), o = Wt({ mutationFn: () => xn(e, t) }), s = () => {
		bn(e, () => o.mutateAsync());
	}, c = a.isPending || o.isPending;
	return /* @__PURE__ */ (0, $.jsxs)("span", {
		className: "flex min-w-0 flex-wrap items-center gap-2",
		children: [
			/* @__PURE__ */ (0, $.jsx)(r, {
				variant: "secondary",
				size: "small",
				...U(c),
				onClick: s,
				children: Y("cleanup:orphans.deleteRecord")
			}),
			e.candidates.length ? /* @__PURE__ */ (0, $.jsx)(ve, {
				"data-orphan-target": "",
				"aria-label": Y("cleanup:orphans.targetLabel", { name: e.name }),
				prefix: Y("cleanup:orphans.targetPrefix"),
				className: "w-52",
				selectedKey: n,
				onSelectionChange: (e) => {
					e !== null && i(Number(e));
				},
				children: e.candidates.map((e) => /* @__PURE__ */ (0, $.jsx)(ye, {
					id: e.id,
					textValue: Pe(e),
					children: Pe(e)
				}, e.id))
			}) : null,
			e.candidates.length ? /* @__PURE__ */ (0, $.jsx)(r, {
				variant: "primary",
				size: "small",
				disabled: n === null,
				...U(c),
				onClick: () => a.mutate(),
				children: Y("cleanup:orphans.moveActivity")
			}) : null
		]
	});
}
function Cn({ item: e }) {
	return /* @__PURE__ */ (0, $.jsxs)("span", {
		className: "flex min-w-0 items-center gap-3",
		children: [/* @__PURE__ */ (0, $.jsxs)("span", {
			className: "relative inline-grid aspect-16/10 w-24 flex-none place-items-center max-cleanup-tight:hidden overflow-hidden rounded-lg border border-separator-border bg-media-placeholder text-text-tertiary",
			children: [/* @__PURE__ */ (0, $.jsx)(_n, {
				"aria-hidden": !0,
				className: "size-5"
			}), e.has_thumb ? /* @__PURE__ */ (0, $.jsx)(v, {
				src: `/thumb?id=${e.id}&c=4`,
				alt: "",
				loading: "lazy",
				className: "absolute inset-0 size-full object-contain"
			}) : null]
		}), /* @__PURE__ */ (0, $.jsxs)("span", {
			className: "flex min-w-0 flex-1 flex-col gap-0.5",
			children: [/* @__PURE__ */ (0, $.jsx)("span", {
				title: e.name,
				className: "truncate text-body-regular text-text-primary",
				children: e.name
			}), /* @__PURE__ */ (0, $.jsxs)("small", {
				className: "flex min-w-0 items-center gap-1.5 text-caption-1-regular text-text-secondary",
				children: [
					e.code ? /* @__PURE__ */ (0, $.jsx)("span", {
						className: "shrink-0",
						children: e.code
					}) : null,
					e.code && e.location ? /* @__PURE__ */ (0, $.jsx)("span", {
						"aria-hidden": "true",
						children: "·"
					}) : null,
					e.location ? /* @__PURE__ */ (0, $.jsx)(xe, {
						source: e.location,
						label: T[e.location] || e.location
					}) : null
				]
			})]
		})]
	});
}
function wn({ toast: e }) {
	let [t, n] = (0, Q.useState)([]), r = Z({
		queryKey: N,
		queryFn: ({ signal: e }) => rt(e)
	}), i = r.data?.items ?? [], a = { receipt: e }, o = (t) => {
		let n = [{
			id: "delete",
			label: Y("cleanup:orphans.deleteRecord"),
			icon: ne,
			danger: !0,
			run: () => {
				bn(t, () => xn(t, e));
			}
		}];
		return t.candidates.length && n.unshift({
			id: "target",
			label: Y("cleanup:orphans.targetLabel", { name: t.name }),
			icon: mt,
			run: (e) => {
				e.querySelector("[data-orphan-target] button")?.click();
			}
		}), n;
	}, s = (e) => {
		let t = null;
		return {
			key: "purge",
			label: Y("cleanup:orphans.deleteSelectedCount", { count: e }),
			reversal: "irreversible",
			danger: !0,
			holdToConfirm: !0,
			confirm: (e) => ({
				title: Y("cleanup:orphans.deleteSelectedTitle"),
				danger: !0,
				body: Y("cleanup:orphans.deleteSelectedBody", { count: e.length }),
				items: e.map((e) => e.name)
			}),
			run: async (e) => {
				t = await Tt(e.map((e) => e.id));
			},
			receipt: () => t ? Y("cleanup:orphans.purged", { count: t.purged }) + (t.blocked.length ? Y("cleanup:orphans.purgedBlocked", { count: t.blocked.length }) : "") : ""
		};
	}, c = [
		{
			id: "item",
			label: Y("cleanup:shared.video"),
			width: 480,
			min: 320,
			value: (e) => e.name,
			render: (e) => /* @__PURE__ */ (0, $.jsx)(Cn, { item: e })
		},
		{
			id: "records",
			label: Y("cleanup:orphans.columnActivity"),
			width: 176,
			min: 144,
			value: (e) => Et(e.records),
			filter: {
				values: (e) => Object.keys(e.records).filter((t) => e.records[t]),
				option: (e) => ({ label: vn[e] || e })
			},
			render: (e) => /* @__PURE__ */ (0, $.jsx)("span", {
				className: "block min-w-0 whitespace-normal wrap-anywhere",
				children: Et(e.records) || Y("cleanup:shared.none")
			})
		},
		{
			id: "target",
			label: Y("cleanup:shared.actions"),
			width: i.some((e) => e.candidates.length) ? 360 : 128,
			min: 128,
			value: (e) => e.candidates.length,
			render: (t) => /* @__PURE__ */ (0, $.jsx)(Sn, {
				item: t,
				toast: e
			})
		}
	];
	return /* @__PURE__ */ (0, $.jsx)("section", {
		id: "orphan-records",
		"aria-labelledby": "orphan-records-title",
		className: "flex scroll-mt-20 flex-col gap-4",
		children: r.isError ? /* @__PURE__ */ (0, $.jsxs)(m, {
			layout: "stack",
			labelledBy: "orphan-records-title",
			children: [/* @__PURE__ */ (0, $.jsx)(h, {
				id: "orphan-records-title",
				children: Y("cleanup:tools.orphanRecords")
			}), /* @__PURE__ */ (0, $.jsx)(R, {
				titleKey: "cleanup:orphans.loadFailed",
				query: r
			})]
		}) : /* @__PURE__ */ (0, $.jsx)(p, {
			preferenceId: "orphan-records",
			label: Y("cleanup:orphans.tableLabel"),
			items: i,
			columns: c,
			contextOperations: o,
			title: Y("cleanup:tools.orphanRecords"),
			titleId: "orphan-records-title",
			unit: Y("cleanup:orphans.unit"),
			description: P,
			rowId: (e) => String(e.id),
			rowLabel: (e) => e.name,
			selected: t,
			onSelected: n,
			actions: (e) => [{
				items: e,
				host: a,
				action: s(e.length),
				done: () => {
					n([]), yn();
				}
			}]
		})
	});
}
// src/react/data-cleanup/performer-delete-card.tsx
function Tn({ person: e }) {
	let t = He("performer", e.k, e.entity_id);
	return /* @__PURE__ */ (0, $.jsxs)("a", {
		href: We("performer", e.k, e.entity_id),
		title: t,
		className: "flex min-w-0 items-center gap-3 text-text-primary",
		children: [/* @__PURE__ */ (0, $.jsx)("span", {
			"aria-hidden": !0,
			className: ze("relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-media-placeholder text-caption-1-medium", S),
			dangerouslySetInnerHTML: { __html: `<span>${Ge(ut(t))}</span>` + Ue({
				kind: "performer",
				id: e.entity_id,
				hasImage: e.has_image,
				version: e.image_version,
				focus: e.avatar_focus,
				thumb: !0
			}) }
		}), /* @__PURE__ */ (0, $.jsx)("span", {
			className: "min-w-0 wrap-anywhere",
			children: t
		})]
	});
}
function En(e, t, n) {
	let r = (e) => e.slice(0, 5).join(Y("cleanup:shared.listSeparator")), i = e.length > 5 ? Y("cleanup:performerDelete.moreNames", {
		names: r(e),
		total: e.length
	}) : r(e), a = t.length > 5 ? Y("cleanup:performerDelete.moreExamples", {
		examples: r(t),
		total: t.length
	}) : r(t);
	return [
		Y("cleanup:performerDelete.bodyScope", {
			names: i,
			count: n.total,
			size: G(n.bytes)
		}),
		Y("cleanup:performerDelete.bodyWarning"),
		...n.shared ? [Y("cleanup:performerDelete.sharedFiles", { count: n.shared })] : [],
		Y("cleanup:performerDelete.bodyExamples", { examples: a })
	].join(Y("cleanup:shared.sentenceGap"));
}
function Dn({ toast: e }) {
	Ut();
	let n = Z({
		queryKey: F,
		queryFn: ({ signal: e }) => Ke(e)
	}), [i, a] = (0, Q.useState)([]), [o, s] = (0, Q.useState)(""), [c, l] = (0, Q.useState)(null), [d, f] = (0, Q.useState)(""), g = {
		receipt: e,
		failure: (e) => f(W(e))
	}, _ = (0, Q.useMemo)(() => [
		{
			id: "name",
			label: Y("cleanup:shared.actress"),
			width: 280,
			min: 160,
			value: (e) => e.k,
			filter: {
				values: (e) => e.k,
				option: (e, t) => ({
					label: He("performer", e, t?.entity_id),
					searchTerms: t?.aliases,
					leading: t && /* @__PURE__ */ (0, $.jsx)(u, { person: {
						...t,
						id: t.entity_id,
						name: e
					} })
				})
			},
			render: (e) => /* @__PURE__ */ (0, $.jsx)(Tn, { person: e })
		},
		{
			id: "works",
			label: Y("cleanup:shared.videos"),
			width: 104,
			min: 80,
			value: (e) => e.n,
			filter: {
				range: "count",
				value: (e) => e.n
			},
			render: (e) => Y("cleanup:performerDelete.videoCount", { count: e.n })
		},
		{
			id: "files",
			label: Y("cleanup:shared.files"),
			width: 104,
			min: 80,
			value: (e) => e.file_count,
			filter: {
				range: "count",
				value: (e) => e.file_count
			},
			render: (e) => Y("cleanup:performerDelete.fileCount", { count: e.file_count })
		},
		{
			id: "bytes",
			label: Y("cleanup:performerDelete.columnSize"),
			width: 136,
			min: 104,
			value: (e) => e.bytes,
			filter: {
				range: "size",
				value: (e) => e.bytes
			},
			render: (e) => G(e.bytes)
		}
	], []), v = o.toLocaleLowerCase(), b = (n.data?.items || []).filter((e) => !v || [
		e.k,
		He("performer", e.k, e.entity_id),
		...e.aliases
	].some((e) => e.toLocaleLowerCase().includes(v))), x = () => {
		let e = null, t = null;
		return {
			key: "performer-delete",
			label: Y("cleanup:performerDelete.deleteSelected"),
			reversal: "irreversible",
			danger: !0,
			holdToConfirm: !0,
			confirm: async (t) => {
				f("");
				let n = await qe(t.map((e) => e.entity_id));
				if (!n.total) throw Error(Y("cleanup:performerDelete.nothingToDelete"));
				e = n;
				let r = n.performers.map((e) => He("performer", e.name, e.id)), i = [...new Set(n.items.map((e) => e.code || e.name || `#${e.id}`))];
				return {
					title: Y("cleanup:performerDelete.confirmTitle"),
					confirmLabel: Y("cleanup:performerDelete.confirm"),
					danger: !0,
					body: En(r, i, n)
				};
			},
			run: async () => {
				t = await Ve(e), l(t), await Promise.all([q.invalidateQueries({
					queryKey: F,
					exact: !0
				}), q.invalidateQueries({
					queryKey: we,
					exact: !0
				})]);
			},
			receipt: () => t ? Y("cleanup:performerDelete.purged", { count: t.purged }) + (t.blocked.length ? Y("cleanup:performerDelete.doneBlocked", { count: t.blocked.length }) : "") : ""
		};
	}, S = c ? [
		...c.blocked.map((e) => ({
			path: e.path,
			reason: Nt(e.reason_code ?? "", e.reason, e.reason_params)
		})),
		...c.cleanup_pending,
		...c.cache_blocked.map((e) => ({
			path: e.name,
			reason: e.reason
		}))
	] : [];
	return /* @__PURE__ */ (0, $.jsxs)("section", {
		id: "batch-delete",
		className: "flex min-w-0 scroll-mt-20 flex-col gap-3",
		"aria-label": Y("cleanup:tools.bulkDelete"),
		children: [
			n.isPending ? /* @__PURE__ */ (0, $.jsx)("div", { dangerouslySetInnerHTML: { __html: Ie("batch-delete") } }) : n.isError ? /* @__PURE__ */ (0, $.jsxs)(m, {
				layout: "stack",
				labelledBy: "batch-delete-title",
				children: [/* @__PURE__ */ (0, $.jsx)(h, {
					id: "batch-delete-title",
					children: Y("cleanup:tools.bulkDelete")
				}), /* @__PURE__ */ (0, $.jsx)(A, {
					tone: "error",
					title: Y("cleanup:performerDelete.loadFailed"),
					action: /* @__PURE__ */ (0, $.jsx)(r, {
						variant: "secondary",
						size: "small",
						onClick: () => void n.refetch(),
						children: Y("cleanup:shared.retry")
					}),
					children: W(n.error)
				})]
			}) : /* @__PURE__ */ (0, $.jsx)(p, {
				preferenceId: "performer-delete",
				label: Y("cleanup:performerDelete.tableLabel"),
				title: Y("cleanup:tools.bulkDelete"),
				titleId: "batch-delete-title",
				unit: Y("cleanup:performerDelete.unit"),
				description: t,
				items: b,
				columns: _,
				rowId: (e) => String(e.entity_id),
				rowLabel: (e) => He("performer", e.k, e.entity_id),
				selected: i,
				onSelected: a,
				toolbarActions: /* @__PURE__ */ (0, $.jsx)(y, {
					label: Y("cleanup:performerDelete.search"),
					value: o,
					onQuery: (e) => {
						s(e), a([]);
					}
				}),
				actions: (e, t) => [{
					action: x(),
					items: e,
					host: g,
					done: t,
					rowAction: {
						label: Y("cleanup:performerDelete.deleteVideosForRow"),
						icon: ne
					}
				}]
			}),
			d ? /* @__PURE__ */ (0, $.jsx)(A, {
				tone: "error",
				title: Y("cleanup:performerDelete.planFailed"),
				children: d
			}) : null,
			c ? /* @__PURE__ */ (0, $.jsx)(A, {
				tone: S.length ? "warning" : "info",
				title: Y("cleanup:performerDelete.purged", { count: c.purged }),
				extra: S.length ? /* @__PURE__ */ (0, $.jsx)("div", {
					className: "flex flex-col gap-2 text-body-2-regular wrap-anywhere",
					children: S.slice(0, 5).map((e, t) => /* @__PURE__ */ (0, $.jsx)("p", { children: Y("shell:format.withNote", {
						text: e.path,
						note: e.reason
					}) }, t))
				}) : null,
				children: S.length ? Y("cleanup:performerDelete.partialFailure", {
					count: c.blocked.length,
					quarantined: c.cleanup_pending.length,
					cacheFiles: c.cache_blocked.length
				}) : Y("cleanup:performerDelete.done")
			}) : null
		]
	});
}
// src/react/data-cleanup/resource-sync-card.tsx
var On = J("git-compare"), kn = J("rotate-cw"), An = Y("cleanup:resourceSync.cleanUpDead"), jn = "px-6 py-3", Mn = "inline-grid w-full grid-flow-col auto-cols-fr gap-4 max-plain-stat-pair:grid-flow-row max-plain-stat-pair:grid-cols-2 max-plain-stat-single:grid-cols-1", Nn = (e) => Number(e || 0).toLocaleString();
function Pn({ scan: e, partial: t = !1 }) {
	let n = e.cache ?? {
		files: 0,
		bytes: 0
	};
	return /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)("div", {
		className: Mn,
		children: (e.sources ?? []).map((e) => /* @__PURE__ */ (0, $.jsxs)("article", {
			className: bt(),
			children: [/* @__PURE__ */ (0, $.jsx)(I, {
				label: ge[e.location] || Y("cleanup:resourceSync.storageFallback"),
				mark: /* @__PURE__ */ (0, $.jsx)(Se, { mark: ie[e.location] ?? "database" }),
				aside: /* @__PURE__ */ (0, $.jsx)(Xt, {
					online: e.online,
					children: e.online ? Y("cleanup:resourceSync.online") : Y("cleanup:resourceSync.offline")
				}),
				figure: e.online ? Y("cleanup:resourceSync.missingCount", { count: Number(e.missing || 0) }) : "—",
				meta: e.online ? Pt(e) : Y("cleanup:resourceSync.skipped", { summary: Pt(e) }),
				wrapMeta: !0
			}), e.online && e.unreadable > 0 ? /* @__PURE__ */ (0, $.jsx)("span", {
				className: "self-start",
				children: /* @__PURE__ */ (0, $.jsxs)(Ce, {
					tone: "warning",
					children: [
						Nn(e.unreadable),
						" ",
						Y("cleanup:resourceSync.unreadableDirs")
					]
				})
			}) : null]
		}, e.location))
	}), !t && /* @__PURE__ */ (0, $.jsxs)("div", {
		className: Mn,
		children: [
			/* @__PURE__ */ (0, $.jsx)("article", {
				className: bt(),
				children: /* @__PURE__ */ (0, $.jsx)(I, {
					label: Y("cleanup:resourceSync.toPurge"),
					figure: Y("cleanup:resourceSync.purgeCount", { count: Number(wt(e) || 0) }),
					meta: Y("cleanup:resourceSync.purgeHint")
				})
			}),
			/* @__PURE__ */ (0, $.jsx)("article", {
				className: bt(),
				children: /* @__PURE__ */ (0, $.jsx)(I, {
					label: Y("cleanup:resourceSync.toVanish"),
					figure: Y("cleanup:resourceSync.vanishCount", { count: Number(e.vanish || 0) }),
					meta: Y("cleanup:resourceSync.vanishHint")
				})
			}),
			/* @__PURE__ */ (0, $.jsx)("article", {
				className: bt(),
				children: /* @__PURE__ */ (0, $.jsx)(I, {
					label: Y("cleanup:resourceSync.emptyDirs"),
					figure: Y("cleanup:resourceSync.emptyDirCount", { count: Number(e.empty || 0) }),
					meta: Y("cleanup:resourceSync.emptyDirsHint")
				})
			}),
			/* @__PURE__ */ (0, $.jsx)("article", {
				className: bt(),
				children: /* @__PURE__ */ (0, $.jsx)(I, {
					label: Y("cleanup:resourceSync.cache"),
					figure: Y("cleanup:resourceSync.cacheCount", { count: Number(n.files || 0) }),
					meta: n.files ? G(n.bytes) : ""
				})
			})
		]
	})] });
}
function Fn({ toast: t, writeAccess: n }) {
	let a = X({
		queryKey: fe,
		queryFn: ({ signal: e }) => ot(e),
		start: zt,
		onFinish: (e) => {
			if (q.invalidateQueries({
				queryKey: we,
				exact: !0
			}), q.invalidateQueries({
				queryKey: pe,
				exact: !0
			}), e.status !== "complete") return;
			let { done: n, left: r } = ke(e);
			r ? t(Y("cleanup:resourceSync.applyLeftovers", {
				done: Nn(n),
				count: Number(r || 0)
			}), { warning: !0 }) : t(Y("cleanup:resourceSync.cleaned"));
		}
	}), o = X({
		queryKey: pe,
		queryFn: ({ signal: e }) => st(e),
		start: Bt,
		onStarted: () => a.dismiss()
	}), s = o.start.isPending ? void 0 : o.job, c = o.running || o.start.isPending, l = a.running || a.start.isPending, u = !!o.job && !!a.job, d = u && n?.readOnly === !1, f = s?.status === "complete" || s?.status === "failed", p = Y(c ? "cleanup:resourceSync.scanning" : f ? "cleanup:resourceSync.scanAgain" : "cleanup:resourceSync.checkFiles"), g = (e) => void Re({
		holdToConfirm: !0,
		title: An,
		body: Oe(e),
		confirmLabel: An,
		danger: !0,
		onConfirm: () => a.start.mutateAsync(e.scan_id || "")
	}), _ = o.start.isPending || o.start.isError ? null : a.outcome, v = (e) => {
		let t = ke(e).left > 0;
		return /* @__PURE__ */ (0, $.jsx)(A, {
			tone: t ? "warning" : "success",
			title: Y(t ? "cleanup:shared.partiallyCompleted" : "cleanup:resourceSync.cleanupResult"),
			children: je(e, G)
		});
	}, y = null, b = null;
	if (_?.status === "failed") b = /* @__PURE__ */ (0, $.jsx)(A, {
		tone: "error",
		title: Y("cleanup:resourceSync.cleanupIncomplete"),
		action: /* @__PURE__ */ (0, $.jsx)(i, {
			href: "/tasks",
			size: "small",
			variant: "secondary",
			children: /* @__PURE__ */ (0, $.jsx)("span", {
				"data-copy-key": "shell.routeTitle.tasks",
				children: Y("shell:routeTitle.tasks")
			})
		}),
		children: K(_, "error") || Y("cleanup:shared.checkTaskLogFiles")
	});
	else if (_) b = v(_);
	else if (a.running) y = /* @__PURE__ */ (0, $.jsx)(V, {
		embedded: !0,
		kind: H("resource-apply"),
		label: K(a.job) || Y("cleanup:resourceSync.applying")
	});
	else if (o.start.isError) b = /* @__PURE__ */ (0, $.jsx)(A, {
		tone: "error",
		title: Y("cleanup:resourceSync.scanFailed"),
		children: W(o.start.error)
	});
	else if (o.query.isError && s) b = /* @__PURE__ */ (0, $.jsx)(R, {
		titleKey: "cleanup:resourceSync.scanStatusUnavailable",
		query: o.query,
		className: jn
	});
	else if (s?.status === "running") {
		let t = Mt(s);
		y = /* @__PURE__ */ (0, $.jsx)(V, {
			embedded: !0,
			kind: H("resource-scan"),
			label: t,
			labelContent: s.total_sources ? /* @__PURE__ */ (0, $.jsx)(e, { value: t }) : t,
			value: s.completed_sources,
			total: s.total_sources
		}), s.sources?.length && (b = /* @__PURE__ */ (0, $.jsx)(Pn, {
			scan: s,
			partial: !0
		}));
	} else if (s?.status === "failed") b = /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [s.sources?.length ? /* @__PURE__ */ (0, $.jsx)(Pn, {
		scan: s,
		partial: !0
	}) : null, /* @__PURE__ */ (0, $.jsx)(A, {
		tone: "error",
		title: Y("cleanup:resourceSync.scanFailed"),
		children: K(s, "error") || Y("cleanup:resourceSync.backgroundScanFailed")
	})] });
	else if (s?.status === "complete" && s.applied) b = a.job?.status === "complete" ? v(a.job) : /* @__PURE__ */ (0, $.jsx)(A, {
		tone: "neutral",
		title: Y("cleanup:resourceSync.cleanupResult"),
		children: Y("cleanup:resourceSync.alreadyCleaned")
	});
	else if (s?.status === "complete") {
		let e = dt(s);
		b = /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [/* @__PURE__ */ (0, $.jsx)(Pn, { scan: s }), e ? /* @__PURE__ */ (0, $.jsx)(A, {
			tone: "neutral",
			title: Y("cleanup:resourceSync.toClean"),
			action: /* @__PURE__ */ (0, $.jsx)(r, {
				variant: "secondary",
				disabled: !d,
				...U(l),
				onClick: () => {
					d && g(s);
				},
				children: l ? Y("cleanup:resourceSync.applyingButton") : An
			}),
			children: Ae(s)
		}) : /* @__PURE__ */ (0, $.jsx)("p", {
			className: "mr-auto text-body-regular text-notification-success-foreground",
			children: Y("cleanup:resourceSync.nothingToClean")
		})] });
	}
	return a.start.isError && !_ && (b = /* @__PURE__ */ (0, $.jsxs)($.Fragment, { children: [b, /* @__PURE__ */ (0, $.jsx)(A, {
		tone: "error",
		title: Y("cleanup:resourceSync.cleanupFailed"),
		children: W(a.start.error)
	})] })), /* @__PURE__ */ (0, $.jsxs)("section", {
		id: "resource-sync",
		"aria-labelledby": "resource-sync-title",
		className: "flex scroll-mt-20 flex-col gap-4",
		children: [
			n?.readOnly ? /* @__PURE__ */ (0, $.jsx)(A, {
				tone: "warning",
				action: n.writerUrl ? /* @__PURE__ */ (0, $.jsx)(i, {
					variant: "secondary",
					size: "small",
					href: n.writerUrl,
					children: /* @__PURE__ */ (0, $.jsx)("span", {
						"data-copy-key": "cleanup.resourceSync.goToPrimary",
						children: Y("cleanup:resourceSync.goToPrimary")
					})
				}) : void 0,
				children: n.readOnlyMessage
			}) : null,
			/* @__PURE__ */ (0, $.jsxs)(m, {
				layout: "split",
				labelledBy: "resource-sync-title",
				footer: /* @__PURE__ */ (0, $.jsx)(r, {
					"data-resource-scan": !0,
					leadingIcon: f && !c ? kn : On,
					disabled: !u,
					...U(c),
					onClick: () => {
						u && !c && o.start.mutate();
					},
					children: p
				}),
				children: [
					/* @__PURE__ */ (0, $.jsx)(h, {
						id: "resource-sync-title",
						gap: "small",
						children: Y("cleanup:tools.resourceSync")
					}),
					/* @__PURE__ */ (0, $.jsx)("p", {
						className: "max-w-190 text-body-2-regular leading-5 text-text-secondary",
						children: me
					}),
					/* @__PURE__ */ (0, $.jsxs)("div", {
						"aria-live": "polite",
						className: "mt-4 flex flex-col gap-2 empty:hidden",
						children: [o.query.isPending || a.query.isPending ? /* @__PURE__ */ (0, $.jsx)("div", {
							role: "status",
							"aria-label": Y("cleanup:resourceSync.statusLoading"),
							"data-skeleton": "",
							className: "skeleton-sheen h-6 rounded-md"
						}) : null, y]
					})
				]
			}),
			/* @__PURE__ */ (0, $.jsxs)("div", {
				"aria-live": "polite",
				className: "flex flex-col gap-4 empty:hidden",
				children: [
					!o.job && o.query.isError ? /* @__PURE__ */ (0, $.jsx)(R, {
						titleKey: "cleanup:resourceSync.scanStatusUnavailable",
						query: o.query,
						className: jn
					}) : null,
					a.query.isError ? /* @__PURE__ */ (0, $.jsx)(R, {
						titleKey: "cleanup:resourceSync.applyStatusUnavailable",
						query: a.query,
						className: jn
					}) : null,
					b
				]
			})
		]
	});
}
// src/react/data-cleanup/data-cleanup-tool-page.tsx
function In({ toast: e, writeAccess: t }) {
	let n = Z({
		queryKey: re,
		queryFn: ({ signal: e }) => et(e)
	});
	return n.isError ? /* @__PURE__ */ (0, $.jsx)(R, {
		titleKey: "cleanup:resourceSync.storageLoadFailed",
		query: n
	}) : n.isPending ? /* @__PURE__ */ (0, $.jsx)("p", {
		role: "status",
		children: Y("cleanup:resourceSync.storageLoading")
	}) : ft(n.data) ? /* @__PURE__ */ (0, $.jsx)(Fn, {
		toast: e,
		writeAccess: t
	}) : /* @__PURE__ */ (0, $.jsxs)(m, {
		layout: "stack",
		label: Y("cleanup:tools.resourceSync"),
		children: [
			/* @__PURE__ */ (0, $.jsx)(h, { children: Y("cleanup:tools.resourceSync") }),
			/* @__PURE__ */ (0, $.jsx)("p", {
				className: "text-body-regular text-text-secondary",
				children: Y("cleanup:resourceSync.noDirectories")
			}),
			/* @__PURE__ */ (0, $.jsx)("a", {
				href: "/settings/library",
				className: "text-body-medium text-accent-600 underline",
				children: Y("cleanup:resourceSync.setUpLibrary")
			})
		]
	});
}
function Ln({ tool: e, toast: t, failure: n, writeAccess: r }) {
	let i = (e) => t(e), a;
	switch (e) {
		case "organize":
			a = /* @__PURE__ */ (0, $.jsx)(gn, {
				toast: i,
				failure: n
			});
			break;
		case "resource-sync":
			a = /* @__PURE__ */ (0, $.jsx)(In, {
				toast: t,
				writeAccess: r
			});
			break;
		case "orphan-records":
			a = /* @__PURE__ */ (0, $.jsx)(wn, { toast: i });
			break;
		case "media-repair":
			a = /* @__PURE__ */ (0, $.jsx)(tn, { toast: i });
			break;
		case "links":
			a = /* @__PURE__ */ (0, $.jsx)(dn, {});
			break;
		case "batch-delete": a = /* @__PURE__ */ (0, $.jsx)(Dn, { toast: i });
	}
	return /* @__PURE__ */ (0, $.jsx)(qt, { children: a });
}
// src/react/data-cleanup/data-cleanup-page.tsx
function Rn(e, t) {
	return e.data === void 0 ? e.isError ? {
		figure: Y("cleanup:overview.loadFailed"),
		state: "error"
	} : {
		figure: Y("cleanup:overview.loading"),
		state: "loading"
	} : t(e.data);
}
function zn({ section: e, label: t, icon: n, value: r, open: i }) {
	return /* @__PURE__ */ (0, $.jsx)("button", {
		type: "button",
		className: bt({ interactive: !0 }),
		"data-cleanup-go": e,
		"data-entry-state": r.state,
		"aria-busy": r.state === "loading" || void 0,
		onClick: () => i(e),
		children: /* @__PURE__ */ (0, $.jsx)(I, {
			label: t,
			icon: n,
			figure: r.figure,
			meta: r.meta
		})
	});
}
function Bn({ tool: e, navigate: t }) {
	let n = J(e.icon);
	return /* @__PURE__ */ (0, $.jsx)(Qt, {
		label: e.title,
		icon: n,
		summary: e.description,
		attributes: { "data-cleanup-tool": e.key },
		onOpen: () => t(e.path + location.search)
	});
}
var Vn = J("square-check-big"), Hn = J("sparkles"), Un = J("file-stack"), Wn = J("file-archive"), Gn = J("trash"), Kn = () => {
	for (let e of [
		B,
		L,
		f,
		x
	]) q.invalidateQueries({
		queryKey: e,
		exact: !0
	});
};
function qn({ toast: e, open: t, navigate: n }) {
	let r = Z({
		queryKey: B,
		queryFn: ({ signal: e }) => ct(e)
	}), i = Z({
		queryKey: L,
		queryFn: ({ signal: e }) => it(e)
	}), a = Z({
		queryKey: f,
		queryFn: ({ signal: e }) => Je(e)
	}), l = Z({
		queryKey: x,
		queryFn: ({ signal: e }) => Ye(e)
	}), u = Z({
		queryKey: we,
		queryFn: ({ signal: e }) => lt(e)
	});
	return (0, Q.useEffect)(() => {
		let e = s[location.hash];
		e && vt.replace(e + location.search);
	}, []), /* @__PURE__ */ (0, $.jsxs)(qt, { children: [
		/* @__PURE__ */ (0, $.jsxs)("section", {
			"aria-labelledby": "cleanup-pending",
			className: "flex flex-col gap-4",
			children: [/* @__PURE__ */ (0, $.jsx)(_e, {
				id: "cleanup-pending",
				children: Y("cleanup:overview.needsAttention")
			}), /* @__PURE__ */ (0, $.jsxs)("div", {
				className: se,
				children: [
					/* @__PURE__ */ (0, $.jsx)(zn, {
						section: "review",
						label: Y("cleanup:overview.review"),
						icon: Vn,
						open: t,
						value: Rn(r, At)
					}),
					/* @__PURE__ */ (0, $.jsx)(zn, {
						section: "duplicates",
						label: Y("cleanup:overview.duplicates"),
						icon: Un,
						open: t,
						value: Rn(a, (e) => Number(e.total || 0) ? {
							figure: Y("cleanup:overview.duplicateGroups", {
								count: Number(e.total),
								files: Number(e.files || 0).toLocaleString()
							}),
							meta: Y("cleanup:overview.reclaimable", { size: G(e.reclaimable || 0) })
						} : { figure: Y("cleanup:overview.noDuplicates") })
					}),
					/* @__PURE__ */ (0, $.jsx)(zn, {
						section: "ads",
						label: Y("cleanup:overview.junkFiles"),
						icon: Wn,
						open: t,
						value: Rn(l, (e) => ({
							figure: Y("cleanup:overview.junkUndecided", { count: Number(e.pending_total || 0) }),
							meta: pt(e)
						}))
					}),
					/* @__PURE__ */ (0, $.jsx)(zn, {
						section: "quality",
						label: Y("cleanup:overview.hdUpgrades"),
						icon: Hn,
						open: t,
						value: Rn(i, (e) => ({ figure: Y("cleanup:overview.upgradesPending", { count: Number(e.total || 0) }) }))
					}),
					/* @__PURE__ */ (0, $.jsx)(zn, {
						section: "trash",
						label: Y("cleanup:overview.trash"),
						icon: Gn,
						open: t,
						value: Rn(u, (e) => ({
							figure: Y("cleanup:overview.trashCount", { count: Number(e.total || 0) }),
							meta: e.total ? Y("cleanup:overview.trashSize", { size: G(e.bytes || 0) }) : Y("cleanup:overview.trashEmptyHint")
						}))
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, $.jsx)("div", {
			id: "libraryProcessing",
			className: "scroll-mt-20",
			children: /* @__PURE__ */ (0, $.jsx)(D, {
				toast: (t) => e(t),
				onComplete: Kn
			})
		}),
		/* @__PURE__ */ (0, $.jsxs)("section", {
			"aria-labelledby": "cleanup-maintenance",
			className: "flex flex-col gap-4",
			children: [/* @__PURE__ */ (0, $.jsx)(_e, {
				id: "cleanup-maintenance",
				children: Y("cleanup:overview.maintenanceSection")
			}), /* @__PURE__ */ (0, $.jsx)("div", {
				className: o,
				children: c.filter((e) => e.key !== "batch-delete").map((e) => /* @__PURE__ */ (0, $.jsx)(Bn, {
					tool: e,
					navigate: n
				}, e.key))
			})]
		}),
		/* @__PURE__ */ (0, $.jsxs)("section", {
			"aria-labelledby": "cleanup-deletion",
			className: "flex flex-col gap-4",
			children: [/* @__PURE__ */ (0, $.jsx)(_e, {
				id: "cleanup-deletion",
				children: Y("cleanup:overview.deletionSection")
			}), /* @__PURE__ */ (0, $.jsx)("div", {
				className: o,
				children: c.filter((e) => e.key === "batch-delete").map((e) => /* @__PURE__ */ (0, $.jsx)(Bn, {
					tool: e,
					navigate: n
				}, e.key))
			})]
		})
	] });
}
export { qn as DataCleanupPage, Ln as DataCleanupToolPage };

//# debugId=e3e948b9-4158-414f-ab3b-08da3b5252dc