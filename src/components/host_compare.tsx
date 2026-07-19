"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown, ExternalLink, Minus, Plus } from "lucide-react";
import {
  default_selected_host_ids,
  get_host,
  host_criteria,
  host_kind_labels,
  hosts,
  rating_labels,
  rating_levels,
  recommended_host_ids,
  type Host,
  type HostId,
  type HostRating,
} from "@/lib/hosts";

const max_columns = 3;
const min_columns = 2;

function RatingMeter({ rating }: { rating: HostRating }) {
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

function HostSelect({
  value,
  used_elsewhere,
  on_change,
  label,
}: {
  value: HostId;
  used_elsewhere: Set<HostId>;
  on_change: (id: HostId) => void;
  label: string;
}) {
  const listbox_id = useId();
  const root_ref = useRef<HTMLDivElement>(null);
  const [open, set_open] = useState(false);
  const current = get_host(value);

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
        <span className="min-w-0 flex-1">
          <span className="block font-display text-sm font-medium text-foreground">
            {current.name}
          </span>
          <span className="block truncate text-xs text-muted">
            {host_kind_labels[current.kind]} · {current.best_for[0]}
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
          {hosts.map((host) => {
            const selected = host.id === value;
            const taken = used_elsewhere.has(host.id);

            return (
              <li key={host.id} role="option" aria-selected={selected}>
                <button
                  type="button"
                  disabled={taken}
                  onClick={() => {
                    on_change(host.id);
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
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 font-display text-sm font-medium">
                      {host.name}
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
                        : `${host_kind_labels[host.kind]}: ${host.summary}`}
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

function HostFacts({ host }: { host: Host }) {
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 border border-border bg-background px-3 py-3 text-sm">
      <dt className="text-muted">Type</dt>
      <dd className="font-medium text-foreground">
        {host_kind_labels[host.kind]}
      </dd>
      <dt className="text-muted">Cost</dt>
      <dd className="font-medium text-foreground">{host.cost}</dd>
      <dt className="text-muted">Ads</dt>
      <dd className="font-medium text-foreground">{host.ads}</dd>
      <dt className="text-muted">Domain</dt>
      <dd className="font-medium text-foreground">{host.custom_domain}</dd>
      <dt className="text-muted">Extensions</dt>
      <dd className="font-medium text-foreground">{host.extensions}</dd>
    </dl>
  );
}

function HostColumn({
  host,
  column_index,
  column_count,
  used_elsewhere,
  on_change,
  on_remove,
}: {
  host: Host;
  column_index: number;
  column_count: number;
  used_elsewhere: Set<HostId>;
  on_change: (id: HostId) => void;
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
        <HostSelect
          value={host.id}
          used_elsewhere={used_elsewhere}
          on_change={on_change}
          label={`Host for column ${column_index + 1}`}
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
        <div>
          <p className="text-xs font-medium tracking-wide text-muted uppercase">
            {host_kind_labels[host.kind]}
          </p>
          <h3 className="mt-1 font-display text-xl font-semibold tracking-tight text-foreground">
            {host.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {host.summary}
          </p>
          <p className="mt-2 text-xs text-muted">Operated by {host.operator}</p>
        </div>

        <HostFacts host={host} />

        <ul className="flex flex-wrap gap-2">
          {host.best_for.map((tag) => (
            <li
              key={tag}
              className="border border-border px-2 py-0.5 text-xs text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>

        <dl className="divide-y divide-border border-y border-border">
          {host_criteria.map((criterion) => {
            const rating = host.ratings[criterion.id];
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

        {host.caveats.length > 0 ? (
          <div>
            <h4 className="font-display text-sm font-medium text-foreground">
              Watch-outs
            </h4>
            <ul className="mt-2 list-disc space-y-1.5 pl-4 text-sm text-muted">
              {host.caveats.map((caveat) => (
                <li key={caveat}>{caveat}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <p className="mt-auto text-sm">
          <a
            href={host.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-foreground hover:text-wikux-accent"
          >
            Visit site
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

function StartingPoints({
  selected,
  on_select,
}: {
  selected: HostId[];
  on_select: (id: HostId) => void;
}) {
  return (
    <section className="border-t border-border pt-8">
      <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
        Where people usually start
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Quick picks for common situations. Select one to drop it into the
        columns above.
      </p>
      <ul className="mt-5 divide-y divide-border border-y border-border">
        {recommended_host_ids.map((id) => {
          const host = get_host(id);
          const is_selected = selected.includes(id);

          return (
            <li key={id}>
              <button
                type="button"
                disabled={is_selected}
                onClick={() => on_select(id)}
                className={[
                  "flex w-full flex-col gap-1 py-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wikux-accent sm:flex-row sm:items-baseline sm:justify-between sm:gap-6",
                  is_selected
                    ? "cursor-default opacity-50"
                    : "cursor-pointer hover:text-wikux-accent",
                ].join(" ")}
              >
                <span className="min-w-0">
                  <span className="font-display text-base font-medium text-foreground">
                    {host.name}
                  </span>
                  <span className="mt-0.5 block text-sm text-muted sm:mt-0 sm:inline sm:before:mx-2 sm:before:content-['·']">
                    {host.best_for[0]}
                  </span>
                </span>
                <span className="shrink-0 text-xs text-muted">
                  {is_selected ? "In compare" : "Add to compare"}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function HostCompare() {
  const [columns, set_columns] = useState<HostId[]>(
    default_selected_host_ids,
  );

  function set_column(index: number, id: HostId) {
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
      const next_host = hosts.find((host) => !current.includes(host.id));
      if (!next_host) {
        return current;
      }
      return [...current, next_host.id];
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

  function select_from_list(id: HostId) {
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
      .getElementById("host-compare-columns")
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
            Compare farms, managed hosts, and self-hosting on control, cost, ads,
            and how hard they are to leave.
          </p>
        </div>
        {columns.length < max_columns ? (
          <button
            type="button"
            onClick={add_column}
            className="inline-flex w-fit cursor-pointer items-center gap-2 border border-foreground bg-foreground px-3 py-2 text-sm font-medium text-background transition-colors hover:border-wikux-accent hover:bg-wikux-yellow hover:text-on-yellow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wikux-accent"
          >
            <Plus className="size-4" aria-hidden="true" strokeWidth={1.75} />
            Add column
          </button>
        ) : null}
      </div>

      <section id="host-compare-columns" aria-label="Side-by-side comparison">
        <h2 className="sr-only">Side-by-side comparison</h2>
        <div
          className={`grid gap-4 ${
            columns.length === 3 ? "lg:grid-cols-3" : "md:grid-cols-2"
          }`}
        >
          {columns.map((host_id, index) => {
            const host = get_host(host_id);
            const used_elsewhere = new Set(
              columns.filter((_, i) => i !== index),
            );

            return (
              <HostColumn
                key={`${index}-${host.id}`}
                host={host}
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
          Ratings are Wikux opinions for a typical independent public wiki and not a scoreboard. Farms change policies from time to time, soalways check the host before you migrate.
        </p>
        <ul className="mt-4 space-y-3 text-sm text-muted">
          {host_criteria.map((criterion) => (
            <li key={criterion.id}>
              <span className="font-medium text-foreground">
                {criterion.label}.
              </span>{" "}
              {criterion.description}
            </li>
          ))}
        </ul>
      </section>

      <StartingPoints selected={columns} on_select={select_from_list} />
    </div>
  );
}
