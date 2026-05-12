import { Stack } from "expo-router";

import { colors } from "@/theme";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: colors.canvas,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontSize: 17,
          fontWeight: "800",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "AION",
        }}
      />
      <Stack.Screen
        name="chat"
        options={{
          title: "Chat",
        }}
      />
      <Stack.Screen
        name="settings"
        options={{
          title: "Settings",
        }}
      />
      <Stack.Screen
        name="tools"
        options={{
          title: "Tools",
        }}
      />
      <Stack.Screen
        name="personality"
        options={{
          title: "Personality",
        }}
      />
    </Stack>
  );
}
