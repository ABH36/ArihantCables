import Link from "next/link";
import { ArrowLeft, Home, FileText, Phone } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center section-py bg-white">
      <div className="section-container text-center max-w-lg">
        <span className="text-7xl font-heading font-black text-primary-700 block mb-4">
          404
        </span>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-navy-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-slate-500 mb-8 leading-relaxed">
          The page you are looking for does not exist or has been moved. You can navigate back home
          or explore our Polycab cable categories below.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link href="/" className="btn-primary">
            <Home size={16} /> Back To Home
          </Link>
          <Link href="/contact" className="btn-secondary">
            <Phone size={16} /> Contact Us
          </Link>
        </div>

        <div className="border-t border-slate-100 pt-6">
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-3">
            Quick Links
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-600">
            <Link href="/products/wires" className="hover:text-primary-700 transition-colors">
              Polycab Wires
            </Link>
            <span>•</span>
            <Link href="/products/cables" className="hover:text-primary-700 transition-colors">
              Polycab Cables
            </Link>
            <span>•</span>
            <Link href="/pricelist" className="hover:text-primary-700 transition-colors">
              Pricelist
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
