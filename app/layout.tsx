import type { Metadata } from "next";
import { Poppins, Raleway } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import MouseFollower from "@/components/MouseFollower";
import "./globals.scss";

// Next.js font loaders require explicit literals, not variables
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-raleway",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shibin Mariyan Stanly | Senior Full Stack Engineer & Systems Analyst",
  description:
    "Senior Full Stack Engineer specializing in scalable microservices, AI platforms, and high-performance web architecture. 7+ years of experience delivering enterprise solutions using Node.js, React, AWS, and Cloud-Native technologies.",
  keywords: [
    "Senior Full Stack Developer",
    "System Architecture",
    "Microservices",
    "AI Platforms",
    "Performance Optimization",
    "React",
    "Node.js",
    "AWS",
    "Technical Lead",
    "TypeScript",
  ],
  authors: [{ name: "Shibin Mariyan Stanly" }],
  creator: "Shibin Mariyan Stanly",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shibinmariyan.github.io/portfolio/",
    title: "Shibin Mariyan Stanly | Senior Full Stack Engineer",
    description:
      "Architecting scalable enterprise solutions. Expert in Microservices, Real-time Systems, and AI Integration.",
    siteName: "Shibin Mariyan Stanly Portfolio",
    images: [
      {
        url: "/og-image.png", // Ensure this image exists or is created
        width: 1200,
        height: 630,
        alt: "Shibin Mariyan Stanly - Senior Full Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shibin Mariyan Stanly | Senior Full Stack Engineer",
    description: "Architecting scalable enterprise solutions. Expert in Microservices, Real-time Systems, and AI Integration.",
    images: ["/og-image.png"], // Consistent with OG image
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
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${raleway.variable} font-poppins`}>
        <ThemeProvider>
          <MouseFollower />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
