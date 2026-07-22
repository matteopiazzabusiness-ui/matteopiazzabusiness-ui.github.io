import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-carbon px-5 text-paper sm:px-8">
      {/* Numero fantasma gigante */}
      <span aria-hidden className="t-poster pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 select-none text-[52vw] leading-none text-paper/[0.05] sm:text-[34vw]">404</span>

      <Reveal className="relative z-10">
        <p className="rv t-label text-giallo">Errore 404</p>
        <h1 className="rv t-poster mt-4 text-[18vw] leading-none sm:text-[12vw]">Fuori pista</h1>
        <p className="rv mt-6 max-w-md text-paper/60">
          La pagina che cerchi non esiste o è stata spostata. Torna alla home, esplora il catalogo mezzi
          o scegli il settore che ti interessa.
        </p>
        <div className="rv mt-10 flex flex-wrap gap-3">
          <Link href="/" className="t-label bg-giallo px-8 py-4 text-ink transition-colors hover:bg-paper">Home {"->"}</Link>
          <Link href="/mezzi" className="t-label border border-paper/40 px-8 py-4 text-paper transition-colors hover:bg-paper hover:text-ink">Catalogo mezzi</Link>
          <Link href="/contatti" className="t-label border border-paper/40 px-8 py-4 text-paper transition-colors hover:bg-paper hover:text-ink">Contatti</Link>
        </div>
      </Reveal>
    </section>
  );
}
