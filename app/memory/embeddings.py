from __future__ import annotations

import hashlib
import math

DEFAULT_EMBEDDING_PROVIDER = "deterministic"
DEFAULT_EMBEDDING_MODEL = "deterministic-v1"


def resolve_embedding_posture(
    *,
    provider: str | None,
    model: str | None,
) -> dict[str, str]:
    requested_provider = str(provider or DEFAULT_EMBEDDING_PROVIDER).strip().lower() or DEFAULT_EMBEDDING_PROVIDER
    requested_model = str(model or DEFAULT_EMBEDDING_MODEL).strip() or DEFAULT_EMBEDDING_MODEL

    if requested_provider == DEFAULT_EMBEDDING_PROVIDER:
        return {
            "provider_requested": requested_provider,
            "provider_effective": DEFAULT_EMBEDDING_PROVIDER,
            "model_requested": requested_model,
            "model_effective": requested_model,
            "provider_hint": "deterministic_baseline",
        }

    return {
        "provider_requested": requested_provider,
        "provider_effective": DEFAULT_EMBEDDING_PROVIDER,
        "model_requested": requested_model,
        "model_effective": DEFAULT_EMBEDDING_MODEL,
        "provider_hint": "provider_not_implemented_fallback_deterministic",
    }


def deterministic_embedding(text: str, *, dimensions: int = 32) -> list[float]:
    """Returns a deterministic normalized embedding vector for fallback retrieval paths."""
    normalized = " ".join(str(text or "").strip().lower().split())
    if not normalized:
        return [0.0] * dimensions

    vector = [0.0] * dimensions
    for token in normalized.split():
        digest = hashlib.sha256(token.encode("utf-8")).digest()
        for index, byte in enumerate(digest):
            target = index % dimensions
            signed = (int(byte) - 127.5) / 127.5
            vector[target] += signed

    norm = math.sqrt(sum(component * component for component in vector))
    if norm <= 0.0:
        return [0.0] * dimensions
    return [component / norm for component in vector]


def cosine_similarity(left: list[float], right: list[float]) -> float:
    if not left or not right:
        return 0.0

    dimensions = min(len(left), len(right))
    if dimensions == 0:
        return 0.0

    dot = 0.0
    left_norm = 0.0
    right_norm = 0.0
    for index in range(dimensions):
        left_value = float(left[index])
        right_value = float(right[index])
        dot += left_value * right_value
        left_norm += left_value * left_value
        right_norm += right_value * right_value

    if left_norm <= 0.0 or right_norm <= 0.0:
        return 0.0
    return dot / math.sqrt(left_norm * right_norm)
