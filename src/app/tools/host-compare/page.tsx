import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { HostCompare } from "@/components/host_compare";

export const metadata: Metadata = {
  title: "Host compare",
  description:
    "Compare MediaWiki hosting; wiki farms, managed hosts, and self-hosting on control, cost, ads, and portability.",
};

export default function HostComparePage() {
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
          Host compare
        </p>
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Host compare
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Figure out whether a free farm, a paid managed host, or running your
          own server fits your wiki; before you pour months into the wrong
          platform.
        </p>
      </header>

      <div className="animate_fade_up_delay">
        <HostCompare />
      </div>
    </Container>
  );
}
