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

  const fadeUp = (delay: string) =>
    `transition-all duration-700 ease-out ${delay} ${
      inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    }`;

  const zoomIn = (delay: string) =>
    `transition-all duration-700 ease-out ${delay} ${
      inView ? "opacity-100 scale-100" : "opacity-0 scale-95"
    }`;

  return (
    <section ref={sectionRef} className="section-py bg-white overflow-hidden">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* LEFT: title, then small image + copy */}
          <div>
            <p className={`section-subtitle ${fadeUp("")}`}>About Us</p>
            <h2 className={`section-title mb-10 ${fadeUp("delay-100")}`}>
              Welcome to Arihant Cables
            </h2>

            <div className="flex flex-col sm:flex-row gap-8 items-start">
              <div className={`w-full sm:w-52 md:w-56 flex-shrink-0 ${zoomIn("delay-200")}`}>
                <div className="relative aspect-square rounded-xl overflow-hidden shadow-card">
                  <Image
                    src="/brand/about-1.png"
                    alt="Polycab wire construction"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className={`flex-1 min-w-0 ${fadeUp("delay-300")}`}>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-justify mb-7">
                  For over three decades,{" "}
                  <strong className="text-navy-950">
                    ARIHANT CABLES has been a Leading Distributor of POLYCAB WIRES &amp; CABLES
                  </strong>
                  , offering a wide range of high-quality cables ready for immediate dispatch. Our
                  commitment to quality, reliability, and customer satisfaction has earned us a
                  strong reputation in the industry. We are catering to both domestic and
                  international markets.
                </p>

                <Link
                  href="/about"
                  className="group relative inline-flex items-center justify-center px-7 py-3.5 border border-primary-500 bg-white text-navy-950 font-semibold text-sm uppercase tracking-wide overflow-hidden transition-colors duration-300 hover:text-white shadow-sm"
                  id="about-more-explore-btn"
                >
                  <span className="absolute inset-y-0 left-0 w-1.5 bg-primary-500 z-10 group-hover:bg-white transition-colors duration-300" />
                  <span className="absolute inset-0 origin-left scale-x-0 bg-primary-500 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  <span className="relative z-10">More Explore</span>
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT: large image, pulled up so it sits higher/staggered against the title */}
          <div className={`relative lg:-mt-16 ${zoomIn("delay-150")}`}>
            <div className="relative rounded-xl overflow-hidden shadow-card-hover border border-slate-100 group">
              <Image
                src="/brand/about-2.png"
                alt="Arihant Cables — Wires & Cables distribution logistics truck"
                width={900}
                height={600}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute top-4 left-4 w-10 h-10 rounded-lg bg-navy-950 shadow-md flex items-center justify-center">
                <Image
                  src="/brand/icon-mark.svg"
                  alt=""
                  width={20}
                  height={18}
                  className="w-5 h-[1.1rem] brightness-0 invert opacity-90"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
