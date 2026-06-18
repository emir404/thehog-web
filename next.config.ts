import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 308 permanent redirects from the old Framer site's indexed URLs, so inbound
  // links and search rankings carry over to the new site at launch. Checked
  // before the filesystem; none of these paths exist as pages here.
  async redirects() {
    return [
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/form", destination: "/", permanent: true },
      // No blog yet — send the old /blog (and the current nav label) home for
      // now. Re-point this to the real blog once it exists.
      { source: "/blog", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
