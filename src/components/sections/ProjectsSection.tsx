"use client";

import { useState } from "react";
import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import { TextAnimate } from "@/components/ui/text-animate";

const projects = [
  {
    name: "Cactus Corridor",
    location: null,
    status: "Multiple in Development",
    images: [
      "/MultipleInDevelopment/0.png",
      "/MultipleInDevelopment/1.png",
      "/MultipleInDevelopment/2.png",
      "/MultipleInDevelopment/3.png",
      "/MultipleInDevelopment/4.png",
      "/MultipleInDevelopment/5.png",
      "/MultipleInDevelopment/6.png",
      "/MultipleInDevelopment/7.png",
    ],
    description: "Modern farmhouse with refined finishes",
  },
  {
    name: "Marion Estates",
    location: null,
    status: "In Development",
    images: [
      "/MarrionEstates/IMG_2306-2.webp",
      "/MarrionEstates/IMG_2316-2-1.webp",
      "/MarrionEstates/IMG_2372-2.webp",
      "/MarrionEstates/IMG_2375-2.webp",
      "/MarrionEstates/IMG_2384-2.webp",
      "/MarrionEstates/IMG_2399-2.webp",
      "/MarrionEstates/IMG_2475-2.webp",
      "/MarrionEstates/new.png",
    ],
    description: "Contemporary desert modern residence",
  },
  {
    name: "Arcadia",
    location: null,
    status: "In Development",
    images: [
      "/Arcadia/Pierson front elevationJPG (1).JPG",
      "/Arcadia/Pierson rear elevation (1).JPG",
    ],
    description: "Modern farmhouse with transitional Arcadia influence",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <div className="group relative overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 active:scale-[0.98]">
      {/* Image Carousel */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.images[currentImageIndex]}
          alt={`${project.name} - Image ${currentImageIndex + 1}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          loading={index === 0 ? "eager" : "lazy"}
        />

        {/* Navigation Arrows */}
        {project.images.length > 1 && (
          <>
            {/* Mobile arrows - always visible at top */}
            <div className="absolute top-3 right-3 flex gap-2 sm:hidden z-10">
              <button
                onClick={prevImage}
                className="w-8 h-8 flex items-center justify-center bg-white/90 rounded-full shadow-md"
                aria-label="Previous image"
              >
                <svg className="w-4 h-4 text-[#2C2824]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="w-8 h-8 flex items-center justify-center bg-white/90 rounded-full shadow-md"
                aria-label="Next image"
              >
                <svg className="w-4 h-4 text-[#2C2824]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Desktop arrows - show on hover */}
            <button
              onClick={prevImage}
              className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center bg-white/80 hover:bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5 text-[#2C2824]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center bg-white/80 hover:bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
              aria-label="Next image"
            >
              <svg className="w-5 h-5 text-[#2C2824]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {project.images.map((_, imgIndex) => (
                <button
                  key={imgIndex}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(imgIndex);
                  }}
                  className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors ${
                    imgIndex === currentImageIndex ? "bg-white" : "bg-white/50"
                  }`}
                  aria-label={`Go to image ${imgIndex + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Status Badge */}
        {project.status && (
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
            <span className="px-2.5 py-1 sm:px-3 text-[9px] sm:text-[10px] uppercase tracking-[1.5px] sm:tracking-[2px] font-medium rounded-sm bg-white/90 text-[#8B7355]">
              {project.status}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        {project.location && (
          <p className="text-[9px] sm:text-[10px] uppercase tracking-[1.5px] sm:tracking-[2px] text-[#8B7355] mb-1.5 sm:mb-2">
            {project.location}
          </p>
        )}
        <h3 className="font-[family-name:var(--font-playfair)] text-lg sm:text-xl text-[#2C2824] mb-1.5 sm:mb-2 group-hover:text-[#8B7355] transition-colors">
          {project.name}
        </h3>
        <p className="text-xs sm:text-sm text-[#6B6560]">
          {project.description}
        </p>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="py-16 md:py-24 lg:py-32 bg-[#FAF8F5]">
      <div className="container px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <BlurFade delay={0.1} inView>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[2px] sm:tracking-[3px] text-[#8B7355] mb-4 sm:mb-6 block">
              Our Work
            </span>
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 text-[#2C2824]">
              <TextAnimate animation="blurInUp" by="word">
                Ongoing Projects
              </TextAnimate>
            </h2>
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <p className="text-base sm:text-lg text-[#6B6560] max-w-2xl mx-auto leading-relaxed px-2">
              A portfolio of luxury residences across Arizona&apos;s most
              sought-after neighborhoods.
            </p>
          </BlurFade>

          <BlurFade delay={0.35} inView>
            <p className="text-lg sm:text-xl font-medium text-[#8B7355] mt-4">
              $25M+ in Ongoing Developments
            </p>
          </BlurFade>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project, index) => (
            <BlurFade key={project.name} delay={0.3 + index * 0.1} inView>
              <ProjectCard project={project} index={index} />
            </BlurFade>
          ))}
        </div>

      </div>
    </section>
  );
}
