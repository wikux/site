import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { MarkdownToWikitext } from "@/components/markdown_to_wikitext";

export const metadata: Metadata = {
  title: "Markdown to wikitext",
  description:
    "Convert Markdown (including GFM tables and code fences) into MediaWiki wikitext for pasting into a wiki.",
};

export default function MarkdownToWikitextPage() {
  return (
    <Container className="max-w-6xl py-16 sm:py-20">
      <header className="mb-12 max-w-2xl animate_fade_up">
        <p className="text-sm text-muted">
          <Link
            href="/tools"
            className="nav_link text-muted hover:text-foreground"
          >
            Tools
          </Link>
          <span aria-hidden="true" className="mx-2 text-border">
            /
          </span>
          Markdown to wikitext
        </p>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Markdown to wikitext
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Convert Markdown into MediaWiki wikitext so you can paste it straight
          into a wiki source editor.
        </p>
      </header>

      <div className="animate_fade_up_delay">
        <MarkdownToWikitext />
      </div>
    </Container>
  );
}
