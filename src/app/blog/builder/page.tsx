import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogBuilder } from "./builder-client";

// Authoring aid only — never indexed.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function BlogBuilderPage() {
  // NODE_ENV is statically inlined, so a production build compiles this to an
  // unconditional notFound() — the builder is a 404 on the live site and its
  // client chunk is never served. It only renders under `next dev`.
  if (process.env.NODE_ENV === "production") notFound();
  return <BlogBuilder />;
}
