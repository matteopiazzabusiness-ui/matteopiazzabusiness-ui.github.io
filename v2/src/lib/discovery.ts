import { categorie, prodotti, type Categoria } from "./catalog";

export const jobs: { id: string; label: string; description: string; categories: Categoria[]; image: string; terms: string[] }[] = [
  { id: "scavo", label: "Scavare e costruire", description: "Fondazioni, sottoservizi e movimento terra.", categories: ["escavatori", "mini-escavatori"], image: "/media/products/306-cr.jpeg", terms: ["scav", "fondaz", "edil", "tubaz", "fogn", "terra", "demoli"] },
  { id: "carico", label: "Caricare e spostare", description: "Materiali, inerti e lavori di cantiere.", categories: ["minipale-cingolate", "minipale-gommate"], image: "/media/products/299d3-xe.jpeg", terms: ["caric", "inerti", "macerie", "minipala", "spost"] },
  { id: "sollevamento", label: "Sollevare in quota", description: "Pallet e materiali da movimentare in altezza.", categories: ["sollevatori-telescopici"], image: "/media/products/dedalus-30-7-main.jpeg", terms: ["sollev", "quota", "pallet", "altezza", "telescop", "magazzino"] },
  { id: "agricoltura", label: "Lavorare in agricoltura", description: "Movimentazione in azienda agricola.", categories: ["mini-agri", "sollevatori-telescopici"], image: "/media/products/mini-agri-26-6.jpeg", terms: ["agri", "fieno", "stalla", "balle", "azienda agricola"] },
];

export function findJob(text: string) {
  const normalized = text.toLocaleLowerCase("it");
  return jobs.map((job) => ({ job, score: job.terms.filter((term) => normalized.includes(term)).length })).filter(({ score }) => score > 0).sort((a, b) => b.score - a.score)[0]?.job;
}

export function suggestions(jobId: string, space: string, formula: string) {
  const job = jobs.find((entry) => entry.id === jobId);
  if (!job) return [];
  let categories = job.categories;
  if (jobId === "scavo" && space === "stretto") categories = ["mini-escavatori"];
  if (jobId === "scavo" && space === "ampio") categories = ["escavatori"];
  return prodotti.filter((p) => categories.includes(p.categoria) && (formula === "valutare" || p.formule.some((f) => f === formula)))
    .sort((a, b) => Number(b.specVerificate) - Number(a.specVerificate)).slice(0, 3);
}

export const requestTypes = [
  { id: "vendita", label: "Acquisto", icon: "plus", description: "Il prossimo mezzo per la tua impresa." },
  { id: "noleggio", label: "Noleggio", icon: "clock", description: "Un mezzo, per il tempo che ti serve." },
  { id: "assistenza", label: "Assistenza", icon: "tool", description: "Descrivi il problema alla squadra DLF." },
  { id: "ricambi", label: "Ricambi", icon: "search", description: "Partiamo dal modello e dalla matricola." },
  { id: "permuta", label: "Permuta", icon: "compare", description: "Raccontaci il mezzo che vuoi sostituire." },
  { id: "visita", label: "Visita o demo", icon: "pin", description: "Chiedi un incontro nella sede più comoda." },
  { id: "usato", label: "Cerco un usato", icon: "heart", description: "Lascia le caratteristiche che cerchi." },
  { id: "scheda", label: "Scheda e accessori", icon: "file", description: "Richiedi documentazione e compatibilità." },
];

export function requestUrl(type: string, model = "", details = "") {
  const params = new URLSearchParams({ tipo: type });
  if (model) params.set("modello", model);
  if (details) params.set("dettagli", details);
  return `/richiesta?${params}`;
}

export function categoryLabel(category: Categoria) { return categorie[category].label; }
