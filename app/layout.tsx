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
  title: "Shibin Mariyan Stanly | Portfolio",
  description:
    "Systems Analyst | Senior Full Stack Developer | MEAN Stack | MERN Stack | AWS | NodeJS | React | Angular | 6 Years Experience",
  keywords: [
    "Full Stack Developer",
    "React",
    "Angular",
    "Node.js",
    "AWS",
    "MEAN Stack",
    "MERN Stack",
    "Portfolio",
  ],
  authors: [{ name: "Shibin Mariyan Stanly" }],
  creator: "Shibin Mariyan Stanly",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shibinmariyan.github.io/portfolio/",
    title: "Shibin Mariyan Stanly | Portfolio",
    description:
      "Systems Analyst | Senior Full Stack Developer | MEAN Stack | MERN Stack",
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
