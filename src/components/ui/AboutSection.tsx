"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function AboutSection() {
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

  const reveal = (delay: string) =>
    `transition-all duration-700 ease-out ${delay} ${
      inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    }`;

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* LEFT SIDE (7 Columns): Title on Top, Image + Text on Bottom */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            
            {/* Top Heading */}
            <div className={`mb-8 sm:mb-10 lg:mb-12 ${reveal("")}`}>
              <p className="text-[#fc6601] font-extrabold text-xs sm:text-sm uppercase tracking-[0.2em] mb-2">
                ABOUT US
              </p>
              <h2 className="text-black font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight leading-[1.1]">
                WELCOME TO ARIHANT
                <br />
                CABLES
              </h2>
            </div>

            {/* Bottom Content Row: Wire Image (Left) + Paragraph & Button (Right) */}
            <div className="grid sm:grid-cols-12 gap-6 items-start">
              
              {/* Wire Bundle Image (5 cols) */}
              <div className={`sm:col-span-5 ${reveal("delay-200")}`}>
                <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-md border border-slate-200/80">
                  <Image
                    src="/brand/about-1.png"
                    alt="Polycab wire construction"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Paragraph & Button (7 cols) */}
              <div className={`sm:col-span-7 flex flex-col items-start ${reveal("delay-300")}`}>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed mb-6 text-left">
                  For over three decades,{" "}
                  <strong className="text-black font-extrabold">
                    ARIHANT CABLES has been a Leading Distributor of POLYCAB WIRES &amp; CABLES
                  </strong>
                  , offering a wide range of high quality cables ready for immediate dispatch. Our
                  commitment to quality, reliability, and customer satisfaction has earned us a
                  strong reputation in the industry. We are catering to both domestic and
                  international markets.
                </p>

                {/* MORE EXPLORE Button with Left Orange Bar Notch */}
                <Link
                  href="/about"
                  className="group relative inline-flex items-center justify-center px-7 py-3.5 border border-[#fc6601] bg-white text-black font-extrabold text-xs uppercase tracking-widest overflow-hidden transition-all duration-300 hover:bg-[#fc6601] hover:text-white shadow-sm"
                  id="about-more-explore-btn"
                >
                  <span className="absolute inset-y-0 left-0 w-1.5 bg-[#fc6601] group-hover:bg-white transition-colors duration-300" />
                  <span className="relative z-10">MORE EXPLORE</span>
                </Link>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE (5 Columns): Large Truck Image extending vertically */}
          <div className={`lg:col-span-5 relative mt-6 lg:mt-0 ${reveal("delay-150")}`}>
            <div className="relative rounded-sm overflow-hidden shadow-lg border border-slate-200/80 group">
              <Image
                src="/brand/about-2.png"
                alt="Arihant Cables — Wires & Cables distribution logistics truck"
                width={700}
                height={500}
                className="w-full h-auto object-cover group-hover:scale-103 transition-transform duration-500"
                priority
              />
              {/* Brand Icon Mark Badge on Top-Left of Image */}
              <div className="absolute top-4 left-4 w-9 h-9 rounded-md bg-[#141414] shadow-md flex items-center justify-center border border-white/10">
                <Image
                  src="/brand/icon-mark.svg"
                  alt=""
                  width={20}
                  height={18}
                  className="w-4 h-4 brightness-0 invert opacity-90"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
