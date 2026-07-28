import type { Metadata } from "next";
import Image from "next/image";
import { Download, ArrowRight } from "lucide-react";
import PageBanner from "@/components/ui/PageBanner";
import ContactSection from "@/components/ui/ContactSection";
import Reveal from "@/components/ui/Reveal";
import { cldImage } from "@/lib/cloudinary";

export const metadata: Metadata = {
  title: "Pricelist — Polycab Cables & Wires | Arihant Cables Mumbai",
  description:
    "Download latest Polycab Cables & Wires pricelists from Arihant Cables Mumbai. Armoured Cables pricelist, Flexible Cables pricelist — free PDF download.",
};

const pricelists = [
  {
    id: "armoured-jun-2026",
    title: "Polycab Armoured Cables",
    subtitle: "Pricelist — June 2026",
    fileUrl: "/documents/Arihant-ARMOURED-Jun-2026.pdf",
    type: "Armoured",
    image: cldImage("brand/hero-cables.png"),
    fit: "object-cover object-right",
    action: "download",
  },
  {
    id: "flexible-may-2026",
    title: "Polycab Flexible Cables",
    subtitle: "Pricelist — May 2026",
    fileUrl: "/documents/Arihant-FLEXIBLE-May-2026.pdf",
    type: "Flexible",
    image: cldImage("brand/widget-wires.png"),
    fit: "object-contain bg-white",
    action: "download",
  },
  {
    id: "more-pricelists",
    title: "More Pricelists",
    subtitle: "Contact us for specific product pricelists not listed here.",
    fileUrl: "/contact#inquiry",
    type: "On Request",
    image: cldImage("brand/widget-cables.png"),
    fit: "object-contain bg-white",
    action: "request",
  },
];

export default function PricelistPage() {
  return (
    <>
      <PageBanner title="Pricelist" crumb="Pricelist" />

      <ContactSection showForm={false}>
        <div className="text-center mb-6">
          <Image src={cldImage("brand/icon-mark.svg")} alt="" width={32} height={32} className="mx-auto mb-2" />
          <h2 className="font-heading font-bold text-xl sm:text-2xl text-navy-950 uppercase">
            Download Pricelists
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-3 sm:gap-4">
          {pricelists.map((doc, i) => (
            <Reveal
              key={doc.id}
              zoom
              delay={i === 0 ? "" : i === 1 ? "delay-150" : "delay-300"}
              className="group relative overflow-hidden rounded-xl aspect-[3/4] shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-500"
            >
              <Image
                src={doc.image}
                alt={doc.title}
                fill
                className={`${doc.fit} transition-transform duration-700 group-hover:scale-105`}
              />
              <div className="absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-navy-950/90 via-navy-950/40 to-transparent" />

              <span className="absolute top-3 left-3 badge-primary text-[10px]">{doc.type}</span>
              <h3 className="absolute top-9 left-3 right-3 font-heading font-bold text-[11px] sm:text-xs text-white uppercase leading-snug">
                {doc.title}
              </h3>

              <div className="absolute inset-x-0 bottom-0 p-3 pt-8 bg-gradient-to-t from-navy-950/90 to-transparent">
                <a
                  href={doc.fileUrl}
                  download={doc.action === "download" || undefined}
                  className="btn-primary w-full justify-center !gap-1.5 !px-3 !py-1.5 !text-[11px] !rounded-lg opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                  id={`pricelist-${doc.id}`}
                >
                  {doc.action === "download" ? (
                    <>
                      <Download size={12} /> Download PDF
                    </>
                  ) : (
                    <>
                      Request <ArrowRight size={12} />
                    </>
                  )}
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </ContactSection>
    </>
  );
}
