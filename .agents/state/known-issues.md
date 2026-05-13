# Known Issues

Last updated: 2026-05-13

## Open Issues

| ID | Severity | Area | Summary | Owner | Status | Next action |
| --- | --- | --- | --- | --- | --- | --- |
| ARCH-CONNECTORS-001 | P1 | connectors | Organizer/provider daily-use claims are an extension gate and need credentials before a broader launch claim. | Backend + Ops | DEFERRED_EXTERNAL_EXTENSION | Run provider activation smoke only after operator credentials exist and organizer scope expands. |
| ARCH-PROACTIVE-001 | P1 | proactive | Proactive/scheduler implementation is covered locally, but target proactive sampling is deferred until launch scope expands. | Backend + Ops | DEFERRED_SCOPE_DEPENDENT | Run a target proactive sample only when proactive launch scope expands. |
| ARCH-DEPLOY-AUTO-001 | P1 | operations | Current release parity is green; source/webhook deploy convergence remains a future-candidate follow-up. | Ops/Release | DEFERRED_FUTURE_CANDIDATE | Capture source/webhook deploy convergence or fallback evidence on the next selected release candidate. |
| ARCH-MOBILE-001 | P2 | mobile | Mobile is approved topology and v1.5 UI work has started, but production mobile readiness still needs native auth transport and device/simulator proof. | Mobile + Planning | IN_PROGRESS_EXTENSION | Continue from `PRJ-1158`; add focused native chat route or device/simulator proof before claiming production mobile readiness. |
| V11-UI-DRIFT-001 | P2 | web_ui | v1.1 responsive automation is green, but full canonical visual parity can still be improved by explicit future feedback. | Frontend + QA/Test | MONITORING | v1.1 web responsive handoff is complete; start a new narrow polish task only from explicit feedback or v1.5 mobile planning. |
| ARCH-AI-PERCEPTION-001 | P1 | cognitive_runtime | Baseline perception used deterministic keyword hints for language/topic/intent and affective fallback. PRJ-1196 adds provider-backed structured perception and leaves heuristics as fail-safe fallback. | Backend + AI | FIX_IMPLEMENTED_PENDING_FULL_VALIDATION | Run full backend pytest and production smoke, then move to Recently Closed if green. |

## Accepted Residual Risks

Record risks the user or project owner explicitly accepted, with date and
rationale.

## Recently Closed Issues

Move closed issues here only when the fix and validation evidence are recorded.

| ID | Closed | Evidence |
| --- | --- | --- |
| ARCH-TEST-EVIDENCE-001 | Row-specific architecture validation command packs are now generated in the audit CSV/report and dashboard JSON/Markdown. | `PRJ-929`; `docs/operations/architecture-implementation-map-2026-05-10.csv`; `docs/operations/project-status-dashboard.json`; selected-scope readiness `9/14`. |
| ARCH-WEB-UX-001 | Fresh route-state and lightweight accessibility evidence now passes for all current web routes. | `PRJ-931`; `npm exec -- tsc -b --pretty false`; `npm exec -- vite build`; `npm run smoke:routes` -> `14` routes, `status=ok`, zero visible unnamed interactive controls. |
| ARCH-DOC-MAPS-001 | Secondary traceability and codebase maps now point to the generated architecture audit/dashboard. | `PRJ-932`; `docs/architecture/traceability-matrix.md`; `docs/architecture/codebase-map.md`; audit/dashboard readiness `11/14`. |
