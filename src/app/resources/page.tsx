import type { Metadata } from "next";
import { Container } from "@/components/container";
import { ResourceCard } from "@/components/resource_card";
import { resource_sections, resources } from "@/lib/resources";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "A curated hub of MediaWiki extensions, browser tools, and related projects. Not all projects listed here are from Wikux.",
};

export default function ResourcesPage() {
  return (
    <Container className="py-16 sm:py-20">
      <header className="mb-12 max-w-2xl animate_fade_up">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Resources
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          Extensions, sync tooling, and browser helpers worth knowing about for
          MediaWiki wikis.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Not all projects listed here are from Wikux. Community and third-party
          work is included when it is useful for independent wikis.
        </p>
      </header>

      <div className="animate_fade_up_delay flex flex-col gap-14">
        {resource_sections.map((section) => {
          const items = resources.filter(
            (resource) => resource.kind === section.kind,
          );
          if (items.length === 0) {
            return null;
          }

          return (
            <section key={section.kind}>
              <h2 className="mb-5 font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {section.title}
              </h2>
              <ul className="grid gap-6 sm:grid-cols-2">
                {items.map((resource) => (
                  <li key={resource.url}>
                    <ResourceCard resource={resource} />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </Container>
  );
}
