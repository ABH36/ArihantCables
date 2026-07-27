import type { Metadata } from "next";
import Link from "next/link";
import { Download, ArrowRight, FileText } from "lucide-react";
import PageBanner from "@/components/ui/PageBanner";

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
    date: "June 2026",
    type: "Armoured",
    color: "from-primary-500 to-primary-700",
    iconBg: "bg-primary-100",
    iconColor: "text-primary-500",
  },
  {
    id: "flexible-may-2026",
    title: "Polycab Flexible Cables",
    subtitle: "Pricelist — May 2026",
    fileUrl: "/documents/Arihant-FLEXIBLE-May-2026.pdf",
    date: "May 2026",
    type: "Flexible",
    color: "from-navy-900 to-navy-800",
    iconBg: "bg-navy-900/10",
    iconColor: "text-navy-900",
  },
];

export default function PricelistPage() {
  return (
    <>
      <PageBanner title="Pricelist" crumb="Pricelist" />

      {/* Pricelist Cards */}
      <section className="section-py bg-white">
        <div className="section-container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {pricelists.map((doc) => (
              <div key={doc.id} className="card overflow-hidden hover-lift group">
                {/* Card Header */}
                <div className={`bg-gradient-to-br ${doc.color} p-8 flex items-center justify-center`}>
                  <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center">
                    <FileText size={36} className="text-white" />
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <span className="badge-primary text-xs mb-3">{doc.type}</span>
                  <h3 className="font-heading font-bold text-navy-900 text-lg mb-1">
                    {doc.title}
                  </h3>
                  <p className="text-slate-500 text-sm mb-6">{doc.subtitle}</p>
                  <a
                    href={doc.fileUrl}
                    download
                    className="btn-primary w-full justify-center text-sm"
                    id={`download-${doc.id}`}
                  >
                    <Download size={16} />
                    Download PDF
                  </a>
                </div>
              </div>
            ))}

            {/* More Coming Card */}
            <div className="card p-6 flex flex-col items-center justify-center text-center border-2 border-dashed border-slate-200 bg-slate-50/50">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                <FileText size={28} className="text-slate-400" />
              </div>
              <h3 className="font-heading font-bold text-navy-900 mb-2">More Pricelists</h3>
              <p className="text-slate-500 text-sm mb-4">
                Contact us for specific product pricelists not listed here.
              </p>
              <Link href="/contact#inquiry" className="btn-secondary text-sm">
                Request Pricelist
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py bg-navy-900">
        <div className="section-container text-center">
          <h2 className="text-2xl font-heading font-bold text-white mb-4">
            Need a Custom Quote?
          </h2>
          <p className="text-white/70 mb-6 max-w-md mx-auto">
            For bulk orders and specific quantity pricing, contact our sales team.
          </p>
          <Link href="/contact#inquiry" className="btn-primary">
            Get Custom Quote <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
