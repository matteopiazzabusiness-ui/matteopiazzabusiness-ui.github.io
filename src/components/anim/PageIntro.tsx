"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/useScrollGsap";
import { Container } from "@/components/ui";

// Header interno cinematografico animato — coerente con l'estetica home.
export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.set(".pi-line", { yPercent: 120 });
      gsap.set([".pi-eyebrow", ".pi-sub"], { opacity: 0, y: 20 });
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.to(".pi-eyebrow", { opacity: 1, y: 0, duration: 0.5 })
        .to(".pi-line", { yPercent: 0, duration: 0.9, stagger: 0.08 }, "-=0.2")
        .to(".pi-sub", { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");
      gsap.to(".pi-grid", { yPercent: 20, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="noise relative overflow-hidden bg-graphite-950 text-white">
      <div className="pi-grid bg-grid absolute inset-0 -top-1/4 h-[150%] opacity-70" aria-hidden />
      <div className="pointer-events-none absolute -right-20 top-0 h-96 w-96 rounded-full bg-brand/15 blur-[110px]" aria-hidden />
      <Container className="relative py-20 sm:py-28">
        <span className="pi-eyebrow inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand">
          <span className="h-px w-6 bg-brand" /> {eyebrow}
        </span>
        <h1 className="mt-4 max-w-4xl overflow-hidden font-display text-4xl font-extrabold leading-[0.95] sm:text-6xl">
          <span className="pi-line block">{title}</span>
        </h1>
        {children && <div className="pi-sub mt-5 max-w-2xl text-lg text-white/65">{children}</div>}
      </Container>
    </section>
  );
}
