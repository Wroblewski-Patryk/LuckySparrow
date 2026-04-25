# Foreground Memory, Time, And Tool Awareness Repair Plan

## Purpose

This document turns the 2026-04-25 runtime-behavior analysis into one explicit
execution lane that can be implemented in small, testable slices without
changing the approved AION architecture.

The repair goal is not to create a new memory or tooling system. The goal is
to make the already approved and already implemented runtime truth visible to
the active foreground turn in a way that produces truthful user-facing answers.

## Confirmed User-Facing Failures

The current runtime can still produce the following false or incomplete
behaviors:

- after Telegram linking and prior interaction history, the assistant may still
  answer as if it does not know the user's name or cannot remember across
  turns
- the assistant can fail direct time questions even though the active event
  already has a turn timestamp
- the assistant may not use bounded search for current facts such as weather
- the assistant may not use bounded page reading for direct website-content
  questions such as `luckysparrow.ch`
- the assistant may claim capability limitations that contradict the repo's
  real runtime and tool surface

## Current Repo Reality

The current repo already contains the core systems needed for the repair:

- linked Telegram identity resolution was repaired through `PRJ-681..PRJ-684`
- foreground turns already carry `event.timestamp`
- bounded DuckDuckGo search and bounded page-read execution already exist in
  the action layer
- the runtime already builds context from profile, goals, memory, and
  reflection outputs
- the repo already has architecture for bounded foreground awareness and
  runtime behavior testing

The remaining gap is therefore not "missing features" in the broad sense. It
is a contract and propagation gap between runtime truth and user-facing
expression.

## Root Cause Summary

### 1. Identity facts are not surfaced strongly enough to the foreground turn

- linked Telegram runtime identity now resolves to the backend auth `user_id`
- however, human-facing identity facts such as `display_name` are not yet a
  first-class foreground input to runtime context and expression
- result: the runtime may know which user bucket owns memory, but the answer
  path still lacks a reliable name recall candidate

### 2. Current time exists operationally, but not as a foreground answer input

- `event.timestamp` exists and planning already uses time in some places
- the context and prompt contract do not appear to expose one explicit "current
  turn time" fact to the active answer path
- result: direct time questions can miss even though the event already carries
  the required temporal reference

### 3. Tool invocation remains too keyword-driven

- bounded search and page read exist and are safe enough for targeted use
- planner heuristics still appear to rely too heavily on narrow trigger phrases
  such as `search the web`, `look up`, or `read page`
- result: natural requests like weather, latest fact checks, or "what is on
  this website" can fail to trigger the correct external-read path

### 4. Expression can still make false capability claims

- the expression path does not receive enough explicit truth about memory
  continuity and available bounded tools
- result: the assistant may answer with statements such as "I cannot remember"
  or otherwise deny capabilities that the runtime actually has

## Target Outcome

After the full lane lands, the expected behavior is:

- linked users can be recalled in human-facing answers when runtime identity
  facts already support that recall
- direct time questions can be answered from the active turn timestamp without
  inventing a new time subsystem
- weather, latest-fact, and website-content questions can trigger bounded
  search or page-read behavior through intent-aware heuristics rather than only
  through explicit keyword prompts
- expression stays truthful about memory and tool capabilities
- all of the above are pinned by targeted regression tests and reflected in
  canonical docs and context truth

## Architecture Constraints

This lane must preserve the approved pipeline:

`event -> perception -> context -> motivation -> role -> planning -> action -> expression -> memory -> reflection`

The lane must also preserve the action boundary:

- external reads remain action-owned execution paths
- planning may decide that a bounded read is needed
- expression may use results, but must not invent a second execution path

## Non-Goals

This lane must not:

- create a second memory store or second identity-linking map
- move side effects into context, motivation, role, planning, or expression
- add open-ended browsing authority
- add autonomous self-modifying skill learning
- replace existing auth, profile, context, or action systems with parallel
  abstractions

## Existing Systems To Reuse

- auth user record and existing `display_name`
- profile-owned Telegram linking fields
- runtime state load in `backend/app/core/runtime.py`
- `ContextAgent` and existing context-summary composition
- `ExpressionAgent` and prompt-building path
- planner intent classification and existing bounded tool-intent families
- `ActionExecutor` search and page-read operations
- existing runtime behavior and stage-level test suites

## Execution Order

The lane is intentionally split into seven slices:

1. `PRJ-696` Foreground Awareness Contract Freeze
2. `PRJ-697` Runtime Turn-Awareness Payload And Prompt Propagation
3. `PRJ-698` Identity Facts Flow And Truthful Capability Claims
4. `PRJ-699` Implicit Tool Invocation Heuristics For External Facts
5. `PRJ-700` Behavior Regression Proof For Memory, Time, And Tool Awareness
6. `PRJ-701` Canonical Docs And Testing Guidance Sync
7. `PRJ-702` Final Validation, Context Sync, And Learning Closure

The order matters:

- contract first, so implementation does not guess new authority rules
- runtime propagation second, so later slices build on one explicit foreground
  payload
- identity and truthful self-claims third, because name recall and false
  "cannot remember" answers are the clearest product breakage
- implicit tool heuristics fourth, because they should consume the same
  foreground-awareness baseline instead of inventing their own path
- regression proof fifth, so repaired behavior is pinned before doc closure
- docs and final sync last, once runtime truth is verified

## Detailed Slice Plan

### PRJ-696 - Foreground Awareness Contract Freeze

#### Goal

Freeze one explicit contract for what the active foreground turn is allowed to
"know immediately" before any new code is written.

#### Scope

- define the exact foreground-awareness inputs the runtime should surface
- keep the definition within existing stage ownership and action boundaries
- record prohibited shortcuts so implementation does not widen capability
  authority

#### Required outcomes

- one explicit contract covers:
  - current turn time
  - human-facing identity facts already owned by existing auth/profile state
  - memory continuity posture
  - bounded tool readiness posture for search and page read
- the contract explicitly says expression must not deny capabilities that the
  runtime already surfaced for the active turn
- the contract explicitly says planner may infer bounded external reads from
  intent, not only from exact trigger phrases

#### Likely files

- `docs/planning/foreground-memory-time-and-tool-awareness-repair-plan.md`
- `docs/planning/next-iteration-plan.md`
- possibly canonical docs later, but this slice should stay planning-first

#### Validation

- architecture cross-review against:
  - `docs/architecture/02_architecture.md`
  - `docs/architecture/15_runtime_flow.md`
  - `docs/architecture/16_agent_contracts.md`
  - `docs/architecture/29_runtime_behavior_testing.md`

### PRJ-697 - Runtime Turn-Awareness Payload And Prompt Propagation

#### Goal

Add one explicit turn-awareness payload to the existing runtime path and make
sure it reaches context and expression without creating a second prompt stack.

#### Implementation focus

- extend runtime state with a narrow, explicit foreground-awareness snapshot
- include:
  - current turn timestamp in one answer-usable form
  - bounded tool readiness or availability posture for search and page read
  - memory continuity posture
- thread that payload through the existing context and expression path

#### Important constraints

- do not add side effects outside action
- do not add a second context system
- do not duplicate data already available in event or runtime state

#### Likely files

- `backend/app/core/runtime.py`
- `backend/app/agents/context.py`
- `backend/app/expression/generator.py`
- `backend/app/integrations/openai/prompting.py`
- runtime contracts or dataclasses already used by those layers

#### Validation

- `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_context_agent.py tests/test_expression_agent.py tests/test_runtime_pipeline.py tests/test_api_routes.py; Pop-Location`

### PRJ-698 - Identity Facts Flow And Truthful Capability Claims

#### Goal

Make the linked user's human-facing identity facts available to the foreground
turn and stop false self-capability denials.

#### Implementation focus

- reuse existing auth/profile identity sources rather than adding a new store
- make `display_name` or equivalent recall-safe identity fact reachable from
  runtime context when the user is linked and authenticated
- add answer-path guardrails so expression does not say it cannot remember or
  cannot know something when runtime truth already provides that capability

#### Important constraints

- no new identity map
- no forced name hallucination when identity facts are absent
- no hard-coded response strings that bypass normal prompt behavior

#### Likely files

- `backend/app/api/routes.py`
- `backend/app/core/runtime.py`
- `backend/app/identity/service.py`
- `backend/app/expression/generator.py`
- `backend/app/integrations/openai/prompting.py`

#### Validation

- `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_api_routes.py tests/test_expression_agent.py tests/test_runtime_pipeline.py; Pop-Location`

### PRJ-699 - Implicit Tool Invocation Heuristics For External Facts

#### Goal

Make bounded external reads trigger from intent-aware heuristics rather than
from narrow explicit keywords only.

#### Implementation focus

- extend planning heuristics for questions about:
  - weather
  - latest or current facts
  - explicit domains or URLs
  - requests to inspect website content
  - similar external-fact patterns already within approved bounded tooling
- keep the output inside the existing typed-intent and action-execution path

#### Important constraints

- no open-ended browsing
- no second planning engine
- no connector policy expansion beyond current approved search and page-read
  families

#### Likely files

- `backend/app/agents/planning.py`
- `backend/app/core/action.py`
- existing tool-intent contracts or fixtures used by those modules

#### Validation

- `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_planning_agent.py tests/test_action_executor.py tests/test_runtime_pipeline.py; Pop-Location`

### PRJ-700 - Behavior Regression Proof For Memory, Time, And Tool Awareness

#### Goal

Pin the repaired behavior through focused regressions that match the actual
product failures reported on 2026-04-25.

#### Required scenarios

- linked Telegram or app-linked user asks `jak się nazywam?`
- user asks `która godzina?`
- user asks weather without explicitly saying `search the web`
- user asks what is on `luckysparrow.ch` without explicitly saying `read page`
- user asks another current-fact question that should route through bounded
  search
- expression must not deny memory capability when runtime context already
  contains relevant recall

#### Additional analogous scenarios worth pinning

- `co wiesz o mnie?`
- `jaki dziś jest dzień?`
- `sprawdź najnowsze informacje o ...`
- `co jest na tej stronie` with a URL and with a bare domain

#### Likely files

- `backend/tests/test_api_routes.py`
- `backend/tests/test_runtime_pipeline.py`
- `backend/tests/test_planning_agent.py`
- `backend/tests/test_expression_agent.py`
- behavior fixtures if the repo already uses a shared scenario layer here

#### Validation

- `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_api_routes.py tests/test_runtime_pipeline.py tests/test_planning_agent.py tests/test_expression_agent.py; Pop-Location`

### PRJ-701 - Canonical Docs And Testing Guidance Sync

#### Goal

Synchronize canonical docs and testing guidance only after the repaired runtime
truth is proven.

#### Documentation focus

- foreground awareness contract in runtime flow or agent contracts
- testing guidance for indirect capability use and time-awareness scenarios
- implementation-reality docs if they need to distinguish canonical intent from
  live runtime specifics

#### Likely files

- `docs/architecture/15_runtime_flow.md`
- `docs/architecture/16_agent_contracts.md`
- `docs/architecture/29_runtime_behavior_testing.md`
- `docs/engineering/testing.md`
- `docs/implementation/runtime-reality.md` if live-runtime detail needs update

#### Validation

- cross-doc consistency review plus the focused pytest commands from prior
  slices

### PRJ-702 - Final Validation, Context Sync, And Learning Closure

#### Goal

Close the lane only after targeted proof, context sync, and recurring-pitfall
capture are all complete.

#### Required outcomes

- full source-of-truth sync across:
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
  - `.codex/context/LEARNING_JOURNAL.md`
  - `docs/planning/next-iteration-plan.md`
- final acceptance notes say exactly what changed in user-facing behavior
- learning journal records the recurring pitfall around capability truth not
  reaching expression

#### Validation

- `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q; Pop-Location`
- manual scenario replay for:
  - linked-name recall
  - direct time answer
  - weather lookup
  - website-content lookup

## Acceptance Matrix

The lane should not be considered complete until all rows below are true:

| Capability | Before lane | After lane |
| --- | --- | --- |
| Linked user name recall | identity owner may be correct, but answer path can still fail | answer path can use existing identity facts truthfully |
| Direct time question | timestamp exists but is not foreground-usable enough | current turn time is available to the answer path |
| Weather and latest facts | often blocked on explicit keyword phrasing | bounded search can trigger from intent-aware heuristics |
| Website content question | often blocked on `read page` wording | bounded page-read can trigger from domain or website-content intent |
| Memory self-claims | expression can deny real capabilities | expression stays aligned with runtime truth |

## Risks And Mitigations

### Risk: expression becomes overly rigid

Mitigation:

- add capability guardrails at the truth-contract level, not as brittle hard
  coded replies

### Risk: planner becomes too eager with tools

Mitigation:

- keep heuristics bounded to current approved tool families and explicit
  external-fact intents

### Risk: duplicate identity logic appears in prompt code

Mitigation:

- fetch human-facing identity facts once through existing runtime ownership and
  pass normalized outputs downstream

### Risk: docs drift ahead of implementation

Mitigation:

- keep canonical doc sync in `PRJ-701` after regression proof, not before

## No New Open Decision Required

Current analysis does not require a new architecture decision from the user.
The needed work fits the approved architecture and should be executed as
implementation and contract-closure slices within the existing runtime model.
