import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

interface LegalPageProps {
  title: string;
  updated: string;
  children: ReactNode;
}

/**
 * Shared shell for /privacy and /terms. The Header derives its variant from
 * the pathname, so it renders the solid light state on these routes.
 */
export function LegalPage({ title, updated, children }: LegalPageProps) {
  return (
    <>
      <Header />
      <main className="bg-[#FAF8F5] text-[#2C2824] pt-36 pb-24">
        <article className="container max-w-3xl">
          <p className="text-[11px] uppercase tracking-[4px] text-[#8B7355] mb-4">
            Legal
          </p>
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl mb-3 leading-[1.1]">
            {title}
          </h1>
          <p className="text-sm text-[#6B6560] mb-12">Last updated {updated}</p>
          <div className="legal-copy space-y-6 text-[15px] leading-relaxed text-[#3D3833] [&_h2]:font-[family-name:var(--font-playfair)] [&_h2]:text-2xl [&_h2]:text-[#2C2824] [&_h2]:mt-12 [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_a]:text-[#8B7355] [&_a]:underline [&_a]:underline-offset-2">
            {children}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
