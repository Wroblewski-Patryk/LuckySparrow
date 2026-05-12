import { TextInput, View, useWindowDimensions } from "react-native";

import { colors, spacing } from "@/theme";
import { ActionButton, MessageBubble, MetricCard, Panel, RouteRail, ScreenHero, ScreenScrollView, SegmentedControl } from "@/ui/primitives";

const transcript = [
  {
    id: "user-1",
    speaker: "You",
    body: "Route smoke user turn",
  },
  {
    id: "aion-1",
    speaker: "AION",
    body: "Route smoke assistant reply",
  },
  {
    id: "aion-2",
    speaker: "AION",
    body: "I can keep the next step small, visible, and connected to your current plan.",
  },
];

const contextCards = [
  { label: "Intent", value: "Plan my day", detail: "Next calm step" },
  { label: "Memory", value: "1 cue", detail: "Preferences stay near" },
  { label: "Action", value: "Convert to tasks", detail: "Ready when confirmed" },
];

const modes = ["Ask", "Plan", "Reflect", "Execute"];

export function ChatScreen() {
  const { width } = useWindowDimensions();
  const isCompact = width < 430;

  return (
    <ScreenScrollView>
      <RouteRail active="chat" />

      <ScreenHero
        label="Conversation"
        title="Shared thread"
        description="The native chat keeps transcript, planning, and action posture in one reachable flow."
        status="Live"
      />

      <View style={{ flexDirection: isCompact ? "column" : "row", gap: spacing.small }}>
        {contextCards.map((card) => (
          <MetricCard key={card.label} {...card} />
        ))}
      </View>

      <Panel tone="soft">
        <View style={{ gap: spacing.small, minHeight: 330 }}>
          {transcript.map((message) => (
            <MessageBubble
              key={message.id}
              speaker={message.speaker}
              body={message.body}
              mine={message.id.startsWith("user")}
            />
          ))}
        </View>
      </Panel>

      <Panel>
        <SegmentedControl options={modes} />
        <TextInput
          accessibilityLabel="Message"
          multiline
          placeholder="Send a message..."
          placeholderTextColor="#9a948b"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderRadius: 18,
            borderWidth: 1,
            color: colors.text,
            fontSize: 16,
            minHeight: 96,
            paddingHorizontal: spacing.medium,
            paddingVertical: spacing.medium,
            textAlignVertical: "top",
          }}
        />
        <ActionButton>Send</ActionButton>
      </Panel>
    </ScreenScrollView>
  );
}
