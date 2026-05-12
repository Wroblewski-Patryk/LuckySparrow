# Task

## Header
- ID: PRJ-1164
- Title: Add a repeatable v1.5 mobile UI audit command
- Task Type: design
- Current Stage: verification
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1163
- Priority: P1
- Coverage Ledger Rows: not applicable
- Module Confidence Rows: AVIARY-MOBILE-UI-001
- Requirement Rows: REQ-MOB-002
- Quality Scenario Rows: QA-MOB-001
- Risk Rows: RISK-MOB-001
- Iteration: 1164
- Operation Mode: BUILDER
- Mission ID: v15-mobile-ui-audit-command
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
- Mission objective: make the v1.5 mobile UI route screenshot proof repeatable through a package script.
- Release objective advanced: v1.5 native/mobile UI confidence after the web v1.1 responsive handoff.
- Included slices: mobile UI audit script, package command, report artifact, screenshot sweep, cleanup behavior.
- Explicit exclusions: native device/simulator proof, native tabs migration, backend/API/auth/data wiring.
- Checkpoint cadence: one bounded validation-tooling slice with proof run and source-of-truth updates.
- Stop conditions: audit cannot render routes, screenshots are missing/blank, report cannot detect route text, cleanup leaves export/processes.
- Handoff expectation: use `npm run audit:ui-mobile` for future mobile UI shell/navigation changes.

## Context
The v1.5 mobile UI lane had repeated manual Expo web export screenshot proof
for Home, chat, personality, settings, and tools. The proof was useful but not
yet packaged as a repeatable command.

## Goal
Add a first-party mobile UI audit command that exports the Expo web build,
fallback-hosts deep links, captures route screenshots, checks route marker
text, writes a JSON report, and cleans up generated export output.

## Scope
- `mobile/package.json`
- `mobile/scripts/mobile-ui-audit.mjs`
- `docs/planning/v1.5-mobile-ui-plan.md`
- source-of-truth state/context files

## Implementation Plan
1. Add a `mobile/scripts/mobile-ui-audit.mjs` helper.
2. Serve `.expo-web-export` with fallback-to-index routing for deep links.
3. Capture Home, chat, personality, settings, and tools screenshots at `390x1200`.
4. Dump each route DOM and assert expected route text is present.
5. Write `.codex/artifacts/prj1164-mobile-ui-audit/report.json`.
6. Add `npm run audit:ui-mobile`.
7. Verify the command and cleanup behavior.

## Constraints
- use existing Expo export proof path
- do not introduce a new test framework or native navigation dependency
- do not wire backend, auth, provider, or data behavior
- keep generated `.expo-web-export` cleanup automatic unless explicitly preserved

## Acceptance Criteria
- `npm run audit:ui-mobile` passes.
- The report includes five seeded routes, nonzero screenshot sizes, and `failed_count=0`.
- Screenshots are stored in `.codex/artifacts/prj1164-mobile-ui-audit/`.
- `.expo-web-export` is cleaned after the audit.
- TypeScript still passes.

## Definition of Done
- [x] mobile UI audit script exists.
- [x] package script exists.
- [x] audit command passes.
- [x] mobile typecheck passes.
- [x] report and screenshots are generated.
- [x] generated export output and validation processes are cleaned up.
- [x] source-of-truth docs and ledgers are updated.

## Stage Exit Criteria
- [x] The output matches the declared `Current Stage`.
- [x] Work from later stages was not mixed in without explicit approval.
- [x] Risks and assumptions for this stage are stated clearly.

## Forbidden
- new systems without approval
- duplicated validation logic outside the mobile script
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval
- implicit stage skipping

## Validation Evidence
- Tests:
  - `Push-Location .\mobile; npm run audit:ui-mobile; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> PASS
  - `Push-Location .\mobile; npm run typecheck; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> PASS
- Manual checks:
  - reviewed `.codex/artifacts/prj1164-mobile-ui-audit/mobile-tools-390x1200.png`
  - read back `.codex/artifacts/prj1164-mobile-ui-audit/report.json`
- Screenshots/logs:
  - `.codex/artifacts/prj1164-mobile-ui-audit/`
- High-risk checks:
  - report shows `route_count=5`, `failed_count=0`, `export_cleaned=true`
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
- Canonical visual target: seeded v1.5 mobile route set
- Fidelity target: structurally_faithful
- Stitch used: no
- Experience-quality bar reviewed: yes
- Visual-direction brief reviewed: yes
- Existing shared pattern reused: Expo web export screenshot proof
- New shared pattern introduced: no
- Design-memory entry reused: v1.5 route rail and seeded route screenshots
- Design-memory update required: no
- Visual gap audit completed: yes
- Background or decorative asset strategy: none
- Canonical asset extraction required: no
- Screenshot comparison pass completed: yes
- Remaining mismatches: device/simulator proof still pending
- State checks: success
- Feedback locality checked: yes
- Raw technical errors hidden from end users: not applicable
- Responsive checks: mobile
- Input-mode checks: touch proxy through visible touch-sized route controls
- Accessibility checks: route items retain `accessibilityRole="button"`
- Parity evidence: `.codex/artifacts/prj1164-mobile-ui-audit/report.json`

## Deployment / Ops Evidence
- Deploy impact: none
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: mobile validation command added
- Rollback note: remove `mobile/scripts/mobile-ui-audit.mjs` and the package script if the audit command regresses local validation.
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
This audit is still an Expo web export render proxy. It improves repeatability
but does not replace Expo Go or simulator proof.

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
- Existing workaround or pain: manual screenshot commands were repeated across v1.5 UI slices.
- Smallest useful slice: package the existing proof path as one audit command.
- Success metric or signal: report status `ok`, five screenshots, zero failures.
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
- Critical user journey: seeded mobile route rendering
- SLI: route render screenshot and expected text pass rate
- SLO: all five seeded routes pass in local audit before claiming UI slice completion
- Error budget posture: healthy
- Health/readiness check: not applicable
- Logs, dashboard, or alert route: JSON report
- Smoke command or manual smoke: `npm run audit:ui-mobile`
- Rollback or disable path: remove the package script and audit helper

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

- Task summary: added `npm run audit:ui-mobile` with route screenshots, DOM text checks, JSON report, and export cleanup.
- Files changed: `mobile/package.json`, `mobile/scripts/mobile-ui-audit.mjs`, this task file, and source-of-truth docs/state files.
- How tested: audit command, typecheck, report readback, screenshot review.
- What is incomplete: native device/simulator proof.
- Next steps: use the audit command for future mobile UI changes and capture Expo Go/simulator proof when runtime is available.
- Decisions made: keep this audit as a lightweight proof tool rather than introducing a broader testing framework.

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: mobile screenshots were repeatable in practice but not packaged as a command.
- Gaps: device/simulator proof remains missing.
- Inconsistencies: manual screenshot ports and artifact paths varied by task.
- Architecture constraints: mobile UI remains a thin client and no runtime behavior changes.

### 1a. Bootstrap Missing Project Knowledge
- Bootstrap needed: no
- Missing or template-like files: none for this slice
- Sources scanned: mobile package scripts, v1.5 plan, existing web route audit pattern
- Rows created or corrected: PRJ-1164 task and source-of-truth references
- Assumptions recorded: Expo web export remains acceptable as render proxy until device proof
- Blocking unknowns: none for the audit command
- Why it was safe to continue: validation tooling does not change product data, auth, provider, or architecture behavior

### 2. Select One Priority Mission Objective
- Selected task: PRJ-1164
- Priority rationale: reduce regression risk for ongoing UI work.
- Why other candidates were deferred: live data wiring depends on auth transport; native tabs should wait for device proof.

### 3. Plan Implementation
- Files or surfaces to modify: package script and mobile audit helper.
- Logic: export, fallback-host, screenshot, dump DOM, report, cleanup.
- Edge cases: deep links need fallback-to-index hosting; screenshots need render wait budget.

### 4. Execute Implementation
- Implementation notes: reused the proven fallback-hosting and headless Chromium pattern from previous v1.5 proof slices.

### 5. Verify and Test
- Validation performed: `npm run audit:ui-mobile`, `npm run typecheck`, report readback, screenshot review.
- Result: PASS

### 6. Self-Review
- Simpler option considered: leave manual commands. Rejected because it preserves avoidable validation drift.
- Technical debt introduced: low; local Chromium path may need `CHROME_PATH` override in other environments.
- Scalability assessment: route list is small and explicit for the current v1.5 seed.
- Refinements made: added default export cleanup after the first successful audit run.

### 7. Update Documentation and Knowledge
- Docs updated: `docs/planning/v1.5-mobile-ui-plan.md`, state/context files
- Context updated: yes
- Learning journal updated: not applicable.
