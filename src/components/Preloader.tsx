"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/useScrollGsap";

// Preloader brandizzato — mostrato una volta per sessione, poi esce con wipe.
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);

  useGSAP(
    () => {
      const seen = typeof sessionStorage !== "undefined" && sessionStorage.getItem("dlf_loaded");
      if (seen || prefersReducedMotion()) {
        setDone(true);
        return;
      }
      document.body.style.overflow = "hidden";

      const counter = { v: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("dlf_loaded", "1");
          document.body.style.overflow = "";
          setDone(true);
        },
      });

      tl.from(".pl-mark", { opacity: 0, y: 20, duration: 0.5, ease: "power3.out" })
        .to(counter, {
          v: 100, duration: 1.6, ease: "power2.inOut",
          onUpdate: () => setCount(Math.round(counter.v)),
        }, "<")
        .to(".pl-bar-fill", { scaleX: 1, duration: 1.6, ease: "power2.inOut" }, "<")
        .to(".pl-mark", { y: -10, opacity: 0, duration: 0.4, ease: "power2.in" }, "+=0.15")
        .to(".pl-panel", { yPercent: -100, duration: 0.7, ease: "expo.inOut", stagger: 0.08 }, "-=0.1")
        .set(root.current, { display: "none" });
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[100] flex items-center justify-center" aria-hidden>
      <div className="absolute inset-0 flex">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="pl-panel h-full flex-1 bg-graphite-950" />
        ))}
      </div>
      <div className="pl-mark relative text-center">
        <div className="font-display text-6xl font-extrabold tracking-tight text-white sm:text-8xl">
          DLF<span className="text-brand">.</span>
        </div>
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-white/40">Movimento terra · Sicilia</p>
        <div className="mx-auto mt-8 h-0.5 w-56 overflow-hidden rounded-full bg-white/10">
          <div className="pl-bar-fill h-full w-full origin-left scale-x-0 bg-brand" />
        </div>
        <div className="mt-3 font-display text-sm font-bold text-white/50">{count}%</div>
      </div>
    </div>
  );
}
