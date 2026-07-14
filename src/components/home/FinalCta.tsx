"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/useScrollGsap";
import { Container } from "@/components/ui";
import { waLink } from "@/lib/site";

export function FinalCta() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".cta-anim", {
        opacity: 0, y: 40, duration: 0.7, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: root.current, start: "top 75%", once: true },
      });
      gsap.to(".cta-glow", { scale: 1.2, opacity: 0.5, duration: 5, ease: "sine.inOut", yoyo: true, repeat: -1 });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-brand py-24 text-brand-ink sm:py-32">
      <div className="cta-glow pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/30 blur-[100px]" aria-hidden />
      <Container className="relative text-center">
        <h2 className="cta-anim mx-auto max-w-4xl font-display text-5xl font-extrabold leading-[0.95] sm:text-7xl">
          Pronto a mettere in moto il tuo cantiere?
        </h2>
        <p className="cta-anim mx-auto mt-6 max-w-xl text-lg text-brand-ink/70">
          Vendita, noleggio, assistenza o ricambi. Dicci di cosa hai bisogno: ti indirizziamo alla persona giusta.
        </p>
        <div className="cta-anim mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/contatti?intento=preventivo" className="inline-flex min-h-[56px] items-center rounded-md bg-graphite-950 px-8 font-bold text-white transition-transform duration-200 hover:scale-[1.03]">
            Richiedi un preventivo →
          </Link>
          <a href={waLink("Salve, vorrei informazioni.")} target="_blank" rel="noopener" className="inline-flex min-h-[56px] items-center gap-2 rounded-md border-2 border-brand-ink px-8 font-bold text-brand-ink transition-colors duration-200 hover:bg-brand-ink hover:text-brand">
            💬 Scrivici su WhatsApp
          </a>
        </div>
      </Container>
    </section>
  );
}
