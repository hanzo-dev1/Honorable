import type { Metadata } from "next";
import { display, editorial, mono } from "./fonts";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { CursorSpotlight } from "@/components/providers/CursorSpotlight";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const title = "David Oganah — AI Automation Engineer";
const description =
  "I build the systems that run the work nobody wants to do. Autonomous agents, RAG support desks, and end-to-end revenue automation for companies that have outgrown spreadsheets — deployed on n8n, wired into the tools your team already lives in.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "David Oganah",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "David Oganah",
      url: siteUrl,
      jobTitle: "AI Automation Engineer",
      worksFor: {
        "@type": "Organization",
        name: "SabiFlow Technologies Ltd",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lagos",
        addressCountry: "NG",
      },
      sameAs: [],
    },
    {
      "@type": "ProfessionalService",
      name: "SabiFlow Technologies Ltd",
      url: siteUrl,
      areaServed: "Worldwide",
      founder: {
        "@type": "Person",
        name: "David Oganah",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lagos",
        addressCountry: "NG",
      },
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
      className={`${display.variable} ${editorial.variable} ${mono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-void font-display text-bone">
        <div className="bg-grid" aria-hidden />
        <div className="bg-grain" aria-hidden />
        <MotionProvider>
          <CursorSpotlight />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
