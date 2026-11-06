(function() {
	try {
		var e = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "69a46918-6cb7-46f5-ad69-1081b6644c29", e._sentryDebugIdIdentifier = "sentry-dbid-69a46918-6cb7-46f5-ad69-1081b6644c29");
	} catch {}
})();
import { BATCH_DELETE_TEXT as e, Button as t, CLEANUP_ENTRY as n, CLEANUP_ENTRY_GRID as r, CLEANUP_HASH_REDIRECTS as i, CLEANUP_TOOLS as a, Chip as o, DIRECTORY_TEMPLATE_ERROR as s, DUPLICATES_KEY as c, Fieldset as l, FieldsetTitle as u, IDLE_REPAIR as d, IconButton as f, IndexSearch as p, Input as m, JUNK_KEY as h, LINKS_KEY as g, LINK_CHECK_KEY as _, LINK_KINDS as v, LINK_PRUNE_KEY as ee, LOC as y, LibraryProcessingCard as b, MEDIA_REPAIR_KEY as x, MEDIA_REPAIR_URL as S, MEDIA_SOURCES_KEY as C, MEDIA_SOURCE_ICONS as w, Note as T, ORGANIZE_KEY as te, ORGANIZE_PARAMETER_HINT as ne, ORGANIZE_SCOPE_HINT as re, ORGANIZE_TEXT as E, ORPHAN_RECORDS_KEY as D, ORPHAN_RECORDS_TEXT as O, PERFORMER_DELETE_KEY as k, PLAIN_STAT_STRIP as ie, PlainStat as A, Progress as j, QUALITY_GOALS_KEY as ae, REPAIR_CARD_TEXT as M, REPAIR_LIBRARIES_KEY as oe, RESOURCE_APPLY_KEY as se, RESOURCE_SCAN_KEY as N, RESOURCE_SYNC_TEXT as P, RESULT_PANEL as F, RESULT_SECTION as I, REVIEW_COUNTS_KEY as ce, SOURCE_LABELS as L, SectionHeading as le, Select as ue, SelectItem as de, SourceMark as fe, StatusLabel as pe, TRASH_KEY as R, TaskProgress as z, Wt as me, __toESM as he, apiSend as ge, applyConfirmText as _e, applyLeftovers as B, applyPlanText as ve, applyText as V, attachOrphan as ye, baseName as be, busyProps as H, candidateText as xe, checkLine as Se, confirmModal as U, cx as Ce, deletePerformerVideos as we, entityDisplayName as Te, entityFaceImg as Ee, entityPath as De, errorMessage as W, esc as Oe, fetchDeletePerformers as ke, fetchDeletePlan as Ae, fetchDuplicates as je, fetchJunkSummary as Me, fetchLinkCheck as Ne, fetchLinkPrune as Pe, fetchLinkStats as Fe, fetchMediaRepair as Ie, fetchMediaSources as Le, fetchOrganize as Re, fetchOrganizeExample as ze, fetchOrphanRecords as Be, fetchQualityGoals as Ve, fetchRepairLibraries as He, fetchResourceApply as Ue, fetchResourceScan as We, fetchReviewCounts as Ge, fetchTrashSummary as Ke, firstGrapheme as qe, fmtSize as G, hasChanges as Je, hasResourceRoots as Ye, junkBreakdown as Xe, missingToolText as Ze, nameFallback as Qe, organizeOutcome as $e, pickOrganizeFolder as et, plainStatClass as K, planSummary as tt, previewOrganize as nt, pruneText as rt, purgeCount as it, purgeOrphan as at, queryClient as q, recordsText as ot, rememberTemplates as st, require_jsx_runtime as ct, require_react as lt, reviewSummary as ut, scanLine as dt, shellNavigate as ft, sourceMeta as pt, spriteGlyph as J, startLinkCheck as mt, startLinkPrune as ht, startOrganize as gt, startResourceApply as _t, startResourceScan as vt, statusLine as yt, useAction as bt, useBackgroundJob as Y, useEntityNames as xt, useMutation as St, useQuery as X, withOrganizeJob as Ct } from "./peach-app.js";
import { Page as wt } from "./peach-app.page-QAncjzM1.js";
import { ErrorExcerpt as Tt } from "./peach-app.error-excerpt-CigKESNN.js";
import { DataTable as Et } from "./peach-app.data-table-DChrkEud.js";
import { SiteMark as Dt } from "./peach-app.site-mark-D_VlIyJz.js";
import { LEGACY_AVATAR_IMG as Ot } from "./peach-app.legacy-avatar-NSITxLRS.js";
import { FolderSearchIcon as kt } from "./peach-app.folder-rows-c6xBdYCX.js";
import { ConnectionStatus as At } from "./peach-app.connection-status-B0tSnjj0.js";
// src/react/data-cleanup/cleanup-entry-card.tsx
var Z = /* @__PURE__ */ he(lt(), 1), Q = ct(), jt = J("chevron-right");
function Mt({ label: e, icon: t, summary: r, detail: i, state: a, attributes: o, onOpen: s }) {
	return /* @__PURE__ */ (0, Q.jsxs)("button", {
		type: "button",
		...o,
		className: n.face,
		onClick: s,
		"data-entry-state": a,
		"aria-busy": a === "loading" || void 0,
		children: [
			/* @__PURE__ */ (0, Q.jsx)("span", {
				"aria-hidden": !0,
				className: n.icon,
				children: /* @__PURE__ */ (0, Q.jsx)(t, {
					"aria-hidden": !0,
					className: "size-5"
				})
			}),
			/* @__PURE__ */ (0, Q.jsxs)("span", {
				className: n.body,
				children: [
					/* @__PURE__ */ (0, Q.jsx)("span", {
						className: n.title,
						children: e
					}),
					/* @__PURE__ */ (0, Q.jsx)("span", {
						className: Ce(n.summary, a === "error" && "text-text-error-primary"),
						children: r
					}),
					i ? /* @__PURE__ */ (0, Q.jsx)("span", {
						className: n.detail,
						children: i
					}) : null
				]
			}),
			/* @__PURE__ */ (0, Q.jsx)(jt, {
				"aria-hidden": !0,
				className: n.arrow
			})
		]
	});
}
// src/react/media-repair/media-repair-card.tsx
var Nt = (e) => w[e] || e, Pt = (e) => q.setQueryData(x, e);
function Ft({ toast: e = () => {} }) {
	let n = Y({
		queryKey: x,
		queryFn: ({ signal: e }) => Ie(e),
		start: (e) => ge(S, {
			library: e,
			restart: !0
		}),
		onFinish: (t) => {
			t.status === "complete" && !t.failed && !t.missing_tool && e(t.repaired ? `Repaired ${t.repaired.toLocaleString()} videos` : "Library checked; no videos need repair");
		}
	}), r = X({
		queryKey: oe,
		queryFn: ({ signal: e }) => He(e)
	}), [i, a] = (0, Z.useState)(""), o = bt(), s = n.job ?? d, c = r.data ?? [], f = s.status === "running", p = c.find((e) => e.id === (f ? s.library : i)) ?? c.find((e) => e.id === s.library) ?? c[0], m = () => {
		p && U({
			title: `Repair library "${p.name}"`,
			body: "Videos missing a timestamp table get a repaired header saved as a copy, leaving the original untouched; videos missing an index have it rebuilt to replace the original. Broken originals are renamed to a hidden file in the same directory (.filename.peach-original) and kept. " + (p.metered ? "This library sits on a metered source, and every repair pulls the whole video down again." : ""),
			confirmLabel: "Repair library",
			onConfirm: async () => {
				await n.start.mutateAsync(p.id);
			}
		});
	}, h = () => void o.run("stop", (e) => ge(S, { stop: !0 }, "POST", e), Pt), g = n.outcome, _ = yt(f ? s : g ?? d), v = o.error || g?.error || (n.query.error ? "The media repair state cannot be read" : "");
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, Q.jsx)(l, {
			layout: "split",
			label: "Media repair",
			footer: /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)(ue, {
				"aria-label": "Media library",
				prefix: "Media library",
				className: "w-48",
				selectedKey: p?.id ?? null,
				isDisabled: f || !c.length,
				onSelectionChange: (e) => {
					e !== null && a(String(e));
				},
				children: c.map((e) => /* @__PURE__ */ (0, Q.jsxs)(de, {
					id: e.id,
					textValue: e.name,
					children: [/* @__PURE__ */ (0, Q.jsx)(fe, { mark: Nt(e.icon) }), e.name]
				}, e.id))
			}), f ? /* @__PURE__ */ (0, Q.jsx)(t, {
				onClick: h,
				...H(o.busy === "stop"),
				children: "Stop"
			}) : /* @__PURE__ */ (0, Q.jsx)(t, {
				onClick: m,
				disabled: !p,
				children: "Start repair"
			})] }),
			children: /* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, Q.jsx)(u, { children: "Media repair" }),
					/* @__PURE__ */ (0, Q.jsx)("p", {
						className: "text-body-2-regular text-text-secondary",
						children: M
					}),
					f && s.total ? /* @__PURE__ */ (0, Q.jsx)(j, {
						label: "Repair progress",
						value: s.checked,
						max: s.total
					}) : null,
					_ ? /* @__PURE__ */ (0, Q.jsx)("p", {
						role: "status",
						className: "text-caption-1-regular text-text-secondary",
						children: _
					}) : null
				]
			})
		}), /* @__PURE__ */ (0, Q.jsxs)("div", {
			"aria-live": "polite",
			className: "flex flex-col gap-4 empty:hidden",
			children: [g?.status === "complete" && g.missing_tool ? /* @__PURE__ */ (0, Q.jsx)(T, {
				tone: "warning",
				title: "untrunc is missing",
				action: /* @__PURE__ */ (0, Q.jsx)(t, {
					variant: "ghost",
					size: "small",
					onClick: n.dismiss,
					children: "Dismiss the note"
				}),
				children: Ze(g)
			}) : null, v ? /* @__PURE__ */ (0, Q.jsx)(T, {
				tone: "error",
				children: v
			}) : null]
		})]
	});
}
// src/react/data-cleanup/link-check-icon.tsx
function It({ className: e }) {
	return /* @__PURE__ */ (0, Q.jsxs)("svg", {
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
			/* @__PURE__ */ (0, Q.jsx)("path", { d: "m18.84 12.25 1.72-1.71h-.02a5.004 5.004 0 0 0-.12-7.07 5.006 5.006 0 0 0-6.95 0l-1.72 1.71" }),
			/* @__PURE__ */ (0, Q.jsx)("path", { d: "m5.17 11.75-1.71 1.71a5.004 5.004 0 0 0 .12 7.07 5.006 5.006 0 0 0 6.95 0l1.71-1.71" }),
			/* @__PURE__ */ (0, Q.jsxs)("g", {
				"data-link-check-rays": "",
				children: [
					/* @__PURE__ */ (0, Q.jsx)("path", { d: "M8 2v3" }),
					/* @__PURE__ */ (0, Q.jsx)("path", { d: "M2 8h3" }),
					/* @__PURE__ */ (0, Q.jsx)("path", { d: "M16 19v3" }),
					/* @__PURE__ */ (0, Q.jsx)("path", { d: "M19 16h3" })
				]
			})
		]
	});
}
// src/react/data-cleanup/link-manager.tsx
var Lt = J("rotate-cw"), Rt = "The site returned 404 or 410, confirming this address does not exist.", zt = "Sites refusing programmatic access or a one-off glitch land here. Links are kept; select and retry individually.", Bt = "Each entry is re-verified once before deletion; this cannot be undone.", Vt = "Progress could not be read for the moment; reconnecting…", Ht = (e) => Number(e || 0).toLocaleString();
function Ut({ label: e, value: t, note: n }) {
	return /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: "flex min-w-0 flex-col gap-0.5",
		children: [
			/* @__PURE__ */ (0, Q.jsx)("span", {
				className: "text-caption-1-regular leading-5 text-text-secondary",
				children: e
			}),
			/* @__PURE__ */ (0, Q.jsx)("b", {
				className: "text-title-2-semibold font-bold leading-5 tabular-nums text-text-primary",
				children: t
			}),
			n ? /* @__PURE__ */ (0, Q.jsx)("small", {
				className: "text-caption-1-regular leading-5 text-text-secondary",
				children: n
			}) : null
		]
	});
}
function Wt({ title: e, items: t, hint: n, picked: r, onPick: i, children: a, footer: o, confirmed: s = !1 }) {
	return t.length ? /* @__PURE__ */ (0, Q.jsx)("div", {
		className: I,
		"data-link-results": s ? "gone" : "unclear",
		children: /* @__PURE__ */ (0, Q.jsx)(Et, {
			label: e,
			items: t,
			columns: [
				{
					id: "entity",
					label: "Peach profile",
					width: 180,
					min: 128,
					value: (e) => e.entity,
					render: (e) => /* @__PURE__ */ (0, Q.jsxs)("a", {
						className: "flex min-w-24 items-center gap-2 text-text-secondary hover:text-text-primary hover:underline",
						href: e.entity_id && e.entity_kind ? De(e.entity_kind, e.entity, e.entity_id) : void 0,
						"data-link-identity": "",
						children: [/* @__PURE__ */ (0, Q.jsx)("span", {
							"data-link-avatar": "",
							className: `relative flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-background-quaternary-default text-caption-1-medium text-text-primary ${Ot}`,
							"aria-hidden": !0,
							dangerouslySetInnerHTML: { __html: `<span>${Oe(qe(e.entity))}</span>` + Ee({
								kind: e.entity_kind,
								id: e.entity_id,
								hasImage: e.face?.has_image,
								version: e.face?.image_version,
								focus: e.face?.avatar_focus,
								thumb: !0,
								mark: e.entity_kind === "studio" || e.entity_kind === "agency" ? e.id : null
							}) }
						}), /* @__PURE__ */ (0, Q.jsx)("span", {
							className: "min-w-0 wrap-anywhere",
							children: e.entity
						})]
					})
				},
				{
					id: "kind",
					label: "Kind",
					width: 128,
					value: (e) => v[e.link_kind] || e.link_kind,
					render: (e) => v[e.link_kind] || e.link_kind
				},
				{
					id: "label",
					label: "Link name",
					min: 128,
					value: (e) => e.label || "",
					render: (e) => /* @__PURE__ */ (0, Q.jsx)("span", {
						className: "flex min-w-24 items-center gap-2",
						"data-link-name": "",
						children: /* @__PURE__ */ (0, Q.jsx)("span", {
							className: "min-w-0 wrap-anywhere",
							children: e.label || new URL(e.url).hostname
						})
					})
				},
				{
					id: "note",
					label: "Results",
					width: 320,
					min: 192,
					value: (e) => e.note,
					render: (e) => /* @__PURE__ */ (0, Q.jsx)("div", {
						className: "min-w-0 w-full",
						"data-link-result": s ? "gone" : "unclear",
						children: /^(?:HTTP\s+)?[1-5]\d{2}$/.test(e.note.trim()) ? /* @__PURE__ */ (0, Q.jsx)(pe, {
							tone: s || /^(?:HTTP\s+)?5\d{2}$/.test(e.note.trim()) ? "error" : "warning",
							"data-link-code": "",
							children: e.note.trim()
						}) : /* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "flex flex-col items-start gap-1",
							children: [/* @__PURE__ */ (0, Q.jsx)(pe, {
								tone: s ? "error" : "warning",
								children: s ? "The address no longer works" : "Verdict not fetched"
							}), /* @__PURE__ */ (0, Q.jsx)(Tt, {
								text: e.note,
								className: "tabular-nums text-text-secondary"
							})]
						})
					})
				},
				{
					id: "url",
					label: "Address",
					width: 360,
					min: 180,
					value: (e) => e.url,
					render: (e) => /* @__PURE__ */ (0, Q.jsxs)("a", {
						href: e.url,
						target: "_blank",
						rel: "noopener noreferrer",
						title: e.url,
						"data-link-address": "",
						className: "flex min-w-0 items-center gap-1 text-text-secondary hover:text-text-primary",
						children: [
							/* @__PURE__ */ (0, Q.jsx)(Dt, { linkId: e.id }),
							/* @__PURE__ */ (0, Q.jsx)("span", {
								"data-middle-truncate": !0,
								className: "min-w-0 truncate",
								children: e.url
							}),
							/* @__PURE__ */ (0, Q.jsx)(me, {
								"aria-hidden": !0,
								className: "size-(--icon-inline) shrink-0"
							})
						]
					})
				}
			],
			rowId: (e) => String(e.id),
			description: n,
			unit: "links",
			panel: !1,
			footerActions: o,
			rowLabel: (e) => `${e.label || e.url} of ${e.entity}`,
			selected: r.map(String),
			onSelected: (e) => i(e.map(Number)),
			actions: () => a
		})
	}) : null;
}
function Gt() {
	let e = X({
		queryKey: g,
		queryFn: ({ signal: e }) => Fe(e)
	}), [n, r] = (0, Z.useState)([]), [i, a] = (0, Z.useState)([]), s = Y({
		queryKey: ee,
		queryFn: ({ signal: e }) => Pe(e),
		start: ht,
		onFinish: () => {
			q.invalidateQueries({
				queryKey: g,
				exact: !0
			}), q.invalidateQueries({
				queryKey: _,
				exact: !0
			});
		}
	}), c = Y({
		queryKey: _,
		queryFn: ({ signal: e }) => Ne(e),
		start: mt,
		onStarted: () => {
			s.dismiss(), r([]), a([]);
		}
	}), d = c.job, f = d?.check_id ?? "";
	(0, Z.useEffect)(() => {
		r([]), a([]);
	}, [f]);
	let p = c.running || c.start.isPending, m = s.running || s.start.isPending, h = d?.status === "complete", y = d?.gone ?? [], b = d?.unclear ?? [], x = h ? b : [], S = y.filter((e) => i.includes(e.id)).map((e) => e.id), C = x.filter((e) => n.includes(e.id)).map((e) => e.id), w = e.data, te = (w?.top_hosts ?? []).slice(0, 3), ne = (e) => {
		p || e && !e.length || c.start.mutate(e ? {
			retry: e,
			checkId: f
		} : {});
	}, re = (e) => {
		!m && y.length && U({
			title: "Delete dead links",
			body: `This deletes ${e?.length ?? y.length} dead link${(e?.length ?? y.length) === 1 ? "" : "s"}. ${(e?.length ?? y.length) === 1 ? "It is checked once more before deletion, and deletion cannot be undone." : "They are checked once more before deletion, and deletion cannot be undone."}`,
			confirmLabel: "Delete dead links",
			danger: !0,
			onConfirm: () => s.start.mutateAsync({
				checkId: f,
				ids: e
			})
		});
	}, E = s.outcome, D = c.start.error ?? s.start.error, O = null, k = null;
	if (E?.status === "failed") k = /* @__PURE__ */ (0, Q.jsx)(T, {
		tone: "error",
		title: "Link cleanup did not finish",
		children: E.error || "Check the task records to verify the processed links."
	});
	else if (E && !y.length && !b.length) k = /* @__PURE__ */ (0, Q.jsx)(T, {
		tone: "success",
		title: "Done",
		children: rt(E)
	});
	else if (D) k = /* @__PURE__ */ (0, Q.jsx)(T, {
		tone: "error",
		title: "Check failed",
		children: W(D)
	});
	else if (c.query.isError && d) k = /* @__PURE__ */ (0, Q.jsx)(T, {
		tone: "neutral",
		title: "Task state",
		children: Vt
	});
	else if (d?.status === "failed") k = /* @__PURE__ */ (0, Q.jsx)(T, {
		tone: "error",
		title: "Check failed",
		children: d.error || "Check failed"
	});
	else if (d && d.status !== "idle") {
		O = /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [d.status === "running" ? /* @__PURE__ */ (0, Q.jsx)(z, {
			embedded: !0,
			label: Se(d),
			value: Math.min(d.checked || 0, d.total || 0),
			total: d.total
		}) : null, m ? /* @__PURE__ */ (0, Q.jsx)(z, {
			embedded: !0,
			label: s.job?.message || "Re-verifying and deleting dead links",
			value: Math.min(s.job?.checked || 0, s.job?.total || 0),
			total: s.job?.total
		}) : null] });
		let e = `Retry selected now (${C.length})`;
		k = h || y.length || b.length ? /* @__PURE__ */ (0, Q.jsxs)("div", {
			className: F,
			children: [
				E?.status === "complete" ? /* @__PURE__ */ (0, Q.jsx)(T, {
					tone: "success",
					title: "Done",
					children: rt(E)
				}) : null,
				/* @__PURE__ */ (0, Q.jsx)(Wt, {
					title: "Address expired",
					items: y,
					hint: Rt,
					picked: i,
					onPick: a,
					confirmed: !0,
					footer: h && y.length ? /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)("p", {
						className: "mr-auto min-w-0 text-caption-1-regular text-text-secondary",
						children: Bt
					}), /* @__PURE__ */ (0, Q.jsx)(t, {
						variant: "danger",
						...H(m),
						onClick: () => re(),
						children: `Delete ${y.length} dead link${y.length === 1 ? "" : "s"}`
					})] }) : null,
					children: /* @__PURE__ */ (0, Q.jsx)(t, {
						variant: "danger",
						size: "small",
						disabled: !h || !S.length,
						...H(m),
						onClick: () => re(S),
						children: `Delete selected (${S.length})`
					})
				}),
				/* @__PURE__ */ (0, Q.jsx)(Wt, {
					title: "This visit did not succeed",
					items: b,
					hint: zt,
					picked: n,
					onPick: r,
					footer: x.length ? /* @__PURE__ */ (0, Q.jsx)(t, {
						variant: "primary",
						leadingIcon: Lt,
						...H(p),
						onClick: () => ne(x.map((e) => e.id)),
						children: `Retry all now (${x.length})`
					}) : null,
					children: x.length ? /* @__PURE__ */ (0, Q.jsx)(Q.Fragment, { children: /* @__PURE__ */ (0, Q.jsx)(t, {
						variant: "secondary",
						leadingIcon: Lt,
						disabled: !C.length,
						...H(p),
						onClick: () => ne(C),
						children: e
					}) }) : null
				}),
				h && !y.length && !b.length ? /* @__PURE__ */ (0, Q.jsx)("p", {
					className: `${I} text-body-regular text-notification-success-foreground`,
					children: "Every link is reachable."
				}) : null
			]
		}) : null;
	}
	return /* @__PURE__ */ (0, Q.jsxs)("section", {
		id: "link-manager",
		"aria-labelledby": "link-manager-title",
		className: "flex scroll-mt-20 flex-col gap-4",
		children: [/* @__PURE__ */ (0, Q.jsxs)(l, {
			layout: "stack",
			labelledBy: "link-manager-title",
			footer: /* @__PURE__ */ (0, Q.jsx)(t, {
				"data-link-check": "",
				leadingIcon: It,
				...H(p),
				onClick: () => ne(),
				children: p ? "Checking" : h ? "Check again" : "Check dead links"
			}),
			children: [
				/* @__PURE__ */ (0, Q.jsx)(u, {
					id: "link-manager-title",
					gap: "small",
					children: "Link management"
				}),
				e.isError ? /* @__PURE__ */ (0, Q.jsx)(T, {
					tone: "error",
					title: "Reading link statistics failed",
					children: W(e.error)
				}) : w ? /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsxs)("div", {
					className: "link-stat-grid mt-4 gap-x-8 gap-y-3",
					children: [/* @__PURE__ */ (0, Q.jsx)(Ut, {
						label: "Total links",
						value: Ht(w.total),
						note: `Spread across ${Ht(w.entities)} performers, studios, and series`
					}), Object.entries(w.by_kind ?? {}).map(([e, t]) => /* @__PURE__ */ (0, Q.jsx)(Ut, {
						label: v[e] || e,
						value: Ht(t)
					}, e))]
				}), te.length ? /* @__PURE__ */ (0, Q.jsxs)("div", {
					className: "mt-4 flex min-w-0 flex-col gap-0.5",
					children: [/* @__PURE__ */ (0, Q.jsx)("span", {
						className: "text-caption-1-regular text-text-secondary",
						children: "Main sites"
					}), /* @__PURE__ */ (0, Q.jsx)("div", {
						className: "flex min-w-0 flex-wrap gap-x-5 gap-y-2",
						children: te.map(([e, t]) => /* @__PURE__ */ (0, Q.jsxs)("span", {
							"data-top-host": "",
							className: "inline-flex min-w-0 max-w-full items-center gap-1.5",
							children: [/* @__PURE__ */ (0, Q.jsxs)("a", {
								href: `https://${e}`,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "inline-flex min-w-0 items-center gap-1.5 text-body-2-medium text-text-primary",
								children: [
									/* @__PURE__ */ (0, Q.jsx)(Dt, { linkId: w.top_host_link_ids?.[e] }),
									/* @__PURE__ */ (0, Q.jsx)("span", {
										className: "min-w-0 wrap-anywhere",
										children: e
									}),
									/* @__PURE__ */ (0, Q.jsx)(me, {
										"aria-hidden": !0,
										className: "size-(--icon-inline) shrink-0"
									})
								]
							}), /* @__PURE__ */ (0, Q.jsx)(o, {
								variant: "caption",
								color: "neutral",
								children: /* @__PURE__ */ (0, Q.jsx)("span", {
									className: "tabular-nums",
									children: Ht(t)
								})
							})]
						}, e))
					})]
				}) : null] }) : null,
				/* @__PURE__ */ (0, Q.jsx)("div", {
					"aria-live": "polite",
					className: "mt-4 flex flex-col gap-3 empty:hidden",
					children: O
				})
			]
		}), /* @__PURE__ */ (0, Q.jsx)("div", {
			"aria-live": "polite",
			className: "empty:hidden",
			children: k
		})]
	});
}
// src/react/data-cleanup/organize-card.tsx
var Kt = (e, t) => `Organize ${e}${t ? ` in ${t} and its subdirectories` : "'s file names and directories"}: clean up special symbols and garbled characters, and rename or move per the filled-in template. Rows whose target already exists are skipped whole. This batch can be reverted whole via "Roll back previous batch".`, qt = "This moves the files the last organize run touched back to their earlier names and locations, and the database paths follow. After reverting, this batch no longer appears here.", Jt = 8;
function Yt({ plan: e }) {
	return /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)("ol", {
		className: "mt-2 flex min-w-0 flex-col gap-1",
		children: e.rows.slice(0, Jt).map((e) => /* @__PURE__ */ (0, Q.jsxs)("li", {
			className: "flex min-w-0 items-center gap-2 text-caption-1-regular text-text-secondary",
			children: [
				/* @__PURE__ */ (0, Q.jsx)("span", {
					"data-middle-truncate": !0,
					title: e.current_path,
					className: "min-w-0 truncate",
					children: be(e.current_path)
				}),
				/* @__PURE__ */ (0, Q.jsx)("span", {
					"aria-hidden": !0,
					children: "→"
				}),
				/* @__PURE__ */ (0, Q.jsx)("span", {
					"data-middle-truncate": !0,
					title: e.target_path,
					className: "min-w-0 truncate text-text-primary",
					children: be(e.target_path)
				})
			]
		}, e.current_path))
	}), e.truncated || e.rows.length > Jt ? /* @__PURE__ */ (0, Q.jsx)("p", {
		className: "text-caption-1-regular text-text-secondary",
		children: "Only the first 8 rows are listed; the full plan is in the plan CSV."
	}) : null] });
}
function Xt({ toast: e, failure: n }) {
	let r = X({
		queryKey: te,
		queryFn: ({ signal: e }) => Re(e)
	}), i = r.data, a = i?.locations ?? [], [o, c] = (0, Z.useState)(""), d = a.some((e) => e.location === o) ? o : a[0]?.location ?? "", p = i?.templates?.[d], [h, g] = (0, Z.useState)(null), _ = h?.location === d ? h : {
		location: d,
		file: p?.file ?? "",
		dir: p?.dir ?? ""
	}, v = (e) => {
		g({
			..._,
			...e
		}), N.reset();
	}, [ee, b] = (0, Z.useState)({
		location: "",
		path: ""
	}), x = ee.location === d ? ee.path : "", S = (0, Z.useRef)({
		location: d,
		path: x
	});
	S.current = {
		location: d,
		path: x
	};
	let [C, D] = (0, Z.useState)(null), O = (0, Z.useRef)(null), k = (0, Z.useRef)(null), ie = (0, Z.useRef)(null), A = X({
		queryKey: [
			"organize-example",
			_.file,
			_.dir
		],
		queryFn: ({ signal: e }) => ze(_.file, _.dir, e),
		enabled: !!i
	}), [j, ae] = (0, Z.useState)("file"), M = (0, Z.useRef)(!1), oe = (0, Z.useRef)(null);
	(0, Z.useLayoutEffect)(() => {
		let e = oe.current;
		if (!e) return;
		oe.current = null;
		let t = (e.field === "file" ? O : k).current;
		t?.focus(), t?.setSelectionRange(e.caret, e.caret);
	});
	let se = () => ({
		location: d,
		path: x.trim(),
		file_template: _.file.trim(),
		dir_template: _.dir.trim()
	}), N = St({
		mutationFn: nt,
		onError: (e) => {
			let t = /Organize路径/.test(W(e)) ? "path" : s.test(W(e)) ? "dir" : "file";
			D(t), (t === "path" ? ie : t === "dir" ? k : O).current?.focus();
		}
	}), P = St({
		mutationFn: ({ initial: e }) => et(e),
		onSuccess: (e, t) => {
			e.path && t.location === S.current.location && t.path === S.current.path && (b({
				location: t.location,
				path: e.path
			}), D(null), N.reset(), ie.current?.focus());
		}
	}), F = Y({
		queryKey: te,
		queryFn: ({ signal: e }) => Re(e),
		start: gt,
		jobOf: (e) => e,
		withJob: Ct,
		onStarted: () => N.reset(),
		onFinish: (t) => {
			if (q.invalidateQueries({
				queryKey: te,
				exact: !0
			}), t.status !== "complete") return;
			let { text: r, failed: i } = $e(t);
			i ? n("Organize files", /* @__PURE__ */ Error(`${i} rows could not be processed`)) : e(r.replace(/.$/, ""));
		}
	}), I = F.running || F.start.isPending, ce = JSON.stringify(N.variables) === JSON.stringify(se()), L = ce ? N.data : void 0, le = Number(L?.counts?.change || 0), pe = y[d] || d, R = (e) => {
		v(e), D(null), N.reset();
	}, me = (e) => {
		let t = (j === "file" ? O : k).current, n = _[j], r = M.current ? t?.selectionStart ?? n.length : n.length, i = M.current ? t?.selectionEnd ?? r : r, a = `{${e}}`;
		oe.current = {
			field: j,
			caret: r + a.length
		}, R({ [j]: n.slice(0, r) + a + n.slice(i) });
	}, he = () => {
		N.isPending || I || !d || (F.dismiss(), F.start.reset(), D(null), N.mutate(se()));
	}, ge = () => {
		let e = N.variables;
		e && L && le && U({
			title: "Organize files",
			body: Kt(pe, e.path),
			confirmLabel: "Organize files",
			onConfirm: async () => {
				await F.start.mutateAsync({
					kind: "apply",
					request: e
				}), st({
					...i?.templates ?? {},
					[e.location]: {
						file: e.file_template,
						dir: e.dir_template
					}
				});
			}
		});
	}, _e = () => void U({
		title: "Roll back the previous organize batch",
		body: qt,
		confirmLabel: "Roll back organizing",
		onConfirm: () => F.start.mutateAsync({ kind: "rollback" })
	}), B = null, ve = !!le && !I && !F.outcome, V = F.job, ye = F.outcome;
	if (V?.status === "running") {
		let e = V.message || V.stage || "Organizing files";
		B = /* @__PURE__ */ (0, Q.jsx)(z, {
			embedded: !0,
			label: e,
			value: Math.min(V.checked || 0, V.total || 0),
			total: V.total
		});
	} else if (ye?.status === "failed") B = /* @__PURE__ */ (0, Q.jsx)(T, {
		tone: "error",
		title: "File organizing did not finish",
		children: ye.error || "Check the task records to verify the processed files."
	});
	else if (ye) {
		let { text: e, failed: t } = $e(ye);
		B = /* @__PURE__ */ (0, Q.jsx)(T, {
			tone: t ? "warning" : "success",
			title: t ? "Partially finished" : "Organize results",
			children: e
		});
	} else F.start.isError ? B = /* @__PURE__ */ (0, Q.jsx)(T, {
		tone: "error",
		title: "Organizing failed",
		children: W(F.start.error)
	}) : N.isPending ? B = /* @__PURE__ */ (0, Q.jsx)(z, {
		embedded: !0,
		label: "Verifying the organize plan"
	}) : N.isError && ce ? B = /* @__PURE__ */ (0, Q.jsx)(T, {
		tone: "error",
		title: "Organize preview failed",
		children: W(N.error)
	}) : L && (B = /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)(T, {
		tone: "neutral",
		title: "Preview results",
		children: tt(L)
	}), le ? /* @__PURE__ */ (0, Q.jsx)(Yt, { plan: L }) : null] }));
	return /* @__PURE__ */ (0, Q.jsxs)(l, {
		layout: "stack",
		id: "organize",
		labelledBy: "cleanup-organize-title",
		attributes: { "data-cleanup-organize": "" },
		footer: /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [
			i?.last_batch ? /* @__PURE__ */ (0, Q.jsx)(t, {
				variant: "secondary",
				...H(I),
				onClick: _e,
				children: "Roll back last batch"
			}) : null,
			/* @__PURE__ */ (0, Q.jsx)(t, {
				variant: ve ? "secondary" : "primary",
				disabled: !a.length || I,
				...H(N.isPending),
				onClick: he,
				children: "Preview"
			}),
			ve ? /* @__PURE__ */ (0, Q.jsx)(t, {
				variant: "primary",
				onClick: ge,
				children: "Run organizing"
			}) : null
		] }),
		children: [
			/* @__PURE__ */ (0, Q.jsx)(u, {
				id: "cleanup-organize-title",
				gap: "medium",
				children: "Organize"
			}),
			/* @__PURE__ */ (0, Q.jsx)("p", {
				className: "text-body-regular text-text-secondary",
				children: E
			}),
			r.isError ? /* @__PURE__ */ (0, Q.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, Q.jsx)(T, {
					tone: "error",
					title: "Reading organize configuration failed",
					children: W(r.error)
				})
			}) : null,
			/* @__PURE__ */ (0, Q.jsxs)("div", {
				className: "mt-3 flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, Q.jsxs)("div", {
						"data-organize-scope": !0,
						className: "flex min-w-0 flex-wrap items-start gap-2",
						children: [a.length ? /* @__PURE__ */ (0, Q.jsx)(ue, {
							"aria-label": "Which source to organize",
							prefix: "Source",
							className: "w-fit min-w-25",
							selectedKey: d || null,
							onSelectionChange: (e) => {
								e !== null && (c(String(e)), b({
									location: String(e),
									path: ""
								}), D(null), N.reset(), P.reset(), M.current = !1);
							},
							children: a.map((e) => /* @__PURE__ */ (0, Q.jsxs)(de, {
								id: e.location,
								textValue: y[e.location] || e.location,
								children: [/* @__PURE__ */ (0, Q.jsx)(fe, { mark: w[e.location] || "database" }), y[e.location] || e.location]
							}, e.location))
						}) : null, /* @__PURE__ */ (0, Q.jsxs)("div", {
							className: "flex min-w-0 basis-64 flex-1 items-start gap-2",
							children: [/* @__PURE__ */ (0, Q.jsx)(m, {
								"aria-label": "Organize path",
								className: "min-w-0 flex-1",
								placeholder: "Leave empty to organize the whole source",
								name: "organize-path",
								autoComplete: "off",
								spellCheck: "false",
								value: x,
								ref: ie,
								isInvalid: C === "path",
								onChange: (e) => {
									b({
										location: d,
										path: e
									}), D(null), N.reset(), P.reset();
								}
							}), /* @__PURE__ */ (0, Q.jsx)(f, {
								icon: kt,
								"aria-label": "Choose the organize path",
								...H(P.isPending),
								onClick: () => P.mutate({
									initial: x || a.find((e) => e.location === d)?.roots[0] || "",
									location: d,
									path: x
								})
							})]
						})]
					}),
					/* @__PURE__ */ (0, Q.jsx)("p", {
						className: "text-caption-1-regular text-text-secondary",
						children: re
					}),
					P.isError ? /* @__PURE__ */ (0, Q.jsxs)(T, {
						tone: "error",
						title: "目录选择失败",
						children: [W(P.error), "；也可直接输入路径。"]
					}) : null,
					/* @__PURE__ */ (0, Q.jsx)(m, {
						label: "文件名模板",
						placeholder: "{code}[ {title}]",
						value: _.file,
						ref: O,
						spellCheck: "false",
						isInvalid: C === "file",
						onFocus: () => {
							ae("file"), M.current = !0;
						},
						onChange: (e) => R({ file: e })
					}),
					/* @__PURE__ */ (0, Q.jsx)(m, {
						label: "Folder template",
						placeholder: "Leave empty to rename in place",
						value: _.dir,
						ref: k,
						spellCheck: "false",
						isInvalid: C === "dir",
						onFocus: () => {
							ae("dir"), M.current = !0;
						},
						onChange: (e) => R({ dir: e })
					}),
					i?.presets?.length ? /* @__PURE__ */ (0, Q.jsxs)("div", {
						className: "flex flex-col gap-2",
						role: "group",
						"aria-label": "Apply template",
						children: [/* @__PURE__ */ (0, Q.jsx)("p", {
							className: "text-caption-1-medium text-text-secondary",
							children: "Apply template"
						}), /* @__PURE__ */ (0, Q.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: i.presets.map((e) => /* @__PURE__ */ (0, Q.jsx)(t, {
								variant: "secondary",
								size: "small",
								title: e.example || e.label,
								className: "max-w-full [&>span]:min-w-0 [&>span]:shrink",
								onClick: () => {
									R({
										file: e.file,
										dir: e.dir
									}), M.current = !1;
								},
								children: /* @__PURE__ */ (0, Q.jsx)("span", {
									className: "truncate",
									children: e.label
								})
							}, e.label))
						})]
					}) : null,
					/* @__PURE__ */ (0, Q.jsxs)("p", {
						"aria-live": "polite",
						"aria-busy": A.isFetching,
						"data-organize-example": "",
						className: "text-caption-1-regular text-text-secondary",
						children: ["Path example:", /* @__PURE__ */ (0, Q.jsx)("code", {
							className: "wrap-anywhere",
							children: A.data?.example || A.data?.error || (A.isError ? W(A.error) : "Previewing…")
						})]
					}),
					i?.placeholders?.length ? /* @__PURE__ */ (0, Q.jsxs)("div", {
						className: "flex flex-col gap-2",
						role: "group",
						"aria-label": "Insert parameters",
						children: [/* @__PURE__ */ (0, Q.jsxs)("p", {
							className: "text-caption-1-regular text-text-secondary",
							"aria-live": "polite",
							children: [
								/* @__PURE__ */ (0, Q.jsx)("strong", {
									className: "text-caption-1-semibold text-text-primary",
									children: "Insert parameters"
								}),
								" (into ",
								j === "file" ? "File name template" : "Folder template",
								"）"
							]
						}), /* @__PURE__ */ (0, Q.jsx)("div", {
							className: "flex flex-wrap gap-1",
							children: i.placeholders.map((e) => /* @__PURE__ */ (0, Q.jsx)(t, {
								variant: "ghost",
								size: "small",
								"aria-label": `${e.label} {${e.key}}`,
								onClick: () => me(e.key),
								children: /* @__PURE__ */ (0, Q.jsxs)("span", {
									className: "inline-flex flex-wrap items-center gap-x-1.5",
									children: [/* @__PURE__ */ (0, Q.jsx)("code", { children: `{${e.key}}` }), /* @__PURE__ */ (0, Q.jsx)("span", {
										className: "text-text-secondary",
										children: e.label
									})]
								})
							}, e.key))
						})]
					}) : null,
					/* @__PURE__ */ (0, Q.jsx)("p", {
						className: "text-caption-1-regular leading-4.5 text-text-secondary",
						children: ne
					})
				]
			}),
			/* @__PURE__ */ (0, Q.jsx)("div", {
				"aria-live": "polite",
				className: "mt-3 flex flex-col gap-2 empty:hidden",
				children: B
			})
		]
	});
}
// src/react/data-cleanup/orphan-records-card.tsx
var Zt = J("play"), Qt = () => q.invalidateQueries({
	queryKey: D,
	exact: !0
});
function $t({ item: e, toast: n }) {
	let [r, i] = (0, Z.useState)(e.candidates[0]?.id ?? null), a = St({
		mutationFn: () => ye(e.id, Number(r)),
		onSuccess: () => {
			let t = e.candidates.find((e) => e.id === r);
			n(`Moved the personal records of "${e.name}" to "${t?.name ?? "the selected files"}"`), Qt();
		},
		onError: (e) => n(W(e))
	}), o = St({
		mutationFn: () => at(e.id),
		onSuccess: (t) => {
			n(t.blocked.length ? `Files of "${e.name}" were restored, records not deleted; the next scan returns them to in-library status` : `Deleted the video record and personal records of "${e.name}"`), Qt();
		}
	}), s = () => {
		U({
			title: "Delete records",
			body: `Will delete the video records of "${e.name}"${ot(e.records) ? ` and their personal records (${ot(e.records)})` : ""}. This cannot be undone.`,
			confirmLabel: "Delete records",
			danger: !0,
			onConfirm: () => o.mutateAsync()
		});
	}, c = a.isPending || o.isPending;
	return /* @__PURE__ */ (0, Q.jsxs)("span", {
		className: "flex min-w-0 flex-wrap items-center gap-2",
		children: [
			/* @__PURE__ */ (0, Q.jsx)(t, {
				variant: "danger",
				size: "small",
				...H(c),
				onClick: s,
				children: "Delete records"
			}),
			e.candidates.length ? /* @__PURE__ */ (0, Q.jsx)(ue, {
				"aria-label": `Choose the file to receive ${e.name}'s personal records`,
				prefix: "Receive",
				className: "w-52",
				selectedKey: r,
				onSelectionChange: (e) => {
					e !== null && i(Number(e));
				},
				children: e.candidates.map((e) => /* @__PURE__ */ (0, Q.jsx)(de, {
					id: e.id,
					textValue: xe(e),
					children: xe(e)
				}, e.id))
			}) : null,
			e.candidates.length ? /* @__PURE__ */ (0, Q.jsx)(t, {
				variant: "primary",
				size: "small",
				disabled: r === null,
				...H(c),
				onClick: () => a.mutate(),
				children: "Move records"
			}) : null
		]
	});
}
function en({ item: e }) {
	return /* @__PURE__ */ (0, Q.jsxs)("span", {
		className: "flex min-w-0 items-center gap-3",
		children: [/* @__PURE__ */ (0, Q.jsxs)("span", {
			className: "relative inline-grid aspect-16/10 w-24 flex-none place-items-center max-cleanup-tight:hidden overflow-hidden rounded-lg border border-separator-border bg-background-tertiary-default text-text-tertiary",
			children: [/* @__PURE__ */ (0, Q.jsx)(Zt, {
				"aria-hidden": !0,
				className: "size-5"
			}), e.has_thumb ? /* @__PURE__ */ (0, Q.jsx)("img", {
				src: `/thumb?id=${e.id}&c=4`,
				alt: "",
				loading: "lazy",
				onError: (e) => e.currentTarget.remove(),
				className: "absolute inset-0 size-full object-contain"
			}) : null]
		}), /* @__PURE__ */ (0, Q.jsxs)("span", {
			className: "flex min-w-0 flex-1 flex-col gap-0.5",
			children: [/* @__PURE__ */ (0, Q.jsx)("span", {
				title: e.name,
				className: "truncate text-body-regular text-text-primary",
				children: e.name
			}), /* @__PURE__ */ (0, Q.jsx)("small", {
				className: "truncate text-caption-1-regular text-text-secondary",
				children: [e.code, y[e.location] || e.location].filter(Boolean).join(" · ")
			})]
		})]
	});
}
function tn({ toast: e }) {
	let [n, r] = (0, Z.useState)([]), i = X({
		queryKey: D,
		queryFn: ({ signal: e }) => Be(e)
	}), a = i.data?.items ?? [], o = St({
		mutationFn: (e) => at(e),
		onSuccess: (t) => {
			e(`Deleted ${t.purged} video ${t.purged === 1 ? "record" : "records"} and ${t.purged === 1 ? "its" : "their"} personal records${t.blocked.length ? `; ${t.blocked.length} file${t.blocked.length === 1 ? " was" : "s were"} restored, records not deleted` : ""}`), r([]), Qt();
		}
	}), s = (e) => void U({
		title: "Delete selected records",
		body: `Will delete the following ${e.length} video records and all their personal records. This cannot be undone.`,
		items: e.map((e) => e.name),
		confirmLabel: "Delete selected records",
		danger: !0,
		onConfirm: () => o.mutateAsync(e.map((e) => e.id))
	}), c = [
		{
			id: "item",
			label: "Videos",
			width: 480,
			min: 320,
			value: (e) => e.name,
			render: (e) => /* @__PURE__ */ (0, Q.jsx)(en, { item: e })
		},
		{
			id: "records",
			label: "Personal records",
			width: 176,
			min: 144,
			value: (e) => ot(e.records),
			render: (e) => /* @__PURE__ */ (0, Q.jsx)("span", {
				className: "block min-w-0 whitespace-normal wrap-anywhere",
				children: ot(e.records) || "none"
			})
		},
		{
			id: "target",
			label: "Actions",
			width: a.some((e) => e.candidates.length) ? 360 : 128,
			min: 128,
			value: (e) => e.candidates.length,
			render: (t) => /* @__PURE__ */ (0, Q.jsx)($t, {
				item: t,
				toast: e
			})
		}
	];
	return /* @__PURE__ */ (0, Q.jsx)("section", {
		id: "orphan-records",
		"aria-labelledby": "orphan-records-title",
		className: "flex scroll-mt-20 flex-col gap-4",
		children: i.isError ? /* @__PURE__ */ (0, Q.jsxs)(l, {
			layout: "stack",
			labelledBy: "orphan-records-title",
			children: [/* @__PURE__ */ (0, Q.jsx)(u, {
				id: "orphan-records-title",
				children: "Records with missing files"
			}), /* @__PURE__ */ (0, Q.jsx)(T, {
				tone: "error",
				title: "Failed to read records whose files are lost",
				children: W(i.error)
			})]
		}) : /* @__PURE__ */ (0, Q.jsx)(Et, {
			label: "文件已消失的作品",
			items: a,
			columns: c,
			title: "文件已丢失的记录",
			titleId: "orphan-records-title",
			unit: "条作品",
			description: O,
			rowId: (e) => String(e.id),
			rowLabel: (e) => e.name,
			selected: n,
			onSelected: r,
			actions: (e) => /* @__PURE__ */ (0, Q.jsx)(t, {
				variant: "danger",
				size: "small",
				disabled: !e.length,
				...H(o.isPending),
				onClick: () => s(e),
				children: `Delete selected records (${e.length})`
			})
		})
	});
}
// src/react/data-cleanup/performer-delete-card.tsx
function nn({ person: e }) {
	let t = Te("performer", e.k, e.entity_id), n = Qe("performer", e.k, e.entity_id);
	return /* @__PURE__ */ (0, Q.jsxs)("a", {
		href: De("performer", e.k, e.entity_id),
		title: n || t,
		className: "flex min-w-0 items-center gap-3 text-text-primary",
		children: [/* @__PURE__ */ (0, Q.jsx)("span", {
			"aria-hidden": !0,
			className: Ce("relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-background-quaternary-default text-caption-1-medium", Ot),
			dangerouslySetInnerHTML: { __html: `<span>${Oe(qe(t))}</span>` + Ee({
				kind: "performer",
				id: e.entity_id,
				hasImage: e.has_image,
				version: e.image_version,
				focus: e.avatar_focus,
				thumb: !0
			}) }
		}), /* @__PURE__ */ (0, Q.jsx)("span", {
			className: "min-w-0 wrap-anywhere",
			children: t
		})]
	});
}
function rn({ toast: n }) {
	xt();
	let r = X({
		queryKey: k,
		queryFn: ({ signal: e }) => ke(e)
	}), [i, a] = (0, Z.useState)([]), [o, s] = (0, Z.useState)(""), [c, d] = (0, Z.useState)(!1), [f, m] = (0, Z.useState)(null), [h, g] = (0, Z.useState)(""), _ = (0, Z.useRef)(null);
	(0, Z.useEffect)(() => () => _.current?.abort(), []);
	let v = (0, Z.useMemo)(() => [
		{
			id: "name",
			label: "女优",
			width: 280,
			min: 160,
			value: (e) => e.k,
			render: (e) => /* @__PURE__ */ (0, Q.jsx)(nn, { person: e })
		},
		{
			id: "works",
			label: "影片",
			width: 104,
			min: 80,
			value: (e) => e.n,
			render: (e) => `${e.n.toLocaleString()} 部`
		},
		{
			id: "files",
			label: "文件",
			width: 104,
			min: 80,
			value: (e) => e.file_count,
			render: (e) => `${e.file_count.toLocaleString()} 个`
		},
		{
			id: "bytes",
			label: "登记大小",
			width: 136,
			min: 104,
			value: (e) => e.bytes,
			render: (e) => G(e.bytes)
		}
	], []), ee = o.toLocaleLowerCase(), y = (r.data?.items || []).filter((e) => !ee || [
		e.k,
		Te("performer", e.k, e.entity_id),
		...e.aliases
	].some((e) => e.toLocaleLowerCase().includes(ee))), b = async (e, t) => {
		if (c) return;
		d(!0), g("");
		let r = new AbortController();
		_.current = r;
		try {
			let i = await Ae(e.map((e) => e.entity_id), r.signal);
			if (r.signal.throwIfAborted(), !i.total) {
				n("所选女优没有可删除的影片");
				return;
			}
			let a = i.performers.map((e) => Te("performer", e.name, e.id)), o = [...new Set(i.items.map((e) => e.code || e.name || `#${e.id}`))], s = await U({
				title: "删除所选女优的全部影片",
				body: `将永久删除 ${a.slice(0, 5).join("、")}${a.length > 5 ? `等 ${a.length} 位女优` : ""} 关联的 ${i.total} 个影片文件（登记大小 ${G(i.bytes)}）。范围包含全部来源和回收站，不受当前搜索、排序或分页影响。文件、影片资料和观看记录将永久删除，无法恢复；女优档案和照片保留。` + (i.shared ? `其中 ${i.shared} 个文件还关联了未勾选的女优，删除后也会从她们的作品中消失。` : "") + `涉及：${o.slice(0, 5).join("、")}${o.length > 5 ? `等 ${o.length} 部作品` : ""}。`,
				confirmLabel: "永久删除影片",
				danger: !0,
				onConfirm: () => we(i)
			});
			if (!s.confirmed) return;
			let c = s.result;
			m(c), t(), await Promise.all([q.invalidateQueries({
				queryKey: k,
				exact: !0
			}), q.invalidateQueries({
				queryKey: R,
				exact: !0
			})]), n(`已永久删除 ${c.purged} 个影片文件${c.blocked.length ? `，${c.blocked.length} 个未删除` : ""}`);
		} catch (e) {
			r.signal.aborted || g(W(e));
		} finally {
			r.signal.aborted || d(!1);
		}
	}, x = f ? [
		...f.blocked,
		...f.cleanup_pending,
		...f.cache_blocked.map((e) => ({
			path: e.name,
			reason: e.reason
		}))
	] : [];
	return /* @__PURE__ */ (0, Q.jsxs)("section", {
		id: "batch-delete",
		className: "flex min-w-0 scroll-mt-20 flex-col gap-3",
		"aria-label": "批量删除",
		children: [
			r.isPending || r.isError ? /* @__PURE__ */ (0, Q.jsxs)(l, {
				layout: "stack",
				labelledBy: "batch-delete-title",
				children: [/* @__PURE__ */ (0, Q.jsx)(u, {
					id: "batch-delete-title",
					children: "批量删除"
				}), r.isError ? /* @__PURE__ */ (0, Q.jsx)(T, {
					tone: "error",
					title: "读取女优列表失败",
					action: /* @__PURE__ */ (0, Q.jsx)(t, {
						variant: "secondary",
						size: "small",
						onClick: () => void r.refetch(),
						children: "重试"
					}),
					children: W(r.error)
				}) : /* @__PURE__ */ (0, Q.jsx)("p", {
					role: "status",
					className: "text-body-regular text-text-secondary",
					children: "正在读取女优列表…"
				})]
			}) : /* @__PURE__ */ (0, Q.jsx)(Et, {
				label: "女优影片",
				title: "批量删除",
				titleId: "batch-delete-title",
				unit: "位女优",
				description: e,
				items: y,
				columns: v,
				rowId: (e) => String(e.entity_id),
				rowLabel: (e) => Te("performer", e.k, e.entity_id),
				selected: i,
				onSelected: a,
				toolbarActions: /* @__PURE__ */ (0, Q.jsx)(p, {
					label: "搜索女优姓名或别名",
					value: o,
					onQuery: (e) => {
						s(e), a([]);
					}
				}),
				actions: (e, n) => /* @__PURE__ */ (0, Q.jsx)(t, {
					variant: "danger",
					size: "small",
					...H(c),
					onClick: () => void b(e, n),
					children: "删除所选女优影片"
				})
			}),
			h ? /* @__PURE__ */ (0, Q.jsx)(T, {
				tone: "error",
				title: "未能读取删除清单",
				children: h
			}) : null,
			f ? /* @__PURE__ */ (0, Q.jsx)(T, {
				tone: x.length ? "warning" : "info",
				title: `已永久删除 ${f.purged} 个影片文件`,
				extra: x.length ? /* @__PURE__ */ (0, Q.jsx)("div", {
					className: "flex flex-col gap-2 text-body-2-regular wrap-anywhere",
					children: x.slice(0, 5).map((e, t) => /* @__PURE__ */ (0, Q.jsxs)("p", { children: [
						e.path,
						"（",
						e.reason,
						"）"
					] }, t))
				}) : null,
				children: x.length ? `${f.blocked.length} 个文件未能删除，馆藏记录仍保留；${f.cleanup_pending.length} 个隔离文件和 ${f.cache_blocked.length} 个缓存文件待清理。` : "所选影片及关联记录已删除，女优档案和照片保留。"
			}) : null
		]
	});
}
// src/react/data-cleanup/resource-sync-card.tsx
var an = J("git-compare"), on = J("rotate-cw"), sn = "Progress could not be read for the moment; reconnecting…", cn = "Clean up stale entries", ln = "inline-grid w-full grid-flow-col auto-cols-fr gap-4 max-plain-stat-pair:grid-flow-row max-plain-stat-pair:grid-cols-2 max-plain-stat-single:grid-cols-1", $ = (e) => Number(e || 0).toLocaleString();
function un({ scan: e, partial: t = !1 }) {
	let n = e.cache ?? {
		files: 0,
		bytes: 0
	};
	return /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)("div", {
		className: ln,
		children: (e.sources ?? []).map((e) => /* @__PURE__ */ (0, Q.jsxs)("article", {
			className: K(),
			children: [/* @__PURE__ */ (0, Q.jsx)(A, {
				label: L[e.location] || "Media sources",
				mark: /* @__PURE__ */ (0, Q.jsx)(fe, { mark: w[e.location] ?? "database" }),
				aside: /* @__PURE__ */ (0, Q.jsx)(At, {
					online: e.online,
					children: e.online ? "Accessible" : "Offline"
				}),
				figure: e.online ? `${$(e.missing)} items` : "—",
				meta: e.online ? pt(e) : `${pt(e)} · skipped this run`,
				wrapMeta: !0
			}), e.online && e.unreadable > 0 ? /* @__PURE__ */ (0, Q.jsx)("span", {
				className: "self-start",
				children: /* @__PURE__ */ (0, Q.jsxs)(pe, {
					tone: "warning",
					children: [$(e.unreadable), " directories not read"]
				})
			}) : null]
		}, e.location))
	}), !t && /* @__PURE__ */ (0, Q.jsxs)("div", {
		className: ln,
		children: [
			/* @__PURE__ */ (0, Q.jsx)("article", {
				className: K(),
				children: /* @__PURE__ */ (0, Q.jsx)(A, {
					label: "Pending permanent deletion",
					figure: `${$(it(e))} items`,
					meta: "Files no longer on disk, trash included"
				})
			}),
			/* @__PURE__ */ (0, Q.jsx)("article", {
				className: K(),
				children: /* @__PURE__ */ (0, Q.jsx)(A, {
					label: "Will be marked as vanished",
					figure: `${$(e.vanish)} items`,
					meta: "Carries personal records; the records stay"
				})
			}),
			/* @__PURE__ */ (0, Q.jsx)("article", {
				className: K(),
				children: /* @__PURE__ */ (0, Q.jsx)(A, {
					label: "Empty folders",
					figure: `${$(e.empty)} items`,
					meta: "Keep source roots"
				})
			}),
			/* @__PURE__ */ (0, Q.jsx)("article", {
				className: K(),
				children: /* @__PURE__ */ (0, Q.jsx)(A, {
					label: "Cleanable caches",
					figure: `${$(n.files)} items`,
					meta: n.files ? G(n.bytes) : ""
				})
			})
		]
	})] });
}
function dn({ toast: e }) {
	let n = Y({
		queryKey: se,
		queryFn: ({ signal: e }) => Ue(e),
		start: _t,
		onFinish: (t) => {
			if (q.invalidateQueries({
				queryKey: R,
				exact: !0
			}), q.invalidateQueries({
				queryKey: N,
				exact: !0
			}), t.status !== "complete") return;
			let { done: n, left: r } = B(t);
			r ? e(`Completed ${$(n)} items, ${$(r)} items not processed`, { warning: !0 }) : e("Cleaned dead entries");
		}
	}), r = Y({
		queryKey: N,
		queryFn: ({ signal: e }) => We(e),
		start: vt,
		onStarted: () => n.dismiss()
	}), i = r.job, a = r.running || r.start.isPending, o = n.running || n.start.isPending, s = i?.status === "complete" || i?.status === "failed", c = a ? "Scanning" : s ? "Rescan" : "Check files", d = (e) => void U({
		title: cn,
		body: _e(e),
		confirmLabel: cn,
		danger: !0,
		onConfirm: () => n.start.mutateAsync(e.scan_id || "")
	}), f = n.outcome, p = (e) => {
		let t = B(e).left > 0;
		return /* @__PURE__ */ (0, Q.jsx)(T, {
			tone: t ? "warning" : "success",
			title: t ? "Partially finished" : "Cleanup results",
			children: V(e, G)
		});
	}, m = null, h = null;
	if (f?.status === "failed") h = /* @__PURE__ */ (0, Q.jsx)(T, {
		tone: "error",
		title: "Resource cleanup did not finish",
		children: f.error || "Check the task records to verify the processed files."
	});
	else if (f) h = p(f);
	else if (n.running) m = /* @__PURE__ */ (0, Q.jsx)(z, {
		embedded: !0,
		label: n.job?.message || "Reviewing and cleaning dead entries"
	});
	else if (r.start.isError) h = /* @__PURE__ */ (0, Q.jsx)(T, {
		tone: "error",
		title: "Scan failed",
		children: W(r.start.error)
	});
	else if (r.query.isError && i) h = /* @__PURE__ */ (0, Q.jsx)(T, {
		tone: "neutral",
		title: "Task state",
		children: sn
	});
	else if (i?.status === "running") {
		let e = dt(i);
		m = /* @__PURE__ */ (0, Q.jsx)(z, {
			embedded: !0,
			label: e,
			value: i.completed_sources,
			total: i.total_sources
		}), i.sources?.length && (h = /* @__PURE__ */ (0, Q.jsx)(un, {
			scan: i,
			partial: !0
		}));
	} else if (i?.status === "failed") h = /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [i.sources?.length ? /* @__PURE__ */ (0, Q.jsx)(un, {
		scan: i,
		partial: !0
	}) : null, /* @__PURE__ */ (0, Q.jsx)(T, {
		tone: "error",
		title: "Scan failed",
		children: i.error || "The background scan failed"
	})] });
	else if (i?.status === "complete" && i.applied) h = n.job?.status === "complete" ? p(n.job) : /* @__PURE__ */ (0, Q.jsx)(T, {
		tone: "neutral",
		title: "Cleanup results",
		children: "This check's results have been cleaned up; rescanning re-checks them."
	});
	else if (i?.status === "complete") {
		let e = Je(i);
		h = /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [/* @__PURE__ */ (0, Q.jsx)(un, { scan: i }), e ? /* @__PURE__ */ (0, Q.jsx)(T, {
			tone: "neutral",
			title: "Clean content",
			action: /* @__PURE__ */ (0, Q.jsx)(t, {
				variant: "danger",
				...H(o),
				onClick: () => d(i),
				children: o ? "Reviewing and cleaning…" : cn
			}),
			children: ve(i)
		}) : /* @__PURE__ */ (0, Q.jsx)("p", {
			className: "mr-auto text-body-regular text-notification-success-foreground",
			children: "Reachable sources checked; no records, empty folders, or caches waiting for cleanup."
		})] });
	}
	return n.start.isError && !f && (h = /* @__PURE__ */ (0, Q.jsxs)(Q.Fragment, { children: [h, /* @__PURE__ */ (0, Q.jsx)(T, {
		tone: "error",
		title: "Cleanup failed",
		children: W(n.start.error)
	})] })), /* @__PURE__ */ (0, Q.jsxs)("section", {
		id: "resource-sync",
		"aria-labelledby": "resource-sync-title",
		className: "flex scroll-mt-20 flex-col gap-4",
		children: [/* @__PURE__ */ (0, Q.jsxs)(l, {
			layout: "split",
			labelledBy: "resource-sync-title",
			footer: /* @__PURE__ */ (0, Q.jsx)(t, {
				"data-resource-scan": !0,
				leadingIcon: s && !a ? on : an,
				...H(a),
				onClick: () => {
					a || r.start.mutate();
				},
				children: c
			}),
			children: [
				/* @__PURE__ */ (0, Q.jsx)(u, {
					id: "resource-sync-title",
					gap: "small",
					children: "Resource sync"
				}),
				/* @__PURE__ */ (0, Q.jsx)("p", {
					className: "max-w-190 text-body-2-regular leading-5 text-text-secondary",
					children: P
				}),
				/* @__PURE__ */ (0, Q.jsx)("div", {
					"aria-live": "polite",
					className: "mt-4 empty:hidden",
					children: m
				})
			]
		}), /* @__PURE__ */ (0, Q.jsx)("div", {
			"aria-live": "polite",
			className: "flex flex-col gap-4 empty:hidden",
			children: h
		})]
	});
}
// src/react/data-cleanup/data-cleanup-tool-page.tsx
function fn({ toast: e }) {
	let t = X({
		queryKey: C,
		queryFn: ({ signal: e }) => Le(e)
	});
	return t.isError ? /* @__PURE__ */ (0, Q.jsx)(T, {
		tone: "error",
		title: "读取媒体来源失败",
		children: W(t.error)
	}) : t.isPending ? /* @__PURE__ */ (0, Q.jsx)("p", {
		role: "status",
		children: "正在读取媒体来源…"
	}) : Ye(t.data) ? /* @__PURE__ */ (0, Q.jsx)(dn, { toast: e }) : /* @__PURE__ */ (0, Q.jsxs)(l, {
		layout: "stack",
		label: "资源同步",
		children: [
			/* @__PURE__ */ (0, Q.jsx)(u, { children: "资源同步" }),
			/* @__PURE__ */ (0, Q.jsx)("p", {
				className: "text-body-regular text-text-secondary",
				children: "尚未配置可核对的媒体目录。"
			}),
			/* @__PURE__ */ (0, Q.jsx)("a", {
				href: "/settings/library",
				className: "text-body-medium text-accent-600 underline",
				children: "配置媒体库"
			})
		]
	});
}
function pn({ tool: e, toast: t, failure: n }) {
	let r = (e) => t(e), i;
	switch (e) {
		case "organize":
			i = /* @__PURE__ */ (0, Q.jsx)(Xt, {
				toast: r,
				failure: n
			});
			break;
		case "resource-sync":
			i = /* @__PURE__ */ (0, Q.jsx)(fn, { toast: t });
			break;
		case "orphan-records":
			i = /* @__PURE__ */ (0, Q.jsx)(tn, { toast: r });
			break;
		case "media-repair":
			i = /* @__PURE__ */ (0, Q.jsx)(Ft, { toast: r });
			break;
		case "links":
			i = /* @__PURE__ */ (0, Q.jsx)(Gt, {});
			break;
		case "batch-delete": i = /* @__PURE__ */ (0, Q.jsx)(rn, { toast: r });
	}
	return /* @__PURE__ */ (0, Q.jsx)(wt, { children: i });
}
// src/react/data-cleanup/data-cleanup-page.tsx
function mn(e, t) {
	return e.data === void 0 ? e.isError ? {
		figure: "读取失败",
		state: "error"
	} : {
		figure: "正在读取…",
		state: "loading"
	} : t(e.data);
}
function hn({ section: e, label: t, icon: n, value: r, open: i }) {
	return /* @__PURE__ */ (0, Q.jsx)("button", {
		type: "button",
		className: K({ interactive: !0 }),
		"data-cleanup-go": e,
		"data-entry-state": r.state,
		"aria-busy": r.state === "loading" || void 0,
		onClick: () => i(e),
		children: /* @__PURE__ */ (0, Q.jsx)(A, {
			label: t,
			icon: n,
			figure: r.figure,
			meta: r.meta
		})
	});
}
function gn({ tool: e, navigate: t }) {
	let n = J(e.icon);
	return /* @__PURE__ */ (0, Q.jsx)(Mt, {
		label: e.title,
		icon: n,
		summary: e.description,
		attributes: { "data-cleanup-tool": e.key },
		onOpen: () => t(e.path + location.search)
	});
}
var _n = J("square-check-big"), vn = J("sparkles"), yn = J("file-stack"), bn = J("file-archive"), xn = J("trash"), Sn = () => {
	for (let e of [
		ce,
		ae,
		c,
		h
	]) q.invalidateQueries({
		queryKey: e,
		exact: !0
	});
};
function Cn({ toast: e, open: t, navigate: n }) {
	let o = X({
		queryKey: ce,
		queryFn: ({ signal: e }) => Ge(e)
	}), s = X({
		queryKey: ae,
		queryFn: ({ signal: e }) => Ve(e)
	}), l = X({
		queryKey: c,
		queryFn: ({ signal: e }) => je(e)
	}), u = X({
		queryKey: h,
		queryFn: ({ signal: e }) => Me(e)
	}), d = X({
		queryKey: R,
		queryFn: ({ signal: e }) => Ke(e)
	});
	return (0, Z.useEffect)(() => {
		let e = i[location.hash];
		e && ft(e + location.search, { replace: !0 });
	}, []), /* @__PURE__ */ (0, Q.jsxs)(wt, { children: [
		/* @__PURE__ */ (0, Q.jsxs)("section", {
			"aria-labelledby": "cleanup-pending",
			className: "flex flex-col gap-4",
			children: [/* @__PURE__ */ (0, Q.jsx)(le, {
				id: "cleanup-pending",
				children: "待处理事项"
			}), /* @__PURE__ */ (0, Q.jsxs)("div", {
				className: ie,
				children: [
					/* @__PURE__ */ (0, Q.jsx)(hn, {
						section: "review",
						label: "人工复核",
						icon: _n,
						open: t,
						value: mn(o, ut)
					}),
					/* @__PURE__ */ (0, Q.jsx)(hn, {
						section: "duplicates",
						label: "重复文件",
						icon: yn,
						open: t,
						value: mn(l, (e) => Number(e.total || 0) ? {
							figure: `${Number(e.total).toLocaleString()} 组 · ${Number(e.files || 0).toLocaleString()} 个文件`,
							meta: `可回收 ${G(e.reclaimable || 0)}`
						} : { figure: "没有重复内容" })
					}),
					/* @__PURE__ */ (0, Q.jsx)(hn, {
						section: "ads",
						label: "垃圾文件",
						icon: bn,
						open: t,
						value: mn(u, (e) => ({
							figure: `${Number(e.pending_total || 0).toLocaleString()} 个待判断`,
							meta: Xe(e)
						}))
					}),
					/* @__PURE__ */ (0, Q.jsx)(hn, {
						section: "quality",
						label: "高清版",
						icon: vn,
						open: t,
						value: mn(s, (e) => ({ figure: `${Number(e.total || 0).toLocaleString()} 个待升级` }))
					}),
					/* @__PURE__ */ (0, Q.jsx)(hn, {
						section: "trash",
						label: "回收站",
						icon: xn,
						open: t,
						value: mn(d, (e) => ({
							figure: `${Number(e.total || 0).toLocaleString()} 项在回收站`,
							meta: e.total ? `占用 ${G(e.bytes || 0)}` : "查看和还原已移入回收站的内容"
						}))
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, Q.jsx)("div", {
			id: "libraryProcessing",
			className: "scroll-mt-20",
			children: /* @__PURE__ */ (0, Q.jsx)(b, {
				toast: (t) => e(t),
				monitor: !0,
				onComplete: Sn
			})
		}),
		/* @__PURE__ */ (0, Q.jsxs)("section", {
			"aria-labelledby": "cleanup-maintenance",
			className: "flex flex-col gap-4",
			children: [/* @__PURE__ */ (0, Q.jsx)(le, {
				id: "cleanup-maintenance",
				children: "整理与维护"
			}), /* @__PURE__ */ (0, Q.jsx)("div", {
				className: r,
				children: a.filter((e) => e.key !== "batch-delete").map((e) => /* @__PURE__ */ (0, Q.jsx)(gn, {
					tool: e,
					navigate: n
				}, e.key))
			})]
		}),
		/* @__PURE__ */ (0, Q.jsxs)("section", {
			"aria-labelledby": "cleanup-deletion",
			className: "flex flex-col gap-4",
			children: [/* @__PURE__ */ (0, Q.jsx)(le, {
				id: "cleanup-deletion",
				children: "清理与删除"
			}), /* @__PURE__ */ (0, Q.jsx)("div", {
				className: r,
				children: a.filter((e) => e.key === "batch-delete").map((e) => /* @__PURE__ */ (0, Q.jsx)(gn, {
					tool: e,
					navigate: n
				}, e.key))
			})]
		})
	] });
}
export { Cn as DataCleanupPage, pn as DataCleanupToolPage };

//# debugId=69a46918-6cb7-46f5-ad69-1081b6644c29