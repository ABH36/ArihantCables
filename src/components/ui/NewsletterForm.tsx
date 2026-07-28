"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  if (subscribed) {
    return (
      <div className="flex items-center gap-2 text-primary-400 font-medium text-sm">
        <CheckCircle size={18} />
        Thanks for subscribing!
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-md gap-3">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address"
        className="flex-1 min-w-0 px-4 py-3 rounded-lg bg-white/5 border border-white/15 text-white placeholder:text-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-colors"
      />
      <button
        type="submit"
        className="btn-primary !rounded-lg text-sm uppercase tracking-wide font-heading flex-shrink-0"
      >
        Subscribe <Send size={15} />
      </button>
    </form>
  );
}
