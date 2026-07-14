import Link from "next/link";
import { company, sedi, orari } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto bg-graphite-950 text-white/80">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="text-white font-display text-xl font-bold">DLF Macchine</div>
          <p className="mt-3 text-sm leading-relaxed">{company.claim}</p>
          <p className="mt-4 text-xs text-white/50">
            {company.legalName} · P.IVA {company.vat} · REA {company.rea}
          </p>
        </div>

        <div>
          <h3 className="text-white text-sm font-bold uppercase tracking-wide">Servizi</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/mezzi" className="hover:text-brand">Vendita mezzi</Link></li>
            <li><Link href="/noleggio" className="hover:text-brand">Noleggio</Link></li>
            <li><Link href="/assistenza" className="hover:text-brand">Assistenza</Link></li>
            <li><Link href="/ricambi" className="hover:text-brand">Ricambi</Link></li>
          </ul>
        </div>

        {sedi.map((s) => (
          <div key={s.slug}>
            <h3 className="text-white text-sm font-bold uppercase tracking-wide">{s.city}</h3>
            <address className="mt-4 not-italic text-sm space-y-1">
              <p>{s.street}</p>
              <p>{s.zip} {s.city} ({s.province})</p>
              <p><a href={`tel:${s.phone.replace(/\s/g, "")}`} className="hover:text-brand">{s.phone}</a></p>
              <p><a href={`mailto:${s.email}`} className="hover:text-brand">{s.email}</a></p>
            </address>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-5 flex flex-col sm:flex-row justify-between gap-3 text-xs text-white/50">
          <p>{orari.feriali} · {orari.sabato}</p>
          <p>© {new Date().getFullYear()} {company.legalName}. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  );
}
