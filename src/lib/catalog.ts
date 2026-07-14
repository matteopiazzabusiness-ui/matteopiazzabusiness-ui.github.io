/**
 * Catalogo mezzi DLF — dati seed derivati dal sito pubblico dlfmacchine.it.
 * Nomi modello e categorie: VERIFICATI (sitemap prodotti).
 * Spec complete VERIFICATE solo per i modelli con `specVerificate: true`
 * (Dedalus 30.7-GD, 306 CR). Gli altri riportano "scheda tecnica su richiesta"
 * come sul sito attuale — da popolare con dati ufficiali (audit Fase 5/7).
 */

export type Intento = "vendita" | "noleggio" | "assistenza" | "ricambi";

export type Categoria =
  | "escavatori"
  | "mini-escavatori"
  | "minipale-cingolate"
  | "minipale-gommate"
  | "sollevatori-telescopici"
  | "mini-agri";

export const categorie: Record<Categoria, { label: string; brand: string }> = {
  escavatori: { label: "Escavatori", brand: "Caterpillar" },
  "mini-escavatori": { label: "Mini escavatori", brand: "Caterpillar" },
  "minipale-cingolate": { label: "Minipale cingolate (CTL)", brand: "Caterpillar" },
  "minipale-gommate": { label: "Minipale gommate", brand: "Caterpillar" },
  "sollevatori-telescopici": { label: "Sollevatori telescopici", brand: "Dieci" },
  "mini-agri": { label: "Sollevatori compatti Mini Agri", brand: "Dieci" },
};

export type Spec = { label: string; value: string };

export type Prodotto = {
  slug: string;
  nome: string;
  brand: string;
  categoria: Categoria;
  condizione: "Nuovo" | "Usato" | "Da definire";
  descrizione: string;
  applicazioni: string[];
  specVerificate: boolean;
  spec: Spec[];
  immagini: string[]; // [] => placeholder brandizzato
  formule: Intento[]; // acquisto/noleggio disponibili
};

const PLACEHOLDER: string[] = []; // immagine reale mancante sul sito (audit) → placeholder brandizzato

export const prodotti: Prodotto[] = [
  // ---- Dieci — sollevatori telescopici (spec + foto reali) ----
  {
    slug: "dedalus-30-7-gd",
    nome: "Dedalus 30.7 GD",
    brand: "Dieci",
    categoria: "sollevatori-telescopici",
    condizione: "Nuovo",
    descrizione:
      "Il più agile tra i telescopici edili Dieci. Compatto e robusto per manutenzione stradale, centri storici e spazi ristretti. Cabina Giugiaro Design.",
    applicazioni: ["Edilizia", "Manutenzione stradale", "Centri storici", "Spazi ristretti"],
    specVerificate: true,
    spec: [
      { label: "Portata massima", value: "3.000 kg" },
      { label: "Altezza di sollevamento", value: "6,35 m" },
      { label: "Forza di trazione", value: "5.800 daN" },
      { label: "Velocità massima", value: "36 km/h" },
      { label: "Motore", value: "Kubota Diesel 3.331 cm³" },
      { label: "Potenza massima", value: "55,4 kW (74 CV)" },
      { label: "Emissioni", value: "Stage V / Tier 4f" },
      { label: "Portata pompa idraulica", value: "100 l/min" },
      { label: "Lunghezza totale", value: "4.815 mm" },
      { label: "Raggio di sterzata", value: "4.240 mm" },
    ],
    immagini: [
      "/media/products/dedalus-30-7-main.jpeg",
      "/media/products/dedalus-30-7-2.jpeg",
      "/media/products/dedalus-30-7-3.jpeg",
    ],
    formule: ["vendita", "noleggio"],
  },
  { slug: "dedalus-32-9-gd", nome: "Dedalus 32.9 GD", brand: "Dieci", categoria: "sollevatori-telescopici", condizione: "Nuovo", descrizione: "Telescopico edile Dieci Dedalus, versione con sbraccio maggiorato.", applicazioni: ["Edilizia", "Movimento terra"], specVerificate: false, spec: [], immagini: ["/media/products/dedalus-30-7.png"], formule: ["vendita", "noleggio"] },
  { slug: "dedalus-34-7-gd", nome: "Dedalus 34.7 GD", brand: "Dieci", categoria: "sollevatori-telescopici", condizione: "Nuovo", descrizione: "Telescopico edile Dieci Dedalus con capacità di sollevamento superiore.", applicazioni: ["Edilizia", "Industria"], specVerificate: false, spec: [], immagini: PLACEHOLDER, formule: ["vendita", "noleggio"] },
  { slug: "hercules-100-10", nome: "Hercules 100.10", brand: "Dieci", categoria: "sollevatori-telescopici", condizione: "Nuovo", descrizione: "Sollevatore telescopico pesante Dieci Hercules per applicazioni gravose.", applicazioni: ["Industria", "Logistica", "Edilizia pesante"], specVerificate: false, spec: [], immagini: PLACEHOLDER, formule: ["vendita", "noleggio"] },
  { slug: "hercules-130-10", nome: "Hercules 130.10", brand: "Dieci", categoria: "sollevatori-telescopici", condizione: "Nuovo", descrizione: "Telescopico pesante Dieci Hercules, alta portata.", applicazioni: ["Industria", "Logistica"], specVerificate: false, spec: [], immagini: PLACEHOLDER, formule: ["vendita", "noleggio"] },
  { slug: "apollo-20-4-smart", nome: "Apollo 20.4 Smart", brand: "Dieci", categoria: "sollevatori-telescopici", condizione: "Nuovo", descrizione: "Telescopico compatto Dieci Apollo, versione Smart.", applicazioni: ["Edilizia leggera", "Agricoltura"], specVerificate: false, spec: [], immagini: PLACEHOLDER, formule: ["vendita", "noleggio"] },
  { slug: "mini-agri-26-6", nome: "Mini Agri 26.6", brand: "Dieci", categoria: "mini-agri", condizione: "Nuovo", descrizione: "Sollevatore compatto Dieci Mini Agri per agricoltura e spazi ridotti.", applicazioni: ["Agricoltura", "Allevamento", "Spazi ridotti"], specVerificate: false, spec: [], immagini: PLACEHOLDER, formule: ["vendita", "noleggio"] },

  // ---- Caterpillar — mini escavatori ----
  {
    slug: "306-cr",
    nome: "CAT 306 CR",
    brand: "Caterpillar",
    categoria: "mini-escavatori",
    condizione: "Nuovo",
    descrizione:
      "Mini escavatore CAT 306 CR a raggio ridotto (Compact Radius), ideale per lavori in spazi ristretti mantenendo potenza e stabilità.",
    applicazioni: ["Scavi urbani", "Spazi ristretti", "Sottoservizi", "Movimento terra"],
    specVerificate: true,
    spec: [
      { label: "Peso operativo", value: "6.485 kg" },
      { label: "Potenza", value: "43,2 kW" },
      { label: "Larghezza", value: "1.980 mm" },
    ],
    immagini: PLACEHOLDER, // sito usa woocommerce-placeholder → foto reale da fornire
    formule: ["vendita", "noleggio"],
  },
  { slug: "300-9", nome: "CAT 300.9", brand: "Caterpillar", categoria: "mini-escavatori", condizione: "Nuovo", descrizione: "Micro escavatore CAT 300.9, trasportabile e adatto a spazi minimi. Scheda tecnica su richiesta.", applicazioni: ["Interni", "Giardinaggio", "Sottoservizi"], specVerificate: false, spec: [], immagini: PLACEHOLDER, formule: ["vendita", "noleggio"] },
  { slug: "301-7-cr", nome: "CAT 301.7 CR", brand: "Caterpillar", categoria: "mini-escavatori", condizione: "Nuovo", descrizione: "Mini escavatore CAT 301.7 CR compatto. Scheda tecnica su richiesta.", applicazioni: ["Scavi urbani", "Spazi ristretti"], specVerificate: false, spec: [], immagini: PLACEHOLDER, formule: ["vendita", "noleggio"] },
  { slug: "302-cr", nome: "CAT 302 CR", brand: "Caterpillar", categoria: "mini-escavatori", condizione: "Nuovo", descrizione: "Mini escavatore CAT 302 CR raggio ridotto. Scheda tecnica su richiesta.", applicazioni: ["Movimento terra", "Edilizia"], specVerificate: false, spec: [], immagini: PLACEHOLDER, formule: ["vendita", "noleggio"] },
  { slug: "303-cr", nome: "CAT 303 CR", brand: "Caterpillar", categoria: "mini-escavatori", condizione: "Nuovo", descrizione: "Mini escavatore CAT 303 CR. Scheda tecnica su richiesta.", applicazioni: ["Movimento terra", "Edilizia"], specVerificate: false, spec: [], immagini: PLACEHOLDER, formule: ["vendita", "noleggio"] },
  { slug: "305-cr", nome: "CAT 305 CR", brand: "Caterpillar", categoria: "mini-escavatori", condizione: "Nuovo", descrizione: "Mini escavatore CAT 305 CR. Scheda tecnica su richiesta.", applicazioni: ["Movimento terra", "Cantieri"], specVerificate: false, spec: [], immagini: PLACEHOLDER, formule: ["vendita", "noleggio"] },
  { slug: "308", nome: "CAT 308", brand: "Caterpillar", categoria: "mini-escavatori", condizione: "Nuovo", descrizione: "Mini escavatore CAT 308 di fascia alta. Scheda tecnica su richiesta.", applicazioni: ["Movimento terra", "Cantieri medi"], specVerificate: false, spec: [], immagini: PLACEHOLDER, formule: ["vendita", "noleggio"] },
  { slug: "310", nome: "CAT 310", brand: "Caterpillar", categoria: "mini-escavatori", condizione: "Nuovo", descrizione: "Mini escavatore CAT 310. Scheda tecnica su richiesta.", applicazioni: ["Movimento terra", "Cantieri medi"], specVerificate: false, spec: [], immagini: PLACEHOLDER, formule: ["vendita", "noleggio"] },

  // ---- Caterpillar — escavatori ----
  { slug: "313-gc", nome: "CAT 313 GC", brand: "Caterpillar", categoria: "escavatori", condizione: "Nuovo", descrizione: "Escavatore cingolato CAT 313 GC, efficienza e bassi costi di esercizio. Scheda tecnica su richiesta.", applicazioni: ["Movimento terra", "Edilizia", "Cave"], specVerificate: false, spec: [], immagini: PLACEHOLDER, formule: ["vendita", "noleggio"] },
  { slug: "315", nome: "CAT 315", brand: "Caterpillar", categoria: "escavatori", condizione: "Nuovo", descrizione: "Escavatore cingolato CAT 315. Scheda tecnica su richiesta.", applicazioni: ["Movimento terra", "Edilizia", "Cave"], specVerificate: false, spec: [], immagini: PLACEHOLDER, formule: ["vendita", "noleggio"] },
  { slug: "317", nome: "CAT 317", brand: "Caterpillar", categoria: "escavatori", condizione: "Nuovo", descrizione: "Escavatore cingolato CAT 317. Scheda tecnica su richiesta.", applicazioni: ["Movimento terra", "Infrastrutture"], specVerificate: false, spec: [], immagini: PLACEHOLDER, formule: ["vendita", "noleggio"] },

  // ---- Caterpillar — minipale cingolate (CTL) ----
  { slug: "cat-ctl-259d3", nome: "CAT 259D3 (CTL)", brand: "Caterpillar", categoria: "minipale-cingolate", condizione: "Nuovo", descrizione: "Minipala compatta cingolata CAT 259D3, trazione e stabilità su terreni difficili. Scheda tecnica su richiesta.", applicazioni: ["Movimento terra", "Agricoltura", "Terreni cedevoli"], specVerificate: false, spec: [], immagini: PLACEHOLDER, formule: ["vendita", "noleggio"] },
  { slug: "cat-ctl-279d3", nome: "CAT 279D3 (CTL)", brand: "Caterpillar", categoria: "minipale-cingolate", condizione: "Nuovo", descrizione: "Minipala compatta cingolata CAT 279D3. Scheda tecnica su richiesta.", applicazioni: ["Movimento terra", "Cantieri"], specVerificate: false, spec: [], immagini: PLACEHOLDER, formule: ["vendita", "noleggio"] },
  { slug: "cat-ctl-299d3", nome: "CAT 299D3 (CTL)", brand: "Caterpillar", categoria: "minipale-cingolate", condizione: "Nuovo", descrizione: "Minipala compatta cingolata CAT 299D3, la più potente della gamma. Scheda tecnica su richiesta.", applicazioni: ["Movimento terra", "Demolizione", "Cantieri gravosi"], specVerificate: false, spec: [], immagini: PLACEHOLDER, formule: ["vendita", "noleggio"] },

  // ---- Caterpillar — minipale gommate ----
  { slug: "232d3", nome: "CAT 232D3", brand: "Caterpillar", categoria: "minipale-gommate", condizione: "Nuovo", descrizione: "Minipala gommata (skid steer) CAT 232D3, agile e versatile. Scheda tecnica su richiesta.", applicazioni: ["Movimento terra", "Manutenzione", "Edilizia"], specVerificate: false, spec: [], immagini: PLACEHOLDER, formule: ["vendita", "noleggio"] },
  { slug: "262d3", nome: "CAT 262D3", brand: "Caterpillar", categoria: "minipale-gommate", condizione: "Nuovo", descrizione: "Minipala gommata CAT 262D3, elevata capacità di carico. Scheda tecnica su richiesta.", applicazioni: ["Movimento terra", "Logistica di cantiere"], specVerificate: false, spec: [], immagini: PLACEHOLDER, formule: ["vendita", "noleggio"] },
];

export function prodottoBySlug(slug: string) {
  return prodotti.find((p) => p.slug === slug);
}

export function prodottiByCategoria(cat: Categoria) {
  return prodotti.filter((p) => p.categoria === cat);
}

export const brands = Array.from(new Set(prodotti.map((p) => p.brand)));
