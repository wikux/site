"use client";

import Image from "next/image";
import { Check, ExternalLink, Columns2 } from "lucide-react";
import {
  get_recommended_skins,
  type SkinId,
} from "@/lib/skins";

type TopSkinsProps = {
  selected: SkinId[];
  on_select: (id: SkinId) => void;
  can_add_column: boolean;
};

export function TopSkins({
  selected,
  on_select,
  can_add_column,
}: TopSkinsProps) {
  const recommended = get_recommended_skins();

  return (
    <section className="border-t border-border pt-14">
      <header className="mb-8 max-w-2xl">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Wikux top skins
        </h2>
        <p className="mt-3 text-lg leading-relaxed text-muted">
          Skins we recommend for building the best wiki possible.
          Select one to drop it into the compare columns above.
        </p>
      </header>

      <ol className="grid gap-5">
        {recommended.map((skin, index) => {
          const is_selected = selected.includes(skin.id);
          const select_label = is_selected
            ? "In compare"
            : can_add_column
              ? "Add to compare"
              : "Swap into compare";

          return (
            <li
              key={skin.id}
              className="group grid overflow-hidden border border-border bg-surface transition-colors hover:border-wikux-accent sm:grid-cols-[minmax(0,14rem)_1fr]"
            >
              <div className="relative aspect-16/10 border-b border-border bg-background sm:aspect-auto sm:min-h-[11rem] sm:border-b-0 sm:border-r">
                {skin.screenshot ? (
                  <Image
                    src={skin.screenshot}
                    alt={
                      skin.screenshot_of
                        ? `Screenshot of ${skin.screenshot_of}`
                        : `${skin.name} preview`
                    }
                    fill
                    sizes="(max-width: 640px) 100vw, 224px"
                    className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex size-full items-end bg-background p-4">
                    <p className="text-xs text-muted">Screenshot soon</p>
                  </div>
                )}
                <span className="absolute left-0 top-0 flex size-10 items-center justify-center bg-foreground font-display text-lg font-semibold text-background">
                  {index + 1}
                </span>
              </div>

              <div className="flex flex-col gap-4 p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                      {skin.name}
                    </h3>
                    <p className="mt-1 text-xs text-muted">
                      {skin.best_for.join(" · ")}
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={is_selected}
                    onClick={() => on_select(skin.id)}
                    className={[
                      "inline-flex shrink-0 items-center gap-2 border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wikux-accent",
                      is_selected
                        ? "cursor-default border-border bg-background text-muted"
                        : "cursor-pointer border-foreground bg-foreground text-background hover:border-wikux-accent hover:bg-wikux-yellow hover:text-on-yellow",
                    ].join(" ")}
                  >
                    {is_selected ? (
                      <Check
                        className="size-4"
                        aria-hidden="true"
                        strokeWidth={1.75}
                      />
                    ) : (
                      <Columns2
                        className="size-4"
                        aria-hidden="true"
                        strokeWidth={1.75}
                      />
                    )}
                    {select_label}
                  </button>
                </div>

                <p className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                  {skin.summary}
                </p>

                <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-4 text-sm">
                  <a
                    href={skin.docs_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-muted hover:text-wikux-accent"
                  >
                    Docs
                    <ExternalLink
                      className="size-3.5 opacity-60"
                      aria-hidden="true"
                      strokeWidth={1.75}
                    />
                  </a>
                  {skin.examples.slice(0, 3).map((example) => (
                    <a
                      key={example.url}
                      href={example.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-foreground hover:text-wikux-accent"
                    >
                      {example.name}
                      <ExternalLink
                        className="size-3 opacity-50"
                        aria-hidden="true"
                        strokeWidth={1.75}
                      />
                    </a>
                  ))}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
