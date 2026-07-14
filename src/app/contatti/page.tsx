import type { Metadata } from "next";
import { Container, Section } from "@/components/ui";
import { PageIntro } from "@/components/anim/PageIntro";
import { Reveal } from "@/components/anim/Reveal";
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
    <>
      <PageIntro eyebrow="Contatti" title="Parliamo del tuo lavoro">
        Vendita, noleggio, assistenza o ricambi: scrivici e ti indirizziamo al reparto e alla sede giusta.
      </PageIntro>
      <Section className="bg-surface">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <Reveal className="space-y-6" stagger={0.1}>
            {sedi.map((s) => (
              <div key={s.slug} data-reveal-item className="rounded-lg border border-line p-5">
                <h2 className="font-display text-lg font-bold">{s.city} ({s.province})</h2>
                <address className="mt-2 not-italic text-sm text-slate-strong space-y-1">
                  <p>{s.street}, {s.zip} {s.city}</p>
                  <p><a href={`tel:${s.phone.replace(/\s/g, "")}`} className="font-semibold text-brand-700">{s.phone}</a> · <a href={`tel:${s.mobile.replace(/\s/g, "")}`} className="font-semibold text-brand-700">{s.mobile}</a></p>
                  <p><a href={`mailto:${s.email}`} className="text-brand-700">{s.email}</a></p>
                </address>
              </div>
            ))}
            <div data-reveal-item className="rounded-lg bg-surface-2 p-5 text-sm text-slate-strong">
              <p>{orari.feriali}</p>
              <p>{orari.sabato}</p>
              <p className="mt-2">PEC: {company.pec}</p>
            </div>
          </Reveal>

          <Reveal as="div" x={24} y={0} className="rounded-lg border border-line bg-surface-2 p-6" start="top 85%">
            <h2 className="text-xl font-bold">Invia una richiesta</h2>
            <div className="mt-4"><LeadForm intento={intento} /></div>
          </Reveal>
        </div>
      </Container>
    </Section>
    </>
  );
}
