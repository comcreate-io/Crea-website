"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import {
  MapTrifold,
  HardHat,
  ChartLineUp,
  Scales,
  Handshake,
  ArrowRight,
  Storefront,
} from "@phosphor-icons/react";

const services = [
  {
    Icon: Scales,
    name: "Underwriting",
    description:
      "Rigorous financial modeling and risk assessment to ensure conservative return thresholds.",
    href: "#contact",
  },
  {
    Icon: ChartLineUp,
    name: "Market Analysis",
    description:
      "Data-driven insights into buyer preferences, pricing trends, and neighborhood dynamics.",
    href: "#contact",
  },
  {
    Icon: Handshake,
    name: "Investment",
    description:
      "Structured opportunities for accredited investors seeking exposure to Arizona's luxury market.",
    href: "#contact",
  },
  {
    Icon: MapTrifold,
    name: "Land Acquisition",
    description:
      "Strategic identification and acquisition of premium parcels in Arizona's most desirable neighborhoods.",
    href: "#contact",
  },
  {
    Icon: HardHat,
    name: "Development",
    description:
      "End-to-end project oversight ensuring quality craftsmanship and meticulous attention to detail.",
    href: "#contact",
  },
  {
    Icon: Storefront,
    name: "Sale",
    description:
      "Strategic marketing and sales execution to maximize returns on our luxury residential properties.",
    href: "#contact",
  },
];

export function ProcessSection() {
  return (
    <section id="services" className="py-24 md:py-32 bg-[#FAF8F5]">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <BlurFade delay={0.1} inView>
            <span className="text-[11px] uppercase tracking-[3px] text-[#8B7355] mb-6 block">
              What We Do
            </span>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-[#2C2824] mb-4">
              Our Services
            </h2>
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <p className="text-[#6B6560] leading-relaxed">
              A full-service approach to luxury residential development,
              from land acquisition through sale.
            </p>
          </BlurFade>
        </div>

        {/* Services Grid - Clean 3-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <BlurFade
              key={service.name}
              delay={0.2 + index * 0.08}
              inView
            >
              <a
                href={service.href}
                className="group block h-full"
              >
                <div className="relative h-full p-8 bg-white rounded-2xl border border-[#E8E4DF] transition-all duration-300 hover:shadow-lg hover:border-[#8B7355]/30 hover:-translate-y-1">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-[#FAF8F5] border border-[#E8E4DF] flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-[#8B7355] group-hover:border-[#8B7355]">
                    <service.Icon
                      className="w-6 h-6 text-[#8B7355] transition-colors duration-300 group-hover:text-white"
                      weight="light"
                    />
                  </div>

                  {/* Content */}
                  <h3 className="font-[family-name:var(--font-playfair)] text-xl text-[#2C2824] mb-3 transition-colors duration-300 group-hover:text-[#8B7355]">
                    {service.name}
                  </h3>
                  <p className="text-[#6B6560] text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center text-[11px] uppercase tracking-[2px] font-medium text-[#8B7355] transition-colors duration-300 group-hover:text-[#2C2824]">
                    Learn more
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </a>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
