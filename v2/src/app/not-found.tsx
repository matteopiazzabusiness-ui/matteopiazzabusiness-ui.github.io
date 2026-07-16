import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] flex-col justify-center bg-carbon px-5 text-paper sm:px-8">
      <p className="t-label text-giallo">Errore 404</p>
      <h1 className="t-poster mt-4 text-[18vw] leading-none sm:text-[12vw]">Fuori pista</h1>
      <p className="mt-6 max-w-md text-paper/60">
        La pagina che cerchi non esiste o è stata spostata. Torna alla home o dai
        un&apos;occhiata al catalogo mezzi.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/" className="t-label bg-giallo px-8 py-4 text-ink transition-colors hover:bg-paper">Home {"->"}</Link>
        <Link href="/mezzi" className="t-label border border-paper/40 px-8 py-4 text-paper transition-colors hover:bg-paper hover:text-ink">Catalogo mezzi</Link>
      </div>
    </section>
  );
}
