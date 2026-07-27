"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

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
    <section ref={sectionRef} className="section-py bg-white overflow-hidden">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* LEFT: title, small image + copy */}
          <div>
            <p className={reveal("")}>
              <span className="section-subtitle">About Us</span>
            </p>
            <h2 className={`section-title mb-10 ${reveal("delay-100")}`}>
              Welcome to Arihant Cables
            </h2>

            <div className="flex flex-col sm:flex-row gap-8 items-start">
              <div className={`w-full sm:w-40 md:w-48 flex-shrink-0 ${reveal("delay-200")}`}>
                <div className="relative aspect-square rounded-xl overflow-hidden shadow-card">
                  <Image
                    src="/brand/about-1.png"
                    alt="Polycab wire construction"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className={`flex-1 min-w-0 ${reveal("delay-300")}`}>
                <p className="text-slate-600 text-[15px] leading-relaxed text-justify mb-7">
                  For over three decades, <strong className="text-navy-950">ARIHANT CABLES</strong>{" "}
                  has been a Leading Distributor of{" "}
                  <strong className="text-primary-500">POLYCAB WIRES &amp; CABLES</strong>, offering
                  a wide range of high-quality cables ready for immediate dispatch. Our commitment
                  to quality, reliability, and customer satisfaction has earned us a strong
                  reputation in the industry. We are catering to both domestic and international
                  markets.
                </p>
                <Link
                  href="/about"
                  className="group relative inline-flex items-center gap-2 pl-6 pr-6 py-3.5 border border-primary-500 text-navy-950 font-semibold text-sm uppercase tracking-wide overflow-hidden transition-colors duration-300 hover:text-white"
                >
                  <span className="absolute inset-y-0 left-0 w-1.5 bg-primary-500 z-10" />
                  <span className="absolute inset-0 origin-left scale-x-0 bg-primary-500 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  <span className="relative z-10">More Explore</span>
                  <ArrowRight
                    size={15}
                    className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT: large image, pulled up so it overlaps the title row */}
          <div className={`relative lg:-mt-14 ${reveal("delay-150")}`}>
            <div className="relative rounded-2xl overflow-hidden shadow-card-hover">
              <Image
                src="/brand/about-2.png"
                alt="Arihant Cables — Wires & Cables distribution"
                width={900}
                height={600}
                className="w-full h-auto object-cover"
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
