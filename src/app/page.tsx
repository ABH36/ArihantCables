import type { Metadata } from "next";
import HeroSlider from "@/components/ui/HeroSlider";
import AboutSection from "@/components/ui/AboutSection";
import ProductsSection from "@/components/ui/ProductsSection";
import ApplicationsSection from "@/components/ui/ApplicationsSection";
import RequestQuoteSection from "@/components/ui/RequestQuoteSection";
import LocationsSection from "@/components/ui/LocationsSection";

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

      {/* ========= REQUEST A QUOTE ========= */}
      <RequestQuoteSection />

      {/* ========= LOCATIONS ========= */}
      <LocationsSection />

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
