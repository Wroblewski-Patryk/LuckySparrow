# Working Agreements

## Intent

These agreements adapt the shared documentation template to the current Personality repository without forcing a JavaScript or monorepo workflow onto a Python service.

## Delivery Principles

- Prefer small, auditable changes.
- Keep implementation aligned with the event-driven runtime contract.
- Treat `docs/basics/` as architecture intent and the category docs as repo-derived operating guidance.
- Update assumptions before rewriting deeper narrative docs when the repo is still evolving quickly.

## Coding Agreements

- Keep API handlers thin and push behavior into internal modules.
- Preserve structured contracts between runtime stages.
- Keep side effects in integrations and action execution layers.
- Avoid introducing framework-heavy abstractions unless the repo actually needs them.
- Prefer deterministic heuristics and mocks in tests over network-dependent behavior.

## Documentation Agreements

- Add or update `docs/assumptions/` whenever a Codex pass uncovers a new current-state baseline.
- Promote stable assumptions into the relevant numbered docs when the implementation and intended design converge.
- Keep `docs/README.md` current enough that a new contributor can find the right document within a minute.

## Operational Agreements

- Local developer flow should work first on Windows and Docker, because both are already supported in the repo.
- Production guidance should assume Coolify or a comparable Docker-hosted deployment until a different platform becomes real.
- Do not describe background workers or reflection loops as production-ready unless the code actually runs them.

## Review Agreements

- Prefer documenting concrete gaps over pretending the roadmap is already implemented.
- If a placeholder field or subsystem exists, call it out explicitly in docs and planning rather than hiding it.
