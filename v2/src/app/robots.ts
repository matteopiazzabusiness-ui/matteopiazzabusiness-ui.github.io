import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: process.env.GITHUB_PAGES === "true"
      ? { userAgent: "*", disallow: "/" }
      : { userAgent: "*", allow: "/" },
    sitemap: "https://dlfmacchine.it/sitemap.xml",
  };
}
