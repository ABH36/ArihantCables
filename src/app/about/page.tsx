import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, Clock, Award, Globe, Target, Eye } from "lucide-react";
import PageBanner from "@/components/ui/PageBanner";

export const metadata: Metadata = {
  title: "About Us — Arihant Cables Mumbai | 30+ Years of Polycab Distribution",
  description:
    "Arihant Cables — Authorised Distributors of Polycab Wires & Cables in Mumbai for over 30 years. Serving domestic and international markets from Lohar Chawl, Mumbai.",
};

const productRange = [
  "Energy Cables",
  "Special Cables",
  "Communication Cables",
  "Power Cables",
  "Building Wires",
  "Fire-Resistant Cables",
  "Submersible Cables",
  "Instrumentation Cables",
  "Marine / Shipwiring Cables",
  "Optical Fiber Cables",
  "CCTV Cables",
  "Coaxial Cables",
  "Telephone Cables",
  "LAN Cables",
];

const values = [
  { icon: Shield, title: "Quality Assurance", desc: "Only ISI-marked, Polycab-certified products. No compromise on quality." },
  { icon: Clock, title: "Immediate Dispatch", desc: "Wide stock ready for same-day dispatch from our Mumbai warehouse." },
  { icon: Award, title: "30+ Year Legacy", desc: "Three decades of trust, service, and growing business relationships." },
  { icon: Globe, title: "Pan-India Reach", desc: "Serving customers across India and international markets." },
];

export default function AboutPage() {
  return (
    <>
      <PageBanner title="About Arihant Cables" crumb="About Us" />

      {/* About Content */}
      <section className="section-py bg-white">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="section-subtitle">Who We Are</p>
              <h2 className="section-title mb-6">
                Welcome to <span className="text-primary-500">Arihant Cables</span>
              </h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  For over three decades, <strong className="text-navy-900">ARIHANT CABLES</strong>{" "}
                  has been a Leading Distributor of{" "}
                  <strong className="text-primary-500">POLYCAB WIRES &amp; CABLES</strong>, offering
                  a wide range of high-quality cables ready for immediate dispatch.
                </p>
                <p>
                  Our commitment to quality, reliability, and customer satisfaction has earned us a
                  strong reputation in the industry. We are catering to both domestic and
                  international markets, distributing across India and abroad at competitive
                  prices.
                </p>
                <p>
                  We compete on product quality and performance, reliable supply, timely
                  delivery, excellent customer service, and competitive pricing — and have had
                  the opportunity to collaborate with some of India&apos;s most esteemed
                  companies, building an impressive list of clients along the way.
                </p>
              </div>
              <div className="mt-8 flex gap-4 flex-wrap">
                <Link href="/contact" className="btn-primary">
                  Contact Us <ArrowRight size={16} />
                </Link>
                <Link href="/products/wires" className="btn-secondary">
                  View Products
                </Link>
              </div>
            </div>

            {/* Mission & Vision */}
            <div className="space-y-6">
              <div className="card p-6">
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4">
                  <Target size={22} className="text-primary-500" />
                </div>
                <h3 className="font-heading font-bold text-navy-900 text-lg mb-2">Our Mission</h3>
                <p className="text-slate-600 leading-relaxed">
                  To build a strong brand and maintain superior quality standards for ultimate
                  customer satisfaction.
                </p>
              </div>
              <div className="card p-6">
                <div className="w-12 h-12 rounded-xl bg-navy-900/10 flex items-center justify-center mb-4">
                  <Eye size={22} className="text-navy-900" />
                </div>
                <h3 className="font-heading font-bold text-navy-900 text-lg mb-2">Our Vision</h3>
                <p className="text-slate-600 leading-relaxed">
                  To achieve the number one position in the cable industry in terms of volume,
                  turnover, and quality within the Asian continent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Range */}
      <section className="section-py bg-white border-t border-slate-100">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="section-subtitle">What We Distribute</p>
            <h2 className="section-title">Our Product Range</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {productRange.map((item) => (
              <span
                key={item}
                className="badge bg-slate-100 text-slate-700 text-sm px-4 py-2"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-py bg-section-gradient">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="section-subtitle">Our Values</p>
            <h2 className="section-title">Why Choose Arihant Cables</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="card p-6 text-center hover-lift group">
                  <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-500 transition-colors">
                    <Icon size={24} className="text-primary-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-heading font-bold text-navy-900 mb-2">{v.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
