import type { FaqItem } from "@/lib/faq";

/** Accordion FAQ riusabile (native <details>, zero JS). Variante chiara o scura. */
export function Faq({ voci, variant = "light" }: { voci: FaqItem[]; variant?: "light" | "dark" }) {
  const dark = variant === "dark";
  const border = dark ? "border-paper/15" : "border-ink/15";
  const q = dark ? "text-paper" : "text-ink";
  const a = dark ? "text-paper/70" : "text-ink-soft";

  return (
    <div className="max-w-3xl">
      {voci.map((f) => (
        <details key={f.q} className={`group border-b ${border} py-4`}>
          <summary className={`flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold ${q}`}>
            {f.q}
            <span className="t-poster text-2xl text-giallo transition-transform duration-300 group-open:rotate-45">+</span>
          </summary>
          <p className={`mt-3 max-w-2xl text-sm leading-relaxed ${a}`}>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
