import Link from "next/link";
import Image from "next/image";
import {
  Mail,
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
} from "lucide-react";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import NewsletterForm from "@/components/ui/NewsletterForm";
import { cldImage } from "@/lib/cloudinary";

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
  { label: "Facebook", icon: "icons/icons8-facebook-circled-100.gif", href: "#" },
  { label: "Instagram", icon: "icons/icons8-instagram-100.gif", href: "#" },
  { label: "LinkedIn", icon: "icons/icons8-linkedin-circled-100.gif", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative bg-navy-900 text-white overflow-hidden" role="contentinfo">
      {/* Top brand accent line */}
      <div className="h-1 bg-gradient-to-r from-primary-700 via-primary-500 to-accent-DEFAULT" />

      <Image
        src={cldImage("footerbg.png")}
        alt=""
        fill
        className="object-cover opacity-60 pointer-events-none select-none"
      />
      <div className="absolute inset-0 bg-navy-900/85 pointer-events-none" />
      <div className="absolute inset-0 opacity-10 pointer-events-none widget-card-bg" />

      {/* Main Footer — extra top padding so this content clears the
          ContactSection location cards that overlap down onto the footer above. */}
      <div className="section-container pt-28 md:pt-40 pb-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex mb-4 group">
              <Image
                src={cldImage("brand/logo.svg")}
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
                      className="text-primary-700 flex-shrink-0 -translate-x-1 opacity-0 transition-all duration-300 group-hover/link:translate-x-0 group-hover/link:opacity-100"
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
                <div className="w-10 h-10 rounded-lg border border-primary-500/40 bg-white/90 flex items-center justify-center flex-shrink-0 p-1.5 transition-colors duration-300 group-hover:bg-white">
                  <Image src={cldImage("icons/icons8-call-100.png")} alt="" width={20} height={20} className="w-full h-full object-contain" />
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
                <div className="w-10 h-10 rounded-lg border border-primary-500/40 bg-white/90 flex items-center justify-center flex-shrink-0 p-1.5 transition-colors duration-300 group-hover:bg-white">
                  <Image src={cldImage("icons/icons8-gmail-100.png")} alt="" width={20} height={20} className="w-full h-full object-contain" />
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
                <div className="w-10 h-10 rounded-lg border border-primary-500/40 bg-white/90 flex items-center justify-center flex-shrink-0 p-1.5 transition-colors duration-300 group-hover:bg-white">
                  <Image src={cldImage("icons/icons8-google-maps-100.png")} alt="" width={20} height={20} className="w-full h-full object-contain" />
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
                <div className="w-10 h-10 rounded-lg border border-primary-500/40 bg-white/90 flex items-center justify-center flex-shrink-0 p-1.5 transition-colors duration-300 group-hover:bg-white">
                  <Image src={cldImage("icons/icons8-warehouse-100.png")} alt="" width={20} height={20} className="w-full h-full object-contain" />
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
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-8 h-8 rounded-full bg-white/95 flex items-center justify-center p-1 hover:scale-110 hover:shadow-[0_0_0_3px_rgba(252,102,1,0.35)] transition-all duration-300"
              >
                <Image src={cldImage(s.icon)} alt="" width={16} height={16} className="w-full h-full object-contain" unoptimized={s.icon.endsWith(".gif")} />
              </a>
            ))}
            <a
              href="https://wa.me/919819898469"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-8 h-8 rounded-full bg-white/95 flex items-center justify-center p-1 hover:scale-110 hover:shadow-[0_0_0_3px_rgba(37,211,102,0.35)] transition-all duration-300"
            >
              <Image src={cldImage("icons/icons8-whatsapp-logo-100.gif")} alt="" width={16} height={16} className="w-full h-full object-contain" unoptimized />
            </a>
          </div>
        </div>
      </div>

      <WhatsAppButton />
      <ScrollToTopButton />
    </footer>
  );
}
