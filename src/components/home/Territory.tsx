"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/useScrollGsap";
import { Container, Eyebrow } from "@/components/ui";
import { sedi } from "@/lib/site";

export function Territory() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".terr-card", {
        opacity: 0, y: 50, duration: 0.7, stagger: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 72%", once: true },
      });
      gsap.to(".terr-pulse", { scale: 1.6, opacity: 0, duration: 2.2, ease: "sine.out", repeat: -1, stagger: 0.4 });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="noise relative overflow-hidden bg-graphite-950 py-20 text-white sm:py-28">
      <div className="bg-grid absolute inset-0 opacity-40" aria-hidden />
      <Container className="relative">
        <Eyebrow>Territorio</Eyebrow>
        <h2 className="mt-3 max-w-2xl text-4xl font-bold text-white sm:text-5xl">
          Due sedi, <span className="text-brand">tutta la Sicilia</span>
        </h2>
        <p className="mt-4 max-w-xl text-white/60">
          Presidio operativo su Sicilia centrale e orientale. Vicino ai tuoi cantieri, con tempi di risposta reali.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {sedi.map((s) => (
            <Link key={s.slug} href={`/sedi/${s.slug}`} className="terr-card group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur transition-colors hover:border-brand/50">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-display text-3xl font-bold text-white">{s.city}</h3>
                  <p className="mt-1 text-sm text-white/50">{s.province} · {s.street}</p>
                </div>
                <span className="relative flex h-4 w-4">
                  <span className="terr-pulse absolute inline-flex h-full w-full rounded-full bg-brand" />
                  <span className="relative inline-flex h-4 w-4 rounded-full bg-brand" />
                </span>
              </div>
              <p className="mt-6 text-sm text-white/70">Area servita</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {s.areaServita.map((a) => (
                  <span key={a} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">{a}</span>
                ))}
              </div>
              <p className="mt-6 font-semibold text-brand">{s.phone}</p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
