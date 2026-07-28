import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import PageBanner from "@/components/ui/PageBanner";
import Reveal from "@/components/ui/Reveal";
import catalogueData from "@/data/catalogue.json";
import { cldImage } from "@/lib/cloudinary";

const ContactSection = dynamic(() => import("@/components/ui/ContactSection"));

export const metadata: Metadata = {
  title: "Catalogue — Polycab Cables & Wires | Arihant Cables Mumbai",
  description:
    "Browse and download Polycab product catalogues from Arihant Cables Mumbai — Cables catalogues and Wires catalogues, organised for quick reference.",
};

const categories = [
  {
    name: "Cables",
    tagline: "LT, HT, EHV, Fire Survival, Rubber, Instrumentation and more Polycab cable catalogues.",
    image: cldImage("brand/widget-cables.png"),
    href: "/catalogue/cables",
    count: catalogueData.cables.length,
  },
  {
    name: "Wires",
    tagline: "House Wires, Green Wire and Sync leaflet catalogues from Polycab.",
    image: cldImage("brand/widget-wires.png"),
    href: "/catalogue/wires",
    count: catalogueData.wires.length,
  },
];

export default function CataloguePage() {
  return (
    <>
      <PageBanner title="Catalogue" crumb="Catalogue" />

      <ContactSection showForm={false}>
        <Reveal className="text-center mb-6">
          <Image src={cldImage("brand/icon-mark.svg")} alt="" width={32} height={32} className="mx-auto mb-2" />
          <h2 className="font-heading font-bold text-xl sm:text-2xl text-navy-950 uppercase">
            Cables &amp; Wires Catalogues
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-4">
          {categories.map((c, i) => (
            <Reveal key={c.name} delay={i === 0 ? "delay-150" : "delay-300"}>
            <Link
              href={c.href}
              className="group block relative overflow-hidden rounded-xl bg-white widget-card min-h-[220px] sm:min-h-[260px] p-6 sm:p-8 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
            >
              <div className="absolute right-0 bottom-0 z-0 w-1/2 sm:w-[42%] max-w-[220px] transition-transform duration-500 group-hover:scale-105 group-hover:-translate-x-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.image} alt={`Polycab ${c.name}`} loading="lazy" className="w-full h-auto rounded-xl" />
              </div>

              <div className="relative z-10 max-w-[75%] sm:max-w-[65%]">
                <h3 className="font-heading font-bold text-lg sm:text-xl text-navy-950 mb-0">
                  {c.name} Catalogues
                </h3>
                <p className="text-navy-400 text-xs sm:text-sm leading-[1.7] my-4">{c.tagline}</p>
                <span className="badge-primary text-[11px] mb-4 inline-block">
                  {c.count} catalogues
                </span>
                <span className="group/btn btn-primary !rounded-none font-bold text-xs uppercase tracking-wide px-6 py-3 font-heading w-fit">
                  Explore
                  <ArrowRight
                    size={13}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
            </Reveal>
          ))}
        </div>
      </ContactSection>
    </>
  );
}
