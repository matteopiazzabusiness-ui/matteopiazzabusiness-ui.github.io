"use client";

import { useMemo, useState } from "react";
import { prodotti, categorie, brands, type Categoria } from "@/lib/catalog";
import { ProductCard } from "./ProductCard";
import { track } from "@/lib/analytics";

const catKeys = Object.keys(categorie) as Categoria[];

export function CatalogClient() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Categoria | "all">("all");
  const [brand, setBrand] = useState<string | "all">("all");

  const risultati = useMemo(() => {
    return prodotti.filter((p) => {
      if (cat !== "all" && p.categoria !== cat) return false;
      if (brand !== "all" && p.brand !== brand) return false;
      if (q && !`${p.nome} ${p.descrizione}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [q, cat, brand]);

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      {/* Filtri — dimensioni stabili, accessibili */}
      <aside className="lg:sticky lg:top-20 h-max space-y-6 rounded-lg border border-line p-5">
        <div>
          <label htmlFor="q" className="mb-1 block text-sm font-semibold">Cerca</label>
          <input
            id="q"
            value={q}
            onChange={(e) => { setQ(e.target.value); track("catalog_search", { q: e.target.value }); }}
            placeholder="Modello, es. 306 CR"
            className="w-full rounded-md border border-line px-3 py-2.5 text-sm"
          />
        </div>
        <fieldset>
          <legend className="mb-2 text-sm font-semibold">Categoria</legend>
          <div className="space-y-1">
            <FilterBtn active={cat === "all"} onClick={() => { setCat("all"); track("filter_used", { tipo: "categoria", val: "all" }); }}>Tutte</FilterBtn>
            {catKeys.map((k) => (
              <FilterBtn key={k} active={cat === k} onClick={() => { setCat(k); track("filter_used", { tipo: "categoria", val: k }); }}>
                {categorie[k].label}
              </FilterBtn>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="mb-2 text-sm font-semibold">Marca</legend>
          <div className="space-y-1">
            <FilterBtn active={brand === "all"} onClick={() => setBrand("all")}>Tutte</FilterBtn>
            {brands.map((b) => (
              <FilterBtn key={b} active={brand === b} onClick={() => { setBrand(b); track("filter_used", { tipo: "brand", val: b }); }}>{b}</FilterBtn>
            ))}
          </div>
        </fieldset>
      </aside>

      <div>
        <p className="mb-4 text-sm text-slate" aria-live="polite">{risultati.length} mezzi</p>
        {risultati.length === 0 ? (
          <div className="rounded-lg border border-dashed border-line p-10 text-center text-slate">
            Nessun mezzo per questi filtri. Scrivici: troviamo la macchina giusta.
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {risultati.map((p) => <ProductCard key={p.slug} p={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`block w-full rounded-md px-3 py-2 text-left text-sm transition-colors min-h-[40px] ${
        active ? "bg-ink text-white font-semibold" : "hover:bg-surface-3 text-slate-strong"
      }`}
    >
      {children}
    </button>
  );
}
