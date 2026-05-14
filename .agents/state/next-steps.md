# Next Steps

Last updated: 2026-05-14

## NOW

1. Continue from the Chat mobile context-rail checkpoint:
   - task:
     `.codex/tasks/PRJ-1215-chat-mobile-context-rail-readability.md`
   - result:
     mobile Chat keeps the horizontal cognitive context rail while making the
     first card readable and the next card an intentional peek
   - proof:
     `npm run build` PASS; `npm run audit:ui-responsive` PASS with
     `route_count=14`, `viewport_count=3`, `screenshot_count=18`,
     `failed_count=0`; `npm run audit:ui-navigation` PASS with `status=ok`,
     `step_count=4`, `failed_count=0`; refreshed desktop/tablet/mobile Chat
     screenshots reviewed; cleanup confirmed no validation leftovers
   - residual:
     broader Chat v5 desktop/tablet composition and richer composer state
     design remain outside this focused mobile rail slice
   - next smallest slice:
     choose the next route-local polish only from concrete screenshot evidence
     so the UI mission does not turn into unbounded churn

1. Continue from the Personality embodied-map checkpoint:
   - task:
     `.codex/tasks/PRJ-1214-personality-embodied-map-polish.md`
   - result:
     Personality count-heavy callout values now read as UI data, and the
     mobile Mind Layers timeline keeps compact visible context before the rows
   - proof:
     `npm run build` PASS; `npm run audit:ui-responsive` PASS with
     `route_count=14`, `viewport_count=3`, `screenshot_count=18`,
     `failed_count=0`; `npm run audit:ui-navigation` PASS with `status=ok`,
     `step_count=4`, `failed_count=0`; refreshed desktop/tablet/mobile
     Personality screenshots reviewed; cleanup confirmed no validation
     leftovers
   - residual:
     broader Chat v5 composition and deeper Personality state coverage remain
     outside this focused route-local polish
   - next smallest slice:
     continue Chat v5 composition polish, or continue Personality state
     coverage only if screenshot review identifies a concrete gap

1. Continue from the Settings danger-boundary checkpoint:
   - task:
     `.codex/tasks/PRJ-1213-settings-danger-boundary-polish.md`
   - result:
     Settings reset runtime data now uses a native disclosure boundary, so
     destructive reset details are accessible but collapsed by default and safe
     daily preferences dominate the first read
   - proof:
     `npm run build` PASS; `npm run audit:ui-responsive` PASS with
     `route_count=14`, `viewport_count=3`, `screenshot_count=18`,
     `failed_count=0`; `npm run audit:ui-navigation` PASS with `status=ok`,
     `step_count=4`, `failed_count=0`; refreshed desktop/tablet/mobile
     Settings screenshots reviewed
   - residual:
     reset API, auth, session, persistence, and backend behavior were outside
     this presentational safety-boundary slice
   - next smallest slice:
     continue route-local Chat v5 composition polish or Personality route
     polish while keeping responsive/navigation audits green

1. Continue from the channel-aware AI response budget checkpoint:
   - task:
     `.codex/tasks/PRJ-1212-channel-aware-ai-response-budget-policy.md`
   - result:
     `ResponseBudgetPolicy` now owns app/API chat, Telegram, concise,
     structured, and deep generation budgets; expression passes the resolved
     channel into OpenAI reply generation; and prompts instruct the model to
     finish cleanly rather than stopping mid-sentence, mid-list, or inside
     unfinished code blocks
   - proof:
     response-budget/client/prompt pack PASS with `14 passed`;
     expression/client/prompt/budget/delivery pack PASS with `53 passed`;
     runtime channel pack PASS with `3 passed, 112 deselected`; graph/API
     focused rerun PASS with `6 passed`; full backend pytest PASS with
     `1105 passed`
   - residual:
     live token-spend and latency telemetry were not added in this slice
   - next smallest slice:
     monitor real answer quality/cost, then extend `ResponseBudgetPolicy`
     only if a long-form product mode or telemetry need appears; otherwise
     continue route-local Chat v5, Personality, or Settings polish

2. Continue from the Chat response readability and desktop height checkpoint:
   - task:
     `.codex/tasks/PRJ-1211-chat-response-readability-and-height.md`
   - result:
     Chat reply generation has expanded output budgets, markdown list
     continuation stays inside numbered/bulleted items, and desktop Chat has
     a viewport-bound stage with internal transcript scrolling
   - proof:
     `tests/test_openai_client.py` PASS with `7 passed`; `npm run
     test:chat-markdown` PASS with `case_count=7`; `node --check
     scripts/route-smoke.mjs` PASS; `npm run build` PASS; `npm run
     audit:ui-responsive` PASS with `route_count=14`, `viewport_count=3`,
     `screenshot_count=18`, `failed_count=0`; `npm run audit:ui-navigation`
     PASS with `status=ok`, `step_count=4`, `failed_count=0`; refreshed
     desktop/tablet/mobile Chat screenshots reviewed
   - residual:
     broader Chat v5 route composition polish remains open; Browser preview
     without route-smoke mock auth redirects `/chat` to `/login`, so
     mock-authenticated route-smoke remains the authenticated screenshot proof
     path
   - next smallest slice:
     continue route-local Chat v5 composition polish or move to Personality or
     Settings route-local polish while keeping responsive/navigation audits
     green

3. Continue from the Tools route UX clarity checkpoint:
   - task:
     `.codex/tasks/PRJ-1210-tools-route-ux-clarity.md`
   - result:
     Tools cards now foreground readiness, availability, link state, provider
     posture, next action, and user control before technical details; single
     item groups span the directory width on desktop/tablet
   - proof:
     `npm run build` PASS; `npm run audit:ui-responsive` PASS with
     `route_count=14`, `viewport_count=3`, `screenshot_count=18`,
     `failed_count=0`; `npm run audit:ui-navigation` PASS with `status=ok`,
     `step_count=4`, `failed_count=0`; refreshed desktop/tablet/mobile Tools
     screenshots reviewed; cleanup confirmed no active `chrome_headless_shell`,
     no validation Node processes, and no listener on `5173`; `git diff
     --check` passed with LF/CRLF warnings only
   - residual:
     deeper Tools art direction and connector-specific states can improve when
     provider scope expands
   - next smallest slice:
     continue Settings confidence polish, Personality route-local polish, or
     broader Chat v5 composition work

4. Continue from the shared shell navigation proof checkpoint:
   - task:
     `.codex/tasks/PRJ-1209-shared-shell-navigation-proof-and-tablet.md`
   - result:
     mobile shell navigation has repeatable mock-authenticated interaction
     proof, and the tablet route switcher now uses the shared icon+label rail
     instead of older text pills
   - proof:
     `node --check scripts/route-smoke.mjs` PASS; `npm run build` PASS;
     `npm run audit:ui-responsive` PASS with `route_count=14`,
     `viewport_count=3`, `screenshot_count=18`, `failed_count=0`; `npm run
     audit:ui-navigation` PASS with `status=ok`, `step_count=4`,
     `failed_count=0`; desktop/tablet/mobile Dashboard screenshots reviewed;
     cleanup confirmed no active `chrome_headless_shell` and no listener on
     `5173`; `git diff --check` passed with LF/CRLF warnings only
   - residual:
     Browser plugin remains unavailable in this local runtime because of
     missing kernel assets, but the route-smoke Playwright proof now covers the
     interaction gap
   - next smallest slice:
     continue route-local layout passes for Personality, Settings, Tools, and
     deeper Chat v5 convergence

3. Continue from the Personality mobile nav-clearance checkpoint:
   - task:
     `.codex/tasks/PRJ-1207-personality-mobile-nav-clearance.md`
   - result:
     mobile Personality now leaves route-local clearance between the portrait
     hero and Mind Layers timeline so the fixed tabbar does not cover timeline
     rows in the audited first-read
   - proof:
     `npm run build` PASS; `npm run audit:ui-responsive` PASS with
     `route_count=14`, `viewport_count=3`, `screenshot_count=18`,
     `failed_count=0`; refreshed mobile Personality screenshot reviewed;
     cleanup confirmed no active `chrome_headless_shell` and no listener on
     `5173`; `git diff --check` passed with LF/CRLF warnings only
   - next smallest slice:
     continue Personality content hierarchy/side-panel polish, Settings/Tools
     responsive polish, or deeper Chat v5 layout/composer/transcript
     convergence

4. Continue from the Chat mobile first-read compression checkpoint:
   - task:
     `.codex/tasks/PRJ-1206-chat-mobile-first-read-compression.md`
   - result:
     mobile Chat context cards now use a horizontal rail, so conversation and
     composer content appear sooner while context remains accessible
   - proof:
     `npm run build` PASS; `npm run audit:ui-responsive` PASS with
     `route_count=14`, `viewport_count=3`, `screenshot_count=18`,
     `failed_count=0`; refreshed mobile Chat screenshot reviewed; cleanup
     confirmed no active `chrome_headless_shell` and no listener on `5173`;
     `git diff --check` passed with LF/CRLF warnings only
   - next smallest slice:
     continue with deeper chat v5 desktop/tablet layout, transcript, and
     composer canonical polish or move to personality route-local polish

5. Continue from the Chat brand-copy alignment checkpoint:
   - task:
     `.codex/tasks/PRJ-1205-chat-brand-copy-alignment.md`
   - result:
     chat assistant label, composer safety note, and shared sidebar quote
     signature now align with the Aviary product shell
   - proof:
     `npm run build` PASS; `npm run audit:ui-responsive` PASS with
     `route_count=14`, `viewport_count=3`, `screenshot_count=18`,
     `failed_count=0`; refreshed desktop chat screenshot reviewed; cleanup
     confirmed no active `chrome_headless_shell` and no listener on `5173`;
     `git diff --check` passed with LF/CRLF warnings only
   - next smallest slice:
     continue with chat v5 layout/composer/transcript canonical polish or
     personality route-local polish

6. Continue from the dashboard canonical content-rhythm checkpoint:
   - task:
     `.codex/tasks/PRJ-1204-dashboard-canonical-content-rhythm.md`
   - result:
     dashboard first-read hierarchy is calmer: desktop greeting is less
     cramped, guidance rows preserve readable copy with aligned actions, and
     recent activity rows now have visual tokens
   - proof:
     `npm run build` PASS; `npm run audit:ui-responsive` PASS with
     `route_count=14`, `viewport_count=3`, `screenshot_count=18`,
     `failed_count=0`; refreshed desktop dashboard screenshot reviewed;
     cleanup confirmed no active `chrome_headless_shell` and no listener on
     `5173`; `git diff --check` passed with LF/CRLF warnings only
   - next smallest slice:
     continue route-local web polish with chat canonical convergence or a
     deeper final dashboard tableau pass before moving to personality

7. Continue from the dashboard CTA navigation checkpoint:
   - task:
     `.codex/tasks/PRJ-1203-dashboard-cta-navigation-polish.md`
   - result:
     dashboard action controls now route to existing product surfaces rather
     than behaving like decorative buttons
   - proof:
     `npm run build` PASS; `npm run audit:ui-responsive` PASS with
     `route_count=14`, `viewport_count=3`, `screenshot_count=18`,
     `failed_count=0`; Playwright fallback clicked 10 dashboard CTAs and
     verified `/chat`, `/goals`, `/reflections`, `/memory`, and `/insights`;
     cleanup confirmed no active `chrome_headless_shell` and no listener on
     `5173`; `git diff --check` passed with LF/CRLF warnings only
   - next smallest slice:
     continue dashboard content canonical convergence against
     `docs/ux/assets/aion-dashboard-canonical-reference-v2.png` and
     `docs/ux/assets/aviary-dashboard-hero-canonical-reference-v4.png`

8. Continue from the authenticated shared-shell polish checkpoint:
   - task:
     `.codex/tasks/PRJ-1202-authenticated-shell-mobile-polish.md`
   - result:
     logged-in mobile/tablet chrome no longer shows technical build copy in
     the first viewport, and the fixed mobile tabbar now uses calmer Aviary
     material styling with a teal active state
   - proof:
     `npm run build` PASS; `npm run audit:ui-responsive` PASS with
     `route_count=14`, `viewport_count=3`, `screenshot_count=18`,
     `failed_count=0`; cleanup confirmed no active `chrome_headless_shell`
     and no listener on `5173`; `git diff --check` passed with LF/CRLF
     warnings only
   - next smallest slice:
     start dashboard content canonical convergence against
     `docs/ux/assets/aion-dashboard-canonical-reference-v2.png` and
     `docs/ux/assets/aviary-dashboard-hero-canonical-reference-v4.png`

9. Continue from the public Home canonical polish checkpoint:
   - task:
     `.codex/tasks/PRJ-1201-public-home-canonical-polish.md`
   - result:
     Home now reads more like a full-width canonical landing surface; the
     presentation-only tag and nested-window framing are gone, public nav uses
     real anchors, auth placeholders are localized, and the visible wordmark is
     aligned with Aviary
   - proof:
     `npm run build` PASS; `npm run audit:ui-responsive` PASS with
     `route_count=14`, `viewport_count=3`, `screenshot_count=18`,
     `failed_count=0`; Playwright fallback browser proof verified
     CTA -> register modal, localized placeholders, nav hrefs, and
     `unnamedButtons=0`
   - next smallest slice:
     decide whether to continue public landing parity with richer proof/social
     rhythm and section depth, or move to the authenticated shell/dashboard
     canonical convergence lane

10. Continue from the active web responsive breakpoint scope:
   - task:
     `.codex/tasks/PRJ-1200-rescope-to-web-responsive-breakpoints.md`
   - result:
     current UI scope is web across mobile, tablet, and desktop breakpoints;
     native app proof is deferred unless explicitly reactivated
   - proof:
     architecture dashboard refresh returned `DEFERRED:4`, `READY:11`,
     selected-scope readiness `11/11`; `npm run build` and
     `npm run audit:ui-responsive` passed with `route_count=14`,
     `viewport_count=3`, `screenshot_count=18`, and `failed_count=0`
   - next smallest slice:
     inspect or polish the web screenshots only from explicit visual feedback;
     otherwise keep `npm run audit:ui-responsive` as the active UI gate

11. Preserve the hardened native mobile proof doctor as deferred evidence:
   - task:
     `.codex/tasks/PRJ-1199-harden-mobile-device-proof-doctor.md`
   - result:
     `npm run doctor:ui-mobile-device` now reports Android SDK env checks,
     default SDK path existence, checked tool candidates, proof readiness, and
     concrete next actions
   - current blocker:
     local native proof remains blocked because `adb`, `emulator`,
     `ANDROID_HOME`, `ANDROID_SDK_ROOT`, and the default Windows Android SDK
     path are unavailable
   - next smallest slice:
     do not pursue native proof unless native app scope is reactivated

12. Continue from the cleaned tools overview baseline:
   - task:
     `.codex/tasks/PRJ-1197-remove-tools-roadmap-placeholders.md`
   - result:
     `/app/tools/overview` no longer lists future-only Trello or Nest
     placeholder entries; active tools are limited to implemented
     runtime/API/configuration contracts
   - proof:
     focused tools-overview API pack `3 passed, 129 deselected`; web
     TypeScript project build passed; production-code placeholder scan found
     no remaining `planned_placeholder` active-path matches
   - next smallest slice:
     keep external provider activation under `ARCH-CONNECTORS-001` and only
     add future providers after their bounded runtime contracts exist

13. Keep the refreshed architecture dashboard baseline current:
   - task:
     `.codex/tasks/PRJ-1198-refresh-mobile-architecture-dashboard-truth.md`
   - result:
     generated architecture dashboard now treats `ARCH-MOBILE-001` as
     `IMPLEMENTED_NOT_VERIFIED` instead of an untouched deferred future
     scaffold
   - proof:
     audit/dashboard refresh wrote `DEFERRED:3`,
     `IMPLEMENTED_NOT_VERIFIED:1`, `READY:11`; selected-scope readiness is
     `11/12`; generator scripts compile
   - next smallest slice:
     keep `ARCH-MOBILE-001` deferred while current UI scope remains web
     breakpoints

14. Continue from the verified runtime-layer baseline:
   - task:
     `.codex/tasks/PRJ-1195-runtime-layer-audit-and-polish-perception-fix.md`
   - audit:
     `docs/operations/aion-runtime-layer-audit-2026-05-13.md`
   - proof:
     focused pack `4 passed, 129 deselected`; full backend pytest
     `1093 passed`
   - next smallest slice:
     move to native mobile device proof or external provider activation.

15. Continue from the repaired production DB baseline:
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

7. Native app proof parking lot:
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
   - next smallest slice: deferred unless native app scope is reactivated

8. Native app groundwork archive:
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
