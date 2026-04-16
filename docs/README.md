# Docs Index

This repository uses a two-layer documentation model:

- numbered files in `docs/basics/` hold the long-form product and architecture narrative
- category folders in `docs/` hold repo-derived, operational, and governance truth

## Start Here

- `overview.md` - short current-state summary of what the runtime actually does today
- `assumptions/README.md` - how Codex-maintained assumptions work in this repo
- `assumptions/runtime-baseline-2026-04-15.md` - code-derived runtime baseline and current-vs-planned gaps

## Existing Narrative Docs

These files describe the intended system shape, MVP scope, and deeper design topics:

- `basics/00_quickstart.md`
- `basics/01_project_overview.md`
- `basics/02_architecture.md`
- `basics/03_identity_roles_skills.md`
- `basics/04_memory_system.md`
- `basics/05_conscious_subconscious.md`
- `basics/06_motivation_engine.md`
- `basics/07_agent_system.md`
- `basics/08_stack.md`
- `basics/09_mvp_scope.md`
- `basics/10_future_vision.md`
- `basics/11_event_contact.md`
- `basics/12_data_model.md`
- `basics/13_repository_structure.md`
- `basics/14_build_roadmap.md`
- `basics/15_runtime_flow.md`
- `basics/16_agent_contracts.md`
- `basics/17_logging_and_debugging.md`
- `basics/18_theta_dynamics.md`
- `basics/19_expression_system.md`
- `basics/20_action_system.md`
- `basics/21_goal_task_system.md`
- `basics/22_relation_system.md`
- `basics/23_proactive_system.md`
- `basics/24_system_guardrails.md`
- `basics/25_first_iteration_plan.md`
- `basics/26_env_and_config.md`
- `basics/27_codex_instructions.md`
- `basics/28_local_windows_and_coolify_deploy.md`

## Governance

- `governance/working-agreements.md`
- `governance/repository-structure-policy.md`

## Engineering

- `engineering/local-development.md`
- `engineering/testing.md`

## Planning

- `planning/open-decisions.md`
- `planning/next-iteration-plan.md`

## Operations

- `operations/runtime-ops-runbook.md`

## Update Rule

If the repo and the architecture narrative diverge:

- update stable docs when the behavior is already implemented and intentional
- record the difference in `docs/assumptions/` when the behavior is still transitional or disputed
- keep `overview.md`, `open-decisions.md`, and `.codex/context/` honest about what is live versus still planned
