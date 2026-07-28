import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Download, ArrowRight } from "lucide-react";
import PageBanner from "@/components/ui/PageBanner";
import ContactSection from "@/components/ui/ContactSection";

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
    image: "/brand/app-industrial.png",
    position: "object-center",
    action: "download",
  },
  {
    id: "flexible-may-2026",
    title: "Polycab Flexible Cables",
    subtitle: "Pricelist — May 2026",
    fileUrl: "/documents/Arihant-FLEXIBLE-May-2026.pdf",
    type: "Flexible",
    image: "/brand/hero-wires.png",
    position: "object-right-top",
    action: "download",
  },
  {
    id: "more-pricelists",
    title: "More Pricelists",
    subtitle: "Contact us for specific product pricelists not listed here.",
    fileUrl: "/contact#inquiry",
    type: "On Request",
    image: "/brand/app-commercial.png",
    position: "object-center",
    action: "request",
  },
];

export default function PricelistPage() {
  return (
    <>
      <PageBanner title="Pricelist" crumb="Pricelist" />

      {/* Pricelist Cards */}
      <section className="section-py bg-white">
        <div className="section-container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricelists.map((doc) => (
              <div
                key={doc.id}
                className="group relative overflow-hidden rounded-2xl aspect-[3/4] shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-500"
              >
                <Image
                  src={doc.image}
                  alt={doc.title}
                  fill
                  className={`object-cover ${doc.position} transition-transform duration-700 group-hover:scale-105`}
                />
                <div className="absolute inset-x-0 top-0 h-3/4 bg-gradient-to-b from-navy-950/90 via-navy-950/40 to-transparent" />

                <span className="absolute top-4 left-4 badge-primary text-[10px]">{doc.type}</span>
                <h3 className="absolute top-11 left-4 right-4 font-heading font-bold text-base sm:text-lg text-white uppercase leading-snug">
                  {doc.title}
                </h3>
                <p className="absolute top-[5.5rem] left-4 right-4 text-white/75 text-xs leading-relaxed line-clamp-3">
                  {doc.subtitle}
                </p>

                <div className="absolute inset-x-0 bottom-0 p-4 pt-10 bg-gradient-to-t from-navy-950/90 to-transparent">
                  <a
                    href={doc.fileUrl}
                    download={doc.action === "download" || undefined}
                    className="btn-primary w-full justify-center text-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                    id={`pricelist-${doc.id}`}
                  >
                    {doc.action === "download" ? (
                      <>
                        <Download size={16} /> Download PDF
                      </>
                    ) : (
                      <>
                        Request Pricelist <ArrowRight size={16} />
                      </>
                    )}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactSection showForm={false} />
    </>
  );
}
