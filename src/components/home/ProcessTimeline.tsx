"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/useScrollGsap";
import { Container, Eyebrow } from "@/components/ui";

const steps = [
  { t: "Ci racconti il lavoro", d: "Mezzo, applicazione, luogo e tempi. In pochi campi o su WhatsApp." },
  { t: "Ti indirizziamo", d: "Al reparto e alla sede giusta, con la macchina più adatta." },
  { t: "Preventivo e conferma", d: "Disponibilità, formula acquisto o noleggio, documenti in canale protetto." },
  { t: "Consegna e supporto", d: "Trasporto, avvio e assistenza per ridurre il fermo macchina." },
];

export function ProcessTimeline() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.to(".timeline-fill", {
        scaleY: 1, ease: "none",
        scrollTrigger: { trigger: ".timeline-body", start: "top 65%", end: "bottom 75%", scrub: true },
      });
      gsap.utils.toArray<HTMLElement>(".timeline-step").forEach((step) => {
        gsap.from(step, {
          opacity: 0, x: -30, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: step, start: "top 78%", once: true },
        });
        gsap.from(step.querySelector(".timeline-dot"), {
          scale: 0, duration: 0.4, ease: "back.out(2)",
          scrollTrigger: { trigger: step, start: "top 78%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bg-graphite-950 py-20 text-white sm:py-28">
      <Container>
        <Eyebrow>Come lavoriamo</Eyebrow>
        <h2 className="mt-3 max-w-2xl text-4xl font-bold text-white sm:text-5xl">Dalla richiesta al cantiere, senza attriti</h2>

        <div className="timeline-body relative mt-14 pl-8">
          <div className="absolute left-[11px] top-2 h-full w-0.5 bg-white/10" aria-hidden />
          <div className="timeline-fill absolute left-[11px] top-2 h-full w-0.5 origin-top scale-y-0 bg-brand" aria-hidden />
          <ol className="space-y-12">
            {steps.map((s, i) => (
              <li key={s.t} className="timeline-step relative">
                <span className="timeline-dot absolute -left-8 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-brand bg-graphite-950 text-[10px] font-bold text-brand">
                  {i + 1}
                </span>
                <h3 className="font-display text-2xl font-bold text-white">{s.t}</h3>
                <p className="mt-2 max-w-lg text-white/60">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
