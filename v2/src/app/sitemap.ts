import type { MetadataRoute } from "next";
import { prodotti } from "@/lib/catalog";
import { settori } from "@/lib/settori";
import { posts } from "@/lib/blog";

const BASE = "https://dlfmacchine.it";

export default function sitemap(): MetadataRoute.Sitemap {
  const statiche = ["", "/mezzi", "/settori", "/noleggio", "/assistenza", "/ricambi", "/leasing", "/usato", "/blog", "/faq", "/dlf", "/contatti", "/privacy", "/cookie"].map((p) => ({
    url: `${BASE}${p}`,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.8,
  }));
  const schede = prodotti.map((p) => ({
    url: `${BASE}/mezzi/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  const settoriUrl = settori.map((s) => ({
    url: `${BASE}/settori/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const blogUrl = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));
  return [...statiche, ...schede, ...settoriUrl, ...blogUrl];
}
