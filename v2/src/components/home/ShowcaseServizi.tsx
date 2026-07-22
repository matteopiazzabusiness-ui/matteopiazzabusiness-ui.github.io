"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP, reduced } from "@/lib/motion";

/**
 * SHOWCASE SERVIZI — sezione pinnata: i quattro servizi sfilano in orizzontale
 * mentre si scrolla (pin + scrub). Due trattamenti alternati per nitidezza e
 * ritmo cinematico: pannelli "studio" (chiari, macchina ad alta risoluzione
 * senza crop/upscaling) e "campo" (scuri, foto ambientali full-bleed).
 * Nav capitoli cliccabile + hint di scorrimento. Reduce-motion: scroll a mano.
 */

type Variant = "studio" | "campo";

const SERVIZI: {
  href: string; n: string; label: string; titolo: string; testo: string; punti: string[]; img: string; variant: Variant;
}[] = [
  {
    href: "/mezzi",
    n: "01",
    label: "Vendita",
    titolo: "La macchina giusta",
    testo: "Gamma completa Caterpillar e Dieci con garanzia ufficiale. Nuovo, usato garantito e permuta, con leasing su misura.",
    punti: ["Concessionaria ufficiale", "Nuovo, usato e permuta", "Leasing e finanziamento"],
    img: "/media/products/cat-miniex-309.png",
    variant: "studio",
  },
  {
    href: "/assistenza",
    n: "02",
    label: "Assistenza",
    titolo: "Arriviamo noi",
    testo: "Officina attrezzata a Caltanissetta e officina mobile che raggiunge il cantiere ovunque in Sicilia. Meno fermi macchina, un referente dedicato.",
    punti: ["Officina mobile in Sicilia", "Tecnici qualificati", "Manutenzione programmata"],
    img: "/media/team/officina-caltanissetta.jpg",
    variant: "campo",
  },
  {
    href: "/noleggio",
    n: "03",
    label: "Noleggio",
    titolo: "Solo quando serve",
    testo: "Breve e lungo termine, consegna in cantiere in tutta la Sicilia, manutenzione sempre inclusa. Paghi il mezzo per il tempo in cui lavora.",
    punti: ["Breve e lungo termine", "Consegna in cantiere", "Manutenzione inclusa"],
    img: "/media/products/cat-270.png",
    variant: "studio",
  },
  {
    href: "/ricambi",
    n: "04",
    label: "Ricambi",
    titolo: "Il pezzo giusto, subito",
    testo: "Ricambi originali di tutte le marche in stock nei magazzini di Caltanissetta e Catania. Identifichiamo il codice dal numero di serie e spediamo in giornata.",
    punti: ["Originali di tutte le marche", "Due magazzini riforniti", "Spedizione rapida"],
    img: "/media/team/magazzino-caltanissetta.jpg",
    variant: "campo",
  },
];

export function ShowcaseServizi() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);
  const [hint, setHint] = useState(true);

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
          snap: {
            snapTo: 1 / (SERVIZI.length - 1),
            duration: { min: 0.2, max: 0.5 },
            ease: "power2.inOut",
          },
          onUpdate: (self) => {
            if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
            setActive(Math.min(SERVIZI.length - 1, Math.floor(self.progress * SERVIZI.length + 0.0001)));
            setHint(self.progress < 0.03);
          },
        },
      });
      stRef.current = tween.scrollTrigger ?? null;

      gsap.utils.toArray<HTMLElement>(".sv-panel").forEach((panel) => {
        // Parallasse leggera (niente forte upscaling: le foto restano nitide)
        const img = panel.querySelector(".sv-img");
        if (img) {
          const campo = panel.dataset.variant === "campo";
          gsap.fromTo(
            img,
            { xPercent: campo ? -8 : -4, scale: campo ? 1.12 : 1.04 },
            { xPercent: campo ? 8 : 4, scale: campo ? 1.04 : 1.0, ease: "none", scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left right", end: "right left", scrub: true } },
          );
        }
        // Sipario che si ritira all'ingresso
        const cover = panel.querySelector(".sv-cover");
        if (cover) {
          gsap.fromTo(
            cover,
            { clipPath: "inset(0 0 0 0)" },
            { clipPath: "inset(0 0 0 100%)", ease: "power2.inOut", scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left right", end: "left center", scrub: true } },
          );
        }
        const ghost = panel.querySelector(".sv-ghost");
        if (ghost) {
          gsap.fromTo(ghost, { xPercent: 16 }, { xPercent: -16, ease: "none", scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left right", end: "right left", scrub: true } });
        }
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

  const goTo = (i: number) => {
    const st = stRef.current;
    if (st) {
      const top = st.start + (i / SERVIZI.length) * (st.end - st.start) + 6;
      window.scrollTo({ top, behavior: "smooth" });
    } else {
      document.getElementById(`sv-${i}`)?.scrollIntoView({ behavior: "smooth", inline: "start" });
    }
  };

  return (
    <section ref={root} className="relative overflow-hidden bg-carbon text-paper">
      {/* HUD */}
      <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-5 pt-6 sm:px-8">
        <p className="t-label text-paper/70 mix-blend-difference">I quattro servizi</p>
        <p className="t-label text-paper/70 mix-blend-difference">{String(active + 1).padStart(2, "0")} / {String(SERVIZI.length).padStart(2, "0")}</p>
      </div>

      {/* Hint scorrimento */}
      <div className={`pointer-events-none absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ${hint ? "opacity-100" : "opacity-0"}`}>
        <span className="t-label flex items-center gap-3 bg-ink/70 px-5 py-3 text-paper backdrop-blur-sm">
          Scorri per esplorare <span className="animate-pulse text-giallo">{"->"}</span>
        </span>
      </div>

      <div className="motion-reduce:overflow-x-auto">
        <div ref={track} className="flex w-max motion-reduce:w-auto">
          {SERVIZI.map((s, i) => {
            const campo = s.variant === "campo";
            return (
              <article
                key={s.href}
                id={`sv-${i}`}
                data-variant={s.variant}
                className={`sv-panel relative flex h-[100svh] w-screen shrink-0 items-end overflow-hidden motion-reduce:w-[92vw] ${campo ? "text-paper" : "bg-paper-2 text-ink"}`}
              >
                {campo ? (
                  <>
                    <div className="absolute inset-0">
                      <Image src={s.img} alt={s.titolo} fill quality={90} sizes="100vw" className="sv-img object-cover [filter:saturate(1.18)_contrast(1.05)_brightness(0.97)_sepia(0.16)]" />
                    </div>
                    {/* Color-grade caldo (golden hour) */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-arancio/30 via-arancio/5 to-giallo/15 mix-blend-soft-light" />
                    <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/40 to-carbon/10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-carbon/85 via-transparent to-transparent" />
                    <div className="absolute inset-0 shadow-[inset_0_0_220px_60px_rgba(10,10,11,0.7)]" />
                    <div className="grain absolute inset-0" />
                  </>
                ) : (
                  <>
                    {/* Spotlight studio + ombra a terra: profondità sotto la macchina */}
                    <div className="absolute inset-0 bg-[radial-gradient(65%_55%_at_72%_38%,rgba(255,255,255,0.75),transparent_70%)]" />
                    <div className="absolute bottom-[12%] right-[10%] h-10 w-[42%] rounded-[100%] bg-ink/25 blur-2xl" />
                    <div className="absolute inset-y-0 right-0 w-full lg:w-3/5">
                      <Image src={s.img} alt={s.titolo} fill quality={95} sizes="(max-width: 1024px) 100vw, 60vw" className="sv-img object-contain object-right" />
                    </div>
                  </>
                )}

                {/* Sipario */}
                <div className={`sv-cover absolute inset-0 z-20 ${campo ? "bg-giallo" : "bg-ink"}`} />

                {/* Numero fantasma */}
                <span className={`sv-ghost t-poster pointer-events-none absolute -right-4 top-2 z-0 text-[42vw] leading-none sm:text-[30vw] ${campo ? "text-paper/10" : "text-ink/[0.06]"}`}>{s.n}</span>

                {/* Contenuto */}
                <div className="relative z-10 w-full px-5 pb-16 sm:px-8 lg:max-w-2xl lg:px-16">
                  <span className={`sv-rise t-label ${campo ? "text-giallo" : "text-giallo-deep"}`}>{s.n} · {s.label}</span>
                  <h3 className={`sv-rise t-poster mt-3 text-6xl sm:text-8xl ${campo ? "text-paper" : "text-ink"}`}>{s.titolo}</h3>
                  <p className={`sv-rise mt-5 max-w-md text-lg leading-relaxed ${campo ? "text-paper/80" : "text-ink-soft"}`}>{s.testo}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {s.punti.map((p) => (
                      <li key={p} className={`sv-rise t-label border px-3 py-1.5 ${campo ? "border-paper/30 text-paper/90 backdrop-blur-sm" : "border-ink/25 text-ink"}`}>{p}</li>
                    ))}
                  </ul>
                  <Link href={s.href} className={`sv-rise t-label mt-8 inline-block px-8 py-4 transition-colors ${campo ? "bg-giallo text-ink hover:bg-paper" : "bg-carbon text-paper hover:bg-giallo hover:text-ink"}`}>
                    Scopri {s.label} {"->"}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Nav capitoli */}
      <div className="absolute inset-x-0 bottom-0 z-30">
        <div className="flex items-stretch">
          {SERVIZI.map((s, i) => (
            <button
              key={s.href}
              onClick={() => goTo(i)}
              aria-label={`Vai a ${s.label}`}
              aria-current={i === active}
              className={`group flex-1 border-t px-3 py-3 text-left transition-colors ${i === active ? "border-giallo bg-ink/70 text-paper" : "border-paper/20 bg-ink/40 text-paper/60 hover:text-paper"}`}
            >
              <span className="t-label block backdrop-blur-sm">{s.n}</span>
              <span className="t-label mt-0.5 hidden backdrop-blur-sm sm:block">{s.label}</span>
            </button>
          ))}
        </div>
        <div className="h-1 bg-paper/15">
          <span ref={bar} className="block h-full origin-left scale-x-0 bg-giallo" />
        </div>
      </div>
    </section>
  );
}
