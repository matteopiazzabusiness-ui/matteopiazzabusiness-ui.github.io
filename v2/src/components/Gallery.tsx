"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/** Galleria mezzo con lightbox — miniature + overlay a schermo intero, tastiera. */
export function Gallery({ images, alt, condizione }: { images: string[]; alt: string; condizione: string }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const has = images.length > 0;

  const go = (d: number) => setActive((i) => (i + d + images.length) % images.length);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.documentElement.classList.add("lenis-stopped");
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("lenis-stopped");
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, images.length]);

  return (
    <>
      <button
        type="button"
        onClick={() => has && setOpen(true)}
        aria-label="Ingrandisci immagine"
        className="group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden bg-paper-2"
      >
        {has && <Image src={images[active]} alt={alt} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />}
        <span className="t-label absolute left-3 top-3 bg-giallo px-2 py-1 text-ink">{condizione}</span>
        <span className="t-label absolute bottom-3 right-3 bg-ink/80 px-2 py-1 text-paper opacity-0 transition-opacity group-hover:opacity-100">Ingrandisci +</span>
      </button>

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Immagine ${i + 1}`}
              aria-current={i === active}
              className={`relative aspect-[4/3] overflow-hidden bg-paper-2 transition-opacity ${i === active ? "ring-2 ring-ink" : "opacity-70 hover:opacity-100"}`}
            >
              <Image src={src} alt={`${alt} — vista ${i + 1}`} fill sizes="20vw" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Galleria ${alt}`}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-carbon/95 p-4"
          onClick={() => setOpen(false)}
        >
          <button type="button" onClick={() => setOpen(false)} aria-label="Chiudi" className="t-label absolute right-4 top-4 cursor-pointer px-4 py-2 text-paper">
            Chiudi ✕
          </button>
          <div className="relative h-[80vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image src={images[active]} alt={alt} fill sizes="90vw" className="object-contain" />
          </div>
          {images.length > 1 && (
            <>
              <button type="button" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Precedente" className="t-poster absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer px-4 text-4xl text-paper hover:text-giallo">{"<"}</button>
              <button type="button" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Successiva" className="t-poster absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer px-4 text-4xl text-paper hover:text-giallo">{">"}</button>
              <span className="t-label absolute bottom-4 left-1/2 -translate-x-1/2 text-paper/70">{active + 1} / {images.length}</span>
            </>
          )}
        </div>
      )}
    </>
  );
}
