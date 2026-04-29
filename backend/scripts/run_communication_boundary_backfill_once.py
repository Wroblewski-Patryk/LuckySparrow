from __future__ import annotations

import argparse
import asyncio
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from app.core.config import get_settings
from app.core.database import Database
from app.core.logging import setup_logging
from app.memory.openai_embedding_client import OpenAIEmbeddingClient
from app.memory.repository import MemoryRepository


def _parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Backfill communication-boundary relations from existing user-authored episodic memory."
    )
    parser.add_argument("--user-id", default=None)
    parser.add_argument("--limit", type=int, default=500)
    parser.add_argument("--dry-run", action="store_true")
    return parser.parse_args()


async def _run() -> int:
    args = _parse_args()
    settings = get_settings()
    settings.validate_required()
    setup_logging(settings.log_level)

    database = Database(settings.database_url)  # type: ignore[arg-type]
    openai_embedding_client = OpenAIEmbeddingClient(api_key=settings.openai_api_key)
    memory_repository = MemoryRepository(
        database.session_factory,
        embedding_provider=str(getattr(settings, "embedding_provider", "deterministic")),
        embedding_model=str(getattr(settings, "embedding_model", "deterministic-v1")),
        embedding_dimensions=int(getattr(settings, "embedding_dimensions", 32)),
        embedding_source_kinds=tuple(
            getattr(settings, "get_embedding_source_kinds", lambda: ("episodic", "semantic", "affective"))()
        ),
        embedding_refresh_mode=str(getattr(settings, "embedding_refresh_mode", "on_write")),
        openai_api_key=settings.openai_api_key,
        openai_embedding_client=openai_embedding_client,
    )
    try:
        summary = await memory_repository.backfill_communication_boundary_relations(
            user_id=args.user_id,
            limit=args.limit,
            dry_run=args.dry_run,
        )
    finally:
        await database.dispose()

    print(json.dumps({"status": "ok", "summary": summary}))
    return 0


def main() -> int:
    return asyncio.run(_run())


if __name__ == "__main__":
    raise SystemExit(main())
