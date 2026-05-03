# Task

## Header
- ID: PRJ-959
- Title: Add cross-user/session regression tests
- Task Type: feature
- Current Stage: verification
- Status: DONE
- Owner: QA/Test
- Depends on: PRJ-932
- Priority: P1
- Coverage Ledger Rows: not applicable
- Iteration: 959
- Operation Mode: BUILDER

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context

`PRJ-932` audited app auth, session, chat history, reset, and Telegram linked
identity boundaries. No defect was confirmed, but the audit left explicit
evidence-depth gaps for two-user app-route regressions.

## Goal

Turn the remaining cross-user/session isolation audit gaps into executable
regression tests.

## Scope

- `backend/tests/test_api_routes.py`
- `docs/security/v1-cross-user-session-isolation-audit.md`
- `docs/planning/v1-reality-audit-and-roadmap.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Implementation Plan

1. Reuse existing app-route test fixtures.
2. Add two-user chat-history isolation coverage.
3. Add single-user reset coverage proving the other user's runtime memory and
   session remain intact.
4. Add active session-cookie switching coverage across `/app/me` and
   `/app/chat/history`.
5. Reuse the existing memory repository Telegram relink/conflict regression as
   the linked-identity evidence path.
6. Update docs and context.

## Acceptance Criteria

- [x] User A chat history cannot include User B transcript entries.
- [x] Resetting User A revokes only User A session and leaves User B runtime
  data/session usable.
- [x] App routes follow the active session cookie when a client switches
  between two valid cookies.
- [x] Telegram relink/conflict behavior remains covered by repository tests.

## Definition of Done
- [x] `DEFINITION_OF_DONE.md` satisfied for this test-depth slice.
- [x] Focused regressions pass.
- [x] Security audit docs and planning/context sources are updated.

## Validation Evidence
- Tests:
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_api_routes.py -k "two_authenticated_users or preserves_other_user_runtime_data or active_session_cookie or telegram_link_ownership"; Pop-Location`
  - result: `3 passed, 119 deselected`
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_memory_repository.py -k "reassigns_telegram_link_ownership_to_latest_user"; Pop-Location`
  - result: `1 passed, 64 deselected`
- Manual checks: not applicable
- Screenshots/logs: not applicable
- High-risk checks: cross-user memory/session boundaries
- Coverage ledger updated: not applicable
- Coverage rows closed or changed: none

## Architecture Evidence
- Architecture source reviewed:
  - `docs/security/v1-cross-user-session-isolation-audit.md`
  - `docs/architecture/16_agent_contracts.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: not applicable
- Follow-up architecture doc updates: none

## Deployment / Ops Evidence
- Deploy impact: none
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: no
- Rollback note: remove the added tests/docs if superseded by broader coverage
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

## Security / Privacy Evidence
- `docs/security/secure-development-lifecycle.md` reviewed: yes
- Data classification: synthetic test users and synthetic memory payloads
- Trust boundaries: authenticated app session cookie, app routes, Telegram
  linked identity repository ownership
- Permission or ownership checks: app auth session resolves the active
  authenticated user for reads and reset writes
- Abuse cases: cross-user transcript leakage, cross-user reset deletion,
  stale-cookie state bleed, Telegram ownership conflict
- Secret handling: no secrets used
- Security tests or scans: focused regression tests
- Fail-closed behavior: unauthenticated routes already fail with `401`; this
  slice pins authenticated user selection across two valid sessions
- Residual risk: none for the audited regression depth; broader live provider
  tests remain separate tasks

## Result Report

- Task summary: added app-route cross-user/session regressions and linked them
  to existing Telegram relink coverage.
- Files changed:
  - `backend/tests/test_api_routes.py`
  - `docs/security/v1-cross-user-session-isolation-audit.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested: focused app-route and memory repository regression commands.
- What is incomplete: provider payload and strict-mode incident sentinel
  regressions remain separate planned tasks.
- Next steps: `PRJ-960` provider payload sentinel regressions.
- Decisions made: Telegram relink/conflict evidence reuses the existing
  repository-level regression because ownership transfer belongs in the memory
  repository contract.

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: audit had explicit evidence-depth gaps.
- Gaps: two-user route behavior was not pinned directly for chat/reset/cookie
  switching.
- Inconsistencies: no confirmed runtime defect.
- Architecture constraints: app auth must own private app-route user selection.

### 2. Select One Priority Task
- Selected task: `PRJ-959`
- Priority rationale: it is the next READY P1 security hardening task.
- Why other candidates were deferred: provider payload and strict-mode
  sentinels are separate surfaces.

### 3. Plan Implementation
- Files or surfaces to modify: app route tests and security/planning context.
- Logic: register two synthetic users, preserve session cookies, seed per-user
  memory, assert app routes follow active auth identity.
- Edge cases: stale client cookie switching and single-user reset.

### 4. Execute Implementation
- Implementation notes: added a small `_session_cookie()` helper and three
  focused route regressions.

### 5. Verify and Test
- Validation performed: targeted app-route and memory repository tests.
- Result: passed.

### 6. Self-Review
- Simpler option considered: documentation-only closure.
- Technical debt introduced: no
- Scalability assessment: coverage remains fixture-local and follows existing
  test style.
- Refinements made: Telegram relink was documented as existing repository-level
  evidence instead of duplicated at the app-route layer.

### 7. Update Documentation and Knowledge
- Docs updated:
  - `docs/security/v1-cross-user-session-isolation-audit.md`
  - `docs/planning/v1-reality-audit-and-roadmap.md`
- Context updated:
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- Learning journal updated: not applicable
