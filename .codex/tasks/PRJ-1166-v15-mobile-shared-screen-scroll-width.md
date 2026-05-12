# Task

## Header
- ID: PRJ-1166
- Title: Add shared v1.5 mobile screen scroll width behavior
- Task Type: design
- Current Stage: verification
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1165
- Priority: P1
- Coverage Ledger Rows: not applicable
- Module Confidence Rows: AVIARY-MOBILE-UI-001
- Requirement Rows: REQ-MOB-002
- Quality Scenario Rows: QA-MOB-001
- Risk Rows: RISK-MOB-001
- Iteration: 1166
- Operation Mode: BUILDER
- Mission ID: v15-mobile-shared-screen-scroll-width
- Mission Status: VERIFIED

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.
- [x] `.agents/core/project-memory-index.md` was reviewed in the active UI mission sequence.
- [x] `.agents/core/mission-control.md` was reviewed for long-running work in the active UI mission sequence.
- [x] Missing or template-like state tables were bootstrapped from repository sources, or confirmed not needed.
- [x] Affected module confidence rows were identified.
- [x] Affected requirement, quality scenario, and risk rows were identified or marked not applicable.
- [x] The task or mission improves release confidence, not only local code appearance.

## Mission Block
- Mission objective: make seeded v1.5 mobile screens share one centered scroll container and tablet reading width.
- Release objective advanced: v1.5 native/mobile UI quality after phone/tablet audit coverage.
- Included slices: shared `ScreenScrollView`, seeded route adoption, tablet width limit, audit proof.
- Explicit exclusions: native tabs, Expo Go/device proof, backend/API/auth/data wiring.
- Checkpoint cadence: one bounded UI refactor with typecheck, phone/tablet audit, screenshot review, cleanup, and docs.
- Stop conditions: TypeScript failure, route audit failure, tablet screenshot regression, or export/process cleanup failure.
- Handoff expectation: future seeded mobile route screens should use `ScreenScrollView`.

## Context
The seeded Home, chat, personality, settings, and tools screens each owned a
local `ScrollView` wrapper. Tablet screenshots rendered correctly, but larger
touch layouts benefited from a shared centered content width rather than
per-screen scroll container copies.

## Goal
Introduce a shared `ScreenScrollView` primitive and use it across seeded v1.5
mobile screens, with a centered max-width for tablet layouts.

## Scope
- `mobile/src/ui/primitives.tsx`
- `mobile/src/ui/home-screen.tsx`
- `mobile/src/ui/chat-screen.tsx`
- `mobile/src/ui/personality-screen.tsx`
- `mobile/src/ui/settings-screen.tsx`
- `mobile/src/ui/tools-screen.tsx`
- source-of-truth docs/state files

## Implementation Plan
1. Add `ScreenScrollView` to shared mobile primitives.
2. Move common scroll background, spacing, padding, and max-width behavior into that primitive.
3. Replace seeded route-local `ScrollView` wrappers with the shared primitive.
4. Keep route-specific responsive layout logic where screens still need it.
5. Run typecheck and phone/tablet mobile UI audit.

## Constraints
- use existing Expo Router and React Native primitives
- do not introduce a new layout framework
- do not wire backend, auth, provider, debug, or data behavior
- keep all seeded routes as thin clients over backend-owned contracts

## Acceptance Criteria
- All seeded screens use the shared scroll primitive.
- Phone layout still renders.
- Tablet layout uses a centered, calmer content width.
- `npm run typecheck` passes.
- `npm run audit:ui-mobile` passes with phone and tablet screenshots.

## Definition of Done
- [x] `ScreenScrollView` exists.
- [x] Home/chat/personality/settings/tools use it.
- [x] mobile typecheck passes.
- [x] mobile UI audit passes.
- [x] tablet screenshot evidence was reviewed.
- [x] generated export output and validation processes were cleaned up.
- [x] source-of-truth docs and ledgers are updated.

## Stage Exit Criteria
- [x] The output matches the declared `Current Stage`.
- [x] Work from later stages was not mixed in without explicit approval.
- [x] Risks and assumptions for this stage are stated clearly.

## Forbidden
- new systems without approval
- duplicated screen scroll wrappers
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval
- implicit stage skipping

## Validation Evidence
- Tests:
  - `Push-Location .\mobile; npm run typecheck; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> PASS
  - `Push-Location .\mobile; npm run audit:ui-mobile; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> PASS; `route_count=5`, `viewport_count=2`, `screenshot_count=10`, `failed_count=0`, `export_cleaned=true`
- Manual checks:
  - reviewed `.codex/artifacts/prj1164-mobile-ui-audit/mobile-home-tablet-820x1180.png`
- Screenshots/logs:
  - `.codex/artifacts/prj1164-mobile-ui-audit/`
- High-risk checks:
  - no backend, auth, provider, internal debug, or data wiring behavior changed
- Coverage ledger updated: not applicable
- Module confidence ledger updated: yes
- Module confidence rows closed or changed: AVIARY-MOBILE-UI-001
- Requirements matrix updated: yes
- Requirement rows closed or changed: REQ-MOB-002
- Quality scenarios updated: yes
- Quality scenario rows closed or changed: QA-MOB-001
- Risk register updated: yes
- Risk rows closed or changed: RISK-MOB-001
- Reality status: verified

## Architecture Evidence
- Architecture source reviewed: `docs/planning/mobile-client-baseline.md`, `docs/planning/v1.5-mobile-ui-plan.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: not applicable
- Follow-up architecture doc updates: none

## UX/UI Evidence
- Design source type: approved_snapshot
- Design source reference: `docs/planning/v1.5-mobile-ui-plan.md`
- Canonical visual target: seeded v1.5 mobile route set across phone and tablet touch viewports
- Fidelity target: structurally_faithful
- Stitch used: no
- Experience-quality bar reviewed: yes
- Visual-direction brief reviewed: yes
- Existing shared pattern reused: shared mobile primitives
- New shared pattern introduced: yes
- Design-memory entry reused: v1.5 route rail and seeded route screenshots
- Design-memory update required: no
- Visual gap audit completed: yes
- Background or decorative asset strategy: none
- Canonical asset extraction required: no
- Screenshot comparison pass completed: yes
- Remaining mismatches: native device/simulator proof still pending
- State checks: success
- Feedback locality checked: yes
- Raw technical errors hidden from end users: not applicable
- Responsive checks: mobile, tablet
- Input-mode checks: touch proxy through visible route controls
- Accessibility checks: route items retain `accessibilityRole="button"`
- Parity evidence: `.codex/artifacts/prj1164-mobile-ui-audit/report.json`

## Deployment / Ops Evidence
- Deploy impact: none
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: not applicable
- Rollback note: revert the shared `ScreenScrollView` adoption if seeded route layout regresses.
- Observability or alerting impact: none
- Staged rollout or feature flag: not applicable

## Review Checklist
- [x] Process self-audit completed before implementation.
- [x] Autonomous loop evidence covers all seven steps.
- [x] Exactly one priority task was completed in this iteration.
- [x] Operation mode was selected according to iteration rotation.
- [x] Current stage is declared and respected.
- [x] Deliverable for the current stage is complete.
- [x] Architecture alignment confirmed.
- [x] Existing systems were reused where applicable.
- [x] No workaround paths were introduced.
- [x] No logic duplication was introduced.
- [x] Definition of Done evidence is attached.
- [x] Relevant validations were run.
- [x] Docs or context were updated if repository truth changed.
- [x] Learning journal was updated if a recurring pitfall was confirmed.

## Notes
This remains Expo web export proof. It improves tablet composition but does not
replace device/simulator validation.

## Production-Grade Required Contract

Every task must include these mandatory sections before it can move to
`READY` or `IN_PROGRESS`:

- `Goal`
- `Scope`
- `Implementation Plan`
- `Acceptance Criteria`
- `Definition of Done`
- `Result Report`

## Integration Evidence
- `INTEGRATION_CHECKLIST.md` reviewed: yes
- Real API/service path used: not applicable
- Endpoint and client contract match: not applicable
- DB schema and migrations verified: not applicable
- Loading state verified: not applicable
- Error state verified: not applicable
- Refresh/restart behavior verified: not applicable
- Regression check performed: mobile audit command and typecheck

## Result Report

- Task summary: added shared `ScreenScrollView` and adopted it across seeded mobile route screens, with centered tablet content width.
- Files changed: `mobile/src/ui/primitives.tsx`, seeded mobile screen files, this task file, and source-of-truth docs/state files.
- How tested: typecheck, phone/tablet mobile UI audit, report readback, tablet screenshot review.
- What is incomplete: native device/simulator proof.
- Next steps: use `ScreenScrollView` for future seeded screens and capture Expo Go/simulator proof when runtime is available.
- Decisions made: keep screen-specific responsive content logic while centralizing shell scroll behavior.

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: five seeded screens duplicated scroll container setup.
- Gaps: tablet reading width was correct enough to render but not intentionally constrained.
- Inconsistencies: screen wrappers could drift in spacing and safe-area handling.
- Architecture constraints: no runtime, auth, provider, or data behavior changes.

### 2. Select One Priority Mission Objective
- Selected task: PRJ-1166
- Priority rationale: reduce UI drift and improve tablet composition across all seeded mobile routes.
- Why other candidates were deferred: live data wiring depends on auth transport; native tabs should wait for device proof.

### 3. Plan Implementation
- Files or surfaces to modify: shared primitives and seeded mobile route UI files.
- Logic: centralize scroll shell and keep local screen content responsive logic.
- Edge cases: phone layout must not change, tablet layout must not over-stretch.

### 4. Execute Implementation
- Implementation notes: added shared `ScreenScrollView` with `maxWidth: 760` and replaced route-local wrappers.

### 5. Verify and Test
- Validation performed: `npm run typecheck`, `npm run audit:ui-mobile`, tablet screenshot review.
- Result: PASS

### 6. Self-Review
- Simpler option considered: only set max width on each screen. Rejected because it would preserve duplicated shell behavior.
- Technical debt introduced: no
- Scalability assessment: future seeded screens can reuse the same primitive.
- Refinements made: max width was tightened from `860` to `760` after realizing the tablet audit width did not exercise the limit.

### 7. Update Documentation and Knowledge
- Docs updated: `docs/planning/v1.5-mobile-ui-plan.md`, state/context files
- Context updated: yes
- Learning journal updated: not applicable.
