/**
 * DLF Macchine — Source of truth entità (NAP, sedi, contatti).
 * Dati VERIFICATI dal sito/registro pubblico salvo dove marcato DA_VALIDARE.
 * NB: audit ha rilevato incoerenza sul mobile Catania (331 100 36 59 vs 366 444 4300).
 * Qui si adotta un numero unico ufficiale per sede — DA CONFERMARE dal cliente.
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
    geo: { lat: 37.4863, lng: 14.0625 }, // DA VALIDARE coordinate precise
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
    mobile: "+39 366 444 4300", // audit: incoerenza con 331 100 36 59 — DA VALIDARE
    email: "info@dlfmacchine.it",
    geo: { lat: 37.5205, lng: 14.9542 }, // DA VALIDARE
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
