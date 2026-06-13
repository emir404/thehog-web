import type { Metadata } from "next";
import { AnnouncementBanner } from "@/components/layout/announcement-banner";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AboutHero } from "@/components/sections/about/hero";
import { OurStory } from "@/components/sections/about/story";
import { OurVision } from "@/components/sections/about/vision";
import { WhoWeAre } from "@/components/sections/about/team";
import { CTA } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "About",
  description: "The team and story behind The Hog — the web intelligence API for AI agents.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="flex min-h-full flex-col">
      <AnnouncementBanner />
      <SiteHeader />
      <main className="flex-1">
        <AboutHero />
        <OurStory />
        <OurVision />
        <WhoWeAre />
        <CTA />
      </main>
      <SiteFooter />
    </div>
  );
}
