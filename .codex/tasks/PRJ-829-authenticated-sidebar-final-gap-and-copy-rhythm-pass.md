# Task

## Header
- ID: PRJ-829
- Title: Authenticated sidebar final gap and copy rhythm pass
- Task Type: design
- Current Stage: release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-828
- Priority: P1

## Context
The authenticated sidebar already received multiple exactness slices. The
remaining likely drift before deploy-side proof is the final rail-to-canvas
relationship and the micro-typography rhythm in the lower support stack.

## Goal
Apply one last bounded sidebar refinement so the rail is calmer and easier to
evaluate against the canonical screenshot.

## Success Signal
- User or operator problem:
  - the sidebar may still feel slightly too spaced out and card-heavy at the
    handoff boundary with the main canvas
- Expected product or reliability outcome:
  - cleaner final parity read for the desktop sidebar
- How success will be observed:
  - the rail and its lower-copy rhythm feel tighter and more canonical
- Post-launch learning needed: no

## Deliverable For This Stage
A bounded authenticated-sidebar refinement pass plus synced task/context notes.

## Scope
- `web/src/App.tsx`
- `web/src/index.css`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Implementation Plan
1. Slightly tighten rail-to-canvas proportion and padding.
2. Tighten lower-stack copy rhythm and compactness.
3. Keep all work inside shared authenticated shell/sidebar surfaces.
4. Run focused validation and sync context.

## Acceptance Criteria
- rail feels slightly slimmer and calmer
- health/identity/quote copy rhythm is tighter
- no route-local screen is touched
- focused validation passes

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- stay within the declared current stage unless explicit approval changes it

## Definition of Done
- [x] Sidebar proportion and copy-rhythm refinements are implemented.
- [x] Context is synced.
- [x] Focused validation evidence is attached.

## Stage Exit Criteria
- [x] The output matches the declared `Current Stage`.
- [x] Work from later stages was not mixed in without explicit approval.
- [x] Risks and assumptions for this stage are stated clearly.

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval
- implicit stage skipping

## Validation Evidence
- Tests:
  - `Push-Location .\web; npm run build; Pop-Location`
- Manual checks:
  - reviewed the rail-to-canvas proportion and lower-stack typography after
    the previous sidebar exactness slices
- Screenshots/logs:
  - deploy-side sidebar proof still pending
- High-risk checks:
  - `git diff --check -- web/src/App.tsx web/src/index.css .codex/tasks/PRJ-829-authenticated-sidebar-final-gap-and-copy-rhythm-pass.md`

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed: `docs/planning/sidebar-layout-canonical-convergence-plan.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed:
- Follow-up architecture doc updates:

## UX/UI Evidence (required for UX tasks)
- Design source type: approved_snapshot
- Design source reference: `docs/ux/assets/aviary-sidebar-layout-canonical-reference-v1.png`
- Canonical visual target: authenticated desktop sidebar
- Fidelity target: pixel_close
- Stitch used: no
- Experience-quality bar reviewed: yes
- Visual-direction brief reviewed: yes
- Existing shared pattern reused: authenticated desktop sidebar
- New shared pattern introduced: no
- Design-memory entry reused: sidebar canonical rail contract
- Design-memory update required: no
- Visual gap audit completed: yes
- Background or decorative asset strategy: existing shell assets only
- Canonical asset extraction required: no
- Screenshot comparison pass completed: no
- Remaining mismatches:
- State checks: success
- Feedback locality checked: yes
- Raw technical errors hidden from end users: yes
- Responsive checks: desktop
- Input-mode checks: pointer
- Accessibility checks: not in this bounded slice
- Parity evidence:

## Deployment / Ops Evidence (required for runtime or infra tasks)
- Deploy impact: low
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: no
- Rollback note: revert bounded sidebar refinement
- Observability or alerting impact: none
- Staged rollout or feature flag: no

## Review Checklist (mandatory)
- [x] Current stage is declared and respected.
- [x] Deliverable for the current stage is complete.
- [x] Architecture alignment confirmed.
- [x] Existing systems were reused where applicable.
- [x] No workaround paths were introduced.
- [x] No logic duplication was introduced.
- [x] Definition of Done evidence is attached.
- [x] Relevant validations were run.
- [x] Docs or context were updated if repository truth changed.
- [x] Learning journal update was not required; no new recurring pitfall was
  confirmed in this closure sync.

## Notes
This slice is intended as the final pre-proof sidebar refinement before moving
to the next canonical surface group.

## Closure Sync - 2026-05-03

- Current release status:
  - DONE as a historical authenticated-sidebar final rhythm slice.
- Current source truth:
  - `web/src/App.tsx` keeps the shared authenticated rail and support-stack
    structure.
  - `web/src/index.css` keeps the rail-to-canvas proportion, rail padding,
    shadow, lower-stack spacing, and micro-typography refinements from this
    slice.
- Superseding proof owners:
  - `PRJ-868` canonical layout foundation.
  - `PRJ-875` canonical UI final route sweep.
  - `docs/ux/flagship-baseline-transfer.md`.
- Closure evidence:
  - reviewed this task history, current sidebar source, design memory,
    flagship baseline transfer, and later project/board proof.
  - no runtime files were changed by this closure sync.

## Production-Grade Required Contract

Every task must include these mandatory sections before it can move to `READY`
or `IN_PROGRESS`:

- `Goal`
- `Scope` with exact files, modules, routes, APIs, schemas, docs, or runtime surfaces
- `Implementation Plan` with step-by-step execution and validation
- `Acceptance Criteria` with testable conditions
- `Definition of Done` using `DEFINITION_OF_DONE.md`
- `Result Report`

Runtime tasks must be delivered as a vertical slice: UI -> logic -> API -> DB
-> validation -> error handling -> test. Partial implementations, mock-only
paths, placeholders, fake data, and temporary fixes are forbidden.

## Integration Evidence

## Product / Discovery Evidence
- Problem validated: yes
- User or operator affected: authenticated desktop users
- Existing workaround or pain: remaining sidebar drift is now mostly micro-rhythm
- Smallest useful slice: final rail and lower-copy rhythm pass
- Success metric or signal: sidebar proof should be easier to clear
- Feature flag, staged rollout, or disable path: no
- Post-launch feedback or metric check: deploy-side screenshot compare

## Reliability / Observability Evidence
- `docs/operations/service-reliability-and-observability.md` reviewed: not applicable
- Critical user journey: authenticated shell opening
- SLI: visual parity only
- SLO: not applicable
- Error budget posture: not applicable
- Health/readiness check: `npm run build`
- Logs, dashboard, or alert route: not applicable
- Smoke command or manual smoke: desktop sidebar visual read
- Rollback or disable path: revert slice

- `INTEGRATION_CHECKLIST.md` reviewed: not applicable
- Real API/service path used: not applicable
- Endpoint and client contract match: not applicable
- DB schema and migrations verified: not applicable
- Loading state verified: not applicable
- Error state verified: not applicable
- Refresh/restart behavior verified: not applicable
- Regression check performed: focused shell/sidebar diff

## AI Testing Evidence (required for AI features)

## Security / Privacy Evidence
- `docs/security/secure-development-lifecycle.md` reviewed: not applicable
- Data classification: not applicable
- Trust boundaries: not applicable
- Permission or ownership checks: not applicable
- Abuse cases: not applicable
- Secret handling: none
- Security tests or scans: not applicable
- Fail-closed behavior: not applicable
- Residual risk: low

- `AI_TESTING_PROTOCOL.md` reviewed: not applicable
- Memory consistency scenarios:
- Multi-step context scenarios:
- Adversarial or role-break scenarios:
- Prompt injection checks:
- Data leakage and unauthorized access checks:
- Result:

## Result Report

- Task summary:
  - applied one last bounded rail/copy-rhythm refinement before sidebar proof
- Files changed:
  - `web/src/App.tsx`
  - `web/src/index.css`
  - `.codex/tasks/PRJ-829-authenticated-sidebar-final-gap-and-copy-rhythm-pass.md`
- How tested:
  - `Push-Location .\web; npm run build; Pop-Location`
  - `git diff --check -- web/src/App.tsx web/src/index.css .codex/tasks/PRJ-829-authenticated-sidebar-final-gap-and-copy-rhythm-pass.md`
- What is incomplete:
  - deploy-side proof still decides whether sidebar is ready to close
- Next steps:
  - compare deployed sidebar
  - if parity clears, move to `dashboard` slices from the canonical closure map
- Decisions made:
  - kept the slice strictly inside shared shell/sidebar surfaces
