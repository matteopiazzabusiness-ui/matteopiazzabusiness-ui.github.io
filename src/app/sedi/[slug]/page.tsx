import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Section, ButtonLink, Badge } from "@/components/ui";
import { LocalBusinessJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { PageIntro } from "@/components/anim/PageIntro";
import { Reveal } from "@/components/anim/Reveal";
import { LeadForm } from "@/components/LeadForm";
import { sedi, orari, waLink } from "@/lib/site";

export function generateStaticParams() {
  return sedi.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = sedi.find((x) => x.slug === slug);
  if (!s) return { title: "Sede non trovata" };
  return {
    title: `Sede di ${s.city} — ${s.street}`,
    description: `DLF Macchine ${s.city} (${s.province}): vendita, noleggio, assistenza e ricambi movimento terra. ${s.street}, ${s.zip} ${s.city}.`,
  };
}

export default async function SedePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = sedi.find((x) => x.slug === slug);
  if (!s) notFound();
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${s.street} ${s.zip} ${s.city}`)}`;

  return (
    <>
      <LocalBusinessJsonLd slug={s.slug} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: `Sede ${s.city}`, url: `/sedi/${s.slug}` }]} />
      <PageIntro eyebrow="Sede DLF" title={<>{s.city} <span className="text-white/50">({s.province})</span></>}>
        {s.street} · {s.zip} {s.city}. Vendita, noleggio, assistenza e ricambi.
      </PageIntro>
      <Section className="bg-surface">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal className="space-y-6">
            <div>
              <h2 className="font-display text-lg font-bold">Indirizzo e contatti</h2>
              <address className="mt-3 not-italic space-y-1 text-slate-strong">
                <p>{s.street}</p>
                <p>{s.zip} {s.city} ({s.province})</p>
                <p>Tel: <a href={`tel:${s.phone.replace(/\s/g, "")}`} className="font-semibold text-brand-700">{s.phone}</a></p>
                <p>Cell: <a href={`tel:${s.mobile.replace(/\s/g, "")}`} className="font-semibold text-brand-700">{s.mobile}</a></p>
                <p>Email: <a href={`mailto:${s.email}`} className="font-semibold text-brand-700">{s.email}</a></p>
              </address>
              <div className="mt-4 flex flex-wrap gap-3">
                <ButtonLink href={maps} variant="outline" target="_blank" rel="noopener">Indicazioni →</ButtonLink>
                <a href={waLink(`Salve, vi contatto per la sede di ${s.city}.`)} target="_blank" rel="noopener"
                   className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-success px-4 font-semibold text-white">
                  💬 WhatsApp
                </a>
              </div>
            </div>

            <div>
              <h2 className="font-display text-lg font-bold">Orari</h2>
              <p className="mt-2 text-slate-strong">{orari.feriali}</p>
              <p className="text-slate-strong">{orari.sabato}</p>
            </div>

            <div>
              <h2 className="font-display text-lg font-bold">Reparti</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {s.reparti.map((r) => <Badge key={r}>{r}</Badge>)}
              </div>
            </div>

            <div>
              <h2 className="font-display text-lg font-bold">Aree servite</h2>
              <p className="mt-2 text-slate">{s.areaServita.join(" · ")}</p>
            </div>
          </Reveal>

          <Reveal as="div" x={24} y={0} className="rounded-lg border border-line bg-surface-2 p-6" start="top 85%">
            <h2 className="text-xl font-bold">Contatta la sede di {s.city}</h2>
            <div className="mt-4"><LeadForm intento="preventivo" /></div>
          </Reveal>
        </div>
      </Container>
    </Section>
    </>
  );
}
