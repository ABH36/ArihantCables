import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download, Phone } from "lucide-react";
import { getCablesCatalogue } from "@/lib/catalogue";
import PageBanner from "@/components/ui/PageBanner";

export const dynamic = "force-dynamic";

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
          <div className="text-center mb-14">
            <p className="section-subtitle">Complete Range, By Industry</p>
            <h2 className="section-title">Cables For Every Industry</h2>
            {totalProducts > 0 && (
              <p className="text-slate-500 mt-4 max-w-xl mx-auto">
                {totalProducts} cable listings across Polycab&apos;s full Industries range —
                organised exactly as Building Infrastructure, Energy &amp; Power Grid,
                Exploration, Manufacturing, and Mobility Infrastructure applications.
              </p>
            )}
          </div>

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
            <div className="space-y-16">
              {catalogue.map((cluster) => (
                <div key={cluster.id}>
                  <h3 className="text-xl md:text-2xl font-heading font-bold text-navy-900 mb-6 pb-3 border-b border-slate-100">
                    {cluster.name}
                  </h3>
                  <div className="space-y-4">
                    {cluster.applications.map((app) => (
                      <details key={app.id} className="card overflow-hidden">
                        <summary className="cursor-pointer list-none px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                          <span className="font-heading font-bold text-navy-900">
                            {app.name}
                          </span>
                          <span className="badge bg-navy-900/10 text-navy-900 text-xs flex-shrink-0 ml-4">
                            {app.products.length} products
                          </span>
                        </summary>
                        <div className="px-6 pb-6 pt-2">
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {app.products.map((p) => (
                              <Link
                                key={p.id}
                                href={`/product/${p.slug}`}
                                className="rounded-xl border border-slate-100 p-3 hover:shadow-card-hover hover:-translate-y-0.5 transition-all bg-white flex flex-col"
                              >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={p.imageUrl}
                                  alt={p.name}
                                  loading="lazy"
                                  className="w-full aspect-square object-contain rounded-lg bg-slate-50 mb-2"
                                />
                                <p className="text-xs font-semibold text-navy-900 leading-snug line-clamp-2 mb-1 flex-grow">
                                  {p.name}
                                </p>
                                <div className="mt-auto flex items-center justify-end pt-1">
                                  <ArrowRight size={13} className="text-slate-400" />
                                </div>
                              </Link>
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
            Specifications shown are as listed by Polycab and are indicative — contact
            Arihant Cables for confirmed distributor pricing and stock availability.
          </p>
        </div>
      </section>

      {/* Downloads */}
      <section className="section-py bg-section-gradient">
        <div className="section-container">
          <div className="text-center mb-10">
            <p className="section-subtitle">Documents</p>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-navy-900">Pricelists</h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto">
            <a href="/documents/Arihant-ARMOURED-Jun-2026.pdf" download
              className="download-card flex-1" id="cables-download-armoured">
              <div className="w-14 h-14 rounded-2xl bg-primary-100 flex items-center justify-center">
                <Download size={24} className="text-primary-500" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-navy-900">Armoured Cables</h4>
                <p className="text-slate-500 text-sm">June 2026</p>
              </div>
              <span className="badge-primary">PDF</span>
            </a>
            <a href="/documents/Arihant-FLEXIBLE-May-2026.pdf" download
              className="download-card flex-1" id="cables-download-flexible">
              <div className="w-14 h-14 rounded-2xl bg-navy-900/10 flex items-center justify-center">
                <Download size={24} className="text-navy-900" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-navy-900">Flexible Cables</h4>
                <p className="text-slate-500 text-sm">May 2026</p>
              </div>
              <span className="badge-primary">PDF</span>
            </a>
          </div>
        </div>
      </section>

      {/* Inquiry CTA */}
      <section className="section-py bg-primary-500">
        <div className="section-container text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
            Need a Custom Quote?
          </h2>
          <p className="text-white/80 mb-8 max-w-md mx-auto">
            Contact Arihant Cables for bulk pricing, custom specs, and immediate dispatch.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact#inquiry" className="btn-ghost">
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
