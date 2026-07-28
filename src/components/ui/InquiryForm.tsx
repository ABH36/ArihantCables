"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle, AlertCircle, Loader2, User, Mail, Phone, MessageSquare } from "lucide-react";
import { clientInquirySchema } from "@/lib/validation/inquiry";
import type { z } from "zod";

type InquiryFormData = z.infer<typeof clientInquirySchema>;

interface InquiryFormProps {
  sourcePage?: string;
  productRef?: string;
  variant?: "default" | "compact";
  submitLabel?: string;
  stacked?: boolean;
}

export default function InquiryForm({
  sourcePage = "/contact",
  productRef,
  variant = "default",
  submitLabel,
  stacked = false,
}: InquiryFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");
  const compact = variant === "compact";
  const groupClass = stacked ? "space-y-4" : "grid sm:grid-cols-2 gap-4";

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
      ? `w-full px-4 py-3 ${stacked ? "pr-11" : ""} border-2 rounded-lg bg-white text-navy-950 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-sm ${
          hasError ? "border-red-400 bg-red-50" : "border-slate-300"
        }`
      : `w-full px-4 py-3 border rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm ${
          hasError ? "border-red-400 bg-red-50" : "border-slate-200"
        }`;

  const fieldIcon = (Icon: typeof User) =>
    stacked && (
      <Icon size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
    );

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
      <div className={compact ? groupClass : "space-y-4"}>
        <div>
          {!compact && (
            <label htmlFor="company" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Company Name
            </label>
          )}
          <div className="relative">
            <input
              id="company"
              type="text"
              placeholder="Company Name"
              {...register("company")}
              className={inputClass()}
            />
            {fieldIcon(User)}
          </div>
        </div>

        <div>
          {!compact && (
            <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
          )}
          <div className="relative">
            <input
              id="name"
              type="text"
              placeholder="Name"
              {...register("name")}
              className={inputClass(!!errors.name)}
            />
            {fieldIcon(User)}
          </div>
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>
      </div>

      {/* Email & Phone side by side */}
      <div className={groupClass}>
        <div>
          {!compact && (
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
          )}
          <div className="relative">
            <input
              id="email"
              type="email"
              placeholder={compact ? "Email Address" : "you@company.com"}
              {...register("email")}
              className={inputClass(!!errors.email)}
            />
            {fieldIcon(Mail)}
          </div>
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          {!compact && (
            <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Phone Number <span className="text-red-500">*</span>
            </label>
          )}
          <div className="relative">
            <input
              id="phone"
              type="tel"
              placeholder={compact ? "Phone No" : "+91-XXXXXXXXXX"}
              {...register("phone")}
              className={inputClass(!!errors.phone)}
            />
            {fieldIcon(Phone)}
          </div>
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
        <div className="relative">
          <textarea
            id="message"
            rows={compact ? 4 : 5}
            placeholder={compact ? "Message" : "Tell us about your requirements — product type, quantity, delivery location..."}
            {...register("message")}
            className={`${inputClass(!!errors.message)} resize-none`}
          />
          {stacked && (
            <MessageSquare
              size={16}
              className="absolute right-4 top-4 text-slate-400 pointer-events-none"
            />
          )}
        </div>
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className={`btn-primary disabled:opacity-60 disabled:cursor-not-allowed ${
          stacked
            ? "!bg-white !text-navy-950 hover:!text-white border-l-4 border-l-navy-950 !rounded-none !shadow-none w-fit px-8 uppercase tracking-wide font-heading"
            : `w-full justify-center ${compact ? "uppercase tracking-wide font-heading rounded-lg" : ""}`
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
