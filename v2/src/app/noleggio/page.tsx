import type { Metadata } from "next";
import { Servizio } from "@/components/Servizio";

export const metadata: Metadata = {
  title: "Noleggio mezzi industriali e attrezzature in Sicilia",
  description:
    "Noleggio macchine movimento terra e attrezzature in Sicilia: breve e lungo termine, consegna in cantiere, manutenzione inclusa. Sedi a Caltanissetta e Catania.",
};

export default function NoleggioPage() {
  return (
    <Servizio
      label="Noleggio"
      title="La macchina giusta, solo quando serve"
      intro="Mezzi industriali e attrezzature a noleggio, breve e lungo termine. Consegna in cantiere in tutta la Sicilia, manutenzione inclusa nel canone."
      img="/media/products/dedalus-30-7-main.jpeg"
      intento="noleggio"
      punti={[
        { t: "Flessibile", d: "Giornaliero, settimanale o mensile: paghi il mezzo solo per il tempo in cui lavora davvero." },
        { t: "Consegnato", d: "Portiamo la macchina dove serve, in cantiere, in tutta la Sicilia. Ritiro incluso a fine noleggio." },
        { t: "Coperto", d: "Manutenzione ordinaria inclusa e assistenza con officina mobile: se il mezzo si ferma, interveniamo noi." },
      ]}
      faq={[
        { q: "Quali mezzi posso noleggiare?", a: "Escavatori, mini escavatori, minipale cingolate e gommate, sollevatori telescopici e attrezzature. Disponibilità aggiornata su richiesta: chiama l'ufficio noleggio." },
        { q: "Serve un operatore abilitato?", a: "Sì, i mezzi vengono affidati a operatori con abilitazione in corso di validità. Se non l'hai, chiedici dei corsi di formazione." },
        { q: "La manutenzione è inclusa?", a: "La manutenzione ordinaria è inclusa nel canone. Per guasti in cantiere interviene la nostra officina meccanica mobile." },
        { q: "Posso noleggiare anche il sabato?", a: "L'ufficio noleggio è aperto anche il sabato mattina, 8:30–13:00." },
      ]}
    />
  );
}
