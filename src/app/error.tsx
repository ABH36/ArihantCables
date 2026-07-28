"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, Phone, RotateCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error boundary:", error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center section-py bg-white">
      <div className="section-container text-center max-w-lg">
        <span className="text-7xl font-heading font-black text-primary-500 block mb-4">
          Oops
        </span>
        <h1 className="text-2xl md:text-3xl font-heading font-bold text-navy-900 mb-4">
          Something Went Wrong
        </h1>
        <p className="text-slate-500 mb-8 leading-relaxed">
          We hit an unexpected error loading this page. Please try again, or head back home.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button type="button" onClick={reset} className="btn-primary">
            <RotateCw size={16} /> Try Again
          </button>
          <Link href="/" className="btn-secondary">
            <Home size={16} /> Back To Home
          </Link>
          <Link href="/contact" className="btn-secondary">
            <Phone size={16} /> Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
