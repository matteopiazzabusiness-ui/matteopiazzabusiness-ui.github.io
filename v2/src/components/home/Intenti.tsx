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
    punti: ["61+ modelli a catalogo", "Garanzia ufficiale CAT e Dieci", "Valutazione e permuta dell'usato"],
    img: "/media/products/306-cr.jpeg",
    bg: "bg-giallo",
    fg: "text-ink",
    line: "border-ink/15",
  },
  {
    href: "/noleggio",
    label: "Noleggio",
    n: "02",
    testo: "Mezzi industriali e attrezzature a breve e lungo termine. Consegna in cantiere, manutenzione inclusa.",
    punti: ["Breve e lungo termine", "Consegna in cantiere in tutta la Sicilia", "Manutenzione sempre inclusa"],
    img: "/media/products/dedalus-30-7-main.jpeg",
    bg: "bg-carbon-700",
    fg: "text-paper",
    line: "border-paper/15",
  },
  {
    href: "/assistenza",
    label: "Assistenza",
    n: "03",
    testo: "Officina meccanica mobile e tecnici qualificati. Interveniamo dove sei tu, in tutta la Sicilia.",
    punti: ["Officina meccanica mobile", "Tecnici qualificati CAT e Dieci", "In sede o direttamente in cantiere"],
    img: "/media/team/officina-caltanissetta.jpg",
    bg: "bg-paper-2",
    fg: "text-ink",
    line: "border-ink/15",
  },
  {
    href: "/ricambi",
    label: "Ricambi",
    n: "04",
    testo: "Ricambi originali di tutte le marche, in stock nei magazzini di Caltanissetta e Catania.",
    punti: ["Originali di tutte le marche", "In stock a Caltanissetta e Catania", "Ordini e spedizioni rapide"],
    img: "/media/team/magazzino-caltanissetta.jpg",
    bg: "bg-carbon",
    fg: "text-paper",
    line: "border-paper/15",
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
        // Reveal del corpo: testo, punti e foto salgono staggerati all'ingresso
        gsap.from(panel.querySelectorAll(".int-reveal"), {
          opacity: 0,
          y: 36,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: panel, start: "top 62%", once: true },
        });
        // Profondità: la foto scorre più lenta del pannello che la contiene
        const img = panel.querySelector(".int-img");
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: "none",
              scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        }
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
          className={`int-panel group relative flex min-h-[92svh] flex-col overflow-hidden ${c.bg} ${c.fg} px-5 py-10 will-change-transform sm:px-8`}
        >
          <div className="flex items-start justify-between gap-6">
            <h3 className="t-poster text-[15vw] leading-none sm:text-[10vw]">{c.label}</h3>
            <span className="t-label mt-4 shrink-0 opacity-60">{c.n} / 04</span>
          </div>
          {/* Corpo pieno: testo + punti a sinistra, foto grande a destra */}
          <div className="mt-8 grid flex-1 items-stretch gap-8 sm:grid-cols-2 sm:gap-12">
            <div className="flex flex-col justify-between gap-8">
              <div>
                <p className="int-reveal max-w-md text-lg leading-relaxed opacity-85 sm:text-xl">{c.testo}</p>
                <ul className="mt-8 max-w-md">
                  {c.punti.map((p, i) => (
                    <li key={p} className={`int-reveal flex items-baseline gap-4 border-t ${c.line} py-3`}>
                      <span className="t-label shrink-0 opacity-50">0{i + 1}</span>
                      <span className="text-base sm:text-lg">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <span className="int-reveal t-label">
                <span className="u-line">Vai al reparto {"->"}</span>
              </span>
            </div>
            <div className="int-reveal relative min-h-[38svh] overflow-hidden sm:min-h-0">
              <Image
                src={c.img}
                alt={c.label}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="int-img scale-[1.18] object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] group-hover:scale-[1.24]"
              />
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}
