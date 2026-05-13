# Next Steps

Last updated: 2026-05-13

## NOW

1. Continue from the verified runtime-layer baseline:
   - task:
     `.codex/tasks/PRJ-1195-runtime-layer-audit-and-polish-perception-fix.md`
   - audit:
     `docs/operations/aion-runtime-layer-audit-2026-05-13.md`
   - proof:
     focused pack `4 passed, 129 deselected`; full backend pytest
     `1093 passed`
   - next smallest slice:
     move to native mobile device proof or external provider activation.

2. Continue from the repaired production DB baseline:
   - latest memory task:
     `.codex/tasks/PRJ-1194-topic-scoped-memory-summary-buckets.md`
   - current verified baseline:
     Coolify production runs runtime memory with `RECENT_MEMORY_LIMIT=6`,
     `SEMANTIC_MEMORY_TOP_K=5`, OpenAI `text-embedding-3-small`, and pgvector
     dimensions `1536`
   - local code baseline:
     runtime query embeddings use the configured provider path, foreground
     vector retrieval includes `episodic`, and vector-matched episodes outside
     the recent temporal window enter the context bundle; PostgreSQL semantic
     vector ranking uses native pgvector distance ordering; vector relevance
     now survives context selection even when lexical overlap is absent;
     optional `relation` vector hits can rehydrate to revalidated relation
     records and merge into runtime relation state when `relation` is enabled;
     repeated recent memory topics now consolidate into semantic
     topic-scoped `memory_topic_summary` conclusions that are injected into
     context as long-term memory summaries
   - production proof:
     post-maintenance two-turn memory scenario answered `Roki`, persisted two
     episodes, and wrote two 1536-dimensional semantic embeddings; PRJ-1189
     non-temporal semantic proof on commit `d4d2911` answered `Roki` after
     15 filler episodes and retrieved original episode `id=4`; PRJ-1192
     production commit `f369556` enabled optional `relation` vector source,
     returned `VECTOR_RELATION_HITS 1` in a controlled repository proof, and
     passed release smoke with `release_ready=true`; PRJ-1194 production
     commit `c11377c` created separate `topic:dog` and `topic:deployment`
     long-term memory buckets, injected both into context, and cleaned
     synthetic rows to zero
   - next smallest slice:
     memory quality is verified for the current release path; plan an
     ANN/vector-index migration only if retrieval volume makes query latency
     require it

3. Capture native device proof for the deployed `v1.5` mobile UI:
   - branch: `codex/v15-mobile-ui-deploy-commits`
   - remote: `origin/codex/v15-mobile-ui-deploy-commits`
   - GitHub PR:
     `https://github.com/Wroblewski-Patryk/Aviary/pull/1`
   - production merge commit:
     `43837bb183c8975845b99b65a03cea5ccf4903a0`
   - PR creation URL:
     `https://github.com/Wroblewski-Patryk/Aviary/pull/new/codex/v15-mobile-ui-deploy-commits`
   - promotion handoff:
     `docs/operations/v15-mobile-ui-pr-and-production-promotion-handoff-2026-05-12.md`
   - local preview is intentionally stopped after validation cleanup; restart
     it with `Push-Location .\mobile; npm run deploy:ui-mobile-local` when
     another preview proof is needed
   - production is green for the merge commit and final cleanup commit;
     release smoke passed with runtime and web shell revisions matching
     `07b3b3e5fe3bd37439dd1cafbdc7fb15c4ef3a7b`
   - local conflict posture: `git merge-tree` showed no conflict output
     against `origin/main`
   - next smallest slice: install Android platform tools or connect a
     supported device, then run `npm run doctor:ui-mobile-device` and capture
     Expo Go/simulator proof

5. Continue `v1.5` native/mobile UI from the verified shell seed:
   - plan: `docs/planning/v1.5-mobile-ui-plan.md`
   - latest task: `.codex/tasks/PRJ-1182-v15-mobile-device-proof-doctor.md`
   - promotion handoff:
     `docs/operations/v15-mobile-ui-pr-and-production-promotion-handoff-2026-05-12.md`
   - handoff: `docs/operations/v15-mobile-ui-local-preview-handoff-2026-05-12.md`
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
     stopped after validation cleanup; use `npm run deploy:ui-mobile-local`
     to restart it on `http://127.0.0.1:8093`
   - local deploy:
     `Push-Location .\mobile; npm run deploy:ui-mobile-local`
   - git hygiene:
     generated preview/cache/log artifacts are ignored by `.gitignore`
   - native proof readiness:
     `Push-Location .\mobile; npm run doctor:ui-mobile-device; $exit=$LASTEXITCODE; Pop-Location; exit $exit`
     currently reports `status=blocked` because `adb` and `emulator` are
     unavailable
   - pushed branch:
     `origin/codex/v15-mobile-ui-deploy-commits`
   - PR creation URL:
     `https://github.com/Wroblewski-Patryk/Aviary/pull/new/codex/v15-mobile-ui-deploy-commits`

6. Preserve the completed `v1.1` web UI responsive quality baseline:
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

7. Keep `npm run audit:ui-responsive` in the web validation set for shell,
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
