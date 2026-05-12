# Task

## Header
- ID: PRJ-1165
- Title: Extend the v1.5 mobile UI audit to phone and tablet viewports
- Task Type: design
- Current Stage: verification
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1164
- Priority: P1
- Coverage Ledger Rows: not applicable
- Module Confidence Rows: AVIARY-MOBILE-UI-001
- Requirement Rows: REQ-MOB-002
- Quality Scenario Rows: QA-MOB-001
- Risk Rows: RISK-MOB-001
- Iteration: 1165
- Operation Mode: TESTER
- Mission ID: v15-mobile-tablet-audit-coverage
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
- Mission objective: expand the repeatable v1.5 mobile UI audit from a phone-only proof to phone plus tablet proof.
- Release objective advanced: v1.5 native/mobile UI confidence after the web v1.1 responsive handoff.
- Included slices: audit viewport expansion, report fields, screenshot naming, proof run, source-of-truth updates.
- Explicit exclusions: native device/simulator proof, native tabs migration, backend/API/auth/data wiring.
- Checkpoint cadence: one bounded validation-tooling slice with audit, typecheck, screenshot review, cleanup, and docs.
- Stop conditions: any route fails screenshot/text proof in either viewport or the exported build is not cleaned up.
- Handoff expectation: use `npm run audit:ui-mobile` as the current phone/tablet UI render gate.

## Context
`PRJ-1164` created `npm run audit:ui-mobile`, but it only captured one phone
viewport. The v1.5 UI lane needs a stronger repeatable proof for larger
touch-screen layouts before deeper mobile work.

## Goal
Extend the mobile UI audit so the same command captures both phone and tablet
screenshots for the seeded v1.5 routes.

## Scope
- `mobile/scripts/mobile-ui-audit.mjs`
- `docs/planning/v1.5-mobile-ui-plan.md`
- source-of-truth state/context files

## Implementation Plan
1. Replace the single audit viewport with explicit `phone` and `tablet` viewports.
2. Capture every seeded route in both viewports.
3. Add report fields for `viewport_count`, `screenshot_count`, and per-result viewport metadata.
4. Run the audit command, typecheck, inspect the report, review a tablet screenshot, and clean up.

## Constraints
- keep the existing package command
- do not introduce a new test framework
- do not wire backend, auth, provider, debug, or data behavior
- do not claim native device readiness from web-export proxy proof

## Acceptance Criteria
- `npm run audit:ui-mobile` passes.
- The report shows `route_count=5`, `viewport_count=2`, `screenshot_count=10`, and `failed_count=0`.
- Phone and tablet screenshots are generated for each seeded route.
- TypeScript passes.
- Generated export output is cleaned after the audit.

## Definition of Done
- [x] mobile UI audit captures phone and tablet viewports.
- [x] report includes viewport and screenshot counts.
- [x] audit command passes.
- [x] mobile typecheck passes.
- [x] tablet screenshot evidence was reviewed.
- [x] source-of-truth docs and ledgers are updated.

## Stage Exit Criteria
- [x] The output matches the declared `Current Stage`.
- [x] Work from later stages was not mixed in without explicit approval.
- [x] Risks and assumptions for this stage are stated clearly.

## Forbidden
- new systems without approval
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval
- implicit stage skipping

## Validation Evidence
- Tests:
  - `Push-Location .\mobile; npm run audit:ui-mobile; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> PASS; `route_count=5`, `viewport_count=2`, `screenshot_count=10`, `failed_count=0`, `export_cleaned=true`
  - `Push-Location .\mobile; npm run typecheck; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> PASS
- Manual checks:
  - reviewed `.codex/artifacts/prj1164-mobile-ui-audit/mobile-personality-tablet-820x1180.png`
  - read back `.codex/artifacts/prj1164-mobile-ui-audit/report.json`
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
- Existing shared pattern reused: `npm run audit:ui-mobile`
- New shared pattern introduced: no
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
- Smoke steps updated: mobile UI audit now covers phone and tablet viewports
- Rollback note: revert the audit script viewport expansion if validation cost or environment compatibility regresses.
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
This remains a web-export render proxy, not a native device proof.

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

## Product / Discovery Evidence
- Problem validated: yes
- User or operator affected: future mobile UI implementer and reviewer
- Existing workaround or pain: mobile audit only proved the phone viewport.
- Smallest useful slice: add tablet proof to the same command.
- Success metric or signal: report status `ok`, ten screenshots, zero failures.
- Feature flag, staged rollout, or disable path: not applicable
- Post-launch feedback or metric check: no

## User Feedback Evidence
- `docs/governance/user-feedback-loop.md` reviewed: yes
- Feedback item IDs: user requested continuing UI work
- Feedback accepted: continue UI work and strengthen the mobile UI proof path
- Feedback needs clarification: none for this bounded validation-tooling slice
- Feedback conflicts: none
- Feedback deferred or rejected: native device/simulator proof remains next
- Active task changed by feedback: yes
- New task created from feedback: yes
- Design memory updated: no
- Learning journal updated: no

## Reliability / Observability Evidence
- `docs/operations/service-reliability-and-observability.md` reviewed: yes
- Critical user journey: seeded mobile route rendering across phone and tablet
- SLI: route render screenshot and expected text pass rate
- SLO: all five seeded routes pass in phone and tablet viewports before claiming UI slice completion
- Error budget posture: healthy
- Health/readiness check: not applicable
- Logs, dashboard, or alert route: JSON report
- Smoke command or manual smoke: `npm run audit:ui-mobile`
- Rollback or disable path: revert audit script viewport expansion

## AI Testing Evidence
- `AI_TESTING_PROTOCOL.md` reviewed: not applicable
- Memory consistency scenarios: not applicable
- Multi-step context scenarios: not applicable
- Adversarial or role-break scenarios: not applicable
- Prompt injection checks: not applicable
- Data leakage and unauthorized access checks: not applicable
- Result: no AI behavior changed

## Security / Privacy Evidence
- `docs/security/secure-development-lifecycle.md` reviewed: yes
- Data classification: static route labels and screenshot artifacts
- Trust boundaries: no backend, auth, provider, debug, secret, or user-data boundary changed
- Permission or ownership checks: not applicable
- Abuse cases: audit must not require provider secrets or expose internal debug routes
- Secret handling: none
- Security tests or scans: not applicable
- Fail-closed behavior: audit exits nonzero when route text or screenshot proof fails
- Residual risk: local Chromium path may require `CHROME_PATH` override outside this Windows setup

## Result Report

- Task summary: extended `npm run audit:ui-mobile` from one phone viewport to phone and tablet screenshots for all seeded routes.
- Files changed: `mobile/scripts/mobile-ui-audit.mjs`, this task file, and source-of-truth docs/state files.
- How tested: audit command, typecheck, report readback, tablet screenshot review.
- What is incomplete: native device/simulator proof.
- Next steps: use the expanded audit for future mobile UI changes and capture Expo Go/simulator proof when runtime is available.
- Decisions made: keep one mobile UI audit command rather than adding separate phone/tablet scripts.

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: repeatable mobile audit existed but only covered a phone viewport.
- Gaps: tablet touch-layout proof was still manual or absent.
- Inconsistencies: screenshot proof from previous tasks included varied dimensions.
- Architecture constraints: validation tooling cannot imply native production readiness.

### 1a. Bootstrap Missing Project Knowledge
- Bootstrap needed: no
- Missing or template-like files: none for this slice
- Sources scanned: mobile audit script, v1.5 plan, Expo UI guidance
- Rows created or corrected: PRJ-1165 task and source-of-truth references
- Assumptions recorded: Expo web export remains acceptable as render proxy until device proof
- Blocking unknowns: none for the audit expansion
- Why it was safe to continue: validation tooling does not change product data, auth, provider, or architecture behavior

### 2. Select One Priority Mission Objective
- Selected task: PRJ-1165
- Priority rationale: reduce responsive regression risk for ongoing UI work.
- Why other candidates were deferred: live data wiring depends on auth transport; native tabs should wait for device proof.

### 3. Plan Implementation
- Files or surfaces to modify: mobile audit helper.
- Logic: iterate seeded routes across phone and tablet viewports.
- Edge cases: keep DOM text checks tied to routes while screenshot checks are viewport-specific.

### 4. Execute Implementation
- Implementation notes: converted one `VIEWPORT` to a `VIEWPORTS` list and expanded report records.

### 5. Verify and Test
- Validation performed: `npm run audit:ui-mobile`, `npm run typecheck`, report readback, tablet screenshot review.
- Result: PASS

### 6. Self-Review
- Simpler option considered: add a second tablet-only command. Rejected because one command is easier to keep as the UI gate.
- Technical debt introduced: low; audit runtime is longer because it captures ten screenshots.
- Scalability assessment: explicit route and viewport lists are appropriate for the current v1.5 seed.
- Refinements made: report now includes `viewport_count` and `screenshot_count`.

### 7. Update Documentation and Knowledge
- Docs updated: `docs/planning/v1.5-mobile-ui-plan.md`, state/context files
- Context updated: yes
- Learning journal updated: not applicable.
