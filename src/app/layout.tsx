import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyWhatsApp from "@/components/ui/StickyWhatsApp";

export const metadata: Metadata = {
  title: {
    default: "Solstric — Alternative Kitchens & Energy Resilience Products",
    template: "%s | Solstric",
  },
  description:
    "Shop induction cooktops, rice cookers, smokeless stoves, solar systems & portable power stations. Serving Delhi NCR and Madhya Pradesh. Order on WhatsApp.",
  metadataBase: new URL("https://solstric.in"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Solstric",
    title: "Solstric — Alternative Kitchens & Energy Resilience Products",
    description:
      "Induction cooktops, smokeless stoves, solar systems & more. WhatsApp ordering. Delhi NCR & MP delivery.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solstric — Alternative Kitchens & Energy Resilience",
    description: "Cook smarter. Power up. Shop electric cooking and solar backup products.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLdOrg = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Solstric",
  url: "https://solstric.in",
  description: "Alternative kitchens and energy resilience products for India",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["English", "Hindi"],
  },
};

const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Solstric",
  url: "https://solstric.in",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-gray-900 antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyWhatsApp />
      </body>
    </html>
  );
}
