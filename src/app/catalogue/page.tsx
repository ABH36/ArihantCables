import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import PageBanner from "@/components/ui/PageBanner";

export const metadata: Metadata = {
  title: "Catalogue — Arihant Cables Mumbai",
  description:
    "Arihant Cables product catalogue — coming soon. Contact us at sales@arihantcables.com or +91-9819898469 for product catalogues.",
};

export default function CataloguePage() {
  return (
    <>
      <PageBanner title="Catalogue" crumb="Catalogue" />

      {/* Coming Soon */}
      <section className="section-py bg-white min-h-[60vh] flex items-center">
        <div className="section-container text-center">
          <div className="w-24 h-24 rounded-3xl bg-amber-50 flex items-center justify-center mx-auto mb-8">
            <Clock size={40} className="text-accent-DEFAULT" />
          </div>

          <h1 className="section-title mb-4">Catalogue</h1>
          <p className="section-subtitle text-accent-DEFAULT mb-2">Coming Soon</p>

          <p className="text-slate-500 text-lg max-w-lg mx-auto mb-10 leading-relaxed">
            Our digital catalogue is currently being updated. In the meantime, please contact
            our sales team and we will be happy to send you the relevant product catalogues.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact#inquiry" className="btn-primary">
              Request Catalogue <ArrowRight size={16} />
            </Link>
            <a href="mailto:sales@arihantcables.com" className="btn-secondary">
              Email Us
            </a>
          </div>

          <div className="mt-12 inline-flex flex-wrap gap-6 justify-center text-sm text-slate-500">
            <a href="tel:+919819898469" className="hover:text-primary-500 transition-colors">
              📞 +91-9819898469
            </a>
            <a href="mailto:sales@arihantcables.com" className="hover:text-primary-500 transition-colors">
              ✉️ sales@arihantcables.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
