import type { Metadata } from "next";
import { PageHead } from "@/components/PageHead";
import { Catalogo } from "@/components/Catalogo";

export const metadata: Metadata = {
  title: "Mezzi movimento terra — Caterpillar e Dieci",
  description:
    "Catalogo mezzi DLF: escavatori, mini escavatori, minipale cingolate e gommate Caterpillar, sollevatori telescopici Dieci. Vendita e noleggio in Sicilia.",
};

export default function MezziPage() {
  return (
    <>
      <PageHead label="Gamma mezzi" title="Il catalogo">
        Escavatori, mini escavatori, minipale e sollevatori telescopici. Filtra per categoria e marca —
        le schede complete dei modelli non ancora dettagliati sono disponibili su richiesta.
      </PageHead>
      <Catalogo />
    </>
  );
}
