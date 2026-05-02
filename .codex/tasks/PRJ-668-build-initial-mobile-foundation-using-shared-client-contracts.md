# Task

## Header
- ID: PRJ-668
- Title: Build initial mobile foundation using shared client contracts
- Task Type: feature
- Current Stage: verification
- Status: DONE
- Owner: Frontend Builder
- Depends on: PRJ-667
- Priority: P1

## Context
The mobile stack and client-contract baseline are now frozen. The next slice
should create the first real mobile workspace foundation without introducing a
second domain model or bypassing backend-owned contracts.

## Goal
Build the first mobile workspace baseline using the approved Expo-managed stack
and the same backend-owned client resource model as `web`.

## Constraints
- use existing systems and approved mechanisms
- do not introduce new structures without approval
- do not implement workarounds
- do not duplicate logic
- do not move runtime logic into the mobile client

## Definition of Done
- [x] `mobile/` contains a real buildable app workspace baseline.
- [x] The mobile workspace records the same backend-owned app resource
  boundaries as `web`.
- [x] The first scaffold avoids internal debug surfaces and provider-secret UI.

## Forbidden
- new systems without approval
- duplicated logic or parallel implementations of the same contract
- temporary bypasses, hacks, or workaround-only paths
- architecture changes without explicit approval

## Validation Evidence
- Tests:
  - package JSON parse passed
  - app JSON parse passed
  - TypeScript source smoke check passed for shared contract endpoints
  - `git diff --check` passed
- Manual checks:
  - reviewed `docs/planning/mobile-client-baseline.md`
  - reviewed Expo SDK and Expo Router official docs for current SDK/router
    baseline
- Screenshots/logs: not run; dependencies were not installed in this slice
- High-risk checks:
  - avoid implying completed native auth transport if the scaffold only freezes
    the shared API boundary

## Architecture Evidence (required for architecture-impacting tasks)
- Architecture source reviewed: docs/architecture/16_agent_contracts.md; docs/architecture/26_env_and_config.md; docs/planning/mobile-client-baseline.md
- Fits approved architecture: yes
- Mismatch discovered: no
- Decision required from user: no
- Approval reference if architecture changed:
- Follow-up architecture doc updates: mobile local-dev and workspace docs after scaffold

## Review Checklist (mandatory)
- [x] Architecture alignment confirmed.
- [x] Existing systems were reused where applicable.
- [x] No workaround paths were introduced.
- [x] No logic duplication was introduced.
- [x] Definition of Done evidence is attached.
- [x] Relevant validations were run.
- [x] Docs or context were updated if repository truth changed.
- [x] Learning journal was updated if a recurring pitfall was confirmed.

## Notes
The first mobile scaffold should stay intentionally small:

- workspace config
- app shell
- shared API-boundary notes
- no product-domain reimplementation

## Scope

- `mobile/package.json`
- `mobile/app.json`
- `mobile/tsconfig.json`
- `mobile/expo-env.d.ts`
- `mobile/app/_layout.tsx`
- `mobile/app/index.tsx`
- `mobile/src/api/shared-client-contract.ts`
- `mobile/src/theme.ts`
- `mobile/README.md`
- `docs/planning/mobile-client-baseline.md`
- `docs/architecture/codebase-map.md`
- `docs/README.md`
- `.codex/context/TASK_BOARD.md`
- `.codex/context/PROJECT_STATE.md`

## Implementation Plan

1. Create the minimal Expo Router workspace files.
2. Add a small native shell screen that states the mobile boundary.
3. Add a typed shared contract list for backend-owned `/app/*` resources.
4. Update mobile and architecture docs.
5. Validate JSON, route files, contract coverage, and whitespace.

## Acceptance Criteria

- [x] Expo Router root route exists.
- [x] Shared app-facing endpoints from the mobile baseline are represented.
- [x] README explains commands and boundaries.
- [x] No internal/debug/provider-secret UI is introduced.

## Result Report

- Task summary: created the initial Expo-managed mobile workspace foundation
  with a thin shared-contract shell.
- Files changed:
  - `mobile/package.json`
  - `mobile/app.json`
  - `mobile/tsconfig.json`
  - `mobile/expo-env.d.ts`
  - `mobile/app/_layout.tsx`
  - `mobile/app/index.tsx`
  - `mobile/src/api/shared-client-contract.ts`
  - `mobile/src/theme.ts`
  - `mobile/README.md`
  - `docs/planning/mobile-client-baseline.md`
  - `docs/architecture/codebase-map.md`
  - `docs/README.md`
  - `.codex/context/TASK_BOARD.md`
  - `.codex/context/PROJECT_STATE.md`
- How tested: JSON parse, shared endpoint coverage smoke, and
  `git diff --check`.
- What is incomplete: dependencies were not installed; final native auth
  transport remains a later adapter decision.
- Next steps: choose the next current READY task after reviewing whether older
  visual-system tasks are still active.
