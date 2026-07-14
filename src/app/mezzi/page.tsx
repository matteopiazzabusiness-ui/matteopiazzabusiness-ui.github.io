import type { Metadata } from "next";
import { Container, Section, Eyebrow } from "@/components/ui";
import { CatalogClient } from "@/components/CatalogClient";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Mezzi movimento terra — Caterpillar e Dieci",
  description:
    "Catalogo mezzi DLF: escavatori, mini escavatori, minipale cingolate e gommate Caterpillar, sollevatori telescopici Dieci. Vendita e noleggio in Sicilia.",
};

export default function MezziPage() {
  return (
    <Section className="bg-surface">
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Mezzi", url: "/mezzi" }]} />
      <Container>
        <Eyebrow>Gamma mezzi</Eyebrow>
        <h1 className="mt-3 text-4xl font-bold">Mezzi movimento terra</h1>
        <p className="mt-3 max-w-2xl text-slate">
          Escavatori, mini escavatori, minipale e sollevatori telescopici. Filtra per categoria e marca.
          Le schede tecniche complete sono disponibili su richiesta per i modelli non ancora dettagliati.
        </p>
        <div className="mt-10">
          <CatalogClient />
        </div>
      </Container>
    </Section>
  );
}
