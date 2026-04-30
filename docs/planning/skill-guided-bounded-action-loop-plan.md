# Skill-Guided Bounded Action Loop Plan

## Purpose

This plan records the approved direction for making AION's tool use feel more
like a coherent digital cognition loop instead of a set of one-off handlers.

The goal is to let the personality:

- choose a relevant skill for a task
- use only tools approved for that skill
- execute several bounded tool steps in one foreground turn
- observe results between steps
- adjust execution order without escaping the user's goal or permission gates
- return one truthful answer with source-backed evidence

This plan does not add new provider families. The first implementation uses
the already-approved `web_search`, `web_browser`, and ClickUp paths.

## Current Baseline

Already implemented or visible in the repo:

- `knowledge_search.search_web` through DuckDuckGo HTML
- `web_browser.read_page` through generic HTTP page reading
- ClickUp `create_task`, `list_tasks`, and `update_task` through action-owned
  provider adapters when credentials are configured
- `/app/tools/overview` as the backend-owned tools truth for the product shell
- connector permission gates and action guardrails for read-only,
  suggestion-only, and mutate-with-confirmation operations
- architecture rule that only action executes side effects

Current limitation:

- planning can emit several intents, but action does not yet expose a
  first-class execute-observe-adjust loop with step observations and skill
  bindings
- skill metadata does not yet clearly bind `website_review`, `web_research`,
  or `clickup_task_management` to their approved tools in the UI/tools truth
- website review is still too close to a narrow web-read use case instead of a
  reusable skill-guided workflow

## Target Model

The intended model is:

`event -> plan -> selected skills -> allowed tools -> action loop -> observations -> final answer -> memory`

Planning owns:

- turn goal
- constraints
- detailed model plan
- selected skills
- allowed tool families
- connector permission gates
- typed domain intents

Action owns:

- tool/provider execution
- execution loop state
- bounded observations
- confirmation enforcement
- failure handling
- final action evidence

Skills own:

- reusable strategy metadata
- preferred workflow shape
- allowed tool bindings
- limits and forbidden moves

Tools own:

- one bounded operation
- provider-specific execution
- bounded result evidence

## Implementation Queue

### PRJ-803 Freeze Skill-Tool Binding And Bounded Action Loop Contract

Status: DONE in planning/docs.

Result:

- architecture records the approved skill/tool/action-loop boundary
- implementation plan records the staged rollout
- no runtime behavior changes are made in this slice

Validation:

- doc and context diff validation

### PRJ-804 Expose Skill-Tool Bindings In Tools Overview

Goal:

- make `/app/tools/overview` show which skills can use each active tool
- make the web tools screen truthful for browser, search, and ClickUp

Scope:

- `backend/app/core/app_tools_policy.py`
- app-facing tools overview schema tests
- web tools rendering if it currently omits the new fields
- docs/context sync

Expected output:

- `web_search` links to `web_research` and `website_review`
- `web_browser` links to `website_review` and optionally `web_research`
- `clickup` links to `clickup_task_management` or `work_partner_task_management`
- each binding states whether it is read-only or confirmation-gated

Validation:

- `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_api_routes.py; Pop-Location`
- `Push-Location .\web; npm run build; Pop-Location` if UI changes

### PRJ-805 Add Skill Registry Metadata For Tool-Aware Skills

Goal:

- ensure runtime capability truth has explicit skill records for:
  - `website_review`
  - `web_research`
  - `clickup_task_management`

Scope:

- existing skill registry or capability catalog owners
- role/skill policy snapshots
- health/debug visibility
- tests for metadata-only skill posture

Expected output:

- skills remain metadata-only
- each skill exposes allowed tools, limitations, and side-effect posture
- no skill can execute tools directly

Validation:

- `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_role_agent.py tests/test_api_routes.py; Pop-Location`

### PRJ-806 Introduce Action Execution Observation Contract

Goal:

- add one structured observation format for tool-step results inside action

Scope:

- action result contract
- runtime debug payload
- tests for bounded result summaries

Expected output:

- observations include tool id, operation, provider path, source reference,
  bounded summary, blocker/confidence, and next-step relevance
- raw provider payloads remain out of memory and debug responses

Validation:

- `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_action_executor.py tests/test_runtime_pipeline.py; Pop-Location`

### PRJ-807 Add Bounded Read-Only Action Loop For Website Review

Goal:

- let one foreground turn execute a bounded website-review workflow:
  direct URL read or search-first page review, then fact extraction or
  source-backed summary

Scope:

- action-owned loop only
- web search and browser clients
- planning/action contract tests
- behavior validation scenario

Expected output:

- if URL is present, action reads the page directly
- if target is ambiguous, action may search first and then read one selected
  result
- action may perform a small bounded retry only inside the approved goal
- the answer includes source and uncertainty/blocker notes

Validation:

- `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_planning_agent.py tests/test_action_executor.py tests/test_runtime_pipeline.py; Pop-Location`
- behavior validation scenario for website phone-number extraction

### PRJ-808 Extend The Loop To ClickUp Read And Confirmation-Gated Mutation

Goal:

- let the executor use ClickUp skill guidance for multi-step task review and
  safe updates without bypassing confirmation gates

Scope:

- ClickUp action path
- confirmation-gated mutation handling
- tests and debug evidence

Expected output:

- read-only task triage can happen in one turn when enabled and configured
- create/update still requires explicit confirmation
- action loop reports blocker when credentials or opt-in are missing

Validation:

- `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_action_executor.py tests/test_connector_policy.py tests/test_runtime_pipeline.py; Pop-Location`

### PRJ-809 Sync Runtime Docs, Ops Notes, And Behavior Evidence

Goal:

- make the new loop visible and operable without ambiguity

Scope:

- runtime docs
- testing docs
- ops runbook if health/debug surfaces change
- behavior-validation artifacts
- context sync

Expected output:

- docs describe the loop as action-owned
- health/debug evidence can prove which skills/tools were selected and used
- operators can distinguish a blocked provider from a failed plan

Validation:

- `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q; Pop-Location`

## Acceptance Criteria

- tools overview truth shows skill-tool bindings for search, browser, and
  ClickUp
- skill metadata remains non-executable
- action owns all tool execution and all provider calls
- multi-step read-only flows can complete in one foreground turn
- mutation paths remain confirmation-gated
- bounded observations are available for final answers, memory, and debug
- no raw provider payloads are persisted as learned knowledge

## Risks And Guardrails

- Risk: action loop becomes a hidden second planner.
  - Guardrail: loop may adjust execution order only inside the approved goal,
    selected skill, allowed tool set, and max-step policy.
- Risk: skills become accidental execution authority.
  - Guardrail: skills remain metadata-only and action checks connector policy.
- Risk: tool results leak too much data.
  - Guardrail: observations are bounded summaries and raw payloads are
    forbidden from memory/debug output.
- Risk: complex tasks silently half-complete.
  - Guardrail: completion state must be explicit:
    `satisfied|blocked|needs_confirmation|needs_clarification|step_limit`.

## Future Extension

Gmail or other mailbox tools should be added only after this loop is in place.
The likely future skill is `mailbox_review`, bound to read-only mailbox
operations plus a checkpoint model for "new since yesterday" or "new since
last check" comparisons.
