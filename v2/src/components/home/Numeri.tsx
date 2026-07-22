"use client";

import { useRef } from "react";
import { gsap, useGSAP, reduced } from "@/lib/motion";

// Numeri reali dal catalogo/team scrappati dal sito ufficiale.
const NUMERI = [
  { n: 61, suf: "+", label: "Modelli a catalogo Caterpillar e Dieci" },
  { n: 20, suf: "", label: "Marchi e partner trattati" },
  { n: 17, suf: "+", label: "Professionisti tra sedi, officina e magazzini" },
  { n: 2, suf: "", label: "Sedi operative: Caltanissetta e Catania" },
];

/** NUMERI — contatori editoriali su carta, cifre poster giganti. */
export function Numeri() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!root.current) return;
      const items = root.current.querySelectorAll<HTMLElement>(".num-v");
      if (reduced()) {
        items.forEach((el) => (el.textContent = `${el.dataset.n}${el.dataset.suf}`));
        return;
      }
      items.forEach((el) => {
        const target = Number(el.dataset.n);
        const suf = el.dataset.suf ?? "";
        const o = { v: 0 };
        gsap.to(o, {
          v: target,
          duration: 1.8,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => (el.textContent = `${Math.round(o.v)}${suf}`),
        });
      });
      gsap.from(root.current.querySelectorAll(".num-item"), {
        opacity: 0,
        y: 32,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
      });
      // Profondità: le colonne salgono a velocità leggermente diverse
      root.current.querySelectorAll<HTMLElement>(".num-item").forEach((el, i) => {
        gsap.to(el, {
          y: -14 - (i % 2) * 18,
          ease: "none",
          scrollTrigger: { trigger: root.current!, start: "top bottom", end: "bottom top", scrub: 0.8 },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bg-paper px-5 py-24 sm:px-8 sm:py-32">
      <p className="t-label text-ink-soft">DLF in cifre</p>
      <h2 className="mt-2 max-w-3xl text-3xl font-medium leading-snug text-ink sm:text-4xl">
        Non un rivenditore qualunque: una <span className="marker">struttura vera</span> dietro ogni mezzo.
      </h2>
      <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {NUMERI.map((s) => (
          <div key={s.label} className="num-item border-t-2 border-ink pt-5">
            <p className="t-poster text-8xl text-ink sm:text-9xl">
              <span className="num-v" data-n={s.n} data-suf={s.suf}>0</span>
            </p>
            <p className="mt-3 max-w-[22ch] text-sm text-ink-soft">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
