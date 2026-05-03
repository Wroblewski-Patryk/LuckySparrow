# Task

## Header
- ID: PRJ-831
- Title: Dashboard first 10 slice batch and intro pass
- Task Type: design
- Current Stage: release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-830
- Priority: P1

## Context
The authenticated sidebar has been refined through multiple exactness passes
and is now close enough to move the active flagship lane to `dashboard`.

## Goal
Freeze the first 10 micro-slices for `dashboard` and execute the first bounded
slice so the route begins converging toward the canonical screen in a governed
way.

## Success Signal
- User or operator problem:
  - dashboard still reads more like a composed product screen than a truly
    canonical flagship tableau
- Expected product or reliability outcome:
  - dashboard closure work can proceed in explicit small slices instead of
    broad polish
- How success will be observed:
  - a new dashboard batch exists and the first intro/header slice is
    implemented
- Post-launch learning needed: no

## Deliverable For This Stage
A first 10-slice dashboard batch plus the first bounded dashboard closure
passes across intro rhythm, hero crop authority, and signal-card softness.

## Scope
- `web/src/App.tsx`
- `web/src/index.css`
- `docs/planning/canonical-100-slice-closure-map.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Implementation Plan
1. Record the first 10 dashboard slices as the active batch.
2. Execute slice 1: intro compression and title authority.
3. Execute slices 2 to 5: hero crop authority, persona-stage authority, and
   left/right signal-card softness.
4. Clean any immediately visible header-glyph drift inside the dashboard hero.
5. Run focused validation and sync context.

## Acceptance Criteria
- first 10 dashboard slices are explicitly written down
- dashboard hero intro is visually calmer and more authoritative
- no unrelated route is touched
- focused validation passes

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- stay within the declared current stage unless explicit approval changes it

## Definition of Done
- [x] Dashboard batch plan is written.
- [x] First dashboard slices are implemented.
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
  - reviewed the dashboard hero opening against the canonical dashboard lane
    and targeted only the first intro/header slice
- Screenshots/logs:
  - deploy-side dashboard proof still pending
- High-risk checks:
  - `git diff --check -- web/src/App.tsx web/src/index.css docs/planning/canonical-100-slice-closure-map.md .codex/tasks/PRJ-831-dashboard-first-10-slice-batch-and-intro-pass.md`

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed: `docs/planning/canonical-100-slice-closure-map.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed:
- Follow-up architecture doc updates:

## UX/UI Evidence (required for UX tasks)
- Design source type: approved_snapshot
- Design source reference: `docs/ux/assets/aion-dashboard-canonical-reference-v2.png`
- Canonical visual target: dashboard
- Fidelity target: pixel_close
- Stitch used: no
- Experience-quality bar reviewed: yes
- Visual-direction brief reviewed: yes
- Existing shared pattern reused: authenticated shell + dashboard flagship stage
- New shared pattern introduced: no
- Design-memory entry reused: yes
- Design-memory update required: no
- Visual gap audit completed: yes
- Background or decorative asset strategy: existing dashboard hero art
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
- Rollback note: revert bounded dashboard slice
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
This task intentionally opens only the dashboard lane after the sidebar batch.

## Closure Sync - 2026-05-03

- Current release status:
  - DONE as a historical dashboard lane opener and first 10-slice batch.
- Current source truth:
  - `web/src/App.tsx` keeps `DASHBOARD_HERO_ART_SRC`, dashboard signal cards,
    figure notes, cognitive flow, guidance rail, recent activity, and
    intention-card hierarchy from the dashboard lane.
  - `web/src/index.css` keeps the dashboard hero, crop, signal-card,
    figure-note, guidance, activity, and closure refinements from this lane.
  - `docs/ux/dashboard-proof-matrix.md` now carries the active dashboard proof
    map.
- Superseding proof owners:
  - `PRJ-870` dashboard `99%` canonical evidence pass.
  - `PRJ-875` canonical UI final route sweep.
  - `docs/ux/dashboard-proof-matrix.md`.
  - `docs/ux/flagship-baseline-transfer.md`.
- Closure evidence:
  - reviewed this task history, current dashboard source, dashboard proof
    matrix, design memory, flagship baseline transfer, and later
    project/board proof.
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
- Existing workaround or pain: dashboard still needs a governed closure lane
- Smallest useful slice: intro compression plus hero-crop batch opener
- Success metric or signal: dashboard lane is explicitly opened and moving
- Feature flag, staged rollout, or disable path: no
- Post-launch feedback or metric check: deploy-side visual compare

## Reliability / Observability Evidence
- `docs/operations/service-reliability-and-observability.md` reviewed: not applicable
- Critical user journey: authenticated dashboard read
- SLI: visual parity only
- SLO: not applicable
- Error budget posture: not applicable
- Health/readiness check: `npm run build`
- Logs, dashboard, or alert route: not applicable
- Smoke command or manual smoke: dashboard visual read
- Rollback or disable path: revert slice

- `INTEGRATION_CHECKLIST.md` reviewed: not applicable
- Real API/service path used: not applicable
- Endpoint and client contract match: not applicable
- DB schema and migrations verified: not applicable
- Loading state verified: not applicable
- Error state verified: not applicable
- Refresh/restart behavior verified: not applicable
- Regression check performed: focused build and diff validation

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
  - froze the first 10 dashboard micro-slices and implemented slices 1 to 10:
    intro compression, hero-header cleanup, central hero crop authority,
    softer left/right signal-card treatment, calmer figure-note placement, and
    a tighter guidance-rail rhythm, denser recent activity, and calmer
    intention-card hierarchy
- Files changed:
  - `web/src/App.tsx`
  - `web/src/index.css`
  - `docs/planning/canonical-100-slice-closure-map.md`
  - `.codex/tasks/PRJ-831-dashboard-first-10-slice-batch-and-intro-pass.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested:
  - `Push-Location .\web; npm run build; Pop-Location`
  - `git diff --check -- web/src/App.tsx web/src/index.css docs/planning/canonical-100-slice-closure-map.md .codex/tasks/PRJ-831-dashboard-first-10-slice-batch-and-intro-pass.md .codex/context/TASK_BOARD.md .codex/context/PROJECT_STATE.md`
- What is incomplete:
  - deploy-side dashboard proof still needs to confirm the lane direction
- Next steps:
  - compare deployed dashboard for the first full 10-slice batch
  - open the next bounded dashboard continuation lane only for remaining drift
- Decisions made:
  - moved the active surface group from sidebar to dashboard
