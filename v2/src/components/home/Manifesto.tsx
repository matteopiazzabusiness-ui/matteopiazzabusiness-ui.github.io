"use client";

import { useRef } from "react";
import { gsap, useGSAP, reduced } from "@/lib/motion";

const FRASE =
  "Una macchina ferma è un cantiere fermo. Per questo DLF non vende solo mezzi: li noleggia, li ripara ovunque siano, e tiene i ricambi in magazzino. Un solo partner, dal preventivo al post-vendita.";

/**
 * MANIFESTO — sezione carbone. La frase si accende parola per parola
 * legata allo scrollbar (scrub), come un evidenziatore che avanza.
 */
export function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reduced() || !root.current) return;
      gsap.fromTo(
        root.current.querySelectorAll(".mf-w"),
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.06,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top 70%", end: "bottom 60%", scrub: 0.6 },
        },
      );
      // Profondità: scritta fantasma sul fondo, deriva più lenta dello scroll
      gsap.fromTo(
        ".mf-ghost",
        { yPercent: 24 },
        {
          yPercent: -24,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
      // Le quattro colonne si presentano staggerate
      gsap.from(root.current.querySelectorAll(".mf-col"), {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: ".mf-cols", start: "top 80%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="grain relative overflow-hidden bg-carbon px-5 py-28 text-paper sm:px-8 sm:py-40">
      {/* Layer di profondità: enorme, dietro, quasi invisibile */}
      <span
        aria-hidden
        className="mf-ghost t-poster pointer-events-none absolute -right-8 top-1/2 -translate-y-1/2 select-none text-[38vw] leading-none text-paper/[0.03]"
      >
        DLF
      </span>
      <p className="t-label text-giallo">Il manifesto</p>
      <p className="mt-8 max-w-5xl text-2xl font-medium leading-snug sm:text-4xl sm:leading-snug">
        {FRASE.split(" ").map((w, i) => (
          <span key={i} className="mf-w">{w} </span>
        ))}
      </p>
      <div className="mf-cols mt-14 grid gap-6 sm:grid-cols-4">
        {[
          ["Affidabilità", "Concessionaria Caterpillar Compact Line Sicilia"],
          ["Ricambi originali", "Di tutte le marche, in stock"],
          ["Assistenza", "Personale qualificato e officina mobile"],
          ["Noleggio", "Mezzi industriali e attrezzature"],
        ].map(([t, d], i) => (
          <div key={t} className="mf-col border-t border-paper/20 pt-4">
            <span className="t-label text-paper/60">0{i + 1}</span>
            <h3 className="t-poster mt-2 text-2xl text-paper">{t}</h3>
            <p className="mt-2 text-sm text-paper/60">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
