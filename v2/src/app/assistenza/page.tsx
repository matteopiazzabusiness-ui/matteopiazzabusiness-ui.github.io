import type { Metadata } from "next";
import { Servizio } from "@/components/Servizio";

export const metadata: Metadata = {
  title: "Assistenza macchine movimento terra — officina mobile in Sicilia",
  description:
    "Assistenza e riparazioni da personale qualificato: officina a Caltanissetta e officina meccanica mobile che interviene in cantiere in tutta la Sicilia.",
};

export default function AssistenzaPage() {
  return (
    <Servizio
      label="Assistenza"
      title="Se il mezzo si ferma, arriviamo noi"
      intro="Officina attrezzata a Caltanissetta e officina meccanica mobile per interventi direttamente in cantiere. Tecnici qualificati su Caterpillar, Dieci e tutte le principali marche."
      img="/media/team/officina-caltanissetta.jpg"
      intento="assistenza"
      punti={[
        { t: "In officina", d: "Diagnosi, tagliandi, revisioni e riparazioni complesse nella sede di Caltanissetta con attrezzature dedicate." },
        { t: "In cantiere", d: "L'officina mobile raggiunge il tuo mezzo ovunque sia: meno fermi macchina, nessun trasporto inutile." },
        { t: "Post-vendita", d: "Un responsabile dedicato segue ogni pratica, dal primo contatto alla riconsegna del mezzo." },
      ]}
      faq={[
        { q: "Intervenite su marche diverse da CAT e Dieci?", a: "Sì: il personale è qualificato sulle principali marche di macchine movimento terra e disponiamo di ricambi originali di tutte le marche." },
        { q: "Quanto costa l'uscita dell'officina mobile?", a: "Dipende dalla zona e dal tipo di intervento: contatta il post-vendita per un preventivo immediato." },
        { q: "Fate manutenzione programmata?", a: "Sì, piani di manutenzione programmata su misura per flotte e singoli mezzi, con promemoria delle scadenze." },
      ]}
    />
  );
}
