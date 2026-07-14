import type { Metadata } from "next";
import { Container, Section, Eyebrow } from "@/components/ui";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { company, valori, marchi, sedi } from "@/lib/site";

export const metadata: Metadata = {
  title: "Chi è DLF Macchine — concessionaria movimento terra in Sicilia",
  description:
    "DLF S.r.l., concessionaria Caterpillar e Dieci per il movimento terra in Sicilia. Due sedi, un team dedicato a vendita, noleggio, assistenza e ricambi.",
};

export default function DlfPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "DLF", url: "/dlf" }]} />
      <section className="bg-graphite-950 text-white">
        <Container className="py-16 sm:py-20">
          <Eyebrow>Chi siamo</Eyebrow>
          <h1 className="mt-4 max-w-3xl text-4xl sm:text-5xl font-extrabold text-white">
            Concessionaria per il movimento terra in Sicilia
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/70">
            {company.legalName} è concessionaria Caterpillar e Dieci con due sedi operative in Sicilia. Vendita,
            noleggio, assistenza e ricambi con un unico partner. Guidata dal CEO Delfino Maria La Ferla.
          </p>
        </Container>
      </section>

      <Section className="bg-surface">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {valori.map((v) => (
              <div key={v.titolo} className="border-t-2 border-brand pt-4">
                <h2 className="font-display text-lg font-bold">{v.titolo}</h2>
                <p className="mt-2 text-sm text-slate">{v.testo}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-surface-2">
        <Container>
          <div className="grid gap-10 lg:grid-cols-3">
            <div>
              <Eyebrow>Dati societari</Eyebrow>
              <dl className="mt-4 space-y-2 text-sm">
                <Row k="Ragione sociale" v={company.legalName} />
                <Row k="P.IVA" v={company.vat} />
                <Row k="REA" v={company.rea} />
                <Row k="Capitale sociale" v={company.capital} />
                <Row k="PEC" v={company.pec} />
              </dl>
            </div>
            <div>
              <Eyebrow>Sedi</Eyebrow>
              <ul className="mt-4 space-y-3 text-sm text-slate-strong">
                {sedi.map((s) => (
                  <li key={s.slug}>
                    <strong>{s.city}</strong> — {s.street}, {s.zip} {s.city} ({s.province})
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Eyebrow>Marchi trattati</Eyebrow>
              <div className="mt-4 flex flex-wrap gap-2 text-sm">
                {marchi.map((m) => (
                  <span key={m} className="rounded-sm bg-surface-3 px-2.5 py-1 text-slate-strong">{m}</span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-line pb-1.5">
      <dt className="text-slate">{k}</dt>
      <dd className="font-semibold text-ink">{v}</dd>
    </div>
  );
}
