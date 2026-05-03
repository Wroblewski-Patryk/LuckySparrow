export type RoutePath =
  | "/login"
  | "/dashboard"
  | "/chat"
  | "/memory"
  | "/reflections"
  | "/plans"
  | "/goals"
  | "/insights"
  | "/automations"
  | "/integrations"
  | "/settings"
  | "/personality"
  | "/tools";

export const ROUTES: RoutePath[] = [
  "/dashboard",
  "/chat",
  "/personality",
  "/memory",
  "/reflections",
  "/plans",
  "/goals",
  "/insights",
  "/automations",
  "/integrations",
  "/tools",
  "/settings",
];

export function normalizeRoute(pathname: string): RoutePath {
  if (pathname === "/dashboard") {
    return "/dashboard";
  }
  if (pathname === "/") {
    return "/login";
  }
  if (ROUTES.includes(pathname as RoutePath)) {
    return pathname as RoutePath;
  }
  return "/login";
}

export function navigate(path: RoutePath) {
  if (window.location.pathname !== path) {
    window.history.pushState({}, "", path);
  }
}

export function navigatePublicEntry(path: "/" | "/login") {
  if (window.location.pathname !== path) {
    window.history.pushState({}, "", path);
  }
}
