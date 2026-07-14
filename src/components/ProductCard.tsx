import Link from "next/link";
import type { Prodotto } from "@/lib/catalog";
import { categorie } from "@/lib/catalog";
import { ProductImage } from "./ProductImage";
import { Badge } from "./ui";

export function ProductCard({ p }: { p: Prodotto }) {
  return (
    <Link
      href={`/mezzi/${p.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-line bg-surface transition-colors hover:border-graphite-600"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-3">
        <ProductImage src={p.immagini[0]} alt={p.nome} />
        <span className="absolute left-2 top-2">
          <Badge tone="brand">{p.brand}</Badge>
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate">
          {categorie[p.categoria].label}
        </p>
        <h3 className="mt-1 font-display text-lg font-bold text-ink">{p.nome}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-slate">{p.descrizione}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {p.formule.includes("vendita") && <Badge>Vendita</Badge>}
          {p.formule.includes("noleggio") && <Badge>Noleggio</Badge>}
          {!p.specVerificate && <Badge tone="warn">Scheda su richiesta</Badge>}
        </div>
        <span className="mt-4 text-sm font-semibold text-brand-700 group-hover:underline">
          Vedi scheda →
        </span>
      </div>
    </Link>
  );
}
