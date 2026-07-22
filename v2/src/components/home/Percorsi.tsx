"use client";

import Link from "next/link";
import { Reveal } from "@/components/Reveal";

/**
 * PERCORSI — router per intento, in linguaggio dell'utente. Subito dopo l'hero:
 * il visitatore si riconosce nella sua situazione e sa dove andare. Rende la
 * homepage comprensibile prima delle sezioni cinematiche più astratte.
 */

const PERCORSI = [
  {
    n: "01",
    situazione: "Devo comprare un mezzo",
    testo: "Nuovo o usato garantito, Caterpillar e Dieci. Con valutazione della permuta e leasing su misura.",
    punti: ["61+ modelli a catalogo", "Permuta e leasing"],
    cta: "Vedi il catalogo",
    href: "/mezzi",
  },
  {
    n: "02",
    situazione: "Mi serve solo per un lavoro",
    testo: "Noleggio breve o lungo termine, consegnato in cantiere in tutta la Sicilia, con manutenzione inclusa.",
    punti: ["Consegna in cantiere", "Manutenzione inclusa"],
    cta: "Scopri il noleggio",
    href: "/noleggio",
  },
  {
    n: "03",
    situazione: "Il mio mezzo è fermo",
    testo: "Officina meccanica mobile che raggiunge il cantiere ovunque in Sicilia. Tecnici qualificati su tutte le marche.",
    punti: ["Officina mobile", "Su tutte le marche"],
    cta: "Chiedi assistenza",
    href: "/assistenza",
  },
  {
    n: "04",
    situazione: "Cerco un ricambio",
    testo: "Ricambi originali di tutte le marche, in stock nei due magazzini. Ti diciamo il codice esatto dal numero di serie.",
    punti: ["Originali a stock", "Spedizione rapida"],
    cta: "Trova il ricambio",
    href: "/ricambi",
  },
];

export function Percorsi() {
  return (
    <Reveal as="section" className="bg-paper px-5 py-24 sm:px-8 sm:py-32">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="rv t-label text-ink-soft">Come possiamo aiutarti</p>
          <h2 className="rv t-poster mt-2 max-w-2xl text-5xl text-ink sm:text-7xl">Da dove vuoi partire?</h2>
        </div>
        <p className="rv max-w-xs text-sm leading-relaxed text-ink-soft">
          Scegli la tua situazione: ti portiamo dritto a quello che ti serve.
        </p>
      </div>

      <div className="mt-12 grid gap-px border border-ink/15 bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
        {PERCORSI.map((p) => (
          <Link key={p.href} href={p.href} className="rv group flex flex-col bg-paper p-6 transition-colors duration-300 hover:bg-carbon">
            <span className="t-label text-giallo-deep transition-colors group-hover:text-giallo">{p.n}</span>
            <h3 className="t-poster mt-3 text-3xl leading-[0.95] text-ink transition-colors group-hover:text-paper">{p.situazione}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft transition-colors group-hover:text-paper/70">{p.testo}</p>
            <ul className="mt-4 space-y-1">
              {p.punti.map((pt) => (
                <li key={pt} className="t-label flex items-center gap-2 text-ink-soft transition-colors group-hover:text-paper/60">
                  <span className="text-giallo-deep transition-colors group-hover:text-giallo">—</span>{pt}
                </li>
              ))}
            </ul>
            <span className="t-label mt-6 flex items-center gap-2 text-ink transition-colors group-hover:text-giallo">
              {p.cta} <span className="transition-transform duration-300 group-hover:translate-x-1">{"->"}</span>
            </span>
          </Link>
        ))}
      </div>

      <div className="rv mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ink/15 pt-6">
        <p className="text-sm text-ink-soft">Non sai cosa ti serve? Raccontaci il lavoro, pensiamo noi al resto.</p>
        <Link href="/contatti" className="t-label u-line text-ink">Parla con noi {"->"}</Link>
        <Link href="/settori" className="t-label u-line text-ink-soft">Oppure parti dal tuo settore {"->"}</Link>
      </div>
    </Reveal>
  );
}
