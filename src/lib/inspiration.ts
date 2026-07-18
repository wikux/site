export type InspirationWiki = {
  name: string;
  url: string;
  image: string;
  tags: string[];
};

/** Curated independent MediaWiki sites worth studying. */
export const inspiration_wikis: InspirationWiki[] = [
  {
    name: "Star Citizen Wiki",
    url: "https://starcitizen.tools/",
    image: "/insp/starcitizentools.png",
    tags: ["Citizen", "Dark theme", "Gaming"],
  },
  {
    name: "Item Asylum Wiki",
    url: "https://itemasylum.wiki/",
    image: "/insp/item-asylum.png",
    tags: ["Citizen", "Roblox", "Miraheze"],
  },
  {
    name: "untitled tag game wiki",
    url: "https://tagging.wiki/",
    image: "/insp/utg.png",
    tags: ["Citizen", "Roblox", "Miraheze"],
  },
  {
    name: "Minecraft Wiki",
    url: "https://minecraft.wiki/",
    image: "/insp/minecraft.png",
    tags: ["Vector", "Gaming", "Independent"],
  },
  {
    name: "Warframe Wiki",
    url: "https://wiki.warframe.com/",
    image: "/insp/warframewiki.png",
    tags: ["MinervaNeue", "Gaming", "Independent"],
  },
  {
    name: "Obby Wiki",
    url: "https://obby.wiki/",
    image: "/insp/obbywiki.png",
    tags: ["Citizen", "Roblox", "Independent"],
  },
];
