"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Cable, Plug } from "lucide-react";

const products = [
  {
    name: "Wires",
    tagline:
      "Power your world with Polycab Wires – where safety, reliability, and innovation meet to elevate your electrical solutions.",
    image: "/brand/widget-wires.png",
    href: "/products/wires",
    icon: Cable,
    dark: false,
  },
  {
    name: "Cables",
    tagline:
      "Elevate your electrical systems with Polycab Cables, engineered for reliability and performance to power your world.",
    image: "/brand/widget-cables.png",
    href: "/products/cables",
    icon: Plug,
    dark: true,
  },
];

export default function ProductsSection() {
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
    <section ref={sectionRef} className="relative section-py bg-section-gradient overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container relative">
        <div className={`text-center mb-14 ${fadeUp("")}`}>
          <p className="section-subtitle">What We Distribute</p>
          <h2 className="section-title">Our Products</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {products.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.name}
                className={`group relative overflow-hidden rounded-2xl transition-all duration-500 ease-out hover:-translate-y-2 ${fadeUp(
                  i === 0 ? "delay-150" : "delay-300"
                )} ${
                  p.dark
                    ? "bg-navy-950 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.65)]"
                    : "bg-white border border-slate-100 shadow-card hover:shadow-card-hover"
                }`}
              >
                {/* Product image */}
                <div
                  className={`relative aspect-[16/10] flex items-center justify-center p-8 overflow-hidden ${
                    p.dark ? "bg-navy-900" : "bg-slate-50"
                  }`}
                >
                  <div
                    className={`absolute w-64 h-64 rounded-full blur-3xl opacity-40 transition-opacity duration-500 group-hover:opacity-60 ${
                      p.dark ? "bg-primary-500/30" : "bg-primary-200"
                    }`}
                  />
                  <Image
                    src={p.image}
                    alt={`Polycab ${p.name}`}
                    width={400}
                    height={260}
                    className="relative max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Icon badge */}
                  <div
                    className={`absolute top-5 left-5 w-11 h-11 rounded-xl flex items-center justify-center shadow-md ${
                      p.dark ? "bg-white/10 backdrop-blur-sm" : "bg-white"
                    }`}
                  >
                    <Icon size={20} className="text-primary-500" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-7 md:p-9">
                  <h3
                    className={`font-heading font-bold text-2xl mb-3 ${
                      p.dark ? "text-white" : "text-navy-950"
                    }`}
                  >
                    {p.name}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed mb-7 ${
                      p.dark ? "text-white/60" : "text-slate-500"
                    }`}
                  >
                    {p.tagline}
                  </p>
                  <Link
                    href={p.href}
                    className="inline-flex items-center gap-2 font-semibold text-sm uppercase tracking-wide text-primary-500 hover:text-primary-600 transition-colors"
                    id={`explore-${p.name.toLowerCase()}`}
                  >
                    Explore {p.name}
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1.5"
                    />
                  </Link>
                </div>

                {/* Bottom accent bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary-500 scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
