from __future__ import annotations

from collections.abc import Mapping
from typing import Any, Literal

from app.core.scheduler_contracts import normalize_scheduler_execution_mode


PLANNED_ACTION_OBSERVER_POLICY_OWNER = "planned_action_observer_policy"
ObserverState = Literal[
    "empty_noop",
    "due_planned_work",
    "actionable_proposal",
    "blocked_by_policy",
    "observer_unavailable",
]


def _safe_non_negative_int(value: object) -> int:
    try:
        return max(0, int(value))
    except (TypeError, ValueError):
        return 0


def _summary_dict(value: Mapping[str, Any] | None) -> dict[str, Any]:
    return dict(value) if isinstance(value, Mapping) else {}


def planned_action_observer_snapshot(
    *,
    proactive_enabled: bool,
    scheduler_execution_mode: str | None,
    maintenance_summary: Mapping[str, Any] | None = None,
    proactive_summary: Mapping[str, Any] | None = None,
) -> dict[str, Any]:
    """Describe the target observer gate without executing runtime work."""

    maintenance = _summary_dict(maintenance_summary)
    proactive = _summary_dict(proactive_summary)
    due_planned_work_count = _safe_non_negative_int(maintenance.get("due_planned_work"))
    actionable_proposal_count = _safe_non_negative_int(maintenance.get("proposal_handoffs_created"))
    foreground_events_emitted = _safe_non_negative_int(maintenance.get("foreground_events_emitted")) + _safe_non_negative_int(
        proactive.get("events_emitted")
    )
    last_noop_supported = True
    has_any_summary = bool(maintenance or proactive)
    selected_mode = normalize_scheduler_execution_mode(scheduler_execution_mode)

    if not proactive_enabled:
        state: ObserverState = "blocked_by_policy"
        reason = "proactive_disabled"
    elif due_planned_work_count > 0:
        state = "due_planned_work"
        reason = "due_planned_work_available"
    elif actionable_proposal_count > 0:
        state = "actionable_proposal"
        reason = "actionable_proposal_available"
    elif has_any_summary:
        state = "empty_noop"
        reason = "no_due_or_actionable_work"
    else:
        state = "observer_unavailable"
        reason = "no_observer_evidence_recorded"

    return {
        "policy_owner": PLANNED_ACTION_OBSERVER_POLICY_OWNER,
        "target_execution_model": "passive_scan_before_conscious_foreground",
        "selected_scheduler_execution_mode": selected_mode,
        "supported_states": [
            "empty_noop",
            "due_planned_work",
            "actionable_proposal",
            "blocked_by_policy",
            "observer_unavailable",
        ],
        "last_observer_state": state,
        "last_observer_reason": reason,
        "empty_result_behavior": "no_foreground_event",
        "foreground_trigger_policy": "only_due_planned_work_or_actionable_proposal",
        "due_planned_work_count": due_planned_work_count,
        "actionable_proposal_count": actionable_proposal_count,
        "foreground_events_emitted": foreground_events_emitted,
        "noop_supported": last_noop_supported,
        "raw_payload_exposure": "counts_only",
    }
