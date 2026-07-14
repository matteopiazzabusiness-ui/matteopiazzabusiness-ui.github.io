import type { NextConfig } from "next";

// Security baseline (audit: header assenti sul sito attuale).
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self)" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "img-src 'self' data: https:",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  // Redirect registry — preserva valore SEO URL legacy WooCommerce (audit Fase 10).
  async redirects() {
    return [
      { source: "/prodotto/:slug", destination: "/mezzi/:slug", permanent: true },
      { source: "/product-category/:path*", destination: "/mezzi", permanent: true },
      { source: "/chi-siamo", destination: "/dlf", permanent: true },
    ];
  },
};

export default nextConfig;
