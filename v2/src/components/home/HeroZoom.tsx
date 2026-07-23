"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP, reduced } from "@/lib/motion";

/**
 * HERO ZOOM — dolly cinematico pinnato: scrollando si entra dentro l'immagine
 * (scala crescente) mentre il messaggio sale e poi sfuma in una velatura che
 * si collega alla sezione successiva. Reduce-motion: statica.
 */
export function HeroZoom() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reduced() || !root.current) return;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top top", end: "+=220%", pin: true, scrub: 0.6, anticipatePin: 1 },
      });
      tl.fromTo(".hz-bg", { scale: 1.05 }, { scale: 1.7, ease: "none" }, 0)
        .fromTo(".hz-l1", { yPercent: 70, opacity: 0 }, { yPercent: 0, opacity: 1, ease: "power3.out", duration: 0.4 }, 0.05)
        .fromTo(".hz-l2", { yPercent: 70, opacity: 0 }, { yPercent: 0, opacity: 1, ease: "power3.out", duration: 0.4 }, 0.15)
        .fromTo(".hz-cta", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3 }, 0.28)
        .to(".hz-copy", { opacity: 0, yPercent: -25, ease: "power2.in", duration: 0.35 }, 0.72)
        .fromTo(".hz-veil", { opacity: 0 }, { opacity: 1, ease: "none", duration: 0.28 }, 0.75);
    },
    { scope: root },
  );

  return (
    <section ref={root} className="flow-flat relative h-[100svh] overflow-hidden bg-carbon text-paper">
      <div className="hz-bg absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/media/sequence/frame_006.jpg)" }} aria-hidden />
      <div className="absolute inset-0 bg-carbon/45" aria-hidden />
      <div className="grain absolute inset-0" aria-hidden />

      <div className="hz-copy relative z-10 flex h-full flex-col items-center justify-center px-5 text-center">
        <p className="t-label text-giallo">Ogni lavoro, la sua macchina</p>
        <h2 className="t-poster mt-4 text-6xl leading-[0.88] sm:text-8xl">
          <span className="hz-l1 block">Ogni cantiere</span>
          <span className="hz-l2 block text-giallo">ha il suo mezzo</span>
        </h2>
        <Link href="/mezzi" className="hz-cta t-label mt-9 bg-giallo px-8 py-4 text-ink transition-colors hover:bg-paper">Trova il tuo {"->"}</Link>
      </div>

      <div className="hz-veil pointer-events-none absolute inset-0 z-20 bg-carbon opacity-0" aria-hidden />
    </section>
  );
}
