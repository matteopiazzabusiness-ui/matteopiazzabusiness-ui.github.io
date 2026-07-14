/**
 * Tracking plan — eventi canonici Theon (prompt master Fase 8).
 * Frontend emette eventi consent-aware verso un buffer; l'integrazione reale
 * (GA4 / Theon Signals) si collega qui. Nessun dato personale negli eventi.
 */

export type CanonicalEvent =
  | "page_view"
  | "catalog_search"
  | "filter_used"
  | "product_view"
  | "click_call"
  | "click_whatsapp"
  | "lead_started"
  | "lead_submitted"
  | "rental_requested"
  | "assistance_requested"
  | "parts_requested";

type Payload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    __theonEvents?: { event: CanonicalEvent; payload: Payload; ts: number }[];
  }
}

export function track(event: CanonicalEvent, payload: Payload = {}) {
  if (typeof window === "undefined") return;
  const record = { event, payload, ts: Date.now() };
  // Buffer locale — punto di aggancio per Theon Signals / provider reale.
  (window.__theonEvents ||= []).push(record);
  // GA4 / GTM (attivo solo con consenso, gestito a livello di container).
  (window.dataLayer ||= []).push({ event, ...payload });
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.debug("[theon:event]", event, payload);
  }
}
