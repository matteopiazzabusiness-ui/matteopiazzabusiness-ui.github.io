import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHead } from "@/components/PageHead";
import { Reveal } from "@/components/Reveal";
import { FormContatti } from "@/components/FormContatti";
import { prodotti, categorie } from "@/lib/catalog";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Usato garantito — mezzi movimento terra ricondizionati",
  description:
    "Mezzi movimento terra usati, controllati e garantiti da DLF Macchine. Escavatori, minipale e sollevatori d'occasione selezionati in Sicilia.",
};

const garanzie = [
  { t: "Controllati", d: "Ogni mezzo passa dalla nostra officina: verifica meccanica, idraulica e delle ore di lavoro reali." },
  { t: "Garantiti", d: "Vendiamo usato con garanzia: nessuna sorpresa dopo l'acquisto, ricambi originali per gli interventi." },
  { t: "Con storia", d: "Ti diciamo provenienza, impieghi e manutenzioni del mezzo. Trasparenza prima della firma." },
];

const passi = [
  { t: "Dicci cosa cerchi", d: "Categoria, taglia, budget e tipo di lavoro: raccogliamo le tue esigenze." },
  { t: "Ti proponiamo", d: "Selezioniamo dal parco usato disponibile i mezzi che fanno al caso tuo." },
  { t: "Provi e valuti", d: "Verifica del mezzo e, dove possibile, prova su strada prima di decidere." },
  { t: "Formula su misura", d: "Acquisto diretto o leasing: il nostro ufficio costruisce la soluzione giusta." },
];

export default function UsatoPage() {
  const usato = prodotti.filter((p) => p.condizione === "Usato");

  return (
    <>
      <PageHead label="Usato garantito" title="Mezzi d'occasione, sicurezza da concessionaria">
        L&apos;usato giusto è un ottimo affare solo se è controllato e garantito. Selezioniamo, verifichiamo
        e garantiamo ogni mezzo, con la stessa assistenza e gli stessi ricambi originali del nuovo.
      </PageHead>

      {/* Garanzie */}
      <Reveal as="section" className="px-5 py-20 sm:px-8">
        <p className="rv t-label text-ink-soft">Le garanzie</p>
        <h2 className="rv t-poster mt-2 max-w-3xl text-4xl text-ink sm:text-5xl">Usato sì, ma senza sorprese</h2>
        <div className="mt-10 grid gap-x-10 gap-y-8 lg:grid-cols-3">
          {garanzie.map((g, i) => (
            <div key={g.t} className="rv border-t-2 border-ink pt-4">
              <span className="t-label text-giallo-deep">0{i + 1}</span>
              <h3 className="t-poster mt-2 text-3xl text-ink">{g.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{g.d}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Parco usato o disponibilità */}
      <section className="border-t border-ink/15 px-5 py-16 sm:px-8">
        <div className="flex items-baseline justify-between">
          <h2 className="t-poster text-4xl text-ink sm:text-5xl">Disponibilità usato</h2>
          <Link href="/mezzi" className="t-label u-line text-ink-soft">Vedi anche il nuovo {"->"}</Link>
        </div>
        {usato.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {usato.map((p) => (
              <Link key={p.slug} href={`/mezzi/${p.slug}`} className="group">
                <div className="relative aspect-[4/3] overflow-hidden bg-paper-2">
                  {p.immagini[0] && <Image src={p.immagini[0]} alt={p.nome} fill sizes="33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />}
                  <span className="t-label absolute left-2 top-2 bg-giallo px-2 py-0.5 text-ink">Usato</span>
                </div>
                <h3 className="t-poster mt-3 text-2xl text-ink group-hover:text-giallo-deep">{p.nome}</h3>
                <p className="t-label mt-1 text-ink-soft">{categorie[p.categoria].label}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-8 border-2 border-dashed border-ink/25 p-8 sm:p-12">
            <p className="max-w-2xl text-lg leading-relaxed text-ink">
              Il parco usato ruota di continuo: i mezzi migliori vanno via in fretta e non sempre fanno in tempo
              ad arrivare online. <strong>Dicci cosa cerchi</strong> e ti avvisiamo appena entra il mezzo giusto —
              o ti proponiamo subito quello che abbiamo in piazzale.
            </p>
            <a href="#richiesta" className="t-label mt-6 inline-block bg-carbon px-8 py-4 text-paper transition-colors hover:bg-giallo hover:text-ink">
              Dicci cosa cerchi {"->"}
            </a>
          </div>
        )}
      </section>

      {/* Come funziona */}
      <Reveal as="section" className="grain relative bg-carbon px-5 py-20 text-paper sm:px-8">
        <p className="t-label text-giallo">Come funziona</p>
        <h2 className="t-poster mt-2 text-4xl text-paper sm:text-6xl">Dall&apos;esigenza alla consegna</h2>
        <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {passi.map((s, i) => (
            <div key={s.t} className="rv border-t-2 border-paper/30 pt-4">
              <span className="t-label text-giallo">0{i + 1}</span>
              <h3 className="t-poster mt-2 text-2xl text-paper">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-paper/70">{s.d}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Richiesta */}
      <section id="richiesta" className="scroll-mt-24 px-5 py-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="t-label text-ink-soft">Richiesta usato</p>
            <h2 className="t-poster mt-2 text-4xl text-ink sm:text-6xl">Cerchi un mezzo d&apos;occasione?</h2>
            <p className="mt-5 max-w-md text-ink-soft">
              Indica categoria, taglia e budget: attiviamo la ricerca sul parco usato e ti ricontattiamo con
              le proposte disponibili.
            </p>
            <p className="mt-6 t-label text-ink-soft">Oppure chiama</p>
            <div className="mt-2 space-y-1 text-sm text-ink">
              <p><a href="tel:+390934575176" className="u-line">Caltanissetta · 0934 575176</a></p>
              <p><a href="tel:+390958320215" className="u-line">Catania · 095 8320215</a></p>
            </div>
          </div>
          <FormContatti intento="vendita" modello="Ricerca mezzo usato" />
        </div>
      </section>

      <section className="bg-giallo px-5 py-16 sm:px-8">
        <h2 className="t-poster max-w-3xl text-4xl text-ink sm:text-6xl">Hai un usato da valutare in permuta?</h2>
        <p className="mt-4 max-w-xl text-ink/80">Ritiriamo il tuo mezzo in permuta sull&apos;acquisto del nuovo o dell&apos;usato. Mandaci i dati e ti facciamo una valutazione.</p>
        <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noopener noreferrer" className="t-label mt-8 inline-block bg-ink px-8 py-4 text-paper transition-colors hover:bg-carbon">
          Valuta la permuta {"->"}
        </a>
      </section>
    </>
  );
}
