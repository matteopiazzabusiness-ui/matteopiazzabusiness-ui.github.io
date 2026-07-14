"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/useScrollGsap";
import { Container } from "@/components/ui";

const headline = ["Movimenti", "la terra.", "Noi muoviamo", "il resto."];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set(".gsap-prep", { opacity: 1, y: 0 });
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".hero-eyebrow", { opacity: 0, y: 20, duration: 0.6 })
        .from(".hero-line", { opacity: 0, yPercent: 120, duration: 1, stagger: 0.12 }, "-=0.2")
        .from(".hero-sub", { opacity: 0, y: 20, duration: 0.8 }, "-=0.5")
        .from(".hero-cta", { opacity: 0, y: 20, duration: 0.6, stagger: 0.1 }, "-=0.5")
        .from(".hero-badge", { opacity: 0, y: 24, scale: 0.9, duration: 0.7, stagger: 0.12 }, "-=0.6")
        .to(".hero-scrollcue", { opacity: 1, duration: 0.6 }, "-=0.3");

      // Parallax layers su scroll
      gsap.to(".hero-grid", { yPercent: 30, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".hero-glow", { yPercent: 60, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".hero-content", { yPercent: 18, opacity: 0.6, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });

      // Loop bagliore
      gsap.to(".hero-glow", { opacity: 0.55, scale: 1.15, duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1 });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="noise relative min-h-[100svh] overflow-hidden bg-graphite-950 text-white">
      <div className="hero-grid bg-grid absolute inset-0 -top-1/4 h-[150%]" aria-hidden />
      <div className="hero-glow pointer-events-none absolute left-1/2 top-1/3 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-brand/25 blur-[120px]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-graphite-950" aria-hidden />

      <Container className="hero-content relative flex min-h-[100svh] flex-col justify-center py-28">
        <span className="hero-eyebrow gsap-prep inline-flex w-max items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" /> Movimento terra · Sicilia
        </span>

        <h1 className="mt-6 font-display text-[13vw] font-extrabold leading-[0.92] sm:text-7xl lg:text-8xl">
          {headline.map((l, i) => (
            <span key={l} className="block overflow-hidden">
              <span className={`hero-line gsap-prep block ${i % 2 === 1 ? "text-brand" : "text-white"}`}>{l}</span>
            </span>
          ))}
        </h1>

        <p className="hero-sub gsap-prep mt-8 max-w-xl text-lg text-white/65">
          Concessionaria Caterpillar e Dieci. Vendita, noleggio, assistenza e ricambi con un unico partner,
          dalle sedi di Caltanissetta e Catania.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/mezzi" className="hero-cta gsap-prep glow-brand inline-flex min-h-[56px] items-center gap-2 rounded-md bg-brand px-8 font-bold text-brand-ink transition-transform duration-200 hover:scale-[1.03]">
            Sfoglia i mezzi →
          </Link>
          <Link href="/contatti?intento=preventivo" className="hero-cta gsap-prep inline-flex min-h-[56px] items-center rounded-md border border-white/25 px-8 font-semibold text-white transition-colors duration-200 hover:bg-white hover:text-ink">
            Richiedi preventivo
          </Link>
        </div>

        <div className="mt-16 flex flex-wrap gap-3">
          {[
            ["Caterpillar", "Concessionaria autorizzata"],
            ["Dieci", "Sollevatori telescopici"],
            ["2 sedi", "Copertura Sicilia"],
          ].map(([t, s]) => (
            <div key={t} className="hero-badge gsap-prep rounded-lg border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
              <p className="font-display font-bold text-white">{t}</p>
              <p className="text-xs text-white/50">{s}</p>
            </div>
          ))}
        </div>
      </Container>

      <div className="hero-scrollcue absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0" aria-hidden>
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/30 p-1.5">
          <span className="h-2 w-1 animate-bounce rounded-full bg-brand" />
        </div>
      </div>
    </section>
  );
}
