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
    },
    { scope: root },
  );

  return (
    <section ref={root} className="grain relative bg-carbon px-5 py-28 text-paper sm:px-8 sm:py-40">
      <p className="t-label text-giallo">Il manifesto</p>
      <p className="mt-8 max-w-5xl text-2xl font-medium leading-snug sm:text-4xl sm:leading-snug">
        {FRASE.split(" ").map((w, i) => (
          <span key={i} className="mf-w">{w} </span>
        ))}
      </p>
      <div className="mt-14 grid gap-6 sm:grid-cols-4">
        {[
          ["Affidabilità", "Concessionaria Caterpillar Compact Line Sicilia"],
          ["Ricambi originali", "Di tutte le marche, in stock"],
          ["Assistenza", "Personale qualificato e officina mobile"],
          ["Noleggio", "Mezzi industriali e attrezzature"],
        ].map(([t, d], i) => (
          <div key={t} className="border-t border-paper/20 pt-4">
            <span className="t-label text-paper/40">0{i + 1}</span>
            <h3 className="t-poster mt-2 text-2xl text-paper">{t}</h3>
            <p className="mt-2 text-sm text-paper/60">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
