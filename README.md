# Da Mario's Fashion and Technology Institute — website prototype

First prototype of the public website for **Da Mario's Fashion and Technology Institute (Damarios FTI)**, Bole, Addis Ababa. Built for users arriving on Android phones over metered mobile data: every budget decision below follows from that.

## Stack

- **Next.js 15** (App Router, TypeScript strict) — *note: Next 15 security support ends 2026-10-21; plan the Next 16 migration (rename `middleware.ts` → `proxy.ts`, replace `setRequestLocale` with root params) shortly after launch*
- **Tailwind CSS v4** — design tokens as CSS custom properties in [src/app/globals.css](src/app/globals.css) (`@theme`), default palette removed
- **next-intl v4** — `en` + `am` under `/en/...` and `/am/...`
- **Motion (Framer Motion)** — scroll scrubbing only; no motion components ship, just `useScroll` writing a CSS variable
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
- **Logo** — [src/components/brand/Logo.tsx](src/components/brand/Logo.tsx) is a vector reconstruction of the mark (gear + flowing fabric + circuit nodes) so it scales crisply, recolours with the theme, and costs ~2 KB with no image request. **Before launch, supply the original vector (.svg/.ai/.eps) and swap the paths in that file** so the site carries the exact artwork.
- **Content layer** — all institutional facts live in typed modules under [src/content/](src/content/); all human-readable copy in [messages/](messages/). Components consume only the exported types, so a headless CMS can replace these modules without touching the UI.
- **TODO placeholders** — anything the client has not supplied renders as a visible chalk-outline `TODO` chip (`<TodoTag/>`). **Never replace one with an invented value** — this is an accredited institute's website. Full inventory below.
- **Hero** — a scroll-scrubbed SVG assembly: flat pattern pieces fly from their chalk outlines into a composed garment on a dress form. The 3D (React Three Fiber) hero was **deliberately cut with client sign-off**: a three.js chunk cannot be built under the 60 KB gzipped budget (realistic floor ~135 KB), so per the project's own fallback clause the SVG sequence is the signature moment. The client component writes only a `--p` CSS variable; all motion is CSS `calc()`. Server-rendered default is the composed state, so no-JS, crawlers and `prefers-reduced-motion` users get a finished hero, not a frozen animation.
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
| 17 | **Original logo vector** (.svg/.ai/.eps) to replace the reconstruction in `src/components/brand/Logo.tsx` | Header, footer, favicon, OpenGraph |

## Quality floor implemented

Responsive from 320px; visible `:focus-visible` on every interactive element; `prefers-reduced-motion` gets designed end-states; WCAG AA colour pairs verified by computation (brand on paper 7.2:1, graphite on paper 16.5:1, muted on paper 5.9:1, paper on navy 11.8:1, brand-bright on navy 4.7:1); semantic landmarks + one `h1` per page; per-page metadata + OpenGraph + hreflang alternates; `sitemap.ts`, `robots.ts`; `EducationalOrganization` JSON-LD with the real address, phones and opening hours; `tel:` links in E.164 for Ethiopian handsets; keyless lazy-loaded Google Maps embed with plain-text landmark directions.
