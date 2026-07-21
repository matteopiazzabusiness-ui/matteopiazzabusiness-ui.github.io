import { prodotti } from "@/lib/catalog";
import { Overture } from "@/components/home/Overture";
import { Numeri } from "@/components/home/Numeri";
import { Manifesto } from "@/components/home/Manifesto";
import { Rail } from "@/components/home/Rail";
import { ShowcaseServizi } from "@/components/home/ShowcaseServizi";
import { Processo } from "@/components/home/Processo";
import { Territorio } from "@/components/home/Territorio";
import { PercheDlf } from "@/components/home/PercheDlf";
import { Squadra } from "@/components/home/Squadra";
import { Muro } from "@/components/home/Muro";
import { Chiusa } from "@/components/home/Chiusa";
import { SettoriTeaser } from "@/components/home/SettoriTeaser";
import { BlogTeaser } from "@/components/home/BlogTeaser";
import { Marquee } from "@/components/home/Marquee";
import { Cinematica } from "@/components/home/Cinematica";
import { Mosaico } from "@/components/home/Mosaico";

/**
 * HOMEPAGE — viaggio in 11 tappe, alternanza carta/carbone:
 * Overture → Numeri → Manifesto → Rail flotta → 4 Intenti → Processo →
 * Territorio → Perché DLF → Squadra → Muro marchi → Chiusa gialla.
 * (Sezione 3D rimossa: senza un modello realistico non entra in pagina.)
 */
export default function Home() {
  const flagship = ["306-cr", "dedalus-30-7-gd", "313-gc", "299d3-xe", "272d3-xe", "hercules-210-10", "301-7-cr", "262d3"];
  const bySlug = new Map(prodotti.map((p) => [p.slug, p]));
  const rail = flagship
    .map((s) => bySlug.get(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p?.immagini.length));

  return (
    <>
      <Overture />
      <Numeri />
      <Marquee />
      <Manifesto />
      <Rail prodotti={rail} />
      <Mosaico />
      <ShowcaseServizi />
      <SettoriTeaser />
      <Cinematica />
      <Processo />
      <Territorio />
      <PercheDlf />
      <Squadra />
      <BlogTeaser />
      <Muro />
      <Chiusa />
    </>
  );
}
