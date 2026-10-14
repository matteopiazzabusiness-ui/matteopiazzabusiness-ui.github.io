import Link from "next/link";
import { requestUrl } from "@/lib/discovery";
import { Icon } from "./Icons";

export function ProductSupport({ model }: { model: string }) {
  return <div className="dlf-product-support">
    <div className="dlf-support-status"><span className="dlf-status-dot" /><span>Disponibilità e prezzo da confermare</span></div>
    <div className="dlf-product-shortcuts">{[{ type: "scheda", label: "Scheda e accessori", icon: "file" }, { type: "visita", label: "Vieni a vederlo", icon: "pin" }, { type: "permuta", label: "Hai una permuta?", icon: "compare" }].map((item) => <Link href={requestUrl(item.type, item.type === "permuta" ? "" : model, item.type === "permuta" ? `Vorrei valutare una permuta per ${model}.` : "")} key={item.type}><Icon name={item.icon} size={20} /><span>{item.label}</span><Icon name="diagonal" size={16} /></Link>)}</div>
    <details className="dlf-product-faq"><summary>Quali dettagli servono per una proposta precisa?</summary><p>Descrivi il lavoro, la località e gli eventuali limiti di accesso. Per il noleggio indica anche il periodo e se ti serve il trasporto.</p></details>
    <details className="dlf-product-faq"><summary>Posso richiedere foto, video o una dimostrazione?</summary><p>Sì, indica cosa vuoi approfondire nella richiesta. DLF verificherà il materiale disponibile e la possibilità di organizzare una visita o una dimostrazione.</p><Link href={requestUrl("visita", model)}>Richiedi un approfondimento →</Link></details>
  </div>;
}
