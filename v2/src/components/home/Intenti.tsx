"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP, reduced } from "@/lib/motion";

const CARDS = [
  {
    href: "/mezzi",
    label: "Vendita",
    n: "01",
    testo: "Gamma completa Caterpillar e Dieci: escavatori, minipale, sollevatori telescopici. Nuovo con garanzia ufficiale.",
    img: "/media/products/306-cr.jpeg",
    bg: "bg-giallo",
    fg: "text-ink",
  },
  {
    href: "/noleggio",
    label: "Noleggio",
    n: "02",
    testo: "Mezzi industriali e attrezzature a breve e lungo termine. Consegna in cantiere, manutenzione inclusa.",
    img: "/media/services/noleggio.png",
    bg: "bg-carbon-700",
    fg: "text-paper",
  },
  {
    href: "/assistenza",
    label: "Assistenza",
    n: "03",
    testo: "Officina meccanica mobile e tecnici qualificati. Interveniamo dove sei tu, in tutta la Sicilia.",
    img: "/media/services/assistenza.png",
    bg: "bg-paper-2",
    fg: "text-ink",
  },
  {
    href: "/ricambi",
    label: "Ricambi",
    n: "04",
    testo: "Ricambi originali di tutte le marche, in stock nei magazzini di Caltanissetta e Catania.",
    img: "/media/team/magazzino-caltanissetta.jpg",
    bg: "bg-carbon",
    fg: "text-paper",
  },
];

/**
 * INTENTI — mazzo di carte impilate: ogni pannello si pinna e il successivo
 * lo copre salendo, con leggera scala/oscuramento del precedente.
 */
export function Intenti() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reduced() || !root.current) return;
      const panels = gsap.utils.toArray<HTMLElement>(".int-panel");
      panels.forEach((panel, i) => {
        if (i === panels.length - 1) return;
        // Il pannello resta fermo mentre il successivo lo copre.
        ScrollTrigger.create({
          trigger: panel,
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
        });
        gsap.to(panel, {
          scale: 0.94,
          opacity: 0.55,
          ease: "none",
          scrollTrigger: {
            trigger: panels[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative bg-carbon">
      <div className="px-5 pb-6 pt-24 sm:px-8">
        <p className="t-label text-giallo">Cosa facciamo</p>
        <h2 className="t-poster mt-2 max-w-3xl text-5xl text-paper sm:text-7xl">Quattro reparti, un partner</h2>
      </div>
      {CARDS.map((c) => (
        <Link
          key={c.href}
          href={c.href}
          className={`int-panel group relative flex min-h-[92svh] flex-col justify-between overflow-hidden ${c.bg} ${c.fg} px-5 py-10 will-change-transform sm:px-8`}
        >
          <div className="flex items-start justify-between gap-6">
            <h3 className="t-poster text-[15vw] leading-none sm:text-[10vw]">{c.label}</h3>
            <span className="t-label mt-4 shrink-0 opacity-60">{c.n} / 04</span>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <p className="max-w-md text-base leading-relaxed opacity-80 sm:text-lg">{c.testo}</p>
            <div className="relative aspect-[4/3] w-full max-w-sm overflow-hidden sm:w-[34vw]">
              <Image
                src={c.img}
                alt={c.label}
                fill
                sizes="(max-width: 640px) 100vw, 34vw"
                className="object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] group-hover:scale-105"
              />
            </div>
          </div>
          <span className="t-label absolute bottom-10 left-5 sm:left-8">
            <span className="u-line">Vai al reparto {"->"}</span>
          </span>
        </Link>
      ))}
    </section>
  );
}
