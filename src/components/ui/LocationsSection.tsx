"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Phone, ExternalLink } from "lucide-react";

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

export default function LocationsSection() {
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

  return (
    <>
      <section ref={sectionRef} className="relative pt-16 md:pt-24 pb-0 bg-white">
        <div className="section-container">
          {/* Pulled down with a negative bottom margin + z-10 so the cards
              overlap the footer below instead of leaving a plain gap. */}
          <div className="relative z-10 grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-[-88px] md:mb-[-108px]">
            {locations.map((loc, i) => (
              <div
                key={loc.label}
                className={`relative overflow-hidden bg-[#ececec] rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 p-8 sm:p-9 ${fadeUp(
                  i === 0 ? "delay-150" : "delay-300"
                )}`}
                style={{
                  backgroundImage: "url(/brand/widget-texture.svg)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "top right",
                }}
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

      {/* Decorative dotted divider */}
      <div className="bg-primary-500 py-2.5 overflow-hidden">
        <div className="flex gap-3 justify-center">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="w-1.5 h-1.5 rounded-sm bg-white/70 flex-shrink-0" />
          ))}
        </div>
      </div>
    </>
  );
}
