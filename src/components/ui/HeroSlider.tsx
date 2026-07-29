"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Slide {
  src: string;
  alt: string;
}

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const [active, setActive] = useState(0);
  // The crossfade transition is only enabled after the first paint — applying
  // it immediately on the server-rendered first slide made Chrome treat the
  // LCP image as "still transitioning" and delay when it counted as painted
  // (measured ~2.1s of pure render delay on top of a ~200ms load time).
  const [transitionsReady, setTransitionsReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setTransitionsReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <div className="relative w-full aspect-[390/178.44] sm:aspect-[16/9] lg:aspect-[2500/988] overflow-hidden bg-navy-950 lg:-mt-24 z-10">
      {slides.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={i === 0}
          className={`object-cover ${transitionsReady ? "transition-opacity duration-1000" : ""} ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              aria-label={`Show slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === active ? "bg-[#fc6601] w-6" : "bg-white/70 hover:bg-white"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
