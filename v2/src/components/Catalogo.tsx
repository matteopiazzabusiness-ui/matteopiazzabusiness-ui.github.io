"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { prodotti, categorie, brands, type Categoria } from "@/lib/catalog";

/** Catalogo filtrabile — griglia editoriale con bordi hairline. */
export function Catalogo() {
  const [cat, setCat] = useState<Categoria | "">("");
  const [brand, setBrand] = useState("");
  const [q, setQ] = useState("");

  const list = useMemo(
    () =>
      prodotti.filter(
        (p) =>
          (!cat || p.categoria === cat) &&
          (!brand || p.brand === brand) &&
          (!q || p.nome.toLowerCase().includes(q.toLowerCase())),
      ),
    [cat, brand, q],
  );

  return (
    <div className="px-5 pb-24 sm:px-8">
      <div className="flex flex-wrap items-center gap-3 py-6">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Cerca modello…"
          aria-label="Cerca modello"
          className="border border-ink/30 bg-transparent px-4 py-3 font-[family-name:var(--font-jet)] text-base uppercase tracking-widest text-ink placeholder:text-ink/40 focus:border-ink"
        />
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value as Categoria | "")}
          aria-label="Filtra per categoria"
          className="cursor-pointer border border-ink/30 bg-transparent px-4 py-3 font-[family-name:var(--font-jet)] text-base uppercase tracking-widest text-ink"
        >
          <option value="">Tutte le categorie</option>
          {Object.entries(categorie).map(([k, v]) => (
            <option key={k} value={k}>{v.label}</option>
          ))}
        </select>
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          aria-label="Filtra per marca"
          className="cursor-pointer border border-ink/30 bg-transparent px-4 py-3 font-[family-name:var(--font-jet)] text-base uppercase tracking-widest text-ink"
        >
          <option value="">Tutte le marche</option>
          {brands.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
        <span className="t-label ml-auto text-ink-soft">{list.length} modelli</span>
      </div>

      <div className="grid grid-cols-1 border-l border-t border-ink/15 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <Link
            key={p.slug}
            href={`/mezzi/${p.slug}`}
            className="group border-b border-r border-ink/15 p-5 transition-colors duration-300 hover:bg-white"
          >
            <div className="flex items-baseline justify-between">
              <span className="t-label text-ink-soft">{categorie[p.categoria].label}</span>
              <span className="t-label text-ink/30">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <div className="relative mt-4 aspect-[4/3] overflow-hidden bg-paper-2">
              {p.immagini[0] && (
                <Image
                  src={p.immagini[0]}
                  alt={p.nome}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
            </div>
            <h2 className="t-poster mt-4 text-3xl text-ink transition-colors group-hover:text-giallo-deep">{p.nome}</h2>
            <p className="mt-1 line-clamp-2 text-sm text-ink-soft">{p.descrizione}</p>
          </Link>
        ))}
      </div>
      {list.length === 0 && (
        <p className="py-20 text-center text-ink-soft">Nessun modello trovato. Prova con altri filtri.</p>
      )}
    </div>
  );
}
