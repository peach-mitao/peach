(function() {
	try {
		var e = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, t = new e.Error().stack;
		t && (e._sentryDebugIds = e._sentryDebugIds || {}, e._sentryDebugIds[t] = "ef243709-cc8b-4085-8c06-fdd6a1d28f3a", e._sentryDebugIdIdentifier = "sentry-dbid-ef243709-cc8b-4085-8c06-fdd6a1d28f3a");
	} catch {}
})();
import { Button as e, CollectionSummary as t, DUPLICATES_KEY as n, EmptyState as r, FilterGlass as i, GlassPill as a, KEEP_LABELS as o, LOC as s, MEDIA_SOURCES_KEY as c, MEDIA_SOURCE_ICONS as l, Note as u, SourceLabel as d, SourceMark as f, TRASH_KEY as p, __toESM as m, batchOperate as h, bulkCloudPreferences as g, busyProps as _, cardClass as v, cloudLocations as y, confirmModal as b, distinctName as x, duplicateVictims as S, errorMessage as C, fetchDuplicates as w, fetchMediaSources as T, fmtDur as E, fmtSize as D, keepGroup as O, mixedCloudPreferences as k, queryClient as A, require_jsx_runtime as j, require_react as M, sharedNamePrefix as N, spriteGlyph as P, useMutation as F, useQuery as I, victimBytes as L } from "./peach-app.js";
// src/react/duplicates/duplicates-page.tsx
var R = /* @__PURE__ */ m(M(), 1), z = j(), B = P("play"), V = P("file-stack"), H = v({
	padding: "none",
	radius: "surface",
	className: "mb-6 overflow-hidden dark:bg-background-primary-default"
}), U = "rounded-sm px-1.5 py-px text-caption-1-regular leading-5", W = "rounded-sm px-2 py-0.5 text-caption-1-regular leading-5", G = "font-mono text-caption-1-regular leading-5 text-text-secondary", K = () => {
	A.invalidateQueries({
		queryKey: n,
		exact: !0
	}), A.invalidateQueries({
		queryKey: p,
		exact: !0
	});
};
function q(e) {
	return e.identical ? /* @__PURE__ */ (0, z.jsx)("span", {
		className: `${W} text-(--keep)`,
		children: "sha1 matches"
	}) : /* @__PURE__ */ (0, z.jsx)("span", {
		className: `${W} text-text-secondary`,
		children: e.evidence === "same_code_short_copy" ? "Short editions of the same code" : "Duration inference"
	});
}
function J({ file: e, prefix: t, openItem: n }) {
	let r = () => n(e.id), i = s[e.location] || e.location || e.drive;
	return /* @__PURE__ */ (0, z.jsxs)("div", {
		className: "duplicate-row items-center gap-3 border-t border-separator-border px-5 py-4 max-compact:p-4",
		children: [
			/* @__PURE__ */ (0, z.jsxs)("button", {
				type: "button",
				onClick: r,
				"aria-label": `Preview ${e.name}`,
				className: "relative row-span-2 inline-grid aspect-16/10 w-full cursor-pointer place-items-center overflow-hidden rounded-2lg bg-background-tertiary-default text-text-secondary",
				children: [/* @__PURE__ */ (0, z.jsx)(B, {
					"aria-hidden": !0,
					className: "size-6"
				}), /* @__PURE__ */ (0, z.jsx)("img", {
					src: `/thumb?id=${e.id}&c=4`,
					alt: "",
					loading: "lazy",
					onError: (e) => e.currentTarget.remove(),
					className: "absolute inset-0 size-full object-contain"
				})]
			}),
			/* @__PURE__ */ (0, z.jsxs)("span", {
				className: "flex min-w-0 items-center gap-2 max-duplicate-narrow:col-start-2 max-duplicate-narrow:-col-end-1",
				children: [/* @__PURE__ */ (0, z.jsx)("button", {
					type: "button",
					onClick: r,
					title: e.name,
					"data-middle-truncate": !0,
					"data-middle-truncate-within": !0,
					className: "min-w-0 shrink cursor-pointer truncate text-left text-body-regular hover:text-text-secondary",
					children: x(e.name, t)
				}), e.is_largest || e.is_longest ? /* @__PURE__ */ (0, z.jsxs)("span", {
					className: "flex flex-none gap-1",
					children: [e.is_largest ? /* @__PURE__ */ (0, z.jsx)("i", {
						className: `${U} not-italic bg-background-primary-hover text-text-secondary`,
						children: "Largest"
					}) : null, e.is_longest ? /* @__PURE__ */ (0, z.jsx)("i", {
						className: `${U} not-italic bg-(--keep)/22 text-(--keep)`,
						children: "Longest"
					}) : null]
				}) : null]
			}),
			/* @__PURE__ */ (0, z.jsxs)("span", {
				className: `${G} flex min-w-0 items-center gap-1.5`,
				children: [/* @__PURE__ */ (0, z.jsx)(f, { mark: l[e.location] || "database" }), /* @__PURE__ */ (0, z.jsx)("span", {
					title: i,
					className: "min-w-0 truncate",
					children: i
				})]
			}),
			/* @__PURE__ */ (0, z.jsx)("span", {
				className: G,
				children: D(e.size || 0)
			}),
			/* @__PURE__ */ (0, z.jsx)("span", {
				className: G,
				children: E(e.duration)
			}),
			/* @__PURE__ */ (0, z.jsx)("span", {
				className: `${G} col-start-2 -col-end-1 min-w-0 pt-0.5 wrap-anywhere max-duplicate-narrow:col-span-full`,
				children: e.path ?? ""
			})
		]
	});
}
function Y({ openItem: l, toast: f, failure: p }) {
	let m = I({
		queryKey: n,
		queryFn: ({ signal: e }) => w(e)
	}), v = I({
		queryKey: c,
		queryFn: ({ signal: e }) => T(e)
	}), [x, E] = (0, R.useState)(""), A = F({
		mutationFn: (e) => h(e, "dispose"),
		onSuccess: (e, t) => {
			K(), f(`Moved ${t.length} items to trash`, { undo: async () => {
				try {
					await h(t, "restore");
				} catch (e) {
					p("Undo move to trash", e);
				} finally {
					K();
				}
			} });
		},
		onSettled: () => E("")
	}), j = F({
		mutationFn: (e) => O(e.files.map((e) => e.id), !0),
		onSuccess: (e, t) => {
			K(), f(`${t.code} 这组都保留，不再列出`, { undo: async () => {
				try {
					await O(t.files.map((e) => e.id), !1);
				} catch (e) {
					p("撤销都保留", e);
				} finally {
					K();
				}
			} });
		},
		onError: (e) => p("标记都保留", e),
		onSettled: () => E("")
	}), M = m.data;
	if (!M) return /* @__PURE__ */ (0, z.jsx)("div", {
		className: "mx-auto w-full max-w-board",
		children: /* @__PURE__ */ (0, z.jsx)(u, {
			tone: "error",
			title: "Reading duplicates failed",
			children: m.error ? C(m.error) : "The duplicates list could not be fetched; refresh the page and retry."
		})
	});
	let P = M.groups ?? [], B = y(v.data), U = ({ groups: e, keep: t, key: n }) => {
		if (A.isPending) return;
		let r = S(e, t);
		r.length && b({
			title: "Move to trash",
			body: `Will move the library records of ${r.length} duplicate files to trash, keeping ${o[t] ?? o.largest} per group.Files total ${D(L(e, r))}; records can be restored from trash.`,
			confirmLabel: "Move to trash",
			onConfirm: () => (E(n), A.mutateAsync(r))
		});
	}, G = (e) => _(x === e && (A.isPending || j.isPending)), Y = (e, t) => {
		j.isPending || A.isPending || (E(t), j.mutate(e));
	};
	return /* @__PURE__ */ (0, z.jsxs)("div", {
		className: "mx-auto w-full max-w-board pb-10.5",
		children: [
			/* @__PURE__ */ (0, z.jsx)(t, {
				label: "Duplicate content",
				figure: `${Number(M.total || 0).toLocaleString()} groups`,
				detail: `${Number(M.files || 0).toLocaleString()} files - ${D(M.reclaimable)} reclaimable`
			}),
			P.length ? /* @__PURE__ */ (0, z.jsxs)(i, {
				title: "Bulk keep",
				children: [
					/* @__PURE__ */ (0, z.jsx)(a, {
						busy: x === "all:largest",
						onPress: () => U({
							groups: P,
							keep: "largest",
							key: "all:largest"
						}),
						children: "Keep all largest"
					}),
					/* @__PURE__ */ (0, z.jsx)(a, {
						busy: x === "all:longest",
						onPress: () => U({
							groups: P,
							keep: "longest",
							key: "all:longest"
						}),
						children: "Keep all longest"
					}),
					g(P, B).map((e) => /* @__PURE__ */ (0, z.jsx)(a, {
						busy: x === `all:${e}`,
						onPress: () => U({
							groups: P,
							keep: e,
							key: `all:${e}`
						}),
						children: /* @__PURE__ */ (0, z.jsx)(d, {
							source: e,
							label: `Prefer all from ${s[e] || e}`
						})
					}, e))
				]
			}) : null,
			A.isError ? /* @__PURE__ */ (0, z.jsx)("div", {
				className: "mb-5",
				children: /* @__PURE__ */ (0, z.jsx)(u, {
					tone: "error",
					title: "Moving to trash failed",
					children: C(A.error)
				})
			}) : null,
			P.length ? P.map((t, n) => {
				let r = [t], i = N(t.files.map((e) => e.name)), a = (e) => `${n}:${e}`;
				return /* @__PURE__ */ (0, z.jsxs)("section", {
					"aria-label": t.code,
					className: H,
					children: [/* @__PURE__ */ (0, z.jsxs)("div", {
						className: "flex flex-wrap items-center gap-3 bg-background-tertiary-default p-5 max-compact:p-4 dark:bg-background-secondary-default",
						children: [
							/* @__PURE__ */ (0, z.jsx)("b", {
								className: "text-title-2-medium text-text-primary",
								children: t.code
							}),
							/* @__PURE__ */ (0, z.jsx)("span", {
								className: "font-mono text-caption-1-regular leading-5 text-text-primary",
								children: `${Number(t.count || 0).toLocaleString()} items - ${D(t.reclaimable)} reclaimable`
							}),
							q(t),
							t.cross_drive ? /* @__PURE__ */ (0, z.jsx)("span", {
								className: `${W} text-text-secondary`,
								children: `Across drives ${t.drives.join(" ")}`
							}) : null,
							/* @__PURE__ */ (0, z.jsxs)("span", {
								className: "ml-auto flex flex-wrap gap-2 max-compact:ml-0 max-compact:w-full",
								children: [
									/* @__PURE__ */ (0, z.jsx)(e, {
										variant: "secondary",
										size: "small",
										...G(a("largest")),
										onClick: () => U({
											groups: r,
											keep: "largest",
											key: a("largest")
										}),
										children: "Keep largest"
									}),
									/* @__PURE__ */ (0, z.jsx)(e, {
										variant: "secondary",
										size: "small",
										...G(a("longest")),
										onClick: () => U({
											groups: r,
											keep: "longest",
											key: a("longest")
										}),
										children: "Keep longest"
									}),
									k(t.files, B).map((t) => /* @__PURE__ */ (0, z.jsx)(e, {
										variant: "secondary",
										size: "small",
										...G(a(t)),
										onClick: () => U({
											groups: r,
											keep: t,
											key: a(t)
										}),
										children: /* @__PURE__ */ (0, z.jsx)(d, {
											source: t,
											label: `Keep ${s[t] || t}`
										})
									}, t)),
									/* @__PURE__ */ (0, z.jsx)(e, {
										variant: "secondary",
										size: "small",
										...G(a("keep")),
										onClick: () => Y(t, a("keep")),
										children: "都保留"
									}),
									/* @__PURE__ */ (0, z.jsx)(e, {
										variant: "danger",
										size: "small",
										...G(a("all")),
										onClick: () => U({
											groups: r,
											keep: "all",
											key: a("all")
										}),
										children: "Recycle whole groups"
									})
								]
							})
						]
					}), /* @__PURE__ */ (0, z.jsx)("div", { children: t.files.map((e) => /* @__PURE__ */ (0, z.jsx)(J, {
						file: e,
						prefix: i,
						openItem: l
					}, e.id)) })]
				}, `${t.code}-${n}`);
			}) : /* @__PURE__ */ (0, z.jsx)(r, {
				icon: V,
				title: "No duplicates found",
				children: "No files with identical content were detected across sources. This updates automatically after new sources are scanned."
			}),
			P.length > 0 && M.total > P.length ? /* @__PURE__ */ (0, z.jsx)("p", {
				className: "text-center text-caption-1-regular text-text-secondary",
				children: `Showing the ${P.length.toLocaleString()} groups with the most reclaimable space, of ${Number(M.total).toLocaleString()} in total; once these are processed, the rest will fill in.`
			}) : null,
			M.kept ? /* @__PURE__ */ (0, z.jsx)("p", {
				className: "mt-2 text-center text-caption-1-regular text-text-secondary",
				children: `另有 ${M.kept.toLocaleString()} 组标记了都保留，不再列出；组里文件有增减时会重新列出。`
			}) : null
		]
	});
}
export { Y as DuplicatesPage };

//# debugId=ef243709-cc8b-4085-8c06-fdd6a1d28f3a