# Project Status Dashboard

Last updated: 2026-05-14

## Current Moment

- phase: `architecture complete for selected scope with deferred extensions`
- canonical matrix: `docs/operations/architecture-implementation-map-2026-05-10.csv`
- selected-scope readiness: `11/11` rows (`100.0%`)
- all-scope readiness: `11/15` rows (`73.3%`)
- bucket counts: `{'DEFERRED': 4, 'READY': 11}`

## What 100% Means

- All selected-scope P0/P1 rows are READY or explicitly deferred/waived.
- No V1_BLOCKER rows remain without owner-approved external blocker status.
- Implemented-needs-evidence rows have current local or target proof.
- Deferred rows have explicit scope decisions and are not silently counted as shipped.
- Every meaningful architecture change refreshes this dashboard and its source matrix.

## Next Actions

| Row | Bucket | Owner | Next verification |
| --- | --- | --- | --- |
| `ARCH-CONNECTORS-001` | `DEFERRED` | Backend + Ops | Run provider activation smoke after ClickUp/Calendar/Drive credentials exist and organizer launch scope expands. |
| `ARCH-PROACTIVE-001` | `DEFERRED` | Backend + Ops | Run target proactive sample only when proactive launch scope expands. |
| `ARCH-DEPLOY-AUTO-001` | `DEFERRED` | Ops/Release | On the next release candidate, capture source/webhook deploy convergence or explicit fallback evidence. |
| `ARCH-MOBILE-001` | `DEFERRED` | Mobile + Planning | Do not pursue native app proof unless scope is reactivated; keep validating web mobile/tablet/desktop breakpoints through ARCH-WEB-UX-001. |

## Active Blockers

- none

## Evidence Gaps

- none

## Deferred Scope

| Row | Bucket | Owner | Next verification |
| --- | --- | --- | --- |
| `ARCH-CONNECTORS-001` | `DEFERRED` | Backend + Ops | Run provider activation smoke after ClickUp/Calendar/Drive credentials exist and organizer launch scope expands. |
| `ARCH-DEPLOY-AUTO-001` | `DEFERRED` | Ops/Release | On the next release candidate, capture source/webhook deploy convergence or explicit fallback evidence. |
| `ARCH-PROACTIVE-001` | `DEFERRED` | Backend + Ops | Run target proactive sample only when proactive launch scope expands. |
| `ARCH-MOBILE-001` | `DEFERRED` | Mobile + Planning | Do not pursue native app proof unless scope is reactivated; keep validating web mobile/tablet/desktop breakpoints through ARCH-WEB-UX-001. |

## Ready Core

| Row | Bucket | Owner | Next verification |
| --- | --- | --- | --- |
| `ARCH-ACTION-LOOP-001` | `READY` | Backend + QA | Plan deeper execute-observe-adjust only from a narrow evidence-backed task. |
| `ARCH-AI-SECURITY-001` | `READY` | Security + QA | Rerun red-team pack after prompt, expression, action, auth, or provider changes. |
| `ARCH-AUTH-APP-001` | `READY` | Backend + Frontend | Keep cross-user/session regressions in the release gate. |
| `ARCH-MEMORY-REFLECTION-001` | `READY` | Backend + QA | Keep relation and memory consistency in future AI/runtime changes. |
| `ARCH-RELEASE-OPS-001` | `READY` | Ops/Release | Refresh release evidence index for every selected candidate. |
| `ARCH-RUNTIME-001` | `READY` | Backend + QA | Keep full backend gate after shared runtime contract changes. |
| `ARCH-WEB-ROUTES-001` | `READY` | Frontend + QA | Keep route smoke in every route/frontend architecture change. |
| `ARCH-DOC-MAPS-001` | `READY` | Documentation | Keep secondary maps refreshed whenever architecture audit rows materially change. |
| `ARCH-DOCS-GOV-001` | `READY` | Planning + Documentation | Use this matrix to select future evidence/fix tasks before inventing new work. |
| `ARCH-TEST-EVIDENCE-001` | `READY` | QA/Test | Keep row-specific command packs current when architecture rows or validation ownership change. |
| `ARCH-WEB-UX-001` | `READY` | Frontend + QA | Keep route-state/accessibility smoke in route-shell and shared-control changes. |

## Refresh Commands

```powershell
Push-Location .\backend; ..\.venv\Scripts\python .\scripts\audit_architecture_implementation_map.py; if ($LASTEXITCODE -eq 0) { ..\.venv\Scripts\python .\scripts\generate_project_status_dashboard.py }; $exit=$LASTEXITCODE; Pop-Location; exit $exit
```

## Operating Rule

Use this dashboard to answer where the project is before selecting work. If a relevant row exists, use its row ID in the next task contract.
