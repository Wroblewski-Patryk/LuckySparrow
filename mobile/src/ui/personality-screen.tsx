import { Text, View, useWindowDimensions } from "react-native";

import { colors, radii, spacing } from "@/theme";
import { InfoRow, Panel, RouteRail, ScreenHero, ScreenScrollView, SectionHeader, SectionLabel } from "@/ui/primitives";

const identitySignals = [
  { label: "Identity", value: "Stable", detail: "Route Smoke" },
  { label: "Knowledge", value: "1 pattern", detail: "Reusable cues" },
  { label: "Planning", value: "0 active goals", detail: "Current path" },
  { label: "Skills", value: "5 catalogued", detail: "Capability view" },
];

const layers = [
  { label: "Memory", value: "1 notes", detail: "Stored recall" },
  { label: "Reflection", value: "1 insights", detail: "Slower learning" },
  { label: "Context", value: "No data yet", detail: "Environment" },
  { label: "Motivation", value: "0 aligned", detail: "Current goals" },
  { label: "Action", value: "0 active", detail: "Execution posture" },
  { label: "Expression", value: "en", detail: "Communication" },
];

const foreground = [
  { label: "Focus", value: "No goals" },
  { label: "Clarity", value: "2 signals" },
  { label: "Energy", value: "No proposals" },
  { label: "Load", value: "0 tasks / 0 blocked" },
];

export function PersonalityScreen() {
  const { width } = useWindowDimensions();
  const isCompact = width < 430;

  return (
    <ScreenScrollView>
      <RouteRail active="personality" />

      <ScreenHero
        label="Personality"
        title="Embodied state map"
        description="A native summary of identity, memory, planning, and role posture without exposing debug internals."
        status="Stable"
      />

      <View
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderRadius: radii.panel,
          borderWidth: 1,
          minHeight: 320,
          overflow: "hidden",
          padding: spacing.medium,
          boxShadow: "0 18px 40px rgba(63, 49, 33, 0.08)",
        }}
      >
        <View
          style={{
            alignItems: "center",
            backgroundColor: colors.surfaceCool,
            borderColor: "rgba(95, 154, 152, 0.2)",
            borderRadius: 118,
            borderWidth: 1,
            height: 218,
            justifyContent: "center",
            marginHorizontal: "auto",
            width: 218,
          }}
        >
          <Text selectable style={{ color: colors.teal, fontSize: 46, fontWeight: "800" }}>
            AION
          </Text>
          <Text selectable style={{ color: colors.subtleText, fontSize: 13, fontWeight: "800" }}>
            cognition map
          </Text>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.small, marginTop: spacing.medium }}>
          {identitySignals.map((signal) => (
            <View
              key={signal.label}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.72)",
                borderColor: colors.border,
                borderRadius: radii.row,
                borderWidth: 1,
                flexGrow: 1,
                gap: 4,
                minWidth: isCompact ? "46%" : 150,
                padding: spacing.small,
              }}
            >
              <SectionLabel>{signal.label}</SectionLabel>
              <Text selectable style={{ color: colors.text, fontSize: 16, fontWeight: "800" }}>
                {signal.value}
              </Text>
              <Text selectable style={{ color: colors.subtleText, fontSize: 12, lineHeight: 16 }}>
                {signal.detail}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <Panel>
        <SectionHeader label="Mind layers" title="Layers in motion" titleSize={25} />
        <View style={{ gap: spacing.small }}>
          {layers.map((layer) => (
            <InfoRow key={layer.label} {...layer} valueTone="accent" />
          ))}
        </View>
      </Panel>

      <Panel tone="soft">
        <SectionHeader label="Conscious layer" title="Active awareness" titleSize={25} />
        <View style={{ gap: spacing.small }}>
          {foreground.map((item) => (
            <InfoRow key={item.label} label={item.label} value={item.value} />
          ))}
        </View>
      </Panel>
    </ScreenScrollView>
  );
}
