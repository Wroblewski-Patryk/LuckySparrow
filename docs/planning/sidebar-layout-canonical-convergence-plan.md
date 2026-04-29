# Sidebar Layout Canonical Convergence Plan

## Purpose

This document freezes the authenticated left sidebar as one canonical layout
target for the parent application shell.

Its purpose is to remove ambiguity across the current canonical screenshots and
give future shell work one sidebar source of truth before more module-level
screen polish continues.

## Canonical Source

- Primary asset:
  - `docs/ux/assets/aviary-sidebar-layout-canonical-reference-v1.png`
- Related shell context:
  - `docs/ux/canonical-web-screen-reference-set.md`
  - `docs/planning/layout-dashboard-public-home-canonical-master-audit.md`

## Current Implementation Surfaces

- `web/src/App.tsx`
- `web/src/index.css`

## Scope

This plan covers only the authenticated desktop sidebar as a parent-layout
surface.

It does not directly redesign:

- top utility bar
- mobile navigation
- dashboard interior
- chat interior
- personality interior

Those surfaces must adapt to the sidebar once the sidebar contract is frozen.

## Canonical Target Summary

The reference sidebar establishes one very specific shell grammar:

- a slim, elegant, luminous left rail
- a top brand block with emblem, wordmark, and companion subtitle
- a long single-column navigation stack with line icons
- one soft active selection pill
- a bottom support stack made of:
  - system health card
  - signed-in user card
  - aphorism / brand closure card

This is not just a sidebar style.
It is the left-hand structural spine of the authenticated application.

## Structural Audit

### 1. Rail Proportion

Canonical:

- visually narrow
- tall
- almost monolithic
- more like a premium inset column than a panelized dashboard sidebar

Current drift:

- current rail is wider and reads more like a card container
- current padding and internal gaps make it feel chunkier
- the current rail border/shadow treatment is heavier than the canonical one

Implementation requirement:

- reduce effective content width
- tighten horizontal padding
- reduce surface chunkiness
- treat the whole rail as a vertical editorial spine rather than a soft card

### 2. Brand Block

Canonical:

- emblem sits to the left of the wordmark
- subtitle is visually part of the lockup block
- lockup is more delicate than the current brand treatment

Current drift:

- current lockup is larger and more display-heavy
- current subtitle feels like a separate line under a reusable brand component
- current spacing between mark and wordmark is too open

Implementation requirement:

- create a sidebar-specific lockup variant
- reduce wordmark dominance
- compress subtitle spacing
- make the whole block feel like the opening note of the rail

### 3. Navigation Inventory

Canonical visible items:

- Dashboard
- Chat
- Personality
- Memory
- Reflections
- Plans
- Goals
- Insights
- Tools
- Automations
- Integrations
- Settings

Current implementation:

- `/dashboard`
- `/chat`
- `/personality`
- `/tools`
- `/settings`

Important mismatch:

- the canonical sidebar references future module routes not yet present in the
  current route contract

Planning implication:

- visual parity and route-contract parity are not the same task
- implementation must explicitly choose how non-existent modules are handled
  before coding starts

Valid implementation options:

1. Layout-first parity using current route contract only
   - keep only implemented routes interactive
   - defer additional nav items until route contracts exist
   - best for immediate architectural safety
2. Layout parity plus route-shell expansion
   - add the missing route shells first as real authenticated surfaces
   - then expose the full canonical nav stack
   - best for full visual fidelity, but larger scope

Recommended default:

- option 1 first for immediate shell quality
- option 2 only after explicit route-expansion approval

### 4. Navigation Button Anatomy

Canonical:

- line icons, not letter tokens
- one-line labels
- no secondary description line
- very calm button height
- active state is one long soft teal-gold pill

Current drift:

- current buttons use token letters instead of icons
- current buttons have label plus description, making the rail denser
- active state is close in direction, but the geometry and materials are still
  too "component-like"

Implementation requirement:

- replace token letters with a consistent line-icon family
- remove the per-item description line in the desktop rail
- unify button height across the stack
- redesign active state for softer material, longer pill geometry, and stronger
  canonical resemblance

### 5. Vertical Rhythm

Canonical:

- generous, even vertical spacing
- each item breathes without becoming oversized
- visual cadence is extremely consistent from top to bottom

Current drift:

- current stack spacing changes too much between sections
- nav buttons, health card, identity card, and quote card belong to different
  component families with different gap logic

Implementation requirement:

- define one sidebar rhythm scale
- align spacing between:
  - lockup
  - nav stack
  - support stack
- make support stack cards feel intentionally sequenced, not simply appended

### 6. System Health Card

Canonical:

- compact card
- centered content
- decorative circular diagnostic emblem
- short status line
- lightweight secondary button

Current drift:

- current card is directionally close but still too large and too orb-heavy
- current diagnostic object is more dashboard-orb than canonical star-device
- text hierarchy and button geometry still diverge

Implementation requirement:

- redesign the health card around the canonical diagnostic emblem proportions
- reduce visual weight of the orb
- tighten button spacing and card height
- keep the card as part of the sidebar family, not a dashboard transplant

### 7. Identity Card

Canonical:

- compact horizontal card
- avatar on the left
- name and role stacked
- one small chevron affordance on the right

Current drift:

- current identity block is a wider, more operational account card
- it contains email, chips, and sign-out action
- it behaves like an account management panel rather than a compact presence card

Implementation requirement:

- introduce a sidebar-specific compact identity card
- move account management actions outside the desktop rail or behind the card
- preserve sign-out and account access without bloating the rail

### 8. Aphorism Closure Card

Canonical:

- short quote
- airy lower decorative wash
- subtle author signature
- quiet end-stop for the rail

Current drift:

- current quote tile is close in spirit but not in composition
- current brand lockup repeats inside the quote card, which the reference does
  not do
- current quote card still feels like another product panel rather than a final
  closing gesture

Implementation requirement:

- remove redundant brand repetition inside the closure card
- redesign copy hierarchy around quote plus small signature
- add softer decorative background wash closer to the canonical ending

### 9. Border, Shadow, And Material

Canonical:

- very soft border
- almost paper-like warm surface
- subtle interior glow
- quieter shadow than current implementation

Current drift:

- current rail and cards are still slightly too glossy and too panelized
- shadows are a little too "componentized"

Implementation requirement:

- lower contrast of borders
- soften shadow stack
- reduce blur-heavy card feeling
- make the rail material feel closer to one refined substrate

### 10. Mobile Relationship

Canonical implication:

- desktop rail is the primary source of truth
- mobile should become a deliberate derivative, not a generic bottom-nav fallback

Current drift:

- desktop and mobile are related, but not yet clearly from one frozen contract

Implementation requirement:

- document which parts of the desktop sidebar survive into mobile
- treat mobile as a translation of the same hierarchy:
  - route access
  - account posture
  - system state

## Pixel-Close Gap Checklist

The future implementation queue should explicitly check:

- exact rail width
- outer radius
- brand mark scale
- wordmark tracking
- subtitle font size and offset
- nav item left padding
- nav icon stroke feel
- nav active-pill height, width, and gradient
- inter-item gap
- support-stack top margin
- health card internal padding
- diagnostic emblem size
- status copy line breaks
- diagnostics button radius and height
- identity card height
- avatar size and border
- name and role font sizes
- chevron spacing
- quote card top/bottom padding
- quote signature placement
- final lower card decorative texture strength

## Recommended Execution Queue

### Phase 1. Freeze Sidebar Contract

Deliver:

- sidebar asset frozen as canonical source
- inventory mismatch recorded
- implementation queue split into layout-safe and route-expansion-dependent work

### Phase 2. Sidebar Visual Spine Pass

Deliver:

- rail width, padding, material, border, shadow, and radius convergence
- sidebar-specific brand lockup variant
- sidebar-specific card spacing system

### Phase 3. Navigation Anatomy Pass

Deliver:

- icon family replacement for token letters
- one-line nav labels
- canonical active pill
- normalized nav rhythm

### Phase 4. Support Stack Pass

Deliver:

- redesigned system health card
- redesigned compact identity card
- redesigned aphorism closure card

### Phase 5. Route-Contract Expansion Decision

Deliver:

- explicit decision on whether to:
  - show only implemented routes for now
  - or expand route shells to expose the full canonical nav inventory

### Phase 6. Responsive Translation And Proof

Deliver:

- desktop, tablet, and mobile shell parity notes
- screenshot comparison against the canonical sidebar
- final remaining gap ledger

## Validation Expectations

Future implementation tasks should not close without:

- screenshot proof of the authenticated desktop shell
- comparison against `aviary-sidebar-layout-canonical-reference-v1.png`
- desktop spacing audit
- keyboard-focus audit for rail items
- responsive translation notes for tablet and mobile

## Next Smallest Useful Implementation Slice

The best next implementation task is:

- redesign the desktop authenticated left rail around the canonical sidebar
  using current route contracts only

That slice should:

- keep real routes interactive
- remove per-item descriptions
- introduce icons
- redesign the support stack
- leave future route inventory expansion as a separate explicit decision
