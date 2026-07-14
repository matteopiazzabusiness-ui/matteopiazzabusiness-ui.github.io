"use client";

import { useState } from "react";
import type { Intento } from "@/lib/catalog";
import { company, sedi, waLink } from "@/lib/site";
import { track, type CanonicalEvent } from "@/lib/analytics";
import { Button } from "./ui";

const intentoLabel: Record<Intento | "preventivo", string> = {
  vendita: "Acquisto mezzo",
  noleggio: "Noleggio mezzo",
  assistenza: "Assistenza / fermo macchina",
  ricambi: "Ricambi",
  preventivo: "Richiesta preventivo",
};

const submitEvent: Record<string, CanonicalEvent> = {
  noleggio: "rental_requested",
  assistenza: "assistance_requested",
  ricambi: "parts_requested",
};

export function LeadForm({
  intento,
  modello,
  compact = false,
}: {
  intento: Intento | "preventivo";
  modello?: string;
  compact?: boolean;
}) {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [waHref, setWaHref] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (!data.consenso) return;
    setState("sending");
    track("lead_started", { intento });
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, intento, modello, fonte: "sito", pagina: location.pathname }),
      });
      if (!res.ok) throw new Error("bad");
      track("lead_submitted", { intento });
      if (submitEvent[intento]) track(submitEvent[intento], { intento });
      setWaHref(
        waLink(
          `Salve, sono ${data.nome}. Richiesta: ${intentoLabel[intento]}${modello ? ` — ${modello}` : ""}. ${data.messaggio ?? ""}`,
        ),
      );
      setState("ok");
      form.reset();
    } catch {
      setState("error");
    }
  }

  if (state === "ok") {
    return (
      <div className="rounded-lg border border-success/30 bg-success/5 p-5">
        <p className="font-semibold text-success">Richiesta inviata ✓</p>
        <p className="mt-1 text-sm text-slate-strong">
          Ti ricontattiamo nel più breve tempo. Vuoi accelerare? Continua su WhatsApp.
        </p>
        <a
          href={waHref}
          target="_blank"
          rel="noopener"
          onClick={() => track("click_whatsapp", { intento })}
          className="mt-3 inline-flex min-h-[44px] items-center gap-2 rounded-md bg-success px-4 font-semibold text-white"
        >
          💬 Continua su WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3" aria-label={`Richiesta: ${intentoLabel[intento]}`}>
      {modello && (
        <input type="hidden" name="modello_ref" value={modello} />
      )}
      <div className={compact ? "" : "grid gap-3 sm:grid-cols-2"}>
        <Field name="nome" label="Nome e azienda" required />
        <Field name="telefono" label="Telefono" type="tel" required />
      </div>
      <Field name="email" label="Email" type="email" />
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-strong">Sede di riferimento</label>
          <select name="sede" className="w-full rounded-md border border-line bg-surface px-3 py-2.5 text-sm">
            {sedi.map((s) => (
              <option key={s.slug} value={s.slug}>{s.city}</option>
            ))}
          </select>
        </div>
        {intento === "assistenza" && <Field name="urgenza" label="Macchina ferma? (sì/no)" />}
        {intento === "noleggio" && <Field name="periodo" label="Periodo / date" />}
        {intento === "ricambi" && <Field name="seriale" label="Modello / seriale" />}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-strong">Messaggio</label>
        <textarea
          name="messaggio"
          rows={compact ? 2 : 3}
          defaultValue={modello ? `Interessato a ${modello}. ` : ""}
          className="w-full rounded-md border border-line bg-surface px-3 py-2.5 text-sm"
        />
      </div>
      <label className="flex items-start gap-2 text-xs text-slate">
        <input type="checkbox" name="consenso" required className="mt-0.5 h-4 w-4" />
        <span>
          Acconsento al trattamento dei dati per essere ricontattato, secondo l&apos;informativa privacy.
          I dati non sono usati per marketing senza ulteriore consenso. ({company.brand})
        </span>
      </label>
      {state === "error" && (
        <p className="text-sm text-danger">Invio non riuscito. Riprova o scrivici su WhatsApp.</p>
      )}
      <Button type="submit" size="lg" className="w-full" disabled={state === "sending"}>
        {state === "sending" ? "Invio…" : `Invia richiesta — ${intentoLabel[intento]}`}
      </Button>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required = false,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium text-slate-strong">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-md border border-line bg-surface px-3 py-2.5 text-sm"
      />
    </div>
  );
}
