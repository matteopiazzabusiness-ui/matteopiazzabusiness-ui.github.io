import { Container, Section, Eyebrow, Badge } from "@/components/ui";
import { LeadForm } from "@/components/LeadForm";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import type { Intento } from "@/lib/catalog";
import { company } from "@/lib/site";

export type Faq = { q: string; a: string };

function FaqJsonLd({ faq }: { faq: Faq[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      }}
    />
  );
}

function ServiceJsonLd({ nome, descr }: { nome: string; descr: string }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: nome,
          description: descr,
          provider: { "@type": "Organization", name: company.legalName },
          areaServed: "Sicilia",
        }),
      }}
    />
  );
}

export function ServiceLanding({
  intento,
  titolo,
  sottotitolo,
  rispostaBreve,
  steps,
  faq,
  slug,
}: {
  intento: Intento;
  titolo: string;
  sottotitolo: string;
  rispostaBreve: string; // blocco citabile GEO/AEO
  steps: { t: string; d: string }[];
  faq: Faq[];
  slug: string;
}) {
  return (
    <>
      <ServiceJsonLd nome={titolo} descr={sottotitolo} />
      <FaqJsonLd faq={faq} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: titolo, url: `/${slug}` }]} />

      <section className="bg-graphite-950 text-white">
        <Container className="py-16 sm:py-20">
          <Eyebrow>{titolo}</Eyebrow>
          <h1 className="mt-4 max-w-3xl text-4xl sm:text-5xl font-extrabold text-white">{sottotitolo}</h1>
          {/* Risposta breve iniziale — formato citabile per answer engine */}
          <p className="mt-5 max-w-2xl text-lg text-white/75">{rispostaBreve}</p>
          <div className="mt-6"><Badge tone="brand">Sicilia · 2 sedi</Badge></div>
        </Container>
      </section>

      <Section className="bg-surface">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <h2 className="text-2xl font-bold">Come funziona</h2>
              <ol className="mt-6 space-y-5">
                {steps.map((s, i) => (
                  <li key={s.t} className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand font-display font-bold text-brand-ink">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold">{s.t}</h3>
                      <p className="mt-1 text-slate">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-lg border border-line bg-surface-2 p-6" id="richiesta">
              <Eyebrow>Richiesta</Eyebrow>
              <h2 className="mt-3 text-2xl font-bold">Invia la tua richiesta</h2>
              <p className="mt-2 text-sm text-slate">Ti rispondiamo rapidamente. Puoi proseguire su WhatsApp.</p>
              <div className="mt-5"><LeadForm intento={intento} /></div>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ visibili (requisito FAQPage) */}
      <Section className="bg-surface-2">
        <Container>
          <h2 className="text-2xl font-bold">Domande frequenti</h2>
          <div className="mt-6 divide-y divide-line rounded-lg border border-line bg-surface">
            {faq.map((f) => (
              <details key={f.q} className="group px-5 py-4">
                <summary className="cursor-pointer list-none font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {f.q}
                </summary>
                <p className="mt-2 text-slate">{f.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
