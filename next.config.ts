import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Treat .md/.mdx as compilable so the blog's dynamic `import()` resolves.
  // (Posts live in src/content/blog — never under src/app — so they don't
  // accidentally become routes.)
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  // 308 permanent redirects from the old Framer site's indexed URLs, so inbound
  // links and search rankings carry over to the new site at launch. Checked
  // before the filesystem; none of these paths exist as pages here.
  async redirects() {
    return [
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/form", destination: "/", permanent: true },
    ];
  },
};

// Next 16 dev uses Turbopack, which can't accept imported plugin functions —
// only string names with serializable options. Keep every plugin a string.
const withMDX = createMDX({
  options: {
    remarkPlugins: [
      "remark-gfm", // GFM tables, strikethrough, task lists
      // Parse the YAML frontmatter into a node the compiler drops, so the raw
      // `---` fence never renders into the post body. (gray-matter reads the
      // same frontmatter for metadata in src/lib/blog.ts.)
      "remark-frontmatter",
    ],
    rehypePlugins: [
      // Build-time syntax highlighting via Shiki — no client JS, no flash.
      ["rehype-pretty-code", { theme: "github-dark", keepBackground: true }],
    ],
  },
});

export default withMDX(nextConfig);
