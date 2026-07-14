"use client";

import { sedi, waLink } from "@/lib/site";
import { track } from "@/lib/analytics";

// CTA mobile persistente (audit: Chiama / WhatsApp / Preventivo, target >= 44px).
export function FloatingActions() {
  const tel = sedi[0].phone.replace(/\s/g, "");
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 grid grid-cols-3 border-t border-line bg-surface">
      <a
        href={`tel:${tel}`}
        onClick={() => track("click_call", { sede: sedi[0].slug })}
        className="flex flex-col items-center justify-center gap-0.5 py-2.5 min-h-[56px] text-xs font-semibold text-ink"
      >
        <span aria-hidden className="text-lg">📞</span>Chiama
      </a>
      <a
        href={waLink("Salve, vi contatto dal sito DLF Macchine.")}
        onClick={() => track("click_whatsapp", {})}
        target="_blank"
        rel="noopener"
        className="flex flex-col items-center justify-center gap-0.5 py-2.5 min-h-[56px] text-xs font-semibold text-white bg-success"
      >
        <span aria-hidden className="text-lg">💬</span>WhatsApp
      </a>
      <a
        href="/contatti?intento=preventivo"
        className="flex flex-col items-center justify-center gap-0.5 py-2.5 min-h-[56px] text-xs font-bold text-brand-ink bg-brand"
      >
        <span aria-hidden className="text-lg">✎</span>Preventivo
      </a>
    </div>
  );
}
