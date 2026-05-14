# Task

## Header
- ID: PRJ-1224
- Title: Shared shell navigation affordance
- Task Type: design
- Current Stage: verification
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1223
- Priority: P1
- Coverage Ledger Rows: not applicable
- Module Confidence Rows: AVIARY-WEB-RESP-001
- Requirement Rows: REQ-UX-001
- Quality Scenario Rows: QA-UX-001
- Risk Rows: not applicable
- Iteration: 1224
- Operation Mode: ARCHITECT
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
- Mission objective: Improve shared mobile/tablet shell navigation affordance without changing route contracts or navigation behavior.
- Release objective advanced: Continue web UX polish on repeated layout systems rather than only route-local cards.
- Included slices: horizontal route rail scroll affordance, scroll snapping, responsive proof, source-of-truth updates.
- Explicit exclusions: route list, route labels, sidebar information architecture, auth, APIs, backend, deployment.
- Checkpoint cadence: one implementation checkpoint after screenshot review.
- Stop conditions: build failure, route-smoke failure, navigation proof failure, screenshot regression.
- Handoff expectation: commit and push after validation passes.

## Context
The authenticated shell uses the same horizontal route navigation on tablet and mobile headers. It is scrollable, but on mobile it reads like a clipped set of a few tabs rather than an intentional rail with more destinations.

## Goal
Make the shared route rail feel intentionally scrollable and stable across mobile and tablet while preserving desktop sidebar behavior.

## Success Signal
- User or operator problem: repeated navigation feels slightly unfinished because overflow destinations are not visually communicated.
- Expected product or reliability outcome: the shell feels more deliberate and easier to understand across core routes.
- How success will be observed: refreshed mobile/tablet screenshots show a subtle right-edge affordance and stable snapped route chips without document-level overflow.
- Post-launch learning needed: no

## Deliverable For This Stage
Shared shell CSS polish plus responsive/navigation validation evidence.

## Constraints
- do not change route definitions, labels, route order, or `changeRoute` behavior
- preserve desktop sidebar structure and active route state
- keep mobile/tablet rails horizontally scrollable
- avoid route-local nav overrides

## Scope
- `web/src/index.css`
- source-of-truth state/docs touched by this UI mission

## Implementation Plan
1. Add shared edge affordance styling to tablet route switcher and mobile tabbar.
2. Add scroll snapping and end padding so active/last route chips settle cleanly.
3. Run web build and UI audits sequentially.
4. Review refreshed desktop/tablet/mobile screenshots across representative routes.
5. Update source-of-truth files.
6. Commit and push after checks pass.

## Acceptance Criteria
- Mobile/tablet route rails visually communicate horizontal continuation.
- Route rail buttons keep stable dimensions and no document-level overflow.
- Desktop sidebar remains structurally unchanged.
- `npm run build`, `npm run audit:ui-responsive`, and `npm run audit:ui-navigation` pass.
- Source-of-truth files record the result and evidence.

## Definition of Done
- [x] Build passes.
- [x] Responsive and navigation audits pass.
- [x] Representative desktop/tablet/mobile shell screenshots are reviewed.
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
- Tests:
  - `npm run build` in `web/` -> PASS
  - `npm run audit:ui-responsive` in `web/` -> PASS with `route_count=14`,
    `viewport_count=3`, `screenshot_count=18`, `failed_count=0`
  - `npm run audit:ui-navigation` in `web/` -> PASS with `step_count=4`,
    `failed_count=0`
- Manual checks: reviewed refreshed desktop Dashboard, tablet Dashboard,
  mobile Chat, and mobile Settings screenshots from
  `.codex/artifacts/prj1150-v11-ui-responsive-audit`
- Screenshots/logs:
  - `.codex/artifacts/prj1150-v11-ui-responsive-audit/mobile-chat.png`
  - `.codex/artifacts/prj1150-v11-ui-responsive-audit/mobile-settings.png`
  - `.codex/artifacts/prj1150-v11-ui-responsive-audit/tablet-dashboard.png`
  - `.codex/artifacts/prj1150-v11-ui-responsive-audit/desktop-dashboard.png`
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
- Risk register updated: not applicable
- Risk rows closed or changed: none
- Reality status: verified

## Architecture Evidence
- Architecture source reviewed: existing authenticated shell route/navigation contract and `docs/architecture/15_runtime_flow.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: not applicable
- Follow-up architecture doc updates: none

## UX/UI Evidence
- Design source type: approved_snapshot
- Design source reference: `.codex/artifacts/prj1150-v11-ui-responsive-audit/mobile-chat.png`
- Canonical visual target: authenticated shared shell navigation
- Fidelity target: structurally_faithful
- Stitch used: no
- Experience-quality bar reviewed: yes
- Visual-direction brief reviewed: yes
- Existing shared pattern reused: Shell route switcher and mobile tabbar
- New shared pattern introduced: no
- Design-memory entry reused: Shared responsive navigation proof
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
- Accessibility checks: route button labels and nav landmarks remain unchanged
- Parity evidence: mobile/tablet horizontal route rail now shows a subtle
  continuation affordance and snap rhythm while desktop sidebar remains stable

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
Safe assumption: the route rail should remain a horizontal scroll control on mobile/tablet; the gap is affordance and touch rhythm, not route taxonomy.

## Result Report
- Result: shared tablet/mobile route rails now use subtle right-edge fade,
  scroll snapping, and end padding so overflow destinations feel intentional
  instead of clipped.
- Files changed in product code: `web/src/index.css`.
- Architecture impact: none; existing route list, labels, and navigation
  behavior were reused.
- Deployment impact: none; frontend-only shared shell CSS polish.
- Residual risk: future route additions may need a grouped navigation model if
  the rail becomes too long for comfortable scanning.
