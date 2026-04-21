from __future__ import annotations

from typing import Any


def retrieval_depth_policy_snapshot(
    *,
    episodic_limit: int,
    conclusion_limit: int,
    semantic_vector_enabled: bool,
    hybrid_diagnostics: dict[str, int] | None = None,
) -> dict[str, Any]:
    diagnostics = dict(hybrid_diagnostics or {})
    return {
        "episodic_limit": int(episodic_limit),
        "conclusion_limit": int(conclusion_limit),
        "production_default_episodic_limit": 12,
        "production_default_conclusion_limit": 8,
        "semantic_vector_enabled": bool(semantic_vector_enabled),
        "retrieval_mode": "hybrid_vector_lexical" if semantic_vector_enabled else "lexical_only",
        "vector_hits": int(diagnostics.get("vector_hits", 0)),
        "episodic_lexical_hits": int(diagnostics.get("episodic_lexical_hits", 0)),
        "semantic_candidates": int(diagnostics.get("semantic_candidates", 0)),
        "affective_candidates": int(diagnostics.get("affective_candidates", 0)),
        "policy_owner": "runtime_memory_load",
        "default_depth_alignment": (
            "aligned_with_production_default"
            if int(episodic_limit) == 12 and int(conclusion_limit) == 8
            else "custom_depth_override"
        ),
    }


def theta_influence_snapshot(
    *,
    theta: dict[str, Any] | None,
    role_selected: str,
    motivation_mode: str,
    plan_steps: list[str],
    expression_tone: str,
) -> dict[str, Any]:
    dominant_channel = _dominant_theta_channel(theta)
    role_expected = {
        "support": "friend",
        "analysis": "analyst",
        "execution": "executor",
    }.get(dominant_channel)
    motivation_expected = {
        "support": "respond",
        "analysis": "analyze",
        "execution": "execute",
    }.get(dominant_channel)
    tone_expected = {
        "support": "supportive",
        "analysis": "analytical",
        "execution": "action-oriented",
    }.get(dominant_channel)
    planning_step_markers = {
        "support": "maintain_supportive_stance",
        "analysis": "favor_structured_reasoning",
        "execution": "favor_concrete_next_step",
    }
    planning_marker = planning_step_markers.get(dominant_channel)
    return {
        "theta_loaded": theta is not None,
        "dominant_channel": dominant_channel,
        "role_posture": _stage_posture(role_expected, role_selected),
        "motivation_posture": _stage_posture(motivation_expected, motivation_mode),
        "planning_posture": (
            "applied"
            if planning_marker and planning_marker in plan_steps
            else ("eligible_not_selected" if dominant_channel else "not_applicable")
        ),
        "expression_posture": _stage_posture(tone_expected, expression_tone),
        "bounded_to_tie_breaks": True,
    }


def _stage_posture(expected: str | None, actual: str) -> str:
    if expected is None:
        return "not_applicable"
    if expected == actual:
        return "applied"
    return "eligible_not_selected"


def _dominant_theta_channel(theta: dict[str, Any] | None) -> str | None:
    if not theta:
        return None
    candidates = {
        "support": float(theta.get("support_bias", 0.0) or 0.0),
        "analysis": float(theta.get("analysis_bias", 0.0) or 0.0),
        "execution": float(theta.get("execution_bias", 0.0) or 0.0),
    }
    channel, bias = max(candidates.items(), key=lambda item: item[1])
    if bias < 0.58:
        return None
    return channel
