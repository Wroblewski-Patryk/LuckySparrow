# Task

## Header
- ID: PRJ-695
- Title: Plan the foreground memory, time, and bounded-tool awareness repair lane
- Status: DONE
- Owner: Planning Agent
- Depends on: PRJ-694
- Priority: P1

## Context
Fresh user-reported behavior on 2026-04-25 shows that the current runtime can
still answer as if it has no memory continuity, no current-time awareness, and
no practical web or browser capability even though the repo already contains
memory, linked Telegram identity, bounded search, and page-read paths.

The repo already repaired linked Telegram identity continuity through
`PRJ-681..PRJ-684`, and bounded foreground awareness was previously planned in
`PRJ-651..PRJ-654`, but the current product behavior still suggests that the
active expression path does not receive enough explicit runtime truth about:

- who the linked user is in human terms
- what the current turn time is
- which bounded external-read capabilities are available
- when those capabilities should be used implicitly rather than only after
  narrow keyword triggers

This task therefore freezes an execution-ready repair plan before code changes
begin, so later implementation can stay architecture-aligned and avoid opening
another parallel memory, identity, or tooling subsystem.

## Goal
Create one detailed, execution-ready plan for repairing foreground memory,
time, and bounded-tool awareness so later implementation can make Telegram and
app-facing behavior truthful without changing the approved architecture.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic

## Definition of Done
- [x] a detailed execution plan exists in repo for the full repair lane
- [x] the next implementation slices are seeded in source-of-truth planning
  and context files
- [x] recurring planning lessons from this analysis are recorded in the
  learning journal

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval

## Validation Evidence
- Tests:
  - none; planning and context sync only
- Manual checks:
  - cross-review of current runtime, task board, project state, and planning
    docs against the fresh behavior analysis from 2026-04-25
- Screenshots/logs:
  - none
- High-risk checks:
  - plan must reuse existing runtime, identity, context, planning, action, and
    expression layers instead of proposing a second capability or memory stack
  - plan must stay within the approved event-to-expression pipeline and action
    boundary

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed:
  - `docs/architecture/02_architecture.md`
  - `docs/architecture/15_runtime_flow.md`
  - `docs/architecture/16_agent_contracts.md`
  - `docs/architecture/29_runtime_behavior_testing.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed:
  - none
- Follow-up architecture doc updates:
  - later slices should update canonical docs only after implementation truth is
    repaired and verified

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
`docs/planning/foreground-memory-time-and-tool-awareness-repair-plan.md`.

The seeded implementation lane is:

- `PRJ-696` Foreground Awareness Contract Freeze
- `PRJ-697` Runtime Turn-Awareness Payload And Prompt Propagation
- `PRJ-698` Identity Facts Flow And Truthful Capability Claims
- `PRJ-699` Implicit Tool Invocation Heuristics For External Facts
- `PRJ-700` Behavior Regression Proof For Memory, Time, And Tool Awareness
- `PRJ-701` Canonical Docs And Testing Guidance Sync
- `PRJ-702` Final Validation, Context Sync, And Learning Closure
