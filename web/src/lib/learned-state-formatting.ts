export type RecentActivityDisplayItem = {
  key: string;
  title: string;
  when: string;
};

export function formatTimestamp(value: string | undefined, locale: string | undefined) {
  if (!value) {
    return "unknown time";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function prettyJson(value: unknown) {
  return JSON.stringify(value, null, 2);
}

export function stringValue(value: unknown, fallback = "not set") {
  if (typeof value === "string" && value.trim()) {
    return value;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  return fallback;
}

export function recentActivityRows(
  overview: { recent_activity?: unknown } | null,
  locale: string,
  fallbackRows: Array<{ title: string; when: string }>,
  unknownTime: string,
): RecentActivityDisplayItem[] {
  const fallback = fallbackRows.map((item, index) => ({
    key: `fallback-${index}-${item.title}`,
    title: item.title,
    when: item.when,
  }));
  const rawActivity = overview?.recent_activity;
  if (!Array.isArray(rawActivity)) {
    return fallback;
  }

  const rows = rawActivity.flatMap((item, index) => {
    if (!item || typeof item !== "object") {
      return [];
    }
    const record = item as Record<string, unknown>;
    const title = stringValue(record.title ?? record.summary, "").trim();
    if (!title) {
      return [];
    }
    const timestamp = stringValue(record.timestamp ?? record.event_timestamp, "").trim();
    const eventId = stringValue(record.event_id, "").trim();
    return [
      {
        key: eventId || `activity-${index}-${title}`,
        title,
        when: timestamp ? formatTimestamp(timestamp, locale) : unknownTime,
      },
    ];
  });

  return rows.length > 0 ? rows : fallback;
}

export function summaryLines(sectionKey: string, payload: unknown): string[] {
  const record = payload && typeof payload === "object" ? (payload as Record<string, unknown>) : {};
  if (sectionKey === "identity_state") {
    const profile = (record.profile as Record<string, unknown> | undefined) ?? {};
    const preferenceSummary = (record.preference_summary as Record<string, unknown> | undefined) ?? {};
    return [
      `Preferred conversation language: ${stringValue(profile.preferred_language, "unknown")}`,
      `Learned preferences available: ${stringValue(preferenceSummary.learned_preference_count, "0")}`,
    ];
  }
  if (sectionKey === "learned_knowledge") {
    const knowledgeSummary = (record.knowledge_summary as Record<string, unknown> | undefined) ?? {};
    return [
      `Patterns captured: ${stringValue(knowledgeSummary.semantic_conclusion_count, "0")}`,
      `Mood-aware takeaways: ${stringValue(knowledgeSummary.affective_conclusion_count, "0")}`,
    ];
  }
  if (sectionKey === "planning_state") {
    const continuitySummary = (record.continuity_summary as Record<string, unknown> | undefined) ?? {};
    return [
      `Active goals: ${stringValue(continuitySummary.active_goal_count, "0")}`,
      `Active tasks: ${stringValue(continuitySummary.active_task_count, "0")}`,
    ];
  }
  if (sectionKey === "role_skill_state") {
    const selectionSummary = (record.selection_visibility_summary as Record<string, unknown> | undefined) ?? {};
    return [
      `Skills currently listed: ${stringValue(selectionSummary.catalog_skill_count, "0")}`,
      `Current selection view: ${stringValue(selectionSummary.runtime_selection_surface, "available")}`,
    ];
  }
  if (sectionKey === "capability_catalog") {
    const posture = (record.tool_and_connector_posture as Record<string, unknown> | undefined) ?? {};
    return [
      `Organizer setup: ${stringValue(posture.organizer_stack_state, "unknown")}`,
      `Tool families available: ${Array.isArray(posture.selectable_tool_families) ? posture.selectable_tool_families.length : 0}`,
    ];
  }
  if (sectionKey === "api_readiness") {
    return [
      `Product stage: ${stringValue(record.product_stage, "unknown")}`,
      `Internal checks available: ${stringValue(record.internal_inspection_path, "yes")}`,
    ];
  }
  return [prettyJson(payload).slice(0, 140)];
}
