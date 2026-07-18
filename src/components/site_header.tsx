"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/container";
import { ThemeToggle } from "@/components/theme_toggle";

const GITHUB_URL = "https://github.com/wikux";

export function SiteHeader() {
  const pathname = usePathname();
  const guides_current =
    pathname === "/guides" || pathname.startsWith("/guides/");
  const inspiration_current =
    pathname === "/inspiration-wall" ||
    pathname.startsWith("/inspiration-wall/");

  return (
    <header className="border-b border-border/80 bg-background/80 backdrop-blur-sm">
      <Container className="flex h-14 items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex cursor-pointer items-center gap-2.5 text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wikux-accent"
        >
          <Image
            src="/wikux.svg"
            alt=""
            width={28}
            height={28}
            className="size-7"
            priority
          />
          <span className="font-display text-lg font-semibold tracking-tight">
            Wikux
          </span>
        </Link>

        <nav className="flex items-center gap-5" aria-label="Main">
          <Link
            href="/guides"
            className="nav_link cursor-pointer text-sm text-muted hover:text-foreground"
            aria-current={guides_current ? "page" : undefined}
          >
            Guides
          </Link>
          <Link
            href="/inspiration-wall"
            className="nav_link cursor-pointer text-sm text-muted hover:text-foreground"
            aria-current={inspiration_current ? "page" : undefined}
          >
            Inspiration
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="nav_link cursor-pointer text-sm text-muted hover:text-foreground"
          >
            GitHub
          </a>
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  );
}
