"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, reduced } from "@/lib/motion";

/** Scroll inerziale Lenis sincronizzato con ScrollTrigger. */
export function Smooth({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.add("gsap-on");
    if (reduced()) return;

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1.05 });
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
