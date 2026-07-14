"use client";

import { useEffect, useRef, useState } from "react";
import { IconWhatsApp } from "@/components/icons";
import { company, sedi, waLink } from "@/lib/site";
import { prodotti } from "@/lib/catalog";
import { track } from "@/lib/analytics";

/**
 * Assistente virtuale DLF — flusso guidato "intelligente".
 * Qualifica l'intento, raccoglie i dati chiave e fa handoff su WhatsApp con
 * messaggio precompilato + registra un lead. Punto di aggancio Theon WhatsApp AI:
 * il motore a regole qui va sostituito dall'agente AI reale (stesso contratto).
 */

type Msg = { from: "bot" | "user"; text: string };
type Step = "intent" | "modello" | "urgenza" | "periodo" | "dettaglio" | "contatto" | "done";

const intents = [
  { key: "vendita", label: "🚜 Acquisto", q: "Quale mezzo ti interessa? (es. mini escavatore, telescopico, o un modello)" },
  { key: "noleggio", label: "📅 Noleggio", q: "Che lavoro devi fare e per quanto tempo? Indica anche la zona." },
  { key: "assistenza", label: "🔧 Assistenza", q: "Marca, modello e sintomo. La macchina è ferma?" },
  { key: "ricambi", label: "⚙️ Ricambi", q: "Modello e numero di seriale (o descrivi il pezzo)." },
] as const;

export function Assistant() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [step, setStep] = useState<Step>("intent");
  const [intent, setIntent] = useState<string>("");
  const [data, setData] = useState<Record<string, string>>({});
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing, open]);

  function botSay(text: string, after?: () => void) {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { from: "bot", text }]);
      after?.();
    }, 600);
  }

  function start() {
    setOpen(true);
    track("lead_started", { canale: "assistant" });
    if (msgs.length === 0) {
      botSay("Ciao! Sono l'assistente DLF Macchine. Ti aiuto in un minuto — di cosa hai bisogno?");
    }
  }

  function pickIntent(key: string) {
    const it = intents.find((i) => i.key === key)!;
    setIntent(key);
    setMsgs((m) => [...m, { from: "user", text: it.label.replace(/^\S+\s/, "") }]);
    setStep(key === "assistenza" ? "urgenza" : key === "noleggio" ? "periodo" : "modello");
    botSay(it.q);
  }

  function submitText(value: string) {
    const v = value.trim();
    if (!v) return;
    setMsgs((m) => [...m, { from: "user", text: v }]);
    setInput("");

    if (step === "modello" || step === "periodo" || step === "urgenza") {
      setData((d) => ({ ...d, dettaglio: v }));
      setStep("contatto");
      botSay("Perfetto. Lasciami un recapito (nome + telefono) e ti metto in contatto con la sede giusta.");
    } else if (step === "contatto") {
      setData((d) => ({ ...d, contatto: v }));
      finalize(v);
    }
  }

  function finalize(contatto: string) {
    setStep("done");
    const dettaglio = data.dettaglio ?? "";
    // Registra lead (stub Theon)
    fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: contatto, telefono: contatto, consenso: true, intento: intent,
        messaggio: dettaglio, fonte: "assistant", pagina: typeof location !== "undefined" ? location.pathname : "",
      }),
    }).catch(() => {});
    track("lead_submitted", { canale: "assistant", intento: intent });

    const sedeName = sedi[0].city;
    botSay(
      `Grazie! Ho raccolto la tua richiesta di ${intentLabel(intent)}. Un nostro referente (${sedeName}/${sedi[1].city}) ti ricontatta a breve. Vuoi continuare subito su WhatsApp?`,
    );
  }

  const waHref = waLink(
    `Salve, richiesta dal sito — ${intentLabel(intent)}. ${data.dettaglio ?? ""} ${data.contatto ?? ""}`.trim(),
  );

  // Suggerimento modelli se l'utente sta scegliendo un mezzo
  const suggerimenti =
    step === "modello"
      ? prodotti.filter((p) => p.specVerificate).slice(0, 3).map((p) => p.nome)
      : [];

  return (
    <>
      {/* Bottone flottante WhatsApp */}
      {!open && (
        <button
          onClick={start}
          aria-label="Apri assistente virtuale WhatsApp"
          className="group fixed bottom-20 right-4 z-50 flex items-center gap-3 rounded-full bg-[#25D366] py-3 pl-3 pr-5 text-white shadow-2xl transition-transform duration-200 hover:scale-105 lg:bottom-6"
        >
          <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/20" />
            <IconWhatsApp className="h-6 w-6" />
          </span>
          <span className="hidden text-left sm:block">
            <span className="block text-sm font-bold leading-tight">Assistente DLF</span>
            <span className="block text-xs text-white/80">Rispondiamo subito</span>
          </span>
        </button>
      )}

      {/* Pannello chat */}
      {open && (
        <div className="fixed bottom-20 right-4 z-50 flex h-[70vh] max-h-[560px] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl lg:bottom-6">
          <header className="flex items-center gap-3 bg-[#075E54] px-4 py-3 text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
              <IconWhatsApp className="h-6 w-6" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-bold leading-tight">Assistente DLF Macchine</p>
              <p className="text-xs text-white/70">
                <span className="mr-1 inline-block h-2 w-2 rounded-full bg-[#25D366]" />online · risposta immediata
              </p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Chiudi" className="rounded-md p-1 text-white/80 hover:bg-white/10">
              ✕
            </button>
          </header>

          <div ref={bodyRef} data-lenis-prevent className="flex-1 space-y-3 overflow-y-auto bg-surface-2 p-4">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm ${
                    m.from === "user"
                      ? "rounded-br-sm bg-[#DCF8C6] text-ink"
                      : "rounded-bl-sm bg-surface text-ink shadow-sm"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-surface px-3 py-3 shadow-sm">
                  <Dot /> <Dot d="0.15s" /> <Dot d="0.3s" />
                </div>
              </div>
            )}

            {/* Quick replies intento */}
            {step === "intent" && !typing && msgs.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {intents.map((i) => (
                  <button key={i.key} onClick={() => pickIntent(i.key)} className="rounded-full border border-brand bg-brand/10 px-3 py-1.5 text-sm font-semibold text-brand-700 hover:bg-brand hover:text-brand-ink">
                    {i.label}
                  </button>
                ))}
              </div>
            )}
            {suggerimenti.length > 0 && !typing && (
              <div className="flex flex-wrap gap-2 pt-1">
                {suggerimenti.map((s) => (
                  <button key={s} onClick={() => submitText(s)} className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-slate-strong hover:border-brand">
                    {s}
                  </button>
                ))}
              </div>
            )}
            {step === "done" && !typing && (
              <a
                href={waHref}
                target="_blank"
                rel="noopener"
                onClick={() => track("click_whatsapp", { canale: "assistant" })}
                className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 font-bold text-white"
              >
                <IconWhatsApp className="h-5 w-5" /> Continua su WhatsApp
              </a>
            )}
          </div>

          {/* Input */}
          {step !== "intent" && step !== "done" && (
            <form
              onSubmit={(e) => { e.preventDefault(); submitText(input); }}
              className="flex items-center gap-2 border-t border-line bg-surface p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Scrivi qui…"
                aria-label="Messaggio"
                className="min-h-[44px] flex-1 rounded-full border border-line bg-surface-2 px-4 text-sm focus:outline-none"
              />
              <button type="submit" aria-label="Invia" className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white">
                ➤
              </button>
            </form>
          )}
          <p className="bg-surface px-3 pb-2 text-center text-[10px] text-slate">
            Assistente guidato · handoff a operatore reale · dati trattati secondo privacy {company.brand}
          </p>
        </div>
      )}
    </>
  );
}

function Dot({ d = "0s" }: { d?: string }) {
  return <span className="h-2 w-2 animate-bounce rounded-full bg-slate/50" style={{ animationDelay: d }} />;
}

function intentLabel(k: string) {
  return ({ vendita: "acquisto", noleggio: "noleggio", assistenza: "assistenza", ricambi: "ricambi" } as Record<string, string>)[k] ?? "informazioni";
}
