"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, reduced, splitChars } from "@/lib/motion";

/**
 * OVERTURE — preloader contatore + hero.
 * Il sipario nero sale, il titolo poster entra carattere per carattere,
 * la foto del cantiere si rivela via clip-path, ticker infinito in basso.
 * Allo scroll: parallax immagine + titolo che scivola via (scrub).
 */
export function Overture() {
  const root = useRef<HTMLElement>(null);
  const veil = useRef<HTMLDivElement>(null);
  const pct = useRef<HTMLSpanElement>(null);
  const h1 = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!root.current) return;
      if (reduced()) {
        veil.current?.remove();
        return;
      }

      const chars = h1.current ? splitChars(h1.current) : [];
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // Contatore 0→100
      const n = { v: 0 };
      tl.to(n, {
        v: 100,
        duration: 1.4,
        ease: "power2.inOut",
        onUpdate: () => {
          if (pct.current) pct.current.textContent = String(Math.round(n.v)).padStart(3, "0");
        },
      })
        // Sipario sale
        .to(veil.current, { yPercent: -100, duration: 1, ease: "expo.inOut" })
        .set(veil.current, { display: "none" })
        // Foto: sipario laterale
        .fromTo(".ov-img", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "expo.inOut" }, "<10%")
        // Titolo: cascata caratteri
        .from(chars, { yPercent: 110, duration: 0.9, stagger: 0.02 }, "<25%")
        .from(".ov-meta", { opacity: 0, y: 18, stagger: 0.08, duration: 0.6 }, "<40%");

      // Scrub in uscita
      gsap.to(".ov-img-inner", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(h1.current, {
        yPercent: -30,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative min-h-[100svh] overflow-hidden bg-paper pt-24">
      {/* Preloader */}
      <div ref={veil} className="fixed inset-0 z-[60] flex items-end justify-between bg-carbon p-6 sm:p-10">
        <span className="t-label text-paper/50">DLF Macchine — dal cantiere, per il cantiere</span>
        <span className="t-poster text-7xl text-giallo sm:text-9xl"><span ref={pct}>000</span>%</span>
      </div>

      <div className="px-5 sm:px-8">
        <p className="ov-meta t-label prep text-ink-soft">Concessionaria Caterpillar & Dieci · Sicilia</p>
        <h1 ref={h1} className="t-poster prep mt-3 overflow-hidden text-[16.5vw] text-ink sm:text-[13vw]">
          Muoviamo la terra
        </h1>
      </div>

      <div className="ov-img relative mx-5 mt-6 aspect-[16/8] overflow-hidden sm:mx-8 sm:aspect-[16/6]">
        <div className="ov-img-inner absolute inset-[-8%]">
          <Image
            src="/media/hero/dlf-movimento-terra.png"
            alt="Macchine movimento terra DLF in cantiere"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <span className="t-label absolute bottom-3 left-4 bg-carbon/80 px-3 py-1.5 text-paper">Sicilia · dal cantiere, per il cantiere</span>
      </div>

      <div className="ov-meta prep mt-8 flex flex-wrap items-center justify-between gap-4 px-5 pb-8 sm:px-8">
        <p className="max-w-md text-sm leading-relaxed text-ink-soft">
          Vendita, noleggio, assistenza e ricambi per macchine movimento terra.
          Officina meccanica mobile, due sedi, un&apos;unica squadra.
        </p>
        <a href="#flotta" className="t-label marker px-2 py-1 text-ink">Scopri la flotta ↓</a>
      </div>

      {/* Ticker */}
      <div className="ticker overflow-hidden border-y border-ink/15 bg-paper py-3">
        <div className="ticker-track t-label gap-12 pr-12 text-ink-soft">
          {Array.from({ length: 2 }).flatMap((_, r) =>
            ["Vendita", "Noleggio", "Assistenza 24/7", "Ricambi originali", "Officina mobile", "Caterpillar", "Dieci"].map((w, i) => (
              <span key={`${r}-${i}`} className="flex items-center gap-12">
                {w} <span className="text-giallo-deep">●</span>
              </span>
            )),
          )}
        </div>
      </div>
    </section>
  );
}
