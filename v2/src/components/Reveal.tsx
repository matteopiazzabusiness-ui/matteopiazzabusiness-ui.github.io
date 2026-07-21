"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, reduced } from "@/lib/motion";

/**
 * Reveal — anima i figli marcati .rv (o l'elemento stesso) all'ingresso in viewport.
 * Server-safe: senza JS il contenuto resta visibile (nessuna perdita SEO/no-flash).
 */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  y = 40,
  stagger = 0.09,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  y?: number;
  stagger?: number;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reduced() || !root.current) return;
      const targets = root.current.querySelectorAll(".rv");
      const els = targets.length ? targets : [root.current];
      gsap.from(els, {
        y,
        opacity: 0,
        duration: 0.85,
        stagger,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 82%" },
      });
    },
    { scope: root },
  );

  return (
    <Tag ref={root} className={className}>
      {children}
    </Tag>
  );
}
