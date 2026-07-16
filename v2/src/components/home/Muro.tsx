"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, reduced } from "@/lib/motion";
import { partner } from "@/lib/team";

/** MURO — parete loghi partner: griglia editoriale, reveal a onda. */
export function Muro() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reduced() || !root.current) return;
      gsap.from(root.current.querySelectorAll(".muro-cell"), {
        opacity: 0,
        scale: 0.9,
        duration: 0.45,
        ease: "back.out(1.4)",
        stagger: { each: 0.045, grid: "auto", from: "start" },
        scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bg-paper px-5 py-24 sm:px-8 sm:py-32">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="t-poster text-5xl text-ink sm:text-7xl">
          {partner.length} marchi.<br />
          <span className="marker">Un interlocutore.</span>
        </h2>
        <p className="t-label text-ink-soft">Concessionaria & partner ufficiali</p>
      </div>
      <div className="mt-12 grid grid-cols-2 border-l border-t border-ink/15 sm:grid-cols-4 lg:grid-cols-5">
        {partner.map((p) => (
          <div
            key={p.nome}
            className="muro-cell group flex aspect-[4/3] items-center justify-center border-b border-r border-ink/15 bg-white p-6 transition-colors duration-300 hover:bg-giallo"
            title={p.nome}
          >
            <Image
              src={p.logo}
              alt={p.nome}
              width={130}
              height={70}
              className="max-h-14 w-auto object-contain opacity-75 saturate-0 transition-all duration-300 group-hover:opacity-100 group-hover:saturate-100"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
