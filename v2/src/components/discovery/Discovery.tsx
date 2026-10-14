"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { categorie } from "@/lib/catalog";
import { findJob, jobs, requestTypes, requestUrl, suggestions } from "@/lib/discovery";
import { Icon } from "./Icons";
import { ProductActions } from "./ProductActions";
import { Guide } from "./Guide";

const stepTitles = ["Il lavoro", "Il cantiere", "La formula", "La tua direzione"];

export function Discovery() {
  const [step, setStep] = useState(0);
  const [job, setJob] = useState("");
  const [space, setSpace] = useState("");
  const [formula, setFormula] = useState("");
  const [query, setQuery] = useState("");
  const [searchMessage, setSearchMessage] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const currentJob = jobs.find((item) => item.id === job);
  const results = suggestions(job, space, formula);
  const context = `Lavoro: ${currentJob?.label || "da definire"}. Spazio: ${space}. Formula: ${formula}. ${query}`;
  const next = (value: number) => { setStep(value); setTimeout(() => heading.current?.focus({ preventScroll: true }), 0); };

  return <div className="dlf-discovery">
    <section className="dlf-discovery-hero">
      <div className="dlf-hero-copy">
        <p className="dlf-eyebrow"><span className="dlf-square" /> DLF / Al tuo fianco</p>
        <h1>Il tuo lavoro.<br /><span>Il mezzo giusto.</span></h1>
        <p className="dlf-lead">Ogni cantiere è diverso. Partiamo dal tuo, per aiutarti a scegliere con le idee chiare.</p>
        <div className="dlf-hero-links"><a href="#percorso" className="dlf-button">Trova il tuo mezzo <Icon /></a><Link href="/selezione" className="dlf-text-link">La tua selezione <Icon name="diagonal" size={17} /></Link></div>
        <div className="dlf-hero-foot"><span>01 — Racconta</span><span>02 — Esplora</span><span>03 — Scegli</span></div>
      </div>
      <div className="dlf-hero-visual">
        <span className="dlf-visual-label">SCELTE CONCRETE / DLF MACCHINE</span>
        <span className="dlf-outline-number" aria-hidden="true">01</span>
        <Image src="/media/products/306-cr.jpeg" alt="Escavatore Caterpillar 306 CR" fill sizes="(max-width: 800px) 100vw, 50vw" priority className="dlf-hero-machine" />
        <div className="dlf-machine-caption"><div><span className="dlf-eyebrow">In primo piano</span><strong>CAT 306 CR</strong></div><Link href="/mezzi/306-cr" aria-label="Scopri CAT 306 CR" className="dlf-round-link"><Icon name="diagonal" /></Link></div>
      </div>
    </section>

    <section id="percorso" className="dlf-finder dlf-section">
      <div className="dlf-section-top"><p className="dlf-eyebrow">01 / La scelta parte da qui</p><span className="dlf-small">Tre passaggi. Nessuna registrazione.</span></div>
      <div className="dlf-finder-layout">
        <aside className="dlf-finder-aside"><h2>Facciamo<br />spazio alle<br /><em>idee chiare.</em></h2><p>Ti orientiamo tra le categorie del catalogo. La squadra DLF confermerà il modello e la configurazione adatti al tuo lavoro.</p>
          <ol className="dlf-steps">{stepTitles.map((title, index) => <li key={title} className={index === step ? "current" : index < step ? "complete" : ""}><span>{index < step ? <Icon name="check" size={14} /> : `0${index + 1}`}</span>{title}</li>)}</ol>
          <Link href="/mezzi" className="dlf-text-link">Preferisco esplorare il catalogo <Icon size={16} /></Link>
        </aside>
        <div className="dlf-finder-panel">
          <div className="dlf-panel-top"><span className="dlf-eyebrow">{step === 3 ? "Il tuo punto di partenza" : `Domanda 0${step + 1} / 03`}</span>{step > 0 && <button className="dlf-back" onClick={() => next(step - 1)}>← Indietro</button>}</div>
          <h3 ref={heading} tabIndex={-1} className="dlf-question">{["Che lavoro devi fare?", "Com’è lo spazio di lavoro?", "Come vuoi utilizzarlo?", "Da qui possiamo partire."][step]}</h3>
          {step === 0 && <>
            <div className="dlf-job-grid">{jobs.map((item, index) => <button key={item.id} className={`dlf-job ${job === item.id ? "selected" : ""}`} aria-pressed={job === item.id} onClick={() => { setJob(item.id); next(1); }}><span className="dlf-job-number">0{index + 1}</span><strong>{item.label}</strong><span>{item.description}</span><Icon name="diagonal" size={20} /></button>)}</div>
            <form className="dlf-natural-search" onSubmit={(event) => { event.preventDefault(); const match = findJob(query); if (match) { setJob(match.id); setSearchMessage(""); next(1); } else { setSearchMessage("Non ho individuato una categoria precisa. Scegli una delle attività sopra oppure raccontaci il lavoro nella richiesta guidata."); } }}>
              <label htmlFor="work-search">Oppure raccontalo con parole tue</label><div><Icon name="search" size={19} /><input id="work-search" value={query} onChange={(event) => setQuery(event.target.value)} maxLength={250} placeholder="Es. devo scavare in un cortile stretto" required /><button type="submit" aria-label="Cerca una categoria per il tuo lavoro"><Icon /></button></div><p className="dlf-small">La guida cerca le attività descritte nel catalogo DLF.</p><p role="status" className="dlf-small">{searchMessage}</p>
            </form>
          </>}
          {step === 1 && <div className="dlf-option-list">{[{ id: "stretto", title: "Accessi stretti o spazi limitati", text: "Cortili, passaggi, lavori vicino a edifici." }, { id: "ampio", title: "Un’area di lavoro aperta", text: "Cantieri, piazzali e terreni con spazio di manovra." }, { id: "verificare", title: "Vorrei un consiglio", text: "Portiamo le misure e i vincoli alla squadra DLF." }].map((option) => <button key={option.id} aria-pressed={space === option.id} className={`dlf-option ${space === option.id ? "selected" : ""}`} onClick={() => { setSpace(option.id); next(2); }}><span><strong>{option.title}</strong><small>{option.text}</small></span><Icon /></button>)}<p className="dlf-note">Larghezza degli accessi, portata del terreno e ingombri vanno verificati sul modello specifico.</p></div>}
          {step === 2 && <div className="dlf-option-list">{[{ id: "vendita", title: "Voglio acquistare", text: "Un investimento per il lavoro di ogni giorno." }, { id: "noleggio", title: "Mi serve a noleggio", text: "Per un periodo o una lavorazione specifica." }, { id: "valutare", title: "Sto valutando le alternative", text: "Confrontiamo le esigenze prima di decidere." }].map((option) => <button key={option.id} aria-pressed={formula === option.id} className={`dlf-option ${formula === option.id ? "selected" : ""}`} onClick={() => { setFormula(option.id); next(3); }}><span><strong>{option.title}</strong><small>{option.text}</small></span><Icon /></button>)}</div>}
          {step === 3 && <div>
            <div className="dlf-result-summary"><span>{currentJob?.label}</span><span>{space === "stretto" ? "Spazi limitati" : space === "ampio" ? "Area aperta" : "Spazi da valutare"}</span><span>{formula === "vendita" ? "Acquisto" : formula === "noleggio" ? "Noleggio" : "Da valutare"}</span></div>
            <p className="dlf-note">Questi modelli appartengono alle categorie coerenti con l’attività indicata. Non è ancora una verifica di idoneità: confronta dimensioni, portata e allestimenti con DLF.</p>
            <div className="dlf-results">{results.map((p) => <article key={p.slug} className="dlf-result-card"><Link href={`/mezzi/${p.slug}`} className="dlf-result-image"><Image src={p.immagini[0]} alt={p.nome} fill sizes="(max-width: 800px) 80vw, 25vw" /></Link><p className="dlf-eyebrow">{categorie[p.categoria].label}</p><Link href={`/mezzi/${p.slug}`} className="dlf-result-title">{p.nome} <Icon name="diagonal" size={17} /></Link><ProductActions slug={p.slug} /></article>)}</div>
            <Link className="dlf-button" href={requestUrl(formula === "noleggio" ? "noleggio" : "vendita", "", context)}>Approfondisci con DLF <Icon /></Link><button className="dlf-back dlf-restart" onClick={() => { setJob(""); setSpace(""); setFormula(""); next(0); }}>Ricomincia</button>
          </div>}
        </div>
      </div>
    </section>

    <Guide />
    <section className="dlf-services dlf-section">
      <div className="dlf-section-top"><p className="dlf-eyebrow">02 / Un passo avanti</p><span className="dlf-small">La tua esigenza, il percorso giusto.</span></div>
      <div className="dlf-section-heading"><h2>Di cosa hai<br /><span>bisogno oggi?</span></h2><p>Hai già un’idea precisa? Scegli da dove partire: raccogliamo le informazioni utili, una alla volta.</p></div>
      <div className="dlf-services-grid">{requestTypes.map((type, index) => <Link href={requestUrl(type.id)} key={type.id} className="dlf-service-card"><div><Icon name={type.icon} size={28} /><span className="dlf-eyebrow">0{index + 1}</span></div><h3>{type.label}</h3><p>{type.description}</p><span className="dlf-service-arrow"><Icon /></span></Link>)}</div>
    </section>

    <section className="dlf-urgent"><div><span className="dlf-eyebrow"><Icon name="tool" size={17} /> Assistenza / Macchina ferma</span><h2>Il lavoro si è fermato?<br />Partiamo dal problema.</h2><p>Tieni a portata di mano modello, matricola e posizione del mezzo. Per una richiesta urgente, chiama la sede.</p></div><div className="dlf-urgent-actions"><a href="tel:+390934575176" className="dlf-button"><Icon name="phone" /> Chiama Caltanissetta</a><a href="tel:+390958320215" className="dlf-button dlf-button-outline"><Icon name="phone" /> Chiama Catania</a><Link href={requestUrl("assistenza", "", "Macchina ferma: richiesta di contatto prioritario.")} className="dlf-text-link">Prepara i dettagli dell’intervento <Icon size={17} /></Link></div></section>

    <section className="dlf-guides dlf-section"><div className="dlf-section-top"><p className="dlf-eyebrow">03 / Scegliere consapevolmente</p><Link href="/blog" className="dlf-text-link">Tutte le guide <Icon size={17} /></Link></div><div className="dlf-section-heading"><h2>Le domande giuste.<br /><span>Prima di scegliere.</span></h2></div><div className="dlf-guides-grid">{[{ title: "Acquisto o noleggio?", detail: "Durata, utilizzo e necessità del cantiere.", slug: "noleggio-o-acquisto-come-scegliere", number: "01" }, { title: "La manutenzione conta.", detail: "Programmare gli interventi e prendersi cura del mezzo.", slug: "manutenzione-programmata-perche-conviene", number: "02" }, { title: "Il ricambio giusto.", detail: "Originali, compatibili e informazioni da verificare.", slug: "ricambi-originali-vs-compatibili", number: "03" }].map((guide) => <Link className="dlf-guide" href={`/blog/${guide.slug}`} key={guide.slug}><span className="dlf-guide-num">{guide.number}</span><h3>{guide.title}</h3><p>{guide.detail}</p><Icon name="diagonal" /></Link>)}</div></section>

    <section className="dlf-people"><div className="dlf-people-image"><Image src="/media/team/officina-caltanissetta.jpg" alt="L’officina DLF a Caltanissetta" fill sizes="(max-width: 800px) 100vw, 50vw" /></div><div><p className="dlf-eyebrow">Dietro ogni risposta, persone</p><h2>Dal primo dubbio.<br />Al prossimo cantiere.</h2><p>Commerciali, officina e magazzino: conosci la squadra e trova i riferimenti delle sedi di Caltanissetta e Misterbianco.</p><Link href="/dlf" className="dlf-button dlf-button-light">Conosci DLF <Icon /></Link></div></section>
  </div>;
}

export function DiscoveryTeaser() {
  return <div className="dlf-home-teaser"><div><p className="dlf-eyebrow">Il tuo prossimo passo</p><h2>Che lavoro hai in mente?</h2><p>Trova la categoria giusta, confronta i mezzi e prepara la tua richiesta.</p></div><Link href="/scegli" className="dlf-button">Trova il tuo mezzo <Icon /></Link><Link href="/richiesta" className="dlf-text-link">Ho già un’esigenza precisa <Icon name="diagonal" size={18} /></Link></div>;
}
