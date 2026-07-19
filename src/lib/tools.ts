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
    slug: "markdown-to-wikitext",
    title: "Markdown to wikitext",
    summary:
      "Convert Markdown (including GFM tables and code fences) into MediaWiki wikitext for pasting into a wiki.",
  },
];
