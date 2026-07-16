"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, reduced, splitChars } from "@/lib/motion";

/**
 * OVERTURE — preloader contatore + hero tipografico.
 * Niente immagini giganti (le foto sorgente sono piccole: ingrandite
 * diventano sfocate) — il colpo d'occhio è il titolo poster a tutta
 * larghezza, tre scatti nitidi a dimensione naturale, ticker.
 * Allo scroll il titolo scivola via e le card ruotano in parallax.
 */

const SCATTI = [
  { src: "/media/products/306-cr.jpeg", alt: "CAT 306 CR", cap: "CAT 306 CR — mini escavatore" },
  { src: "/media/products/dedalus-30-7-main.jpeg", alt: "Dieci Dedalus 30.7", cap: "Dedalus 30.7 — telescopico" },
  { src: "/media/products/299d3-xe.jpeg", alt: "CAT 299D3 XE", cap: "CAT 299D3 XE — minipala CTL" },
];

export function Overture() {
  const root = useRef<HTMLElement>(null);
  const veil = useRef<HTMLDivElement>(null);
  const pct = useRef<HTMLSpanElement>(null);
  const h1a = useRef<HTMLSpanElement>(null);
  const h1b = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!root.current) return;
      if (reduced()) {
        veil.current?.remove();
        return;
      }

      const chars = [
        ...(h1a.current ? splitChars(h1a.current) : []),
        ...(h1b.current ? splitChars(h1b.current) : []),
      ];
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      const n = { v: 0 };
      tl.to(n, {
        v: 100,
        duration: 1.3,
        ease: "power2.inOut",
        onUpdate: () => {
          if (pct.current) pct.current.textContent = String(Math.round(n.v)).padStart(3, "0");
        },
      })
        .to(veil.current, { yPercent: -100, duration: 0.9, ease: "expo.inOut" })
        .set(veil.current, { display: "none" })
        .from(chars, { yPercent: 112, duration: 0.9, stagger: 0.022 }, "<15%")
        .from(".ov-meta", { opacity: 0, y: 20, stagger: 0.09, duration: 0.6 }, "<35%")
        .from(".ov-card", { opacity: 0, y: 46, rotate: (i: number) => (i - 1) * 2.5, duration: 0.8, stagger: 0.1 }, "<20%");

      // Scrub uscita: titolo sale, card si aprono a ventaglio
      gsap.to(".ov-title", {
        yPercent: -26,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.utils.toArray<HTMLElement>(".ov-card").forEach((card, i) => {
        gsap.to(card, {
          yPercent: -10 - i * 8,
          rotate: (i - 1) * 4,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative min-h-[100svh] overflow-hidden bg-paper pt-24">
      {/* Preloader */}
      <div ref={veil} className="fixed inset-0 z-[60] flex items-end justify-between bg-carbon p-6 sm:p-10">
        <span className="t-label text-paper/70">DLF Macchine — dal cantiere, per il cantiere</span>
        <span className="t-poster text-7xl text-giallo sm:text-9xl"><span ref={pct}>000</span>%</span>
      </div>

      <div className="ov-title px-5 sm:px-8">
        <p className="ov-meta t-label prep text-ink-soft">Concessionaria Caterpillar & Dieci · Sicilia</p>
        <h1 className="t-poster prep mt-3 text-[15vw] text-ink sm:text-[11.5vw]">
          <span className="block overflow-hidden"><span ref={h1a} className="block">Muoviamo</span></span>
          <span className="block overflow-hidden"><span ref={h1b} className="block">la <span className="marker">terra</span></span></span>
        </h1>
      </div>

      <div className="ov-meta prep mt-6 flex flex-wrap items-start justify-between gap-6 px-5 sm:px-8">
        <p className="max-w-md text-base leading-relaxed text-ink-soft">
          Vendita, noleggio, assistenza e ricambi per macchine movimento terra.
          Officina meccanica mobile, due sedi, un&apos;unica squadra.
        </p>
        <a href="#flotta" className="t-label marker px-2 py-2 text-ink">Inizia il viaggio ↓</a>
      </div>

      {/* Tre scatti a dimensione naturale: nitidi, mai stirati */}
      <div className="mt-10 flex flex-wrap gap-5 px-5 pb-10 sm:px-8">
        {SCATTI.map((s, i) => (
          <figure key={s.src} className={`ov-card w-[46vw] max-w-[300px] ${i === 1 ? "sm:mt-8" : ""}`}>
            <div className="relative aspect-[4/3] overflow-hidden border border-ink/10 bg-white">
              <Image src={s.src} alt={s.alt} fill priority={i === 0} sizes="300px" className="object-cover" />
            </div>
            <figcaption className="t-label mt-2 text-ink-soft">{s.cap}</figcaption>
          </figure>
        ))}
      </div>

      {/* Ticker */}
      <div className="ticker overflow-hidden border-y border-ink/15 bg-paper py-3">
        <div className="ticker-track t-label gap-12 pr-12 text-ink-soft">
          {Array.from({ length: 2 }).flatMap((_, r) =>
            ["Vendita", "Noleggio", "Assistenza 24/7", "Ricambi originali", "Officina mobile", "Caterpillar", "Dieci"].map((w, i) => (
              <span key={`${r}-${i}`} className="flex items-center gap-12">
                {w} <span className="text-giallo-deep">●</span>
              </span>
            )),
          )}
        </div>
      </div>
    </section>
  );
}
