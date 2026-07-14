import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container, Section, Eyebrow, Badge } from "@/components/ui";
import { ProductGallery } from "@/components/ProductGallery";
import { LeadForm } from "@/components/LeadForm";
import { ProductJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/anim/Reveal";
import { prodotti, prodottoBySlug, categorie } from "@/lib/catalog";

export function generateStaticParams() {
  return prodotti.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = prodottoBySlug(slug);
  if (!p) return { title: "Mezzo non trovato" };
  return {
    title: `${p.nome} — ${categorie[p.categoria].label} ${p.brand}`,
    description: p.descrizione,
  };
}

export default async function ProdottoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = prodottoBySlug(slug);
  if (!p) notFound();

  const correlati = prodotti.filter((x) => x.categoria === p.categoria && x.slug !== p.slug).slice(0, 3);

  return (
    <Section className="bg-surface">
      <ProductJsonLd p={p} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Mezzi", url: "/mezzi" },
          { name: p.nome, url: `/mezzi/${p.slug}` },
        ]}
      />
      <Container>
        <nav className="mb-6 text-sm text-slate" aria-label="breadcrumb">
          <Link href="/mezzi" className="hover:text-ink">Mezzi</Link> <span aria-hidden>/</span>{" "}
          <span className="text-ink">{p.nome}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          <ProductGallery images={p.immagini} alt={p.nome} slug={p.slug} />

          <Reveal x={24} y={0}>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="brand">{p.brand}</Badge>
              <Badge>{categorie[p.categoria].label}</Badge>
              <Badge>{p.condizione}</Badge>
            </div>
            <h1 className="mt-3 text-4xl font-bold">{p.nome}</h1>
            <p className="mt-3 text-slate">{p.descrizione}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {p.applicazioni.map((a) => (
                <span key={a} className="rounded-sm bg-surface-3 px-2.5 py-1 text-sm text-slate-strong">{a}</span>
              ))}
            </div>

            {/* Specifiche tecniche */}
            <div className="mt-8">
              <h2 className="font-display text-xl font-bold">Dati tecnici</h2>
              {p.spec.length > 0 ? (
                <dl className="mt-3 divide-y divide-line rounded-lg border border-line">
                  {p.spec.map((s) => (
                    <div key={s.label} className="flex justify-between gap-4 px-4 py-2.5 text-sm">
                      <dt className="text-slate">{s.label}</dt>
                      <dd className="font-semibold text-ink">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="mt-3 rounded-lg border border-brand-300 bg-brand-50 px-4 py-3 text-sm text-warning">
                  Scheda tecnica completa disponibile su richiesta. Compila il modulo: te la inviamo subito.
                </p>
              )}
            </div>
          </Reveal>
        </div>

        {/* Form contestuale precompilato per modello */}
        <Reveal as="div" className="mt-14 grid gap-8 rounded-lg border border-line bg-surface-2 p-6 sm:p-8 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Eyebrow>Richiedi informazioni</Eyebrow>
            <h2 className="mt-3 text-2xl font-bold">Preventivo per {p.nome}</h2>
            <p className="mt-2 text-slate">
              Acquisto o noleggio, scheda tecnica, disponibilità e sede più vicina. Ti ricontattiamo rapidamente
              e puoi proseguire su WhatsApp.
            </p>
          </div>
          <LeadForm intento="preventivo" modello={p.nome} />
        </Reveal>

        {/* Correlati */}
        {correlati.length > 0 && (
          <Reveal as="div" className="mt-14" stagger={0.08}>
            <h2 className="text-2xl font-bold">Alternative</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              {correlati.map((c) => (
                <Link key={c.slug} data-reveal-item href={`/mezzi/${c.slug}`} className="rounded-lg border border-line p-4 hover:border-graphite-600">
                  <p className="text-xs uppercase text-slate">{categorie[c.categoria].label}</p>
                  <p className="mt-1 font-display font-bold">{c.nome}</p>
                </Link>
              ))}
            </div>
          </Reveal>
        )}
      </Container>
    </Section>
  );
}
