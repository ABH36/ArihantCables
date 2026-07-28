"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";

const cards = [
  {
    title: "Strong Backward Integration",
    image: "/brand/app-industrial.png",
  },
  {
    title: "EC Copper Is 99.97% Pure",
    image: "/brand/inner-banner.png",
  },
  {
    title: "Wires Complying To Highest Level Of Electrical Safety",
    icon: true,
  },
];

export default function WhyChoosePolycabSection() {
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
    <div ref={sectionRef}>
      <div className={`text-center mb-6 ${fadeUp("")}`}>
        <Image src="/brand/icon-mark.svg" alt="" width={32} height={32} className="mx-auto mb-2" />
        <h2 className="font-heading font-bold text-xl sm:text-2xl text-navy-950 uppercase">
          Why Choose Polycab
        </h2>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 sm:gap-4">
        {cards.map((card, i) => (
          <div
            key={card.title}
            className={`group relative overflow-hidden rounded-xl aspect-[4/3] shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-500 ${fadeUp(
              i === 0 ? "delay-150" : i === 1 ? "delay-300" : "delay-[450ms]"
            )}`}
          >
            {card.icon ? (
              <div className="absolute inset-0 bg-navy-950 flex items-center justify-center">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_60%,theme(colors.primary.500),transparent_65%)]" />
                <ShieldCheck
                  size={44}
                  className="relative text-primary-500/70 group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ) : (
              <Image
                src={card.image!}
                alt={card.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-navy-950/85 via-navy-950/30 to-transparent" />
            <h3 className="absolute top-3 left-3 right-3 font-heading font-bold text-[11px] sm:text-xs text-white uppercase leading-snug">
              {card.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
