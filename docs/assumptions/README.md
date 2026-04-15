# Assumptions Folder

## Purpose

`docs/assumptions/` is the staging area for repo-derived assumptions, temporary conclusions, and Codex-maintained baseline notes.

Use this folder when:

- the codebase clearly suggests something, but the narrative docs have not been aligned yet,
- a change needs a written baseline before broader docs are updated,
- an implementation detail is true today but may still evolve soon.

## Why This Exists

The numbered docs in `docs/basics/` are valuable, but many of them describe the intended long-term system. This folder keeps current-state observations separate, so future Codex passes can safely update the main docs from a controlled source of truth.

## Update Rules

- Prefer one dated file per substantial audit or repo milestone.
- Write assumptions from direct repo evidence whenever possible.
- Link to the canonical narrative docs that may need later updates.
- When an assumption becomes stable, move or rewrite that knowledge into the appropriate canonical doc and trim the assumption note.

## Naming

Recommended format:

- `topic-baseline-YYYY-MM-DD.md`
- `topic-audit-YYYY-MM-DD.md`
- `topic-migration-notes-YYYY-MM-DD.md`

## Boundaries

- Do not use this folder for meeting notes or random ideas.
- Do not rewrite product vision here unless it is tied to actual repo evidence.
- Do not treat assumptions as permanent architecture contracts.
