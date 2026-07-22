"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { prodotti, categorie, brands, type Categoria, type Intento } from "@/lib/catalog";

type Ordine = "cat" | "az" | "za";

const CONDIZIONI = ["Nuovo", "Usato"] as const;
const FORMULE: { v: Intento; l: string }[] = [
  { v: "vendita", l: "In vendita" },
  { v: "noleggio", l: "A noleggio" },
];

/** Catalogo filtrabile — chip categorie, filtri combinati, ricerca e ordinamento. */
export function Catalogo({ initialCat = "" }: { initialCat?: Categoria | "" }) {
  const [cat, setCat] = useState<Categoria | "">(initialCat);
  const [brand, setBrand] = useState("");
  const [cond, setCond] = useState("");
  const [formula, setFormula] = useState<Intento | "">("");
  const [q, setQ] = useState("");
  const [ord, setOrd] = useState<Ordine>("cat");

  const catKeys = Object.keys(categorie) as Categoria[];

  const list = useMemo(() => {
    const filtered = prodotti.filter(
      (p) =>
        (!cat || p.categoria === cat) &&
        (!brand || p.brand === brand) &&
        (!cond || p.condizione === cond) &&
        (!formula || p.formule.includes(formula)) &&
        (!q || p.nome.toLowerCase().includes(q.toLowerCase())),
    );
    const sorted = [...filtered];
    if (ord === "az") sorted.sort((a, b) => a.nome.localeCompare(b.nome));
    else if (ord === "za") sorted.sort((a, b) => b.nome.localeCompare(a.nome));
    else sorted.sort((a, b) => a.categoria.localeCompare(b.categoria) || a.nome.localeCompare(b.nome));
    return sorted;
  }, [cat, brand, cond, formula, q, ord]);

  const attivi = [cat, brand, cond, formula, q].filter(Boolean).length;
  const reset = () => { setCat(""); setBrand(""); setCond(""); setFormula(""); setQ(""); };

  const selectCls =
    "cursor-pointer border border-ink/30 bg-transparent px-4 py-3 font-[family-name:var(--font-jet)] text-sm uppercase tracking-widest text-ink focus:border-ink";

  return (
    <div className="px-5 pb-24 sm:px-8">
      {/* Chip categorie */}
      <div className="flex flex-wrap gap-2 border-b border-ink/15 py-6">
        <button
          onClick={() => setCat("")}
          aria-pressed={cat === ""}
          className={`t-label cursor-pointer border px-4 py-2 transition-colors ${cat === "" ? "border-ink bg-ink text-paper" : "border-ink/25 text-ink hover:border-ink"}`}
        >
          Tutte
        </button>
        {catKeys.map((k) => (
          <button
            key={k}
            onClick={() => setCat(k)}
            aria-pressed={cat === k}
            className={`t-label cursor-pointer border px-4 py-2 transition-colors ${cat === k ? "border-ink bg-ink text-paper" : "border-ink/25 text-ink hover:border-ink"}`}
          >
            {categorie[k].label}
          </button>
        ))}
      </div>

      {/* Barra filtri */}
      <div className="flex flex-wrap items-center gap-3 py-6">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Cerca modello…"
          aria-label="Cerca modello"
          className="grow border border-ink/30 bg-transparent px-4 py-3 font-[family-name:var(--font-jet)] text-sm uppercase tracking-widest text-ink placeholder:text-ink/40 focus:border-ink sm:grow-0"
        />
        <select value={brand} onChange={(e) => setBrand(e.target.value)} aria-label="Filtra per marca" className={selectCls}>
          <option value="">Tutte le marche</option>
          {brands.map((b) => <option key={b} value={b}>{b}</option>)}
        </select>
        <select value={cond} onChange={(e) => setCond(e.target.value)} aria-label="Filtra per condizione" className={selectCls}>
          <option value="">Nuovo e usato</option>
          {CONDIZIONI.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={formula} onChange={(e) => setFormula(e.target.value as Intento | "")} aria-label="Filtra per formula" className={selectCls}>
          <option value="">Vendita e noleggio</option>
          {FORMULE.map((f) => <option key={f.v} value={f.v}>{f.l}</option>)}
        </select>
        <select value={ord} onChange={(e) => setOrd(e.target.value as Ordine)} aria-label="Ordina" className={selectCls}>
          <option value="cat">Ordina: categoria</option>
          <option value="az">Ordina: A → Z</option>
          <option value="za">Ordina: Z → A</option>
        </select>
        {attivi > 0 && (
          <button onClick={reset} className="t-label cursor-pointer text-giallo-deep underline underline-offset-4">
            Azzera filtri ({attivi})
          </button>
        )}
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
                  quality={90}
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <span className="t-label absolute left-2 top-2 bg-paper/90 px-2 py-0.5 text-ink">{p.condizione}</span>
            </div>
            <h2 className="t-poster mt-4 text-3xl text-ink transition-colors group-hover:text-giallo-deep">{p.nome}</h2>
            <p className="mt-1 line-clamp-2 text-sm text-ink-soft">{p.descrizione}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.formule.map((f) => (
                <span key={f} className="t-label border border-ink/20 px-2 py-0.5 text-ink-soft">{f}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
      {list.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-ink-soft">Nessun modello trovato con questi filtri.</p>
          <button onClick={reset} className="t-label mt-4 cursor-pointer bg-ink px-6 py-3 text-paper">Azzera filtri</button>
        </div>
      )}
    </div>
  );
}
