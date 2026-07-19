import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdx_components } from "./mdx_components";

type compile_mdx_props = {
  source: string;
};

export async function render_mdx({ source }: compile_mdx_props) {
  return compileMDX({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
    components: mdx_components,
  });
}
