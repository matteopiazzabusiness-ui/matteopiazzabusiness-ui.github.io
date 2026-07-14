"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/useScrollGsap";
import { ShaderField } from "@/components/fx/ShaderField";
import { Container } from "@/components/ui";

const words = ["Potenza.", "Precisione.", "Presenza.", "In", "tutta", "la", "Sicilia."];

export function ShaderStatement() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.set(".ks-word", { opacity: 0.12, y: 20 });
      gsap.to(".ks-word", {
        opacity: 1, y: 0, stagger: 0.5, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "+=120%", pin: true, scrub: 0.6 },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative flex min-h-[100svh] items-center overflow-hidden bg-graphite-950 text-white">
      <ShaderField />
      <div className="absolute inset-0 bg-graphite-950/30" aria-hidden />
      <Container className="relative">
        <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-brand">Il nostro standard</p>
        <h2 className="max-w-4xl font-display text-5xl font-extrabold leading-[1.02] sm:text-7xl lg:text-8xl">
          {words.map((w, i) => (
            <span key={i} className="ks-word mr-[0.25em] inline-block">{w}</span>
          ))}
        </h2>
      </Container>
    </section>
  );
}
