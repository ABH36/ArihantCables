import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ExternalLink, ChevronRight } from "lucide-react";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const usefulLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Polycab Wires", href: "/products/wires" },
  { label: "Polycab Cables", href: "/products/cables" },
  { label: "Pricelist", href: "/pricelist" },
  { label: "Catalogue", href: "/catalogue" },
  { label: "Contact Us", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="relative bg-navy-900 text-white" role="contentinfo">
      {/* Top brand accent line */}
      <div className="h-1 bg-gradient-to-r from-primary-700 via-primary-500 to-accent-DEFAULT" />

      <Image
        src="/footerbg.png"
        alt=""
        fill
        className="object-cover opacity-60 pointer-events-none select-none"
      />
      <div className="absolute inset-0 bg-navy-900/85 pointer-events-none" />

      {/* Main Footer — extra top padding so this content clears the
          ContactSection location cards that overlap down onto the footer above. */}
      <div className="section-container pt-28 md:pt-40 pb-14 md:pb-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex mb-6 group">
              <Image
                src="/brand/logo.svg"
                alt="Arihant Cables"
                width={240}
                height={78}
                className="h-16 sm:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm text-justify">
              For over three decades, <strong className="text-white">ARIHANT CABLES</strong> has
              been a Leading Distributor of{" "}
              <strong className="text-accent-DEFAULT">POLYCAB WIRES &amp; CABLES</strong>, offering a
              wide range of high-quality cables ready for immediate dispatch. Our commitment to
              quality, reliability, and customer satisfaction has earned us a strong reputation in
              the industry. We are catering to both domestic and international markets.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="badge bg-primary-500/20 text-primary-300 border border-primary-500/30 text-xs hover:bg-primary-500/30 hover:border-primary-500/50 transition-colors duration-300">
                Authorised Distributor
              </span>
              <span className="badge bg-accent-DEFAULT/20 text-accent-light border border-accent-DEFAULT/30 text-xs hover:bg-accent-DEFAULT/30 hover:border-accent-DEFAULT/50 transition-colors duration-300">
                30+ Years
              </span>
            </div>
            <p className="mt-4 text-white/50 text-xs">
              GST: <span className="text-white/70 font-mono">27AABFA3073E1ZW</span>
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-white font-semibold text-base mb-5 uppercase tracking-wider relative inline-block">
              Useful Links
              <span className="absolute -bottom-2 left-0 w-8 h-[2px] bg-primary-500" />
            </h3>
            <ul className="space-y-1">
              {usefulLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group/link relative flex items-center gap-2 py-1.5 text-white/65 hover:text-white transition-colors text-sm overflow-hidden"
                  >
                    <ChevronRight
                      size={14}
                      className="text-primary-500 flex-shrink-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover/link:translate-x-0 group-hover/link:opacity-100"
                    />
                    <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-base mb-5 uppercase tracking-wider relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-8 h-[2px] bg-primary-500" />
            </h3>
            <div className="space-y-4">
              {/* Phone */}
              <div className="group flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 shadow-sm">
                  <Phone size={16} className="text-[#22c55e]" fill="#22c55e" fillOpacity={0.15} />
                </div>
                <div>
                  <p className="text-white/50 text-xs mb-1">Phone</p>
                  <a href="tel:+919819898469" className="text-white/80 hover:text-accent-DEFAULT transition-colors text-sm">
                    +91-9819898469
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="group flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 shadow-sm">
                  <Mail size={16} className="text-[#ea4335]" fill="#ea4335" fillOpacity={0.12} />
                </div>
                <div>
                  <p className="text-white/50 text-xs mb-1">Email</p>
                  <a href="mailto:sales@arihantcables.com" className="text-white/80 hover:text-accent-DEFAULT transition-colors text-sm break-all">
                    sales@arihantcables.com
                  </a>
                </div>
              </div>

              {/* Shop Address */}
              <div className="group flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 shadow-sm">
                  <MapPin size={16} className="text-[#ef4444]" fill="#ef4444" fillOpacity={0.15} />
                </div>
                <div>
                  <p className="text-white/50 text-xs mb-1">Shop</p>
                  <a
                    href="https://maps.app.goo.gl/MGesV8scY7MJELeDA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-accent-DEFAULT transition-colors text-sm leading-relaxed flex gap-1"
                  >
                    27, Shreenath Bhavan, Lohar Chawl, Mumbai – 400002
                    <ExternalLink size={12} className="flex-shrink-0 mt-0.5" />
                  </a>
                </div>
              </div>

              {/* Godown Address */}
              <div className="group flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 shadow-sm">
                  <MapPin size={16} className="text-[#f59e0b]" fill="#f59e0b" fillOpacity={0.15} />
                </div>
                <div>
                  <p className="text-white/50 text-xs mb-1">Godown</p>
                  <a
                    href="https://maps.app.goo.gl/8Eyev7QJfC5JmEJU7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-accent-DEFAULT transition-colors text-sm leading-relaxed flex gap-1"
                  >
                    Raj Cable Warehouse, Padgha Bhiwandi – 421101
                    <ExternalLink size={12} className="flex-shrink-0 mt-0.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10">
        <div className="section-container py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>
            &copy; {new Date().getFullYear()} Arihant Cables. All rights reserved.
          </p>
          <p>
            Authorised Distributors of Polycab Wires &amp; Cables — Mumbai, India
          </p>
        </div>
      </div>

      <WhatsAppButton />
      <ScrollToTopButton />
    </footer>
  );
}
