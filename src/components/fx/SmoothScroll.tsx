"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/useScrollGsap";

// Scroll fluido con inerzia (feel premium) sincronizzato con GSAP ScrollTrigger.
// Disattivato se l'utente chiede reduced-motion.
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    // Ricalcola le posizioni dei pin quando cambia il layout (font/immagini caricati,
    // canvas pronti): evita gap bianchi e salti.
    const refresh = () => ScrollTrigger.refresh();
    const t1 = setTimeout(refresh, 300);
    const t2 = setTimeout(refresh, 1200);
    window.addEventListener("load", refresh);

    return () => {
      clearTimeout(t1); clearTimeout(t2);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
