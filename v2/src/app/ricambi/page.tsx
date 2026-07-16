import type { Metadata } from "next";
import { Servizio } from "@/components/Servizio";

export const metadata: Metadata = {
  title: "Ricambi originali per macchine movimento terra",
  description:
    "Ricambi originali di tutte le marche in stock nei magazzini DLF di Caltanissetta e Catania. Identificazione ricambio e spedizione rapida.",
};

export default function RicambiPage() {
  return (
    <Servizio
      label="Ricambi"
      title="Il pezzo giusto, subito"
      intro="Ricambi originali di tutte le marche, in stock nei magazzini di Caltanissetta e Catania. Identifichiamo il ricambio dal numero di serie e lo spediamo o lo consegniamo con l'officina mobile."
      img="/media/team/magazzino-caltanissetta.jpg"
      intento="ricambi"
      punti={[
        { t: "Originali", d: "Solo ricambi originali o equivalenti certificati: la macchina resta in garanzia e dura di più." },
        { t: "In stock", d: "Due magazzini riforniti a Caltanissetta e Catania: le referenze più richieste sono già sullo scaffale." },
        { t: "Identificati", d: "Ci mandi marca, modello e numero di serie: troviamo noi il codice esatto, senza errori di ordinazione." },
      ]}
      faq={[
        { q: "Come ordino un ricambio?", a: "Scrivi a postvendita@dlfmacchine.it (Caltanissetta) o postvenditacatania@dlfmacchine.it (Catania) con marca, modello e numero di serie del mezzo." },
        { q: "Spedite in tutta la Sicilia?", a: "Sì, spediamo ovunque; per i clienti in assistenza la consegna può viaggiare con l'officina mobile." },
        { q: "Trattate solo CAT e Dieci?", a: "No: ricambi originali di tutte le marche, comprese Venieri, Baoli, Indeco, Generac, Husqvarna e Pramac." },
      ]}
    />
  );
}
