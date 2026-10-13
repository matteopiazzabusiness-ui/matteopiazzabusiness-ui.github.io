import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHead } from "@/components/PageHead";
import { Catalogo } from "@/components/Catalogo";
import { Reveal } from "@/components/Reveal";
import { categorie, prodottiByCategoria, type Categoria } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Mezzi movimento terra — Caterpillar e Dieci",
  description:
    "Catalogo mezzi DLF: escavatori, mini escavatori, minipale cingolate e gommate Caterpillar, sollevatori telescopici Dieci. Vendita e noleggio in Sicilia.",
};

export default function MezziPage() {
  const catKeys = Object.keys(categorie) as Categoria[];

  return (
    <>
      <PageHead label="Gamma mezzi" title="Il catalogo">
        Escavatori, mini escavatori, minipale e sollevatori telescopici Caterpillar e Dieci. Filtra per
        categoria, marca, condizione e formula — le schede complete dei modelli non ancora dettagliati
        sono disponibili su richiesta, in giornata.
      </PageHead>

      {/* Overview categorie */}
      <Reveal as="section" className="px-5 pb-4 sm:px-8">
        <div className="grid gap-px border border-ink/15 bg-ink/15 sm:grid-cols-2 lg:grid-cols-3">
          {catKeys.map((k) => (
            <a key={k} href="#catalogo" className="rv group bg-paper p-6 transition-colors hover:bg-white">
              <div className="flex items-baseline justify-between">
                <span className="t-label text-ink-soft">{categorie[k].brand}</span>
                <span className="t-label text-ink/30">{String(prodottiByCategoria(k).length).padStart(2, "0")}</span>
              </div>
              <h2 className="t-poster mt-2 text-2xl text-ink group-hover:text-giallo-deep">{categorie[k].label}</h2>
            </a>
          ))}
        </div>
      </Reveal>

      <div id="catalogo" className="scroll-mt-24">
        <Suspense fallback={<p className="px-5 py-8">Caricamento catalogo…</p>}>
          <Catalogo />
        </Suspense>
      </div>
    </>
  );
}
