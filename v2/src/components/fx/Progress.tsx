"use client";

import { useRef } from "react";
import { gsap, useGSAP, reduced } from "@/lib/motion";

/** Barra di avanzamento lettura — filo giallo in cima, legato allo scroll. */
export function Progress() {
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (reduced() || !bar.current) return;
    gsap.to(bar.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
    });
  });

  return (
    <div
      ref={bar}
      aria-hidden
      className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left scale-x-0 bg-giallo"
    />
  );
}
