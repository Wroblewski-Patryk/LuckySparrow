# Task

## Header
- ID: PRJ-1167
- Title: Add shared v1.5 mobile screen hero primitive
- Task Type: design
- Current Stage: verification
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1166
- Priority: P1
- Coverage Ledger Rows: not applicable
- Module Confidence Rows: AVIARY-MOBILE-UI-001
- Requirement Rows: REQ-MOB-002
- Quality Scenario Rows: QA-MOB-001
- Risk Rows: RISK-MOB-001
- Iteration: 1167
- Operation Mode: BUILDER
- Mission ID: v15-mobile-shared-screen-hero
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
- Mission objective: reduce seeded route header drift with a shared mobile `ScreenHero` primitive.
- Release objective advanced: v1.5 native/mobile UI quality after shared scroll shell adoption.
- Included slices: shared hero primitive, route adoption for chat/personality/settings/tools, phone/tablet audit proof.
- Explicit exclusions: Home hero redesign, native tabs, Expo Go/device proof, backend/API/auth/data wiring.
- Checkpoint cadence: one bounded UI refactor with typecheck, audit, screenshot review, cleanup, and docs.
- Stop conditions: TypeScript failure, route audit failure, route text regression, or visual screenshot regression.
- Handoff expectation: future seeded route screens should use `ScreenHero` when they need the standard label/title/description/status pattern.

## Context
After `PRJ-1166`, seeded screens shared scroll behavior, but chat,
personality, settings, and tools still duplicated the same route hero layout:
`Panel`, `SectionLabel`, large title, description, and `StatusPill`.

## Goal
Add a shared `ScreenHero` primitive and use it on the standard seeded mobile
routes.

## Scope
- `mobile/src/ui/primitives.tsx`
- `mobile/src/ui/chat-screen.tsx`
- `mobile/src/ui/personality-screen.tsx`
- `mobile/src/ui/settings-screen.tsx`
- `mobile/src/ui/tools-screen.tsx`
- source-of-truth docs/state files

## Implementation Plan
1. Add `ScreenHero` to shared mobile primitives.
2. Keep Home's bespoke introductory hero unchanged.
3. Replace duplicated standard route hero layout on chat, personality, settings, and tools.
4. Run typecheck and phone/tablet mobile UI audit.
5. Review a representative screenshot.

## Constraints
- use existing shared mobile primitives
- do not introduce new routing or data behavior
- do not change backend, auth, provider, debug, or data wiring
- preserve route copy that the mobile UI audit checks

## Acceptance Criteria
- `ScreenHero` exists in shared primitives.
- Chat, personality, settings, and tools use `ScreenHero`.
- Home remains visually distinct.
- `npm run typecheck` passes.
- `npm run audit:ui-mobile` passes with phone/tablet screenshots.

## Definition of Done
- [x] `ScreenHero` exists.
- [x] Standard seeded routes use it.
- [x] mobile typecheck passes.
- [x] mobile UI audit passes.
- [x] representative screenshot was reviewed.
- [x] generated export output and validation processes were cleaned up.
- [x] source-of-truth docs and ledgers are updated.

## Stage Exit Criteria
- [x] The output matches the declared `Current Stage`.
- [x] Work from later stages was not mixed in without explicit approval.
- [x] Risks and assumptions for this stage are stated clearly.

## Forbidden
- duplicated standard route hero wrappers
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval
- implicit stage skipping

## Validation Evidence
- Tests:
  - `Push-Location .\mobile; npm run typecheck; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> PASS
  - `Push-Location .\mobile; npm run audit:ui-mobile; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> PASS; `route_count=5`, `viewport_count=2`, `screenshot_count=10`, `failed_count=0`, `export_cleaned=true`
- Manual checks:
  - reviewed `.codex/artifacts/prj1164-mobile-ui-audit/mobile-chat-phone-390x1200.png`
- Screenshots/logs:
  - `.codex/artifacts/prj1164-mobile-ui-audit/`
- High-risk checks:
  - route text expected by audit remained present
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
- Existing shared pattern reused: `Panel`, `SectionLabel`, `StatusPill`
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
- Accessibility checks: route items retain `accessibilityRole="button"`; hero text remains selectable
- Parity evidence: `.codex/artifacts/prj1164-mobile-ui-audit/report.json`

## Deployment / Ops Evidence
- Deploy impact: none
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: not applicable
- Rollback note: revert `ScreenHero` adoption if standard route hero layout regresses.
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
This is a shared UI primitive refactor only. It does not alter route behavior.

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

- Task summary: added shared `ScreenHero` and adopted it on chat, personality, settings, and tools.
- Files changed: `mobile/src/ui/primitives.tsx`, standard seeded route screen files, this task file, and source-of-truth docs/state files.
- How tested: typecheck, phone/tablet mobile UI audit, screenshot review.
- What is incomplete: native device/simulator proof.
- Next steps: continue using `ScreenHero` for standard seeded route headers and capture Expo Go/simulator proof when runtime is available.
- Decisions made: Home remains bespoke because it is the mobile landing shell, while standard subroutes share the hero primitive.

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: standard route hero layout was duplicated on four screens.
- Gaps: route-local hero wrappers could drift in spacing, text scale, or status placement.
- Inconsistencies: Home should stay bespoke; standard subroutes should share a pattern.
- Architecture constraints: no runtime, auth, provider, or data behavior changes.

### 2. Select One Priority Mission Objective
- Selected task: PRJ-1167
- Priority rationale: reduce UI drift and make future seeded route work cheaper and safer.
- Why other candidates were deferred: native tabs and data wiring require device/auth decisions.

### 3. Plan Implementation
- Files or surfaces to modify: shared primitives and four standard seeded screens.
- Logic: centralize label/title/description/status hero pattern.
- Edge cases: preserve exact route title text used by the audit.

### 4. Execute Implementation
- Implementation notes: added `ScreenHero` using existing `Panel`, `SectionLabel`, and `StatusPill`.

### 5. Verify and Test
- Validation performed: `npm run typecheck`, `npm run audit:ui-mobile`, screenshot review.
- Result: PASS

### 6. Self-Review
- Simpler option considered: leave duplicated wrappers. Rejected because shared route polish would continue to drift.
- Technical debt introduced: no
- Scalability assessment: future standard route headers can reuse one primitive.
- Refinements made: kept Home out of the abstraction to preserve a distinct first-screen hero.

### 7. Update Documentation and Knowledge
- Docs updated: `docs/planning/v1.5-mobile-ui-plan.md`, state/context files
- Context updated: yes
- Learning journal updated: not applicable.
