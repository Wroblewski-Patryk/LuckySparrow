from typing import Any, Literal


def structured_perception_enabled(settings: Any) -> bool:
    enabled_toggle = getattr(settings, "is_structured_perception_enabled", None)
    if callable(enabled_toggle):
        return bool(enabled_toggle())
    explicit = getattr(settings, "structured_perception_enabled", None)
    if explicit is not None:
        return bool(explicit)
    return bool(getattr(settings, "openai_api_key", None))


def structured_perception_source(settings: Any) -> Literal["explicit", "environment_default"]:
    if getattr(settings, "structured_perception_enabled", None) is not None:
        return "explicit"
    return "environment_default"


def structured_perception_policy_snapshot(settings: Any) -> dict[str, Any]:
    enabled = structured_perception_enabled(settings)
    classifier_available = bool(getattr(settings, "openai_api_key", None))
    if enabled and classifier_available:
        posture = "ai_assisted_active"
        hint = "ai_classifier_available_for_structured_perception"
    elif enabled:
        posture = "fallback_only_classifier_unavailable"
        hint = "configure_openai_api_key_or_disable_ai_structured_perception"
    else:
        posture = "fallback_only_policy_disabled"
        hint = "policy_disabled_use_deterministic_perception_baseline"
    return {
        "structured_perception_enabled": enabled,
        "structured_perception_source": structured_perception_source(settings),
        "structured_perception_classifier_available": classifier_available,
        "structured_perception_posture": posture,
        "structured_perception_hint": hint,
        "structured_perception_owner": "structured_perception_rollout_policy",
    }
