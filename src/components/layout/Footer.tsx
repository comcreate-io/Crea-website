import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#acquisitions", label: "Acquisitions" },
  { href: "#projects", label: "Projects" },
  { href: "#investment", label: "Investment" },
  { href: "#team", label: "Team" },
  { href: "#contact", label: "Contact" },
];

const markets = [
  "Paradise Valley",
  "Scottsdale",
  "Arcadia",
  "Biltmore",
];

export function Footer() {
  return (
    <footer className="bg-[#FAF8F5] border-t border-[#E8E4DF]">
      {/* Main Footer Content */}
      <div className="container py-12">
        <div className="flex flex-col items-center text-center md:flex-row md:justify-between md:items-center md:text-left gap-6 md:gap-8">
          {/* Logo */}
          <Link href="/" className="block">
            <span className="font-[family-name:var(--font-playfair)] text-2xl text-[#2C2824]">
              Crea
            </span>
          </Link>

          {/* Copyright */}
          <p className="text-sm text-[#6B6560] order-last md:order-none">
            &copy; {new Date().getFullYear()} Crea Development. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <Link
              href="/privacy"
              className="text-sm text-[#6B6560] hover:text-[#8B7355] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-[#6B6560] hover:text-[#8B7355] transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
