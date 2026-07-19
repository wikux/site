import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { compile_guide_page, get_guide_slugs } from "@/lib/guides";

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await get_guide_slugs();
  return slugs.map((slug) => ({ slug }));
}

type page_props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: page_props): Promise<Metadata> {
  const { slug } = await params;
  const page = await compile_guide_page(slug);
  if (!page) return { title: "Not found" };
  return {
    title: page.frontmatter.title,
    description: page.frontmatter.summary,
  };
}

export default async function GuidePage({ params }: page_props) {
  const { slug } = await params;
  const page = await compile_guide_page(slug);
  if (!page) {
    notFound();
  }

  return (
    <Container className="py-16 sm:py-20">
      <p className="mb-6 text-sm text-muted animate_fade_up">
        <Link
          href="/guides"
          className="nav_link text-muted hover:text-foreground"
        >
          Guides
        </Link>
        <span aria-hidden="true"> / </span>
        <span className="text-foreground">{page.frontmatter.title}</span>
      </p>

      <div className="max-w-3xl animate_fade_up_delay">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {page.frontmatter.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          {page.frontmatter.summary}
        </p>
        <article className="prose mt-10">{page.content}</article>
      </div>
    </Container>
  );
}
