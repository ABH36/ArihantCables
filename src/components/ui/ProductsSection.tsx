"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cldImage } from "@/lib/cloudinary";

const products = [
  {
    name: "Wires",
    tagline:
      "Power your world with Polycab Wires – where safety, reliability, and innovation meet to elevate your electrical solutions.",
    image: cldImage("brand/widget-wires.png"),
    href: "/products/wires",
  },
  {
    name: "Cables",
    tagline:
      "Elevate your electrical systems with Polycab Cables, engineered for reliability and performance to power your world.",
    image: cldImage("brand/widget-cables.png"),
    href: "/products/cables",
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
          <h2 className="section-title">Products</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {products.map((p, i) => (
            <div
              key={p.name}
              className={`group relative overflow-hidden bg-[#ececec] widget-card-bg min-h-[300px] sm:min-h-[340px] p-8 sm:p-10 lg:p-12 transition-shadow duration-500 hover:shadow-card-hover ${fadeUp(
                i === 0 ? "delay-150" : "delay-300"
              )}`}
            >
              {/* Product photo — bleeds off the bottom-right corner, behind the text */}
              <div className="absolute right-0 bottom-0 z-0 w-1/2 sm:w-[45%] max-w-[300px] transition-transform duration-500 group-hover:scale-105 group-hover:-translate-x-1">
                <Image
                  src={p.image}
                  alt={`Polycab ${p.name}`}
                  width={400}
                  height={320}
                  className="w-full h-auto rounded-xl"
                />
              </div>

              {/* Content */}
              <div className="relative z-10 max-w-[75%] sm:max-w-[68%]">
                <h3 className="font-heading font-bold text-2xl text-navy-950 mb-0">{p.name}</h3>
                <p className="text-navy-400 text-sm leading-[1.8] my-6">{p.tagline}</p>
                <Link
                  href={p.href}
                  className="group/btn btn-primary !rounded-none font-bold text-sm uppercase tracking-wide px-8 py-4 font-heading"
                  id={`explore-${p.name.toLowerCase()}`}
                >
                  Explore
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover/btn:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
