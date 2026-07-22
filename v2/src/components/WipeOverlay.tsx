"use client";

import { useRef } from "react";
import { gsap, useGSAP, reduced } from "@/lib/motion";

/**
 * WIPE OVERLAY — transizione tra pagine. Montato dentro template.tsx (che
 * rimonta a ogni navigazione), copre lo schermo di giallo con il marchio DLF
 * e si ritira verso l'alto rivelando la pagina. È un elemento fixed autonomo:
 * non avvolge il contenuto, quindi non crea containing block per i pin
 * ScrollTrigger. Reduce-motion: nessun sipario, pagina subito visibile.
 */
export function WipeOverlay() {
  const el = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!el.current) return;
    if (reduced()) {
      gsap.set(el.current, { autoAlpha: 0 });
      return;
    }
    const mark = el.current.querySelector(".wipe-mark");
    gsap
      .timeline()
      .set(el.current, { clipPath: "inset(0 0 0 0)", autoAlpha: 1 })
      .fromTo(mark, { yPercent: 30, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.3, ease: "power2.out" })
      .to(el.current, { clipPath: "inset(0 0 100% 0)", duration: 0.7, ease: "expo.inOut", delay: 0.12 })
      .set(el.current, { autoAlpha: 0 });
  }, []);

  return (
    <div ref={el} aria-hidden className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-giallo">
      <span className="wipe-mark t-poster text-7xl text-ink sm:text-9xl">DLF</span>
    </div>
  );
}
