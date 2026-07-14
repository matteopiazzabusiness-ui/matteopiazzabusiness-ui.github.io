"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/useScrollGsap";
import { Container, Eyebrow } from "@/components/ui";

const servizi = [
  { k: "01", href: "/mezzi", t: "Vendita", d: "Concessionaria Caterpillar e Dieci. Ti affianchiamo nella scelta del mezzo per applicazione, non solo per marca: budget, permuta, accessori e costo totale di esercizio.", tags: ["Nuovo & usato", "Consulenza", "Finanziamento"] },
  { k: "02", href: "/noleggio", t: "Noleggio", d: "La macchina giusta per il tempo che ti serve. Definiamo tipologia, peso, luogo e periodo, con operatore e trasporto opzionabili dalla sede più vicina.", tags: ["Breve & lungo termine", "Operatore", "Trasporto"] },
  { k: "03", href: "/assistenza", t: "Assistenza", d: "Officina mobile e ricambi originali per ridurre il fermo macchina. Triage per urgenza: se la macchina è ferma, hai la priorità.", tags: ["Officina mobile", "Ricambi originali", "Priorità fermo macchina"] },
  { k: "04", href: "/ricambi", t: "Ricambi", d: "Il pezzo giusto senza errori: identificazione per modello, seriale o foto, con supporto del reparto post-vendita e distinzione originale/alternativo secondo policy.", tags: ["Per seriale", "Originali", "Post-vendita"] },
];

export function ServicesSticky() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>(".svc-panel").forEach((panel) => {
        gsap.from(panel.querySelectorAll(".svc-anim"), {
          opacity: 0, y: 40, duration: 0.7, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: panel, start: "top 70%", once: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bg-surface-2 py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr]">
          <div className="lg:sticky lg:top-24 lg:h-max">
            <Eyebrow>Un solo partner</Eyebrow>
            <h2 className="mt-3 text-4xl font-bold sm:text-5xl">Tutto il ciclo di vita del tuo mezzo</h2>
            <p className="mt-4 text-slate">
              Dalla scelta all&apos;acquisto, dal noleggio all&apos;assistenza fino ai ricambi. Un unico
              interlocutore in Sicilia, dalle sedi di Caltanissetta e Catania.
            </p>
            <Link href="/contatti?intento=preventivo" className="mt-6 inline-flex min-h-[52px] items-center rounded-md bg-ink px-6 font-semibold text-white transition-colors hover:bg-graphite-800">
              Parla con noi →
            </Link>
          </div>

          <div className="space-y-5">
            {servizi.map((s) => (
              <Link
                key={s.k}
                href={s.href}
                className="svc-panel group block rounded-2xl border border-line bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.25)]"
              >
                <div className="flex items-baseline gap-4">
                  <span className="svc-anim font-display text-2xl font-extrabold text-brand">{s.k}</span>
                  <h3 className="svc-anim font-display text-3xl font-bold text-ink">{s.t}</h3>
                </div>
                <p className="svc-anim mt-3 text-slate">{s.d}</p>
                <div className="svc-anim mt-4 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span key={t} className="rounded-full bg-surface-3 px-3 py-1 text-xs font-semibold text-slate-strong">{t}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
