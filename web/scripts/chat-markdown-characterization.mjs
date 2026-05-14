import { build } from "esbuild";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";

const workspaceRoot = process.cwd();
const tempDir = await mkdtemp(join(tmpdir(), "aion-chat-markdown-"));
const entryPath = join(tempDir, "entry.tsx");
const bundlePath = join(tempDir, "bundle.cjs");
const require = createRequire(import.meta.url);

const entrySource = `
  import { renderToStaticMarkup } from ${JSON.stringify(`${workspaceRoot.replaceAll("\\", "/")}/node_modules/react-dom/server.node.js`)};
  import { renderChatMarkdown } from ${JSON.stringify(`${workspaceRoot.replaceAll("\\", "/")}/src/lib/chat-markdown.tsx`)};

  const cases = [
    {
      name: "inline emphasis and code",
      input: "Use \`token\` with **bold** and *soft* text.",
      includes: ["<code>token</code>", "<strong>bold</strong>", "<em>soft</em>"],
    },
    {
      name: "unordered list",
      input: "- first\\n- second",
      includes: ["<ul>", "<li>first</li>", "<li>second</li>", "</ul>"],
    },
    {
      name: "ordered list",
      input: "1. alpha\\n2. beta",
      includes: ["<ol>", "<li>alpha</li>", "<li>beta</li>", "</ol>"],
    },
    {
      name: "ordered list continuation",
      input: "1. alpha\\n   still alpha\\n2. beta",
      includes: ["<ol>", "<li>alpha<br/>still alpha</li>", "<li>beta</li>", "</ol>"],
    },
    {
      name: "unordered list continuation",
      input: "- first\\n  still first\\n- second",
      includes: ["<ul>", "<li>first<br/>still first</li>", "<li>second</li>", "</ul>"],
    },
    {
      name: "fenced code block",
      input: "\`\`\`\\nhello()\\n\`\`\`",
      includes: ["<pre><code>hello()</code></pre>"],
    },
    {
      name: "paragraph line break",
      input: "hello\\nworld",
      includes: ["<p>hello<br/>world</p>"],
    },
  ];

  for (const current of cases) {
    const html = renderToStaticMarkup(renderChatMarkdown(current.input));
    for (const expected of current.includes) {
      if (!html.includes(expected)) {
        throw new Error(\`\${current.name}: expected \${JSON.stringify(expected)} in \${html}\`);
      }
    }
  }

  console.log(JSON.stringify({
    kind: "chat_markdown_characterization_report",
    schema_version: 1,
    case_count: cases.length,
    status: "ok",
  }, null, 2));
`;

try {
  await writeFile(entryPath, entrySource, "utf8");
  await build({
    entryPoints: [entryPath],
    bundle: true,
    outfile: bundlePath,
    format: "cjs",
    platform: "node",
    jsx: "automatic",
  });
  require(bundlePath);
} finally {
  await rm(tempDir, { force: true, recursive: true });
}
