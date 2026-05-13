from __future__ import annotations

from collections import Counter
from collections.abc import Callable, Mapping, Sequence


GENERIC_MEMORY_TOPICS = {
    "general",
    "memory",
    "context",
    "conversation",
    "response",
    "reply",
    "user",
    "assistant",
    "aion",
}
MAX_CONCLUSION_CONTENT_LENGTH = 128


def derive_memory_topic_summary(
    recent_memory: Sequence[dict],
    *,
    extract_memory_fields: Callable[[dict], Mapping[str, str]],
) -> dict | None:
    topic_counts: Counter[str] = Counter()
    event_evidence: list[tuple[list[str], str]] = []

    for memory_item in recent_memory:
        fields = extract_memory_fields(memory_item)
        topics = _normalized_topics(fields.get("memory_topics", ""))
        if not topics:
            continue

        memory_kind = str(fields.get("memory_kind", "")).strip().lower()
        if memory_kind and memory_kind not in {"semantic", "continuity"}:
            continue

        for topic in topics:
            topic_counts[topic] += 1

        event_text = _clip_text(str(fields.get("event", "")).strip(), max_length=120)
        expression = _clip_text(str(fields.get("expression", "")).strip(), max_length=120)
        if event_text:
            event_evidence.append((topics, event_text))
        elif expression:
            event_evidence.append((topics, expression))

    repeated_topics = [
        topic
        for topic, count in topic_counts.most_common(4)
        if count >= 2
    ]
    if not repeated_topics:
        return None

    evidence_parts: list[str] = []
    seen_evidence: set[str] = set()
    repeated_topic_set = set(repeated_topics)
    for topics, evidence in event_evidence:
        if not repeated_topic_set.intersection(topics):
            continue
        if evidence in seen_evidence:
            continue
        seen_evidence.add(evidence)
        evidence_parts.append(_clip_text(evidence, max_length=48))
        if len(evidence_parts) >= 2:
            break

    if not evidence_parts:
        return None

    content = "Topics: " + ", ".join(repeated_topics) + ". Evidence: " + " | ".join(evidence_parts) + "."
    evidence_count = sum(topic_counts[topic] for topic in repeated_topics)
    confidence = min(0.9, 0.7 + (0.04 * evidence_count))
    return {
        "kind": "memory_topic_summary",
        "content": _clip_text(content, max_length=MAX_CONCLUSION_CONTENT_LENGTH),
        "confidence": round(confidence, 2),
        "source": "background_reflection",
    }


def _normalized_topics(raw_topics: str) -> list[str]:
    normalized: list[str] = []
    seen: set[str] = set()
    for item in str(raw_topics or "").split(","):
        topic = " ".join(item.strip().lower().split())
        if not topic or topic in GENERIC_MEMORY_TOPICS or topic in seen:
            continue
        seen.add(topic)
        normalized.append(topic)
    return normalized


def _clip_text(value: str, *, max_length: int) -> str:
    normalized = " ".join(str(value or "").split())
    if len(normalized) <= max_length:
        return normalized
    clipped = normalized[: max_length - 3].rstrip()
    if " " in clipped:
        clipped = clipped.rsplit(" ", 1)[0]
    return clipped.rstrip(" ,;:-") + "..."
