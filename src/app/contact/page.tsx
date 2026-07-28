import type { Metadata } from "next";
import Image from "next/image";
import InquiryForm from "@/components/ui/InquiryForm";
import PageBanner from "@/components/ui/PageBanner";
import Reveal from "@/components/ui/Reveal";
import LocationCards from "@/components/ui/LocationCards";
import { cldImage } from "@/lib/cloudinary";

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

      {/* Keep In Touch */}
      <section className="section-py bg-white" id="inquiry">
        <div className="section-container">
          <Reveal className="text-center mb-12">
            <Image src={cldImage("brand/icon-mark.svg")} alt="" width={40} height={40} className="mx-auto mb-3" />
            <p className="section-subtitle">Keep In Touch</p>
            <h2 className="section-title max-w-2xl mx-auto">
              Please Do Not Hesitate To Contact Us
            </h2>
          </Reveal>

          {/* Form + Information split panel */}
          <Reveal
            delay="delay-150"
            className="grid lg:grid-cols-3 gap-0 max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-card-hover"
          >
            {/* Send Us A Message — orange panel */}
            <div className="lg:col-span-2 bg-primary-500 p-8 sm:p-10">
              <h3 className="text-2xl font-heading font-bold text-white mb-1">
                Send Us A Message
              </h3>
              <p className="text-white/80 text-sm mb-7">
                Feel some love, to see what we can do...
              </p>
              <InquiryForm sourcePage="/contact" variant="compact" stacked submitLabel="Send Message" />
            </div>

            {/* Information — dark panel */}
            <div className="bg-navy-950 p-8 sm:p-10 text-white">
              <h3 className="text-xl font-heading font-bold mb-6 uppercase text-white">Information</h3>
              <div className="space-y-6">
                <div className="pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center flex-shrink-0 p-1.5">
                      <Image src={cldImage("icons/icons8-call-100.png")} alt="" width={18} height={18} className="w-full h-full object-contain" />
                    </div>
                    <p className="font-semibold text-sm">Phone No:</p>
                  </div>
                  <a href="tel:+919819898469" className="text-white/80 hover:text-primary-400 transition-colors text-sm">
                    +91-9819898469
                  </a>
                </div>

                <div className="pb-6 border-b border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center flex-shrink-0 p-1.5">
                      <Image src={cldImage("icons/icons8-gmail-100.png")} alt="" width={18} height={18} className="w-full h-full object-contain" />
                    </div>
                    <p className="font-semibold text-sm">Email Address:</p>
                  </div>
                  <a
                    href="mailto:sales@arihantcables.com"
                    className="text-white/80 hover:text-primary-400 transition-colors text-sm break-all"
                  >
                    sales@arihantcables.com
                  </a>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center flex-shrink-0 p-1.5">
                      <Image src={cldImage("icons/icons8-google-maps-100.png")} alt="" width={18} height={18} className="w-full h-full object-contain" />
                    </div>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">
                    27, Shreenath Bhavan, 6/12 Picket X Road, Lohar Chawl, Mumbai – 400 002
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Map + Address cards — orange background image, cards overlapping the footer */}
      <section className="relative pt-16 md:pt-20 pb-0">
        <Image src={cldImage("homeenqurybackground.png")} alt="" fill className="object-cover" />

        <div className="section-container relative">
          <Reveal className="max-w-5xl mx-auto h-72 sm:h-96 w-full rounded-2xl overflow-hidden shadow-2xl mb-16 md:mb-20">
            <iframe
              title="Arihant Cables Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d482347.4024566663!2d72.55149878720063!3d19.180386731569573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce18eaaaaaab%3A0x7dfa50c5553fbf4a!2sArihant%20Cables!5e0!3m2!1sen!2sin!4v1717740097987!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>

          <LocationCards />
        </div>
      </section>
    </>
  );
}
