import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/theme/ThemeProvider";
import Header from "@/components/Header";
import ParticleBackground from "@/components/ParticleBackground";
import Providers from "@/components/Providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
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
      <body className={`${inter.variable} ${robotoMono.variable}`}>
        <Providers>
          <ThemeProvider>
            <ParticleBackground />
            <Header />
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
