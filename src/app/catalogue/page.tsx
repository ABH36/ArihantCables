import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageBanner from "@/components/ui/PageBanner";
import ContactSection from "@/components/ui/ContactSection";
import catalogueData from "@/data/catalogue.json";

export const metadata: Metadata = {
  title: "Catalogue — Polycab Cables & Wires | Arihant Cables Mumbai",
  description:
    "Browse and download Polycab product catalogues from Arihant Cables Mumbai — Cables catalogues and Wires catalogues, organised for quick reference.",
};

const categories = [
  {
    name: "Cables",
    tagline: "LT, HT, EHV, Fire Survival, Rubber, Instrumentation and more Polycab cable catalogues.",
    image: "/brand/widget-cables.png",
    href: "/catalogue/cables",
    count: catalogueData.cables.length,
  },
  {
    name: "Wires",
    tagline: "House Wires, Green Wire and Sync leaflet catalogues from Polycab.",
    image: "/brand/widget-wires.png",
    href: "/catalogue/wires",
    count: catalogueData.wires.length,
  },
];

export default function CataloguePage() {
  return (
    <>
      <PageBanner title="Catalogue" crumb="Catalogue" />

      <section className="section-py bg-white">
        <div className="section-container">
          <div className="text-center mb-14">
            <p className="section-subtitle">Product Literature</p>
            <h2 className="section-title">Cables &amp; Wires Catalogues</h2>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">
              Choose a category to browse and download official Polycab product catalogues
              and brochures.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {categories.map((c) => (
              <Link
                key={c.name}
                href={c.href}
                className="group relative overflow-hidden bg-[#ececec] min-h-[300px] sm:min-h-[340px] p-8 sm:p-10 lg:p-12 transition-shadow duration-500 hover:shadow-card-hover"
                style={{
                  backgroundImage: "url(/brand/widget-texture.svg)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "top right",
                }}
              >
                <div className="absolute right-0 bottom-0 z-0 w-1/2 sm:w-[45%] max-w-[300px] transition-transform duration-500 group-hover:scale-105 group-hover:-translate-x-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.image}
                    alt={`Polycab ${c.name}`}
                    className="w-full h-auto rounded-xl"
                  />
                </div>

                <div className="relative z-10 max-w-[75%] sm:max-w-[68%]">
                  <h3 className="font-heading font-bold text-2xl text-navy-950 mb-0">
                    {c.name} Catalogues
                  </h3>
                  <p className="text-navy-400 text-sm leading-[1.8] my-6">{c.tagline}</p>
                  <span className="badge-primary text-xs mb-6 inline-block">
                    {c.count} catalogues
                  </span>
                  <span className="group/btn btn-primary !rounded-none font-bold text-sm uppercase tracking-wide px-8 py-4 font-heading w-fit">
                    Explore
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactSection showForm={false} />
    </>
  );
}
