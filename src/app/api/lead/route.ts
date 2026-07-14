import { NextRequest, NextResponse } from "next/server";

/**
 * Lead API — punto di aggancio Theon (prompt master Fase 8).
 * Oggi: valida, struttura, anti-spam basilare, log server.
 * Integrazione reale (DA CONFIGURARE): Theon Leads/CRM → scoring →
 * assegnazione reparto/sede → WhatsApp AI → follow-up → analytics.
 */

type LeadInput = {
  nome?: string;
  telefono?: string;
  email?: string;
  sede?: string;
  intento?: string;
  modello?: string;
  messaggio?: string;
  consenso?: string | boolean;
  fonte?: string;
  pagina?: string;
  honeypot?: string;
};

const validIntenti = ["vendita", "noleggio", "assistenza", "ricambi", "preventivo"];

export async function POST(req: NextRequest) {
  let body: LeadInput;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "payload non valido" }, { status: 400 });
  }

  // Anti-spam: honeypot + campi minimi (audit: form senza protezione robusta).
  if (body.honeypot) return NextResponse.json({ ok: true }, { status: 200 });
  if (!body.nome || !body.telefono || !body.consenso) {
    return NextResponse.json({ error: "campi obbligatori mancanti o consenso assente" }, { status: 422 });
  }
  if (body.intento && !validIntenti.includes(body.intento)) {
    return NextResponse.json({ error: "intento non valido" }, { status: 422 });
  }

  const lead = {
    id: crypto.randomUUID(),
    ricevutoIl: new Date().toISOString(),
    intento: body.intento ?? "preventivo",
    modello: body.modello ?? null,
    nome: String(body.nome).slice(0, 160),
    telefono: String(body.telefono).slice(0, 40),
    email: body.email ?? null,
    sedeAssegnata: body.sede ?? "caltanissetta",
    messaggio: (body.messaggio ?? "").slice(0, 2000),
    fonte: body.fonte ?? "sito",
    pagina: body.pagina ?? null,
    stato: "nuovo",
    sla: "da_prendere_in_carico",
  };

  // TODO(Theon): POST verso modules/leads + CRM Intelligence scoring.
  // TODO(Theon): handoff WhatsApp AI con messaggio approvato per reparto.
  // TODO(Theon): notifica email reparto sede assegnata.
  console.info("[lead:new]", JSON.stringify(lead));

  return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
}
