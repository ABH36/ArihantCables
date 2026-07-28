"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MapPin, Phone, ExternalLink } from "lucide-react";
import InquiryForm from "@/components/ui/InquiryForm";

const locations = [
  {
    label: "Shop Address",
    name: "ARIHANT CABLES",
    address: "27, Shreenath Bhavan, 6/12 Picket X Road, Lohar Chawl, Mumbai – 400 002",
    phones: ["022-22084443 / 22084447", "022-22084450 / 22069420", "022-22081673 (Intercom: *257 / *744)"],
    mapUrl: "https://maps.app.goo.gl/MGesV8scY7MJELeDA",
  },
  {
    label: "Godown Address",
    name: "RAJ CABLE WAREHOUSE",
    address:
      "Haribhau Patil Compound, K-square Prakhyat Industrial Park, Opposite Urban Tadka Hotel, Mumbai-Nashik Highway, Village Kurund, Padgha Bhiwandi – 421101",
    phones: ["9702333505 / 9821155960 / 9930543276"],
    mapUrl: "https://maps.app.goo.gl/8Eyev7QJfC5JmEJU7",
  },
];

const widgetCardStyle: React.CSSProperties = {
  backgroundImage: "url(/brand/widget-texture.svg)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "top right",
};

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
      <Image src="/homeenqurybackground.png" alt="" fill className="object-cover" />

      <div className="section-container relative">
        {/* Request a Quote form */}
        {showForm && (
          <div className="flex justify-center mb-16 md:mb-24">
            <div
              className={`relative w-full max-w-2xl bg-[#ececec] rounded-2xl shadow-2xl p-8 sm:p-12 overflow-hidden ${fadeUp("")}`}
              style={widgetCardStyle}
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
              className={`relative w-full max-w-4xl bg-[#ececec] rounded-2xl shadow-2xl p-8 sm:p-12 overflow-hidden ${fadeUp("")}`}
              style={widgetCardStyle}
            >
              <div className="relative">{children}</div>
            </div>
          </div>
        )}

        {/* Location cards — top half rides the background image above,
            bottom half overlaps the footer via the negative margin. */}
        <div className="relative z-10 grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-[-88px] md:mb-[-108px]">
          {locations.map((loc, i) => (
            <div
              key={loc.label}
              className={`relative overflow-hidden bg-[#ececec] rounded-2xl shadow-card-hover p-8 sm:p-9 ${fadeUp(
                i === 0 ? "delay-150" : "delay-300"
              )}`}
              style={widgetCardStyle}
            >
              <div className="relative flex items-start gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-primary-500" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-primary-600">
                    {loc.label}
                  </p>
                  <p className="font-heading font-bold text-navy-950 text-sm">{loc.name}</p>
                </div>
              </div>
              <p className="relative text-navy-500 text-sm leading-relaxed mb-5">{loc.address}</p>

              <div className="relative flex items-start gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                  <Phone size={16} className="text-primary-500" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-primary-600 mb-1">
                    Contact
                  </p>
                  {loc.phones.map((p) => (
                    <p key={p} className="text-navy-600 text-sm">
                      {p}
                    </p>
                  ))}
                </div>
              </div>

              <a
                href={loc.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex btn-secondary text-sm bg-white"
              >
                View Map <ExternalLink size={14} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
