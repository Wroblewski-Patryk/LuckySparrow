# Task

## Header
- ID: PRJ-712
- Title: Freeze the shared `/app/chat/history` transcript contract
- Status: DONE
- Owner: Backend Builder
- Depends on: PRJ-711
- Priority: P1

## Context
The shared continuity lane already has an approved execution plan, but the
repo still exposes `/app/chat/history` as a memory-entry surface. Before the
backend and web widen that product-facing shape, one explicit transcript
contract must be frozen in architecture and planning docs.

## Goal
Freeze one app-facing transcript contract for `/app/chat/history` that web now
and mobile later can share without introducing a second chat system.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic

## Definition of Done
- [x] one explicit transcript-oriented `/app/chat/history` contract is frozen in architecture or canonical planning docs.
- [x] the frozen contract keeps backend-owned continuity ownership and avoids a second chat store.
- [x] source-of-truth files reflect `PRJ-712` as complete and move the queue to `PRJ-713`.

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval

## Validation Evidence
- Tests: n/a contract-freeze and context-sync slice
- Manual checks: cross-review of architecture contract, planning lane, and current app-facing `/app/chat/history` shape
- Screenshots/logs: n/a
- High-risk checks: keep transcript ownership tied to backend `user_id` continuity and forbid raw memory-entry exposure as the product contract

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed: `docs/architecture/16_agent_contracts.md`, `docs/architecture/15_runtime_flow.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: n/a
- Follow-up architecture doc updates: transcript implementation should now follow this frozen contract in `PRJ-713`

## Review Checklist (mandatory)
- [x] Architecture alignment confirmed.
- [x] Existing systems were reused where applicable.
- [x] No workaround paths were introduced.
- [x] No logic duplication was introduced.
- [x] Definition of Done evidence is attached.
- [x] Relevant validations were run.
- [x] Docs or context were updated if repository truth changed.
- [x] Learning journal was updated if a recurring pitfall was confirmed.

## Notes
Completed on 2026-04-26. The frozen contract now defines `/app/chat/history`
as a message transcript surface with:

- backend-owned continuity scoped by shared `user_id`
- latest `10` messages as the default app-facing window
- chronological oldest-to-newest item order
- one bounded message item shape:
  - `message_id`
  - `event_id`
  - `role`
  - `text`
  - `channel`
  - `timestamp`
  - optional bounded `metadata`

No new learning-journal entry was needed because the only recurring pitfall in
this lane remains the already-recorded browser-proof fallback guardrail.
