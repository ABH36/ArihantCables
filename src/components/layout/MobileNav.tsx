"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X, Phone, Mail, ChevronRight } from "lucide-react";

interface NavChild {
  label: string;
  href: string;
}

interface NavLink {
  label: string;
  href: string;
  children?: NavChild[];
}

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
}

export default function MobileNav({ isOpen, onClose, navLinks }: MobileNavProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white z-50 shadow-2xl 
                    transition-transform duration-300 ease-in-out flex flex-col lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-navy-900">
          <div className="flex flex-col leading-none">
            <span className="text-xl font-heading font-black text-white tracking-tight">ARIHANT</span>
            <span className="text-xs font-semibold text-accent-DEFAULT uppercase tracking-[0.2em]">Cables</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close mobile menu"
            id="mobile-menu-close"
          >
            <X size={22} />
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto py-4" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <div key={link.label}>
              {link.children ? (
                <div>
                  <p className="px-6 py-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {link.label}
                  </p>
                  {link.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      onClick={onClose}
                      className="flex items-center justify-between px-6 py-3 text-slate-700 font-medium hover:bg-primary-50 hover:text-primary-600 transition-colors"
                    >
                      <span className="pl-2">{child.label}</span>
                      <ChevronRight size={16} className="text-slate-400" />
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="flex items-center justify-between px-6 py-3.5 text-slate-700 font-semibold hover:bg-primary-50 hover:text-primary-600 border-b border-slate-50 transition-colors"
                >
                  {link.label}
                  <ChevronRight size={16} className="text-slate-400" />
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Contact Info Footer */}
        <div className="border-t border-slate-100 p-6 bg-slate-50 space-y-3">
          <a
            href="tel:+919819898469"
            className="flex items-center gap-3 text-slate-700 hover:text-primary-500 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
              <Phone size={14} className="text-primary-500" />
            </div>
            <span className="font-medium text-sm">+91-9819898469</span>
          </a>
          <a
            href="mailto:sales@arihantcables.com"
            className="flex items-center gap-3 text-slate-700 hover:text-primary-500 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
              <Mail size={14} className="text-primary-500" />
            </div>
            <span className="font-medium text-sm">sales@arihantcables.com</span>
          </a>
          <Link
            href="/contact#inquiry"
            onClick={onClose}
            className="btn-primary w-full justify-center mt-4 text-sm"
            id="mobile-get-in-touch"
          >
            Get In Touch
          </Link>
        </div>
      </div>
    </>
  );
}
