import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { settori } from "@/lib/settori";

/** Teaser settori in home — porta al nuovo hub /settori. */
export function SettoriTeaser() {
  return (
    <Reveal as="section" className="flow-flat bg-paper px-5 py-24 sm:px-8">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="t-label text-ink-soft">Settori</p>
          <h2 className="t-poster mt-2 max-w-2xl text-5xl text-ink sm:text-7xl">Una soluzione per ogni cantiere</h2>
        </div>
        <Link href="/settori" className="t-label u-line hidden shrink-0 text-ink-soft sm:block">Tutti i settori {"->"}</Link>
      </div>

      <div className="mt-10 grid gap-px border border-ink/15 bg-ink/15 sm:grid-cols-2 lg:grid-cols-3">
        {settori.map((s) => (
          <Link key={s.slug} href={`/settori/${s.slug}`} className="rv group bg-paper p-6 transition-colors hover:bg-white">
            <div className="relative aspect-[16/10] overflow-hidden bg-paper-2">
              <Image src={s.img} alt={s.nome} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <h3 className="t-poster mt-4 text-2xl text-ink group-hover:text-giallo-deep">{s.nome}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-ink-soft">{s.tagline}</p>
          </Link>
        ))}
      </div>
    </Reveal>
  );
}
