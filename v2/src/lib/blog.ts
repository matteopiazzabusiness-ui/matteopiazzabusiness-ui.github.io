/**
 * Blog / Approfondimenti — contenuti editoriali di supporto (guide d'acquisto,
 * manutenzione, noleggio). Testi redazionali DLF, non comunicati ufficiali:
 * servono a dare profondità e presidio SEO alle keyword del settore.
 * Le date sono indicative — aggiornare quando si pubblica per davvero.
 */

export type Blocco =
  | { tipo: "p"; testo: string }
  | { tipo: "h"; testo: string }
  | { tipo: "lista"; voci: string[] };

export type Post = {
  slug: string;
  titolo: string;
  categoria: string;
  data: string; // ISO
  lettura: string;
  excerpt: string;
  cover: string;
  corpo: Blocco[];
};

export const posts: Post[] = [
  {
    slug: "noleggio-o-acquisto-come-scegliere",
    titolo: "Noleggio o acquisto: come scegliere per il tuo cantiere",
    categoria: "Guida",
    data: "2026-06-18",
    lettura: "5 min",
    excerpt:
      "Utilizzo, durata dei lavori e liquidità: i tre criteri per capire se conviene comprare un mezzo o noleggiarlo. Una guida pratica senza formule magiche.",
    cover: "/media/services/noleggio.png",
    corpo: [
      { tipo: "p", testo: "La domanda torna a ogni cantiere: meglio acquistare la macchina o noleggiarla? Non esiste una risposta valida per tutti, ma esistono tre criteri che rendono la scelta quasi automatica." },
      { tipo: "h", testo: "1. Quante ore la userai davvero" },
      { tipo: "p", testo: "Se un mezzo lavora con continuità per gran parte dell'anno, l'acquisto ammortizza in fretta il costo orario. Se invece serve a intermittenza, per singole fasi o picchi di lavoro, il noleggio evita di immobilizzare capitale in una macchina ferma in deposito." },
      { tipo: "h", testo: "2. Quanto durano i lavori" },
      { tipo: "p", testo: "Per cantieri brevi o commesse una tantum il noleggio a breve termine è quasi sempre la scelta giusta: paghi il mezzo solo per il tempo in cui produce. Per attività strutturali e ricorrenti l'acquisto — anche in leasing — dà più controllo su disponibilità e configurazione." },
      { tipo: "h", testo: "3. Liquidità e fiscalità" },
      { tipo: "p", testo: "Il noleggio trasforma un investimento in un costo operativo prevedibile, con manutenzione inclusa. L'acquisto, magari con formula leasing, permette di capitalizzare il bene e pianificarne l'ammortamento. Qui entra in gioco anche il nostro ufficio leasing, che costruisce la formula più adatta." },
      { tipo: "lista", voci: ["Uso continuativo + lavori lunghi = valuta l'acquisto/leasing", "Uso saltuario + cantieri brevi = noleggio", "Serve provare un modello prima di comprarlo = noleggio, poi acquisto"] },
      { tipo: "p", testo: "Il consiglio pratico: parti dalle ore-macchina stimate. Se non le conosci, chiamaci: dall'esperienza sul campo ti aiutiamo a fare due conti realistici prima di decidere." },
    ],
  },
  {
    slug: "manutenzione-programmata-perche-conviene",
    titolo: "Manutenzione programmata: perché conviene (e quanto fa risparmiare)",
    categoria: "Assistenza",
    data: "2026-05-30",
    lettura: "4 min",
    excerpt:
      "Il fermo macchina imprevisto è il costo più alto di un cantiere. La manutenzione programmata lo previene: ecco come funziona e perché ripaga.",
    cover: "/media/services/assistenza.png",
    corpo: [
      { tipo: "p", testo: "Un mezzo fermo non costa solo la riparazione: costa il cantiere che si blocca, gli operatori in attesa, i tempi che slittano. La manutenzione programmata serve proprio a spostare la manutenzione dal momento peggiore — il guasto — a un momento pianificato." },
      { tipo: "h", testo: "Cosa prevede un piano" },
      { tipo: "p", testo: "Un piano di manutenzione programmata definisce in anticipo tagliandi, controlli e sostituzioni in base alle ore di lavoro del mezzo. Le scadenze vengono monitorate e ti avvisiamo prima che diventino un problema." },
      { tipo: "h", testo: "Officina fissa e officina mobile" },
      { tipo: "p", testo: "Gli interventi programmati si svolgono nella nostra officina di Caltanissetta o, quando è più comodo, direttamente in cantiere con l'officina meccanica mobile. Meno trasporti, meno fermi, più macchina che lavora." },
      { tipo: "h", testo: "Il ritorno sull'investimento" },
      { tipo: "p", testo: "Prevenire costa meno che riparare: componenti sostituiti al momento giusto durano di più, i consumi restano sotto controllo e il valore residuo della macchina si mantiene alto. Per le flotte, il vantaggio si moltiplica." },
    ],
  },
  {
    slug: "ricambi-originali-vs-compatibili",
    titolo: "Ricambi originali o compatibili: cosa cambia davvero",
    categoria: "Ricambi",
    data: "2026-05-12",
    lettura: "3 min",
    excerpt:
      "Il ricambio più economico è quello che non ti fa tornare in officina. Perché su un mezzo movimento terra la qualità del pezzo conta più del prezzo.",
    cover: "/media/team/magazzino-caltanissetta.jpg",
    corpo: [
      { tipo: "p", testo: "Su una macchina movimento terra ogni componente lavora sotto sforzo, tra polvere, vibrazioni e carichi elevati. La scelta del ricambio non è un dettaglio: incide su affidabilità, garanzia e durata del mezzo." },
      { tipo: "h", testo: "Perché privilegiare l'originale" },
      { tipo: "p", testo: "Il ricambio originale — o equivalente certificato — è progettato per quel mezzo: tolleranze, materiali e trattamenti sono quelli previsti dal costruttore. Questo mantiene la macchina in garanzia e ne preserva le prestazioni nel tempo." },
      { tipo: "h", testo: "Identificare il pezzo giusto" },
      { tipo: "p", testo: "Il rischio più costoso è ordinare il codice sbagliato. Per questo partiamo sempre da marca, modello e numero di serie: identifichiamo noi la referenza esatta, senza errori di ordinazione e senza attese inutili." },
      { tipo: "p", testo: "Nei magazzini di Caltanissetta e Catania teniamo a stock le referenze più richieste di tutte le principali marche. Quello che non è a scaffale, lo procuriamo in tempi rapidi." },
    ],
  },
  {
    slug: "sollevatori-telescopici-dieci-quale-scegliere",
    titolo: "Sollevatori telescopici Dieci: quale gamma fa per te",
    categoria: "Guida",
    data: "2026-04-20",
    lettura: "5 min",
    excerpt:
      "Dedalus, Apollo, Hercules, Mini Agri: la gamma telescopica Dieci copre dall'edilizia leggera ai carichi estremi. Una mappa per orientarti.",
    cover: "/media/products/dedalus-30-7-main.jpeg",
    corpo: [
      { tipo: "p", testo: "I sollevatori telescopici Dieci coprono esigenze molto diverse, dall'azienda agricola al grande cantiere di cava. Ecco come si distinguono le famiglie principali." },
      { tipo: "h", testo: "Apollo — il più compatto" },
      { tipo: "p", testo: "Apollo Smart è il più agile dei telescopici edili: dimensioni contenute per spazi di manovra ridotti, senza rinunciare a potenza e comfort in cabina. Ideale dove gli altri non entrano." },
      { tipo: "h", testo: "Dedalus — agilità in cantiere" },
      { tipo: "p", testo: "La gamma Dedalus, con cabina firmata Giugiaro Design, è pensata per manutenzione stradale, centri storici e passaggi stretti: compatta, robusta e dinamica, con portate e altezze crescenti." },
      { tipo: "h", testo: "Hercules — la forza pura" },
      { tipo: "p", testo: "Hercules è il più forte della gamma: dedicato ai lavori pesanti, supera ogni limite di capacità di carico. La scelta per grandi cantieri edili, miniere, cave e porti." },
      { tipo: "h", testo: "Mini Agri — nato per l'agricoltura" },
      { tipo: "p", testo: "Il Mini Agri è il sollevatore compatto per l'azienda agricola: versatile e maneggevole in spazi angusti, monta ganci, pinze, pale e cestelli per decine di lavorazioni." },
      { tipo: "p", testo: "Non sai quale taglia serve? Dicci portata, altezza e tipo di cantiere: ti indichiamo il modello giusto e, se vuoi, lo provi a noleggio prima di decidere." },
    ],
  },
  {
    slug: "mini-escavatori-cantieri-urbani",
    titolo: "Mini escavatori in città: piccoli mezzi, grandi vantaggi",
    categoria: "Guida",
    data: "2026-03-15",
    lettura: "4 min",
    excerpt:
      "Reti, sottoservizi, ristrutturazioni: perché il mini escavatore è la macchina regina del cantiere urbano e cosa guardare prima di sceglierlo.",
    cover: "/media/products/301-7-cr.jpeg",
    corpo: [
      { tipo: "p", testo: "Nel cantiere urbano lo spazio è poco, le persone sono vicine e gli imprevisti sotto terra tanti. Il mini escavatore è nato per questo contesto: potenza di scavo in un ingombro minimo." },
      { tipo: "h", testo: "Dove fa la differenza" },
      { tipo: "lista", voci: ["Scavi per reti idriche, elettriche e fibra", "Ristrutturazioni e demolizioni interne", "Manutenzione del verde e giardini", "Cantieri in centro storico con accessi stretti"] },
      { tipo: "h", testo: "Cosa valutare" },
      { tipo: "p", testo: "Peso operativo e larghezza determinano dove la macchina può entrare; la profondità di scavo e la gamma di attrezzature ne definiscono la versatilità. Le motorizzazioni Stage V riducono emissioni e rumore, un vantaggio concreto in città." },
      { tipo: "p", testo: "La gamma Caterpillar compatta — dai modelli della serie 301 in su — copre bene queste esigenze. Se il lavoro è saltuario, il noleggio con consegna in cantiere è spesso la formula più efficiente." },
    ],
  },
];

export function postBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function formatData(iso: string) {
  return new Date(iso).toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" });
}
