import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { generateSEO, dentistJsonLd } from "@/lib/seo";
import { seedClinicDataIfEmpty } from "@/lib/db";
import { siteConfig } from "@/lib/config";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  ...generateSEO(),
  appleWebApp: {
    capable: true,
    title: "Smilecare Dentist",
    statusBarStyle: "default",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#0F5C5C",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await seedClinicDataIfEmpty();

  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(dentistJsonLd()),
          }}
        />
      </head>
      <body className={`${manrope.className} font-sans`}>{children}</body>
    </html>
  );
}
