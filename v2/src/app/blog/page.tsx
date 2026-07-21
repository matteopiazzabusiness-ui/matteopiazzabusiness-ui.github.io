import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHead } from "@/components/PageHead";
import { Reveal } from "@/components/Reveal";
import { posts, formatData } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Approfondimenti — guide e consigli sul movimento terra",
  description:
    "Guide pratiche su acquisto e noleggio mezzi, manutenzione, ricambi e scelta della macchina giusta. Il blog tecnico di DLF Macchine.",
};

export default function BlogPage() {
  const [primo, ...resto] = [...posts].sort((a, b) => b.data.localeCompare(a.data));

  return (
    <>
      <PageHead label="Approfondimenti" title="Guide e consigli dal campo">
        Acquisto o noleggio, manutenzione, ricambi, scelta del mezzo: mettiamo per iscritto l&apos;esperienza
        che usiamo ogni giorno per aiutare i clienti a decidere bene.
      </PageHead>

      {/* Articolo in evidenza */}
      <section className="px-5 pb-6 sm:px-8">
        <Link href={`/blog/${primo.slug}`} className="group grid gap-8 border-y border-ink/15 py-8 lg:grid-cols-2">
          <div className="relative aspect-[16/10] overflow-hidden bg-paper-2">
            <Image src={primo.cover} alt={primo.titolo} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <span className="t-label absolute left-3 top-3 bg-giallo px-2 py-1 text-ink">In evidenza</span>
          </div>
          <div className="flex flex-col justify-center">
            <p className="t-label text-ink-soft">{primo.categoria} · {formatData(primo.data)} · {primo.lettura}</p>
            <h2 className="t-poster mt-3 text-4xl text-ink group-hover:text-giallo-deep sm:text-6xl">{primo.titolo}</h2>
            <p className="mt-4 max-w-xl text-ink-soft">{primo.excerpt}</p>
            <span className="t-label mt-6 inline-block text-ink">Leggi l&apos;articolo {"->"}</span>
          </div>
        </Link>
      </section>

      {/* Griglia articoli */}
      <Reveal as="section" className="px-5 pb-24 sm:px-8">
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {resto.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="rv group">
              <div className="relative aspect-[16/10] overflow-hidden bg-paper-2">
                <Image src={p.cover} alt={p.titolo} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <p className="t-label mt-4 text-ink-soft">{p.categoria} · {p.lettura}</p>
              <h3 className="t-poster mt-2 text-3xl text-ink group-hover:text-giallo-deep">{p.titolo}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-ink-soft">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </Reveal>
    </>
  );
}
