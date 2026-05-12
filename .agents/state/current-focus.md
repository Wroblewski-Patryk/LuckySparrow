# Current Focus

Last updated: 2026-05-12

## Active Focus

`v1.5` native/mobile UI is now the active UI continuation after the selected
scope v1.1 web handoff. `PRJ-1158` seeds the Expo-managed mobile home shell,
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

Next focus: continue the v1.5 native/mobile lane from the verified home/chat/
personality/settings/tools seed. The next product step should be Expo
Go/simulator proof when tooling is available, or an explicit native auth
transport decision before app-facing data wiring.

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
