# Task

## Header
- ID: PRJ-1199
- Title: Harden mobile device proof doctor
- Task Type: fix
- Current Stage: verification
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1198
- Priority: P2
- Coverage Ledger Rows: ARCH-MOBILE-001
- Module Confidence Rows: AVIARY-MOBILE-UI-001
- Requirement Rows: REQ-MOB-001, REQ-MOB-002
- Quality Scenario Rows: mobile readiness evidence
- Risk Rows: RISK-MOB-001
- Iteration: 1199
- Operation Mode: BUILDER
- Mission ID: PRJ-1199-mobile-device-proof-doctor-hardening
- Mission Status: BLOCKED

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.
- [x] `.agents/core/project-memory-index.md` was reviewed.
- [x] `.agents/core/mission-control.md` was reviewed for long-running work.
- [x] Missing or template-like state tables were bootstrapped from repository sources, or confirmed not needed.
- [x] Affected module confidence rows were identified.
- [x] Affected requirement, quality scenario, and risk rows were identified or marked not applicable.
- [x] The task or mission improves release confidence, not only local code appearance.

## Mission Block
- Mission objective: make the native mobile proof blocker diagnostically precise without claiming proof that cannot run.
- Release objective advanced: mobile readiness evidence and operator unblock clarity.
- Included slices: mobile device doctor script, generated report, source-of-truth updates.
- Explicit exclusions: installing Android Studio/SDK, launching an emulator, deploying production changes.
- Checkpoint cadence: one implementation checkpoint plus command proof.
- Stop conditions: local environment lacks native tooling after diagnosis; record blocker instead of bypassing.
- Handoff expectation: report states exact missing tools, environment variables, SDK path checks, and next command path.

## Context
`ARCH-MOBILE-001` is now correctly `IMPLEMENTED_NOT_VERIFIED`. The next proof requires Android tooling or a supported device. The current doctor only checks `adb` and `emulator` in PATH, which makes the blocker less actionable.

## Goal
Improve `npm run doctor:ui-mobile-device` so it reports environment/SKD/PATH details and concrete next actions for native proof readiness.

## Scope
- `mobile/scripts/mobile-device-proof-doctor.mjs`
- `.codex/artifacts/prj1182-mobile-device-proof-doctor/report.json`
- relevant state/context docs

## Success Signal
- User or operator problem: native proof blocker is visible but too terse.
- Expected product or reliability outcome: next operator action is exact enough to unblock proof without guessing.
- How success will be observed: doctor report includes missing tools, SDK env/path checks, PATH hints, and proof command guidance.
- Post-launch learning needed: no

## Deliverable For This Stage
Hardened doctor script and refreshed blocked report.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- stay within the declared current stage unless explicit approval changes it

## Implementation Plan
1. Extend the doctor with SDK environment and default Windows SDK path checks.
2. Add command availability resolution and explicit next actions for `adb` and `emulator`.
3. Preserve JSON report output and blocked/ready semantics.
4. Run the doctor, mobile typecheck, and relevant existing focused checks.
5. Update source-of-truth state with blocker evidence.

## Acceptance Criteria
- Doctor still writes `report.json`.
- Report contains `environment`, `tool_resolution`, and actionable `next_actions`.
- Current environment remains blocked honestly when Android SDK/tooling is absent.
- Validation commands pass.

## Definition of Done
- [x] Doctor output is more actionable and machine-readable.
- [x] Validation evidence is recorded.
- [x] State/context docs are updated.

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
  - `Push-Location .\mobile; node --check scripts\mobile-device-proof-doctor.mjs; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> PASS
  - `Push-Location .\mobile; npm run doctor:ui-mobile-device; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> `status=blocked`, `missing_tools=["adb","emulator"]`, `native_readiness_claim_allowed=false`
  - `Push-Location .\mobile; npm run typecheck; $exit=$LASTEXITCODE; Pop-Location; exit $exit` -> PASS
- Manual checks: current doctor reports missing `adb`, `emulator`, `ANDROID_HOME`, `ANDROID_SDK_ROOT`, and default Windows SDK path.
- Screenshots/logs: not applicable
- High-risk checks: no install, production, secrets, or deployment changes.
- Coverage ledger updated: yes
- Coverage rows closed or changed: ARCH-MOBILE-001 evidence note
- Module confidence ledger updated: yes
- Module confidence rows closed or changed: AVIARY-MOBILE-UI-001 evidence note
- Requirements matrix updated: yes
- Requirement rows closed or changed: REQ-MOB-001, REQ-MOB-002 evidence note
- Quality scenarios updated: not applicable
- Quality scenario rows closed or changed: none
- Risk register updated: yes
- Risk rows closed or changed: RISK-MOB-001 evidence note
- Reality status: blocked

## Architecture Evidence
- Architecture source reviewed: generated `ARCH-MOBILE-001` row and module confidence ledger.
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: not applicable
- Follow-up architecture doc updates: not expected beyond state/context evidence.

## Deployment / Ops Evidence
- Deploy impact: none
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: not applicable
- Rollback note: revert doctor script if its output contract becomes noisy or incompatible.
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
This task improves proof readiness. It must not mark native mobile as verified without a real device or emulator proof.

## Result Report
- Hardened the mobile device proof doctor with environment, SDK, PATH/tool candidate, proof-readiness, and next-action fields.
- Refreshed the local report. It remains blocked, which is the correct result in this environment.
- Validation passed for script syntax and mobile TypeScript.
- Next unblock action: install Android SDK platform-tools/emulator or connect a supported device, then rerun the doctor and capture Expo Go/simulator proof.
