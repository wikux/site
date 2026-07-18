import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { guides } from "@/lib/guides";

export default function Home() {
  return (
    <>
      <section className="relative min-h-[calc(100svh-3.5rem)] overflow-hidden border-b border-border/80">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-end"
        >
          <Image
            src="/wikux.svg"
            alt=""
            width={756}
            height={756}
            priority
            className="animate_hero_mark h-[min(90vw,42rem)] w-[min(90vw,42rem)] translate-x-[12%] opacity-[0.2] sm:translate-x-[8%] sm:opacity-[0.26]"
          />
        </div>

        <Container className="relative flex min-h-[calc(100svh-3.5rem)] flex-col justify-center py-16 sm:py-24">
          <div className="max-w-xl">
            <p className="animate_fade_up font-display text-5xl font-semibold tracking-tight text-foreground sm:text-6xl md:text-7xl">
              Wikux
            </p>
            <h1 className="animate_fade_up_delay mt-5 max-w-md font-display text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-3xl">
              Resources to make MediaWiki wikis great
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted animate_fade_up_delay">
              Guides, extensions, and open tooling for people who want better
              wikis.
            </p>
            <div className="mt-8 animate_fade_up_delay">
              <Link
                href="/guides"
                className="inline-flex cursor-pointer border border-foreground bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:border-wikux-accent hover:bg-wikux-yellow hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wikux-accent"
              >
                Browse guides
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border/80 py-16 sm:py-20">
        <Container>
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              What Wikux is
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Wikux is an organization providing free MediaWiki resources. From documentation, extensions, and (soon) CSS snippets and widgets, meant to help independent wikis look and work better.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              We are a public-benefit organization, not a business. We are a place to share what is possible when wiki tech stays open, and when communities are not locked into platforms like Fandom.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mb-8 max-w-2xl">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Guides
            </h2>
            <p className="mt-3 text-lg text-muted">
              Practical MediaWiki administration, starting with self-hosting.
            </p>
          </div>

          <ul className="max-w-2xl divide-y divide-border border-y border-border">
            {guides.map((guide) => (
              <li key={guide.slug}>
                <Link
                  href={`/guides/${guide.slug}`}
                  className="group flex flex-col gap-1 py-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wikux-accent"
                >
                  <span className="font-display text-lg font-medium text-foreground group-hover:text-wikux-accent">
                    {guide.title}
                  </span>
                  <span className="text-muted">{guide.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
