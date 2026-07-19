import { ExternalLink } from "lucide-react";
import type { Resource } from "@/lib/resources";

type ResourceCardProps = {
  resource: Resource;
};

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full cursor-pointer flex-col border border-border bg-surface p-4 transition-colors hover:border-wikux-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-wikux-accent sm:p-5"
    >
      <span className="inline-flex items-center gap-2 font-display text-lg font-medium text-foreground group-hover:text-wikux-accent">
        {resource.name}
        <ExternalLink
          className="size-3.5 shrink-0 opacity-50 transition-opacity group-hover:opacity-100"
          aria-hidden="true"
          strokeWidth={1.75}
        />
      </span>
      <span className="mt-1 text-sm text-muted">by {resource.by}</span>
      <span className="mt-3 flex-1 text-muted">{resource.summary}</span>
      <span className="mt-4 border border-border px-2 py-0.5 text-xs text-muted w-fit">
        {resource.kind}
      </span>
    </a>
  );
}
