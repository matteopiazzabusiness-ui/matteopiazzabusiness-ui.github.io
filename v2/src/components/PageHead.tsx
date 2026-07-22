"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, reduced, splitChars } from "@/lib/motion";

/**
 * PAGEHEAD — testata editoriale cinematica delle pagine interne: parola
 * fantasma gigante in parallasse dietro al titolo, titolo che sale lettera
 * per lettera, label e testo in reveal, hairline che si disegna, cue di
 * scorrimento. Server-safe: senza JS il contenuto resta leggibile.
 */
export function PageHead({ label, title, children, ghost }: { label: string; title: string; children?: ReactNode; ghost?: string }) {
  const root = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const word = ghost ?? label;

  useGSAP(
    () => {
      if (reduced() || !root.current) return;

      // Titolo lettera per lettera
      const chars = heading.current ? splitChars(heading.current) : [];
      gsap.from(chars, {
        yPercent: 120,
        opacity: 0,
        duration: 0.9,
        stagger: 0.018,
        ease: "expo.out",
        delay: 0.05,
      });

      // Label, testo e cue salgono
      gsap.from(root.current.querySelectorAll(".ph-el"), {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Hairline che si disegna
      gsap.from(".ph-rule", { scaleX: 0, transformOrigin: "left", duration: 1, ease: "expo.out", delay: 0.3 });

      // Parola fantasma in parallasse
      gsap.fromTo(".ph-ghost", { yPercent: 8 }, { yPercent: -22, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });

      // Cue di scorrimento che pulsa e sfuma
      gsap.to(".ph-cue-line", { scaleY: 0.4, repeat: -1, yoyo: true, duration: 0.9, ease: "sine.inOut", transformOrigin: "top" });
      gsap.to(".ph-cue", { opacity: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom 60%", scrub: true } });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-paper px-5 pb-10 pt-32 sm:px-8 sm:pb-14 sm:pt-40">
      {/* Parola fantasma gigante */}
      <span aria-hidden className="ph-ghost t-poster pointer-events-none absolute -right-2 -top-2 z-0 select-none text-[24vw] leading-none text-ink/[0.045] sm:text-[16vw]">
        {word}
      </span>

      <div className="relative z-10">
        <p className="ph-el t-label text-ink-soft">{label}</p>
        <h1 ref={heading} className="t-poster mt-3 max-w-5xl text-6xl text-ink sm:text-8xl">{title}</h1>
        {children && <div className="ph-el mt-6 max-w-2xl text-base leading-relaxed text-ink-soft">{children}</div>}

        <div className="mt-10 flex items-end justify-between gap-6">
          <div className="ph-rule h-px flex-1 bg-ink/20" />
          <span className="ph-cue ph-el flex items-center gap-2 text-ink-soft">
            <span className="t-label">Scorri</span>
            <span className="ph-cue-line block h-6 w-px bg-ink/40" />
          </span>
        </div>
      </div>
    </section>
  );
}
