import type {
  Content,
  Heading,
  Image,
  Link,
  List,
  ListItem,
  Nodes,
  PhrasingContent,
  Root,
  Table,
  TableCell,
  TableRow,
} from "mdast";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { unified } from "unified";

type Serialize_context = {
  list_depth: number;
  quote_depth: number;
};

const absolute_url_pattern = /^[a-z][a-z0-9+.-]*:/i;

function children_to_wikitext(
  nodes: Content[] | PhrasingContent[] | undefined,
  context: Serialize_context,
): string {
  if (!nodes?.length) return "";
  return nodes.map((node) => serialize_node(node, context)).join("");
}

function phrasing(
  nodes: PhrasingContent[] | undefined,
  context: Serialize_context,
): string {
  return children_to_wikitext(nodes, context);
}

function serialize_heading(node: Heading, context: Serialize_context): string {
  const level = Math.min(Math.max(node.depth, 1), 6);
  const marks = "=".repeat(level);
  const text = phrasing(node.children, context).trim();
  return `${marks} ${text} ${marks}\n\n`;
}

function serialize_list(node: List, context: Serialize_context): string {
  const next: Serialize_context = {
    ...context,
    list_depth: context.list_depth + 1,
  };
  const marker = node.ordered ? "#" : "*";
  const prefix = marker.repeat(next.list_depth);

  return (
    node.children
      .map((item) => serialize_list_item(item, next, prefix))
      .join("") + "\n"
  );
}

function serialize_list_item(
  item: ListItem,
  context: Serialize_context,
  prefix: string,
): string {
  const parts: string[] = [];

  for (const child of item.children) {
    if (child.type === "paragraph") {
      const text = phrasing(child.children, context).trim();
      if (parts.length === 0) {
        parts.push(`${prefix} ${text}\n`);
      } else {
        parts.push(`${prefix}: ${text}\n`);
      }
    } else if (child.type === "list") {
      parts.push(serialize_list(child, context).replace(/\n$/, ""));
      if (!parts[parts.length - 1]?.endsWith("\n")) {
        parts.push("\n");
      }
    } else {
      const text = serialize_node(child, context).trim();
      if (text) {
        if (parts.length === 0) {
          parts.push(`${prefix} ${text}\n`);
        } else {
          parts.push(`${prefix}: ${text}\n`);
        }
      }
    }
  }

  if (parts.length === 0) {
    return `${prefix}\n`;
  }

  return parts.join("");
}

function serialize_blockquote(
  children: Content[],
  context: Serialize_context,
): string {
  const next: Serialize_context = {
    ...context,
    quote_depth: context.quote_depth + 1,
  };
  const prefix = ":".repeat(next.quote_depth);
  const body = children
    .map((child) => serialize_node(child, next).trimEnd())
    .filter(Boolean)
    .join("\n\n");

  return (
    body
      .split("\n")
      .map((line) => (line === "" ? prefix : `${prefix} ${line}`))
      .join("\n") + "\n\n"
  );
}

function serialize_code(value: string, lang: string | null | undefined): string {
  const content = value.replace(/\n$/, "");
  if (lang) {
    return `<syntaxhighlight lang="${lang}">\n${content}\n</syntaxhighlight>\n\n`;
  }
  return `<pre>\n${content}\n</pre>\n\n`;
}

function serialize_link(node: Link, context: Serialize_context): string {
  const text = phrasing(node.children, context);
  const url = node.url ?? "";
  if (!url) return text;
  if (text && text !== url) {
    return `[${url} ${text}]`;
  }
  return `[${url}]`;
}

function file_name_from_url(url: string): string | null {
  try {
    const path = absolute_url_pattern.test(url)
      ? new URL(url).pathname
      : url.split("?")[0]?.split("#")[0] ?? url;
    const segment = path.split("/").filter(Boolean).pop();
    if (!segment) return null;
    return decodeURIComponent(segment);
  } catch {
    const segment = url.split("/").filter(Boolean).pop();
    return segment ? decodeURIComponent(segment) : null;
  }
}

function serialize_image(node: Image): string {
  const url = node.url ?? "";
  const alt = node.alt?.trim() ?? "";
  const file_name = file_name_from_url(url);

  if (file_name && !absolute_url_pattern.test(url)) {
    const alt_part = alt ? `|${alt}` : "";
    return `[[File:${file_name}|thumb${alt_part}]]`;
  }

  if (absolute_url_pattern.test(url)) {
    if (alt) return `[${url} ${alt}]`;
    return url;
  }

  if (file_name) {
    const alt_part = alt ? `|${alt}` : "";
    return `[[File:${file_name}|thumb${alt_part}]]`;
  }

  return alt || url;
}

function cell_text(cell: TableCell, context: Serialize_context): string {
  return phrasing(cell.children, context).trim();
}

function serialize_table(node: Table, context: Serialize_context): string {
  const lines: string[] = ['{| class="wikitable"'];

  node.children.forEach((row: TableRow, row_index) => {
    if (row_index > 0) lines.push("|-");
    const is_header = row_index === 0;
    for (const cell of row.children) {
      const text = cell_text(cell, context);
      lines.push(is_header ? `! ${text}` : `| ${text}`);
    }
  });

  lines.push("|}");
  return `${lines.join("\n")}\n\n`;
}

function serialize_node(node: Nodes | Content, context: Serialize_context): string {
  switch (node.type) {
    case "root":
      return children_to_wikitext((node as Root).children, context);
    case "paragraph":
      return `${phrasing(node.children, context)}\n\n`;
    case "heading":
      return serialize_heading(node, context);
    case "text":
      return node.value;
    case "emphasis":
      return `''${phrasing(node.children, context)}''`;
    case "strong":
      return `'''${phrasing(node.children, context)}'''`;
    case "delete":
      return `<s>${phrasing(node.children, context)}</s>`;
    case "inlineCode":
      return `<code>${node.value}</code>`;
    case "break":
      return "\n";
    case "thematicBreak":
      return "----\n\n";
    case "blockquote":
      return serialize_blockquote(node.children, context);
    case "list":
      return serialize_list(node, context);
    case "listItem":
      return serialize_list_item(
        node,
        context,
        "*".repeat(Math.max(context.list_depth, 1)),
      );
    case "code":
      return serialize_code(node.value, node.lang);
    case "link":
      return serialize_link(node, context);
    case "image":
      return serialize_image(node);
    case "table":
      return serialize_table(node, context);
    case "html":
      return node.value.endsWith("\n") ? node.value : `${node.value}\n`;
    case "footnoteReference":
      return `<ref>${node.identifier}</ref>`;
    case "footnoteDefinition":
      return "";
    case "definition":
      return "";
    case "linkReference": {
      const text = phrasing(node.children, context);
      return text || node.identifier;
    }
    case "imageReference":
      return node.alt ?? node.identifier;
    case "yaml":
      return "";
    default: {
      if ("children" in node && Array.isArray(node.children)) {
        return children_to_wikitext(
          node.children as Content[],
          context,
        );
      }
      if ("value" in node && typeof node.value === "string") {
        return node.value;
      }
      return "";
    }
  }
}

const processor = unified().use(remarkParse).use(remarkGfm);

/** Convert GitHub-flavored Markdown to MediaWiki wikitext. */
export function markdown_to_wikitext(markdown: string): string {
  if (!markdown.trim()) return "";

  const tree = processor.parse(markdown) as Root;
  const context: Serialize_context = { list_depth: 0, quote_depth: 0 };
  return serialize_node(tree, context)
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trimEnd()
    .concat("\n");
}
