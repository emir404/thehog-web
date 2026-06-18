import type { MDXComponents } from "mdx/types";
import Link from "next/link";

// Required by @next/mdx for the App Router. This is the blog's prose styling
// layer in place of @tailwindcss/typography — every rendered markdown element
// maps to design-system classes (same spirit as src/components/layout/legal-page.tsx).
// The post page renders the MDX body with no `prose` wrapper; styling comes from here.

const linkClass =
  "text-brand underline underline-offset-2 transition-colors hover:text-brand-dark";

export function useMDXComponents(components: MDXComponents = {}): MDXComponents {
  return {
    h1: (props) => (
      <h1
        className="mt-12 mb-4 font-heading text-[32px] font-medium leading-[1.15] tracking-[-0.8px] text-ink-deep"
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        className="mt-10 mb-3 font-heading text-[24px] font-medium leading-[1.2] tracking-[-0.4px] text-ink-deep"
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="mt-8 mb-2 font-heading text-[20px] font-medium tracking-[-0.2px] text-ink-deep"
        {...props}
      />
    ),
    p: (props) => (
      <p className="mt-5 text-[16px] leading-[1.7] text-ink/80" {...props} />
    ),
    a: ({ href = "", children, ...props }) => {
      if (/^https?:\/\//.test(href)) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
            {...props}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className={linkClass} {...props}>
          {children}
        </Link>
      );
    },
    ul: (props) => (
      <ul
        className="mt-5 list-disc space-y-2 pl-5 text-[16px] leading-[1.7] text-ink/80 marker:text-taupe"
        {...props}
      />
    ),
    ol: (props) => (
      <ol
        className="mt-5 list-decimal space-y-2 pl-5 text-[16px] leading-[1.7] text-ink/80 marker:text-taupe"
        {...props}
      />
    ),
    li: (props) => <li className="pl-1" {...props} />,
    blockquote: (props) => (
      <blockquote
        className="mt-6 border-l-2 border-brand/40 bg-brand/[0.03] py-2 pl-5 text-[16px] italic leading-[1.6] text-ink/70"
        {...props}
      />
    ),
    hr: () => <hr className="my-10 border-0 border-t border-sand" />,
    // Inline `code` gets a light pill. Block code (fenced) is handled by
    // rehype-pretty-code, which tags its <code> with data-language and injects
    // Shiki's per-token inline colors — leave those untouched so highlighting survives.
    code: ({ children, ...props }) => {
      const isBlock = "data-language" in props;
      if (isBlock) {
        return <code {...props}>{children}</code>;
      }
      return (
        <code
          className="rounded-[3px] bg-sand/60 px-1.5 py-0.5 font-mono text-[0.85em] text-ink-deep"
          {...props}
        >
          {children}
        </code>
      );
    },
    // Style the code-block box only; never recolor the Shiki token spans inside.
    // keepBackground:true means the theme's background arrives as an inline style.
    pre: (props) => (
      <pre
        className="mt-6 overflow-x-auto rounded-[4px] border border-sand/60 p-4 text-[14px] leading-[1.6]"
        {...props}
      />
    ),
    img: ({ src = "", alt = "", ...props }) => (
      // Markdown images carry no intrinsic dimensions and may be remote, so
      // next/image can't take them here.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={typeof src === "string" ? src : ""}
        alt={alt as string}
        loading="lazy"
        className="my-8 w-full rounded-[4px] border border-sand"
        {...props}
      />
    ),
    table: (props) => (
      <div className="my-8 overflow-x-auto rounded-[4px] border border-sand">
        <table className="w-full border-collapse text-[14px]" {...props} />
      </div>
    ),
    th: (props) => (
      <th
        className="border-b border-sand bg-sand/40 px-4 py-2 text-left font-medium text-ink-deep"
        {...props}
      />
    ),
    td: (props) => (
      <td className="border-b border-sand/60 px-4 py-2 text-ink/80" {...props} />
    ),
    ...components,
  } satisfies MDXComponents;
}
