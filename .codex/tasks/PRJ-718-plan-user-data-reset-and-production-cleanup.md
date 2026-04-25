# Task

## Header
- ID: PRJ-718
- Title: Plan the user data reset and production cleanup lane
- Status: DONE
- Owner: Planning Agent
- Depends on: PRJ-711
- Priority: P1

## Context
Fresh user direction on 2026-04-25 asks for a detailed analysis of whether the
repo should:

- clear production data after the shift from Telegram-first usage to a
  web-first product shell
- add a product-facing button in account settings so a user can clear their own
  database-backed state

Current repo facts:

- first-party auth/session is backend-owned
- profile and settings mutations already flow through `/app/me` and
  `PATCH /app/me/settings`
- per-user continuity is spread across memory, adaptive state, internal
  planning, linked Telegram identity, and session records
- there is no shared cleanup owner yet, and there is no existing operator
  cleanup script for production data

This task freezes one execution-ready plan so later implementation can stay
inside the approved architecture instead of creating a public admin wipe path,
duplicated delete logic, or an ambiguous "clear data" button that actually
means account deletion.

## Goal
Create one detailed repo plan for:

- operator-owned production cleanup
- authenticated self-service per-user runtime reset

while keeping the account-deletion boundary separate from data reset.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic

## Definition of Done
- [x] a detailed execution plan exists in repo for the reset and cleanup lane
- [x] the next implementation slices are seeded in planning and context files
- [x] the plan records the destructive-boundary guardrails clearly enough for
  later implementation

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval

## Validation Evidence
- Tests:
  - none; planning and context sync only
- Manual checks:
  - cross-review of app auth/session boundaries, settings route ownership,
    memory repository ownership, and per-user durable tables against the fresh
    user request from 2026-04-25
- Screenshots/logs:
  - none
- High-risk checks:
  - the plan must keep production-wide cleanup out of product UI
  - the plan must keep auth account deletion separate from per-user runtime
    reset
  - the plan must centralize destructive deletion behind one shared backend
    owner

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed:
  - `docs/architecture/02_architecture.md`
  - `docs/architecture/15_runtime_flow.md`
  - `docs/architecture/16_agent_contracts.md`
  - `docs/architecture/26_env_and_config.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed:
  - none
- Follow-up architecture doc updates:
  - later implementation slices should update canonical docs only if the
    account-settings or destructive-boundary contracts change after
    verification

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
The detailed execution plan lives in
`docs/planning/user-data-reset-and-production-cleanup-plan.md`.

The seeded implementation lane is:

- `PRJ-719` Reset Boundary Contract And Retention Policy Freeze
- `PRJ-720` Shared Backend Cleanup Owner And Operator Script
- `PRJ-721` Account Settings Reset UX And Confirmation Flow
- `PRJ-722` Regression Proof, Ops Runbook, And Context Sync
