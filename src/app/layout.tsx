import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "../styles/syntax-highlighting.css";
import "../styles/mdx-typography.css";
import ThemeProvider from "@/theme/ThemeProvider";
import Header from "@/components/Header";
import HeaderBlurOverlay from "@/components/HeaderBlurOverlay";
import ParticleBackground from "@/components/ParticleBackground";
import Providers from "@/components/Providers";

// Canva-style display font for headings
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

// Modern sans-serif for body text
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

// Clean monospace for code
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kivi Amarakoon",
  description:
    "Software Engineer, Developer, and Designer. Explore my projects, skills, and experience in web development and software engineering.",
  keywords: [
    "Kivi Amarakoon",
    "Software Engineer",
    "Developer",
    "Portfolio",
    "Web Development",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Kivi Amarakoon" }],
  creator: "Kivi Amarakoon",
  publisher: "Kivi Amarakoon",
  robots: "index, follow",
  openGraph: {
    title: "Kivi Amarakoon - Portfolio",
    description:
      "Software Engineer, Developer, and Designer. Explore my projects, skills, and experience in web development and software engineering.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kivi Amarakoon - Portfolio",
    description:
      "Software Engineer, Developer, and Designer. Explore my projects, skills, and experience in web development and software engineering.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#E30000" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
        <Providers>
          <ThemeProvider>
            <ParticleBackground />
            <Header />
            <HeaderBlurOverlay />
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
