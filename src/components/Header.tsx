"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ButtonLink } from "./ui";

const nav = [
  { href: "/mezzi", label: "Mezzi" },
  { href: "/noleggio", label: "Noleggio" },
  { href: "/assistenza", label: "Assistenza" },
  { href: "/ricambi", label: "Ricambi" },
  { href: "/sedi/caltanissetta", label: "Sedi" },
  { href: "/dlf", label: "DLF" },
  { href: "/contatti", label: "Contatti" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 h-16">
        <Link href="/" className="flex items-center gap-2" aria-label="DLF Macchine — home">
          <Image src="/media/brand/dlf_logo.png" alt="DLF Macchine" width={116} height={40} priority className="h-9 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Principale">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="px-3 py-2 text-sm font-medium text-slate-strong hover:text-ink rounded-md hover:bg-surface-3"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <ButtonLink href="/contatti?intento=preventivo">Richiedi preventivo</ButtonLink>
        </div>

        <button
          className="lg:hidden inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-md hover:bg-surface-3"
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-xl" aria-hidden>{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-line bg-surface px-4 pb-4" aria-label="Mobile">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-base font-medium text-ink border-b border-line"
            >
              {n.label}
            </Link>
          ))}
          <ButtonLink href="/contatti?intento=preventivo" className="mt-4 w-full" size="lg">
            Richiedi preventivo
          </ButtonLink>
        </nav>
      )}
    </header>
  );
}
