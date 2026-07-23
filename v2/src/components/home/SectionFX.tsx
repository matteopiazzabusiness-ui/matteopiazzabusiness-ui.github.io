"use client";

import { gsap, useGSAP, reduced } from "@/lib/motion";

/**
 * SECTION FX — transizioni tra sezioni: all'ingresso di ogni sezione un sipario
 * giallo la copre e si ritira con lo scroll (scrub), in direzioni alternate
 * (su/destra/giù/sinistra) per varietà. Iniettato via DOM come overlay
 * pointer-events-none. Salta la prima sezione e le pinnate (.flow-pinned),
 * che hanno già transizioni proprie. Reduce-motion: nessun sipario.
 */

// clip-path finale (sipario ritirato) per direzione
const HIDE = [
  "inset(0 0 100% 0)", // su
  "inset(0 0 0 100%)", // sinistra→ (si ritira verso destra)
  "inset(100% 0 0 0)", // giù
  "inset(0 100% 0 0)", // destra→ (si ritira verso sinistra)
];

export function SectionFX() {
  useGSAP(() => {
    if (reduced()) return;
    const secs = gsap.utils.toArray<HTMLElement>("main > section");
    const curtains: HTMLElement[] = [];

    secs.forEach((sec, i) => {
      if (i <= 1) return; // ScrollSequence + Overture hanno già le loro transizioni
      if (sec.classList.contains("flow-pinned")) return;

      const c = document.createElement("div");
      c.className = "fx-curtain";
      c.style.background = "var(--color-giallo)";
      c.style.clipPath = "inset(0 0 0 0)";
      sec.appendChild(c);
      curtains.push(c);

      gsap.to(c, {
        clipPath: HIDE[i % HIDE.length],
        ease: "power3.inOut",
        scrollTrigger: { trigger: sec, start: "top 88%", end: "top 32%", scrub: true },
      });
    });

    return () => curtains.forEach((c) => c.remove());
  }, []);

  return null;
}
