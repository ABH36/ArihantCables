import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowRight, Phone } from "lucide-react";
import { getCableApplicationDetail } from "@/lib/catalogue";
import PageBanner from "@/components/ui/PageBanner";
import CategoryProductsGrid from "@/components/ui/CategoryProductsGrid";

export const dynamic = "force-dynamic";

interface Props {
  params: { application: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const app = await getCableApplicationDetail(params.application);
  if (!app) return { title: "Cables — Arihant Cables" };
  return {
    title: `${app.name} — Arihant Cables Mumbai`,
    description: `Browse the complete ${app.name} cable range from Polycab — available at Arihant Cables, Authorised Distributor in Mumbai.`,
  };
}

export default async function CableApplicationPage({ params }: Props) {
  const app = await getCableApplicationDetail(params.application);
  if (!app) notFound();

  return (
    <>
      <PageBanner title={app.name} crumb={app.name} />

      <section className="section-py bg-white">
        <div className="section-container">
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary-500 transition-colors">
              Home
            </Link>
            <ChevronRight size={14} className="text-slate-300" />
            <Link href="/products/cables" className="hover:text-primary-500 transition-colors">
              Cables
            </Link>
            <ChevronRight size={14} className="text-slate-300" />
            <span className="text-primary-500 font-medium">{app.name}</span>
          </nav>

          <div className="text-center mb-10">
            <p className="section-subtitle">{app.clusterName}</p>
            <h2 className="section-title">{app.name}</h2>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">
              {app.products.length} products available — search below to find the right cable.
            </p>
          </div>

          <CategoryProductsGrid products={app.products} />

          <p className="text-center text-slate-400 text-xs mt-10">
            Specifications shown are as listed by Polycab and are indicative — contact
            Arihant Cables for confirmed distributor pricing and stock availability.
          </p>
        </div>
      </section>

      <section className="section-py bg-navy-900">
        <div className="section-container text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
            Need a Custom Quote?
          </h2>
          <p className="text-white/70 mb-8 max-w-md mx-auto">
            Contact Arihant Cables for bulk pricing, custom specs, and immediate dispatch.
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
