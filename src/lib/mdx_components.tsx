import Link from "next/link";
import type { ComponentProps } from "react";

function mdx_link(props: ComponentProps<"a">) {
  const href = props.href ?? "";
  if (href.startsWith("/")) {
    return <Link href={href} className="mdx-link" {...props} />;
  }
  return (
    <a
      className="mdx-link"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  );
}

export const mdx_components = {
  a: mdx_link,
};
