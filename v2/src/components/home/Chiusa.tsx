"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP, reduced } from "@/lib/motion";
import { sedi, company } from "@/lib/site";

/**
 * CHIUSA — invito finale: titolo poster che sale dal fondo,
 * due sedi affiancate, bottone WhatsApp/contatti gigante.
 */
export function Chiusa() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reduced() || !root.current) return;
      gsap.from(".ch-line", {
        yPercent: 110,
        duration: 0.9,
        stagger: 0.12,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
      });
      gsap.from(".ch-sede", {
        opacity: 0,
        y: 28,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 55%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bg-giallo px-5 py-24 text-ink sm:px-8 sm:py-32">
      <h2 className="t-poster text-[13vw] leading-[0.9] sm:text-[9vw]">
        <span className="block overflow-hidden"><span className="ch-line block">Il cantiere</span></span>
        <span className="block overflow-hidden"><span className="ch-line block">non aspetta.</span></span>
        <span className="block overflow-hidden"><span className="ch-line block underline decoration-carbon decoration-8 underline-offset-[1.5vw]">Chiamaci ora.</span></span>
      </h2>

      <div className="mt-16 grid gap-8 sm:grid-cols-3">
        {sedi.map((s) => (
          <div key={s.slug} className="ch-sede border-t-2 border-ink pt-4">
            <p className="t-label">{s.city} ({s.province})</p>
            <p className="mt-2 text-sm opacity-80">{s.street}, {s.zip}</p>
            <a href={`tel:${s.phone.replace(/\s/g, "")}`} className="t-poster u-line mt-2 block text-2xl">{s.phone}</a>
          </div>
        ))}
        <div className="ch-sede border-t-2 border-ink pt-4">
          <p className="t-label">Scrivici</p>
          <a
            href={`https://wa.me/${company.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="t-poster u-line mt-2 block text-2xl"
          >
            WhatsApp {"->"}
          </a>
          <Link href="/contatti" className="t-poster u-line mt-1 block text-2xl">Form contatti {"->"}</Link>
        </div>
      </div>
    </section>
  );
}
