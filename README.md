# Da Mario's Fashion and Technology Institute — website prototype

First prototype of the public website for **Da Mario's Fashion and Technology Institute (Damarios FTI)**, Bole, Addis Ababa. Built for users arriving on Android phones over metered mobile data: every budget decision below follows from that.

## Stack

- **Next.js 15** (App Router, TypeScript strict) — *note: Next 15 security support ends 2026-10-21; plan the Next 16 migration (rename `middleware.ts` → `proxy.ts`, replace `setRequestLocale` with root params) shortly after launch*
- **Tailwind CSS v4** — design tokens as CSS custom properties in [src/app/globals.css](src/app/globals.css) (`@theme`), default palette removed
- **next-intl v4** — English only; the catalogue and routing stay in place so a second language can be added without touching components
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
- **Logo** — the institute's real artwork. `public/brand/logo-original.png` is the file as supplied; the variants beside it are derived from it by flood-filling the background inward from the edges, which removes the white surround while preserving the white *inside* the gear hub and between the fabric lines. `logo-mark*.png` is used in the header and footer, paired with live text rather than the baked-in lockup so the tagline stays selectable and translatable; the full lockup drives the favicon, apple icon and share card. Regenerate with the script in the commit history if the source is ever replaced.
- **Content layer** — all institutional facts live in typed modules under [src/content/](src/content/); all human-readable copy in [messages/](messages/). Components consume only the exported types, so a headless CMS can replace these modules without touching the UI.
- **TODO placeholders** — anything the client has not supplied renders as a visible `TODO` chip (`<TodoTag/>`). **Never replace one with an invented value** — this is an accredited institute's website. Full inventory below.
- **Hero media slot** — the hero visual is currently an empty, clearly-marked white panel awaiting artwork. To fill it, set `heroMedia` in [src/content/heroMedia.ts](src/content/heroMedia.ts) to an image path under `public/`; nothing else changes and the layout will not shift. To restore the live 3D fabric instead, render `<ClothStage />` in [HeroMedia.tsx](src/components/hero/HeroMedia.tsx).
- **The 3D fabric (retained, not currently mounted)** — in [ClothCanvas.tsx](src/components/hero/ClothCanvas.tsx): a 76×76 sheet displaced by five wave harmonics, pinned along its top edge so it drapes and falls away below, lit per-pixel with a two-lobe silk sheen and a fresnel rim. It is hand-written WebGL2 — **no three.js** — which is why it is **2.7 KB gzipped** rather than the ~135 KB a three.js scene would cost, and so comes in far under the 60 KB budget that made 3D look impossible at the start. Note the shader encodes back to sRGB on output; without that the lighting maths (done in linear space) renders the fabric near-black.
- **Hero gating** — the fabric is a lazy chunk fetched on idle, and only when `prefers-reduced-motion` is off, `saveData` is off, `effectiveType` is 4g/5g, `deviceMemory` ≥ 4 and WebGL2 exists. Everyone else keeps a pure-CSS silk gradient poster that stands on its own, and the 3D bundle is never requested.
- **Fonts** — Bodoni Moda (display), Hanken Grotesk (body), IBM Plex Mono (utility), self-hosted and subset at build time by `next/font`. No italics — every axis costs kilobytes on metered data. Noto Sans Ethiopic was dropped with the Amharic locale; restore it in `src/lib/fonts.ts` alongside the locale.
- **Accreditation numbers** — the certificate and trade licence numbers appear on the **About page** and the **homepage institutional section**. They were removed from the footer at the client's request, which means they are no longer on every page; if site-wide presence is wanted again, the footer is the place to put them back. Values live in [src/content/institute.ts](src/content/institute.ts).
- **Social links** — [src/content/institute.ts](src/content/institute.ts) `social`. Icons are drawn in each platform's own colours on white discs, since the brand blues, black and gradients all vanish against the navy footer. A URL makes an icon live; a `TODO` renders it as a non-interactive disc with a tooltip. Never guess a handle — the wrong link sends visitors to a stranger's account.
- **i18n** — all strings through next-intl. Client components receive strings as props from server parents, so the message catalog never ships to the browser (`NextIntlClientProvider messages={null}` — the provider exists only because next-intl's navigation `Link` reads the locale from context).

## Gallery provenance — CONFIRM BEFORE LAUNCH

Photographs live in `public/gallery/`, catalogued in [src/content/gallery.ts](src/content/gallery.ts) where each carries a `verified` flag.

- `verified: true` — the institute's own premises and signage. Safe as-is.
- `verified: false` — supplied as the founder's design work but not independently verifiable here. Captions are deliberately descriptive ("A piece from the founder's collections") and claim no more than that. **Confirm with the client that the institute owns or is licensed to publish each of these before launch.**

Three images in the source folder were deliberately **excluded**: a private social photograph, an image that appears to be a stock product listing, and personal/scenic shots. None belong on an accredited institute's public site, and publishing a stock image as the institute's own work would be a misrepresentation.

No stock photography is used anywhere. Where the institute has supplied no photograph for a programme, the card and detail page show a marked placeholder rather than a borrowed image.

## Amharic — currently disabled

The site is **English only** by client instruction. next-intl is still in place and every string still goes through the catalogue, so restoring Amharic means adding `"am"` back to `locales` in [src/i18n/routing.ts](src/i18n/routing.ts) and re-attaching the Noto Sans Ethiopic font in `src/lib/fonts.ts`. The drafted translation is preserved at [messages/am.json](messages/am.json) and is not loaded while it sits outside `locales`. **It remains machine-drafted — a native speaker must review it before it is ever shown.**

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
| 13 | Founder **portrait imagery** — a formal portrait of Dr. Senait Mario; none of the supplied photos is a confirmed portrait | Founder page |
| 18 | **Teaching photography for five programmes** — Modeling, Cosmetology, Nail Technology, Information Technology, Security Training. Only Fashion Design has a photo; the rest show a marked placeholder | Programme cards + detail pages |
| 19 | **Confirm gallery provenance** — the institute owns or is licensed to publish each `verified: false` image in `src/content/gallery.ts` | Gallery page |
| 20 | **Student work and classroom photography** to grow the gallery beyond the founder's collections | Gallery page |
| 21 | **Social profile URLs** — Facebook, Instagram, TikTok, Telegram. Icons are in place but inactive until supplied | Footer |
| 14 | **Response timeframe** after an application (currently phrased without a number) | Apply success state |
| 15 | Native-speaker **review of all Amharic copy** | Entire `/am` locale |
| 16 | Confirmation of the exact **map pin** for Kkare Building (embed currently searches by name; landmark directions are the primary aid) | Contact page |
| 17a | **Hero image** — a 3D design render or a photograph of the institute for the homepage hero panel | Homepage |
| 17 | **Original logo vector** (.svg/.ai/.eps). The supplied raster (449×445) is now used site-wide and is sharp at the sizes it appears, but a vector would stay crisp at any scale and for print | Header, footer, favicon, share card |

## Quality floor implemented

Responsive from 320px; visible `:focus-visible` on every interactive element; `prefers-reduced-motion` gets designed end-states (reveals never hide content, the fabric is never fetched); WCAG AA colour pairs verified by computation (brand on paper 7.2:1, graphite on paper 16.5:1, muted on paper 5.9:1, paper on navy 11.8:1, brand-bright on navy 4.7:1); semantic landmarks + one `h1` per page; per-page metadata + OpenGraph + hreflang alternates; `sitemap.ts`, `robots.ts`; `EducationalOrganization` JSON-LD with the real address, phones and opening hours; `tel:` links in E.164 for Ethiopian handsets; keyless lazy-loaded Google Maps embed with plain-text landmark directions.
