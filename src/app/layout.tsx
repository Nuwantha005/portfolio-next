import "./globals.css";
import type { Metadata, Viewport } from "next";
import { BackgroundWrapper } from "@/components/ui/BackgroundWrapper";

export const metadata: Metadata = {
  title: {
    default: "Nuwantha Kumara - Portfolio",
    template: "%s | Nuwantha Kumara",
  },
  description:
    "Mechanical Engineering student with a passion for programming. Explore my projects in software development, simulations, CAD modeling, and data visualization.",
  keywords: [
    "Nuwantha Kumara",
    "Portfolio",
    "Mechanical Engineering",
    "Software Developer",
    "Java",
    "Python",
    "MATLAB",
    "CAD",
    "SolidWorks",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Nuwantha Kumara" }],
  creator: "Nuwantha Kumara",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Nuwantha Kumara Portfolio",
    title: "Nuwantha Kumara - Portfolio",
    description:
      "Mechanical Engineering student with a passion for programming. Explore my projects in software development, simulations, and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nuwantha Kumara - Portfolio",
    description:
      "Mechanical Engineering student with a passion for programming.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <BackgroundWrapper>
          {children}
        </BackgroundWrapper>
      </body>
    </html>
  );
}
