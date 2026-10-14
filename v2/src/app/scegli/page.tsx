import type { Metadata } from "next";
import { Discovery } from "@/components/discovery/Discovery";

export const metadata: Metadata = { title: "Trova il tuo mezzo", description: "Parti dal lavoro da svolgere: esplora mezzi, confronta modelli e prepara la tua richiesta con DLF Macchine." };
export default function ScegliPage() { return <Discovery />; }
