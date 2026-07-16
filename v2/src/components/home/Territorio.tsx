"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP, reduced } from "@/lib/motion";
import { sedi } from "@/lib/site";

const PROVINCE = ["Caltanissetta", "Enna", "Agrigento", "Catania", "Siracusa", "Ragusa", "Messina", "Palermo", "Trapani"];

/**
 * TERRITORIO — copertura Sicilia: nome-isola gigante in outline che
 * si riempie con lo scroll, province a onda, card sedi con reveal.
 */
export function Territorio() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reduced() || !root.current) return;
      // Il testo outline si riempie di giallo con lo scroll
      gsap.fromTo(".tr-fill", { backgroundSize: "0% 100%" }, {
        backgroundSize: "100% 100%",
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top 75%", end: "center 45%", scrub: 0.5 },
      });
      gsap.from(".tr-prov", {
        opacity: 0,
        y: 16,
        duration: 0.4,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: { trigger: ".tr-provs", start: "top 78%", once: true },
      });
      gsap.from(".tr-sede", {
        opacity: 0,
        y: 34,
        duration: 0.7,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: ".tr-sedi", start: "top 80%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="grain relative overflow-hidden bg-carbon px-5 py-24 text-paper sm:px-8 sm:py-36">
      <p className="t-label text-giallo">Il territorio</p>
      <h2
        className="tr-fill t-poster mt-4 bg-gradient-to-r from-giallo to-giallo bg-no-repeat text-[17vw] leading-none text-transparent [background-clip:text] [-webkit-text-stroke:1.5px_rgba(244,241,236,0.4)] sm:text-[13vw]"
        aria-label="Sicilia"
      >
        Sicilia
      </h2>

      <div className="tr-provs mt-10 flex flex-wrap gap-2">
        {PROVINCE.map((p) => (
          <span key={p} className="tr-prov t-label border border-paper/25 px-4 py-2.5 text-paper/80">{p}</span>
        ))}
      </div>

      <div className="tr-sedi mt-16 grid gap-6 sm:grid-cols-2">
        {sedi.map((s, i) => (
          <div key={s.slug} className="tr-sede border-t-2 border-giallo pt-5">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="t-poster text-4xl text-paper">{s.city}</h3>
              <span className="t-label text-paper/60">Sede {String(i + 1).padStart(2, "0")}</span>
            </div>
            <p className="mt-3 text-sm text-paper/70">{s.street}, {s.zip} {s.city} ({s.province})</p>
            <p className="t-label mt-2 text-paper/60">Serve: {s.areaServita.join(" · ")}</p>
            <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2">
              <a href={`tel:${s.phone.replace(/\s/g, "")}`} className="u-line text-lg font-semibold text-giallo">{s.phone}</a>
              <a href={`tel:${s.mobile.replace(/\s/g, "")}`} className="u-line text-lg font-semibold text-giallo">{s.mobile}</a>
            </div>
          </div>
        ))}
      </div>

      <Link href="/contatti" className="t-label mt-14 inline-block bg-giallo px-8 py-4 text-ink transition-colors hover:bg-paper">
        Trova la tua sede {"->"}
      </Link>
    </section>
  );
}
