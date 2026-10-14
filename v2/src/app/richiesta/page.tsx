import type { Metadata } from "next";
import { Suspense } from "react";
import { RequestExperience, RequestFallback } from "@/components/discovery/RequestBuilder";
export const metadata: Metadata = { title: "Prepara la tua richiesta", description: "Acquisto, noleggio, assistenza, ricambi e permuta: prepara una richiesta con i dettagli utili alla squadra DLF." };
export default function RequestPage() { return <Suspense fallback={<RequestFallback />}><RequestExperience /></Suspense>; }
