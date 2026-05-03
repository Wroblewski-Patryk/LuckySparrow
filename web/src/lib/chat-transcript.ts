import type { AppChatHistoryEntry } from "./api";
import { stringValue } from "./learned-state-formatting";

export type ChatDeliveryState = "sending" | "delivered" | "failed";

export function transcriptMetadataSummary(entry: AppChatHistoryEntry) {
  if (!entry.metadata) {
    return null;
  }

  const language = stringValue(entry.metadata.language, "").trim();
  const tone = stringValue(entry.metadata.tone, "").trim();
  const runtimeRole = stringValue(entry.metadata.runtime_role, "").trim();
  const actionStatus = stringValue(entry.metadata.action_status, "").trim();

  const parts = [
    language ? `lang ${language}` : null,
    tone ? `tone ${tone}` : null,
    runtimeRole ? `role ${runtimeRole}` : null,
    actionStatus ? `action ${actionStatus}` : null,
  ].filter(Boolean);

  return parts.length > 0 ? parts.join(" | ") : null;
}

export function chatDeliveryState(entry: AppChatHistoryEntry): ChatDeliveryState | null {
  const value = entry.metadata?.delivery_state;
  return value === "sending" || value === "delivered" || value === "failed" ? value : null;
}

export function reconcileLocalTranscriptItems(
  localItems: AppChatHistoryEntry[],
  durableItems: AppChatHistoryEntry[],
) {
  const durableMessageIds = new Set(durableItems.map((item) => item.message_id));
  const durableEventRoleKeys = new Set(durableItems.map((item) => `${item.event_id}:${item.role}`));
  return localItems.filter(
    (item) =>
      !durableMessageIds.has(item.message_id) &&
      !durableEventRoleKeys.has(`${item.event_id}:${item.role}`),
  );
}
