"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/useScrollGsap";

// Cursore custom con anello magnetico + stato hover su link/bottoni.
// Solo dispositivi con puntatore fine; nascosto su touch e reduced-motion.
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduce) return;

    document.documentElement.classList.add("has-cursor");
    const xTo = gsap.quickTo(ring.current, "x", { duration: 0.35, ease: "power3" });
    const yTo = gsap.quickTo(ring.current, "y", { duration: 0.35, ease: "power3" });
    const xDot = gsap.quickTo(dot.current, "x", { duration: 0.08, ease: "power2" });
    const yDot = gsap.quickTo(dot.current, "y", { duration: 0.08, ease: "power2" });

    const move = (e: MouseEvent) => {
      xTo(e.clientX); yTo(e.clientY);
      xDot(e.clientX); yDot(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest("a, button, [data-cursor]");
      gsap.to(ring.current, { scale: t ? 1.9 : 1, borderColor: t ? "var(--color-brand)" : "rgba(245,179,1,0.6)", duration: 0.3 });
      gsap.to(dot.current, { opacity: t ? 0 : 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <div className="cursor-layer pointer-events-none fixed inset-0 z-[95] hidden" aria-hidden>
      <div ref={ring} className="absolute -left-4 -top-4 h-8 w-8 rounded-full border-2" style={{ borderColor: "rgba(245,179,1,0.6)" }} />
      <div ref={dot} className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-brand" />
    </div>
  );
}
