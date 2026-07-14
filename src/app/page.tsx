import { prodotti } from "@/lib/catalog";
import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { IntentBento } from "@/components/home/IntentBento";
import { PinnedShowcase } from "@/components/home/PinnedShowcase";
import { BrandMarquee } from "@/components/home/BrandMarquee";
import { ShaderStatement } from "@/components/home/ShaderStatement";
import { ServicesSticky } from "@/components/home/ServicesSticky";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { Territory } from "@/components/home/Territory";
import { FinalCta } from "@/components/home/FinalCta";

export default function Home() {
  const showcase = prodotti.filter((p) => p.specVerificate || p.immagini.length > 0).slice(0, 8);
  const showcaseFull = showcase.length >= 6 ? showcase : prodotti.slice(0, 8);

  return (
    <>
      <Hero />
      <Stats />
      <IntentBento />
      <PinnedShowcase prodotti={showcaseFull} />
      <BrandMarquee />
      <ShaderStatement />
      <ServicesSticky />
      <ProcessTimeline />
      <Territory />
      <FinalCta />
    </>
  );
}
