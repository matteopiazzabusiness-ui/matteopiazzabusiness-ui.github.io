"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/useScrollGsap";
import { Container } from "@/components/ui";

const stats = [
  { n: 2, suf: "", label: "Sedi operative in Sicilia" },
  { n: 16, suf: "+", label: "Professionisti dedicati" },
  { n: 10, suf: "+", label: "Marchi trattati" },
  { n: 4, suf: "", label: "Servizi in un partner" },
];

export function Stats() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = prefersReducedMotion();
      const nums = gsap.utils.toArray<HTMLElement>(".stat-num");
      nums.forEach((el) => {
        const target = Number(el.dataset.n);
        const suf = el.dataset.suf ?? "";
        if (reduce) { el.textContent = `${target}${suf}`; return; }
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => { el.textContent = `${Math.round(obj.v)}${suf}`; },
        });
      });
      if (!reduce) {
        gsap.from(".stat-item", {
          opacity: 0, y: 30, duration: 0.6, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
        });
      }
    },
    { scope: root },
  );

  return (
    <section ref={root} className="border-y border-line bg-surface">
      <Container className="grid grid-cols-2 gap-px lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="stat-item px-4 py-12 text-center">
            <div className="font-display text-5xl font-extrabold text-ink sm:text-6xl">
              <span className="stat-num" data-n={s.n} data-suf={s.suf}>0{s.suf}</span>
            </div>
            <p className="mx-auto mt-2 max-w-[16ch] text-sm text-slate">{s.label}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}
