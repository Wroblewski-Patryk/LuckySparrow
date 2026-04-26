# Task

## Header
- ID: PRJ-715
- Title: Cross-channel regression proof for linked Telegram and app chat
- Status: DONE
- Owner: QA/Test
- Depends on: PRJ-714
- Priority: P1

## Context
The transcript contract and the web chat thread are already aligned, but the
lane still needed explicit regression proof that linked Telegram and
first-party app turns land in the same continuity owner while unlinked
Telegram traffic stays isolated from app-auth transcript history.

## Goal
Pin shared transcript continuity across linked Telegram and app chat with
backend regressions, while also proving the optional-channel posture for
unlinked Telegram and app-only use.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic

## Definition of Done
- [x] route-level regressions prove linked Telegram and app turns appear in the same app-facing transcript.
- [x] regressions prove unlinked Telegram traffic does not impersonate authenticated app transcript continuity.
- [x] runtime-level regression proves one continuity owner can project both `api` and `telegram` turns into the same transcript.

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval

## Validation Evidence
- Tests: `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_api_routes.py tests/test_runtime_pipeline.py; Pop-Location`
- Manual checks: code review of linked merge and unlinked isolation coverage against the frozen transcript lane
- Screenshots/logs: n/a backend regression slice
- High-risk checks: regressions reuse existing link-confirmation and episodic-memory ownership instead of inventing a second chat continuity path

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
Completed on 2026-04-26. The new regressions cover:

- linked Telegram plus app turns appearing in the same `/app/chat/history`
  transcript for the authenticated user
- unlinked Telegram turns staying outside that authenticated app transcript
- runtime-level transcript projection across one shared continuity owner for
  both `api` and `telegram` sources

No new learning-journal entry was needed because this slice did not surface a
new recurring environment or execution pitfall.
