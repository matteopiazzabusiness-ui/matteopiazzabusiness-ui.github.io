import Link from "next/link";
import { company, sedi, orari } from "@/lib/site";

export function Footer() {
  return (
    <footer className="grain relative bg-carbon text-paper">
      <div className="px-5 pb-10 pt-20 sm:px-8">
        <p className="t-label text-giallo">Parliamo del tuo cantiere</p>
        <a
          href="mailto:info@dlfmacchine.it"
          className="t-poster mt-4 block text-[13vw] leading-none text-paper transition-colors duration-300 hover:text-giallo sm:text-[9vw]"
        >
          Contattaci
        </a>

        <div className="mt-16 grid gap-10 border-t border-paper/15 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {sedi.map((s) => (
            <div key={s.slug}>
              <h3 className="t-label text-paper/50">{s.city} ({s.province})</h3>
              <p className="mt-3 text-sm text-paper/80">{s.street}, {s.zip} {s.city}</p>
              <p className="mt-1 text-sm"><a className="u-line" href={`tel:${s.phone.replace(/\s/g, "")}`}>{s.phone}</a></p>
              <p className="text-sm"><a className="u-line" href={`tel:${s.mobile.replace(/\s/g, "")}`}>{s.mobile}</a></p>
            </div>
          ))}
          <div>
            <h3 className="t-label text-paper/50">Orari</h3>
            <p className="mt-3 text-sm text-paper/80">{orari.feriali}</p>
            <p className="text-sm text-paper/80">{orari.sabato}</p>
          </div>
          <div>
            <h3 className="t-label text-paper/50">Naviga</h3>
            <ul className="mt-3 space-y-1 text-sm">
              {[["/mezzi", "Mezzi"], ["/noleggio", "Noleggio"], ["/assistenza", "Assistenza"], ["/ricambi", "Ricambi"], ["/dlf", "Chi siamo"], ["/contatti", "Contatti"]].map(([h, l]) => (
                <li key={h}><Link href={h} className="u-line">{l}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-paper/15 pt-6">
          <p className="t-label text-paper/40">
            © {new Date().getFullYear()} {company.legalName} · P.IVA {company.vat} · REA {company.rea} · PEC {company.pec}
          </p>
          <div className="flex gap-6">
            <a href={company.social.facebook} className="t-label u-line text-paper/60" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href={company.social.instagram} className="t-label u-line text-paper/60" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={company.social.linkedin} className="t-label u-line text-paper/60" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
