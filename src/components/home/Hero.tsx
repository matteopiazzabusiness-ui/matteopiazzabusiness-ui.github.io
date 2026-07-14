"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/useScrollGsap";
import { Container } from "@/components/ui";

const headline = ["Movimenti", "la terra.", "Noi muoviamo", "il resto."];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = prefersReducedMotion();
      // Stato iniziale impostato via GSAP (layout effect → nessun flash).
      // Se JS è assente, il contenuto resta visibile (nessun opacity:0 in CSS).
      if (reduce) return;

      gsap.set(".hero-line", { yPercent: 120 });
      gsap.set([".hero-eyebrow", ".hero-sub", ".hero-cta", ".hero-badge"], { opacity: 0, y: 24 });
      gsap.set(".hero-visual", { opacity: 0, scale: 1.08, xPercent: 4 });

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.to(".hero-visual", { opacity: 1, scale: 1, xPercent: 0, duration: 1.4 })
        .to(".hero-eyebrow", { opacity: 1, y: 0, duration: 0.6 }, 0.2)
        .to(".hero-line", { yPercent: 0, duration: 1.1, stagger: 0.1 }, 0.3)
        .to(".hero-sub", { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
        .to(".hero-cta", { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, "-=0.5")
        .to(".hero-badge", { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, "-=0.5")
        .to(".hero-scrollcue", { opacity: 1, duration: 0.6 }, "-=0.2");

      // Parallax
      const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true } as const;
      gsap.to(".hero-grid", { yPercent: 25, ease: "none", scrollTrigger: st });
      gsap.to(".hero-glow", { yPercent: 50, ease: "none", scrollTrigger: st });
      gsap.to(".hero-visual", { yPercent: 12, ease: "none", scrollTrigger: st });
      gsap.to(".hero-copy", { yPercent: 22, opacity: 0.5, ease: "none", scrollTrigger: st });
      gsap.to(".hero-glow", { opacity: 0.6, scale: 1.15, duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1 });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="noise relative flex min-h-[100svh] items-center overflow-hidden bg-graphite-950 text-white">
      <div className="hero-grid bg-grid absolute inset-0 -top-1/4 h-[150%]" aria-hidden />
      <div className="hero-glow pointer-events-none absolute right-0 top-1/4 h-[40rem] w-[40rem] translate-x-1/4 rounded-full bg-brand/25 blur-[130px]" aria-hidden />

      {/* Visual: mezzo reale a tutta altezza sul lato destro */}
      <div className="hero-visual pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] lg:block" aria-hidden>
        <div className="relative h-full w-full">
          <Image src="/media/products/dedalus-30-7-main.jpeg" alt="" fill priority sizes="60vw" className="object-cover object-left" />
          <div className="absolute inset-0 bg-gradient-to-r from-graphite-950 via-graphite-950/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-transparent to-graphite-950/40" />
        </div>
      </div>

      <Container className="hero-copy relative z-10 py-28">
        <span className="hero-eyebrow inline-flex w-max items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand" /> Movimento terra · Sicilia
        </span>

        <h1 className="mt-6 font-display text-[15vw] font-extrabold leading-[0.9] sm:text-7xl lg:text-8xl">
          {headline.map((l, i) => (
            <span key={l} className="block overflow-hidden pb-[0.05em]">
              <span className={`hero-line block ${i % 2 === 1 ? "text-brand" : "text-white"}`}>{l}</span>
            </span>
          ))}
        </h1>

        <p className="hero-sub mt-8 max-w-md text-lg text-white/70">
          Concessionaria Caterpillar e Dieci. Vendita, noleggio, assistenza e ricambi con un unico partner.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/mezzi" className="hero-cta glow-brand inline-flex min-h-[56px] items-center gap-2 rounded-md bg-brand px-8 font-bold text-brand-ink transition-transform duration-200 hover:scale-[1.03]">
            Sfoglia i mezzi →
          </Link>
          <Link href="/contatti?intento=preventivo" className="hero-cta inline-flex min-h-[56px] items-center rounded-md border border-white/25 px-8 font-semibold text-white backdrop-blur transition-colors duration-200 hover:bg-white hover:text-ink">
            Richiedi preventivo
          </Link>
        </div>

        <div className="mt-16 flex flex-wrap gap-3">
          {[
            ["Caterpillar", "Concessionaria autorizzata"],
            ["Dieci", "Sollevatori telescopici"],
            ["2 sedi", "Copertura Sicilia"],
          ].map(([t, s]) => (
            <div key={t} className="hero-badge rounded-lg border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
              <p className="font-display font-bold text-white">{t}</p>
              <p className="text-xs text-white/50">{s}</p>
            </div>
          ))}
        </div>
      </Container>

      <div className="hero-scrollcue absolute bottom-6 left-1/2 z-10 -translate-x-1/2 opacity-0" aria-hidden>
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/30 p-1.5">
          <span className="h-2 w-1 animate-bounce rounded-full bg-brand" />
        </div>
      </div>
    </section>
  );
}
