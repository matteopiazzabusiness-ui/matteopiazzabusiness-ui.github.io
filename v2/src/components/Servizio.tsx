import Link from "next/link";
import Image from "next/image";
import { PageHead } from "@/components/PageHead";
import { company } from "@/lib/site";

export type ServizioProps = {
  label: string;
  title: string;
  intro: string;
  img: string;
  punti: { t: string; d: string }[];
  faq: { q: string; a: string }[];
  intento: string;
};

/** Landing servizio condivisa: intro, immagine, punti numerati, FAQ, CTA. */
export function Servizio({ label, title, intro, img, punti, faq, intento }: ServizioProps) {
  return (
    <>
      <PageHead label={label} title={title}>{intro}</PageHead>

      <div className="relative mx-5 aspect-[16/7] overflow-hidden sm:mx-8">
        <Image src={img} alt={title} fill priority sizes="100vw" className="object-cover" />
      </div>

      <section className="grid gap-x-10 gap-y-8 px-5 py-20 sm:px-8 lg:grid-cols-3">
        {punti.map((p, i) => (
          <div key={p.t} className="border-t-2 border-ink pt-4">
            <span className="t-label text-giallo-deep">0{i + 1}</span>
            <h2 className="t-poster mt-2 text-3xl text-ink">{p.t}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.d}</p>
          </div>
        ))}
      </section>

      <section className="grain relative bg-carbon px-5 py-20 text-paper sm:px-8">
        <h2 className="t-poster text-4xl text-paper sm:text-5xl">Domande frequenti</h2>
        <div className="mt-8 max-w-3xl">
          {faq.map((f) => (
            <details key={f.q} className="group border-b border-paper/15 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-paper">
                {f.q}
                <span className="t-poster text-2xl text-giallo transition-transform duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-paper/70">{f.a}</p>
            </details>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href={`/contatti?intento=${intento}`}
            className="t-label bg-giallo px-8 py-4 text-ink transition-colors hover:bg-paper"
          >
            Richiedi informazioni {"->"}
          </Link>
          <a
            href={`https://wa.me/${company.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="t-label border border-paper/40 px-8 py-4 text-paper transition-colors hover:bg-paper hover:text-ink"
          >
            WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
