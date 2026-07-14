"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/useScrollGsap";
import { ProductImage } from "@/components/ProductImage";
import { Badge } from "@/components/ui";
import { categorie, type Prodotto } from "@/lib/catalog";

export function PinnedShowcase({ prodotti }: { prodotti: Prodotto[] }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !track.current) return;
      const distance = () => track.current!.scrollWidth - window.innerWidth + 48;

      const tween = gsap.to(track.current, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => "+=" + distance(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Progress bar
      gsap.to(".showcase-progress", {
        scaleX: 1, ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: () => "+=" + distance(), scrub: true },
      });

      // Parallax leggero sulle immagini durante lo scrub
      gsap.utils.toArray<HTMLElement>(".showcase-img").forEach((img) => {
        gsap.fromTo(img, { scale: 1.12 }, {
          scale: 1, ease: "none",
          scrollTrigger: { trigger: img, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="noise relative overflow-hidden bg-graphite-950 text-white">
      <div className="bg-grid-fine absolute inset-0 opacity-60" aria-hidden />
      <div className="relative flex min-h-[100svh] flex-col justify-center py-16">
        <div className="mx-auto mb-10 w-full max-w-6xl px-4 sm:px-6">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand">
            <span className="h-px w-6 bg-brand" /> Gamma mezzi
          </span>
          <h2 className="mt-3 text-4xl font-bold text-white sm:text-6xl">La flotta, in movimento</h2>
          <p className="mt-2 text-white/50">Scorri — le macchine sfilano davanti a te.</p>
        </div>

        <div ref={track} className="flex gap-6 px-4 sm:px-6 will-change-transform">
          {prodotti.map((p, i) => (
            <Link
              key={p.slug}
              href={`/mezzi/${p.slug}`}
              className="group relative flex w-[82vw] max-w-[420px] shrink-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-graphite-800"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-graphite-700">
                <div className="showcase-img absolute inset-0">
                  <ProductImage src={p.immagini[0]} alt={p.nome} sizes="420px" priority={i < 2} />
                </div>
                <span className="absolute left-4 top-4"><Badge tone="brand">{p.brand}</Badge></span>
                <span className="absolute right-4 top-4 font-display text-2xl font-extrabold text-white/20">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs uppercase tracking-wide text-white/40">{categorie[p.categoria].label}</p>
                <h3 className="mt-1 font-display text-2xl font-bold text-white">{p.nome}</h3>
                <p className="mt-2 line-clamp-2 flex-1 text-sm text-white/55">{p.descrizione}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                  Vedi scheda <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          ))}
          <Link href="/mezzi" className="flex w-[70vw] max-w-[320px] shrink-0 flex-col items-center justify-center gap-4 rounded-2xl border border-brand/40 bg-brand/5 p-8 text-center">
            <span className="text-5xl" aria-hidden>→</span>
            <span className="font-display text-2xl font-bold text-brand">Tutti i mezzi</span>
            <span className="text-sm text-white/50">Catalogo completo con filtri</span>
          </Link>
        </div>

        <div className="mx-auto mt-10 w-full max-w-6xl px-4 sm:px-6">
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
            <div className="showcase-progress h-full origin-left scale-x-0 bg-brand" />
          </div>
        </div>
      </div>
    </section>
  );
}
