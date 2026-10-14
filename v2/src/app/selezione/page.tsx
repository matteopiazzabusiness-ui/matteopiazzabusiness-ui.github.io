import type { Metadata } from "next";
import { Suspense } from "react";
import { Selection } from "@/components/discovery/Selection";
export const metadata: Metadata = { title: "La tua selezione e confronto mezzi" };
export default function SelectionPage() { return <Suspense fallback={<div className="dlf-workspace">Caricamento selezione…</div>}><Selection /></Suspense>; }
