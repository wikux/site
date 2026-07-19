import type { Metadata } from "next";
import { Container } from "@/components/container";
import { InspirationWall } from "@/components/inspiration_wall";
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

      <InspirationWall wikis={inspiration_wikis} />
    </Container>
  );
}
