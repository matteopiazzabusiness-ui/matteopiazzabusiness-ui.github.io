import { company, sedi } from "@/lib/site";
import type { Prodotto } from "@/lib/catalog";

function Json({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function OrgJsonLd() {
  return (
    <Json
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: company.legalName,
        alternateName: company.brand,
        url: "https://dlfmacchine.it",
        logo: "https://dlfmacchine.it/media/brand/dlf_logo.png",
        vatID: company.vat,
        email: company.email,
        sameAs: [company.social.facebook, company.social.instagram, company.social.linkedin],
      }}
    />
  );
}

export function LocalBusinessJsonLd({ slug }: { slug: string }) {
  const s = sedi.find((x) => x.slug === slug);
  if (!s) return null;
  return (
    <Json
      data={{
        "@context": "https://schema.org",
        "@type": "AutomotiveBusiness",
        "@id": `https://dlfmacchine.it/sedi/${s.slug}`,
        name: s.name,
        parentOrganization: { "@type": "Organization", name: company.legalName },
        address: {
          "@type": "PostalAddress",
          streetAddress: s.street,
          postalCode: s.zip,
          addressLocality: s.city,
          addressRegion: s.province,
          addressCountry: "IT",
        },
        geo: { "@type": "GeoCoordinates", latitude: s.geo.lat, longitude: s.geo.lng },
        telephone: s.phone,
        email: s.email,
        areaServed: s.areaServita,
        openingHours: ["Mo-Fr 08:30-13:00", "Mo-Fr 14:30-18:30", "Sa 08:30-13:00"],
      }}
    />
  );
}

export function ProductJsonLd({ p }: { p: Prodotto }) {
  return (
    <Json
      data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: `${p.nome}`,
        brand: { "@type": "Brand", name: p.brand },
        category: p.categoria,
        description: p.descrizione,
        image: p.immagini.map((i) => `https://dlfmacchine.it${i}`),
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          priceCurrency: "EUR",
          seller: { "@type": "Organization", name: company.legalName },
          // Prezzo su richiesta — nessun prezzo inventato (principio non negoziabile).
        },
      }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  return (
    <Json
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: it.name,
          item: `https://dlfmacchine.it${it.url}`,
        })),
      }}
    />
  );
}
