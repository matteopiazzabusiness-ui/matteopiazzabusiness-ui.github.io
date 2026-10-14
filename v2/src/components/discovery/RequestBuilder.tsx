"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { company } from "@/lib/site";
import { requestTypes } from "@/lib/discovery";
import { Icon } from "./Icons";

type Details = Record<string, string>;
type Photo = { name: string; url: string };
const provinces = ["Agrigento", "Caltanissetta", "Catania", "Enna", "Messina", "Palermo", "Ragusa", "Siracusa", "Trapani", "Altra provincia"];
const labels: Record<string, string> = { model: "Mezzo / modello", description: "Esigenza", location: "Località del cantiere", budget: "Budget indicativo", start: "Dal", end: "Al", delivery: "Trasporto", access: "Accesso al cantiere", serial: "Matricola", urgency: "Urgenza", code: "Codice ricambio", year: "Anno", hours: "Ore di lavoro", condition: "Condizioni", appointment: "Preferenza data", seat: "Sede", meeting: "Tipo di incontro", attachment: "Accessorio / documento richiesto", name: "Nome e cognome", business: "Azienda", phone: "Telefono", email: "Email", province: "Provincia" };

export function RequestExperience() {
  const params = useSearchParams();
  const type = requestTypes.some((item) => item.id === params.get("tipo")) ? params.get("tipo")! : "";
  return <RequestBuilder key={params.toString()} initialType={type} initialModel={(params.get("modello") || "").slice(0, 300)} initialDescription={(params.get("dettagli") || "").slice(0, 1500)} />;
}

function RequestBuilder({ initialType, initialModel, initialDescription }: { initialType: string; initialModel: string; initialDescription: string }) {
  const [type, setType] = useState(initialType);
  const [step, setStep] = useState(initialType ? 1 : 0);
  const [values, setValues] = useState<Details>({ model: initialModel, description: initialDescription, delivery: "Da valutare", seat: "Caltanissetta", urgency: "Da valutare", meeting: "Visita in sede" });
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [photoError, setPhotoError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [today, setToday] = useState("");
  const formHeading = useRef<HTMLHeadingElement>(null);
  const urls = useRef<string[]>([]);
  const request = requestTypes.find((item) => item.id === type);
  const set = (key: string, value: string) => setValues((current) => ({ ...current, [key]: value }));
  useEffect(() => { const now = new Date(); setToday(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`); return () => urls.current.forEach((url) => URL.revokeObjectURL(url)); }, []);
  const go = (target: number) => { setStep(target); setFeedback(""); setTimeout(() => formHeading.current?.focus({ preventScroll: true }), 0); };
  const activeFields = ["model", "description", ...(type === "noleggio" ? ["start", "end", "delivery", "location", "access"] : []), ...(["vendita", "permuta", "usato"].includes(type) ? ["budget", "location", "delivery"] : []), ...(type === "assistenza" ? ["serial", "urgency", "location"] : []), ...(type === "ricambi" ? ["serial", "code"] : []), ...(type === "permuta" ? ["year", "hours", "condition"] : []), ...(type === "visita" ? ["appointment", "seat", "meeting"] : []), ...(type === "scheda" ? ["attachment"] : []), "name", "business", "phone", "email", "province"];
  const entries = [...new Set(activeFields)].filter((key) => values[key]?.trim()).map((key) => [labels[key], values[key]]);
  const summary = `Richiesta DLF — ${request?.label}\n\n${entries.map(([label, value]) => `${label}: ${value}`).join("\n")}${photos.length ? `\n\nFoto da allegare nella conversazione: ${photos.map((photo) => photo.name).join(", ")}` : ""}\n\nRichiesta da confermare con DLF.`;
  const input = (key: string, label: string, options: { required?: boolean; type?: string; placeholder?: string; min?: string; max?: string; full?: boolean } = {}) => <label className={`dlf-field ${options.full ? "dlf-field-full" : ""}`} key={key}><span>{label}{options.required && <span className="dlf-required"> *</span>}</span><input value={values[key] || ""} onChange={(event) => set(key, event.target.value)} name={key} type={options.type || "text"} required={options.required} placeholder={options.placeholder} min={options.min} max={options.max} maxLength={key === "model" ? 300 : 180} autoComplete={key === "name" ? "name" : key === "phone" ? "tel" : key === "email" ? "email" : key === "business" ? "organization" : "off"} /></label>;
  const select = (key: string, label: string, choices: string[], required = false) => <label className="dlf-field" key={key}><span>{label}{required && <span className="dlf-required"> *</span>}</span><select name={key} value={values[key] || ""} onChange={(event) => set(key, event.target.value)} required={required}><option value="">Seleziona</option>{choices.map((choice) => <option key={choice}>{choice}</option>)}</select></label>;

  return <div className="dlf-request-page">
    <div className="dlf-request-header"><Link href="/scegli" className="dlf-eyebrow">← DLF / Al tuo fianco</Link><span className="dlf-eyebrow">Dall’idea al prossimo passo</span></div>
    <div className="dlf-request-grid">
      <aside className="dlf-request-aside"><p className="dlf-eyebrow">La tua richiesta, fatta bene</p><h1>Parliamo<br />del tuo<br /><span>lavoro.</span></h1><p>Poche informazioni mirate, per iniziare una conversazione concreta con la squadra DLF.</p><ol className="dlf-request-steps">{["La tua esigenza", "I dettagli utili", "Come ricontattarti", "Riepilogo e contatto"].map((title, index) => <li className={step === index ? "current" : step > index ? "complete" : ""} key={title}><span>{step > index ? <Icon name="check" size={15} /> : `0${index + 1}`}</span>{title}</li>)}</ol><div className="dlf-aside-contact"><Icon name="phone" /><div><strong>Preferisci parlarne?</strong><a href="tel:+390934575176">0934 575176 · Caltanissetta</a><a href="tel:+390958320215">095 8320215 · Catania</a></div></div></aside>
      <div className="dlf-request-panel"><div className="dlf-panel-top"><span className="dlf-eyebrow">Passaggio 0{step + 1} / 04</span>{step > 0 && <button type="button" className="dlf-back" onClick={() => go(step - 1)}>← Indietro</button>}</div><div className="dlf-progress-track"><div style={{ width: `${(step + 1) * 25}%` }} /></div>
        <h2 className="dlf-question" ref={formHeading} tabIndex={-1}>{["Da dove partiamo?", request?.label === "Assistenza" ? "Raccontaci il problema." : "Diamo forma alla richiesta.", "Restiamo in contatto.", "Tutto pronto per parlarne."][step]}</h2>
        {step === 0 && <div className="dlf-type-grid">{requestTypes.map((item) => <button key={item.id} type="button" aria-pressed={type === item.id} className={`dlf-type ${type === item.id ? "selected" : ""}`} onClick={() => { setType(item.id); go(1); }}><Icon name={item.icon} size={24} /><strong>{item.label}</strong><Icon name="diagonal" size={16} /></button>)}</div>}
        {step === 1 && <form onSubmit={(event) => { event.preventDefault(); go(2); }}><p className="dlf-form-intro"><span className="dlf-pill">{request?.label}</span>{request?.description}</p><div className="dlf-fields">
          {input("model", type === "permuta" ? "Marca e modello del tuo mezzo" : "Mezzo o modello di interesse", { placeholder: "Es. CAT 306 CR, oppure da individuare", full: true, required: true })}
          {type === "noleggio" && <>{input("start", "Data di inizio", { type: "date", required: true, min: today })}{input("end", "Data di fine", { type: "date", required: true, min: values.start || today })}</>}
          {["assistenza", "ricambi"].includes(type) && input("serial", "Matricola del mezzo", { placeholder: "Se disponibile, dalla targhetta" })}
          {type === "assistenza" && select("urgency", "Situazione del mezzo", ["Da valutare", "Macchina ferma", "Funziona con un problema", "Manutenzione da programmare"], true)}
          {type === "ricambi" && input("code", "Codice ricambio", { placeholder: "Se lo conosci" })}
          {type === "permuta" && <>{input("year", "Anno", { type: "number", min: "1950", max: today.slice(0, 4), required: true })}{input("hours", "Ore di lavoro", { type: "number", min: "0", required: true })}{select("condition", "Condizioni", ["Operativo", "Da revisionare", "Non operativo"], true)}</>}
          {type === "visita" && <>{select("meeting", "Come preferisci incontrarci", ["Visita in sede", "Richiesta dimostrazione", "Chiamata con un commerciale"], true)}{select("seat", "Sede di riferimento", ["Caltanissetta", "Misterbianco (Catania)"], true)}{input("appointment", "Data preferita", { type: "date", min: today })}<p className="dlf-note dlf-field-full">La data è una preferenza: DLF confermerà appuntamento ed eventuale disponibilità del mezzo per la dimostrazione.</p></>}
          {type === "scheda" && input("attachment", "Cosa vorresti ricevere?", { placeholder: "Scheda tecnica, misure, accessori compatibili…", full: true, required: true })}
          {["vendita", "permuta", "usato"].includes(type) && input("budget", "Budget indicativo (facoltativo)", { placeholder: "Importo o fascia di investimento" })}
          {["vendita", "noleggio", "assistenza", "permuta", "usato"].includes(type) && input("location", "Località del cantiere", { placeholder: "Comune e zona", required: type === "assistenza" || type === "noleggio" })}
          {["vendita", "noleggio", "permuta", "usato"].includes(type) && select("delivery", "Trasporto del mezzo", ["Da valutare", "Consegna in cantiere", "Ritiro in sede", "Consegna e ritiro della permuta"])}
          {type === "noleggio" && input("access", "Accesso al cantiere", { placeholder: "Larghezza, pendenza, vincoli di accesso…", full: true })}
          <label className="dlf-field dlf-field-full"><span>{type === "assistenza" ? "Cosa sta succedendo?" : "Raccontaci qualcosa in più"}<span className="dlf-required"> *</span></span><textarea name="description" value={values.description || ""} onChange={(event) => set("description", event.target.value)} rows={4} required maxLength={1500} placeholder={type === "assistenza" ? "Sintomi, eventuale codice errore, quando è comparso il problema…" : "Il lavoro da fare, le caratteristiche che cerchi, i tuoi dubbi…"} /></label>
        </div>
        {["assistenza", "ricambi", "permuta"].includes(type) && <div className="dlf-photo-box"><label htmlFor="request-photos"><Icon name="plus" /><strong>Prepara le foto del mezzo</strong><span>Fino a 4 immagini JPG, PNG o WebP · massimo 10 MB ciascuna</span></label><input id="request-photos" type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={(event) => {
          const files = Array.from(event.target.files || []);
          if (files.length > 4 || files.some((file) => file.size > 10 * 1024 * 1024 || !["image/jpeg", "image/png", "image/webp"].includes(file.type))) { setPhotoError("Scegli fino a 4 foto JPG, PNG o WebP, ciascuna entro 10 MB."); event.target.value = ""; return; }
          urls.current.forEach((url) => URL.revokeObjectURL(url));
          const nextPhotos = files.map((file) => ({ name: file.name, url: URL.createObjectURL(file) })); urls.current = nextPhotos.map((photo) => photo.url); setPhotos(nextPhotos); setPhotoError("");
        }} /><p className="dlf-small">Le foto restano sul dispositivo: dovrai allegarle tu al messaggio email o WhatsApp.</p>{photoError && <p role="alert" className="dlf-error">{photoError}</p>}<div className="dlf-photo-previews">{photos.map((photo, index) => <figure key={`${photo.name}-${index}`}><Image src={photo.url} alt={`Foto selezionata: ${photo.name}`} width={160} height={160} unoptimized /><figcaption>{photo.name}</figcaption></figure>)}</div></div>}
        <div className="dlf-form-bottom"><span className="dlf-small">* Campi necessari per proseguire</span><button type="submit" className="dlf-button">Continua <Icon /></button></div></form>}
        {step === 2 && <form onSubmit={(event) => { event.preventDefault(); go(3); }}><p className="dlf-form-intro">Come può raggiungerti la squadra DLF?</p><div className="dlf-fields">{input("name", "Nome e cognome", { required: true })}{input("business", "Azienda (facoltativo)")}{input("phone", "Telefono", { type: "tel", required: true, placeholder: "Il numero a cui ricontattarti" })}{input("email", "Email (facoltativo)", { type: "email" })}{select("province", "Provincia", provinces, true)}</div><label className="dlf-privacy"><input type="checkbox" required /><span>Ho letto l’<Link href="/privacy" target="_blank">informativa privacy</Link>. Userò email o WhatsApp per inviare questa richiesta a DLF.</span></label><p className="dlf-note">I dati inseriti non vengono inviati finché non completi l’invio nella tua applicazione email o WhatsApp.</p><div className="dlf-form-bottom"><span className="dlf-small">Controlla tutto prima di inviare</span><button className="dlf-button" type="submit">Rivedi la richiesta <Icon /></button></div></form>}
        {step === 3 && <div><div className="dlf-review-intro"><span className="dlf-review-icon"><Icon name="check" size={24} /></span><div><strong>La tua richiesta è pronta.</strong><p>Controlla il riepilogo e scegli come inviarlo a DLF.</p></div></div><dl className="dlf-review-list">{entries.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>{photos.length > 0 && <p className="dlf-note">Hai preparato {photos.length} foto. Ricorda di allegarle nel messaggio: non sono state caricate o inviate.</p>}<div className="dlf-send-actions"><a className="dlf-button" href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(summary)}`} target="_blank" rel="noopener noreferrer" onClick={() => setFeedback("Completa l’invio su WhatsApp. La richiesta non viene inviata automaticamente.")}>Apri su WhatsApp <Icon name="diagonal" /></a><a className="dlf-button dlf-button-outline" href={`mailto:${company.email}?subject=${encodeURIComponent(`Richiesta ${request?.label} — ${values.name}`)}&body=${encodeURIComponent(summary)}`} onClick={() => setFeedback("Completa l’invio nella tua applicazione email. Se non si apre, copia il riepilogo e scrivi a info@dlfmacchine.it.")}><Icon name="mail" /> Prepara email</a></div><div className="dlf-form-bottom"><button type="button" className="dlf-back" onClick={() => go(1)}>Modifica dettagli</button><button type="button" className="dlf-back" onClick={async () => { try { await navigator.clipboard.writeText(summary); setFeedback("Riepilogo copiato negli appunti."); } catch { setFeedback("Copia il riepilogo dal campo qui sotto."); } }}>Copia riepilogo <Icon name="file" size={16} /></button></div><p className="dlf-feedback" role="status">{feedback}</p><details className="dlf-copy-summary"><summary>Visualizza il testo da copiare</summary><textarea readOnly aria-label="Riepilogo da copiare" value={summary} rows={10} onFocus={(event) => event.target.select()} /></details><p className="dlf-note">Disponibilità, prezzi, interventi e appuntamenti saranno confermati direttamente da DLF.</p></div>}
      </div>
    </div>
  </div>;
}

export function RequestFallback({ children }: { children?: ReactNode }) { return <div className="dlf-workspace" role="status">{children || "Preparazione del percorso…"}</div>; }
