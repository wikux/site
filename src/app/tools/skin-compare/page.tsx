import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { SkinCompare } from "@/components/skin_compare";

export const metadata: Metadata = {
  title: "Skin compare",
  description:
    "Compare MediaWiki skins side by side — CSS theming, mobile, and what fits your wiki’s goals.",
};

export default function SkinComparePage() {
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
          Skin compare
        </p>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Skin compare
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Pick skins side by side and see which fit your goals, especially if custom styling matters.
        </p>
      </header>

      <div className="animate_fade_up_delay">
        <SkinCompare />
      </div>
    </Container>
  );
}
