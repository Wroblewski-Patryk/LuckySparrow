# Dashboard Foundation And Personality Visual System Plan

## Purpose

This plan turns the newly approved AION visual motif into an execution-ready
 implementation roadmap for `web/`.

The rollout must build one reusable dashboard-first foundation that can later
support additional product modules and future apps without fragmenting the
visual system.

This plan explicitly follows the user's latest direction:

- the first approved image remains the primary style source
- the later chat/dashboard concept contributes useful UI ingredients and
  information architecture ideas
- those dashboard ingredients must be restyled toward the warmer, more
  editorial, more embodied language of the first image

## Approved Design Inputs

- primary style source:
  - `docs/ux/assets/aion-visual-motif-reference.png`
- canonical motif system:
  - `docs/ux/aion-visual-motif-system.md`
- dashboard/chat concept source:
  - approved thread concept generated on 2026-04-26

## Product Goal

Create one coherent authenticated product shell that:

- feels premium and memorable
- keeps chat and future modules highly usable
- reuses shared primitives instead of route-local inventions
- becomes the visual and structural baseline for later product surfaces

## Implementation Principle

Build the system in this order:

1. shared tokens and primitives
2. shell and dashboard foundation
3. dashboard content blocks and continuity surfaces
4. personality module on top of the shared system
5. proof across states, breakpoints, and accessibility

Do not start from route-by-route decoration.
Start from the reusable system that future routes can inherit.

## Style Resolution

When the two concept images differ, choose these priorities:

### Primary Priority

Use the first image for:

- emotional tone
- material softness
- silhouette and figure treatment
- warmth and atmosphere
- editorial elegance
- embodied cognition metaphor

### Secondary Priority

Use the second image for:

- dashboard composition hints
- continuity chips and timeline organization
- conversation-first hierarchy
- supportive metadata layout
- route utility patterns

### Explicit Rule

If a dashboard pattern from the second image becomes colder, denser, or more
generic than the first image, restyle it toward the first image before
implementation.

## System Boundaries

- keep backend-owned `/app/*` contracts intact
- keep information ownership backend-first
- build visual and layout reuse before route-specific exceptions
- prefer component variants over route-exclusive components
- keep illustration subordinate to content and action
- preserve mobile-first behavior with deliberate tablet and desktop expansion

## Dashboard-First Rollout

The first implementation target is not `chat` alone.
It is one authenticated dashboard foundation that can host:

- conversation continuity
- current context
- upcoming actions
- linked channels
- route entry tiles
- lightweight cognitive-flow cues

This dashboard foundation should feel like the front door to the personality,
not like an admin overview.

## Shared Component Families

The implementation lane should produce reusable families rather than one-off
screens.

### Shell Components

- app frame
- top bar
- route rail or bottom navigation
- section scaffold
- responsive content grid
- ambient background layers

### Surface Components

- motif hero panel
- frosted information panel
- timeline rail panel
- compact metric card
- status chip
- section eyebrow and heading set
- progressive detail drawer or expandable detail block

### Content Components

- continuity card
- linked-channel card
- cognitive-flow strip
- transcript preview list
- personality facet card
- capability artifact card
- empty-state illustration block

### Input Components

- primary composer shell
- inline action bar
- safe secondary action group

## Dashboard Information Architecture

The dashboard should become the reusable shell baseline.

Recommended desktop posture:

- hero or motif-led introduction at top
- primary content column for conversation continuity and active work
- secondary column for cognitive-flow cues, linked channels, and system status
- route-entry surfaces for deeper modules

Recommended mobile posture:

- condensed motif header
- continuity-first card stack
- route-entry cards lower in the flow
- strong sticky or obvious primary action posture

## Dashboard Sections To Plan

1. Welcome / continuity hero
2. Shared conversation preview
3. Current cognitive flow summary
4. Linked channels and tools status
5. Personality snapshot entry
6. Action-oriented module entry cards

Each section should map to shared component families rather than custom layout
logic.

## Personality Module Direction

`personality` becomes the second planned implementation module after the
dashboard foundation is stable.

It should be the richest realization of the embodied cognition motif:

- body-map style composition
- layer timelines
- pins for identity, role, planning, knowledge, and skills
- progressive detail for deeper metadata

But it must still be built from the same dashboard-era component system:

- same material tokens
- same panel grammar
- same chip system
- same typography hierarchy
- same responsive breakpoints

## Responsive Requirements

### Desktop

- allow the most complete motif expression
- use editorial split layouts
- keep reading paths obvious

### Tablet

- maintain the same grammar with fewer simultaneous regions
- reduce panel density before collapsing usefulness

### Mobile

- preserve the same identity through crop, rhythm, and material treatment
- never ship a stripped generic mobile screen that loses the motif

## State And Accessibility Requirements

Every planned implementation task must explicitly prove:

- `loading`
- `empty`
- `error`
- `success`
- keyboard reach where relevant
- touch comfort where relevant
- reduced-motion compatibility
- contrast on warm surfaces

## Execution Queue

The detailed execution queue now runs through `PRJ-731`.

1. `PRJ-724` Freeze Dashboard-First Visual System And Component Contract
2. `PRJ-725` Shared Tokens, Surfaces, And Motif Infrastructure
3. `PRJ-726` Authenticated Dashboard Shell And Responsive Layout Foundation
4. `PRJ-727` Dashboard Continuity, Flow, And Module Entry Sections
5. `PRJ-728` Dashboard Proof Across States, Accessibility, And Breakpoints
6. `PRJ-729` Freeze Personality Module Information Architecture And Motif Mapping
7. `PRJ-730` Personality Module Implementation On Shared Visual Foundations
8. `PRJ-731` Cross-Module Proof, Design Memory Update, And Future-App Baseline Sync

## Why This Order

- freeze the reusable contract before visual coding starts
- implement tokens and primitives before route composition
- create one dashboard foundation before deep module specialization
- prove the dashboard first because future apps will inherit its shell posture
- only then build `personality` as the richest module on top of that system
- finish with proof and source-of-truth sync so the baseline is transferable

## Done State For The Lane

The lane is complete when:

- the dashboard is the accepted reusable authenticated shell baseline
- `personality` visibly reuses the same system instead of branching away
- screenshots prove visual and responsive consistency
- future modules can be planned against shared primitives and documented rules
