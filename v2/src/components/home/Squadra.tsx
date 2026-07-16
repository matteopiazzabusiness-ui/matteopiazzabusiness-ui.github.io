"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap, useGSAP, reduced } from "@/lib/motion";
import { team } from "@/lib/team";

/**
 * SQUADRA — fascia carbone: le foto del team scorrono in orizzontale
 * a velocità diverse (due file controsfalsate legate allo scroll).
 */
export function Squadra() {
  const root = useRef<HTMLElement>(null);
  const metaTeam = team.slice(0, 10);
  const rowA = metaTeam.slice(0, 5);
  const rowB = metaTeam.slice(5, 10);

  useGSAP(
    () => {
      if (reduced() || !root.current) return;
      gsap.to(".sq-row-a", {
        xPercent: -14,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.6 },
      });
      gsap.fromTo(".sq-row-b", { xPercent: -14 }, {
        xPercent: 0,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.6 },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="grain relative overflow-hidden bg-carbon py-24 text-paper sm:py-32">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6 px-5 sm:px-8">
        <div>
          <p className="t-label text-giallo">La squadra</p>
          <h2 className="t-poster mt-2 text-5xl text-paper sm:text-7xl">Le persone dietro le macchine</h2>
        </div>
        <Link href="/dlf" className="t-label u-line text-paper/70">Tutto il team {"->"}</Link>
      </div>

      <div className="sq-row-a flex gap-5 pl-5 will-change-transform sm:pl-8">
        {rowA.map((m) => <Card key={m.slug} nome={m.nome} ruolo={m.ruolo} foto={m.foto} />)}
      </div>
      <div className="sq-row-b mt-5 flex gap-5 pl-5 will-change-transform sm:pl-8">
        {rowB.map((m) => <Card key={m.slug} nome={m.nome} ruolo={m.ruolo} foto={m.foto} />)}
      </div>
    </section>
  );
}

function Card({ nome, ruolo, foto }: { nome: string; ruolo: string; foto: string }) {
  return (
    <figure className="group w-56 shrink-0 sm:w-64">
      <div className="relative aspect-[4/5] overflow-hidden bg-carbon-700">
        <Image
          src={foto}
          alt={nome}
          fill
          sizes="256px"
          className="object-cover object-top saturate-0 transition-all duration-500 group-hover:saturate-100"
        />
      </div>
      <figcaption className="mt-3">
        <p className="text-sm font-semibold text-paper">{nome}</p>
        <p className="t-label mt-1 text-paper/40">{ruolo}</p>
      </figcaption>
    </figure>
  );
}
