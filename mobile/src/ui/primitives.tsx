import { Link, type Href } from "expo-router";
import { Pressable, ScrollView, type DimensionValue, useWindowDimensions } from "react-native";
import { Text, View } from "react-native";

import { colors, radii, spacing } from "@/theme";

const routeLinks: { href: Href; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/chat", label: "Chat" },
  { href: "/personality", label: "Personality" },
  { href: "/settings", label: "Settings" },
  { href: "/tools", label: "Tools" },
];

export function ScreenScrollView({ children }: { children: React.ReactNode }) {
  const { width } = useWindowDimensions();
  const isCompact = width < 430;

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1, backgroundColor: colors.canvas }}
      contentContainerStyle={{
        alignSelf: "center",
        gap: spacing.large,
        maxWidth: 760,
        padding: isCompact ? spacing.medium : spacing.large,
        paddingBottom: spacing.xlarge,
        width: "100%",
      }}
    >
      {children}
    </ScrollView>
  );
}

export function SectionLabel({ children }: { children: string }) {
  return (
    <Text
      selectable
      style={{
        color: colors.muted,
        fontSize: 11,
        fontWeight: "800",
        letterSpacing: 0,
        textTransform: "uppercase",
      }}
    >
      {children}
    </Text>
  );
}

export function StatusPill({ children }: { children: string }) {
  return (
    <View
      style={{
        alignSelf: "flex-start",
        backgroundColor: colors.surfaceCool,
        borderColor: "rgba(95, 154, 152, 0.24)",
        borderRadius: radii.pill,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
      }}
    >
      <Text
        selectable
        style={{
          color: "#3f7472",
          fontSize: 11,
          fontWeight: "800",
        }}
      >
        {children}
      </Text>
    </View>
  );
}

export function MessageBubble({
  speaker,
  body,
  mine,
}: {
  speaker: string;
  body: string;
  mine?: boolean;
}) {
  return (
    <View
      style={{
        alignSelf: mine ? "flex-end" : "flex-start",
        maxWidth: "82%",
        backgroundColor: mine ? colors.surfaceCool : colors.white,
        borderColor: mine ? "rgba(95, 154, 152, 0.28)" : colors.border,
        borderRadius: 22,
        borderWidth: 1,
        gap: 5,
        paddingHorizontal: 16,
        paddingVertical: 13,
      }}
    >
      <Text selectable style={{ color: colors.muted, fontSize: 11, fontWeight: "800" }}>
        {speaker}
      </Text>
      <Text selectable style={{ color: colors.text, fontSize: 16, lineHeight: 22 }}>
        {body}
      </Text>
    </View>
  );
}

export function MetricCard({
  label,
  value,
  detail,
  minWidth = 112,
}: {
  label: string;
  value: string;
  detail?: string;
  minWidth?: DimensionValue;
}) {
  return (
    <View
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderRadius: radii.card,
        borderWidth: 1,
        flex: 1,
        gap: spacing.xsmall,
        minWidth,
        padding: spacing.medium,
      }}
    >
      <SectionLabel>{label}</SectionLabel>
      <Text selectable style={{ color: colors.text, fontSize: 18, fontWeight: "800" }}>
        {value}
      </Text>
      {detail ? (
        <Text selectable style={{ color: colors.subtleText, fontSize: 13, lineHeight: 18 }}>
          {detail}
        </Text>
      ) : null}
    </View>
  );
}

export function InfoRow({
  label,
  value,
  detail,
  valueTone = "default",
}: {
  label: string;
  value?: string;
  detail?: string;
  valueTone?: "default" | "accent";
}) {
  return (
    <View
      style={{
        backgroundColor: colors.surfaceSoft,
        borderColor: colors.border,
        borderRadius: radii.row,
        borderWidth: 1,
        gap: spacing.xsmall,
        padding: spacing.medium,
      }}
    >
      <View style={{ flexDirection: "row", gap: spacing.medium, justifyContent: "space-between" }}>
        <Text selectable style={{ color: colors.text, flex: 1, fontSize: 15, fontWeight: "800" }}>
          {label}
        </Text>
        {value ? (
          <Text
            selectable
            style={{
              color: valueTone === "accent" ? colors.teal : colors.text,
              fontSize: 13,
              fontWeight: "800",
              textAlign: "right",
            }}
          >
            {value}
          </Text>
        ) : null}
      </View>
      {detail ? (
        <Text selectable style={{ color: colors.subtleText, fontSize: 13, lineHeight: 18 }}>
          {detail}
        </Text>
      ) : null}
    </View>
  );
}

export function SegmentedControl({
  options,
  activeIndex = 0,
}: {
  options: string[];
  activeIndex?: number;
}) {
  const compact = options.length > 3;

  return (
    <View style={{ flexDirection: "row", gap: spacing.xsmall }}>
      {options.map((option, index) => {
        const isActive = index === activeIndex;

        return (
          <Pressable
            accessibilityRole="button"
            key={option}
            style={{
              alignItems: "center",
              backgroundColor: isActive ? colors.teal : colors.surfaceSoft,
              borderRadius: radii.pill,
              flex: 1,
              justifyContent: "center",
              minHeight: 42,
            }}
          >
            <Text
              selectable
              style={{
                color: isActive ? colors.white : colors.subtleText,
                fontSize: compact ? 12 : 13,
                fontWeight: "800",
              }}
            >
              {option}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function ActionButton({
  children,
  tone = "primary",
}: {
  children: string;
  tone?: "primary" | "danger";
}) {
  const isDanger = tone === "danger";

  return (
    <Pressable
      accessibilityRole="button"
      style={{
        alignItems: "center",
        backgroundColor: isDanger ? "rgba(157, 75, 63, 0.11)" : colors.teal,
        borderColor: isDanger ? "rgba(157, 75, 63, 0.24)" : colors.teal,
        borderRadius: radii.pill,
        borderWidth: isDanger ? 1 : 0,
        justifyContent: "center",
        minHeight: isDanger ? 48 : 52,
      }}
    >
      <Text
        selectable
        style={{
          color: isDanger ? colors.danger : colors.white,
          fontSize: 15,
          fontWeight: "800",
        }}
      >
        {children}
      </Text>
    </Pressable>
  );
}

export function Panel({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "soft" | "warm";
}) {
  const backgroundColor =
    tone === "warm" ? colors.surfaceWarm : tone === "soft" ? colors.surfaceSoft : colors.surface;
  const borderColor = tone === "warm" ? "rgba(217, 173, 83, 0.28)" : colors.border;

  return (
    <View
      style={{
        backgroundColor,
        borderColor,
        borderRadius: radii.panel,
        borderWidth: 1,
        gap: spacing.medium,
        padding: spacing.medium,
        boxShadow: "0 18px 40px rgba(63, 49, 33, 0.07)",
      }}
    >
      {children}
    </View>
  );
}

export function SectionHeader({
  label,
  title,
  description,
  titleSize = 24,
}: {
  label: string;
  title: string;
  description?: string;
  titleSize?: number;
}) {
  return (
    <View style={{ gap: spacing.xsmall }}>
      <SectionLabel>{label}</SectionLabel>
      <Text selectable style={{ color: colors.text, fontSize: titleSize, fontWeight: "800" }}>
        {title}
      </Text>
      {description ? (
        <Text selectable style={{ color: colors.subtleText, fontSize: 14, lineHeight: 21 }}>
          {description}
        </Text>
      ) : null}
    </View>
  );
}

export function StateNotice({
  state,
  title,
  detail,
}: {
  state: "loading" | "empty" | "error" | "success";
  title: string;
  detail: string;
}) {
  const tone = {
    loading: { label: "Loading", background: colors.surfaceCool, color: colors.teal },
    empty: { label: "Empty", background: colors.surfaceSoft, color: colors.subtleText },
    error: { label: "Error", background: "rgba(157, 75, 63, 0.09)", color: colors.danger },
    success: { label: "Success", background: "rgba(95, 154, 152, 0.12)", color: colors.teal },
  }[state];

  return (
    <View
      style={{
        backgroundColor: tone.background,
        borderColor: colors.border,
        borderRadius: radii.row,
        borderWidth: 1,
        gap: spacing.xsmall,
        padding: spacing.medium,
      }}
    >
      <Text selectable style={{ color: tone.color, fontSize: 11, fontWeight: "800" }}>
        {tone.label}
      </Text>
      <Text selectable style={{ color: colors.text, fontSize: 15, fontWeight: "800" }}>
        {title}
      </Text>
      <Text selectable style={{ color: colors.subtleText, fontSize: 13, lineHeight: 18 }}>
        {detail}
      </Text>
    </View>
  );
}

export function ScreenHero({
  label,
  title,
  description,
  status,
}: {
  label: string;
  title: string;
  description: string;
  status: string;
}) {
  return (
    <Panel>
      <View style={{ flexDirection: "row", justifyContent: "space-between", gap: spacing.medium }}>
        <View style={{ flex: 1, gap: spacing.xsmall }}>
          <SectionLabel>{label}</SectionLabel>
          <Text selectable style={{ color: colors.text, fontSize: 34, fontWeight: "800", lineHeight: 38 }}>
            {title}
          </Text>
          <Text selectable style={{ color: colors.subtleText, fontSize: 15, lineHeight: 22 }}>
            {description}
          </Text>
        </View>
        <StatusPill>{status}</StatusPill>
      </View>
    </Panel>
  );
}

export function RouteRail({
  active,
}: {
  active: "home" | "chat" | "personality" | "settings" | "tools";
}) {
  return (
    <View
      style={{
        backgroundColor: "rgba(255, 250, 242, 0.86)",
        borderColor: colors.border,
        borderRadius: radii.panel,
        borderWidth: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        gap: spacing.small,
        padding: spacing.small,
      }}
    >
      {routeLinks.map((route) => {
        const isActive = active === "home" ? route.href === "/" : route.href === `/${active}`;
        return (
          <Link href={route.href} key={route.label} asChild>
            <Pressable
              accessibilityRole="button"
              style={{
                alignItems: "center",
                backgroundColor: isActive ? colors.teal : colors.surfaceSoft,
                borderColor: isActive ? colors.teal : colors.border,
                borderRadius: radii.pill,
                borderWidth: 1,
                flex: 1,
                justifyContent: "center",
                minHeight: 42,
                minWidth: "30%",
                paddingHorizontal: spacing.small,
              }}
            >
              <Text
                selectable
                style={{
                  color: isActive ? colors.white : colors.subtleText,
                  fontSize: 13,
                  fontWeight: "800",
                }}
              >
                {route.label}
              </Text>
            </Pressable>
          </Link>
        );
      })}
    </View>
  );
}
