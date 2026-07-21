import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHead } from "@/components/PageHead";
import { Reveal } from "@/components/Reveal";
import { settori } from "@/lib/settori";

export const metadata: Metadata = {
  title: "Settori — soluzioni per ogni cantiere",
  description:
    "Edilizia, agricoltura, cave, demolizioni, strade e verde: le soluzioni DLF Macchine per ogni settore, con i mezzi Caterpillar e Dieci consigliati.",
};

export default function SettoriPage() {
  return (
    <>
      <PageHead label="Settori" title="La macchina giusta per il tuo lavoro">
        Ogni settore ha esigenze diverse. Abbiamo mappato il nostro parco Caterpillar e Dieci sui contesti
        reali di lavoro: scegli il tuo e scopri i mezzi, le formule e i servizi pensati per te.
      </PageHead>

      <Reveal as="section" className="px-5 pb-24 sm:px-8">
        <div className="grid gap-px border border-ink/15 bg-ink/15 sm:grid-cols-2">
          {settori.map((s, i) => (
            <Link key={s.slug} href={`/settori/${s.slug}`} className="rv group relative bg-paper p-6 transition-colors hover:bg-white sm:p-8">
              <div className="relative aspect-[16/9] overflow-hidden bg-paper-2">
                <Image src={s.img} alt={s.nome} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="t-label absolute left-3 top-3 bg-paper/90 px-2 py-1 text-ink">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h2 className="t-poster mt-5 text-4xl text-ink group-hover:text-giallo-deep sm:text-5xl">{s.nome}</h2>
              <p className="t-label mt-2 text-ink-soft">{s.tagline}</p>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-soft">{s.intro}</p>
              <span className="t-label mt-5 inline-block text-ink">Scopri le soluzioni {"->"}</span>
            </Link>
          ))}
        </div>
      </Reveal>
    </>
  );
}
