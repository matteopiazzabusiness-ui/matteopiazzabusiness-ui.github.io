/**
 * MARQUEE — ticker editoriale infinito, due righe in direzioni opposte.
 * Accento cinetico puro CSS (nessun JS): outline poster su carbone,
 * pausa all'hover. Ritma il passaggio tra sezioni chiare e scure.
 */

const RIGA_A = ["Escavatori", "Mini escavatori", "Minipale cingolate", "Minipale gommate", "Sollevatori telescopici"];
const RIGA_B = ["Vendita", "Noleggio", "Assistenza", "Ricambi", "Leasing", "Usato garantito"];

function Riga({ voci, reverse }: { voci: string[]; reverse?: boolean }) {
  const set = (
    <div className="ticker-track" style={reverse ? { animationDirection: "reverse" } : undefined} aria-hidden>
      {[0, 1].map((dup) => (
        <div key={dup} className="flex shrink-0">
          {voci.map((v) => (
            <span key={v} className="flex items-center whitespace-nowrap">
              <span className="t-poster px-6 text-5xl text-paper/90 sm:text-7xl">{v}</span>
              <span className="text-3xl text-giallo sm:text-5xl">•</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
  return <div className="ticker overflow-hidden">{set}</div>;
}

export function Marquee() {
  return (
    <section aria-label="Servizi e mezzi DLF" className="flow-flat grain relative overflow-hidden border-y border-paper/10 bg-carbon py-8">
      <Riga voci={RIGA_A} />
      <div className="h-3" />
      <Riga voci={RIGA_B} reverse />
    </section>
  );
}
