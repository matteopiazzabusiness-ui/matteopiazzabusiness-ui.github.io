"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP, reduced } from "@/lib/motion";

/**
 * HERO TERRA — hero a parola piena: "CANTIERE" è ritagliata sull'immagine del
 * frame al tramonto (background-clip: text), con parallasse verticale dello
 * sfondo dentro le lettere. Un layer atmosferico scuro dietro dà profondità.
 * Server-safe: senza JS resta leggibile.
 */

const FILL = "/media/sequence/frame_036.jpg";

export function HeroTerra() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reduced() || !root.current) return;
      // Parallasse dello sfondo dentro le lettere
      gsap.fromTo(
        ".ht-word",
        { backgroundPositionY: "20%" },
        { backgroundPositionY: "80%", ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
      );
      // Atmosfera dietro, in controparallasse
      gsap.fromTo(
        ".ht-atmo",
        { yPercent: -8, scale: 1.1 },
        { yPercent: 8, scale: 1.0, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
      );
      // Entrata di kicker/testo/CTA
      gsap.from(root.current.querySelectorAll(".ht-el"), {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 60%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="grain relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-carbon px-5 py-24 text-paper sm:px-8">
      {/* Atmosfera: stessa immagine, scurissima, dietro */}
      <div
        aria-hidden
        className="ht-atmo pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.14]"
        style={{ backgroundImage: `url(${FILL})` }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-carbon via-carbon/60 to-carbon/80" />

      <div className="relative z-10">
        <p className="ht-el t-label text-giallo">Dove lavori tu, arriviamo noi</p>

        <h2
          className="ht-word mt-4 bg-cover bg-center bg-clip-text text-[26vw] leading-[0.82] text-transparent [font-family:var(--font-poster)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]"
          style={{ backgroundImage: `url(${FILL})` }}
        >
          CANTIERE
        </h2>

        <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="ht-el max-w-md text-lg leading-relaxed text-paper/75">
            Vendita, noleggio, assistenza e ricambi in tutta la Sicilia. Un solo partner che tiene i tuoi
            mezzi al lavoro, dal primo scavo all&apos;ultimo carico.
          </p>
          <div className="ht-el flex flex-wrap gap-3">
            <Link href="/mezzi" className="t-label bg-giallo px-8 py-4 text-ink transition-colors hover:bg-paper">Trova il tuo mezzo {"->"}</Link>
            <Link href="/contatti" className="t-label border border-paper/40 px-8 py-4 text-paper transition-colors hover:bg-paper hover:text-ink">Parla con noi</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
