"use client";

import { useRef } from "react";
import { gsap, useGSAP, reduced } from "@/lib/motion";

/**
 * HERO KINETIC — sezione pinnata di tipografia gigante che scorre in
 * orizzontale mentre si scrolla in verticale (scrub). Manifesto cinetico.
 * Reduce-motion: fascia scorrevole a mano.
 */

const WORDS = ["SCAVARE", "CARICARE", "SOLLEVARE", "LIVELLARE", "DEMOLIRE", "MUOVERE LA TERRA"];

export function HeroKinetic() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reduced() || !track.current || !root.current) return;
      const dist = () => track.current!.scrollWidth - window.innerWidth;
      gsap.to(track.current, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: () => "+=" + dist(), pin: true, scrub: 0.5, invalidateOnRefresh: true, anticipatePin: 1 },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="flow-pinned relative flex h-[100svh] items-center overflow-hidden bg-paper">
      <p className="t-label absolute left-5 top-24 z-10 text-ink-soft sm:left-8">Il nostro mestiere</p>
      <div className="motion-reduce:overflow-x-auto">
        <div ref={track} className="flex w-max items-center whitespace-nowrap pl-[10vw] will-change-transform motion-reduce:w-auto">
          {WORDS.map((w, i) => (
            <span key={w} className="t-poster flex items-center text-[15vw] leading-none text-ink">
              {w}
              <span className={`px-[3vw] ${i === WORDS.length - 1 ? "text-giallo" : "text-giallo-deep"}`}>·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
