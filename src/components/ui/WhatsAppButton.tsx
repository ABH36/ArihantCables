import Image from "next/image";
import { cldImage } from "@/lib/cloudinary";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919819898469?text=Hi%20Arihant%20Cables%2C%20I%27d%20like%20to%20enquire%20about%20your%20products."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="!fixed bottom-24 right-6 z-40 w-14 h-14 flex items-center justify-center rounded-full bg-[#25D366] overflow-hidden transition-transform duration-300 hover:scale-110 shadow-[0_6px_18px_-4px_rgba(37,211,102,0.6)]"
    >
      <Image
        src={cldImage("icons/icons8-whatsapp-logo-100.gif")}
        alt=""
        width={40}
        height={40}
        unoptimized
        className="w-10 h-10 object-contain"
      />
    </a>
  );
}
