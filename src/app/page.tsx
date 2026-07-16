import { prodotti } from "@/lib/catalog";
import { Journey3D } from "@/components/home/Journey3D";
import { Stats } from "@/components/home/Stats";
import { IntentBento } from "@/components/home/IntentBento";
import { PinnedShowcase } from "@/components/home/PinnedShowcase";
import { BrandMarquee } from "@/components/home/BrandMarquee";
import { ShaderStatement } from "@/components/home/ShaderStatement";
import { ServicesSticky } from "@/components/home/ServicesSticky";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { ParticleMorph } from "@/components/home/ParticleMorph";
import { Territory } from "@/components/home/Territory";
import { FinalCta } from "@/components/home/FinalCta";

export default function Home() {
  // Vetrina: modelli di punta reali, mix bilanciato per categoria.
  const flagship = ["306-cr", "dedalus-30-7-gd", "313-gc", "299d3-xe", "272d3-xe", "hercules-210-10", "301-7-cr", "262d3"];
  const bySlug = new Map(prodotti.map((p) => [p.slug, p]));
  const showcaseFull = flagship
    .map((s) => bySlug.get(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p?.immagini.length));

  return (
    <>
      <Journey3D />
      <Stats />
      <IntentBento />
      <PinnedShowcase prodotti={showcaseFull} />
      <BrandMarquee />
      <ShaderStatement />
      <ServicesSticky />
      <ProcessTimeline />
      <ParticleMorph />
      <Territory />
      <FinalCta />
    </>
  );
}
