# Task

## Header
- ID: PRJ-1211
- Title: Chat response readability and desktop height polish
- Task Type: fix
- Current Stage: post-release
- Status: DONE
- Owner: Frontend Builder + QA/Test
- Depends on: PRJ-1209
- Priority: P1
- Coverage Ledger Rows: not applicable
- Module Confidence Rows: AVIARY-WEB-RESP-001, AVIARY-COGNITIVE-RUNTIME-001
- Requirement Rows: not applicable
- Quality Scenario Rows: web responsive readability, chat answer completeness
- Risk Rows: UI clipping, response truncation
- Iteration: 1211
- Operation Mode: BUILDER
- Mission ID: PRJ-1211
- Mission Status: VERIFIED

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.
- [x] `.agents/core/project-memory-index.md` was reviewed.
- [x] `.agents/core/mission-control.md` was reviewed through the AGENTS startup path.
- [x] Missing or template-like state tables were confirmed not needed.
- [x] Affected module confidence rows were identified.
- [x] Affected requirement, quality scenario, and risk rows were identified or marked not applicable.
- [x] The task or mission improves release confidence, not only local code appearance.

## Mission Block
- Mission objective: Fix visible chat response truncation/list continuation and desktop chat height behavior without changing route contracts.
- Release objective advanced: Preserve web responsive shell confidence while improving the important Chat route.
- Included slices: OpenAI reply token budget, chat markdown list continuation, desktop chat stage/transcript/portrait height polish, validation evidence.
- Explicit exclusions: Full chat redesign, new APIs, new data model, sidebar redesign outside the chat route.
- Checkpoint cadence: One implementation and validation checkpoint.
- Stop conditions: Architecture mismatch, failing focused validation that cannot be resolved in scope, or evidence that a backend behavior change is broader than chat answer length.
- Handoff expectation: Record result, validation, residual risk, and next route-local polish.

## Context
User feedback on 2026-05-14 showed the Chat route answer visually ending mid-list and reported that app chat answers are cut even though chat should not impose short answer limits. The same screenshot showed a desktop chat composition where the transcript area needed a viewport-bound max height and the portrait/sidebar column felt too tall.

## Goal
Make chat answers materially less likely to stop mid-thought, render continued list items correctly, and keep the desktop chat surface bounded to the available page height with internal transcript scrolling.

## Success Signal
- User or operator problem: Chat answers and point lists feel unfinished; desktop chat layout stretches awkwardly.
- Expected product or reliability outcome: Longer chat answers can complete, bullet/numbered list continuation renders inside the same list item, and desktop chat transcript uses an internal scroller while the portrait panel stays page-height bounded.
- How success was observed: Focused tests passed and refreshed desktop/tablet/mobile chat screenshots show a complete longer numbered answer without document-level horizontal overflow.
- Post-launch learning needed: yes

## Deliverable For This Stage
Verified implementation plus handoff evidence for the focused chat readability and height fix.

## Scope
- `backend/app/integrations/openai/client.py`
- `backend/tests/test_openai_client.py`
- `web/src/lib/chat-markdown.tsx`
- `web/scripts/chat-markdown-characterization.mjs`
- `web/scripts/route-smoke.mjs`
- `web/src/index.css`
- Project state/task/docs rows needed for handoff

## Implementation Plan
1. Raise chat reply output budget while keeping compact classifier budgets unchanged.
2. Teach chat markdown rendering to attach indented continuation lines to the current list item.
3. Bound desktop chat stage height to the available viewport and let the transcript scroll internally.
4. Add focused regression coverage for reply token budget and markdown list continuation.
5. Run focused backend/web checks, responsive screenshot audit, cleanup, and update state.

## Acceptance Criteria
- Chat OpenAI replies no longer use the old 120/220 token cap.
- Ordered and unordered chat markdown list items preserve continuation lines.
- Desktop chat stage has a concrete viewport max height; transcript scrolls inside the chat column.
- `npm run test:chat-markdown`, `npm run build`, responsive audit, navigation audit, and focused backend tests pass or any failure is recorded with risk.

## Definition of Done
- [x] Implementation is scoped to existing chat/runtime systems.
- [x] Focused tests prove the changed behavior.
- [x] Responsive screenshot evidence is refreshed and reviewed.
- [x] No new workaround path, duplicate renderer, or architecture mismatch is introduced.
- [x] Context/state files are updated with result and evidence.

## Forbidden
- New chat route framework or parallel markdown renderer.
- Temporary CSS hacks that only hide the issue.
- Removing response-style preferences entirely.
- Architecture or API contract changes without approval.

## Validation Evidence
- Tests:
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_openai_client.py; Pop-Location` -> PASS, `7 passed`
  - `Push-Location .\web; npm run test:chat-markdown; Pop-Location` -> PASS, `case_count=7`
  - `Push-Location .\web; node --check scripts/route-smoke.mjs; Pop-Location` -> PASS
  - `Push-Location .\web; npm run build; Pop-Location` -> PASS
  - `Push-Location .\web; npm run audit:ui-responsive; Pop-Location` -> PASS after route-smoke process-exit hardening; report `status=ok`, `viewport_count=3`, `screenshot_count=18`, `failed_count=0`
  - `Push-Location .\web; npm run audit:ui-navigation; Pop-Location` -> PASS, `status=ok`, `step_count=4`, `failed_count=0`
- Manual checks:
  - Browser plugin connected successfully, but the real preview `/chat` redirected to `/login` without the route-smoke mock auth, so mock-authenticated route-smoke screenshots remained the target Chat visual proof.
  - Reviewed refreshed `desktop-chat.png`, `tablet-chat.png`, and `mobile-chat.png`; the longer numbered answer stays readable, continuation text remains inside the first numbered card, and no document-level horizontal overflow appears in the report.
- Screenshots/logs:
  - `.codex/artifacts/prj1150-v11-ui-responsive-audit/desktop-chat.png`
  - `.codex/artifacts/prj1150-v11-ui-responsive-audit/tablet-chat.png`
  - `.codex/artifacts/prj1150-v11-ui-responsive-audit/mobile-chat.png`
  - `.codex/artifacts/prj1150-v11-ui-responsive-audit/report.json`
  - `.codex/artifacts/prj1209-navigation-proof/report.json`
- High-risk checks:
  - Old OpenAI chat reply cap is now covered by focused tests.
  - Markdown list continuation is now covered by characterization tests and route-smoke visual fixture.
  - Cleanup check found no `5173` listener and no active `route-smoke.mjs` process after cleanup. Some stale `chrome-headless-shell` table entries returned `Brak działającego wystąpienia zadania` from Windows after termination attempts; this is recorded as an environment cleanup residual.
- Coverage ledger updated: not applicable
- Coverage rows closed or changed: none
- Module confidence ledger updated: yes
- Module confidence rows closed or changed: AVIARY-WEB-RESP-001, AVIARY-COGNITIVE-RUNTIME-001
- Requirements matrix updated: not applicable
- Requirement rows closed or changed: none
- Quality scenarios updated: not applicable
- Quality scenario rows closed or changed: none
- Risk register updated: yes
- Risk rows closed or changed: UI clipping, response truncation
- Reality status: verified

## Architecture Evidence
- Architecture source reviewed: `docs/architecture/16_agent_contracts.md`, existing OpenAI client and chat route contracts.
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: not applicable
- Follow-up architecture doc updates: none required

## UX/UI Evidence
- Design source type: approved_snapshot
- Design source reference: user-provided chat screenshot, 2026-05-14
- Canonical visual target: current Chat v5 route direction
- Fidelity target: structurally_faithful
- Stitch used: no
- Experience-quality bar reviewed: yes
- Visual-direction brief reviewed: not required for narrow fix
- Existing shared pattern reused: existing chat transcript/composer/portrait classes
- New shared pattern introduced: no
- Design-memory entry reused: chat route-local polish lane
- Design-memory update required: no
- Visual gap audit completed: yes
- Background or decorative asset strategy: preserve existing assets
- Canonical asset extraction required: no
- Screenshot comparison pass completed: yes
- Remaining mismatches: Chat route still needs broader v5 composition polish beyond this focused fix.
- State checks: success; loading covered by existing StatePanel
- Feedback locality checked: yes
- Raw technical errors hidden from end users: not applicable
- Responsive checks: desktop | tablet | mobile
- Input-mode checks: touch through mobile navigation audit | pointer through route render and screenshot proof | keyboard not directly exercised in this slice
- Accessibility checks: route-smoke unnamed interactive count remained `0`
- Parity evidence: mock-authenticated screenshots listed above

## Deployment / Ops Evidence
- Deploy impact: low
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: no
- Rollback note: revert PRJ-1211 code changes if chat output budget or layout causes regression.
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
- [x] Learning journal was updated if a recurring pitfall was confirmed.

## Notes
- Safe assumption: The reported cut answer was at least partly caused by the current OpenAI reply `max_output_tokens` cap and markdown/list rendering limitations.
- Safe assumption: Desktop height polish should be scoped to the Chat route only.

## Production-Grade Required Contract
- Goal: Fix chat answer completeness and desktop chat layout bounds.
- Scope: Listed above.
- Implementation Plan: Listed above.
- Acceptance Criteria: Listed above.
- Definition of Done: Follow `DEFINITION_OF_DONE.md` proportionally for this narrow UI/runtime slice.
- Result Report: below.

## Integration Evidence
- OpenAI reply generation uses the existing OpenAI client path and existing response-style parameter.
- Chat route uses the existing `renderChatMarkdown` renderer and existing route-smoke mock-authenticated harness.
- No API, database, auth, or route contract changed.

## Result Report
- Changed chat reply generation to use expanded output budgets: default `900` tokens and concise `420` tokens instead of the old `220/120` cap.
- Updated chat markdown rendering so indented continuation lines stay inside the current ordered or unordered list item.
- Added focused tests for reply budget and markdown continuation.
- Bounded desktop Chat stage height with `height`/`max-height: calc(100dvh - 13.6rem)` and `max-height: 100%` on the thread and portrait columns so the transcript scrolls internally while the right panel does not stretch the page.
- Updated route-smoke chat fixture to include a longer numbered answer and hardened route-smoke process exit after server shutdown.
- Verified with backend focused tests, markdown characterization, web build, responsive audit, navigation audit, screenshot review, and cleanup checks.

## Product / Discovery Evidence
- Problem validated: yes
- User or operator affected: chat user
- Existing workaround or pain: user tried manually adding matching max height to the chat container; list answers still felt unfinished.
