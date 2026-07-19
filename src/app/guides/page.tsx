import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { get_all_guide_summaries } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Practical guides for MediaWiki administration.",
};

export default async function GuidesPage() {
  const guides = await get_all_guide_summaries();

  return (
    <Container className="py-16 sm:py-20">
      <header className="mb-12 max-w-2xl animate_fade_up">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Guides
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Practical guides for MediaWiki administration.
        </p>
      </header>

      <ul className="animate_fade_up_delay divide-y divide-border border-y border-border">
        {guides.map((guide) => (
          <li key={guide.slug}>
            <Link
              href={`/guides/${guide.slug}`}
              className="group flex flex-col gap-1 py-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wikux-accent"
            >
              <span className="font-display text-lg font-medium text-foreground group-hover:text-wikux-accent">
                {guide.data.title}
              </span>
              <span className="text-muted">{guide.data.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
