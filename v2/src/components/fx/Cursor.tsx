"use client";

import { useEffect, useRef } from "react";
import { gsap, reduced } from "@/lib/motion";

/**
 * CURSOR — puntino giallo + anello inseguitore in mix-blend-difference.
 * L'anello insegue con inerzia (quickTo), cresce sugli elementi
 * interattivi. Gli elementi [data-magnetic] si lasciano attrarre dal
 * puntatore entro il proprio riquadro e tornano elastici all'uscita.
 * Solo puntatori fini (mouse): su touch non si monta nulla.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const d = dot.current;
    const r = ring.current;
    if (!d || !r) return;

    document.documentElement.classList.add("cursor-on");

    // Centratura via gsap (le utility translate di Tailwind verrebbero
    // sovrascritte dal transform di quickTo)
    gsap.set([d, r], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    const dx = gsap.quickTo(d, "x", { duration: 0.08, ease: "power2.out" });
    const dy = gsap.quickTo(d, "y", { duration: 0.08, ease: "power2.out" });
    const rx = gsap.quickTo(r, "x", { duration: 0.45, ease: "power3.out" });
    const ry = gsap.quickTo(r, "y", { duration: 0.45, ease: "power3.out" });

    const move = (e: MouseEvent) => {
      dx(e.clientX); dy(e.clientY);
      rx(e.clientX); ry(e.clientY);
    };

    // Crescita dell'anello sugli interattivi (delegato: sopravvive ai re-render)
    const isInteractive = (t: EventTarget | null) =>
      t instanceof Element && !!t.closest("a, button, [role='button'], summary, input, select, textarea, label");
    const over = (e: MouseEvent) => {
      if (isInteractive(e.target)) gsap.to(r, { scale: 2.2, opacity: 0.55, duration: 0.3, ease: "power3.out" });
    };
    const out = (e: MouseEvent) => {
      if (isInteractive(e.target)) gsap.to(r, { scale: 1, opacity: 1, duration: 0.35, ease: "power3.out" });
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mouseout", out, { passive: true });

    // Magnetismo: l'elemento scivola verso il puntatore, rientra elastico
    const magnets = Array.from(document.querySelectorAll<HTMLElement>("[data-magnetic]"));
    const cleanups = magnets.map((el) => {
      const toX = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
      const toY = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });
      const onMove = (e: MouseEvent) => {
        const b = el.getBoundingClientRect();
        toX((e.clientX - (b.left + b.width / 2)) * 0.28);
        toY((e.clientY - (b.top + b.height / 2)) * 0.28);
      };
      const onLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.45)" });
      };
      el.addEventListener("mousemove", onMove, { passive: true });
      el.addEventListener("mouseleave", onLeave, { passive: true });
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    });

    return () => {
      document.documentElement.classList.remove("cursor-on");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseout", out);
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[80] hidden h-2 w-2 rounded-full bg-giallo [html.cursor-on_&]:block"
      />
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[80] hidden h-9 w-9 rounded-full border border-paper mix-blend-difference [html.cursor-on_&]:block"
      />
    </>
  );
}
