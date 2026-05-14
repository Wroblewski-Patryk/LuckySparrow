# Task

## Header
- ID: PRJ-1221
- Title: Settings save action hierarchy
- Task Type: design
- Current Stage: verification
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1220
- Priority: P1
- Coverage Ledger Rows: not applicable
- Module Confidence Rows: AVIARY-WEB-RESP-001
- Requirement Rows: REQ-UX-001
- Quality Scenario Rows: QA-UX-001
- Risk Rows: RISK-UI-003
- Iteration: 1221
- Operation Mode: BUILDER
- Mission ID: UXUI-POLISH-2026-05-14
- Mission Status: VERIFIED

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
- Mission objective: Improve Settings mobile action hierarchy by making the save action read as calm primary action instead of a warning-like amber band.
- Release objective advanced: Continue web UX polish from concrete screenshot evidence.
- Included slices: Settings save button styling, responsive proof, source-of-truth updates.
- Explicit exclusions: settings API, persistence, reset flow, auth, backend, deployment.
- Checkpoint cadence: one implementation checkpoint after screenshot review.
- Stop conditions: build failure, route-smoke failure, screenshot regression.
- Handoff expectation: commit and push after validation passes.

## Context
The mobile Settings screenshot shows the `Save settings` button as a strong amber strip immediately before the red reset boundary. That color hierarchy makes a normal save action feel warning-like and visually competes with the destructive section.

## Goal
Make the Settings save action read as the calm primary action for the form while preserving the existing reset danger boundary and form submission behavior.

## Success Signal
- User or operator problem: mobile Settings looks visually tense because normal save and destructive reset both feel like alert surfaces.
- Expected product or reliability outcome: Settings feels safer and clearer during repeated account/profile editing.
- How success will be observed: refreshed Settings screenshots show a teal primary save action with the reset boundary still visually distinct.
- Post-launch learning needed: no

## Deliverable For This Stage
Route-local Settings CSS and markup class polish plus responsive/navigation validation evidence.

## Constraints
- reuse the existing `SettingsSavePanel`
- do not change save settings payload, API behavior, validation, auth, or reset behavior
- do not change global `btn-primary`
- preserve desktop, tablet, and mobile Settings layout models

## Scope
- `web/src/App.tsx`
- `web/src/index.css`
- source-of-truth state/docs touched by this UI mission

## Implementation Plan
1. Add a route-local class to the Settings save submit button.
2. Style that button as a calm teal primary action with disabled state support.
3. Run web build and UI audits sequentially.
4. Review refreshed Settings desktop/tablet/mobile screenshots.
5. Update source-of-truth files.
6. Commit and push after checks pass.

## Acceptance Criteria
- Settings save action no longer uses warning-like amber as its dominant color.
- Reset runtime data boundary remains visually distinct and unchanged in behavior.
- `npm run build`, `npm run audit:ui-responsive`, and `npm run audit:ui-navigation` pass.
- Source-of-truth files record the result and evidence.

## Definition of Done
- [x] Build passes.
- [x] Responsive and navigation audits pass.
- [x] Settings desktop/tablet/mobile screenshots are reviewed.
- [x] Project state, module confidence, requirements, quality, risk, and next steps are updated.
- [x] Changes are committed and pushed.

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
  - `npm run build` in `web/` -> PASS
  - `npm run audit:ui-responsive` in `web/` -> PASS with `route_count=14`,
    `viewport_count=3`, `screenshot_count=18`, `failed_count=0`
  - `node scripts/route-smoke.mjs --screenshots C:\tmp\prj1221-ui-responsive --report C:\tmp\prj1221-ui-responsive\report.json --screenshot-routes /settings --viewports mobile,tablet,desktop` -> PASS with `screenshot_count=3`, `failed_count=0`
  - `npm run audit:ui-navigation` in `web/` -> PASS
- Manual checks: reviewed fresh desktop, tablet, and mobile Settings
  screenshots from `C:\tmp\prj1221-ui-responsive`
- Screenshots/logs:
  - `C:\tmp\prj1221-ui-responsive\mobile-settings.png`
  - `C:\tmp\prj1221-ui-responsive\tablet-settings.png`
  - `C:\tmp\prj1221-ui-responsive\desktop-settings.png`
- High-risk checks: cleanup found no active validation-owned
  `chrome-headless-shell`, no route-smoke/Vite/5173 Node process, and no
  listener on `5173`
- Coverage ledger updated: not applicable
- Coverage rows closed or changed: none
- Module confidence ledger updated: yes
- Module confidence rows closed or changed: AVIARY-WEB-RESP-001
- Requirements matrix updated: yes
- Requirement rows closed or changed: REQ-UX-001
- Quality scenarios updated: yes
- Quality scenario rows closed or changed: QA-UX-001
- Risk register updated: yes
- Risk rows closed or changed: RISK-UI-003
- Reality status: verified

## Architecture Evidence
- Architecture source reviewed: existing Settings route/component contract and `docs/architecture/15_runtime_flow.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: not applicable
- Follow-up architecture doc updates: none

## UX/UI Evidence
- Design source type: approved_snapshot
- Design source reference: `.codex/artifacts/prj1150-v11-ui-responsive-audit/mobile-settings.png`
- Canonical visual target: authenticated settings visual direction
- Fidelity target: structurally_faithful
- Stitch used: no
- Experience-quality bar reviewed: yes
- Visual-direction brief reviewed: yes
- Existing shared pattern reused: Settings save panel
- New shared pattern introduced: no
- Design-memory entry reused: Settings destructive boundaries
- Design-memory update required: yes
- Visual gap audit completed: yes
- Background or decorative asset strategy: unchanged
- Canonical asset extraction required: no
- Screenshot comparison pass completed: yes
- Remaining mismatches: none for this focused slice
- State checks: success
- Feedback locality checked: yes
- Raw technical errors hidden from end users: not applicable
- Responsive checks: desktop, tablet, mobile passed
- Input-mode checks: pointer, touch, keyboard unchanged
- Accessibility checks: button label and disabled state remain semantic
- Parity evidence: Settings save action now uses calm teal primary hierarchy;
  reset danger boundary remains visually distinct

## Deployment / Ops Evidence
- Deploy impact: none
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: no
- Rollback note: revert this frontend-only commit
- Observability or alerting impact: none
- Staged rollout or feature flag: none

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
- [x] Learning journal was updated if a recurring pitfall was confirmed or
  confirmed not needed.

## Notes
Safe assumption: a normal save action should use the calm teal primary action language already present in the Aviary shell, while amber/red should remain reserved for warning or destructive emphasis.

## Result Report
- Result: Settings save submit button now has a route-local teal primary style,
  separating normal persistence from the amber/red semantics used near warnings
  and destructive boundaries.
- Files changed in product code: `web/src/App.tsx`, `web/src/index.css`.
- Architecture impact: none; existing Settings form and submit behavior were
  reused.
- Deployment impact: none; frontend-only visual hierarchy polish.
- Residual risk: future Settings secondary actions should keep destructive,
  warning, and primary color semantics distinct.
