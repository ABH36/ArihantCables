"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { cldImage } from "@/lib/cloudinary";

const whyChoosePoints = [
  "30+ Years of Industry Experience",
  "Authorised Distributor of Genuine POLYCAB Products",
  "Extensive Ready Stock for Immediate Dispatch",
  "Competitive Prices & Bulk Supply Capability",
  "Fast Pan-India Delivery",
  "Trusted by Contractors, Industries, EPC Companies & OEMs",
  "Expert Technical Assistance & Dedicated Customer Support",
];

function AboutImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-card-hover border border-slate-100 bg-[#ececec] h-72 sm:h-96 lg:h-full group">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain p-4 sm:p-6 transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute top-4 left-4 w-10 h-10 rounded-lg bg-navy-950 shadow-md flex items-center justify-center z-10">
        <Image
          src={cldImage("brand/icon-mark.svg")}
          alt=""
          width={20}
          height={18}
          className="w-5 h-[1.1rem] brightness-0 invert opacity-90"
        />
      </div>
    </div>
  );
}

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

        {/* Row 1: intro copy (left) + truck photo (right) — image stretches
            to match the copy's height so there's no leftover empty space. */}
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 mb-16 lg:mb-24">
          <div className={fadeUp("delay-150")}>
            <h3 className="font-heading font-bold text-2xl sm:text-3xl lg:text-[2.25rem] text-navy-950 mb-2 leading-tight">
              India&apos;s Leading Authorised Distributor of{" "}
              <span className="text-primary-700">POLYCAB Wires &amp; Cables</span>
            </h3>
            <p className="text-primary-700 font-semibold text-sm sm:text-base mb-5">
              30+ Years of Excellence in Delivering Genuine POLYCAB Cable Solutions
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-justify mb-4">
              Arihant Cables is one of India&apos;s leading Authorised Distributors of POLYCAB
              Wires &amp; Cables, serving customers with trusted electrical solutions for over 30
              years. We offer a comprehensive range of POLYCAB electrical wires, power cables,
              control cables, flexible cables, industrial cables, LT &amp; HT cables,
              instrumentation cables, communication cables, and cable accessories, all sourced
              directly from POLYCAB to ensure superior quality and authenticity.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-justify mb-4">
              With extensive ready stock for immediate dispatch, competitive pricing, and a strong
              distribution network, we ensure fast and reliable delivery across India and selected
              international markets. Our products are widely used in residential, commercial,
              industrial, infrastructure, EPC, manufacturing, construction, power, oil &amp; gas,
              and renewable energy projects.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed text-justify">
              At Arihant Cables, we are committed to delivering 100% genuine POLYCAB products,
              expert technical support, prompt customer service, and dependable supply solutions
              that help businesses complete projects on time and within budget. Whether your
              requirement is for a single cable or a large-scale industrial order, we provide
              reliable, cost-effective, and high-performance cable solutions tailored to your
              needs.
            </p>
          </div>

          <div className={zoomIn("delay-300")}>
            <AboutImage
              src={cldImage("aboutusfirstimage.png")}
              alt="Arihant Cables — Authorised POLYCAB Wires & Cables Distributor"
            />
          </div>
        </div>

        {/* Row 2: product range photo (left) + Why Choose Us (right) — same
            stretch treatment so the image matches the checklist's height. */}
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20">
          <div className={zoomIn("delay-150")}>
            <AboutImage
              src={cldImage("aboutus-why-choose.jpeg")}
              alt="POLYCAB Wires & Cables Product Range"
            />
          </div>

          <div className={fadeUp("delay-300")}>
            <h4 className="font-heading font-bold text-xl sm:text-2xl text-navy-950 mb-5">
              Why Choose Arihant Cables?
            </h4>
            <ul className="space-y-3 mb-7">
              {whyChoosePoints.map((point) => (
                <li key={point} className="flex items-start gap-2 text-slate-700 text-sm sm:text-base">
                  <CheckCircle2 size={16} className="text-primary-700 flex-shrink-0 mt-0.5" />
                  {point}
                </li>
              ))}
            </ul>

            <p className="font-heading font-semibold text-navy-950 text-sm sm:text-base leading-relaxed mb-8">
              Powering Homes, Industries, and Infrastructure with Genuine POLYCAB Wires &amp;
              Cables for More Than Three Decades.
            </p>

            <Link href="/about" className="group btn-secondary text-sm uppercase tracking-wide" id="about-more-explore-btn">
              More Explore
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
