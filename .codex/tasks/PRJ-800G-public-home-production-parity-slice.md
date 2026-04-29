# Task

## Header
- ID: PRJ-800G
- Title: Public Home Production Parity Slice
- Task Type: design
- Current Stage: verification
- Status: IN_PROGRESS
- Owner: Frontend Builder
- Depends on: PRJ-800E
- Priority: P1

## Context
Production screenshot comparison against
`docs/ux/assets/aion-landing-canonical-reference-v1.png` shows the public
landing is improved, but still visibly drifts in the first viewport:

- the hero headline block is still too tall and dominant relative to the motif scene
- the CTA follow-up is still pill-heavy instead of reading like a lighter trust/micro-proof row
- the overlapping bridge band still feels slightly too tall and text-heavy

The production landing at `/login` is now stable enough to use as the parity
surface, so this slice focuses on the first-screen composition only.

## Goal
Tighten the public landing first viewport on production so the hero, CTA zone,
and bridge band read closer to the canonical landing rhythm.

## Deliverable For This Stage
A production-ready public-home parity refinement pass in `web/src/App.tsx` and
`web/src/index.css`, validated by local build and production screenshot evidence.

## Scope
- `web/src/App.tsx`
- `web/src/index.css`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`
- `.codex/tasks/PRJ-800G-public-home-production-parity-slice.md`

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- stay within the declared current stage unless explicit approval changes it

## Implementation Plan
1. Reduce the visual height of the hero headline block and rebalance line wrapping.
2. Replace the heavy hero pillar pills with a lighter micro-proof row that still
   reuses existing trust-band content.
3. Compress the overlapping bridge band and feature cards.
4. Validate build and focused diff checks.
5. Sync task board and project state.

## Acceptance Criteria
- The hero left column is calmer and shorter.
- The CTA follow-up feels closer to canonical micro-proof than feature pills.
- The bridge band is lighter and less text-heavy.
- Build and focused diff validation pass.

## Definition of Done
- [x] Hero headline block is calmer.
- [x] Micro-proof row replaces the heavier hero pill treatment.
- [x] Bridge band is lighter.
- [x] Build and focused diff validation pass.
- [x] Task board and project state are updated in the same slice.

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
  - `git diff --check -- web/src/App.tsx web/src/index.css .codex/tasks/PRJ-800G-public-home-production-parity-slice.md`
- Manual checks:
  - compared the live production landing at `/login` against the canonical landing
  - targeted the first-viewport drift only, based on the production screenshot
- Screenshots/logs:
  - `.codex/artifacts/prod-login-live-2026-04-29.png`
  - `.codex/artifacts/prod-root-live-wait-2026-04-29.png`
  - `docs/ux/assets/aion-landing-canonical-reference-v1.png`
- High-risk checks:
  - kept the public landing on the existing route contract without adding a new public-only shell mode

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed:
  - `docs/planning/layout-sidebar-home-dashboard-canonical-parity-master-ledger.md`
  - `docs/planning/layout-sidebar-home-dashboard-micro-parity-checklist.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed:
- Follow-up architecture doc updates:

## UX/UI Evidence (required for UX tasks)
- Design source type: approved_snapshot
- Design source reference:
  - `docs/ux/assets/aion-landing-canonical-reference-v1.png`
- Canonical visual target: public home flagship landing
- Fidelity target: pixel_close
- Stitch used: no
- Experience-quality bar reviewed: yes
- Visual-direction brief reviewed: yes
- Existing shared pattern reused: shared canonical persona continuity, existing trust-band content
- New shared pattern introduced: no
- Design-memory entry reused: shared canonical persona continuity
- Design-memory update required: no
- Visual gap audit completed: yes
- Background or decorative asset strategy: reuse existing motif figure and decorative surfaces
- Canonical asset extraction required: no
- Screenshot comparison pass completed: yes
- Remaining mismatches:
  - deploy-side proof after this exact slice is still required
  - full public-home lower-page parity is still secondary to first-viewport parity
- State checks: success
- Responsive checks: desktop-focused in this slice
- Input-mode checks: pointer
- Accessibility checks: headline hierarchy, button labels, content order
- Parity evidence:
  - `.codex/artifacts/prod-login-live-2026-04-29.png`
  - `docs/ux/assets/aion-landing-canonical-reference-v1.png`

## Deployment / Ops Evidence (required for runtime or infra tasks)
- Deploy impact: low
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: no
- Rollback note: revert public-home production parity slice

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
- [ ] Learning journal was updated if a recurring pitfall was confirmed.

## Notes
This slice intentionally stays above the fold because the production screenshot
shows the main remaining brand drift in the first viewport.

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

- `INTEGRATION_CHECKLIST.md` reviewed: not applicable
- Real API/service path used: yes
- Endpoint and client contract match: yes
- DB schema and migrations verified: not applicable
- Loading state verified: not applicable
- Error state verified: not applicable
- Refresh/restart behavior verified: yes
- Regression check performed: build plus focused diff checks

## AI Testing Evidence (required for AI features)

- `AI_TESTING_PROTOCOL.md` reviewed: not applicable
- Memory consistency scenarios:
- Multi-step context scenarios:
- Adversarial or role-break scenarios:
- Prompt injection checks:
- Data leakage and unauthorized access checks:
- Result:

## Result Report

- Task summary:
  - refined the public landing first viewport directly from production evidence
    by calming the hero, replacing heavy feature pills with a lighter micro-proof row,
    and compressing the overlapping bridge band
- Files changed:
  - `web/src/App.tsx`
  - `web/src/index.css`
  - `.codex/tasks/PRJ-800G-public-home-production-parity-slice.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested:
  - `Push-Location .\web; npm run build; Pop-Location`
  - `git diff --check -- web/src/App.tsx web/src/index.css .codex/tasks/PRJ-800G-public-home-production-parity-slice.md`
  - production screenshot review against the canonical landing
- What is incomplete:
  - deploy-side screenshot proof for this exact post-change slice
- Next steps:
  - compare the deployed `/login` landing after push
  - continue the next dashboard and public-home parity loop from live evidence
- Decisions made:
  - reused existing trust-band content to form a lighter micro-proof row
  - avoided inventing a new landing section and kept the work above the fold
