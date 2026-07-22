import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/PageHead";
import { Faq } from "@/components/Faq";
import { Reveal } from "@/components/Reveal";
import { faqGruppi, faqTutte } from "@/lib/faq";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Domande frequenti — vendita, noleggio, assistenza, ricambi",
  description:
    "Le risposte alle domande più frequenti su vendita, noleggio, assistenza e ricambi DLF Macchine: sedi, orari, consegne, garanzie e altro.",
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqTutte.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHead label="Domande frequenti" title="Le risposte, in chiaro">
        Tutto quello che ci chiedono più spesso su vendita, noleggio, assistenza e ricambi. Non trovi la
        tua risposta? Scrivici: rispondiamo in giornata lavorativa.
      </PageHead>

      <section className="px-5 pb-24 sm:px-8">
        {/* Indice temi */}
        <nav aria-label="Temi" className="flex flex-wrap gap-2 border-y border-ink/15 py-6">
          {faqGruppi.map((g) => (
            <a key={g.slug} href={`#${g.slug}`} className="t-label border border-ink/25 px-4 py-2 text-ink transition-colors hover:bg-ink hover:text-paper">
              {g.tema}
            </a>
          ))}
        </nav>

        <Reveal className="mt-8 space-y-14">
          {faqGruppi.map((g) => (
            <div key={g.slug} id={g.slug} className="rv scroll-mt-24">
              <h2 className="t-poster text-3xl text-ink sm:text-4xl">{g.tema}</h2>
              <div className="mt-4">
                <Faq voci={g.voci} />
              </div>
            </div>
          ))}
        </Reveal>

        {/* CTA */}
        <div className="mt-16 border-t-2 border-ink pt-10">
          <h2 className="t-poster text-4xl text-ink sm:text-5xl">Non hai trovato la risposta?</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/contatti" className="t-label bg-carbon px-8 py-4 text-paper transition-colors hover:bg-giallo hover:text-ink">Contattaci {"->"}</Link>
            <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noopener noreferrer" className="t-label border border-ink px-8 py-4 text-ink transition-colors hover:bg-ink hover:text-paper">WhatsApp</a>
          </div>
        </div>
      </section>
    </>
  );
}
