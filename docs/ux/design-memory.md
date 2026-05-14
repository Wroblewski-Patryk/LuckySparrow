# Design Memory

## Approved Reuse Patterns

- Conversation shell:
  Keep message reading effortless and input affordances stable across states.
- Chat mobile context rail:
  Preserve the horizontal context rail when it protects conversation-first
  rhythm. Tune card width, scroll padding, and edge treatment so the first card
  is readable and the next card peeks intentionally; do not convert context
  into a tall stack unless the user explicitly chooses context density over
  first-read conversation access.
- Chat cognitive metric cards:
  Dense cognitive values inside the Chat top belt should use structured short
  lines or compact UI rows instead of slash-separated prose. Preserve normal
  paragraph bodies for narrative cards, but split metric copy before it reaches
  awkward ellipses in desktop/tablet first viewports.
- Mobile chat transcript width:
  On narrow screens, prioritize assistant answer width over decorative speaker
  avatar chrome. Keep speaker identity in message metadata and let the
  transcript bubble occupy the available rail so numbered cards and longer
  answers do not collapse into cramped lines.
- Compact dashboard metadata:
  In narrow Dashboard rails, timestamp and activity metadata should use calmer
  sentence-case UI typography with modest tracking. Avoid uppercase plus wide
  letter spacing when the metadata needs to remain scanable in tablet/right-rail
  columns.
- Count-heavy summary values:
  Numeric metric values in compact summary cards should use unambiguous UI
  typography with tabular numbers. Avoid display-serif `1` glyphs in operational
  counts where the value can read as the letter `I`.
- Safe Markdown chat messages:
  Render transcript Markdown as semantic message content inside the existing
  chat bubble pattern, using escaped React-rendered elements for emphasis,
  lists, and code. Do not use raw HTML injection for user-authored content, and
  let long message bodies expand naturally inside the transcript scroll surface
  instead of clamping the bubble.
- Settings groups:
  Prefer clear sectioning, short helper copy, and visible save or success
  feedback.
- Settings destructive boundaries:
  Keep destructive runtime/account controls available but collapsed behind a
  clear disclosure boundary by default. Safe daily settings should dominate
  the first read; confirmation fields and irreversible actions belong inside
  the expanded boundary.
- Settings action color semantics:
  Normal persistence actions should use the calm teal primary action language.
  Reserve amber and red emphasis for warning, review, or destructive contexts
  so save actions do not visually compete with reset boundaries.
- Capability cards:
  Show current state, user control, and trust implications in one compact
  surface.
- Embodied cognition motif:
  Use one humane synthetic figure, anchored pins, and timeline rails to map
  internal cognition concepts into memorable product visuals without turning the shell into a
  sci-fi console.
- Timeline-backed metadata:
  Attach labels, chips, and mini-stats to explicit rails or sections instead of
  leaving metadata as floating decorative fragments.
- Chat background artwork:
  Use one route-specific right-weighted illustration with strong negative space
  on the left for transcript readability, instead of trying to fake the full
  premium effect from gradients alone.
- Personality figure artwork:
  Use one route-specific embodied figure asset with enough negative space for
  anchored callouts and side panels, instead of relying on generic CSS-only
  humanoid placeholders.
- Shared canonical persona figure:
  Reuse one approved Aviary persona figure across `landing`, `dashboard`,
  `chat`, `personality`, and other flagship modules. Adapt the crop, callout
  map, and supporting objects to the route context instead of inventing a
  different being per screen.
- Route-specific persona adaptation:
  Keep one continuous Aviary identity across flagship routes, but do not reuse
  the exact same pose-and-props composition everywhere. The route decides the
  supporting objects:
  - `personality`: knowledge-and-identity props such as book, writing tool,
    page, symbolic mapping anchors
  - `dashboard`: orchestration, guidance, cognition-field, and overview props
    rather than personality-specific study props
  - `chat`: conversation, continuity, listening, and response-shaping props
  - `landing`: welcoming, trust, and orientation props with the calmest
    composition
  Route-specific adaptation is required unless the user explicitly approves a
  repeated composition.
- Personality embodied map:
  Use display typography for identity and role language, but render count-heavy
  callout values with UI/body typography so numerals stay unambiguous. Keep the
  Mind Layers timeline labeled on mobile; compact the heading instead of
  removing context entirely.
- Flagship utility bar:
  Use one calm top utility band with search, compact actions, and account
  posture to give authenticated routes dashboard-grade framing without
  inventing route-local chrome.
- Flagship overview stage:
  Use one central embodied stage with flanking signal cards, a guidance column,
  and a cognitive-flow band so `dashboard` feels like the conductor of the
  shell instead of a generic analytics grid.
- Dashboard scenic closure:
  When the flagship dashboard starts feeling flat, add bespoke raster artwork
  to the intention card and the lower summary band before piling on more CSS
  decoration.
- Dashboard cognition field:
  When the central dashboard hero still feels too generic, add one dedicated
  scenic atmosphere asset behind the figure and use light connective ornament
  before adding more standalone cards.
- Unified dashboard hero artwork:
  When the canonical dashboard depends on one continuous scenic composition,
  prefer one wide raster hero artwork that already integrates the shared
  persona, aura, and right-side cognition detail instead of layering a separate
  figure asset over a second atmosphere image.
  For `dashboard`, do not reuse the `personality` prop family such as the book,
  page, or writing tool. The dashboard hero should instead use guidance,
  orchestration, overview, and cognition-field symbols.
- Frame-first flagship shell:
  Keep the public and authenticated shells premium, inset, and composed, but
  do not simulate browser controls, title bars, or fake window chrome as part
  of the canonical layout. If a canonical reference image shows the product
  embedded in a browser mockup, treat that browser frame as presentation
  context and ignore it during implementation.
- Canonical authenticated sidebar spine:
  Use one narrow premium rail with brand block, icon-led module stack, system
  health card, signed-in identity card, and quiet aphorism closure as the
  reusable left spine for authenticated routes instead of route-local or
  analytics-style sidebars.
- Shared responsive navigation proof:
  Treat shared shell navigation changes as behavior changes, not only visual
  polish. Keep `npm run audit:ui-navigation` green when the desktop sidebar,
  tablet route rail, or mobile in-header route rail changes. The tablet and
  mobile route switchers should reuse the shared shell nav item model, glyphs,
  full accessible labels, and short visible labels instead of creating
  route-local menu variants.
- Tools capability directory hierarchy:
  Tools cards should read as user-facing capability decisions before exposing
  implementation detail. Show readiness, availability, link state, provider
  posture, next action, and user control first; keep capabilities, bindings,
  and source-of-truth fields in disclosure panels unless the user is actively
  configuring a provider.
- Landing-first public entry:
  Keep authentication as one conversion module inside a broader trust-led
  landing story with hero, embodied motif, feature strip, and trust closure
  instead of making sign-in the whole page.
- Public auth as modal continuation:
  On the public landing, session entry should open as a modal layer over the
  flagship scene instead of appearing as a co-equal inline section beneath the
  trust closure.
- Scenic background treatment:
  When a route-specific hero illustration is meant to behave like atmosphere or
  stage art, render it as the scenic background layer of the section instead of
  as an obvious nested image card inside another card.
- Landing hero stage composition:
  Keep the public landing copy and scenic figure inside one shared hero stage,
  with roughly a `40/60` split between copy and scene on desktop. Avoid
  redundant nested scenic wrappers when the artwork is already acting as the
  route background. The landing copy should sit on top of that same scenic
  stage, not beside it in a separate sibling column.
- Integrated composer tray:
  Keep the main chat input, send control, and low-priority support actions
  inside one shared tray so the conversation footer reads like one premium
  surface instead of stacked unrelated controls.
- Chat transcript/composer clearance:
  On tablet-sized authenticated Chat, keep the transcript dense enough that a
  complete visible response card clears the composer. Prefer breakpoint-local
  spacing and list-card density before changing runtime fixtures or moving the
  composer out of the conversation column.
- Native segmented mode control:
  In the Expo mobile shell, use one shared pill-based segmented control for
  simple mode selectors such as Ask, Plan, Reflect, and Execute. Keep it
  visually compact enough for phone width, and do not couple it to backend mode
  behavior until the native auth and data transport slice is selected.
- Native action buttons:
  In the Expo mobile shell, use one shared full-width action button for seeded
  CTAs. Keep `primary` for positive route actions and `danger` for guarded
  destructive-boundary review; do not add press behavior until the matching
  app-facing contract slice exists.
- Native section headers:
  In the Expo mobile shell, use one shared `SectionHeader` for repeated
  label/title/description panel headers. Keep bespoke heroes separate when they
  carry route identity or status.
- Native state notices:
  For app-facing data surfaces, design loading, empty, error, and success as
  calm copy-first notices before wiring live data. Do not expose raw provider
  errors, secrets, or backend internals in user-facing state copy.
- Native route chrome:
  Keep Expo Router Stack headers token-aligned with the mobile canvas and text
  color. Avoid default platform chrome that visually disconnects route titles
  from the seeded shell.
- Native local preview handoff:
  For seeded Expo mobile UI work, keep a fallback-to-index web-export preview
  available for review before device proof exists. Treat that preview as a
  handoff and responsive evidence tool, not as a substitute for later Expo Go
  or simulator validation.
- Chat v5 canonical composition:
  The active chat canonical reference is now
  `docs/ux/assets/aion-chat-canonical-reference-v5.png`. Below the top
  cognitive belt, the chat body should use two equal-height columns rather
  than three competing content containers: about `60%` width for the
  conversation transcript/composer and about `40%` width for a route-adapted
  persona stage. Intent, motivation, active goal, memory, suggested action, and
  proactive check-in belong in the top belt or as subtle persona-stage overlays.
  The chat persona should be generated/adapted for conversation and face left
  toward the thread instead of reusing a right-facing figure crop.
- Brand logotype and font pairing:
  Use the canonical Aviary bird logomark with the `AVIARY` wordmark in
  `Cormorant Garamond` for major headers and `Inter` for operational UI,
  instead of mixing unrelated display and body families across routes.
- Product naming boundary:
  keep `Aviary` for app-brand surfaces, while the embodied personality remains
  unnamed until a later identity-forming product decision.
- Surface-first flagship closure:
  Close one flagship surface at a time and do not open the next dependent
  route until the current one is visually at least `95%` aligned with the
  active spec.
- Canonical spec with user interpretation:
  When a canonical screenshot exists, treat it as the base spec, but merge in
  explicit user-requested deviations as approved interpretation notes instead
  of ignoring them or silently reverting to the image.
- Canonical conflict escalation:
  If two user-requested visual notes conflict, or if a new note conflicts with
  a previously accepted interpretation, stop and ask the user which direction
  should win before implementing.

## Reuse Notes

- New UX patterns should improve calmness and trust, not add novelty.
- Record proven patterns here when they should guide future shell work.
- The approved reference for the embodied cognition motif now lives in
  `docs/ux/aion-visual-motif-system.md`.
- The current approved chat art direction reference now also includes
  `docs/ux/assets/aion-chat-background-reference-v1.png`.
- The current approved personality route preview now also includes
  `docs/ux/assets/aviary-persona-figure-canonical-reference-v1.png`.
- The current approved flagship-shell pattern now includes a shared utility
  top bar reused across premium authenticated routes.
- The current approved canonical web screen-set now lives in
  `docs/ux/canonical-web-screen-reference-set.md`.
- The current approved chat canonical reference now lives in
  `docs/ux/assets/aion-chat-canonical-reference-v5.png`.
- The current approved dashboard hero implementation asset now includes
  `docs/ux/assets/aviary-dashboard-hero-canonical-reference-v4.png`.
- The current approved landing hero implementation asset now includes
  `docs/ux/assets/aviary-landing-hero-canonical-reference-v1.png`.
- Future web UX tasks should capture post-deploy screenshots and compare them
  directly against the canonical screen-set instead of relying only on memory
  or prompt descriptions.
- Future flagship UX tasks should use a `95%` parity gate per surface instead
  of polishing multiple screens in parallel.
- When a canonical screenshot drives implementation, record background and
  decorative fidelity rules here so future parity passes reuse them instead of
  flattening them into generic gradients.
## 2026-04-30 - Public home full-bleed shell framing

- The public `home` surface should not read as a nested panel or browser-like
  window.
- Use full-width `header`, `hero`, and `footer` sections, each with its own
  full-width shell/background treatment.
- Keep inner navigation, hero copy, bridge content, and trust-band content
  visually aligned through a consistent max-width rhythm, even if the DOM does
  not use a separate wrapper for every section.
- On wide screens, let the public navigation float above the scenic hero
  background rather than sitting inside a separate framed card.
- Treat the landing artwork as the hero-stage background, not as an image
  nested inside another visible container.

## 2026-05-14 - Public home canonical polish checkpoint

- Do not render canonical-reference labels such as `Landing Page` in the
  production Home surface; they are presentation context, not product UI.
- Keep public Home as a full-width landing scene with the canonical raster
  artwork as the scenic layer, not a framed screenshot or nested window.
- Public landing navigation should use real section anchors so top-level labels
  behave as navigation rather than decorative text.
- On tablet widths where the hero callouts compete with trust micro-copy,
  prefer fewer visible micro-proof items over overlapping text.
- Auth modal placeholder copy should follow the active UI language.

## 2026-05-14 - Authenticated mobile shell polish checkpoint

- Do not surface technical build labels in the first viewport of logged-in
  mobile/tablet product screens; keep those details in debug or diagnostics
  surfaces instead of core chrome.
- When a shared shell issue affects dashboard, personality, settings, tools,
  and support routes, polish the shared shell first before route-local
  composition passes.
- The authenticated mobile route set may remain horizontally scrollable while
  the route count is large, but the fixed tabbar should use the Aviary material
  palette and a calm teal active state instead of stark black chrome.
- After shared-shell polish, continue with one route-local canonical pass at a
  time; dashboard content convergence is the next best checkpoint.

## 2026-05-14 - Dashboard CTA behavior checkpoint

- On flagship route surfaces, visible CTA controls should route to an existing
  work surface before deeper visual polish adds more affordances.
- Dashboard CTA behavior should reuse the shared route helper and existing
  route contracts; do not create route-local navigation state.
- Decorative or nonfunctional action-looking buttons are a UX debt item even
  when screenshots look visually polished.

## 2026-05-14 - Dashboard right-column readability checkpoint

- In the dashboard right column, readability wins over forcing desktop
  three-column action layouts into narrow side panels.
- Canonical-style tokens can improve guidance and recent activity rhythm, but
  they must not compress copy or collide with timestamps.
- Screenshot review should catch cramped sidebar text before a route-local
  polish slice is considered closed.

## 2026-05-14 - Aviary visible brand-copy checkpoint

- User-facing product shell copy should use `Aviary` consistently across
  Home, authenticated chrome, Chat speaker labels, composer notes, and shared
  sidebar signatures.
- Keep `AION` available for runtime, architecture, or internal system naming
  where that is still the project terminology, but avoid legacy AION labels in
  visible product chrome unless explicitly approved for an in-world persona
  distinction.
- Add user-facing brand copy through the existing localization object instead
  of hardcoded strings.

## 2026-05-14 - Chat mobile context rail checkpoint

- On mobile Chat, conversation and composer content should appear before long
  status grids dominate the first read.
- Use a horizontal context rail for dense top-belt signals when all context
  cards should remain available but the mobile viewport cannot support a tall
  grid.
- Offscreen rail children are acceptable only when they are intentionally
  touch-scrollable and document-level horizontal overflow remains false.
- Keep desktop and tablet context-belt composition separate from mobile
  first-read compression unless screenshot evidence shows the larger
  breakpoints need the same treatment.

## 2026-05-14 - Personality mobile nav-clearance checkpoint

- Fixed mobile navigation may remain global, but route-local hero-to-content
  transitions must leave enough calm clearance that the tabbar does not cover
  first-read data rows.
- On Personality mobile, keep the portrait hero visually primary and let the
  Mind Layers timeline begin below the first fixed-nav overlap zone.
- Prefer route-local spacing for a route-specific overlap before changing the
  shared navigation contract.
- Screenshot review must confirm whether fixed mobile chrome is covering data
  or only intentional negative space.

## 2026-05-14 - Shared shell navigation layout checkpoint

- Mobile web navigation should live in the mobile header flow rather than as a
  fixed bottom overlay when the route surfaces are content-heavy and already
  vertically dense.
- Reuse the same route glyph language across desktop sidebar and mobile
  navigation so the shell reads as one product system.
- Use short localized mobile labels with full accessible labels for large route
  sets; avoid clipped long text in mobile chrome.
- Desktop sidebar should be calm, narrow, and scannable. Keep support cards
  secondary to navigation and avoid making the rail feel heavier than the main
  workspace.
- This checkpoint supersedes the earlier fixed-bottom mobile nav assumption
  from the Personality clearance slice.
