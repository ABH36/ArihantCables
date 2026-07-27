import type { Metadata } from "next";
import { Phone, Mail, MapPin, ExternalLink, Clock } from "lucide-react";
import InquiryForm from "@/components/ui/InquiryForm";
import PageBanner from "@/components/ui/PageBanner";

export const metadata: Metadata = {
  title: "Contact Us — Arihant Cables Mumbai",
  description:
    "Contact Arihant Cables — Authorised Distributors of Polycab Wires & Cables in Mumbai. Shop in Lohar Chawl, Warehouse in Bhiwandi. Call +91-9819898469 or email sales@arihantcables.com.",
  keywords: [
    "Arihant Cables contact",
    "Arihant Cables address",
    "Lohar Chawl cable shop",
    "Polycab distributor contact Mumbai",
    "Arihant Cables phone number",
  ],
};

export default function ContactPage() {
  return (
    <>
      <PageBanner title="Contact Us" crumb="Contact Us" />

      {/* Form + Direct Contact Cards Section */}
      <section className="section-py bg-white" id="inquiry">
        <div className="section-container">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left: Contact Form */}
            <div className="lg:col-span-7 bg-white p-8 rounded-2xl border border-slate-100 shadow-card">
              <h2 className="text-2xl font-heading font-bold text-navy-900 mb-2">
                Send Us A Message
              </h2>
              <p className="text-slate-500 text-sm mb-8">
                Fill out the form below and our sales team will get back to you promptly.
              </p>
              <InquiryForm sourcePage="/contact" />
            </div>

            {/* Right: Quick Direct Info */}
            <div className="lg:col-span-5 space-y-6">
              {/* Card 1: Fast Channels */}
              <div className="card p-6 bg-navy-900 text-white">
                <h3 className="text-xl font-heading font-bold mb-4">Direct Contact</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Phone size={18} className="text-accent-DEFAULT" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs">Mobile / WhatsApp</p>
                      <a href="tel:+919819898469" className="font-semibold text-white hover:text-accent-DEFAULT transition-colors">
                        +91-9819898469
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Mail size={18} className="text-accent-DEFAULT" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs">Email Address</p>
                      <a href="mailto:sales@arihantcables.com" className="font-semibold text-white hover:text-accent-DEFAULT transition-colors break-all">
                        sales@arihantcables.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Clock size={18} className="text-accent-DEFAULT" />
                    </div>
                    <div>
                      <p className="text-white/50 text-xs">Working Hours</p>
                      <p className="text-white/90 text-sm">Mon - Sat: 10:30 AM – 7:30 PM</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* GST / Trust Info */}
              <div className="card p-6 border-l-4 border-l-primary-500 bg-primary-50/50">
                <h4 className="font-heading font-bold text-navy-900 mb-1">Authorised Polycab Distributor</h4>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                  Serving industrial, commercial, and domestic cable requirements for over 30 years.
                </p>
                <p className="text-xs text-slate-500 font-mono">
                  GSTIN: <span className="font-bold text-navy-900">27AABFA3073E1ZW</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section (Shop & Godown) */}
      <section className="section-py bg-section-gradient border-t border-slate-100">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="section-subtitle">Our Locations</p>
            <h2 className="section-title">Shop &amp; Warehouse Addresses</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* SHOP LOCATION */}
            <div className="card overflow-hidden flex flex-col justify-between">
              <div className="p-8">
                <span className="badge-primary text-xs mb-3">Main Office &amp; Shop</span>
                <h3 className="text-2xl font-heading font-bold text-navy-900 mb-4">ARIHANT CABLES</h3>

                <div className="space-y-4 text-slate-600 text-sm">
                  <div className="flex gap-3">
                    <MapPin size={18} className="text-primary-500 flex-shrink-0 mt-1" />
                    <p className="leading-relaxed">
                      27, Shreenath Bhavan, 6/12 Picket X Road, Lohar Chawl, Mumbai – 400 002
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Phone size={18} className="text-primary-500 flex-shrink-0 mt-1" />
                    <div className="space-y-1">
                      <p>
                        <a href="tel:02222084443" className="hover:text-primary-500 transition-colors">022-22084443</a> /{" "}
                        <a href="tel:02222084447" className="hover:text-primary-500 transition-colors">22084447</a>
                      </p>
                      <p>
                        <a href="tel:02222084450" className="hover:text-primary-500 transition-colors">022-22084450</a> /{" "}
                        <a href="tel:02222069420" className="hover:text-primary-500 transition-colors">22069420</a>
                      </p>
                      <p>
                        <a href="tel:02222081673" className="hover:text-primary-500 transition-colors">022-22081673</a>{" "}
                        <span className="text-slate-400">(Intercom: *257 / *744)</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <a
                    href="https://maps.app.goo.gl/MGesV8scY7MJELeDA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-sm"
                  >
                    View On Google Maps <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              {/* Embed Map */}
              <div className="h-64 w-full bg-slate-100 relative">
                <iframe
                  title="Shop Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d482347.4024566663!2d72.55149878720063!3d19.180386731569573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce18eaaaaaab%3A0x7dfa50c5553fbf4a!2sArihant%20Cables!5e0!3m2!1sen!2sin!4v1717740097987!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* GODOWN LOCATION */}
            <div className="card overflow-hidden flex flex-col justify-between">
              <div className="p-8">
                <span className="badge bg-navy-900 text-white text-xs mb-3">Godown &amp; Dispatch Warehouse</span>
                <h3 className="text-2xl font-heading font-bold text-navy-900 mb-4">RAJ CABLE WAREHOUSE</h3>

                <div className="space-y-4 text-slate-600 text-sm">
                  <div className="flex gap-3">
                    <MapPin size={18} className="text-navy-900 flex-shrink-0 mt-1" />
                    <p className="leading-relaxed">
                      Haribhau Patil Compound, K-square Prakhyat Industrial Park, Opposite Urban Tadka Hotel,
                      Mumbai-Nashik Highway, Village Kurund, Padgha Bhiwandi – 421101
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Phone size={18} className="text-navy-900 flex-shrink-0 mt-1" />
                    <p>
                      <a href="tel:9702333505" className="hover:text-primary-500 transition-colors">9702333505</a> /{" "}
                      <a href="tel:9821155960" className="hover:text-primary-500 transition-colors">9821155960</a> /{" "}
                      <a href="tel:9930543276" className="hover:text-primary-500 transition-colors">9930543276</a>
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <a
                    href="https://maps.app.goo.gl/8Eyev7QJfC5JmEJU7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-sm"
                  >
                    View On Google Maps <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              {/* Embed Map */}
              <div className="h-64 w-full bg-slate-100 relative">
                <iframe
                  title="Godown Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.5359732152864!2d73.1554!3d19.3887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7968538c238b7%3A0xb3551528f8fa935f!2sPrakhyat%20Industrial%20Park!5e0!3m2!1sen!2sin!4v1717740097987!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
