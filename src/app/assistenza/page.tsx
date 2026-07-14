import type { Metadata } from "next";
import { ServiceLanding } from "@/components/ServiceLanding";

export const metadata: Metadata = {
  title: "Assistenza tecnica e officina mobile — movimento terra",
  description:
    "Assistenza tecnica DLF per macchine movimento terra in Sicilia: officina mobile, ricambi originali, riduzione del fermo macchina. Caltanissetta e Catania.",
};

export default function AssistenzaPage() {
  return (
    <ServiceLanding
      intento="assistenza"
      slug="assistenza"
      titolo="Assistenza"
      sottotitolo="Riduci il fermo macchina, torna al lavoro"
      rispostaBreve="DLF Macchine offre assistenza tecnica per macchine movimento terra in Sicilia, con officina mobile e ricambi originali, per intervenire rapidamente e ridurre il fermo macchina. Servizio dalle sedi di Caltanissetta e Misterbianco (Catania)."
      steps={[
        { t: "Segnala il problema", d: "Marca, modello, seriale, sintomo, se la macchina è ferma e la località." },
        { t: "Triage e priorità", d: "Diamo priorità in base al fermo macchina; per sicurezza o urgenza passiamo subito a un tecnico." },
        { t: "Intervento", d: "Officina mobile in loco o in sede, con ricambi originali quando disponibili." },
        { t: "Chiusura", d: "Aggiornamenti di stato e verifica finale dell'intervento." },
      ]}
      faq={[
        { q: "Avete officina mobile?", a: "Sì, interveniamo in loco con officina mobile per ridurre gli spostamenti e il fermo macchina, secondo disponibilità e area." },
        { q: "L'assistenza è disponibile 24/7?", a: "Gli orari e le condizioni del servizio vengono confermati in fase di presa in carico. Indica se la macchina è ferma: gestiamo le urgenze con priorità. [Dettaglio SLA da confermare con DLF]" },
        { q: "Usate ricambi originali?", a: "Sì, forniamo ricambi originali; eventuali alternative vengono proposte solo secondo policy e con il tuo consenso." },
      ]}
    />
  );
}
