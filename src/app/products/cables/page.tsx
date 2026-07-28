import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCablesCatalogue } from "@/lib/catalogue";
import PageBanner from "@/components/ui/PageBanner";
import ContactSection from "@/components/ui/ContactSection";

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
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                    {cluster.applications.map((app) => (
                      <Link
                        key={app.id}
                        href={`/products/cables/${app.slug}`}
                        className="group/card relative overflow-hidden rounded-2xl bg-[#ececec] shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                        style={{
                          backgroundImage: "url(/brand/widget-texture.svg)",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "top right",
                        }}
                      >
                        <div className="aspect-square bg-white/70 flex items-center justify-center p-6 overflow-hidden">
                          {app.imageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={app.imageUrl}
                              alt={app.name}
                              loading="lazy"
                              className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover/card:scale-110"
                            />
                          ) : (
                            <span className="text-slate-300 text-sm">No image</span>
                          )}
                        </div>
                        <div className="p-4">
                          <p className="font-heading font-bold text-navy-900 text-sm sm:text-base leading-snug mb-1.5">
                            {app.name}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="badge-primary text-[11px]">
                              {app.productCount} products
                            </span>
                            <ArrowRight
                              size={15}
                              className="text-primary-500 transition-transform duration-300 group-hover/card:translate-x-1"
                            />
                          </div>
                        </div>
                      </Link>
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

      <ContactSection showForm={false} />
    </>
  );
}
