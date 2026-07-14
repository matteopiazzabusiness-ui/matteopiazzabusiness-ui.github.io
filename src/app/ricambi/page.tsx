import type { Metadata } from "next";
import { ServiceLanding } from "@/components/ServiceLanding";

export const metadata: Metadata = {
  title: "Ricambi originali per macchine movimento terra",
  description:
    "Ricambi originali Caterpillar e Dieci per macchine movimento terra in Sicilia. Ricerca per marca, modello e seriale. Sedi Caltanissetta e Catania.",
};

export default function RicambiPage() {
  return (
    <ServiceLanding
      intento="ricambi"
      slug="ricambi"
      titolo="Ricambi"
      sottotitolo="Il ricambio giusto, senza errori"
      rispostaBreve="DLF Macchine fornisce ricambi originali per macchine movimento terra Caterpillar e Dieci in Sicilia, identificabili per marca, modello e numero di seriale, con supporto del reparto post-vendita delle sedi di Caltanissetta e Misterbianco (Catania)."
      steps={[
        { t: "Identifica il ricambio", d: "Comunica modello, seriale, codice pezzo o invia una foto." },
        { t: "Verifica compatibilità", d: "Distinguiamo originale e alternativo solo secondo policy DLF." },
        { t: "Preventivo e disponibilità", d: "Ti comunichiamo prezzo, disponibilità e tempi." },
        { t: "Consegna", d: "Ritiro in sede o spedizione, con supporto del reparto post-vendita." },
      ]}
      faq={[
        { q: "Come identifico il ricambio corretto?", a: "Il modo più sicuro è indicare modello e numero di seriale della macchina, oppure il codice del pezzo. Puoi anche allegare una foto: ci pensiamo noi." },
        { q: "Vendete solo ricambi originali?", a: "Diamo priorità ai ricambi originali. Alternative equivalenti vengono proposte solo secondo policy e con il tuo consenso." },
        { q: "Per quali marchi?", a: "Principalmente Caterpillar e Dieci, oltre agli altri marchi trattati. Verifichiamo la disponibilità caso per caso." },
      ]}
    />
  );
}
