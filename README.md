# DLF Macchine — Sito AI + Theon Growth System

Rifacimento del sito [dlfmacchine.it](https://dlfmacchine.it) come **sistema commerciale**
(non sito-vetrina), secondo l'audit e il prompt master DLF.

## Stack

- **Next.js 16** (App Router) + **TypeScript** + **Tailwind v4**
- Rendering statico/SSG per performance e SEO (audit: home vecchia ~250KB, 40 script, 3.9s)
- Security header in `next.config.ts` (CSP, HSTS, X-Frame-Options — assenti sul sito attuale)

## Struttura

| Percorso | Contenuto |
|---|---|
| `/` | Home a 4 intenti (acquisto, noleggio, assistenza, ricambi) |
| `/mezzi` | Catalogo filtrabile (categoria, marca, ricerca) |
| `/mezzi/[slug]` | Scheda modello + specifiche + form precompilato + schema Product |
| `/noleggio` `/assistenza` `/ricambi` | Landing servizio: risposta breve GEO/AEO + FAQ + schema |
| `/sedi/[slug]` | Pagina sede con `LocalBusiness` schema, NAP, orari, mappa |
| `/dlf` | Chi siamo, dati societari, marchi |
| `/contatti` | Contatti + form (preseleziona intento via `?intento=`) |
| `/api/lead` | Endpoint lead strutturato — **stub Theon** |

## Design system

`src/app/globals.css` — B2B industriale, graphite + giallo brand come accento.
Anti-pattern evitati (skill *ui-ux-pro-max* + audit): gradienti AI viola, glassmorphism,
hero astratte. Font: Inter (testo) + Archivo (display). Focus visibile, target ≥44px,
`prefers-reduced-motion`.

## Dati & contenuti

- `src/lib/site.ts` — source of truth NAP, sedi, contatti, dati societari.
- `src/lib/catalog.ts` — catalogo seed dal sito pubblico. Nomi/categorie VERIFICATI;
  spec complete solo per modelli con `specVerificate: true` (Dedalus 30.7, 306 CR).
  Il resto: "scheda tecnica su richiesta" (come sito attuale).
- Media reali in `public/media/`. I mezzi senza foto reale usano un
  **placeholder brandizzato** (non il placeholder grigio WooCommerce).

### Dati da validare con DLF prima del go-live

- Numero mobile Catania (audit: incoerenza `331 100 36 59` vs `366 444 4300`).
- Coordinate GPS esatte delle sedi.
- Numero WhatsApp ufficiale (`company.whatsapp`).
- Specifiche tecniche dei modelli non ancora dettagliati.
- SLA assistenza ("24/7" da confermare).

## Theon layer (da integrare)

- `src/lib/analytics.ts` — eventi canonici (`lead_submitted`, `product_view`…) verso
  buffer `window.__theonEvents` + `dataLayer`. Punto di aggancio GA4 / Theon Signals.
- `src/app/api/lead/route.ts` — valida e struttura il lead. `TODO(Theon)`:
  Leads/CRM scoring → assegnazione reparto → WhatsApp AI → follow-up.

## Sviluppo

```bash
npm run dev      # http://localhost:3000
npm run build    # build produzione
npm run start    # PORT=3100 npm run start  (se 3000 occupato)
```
