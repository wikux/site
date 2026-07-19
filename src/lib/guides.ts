import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { guides_content_dir } from "./paths";
import { render_mdx } from "./mdx_render";

const mdx_ext = ".mdx";

export type guide_frontmatter = {
  title: string;
  summary: string;
};

export type guide_summary = {
  slug: string;
  data: guide_frontmatter;
};

export async function get_guide_slugs(): Promise<string[]> {
  try {
    const names = await fs.readdir(guides_content_dir);
    return names
      .filter((n) => n.endsWith(mdx_ext))
      .map((n) => n.slice(0, -mdx_ext.length));
  } catch {
    return [];
  }
}

export async function read_guide_raw(slug: string): Promise<string | null> {
  const file_path = path.join(guides_content_dir, `${slug}${mdx_ext}`);
  try {
    return await fs.readFile(file_path, "utf8");
  } catch {
    return null;
  }
}

export async function get_guide_summary(
  slug: string,
): Promise<guide_summary | null> {
  const raw = await read_guide_raw(slug);
  if (!raw) return null;
  const { data } = matter(raw);
  return { slug, data: data as guide_frontmatter };
}

export async function get_all_guide_summaries(): Promise<guide_summary[]> {
  const slugs = await get_guide_slugs();
  const rows = await Promise.all(slugs.map((s) => get_guide_summary(s)));
  return rows.filter(Boolean) as guide_summary[];
}

export async function compile_guide_page(slug: string) {
  const raw = await read_guide_raw(slug);
  if (!raw) return null;
  const { content, frontmatter } = await render_mdx({ source: raw });
  return {
    slug,
    content,
    frontmatter: frontmatter as guide_frontmatter,
  };
}
