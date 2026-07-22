import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
import { Catalogo } from "@/components/Catalogo";
import { Reveal } from "@/components/Reveal";
import { categorie, prodottiByCategoria, type Categoria } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Mezzi movimento terra — Caterpillar e Dieci",
  description:
    "Catalogo mezzi DLF: escavatori, mini escavatori, minipale cingolate e gommate Caterpillar, sollevatori telescopici Dieci. Vendita e noleggio in Sicilia.",
};

export default async function MezziPage({ searchParams }: { searchParams: Promise<{ cat?: string }> }) {
  const { cat } = await searchParams;
  const catKeys = Object.keys(categorie) as Categoria[];
  const initialCat = catKeys.includes(cat as Categoria) ? (cat as Categoria) : "";

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
        <Catalogo initialCat={initialCat} />
      </div>
    </>
  );
}
