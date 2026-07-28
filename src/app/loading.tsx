import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center gap-6">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-slate-100" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary-500 border-r-primary-500 animate-spin [animation-duration:1.1s]" />
        <div className="w-14 h-14 rounded-xl overflow-hidden shadow-cta animate-logo-pulse">
          <Image
            src="/brand/icon-mark.svg"
            alt="Arihant Cables"
            width={56}
            height={50}
            className="w-full h-full object-contain"
            priority
          />
        </div>
      </div>

      <div className="text-center">
        <p className="font-heading font-bold text-navy-950 text-sm tracking-[0.2em] uppercase">
          Arihant Cables
        </p>
        <p className="text-slate-400 text-xs mt-1">Loading, please wait...</p>
      </div>
    </div>
  );
}
