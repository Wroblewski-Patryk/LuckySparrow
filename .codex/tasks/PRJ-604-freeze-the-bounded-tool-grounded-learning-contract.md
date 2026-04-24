# Task

## Header
- ID: PRJ-604
- Title: Freeze the bounded tool-grounded learning contract
- Status: DONE
- Owner: Planner
- Depends on: PRJ-603
- Priority: P1

## Context
Bounded external reads already exist through search, browser, and organizer
tool paths, but the repo still lacked one explicit architecture contract for
how those reads may become durable learned knowledge without creating a second
execution path.

## Goal
Freeze one explicit bounded architecture contract for tool-grounded learning.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic

## Definition of Done
- [x] canonical architecture defines the allowed external-read source families
- [x] canonical architecture defines action-owned capture and memory-owned persistence
- [x] canonical architecture defines bounded summary posture and forbidden raw payload persistence
- [x] planning/context truth is synchronized around the new contract

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval

## Validation Evidence
- Tests:
- Manual checks:
  - architecture/product/runtime cross-review against `docs/architecture/02_architecture.md`
    and `docs/architecture/16_agent_contracts.md`
- Screenshots/logs:
- High-risk checks:

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed: `docs/architecture/02_architecture.md`, `docs/architecture/16_agent_contracts.md`
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
This contract keeps tool-grounded learning inside the existing
planning -> permission-gate -> action -> memory boundary.
