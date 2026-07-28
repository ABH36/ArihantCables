import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ArrowRight, Phone } from "lucide-react";
import PageBanner from "@/components/ui/PageBanner";
import CatalogueGrid from "@/components/ui/CatalogueGrid";
import catalogueData from "@/data/catalogue.json";

export const metadata: Metadata = {
  title: "Wires Catalogue — Arihant Cables Mumbai",
  description:
    "Download Polycab Wires catalogues — House Wires Catalogue, Polycab Green Wire leaflet and Polycab Sync leaflet.",
};

export default function WiresCataloguePage() {
  return (
    <>
      <PageBanner title="Wires Catalogue" crumb="Wires Catalogue" />

      <section className="section-py bg-white">
        <div className="section-container">
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary-500 transition-colors">
              Home
            </Link>
            <ChevronRight size={14} className="text-slate-300" />
            <Link href="/catalogue" className="hover:text-primary-500 transition-colors">
              Catalogue
            </Link>
            <ChevronRight size={14} className="text-slate-300" />
            <span className="text-primary-500 font-medium">Wires</span>
          </nav>

          <div className="text-center mb-14">
            <p className="section-subtitle">Product Literature</p>
            <h2 className="section-title">Wires Catalogues</h2>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">
              {catalogueData.wires.length} official Polycab wires catalogues and leaflets,
              ready to download.
            </p>
          </div>

          <CatalogueGrid items={catalogueData.wires} />

          <p className="text-center text-slate-400 text-xs mt-10">
            Contact Arihant Cables for the latest pricing and stock availability on any
            product shown.
          </p>
        </div>
      </section>

      <section className="section-py bg-navy-900">
        <div className="section-container text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
            Need a Custom Quote?
          </h2>
          <p className="text-white/70 mb-8 max-w-md mx-auto">
            Contact Arihant Cables for bulk pricing, custom specs, and immediate dispatch.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact#inquiry" className="btn-primary">
              Send Inquiry <ArrowRight size={16} />
            </Link>
            <a href="tel:+919819898469" className="btn-ghost">
              <Phone size={16} /> Call Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
