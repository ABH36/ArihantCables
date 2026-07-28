import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Warehouse,
  ExternalLink,
  ChevronRight,
  BadgeCheck,
  Star,
  Cable,
  Plug,
  ArrowRight,
  ShieldCheck,
  Truck,
  Headphones,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import NewsletterForm from "@/components/ui/NewsletterForm";

const usefulLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Polycab Wires", href: "/products/wires" },
  { label: "Polycab Cables", href: "/products/cables" },
  { label: "Pricelist", href: "/pricelist" },
  { label: "Catalogue", href: "/catalogue" },
  { label: "Contact Us", href: "/contact" },
];

const productLinks = [
  {
    name: "Wires",
    description: "High performance wires for safe & reliable connections.",
    icon: Cable,
    href: "/products/wires",
  },
  {
    name: "Cables",
    description: "Durable cables for power, control & industrial use.",
    icon: Plug,
    href: "/products/cables",
  },
];

const trustBadges = [
  {
    icon: BadgeCheck,
    title: "100% Genuine Products",
    subtitle: "Original Polycab wires & cables",
  },
  {
    icon: ShieldCheck,
    title: "Quality You Can Trust",
    subtitle: "Tested for safety & performance",
  },
  {
    icon: Truck,
    title: "Pan India Delivery",
    subtitle: "Fast & reliable shipping",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    subtitle: "We're here to help you",
  },
];

const socialLinks = [
  { label: "Facebook", icon: Facebook, href: "#" },
  { label: "Instagram", icon: Instagram, href: "#" },
  { label: "LinkedIn", icon: Linkedin, href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative bg-navy-900 text-white overflow-hidden" role="contentinfo">
      {/* Top brand accent line */}
      <div className="h-1 bg-gradient-to-r from-primary-700 via-primary-500 to-accent-DEFAULT" />

      <Image
        src="/footerbg.png"
        alt=""
        fill
        className="object-cover opacity-60 pointer-events-none select-none"
      />
      <div className="absolute inset-0 bg-navy-900/85 pointer-events-none" />
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: "url(/brand/widget-texture.svg)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top right",
        }}
      />

      {/* Main Footer — extra top padding so this content clears the
          ContactSection location cards that overlap down onto the footer above. */}
      <div className="section-container pt-28 md:pt-40 pb-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex mb-4 group">
              <Image
                src="/brand/logo.svg"
                alt="Arihant Cables"
                width={240}
                height={78}
                className="h-16 sm:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-white/80 font-semibold text-sm mb-4">
              Authorised Distributors of Polycab Wires &amp; Cables
            </p>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm text-justify">
              For over three decades, <strong className="text-white">ARIHANT CABLES</strong> has
              been a leading distributor of{" "}
              <strong className="text-accent-DEFAULT">POLYCAB WIRES &amp; CABLES</strong>, offering a
              wide range of high-quality cables ready for immediate dispatch. Our commitment to
              quality, reliability, and customer satisfaction has earned us a strong reputation in
              the industry.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-primary-500/40 bg-primary-500/10 text-primary-300 text-xs font-semibold hover:bg-primary-500/20 transition-colors duration-300">
                <BadgeCheck size={16} className="text-primary-400" />
                Authorised Distributor
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-primary-500/40 bg-primary-500/10 text-primary-300 text-xs font-semibold hover:bg-primary-500/20 transition-colors duration-300">
                <Star size={16} className="text-primary-400" />
                30+ Years of Trust
              </span>
            </div>
          </div>

          {/* Useful Links */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-bold text-base mb-5 uppercase tracking-wider relative inline-block">
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

          {/* Products */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-bold text-base mb-5 uppercase tracking-wider relative inline-block">
              Products
              <span className="absolute -bottom-2 left-0 w-8 h-[2px] bg-primary-500" />
            </h3>
            <div className="space-y-4">
              {productLinks.map((p, i) => {
                const Icon = p.icon;
                return (
                  <Link
                    key={p.name}
                    href={p.href}
                    className={`group flex items-start gap-3 ${
                      i > 0 ? "pt-4 border-t border-white/10" : ""
                    }`}
                  >
                    <div className="w-11 h-11 rounded-lg border border-primary-500/40 bg-primary-500/10 flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-primary-500/20">
                      <Icon size={18} className="text-primary-400" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-white text-sm mb-0.5 group-hover:text-primary-400 transition-colors">
                        {p.name}
                      </p>
                      <p className="text-white/55 text-xs leading-relaxed">{p.description}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
            <Link
              href="/catalogue"
              className="btn-secondary !border-primary-500 !text-primary-400 hover:!text-white text-xs mt-6"
            >
              View Catalogue <ArrowRight size={14} />
            </Link>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-bold text-base mb-5 uppercase tracking-wider relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-8 h-[2px] bg-primary-500" />
            </h3>
            <div className="space-y-4">
              {/* Phone */}
              <div className="group flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg border border-primary-500/40 bg-primary-500/10 flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-primary-500/20">
                  <Phone size={16} className="text-primary-400" />
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
                <div className="w-10 h-10 rounded-lg border border-primary-500/40 bg-primary-500/10 flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-primary-500/20">
                  <Mail size={16} className="text-primary-400" />
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
                <div className="w-10 h-10 rounded-lg border border-primary-500/40 bg-primary-500/10 flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-primary-500/20">
                  <MapPin size={16} className="text-primary-400" />
                </div>
                <div>
                  <p className="text-white/50 text-xs mb-1">Shop Address</p>
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
                <div className="w-10 h-10 rounded-lg border border-primary-500/40 bg-primary-500/10 flex items-center justify-center flex-shrink-0 transition-colors duration-300 group-hover:bg-primary-500/20">
                  <Warehouse size={16} className="text-primary-400" />
                </div>
                <div>
                  <p className="text-white/50 text-xs mb-1">Godown Address</p>
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

        {/* Newsletter */}
        <div className="mt-14 rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="w-12 h-12 rounded-full bg-primary-500/15 flex items-center justify-center flex-shrink-0">
              <Mail size={20} className="text-primary-400" />
            </div>
            <div>
              <p className="text-primary-400 text-xs font-bold uppercase tracking-widest mb-1">
                Stay Connected
              </p>
              <h3 className="font-heading font-bold text-white text-lg sm:text-xl mb-1">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-white/55 text-sm">
                Get the latest updates, offers and industry insights.
              </p>
            </div>
          </div>
          <NewsletterForm />
        </div>

        {/* Trust badges */}
        <div className="mt-14 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {trustBadges.map((b) => {
            const Icon = b.icon;
            return (
              <div key={b.title} className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full border border-primary-500/40 flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-primary-400" />
                </div>
                <div>
                  <p className="font-heading font-bold text-white text-sm">{b.title}</p>
                  <p className="text-white/50 text-xs">{b.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10">
        <div className="section-container py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>&copy; {new Date().getFullYear()} Arihant Cables. All rights reserved.</p>
          <p>
            GST: <span className="text-white/70 font-mono">27AABFA3073E1ZW</span> &middot; Authorised
            Distributors of Polycab Wires &amp; Cables — Mumbai, India
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-primary-500 hover:bg-primary-500/10 transition-colors duration-300"
                >
                  <Icon size={14} />
                </a>
              );
            })}
            <a
              href="https://wa.me/919819898469"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-primary-500 hover:bg-primary-500/10 transition-colors duration-300"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.86 14.01c-.25.7-1.45 1.35-2 1.43-.51.08-1.16.11-1.87-.12-.43-.14-.98-.32-1.69-.63-2.97-1.28-4.91-4.27-5.06-4.47-.15-.2-1.21-1.61-1.21-3.07 0-1.46.77-2.18 1.04-2.48.27-.3.6-.37.8-.37.2 0 .4 0 .57.01.18.01.43-.07.67.51.25.6.85 2.07.92 2.22.07.15.12.33.02.53-.1.2-.15.33-.3.5-.15.18-.31.4-.45.54-.15.15-.3.31-.13.61.17.3.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.36 1.46.3.15.48.13.65-.08.18-.2.75-.88.95-1.18.2-.3.4-.25.67-.15.27.1 1.73.82 2.02.97.3.15.5.23.57.35.07.13.07.75-.18 1.45z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <WhatsAppButton />
      <ScrollToTopButton />
    </footer>
  );
}
