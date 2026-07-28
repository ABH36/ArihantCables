import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCablesCatalogue } from "@/lib/catalogue";
import PageBanner from "@/components/ui/PageBanner";
import ContactSection from "@/components/ui/ContactSection";
import CablesCatalogueBrowser from "@/components/ui/CablesCatalogueBrowser";
import WhyChoosePolycabSection from "@/components/ui/WhyChoosePolycabSection";
import Reveal from "@/components/ui/Reveal";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Polycab Cables — Arihant Cables Mumbai",
  description:
    "Buy Polycab Cables from Arihant Cables — Authorised Distributor in Mumbai. Complete industries range: Building Infrastructure, Energy & Power Grid, Exploration, Manufacturing & Mobility Infrastructure cables. Ready stock. Call +91-9819898469.",
  keywords: [
    "Polycab cables Mumbai",
    "Polycab industrial cables",
    "Polycab cables by industry",
    "power cables distributor Mumbai",
    "Polycab cable distributor",
  ],
};

export default async function CablesPage() {
  const catalogue = await getCablesCatalogue();
  const totalProducts =
    catalogue?.reduce(
      (sum, c) => sum + c.applications.reduce((s, a) => s + a.products.length, 0),
      0
    ) ?? 0;

  return (
    <>
      <PageBanner title="Polycab Cables" crumb="Cables" />

      {/* Full Catalogue by Industry */}
      <section className="section-py bg-white">
        <div className="section-container">
          <Reveal className="text-center mb-14">
            <p className="section-subtitle">Complete Range, By Industry</p>
            <h2 className="section-title">Cables For Every Industry</h2>
            {totalProducts > 0 && (
              <p className="text-slate-500 mt-4 max-w-xl mx-auto">
                {totalProducts} cable listings across Polycab&apos;s full Industries range —
                organised exactly as Building Infrastructure, Energy &amp; Power Grid,
                Exploration, Manufacturing, and Mobility Infrastructure applications.
              </p>
            )}
          </Reveal>

          {!catalogue || catalogue.length === 0 ? (
            <div className="card p-10 text-center max-w-lg mx-auto">
              <p className="text-slate-600 mb-4">
                Our full cables catalogue is being refreshed right now. Please contact our
                sales team directly for the complete Polycab Cables range and current stock.
              </p>
              <Link href="/contact#inquiry" className="btn-primary">
                Contact Sales <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <CablesCatalogueBrowser catalogue={catalogue} />
          )}

          <p className="text-center text-slate-400 text-xs mt-10">
            Specifications shown are as listed by Polycab and are indicative — contact
            Arihant Cables for confirmed distributor pricing and stock availability.
          </p>
        </div>
      </section>

      <ContactSection showForm={false}>
        <WhyChoosePolycabSection />
      </ContactSection>
    </>
  );
}
