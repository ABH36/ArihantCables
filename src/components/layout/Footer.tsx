import Link from "next/link";
import Image from "next/image";
import {
  ExternalLink,
  ChevronRight,
  BadgeCheck,
  Star,
  ArrowRight,
} from "lucide-react";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { cldImage } from "@/lib/cloudinary";
import { locations } from "@/data/locations";

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
    icon: "brand/widget-wires.png",
    href: "/products/wires",
  },
  {
    name: "Cables",
    description: "Durable cables for power, control & industrial use.",
    icon: "brand/widget-cables.png",
    href: "/products/cables",
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
                width={280}
                height={91}
                className="h-20 sm:h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
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
              {productLinks.map((p, i) => (
                <Link
                  key={p.name}
                  href={p.href}
                  className={`group flex items-start gap-3 ${
                    i > 0 ? "pt-4 border-t border-primary-500/40" : ""
                  }`}
                >
                  <div className="w-11 h-11 rounded-lg border border-primary-500/40 bg-white overflow-hidden flex-shrink-0">
                    <Image
                      src={cldImage(p.icon)}
                      alt=""
                      width={44}
                      height={44}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-white text-sm mb-0.5 group-hover:text-primary-400 transition-colors">
                      {p.name}
                    </p>
                    <p className="text-white/55 text-xs leading-relaxed">{p.description}</p>
                  </div>
                </Link>
              ))}
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
                <div className="w-10 h-10 rounded-lg border border-primary-500/40 bg-white flex items-center justify-center flex-shrink-0 p-1.5">
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
                <div className="w-10 h-10 rounded-lg border border-primary-500/40 bg-white flex items-center justify-center flex-shrink-0 p-1.5">
                  <Image src={cldImage("icons/icons8-gmail-100.png")} alt="" width={20} height={20} className="w-full h-full object-contain" />
                </div>
                <div>
                  <p className="text-white/50 text-xs mb-1">Email</p>
                  <a href="mailto:sales@arihantcables.com" className="text-white/80 hover:text-accent-DEFAULT transition-colors text-sm break-all">
                    sales@arihantcables.com
                  </a>
                </div>
              </div>

              {/* Shop Address — short label text is a deliberately compact
                  rendering for this narrow column; mapUrl is sourced from the
                  shared locations data so it can't drift out of sync. */}
              <div className="group flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg border border-primary-500/40 bg-white flex items-center justify-center flex-shrink-0 p-1.5">
                  <Image src={cldImage("icons/icons8-google-maps-100.png")} alt="" width={20} height={20} className="w-full h-full object-contain" />
                </div>
                <div>
                  <p className="text-white/50 text-xs mb-1">Shop Address</p>
                  <a
                    href={locations[0].mapUrl}
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
                <div className="w-10 h-10 rounded-lg border border-primary-500/40 bg-white flex items-center justify-center flex-shrink-0 p-1.5">
                  <Image src={cldImage("icons/icons8-warehouse-100.png")} alt="" width={20} height={20} className="w-full h-full object-contain" />
                </div>
                <div>
                  <p className="text-white/50 text-xs mb-1">Godown Address</p>
                  <a
                    href={locations[1].mapUrl}
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
      <div className="relative border-t border-primary-500/40">
        <div className="section-container py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>&copy; {new Date().getFullYear()} Arihant Cables. All rights reserved.</p>
          <p>
            Designed &amp; Developed by{" "}
            <a
              href="https://www.bdminfotech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 font-semibold transition-colors"
            >
              BDM Infotech
            </a>
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-1 hover:scale-110 hover:shadow-[0_0_0_3px_rgba(252,102,1,0.35)] transition-all duration-300"
              >
                <Image src={cldImage(s.icon)} alt="" width={16} height={16} className="w-full h-full object-contain" unoptimized={s.icon.endsWith(".gif")} />
              </a>
            ))}
            <a
              href="https://wa.me/919819898469"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-1 hover:scale-110 hover:shadow-[0_0_0_3px_rgba(37,211,102,0.35)] transition-all duration-300"
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
