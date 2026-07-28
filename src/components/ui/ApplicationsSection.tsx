"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cldImage } from "@/lib/cloudinary";

const applications = [
  { label: "Residential", image: cldImage("brand/app-residential.png") },
  { label: "Industrial", image: cldImage("brand/app-industrial.png") },
  { label: "Healthcare", image: cldImage("brand/app-healthcare.png") },
  { label: "Telecommunication", image: cldImage("brand/app-telecom.png") },
  { label: "Hotels", image: cldImage("brand/app-hotels.png") },
  { label: "Commercial", image: cldImage("brand/app-commercial.png") },
];

// Duplicated once so the marquee can loop seamlessly at translateX(-50%).
const loopItems = [...applications, ...applications];

export default function ApplicationsSection() {
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
    <section ref={sectionRef} className="section-py bg-white">
      <div className="section-container">
        <div className={`text-center mb-12 ${fadeUp("")}`}>
          <Image
            src={cldImage("brand/icon-mark.svg")}
            alt=""
            width={40}
            height={40}
            className="mx-auto mb-3"
          />
          <h2 className="section-title">Applications</h2>
        </div>
      </div>

      {/* Full-bleed auto-swapping single row */}
      <div className={`relative overflow-hidden group ${fadeUp("delay-150")}`}>
        {/* Edge fades so tiles don't hard-cut at the viewport edge */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex gap-4 w-max animate-marquee group-hover:[animation-play-state:paused]">
          {loopItems.map((app, i) => (
            <div
              key={`${app.label}-${i}`}
              className="relative w-36 sm:w-44 md:w-52 flex-shrink-0 rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1.5 group/tile"
            >
              <div className="aspect-[3/4] relative">
                <Image
                  src={app.image}
                  alt={app.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover/tile:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/15 to-transparent transition-opacity duration-300 group-hover/tile:from-primary-500/80" />
              </div>
              <p className="absolute bottom-3 left-0 right-0 text-center text-white font-heading font-bold text-sm">
                {app.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
