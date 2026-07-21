import Link from "next/link";
import Image from "next/image";
import { PageHead } from "@/components/PageHead";
import { Faq } from "@/components/Faq";
import { Reveal } from "@/components/Reveal";
import { company, sedi } from "@/lib/site";
import { categorie, prodottoBySlug, type Categoria } from "@/lib/catalog";
import type { FaqItem } from "@/lib/faq";

export type ServizioProps = {
  label: string;
  title: string;
  intro: string;
  img: string;
  punti: { t: string; d: string }[];
  faq: FaqItem[];
  intento: string;
  /** Passi del processo di servizio (opzionale). */
  processo?: { t: string; d: string }[];
  /** Categorie mezzi collegate a questo servizio (chip verso il catalogo). */
  categorie?: Categoria[];
  /** Slug mezzi in evidenza per il servizio. */
  mezzi?: string[];
  /** Mostra il blocco copertura sedi. */
  copertura?: boolean;
};

/** Landing servizio condivisa: intro, immagine, punti, processo, mezzi, FAQ, copertura, CTA. */
export function Servizio({ label, title, intro, img, punti, faq, intento, processo, categorie: cats, mezzi, copertura }: ServizioProps) {
  const featured = (mezzi ?? []).map((m) => prodottoBySlug(m)).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <PageHead label={label} title={title}>{intro}</PageHead>

      <div className="relative mx-5 aspect-[16/7] overflow-hidden sm:mx-8">
        <Image src={img} alt={title} fill priority sizes="100vw" className="object-cover" />
      </div>

      {/* Punti chiave */}
      <Reveal as="section" className="grid gap-x-10 gap-y-8 px-5 py-20 sm:px-8 lg:grid-cols-3">
        {punti.map((p, i) => (
          <div key={p.t} className="rv border-t-2 border-ink pt-4">
            <span className="t-label text-giallo-deep">0{i + 1}</span>
            <h2 className="t-poster mt-2 text-3xl text-ink">{p.t}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.d}</p>
          </div>
        ))}
      </Reveal>

      {/* Processo */}
      {processo && processo.length > 0 && (
        <Reveal as="section" className="grain relative bg-carbon px-5 py-20 text-paper sm:px-8">
          <p className="t-label text-giallo">Come lavoriamo</p>
          <h2 className="t-poster mt-2 text-4xl text-paper sm:text-6xl">Il processo, passo per passo</h2>
          <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {processo.map((s, i) => (
              <div key={s.t} className="rv border-t-2 border-paper/30 pt-4">
                <span className="t-label text-giallo">0{i + 1}</span>
                <h3 className="t-poster mt-2 text-2xl text-paper">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-paper/70">{s.d}</p>
              </div>
            ))}
          </div>
        </Reveal>
      )}

      {/* Mezzi in evidenza */}
      {featured.length > 0 && (
        <section className="px-5 py-20 sm:px-8">
          <div className="flex items-baseline justify-between">
            <h2 className="t-poster text-4xl text-ink sm:text-5xl">Mezzi per questo servizio</h2>
            <Link href="/mezzi" className="t-label u-line text-ink-soft">Catalogo completo {"->"}</Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <Link key={p.slug} href={`/mezzi/${p.slug}`} className="group">
                <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
                  {p.immagini[0] && <Image src={p.immagini[0]} alt={p.nome} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />}
                </div>
                <h3 className="t-poster mt-3 text-2xl text-ink group-hover:text-giallo-deep">{p.nome}</h3>
                <p className="t-label mt-1 text-ink-soft">{categorie[p.categoria].label}</p>
              </Link>
            ))}
          </div>
          {cats && cats.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {cats.map((c) => (
                <Link key={c} href={`/mezzi?cat=${c}`} className="t-label border border-ink/25 px-4 py-2 text-ink transition-colors hover:bg-ink hover:text-paper">
                  {categorie[c].label} {"->"}
                </Link>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Copertura sedi */}
      {copertura && (
        <section className="border-t border-ink/15 px-5 py-16 sm:px-8">
          <p className="t-label text-ink-soft">Copertura</p>
          <h2 className="t-poster mt-2 text-4xl text-ink sm:text-5xl">Due sedi, tutta la Sicilia</h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {sedi.map((s) => (
              <div key={s.slug} className="border-t-2 border-ink pt-4">
                <p className="t-poster text-2xl text-ink">{s.city} ({s.province})</p>
                <p className="mt-2 text-sm text-ink-soft">{s.street}, {s.zip} {s.city}</p>
                <p className="mt-1 text-sm"><a href={`tel:${s.phone.replace(/\s/g, "")}`} className="u-line">{s.phone}</a></p>
                <p className="t-label mt-3 text-ink-soft">Area: {s.areaServita.join(", ")}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="grain relative bg-carbon px-5 py-20 text-paper sm:px-8">
        <h2 className="t-poster text-4xl text-paper sm:text-5xl">Domande frequenti</h2>
        <div className="mt-8">
          <Faq voci={faq} variant="dark" />
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <Link href={`/contatti?intento=${intento}`} className="t-label bg-giallo px-8 py-4 text-ink transition-colors hover:bg-paper">
            Richiedi informazioni {"->"}
          </Link>
          <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noopener noreferrer" className="t-label border border-paper/40 px-8 py-4 text-paper transition-colors hover:bg-paper hover:text-ink">
            WhatsApp
          </a>
          <Link href="/faq" className="t-label px-8 py-4 text-paper/70 underline underline-offset-4">Tutte le FAQ</Link>
        </div>
      </section>
    </>
  );
}
