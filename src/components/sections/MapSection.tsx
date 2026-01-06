"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { MapPin } from "lucide-react";

export function MapSection() {
  const address = "14982 N 83rd Pl, Scottsdale, AZ 85260";
  const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(address)}&zoom=15`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

  return (
    <section id="location" className="bg-[#FAF8F5]">
      <div className="container px-4 sm:px-6 py-10 sm:py-16">
        <BlurFade delay={0.1} inView>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#8B7355]/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#8B7355]" />
              </div>
              <div>
                <p className="text-[9px] sm:text-[10px] uppercase tracking-[1.5px] sm:tracking-[2px] text-[#8B7355]">
                  Office Location
                </p>
                <p className="text-[#2C2824] font-medium text-sm sm:text-base">
                  {address}
                </p>
              </div>
            </div>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center sm:justify-start gap-2 text-[10px] sm:text-[11px] uppercase tracking-[1.5px] sm:tracking-[2px] font-medium text-[#8B7355] hover:text-[#2C2824] transition-colors active:scale-[0.98] py-2"
            >
              Get Directions
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </BlurFade>
      </div>

      {/* Map */}
      <BlurFade delay={0.2} inView>
        <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3322.5!2d-111.8989!3d33.6167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b75a5b5b5b5b5%3A0x0!2s14982%20N%2083rd%20Pl%2C%20Scottsdale%2C%20AZ%2085260!5e0!3m2!1sen!2sus!4v1703980000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="CREA Development Office Location"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#FAF8F5] via-transparent to-transparent h-16 bottom-0 top-auto" />
        </div>
      </BlurFade>
    </section>
  );
}
