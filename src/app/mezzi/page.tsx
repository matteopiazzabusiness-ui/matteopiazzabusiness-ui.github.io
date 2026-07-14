import type { Metadata } from "next";
import { Container, Section } from "@/components/ui";
import { CatalogClient } from "@/components/CatalogClient";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { PageIntro } from "@/components/anim/PageIntro";

export const metadata: Metadata = {
  title: "Mezzi movimento terra — Caterpillar e Dieci",
  description:
    "Catalogo mezzi DLF: escavatori, mini escavatori, minipale cingolate e gommate Caterpillar, sollevatori telescopici Dieci. Vendita e noleggio in Sicilia.",
};

export default function MezziPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Mezzi", url: "/mezzi" }]} />
      <PageIntro eyebrow="Gamma mezzi" title="Mezzi movimento terra">
        Escavatori, mini escavatori, minipale e sollevatori telescopici. Filtra per categoria e marca.
        Le schede tecniche complete sono disponibili su richiesta per i modelli non ancora dettagliati.
      </PageIntro>
      <Section className="bg-surface">
        <Container>
          <CatalogClient />
        </Container>
      </Section>
    </>
  );
}
