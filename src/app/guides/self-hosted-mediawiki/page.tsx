import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { get_guide } from "@/lib/guides";

const SLUG = "self-hosted-mediawiki";

export const metadata: Metadata = {
  title: "Getting a self-hosted MediaWiki instance online",
  description:
    "Start your own MediaWiki instance and get it online with this guide.",
};

export default function SelfHostedMediawikiGuidePage() {
  const guide = get_guide(SLUG);
  if (!guide) {
    notFound();
  }

  return (
    <Container className="py-16 sm:py-20">
      <p className="mb-6 text-sm text-muted animate_fade_up">
        <Link
          href="/guides"
          className="nav_link text-muted hover:text-foreground"
        >
          Guides
        </Link>
        <span aria-hidden="true"> / </span>
        <span className="text-foreground">{guide.title}</span>
      </p>

      <article className="max-w-2xl animate_fade_up_delay">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {guide.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          {guide.summary}
        </p>
        <div className="mt-10 border-l-2 border-wikux-yellow pl-5">
          <p className="font-display text-base font-medium text-foreground">
            Coming soon
          </p>
          <p className="mt-2 text-muted">
            This guide is a placeholder. Content for standing up a self-hosted
            MediaWiki instance will appear here.
          </p>
        </div>
      </article>
    </Container>
  );
}
