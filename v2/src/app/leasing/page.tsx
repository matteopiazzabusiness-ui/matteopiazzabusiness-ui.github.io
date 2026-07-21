import type { Metadata } from "next";
import { Servizio } from "@/components/Servizio";

export const metadata: Metadata = {
  title: "Leasing e finanziamento mezzi movimento terra",
  description:
    "Leasing strumentale e finanziamento per l'acquisto di escavatori, minipale e sollevatori. Ufficio dedicato DLF Macchine: simulazioni, permuta e pratica chiavi in mano.",
  alternates: { canonical: "/leasing" },
};

export default function LeasingPage() {
  return (
    <Servizio
      label="Leasing & finanziamento"
      title="Porta il mezzo in azienda, senza svuotare la cassa"
      intro="Un ufficio dedicato costruisce con te la formula di acquisto più adatta: leasing strumentale, finanziamento o permuta dell'usato. Tu scegli il mezzo, alla pratica pensiamo noi."
      img="/media/hero/dlf-movimento-terra.png"
      intento="vendita"
      punti={[
        { t: "Leasing su misura", d: "Canoni pianificabili e riscatto finale: usi subito il mezzo pagandolo nel tempo, con i vantaggi fiscali della deducibilità." },
        { t: "Permuta valutata", d: "Ritiriamo il tuo usato in conto permuta sull'acquisto del nuovo, semplificando il passaggio." },
        { t: "Pratica chiavi in mano", d: "Dalla simulazione alla firma, l'ufficio leasing segue tutta la documentazione al posto tuo." },
      ]}
      processo={[
        { t: "Scegli il mezzo", d: "Nuovo o usato dal nostro catalogo: dicci quale ti interessa." },
        { t: "Simulazione", d: "Costruiamo un piano di canoni realistico in base al tuo utilizzo." },
        { t: "Permuta", d: "Se hai un usato, lo valutiamo e lo scaliamo dall'operazione." },
        { t: "Firma e consegna", d: "Curiamo la pratica e ti consegniamo il mezzo pronto al lavoro." },
      ]}
      faq={[
        { q: "Che differenza c'è tra leasing e finanziamento?", a: "Con il leasing usi il mezzo pagando un canone e puoi riscattarlo a fine contratto; con il finanziamento diventi subito proprietario rimborsando il prestito. Ti aiutiamo a scegliere la formula più conveniente per il tuo caso." },
        { q: "Posso usare il mio usato come anticipo?", a: "Sì: valutiamo il tuo mezzo in conto permuta e lo scaliamo dall'importo dell'operazione." },
        { q: "Vale anche per i mezzi usati?", a: "Sì, le formule di leasing e finanziamento sono valutabili anche sull'usato garantito che proponiamo." },
        { q: "Quanto tempo serve per attivare la pratica?", a: "Dipende dall'istituto finanziario e dalla documentazione: l'ufficio leasing ti segue per ridurre al minimo i tempi. Contattaci per una simulazione." },
      ]}
      copertura
    />
  );
}
