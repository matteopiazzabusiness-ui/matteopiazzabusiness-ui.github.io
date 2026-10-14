"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { SelectionLink } from "@/components/discovery/ProductActions";

const nav = [
  { href: "/", label: "Home", n: "01" },
  { href: "/mezzi", label: "Mezzi", n: "02" },
  { href: "/settori", label: "Settori", n: "03" },
  { href: "/noleggio", label: "Noleggio", n: "04" },
  { href: "/assistenza", label: "Assistenza", n: "05" },
  { href: "/ricambi", label: "Ricambi", n: "06" },
  { href: "/usato", label: "Usato", n: "07" },
  { href: "/dlf", label: "Chi siamo", n: "08" },
  { href: "/contatti", label: "Contatti", n: "09" },
];

const navSecondaria = [
  { href: "/scegli", label: "Trova il tuo mezzo" },
  { href: "/selezione", label: "La tua selezione" },
  { href: "/richiesta", label: "Richiesta guidata" },
  { href: "/blog", label: "Approfondimenti" },
  { href: "/faq", label: "FAQ" },
];

/**
 * Header v2 — barra minimale mix-blend che si inverte sulle sezioni scure,
 * menu overlay a tutto schermo con voci poster numerate.
 */
export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", open);
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { document.documentElement.classList.remove("lenis-stopped"); window.removeEventListener("keydown", onKey); };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="flex items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <Image src="/media/brand/dlf_logo.png" alt="DLF Macchine" width={378} height={207} priority className="h-11 w-auto drop-shadow-sm sm:h-12" />
            <span className="t-label hidden text-ink/60 sm:block">Movimento terra · Sicilia</span>
          </Link>
          <div className="dlf-header-actions">
          <Link href="/scegli" onClick={() => setOpen(false)} className="dlf-header-finder">Trova il tuo mezzo ↗</Link>
          <SelectionLink />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Chiudi menu" : "Apri menu"}
            data-magnetic
            className="t-label flex cursor-pointer items-center gap-3 rounded-full bg-carbon/85 px-5 py-2.5 text-paper ring-1 ring-paper/15 backdrop-blur-md transition-colors hover:bg-carbon"
          >
            {open ? "Chiudi" : "Menu"}
            <span className="relative block h-3 w-7">
              <span className={`absolute left-0 top-0 h-0.5 w-full bg-current transition-transform duration-300 ${open ? "top-1/2 -translate-y-1/2 rotate-45" : ""}`} />
              <span className={`absolute bottom-0 left-0 h-0.5 w-full bg-current transition-transform duration-300 ${open ? "bottom-1/2 translate-y-1/2 -rotate-45" : ""}`} />
            </span>
          </button>
          </div>
        </div>
      </header>

      {/* Overlay menu */}
      <div
        className={`fixed inset-0 z-40 bg-carbon text-paper transition-[clip-path] duration-700 [transition-timing-function:cubic-bezier(0.76,0,0.24,1)] ${
          open ? "[clip-path:inset(0_0_0%_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
        aria-hidden={!open}
        inert={!open}
      >
        <nav className="flex h-full flex-col overflow-y-auto px-6 pb-6 pt-24 sm:justify-center sm:px-16" data-lenis-prevent>
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`group flex items-baseline gap-4 border-b border-paper/10 py-1 transition-all duration-500 sm:gap-8 ${
                open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${110 + i * 40}ms` : "0ms" }}
            >
              <span className="t-label text-giallo">{item.n}</span>
              <span className="t-poster text-3xl text-paper transition-colors duration-300 group-hover:text-giallo sm:text-5xl">
                {item.label}
              </span>
            </Link>
          ))}
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
            {navSecondaria.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="t-label u-line text-paper/80">
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-x-10 gap-y-2">
            <a href="tel:+390934575176" className="t-label u-line text-paper/60">Caltanissetta 0934 575176</a>
            <a href="tel:+390958320215" className="t-label u-line text-paper/60">Catania 095 8320215</a>
            <a href="mailto:info@dlfmacchine.it" className="t-label u-line text-paper/60">info@dlfmacchine.it</a>
          </div>
        </nav>
      </div>
    </>
  );
}
