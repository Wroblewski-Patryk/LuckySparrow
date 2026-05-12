import { TextInput, View, useWindowDimensions } from "react-native";

import { colors, spacing } from "@/theme";
import { ActionButton, MetricCard, Panel, RouteRail, ScreenHero, ScreenScrollView, SectionHeader } from "@/ui/primitives";

const settingsFacts = [
  { label: "UI language", value: "EN English" },
  { label: "UTC offset", value: "UTC+00:00" },
  { label: "Conversation", value: "en" },
  { label: "Follow-ups", value: "On" },
];

export function SettingsScreen() {
  const { width } = useWindowDimensions();
  const isCompact = width < 430;

  return (
    <ScreenScrollView>
      <RouteRail active="settings" />

      <ScreenHero
        label="Settings"
        title="Personalize the shell"
        description="Native settings stay short, touchable, and focused on profile, interface, and follow-up posture."
        status="Safe"
      />

      <View style={{ flexDirection: isCompact ? "column" : "row", flexWrap: "wrap", gap: spacing.small }}>
        {settingsFacts.map((fact) => (
          <MetricCard key={fact.label} {...fact} minWidth={isCompact ? "100%" : 150} />
        ))}
      </View>

      <Panel>
        <SectionHeader
          label="Profile"
          title="Display name"
          description="The native client shows the same account identity without owning auth itself."
        />
        <TextInput
          accessibilityLabel="Display name"
          value="Route Smoke"
          editable={false}
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderRadius: 18,
            borderWidth: 1,
            color: colors.text,
            fontSize: 16,
            minHeight: 56,
            paddingHorizontal: spacing.medium,
          }}
        />
      </Panel>

      <Panel tone="warm">
        <SectionHeader
          label="Runtime data"
          title="Reset remains guarded"
          description="The UI can describe the reset boundary, but destructive behavior still belongs behind backend-owned app contracts."
        />
        <ActionButton tone="danger">Review reset boundary</ActionButton>
      </Panel>
    </ScreenScrollView>
  );
}
