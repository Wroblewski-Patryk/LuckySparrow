# Next Steps

Last updated: 2026-05-12

## NOW

1. Continue `v1.5` native/mobile UI from the verified shell seed:
   - plan: `docs/planning/v1.5-mobile-ui-plan.md`
   - latest task: `.codex/tasks/PRJ-1179-v15-mobile-local-deploy-command.md`
   - evidence:
     `.codex/artifacts/prj1158-mobile-native-shell/mobile-shell-390x1200-v2.png`
     `.codex/artifacts/prj1159-mobile-chat-route/mobile-chat-390x1200-v2.png`,
     `.codex/artifacts/prj1160-mobile-support-routes/`,
     `.codex/artifacts/prj1161-mobile-personality-route/`,
     `.codex/artifacts/prj1162-mobile-route-rail/`,
     `.codex/artifacts/prj1163-mobile-home-route-rail/`,
     and `.codex/artifacts/prj1164-mobile-ui-audit/report.json`
   - reusable validation:
     `Push-Location .\mobile; npm run audit:ui-mobile; $exit=$LASTEXITCODE; Pop-Location; exit $exit`
     now expects `route_count=5`, `viewport_count=2`, `screenshot_count=10`,
     `action_proof_count=3`, `state_proof_count=4`, and `failed_count=0`
   - deployed preview validation:
     `Push-Location .\mobile; npm run smoke:ui-mobile-preview; $exit=$LASTEXITCODE; Pop-Location; exit $exit`
     now expects `preview_health.ok=true`, `route_count=5`,
     `viewport_count=2`, `screenshot_count=10`, and `failed_count=0`
   - next smallest slice: capture Expo Go/simulator proof when Android tooling
     or a device is available.
   - local preview:
     `http://127.0.0.1:8093`
   - local deploy:
     `Push-Location .\mobile; npm run deploy:ui-mobile-local`

2. Preserve the completed `v1.1` web UI responsive quality baseline:
   - plan: `docs/planning/v1.1-web-ui-responsive-plan.md`
   - handoff task: `.codex/tasks/PRJ-1157-v11-web-ui-responsive-handoff.md`
   - evidence: `.codex/artifacts/prj1150-v11-ui-responsive-audit/report.json`
   `PRJ-1151` has closed dashboard mobile first-read compression and
   `PRJ-1152` has closed personality mobile balance, and `PRJ-1153` has closed
   tools tablet readability. `PRJ-1154` has closed tools mobile density.
   `PRJ-1155` has closed settings mobile density. `PRJ-1156` has closed
   dashboard lower mobile ranking. `PRJ-1157` has closed the v1.1 web
   responsive handoff. Next smallest slice: plan `v1.5` mobile from these
   learnings or start a new narrow UI polish item from explicit feedback.

3. Keep `npm run audit:ui-responsive` in the web validation set for shell,
   route layout, navigation, and responsive UI changes.

## Previous Architecture Queue

1. Select the next smallest stability or architecture-alignment slice from the
   generated project status dashboard. `PRJ-933` is done and aligned the
   architecture radar with the current v1 release boundary:
   - `docs/operations/project-status-dashboard.md`
   - `docs/operations/project-status-dashboard.json`
   Current phase is `architecture complete for selected scope with deferred
   extensions`. Selected-scope readiness is `11/11` rows (`100.0%`). There is
   no selected-scope blocker in the generated radar.

2. Keep the architecture implementation audit as the source matrix behind the
   dashboard:
   - `docs/operations/architecture-implementation-map-2026-05-10.csv`
   - `docs/operations/architecture-implementation-audit-2026-05-10.md`

## NEXT

1. Preserve the selected-scope architecture radar. Do not reopen deferred
   extension rows unless their trigger is present:
   - provider credentials and expanded organizer scope for `ARCH-CONNECTORS-001`
   - expanded proactive launch scope for `ARCH-PROACTIVE-001`
   - a newly selected release candidate for `ARCH-DEPLOY-AUTO-001`
   - explicit mobile product/release scope for `ARCH-MOBILE-001`
2. Use `docs/operations/v1-selected-scope-handoff-2026-05-11.md` as the
   concise handoff for the current achieved selected-scope posture.
2. Keep full backend pytest in the validation set after backend contract or
   action-loop changes that alter skill/tool metadata.
3. Keep the full web command pack in the validation set for route-shell,
   navigation, or authenticated-shell changes:
   `tsc -> vite build -> npm run smoke:routes`.
4. Preserve native exit codes in PowerShell command packs with
   `$exit=$LASTEXITCODE; Pop-Location; exit $exit`; `PRJ-930` proved
   `Push-Location; npm ...; Pop-Location` can mask a failed smoke.
5. For Windows sandbox `PermissionError` on pytest basetemp creation, record
   the sandboxed failure and rerun the same gate outside sandbox before
   treating it as an application regression.
6. Refresh the architecture implementation map after every meaningful
   architecture/evidence slice.
7. Refresh `docs/operations/project-status-dashboard.md` and
   `docs/operations/project-status-dashboard.json` after refreshing the map.

## LATER

1. Consider broader bounded action-loop extensions only after a concrete
   evidence-backed need appears.
2. Create a mobile implementation scope decision before counting mobile toward
   architecture completion.

## Selection Rules

- Pick one bounded mission objective for each autonomous iteration; use small
  checkpoint tasks inside that mission when useful.
- Prefer tasks that reduce blocker risk, regression risk, or unclear source of
  truth.
- Do not start new feature work when a P0/P1 regression or release blocker is
  unresolved.
- Keep this file synchronized with `.codex/context/TASK_BOARD.md` and
  `docs/planning/mvp-next-commits.md`.
