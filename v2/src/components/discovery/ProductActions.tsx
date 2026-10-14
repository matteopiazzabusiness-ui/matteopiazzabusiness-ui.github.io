"use client";

import { useState } from "react";
import Link from "next/link";
import { useSelection } from "@/lib/selection";
import { Icon } from "./Icons";

export function ProductActions({ slug }: { slug: string }) {
  const { selected, toggle } = useSelection();
  const [message, setMessage] = useState("");
  const active = selected.includes(slug);
  return <div className="dlf-product-actions">
    <div className="dlf-action-row">
      <button type="button" aria-pressed={active} onClick={() => {
        const result = toggle(slug);
        setMessage(result === "full" ? "Hai già 4 mezzi. Apri la selezione per cambiarli." : result === "unavailable" ? "Il browser non consente il salvataggio. Puoi aprire il confronto diretto." : result === "added" ? "Aggiunto alla tua selezione." : "Rimosso dalla selezione.");
      }} className={`dlf-save ${active ? "is-active" : ""}`}><Icon name={active ? "check" : "heart"} size={17} />{active ? "Salvato" : "Salva mezzo"}</button>
      <Link className="dlf-save" href={`/selezione?mezzi=${encodeURIComponent([...new Set([slug, ...selected])].slice(0, 4).join(","))}`}><Icon name="compare" size={17} />Confronta</Link>
    </div>
    <span className="dlf-feedback" role="status">{message}</span>
  </div>;
}

export function SelectionLink() {
  const { selected } = useSelection();
  return <Link href="/selezione" className="dlf-header-selection" aria-label={`La tua selezione: ${selected.length} mezzi`}><Icon name="heart" size={19} /><span className="dlf-selection-label">Selezione</span><span className="dlf-count">{selected.length}</span></Link>;
}
