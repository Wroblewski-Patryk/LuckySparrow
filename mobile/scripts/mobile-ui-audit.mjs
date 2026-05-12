import { createServer } from "node:http";
import { spawn } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const MOBILE_ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const REPO_ROOT = resolve(MOBILE_ROOT, "..");
const EXPORT_ROOT = join(MOBILE_ROOT, ".expo-web-export");
const INDEX = join(EXPORT_ROOT, "index.html");
const DEFAULT_ARTIFACT_DIR = join(
  REPO_ROOT,
  ".codex",
  "artifacts",
  "prj1164-mobile-ui-audit",
);

const ROUTES = [
  { path: "/", slug: "home", expectedText: "Conversation first." },
  { path: "/chat", slug: "chat", expectedText: "Shared thread" },
  { path: "/personality", slug: "personality", expectedText: "Embodied state map" },
  { path: "/settings", slug: "settings", expectedText: "Personalize the shell" },
  { path: "/tools", slug: "tools", expectedText: "Capability without clutter" },
];

const VIEWPORTS = [
  { name: "phone", width: 390, height: 1200 },
  { name: "tablet", width: 820, height: 1180 },
];
const ACTION_PROOFS = [
  { path: "/chat", slug: "chat", expectedText: "Send" },
  { path: "/settings", slug: "settings", expectedText: "Review reset boundary" },
  { path: "/tools", slug: "tools", expectedText: "Review preferences" },
];
const STATE_PROOFS = [
  { path: "/tools", slug: "tools", expectedText: "Preparing capability list" },
  { path: "/tools", slug: "tools", expectedText: "No tools available yet" },
  { path: "/tools", slug: "tools", expectedText: "Capability status unavailable" },
  { path: "/tools", slug: "tools", expectedText: "Capabilities ready" },
];
const keepExport = process.argv.includes("--keep-export");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

function optionValue(name) {
  const index = process.argv.indexOf(name);
  if (index === -1) {
    return "";
  }
  return process.argv[index + 1] ?? "";
}

function resolveArtifactPath(value) {
  if (!value) {
    return DEFAULT_ARTIFACT_DIR;
  }
  return resolve(REPO_ROOT, value);
}

function findChrome() {
  const explicit = process.env.CHROME_PATH || process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
  const candidates = [
    explicit,
    join(
      process.env.LOCALAPPDATA ?? "",
      "ms-playwright",
      "chromium_headless_shell-1187",
      "chrome-win",
      "headless_shell.exe",
    ),
    "chrome",
    "chromium",
    "chromium-browser",
  ].filter(Boolean);

  return candidates.find((candidate) => candidate && (existsSync(candidate) || !candidate.includes("\\")));
}

function sendFile(response, filePath) {
  const extension = extname(filePath);
  response.writeHead(200, {
    "Content-Type": MIME_TYPES[extension] ?? "application/octet-stream",
  });
  response.end(readFileSync(filePath));
}

function createFallbackServer() {
  return createServer((request, response) => {
    const url = new URL(request.url ?? "/", "http://127.0.0.1");
    const cleanPath = decodeURIComponent(url.pathname).replace(/^\/+/, "");
    const candidate = resolve(EXPORT_ROOT, cleanPath);
    const isInsideExport = candidate.startsWith(EXPORT_ROOT);
    if (isInsideExport && existsSync(candidate) && statSync(candidate).isFile()) {
      sendFile(response, candidate);
      return;
    }
    sendFile(response, INDEX);
  });
}

function listen(server, port) {
  return new Promise((resolveListen, rejectListen) => {
    server.once("error", rejectListen);
    server.listen(port, "127.0.0.1", () => resolveListen());
  });
}

function close(server) {
  return new Promise((resolveClose) => server.close(() => resolveClose()));
}

function run(command, args, timeoutMs = 45000) {
  return new Promise((resolveRun) => {
    const child = spawn(command, args, { windowsHide: true });
    let stdout = "";
    let stderr = "";
    let settled = false;
    const finish = (result) => {
      if (settled) {
        return;
      }
      settled = true;
      clearTimeout(timeout);
      resolveRun(result);
    };
    const timeout = setTimeout(() => {
      child.kill("SIGKILL");
      finish({ code: 1, stdout, stderr: `${stderr}\nTimed out after ${timeoutMs}ms` });
    }, timeoutMs);

    child.stdout?.on("data", (chunk) => {
      stdout += chunk;
    });
    child.stderr?.on("data", (chunk) => {
      stderr += chunk;
    });
    child.on("close", (code) => finish({ code, stdout, stderr }));
    child.on("error", (error) => finish({ code: 1, stdout, stderr: String(error) }));
  });
}

async function main() {
  if (!existsSync(INDEX)) {
    throw new Error("Missing Expo web export. Run `npx expo export --platform web --output-dir .expo-web-export` first.");
  }

  const artifactDir = resolveArtifactPath(optionValue("--artifacts"));
  const reportPath = resolve(artifactDir, "report.json");
  const port = Number(optionValue("--port") || "8090");
  const chrome = findChrome();

  if (!chrome) {
    throw new Error("No Chromium executable found. Set CHROME_PATH to run the mobile UI audit.");
  }

  mkdirSync(artifactDir, { recursive: true });
  for (const entry of readdirSync(artifactDir)) {
    if (entry.endsWith(".png") || entry === "report.json") {
      rmSync(join(artifactDir, entry), { force: true });
    }
  }

  const server = createFallbackServer();
  await listen(server, port);

  const results = [];
  const actionResults = [];
  const stateResults = [];
  const domByPath = new Map();

  async function domFor(path) {
    const existing = domByPath.get(path);
    if (existing) {
      return existing;
    }

    const url = `http://127.0.0.1:${port}${path}`;
    const result = await run(chrome, [
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      "--no-default-browser-check",
      "--virtual-time-budget=10000",
      "--dump-dom",
      url,
    ]);
    domByPath.set(path, result);
    return result;
  }

  try {
    for (const route of ROUTES) {
      const url = `http://127.0.0.1:${port}${route.path}`;
      const dumpResult = await domFor(route.path);

      const textPresent = dumpResult.stdout.includes(route.expectedText);

      for (const viewport of VIEWPORTS) {
        const screenshot = join(
          artifactDir,
          `mobile-${route.slug}-${viewport.name}-${viewport.width}x${viewport.height}.png`,
        );
        const screenshotResult = await run(chrome, [
          "--headless=new",
          "--disable-gpu",
          "--hide-scrollbars",
          "--no-first-run",
          "--no-default-browser-check",
          "--run-all-compositor-stages-before-draw",
          "--virtual-time-budget=10000",
          `--window-size=${viewport.width},${viewport.height}`,
          `--screenshot=${screenshot}`,
          url,
        ]);

        const screenshotExists = existsSync(screenshot);
        const screenshotSize = screenshotExists ? statSync(screenshot).size : 0;

        results.push({
          route: route.path,
          slug: route.slug,
          viewport: viewport.name,
          viewport_size: {
            width: viewport.width,
            height: viewport.height,
          },
          expected_text: route.expectedText,
          expected_text_present: textPresent,
          screenshot: screenshot.replace(REPO_ROOT, "").replace(/^\\/, ""),
          screenshot_bytes: screenshotSize,
          screenshot_ok: screenshotResult.code === 0 && screenshotSize > 1024,
          dom_ok: dumpResult.code === 0 && textPresent,
        });
      }
    }

    for (const actionProof of ACTION_PROOFS) {
      const dumpResult = await domFor(actionProof.path);
      const expectedTextPresent = dumpResult.stdout.includes(actionProof.expectedText);

      actionResults.push({
        route: actionProof.path,
        slug: actionProof.slug,
        expected_text: actionProof.expectedText,
        expected_text_present: expectedTextPresent,
        dom_ok: dumpResult.code === 0 && expectedTextPresent,
      });
    }

    for (const stateProof of STATE_PROOFS) {
      const dumpResult = await domFor(stateProof.path);
      const expectedTextPresent = dumpResult.stdout.includes(stateProof.expectedText);

      stateResults.push({
        route: stateProof.path,
        slug: stateProof.slug,
        expected_text: stateProof.expectedText,
        expected_text_present: expectedTextPresent,
        dom_ok: dumpResult.code === 0 && expectedTextPresent,
      });
    }
  } finally {
    await close(server);
  }

  const failedRoutes = results.filter((result) => !result.screenshot_ok || !result.dom_ok);
  const failedActions = actionResults.filter((result) => !result.dom_ok);
  const failedStates = stateResults.filter((result) => !result.dom_ok);
  const failed = [...failedRoutes, ...failedActions, ...failedStates];
  const report = {
    status: failed.length === 0 ? "ok" : "failed",
    route_count: ROUTES.length,
    viewport_count: VIEWPORTS.length,
    action_proof_count: ACTION_PROOFS.length,
    state_proof_count: STATE_PROOFS.length,
    screenshot_count: results.length,
    viewports: VIEWPORTS,
    artifact_dir: artifactDir.replace(REPO_ROOT, "").replace(/^\\/, ""),
    export_cleaned: !keepExport,
    failed_count: failed.length,
    routes: results,
    action_proofs: actionResults,
    state_proofs: stateResults,
  };

  writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(JSON.stringify(report, null, 2));

  if (!keepExport && existsSync(EXPORT_ROOT)) {
    rmSync(EXPORT_ROOT, { recursive: true, force: true });
  }

  if (failed.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
