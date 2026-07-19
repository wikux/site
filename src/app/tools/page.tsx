import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { tools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Open tooling for MediaWiki admins — compare skins, and more to come.",
};

export default function ToolsPage() {
  return (
    <Container className="py-16 sm:py-20">
      <header className="mb-12 max-w-2xl animate_fade_up">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Tools
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Practical helpers for choosing and shaping your MediaWiki setup.
        </p>
      </header>

      <ul className="animate_fade_up_delay divide-y divide-border border-y border-border">
        {tools.map((tool) => (
          <li key={tool.slug}>
            <Link
              href={`/tools/${tool.slug}`}
              className="group flex flex-col gap-1 py-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wikux-accent"
            >
              <span className="font-display text-lg font-medium text-foreground group-hover:text-wikux-accent">
                {tool.title}
              </span>
              <span className="text-muted">{tool.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
