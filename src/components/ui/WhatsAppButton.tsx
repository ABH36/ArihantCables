import Image from "next/image";
import { cldImage } from "@/lib/cloudinary";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919819898469?text=Hi%20Arihant%20Cables%2C%20I%27d%20like%20to%20enquire%20about%20your%20products."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="btn-primary !fixed bottom-24 right-6 z-40 !w-14 !h-14 !p-0 !rounded-full justify-center !bg-white !shadow-[0_6px_18px_-4px_rgba(37,211,102,0.6)]"
    >
      <Image
        src={cldImage("icons/icons8-whatsapp-transparent.png")}
        alt=""
        width={32}
        height={32}
        className="w-8 h-8 object-contain relative z-10"
      />
    </a>
  );
}
