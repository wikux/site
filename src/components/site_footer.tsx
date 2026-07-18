import Link from "next/link";
import { Container } from "@/components/container";

const GITHUB_URL = "https://github.com/wikux";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/80">
      <Container className="flex flex-col gap-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          Wikux is an orgnization providing free MediaWiki resources to the public.
        </p>
        <nav
          className="flex flex-wrap gap-x-5 gap-y-2"
          aria-label="Footer"
        >
          <Link
            href="/guides"
            className="nav_link w-fit cursor-pointer text-foreground hover:text-wikux-accent"
          >
            Guides
          </Link>
          <Link
            href="/inspiration-wall"
            className="nav_link w-fit cursor-pointer text-foreground hover:text-wikux-accent"
          >
            Inspiration
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="nav_link w-fit cursor-pointer text-foreground hover:text-wikux-accent"
          >
            GitHub
          </a>
        </nav>
      </Container>
    </footer>
  );
}
