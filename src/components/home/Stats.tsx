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
    <section ref={root} className="section-fade relative overflow-hidden border-b border-white/10 bg-graphite-900 py-16 text-white sm:py-24">
      <div className="bg-grid-fine absolute inset-0 opacity-50" aria-hidden />
      <Container className="relative grid grid-cols-2 divide-x divide-white/10 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="stat-item px-4 py-14 text-center">
            <div className="font-display text-6xl font-extrabold text-brand sm:text-7xl">
              <span className="stat-num" data-n={s.n} data-suf={s.suf}>0{s.suf}</span>
            </div>
            <p className="mx-auto mt-3 max-w-[16ch] text-sm text-white/55">{s.label}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}
