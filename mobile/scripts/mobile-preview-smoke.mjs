import { spawn } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const MOBILE_ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const REPO_ROOT = resolve(MOBILE_ROOT, "..");
const DEFAULT_ARTIFACT_DIR = join(
  REPO_ROOT,
  ".codex",
  "artifacts",
  "prj1177-mobile-ui-preview-smoke",
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

function optionValue(name, fallback = "") {
  const index = process.argv.indexOf(name);
  if (index === -1) {
    return fallback;
  }
  return process.argv[index + 1] ?? fallback;
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

async function httpStatus(url) {
  try {
    const response = await fetch(url);
    await response.arrayBuffer();
    return response.status;
  } catch {
    return 0;
  }
}

async function previewHealth(baseUrl) {
  try {
    const response = await fetch(`${baseUrl}/__preview_health`);
    const payload = await response.json();
    return {
      status: response.status,
      app: payload.app,
      route_count: payload.route_count,
      ok:
        response.status === 200 &&
        payload.app === "aviary-mobile-ui-preview" &&
        payload.status === "ok" &&
        payload.route_count === ROUTES.length,
    };
  } catch {
    return { status: 0, app: "", route_count: 0, ok: false };
  }
}

async function main() {
  const baseUrl = optionValue("--base-url", process.env.MOBILE_PREVIEW_URL || "http://127.0.0.1:8093").replace(/\/$/, "");
  const artifactDir = resolve(REPO_ROOT, optionValue("--artifacts", DEFAULT_ARTIFACT_DIR));
  const reportPath = resolve(artifactDir, "report.json");
  const chrome = findChrome();

  if (!chrome) {
    throw new Error("No Chromium executable found. Set CHROME_PATH to run the mobile preview smoke.");
  }

  mkdirSync(artifactDir, { recursive: true });
  for (const entry of readdirSync(artifactDir)) {
    if (entry.endsWith(".png") || entry === "report.json") {
      rmSync(join(artifactDir, entry), { force: true });
    }
  }

  const results = [];
  const health = await previewHealth(baseUrl);

  for (const route of ROUTES) {
    const url = `${baseUrl}${route.path}`;
    const status = await httpStatus(url);
    const dumpResult = await run(chrome, [
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      "--no-default-browser-check",
      "--virtual-time-budget=10000",
      "--dump-dom",
      url,
    ]);
    const expectedTextPresent = dumpResult.stdout.includes(route.expectedText);
    for (const viewport of VIEWPORTS) {
      const screenshot = join(
        artifactDir,
        `preview-${route.slug}-${viewport.name}-${viewport.width}x${viewport.height}.png`,
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
      const screenshotBytes = screenshotExists ? statSync(screenshot).size : 0;

      results.push({
        route: route.path,
        slug: route.slug,
        url,
        status,
        viewport: viewport.name,
        viewport_size: {
          width: viewport.width,
          height: viewport.height,
        },
        expected_text: route.expectedText,
        expected_text_present: expectedTextPresent,
        screenshot: screenshot.replace(REPO_ROOT, "").replace(/^\\/, ""),
        screenshot_bytes: screenshotBytes,
        screenshot_ok: screenshotResult.code === 0 && screenshotBytes > 1024,
        dom_ok: dumpResult.code === 0 && expectedTextPresent,
        http_ok: status === 200,
      });
    }
  }

  const failed = results.filter((result) => !result.http_ok || !result.dom_ok || !result.screenshot_ok);
  if (!health.ok) {
    failed.push({ route: "/__preview_health", http_ok: false, dom_ok: false, screenshot_ok: false });
  }
  const report = {
    status: failed.length === 0 ? "ok" : "failed",
    base_url: baseUrl,
    preview_health: health,
    route_count: ROUTES.length,
    viewport_count: VIEWPORTS.length,
    screenshot_count: results.length,
    viewports: VIEWPORTS,
    artifact_dir: artifactDir.replace(REPO_ROOT, "").replace(/^\\/, ""),
    failed_count: failed.length,
    routes: results,
  };

  writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(JSON.stringify(report, null, 2));

  if (failed.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
