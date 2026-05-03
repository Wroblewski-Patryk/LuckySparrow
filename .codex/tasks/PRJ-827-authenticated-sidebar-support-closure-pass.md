# Task

## Header
- ID: PRJ-827
- Title: Authenticated sidebar support closure pass
- Task Type: design
- Current Stage: release
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-826
- Priority: P1

## Context
The first sidebar exactness slice tightened the rail, lockup, and nav rhythm.
The next visible drift is concentrated in the lower support stack, especially
the `System Health` emblem and the final closure cadence of the identity and
quote cards.

## Goal
Calm the authenticated sidebar support stack so the lower third of the rail
matches the canonical sidebar more closely.

## Success Signal
- User or operator problem:
  - the lower support stack still feels slightly too orb-heavy and panel-like
- Expected product or reliability outcome:
  - the lower sidebar closure reads as one calm, elegant sequence
- How success will be observed:
  - the health emblem is lighter and the bottom stack feels more editorial
- Post-launch learning needed: no

## Deliverable For This Stage
A bounded sidebar-only implementation slice targeting the support stack and
closure rhythm.

## Scope
- `web/src/App.tsx`
- `web/src/index.css`
- `docs/planning/canonical-100-slice-closure-map.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Implementation Plan
1. Reduce the `System Health` orb weight and tighten its text hierarchy.
2. Tighten the support-stack spacing and the quote-card closure rhythm.
3. Update the closure map active-surface note so planning truth matches the
   current shell/sidebar lane.
4. Run focused validation and sync context.

## Acceptance Criteria
- the health emblem is visibly lighter and smaller
- the lower support stack reads more like one calm closure sequence
- the closure-map note no longer claims `home` is the active surface
- focused validation passes

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- stay within the declared current stage unless explicit approval changes it

## Definition of Done
- [x] Sidebar support stack is refined in code.
- [x] Closure-map planning truth is updated.
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
  - reviewed the sidebar lower stack against the canonical sidebar support
    sequence before touching route-local surfaces
- Screenshots/logs:
  - deploy-side sidebar proof still pending
- High-risk checks:
  - `git diff --check -- web/src/App.tsx web/src/index.css docs/planning/canonical-100-slice-closure-map.md .codex/tasks/PRJ-827-authenticated-sidebar-support-closure-pass.md`

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed: `docs/planning/sidebar-layout-canonical-convergence-plan.md`, `docs/planning/canonical-100-slice-closure-map.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed:
- Follow-up architecture doc updates:

## UX/UI Evidence (required for UX tasks)
- Design source type: approved_snapshot
- Design source reference: `docs/ux/assets/aviary-sidebar-layout-canonical-reference-v1.png`
- Canonical visual target: authenticated desktop sidebar lower support stack
- Fidelity target: pixel_close
- Stitch used: no
- Experience-quality bar reviewed: yes
- Visual-direction brief reviewed: yes
- Existing shared pattern reused: authenticated sidebar support stack
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
- Accessibility checks: visual hierarchy only
- Parity evidence:

## Deployment / Ops Evidence (required for runtime or infra tasks)
- Deploy impact: low
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: no
- Rollback note: revert sidebar support-stack slice
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
This slice stays on the authenticated desktop sidebar only and does not reopen
route-level dashboard, chat, or personality work.

## Closure Sync - 2026-05-03

- Current release status:
  - DONE as a historical authenticated-sidebar support-stack closure slice.
- Current source truth:
  - `web/src/App.tsx` keeps the sidebar health, identity, and quote support
    stack hooks.
  - `web/src/index.css` keeps the lower support-stack density, health-emblem,
    identity-card, and quote-card closure rules from this slice.
  - `docs/planning/canonical-100-slice-closure-map.md` was corrected during
    the original implementation so active planning truth moved from `home` to
    the shell/sidebar lane.
- Superseding proof owners:
  - `PRJ-868` canonical layout foundation.
  - `PRJ-875` canonical UI final route sweep.
  - `docs/ux/flagship-baseline-transfer.md`.
- Closure evidence:
  - reviewed this task history, current sidebar source, closure-map note,
    design memory, flagship baseline transfer, and later project/board proof.
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
- Existing workaround or pain: sidebar support stack remains too orb-heavy
- Smallest useful slice: health-emblem and closure-rhythm pass
- Success metric or signal: calmer bottom stack closer to canonical
- Feature flag, staged rollout, or disable path: no
- Post-launch feedback or metric check: deploy-side visual compare

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
  - reduced the `System Health` emblem weight, tightened the lower support
    stack, and corrected the canonical-closure quote rendering
- Files changed:
  - `web/src/App.tsx`
  - `web/src/index.css`
  - `docs/planning/canonical-100-slice-closure-map.md`
  - `.codex/tasks/PRJ-827-authenticated-sidebar-support-closure-pass.md`
- How tested:
  - `Push-Location .\web; npm run build; Pop-Location`
  - `git diff --check -- web/src/App.tsx web/src/index.css docs/planning/canonical-100-slice-closure-map.md .codex/tasks/PRJ-827-authenticated-sidebar-support-closure-pass.md`
- What is incomplete:
  - deploy-side proof for the authenticated sidebar still needs to confirm the
    `95%` gate
- Next steps:
  - compare the deployed sidebar against the canonical rail
  - if needed, take one more bounded slice on final health-card copy spacing
    and bottom-stack gap balance
- Decisions made:
  - updated the 100-slice plan note so the active surface no longer points
    back to `home`
