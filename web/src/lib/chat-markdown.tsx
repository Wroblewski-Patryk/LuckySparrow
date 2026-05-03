import type { ReactNode } from "react";

function renderInlineMarkdown(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let index = 0;
  let nodeIndex = 0;

  while (index < text.length) {
    const nextCode = text.indexOf("`", index);
    const nextBold = text.indexOf("**", index);
    const nextItalic = text.indexOf("*", index);
    const candidates = [
      nextCode >= 0 ? { marker: "`", index: nextCode } : null,
      nextBold >= 0 ? { marker: "**", index: nextBold } : null,
      nextItalic >= 0 ? { marker: "*", index: nextItalic } : null,
    ]
      .filter((candidate): candidate is { marker: string; index: number } => Boolean(candidate))
      .sort((left, right) => left.index - right.index || right.marker.length - left.marker.length);

    const next = candidates[0];
    if (!next) {
      nodes.push(text.slice(index));
      break;
    }

    if (next.index > index) {
      nodes.push(text.slice(index, next.index));
    }

    if (next.marker === "`") {
      const end = text.indexOf("`", next.index + 1);
      if (end < 0) {
        nodes.push(text.slice(next.index));
        break;
      }
      nodes.push(<code key={`${keyPrefix}-code-${nodeIndex++}`}>{text.slice(next.index + 1, end)}</code>);
      index = end + 1;
      continue;
    }

    if (next.marker === "**") {
      const end = text.indexOf("**", next.index + 2);
      if (end < 0) {
        nodes.push(text.slice(next.index));
        break;
      }
      nodes.push(
        <strong key={`${keyPrefix}-bold-${nodeIndex++}`}>
          {renderInlineMarkdown(text.slice(next.index + 2, end), `${keyPrefix}-bold-${nodeIndex}`)}
        </strong>,
      );
      index = end + 2;
      continue;
    }

    const previous = next.index > 0 ? text[next.index - 1] : "";
    const following = text[next.index + 1] ?? "";
    if (previous === "*" || following === "*") {
      nodes.push("*");
      index = next.index + 1;
      continue;
    }
    const end = text.indexOf("*", next.index + 1);
    if (end < 0) {
      nodes.push(text.slice(next.index));
      break;
    }
    nodes.push(
      <em key={`${keyPrefix}-italic-${nodeIndex++}`}>
        {renderInlineMarkdown(text.slice(next.index + 1, end), `${keyPrefix}-italic-${nodeIndex}`)}
      </em>,
    );
    index = end + 1;
  }

  return nodes;
}

function renderMarkdownLines(text: string, keyPrefix: string): ReactNode[] {
  return text.split("\n").flatMap((line, index, lines) => {
    const inline = renderInlineMarkdown(line, `${keyPrefix}-line-${index}`);
    if (index === lines.length - 1) {
      return inline;
    }
    return [...inline, <br key={`${keyPrefix}-br-${index}`} />];
  });
}

export function renderChatMarkdown(text: string): ReactNode {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let index = 0;
  let blockIndex = 0;

  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (line.trim().startsWith("```")) {
      const codeLines: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }
      if (index < lines.length) {
        index += 1;
      }
      blocks.push(
        <pre key={`code-${blockIndex++}`}>
          <code>{codeLines.join("\n")}</code>
        </pre>,
      );
      continue;
    }

    const unorderedMatch = line.match(/^\s*[-*+]\s+(.+)$/);
    const orderedMatch = line.match(/^\s*\d+[.)]\s+(.+)$/);
    if (unorderedMatch || orderedMatch) {
      const ordered = Boolean(orderedMatch);
      const items: ReactNode[] = [];
      while (index < lines.length) {
        const current = lines[index];
        const itemMatch = ordered
          ? current.match(/^\s*\d+[.)]\s+(.+)$/)
          : current.match(/^\s*[-*+]\s+(.+)$/);
        if (!itemMatch) {
          break;
        }
        items.push(
          <li key={`item-${blockIndex}-${items.length}`}>
            {renderMarkdownLines(itemMatch[1], `item-${blockIndex}-${items.length}`)}
          </li>,
        );
        index += 1;
      }
      const ListTag = ordered ? "ol" : "ul";
      blocks.push(<ListTag key={`list-${blockIndex++}`}>{items}</ListTag>);
      continue;
    }

    const paragraphLines: string[] = [];
    while (index < lines.length) {
      const current = lines[index];
      if (!current.trim() || current.trim().startsWith("```") || /^\s*([-*+]|\d+[.)])\s+/.test(current)) {
        break;
      }
      paragraphLines.push(current);
      index += 1;
    }
    blocks.push(
      <p key={`paragraph-${blockIndex++}`}>
        {renderMarkdownLines(paragraphLines.join("\n"), `paragraph-${blockIndex}`)}
      </p>,
    );
  }

  return blocks.length > 0 ? blocks : <p>{text}</p>;
}
