# Task

## Header
- ID: PRJ-714
- Title: Web chat thread unification and scroll behavior
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-713
- Priority: P1

## Context
`PRJ-713` moved `/app/chat/history` to a transcript-safe message contract, but
the web chat route still rendered split local `sessionMessages` and a separate
continuity sidebar. That drift kept the product from feeling like one shared
conversation across app and linked channels.

## Goal
Render `/chat` as one backend-owned transcript thread, align the client with
the frozen transcript contract, and add the required scroll behavior for the
initial load and newly appended assistant reply.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic

## Definition of Done
- [x] the web client consumes the transcript item contract returned by `/app/chat/history`.
- [x] the chat route renders one shared transcript thread instead of split local session messages plus a continuity sidebar.
- [x] initial transcript load scrolls to the bottom and a new assistant reply scrolls into view from the top edge.

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval

## Validation Evidence
- Tests: no dedicated `web` test script exists in the current workspace
- Manual checks: transcript thread review against the frozen `/app/chat/history` contract and required scroll posture
- Screenshots/logs: n/a for this slice
- High-risk checks: web now reuses the backend-owned transcript contract directly instead of reconstructing a second chat thread model

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
Completed on 2026-04-26. `web/src/lib/api.ts` now matches the backend
transcript item shape, and `web/src/App.tsx` renders one shared conversation
thread with message-level metadata, initial bottom scroll, and top-aligned
assistant-reply reveal after send.

No new learning-journal entry was needed because this slice did not surface a
new recurring environment or execution pitfall.
