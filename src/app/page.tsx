import type { Metadata } from "next";
import { AnnouncementBanner } from "@/components/layout/announcement-banner";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Benchmarks } from "@/components/sections/benchmarks";
import { CTA } from "@/components/sections/cta";
import { FAQ } from "@/components/sections/faq";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Pricing } from "@/components/sections/pricing";
import { Problems } from "@/components/sections/problems";
import { Testimonials } from "@/components/sections/testimonials";
import { TrustedBy } from "@/components/sections/trusted-by";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <AnnouncementBanner />
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <TrustedBy />
        <Features />
        <Benchmarks />
        <HowItWorks />
        <Problems />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <SiteFooter />
    </div>
  );
}
