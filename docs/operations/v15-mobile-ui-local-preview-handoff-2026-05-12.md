# V1.5 Mobile UI Local Preview Handoff

## Header

- Date: 2026-05-12
- Author role: Codex
- Related task IDs: `PRJ-1158` through `PRJ-1181`
- Current branch: `codex/v15-mobile-ui-deploy-commits`
- Current stage: release
- Operation mode: BUILDER

## Current Source Of Truth

- Product: `docs/planning/v1.5-mobile-ui-plan.md`
- Architecture: `docs/architecture/02_architecture.md`,
  `docs/architecture/15_runtime_flow.md`
- Planning: `.agents/state/next-steps.md`
- Task board: `.codex/context/TASK_BOARD.md`
- UX/design: `docs/ux/design-memory.md`,
  `docs/ux/screen-quality-checklist.md`
- Deployment/ops: this handoff, `.agents/state/system-health.md`
- User feedback: repeated request to keep working until UI is deployed

## What Changed

- Summary: v1.5 mobile UI is available as an Expo-managed thin-client seed
  with Home, Chat, Personality, Settings, and Tools routes.
- Files changed:
  - `mobile/app/*`
  - `mobile/src/ui/*`
  - `mobile/scripts/mobile-ui-audit.mjs`
  - `mobile/scripts/mobile-preview-smoke.mjs`
  - `mobile/scripts/serve-mobile-preview.mjs`
  - `mobile/package.json`
- Product behavior changed: mobile UI seed and local preview path added.
- Architecture changed: no. The mobile shell remains a thin client over
  backend-owned `/app/*` contracts.
- UX changed: yes. Mobile route hierarchy, shared primitives, state notices,
  route rail, and Stack header theme were added.
- Deployment changed: local-only preview deployment exists. Public hosting and
  native store deployment are not part of this handoff.

## How To Run

From the repository root:

```powershell
Push-Location .\mobile
npm run deploy:ui-mobile-local
```

Default preview URL:

```text
http://127.0.0.1:8093
```

Health endpoint:

```text
http://127.0.0.1:8093/__preview_health
```

Expected health payload includes:

```json
{
  "app": "aviary-mobile-ui-preview",
  "status": "ok",
  "route_count": 5
}
```

## How To Validate

```powershell
Push-Location .\mobile
npm run typecheck
npm run audit:ui-mobile
npm run smoke:ui-mobile-preview
Pop-Location
```

Expected current evidence:

- `npm run typecheck` -> pass
- `npm run audit:ui-mobile` -> `route_count=5`, `viewport_count=2`,
  `screenshot_count=10`, `action_proof_count=3`, `state_proof_count=4`,
  `failed_count=0`
- `npm run smoke:ui-mobile-preview` -> `preview_health.ok=true`,
  `route_count=5`, `viewport_count=2`, `screenshot_count=10`,
  `failed_count=0`

## Screenshots And Artifacts

- Repeatable audit report:
  `.codex/artifacts/prj1164-mobile-ui-audit/report.json`
- Running-preview smoke report:
  `.codex/artifacts/prj1177-mobile-ui-preview-smoke/report.json`
- Representative preview screenshots:
  `.codex/artifacts/prj1177-mobile-ui-preview-smoke/preview-home-phone-390x1200.png`
  `.codex/artifacts/prj1177-mobile-ui-preview-smoke/preview-chat-tablet-820x1180.png`
  `.codex/artifacts/prj1177-mobile-ui-preview-smoke/preview-tools-tablet-820x1180.png`

Generated preview/cache/log outputs are ignored by `.gitignore`:

- `.codex/tmp/`
- `artifacts/`
- `mobile/.expo-web-export/`
- `web/debug.log`

## Risks And Assumptions

- Residual risks:
  - Native Expo Go/simulator proof is not complete.
  - Native auth transport is not selected.
  - Live app-facing data wiring is not selected.
  - Public hosting is not selected.
- Assumptions made:
  - Local web-export preview is acceptable evidence for the UI seed and
    handoff, but not for production native readiness.
  - The current route rail remains the v1.5 navigation seed until device proof
    or a navigation decision changes it.
- Known blockers:
  - `adb` is unavailable in this environment.
  - `emulator` is unavailable in this environment.
- Open decisions:
  - Keep route rail or move to native tabs after device proof.
  - Select native auth transport before live app-facing data wiring.

## Next Tiny Task

- Recommended next task: capture Expo Go or simulator proof for Home, Chat,
  Personality, Settings, and Tools when Android tooling or a physical device
  is available.
- Why next: it is the only remaining proof gate before claiming native-device
  confidence for the v1.5 mobile UI seed.
- Suggested owner: Frontend Builder + QA/Test.
- Files or surfaces likely touched: proof artifacts and source-of-truth state
  files; no product code unless device proof finds a real defect.
- Validation to run:
  - Expo Go/simulator route walkthrough
  - `npm run typecheck`
  - `npm run audit:ui-mobile`
  - `npm run smoke:ui-mobile-preview`

## Resume Instructions

- Read first:
  - this handoff
  - `docs/planning/v1.5-mobile-ui-plan.md`
  - `.agents/state/next-steps.md`
  - `.agents/state/module-confidence-ledger.md`
- Do not touch:
  - native auth transport or live data wiring without a product decision.
  - public hosting/deployment automation without release scope selection.
- Watch out for:
  - mistaking local web-export proof for native-device proof.
  - deleting `mobile/.expo-web-export/` while a local preview process is meant
    to stay running.
- If blocked:
  - record the blocker in `.agents/state/known-issues.md` and keep the mobile
    module confidence row honest.
