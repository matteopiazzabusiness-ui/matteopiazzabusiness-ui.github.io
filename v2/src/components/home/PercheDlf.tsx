"use client";

import { useRef } from "react";
import { gsap, useGSAP, reduced } from "@/lib/motion";

const VOCI = [
  { t: "Un solo interlocutore", d: "Vendita, noleggio, assistenza e ricambi nella stessa azienda: nessun rimbalzo tra fornitori quando qualcosa non va." },
  { t: "Concessionaria ufficiale", d: "Caterpillar Compact Line e Dieci per la Sicilia: garanzia del costruttore, aggiornamenti e ricambi originali." },
  { t: "Officina che viaggia", d: "L'officina meccanica mobile raggiunge il mezzo in cantiere: meno trasporti, meno fermi macchina." },
  { t: "Persone con nome e cognome", d: "Un commerciale per la tua provincia, un responsabile post-vendita che conosce la tua flotta. Li trovi in Chi siamo, con telefono diretto." },
];

/**
 * PERCHÉ DLF — pannelli orizzontali che scivolano dentro dai lati
 * alternati mentre si scrolla; numerazione poster gigante.
 */
export function PercheDlf() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reduced() || !root.current) return;
      gsap.utils.toArray<HTMLElement>(".pd-row").forEach((row, i) => {
        gsap.from(row, {
          x: i % 2 === 0 ? -70 : 70,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 78%", toggleActions: "play none none reverse" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="overflow-hidden bg-paper-2 px-5 py-24 sm:px-8 sm:py-36">
      <p className="t-label text-ink-soft">Perché DLF</p>
      <h2 className="t-poster mt-2 text-5xl text-ink sm:text-7xl">
        Quello che un preventivo <span className="marker">non dice</span>
      </h2>

      <div className="mt-14 space-y-4">
        {VOCI.map((v, i) => (
          <div key={v.t} className="pd-row flex flex-wrap items-baseline gap-x-10 gap-y-3 border-t border-ink/15 py-7 sm:flex-nowrap">
            <span className="t-poster w-24 shrink-0 text-6xl text-giallo-deep sm:text-7xl">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="t-poster w-full max-w-sm text-3xl text-ink sm:text-4xl">{v.t}</h3>
            <p className="max-w-xl text-base leading-relaxed text-ink-soft">{v.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
