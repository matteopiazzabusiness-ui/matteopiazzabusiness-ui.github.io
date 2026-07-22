"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP, reduced } from "@/lib/motion";

/**
 * HERO MEDIA — immagine di testata cinematica: sipario che si apre (clip-path),
 * parallasse verticale + lento ken-burns in uscita, opzionale color-grade caldo
 * e grana. Server-safe: senza JS resta visibile (nessuna perdita SEO/no-flash).
 */
export function HeroMedia({
  src, alt, className = "", grade = false, priority = false,
}: {
  src: string; alt: string; className?: string; grade?: boolean; priority?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (reduced() || !root.current) return;
      // Sipario: si apre dal basso all'ingresso
      gsap.fromTo(
        root.current,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: root.current, start: "top 85%", once: true } },
      );
      // Parallasse + ken-burns
      gsap.fromTo(
        root.current.querySelector(".hm-img"),
        { yPercent: -10, scale: 1.18 },
        { yPercent: 10, scale: 1.06, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
      );
    },
    { scope: root },
  );

  return (
    <div ref={root} className={`relative overflow-hidden bg-paper-2 ${className}`}>
      <Image src={src} alt={alt} fill priority={priority} quality={90} sizes="100vw" className="hm-img object-cover" />
      {grade && (
        <>
          <div className="absolute inset-0 bg-gradient-to-tr from-arancio/25 via-transparent to-giallo/10 mix-blend-soft-light" />
          <div className="absolute inset-0 shadow-[inset_0_0_180px_50px_rgba(10,10,11,0.35)]" />
          <div className="grain absolute inset-0" />
        </>
      )}
    </div>
  );
}
