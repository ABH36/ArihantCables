"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import InquiryForm from "@/components/ui/InquiryForm";
import LocationCards from "@/components/ui/LocationCards";
import { cldImage } from "@/lib/cloudinary";

interface ContactSectionProps {
  showForm?: boolean;
  children?: React.ReactNode;
}

export default function ContactSection({ showForm = true, children }: ContactSectionProps) {
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

  const fadeUp = (delay: string) =>
    `transition-all duration-700 ease-out ${delay} ${
      inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
    }`;

  return (
    <section
      ref={sectionRef}
      className={`relative pb-0 ${showForm || children ? "pt-16 md:pt-24" : "pt-10 md:pt-14"}`}
      id="inquiry"
    >
      {/* Single continuous background image behind both the form and the
          address cards below it — no seam, no separate white section. */}
      <Image src={cldImage("homeenqurybackground.png")} alt="" fill className="object-cover" />

      <div className="section-container relative">
        {/* Request a Quote form */}
        {showForm && (
          <div className="flex justify-center mb-16 md:mb-24">
            <div
              className={`relative w-full max-w-2xl bg-[#ececec] widget-card rounded-2xl shadow-2xl p-8 sm:p-12 overflow-hidden ${fadeUp("")}`}
            >
              <div className="relative">
                <p className="section-subtitle mb-1">Get In Touch</p>
                <h2 className="font-heading font-bold text-2xl sm:text-3xl text-navy-950 mb-7">
                  Request A Quote
                </h2>

                <InquiryForm sourcePage="/" variant="compact" submitLabel="Submit Now" />
              </div>
            </div>
          </div>
        )}

        {!showForm && children && (
          <div className="flex justify-center mb-16 md:mb-24">
            <div
              className={`relative w-full max-w-4xl bg-[#ececec] widget-card rounded-2xl shadow-2xl p-8 sm:p-12 overflow-hidden ${fadeUp("")}`}
            >
              <div className="relative">{children}</div>
            </div>
          </div>
        )}

        {/* Location cards — top half rides the background image above,
            bottom half overlaps the footer via the negative margin. */}
        <LocationCards />
      </div>
    </section>
  );
}
