import Image from "next/image";
import { partner } from "@/lib/team";

// Brand wall — loghi reali dei partner, doppia fascia controrotante.
// CSS puro (pause all'hover), nessun JS: zero costo runtime.
export function BrandMarquee() {
  const mid = Math.ceil(partner.length / 2);
  const rowA = [...partner.slice(0, mid), ...partner.slice(0, mid)];
  const rowB = [...partner.slice(mid), ...partner.slice(mid)];

  return (
    <section className="section-fade border-y border-white/10 bg-graphite-900 py-14 text-white sm:py-20">
      <div className="mx-auto mb-8 max-w-6xl px-4 sm:px-6">
        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand">
          <span className="h-px w-6 bg-brand" /> Marchi e partner
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
          {partner.length} marchi, un solo interlocutore
        </h2>
      </div>

      <div className="marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track items-center gap-10 pr-10">
          {rowA.map((p, i) => (
            <LogoCard key={`a-${p.nome}-${i}`} nome={p.nome} logo={p.logo} />
          ))}
        </div>
      </div>
      <div className="marquee relative mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track marquee-reverse items-center gap-10 pr-10">
          {rowB.map((p, i) => (
            <LogoCard key={`b-${p.nome}-${i}`} nome={p.nome} logo={p.logo} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LogoCard({ nome, logo }: { nome: string; logo: string }) {
  return (
    <div className="group flex h-24 w-44 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/95 px-6 transition-all duration-300 hover:border-brand/60 hover:bg-white">
      <Image
        src={logo}
        alt={nome}
        width={140}
        height={72}
        className="max-h-16 w-auto object-contain opacity-80 saturate-0 transition-all duration-300 group-hover:opacity-100 group-hover:saturate-100"
      />
    </div>
  );
}
