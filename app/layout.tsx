import type { Metadata } from "next";

import { ThemeProvider } from "@/components/ThemeProvider";
import MouseFollower from "@/components/MouseFollower";
import { FramerLazyMotion } from "@/components/FramerLazyMotion";
import { portfolioData } from "@/app/data/portfolio";
import "./globals.scss";

import { poppins, raleway } from "@/config/fonts";

export const metadata: Metadata = {
  title: `${portfolioData.personalInfo.name} | ${portfolioData.personalInfo.title}`,
  description: portfolioData.summary,
  keywords: [
    ...portfolioData.personalInfo.keywords,
    ...portfolioData.skillCategories.flatMap(cat => cat.skills),
  ],
  authors: [{ name: portfolioData.personalInfo.name }],
  creator: portfolioData.personalInfo.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `https://${portfolioData.personalInfo.portfolio}`,
    title: `${portfolioData.personalInfo.name} | ${portfolioData.personalInfo.title}`,
    description: portfolioData.personalInfo.tagline,
    siteName: `${portfolioData.personalInfo.name} Portfolio`,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${portfolioData.personalInfo.name} - ${portfolioData.personalInfo.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${portfolioData.personalInfo.name} | ${portfolioData.personalInfo.title}`,
    description: portfolioData.personalInfo.tagline,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD Schema for SEO & ATS
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: portfolioData.personalInfo.name,
    jobTitle: portfolioData.personalInfo.title,
    url: `https://${portfolioData.personalInfo.portfolio}`,
    sameAs: portfolioData.personalInfo.socials.map((s) => s.href),
    alumniOf: portfolioData.education.map((edu) => edu.college),
    worksFor: {
      "@type": "Organization",
      name: portfolioData.experience[0].company,
    },
    description: `${portfolioData.summary} Open to opportunities in ${portfolioData.personalInfo.preferredLocations.join(", ")}.`,
    knowsAbout: portfolioData.skillCategories.flatMap((cat) => cat.skills),
    address: {
      "@type": "PostalAddress",
      addressLocality: portfolioData.personalInfo.address.city,
      addressRegion: portfolioData.personalInfo.address.region,
      addressCountry: portfolioData.personalInfo.address.country,
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${poppins.variable} ${raleway.variable} font-poppins`}>
        <ThemeProvider>
          <FramerLazyMotion>
            <MouseFollower />
            {children}
          </FramerLazyMotion>
        </ThemeProvider>
        {/* <Analytics /> - Placeholder for Vercel Analytics or Google Analytics */}
      </body>
    </html >
  );
}
