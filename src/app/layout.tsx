import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Crea Development | Luxury Residential Development in Arizona",
  description:
    "Crea Development is a Scottsdale-based luxury residential development firm specializing in high-end, ground-up spec homes in Paradise Valley, Arcadia, Scottsdale, and Biltmore.",
  keywords: [
    "luxury homes Paradise Valley",
    "Scottsdale luxury development",
    "Arizona luxury real estate",
    "high-end spec homes",
    "luxury home builder Arizona",
    "Paradise Valley real estate investment",
  ],
  authors: [{ name: "Crea Development" }],
  openGraph: {
    title: "Crea Development | Luxury Residential Development",
    description:
      "Premier residential development in Arizona's most sought-after markets. Thoughtfully crafted luxury homes.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${playfair.variable} ${inter.variable} antialiased`}>
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
