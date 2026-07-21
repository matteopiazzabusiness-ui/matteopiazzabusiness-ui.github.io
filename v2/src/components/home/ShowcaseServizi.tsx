"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap, useGSAP, reduced } from "@/lib/motion";

/**
 * SHOWCASE SERVIZI — sezione pinnata cinematica: i quattro servizi sfilano in
 * orizzontale mentre si scrolla in verticale (scrub). Pannelli full-bleed con
 * immagine in parallasse + ken-burns, numero fantasma gigante, gradiente e
 * grana, sipario giallo che si ritira all'ingresso di ogni pannello.
 * Reduce-motion: fascia scorrevole a mano (contenuto mai tagliato).
 */

const SERVIZI = [
  {
    href: "/mezzi",
    n: "01",
    label: "Vendita",
    titolo: "La macchina giusta",
    testo: "Gamma completa Caterpillar e Dieci con garanzia ufficiale. Nuovo, usato garantito e permuta, con leasing su misura.",
    punti: ["Concessionaria ufficiale CAT e Dieci", "Nuovo, usato e permuta", "Leasing e finanziamento"],
    img: "/media/products/306-cr.jpeg",
  },
  {
    href: "/noleggio",
    n: "02",
    label: "Noleggio",
    titolo: "Solo quando serve",
    testo: "Breve e lungo termine, consegna in cantiere in tutta la Sicilia, manutenzione sempre inclusa. Paghi il mezzo per il tempo in cui lavora.",
    punti: ["Breve e lungo termine", "Consegna e ritiro in cantiere", "Manutenzione inclusa"],
    img: "/media/products/dedalus-30-7-main.jpeg",
  },
  {
    href: "/assistenza",
    n: "03",
    label: "Assistenza",
    titolo: "Arriviamo noi",
    testo: "Officina attrezzata a Caltanissetta e officina mobile che raggiunge il cantiere ovunque in Sicilia. Meno fermi macchina, un referente dedicato.",
    punti: ["Officina mobile in tutta la Sicilia", "Tecnici qualificati su tutte le marche", "Manutenzione programmata"],
    img: "/media/team/officina-caltanissetta.jpg",
  },
  {
    href: "/ricambi",
    n: "04",
    label: "Ricambi",
    titolo: "Il pezzo giusto, subito",
    testo: "Ricambi originali di tutte le marche in stock nei magazzini di Caltanissetta e Catania. Identifichiamo il codice dal numero di serie e spediamo in giornata.",
    punti: ["Originali di tutte le marche", "Due magazzini riforniti", "Spedizione rapida"],
    img: "/media/team/magazzino-caltanissetta.jpg",
  },
];

export function ShowcaseServizi() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const counter = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (reduced() || !track.current || !root.current) return;
      const dist = () => track.current!.scrollWidth - window.innerWidth;

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
            if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
            if (counter.current) {
              const idx = Math.min(SERVIZI.length, 1 + Math.floor(self.progress * SERVIZI.length));
              counter.current.textContent = String(idx).padStart(2, "0");
            }
          },
        },
      });

      gsap.utils.toArray<HTMLElement>(".sv-panel").forEach((panel) => {
        // Parallasse + ken-burns dell'immagine
        const img = panel.querySelector(".sv-img");
        if (img) {
          gsap.fromTo(
            img,
            { xPercent: -12, scale: 1.35 },
            { xPercent: 12, scale: 1.18, ease: "none", scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left right", end: "right left", scrub: true } },
          );
        }
        // Sipario giallo che si ritira quando il pannello entra
        const cover = panel.querySelector(".sv-cover");
        if (cover) {
          gsap.fromTo(
            cover,
            { clipPath: "inset(0 0 0 0)" },
            { clipPath: "inset(0 0 0 100%)", ease: "power2.inOut", scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left right", end: "left center", scrub: true } },
          );
        }
        // Numero fantasma che deriva
        const ghost = panel.querySelector(".sv-ghost");
        if (ghost) {
          gsap.fromTo(
            ghost,
            { xPercent: 18 },
            { xPercent: -18, ease: "none", scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left right", end: "right left", scrub: true } },
          );
        }
        // Testo che entra al centro
        gsap.from(panel.querySelectorAll(".sv-rise"), {
          y: 46,
          opacity: 0,
          duration: 0.7,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left center", toggleActions: "play none none reverse" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative overflow-hidden bg-carbon text-paper">
      {/* HUD fisso */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 pt-6 sm:px-8">
        <p className="t-label text-paper/70">I quattro servizi</p>
        <p className="t-label text-paper/70">
          <span ref={counter}>01</span> / {String(SERVIZI.length).padStart(2, "0")}
        </p>
      </div>

      <div className="motion-reduce:overflow-x-auto">
        <div ref={track} className="flex w-max motion-reduce:w-auto">
          {SERVIZI.map((s) => (
            <article key={s.href} className="sv-panel relative flex h-[100svh] w-screen shrink-0 items-end overflow-hidden motion-reduce:w-[92vw]">
              {/* Immagine full-bleed */}
              <div className="absolute inset-0">
                <Image src={s.img} alt={s.titolo} fill sizes="100vw" className="sv-img object-cover" />
              </div>
              {/* Grading: gradiente + vignetta + grana */}
              <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/45 to-carbon/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-carbon/85 via-transparent to-transparent" />
              <div className="absolute inset-0 shadow-[inset_0_0_220px_60px_rgba(10,10,11,0.75)]" />
              <div className="grain absolute inset-0" />
              {/* Sipario giallo */}
              <div className="sv-cover absolute inset-0 z-20 bg-giallo" />
              {/* Numero fantasma */}
              <span className="sv-ghost t-poster pointer-events-none absolute -right-4 top-2 z-0 text-[42vw] leading-none text-paper/10 sm:text-[30vw]">{s.n}</span>

              {/* Contenuto */}
              <div className="relative z-10 w-full px-5 pb-16 sm:px-8 lg:px-16">
                <span className="sv-rise t-label text-giallo">{s.n} · {s.label}</span>
                <h3 className="sv-rise t-poster mt-3 max-w-4xl text-6xl text-paper sm:text-8xl">{s.titolo}</h3>
                <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                  <p className="sv-rise max-w-md text-lg leading-relaxed text-paper/80">{s.testo}</p>
                  <ul className="flex flex-wrap gap-2">
                    {s.punti.map((p) => (
                      <li key={p} className="sv-rise t-label border border-paper/30 px-3 py-1.5 text-paper/90 backdrop-blur-sm">{p}</li>
                    ))}
                  </ul>
                </div>
                <Link href={s.href} className="sv-rise pointer-events-auto t-label mt-8 inline-block bg-giallo px-8 py-4 text-ink transition-colors hover:bg-paper">
                  Scopri {s.label} {"->"}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Barra di avanzamento */}
      <div className="absolute inset-x-0 bottom-0 z-30 h-1 bg-paper/15">
        <span ref={bar} className="block h-full origin-left scale-x-0 bg-giallo" />
      </div>
    </section>
  );
}
