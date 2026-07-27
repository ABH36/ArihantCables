"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Home as HomeIcon } from "lucide-react";
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
        {/* Tier 1: Top Bright Orange Bar (#fc6601) - Increased Height (py-3 sm:py-3.5) */}
        <div className="bg-[#fc6601] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-3 sm:py-3.5">
              {/* Left tagline with solid white bullet dot */}
              <div className="flex items-center gap-3 text-white font-bold text-xs sm:text-sm tracking-wide">
                <span className="w-2.5 h-2.5 rounded-full bg-white flex-shrink-0 inline-block shadow-md animate-pulse" />
                <span>Arihant Cables,Authorised Distributors of Polycab Wires And Cables</span>
              </div>

              {/* Right: Polycab white logo */}
              <div className="hidden sm:flex items-center">
                <Image
                  src="/brand/polycab-white.png"
                  alt="Polycab Ideas. Connected."
                  width={160}
                  height={44}
                  className="h-8 sm:h-9 lg:h-10 w-auto object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tier 2: Middle Dark Charcoal Bar (#141414) - Increased Height (py-7 sm:py-9) & Centered Content */}
        <div className="bg-[#141414] text-white relative py-7 sm:py-9 border-b border-[#222]">
          {/* Top-Left Slanted Orange Triangle Accent */}
          <div className="hidden lg:block absolute left-0 top-0 w-20 h-20 bg-[#fc6601] [clip-path:polygon(0_0,100%_0,0_100%)] z-10 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            <div className="flex items-center justify-between">
              {/* Larger Logo */}
              <Link href="/" className="flex items-center flex-shrink-0 pl-2 sm:pl-4 group">
                <Image
                  src="/brand/logo.svg"
                  alt="Arihant Cables"
                  width={260}
                  height={75}
                  className="h-14 sm:h-16 lg:h-[4.5rem] w-auto object-contain group-hover:scale-[1.02] transition-transform duration-300"
                  priority
                />
              </Link>

              {/* Contact Info (Desktop) - Perfectly Mid-Aligned with Micro-Animations */}
              <div className="hidden md:flex items-center gap-10 lg:gap-14">
                {/* Phone Block */}
                <a
                  href="tel:+919819898469"
                  className="flex items-center gap-4 group transition-all duration-300"
                >
                  <div className="text-[#fc6601] flex-shrink-0 group-hover:scale-[1.15] group-hover:-rotate-6 transition-transform duration-300 group-hover:drop-shadow-[0_0_10px_rgba(252,102,1,0.7)]">
                    {/* Larger Telephone Handset SVG */}
                    <svg
                      width="42"
                      height="36"
                      viewBox="0 0 36 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M23 18.5C25.5 21 28 22.5 29.5 21L27 17L24.5 18.5C22.5 17.5 20.5 15.5 19.5 13.5L21 11L17 8.5C15.5 10 17 12.5 19.5 15C20.5 16 21.8 17.3 23 18.5Z"
                        stroke="#fc6601"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M24 6C27 6 30 9 30 12"
                        stroke="#fc6601"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M24 2C29 2 33 6 33 11"
                        stroke="#fc6601"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M13 26C14.5 24 15.5 28 17 26C18.5 24 19.5 28 21 26"
                        stroke="#fc6601"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col justify-center leading-tight">
                    <span className="text-white font-extrabold text-sm sm:text-base tracking-wide group-hover:text-slate-100 transition-colors">
                      Phone No
                    </span>
                    <span className="text-[#fc6601] font-extrabold text-base sm:text-lg tracking-wide mt-1 group-hover:underline">
                      +91-9819898469
                    </span>
                  </div>
                </a>

                {/* Email Block */}
                <a
                  href="mailto:sales@arihantcables.com"
                  className="flex items-center gap-4 group transition-all duration-300"
                >
                  <div className="text-[#fc6601] flex-shrink-0 group-hover:scale-[1.15] group-hover:rotate-6 transition-transform duration-300 group-hover:drop-shadow-[0_0_10px_rgba(252,102,1,0.7)]">
                    {/* Larger Envelope SVG */}
                    <svg
                      width="46"
                      height="36"
                      viewBox="0 0 40 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 10H10M4 16H12M2 22H10"
                        stroke="#fc6601"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                      />
                      <rect
                        x="15"
                        y="6"
                        width="23"
                        height="19"
                        rx="2"
                        stroke="#fc6601"
                        strokeWidth="2.4"
                      />
                      <path
                        d="M15 8L26.5 17L38 8"
                        stroke="#fc6601"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col justify-center leading-tight">
                    <span className="text-white font-extrabold text-sm sm:text-base tracking-wide group-hover:text-slate-100 transition-colors">
                      Email Address
                    </span>
                    <span className="text-[#fc6601] font-extrabold text-base sm:text-lg tracking-wide mt-1 group-hover:underline">
                      sales@arihantcables.com
                    </span>
                  </div>
                </a>
              </div>

              {/* Mobile Hamburger */}
              <button
                className="md:hidden p-2.5 rounded-lg text-white hover:bg-white/10 transition-colors"
                onClick={() => setMobileOpen(true)}
                aria-label="Open mobile menu"
                id="mobile-menu-toggle-btn"
              >
                <Menu size={28} />
              </button>
            </div>
          </div>
        </div>

        {/* Tier 3: Floating White Navigation Bar overlapping dark header & top of banner */}
        <div
          className={`w-full transition-all duration-300 ${
            isScrolled
              ? "fixed top-0 left-0 right-0 shadow-xl bg-white/95 backdrop-blur-md z-50 py-0 border-b border-slate-200"
              : "relative -mt-7 sm:-mt-9 lg:-mt-10 z-30"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="hidden lg:flex items-center justify-between bg-white rounded-lg shadow-2xl border border-slate-200/90 overflow-visible">
              {/* Left: Nav links separated by dividers */}
              <nav className="flex items-center px-4 py-1" aria-label="Main navigation">
                {navLinks.map((link, idx) => (
                  <div key={link.label} className="flex items-center">
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 px-6 py-[1.125rem] text-slate-900 font-extrabold text-base hover:text-[#fc6601] transition-colors"
                    >
                      {link.isHome && <HomeIcon size={19} className="text-slate-800" />}
                      <span>{link.label}</span>
                    </Link>
                    {idx < navLinks.length - 1 && (
                      <span className="h-5 w-[1px] bg-slate-300 mx-1" aria-hidden="true" />
                    )}
                  </div>
                ))}
              </nav>

              {/* Right: Solid Orange GET IN TOUCH Button with Left Tab Notch & Hover Effect */}
              <div className="relative flex items-center self-stretch overflow-visible group">
                {/* Top-left tab accent notch */}
                <span className="absolute -top-1.5 -left-2.5 w-4 h-4 bg-[#fc6601] rounded-sm z-10 shadow-sm" />
                <Link
                  href="/contact#inquiry"
                  className="bg-[#fc6601] hover:bg-[#e05800] text-white font-black text-base uppercase tracking-wider px-10 py-5 transition-all duration-300 flex items-center justify-center self-stretch font-heading shadow-md hover:shadow-lg relative z-0"
                  id="header-get-in-touch"
                >
                  GET IN TOUCH
                </Link>
              </div>
            </div>

            {/* Mobile Header Sub-Bar */}
            <div className="lg:hidden flex items-center justify-between bg-white px-5 py-3.5 rounded-lg shadow-lg border border-slate-200">
              <span className="font-extrabold text-slate-900 text-base">Navigation</span>
              <button
                onClick={() => setMobileOpen(true)}
                className="text-[#fc6601] font-extrabold text-base flex items-center gap-2"
              >
                <span>Menu</span>
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Spacer for fixed header on scroll */}
        {isScrolled && <div className="hidden lg:block h-16" />}
      </header>

      {/* Mobile Drawer */}
      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} navLinks={navLinks} />
    </>
  );
}
