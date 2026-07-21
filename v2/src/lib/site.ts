/**
 * DLF Macchine — Source of truth entità (NAP, sedi, contatti).
 * Dati VERIFICATI dal sito ufficiale (dlfmacchine.it/contatti) e registro pubblico.
 * Cellulari confermati per sede: Caltanissetta 331 100 36 59, Misterbianco 366 444 4300
 * (numeri distinti, entrambi ufficiali — chiarito il presunto conflitto dell'audit).
 * Coordinate: centro città verificato via OSM/Nominatim; civico esatto da rilevare.
 */

export const DA_VALIDARE = "[DA VALIDARE]";

export const company = {
  legalName: "DLF S.r.l.",
  brand: "DLF Macchine",
  tagline: "Il tuo partner per il movimento terra in Sicilia",
  claim:
    "Vendita, noleggio, assistenza e ricambi per macchine movimento terra. Concessionaria Caterpillar e Dieci.",
  vat: "01951200854",
  rea: "CL110082",
  capital: "1.000.000 €",
  pec: "dlf.srl@pec.it",
  email: "info@dlfmacchine.it",
  whatsapp: "393311003659", // formato internazionale per wa.me — DA VALIDARE numero ufficiale
  social: {
    facebook: "https://www.facebook.com/dlfmacchine",
    instagram: "https://www.instagram.com/dlfmacchine",
    linkedin: "https://it.linkedin.com/company/dlfsrl",
  },
} as const;

export type Sede = {
  slug: string;
  name: string;
  city: string;
  province: string;
  street: string;
  zip: string;
  region: "Sicilia";
  phone: string;
  mobile: string;
  email: string;
  geo: { lat: number; lng: number };
  areaServita: string[];
  reparti: ("vendita" | "noleggio" | "assistenza" | "ricambi")[];
  note?: string;
};

export const orari = {
  feriali: "Lun–Ven 8:30–13:00 · 14:30–18:30",
  sabato: "Sab 8:30–13:00 (solo noleggio)",
} as const;

export const sedi: Sede[] = [
  {
    slug: "caltanissetta",
    name: "DLF Macchine — Sede di Caltanissetta",
    city: "Caltanissetta",
    province: "CL",
    street: "Via Dell'Imprenditore 11",
    zip: "93100",
    region: "Sicilia",
    phone: "+39 0934 575176",
    mobile: "+39 331 100 36 59",
    email: "info@dlfmacchine.it",
    geo: { lat: 37.4902628, lng: 14.063284 }, // centro Caltanissetta (OSM); civico industriale da rilevare
    areaServita: ["Caltanissetta", "Enna", "Agrigento", "Sicilia centrale"],
    reparti: ["vendita", "noleggio", "assistenza", "ricambi"],
    note: "Sede principale.",
  },
  {
    slug: "misterbianco-catania",
    name: "DLF Macchine — Sede di Misterbianco (Catania)",
    city: "Misterbianco",
    province: "CT",
    street: "SS 192 Km 78+800",
    zip: "95045",
    region: "Sicilia",
    phone: "+39 095 8320215",
    mobile: "+39 366 444 4300", // confermato da dlfmacchine.it/contatti
    email: "info@dlfmacchine.it",
    geo: { lat: 37.5191722, lng: 15.0079363 }, // Misterbianco (OSM); Km 78+800 SS192 da rilevare
    areaServita: ["Catania", "Siracusa", "Ragusa", "Sicilia orientale"],
    reparti: ["vendita", "noleggio", "assistenza", "ricambi"],
  },
];

export const valori = [
  { titolo: "Affidabilità", testo: "Servizio costante e prevedibile, macchine pronte al lavoro." },
  { titolo: "Eccellenza", testo: "Impegno sulla qualità in ogni intervento e fornitura." },
  { titolo: "Collaborazione", testo: "Una squadra unita a fianco del cliente." },
  { titolo: "Innovazione", testo: "Miglioramento continuo con nuove soluzioni." },
];

export const marchi = [
  "Caterpillar",
  "Dieci",
  "Venieri",
  "Baoli",
  "Indeco",
  "Generac",
  "Husqvarna",
  "Pramac",
  "Kress",
  "Haulotte",
];

/** WhatsApp deep link con messaggio precompilato per reparto/modello. */
export function waLink(text: string): string {
  return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(text)}`;
}

/** Email dedicate per reparto — usate in ricambi/assistenza/contatti. */
export const emailReparti = {
  info: "info@dlfmacchine.it",
  noleggio: "noleggio@dlfmacchine.it",
  postvenditaCL: "postvendita@dlfmacchine.it",
  postvenditaCT: "postvenditacatania@dlfmacchine.it",
} as const;

/** Numeri chiave — usati in home, chi siamo e teaser. Conteggi reali dal catalogo/rete. */
export const numeri = [
  { valore: "2", label: "Sedi operative", nota: "Caltanissetta e Catania" },
  { valore: "9", label: "Province servite", nota: "Tutta la Sicilia" },
  { valore: "80+", label: "Modelli a catalogo", nota: "Caterpillar e Dieci" },
  { valore: "20+", label: "Marchi trattati", nota: "Ricambi e attrezzature" },
] as const;

/** Perché DLF — differenziali sintetici riusabili. */
export const differenziali = [
  { t: "Concessionaria ufficiale", d: "Caterpillar e Dieci per la Sicilia: gamma completa, garanzia e supporto diretto del costruttore." },
  { t: "Assistenza mobile", d: "Officina attrezzata a Caltanissetta e officina meccanica mobile che raggiunge il cantiere ovunque in Sicilia." },
  { t: "Ricambi originali a stock", d: "Due magazzini riforniti: le referenze più richieste di tutte le marche già sullo scaffale." },
  { t: "Una squadra, non un centralino", d: "Commerciali di zona, noleggio, leasing e post-vendita: una persona di riferimento per ogni esigenza." },
];

/** Certificazioni / credenziali — solo dichiarazioni verificabili dal ruolo di concessionaria. */
export const certificazioni = [
  "Concessionaria ufficiale Caterpillar",
  "Concessionaria ufficiale Dieci",
  "Officina autorizzata e tecnici qualificati",
  "Ricambi originali garantiti",
];

/** Storia in tappe — narrativa qualitativa. Anni puntuali DA_VALIDARE col cliente. */
export const storia = [
  { fase: "Le origini", testo: "DLF nasce in Sicilia con una missione semplice: mettere a disposizione delle imprese del territorio mezzi movimento terra affidabili e un'assistenza che risponde davvero." },
  { fase: "La concessione", testo: "L'azienda diventa concessionaria di riferimento per Caterpillar e Dieci, portando in Sicilia gamma, garanzia e supporto tecnico dei due marchi." },
  { fase: "Due sedi, tutta l'isola", testo: "Con le sedi di Caltanissetta e Misterbianco (Catania), DLF copre la Sicilia centrale, occidentale e orientale, avvicinando vendita, noleggio, assistenza e ricambi ai cantieri." },
  { fase: "Oggi", testo: "Una squadra strutturata — commerciali di zona, noleggio, leasing, officina e magazzini — affianca imprese, agricoltori e cave in ogni fase, dal primo preventivo al post-vendita." },
];
