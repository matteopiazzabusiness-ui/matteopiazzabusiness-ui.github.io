import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { prodotti, prodottoBySlug, categorie } from "@/lib/catalog";
import { company } from "@/lib/site";
import { PageHead } from "@/components/PageHead";
import { ProductJsonLd } from "@/components/JsonLd";

export function generateStaticParams() {
  return prodotti.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = prodottoBySlug(slug);
  if (!p) return {};
  return { title: `${p.nome} — ${categorie[p.categoria].label}`, description: p.descrizione.slice(0, 155) };
}

export default async function ProdottoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = prodottoBySlug(slug);
  if (!p) notFound();

  const correlati = prodotti.filter((x) => x.categoria === p.categoria && x.slug !== p.slug).slice(0, 3);

  return (
    <>
      <ProductJsonLd p={p} />
      <PageHead label={`${p.brand} · ${categorie[p.categoria].label}`} title={p.nome}>
        {p.descrizione}
      </PageHead>

      <div className="grid gap-10 px-5 pb-16 sm:px-8 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
          {p.immagini[0] && (
            <Image src={p.immagini[0]} alt={p.nome} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          )}
          <span className="t-label absolute left-3 top-3 bg-giallo px-2 py-1 text-ink">{p.condizione}</span>
        </div>

        <div>
          <h2 className="t-label text-ink-soft">Specifiche</h2>
          <dl className="mt-4">
            {p.spec.map((s) => (
              <div key={s.label} className="flex justify-between gap-6 border-b border-ink/15 py-3">
                <dt className="text-sm text-ink-soft">{s.label}</dt>
                <dd className="font-[family-name:var(--font-jet)] text-sm font-semibold text-ink">{s.value}</dd>
              </div>
            ))}
          </dl>
          {!p.specVerificate && (
            <p className="mt-4 text-sm text-ink-soft">
              Scheda tecnica completa disponibile su richiesta — contattaci e te la inviamo in giornata.
            </p>
          )}

          <h2 className="t-label mt-10 text-ink-soft">Applicazioni</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {p.applicazioni.map((a) => (
              <span key={a} className="t-label border border-ink/25 px-3 py-1.5 text-ink">{a}</span>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <Link
              href={`/contatti?intento=vendita&modello=${encodeURIComponent(p.nome)}`}
              className="t-label bg-carbon px-8 py-4 text-paper transition-colors hover:bg-giallo hover:text-ink"
            >
              Richiedi preventivo {"->"}
            </Link>
            <a
              href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(`Salve, vorrei informazioni su ${p.nome}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="t-label border border-ink px-8 py-4 text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {correlati.length > 0 && (
        <div className="border-t border-ink/15 px-5 py-16 sm:px-8">
          <h2 className="t-poster text-4xl text-ink">Nella stessa categoria</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {correlati.map((c) => (
              <Link key={c.slug} href={`/mezzi/${c.slug}`} className="group">
                <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
                  {c.immagini[0] && (
                    <Image src={c.immagini[0]} alt={c.nome} fill sizes="33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  )}
                </div>
                <h3 className="t-poster mt-3 text-2xl text-ink group-hover:text-giallo-deep">{c.nome}</h3>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
