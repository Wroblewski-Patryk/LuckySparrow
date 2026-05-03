import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const DIST = join(ROOT, "dist");
const INDEX = join(DIST, "index.html");

const ROUTES = [
  { path: "/", marker: "aion-public-home", authenticated: false },
  { path: "/login", marker: "aion-public-home", authenticated: false },
  { path: "/dashboard", marker: "aion-dashboard-canvas", authenticated: true },
  { path: "/chat", marker: "aion-chat-workspace", authenticated: true },
  { path: "/memory", marker: "aion-memory-canvas", authenticated: true },
  { path: "/reflections", marker: "aion-reflections-canvas", authenticated: true },
  { path: "/plans", marker: "aion-plans-canvas", authenticated: true },
  { path: "/goals", marker: "aion-goals-canvas", authenticated: true },
  { path: "/insights", marker: "aion-insights-canvas", authenticated: true },
  { path: "/automations", marker: "aion-automations-canvas", authenticated: true },
  { path: "/integrations", marker: "aion-integrations-canvas", authenticated: true },
  { path: "/settings", marker: "aion-settings-canvas", authenticated: true },
  { path: "/tools", marker: "aion-tools-canvas", authenticated: true },
  { path: "/personality", marker: "aion-personality-canvas", authenticated: true },
];

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

function jsonResponse(response, status, payload) {
  const body = JSON.stringify(payload);
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
  });
  response.end(body);
}

function mockApi(request, response) {
  const url = new URL(request.url ?? "/", "http://127.0.0.1");
  const referer = request.headers.referer ?? "";
  const isLoginRoute = referer.endsWith("/login") || referer.endsWith("/");

  if (request.method === "GET" && url.pathname === "/app/me") {
    if (isLoginRoute) {
      jsonResponse(response, 401, { detail: "Unauthenticated route smoke." });
      return true;
    }
    jsonResponse(response, 200, {
      user: {
        id: "route-smoke-user",
        email: "route-smoke@example.com",
        display_name: "Route Smoke",
      },
      settings: {
        preferred_language: "en",
        ui_language: "en",
        utc_offset: "UTC+00:00",
        proactive_opt_in: true,
      },
    });
    return true;
  }

  if (request.method === "GET" && url.pathname === "/app/chat/history") {
    jsonResponse(response, 200, {
      items: [
        {
          message_id: "route-smoke:user",
          event_id: "route-smoke",
          role: "user",
          text: "Route smoke user turn",
          channel: "api",
          timestamp: "2026-05-03T12:00:00.000Z",
          metadata: null,
        },
        {
          message_id: "route-smoke:assistant",
          event_id: "route-smoke",
          role: "assistant",
          text: "Route smoke assistant reply",
          channel: "api",
          timestamp: "2026-05-03T12:00:02.000Z",
          metadata: { language: "en" },
        },
      ],
    });
    return true;
  }

  if (request.method === "GET" && url.pathname === "/app/personality/overview") {
    jsonResponse(response, 200, {
      user_id: "route-smoke-user",
      recent_activity: [
        {
          event_id: "route-smoke-activity",
          title: "Route smoke activity",
          timestamp: "2026-05-03T12:00:00Z",
          source: "api",
          importance: 0.72,
        },
      ],
      identity_state: {
        profile: { preferred_language: "en" },
        preference_summary: { learned_preference_count: 1 },
      },
      learned_knowledge: {
        knowledge_summary: {
          semantic_conclusion_count: 1,
          affective_conclusion_count: 1,
        },
      },
      planning_state: {
        active_goals: [],
        active_tasks: [],
        pending_proposals: [],
        continuity_summary: {
          active_goal_count: 0,
          active_task_count: 0,
          blocked_task_count: 0,
          active_milestone_count: 0,
          pending_proposal_count: 0,
          primary_goal_names: [],
          primary_task_names: [],
        },
      },
      role_skill_state: {
        selection_visibility_summary: {
          catalog_skill_count: 5,
          runtime_selection_surface: "available",
        },
      },
      capability_catalog: {
        tool_and_connector_posture: {
          organizer_stack_state: "provider_credentials_missing",
          selectable_tool_families: ["calendar", "task_system", "cloud_drive"],
        },
      },
      api_readiness: {
        product_stage: "route_smoke",
        internal_inspection_path: "available",
      },
    });
    return true;
  }

  if (request.method === "GET" && url.pathname === "/app/tools/overview") {
    jsonResponse(response, 200, {
      policy_owner: "app_tools_overview_contract",
      user_id: "route-smoke-user",
      group_order: ["communication", "task_management"],
      summary: {
        total_groups: 2,
        total_items: 2,
        integral_enabled_count: 1,
        provider_ready_count: 1,
        provider_blocked_count: 1,
        link_required_count: 1,
        planned_placeholder_count: 0,
      },
      groups: [
        {
          id: "communication",
          title: "Communication",
          description: "Route smoke communication tools.",
          item_count: 1,
          items: [
            {
              id: "internal_chat",
              label: "Internal chat",
              category: "communication",
              kind: "channel",
              description: "Built-in chat channel.",
              status: "integral_active",
              status_reason: "Available inside the product shell.",
              enabled: true,
              integral: true,
              provider: { name: "internal", ready: true, configured: true },
              user_control: { toggle_allowed: false, preference_supported: false, requested_enabled: null },
              link_required: false,
              link_state: "not_required",
              capabilities: ["chat"],
              next_actions: [],
              source_of_truth: ["app_tools_overview_contract"],
            },
          ],
        },
        {
          id: "task_management",
          title: "Task management",
          description: "Route smoke task tools.",
          item_count: 1,
          items: [
            {
              id: "clickup",
              label: "ClickUp",
              category: "task_management",
              kind: "provider",
              description: "Task provider readiness row.",
              status: "provider_blocked",
              status_reason: "Provider credentials are not configured in route smoke.",
              enabled: false,
              integral: false,
              provider: { name: "clickup", ready: false, configured: false },
              user_control: { toggle_allowed: true, preference_supported: true, requested_enabled: false },
              link_required: false,
              link_state: "not_required",
              capabilities: ["create_task", "list_tasks"],
              next_actions: ["configure_provider_credentials"],
              source_of_truth: ["connector_execution_baseline"],
            },
          ],
        },
      ],
    });
    return true;
  }

  if (request.method === "GET" && url.pathname === "/health") {
    jsonResponse(response, 200, {
      status: "ok",
      conversation_channels: {
        telegram: {
          round_trip_ready: false,
          round_trip_state: "route_smoke",
        },
      },
      attention: {
        pending: 0,
        claimed: 0,
        answered: 0,
      },
      proactive: {
        scheduler_tick_summary: {},
      },
    });
    return true;
  }

  return false;
}

function serveStatic(request, response) {
  const url = new URL(request.url ?? "/", "http://127.0.0.1");
  let filePath = normalize(join(DIST, decodeURIComponent(url.pathname)));
  if (!filePath.startsWith(DIST)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }
  if (url.pathname === "/" || !existsSync(filePath)) {
    filePath = INDEX;
  }
  const body = readFileSync(filePath);
  const contentType = MIME_TYPES[extname(filePath)] ?? "application/octet-stream";
  response.writeHead(200, {
    "Content-Type": contentType,
    "Content-Length": body.length,
  });
  response.end(body);
}

function startServer() {
  const server = createServer((request, response) => {
    if (mockApi(request, response)) {
      return;
    }
    serveStatic(request, response);
  });
  return new Promise((resolveServer) => {
    server.listen(0, "127.0.0.1", () => resolveServer(server));
  });
}

function chromePath() {
  const configured = process.env.CHROME_PATH;
  const candidates = [
    configured,
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "google-chrome",
    "chromium",
    "chromium-browser",
  ].filter(Boolean);
  for (const candidate of candidates) {
    if (candidate.includes("\\") || candidate.includes("/")) {
      if (existsSync(candidate)) {
        return candidate;
      }
      continue;
    }
    return candidate;
  }
  throw new Error("Chrome/Edge executable was not found. Set CHROME_PATH to run the route smoke.");
}

function dumpDom(executable, url) {
  return new Promise((resolveDump, rejectDump) => {
    const child = spawn(
      executable,
      [
        "--headless=new",
        "--disable-gpu",
        "--disable-extensions",
        "--disable-background-networking",
        "--no-first-run",
        "--no-default-browser-check",
        "--virtual-time-budget=5000",
        "--dump-dom",
        url,
      ],
      { windowsHide: true },
    );
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    child.on("error", rejectDump);
    child.on("close", (code) => {
      if (code !== 0) {
        rejectDump(new Error(`Chrome exited with ${code}: ${stderr}`));
        return;
      }
      resolveDump(stdout);
    });
  });
}

if (!existsSync(INDEX)) {
  console.error("web/dist/index.html is missing. Run `npm run build` before `npm run smoke:routes`.");
  process.exit(1);
}

const server = await startServer();
try {
  const address = server.address();
  const baseUrl = `http://${address.address}:${address.port}`;
  const executable = chromePath();
  const results = [];
  for (const route of ROUTES) {
    const dom = await dumpDom(executable, `${baseUrl}${route.path}`);
    const passed = dom.includes(route.marker);
    results.push({
      route: route.path,
      marker: route.marker,
      authenticated: route.authenticated,
      passed,
      diagnostic_excerpt: passed ? "" : dom.replace(/\s+/g, " ").slice(0, 320),
    });
  }
  const failed = results.filter((result) => !result.passed);
  const report = {
    kind: "frontend_route_smoke_report",
    schema_version: 1,
    route_count: results.length,
    status: failed.length === 0 ? "ok" : "failed",
    results,
  };
  console.log(JSON.stringify(report, null, 2));
  process.exitCode = failed.length === 0 ? 0 : 1;
} finally {
  await new Promise((resolveClose) => server.close(resolveClose));
}
