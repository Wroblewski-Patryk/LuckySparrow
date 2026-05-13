# AION Runtime Layer Audit - 2026-05-13

## Scope

This audit checks the current digital-being runtime layers outside the memory
closure work completed in `PRJ-1186` through `PRJ-1194`.

Canonical foreground order:

`baseline load -> perception -> affective_assessment -> context -> motivation -> role -> planning -> expression -> action -> episodic memory -> reflection trigger`

## Result

The core runtime layers are implemented and test-backed for the current release
path. The audit also exposed an important target-state gap: current
language/topic/intent perception still starts from deterministic keyword hints.
Those hints are acceptable only as a fallback when AI perception is unavailable
or returns invalid output.

## Layer Status

| Layer / perspective | Runtime owner | Read / input | Write / output | Status | Evidence | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Event normalization | API/scheduler contracts | raw transport payload | canonical `Event` with event/trace metadata | verified | `tests/test_event_normalization.py`; runtime smoke | Transport-specific normalization remains outside cognitive stages. |
| Attention / turn assembly | attention boundary | inbox, pending turns, scheduler prompts | foreground event candidate | verified for current backend path | `tests/test_runtime_pipeline.py`; scheduler tests; health surfaces | Native/mobile live transport proof remains separate UI/device work. |
| Identity baseline | runtime + identity service | profile, auth user, preferences, theta | `IdentityOutput` | verified | `test_runtime_pipeline_api_source`; identity policy debug surface | Identity affects expression and context without becoming a separate persona. |
| Perception | `PerceptionAgent` + `StructuredPerceptionAssessor` | event, recent memory, profile, optional OpenAI classifier | topic, intent, language, affective fallback, behavior feedback | verified | `tests/test_perception_assessor.py`; `tests/test_runtime_pipeline.py::test_runtime_pipeline_uses_ai_assisted_structured_perception_before_context`; PRJ-1196 focused packs; full backend pytest `1098 passed`; production smoke `release_ready=true` | PRJ-1196 makes model-owned structured perception active when OpenAI is configured and keeps deterministic keyword hints as fallback. |
| Affective assessment | `AffectiveAssessor` | perception fallback, optional classifier | final affective output and fallback reason | verified | `tests/test_affective_assessor.py`; runtime affective fallback tests | Production defaults may be fallback-only by policy, which is explicit in health/debug. |
| Context | `ContextAgent` | event, perception, identity, memory, goals, tasks, theta | compressed `ContextOutput` | verified | memory/context/runtime packs through PRJ-1194 | Includes recent, semantic, relation, affective, goal/task, and foreground truth cues. |
| Motivation | `MotivationEngine` | context, perception, theta, relations, goals/tasks | importance, urgency, valence, mode | verified | `tests/test_motivation_engine.py`; runtime goal/proactive packs | Adaptive tie-breaks are policy-gated. |
| Role / skills | `RoleAgent` + role policy | context, perception, preferences, relations, theta | selected role and metadata-only skill hints | verified | `tests/test_role_agent.py`; role/skill runtime scenarios | Skills inform role/plan but do not execute side effects. |
| Planning | `PlanningAgent` | motivation, role, context, goals/tasks, proposals, feedback | plan, steps, domain intents, gates | verified | `tests/test_planning_agent.py`; runtime connector/proposal scenarios | Planning proposes; action executes. |
| Expression | `ExpressionAgent` | event, context, plan, role, motivation, identity, preferences | message, tone, channel, delivery handoff | verified | `tests/test_expression_agent.py`; runtime API and memory recall tests | Expression can summarize already loaded foreground truth but does not execute tools. |
| Action | `ActionExecutor` | plan and delivery handoff | delivery result, connector execution, durable domain mutations | verified | `tests/test_action_executor.py`; connector confirmation tests | Mutating connectors remain confirmation-gated. |
| Episodic memory write | action/runtime follow-up | completed turn outputs | structured episode, optional embeddings | verified | PRJ-1186..PRJ-1194 tests and production proofs | Memory is no longer write-only for release path. |
| Reflection | `ReflectionWorker` | recent episodes, goals/tasks, relations | conclusions, theta, relations, proposals | verified | `tests/test_reflection_worker.py`; production topic-bucket proof | Background learning is deferred and does not block foreground. |
| Proactive / planned work | scheduler + planning/action | planned work, opt-in, attention relations | foreground proactive events and state updates | verified for backend path | scheduler and runtime proactive tests | Provider activation gaps are tracked separately. |
| System debug / observability | runtime debug surface + logs | stage outputs and diagnostics | structured `system_debug`, stage timings, `memory_flow` logs | verified | API route tests; runtime stage invariant tests | Debug payloads remain policy-gated and separate from public UX. |

## Current Gaps

| Gap | Status | Reason |
| --- | --- | --- |
| Native device proof for mobile UI | blocked/deferred | Local session lacks `adb`/`emulator`; tracked under mobile next steps. |
| External provider activation for organizer workflows | deferred | ClickUp, Google Calendar, and Google Drive credentials are not configured for expanded organizer claims. |
| ANN/vector index migration | deferred | Current production pgvector ranking has no latency evidence requiring ANN/index work. |
| AI-assisted affective classifier in production | policy-controlled | Production fallback-only posture is acceptable unless explicit affective AI rollout is selected. |
| AI-assisted structured perception | closed | `ARCH-AI-PERCEPTION-001` / `PRJ-1196`: provider-backed structured perception now owns language/topic/intent when OpenAI is configured, with deterministic keywords only as validated fallback; production `/health.runtime_policy.structured_perception_posture=ai_assisted_active`. |

## Validation

- `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_affective_contract.py tests/test_language_runtime.py tests/test_runtime_pipeline.py -k "polish_thanks or runtime_pipeline_api_source or contract_smoke_pins_stage"; Pop-Location`
  - result: `4 passed, 129 deselected`
- `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q; Pop-Location`
  - result: `1093 passed`

## Decision

The runtime layers are good enough for the current backend release path, but
future cognitive-runtime work should prioritize AI-assisted structured
perception before further expanding deterministic keyword maps.
