# Task

## Header
- ID: PRJ-1222
- Title: Tools integral status deduplication
- Task Type: design
- Current Stage: verification
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1221
- Priority: P1
- Coverage Ledger Rows: not applicable
- Module Confidence Rows: AVIARY-WEB-RESP-001
- Requirement Rows: REQ-UX-001
- Quality Scenario Rows: QA-UX-001
- Risk Rows: not applicable
- Iteration: 1222
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
- Mission objective: Remove duplicated status pills from Tools item headers when the integral label repeats the visible tool status.
- Release objective advanced: Continue web UX polish from concrete screenshot evidence.
- Included slices: Tools status presentation, responsive proof, source-of-truth updates.
- Explicit exclusions: tools API, provider readiness logic, user-control state, integrations, backend, deployment.
- Checkpoint cadence: one implementation checkpoint after screenshot review.
- Stop conditions: build failure, route-smoke failure, screenshot regression.
- Handoff expectation: commit and push after validation passes.

## Context
The Tools screenshot shows `Internal chat` rendering both a main `Always on` badge and a second uppercase `ALWAYS ON` integral pill. On mobile this reads like a technical duplicate rather than one clear state.

## Goal
Keep Tools item status readable by showing the integral pill only when it adds information beyond the primary status badge.

## Success Signal
- User or operator problem: duplicate status pills make a simple ready tool look more technical and noisy than necessary.
- Expected product or reliability outcome: Tools reads as a calm capability directory with one clear status per item.
- How success will be observed: refreshed Tools screenshots show `Internal chat` with a single `Always on` status while other tool facts remain visible.
- Post-launch learning needed: no

## Deliverable For This Stage
Focused Tools presentation logic plus responsive/navigation validation evidence.

## Constraints
- do not change tools overview data, provider status, link state, or toggle behavior
- keep integral metadata available when it is not a duplicate of the primary status label
- preserve desktop, tablet, and mobile Tools layout models
- avoid global badge styling changes

## Scope
- `web/src/components/tools.tsx`
- source-of-truth state/docs touched by this UI mission

## Implementation Plan
1. Compute the formatted primary status label once in `ToolsItemCard`.
2. Render the integral pill only when it is not a case-insensitive duplicate of the primary status label.
3. Run web build and UI audits sequentially.
4. Review refreshed Tools desktop/tablet/mobile screenshots.
5. Update source-of-truth files.
6. Commit and push after checks pass.

## Acceptance Criteria
- `Internal chat` no longer shows duplicate `Always on` status pills.
- Tools data, provider details, current status, and control surfaces remain unchanged.
- `npm run build`, `npm run audit:ui-responsive`, and `npm run audit:ui-navigation` pass.
- Source-of-truth files record the result and evidence.

## Definition of Done
- [x] Build passes.
- [x] Responsive and navigation audits pass.
- [x] Tools desktop/tablet/mobile screenshots are reviewed.
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
  - `node scripts/route-smoke.mjs --screenshots C:\tmp\prj1222-ui-responsive --report C:\tmp\prj1222-ui-responsive\report.json --screenshot-routes /tools --viewports mobile,tablet,desktop` -> PASS with `screenshot_count=3`, `failed_count=0`
  - `npm run audit:ui-navigation` in `web/` -> PASS
- Manual checks: reviewed fresh desktop, tablet, and mobile Tools screenshots
  from `C:\tmp\prj1222-ui-responsive`
- Screenshots/logs:
  - `C:\tmp\prj1222-ui-responsive\mobile-tools.png`
  - `C:\tmp\prj1222-ui-responsive\tablet-tools.png`
  - `C:\tmp\prj1222-ui-responsive\desktop-tools.png`
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
- Architecture source reviewed: existing Tools route/component contract and `docs/architecture/15_runtime_flow.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: not applicable
- Follow-up architecture doc updates: none

## UX/UI Evidence
- Design source type: approved_snapshot
- Design source reference: `.codex/artifacts/prj1150-v11-ui-responsive-audit/mobile-tools.png`
- Canonical visual target: authenticated tools visual direction
- Fidelity target: structurally_faithful
- Stitch used: no
- Experience-quality bar reviewed: yes
- Visual-direction brief reviewed: yes
- Existing shared pattern reused: Tools item card
- New shared pattern introduced: no
- Design-memory entry reused: Capability cards
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
- Accessibility checks: duplicate visible status reduced while primary status remains visible
- Parity evidence: Tools `Internal chat` now shows one visible `Always on`
  status while availability, provider, link state, current status, and control
  surfaces remain visible

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
Safe assumption: the integral pill is supplemental chrome; when its localized text matches the primary status badge, hiding it improves clarity without removing any unique state.

## Result Report
- Result: Tools item cards now suppress the supplemental integral pill when it
  duplicates the primary status label, reducing visible status noise.
- Files changed in product code: `web/src/components/tools.tsx`.
- Architecture impact: none; existing Tools data and provider/control contracts
  were reused.
- Deployment impact: none; frontend-only presentation logic polish.
- Residual risk: future tool state labels should continue to avoid duplicate
  visible badges when status and supplemental metadata carry the same text.
