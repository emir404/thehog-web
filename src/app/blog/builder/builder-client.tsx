"use client";

import { useMemo, useState, type ReactNode } from "react";
import { DownloadSimpleIcon } from "@phosphor-icons/react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ActionButton } from "@/components/ui/action-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type BuilderForm = {
  title: string;
  description: string;
  author: string;
  date: string;
  tags: string; // comma-separated
  cover: string;
  draft: boolean;
  body: string;
};

const INITIAL: BuilderForm = {
  title: "",
  description: "",
  author: "The Hog Team",
  date: "",
  tags: "",
  cover: "",
  draft: false,
  body: "Write your post in **Markdown**.\n\n## A section\n\n- a point\n- another point\n",
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Serialize the form into a YAML frontmatter block + body, ready to commit as .mdx. */
function toFileContents(form: BuilderForm): string {
  const quote = (v: string) => `"${v.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  const lines = [
    `title: ${quote(form.title)}`,
    `description: ${quote(form.description)}`,
    `date: ${quote(form.date)}`,
    `author: ${quote(form.author)}`,
  ];
  const tags = form.tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  if (tags.length) lines.push(`tags: [${tags.map(quote).join(", ")}]`);
  if (form.cover.trim()) lines.push(`cover: ${quote(form.cover.trim())}`);
  if (form.draft) lines.push("draft: true");
  return `---\n${lines.join("\n")}\n---\n\n${form.body.trimEnd()}\n`;
}

function downloadFile(filename: string, contents: string): void {
  const blob = new Blob([contents], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// Mirrors src/mdx-components.tsx so the preview approximates the published post.
// react-markdown renders plain HTML elements, so we style by descendant selector
// (the same technique as src/components/layout/legal-page.tsx).
const PROSE = cn(
  "[&>:first-child]:mt-0",
  "[&_h1]:mt-12 [&_h1]:mb-4 [&_h1]:font-heading [&_h1]:text-[32px] [&_h1]:font-medium [&_h1]:leading-[1.15] [&_h1]:tracking-[-0.8px] [&_h1]:text-ink-deep",
  "[&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:font-heading [&_h2]:text-[24px] [&_h2]:font-medium [&_h2]:tracking-[-0.4px] [&_h2]:text-ink-deep",
  "[&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:font-heading [&_h3]:text-[20px] [&_h3]:font-medium [&_h3]:text-ink-deep",
  "[&_p]:mt-5 [&_p]:text-[16px] [&_p]:leading-[1.7] [&_p]:text-ink/80",
  "[&_a]:text-brand [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-brand-dark",
  "[&_ul]:mt-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:text-[16px] [&_ul]:leading-[1.7] [&_ul]:text-ink/80 [&_ul]:marker:text-taupe",
  "[&_ol]:mt-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_ol]:text-[16px] [&_ol]:leading-[1.7] [&_ol]:text-ink/80 [&_ol]:marker:text-taupe",
  "[&_blockquote]:mt-6 [&_blockquote]:border-l-2 [&_blockquote]:border-brand/40 [&_blockquote]:bg-brand/[0.03] [&_blockquote]:py-2 [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-ink/70",
  "[&_hr]:my-10 [&_hr]:border-0 [&_hr]:border-t [&_hr]:border-sand",
  "[&_code]:font-mono [&_code]:text-[0.9em]",
  "[&_:not(pre)>code]:rounded-[3px] [&_:not(pre)>code]:bg-sand/60 [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:text-ink-deep",
  "[&_pre]:mt-6 [&_pre]:overflow-x-auto [&_pre]:rounded-[4px] [&_pre]:bg-[#0d1117] [&_pre]:p-4 [&_pre]:text-[14px] [&_pre]:leading-[1.6] [&_pre]:text-sand",
  "[&_table]:mt-6 [&_table]:w-full [&_table]:border-collapse [&_table]:text-[14px]",
  "[&_th]:border [&_th]:border-sand [&_th]:bg-sand/40 [&_th]:px-4 [&_th]:py-2 [&_th]:text-left [&_th]:font-medium [&_th]:text-ink-deep",
  "[&_td]:border [&_td]:border-sand/60 [&_td]:px-4 [&_td]:py-2 [&_td]:text-ink/80",
);

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      {children}
      {hint ? <p className="text-[12px] text-taupe">{hint}</p> : null}
    </div>
  );
}

export function BlogBuilder() {
  // Lazy init stamps today's date once. toISOString() is UTC on both server and
  // client, so the SSR'd value matches hydration — no mismatch, no setState-in-effect.
  const [form, setForm] = useState<BuilderForm>(() => ({
    ...INITIAL,
    date: new Date().toISOString().slice(0, 10),
  }));
  const update = (patch: Partial<BuilderForm>) =>
    setForm((prev) => ({ ...prev, ...patch }));

  const slug = useMemo(() => slugify(form.title), [form.title]);
  const canExport = form.title.trim().length > 0 && form.body.trim().length > 0;

  const handleExport = () => {
    if (!canExport) return;
    const filename = `${slug || "post"}.mdx`;
    downloadFile(filename, toFileContents(form));
    toast.success(`Exported ${filename}`, {
      description: "Drop it into src/content/blog/ and commit.",
    });
  };

  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto w-full max-w-[1440px] px-6 py-16 lg:px-[120px]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col gap-2">
              <span className="inline-flex w-fit items-center rounded-full bg-brand/5 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.06em] text-brand">
                Dev only
              </span>
              <h1 className="font-heading text-[40px] font-medium leading-[1.15] tracking-[-1.2px] text-ink-deep">
                Blog builder
              </h1>
              <p className="text-[14px] text-taupe">
                Draft a post, then export{" "}
                <code className="rounded-[3px] bg-sand/60 px-1.5 py-0.5 font-mono text-[0.85em] text-ink-deep">
                  {slug || "post"}.mdx
                </code>{" "}
                into <code className="rounded-[3px] bg-sand/60 px-1.5 py-0.5 font-mono text-[0.85em] text-ink-deep">src/content/blog/</code>.
              </p>
            </div>
            <ActionButton
              type="button"
              onClick={handleExport}
              disabled={!canExport}
              icon={DownloadSimpleIcon}
            >
              Export as .mdx
            </ActionButton>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Editor */}
            <div className="flex flex-col gap-5">
              <Field label="Title">
                <Input
                  value={form.title}
                  onChange={(e) => update({ title: e.target.value })}
                  placeholder="Introducing the The Hog API"
                />
              </Field>
              <Field label="Description">
                <Input
                  value={form.description}
                  onChange={(e) => update({ description: e.target.value })}
                  placeholder="One sentence that sells the post."
                />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Author">
                  <Input
                    value={form.author}
                    onChange={(e) => update({ author: e.target.value })}
                  />
                </Field>
                <Field label="Date">
                  <Input
                    type="date"
                    value={form.date}
                    onChange={(e) => update({ date: e.target.value })}
                  />
                </Field>
              </div>
              <Field label="Tags" hint="Comma-separated, e.g. Engineering, Guides">
                <Input
                  value={form.tags}
                  onChange={(e) => update({ tags: e.target.value })}
                  placeholder="Announcements, Product"
                />
              </Field>
              <Field label="Cover" hint="Optional. Local path under /public, e.g. /blog/cover.webp">
                <Input
                  value={form.cover}
                  onChange={(e) => update({ cover: e.target.value })}
                  placeholder="/blog/cover.webp"
                />
              </Field>
              <label className="flex items-center gap-2 text-[14px] text-ink/80">
                <input
                  type="checkbox"
                  checked={form.draft}
                  onChange={(e) => update({ draft: e.target.checked })}
                  className="size-4 accent-brand"
                />
                Draft (hidden in production)
              </label>
              <Field label="Body (Markdown)">
                <Textarea
                  value={form.body}
                  onChange={(e) => update({ body: e.target.value })}
                  className="min-h-[480px] font-mono text-[14px] leading-[1.6]"
                />
              </Field>
            </div>

            {/* Preview */}
            <div className="flex flex-col gap-3">
              <p className="text-[12px] text-taupe">
                Preview approximates final styling. Code highlighting and MDX
                components render only after build.
              </p>
              <div className="rounded-[4px] bg-white p-8 shadow-[0px_0px_16px_0px_rgba(4,27,32,0.04)]">
                <div className={PROSE}>
                  <Markdown remarkPlugins={[remarkGfm]}>
                    {form.body || "_Nothing to preview yet._"}
                  </Markdown>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
