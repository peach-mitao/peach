(function() {
	try {
		var e = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "8e9e1cb5-03c5-4ce3-b108-ebddd7e0ce3d", e._sentryDebugIdIdentifier = "sentry-dbid-8e9e1cb5-03c5-4ce3-b108-ebddd7e0ce3d");
	} catch {}
})();
import { Button as e, Bx as t, Chip as n, Disclosure as r, DownloadsPanel as i, EmptyState as a, Gg as o, HN as s, IssueRow as c, LinkButton as l, Lo as u, LoadingDots as d, Ma as f, NameLink as p, Note as m, OV as h, Pf as g, Progress as _, RB as v, Rk as y, Su as b, TASKS_KEY as ee, TRIGGER_LABELS as x, Xl as S, __toESM as C, apiGet as w, apiSend as T, busyProps as E, cardClass as te, confirmModal as D, controlTask as O, cx as k, elapsedText as A, errorMessage as j, f1 as ne, fetchEarlier as re, fetchTasks as ie, fmtSize as M, foldByKind as ae, foldRoutine as oe, followupDetail as N, followupDetailLong as P, followupTally as F, groupFollowups as se, hasResultProblems as I, i2 as L, isActive as R, isRoutine as ce, latestOfKind as le, mergeFinished as z, momentText as B, notifyManager as V, oe as H, pollInterval as ue, problemDestination as de, progressText as U, readableErrorHeadline as W, replaceEqualDeep as fe, require_jsx_runtime as pe, require_react as me, statusLabel as he, summaryItems as ge, taskIssues as _e, taskSubject as ve, um as ye, uo as be, useMutation as G, useQuery as xe, useQueryClient as K, vl as Se } from "./peach-app.js";
import { CodeBlock as Ce } from "./peach-app.code-block-6TfoDGLR.js";
import { Page as we } from "./peach-app.page-QAncjzM1.js";
import { ErrorDetails as Te, ErrorExcerpt as Ee } from "./peach-app.error-excerpt-CigKESNN.js";
// node_modules/@tanstack/react-query/build/modern/useMutationState.js
var q = /* @__PURE__ */ C(me(), 1);
function De() {
	let e;
	return (t, n) => {
		let r = [], i;
		return () => {
			let a = t.findAll(n.filters), o = a.flatMap((e) => [e, e.state]);
			return (!i || o.length !== r.length || o.some((e, t) => !Object.is(e, r[t]))) && (r = o, i = fe(e, a.map((e) => n.select ? n.select(e) : e.state)), e = i), i;
		};
	};
}
function Oe(e = {}, t) {
	let n = K(t).getMutationCache(), [r] = q.useState(() => De()), i = r(n, e);
	return q.useSyncExternalStore(q.useCallback((e) => n.subscribe(V.batchCalls(e)), [n]), i, i);
}
// src/react/activity/background-issues.tsx
var J = pe(), ke = ["background-issues"];
function Ae() {
	let e = (0, q.useId)(), t = xe({
		queryKey: ke,
		queryFn: ({ signal: e }) => w("/api/background-issues", e),
		refetchInterval: 3e4
	}).data?.issues || [];
	return t.length ? /* @__PURE__ */ (0, J.jsxs)("section", {
		"aria-labelledby": e,
		className: "flex min-w-0 flex-col gap-3",
		children: [/* @__PURE__ */ (0, J.jsx)("h3", {
			id: e,
			className: "text-title-2-medium text-text-primary",
			children: "Needs attention"
		}), /* @__PURE__ */ (0, J.jsx)("ul", {
			className: "flex min-w-0 flex-col gap-3",
			children: t.map((e) => /* @__PURE__ */ (0, J.jsx)("li", { children: /* @__PURE__ */ (0, J.jsx)(je, { issue: e }) }, e.key))
		})]
	}) : null;
}
function je({ issue: t }) {
	let n = K(), r = G({
		mutationFn: () => T(t.retry, {}),
		onSuccess: () => {
			n.invalidateQueries({ queryKey: ke });
		}
	}), i = t.since ? `Since ${B(t.since)}` : `Noticed at ${B(t.noticed_at)}`;
	return /* @__PURE__ */ (0, J.jsx)(m, {
		tone: "error",
		title: t.title,
		action: /* @__PURE__ */ (0, J.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2",
			children: [/* @__PURE__ */ (0, J.jsx)(l, {
				href: t.href,
				size: "small",
				trailingIcon: L,
				children: t.link_label
			}), t.retry ? /* @__PURE__ */ (0, J.jsx)(e, {
				variant: "secondary",
				size: "small",
				disabled: !t.retry_available,
				...E(r.isPending),
				onClick: () => r.mutate(),
				children: "Retry now"
			}) : null]
		}),
		children: r.error ? `${i}\nNot retried: ${j(r.error)}` : i
	});
}
// src/react/activity/task-controls.tsx
var Y = ["task-control"], Me = {
	pause: h,
	resume: o,
	cancel: s
}, Ne = {
	pause: "暂停",
	resume: "继续",
	cancel: "取消"
}, Pe = {
	pause: "暂停后续任务",
	resume: "继续后续任务",
	cancel: "取消后续任务"
};
function Fe() {
	let e = Oe({
		filters: { mutationKey: Y },
		select: (e) => ({
			id: e.mutationId,
			command: e.state.variables,
			status: e.state.status,
			error: e.state.error
		})
	}), t = /* @__PURE__ */ new Map();
	for (let n of e) {
		let e = n.command;
		if (!e) continue;
		let r = t.get(e.id);
		(!r || r.id < n.id) && t.set(e.id, {
			...n,
			command: e
		});
	}
	let n = [...t.values()].filter((e) => e.status === "error");
	return n.length ? /* @__PURE__ */ (0, J.jsx)("div", {
		"data-task-control-feedback": "",
		className: "flex min-w-0 flex-col gap-2",
		children: n.map(({ command: e, error: t }) => /* @__PURE__ */ (0, J.jsx)(m, {
			tone: "error",
			title: `${e.label}：${(e.followups ? Pe : Ne)[e.action]}未完成`,
			children: j(t)
		}, e.id))
	}) : null;
}
function Ie({ run: t, runs: n = [t] }) {
	let r = K(), i = (0, q.useRef)({
		change: !1,
		cancel: !1,
		confirmation: !1
	}), a = () => {
		r.invalidateQueries({ queryKey: ee });
	}, o = async (e) => {
		let t = null;
		for (let r of n) try {
			await O(r.id, e.action);
		} catch (e) {
			t ??= e;
		}
		if (t !== null) throw t;
	}, s = n.length > 1 ? `这 ${n.length} 批` : "这轮", c = G({
		mutationKey: [
			...Y,
			t.id,
			"change"
		],
		mutationFn: o,
		onSettled: () => {
			i.current.change = !1, a();
		}
	}), l = G({
		mutationKey: [
			...Y,
			t.id,
			"cancel"
		],
		mutationFn: o,
		onSettled: () => {
			i.current.cancel = !1, a();
		}
	}), u = t.control?.actions || [], d = !R(t), f = l.isPending || l.isSuccess;
	if (!u.length) return null;
	let p = (e) => {
		let n = {
			id: t.id,
			label: t.task_label,
			action: e,
			followups: d
		};
		if (e === "cancel") {
			if (i.current.cancel || i.current.confirmation || l.isSuccess) return;
			i.current.confirmation = !0, D({
				title: d ? `取消「${t.task_label}」的全部后续任务` : `取消任务「${t.task_label}」`,
				body: d ? `将停止${s}已派出的全部后续任务，包括正在处理和排队的项目。已保存的资料和结果会保留。这些后续任务取消后不能继续，需要时重新发起。` : "将停止这轮剩余的处理及其后续任务。已保存的资料和结果会保留。这轮任务取消后不能继续，需要时重新发起。",
				confirmLabel: d ? "取消后续任务" : "取消任务",
				danger: !0,
				onConfirm: async () => (i.current.cancel = !0, await l.mutateAsync(n))
			}).finally(() => {
				i.current.confirmation = !1;
			});
		} else {
			if (i.current.change || i.current.cancel || f) return;
			i.current.change = !0, c.mutate(n);
		}
	};
	return /* @__PURE__ */ (0, J.jsx)("div", {
		className: "ml-auto shrink-0",
		"data-task-controls": t.id,
		children: /* @__PURE__ */ (0, J.jsx)("div", {
			role: "group",
			"aria-label": `${t.task_label}${d ? "后续任务" : "任务"}控制`,
			className: "flex items-center justify-end gap-2",
			children: u.map((t) => {
				let n = (d ? Pe : Ne)[t], r = t === "cancel" ? l.isPending : c.isPending && c.variables?.action === t, i = t === "cancel" ? f : c.isPending || f;
				return /* @__PURE__ */ (0, J.jsx)(e, {
					type: "button",
					variant: "secondary",
					size: "small",
					iconOnly: !0,
					leadingIcon: Me[t],
					"aria-label": n,
					title: n,
					...E(r),
					"aria-disabled": i || void 0,
					onClick: () => p(t),
					"data-tooltip-copy-key": `tasks.control.action.${d ? "followups." : ""}${t}`
				}, t);
			})
		})
	});
}
// src/react/activity/task-icon.tsx
var Le = new Map([
	[t, [
		"follow-check",
		"follow-resolve",
		"follow-creator",
		"feed-check",
		"feed-scrape",
		"feed-cover"
	]],
	[y, [
		"library-processing",
		"organize",
		"batch",
		"resource-scan",
		"resource-apply",
		"seed-import"
	]],
	[Se, [
		"scrape-codes",
		"jav-discovery-metadata",
		"want-scrape",
		"upgrade-library"
	]],
	[f, [
		"scraping-cover",
		"jav-covers",
		"code-samples",
		"timeline-thumbnails",
		"entity-avatar"
	]],
	[g, [
		"performer-profile",
		"performer-alias",
		"creator-identity",
		"studio-mark"
	]],
	[S, ["media-repair", "mp4-header-repair"]],
	[ye, [
		"link-check",
		"link-prune",
		"source-check"
	]],
	[H, ["download-postprocess"]],
	[u, ["taste-refresh"]],
	[v, [
		"upgrade-repairs",
		"diagnostic-export",
		"amane-bridge",
		"face-models",
		"ledger-backup",
		"ledger-restore"
	]]
].flatMap(([e, t]) => t.map((t) => [t, e])));
function Re({ taskKey: e, className: t }) {
	let n = Le.get(e) ?? b;
	return /* @__PURE__ */ (0, J.jsx)(n, {
		className: t,
		"aria-hidden": !0
	});
}
// src/react/activity/resource-chip.tsx
var ze = {
	blue: "bg-status-blue-text text-background-primary-default",
	purple: "bg-status-purple-text text-background-primary-default",
	cyan: "bg-status-cyan-text text-background-primary-default"
};
function Be({ color: e, high: t, ...r }) {
	return t ? /* @__PURE__ */ (0, J.jsx)("span", {
		...r,
		className: k("inline-flex items-center justify-center rounded-md px-1.5 py-1 whitespace-nowrap text-caption-1-medium", ze[e])
	}) : /* @__PURE__ */ (0, J.jsx)(n, {
		variant: "caption",
		color: e,
		...r
	});
}
// src/react/activity/task-resources.tsx
var Ve = {
	cpu: {
		name: "CPU",
		color: "blue",
		description: "CPU 使用率以执行端可用容量为 100%，容器按可见 CPU 配额计算。达到 50% 时加深显示。"
	},
	gpu: {
		name: "GPU",
		color: "purple",
		description: "GPU 使用率显示该任务最忙的 GPU 引擎。达到 50% 时加深显示。"
	},
	network: {
		name: "网络",
		color: "cyan",
		description: "网络速率显示该任务已观测的下载速度，达到 10 MiB/s 时加深显示。从网盘挂载读取时显示网盘读取，SMB 或无法准确归属的传输显示未取得。"
	}
};
function He(e) {
	return e.state === "sampling" ? "采样中" : e.via === "cloud" ? "网盘读取" : "未取得";
}
function Ue(e, t) {
	return t === 0 ? "未使用" : e === "network" ? `${M(t)}/s` : `${t.toLocaleString(void 0, { maximumFractionDigits: 1 })}%`;
}
function We({ run: e, active: t = R(e) || !!e.control }) {
	if (!t || !e.resources) return null;
	let n = e.resources;
	return /* @__PURE__ */ (0, J.jsx)("div", {
		"data-task-resources": e.id,
		className: "flex min-w-0 flex-wrap items-center gap-2",
		children: [
			"cpu",
			"gpu",
			"network"
		].map((e) => {
			let t = n[e], r = Ve[e], i = e === "network" ? n.network.bytes_per_second : n[e].percent, a = t.state === "ready" && i !== null, o = a && t.high, s = a ? Ue(e, i) : He(t), c = [
				t.reason,
				o ? "当前为高占用。" : "",
				r.description,
				n.detail
			].filter(Boolean).join("\n");
			return /* @__PURE__ */ (0, J.jsxs)(Be, {
				color: r.color,
				high: o,
				tabIndex: 0,
				title: c,
				"data-task-resource": e,
				"data-resource-state": t.state,
				"data-resource-via": t.via,
				"data-resource-high": o || void 0,
				"data-resource-idle": a && i === 0 || void 0,
				"data-copy-ignore": "",
				"data-tooltip-copy-key": !t.reason && !n.detail && !o ? `tasks.resources.${e}.description` : void 0,
				children: [
					r.name,
					" ",
					s
				]
			}, e);
		})
	});
}
// src/react/activity/activity-page.tsx
var Ge = 50, Ke = /* @__PURE__ */ new Set(["upgrade-repairs"]), qe = /* @__PURE__ */ new Set(["asset_id", "name"]), Je = {
	succeeded: "lime",
	failed: "rose",
	cancelled: "rose",
	interrupted: "yellow",
	running: "blue",
	pending: "neutral"
}, Ye = {
	running: "进行中",
	pausing: "正在暂停",
	paused: "已暂停",
	cancelling: "正在取消"
};
function X({ run: e }) {
	let t = e.control?.state;
	if (t && (t !== "running" || !R(e))) return /* @__PURE__ */ (0, J.jsx)(n, {
		color: t === "running" ? "blue" : "neutral",
		children: /* @__PURE__ */ (0, J.jsx)("span", {
			"data-copy-key": `tasks.control.state.${t}`,
			children: Ye[t]
		})
	});
	let r = e.status === "failed" && e.task_key === "library-processing" && e.result_summary?.outcome === "partial", i = r || e.status === "succeeded" && I(e);
	return /* @__PURE__ */ (0, J.jsx)(n, {
		color: i ? "yellow" : Je[e.status] ?? "neutral",
		children: r ? "Some items need handling" : i ? "Issues found" : he(e.status)
	});
}
function Xe({ rows: e }) {
	return /* @__PURE__ */ (0, J.jsx)("ul", {
		className: "-mr-5 flex min-w-0 flex-col",
		children: e.map((e) => {
			let t = N(e), n = P(e);
			return /* @__PURE__ */ (0, J.jsxs)("li", {
				"data-status": e.status,
				"data-followup-key": e.followup_key,
				className: "flex min-w-0 flex-col gap-1 border-t border-separator-border py-2.5 pr-10 pl-5",
				children: [
					/* @__PURE__ */ (0, J.jsxs)("div", {
						className: "flex min-w-0 items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, J.jsxs)("div", {
							className: "flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1",
							children: [
								/* @__PURE__ */ (0, J.jsx)(Re, {
									taskKey: e.task_key,
									className: "size-4 shrink-0 text-text-secondary"
								}),
								/* @__PURE__ */ (0, J.jsx)("span", {
									className: "min-w-0 break-words text-caption-1-regular text-text-primary",
									children: e.task_label
								}),
								/* @__PURE__ */ (0, J.jsx)(X, { run: e }),
								t ? /* @__PURE__ */ (0, J.jsx)("span", {
									className: "min-w-0 break-words text-caption-1-regular text-text-secondary",
									children: t
								}) : null
							]
						}), /* @__PURE__ */ (0, J.jsx)(Ie, { run: e })]
					}),
					/* @__PURE__ */ (0, J.jsx)(We, { run: e }),
					Object.keys(e.result_summary || {}).length ? /* @__PURE__ */ (0, J.jsx)("div", {
						className: "w-full min-w-0",
						children: /* @__PURE__ */ (0, J.jsxs)(r, {
							summary: "Technical details",
							contentClassName: "pb-2.5",
							children: [n === t ? null : /* @__PURE__ */ (0, J.jsx)("p", {
								className: "wrap-anywhere text-caption-1-regular text-text-secondary",
								children: n
							}), /* @__PURE__ */ (0, J.jsx)(Ce, {
								code: JSON.stringify(e.result_summary, null, 2),
								language: "json",
								label: `${e.task_label} technical details`
							})]
						})
					}) : null
				]
			}, e.id);
		})
	});
}
function Z({ run: e, meta: t, children: n, error: i, issues: a, followups: o, followupTotal: s = 0, badge: c, resourceActive: l, controlled: u }) {
	let d = (e) => e.status === "running" ? 3 : e.status === "pending" ? 2 : +(e.status === "failed" || e.status === "interrupted"), f = o ? [...o].sort((e, t) => d(t) - d(e) || t.id - e.id).slice(0, Ge) : [], m = f.length, h = Math.max(o?.length || 0, s), g = ve(e), _ = String(i || "").trim(), v = W(_);
	return /* @__PURE__ */ (0, J.jsxs)("li", {
		id: `run-${e.id}`,
		"data-status": e.status,
		"data-task-key": e.task_key,
		"data-run-id": e.id,
		className: te({
			padding: "none",
			bordered: e.status === "failed" ? "error" : void 0,
			className: "flex flex-col"
		}),
		children: [
			/* @__PURE__ */ (0, J.jsxs)("div", {
				className: "flex flex-col gap-2 px-5 py-4",
				children: [
					/* @__PURE__ */ (0, J.jsxs)("div", {
						className: "flex min-w-0 items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, J.jsxs)("div", {
							className: "flex min-w-0 flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, J.jsx)(Re, {
									taskKey: e.task_key,
									className: "size-5 shrink-0 text-text-secondary"
								}),
								/* @__PURE__ */ (0, J.jsx)("strong", {
									className: "min-w-0 break-words text-title-3-medium text-text-primary",
									children: e.task_label
								}),
								c ?? /* @__PURE__ */ (0, J.jsx)(X, { run: e })
							]
						}), /* @__PURE__ */ (0, J.jsx)(Ie, {
							run: e,
							runs: u
						})]
					}),
					/* @__PURE__ */ (0, J.jsx)("p", {
						className: "text-caption-1-regular text-text-secondary",
						children: t
					}),
					/* @__PURE__ */ (0, J.jsx)(We, {
						run: e,
						active: l
					}),
					g ? /* @__PURE__ */ (0, J.jsx)(p, {
						href: g.href,
						"data-task-subject": e.id,
						title: g.label,
						className: "min-w-0 max-w-full self-start truncate text-text-primary",
						children: g.label
					}) : null,
					v ? /* @__PURE__ */ (0, J.jsx)("p", {
						"data-task-error": "",
						className: "text-caption-1-regular text-text-secondary wrap-anywhere",
						children: v
					}) : null,
					n
				]
			}),
			a ? /* @__PURE__ */ (0, J.jsx)("div", {
				className: "border-t border-separator-border px-5 py-2.5",
				children: a
			}) : null,
			v && _ !== v ? /* @__PURE__ */ (0, J.jsx)("div", {
				className: "border-t border-separator-border px-5 py-2.5",
				children: /* @__PURE__ */ (0, J.jsx)(r, {
					summary: "错误详情",
					contentClassName: "pb-2.5",
					children: /* @__PURE__ */ (0, J.jsx)(Te, {
						label: `${e.task_label}错误详情`,
						children: _
					})
				})
			}) : null,
			m ? /* @__PURE__ */ (0, J.jsx)("div", {
				className: "border-t border-separator-border px-5 py-2.5",
				children: /* @__PURE__ */ (0, J.jsxs)(r, {
					summary: `Task details · ${h.toLocaleString()} ${h === 1 ? "item" : "items"}`,
					contentClassName: "pb-2.5",
					defaultOpen: f.some((e) => R(e)),
					children: [m < h ? /* @__PURE__ */ (0, J.jsxs)("p", {
						className: "text-caption-1-regular text-text-secondary",
						children: [
							"Listing ",
							m.toLocaleString(),
							" ",
							m === 1 ? "item" : "items",
							", in-progress first"
						]
					}) : null, /* @__PURE__ */ (0, J.jsx)(Xe, { rows: f })]
				})
			}) : null,
			Object.keys(e.result_summary || {}).some((e) => !(g && qe.has(e))) ? /* @__PURE__ */ (0, J.jsx)("div", {
				className: "border-t border-separator-border px-5 py-2.5",
				children: /* @__PURE__ */ (0, J.jsx)(r, {
					summary: "技术详情",
					contentClassName: "pb-2.5",
					children: /* @__PURE__ */ (0, J.jsx)(Ce, {
						code: JSON.stringify(e.result_summary, null, 2),
						language: "json",
						label: `${e.task_label} technical details`
					})
				})
			}) : null
		]
	});
}
function Ze({ run: e, followups: t }) {
	let n = e.progress_total || 0, r = e.progress_current || 0, i = e.control?.state, a = i && i !== "running", o = a ? Ye[i] : e.progress_label || "正在进行", s = A(e.elapsed_seconds), c = [x[e.trigger] || e.trigger, s && `Ran for ${s}`].filter(Boolean).join(" · ");
	return /* @__PURE__ */ (0, J.jsx)(Z, {
		run: e,
		meta: c,
		followups: t,
		children: n > 0 ? /* @__PURE__ */ (0, J.jsxs)("div", {
			className: "flex flex-col gap-1.5",
			children: [/* @__PURE__ */ (0, J.jsx)(_, {
				label: o,
				value: Math.min(r, n),
				max: n
			}), /* @__PURE__ */ (0, J.jsxs)("p", {
				className: "text-caption-1-regular text-text-secondary wrap-anywhere",
				children: [
					o,
					" · ",
					U(r, n),
					" items"
				]
			})]
		}) : a ? /* @__PURE__ */ (0, J.jsx)("p", {
			"data-copy-key": `tasks.control.state.${i}`,
			className: "text-caption-1-regular text-text-secondary",
			children: o
		}) : /* @__PURE__ */ (0, J.jsx)(d, { label: o })
	});
}
function Qe({ run: e, followups: t, runs: i, latest: a, followupTotal: o, followupFailed: s = 0, followupCancelled: u = 0 }) {
	let d = !!(i && i.length > 1 && o), f = d ? [`Processed ${o.toLocaleString()} items in total`, s ? `${s.toLocaleString()} of them failed` : ""].filter(Boolean) : ge(ve(e) ? {
		...e.result_summary,
		name: ""
	} : e.result_summary).filter((t) => t !== e.error && t !== W(e.error)), p = _e(e), m = de(e, a), h = A(e.elapsed_seconds), g = i && i.length > 1 ? i[i.length - 1] : void 0, _ = (g ? [
		x[e.trigger] || e.trigger,
		`Last ${i.length} rounds`,
		`${B(g.finished_at)} – ${B(e.finished_at)}`
	] : [
		x[e.trigger] || e.trigger,
		B(e.finished_at),
		h && `Took ${h}`
	]).filter(Boolean).join(" · ");
	return /* @__PURE__ */ (0, J.jsxs)(Z, {
		run: e,
		meta: _,
		error: e.error,
		followups: t,
		followupTotal: o,
		issues: p.length ? /* @__PURE__ */ (0, J.jsx)(r, {
			summary: `问题详情 · ${p.length} 项`,
			contentClassName: "pb-2.5",
			children: /* @__PURE__ */ (0, J.jsx)(Te, {
				label: "任务问题详情",
				children: /* @__PURE__ */ (0, J.jsx)("ul", {
					className: "flex min-w-0 flex-col whitespace-normal",
					"data-task-issues": "",
					children: p.map((e, t) => /* @__PURE__ */ (0, J.jsx)(c, {
						title: /* @__PURE__ */ (0, J.jsxs)(J.Fragment, { children: [e.label, e.provider || e.kind ? /* @__PURE__ */ (0, J.jsxs)("span", {
							className: "text-body-2-regular text-text-secondary",
							children: [" · ", [e.provider, e.kind].filter(Boolean).join(" · ")]
						}) : null] }),
						children: /* @__PURE__ */ (0, J.jsx)(Ee, {
							text: e.error,
							className: "text-caption-1-regular text-text-secondary"
						})
					}, `${e.source}-${t}`))
				})
			})
		}) : void 0,
		badge: u && e.status === "succeeded" ? /* @__PURE__ */ (0, J.jsx)(n, {
			color: "rose",
			children: /* @__PURE__ */ (0, J.jsx)("span", {
				"data-copy-key": `tasks.followups.cancelled.${u === o ? "all" : "partial"}`,
				children: u === o ? "后续任务已取消" : "部分后续任务已取消"
			})
		}) : d && s ? /* @__PURE__ */ (0, J.jsx)(n, {
			color: "yellow",
			children: "发现问题"
		}) : void 0,
		children: [
			u ? /* @__PURE__ */ (0, J.jsxs)("p", {
				className: "text-caption-1-regular text-text-secondary",
				children: [
					"后续任务已取消 ",
					u.toLocaleString(),
					" 项"
				]
			}) : null,
			f.length === 1 ? /* @__PURE__ */ (0, J.jsx)("p", {
				className: "text-caption-1-regular text-text-secondary wrap-anywhere",
				children: f[0]
			}) : f.length ? /* @__PURE__ */ (0, J.jsx)("ul", {
				className: "flex list-disc flex-col gap-1 pl-5 text-caption-1-regular text-text-secondary wrap-anywhere",
				children: f.map((e, t) => /* @__PURE__ */ (0, J.jsx)("li", { children: e }, t))
			}) : null,
			!p.length && I(e) && ["follow-check", "feed-check"].includes(e.task_key) ? /* @__PURE__ */ (0, J.jsx)("p", {
				className: "text-body-2-regular text-text-secondary",
				children: "未取得本轮逐项详情，可到来源列表查看检查结果。"
			}) : null,
			m ? /* @__PURE__ */ (0, J.jsx)(l, {
				href: m.href,
				size: "small",
				trailingIcon: L,
				className: "self-start",
				children: m.label
			}) : null
		]
	});
}
function $e({ runs: e, followups: t, counts: r }) {
	let i = e[0], a = e[e.length - 1], o = F(r, e), s = Math.max(o.total, t.length), c = o.total ? o.settled : t.filter((e) => !R(e)).length, l = o.total ? o.failed : t.filter((e) => e.status === "failed" || e.status === "interrupted").length, u = [
		x[i.trigger] || i.trigger,
		e.length > 1 ? `${e.length} batches` : "",
		`Started ${B(a.started_at || a.finished_at)}`
	].filter(Boolean).join(" · ");
	return /* @__PURE__ */ (0, J.jsx)(Z, {
		run: i,
		meta: u,
		followups: t,
		followupTotal: s,
		resourceActive: !0,
		controlled: e,
		badge: i.control ? /* @__PURE__ */ (0, J.jsx)(X, { run: i }) : /* @__PURE__ */ (0, J.jsx)(n, {
			color: "blue",
			children: "进行中"
		}),
		children: /* @__PURE__ */ (0, J.jsxs)("div", {
			className: "flex flex-col gap-1.5",
			children: [/* @__PURE__ */ (0, J.jsx)(_, {
				label: `${i.task_label} progress`,
				value: c,
				max: s
			}), /* @__PURE__ */ (0, J.jsxs)("p", {
				className: "text-caption-1-regular text-text-secondary",
				children: [
					"Processed ",
					U(c, s),
					" items",
					l ? ` · ${l.toLocaleString()} of them failed` : ""
				]
			})]
		})
	});
}
function Q({ title: e, children: t }) {
	let n = (0, q.useId)();
	return /* @__PURE__ */ (0, J.jsxs)("section", {
		"aria-labelledby": n,
		className: "flex min-w-0 flex-col gap-3",
		children: [/* @__PURE__ */ (0, J.jsx)("h3", {
			id: n,
			className: "text-title-2-medium text-text-primary",
			children: e
		}), t]
	});
}
function $({ live: e = !1, children: t }) {
	return /* @__PURE__ */ (0, J.jsx)("ul", {
		"aria-live": e ? "polite" : void 0,
		className: "flex min-w-0 flex-col gap-3",
		children: t
	});
}
function et() {
	let t = xe({
		queryKey: ee,
		queryFn: ({ signal: e }) => ie(e),
		refetchInterval: (e) => ue(e.state.data)
	}), n = t.data, r = n?.finished, [o, s] = (0, q.useState)([]), [c, l] = (0, q.useState)(!1), [u, d] = (0, q.useState)({}), [f, p] = (0, q.useState)(r);
	r !== f && (p(r), o.length && f && s(z(o, f)));
	let h = G({
		mutationFn: ({ oldest: e }) => re(e),
		onSuccess: (e, { shown: t }) => {
			s((n) => z(n, t, e.finished || [])), l(!!e.finished_has_more), d((t) => ({
				...t,
				...e.followup_counts
			}));
		}
	}), g = t.error ? j(t.error) : "";
	if (!n) return /* @__PURE__ */ (0, J.jsx)(we, { children: /* @__PURE__ */ (0, J.jsx)(m, {
		tone: "error",
		children: g || "Reading the task center failed"
	}) });
	let _ = z(n.finished || [], o), v = n.working_parents || [], y = [
		...n.running || [],
		...n.skipped || [],
		..._,
		...v
	], b = se(y), x = new Set(y.map((e) => e.id)), S = (e) => e.filter((e) => !(e.followup_key && e.parent_run_id != null && x.has(e.parent_run_id))), C = S(_), w = C[C.length - 1], T = !!w && (o.length ? c : !!n.finished_has_more), te = () => {
		!h.isPending && w && h.mutate({
			oldest: w,
			shown: _
		});
	}, D = {
		...u,
		...n.followup_counts
	}, O = (e) => e.flatMap((e) => b.get(e.id) || []), k = [...C, ...S(v)].filter((e) => F(D, [e]).active > 0 || b.get(e.id)?.some(R)).sort((e, t) => t.id - e.id), A = S(n.running || []), M = S(n.skipped || []), N = C.filter((e) => !k.includes(e) && !M.some((t) => t.id === e.id)), P = (e) => (b.get(e.id) || []).every((e) => e.status === "succeeded" && !I(e)) && F(D, [e]).failed === 0, L = oe(N, (e) => ce(e) && (P(e) || Ke.has(e.task_key))), B = ae(k, (e) => e.control?.state || "").sort((e, t) => t.run.id - e.run.id), V = le(y), H = !A.length && !k.length && !M.length && !N.length;
	return /* @__PURE__ */ (0, J.jsxs)(we, { children: [
		g ? /* @__PURE__ */ (0, J.jsx)(m, {
			tone: "error",
			children: g
		}) : null,
		/* @__PURE__ */ (0, J.jsx)(Fe, {}),
		n.available === !1 ? /* @__PURE__ */ (0, J.jsx)(m, {
			tone: "warning",
			children: n.message || "The database has not set up the task records table yet"
		}) : null,
		/* @__PURE__ */ (0, J.jsx)(Ae, {}),
		H ? /* @__PURE__ */ (0, J.jsx)(a, {
			icon: be,
			title: "No task records yet",
			children: "Once scans, update checks, bulk actions, and command-line batches run, their progress and results show up here."
		}) : /* @__PURE__ */ (0, J.jsxs)(J.Fragment, { children: [
			/* @__PURE__ */ (0, J.jsx)(Q, {
				title: "Running",
				children: A.length || k.length ? /* @__PURE__ */ (0, J.jsxs)($, {
					live: !0,
					children: [A.map((e) => /* @__PURE__ */ (0, J.jsx)(Ze, {
						run: e,
						followups: b.get(e.id)
					}, e.id)), B.map(({ run: e, runs: t }) => /* @__PURE__ */ (0, J.jsx)($e, {
						runs: t,
						followups: O(t),
						counts: D
					}, e.id))]
				}) : /* @__PURE__ */ (0, J.jsx)(m, {
					tone: "neutral",
					children: "No tasks running."
				})
			}),
			M.length ? /* @__PURE__ */ (0, J.jsx)(Q, {
				title: "Not executed this time",
				children: /* @__PURE__ */ (0, J.jsx)($, { children: M.map((e) => /* @__PURE__ */ (0, J.jsx)(Qe, {
					run: e,
					latest: V.has(e.id),
					followups: b.get(e.id)
				}, e.id)) })
			}) : null,
			N.length || T ? /* @__PURE__ */ (0, J.jsxs)(Q, {
				title: "Recently completed",
				children: [
					N.length ? /* @__PURE__ */ (0, J.jsx)($, { children: L.map(({ run: e, runs: t }) => {
						let n = F(D, t);
						return /* @__PURE__ */ (0, J.jsx)(Qe, {
							run: e,
							runs: t,
							latest: V.has(e.id),
							followups: O(t),
							followupTotal: n.total,
							followupFailed: n.failed,
							followupCancelled: n.cancelled
						}, e.id);
					}) }) : null,
					h.error ? /* @__PURE__ */ (0, J.jsx)(m, {
						tone: "error",
						children: j(h.error)
					}) : null,
					T ? /* @__PURE__ */ (0, J.jsx)(e, {
						variant: "secondary",
						size: "small",
						leadingIcon: ne,
						className: "self-start",
						...E(h.isPending),
						onClick: te,
						children: "Load earlier"
					}) : null
				]
			}) : null
		] }),
		/* @__PURE__ */ (0, J.jsx)(i, {})
	] });
}
export { et as ActivityPage };

//# debugId=8e9e1cb5-03c5-4ce3-b108-ebddd7e0ce3d