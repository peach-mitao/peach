---
kind: reference
---

# Peach — English Translation Status

Status as of 2026-11-05, branch `agent/glm/translation-reconcile`, HEAD after the
v0.54.0 port. Supersedes the 0.53.0-era status; the history of that pass lives in
`translation/WORK_LOG.md`.

## Where things stand

The UI is translated from Chinese to English on the **v0.54.0 base**: this branch
merged upstream `v0.54.0` (taking upstream on conflicting hunks), then re-applied
the translation memory (17,924 pairs) with `translation/update.py`, and translated
the resulting delta by hand. The sweep's global replacements had corrupted comments
and string quoting in places; those were repaired (unclosed block comments, bare
comment lines, JSX comments, apostrophes inside single-quoted strings). The
frontend test suite is fully green: **452 files / 2,106 tests passed**; typecheck
(both configs), `check:copy`, and oxlint are clean; `web/dist` is rebuilt from the
English sources.

Frontend string literals are CJK-free. What remains is intentional: display maps
whose Chinese keys mirror values stored in the ledger or emitted by the backend
(`tasks.ts` outcome labels, edition tones, duration buckets), and Japanese studio
names, which are content. Backend-emitted user-visible strings (API errors, tray
status details, task names, CLI output) are still Chinese — that is the next
port's scope.

The ledger's historical task labels were migrated to English prefixes
(`task_run.progress_label`, 553 rows; performer names inside them are content and
stay). Backup: `database/ledger.pre-task-labels-20261103-225533.db`.

## Intentionally kept in the original language

- Performer names, movie titles, label/brand names, and tag vocabulary
  (`genre_taxonomy.py` and fixtures) are content, not chrome.
- Site-registry `kind` values and legacy published names in
  `web/integrations/peach-jav.user.js` (the latter drives update detection).
- Page-markup detection keyword sets in the userscript (they match real site text).
- Developer docs, comments, and docstrings follow the repo's writing convention.

## How the port was reconciled

1. `git merge v0.53.0 -X theirs` — upstream wins conflicting hunks.
2. `python translation/update.py` — sweep the memory over the merged tree;
   the delta carries genuinely new strings.
3. Translate the delta into `translation/delta-translated.json` (rules in
   `translation/README.md`), `merge_delta.py`, re-run `update.py`.
4. Fix by hand whatever the substring sweep left half-translated, then a final
   test-reconciliation pass over the suites.

## Remaining known work

- Backend docstrings/comments stay Chinese by repo convention; some deep backend
  strings (CLI help, `web_review.py` problem text, field-owner labels) are still
  Chinese and surface only outside the main UI flows.
- The upstream repo moved ~6,000 commits past this release line within days; the
  next upstream pull repeats the port recipe above.
- The running Windows install is the official 0.53.0 exe with a Chinese UI; this
  branch needs `integrate` plus a release build before it can replace that.

## Update survival

After pulling the next upstream version, repeat: `git merge <tag> -X theirs`,
`python translation/update.py`, translate `delta.json` into
`translation/delta-translated.json`, `merge_delta.py`, `update.py` again, then
reconcile the failing tests. Tooling reference: `translation/README.md`.
