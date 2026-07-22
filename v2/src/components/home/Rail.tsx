"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP, reduced } from "@/lib/motion";
import type { Prodotto } from "@/lib/catalog";
import { categorie } from "@/lib/catalog";

/**
 * RAIL — la flotta sfila in orizzontale mentre si scrolla in verticale.
 * Sezione pinnata, scrub 1:1, contatore di avanzamento poster a destra.
 */
export function Rail({ prodotti }: { prodotti: Prodotto[] }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (reduced() || !track.current || !root.current) return;
      const dist = () => track.current!.scrollWidth - window.innerWidth + 64;

      const tween = gsap.to(track.current, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => "+=" + dist(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (counter.current) {
              const idx = Math.min(prodotti.length, 1 + Math.floor(self.progress * prodotti.length));
              counter.current.textContent = String(idx).padStart(2, "0");
            }
          },
        },
      });

      // Effetto velocità: il binario si inclina col movimento e si
      // raddrizza quando lo scroll si ferma
      const skewTo = gsap.quickTo(track.current, "skewX", { duration: 0.4, ease: "power2.out" });
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => skewTo(gsap.utils.clamp(-4, 4, self.getVelocity() / -420)),
      });

      // Profondità: le foto scorrono più lente delle card che le contengono
      // (parallasse orizzontale interna, agganciata al tween del rail)
      gsap.utils.toArray<HTMLElement>(".rail-img").forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -7 },
          {
            xPercent: 7,
            ease: "none",
            scrollTrigger: {
              trigger: img.closest("a"),
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="flotta" className="relative overflow-hidden bg-paper">
      <div className="flex min-h-[100svh] flex-col justify-center py-14">
        <div className="mb-8 flex items-end justify-between px-5 sm:px-8">
          <div>
            <p className="t-label text-ink-soft">La flotta</p>
            <h2 className="t-poster mt-2 text-5xl text-ink sm:text-7xl">
              Mezzi <span className="marker">in prima linea</span>
            </h2>
          </div>
          <p className="t-poster hidden text-7xl text-paper-3 sm:block">
            <span ref={counter}>01</span>/<span className="text-ink/30">{String(prodotti.length).padStart(2, "0")}</span>
          </p>
        </div>

        {/* motion-reduce: il rail diventa una fascia scorrevole a mano (contenuto mai tagliato) */}
        <div className="motion-reduce:overflow-x-auto">
        <div ref={track} className="flex gap-8 px-5 will-change-transform sm:px-8">
          {prodotti.map((p, i) => (
            <Link
              key={p.slug}
              href={`/mezzi/${p.slug}`}
              className="group relative w-[80vw] max-w-[460px] shrink-0"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
                {p.immagini[0] && (
                  <Image
                    src={p.immagini[0]}
                    alt={p.nome}
                    fill
                    quality={90}
                    sizes="460px"
                    className="rail-img scale-[1.16] object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] group-hover:scale-[1.22]"
                  />
                )}
                <span className="t-label absolute left-3 top-3 bg-giallo px-2 py-1 text-ink">{p.brand}</span>
              </div>
              <div className="mt-4 flex items-baseline justify-between border-t border-ink/20 pt-3">
                <div>
                  <p className="t-label text-ink-soft">{categorie[p.categoria].label}</p>
                  <h3 className="t-poster mt-1 text-3xl text-ink transition-colors group-hover:text-giallo-deep">{p.nome}</h3>
                </div>
                <span className="t-poster text-3xl text-paper-3">{String(i + 1).padStart(2, "0")}</span>
              </div>
            </Link>
          ))}
          <Link href="/mezzi" className="flex w-[60vw] max-w-[340px] shrink-0 flex-col justify-center border border-ink/20 p-10 transition-colors hover:bg-giallo">
            <span className="t-poster text-5xl text-ink">Tutto il catalogo</span>
            <span className="t-label mt-4 text-ink-soft">{"->"} {prodotti.length}+ modelli con filtri</span>
          </Link>
        </div>
        </div>
      </div>
    </section>
  );
}
