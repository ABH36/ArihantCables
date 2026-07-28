import type { Metadata } from "next";
import HeroSlider from "@/components/ui/HeroSlider";
import AboutSection from "@/components/ui/AboutSection";
import ProductsSection from "@/components/ui/ProductsSection";
import ApplicationsSection from "@/components/ui/ApplicationsSection";
import ContactSection from "@/components/ui/ContactSection";
import { cldImage } from "@/lib/cloudinary";

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
      <h1 className="sr-only">
        Arihant Cables — Authorised Distributors of Polycab Wires &amp; Cables, Mumbai
      </h1>

      {/* ========= HERO ========= */}
      <HeroSlider
        slides={[
          { src: cldImage("brand/hero-wires.png"), alt: "Polycab Wires — Arihant Cables" },
          { src: cldImage("brand/hero-cables.png"), alt: "Polycab Cables — Arihant Cables" },
        ]}
      />

      {/* ========= ABOUT ========= */}
      <AboutSection />

      {/* ========= PRODUCTS ========= */}
      <ProductsSection />

      {/* ========= APPLICATIONS ========= */}
      <ApplicationsSection />

      {/* ========= CONTACT (Request a Quote + Locations) ========= */}
      <ContactSection />

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
