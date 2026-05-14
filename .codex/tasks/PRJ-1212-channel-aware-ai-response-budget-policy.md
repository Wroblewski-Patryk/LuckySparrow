# Task

## Header
- ID: PRJ-1212
- Title: Channel-aware AI response budget policy
- Task Type: fix
- Current Stage: verification
- Status: DONE
- Owner: Backend Builder
- Depends on: PRJ-1211
- Priority: P1
- Coverage Ledger Rows: not applicable
- Module Confidence Rows: AVIARY-COGNITIVE-RUNTIME-001
- Requirement Rows: REQ-AI-003
- Quality Scenario Rows: QA-AI-003
- Risk Rows: RISK-AI-003
- Iteration: 1212
- Operation Mode: BUILDER
- Mission ID: PRJ-1212
- Mission Status: VERIFIED

## Process Self-Audit
- [x] All seven autonomous loop steps are planned.
- [x] No loop step is being skipped.
- [x] Exactly one priority task is selected.
- [x] Operation mode matches the iteration number.
- [x] The task is aligned with repository source-of-truth documents.
- [x] `.agents/core/project-memory-index.md` was reviewed.
- [x] `.agents/core/mission-control.md` was reviewed for long-running work.
- [x] Missing or template-like state tables were bootstrapped from repository sources, or confirmed not needed.
- [x] Affected module confidence rows were identified.
- [x] Affected requirement, quality scenario, and risk rows were identified.
- [x] The task or mission improves release confidence, not only local code appearance.

## Mission Block
- Mission objective: Replace ad hoc AI reply token caps with a channel-aware policy that lets web chat answer fully while keeping Telegram and concise modes cost-bounded.
- Release objective advanced: AI expression quality and cost control.
- Included slices: OpenAI response budget owner, prompt budget contract, expression delivery-channel handoff, focused and full backend tests, source-of-truth updates.
- Explicit exclusions: UI layout changes, provider/model migration, user-configurable budget settings, Telegram transport segmentation rewrites.
- Checkpoint cadence: complete as one backend verification slice.
- Stop conditions: fail backend regression, architecture mismatch, or unclear channel contract.
- Handoff expectation: future response-quality work should extend `ResponseBudgetPolicy` instead of adding new token literals in the OpenAI client.

## Context
PRJ-1211 increased very small OpenAI reply caps and fixed web Chat rendering symptoms. User follow-up clarified the desired product behavior: web chat should not feel cut off, Telegram still needs smart message segmentation, and costs must stay bounded.

## Goal
Create one explicit response-budget policy that separates AI generation budget from transport delivery limits and gives the model a prompt-level contract to complete answers cleanly.

## Success Signal
- User or operator problem: chat responses can end abruptly or inherit Telegram-shaped thinking.
- Expected product or reliability outcome: app chat gets a larger, channel-appropriate generation budget; Telegram remains bounded and segmented by delivery.
- How success will be observed: tests show API and Telegram turns resolve different budgets and prompt contracts.
- Post-launch learning needed: yes

## Deliverable For This Stage
Verified backend implementation plus durable project-memory updates.

## Scope
- `backend/app/integrations/openai/response_budget.py`
- `backend/app/integrations/openai/client.py`
- `backend/app/integrations/openai/prompting.py`
- `backend/app/expression/generator.py`
- focused backend tests for OpenAI client, prompting, response budget policy, expression, runtime pipeline, graph adapters, delivery router, and API route regression
- source-of-truth task/context/state docs

## Implementation Plan
1. Add `ResponseBudgetPolicy` with channel/style/depth budgets and a completion-oriented prompt contract.
2. Pass expression delivery channel into OpenAI reply generation before action delivery.
3. Inject budget contract into the OpenAI reply system prompt.
4. Replace OpenAI client literal token caps with the policy output.
5. Add regression tests for API chat, Telegram, concise, structured, deep, prompt, runtime, and graph-adapter paths.
6. Run focused and full backend validation.
7. Update task board, project state, module confidence, requirement, risk, quality, and system-health files.

## Acceptance Criteria
- API chat normal replies use a larger budget than Telegram normal replies.
- Concise style remains lower cost but no longer uses tiny legacy caps.
- Deep API turns can expand when role/motivation/goal calls for analysis or execution.
- The prompt tells the model not to end mid-sentence, mid-list, or inside an unfinished code block.
- Telegram transport segmentation remains owned by `DeliveryRouter`.
- Full backend pytest passes.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- stay within the declared current stage unless explicit approval changes it

## Definition of Done
- [x] Response generation budget policy is centralized and tested.
- [x] App chat and Telegram paths are differentiated before OpenAI generation.
- [x] Prompt-level answer-completion contract is tested.
- [x] Full backend test gate passes.
- [x] Source-of-truth files are updated.

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
- Tests:
  - `tests/test_response_budget_policy.py tests/test_openai_client.py tests/test_openai_prompting.py` -> `14 passed`
  - `tests/test_expression_agent.py tests/test_openai_client.py tests/test_openai_prompting.py tests/test_response_budget_policy.py tests/test_delivery_router.py` -> `53 passed`
  - `tests/test_runtime_pipeline.py -k "api_source or action_delivery_contract or telegram_delivery_exception"` -> `3 passed, 112 deselected`
  - `tests/test_graph_stage_adapters.py tests/test_api_routes.py::test_event_endpoint_coalesces_rapid_telegram_messages_into_single_runtime_turn` -> `6 passed`
  - full backend pytest -> `1105 passed`
- Manual checks: reviewed diff and channel/budget ownership.
- Screenshots/logs: not applicable.
- High-risk checks: first full backend run exposed missing graph-adapter fake signature and one timing-sensitive Telegram coalescing failure; focused rerun passed after fake fix, then full backend passed.
- Coverage ledger updated: not applicable
- Module confidence ledger updated: yes
- Module confidence rows closed or changed: AVIARY-COGNITIVE-RUNTIME-001
- Requirements matrix updated: yes
- Requirement rows closed or changed: REQ-AI-003
- Quality scenarios updated: yes
- Quality scenario rows closed or changed: QA-AI-003
- Risk register updated: yes
- Risk rows closed or changed: RISK-AI-003
- Reality status: verified

## Architecture Evidence
- Architecture source reviewed: `docs/architecture/15_runtime_flow.md`, `docs/architecture/16_agent_contracts.md`
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed: user asked to implement the proposed engineering solution.
- Follow-up architecture doc updates: expression contract now records that reply budget policy is generation guidance, while transport delivery limits stay in action/integration routing.

## Deployment / Ops Evidence
- Deploy impact: low
- Env or secret changes: none
- Health-check impact: none
- Smoke steps updated: no
- Rollback note: revert `ResponseBudgetPolicy` wiring to previous OpenAI client constants if live cost/latency is unacceptable.
- Observability or alerting impact: none
- Staged rollout or feature flag: no

## AI Testing Evidence
- `AI_TESTING_PROTOCOL.md` reviewed: yes, proportional to response-generation behavior.
- Memory consistency scenarios: runtime pipeline regression remained green.
- Multi-step context scenarios: graph adapter and runtime pipeline tests remained green.
- Adversarial or role-break scenarios: existing expression boundary tests remained green.
- Prompt injection checks: no new tool/data access authority added.
- Data leakage and unauthorized access checks: no ownership or data-access paths changed.
- Result: verified

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
- [x] Docs or context were updated if repository truth changed.
- [x] Learning journal was updated if a recurring pitfall was confirmed.

## Result Report
- Task summary: Added channel-aware response budgets and prompt guidance so app chat can answer fully without adopting Telegram delivery limits or unbounded costs.
- Files changed: response budget policy, OpenAI client/prompt builder, expression generator, focused tests, and project state docs.
- How tested: focused backend packs plus full backend pytest.
- What is incomplete: no live cost telemetry or user-configurable budget controls in this slice.
- Next steps: monitor live answer length/cost; extend `ResponseBudgetPolicy` if future product modes need explicit long-form answer controls.
- Decisions made: generation budget and transport segmentation remain separate contracts.

## Autonomous Loop Evidence

### 1. Analyze Current State
- Issues: previous reply caps were literal values inside the OpenAI client, making future channel behavior easy to regress.
- Gaps: model had no explicit instruction to close answers cleanly inside budget.
- Inconsistencies: Telegram segmentation was already transport-owned, but generation did not know the delivery channel.
- Architecture constraints: expression may prepare user-facing text; action/integration owns side effects and transport delivery.

### 1a. Bootstrap Missing Project Knowledge
- Bootstrap needed: no
- Sources scanned: project state, task board, memory index, runtime flow, agent contracts, OpenAI client, prompt builder, expression generator, delivery router, tests.
- Rows created or corrected: REQ-AI-003, QA-AI-003, RISK-AI-003.
- Assumptions recorded: API channel represents web/app chat for this backend contract.
- Blocking unknowns: none.
- Why it was safe to continue: user approved implementing the proposed approach and existing delivery channel contracts are explicit.

### 2. Select One Priority Mission Objective
- Selected task: PRJ-1212 channel-aware AI response budget policy.
- Priority rationale: direct user feedback on answer truncation and cost control.
- Why other candidates were deferred: broader Chat visual polish is useful but less directly tied to answer correctness.

### 3. Plan Implementation
- Files or surfaces to modify: OpenAI integration, expression generator, focused backend tests, state docs.
- Logic: resolve budget from delivery channel, response style, motivation, role, and plan goal.
- Edge cases: concise style, structured preference, deep analysis, Telegram channel, graph adapter fakes.

### 4. Execute Implementation
- Implementation notes: added `ResponseBudgetPolicy`; passed `delivery_channel` from expression to OpenAI; injected budget contract into both LangChain and fallback prompt paths.

### 5. Verify and Test
- Validation performed: focused packs and full backend pytest.
- Result: verified with `1105 passed`.

### 6. Self-Review
- Simpler option considered: only raising `max_output_tokens` again.
- Technical debt introduced: no
- Scalability assessment: policy can be extended with settings/telemetry later without changing prompt call sites.
- Refinements made: fixed graph-adapter fake signature after full test caught the gap.

### 7. Update Documentation and Knowledge
- Docs updated: task board, project state, architecture contract, module confidence, requirement matrix, quality scenarios, risk register, system health, next steps, current focus.
- Context updated: yes
- Learning journal updated: yes.
