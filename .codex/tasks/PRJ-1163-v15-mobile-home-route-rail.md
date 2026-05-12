# Task

## Header
- ID: PRJ-1163
- Title: Extend the v1.5 mobile route rail to Home
- Task Type: design
- Current Stage: verification
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1162
- Priority: P1
- Coverage Ledger Rows: not applicable
- Module Confidence Rows: AVIARY-MOBILE-UI-001
- Requirement Rows: REQ-MOB-002
- Quality Scenario Rows: QA-MOB-001
- Risk Rows: RISK-MOB-001
- Iteration: 1163
- Operation Mode: BUILDER
- Mission ID: v15-mobile-ui-route-rail-home
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
- Mission objective: make the shared v1.5 mobile route rail the consistent top-level route model, including the Home route.
- Release objective advanced: v1.5 native/mobile UI continuity after the verified v1.1 web milestone.
- Included slices: shared rail route list, Home active state, Home screen adoption, screenshot proof for the seeded mobile route set.
- Explicit exclusions: native tabs migration, Expo Go/device proof, auth transport, app-facing data wiring, backend/API behavior.
- Checkpoint cadence: one bounded UI slice with typecheck, export, screenshots, cleanup, and source-of-truth updates.
- Stop conditions: route render failure, TypeScript failure, screenshot blankness, or navigation structure requiring native tabs decision.
- Handoff expectation: record current proof and keep next work focused on device proof or auth transport before live data wiring.

## Context
`PRJ-1162` introduced a shared mobile route rail for chat, personality,
settings, and tools. Home still used a separate local route button list, which
made the v1.5 navigation model less consistent.

## Goal
Extend the existing shared route rail to include Home and remove Home's local
duplicated route list.

## Scope
- `mobile/src/ui/primitives.tsx`
- `mobile/src/ui/home-screen.tsx`
- `docs/planning/v1.5-mobile-ui-plan.md`
- source-of-truth state/context files

## Implementation Plan
1. Add Home to the shared `RouteRail` route list.
2. Extend the active-route type and active-state comparison for `/`.
3. Render `RouteRail active="home"` in the Home screen.
4. Remove the Home screen's duplicate local route list.
5. Run mobile TypeScript, Expo web export, screenshot capture, cleanup, and doc updates.

## Constraints
- use existing systems and approved mechanisms
- do not introduce native tabs until the navigation model is decided after device proof
- do not introduce backend, auth, provider, debug, or data wiring behavior
- keep the mobile UI a thin client over backend-owned `/app/*` contracts

## Acceptance Criteria
- Home renders the same shared rail pattern as chat, personality, settings, and tools.
- The Home rail item is visibly active on `/`.
- Existing seeded routes still render their active rail item.
- TypeScript and Expo web export pass.
- Screenshot evidence exists for Home plus the seeded mobile routes.

## Definition of Done
- [x] Shared route rail includes Home.
- [x] Home uses the shared route rail instead of a local duplicate.
- [x] Mobile typecheck passes.
- [x] Expo web export passes.
- [x] Screenshot evidence exists and was reviewed.
- [x] Validation processes and generated export output were cleaned up.
- [x] Source-of-truth docs and ledgers are updated.

## Stage Exit Criteria
- [x] The output matches the declared `Current Stage`.
- [x] Work from later stages was not mixed in without explicit approval.
- [x] Risks and assumptions for this stage are stated clearly.

## Forbidden
- new systems without approval
- duplicated navigation logic
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval
- implicit stage skipping

## Validation Evidence
- Tests:
  - `Push-Location .\mobile; npm run typecheck; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> PASS
  - `Push-Location .\mobile; npx expo export --platform web --output-dir .expo-web-export; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> PASS
- Manual checks:
  - reviewed `mobile-home-rail-390x1200.png`
  - reviewed `mobile-chat-rail-390x1200.png`
- Screenshots/logs:
  - `.codex/artifacts/prj1163-mobile-home-route-rail/`
- High-risk checks:
  - no backend, auth, provider, internal debug, or data wiring behavior changed
  - cleanup found no `chrome-headless-shell` process and no active listener on port `8089`
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
- Design source reference: `docs/planning/v1.5-mobile-ui-plan.md`; `.codex/artifacts/prj1162-mobile-route-rail/`
- Canonical visual target: v1.5 mobile route seed navigation continuity
- Fidelity target: structurally_faithful
- Stitch used: no
- Experience-quality bar reviewed: yes
- Visual-direction brief reviewed: yes
- Existing shared pattern reused: `RouteRail`
- New shared pattern introduced: no
- Design-memory entry reused: mobile route rail from `PRJ-1162`
- Design-memory update required: no
- Visual gap audit completed: yes
- Background or decorative asset strategy: none
- Canonical asset extraction required: no
- Screenshot comparison pass completed: yes
- Remaining mismatches: device/simulator proof still pending for v1.5 readiness
- State checks: success
- Feedback locality checked: yes
- Raw technical errors hidden from end users: not applicable
- Responsive checks: mobile
- Input-mode checks: touch proxy through visible touch-sized controls
- Accessibility checks: route items keep `accessibilityRole="button"`
- Parity evidence: `.codex/artifacts/prj1163-mobile-home-route-rail/`

## Deployment / Ops Evidence
- Deploy impact: none
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: not applicable
- Rollback note: revert the two mobile UI files if route rail adoption regresses mobile navigation.
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
The validation still uses Expo web export as a render proxy. Device/simulator
proof remains the next mobile readiness gap.

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
- Regression check performed: mobile TypeScript, Expo export, and screenshot sweep

## Product / Discovery Evidence
- Problem validated: yes
- User or operator affected: mobile Aviary user
- Existing workaround or pain: Home used a separate duplicated route button list after the shared route rail was introduced.
- Smallest useful slice: extend the existing shared rail to Home.
- Success metric or signal: route rail screenshots show active Home plus active seeded route states.
- Feature flag, staged rollout, or disable path: not applicable
- Post-launch feedback or metric check: no

## User Feedback Evidence
- `docs/governance/user-feedback-loop.md` reviewed: yes
- Feedback item IDs: user requested continuing UI work
- Feedback accepted: continue all UI work within the current v1.5 lane
- Feedback needs clarification: none for this bounded slice
- Feedback conflicts: none
- Feedback deferred or rejected: native tabs decision deferred until device proof
- Active task changed by feedback: yes
- New task created from feedback: yes
- Design memory updated: no
- Learning journal updated: no

## Reliability / Observability Evidence
- `docs/operations/service-reliability-and-observability.md` reviewed: yes
- Critical user journey: mobile route navigation seed
- SLI: seeded route render success via export proxy
- SLO: not applicable for local UI seed
- Error budget posture: not applicable
- Health/readiness check: not applicable
- Logs, dashboard, or alert route: not applicable
- Smoke command or manual smoke: screenshot sweep
- Rollback or disable path: revert mobile UI files

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
- Data classification: static mobile UI labels and sample state only
- Trust boundaries: no backend, auth, provider, debug, or secret boundary changed
- Permission or ownership checks: not applicable
- Abuse cases: route navigation must not expose internal debug or provider secrets
- Secret handling: none
- Security tests or scans: not applicable
- Fail-closed behavior: not applicable
- Residual risk: device/simulator proof is still pending

## Result Report

- Task summary: added Home to the shared v1.5 mobile route rail and replaced Home's duplicate local route list with `RouteRail active="home"`.
- Files changed: `mobile/src/ui/primitives.tsx`, `mobile/src/ui/home-screen.tsx`, this task file, and source-of-truth docs/state files.
- How tested: mobile typecheck, Expo web export, fallback-hosted screenshots for Home/chat/personality/settings/tools, cleanup check.
- What is incomplete: native device/simulator proof and final native auth transport.
- Next steps: capture Expo Go/simulator proof or make the native auth transport decision before app-facing data wiring.
- Decisions made: keep the simple shared route rail as the current v1.5 navigation seed instead of introducing native tabs in this slice.

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: Home still duplicated route navigation after `PRJ-1162`.
- Gaps: device/simulator proof remains missing.
- Inconsistencies: shared route rail did not include `/`.
- Architecture constraints: native UI stays a thin client over backend-owned contracts.

### 1a. Bootstrap Missing Project Knowledge
- Bootstrap needed: no
- Missing or template-like files: none for this slice
- Sources scanned: task board, mobile UI plan, task template, module confidence ledger
- Rows created or corrected: PRJ-1163 task and source-of-truth references
- Assumptions recorded: Expo web export remains acceptable render proxy until device proof
- Blocking unknowns: none for this UI-only slice
- Why it was safe to continue: no product, auth, data, provider, or architecture decision changed

### 2. Select One Priority Mission Objective
- Selected task: PRJ-1163
- Priority rationale: remove duplicated navigation logic and improve mobile route continuity.
- Why other candidates were deferred: live data wiring depends on auth transport; native tabs should wait for device proof.

### 3. Plan Implementation
- Files or surfaces to modify: shared mobile primitives and Home screen.
- Logic: add `/` route and active Home state.
- Edge cases: keep route buttons touch-sized after adding a fifth item.

### 4. Execute Implementation
- Implementation notes: reused `RouteRail`; removed Home-local route list.

### 5. Verify and Test
- Validation performed: typecheck, Expo export, screenshot sweep, cleanup.
- Result: PASS

### 6. Self-Review
- Simpler option considered: leave Home-local buttons. Rejected because it preserves duplicated navigation.
- Technical debt introduced: no
- Scalability assessment: route list remains centralized for the current seed.
- Refinements made: adjusted rail item minimum width so five routes wrap cleanly.

### 7. Update Documentation and Knowledge
- Docs updated: `docs/planning/v1.5-mobile-ui-plan.md`, state/context files
- Context updated: yes
- Learning journal updated: not applicable.
