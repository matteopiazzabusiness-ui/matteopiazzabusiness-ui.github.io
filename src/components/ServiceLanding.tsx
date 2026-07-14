import { Container, Section, Eyebrow, Badge } from "@/components/ui";
import { LeadForm } from "@/components/LeadForm";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/anim/Reveal";
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

      <section className="noise relative overflow-hidden bg-graphite-950 text-white">
        <div className="bg-grid absolute inset-0 opacity-60" aria-hidden />
        <div className="pointer-events-none absolute -right-16 top-0 h-96 w-96 rounded-full bg-brand/15 blur-[110px]" aria-hidden />
        <Reveal as="div" stagger={0.12}>
          <Container className="relative py-16 sm:py-24">
            <div data-reveal-item><Eyebrow>{titolo}</Eyebrow></div>
            <h1 data-reveal-item className="mt-4 max-w-3xl text-4xl sm:text-6xl font-extrabold text-white">{sottotitolo}</h1>
            {/* Risposta breve iniziale — formato citabile per answer engine */}
            <p data-reveal-item className="mt-5 max-w-2xl text-lg text-white/75">{rispostaBreve}</p>
            <div data-reveal-item className="mt-6"><Badge tone="brand">Sicilia · 2 sedi</Badge></div>
          </Container>
        </Reveal>
      </section>

      <Section className="bg-surface">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <h2 className="text-2xl font-bold">Come funziona</h2>
              <Reveal as="ol" className="mt-6 space-y-5" stagger={0.12}>
                {steps.map((s, i) => (
                  <li key={s.t} data-reveal-item className="flex gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand font-display font-bold text-brand-ink">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-bold">{s.t}</h3>
                      <p className="mt-1 text-slate">{s.d}</p>
                    </div>
                  </li>
                ))}
              </Reveal>
            </div>

            <Reveal as="div" x={24} y={0} className="rounded-lg border border-line bg-surface-2 p-6" start="top 85%" id="richiesta">
              <Eyebrow>Richiesta</Eyebrow>
              <h2 className="mt-3 text-2xl font-bold">Invia la tua richiesta</h2>
              <p className="mt-2 text-sm text-slate">Ti rispondiamo rapidamente. Puoi proseguire su WhatsApp.</p>
              <div className="mt-5"><LeadForm intento={intento} /></div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* FAQ visibili (requisito FAQPage) */}
      <Section className="bg-surface-2">
        <Container>
          <h2 className="text-2xl font-bold">Domande frequenti</h2>
          <Reveal as="div" className="mt-6 divide-y divide-line rounded-lg border border-line bg-surface" stagger={0.08}>
            {faq.map((f) => (
              <details key={f.q} data-reveal-item className="group px-5 py-4">
                <summary className="cursor-pointer list-none font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {f.q}
                </summary>
                <p className="mt-2 text-slate">{f.a}</p>
              </details>
            ))}
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
