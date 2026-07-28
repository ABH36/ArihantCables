"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Home as HomeIcon, Info, Cable, Plug, Tag, BookOpen, Phone, ArrowRight } from "lucide-react";
import MobileNav from "./MobileNav";
import { cldImage } from "@/lib/cloudinary";

const navLinks = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "About", href: "/about", icon: Info },
  { label: "Wires", href: "/products/wires", icon: Cable },
  { label: "Cables", href: "/products/cables", icon: Plug },
  { label: "Pricelist", href: "/pricelist", icon: Tag },
  { label: "Catalogue", href: "/catalogue", icon: BookOpen },
  { label: "Contact", href: "/contact", icon: Phone },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const entrance = (delay: string) =>
    `transition-all duration-700 ease-out ${delay} ${
      mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
    }`;

  return (
    <>
      <header className="relative z-40 w-full font-sans">
        {/* Tier 1: Top Bright Orange Bar (#fc6601) */}
        <div className={`bg-[#fc6601] text-white relative z-20 ${entrance("")}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-3.5 sm:py-4">
              {/* Left tagline with solid white bullet dot */}
              <div className="flex items-center gap-3 text-white font-bold text-xs sm:text-sm tracking-wide">
                <span className="w-2.5 h-2.5 rounded-full bg-white flex-shrink-0 inline-block shadow-md animate-pulse" />
                <span>Arihant Cables,Authorised Distributors of Polycab Wires And Cables</span>
              </div>

              {/* Right: Polycab white logo */}
              <div className="hidden sm:flex items-center">
                <Image
                  src={cldImage("brand/polycab-white.png")}
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

        {/* Tier 2: Middle Dark Charcoal Bar (#141414) */}
        <div className={`bg-[#141414] text-white relative py-10 sm:py-12 border-b border-[#222] z-20 ${entrance("delay-150")}`}>
          {/* Top-Left Slanted Orange Triangle Accent */}
          <div className="hidden lg:block absolute left-0 top-0 w-20 h-20 bg-[#fc6601] [clip-path:polygon(0_0,100%_0,0_100%)] z-10 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center flex-shrink-0 pl-2 sm:pl-4 group">
                <Image
                  src={cldImage("brand/logo.svg")}
                  alt="Arihant Cables"
                  width={260}
                  height={75}
                  className="h-14 sm:h-16 lg:h-[4.5rem] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03] group-hover:drop-shadow-[0_0_16px_rgba(252,102,1,0.55)]"
                  priority
                />
              </Link>

              {/* Contact Info (Desktop) - nudged up slightly to sit optically centered against the logo */}
              <div className="hidden md:flex items-center gap-10 lg:gap-14 -mt-1.5">
                {/* Phone Block */}
                <a
                  href="tel:+919819898469"
                  className="flex items-center gap-4 group transition-all duration-300"
                >
                  <div className="flex-shrink-0 flex items-center justify-center group-hover:scale-[1.15] group-hover:-rotate-6 transition-transform duration-300 group-hover:drop-shadow-[0_0_12px_rgba(252,102,1,0.8)]">
                    <Image src={cldImage("brand/icon-phone.svg")} alt="" width={38} height={38} className="w-9 h-9 sm:w-10 sm:h-10" />
                  </div>
                  <div className="flex flex-col justify-center leading-tight">
                    <span className="text-white font-extrabold text-base sm:text-lg tracking-wide group-hover:text-slate-100 transition-colors">
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
                  <div className="flex-shrink-0 flex items-center justify-center group-hover:scale-[1.15] group-hover:rotate-6 transition-transform duration-300 group-hover:drop-shadow-[0_0_12px_rgba(252,102,1,0.8)]">
                    <Image src={cldImage("brand/icon-email.svg")} alt="" width={47} height={39} className="w-11 h-9 sm:w-12 sm:h-10" />
                  </div>
                  <div className="flex flex-col justify-center leading-tight">
                    <span className="text-white font-extrabold text-base sm:text-lg tracking-wide group-hover:text-slate-100 transition-colors">
                      Email Address
                    </span>
                    <span className="text-[#fc6601] font-extrabold text-base sm:text-lg tracking-wide mt-1 group-hover:underline">
                      sales@arihantcables.com
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Tier 3: Floating White Navigation Bar overlapping dark header & top of banner */}
        <div
          className={`w-full transition-all duration-300 ${
            isScrolled
              ? "fixed top-0 left-0 right-0 shadow-2xl bg-white/95 backdrop-blur-md z-50 py-0 border-b border-slate-200"
              : `relative -mt-8 sm:-mt-10 lg:-mt-12 z-30 ${entrance("delay-300")}`
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="hidden lg:flex items-center justify-between bg-white rounded-lg shadow-2xl border border-slate-200/90 overflow-visible">
              {/* Left: Nav links separated by dividers */}
              <nav className="flex items-center px-4 py-1" aria-label="Main navigation">
                {navLinks.map((link, idx) => {
                  const Icon = link.icon;
                  return (
                    <div key={link.label} className="flex items-center">
                      <Link
                        href={link.href}
                        className="group/link relative flex items-center gap-2 px-6 py-5 text-slate-900 font-semibold text-base hover:text-[#fc6601] transition-colors"
                      >
                        <Icon
                          size={18}
                          className="text-slate-700 transition-colors duration-300 group-hover/link:text-[#fc6601]"
                        />
                        <span>{link.label}</span>
                        <span className="absolute left-6 right-6 bottom-3 h-[2px] bg-[#fc6601] scale-x-0 origin-left transition-transform duration-300 group-hover/link:scale-x-100" />
                      </Link>
                      {idx < navLinks.length - 1 && (
                        <span className="h-5 w-[1px] bg-slate-300 mx-1" aria-hidden="true" />
                      )}
                    </div>
                  );
                })}
              </nav>

              {/* Right: Premium floating Get In Touch pill */}
              <div className="flex items-center py-2.5 pr-2.5 pl-1">
                <Link
                  href="/contact#inquiry"
                  className="group btn-primary !rounded-full bg-gradient-to-r from-[#fc6601] to-[#ff8a3d] text-sm uppercase tracking-wide px-7 py-3.5 shadow-[0_6px_18px_-4px_rgba(252,102,1,0.55)] hover:shadow-[0_10px_24px_-4px_rgba(252,102,1,0.7)] font-heading"
                  id="header-get-in-touch"
                >
                  Get In Touch
                  <ArrowRight
                    size={16}
                    className="relative z-10 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>

            {/* Mobile Header Sub-Bar */}
            <div className="lg:hidden flex items-center justify-between bg-white px-5 py-3.5 rounded-lg shadow-lg border border-slate-200">
              <span className="font-semibold text-slate-900 text-base">Navigation</span>
              <button
                onClick={() => setMobileOpen(true)}
                className="text-[#fc6601] font-semibold text-base flex items-center gap-2"
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
