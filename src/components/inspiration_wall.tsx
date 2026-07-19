"use client";

import Image from "next/image";
import { ExternalLink, X, ZoomIn } from "lucide-react";
import { useEffect, useId, useState } from "react";
import type { InspirationWiki } from "@/lib/inspiration";

type InspirationWallProps = {
  wikis: InspirationWiki[];
};

export function InspirationWall({ wikis }: InspirationWallProps) {
  const [inspected, set_inspected] = useState<InspirationWiki | null>(null);
  const title_id = useId();

  useEffect(() => {
    if (!inspected) return;

    const previous_overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function on_keydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        set_inspected(null);
      }
    }

    window.addEventListener("keydown", on_keydown);
    return () => {
      document.body.style.overflow = previous_overflow;
      window.removeEventListener("keydown", on_keydown);
    };
  }, [inspected]);

  return (
    <>
      <ul className="animate_fade_up_delay grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {wikis.map((wiki) => (
          <li key={wiki.url}>
            <article className="group flex h-full flex-col border border-border bg-surface transition-colors hover:border-wikux-accent">
              <button
                type="button"
                onClick={() => set_inspected(wiki)}
                aria-label={`Inspect screenshot of ${wiki.name}`}
                className="relative aspect-[16/10] cursor-zoom-in overflow-hidden border-b border-border bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wikux-accent"
              >
                <Image
                  src={wiki.image}
                  alt={`Screenshot of ${wiki.name}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top transition-transform duration-200 ease-out group-hover:scale-[1.05]"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-2 bottom-2 flex size-8 items-center justify-center border border-border bg-surface/90 text-foreground opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <ZoomIn className="size-4" strokeWidth={1.75} />
                </span>
              </button>

              <a
                href={wiki.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 cursor-pointer flex-col gap-3 p-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wikux-accent sm:p-5"
              >
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
              </a>
            </article>
          </li>
        ))}
      </ul>

      {inspected ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={title_id}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/85 p-4 backdrop-blur-sm sm:p-8"
          onClick={() => set_inspected(null)}
        >
          <div
            className="flex max-h-[calc(100svh-2rem)] w-full max-w-5xl flex-col border border-border bg-surface sm:max-h-[calc(100svh-4rem)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-border px-4 py-3 sm:px-5">
              <div className="min-w-0">
                <h2
                  id={title_id}
                  className="truncate font-display text-lg font-medium text-foreground"
                >
                  {inspected.name}
                </h2>
                <a
                  href={inspected.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-0.5 inline-flex cursor-pointer items-center gap-1.5 text-sm text-muted hover:text-wikux-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wikux-accent"
                >
                  Visit wiki
                  <ExternalLink
                    className="size-3 shrink-0"
                    aria-hidden="true"
                    strokeWidth={1.75}
                  />
                </a>
              </div>
              <button
                type="button"
                onClick={() => set_inspected(null)}
                aria-label="Close inspect view"
                className="flex size-9 shrink-0 cursor-pointer items-center justify-center border border-border text-foreground transition-colors hover:border-wikux-accent hover:text-wikux-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wikux-accent"
              >
                <X className="size-4" strokeWidth={1.75} />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-auto bg-background">
              <Image
                src={inspected.image}
                alt={`Full screenshot of ${inspected.name}`}
                width={1600}
                height={1000}
                sizes="(max-width: 1024px) 100vw, 64rem"
                className="mx-auto h-auto w-full max-w-full"
                priority
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
