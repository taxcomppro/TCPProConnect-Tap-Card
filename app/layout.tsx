import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: "ProConnect Digital Business Card | Tax Compliance Pro",
  description: "The $19 ProConnect NFC digital business card and public professional profile connected to the Tax Compliance Pro Marketplace.",
  metadataBase: new URL("https://www.taxcomppro.com"),
  openGraph: { title: "ProConnect — Your expertise. One powerful tap.", description: "Meet the $19 ProConnect digital business card for the tax community.", type: "website", images: [{ url: "/proconnect-logo-v2.png", width: 1778, height: 887, alt: "ProConnect digital business card by Tax Compliance Pro" }] },
  twitter: { card: "summary_large_image", title: "ProConnect | Tax Compliance Pro", description: "One card. One profile. More ways to grow—for $19 one time.", images: ["/proconnect-logo-v2.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable}`}>{children}</body></html>;
}
