import Image from "next/image";
import { Download } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { cardRevealDelays } from "@/lib/animation";

export interface CatalogueItem {
  title: string;
  image: string;
  pdf: string;
}

export default function CatalogueGrid({ items }: { items: CatalogueItem[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
      {items.map((item, i) => (
        <Reveal
          key={item.title}
          zoom
          delay={cardRevealDelays[i % cardRevealDelays.length]}
          className="group relative overflow-hidden rounded-2xl bg-[#ececec] widget-card-bg shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
        >
          <div className="relative aspect-[3/4] bg-white/70 overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="p-4">
            <p className="font-heading font-bold text-navy-900 text-sm sm:text-base leading-snug mb-3 line-clamp-2">
              {item.title}
            </p>
            <a href={item.pdf} download className="btn-primary w-full justify-center !text-xs !py-2.5">
              <Download size={14} /> Download PDF
            </a>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
