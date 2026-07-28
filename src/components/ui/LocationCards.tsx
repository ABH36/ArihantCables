import Image from "next/image";
import { ExternalLink } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { cldImage } from "@/lib/cloudinary";
import { locations } from "@/data/locations";

const delays = ["delay-150", "delay-300"];

export default function LocationCards() {
  return (
    <div className="relative z-10 grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-[-88px] md:mb-[-108px]">
      {locations.map((loc, i) => (
        <Reveal key={loc.label} delay={delays[i % delays.length]}>
          <div className="relative overflow-hidden bg-[#ececec] widget-card rounded-2xl shadow-card-hover p-8 sm:p-9 h-full">
            <div className="relative flex items-start gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-white shadow-sm flex items-center justify-center flex-shrink-0 p-1.5">
                <Image src={cldImage(loc.icon)} alt="" width={18} height={18} className="w-full h-full object-contain" />
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
              <div className="w-9 h-9 rounded-lg bg-white shadow-sm flex items-center justify-center flex-shrink-0 p-1.5">
                <Image src={cldImage("icons/icons8-call-100.png")} alt="" width={18} height={18} className="w-full h-full object-contain" />
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
        </Reveal>
      ))}
    </div>
  );
}
