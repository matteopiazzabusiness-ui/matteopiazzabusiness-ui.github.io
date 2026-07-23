"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, reduced } from "@/lib/motion";

/** Scroll inerziale Lenis sincronizzato con ScrollTrigger. */
export function Smooth({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.add("gsap-on");
    if (reduced()) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });
    lenis.on("scroll", ScrollTrigger.update);
    // Hook per test/debug (Playwright): scroll programmatico coerente con Lenis
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    const raf = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
