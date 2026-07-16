import type { Metadata } from "next";
import { Anton, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Smooth } from "@/components/fx/Smooth";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { company } from "@/lib/site";

const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });
const jet = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jet" });

export const metadata: Metadata = {
  metadataBase: new URL("https://dlfmacchine.it"),
  title: {
    default: "DLF Macchine — Movimento terra in Sicilia. Vendita, noleggio, assistenza, ricambi",
    template: "%s — DLF Macchine",
  },
  description: company.claim,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${anton.variable} ${grotesk.variable} ${jet.variable}`}>
      <body>
        <Smooth>
          <Header />
          <main>{children}</main>
          <Footer />
        </Smooth>
      </body>
    </html>
  );
}
