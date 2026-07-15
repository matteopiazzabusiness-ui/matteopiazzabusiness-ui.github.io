import { marchi } from "@/lib/site";

// Marquee infinito — brand wall. CSS puro, si mette in pausa all'hover.
export function BrandMarquee() {
  const row = [...marchi, ...marchi];
  return (
    <section className="section-fade border-y border-white/10 bg-graphite-900 py-12 text-white sm:py-16">
      <div className="mx-auto mb-6 max-w-6xl px-4 sm:px-6">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/40">Marchi trattati</span>
      </div>
      <div className="marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track gap-16 pr-16">
          {row.map((m, i) => (
            <span key={`${m}-${i}`} className="font-display text-3xl font-bold text-white/30 transition-colors hover:text-brand sm:text-4xl">
              {m}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
