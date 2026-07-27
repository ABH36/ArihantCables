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
  variant?: "default" | "compact";
  submitLabel?: string;
}

export default function InquiryForm({
  sourcePage = "/contact",
  productRef,
  variant = "default",
  submitLabel,
}: InquiryFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");
  const compact = variant === "compact";

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

  const inputClass = (hasError?: boolean) =>
    compact
      ? `w-full px-4 py-3 border-2 rounded-lg bg-white text-navy-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-sm ${
          hasError ? "border-red-400 bg-red-50" : "border-slate-300"
        }`
      : `w-full px-4 py-3 border rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm ${
          hasError ? "border-red-400 bg-red-50" : "border-slate-200"
        }`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" id="inquiry-form" noValidate>
      {status === "success" && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 animate-fade-in">
          <CheckCircle size={20} className="flex-shrink-0 mt-0.5" />
          <p className="text-sm font-medium">{serverMessage}</p>
        </div>
      )}

      {status === "error" && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 animate-fade-in">
          <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
          <p className="text-sm font-medium">{serverMessage}</p>
        </div>
      )}

      {/* Company Name + Full Name */}
      <div className={compact ? "grid sm:grid-cols-2 gap-4" : "space-y-4"}>
        <div>
          {!compact && (
            <label htmlFor="company" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Company Name
            </label>
          )}
          <input
            id="company"
            type="text"
            placeholder="Company Name"
            {...register("company")}
            className={inputClass()}
          />
        </div>

        <div>
          {!compact && (
            <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
          )}
          <input
            id="name"
            type="text"
            placeholder="Name"
            {...register("name")}
            className={inputClass(!!errors.name)}
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>
      </div>

      {/* Email & Phone side by side */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          {!compact && (
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
          )}
          <input
            id="email"
            type="email"
            placeholder={compact ? "Email Address" : "you@company.com"}
            {...register("email")}
            className={inputClass(!!errors.email)}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          {!compact && (
            <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Phone Number <span className="text-red-500">*</span>
            </label>
          )}
          <input
            id="phone"
            type="tel"
            placeholder={compact ? "Phone No" : "+91-XXXXXXXXXX"}
            {...register("phone")}
            className={inputClass(!!errors.phone)}
          />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
        </div>
      </div>

      {/* Message */}
      <div>
        {!compact && (
          <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Message <span className="text-red-500">*</span>
          </label>
        )}
        <textarea
          id="message"
          rows={compact ? 4 : 5}
          placeholder={compact ? "Message" : "Tell us about your requirements — product type, quantity, delivery location..."}
          {...register("message")}
          className={`${inputClass(!!errors.message)} resize-none`}
        />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className={`btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed ${
          compact ? "uppercase tracking-wide font-heading rounded-lg" : ""
        }`}
        id="submit-inquiry"
      >
        {status === "loading" ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Sending...
          </>
        ) : status === "success" ? (
          <>
            <CheckCircle size={18} /> Sent!
          </>
        ) : (
          <>
            <Send size={18} /> {submitLabel || "Send Message"}
          </>
        )}
      </button>
    </form>
  );
}
