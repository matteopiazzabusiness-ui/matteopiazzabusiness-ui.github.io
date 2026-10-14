"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { prodotti, categorie } from "@/lib/catalog";
import { useSelection } from "@/lib/selection";
import { requestUrl } from "@/lib/discovery";
import { Icon } from "./Icons";

export function Selection() {
  const params = useSearchParams();
  const { selected, save } = useSelection();
  const [override, setOverride] = useState<string[] | null>(null);
  const [message, setMessage] = useState("");
  const [copyUrl, setCopyUrl] = useState("");
  const shared = params.get("mezzi");
  const ids = override ?? (shared !== null ? [...new Set(shared.split(","))].slice(0, 4) : selected);
  const models = ids.flatMap((id) => { const p = prodotti.find((item) => item.slug === id); return p ? [p] : []; });
  const specLabels = [...new Set(models.filter((p) => p.specVerificate).flatMap((p) => p.spec.map((s) => s.label)))];
  const names = models.map((p) => p.nome).join(", ");
  async function share() {
    const url = new URL("/selezione/", window.location.origin);
    url.searchParams.set("mezzi", models.map((p) => p.slug).join(","));
    setCopyUrl(url.href);
    try { await navigator.clipboard.writeText(url.href); setMessage("Link copiato. Puoi inviarlo al tuo collega."); } catch { setMessage("Copia il link dal campo qui sotto."); }
  }
  return <div className="dlf-workspace">
    <div className="dlf-workspace-head"><p className="dlf-eyebrow">DLF / La tua selezione</p><h1>Le idee,<br /><span>a confronto.</span></h1><p>Fino a quattro mezzi, tutti sullo stesso tavolo. Salva la selezione, condividila con la tua squadra e chiedi a DLF i dettagli che mancano.</p></div>
    <div className="dlf-selection-toolbar"><span className="dlf-eyebrow">{models.length.toString().padStart(2, "0")} / 04 mezzi</span><div><Link href="/mezzi" className="dlf-save"><Icon name="plus" size={18} /> Aggiungi dal catalogo</Link>{models.length > 0 && <><button onClick={share} className="dlf-save"><Icon name="share" size={18} /> Condividi</button>{shared !== null && <button className="dlf-save" onClick={() => setMessage(save(models.map((p) => p.slug)) ? "Selezione salvata su questo dispositivo." : "Il browser non consente il salvataggio.")}><Icon name="heart" size={18} /> Salva sul dispositivo</button>}</>}</div></div>
    <div role="status" className="dlf-share-message">{message}</div>{copyUrl && <label className="dlf-share-field">Link della selezione<input readOnly value={copyUrl} onFocus={(event) => event.target.select()} /></label>}
    {models.length === 0 ? <div className="dlf-empty"><Icon name="compare" size={52} /><h2>Il confronto comincia<br />con il primo mezzo.</h2><p>Nel catalogo scegli “Salva mezzo”. Ritroverai qui le tue scelte, anche quando torni.</p><Link href="/mezzi" className="dlf-button">Esplora il catalogo <Icon /></Link><Link href="/scegli" className="dlf-text-link">Aiutami a scegliere <Icon size={17} /></Link></div> : <>
      <div className="dlf-compare-scroll" role="region" aria-label="Confronto dei mezzi, scorri orizzontalmente su schermi piccoli" tabIndex={0}>
        <table className="dlf-compare"><caption className="sr-only">Caratteristiche dei mezzi selezionati</caption><thead><tr><th scope="col" className="dlf-compare-label"><span className="dlf-eyebrow">La tua prossima scelta</span><strong>Ogni dettaglio<br />fa la differenza.</strong></th>{models.map((p) => <th scope="col" key={p.slug}><button className="dlf-remove" aria-label={`Rimuovi ${p.nome}`} onClick={() => { const next = models.filter((item) => item.slug !== p.slug).map((item) => item.slug); setOverride(next); if (shared === null) save(next); }}><Icon name="close" size={18} /></button><Link href={`/mezzi/${p.slug}`} className="dlf-compare-image"><Image src={p.immagini[0]} alt={p.nome} fill sizes="280px" /></Link><span className="dlf-eyebrow">{p.brand}</span><Link href={`/mezzi/${p.slug}`} className="dlf-compare-title">{p.nome} <Icon name="diagonal" size={18} /></Link></th>)}</tr></thead><tbody>
          <tr><th scope="row">Categoria</th>{models.map((p) => <td key={p.slug}>{categorie[p.categoria].label}</td>)}</tr>
          <tr><th scope="row">Formule</th>{models.map((p) => <td key={p.slug}>{p.formule.map((f) => f === "vendita" ? "Acquisto" : f === "noleggio" ? "Noleggio" : f).join(" / ")}</td>)}</tr>
          <tr><th scope="row">Applicazioni</th>{models.map((p) => <td key={p.slug}>{p.applicazioni.join(" · ")}</td>)}</tr>
          {specLabels.map((label) => <tr key={label}><th scope="row">{label}</th>{models.map((p) => <td key={p.slug}>{p.specVerificate ? p.spec.find((s) => s.label === label)?.value || "Da verificare con DLF" : "Scheda da richiedere"}</td>)}</tr>)}
          <tr><th scope="row">Disponibilità</th>{models.map((p) => <td key={p.slug}><span className="dlf-status-dot" /> Da confermare con DLF</td>)}</tr>
          <tr><th scope="row">Approfondisci</th>{models.map((p) => <td key={p.slug}><Link className="dlf-text-link" href={requestUrl("scheda", p.nome)}>Scheda e accessori <Icon size={16} /></Link></td>)}</tr>
        </tbody></table>
      </div>
      <div className="dlf-compare-bottom"><p>Le specifiche sono mostrate dove verificate. Prezzo, disponibilità e compatibilità degli accessori richiedono una conferma DLF.</p><Link href={requestUrl("vendita", names, "Vorrei confrontare questi mezzi e ricevere una proposta.")} className="dlf-button">Una richiesta per la selezione <Icon /></Link></div>
    </>}
  </div>;
}
