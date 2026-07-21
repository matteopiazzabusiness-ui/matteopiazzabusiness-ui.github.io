import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { settori, settoreBySlug } from "@/lib/settori";
import { categorie, prodottoBySlug, prodottiByCategoria } from "@/lib/catalog";
import { company } from "@/lib/site";
import { PageHead } from "@/components/PageHead";
import { Reveal } from "@/components/Reveal";

export function generateStaticParams() {
  return settori.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = settoreBySlug(slug);
  if (!s) return {};
  return { title: `${s.nome} — soluzioni e mezzi`, description: s.intro.slice(0, 155) };
}

export default async function SettorePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = settoreBySlug(slug);
  if (!s) notFound();

  const modelli = s.modelli.map((m) => prodottoBySlug(m)).filter((p): p is NonNullable<typeof p> => Boolean(p));
  const altri = settori.filter((x) => x.slug !== s.slug);

  return (
    <>
      <nav aria-label="Percorso" className="bg-paper px-5 pt-28 sm:px-8 sm:pt-32">
        <ol className="t-label flex flex-wrap items-center gap-2 text-ink-soft">
          <li><Link href="/" className="u-line">Home</Link></li>
          <li aria-hidden>/</li>
          <li><Link href="/settori" className="u-line">Settori</Link></li>
          <li aria-hidden>/</li>
          <li className="text-ink">{s.nome}</li>
        </ol>
      </nav>

      <PageHead label="Settore" title={s.nome}>{s.intro}</PageHead>

      <div className="relative mx-5 aspect-[16/7] overflow-hidden sm:mx-8">
        <Image src={s.img} alt={s.nome} fill priority sizes="100vw" className="object-cover" />
      </div>

      {/* Descrizione + applicazioni */}
      <section className="grid gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="t-label text-ink-soft">Il contesto</p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink">{s.descrizione}</p>
        </div>
        <div>
          <p className="t-label text-ink-soft">Applicazioni tipiche</p>
          <ul className="mt-4 space-y-2">
            {s.applicazioni.map((a) => (
              <li key={a} className="flex items-baseline gap-3 border-b border-ink/15 py-2 text-sm text-ink">
                <span className="text-giallo-deep">—</span>{a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Sfide / come aiutiamo */}
      <Reveal as="section" className="grain relative bg-carbon px-5 py-20 text-paper sm:px-8">
        <p className="t-label text-giallo">Come ti aiutiamo</p>
        <h2 className="t-poster mt-2 text-4xl text-paper sm:text-6xl">Le sfide del settore, risolte</h2>
        <div className="mt-10 grid gap-x-10 gap-y-8 lg:grid-cols-3">
          {s.sfide.map((sf, i) => (
            <div key={sf.t} className="rv border-t-2 border-paper/30 pt-4">
              <span className="t-label text-giallo">0{i + 1}</span>
              <h3 className="t-poster mt-2 text-3xl text-paper">{sf.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-paper/70">{sf.d}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Mezzi consigliati */}
      {modelli.length > 0 && (
        <section className="px-5 py-20 sm:px-8">
          <div className="flex items-baseline justify-between">
            <h2 className="t-poster text-4xl text-ink sm:text-5xl">Mezzi consigliati</h2>
            <Link href="/mezzi" className="t-label u-line text-ink-soft">Catalogo completo {"->"}</Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {modelli.map((p) => (
              <Link key={p.slug} href={`/mezzi/${p.slug}`} className="group">
                <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
                  {p.immagini[0] && (
                    <Image src={p.immagini[0]} alt={p.nome} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  )}
                </div>
                <h3 className="t-poster mt-3 text-2xl text-ink group-hover:text-giallo-deep">{p.nome}</h3>
                <p className="t-label mt-1 text-ink-soft">{categorie[p.categoria].label}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Categorie collegate */}
      <section className="border-t border-ink/15 px-5 py-16 sm:px-8">
        <p className="t-label text-ink-soft">Categorie per questo settore</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {s.categorie.map((c) => (
            <Link key={c} href={`/mezzi?cat=${c}`} className="t-label border border-ink/25 px-4 py-2 text-ink transition-colors hover:bg-ink hover:text-paper">
              {categorie[c].label} ({prodottiByCategoria(c).length})
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-giallo px-5 py-16 sm:px-8">
        <h2 className="t-poster max-w-3xl text-4xl text-ink sm:text-6xl">Parliamo del tuo cantiere nel settore {s.nome.toLowerCase()}</h2>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={`/contatti?intento=vendita`} className="t-label bg-ink px-8 py-4 text-paper transition-colors hover:bg-carbon">
            Richiedi una consulenza {"->"}
          </Link>
          <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noopener noreferrer" className="t-label border border-ink px-8 py-4 text-ink transition-colors hover:bg-ink hover:text-paper">
            WhatsApp
          </a>
        </div>
      </section>

      {/* Altri settori */}
      <section className="px-5 py-16 sm:px-8">
        <p className="t-label text-ink-soft">Altri settori</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {altri.map((a) => (
            <Link key={a.slug} href={`/settori/${a.slug}`} className="t-label border border-ink/25 px-4 py-2 text-ink transition-colors hover:bg-ink hover:text-paper">
              {a.nome} {"->"}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
