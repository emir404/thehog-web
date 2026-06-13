import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

type LegalPageProps = {
  title: string;
  /** Human-readable "last updated" date, e.g. "June 13, 2026". */
  updated: string;
  children: ReactNode;
};

/**
 * Shared chrome + prose styling for legal pages (privacy, terms). Wraps a
 * centered, readable article in the standard header/footer shell. Page files
 * supply plain semantic <h2>/<p>/<ul> content; typography is applied here via
 * descendant selectors so the copy itself stays clean.
 */
export function LegalPage({ title, updated, children }: LegalPageProps) {
  return (
    <div className="flex min-h-full flex-col">
      <SiteHeader />
      <main className="flex-1">
        <article className="mx-auto w-full max-w-[760px] px-6 py-24 sm:py-32">
          <p className="text-[14px] font-medium uppercase tracking-[0.08em] text-brand">
            Legal
          </p>
          <h1 className="mt-4 font-heading text-[40px] font-medium leading-[1.15] tracking-[-1.2px] text-ink-deep">
            {title}
          </h1>
          <p className="mt-4 text-[14px] text-taupe">Last updated {updated}</p>

          <div className="mt-12 [&>:first-child]:mt-0 [&_a]:text-brand [&_a]:underline [&_a:hover]:text-brand-dark [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:font-heading [&_h2]:text-[20px] [&_h2]:font-medium [&_h2]:tracking-[-0.2px] [&_h2]:text-ink-deep [&_li]:mt-2 [&_li]:text-[16px] [&_li]:leading-[1.6] [&_li]:text-ink/80 [&_p]:mt-4 [&_p]:text-[16px] [&_p]:leading-[1.6] [&_p]:text-ink/80 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5">
            {children}
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
