# Shared Chat Transcript And Telegram Continuity Plan

## Purpose

This plan freezes the next implementation lane for making linked Telegram and
first-party app chat feel like one continuous conversation.

The goal is not to invent a second chat subsystem.
The goal is to project the existing backend-owned turn memory into one
product-facing message transcript that web now and mobile later can reuse.

## Fresh Gap Snapshot

Observed from the current backend, web client, and linked Telegram flow on
2026-04-25:

- linked Telegram identity continuity is already repaired at the backend
  `user_id` layer
- `GET /app/chat/history` still returns memory entries rather than chat
  messages
- the web chat screen renders local `sessionMessages` separately from backend
  continuity entries, so the user does not see one shared thread
- the continuity panel still behaves like "recent memory" instead of the real
  conversation that was exchanged
- the future mobile client baseline still points at the same `/app/chat/*`
  contract, so this contract must become transcript-safe before mobile work
  resumes

## Core Product Direction

Approved user direction for this lane:

- Telegram remains optional
- once a user links Telegram, new Telegram and app turns should appear as one
  continuous conversation
- no attempt should be made to backfill historic Telegram transport state into
  Telegram itself
- from the moment of linking forward, backend-owned transcript continuity
  should be shared across linked Telegram, web, and later mobile
- the chat route should load the last `10` exchanged messages as a real chat
  transcript
- transcript chronology should remain oldest-to-newest from top to bottom
- after transcript load, the message container should start scrolled to the
  bottom so the newest messages are visible
- after a new assistant reply is appended, the viewport should move so the top
  of that new reply is visible to the user

## Architecture Fit

This lane fits the approved architecture because it reuses:

- linked backend auth identity as the continuity owner
- existing normalized events from Telegram and first-party app chat
- existing action-owned episodic memory persistence
- existing `/app/*` thin-client boundary for web and future mobile

This lane must not:

- add a second durable conversation store
- bypass action or memory ownership
- create Telegram-specific product memory outside the shared backend user
- turn mobile into a special contract consumer

## Implementation Order

### PRJ-712 Shared Chat Transcript Contract Freeze

Result:

- one explicit app-facing transcript contract is frozen for `/app/chat/history`
- the contract returns message-oriented items instead of memory-oriented
  entries
- each item carries the minimum product fields needed by web and later mobile:
  - `message_id`
  - `role`
  - `text`
  - `channel`
  - `event_id`
  - `timestamp`
  - bounded metadata only when needed for product UX
- the contract freezes the initial load window at the latest `10` messages
  while preserving room for later pagination without reopening ownership

Validation:

- architecture and app-facing contract cross-review

Frozen contract on 2026-04-26:

- `/app/chat/history` is now frozen as a message-transcript surface rather
  than a memory-entry surface
- the default app-facing load window is the latest `10` exchanged messages
- item order is chronological from oldest to newest
- each transcript item is bounded to:
  - `message_id`
  - `event_id`
  - `role`
  - `text`
  - `channel`
  - `timestamp`
  - optional bounded `metadata`
- raw memory-entry fields such as `source`, `summary`, and arbitrary stored
  payload blobs are not the durable client contract
- future pagination may widen the envelope, but must not reopen ownership or
  replace the frozen item shape

### PRJ-713 Backend Transcript Projection And Chat History API Update

Result:

- backend projects existing episodic memory payloads into transcript messages
  instead of exposing raw memory cards to the product UI
- the implementation reuses existing `AionMemory.payload.event` and
  `AionMemory.payload.expression` turn data where available
- linked Telegram and first-party app turns resolve under the same backend
  user and therefore land in the same transcript projection
- the endpoint defaults to the latest `10` messages and returns them in
  chronological order suitable for chat rendering

Validation:

- `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_api_routes.py tests/test_memory_repository.py; Pop-Location`

Implemented on 2026-04-26:

- `/app/chat/history` now projects existing episodic turn memory into
  transcript items derived from `payload.event` and `payload.expression`
- the endpoint now defaults to the latest `10` transcript items and returns
  them oldest-to-newest
- channel posture is normalized to `api|telegram` without introducing a second
  durable chat store

### PRJ-714 Web Chat Thread Unification And Scroll Behavior

Result:

- the web chat screen renders one transcript thread instead of a split between
  local `sessionMessages` and a separate continuity panel
- initial transcript load fetches only the latest `10` merged transcript
  messages and scrolls the message container to the bottom
- when a new assistant reply appears, the viewport moves so the top of that
  new reply is visible
- the "recent memory" framing leaves the main chat route
- product wording reflects "conversation" and "messages" rather than memory
  inspection

Validation:

- `Push-Location .\web; npm run build; Pop-Location`

Implemented on 2026-04-26:

- `web/src/lib/api.ts` now matches the backend transcript item shape
  `message_id / event_id / role / text / channel / timestamp / metadata`
- `web/src/App.tsx` now renders one backend-owned transcript thread and removes
  the separate continuity sidebar from `/chat`
- initial transcript load now scrolls to the bottom and new assistant replies
  are revealed from the top edge after send
- current web workspace validation for this slice is `npm run build`; there is
  no dedicated `web` test script to invoke yet

### PRJ-715 Cross-Channel Regression Proof For Linked Telegram And App Chat

Result:

- regressions prove that after linking Telegram:
  - a Telegram turn appears in app chat history
  - an app turn appears in the same shared transcript state
- regressions also pin the optional-channel posture:
  - unlinked Telegram must not impersonate app-auth continuity
  - web chat still works without Telegram

Validation:

- `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_api_routes.py tests/test_runtime_pipeline.py; Pop-Location`

Implemented on 2026-04-26:

- `backend/tests/test_api_routes.py` now proves that:
  - linked Telegram turns and app turns appear together in the authenticated
    `/app/chat/history` transcript
  - unlinked Telegram turns stay outside the authenticated app transcript
- `backend/tests/test_runtime_pipeline.py` now proves one shared continuity
  owner can project both `api` and `telegram` turns into the same transcript
- focused validation passed:
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_api_routes.py tests/test_runtime_pipeline.py; Pop-Location`
    -> `218 passed`

### PRJ-716 Shared Client Baseline And Product Docs Sync

Result:

- mobile baseline docs now point to the transcript-oriented `/app/chat/history`
  contract instead of a memory-list interpretation
- overview and planning docs describe one shared conversation transcript for
  linked channels
- product docs no longer describe the chat route as continuity plus a separate
  memory sidebar

Validation:

- doc-and-context cross-review

Implemented on 2026-04-26:

- `docs/planning/mobile-client-baseline.md` now defines `GET /app/chat/history`
  as a shared message transcript with latest-`10` posture, oldest-to-newest
  ordering, and one continuity owner across app chat and linked Telegram
- `mobile/README.md` now points the reserved native client workspace at that
  same transcript surface instead of an implied memory-list interpretation
- `docs/overview.md` now labels `/app/chat/history` as a shared message
  transcript surface in the active product overview

### PRJ-717 Final Validation, Context Sync, And Learning Closure

Result:

- source-of-truth files reflect the completed transcript lane
- learning journal records the confirmed guardrail if implementation verifies
  the expected pitfall
- final validation evidence is attached for backend and web scope

Validation:

- `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q; Pop-Location`
- `Push-Location .\web; npm run build; Pop-Location`

Implemented on 2026-04-26:

- full-lane validation passed:
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q; Pop-Location`
    -> `942 passed`
  - `Push-Location .\web; npm run build; Pop-Location`
    -> build passed
- source-of-truth files now reflect the lane as complete through `PRJ-717`
- `.codex/context/LEARNING_JOURNAL.md` now records the scheduler quiet-hours
  test guardrail confirmed during final full-suite validation

## Risks And Guardrails

1. shared memory is not the same thing as a shared transcript
   - identity continuity alone is insufficient if the UI still renders memory
     summaries instead of exchanged messages
2. avoid creating a second chat store
   - transcript projection should come from existing episodic turn data first
3. keep chronology product-safe
   - transcript order should stay oldest-to-newest while the initial viewport
     lands on the newest messages
4. reverse infinite scroll must stay backend-truthful
   - loading older history should page backward through the same transcript
     contract rather than reconstructing continuity from local-only state
4. keep Telegram optional
   - app chat must not depend on Telegram setup, but linked Telegram must join
     the same continuity owner once enabled

## Recommended Execution Order

1. `PRJ-712` Shared Chat Transcript Contract Freeze
2. `PRJ-713` Backend Transcript Projection And Chat History API Update
3. `PRJ-714` Web Chat Thread Unification And Scroll Behavior
4. `PRJ-715` Cross-Channel Regression Proof For Linked Telegram And App Chat
5. `PRJ-716` Shared Client Baseline And Product Docs Sync
6. `PRJ-717` Final Validation, Context Sync, And Learning Closure
