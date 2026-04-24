# Task

## Header
- ID: PRJ-605
- Title: Implement bounded memory capture for approved external-read results
- Status: DONE
- Owner: Backend Builder
- Depends on: PRJ-604
- Priority: P1

## Context
The architecture now allows bounded tool-grounded learning, but approved
external reads still ended at turn-local action notes instead of contributing
to durable learned knowledge.

## Goal
Persist bounded tool-grounded learning summaries for approved external reads.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic

## Definition of Done
- [x] action emits bounded tool-grounded learning candidates for approved read operations
- [x] memory persists those candidates as learned knowledge through existing conclusion writes
- [x] learned-state inspection exposes the richer tool-grounded knowledge summaries
- [x] regression coverage pins the capture and inspection behavior

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval

## Validation Evidence
- Tests:
  - `.\.venv\Scripts\python -m pytest -q tests/test_action_executor.py tests/test_runtime_pipeline.py tests/test_api_routes.py` -> `228 passed`
- Manual checks:
- Screenshots/logs:
- High-risk checks:

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed: `docs/architecture/16_agent_contracts.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed:
- Follow-up architecture doc updates:

## Review Checklist (mandatory)
- [x] Architecture alignment confirmed.
- [x] Existing systems were reused where applicable.
- [x] No workaround paths were introduced.
- [x] No logic duplication was introduced.
- [x] Definition of Done evidence is attached.
- [x] Relevant validations were run.
- [x] Docs or context were updated if repository truth changed.
- [ ] Learning journal was updated if a recurring pitfall was confirmed.

## Notes
This slice keeps capture action-owned and persistence memory-owned; it does not
create a second ingestion path or any executable skill-learning claim.
