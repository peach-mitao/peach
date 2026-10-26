(function() {
	try {
		var e = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "287d949a-afd5-4449-afed-898680b65442", e._sentryDebugIdIdentifier = "sentry-dbid-287d949a-afd5-4449-afed-898680b65442");
	} catch {}
})();
import { Button as e, Chip as t, Disclosure as n, DownloadsPanel as r, EmptyState as i, LinkButton as a, LoadingDots as o, Note as s, Progress as c, TASKS_KEY as l, TRIGGER_LABELS as u, __toESM as d, apiGet as f, apiSend as p, busyProps as m, cardClass as h, elapsedText as g, errorMessage as _, f1 as v, fetchEarlier as y, fetchTasks as b, foldRoutine as x, followupDetail as S, groupFollowups as C, hasResultProblems as w, i2 as T, isActive as E, isRoutine as D, latestOfKind as ee, mergeFinished as O, momentText as k, pollInterval as A, problemDestination as j, progressText as M, require_jsx_runtime as N, require_react as P, statusLabel as F, summaryItems as I, taskIssues as L, uo as R, useMutation as z, useQuery as B, useQueryClient as V } from "./peach-app.js";
import { CodeBlock as H } from "./peach-app.code-block-CyDva4Ms.js";
import { Page as U } from "./peach-app.page-QAncjzM1.js";
import { ErrorDetails as W, ErrorExcerpt as G } from "./peach-app.error-excerpt-B8v2xEIP.js";
// src/react/activity/background-issues.tsx
var K = /* @__PURE__ */ d(P(), 1), q = N(), J = ["background-issues"];
function te() {
	let e = (0, K.useId)(), t = B({
		queryKey: J,
		queryFn: ({ signal: e }) => f("/api/background-issues", e),
		refetchInterval: 3e4
	}).data?.issues || [];
	return t.length ? /* @__PURE__ */ (0, q.jsxs)("section", {
		"aria-labelledby": e,
		className: "flex min-w-0 flex-col gap-3",
		children: [/* @__PURE__ */ (0, q.jsx)("h3", {
			id: e,
			className: "text-title-2-medium text-text-primary",
			children: "需要处理"
		}), /* @__PURE__ */ (0, q.jsx)("ul", {
			className: "flex min-w-0 flex-col gap-3",
			children: t.map((e) => /* @__PURE__ */ (0, q.jsx)("li", { children: /* @__PURE__ */ (0, q.jsx)(ne, { issue: e }) }, e.key))
		})]
	}) : null;
}
function ne({ issue: t }) {
	let n = V(), r = z({
		mutationFn: () => p(t.retry, {}),
		onSuccess: () => {
			n.invalidateQueries({ queryKey: J });
		}
	}), i = t.since ? `自 ${k(t.since)} 起` : `发现于 ${k(t.noticed_at)}`;
	return /* @__PURE__ */ (0, q.jsx)(s, {
		tone: "error",
		title: t.title,
		action: /* @__PURE__ */ (0, q.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2",
			children: [/* @__PURE__ */ (0, q.jsx)(a, {
				href: t.href,
				size: "small",
				trailingIcon: T,
				children: t.link_label
			}), t.retry ? /* @__PURE__ */ (0, q.jsx)(e, {
				variant: "secondary",
				size: "small",
				disabled: !t.retry_available,
				...m(r.isPending),
				onClick: () => r.mutate(),
				children: "立即重试"
			}) : null]
		}),
		children: r.error ? `${i}\n没有重试：${_(r.error)}` : i
	});
}
// src/react/activity/activity-page.tsx
var re = {
	succeeded: "lime",
	failed: "rose",
	cancelled: "neutral",
	interrupted: "yellow",
	running: "blue",
	pending: "neutral"
};
function Y({ run: e }) {
	let n = e.status === "failed" && e.task_key === "library-processing" && e.result_summary?.outcome === "partial", r = n || e.status === "succeeded" && w(e);
	return /* @__PURE__ */ (0, q.jsx)(t, {
		color: r ? "yellow" : re[e.status] ?? "neutral",
		children: n ? "部分项目需处理" : r ? "发现问题" : F(e.status)
	});
}
function ie({ rows: e }) {
	return /* @__PURE__ */ (0, q.jsx)("ul", {
		className: "flex min-w-0 flex-col",
		children: e.map((e) => {
			let t = S(e);
			return /* @__PURE__ */ (0, q.jsxs)("li", {
				"data-status": e.status,
				"data-followup-key": e.followup_key,
				className: "flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 border-t border-separator-border px-5 py-2.5",
				children: [
					/* @__PURE__ */ (0, q.jsx)("span", {
						className: "min-w-0 break-words text-caption-1-regular text-text-primary",
						children: e.task_label
					}),
					/* @__PURE__ */ (0, q.jsx)(Y, { run: e }),
					t ? /* @__PURE__ */ (0, q.jsx)("span", {
						className: "min-w-0 break-words text-caption-1-regular text-text-secondary",
						children: t
					}) : null,
					/* @__PURE__ */ (0, q.jsx)("div", {
						className: "w-full min-w-0",
						children: /* @__PURE__ */ (0, q.jsx)(n, {
							summary: "技术详情",
							contentClassName: "pb-2.5",
							children: /* @__PURE__ */ (0, q.jsx)(H, {
								code: JSON.stringify(e.result_summary, null, 2),
								language: "json",
								label: `${e.task_label}技术详情`
							})
						})
					})
				]
			}, e.id);
		})
	});
}
function X({ run: e, meta: t, children: r, footer: i, followups: a }) {
	return /* @__PURE__ */ (0, q.jsxs)("li", {
		id: `run-${e.id}`,
		"data-status": e.status,
		"data-task-key": e.task_key,
		"data-run-id": e.id,
		className: h({
			padding: "none",
			bordered: "line",
			className: e.status === "failed" ? "flex flex-col border-border-error-default" : "flex flex-col"
		}),
		children: [
			/* @__PURE__ */ (0, q.jsxs)("div", {
				className: "flex flex-col gap-1.5 px-5 pt-5 pb-4",
				children: [
					/* @__PURE__ */ (0, q.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, q.jsx)("strong", {
							className: "min-w-0 break-words text-title-1-medium text-text-primary",
							children: e.task_label
						}), /* @__PURE__ */ (0, q.jsx)(Y, { run: e })]
					}),
					/* @__PURE__ */ (0, q.jsx)("p", {
						className: "text-caption-1-regular text-text-secondary",
						children: t
					}),
					r
				]
			}),
			a?.length ? /* @__PURE__ */ (0, q.jsx)("div", {
				className: "border-t border-separator-border px-5 py-2.5",
				children: /* @__PURE__ */ (0, q.jsx)(n, {
					summary: `任务明细 · ${a.length} 项`,
					contentClassName: "pb-2.5",
					defaultOpen: a.some((e) => E(e)),
					children: /* @__PURE__ */ (0, q.jsx)(ie, { rows: a })
				})
			}) : null,
			Object.keys(e.result_summary || {}).length ? /* @__PURE__ */ (0, q.jsx)("div", {
				className: "border-t border-separator-border px-5 py-2.5",
				children: /* @__PURE__ */ (0, q.jsx)(n, {
					summary: "技术详情",
					contentClassName: "pb-2.5",
					children: /* @__PURE__ */ (0, q.jsx)(H, {
						code: JSON.stringify(e.result_summary, null, 2),
						language: "json",
						label: `${e.task_label}技术详情`
					})
				})
			}) : null,
			i ? /* @__PURE__ */ (0, q.jsx)("div", {
				className: "flex min-h-14 flex-col justify-center rounded-b-2xl border-t border-separator-border bg-card-footer px-5 py-3",
				children: /* @__PURE__ */ (0, q.jsx)(G, {
					text: i,
					className: "text-caption-1-regular text-text-secondary"
				})
			}) : null
		]
	});
}
function ae({ run: e, followups: t }) {
	let n = e.progress_total || 0, r = e.progress_current || 0, i = e.progress_label || "正在进行", a = g(e.elapsed_seconds), s = [u[e.trigger] || e.trigger, a && `已跑 ${a}`].filter(Boolean).join(" · ");
	return /* @__PURE__ */ (0, q.jsx)(X, {
		run: e,
		meta: s,
		followups: t,
		children: n > 0 ? /* @__PURE__ */ (0, q.jsxs)("div", {
			className: "flex flex-col gap-1.5",
			children: [/* @__PURE__ */ (0, q.jsx)(c, {
				label: i,
				value: Math.min(r, n),
				max: n
			}), /* @__PURE__ */ (0, q.jsxs)("p", {
				className: "text-caption-1-regular text-text-secondary wrap-anywhere",
				children: [
					i,
					" · ",
					M(r, n),
					" 项"
				]
			})]
		}) : /* @__PURE__ */ (0, q.jsx)(o, { label: i })
	});
}
function Z({ run: e, followups: t, runs: r, latest: i }) {
	let o = I(e.result_summary).filter((t) => t !== e.error), s = L(e), c = j(e, i), l = g(e.elapsed_seconds), d = r && r.length > 1 ? r[r.length - 1] : void 0, f = (d ? [
		u[e.trigger] || e.trigger,
		`近 ${r.length} 轮`,
		`${k(d.finished_at)} – ${k(e.finished_at)}`
	] : [
		u[e.trigger] || e.trigger,
		k(e.finished_at),
		l && `用时 ${l}`
	]).filter(Boolean).join(" · ");
	return /* @__PURE__ */ (0, q.jsxs)(X, {
		run: e,
		meta: f,
		footer: e.error,
		followups: t,
		children: [
			o.length ? /* @__PURE__ */ (0, q.jsx)("ul", {
				className: "list-disc space-y-1 pl-5 text-caption-1-regular text-text-secondary wrap-anywhere",
				children: o.map((e, t) => /* @__PURE__ */ (0, q.jsx)("li", { children: e }, t))
			}) : null,
			s.length ? /* @__PURE__ */ (0, q.jsx)(n, {
				summary: `问题详情 · ${s.length} 项`,
				contentClassName: "pt-2",
				children: /* @__PURE__ */ (0, q.jsx)(W, {
					label: "任务问题详情",
					children: /* @__PURE__ */ (0, q.jsx)("ul", {
						className: "flex min-w-0 flex-col gap-3",
						"data-task-issues": "",
						children: s.map((e, t) => /* @__PURE__ */ (0, q.jsxs)("li", {
							className: "flex min-w-0 flex-col gap-1 text-body-2-regular wrap-anywhere",
							children: [/* @__PURE__ */ (0, q.jsx)("p", {
								className: "text-body-regular text-text-primary",
								children: [
									e.label,
									e.provider,
									e.kind
								].filter(Boolean).join(" · ")
							}), /* @__PURE__ */ (0, q.jsx)(G, {
								text: e.error,
								className: "text-text-primary"
							})]
						}, `${e.source}-${t}`))
					})
				})
			}) : w(e) && ["follow-check", "feed-check"].includes(e.task_key) ? /* @__PURE__ */ (0, q.jsx)("p", {
				className: "text-body-2-regular text-text-secondary",
				children: "未取得本轮逐项详情，可到来源列表查看检查结果。"
			}) : null,
			c ? /* @__PURE__ */ (0, q.jsx)(a, {
				href: c.href,
				size: "small",
				trailingIcon: T,
				className: "self-start",
				children: c.label
			}) : null
		]
	});
}
function Q({ title: e, children: t }) {
	let n = (0, K.useId)();
	return /* @__PURE__ */ (0, q.jsxs)("section", {
		"aria-labelledby": n,
		className: "flex min-w-0 flex-col gap-3",
		children: [/* @__PURE__ */ (0, q.jsx)("h3", {
			id: n,
			className: "text-title-2-medium text-text-primary",
			children: e
		}), t]
	});
}
function $({ live: e = !1, children: t }) {
	return /* @__PURE__ */ (0, q.jsx)("ul", {
		"aria-live": e ? "polite" : void 0,
		className: "flex min-w-0 flex-col gap-3",
		children: t
	});
}
function oe() {
	let t = B({
		queryKey: l,
		queryFn: ({ signal: e }) => b(e),
		refetchInterval: (e) => A(e.state.data)
	}), n = t.data, a = n?.finished, [o, c] = (0, K.useState)([]), [u, d] = (0, K.useState)(!1), [f, p] = (0, K.useState)(a);
	a !== f && (p(a), o.length && f && c(O(o, f)));
	let h = z({
		mutationFn: ({ oldest: e }) => y(e),
		onSuccess: (e, { shown: t }) => {
			c((n) => O(n, t, e.finished || [])), d(!!e.finished_has_more);
		}
	}), g = t.error ? _(t.error) : "";
	if (!n) return /* @__PURE__ */ (0, q.jsx)(U, { children: /* @__PURE__ */ (0, q.jsx)(s, {
		tone: "error",
		children: g || "读取任务中心失败"
	}) });
	let S = O(n.finished || [], o), w = [
		...n.running || [],
		...n.skipped || [],
		...S
	], T = C(w), k = new Set(w.map((e) => e.id)), j = (e) => e.filter((e) => !(e.followup_key && e.parent_run_id != null && k.has(e.parent_run_id))), M = j(S), N = M[M.length - 1], P = !!N && (o.length ? u : !!n.finished_has_more), F = () => {
		!h.isPending && N && h.mutate({
			oldest: N,
			shown: S
		});
	}, I = M.filter((e) => T.get(e.id)?.some(E)), L = j(n.running || []), V = j(n.skipped || []), H = M.filter((e) => !I.includes(e) && !V.some((t) => t.id === e.id)), W = x(H, (e) => D(e) && !T.get(e.id)?.length), G = ee(w), J = !L.length && !I.length && !V.length && !H.length;
	return /* @__PURE__ */ (0, q.jsxs)(U, { children: [
		g ? /* @__PURE__ */ (0, q.jsx)(s, {
			tone: "error",
			children: g
		}) : null,
		n.available === !1 ? /* @__PURE__ */ (0, q.jsx)(s, {
			tone: "warning",
			children: n.message || "数据库尚未准备好任务记录表"
		}) : null,
		/* @__PURE__ */ (0, q.jsx)(te, {}),
		J ? /* @__PURE__ */ (0, q.jsx)(i, {
			icon: R,
			title: "还没有任务记录",
			children: "扫描、追更检查、批量操作和命令行批处理跑起来之后，这里会显示它们的进度与结果。"
		}) : /* @__PURE__ */ (0, q.jsxs)(q.Fragment, { children: [
			/* @__PURE__ */ (0, q.jsx)(Q, {
				title: "正在进行",
				children: L.length || I.length ? /* @__PURE__ */ (0, q.jsxs)($, {
					live: !0,
					children: [L.map((e) => /* @__PURE__ */ (0, q.jsx)(ae, {
						run: e,
						followups: T.get(e.id)
					}, e.id)), I.map((e) => /* @__PURE__ */ (0, q.jsx)(Z, {
						run: e,
						latest: G.has(e.id),
						followups: T.get(e.id)
					}, e.id))]
				}) : /* @__PURE__ */ (0, q.jsx)(s, {
					tone: "neutral",
					children: "没有任务在跑。"
				})
			}),
			V.length ? /* @__PURE__ */ (0, q.jsx)(Q, {
				title: "本次未执行",
				children: /* @__PURE__ */ (0, q.jsx)($, { children: V.map((e) => /* @__PURE__ */ (0, q.jsx)(Z, {
					run: e,
					latest: G.has(e.id),
					followups: T.get(e.id)
				}, e.id)) })
			}) : null,
			H.length || P ? /* @__PURE__ */ (0, q.jsxs)(Q, {
				title: "最近完成",
				children: [
					H.length ? /* @__PURE__ */ (0, q.jsx)($, { children: W.map(({ run: e, runs: t }) => /* @__PURE__ */ (0, q.jsx)(Z, {
						run: e,
						runs: t,
						latest: G.has(e.id),
						followups: T.get(e.id)
					}, e.id)) }) : null,
					h.error ? /* @__PURE__ */ (0, q.jsx)(s, {
						tone: "error",
						children: _(h.error)
					}) : null,
					P ? /* @__PURE__ */ (0, q.jsx)(e, {
						variant: "secondary",
						size: "small",
						leadingIcon: v,
						className: "self-start",
						...m(h.isPending),
						onClick: F,
						children: "加载更早"
					}) : null
				]
			}) : null
		] }),
		/* @__PURE__ */ (0, q.jsx)(r, {})
	] });
}
export { oe as ActivityPage };

//# debugId=287d949a-afd5-4449-afed-898680b65442