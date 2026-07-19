export type HostId =
  | "self-host"
  | "miraheze"
  | "wikioasis"
  | "mywikis"
  | "wiki-gg"
  | "telepedia"
  | "fandom";

export type HostKind = "self-host" | "farm" | "managed" | "platform";

export type HostCriterion = {
  id: string;
  label: string;
  description: string;
};

export type HostRating = "strong" | "mixed" | "weak";

export type Host = {
  id: HostId;
  name: string;
  kind: HostKind;
  summary: string;
  operator: string;
  url: string;
  cost: string;
  ads: string;
  custom_domain: string;
  extensions: string;
  best_for: string[];
  caveats: string[];
  ratings: Record<string, HostRating>;
};

export const host_kind_labels: Record<HostKind, string> = {
  "self-host": "Self-host",
  farm: "Wiki farm",
  managed: "Managed host",
  platform: "Platform",
};

export const host_criteria: HostCriterion[] = [
  {
    id: "control",
    label: "Control",
    description:
      "How freely you can change LocalSettings, install extensions and skins, and shape the server stack.",
  },
  {
    id: "cost",
    label: "Cost",
    description:
      "How little money you need to get started and keep a typical public wiki online.",
  },
  {
    id: "ads",
    label: "Ad-free",
    description:
      "Whether readers see advertising, and how intrusive it tends to be.",
  },
  {
    id: "maintenance",
    label: "Maintenance",
    description:
      "How little you need to handle yourself for upgrades, backups, spam, and uptime.",
  },
  {
    id: "customization",
    label: "Customization",
    description:
      "Skins, CSS/JS, ManageWiki-style tools, and how far you can brand the wiki.",
  },
  {
    id: "portability",
    label: "Portability",
    description:
      "Custom domains, dumps/exports, and how hard it is to leave for another host.",
  },
];

export const rating_labels: Record<HostRating, string> = {
  strong: "Strong",
  mixed: "Mixed",
  weak: "Weak",
};

export const rating_levels: Record<HostRating, number> = {
  strong: 3,
  mixed: 2,
  weak: 1,
};

/** Default columns: self-host vs free farm vs paid managed */
export const default_selected_host_ids: HostId[] = [
  "self-host",
  "miraheze",
  "fandom",
];

/** Suggested shortlist for people deciding where to start */
export const recommended_host_ids: HostId[] = [
  "miraheze",
  "self-host",
  "wikioasis",
  "mywikis",
  "wiki-gg",
];

export const hosts: Host[] = [
  {
    id: "self-host",
    name: "Self-host",
    kind: "self-host",
    summary:
      "Run MediaWiki yourself on a VPS or dedicated server. Full stack control and full responsibility for uptime, backups, and security.",
    operator: "You",
    url: "https://www.mediawiki.org/wiki/Manual:Installation_guide",
    cost: "VPS from ~$5/mo + your time",
    ads: "None (unless you add them)",
    custom_domain: "Yes (you own DNS)",
    extensions: "Anything you install and maintain",
    best_for: ["Full control", "Custom extensions", "Independent branding"],
    caveats: [
      "You handle upgrades, backups, spam, and downtime.",
      "You need Terms of Use / Privacy Policy that fit your setup.",
      "Innovation is easier here, but so is breaking things.",
    ],
    ratings: {
      control: "strong",
      cost: "mixed",
      ads: "strong",
      maintenance: "weak",
      customization: "strong",
      portability: "strong",
    },
  },
  {
    id: "miraheze",
    name: "Miraheze",
    kind: "farm",
    summary:
      "Large nonprofit wiki farm (WikiTide Foundation). Free, ad-free MediaWiki with ManageWiki, custom domains, and a long extension catalog after security review.",
    operator: "WikiTide Foundation (501(c)(3))",
    url: "https://miraheze.org/",
    cost: "Free (donations)",
    ads: "None",
    custom_domain: "Yes, free",
    extensions: "300+ via ManageWiki; more on request after review",
    best_for: ["Ad-free public wikis", "Broad topics", "Low budget"],
    caveats: [
      "Volunteer-run: uptime can lag big commercial platforms.",
      "Content Policy and nonprofit rules apply.",
      "Wiki requests go through approval; dormant wikis may close.",
    ],
    ratings: {
      control: "mixed",
      cost: "strong",
      ads: "strong",
      maintenance: "strong",
      customization: "strong",
      portability: "strong",
    },
  },
  {
    id: "wikioasis",
    name: "WikiOasis",
    kind: "farm",
    summary:
      "Smaller nonprofit farm in the Miraheze mold: ManageWiki, donations, no ads. Often a lighter request process and a broader acceptance range (with its own NSFW limits).",
    operator: "WikiOasis (nonprofit)",
    url: "https://wikioasis.org/",
    cost: "Free (donations)",
    ads: "None",
    custom_domain: "Yes, or subdomain",
    extensions: "ManageWiki catalog; some tooling shares Miraheze lineage",
    best_for: ["Ad-free startups", "Topics farms reject", "Smaller community"],
    caveats: [
      "Much smaller than other alternatives; fewer peers and less proven scale.",
      "Critical pieces may still track other alternatives' ecosystems.",
      "Governance and policies are still maturing.",
    ],
    ratings: {
      control: "mixed",
      cost: "strong",
      ads: "strong",
      maintenance: "mixed",
      customization: "strong",
      portability: "strong",
    },
  },
  {
    id: "mywikis",
    name: "MyWikis",
    kind: "managed",
    summary:
      "Paid MediaWiki host with fast provisioning, a self-service portal for extensions and settings, daily backups, and SLA-backed support. Strong fit for private and business wikis.",
    operator: "MyWikis (for-profit)",
    url: "https://www.mywikis.com/",
    cost: "Paid plans (no ads)",
    ads: "None",
    custom_domain: "Yes, or subdomain",
    extensions: "150+ via portal; more on request",
    best_for: ["Private wikis", "Paid support", "Less DIY ops"],
    caveats: [
      "Ongoing subscription cost.",
      "Not a free community farm; pricing and plans gate features.",
      "SSH/FTP is available on request, not the default free-farm model.",
    ],
    ratings: {
      control: "mixed",
      cost: "weak",
      ads: "strong",
      maintenance: "strong",
      customization: "strong",
      portability: "mixed",
    },
  },
  {
    id: "wiki-gg",
    name: "wiki.gg",
    kind: "farm",
    summary:
      "Gaming-focused farm with paid staff, fewer ads than Fandom, and more local-governance respect. Strict applications; mostly Vector Legacy with heavy CSS help from staff.",
    operator: "indie.io",
    url: "https://wiki.gg/",
    cost: "Free (with ads for guests)",
    ads: "Banner / sidebar ads for unregistered users",
    custom_domain: "No",
    extensions: "Curated set; requests possible, not open-ended",
    best_for: ["Game wikis", "Staff onboarding", "Leaving Fandom"],
    caveats: [
      "Selective; fanon / worldbuilding often rejected.",
      "Private-equity ownership is a long-term risk factor.",
      "Skin choice is limited compared with other alternatives.",
    ],
    ratings: {
      control: "mixed",
      cost: "strong",
      ads: "mixed",
      maintenance: "strong",
      customization: "mixed",
      portability: "mixed",
    },
  },
  {
    id: "telepedia",
    name: "Telepedia",
    kind: "farm",
    summary:
      "Smaller media-oriented farm (TV, anime, games) with ManageWiki-style config. Ads fund the platform; staff attention can be higher because the farm is smaller than other alternatives.",
    operator: "Telepedia / Original Authority",
    url: "https://meta.telepedia.net/",
    cost: "Free (ads for guests)",
    ads: "Ads for unregistered users (incl. video spots)",
    custom_domain: "No",
    extensions: "ConfigCentre / ManageWiki-style enablement",
    best_for: ["Media wikis", "Smaller farm attention"],
    caveats: [
      "Acceptance is discretionary and media-leaning.",
      "More aggressive ads than other alternatives.",
      "Fewer peer communities than the large farms.",
    ],
    ratings: {
      control: "mixed",
      cost: "strong",
      ads: "weak",
      maintenance: "mixed",
      customization: "mixed",
      portability: "mixed",
    },
  },
  {
    id: "fandom",
    name: "Fandom",
    kind: "platform",
    summary:
      "Largest entertainment wiki network. Easy to start and \"strong\" SEO at the cost of heavy ads, a locked proprietary skin, almost no third-party extensions, and hard lock-in.",
    operator: "Fandom, Inc.",
    url: "https://www.fandom.com/",
    cost: "Free (ad-funded)",
    ads: "Heavy, multi-slot advertising",
    custom_domain: "No",
    extensions: "First-party only; third-party almost never approved",
    best_for: ["Existing Fandom communities", "SEO reach (tradeoffs)"],
    caveats: [
      "Forking and leaving is actively difficult.",
      "Platform decisions can override local consensus.",
      "Not a good place to start a new independent wiki in 2026.",
    ],
    ratings: {
      control: "weak",
      cost: "strong",
      ads: "weak",
      maintenance: "strong",
      customization: "weak",
      portability: "weak",
    },
  },
];

export function get_host(id: HostId): Host {
  const host = hosts.find((entry) => entry.id === id);
  if (!host) {
    throw new Error(`Unknown host: ${id}`);
  }
  return host;
}
