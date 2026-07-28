"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CableCluster } from "@/lib/catalogue";
import Reveal from "@/components/ui/Reveal";
import { cardRevealDelays } from "@/lib/animation";

interface CablesCatalogueBrowserProps {
  catalogue: CableCluster[];
}

const ALL = "All Categories";

export default function CablesCatalogueBrowser({ catalogue }: CablesCatalogueBrowserProps) {
  const [active, setActive] = useState(ALL);

  const visibleClusters =
    active === ALL ? catalogue : catalogue.filter((c) => c.name === active);

  return (
    <div>
      {/* Category filter bar — row-wise */}
      <div className="flex flex-wrap justify-center gap-2.5 mb-12">
        {[ALL, ...catalogue.map((c) => c.name)].map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => setActive(name)}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold border transition-all duration-300 ${
              active === name
                ? "bg-primary-500 text-white border-primary-500 shadow-cta"
                : "bg-white text-navy-900 border-slate-200 hover:border-primary-500 hover:text-primary-500"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="space-y-16">
        {visibleClusters.map((cluster) => (
          <div key={cluster.id}>
            <h3 className="text-xl md:text-2xl font-heading font-bold text-navy-900 mb-6 pb-3 border-b border-slate-100">
              {cluster.name}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {cluster.applications.map((app, i) => (
                <Reveal key={app.id} zoom delay={cardRevealDelays[i % cardRevealDelays.length]}>
                <Link
                  href={`/products/cables/${app.slug}`}
                  className="group/card relative overflow-hidden rounded-2xl bg-[#ececec] widget-card shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
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
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
