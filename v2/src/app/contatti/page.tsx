import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
import { FormContatti } from "@/components/FormContatti";
import { sedi, orari } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contatti — DLF Macchine",
  description:
    "Contatta DLF Macchine: sedi a Caltanissetta e Misterbianco (Catania), telefono, WhatsApp e form per vendita, noleggio, assistenza e ricambi.",
};

export default async function ContattiPage({
  searchParams,
}: {
  searchParams: Promise<{ intento?: string; modello?: string }>;
}) {
  const { intento, modello } = await searchParams;

  return (
    <>
      <PageHead label="Contatti" title="Parliamone">
        Dicci di cosa hai bisogno: ti rispondiamo in giornata lavorativa. Per le urgenze
        in cantiere chiama direttamente la sede più vicina.
      </PageHead>

      <div className="grid gap-14 px-5 pb-24 sm:px-8 lg:grid-cols-2">
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
            </div>
          ))}
          <div className="mt-8 border-t-2 border-ink pt-4">
            <p className="t-label text-ink-soft">Orari</p>
            <p className="mt-2 text-sm text-ink">{orari.feriali}</p>
            <p className="text-sm text-ink">{orari.sabato}</p>
          </div>
        </div>
      </div>
    </>
  );
}
