import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { getWiresCatalogue } from "@/lib/catalogue";
import PageBanner from "@/components/ui/PageBanner";
import Reveal from "@/components/ui/Reveal";
import { cardRevealDelays } from "@/lib/animation";

const WhyChoosePolycabSection = dynamic(() => import("@/components/ui/WhyChoosePolycabSection"));
const ContactSection = dynamic(() => import("@/components/ui/ContactSection"));

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Polycab Wires — Arihant Cables Mumbai",
  description:
    "Buy Polycab Wires from Arihant Cables — Authorised Distributor in Mumbai. Complete House Wires 90 Meter & 180 Meter range: Green Wire+, Suprema, Optima+, Primma, Etira. Ready stock, immediate dispatch. Call +91-9819898469.",
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
          <Reveal className="text-center mb-14">
            <p className="section-subtitle">Complete Range</p>
            <h2 className="section-title">House Wires 90 Meter &amp; 180 Meter Range</h2>
            {totalProducts > 0 && (
              <p className="text-slate-500 mt-4 max-w-xl mx-auto">
                {totalProducts} products across Polycab&apos;s full consumer wires range —
                every size, length, and variant currently offered.
              </p>
            )}
          </Reveal>

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
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                    {group.lines.map((line, i) => (
                      <Reveal key={line.id} zoom delay={cardRevealDelays[i % cardRevealDelays.length]}>
                      <Link
                        href={`/products/wires/${line.slug}`}
                        className="group/card block relative overflow-hidden rounded-2xl bg-[#ececec] widget-card shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
                      >
                        <div className="aspect-square bg-white/70 flex items-center justify-center p-6 overflow-hidden">
                          {line.imageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={line.imageUrl}
                              alt={line.name}
                              loading="lazy"
                              className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover/card:scale-110"
                            />
                          ) : (
                            <span className="text-slate-300 text-sm">No image</span>
                          )}
                        </div>
                        <div className="p-4">
                          <p className="font-heading font-bold text-navy-900 text-sm sm:text-base leading-snug mb-1.5">
                            {line.name}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="badge-primary text-[11px]">
                              {line.productCount} products
                            </span>
                            <ArrowRight
                              size={15}
                              className="text-primary-700 transition-transform duration-300 group-hover/card:translate-x-1"
                            />
                          </div>
                        </div>
                      </Link>
                      </Reveal>
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

      <ContactSection showForm={false}>
        <WhyChoosePolycabSection />
      </ContactSection>
    </>
  );
}
