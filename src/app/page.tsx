import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { AcquisitionsSection } from "@/components/sections/AcquisitionsSection";
import { DevelopmentsSection } from "@/components/sections/DevelopmentsSection";
import { InvestmentSection } from "@/components/sections/InvestmentSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { MapSection } from "@/components/sections/MapSection";
import { pageMeta } from "@/lib/meta";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMeta({
    path: "/",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  }),
  // The homepage carries the full default title, not the "%s | Crea" template.
  title: { absolute: DEFAULT_TITLE },
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <ProcessSection />
        <AcquisitionsSection />
        <InvestmentSection />
        <DevelopmentsSection />
        <ProjectsSection />
        <TeamSection />
        <ContactSection />
        <MapSection />
      </main>
      <Footer />
    </>
  );
}
