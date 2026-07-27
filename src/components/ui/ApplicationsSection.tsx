"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const applications = [
  { label: "Residential", image: "/brand/app-residential.png" },
  { label: "Industrial", image: "/brand/app-industrial.png" },
  { label: "Healthcare", image: "/brand/app-healthcare.png" },
  { label: "Telecommunication", image: "/brand/app-telecom.png" },
  { label: "Hotels", image: "/brand/app-hotels.png" },
  { label: "Commercial", image: "/brand/app-commercial.png" },
];

const delays = ["", "delay-100", "delay-200", "delay-300", "delay-[400ms]", "delay-500"];

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
            src="/brand/icon-mark.svg"
            alt=""
            width={40}
            height={40}
            className="mx-auto mb-3"
          />
          <h2 className="section-title">Applications</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {applications.map((app, i) => (
            <div
              key={app.label}
              className={`rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover group relative transition-all duration-500 hover:-translate-y-1.5 ${fadeUp(
                delays[i]
              )}`}
            >
              <div className="aspect-[3/4] relative">
                <Image
                  src={app.image}
                  alt={app.label}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/15 to-transparent transition-opacity duration-300 group-hover:from-primary-500/80" />
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
