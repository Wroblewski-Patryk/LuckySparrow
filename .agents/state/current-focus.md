# Current Focus

Last updated: 2026-05-14

## Active Focus

The latest completed UI slice is `PRJ-1213`: Settings destructive runtime
reset details now sit behind a native progressive-disclosure boundary. The
safe account, interface, time, language, proactive follow-up, and save settings
remain the first-read hierarchy, while reset impact copy, confirmation input,
hint, and submit controls remain available after expansion. No API, auth,
backend, persistence, route contract, deployment, or reset behavior changed.
Validation passed with `npm run build`, `npm run audit:ui-responsive`
(`route_count=14`, `viewport_count=3`, `screenshot_count=18`,
`failed_count=0`), and `npm run audit:ui-navigation` (`status=ok`,
`step_count=4`, `failed_count=0`). Refreshed desktop/tablet/mobile Settings
screenshots were reviewed.

The latest completed runtime slice is `PRJ-1212`: channel-aware AI response
budget policy is verified. Reply generation now uses `ResponseBudgetPolicy`
instead of OpenAI client magic numbers, with separate bounded budgets for
app/API chat, Telegram, concise, structured, and deep turns. Expression passes
the resolved channel into provider-backed reply generation, and the OpenAI
reply prompt includes a completion contract to avoid stopping mid-sentence,
mid-list, or inside unfinished code blocks. Telegram delivery segmentation
remains delivery-router-owned. Validation passed with focused budget/client/
prompt tests (`14 passed`), expression/client/prompt/budget/delivery tests
(`53 passed`), runtime channel tests (`3 passed, 112 deselected`), graph/API
focused rerun (`6 passed`), and full backend pytest (`1105 passed`).

The latest completed UI/runtime slice is `PRJ-1211`: focused Chat response
readability and desktop height polish are verified. Chat OpenAI replies now
use expanded output budgets (`900` default, `420` concise) instead of the old
tiny `220/120` caps, chat markdown preserves indented list continuation lines
inside the same item, and desktop Chat now bounds the stage to the viewport so
the transcript scrolls internally while the portrait panel stays page-height
bounded. Route-smoke now includes a longer numbered Chat answer for visual
proof and exits explicitly after server shutdown. Validation passed with
`tests/test_openai_client.py` (`7 passed`), `npm run test:chat-markdown`
(`case_count=7`), `node --check scripts/route-smoke.mjs`, `npm run build`,
`npm run audit:ui-responsive` (`route_count=14`, `viewport_count=3`,
`screenshot_count=18`, `failed_count=0`), and `npm run audit:ui-navigation`
(`status=ok`, `step_count=4`, `failed_count=0`). Refreshed desktop/tablet/mobile
Chat screenshots were reviewed. Cleanup found no `5173` listener and no active
`route-smoke.mjs` process after cleanup; Windows still reported a few stale
`chrome-headless-shell` table entries as no running task after termination
attempts.

Previous UI slice `PRJ-1210`: Tools route UX clarity is verified. Tool cards
now foreground readiness, availability, link state, provider posture, next
action, and user control before technical details, and single-item tool groups
span the directory width instead of leaving desktop dead space. Validation
passed with `npm run build`, `npm run audit:ui-responsive`
(`route_count=14`, `viewport_count=3`, `screenshot_count=18`,
`failed_count=0`), `npm run audit:ui-navigation` (`status=ok`,
`step_count=4`, `failed_count=0`), desktop/tablet/mobile Tools screenshot
review, cleanup found no active `chrome_headless_shell`, no validation Node
processes, and no `5173` listener, and `git diff --check` passed with LF/CRLF
warnings only.

The latest completed UI slice is `PRJ-1209`: shared shell navigation is now
verified by behavior, not only screenshots. The route-smoke harness has
`npm run audit:ui-navigation`, which clicks mobile shell navigation buttons
and verifies target route markers for Chat, Settings, Personality, and
Dashboard. Tablet route switching now uses the same shared icon+label route
item model as the desktop sidebar and mobile rail. Validation passed with
`node --check scripts/route-smoke.mjs`, `npm run build`, `npm run
audit:ui-responsive` (`route_count=14`, `viewport_count=3`,
`screenshot_count=18`, `failed_count=0`), `npm run audit:ui-navigation`
(`status=ok`, `step_count=4`, `failed_count=0`), desktop/tablet/mobile
Dashboard screenshot review, cleanup found no active `chrome_headless_shell`
process or `5173` listener, and `git diff --check` passed with LF/CRLF
warnings only. Browser plugin setup remains unavailable in this local runtime
because of missing kernel assets, but the mock-authenticated Playwright
route-smoke proof now covers the shared navigation interaction gap.

Previous UI slice `PRJ-1208`: shared shell navigation now feels more
intentional before deeper route-local layout work. The desktop sidebar is
lighter and narrower, and mobile navigation moved from a fixed bottom overlay
into the mobile header flow as a compact icon rail with short localized
labels. Validation passed with `npm run build`, `npm run audit:ui-responsive`
(`route_count=14`, `viewport_count=3`, `screenshot_count=18`,
`failed_count=0`), refreshed desktop Dashboard plus mobile Dashboard and Chat
screenshot review, cleanup found no active `chrome_headless_shell` process or
`5173` listener, and `git diff --check` passed with LF/CRLF warnings only.

Previous UI slice `PRJ-1207`: mobile Personality now keeps the
Mind Layers timeline clear of the fixed mobile tabbar by adding route-local
clearance between the portrait hero and timeline panel. Validation passed with
`npm run build`, `npm run audit:ui-responsive` (`route_count=14`,
`viewport_count=3`, `screenshot_count=18`, `failed_count=0`), refreshed mobile
Personality screenshot review, cleanup found no active `chrome_headless_shell`
process or `5173` listener, and `git diff --check` passed with LF/CRLF
warnings only.

Previous UI slice `PRJ-1206`: mobile Chat now uses a
horizontally scrollable cognitive context rail so the transcript and composer
appear sooner in the first mobile read while all context cards remain
available. Validation passed with `npm run build`, `npm run
audit:ui-responsive` (`route_count=14`, `viewport_count=3`,
`screenshot_count=18`, `failed_count=0`), refreshed mobile Chat screenshot
review, cleanup found no active `chrome_headless_shell` process or `5173`
listener, and `git diff --check` passed with LF/CRLF warnings only.

Previous UI slice `PRJ-1205`: visible Chat and shared sidebar brand copy now
align with Aviary. The chat assistant speaker label and composer safety note
use localized Aviary copy, and the shared sidebar quote signature no longer
shows the legacy AION label. Validation passed with
`npm run build`, `npm run audit:ui-responsive` (`route_count=14`,
`viewport_count=3`, `screenshot_count=18`, `failed_count=0`), refreshed
desktop chat screenshot review, cleanup found no active `chrome_headless_shell`
process or `5173` listener, and `git diff --check` passed with LF/CRLF
warnings only.

Previous UI slice `PRJ-1204`: dashboard content rhythm is closer to the
canonical dashboard direction. The desktop greeting no longer wraps
artificially, guidance rows preserve readable copy with aligned actions, and
recent activity rows now have visual tokens.

Previous UI slice `PRJ-1203`: dashboard CTA affordances now route to existing
application surfaces instead of behaving like decorative buttons. Playwright
fallback browser proof clicked 10 dashboard CTAs with correct navigation to
`/chat`, `/goals`, `/reflections`, `/memory`, and `/insights`.

Previous UI slice `PRJ-1202`: the shared authenticated mobile/tablet shell now
removes technical build copy from the first viewport and uses calmer Aviary
material styling for the fixed mobile tabbar while preserving the existing
horizontally scrollable route model. The next UI checkpoint should move from
dashboard behavior to dashboard content canonical convergence.

Previous UI slice `PRJ-1201`: public Home now follows the canonical landing
direction more closely by removing the visible presentation-only `Landing Page`
tag, dropping the large nested-window framing, preserving the canonical
landing raster hero, using real public-nav anchors, localizing auth modal
placeholders, and aligning the visible wordmark with the Aviary product-name
source of truth.

`PRJ-1186` temporarily superseded the mobile continuation lane for a P0
runtime-memory confidence closure. The current AION memory flow is now
verified for the minimal end-to-end behavior: completed event write, later
recent-memory retrieval, context compression, expression influence, and next
episode write. Runtime defaults are `RECENT_MEMORY_LIMIT=6`,
`RECENT_MESSAGE_LIMIT=12`, `SEMANTIC_MEMORY_TOP_K=5`, and
`CONTEXT_TOKEN_BUDGET=2500`; full backend pytest passed with `1076 passed`.
Provider-backed pgvector/OpenAI semantic recall proof remains a future
environment-dependent follow-up.

The active UI continuation is now the web app across three responsive
breakpoints: mobile web, tablet web, and desktop. The native app lane is
deferred by the user's 2026-05-14 scope clarification; preserved native-app
groundwork must not drive next work unless that scope is reactivated.

Historical native/mobile app groundwork remains recorded. `PRJ-1158` seeds the Expo-managed mobile home shell,
`PRJ-1159` adds a focused native chat route, `PRJ-1160` adds native settings
and tools support routes, `PRJ-1161` adds the native personality route, and
`PRJ-1162` adds a shared mobile route rail as thin clients over backend-owned
`/app/*` contracts. `PRJ-1163` extends that shared rail to Home so the seeded
mobile route set now has one consistent top-level navigation pattern.
`PRJ-1164` adds `npm run audit:ui-mobile` so the mobile route screenshot and
route-text proof is repeatable for future UI changes. `PRJ-1165` expands that
audit from phone-only proof to phone plus tablet proof. `PRJ-1166` adds a
shared `ScreenScrollView` so seeded route screens share centered tablet-width
behavior. `PRJ-1167` adds a shared `ScreenHero` for standard subroute headers.
`PRJ-1168` adds a shared `MetricCard` for standard route fact cards.
`PRJ-1169` adds a shared `InfoRow` for standard route list rows. `PRJ-1170`
adds a shared `SegmentedControl` for Home and Chat mode selectors. `PRJ-1171`
adds a shared `ActionButton` for seeded mobile CTAs. `PRJ-1172` extends the
repeatable mobile UI audit with CTA DOM proof. `PRJ-1173` adds a shared
`SectionHeader` for repeated panel headers. `PRJ-1174` adds explicit loading,
empty, error, and success state coverage to the mobile seed. `PRJ-1175` aligns
the native Stack header with mobile tokens and caches audit DOM proof.
`PRJ-1176` adds a local static preview deployment for the verified mobile UI
at `http://127.0.0.1:8093`. `PRJ-1177` adds all-route smoke proof for that
running preview across Home, Chat, Personality, Settings, and Tools.
`PRJ-1178` adds preview identity health gating, `PRJ-1179` adds the
one-command local deploy path, `PRJ-1180` ignores generated local deploy
artifacts, and `PRJ-1181` adds the operations handoff:
`docs/operations/v15-mobile-ui-local-preview-handoff-2026-05-12.md`.

Previous web milestone:

`v1.1` was the active web UI milestone after the selected-scope v1 handoff.
The first responsive baseline (`PRJ-1150`) is verified for selected public and
authenticated web surfaces across desktop, tablet, and mobile web. The first
route-level polish slices are also verified: `PRJ-1151` for dashboard mobile
first-read compression, `PRJ-1152` for personality mobile balance, and
`PRJ-1153`/`PRJ-1154` for tools tablet readability and mobile density.
`PRJ-1155` is also verified for settings mobile density. `PRJ-1156` is
verified for dashboard lower mobile ranking. `PRJ-1157` closes the v1.1 web UI
responsive handoff for the selected web scope.

Current v1.1 evidence:

- plan: `docs/planning/v1.1-web-ui-responsive-plan.md`
- tasks:
  - `.codex/tasks/PRJ-1150-v11-web-ui-responsive-baseline.md`
  - `.codex/tasks/PRJ-1151-v11-dashboard-mobile-compression.md`
  - `.codex/tasks/PRJ-1152-v11-personality-mobile-balance.md`
  - `.codex/tasks/PRJ-1153-v11-tools-tablet-readability.md`
  - `.codex/tasks/PRJ-1154-v11-tools-mobile-density.md`
  - `.codex/tasks/PRJ-1155-v11-settings-mobile-density.md`
  - `.codex/tasks/PRJ-1156-v11-dashboard-lower-mobile-ranking.md`
  - `.codex/tasks/PRJ-1157-v11-web-ui-responsive-handoff.md`
- report: `.codex/artifacts/prj1150-v11-ui-responsive-audit/report.json`
- screenshots: `.codex/artifacts/prj1150-v11-ui-responsive-audit/`
- validation:
  `Push-Location .\web; npm run build; if ($LASTEXITCODE -eq 0) { npm run audit:ui-responsive }; $exit=$LASTEXITCODE; Pop-Location; exit $exit`
  -> PASS, `ui_audit.status=ok`, `failed_count=0`,
  `screenshot_count=18`

Next focus: keep the web responsive route audit green for mobile, tablet, and
desktop breakpoints. Native app proof is deferred unless explicitly reactivated.

## Previous Architecture Focus

Continue architecture implementation from the generated project status
dashboard instead of hidden chat memory. The latest completed slice
(`PRJ-933`) aligned the architecture radar with the current v1 release
boundary.

Current generated status:

- phase: `architecture complete for selected scope with deferred extensions`
- selected-scope readiness: `11/11` rows (`100.0%`)
- all-scope readiness: `11/15` rows (`73.3%`)
- top blocker: none for the selected core/web-supported scope
- deferred extensions/follow-ups: `ARCH-CONNECTORS-001`,
  `ARCH-PROACTIVE-001`, `ARCH-DEPLOY-AUTO-001`, `ARCH-MOBILE-001`

## Current System Objective

Make skill, tool, and action-loop truth inspectable before adding any deeper
execute-observe-adjust behavior. Skills remain metadata-only; action remains
the only owner of provider calls and side effects.

## Current Delivery Stage

`PRJ-933` is DONE as an ARCHITECT release-boundary sync slice after `PRJ-932`.
The bounded action-loop lane now has source-of-truth coverage for action-owned
observations, website-review search-first page reads, ClickUp read-only triage,
confirmation-gated ClickUp mutation, the app-facing confirmation handoff
invariants, persisted server-side pending-confirmation evidence, a fail-closed
app confirmation submission route, a replay-safe typed connector snapshot,
confirmed replay through `ActionExecutor.execute`, and first-party app chat
controls that submit the server-projected pending payload. The frontend
confirmation source contract is characterized, `ChatComposerShell` has React
server-rendered markup coverage for pending, submitting, success, and
fail-closed error states, and the built app now has real-browser interaction
coverage for pending confirmation, fail-closed retry, exact payload submission,
and success cleanup. Broad route-shell browser smoke is green for all current
public and authenticated web routes with route markers, non-empty body text, no
framework overlays, and zero visible unnamed interactive controls. Full backend
pytest most recently passed with `1074 passed` in `PRJ-925` after the new
`ActionResult.action_loop` summary.

The current architecture-completion radar and status dashboard are:

- `docs/operations/architecture-implementation-map-2026-05-10.csv`
- `docs/operations/architecture-implementation-audit-2026-05-10.md`
- `docs/operations/project-status-dashboard.md`
- `docs/operations/project-status-dashboard.json`
- refresh command:
  `Push-Location .\backend; ..\.venv\Scripts\python .\scripts\audit_architecture_implementation_map.py; if ($LASTEXITCODE -eq 0) { ..\.venv\Scripts\python .\scripts\generate_project_status_dashboard.py }; $exit=$LASTEXITCODE; Pop-Location; exit $exit`

Do not select future work ad hoc when a relevant audit row exists. The current
dashboard has no selected-scope blocker or evidence gap. Extension rows should
restart only when credentials, launch-scope expansion, a new release candidate,
or mobile product scope are explicitly available.

## Current Priority Order

1. Stability
2. Architecture alignment
3. No regressions
4. Correct flows
5. UX quality
6. Visual polish
7. New features

## Active Constraints

- Do not touch unrelated in-progress code changes.
- Keep source-of-truth docs in English.
- Reuse existing `.codex/context`, planning, governance, and architecture
  systems.
- Preserve the action-only side-effect boundary.
- Do not treat skill-tool bindings as user authorization or executable
  authority.
