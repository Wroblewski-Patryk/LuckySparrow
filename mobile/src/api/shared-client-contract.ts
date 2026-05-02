export type AppResourceContract = {
  id: string;
  label: string;
  endpoint: string;
  boundary: "auth" | "settings" | "chat" | "personality" | "tools";
};

export const APP_RESOURCE_CONTRACTS: AppResourceContract[] = [
  {
    id: "auth-register",
    label: "Register",
    endpoint: "POST /app/auth/register",
    boundary: "auth",
  },
  {
    id: "auth-login",
    label: "Login",
    endpoint: "POST /app/auth/login",
    boundary: "auth",
  },
  {
    id: "auth-logout",
    label: "Logout",
    endpoint: "POST /app/auth/logout",
    boundary: "auth",
  },
  {
    id: "me",
    label: "Current user",
    endpoint: "GET /app/me",
    boundary: "auth",
  },
  {
    id: "settings",
    label: "Settings",
    endpoint: "PATCH /app/me/settings",
    boundary: "settings",
  },
  {
    id: "chat-history",
    label: "Shared transcript",
    endpoint: "GET /app/chat/history",
    boundary: "chat",
  },
  {
    id: "chat-message",
    label: "Send chat message",
    endpoint: "POST /app/chat/message",
    boundary: "chat",
  },
  {
    id: "personality-overview",
    label: "Personality overview",
    endpoint: "GET /app/personality/overview",
    boundary: "personality",
  },
  {
    id: "tools-overview",
    label: "Tools overview",
    endpoint: "GET /app/tools/overview",
    boundary: "tools",
  },
  {
    id: "tools-preferences",
    label: "Tool preferences",
    endpoint: "PATCH /app/tools/preferences",
    boundary: "tools",
  },
  {
    id: "telegram-link-start",
    label: "Telegram link start",
    endpoint: "POST /app/tools/telegram/link/start",
    boundary: "tools",
  },
];
