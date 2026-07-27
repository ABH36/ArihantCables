import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone, Mail } from "lucide-react";
import HeroSlider from "@/components/ui/HeroSlider";
import AboutSection from "@/components/ui/AboutSection";
import ProductsSection from "@/components/ui/ProductsSection";
import ApplicationsSection from "@/components/ui/ApplicationsSection";
import DownloadsSection from "@/components/ui/DownloadsSection";

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
      <ProductsSection />

      {/* ========= APPLICATIONS ========= */}
      <ApplicationsSection />

      {/* ========= QUICK DOWNLOADS ========= */}
      <DownloadsSection />

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
