import type { Metadata } from "next";
import { Container, Section, Eyebrow } from "@/components/ui";
import { LeadForm } from "@/components/LeadForm";
import { sedi, orari, company } from "@/lib/site";
import type { Intento } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Contatti — DLF Macchine",
  description: "Contatta DLF Macchine: sedi di Caltanissetta e Misterbianco (Catania). Vendita, noleggio, assistenza e ricambi movimento terra.",
};

const validIntenti = ["vendita", "noleggio", "assistenza", "ricambi", "preventivo"];

export default async function ContattiPage({
  searchParams,
}: {
  searchParams: Promise<{ intento?: string }>;
}) {
  const sp = await searchParams;
  const intento = (validIntenti.includes(sp.intento ?? "") ? sp.intento : "preventivo") as Intento | "preventivo";

  return (
    <Section className="bg-surface">
      <Container>
        <Eyebrow>Contatti</Eyebrow>
        <h1 className="mt-3 text-4xl font-bold">Parliamo del tuo lavoro</h1>
        <p className="mt-3 max-w-2xl text-slate">
          Vendita, noleggio, assistenza o ricambi: scrivici e ti indirizziamo al reparto e alla sede giusta.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-6">
            {sedi.map((s) => (
              <div key={s.slug} className="rounded-lg border border-line p-5">
                <h2 className="font-display text-lg font-bold">{s.city} ({s.province})</h2>
                <address className="mt-2 not-italic text-sm text-slate-strong space-y-1">
                  <p>{s.street}, {s.zip} {s.city}</p>
                  <p><a href={`tel:${s.phone.replace(/\s/g, "")}`} className="font-semibold text-brand-700">{s.phone}</a> · <a href={`tel:${s.mobile.replace(/\s/g, "")}`} className="font-semibold text-brand-700">{s.mobile}</a></p>
                  <p><a href={`mailto:${s.email}`} className="text-brand-700">{s.email}</a></p>
                </address>
              </div>
            ))}
            <div className="rounded-lg bg-surface-2 p-5 text-sm text-slate-strong">
              <p>{orari.feriali}</p>
              <p>{orari.sabato}</p>
              <p className="mt-2">PEC: {company.pec}</p>
            </div>
          </div>

          <div className="rounded-lg border border-line bg-surface-2 p-6">
            <h2 className="text-xl font-bold">Invia una richiesta</h2>
            <div className="mt-4"><LeadForm intento={intento} /></div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
