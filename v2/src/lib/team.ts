/**
 * Team DLF — dati reali dalla pagina chi-siamo di dlfmacchine.it.
 * Foto in /public/media/team. Contatti diretti pubblicati sul sito ufficiale.
 */

export type TeamMember = {
  slug: string;
  nome: string;
  ruolo: string;
  email: string;
  telefono?: string;
  foto: string;
  area?: string;
};

export const team: TeamMember[] = [
  {
    slug: "delfino-la-ferla",
    nome: "Delfino Maria La Ferla",
    ruolo: "CEO",
    email: "delfinolaferla@dlfmacchine.it",
    telefono: "+39 391 18 15 014",
    foto: "/media/team/delfino-la-ferla.jpeg",
  },
  {
    slug: "alessandro-bellomo",
    nome: "Alessandro Bellomo",
    ruolo: "Funzionario Commerciale",
    area: "Agrigento, Ragusa",
    email: "alessandrobellomo@dlfmacchine.it",
    telefono: "+39 331 39 66 350",
    foto: "/media/team/alessandro-bellomo.jpg",
  },
  {
    slug: "salvatore-sollami",
    nome: "Salvatore Sollami",
    ruolo: "Funzionario Commerciale",
    area: "Enna, Caltanissetta",
    email: "salvatoresollami@dlfmacchine.it",
    telefono: "+39 339 15 26 560",
    foto: "/media/team/salvatore-sollami.jpg",
  },
  {
    slug: "antonio-cufari",
    nome: "Antonio Cufari",
    ruolo: "Funzionario Commerciale",
    area: "Catania, Siracusa",
    email: "antoniocuffari@dlfmacchine.it",
    telefono: "+39 366 44 41 020",
    foto: "/media/team/antonio-cufari.jpeg",
  },
  {
    slug: "carmelo-saitta",
    nome: "Carmelo Saitta",
    ruolo: "Funzionario Commerciale",
    area: "Messina",
    email: "carmelosaitta@dlfmacchine.it",
    telefono: "+39 328 37 40 114",
    foto: "/media/team/carmelo-saitta.jpeg",
  },
  {
    slug: "mariano-lombardo",
    nome: "Mariano Lombardo",
    ruolo: "ADV",
    email: "marianolombardo@dlfmacchine.it",
    telefono: "+39 389 91 77 740",
    foto: "/media/team/mariano-lombardo.jpg",
  },
  {
    slug: "luigi-de-francisci",
    nome: "Luigi De Francisci",
    ruolo: "Responsabile post vendita e magazzino",
    email: "luigidefrancisci@dlfmacchine.it",
    telefono: "+39 331 39 66 352",
    foto: "/media/team/luigi-de-francisci.jpg",
  },
  {
    slug: "carlo-lo-piano",
    nome: "Carlo Lo Piano",
    ruolo: "Ufficio Contabile e Amministrazione",
    email: "carlolopiano@dlfmacchine.it",
    telefono: "+39 331 39 66 349",
    foto: "/media/team/carlo-lo-piano.jpg",
  },
  {
    slug: "floriana-millaci",
    nome: "Floriana Millaci",
    ruolo: "Ufficio Contabile e Amministrazione",
    email: "florianamillaci@dlfmacchine.it",
    telefono: "+39 0934 57 51 76 (int. 4)",
    foto: "/media/team/floriana-millaci.jpg",
  },
  {
    slug: "marco-leonardi",
    nome: "Marco Leonardi",
    ruolo: "Ufficio Leasing",
    email: "marcoleonardi@dlfmacchine.it",
    telefono: "+39 328 40 03 092",
    foto: "/media/team/marco-leonardi.jpeg",
  },
  {
    slug: "angela-castiglione",
    nome: "Angela Castiglione",
    ruolo: "Ufficio Commerciale e Amministrazione",
    email: "angelacastiglione@dlfmacchine.it",
    telefono: "+39 0934 57 51 76 (int. 3)",
    foto: "/media/team/angela-castiglione.jpg",
  },
  {
    slug: "melania-bonifacio",
    nome: "Melania Bonifacio",
    ruolo: "Ufficio Noleggio e Amministrazione",
    area: "Catania",
    email: "melaniabonifacio@dlfmacchine.it",
    telefono: "+39 366 444 4300",
    foto: "/media/team/melania-bonifacio.jpg",
  },
  {
    slug: "jessica-pilato",
    nome: "Jessica Pilato",
    ruolo: "Ufficio Noleggio",
    email: "noleggio@dlfmacchine.it",
    telefono: "+39 331 10 03 659",
    foto: "/media/team/jessica-pilato.jpg",
  },
  {
    slug: "samuele-lo-piano",
    nome: "Samuele Lo Piano",
    ruolo: "Ufficio Noleggio",
    email: "samuelelopiano@dlfmacchine.it",
    telefono: "+39 331 10 03 659",
    foto: "/media/team/samuele-lo-piano.jpg",
  },
];

export type Reparto = {
  slug: string;
  nome: string;
  descrizione: string;
  email: string;
  foto: string;
};

export const reparti: Reparto[] = [
  {
    slug: "officina-caltanissetta",
    nome: "Officina Caltanissetta",
    descrizione: "Meccanici e tecnici specializzati per assistenza e riparazioni.",
    email: "postvendita@dlfmacchine.it",
    foto: "/media/team/officina-caltanissetta.jpg",
  },
  {
    slug: "magazzino-caltanissetta",
    nome: "Magazzino e Post-Vendita Caltanissetta",
    descrizione: "Ricambi originali di tutte le marche, gestione post-vendita.",
    email: "postvendita@dlfmacchine.it",
    foto: "/media/team/magazzino-caltanissetta.jpg",
  },
  {
    slug: "magazzino-catania",
    nome: "Magazzino e Post-Vendita Catania",
    descrizione: "Ricambi e post-vendita per la Sicilia orientale.",
    email: "postvenditacatania@dlfmacchine.it",
    foto: "/media/team/magazzino-catania.jpeg",
  },
];

/** Partner e marchi trattati — loghi reali scaricati dal sito ufficiale. */
export type Partner = { nome: string; logo: string };

export const partner: Partner[] = [
  { nome: "Caterpillar", logo: "/media/partners/cat.png" },
  { nome: "Dieci", logo: "/media/partners/dieci.png" },
  { nome: "Generac", logo: "/media/partners/generac.png" },
  { nome: "Husqvarna", logo: "/media/partners/husqvarna.png" },
  { nome: "Pramac", logo: "/media/partners/pramac.png" },
  { nome: "Baoli", logo: "/media/partners/baoli.png" },
  { nome: "Indeco", logo: "/media/partners/indeco.png" },
  { nome: "Haulotte", logo: "/media/partners/haulotte.png" },
  { nome: "Ghedini", logo: "/media/partners/ghedini.png" },
  { nome: "Genset", logo: "/media/partners/genset.png" },
  { nome: "Luxtower", logo: "/media/partners/luxtower.png" },
  { nome: "Elcos", logo: "/media/partners/elcos.png" },
  { nome: "GCM", logo: "/media/partners/GCM.png" },
  { nome: "Agriforest", logo: "/media/partners/agriforest.png" },
  { nome: "Definitive", logo: "/media/partners/definitive.png" },
  { nome: "Promove Demolition", logo: "/media/partners/promovedemolition.png" },
  { nome: "Kress", logo: "/media/partners/kress.png" },
  { nome: "Lipa", logo: "/media/partners/lipa.png" },
  { nome: "Uemme", logo: "/media/partners/uemme.png" },
  { nome: "Tecna Group", logo: "/media/partners/tecna.jpeg" },
];
