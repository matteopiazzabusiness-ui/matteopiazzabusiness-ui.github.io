"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, reduced } from "@/lib/motion";

/** Testata editoriale pagine interne: label mono + titolo poster con reveal. */
export function PageHead({ label, title, children }: { label: string; title: string; children?: ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reduced() || !root.current) return;
      gsap.from(root.current.querySelectorAll(".ph-el"), {
        yPercent: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "expo.out",
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bg-paper px-5 pb-10 pt-32 sm:px-8 sm:pb-14 sm:pt-40">
      <p className="ph-el t-label text-ink-soft">{label}</p>
      <h1 className="ph-el t-poster mt-3 max-w-5xl text-6xl text-ink sm:text-8xl">{title}</h1>
      {children && <div className="ph-el mt-6 max-w-2xl text-base leading-relaxed text-ink-soft">{children}</div>}
      <div className="rule mt-10" />
    </section>
  );
}
