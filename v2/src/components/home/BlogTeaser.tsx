import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { posts, formatData } from "@/lib/blog";

/** Teaser approfondimenti in home — ultimi 3 articoli. */
export function BlogTeaser() {
  const ultimi = [...posts].sort((a, b) => b.data.localeCompare(a.data)).slice(0, 3);

  return (
    <Reveal as="section" className="grain relative bg-carbon px-5 py-24 text-paper sm:px-8">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="t-label text-giallo">Approfondimenti</p>
          <h2 className="t-poster mt-2 max-w-2xl text-5xl text-paper sm:text-7xl">Guide e consigli dal campo</h2>
        </div>
        <Link href="/blog" className="t-label u-line hidden shrink-0 text-paper/70 sm:block">Tutti gli articoli {"->"}</Link>
      </div>

      <div className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-3">
        {ultimi.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="rv group">
            <div className="relative aspect-[16/10] overflow-hidden bg-carbon-700">
              <Image src={p.cover} alt={p.titolo} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <p className="t-label mt-4 text-paper/50">{p.categoria} · {formatData(p.data)}</p>
            <h3 className="t-poster mt-2 text-2xl text-paper group-hover:text-giallo">{p.titolo}</h3>
            <p className="mt-2 line-clamp-2 text-sm text-paper/60">{p.excerpt}</p>
          </Link>
        ))}
      </div>
    </Reveal>
  );
}
