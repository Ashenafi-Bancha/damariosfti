# Da Mario's Fashion and Technology Institute — website prototype

First prototype of the public website for **Da Mario's Fashion and Technology Institute (Damarios FTI)**, Bole, Addis Ababa. Built for users arriving on Android phones over metered mobile data: every budget decision below follows from that.

## Stack

- **Next.js 15** (App Router, TypeScript strict) — *note: Next 15 security support ends 2026-10-21; plan the Next 16 migration (rename `middleware.ts` → `proxy.ts`, replace `setRequestLocale` with root params) shortly after launch*
- **Tailwind CSS v4** — design tokens as CSS custom properties in [src/app/globals.css](src/app/globals.css) (`@theme`), default palette removed
- **next-intl v4** — `en` + `am` under `/en/...` and `/am/...`
- **CSS-driven motion** — scroll reveals and transitions are plain CSS on a quintic curve, released by a small IntersectionObserver; no animation library ships to the browser
- **Zod v4 + React Hook Form** — application form, validated client- and server-side
- **Resend + Telegram Bot API** — application notifications (Telegram is the channel the staff actually read)
- Deploy target: **Vercel**

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in — see below
npm run dev
```

Production build + bundle report: `npm run build`.

## Environment variables (`.env.local`)

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public origin for canonical URLs, sitemap, OpenGraph, JSON-LD. Optional on Vercel — the production domain is picked up automatically; set it to override (e.g. custom domain) |
| `RESEND_API_KEY` | Resend API key for application notification email |
| `RESEND_FROM` | Verified sender, e.g. `Damarios FTI <noreply@domain>` |
| `APPLY_TO_EMAIL` | Institute inbox receiving applications (**TODO: client to confirm**) |
| `TELEGRAM_BOT_TOKEN` | Bot token from @BotFather |
| `TELEGRAM_CHAT_ID` | Chat/channel id the bot posts applications into |

With no channel configured, the apply endpoint returns a clearly-labelled "not configured" state — it never fakes success. Applicant data is **never stored**; it is relayed to Telegram/email only. Rate limiting is an in-memory sliding window (best-effort on serverless — swap in Upstash Redis for production) plus a honeypot field.

## Architecture notes

- **Brand** — the design system is derived from the institute's logo: a clear corporate blue (`--color-brand: #15589C`) on white, anchored by a deep navy (`--color-brand-deep`) for the footer and feature bands. Tokens live in the `@theme` block of [src/app/globals.css](src/app/globals.css) and the default Tailwind palette is removed entirely, so nothing off-brand can creep in. The pattern-drafting metaphor is drawn in its true colours — real drafting paper is white with blue rule.
- **Logo** — the institute's real artwork. `public/brand/logo-original.png` is the file as supplied; the variants beside it are derived from it by flood-filling the background inward from the edges, which removes the white surround while preserving the white *inside* the gear hub and between the fabric lines. `logo-mark*.png` is used in the header and footer (paired with live text, so the tagline still translates on /am), and the full lockup drives the favicon, apple icon and share card. Regenerate with the script in the commit history if the source is ever replaced.
- **Content layer** — all institutional facts live in typed modules under [src/content/](src/content/); all human-readable copy in [messages/](messages/). Components consume only the exported types, so a headless CMS can replace these modules without touching the UI.
- **TODO placeholders** — anything the client has not supplied renders as a visible `TODO` chip (`<TodoTag/>`). **Never replace one with an invented value** — this is an accredited institute's website. Full inventory below.
- **Hero** — a real 3D fabric, in [ClothCanvas.tsx](src/components/hero/ClothCanvas.tsx): a 76×76 sheet displaced by five wave harmonics, pinned along its top edge so it drapes and falls away below, lit per-pixel with a two-lobe silk sheen and a fresnel rim. It is hand-written WebGL2 — **no three.js** — which is why it is **2.7 KB gzipped** rather than the ~135 KB a three.js scene would cost, and so comes in far under the 60 KB budget that made 3D look impossible at the start. Note the shader encodes back to sRGB on output; without that the lighting maths (done in linear space) renders the fabric near-black.
- **Hero gating** — the fabric is a lazy chunk fetched on idle, and only when `prefers-reduced-motion` is off, `saveData` is off, `effectiveType` is 4g/5g, `deviceMemory` ≥ 4 and WebGL2 exists. Everyone else keeps a pure-CSS silk gradient poster that stands on its own, and the 3D bundle is never requested.
- **Fonts** — Bodoni Moda (display), Hanken Grotesk (body), IBM Plex Mono (utility), Noto Sans Ethiopic (Amharic), all self-hosted and subset at build time by `next/font`; Ethiopic is `preload: false` and its files are only fetched on `/am` routes. No italics — every axis costs kilobytes on metered data.
- **i18n** — all strings through next-intl. Client components receive strings as props from server parents, so the message catalog never ships to the browser (`NextIntlClientProvider messages={null}` — the provider exists only because next-intl's navigation `Link` reads the locale from context).

## Amharic review — REQUIRED BEFORE LAUNCH

Every string in [messages/am.json](messages/am.json) is a **machine-drafted translation** (flagged by the `_notice` key in the file and a visible banner on all `/am` pages). A native Amharic speaker must review and correct the entire file before launch. Do not remove the banner until that review has happened.

## TODO inventory — what the client must supply

| # | Item | Where it appears |
| --- | --- | --- |
| 1 | Public **email address** | Footer, contact page |
| 2 | **Telegram handle** | Footer, contact page |
| 3 | **Tuition** for every programme | Programme cards, detail pages, admissions |
| 4 | **Durations** for Modeling, Cosmetology, Nail Technology, Information Technology, Security Training | Programme cards + detail pages |
| 5 | **TVET levels** for all programmes except Fashion Design (Levels 2–4 confirmed) | Programme cards + detail pages |
| 6 | **Intake dates** for all programmes | Programme cards, detail pages, admissions |
| 7 | **Entry requirements** | Admissions page |
| 8 | Fashion Design **career outcomes** list | Fashion Design detail page |
| 9 | Information Technology **curriculum** | IT detail page |
| 10 | **Mario Makeup Company** partnership details | Partnerships page, homepage institutional section |
| 11 | **Rome Business School entitlements** — confirm study-abroad claims before launch (legally sensitive; see the code comment in [src/app/[locale]/about/partnerships/page.tsx](src/app/[locale]/about/partnerships/page.tsx)) | Partnerships page |
| 12 | **Capability statement PDF** | Homepage institutional section CTA |
| 13 | Founder **portrait imagery** | Founder page |
| 14 | **Response timeframe** after an application (currently phrased without a number) | Apply success state |
| 15 | Native-speaker **review of all Amharic copy** | Entire `/am` locale |
| 16 | Confirmation of the exact **map pin** for Kkare Building (embed currently searches by name; landmark directions are the primary aid) | Contact page |
| 17 | **Original logo vector** (.svg/.ai/.eps). The supplied raster (449×445) is now used site-wide and is sharp at the sizes it appears, but a vector would stay crisp at any scale and for print | Header, footer, favicon, share card |

## Quality floor implemented

Responsive from 320px; visible `:focus-visible` on every interactive element; `prefers-reduced-motion` gets designed end-states (reveals never hide content, the fabric is never fetched); WCAG AA colour pairs verified by computation (brand on paper 7.2:1, graphite on paper 16.5:1, muted on paper 5.9:1, paper on navy 11.8:1, brand-bright on navy 4.7:1); semantic landmarks + one `h1` per page; per-page metadata + OpenGraph + hreflang alternates; `sitemap.ts`, `robots.ts`; `EducationalOrganization` JSON-LD with the real address, phones and opening hours; `tel:` links in E.164 for Ethiopian handsets; keyless lazy-loaded Google Maps embed with plain-text landmark directions.
