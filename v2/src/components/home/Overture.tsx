"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP, reduced, splitChars } from "@/lib/motion";

/**
 * OVERTURE — preloader contatore + hero tipografico puro.
 * Niente foto (i mezzi sfilano già nel Rail): il colpo d'occhio è il
 * titolo poster gigante su "SICILIA" fantasma in outline, con uscita
 * cinetica allo scroll (le due righe si dividono in direzioni opposte,
 * il fantasma deriva più lento: tre piani di profondità).
 * In basso i quattro reparti come indice navigabile, poi il ticker.
 */

const REPARTI = [
  { href: "/mezzi", n: "01", label: "Vendita" },
  { href: "/noleggio", n: "02", label: "Noleggio" },
  { href: "/assistenza", n: "03", label: "Assistenza" },
  { href: "/ricambi", n: "04", label: "Ricambi" },
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
        // Gli elementi .prep nascono invisibili via CSS (html.gsap-on .prep):
        // vanno resi visibili PRIMA delle animazioni, altrimenti .from(opacity)
        // interpola 0→0 e il titolo resta bianco per sempre
        .set(".prep", { opacity: 1 }, "<")
        .from(chars, { yPercent: 112, duration: 0.9, stagger: 0.022 }, "<15%")
        .fromTo(".ov-bar", { scaleX: 0 }, { scaleX: 1, duration: 0.8, ease: "expo.inOut" }, "<45%")
        .fromTo(".ov-meta", { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.09, duration: 0.6 }, "<35%")
        .fromTo(
          ".ov-rep",
          { opacity: 0, y: 34 },
          { opacity: 1, y: 0, stagger: 0.08, duration: 0.7 },
          "<25%",
        );

      // Uscita cinetica: le due righe si dividono, il fantasma resta indietro
      const exit = { trigger: root.current, start: "top top", end: "bottom top", scrub: true } as const;
      gsap.to(".ov-l1", { xPercent: -9, opacity: 0.12, ease: "none", scrollTrigger: exit });
      gsap.to(".ov-l2", { xPercent: 9, opacity: 0.12, ease: "none", scrollTrigger: exit });
      gsap.to(".ov-ghost", { yPercent: 26, ease: "none", scrollTrigger: exit });
      gsap.to(".ov-tail", { yPercent: -40, opacity: 0, ease: "none", scrollTrigger: exit });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative flex min-h-[100svh] flex-col overflow-hidden bg-paper pt-24">
      {/* Preloader */}
      <div ref={veil} className="fixed inset-0 z-[60] flex items-end justify-between bg-carbon p-6 sm:p-10">
        <span className="t-label text-paper/70">DLF Macchine — dal cantiere, per il cantiere</span>
        <span className="t-poster text-7xl text-giallo sm:text-9xl"><span ref={pct}>000</span>%</span>
      </div>

      {/* Piano di fondo: SICILIA in outline, deriva più lenta dello scroll */}
      <span
        aria-hidden
        className="ov-ghost t-poster pointer-events-none absolute left-1/2 top-[30%] -translate-x-1/2 select-none whitespace-nowrap text-[19vw] leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(26,26,26,0.09)]"
      >
        SICILIA
      </span>

      <div className="relative px-5 sm:px-8">
        <p className="ov-meta t-label prep text-ink-soft">Concessionaria Caterpillar & Dieci · Sicilia</p>
        <h1 className="t-poster prep mt-3 text-[16vw] leading-[0.92] text-ink sm:text-[12.5vw]">
          <span className="ov-l1 block overflow-hidden"><span ref={h1a} className="block">Muoviamo</span></span>
          <span className="ov-l2 relative block overflow-hidden">
            {/* Evidenziatore: splitChars azzera il markup interno, quindi la
                barra vive dietro la riga e si rivela con scaleX */}
            <span aria-hidden className="ov-bar absolute bottom-[0.04em] left-0 h-[0.18em] w-[45%] origin-left bg-giallo" />
            <span ref={h1b} className="relative block">la terra</span>
          </span>
        </h1>
      </div>

      <div className="ov-meta prep relative mt-8 flex flex-wrap items-start justify-between gap-6 px-5 sm:px-8">
        <p className="max-w-md text-base leading-relaxed text-ink-soft">
          Vendita, noleggio, assistenza e ricambi per macchine movimento terra.
          Officina meccanica mobile, due sedi, un&apos;unica squadra.
        </p>
        <a href="#flotta" className="t-label marker px-2 py-2 text-ink">Inizia il viaggio ↓</a>
      </div>

      {/* Indice reparti: valore subito, niente foto ripetute */}
      <div className="ov-tail relative mt-auto grid grid-cols-2 gap-px border-t border-ink/15 bg-ink/10 pt-px lg:grid-cols-4">
        {REPARTI.map((r) => (
          <Link
            key={r.href}
            href={r.href}
            className="ov-rep group bg-paper px-5 py-6 transition-colors duration-300 hover:bg-carbon sm:px-8"
          >
            <span className="t-label text-giallo-deep transition-colors group-hover:text-giallo">{r.n}</span>
            <span className="t-poster mt-1 flex items-baseline justify-between text-3xl text-ink transition-colors group-hover:text-paper sm:text-4xl">
              {r.label}
              <span className="text-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">{"->"}</span>
            </span>
          </Link>
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
