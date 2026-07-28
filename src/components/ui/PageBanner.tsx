import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageBannerProps {
  title: string;
  crumb: string;
}

export default function PageBanner({ title, crumb }: PageBannerProps) {
  return (
    <section className="relative -mt-6 sm:-mt-8 lg:-mt-10 h-[220px] md:h-[280px] flex items-center overflow-hidden bg-navy-950">
      <Image
        src="/brand/inner-banner.png"
        alt=""
        fill
        priority
        className="object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/60 to-navy-950/30" />
      <div className="section-container relative z-10 w-full text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-heading font-black text-white mb-3">{title}</h1>
        <ol className="flex items-center justify-center md:justify-start gap-2 text-sm text-white/70">
          <li>
            <Link href="/" className="hover:text-primary-400 transition-colors">
              Home
            </Link>
          </li>
          <ChevronRight size={14} className="text-white/40" />
          <li className="text-primary-400 font-medium">{crumb}</li>
        </ol>
      </div>
    </section>
  );
}
