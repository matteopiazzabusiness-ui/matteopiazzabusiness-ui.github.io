"use client";

import { useState } from "react";
import { company } from "@/lib/site";

const INTENTI = [
  { v: "vendita", l: "Acquisto mezzo" },
  { v: "noleggio", l: "Noleggio" },
  { v: "assistenza", l: "Assistenza" },
  { v: "ricambi", l: "Ricambi" },
];

/**
 * Form contatti v2 — compila e apre il client email con il messaggio
 * strutturato (nessun backend richiesto), o in alternativa WhatsApp.
 */
export function FormContatti({ intento, modello }: { intento?: string; modello?: string }) {
  const [tipo, setTipo] = useState(INTENTI.some((i) => i.v === intento) ? intento! : "vendita");
  const [nome, setNome] = useState("");
  const [telefono, setTelefono] = useState("");
  const [msg, setMsg] = useState(modello ? `Vorrei informazioni su: ${modello}` : "");

  const corpo = () =>
    `Richiesta: ${INTENTI.find((i) => i.v === tipo)?.l}\nNome: ${nome}\nTelefono: ${telefono}\n\n${msg}`;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(
          `Richiesta ${tipo} dal sito`,
        )}&body=${encodeURIComponent(corpo())}`;
      }}
    >
      <p className="t-label text-ink-soft">Di cosa hai bisogno?</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {INTENTI.map((i) => (
          <button
            key={i.v}
            type="button"
            onClick={() => setTipo(i.v)}
            aria-pressed={tipo === i.v}
            className={`t-label cursor-pointer border px-4 py-2.5 transition-colors ${
              tipo === i.v ? "border-ink bg-ink text-paper" : "border-ink/30 text-ink hover:border-ink"
            }`}
          >
            {i.l}
          </button>
        ))}
      </div>

      <div className="mt-8 space-y-6">
        <Campo id="nome" label="Nome e cognome" value={nome} onChange={setNome} required />
        <Campo id="telefono" label="Telefono" type="tel" value={telefono} onChange={setTelefono} required />
        <div>
          <label htmlFor="msg" className="t-label block text-ink-soft">Messaggio</label>
          <textarea
            id="msg"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            rows={5}
            required
            className="mt-2 w-full border border-ink/30 bg-transparent p-4 text-ink outline-none transition-colors focus:border-ink"
          />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <button type="submit" className="t-label cursor-pointer bg-carbon px-8 py-4 text-paper transition-colors hover:bg-giallo hover:text-ink">
          Invia via email {"->"}
        </button>
        <a
          href={`https://wa.me/${company.whatsapp}?text=${encodeURIComponent(corpo())}`}
          target="_blank"
          rel="noopener noreferrer"
          className="t-label border border-ink px-8 py-4 text-ink transition-colors hover:bg-ink hover:text-paper"
        >
          Invia su WhatsApp
        </a>
      </div>
    </form>
  );
}

function Campo({
  id, label, value, onChange, type = "text", required,
}: {
  id: string; label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="t-label block text-ink-soft">{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="mt-2 w-full border-b border-ink/30 bg-transparent py-3 text-lg text-ink outline-none transition-colors focus:border-ink"
      />
    </div>
  );
}
