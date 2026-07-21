import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { company, sedi, emailReparti } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Informativa sul trattamento dei dati personali di DLF S.r.l. ai sensi del Regolamento UE 2016/679 (GDPR).",
  alternates: { canonical: "/privacy" },
};

const sezioni = [
  {
    h: "Titolare del trattamento",
    p: [`Il titolare del trattamento è ${company.legalName} (P.IVA ${company.vat}), con sedi in ${sedi.map((s) => `${s.street}, ${s.zip} ${s.city} (${s.province})`).join(" e ")}. Per qualsiasi questione relativa ai tuoi dati puoi scrivere a ${emailReparti.info} o alla PEC ${company.pec}.`],
  },
  {
    h: "Dati che raccogliamo",
    p: [
      "Raccogliamo i dati che ci fornisci spontaneamente compilando i moduli di contatto o scrivendoci via email e WhatsApp: nome, recapiti (telefono, email) e il contenuto della tua richiesta.",
      "Raccogliamo inoltre dati tecnici di navigazione (indirizzo IP, tipo di dispositivo e browser) tramite cookie e strumenti analoghi, come descritto nella Cookie Policy.",
    ],
  },
  {
    h: "Finalità e base giuridica",
    p: [
      "Trattiamo i dati per rispondere alle tue richieste di informazioni, preventivo, noleggio, assistenza e ricambi (esecuzione di misure precontrattuali), per adempiere a obblighi di legge e, previo consenso, per finalità di marketing diretto.",
    ],
  },
  {
    h: "Conservazione",
    p: ["Conserviamo i dati per il tempo necessario a gestire la tua richiesta e il rapporto commerciale, e comunque nei termini previsti dalla normativa fiscale e civilistica applicabile."],
  },
  {
    h: "Comunicazione dei dati",
    p: ["I dati possono essere trattati da personale autorizzato e da fornitori che agiscono come responsabili del trattamento (es. servizi IT, hosting, gestione email). Non diffondiamo i tuoi dati e non li trasferiamo fuori dall'Unione Europea senza adeguate garanzie."],
  },
  {
    h: "I tuoi diritti",
    p: ["Puoi esercitare in ogni momento i diritti di accesso, rettifica, cancellazione, limitazione, portabilità e opposizione (artt. 15-22 GDPR) scrivendo ai recapiti del titolare. Hai inoltre diritto di proporre reclamo al Garante per la protezione dei dati personali."],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHead label="Informativa" title="Privacy Policy">
        Come trattiamo i tuoi dati personali ai sensi del Regolamento UE 2016/679 (GDPR). Questo testo è un
        modello base da rivedere con il consulente privacy prima della pubblicazione definitiva.
      </PageHead>

      <article className="mx-auto max-w-2xl px-5 pb-24 sm:px-8">
        {sezioni.map((s, i) => (
          <section key={s.h} className="border-t border-ink/15 py-8">
            <p className="t-label text-ink-soft">0{i + 1}</p>
            <h2 className="t-poster mt-2 text-3xl text-ink">{s.h}</h2>
            {s.p.map((t, j) => (
              <p key={j} className="mt-4 text-base leading-relaxed text-ink-soft">{t}</p>
            ))}
          </section>
        ))}
        <p className="mt-10 text-sm text-ink-soft">
          Vedi anche la <Link href="/cookie" className="u-line text-ink">Cookie Policy</Link>. Ultimo aggiornamento: modello iniziale [DA VALIDARE].
        </p>
      </article>
    </>
  );
}
