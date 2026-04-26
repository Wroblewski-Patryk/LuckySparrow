# Task

## Header
- ID: PRJ-652
- Title: Implement explicit foreground awareness for time and approved tools
- Status: DONE
- Owner: Backend Builder
- Depends on: PRJ-651
- Priority: P0

## Context
The runtime already carries `event.timestamp`, planned-work state, tool
readiness, and bounded web capability truth, but the active turn and reply
prompt still do not consistently receive an explicit awareness summary for
those capabilities.

## Goal
Implement one bounded foreground-awareness path that makes current time,
approved tool posture, and active planned-work posture explicitly visible to
the turn without widening side-effect authority.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic

## Definition of Done
- [x] Runtime state and/or context surfaces expose bounded current-time and planned-work awareness to the active turn.
- [x] Reply-prompt or equivalent foreground prompt surfaces expose approved bounded-tool posture without claiming extra execution authority.
- [x] Existing planning and action boundaries remain unchanged, and capability awareness reuses current runtime truth rather than duplicating it.

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval

## Validation Evidence
- Tests: targeted runtime, planning, prompt-path, and regression coverage
- Manual checks: inspect context/debug/prompt inputs on turns that mention time or imply external lookup without explicit trigger phrases
- Screenshots/logs:
- High-risk checks: avoid a second capability registry or prompt-only fiction that disagrees with runtime source surfaces

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed: `docs/architecture/15_runtime_flow.md`, `docs/architecture/16_agent_contracts.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed:
- Follow-up architecture doc updates: runtime reality and testing guidance

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
The point is not to make the model autonomous. The point is to make existing
bounded capabilities explicit and reliable in normal foreground reasoning.

Completed on 2026-04-25 via the later foreground-awareness execution lane
`PRJ-696..PRJ-702`.

Result:

- the runtime now carries one explicit bounded foreground-awareness payload
  with current-turn timestamp, known user name, memory continuity posture, and
  bounded `search_web` / `read_page` readiness
- context and expression now consume that foreground-awareness summary instead
  of relying only on implicit timestamp/tool hints
- execution authority remains unchanged and still flows through the existing
  planning -> expression -> action boundary

Validation:

- focused lane validation passed with `293 passed` across:
  - `tests/test_identity_service.py`
  - `tests/test_openai_prompting.py`
  - `tests/test_context_agent.py`
  - `tests/test_expression_agent.py`
  - `tests/test_planning_agent.py`
  - `tests/test_action_executor.py`
  - `tests/test_runtime_pipeline.py`
