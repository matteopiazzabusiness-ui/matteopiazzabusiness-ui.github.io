import type { MetadataRoute } from "next";
import { prodotti } from "@/lib/catalog";
import { sedi } from "@/lib/site";

const base = "https://dlfmacchine.it";

export default function sitemap(): MetadataRoute.Sitemap {
  const statiche = ["", "/mezzi", "/noleggio", "/assistenza", "/ricambi", "/dlf", "/contatti"];
  const now = new Date();
  return [
    ...statiche.map((p) => ({ url: `${base}${p}`, lastModified: now, priority: p === "" ? 1 : 0.8 })),
    ...sedi.map((s) => ({ url: `${base}/sedi/${s.slug}`, lastModified: now, priority: 0.7 })),
    ...prodotti.map((p) => ({ url: `${base}/mezzi/${p.slug}`, lastModified: now, priority: 0.6 })),
  ];
}
