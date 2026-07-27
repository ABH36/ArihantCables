import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Phone,
  Mail,
  Download,
} from "lucide-react";
import HeroSlider from "@/components/ui/HeroSlider";
import AboutSection from "@/components/ui/AboutSection";

export const metadata: Metadata = {
  title: "Arihant Cables — Authorised Distributors of Polycab Wires & Cables, Mumbai",
  description:
    "Arihant Cables — Authorised Distributors of Polycab Wires & Cables in Mumbai for over 30 years. Wide range of high-quality cables ready for immediate dispatch. Contact: +91-9819898469.",
  openGraph: {
    title: "Arihant Cables — Authorised Polycab Distributors Mumbai",
    description:
      "30+ years of trusted distribution of Polycab Wires & Cables. Shop at Lohar Chawl, Mumbai.",
  },
};

const applications = [
  { label: "Residential", image: "/brand/app-residential.png" },
  { label: "Industrial", image: "/brand/app-industrial.png" },
  { label: "Healthcare", image: "/brand/app-healthcare.png" },
  { label: "Telecommunication", image: "/brand/app-telecom.png" },
  { label: "Hotels", image: "/brand/app-hotels.png" },
  { label: "Commercial", image: "/brand/app-commercial.png" },
];

export default function HomePage() {
  return (
    <>
      {/* ========= HERO ========= */}
      <HeroSlider
        slides={[
          { src: "/brand/hero-wires.png", alt: "Polycab Wires — Arihant Cables" },
          { src: "/brand/hero-cables.png", alt: "Polycab Cables — Arihant Cables" },
        ]}
      />

      {/* ========= ABOUT ========= */}
      <AboutSection />

      {/* ========= PRODUCTS ========= */}
      <section className="section-py bg-section-gradient">
        <div className="section-container">
          <div className="text-center mb-12">
            <Image
              src="/brand/icon-mark.svg"
              alt=""
              width={40}
              height={40}
              className="mx-auto mb-3"
            />
            <h2 className="section-title">Products</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card overflow-hidden group">
              <div className="aspect-[16/10] bg-white flex items-center justify-center p-6 overflow-hidden">
                <Image
                  src="/brand/widget-wires.png"
                  alt="Polycab Wires"
                  width={400}
                  height={260}
                  className="max-h-full w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 md:p-8 border-t border-slate-100">
                <h4 className="font-heading font-bold text-navy-950 text-xl mb-2">Wires</h4>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">
                  Power your world with Polycab Wires – where safety, reliability, and innovation
                  meet to elevate your electrical solutions.
                </p>
                <Link href="/products/wires" className="btn-primary" id="explore-wires">
                  Explore <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="card overflow-hidden group">
              <div className="aspect-[16/10] bg-white flex items-center justify-center p-6 overflow-hidden">
                <Image
                  src="/brand/widget-cables.png"
                  alt="Polycab Cables"
                  width={400}
                  height={260}
                  className="max-h-full w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 md:p-8 border-t border-slate-100">
                <h4 className="font-heading font-bold text-navy-950 text-xl mb-2">Cables</h4>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">
                  Elevate your electrical systems with Polycab Cables, engineered for reliability
                  and performance to power your world.
                </p>
                <Link href="/products/cables" className="btn-primary" id="explore-cables">
                  Explore <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========= APPLICATIONS ========= */}
      <section className="section-py bg-white">
        <div className="section-container">
          <div className="text-center mb-12">
            <Image
              src="/brand/icon-mark.svg"
              alt=""
              width={40}
              height={40}
              className="mx-auto mb-3"
            />
            <h2 className="section-title">Applications</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {applications.map((app) => (
              <div key={app.label} className="rounded-2xl overflow-hidden shadow-card group relative">
                <div className="aspect-[3/4] relative">
                  <Image
                    src={app.image}
                    alt={app.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent" />
                </div>
                <p className="absolute bottom-3 left-0 right-0 text-center text-white font-heading font-bold text-sm">
                  {app.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========= QUICK DOWNLOADS ========= */}
      <section className="section-py bg-section-gradient" aria-label="Downloads">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="section-subtitle">Documents</p>
            <h2 className="section-title">Pricelists &amp; Catalogues</h2>
            <p className="text-slate-500 mt-4">
              Download our latest pricelists for quick reference.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto">
            <a
              href="/documents/Arihant-ARMOURED-Jun-2026.pdf"
              download
              className="download-card flex-1"
              id="download-armoured-pricelist"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center">
                <Download size={24} className="text-primary-500" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-navy-950">Armoured Cables</h4>
                <p className="text-slate-500 text-sm">Pricelist — June 2026</p>
              </div>
              <span className="badge-primary">PDF</span>
            </a>
            <a
              href="/documents/Arihant-FLEXIBLE-May-2026.pdf"
              download
              className="download-card flex-1"
              id="download-flexible-pricelist"
            >
              <div className="w-14 h-14 rounded-2xl bg-navy-900/10 flex items-center justify-center">
                <Download size={24} className="text-navy-900" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-navy-950">Flexible Cables</h4>
                <p className="text-slate-500 text-sm">Pricelist — May 2026</p>
              </div>
              <span className="badge-primary">PDF</span>
            </a>
          </div>
          <div className="text-center mt-8">
            <Link href="/pricelist" className="btn-secondary">
              View All Pricelists <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ========= INQUIRY CTA ========= */}
      <section className="section-py bg-navy-900" aria-label="Contact CTA">
        <div className="section-container text-center">
          <p className="section-subtitle text-primary-400">Get In Touch</p>
          <h2 className="section-title text-white mb-6">Ready to Order or Have a Query?</h2>
          <p className="text-white/70 text-lg max-w-xl mx-auto mb-10">
            Contact us directly or send us an inquiry. We respond promptly to all business
            enquiries.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link href="/contact#inquiry" className="btn-primary text-base px-8 py-4">
              Send Inquiry <ArrowRight size={18} />
            </Link>
            <a href="tel:+919819898469" className="btn-ghost text-base px-8 py-4">
              <Phone size={18} />
              Call Now
            </a>
          </div>

          <div className="inline-flex flex-col sm:flex-row gap-6 px-8 py-5 rounded-2xl bg-white/5 border border-white/10">
            <a href="tel:+919819898469" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
              <Phone size={16} className="text-primary-400" />
              <span className="text-sm">+91-9819898469</span>
            </a>
            <span className="hidden sm:block w-px bg-white/20" />
            <a href="mailto:sales@arihantcables.com" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
              <Mail size={16} className="text-primary-400" />
              <span className="text-sm">sales@arihantcables.com</span>
            </a>
          </div>
        </div>
      </section>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Arihant Cables",
            description:
              "Authorised Distributors of Polycab Wires and Cables in Mumbai for over 30 years.",
            url: "https://arihantcables.com",
            telephone: "+919819898469",
            email: "sales@arihantcables.com",
            address: {
              "@type": "PostalAddress",
              streetAddress: "27, Shreenath Bhavan, 6/12 Picket X Road, Lohar Chawl",
              addressLocality: "Mumbai",
              postalCode: "400002",
              addressCountry: "IN",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: 18.9481,
              longitude: 72.8283,
            },
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            },
            sameAs: [],
          }),
        }}
      />
    </>
  );
}
