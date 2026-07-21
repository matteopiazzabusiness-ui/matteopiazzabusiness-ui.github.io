"use client";

/**
 * Template — rimonta a ogni navigazione, quindi applica la transizione
 * d'ingresso pagina (.page-in). Nessun JS: solo animazione CSS, reduce-motion safe.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
