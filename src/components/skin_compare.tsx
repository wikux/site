"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { Check, ChevronDown, ExternalLink, Minus, Plus } from "lucide-react";
import {
  default_selected_skin_ids,
  get_skin,
  rating_labels,
  rating_levels,
  skin_criteria,
  skins,
  type Skin,
  type SkinId,
  type SkinRating,
} from "@/lib/skins";
import { TopSkins } from "@/components/top_skins";

const max_columns = 3;
const min_columns = 2;

function RatingMeter({ rating }: { rating: SkinRating }) {
  const level = rating_levels[rating];

  return (
    <div className="flex items-center gap-2">
      <div
        className="flex gap-1"
        role="img"
        aria-label={`${rating_labels[rating]} (${level} of 3)`}
      >
        {[1, 2, 3].map((step) => (
          <span
            key={step}
            className={
              step <= level
                ? "h-1.5 w-5 bg-wikux-accent"
                : "h-1.5 w-5 border border-border"
            }
          />
        ))}
      </div>
      <span className="text-xs font-medium text-foreground">
        {rating_labels[rating]}
      </span>
    </div>
  );
}

function SkinScreenshot({ skin }: { skin: Skin }) {
  if (!skin.screenshot) {
    return (
      <div
        className="relative flex aspect-16/10 flex-col justify-end border-b border-border bg-background p-4 sm:p-5"
        role="img"
        aria-label={`No screenshot yet for ${skin.name}`}
      >
        <p className="font-display text-sm font-medium text-foreground">
          {skin.name}
        </p>
        <p className="mt-1 text-xs text-muted">Screenshot soon</p>
      </div>
    );
  }

  return (
    <div className="relative aspect-16/10 overflow-hidden border-b border-border bg-background">
      <Image
        src={skin.screenshot}
        alt={`Screenshot of ${skin.screenshot_of ?? skin.name} using ${skin.name}`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover object-top"
      />
      {skin.screenshot_of ? (
        <p className="absolute inset-x-0 bottom-0 bg-background/85 px-3 py-1.5 text-xs text-muted backdrop-blur-sm">
          {skin.screenshot_of}
        </p>
      ) : null}
    </div>
  );
}

function SkinSelect({
  value,
  used_elsewhere,
  on_change,
  label,
}: {
  value: SkinId;
  used_elsewhere: Set<SkinId>;
  on_change: (id: SkinId) => void;
  label: string;
}) {
  const listbox_id = useId();
  const root_ref = useRef<HTMLDivElement>(null);
  const [open, set_open] = useState(false);
  const current = get_skin(value);

  useEffect(() => {
    if (!open) {
      return;
    }

    function on_pointer(event: MouseEvent) {
      if (
        root_ref.current &&
        !root_ref.current.contains(event.target as Node)
      ) {
        set_open(false);
      }
    }

    function on_key(event: KeyboardEvent) {
      if (event.key === "Escape") {
        set_open(false);
      }
    }

    document.addEventListener("mousedown", on_pointer);
    document.addEventListener("keydown", on_key);
    return () => {
      document.removeEventListener("mousedown", on_pointer);
      document.removeEventListener("keydown", on_key);
    };
  }, [open]);

  return (
    <div ref={root_ref} className="relative">
      <span className="sr-only">{label}</span>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listbox_id}
        onClick={() => set_open((was_open) => !was_open)}
        className="flex w-full cursor-pointer items-center gap-3 border border-border bg-background px-3 py-2.5 text-left transition-colors hover:border-wikux-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wikux-accent"
      >
        <span className="relative size-10 shrink-0 overflow-hidden border border-border bg-background">
          {current.screenshot ? (
            <Image
              src={current.screenshot}
              alt=""
              fill
              sizes="40px"
              className="object-cover object-top"
            />
          ) : (
            <span className="flex size-full items-center justify-center font-display text-[10px] text-muted">
              {current.name.slice(0, 2)}
            </span>
          )}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-sm font-medium text-foreground">
            {current.name}
          </span>
          <span className="block truncate text-xs text-muted">
            {current.best_for[0]}
          </span>
        </span>
        <ChevronDown
          className={`size-4 shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
          strokeWidth={1.75}
        />
      </button>

      {open ? (
        <ul
          id={listbox_id}
          role="listbox"
          aria-label={label}
          className="absolute inset-x-0 top-[calc(100%+0.25rem)] z-20 max-h-80 overflow-auto border border-border bg-surface shadow-[0_12px_32px_color-mix(in_srgb,var(--foreground)_12%,transparent)]"
        >
          {skins.map((skin) => {
            const selected = skin.id === value;
            const taken = used_elsewhere.has(skin.id);

            return (
              <li key={skin.id} role="option" aria-selected={selected}>
                <button
                  type="button"
                  disabled={taken}
                  onClick={() => {
                    on_change(skin.id);
                    set_open(false);
                  }}
                  className={[
                    "flex w-full items-start gap-3 px-3 py-2.5 text-left transition-colors",
                    selected
                      ? "bg-foreground text-background"
                      : taken
                        ? "cursor-not-allowed opacity-40"
                        : "cursor-pointer text-foreground hover:bg-background",
                  ].join(" ")}
                >
                  <span className="relative mt-0.5 size-10 shrink-0 overflow-hidden border border-border bg-background">
                    {skin.screenshot ? (
                      <Image
                        src={skin.screenshot}
                        alt=""
                        fill
                        sizes="40px"
                        className="object-cover object-top"
                      />
                    ) : (
                      <span className="flex size-full items-center justify-center font-display text-[10px] text-muted">
                        {skin.name.slice(0, 2)}
                      </span>
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 font-display text-sm font-medium">
                      {skin.name}
                      {selected ? (
                        <Check
                          className="size-3.5 shrink-0 opacity-80"
                          aria-hidden="true"
                          strokeWidth={2}
                        />
                      ) : null}
                    </span>
                    <span
                      className={`mt-0.5 block text-xs ${selected ? "text-background/75" : "text-muted"}`}
                    >
                      {taken && !selected
                        ? "Already in another column"
                        : skin.summary}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

function SkinFacts({ skin }: { skin: Skin }) {
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 border border-border bg-background px-3 py-3 text-sm">
      <dt className="text-muted">Support</dt>
      <dd className="font-medium text-foreground">{skin.support}</dd>
      <dt className="text-muted">Est. defaults</dt>
      <dd className="font-medium text-foreground">{skin.est_default_sites}</dd>
    </dl>
  );
}

function SkinColumn({
  skin,
  column_index,
  column_count,
  used_elsewhere,
  on_change,
  on_remove,
}: {
  skin: Skin;
  column_index: number;
  column_count: number;
  used_elsewhere: Set<SkinId>;
  on_change: (id: SkinId) => void;
  on_remove: () => void;
}) {
  return (
    <article className="animate_compare_in flex min-w-0 flex-col border border-border bg-surface">
      <div className="space-y-3 border-b border-border p-3 sm:p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-medium tracking-wide text-muted uppercase">
            Column {column_index + 1}
          </p>
          {column_count > min_columns ? (
            <button
              type="button"
              onClick={on_remove}
              className="inline-flex cursor-pointer items-center gap-1 text-xs text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wikux-accent"
            >
              <Minus className="size-3.5" aria-hidden="true" strokeWidth={1.75} />
              Remove
            </button>
          ) : null}
        </div>
        <SkinSelect
          value={skin.id}
          used_elsewhere={used_elsewhere}
          on_change={on_change}
          label={`Skin for column ${column_index + 1}`}
        />
      </div>

      <SkinScreenshot skin={skin} />

      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
        <div>
          <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
            {skin.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {skin.summary}
          </p>
          <p className="mt-2 text-xs text-muted">
            Maintained by {skin.maintained_by}
          </p>
        </div>

        <SkinFacts skin={skin} />

        <ul className="flex flex-wrap gap-2">
          {skin.best_for.map((tag) => (
            <li
              key={tag}
              className="border border-border px-2 py-0.5 text-xs text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>

        <dl className="divide-y divide-border border-y border-border">
          {skin_criteria.map((criterion) => {
            const rating = skin.ratings[criterion.id];
            return (
              <div
                key={criterion.id}
                className="flex items-center justify-between gap-3 py-2.5"
              >
                <dt className="text-sm text-muted">{criterion.label}</dt>
                <dd>
                  <RatingMeter rating={rating} />
                </dd>
              </div>
            );
          })}
        </dl>

        {skin.examples.length > 0 ? (
          <div>
            <h4 className="font-display text-sm font-medium text-foreground">
              Sites using it
            </h4>
            <ul className="mt-2 space-y-1.5 text-sm">
              {skin.examples.map((example) => (
                <li key={example.url}>
                  <a
                    href={example.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-foreground hover:text-wikux-accent"
                  >
                    {example.name}
                    <ExternalLink
                      className="size-3 opacity-50"
                      aria-hidden="true"
                      strokeWidth={1.75}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <p className="mt-auto flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <a
            href={skin.docs_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-foreground hover:text-wikux-accent"
          >
            Docs
            <ExternalLink
              className="size-3.5 opacity-60"
              aria-hidden="true"
              strokeWidth={1.75}
            />
          </a>
          <a
            href={skin.repo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-foreground hover:text-wikux-accent"
          >
            Source
            <ExternalLink
              className="size-3.5 opacity-60"
              aria-hidden="true"
              strokeWidth={1.75}
            />
          </a>
        </p>
      </div>
    </article>
  );
}

export function SkinCompare() {
  const [columns, set_columns] = useState<SkinId[]>(
    default_selected_skin_ids,
  );

  function set_column(index: number, id: SkinId) {
    set_columns((current) => {
      if (current.includes(id) && current[index] !== id) {
        return current;
      }
      const next = [...current];
      next[index] = id;
      return next;
    });
  }

  function add_column() {
    set_columns((current) => {
      if (current.length >= max_columns) {
        return current;
      }
      const next_skin = skins.find((skin) => !current.includes(skin.id));
      if (!next_skin) {
        return current;
      }
      return [...current, next_skin.id];
    });
  }

  function remove_column(index: number) {
    set_columns((current) => {
      if (current.length <= min_columns) {
        return current;
      }
      return current.filter((_, i) => i !== index);
    });
  }

  function select_from_top(id: SkinId) {
    set_columns((current) => {
      if (current.includes(id)) {
        return current;
      }
      if (current.length < max_columns) {
        return [...current, id];
      }
      const next = [...current];
      next[next.length - 1] = id;
      return next;
    });

    document
      .getElementById("skin-compare-columns")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
          <p className="font-display text-sm font-medium text-foreground">
            Side-by-side
          </p>
          <p className="mt-1 text-sm text-muted">
            Choose a skin in each column to compare side-by-side.
          </p>
        </div>
        {columns.length < max_columns ? (
          <button
            type="button"
            onClick={add_column}
            className="inline-flex w-fit cursor-pointer items-center gap-2 border border-foreground bg-foreground px-3 py-2 text-sm font-medium text-background transition-colors hover:border-wikux-accent hover:bg-wikux-yellow hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wikux-accent"
          >
            <Plus className="size-4" aria-hidden="true" strokeWidth={1.75} />
            Add column
          </button>
        ) : null}
      </div>

      <section id="skin-compare-columns" aria-label="Side-by-side comparison">
        <h2 className="sr-only">Side-by-side comparison</h2>
        <div
          className={`grid gap-4 ${
            columns.length === 3 ? "lg:grid-cols-3" : "md:grid-cols-2"
          }`}
        >
          {columns.map((skin_id, index) => {
            const skin = get_skin(skin_id);
            const used_elsewhere = new Set(
              columns.filter((_, i) => i !== index),
            );

            return (
              <SkinColumn
                key={`${index}-${skin.id}`}
                skin={skin}
                column_index={index}
                column_count={columns.length}
                used_elsewhere={used_elsewhere}
                on_change={(id) => set_column(index, id)}
                on_remove={() => remove_column(index)}
              />
            );
          })}
        </div>
      </section>

      <section className="max-w-2xl border-t border-border pt-8">
        <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
          How to read the ratings
        </h2>
        <p className="mt-3 text-sm text-muted">
          Support and est. defaults are rough guides for public MediaWiki sites
          (desktop or primary default). Minerva counts include mobile defaults.
        </p>
        <ul className="mt-4 space-y-3 text-sm text-muted">
          {skin_criteria.map((criterion) => (
            <li key={criterion.id}>
              <span className="font-medium text-foreground">
                {criterion.label}.
              </span>{" "}
              {criterion.description}
            </li>
          ))}
        </ul>
      </section>

      <TopSkins
        selected={columns}
        on_select={select_from_top}
        can_add_column={columns.length < max_columns}
      />
    </div>
  );
}
