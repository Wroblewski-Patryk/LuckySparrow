# Repository Structure Policy

## Goal

Keep the repository predictable, easy to scan, and friendly for human and AI contributors.

## Root Rules

- Keep the root focused on runtime, packaging, deployment, and repo entry files.
- Allowed in root for this project:
  - `README.md`
  - `pyproject.toml`
  - `docker-compose*.yml`
  - `.env.example`
  - `app/`
  - `tests/`
  - `scripts/`
  - `docker/`
  - `docs/`
- Do not add random project documentation directly in the root unless the file is true repo metadata.

## Documentation Rules

- Keep long-form project documentation under `docs/`.
- Preserve the existing numbered files under `docs/basics/` because they already act as the original narrative map for AION.
- Put newer operational and governance docs in category folders such as:
  - `docs/assumptions/`
  - `docs/governance/`
  - `docs/engineering/`
  - `docs/planning/`
  - `docs/operations/`
- When a Codex run discovers a repo fact that should not yet overwrite the canonical story, record it in `docs/assumptions/` first.

## Code Layout Rules

- `app/api/` is for HTTP entry points and request translation only.
- `app/core/` owns contracts, runtime orchestration, configuration, and shared infrastructure glue.
- `app/agents/`, `app/motivation/`, and `app/expression/` contain stage logic.
- `app/integrations/` contains external system clients.
- `app/memory/` contains persistence models and repository logic.
- `tests/` should mirror behavior-focused coverage, not internal implementation trivia.
- `scripts/` should contain repeatable operator and developer helpers only.

## Migration Rule

When adding new docs:

1. Prefer an existing `docs/` subfolder.
2. If the content is current-state and still fluid, place it in `docs/assumptions/`.
3. Update `docs/README.md` so the new file is discoverable.

## Cross-Repo Boundary

- Do not reference sibling repository files as if they were part of this codebase.
- Template ideas may inform this repo, but the canonical paths in docs must always resolve inside `Personality`.
