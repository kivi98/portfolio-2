import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "../styles/syntax-highlighting.css";
import "../styles/mdx-typography.css";
import ThemeProvider from "@/theme/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeaderBlurOverlay from "@/components/HeaderBlurOverlay";
import Providers from "@/components/Providers";

// Editorial serif display — the signature voice for headings.
const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

// Clean grotesque for body copy and UI.
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

// Mono utility face — labels, section numbers, code.
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // Required so the Open Graph / Twitter image paths below resolve to absolute
  // URLs — social scrapers reject relative ones.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://kiviamarakoon.me",
  ),
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
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kivi Amarakoon — Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kivi Amarakoon - Portfolio",
    description:
      "Software Engineer, Developer, and Designer. Explore my projects, skills, and experience in web development and software engineering.",
    images: ["/og-image.png"],
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
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#C2410C" },
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
      <body
        className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      >
        <Providers>
          <ThemeProvider>
            <Header />
            <HeaderBlurOverlay />
            {children}
            <Footer />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
