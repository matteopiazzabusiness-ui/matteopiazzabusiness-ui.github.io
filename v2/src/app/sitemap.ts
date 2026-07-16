import type { MetadataRoute } from "next";
import { prodotti } from "@/lib/catalog";

const BASE = "https://dlfmacchine.it";

export default function sitemap(): MetadataRoute.Sitemap {
  const statiche = ["", "/mezzi", "/noleggio", "/assistenza", "/ricambi", "/dlf", "/contatti"].map((p) => ({
    url: `${BASE}${p}`,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.8,
  }));
  const schede = prodotti.map((p) => ({
    url: `${BASE}/mezzi/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...statiche, ...schede];
}
