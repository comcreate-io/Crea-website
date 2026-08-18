import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-[70svh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-24 bg-[#FAF8F5] text-[#2C2824]">
        <p className="text-[11px] uppercase tracking-[4px] text-[#8B7355] mb-6">
          404
        </p>
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl mb-6">
          This page does not exist
        </h1>
        <p className="max-w-md text-[#6B6560] mb-10 leading-relaxed">
          The page may have moved. Explore our markets, process, and current
          developments from the home page.
        </p>
        <Link
          href="/"
          className="px-8 py-4 bg-[#2C2824] text-white text-[11px] uppercase tracking-[2px] font-medium hover:bg-[#8B7355] transition-colors"
        >
          Return home
        </Link>
      </main>
      <Footer />
    </>
  );
}
