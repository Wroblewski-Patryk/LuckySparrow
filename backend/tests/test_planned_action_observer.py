from app.core.planned_action_observer import planned_action_observer_snapshot


def test_planned_action_observer_marks_empty_enabled_scan_as_noop() -> None:
    snapshot = planned_action_observer_snapshot(
        proactive_enabled=True,
        scheduler_execution_mode="in_process",
        maintenance_summary={"executed": True, "due_planned_work": 0, "proposal_handoffs_created": 0},
        proactive_summary={"executed": True, "events_emitted": 0},
    )

    assert snapshot["policy_owner"] == "planned_action_observer_policy"
    assert snapshot["last_observer_state"] == "empty_noop"
    assert snapshot["last_observer_reason"] == "no_due_or_actionable_work"
    assert snapshot["empty_result_behavior"] == "no_foreground_event"
    assert snapshot["due_planned_work_count"] == 0
    assert snapshot["actionable_proposal_count"] == 0
    assert snapshot["foreground_events_emitted"] == 0
    assert snapshot["raw_payload_exposure"] == "counts_only"


def test_planned_action_observer_prioritizes_due_planned_work() -> None:
    snapshot = planned_action_observer_snapshot(
        proactive_enabled=True,
        scheduler_execution_mode="externalized",
        maintenance_summary={"due_planned_work": 2, "proposal_handoffs_created": 1, "foreground_events_emitted": 1},
    )

    assert snapshot["selected_scheduler_execution_mode"] == "externalized"
    assert snapshot["last_observer_state"] == "due_planned_work"
    assert snapshot["last_observer_reason"] == "due_planned_work_available"
    assert snapshot["due_planned_work_count"] == 2
    assert snapshot["actionable_proposal_count"] == 1
    assert snapshot["foreground_events_emitted"] == 1


def test_planned_action_observer_exposes_actionable_proposal_without_due_work() -> None:
    snapshot = planned_action_observer_snapshot(
        proactive_enabled=True,
        scheduler_execution_mode="in_process",
        maintenance_summary={"due_planned_work": 0, "proposal_handoffs_created": 3},
    )

    assert snapshot["last_observer_state"] == "actionable_proposal"
    assert snapshot["last_observer_reason"] == "actionable_proposal_available"


def test_planned_action_observer_marks_disabled_proactive_as_blocked_by_policy() -> None:
    snapshot = planned_action_observer_snapshot(
        proactive_enabled=False,
        scheduler_execution_mode="in_process",
        maintenance_summary={"due_planned_work": 4, "proposal_handoffs_created": 4},
    )

    assert snapshot["last_observer_state"] == "blocked_by_policy"
    assert snapshot["last_observer_reason"] == "proactive_disabled"


def test_planned_action_observer_marks_missing_evidence_as_unavailable() -> None:
    snapshot = planned_action_observer_snapshot(
        proactive_enabled=True,
        scheduler_execution_mode="legacy",
    )

    assert snapshot["selected_scheduler_execution_mode"] == "in_process"
    assert snapshot["last_observer_state"] == "observer_unavailable"
    assert snapshot["last_observer_reason"] == "no_observer_evidence_recorded"
