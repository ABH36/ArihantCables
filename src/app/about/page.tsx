import type { Metadata } from "next";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Target, Eye, CheckCircle2 } from "lucide-react";
import PageBanner from "@/components/ui/PageBanner";
import Reveal from "@/components/ui/Reveal";
import { cldImage } from "@/lib/cloudinary";

const ContactSection = dynamic(() => import("@/components/ui/ContactSection"));

export const metadata: Metadata = {
  title: "About Us — Arihant Cables Mumbai | 30+ Years of Polycab Distribution",
  description:
    "Arihant Cables — Authorised Distributors of Polycab Wires & Cables in Mumbai for over 30 years. Serving domestic and international markets from Lohar Chawl, Mumbai.",
};

const whyChoosePoints = [
  "30+ Years of Industry Experience in electrical cable distribution.",
  "Authorised Distributor of POLYCAB Wires & Cables ensuring genuine products.",
  "Extensive Product Portfolio covering residential, commercial, industrial, and infrastructure applications.",
  "Ready Stock Availability for faster order fulfilment.",
  "Competitive Pricing with transparent business practices.",
  "Fast Pan-India Delivery supported by efficient logistics.",
  "Experienced Technical Team to recommend the right cable solutions.",
  "Trusted by Leading Industries, Contractors, OEMs & EPC Companies.",
  "Strict Quality Assurance with products manufactured to national and international standards.",
  "Dedicated Customer Support before and after sales.",
];

const productRange = [
  "House & Building Wires",
  "FR, FRLS, HFFR & Fire Survival Cables",
  "LT & HT Power Cables",
  "XLPE Power Cables",
  "Control & Instrumentation Cables",
  "Flexible Cables",
  "Solar Cables",
  "Submersible Flat Cables",
  "Marine & Ship Wiring Cables",
  "Optical Fibre Cables (OFC)",
  "CCTV & Coaxial Cables",
  "LAN, Telephone & Communication Cables",
  "Speaker Cables",
  "Industrial & Speciality Cables",
  "Cable Accessories",
];

export default function AboutPage() {
  return (
    <>
      <PageBanner title="About Us" crumb="About Us" />

      {/* Welcome / Main Content */}
      <section className="section-py bg-white">
        <div className="section-container">
          <Reveal className="text-center mb-14">
            <Image src={cldImage("brand/icon-mark.svg")} alt="" width={40} height={40} className="mx-auto mb-3" />
            <h2 className="section-title">
              About <span className="text-primary-700">Arihant Cables</span>
            </h2>
            <p className="text-primary-700 font-semibold text-sm sm:text-base mt-3">
              India&apos;s Trusted Authorised Distributor of POLYCAB Wires &amp; Cables
            </p>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-12">
            {/* LEFT: cascading image stack — each photo at its own natural
                aspect ratio (no crop, no background fill), overlapping for a
                premium layered look instead of a flat grid. */}
            <Reveal zoom delay="delay-150" className="relative pb-10 pr-10 sm:pb-14 sm:pr-16">
              <div className="relative rounded-2xl overflow-hidden shadow-card-hover">
                <Image
                  src={cldImage("aboutusfirstimage.png")}
                  alt="Arihant Cables — Authorised POLYCAB Wires & Cables Distributor"
                  width={1623}
                  height={969}
                  className="w-full h-auto"
                />
              </div>

              <div className="absolute bottom-4 left-4 w-[26%] sm:w-[22%] rounded-xl overflow-hidden shadow-2xl ring-4 ring-white z-10">
                <Image
                  src={cldImage("aboutus-why-choose.jpeg")}
                  alt="POLYCAB Wires & Cables Product Range"
                  width={1254}
                  height={1254}
                  className="w-full h-auto"
                />
              </div>

              <div className="absolute bottom-0 right-6 sm:right-10 w-[30%] rounded-xl overflow-hidden shadow-2xl ring-4 ring-white z-20">
                <Image
                  src={cldImage("brand/about-1.png")}
                  alt="Polycab wire construction"
                  width={350}
                  height={277}
                  className="w-full h-auto"
                />
              </div>

              {/* 30+ Years badge — floats into the space to the right of the
                  stack instead of a separate full-width bar below it. */}
              <div className="absolute top-4 right-0 bg-white border-2 border-primary-500 rounded-2xl shadow-xl px-5 py-4 text-center z-30">
                <p className="text-3xl sm:text-4xl font-heading font-black text-primary-700">30+</p>
                <p className="text-[11px] sm:text-xs font-bold text-navy-950 uppercase tracking-wide mt-1 leading-tight">
                  Years of
                  <br />
                  Experience
                </p>
              </div>
            </Reveal>

            {/* RIGHT: copy */}
            <Reveal
              delay="delay-300"
              className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-5 text-justify"
            >
              <p>
                <strong className="text-navy-950">Arihant Cables</strong> is one of India&apos;s
                leading Authorised Distributors of{" "}
                <strong className="text-primary-700">POLYCAB Wires &amp; Cables</strong>,
                delivering genuine electrical wiring solutions for over 30 years. Built on a
                foundation of trust, quality, and customer satisfaction, we have established
                ourselves as a preferred distribution partner for industries, infrastructure
                projects, electrical contractors, OEMs, builders, government organisations, and
                dealers across India.
              </p>
              <p>
                With decades of experience in the electrical industry, we supply a comprehensive
                range of POLYCAB electrical wires, power cables, industrial cables, communication
                cables, and cable accessories with ready stock availability, competitive pricing,
                and prompt nationwide delivery. Every product we supply is sourced directly through
                authorised channels, ensuring complete authenticity, superior performance, and
                compliance with the highest quality standards.
              </p>
            </Reveal>
          </div>

          {/* Full-width closing copy */}
          <Reveal className="max-w-5xl mx-auto text-slate-600 text-sm sm:text-base leading-relaxed space-y-5 text-justify">
            <p>
              Our extensive product portfolio includes Building Wires, House Wires, LV &amp; MV
              Power Cables, HT Cables, Instrumentation Cables, Control Cables, Flexible Cables,
              Fire Resistant Cables, Fire Survival Cables, Submersible Cables, Marine &amp; Ship
              Wiring Cables, Solar Cables, Optical Fibre Cables (OFC), CCTV Cables, LAN Cables,
              Coaxial Cables, Telephone Cables, Speaker Cables, Communication Cables, and Speciality
              Cables, catering to residential, commercial, industrial, infrastructure, renewable
              energy, telecom, and utility sectors.
            </p>
            <p>
              Over the years, Arihant Cables has earned the confidence of some of India&apos;s most
              respected companies by consistently delivering genuine products, technical expertise,
              timely deliveries, and exceptional customer support. Our experienced sales
              professionals understand diverse project requirements and provide the right cable
              solutions that maximise safety, efficiency, and long-term performance.
            </p>
            <p>
              Our success is driven by our unwavering commitment to quality, reliability, ethical
              business practices, competitive pricing, and customer-first service. By maintaining
              ready inventory, efficient logistics, and strong relationships with manufacturers, we
              ensure uninterrupted supply for projects of every scale—from individual residential
              requirements to large industrial and infrastructure developments.
            </p>
            <p>
              As we continue to grow, our vision remains focused on becoming India&apos;s most
              trusted cable distribution company by embracing innovation, operational excellence,
              and long-term customer partnerships while expanding our presence in both domestic and
              international markets.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-py bg-section-gradient">
        <div className="section-container">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            <Reveal zoom className="text-center">
              <Image src={cldImage("brand/icon-mark.svg")} alt="" width={40} height={40} className="mx-auto mb-3" />
              <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
                <Target size={24} className="text-primary-700" />
              </div>
              <h3 className="section-title !text-2xl md:!text-3xl mb-4">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed">
                To deliver genuine POLYCAB Wires &amp; Cables with unmatched quality, reliable
                availability, competitive pricing, and exceptional customer service while building
                long-term relationships based on trust, integrity, and customer satisfaction.
              </p>
            </Reveal>
            <Reveal zoom delay="delay-150" className="text-center">
              <Image src={cldImage("brand/icon-mark.svg")} alt="" width={40} height={40} className="mx-auto mb-3" />
              <div className="w-14 h-14 rounded-2xl bg-navy-950/10 flex items-center justify-center mx-auto mb-4">
                <Eye size={24} className="text-navy-950" />
              </div>
              <h3 className="section-title !text-2xl md:!text-3xl mb-4">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed">
                To become India&apos;s most preferred and trusted authorised distributor of
                electrical wires and cables by setting new benchmarks in quality, service
                excellence, technology, and nationwide distribution.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Our Product Range */}
      <section className="section-py bg-white">
        <div className="section-container">
          <Reveal className="text-center mb-10">
            <Image src={cldImage("brand/icon-mark.svg")} alt="" width={40} height={40} className="mx-auto mb-3" />
            <h2 className="section-title">Our Product Range</h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
              We supply a complete range of genuine POLYCAB products, including:
            </p>
          </Reveal>
          <Reveal
            delay="delay-150"
            className="max-w-4xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3"
          >
            {productRange.map((item) => (
              <div key={item} className="flex items-start gap-2 text-slate-700 text-sm sm:text-base">
                <CheckCircle2 size={16} className="text-primary-700 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <ContactSection showForm={false}>
        <div className="text-center">
          <Image src={cldImage("brand/icon-mark.svg")} alt="" width={40} height={40} className="mx-auto mb-3" />
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-navy-950 mb-6">
            Why Choose Arihant Cables?
          </h2>
          <ul className="text-left grid sm:grid-cols-2 gap-x-8 gap-y-3 max-w-3xl mx-auto mb-8">
            {whyChoosePoints.map((point) => (
              <li key={point} className="flex items-start gap-3 text-slate-700 text-sm sm:text-base">
                <CheckCircle2 size={18} className="text-primary-700 flex-shrink-0 mt-0.5" />
                {point}
              </li>
            ))}
          </ul>
          <p className="font-heading font-semibold text-navy-950 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto text-justify">
            Arihant Cables continues to power homes, businesses, industries, and infrastructure
            projects with genuine POLYCAB products, delivering quality, reliability, and service
            excellence that customers have trusted for more than three decades.
          </p>
        </div>
      </ContactSection>
    </>
  );
}
