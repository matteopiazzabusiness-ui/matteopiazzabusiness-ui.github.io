"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/useScrollGsap";
import { team, reparti } from "@/lib/team";
import { IconPhone, IconMail } from "@/components/icons";

/**
 * Team DLF — griglia cinematografica con foto reali.
 * Reveal a onda dal centro (grid stagger, skill ui-ux-pro-max preset),
 * hover: la foto scala, i contatti salgono dal basso.
 */
export function TeamShowcase() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      gsap.from(root.current.querySelectorAll("[data-team-card]"), {
        opacity: 0,
        scale: 0.92,
        y: 24,
        duration: 0.5,
        ease: "back.out(1.4)",
        stagger: { each: 0.06, from: "start", grid: "auto" },
        scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {team.map((m) => (
          <article
            key={m.slug}
            data-team-card
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-graphite-800"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={m.foto}
                alt={m.nome}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-graphite-950/20 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand">
                {m.ruolo}
                {m.area ? ` — ${m.area}` : ""}
              </p>
              <h3 className="mt-1 font-display text-xl font-bold text-white">{m.nome}</h3>
              <div className="mt-2 max-h-0 space-y-1.5 overflow-hidden opacity-0 transition-all duration-500 ease-out group-hover:max-h-20 group-hover:opacity-100">
                {m.telefono && (
                  <a
                    href={`tel:${m.telefono.replace(/[^+\d]/g, "")}`}
                    className="flex items-center gap-2 text-sm text-white/80 hover:text-brand"
                  >
                    <IconPhone className="h-4 w-4 shrink-0" /> {m.telefono}
                  </a>
                )}
                <a
                  href={`mailto:${m.email}`}
                  className="flex items-center gap-2 text-sm text-white/80 hover:text-brand"
                >
                  <IconMail className="h-4 w-4 shrink-0" />
                  <span className="truncate">{m.email}</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {reparti.map((r) => (
          <article
            key={r.slug}
            data-team-card
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-graphite-800"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={r.foto}
                alt={r.nome}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-graphite-950 via-graphite-950/30 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5">
              <h3 className="font-display text-lg font-bold text-white">{r.nome}</h3>
              <p className="mt-1 text-sm text-white/60">{r.descrizione}</p>
              <a
                href={`mailto:${r.email}`}
                className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
              >
                <IconMail className="h-4 w-4" /> {r.email}
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
