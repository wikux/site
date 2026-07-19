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
];
