"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap, useGSAP, reduced } from "@/lib/motion";
import { categorie, prodottiByCategoria, type Categoria } from "@/lib/catalog";

/**
 * MOSAICO — le sei categorie in griglia editoriale asimmetrica. Ogni cella
 * si apre a sipario (clip-path) in cascata allo scroll; l'immagine ha un
 * lieve parallasse interno. Porta al catalogo filtrato. Nessun pin.
 */

const SPANS: Record<Categoria, string> = {
  escavatori: "sm:col-span-2 sm:row-span-2",
  "mini-escavatori": "",
  "minipale-cingolate": "",
  "minipale-gommate": "",
  "sollevatori-telescopici": "sm:col-span-2",
  "mini-agri": "",
};

export function Mosaico() {
  const root = useRef<HTMLElement>(null);
  const cats = Object.keys(categorie) as Categoria[];

  useGSAP(
    () => {
      if (reduced() || !root.current) return;
      gsap.utils.toArray<HTMLElement>(".mos-cell").forEach((cell) => {
        gsap.fromTo(
          cell,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 0.9,
            ease: "expo.out",
            scrollTrigger: { trigger: cell, start: "top 88%", once: true },
          },
        );
        const img = cell.querySelector(".mos-img");
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -8 },
            { yPercent: 8, ease: "none", scrollTrigger: { trigger: cell, start: "top bottom", end: "bottom top", scrub: true } },
          );
        }
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bg-paper px-5 py-24 sm:px-8 sm:py-32">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="t-label text-ink-soft">La gamma</p>
          <h2 className="t-poster mt-2 text-5xl text-ink sm:text-7xl">
            Sei famiglie, <span className="marker">un cantiere</span>
          </h2>
        </div>
        <Link href="/mezzi" className="t-label u-line text-ink-soft">Tutto il catalogo {"->"}</Link>
      </div>

      <div className="mt-12 grid auto-rows-[minmax(200px,1fr)] grid-cols-1 gap-4 sm:grid-cols-4">
        {cats.map((c, i) => {
          const primo = prodottiByCategoria(c)[0];
          const img = primo?.immagini[0];
          return (
            <Link
              key={c}
              href={`/mezzi?cat=${c}`}
              className={`mos-cell group relative overflow-hidden bg-carbon ${SPANS[c]}`}
            >
              {img && (
                <Image
                  src={img}
                  alt={categorie[c].label}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="mos-img scale-110 object-cover opacity-80 transition-all duration-700 group-hover:scale-125 group-hover:opacity-100"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-carbon/85 via-carbon/10 to-transparent" />
              <div className="relative flex h-full flex-col justify-between p-5 sm:p-6">
                <span className="t-label text-paper/70">{String(i + 1).padStart(2, "0")} · {categorie[c].brand}</span>
                <div>
                  <h3 className="t-poster text-3xl text-paper transition-colors group-hover:text-giallo sm:text-4xl">{categorie[c].label}</h3>
                  <span className="t-label mt-2 inline-block text-paper/60">{prodottiByCategoria(c).length} modelli {"->"}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
