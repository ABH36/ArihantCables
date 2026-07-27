"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { clientInquirySchema } from "@/lib/validation/inquiry";
import type { z } from "zod";

type InquiryFormData = z.infer<typeof clientInquirySchema>;

interface InquiryFormProps {
  sourcePage?: string;
  productRef?: string;
}

export default function InquiryForm({ sourcePage = "/contact", productRef }: InquiryFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(clientInquirySchema),
  });

  const onSubmit = async (data: InquiryFormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, sourcePage, productRef }),
      });
      const result = await res.json();
      if (result.success) {
        setStatus("success");
        setServerMessage(result.message);
        reset();
      } else {
        setStatus("error");
        setServerMessage(result.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setServerMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" id="inquiry-form" noValidate>
      {/* Success Message */}
      {status === "success" && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 animate-fade-in">
          <CheckCircle size={20} className="flex-shrink-0 mt-0.5" />
          <p className="text-sm font-medium">{serverMessage}</p>
        </div>
      )}

      {/* Error Message */}
      {status === "error" && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 animate-fade-in">
          <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
          <p className="text-sm font-medium">{serverMessage}</p>
        </div>
      )}

      {/* Company Name */}
      <div>
        <label htmlFor="company" className="block text-sm font-semibold text-slate-700 mb-1.5">
          Company Name
        </label>
        <input
          id="company"
          type="text"
          placeholder="Your company name (optional)"
          {...register("company")}
          className="w-full px-4 py-3 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm"
        />
      </div>

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1.5">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="Your full name"
          {...register("name")}
          className={`w-full px-4 py-3 border rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm ${
            errors.name ? "border-red-400 bg-red-50" : "border-slate-200"
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email & Phone side by side */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@company.com"
            {...register("email")}
            className={`w-full px-4 py-3 border rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm ${
              errors.email ? "border-red-400 bg-red-50" : "border-slate-200"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="+91-XXXXXXXXXX"
            {...register("phone")}
            className={`w-full px-4 py-3 border rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm ${
              errors.phone ? "border-red-400 bg-red-50" : "border-slate-200"
            }`}
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-1.5">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder="Tell us about your requirements — product type, quantity, delivery location..."
          {...register("message")}
          className={`w-full px-4 py-3 border rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm resize-none ${
            errors.message ? "border-red-400 bg-red-50" : "border-slate-200"
          }`}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
        id="submit-inquiry"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Sending...
          </>
        ) : status === "success" ? (
          <>
            <CheckCircle size={18} /> Inquiry Sent!
          </>
        ) : (
          <>
            <Send size={18} /> Send Message
          </>
        )}
      </button>
    </form>
  );
}
