from __future__ import annotations

from dataclasses import dataclass
from typing import Any


@dataclass(frozen=True, slots=True)
class HealthResponseSections:
    runtime_policy: dict[str, Any]
    release_readiness: dict[str, Any]
    v1_readiness: dict[str, Any]
    api_readiness: dict[str, Any]
    capability_catalog: dict[str, Any]
    runtime_topology: dict[str, Any]
    observability: dict[str, Any]
    identity: dict[str, Any]
    affective: dict[str, Any]
    memory_retrieval: dict[str, Any]
    planning_governance: dict[str, Any]
    learned_state: dict[str, Any]
    connectors: dict[str, Any]
    deployment: dict[str, Any]
    telegram_channel: dict[str, Any]
    scheduler: dict[str, Any]
    proactive: dict[str, Any]
    role_skill: dict[str, Any]
    attention: dict[str, Any]
    reflection: dict[str, Any]


def build_health_response(sections: HealthResponseSections) -> dict[str, Any]:
    return {
        "status": "ok",
        "runtime_policy": sections.runtime_policy,
        "release_readiness": sections.release_readiness,
        "v1_readiness": sections.v1_readiness,
        "api_readiness": sections.api_readiness,
        "capability_catalog": sections.capability_catalog,
        "runtime_topology": sections.runtime_topology,
        "observability": sections.observability,
        "identity": sections.identity,
        "affective": sections.affective,
        "memory_retrieval": sections.memory_retrieval,
        "planning_governance": sections.planning_governance,
        "learned_state": sections.learned_state,
        "connectors": sections.connectors,
        "deployment": sections.deployment,
        "conversation_channels": {
            "telegram": sections.telegram_channel,
        },
        "scheduler": sections.scheduler,
        "proactive": sections.proactive,
        "role_skill": sections.role_skill,
        "attention": sections.attention,
        "reflection": sections.reflection,
    }
