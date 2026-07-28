"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import type { CatalogueProduct } from "@/lib/catalogue";
import Reveal from "@/components/ui/Reveal";
import { cardRevealDelays } from "@/lib/animation";

interface CategoryProductsGridProps {
  products: CatalogueProduct[];
}

const ALL = "All";

function specValue(p: CatalogueProduct, label: string) {
  return p.specs?.find((s) => s.label === label)?.value;
}

export default function CategoryProductsGrid({ products }: CategoryProductsGridProps) {
  const [query, setQuery] = useState("");
  const [size, setSize] = useState(ALL);
  const [length, setLength] = useState(ALL);
  const [standard, setStandard] = useState(ALL);

  const sizes = useMemo(
    () => [ALL, ...Array.from(new Set(products.map((p) => p.size).filter(Boolean) as string[]))],
    [products]
  );
  const lengths = useMemo(
    () => [ALL, ...Array.from(new Set(products.map((p) => p.length).filter(Boolean) as string[]))],
    [products]
  );
  const standards = useMemo(
    () => [
      ALL,
      ...Array.from(
        new Set(products.map((p) => specValue(p, "Standards")).filter(Boolean) as string[])
      ),
    ],
    [products]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (q && !p.name.toLowerCase().includes(q)) return false;
      if (size !== ALL && p.size !== size) return false;
      if (length !== ALL && p.length !== length) return false;
      if (standard !== ALL && specValue(p, "Standards") !== standard) return false;
      return true;
    });
  }, [products, query, size, length, standard]);

  return (
    <div>
      {/* Search + Filter bar — row-wise */}
      <Reveal className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-10 bg-slate-50 border border-slate-100 rounded-2xl p-4">
        <div className="relative flex-1 min-w-0">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-navy-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-colors"
          />
        </div>

        {sizes.length > 1 && (
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="flex-shrink-0 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-colors sm:w-auto"
          >
            {sizes.map((s) => (
              <option key={s} value={s}>
                {s === ALL ? "All Sizes" : s}
              </option>
            ))}
          </select>
        )}

        {lengths.length > 1 && (
          <select
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="flex-shrink-0 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-colors sm:w-auto"
          >
            {lengths.map((l) => (
              <option key={l} value={l}>
                {l === ALL ? "All Lengths" : l}
              </option>
            ))}
          </select>
        )}

        {standards.length > 1 && (
          <select
            value={standard}
            onChange={(e) => setStandard(e.target.value)}
            className="flex-shrink-0 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-500 transition-colors sm:w-auto"
          >
            {standards.map((s) => (
              <option key={s} value={s}>
                {s === ALL ? "All Standards" : s}
              </option>
            ))}
          </select>
        )}

        <span className="flex-shrink-0 text-xs font-semibold text-slate-500 px-2">
          {filtered.length} of {products.length} products
        </span>
      </Reveal>

      {filtered.length === 0 ? (
        <p className="text-center text-slate-500 py-16">
          No products match your search. Try a different keyword or filter.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((p, i) => (
            <Reveal key={p.id} zoom delay={cardRevealDelays[i % cardRevealDelays.length]}>
            <Link
              href={`/product/${p.slug}`}
              className="group/card rounded-xl p-3 hover:shadow-card-hover hover:-translate-y-0.5 transition-all bg-[#ececec] widget-card flex flex-col"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.imageUrl}
                alt={p.name}
                loading="lazy"
                className="w-full aspect-square object-contain rounded-lg bg-white/70 mb-2 transition-transform duration-500 group-hover/card:scale-105"
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

              <div className="relative mt-auto h-7 pt-1">
                <div className="absolute inset-x-0 top-1 flex items-center justify-end transition-all duration-300 group-hover/card:opacity-0 group-hover/card:-translate-y-1">
                  <ArrowRight size={13} className="text-slate-400" />
                </div>
                <div className="absolute inset-x-0 top-1 flex items-center justify-center opacity-0 translate-y-1 transition-all duration-300 group-hover/card:opacity-100 group-hover/card:translate-y-0">
                  <span className="btn-primary !w-full !justify-center !gap-1.5 !px-3 !py-1.5 !text-[11px] !rounded-lg">
                    Explore
                    <ArrowRight size={11} />
                  </span>
                </div>
              </div>
            </Link>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
