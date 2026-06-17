import type { Metadata } from "next";
import { AnnouncementBanner } from "@/components/layout/announcement-banner";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CTA } from "@/components/sections/cta";
import { FAQ } from "@/components/sections/faq";
import { Pricing } from "@/components/sections/pricing";
import { Enterprise } from "@/components/sections/pricing/enterprise";
import { PRICING_FAQS } from "@/components/sections/pricing/faqs";
import { HowBilling } from "@/components/sections/pricing/how-billing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Usage-based pricing for The Hog web intelligence API — pay only for the calls your agents make. 500 free calls every month, automatic volume discounts, and spend caps you control.",
  alternates: { canonical: "/pricing" },
  openGraph: { url: "/pricing" },
};

export default function PricingPage() {
  return (
    <div className="flex min-h-full flex-col">
      <AnnouncementBanner />
      <SiteHeader />
      <main className="flex-1">
        {/* Rates-led top section — reuses the homepage Pricing band without the
            Enterprise block, which gets its own section below. */}
        <Pricing showEnterprise={false} />
        <HowBilling />
        <Enterprise />
        <FAQ heading="Pricing & billing" items={PRICING_FAQS} />
        <CTA />
      </main>
      <SiteFooter />
    </div>
  );
}
