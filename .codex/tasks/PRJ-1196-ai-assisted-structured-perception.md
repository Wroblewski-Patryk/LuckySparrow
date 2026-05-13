# Task

## Header
- ID: PRJ-1196
- Title: AI-assisted structured perception
- Task Type: feature
- Current Stage: post-release
- Status: DONE
- Owner: Backend Builder
- Depends on: PRJ-1195
- Priority: P1
- Module Confidence Rows: AVIARY-COGNITIVE-RUNTIME-001
- Requirement Rows: QA-AI-002
- Quality Scenario Rows: QA-AI-002
- Risk Rows: ARCH-AI-PERCEPTION-001
- Iteration: 1196
- Operation Mode: BUILDER
- Mission ID: PRJ-1196
- Mission Status: VERIFIED

## Context
PRJ-1195 verified runtime layers, but user feedback correctly rejected deterministic keyword indexes as the target perception model. Existing heuristics remain useful only as fail-safe fallback.

## Goal
Add a minimal AI-first structured perception path for language, topic, tags, intent, salience, ambiguity, and affective cues, with deterministic perception retained as validated fallback.

## Scope
- `backend/app/perception/assessor.py`
- `backend/app/agents/perception.py`
- `backend/app/core/graph_adapters.py`
- `backend/app/core/runtime_graph.py`
- `backend/app/core/runtime.py`
- `backend/app/core/config.py`
- `backend/app/core/perception_policy.py`
- `backend/app/core/runtime_policy.py`
- `backend/app/integrations/openai/client.py`
- `backend/app/integrations/openai/prompting.py`
- focused tests and project state files

## Implementation Plan
1. Add structured perception classifier protocol and assessor.
2. Add OpenAI prompt/client support for compact JSON perception classification.
3. Wire async AI-assisted perception into the foreground graph before context construction.
4. Expose policy posture in `/health.runtime_policy` and `system_debug.adaptive_state`.
5. Add multilingual and runtime influence tests.

## Acceptance Criteria
- AI payload can set non-Polish/non-English language, topic, tags, and intent without keyword lists.
- Invalid provider payload falls back to baseline perception with explicit fallback evidence.
- Runtime context sees AI-derived topic tags before planning/expression.
- Health/debug surfaces show structured-perception posture.

## Definition of Done
- [x] AI-assisted perception path implemented.
- [x] Fallback path preserved.
- [x] Focused tests pass.
- [x] Full backend pytest passes.
- [x] State/docs updated.

## Forbidden
- Removing deterministic fallback.
- Adding a parallel runtime graph.
- Treating keyword lists as the target perception implementation.
- Persisting new user data without existing action/memory boundaries.

## Validation Evidence
- Tests:
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_perception_assessor.py tests/test_runtime_pipeline.py -k "ai_assisted_structured_perception or runtime_pipeline_api_source"; Pop-Location` -> `2 passed, 115 deselected`
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_config.py tests/test_runtime_policy.py tests/test_main_lifespan_policy.py; Pop-Location` -> `70 passed`
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q; Pop-Location` -> `1098 passed`
- Manual checks: code inspection of perception graph ordering and fallback posture.
- Module confidence ledger updated: yes
- Module confidence rows closed or changed: AVIARY-COGNITIVE-RUNTIME-001
- Requirements matrix updated: yes
- Requirement rows closed or changed: REQ-AI-002
- Quality scenarios updated: yes
- Quality scenario rows closed or changed: QA-AI-002
- Risk register updated: yes
- Risk rows closed or changed: RISK-AI-002
- Reality status: verified

## Architecture Evidence
- Architecture source reviewed: `docs/architecture/16_agent_contracts.md`, `docs/operations/aion-runtime-layer-audit-2026-05-13.md`, `.agents/state/known-issues.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no

## Deployment / Ops Evidence
- Deploy impact: low
- Env or secret changes: optional `STRUCTURED_PERCEPTION_ENABLED`; default enables when `OPENAI_API_KEY` exists.
- Health-check impact: `/health.runtime_policy` includes structured-perception posture.
- Rollback note: set `STRUCTURED_PERCEPTION_ENABLED=false` to force deterministic fallback.
- Observability or alerting impact: `system_debug.adaptive_state.structured_perception_policy`.
- Staged rollout or feature flag: yes

## Result Report
- Task summary: Added AI-assisted structured perception with schema validation, fallback, graph integration, health/debug visibility, and tests.
- Files changed: see git diff.
- How tested: focused backend tests plus full backend pytest listed above.
- What is incomplete: production smoke remains to run after deployment.
- Next steps: deploy/push and run production smoke if this change is promoted now.
- Decisions made: default structured perception is active when OpenAI is configured, with explicit disable flag.
