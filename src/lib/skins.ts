export type SkinId =
  | "citizen"
  | "apex"
  | "vector"
  | "tweeki"
  | "metrolook"
  | "minerva"
  | "timeless";

export type SkinCriterion = {
  id: string;
  label: string;
  description: string;
};

export type SkinRating = "strong" | "mixed" | "weak";

export type SkinExample = {
  name: string;
  url: string;
};

export type Skin = {
  id: SkinId;
  name: string;
  summary: string;
  maintained_by: string;
  repo_url: string;
  docs_url: string;
  /** Path under public/; omit until a capture exists */
  screenshot?: string;
  /** Short credit under the screenshot */
  screenshot_of?: string;
  best_for: string[];
  /** How the skin is kept current relative to MediaWiki releases */
  support: string;
  /** Rough estimate of public wikis using this as their default skin */
  est_default_sites: string;
  /** Public wikis using this skin (curated examples) */
  examples: SkinExample[];
  ratings: Record<string, SkinRating>;
};

export const skin_criteria: SkinCriterion[] = [
  {
    id: "css_theming",
    label: "CSS theming",
    description:
      "How easy it is to restyle the skin with Common.css, site CSS, and CSS variables.",
  },
  {
    id: "mobile",
    label: "Mobile",
    description:
      "How well the default desktop experience carries to phones and tablets.",
  },
  {
    id: "visual_identity",
    label: "Default look",
    description:
      "Whether the stock appearance already feels distinctive without heavy CSS.",
  },
  {
    id: "maintenance",
    label: "Maintenance",
    description:
      "Longevity, MediaWiki compatibility, and how actively the skin is maintained.",
  },
  {
    id: "extensions",
    label: "Extensions",
    description:
      "How reliably third-party extensions render and integrate with the skin chrome.",
  },
];

/** Wikux recommendation order */
export const recommended_skin_ids: SkinId[] = [
  "citizen",
  "apex",
  "vector",
  "tweeki",
  "metrolook",
];

export const skins: Skin[] = [
  {
    id: "citizen",
    name: "Citizen",
    summary:
      "A popular skin originally developed for the Star Citizen Wiki. Focusing on mobile and responsive design.",
    maintained_by: "Community (Star Citizen Wiki / contributors)",
    repo_url: "https://github.com/StarCitizenTools/mediawiki-skins-Citizen",
    docs_url: "https://starcitizentools.github.io/mediawiki-skins-Citizen/",
    screenshot: "/skins/citizen.png",
    screenshot_of: "Star Citizen Wiki",
    best_for: ["Custom branding", "Dark mode"],
    support: "Updates regularly (outside MW majors)",
    est_default_sites: "12+",
    examples: [
      { name: "Star Citizen Wiki", url: "https://starcitizen.tools/" },
      { name: "Stella Sora Wiki", url: "https://stellasora.miraheze.org/" },
      { name: "Item Asylum Wiki", url: "https://itemasylum.wiki/" },
      { name: "Tolkien Gateway", url: "https://tolkiengateway.net/" },
      { name: "Outlaster Wiki", url: "https://outlaster.miraheze.org/" },
      { name: "Obby Wiki", url: "https://obby.wiki/" },
    ],
    ratings: {
      css_theming: "strong",
      mobile: "strong",
      visual_identity: "strong",
      maintenance: "mixed",
      extensions: "mixed",
    },
  },
  {
    id: "apex",
    name: "Apex",
    summary:
      "A responsive skin with a fly-out table of contents. Content-first chrome without Wikipedia's default look. There's also a cat in the preview image.",
    maintained_by: "Community (WMF Labs origins)",
    repo_url: "https://gerrit.wikimedia.org/g/mediawiki/skins/Apex",
    docs_url: "https://www.mediawiki.org/wiki/Skin:Apex",
    screenshot: "/skins/apex.png",
    screenshot_of: "Apex",
    best_for: ["Reading focus", "TOC fly-out", "Clean layouts"],
    support: "Updates with each MediaWiki major",
    est_default_sites: "~4+",
    examples: [
      {
        name: "Audiovisual Identity Database",
        url: "https://avid.miraheze.org/",
      },
      {
        name: "Enciklopedija Lietuvai ir pasauliui",
        url: "https://www.lietuvai.lt/",
      },
    ],
    ratings: {
      css_theming: "mixed",
      mobile: "weak",
      visual_identity: "mixed",
      maintenance: "mixed",
      extensions: "mixed",
    },
  },
  {
    id: "vector",
    name: "Vector (2022)",
    summary:
      "The current Wikimedia desktop default: sticky header, limited-width content, and familiar Wikipedia chrome.",
    maintained_by: "Wikimedia Foundation",
    repo_url: "https://gerrit.wikimedia.org/g/mediawiki/skins/Vector",
    docs_url: "https://www.mediawiki.org/wiki/Skin:Vector",
    screenshot: "/skins/vector.png",
    screenshot_of: "MediaWiki.org",
    best_for: ["Encyclopedia tone", "WMF familiarity", "Broad extension support"],
    support: "Updates with each MediaWiki major",
    est_default_sites: "~5,943+",
    examples: [
      { name: "Minecraft Wiki", url: "https://minecraft.wiki/" },
      { name: "RuneScape Wiki", url: "https://runescape.wiki/" },
      { name: "Subnautica Wiki", url: "https://wiki.subnautica.com/" },
      { name: "Nookipedia", url: "https://nookipedia.com/" },
      { name: "Hytale Wiki", url: "https://hytalewiki.org/" },
      { name: "Valorant Wiki", url: "https://wiki.playvalorant.com/" },
    ],
    ratings: {
      css_theming: "mixed",
      mobile: "mixed",
      visual_identity: "weak",
      maintenance: "strong",
      extensions: "strong",
    },
  },
  {
    id: "tweeki",
    name: "Tweeki",
    summary:
      "Bootstrap-based skin aimed at wiki-as-website projects, with strong Semantic MediaWiki and forms compatibility.",
    maintained_by: "Community (thaider / Tweeki)",
    repo_url: "https://github.com/thaider/Tweeki",
    docs_url: "https://www.mediawiki.org/wiki/Skin:Tweeki",
    screenshot: "/skins/tweeki.png",
    screenshot_of: "Tweeki",
    best_for: ["Wiki-as-website", "Bootstrap", "Semantic MediaWiki"],
    support: "Updates regularly (outside MW majors)",
    est_default_sites: "~32+",
    examples: [
      { name: "Tweeki documentation", url: "https://tweeki.kollabor.at/" },
    ],
    ratings: {
      css_theming: "strong",
      mobile: "strong",
      visual_identity: "mixed",
      maintenance: "mixed",
      extensions: "strong",
    },
  },
  {
    id: "metrolook",
    name: "Metrolook",
    summary:
      "A Metro-inspired Vector fork with tile navigation and responsive layout.",
    maintained_by: "Community (Paladox / contributors)",
    repo_url: "https://github.com/paladox/metrolook",
    docs_url: "https://www.mediawiki.org/wiki/Skin:Metrolook",
    screenshot: "/skins/metrolook.png",
    screenshot_of: "Metrolook",
    best_for: ["Tile menus", "Branded hubs", "Miraheze"],
    support: "Updates with each MediaWiki major",
    est_default_sites: "~27+",
    examples: [
      {
        name: "Audiovisual Identity Database",
        url: "https://avid.miraheze.org/",
      },
      { name: "Miraheze Meta", url: "https://meta.miraheze.org/" },
    ],
    ratings: {
      css_theming: "mixed",
      mobile: "strong",
      visual_identity: "mixed",
      maintenance: "mixed",
      extensions: "mixed",
    },
  },
  {
    id: "minerva",
    name: "MinervaNeue",
    summary:
      "The Wikimedia mobile skin: compact chrome, touch-friendly navigation, and a reading-first layout.",
    maintained_by: "Wikimedia Foundation",
    repo_url: "https://gerrit.wikimedia.org/g/mediawiki/skins/MinervaNeue",
    docs_url: "https://www.mediawiki.org/wiki/Skin:MinervaNeue",
    screenshot: "/skins/minerva.png",
    screenshot_of: "Warframe Wiki",
    best_for: ["Mobile-first", "Simple reading", "WMF parity"],
    support: "Updates with each MediaWiki major",
    est_default_sites: "~8,000+",
    examples: [
      { name: "Warframe Wiki", url: "https://wiki.warframe.com/" },
    ],
    ratings: {
      css_theming: "mixed",
      mobile: "strong",
      visual_identity: "weak",
      maintenance: "strong",
      extensions: "mixed",
    },
  },
  {
    id: "timeless",
    name: "Timeless",
    summary:
      "A responsive WMF skin with a distinct two-column layout. A common alternative when Vector feels too Wikipedia-like.",
    maintained_by: "Wikimedia Foundation / community",
    repo_url: "https://gerrit.wikimedia.org/g/mediawiki/skins/Timeless",
    docs_url: "https://www.mediawiki.org/wiki/Skin:Timeless",
    screenshot: "/skins/timeless.png",
    screenshot_of: "English Wikipedia (Timeless)",
    best_for: ["Responsive single skin", "Sidebars", "Non-Wikipedia look"],
    support: "Updates with each MediaWiki major",
    est_default_sites: "~400+",
    examples: [
      {
        name: "English Wikipedia (Timeless)",
        url: "https://en.wikipedia.org/wiki/Main_Page?useskin=timeless",
      },
      {
        name: "MediaWiki.org (Timeless)",
        url: "https://www.mediawiki.org/wiki/MediaWiki?useskin=timeless",
      },
    ],
    ratings: {
      css_theming: "mixed",
      mobile: "strong",
      visual_identity: "mixed",
      maintenance: "mixed",
      extensions: "mixed",
    },
  },
];

export const default_selected_skin_ids: SkinId[] = ["citizen", "vector"];

export function get_skin(id: SkinId): Skin {
  const skin = skins.find((entry) => entry.id === id);
  if (!skin) {
    throw new Error(`Unknown skin: ${id}`);
  }
  return skin;
}

export function get_recommended_skins(): Skin[] {
  return recommended_skin_ids.map((id) => get_skin(id));
}

export const rating_labels: Record<SkinRating, string> = {
  strong: "Strong",
  mixed: "Mixed",
  weak: "Weak",
};

export const rating_levels: Record<SkinRating, number> = {
  strong: 3,
  mixed: 2,
  weak: 1,
};
