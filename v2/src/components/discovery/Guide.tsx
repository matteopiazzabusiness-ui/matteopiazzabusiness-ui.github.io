"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { findJob, requestUrl } from "@/lib/discovery";
import { Icon } from "./Icons";

type Reply = { question: string; answer: string; href: string; action: string };
function guideReply(question: string): Reply {
  const text = question.toLocaleLowerCase("it");
  if (/ferma|guasto|errore|ripara|assistenza/.test(text)) return { question, answer: "Per l’assistenza servono modello, matricola, posizione del mezzo e una descrizione del problema. Se la macchina è ferma, chiama la sede; puoi preparare prima i dettagli qui.", href: requestUrl("assistenza", "", question), action: "Prepara la richiesta di assistenza" };
  if (/ricamb|pezzo|filtro/.test(text)) return { question, answer: "Partiamo da modello e matricola. Aggiungi il codice del ricambio, se lo conosci, e prepara una foto del pezzo o della targhetta. Il magazzino DLF verificherà la compatibilità.", href: requestUrl("ricambi", "", question), action: "Trova il ricambio con DLF" };
  if (/permut|valutazione|vendere/.test(text)) return { question, answer: "Per valutare una permuta puoi indicare marca, modello, anno, ore e condizioni del tuo mezzo. La valutazione economica sarà fatta da DLF dopo averlo esaminato.", href: requestUrl("permuta", "", question), action: "Presenta il tuo mezzo" };
  if (/usato|occasione/.test(text)) return { question, answer: "Raccontaci quale mezzo cerchi, per quale lavoro e con quale budget indicativo. DLF potrà verificare le proposte disponibili e concordare con te come ricontattarti.", href: requestUrl("usato", "", question), action: "Descrivi l’usato che cerchi" };
  if (/prezz|cost|disponib|pronto/.test(text)) return { question, answer: "Prezzo e disponibilità dipendono dal mezzo e dall’allestimento. Non ho un inventario aggiornato da consultare: posso aiutarti a preparare una richiesta per avere una conferma da DLF.", href: requestUrl("vendita", "", question), action: "Chiedi disponibilità e prezzo" };
  if (/nolegg|affitt/.test(text)) return { question, answer: "Per il noleggio indica mezzo, periodo, località e necessità di trasporto. DLF confermerà disponibilità e condizioni per le date richieste.", href: requestUrl("noleggio", "", question), action: "Organizza la richiesta di noleggio" };
  if (/visita|demo|vedere|appuntamento/.test(text)) return { question, answer: "Puoi richiedere una visita in sede, una dimostrazione o una chiamata con un commerciale. Scegli sede e data preferite: l’appuntamento sarà confermato dalla squadra.", href: requestUrl("visita", "", question), action: "Richiedi un incontro" };
  const job = findJob(question);
  if (job) return { question, answer: `Il tuo lavoro rientra nel percorso “${job.label}”. Nel selettore puoi precisare lo spazio disponibile e scegliere tra acquisto e noleggio. Per dimensionare il mezzo servono poi le misure e i vincoli reali del cantiere.`, href: "/scegli#percorso", action: "Apri il percorso guidato" };
  return { question, answer: "Per orientarti mi è utile sapere quale lavoro devi svolgere, dove e per quanto tempo. Puoi partire dal selettore oppure preparare una richiesta da approfondire con la squadra DLF.", href: requestUrl("vendita", "", question), action: "Porta la tua domanda a DLF" };
}

export function Guide() {
  const [query, setQuery] = useState("");
  const [replies, setReplies] = useState<Reply[]>([]);
  const history = useRef<HTMLDivElement>(null);
  useEffect(() => { if (history.current && replies.length) history.current.scrollTop = history.current.scrollHeight; }, [replies]);
  function ask(value: string) { if (!value.trim()) return; setReplies((current) => [...current.slice(-3), guideReply(value.trim())]); setQuery(""); }
  return <section className="dlf-advisor dlf-section" aria-labelledby="guide-title">
    <div className="dlf-advisor-copy"><p className="dlf-eyebrow">Una guida, quando serve</p><h2 id="guide-title">Parti da<br />una domanda.</h2><p>Ti aiutiamo a trovare il percorso giusto tra mezzi, noleggio e servizi DLF.</p><span>Guida automatica ai contenuti del sito. Le conferme tecniche e commerciali arrivano dalla squadra DLF.</span></div>
    <div className="dlf-advisor-box"><div className="dlf-advisor-top"><span className="dlf-guide-avatar">D.</span><div><strong>Guida DLF</strong><small>Il prossimo passo, più chiaro.</small></div><span className="dlf-eyebrow">Orientamento</span></div>
      <div className="dlf-chat-history" ref={history} data-lenis-prevent role="log" aria-live="polite" aria-label="Conversazione con la guida DLF"><div className="dlf-chat-answer">Che lavoro hai in mente? Posso aiutarti a trovare una categoria o a preparare una richiesta per DLF.</div>{replies.map((reply, index) => <div key={`${index}-${reply.question}`}><div className="dlf-chat-question">{reply.question}</div><div className="dlf-chat-answer">{reply.answer}<Link href={reply.href}>{reply.action} <Icon name="diagonal" size={16} /></Link></div></div>)}</div>
      {replies.length === 0 && <div className="dlf-chat-prompts">{["Mi serve un ricambio", "Macchina ferma", "Cerco un usato"].map((text) => <button type="button" key={text} onClick={() => ask(text)}>{text} <Icon name="plus" size={13} /></button>)}</div>}
      <form className="dlf-chat-composer" onSubmit={(event) => { event.preventDefault(); ask(query); }}><label htmlFor="guide-question" className="sr-only">La tua domanda alla guida DLF</label><input id="guide-question" value={query} maxLength={500} required onChange={(event) => setQuery(event.target.value)} placeholder="Es. come richiedo un noleggio?" /><button type="submit" aria-label="Chiedi alla guida"><Icon /></button></form>
    </div>
  </section>;
}
