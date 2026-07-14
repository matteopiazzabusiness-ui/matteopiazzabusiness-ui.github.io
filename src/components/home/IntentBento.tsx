"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/useScrollGsap";
import { Container, Eyebrow } from "@/components/ui";

const cards = [
  { href: "/mezzi", n: "01", t: "Acquista", d: "Gamma Caterpillar e Dieci, nuovo e usato. Schede tecniche e disponibilità.", span: "sm:col-span-3 lg:col-span-2 lg:row-span-2", icon: "🚜", big: true },
  { href: "/noleggio", n: "02", t: "Noleggia", d: "Per luogo, periodo e tipo di lavoro.", span: "sm:col-span-3 lg:col-span-2", icon: "📅" },
  { href: "/assistenza", n: "03", t: "Assistenza", d: "Officina mobile. Meno fermo macchina.", span: "sm:col-span-3 lg:col-span-2", icon: "🔧" },
  { href: "/ricambi", n: "04", t: "Ricambi", d: "Originali, per marca, modello e seriale.", span: "sm:col-span-6 lg:col-span-2", icon: "⚙️" },
];

export function IntentBento() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".bento-card", {
        opacity: 0, y: 40, scale: 0.96, duration: 0.6, stagger: 0.08, ease: "back.out(1.4)",
        scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
      });

      // Magnetic hover
      const cardsEls = gsap.utils.toArray<HTMLElement>(".bento-card");
      cardsEls.forEach((card) => {
        const xTo = gsap.quickTo(card, "x", { duration: 0.5, ease: "elastic.out(1,0.4)" });
        const yTo = gsap.quickTo(card, "y", { duration: 0.5, ease: "elastic.out(1,0.4)" });
        const onMove = (e: MouseEvent) => {
          const r = card.getBoundingClientRect();
          const mx = (e.clientX - (r.left + r.width / 2)) * 0.12;
          const my = (e.clientY - (r.top + r.height / 2)) * 0.12;
          xTo(gsap.utils.clamp(-14, 14, mx));
          yTo(gsap.utils.clamp(-14, 14, my));
        };
        const reset = () => { xTo(0); yTo(0); };
        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", reset);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bg-surface py-20 sm:py-28">
      <Container>
        <Eyebrow>Cosa ti serve oggi</Eyebrow>
        <h2 className="mt-3 max-w-2xl text-4xl font-bold sm:text-5xl">Quattro modi di lavorare con DLF</h2>
        <div className="mt-12 grid auto-rows-[minmax(160px,auto)] grid-cols-1 gap-4 sm:grid-cols-6">
          {cards.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className={`bento-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-surface-2 p-7 transition-colors duration-300 hover:border-brand ${c.span}`}
            >
              <div className="absolute right-5 top-5 font-display text-sm font-bold text-slate/40">{c.n}</div>
              <span className={`${c.big ? "text-6xl" : "text-4xl"}`} aria-hidden>{c.icon}</span>
              <div>
                <h3 className={`font-display font-bold text-ink ${c.big ? "text-4xl" : "text-2xl"}`}>{c.t}</h3>
                <p className="mt-2 max-w-sm text-slate">{c.d}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-brand-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Scopri →
                </span>
              </div>
              <span className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-brand/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-0" aria-hidden />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
