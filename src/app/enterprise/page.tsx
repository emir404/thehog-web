import type { Metadata } from "next";
import { AnnouncementBanner } from "@/components/layout/announcement-banner";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Capabilities } from "@/components/sections/enterprise/capabilities";
import { EnterpriseCTA } from "@/components/sections/enterprise/cta";
import { ENTERPRISE_FAQS } from "@/components/sections/enterprise/faqs";
import { EnterpriseHero } from "@/components/sections/enterprise/hero";
import { Onboarding } from "@/components/sections/enterprise/onboarding";
import { Security } from "@/components/sections/enterprise/security";
import { FAQ } from "@/components/sections/faq";
import { TrustedBy } from "@/components/sections/trusted-by";

export const metadata: Metadata = {
  title: "Enterprise",
  description:
    "The Hog for enterprise — one web intelligence API for agents in production, with custom data, SSO, security review, committed-use pricing, dedicated support, and SLAs.",
  alternates: { canonical: "/enterprise" },
  openGraph: { url: "/enterprise" },
};

export default function EnterprisePage() {
  return (
    <div className="flex min-h-full flex-col">
      <AnnouncementBanner />
      <SiteHeader />
      <main className="flex-1">
        <EnterpriseHero />
        <TrustedBy />
        <Capabilities />
        <Security />
        <Onboarding />
        <FAQ eyebrow="Enterprise" heading="Enterprise questions" items={ENTERPRISE_FAQS} />
        <EnterpriseCTA />
      </main>
      <SiteFooter />
    </div>
  );
}
