import { prodotti } from "@/lib/catalog";
import { Overture } from "@/components/home/Overture";
import { Manifesto } from "@/components/home/Manifesto";
import { Rail } from "@/components/home/Rail";
import { Numeri } from "@/components/home/Numeri";
import { Intenti } from "@/components/home/Intenti";
import { Squadra } from "@/components/home/Squadra";
import { Muro } from "@/components/home/Muro";
import { Chiusa } from "@/components/home/Chiusa";

export default function Home() {
  // Vetrina rail: modelli di punta con foto, mix per categoria.
  const flagship = ["306-cr", "dedalus-30-7-gd", "313-gc", "299d3-xe", "272d3-xe", "hercules-210-10", "301-7-cr", "262d3"];
  const bySlug = new Map(prodotti.map((p) => [p.slug, p]));
  const rail = flagship
    .map((s) => bySlug.get(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p?.immagini.length));

  return (
    <>
      <Overture />
      <Manifesto />
      <Rail prodotti={rail} />
      <Numeri />
      <Intenti />
      <Squadra />
      <Muro />
      <Chiusa />
    </>
  );
}
