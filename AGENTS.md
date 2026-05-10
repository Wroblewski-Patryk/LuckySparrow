# AGENTS.md - Aviary / Personality / AION

## Purpose

This repository uses a project-specific multi-agent workflow so Codex and
related agents can evolve Aviary / AION without drifting away from the current
Python runtime, contracts, docs, deployment reality, or product-shell UX
direction.

The product is called Aviary. The folder is still named `Personality` because
the repository folder has not been renamed yet. Treat `Aviary` and
`Personality` as the same project in this workspace.

## Canonical Context

Read these before starting non-trivial work:

- `.codex/context/PROJECT_STATE.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/LEARNING_JOURNAL.md`
- `.agents/core/operating-system.md`
- `.agents/core/project-memory-index.md`
- `.agents/core/mission-control.md`
- `.agents/core/product-delivery-system.md`
- `.agents/core/product-intake-and-decision-handshake.md`
- `.agents/core/requirements-verification-system.md`
- `.agents/core/execution-loop.md`
- `.agents/core/anti-regression.md`
- `.agents/core/quality-gates.md`
- `.agents/state/current-focus.md`
- `.agents/state/known-issues.md`
- `.agents/state/module-confidence-ledger.md`
- `.agents/state/delivery-map.md`
- `.agents/state/decision-register.md`
- `.agents/state/requirements-verification-matrix.md`
- `.agents/state/quality-attribute-scenarios.md`
- `.agents/state/risk-register.md`
- `.agents/state/regression-log.md`
- `.agents/state/system-health.md`
- `.agents/state/next-steps.md`
- `.agents/workflows/general.md`
- `.agents/workflows/documentation-governance.md`
- `.agents/workflows/subagent-orchestration.md`

## Canonical Docs

- `docs/README.md`
- `docs/overview.md`
- `docs/architecture/02_architecture.md`
- `docs/architecture/15_runtime_flow.md`
- `docs/architecture/16_agent_contracts.md`
- `docs/architecture/17_logging_and_debugging.md`
- `docs/architecture/29_runtime_behavior_testing.md`
- `docs/architecture/26_env_and_config.md`
- `docs/architecture/27_codex_instructions.md`
- `docs/architecture/architecture-source-of-truth.md`
- `docs/engineering/local-development.md`
- `docs/engineering/testing.md`
- `docs/planning/next-iteration-plan.md`
- `docs/planning/open-decisions.md`
- `docs/operations/runtime-ops-runbook.md`
- `docs/governance/working-agreements.md`
- `docs/governance/repository-structure-policy.md`
- `docs/governance/function-coverage-ledger-standard.md`
- `docs/governance/function-coverage-ledger-template.csv`
- `docs/ux/visual-direction-brief.md`
- `docs/ux/experience-quality-bar.md`
- `docs/ux/design-memory.md`
- `docs/ux/screen-quality-checklist.md`
- `docs/ux/anti-patterns.md`
- `docs/ux/brand-personality-tokens.md`
- `docs/ux/canonical-visual-implementation-workflow.md`
- `docs/ux/background-and-decorative-asset-strategy.md`

## Core Rules

### 1. Architecture Is Source Of Truth

- `docs/architecture/` is the single architecture authority for this repo.
- Implementation must stay aligned with approved architecture docs.
- If implementation does not fit architecture, stop and report the mismatch
  instead of forcing a workaround.
- After architecture, module, runtime, route, data, UX, or deployment changes,
  refresh `.agents/core/project-memory-index.md` governed indexes in the same
  mission. Architecture decisions left only in chat, commits, or scattered
  planning notes are not source of truth.

### 1A. Project Memory And Module Confidence

- Read `.agents/core/project-memory-index.md` before selecting non-trivial
  implementation work.
- Keep `.agents/state/module-confidence-ledger.md` as the truthful map of
  modules, journeys, working state, evidence, defects, and next proof or fix.
- Before implementing new features, resolve or explicitly defer P0/P1
  `BROKEN`, `BLOCKED`, `IMPLEMENTED_NOT_VERIFIED`, and evidence-missing module
  rows that affect the current release objective.
- Do not report "almost done", "close", "should work", or similar optimistic
  states. Use only evidence-backed states: `verified`, `implemented, not
  verified`, `partially verified`, `blocked`, or `failed`.
- The user must not be the first tester of a core journey. For browser, mobile,
  API, auth, data, AI, memory, runtime behavior, or deployment flows, run a
  real journey proof or record why it could not run and what risk remains.
- A task or mission that changes a module must update the module confidence
  ledger before it can be marked `DONE`.

### 1B. Mission-Based Work Blocks

- Follow `.agents/core/mission-control.md` for long-running autonomous work.
- Mission control supersedes older wording that says every execution nudge must
  end after exactly one tiny task. A mission may run for hours and include
  multiple small slices when they serve one coherent objective.
- Every mission must define current state, target outcome, owned scope,
  exclusions, validation gates, checkpoint cadence, stop conditions, and
  handoff expectations.
- Update project state, task board, system health, next steps, project status
  dashboard, and module confidence at checkpoints, not only at the end.
- Keep the mission bounded. Do not merge unrelated objectives just because the
  agent has available time.

### 1C. Product Delivery Map

- Use `.agents/core/product-delivery-system.md` and
  `.agents/state/delivery-map.md` before broad app, module, screen, workflow,
  or release work.
- Decompose user intent, architecture, references, screenshots, and notes into
  product journeys, screens, states, frontend, backend/API, data, integrations,
  memory/reflection, security, operations, and tests before implementation.
- For PNG, screenshot, Figma, or reference-driven UI work, slice the view into
  layout zones, components, states, and reusable patterns before coding.
- Every substantial mission should connect:
  `source idea/reference -> delivery map row -> mission -> code -> evidence -> module confidence row`.

### 1D. Product Intake And Decision Handshake

- Use `.agents/core/product-intake-and-decision-handshake.md` before coding
  vague app ideas, broad features, major architecture changes, UX redesigns,
  integrations, AI behavior, mobile behavior, or ambiguous fixes.
- If a request can describe multiple products or workflows, ask the smallest
  useful set of clarification questions before implementation.
- When progress can safely continue, state assumptions explicitly and classify
  them as `safe`, `risky`, or `blocking`.
- Continue only on safe assumptions. Stop for user confirmation on blocking
  assumptions that affect product behavior, data, architecture, UX, security,
  costs, or validation.
- Record accepted product and architecture decisions in
  `.agents/state/decision-register.md`. Decisions left only in chat are not
  durable project memory.

### 1E. Requirements, Verification, Quality, And Risk

- Use `.agents/core/requirements-verification-system.md` before implementing
  or expanding significant product, architecture, UX, data, API, AI, security,
  mobile, integration, ops, or release behavior.
- Maintain `.agents/state/requirements-verification-matrix.md` as the
  requirement-to-proof table. A requirement is not `verified` without evidence.
- Maintain `.agents/state/quality-attribute-scenarios.md` for non-functional
  goals such as usability, accessibility, performance, reliability, security,
  maintainability, observability, deployment, mobile, and AI behavior.
- Maintain `.agents/state/risk-register.md` for product, architecture, data,
  delivery, UX, AI, security, operations, and unknown risks.
- Durable analysis must be structured as tables, ledgers, registers, queues, or
  checklists with stable IDs, status, evidence, next action, and last updated
  date.
- On "continue", "next", "rob dalej", or "jedziemy dalej", prioritize
  `failed`, `blocked`, `implemented_not_verified`, and release-critical
  `accepted` requirements before adding unrelated work.
- If those tables or state files are missing, stale, or still template-like,
  bootstrap the minimum useful rows from existing repo documentation and code
  before selecting work. Mark inferred rows with source paths and cautious
  statuses; ask the user only when the gap changes product direction, data
  safety, deployment risk, permissions, payments, AI authority, or canonical UX.

### 2. Critical Prohibitions

- Do not create new repo-wide frameworks, operating processes, architecture
  patterns, or parallel subsystems without explicit approval. Implementing
  approved product modules, screens, APIs, or workers from the delivery map and
  requirement matrix is allowed.
- Do not introduce workaround paths or temporary bypasses.
- Do not duplicate logic already covered by existing mechanisms.
- Always reuse existing approved systems first.

### 3. Decision Mode For Mismatches

When architecture and implementation clash:

1. describe the problem
2. propose 2 to 3 valid options
3. wait for explicit user decision

### 4. Mandatory Task Structure

Each task must use `.codex/templates/task-template.md`, including:

- `Context`
- `Goal`
- `Constraints`
- `Definition of Done`
- `Forbidden`

### 5. Stage-Based Delivery Workflow

Every task must declare its current delivery stage and the output expected from
that stage.

Supported stages:
- `intake`
- `analysis`
- `planning`
- `implementation`
- `verification`
- `release`
- `post-release`

Rules:
- Do not skip stages implicitly.
- Do not implement during `analysis` or `planning` unless the user directly
  asked for implementation; in that case, move through the needed stages in one
  iteration and keep evidence current.
- Do not declare a task complete without `verification` evidence.
- If missing information materially affects quality or risk, stop at the
  current stage and surface the gap.

### 6. Mandatory Review And Refactor

After implementation, verify:

- architecture alignment
- reuse of existing systems
- no workaround introduced
- no logic duplication introduced

If any check fails, fix before closure.

### 7. Repository Guardrails

- Project state, task board, learning journal, and canonical docs are the
  source of truth.
- Keep repository artifacts in English.
- Communicate with the user in the user's language.
- Never reference sibling repositories or `!template` paths from project docs.
- Keep root minimal. Project documentation belongs in `docs/`.
- Every meaningful change updates at least one relevant source-of-truth file:
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
  - `.codex/context/LEARNING_JOURNAL.md` when a recurring pitfall is confirmed
  - canonical docs when behavior, scope, or architecture changed
- Respect the AION pipeline:
  - `event -> perception -> context -> motivation -> role -> planning -> action -> expression -> memory -> reflection`
- Preserve the action boundary:
  - side effects belong in the action or integration layer, not in reasoning
    stages
- Keep changes tiny, testable, and reversible.
- Run relevant validation before creating a commit.
- Do not mark work done without test or evidence notes that match the changed
  scope.
- When active work is unclear, a release or handoff needs confidence, or the
  queue goes stale, use the function coverage ledger standard to turn AION
  runtime/module confidence gaps into explicit evidence, blocker, fix, or
  scope-decision tasks before inventing new feature work.
- If a coverage ledger exists, derive follow-up tasks in this order: release
  blockers, implementation-review rows, `P0` evidence rows, `P0/P1` unverified
  rows, then lower-priority scope decisions.
- Do not turn every `PARTIAL` or evidence-missing ledger row into feature work.
  Plan verification first, then create a narrow fix only when proof or code
  inspection finds a real defect.
- For runtime, memory, reflection, language, or preference changes, leave
  behind focused tests and docs or context updates.
- Browser-driven validation must clean up after itself. Close Playwright,
  browser MCP, Chromium, Chrome, or headless browser contexts/pages before
  ending the task.
- Do not leave orphaned `chrome-headless-shell`, `chromium`, Playwright,
  dev-server, Docker, or database processes running unless the user explicitly
  asked to keep them alive.
- After UI/browser testing, check for leftover headless browser processes and
  terminate only the validation processes you started. On Windows, use a narrow
  check such as `Get-Process chrome-headless-shell -ErrorAction SilentlyContinue`
  and clean those up when they belong to the completed validation run.
- Treat leaked local processes as a P1 environment regression: record the
  pitfall in `.codex/context/LEARNING_JOURNAL.md` and include cleanup evidence
  in the task result report.
- For UX/UI work, require explicit design source, state coverage, responsive
  evidence, accessibility checks, and parity notes.
- For flagship screenshot-driven UX/UI work, close one surface at a time:
  - finish `layout` before `sidebar`
  - finish shared shell pieces before route modules that depend on them
  - do not polish `dashboard`, `chat`, or `personality` in parallel when the
    current target surface is still below the acceptance threshold
- Reuse shared UI patterns before introducing screen-local style inventions.
- When a new pattern is approved, record it in `docs/ux/design-memory.md`.
- When a canonical web screen reference exists, treat it as a specification
  and close the task with screenshot-comparison evidence.
- For canonical screenshot work, require an explicit `95%` parity gate before
  moving to the next dependent surface.
- When the user adds explicit notes on top of a canonical screenshot, treat the
  screenshot plus those notes as the active merged spec.
- If user notes conflict with each other or with an already-approved screen
  interpretation, stop and ask the user to choose before implementing.
- Do not silently downgrade decorative fidelity by replacing image-based
  backgrounds with gradient approximations.
- When a recurring environment or execution pitfall is discovered, record it in
  `.codex/context/LEARNING_JOURNAL.md` in the same task.
- Follow the default loop:
  - analyze current state
  - select one priority mission objective or task
  - plan implementation
  - execute implementation
  - verify and test
  - self-review
  - update documentation and knowledge
  - repeat

## Project Validation Baseline

Primary automated gate for this repo:

- `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q; Pop-Location`

Add narrower commands when useful, for example:

- `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_api_routes.py; Pop-Location`
- `Push-Location .\backend; ..\.venv\Scripts\python -m pytest -q tests/test_reflection_worker.py; Pop-Location`

Use Docker and HTTP smoke when deployment, runtime wiring, or integrations
change:

- `docker compose up --build`
- `curl http://localhost:8000/health`
- `curl -X POST http://localhost:8000/event ...`

## Autonomous Engineering Loop

Follow `docs/governance/autonomous-engineering-loop.md` for every autonomous iteration:

1. analyze current state
2. select one priority mission objective or task
3. plan implementation
4. execute implementation
5. verify and test
6. self-review
7. update documentation and knowledge

Before starting an iteration, perform the process self-audit from that document. Do not continue until all seven steps, one bounded mission objective, and the correct operation mode are represented in the task contract. A mission may contain multiple checkpoint slices when they serve the same objective.

Operation mode rotates by iteration number:

- `BUILDER`: default mode
- `ARCHITECT`: every third iteration, unless the iteration is also a tester iteration
- `TESTER`: every fifth iteration

Use `.agents/core/operating-system.md` as the startup and continuation path for
non-trivial work. Use `.agents/core/execution-loop.md`,
`.agents/core/anti-regression.md`, and `.agents/core/quality-gates.md` for the
iteration checklist, regression hunt, and validation contract. Keep
`.agents/state/*` current enough that a future session can continue from repo
state without hidden chat memory.

## Agent Catalog

- Planner: `.agents/prompts/planner.md` or `.claude/agents/planner.agent.md`
- Product Docs: `.agents/prompts/product-docs.md` or
  `.claude/agents/product-docs.agent.md`
- Backend Builder: `.agents/prompts/backend-builder.md` or
  `.claude/agents/backend-builder.agent.md`
- Frontend Builder: `.agents/prompts/frontend-builder.md` or
  `.claude/agents/frontend-builder.agent.md`
- QA/Test: `.agents/prompts/qa-test.md` or `.claude/agents/qa-test.agent.md`
- Security: `.agents/prompts/security-auditor.md` or
  `.claude/agents/security-auditor.agent.md`
- DB/Migrations: `.agents/prompts/db-migrations.md` or
  `.claude/agents/db-migrations.agent.md`
- Ops/Release: `.agents/prompts/ops-release.md` or
  `.claude/agents/ops-release.agent.md`
- Code Review: `.agents/prompts/code-reviewer.md`
- Codex Documentation Agent: `.codex/agents/documentation-agent.md`
- Codex Planning Agent: `.codex/agents/planning-agent.md`
- Codex Execution Agent: `.codex/agents/execution-agent.md`
- Codex Review Agent: `.codex/agents/review-agent.md`

## Trigger Intent

If the user sends a short execution nudge such as `rob`, `dzialaj`, `start`,
`go`, `next`, or `lecimy`:

1. Read `.agents/core/operating-system.md` and refresh `.agents/state/*`.
2. Read `.codex/context/TASK_BOARD.md`.
3. Take the first `READY` or `IN_PROGRESS` task.
4. If no task is `READY`, derive the next smallest useful task from:
   - `docs/planning/next-iteration-plan.md`
   - `docs/planning/open-decisions.md`
   - `.agents/state/next-steps.md`
   - `docs/governance/function-coverage-ledger-standard.md` and any active
     `docs/operations/*function-coverage*` artifacts when the queue is stale,
     release confidence is unclear, or a handoff/incident needs a module map
5. If planning docs, board, and `.agents/state/next-steps.md` drift, sync them
   before implementation.
6. Define a mission block or continue the active mission block.
7. Execute the next coherent checkpoint or set of tightly related slices.
8. Run relevant validation and real journey proofs.
9. Update task, project state, docs, project status dashboard when affected,
   module confidence, and `.agents/state/*` in the same cycle.
10. Return mission status, files changed, tests run, deployment impact,
   residual risk, and the next checkpoint.

## UX/UI Rule

This repository now has active browser-shell work. For UX/UI scope:

- require a design source or approved artifact
- check loading, empty, error, and success states
- check desktop, tablet, and mobile behavior
- check accessibility and input modes when relevant
- keep evidence in task notes or PR notes
- use `docs/ux/visual-direction-brief.md` before broad UI refresh work
- use `docs/ux/screen-quality-checklist.md` before calling a screen polished
- use `docs/ux/canonical-visual-implementation-workflow.md` for screenshot
  driven parity tasks
- use `docs/ux/background-and-decorative-asset-strategy.md` when route art
  direction depends on illustration or image-rich atmosphere
- require a quick screenshot check after each surface slice before proceeding
  to the next dependent surface

## Deployment Rule

- Treat `docs/operations/runtime-ops-runbook.md` as the current deployment and
  release-readiness contract.
- For runtime or deployment changes, update smoke steps and rollback notes in
  the same task.

## Subagent Rule

- Delegate only bounded, non-overlapping work.
- Keep critical-path runtime changes local.
- Give delegated tasks explicit file ownership.
- Integrate and verify subagent output before closure.

## Commit Rule

Do not create a commit when the required checks for the touched scope are
failing, unless the user explicitly accepts the risk.

## Production Hardening Gate

Canonical hardening files:

- `DEFINITION_OF_DONE.md`
- `INTEGRATION_CHECKLIST.md`
- `NO_TEMPORARY_SOLUTIONS.md`
- `DEPLOYMENT_GATE.md`
- `AI_TESTING_PROTOCOL.md`
- `.codex/agents/ai-red-team-agent.md`

Every task must include Goal, Scope, Implementation Plan, Acceptance Criteria, Definition of Done, and Result Report. A task is `DONE` only after `DEFINITION_OF_DONE.md` is satisfied with evidence.

Runtime features must be vertical slices across UI, logic, API, DB, validation, error handling, and tests. Partial implementations, placeholders, mock-only behavior, fake data, temporary fixes, and hidden bypasses are forbidden.

AI systems must be tested against prompt injection, data leakage, and unauthorized access before deployment. AI features require reproducible multi-turn scenarios from `AI_TESTING_PROTOCOL.md` and red-team review when risk is meaningful.

## Template Sync: World-Class Delivery Addendum

Use these additional standards for substantial product, runtime, release, UX,
security, or AI work:

- `.agents/workflows/user-collaboration.md`
- `.agents/workflows/world-class-delivery.md`
- `docs/governance/world-class-product-engineering-standard.md`
- `docs/operations/service-reliability-and-observability.md`
- `docs/security/secure-development-lifecycle.md`
- `docs/ux/evidence-driven-ux-review.md`

For substantial changes, define why the work matters, the smallest safe slice,
the success signal, the main failure mode, and the rollback or recovery path.
For deployable services or important journeys, define SLIs/SLOs, health checks,
alert routes, and error-budget posture when appropriate. For auth, AI, money,
secrets, permissions, integrations, or user-data work, use the secure
development lifecycle and include threat-model or abuse-case evidence.

## Template Sync: App Creation, Feedback, And Handoff

- Use `docs/governance/app-creation-playbook.md` and `.codex/templates/app-blueprint-template.md` before broad implementation of a new app, major module, dashboard, tool, website, game, or product surface.
- Use `docs/governance/user-feedback-loop.md` and `.codex/templates/user-feedback-item-template.md` when user feedback changes behavior, UX, visual direction, copy, priority, architecture, validation, or future screen decisions.
- For substantial or multi-session work, finish with a concise handoff packet from `.codex/templates/handoff-packet-template.md`.
