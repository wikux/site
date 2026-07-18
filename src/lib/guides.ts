export type Guide = {
  slug: string;
  title: string;
  summary: string;
  status: "placeholder";
};

export const guides: Guide[] = [
  {
    slug: "self-hosted-mediawiki",
    title: "Getting a self-hosted MediaWiki instance online",
    summary:
      "Start your own MediaWiki instance and get it online with this guide.",
    status: "placeholder",
  },
];

export function get_guide(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}
