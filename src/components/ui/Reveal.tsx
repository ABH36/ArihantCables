"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: string;
  className?: string;
  zoom?: boolean;
  style?: CSSProperties;
}

export default function Reveal({
  children,
  delay = "",
  className = "",
  zoom = false,
  style,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hidden = zoom ? "opacity-0 scale-95" : "opacity-0 translate-y-8";
  const shown = zoom ? "opacity-100 scale-100" : "opacity-100 translate-y-0";

  return (
    <div
      ref={ref}
      style={style}
      className={`transition-all duration-700 ease-out ${delay} ${inView ? shown : hidden} ${className}`}
    >
      {children}
    </div>
  );
}
