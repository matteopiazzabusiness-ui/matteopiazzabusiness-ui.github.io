/**
 * FAQ centralizzate — usate dalla pagina /faq e riusabili nelle landing.
 * Raggruppate per tema così l'utente naviga e i motori indicizzano per intento.
 */

export type FaqItem = { q: string; a: string };
export type FaqGruppo = { tema: string; slug: string; voci: FaqItem[] };

export const faqGruppi: FaqGruppo[] = [
  {
    tema: "Azienda e sedi",
    slug: "azienda",
    voci: [
      { q: "Dove siete e quali zone coprite?", a: "Abbiamo due sedi operative in Sicilia: Caltanissetta (sede principale) e Misterbianco, in provincia di Catania. Da qui copriamo l'intera isola, con la Sicilia centrale e occidentale servita da Caltanissetta e quella orientale da Catania." },
      { q: "Che rapporto avete con Caterpillar e Dieci?", a: "DLF è concessionaria ufficiale Caterpillar e Dieci per la Sicilia: vendiamo, noleggiamo e assistiamo la gamma completa dei due marchi, con ricambi originali e tecnici qualificati." },
      { q: "Quali sono gli orari di apertura?", a: "Lun–Ven 8:30–13:00 e 14:30–18:30. Il sabato mattina (8:30–13:00) è attivo l'ufficio noleggio. Per le urgenze in cantiere chiama la sede più vicina." },
    ],
  },
  {
    tema: "Vendita mezzi",
    slug: "vendita",
    voci: [
      { q: "Vendete mezzi nuovi e usati?", a: "Sì. Trattiamo il nuovo Caterpillar e Dieci e proponiamo mezzi usati selezionati e controllati. La disponibilità dell'usato cambia spesso: chiedici il parco aggiornato." },
      { q: "Posso avere la scheda tecnica completa di un modello?", a: "Certo. Per i modelli con scheda verificata trovi le specifiche in pagina; per gli altri riportiamo la tipologia e ti inviamo la scheda completa su richiesta, in giornata." },
      { q: "Offrite soluzioni di finanziamento o leasing?", a: "Sì, abbiamo un ufficio leasing dedicato che costruisce con te la formula di acquisto più adatta. Contattaci indicando il modello di interesse." },
    ],
  },
  {
    tema: "Noleggio",
    slug: "noleggio",
    voci: [
      { q: "Quali mezzi posso noleggiare?", a: "Escavatori, mini escavatori, minipale cingolate e gommate, sollevatori telescopici e attrezzature. La disponibilità è aggiornata di continuo: chiama l'ufficio noleggio per la conferma in tempo reale." },
      { q: "Serve un operatore abilitato?", a: "Sì, i mezzi vengono affidati a operatori con abilitazione in corso di validità. Se non l'hai, possiamo indirizzarti verso corsi di formazione." },
      { q: "La consegna in cantiere è inclusa?", a: "Consegniamo e ritiriamo il mezzo direttamente in cantiere in tutta la Sicilia. Il trasporto viene quotato in base alla zona." },
      { q: "La manutenzione è inclusa nel noleggio?", a: "La manutenzione ordinaria è inclusa nel canone. In caso di guasto interviene la nostra officina meccanica mobile per ridurre i fermi macchina." },
    ],
  },
  {
    tema: "Assistenza",
    slug: "assistenza",
    voci: [
      { q: "Intervenite anche in cantiere?", a: "Sì: oltre all'officina attrezzata di Caltanissetta disponiamo di un'officina meccanica mobile che raggiunge il mezzo ovunque si trovi in Sicilia." },
      { q: "Assistete solo Caterpillar e Dieci?", a: "No. Il personale è qualificato sulle principali marche di macchine movimento terra e disponiamo di ricambi originali di tutte le marche." },
      { q: "Fate manutenzione programmata?", a: "Sì, costruiamo piani di manutenzione programmata su misura per flotte e singoli mezzi, con promemoria delle scadenze per evitare fermi non pianificati." },
    ],
  },
  {
    tema: "Ricambi",
    slug: "ricambi",
    voci: [
      { q: "Come ordino un ricambio?", a: "Scrivi a postvendita@dlfmacchine.it (Caltanissetta) o postvenditacatania@dlfmacchine.it (Catania) indicando marca, modello e numero di serie del mezzo: identifichiamo noi il codice esatto." },
      { q: "Spedite in tutta la Sicilia?", a: "Sì, spediamo ovunque in Sicilia; per i clienti in assistenza il ricambio può viaggiare con l'officina mobile." },
      { q: "Trattate solo ricambi originali?", a: "Privilegiamo ricambi originali o equivalenti certificati, così la macchina resta in garanzia e dura di più. Copriamo tutte le principali marche." },
    ],
  },
];

export const faqTutte: FaqItem[] = faqGruppi.flatMap((g) => g.voci);
