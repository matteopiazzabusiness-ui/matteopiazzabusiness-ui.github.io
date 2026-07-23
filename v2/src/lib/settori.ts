/**
 * Settori serviti da DLF — mappa i mezzi a catalogo sui contesti d'uso reali
 * (edilizia, agricoltura, cave, demolizioni, strade, verde). Ogni settore
 * rimanda alle categorie e ai modelli consigliati per costruire pagine
 * navigabili e SEO-oriented senza duplicare il catalogo.
 */

import type { Categoria } from "@/lib/catalog";

export type Settore = {
  slug: string;
  nome: string;
  tagline: string;
  intro: string;
  descrizione: string;
  img: string;
  applicazioni: string[];
  sfide: { t: string; d: string }[];
  categorie: Categoria[];
  modelli: string[]; // slug prodotti consigliati
};

export const settori: Settore[] = [
  {
    slug: "edilizia",
    nome: "Edilizia e costruzioni",
    tagline: "Dallo scavo di fondazione al sollevamento in quota",
    intro:
      "Il cantiere edile chiede macchine versatili che passino dallo scavo al carico al sollevamento senza fermarsi. DLF fornisce, noleggia e assiste la gamma completa Caterpillar e Dieci per l'edilizia in tutta la Sicilia.",
    descrizione:
      "Ogni fase di un cantiere edile ha il suo mezzo: escavatori per scavi e fondazioni, minipale per la movimentazione dei materiali in spazi ridotti, sollevatori telescopici per portare carichi in quota. Il nostro parco copre l'intero ciclo, con formule di vendita e noleggio flessibili e un'officina mobile che riduce al minimo i fermi macchina.",
    img: "/media/products/313.jpeg",
    applicazioni: ["Scavi e fondazioni", "Sbancamenti", "Sollevamento materiali", "Movimentazione in cantiere", "Ristrutturazioni", "Centri storici"],
    sfide: [
      { t: "Spazi ridotti", d: "Nei centri storici e nelle ristrutturazioni servono mezzi compatti: mini escavatori e telescopici Dedalus manovrano dove gli altri non entrano." },
      { t: "Tempi stretti", d: "Il noleggio con consegna in cantiere e l'assistenza mobile tengono il crono­programma: paghi il mezzo solo quando lavora." },
      { t: "Carichi in quota", d: "I sollevatori telescopici Dieci portano materiali ai piani con precisione, sostituendo gru e ponteggi per molte lavorazioni." },
    ],
    categorie: ["escavatori", "mini-escavatori", "minipale-cingolate", "sollevatori-telescopici"],
    modelli: ["313", "306-cr", "301-7-cr", "dedalus-30-7-gd", "apollo-20-4-smart"],
  },
  {
    slug: "agricoltura",
    nome: "Agricoltura e allevamento",
    tagline: "Sollevare, caricare, movimentare in azienda agricola",
    intro:
      "Sollevatori compatti e telescopici Dieci nati per l'azienda agricola: carico di balle e mangimi, pulizia stalle, movimentazione in spazi angusti. Vendita, noleggio e ricambi originali a portata di campo.",
    descrizione:
      "L'agricoltura moderna ha bisogno di macchine agili che lavorino tutto l'anno, dalla stalla al campo. I sollevatori Mini Agri e la gamma telescopica Dieci offrono forza e maneggevolezza in spazi ridotti, con la vasta scelta di attrezzature che li rende un vero tuttofare aziendale.",
    img: "/media/products/mini-agri-26-6.jpeg",
    applicazioni: ["Carico balle e mangimi", "Pulizia stalle", "Movimentazione inerti", "Manutenzione aziendale", "Spazi angusti"],
    sfide: [
      { t: "Versatilità tutto l'anno", d: "Un'unica macchina con ganci, pinze, pale e cestelli copre decine di lavorazioni stagionali." },
      { t: "Manovra negli spazi angusti", d: "I Mini Agri sono nati per soddisfare le esigenze di lavoro nel piccolo, tra stalle e capannoni." },
      { t: "Continuità operativa", d: "Ricambi originali e assistenza mobile evitano che un guasto blocchi la campagna nel momento sbagliato." },
    ],
    categorie: ["mini-agri", "sollevatori-telescopici", "mini-escavatori"],
    modelli: ["mini-agri-26-6", "apollo-20-4-smart", "dedalus-30-7-gd"],
  },
  {
    slug: "cave-miniere",
    nome: "Cave e miniere",
    tagline: "Potenza e portata dove il lavoro è più duro",
    intro:
      "Escavatori di taglia e sollevatori telescopici Hercules per la produzione in cava: portate estreme, robustezza e continuità operativa, con assistenza e ricambi originali sempre vicini.",
    descrizione:
      "In cava e in miniera contano potenza, affidabilità e ore-macchina. Gli escavatori Caterpillar di taglia superiore e i telescopici Hercules — i più forti della gamma Dieci — lavorano con portate estreme anche ad altezze elevate. DLF affianca la produzione con manutenzione programmata e magazzino ricambi dedicato.",
    img: "/media/products/hercules-210-10.jpeg",
    applicazioni: ["Estrazione e caricamento", "Movimento terra pesante", "Sollevamento carichi estremi", "Lavorazione inerti"],
    sfide: [
      { t: "Ore-macchina elevate", d: "Piani di manutenzione programmata su misura riducono i fermi non pianificati e allungano la vita del mezzo." },
      { t: "Ambienti gravosi", d: "Macchine robuste pensate per polvere, sforzo e usura continua, con ricambi originali a stock." },
      { t: "Portate estreme", d: "La famiglia Hercules supera ogni limite di capacità di carico, fino ai modelli 210.10 e 230.10." },
    ],
    categorie: ["escavatori", "sollevatori-telescopici"],
    modelli: ["313", "hercules-210-10", "hercules-230-10", "hercules-190-10"],
  },
  {
    slug: "demolizioni",
    nome: "Demolizioni e riciclaggio",
    tagline: "Abbattere, selezionare, recuperare",
    intro:
      "Escavatori allestibili con attrezzature Indeco e Promove per demolizione e frantumazione, minipale per la selezione e il carico dei materiali di risulta. Soluzioni complete per il ciclo demolizione-riciclaggio.",
    descrizione:
      "Demolizione e riciclaggio richiedono mezzi che reggano l'urto e attrezzature specializzate: martelli, pinze e frantumatori. Gli escavatori Caterpillar si allestiscono con attrezzature dei nostri partner (Indeco, Promove Demolition) mentre minipale e telescopici gestiscono selezione, carico e movimentazione dei materiali recuperati.",
    img: "/media/products/317.jpeg",
    applicazioni: ["Demolizione controllata", "Frantumazione", "Selezione materiali", "Carico risulta", "Recupero inerti"],
    sfide: [
      { t: "Attrezzature dedicate", d: "Martelli, pinze e cesoie dei partner Indeco e Promove trasformano l'escavatore in una macchina da demolizione." },
      { t: "Sollecitazioni elevate", d: "Carri robusti e manutenzione attenta per resistere a vibrazioni e impatti continui." },
      { t: "Gestione risulta", d: "Minipale gommate e cingolate per selezionare e caricare velocemente i materiali di risulta." },
    ],
    categorie: ["escavatori", "minipale-cingolate", "minipale-gommate"],
    modelli: ["317", "313", "262d3", "272d3-xe"],
  },
  {
    slug: "strade-infrastrutture",
    nome: "Strade e infrastrutture",
    tagline: "Manutenzione stradale, reti e opere pubbliche",
    intro:
      "Mezzi compatti e telescopici agili per manutenzione stradale, reti tecnologiche e opere in ambito urbano. Ideali dove i passaggi stretti richiedono forza e precisione.",
    descrizione:
      "Le opere stradali e infrastrutturali si svolgono spesso in ambito urbano, con traffico e spazi vincolati. I telescopici Dedalus sono particolarmente adatti alla manutenzione stradale, ai centri storici e ai passaggi stretti, mentre mini escavatori e minipale lavorano su scavi per reti e sottoservizi con il minimo ingombro.",
    img: "/media/products/dedalus-30-7-main.jpeg",
    applicazioni: ["Scavi per reti e sottoservizi", "Manutenzione stradale", "Opere in ambito urbano", "Segnaletica e arredo urbano"],
    sfide: [
      { t: "Cantieri urbani", d: "Macchine compatte e a basse emissioni (Stage V) per lavorare in città rispettando ambiente e persone." },
      { t: "Passaggi stretti", d: "I Dedalus nascono per centri storici e sotterranei dove serve forza in poco spazio." },
      { t: "Cantieri mobili", d: "Il noleggio a breve termine con consegna segue i cantieri che si spostano lungo il tracciato." },
    ],
    categorie: ["mini-escavatori", "minipale-cingolate", "sollevatori-telescopici"],
    modelli: ["dedalus-30-7-gd", "301-7-cr", "306-cr"],
  },
  {
    slug: "verde-forestale",
    nome: "Verde e forestale",
    tagline: "Manutenzione del verde, giardini e aree boschive",
    intro:
      "Mini escavatori, sollevatori compatti e attrezzature per la manutenzione del verde, dei giardini e delle aree forestali, con i marchi partner dedicati al settore.",
    descrizione:
      "La cura del verde e le lavorazioni forestali chiedono mezzi leggeri e maneggevoli che rispettino il terreno. Mini escavatori e sollevatori compatti, abbinati alle attrezzature dei partner dedicati (Agriforest, Kress), gestiscono potature, movimentazione tronchi, preparazione del terreno e manutenzione di parchi e giardini.",
    img: "/media/products/301-7-cr.jpeg",
    applicazioni: ["Manutenzione parchi e giardini", "Movimentazione tronchi", "Preparazione terreno", "Lavori forestali leggeri"],
    sfide: [
      { t: "Rispetto del terreno", d: "Mezzi leggeri e cingolati distribuiscono il peso e riducono il compattamento del suolo." },
      { t: "Accessi difficili", d: "Dimensioni compatte per entrare in giardini, vialetti e aree boschive." },
      { t: "Attrezzature dedicate", d: "Gamma di accessori dei partner per adattare la macchina alla lavorazione del verde." },
    ],
    categorie: ["mini-escavatori", "mini-agri", "minipale-cingolate"],
    modelli: ["301-7-cr", "mini-agri-26-6", "306-cr"],
  },
];

export function settoreBySlug(slug: string) {
  return settori.find((s) => s.slug === slug);
}
