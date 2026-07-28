"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cldImage } from "@/lib/cloudinary";

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
    <section ref={sectionRef} className="section-py bg-section-gradient">
      <div className="section-container">
        {/* Centered header — icon + "About Us" as the section title in black,
            exactly matching the Products section's icon + title treatment */}
        <div className={`text-center mb-14 ${fadeUp("")}`}>
          <Image
            src={cldImage("brand/icon-mark.svg")}
            alt=""
            width={40}
            height={40}
            className="mx-auto mb-3"
          />
          <h2 className="section-title">About Us</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* LEFT: secondary heading + copy */}
          <div className={fadeUp("delay-150")}>
            <h3 className="font-heading font-bold text-2xl sm:text-3xl lg:text-[2.25rem] text-navy-950 mb-4 sm:whitespace-nowrap">
              Welcome to <span className="text-primary-500">Arihant Cables</span>
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-justify mb-9">
              For over three decades,{" "}
              <strong className="text-navy-950">
                ARIHANT CABLES has been a Leading Distributor of POLYCAB WIRES &amp; CABLES
              </strong>
              , offering a wide range of high-quality cables ready for immediate dispatch. Our
              commitment to quality, reliability, and customer satisfaction has earned us a strong
              reputation in the industry. We are catering to both domestic and international
              markets.
            </p>

            <Link href="/about" className="group btn-secondary text-sm uppercase tracking-wide" id="about-more-explore-btn">
              More Explore
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* RIGHT: self-contained image collage — small photo insets onto the
              large one, both scoped to this single wrapper so nothing depends
              on the left column's height (no more stray gaps). */}
          <div className={`relative pb-10 pr-6 sm:pb-14 sm:pr-14 ${zoomIn("delay-300")}`}>
            <div className="relative rounded-2xl overflow-hidden shadow-card-hover border border-slate-100 group">
              <Image
                src={cldImage("brand/about-2.png")}
                alt="Arihant Cables — Wires & Cables distribution logistics truck"
                width={900}
                height={600}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute top-4 left-4 w-10 h-10 rounded-lg bg-navy-950 shadow-md flex items-center justify-center">
                <Image
                  src={cldImage("brand/icon-mark.svg")}
                  alt=""
                  width={20}
                  height={18}
                  className="w-5 h-[1.1rem] brightness-0 invert opacity-90"
                />
              </div>
            </div>

            <div
              className={`absolute bottom-0 right-0 w-32 sm:w-40 md:w-44 aspect-square rounded-xl overflow-hidden shadow-2xl ring-4 ring-white ${zoomIn(
                "delay-500"
              )}`}
            >
              <Image
                src={cldImage("brand/about-1.png")}
                alt="Polycab wire construction"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
