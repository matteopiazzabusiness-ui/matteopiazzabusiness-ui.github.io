import type { Metadata } from "next";
import { ServiceLanding } from "@/components/ServiceLanding";

export const metadata: Metadata = {
  title: "Noleggio macchine movimento terra in Sicilia",
  description:
    "Noleggio escavatori, mini escavatori, minipale e sollevatori telescopici in Sicilia. Per luogo, periodo e tipo di lavoro. Sedi Caltanissetta e Catania.",
};

export default function NoleggioPage() {
  return (
    <ServiceLanding
      intento="noleggio"
      slug="noleggio"
      titolo="Noleggio"
      sottotitolo="Noleggia il mezzo giusto, per il tempo che ti serve"
      rispostaBreve="DLF Macchine noleggia macchine movimento terra in Sicilia — escavatori, mini escavatori, minipale e sollevatori telescopici — con formule per luogo, periodo e tipo di lavoro, dalle sedi di Caltanissetta e Misterbianco (Catania)."
      steps={[
        { t: "Descrivi il lavoro", d: "Tipologia mezzo, peso, luogo, date, operatore e accessori." },
        { t: "Verifichiamo la flotta", d: "Assegniamo il mezzo dalla sede più vicina e proponiamo alternative se necessario." },
        { t: "Conferma e documenti", d: "Preventivo, richiesta documenti in canale protetto, conferma e promemoria." },
        { t: "Consegna e supporto", d: "Trasporto, avvio lavoro e assistenza per ridurre il fermo macchina." },
      ]}
      faq={[
        { q: "Quali mezzi posso noleggiare?", a: "Escavatori e mini escavatori Caterpillar, minipale cingolate e gommate, sollevatori telescopici Dieci. Disponibilità e modelli variano per sede e periodo." },
        { q: "Il noleggio include operatore e trasporto?", a: "Sono opzionabili. Indica nel modulo se ti servono operatore, accessori e trasporto: li includiamo nel preventivo." },
        { q: "Su quali aree operate?", a: "Sicilia centrale dalla sede di Caltanissetta e Sicilia orientale dalla sede di Misterbianco (Catania). Verifichiamo caso per caso la copertura." },
      ]}
    />
  );
}
