# Behavior Feedback Learning System Plan

## Purpose

This plan turns the current communication-boundary repair into an execution
queue for broader behavior-feedback learning.

The target is not a command parser. The target is a bounded interpretation
loop where AION can hear natural user feedback about its own behavior, convert
that feedback into explicit adaptive evidence, and let later turns and
reflection consume the result without bypassing the existing architecture.

## Current Reality

Already implemented:

- foreground runtime follows the canonical stage path:
  `event -> perception -> context -> motivation -> role -> planning -> expression -> action -> memory -> reflection`
- episodic memory persists completed turns
- relation memory stores scoped adaptive relation records
- planning can emit `maintain_relation` intents
- action owns relation persistence
- expression consumes communication-boundary relation truth
- reflection can derive relation updates from episodes
- context can expose short-gap recency from already-loaded memory timestamps
- `PRJ-833` widened repeated-greeting and excessive-contact feedback beyond
  strict imperative commands

Current gap:

- behavior-feedback interpretation now has a first explicit contract and
  debug-visible output for current communication-boundary signals
- the broader assessor is still narrow and heuristic-heavy beyond that first
  contract
- weaker observations do not yet accumulate before becoming stable relation
  truth
- the system does not yet self-review whether its last response violated a
  known communication preference
- scenario-level tests do not yet prove the full learning loop:
  feedback -> relation evidence -> persistence -> later expression change ->
  reflection consolidation

## Goal

Build a bounded behavior-feedback learning lane that lets AION learn from
natural user feedback about:

- repeated greetings and interaction rituals
- proactive/contact cadence
- interruption tolerance
- response style and collaboration posture
- perceived context loss across short conversation gaps

## Non-Goals

- Do not add a second short-term memory subsystem.
- Do not let expression mutate durable state.
- Do not let subconscious/reflection communicate directly with the user.
- Do not infer arbitrary identity changes from one ambiguous comment.
- Do not add self-modifying behavior or executable skill learning.

## Architecture Fit

Use the existing owners:

- perception/context: expose structured interpretation and current-turn truth
- planning: decide whether feedback should become a typed domain intent
- action: persist durable relation/conclusion state
- memory: store the completed episode
- reflection/subconscious: consolidate repeated patterns and propose slower
  adaptive outputs
- expression: consume high-confidence adaptive truth, but never write it

## Slice Queue

### PRJ-834 - Freeze Behavior-Feedback Learning Plan

Stage: planning

Deliverables:

- this planning document
- execution-ready `.codex/tasks/PRJ-834...` task
- context/task-board sync

Acceptance:

- next implementation agent can start without redoing discovery
- scope, order, tests, and forbidden shortcuts are explicit

### PRJ-835 - Add Behavior Feedback Interpretation Contract

Stage: implementation

Status: complete

Result:

- `BehaviorFeedbackOutput` now captures target, polarity, suggested relation
  family/value, confidence, evidence, and source.
- `PerceptionOutput.behavior_feedback` exposes current-turn descriptive
  interpretation.
- `system_debug.behavior_feedback` mirrors the same interpretation for
  behavior validation.
- the initial implementation reuses existing communication-boundary signals
  and does not add a new durable write path.

Scope:

- `backend/app/core/contracts.py`
- `docs/architecture/16_agent_contracts.md`
- `docs/architecture/29_runtime_behavior_testing.md`
- focused contract tests

Implementation outline:

1. Add a bounded `BehaviorFeedbackOutput` or equivalent structured payload.
2. Include fields such as:
   - `feedback_target`: `interaction_ritual|contact_cadence|interruption_tolerance|response_style|collaboration|context_continuity|unknown`
   - `feedback_polarity`: `correction|approval|observation|unclear`
   - `suggested_relation_type`
   - `suggested_relation_value`
   - `confidence`
   - `evidence`
   - `source`
3. Keep it descriptive until planning emits a typed intent.
4. Expose it in `system_debug` so behavior validation can inspect it.

Acceptance:

- debug surfaces show what feedback was interpreted
- no durable state changes happen in perception/context
- low-confidence feedback remains descriptive-only

Validation:

- `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_graph_state_contract.py tests/test_runtime_pipeline.py; Pop-Location`

Focused result:

- `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_graph_state_contract.py tests/test_runtime_pipeline.py -k "behavior_feedback or system_debug_surface or runtime_result_to_graph_state_maps_orchestrator_contract or graph_state_to_runtime_result_roundtrip"; Pop-Location`
  - `4 passed, 111 deselected`
- `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_graph_state_contract.py tests/test_runtime_pipeline.py; Pop-Location`
  - `115 passed`

### PRJ-836 - Implement Behavior Feedback Assessor

Stage: implementation

Status: complete

Result:

- added a bounded deterministic `BehaviorFeedbackAssessor`
- the assessor reuses communication-boundary extraction as its baseline
- broader descriptive feedback now covers:
  - repeated greetings
  - excessive contact through the baseline boundary path
  - context-continuity/reset complaints
  - overly formal response style
  - direct style approval
  - hands-on collaboration approval
  - low-confidence ambiguous behavior feedback
- perception now consumes the assessor for `behavior_feedback`
- unclear feedback remains descriptive and does not become a durable relation
  write

Scope:

- new or existing bounded module under `backend/app/communication/` or
  `backend/app/agents/`
- `backend/tests/test_communication_boundary.py`
- `backend/tests/test_planning_agent.py`
- optional OpenAI-assisted path only if it follows existing fallback patterns

Implementation outline:

1. Reuse existing deterministic communication-boundary extraction as baseline.
2. Add a broader assessor that recognizes natural feedback about AION behavior.
3. Keep deterministic fallback active and testable.
4. Support at least:
   - "you greet every message"
   - "you write too often"
   - "you are acting like this is a new conversation"
   - "that tone is too formal"
   - "this direct style works better"
5. Return structured interpretation, not direct writes.

Acceptance:

- natural feedback produces structured behavior-feedback output
- imperative commands still work
- unclear statements do not become durable relation writes

Validation:

- `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_communication_boundary.py tests/test_planning_agent.py; Pop-Location`
  - `92 passed`

### PRJ-837 - Route Feedback Evidence Through Planning And Action

Stage: implementation

Status: complete

Result:

- planning now accepts structured `behavior_feedback` output
- graph adapters pass `perception.behavior_feedback` into planning
- high-confidence structured relation feedback becomes typed
  `maintain_relation` intent
- low-confidence or unclear feedback remains descriptive-only
- action persists behavior-feedback relation updates only from typed planning
  intents and does not reparse raw event text

Scope:

- `backend/app/agents/planning.py`
- `backend/app/action/`
- `backend/tests/test_action_executor.py`
- `backend/tests/test_runtime_pipeline.py`

Implementation outline:

1. Planning consumes structured feedback output.
2. High-confidence explicit corrections emit `maintain_relation`.
3. Medium-confidence observations emit evidence-bearing relation intent only
   when confidence and target are sufficient.
4. Low-confidence observations stay in memory only.
5. Action persists the relation using the existing relation owner.

Acceptance:

- durable writes still require typed planning intents
- relation persistence does not reparse raw text in action
- confidence thresholds are test-covered

Validation:

- `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_planning_agent.py tests/test_action_executor.py tests/test_runtime_pipeline.py; Pop-Location`
  - `236 passed`

### PRJ-838 - Add Evidence Accumulation And Reflection Consolidation

Stage: implementation

Status: complete

Result:

- action now preserves `perception.behavior_feedback` in episodic payloads
- episodic field extraction exposes relation-backed behavior-feedback
  candidates for background analysis
- reflection consolidates repeated weak relation-backed behavior-feedback
  candidates into relation updates
- one weak candidate remains descriptive and does not become learned truth

Scope:

- `backend/app/reflection/relation_signals.py`
- `backend/app/memory/episodic.py`
- `backend/app/memory/repository.py`
- reflection tests

Implementation outline:

1. Preserve behavior-feedback fields in episodic extraction.
2. Let reflection consolidate repeated weaker observations into relation
   updates.
3. Use existing relation lifecycle semantics for evidence count, confidence,
   value shifts, and decay.
4. Add tests where two or three weak observations become a durable relation,
   while one weak ambiguous comment does not.

Acceptance:

- repeated weak feedback can become learned relation truth
- one ambiguous comment does not overfit behavior
- value-shift behavior remains governed by existing relation lifecycle rules

Validation:

- `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_reflection_worker.py tests/test_memory_repository.py tests/test_communication_boundary.py; Pop-Location`
  - `129 passed`

### PRJ-839 - Add Expression Self-Review For Known Communication Preferences

Stage: implementation

Status: complete

Result:

- expression now performs a bounded side-effect-free self-review after
  generation
- self-review removes repeated greetings when the relation model requests it
- self-review removes overly formal openings when concise/direct style is
  known
- scheduler replies remove unsolicited future contact promises when contact
  cadence relations discourage them
- `ExpressionOutput.self_review_notes` records narrow debug-visible adjustment
  notes without granting expression durable write authority
- OpenAI reply prompting now explicitly discourages unsolicited future pings
  when contact-cadence boundaries apply

Scope:

- `backend/app/expression/generator.py`
- `backend/app/integrations/openai/prompting.py`
- `backend/tests/test_expression_agent.py`
- `backend/tests/test_openai_prompting.py`

Implementation outline:

1. Keep expression side-effect-free.
2. Add a bounded post-generation self-review/sanitizer for known
   communication-boundary relations.
3. Start with:
   - repeated greeting
   - overly formal opening when direct style is known
   - proactive/contact cadence language in scheduler replies
4. Record debug-visible notes if an output was adjusted.

Acceptance:

- expression does not write durable state
- known preferences are honored even if LLM output drifts
- adjustments are narrow and test-covered

Validation:

- `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_expression_agent.py tests/test_openai_prompting.py; Pop-Location`
  - `23 passed`

### PRJ-840 - Add End-To-End Behavior Learning Scenarios

Stage: verification

Status: complete

Result:

- added end-to-end behavior-learning runtime scenarios `T21.1..T21.3`
- scenario proof covers:
  - behavior feedback about repeated greetings becoming relation truth
  - later expression removing a generated repeated greeting from learned
    relation truth
  - repeated weaker feedback consolidating through reflection
  - unclear feedback remaining descriptive-only

Scope:

- `backend/tests/test_runtime_pipeline.py`
- behavior validation scripts/artifacts if needed
- `docs/architecture/29_runtime_behavior_testing.md`

Implementation outline:

1. Add scenario: user says Aviary greets every message.
2. Verify planning emits relation intent.
3. Verify action persists relation.
4. Verify later expression avoids repeated greeting.
5. Add scenario: user gives softer repeated contact-frequency feedback.
6. Verify repeated weak observations consolidate through reflection.
7. Add negative scenario: ambiguous comment does not mutate durable state.

Acceptance:

- behavior is proven across time, not only in isolated unit tests
- system_debug evidence explains each stage
- no new hidden state path appears

Validation:

- `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_runtime_pipeline.py tests/test_communication_boundary.py tests/test_reflection_worker.py; Pop-Location`
  - `174 passed`
- optionally:
  `Push-Location .\backend; ..\backend\scripts\run_behavior_validation.ps1 -GateMode operator; Pop-Location`

### PRJ-841 - Sync Runtime Docs, Ops Notes, And Learning Journal

Stage: verification

Status: complete

Result:

- runtime reality now records the implemented behavior-feedback ownership
  chain across perception, planning, action, memory, reflection, and expression
- ops runbook now names behavior-feedback triage evidence and `T21.1..T21.3`
  release/incident evidence
- testing docs now include focused behavior-feedback regression guidance
- the learning journal updated the existing communication-boundary entry
  rather than creating a duplicate pitfall record
- project context now marks the behavior-feedback learning lane closed

Scope:

- `docs/implementation/runtime-reality.md`
- `docs/operations/runtime-ops-runbook.md`
- `docs/engineering/testing.md`
- `.codex/context/PROJECT_STATE.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/LEARNING_JOURNAL.md`

Acceptance:

- docs describe the same feedback-learning loop implemented in code
- validation evidence is recorded
- residual risks and next tiny task are explicit

Validation:

- `git diff --check`
  - pass

## Suggested Execution Order

1. `PRJ-835` contract first
2. `PRJ-836` assessor second
3. `PRJ-837` planning/action route third
4. `PRJ-838` reflection evidence accumulation fourth
5. `PRJ-839` expression self-review fifth
6. `PRJ-840` end-to-end behavior proof sixth
7. `PRJ-841` docs/context closure last

## Definition Of Done For The Lane

- natural feedback about AION behavior produces structured interpretation
- durable adaptation still flows through planning -> action
- reflection can consolidate repeated weaker feedback
- expression honors known high-confidence preferences
- behavior validation proves feedback changes later behavior
- debug surfaces can explain what was learned and why
- no parallel memory, command-only parser, or expression-owned persistence path
  is introduced
