export type ResourceKind =
  | "mw_ext"
  | "browser_ext"
  | "ci_tooling";

export type Resource = {
  name: string;
  summary: string;
  url: string;
  kind: ResourceKind;
  /** Display name of the author or org. */
  by: string;
  /** Whether this project is maintained under the Wikux org. */
  from_wikux: boolean;
};

/** Curated MediaWiki-related projects; not all are Wikux-owned. */
export const resources: Resource[] = [
  {
    name: "TrendingArticles [BETA]",
    summary:
      "Experimental MediaWiki extension that shows trending or recently popular articles per category, with a modern Citizen-oriented path and a simpler HitCounters fallback.",
    url: "https://github.com/wikux/mediawiki-extensions-TrendingArticles",
    kind: "mw_ext",
    by: "Wikux",
    from_wikux: true,
  },
  {
    name: "DynamicJsonLD",
    summary:
      "MediaWiki extension that lets Scribunto modules set and extend per-page JSON-LD for rich results and structured data.",
    url: "https://www.mediawiki.org/wiki/Extension:DynamicJsonLD",
    kind: "mw_ext",
    by: "Obby Wiki",
    from_wikux: false,
  },
  {
    name: "WikiWire",
    summary:
      "GitHub Action that syncs modules, templates, and other files from a Git repo into a live MediaWiki site via the Action API.",
    url: "https://github.com/obbywiki/wikiwire",
    kind: "ci_tooling",
    by: "Obby Wiki",
    from_wikux: false,
  },
  {
    name: "Better GitHub File Icons",
    summary:
      "Browser extension that replaces GitHub file and folder icons with recognizable logos, including MediaWiki-related icons.",
    url: "https://github.com/wlft/browser-extensions-GitHubBetterFileIcons",
    kind: "browser_ext",
    by: "wlft",
    from_wikux: false,
  },
];

export const resource_sections: {
  kind: ResourceKind;
  title: string;
}[] = [
  { kind: "mw_ext", title: "MediaWiki extensions" },
  { kind: "ci_tooling", title: "CI tooling" },
  { kind: "browser_ext", title: "Browser extensions" },
];
