# Project Memory Index

Last updated: 2026-05-14

## Project Alias

The product name is Aviary. The repository folder is still `Personality`
because the folder has not been renamed yet. Agents must treat `Aviary` and
`Personality` as the same project in this workspace.

## Purpose

This file is the mandatory full-picture protocol for agents. It prevents the
project from drifting into repeated small fixes with no clear release progress.
Every non-trivial task must connect local code changes to the current product
state, architecture intent, module confidence, and the next release objective.

## Required Indexes

Agents must keep these indexes current enough that another Codex session can
continue from repository files alone:

- `.codex/context/PROJECT_STATE.md`: where Aviary is now, current phase,
  validation commands, deployment shape, and known runtime reality.
- `docs/operations/project-status-dashboard.md` and
  `docs/operations/project-status-dashboard.json`: generated project radar when
  available.
- `.codex/context/TASK_BOARD.md`: canonical task queue with `NOW`, `NEXT`,
  blockers, and done evidence.
- `.agents/state/module-confidence-ledger.md`: module-by-module confidence,
  working state, evidence, and next proof or fix.
- `.agents/state/system-health.md`: latest validation, broken journeys, stale
  checks, and environment state.
- `.agents/state/known-issues.md`: real unresolved defects, not vague concerns.
- `.agents/state/next-steps.md`: next executable tasks in priority order.
- `docs/architecture/`: current architecture truth.
- `docs/modules/`, `docs/pipelines/`, and route/component maps when present:
  implementation ownership and surface maps.
- `docs/planning/`: release plan and task sequencing.
- `docs/operations/`: release, deploy, smoke, rollback, and target-environment
  evidence. Current runtime-layer audit:
  `docs/operations/aion-runtime-layer-audit-2026-05-13.md`.

If one of these files is missing, empty, stale, or still template-like, rebuild
the minimum useful version from architecture docs, context files, accepted
feedback, code, tests, and planning notes before choosing implementation work.
Every inferred row must name its source and use a cautious status.

## Current High-Signal Entries

- `PRJ-1215` verified mobile Chat context rail readability: the horizontal
  cognitive belt keeps conversation-first rhythm while using tuned card width,
  body line clamp, scroll padding, and edge masking so the first card reads
  clearly and the next card feels like an intentional peek. Web build,
  responsive audit, navigation audit, and desktop/tablet/mobile Chat screenshot
  review passed.
- `PRJ-1214` verified Personality embodied-map polish: count-heavy callout
  values use UI typography, the Mind Layers timeline carries a compact
  `6 layers` context pill, and the mobile screenshot keeps a readable timeline
  heading instead of raw rows. Web build, responsive audit, navigation audit,
  and refreshed desktop/tablet/mobile Personality screenshot review passed.
- `PRJ-1213` verified the Settings destructive-action hierarchy: reset
  runtime data details are collapsed behind a native disclosure boundary by
  default, while confirmation and submit controls remain available after
  expansion. Web build, responsive audit, navigation audit, and refreshed
  desktop/tablet/mobile Settings screenshots passed.
- `AVIARY-COGNITIVE-RUNTIME-001` now includes `PRJ-1212`: AI reply generation
  uses a centralized, channel-aware `ResponseBudgetPolicy`. App/API chat gets
  a larger bounded generation budget than Telegram, concise remains lower
  cost, deep analysis can expand, and the prompt contract tells the model to
  complete answers cleanly instead of stopping mid-sentence, mid-list, or
  inside an unfinished code block. Telegram transport segmentation remains in
  delivery routing. Full backend pytest passed with `1105 passed`.
- `AVIARY-WEB-RESP-001` is the active web responsive confidence row for the
  mobile, tablet, and desktop web shell scope. As of `PRJ-1209`, shared shell
  navigation is `VERIFIED` with `npm run build`, `npm run audit:ui-responsive`,
  and `npm run audit:ui-navigation`. As of `PRJ-1211`, focused Chat response
  readability is also verified with expanded chat reply output budgets,
  markdown list-continuation coverage, refreshed desktop/tablet/mobile Chat
  screenshots, and the same responsive/navigation audit gates.
- `PRJ-1210` verified the Tools route as a clearer capability directory:
  readiness, next action, and user control now precede technical details while
  preserving the same API payload and controls.
- Route-local visual work should continue from concrete screenshot evidence
  rather than broad polish loops. Native app proof remains deferred by current
  scope.

## Architecture Refresh Protocol

When architecture, module boundaries, app flow, route ownership, data model,
runtime behavior, UX system, or deployment shape changes, the same mission must
refresh the relevant indexes before it can be called done.

Minimum refresh checklist:

1. Update the canonical architecture or ADR file that owns the decision.
2. Update module maps, pipeline maps, route maps, or API ownership docs when
   affected.
3. Update `.codex/context/PROJECT_STATE.md` if phase, stack, deploy shape,
   validation commands, or runtime reality changed.
4. Regenerate or update project-status dashboard artifacts when the readiness
   picture changes.
5. Update `.codex/context/TASK_BOARD.md` and `docs/planning/*` so the next
   queue reflects the new architecture.
6. Update `.agents/state/module-confidence-ledger.md` for every affected
   module.
7. Update `.agents/state/system-health.md` when validation, smoke, deploy, or
   runtime status changed.
8. Record unresolved mismatches in `.agents/state/known-issues.md`.

Architecture changes left only in chat, commit messages, or scattered planning
notes are not accepted as source of truth.

## Module Confidence Ledger Protocol

Use `.agents/state/module-confidence-ledger.md` as the fast answer to:

- Which modules exist?
- Which user journeys does each module own?
- Does it work in the real app?
- What evidence proves that?
- What is blocked, broken, stale, or unverified?
- What is the next smallest proof or fix?

Before selecting a new implementation mission, read the ledger and prefer work
in this order:

1. `BROKEN` or `FAIL` release-critical journeys.
2. `BLOCKED` release-critical journeys.
3. `IMPLEMENTED_NOT_VERIFIED` P0/P1 journeys.
4. `PARTIAL` journeys where evidence points to a real defect.
5. New features only after release-critical existing flows are stable or
   explicitly deferred.

Do not convert unknowns into features. First create a verification mission or
mission slice. Create a fix only when proof, code inspection, or a reproducible
user journey shows a real defect.

## Reality Language Rule

Agents must not report vague completion states such as "almost done", "close",
"should work", "looks good", or "probably fixed" without evidence.

Allowed completion language:

- `verified`: evidence exists and is recorded.
- `implemented, not verified`: code exists but proof is missing.
- `partially verified`: exact passing and missing scenarios are listed.
- `blocked`: exact blocker and next unblock action are listed.
- `failed`: fresh verification failed and the failure is recorded.

The user should not be the first tester of a core journey. If a task affects a
browser, mobile, API, auth, data, AI, memory, runtime behavior, or deployment
flow, the agent must run the relevant automated or manual journey proof where
local access allows it.

## Real Journey Proof

For user-facing work, validation must prove the real journey, not just that code
compiled. Examples:

- send an event through the real runtime path when event handling changed;
- verify memory, reflection, scheduler, or action side effects through the
  canonical API or worker path when those systems changed;
- navigate from the real browser shell entry point, not only direct route
  access;
- verify loading, empty, error, success, and blocked states when the action has
  those states;
- verify persistence after reload or service restart when data changes;
- verify mobile or responsive behavior when the surface is browser-facing;
- verify auth, ownership, and fail-closed behavior when data access matters.

If a journey cannot be exercised locally, record why, the residual risk, and the
next best proof. Do not mark the module as working.

## Mission-Based Task Selection

Every autonomous run must start by answering:

- Where is Aviary now?
- What is the final or current release objective?
- Which module or journey is the biggest blocker to that objective?
- What evidence do we already have?
- What mission would most increase release confidence?

Use `.agents/core/mission-control.md` to scope a multi-hour mission when one
coherent objective needs several slices. Small tasks are mission slices, not the
operating goal.

## Handoff Requirement

After substantial work, update the indexes and leave the next agent a clear
handoff:

- current objective;
- mission status;
- files and modules changed;
- evidence collected;
- module confidence changes;
- known broken or unverified journeys;
- next checkpoint or mission.
