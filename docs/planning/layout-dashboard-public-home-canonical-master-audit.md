# Layout, Dashboard, Public Home Canonical Master Audit

## Purpose

This document is the detailed implementation audit for the next major visual
convergence lane.

Scope is intentionally narrowed to the highest-value surfaces:

- shared authenticated parent layout
- public layout
- public home / landing
- authenticated dashboard

The target is not broad mood alignment. The target is structural fidelity to
the approved canonical references so the running product looks recognizably
close to the intended flagship experience.

## Canonical Sources

- `docs/ux/assets/aion-landing-canonical-reference-v1.png`
- `docs/ux/assets/aion-dashboard-canonical-reference-v2.png`
- `docs/ux/canonical-web-screen-reference-set.md`
- `docs/ux/visual-direction-brief.md`
- `docs/ux/experience-quality-bar.md`
- `docs/ux/screen-quality-checklist.md`
- `docs/ux/canonical-visual-implementation-workflow.md`
- `docs/ux/background-and-decorative-asset-strategy.md`

## Current Implementation Surfaces

- `web/src/App.tsx`
- `web/src/index.css`

## Planning Assumptions

- Public "home" means the unauthenticated entry surface currently rendered in
  the `!me` branch of `App.tsx`.
- `dashboard` remains the first authenticated route and functions as the
  authenticated home surface unless product direction explicitly introduces a
  separate `/home` route.
- Route contracts are not expanded in this planning slice.
- Work should prefer shared shell primitives over one-off route-local
  inventions.

## Audit Method

The audit compares:

1. the approved canonical image for each surface
2. the current route structure in `App.tsx`
3. the current shell and route styling in `index.css`

The result is a gap list grouped by reusable layers rather than by CSS selectors.

## Executive Summary

Current implementation is visually closer than before, but the largest
remaining drift is still structural, not cosmetic.

The biggest issues are:

- the authenticated parent layout still feels like an application shell first
  and a flagship environment second
- the public home is still a premium auth screen, not a true landing page
- the dashboard still reads as a stack of sections rather than one composed
  overview tableau
- the current shell and dashboard reuse too many generic card rhythms where
  the canonical design uses stronger scene composition, stronger staging, and
  calmer density control

## Decision Notes

No architecture mismatch blocks planning.

One product naming assumption remains important:

- for this plan, `public home` is the unauthenticated landing surface
- `dashboard` is the authenticated home surface

If product later wants both a public home and a separate authenticated `/home`
route, that should be approved as a route-contract expansion, not slipped into
visual convergence work.

Additional explicit UX decision from deployed review on 2026-04-29:

- fake browser-window chrome is rejected for the flagship shell
- the shared layout may stay inset and premium, but it should not render
  decorative window lights, hostnames, build pills, or title bars as a top
  wrapper around route content
- layout convergence should now target frame-first composition, not a simulated
  browser shell metaphor

## Surface Audit

### 1. Shared Authenticated Parent Layout

Canonical target:

- window-like premium shell
- calm top utility chrome
- left rail as a secondary spine
- content canvas as the dominant object

Current strengths:

- warm material system is already aligned enough to preserve
- shell already has a reusable left rail, utility bar, and centered canvas
- route spacing is calmer than earlier iterations

Current drift:

- shell still reads as a modern app container rather than a framed flagship
  workspace
- utility bar is structurally correct but semantically too product-generic:
  search, pills, notifications, and account feel like standard app chrome
  rather than canonical editorial controls
- left rail is calmer than before but still lacks the exact premium hierarchy
  of:
  - brand lockup
  - primary route stack
  - system-health instrument
  - user identity block
  - final aphorism / quiet closing tile
- shell canvas begins too abruptly below the utility bar; the canonical shell
  has more intentional inset framing and stronger top-edge elegance
- mobile authenticated shell is still serviceable but not canonical:
  it behaves like a responsive app fallback, not like a deliberate sibling of
  the desktop shell

Implementation implications:

- shell needs one explicit "frame pass" before more route-local polish
- utility controls need a visual-role pass, not only spacing tweaks
- rail needs a premium hierarchy pass with stronger zoning and a more exact
  canonical bottom stack
- desktop/tablet/mobile shell variants should be treated as separate
  compositions, not one layout scaled down

### 2. Public Layout

Canonical target:

- frame-first flagship landing without fake browser chrome
- editorial hero first
- navigation integrated into the public shell
- strong trust posture before auth mechanics

Current strengths:

- current public surface already has warm background, copy, and trust cards
- sign-in and registration mechanics are present and usable

Current drift:

- current public layout is still a login/register product entry, not a landing
  page with authentication nested inside the broader trust narrative
- deployed review proved the fake browser-window shell metaphor is unwanted and
  should be removed rather than refined
- no public global nav
- no canonical feature rail, review/social proof strip, or bottom trust band
- hero currently centers copy and generic trust cards, while canonical landing
  uses:
  - left value proposition
  - right embodied figure
  - anchored cognition cards
  - lower feature explainer strip
  - testimonial/social proof rhythm
  - full-width privacy/trust closure
- current public layout lacks a real "why this product" section above the auth
  mechanics

Implementation implications:

- public layout must be treated as a separate canonical system, not a styled
  auth panel
- authentication form should become one module inside the landing composition,
  not the whole page structure
- public nav, hero, feature strip, proof strip, and trust band should be
  introduced as distinct reusable sections without adding a fake browser header

### 3. Public Home / Landing

Canonical target:

- luminous editorial warmth
- immediate first-viewport value proposition
- embodied trust anchor
- strong CTA clarity

Current strengths:

- typography tone and warmth are directionally compatible
- trust-oriented copy already exists

Current drift by element:

- headline:
  - current: auth-oriented
  - target: clear product promise for clarity, growth, and purpose
- body copy:
  - current: explains sign-in and setup return
  - target: explains value and companion posture before auth
- CTA cluster:
  - current: login/register tabs inside auth form
  - target: clear primary and secondary CTA in hero
- embodiment:
  - current: absent as a major hero object
  - target: central/right hero figure as trust anchor
- cognitive support cards:
  - current: absent
  - target: memory, cognition, planning, reflection style cards around figure
- feature strip:
  - current: simple trust cards
  - target: structured mid-page strip with multiple product pillars
- social proof:
  - current: absent
  - target: testimonial/ratings rhythm
- bottom trust band:
  - current: absent
  - target: privacy-first full-width closure band

Implementation implications:

- public home should be rebuilt almost as a fresh route composition using the
  canonical landing as the exact decomposition source
- auth card and auth tabs should become a secondary conversion mechanism, not
  the primary visual story

### 4. Dashboard

Canonical target:

- central embodied cognition anchor
- connected left and right signal cards
- right editorial column
- one flowing overview read
- premium but readable lower information density

Current strengths:

- central figure, side signal cards, guidance column, and lower data blocks all
  exist
- dashboard is no longer just a generic metrics board
- scenic closure and atmosphere assets are already wired

Current drift by zone:

#### 4.1 Hero zone

- center figure is present but still not dominant enough relative to adjacent
  panels
- side signal cards are connected, but the whole hero still reads partly as
  "figure plus cards" instead of one cognition scene
- greeting copy still feels like page intro copy instead of an integrated
  hero caption area
- background ornament exists, but the canonical hero has stronger sacred-center
  energy and denser connective geometry

#### 4.2 Right editorial column

- current guidance column is closer than before
- however, hierarchy is still more card-stack/product-panel than editorial
  curation
- compacted conversation-channel status now belongs to the sidebar, which is an
  improvement, but the composition still needs stronger relationship between:
  - guidance
  - recent activity
  - intention card
- intention card is still too isolated from the rest of the sidebar narrative

#### 4.3 Flow band

- current flow band is useful, but still too module-like
- canonical dashboard uses the lower center band as a strong bridge between the
  hero and the lower overview, not as a self-contained process widget
- current sidecard for "current phase" still competes with the main flow track
- flow notes remain more explanatory than canonical

#### 4.4 Lower grid

- current lower grid is better compressed now, but the route still risks
  reading as hero plus a second dashboard under it
- canonical lower row uses stronger differentiation between:
  - active goals
  - current focus
  - memory growth
  - reflection highlights
- current implementation still leans too evenly on card repetition

#### 4.5 Final closure

- scenic band is stronger than before
- but canonical closure feels like a final panoramic note, not a stat block
  next to an image card
- current closure still keeps too much stat density alive too late in the route

Implementation implications:

- dashboard needs one more structural pass, not only polish
- the order of work should be:
  1. hero authority
  2. sidebar editorialization
  3. flow bridge simplification
  4. lower-grid role separation
  5. final scenic closure simplification

## Gap Inventory By Reusable Layer

### A. Frame Layer

Needs work:

- desktop browser-frame feeling
- top-edge inset behavior
- shell edge softness and premium containment

Apply to:

- public layout
- authenticated parent layout

### B. Navigation Layer

Needs work:

- public global nav
- authenticated left rail hierarchy
- mobile shell parity

Apply to:

- public home
- authenticated shell

### C. Hero Composition Layer

Needs work:

- public hero with embodied trust anchor
- dashboard hero as one cognition scene

Apply to:

- public home
- dashboard

### D. Editorial Sidebar Layer

Needs work:

- dashboard sidebar curation and pacing

Apply to:

- dashboard

### E. Closure Layer

Needs work:

- public bottom trust band
- dashboard scenic ending

Apply to:

- public home
- dashboard

## Asset Strategy

### Reuse Existing Assets

- `web/public/aion-dashboard-hero-atmosphere-reference-v1.png`
- `web/public/aion-dashboard-summary-band-reference-v1.png`
- `web/public/aion-personality-figure-reference-v1.png`
- `web/public/aion-chat-background-reference-v1.png`
- `web/public/aviary-logomark.svg`

### New Assets Likely Required

- public landing hero background / composition asset
- public landing lower trust-band atmosphere asset
- possibly a dedicated dashboard hero ornament or connector-overlay asset if
  CSS continues to flatten the canonical central energy

### Do Not Approximate Away

- painterly ambient backgrounds
- organic floral / luminous closure textures
- embodied-figure trust anchors where the canonical screen clearly depends on
  illustration

## Implementation Sequence

### Phase 1. Freeze The Master Layout Contract

Goal:

- define exact parent-layout rules for public and authenticated shells

Deliver:

- shared shell contract
- rail zoning contract
- utility bar role contract
- spacing map for desktop/tablet/mobile

### Phase 2. Rebuild Public Layout And Home

Goal:

- convert the current auth-first screen into a real landing-first public home

Deliver:

- public browser frame
- public nav
- public hero with embodied figure
- CTA pair
- feature strip
- social proof strip
- trust closure band
- auth entry module placed intentionally within the landing flow

### Phase 3. Recompose Dashboard Structure

Goal:

- make dashboard read like one flagship overview, not stacked dashboard blocks

Deliver:

- stronger hero authority
- editorial sidebar
- simplified flow bridge
- lower grid with clearer card roles
- calmer scenic closure

### Phase 4. Screenshot Parity Loop

Goal:

- compare implemented public home and dashboard directly against the canonical
  assets

Deliver:

- desktop screenshots
- tablet screenshots
- mobile screenshots
- explicit residual mismatch log

## Execution Backlog

### Slice 1. Authenticated Parent Layout Contract

- tighten shell frame
- refine rail zoning
- redefine utility bar roles and density
- establish shared content-inset rules

### Slice 2. Public Layout Skeleton

- browser window frame
- public nav
- public hero grid
- auth module placement

### Slice 3. Public Home Premium Content

- embodiment stage
- cognition support cards
- feature strip
- social proof
- bottom trust band

### Slice 4. Dashboard Hero Authority

- greeting/caption integration
- figure dominance
- signal-card relationship
- connector atmosphere

### Slice 5. Dashboard Sidebar Editorial Pass

- guidance hierarchy
- compact status surface
- recent activity compression
- intention panel integration

### Slice 6. Dashboard Lower-Half Simplification

- flow bridge simplification
- lower-grid role clarity
- scenic closure reduction

### Slice 7. Public + Dashboard Parity Proof

- desktop/tablet/mobile capture
- compare against canonical
- list remaining deltas

## Acceptance Criteria

Planning is complete when:

- all major structural drifts are documented, not just styling notes
- reusable layers are separated from route-local details
- asset needs are explicit
- implementation order is sequenced from shell to route to proof
- public home and dashboard both have clear parity checkpoints

Implementation should only be called visually successful when:

- public home reads like the landing canonical, not like a login page
- authenticated shell reads like a flagship frame, not generic product chrome
- dashboard reads like one overview scene with lower narrative support
- remaining differences are crop-level or content-level, not structural

## Recommended Next Task

Create one implementation-ready task lane for:

- `public layout + public home canonical rebuild`
- `authenticated parent layout contract freeze`
- `dashboard structural canonical convergence`

This should be executed as one coordinated flagship lane, not as unrelated
micro-polish tasks.
