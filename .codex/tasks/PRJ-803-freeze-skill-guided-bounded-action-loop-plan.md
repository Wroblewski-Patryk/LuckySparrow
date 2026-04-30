# Task

## Header
- ID: PRJ-803
- Title: Freeze Skill-Guided Bounded Action Loop Plan
- Task Type: research
- Current Stage: release
- Status: DONE
- Owner: Planning Agent
- Depends on: none
- Priority: P1

## Context

The current runtime already has action-owned provider paths for web search,
single-page HTTP reading, and bounded ClickUp operations. The user approved a
more human-like digital execution model where planning creates a detailed goal
and model plan, while action can execute a bounded loop using selected skills,
approved tool bindings, and observations between tool steps.

This task records that architecture and implementation direction without
changing runtime behavior.

## Goal

Freeze the approved concept that:

- skills are reusable strategies, not executable side-effect owners
- tools are bounded capabilities executed only by action
- skills may declare allowed tool bindings
- action may run a bounded execute-observe-adjust loop inside the approved
  plan and permission gates
- search, browser, and ClickUp become the first skill-tool binding targets

## Scope

- `docs/architecture/16_agent_contracts.md`
- `docs/planning/skill-guided-bounded-action-loop-plan.md`
- `docs/planning/next-iteration-plan.md`
- `docs/planning/open-decisions.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`
- this task file

No runtime, API, database, or UI implementation is included in this slice.

## Implementation Plan

1. Review the existing runtime-flow, agent-contract, connector-policy, and
   tools-overview posture.
2. Add the skill-guided bounded action loop contract to canonical architecture.
3. Add a staged implementation plan covering skill-tool bindings, tools UI
   visibility, bounded observations, website review, ClickUp, and final
   evidence sync.
4. Sync planning and context truth.
5. Validate documentation diff quality.

## Success Signal
- User or operator problem: AION's current tools exist, but the future path for
  skill-guided multi-step execution was not explicit enough.
- Expected product or reliability outcome: future implementation can make
  browser/search/ClickUp usage visible and skill-bound without bypassing the
  action boundary.
- How success will be observed: architecture, planning, and context files
  describe the same staged rollout.
- Post-launch learning needed: no

## Deliverable For This Stage

Release-stage documentation and planning sync only.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- stay within the declared current stage unless explicit approval changes it

## Acceptance Criteria

- canonical architecture defines the action-owned bounded execution loop
- the plan defines staged implementation tasks
- skill-tool binding direction is explicit for web search, browser, and ClickUp
- no runtime behavior changes are made in this task
- context and task board are synchronized

## Definition of Done
- [x] Architecture contract updated.
- [x] Implementation plan written.
- [x] Task/context truth synchronized.
- [x] Documentation validation run.
- [x] No runtime implementation mixed into this planning slice.

## Stage Exit Criteria
- [x] The output matches the declared `Current Stage`.
- [x] Work from later stages was not mixed in without explicit approval.
- [x] Risks and assumptions for this stage are stated clearly.

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval
- implicit stage skipping

## Validation Evidence
- Tests: `git diff --check -- docs/architecture/16_agent_contracts.md docs/planning/skill-guided-bounded-action-loop-plan.md docs/planning/next-iteration-plan.md docs/planning/open-decisions.md .codex/context/TASK_BOARD.md .codex/context/PROJECT_STATE.md .codex/tasks/PRJ-803-freeze-skill-guided-bounded-action-loop-plan.md`
- Manual checks: architecture and planning cross-review against the current
  connector/action boundary
- Screenshots/logs: not applicable
- High-risk checks: confirmed no runtime files are changed

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed: `docs/architecture/02_architecture.md`,
  `docs/architecture/15_runtime_flow.md`,
  `docs/architecture/16_agent_contracts.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: user approved the concept in this
  conversation before documentation update
- Follow-up architecture doc updates: none for this slice

## UX/UI Evidence (required for UX tasks)
- Design source type: not applicable
- Design source reference: not applicable
- Canonical visual target: not applicable
- Fidelity target: not applicable
- Stitch used: no
- Experience-quality bar reviewed: no
- Visual-direction brief reviewed: no
- Existing shared pattern reused: backend-owned `/app/tools/overview` truth
- New shared pattern introduced: no UI pattern in this slice
- Design-memory entry reused: not applicable
- Design-memory update required: no
- Visual gap audit completed: no
- Background or decorative asset strategy: not applicable
- Canonical asset extraction required: no
- Screenshot comparison pass completed: no
- Remaining mismatches: not applicable
- State checks: not applicable
- Feedback locality checked: not applicable
- Raw technical errors hidden from end users: not applicable
- Responsive checks: not applicable
- Input-mode checks: not applicable
- Accessibility checks: not applicable
- Parity evidence: not applicable

## Deployment / Ops Evidence (required for runtime or infra tasks)
- Deploy impact: none
- Env or secret changes: none
- Health-check impact: future planned work only
- Smoke steps updated: not applicable
- Rollback note: revert documentation/planning commit
- Observability or alerting impact: future planned work only
- Staged rollout or feature flag: not applicable

## Review Checklist (mandatory)
- [x] Current stage is declared and respected.
- [x] Deliverable for the current stage is complete.
- [x] Architecture alignment confirmed.
- [x] Existing systems were reused where applicable.
- [x] No workaround paths were introduced.
- [x] No logic duplication was introduced.
- [x] Definition of Done evidence is attached.
- [x] Relevant validations were run.
- [x] Docs or context were updated if repository truth changed.
- [x] Learning journal was updated if a recurring pitfall was confirmed.

## Notes

No recurring execution pitfall was confirmed, so the learning journal was not
updated.

## Production-Grade Required Contract

This task includes Goal, Scope, Implementation Plan, Acceptance Criteria,
Definition of Done, and Result Report. It is a planning/docs slice only, so it
does not require a vertical runtime implementation.

## Integration Evidence

## Product / Discovery Evidence
- Problem validated: yes
- User or operator affected: user and future implementation agents
- Existing workaround or pain: tool use was visible as connector capability but
  not yet framed as skill-guided multi-step execution
- Smallest useful slice: architecture and implementation plan
- Success metric or signal: future tasks can implement the plan without
  reopening the conceptual boundary
- Feature flag, staged rollout, or disable path: not applicable
- Post-launch feedback or metric check: not applicable

## Reliability / Observability Evidence
- `docs/operations/service-reliability-and-observability.md` reviewed: not applicable
- Critical user journey: future website review and task-management execution
- SLI: not applicable
- SLO: not applicable
- Error budget posture: not applicable
- Health/readiness check: future task
- Logs, dashboard, or alert route: future task
- Smoke command or manual smoke: not applicable
- Rollback or disable path: revert documentation commit

- `INTEGRATION_CHECKLIST.md` reviewed: not applicable
- Real API/service path used: not applicable
- Endpoint and client contract match: not applicable
- DB schema and migrations verified: not applicable
- Loading state verified: not applicable
- Error state verified: not applicable
- Refresh/restart behavior verified: not applicable
- Regression check performed: documentation diff check

## AI Testing Evidence (required for AI features)

## Security / Privacy Evidence
- `docs/security/secure-development-lifecycle.md` reviewed: not applicable
- Data classification: documentation only
- Trust boundaries: action remains the sole side-effect owner; skills remain
  metadata-only
- Permission or ownership checks: future implementation must reuse connector
  gates
- Abuse cases: future implementation must prevent tool widening, raw payload
  leakage, and confirmation bypass
- Secret handling: no secret changes
- Security tests or scans: not applicable
- Fail-closed behavior: future implementation requirement
- Residual risk: implementation still needs tests and behavior evidence

- `AI_TESTING_PROTOCOL.md` reviewed: not applicable
- Memory consistency scenarios: future implementation
- Multi-step context scenarios: future implementation
- Adversarial or role-break scenarios: future implementation
- Prompt injection checks: future implementation
- Data leakage and unauthorized access checks: future implementation
- Result: planning only

## Result Report

- Task summary: froze the skill-guided bounded action loop direction and staged
  implementation plan.
- Files changed: architecture, planning, task, and context docs.
- How tested: documentation diff check.
- What is incomplete: runtime implementation, tools UI binding display, action
  loop observations, and behavior tests are planned follow-ups.
- Next steps: implement `PRJ-804` skill-tool bindings in tools overview.
- Decisions made: first target tools are web search, web browser, and ClickUp;
  Gmail remains deferred until after the loop exists.
