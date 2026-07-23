"use client";

import { useRef } from "react";
import { gsap, useGSAP, reduced } from "@/lib/motion";

/**
 * HERO NUMERI — sezione a schermo pieno: contatori giganti che si animano
 * allo scroll su fondo carbone con velo atmosferico. Impatto e credibilità.
 */

const NUMERI = [
  { n: 2, suf: "", label: "Sedi in Sicilia", nota: "Caltanissetta e Catania" },
  { n: 9, suf: "", label: "Province servite", nota: "Copertura sull'intera isola" },
  { n: 80, suf: "+", label: "Modelli a catalogo", nota: "Caterpillar e Dieci" },
  { n: 4, suf: "", label: "Reparti, un tetto", nota: "Vendita · noleggio · assistenza · ricambi" },
];

const FILL = "/media/sequence/frame_058.jpg";

export function HeroNumeri() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!root.current) return;
      const items = root.current.querySelectorAll<HTMLElement>(".hn-v");

      if (reduced()) {
        items.forEach((el) => (el.textContent = `${el.dataset.n}${el.dataset.suf ?? ""}`));
        return;
      }

      // Atmosfera in parallasse
      gsap.fromTo(
        ".hn-atmo",
        { yPercent: -8, scale: 1.1 },
        { yPercent: 8, scale: 1.0, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
      );

      gsap.from(root.current.querySelectorAll(".hn-el"), {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 60%", once: true },
      });

      items.forEach((el) => {
        const target = Number(el.dataset.n);
        const suf = el.dataset.suf ?? "";
        const o = { v: 0 };
        gsap.to(o, {
          v: target,
          duration: 2,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
          onUpdate: () => (el.textContent = `${Math.round(o.v)}${suf}`),
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="grain relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-carbon px-5 py-24 text-paper sm:px-8">
      <div aria-hidden className="hn-atmo pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.12]" style={{ backgroundImage: `url(${FILL})` }} />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-carbon via-carbon/70 to-carbon" />

      <div className="relative z-10">
        <p className="hn-el t-label text-giallo">In numeri</p>
        <h2 className="hn-el t-poster mt-2 max-w-4xl text-5xl text-paper sm:text-7xl">
          Struttura vera, <span className="text-giallo">non promesse</span>
        </h2>

        <div className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {NUMERI.map((x) => (
            <div key={x.label} className="hn-el border-t-2 border-paper/25 pt-5">
              <p className="t-poster text-[18vw] leading-[0.85] text-paper sm:text-8xl lg:text-[7vw]">
                <span className="hn-v" data-n={x.n} data-suf={x.suf}>0</span>
              </p>
              <p className="mt-4 t-label text-giallo">{x.label}</p>
              <p className="mt-1 text-sm text-paper/60">{x.nota}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
