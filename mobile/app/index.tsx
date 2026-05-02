import { ScrollView, Text, View } from "react-native";

import { APP_RESOURCE_CONTRACTS } from "@/api/shared-client-contract";
import { colors, radii, spacing } from "@/theme";

export default function HomeScreen() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1, backgroundColor: colors.canvas }}
      contentContainerStyle={{
        gap: spacing.large,
        padding: spacing.large,
        paddingBottom: spacing.xlarge,
      }}
    >
      <View style={{ gap: spacing.small }}>
        <Text
          selectable
          style={{
            color: colors.muted,
            fontSize: 12,
            fontWeight: "700",
            letterSpacing: 0,
            textTransform: "uppercase",
          }}
        >
          Mobile foundation
        </Text>
        <Text
          selectable
          style={{
            color: colors.text,
            fontSize: 34,
            fontWeight: "700",
            lineHeight: 40,
          }}
        >
          AION native shell
        </Text>
        <Text selectable style={{ color: colors.subtleText, fontSize: 16, lineHeight: 24 }}>
          This Expo workspace is a thin client over backend-owned app contracts.
          It does not implement cognition, planning, provider setup, or debug
          surfaces locally.
        </Text>
      </View>

      <View
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderRadius: radii.card,
          borderWidth: 1,
          gap: spacing.medium,
          padding: spacing.medium,
        }}
      >
        <Text selectable style={{ color: colors.text, fontSize: 18, fontWeight: "700" }}>
          Shared client contracts
        </Text>
        <View style={{ gap: spacing.small }}>
          {APP_RESOURCE_CONTRACTS.map((contract) => (
            <View
              key={contract.id}
              style={{
                borderColor: colors.border,
                borderRadius: radii.row,
                borderWidth: 1,
                gap: spacing.xsmall,
                padding: spacing.medium,
              }}
            >
              <Text selectable style={{ color: colors.text, fontSize: 15, fontWeight: "700" }}>
                {contract.label}
              </Text>
              <Text selectable style={{ color: colors.subtleText, fontSize: 13, lineHeight: 19 }}>
                {contract.endpoint}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
