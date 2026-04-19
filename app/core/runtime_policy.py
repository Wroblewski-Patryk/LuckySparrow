from typing import Any, Literal


def app_environment(settings: Any) -> str:
    return str(getattr(settings, "app_env", "")).strip().lower()


def event_debug_enabled(settings: Any) -> bool:
    debug_toggle = getattr(settings, "is_event_debug_enabled", None)
    if callable(debug_toggle):
        return bool(debug_toggle())
    return bool(getattr(settings, "event_debug_enabled", True))


def event_debug_token_required(settings: Any) -> bool:
    token = str(getattr(settings, "event_debug_token", "") or "").strip()
    return bool(token)


def event_debug_source(settings: Any) -> Literal["explicit", "environment_default"]:
    if getattr(settings, "event_debug_enabled", None) is not None:
        return "explicit"
    return "environment_default"


def startup_schema_mode(settings: Any) -> str:
    return str(getattr(settings, "startup_schema_mode", "migrate")).strip().lower()


def production_policy_enforcement(settings: Any) -> Literal["warn", "strict"]:
    mode = str(getattr(settings, "production_policy_enforcement", "warn")).strip().lower()
    if mode == "strict":
        return "strict"
    return "warn"


def production_policy_mismatches(settings: Any) -> list[str]:
    if app_environment(settings) != "production":
        return []

    violations: list[str] = []
    if event_debug_enabled(settings):
        violations.append("event_debug_enabled=true")
    if startup_schema_mode(settings) == "create_tables":
        violations.append("startup_schema_mode=create_tables")
    return violations


def production_policy_mismatch_count(settings: Any) -> int:
    return len(production_policy_mismatches(settings))


def strict_startup_blocked(settings: Any) -> bool:
    return production_policy_enforcement(settings) == "strict" and production_policy_mismatch_count(settings) > 0


def strict_rollout_ready(settings: Any) -> bool:
    return production_policy_mismatch_count(settings) == 0


def recommended_production_policy_enforcement(settings: Any) -> Literal["warn", "strict"]:
    if app_environment(settings) == "production" and strict_rollout_ready(settings):
        return "strict"
    return "warn"


def strict_rollout_hint(settings: Any) -> Literal[
    "not_applicable_non_production",
    "resolve_mismatches_before_strict",
    "can_enable_strict",
]:
    if app_environment(settings) != "production":
        return "not_applicable_non_production"
    if strict_rollout_ready(settings):
        return "can_enable_strict"
    return "resolve_mismatches_before_strict"


def runtime_policy_snapshot(settings: Any) -> dict[str, Any]:
    mismatches = production_policy_mismatches(settings)
    enforcement = production_policy_enforcement(settings)
    mismatch_count = len(mismatches)
    recommended_enforcement = recommended_production_policy_enforcement(settings)
    rollout_hint = strict_rollout_hint(settings)
    return {
        "startup_schema_mode": startup_schema_mode(settings),
        "event_debug_enabled": event_debug_enabled(settings),
        "event_debug_token_required": event_debug_token_required(settings),
        "event_debug_source": event_debug_source(settings),
        "production_policy_enforcement": enforcement,
        "recommended_production_policy_enforcement": recommended_enforcement,
        "production_policy_mismatches": mismatches,
        "production_policy_mismatch_count": mismatch_count,
        "strict_startup_blocked": enforcement == "strict" and mismatch_count > 0,
        "strict_rollout_ready": mismatch_count == 0,
        "strict_rollout_hint": rollout_hint,
    }
