"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap, useGSAP, reduced } from "@/lib/motion";

/**
 * CINEMATICA — banda full-bleed. L'immagine deriva in parallasse più lenta
 * dello scroll (profondità), il titolo si compone lettera per lettera e una
 * riga si divide orizzontalmente. Chip statistica che sale. Nessun pin.
 */
export function Cinematica() {
  const root = useRef<HTMLElement>(null);
  const line = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (reduced() || !root.current) return;

      // Parallasse immagine
      gsap.fromTo(
        ".cin-img",
        { yPercent: -12, scale: 1.15 },
        { yPercent: 12, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
      );

      // Riga titolo che sale da sotto (blocco, mantiene la parola gialla)
      if (line.current) {
        gsap.from(line.current, {
          yPercent: 120,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: { trigger: root.current, start: "top 65%", once: true },
        });
      }

      // Sottotitolo + chip
      gsap.from(".cin-rise", {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 55%", once: true },
      });

      // Deriva orizzontale della kicker-word col movimento
      gsap.fromTo(
        ".cin-drift",
        { xPercent: -8 },
        { xPercent: 8, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
      );
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative flex min-h-[92svh] items-center overflow-hidden bg-carbon text-paper">
      <div className="absolute inset-0">
        <Image src="/media/hero/dlf-movimento-terra.png" alt="" fill sizes="100vw" className="cin-img object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/40 to-carbon/70" />
      </div>

      <div className="grain absolute inset-0" />

      <div className="relative z-10 w-full px-5 py-24 sm:px-8">
        <p className="cin-rise t-label text-giallo">Dal 0 al cantiere</p>
        <h2 className="mt-4 max-w-6xl">
          <span className="cin-drift t-poster block text-6xl text-paper/40 sm:text-8xl">Non vendiamo</span>
          <span className="t-poster block overflow-hidden text-6xl sm:text-8xl">
            <span ref={line} className="block">macchine. Facciamo <span className="text-giallo">lavorare</span> le tue.</span>
          </span>
        </h2>

        <div className="mt-12 flex flex-wrap items-end gap-x-12 gap-y-8">
          <p className="cin-rise max-w-md text-lg leading-relaxed text-paper/70">
            Vendita, noleggio, assistenza mobile e ricambi originali: un solo partner che tiene i tuoi mezzi
            al lavoro, in tutta la Sicilia.
          </p>
          <div className="cin-rise flex gap-10">
            <div>
              <p className="t-poster text-5xl text-paper sm:text-6xl">24h</p>
              <p className="t-label mt-1 text-paper/60">Risposta al preventivo</p>
            </div>
            <div>
              <p className="t-poster text-5xl text-paper sm:text-6xl">9</p>
              <p className="t-label mt-1 text-paper/60">Province coperte</p>
            </div>
          </div>
          <Link href="/contatti" className="cin-rise t-label bg-giallo px-8 py-4 text-ink transition-colors hover:bg-paper">
            Parla con noi {"->"}
          </Link>
        </div>
      </div>
    </section>
  );
}
