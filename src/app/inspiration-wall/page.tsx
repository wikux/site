import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Container } from "@/components/container";
import { inspiration_wikis } from "@/lib/inspiration";

export const metadata: Metadata = {
  title: "Inspiration wall",
  description:
    "Good examples of independent wikis with well structured layouts and designs that match their topic.",
};

export default function InspirationWallPage() {
  return (
    <Container className="py-16 sm:py-20">
      <header className="mb-12 max-w-2xl animate_fade_up">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Inspiration wall
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Good examples of independent wikis with well structured layouts and designs that match their topic.
        </p>
      </header>

      <ul className="animate_fade_up_delay grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {inspiration_wikis.map((wiki) => (
          <li key={wiki.url}>
            <a
              href={wiki.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full cursor-pointer flex-col border border-border bg-surface transition-colors hover:border-wikux-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wikux-accent"
            >
              <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-background">
                <Image
                  src={wiki.image}
                  alt={`Screenshot of ${wiki.name}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
              </div>

              <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
                <span className="inline-flex items-center gap-2 font-display text-lg font-medium text-foreground group-hover:text-wikux-accent">
                  {wiki.name}
                  <ExternalLink
                    className="size-3.5 shrink-0 opacity-50 transition-opacity group-hover:opacity-100"
                    aria-hidden="true"
                    strokeWidth={1.75}
                  />
                </span>
                <ul className="mt-auto flex flex-wrap gap-2">
                  {wiki.tags.map((tag) => (
                    <li
                      key={tag}
                      className="border border-border px-2 py-0.5 text-xs text-muted"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </Container>
  );
}
