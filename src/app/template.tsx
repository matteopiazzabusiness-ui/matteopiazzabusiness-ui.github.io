"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/useScrollGsap";

// template.tsx si ri-monta a ogni navigazione → animazione d'ingresso per-route.
// Overlay giallo brand fa un wipe, il contenuto entra con fade/slide.
export default function Template({ children }: { children: React.ReactNode }) {
  const wipe = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set([wipe.current, content.current], { clearProps: "all" });
        gsap.set(wipe.current, { display: "none" });
        return;
      }
      const tl = gsap.timeline();
      tl.set(wipe.current, { display: "block", scaleY: 1, transformOrigin: "bottom" })
        .set(content.current, { opacity: 0, y: 24 })
        .to(wipe.current, { scaleY: 0, transformOrigin: "top", duration: 0.55, ease: "expo.inOut" })
        .to(content.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.25")
        .set(wipe.current, { display: "none" });
    },
    { dependencies: [pathname] },
  );

  return (
    <>
      <div
        ref={wipe}
        className="pointer-events-none fixed inset-0 z-[90] bg-brand"
        style={{ display: "none" }}
        aria-hidden
      />
      <div ref={content}>{children}</div>
    </>
  );
}
