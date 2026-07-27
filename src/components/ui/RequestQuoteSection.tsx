"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import InquiryForm from "@/components/ui/InquiryForm";

export default function RequestQuoteSection() {
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
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 overflow-hidden" id="inquiry">
      <Image
        src="/homeenqurybackground.png"
        alt=""
        fill
        className="object-cover"
        priority={false}
      />

      <div className="section-container relative">
        <div className="flex justify-center">
          <div
            className={`relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 sm:p-12 overflow-hidden transition-all duration-700 ease-out ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Decorative hexagon texture, top-right */}
            <div
              className="absolute top-0 right-0 w-40 h-32 opacity-60 pointer-events-none"
              style={{
                backgroundImage: "url(/brand/widget-texture.svg)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top right",
              }}
            />

            <div className="relative">
              <p className="section-subtitle mb-1">Get In Touch</p>
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-navy-950 mb-7">
                Request A Quote
              </h2>

              <InquiryForm sourcePage="/" variant="compact" submitLabel="Submit Now" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
