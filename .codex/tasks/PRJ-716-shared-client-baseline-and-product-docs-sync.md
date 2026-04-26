# Task

## Header
- ID: PRJ-716
- Title: Shared client baseline and product docs sync
- Status: DONE
- Owner: Product Docs Agent
- Depends on: PRJ-715
- Priority: P1

## Context
The transcript lane is now implemented and regression-proven, but the shared
client baseline still had small doc drift where `mobile` and overview-level
docs could still be read as generic chat-history or memory-list surfaces.

## Goal
Sync the shared client baseline and product docs so current first-party client
guidance consistently describes `/app/chat/history` as one backend-owned
message transcript shared across app chat and linked Telegram.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic

## Definition of Done
- [x] the mobile client baseline explicitly describes `/app/chat/history` as a transcript-oriented message surface.
- [x] the `mobile/` workspace README points to the shared transcript posture instead of an implied memory-list interpretation.
- [x] active product overview docs use the same transcript-safe wording for the app-facing chat surface.

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval

## Validation Evidence
- Tests: n/a doc-and-context slice
- Manual checks: cross-review of `docs/planning/mobile-client-baseline.md`, `mobile/README.md`, `docs/overview.md`, and transcript-lane planning docs
- Screenshots/logs: n/a
- High-risk checks: doc sync preserves the backend-owned shared transcript contract and does not imply a second chat or memory-inspector model for mobile

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed: `docs/architecture/16_agent_contracts.md`, `docs/planning/shared-chat-transcript-and-telegram-continuity-plan.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: n/a
- Follow-up architecture doc updates: none required beyond source-of-truth sync

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
Completed on 2026-04-26. The current shared client baseline now says plainly
that `/app/chat/history` is a message transcript with the latest `10`
messages, oldest-to-newest ordering, and one continuity owner shared across
first-party app chat and linked Telegram.

No new learning-journal entry was needed because this slice did not surface a
new recurring environment or execution pitfall.
