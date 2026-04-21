from dataclasses import dataclass

from app.core.contracts import (
    CalendarSchedulingIntentDomainIntent,
    ConnectedDriveAccessDomainIntent,
    ConnectorCapabilityDiscoveryDomainIntent,
    ConnectorKind,
    ConnectorOperationMode,
    ConnectorPermissionGateOutput,
    ExternalTaskSyncDomainIntent,
)


@dataclass(frozen=True)
class ConnectorOperationPolicy:
    connector_kind: ConnectorKind
    operation: str
    mode: ConnectorOperationMode
    requires_opt_in: bool
    requires_confirmation: bool
    allowed_without_external_access: bool
    policy_reason: str


_OPERATION_POLICIES: dict[tuple[ConnectorKind, str], ConnectorOperationPolicy] = {
    ("calendar", "read_availability"): ConnectorOperationPolicy(
        connector_kind="calendar",
        operation="read_availability",
        mode="read_only",
        requires_opt_in=True,
        requires_confirmation=False,
        allowed_without_external_access=True,
        policy_reason="read_only_operator_preview",
    ),
    ("calendar", "suggest_slots"): ConnectorOperationPolicy(
        connector_kind="calendar",
        operation="suggest_slots",
        mode="suggestion_only",
        requires_opt_in=True,
        requires_confirmation=False,
        allowed_without_external_access=True,
        policy_reason="suggestion_only_planning_boundary",
    ),
    ("calendar", "create_event"): ConnectorOperationPolicy(
        connector_kind="calendar",
        operation="create_event",
        mode="mutate_with_confirmation",
        requires_opt_in=True,
        requires_confirmation=True,
        allowed_without_external_access=False,
        policy_reason="external_mutation_requires_confirmation",
    ),
    ("calendar", "update_event"): ConnectorOperationPolicy(
        connector_kind="calendar",
        operation="update_event",
        mode="mutate_with_confirmation",
        requires_opt_in=True,
        requires_confirmation=True,
        allowed_without_external_access=False,
        policy_reason="external_mutation_requires_confirmation",
    ),
    ("calendar", "cancel_event"): ConnectorOperationPolicy(
        connector_kind="calendar",
        operation="cancel_event",
        mode="mutate_with_confirmation",
        requires_opt_in=True,
        requires_confirmation=True,
        allowed_without_external_access=False,
        policy_reason="external_mutation_requires_confirmation",
    ),
    ("task_system", "list_tasks"): ConnectorOperationPolicy(
        connector_kind="task_system",
        operation="list_tasks",
        mode="read_only",
        requires_opt_in=True,
        requires_confirmation=False,
        allowed_without_external_access=True,
        policy_reason="read_only_operator_preview",
    ),
    ("task_system", "suggest_sync"): ConnectorOperationPolicy(
        connector_kind="task_system",
        operation="suggest_sync",
        mode="suggestion_only",
        requires_opt_in=True,
        requires_confirmation=False,
        allowed_without_external_access=True,
        policy_reason="suggestion_only_planning_boundary",
    ),
    ("task_system", "create_task"): ConnectorOperationPolicy(
        connector_kind="task_system",
        operation="create_task",
        mode="mutate_with_confirmation",
        requires_opt_in=True,
        requires_confirmation=True,
        allowed_without_external_access=False,
        policy_reason="external_mutation_requires_confirmation",
    ),
    ("task_system", "update_task"): ConnectorOperationPolicy(
        connector_kind="task_system",
        operation="update_task",
        mode="mutate_with_confirmation",
        requires_opt_in=True,
        requires_confirmation=True,
        allowed_without_external_access=False,
        policy_reason="external_mutation_requires_confirmation",
    ),
    ("task_system", "link_internal_task"): ConnectorOperationPolicy(
        connector_kind="task_system",
        operation="link_internal_task",
        mode="suggestion_only",
        requires_opt_in=True,
        requires_confirmation=False,
        allowed_without_external_access=True,
        policy_reason="internal_state_stays_primary_until_connector_link_is_confirmed",
    ),
    ("cloud_drive", "list_files"): ConnectorOperationPolicy(
        connector_kind="cloud_drive",
        operation="list_files",
        mode="read_only",
        requires_opt_in=True,
        requires_confirmation=False,
        allowed_without_external_access=True,
        policy_reason="read_only_operator_preview",
    ),
    ("cloud_drive", "search_documents"): ConnectorOperationPolicy(
        connector_kind="cloud_drive",
        operation="search_documents",
        mode="read_only",
        requires_opt_in=True,
        requires_confirmation=False,
        allowed_without_external_access=True,
        policy_reason="read_only_operator_preview",
    ),
    ("cloud_drive", "read_document"): ConnectorOperationPolicy(
        connector_kind="cloud_drive",
        operation="read_document",
        mode="read_only",
        requires_opt_in=True,
        requires_confirmation=False,
        allowed_without_external_access=True,
        policy_reason="read_only_operator_preview",
    ),
    ("cloud_drive", "suggest_file_plan"): ConnectorOperationPolicy(
        connector_kind="cloud_drive",
        operation="suggest_file_plan",
        mode="suggestion_only",
        requires_opt_in=True,
        requires_confirmation=False,
        allowed_without_external_access=True,
        policy_reason="suggestion_only_planning_boundary",
    ),
    ("cloud_drive", "upload_file"): ConnectorOperationPolicy(
        connector_kind="cloud_drive",
        operation="upload_file",
        mode="mutate_with_confirmation",
        requires_opt_in=True,
        requires_confirmation=True,
        allowed_without_external_access=False,
        policy_reason="external_mutation_requires_confirmation",
    ),
    ("cloud_drive", "update_document"): ConnectorOperationPolicy(
        connector_kind="cloud_drive",
        operation="update_document",
        mode="mutate_with_confirmation",
        requires_opt_in=True,
        requires_confirmation=True,
        allowed_without_external_access=False,
        policy_reason="external_mutation_requires_confirmation",
    ),
    ("cloud_drive", "delete_file"): ConnectorOperationPolicy(
        connector_kind="cloud_drive",
        operation="delete_file",
        mode="mutate_with_confirmation",
        requires_opt_in=True,
        requires_confirmation=True,
        allowed_without_external_access=False,
        policy_reason="external_mutation_requires_confirmation",
    ),
}


def resolve_connector_operation_policy(
    connector_kind: ConnectorKind,
    operation: str,
) -> ConnectorOperationPolicy:
    try:
        return _OPERATION_POLICIES[(connector_kind, operation)]
    except KeyError as exc:
        raise ValueError(
            f"Unsupported connector policy lookup for {connector_kind}:{operation}."
        ) from exc


def resolve_connector_capability_discovery_policy(
    connector_kind: ConnectorKind,
    requested_capability: str,
) -> ConnectorOperationPolicy:
    return ConnectorOperationPolicy(
        connector_kind=connector_kind,
        operation=f"discover_{requested_capability}",
        mode="suggestion_only",
        requires_opt_in=False,
        requires_confirmation=False,
        allowed_without_external_access=True,
        policy_reason="proposal_only_no_external_access",
    )


def build_connector_permission_gate(
    intent: CalendarSchedulingIntentDomainIntent
    | ExternalTaskSyncDomainIntent
    | ConnectedDriveAccessDomainIntent
    | ConnectorCapabilityDiscoveryDomainIntent,
) -> ConnectorPermissionGateOutput:
    policy = resolve_policy_for_connector_intent(intent)
    if isinstance(intent, CalendarSchedulingIntentDomainIntent):
        connector_kind: ConnectorKind = "calendar"
        provider_hint = intent.provider_hint
        operation = intent.operation
    elif isinstance(intent, ExternalTaskSyncDomainIntent):
        connector_kind = "task_system"
        provider_hint = intent.provider_hint
        operation = intent.operation
    elif isinstance(intent, ConnectedDriveAccessDomainIntent):
        connector_kind = "cloud_drive"
        provider_hint = intent.provider_hint
        operation = intent.operation
    else:
        connector_kind = intent.connector_kind
        provider_hint = intent.provider_hint
        operation = f"discover_{intent.requested_capability}"

    return ConnectorPermissionGateOutput(
        connector_kind=connector_kind,
        provider_hint=provider_hint,
        operation=operation,
        mode=policy.mode,
        requires_opt_in=policy.requires_opt_in,
        requires_confirmation=policy.requires_confirmation,
        allowed=policy.allowed_without_external_access,
        reason=_permission_gate_reason(policy),
    )


def resolve_policy_for_connector_intent(
    intent: CalendarSchedulingIntentDomainIntent
    | ExternalTaskSyncDomainIntent
    | ConnectedDriveAccessDomainIntent
    | ConnectorCapabilityDiscoveryDomainIntent,
) -> ConnectorOperationPolicy:
    if isinstance(intent, CalendarSchedulingIntentDomainIntent):
        return resolve_connector_operation_policy("calendar", intent.operation)
    if isinstance(intent, ExternalTaskSyncDomainIntent):
        return resolve_connector_operation_policy("task_system", intent.operation)
    if isinstance(intent, ConnectedDriveAccessDomainIntent):
        return resolve_connector_operation_policy("cloud_drive", intent.operation)
    return resolve_connector_capability_discovery_policy(
        intent.connector_kind,
        intent.requested_capability,
    )


def connector_guardrail_snapshot(
    intent: CalendarSchedulingIntentDomainIntent
    | ExternalTaskSyncDomainIntent
    | ConnectedDriveAccessDomainIntent
    | ConnectorCapabilityDiscoveryDomainIntent,
) -> str:
    policy = resolve_policy_for_connector_intent(intent)
    state = (
        "allowed_without_external_access"
        if policy.allowed_without_external_access
        else "blocked_until_confirmation"
    )
    return f"{policy.policy_reason}:{state}"


def connector_intent_policy_violation(
    intent: CalendarSchedulingIntentDomainIntent
    | ExternalTaskSyncDomainIntent
    | ConnectedDriveAccessDomainIntent
    | ConnectorCapabilityDiscoveryDomainIntent,
) -> str | None:
    policy = resolve_policy_for_connector_intent(intent)
    if intent.mode != policy.mode:
        return (
            f"{intent.intent_type}:{getattr(intent, 'operation', 'discover')} "
            f"mode={intent.mode} expected={policy.mode}"
        )
    return None


def _permission_gate_reason(policy: ConnectorOperationPolicy) -> str:
    if policy.policy_reason == "proposal_only_no_external_access":
        return "proposal_only_no_external_access"
    if policy.requires_confirmation:
        return "explicit_user_confirmation_required"
    return "suggestion_or_read_only_allowed"
