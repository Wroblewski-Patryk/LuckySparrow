# Task

## Header
- ID: PRJ-713
- Title: Backend transcript projection and chat history API update
- Status: DONE
- Owner: Backend Builder
- Depends on: PRJ-712
- Priority: P1

## Context
`PRJ-712` froze `/app/chat/history` as a shared transcript surface. The backend
still returned memory-oriented entries, so the contract had to be implemented
through existing episodic memory and app-facing API ownership.

## Goal
Project existing episodic turn memory into the frozen transcript contract and
update `/app/chat/history` so web and later mobile can consume one shared
message-oriented history surface.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic

## Definition of Done
- [x] backend projects existing episodic memory into transcript items instead of raw memory entries.
- [x] `/app/chat/history` now returns the frozen transcript shape with the latest `10` messages in chronological order by default.
- [x] focused backend regressions prove transcript ordering and item shape.

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval

## Validation Evidence
- Tests: `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_api_routes.py tests/test_memory_repository.py; Pop-Location`
- Manual checks: code review of transcript projection against `PRJ-712` frozen fields and continuity ownership
- Screenshots/logs: n/a backend slice
- High-risk checks: projection reuses existing `AionMemory.payload.event/expression` turn data and does not create a second chat store

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed: `docs/architecture/16_agent_contracts.md`, `docs/planning/shared-chat-transcript-and-telegram-continuity-plan.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: n/a
- Follow-up architecture doc updates: none beyond lane and context sync

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
Completed on 2026-04-26. The backend now projects one user message plus one
assistant message per episodic turn when `payload.event` and
`payload.expression` are present, normalizes `channel` to `api|telegram`,
keeps chronological oldest-to-newest order, and returns the last `10`
transcript items by default.

No new learning-journal entry was needed because this slice did not surface a
new recurring environment or execution pitfall.
