"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Download, FileText } from "lucide-react";

const documents = [
  {
    title: "Armoured Cables",
    subtitle: "Pricelist — June 2026",
    href: "/documents/Arihant-ARMOURED-Jun-2026.pdf",
    id: "download-armoured-pricelist",
  },
  {
    title: "Flexible Cables",
    subtitle: "Pricelist — May 2026",
    href: "/documents/Arihant-FLEXIBLE-May-2026.pdf",
    id: "download-flexible-pricelist",
  },
];

export default function DownloadsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const fadeUp = (delay: string) =>
    `transition-all duration-700 ease-out ${delay} ${
      inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    }`;

  return (
    <section ref={sectionRef} className="relative section-py bg-section-gradient overflow-hidden" aria-label="Downloads">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container relative">
        <div className={`text-center mb-12 ${fadeUp("")}`}>
          <p className="section-subtitle">Documents</p>
          <h2 className="section-title">Pricelists &amp; Catalogues</h2>
          <p className="text-slate-500 mt-4">
            Download our latest pricelists for quick reference.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto">
          {documents.map((doc, i) => (
            <a
              key={doc.title}
              href={doc.href}
              download
              className={`group relative flex-1 bg-white rounded-2xl border border-slate-100 shadow-card hover:shadow-card-hover p-7 flex flex-col items-center text-center gap-4 overflow-hidden transition-all duration-500 hover:-translate-y-2 ${fadeUp(
                i === 0 ? "delay-150" : "delay-300"
              )}`}
              id={doc.id}
            >
              <span className="absolute top-0 left-0 right-0 h-1 bg-primary-500 scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100" />

              <div className="relative w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center transition-colors duration-300 group-hover:bg-primary-500">
                <Download
                  size={26}
                  className="text-primary-500 transition-all duration-300 group-hover:text-white group-hover:-translate-y-0.5"
                />
              </div>

              <div>
                <h4 className="font-heading font-bold text-navy-950">{doc.title}</h4>
                <p className="text-slate-500 text-sm mt-1">{doc.subtitle}</p>
              </div>

              <span className="inline-flex items-center gap-1.5 badge-primary text-xs">
                <FileText size={12} /> PDF Download
              </span>
            </a>
          ))}
        </div>

        <div className={`text-center mt-10 ${fadeUp("delay-500")}`}>
          <Link href="/pricelist" className="group inline-flex items-center gap-2 btn-secondary">
            View All Pricelists
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
