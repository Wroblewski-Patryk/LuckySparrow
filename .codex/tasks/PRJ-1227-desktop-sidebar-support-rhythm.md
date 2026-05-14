# Task

## Header
- ID: PRJ-1227
- Title: Desktop sidebar support rhythm
- Task Type: design
- Current Stage: verification
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-1226
- Priority: P1
- Coverage Ledger Rows: not applicable
- Module Confidence Rows: AVIARY-WEB-RESP-001
- Requirement Rows: REQ-UX-001
- Quality Scenario Rows: QA-UX-001
- Risk Rows: not applicable
- Iteration: 1227
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
- Mission objective: Improve desktop authenticated sidebar rhythm so the support cards follow the navigation like the canonical sidebar reference.
- Release objective advanced: Move the shared authenticated shell closer to the canonical web layout before deeper route-local polish.
- Included slices: desktop sidebar support-stack spacing, screenshot comparison, responsive/navigation/account validation, source-of-truth updates.
- Explicit exclusions: route labels, route order, mobile/tablet header, account panel content, sidebar card content, auth, APIs, backend, runtime, deployment.
- Checkpoint cadence: one implementation checkpoint after desktop screenshot review.
- Stop conditions: build failure, route-smoke failure, navigation/account proof failure, screenshot regression.
- Handoff expectation: commit and push after validation passes.

## Context
The canonical authenticated sidebar reference shows the navigation and support
stack as one calm vertical rail. The current desktop shell pushes the support
stack to the bottom of the viewport, leaving a large dead vertical gap between
`Settings` and `System Health` on desktop routes.

## Goal
Bring the desktop sidebar support stack closer to the canonical vertical rhythm
without changing navigation behavior, mobile/tablet layout, account content, or
route-local screens.

## Success Signal
- User or operator problem: desktop shell feels less faithful to the approved sidebar because the support cards are detached from the nav stack.
- Expected product or reliability outcome: desktop routes reuse a calmer, denser, more canonical sidebar spine.
- How success will be observed: refreshed desktop screenshots show `System Health`, identity, and quote cards following the nav stack with a modest gap instead of being forced to the viewport bottom.
- Post-launch learning needed: no

## Deliverable For This Stage
Desktop sidebar support-stack rhythm polish plus responsive/navigation/account
validation evidence.

## Constraints
- preserve route labels, order, active states, glyphs, and click behavior
- preserve mobile phone and tablet route header models
- preserve account panel behavior and support card content
- use existing sidebar classes and component structure

## Scope
- `web/src/App.tsx`
- `web/src/index.css`
- source-of-truth state/docs touched by this UI mission

## Implementation Plan
1. Remove the desktop sidebar support stack's viewport-bottom push.
2. Tune support-stack spacing through existing sidebar CSS.
3. Run web build, responsive audit, navigation proof, and account proof.
4. Review refreshed desktop Dashboard/Chat screenshots and mobile/tablet guardrail screenshots.
5. Update source-of-truth files.
6. Commit and push after checks pass.

## Acceptance Criteria
- Desktop sidebar support cards follow the nav stack with a canonical modest gap.
- Mobile and tablet screenshots remain stable.
- Sidebar route navigation and account proof still pass.
- `npm run build`, `npm run audit:ui-responsive`, `npm run audit:ui-navigation`, and `--account-proof` pass.
- Source-of-truth files record the result and evidence.

## Definition of Done
- [x] Build passes.
- [x] Responsive, navigation, and account audits pass.
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
- Tests: `npm run build` -> PASS; `npm run audit:ui-responsive` -> PASS with `route_count=14`, `ui_audit.viewport_count=3`, `ui_audit.screenshot_count=18`, `ui_audit.status=ok`, `failed_count=0`; `npm run audit:ui-navigation` -> PASS with `step_count=4`, `failed_count=0`; `node scripts/route-smoke.mjs --account-proof --report .codex/artifacts/prj1225-account-proof/report.json` -> PASS with `account_proof.status=ok`, `step_count=1`, `failed_count=0`, `panel_visible=true`.
- Manual checks: canonical sidebar reference compared with refreshed `desktop-dashboard.png`; refreshed `desktop-chat.png` and `tablet-dashboard.png` reviewed as guardrails.
- Screenshots/logs: `docs/ux/assets/aviary-sidebar-layout-canonical-reference-v1.png`; `.codex/artifacts/prj1150-v11-ui-responsive-audit/desktop-dashboard.png`; `.codex/artifacts/prj1150-v11-ui-responsive-audit/desktop-chat.png`; `.codex/artifacts/prj1150-v11-ui-responsive-audit/tablet-dashboard.png`; `.codex/artifacts/prj1150-v11-ui-responsive-audit/report.json`; `.codex/artifacts/prj1209-navigation-proof/report.json`; `.codex/artifacts/prj1225-account-proof/report.json`.
- High-risk checks: cleanup check found no active `chrome-headless-shell`, no validation Node processes matching `route-smoke|vite|5173`, and no listener on `5173`; `git diff --check` passed with line-ending warnings only.
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
- Architecture source reviewed: existing authenticated shell route/sidebar/navigation contract
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: not applicable
- Follow-up architecture doc updates: none

## UX/UI Evidence
- Design source type: approved_snapshot
- Design source reference: `docs/ux/assets/aviary-sidebar-layout-canonical-reference-v1.png`
- Canonical visual target: authenticated desktop sidebar
- Fidelity target: structurally_faithful
- Stitch used: no
- Experience-quality bar reviewed: yes
- Visual-direction brief reviewed: yes
- Existing shared pattern reused: authenticated desktop sidebar and support cards
- New shared pattern introduced: no
- Design-memory entry reused: Canonical authenticated sidebar spine
- Design-memory update required: yes
- Visual gap audit completed: yes
- Background or decorative asset strategy: unchanged
- Canonical asset extraction required: no
- Screenshot comparison pass completed: yes
- Remaining mismatches: sidebar content still uses Aviary product naming instead of the older AION text in the reference by project decision; this task only fixed support-stack rhythm
- State checks: not in scope beyond existing route-smoke states
- Feedback locality checked: yes
- Raw technical errors hidden from end users: not applicable
- Responsive checks: desktop/tablet/mobile audit passed
- Input-mode checks: navigation proof and account proof passed
- Accessibility checks: route labels, account button, and support card semantics unchanged
- Parity evidence: desktop support cards now follow the navigation stack with a modest canonical gap instead of being pushed to the viewport bottom

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
Safe assumption: the desktop sidebar should stay sticky and compact, but the
support cards should not be pinned to the viewport bottom when the canonical
reference keeps them in the same vertical rhythm as navigation.

## Result Report
- Removed the desktop sidebar support stack's `mt-auto` bottom push in `web/src/App.tsx`.
- Tuned `.aion-sidebar-support-stack` in `web/src/index.css` to sit after navigation with a canonical modest gap.
- No route definitions, labels, order, glyphs, mobile/tablet route headers, account content, auth, API, backend, runtime, or deployment behavior changed.
- Validation passed with web build, responsive audit, navigation proof, account proof, screenshot review, and source-of-truth updates.
