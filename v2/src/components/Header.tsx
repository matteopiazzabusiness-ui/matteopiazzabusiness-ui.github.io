"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const nav = [
  { href: "/mezzi", label: "Mezzi", n: "01" },
  { href: "/noleggio", label: "Noleggio", n: "02" },
  { href: "/assistenza", label: "Assistenza", n: "03" },
  { href: "/ricambi", label: "Ricambi", n: "04" },
  { href: "/dlf", label: "Chi siamo", n: "05" },
  { href: "/contatti", label: "Contatti", n: "06" },
];

/**
 * Header v2 — barra minimale mix-blend che si inverte sulle sezioni scure,
 * menu overlay a tutto schermo con voci poster numerate.
 */
export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", open);
    return () => document.documentElement.classList.remove("lenis-stopped");
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
        <div className="flex items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-3 text-white" onClick={() => setOpen(false)}>
            <Image src="/media/brand/dlf_logo.png" alt="DLF Macchine" width={44} height={44} className="h-10 w-auto brightness-0 invert" />
            <span className="t-label hidden sm:block">Movimento terra · Sicilia</span>
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Chiudi menu" : "Apri menu"}
            className="t-label flex cursor-pointer items-center gap-3 text-white"
          >
            {open ? "Chiudi" : "Menu"}
            <span className="relative block h-3 w-7">
              <span className={`absolute left-0 top-0 h-0.5 w-full bg-current transition-transform duration-300 ${open ? "top-1/2 -translate-y-1/2 rotate-45" : ""}`} />
              <span className={`absolute bottom-0 left-0 h-0.5 w-full bg-current transition-transform duration-300 ${open ? "bottom-1/2 translate-y-1/2 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </header>

      {/* Overlay menu */}
      <div
        className={`fixed inset-0 z-40 bg-carbon text-paper transition-[clip-path] duration-700 [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] ${
          open ? "[clip-path:inset(0_0_0%_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
        aria-hidden={!open}
      >
        <nav className="flex h-full flex-col justify-center px-6 sm:px-16">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`group flex items-baseline gap-4 border-b border-paper/10 py-2 transition-all duration-500 sm:gap-8 ${
                open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${150 + i * 60}ms` : "0ms" }}
            >
              <span className="t-label text-giallo">{item.n}</span>
              <span className="t-poster text-5xl text-paper transition-colors duration-300 group-hover:text-giallo sm:text-7xl">
                {item.label}
              </span>
            </Link>
          ))}
          <div className="mt-10 flex flex-wrap gap-x-10 gap-y-2">
            <a href="tel:+390934575176" className="t-label u-line text-paper/60">Caltanissetta 0934 575176</a>
            <a href="tel:+390958320215" className="t-label u-line text-paper/60">Catania 095 8320215</a>
            <a href="mailto:info@dlfmacchine.it" className="t-label u-line text-paper/60">info@dlfmacchine.it</a>
          </div>
        </nav>
      </div>
    </>
  );
}
