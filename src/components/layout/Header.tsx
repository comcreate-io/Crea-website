"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#acquisitions", label: "Acquisitions" },
  { href: "/#projects", label: "Projects" },
  { href: "/#investment", label: "Investment" },
  { href: "/#team", label: "Team" },
];

export function Header() {
  const pathname = usePathname();
  // The homepage has a full-bleed hero, so it starts transparent and turns
  // solid on scroll. Every other route has a light background from the top,
  // so the solid variant renders from the start.
  const isHome = pathname === "/";
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isScrolled = !isHome || hasScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-sm shadow-sm py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <span
              className={`font-[family-name:var(--font-playfair)] text-2xl transition-colors duration-300 ${
                isScrolled ? "text-[#2C2824]" : "text-white"
              }`}
            >
              Crea
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] uppercase tracking-[2px] font-medium transition-colors duration-300 hover:text-[#C9A96E] ${
                  isScrolled ? "text-[#2C2824]" : "text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              className={`px-6 py-3 text-[11px] uppercase tracking-[2px] font-medium transition-all duration-300 ${
                isScrolled
                  ? "bg-[#2C2824] text-white hover:bg-[#8B7355]"
                  : "bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white hover:text-[#2C2824]"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative z-10 flex flex-col gap-1.5 cursor-pointer"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-px transition-all duration-300 ${
                isMobileMenuOpen
                  ? "rotate-45 translate-y-[7px] bg-[#2C2824]"
                  : isScrolled
                  ? "bg-[#2C2824]"
                  : "bg-white"
              }`}
            />
            <span
              className={`block w-6 h-px transition-all duration-300 ${
                isMobileMenuOpen
                  ? "opacity-0"
                  : isScrolled
                  ? "bg-[#2C2824]"
                  : "bg-white"
              }`}
            />
            <span
              className={`block w-6 h-px transition-all duration-300 ${
                isMobileMenuOpen
                  ? "-rotate-45 -translate-y-[7px] bg-[#2C2824]"
                  : isScrolled
                  ? "bg-[#2C2824]"
                  : "bg-white"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white z-40 md:hidden transition-transform duration-500 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-[family-name:var(--font-playfair)] text-[#2C2824] hover:text-[#8B7355] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="px-8 py-4 bg-[#2C2824] text-white text-[11px] uppercase tracking-[2px] font-medium hover:bg-[#8B7355] transition-colors mt-4"
          >
            Contact
          </Link>
        </nav>
      </div>
    </>
  );
}
