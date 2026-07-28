import type { Metadata } from "next";
import Image from "next/image";
import { Download } from "lucide-react";
import PageBanner from "@/components/ui/PageBanner";
import ContactSection from "@/components/ui/ContactSection";
import catalogueData from "@/data/catalogue.json";

export const metadata: Metadata = {
  title: "Catalogue — Polycab Cables & Wires | Arihant Cables Mumbai",
  description:
    "Download Polycab product catalogues from Arihant Cables Mumbai — LT, HT, EHV, Fire Survival, Rubber, Instrumentation, House Wires, Communication cables and more.",
};

interface CatalogueItem {
  title: string;
  image: string;
  pdf: string;
}

function CatalogueGrid({ items }: { items: CatalogueItem[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
      {items.map((item) => (
        <div
          key={item.title}
          className="group relative overflow-hidden rounded-2xl bg-[#ececec] shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
          style={{
            backgroundImage: "url(/brand/widget-texture.svg)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top right",
          }}
        >
          <div className="relative aspect-[3/4] bg-white/70 overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="p-4">
            <p className="font-heading font-bold text-navy-900 text-sm sm:text-base leading-snug mb-3 line-clamp-2">
              {item.title}
            </p>
            <a
              href={item.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center !text-xs !py-2.5"
            >
              <Download size={14} /> Download PDF
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CataloguePage() {
  const { cables, wires } = catalogueData as { cables: CatalogueItem[]; wires: CatalogueItem[] };

  return (
    <>
      <PageBanner title="Catalogue" crumb="Catalogue" />

      <section className="section-py bg-white">
        <div className="section-container">
          <div className="text-center mb-14">
            <p className="section-subtitle">Product Literature</p>
            <h2 className="section-title">Cables &amp; Wires Catalogues</h2>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">
              Download official Polycab product catalogues and brochures — organised by
              Cables and Wires, ready for immediate reference.
            </p>
          </div>

          <div className="space-y-16">
            <div>
              <h3 className="text-xl md:text-2xl font-heading font-bold text-navy-900 mb-6 pb-3 border-b border-slate-100">
                Cables Catalogues
              </h3>
              <CatalogueGrid items={cables} />
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-heading font-bold text-navy-900 mb-6 pb-3 border-b border-slate-100">
                Wires Catalogues
              </h3>
              <CatalogueGrid items={wires} />
            </div>
          </div>

          <p className="text-center text-slate-400 text-xs mt-10">
            Catalogues open in a new tab. Contact Arihant Cables for the latest pricing and
            stock availability on any product shown.
          </p>
        </div>
      </section>

      <ContactSection showForm={false} />
    </>
  );
}
