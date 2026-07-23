"use client";

import { useRef } from "react";
import { gsap, useGSAP, reduced } from "@/lib/motion";

/**
 * SCROLL SEQUENCE — sequenza video renderizzata frame per frame su canvas,
 * navigabile con lo scroll (sezione pinnata + scrub). I 72 frame vengono
 * precaricati; lo scroll mappa la progressione sull'indice del frame.
 * Reduce-motion: primo frame statico, nessun pin.
 */

const COUNT = 72;
const frameSrc = (i: number) => `/media/sequence/frame_${String(i + 1).padStart(3, "0")}.jpg`;

export function ScrollSequence() {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const hint = useRef<HTMLDivElement>(null);
  const outro = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cv = canvas.current;
      const sec = root.current;
      if (!cv || !sec) return;
      const ctx = cv.getContext("2d");
      if (!ctx) return;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      const imgs: HTMLImageElement[] = [];
      const state = { f: 0 };

      const draw = (f: number) => {
        const im = imgs[Math.max(0, Math.min(COUNT - 1, Math.round(f)))];
        if (im && im.complete && im.naturalWidth) ctx.drawImage(im, 0, 0, cv.width, cv.height);
      };

      for (let i = 0; i < COUNT; i++) {
        const im = new Image();
        im.src = frameSrc(i);
        if (i === 0) {
          im.onload = () => {
            cv.width = im.naturalWidth;
            cv.height = im.naturalHeight;
            draw(0);
          };
        }
        imgs[i] = im;
      }

      if (reduced()) return;

      // I frame avanzano nell'80% dello scroll pinnato; l'ultimo 20% è la
      // transizione: zoom verso il terreno lanciato + velatura di polvere
      // che diventa la sezione successiva (nessun taglio netto).
      cv.style.transformOrigin = "50% 72%";
      const FRAMES_END = 0.8;

      gsap.to(state, {
        f: COUNT - 1,
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: "+=320%",
          pin: true,
          scrub: 0.4,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            const fp = Math.min(1, p / FRAMES_END);
            draw(fp * (COUNT - 1));
            const o = p <= FRAMES_END ? 0 : (p - FRAMES_END) / (1 - FRAMES_END);
            cv.style.transform = `scale(${1 + o * 0.32})`;
            cv.style.filter = `brightness(${1 - o * 0.25})`;
            if (outro.current) outro.current.style.opacity = String(o);
            if (hint.current) hint.current.style.opacity = String(Math.max(0, 1 - p * 5));
          },
        },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className="flow-pinned relative h-[100svh] w-full overflow-hidden bg-carbon">
      <canvas ref={canvas} className="absolute inset-0 h-full w-full object-cover" />

      {/* Gradiente per leggibilità */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-carbon/70 via-transparent to-carbon/30" />

      {/* Etichetta */}
      <div className="absolute left-5 top-24 z-10 sm:left-8">
        <p className="t-label text-paper/80 mix-blend-difference">DLF Macchine · Sicilia</p>
      </div>

      {/* Hint scorrimento */}
      <div ref={hint} className="pointer-events-none absolute inset-x-0 bottom-10 z-10 flex flex-col items-center gap-3 text-paper">
        <span className="t-poster text-4xl sm:text-6xl">Muoviamo la terra</span>
        <span className="t-label flex items-center gap-2 text-paper/80">Scorri per esplorare <span className="animate-bounce">↓</span></span>
      </div>

      {/* Transizione: velatura di polvere che diventa la pagina successiva */}
      <div ref={outro} aria-hidden className="pointer-events-none absolute inset-0 z-30 bg-paper opacity-0">
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_78%,rgba(255,90,31,0.22),transparent_70%)]" />
        <div className="grain absolute inset-0 opacity-80" />
      </div>
    </section>
  );
}
