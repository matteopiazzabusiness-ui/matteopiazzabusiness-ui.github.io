import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHead } from "@/components/PageHead";
import { Reveal } from "@/components/Reveal";
import { company, valori, sedi, numeri, storia, certificazioni } from "@/lib/site";
import { team, reparti, partner } from "@/lib/team";

export const metadata: Metadata = {
  title: "Chi siamo — il team DLF Macchine",
  description:
    "DLF S.r.l., concessionaria Caterpillar e Dieci in Sicilia. Il team completo: commerciali di zona, noleggio, leasing, officina e magazzini ricambi.",
};

export default function DlfPage() {
  return (
    <>
      <PageHead label="Chi siamo" title="Le persone dietro il successo">
        {company.legalName} è concessionaria Caterpillar e Dieci con due sedi operative in Sicilia,
        guidata dal CEO Delfino Maria La Ferla. Professionalità, esperienza e passione al vostro servizio.
      </PageHead>

      {/* Numeri */}
      <section className="px-5 pb-16 sm:px-8">
        <div className="grid gap-px border border-ink/15 bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
          {numeri.map((n) => (
            <div key={n.label} className="bg-paper p-6">
              <p className="t-poster text-6xl text-ink">{n.valore}</p>
              <p className="t-label mt-2 text-ink">{n.label}</p>
              <p className="mt-1 text-sm text-ink-soft">{n.nota}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Storia */}
      <Reveal as="section" className="grain relative bg-carbon px-5 py-20 text-paper sm:px-8">
        <p className="t-label text-giallo">La nostra storia</p>
        <h2 className="t-poster mt-2 text-4xl text-paper sm:text-6xl">Da officina a concessionaria di riferimento</h2>
        <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {storia.map((t, i) => (
            <div key={t.fase} className="rv border-t-2 border-paper/30 pt-4">
              <span className="t-label text-giallo">0{i + 1}</span>
              <h3 className="t-poster mt-2 text-2xl text-paper">{t.fase}</h3>
              <p className="mt-2 text-sm leading-relaxed text-paper/70">{t.testo}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Team completo */}
      <section className="px-5 pb-20 sm:px-8">
        <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <article key={m.slug} className="group">
              <div className="relative aspect-[4/5] overflow-hidden bg-paper-2">
                <Image
                  src={m.foto}
                  alt={m.nome}
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover object-top saturate-0 transition-all duration-500 group-hover:scale-[1.03] group-hover:saturate-100"
                />
                <span className="t-label absolute left-3 top-3 bg-paper/90 px-2 py-1 text-ink">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h2 className="t-poster mt-4 text-2xl text-ink">{m.nome}</h2>
              <p className="t-label mt-1 text-ink-soft">
                {m.ruolo}{m.area ? ` · ${m.area}` : ""}
              </p>
              <div className="mt-2 space-y-0.5 text-sm">
                {m.telefono && <a href={`tel:${m.telefono.replace(/[^+\d]/g, "")}`} className="u-line block text-ink-soft">{m.telefono}</a>}
                <a href={`mailto:${m.email}`} className="u-line block truncate text-ink-soft">{m.email}</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Reparti */}
      <section className="grain relative bg-carbon px-5 py-20 text-paper sm:px-8">
        <p className="t-label text-giallo">Officina & magazzini</p>
        <h2 className="t-poster mt-2 text-4xl text-paper sm:text-6xl">La squadra specializzata</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {reparti.map((r) => (
            <article key={r.slug} className="group">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={r.foto} alt={r.nome} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <h3 className="t-poster mt-4 text-2xl text-paper">{r.nome}</h3>
              <p className="mt-1 text-sm text-paper/60">{r.descrizione}</p>
              <a href={`mailto:${r.email}`} className="u-line mt-2 inline-block text-sm text-giallo">{r.email}</a>
            </article>
          ))}
        </div>
      </section>

      {/* Valori + dati societari */}
      <section className="px-5 py-20 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <p className="t-label text-ink-soft">I valori</p>
            <div className="mt-6 space-y-6">
              {valori.map((v, i) => (
                <div key={v.titolo} className="flex items-baseline gap-5 border-t border-ink/15 pt-4">
                  <span className="t-label text-giallo-deep">0{i + 1}</span>
                  <div>
                    <h3 className="t-poster text-2xl text-ink">{v.titolo}</h3>
                    <p className="mt-1 text-sm text-ink-soft">{v.testo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="t-label text-ink-soft">Dati societari</p>
            <dl className="mt-6 space-y-2">
              {[["Ragione sociale", company.legalName], ["P.IVA", company.vat], ["REA", company.rea], ["Capitale sociale", company.capital], ["PEC", company.pec]].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-ink/15 py-2">
                  <dt className="text-sm text-ink-soft">{k}</dt>
                  <dd className="font-[family-name:var(--font-jet)] text-sm font-semibold text-ink">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="t-label mt-8 text-ink-soft">Sedi</p>
            <ul className="mt-3 space-y-2 text-sm text-ink">
              {sedi.map((s) => (
                <li key={s.slug}><strong>{s.city}</strong> — {s.street}, {s.zip} ({s.province})</li>
              ))}
            </ul>
            <p className="t-label mt-8 text-ink-soft">Credenziali</p>
            <ul className="mt-3 space-y-2">
              {certificazioni.map((c) => (
                <li key={c} className="flex items-baseline gap-3 border-b border-ink/15 py-2 text-sm text-ink">
                  <span className="text-giallo-deep">✓</span>{c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Marchi trattati — loghi */}
      <section className="border-t border-ink/15 px-5 py-20 sm:px-8">
        <div className="flex items-baseline justify-between">
          <h2 className="t-poster text-4xl text-ink sm:text-5xl">Marchi e partner</h2>
          <span className="t-label text-ink-soft">{partner.length} marchi</span>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-px border border-ink/10 bg-ink/10 sm:grid-cols-4 lg:grid-cols-5">
          {partner.map((p) => (
            <div key={p.nome} className="flex aspect-[3/2] items-center justify-center bg-paper p-6">
              <Image src={p.logo} alt={p.nome} width={140} height={70} className="max-h-14 w-auto object-contain opacity-70 transition-opacity duration-300 hover:opacity-100" />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-giallo px-5 py-16 sm:px-8">
        <h2 className="t-poster max-w-3xl text-4xl text-ink sm:text-6xl">Vuoi lavorare con noi o conoscerci meglio?</h2>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/contatti" className="t-label bg-ink px-8 py-4 text-paper transition-colors hover:bg-carbon">Contattaci {"->"}</Link>
          <Link href="/mezzi" className="t-label border border-ink px-8 py-4 text-ink transition-colors hover:bg-ink hover:text-paper">Scopri i mezzi</Link>
        </div>
      </section>
    </>
  );
}
