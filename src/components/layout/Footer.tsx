import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react";

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
      <Image
        src="/brand/footer-bg.jpg"
        alt=""
        fill
        className="object-cover opacity-25 pointer-events-none select-none"
      />
      <div className="absolute inset-0 bg-navy-900/85 pointer-events-none" />
      {/* Main Footer — extra top padding so this content clears the
          LocationsSection cards that overlap down onto the footer above. */}
      <div className="section-container pt-28 md:pt-40 pb-14 md:pb-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex flex-col leading-none mb-6 group">
              <span className="text-3xl font-heading font-black text-white tracking-tight group-hover:text-accent-DEFAULT transition-colors">
                ARIHANT
              </span>
              <span className="text-sm font-bold text-accent-DEFAULT uppercase tracking-[0.3em] mt-0.5">
                Cables
              </span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm">
              For over three decades, <strong className="text-white">ARIHANT CABLES</strong> has
              been a Leading Distributor of{" "}
              <strong className="text-accent-DEFAULT">POLYCAB WIRES &amp; CABLES</strong>, offering a
              wide range of high-quality cables ready for immediate dispatch. Our commitment to
              quality, reliability, and customer satisfaction has earned us a strong reputation in
              the industry. We are catering to both domestic and international markets.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="badge bg-primary-500/20 text-primary-300 border border-primary-500/30 text-xs">
                Authorised Distributor
              </span>
              <span className="badge bg-accent-DEFAULT/20 text-accent-light border border-accent-DEFAULT/30 text-xs">
                30+ Years
              </span>
            </div>
            <p className="mt-4 text-white/50 text-xs">
              GST: <span className="text-white/70 font-mono">27AABFA3073E1ZW</span>
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-white font-semibold text-base mb-5 uppercase tracking-wider">
              Useful Links
            </h3>
            <ul className="space-y-2.5">
              {usefulLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-white/65 hover:text-accent-DEFAULT transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 group-hover:bg-accent-DEFAULT transition-colors flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-base mb-5 uppercase tracking-wider">
              Contact Us
            </h3>
            <div className="space-y-4">
              {/* Phone */}
              <div className="flex gap-3">
                <Phone size={16} className="text-primary-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white/50 text-xs mb-1">Phone</p>
                  <a href="tel:+919819898469" className="text-white/80 hover:text-accent-DEFAULT transition-colors text-sm">
                    +91-9819898469
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-3">
                <Mail size={16} className="text-primary-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white/50 text-xs mb-1">Email</p>
                  <a href="mailto:sales@arihantcables.com" className="text-white/80 hover:text-accent-DEFAULT transition-colors text-sm break-all">
                    sales@arihantcables.com
                  </a>
                </div>
              </div>

              {/* Shop Address */}
              <div className="flex gap-3">
                <MapPin size={16} className="text-primary-400 mt-0.5 flex-shrink-0" />
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
              <div className="flex gap-3">
                <MapPin size={16} className="text-accent-DEFAULT mt-0.5 flex-shrink-0" />
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
    </footer>
  );
}
