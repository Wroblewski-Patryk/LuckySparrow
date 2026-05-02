# Task

## Header
- ID: PRJ-909
- Title: Production Telegram Mode Smoke
- Task Type: release
- Current Stage: verification
- Status: BLOCKED
- Owner: Ops/Release
- Depends on: PRJ-907, PRJ-923, PRJ-912
- Priority: P1
- Coverage Ledger Rows: not applicable
- Iteration: 909
- Operation Mode: ARCHITECT

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.

## Context
Core no-UI v1 is accepted and production health reports Telegram as
provider-backed ready. The remaining launch-channel check is a live Telegram
mode smoke that proves the production bot, webhook, and a known user chat can
round-trip in the real provider path.

## Goal
Run the production Telegram webhook/listen smoke only when the required
operator preconditions are available, and otherwise record the exact blocked
state without changing production webhook configuration.

## Scope
- `backend/scripts/run_telegram_mode_smoke.ps1`
- `backend/scripts/run_telegram_mode_smoke.sh`
- `docs/operations/runtime-ops-runbook.md`
- `docs/planning/v1-production-telegram-mode-smoke.md`
- `docs/planning/v1-release-audit-and-execution-plan.md`
- `docs/planning/v1-core-acceptance-bundle.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`
- `.codex/tasks/PRJ-909-production-telegram-mode-smoke.md`

## Success Signal
- User or operator problem: release owner needs to know whether Telegram can be
  claimed as a live launch channel.
- Expected product or reliability outcome: either a live Telegram provider
  smoke passes, or the missing operator-owned preconditions are explicit.
- How success will be observed: the smoke helper returns webhook, listen, and
  restore evidence for the known chat id.
- Post-launch learning needed: yes

## Deliverable For This Stage
Blocked launch-channel evidence record with safe rerun command and current
production health posture.

## Constraints
- do not print or commit Telegram bot token or webhook secret values
- do not delete or change the production webhook without a restorable URL and
  secret token
- do not claim live user round-trip without a known chat id and an observed
  update from that chat
- keep generated health snapshots out of git

## Implementation Plan
1. Review the existing Telegram smoke helper and runbook.
2. Check whether local operator preconditions are present without printing
   secret values.
3. Capture production `/health` Telegram posture.
4. If preconditions are missing, do not run the destructive listen probe.
5. Record the blocked status and exact rerun command.

## Acceptance Criteria
- Current Telegram production health posture is recorded.
- Missing preconditions are listed without exposing secrets.
- The task does not alter production webhook state.
- The next operator command is reproducible.

## Definition of Done
- [x] Existing smoke helper reviewed.
- [x] Local precondition presence checked without secret disclosure.
- [x] Production health posture checked.
- [x] Live listen probe was not run because required preconditions are missing.
- [x] Blocked status documented in task, planning, board, and project state.
- [x] `git diff --check` passed.

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
  - `git diff --check`
  - result: passed
- Manual checks:
  - local precondition presence check:
    - `TELEGRAM_BOT_TOKEN=false`
    - `TELEGRAM_WEBHOOK_SECRET=false`
    - `REQUIRED_CHAT_ID=false`
  - production `/health` checked on 2026-05-03:
    - `status=ok`
    - `release_readiness.ready=true`
    - `conversation_channels.telegram.bot_token_configured=true`
    - `conversation_channels.telegram.webhook_secret_configured=true`
    - `conversation_channels.telegram.round_trip_state=provider_backed_ready`
    - `conversation_channels.telegram.delivery_failures=0`
- Screenshots/logs: not applicable
- High-risk checks: no Telegram API mutation was run; webhook state was not
  changed from this session
- Coverage ledger updated: not applicable
- Coverage rows closed or changed: none

## Architecture Evidence
- Architecture source reviewed:
  - `docs/architecture/17_logging_and_debugging.md`
  - `docs/operations/runtime-ops-runbook.md`
  - `docs/planning/v1-release-audit-and-execution-plan.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: not applicable
- Follow-up architecture doc updates: none

## Deployment / Ops Evidence
- Deploy impact: none
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: no; existing runbook command remains current
- Rollback note: no runtime or webhook change was performed
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

## Result Report

- Task summary: PRJ-909 is blocked by missing local operator preconditions for
  a destructive Telegram listen probe.
- Files changed:
  - `docs/planning/v1-production-telegram-mode-smoke.md`
  - `docs/planning/v1-release-audit-and-execution-plan.md`
  - `docs/planning/v1-core-acceptance-bundle.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
  - `.codex/tasks/PRJ-909-production-telegram-mode-smoke.md`
- How tested: production health review and `git diff --check`.
- What is incomplete: no live Telegram `getUpdates` probe or known-chat
  round-trip was run.
- Next steps: rerun with `TELEGRAM_BOT_TOKEN`, `TELEGRAM_WEBHOOK_SECRET`, and
  known `REQUIRED_CHAT_ID`, or explicitly waive Telegram as a launch channel.
- Decisions made: do not run `deleteWebhook -> getUpdates` without guaranteed
  restore preconditions.

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: Telegram production health is green, but live user/chat proof is not
  captured.
- Gaps: this session has no local bot token, webhook secret, or known chat id.
- Inconsistencies: none; runbook correctly requires these preconditions.
- Architecture constraints: Telegram is a transport boundary; do not mutate
  provider state casually.

### 2. Select One Priority Task
- Selected task: PRJ-909 Production Telegram Mode Smoke.
- Priority rationale: it is the next launch-channel gate after core acceptance,
  rollback, and privacy/debug posture.
- Why other candidates were deferred: web/product and AI/security hardening
  should not hide a launch-channel precondition gap.

### 3. Plan Implementation
- Files or surfaces to modify: task, planning, board, project state, acceptance
  notes.
- Logic: document blocked state and rerun command; no runtime logic change.
- Edge cases: avoid printing secrets; avoid webhook mutation without restore
  material.

### 4. Execute Implementation
- Reviewed existing smoke helper and runbook.
- Checked local env precondition presence.
- Checked production health Telegram posture.
- Recorded blocked status.

### 5. Verify and Test
- Validation performed: production health review and `git diff --check`.
- Result: health is green; live listen probe remains blocked.

### 6. Self-Review
- Simpler option considered: run the helper without required chat id, rejected
  because it would not prove the launch-channel requirement and would still
  mutate webhook mode temporarily.
- Technical debt introduced: no
- Scalability assessment: the existing helper is suitable once preconditions
  are available.
- Refinements made: blocked posture now separates health readiness from live
  chat evidence.

### 7. Update Documentation and Knowledge
- Docs updated: yes
- Context updated: yes
- Learning journal updated: not applicable.
