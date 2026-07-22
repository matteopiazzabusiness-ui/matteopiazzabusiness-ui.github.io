import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
import { FormContatti } from "@/components/FormContatti";
import { Faq } from "@/components/Faq";
import { Reveal } from "@/components/Reveal";
import { sedi, orari, company, emailReparti } from "@/lib/site";
import { faqGruppi } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Contatti — DLF Macchine",
  description:
    "Contatta DLF Macchine: sedi a Caltanissetta e Misterbianco (Catania), telefono, WhatsApp e form per vendita, noleggio, assistenza e ricambi.",
};

function bbox(lat: number, lng: number, d = 0.02) {
  return `${lng - d},${lat - d},${lng + d},${lat + d}`;
}

export default async function ContattiPage({
  searchParams,
}: {
  searchParams: Promise<{ intento?: string; modello?: string }>;
}) {
  const { intento, modello } = await searchParams;
  const faqContatti = faqGruppi.find((g) => g.slug === "azienda")?.voci ?? [];

  return (
    <>
      <PageHead label="Contatti" title="Parliamone">
        Dicci di cosa hai bisogno: ti rispondiamo in giornata lavorativa. Per le urgenze
        in cantiere chiama direttamente la sede più vicina.
      </PageHead>

      {/* Azioni rapide */}
      <Reveal as="section" className="px-5 sm:px-8">
        <div className="grid gap-px border border-ink/15 bg-ink/15 sm:grid-cols-3">
          <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noopener noreferrer" className="rv group bg-paper p-6 transition-colors hover:bg-white">
            <span className="t-label text-ink-soft">Risposta rapida</span>
            <p className="t-poster mt-2 text-2xl text-ink group-hover:text-giallo-deep">WhatsApp {"->"}</p>
          </a>
          <a href={`mailto:${emailReparti.info}`} className="rv group bg-paper p-6 transition-colors hover:bg-white">
            <span className="t-label text-ink-soft">Scrivici</span>
            <p className="t-poster mt-2 text-2xl text-ink group-hover:text-giallo-deep">{emailReparti.info}</p>
          </a>
          <a href="tel:+390934575176" className="rv group bg-paper p-6 transition-colors hover:bg-white">
            <span className="t-label text-ink-soft">Chiama</span>
            <p className="t-poster mt-2 text-2xl text-ink group-hover:text-giallo-deep">0934 575176</p>
          </a>
        </div>
      </Reveal>

      <div className="grid gap-14 px-5 py-16 sm:px-8 lg:grid-cols-2">
        <FormContatti intento={intento} modello={modello} />

        <div>
          {sedi.map((s) => (
            <div key={s.slug} className="border-t-2 border-ink pt-4 [&+&]:mt-8">
              <p className="t-label text-ink-soft">{s.name}</p>
              <p className="mt-2 text-sm text-ink">{s.street}, {s.zip} {s.city} ({s.province})</p>
              <div className="mt-3 space-y-1">
                <a href={`tel:${s.phone.replace(/\s/g, "")}`} className="t-poster u-line block text-2xl text-ink">{s.phone}</a>
                <a href={`tel:${s.mobile.replace(/\s/g, "")}`} className="t-poster u-line block text-2xl text-ink">{s.mobile}</a>
              </div>
              <p className="t-label mt-3 text-ink-soft">Area servita: {s.areaServita.join(", ")}</p>
              <div className="mt-4 aspect-[16/9] overflow-hidden border border-ink/15 bg-paper-2">
                <iframe
                  title={`Mappa ${s.city}`}
                  loading="lazy"
                  className="h-full w-full"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox(s.geo.lat, s.geo.lng)}&layer=mapnik&marker=${s.geo.lat},${s.geo.lng}`}
                />
              </div>
              <a
                href={`https://www.openstreetmap.org/?mlat=${s.geo.lat}&mlon=${s.geo.lng}#map=15/${s.geo.lat}/${s.geo.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="t-label u-line mt-2 inline-block text-ink-soft"
              >
                Apri mappa {"->"}
              </a>
            </div>
          ))}
          <div className="mt-8 border-t-2 border-ink pt-4">
            <p className="t-label text-ink-soft">Orari</p>
            <p className="mt-2 text-sm text-ink">{orari.feriali}</p>
            <p className="text-sm text-ink">{orari.sabato}</p>
          </div>
          <div className="mt-8 border-t-2 border-ink pt-4">
            <p className="t-label text-ink-soft">Email per reparto</p>
            <ul className="mt-2 space-y-1 text-sm text-ink">
              <li>Noleggio · <a href={`mailto:${emailReparti.noleggio}`} className="u-line">{emailReparti.noleggio}</a></li>
              <li>Ricambi/Assistenza CL · <a href={`mailto:${emailReparti.postvenditaCL}`} className="u-line">{emailReparti.postvenditaCL}</a></li>
              <li>Ricambi/Assistenza CT · <a href={`mailto:${emailReparti.postvenditaCT}`} className="u-line">{emailReparti.postvenditaCT}</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <section className="border-t border-ink/15 px-5 py-16 sm:px-8">
        <div className="flex items-baseline justify-between">
          <h2 className="t-poster text-4xl text-ink sm:text-5xl">Domande frequenti</h2>
          <a href="/faq" className="t-label u-line text-ink-soft">Tutte le FAQ {"->"}</a>
        </div>
        <div className="mt-6">
          <Faq voci={faqContatti} />
        </div>
      </section>
    </>
  );
}
