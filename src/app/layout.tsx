import type { Metadata } from "next";
import { Inter, Archivo } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { Preloader } from "@/components/Preloader";
import { OrgJsonLd } from "@/components/JsonLd";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dlfmacchine.it"),
  title: {
    default: "DLF Macchine — Movimento terra in Sicilia | Vendita, Noleggio, Assistenza",
    template: "%s | DLF Macchine",
  },
  description:
    "Concessionaria Caterpillar e Dieci in Sicilia. Vendita, noleggio, assistenza e ricambi per macchine movimento terra. Sedi a Caltanissetta e Misterbianco (Catania).",
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: "DLF Macchine",
    images: ["/media/brand/dlf_logo.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" data-scroll-behavior="smooth" className={`${inter.variable} ${archivo.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-surface text-ink">
        <OrgJsonLd />
        <Preloader />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-3 focus:left-3 focus:bg-ink focus:text-white focus:px-4 focus:py-2 focus:rounded-md"
        >
          Salta al contenuto
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
