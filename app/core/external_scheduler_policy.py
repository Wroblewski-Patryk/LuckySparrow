from __future__ import annotations

from app.core.scheduler_contracts import normalize_scheduler_execution_mode


MAINTENANCE_EXTERNAL_ENTRYPOINT = "scripts/run_maintenance_tick_once.py"
PROACTIVE_EXTERNAL_ENTRYPOINT = "scripts/run_proactive_tick_once.py"


def external_scheduler_policy_snapshot(
    *,
    scheduler_execution_mode: str | None,
) -> dict[str, object]:
    selected_execution_mode = normalize_scheduler_execution_mode(
        scheduler_execution_mode
    )
    production_baseline_ready = selected_execution_mode == "externalized"
    return {
        "policy_owner": "external_scheduler_cadence_policy",
        "target_execution_mode": "externalized",
        "selected_execution_mode": selected_execution_mode,
        "maintenance_cadence_target_owner": "external_scheduler",
        "proactive_cadence_target_owner": "external_scheduler",
        "maintenance_entrypoint_path": MAINTENANCE_EXTERNAL_ENTRYPOINT,
        "proactive_entrypoint_path": PROACTIVE_EXTERNAL_ENTRYPOINT,
        "app_local_fallback_owner": "in_process_scheduler",
        "production_baseline_ready": production_baseline_ready,
        "production_baseline_state": (
            "external_scheduler_baseline_aligned"
            if production_baseline_ready
            else "in_process_scheduler_transitional_fallback"
        ),
        "production_baseline_hint": (
            "external_scheduler_owns_cadence"
            if production_baseline_ready
            else "switch_scheduler_execution_mode_to_externalized_for_target_baseline"
        ),
    }
