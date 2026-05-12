import { View, useWindowDimensions } from "react-native";

import { spacing } from "@/theme";
import { ActionButton, InfoRow, MetricCard, Panel, RouteRail, ScreenHero, ScreenScrollView, SectionHeader, StateNotice } from "@/ui/primitives";

const toolGroups = [
  {
    name: "Conversation",
    tools: ["Shared transcript", "Message send", "Follow-up posture"],
  },
  {
    name: "Capability",
    tools: ["Tools overview", "Preference updates", "Telegram link start"],
  },
  {
    name: "Continuity",
    tools: ["Personality overview", "Settings", "Current user"],
  },
];

const posture = [
  { label: "Allowed", value: "5" },
  { label: "Provider secrets", value: "Backend only" },
  { label: "Debug surfaces", value: "Hidden" },
];

const uiStates = [
  {
    state: "loading" as const,
    title: "Preparing capability list",
    detail: "Keep navigation and shell context visible while app data arrives.",
  },
  {
    state: "empty" as const,
    title: "No tools available yet",
    detail: "Explain the empty condition without presenting provider setup controls.",
  },
  {
    state: "error" as const,
    title: "Capability status unavailable",
    detail: "Keep recovery calm and avoid leaking raw provider or backend errors.",
  },
  {
    state: "success" as const,
    title: "Capabilities ready",
    detail: "Show available actions while execution remains backend-owned.",
  },
];

export function ToolsScreen() {
  const { width } = useWindowDimensions();
  const isCompact = width < 430;

  return (
    <ScreenScrollView>
      <RouteRail active="tools" />

      <ScreenHero
        label="Tools"
        title="Capability without clutter"
        description="Native tools show what is available while keeping execution, credentials, and provider policy backend-owned."
        status="Ready"
      />

      <View style={{ flexDirection: isCompact ? "column" : "row", gap: spacing.small }}>
        {posture.map((item) => (
          <MetricCard key={item.label} {...item} />
        ))}
      </View>

      <Panel tone="soft">
        <SectionHeader
          label="UI states"
          title="State coverage"
          description="The native shell has explicit loading, empty, error, and success copy for app-facing data surfaces."
        />
        <View style={{ gap: spacing.small }}>
          {uiStates.map((state) => (
            <StateNotice key={state.state} {...state} />
          ))}
        </View>
      </Panel>

      {toolGroups.map((group) => (
        <Panel key={group.name}>
          <SectionHeader label={group.name} title={`${group.name} tools`} />
          <View style={{ gap: spacing.small }}>
            {group.tools.map((tool) => (
              <InfoRow key={tool} label={tool} value="App-facing" valueTone="accent" />
            ))}
          </View>
        </Panel>
      ))}

      <ActionButton>Review preferences</ActionButton>
    </ScreenScrollView>
  );
}
