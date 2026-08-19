"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import { TextAnimate } from "@/components/ui/text-animate";
import { ProjectLightbox, type LightboxMedia } from "@/components/ui/project-lightbox";

type MediaItem = LightboxMedia;

type Project = {
  name: string;
  location: string | null;
  status: string;
  media: MediaItem[];
  description: string;
};

const img = (src: string): MediaItem => ({ type: "image", src });

const projects: Project[] = [
  {
    name: "Pershing House",
    location: null,
    status: "In Development",
    media: [
      "/PershingHouse/ext1.jpg",
      "/PershingHouse/kitchen.jpg",
      "/PershingHouse/fireplace.jpg",
      "/PershingHouse/mbath1.jpg",
      "/PershingHouse/mbath2.jpg",
    ].map(img),
    description: "Transitional farmhouse with vaulted interiors and spa-inspired baths",
  },
  {
    name: "Decola",
    location: null,
    status: "In Development",
    media: [
      "/Decola/ext1.jpg",
      "/Decola/pool.jpg",
      "/Decola/kitchen.jpg",
      "/Decola/fireplace.jpg",
      "/Decola/mbath1.jpg",
      "/Decola/mbath2.jpg",
    ].map(img),
    description: "Stone-clad farmhouse with resort-style pool and warm modern interiors",
  },
  {
    name: "Cactus Corridor",
    location: null,
    status: "Multiple in Development",
    media: [
      "/MultipleInDevelopment/0.png",
      "/MultipleInDevelopment/1.png",
      "/MultipleInDevelopment/2.png",
      "/MultipleInDevelopment/3.png",
      "/MultipleInDevelopment/4.png",
      "/MultipleInDevelopment/5.png",
      "/MultipleInDevelopment/6.png",
      "/MultipleInDevelopment/7.png",
    ].map(img),
    description: "Modern farmhouse with refined finishes",
  },
  {
    name: "Marion Estates",
    location: null,
    status: "In Development",
    media: [
      // Marion Estates: one screenshot from the 2026-0610 Marion Way walkthrough
      // plus the video itself. Nothing else without client sign-off.
      img("/MarrionEstates/marion-estates-still.webp"),
      { type: "video", src: "/MarrionEstates/marion-estates.mp4", poster: "/MarrionEstates/marion-estates-poster.jpg" },
    ],
    description: "Contemporary desert modern residence",
  },
  {
    name: "Arcadia",
    location: null,
    status: "In Development",
    media: [
      "/Arcadia/Pierson front elevationJPG (1).JPG",
      "/Arcadia/Pierson rear elevation (1).JPG",
    ].map(img),
    description: "Modern farmhouse with transitional Arcadia influence",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % project.media.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + project.media.length) % project.media.length);
  };

  return (
    <div className="group relative overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-500 active:scale-[0.98]">
      <ProjectLightbox
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        media={project.media}
        initialIndex={currentImageIndex}
        title={project.name}
        description={project.description}
      />
      {/* Image Carousel */}
      <div
        className="relative aspect-[4/3] overflow-hidden cursor-pointer select-none"
        role="button"
        tabIndex={0}
        aria-label={`Open ${project.name} gallery`}
        onClick={() => {
          if (swiped.current) {
            swiped.current = false;
            return;
          }
          setLightboxOpen(true);
        }}
        style={{ touchAction: "pan-y" }}
        onPointerDown={(e) => {
          swipeStart.current = { x: e.clientX, y: e.clientY };
        }}
        onPointerUp={(e) => {
          const start = swipeStart.current;
          swipeStart.current = null;
          if (!start || project.media.length < 2) return;
          const dx = e.clientX - start.x;
          const dy = e.clientY - start.y;
          if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) {
            swiped.current = true;
            setCurrentImageIndex((prev) =>
              dx < 0
                ? (prev + 1) % project.media.length
                : (prev - 1 + project.media.length) % project.media.length
            );
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setLightboxOpen(true);
          }
        }}
      >
        {project.media[currentImageIndex].type === "video" ? (
          <video
            key={project.media[currentImageIndex].src}
            src={project.media[currentImageIndex].src}
            poster={project.media[currentImageIndex].poster}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={`${project.name} video`}
          />
        ) : (
          <Image
            src={project.media[currentImageIndex].src}
            alt={`${project.name} - Image ${currentImageIndex + 1}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            loading={index === 0 ? "eager" : "lazy"}
            draggable={false}
          />
        )}

        {/* Navigation Arrows */}
        {project.media.length > 1 && (
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
              {project.media.map((_, imgIndex) => (
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

        {/* Expand hint */}
        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-black/50 text-white text-[9px] sm:text-[10px] uppercase tracking-[1.5px] opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity pointer-events-none">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
          View
        </div>

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
              <TextAnimate as="span" animation="blurInUp" by="word">
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
