import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { emailReparti } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Informativa sull'uso dei cookie e delle tecnologie di tracciamento sul sito DLF Macchine.",
  alternates: { canonical: "/cookie" },
};

const tipi = [
  { h: "Cookie tecnici", d: "Necessari al funzionamento del sito e alla navigazione. Non richiedono consenso e non possono essere disattivati." },
  { h: "Cookie di preferenza", d: "Memorizzano le tue scelte (es. impostazioni) per migliorare l'esperienza. [DA VALIDARE se presenti]." },
  { h: "Cookie statistici", d: "Ci aiutano a capire come viene usato il sito in forma aggregata. Attivati solo previo consenso. [DA VALIDARE strumento, es. analytics]." },
  { h: "Cookie di terze parti", d: "Impostati da servizi esterni eventualmente integrati (es. mappe). Vedi le rispettive informative. [DA VALIDARE elenco]." },
];

export default function CookiePage() {
  return (
    <>
      <PageHead label="Informativa" title="Cookie Policy">
        Cosa sono i cookie che usiamo e come gestirli. Questo testo è un modello base: va completato con
        l&apos;elenco reale dei cookie e degli strumenti di terze parti effettivamente installati.
      </PageHead>

      <article className="mx-auto max-w-2xl px-5 pb-24 sm:px-8">
        <section className="border-t border-ink/15 py-8">
          <h2 className="t-poster text-3xl text-ink">Cosa sono i cookie</h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            I cookie sono piccoli file di testo che i siti salvano sul dispositivo dell&apos;utente per
            memorizzare informazioni. Li usiamo per far funzionare il sito e, previo consenso, per finalità
            statistiche.
          </p>
        </section>

        <section className="border-t border-ink/15 py-8">
          <h2 className="t-poster text-3xl text-ink">Tipologie di cookie</h2>
          <div className="mt-4 space-y-4">
            {tipi.map((t) => (
              <div key={t.h} className="border-l-2 border-giallo pl-4">
                <h3 className="t-label text-ink">{t.h}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{t.d}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-ink/15 py-8">
          <h2 className="t-poster text-3xl text-ink">Gestione del consenso</h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Puoi gestire o revocare il consenso ai cookie non tecnici in qualsiasi momento tramite le
            impostazioni del tuo browser o l&apos;eventuale pannello di gestione del consenso. Per informazioni
            scrivi a <a href={`mailto:${emailReparti.info}`} className="u-line text-ink">{emailReparti.info}</a>.
          </p>
        </section>

        <p className="mt-6 text-sm text-ink-soft">
          Vedi anche la <Link href="/privacy" className="u-line text-ink">Privacy Policy</Link>. Ultimo aggiornamento: modello iniziale [DA VALIDARE].
        </p>
      </article>
    </>
  );
}
