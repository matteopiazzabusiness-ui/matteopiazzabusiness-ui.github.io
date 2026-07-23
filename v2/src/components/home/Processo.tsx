"use client";

import { useRef } from "react";
import { gsap, useGSAP, reduced } from "@/lib/motion";

const FASI = [
  { n: "01", t: "Ci racconti il cantiere", d: "Telefono, WhatsApp o form: ci dici che lavoro devi fare, dove e per quanto tempo. Ti rispondiamo in giornata lavorativa.", tag: "Giorno 0" },
  { n: "02", t: "Ti proponiamo il mezzo", d: "Acquisto o noleggio, nuovo o usato: il commerciale della tua provincia ti propone la macchina giusta, con preventivo scritto.", tag: "Entro 24h" },
  { n: "03", t: "Consegniamo dove serve", d: "Portiamo il mezzo in cantiere in tutta la Sicilia, collaudato e pronto a lavorare. Formazione operatore inclusa se serve.", tag: "Data concordata" },
  { n: "04", t: "Non ti lasciamo solo", d: "Officina mobile, ricambi in stock, manutenzione programmata. Se qualcosa si ferma, riparte in fretta.", tag: "Per sempre" },
];

/**
 * PROCESSO — timeline verticale: il filo giallo si disegna con lo scroll,
 * ogni fase si accende quando il filo la raggiunge.
 */
export function Processo() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reduced() || !root.current) return;
      gsap.fromTo(".pr-line", { scaleY: 0 }, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: ".pr-track", start: "top 70%", end: "bottom 55%", scrub: 0.5 },
      });
      gsap.utils.toArray<HTMLElement>(".pr-fase").forEach((el) => {
        gsap.from(el, {
          opacity: 0.18,
          x: -22,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 62%", toggleActions: "play none none reverse" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="flow-flat bg-paper px-5 py-24 sm:px-8 sm:py-36">
      <p className="t-label text-ink-soft">Come lavoriamo</p>
      <h2 className="t-poster mt-2 max-w-3xl text-5xl text-ink sm:text-7xl">
        Dal primo contatto <span className="marker">al cantiere</span>
      </h2>

      <div className="pr-track relative mt-16 sm:mt-20">
        {/* Filo che si disegna */}
        <div className="absolute bottom-0 left-[7px] top-0 w-px bg-ink/15 sm:left-[9px]" aria-hidden />
        <div className="pr-line absolute bottom-0 left-[7px] top-0 w-[3px] origin-top bg-giallo sm:left-[9px]" aria-hidden />

        <ol className="space-y-16 sm:space-y-24">
          {FASI.map((f) => (
            <li key={f.n} className="pr-fase relative grid gap-3 pl-10 sm:grid-cols-[8rem_1fr_auto] sm:gap-10 sm:pl-16">
              <span className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-2 border-giallo bg-paper sm:h-5 sm:w-5" aria-hidden />
              <span className="t-poster text-5xl text-paper-3 sm:text-7xl">{f.n}</span>
              <div className="max-w-xl">
                <h3 className="t-poster text-3xl text-ink sm:text-4xl">{f.t}</h3>
                <p className="mt-3 text-base leading-relaxed text-ink-soft">{f.d}</p>
              </div>
              <span className="t-label h-fit bg-carbon px-3 py-2 text-paper">{f.tag}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
