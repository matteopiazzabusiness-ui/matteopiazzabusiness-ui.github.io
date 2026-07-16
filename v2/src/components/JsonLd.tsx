import { company, sedi } from "@/lib/site";
import type { Prodotto } from "@/lib/catalog";

/** Schema.org — LocalBusiness per le sedi (footer/home) e Product per le schede. */

export function OrgJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: company.brand,
    legalName: company.legalName,
    email: company.email,
    vatID: company.vat,
    url: "https://dlfmacchine.it",
    sameAs: Object.values(company.social),
    department: sedi.map((s) => ({
      "@type": "LocalBusiness",
      name: s.name,
      telephone: s.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: s.street,
        addressLocality: s.city,
        postalCode: s.zip,
        addressRegion: s.region,
        addressCountry: "IT",
      },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function ProductJsonLd({ p }: { p: Prodotto }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.nome,
    brand: { "@type": "Brand", name: p.brand },
    description: p.descrizione,
    image: p.immagini[0] ? `https://dlfmacchine.it${p.immagini[0]}` : undefined,
    itemCondition: p.condizione === "Usato" ? "https://schema.org/UsedCondition" : "https://schema.org/NewCondition",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "EUR",
      seller: { "@type": "Organization", name: company.legalName },
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
