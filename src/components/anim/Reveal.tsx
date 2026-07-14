"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/useScrollGsap";

/**
 * Wrapper d'animazione riutilizzabile per le pagine interne.
 * I children sono renderizzati lato server (SEO intatto), animati lato client.
 * - default: fade + salita del blocco.
 * - stagger: anima i figli con [data-reveal-item] in cascata.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  y = 28,
  x = 0,
  delay = 0,
  duration = 0.7,
  stagger,
  start = "top 82%",
  id,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  y?: number;
  x?: number;
  delay?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const targets = stagger
        ? ref.current.querySelectorAll<HTMLElement>("[data-reveal-item]")
        : [ref.current];
      if (!targets.length) return;
      gsap.from(targets, {
        opacity: 0,
        y,
        x,
        duration,
        delay,
        ease: "power3.out",
        stagger: stagger ?? 0,
        scrollTrigger: { trigger: ref.current, start, once: true },
      });
    },
    { scope: ref },
  );

  return <Tag ref={ref} id={id} className={className}>{children}</Tag>;
}
