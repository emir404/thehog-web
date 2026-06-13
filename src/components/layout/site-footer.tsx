import {
  InstagramLogoIcon,
  LinkedinLogoIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { site } from "@/lib/site";

/**
 * Site footer (Figma node 135:890). A "Backed by Y Combinator" badge + the
 * header logo on the left, three link columns on the right, a legal/social
 * row beneath, and an oversized "THE HOG" wordmark that bleeds off the bottom
 * edge (rendered as live Suisse Bold text, clipped by the footer's overflow).
 */

const columns = [
  {
    title: "Site",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
      { label: "Marketplace", href: "#" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Customer", href: "#" },
      { label: "Help Center", href: "#" },
      { label: "Community", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Legal", href: site.links.privacy },
      { label: "Careers", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-background">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-16 px-6 pt-20 pb-12 sm:gap-24 lg:px-[120px]">
        {/* Brand + link columns */}
        <FadeIn className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col items-start gap-4">
            <div className="inline-flex items-center gap-1.5 rounded-[16px] bg-white px-3 py-2 shadow-[0px_1px_12px_rgba(4,21,10,0.1)]">
              <span className="font-heading text-[14px] font-medium tracking-[-0.14px] text-ink-deep">
                Backed by
              </span>
              {/* yc-logo.svg renders YC orange via its var(--fill-0) fallback */}
              <img src="/hero/yc-logo.svg" alt="Y" className="size-4" />
              <span className="font-heading text-[14px] font-medium tracking-[-0.14px] text-ink-deep">
                Combinator
              </span>
            </div>
            {/* Reuse the header logo (per request), not the Figma boar SVG */}
            <Link href="/" aria-label={site.name} className="text-[32px] leading-none">
              🐗
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-10 sm:grid-cols-3 lg:flex lg:gap-24">
            {columns.map((col) => (
              <div key={col.title} className="flex flex-col gap-5">
                <h3 className="font-heading text-[18px] font-medium leading-none text-ink-deep">
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-[16px] text-ink-deep/85 transition-colors hover:text-ink-deep"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Legal + social */}
        <FadeIn className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[14px] leading-[1.5] text-ink-deep/70">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href={site.links.terms}
              className="text-[14px] leading-[1.5] text-ink-deep/70 transition-colors hover:text-ink-deep"
            >
              Terms of Service
            </Link>
            <Link
              href={site.links.privacy}
              className="text-[14px] leading-[1.5] text-ink-deep/70 transition-colors hover:text-ink-deep"
            >
              Privacy Policy
            </Link>
            <Link
              href={site.links.linkedin}
              aria-label="LinkedIn"
              className="text-ink-deep/70 transition-colors hover:text-ink-deep"
            >
              <LinkedinLogoIcon className="size-4" weight="fill" />
            </Link>
            <Link
              href={site.links.instagram}
              aria-label="Instagram"
              className="text-ink-deep/70 transition-colors hover:text-ink-deep"
            >
              <InstagramLogoIcon className="size-4" weight="fill" />
            </Link>
            <Link
              href={site.links.youtube}
              aria-label="YouTube"
              className="text-ink-deep/70 transition-colors hover:text-ink-deep"
            >
              <YoutubeLogoIcon className="size-4" weight="fill" />
            </Link>
          </div>
        </FadeIn>
      </div>

      {/* Oversized brand wordmark — decorative, bleeds off the bottom edge */}
      <div aria-hidden className="pointer-events-none select-none">
        <span className="-mb-[6.5vw] block text-center font-heading text-[22vw] font-bold leading-none tracking-[-0.04em] text-ink-deep">
          THE HOG
        </span>
      </div>
    </footer>
  );
}
