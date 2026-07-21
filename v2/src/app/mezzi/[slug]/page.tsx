import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { prodotti, prodottoBySlug, categorie } from "@/lib/catalog";
import { settori } from "@/lib/settori";
import { company } from "@/lib/site";
import { PageHead } from "@/components/PageHead";
import { ProductJsonLd } from "@/components/JsonLd";
import { FormContatti } from "@/components/FormContatti";

export function generateStaticParams() {
  return prodotti.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = prodottoBySlug(slug);
  if (!p) return {};
  return { title: `${p.nome} — ${categorie[p.categoria].label}`, description: p.descrizione.slice(0, 155) };
}

const FORMULA_LABEL: Record<string, string> = { vendita: "In vendita", noleggio: "A noleggio", assistenza: "Assistenza", ricambi: "Ricambi" };

export default async function ProdottoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = prodottoBySlug(slug);
  if (!p) notFound();

  const stessaCat = prodotti.filter((x) => x.categoria === p.categoria);
  const idx = stessaCat.findIndex((x) => x.slug === p.slug);
  const prev = idx > 0 ? stessaCat[idx - 1] : stessaCat[stessaCat.length - 1];
  const next = idx < stessaCat.length - 1 ? stessaCat[idx + 1] : stessaCat[0];
  const correlati = stessaCat.filter((x) => x.slug !== p.slug).slice(0, 3);
  const settoriRel = settori.filter((s) => s.categorie.includes(p.categoria)).slice(0, 4);

  return (
    <>
      <ProductJsonLd p={p} />

      {/* Breadcrumb */}
      <nav aria-label="Percorso" className="bg-paper px-5 pt-28 sm:px-8 sm:pt-32">
        <ol className="t-label flex flex-wrap items-center gap-2 text-ink-soft">
          <li><Link href="/" className="u-line">Home</Link></li>
          <li aria-hidden>/</li>
          <li><Link href="/mezzi" className="u-line">Mezzi</Link></li>
          <li aria-hidden>/</li>
          <li><Link href={`/mezzi?cat=${p.categoria}`} className="u-line">{categorie[p.categoria].label}</Link></li>
          <li aria-hidden>/</li>
          <li className="text-ink">{p.nome}</li>
        </ol>
      </nav>

      <PageHead label={`${p.brand} · ${categorie[p.categoria].label}`} title={p.nome}>
        {p.descrizione}
      </PageHead>

      <div className="grid gap-10 px-5 pb-16 sm:px-8 lg:grid-cols-2">
        {/* Galleria */}
        <div>
          <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
            {p.immagini[0] && (
              <Image src={p.immagini[0]} alt={p.nome} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            )}
            <span className="t-label absolute left-3 top-3 bg-giallo px-2 py-1 text-ink">{p.condizione}</span>
          </div>
          {p.immagini.length > 1 && (
            <div className="mt-3 grid grid-cols-3 gap-3">
              {p.immagini.slice(1, 4).map((src) => (
                <div key={src} className="relative aspect-[4/3] overflow-hidden bg-paper-2">
                  <Image src={src} alt={p.nome} fill sizes="20vw" className="object-cover" />
                </div>
              ))}
            </div>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            {p.formule.map((f) => (
              <span key={f} className="t-label border border-ink/25 px-3 py-1.5 text-ink">{FORMULA_LABEL[f] ?? f}</span>
            ))}
          </div>
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

          {settoriRel.length > 0 && (
            <>
              <h2 className="t-label mt-10 text-ink-soft">Settori d&apos;impiego</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {settoriRel.map((s) => (
                  <Link key={s.slug} href={`/settori/${s.slug}`} className="t-label border border-ink/25 px-3 py-1.5 text-ink transition-colors hover:bg-ink hover:text-paper">
                    {s.nome} {"->"}
                  </Link>
                ))}
              </div>
            </>
          )}

          <div className="mt-12 flex flex-wrap gap-3">
            <a href="#preventivo" className="t-label bg-carbon px-8 py-4 text-paper transition-colors hover:bg-giallo hover:text-ink">
              Richiedi preventivo {"->"}
            </a>
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

      {/* Preventivo inline */}
      <section id="preventivo" className="grain relative scroll-mt-24 bg-carbon px-5 py-20 text-paper sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="t-label text-giallo">Preventivo su {p.nome}</p>
            <h2 className="t-poster mt-2 text-4xl text-paper sm:text-6xl">Chiedi disponibilità e prezzo</h2>
            <p className="mt-5 max-w-md text-paper/70">
              Dicci se ti interessa in vendita o a noleggio: ti rispondiamo in giornata lavorativa con
              disponibilità, tempi e la scheda tecnica completa.
            </p>
            <div className="mt-8 space-y-1 text-sm text-paper/60">
              <p>Caltanissetta · <a href="tel:+390934575176" className="u-line">0934 575176</a></p>
              <p>Catania · <a href="tel:+390958320215" className="u-line">095 8320215</a></p>
            </div>
          </div>
          <div className="bg-paper p-6 text-ink sm:p-8">
            <FormContatti intento="vendita" modello={p.nome} />
          </div>
        </div>
      </section>

      {/* Prev / Next */}
      <nav aria-label="Altri modelli" className="grid border-y border-ink/15 sm:grid-cols-2">
        <Link href={`/mezzi/${prev.slug}`} className="group flex items-center gap-4 border-b border-ink/15 p-6 hover:bg-white sm:border-b-0 sm:border-r">
          <span className="t-poster text-3xl text-ink/30 group-hover:text-giallo-deep">{"<-"}</span>
          <span>
            <span className="t-label block text-ink-soft">Precedente</span>
            <span className="t-poster text-2xl text-ink">{prev.nome}</span>
          </span>
        </Link>
        <Link href={`/mezzi/${next.slug}`} className="group flex items-center justify-end gap-4 p-6 text-right hover:bg-white">
          <span>
            <span className="t-label block text-ink-soft">Successivo</span>
            <span className="t-poster text-2xl text-ink">{next.nome}</span>
          </span>
          <span className="t-poster text-3xl text-ink/30 group-hover:text-giallo-deep">{"->"}</span>
        </Link>
      </nav>

      {correlati.length > 0 && (
        <div className="px-5 py-16 sm:px-8">
          <div className="flex items-baseline justify-between">
            <h2 className="t-poster text-4xl text-ink">Nella stessa categoria</h2>
            <Link href="/mezzi" className="t-label u-line text-ink-soft">Tutto il catalogo {"->"}</Link>
          </div>
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
