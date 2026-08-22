"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { TextAnimate } from "@/components/ui/text-animate";

const teamMembers = [
  {
    name: "Katrina Barrett",
    company: "Walt Danley | Christie's International Real Estate",
    role: "Listing Agent",
    description:
      "Ranked #1 in Arizona by RealTrends with over $1B in luxury home sales. A prominent figure in Arizona's luxury market, consistently ranked among the top agents in the US. Her client-first approach, deep market knowledge, and access to the ultra-luxury network delivers results for the most discerning buyers, sellers, and investors.",
  },
  {
    name: "Scott Gould",
    company: "Private Hard Money",
    role: "Lender",
    description:
      "One of Arizona's most experienced private lenders with 30+ years in the industry and over 50,000 loans funded totaling well over 10 figures. His track record spans multiple market cycles, providing rare insight into risk management and deal structure. Scott has consulted on thousands of luxury homes across Arcadia, Paradise Valley, Scottsdale, and Northern Arizona. When Scott is the lender, investors gain confidence knowing the project is backed by an industry veteran with decades of success.",
  },
  {
    name: "Bill George",
    company: "",
    role: "Builder",
    description:
      "30+ years of construction experience, previously running one of Arizona's largest demolition companies and managing numerous luxury projects simultaneously. Works exclusively in strict, high-end areas with demanding clientele. Bill personally oversees every job site, keeps critical work in-house, and maintains elite quality control. His decades-deep network ensures no challenge goes unsolved. Investors gain a builder known for precision, reliability, and field expertise.",
  },
  {
    name: "Fabiola Sweis",
    company: "Folklore Spaces",
    role: "Interior Designer",
    description:
      "A luxury, highly exclusive interior design studio with 15+ years of experience across high-end residential, commercial, and hospitality projects. Known for story-driven, culturally inspired aesthetic, working with a limited number of clients each year to deliver fully bespoke, detail-rich design. Handles everything from concept and construction documentation to procurement and installation.",
  },
  {
    name: "Duran Thompson & Ardell Yaziie",
    company: "D&M Engineering",
    role: "Structural Engineers",
    description:
      "A long-established Arizona engineering firm with deep experience designing complex residential projects across the Valley. They have engineered our plans multiple times and maintain long-standing relationships with our lender, builder, and project team. Their structural expertise, technical precision, and in-house engineering process deliver accuracy, efficiency, and compliance at every stage.",
  },
  {
    name: "Altitude Design Ltd.",
    company: "Residential Architecture",
    role: "Architect",
    description:
      "A full-service residential design and drafting firm known for translating client vision into thoughtful, permit-ready architecture. They've produced our plans multiple times, giving them deep familiarity with every detail. Because plans have been submitted and approved repeatedly, and they maintain strong relationships with the city, projects move through approval significantly faster.",
  },
  {
    name: "Design Tank Architecture",
    company: "Luxury Residential Design",
    role: "Architect | 5515 N Marion Way",
    description:
      "A leading luxury residential design firm known for modern homes with exceptional indoor-outdoor integration. Multiple Gold Award winners at the 2025 Iconic Design Awards along with other major regional and national honors. Deep experience across Scottsdale, Phoenix, and Paradise Valley; they understand what high-end buyers want.",
  },
];

export function TeamSection() {
  return (
    <section id="team" className="py-16 md:py-24 lg:py-32 bg-[#1C1917] text-white">
      <div className="container px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <BlurFade delay={0.1} inView>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[2px] sm:tracking-[3px] text-[#C9A96E] mb-4 sm:mb-6 block">
              Our Network
            </span>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] mb-4 sm:mb-6">
              <TextAnimate as="span" animation="blurInUp" by="word">
                The
              </TextAnimate>{" "}
              <span className="text-[#C9A96E]">Team</span>
            </h2>
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <p className="text-base sm:text-lg text-white/70 max-w-3xl mx-auto leading-relaxed px-2">
              Every CREA project is backed by Arizona&apos;s most experienced
              professionals: decades of proven success across lending, construction,
              design, and sales.
            </p>
          </BlurFade>
        </div>

        {/* Team Grid */}
        <div className="space-y-0">
          {teamMembers.map((member, index) => (
            <BlurFade key={member.name} delay={0.3 + index * 0.08} inView>
              <div className="group py-6 sm:py-8 border-b border-white/10 hover:bg-white/[0.02] transition-colors px-2 sm:px-4 -mx-2 sm:-mx-4">
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-3 sm:gap-4 lg:gap-12">
                  {/* Left - Name and Role */}
                  <div>
                    <h3 className="font-[family-name:var(--font-playfair)] text-lg sm:text-xl md:text-2xl text-white group-hover:text-[#C9A96E] transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] uppercase tracking-[1.5px] sm:tracking-[2px] text-[#C9A96E] mt-1">
                      {member.role}
                    </p>
                    <p className="text-xs sm:text-sm text-white/50 mt-1">
                      {member.company}
                    </p>
                  </div>

                  {/* Right - Description */}
                  <p className="text-white/60 leading-relaxed text-xs sm:text-sm md:text-base group-hover:text-white/80 transition-colors mt-2 lg:mt-0">
                    {member.description}
                  </p>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
