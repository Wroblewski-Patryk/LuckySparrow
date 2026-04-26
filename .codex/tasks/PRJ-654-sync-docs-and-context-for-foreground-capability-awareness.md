# Task

## Header
- ID: PRJ-654
- Title: Sync docs and context for foreground capability awareness
- Status: DONE
- Owner: Product Docs Agent
- Depends on: PRJ-653
- Priority: P1

## Context
After the awareness lane lands, repo truth must describe that the personality
not only has bounded time and web capability in code, but also receives one
explicit foreground-awareness contract for those capabilities.

## Goal
Synchronize planning truth, runtime reality, testing guidance, and context so
the repo tells one consistent story about foreground capability/time
awareness.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic

## Definition of Done
- [x] Canonical docs describe the bounded awareness contract for time, active planned work, and approved tools.
- [x] Runtime reality and testing guidance describe the same proof path as the implemented runtime.
- [x] Planning/context truth now sequences later delivery polish after the awareness lane instead of skipping over it.

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval

## Validation Evidence
- Tests: doc-and-context sync
- Manual checks: compare canonical docs, runtime reality, tests, and task board wording for the same contract language
- Screenshots/logs:
- High-risk checks: avoid leaving old wording that says capability is merely planned or only implicit

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed: `docs/architecture/15_runtime_flow.md`, `docs/architecture/16_agent_contracts.md`, `docs/architecture/29_runtime_behavior_testing.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed:
- Follow-up architecture doc updates: completed in docs, planning truth, and context

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
This slice is the source-of-truth sync after the runtime and test changes land.

Completed on 2026-04-25 via the later foreground-awareness execution lane
`PRJ-701..PRJ-702`.

Result:

- canonical docs, runtime reality, testing guidance, planning truth, and
  context now describe the same bounded foreground-awareness contract
- the old `PRJ-651..654` lane is now fully covered by the later
  `PRJ-696..PRJ-702` implementation and sync slices
- later delivery polish remains sequenced after awareness completion

Validation:

- doc-and-context sync plus focused lane validation recorded in
  `PROJECT_STATE`, `TASK_BOARD`, and
  `docs/planning/foreground-memory-time-and-tool-awareness-repair-plan.md`
