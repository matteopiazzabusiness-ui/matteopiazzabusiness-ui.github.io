import Link from "next/link";
import { Container, Section, Eyebrow, ButtonLink, Badge } from "@/components/ui";
import { ProductCard } from "@/components/ProductCard";
import { prodotti } from "@/lib/catalog";
import { company, sedi, marchi, orari } from "@/lib/site";

const intenti = [
  { href: "/mezzi", titolo: "Acquista un mezzo", testo: "Gamma Caterpillar e Dieci, nuovo e usato.", icona: "🚜" },
  { href: "/noleggio", titolo: "Noleggia", testo: "Per luogo, periodo e tipo di lavoro.", icona: "📅" },
  { href: "/assistenza", titolo: "Assistenza", testo: "Officina mobile, riduci il fermo macchina.", icona: "🔧" },
  { href: "/ricambi", titolo: "Ricambi", testo: "Originali, per marca, modello e seriale.", icona: "⚙️" },
];

export default function Home() {
  const inEvidenza = prodotti.filter((p) => p.specVerificate || p.immagini.length > 0).slice(0, 6);

  return (
    <>
      {/* HERO — brand, territorio, 4 intenti immediati. No hero astratta AI. */}
      <section className="relative bg-graphite-950 text-white">
        <div className="absolute inset-0 bg-grid opacity-60" aria-hidden />
        <Container className="relative py-16 sm:py-24">
          <Eyebrow>Movimento terra · Sicilia</Eyebrow>
          <h1 className="mt-4 max-w-3xl text-4xl sm:text-6xl font-extrabold text-white">
            Il tuo partner per il <span className="text-brand">movimento terra</span> in Sicilia
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/70">
            {company.claim} Sedi a Caltanissetta e Misterbianco (Catania).
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/mezzi" size="lg">Sfoglia i mezzi</ButtonLink>
            <ButtonLink href="/contatti?intento=preventivo" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white hover:text-ink">
              Richiedi preventivo
            </ButtonLink>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-2 text-xs text-white/60">
            <Badge tone="brand">Concessionaria Caterpillar</Badge>
            <Badge tone="brand">Concessionaria Dieci</Badge>
            <span className="inline-flex items-center rounded-sm bg-white/10 px-2 py-0.5">{orari.feriali}</span>
          </div>
        </Container>
      </section>

      {/* 4 INTENTI */}
      <Section className="bg-surface">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {intenti.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className="group rounded-lg border border-line bg-surface p-6 transition-colors hover:border-brand hover:bg-brand-50"
              >
                <span className="text-3xl" aria-hidden>{i.icona}</span>
                <h2 className="mt-3 font-display text-xl font-bold">{i.titolo}</h2>
                <p className="mt-1 text-sm text-slate">{i.testo}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-brand-700 group-hover:underline">
                  Vai →
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* MEZZI IN EVIDENZA */}
      <Section className="bg-surface-2">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <div>
              <Eyebrow>Gamma mezzi</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold">Mezzi in evidenza</h2>
            </div>
            <ButtonLink href="/mezzi" variant="ghost">Tutti i mezzi →</ButtonLink>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {inEvidenza.map((p) => (
              <ProductCard key={p.slug} p={p} />
            ))}
          </div>
        </Container>
      </Section>

      {/* PERCHÉ DLF */}
      <Section className="bg-surface">
        <Container>
          <div className="grid gap-8 lg:grid-cols-3">
            {[
              { t: "Un solo partner", d: "Vendita, noleggio, officina mobile, assistenza e ricambi." },
              { t: "Copertura Sicilia", d: "Due sedi operative, competenza per applicazione, non solo marchi." },
              { t: "Meno fermo macchina", d: "Interventi rapidi e ricambi originali per tornare al lavoro." },
            ].map((c) => (
              <div key={c.t} className="border-l-2 border-brand pl-5">
                <h3 className="font-display text-xl font-bold">{c.t}</h3>
                <p className="mt-2 text-slate">{c.d}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* MARCHI */}
      <Section className="bg-graphite-950 text-white/80">
        <Container>
          <Eyebrow>Marchi trattati</Eyebrow>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 font-display text-lg font-bold text-white/50">
            {marchi.map((m) => <span key={m}>{m}</span>)}
          </div>
        </Container>
      </Section>

      {/* SEDI */}
      <Section className="bg-surface">
        <Container>
          <Eyebrow>Le nostre sedi</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold">Vicino a te, in Sicilia</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {sedi.map((s) => (
              <Link key={s.slug} href={`/sedi/${s.slug}`} className="rounded-lg border border-line p-6 hover:border-graphite-600">
                <h3 className="font-display text-xl font-bold">{s.city} <span className="text-slate text-base">({s.province})</span></h3>
                <p className="mt-2 text-sm text-slate">{s.street} · {s.zip} {s.city}</p>
                <p className="mt-1 text-sm font-semibold text-brand-700">{s.phone}</p>
                <p className="mt-3 text-sm text-slate">Area servita: {s.areaServita.join(", ")}</p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
