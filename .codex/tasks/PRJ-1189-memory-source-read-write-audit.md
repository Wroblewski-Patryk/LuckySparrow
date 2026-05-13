# PRJ-1189 Memory Source Read/Write Audit

## Header
- ID: PRJ-1189
- Title: Memory source read/write audit and semantic episodic retrieval closure
- Task Type: fix
- Current Stage: verification
- Status: DONE
- Owner: Backend Builder
- Depends on: PRJ-1186, PRJ-1187, PRJ-1188
- Priority: P0
- Coverage Ledger Rows: not applicable
- Module Confidence Rows: AVIARY-MEMORY-001
- Requirement Rows: REQ-AI-001
- Quality Scenario Rows: QA-AI-001
- Risk Rows: RISK-AI-001
- Iteration: 1189
- Operation Mode: BUILDER
- Mission ID: PRJ-1189-memory-read-write-closure
- Mission Status: VERIFIED

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.
- [x] `.agents/core/project-memory-index.md` was reviewed through the active repository instructions and current state ledgers.
- [x] `.agents/core/mission-control.md` was reviewed through the active repository instructions and current state ledgers.
- [x] Missing or template-like state tables were bootstrapped from repository sources, or confirmed not needed.
- [x] Affected module confidence rows were identified.
- [x] Affected requirement, quality scenario, and risk rows were identified.
- [x] The task or mission improves release confidence, not only local code appearance.

## Mission Block
- Mission objective: prove every currently wired AION memory source has a real read and write path, then fix any read-side gaps in runtime context construction.
- Release objective advanced: AION memory continuity must not be write-only.
- Included slices: runtime query embedding provider alignment, semantic episodic vector retrieval, source-of-truth updates, local backend verification.
- Explicit exclusions: native SQL ANN/HNSW tuning and new memory families.
- Checkpoint cadence: audit, implementation, targeted validation, full validation, deployment proof.
- Stop conditions: architecture mismatch, failing memory regressions, or production deploy blocker.
- Handoff expectation: report changed files, tests, deployment status, and residual semantic-retrieval work.

## Context
AION already had the minimal runtime memory flow from PRJ-1186 and production OpenAI vector writes from PRJ-1187/PRJ-1188. The follow-up audit found that semantic episodic vectors were written, but foreground vector retrieval did not include `episodic` as an active read source, and runtime query embeddings could fall back to deterministic vectors even when production writes used OpenAI embeddings.

## Goal
Close the read/write gap so long-term similar episodic memories can be retrieved semantically and injected into the memory bundle even when they are outside the recent temporal window.

## Scope
- `backend/app/core/runtime.py`
- `backend/app/core/retrieval_policy.py`
- `backend/app/memory/repository.py`
- `backend/tests/test_runtime_pipeline.py`
- `backend/tests/test_memory_repository.py`
- project source-of-truth state files

## Implementation Plan
1. Audit memory source read/write paths across recent temporal, episodic, semantic, affective, relations, goals/tasks, planned work, profile, theta, and operational memory.
2. Make runtime query embeddings use the configured repository embedding provider.
3. Include `episodic` in foreground vector retrieval source families.
4. Merge vector-matched episodic rows into the episodic context bundle before applying the context limit.
5. Add regression tests proving provider-backed query embedding construction and vector-matched episodic retrieval outside the recent window.
6. Run targeted and full backend validation.

## Acceptance Criteria
- Runtime query embedding generation uses configured OpenAI/provider embedding client when available.
- Semantic retrieval source selection includes episodic vectors.
- A vector-matched episode outside the recent temporal candidate window appears in `get_hybrid_memory_bundle()["episodic"]`.
- Existing memory recall and preference tests continue to pass.

## Definition of Done
- [x] `DEFINITION_OF_DONE.md` scope is satisfied for this backend memory fix.
- [x] Regression tests cover the newly fixed paths.
- [x] Source-of-truth ledgers are updated with evidence and residual risks.

## Validation Evidence
- Tests:
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_memory_repository.py -k "vector_matched_episodic or query_embedding or hybrid_memory_bundle or semantic_embeddings"; ...` -> `4 passed, 65 deselected`
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_runtime_pipeline.py -k "memory or hybrid or semantic or preference or pet or recent"; ...` -> `17 passed, 95 deselected`
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_embedding_strategy.py tests/test_main_runtime_policy.py -k "source_kinds or relation_source_policy or retrieval"; ...` -> `3 passed, 59 deselected`
  - `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q; ...` -> `1080 passed`
- Manual checks: code audit of memory source families and runtime context injection.
- Screenshots/logs: not applicable.
- High-risk checks: memory read/write regression coverage added for query embedding provider and semantically matched episodic retrieval.
- Module confidence ledger updated: yes
- Module confidence rows closed or changed: AVIARY-MEMORY-001
- Requirements matrix updated: yes
- Requirement rows closed or changed: REQ-AI-001
- Quality scenarios updated: yes
- Quality scenario rows closed or changed: QA-AI-001
- Risk register updated: yes
- Risk rows closed or changed: RISK-AI-001
- Reality status: verified

## Architecture Evidence
- Architecture source reviewed: `docs/architecture/15_runtime_flow.md`, `docs/architecture/16_agent_contracts.md`, `docs/architecture/26_env_and_config.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Follow-up architecture doc updates: `docs/architecture/15_runtime_flow.md`

## Deployment / Ops Evidence
- Deploy impact: low
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: production smoke should include a non-temporal semantic recall scenario.
- Rollback note: revert the PRJ-1189 commit if semantic episodic retrieval causes unexpected context noise; recent temporal retrieval remains intact.
- Observability or alerting impact: existing `memory_flow` and hybrid diagnostics now include vector episodic hit accounting.
- Staged rollout or feature flag: existing `SEMANTIC_VECTOR_ENABLED` and `EMBEDDING_SOURCE_KINDS`.

## Review Checklist
- [x] Process self-audit completed before implementation.
- [x] Autonomous loop evidence covers all seven steps.
- [x] Exactly one priority task was completed in this iteration.
- [x] Operation mode was selected according to iteration rotation.
- [x] Current stage is declared and respected.
- [x] Deliverable for the current stage is complete.
- [x] Architecture alignment confirmed.
- [x] Existing systems were reused where applicable.
- [x] No workaround paths were introduced.
- [x] No logic duplication was introduced.
- [x] Definition of Done evidence is attached.
- [x] Relevant validations were run.
- [x] Docs or context were updated because repository truth changed.
- [x] Learning journal was not updated because no recurring pitfall was confirmed.

## Result Report
- Task summary: AION now reads semantically matched episodic vectors as foreground memory and builds query embeddings through the configured embedding provider.
- Files changed: runtime, retrieval policy, memory repository, memory/runtime tests, architecture/runtime state ledgers.
- How tested: targeted memory repository, runtime pipeline, embedding/retrieval policy packs, and full backend pytest.
- What is incomplete: native PostgreSQL ANN/operator ranking remains a future scale optimization.
- Next steps: deploy and run production non-temporal semantic recall proof.
- Decisions made: episodic is part of the foreground baseline vector retrieval family because it is the first source in the configured rollout order and is required for long-term similar-event memory.

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: episodic vectors were written but excluded from foreground vector retrieval; runtime query vectors could be built with a different provider than stored production vectors.
- Gaps: no test proved vector-matched episodic memory outside the recent window reached context.
- Inconsistencies: docs and env defaults said `episodic` is a baseline embedding source, while retrieval policy omitted it.
- Architecture constraints: preserve `event -> ... -> memory -> reflection` ownership and existing action-owned persistence.

### 1a. Bootstrap Missing Project Knowledge
- Bootstrap needed: no
- Sources scanned: runtime, memory repository, retrieval policy, tests, architecture docs, state ledgers.
- Rows created or corrected: PRJ-1189 task, memory requirement/quality/risk evidence.
- Assumptions recorded: no new memory family is introduced.
- Blocking unknowns: none.
- Why it was safe to continue: the change aligns with existing configured source families and rollout order.

### 2. Select One Priority Mission Objective
- Selected task: close semantic episodic memory read-side gap.
- Priority rationale: user explicitly asked whether all memory types are read/write; write-only episodic vectors undermine memory continuity.
- Why other candidates were deferred: SQL ANN indexing and richer consolidation are scale/future tasks, not required to fix behavior now.

### 3. Plan Implementation
- Files or surfaces to modify: runtime query embedding, retrieval source policy, memory repository hybrid bundle, tests, docs/state.
- Logic: use provider query embedding, include episodic source family, merge vector-hit episodes before recent-only episodes.
- Edge cases: empty query text, malformed source IDs, duplicate episode IDs, disabled vector mode.

### 4. Execute Implementation
- Implementation notes: reused existing repository/provider APIs and existing `aion_semantic_embedding` source records.

### 5. Verify and Test
- Validation performed: targeted memory repository/runtime/retrieval policy tests and full backend pytest.
- Result: all targeted tests passed; full backend pytest passed with `1080 passed`.

### 6. Self-Review
- Simpler option considered: widening recent temporal limit only; rejected because it would not be semantic long-term retrieval.
- Technical debt introduced: no
- Scalability assessment: repository-level cosine over fetched rows is acceptable for current scope but native pgvector ANN remains future hardening.
- Refinements made: added vector episodic diagnostics.

### 7. Update Documentation and Knowledge
- Docs updated: architecture runtime flow, project state, task board, ledgers.
- Context updated: yes
- Learning journal updated: not applicable.
