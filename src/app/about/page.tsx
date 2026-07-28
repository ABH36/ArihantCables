import type { Metadata } from "next";
import Image from "next/image";
import { Target, Eye, CheckCircle2 } from "lucide-react";
import PageBanner from "@/components/ui/PageBanner";
import ContactSection from "@/components/ui/ContactSection";
import Reveal from "@/components/ui/Reveal";
import { cldImage } from "@/lib/cloudinary";

export const metadata: Metadata = {
  title: "About Us — Arihant Cables Mumbai | 30+ Years of Polycab Distribution",
  description:
    "Arihant Cables — Authorised Distributors of Polycab Wires & Cables in Mumbai for over 30 years. Serving domestic and international markets from Lohar Chawl, Mumbai.",
};

const whyChoosePoints = [
  "Confirmation of using superior raw materials.",
  "Assurance of rigorous testing and quality control processes.",
  "Commitment to meeting customer needs and expectations.",
  "Proven record of accomplishment of reliability and customer satisfaction.",
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
              Welcome to <span className="text-primary-500">Arihant Cables</span>
            </h2>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-12">
            {/* LEFT: image collage + stat */}
            <Reveal zoom delay="delay-150" className="grid grid-cols-2 grid-rows-2 gap-4">
              <div className="row-span-2 relative rounded-2xl overflow-hidden shadow-card aspect-[4/5]">
                <Image
                  src={cldImage("brand/widget-cables.png")}
                  alt="Polycab cable range"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-card aspect-[4/3]">
                <Image src={cldImage("brand/about-1.png")} alt="Polycab wire construction" fill className="object-cover" />
              </div>
              <div className="relative rounded-2xl overflow-hidden shadow-card aspect-[4/3]">
                <Image
                  src={cldImage("brand/about-2.png")}
                  alt="Arihant Cables distribution truck"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="col-span-2 border-2 border-primary-500 rounded-2xl py-6 text-center">
                <p className="text-4xl md:text-5xl font-heading font-black text-primary-500">30+</p>
                <p className="text-sm font-bold text-navy-950 uppercase tracking-wide mt-1">
                  Years of Experience
                </p>
              </div>
            </Reveal>

            {/* RIGHT: copy */}
            <Reveal
              delay="delay-300"
              className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-5 text-justify"
            >
              <p>
                For over three decades, <strong className="text-navy-950">ARIHANT CABLES</strong>{" "}
                has been a Leading Distributor of{" "}
                <strong className="text-primary-500">POLYCAB WIRES &amp; CABLES</strong>, offering
                a wide range of high-quality cables ready for immediate dispatch. Our commitment
                to quality, reliability, and customer satisfaction has earned us a strong
                reputation in the industry. We are catering to both domestic and international
                markets. Our focus on continuous improvement and excellence ensures we
                consistently meet and exceed customer expectations.
              </p>
              <p>
                Recognizing this need, <strong className="text-navy-950">ARIHANT CABLES</strong>{" "}
                distributes a comprehensive range of{" "}
                <strong className="text-primary-500">POLYCAB WIRES &amp; CABLES</strong> across
                India and abroad at competitive prices.
              </p>
              <p>
                As a quality and customer-oriented company, we have achieved significant growth
                and a strong reputation in dynamic markets by offering unparalleled Wires &amp;
                Cables. Our experienced executives and top-quality Instrumentation Power Cables
                enable us to collaborate with some of India&apos;s most esteemed companies. Our
                dedication to quality has earned us an impressive list of clients.
              </p>
            </Reveal>
          </div>

          {/* Full-width closing copy */}
          <Reveal className="max-w-5xl mx-auto text-slate-600 text-sm sm:text-base leading-relaxed space-y-5 text-justify">
            <p>
              We compete primarily based on product quality and performance, reliable supply,
              timely delivery, excellent customer service, and competitive pricing. Established
              with the sole objective of serving our valued customers with exceptional electrical
              and electronic products—including{" "}
              <strong className="text-navy-950">
                Energy Cables, Special Cables, Communication Cables, Polycab Wires, Etira Wires,
                LV/MV Power Cables, Building Wires, Fire Resistant Cable, Submersible Cable,
                Instrumentation Cable, Marine/Shipwiring Cables, OFC Cable (Optical Fiber Cable),
                CCTV Cable, Coaxial Cable, Telephone Cable, LAN Cable, Speaker Cable etc.
              </strong>
            </p>
            <p>
              We are committed to maintaining a leading position in our field, excelling in
              quality, technology, and performance, while continuously exploring new business
              opportunities. Our organizational culture promotes constant growth and improvement.
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
                <Target size={24} className="text-primary-500" />
              </div>
              <h3 className="section-title !text-2xl md:!text-3xl mb-4">Mission</h3>
              <p className="text-slate-600 leading-relaxed">
                To build a strong brand and maintain superior quality standards for ultimate
                customer satisfaction.
              </p>
            </Reveal>
            <Reveal zoom delay="delay-150" className="text-center">
              <Image src={cldImage("brand/icon-mark.svg")} alt="" width={40} height={40} className="mx-auto mb-3" />
              <div className="w-14 h-14 rounded-2xl bg-navy-950/10 flex items-center justify-center mx-auto mb-4">
                <Eye size={24} className="text-navy-950" />
              </div>
              <h3 className="section-title !text-2xl md:!text-3xl mb-4">Vision</h3>
              <p className="text-slate-600 leading-relaxed">
                To achieve the number one position in the cable industry in terms of volume,
                turnover, and quality within the Asian continent.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <ContactSection showForm={false}>
        <div className="text-center">
          <Image src={cldImage("brand/icon-mark.svg")} alt="" width={40} height={40} className="mx-auto mb-3" />
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-navy-950 mb-6">
            Why Choose Arihant Cables?
          </h2>
          <p className="text-slate-600 leading-relaxed text-justify mb-8">
            Selecting the right vendor can be challenging due to the numerous manufacturers
            offering high-quality products. Each vendor claims to use the best raw materials, such
            as electrolytic copper, high-grade aluminum, and the required grade of PVC,
            particularly FR/FRLS grade insulation where specified. To make an informed decision,
            purchasers should verify the following points from the vendor:
          </p>
          <ul className="text-left space-y-3 inline-block">
            {whyChoosePoints.map((point) => (
              <li key={point} className="flex items-start gap-3 text-slate-700">
                <CheckCircle2 size={18} className="text-primary-500 flex-shrink-0 mt-0.5" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </ContactSection>
    </>
  );
}
