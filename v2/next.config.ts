import type { NextConfig } from "next";

// Security header assenti sul sito attuale (audit) — qui presenti dal giorno 1.
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  // Root esplicita: evita che Turbopack scelga il lockfile della cartella
  // genitore come radice del progetto (warning multi-lockfile).
  turbopack: { root: __dirname },
  // Qualità immagini consentite (Next 16 le limita): 75 default + 90/95 per le
  // foto in evidenza dello showcase e delle schede.
  images: { qualities: [70, 75, 90, 95] },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
