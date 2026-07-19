export type ToolSummary = {
  slug: string;
  title: string;
  summary: string;
};

/** Registry of Wikux tools shown on /tools. */
export const tools: ToolSummary[] = [
  {
    slug: "skin-compare",
    title: "Skin compare",
    summary:
      "Pick MediaWiki skins side by side and compare them for custom styling, mobile, and admin goals.",
  },
  {
    slug: "host-compare",
    title: "Host compare",
    summary:
      "Compare wiki farms, managed hosts, and self-hosting on control, cost, ads, and how hard they are to leave.",
  },
  {
    slug: "markdown-to-wikitext",
    title: "Markdown to wikitext",
    summary:
      "Convert Markdown (including GFM tables and code fences) into MediaWiki wikitext for pasting into a wiki.",
  },
];
