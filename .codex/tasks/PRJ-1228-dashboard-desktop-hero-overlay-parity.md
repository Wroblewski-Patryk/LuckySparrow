# Task

## Header
- ID: PRJ-1228
- Title: Dashboard desktop hero overlay parity
- Task Type: design
- Current Stage: verification
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1227
- Priority: P1
- Coverage Ledger Rows: not applicable
- Module Confidence Rows: AVIARY-WEB-RESP-001
- Requirement Rows: REQ-UX-001
- Quality Scenario Rows: QA-UX-001
- Risk Rows: not applicable
- Iteration: 1228
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
- Mission objective: Move the desktop Dashboard hero toward the canonical single scenic composition by overlaying signal cards on the figure stage.
- Release objective advanced: Close the highest visible Dashboard first-viewport gap against the canonical web screen set.
- Included slices: desktop-only Dashboard hero overlay CSS, screenshot comparison, responsive/navigation/account validation, source-of-truth updates.
- Explicit exclusions: dashboard data values, route order, mobile/tablet Dashboard layout, guidance column, lower cards, API, backend, runtime, deployment.
- Checkpoint cadence: one implementation checkpoint after screenshot review.
- Stop conditions: build failure, responsive audit failure, navigation/account proof failure, desktop Dashboard screenshot regression.
- Handoff expectation: commit and push after validation passes.

## Context
The canonical Dashboard requires one continuous scenic hero composition. The
current desktop Dashboard still renders signal cards as separate side columns
around the figure stage, so the first viewport reads as assembled panels rather
than one integrated scene.

## Goal
Make the desktop Dashboard hero read as one scenic composition by overlaying
the signal card columns on top of the figure stage while preserving the
existing mobile/tablet layout and route behavior.

## Success Signal
- User or operator problem: Dashboard is not yet 1:1 enough because the hero feels split into adjacent UI blocks.
- Expected product or reliability outcome: desktop Dashboard first viewport better matches the canonical scenic stage.
- How success will be observed: refreshed desktop Dashboard screenshot shows signal cards sitting inside the hero scene rather than outside it.
- Post-launch learning needed: no

## Deliverable For This Stage
Desktop-only Dashboard hero overlay parity polish plus responsive/navigation
validation evidence.

## Constraints
- preserve Dashboard data, route actions, and lower content
- preserve tablet and mobile Dashboard layouts
- use existing Dashboard components and CSS classes
- do not introduce new assets or route-local systems

## Scope
- `web/src/index.css`
- source-of-truth state/docs touched by this UI mission

## Implementation Plan
1. Add desktop-only CSS so Dashboard signal columns overlay the figure stage.
2. Increase desktop figure-stage height enough for the cards to breathe inside the scene.
3. Keep tablet/mobile Dashboard rules unchanged.
4. Run web build, responsive audit, navigation proof, and account proof.
5. Compare canonical Dashboard and refreshed desktop Dashboard screenshots.
6. Update source-of-truth files.
7. Commit and push after checks pass.

## Acceptance Criteria
- Desktop Dashboard signal cards appear integrated with the scenic hero stage.
- Tablet and mobile Dashboard screenshots remain stable and readable.
- `npm run build`, `npm run audit:ui-responsive`, `npm run audit:ui-navigation`, and `--account-proof` pass.
- Source-of-truth files record the result and evidence.

## Definition of Done
- [x] Build passes.
- [x] Responsive, navigation, and account audits pass.
- [x] Representative desktop/tablet/mobile screenshots are reviewed.
- [x] Project state, module confidence, requirements, quality, and next steps are updated.
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
- Tests: `npm run build` -> PASS; `npm run audit:ui-responsive` -> PASS with `route_count=14`, `ui_audit.viewport_count=3`, `ui_audit.screenshot_count=18`, `ui_audit.status=ok`, `failed_count=0`; `npm run audit:ui-navigation` -> PASS with `step_count=4`, `failed_count=0`; `node scripts/route-smoke.mjs --account-proof --report .codex/artifacts/prj1225-account-proof/report.json` -> PASS with `account_proof.status=ok`, `step_count=1`, `failed_count=0`, `panel_visible=true`.
- Manual checks: canonical Dashboard reference compared with refreshed desktop Dashboard; refreshed tablet and mobile Dashboard guardrails reviewed.
- Screenshots/logs: `docs/ux/assets/aion-dashboard-canonical-reference-v2.png`; `.codex/artifacts/prj1150-v11-ui-responsive-audit/desktop-dashboard.png`; `.codex/artifacts/prj1150-v11-ui-responsive-audit/tablet-dashboard.png`; `.codex/artifacts/prj1150-v11-ui-responsive-audit/mobile-dashboard.png`; `.codex/artifacts/prj1150-v11-ui-responsive-audit/report.json`; `.codex/artifacts/prj1209-navigation-proof/report.json`; `.codex/artifacts/prj1225-account-proof/report.json`.
- High-risk checks: cleanup check found no active `chrome-headless-shell`, no AION validation Node processes matching `route-smoke|vite|5173`, and no listener on `5173`; one unrelated `Soar` Vitest Node process was observed outside this workspace; `git diff --check` passed with line-ending warnings only.
- Coverage ledger updated: not applicable
- Coverage rows closed or changed: none
- Module confidence ledger updated: yes
- Module confidence rows closed or changed: AVIARY-WEB-RESP-001
- Requirements matrix updated: yes
- Requirement rows closed or changed: REQ-UX-001
- Quality scenarios updated: yes
- Quality scenario rows closed or changed: QA-UX-001
- Risk register updated: not applicable
- Risk rows closed or changed: none
- Reality status: verified

## Architecture Evidence
- Architecture source reviewed: `docs/ux/canonical-web-screen-reference-set.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: not applicable
- Follow-up architecture doc updates: none

## UX/UI Evidence
- Design source type: approved_snapshot
- Design source reference: `docs/ux/assets/aion-dashboard-canonical-reference-v2.png`
- Canonical visual target: Dashboard desktop first viewport
- Fidelity target: structurally_faithful
- Stitch used: no
- Experience-quality bar reviewed: yes
- Visual-direction brief reviewed: yes
- Existing shared pattern reused: Dashboard scenic figure stage and signal cards
- New shared pattern introduced: no
- Design-memory entry reused: Unified dashboard hero artwork
- Design-memory update required: yes
- Visual gap audit completed: yes
- Background or decorative asset strategy: unchanged
- Canonical asset extraction required: no
- Screenshot comparison pass completed: yes
- Remaining mismatches: the Dashboard route still needs additional parity passes for the top utility/browser-frame interpretation, lower card proportions, and exact canonical data/copy density; this slice closed the hero card integration gap
- State checks: not in scope beyond existing route-smoke states
- Feedback locality checked: yes
- Raw technical errors hidden from end users: not applicable
- Responsive checks: desktop/tablet/mobile audit passed
- Input-mode checks: navigation proof and account proof passed
- Accessibility checks: route labels and Dashboard button semantics unchanged
- Parity evidence: desktop Dashboard signal cards now sit inside the scenic hero stage, and desktop-only figure-note callouts are hidden to reduce competing overlays

## Deployment / Ops Evidence
- Deploy impact: none expected
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: no
- Rollback note: revert this frontend-only commit
- Observability or alerting impact: none
- Staged rollout or feature flag: none

## Review Checklist
- [x] Process self-audit completed before implementation.
- [x] Autonomous loop evidence covers all seven steps.
- [x] Exactly one priority task was selected in this iteration.
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
- [x] Learning journal was updated if a recurring pitfall was confirmed or confirmed not needed.

## Notes
Safe assumption: desktop can move signal cards into the scenic hero while
tablet/mobile retain the existing stacked composition until separately proven.

## Result Report
- Added desktop-only Dashboard hero overlay CSS in `web/src/index.css`.
- Signal card columns now overlay the scenic figure stage on desktop instead of sitting as separate adjacent columns.
- Desktop Dashboard figure-note callouts are hidden in the hero stage so the metric overlay becomes the primary canonical card language.
- Tablet and mobile Dashboard layouts are intentionally unchanged.
- No route definitions, data values, route actions, API, backend, runtime, or deployment behavior changed.
