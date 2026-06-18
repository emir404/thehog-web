import { BookOpenIcon, HouseIcon } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import { AnnouncementBanner } from "@/components/layout/announcement-banner";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ActionButton } from "@/components/ui/action-button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  // A 404 should never be indexed or surfaced in search.
  robots: { index: false, follow: false },
};

/**
 * Branded 404 (no Figma node — composed from the design system). Reuses the
 * standard page shell so dead ends look on-brand. Left-aligned to match the
 * hero/CTA, with the 🐗 mark, a brand eyebrow, and the signature buttons.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-full flex-col">
      <AnnouncementBanner />
      <SiteHeader />
      <main className="flex flex-1 items-center">
        <div className="mx-auto w-full max-w-[1440px] px-6 py-24 sm:py-32 lg:px-[120px]">
          <div className="flex max-w-[640px] flex-col gap-6">
            <span aria-hidden className="text-[64px] leading-none">
              🐗
            </span>
            <span className="text-[14px] font-medium uppercase tracking-[-0.14px] text-brand">
              404 — Page not found
            </span>
            <h1 className="font-heading text-[44px] font-medium leading-none tracking-[-1.76px] text-ink-deep sm:text-[64px] sm:tracking-[-2.56px]">
              This page wandered off.
            </h1>
            <p className="max-w-[480px] text-[16px] leading-[1.5] text-ink/80">
              The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
              Let&rsquo;s get you back to The Hog.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <ActionButton href="/" icon={HouseIcon}>
                Back to home
              </ActionButton>
              <ActionButton href={site.links.docs} variant="tint" icon={BookOpenIcon}>
                Read the docs
              </ActionButton>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
