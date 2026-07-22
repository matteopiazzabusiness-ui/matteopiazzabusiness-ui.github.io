import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { posts, postBySlug, formatData } from "@/lib/blog";
import { company } from "@/lib/site";
import { HeroMedia } from "@/components/HeroMedia";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = postBySlug(slug);
  if (!p) return {};
  return {
    title: p.titolo,
    description: p.excerpt,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: { type: "article", title: p.titolo, description: p.excerpt, images: [{ url: p.cover }], publishedTime: p.data },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = postBySlug(slug);
  if (!p) notFound();

  const altri = posts.filter((x) => x.slug !== p.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.titolo,
    datePublished: p.data,
    image: `https://dlfmacchine.it${p.cover}`,
    author: { "@type": "Organization", name: company.brand },
    publisher: { "@type": "Organization", name: company.legalName },
    description: p.excerpt,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav aria-label="Percorso" className="bg-paper px-5 pt-28 sm:px-8 sm:pt-32">
        <ol className="t-label flex flex-wrap items-center gap-2 text-ink-soft">
          <li><Link href="/" className="u-line">Home</Link></li>
          <li aria-hidden>/</li>
          <li><Link href="/blog" className="u-line">Approfondimenti</Link></li>
          <li aria-hidden>/</li>
          <li className="text-ink">{p.categoria}</li>
        </ol>
      </nav>

      <header className="bg-paper px-5 pb-10 pt-10 sm:px-8">
        <p className="t-label text-ink-soft">{p.categoria} · {formatData(p.data)} · {p.lettura} di lettura</p>
        <h1 className="t-poster mt-3 max-w-4xl text-5xl text-ink sm:text-7xl">{p.titolo}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">{p.excerpt}</p>
      </header>

      <HeroMedia src={p.cover} alt={p.titolo} priority grade className="mx-5 aspect-[16/8] sm:mx-8" />

      <article className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
        {p.corpo.map((b, i) => {
          if (b.tipo === "h") return <h2 key={i} className="t-poster mt-10 text-3xl text-ink">{b.testo}</h2>;
          if (b.tipo === "lista")
            return (
              <ul key={i} className="mt-5 space-y-2">
                {b.voci.map((v) => (
                  <li key={v} className="flex items-baseline gap-3 text-ink"><span className="text-giallo-deep">—</span>{v}</li>
                ))}
              </ul>
            );
          return <p key={i} className="mt-5 text-lg leading-relaxed text-ink-soft">{b.testo}</p>;
        })}

        <div className="mt-12 border-t border-ink/15 pt-8">
          <p className="t-label text-ink-soft">Un dubbio sul tuo caso specifico?</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/contatti" className="t-label bg-carbon px-8 py-4 text-paper transition-colors hover:bg-giallo hover:text-ink">Parla con noi {"->"}</Link>
            <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noopener noreferrer" className="t-label border border-ink px-8 py-4 text-ink transition-colors hover:bg-ink hover:text-paper">WhatsApp</a>
          </div>
        </div>
      </article>

      <section className="border-t border-ink/15 px-5 py-16 sm:px-8">
        <h2 className="t-poster text-4xl text-ink">Continua a leggere</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {altri.map((a) => (
            <Link key={a.slug} href={`/blog/${a.slug}`} className="group">
              <div className="relative aspect-[16/10] overflow-hidden bg-paper-2">
                <Image src={a.cover} alt={a.titolo} fill sizes="33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <p className="t-label mt-3 text-ink-soft">{a.categoria}</p>
              <h3 className="t-poster mt-1 text-2xl text-ink group-hover:text-giallo-deep">{a.titolo}</h3>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
