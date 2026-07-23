"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap, reduced } from "@/lib/motion";

/**
 * PAGE TRANSITION — sipario giallo a due fasi. Intercetta i clic sui link
 * interni: prima COPRE lo schermo (sweep dal basso), poi naviga; al commit
 * della nuova pagina RIVELA uscendo dall'alto. Un unico movimento verticale
 * continuo. L'overlay è fixed e usa transform proprio: non avvolge il
 * contenuto, quindi i pin ScrollTrigger restano intatti. Reduce-motion: off.
 */
export function PageTransition() {
  const overlay = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLSpanElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const covering = useRef(false);

  // Stato iniziale: fuori campo, sotto.
  useEffect(() => {
    if (overlay.current) gsap.set(overlay.current, { yPercent: 100, autoAlpha: 0 });
  }, []);

  // Fase 1 — intercetta il clic, copre, poi naviga.
  useEffect(() => {
    if (reduced()) return;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target instanceof Element ? e.target.closest("a") : null;
      if (!(a instanceof HTMLAnchorElement)) return;
      const href = a.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith("//")) return; // solo interni
      if (a.target === "_blank" || a.hasAttribute("download")) return;

      const url = new URL(href, location.href);
      if (url.pathname === location.pathname) return; // stessa pagina / ancora

      e.preventDefault();
      if (covering.current || !overlay.current) return;
      covering.current = true;

      gsap
        .timeline()
        .set(overlay.current, { autoAlpha: 1, yPercent: 100 })
        .set(mark.current, { yPercent: 60, opacity: 0 })
        .to(overlay.current, { yPercent: 0, duration: 0.55, ease: "expo.inOut" })
        .to(mark.current, { yPercent: 0, opacity: 1, duration: 0.4, ease: "power3.out" }, "<0.18")
        .add(() => router.push(url.pathname + url.search + url.hash));
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  // Fase 2 — al cambio pagina, rivela uscendo dall'alto.
  useEffect(() => {
    if (!covering.current || !overlay.current) return;
    const tl = gsap
      .timeline({ onComplete: () => (covering.current = false) })
      .to(mark.current, { yPercent: -50, opacity: 0, duration: 0.45, ease: "power2.in" })
      .to(overlay.current, { yPercent: -100, duration: 0.65, ease: "expo.inOut" }, "<0.05")
      .set(overlay.current, { autoAlpha: 0, yPercent: 100 });
    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <div ref={overlay} aria-hidden className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-giallo">
      <span ref={mark} className="t-poster text-7xl text-ink sm:text-9xl">DLF</span>
    </div>
  );
}
