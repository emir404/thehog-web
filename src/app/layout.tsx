import { Agentation } from "agentation";
import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Analytics, AnalyticsNoScript } from "@/components/analytics";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { site } from "@/lib/site";
import "./globals.css";

// Primary brand typeface (Suisse Int'l Trial). The trial cut is missing
// digits 1–9 and most punctuation, so Geist is chained after it in
// globals.css to fill those glyphs until the licensed font is dropped in.
const suisse = localFont({
  variable: "--font-suisse",
  display: "swap",
  src: [
    { path: "./fonts/SuisseIntlTrial-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/SuisseIntlTrial-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/SuisseIntlTrial-Semibold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/SuisseIntlTrial-Bold.ttf", weight: "700", style: "normal" },
  ],
});

// Fallback for glyphs the Suisse trial lacks (numbers, punctuation).
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Secondary typeface — used for code, illustrations, and technical detail.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  openGraph: {
    // title/description/url omitted → inherit each page's resolved values
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

// Organization + WebSite structured data (the live site shipped none).
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/icon.png`,
      description: site.description,
      sameAs: [site.links.linkedin, site.links.instagram, site.links.youtube],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      publisher: { "@id": `${site.url}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${suisse.variable} ${geistSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {/* GTM <noscript> fallback — must be the first node inside <body>. */}
        <AnalyticsNoScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
        {process.env.NODE_ENV === "development" && <Agentation />}
        <Analytics />
      </body>
    </html>
  );
}
