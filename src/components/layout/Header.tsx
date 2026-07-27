"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, Menu, Home as HomeIcon } from "lucide-react";
import MobileNav from "./MobileNav";

const navLinks = [
  { label: "Home", href: "/", isHome: true },
  { label: "About", href: "/about" },
  { label: "Wires", href: "/products/wires" },
  { label: "Cables", href: "/products/cables" },
  { label: "Pricelist", href: "/pricelist" },
  { label: "Catalogue", href: "/catalogue" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="relative z-50 w-full font-sans">
        {/* Tier 1: Top Orange Bar */}
        <div className="bg-[#fc6601] text-white hidden md:block border-b border-[#e05800]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-1.5 text-xs sm:text-sm">
              <div className="flex items-center gap-2 font-medium">
                <span className="w-2 h-2 rounded-full bg-white flex-shrink-0" />
                <span>Arihant Cables,Authorised Distributors of Polycab Wires And Cables</span>
              </div>
              <div className="flex items-center py-0.5">
                <Image
                  src="/brand/polycab-white.png"
                  alt="Polycab Ideas. Connected."
                  width={140}
                  height={38}
                  className="h-7 w-auto object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tier 2: Middle Dark Charcoal Bar */}
        <div className="bg-[#141414] text-white border-b border-[#222]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              {/* Logo */}
              <Link href="/" className="flex items-center flex-shrink-0">
                <Image
                  src="/brand/logo.svg"
                  alt="Arihant Cables"
                  width={200}
                  height={60}
                  className="h-12 w-auto object-contain"
                  priority
                />
              </Link>

              {/* Contact Info (Desktop) */}
              <div className="hidden md:flex items-center gap-8 lg:gap-12">
                {/* Phone */}
                <a
                  href="tel:+919819898469"
                  className="flex items-center gap-3.5 group hover:opacity-90 transition-opacity"
                >
                  <div className="w-10 h-10 rounded-full border-2 border-[#fc6601] flex items-center justify-center text-[#fc6601] flex-shrink-0">
                    <Phone size={18} />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-white font-bold text-xs tracking-wide">
                      Phone No
                    </span>
                    <span className="text-[#fc6601] font-bold text-sm tracking-wide mt-0.5">
                      +91-9819898469
                    </span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:sales@arihantcables.com"
                  className="flex items-center gap-3.5 group hover:opacity-90 transition-opacity"
                >
                  <div className="w-10 h-10 rounded-full border-2 border-[#fc6601] flex items-center justify-center text-[#fc6601] flex-shrink-0">
                    <Mail size={18} />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-white font-bold text-xs tracking-wide">
                      Email Address
                    </span>
                    <span className="text-[#fc6601] font-bold text-sm tracking-wide mt-0.5">
                      sales@arihantcables.com
                    </span>
                  </div>
                </a>
              </div>

              {/* Mobile Hamburger */}
              <button
                className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                onClick={() => setMobileOpen(true)}
                aria-label="Open mobile menu"
                id="mobile-menu-toggle-btn"
              >
                <Menu size={26} />
              </button>
            </div>
          </div>
        </div>

        {/* Tier 3: White Navigation Bar with GET IN TOUCH Button */}
        <div
          className={`w-full transition-all duration-300 ${
            isScrolled
              ? "fixed top-0 left-0 right-0 shadow-lg bg-white/95 backdrop-blur-md z-50 py-0"
              : "relative bg-[#141414] lg:bg-transparent pb-3 lg:pb-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="hidden lg:flex items-center justify-between bg-white rounded-md shadow-md border border-slate-200 overflow-hidden">
              {/* Left: Nav links separated by dividers */}
              <nav className="flex items-center px-2 py-1" aria-label="Main navigation">
                {navLinks.map((link, idx) => (
                  <div key={link.label} className="flex items-center">
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 px-5 py-3 text-slate-800 font-bold text-sm hover:text-[#fc6601] transition-colors"
                    >
                      {link.isHome && <HomeIcon size={16} className="text-slate-700" />}
                      <span>{link.label}</span>
                    </Link>
                    {idx < navLinks.length - 1 && (
                      <span className="h-4 w-[1px] bg-slate-300" aria-hidden="true" />
                    )}
                  </div>
                ))}
              </nav>

              {/* Right: Solid Orange GET IN TOUCH Button */}
              <Link
                href="/contact#inquiry"
                className="bg-[#fc6601] hover:bg-[#e05800] text-white font-black text-sm uppercase tracking-wider px-8 py-4.5 transition-colors flex items-center justify-center self-stretch font-heading"
                id="header-get-in-touch"
              >
                GET IN TOUCH
              </Link>
            </div>

            {/* Mobile Header Sub-Bar */}
            <div className="lg:hidden flex items-center justify-between bg-white px-4 py-2.5 rounded-md shadow-sm border border-slate-200">
              <span className="font-bold text-slate-800 text-sm">Navigation</span>
              <button
                onClick={() => setMobileOpen(true)}
                className="text-[#fc6601] font-bold text-sm flex items-center gap-1.5"
              >
                <span>Menu</span>
                <Menu size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Spacer for fixed header on scroll */}
        {isScrolled && <div className="hidden lg:block h-14" />}
      </header>

      {/* Mobile Drawer */}
      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} navLinks={navLinks} />
    </>
  );
}
