"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap, useGSAP, reduced } from "@/lib/motion";

/**
 * HERO PARALLAX — scena a strati con profondità: sfondo terreno lento, parola
 * outline gigante media, mezzo in primo piano veloce, copy in controparallasse.
 * Non pinnata: partecipa al flow di sovrapposizione. Reduce-motion: statica.
 */
export function HeroParallax() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reduced() || !root.current) return;
      const st = (sel: string, from: number, to: number) =>
        gsap.fromTo(sel, { yPercent: from }, { yPercent: to, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } });
      st(".hp-bg", -12, 12);
      st(".hp-word", 18, -18);
      st(".hp-machine", 32, -32);
      st(".hp-copy", 8, -8);
      gsap.from(root.current.querySelectorAll(".hp-el"), {
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 60%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative flex min-h-[100svh] items-center overflow-hidden bg-carbon text-paper">
      <div className="hp-bg absolute inset-0 bg-cover bg-center opacity-[0.16]" style={{ backgroundImage: "url(/media/sequence/frame_066.jpg)" }} aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/60 to-carbon/80" aria-hidden />
      <div className="grain absolute inset-0" aria-hidden />

      {/* Parola outline gigante */}
      <span aria-hidden className="hp-word t-poster pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[26vw] leading-none text-transparent [-webkit-text-stroke:2px_rgba(244,241,236,0.14)]">
        POTENZA
      </span>

      {/* Mezzo in primo piano */}
      <div className="hp-machine pointer-events-none absolute -right-[6%] bottom-0 z-[1] hidden w-[52%] lg:block">
        <div className="relative aspect-[16/11]">
          <Image src="/media/products/317.jpeg" alt="" fill sizes="52vw" className="object-contain object-bottom" />
        </div>
      </div>

      {/* Copy */}
      <div className="hp-copy relative z-10 w-full px-5 sm:px-8">
        <p className="hp-el t-label text-giallo">In movimento</p>
        <h2 className="hp-el t-poster mt-3 max-w-3xl text-6xl leading-[0.9] text-paper sm:text-8xl">
          Potenza e affidabilità, <span className="text-giallo">in movimento</span>
        </h2>
        <p className="hp-el mt-6 max-w-md text-lg leading-relaxed text-paper/75">
          Mezzi Caterpillar e Dieci pronti al lavoro, con l&apos;assistenza che li tiene sempre operativi.
        </p>
        <div className="hp-el mt-8 flex flex-wrap gap-3">
          <Link href="/mezzi" className="t-label bg-giallo px-8 py-4 text-ink transition-colors hover:bg-paper">Scopri la gamma {"->"}</Link>
          <Link href="/noleggio" className="t-label border border-paper/40 px-8 py-4 text-paper transition-colors hover:bg-paper hover:text-ink">Noleggia ora</Link>
        </div>
      </div>
    </section>
  );
}
