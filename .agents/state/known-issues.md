# Known Issues

Last updated: 2026-05-14

## Open Issues

| ID | Severity | Area | Summary | Owner | Status | Next action |
| --- | --- | --- | --- | --- | --- | --- |
| ARCH-CONNECTORS-001 | P1 | connectors | Organizer/provider daily-use claims are an extension gate and need credentials before a broader launch claim. | Backend + Ops | DEFERRED_EXTERNAL_EXTENSION | Run provider activation smoke only after operator credentials exist and organizer scope expands. |
| ARCH-PROACTIVE-001 | P1 | proactive | Proactive/scheduler implementation is covered locally, but target proactive sampling is deferred until launch scope expands. | Backend + Ops | DEFERRED_SCOPE_DEPENDENT | Run a target proactive sample only when proactive launch scope expands. |
| ARCH-DEPLOY-AUTO-001 | P1 | operations | Current release parity is green; source/webhook deploy convergence remains a future-candidate follow-up. | Ops/Release | DEFERRED_FUTURE_CANDIDATE | Capture source/webhook deploy convergence or fallback evidence on the next selected release candidate. |
| ARCH-MOBILE-001 | P2 | mobile | Native app proof is outside the current product scope; the active UI target is the web app at mobile, tablet, and desktop breakpoints. | Mobile + Planning | DEFERRED_BY_CURRENT_SCOPE | Do not pursue Android SDK/device proof unless native app scope is reactivated; keep validating web breakpoints through `ARCH-WEB-UX-001`. |
| V11-UI-DRIFT-001 | P2 | web_ui | v1.1 responsive automation is green, but full canonical visual parity can still be improved by explicit future feedback. | Frontend + QA/Test | MONITORING | v1.1 web responsive handoff is complete; start a new narrow polish task only from explicit feedback or v1.5 mobile planning. |

## Accepted Residual Risks

Record risks the user or project owner explicitly accepted, with date and
rationale.

## Recently Closed Issues

Move closed issues here only when the fix and validation evidence are recorded.

| ID | Closed | Evidence |
| --- | --- | --- |
| ARCH-AI-PERCEPTION-001 | AI-assisted structured perception now owns language/topic/intent when OpenAI is configured; deterministic keyword hints remain fallback only. | `PRJ-1196`; full backend pytest `1098 passed`; Coolify production revision `c427ab110276c98a122d6c1be3f7d9a02eeffa3c`; release smoke `release_ready=true`; `/health.runtime_policy.structured_perception_posture=ai_assisted_active`. |
| ARCH-TEST-EVIDENCE-001 | Row-specific architecture validation command packs are now generated in the audit CSV/report and dashboard JSON/Markdown. | `PRJ-929`; `docs/operations/architecture-implementation-map-2026-05-10.csv`; `docs/operations/project-status-dashboard.json`; selected-scope readiness `9/14`. |
| ARCH-WEB-UX-001 | Fresh route-state and lightweight accessibility evidence now passes for all current web routes. | `PRJ-931`; `npm exec -- tsc -b --pretty false`; `npm exec -- vite build`; `npm run smoke:routes` -> `14` routes, `status=ok`, zero visible unnamed interactive controls. |
| ARCH-DOC-MAPS-001 | Secondary traceability and codebase maps now point to the generated architecture audit/dashboard. | `PRJ-932`; `docs/architecture/traceability-matrix.md`; `docs/architecture/codebase-map.md`; audit/dashboard readiness `11/14`. |
