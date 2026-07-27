import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download, Phone, ExternalLink } from "lucide-react";
import { getWiresCatalogue } from "@/lib/catalogue";
import PageBanner from "@/components/ui/PageBanner";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Polycab Wires — Arihant Cables Mumbai",
  description:
    "Buy Polycab Wires from Arihant Cables — Authorised Distributor in Mumbai. Complete Home Wires & 180 Meter range: Green Wire+, Suprema, Optima+, Primma, Etira. Ready stock, immediate dispatch. Call +91-9819898469.",
  keywords: [
    "Polycab wires Mumbai",
    "Polycab Green Wire+",
    "Polycab Suprema",
    "Polycab Optima+",
    "Polycab Primma",
    "Etira wires",
    "180 meter wire Mumbai",
    "Polycab wire distributor Mumbai",
  ],
};

function formatPrice(priceINR?: number) {
  if (!priceINR) return null;
  return `₹${priceINR.toLocaleString("en-IN")}`;
}

export default async function WiresPage() {
  const catalogue = await getWiresCatalogue();
  const totalProducts =
    catalogue?.reduce(
      (sum, g) => sum + g.lines.reduce((s, l) => s + l.products.length, 0),
      0
    ) ?? 0;

  return (
    <>
      <PageBanner title="Polycab Wires" crumb="Wires" />

      {/* Full Catalogue */}
      <section className="section-py bg-white">
        <div className="section-container">
          <div className="text-center mb-14">
            <p className="section-subtitle">Complete Range</p>
            <h2 className="section-title">Home Wires &amp; 180 Meter Range</h2>
            {totalProducts > 0 && (
              <p className="text-slate-500 mt-4 max-w-xl mx-auto">
                {totalProducts} products across Polycab&apos;s full consumer wires range —
                every size, length, and variant currently offered.
              </p>
            )}
          </div>

          {!catalogue || catalogue.length === 0 ? (
            <div className="card p-10 text-center max-w-lg mx-auto">
              <p className="text-slate-600 mb-4">
                Our full wires catalogue is being refreshed right now. Please contact our
                sales team directly for the complete Polycab Wires range and current stock.
              </p>
              <Link href="/contact#inquiry" className="btn-primary">
                Contact Sales <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div className="space-y-16">
              {catalogue.map((group) => (
                <div key={group.id}>
                  <h3 className="text-xl md:text-2xl font-heading font-bold text-navy-900 mb-6 pb-3 border-b border-slate-100">
                    {group.name}
                  </h3>
                  <div className="space-y-4">
                    {group.lines.map((line, idx) => (
                      <details
                        key={line.id}
                        className="card overflow-hidden group/details"
                        open={idx === 0}
                      >
                        <summary className="cursor-pointer list-none px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                          <span className="font-heading font-bold text-navy-900">
                            {line.name}
                          </span>
                          <span className="badge-primary text-xs flex-shrink-0 ml-4">
                            {line.products.length} products
                          </span>
                        </summary>
                        <div className="px-6 pb-6 pt-2">
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {line.products.map((p) => (
                              <a
                                key={p.id}
                                href={p.sourceUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-xl border border-slate-100 p-3 hover:shadow-card-hover hover:-translate-y-0.5 transition-all bg-white flex flex-col"
                              >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={p.imageUrl}
                                  alt={p.name}
                                  loading="lazy"
                                  className="w-full aspect-square object-contain rounded-lg bg-slate-50 mb-2"
                                />
                                <p className="text-xs font-semibold text-navy-900 leading-snug line-clamp-2 mb-1">
                                  {p.name}
                                </p>
                                <div className="flex flex-wrap gap-1 mb-1">
                                  {p.size && (
                                    <span className="badge bg-slate-100 text-slate-600 text-[10px] px-1.5 py-0.5">
                                      {p.size}
                                    </span>
                                  )}
                                  {p.length && (
                                    <span className="badge bg-slate-100 text-slate-600 text-[10px] px-1.5 py-0.5">
                                      {p.length}
                                    </span>
                                  )}
                                </div>
                                <div className="mt-auto flex items-center justify-between pt-1">
                                  {formatPrice(p.priceINR) ? (
                                    <span className="text-sm font-bold text-primary-600">
                                      {formatPrice(p.priceINR)}
                                    </span>
                                  ) : (
                                    <span />
                                  )}
                                  <ExternalLink size={13} className="text-slate-400" />
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <p className="text-center text-slate-400 text-xs mt-10">
            Prices and specifications shown are as listed by Polycab and are indicative —
            contact Arihant Cables for confirmed distributor pricing and stock availability.
          </p>
        </div>
      </section>

      {/* Downloads */}
      <section className="section-py bg-section-gradient">
        <div className="section-container">
          <div className="text-center mb-10">
            <p className="section-subtitle">Documents</p>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-navy-900">
              Pricelists &amp; Catalogues
            </h2>
          </div>
          <div className="flex justify-center">
            <a
              href="/documents/Arihant-ARMOURED-Jun-2026.pdf"
              download
              className="download-card max-w-xs w-full"
              id="wires-download-armoured"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center">
                <Download size={24} className="text-primary-500" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-navy-900">Polycab Armoured</h4>
                <p className="text-slate-500 text-sm">Pricelist — June 2026</p>
              </div>
              <span className="badge-primary">Download PDF</span>
            </a>
          </div>
        </div>
      </section>

      {/* Inquiry CTA */}
      <section className="section-py bg-navy-900">
        <div className="section-container text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
            Need a Custom Quote?
          </h2>
          <p className="text-white/70 mb-8 max-w-md mx-auto">
            Contact Arihant Cables for bulk pricing, custom specifications, and delivery queries.
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
