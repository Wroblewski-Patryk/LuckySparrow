# Subagent Orchestration Workflow

## Objective

Standardize safe delegation and parallelization behavior for Personality / AION
work.

## Steps

1. Keep the critical-path implementation local and use
   `.codex/context/TASK_BOARD.md` as the source of truth.
2. Delegate only independent side tasks such as docs sync, isolated tests, or
   contained runtime slices.
3. Assign clear file ownership, expected output, and required checks to each
   subagent.
4. Continue local non-overlapping work while subagents run.
5. Integrate outputs, run the relevant validations, and sync project state if
   repo truth changed.

## Guardrails

- no overlapping write ownership
- no duplicate implementation effort
- no blocking wait loops without reason
- no delegation of unclear or under-specified tasks
- no drift between delegated work and task board status
