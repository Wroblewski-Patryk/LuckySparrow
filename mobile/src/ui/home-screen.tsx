import { Text, View, useWindowDimensions } from "react-native";

import { APP_RESOURCE_CONTRACTS } from "@/api/shared-client-contract";
import { colors, radii, spacing } from "@/theme";
import { MessageBubble, Panel, RouteRail, ScreenScrollView, SectionHeader, SectionLabel, SegmentedControl, StatusPill } from "@/ui/primitives";

const signals = [
  { label: "Intent", value: "Plan my day", tone: "ready" },
  { label: "Memory", value: "1 cue", tone: "recent" },
  { label: "Posture", value: "Steady", tone: "calm" },
];

const conversation = [
  { id: "user", speaker: "You", body: "Route smoke user turn" },
  { id: "aion", speaker: "AION", body: "Route smoke assistant reply" },
];

const tabs = ["Ask", "Plan", "Reflect"];

function SignalCard({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <View
      style={{
        flex: 1,
        minWidth: 96,
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderRadius: radii.card,
        borderWidth: 1,
        gap: spacing.xsmall,
        padding: spacing.medium,
        boxShadow: "0 14px 28px rgba(60, 46, 31, 0.07)",
      }}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between", gap: spacing.small }}>
        <SectionLabel>{label}</SectionLabel>
        <Text selectable style={{ color: colors.teal, fontSize: 11, fontWeight: "800" }}>
          {tone}
        </Text>
      </View>
      <Text selectable style={{ color: colors.text, fontSize: 19, fontWeight: "700" }}>
        {value}
      </Text>
    </View>
  );
}

function ContractRow({ label, endpoint }: { label: string; endpoint: string }) {
  return (
    <View
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.58)",
        borderColor: colors.border,
        borderRadius: radii.row,
        borderWidth: 1,
        flexDirection: "row",
        gap: spacing.medium,
        justifyContent: "space-between",
        padding: spacing.medium,
      }}
    >
      <Text selectable style={{ color: colors.text, flex: 1, fontSize: 15, fontWeight: "700" }}>
        {label}
      </Text>
      <Text
        selectable
        style={{
          color: colors.subtleText,
          flex: 1.2,
          fontSize: 12,
          lineHeight: 17,
          textAlign: "right",
        }}
      >
        {endpoint}
      </Text>
    </View>
  );
}

export function HomeScreen() {
  const { width } = useWindowDimensions();
  const isCompact = width < 430;

  return (
    <ScreenScrollView>
      <RouteRail active="home" />

      <View
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderRadius: radii.panel,
          borderWidth: 1,
          gap: spacing.large,
          padding: spacing.large,
          boxShadow: "0 18px 40px rgba(63, 49, 33, 0.08)",
        }}
      >
        <View style={{ alignItems: "flex-start", gap: spacing.small }}>
          <View
            style={{
              backgroundColor: colors.white,
              borderColor: colors.border,
              borderRadius: radii.pill,
              borderWidth: 1,
              paddingHorizontal: 18,
              paddingVertical: 11,
            }}
          >
            <Text selectable style={{ color: colors.text, fontSize: 22, letterSpacing: 0 }}>
              A I O N
            </Text>
          </View>
          <SectionLabel>Native v1.5 seed</SectionLabel>
          <Text selectable style={{ color: colors.text, fontSize: 34, fontWeight: "800", lineHeight: 38 }}>
            Conversation first.
          </Text>
          <Text selectable style={{ color: colors.subtleText, fontSize: 16, lineHeight: 23 }}>
            A calm native shell that carries the v1.1 web hierarchy into a reachable mobile rhythm.
          </Text>
        </View>

        <View style={{ flexDirection: isCompact ? "column" : "row", gap: spacing.small }}>
          {signals.map((signal) => (
            <SignalCard key={signal.label} {...signal} />
          ))}
        </View>
      </View>

      <Panel>
        <View style={{ flexDirection: "row", justifyContent: "space-between", gap: spacing.medium }}>
          <View style={{ flex: 1 }}>
            <SectionHeader label="Chat" title="Shared transcript" titleSize={25} />
          </View>
          <StatusPill>Live</StatusPill>
        </View>

        <View
          style={{
            backgroundColor: colors.surfaceSoft,
            borderColor: colors.border,
            borderRadius: 24,
            borderWidth: 1,
            gap: spacing.small,
            minHeight: 260,
            padding: spacing.medium,
          }}
        >
          {conversation.map((message) => (
            <MessageBubble
              key={message.id}
              speaker={message.speaker}
              body={message.body}
              mine={message.id === "user"}
            />
          ))}
        </View>

        <View
          style={{
            backgroundColor: colors.white,
            borderColor: colors.border,
            borderRadius: 24,
            borderWidth: 1,
            gap: spacing.small,
            padding: spacing.small,
          }}
        >
          <SegmentedControl options={tabs} />
          <View
            style={{
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderRadius: 18,
              borderWidth: 1,
              minHeight: 78,
              justifyContent: "center",
              paddingHorizontal: spacing.medium,
            }}
          >
            <Text selectable style={{ color: "#9a948b", fontSize: 16 }}>
              Send a message...
            </Text>
          </View>
        </View>
      </Panel>

      <View
        style={{
          backgroundColor: colors.surfaceWarm,
          borderColor: "rgba(217, 173, 83, 0.28)",
          borderRadius: radii.panel,
          borderWidth: 1,
          gap: spacing.medium,
          padding: spacing.large,
        }}
      >
        <SectionHeader
          label="Contract boundary"
          title="Thin client, backend-owned cognition."
          description="Native UI may keep drafts and navigation state. Auth, memory, planning, tools, and reflection stay behind shared app-facing endpoints."
          titleSize={25}
        />
        <View style={{ gap: spacing.small }}>
          {APP_RESOURCE_CONTRACTS.slice(0, 6).map((contract) => (
            <ContractRow key={contract.id} label={contract.label} endpoint={contract.endpoint} />
          ))}
        </View>
      </View>
    </ScreenScrollView>
  );
}
